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

const identityFor = count => Array.from({ length: count }, (_, i) => ({
  panel: i + 1, status: 'consistent', reference_evidence: 'Aは黒い短髪で眼鏡なし。Bは長髪で眼鏡あり。',
  scenario_evidence: 'Aの動作と台詞の名前は一致し、Bの特徴をAへ付けていない。', change_basis: '', correction: '',
}));

const STRONG_GAG_REVIEW = {
  pass: true,
  payoff_clarity: { material_failure: false, evidence: '入口の札と同じ扉が、近道で出発点へ戻る結果を示す。', correction: '' },
  setup_seed: '主人公が最短経路だけを信じて急ぐ。',
  panel3_prediction: '近道を選べば間に合うと読者が予想する。',
  panel4_outcome: '近道の出口が出発地点へ戻り、本人が同じ扉から飛び出す。',
  shift_kind: 'reversal',
  visual_payoff: true,
  slogan_only: false,
  unseeded_fact: false,
  camera_rhythm: CAMERA_RHYTHM,
  cast_identity: identityFor(4),
  visual_feasibility: [1, 2, 3, 4].map(panel => ({ panel, feasible: true, evidence: `Panel ${panel} stages its focal action at readable scale.`, correction: '' })),
  ensemble_continuity: [1, 2, 3, 4].map(panel => ({ panel, material_break: false, evidence: `Panel ${panel} continues its actors and reactions.`, correction: '' })),
  reason_codes: [],
};

const WEAK_SLOGAN_REVIEW = {
  pass: true,
  payoff_clarity: { material_failure: false, evidence: '結末の宣言自体は読めるが、視覚的なオチがない。', correction: '' },
  setup_seed: '作業手順を説明する。',
  panel3_prediction: '全員が作業を続ける。',
  panel4_outcome: '大切なのは確認だと宣言する。',
  shift_kind: 'none',
  visual_payoff: false,
  slogan_only: true,
  unseeded_fact: false,
  camera_rhythm: CAMERA_RHYTHM,
  cast_identity: identityFor(4),
  visual_feasibility: [1, 2, 3, 4].map(panel => ({ panel, feasible: true, evidence: `Panel ${panel} stages its focal action at readable scale.`, correction: '' })),
  ensemble_continuity: [1, 2, 3, 4].map(panel => ({ panel, material_break: false, evidence: `Panel ${panel} continues its actors and reactions.`, correction: '' })),
  reason_codes: [],
};

const nativeScenario = count => '## タイトル: 支え合う仕事\n' + Array.from({ length: count }, (_, i) =>
  `[${i + 1}コマ目: ${i === count - 1 ? '結' : '展開'}]\n[Camera: 高い位置から強い俯瞰]\n[EMOTION: NORMAL]\nBalloonLayout: [{"speaker":"A","x":0.7,"anchor":"画面右のAの口元","route":"右上の余白からAへ"}]\n状況: Aが作業の段階${i + 1}を進める。\nA「段階${i + 1}だよ。」`).join('\n');
const nativeReview = count => ({ ...structuredClone(STRONG_GAG_REVIEW),
   cast_identity: identityFor(count),
  visual_feasibility: Array.from({ length: count }, (_, i) => ({ ...STRONG_GAG_REVIEW.visual_feasibility[0], panel: i + 1 })),
  ensemble_continuity: Array.from({ length: count }, (_, i) => ({ ...STRONG_GAG_REVIEW.ensemble_continuity[0], panel: i + 1 })),
  camera_rhythm: { ...CAMERA_RHYTHM, shots: Array.from({ length: count }, (_, i) => ({ panel: i + 1, signature: `high / action ${i + 1}`, purpose: '直前の作業を進める' })) },
  panel_development: Array.from({ length: count }, (_, i) => ({ panel: i + 1, material_padding: false, evidence: '作業の変化または反応までの必要な間を示している。', correction: '' })),
});

