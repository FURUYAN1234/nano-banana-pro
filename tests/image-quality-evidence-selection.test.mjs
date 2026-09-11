import test from 'node:test';
import assert from 'node:assert/strict';
import { runImageQualityFailsafe } from '../src/lib/image-quality-failsafe.js';
import { parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';

// Synthetic contracts test state transitions, not actual vision accuracy.
test('an improved repair with unresolved QA is compared and retained without another generation', async () => {
  let generations = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: 'original', originalPrompt: 'script',
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
  const parse = item => parseImageQualityQaResponse(JSON.stringify({ pass: true, observations: { title: 'none', dialogue: 'none', hands: 'clear', props: 'clear' }, issues: [], spatial_checks: [{ panel: 1, object_geometry: { status: 'not_applicable', evidence: 'no overlaps' }, prop_orientation: { status: 'not_applicable', evidence: 'no reader', surfaces: [] }, surface_text: { status: 'ok', evidence: 'legible', printed_surfaces: [item] } }] }), { mode: 'single-image' });
  const result = parse(surface);
  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'surface_text'); assert.equal(result.issues[0].textRole, 'incidental'); assert.equal(result.issues[0].subject, 'stacked book');
  const unknown = parse({ ...surface, basis: 'unknown' });
  assert.equal(unknown.issues[0].type, 'unverified');
});
