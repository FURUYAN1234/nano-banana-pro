import assert from 'node:assert/strict';
import test from 'node:test';
import { PAGE_LAYOUT, detectPageBands, buildPageDrawPlan, normalizePageCandidate, scalePageLayout } from '../src/lib/manga-page-layout.js';

const fixture = (rows = [80, 435, 442, 744, 750, 1070, 1078, 1498]) => {
  const width = 128, height = 1536;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  for (const y of rows) for (let x = 2; x < width - 2; x++) ink(x, y);
  for (let y = 10; y < 65; y++) for (let x = 20; x < 110; x++) ink(x, y);
  for (let y = 1510; y < 1524; y++) for (let x = 3; x < 125; x++) ink(x, y);
  return { data, width, height };
};

const liveSizeFixture = () => {
  const width = 1536, height = 2304;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  for (const y of [129, 595, 614, 1096, 1114, 1600, 1623, 2237]) {
    for (let x = 15; x <= 1521; x++) ink(x, y);
  }
  for (let y = 9; y <= 125; y++) for (let x = 369; x <= 1165; x++) ink(x, y);
  for (let y = 2256; y <= 2281; y++) for (let x = 25; x <= 1508; x++) ink(x, y);
  return { data, width, height };
};

const framedTitleFixture = () => {
  const pixels = fixture([80, 420, 790, 1110, 1498]);
  const { data, width } = pixels;
  const ink = (x, y) => { const i = (y * width + x) * 4; data[i] = data[i + 1] = data[i + 2] = 0; };
  data.fill(255, 0, 80 * width * 4);
  for (const y of [4, 70]) for (let x = 8; x < width - 8; x++) ink(x, y);
  for (let y = 4; y <= 70; y++) for (const x of [8, width - 9]) ink(x, y);
  // Model-rendered title glyph block inside the unwanted rectangle.
  for (let y = 20; y < 56; y++) for (let x = 28; x < 100; x++) ink(x, y);
  return pixels;
};

test('detects the whole variable-height panel block, keeping title and footer separate', () => {
  const bands = detectPageBands(fixture());
  assert.equal(bands.panels.y, 78);
  assert.equal(bands.panels.height, 1423);
  assert.equal(bands.title.y, 10);
  assert.equal(bands.footer.y, 1510);
  assert.deepEqual(bands.panelFrames.map(frame => [frame.y, frame.height]), [
    [78, 360], [440, 307], [748, 325], [1076, 425],
  ]);
});

test('shared borders and different individual heights do not require eight grid lines', () => {
  assert.ok(detectPageBands(fixture([80, 420, 790, 1110, 1498])));
});

test('outer page whitespace is excluded without splitting the variable-height panel block', () => {
  const bands = detectPageBands(liveSizeFixture());
  assert.deepEqual(bands.panels, { x: 12, y: 126, width: 1513, height: 2115 });
  const plan = buildPageDrawPlan(bands);
  assert.ok(plan);
  assert.equal(plan.length, 3);
  assert.deepEqual([plan.layout.width, plan.layout.height], [1629, 2304]);
  assert.deepEqual(plan[1].source, bands.panels);
  assert.ok(plan[1].destination.x >= plan.layout.inset);
  assert.ok(plan[1].destination.x + plan[1].destination.width <= plan.layout.width - plan.layout.inset);
});

test('title rectangle is excluded while preserving the model-rendered title glyphs', () => {
  const bands = detectPageBands(framedTitleFixture());
  assert.ok(bands);
  assert.deepEqual(bands.title, { x: 28, y: 20, width: 72, height: 36 });
});

test('ambiguous frame counts and missing footer are rejected without guessing crops', () => {
  assert.equal(detectPageBands(fixture([80, 500, 1000, 1498])), null);
  assert.equal(detectPageBands(fixture([80, 300, 580, 870, 1150, 1498])), null);
  const missing = fixture();
  missing.data.fill(255, 1500 * missing.width * 4);
  assert.equal(detectPageBands(missing), null);
});

test('draw plan fixes an A4 manuscript page, never divides panels, and preserves aspect', () => {
  const bands = { title: { x: 100, y: 5, width: 800, height: 70 }, panels: { x: 0, y: 80, width: 1024, height: 1419 }, footer: { x: 12, y: 1506, width: 1000, height: 20 } };
  const plan = buildPageDrawPlan(bands);
  assert.deepEqual([PAGE_LAYOUT.width, PAGE_LAYOUT.height], [1120, 1584]);
  assert.equal(PAGE_LAYOUT.width / PAGE_LAYOUT.height, 70 / 99);
  assert.equal(plan.length, 3);
  assert.equal(plan[1].destination.y, 103);
  assert.equal(plan[1].destination.height, 1446);
  for (const { source, destination } of plan) {
    assert.ok(Math.abs(source.width / source.height - destination.width / destination.height) < 1e-9);
    assert.ok(destination.x >= 7 && destination.x + destination.width <= 1113);
  }
  assert.ok(plan[2].destination.y >= 1556);
  assert.ok(plan[2].destination.y + plan[2].destination.height <= 1577);
});

test('large API output keeps the exact A4 ratio and scales every fixed band proportionally', () => {
  assert.deepEqual(scalePageLayout(3168), {
    width: 2240, height: 3168, titleHeight: 206, panelHeight: 2892,
    footerHeight: 70, inset: 14, titleInkHeight: 174,
  });
  const plan = buildPageDrawPlan({
    canvas: { width: 2240, height: 3168 },
    title: { x: 300, y: 8, width: 1620, height: 150 },
    panels: { x: 0, y: 160, width: 2240, height: 2930 },
    footer: { x: 35, y: 3100, width: 2170, height: 38 },
  });
  assert.deepEqual([plan.layout.width, plan.layout.height], [2240, 3168]);
  assert.equal(plan[1].destination.height, 2892);
  assert.ok(plan[1].destination.x >= 14);
  assert.ok(plan[1].destination.x + plan[1].destination.width <= 2226);
});

test('cannot fill panel height without clipping: reject instead of stretching or slicing', () => {
  assert.equal(buildPageDrawPlan({ title: { width: 400, height: 60 }, panels: { width: 1500, height: 1000 }, footer: { width: 800, height: 20 } }), null);
});

test('candidate retains original bytes and reports skipped normalization honestly', async () => {
  const candidate = { base64Img: 'raw', mimeType: 'image/jpeg', modelId: 'test' };
  const skipped = await normalizePageCandidate(candidate, async () => ({ applied: false, reason: 'ambiguous' }));
  assert.equal(skipped.base64Img, 'raw');
  assert.equal(skipped.pageLayout.applied, false);
  const normalized = await normalizePageCandidate(candidate, async () => ({ applied: true, dataUrl: 'data:image/png;base64,fixed' }));
  assert.equal(normalized.base64Img, 'fixed');
  assert.equal(normalized.originalImage, 'data:image/jpeg;base64,raw');
  assert.equal(normalized.modelId, 'test');
});
