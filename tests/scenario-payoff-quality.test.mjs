import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  buildScenarioPayoffRepairPrompt,
  buildScenarioPayoffReviewPrompt,
  evaluateScenarioPayoffReview,
  parseScenarioPayoffReview,
  runScenarioPayoffGate,
} from '../src/lib/scenario-payoff-quality.js';

const STRONG_GAG_REVIEW = {
  pass: true,
  setup_seed: '主人公が最短経路だけを信じて急ぐ。',
  panel3_prediction: '近道を選べば間に合うと読者が予想する。',
  panel4_outcome: '近道の出口が出発地点へ戻り、本人が同じ扉から飛び出す。',
  shift_kind: 'reversal',
  visual_payoff: true,
  slogan_only: false,
  unseeded_fact: false,
  reason_codes: [],
};

const WEAK_SLOGAN_REVIEW = {
  pass: true,
  setup_seed: '作業手順を説明する。',
  panel3_prediction: '全員が作業を続ける。',
  panel4_outcome: '大切なのは確認だと宣言する。',
  shift_kind: 'none',
  visual_payoff: false,
  slogan_only: true,
  unseeded_fact: false,
  reason_codes: [],
};

test('review prompt asks for prediction, outcome, visual payoff, and mode-aware documentary safety', () => {
  const prompt = buildScenarioPayoffReviewPrompt({
    scenario: '[1コマ目: 起]\n状況: 作業を始める。\n[4コマ目: 結]\n状況: 結論を述べる。',
    punchlineType: 'Documentary',
  });

  assert.match(prompt, /panel3_prediction/);
  assert.match(prompt, /panel4_outcome/);
  assert.match(prompt, /visual_payoff/);
  assert.match(prompt, /新しい事実|new fact/i);
  assert.match(prompt, /規模・意味・対象・行為者/);
  assert.match(prompt, /反転だけを要求しない/);
  assert.match(prompt, /JSON/);
});

test('strict review parser accepts fenced JSON and rejects incomplete output', () => {
  const parsed = parseScenarioPayoffReview(`\`\`\`json\n${JSON.stringify(STRONG_GAG_REVIEW)}\n\`\`\``);
  assert.equal(parsed.shift_kind, 'reversal');
  assert.throws(
    () => parseScenarioPayoffReview('{"pass":true,"shift_kind":"reversal"}'),
    /incomplete_payoff_review/,
  );
});

test('mechanical gate rejects a model pass that is only a slogan with no visual shift', () => {
  const result = evaluateScenarioPayoffReview(WEAK_SLOGAN_REVIEW, { punchlineType: 'GagAuto' });
  assert.equal(result.ok, false);
  assert.ok(result.reasonCodes.includes('slogan_only'));
  assert.ok(result.reasonCodes.includes('no_visual_payoff'));
  assert.ok(result.reasonCodes.includes('no_payoff_shift'));
});

test('gag accepts a seeded prediction and visible reversal', () => {
  assert.deepEqual(
    evaluateScenarioPayoffReview(STRONG_GAG_REVIEW, { punchlineType: 'GagAuto' }),
    { ok: true, reasonCodes: [] },
  );
});

test('surreal gag accepts visible absurdity without forcing causal setup or a rational explanation', () => {
  const review = {
    pass: false,
    setup_seed: '',
    panel3_prediction: '',
    panel4_outcome: '作業台が突然折り紙の海になり、全員が真顔で泳ぎ始める。',
    shift_kind: 'none',
    visual_payoff: true,
    slogan_only: false,
    unseeded_fact: true,
    reason_codes: ['no_setup_seed', 'no_panel3_prediction', 'no_payoff_shift', 'unseeded_fact'],
  };

  assert.deepEqual(
    evaluateScenarioPayoffReview(review, { punchlineType: 'Surreal' }),
    { ok: true, reasonCodes: [] },
  );

  const prompt = buildScenarioPayoffReviewPrompt({ scenario: 'ABSURD', punchlineType: 'Surreal' });
  assert.match(prompt, /因果関係|辻褄.*要求しない/);
  assert.match(prompt, /大破壊|支離滅裂|不条理/);
});

test('surreal gag still rejects an explanation-only ending with no visible absurd event', () => {
  const result = evaluateScenarioPayoffReview({
    ...WEAK_SLOGAN_REVIEW,
    pass: true,
    reason_codes: [],
  }, { punchlineType: 'Surreal' });
  assert.equal(result.ok, false);
  assert.ok(result.reasonCodes.includes('slogan_only'));
  assert.ok(result.reasonCodes.includes('no_visual_payoff'));
});

