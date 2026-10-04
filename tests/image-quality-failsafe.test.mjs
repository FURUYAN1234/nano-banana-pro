import assert from 'node:assert/strict';
import test from 'node:test';
import { parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';

import {
  buildImageQualityRepairPrompt,
  IMAGE_REPAIR_PROMPT_MAX_CHARS,
  GEMINI_IMAGE_REPAIR_PROMPT_MAX_CHARS,
  inferImageQualityMode,
  runImageQualityFailsafe as executeQualityGate,
  formatImageQualityStopReason,
  parseImageFailureAnalysis,
  buildImageFailureAnalysisPrompt,
  enforceBubbleComparison,
  enforceCriticalCameraComparison,
  isMaterialImageQualityIssue,
} from '../src/lib/image-quality-failsafe.js';

test('a requested drawing-medium failure requires complete visible evidence before paid repair', () => {
  const issue = { type: 'art_style', panel: 3, styleEvidence: {
    expectedStyle: 'GEKIGA', observedStyle: 'smooth anime face', visibleRegion: 'face',
    subject: 'visible speaker', location: 'right foreground', observed: 'large anime eyes and smooth face; ink appears only on clothing',
    status: 'defect', materialImpact: 'requested_medium_missing',
  } };
  assert.equal(isMaterialImageQualityIssue(issue), true);
  for (const key of Object.keys(issue.styleEvidence)) {
    const evidence = { ...issue.styleEvidence };
    delete evidence[key];
    assert.equal(isMaterialImageQualityIssue({ ...issue, styleEvidence: evidence }), false, key);
  }
  assert.equal(isMaterialImageQualityIssue({ type: 'art_style', panel: 3 }), false);
  assert.equal(isMaterialImageQualityIssue({ ...issue, styleEvidence: { ...issue.styleEvidence, status: 'uncertain' } }), false);
  assert.equal(isMaterialImageQualityIssue({ ...issue, styleEvidence: { ...issue.styleEvidence, materialImpact: 'minor_variation' } }), false);
});

const analysis = ({ issues, history }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
  issueIndex, observed: issue.reason, expected: 'approved geometry', cause: 'possible wrong overlap',
  previousFailure: history.length ? 'Prior contact correction failed' : 'First attempt',
  nextStrategy: `Rebuild contact at revision ${history.length + 1}`, verification: 'Trace separate contours and count limbs',
})) });

test('concrete anatomy repair adds local reconstruction without changing camera or coherent stylization', () => {
  for (const sourceMode of ['source-image', 'regenerate']) {
    const prompt = buildImageQualityRepairPrompt({originalPrompt:'APPROVED', sourceMode,
      issues:[{type:'anatomy',panel:2,subject:'foreground actor',reason:'face detached from skull'}]});
    assert.match(prompt, /LOCAL ANATOMY REPAIR/);
    assert.match(prompt, /cranium, face, ear, jaw and neck/);
    assert.match(prompt, /head turn, gaze, expression/);
    assert.match(prompt, /keep coherent stylization/);
    for (const type of ['bubble_text', 'unverified']) {
      assert.doesNotMatch(buildImageQualityRepairPrompt({originalPrompt:'APPROVED', sourceMode,
        issues:[{type,panel:2,reason:'text uncertain'}]}), /LOCAL ANATOMY REPAIR/);
    }
  }
});
const confirmedOriginal = async (_before, _after, _prompt, { originalIssues = [] } = {}) => ({
  preferred: 'original', reason: 'Fixture: original defect still visible; repair is worse.',
  originalIssueChecks: originalIssues.map((issue, issueIndex) => ({ issueIndex, status: 'defect', evidence: issue.reason })),
});
const runImageQualityFailsafe = options => executeQualityGate({ analyzeFailure: async context => analysis(context), compareCandidates: confirmedOriginal, ...options });

const SINGLE_IMAGE_PROMPT = `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE breathtaking illustration.`;

const candidate = (id) => ({ id, base64Img: id, mimeType: 'image/png', modelId: 'test-model' });
const pass = { pass: true, issues: [] };
const fail = (type = 'anatomy') => ({
  pass: false,
  issues: [{ type, panel: 2, subject: 'アカリ', reason: '腕が1本多い' }],
});

