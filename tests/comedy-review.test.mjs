import test from 'node:test';
import assert from 'node:assert/strict';
import { buildComedyReviewRequest, applyComedyReview } from '../src/lib/comedy-review.js';
const source = 'Action: 食べた菓子が復活する。誰も驚かない。\nDialogue: また増えた。\nEYE-LINE LOCK: face viewer';
test('preserves surreal script and accepts only exact auxiliary patches', () => {
  const raw = JSON.stringify({ observations: [{ panel: 1, kind: 'keep_gag', reason: '復活はギャグとして保持' }], patches: [{ line: 2, before: 'EYE-LINE LOCK: face viewer', after: 'EYE-LINE LOCK: follow Action', confidence: 'high', reason: '補助指示を調整' }] });
  const r = applyComedyReview(source, raw);
  assert.equal(r.warning, '');
  assert.equal(r.prompt.split('\n').slice(0, 2).join('\n'), source.split('\n').slice(0, 2).join('\n'));
  assert.match(buildComedyReviewRequest({ prompt: source, scenario: source, castList: '' }), /absent reactions|KEEP the original/);
});
test('rejects script edits, stale patches, low confidence and malformed responses without losing original', () => {
  for (const patch of [
    { line: 0, before: source.split('\n')[0], after: 'Action: 普通に食べる。', confidence: 'high' },
    { line: 2, before: 'stale', after: 'EYE-LINE LOCK: target', confidence: 'high' },
    { line: 2, before: source.split('\n')[2], after: 'EYE-LINE LOCK: target', confidence: 'low' }
  ]) {
    const r = applyComedyReview(source, JSON.stringify({ observations: [], patches: [{ ...patch, reason: 'test' }] }));
    assert.equal(r.prompt, source);
    assert.ok(r.warning);
  }
  assert.equal(applyComedyReview(source, 'invalid').prompt, source);
});
test('no changes is a valid successful review', () => {
  assert.equal(applyComedyReview(source, '{"observations":[],"patches":[]}').warning, '');
});