for (const count of [5, 8]) {
  test(`native ${count}-panel payoff checks the actual ending and every camera while retaining purposeful silence`, async () => {
    const scenario = nativeScenario(count), review = nativeReview(count);
    const options = { scenarioMode: 'experimental-manga', panelCount: count };
    assert.deepEqual(parseScenarioPayoffReview(JSON.stringify(review), options), review);
    const prompt = buildScenarioPayoffReviewPrompt({ scenario, ...options });
    assert.match(prompt, new RegExp(`FINAL PANEL: ${count}`));
    assert.doesNotMatch(prompt, /全幅1列|上から4コマ配置|横長4コマ/);
    assert.match(prompt, /panel_development/);
    assert.match(prompt, /意味のある沈黙/);
    const repair = buildScenarioPayoffRepairPrompt({ scenario, review, ...options });
    assert.match(repair, new RegExp(`\\[${count}コマ目: 結\\]`));
    let requests = 0;
    const result = await runScenarioPayoffGate({ scenario, ...options,
      requestReview: async () => { requests++; return JSON.stringify(review); },
      requestRepair: async () => assert.fail('a purposeful beat must not be repaired'),
    });
    assert.equal(result.status, 'passed');assert.equal(requests, 1);
    const patched = applyScenarioStagingPatch(scenario, JSON.stringify([{ panel: count, field: 'Camera', value: '床近くから強いアオリ' }]), 'A', options);
    assert.match(patched, /床近くから強いアオリ/);
    assert.throws(() => applyScenarioStagingPatch(scenario, JSON.stringify([{ panel: count + 1, field: 'Camera', value: '俯瞰' }]), 'A', options), /invalid_staging_patch/);
    const missing = structuredClone(review);missing.camera_rhythm.shots.pop();
    assert.throws(() => parseScenarioPayoffReview(JSON.stringify(missing), options), /incomplete_payoff_review/);
    assert.throws(() => parseScenarioPayoffReview(JSON.stringify(review)), /incomplete_payoff_review/);
  });
}

test('native wrong counts and missing scenario cameras are retained as invalid before any audit request', async () => {
  for (const scenario of [nativeScenario(4), nativeScenario(9), nativeScenario(5).replace('[Camera: 高い位置から強い俯瞰]', '')]) {
    let calls = 0;
    const result = await runScenarioPayoffGate({ scenario, scenarioMode: 'experimental-manga',
      requestReview: async () => { calls++; return JSON.stringify(nativeReview(5)); },
    });
    assert.equal(calls, 0);assert.equal(result.status, 'retained');
  }
});

test('native redundancy audit distinguishes material padding from a meaningful silent pause', () => {
  const review = nativeReview(5), options = { scenarioMode: 'experimental-manga', panelCount: 5 };
  assert.equal(evaluateScenarioPayoffReview(review, options).ok, true);
  review.panel_development[1] = { panel: 2, material_padding: true, evidence: '直前と同じ静止画で情報も反応の間も変化せず、削除しても意味が変わらない。', correction: '同じ作業で次の手順が分かる動作へ整理する。' };
  assert.ok(evaluateScenarioPayoffReview(review, options).reasonCodes.includes('redundant_panel_2'));
});

test('native final-panel staging repair keeps all panels and forwards the scenario mode to validation', async () => {
  const scenario = nativeScenario(8), review = nativeReview(8);
  review.pass = false;review.reason_codes = ['BALLOON_LAYOUT_X_ANCHOR_CONTRADICTION'];
  Object.assign(review.visual_feasibility[7], { feasible: false, material_loss: true, correction: '最後の話者の余白に吹き出しを移す。' });
  let requests = 0, validations = 0;
  const result = await runScenarioPayoffGate({ scenario, scenarioMode: 'experimental-manga',
    requestReview: async () => JSON.stringify(requests++ ? nativeReview(8) : review),
    requestRepair: async prompt => {
      assert.match(prompt, /panelは1〜8/);
      return JSON.stringify([{ panel: 8, field: 'BalloonLayout', value: [{ speaker: 'A', x: 0.75, anchor: '画面右のAの口元', route: '右上の余白からAへ' }] }]);
    },
    validateRepair: (candidate, options) => { validations++;assert.equal(options.scenarioMode, 'experimental-manga');return candidate; },
  });
  assert.equal(result.status, 'repaired', result.warning);assert.equal(requests, 2);assert.equal(validations, 1);
  assert.match(result.scenario, /\[8コマ目: 結\]/);
});