test('rejected repair stops without repeating the stale defect and preserves both candidates', async () => {
  let repairs = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original' ? fail('panel_layout') : fail('bubble_order'),
    generateRepairCandidate: async () => { repairs++; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'original', reason: 'The repair worsened dialogue; cast appears correct in both.' }),
  });
  assert.equal(repairs, 1);
  assert.equal(result.stopReason, 'no_improvement');
  assert.equal(result.validationWarning, true);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.candidates.length, 2);
});

test('a quality API request timeout remains unverified and retains the image', async () => {
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => { throw new Error('The quality API request timed out.'); },
    generateRepairCandidate: async () => assert.fail('timeout is not an image defect'),
  });
  assert.equal(result.stopReason, 'unverified');
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, true);
  assert.equal(result.candidate.id, 'original');
  assert.match(result.finalReview.issues[0].reason, /API request timed out/);
});

test('comparison reconciles disproved, uncertain or missing defect checks without declaring PASS', async () => {
  for (const checks of [
    [{ issueIndex: 0, status: 'ok', evidence: 'Both hands are separate and correctly attached.' }],
    [{ issueIndex: 0, status: 'uncertain', evidence: 'The elbow is obscured.' }],
    [],
    [{ issueIndex: 1, status: 'defect', evidence: 'A different alleged issue is visible.' }],
    [{ issueIndex: 0, status: 'defect', evidence: 'extra arm' }, { issueIndex: 0, status: 'ok', evidence: 'two arms' }],
  ]) {
    const original = fail();
    const result = await runImageQualityFailsafe({
      originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
      reviewCandidate: async image => image.id === 'original' ? original : fail('bubble_text'),
      generateRepairCandidate: async () => candidate('repair'),
      compareCandidates: async () => ({ preferred: 'original', reason: 'Original preserves the dialogue.', originalIssueChecks: checks }),
    });
    assert.equal(result.attempts, 2);
    assert.equal(result.finalReview.pass, false);
    assert.equal(result.finalReview.issues[0].type, 'unverified');
    assert.deepEqual(result.finalReview.issues[0].originalIssue, original.issues[0]);
    assert.deepEqual(result.finalReview.issues[0].comparisonEvidence.checks, checks.filter(check => check.issueIndex === 0));
    assert.equal(result.originalReview.issues[0].type, 'anatomy');
    assert.equal(result.candidates[0].review, result.finalReview);
  }
});

test('preference overrides retain structured checks used to authorize further repairs', () => {
  const comparison = { preferred: 'repair', reason: 'original comparison', originalIssueChecks: [{ issueIndex: 0, status: 'defect', evidence: 'visible extra limb' }] };
  const before = { ...fail(), bubbleInventory: [{ panel: 1, status: 'ok' }] };
  const after = { ...fail('bubble_text'), bubbleInventory: [{ panel: 1, status: 'defect' }] };
  const bubble = enforceBubbleComparison(comparison, before, after);
  assert.equal(bubble.preferred, 'original');
  assert.deepEqual(bubble.originalIssueChecks, comparison.originalIssueChecks);
  const camera = enforceCriticalCameraComparison({ ...comparison, preferred: 'original' }, fail('camera_geometry'), { ...pass, criticalCameraAudit: pass });
  assert.equal(camera.preferred, 'repair');
  assert.deepEqual(camera.originalIssueChecks, comparison.originalIssueChecks);
});

test('timeout retains the last acquired review and cannot accept late mutations', async () => {
  const primary = { ...fail(), observations: { hands: 'Visible extra limb' } };
  let lateWrite;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED', allowRepair: false,
    reviewCandidate: async (_image, _prompt, { onReviewProgress }) => {
      onReviewProgress?.(primary);
      lateWrite = () => { primary.issues.length = 0; onReviewProgress?.(pass); };
      throw new Error('A supplementary API request timed out.');
    },
    generateRepairCandidate: async () => assert.fail('review timeout does not authorize repair'),
  });
  lateWrite();
  assert.equal(result.stopReason, 'repair_disabled');
  assert.equal(result.finalReview.pass, false);
  assert.equal(result.finalReview.issues[0].type, 'anatomy');
  assert.equal(result.finalReview.observations.hands, 'Visible extra limb');
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified'));
});

