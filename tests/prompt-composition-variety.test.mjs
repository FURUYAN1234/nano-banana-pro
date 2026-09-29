import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let getPanelCompositionAssist;
let getPanelShotExecution;
let MANGA_COMPOSITION_VARIETY_LOCK;
let MANGA_COMPOSITION_VARIETY_LOCK_COMPACT;
let MANGA_GESTURE_VARIETY_LOCK;
let cinematicCompositionMap;

test('unspecified rear staging never adds a head turn just to expose a face', () => {
  for (const compact of [false, true]) {
    const rear = getPanelCompositionAssist('[Camera: 俯瞰]', 3, { compact });
    assert.match(rear, /REAR THREE-QUARTER/);
    assert.doesNotMatch(rear, /readable turned face|keep the face readable/);
    assert.match(rear, /scripted head turn/);
    const explicit = getPanelCompositionAssist('[Camera: 正面、顔のアップ]', 3, { compact });
    assert.match(explicit, /PRESERVE EXPLICIT AZIMUTH/);
    assert.doesNotMatch(explicit, /REAR THREE-QUARTER/);
  }
});

test('a long full-body shot keeps distance as well as body extent', () => {
  for (const camera of ['引きの全身、斜め俯瞰', 'high-angle long shot, full body']) {
    const result = getPanelShotExecution(camera);
    assert.match(result, /wide framing/);
    assert.match(result, /body extent.*continuous setting/);
    assert.doesNotMatch(result, /half the panel height/);
    assert.match(result, /head-to-feet/);
  }
  for (const camera of ['広角の顔のアップ', 'wide-angle close-up', '全身寄り']) {
    assert.doesNotMatch(getPanelShotExecution(camera), /half the panel height|wide framing/);
  }
});

test('both provider prompts keep shot scale ahead of facial readability after compaction', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace('[Camera: Over The Shoulder]', '[Camera: 引きの全身、斜め俯瞰]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    assert.match(prompt, /body extent.*continuous setting/);
    assert.match(prompt, /readability never changes shot scale/i);
    assert.match(prompt, /explicit scale.*wins/i);
    assert.equal((prompt.match(/wide framing/g) || []).length, 1);
    assert.match(prompt, /Please check this revision/);
  }
});

test('looking up keeps the low camera relative to deformed actors and projects the face too', () => {
  for (const camera of ['低い位置から見上げる中景', 'low-angle medium shot', '床近くから見上げる引き']) {
    const shot = getPanelShotExecution(camera);
    assert.match(shot, /camera below faces including crouched\/chibi/);
    assert.match(shot, /facial planes.*body.*setting.*projection/);
    assert.match(shot, /not frontal faces on a tilted background/);
    assert.doesNotMatch(shot, /head-to-feet|BOTH shoes|half the panel height/);
  }
  const horizontal = getPanelShotExecution('低い位置から水平に撮る中景');
  assert.match(horizontal, /horizontal aim/);
  assert.doesNotMatch(horizontal, /look up|chin\/jaw undersides/);
  assert.doesNotMatch(getPanelShotExecution('目の高さ、正面、顔のアップ'), /below faces|look up/);
});

test('initial scenario and both image paths reserve room for body acting without fixed actor scale', () => {
  const direction = buildNormalScenarioPrompt();
  assert.match(direction, /身体が入る範囲/);
  assert.match(direction, /仰角.*顔.*身体.*背景/);
  assert.doesNotMatch(direction, /コマ高の半分/);
  const directed = FOUR_PANEL_SCENARIO.replace('[Camera: ローアングル]', '[Camera: 膝の高さから見上げる引き、人物の頭から膝まで、手前の人物を大きく]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario: directed, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    assert.match(prompt, /手前の人物を大きく/);
    assert.match(prompt, /body action.*panel height/);
    assert.match(prompt, /readability never changes shot scale or elevation/);
    assert.doesNotMatch(prompt, /half the panel height/);
    assert.match(prompt, /The deadline moved forward/);
  }
});