test('recent mechanism audit distinguishes repetition from an intentional or merely same-label ending', async () => {
  const recentScenarios = [{ ending: '天丼', setup: '箱を開ける', outcome: '同じ箱がまた出る' }];
  const comparison = { status: 'same_mechanism', matched_index: 0, evidence: '今回も箱を開け同じ箱へ戻り、名詞以外の展開が同じ。', correction: '指定された天丼のまま、受け手と帰結を今回の題材から作る。' };
  const repeated = { ...STRONG_GAG_REVIEW, recent_repetition: comparison };
  assert.ok(evaluateScenarioPayoffReview(repeated, { punchlineType: 'RunningGag', recentScenarios }).reasonCodes.includes('repeated_story_mechanism'));
  for (const status of ['distinct', 'intentional_repeat']) {
    const review = { ...repeated, recent_repetition: { ...comparison, status } };
    assert.equal(evaluateScenarioPayoffReview(review, { punchlineType: 'RunningGag', recentScenarios }).ok, true);
  }
  assert.equal(evaluateScenarioPayoffReview({ ...repeated, recent_repetition: { ...comparison, matched_index: 9 } }, { recentScenarios }).reasonCodes.includes('repeated_story_mechanism'), false);
  let calls = 0;
  const result = await runScenarioPayoffGate({ scenario: 'CURRENT', punchlineType: 'RunningGag', recentScenarios,
    requestReview: async prompt => {
      assert.match(prompt, /RECENT STORY OUTCOMES/);
      return JSON.stringify(calls++ ? { ...STRONG_GAG_REVIEW, recent_repetition: { ...comparison, status: 'distinct' } } : repeated);
    },
    requestRepair: async prompt => { assert.match(prompt, /同じ箱がまた出る/); return 'DISTINCT OUTCOME'; },
  });
  assert.equal(result.status, 'repaired');
  assert.equal(calls, 2);
});

test('uncertain recent comparison preserves the candidate without a paid repair', async () => {
  let repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: 'CURRENT', recentScenarios: [{ outcome: 'A' }],
    requestReview: async () => JSON.stringify(STRONG_GAG_REVIEW),
    requestRepair: async () => { repairs++; return 'UNWANTED'; },
  });
  assert.equal(repairs, 0);
  assert.equal(result.scenario, 'CURRENT');
  assert.match(result.warning, /recent_comparison_unverified/);
});

const BALLOON_SCENARIO = '## タイトル: 試験\n' + [1, 2, 3, 4].map(panel =>
  `[${panel}コマ目: 起]\n[Camera: 俯瞰]\nBalloonLayout: [{"speaker":"A","x":0.7,"anchor":"画面左のAの口元","route":"右上から左へ"}]\n状況: Aが札を確認する。\nA「確認するよ。」`).join('\n');
const BALLOON_REVIEW = { ...STRONG_GAG_REVIEW, pass: false, reason_codes: ['BALLOON_LAYOUT_X_ANCHOR_CONTRADICTION'],
  visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 1
    ? { ...item, feasible: false, material_loss: true, correction: 'Move the sole balloon near its speaker without changing the action.' } : item) };

test('unreadable reset payoff is repaired despite superficial visual outcome approval', async () => {
  const unclear = { ...STRONG_GAG_REVIEW, payoff_clarity: {
    material_failure: true,
    evidence: '最後に突然別の部屋で目覚め、前の事件とのつながりも現実との差も示されない。',
    correction: '前半の小道具を現実側にも置き、予測と結果の違いを行動で回収する。',
  } };
  assert.ok(evaluateScenarioPayoffReview(unclear, { punchlineType: 'Dream' }).reasonCodes.includes('unclear_payoff'));
  let reviews = 0;
  let repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: 'ORIGINAL', punchlineType: 'Dream',
    requestReview: async () => JSON.stringify(reviews++ ? STRONG_GAG_REVIEW : unclear),
    requestRepair: async prompt => {
      repairs++;
      assert.match(prompt, /何が変わった/);
      return 'SEEDED DREAM PAYOFF';
    },
  });
  assert.equal(result.status, 'repaired');
  assert.equal(repairs, 1);
});

test('clear dream, meaningful sleep and deliberate surreal beats are allowed without repair', async () => {
  for (const punchlineType of ['Dream', 'GagAuto', 'Surreal']) {
    const review = { ...STRONG_GAG_REVIEW, payoff_clarity: {
      material_failure: false, evidence: '前半の準備と寝ながら達成する行動の食い違いが画面で読める。', correction: '',
    } };
    const result = await runScenarioPayoffGate({ scenario: 'CLEAR SLEEPING PAYOFF', punchlineType,
      requestReview: async () => JSON.stringify(review),
      requestRepair: async () => assert.fail('sleep or dream alone must not trigger repair'),
    });
    assert.equal(result.status, 'passed');
  }
  assert.equal(evaluateScenarioPayoffReview({ ...STRONG_GAG_REVIEW, reason_codes: ['unclear_payoff'] }).ok, true);
});

