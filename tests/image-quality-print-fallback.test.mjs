import test from 'node:test';
import assert from 'node:assert/strict';
import { runImageQualityFailsafe, buildIncidentalPrintFallbackPrompt, IMAGE_QUALITY_MAX_ATTEMPTS } from '../src/lib/image-quality-failsafe.js';
import { parseImageQualityQaResponse, buildImageQualityComparisonPrompt } from '../src/lib/image-quality-qa.js';

// Synthetic responses prove branching, bounds and preservation, not image quality.
const candidate = id => ({ id, base64Img: id, mimeType: 'image/png' });
const printIssue = (override = {}) => ({ type: 'surface_text', panel: 1, subject: 'background book spine', reason: 'Glyph tops do not rotate with the spine.', textRole: 'incidental', textRoleReason: 'No wording is requested and the prop carries no story information.', ...override });
const review = issue => ({ pass: false, issues: [issue] });
const approved = 'APPROVED DIALOGUE, TITLE AND STORY CLUE';

const analyzeFailure = async ({ issues, history }) => JSON.stringify({ corrections: issues.map((issue, issueIndex) => ({
  issueIndex, observed: issue.reason, expected: 'text follows surface axes', cause: 'possibly reprojection failure',
  previousFailure: history.length ? 'Earlier axes edit failed' : 'First attempt', nextStrategy: `Surface correction revision ${history.length + 1}`,
  verification: 'Compare glyph axes with surface edges and preserve required dialogue',
})) });

test('recurring incidental print uses the best source within the four-image limit', async () => {
  const calls = [];
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved,
    repairSourceMode: 'source-image', analyzeFailure,
    reviewCandidate: async (image, prompt) => {
      if (image.id === 'fallback') { assert.match(prompt, /API INCIDENTAL PRINT FALLBACK/); return { pass: true, issues: [] }; }
      return review(printIssue());
    },
    generateRepairCandidate: async (prompt, source) => { calls.push({ prompt, source }); return candidate(calls.length === 1 ? 'repair' : 'fallback'); },
    compareCandidates: async () => ({ preferred: 'repair', reason: 'Fewer defects, no regressions' }),
  });
  assert.equal(IMAGE_QUALITY_MAX_ATTEMPTS, 4);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].source.id, 'repair');
  assert.match(calls[1].prompt, /subtle nonlinguistic print texture/);
  assert.match(calls[1].prompt, /all dialogue, speakers, title, watermarks/);
  assert.equal(result.candidate.id, 'fallback');
  assert.equal(result.attempts, 3);
  assert.equal(result.validationWarning, false);
});

test('protected or ungrounded lettering never gets incidental simplification during retries', async () => {
  for (const issue of [printIssue({ textRole: 'story_required' }), printIssue({ textRole: 'unknown' }), printIssue({ textRoleReason: '' }), printIssue({ type: 'bubble_text' })]) {
    let requests = 0;
    const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved, analyzeFailure,
      reviewCandidate: async () => review(issue),
      generateRepairCandidate: async prompt => { requests++; assert.doesNotMatch(prompt, /API INCIDENTAL PRINT FALLBACK/); return candidate('repair'); },
    });
    assert.equal(requests, 3);
    assert.equal(result.attempts, 4);
    assert.equal(result.validationWarning, true);
  }
});

test('QA requires a grounded incidental role; unknown is the default and protected text is ineligible', () => {
  const raw = (role, reason) => JSON.stringify({ pass: false, issues: [{ type: 'surface_text', panel: 1, subject: 'spine', reason: 'wrong glyph rotation', text_role: role, text_role_reason: reason }] });
  const incidental = parseImageQualityQaResponse(raw('incidental', 'Decorative, not used by story'));
  assert.equal(incidental.issues[0].textRole, 'incidental');
  assert.match(buildIncidentalPrintFallbackPrompt({ originalPrompt: approved, issues: incidental.issues }), /"subject":"spine"/);
  for (const role of ['story_required', 'unknown', undefined]) {
    const parsed = parseImageQualityQaResponse(raw(role, 'Cannot obscure'));
    assert.equal(buildIncidentalPrintFallbackPrompt({ issues: parsed.issues }), null);
  }
});

test('single-image fallback and comparison preserve their correct scope', () => {
  const prompt = buildIncidentalPrintFallbackPrompt({ originalPrompt: approved, issues: [printIssue()], mode: 'single-image' });
  assert.match(prompt, /one single illustration; never introduce panels/);
  assert.doesNotMatch(prompt, /exactly four panels/);
  const comparison = buildImageQualityComparisonPrompt({ finalPrompt: prompt, allowIncomplete: true });
  assert.match(comparison, /residual defects may remain/);
  assert.match(comparison, /Required story text, dialogue and title must stay exact/);
});
