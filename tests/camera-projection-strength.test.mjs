import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';
import { getPanelShotExecution } from '../src/lib/composition-variety.js';
import { restoreReviewedShotExecution } from './helpers/prompt-policy-normalization.mjs';

const assertStrength = cue => assert.match(cue, /指定角を弱めず強めない/);
const assertRoll = cue => {
  assertStrength(cue);
  assert.match(cue, /場面の鉛直\/水平.*光軸回り/);
  assert.match(cue, /机の遠近線だけで代用せず/);
  assert.match(cue, /透視収束.*保持/);
  assert.doesNotMatch(cue, /(?:all|every) vertical lines? (?:must be )?parallel|全(?:ての)?[鉛垂]直線.*平行|\d+\s*(?:度|°|degrees)/i);
};

test('full and compact high shots retain both strong and gentle authored pitch', () => {
  for (const compact of [false, true]) for (const camera of [
    '右上から強い俯瞰、俯角60度。二人を腰まで捉える。',
    '左上から浅い俯瞰、俯角12度。二人を腰まで捉える。',
    'strong high-angle view from the right, 60 degrees downward',
    'gentle high-angle view from the left, 12 degrees downward',
  ]) {
    const cue = getPanelShotExecution(camera, { compact });
    assertStrength(cue, compact);
    assert.match(cue, compact ? /人物\/場は同じ俯角/ : /actors and setting share downward projection/);
    assert.doesNotMatch(cue, /急俯瞰の強制禁止|never force steep overhead/);
    assert.doesNotMatch(cue, /\d+\s*(?:度|°|degrees)/i, 'compiler must not invent or replace an angle');
  }
});

test('Dutch roll projects scene references around the optical axis with authored strength', () => {
  for (const compact of [false, true]) for (const camera of [
    '床近くから見上げ、強いダッチ25度。二人の膝まで捉える。',
    '目線の高さから、軽いダッチ5度。二人の胸まで捉える。',
    'strong Dutch tilt, 25 degrees, low-angle view',
    'slight Dutch angle, 5 degrees, eye-level view',
  ]) assertRoll(getPanelShotExecution(camera, { compact }), compact);
});

test('level, prohibited Dutch and actor-only head tilts gain no roll or high-shot instruction', () => {
  for (const compact of [false, true]) for (const camera of [
    '正面アイレベル、水平に撮る。',
    'ダッチなし。正面アイレベル。',
    '非ダッチ。正面アイレベル。',
    '正面アイレベル。首を軽く傾げる。',
    'eye-level camera; head slightly tilted',
    'eye-level camera, avoid Dutch tilt',
    'eye-level camera, table edges receding diagonally',
  ]) assert.doesNotMatch(getPanelShotExecution(camera, { compact }), /ロール:|光軸回り|俯瞰:|look down/);
});

test('roll remains independent of pitch and preserves explicit head acting', () => {
  for (const compact of [false, true]) {
    const cue = getPanelShotExecution('アイレベル、軽いダッチ。首を軽く傾げる。', { compact });
    assertRoll(cue, compact);
    assert.doesNotMatch(cue, /俯瞰:|look down|見上げ|look up/);
    const high = getPanelShotExecution('強い俯瞰。ダッチなし。首を軽く傾げる。', { compact });
    assertStrength(high, compact);
    assert.doesNotMatch(high, /ロール:|光軸回り/);
  }
});

test('fixed shot instructions stay within the reviewed size instead of growing with repeated explanations', () => {
  const cameras = [
    '右上から俯瞰、全身を捉える。',
    '床近くから広角・軽いダッチで見上げる。',
    '左上から俯瞰、顔のアップ。',
    '低い位置から望遠で見上げる。',
    '背後の右上から肩越しに見下ろす。',
    '高い位置から広く見下ろす。',
  ];
  // Frozen pre-strengthening compiler lengths for these six unchanged cameras:
  // full 3298, compact 1633. The concise roll geometry adds at most 18 compact
  // characters overall; ordinary output must fit within the previous total.
  for (const [compact, ceiling] of [[false, 3298], [true, 1651]]) {
    const fixed = cameras.map(camera => getPanelShotExecution(camera, { compact })).join('\n');
    assert.ok(fixed.length <= ceiling, `fixed camera instructions ${fixed.length} > ${ceiling} (compact=${compact})`);
  }
});