test('payoff clarity requires evidence and correction for a material failure', () => {
  for (const payoff_clarity of [undefined, {}, { material_failure: true, evidence: '', correction: '直す' },
    { material_failure: true, evidence: '出来事の差が見えない', correction: '' }]) {
    assert.throws(() => parseScenarioPayoffReview(JSON.stringify({ ...STRONG_GAG_REVIEW, payoff_clarity })), /incomplete_payoff_review/);
  }
});

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
  const staged = nativeScenario(4).replace('Aが作業の段階2を進める。', 'Aが手前の札を奥の仲間へ向ける。');
  const result = await runScenarioPayoffGate({
    scenario: nativeScenario(4), punchlineType: 'GagAuto',
    requestReview: async () => ({ text: JSON.stringify(reviews.shift()) }),
    requestRepair: async () => ({ text: staged }),
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

test('native ensemble audit targets unexplained relational swaps but accepts projection changes and motivated movement', async () => {
  const options = { scenarioMode: 'experimental-manga', panelCount: 6 };
  const rearSituation = '窓側からA・B・Cの席順は変わらず、背面からは画面左にC、中央にB、右にAが見える。Aが作業の段階2を進める。';
  const scenario = nativeScenario(6)
    .replace('[1コマ目: 展開]\n[Camera: 高い位置から強い俯瞰]', '[1コマ目: 展開]\n[Camera: ベンチの正面の高い位置から強い俯瞰]')
    .replace('[2コマ目: 展開]\n[Camera: 高い位置から強い俯瞰]', '[2コマ目: 展開]\n[Camera: ベンチの背面の高い位置から強い俯瞰、望遠で奥行きを圧縮]')
    .replace('"x":0.7,"anchor":"画面右のAの口元","route":"右上の余白からAへ"', '"x":0.3,"anchor":"画面左のAの口元","route":"左上の余白からAへ"')
    .replace('Aが作業の段階1を進める。', 'ベンチの窓側からA・B・Cが座る。正面からは画面左にA、中央にB、右にC。Aが作業の段階1を進める。')
    .replace('Aが作業の段階2を進める。', rearSituation);
  const prompt = buildScenarioPayoffReviewPrompt({ scenario, ...options });
  assert.match(prompt, /隣接.*前後.*向かい.*席位置/u);
  assert.match(prompt, /移動.*転換.*根拠.*重大.*material_break=true/u);
  assert.match(prompt, /切り返し.*望遠.*左右.*重なり.*変化だけ.*false/u);
  const projectionEvidence = '正面では左A・中央B・右C、背面では左C・中央B・右A。窓側からA・B・Cの同じ席順で、望遠の圧縮も隣接関係を変えない。';
  for (const [candidate, evidence] of [[scenario, projectionEvidence],
    [scenario.replace(rearSituation, 'Aが窓側の席を立ってBの後ろへ一歩回る。BとCは元の席に座ったまま。'), 'Aが席を立ってBの後ろへ回る動作が明記され、BとCの席は不変。']]) {
    const allowed = nativeReview(6);
    allowed.ensemble_continuity[1] = { panel: 2, material_break: false, evidence, correction: '' };
    const result = await runScenarioPayoffGate({ scenario: candidate, ...options,
      requestReview: async () => JSON.stringify(allowed),
      requestRepair: async () => assert.fail('coherent viewpoint changes and scripted movement must not require repair'),
    });
    assert.equal(result.status, 'passed'); assert.equal(result.scenario, candidate);
  }
  const brokenScenario = scenario.replace(rearSituation, '移動や席替えはしていないのに窓側からA・C・Bが座り、背面では画面左にB、中央にC、右にAが見える。Aが作業の段階2を進める。');
  const broken = nativeReview(6);
  broken.ensemble_continuity[1] = { panel: 2, material_break: true,
    evidence: '席替えなしで窓側からA・B・CがA・C・Bへ変わり、Aの隣がBからCへ変わる。背面の投影だけでは説明できない。',
    correction: '背面のCameraは維持して窓側からA・B・Cへ戻し、画面左C・中央B・右Aとして投影する。' };
  assert.ok(evaluateScenarioPayoffReview(broken, options).reasonCodes.includes('flat_ensemble_panel_2'));
  const repairPrompt = buildScenarioPayoffRepairPrompt({ scenario: brokenScenario, review: broken, ...options });
  assert.match(repairPrompt, /場面内.*隣接.*向かい/u);
  assert.match(repairPrompt, /正面から背面.*画面左右.*反転.*移動.*入れ替え.*扱わない/u);
  let reviews = 0, repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: brokenScenario, ...options,
    requestReview: async () => { reviews++; return JSON.stringify(reviews === 1 ? broken : nativeReview(6)); },
    requestRepair: async () => { repairs++; return scenario; },
  });
  assert.equal(result.status, 'repaired'); assert.equal(result.scenario, scenario);
  assert.equal(reviews, 2); assert.equal(repairs, 1);
  assert.deepEqual(result.scenario.match(/\[Camera:[^\n]+/g), brokenScenario.match(/\[Camera:[^\n]+/g), 'repair must retain the rear camera');
  assert.deepEqual(result.scenario.match(/A「[^」]+」/g), brokenScenario.match(/A「[^」]+」/g), 'repair must retain speakers and dialogue');
});

test('ensemble review checks copied acting even after positions are varied, without imposing mouth quotas', () => {
  const prompt = buildScenarioPayoffReviewPrompt({ scenario: 'SCENARIO' });
  assert.match(prompt, /配置が分散していても/);
  assert.match(prompt, /口の開閉だけ|開口人数/);
  assert.match(prompt, /軽微|好み/);
});

for (const count of [4, 6, 8]) test(`${count}-panel relation continuity crosses a cropped panel without locking projection or motivated movement`, async () => {
  const options = { scenarioMode: count === 4 ? 'four-panel' : 'experimental-manga', panelCount: count };
  const initial = 'Aは台の赤い印の端、Bは反対の青い印の端に立ち、台を動かさず二人で作業する。';
  const retainedRelation = '台と人物は移動せず、Aは赤い印の端、Bは青い印の端にいる。背面からの投影で画面左右だけが反転する。';
  const scenario = nativeScenario(count)
    .replace('[2コマ目: 展開]\n[Camera: 高い位置から強い俯瞰]', '[2コマ目: 展開]\n[Camera: 高所からAの手元だけの接写、台の両端は画角外]')
    .replace('[3コマ目: 展開]\n[Camera: 高い位置から強い俯瞰]', '[3コマ目: 展開]\n[Camera: 台の背面側の高所から強い俯瞰、望遠で奥行きを圧縮]')
    .replace('Aが作業の段階1を進める。', initial)
    .replace('Aが作業の段階2を進める。', 'Aの手元の作業だけが見え、二人と台の端の関係は画角外。位置変更は描かれない。')
    .replace('Aが作業の段階3を進める。', retainedRelation);
  const reviewPrompt = buildScenarioPayoffReviewPrompt({ scenario, ...options });
  assert.match(reviewPrompt, /最後に明示された.*人物・物.*関係.*接写.*遮蔽.*画面外/u);
  assert.match(reviewPrompt, /物の側・端.*画面左右.*区別/u);
  assert.match(reviewPrompt, /未指定・曖昧.*material_break=false.*根拠不足/u);
  const positiveCases = [
    [scenario, 'P1のAは赤い印の端、Bは青い印の端という関係が、P2の接写を挟んだP3も同じ。背面投影の左右反転だけ。', false],
    [scenario.replace(retainedRelation, 'AとBが台の周りを歩いて互いの端へ移る。台は回さず、Aは青い印、Bは赤い印の端へ到着する。'), 'P1からP3の間に二人が歩いて入れ替わる動作が明示され、物語に沿った移動。', false],
    [scenario.replace(retainedRelation, 'AとBは床上の位置を保ち、台を二人で半回転させる。赤い印の端がBへ、青い印の端がAへ来る。'), 'P3の台の半回転で人物に近い端が変わる。人物移動も関係崩壊も捏造しない。', false],
    [scenario.replace(initial, '二人が台の近くで作業し、どの端にいるかは未指定。').replace(retainedRelation, 'AとBが作業するが、台の印は遮蔽されて見えない。'), 'P1の端の関係は未指定、P2は接写、P3は印が遮蔽されており比較根拠が不足。入れ替えは断定できない。', true],
  ];
  for (const [candidate, evidence, uncertain] of positiveCases) {
    const review = nativeReview(count);
    review.pass = !uncertain;
    review.ensemble_continuity[2] = { panel: 3, material_break: false, evidence, correction: '' };
    const result = await runScenarioPayoffGate({ scenario: candidate, ...options,
      requestReview: async () => JSON.stringify(review),
      requestRepair: async () => assert.fail('projection, explicit movement, prop rotation or insufficient evidence must not cause paid repair'),
    });
    assert.equal(result.status, uncertain ? 'retained' : 'passed');
    assert.equal(result.scenario, candidate);
    if (uncertain) assert.ok(result.warning);
  }
  const brokenScenario = scenario.replace(retainedRelation, '台も人物も移動・回転していないのに、Aが青い印の端、Bが赤い印の端にいる。');
  const broken = nativeReview(count);
  broken.ensemble_continuity[2] = { panel: 3, material_break: true,
    evidence: 'P1のA=赤い印の端、B=青い印の端が、接写だけのP2を挟みP3で逆転する。移動も台の回転もなく、画面投影では物の印と人物の対応を逆転できない。',
    correction: 'P3の背面Cameraを維持し、Aは赤い印、Bは青い印の端という最後に明示された関係を投影する。' };
  const repairPrompt = buildScenarioPayoffRepairPrompt({ scenario: brokenScenario, review: broken, ...options });
  assert.match(repairPrompt, /最後に明示された.*人物・物.*関係.*接写.*遮蔽.*画面外/u);
  assert.match(repairPrompt, /人物の移動・物の回転・場面転換.*更新/u);
  let reviews = 0, repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: brokenScenario, ...options,
    requestReview: async () => JSON.stringify(++reviews === 1 ? broken : nativeReview(count)),
    requestRepair: async () => { repairs++; return scenario; },
  });
  assert.equal(result.status, 'repaired'); assert.equal(repairs, 1); assert.equal(reviews, 2);
  assert.equal(result.scenario, scenario);
  assert.deepEqual(result.scenario.match(/\[Camera:[^\n]+/g), brokenScenario.match(/\[Camera:[^\n]+/g));
  assert.deepEqual(result.scenario.match(/A「[^」]+」/g), brokenScenario.match(/A「[^」]+」/g));
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
    cast_identity: identityFor(4),
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
  const repaired = nativeScenario(4).replace('Aが作業の段階4を進める。', 'Aが一枚の札を両手で支える。');
  const overloaded = {
    ...STRONG_GAG_REVIEW,
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel === 4
      ? { panel: 4, feasible: false, material_loss: true, evidence: 'Two separate hand-card contacts are unreadable from the high wide camera.', correction: 'Keep the broad gag and stage only the focal card contact in panel 4.' }
      : item),
  };
  let reviews = 0;
  const result = await runScenarioPayoffGate({
    scenario: nativeScenario(4),
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews === 1 ? overloaded : STRONG_GAG_REVIEW),
    requestRepair: async () => repaired,
    validateRepair: () => true,
  });
  assert.equal(result.status, 'repaired');
  assert.equal(result.scenario, repaired);
  assert.equal(reviews, 2);
});