test('a different identity feature on the same actor cannot corroborate the original defect', async () => {
  let reviews = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [{
      type: 'character_reference', panel: 2, subject: 'actor',
      materialFeatures: ++reviews === 1 ? ['eyewear'] : ['defining_accessory'],
      reason: reviews === 1 ? 'required glasses missing' : 'required pendant missing',
    }] }),
    generateRepairCandidate: async () => assert.fail('different feature does not confirm missing glasses'),
  });
  assert.equal(result.attempts, 1);
  assert.equal(result.finalReview.issues[0].type, 'unverified');
});

test('comparison checks map only to their exact alleged person and panel while confirmed defects continue', async () => {
  const disputed = { type: 'anatomy', panel: 1, subject: 'first actor', reason: 'uncertain arm contour' };
  const confirmed = { type: 'anatomy', panel: 2, subject: 'second actor', reason: 'visible third arm' };
  const planned = [];
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original' ? { pass: false, issues: [disputed, confirmed] } : fail('bubble_text'),
    analyzeFailure: async context => { planned.push(context.issues); return analysis(context); },
    generateRepairCandidate: async () => candidate(`repair${++repairs}`),
    compareCandidates: async (_before, _after, _prompt, { originalIssues }) => ({
      preferred: 'original', reason: 'Original dialogue is better',
      originalIssueChecks: originalIssues.map((issue, issueIndex) => ({ issueIndex,
        status: issue.subject === confirmed.subject ? 'defect' : 'ok', evidence: issue.reason })),
    }),
  });
  assert.equal(repairs, 3);
  assert.deepEqual(planned.map(issues => issues.map(issue => issue.subject)), [
    ['first actor', 'second actor'], ['second actor'], ['second actor'],
  ]);
  assert.equal(result.finalReview.issues[0].type, 'unverified');
  assert.equal(result.finalReview.issues[1].type, 'anatomy');
});

test('bubble preference override preserves confirmation for all three warranted repairs', async () => {
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original'
      ? { ...fail(), bubbleInventory: [{ panel: 1, status: 'ok' }] }
      : { ...fail('bubble_text'), bubbleInventory: [{ panel: 1, status: 'defect' }] },
    generateRepairCandidate: async () => candidate(`repair${++repairs}`),
    compareCandidates: async (...args) => ({ ...await confirmedOriginal(...args), preferred: 'repair' }),
  });
  assert.equal(repairs, 3);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.finalReview.issues[0].type, 'anatomy');
  assert.ok(result.history.every(entry => entry.comparison.originalIssueChecks[0].status === 'defect'));
});

test('elapsed workflow time never shortens individual API request limits or skips required checks', async t => {
  let now = 0;
  t.mock.method(Date, 'now', () => now);
  const requestLimits = [];
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async (image, _prompt, options) => {
      requestLimits.push(options?.timeoutMs); now += 600_001;
      return image.id === 'original' ? fail() : pass;
    },
    analyzeFailure: async context => { requestLimits.push(context.requestOptions?.timeoutMs); now += 600_001; return analysis(context); },
    generateRepairCandidate: async () => { now += 600_001; return candidate('repair'); },
    compareCandidates: async (_before, _after, _prompt, options) => {
      requestLimits.push(options?.timeoutMs); now += 600_001;
      return { preferred: 'repair', reason: 'Visible defect is corrected' };
    },
  });
  assert.deepEqual(requestLimits, [undefined, undefined, undefined, undefined]);
  assert.equal(result.candidate.id, 'repair');
  assert.equal(result.finalReview.pass, true);
  assert.equal(result.validationWarning, false);
  assert.equal(result.candidates.length, 2);
});

test('progress explains the defect that warrants repair and the result of each recheck', async () => {
  const progress = [];
  await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original' ? fail() : pass,
    generateRepairCandidate: async () => candidate('repair'),
    compareCandidates: async () => ({ preferred: 'repair', reason: '腕の本数が正しい' }),
    onProgress: message => progress.push(message),
  });
  assert.ok(progress.some(message => /初回検査.*アカリ.*腕が1本多い/.test(message)));
  assert.ok(progress.some(message => /再検査.*合格/.test(message)));
  assert.ok(progress.some(message => /候補比較.*腕の本数が正しい/.test(message)));
});