test('serious ending accepts a seeded consequence without forcing a comic reversal', () => {
  const result = evaluateScenarioPayoffReview({
    ...STRONG_GAG_REVIEW,
    shift_kind: 'consequence',
    panel4_outcome: '主人公が自分の選択の代償を引き受けて扉を閉じる。',
  }, { punchlineType: 'Resolve' });
  assert.equal(result.ok, true);
});

test('documentary ending rejects an unseeded fact even when the reviewer marks pass', () => {
  const result = evaluateScenarioPayoffReview({
    ...STRONG_GAG_REVIEW,
    shift_kind: 'consequence',
    unseeded_fact: true,
  }, { punchlineType: 'Documentary' });
  assert.equal(result.ok, false);
  assert.ok(result.reasonCodes.includes('unseeded_fact'));
});

test('repair prompt rewrites all four panels while preserving facts and the selected ending mode', () => {
  const prompt = buildScenarioPayoffRepairPrompt({
    scenario: '[1コマ目: 起]\n状況: 説明する。\n[4コマ目: 結]\n状況: 標語を言う。',
    punchlineType: 'Misunderstanding',
    review: WEAK_SLOGAN_REVIEW,
  });
  assert.match(prompt, /1〜4コマ目全体/);
  assert.match(prompt, /Misunderstanding/);
  assert.match(prompt, /事実.*数値.*時系列/);
  assert.match(prompt, /4コマ目だけを差し替え/);
  assert.match(prompt, /そのまま実行するだけにしない/);
});

test('gate passes through a strong first candidate without requesting a repair', async () => {
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL',
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(STRONG_GAG_REVIEW),
    requestRepair: async () => { repairs += 1; return 'REPAIRED'; },
    validateRepair: () => true,
  });
  assert.equal(result.scenario, 'ORIGINAL');
  assert.equal(result.status, 'passed');
  assert.equal(repairs, 0);
});

test('gate performs one full repair and adopts it only after a passing second review', async () => {
  let reviews = 0;
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL',
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews === 1 ? WEAK_SLOGAN_REVIEW : STRONG_GAG_REVIEW),
    requestRepair: async () => { repairs += 1; return 'REPAIRED'; },
    validateRepair: (candidate) => assert.equal(candidate, 'REPAIRED'),
  });
  assert.equal(result.scenario, 'REPAIRED');
  assert.equal(result.status, 'repaired');
  assert.equal(reviews, 2);
  assert.equal(repairs, 1);
});

test('gate retains the original when the repaired candidate fails review', async () => {
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL',
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW),
    requestRepair: async () => { repairs += 1; return 'REPAIRED'; },
    validateRepair: () => true,
  });
  assert.equal(result.scenario, 'ORIGINAL');
  assert.equal(result.status, 'retained');
  assert.match(result.warning, /再監査/);
  assert.equal(repairs, 1);
});

test('gate retains the original when review, repair, or validation fails', async () => {
  for (const options of [
    { requestReview: async () => { throw new Error('review offline'); }, requestRepair: async () => 'REPAIRED', validateRepair: () => true },
    { requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW), requestRepair: async () => { throw new Error('repair offline'); }, validateRepair: () => true },
    { requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW), requestRepair: async () => 'REPAIRED', validateRepair: () => { throw new Error('unsafe repair'); } },
  ]) {
    const result = await runScenarioPayoffGate({ scenario: 'ORIGINAL', punchlineType: 'GagAuto', ...options });
    assert.equal(result.scenario, 'ORIGINAL');
    assert.equal(result.status, 'retained');
    assert.ok(result.warning);
  }
});

test('STEP2 uses the selected scenario model for payoff review and never enables web search', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  assert.match(source, /runScenarioPayoffGate\(\{[\s\S]*?requestReview:[\s\S]*?modelRoute: 'scenario',[\s\S]*?scenarioModelId,[\s\S]*?useWebSearch: false/);
  assert.match(source, /requestRepair:[\s\S]*?modelRoute: 'scenario',[\s\S]*?scenarioModelId,[\s\S]*?useWebSearch: false/);
  assert.match(source, /validateRepair:[\s\S]*?validateScenarioForRetry/);
});
