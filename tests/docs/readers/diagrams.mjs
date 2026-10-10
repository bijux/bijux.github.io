import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = process.cwd();
const site = path.resolve(process.env.DOCS_SITE_DIR || 'artifacts/docs/site');
const reports = path.resolve(process.env.DOCS_READER_REPORT_DIR || 'artifacts/docs/readers');
const runtime = path.resolve(process.env.DOCS_READER_RUNTIME || 'artifacts/docs/reader-runtime');
const require = createRequire(path.join(runtime, 'package.json'));
assert.equal(process.versions.node, '24.21.0', 'reader checks require the admitted Node version');
assert.equal(require('playwright/package.json').version, '1.58.2');
const playwright = require('playwright');
const engines = (process.env.DOCS_READER_BROWSERS || 'chromium firefox webkit').split(/\s+/).filter(Boolean);
assert(engines.length && engines.every(engine => ['chromium', 'firefox', 'webkit'].includes(engine)));

async function inventory(directory) {
  const pages = [];
  for (const entry of (await readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await inventory(file));
    else if (entry.name.endsWith('.md')) {
      const lines = (await readFile(file, 'utf8')).split(/\r?\n/);
      const diagrams = [];
      let fence;
      for (let index = 0; index < lines.length; index++) {
        const opening = lines[index].match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
        if (!fence && opening) {
          fence = { marker: opening[1], mermaid: opening[2].trim() === 'mermaid', line: index + 1, source: [] };
        } else if (fence) {
          const closing = new RegExp(`^ {0,3}${fence.marker[0]}{${fence.marker.length},}\\s*$`);
          if (closing.test(lines[index])) {
            if (fence.mermaid) diagrams.push({ line: fence.line, source: fence.source.join('\n').trim() });
            fence = undefined;
          } else fence.source.push(lines[index]);
        }
      }
      assert(!fence?.mermaid, `unclosed Mermaid fence: ${file}:${fence?.line}`);
      const relative = path.relative(path.join(root, 'docs'), file).split(path.sep).join('/');
      pages.push({ file: path.relative(root, file), route: '/' + relative.replace(/index\.md$/, '').replace(/\.md$/, '/'), diagrams });
    }
  }
  return pages;
}

const pages = await inventory(path.join(root, 'docs'));
assert(pages.some(page => page.diagrams.length), 'no authored diagrams found');
await mkdir(reports, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let file = path.resolve(site, '.' + decodeURIComponent(url.pathname));
    assert(file === site || file.startsWith(site + path.sep), 'path outside bundle');
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404);
    response.end('Missing bundle resource');
  }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = process.env.DOCS_READER_ORIGIN || `http://127.0.0.1:${server.address().port}`;
const authoredSha256 = createHash('sha256').update(JSON.stringify(pages)).digest('hex');

async function inspect(page, entry) {
  await page.goto(origin + entry.route, { waitUntil: 'networkidle', timeout: 30000 });
  if (entry.diagrams.length) {
    await page.waitForFunction(expected => {
      const diagrams = [...document.querySelectorAll('.md-typeset .bijux-diagram')];
      return diagrams.length === expected && diagrams.every(diagram => diagram.querySelector('.bijux-diagram-preview svg') || diagram.querySelector('.bijux-diagram-status')?.textContent.trim());
    }, entry.diagrams.length, { timeout: 20000 });
  }
  const actual = await page.locator('.md-typeset .bijux-diagram').evaluateAll(diagrams => diagrams.map(diagram => {
    const svgs = [...diagram.querySelectorAll('.bijux-diagram-preview > svg')];
    const svg = svgs[0];
    const box = svg?.getBoundingClientRect();
    return {
      source: diagram.querySelector('.bijux-diagram-source code')?.textContent.trim(),
      svgCount: svgs.length,
      width: box?.width || 0,
      height: box?.height || 0,
      viewWidth: svg?.viewBox.baseVal.width || 0,
      viewHeight: svg?.viewBox.baseVal.height || 0,
      visible: svg ? getComputedStyle(svg).visibility !== 'hidden' && getComputedStyle(svg).display !== 'none' : false,
      error: !!svg?.querySelector('.error-icon, .error-text'),
      status: diagram.querySelector('.bijux-diagram-status')?.textContent.trim(),
      retry: [...diagram.querySelectorAll('button')].some(button => /retry/i.test(button.textContent) && button.getClientRects().length),
    };
  }));
  const failures = [];
  if (actual.length !== entry.diagrams.length) failures.push(`expected ${entry.diagrams.length} authored diagrams, found ${actual.length}`);
  for (const [index, diagram] of actual.entries()) {
    if (diagram.source !== entry.diagrams[index]?.source) failures.push(`diagram ${index + 1}: source differs from authored fence`);
    if (diagram.svgCount !== 1 || !diagram.visible || diagram.width <= 0 || diagram.height <= 0 || diagram.viewWidth <= 0 || diagram.viewHeight <= 0 || diagram.error || diagram.status || diagram.retry) {
      failures.push(`diagram ${index + 1}: preview failed (${diagram.status || 'missing or invalid SVG'})`);
    }
  }
  return { diagrams: actual, failures };
}

