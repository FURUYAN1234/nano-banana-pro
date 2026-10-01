import test from 'node:test';
import assert from 'node:assert/strict';
import { extractNativeImageRegion } from '../src/lib/manga-page-layout.js';

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
