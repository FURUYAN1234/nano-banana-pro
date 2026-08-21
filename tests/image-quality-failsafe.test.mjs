import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildImageQualityRepairPrompt,
  inferImageQualityMode,
  runImageQualityFailsafe,
} from '../src/lib/image-quality-failsafe.js';

const SINGLE_IMAGE_PROMPT = `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE breathtaking illustration.`;

const candidate = (id) => ({ id, base64Img: id, mimeType: 'image/png', modelId: 'test-model' });
const pass = { pass: true, issues: [] };
const fail = (type = 'anatomy') => ({
  pass: false,
  issues: [{ type, panel: 2, subject: 'アカリ', reason: '腕が1本多い' }],
});

test('uses the original image without retry when visible QA passes', async () => {
  let repairCalls = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async () => pass,
    generateRepairCandidate: async () => {
      repairCalls += 1;
      return candidate('repair');
    },
  });

  assert.equal(result.candidate.id, 'original');
  assert.equal(result.attempts, 1);
  assert.equal(result.validationWarning, false);
  assert.equal(repairCalls, 0);
});

test('adopts one repaired image when the bounded retry passes QA', async () => {
  const reviewed = [];
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async (value) => {
      reviewed.push(value.id);
      return value.id === 'original' ? fail('prop_orientation') : pass;
    },
    generateRepairCandidate: async (prompt) => {
      assert.match(prompt, /IMAGE QUALITY CORRECTION ATTEMPT/);
      assert.match(prompt, /prop_orientation/);
      return candidate('repair');
    },
  });

  assert.equal(result.candidate.id, 'repair');
  assert.deepEqual(reviewed, ['original', 'repair']);
  assert.equal(result.attempts, 2);
  assert.equal(result.validationWarning, false);
});

test('restores the saved original image when every repair candidate remains NG', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async (value) => value.id === 'original' ? fail('anatomy') : fail('bubble_text'),
    generateRepairCandidate: async () => candidate('repair'),
  });

  assert.equal(result.candidate.id, 'original');
  assert.equal(result.attempts, 2);
  assert.equal(result.validationWarning, true);
  assert.equal(result.fallbackToOriginal, true);
  assert.equal(result.finalReview.issues[0].type, 'anatomy');
});

test('keeps the original without spending another image call when QA is unverified', async () => {
  let repairCalls = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async () => fail('unverified'),
    generateRepairCandidate: async () => {
      repairCalls += 1;
      return candidate('repair');
    },
  });

  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
  assert.equal(result.fallbackToOriginal, true);
  assert.equal(repairCalls, 0);
});

test('keeps the original when the repair image request fails', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async () => fail('hand_side'),
    generateRepairCandidate: async () => {
      throw new Error('repair transport failed');
    },
  });

  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
  assert.equal(result.fallbackToOriginal, true);
  assert.match(result.repairError.message, /repair transport failed/);
});

test('repair prompt preserves the approved prompt and limits edits to concrete visible issues', () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: 'APPROVED SCRIPT AND LAYOUT',
    issues: fail('prop_ownership').issues,
  });

  assert.match(prompt, /^APPROVED SCRIPT AND LAYOUT/);
  assert.match(prompt, /prop_ownership/);
  assert.match(prompt, /Do not change the approved dialogue, cast, panel order, or story action/);
});

test('single-image quality repair never turns the emotional illustration into a four-panel manga page', () => {
  const originalPrompt = SINGLE_IMAGE_PROMPT;
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt,
    issues: [{
      type: 'anatomy',
      panel: 1,
      subject: 'character right hand',
      reason: 'impossible wrist and finger connection',
    }],
  });

  assert.equal(inferImageQualityMode(originalPrompt), 'single-image');
  assert.match(prompt, /same single illustration/i);
  assert.match(prompt, /Do not introduce panels, panel borders, a comic page, a collage, additional scenes, new characters, or a new setting/i);
  assert.match(prompt, /subject count, action, setting, camera, crop, or story beat/i);
  assert.doesNotMatch(prompt, /same four-panel manga page/i);
  assert.doesNotMatch(prompt, /panel order/i);
});