async function audit(engine) {
  const records = [];
  const failures = [];
  const browser = await playwright[engine].launch({ headless: true });
  try {
    for (const width of [390, 1280]) for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
      try {
        for (const entry of pages) {
          // A page owns its diagnostics, including requests cancelled when it closes.
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', error => errors.push(String(error)));
          page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
          page.on('response', response => { if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
          page.on('requestfailed', request => { if (request.url().startsWith(origin)) errors.push(`${request.url()}: ${request.failure()?.errorText}`); });
          try {
            let result;
            try {
              result = await inspect(page, entry);
              const palette = await page.locator('body').getAttribute('data-md-color-scheme');
              assert.equal(palette, theme === 'dark' ? 'slate' : 'default', 'requested theme was not applied');
            } catch (error) {
              result = { failures: [String(error)], diagrams: [] };
            }
            result.failures.push(...errors);
            const record = { file: entry.file, route: entry.route, width, theme, ...result };
            records.push(record);
            if (result.failures.length) {
              failures.push(record);
              console.error(`${engine} ${width} ${theme} ${entry.file}: ${result.failures.join('; ')}`);
              await page.screenshot({ path: path.join(reports, `${engine}-${width}-${theme}-${entry.file.replaceAll('/', '_')}.png`), fullPage: true });
            }
          } finally { await page.close(); }
        }
      } finally { await context.close(); }
    }
    // Prove that inaccessible rendering fails the same acceptance predicate used above.
    const controlContext = await browser.newContext();
    try {
      await controlContext.route('**/vendor/mermaid-*.js', route => route.abort());
      const page = await controlContext.newPage();
      const entry = pages.find(candidate => candidate.diagrams.length);
      const rejected = await inspect(page, entry);
      assert(rejected.failures.some(failure => failure.includes('preview failed')), 'missing renderer was accepted');
      records.push({ control: 'blocked-renderer', route: entry.route, rejected: true, failures: rejected.failures });
    } finally { await controlContext.close(); }
  } finally { await browser.close(); }
  const report = { engine, node: process.versions.node, playwright: '1.58.2', origin, authoredSha256, pages: pages.length, authoredDiagrams: pages.reduce((total, entry) => total + entry.diagrams.length, 0), records, failedCases: failures.length };
  await writeFile(path.join(reports, `${engine}.json`), JSON.stringify(report, null, 2) + '\n');
  console.log(`${engine}: ${records.length - 1} page cases, ${report.authoredDiagrams} authored diagrams, ${failures.length} failures; blocked renderer rejected`);
  return failures.length;
}

try {
  const results = await Promise.allSettled(engines.map(audit));
  for (const result of results) {
    if (result.status === 'rejected') { console.error(result.reason); process.exitCode = 1; }
    else if (result.value) process.exitCode = 1;
  }
} finally { await new Promise(resolve => server.close(resolve)); }
