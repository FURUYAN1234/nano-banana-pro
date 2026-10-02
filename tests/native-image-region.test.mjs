import test from 'node:test';
import assert from 'node:assert/strict';
import { extractNativeImageRegion } from '../src/lib/manga-page-layout.js';
import * as page from '../src/lib/manga-page-layout.js';

const pixels = (paint = () => [255, 255, 255, 255]) => {
  const width = 80, height = 80, data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) data.set(paint(x, y), (y * width + x) * 4);
  return { width, height, data };
};

test('native chroma detects a connected color area with exact source bounds and never changes pixels', () => {
  const source = pixels((x, y) => x >= 13 && x < 37 && y >= 19 && y < 43 ? [202, 186, 182, 255] : [128, 128, 128, 255]);
  const before = source.data.slice();
  const report = page.analyzeNativeMonochromeChroma(source);
  assert.equal(report.status, 'detected');
  assert.deepEqual(report.region.bounds, { x: 13, y: 19, width: 24, height: 24 });
  assert.deepEqual(report.region.sampleRgb, [202, 186, 182]);
  assert.equal(report.region.coloredPixels, 24 * 24);
  assert.equal(report.coloredFraction, 24 * 24 / (80 * 80));
  assert.equal(report.maxChannelDifference, 20);
  assert.deepEqual(source.data, before);
});

test('neutral antialiasing, small errors, tiny patches, transparent pixels and sparse colored lines are not broad color areas', () => {
  for (const paint of [
    (x, y) => { const level = (x * 11 + y) % 256; return [level, level, level, 255]; },
    () => [120, 124, 128, 255],
    (x, y) => x < 8 && y < 8 ? [202, 186, 182, 255] : [255, 255, 255, 255],
    () => [255, 0, 0, 0],
    (x, y) => x % 10 === 0 || y % 10 === 0 ? [202, 186, 182, 255] : [255, 255, 255, 255],
    (x, y) => x === y ? [202, 186, 182, 255] : [255, 255, 255, 255],
  ]) {
    const report = page.analyzeNativeMonochromeChroma(pixels(paint));
    assert.equal(report.status, 'not_detected');
    assert.equal(report.region, null);
    assert.equal('pass' in report, false, 'chroma absence never certifies ink, paper or screen rendering');
  }
  assert.throws(() => page.analyzeNativeMonochromeChroma({ width: 2, height: 2, data: [] }), RangeError);
});

test('native chroma Canvas reads the full resolution without resizing, encoding or writing an output image', async () => {
  const oldImage = globalThis.Image, oldDocument = globalThis.document;
  const source = pixels(() => [202, 186, 182, 255]);
  const calls = [];
  const context = { drawImage: (...args) => calls.push(['draw', ...args.slice(1)]),
    getImageData: (...args) => { calls.push(['read', ...args]); return source; } };
  const canvas = { getContext: () => context,
    toDataURL: () => assert.fail('inspection must not re-encode an image') };
  globalThis.Image = class { naturalWidth = source.width; naturalHeight = source.height; async decode() {} };
  globalThis.document = { createElement: () => canvas };
  try {
    const report = await page.inspectNativeMonochromeChroma('unchanged-source');
    assert.equal(report.status, 'detected');
    assert.equal(context.imageSmoothingEnabled, false);
    assert.deepEqual(calls, [['draw', 0, 0], ['read', 0, 0, 80, 80]]);
    assert.equal(canvas.width, 80); assert.equal(canvas.height, 80);
  } finally { globalThis.Image = oldImage; globalThis.document = oldDocument; }
});

test('native ROI rejects invalid geometry and never requests resize or interpolation', async () => {
  const oldImage = globalThis.Image, oldDocument = globalThis.document;
  const calls = [];
  const context = { drawImage: (...args) => calls.push(args) };
  const canvas = { getContext: () => context, toDataURL: () => 'data:image/png;base64,test' };
  globalThis.Image = class { naturalWidth = 8; naturalHeight = 6; async decode() {} };
  globalThis.document = { createElement: () => canvas };
  try {
    for (const region of [null, { x: -1, y: 0, width: 1, height: 1 }, { x: 0, y: 0, width: 0, height: 1 },
      { x: 0.5, y: 0, width: 1, height: 1 }, { x: 7, y: 0, width: 2, height: 1 }]) {
      await assert.rejects(extractNativeImageRegion('source', region), RangeError);
    }
    const region = { x: 2, y: 1, width: 3, height: 4 };
    const result = await extractNativeImageRegion('source', region);
    assert.deepEqual(result, { ...region, dataUrl: 'data:image/png;base64,test', scale: 1 });
    assert.equal(canvas.width, 3); assert.equal(canvas.height, 4);
    assert.equal(context.imageSmoothingEnabled, false);
    assert.deepEqual(calls[0].slice(1), [2, 1, 3, 4, 0, 0, 3, 4]);
  } finally { globalThis.Image = oldImage; globalThis.document = oldDocument; }
});
