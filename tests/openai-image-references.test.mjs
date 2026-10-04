import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import {
  buildOpenAIReferencePlan,
  appendOpenAIReferencePrompt,
  normalizeOpenAIImageDataUrl,
  getOpenAIPromptBodyBudget,
} from '../src/lib/openai-image-references.js';
import { buildOpenAIImageRequest } from '../src/lib/openai.js';
import { withoutMosaicRepair } from './helpers/mosaic-isolation.mjs';

// 非productionのrequest-shape用データ。生成画質の証拠には使用しない。
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;

test('only initial OpenAI monochrome requests end with the ink manuscript finishing instruction, even without references', () => {
  const finish = '最終仕上げ：漫画雑誌の墨一色原稿として、白地・黒ベタ・網点で描く。白い肌の明部と未指定の紙面は無地の白。グレーの塗り・ぼかし・全体にかかる網点を除き、指定素材・褐色肌・光源に沿う影の網点は保持する。各コマの指定画風、劇画の墨線・ベタ・カケアミを保ち、色は一切残さない。';
  for (const count of [0, 2, 16]) {
    const characterImages = Array.from({ length: count }, (_, i) => image(`ref ${i}`));
    const plan = buildOpenAIReferencePlan({ characterImages, colorMode: 'monochrome' });
    assert.ok(plan.rolePrompt.endsWith(finish));
    assert.equal(plan.rolePrompt.split(finish).length, 2);
    assert.deepEqual(plan.imageInputs, characterImages.map(image_url => ({ image_url })));
    if (!count) assert.equal(plan.rolePrompt, finish);
    const body = '文'.repeat(getOpenAIPromptBodyBudget(plan));
    const copied = appendOpenAIReferencePrompt(body, plan);
    assert.equal(copied.length, 32000);
    assert.ok(copied.endsWith(finish));
    assert.equal(buildOpenAIImageRequest(copied, { imageInputs: plan.imageInputs }).body.prompt, copied);
    assert.throws(() => appendOpenAIReferencePrompt(`${body}文`, plan), /上限/);
    assert.doesNotMatch(buildOpenAIReferencePlan({ characterImages, colorMode: 'color' }).rolePrompt, /最終仕上げ/);
  }
  const repair = buildOpenAIReferencePlan({ colorMode: 'monochrome', characterImages: [image('a')],
    backgroundImage: image('b'), backgroundEnabled: true, originalCandidate: { base64Img: 'Yw==', mimeType: 'image/png' } });
  assert.doesNotMatch(repair.rolePrompt, /最終仕上げ/);
  assert.equal(createHash('sha256').update(JSON.stringify({ ...repair, rolePrompt: withoutMosaicRepair(repair.rolePrompt) })).digest('hex'), '4f92da4002dc395e8a7e9609a99200faf893a406264a90d3ca67e52cb3c2fc5f');
});

test('color reference plans retain byte-identical initial, background and repair manifests', () => {
  const characterImages = [image('a')];
  const backgroundImage = image('b');
  const originalCandidate = { base64Img: 'Yw==', mimeType: 'image/png' };
  const cases = [
    [{ characterImages }, 'a7ed9b23abf306b666d2cbbd6546cee49a8a54bdef1ba2ebf8223cd3d56791c0'],
    [{ characterImages, backgroundImage, backgroundEnabled: true }, 'b07db470222d00451d804fdcf23f1b750d0291e4cad3a5cbc400cece9c2b9cff'],
    [{ characterImages, backgroundImage, backgroundEnabled: true, originalCandidate }, '9bbd8e6d2edad15d4041c1a67e39076f4dae620631d70b4af34ae7823a2b58fd'],
  ];
  for (const [options, expected] of cases) {
    const before = buildOpenAIReferencePlan(options);
    for (const colorMode of ['color', undefined]) {
      const plan = buildOpenAIReferencePlan({ ...options, colorMode });
      assert.deepEqual(plan, before);
      assert.equal(createHash('sha256').update(JSON.stringify({ ...plan, rolePrompt: withoutMosaicRepair(plan.rolePrompt) })).digest('hex'), expected);
    }
  }
});

test('monochrome references preserve source bytes and identity while excluding reference palette and painted lighting', () => {
  const options = { characterImages: [image('sheet')], backgroundImage: image('background'), backgroundEnabled: true,
    originalCandidate: { base64Img: 'Yw==', mimeType: 'image/png' } };
  const color = buildOpenAIReferencePlan(options);
  const mono = buildOpenAIReferencePlan({ ...options, colorMode: 'monochrome' });
  assert.deepEqual(mono.imageInputs, color.imageInputs, 'references are not filtered or recolored');
  assert.deepEqual(mono.counts, color.counts);
  const role = name => mono.rolePrompt.split('\n').find(line => line.includes(name));
  assert.match(role('CHARACTER REFERENCE'), /identity and canonical clothing/);
  assert.match(role('CHARACTER REFERENCE'), /source hues or tints/);
  assert.match(role('CHARACTER REFERENCE'), /hair\/outfit boundaries.*black\/white\/assigned screens/);
  assert.match(role('BACKGROUND REFERENCE'), /geometry.*light direction/);
  assert.match(role('BACKGROUND REFERENCE'), /native black ink.*white paper.*assigned screens/);
  assert.match(role('SOURCE IMAGE TO EDIT'), /already-correct content/);
  assert.match(role('SOURCE IMAGE TO EDIT'), /required monochrome medium/);
  assert.match(role('SOURCE IMAGE TO EDIT'), /source hues or tints/);
  assert.doesNotMatch(color.rolePrompt, /required monochrome medium|source hues or tints/);
});

test('monochrome reference headroom is reserved identically for Web copy and API at the full input limit', () => {
  const plan = buildOpenAIReferencePlan({ colorMode: 'monochrome', characterImages: Array.from({ length: 15 }, (_, i) => image(`sheet ${i}`)),
    backgroundImage: image('background'), backgroundEnabled: true });
  const available = getOpenAIPromptBodyBudget(plan);
  const body = '本文'.repeat(Math.floor(available / 2)).padEnd(available, '。');
  const copied = appendOpenAIReferencePrompt(body, plan);
  assert.equal(copied.length, 32000);
  assert.equal(copied.slice(0, available), body);
  assert.equal(buildOpenAIImageRequest(copied, { imageInputs: plan.imageInputs }).body.prompt, copied);
  assert.throws(() => appendOpenAIReferencePrompt(`${body}。`, plan), /上限/);
  assert.ok(plan.rolePrompt.length > buildOpenAIReferencePlan({ characterImages: [image('sheet')] }).rolePrompt.length);
});

test('workflow reserves, copies and sends the same selected reference medium', () => {
  const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const plans = [...source.matchAll(/buildOpenAIReferencePlan\(\{([\s\S]*?)\}\)/g)];
  assert.equal(plans.length, 3);
  for (const [, options] of plans) assert.match(options, /\bcolorMode\b/);
});

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
