import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { secureHtml, verifyBuiltSecurity } from '../scripts/web-security.mjs';
import { boundReactPerformanceDetail, installReactPerformanceDetail, MAX_REACT_PERFORMANCE_DETAIL_BYTES } from '../src/lib/react-performance-detail.js';

const optionsWith = properties => ({ start: 1, end: 2, detail: { devtools: {
  color: 'primary', properties, tooltipText: 'ImageHistory', track: 'Components ⚛',
} } });
const bytes = value => Buffer.byteLength(JSON.stringify(value));

test('browser load fixture satisfies the same HTML security boundary as the app', () => {
  const html = readFileSync(new URL('./fixtures/react-history-browser.html', import.meta.url), 'utf8');
  assert.equal(verifyBuiltSecurity(secureHtml(html, { development: true })), true);
  assert.throws(() => secureHtml(html.replace('<head>', '')), /Exactly one HTML head/);
});

test('React diagnostic details bound both prop names and values without changing image data', () => {
  const image = `data:image/png;base64,${'A'.repeat(13 * 1024 * 1024)}`;
  const properties = Array.from({ length: 20 }, () => [image, image]);
  const options = optionsWith(properties);
  const bounded = boundReactPerformanceDetail(options);
  assert.ok(bounded.detail.devtools.properties.every(([key, value]) => key.length <= 256 && value.length <= 256));
  assert.ok(bytes(bounded.detail) <= MAX_REACT_PERFORMANCE_DETAIL_BYTES);
  assert.equal(options.detail.devtools.properties, properties);
  assert.equal(properties[0][1], image);
  assert.equal(bounded.start, options.start);assert.equal(bounded.end, options.end);
  assert.equal(bounded.detail.devtools.track, options.detail.devtools.track);
  assert.equal(bounded.detail.devtools.tooltipText, options.detail.devtools.tooltipText);
});

test('ordinary React details and non-React measurement arguments keep their identity', () => {
  const small = optionsWith([['imageCount', '10'], ['title', '作品']]);
  assert.equal(boundReactPerformanceDetail(small), small);
  const other = { ...small, detail: { devtools: { ...small.detail.devtools, track: 'Other' } } };
  assert.equal(boundReactPerformanceDetail(other), other);
  let call;
  const result = {};
  const api = { measure(...args) { call = { receiver: this, args }; return result; } };
  installReactPerformanceDetail({ development: true, performanceApi: api });
  assert.equal(api.measure('app', other, 'end'), result);
  assert.equal(call.receiver, api);assert.deepEqual(call.args, ['app', other, 'end']);
  assert.equal(call.args[1], other);
  api.measure('legacy', 'start', 'end');assert.deepEqual(call.args, ['legacy', 'start', 'end']);
  api.measure('small', small);assert.equal(call.args[1], small);
});

test('development installation is idempotent and production keeps the native function', () => {
  const native = () => {};
  const production = { measure: native };
  installReactPerformanceDetail({ development: false, performanceApi: production });
  assert.equal(production.measure, native);
  installReactPerformanceDetail({ performanceApi: production });assert.equal(production.measure, native);
  const development = { measure: native };
  installReactPerformanceDetail({ development: true, performanceApi: development });
  const installed = development.measure;
  installReactPerformanceDetail({ development: true, performanceApi: development });
  assert.equal(development.measure, installed);
});

test('application bootstrap installs only in development before creating its StrictMode root', () => {
  const source = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8');
  const install = source.indexOf('if (import.meta.env.DEV) installReactPerformanceDetail({ development: true })');
  assert.ok(install >= 0 && install < source.indexOf('createRoot(document'));
  assert.match(source, /<StrictMode>[\s\S]*<App\s*\/>[\s\S]*<\/StrictMode>/);
});

test('native measurement failures propagate unchanged', () => {
  const error = new Error('native failure');
  const api = { measure() { throw error; } };
  installReactPerformanceDetail({ development: true, performanceApi: api });
  for (const options of [optionsWith([['x', 'small']]), { detail: { app: 'ordinary' } }]) {
    assert.throws(() => api.measure('name', options), thrown => thrown === error);
  }
});

test('escaped multibyte diagnostic properties respect the complete detail byte budget', () => {
  const value = '\\"\n日本語'.repeat(100);
  const bounded = boundReactPerformanceDetail(optionsWith(Array.from({ length: 1000 }, () => [value, value])));
  assert.ok(bytes(bounded.detail) <= MAX_REACT_PERFORMANCE_DETAIL_BYTES);
});

test('installed React prop-diff instrumentation sends bounded details for two views of ten shifted image records', () => {
  const source = readFileSync(new URL('../node_modules/react-dom/cjs/react-dom-client.development.js', import.meta.url), 'utf8');
  const start = source.indexOf('    function getArrayKind(');
  const end = source.indexOf('    function logComponentErrored(', start);
  assert.ok(start >= 0 && end > start, 'exercise the installed React implementation');
  let calls = 0;
  const api = { measure(name, options) {
    assert.ok(options.detail.devtools.properties.every(([, value]) => value.length <= 256), 'native measure must not clone complete image props');
    assert.ok(bytes(options.detail) <= MAX_REACT_PERFORMANCE_DETAIL_BYTES);
    calls++;return { name, detail: structuredClone(options.detail) };
  } };
  installReactPerformanceDetail({ development: true, performanceApi: api });
  const reusable = optionsWith([]);
  const context = vm.createContext({
    EMPTY_ARRAY: 0, PRIMITIVE_ARRAY: 1, COMPLEX_ARRAY: 2, ENTRIES_ARRAY: 3,
    isArrayImpl: Array.isArray, hasOwnProperty: Object.prototype.hasOwnProperty,
    REACT_ELEMENT_TYPE: Symbol.for('react.transitional.element'), OMITTED_PROP_ERROR: Symbol('omitted'),
    REMOVED: '- ', ADDED: '+ ', UNCHANGED: '  ', supportsUserTiming: true,
    getComponentNameFromFiber: fiber => fiber.name,
    resuableChangedPropsEntry: ['Props', 'Changed'], reusableComponentOptions: reusable,
    reusableComponentDevToolDetails: reusable.detail.devtools,
    alreadyWarnedForDeepEquality: false, performance: api, console: { timeStamp() {} },
  });
  vm.runInContext(`${source.slice(start, end)}\nglobalThis.renderDetails = logComponentRender;`, context);
  const images = Array.from({ length: 11 }, (_, i) => `data:image/png;base64,${String.fromCharCode(65 + i).repeat(128 * 1024)}`);
  const before = images.slice(1).map((img, i) => ({ id: i + 1, img }));
  const after = images.slice(0, 10).map((img, i) => ({ id: i, img }));
  for (const name of ['Step4Panel', 'GenerationHistory']) {
    const previous = { generatedImage: images[1], generationHistory: before };
    const next = { generatedImage: images[0], generationHistory: after };
    const fiber = { name, child: null, actualDuration: 1, _debugTask: null,
      alternate: { memoizedProps: previous, child: null, lanes: 0 }, memoizedProps: next };
    context.renderDetails(fiber, 1, 2, false, 1);
    fiber.alternate.memoizedProps = next;
    fiber.memoizedProps = { ...next, status: 'updated again' };
    context.renderDetails(fiber, 3, 4, false, 1);
  }
  assert.equal(calls, 4);
  assert.equal(after[0].img, images[0]);assert.equal(after.length, 10);
});