test('reviewed camera normalization inverts only the exact compiler clauses and preserves unknown changes', () => {
  const mappings = [
    ['指定角を弱めず強めない',
      'pitch strength follows script, never force steep overhead'],
    ['ロール: 場面の鉛直/水平を光軸回りに投影。机の遠近線だけで代用せず透視収束保持。指定角を弱めず強めない',
      'tilt scene axes, not only faces'],
  ];
  const wrap = cue => `## Panel 1\nCamera: USER CAMERA 12度\nSHOT EXECUTION: ${cue}.\nStyle: USER STYLE\nAction (visual only): USER ACTION\nDialogue: "USER SPEECH"`;
  for (const [current, previous] of mappings) {
    assert.equal(restoreReviewedShotExecution(wrap(current)), wrap(previous));
    for (const unknown of [current + ' UNAUTHORIZED', current.replace('弱めず', '弱めて')]) {
      assert.notEqual(restoreReviewedShotExecution(wrap(unknown)), wrap(previous));
    }
    for (const authored of [`Camera: ${current}`, `Action (visual only): ${current}`, `Dialogue: "${current}"`]) {
      assert.equal(restoreReviewedShotExecution(authored), authored);
    }
    for (const field of ['USER CAMERA', 'USER STYLE', 'USER ACTION', 'USER SPEECH']) {
      assert.notEqual(restoreReviewedShotExecution(wrap(current).replace(field, 'CHANGED FIELD')), wrap(previous));
    }
  }
});

test('ordinary and native assembly preserve exact camera strengths, numeric angles, Action and styles', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js');
    const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const castList = '## 甲\n## 乙';
    const cameras = [
      '右上から強い俯瞰、俯角60度。甲と乙を腰まで捉える。',
      '左上から浅い俯瞰、俯角12度。甲と乙を腰まで捉える。',
      '床近くから見上げ、強いダッチ25度。甲と乙の膝まで捉える。',
      '目線の高さから、軽いダッチ5度。甲と乙の胸まで捉える。',
      '正面アイレベル、水平に撮る。甲と乙の胸まで捉える。',
    ];
    const styles = ['NORMAL', 'WATERCOLOR', 'POP_ART', 'GEKIGA', 'SKETCH'];
    const action = '甲と乙が向かい合う。甲は首を少し傾げ、乙は穏やかに笑う。';
    const scenarioFor = selected => selected.map((camera, index) => `[${index + 1}コマ目]\n[EMOTION: ${styles[index]}]\n[Camera: ${camera}]\n状況: ${action}\n甲「続けよう。」`).join('\n');
    for (const providerFamily of ['chatgpt', 'gemini']) {
      const prompt = buildMangaPrompt({ scenario: scenarioFor(cameras.slice(0, 4)), castList, colorMode: 'color', providerFamily, promptMaxChars: 32000, showWatermarks: false });
      for (const camera of cameras.slice(0, 4)) assert.ok(prompt.includes(camera), `Camera preserved for ${providerFamily}: ${camera}`);
      assert.ok(prompt.includes(action));
      assert.ok(prompt.includes('続けよう。'));
      for (const style of styles.slice(1, 4)) assert.ok(prompt.includes(style));
      assertRoll(prompt.match(/^SHOT EXECUTION:.*光軸回り.*$/m)?.[0] || '');
    }
    // Native planning requires elevated/depressed shots; level/eye-level behavior
    // is covered above through the ordinary compiler and direct shared helper.
    const nativeCameras = cameras.slice(0, 3).concat([
      '左上から浅い俯瞰、軽いダッチ5度。甲と乙の胸まで捉える。',
      '左前の高い位置から俯瞰。甲と乙の胸まで捉える。',
    ]);
    const input = { enabled: true, scenario: scenarioFor(nativeCameras), castList, colorMode: 'color' };
    const source = native.readExperimentalSource(input);
    const plan = { count: 5, layout: 'two_columns', reason: '同じ二人の会話を原文の視点で描く', panels: source.panels.map(panel => ({
      sourcePanel: panel.id, kind: 'anchor', camera: panel.camera, action, dialogueIds: panel.dialogueIds, breakout: null,
    })) };
    const prepared = await native.prepareExperimentalManga(input, async () => JSON.stringify(plan));
    for (const camera of nativeCameras) assert.ok(prepared.prompt.includes(camera));
    for (const style of styles) assert.ok(prepared.prompt.includes(style));
    assertRoll(prepared.prompt.match(/^SHOT EXECUTION:.*光軸回り.*$/m)?.[0] || '', true);
    assert.equal(prepared.source.scenario, input.scenario);
  } finally { await server.close(); }
});