test('gate gives subjective spatial staging one repair and keeps the best candidate for image generation', async () => {
  const repaired = nativeScenario(4).replace('Aが作業の段階3を進める。', 'Aが札を手前の余白に置く。');
  const overloaded = {
    ...STRONG_GAG_REVIEW,
    visual_feasibility: STRONG_GAG_REVIEW.visual_feasibility.map(item => item.panel >= 3
      ? { panel: item.panel, feasible: false, material_loss: true, evidence: 'The board contacts cannot be read in this wide strip.', correction: 'Move the staging and keep a focal contact.' }
      : item),
  };
  let reviews = 0;
  let repairs = 0;
  const result = await runScenarioPayoffGate({
    scenario: nativeScenario(4),
    punchlineType: 'GagAuto',
    requestReview: async () => JSON.stringify(++reviews === 1 ? overloaded : {
      ...overloaded,
      visual_feasibility: overloaded.visual_feasibility.map(item => item.panel === 3
        ? { ...item, feasible: true, evidence: 'The board contact is now legible.', correction: '' }
        : item),
    }),
    requestRepair: async () => { repairs++;return repaired; },
    validateRepair: () => true,
  });
  assert.equal(result.status, 'best_effort');
  assert.equal(result.scenario, repaired);
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
  assert.match(workflow, /const step4ok = await regenerateImage\(true, generatedPrompt, \{sourceScenario:generatedScenario\}\)/);
});


