import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getScenarioPrompt;
let buildScenarioEnhancementPrompt;
let buildMangaPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
  ({ buildScenarioEnhancementPrompt } = await server.ssrLoadModule('/src/lib/scenario-enhancement.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

after(async () => {
  await server?.close();
});

const scenario = `## タイトル: 改札前の勘違い
Location: 駅の改札前
Outfit: 普段着
Punchline: Auto

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: 対面ツーショット]
状況: ミクが切符を持ち、リンへ声をかける。
ミク「この電車だよ。」

[2コマ目: 承]
[EMOTION: SURPRISE]
[Camera: 肩越し]
状況: リンが時刻表を見直す。
リン「逆方向じゃない？」

[3コマ目: 転]
[EMOTION: SHADOW]
[Camera: ミディアムショット]
状況: ミクが切符と案内板を見比べる。
ミク「ほんとだ。」

[4コマ目: 結]
[EMOTION: CHIBI_GAG]
[Camera: ワイドショット]
状況: 二人が反対ホームへ走り出す。
リン「まだ間に合う！」`;

const buildBaseScenarioPrompt = () => getScenarioPrompt({
  randomCategory: '地域ニュース',
  targetDate: '2026-09-05',
  inputMode: 'manual',
  manualTopic: '駅の改札前で行き先を間違える二人',
  newsContext: '',
  searchTopicKeywords: '地域ニュース',
  bg360Image: null,
  bg360Analysis: null,
  bg360Enabled: false,
  customLocation: '',
  customOutfit: '',
  locationPlan: {
    mode: 'custom',
    anchorName: '駅の改札前',
    guidance: '指定場所「駅の改札前」を使用すること。'
  },
  ragReactions: '',
  punchlineType: 'Auto',
  comedyTone: 'HighTension',
  styleJson: null
});

test('STEP2 decomposes readable facial acting into physical cues instead of tag soup', () => {
  const prompt = buildBaseScenarioPrompt();

  assert.match(prompt, /顔の演技設計/);
  assert.match(prompt, /眉/);
  assert.match(prompt, /まぶた/);
  assert.match(prompt, /視線の相手/);
  assert.match(prompt, /口の形/);
  assert.match(prompt, /頭.*胴体|胴体.*頭/s);
  assert.match(prompt, /タグの羅列/);
  assert.match(prompt, /寄り|クローズアップ/);
  assert.match(prompt, /カメラ.*壊さない|カメラ.*優先/s);
});

test('expression enhancement receives the facial-acting contract without leaking into dialogue-only edits', () => {
  const expressionPrompt = buildScenarioEnhancementPrompt({
    scenario,
    selectedCategories: ['expressions']
  });
  const dialoguePrompt = buildScenarioEnhancementPrompt({
    scenario,
    selectedCategories: ['dialogue']
  });

  assert.match(expressionPrompt, /顔の演技設計/);
  assert.match(expressionPrompt, /眉/);
  assert.match(expressionPrompt, /まぶた/);
  assert.match(expressionPrompt, /視線の相手/);
  assert.match(expressionPrompt, /口の形/);
  assert.doesNotMatch(dialoguePrompt, /顔の演技設計/);
});

test('both four-panel provider prompts render physical facial cues without overriding staging', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: '- Character [ミク]: young adult, black hair\n- Character [リン]: young adult, brown hair',
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.8.1-test'
    });

    assert.match(prompt, /FACIAL ACTING LOCK/);
    assert.match(prompt, /brow/i);
    assert.match(prompt, /eyelid/i);
    assert.match(prompt, /gaze target/i);
    assert.match(prompt, /mouth shape/i);
    assert.match(prompt, /head.*torso|torso.*head/is);
    assert.match(prompt, /do not force.*close-up|never force.*close-up/is);
    assert.match(prompt, /preserve.*camera.*action.*eye-line/is);
    assert.match(prompt, /not visible text|never print/is);
  }
});

test('README explains the bounded facial-acting behavior and its model-output limit', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

  assert.match(readme, /顔演技|表情設計/);
  assert.match(readme, /眉/);
  assert.match(readme, /まぶた/);
  assert.match(readme, /視線/);
  assert.match(readme, /口/);
  assert.match(readme, /保証しません|依存します/);
});
