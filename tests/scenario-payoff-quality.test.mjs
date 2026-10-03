import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import * as payoffQuality from '../src/lib/scenario-payoff-quality.js';

import {
  buildScenarioPayoffRepairPrompt,
  buildScenarioPayoffReviewPrompt,
  evaluateScenarioPayoffReview,
  parseScenarioPayoffReview,
  runScenarioPayoffGate,
} from '../src/lib/scenario-payoff-quality.js';
const { applyScenarioStagingPatch } = payoffQuality;

const CAMERA_RHYTHM = {
  shots: ['high / left-front / wide / room layout', 'eye-level / profile / close / doubt', 'rear / medium / telephoto / discovery', 'low / right-front / wide / payoff'].map((signature, index) => ({ panel: index + 1, signature, purpose: ['場所と関係を示す', '疑いの表情を読む', '発見を共有する', '行動の帰結を見せる'][index] })),
  repeated_panels: [], material_repeat: false, intentional_repeat: false,
  evidence: 'Each shot changes the visible projection and serves its story beat.', correction: '',
};

const STRONG_GAG_REVIEW = {
  pass: true,
  setup_seed: '主人公が最短経路だけを信じて急ぐ。',
  panel3_prediction: '近道を選べば間に合うと読者が予想する。',
  panel4_outcome: '近道の出口が出発地点へ戻り、本人が同じ扉から飛び出す。',
  shift_kind: 'reversal',
  visual_payoff: true,
  slogan_only: false,
  unseeded_fact: false,
  camera_rhythm: CAMERA_RHYTHM,
  visual_feasibility: [1, 2, 3, 4].map(panel => ({ panel, feasible: true, evidence: `Panel ${panel} stages its focal action at readable scale.`, correction: '' })),
  ensemble_continuity: [1, 2, 3, 4].map(panel => ({ panel, material_break: false, evidence: `Panel ${panel} continues its actors and reactions.`, correction: '' })),
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
  camera_rhythm: CAMERA_RHYTHM,
  visual_feasibility: [1, 2, 3, 4].map(panel => ({ panel, feasible: true, evidence: `Panel ${panel} stages its focal action at readable scale.`, correction: '' })),
  ensemble_continuity: [1, 2, 3, 4].map(panel => ({ panel, material_break: false, evidence: `Panel ${panel} continues its actors and reactions.`, correction: '' })),
  reason_codes: [],
};

const BALLOON_SCENARIO = '## タイトル: 試験\n' + [1, 2, 3, 4].map(panel =>
  `[${panel}コマ目: 起]\n[Camera: 俯瞰]\nBalloonLayout: [{"speaker":"A","x":0.7,"anchor":"画面左のAの口元","route":"右上から左へ"}]\n状況: Aが札を確認する。\nA「確認するよ。」`).join('\n');
const BALLOON_REVIEW = { ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['BALLOON_LAYOUT_X_ANCHOR_CONTRADICTION'],
  visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 1
    ? { ...item, feasible: false, material_loss: true, correction: 'Move the sole balloon near its speaker without changing the action.' } : item) };

test('balloon-only repair requests and applies bounded field patches before re-audit', async () => {
  let reviews = 0;
  const layout = [{ speaker: 'A', x: 0.3, anchor: '画面左のAの口元', route: '左上の余白から最短でAへ' }];
  const result = await runScenarioPayoffGate({ scenario: BALLOON_SCENARIO,
    requestReview: async () => JSON.stringify(reviews++ ? STRONG_GAG_REVIEW : BALLOON_REVIEW),
    requestRepair: async prompt => {
      assert.match(prompt, /STAGING PATCH JSON/);
      assert.match(prompt, /BalloonLayout/);
      return JSON.stringify([{ panel: 1, field: 'BalloonLayout', value: layout }]);
    },
  });
  assert.equal(reviews, 2);
  assert.equal(result.status, 'repaired');
  assert.equal(result.scenario, BALLOON_SCENARIO.replace(/BalloonLayout: .*/, `BalloonLayout: ${JSON.stringify(layout)}`));
});

