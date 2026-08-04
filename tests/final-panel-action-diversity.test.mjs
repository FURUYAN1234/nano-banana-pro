import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let assertActiveFinalPanelStaging;
let buildMangaPrompt;
let getScenarioPrompt;
let buildScenarioEnhancementPrompt;
let validateScenarioEnhancement;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ assertActiveFinalPanelStaging } = await server.ssrLoadModule('/src/lib/final-panel-staging.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildScenarioEnhancementPrompt, validateScenarioEnhancement } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## ミク
- blonde hair
## リン
- brown twin tails, glasses
## サエコ
- long black hair
## アカリ
- orange bob hair
## ヒカリ
- short blonde hair, glasses
`;

const PASSIVE_TABLEAU_SCENARIO = `
## タイトル: 寄付のお知らせ!?
Location: 工場前の掲示板
Punchline: ドキュメンタリー (原文忠実)

[1コマ目: 起]
状況: ミクが掲示を読む。
ミク「寄付したんだね。」
[2コマ目: 承]
状況: リンが金額を指差す。
リン「大きな会社だね。」
[3コマ目: 転]
状況: サエコが復旧状況を確認する。
サエコ「復旧が早いね。」
[4コマ目: 結]
状況: アカリが募金箱の前で拳を握って立つ。ほかの四人は背景に横一列で並び、無言で見守っている。
アカリ「私にできること、何かあるかな。」
`;

const ACTIVE_ENSEMBLE_SCENARIO = PASSIVE_TABLEAU_SCENARIO.replace(
  'アカリが募金箱の前で拳を握って立つ。ほかの四人は背景に横一列で並び、無言で見守っている。',
  'アカリが募金箱へ封筒を入れる。同時にミクは掲示の端を貼り直し、リンは募金に来た人へ入口を示す。サエコとヒカリは別々の奥行きで募金用紙を配る。'
);

test('rejects a multi-character final-panel lineup even when the lead makes a small pose', () => {
  assert.throws(
    () => assertActiveFinalPanelStaging({ scenario: PASSIVE_TABLEAU_SCENARIO, punchlineType: 'Documentary' }),
    /passive_final_tableau/
  );
});

test('accepts a final panel where supporting cast perform distinct story actions across depth', () => {
  assert.equal(
    assertActiveFinalPanelStaging({ scenario: ACTIVE_ENSEMBLE_SCENARIO, punchlineType: 'Documentary' }),
    true
  );
});

test('allows an explicitly selected surreal silent ending', () => {
  assert.equal(
    assertActiveFinalPanelStaging({ scenario: PASSIVE_TABLEAU_SCENARIO, punchlineType: 'Surreal' }),
    true
  );
});

test('scenario generation contract requires active final-panel blocking instead of a passive audience', () => {
  const prompt = getScenarioPrompt({
    randomCategory: '企業ニュース',
    targetDate: '2026-08-04',
    inputMode: 'manual',
    manualTopic: '企業が地震被災地へ寄付した。',
    newsContext: '',
    searchTopicKeywords: '',
    bg360Image: null,
    bg360Analysis: null,
    bg360Enabled: false,
    customLocation: '',
    customOutfit: '',
    ragReactions: '',
    punchlineType: 'Documentary',
    comedyTone: 'IntellectualBlack',
    styleJson: null
  });

  assert.match(prompt, /4コマ目の静止集合オチ抑制/);
  assert.match(prompt, /横一列|棒立ち/);
  assert.match(prompt, /別々の物理アクション/);
});

test('both image providers receive the same final-panel active-staging lock', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: ACTIVE_ENSEMBLE_SCENARIO,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Documentary',
      systemVersion: 'v5.1.0-test'
    });

    assert.match(prompt, /FINAL-PANEL ACTIVE STAGING LOCK/);
    assert.match(prompt, /straight-line lineup/i);
    assert.match(prompt, /distinct physical action/i);
    assert.match(prompt, /faces, silhouettes, and hands readable/i);
  }
});

test('scenario enhancement cannot introduce a passive final-panel lineup', () => {
  const validation = validateScenarioEnhancement({
    originalScenario: ACTIVE_ENSEMBLE_SCENARIO,
    candidateScenario: PASSIVE_TABLEAU_SCENARIO,
    selectedCategories: ['body', 'gag']
  });

  assert.equal(validation.ok, false);
  assert.ok(validation.issueCodes.includes('passive_final_tableau'));
});

test('scenario enhancement prompt keeps active final blocking during strengthening', () => {
  const prompt = buildScenarioEnhancementPrompt({
    scenario: ACTIVE_ENSEMBLE_SCENARIO,
    selectedCategories: ['body', 'gag']
  });

  assert.match(prompt, /4コマ目の静止集合オチ抑制/);
  assert.match(prompt, /横一列|棒立ち/);
});
