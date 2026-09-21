import test from 'node:test';
import assert from 'node:assert/strict';
import { runImageQualityFailsafe } from '../src/lib/image-quality-failsafe.js';
import { parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';

const analyzeFailure = async ({ issues }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
  issueIndex, observed: issue.reason, expected: 'correct anatomy', cause: 'possibly confused contact',
  previousFailure: 'First attempt', nextStrategy: 'Separate the finger contours locally', verification: 'Count fingers and check dialogue',
})) });

// Synthetic contracts test state transitions, not actual vision accuracy.
test('an improved repair with unresolved QA is compared and retained without another generation', async () => {
  let generations = 0;
  const result = await runImageQualityFailsafe({ analyzeFailure, originalCandidate: 'original', originalPrompt: 'script',
    reviewCandidate: async image => ({ pass: false, issues: [{ type: image === 'original' ? 'anatomy' : 'unverified', reason: 'remaining issue' }] }),
    generateRepairCandidate: async () => { generations++; return 'repair'; },
    compareCandidates: async (first, second, prompt, options) => {
      assert.equal(first, 'original'); assert.equal(second, 'repair'); assert.equal(prompt, 'script'); assert.equal(options.allowIncomplete, true);
      return { preferred: 'repair', reason: 'hand fixed; text preserved' };
    },
  });
  assert.equal(result.candidate, 'repair'); assert.equal(result.validationWarning, true);
  assert.equal(result.finalReview.issues[0].type, 'unverified'); assert.equal(result.fallbackToOriginal, false);
  assert.equal(generations, 1);
});

test('unsupported identity claims cannot become paid repair targets', () => {
  for (const identity_evidence of [undefined, { location: 'left', matched_features: ['glasses'], reference_evidence: 'sheet', observed_feature: 'glasses', expected_feature: 'none' },
    { location: 'left', matched_features: ['black hair', 'long hair'], reference_evidence: 'sheet', observed_feature: 'no glasses', expected_feature: 'no glasses' }]) {
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{ type: 'character_reference', panel: 1, subject: 'person', reason: 'wrong glasses', identity_evidence }] }));
    assert.equal(result.issues.some(issue => issue.type === 'character_reference'), false);
    assert.equal(result.pass, false);
  }
});

test('structured print observations produce a role-preserving defect even if narrative omits it', () => {
  const surface = { subject: 'stacked book', face: 'spine', object_axes: 'book top points left', glyph_axes: 'glyph tops point up', expected_axes: 'glyph tops point left per source', basis: 'explicit_contract', status: 'defect', text_role: 'incidental', text_role_reason: 'no story or exact wording requirement' };
  const parse = item => parseImageQualityQaResponse(JSON.stringify({ pass: true, observations: { title: 'none', dialogue: 'none', hands: 'clear', props: 'clear' }, issues: [], spatial_checks: [{ panel: 1, bubble_speaker: { status: 'not_applicable', evidence: 'No speech bubble is visible.', bubbles: [] }, object_geometry: { status: 'not_applicable', evidence: 'no overlaps' }, hand_geometry: { status: 'not_applicable', evidence: 'No visible hand.', hands: [] }, prop_orientation: { status: 'not_applicable', evidence: 'no reader', surfaces: [] }, surface_text: { status: 'ok', evidence: 'legible', printed_surfaces: [item], visible_texts: [] } }] }), { mode: 'single-image' });
  const result = parse(surface);
  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'surface_text'); assert.equal(result.issues[0].textRole, 'incidental'); assert.equal(result.issues[0].subject, 'stacked book');
  const unknown = parse({ ...surface, basis: 'unknown' });
  assert.equal(unknown.issues[0].type, 'unverified');
});

test('an actively operated rear face passes when the camera shares the operator side', () => {
  const review = parseImageQualityQaResponse(JSON.stringify({
    pass: true,
    observations: { title: 'not requested', dialogue: 'not requested', hands: 'operator hand reaches the rear latch', props: 'the framed object is opened from its rear support' },
    issues: [],
    spatial_checks: [{
      panel: 1,
      bubble_speaker: { status: 'not_applicable', evidence: 'No speech bubble is visible.', bubbles: [] },
      object_geometry: { status: 'ok', evidence: 'The rear stand is attached to the frame edge without intersecting the operator hand.' },
      hand_geometry: { status: 'ok', evidence: 'The operator hand has five accounted digits.', hands: [{ subject: 'operator hand', location: 'rear stand', pose: 'gripping', visible_digits: 3, occluded_digits: 2, observed_endpoint: 'hand', wrist_palm_connection: 'clear', palm_evidence: 'The wrist joins a visible palm plane before the gripping digits.', status: 'ok', evidence: 'Three visible digits and two plausibly occluded digits connect to the palm.' }] },
      surface_text: { status: 'not_applicable', evidence: 'No printed face is visible while the rear support is opened.', printed_surfaces: [], visible_texts: [] },
      prop_orientation: {
        status: 'ok',
        evidence: 'The operator and camera both view the rear stand while it is being opened.',
        surfaces: [{
          subject: 'framed object', visible_face: 'back', cues: ['rear_mount'], camera_side: 'same_half_space',
          active_face: 'back', active_face_evidence: 'The operator is opening the rear stand.',
          visual_evidence: 'The hinge and fold-out stand are visible on the rear.',
          target_evidence: 'The operator and camera are on the rear side during the adjustment.',
        }],
      },
    }],
  }), { mode: 'single-image' });

  assert.equal(review.pass, true);
  assert.equal(review.issues.length, 0);
});