test('progress shows a concrete repair reason even after many uncertain observations', async () => {
  const progress = [];
  const uncertain = Array.from({ length: 6 }, (_, index) => ({
    type: 'unverified', panel: 1, subject: `uncertain-${index}`, reason: `見えない箇所${index}`,
  }));
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED', allowRepair: false,
    reviewCandidate: async () => ({ pass: false, issues: [...uncertain, ...fail().issues] }),
    generateRepairCandidate: async () => assert.fail('repair was disabled'),
    onProgress: message => progress.push(message),
  });
  assert.equal(result.stopReason, 'repair_disabled');
  assert.ok(progress.some(message => /初回検査結果: 要修正.*アカリ.*腕が1本多い/.test(message)));
});

test('first repair prompt does not repeat the current plan as prior failed history', async () => {
  let sentPrompt = '';
  await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original' ? fail() : pass,
    generateRepairCandidate: async prompt => { sentPrompt = prompt; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: '修正済み' }),
  });
  assert.match(sentPrompt, /FAILURE ANALYSIS AND REPAIR PLAN/);
  assert.doesNotMatch(sentPrompt, /PRIOR ATTEMPTS/);
});

test('repair prompt avoids duplicating diagnostic prose before reaching the limit', async () => {
  const defect = { type: 'character_reference', panel: 2, subject: 'ヒカリ', materialFeatures: ['eyewear'], reason: '眼鏡がない。' + '観察'.repeat(250) };
  let sentPrompt = '';
  await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'original' ? { pass: false, issues: [defect] } : pass,
    analyzeFailure: async () => JSON.stringify({ corrections: [{ issueIndex: 0,
      observed: defect.reason, expected: '眼鏡をかける', cause: '形状の省略', previousFailure: 'First attempt',
      nextStrategy: '顔の眼鏡を局所修正', verification: '眼鏡の輪郭を確認',
    }] }),
    generateRepairCandidate: async prompt => { sentPrompt = prompt; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: '眼鏡を確認' }),
  });
  assert.equal(sentPrompt.split(defect.reason).length - 1, 1);
  assert.match(sentPrompt, /顔の眼鏡を局所修正/);
  assert.match(sentPrompt, /眼鏡の輪郭を確認/);
});

test('failed repair generation retains original without claiming a comparison', async () => {
  const progress = [];
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => fail(),
    generateRepairCandidate: async () => { throw new Error('API Time out'); },
    onProgress: message => progress.push(message),
  });
  assert.equal(result.stopReason, 'generation_failed');
  assert.equal(result.candidates.length, 1);
  assert.ok(progress.some(message => /元画像を警告付きで保持.*修正版の生成失敗/.test(message)));
  assert.ok(progress.every(message => !/比較で保持した最良候補/.test(message)));
});

test('uncertain review reports why repair is skipped without spending an image request', async () => {
  const progress = [];
  await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [{ type: 'unverified', reason: '指が隠れていて数えられない' }] }),
    generateRepairCandidate: async () => assert.fail('uncertainty is not a repair trigger'),
    onProgress: message => progress.push(message),
  });
  assert.ok(progress.some(message => /未確認.*指が隠れていて数えられない/.test(message)));
  assert.ok(progress.some(message => /再生成しません/.test(message)));
});

test('disabled repair still identifies uncertainty separately from a confirmed defect', async () => {
  for (const [review, expectedReason, expectedLog] of [
    [{ pass: false, issues: [{ type: 'unverified', reason: '手が隠れている' }] }, 'unverified', /未確認のみ.*再生成しません/],
    [fail(), 'repair_disabled', /明確な修正対象.*自動修正OFF/],
  ]) {
    const progress = [];
    const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
      reviewCandidate: async () => review, allowRepair: false,
      generateRepairCandidate: async () => assert.fail('repair was disabled'),
      onProgress: message => progress.push(message),
    });
    assert.equal(result.stopReason, expectedReason);
    assert.ok(progress.some(message => expectedLog.test(message)));
    assert.ok(progress.some(message => /元画像を警告付きで保持/.test(message)));
    assert.ok(progress.every(message => !/（(?:unverified|repair_disabled)）/.test(message)));
  }
  assert.equal(formatImageQualityStopReason('unverified'), '根拠不足のみ');
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

