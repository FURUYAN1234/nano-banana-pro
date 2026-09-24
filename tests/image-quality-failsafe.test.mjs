import assert from 'node:assert/strict';
import test from 'node:test';
import { parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';

import {
  buildImageQualityRepairPrompt,
  IMAGE_REPAIR_PROMPT_MAX_CHARS,
  inferImageQualityMode,
  runImageQualityFailsafe as executeQualityGate,
  parseImageFailureAnalysis,
  buildImageFailureAnalysisPrompt,
} from '../src/lib/image-quality-failsafe.js';

const analysis = ({ issues, history }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
  issueIndex, observed: issue.reason, expected: 'approved geometry', cause: 'possible wrong overlap',
  previousFailure: history.length ? 'Prior contact correction failed' : 'First attempt',
  nextStrategy: `Rebuild contact at revision ${history.length + 1}`, verification: 'Trace separate contours and count limbs',
})) });
const runImageQualityFailsafe = options => executeQualityGate({ analyzeFailure: async context => analysis(context), ...options });

const SINGLE_IMAGE_PROMPT = `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE breathtaking illustration.`;

const candidate = (id) => ({ id, base64Img: id, mimeType: 'image/png', modelId: 'test-model' });
const pass = { pass: true, issues: [] };
const fail = (type = 'anatomy') => ({
  pass: false,
  issues: [{ type, panel: 2, subject: 'アカリ', reason: '腕が1本多い' }],
});

test('analysis carries failed strategies and outcomes forward and stops as soon as a repair passes', async () => {
  const contexts = [];
  let images = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    analyzeFailure: async context => { contexts.push(structuredClone(context)); return analysis(context); },
    reviewCandidate: async image => image.id === 'repair2' ? pass : fail('bubble_order'),
    generateRepairCandidate: async (prompt, source) => {
      images++;
      assert.match(prompt, /FAILURE ANALYSIS AND REPAIR PLAN/);
      assert.match(prompt, /Rebuild contact/);
      if (images === 2) { assert.match(prompt, /"outcome"/); assert.equal(source.id, 'repair1'); }
      return candidate(`repair${images}`);
    },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'Improved without regressions' }),
  });
  assert.equal(images, 2);
  assert.equal(contexts[1].history[0].outcome.pass, false);
  assert.equal(contexts[1].history[0].analysis[0].nextStrategy, 'Rebuild contact at revision 1');
  assert.equal(result.validationWarning, false);
});

test('a repeated identical strategy is rejected before spending another image', async () => {
  let images = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    analyzeFailure: async ({ issues }) => analysis({ issues, history: [] }),
    reviewCandidate: async () => fail('bubble_order'),
    generateRepairCandidate: async () => { images++; return candidate('repair'); },
  });
  assert.equal(images, 1);
  assert.equal(result.stopReason, 'analysis_failed');
  assert.match(result.repairError.message, /同一/);
});

test('an incomplete analysis never triggers image generation and the prompt demands prior failure analysis', async () => {
  const issues = fail().issues;
  assert.throws(() => parseImageFailureAnalysis('{"corrections":[]}', { issues }), /揃って/);
  assert.match(buildImageFailureAnalysisPrompt({ originalPrompt: 'APPROVED', issues, history: [] }), /different operational change/);
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => fail(), analyzeFailure: async () => 'not JSON',
    generateRepairCandidate: async () => { assert.fail('must not generate without analysis'); },
  });
  assert.equal(result.stopReason, 'analysis_failed');
});

test('unverified QA rechecks the same image once and can recover without any new image', async () => {
  let checks = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => { assert.equal(image.id, 'original'); return ++checks === 1 ? fail('unverified') : pass; },
    generateRepairCandidate: async () => { assert.fail('no image call'); },
  });
  assert.equal(checks, 2);
  assert.equal(result.validationWarning, false);
});

test('unverified bubble-order evidence enters bounded repair instead of bypassing QA', async () => {
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [{
      type: 'unverified', panel: 3, subject: 'bubble_order', reason: 'left-to-right inventory missing',
    }] }),
    generateRepairCandidate: async () => candidate(`repair${++repairs}`),
    compareCandidates: async () => ({ preferred: 'original', reason: 'Order remains unverified.' }),
  });
  assert.equal(repairs, 3);
  assert.equal(result.stopReason, 'retry_limit');
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, true);
});