test('cast identity proof is required for every panel and incomplete proof is never a successful audit', async () => {
  const mutations = [r => { delete r.cast_identity; }, r => r.cast_identity.pop(),
    r => { r.cast_identity[1].panel = 1; }, r => { r.cast_identity[0].reference_evidence = ''; },
    r => { r.cast_identity[0].scenario_evidence = ' '; }, r => { r.cast_identity[0].status = 'invented'; },
    r => { r.cast_identity[0].status = 'mismatch'; },
    r => { r.cast_identity[0].status = 'intentional_change'; },
  ];
  for (const count of [4, 5, 6, 7, 8]) for (const mutate of mutations) {
    const review = nativeReview(count); mutate(review);
    const options = { scenarioMode: count === 4 ? 'four-panel' : 'experimental-manga', panelCount: count };
    assert.throws(() => parseScenarioPayoffReview(JSON.stringify(review), options), /incomplete_payoff_review/);
    assert.equal(evaluateScenarioPayoffReview(review, options).ok, false);
    let calls = 0;
    const result = await runScenarioPayoffGate({ scenario: nativeScenario(count), ...options,
      requestReview: async () => { calls++; return JSON.stringify(review); },
      requestRepair: async () => assert.fail('incomplete evidence must not cause a paid repair'),
    });
    assert.equal(result.status, 'retained'); assert.ok(result.warning); assert.equal(calls, 1);
  }
});

