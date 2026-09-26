import test from 'node:test';
import assert from 'node:assert/strict';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS, assertImagePromptBudget } from '../src/lib/image-prompt-budget.js';
import { buildOpenAIReferencePlan, getOpenAIPromptBodyBudget, appendOpenAIReferencePrompt } from '../src/lib/openai-image-references.js';
import { buildOpenAIImageRequest } from '../src/lib/openai.js';
import { applyComedyReview } from '../src/lib/comedy-review.js';

test('shared boundary accepts 32,000 characters unchanged and rejects 32,001 without truncating', () => {
  assert.equal(OPENAI_IMAGE_PROMPT_MAX_CHARS, 32000);
  const text = 'あ'.repeat(32000);
  assert.equal(assertImagePromptBudget(text), text);
  assert.equal(buildOpenAIImageRequest(text).body.prompt, text);
  assert.throws(() => assertImagePromptBudget(text + 'い'), /上限/);
  assert.throws(() => buildOpenAIImageRequest(text + 'い'), /32,000/);
  for (const max of [0, -1, NaN, Infinity, 32001]) assert.throws(() => assertImagePromptBudget('test', max), /不正/);
});

test('Web copy and API transport preserve the same full prompt with two reference images', () => {
  // Synthetic request-shape data, never used as image-generation evidence.
  const plan = buildOpenAIReferencePlan({characterImages:['data:image/png;base64,YQ==','data:image/png;base64,Yg==']});
  const available = getOpenAIPromptBodyBudget(plan);
  const body = '本文'.repeat(Math.floor(available / 2)).padEnd(available, '。');
  const copied = appendOpenAIReferencePrompt(body, plan);
  assert.equal(copied.length, 32000);
  assert.equal(copied.slice(0, available), body);
  assert.match(copied, /Image 1: CHARACTER REFERENCE/);
  assert.match(copied, /Image 2: CHARACTER REFERENCE/);
  assert.equal(buildOpenAIImageRequest(copied, {imageInputs:plan.imageInputs}).body.prompt, copied);
  assert.throws(() => appendOpenAIReferencePrompt(body + '。', plan), /上限/);
});

test('AI review can improve instructions above 15,000 but cannot consume reference headroom', () => {
  const before = 'EYE-LINE LOCK: gaze';
  const raw = JSON.stringify({observations:[],patches:[{line:0,before,after:'EYE-LINE LOCK: gaze toward counterpart',confidence:'high',reason:'clarify'}]});
  const original = before + '\n' + 'x'.repeat(15000);
  assert.ok(applyComedyReview(original, raw).prompt.length > original.length);
  assert.equal(applyComedyReview(original, raw, original.length).prompt, original);
});