test('repair history does not conflate different people in the same panel', () => {
  const first = { type: 'character_reference', panel: 2, subject: 'ヒカリ', reason: '眼鏡がない' };
  const second = { type: 'character_reference', panel: 2, subject: 'リン', reason: '眼鏡がない' };
  const firstPlan = parseImageFailureAnalysis(analysis({ issues: [first], history: [] }),
    { issues: [first], history: [], originalPrompt: 'APPROVED' });
  const history = [{ analysis: firstPlan }];
  const secondPlan = parseImageFailureAnalysis(analysis({ issues: [second], history: [] }),
    { issues: [second], history, originalPrompt: 'APPROVED' });
  assert.notEqual(firstPlan[0].key, secondPlan[0].key);
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

test('unverified QA keeps the original without a redundant second review or image request', async () => {
  let checks = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => { assert.equal(image.id, 'original'); return ++checks === 1 ? fail('unverified') : pass; },
    generateRepairCandidate: async () => { assert.fail('no image call'); },
  });
  assert.equal(checks, 1);
  assert.equal(result.validationWarning, true);
  assert.equal(result.stopReason, 'unverified');
});

test('unverified bubble order cannot spend paid image retries', async () => {
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [{
      type: 'unverified', panel: 3, subject: 'bubble_order', reason: 'left-to-right inventory missing',
    }] }),
    generateRepairCandidate: async () => candidate(`repair${++repairs}`),
    compareCandidates: async () => ({ preferred: 'original', reason: 'Order remains unverified.' }),
  });
  assert.equal(repairs, 0);
  assert.equal(result.stopReason, 'unverified');
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, true);
});

test('a coherent image with only gesture or incidental-print differences is kept without regeneration', async () => {
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ({ pass: false, issues: [
      { type: 'action_fidelity', panel: 1, subject: 'actor', reason: 'A prop is held instead of being placed, while the story remains clear.' },
      { type: 'surface_text', textRole: 'incidental', panel: 2, subject: 'poster', reason: 'Decorative print differs.' },
    ] }),
    generateRepairCandidate: async () => { repairs++; return candidate('repair'); },
  });
  assert.equal(repairs, 0);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.stopReason, 'non_material');
  assert.equal(result.validationWarning, true);
  assert.equal(result.canContinue, true);
});

test('grounded harmless differences remain warnings, but anatomy and story errors cannot be waived', async () => {
  const issue = { type: 'object_geometry', panel: 1, subject: 'background ornament', reason: 'Slight contour variation.', material_impact: 'none', impact_reason: 'The object remains plausible and the story and action are intact.' };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [issue] }), { mode: 'single-image' });
  assert.equal(isMaterialImageQualityIssue(review.issues[0]), false);
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => review,
    generateRepairCandidate: async () => assert.fail('harmless variation must not spend an image request'),
  });
  assert.equal(result.canContinue, true);
  assert.equal(result.validationWarning, true);
  assert.equal(result.attempts, 1);
  assert.equal(result.finalReview.pass, false);
  for (const type of ['anatomy', 'story_integrity', 'bubble_text', 'bubble_speaker', 'bubble_order', 'cast_count', 'panel_layout']) {
    const critical = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{ ...issue, type, reason: 'Visible left hand attached to the right wrist.' }] }), { mode: 'single-image' });
    assert.equal(isMaterialImageQualityIssue(critical.issues[0]), true, type);
  }
  const unsupported = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{ ...issue, impact_reason: '' }] }), { mode: 'single-image' });
  assert.equal(isMaterialImageQualityIssue(unsupported.issues[0]), true);
});

