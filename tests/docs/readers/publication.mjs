import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { observeDiagnostics } from './network.mjs';
import {
  applyRefusal,
  matchesRefusal,
  mutations,
  verifyUnrelatedFailures
} from './publication_refusals.mjs';
let refusalEffects = new Set();
const root = process.cwd();
const site = path.resolve(process.env.DOCS_SITE_DIR || 'artifacts/docs/site');
const reports = path.resolve(process.env.DOCS_READER_REPORT_DIR || 'artifacts/docs/readers');
let refusal;
const arguments_ = process.argv.slice(2);
assert(
  arguments_.length === 0 || (arguments_.length === 1 && arguments_[0] === '--verify-refusals'),
  'Expected no arguments or --verify-refusals'
);
const verifyRefusals = arguments_.length === 1;
const runtime = path.resolve(process.env.DOCS_READER_RUNTIME || 'artifacts/docs/reader-runtime');
const require = createRequire(path.join(runtime, 'package.json'));
assert.equal(process.versions.node, '24.21.0');
assert.equal(require('playwright/package.json').version, '1.58.2');
const playwright = require('playwright');
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};
const server = createServer(async (req, res) => {
  try {
    let file = path.resolve(
      site,
      '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    );
    assert(file === site || file.startsWith(site + path.sep));
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let bytes = await readFile(file);
    if (refusal) bytes = applyRefusal(file, bytes, site, refusal, refusalEffects);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(bytes);
  } catch {
    res.writeHead(404);
    res.end('Missing bundle resource');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const records = [];
async function audit(engine, width) {
  const browser = await playwright[engine].launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    try {
      await context.addInitScript(() => {
        window.bijuxCspViolations = [];
        document.addEventListener('securitypolicyviolation', (event) =>
          window.bijuxCspViolations.push({
            directive: event.violatedDirective,
            blocked: event.blockedURI
          })
        );
      });
      const page = await context.newPage();
      const diagnostics = observeDiagnostics(page, origin);
      page.setDefaultTimeout(15000);
      for (const route of ['/', '/standards/', '/infrastructure/']) {
        assert.equal(
          (await page.goto(origin + route, { waitUntil: 'networkidle', timeout: 30000 })).status(),
          200,
          `Published route ${route} must return HTTP 200`
        );
        assert.equal(page.url(), origin + route);
        const routeDiagnostics = await diagnostics.drain();
        assert.deepEqual(routeDiagnostics.errors, [], `${engine} ${route} browser diagnostics`);
        assert(await page.locator('main').innerText(), 'Published route must contain content');
        const violations = await page.evaluate(() => window.bijuxCspViolations);
        assert.deepEqual(violations, [], `${engine} ${route} CSP`);
        if (!refusal) records.push({ engine, width, route, csp_violations: violations });
      }
      await page.goto(origin + '/', { waitUntil: 'networkidle' });
      if (width === 390) {
        await page
          .locator('[data-bijux-header-control="drawer-toggle"]')
          .click({ timeout: refusal ? 2000 : 15000 });
        await page.waitForFunction(() => document.querySelector('#__drawer').checked);
        assert(
          await page.locator('.md-sidebar--primary').isVisible(),
          'Phone drawer must expose navigation'
        );
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => !document.querySelector('#__drawer').checked);
      } else {
        assert(
          await page.locator('.md-sidebar--primary').isVisible(),
          'Desktop menu must expose navigation'
        );
        assert(
          await page.locator('#bijux-navigation a').count(),
          'Desktop navigation must contain destinations'
        );
      }
      await page
        .locator('[data-bijux-header-control="search-toggle"]')
        .click({ timeout: refusal ? 2000 : 15000 });
      const input = page.locator('[data-md-component="search-query"]');
      await input.fill('standards');
      await page
        .locator('.md-search-result__link')
        .first()
        .waitFor({ state: 'visible', timeout: refusal ? 2000 : 15000 });
      const href = await page.locator('.md-search-result__link').first().getAttribute('href');
      assert(href, 'Search must return a real route');
      const target = new URL(href, page.url());
      assert(
        [new URL(origin).origin, 'https://bijux.io'].includes(target.origin),
        'Search result must remain in the published Hub'
      );
      assert.equal(
        (
          await page.goto(origin + target.pathname + target.search + target.hash, {
            waitUntil: 'networkidle'
          })
        ).status(),
        200
      );
      const observed = await diagnostics.drain();
      assert.deepEqual(observed.errors, [], `${engine} browser diagnostics`);
      for (const cancelled of observed.cancelled)
        assert.equal(
          (await context.request.get(cancelled.url)).status(),
          200,
          'Native prefetch destination must exist'
        );
      assert.deepEqual(
        await page.evaluate(() => window.bijuxCspViolations),
        [],
        `${engine} search route CSP`
      );
      if (!refusal)
        records.push({
          engine,
          width,
          browser_version: browser.version(),
          scope: 'menu and live search',
          search_route: target.pathname,
          errors: observed.errors,
          prefetch_destinations: observed.cancelled.map((item) => item.url)
        });
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

try {
  if (!verifyRefusals) {
    for (const engine of ['chromium', 'firefox', 'webkit'])
      for (const width of [390, 1280]) await audit(engine, width);
  }
  const controls = [];
  if (verifyRefusals) {
    verifyUnrelatedFailures();
    for (const mutation of mutations) {
      refusal = mutation;
      refusalEffects = new Set();
      let rejected;
      try {
        await audit('chromium', 390);
      } catch (error) {
        rejected = error;
      }
      assert(refusalEffects.size, `The ${mutation} response transformation must actually apply`);
      assert(
        matchesRefusal(mutation, rejected),
        `Expected mutation-specific ${mutation} refusal: ${String(rejected)}`
      );
      controls.push({ mutation, effects: [...refusalEffects], rejected: String(rejected) });
    }
  }
  refusal = undefined;
  const receipts = {};
  for (const name of ['source-identity', 'build-identity', 'csp', 'site-verification']) {
    const file = path.join(root, 'artifacts/website-security', name + '.json');
    receipts[name] = createHash('sha256')
      .update(await readFile(file))
      .digest('hex');
  }
  await writeFile(
    path.join(reports, verifyRefusals ? 'publication-refusals.json' : 'publication.json'),
    JSON.stringify(
      {
        scope: verifyRefusals
          ? 'validator-source regression controls; not a positive publication reader proof'
          : 'actual three-engine menus/search/foundation routes/CSP; complete diagram matrix remains separate',
        records,
        refusal_controls: controls,
        receipt_sha256: receipts,
        result: 'passed'
      },
      null,
      2
    ) + '\n'
  );
  console.log(
    verifyRefusals
      ? `PASS: ${controls.length} native publication-reader refusal controls`
      : `PASS: ${records.length} focused three-engine publication reader cases`
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
}
