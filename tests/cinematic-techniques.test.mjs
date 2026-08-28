import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

import {
  CINEMATIC_TECHNIQUES,
  formatCinematicTechniqueSlot,
  replaceCinematicSlotWithinBudget,
  selectPageCinematicTechniques
} from '../src/lib/cinematic-techniques.js';

let server;
let buildMangaPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## アカリ
- young adult woman, short orange hair, brown eyes, no glasses
## ヒカリ
- young adult woman, long black hair, blue eyes, round glasses
`;

const CINEMATIC_SCENARIO = `
## Title: 駅舎の忘れ物
Location: 古い駅舎
Outfit: 秋の旅行服

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: Epic Wide]
Action: 開いた木製扉を画面端の枠として、その奥でアカリが古い切符を拾う。
アカリ「これ、誰の切符？」

[2コマ目: 承]
[EMOTION: NORMAL]
[Camera: Innocent High]
Action: ヒカリがアカリの方を向き、落とし主を考える。
ヒカリ「さっきの人かも」

[3コマ目: 転]
[EMOTION: GOLDEN_HOUR]
[Camera: 俯瞰]
Action: 長いホームと遠景の山並みの間を、二人が出口へ走る。
アカリ「まだ間に合う！」

[4コマ目: 結]
[EMOTION: NORMAL]
[Camera: Dominant Low]
Action: 改札前で切符を落とし主に手渡し、ヒカリが安堵する。
ヒカリ「よかったね」
`;

const NO_CUE_SCENARIO = CINEMATIC_SCENARIO
  .replace('開いた木製扉を画面端の枠として、その奥で', '')
  .replace('長いホームと遠景の山並みの間を、', '駅の待合室で')
  .replace('二人が出口へ走る', '二人が出口へ向かう')
  .replace('[Camera: Epic Wide]', '[Camera: Aesthetic Thirds]')
  .replace('[Camera: 俯瞰]', '[Camera: Aesthetic Thirds]');

const buildPrompt = (scenario, providerFamily, cinematicTechniques) => buildMangaPrompt({
  scenario,
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily,
  punchlineType: 'Auto',
  systemVersion: 'v5.6.6-test',
  allowScenarioQualityWarning: true,
  cinematicTechniques
});

test('ships the complete cinematic still-image capability registry', () => {
  assert.deepEqual(
    CINEMATIC_TECHNIQUES.map(({ id }) => id),
    [
      'frame_within_frame',
      'foreground_occlusion',
      'gobo_shadow',
      'atmospheric_perspective',
      'story_reflection',
      'split_diopter',
      'shutter_drag',
      'prism_refraction',
      'tilt_shift'
    ]
  );
  assert.ok(Object.isFrozen(CINEMATIC_TECHNIQUES));
  for (const technique of CINEMATIC_TECHNIQUES) {
    assert.ok(Object.isFrozen(technique));
    assert.match(technique.risk, /^(?:low|medium|high)$/);
    assert.ok(technique.cue instanceof RegExp);
    assert.ok(technique.compact.length >= 8);
  }
});

test('selects at most two different low-risk techniques in deterministic page order', () => {
  const assignments = selectPageCinematicTechniques([
    'Location: 古い駅舎\nAction: 開いた木製扉の奥で二人が話す。',
    'Action: 鏡に本人の表情が映る。',
    'Action: 普通の白い部屋で会話する。',
    'Camera: ドローン俯瞰\nAction: 街全体を見渡す。'
  ], { location: '古い駅舎' });

  assert.deepEqual(
    assignments.map(({ id, panelNumber }) => [id, panelNumber]),
    [['frame_within_frame', 1], ['atmospheric_perspective', 4]]
  );
});

test('does nothing when no physical cinematic cue exists', () => {
  assert.deepEqual(
    selectPageCinematicTechniques([
      'Action: 二人が普通の白い部屋で会話する。',
      'Action: 一人が椅子に座って返事をする。'
    ]),
    []
  );
});

test('allows reflection and refraction only from explicit physical surfaces', () => {
  const assignments = selectPageCinematicTechniques([
    'Action: 鏡に映った本人の表情と向き合う。',
    'Action: 水晶プリズム越しの光が画面端で屈折する。'
  ]);

  assert.deepEqual(
    assignments.map(({ id, panelNumber }) => [id, panelNumber]),
    [['story_reflection', 1], ['prism_refraction', 2]]
  );
  assert.deepEqual(
    selectPageCinematicTechniques(['Action: 幻想的でキラキラした雰囲気。']),
    []
  );
});

test('rejects optional techniques when explicit detail or text readability must win', () => {
  assert.deepEqual(
    selectPageCinematicTechniques([
      '[Camera: 手元の超接写]\nAction: 窓辺で契約書の小さな文字を読む。',
      '[Camera: Deep Emotion Close]\nAction: 鏡の前で目に涙を浮かべる。'
    ]),
    []
  );
});

test('does not repeat one technique across several eligible panels', () => {
  const assignments = selectPageCinematicTechniques([
    'Action: 木製扉の奥に立つ。',
    'Action: 開いたドアの向こうから振り返る。',
    'Action: アーチ越しに遠い街を見る。'
  ]);

  assert.equal(assignments.filter(({ id }) => id === 'frame_within_frame').length, 1);
  assert.ok(assignments.length <= 2);
});

test('formats only selected panel mappings inside a fixed-size slot', () => {
  const assignments = [
    { id: 'frame_within_frame', panelNumber: 1, compact: 'frame-edge depth', risk: 'low' },
    { id: 'atmospheric_perspective', panelNumber: 4, compact: 'aerial depth haze', risk: 'low' }
  ];
  const formatted = formatCinematicTechniqueSlot(assignments, 72);

  assert.ok(formatted.length <= 72);
  assert.match(formatted, /^CINE:/);
  assert.match(formatted, /P1 frame-edge depth/);
  assert.match(formatted, /P4 aerial depth haze/);
  assert.doesNotMatch(formatted, /frame_within_frame|atmospheric_perspective/);
  assert.equal(formatCinematicTechniqueSlot([], 72), '');
  assert.equal(formatCinematicTechniqueSlot(assignments, 12), '');
});

test('replaces a slot only when the complete result cannot grow', () => {
  const baseline = 'AAA CAMERA-SLOT ZZZ';

  assert.equal(
    replaceCinematicSlotWithinBudget(baseline, 'CAMERA-SLOT', 'CINE: P1'),
    'AAA CINE: P1 ZZZ'
  );
  assert.equal(
    replaceCinematicSlotWithinBudget(baseline, 'CAMERA-SLOT', 'CINE: REPLACEMENT IS TOO LONG'),
    baseline
  );
  assert.equal(
    replaceCinematicSlotWithinBudget(baseline, 'MISSING', 'CINE: P1'),
    baseline
  );
});

for (const providerFamily of ['chatgpt', 'gemini']) {
  test(`${providerFamily} four-panel prompt maps eligible techniques without growing`, () => {
    const baseline = buildPrompt(CINEMATIC_SCENARIO, providerFamily, false);
    const enhanced = buildPrompt(CINEMATIC_SCENARIO, providerFamily, true);

    assert.ok(enhanced.length <= baseline.length);
    assert.match(enhanced, /CINE:.*P1 frame-edge depth.*P3 aerial depth haze/i);
    assert.doesNotMatch(enhanced, /frame_within_frame|atmospheric_perspective|CINEMATIC_TECHNIQUES/);
    assert.equal((enhanced.match(/CINE:/g) || []).length, 1);
  });
}

test('four-panel enhancement preserves every explicit panel camera', () => {
  const enhanced = buildPrompt(CINEMATIC_SCENARIO, 'chatgpt', true);

  assert.match(enhanced, /Camera: Epic Wide/);
  assert.match(enhanced, /Camera: Innocent High/);
  assert.match(enhanced, /Camera: 俯瞰/);
  assert.match(enhanced, /Camera: Dominant Low/);
});

test('four-panel prompt remains exactly baseline-equivalent when no technique is eligible', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    assert.equal(
      buildPrompt(NO_CUE_SCENARIO, providerFamily, true),
      buildPrompt(NO_CUE_SCENARIO, providerFamily, false)
    );
  }
});