test('a clear extra limb still triggers repair while minor issues are excluded from the repair plan', async () => {
  let plannedIssues;
  let repairs = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => image.id === 'repair' ? pass : ({ pass: false, issues: [
      { type: 'anatomy', panel: 4, subject: 'actor', reason: 'A third shoulder-connected arm is visible.' },
      { type: 'action_fidelity', panel: 1, subject: 'actor', reason: 'A card is held rather than placed.' },
    ] }),
    analyzeFailure: async context => { plannedIssues = context.issues; return analysis(context); },
    generateRepairCandidate: async () => { repairs++; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'The extra arm is gone.' }),
  });
  assert.equal(repairs, 1);
  assert.deepEqual(plannedIssues.map(issue => issue.type), ['anatomy']);
  assert.equal(result.candidate.id, 'repair');
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
    compareCandidates: confirmedOriginal,
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

test('conflicting rear-camera reviews do not spend an image repair or claim a pass', async () => {
  const originalPrompt = `## Panel 3
EXPLICIT REAR CAMERA: camera is physically behind [リン]'s shoulder; back of [リン]'s head or shoulder foreground.`;
  const progress = [];
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt,
    reviewCandidate: async () => ({ pass: false, issues: [
      { type: 'camera_geometry', panel: 3, subject: 'リン', reason: 'The required rear shoulder is absent.' },
      { type: 'unverified', panel: 1, subject: 'hands', reason: 'Digits are occluded.' },
    ] }),
    reviewCriticalCamera: async () => ({ pass: true, issues: [], criticalCameraChecks: [{ panel: 3 }] }),
    generateRepairCandidate: async () => { assert.fail('conflicting reviews cannot authorize paid repair'); },
    onProgress: message => progress.push(message),
  });
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
  assert.equal(result.finalReview.pass, false);
  assert.equal(result.finalReview.issues.some(issue => issue.type === 'camera_geometry'), false);
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified' && /conflict|矛盾/i.test(issue.reason)));
  assert.ok(progress.some(message => /矛盾/.test(message)));
});

test('rear-camera audit does not suppress an unrelated camera defect', async () => {
  const originalPrompt = `## Panel 3
EXPLICIT REAR CAMERA: camera is physically behind [リン]'s shoulder; back of [リン]'s head or shoulder foreground.`;
  let repaired = 0;
  await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt,
    reviewCandidate: async image => image.id === 'repair' ? pass : ({ pass: false, issues: [
      { type: 'camera_geometry', panel: 2, subject: 'camera', reason: 'The scripted low angle is clearly reversed.' },
    ] }),
    reviewCriticalCamera: async () => ({ pass: true, issues: [], criticalCameraChecks: [{ panel: 3 }] }),
    generateRepairCandidate: async () => { repaired += 1; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'Panel 2 camera restored.' }),
  });
  assert.equal(repaired, 1);
});

test('one uncorroborated cast-style judgment cannot spend an image repair', async () => {
  const progress = [];
  let reviews = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => ++reviews === 1 ? ({ pass: false, issues: [
      { type: 'character_reference', panel: 2, subject: 'actor', reason: 'hair curl and shade seem different' },
    ] }) : pass,
    generateRepairCandidate: async () => { assert.fail('unconfirmed identity issue cannot spend an image request'); },
    onProgress: message => progress.push(message),
  });
  assert.equal(reviews, 2);
  assert.equal(result.candidate.id, 'original');
  assert.equal(result.validationWarning, true);
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified' && /再検査/.test(issue.reason)));
  assert.ok(progress.some(message => /人物差分の独立再検査/.test(message)));
});

test('repeated concrete cast mismatch remains eligible for repair', async () => {
  let reviews = 0;
  let repairs = 0;
  const mismatch = { pass: false, issues: [
    { type: 'character_reference', panel: 2, subject: 'actor', materialFeatures: ['eyewear'], reason: 'required glasses are visibly absent' },
  ] };
  await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async image => {
      reviews += 1;
      return image.id === 'original' ? mismatch : pass;
    },
    generateRepairCandidate: async () => { repairs += 1; return candidate('repair'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'required glasses restored' }),
  });
  assert.equal(reviews, 3);
  assert.equal(repairs, 1);
});