test('grounded identity swaps enter the existing bounded staging repair and receive the same final audit', async () => {
  for (const count of [4, 5, 6, 7, 8]) {
    const options = { scenarioMode: count === 4 ? 'four-panel' : 'experimental-manga', panelCount: count };
    const original = nativeScenario(count).replace('Aが作業の段階2を進める。', '眼鏡姿のAが作業の段階2を進める。');
    const repaired = original.replace('眼鏡姿のA', '眼鏡のないA');
    const review = nativeReview(count);
    review.cast_identity[1] = { ...review.cast_identity[1], status: 'mismatch',
      reference_evidence: 'Aは眼鏡なし、Bが眼鏡あり。', scenario_evidence: '2コマ目は眼鏡姿のAとし、台詞と尾もAへ指定している。',
      correction: 'Aの外見記述を眼鏡なしへ戻し、Aの台詞と尾を保持する。' };
    const evaluation = evaluateScenarioPayoffReview(review, { ...options, punchlineType: 'Surreal' });
    assert.ok(evaluation.reasonCodes.includes('cast_identity_panel_2'));
    assert.equal(evaluation.ok, false, 'a top-level pass cannot hide supported contradictory identity evidence');
    let reviews = 0, repairs = 0;
    const result = await runScenarioPayoffGate({ scenario: original, castList: 'A\nB', ...options, punchlineType: 'Surreal',
      requestReview: async prompt => {
        reviews++; assert.match(prompt, /cast_identity/); assert.match(prompt, /認識.*人物設定|人物設定.*認識/);
        if (reviews === 2) assert.ok(prompt.includes(repaired));
        return JSON.stringify(reviews === 1 ? review : nativeReview(count));
      },
      requestRepair: async prompt => {
        repairs++; assert.match(prompt, /外見/); assert.match(prompt, /話者・文言・順序/);
        assert.doesNotMatch(prompt, /全体を書き直/); return repaired;
      },
    });
    assert.equal(result.status, 'repaired'); assert.equal(result.scenario, repaired);
    assert.equal(reviews, 2); assert.equal(repairs, 1);
    assert.deepEqual([...result.scenario.matchAll(/A「[^」]+」/g)].map(m => m[0]), [...original.matchAll(/A「[^」]+」/g)].map(m => m[0]));
  }
});

test('identity repairs cannot change names or dialogue and are bounded when the mismatch remains', async () => {
  const original = nativeScenario(6), review = nativeReview(6);
  review.cast_identity[1] = { ...review.cast_identity[1], status: 'mismatch',
    scenario_evidence: 'Aの状況説明と尾にBの特徴が付いている。', correction: '状況説明と尾をAの設定へ合わせる。' };
  for (const candidate of [original.replace('A「段階2だよ。」', 'B「段階2だよ。」'),
    original.replace('A「段階2だよ。」', 'A「別の話だよ。」')]) {
    let reviews = 0, repairs = 0;
    const result = await runScenarioPayoffGate({ scenario: original, scenarioMode: 'experimental-manga',
      requestReview: async () => { reviews++; return JSON.stringify(review); },
      requestRepair: async () => { repairs++; return candidate; },
    });
    assert.equal(result.scenario, original); assert.match(result.warning, /staging_only_scope_violation/);
    assert.equal(reviews, 1); assert.equal(repairs, 1);
  }
  let reviews = 0, repairs = 0;
  const result = await runScenarioPayoffGate({ scenario: original, scenarioMode: 'experimental-manga',
    requestReview: async () => { reviews++; return JSON.stringify(review); },
    requestRepair: async () => { repairs++; return original.replace('作業の段階2', '作業の第二段階'); },
  });
  assert.notEqual(result.status, 'passed'); assert.notEqual(result.status, 'repaired'); assert.ok(result.warning);
  assert.equal(reviews, 2); assert.equal(repairs, 1, 'use the existing one-repair staging budget');
});

