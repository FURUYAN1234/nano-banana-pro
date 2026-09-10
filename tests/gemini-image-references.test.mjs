import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {buildGeminiReferencePlan, appendGeminiReferencePrompt} from '../src/lib/gemini-image-references.js';
import {generateImageWithImagen} from '../src/lib/imagen.js';
import {setApiKey} from '../src/lib/gemini.js';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('Gemini generation combines loaded character sheets with its existing background references', () => {
  assert.match(workflow, /buildGeminiReferencePlan\(\{\s*characterImages: images,/);
  assert.match(workflow, /generateImageWithImagen\(apiPrompt, statCallback, referencePlan\.referenceImages, geminiImageOptions\)/);
});

// 非productionの入力構造テスト。画質や実API成功の証拠ではない。
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;

test('all character sheets precede four background crops with matching role indices', () => {
  const sheets = [image('sheet-a'), image('sheet-b')];
  const crops = [1, 2, 3, 4].map(n => image(`background-${n}`));
  const plan = buildGeminiReferencePlan({characterImages: sheets, referenceImages: crops, backgroundReferences: true});
  assert.deepEqual(plan.referenceImages, [...sheets, ...crops]);
  assert.deepEqual(plan.counts, {character: 2, other: 4});
  assert.match(plan.rolePrompt, /Image 1: CHARACTER REFERENCE/);
  assert.match(plan.rolePrompt, /Image 2: CHARACTER REFERENCE/);
  assert.match(plan.rolePrompt, /Image 3: BACKGROUND REFERENCE for panel 1/);
  assert.match(plan.rolePrompt, /Image 6: BACKGROUND REFERENCE for panel 4/);
  assert.match(plan.rolePrompt, /Do not copy sheet layout/);
});

test('without enabled crops the character sheets are still sent', () => {
  const sheets = [image('sheet')];
  assert.deepEqual(buildGeminiReferencePlan({characterImages: sheets}).referenceImages, sheets);
});

test('explicit references including an empty override do not replace character sheets', () => {
  const sheet = image('sheet');
  const additional = image('additional');
  const plan = buildGeminiReferencePlan({characterImages: [sheet], referenceImages: [additional]});
  assert.deepEqual(plan.referenceImages, [sheet, additional]);
  assert.match(plan.rolePrompt, /Image 2: ADDITIONAL REFERENCE/);
  assert.deepEqual(buildGeminiReferencePlan({characterImages: [sheet], referenceImages: []}).referenceImages, [sheet]);
});

test('manual prompt stays unchanged as prefix and an empty plan adds nothing', () => {
  const prompt = '  手動台詞「そのまま。」\r\nCamera: overhead\n';
  assert.equal(appendGeminiReferencePrompt(prompt, buildGeminiReferencePlan()), prompt);
  const plan = buildGeminiReferencePlan({characterImages: [image('sheet')]});
  assert.ok(appendGeminiReferencePrompt(prompt, plan).startsWith(prompt));
});

test('invalid references fail explicitly without dropping images', () => {
  assert.throws(() => buildGeminiReferencePlan({characterImages: null}), /配列/);
  assert.throws(() => buildGeminiReferencePlan({characterImages: ['']}), /画像/);
  assert.throws(() => buildGeminiReferencePlan({referenceImages: [null]}), /画像/);
});

test('real Gemini request builder sends character and background bytes in manifest order', async () => {
  const savedFetch = globalThis.fetch;
  const calls = [];
  const sheet = image('sheet');
  const bg = 'data:image/jpeg;base64,Ymc=';
  const plan = buildGeminiReferencePlan({characterImages: [sheet], referenceImages: [bg], backgroundReferences: true});
  setApiKey('test-only-gemini-key');
  globalThis.fetch = async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    return new Response(JSON.stringify({steps: [{content: [{type: 'image', data: 'b3V0', mime_type: 'image/jpeg'}]}]}));
  };
  try {
    const result = await generateImageWithImagen(appendGeminiReferencePrompt('approved', plan), () => {}, plan.referenceImages);
    assert.equal(calls.length, 1);
    assert.ok(calls[0].url.endsWith('/v1beta/interactions'));
    assert.equal(calls[0].body.model, 'gemini-3.1-flash-image');
    assert.deepEqual(calls[0].body.input.slice(1), [
      {type: 'image', mime_type: 'image/png', data: sheet.split(',')[1]},
      {type: 'image', mime_type: 'image/jpeg', data: 'Ymc='},
    ]);
    assert.match(calls[0].body.input[0].text, /^approved\n\n\[API IMAGE REFERENCE ROLES\]/);
    assert.equal(calls[0].body.response_format.aspect_ratio, '3:4');
    assert.equal(result.base64Img, 'b3V0');
  } finally {
    globalThis.fetch = savedFetch;
    setApiKey('');
  }
});