test('staging patch rejects dialogue, unknown fields, duplicate edits and malformed layout before re-audit', async () => {
  for (const edits of [
    [{ panel: 1, field: 'dialogue', value: '別の台詞' }],
    [{ panel: 1, field: 'Camera', value: '俯瞰\nA「別の台詞」' }],
    [{ panel: 5, field: '状況', value: '別の事件' }],
    [{ panel: 1, field: '状況', value: '変更' }, { panel: 1, field: '状況', value: '変更2' }],
    [{ panel: 1, field: 'BalloonLayout', value: [{ speaker: 'B', x: 0.3, anchor: '左', route: '左' }] }],
    [{ panel: 1, field: 'BalloonLayout', value: [{ speaker: 'A', x: 1.3, anchor: '左', route: '左' }] }],
  ]) {
    let reviews = 0;
    const result = await runScenarioPayoffGate({ scenario: BALLOON_SCENARIO,
      requestReview: async () => { reviews++; return JSON.stringify(BALLOON_REVIEW); },
      requestRepair: async () => JSON.stringify(edits),
    });
    assert.equal(reviews, 1);
    assert.equal(result.scenario, BALLOON_SCENARIO);
    assert.match(result.warning, /staging_patch/);
  }
});

test('staging patch preserves every unselected line and supports camera and situation edits', () => {
  const edits = [{ panel: 1, field: 'Camera', value: '肩越し' }, { panel: 1, field: '状況', value: 'Aが同じ札へ視線を向ける。' }];
  assert.equal(applyScenarioStagingPatch(BALLOON_SCENARIO, JSON.stringify(edits)),
    BALLOON_SCENARIO.replace('[Camera: 俯瞰]', '[Camera: 肩越し]').replace('状況: Aが札を確認する。', '状況: Aが同じ札へ視線を向ける。'));
});

test('balloon patches enforce order and ownership but do not invent a speaker-side quota', () => {
  const original = BALLOON_SCENARIO.replace('A「確認するよ。」', 'A「確認するよ。」\nB「分かった。」')
    .replace(/BalloonLayout: .*/, 'BalloonLayout: [{"speaker":"A","x":0.7,"anchor":"画面左のA","route":"上の余白"},{"speaker":"B","x":0.3,"anchor":"画面右のB","route":"下の余白"}]');
  const plan = [{ speaker: 'A', x: 0.6, anchor: '画面左のA', route: '上の独立した余白からAへ' },
    { speaker: 'B', x: 0.4, anchor: '画面右のB', route: '下の別の余白からBへ' }];
  assert.match(applyScenarioStagingPatch(original, JSON.stringify([{ panel: 1, field: 'BalloonLayout', value: plan }])), /独立した余白/);
  for (const broken of [plan.toReversed(), [plan[0]], [plan[0], { ...plan[1], x: plan[0].x }]]) {
    assert.throws(() => applyScenarioStagingPatch(original, JSON.stringify([{ panel: 1, field: 'BalloonLayout', value: broken }])), /invalid_staging_patch/);
  }
});

test('unchanged repair stops without paying for re-audit or repeated no-op repairs', async () => {
  let reviews = 0;
  let repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: BALLOON_SCENARIO,
    requestReview: async () => { reviews++; return JSON.stringify(WEAK_SLOGAN_REVIEW); },
    requestRepair: async () => { repairs++; return BALLOON_SCENARIO; },
  });
  assert.equal(reviews, 1);
  assert.equal(repairs, 1);
  assert.equal(result.scenario, BALLOON_SCENARIO);
  assert.match(result.warning, /unchanged_repair/);
});

test('mosaic selection reaches scenario review, repair and re-review without exempting real defects', async () => {
  for (const enabled of [true, false]) {
    const prompts = [];
    let reviews = 0;
    const result = await runScenarioPayoffGate({
      scenario: 'ORIGINAL', userTopic: '展示物と記念撮影する',
      mosaicCopyrightedCharacters: enabled,
      requestReview: async prompt => {
        prompts.push(prompt);
        return JSON.stringify(reviews++ ? STRONG_GAG_REVIEW : WEAK_SLOGAN_REVIEW);
      },
      requestRepair: async prompt => { prompts.push(prompt); return 'REPAIRED'; },
    });
    assert.equal(result.status, 'repaired', 'real narrative defects still require repair');
    assert.equal(prompts.length, 3);
    for (const prompt of prompts) {
      assert.equal(prompt.includes('版権キャラクターにおおきなモザイクをかける'), enabled);
      assert.equal(prompt.includes('意図したモザイクそのもの'), enabled);
      assert.ok(prompt.includes('展示物と記念撮影する'));
    }
  }
});