test('failed critical camera audit leaves the image quality unverified', async () => {
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
  assert.equal(result.finalReview.pass, false);
  assert.equal(result.validationWarning, true);
  assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified'));
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
    compareCandidates: async (best, next, prompt, options) => {
      compared.push([best.id, next.id]);
      return { ...await confirmedOriginal(best, next, prompt, options), preferred: next.id === 'repair1' ? 'repair' : 'original', reason: 'First repair preserves more correct details' };
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
      return value.id === 'original' ? fail('object_geometry') : pass;
    },
    generateRepairCandidate: async (prompt) => {
      assert.match(prompt, /IMAGE QUALITY CORRECTION ATTEMPT/);
      assert.match(prompt, /object_geometry/);
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
  assert.equal(result.stopReason, 'no_improvement');
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
    reviewCandidate: async () => fail('anatomy'),
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

test('wardrobe repair preserves acting, expression and camera in both repair routes', () => {
  const issues = [{ type: 'wardrobe_continuity', panel: 4, subject: 'Actor A', reason: 'visible inner garment changed' }];
  for (const sourceMode of ['source-image', 'regenerate']) {
    const prompt = buildImageQualityRepairPrompt({ originalPrompt: 'APPROVED SCRIPT AND LAYOUT', issues, sourceMode });
    assert.match(prompt, /wardrobe_continuity/);
    assert.match(prompt, /acting, expressions, camera/);
    assert.match(prompt, /costume/);
  }
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
    compareCandidates: confirmedOriginal,
    reviewCandidate: async () => fail('bubble_order'),
    analyzeFailure: async ({ issues, history }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
      issueIndex, observed: 'x'.repeat(4000), expected: 'y'.repeat(4000), cause: 'z'.repeat(4000),
      previousFailure: 'p'.repeat(4000), nextStrategy: `new ${history.length} ${issueIndex}`, verification: 'Transcribe both bubbles and compare horizontal order.',
    })) }),
    generateRepairCandidate: async repairPrompt => {
      assert.ok(repairPrompt.startsWith(longOriginal));
      assert.ok(repairPrompt.length <= IMAGE_REPAIR_PROMPT_MAX_CHARS);
      assert.ok(repairPrompt.length < longOriginal.length + 5000, 'diagnostics stay short even with unused API capacity');
      return candidate('repair');
    },
  });
  assert.equal(result.attempts, 4);
});

test('oversized repair operations are held without truncating their meaning or paying for another image', async () => {
  const result = await executeQualityGate({
    originalCandidate: candidate('original'), originalPrompt: 'APPROVED',
    reviewCandidate: async () => fail('anatomy'),
    analyzeFailure: async ({ issues }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
      issueIndex, observed: 'Extra hand', expected: 'Two connected hands', cause: 'Duplicated gesture',
      previousFailure: 'First attempt', nextStrategy: 'repair instruction '.repeat(300), verification: 'Check shoulder connections',
    })) }),
    generateRepairCandidate: async () => assert.fail('must preserve the original instead of truncating the operation'),
  });
  assert.equal(result.attempts, 1);
  assert.equal(result.stopReason, 'prompt_limit');
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

test('Gemini repair budget accepts the same long contract that its initial image route already accepts', async () => {
  const originalPrompt = 'A'.repeat(52000) + 'FINAL REQUIRED DIALOGUE';
  let repairCalls = 0;
  const result = await runImageQualityFailsafe({
    originalCandidate: candidate('original'), originalPrompt,
    repairPromptMaxChars: GEMINI_IMAGE_REPAIR_PROMPT_MAX_CHARS,
    reviewCandidate: async image => image.id === 'repair' ? pass : fail('panel_layout'),
    generateRepairCandidate: async repairPrompt => {
      repairCalls++;
      assert.ok(repairPrompt.startsWith(originalPrompt));
      assert.ok(repairPrompt.length <= GEMINI_IMAGE_REPAIR_PROMPT_MAX_CHARS);
      return candidate('repair');
    },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'fixed title and margins' }),
  });
  assert.equal(repairCalls, 1);
  assert.equal(result.validationWarning, false);
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
    const review = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{ type, panel: 2, subject: 'scene prop', reason: 'visible physical boundary or text-plane contradiction', ...(type === 'surface_text' ? { text_role: 'story_required' } : {}) }] }));
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
