import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let getPanelCompositionAssist;
let MANGA_COMPOSITION_VARIETY_LOCK;
let MANGA_COMPOSITION_VARIETY_LOCK_COMPACT;
let MANGA_GESTURE_VARIETY_LOCK;
let cinematicCompositionMap;

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

  for (const lock of [MANGA_COMPOSITION_VARIETY_LOCK, MANGA_COMPOSITION_VARIETY_LOCK_COMPACT]) {
    assert.match(lock, /CAMERA SIGNATURE/i);
    assert.match(lock, /elevation.*azimuth.*framing.*lens.*blocking.*depth/i);
    assert.match(lock, /explicit repeated/i);
  }
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /LENS-FACING HAND/i);
  assert.match(MANGA_GESTURE_VARIETY_LOCK, /actual person, prop or surface/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /CAMERA SIGNATURE/i);
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
    assert.match(prompt, /stagger.*hands.*depth/i);
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