test('page camera review catches renamed low-angle repetition, repairs once and preserves dialogue', async () => {
  const repeated = { ...STRONG_GAG_REVIEW, camera_rhythm: {
    ...CAMERA_RHYTHM, repeated_panels: [2, 3, 4], material_repeat: true,
    evidence: 'P2 Hyper Perspective, P3 OTS and P4 Slant all look up at medium distance; escalation and discovery read as the same view.',
    correction: 'Keep the climax low; stage discovery from a high rear view and doubt in a profile close-up, preserving dialogue and contacts.',
  } };
  assert.deepEqual(evaluateScenarioPayoffReview(repeated).reasonCodes, ['repetitive_camera_sequence']);
  const prompt = buildScenarioPayoffRepairPrompt({ scenario: 'ORIGINAL', review: repeated });
  assert.match(prompt, /演技・配置・カメラだけ/);
  assert.doesNotMatch(prompt, /全体を書き直/);
  let repairs = 0;
  const progress = [];
  const result = await runScenarioPayoffGate({ scenario: 'ORIGINAL',
    requestReview: async () => JSON.stringify(repeated),
    requestRepair: async () => { repairs += 1; return 'REVISED'; },
    onProgress: message => progress.push(message),
  });
  assert.equal(repairs, 1, 'camera rhythm must not start three paid scenario retries');
  assert.equal(result.status, 'retained');
  assert.ok(progress.some(message => /2・3・4コマ.*カメラ.*同じ視点|2・3・4コマ.*カメラ.*same view/.test(message)));
});

test('camera review preserves intentional repeats and harmless shared axes without paid repairs', async () => {
  for (const camera_rhythm of [
    { ...CAMERA_RHYTHM, repeated_panels: [1, 3], material_repeat: true, intentional_repeat: true, evidence: 'User requests identical framing for a visual refrain.', correction: '' },
    { ...CAMERA_RHYTHM, repeated_panels: [2, 4], evidence: 'Shared elevation but a detail insert and distant full shot serve different actions.' },
    { ...CAMERA_RHYTHM, repeated_panels: [1, 2, 3, 4], material_repeat: true, intentional_repeat: true, evidence: 'A deliberate page of close reactions preserves intimacy; no establishing view is needed.', correction: '' },
  ]) {
    const review = { ...STRONG_GAG_REVIEW, camera_rhythm };
    assert.equal(evaluateScenarioPayoffReview(review).ok, true);
    const result = await runScenarioPayoffGate({ scenario: 'ORIGINAL', requestReview: async () => JSON.stringify(review),
      requestRepair: async () => assert.fail('no paid repair for harmless or requested framing'),
    });
    assert.equal(result.status, 'passed');
  }
});

test('shot-scale review connects a material missing establishing view to the existing bounded gate', () => {
  const prompt = buildScenarioPayoffReviewPrompt({ scenario: 'ALL CLOSE', punchlineType: 'Auto' });
  assert.match(prompt, /寄り・中景・引き/);
  assert.match(prompt, /広角レンズ.*引き/);
  const review = { ...STRONG_GAG_REVIEW, camera_rhythm: { ...CAMERA_RHYTHM,
    repeated_panels: [1, 2, 3, 4], material_repeat: true,
    evidence: 'All four crops show faces only; the separation across the room that motivates the failed handoff is invisible.',
    correction: 'Pull back the handoff beat to reveal both actors and the room between them, preserving dialogue and acting.',
  } };
  assert.deepEqual(evaluateScenarioPayoffReview(review).reasonCodes, ['repetitive_camera_sequence']);
});

