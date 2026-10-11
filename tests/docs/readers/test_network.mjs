import assert from 'node:assert/strict';
import test from 'node:test';
import { cancelledPrefetch } from './network.mjs';

const origin = 'http://127.0.0.1:8000';
const native = { url: origin + '/learning/reproducible-research/', failure: 'NS_BINDING_ABORTED', resourceType: 'other', navigation: false, headers: { 'sec-purpose': 'prefetch' } };

test('accept only the observed cancelled native speculative request', () => {
  assert.equal(cancelledPrefetch(native, origin), true);
});

for (const [name, change] of Object.entries({
  'document navigation': { navigation: true },
  'script request': { resourceType: 'script' },
  'stylesheet request': { resourceType: 'stylesheet' },
  'image request': { resourceType: 'image' },
  'ordinary fetch': { resourceType: 'fetch' },
  'missing speculative identity': { headers: {} },
  'different speculative purpose': { headers: { 'sec-purpose': 'prefetch;prerender' } },
  'genuine transport failure': { failure: 'NS_ERROR_NET_RESET' },
  'unclassified failure': { failure: undefined },
  'different origin': { url: 'http://127.0.0.1:8001/learning/' },
  'origin prefix spoof': { url: 'http://127.0.0.1.invalid:8000/learning/' },
  'malformed destination': { url: origin + '.invalid/learning/' },
})) {
  test(`reject ${name}`, () => assert.equal(cancelledPrefetch({ ...native, ...change }, origin), false));
}
