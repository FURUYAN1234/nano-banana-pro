import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
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

const incompleteScenario = `## タイトル: 検証警告
Logline: 4人が静かな作業を続ける。
Location: 明るい編集室
Outfit: 私服
Punchline: ドキュメンタリー

[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: medium shot]
状況: アカリが資料を机に置く。
アカリ「始めよう。」

[2コマ目: 承]
[EMOTION: NORMAL]
[Camera: close up]
状況: ヒカリが資料を読む。
ヒカリ「確認するね。」

[4コマ目: 結]
[EMOTION: NORMAL]
[Camera: medium shot]
状況: サエコが資料を閉じる。
サエコ「これで終わり。」`;

const promptArgs = {
  scenario: incompleteScenario,
  castList: '## アカリ\n- adult woman\n## ヒカリ\n- adult woman',
  colorMode: 'color',
  providerFamily: 'chatgpt',
  punchlineType: 'Documentary',
  systemVersion: 'test'
};

test('prompt assembly permits a quality warning only when the workflow explicitly opts in', () => {
  assert.throws(
    () => buildMangaPrompt(promptArgs),
    /Incomplete 4-koma scenario/
  );

  const prompt = buildMangaPrompt({
    ...promptArgs,
    allowScenarioQualityWarning: true
  });

  assert.match(prompt, /アカリ「始めよう。/);
  assert.match(prompt, /サエコ「これで終わり。/);
});

test('prompt assembly never opts into a missing speech-bubble contract', () => {
  const dialogueMissingScenario = incompleteScenario.replace(
    '[4コマ目: 結]',
    '[3コマ目: 転]\n状況: ミクが窓を見て「嫌な予感…！」とつぶやく。\n\n[4コマ目: 結]'
  );

  assert.throws(
    () => buildMangaPrompt({
      ...promptArgs,
      scenario: dialogueMissingScenario,
      allowScenarioQualityWarning: true
    }),
    /Incomplete 4-koma scenario/
  );
});