test('explicit floor-level upward shots retain floor height instead of the generic low-angle branch', () => {
  for (const camera of ['床近く、斜めに見上げるワイドショット', 'ground-level low-angle close-up']) {
    const result = getPanelShotExecution(camera);
    assert.match(result, /floor-level camera below faces/);
    assert.match(result, /prop undersides/);
    assert.doesNotMatch(result, /head-to-feet/);
  }
  assert.doesNotMatch(getPanelShotExecution('胸の高さから見上げる顔のアップ'), /floor-level/);
  assert.match(getPanelShotExecution('床近くから水平に撮る'), /horizontal aim/);
});

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({
    getPanelCompositionAssist,
    getPanelShotExecution,
    MANGA_COMPOSITION_VARIETY_LOCK,
    MANGA_COMPOSITION_VARIETY_LOCK_COMPACT,
    MANGA_GESTURE_VARIETY_LOCK,
  } = await server.ssrLoadModule('/src/lib/composition-variety.js'));
  ({ cinematicCompositionMap } = await server.ssrLoadModule('/src/lib/constants.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## SpeakerA
- short dark hair, no glasses
## SpeakerB
- long light hair, glasses
`;

const FOUR_PANEL_SCENARIO = `
## Title: Deadline Meeting
Location: editorial room
Outfit: office casual

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: Over The Shoulder]
Action: SpeakerA shows a marked-up page to SpeakerB.
SpeakerA「Please check this revision.」

[2コマ目: 承]
[EMOTION: IMPACT]
[Camera: ローアングル]
Action: SpeakerB stands and presses a document onto the table with both hands.
SpeakerB「The deadline moved forward.」

[3コマ目: 転]
[EMOTION: NORMAL]
[Camera: 俯瞰]
Action: SpeakerA compares two pages while SpeakerB points at the schedule.
SpeakerA「We need another plan.」

[4コマ目: 結]
[EMOTION: CHIBI_GAG]
[Camera: ダッチアングル]
Action: SpeakerB drops into a chair while SpeakerA gathers the pages.
SpeakerB「Then we start now.」
`;

const buildFinalPrompt = (providerFamily) => buildMangaPrompt({
  scenario: FOUR_PANEL_SCENARIO,
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily,
  punchlineType: 'Auto',
  systemVersion: 'v5.2.7-test'
});

const buildNormalScenarioPrompt = () => getScenarioPrompt({
  randomCategory: 'workplace',
  targetDate: '2026-08-10',
  inputMode: 'manual',
  manualTopic: 'An editorial team discovers that the deadline moved forward.',
  newsContext: '',
  searchTopicKeywords: '',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'standard',
  styleJson: null
});

test('STEP2 plans a page of motivated contrasting shots across independent camera axes', () => {
  const prompt = buildNormalScenarioPrompt();
  assert.match(prompt, /4コマ全体.*比較/);
  assert.match(prompt, /アオリ.*反復.*見せ場/);
  assert.match(prompt, /魚眼.*曲線|曲線.*魚眼/);
  assert.match(prompt, /ダッチ.*ロール|ロール.*ダッチ/);
  assert.match(prompt, /各コマ.*役割.*Camera/);
  assert.match(prompt, /寄り・中景・引き/);
  assert.match(prompt, /全員の足先.*必須にしない/);
  assert.match(prompt, /寄りだけ.*意図/);
});

test('a pullback reveals setting and distances without imposing feet or confusing a wide lens with framing', () => {
  const wide = getPanelShotExecution('目の高さから引きの全景、人物を小さく配置');
  assert.match(wide, /continuous setting.*actor distances/);
  assert.match(wide, /wide framing/);
  assert.match(wide, /not a bust portrait/);
  assert.doesNotMatch(wide, /BOTH shoes|head-to-feet|look up/);
  assert.doesNotMatch(getPanelShotExecution('wide-angle close-up on a face'), /continuous setting/);
  assert.match(getPanelShotExecution('左前斜め上方から少し引いた広角'), /receding actors smaller/);
});

test('Japanese Dutch and fisheye specify observable separate projection cues', () => {
  assert.match(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /tilt scene axes/);
  assert.match(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /compressed depth/);
  assert.doesNotMatch(getPanelShotExecution('目の高さで右側面、望遠、ダッチアングル'), /look up|look down/);
  assert.match(getPanelShotExecution('真上から魚眼レンズで見下ろす全景'), /curved.*edges/);
  assert.doesNotMatch(getPanelShotExecution('真上から広角で見下ろす全景'), /curved.*edges/);
});

test('STEP2 designs continuous relational staging instead of directing every listener toward one speaker', () => {
  const prompt = buildNormalScenarioPrompt();
  assert.match(prompt, /前のコマ.*次のコマ|直前の動作.*次のコマ/u);
  assert.match(prompt, /前景.*中景.*後景|奥行き.*位置関係/u);
  assert.match(prompt, /働きかけ.*受け手.*反応|相手の行動.*次の動作/u);
  assert.match(prompt, /異なる.*視線.*反応|視線.*演技.*描き分け/u);
  assert.doesNotMatch(prompt, /無言のリアクション役も現在の話者を見る/u);
});

test('panel composition helper preserves explicit azimuth and fills missing horizontal direction', () => {
  assert.match(
    getPanelCompositionAssist('[Camera: Over The Shoulder]', 1),
    /PRESERVE EXPLICIT AZIMUTH/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: ローアングル]', 2),
    /RIGHT-FRONT OBLIQUE/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: 俯瞰]', 3),
    /REAR THREE-QUARTER/i
  );
  assert.match(
    getPanelCompositionAssist('[Camera: ダッチアングル]', 4),
    /DIAGONAL LEFT-FRONT/i
  );
  assert.match(
    getPanelCompositionAssist(
      '[Camera: ローアングル気味のパース — テーブル越しに人物が立ち上がる勢いと書類の動きが強調される構図。]',
      2
    ),
    /RIGHT-FRONT OBLIQUE/i
  );
});

test('actor hand directions are not mistaken for a specified camera azimuth', () => {
  assert.match(getPanelCompositionAssist('[Camera: 俯瞰]\n状況: SpeakerAが右手を上げる。', 2), /RIGHT-FRONT OBLIQUE/);
  assert.match(getPanelCompositionAssist('[Camera: 左前斜めから撮る]\n状況: SpeakerAが右手を上げる。', 2), /PRESERVE EXPLICIT AZIMUTH/);
});

test('diagonal camera instructions project visible near and far planes without overriding a frontal shot', () => {
  const oblique = getPanelShotExecution('書棚の低い位置から斜めに見上げる広角の中景');
  assert.match(oblique, /look up/i);
  assert.match(oblique, /near\/far.*body.*planes/i);
  assert.match(oblique, /receding setting edges\/floor planes/i);
  assert.doesNotMatch(oblique, /shelf/i);
  assert.match(oblique, /not a flat frontal lineup/i);

  const frontal = getPanelShotExecution('正面から斜めに見上げる固定ショット');
  assert.match(frontal, /look up/i);
  assert.doesNotMatch(frontal, /not a flat frontal lineup/i);

  const plain = getPanelShotExecution('低い位置から見上げる中景');
  assert.doesNotMatch(plain, /not a flat frontal lineup/i);
  assert.doesNotMatch(getPanelShotExecution('正面のダッチアングルで斜めに傾ける'), /not a flat frontal lineup/i);
});

test('a low-position ultra-wide camera stays physically below faces without inventing a full-body crop', () => {
  const shot = getPanelShotExecution('低所からの超広角。主役を手前、仲間を奥へ置く。');
  assert.match(shot, /low camera below faces/i);
  assert.match(shot, /prop undersides from below/i);
  assert.match(shot, /near\/far scale contrast/i);
  assert.doesNotMatch(shot, /head-to-feet|both shoes/i);

  const levelShot = getPanelShotExecution('低所から水平に撮る中景');
  assert.match(levelShot, /keep horizontal aim and a low horizon/i);
  assert.doesNotMatch(levelShot, /prop undersides from below/i);
});

test('relative low camera height is preserved without being rewritten to floor level', () => {
  const relative = getPanelShotExecution('左前斜めからの胸より低い位置、中景の広角');
  assert.match(relative, /low camera below faces/);
  assert.doesNotMatch(relative, /floor-level/);
  assert.match(getPanelShotExecution('床すれすれからの広角'), /floor-level camera below faces/);
  assert.doesNotMatch(getPanelShotExecution('正面の目の高さから撮る中景'), /low camera|floor-level|look up/);
});

test('explicit full-body framing outranks a nearby-view phrase without forcing full bodies on closeups', () => {
  for (const camera of [
    '床近くから見上げる全身寄りの構図。頭から足先まで入れる。',
    'full-body shot, camera zooms in to frame head to feet',
  ]) {
    const shot = getPanelShotExecution(camera);
    assert.match(shot, /head-to-feet inside panel/);
    assert.doesNotMatch(shot, /tight crop/);
  }
  const closeup = getPanelShotExecution('低い位置から見上げる顔の寄りの構図');
  assert.match(closeup, /tight crop/);
  assert.doesNotMatch(closeup, /head-to-feet|BOTH shoes/);
});

test('relative Japanese elevations project actor faces and setting together without a lens or crop override', () => {
  const low = getPanelShotExecution('左前の低めの位置から望遠の中景');
  assert.match(low, /low camera below faces/);
  assert.match(low, /chin\/jaw undersides/);
  assert.match(low, /body and setting share.*projection/);
  assert.match(low, /compressed depth/);
  assert.doesNotMatch(low, /floor-level|head-to-feet|near\/far scale contrast/);
  const high = getPanelShotExecution('右後方の高めの位置から広角で撮る');
  assert.match(high, /look down/);
  assert.match(high, /head\/shoulder tops/);
  assert.match(high, /actors and setting share.*projection/);
  const level = getPanelShotExecution('正面アイレベルで静止した対面ショット');
  assert.doesNotMatch(level, /look down|look up|below faces/);
});

test('an unnamed diagonal camera side receives a concrete azimuth while named sides stay fixed', () => {
  for (const compact of [false, true]) {
    const assisted = getPanelCompositionAssist('[Camera: 低い位置から斜めに見上げる中景]', 2, { compact });
    assert.match(assisted, /RIGHT-FRONT OBLIQUE/i);
    assert.match(assisted, /near\/far shoulder.*setting edges/i);
    assert.doesNotMatch(assisted, /near hand larger/i);
    assert.match(getPanelCompositionAssist('[Camera: 斜め上から見下ろす広角]', 3, { compact }), /REAR THREE-QUARTER/i);
    assert.match(getPanelCompositionAssist('[Camera: 左前斜めから見上げる中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
    assert.match(getPanelCompositionAssist('[Camera: 正面から斜めに見上げる中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
    assert.match(getPanelCompositionAssist('[Camera: 斜め後ろから見る中景]', 2, { compact }), /PRESERVE EXPLICIT AZIMUTH/i);
  }
  const scenario = FOUR_PANEL_SCENARIO.replace('[Camera: ローアングル]', '[Camera: 低い位置から斜めに見上げる中景]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode: 'color' });
    const panel2 = prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)?.[0] || '';
    assert.match(panel2, /COMPOSITION STAGING: RIGHT-FRONT OBLIQUE/i);
  }
});

test('normal STEP2 generation keeps expressive direction without numeric variety quotas', () => {
  const prompt = buildNormalScenarioPrompt();

  assert.doesNotMatch(prompt, /真正面は最大1コマ|アイレベル.*原則禁止|最低3種類/);
  assert.match(prompt, /種類数.*ノルマ/);
  assert.match(prompt, /被写体に対する水平方位/);
  assert.match(prompt, /肩・腰・顔/);
  assert.match(prompt, /両手.*前後差/);
  assert.match(prompt, /参照画像.*ポーズ.*同一性資料/);
  assert.match(prompt, /物語の因果/);
  assert.match(prompt, /回数制限しない/);
  assert.match(prompt, /全身の誇張/);
});

test('strong perspective is reserved for a story beat and does not default to a foot thrust', () => {
  const scenarioPrompt = buildNormalScenarioPrompt();

  assert.match(scenarioPrompt, /足だけを手前へ大きく突き出す構図を既定にしない/);
  assert.match(scenarioPrompt, /手・顔・重要な小道具・環境の奥行き/);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /foot thrust/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /story-relevant focal form/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /story-relevant focal form/i);
    assert.match(prompt, /foot thrust/i);
  }
});

test('hyper perspective does not encode the stock lens-facing hand pose', () => {
  const hyper = cinematicCompositionMap['Hyper Perspective'];

  assert.doesNotMatch(hyper, /reaching towards viewer|dynamic hand gesture/i);
  assert.match(hyper, /story-action depth axis/i);
  assert.match(hyper, /asymmetrical body axis/i);
});

test('scenario and final prompts vary the full camera signature and bind hands to story targets', () => {
  const scenarioPrompt = buildNormalScenarioPrompt();

  assert.doesNotMatch(scenarioPrompt, /手前に大きく顔があるキャラ.*奥で小さく驚くキャラ/);
  assert.match(scenarioPrompt, /撮影位置・水平方位・距離・レンズ感・被写体配置・奥行きの作り方/);
  assert.match(scenarioPrompt, /手のひら.*レンズ|レンズ.*手のひら/);
  assert.match(scenarioPrompt, /実際の接触対象/);

  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /CAMERA SIGNATURE/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /elevation.*azimuth.*framing.*lens.*blocking.*depth/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /explicit repeated/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK_COMPACT, /scripted front\/back\/left\/right camera side, crop and lens/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK_COMPACT, /explicit frontal or repeated shots/i);
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /LENS-FACING HAND/i);
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /actual person, prop or surface/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /MANGA CAMERA \/ POSE VARIETY LOCK/i);
    assert.match(prompt, /LENS-FACING HAND/i);
    assert.match(prompt, /actual person, prop or surface/i);
  }
});

test('an explicitly scripted lens-facing gesture remains verbatim', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace(
    'Action: SpeakerB stands and presses a document onto the table with both hands.',
    'Action: SpeakerB turns to an in-story camera and opens her right palm directly toward its lens.',
  );

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.2.7-test',
    });
    assert.match(prompt, /opens her right palm directly toward its lens/i);
  }
});

test('both final-prompt families retain the page lock and four panel staging assists', () => {
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /no numeric variety quota/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /quiet.*repeated/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /MANGA CAMERA \/ POSE VARIETY LOCK/);
    assert.equal((prompt.match(/COMPOSITION STAGING:/g) || []).length, 4);
    assert.match(prompt, /RIGHT-FRONT OBLIQUE/);
    assert.match(prompt, /story-relevant focal form/i);
    assert.match(prompt, /BODY ACTING \/ GESTURE VARIETY LOCK/);
    assert.doesNotMatch(prompt, /NO default eye-level shot|>=3 azimuths|max 1.*front-on/i);
    assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
    assert.match(prompt, /full-body (?:exaggeration|acting)/);
    assert.match(prompt, /preserve.*explicitly scripted.*pointing.*surface impact/i);
    assert.match(prompt, /action phase.*support.*contact/i);
  }
});

test('explicit frontal composition is not replaced by a diagonal default', () => {
  for (const camera of ['正面の固定ショット', 'front-on fixed shot', 'frontal view']) {
    for (const compact of [false, true]) {
      const assist = getPanelCompositionAssist(`[Camera: ${camera}]`, 1, { compact });
      assert.match(assist, /PRESERVE EXPLICIT AZIMUTH/);
      assert.doesNotMatch(assist, /diagonal|asymmetric|35-55|30-60/i);
    }
  }
});

test('repeated frontal shots keep their staging through both provider and medium paths', () => {
  const scenario = FOUR_PANEL_SCENARIO.replace(/\[Camera:[^\]]+\]/g, '[Camera: 正面の固定ショット]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST, providerFamily, colorMode, cinematicTechniques: false });
      const staging = prompt.match(/^COMPOSITION STAGING:.*$/gm) || [];
      assert.equal(staging.length, 4);
      for (const line of staging) {
        assert.match(line, /PRESERVE EXPLICIT AZIMUTH/);
        assert.doesNotMatch(line, /diagonal|asymmetric|35-55|30-60/i);
      }
      assert.equal((prompt.match(/^Camera: 正面の固定ショット/gm) || []).length, 4);
    }
  }
});