test('camera evidence covers all four panels and unsupported rejection cannot trigger repair', async () => {
  const missing = { ...STRONG_GAG_REVIEW };
  delete missing.camera_rhythm;
  assert.throws(() => parseScenarioPayoffReview(JSON.stringify(missing)), /incomplete_payoff_review/);
  for (const changes of [
    { shots: CAMERA_RHYTHM.shots.slice(0, 3) },
    { repeated_panels: [2, 2], material_repeat: true, correction: 'Change framing.' },
    { repeated_panels: [2, 4], material_repeat: true, correction: '' },
    { evidence: '' },
  ]) assert.throws(() => parseScenarioPayoffReview(JSON.stringify({ ...STRONG_GAG_REVIEW, camera_rhythm: { ...CAMERA_RHYTHM, ...changes } })), /incomplete_payoff_review/);
  const result = await runScenarioPayoffGate({ scenario: 'ORIGINAL',
    requestReview: async () => JSON.stringify({ ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['repetitive_camera_sequence'] }),
    requestRepair: async () => assert.fail('unsupported camera complaint'),
  });
  assert.equal(result.status, 'retained');
});

test('camera-only repair can change views but rejects a changed line before further review', async () => {
  const original = [1, 2, 3, 4].map(panel => `[${panel}コマ目: 起]\n[Camera: アオリの中景]\n状況: Aは資料を見る。\nA「確認するよ。」`).join('\n');
  const repeated = { ...STRONG_GAG_REVIEW, camera_rhythm: { ...CAMERA_RHYTHM,
    material_repeat: true, repeated_panels: [1, 2, 3, 4], evidence: 'Same low medium shot masks the change from discovery to doubt.', correction: 'Keep dialogue and vary the views according to each beat.',
  } };
  for (const changeDialogue of [false, true]) {
    let reviews = 0;
    const candidate = changeDialogue ? original.replace('確認するよ。', '話を変えるよ。') : original.replace('[Camera: アオリの中景]', '[Camera: 俯瞰の全景]');
    const result = await runScenarioPayoffGate({ scenario: original,
      requestReview: async () => JSON.stringify(++reviews === 1 ? repeated : STRONG_GAG_REVIEW),
      requestRepair: async () => candidate,
    });
    assert.equal(result.status, changeDialogue ? 'retained' : 'repaired');
    assert.equal(result.scenario, changeDialogue ? original : candidate);
    assert.equal(reviews, changeDialogue ? 1 : 2);
  }
});

test('STEP2 review treats a material same-depth lineup with copied reactions as a single repair target', async () => {
  const flat = {
    ...STRONG_GAG_REVIEW,
    ensemble_continuity: STRONG_GAG_REVIEW.ensemble_continuity.map(item => item.panel === 2
      ? { panel: 2, material_break: true, evidence: 'Five cast members face front in one row and repeat the same surprise; no response changes another action.', correction: 'Keep the event and dialogue; stage the discoverer near the prop, receiver behind and a third actor reacting to that receiver.' }
      : item),
  };
  const evaluation = evaluateScenarioPayoffReview(flat);
  assert.ok(evaluation.reasonCodes.includes('flat_ensemble_panel_2'));
  assert.match(buildScenarioPayoffReviewPrompt({ scenario: 'SCENARIO' }), /ensemble_continuity/);
  assert.match(buildScenarioPayoffRepairPrompt({ scenario: 'SCENARIO', review: flat }), /前後関係|連続した動作/u);

  const progress = [];
  const reviews = [flat, STRONG_GAG_REVIEW];
  const result = await runScenarioPayoffGate({
    scenario: '元の4コマ', punchlineType: 'GagAuto',
    requestReview: async () => ({ text: JSON.stringify(reviews.shift()) }),
    requestRepair: async () => ({ text: '立体的な人物演技を持つ4コマ' }),
    onProgress: message => progress.push(message),
  });
  assert.equal(result.status, 'repaired');
  assert.ok(progress.some(message => /再検査理由.*2コマ目.*横並び|再検査理由.*2コマ目.*演技/u.test(message)));
});

