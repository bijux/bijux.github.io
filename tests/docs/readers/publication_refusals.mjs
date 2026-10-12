import assert from 'node:assert/strict';
import path from 'node:path';

export const mutations = [
  'phone menu',
  'search control',
  'search results',
  'foundation destination',
  'script CSP',
  'script resource'
];

export function applyRefusal(file, bytes, site, mutation, effects) {
  const record = () => effects.add(path.relative(site, file));
  if (mutation === 'foundation destination' && file === path.join(site, 'standards/index.html')) {
    record();
    throw Error('Refusal control removes the existing foundation destination');
  }
  if (mutation === 'search results' && file === path.join(site, 'search/search_index.json')) {
    const index = JSON.parse(bytes);
    assert(
      Array.isArray(index.docs) && index.docs.length,
      'Control requires populated native search data'
    );
    index.docs = [];
    record();
    return Buffer.from(JSON.stringify(index));
  }
  if (
    mutation === 'script resource' &&
    /assets\/javascripts\/material-search\.[0-9a-f]{64}\.js$/.test(file)
  ) {
    record();
    throw Error('Refusal control removes the existing native search script');
  }
  if (file !== path.join(site, 'index.html')) return bytes;
  const original = bytes.toString();
  let html = original;
  if (mutation === 'phone menu')
    html = html.replace(
      /<label[^>]*data-bijux-header-control="drawer-toggle"[^>]*>[\s\S]*?<\/label>/,
      ''
    );
  if (mutation === 'search control')
    html = html.replace(
      /<label[^>]*data-bijux-header-control="search-toggle"[^>]*>[\s\S]*?<\/label>/,
      ''
    );
  if (mutation === 'script CSP')
    html = html.replace(
      /(<meta[^>]*http-equiv="Content-Security-Policy"[^>]*content=")([^"]*)(")/,
      (_, start, policy, end) =>
        start + policy.replace(/script-src[^;]*/, "script-src 'none'") + end
    );
  if (html !== original) record();
  return Buffer.from(html);
}

export function matchesRefusal(mutation, error) {
  const text = String(error);
  const errors = Array.isArray(error?.actual) ? error.actual : [];
  if (mutation === 'phone menu')
    return (
      errors.length === 1 &&
      errors[0] ===
        'Error: Shared drawer initialization requires its native control, sidebar, tree and opener'
    );
  if (mutation === 'search control')
    return (
      error?.name === 'TimeoutError' &&
      text.includes('locator.click') &&
      text.includes('search-toggle')
    );
  if (mutation === 'search results')
    return (
      error?.name === 'TimeoutError' &&
      text.includes('locator.waitFor') &&
      text.includes('.md-search-result__link')
    );
  if (mutation === 'foundation destination')
    return (
      error?.actual === 404 &&
      error?.expected === 200 &&
      text.includes('Published route /standards/ must return HTTP 200')
    );
  if (mutation === 'script CSP')
    return (
      errors.length > 0 &&
      errors.some((value) => value.includes('script-src') && value.includes("'none'")) &&
      errors.every(
        (value) => value.includes('script-src') || /assets\/javascripts\/[^:]+: csp$/.test(value)
      )
    );
  if (mutation === 'script resource')
    return (
      errors.some((value) =>
        /^404 http:\/\/127\.0\.0\.1:\d+\/assets\/javascripts\/material-search\.[0-9a-f]{64}\.js$/.test(
          value
        )
      ) &&
      errors.every(
        (value) =>
          /assets\/javascripts\/material-search\.[0-9a-f]{64}\.js/.test(value) ||
          value === 'Failed to load resource: the server responded with a status of 404 (Not Found)'
      )
    );
  return false;
}

export function verifyUnrelatedFailures() {
  const failures = [
    new Error('browserType.launch: Executable does not exist'),
    new Error('Unrelated route rendering failure'),
    new assert.AssertionError({
      actual: 404,
      expected: 200,
      message: 'Published route /unrelated/ must return HTTP 200'
    }),
    new assert.AssertionError({ actual: ['500 http://127.0.0.1:1234/unrelated/'], expected: [] })
  ];
  for (const mutation of mutations)
    for (const error of failures)
      assert.equal(
        matchesRefusal(mutation, error),
        false,
        `${mutation} must not accept an unrelated failure`
      );
}
