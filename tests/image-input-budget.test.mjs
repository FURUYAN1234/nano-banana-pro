import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOpenAIReferencePlan } from '../src/lib/openai-image-references.js';
import { buildGeminiReferencePlan } from '../src/lib/gemini-image-references.js';
import { generateImageWithImagen } from '../src/lib/imagen.js';

const budget = await import('../src/lib/image-input-budget.js').catch(error => {
  if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
  return {};
});
const image = id => `data:image/png;base64,${Buffer.from(id).toString('base64')}`;
const sheets = count => Array.from({ length: count }, (_, i) => image(`sheet-${i}`));
function requireAdmission() {
  assert.equal(typeof budget.planImageAddition, 'function', 'STEP1 needs an admission boundary before any state/API mutation');
}

test('common character-sheet budget accepts 14 and rejects 15 without truncation', () => {
  requireAdmission();
  const allowed = budget.planImageAddition({ existingImages: [], incomingImages: sheets(14) });
  assert.equal(allowed.images.length, 14);
  assert.equal(allowed.budget.maxCharacterImages, 14);
  assert.throws(() => budget.planImageAddition({ existingImages: [], incomingImages: sheets(15) }), error => {
    assert.equal(error.code, 'IMAGE_INPUT_LIMIT');
    assert.match(error.message, /14枚/);
    return true;
  });
});

test('background reserves all four Gemini panel views; both providers and OpenAI repair remain valid', () => {
  requireAdmission();
  const plan = budget.planImageAddition({ existingImages: [], incomingImages: sheets(10), backgroundEnabled: true });
  assert.equal(plan.budget.maxCharacterImages, 10);
  assert.equal(buildGeminiReferencePlan({ characterImages: plan.images, referenceImages: sheets(4) }).referenceImages.length, 14);
  assert.equal(buildOpenAIReferencePlan({ characterImages: plan.images, backgroundImage: image('bg'), backgroundEnabled: true,
    originalCandidate: { base64Img: Buffer.from('original').toString('base64'), mimeType: 'image/png' } }).imageInputs.length, 12);
  assert.throws(() => budget.planImageAddition({ existingImages: [], incomingImages: sheets(11), backgroundEnabled: true }), /10枚/);
});

test('failed additions retain existing images and duplicate sheets do not spend another input slot', () => {
  requireAdmission();
  const existing = sheets(13); const before = [...existing];
  assert.throws(() => budget.planImageAddition({ existingImages: existing, incomingImages: [image('new-a'), image('new-b')] }), /14枚/);
  assert.deepEqual(existing, before);
  const repeated = budget.planImageAddition({ existingImages: existing, incomingImages: [existing[0], image('new-a'), image('new-a')] });
  assert.deepEqual(repeated.addedImages, [image('new-a')]);
  assert.equal(repeated.images.length, 14);
});

test('one sheet with several characters still uses one image; JSON-only additions use zero slots', () => {
  requireAdmission();
  const plan = budget.planImageAddition({ existingImages: [], incomingImages: [image('one sheet: several named people')] });
  assert.equal(plan.budget.characterImageCount, 1);
  const jsonOnly = budget.planImageAddition({ existingImages: sheets(14), incomingImages: [] });
  assert.equal(jsonOnly.images.length, 14);
  assert.equal(jsonOnly.addedImages.length, 0);
});

test('Gemini rejects 15 actual references instead of letting an over-limit request reach the API', async () => {
  assert.equal(buildGeminiReferencePlan({ characterImages: sheets(14) }).referenceImages.length, 14);
  assert.throws(() => buildGeminiReferencePlan({ characterImages: sheets(15) }), /14枚/);
  const savedFetch = globalThis.fetch; let called = 0;
  globalThis.fetch = async () => { called++; throw Error('over-limit input reached fetch'); };
  try {
    await assert.rejects(generateImageWithImagen('approved prompt', () => {}, sheets(15)), /14枚/);
    assert.equal(called, 0);
  } finally { globalThis.fetch = savedFetch; }
});
