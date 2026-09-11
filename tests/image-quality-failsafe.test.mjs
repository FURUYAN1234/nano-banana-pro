import assert from 'node:assert/strict';
import test from 'node:test';
import { parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';

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

test('an ungrounded screen/back accusation keeps the image and continues without repair', async () => {
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{
    type: 'prop_orientation', panel: 2, subject: 'tablet', reason: 'The screen faces camera',
  }] }));
  let repairs = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'BASE',
    reviewCandidate: async () => review,
    generateRepairCandidate: async () => { repairs++; return candidate('repair'); },
  });
  assert.equal(repairs, 0);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
});

test('disabled automatic repair preserves a concrete QA failure without another image request', async () => {
  let calls = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'BASE PROMPT',
    allowRepair: false,
    reviewCandidate: async () => fail(),
    generateRepairCandidate: async () => { calls++; return candidate('repair'); },
  });
  assert.equal(calls, 0);
  assert.equal(result.attempts, 1);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
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
    compareCandidates: async () => ({ preferred: 'repair', reason: 'Only repair fixes the visible defect without regression.' }),
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

test('keeps the original when direct comparison prefers it despite a passing repair', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'BASE PROMPT',
    reviewCandidate: async value => value.id === 'original' ? fail() : pass,
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => ({ preferred: 'original', reason: 'Original better preserves dialogue.' }),
  });
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
});

test('comparison failure does not discard the original', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'BASE PROMPT',
    reviewCandidate: async value => value.id === 'original' ? fail() : pass,
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => { throw new Error('comparison unavailable'); },
  });
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.attempts, 2);
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
  assert.match(prompt, /exactly four separate visible panels/i);
  assert.match(prompt, /original page geometry/i);
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

test('source-image repair states change preserve and verify without changing the approved prefix', () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: 'APPROVED SCRIPT',
    sourceMode: 'source-image',
    issues: [{type: 'prop_ownership', panel: 2, subject: '人物Aの手', reason: '小道具が別人物の手に接続している'}],
  });
  assert.ok(prompt.startsWith('APPROVED SCRIPT'));
  for (const label of ['SOURCE IMAGE TO EDIT', 'CHANGE:', 'PRESERVE:', 'VERIFY:']) assert.ok(prompt.includes(label));
  assert.match(prompt, /prop_ownership/);
  assert.match(prompt, /exactly four separate visible panels/i);
  assert.match(prompt, /necessary local contact and shadow changes/i);
});

test('source-image single illustration repair does not invent a comic layout', () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: SINGLE_IMAGE_PROMPT,
    sourceMode: 'source-image',
    issues: [{type: 'anatomy', panel: null, subject: 'hand', reason: 'extra finger'}],
  });
  assert.match(prompt, /same single illustration/i);
  assert.doesNotMatch(prompt, /exactly four separate visible panels/i);
});

test('missing geometric evidence retains the completed image with no paid repair or workflow rejection', async () => {
  let repairs = 0;
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations: { title: 'none', dialogue: 'none', hands: 'hidden', props: 'consistent' } }));
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => review,
    generateRepairCandidate: async () => { repairs++; return candidate('repair'); },
  });
  assert.equal(repairs, 0);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
});

test('new spatial defects use the same one-repair limit and retain the original if the repair is still defective', async () => {
  for (const type of ['object_geometry', 'surface_text']) {
    let repairs = 0;
    const review = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{ type, panel: 2, subject: 'scene prop', reason: 'visible physical boundary or text-plane contradiction' }] }));
    const result = await runImageQualityFailsafe({
      originalCandidate: candidate('original'), originalPrompt: 'APPROVED SURREAL EVENT', repairSourceMode: 'source-image',
      reviewCandidate: async () => review,
      generateRepairCandidate: async prompt => {
        repairs++;
        assert.ok(prompt.startsWith('APPROVED SURREAL EVENT'));
        assert.ok(prompt.includes(type));
        assert.match(prompt, /Keep source-supported surreal events/);
        return candidate('repair');
      },
    });
    assert.equal(repairs, 1);
    assert.equal(result.candidate.id, 'original');
    assert.equal(result.validationWarning, true);
  }
});
