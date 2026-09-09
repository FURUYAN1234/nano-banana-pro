import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildOpenAIReferencePlan,
  appendOpenAIReferencePrompt,
  normalizeOpenAIImageDataUrl,
} from '../src/lib/openai-image-references.js';

// 非productionのrequest-shape用データ。生成画質の証拠には使用しない。
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;

test('character sheets precede the active panorama and have separate roles', () => {
  const a = image('sheet-a');
  const b = image('sheet-b');
  const bg = image('panorama');
  const plan = buildOpenAIReferencePlan({
    characterImages: [a, b], backgroundImage: bg, backgroundEnabled: true,
  });
  assert.deepEqual(plan.imageInputs, [a, b, bg].map(image_url => ({image_url})));
  assert.deepEqual(plan.counts, {character: 2, background: 1, original: 0});
  assert.match(plan.rolePrompt, /Image 1: CHARACTER REFERENCE/);
  assert.match(plan.rolePrompt, /Image 3: BACKGROUND REFERENCE/);
});

test('repair prepends the actual original before the unchanged reference order', () => {
  const a = image('sheet-a');
  const plan = buildOpenAIReferencePlan({
    characterImages: [a],
    originalCandidate: {base64Img: Buffer.from('original').toString('base64'), mimeType: 'image/png'},
  });
  assert.equal(plan.imageInputs[0].image_url, image('original'));
  assert.equal(plan.imageInputs[1].image_url, a);
  assert.match(plan.rolePrompt, /Image 1: SOURCE IMAGE TO EDIT/);
});

test('disabled background never leaks into a request', () => {
  const plan = buildOpenAIReferencePlan({backgroundImage: image('old-bg'), backgroundEnabled: false});
  assert.equal(plan.imageInputs.length, 0);
});

test('manual prompt is retained exactly as the prefix, and empty plan changes nothing', () => {
  const text = '  手動台詞「そのまま。」\r\nCamera: overhead\n';
  const empty = buildOpenAIReferencePlan({});
  assert.equal(appendOpenAIReferencePrompt(text, empty), text);
  const plan = buildOpenAIReferencePlan({characterImages: [image('a')]});
  assert.equal(appendOpenAIReferencePrompt(text, plan).slice(0, text.length), text);
});

test('duplicate identical character inputs are removed without reordering', () => {
  const a = image('a');
  const b = image('b');
  const plan = buildOpenAIReferencePlan({characterImages: [a, a, b]});
  assert.deepEqual(plan.imageInputs, [a, b].map(image_url => ({image_url})));
});

test('over-limit initial and repair requests fail without silent truncation', () => {
  const sheets = Array.from({length: 16}, (_, i) => image(`sheet-${i}`));
  assert.equal(buildOpenAIReferencePlan({characterImages: sheets}).imageInputs.length, 16);
  assert.throws(() => buildOpenAIReferencePlan({characterImages: [...sheets, image('17')]}), /16枚/);
  assert.throws(() => buildOpenAIReferencePlan({
    characterImages: sheets,
    originalCandidate: {base64Img: 'eA==', mimeType: 'image/png'},
  }), /16枚/);
});

test('conflicting roles and unsupported inputs fail explicitly', () => {
  const a = image('same');
  assert.throws(() => buildOpenAIReferencePlan({characterImages: [a], backgroundImage: a, backgroundEnabled: true}), /用途/);
  for (const value of ['', 'https://example.com/a.png', 'data:image/svg+xml;base64,YQ==', 'data:image/png;base64,%%%']) {
    assert.throws(() => normalizeOpenAIImageDataUrl(value), /画像/);
  }
  assert.throws(() => buildOpenAIReferencePlan({characterImages: 'not-an-array'}), /配列/);
});

test('normalizes supported MIME types and whitespace without changing image bytes', () => {
  assert.equal(normalizeOpenAIImageDataUrl(' DATA:IMAGE/PNG;BASE64,Y Q==\n '), image('a'));
  for (const mime of ['jpeg', 'webp']) {
    const input = `data:image/${mime};base64,YQ==`;
    assert.equal(normalizeOpenAIImageDataUrl(input), input);
  }
});

test('rejects oversized and empty original inputs without echoing their data', () => {
  const oversized = `data:image/png;base64,${'A'.repeat(20971520)}`;
  assert.throws(() => normalizeOpenAIImageDataUrl(oversized), error => {
    assert.match(error.message, /上限/);
    assert.doesNotMatch(error.message, /data:image|AAAA/);
    return true;
  });
  assert.throws(() => buildOpenAIReferencePlan({originalCandidate: {base64Img: '', mimeType: 'image/png'}}), /修復元画像/);
});
