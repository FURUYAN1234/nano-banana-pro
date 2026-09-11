import test from 'node:test';
import assert from 'node:assert/strict';
import { runImageQualityFailsafe, buildIncidentalPrintFallbackPrompt, IMAGE_QUALITY_MAX_ATTEMPTS } from '../src/lib/image-quality-failsafe.js';
import { parseImageQualityQaResponse, buildImageQualityComparisonPrompt } from '../src/lib/image-quality-qa.js';

// Synthetic responses prove branching, bounds and preservation, not image quality.
const candidate = id => ({ id, base64Img: id, mimeType: 'image/png' });
const printIssue = (override = {}) => ({ type: 'surface_text', panel: 1, subject: 'background book spine', reason: 'Glyph tops do not rotate with the spine.', textRole: 'incidental', textRoleReason: 'No wording is requested and the prop carries no story information.', ...override });
const review = issue => ({ pass: false, issues: [issue] });
const approved = 'APPROVED DIALOGUE, TITLE AND STORY CLUE';

test('third candidate is conditional, uses the best source, and carries the same protection into QA/comparison', async () => {
  const calls = [];
  const comparisons = [];
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved, repairSourceMode: 'source-image',
    reviewCandidate: async (image, prompt) => {
      if (image.id === 'fallback') { assert.match(prompt, /API INCIDENTAL PRINT FALLBACK/); return { pass: true, issues: [] }; }
      return review(printIssue());
    },
    generateRepairCandidate: async (prompt, source) => {
      calls.push({ prompt, source });
      return candidate(calls.length === 1 ? 'repair' : 'fallback');
    },
    compareCandidates: async (first, second, prompt, options) => { comparisons.push({ first, second, prompt, options }); return { preferred: 'repair', reason: 'fewer defects' }; },
  });
  assert.equal(IMAGE_QUALITY_MAX_ATTEMPTS, 3);
  assert.equal(calls.length, 2);
  assert.equal(calls[1].source.id, 'repair');
  assert.ok(calls[1].prompt.startsWith(approved));
  assert.match(calls[1].prompt, /subtle nonlinguistic print texture/);
  assert.match(calls[1].prompt, /all dialogue, speakers, title, watermarks/);
  assert.match(calls[1].prompt, /plot clues, meaningful UI values/);
  assert.equal(comparisons[1].first.id, 'repair');
  assert.match(comparisons[1].prompt, /API INCIDENTAL PRINT FALLBACK/);
  assert.ok(comparisons.every(call => call.options.allowIncomplete));
  assert.equal(result.candidate.id, 'fallback');
  assert.equal(result.attempts, 3);
  assert.equal(result.validationWarning, false);
});

test('even a still imperfect last candidate can be kept when direct comparison shows improvement', async () => {
  let requests = 0;
  const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved,
    reviewCandidate: async () => review(printIssue()),
    generateRepairCandidate: async () => candidate(++requests === 1 ? 'repair' : 'fallback'),
    compareCandidates: async () => ({ preferred: 'repair', reason: 'visibly better; residual defect remains' }),
  });
  assert.equal(requests, 2);
  assert.equal(result.attempts, 3);
  assert.equal(result.candidate.id, 'fallback');
  assert.equal(result.validationWarning, true);
});

test('worse, failed or unverified fallback retains the best earlier image without more requests', async () => {
  for (const failure of ['worse', 'transport', 'comparison', 'qa']) {
    let requests = 0;
    let comparisons = 0;
    const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved,
      reviewCandidate: async image => { if (image.id === 'fallback' && failure === 'qa') throw Error('no QA'); return review(printIssue()); },
      generateRepairCandidate: async () => { requests++; if (requests === 2 && failure === 'transport') throw Error('offline'); return candidate(requests === 1 ? 'repair' : 'fallback'); },
      compareCandidates: async () => { if (++comparisons === 1) return { preferred: 'repair' }; if (failure === 'comparison') throw Error('no comparison'); return { preferred: 'original' }; },
    });
    assert.equal(requests, 2);
    assert.equal(result.candidate.id, 'repair');
    assert.equal(result.validationWarning, true);
    assert.equal(result.attempts, 3);
  }
});

test('protected, unknown, ungrounded, new or different-panel text defects never trigger the final image', async () => {
  for (const issue of [printIssue({ textRole: 'story_required' }), printIssue({ textRole: 'unknown' }), printIssue({ textRoleReason: '' }), printIssue({ panel: 2 }), printIssue({ subject: 'other object' }), printIssue({ type: 'bubble_text' })]) {
    let requests = 0;
    const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved,
      reviewCandidate: async image => review(image.id === 'original' ? printIssue() : issue),
      generateRepairCandidate: async () => { requests++; return candidate('repair'); },
    });
    assert.equal(requests, 1);
    assert.equal(result.attempts, 2);
  }
});

test('OFF, initial PASS and a successful ordinary repair do not invoke the final fallback', async () => {
  for (const state of ['off', 'pass', 'repair_pass']) {
    let requests = 0;
    const result = await runImageQualityFailsafe({ originalCandidate: candidate('original'), originalPrompt: approved, allowRepair: state !== 'off',
      reviewCandidate: async image => state === 'pass' || image.id === 'repair' ? { pass: true, issues: [] } : review(printIssue()),
      generateRepairCandidate: async () => { requests++; return candidate('repair'); },
      compareCandidates: async () => ({ preferred: 'repair', reason: 'fixed' }),
    });
    assert.equal(requests, state === 'repair_pass' ? 1 : 0);
    assert.ok(result.attempts <= 2);
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