test('STEP2 accepts intentional shared gaze or stillness without forcing different positions or a retry', async () => {
  const quiet = {
    ...STRONG_GAG_REVIEW,
    ensemble_continuity: STRONG_GAG_REVIEW.ensemble_continuity.map(item => item.panel === 3
      ? { panel: 3, material_break: false, evidence: 'The scripted silent beat keeps two actors watching the same document; their established positions continue.', correction: '' }
      : item),
  };
  assert.deepEqual(evaluateScenarioPayoffReview(quiet, { punchlineType: 'GagAuto' }), { ok: true, reasonCodes: [] });
  const result = await runScenarioPayoffGate({
    scenario: '静かな4コマ', punchlineType: 'GagAuto',
    requestReview: async () => ({ text: JSON.stringify(quiet) }),
    requestRepair: async () => assert.fail('intentional stillness is not a repair trigger'),
  });
  assert.equal(result.status, 'passed');
});

test('ensemble review checks copied acting even after positions are varied, without imposing mouth quotas', () => {
  const prompt = buildScenarioPayoffReviewPrompt({ scenario: 'SCENARIO' });
  assert.match(prompt, /配置が分散していても/);
  assert.match(prompt, /口の開閉だけ|開口人数/);
  assert.match(prompt, /軽微|好み/);
});

test('unsupported ensemble reason codes cannot trigger a paid repair', async () => {
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: '静かな4コマ', punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify({ ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['flat_ensemble_panel_2', 'flat_ensemble_panel_99'] }),
    requestRepair: async () => { repairs += 1; return 'unexpected'; },
  });
  assert.equal(result.status, 'retained');
  assert.equal(repairs, 0);
});

test('staging repair rejects changed dialogue before paying for another review', async () => {
  const original = [1, 2, 3, 4].map(panel => `[${panel}コマ目: 起]\n状況: Aは資料を見る。\nA「確認するよ。」`).join('\n');
  const review = { ...STRONG_GAG_REVIEW, ensemble_continuity: STRONG_GAG_REVIEW.ensemble_continuity.map(item => item.panel === 2
    ? { ...item, material_break: true, correction: 'Clarify the response.' } : item) };
  let reviews = 0;
  const result = await runScenarioPayoffGate({ scenario: original, punchlineType: 'GagAuto',
    requestReview: async () => { reviews += 1; return JSON.stringify(review); },
    requestRepair: async () => original.replace('確認するよ。', '別のオチに変更。'),
  });
  assert.equal(result.scenario, original);
  assert.equal(reviews, 1);
  assert.match(result.warning, /staging_only_scope_violation/);
});

test('staging-only repair preserves the story and does not demand a new payoff', () => {
  const review = { ...STRONG_GAG_REVIEW, ensemble_continuity: STRONG_GAG_REVIEW.ensemble_continuity.map(item => item.panel === 2
    ? { ...item, material_break: true, correction: 'Clarify the response with depth and gaze.' } : item) };
  const prompt = buildScenarioPayoffRepairPrompt({ scenario: 'ORIGINAL', review });
  assert.match(prompt, /演技・配置・カメラだけ/);
  assert.match(prompt, /台詞の話者・文言・順序/);
  assert.doesNotMatch(prompt, /全体を書き直|別の種を再利用/);
});

test('STEP2 progress identifies a material recheck reason and its resolved outcome', async () => {
  const progress = [];
  const reviews = [WEAK_SLOGAN_REVIEW, STRONG_GAG_REVIEW];
  const result = await runScenarioPayoffGate({ scenario: '元の4コマ', punchlineType: 'GagAuto',
    requestReview: async () => ({ text: JSON.stringify(reviews.shift()) }),
    requestRepair: async () => ({ text: '改善した4コマ' }),
    onProgress: message => progress.push(message),
  });
  assert.equal(result.status, 'repaired');
  assert.ok(progress.some(message => /再検査理由.*標語.*絵で伝わるオチ/.test(message) || /再検査理由.*絵で伝わるオチ.*標語/.test(message)));
  assert.ok(progress.some(message => /再検査結果.*合格/.test(message)));
});

test('both initial and repaired scenario reviews receive user constraints', async () => {
  const prompts = [];
  const reviews = [WEAK_SLOGAN_REVIEW, STRONG_GAG_REVIEW];
  await runScenarioPayoffGate({ scenario: 'ORIGINAL', punchlineType: 'GagAuto', userTopic: '指定の結末を保存する',
    requestReview: async prompt => { prompts.push(prompt); return JSON.stringify(reviews.shift()); },
    requestRepair: async () => 'REPAIRED',
  });
  assert.equal(prompts.length, 2);
  for (const prompt of prompts) {
    assert.match(prompt, /USER REQUIREMENTS/);
    assert.match(prompt, /指定の結末を保存する/);
    assert.match(prompt, /指定された終幕の語句/);
  }
});