test('correct identities and grounded intentional changes remain allowed without repair', async () => {
  const cases = [
    { status: 'consistent', reference_evidence: 'Cは赤い短髪、Dは白い長髪。', scenario_evidence: 'CとDの外見・話者・尾は各自の設定と一致する。', change_basis: '' },
    { status: 'consistent', scenario_evidence: 'Aは劇画で眼窩と鼻の陰影が変わるが、本人の髪と眼鏡なしは保持する。', change_basis: '' },
    { status: 'intentional_change', scenario_evidence: 'Aが変装用の眼鏡とカツラを付けている。', change_basis: 'ユーザーがAの変装を明示している。' },
    { status: 'intentional_change', scenario_evidence: 'Bが自分の長髪を一つに結び直している。', change_basis: '直前の状況にBが作業のため髪を結ぶ動作がある。' },
    { status: 'intentional_change', scenario_evidence: 'Bは濡れた眼鏡を外して拭いている。', change_basis: 'このコマの出来事として本人が眼鏡を外す動作が指定されている。' },
  ];
  for (const item of cases) {
    const review = nativeReview(6); review.cast_identity[1] = { ...review.cast_identity[1], ...item };
    const result = await runScenarioPayoffGate({ scenario: nativeScenario(6), scenarioMode: 'experimental-manga',
      requestReview: async () => JSON.stringify(review),
      requestRepair: async () => assert.fail('explicit changes or drawing style are not identity defects'),
    });
    assert.equal(result.status, 'passed');
  }
  const prompt = buildScenarioPayoffReviewPrompt({ scenario: nativeScenario(6), scenarioMode: 'experimental-manga' });
  assert.match(prompt, /変装/); assert.match(prompt, /髪型/); assert.match(prompt, /着脱/); assert.match(prompt, /画風/);
});

test('uncertain identity and unsupported model codes cannot trigger a paid identity repair', async () => {
  const review = nativeReview(6); review.cast_identity[1].status = 'uncertain';
  review.cast_identity[1].scenario_evidence = '顔が画面外という指定で外見の対応を確定できない。';
  assert.equal(evaluateScenarioPayoffReview(review, { scenarioMode: 'experimental-manga', panelCount: 6 }).ok, false);
  const result = await runScenarioPayoffGate({ scenario: nativeScenario(6), scenarioMode: 'experimental-manga',
    requestReview: async () => JSON.stringify(review), requestRepair: async () => assert.fail('uncertain is not material'),
  });
  assert.equal(result.status, 'retained'); assert.ok(result.warning);
  const supported = nativeReview(6); supported.reason_codes = ['cast_identity_panel_2', 'cast_identity_unverified'];
  assert.equal(evaluateScenarioPayoffReview(supported, { scenarioMode: 'experimental-manga', panelCount: 6 }).ok, true,
    'structured evidence is authoritative over invented model reason codes');
});


test('cast identity prompt example cannot be accepted as completed observation evidence', () => {
  const prompt = buildScenarioPayoffReviewPrompt({ scenario: nativeScenario(6), scenarioMode: 'experimental-manga' });
  const start = prompt.indexOf('{\n  "pass":');
  const example = JSON.parse(prompt.slice(start, prompt.indexOf('\n\nSCENARIO:', start)).trim());
  assert.throws(() => parseScenarioPayoffReview(JSON.stringify(example), { scenarioMode: 'experimental-manga', panelCount: 6 }), /incomplete_payoff_review/);
  assert.ok(evaluateScenarioPayoffReview(example, { scenarioMode: 'experimental-manga', panelCount: 6 }).reasonCodes.includes('cast_identity_unverified'));
  assert.match(prompt, /実際の認識設定と台本から/);
});
