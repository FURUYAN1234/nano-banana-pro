import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let getScenarioPrompt;
let buildScenarioEnhancementPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildScenarioEnhancementPrompt } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
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

test('scenario generation preserves meaningful silence and avoids an action quota', () => {
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

  assert.match(prompt, /人物の行動・反応・間・構図/);
  assert.match(prompt, /静止や沈黙がオチ、余韻、緊張に効く場合は保つ/);
  assert.doesNotMatch(prompt, /別々の物理アクション|最低2コマ/);
});

test('both image providers preserve scripted action without adding hands', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: ACTIVE_ENSEMBLE_SCENARIO,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Documentary',
      systemVersion: 'v5.1.0-test'
    });

    assert.match(prompt, /FINAL-PANEL STORY STAGING/);
    assert.match(prompt, /Keep intentional stillness and silence/);
    assert.match(prompt, /Do not invent extra hand actions/);
    assert.doesNotMatch(prompt, /distinct physical action/i);
  }
});

test('scenario enhancement prompt allows story-led final blocking', () => {
  const prompt = buildScenarioEnhancementPrompt({
    scenario: ACTIVE_ENSEMBLE_SCENARIO,
    selectedCategories: ['body', 'gag']
  });

  assert.match(prompt, /人物の行動・反応・間・構図/);
  assert.match(prompt, /静止や沈黙がオチ、余韻、緊張に効く場合は保つ/);
});
