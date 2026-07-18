import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

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
## 1. ミク
- blonde hair, no glasses
## 2. リン
- brown twin tails, glasses
## 3. サエコ
- long black hair, no glasses
`;

const makeScenario = (panelTwoAction) => `
## タイトル: 手の動作テスト
Location: 自宅リビング
Outfit: カジュアルな私服

[1コマ目: 起]
[EMOTION: NORMAL]
状況: ミクがノートPCを開く。
ミク「読んでみよう。」

[2コマ目: 承]
[EMOTION: MAXIMUM FRUSTRATION]
状況: ${panelTwoAction}
リン「どこに×あるの。」

[3コマ目: 転]
[EMOTION: NORMAL]
状況: サエコがスマホを見る。
サエコ「難しいね。」

[4コマ目: 結]
[EMOTION: NORMAL]
状況: 三人が休憩する。
ミク「休もう。」`;

const buildPrompt = (providerFamily, panelTwoAction) => buildMangaPrompt({
  scenario: makeScenario(panelTwoAction),
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily,
  punchlineType: 'Auto',
  systemVersion: 'v4.9.0-test'
});

const panelTwoSection = (prompt) =>
  prompt.match(/## Panel 2[\s\S]*?(?=## Panel 3)/)?.[0] || '';

test('same-character two-hand occupation plus pointing is normalized to a two-hand allocation', () => {
  const action = 'ミクは両手でケーキ皿を持ち、リンは両手で頭を抱え、目を血走らせて画面を指差し、サエコは腕を組む。';

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, action));

    assert.match(panel, /ミクは両手でケーキ皿を持ち/);
    assert.doesNotMatch(panel, /リンは両手で頭を抱え[^。\n]*指差/);
    assert.match(panel, /リンは片手で頭を抱え/);
    assert.match(panel, /HAND ALLOCATION LOCK:.*exactly two hands total/);
  }
});

test('two-hand action is preserved when a different character performs the pointing', () => {
  const action = 'ミクは両手でケーキ皿を持ち、リンは画面を指差し、サエコは腕を組む。';
  const panel = panelTwoSection(buildPrompt('chatgpt', action));

  assert.match(panel, /ミクは両手でケーキ皿を持ち/);
  assert.doesNotMatch(panel, /HAND ALLOCATION LOCK:/);
});

test('two-hand prop actions lock both hands, arms, and the prop to their owner in depth shots', () => {
  const action = 'ミクが原稿を指で連打し、リンは資料を両手で豪快に閉じ、ヒカリはカップを置く。';

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(providerFamily, action));

    assert.match(panel, /リンは資料を両手で豪快に閉じ/);
    assert.match(panel, /PROP-HAND OWNERSHIP LOCK:.*exactly two arms and two hands/);
    assert.match(panel, /both continuously connected to that character's shoulders/);
    assert.match(panel, /never emerge from behind their back/);
  }
});