test('duplicate panel dimensions are collapsed before AI repair analysis', async () => {
  let analyzedIssues;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [
      { type: 'camera_geometry', panel: 2, subject: 'camera_geometry', reason: 'elevation mismatch' },
      { type: 'camera_geometry', panel: 2, subject: 'camera_geometry', reason: 'azimuth mismatch' },
      { type: 'unverified', panel: 1, subject: 'bubble_order', reason: 'inventory missing' },
    ] }),
    analyzeFailure: async context => { analyzedIssues = context.issues; return analysis(context); },
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => ({ preferred: 'original', reason: 'retain baseline' }),
  });
  assert.equal(analyzedIssues.length, 1);
  assert.deepEqual(analyzedIssues.map(issue => issue.type), ['camera_geometry']);
  assert.equal(result.stopReason, 'retry_limit');
});

test('a concrete camera defect is repaired before fail-closed unverified bubble order', async () => {
  let analyzedIssues;
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'repair' ? pass : ({ pass: false, issues: [
      { type: 'camera_geometry', panel: 2, subject: 'Panel 2 rear OTS', reason: 'camera is in front of the named shoulder owner' },
      { type: 'camera_geometry', panel: 2, subject: 'camera_geometry', reason: 'requested rear OTS, observed frontal face' },
      { type: 'unverified', panel: 2, subject: 'bubble_order', reason: 'punctuation transcription differs' },
    ] }),
    analyzeFailure: async context => { analyzedIssues = context.issues; return analysis(context); },
    generateRepairCandidate: async () => { repairs += 1; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'rear OTS is now visible' }),
  });
  assert.equal(repairs, 1);
  assert.equal(analyzedIssues.length, 1);
  assert.equal(analyzedIssues[0].type, 'camera_geometry');
  assert.equal(result.validationWarning, false);
});

test('explicit rear-camera audit exposes a missed camera defect before a bubble repair', async () => {
  let analyzedIssues;
  let repairs = 0;
  let cameraAudits = 0;
  const originalPrompt = `## Panel 2
EXPLICIT REAR CAMERA: camera is physically behind [ヒカリ]'s shoulder; back of [ヒカリ]'s head or shoulder foreground. Do NOT show [ヒカリ]'s face front-on.`;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt,
    reviewCandidate: async image => image.id === 'repair' ? pass : ({ pass: false, issues: [
      { type: 'bubble_speaker', panel: 2, subject: 'B1', reason: 'tail endpoint is ambiguous' },
    ] }),
    reviewCriticalCamera: async image => {
      cameraAudits += 1;
      return image.id === 'repair' ? pass : ({ pass: false, issues: [
        { type: 'camera_geometry', panel: 2, subject: 'ヒカリ', reason: 'front-on face; rear foreground shoulder is absent' },
      ] });
    },
    analyzeFailure: async context => { analyzedIssues = context.issues; return analysis(context); },
    generateRepairCandidate: async () => { repairs += 1; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'original', reason: 'general comparator noticed only unchanged bubble order' }),
  });
  assert.equal(cameraAudits, 2);
  assert.equal(repairs, 1);
  assert.deepEqual(analyzedIssues.map(issue => issue.type), ['camera_geometry']);
  assert.equal(result.candidate.id, 'repair');
  assert.equal(result.validationWarning, false);
});

test('failed or unverified critical camera audit preserves the general review', async () => {
  const originalPrompt = `## Panel 2
EXPLICIT REAR CAMERA: camera is physically behind [ヒカリ]'s shoulder; back of [ヒカリ]'s head or shoulder foreground.`;
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt,
    reviewCandidate: async () => pass,
    reviewCriticalCamera: async () => { throw new Error('camera audit unavailable'); },
    generateRepairCandidate: async () => { repairs += 1; return candidate('repair'); },
  });
  assert.equal(repairs, 0);
  assert.equal(result.finalReview.pass, true);
  assert.deepEqual(result.finalReview.issues, []);
});

test('ordinary prompts do not spend a critical camera audit', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: '## Panel 2\nCamera: ordinary eye-level two-shot',
    reviewCandidate: async () => pass,
    reviewCriticalCamera: async () => { assert.fail('no critical camera API call'); },
    generateRepairCandidate: async () => { assert.fail('no image call'); },
  });
  assert.equal(result.validationWarning, false);
});

test('cancellation after analysis prevents another image request', async () => {
  let cancelled = false;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    shouldStop: () => cancelled, reviewCandidate: async () => fail(),
    analyzeFailure: async context => { cancelled = true; return analysis(context); },
    generateRepairCandidate: async () => { assert.fail('no image after stop'); },
  });
  assert.equal(result.stopReason, 'cancelled');
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, false);
});