test('STEP2 harmless review feedback reports why no regeneration runs', async () => {
  const progress = [];
  const result = await runScenarioPayoffGate({ scenario: '元の4コマ', punchlineType: 'GagAuto',
    requestReview: async () => ({ text: JSON.stringify({ ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['no_setup_seed'], setup_seed: '' }) }),
    requestRepair: async () => assert.fail('minor issue is not a repair trigger'),
    onProgress: message => progress.push(message),
  });
  assert.equal(result.status, 'retained');
  assert.ok(progress.some(message => /オチの種.*重大欠陥ではないため再生成せず/.test(message)));
});

test('review prompt asks for prediction, outcome, visual payoff, and mode-aware documentary safety', () => {
  const prompt = buildScenarioPayoffReviewPrompt({
    scenario: '[1コマ目: 起]\n状況: 作業を始める。\n[4コマ目: 結]\n状況: 結論を述べる。',
    punchlineType: 'Documentary',
  });

  assert.match(prompt, /panel3_prediction/);
  assert.match(prompt, /高さは内容に応じて配分できる/);
  assert.doesNotMatch(prompt, /縦A4を4分割した横長の帯/);
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

test('scenario review rejects a visually overloaded panel even when the ending is strong', () => {
  const overloaded = {
    ...STRONG_GAG_REVIEW,
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 4
      ? { panel: 4, feasible: false, material_loss: true, evidence: 'Five distant actors and two distinct card contacts are too small to read in one wide strip.', correction: 'Keep the wide gag, but move one card contact to panel 3.' }
      : item),
  };
  assert.ok(evaluateScenarioPayoffReview(overloaded).reasonCodes.includes('unrenderable_panel_4'));
  assert.throws(() => parseScenarioPayoffReview(JSON.stringify({ ...STRONG_GAG_REVIEW, visual_feasibility: [] })), /incomplete_payoff_review/);
  assert.match(buildScenarioPayoffReviewPrompt({ scenario: 'SCENARIO' }), /visual_feasibility/);
  assert.match(buildScenarioPayoffRepairPrompt({ scenario: 'SCENARIO', review: overloaded }), /手元|接触/);
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
    userTopic: '4コマ目は天井近くからの俯瞰を保つ。',
  });
  assert.match(prompt, /1〜4コマ目全体/);
  assert.match(prompt, /Misunderstanding/);
  assert.match(prompt, /事実.*数値.*時系列/);
  assert.match(prompt, /4コマ目だけを差し替え/);
  assert.match(prompt, /そのまま実行するだけにしない/);
  assert.match(prompt, /4コマ目は天井近くからの俯瞰を保つ。/);
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

test('redundant surface detail cannot trigger a camera-flattening repair even with a model reason code', async () => {
  const review = { ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['unrenderable_panel_4'],
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 4
      ? { ...item, feasible: false, material_loss: false, evidence: 'The label was read in panel 3; panel 4 still shows the same object and reaction.', correction: 'Zoom to the face and label.' } : item) };
  let repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: 'BOLD WIDE LOW SHOT', punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(review), requestRepair: async () => { repairs++; return 'CLOSE PORTRAITS'; } });
  assert.equal(repairs, 0);
  assert.equal(result.scenario, 'BOLD WIDE LOW SHOT');
  assert.equal(result.status, 'retained');
  assert.ok(result.warning);
  assert.doesNotMatch(buildScenarioPayoffRepairPrompt({ scenario: 'ORIGINAL', review }), /Zoom to the face and label/);
  const missing = structuredClone(review);
  delete missing.visual_feasibility[3].material_loss;
  assert.throws(() => parseScenarioPayoffReview(JSON.stringify(missing)), /incomplete_payoff_review/);
});

