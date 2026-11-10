import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { parseScenarioPayoffReview, evaluateScenarioPayoffReview } from '../src/lib/scenario-payoff-quality.js';

const fixture = JSON.parse(readFileSync(new URL('./fixtures/scenario-review-omitted-corrections.json', import.meta.url), 'utf8'));
const fresh = () => structuredClone(fixture.review);
const parse = review => parseScenarioPayoffReview(JSON.stringify(review), fixture.options);

test('synthetic six-panel API review with omitted non-applicable corrections retains its verdict', () => {
  const parsed = parse(fresh());
  assert.ok(parsed.panel_development.every(item => item.correction === ''));
  assert.deepEqual(evaluateScenarioPayoffReview(parsed, fixture.options).reasonCodes, []);
});

test('all explicitly passing evidenced checks may omit an unused correction without hiding an independent failure', () => {
  const review = fresh();
  for (const field of ['payoff_clarity', 'action_continuity', 'action_staging', 'action_payoff']) delete review[field].correction;
  for (const field of ['visual_feasibility', 'ensemble_continuity', 'cast_identity', 'panel_development']) {
    for (const item of review[field]) delete item.correction;
  }
  for (const item of review.cast_identity) delete item.change_basis;
  delete review.camera_rhythm.correction;
  review.action_staging = { material_failure: true, evidence: '身体は直立し手先しか動いていない。', correction: '同じ場面で踏み込みと重心移動を描く。' };
  const parsed = parse(review);
  assert.equal(parsed.action_staging.material_failure, true);
  assert.deepEqual(evaluateScenarioPayoffReview(parsed, fixture.options).reasonCodes, ['flat_action_staging']);
  assert.equal(parsed.camera_rhythm.correction, '');
  assert.ok(parsed.cast_identity.every(item => item.correction === '' && item.change_basis === ''));
});

test('missing corrections on failed checks and missing verdict/evidence remain invalid', () => {
  const cases = [
    r => { r.visual_feasibility[0] = { panel: 1, feasible: false, material_loss: true, evidence: '接点が見えない。' }; },
    r => { r.ensemble_continuity[0] = { panel: 1, material_break: true, evidence: '相手と動作が接続しない。' }; },
    r => { r.panel_development[0] = { panel: 1, material_padding: true, evidence: '同じ内容を再掲している。' }; },
    r => { r.cast_identity[0].status = 'mismatch'; delete r.cast_identity[0].correction; },
    r => { r.cast_identity[0].status = 'intentional_change'; delete r.cast_identity[0].change_basis; },
    r => { r.camera_rhythm.material_repeat = true; r.camera_rhythm.repeated_panels = [1, 2]; delete r.camera_rhythm.correction; },
    r => { delete r.panel_development[0].material_padding; },
    r => { r.panel_development[0].evidence = ''; },
    r => { r.panel_development[0].correction = null; },
    r => { delete r.visual_feasibility[0].feasible; delete r.visual_feasibility[0].correction; },
  ];
  for (const mutate of cases) {
    const review = fresh();
    review.panel_development.forEach(item => { item.correction = ''; });
    mutate(review);
    assert.throws(() => parse(review), /incomplete_payoff_review/);
  }
});