test('all four candidates may fail but the best earlier image continues with residual defects and full history', async () => {
  let images = 0;
  const compared = [];
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => fail('bubble_order'),
    generateRepairCandidate: async () => candidate(`repair${++images}`),
    compareCandidates: async (best, next) => {
      compared.push([best.id, next.id]);
      return { preferred: next.id === 'repair1' ? 'repair' : 'original', reason: 'First repair preserves more correct details' };
    },
  });
  assert.equal(images, 3);
  assert.deepEqual(compared, [['original', 'repair1'], ['repair1', 'repair2'], ['repair1', 'repair3']]);
  assert.equal(result.candidate.id, 'repair1');
  assert.equal(result.candidates.length, 4);
  assert.equal(result.history.length, 3);
  assert.equal(result.finalReview.pass, false);
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, true);
  assert.equal(result.stopReason, 'retry_limit');
});

test('invalid analysis receives feedback and can recover without wasting an image', async () => {
  let calls = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'repair' ? pass : fail(),
    analyzeFailure: async context => {
      if (++calls === 1) return 'not JSON';
      assert.match(context.feedback, /読み取れません/);
      return analysis(context);
    },
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => ({ preferred: 'repair', reason: 'Fixed' }),
  });
  assert.equal(calls, 2);
  assert.equal(result.attempts, 2);
  assert.equal(result.validationWarning, false);
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
  assert.equal(result.attempts, 4);
});

test('retains the saved original and stops after three unsuccessful repairs', async () => {
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'),
    originalPrompt: 'BASE PROMPT',
    reviewCandidate: async (value) => value.id === 'original' ? fail('anatomy') : fail('bubble_text'),
    generateRepairCandidate: async () => candidate('repair'),
  });

  assert.equal(result.candidate.id, 'original');
  assert.equal(result.attempts, 4);
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

test('repair prompt keeps bubble order hard and bounds internal retry history', async () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: 'APPROVED SCRIPT AND LAYOUT',
    issues: [{ type: 'bubble_order', panel: 3, subject: 'bubble_order', reason: 'first line is left of second' }],
  });
  assert.match(prompt, /BUBBLE ORDER REPAIR \(HARD CONSTRAINT\)/);

  const longOriginal = 'A'.repeat(15000);
  const result = await executeQualityGate({
    originalCandidate: candidate('original'), originalPrompt: longOriginal,
    reviewCandidate: async () => fail('bubble_order'),
    analyzeFailure: async ({ issues, history }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
      issueIndex, observed: 'x'.repeat(4000), expected: 'y'.repeat(4000), cause: 'z'.repeat(4000),
      previousFailure: 'p'.repeat(4000), nextStrategy: `new ${history.length} ${issueIndex}`, verification: 'v'.repeat(4000),
    })) }),
    generateRepairCandidate: async repairPrompt => {
      assert.ok(repairPrompt.startsWith(longOriginal));
      assert.ok(repairPrompt.length <= IMAGE_REPAIR_PROMPT_MAX_CHARS);
      return candidate('repair');
    },
  });
  assert.equal(result.attempts, 4);
});

test('oversized approved script is preserved without issuing a truncated repair', async () => {
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'),
    originalPrompt: 'A'.repeat(32000) + 'FINAL REQUIRED DIALOGUE',
    reviewCandidate: async () => fail('bubble_order'),
    generateRepairCandidate: async () => assert.fail('must not truncate the contract'),
  });
  assert.equal(result.stopReason, 'prompt_limit');
  assert.equal(result.attempts, 1);
  assert.equal(result.canContinue, true);
});

test('confirmed physical order is repaired before unrelated broad QA defects', async () => {
  let seen;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'repair' ? pass : { ...fail('bubble_order'),
      issues: [...fail('bubble_order').issues, ...fail('panel_layout').issues],
      bubbleInventory: [{ panel: 2, status: 'defect' }] },
    analyzeFailure: async context => { seen = context.issues; return analysis(context); },
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => ({ preferred: 'repair' }),
  });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].type, 'bubble_order');
  assert.equal(result.attempts, 2);
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

test('missing geometric evidence retains the completed image without image regeneration and remains unverified', async () => {
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

test('spatial defects use the three-repair limit and retain the original when still defective', async () => {
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
    assert.equal(repairs, 3);
    assert.equal(result.candidate.id, 'original');
    assert.equal(result.validationWarning, true);
  }
});
