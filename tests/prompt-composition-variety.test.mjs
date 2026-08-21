import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let getPanelCompositionAssist;
let MANGA_COMPOSITION_VARIETY_LOCK;

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
    MANGA_COMPOSITION_VARIETY_LOCK
  } = await server.ssrLoadModule('/src/lib/composition-variety.js'));
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

test('normal STEP2 generation requires horizontal camera and pose variety by default', () => {
  const prompt = buildNormalScenarioPrompt();

  assert.match(prompt, /真正面は最大1コマ/);
  assert.match(prompt, /アイレベル.*原則禁止/);
  assert.match(prompt, /被写体に対する水平方位/);
  assert.match(prompt, /肩・腰・顔/);
  assert.match(prompt, /両手.*前後差/);
  assert.match(prompt, /参照画像.*ポーズ.*同一性資料/);
  assert.match(prompt, /最低3種類.*身体演技/);
  assert.match(prompt, /前方伸展ジェスチャー.*最大1コマ/);
  assert.match(prompt, /指し示す.*支持面を叩く.*物語上必要/);
});

test('both final-prompt families retain the page lock and four panel staging assists', () => {
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /no more than one flat front-on panel/i);
  assert.match(MANGA_COMPOSITION_VARIETY_LOCK, /at least three distinct subject-relative azimuths/i);

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildFinalPrompt(providerFamily);
    assert.match(prompt, /MANGA CAMERA \/ POSE VARIETY LOCK/);
    assert.equal((prompt.match(/COMPOSITION STAGING:/g) || []).length, 4);
    assert.match(prompt, /RIGHT-FRONT OBLIQUE/);
    assert.match(prompt, /stagger.*hands.*depth/i);
    assert.match(prompt, /BODY ACTING \/ GESTURE VARIETY LOCK/);
    assert.match(prompt, /NO default eye-level shot/i);
    assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
    assert.match(prompt, /same forward-extension gesture family.*no more than one panel/i);
    assert.match(prompt, /preserve.*explicitly scripted.*pointing.*surface impact/i);
    assert.match(prompt, /action phase.*support.*contact/i);
  }
});