test('a subjective minor payoff concern does not regenerate an otherwise drawable scenario', async () => {
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL', punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify({ ...STRONG_GAG_REVIEW, pass: false, shift_kind: 'none', reason_codes: ['no_payoff_shift'] }),
    requestRepair: async () => { repairs++; return 'REPAIRED'; },
  });
  assert.equal(repairs, 0);
  assert.equal(result.scenario, 'ORIGINAL');
  assert.equal(result.status, 'retained');
  assert.ok(result.warning);
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

test('gate repairs a spatially unreadable panel even when payoff passes', async () => {
  const overloaded = {
    ...STRONG_GAG_REVIEW,
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 4
      ? { panel: 4, feasible: false, material_loss: true, evidence: 'Two separate hand-card contacts are unreadable from the high wide camera.', correction: 'Keep the broad gag and stage only the focal card contact in panel 4.' }
      : item),
  };
  let reviews = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL',
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews === 1 ? overloaded : STRONG_GAG_REVIEW),
    requestRepair: async () => 'REPAIRED',
    validateRepair: () => true,
  });
  assert.equal(result.status, 'repaired');
  assert.equal(result.scenario, 'REPAIRED');
  assert.equal(reviews, 2);
});

test('gate gives subjective spatial staging one repair and keeps the best candidate for image generation', async () => {
  const overloaded = {
    ...STRONG_GAG_REVIEW,
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel >= 3
      ? { panel: item.panel, feasible: false, material_loss: true, evidence: 'The board contacts cannot be read in this wide strip.', correction: 'Move the staging and keep a focal contact.' }
      : item),
  };
  let reviews = 0;
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL',
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews === 1 ? overloaded : {
      ...overloaded,
      visual_feasibility: overloaded.visual_feasibility.map(item => item.panel === 3
        ? { ...item, feasible: true, evidence: 'The board contact is now legible.', correction: '' }
        : item),
    }),
    requestRepair: async () => `REPAIR ${++repairs}`,
    validateRepair: () => true,
  });
  assert.equal(result.status, 'best_effort');
  assert.equal(result.scenario, 'REPAIR 1');
  assert.equal(result.renderabilityWarning, true);
  assert.equal(repairs, 1);
  assert.equal(reviews, 2);
  assert.ok(result.warning);
});

test('gate accepts a later staging repair after an earlier candidate fails review', async () => {
  let reviews = 0;
  const result = await runScenarioPayoffGate({
    scenario: 'ORIGINAL', punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews < 3 ? WEAK_SLOGAN_REVIEW : STRONG_GAG_REVIEW),
    requestRepair: async () => `REPAIR ${reviews}`,
    validateRepair: () => true,
  });
  assert.equal(result.status, 'repaired');
  assert.equal(result.scenario, 'REPAIR 2');
  assert.equal(reviews, 3);
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
  assert.equal(repairs, 2, 'the second identical repair is not audited again');
  assert.match(result.warning, /修正試行2回・再監査1回.*unchanged_repair/);
});

test('gate retains the original when review, repair, or validation fails', async () => {
  for (const options of [
    { requestReview: async () => { throw new Error('review offline'); }, requestRepair: async () => 'REPAIRED', validateRepair: () => true },
    { requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW), requestRepair: async () => { throw new Error('repair offline'); }, validateRepair: () => true },
    { requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW), requestRepair: async () => 'REPAIRED', validateRepair: () => { throw new Error('unsafe repair'); } },
    { requestReview: async () => JSON.stringify(WEAK_SLOGAN_REVIEW), requestRepair: async () => 'REPAIRED', validateRepair: () => false },
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
  assert.match(source, /runScenarioPayoffGate\(\{[\s\S]*?userTopic: inputMode === 'manual' \? manualTopic : ''/);
});

test('an unrepaired visual feasibility warning preserves full-auto image repair', async () => {
  const [provider, workflow] = await Promise.all([
    readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
  ]);
  assert.match(provider, /payoffGate\.renderabilityWarning\s*\?\s*'VISUAL_FEASIBILITY'/);
  assert.doesNotMatch(workflow, /visualFeasibilityBlocked\s*\?\s*null\s*:\s*finalScenarioText/);
  assert.match(workflow, /return finalScenarioText;/);
  assert.match(workflow, /const step4ok = await regenerateImage\(true, generatedPrompt\)/);
});
