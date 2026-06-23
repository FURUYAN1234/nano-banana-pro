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
## ミク
- blonde hair
## リン
- brown hair
## サエコ
- black hair
## アカリ
- orange hair
## ヒカリ
- blonde hair
`;

const SCENARIO_WITH_PUNCTUATED_TITLE = `
## タイトル: 白黒ポテチ袋創作ブーム !?
Location: 大型ディスカウントスーパー
Outfit: カジュアルな私服

[1コマ目: 起]
ミク「え、ポテチって白黒だったっけ！？」

[2コマ目: 承]
リン「これ、絵を描くためにあるの！？」

[3コマ目: 転]
アカリ「私、カロリーゼロのポテチ描いた！」

[4コマ目: 結]
状況: 奥から謎のAI推進派おじさんが乱入、「全部AIで自動生成できるのにー！」と絶叫。
全員「お前のせいだー！！」
`;

test('preserves terminal title punctuation in ChatGPT prompt title', () => {
  const prompt = buildMangaPrompt({
    scenario: SCENARIO_WITH_PUNCTUATED_TITLE,
    castList: CAST_LIST,
    colorMode: 'color',
    enableChatGPTMode: true,
    punchlineType: 'Documentary',
    systemVersion: 'v4.7.9'
  });

  assert.match(
    prompt,
    /Top page: draw large bold black Japanese text that reads exactly "白黒ポテチ袋創作ブーム!\?"/
  );
  assert.doesNotMatch(
    prompt,
    /Top page: draw large bold black Japanese text that reads exactly "白黒ポテチ袋創作ブーム"/
  );
});

test('preserves terminal title punctuation in Gemini prompt title', () => {
  const prompt = buildMangaPrompt({
    scenario: SCENARIO_WITH_PUNCTUATED_TITLE,
    castList: CAST_LIST,
    colorMode: 'color',
    enableChatGPTMode: false,
    punchlineType: 'Documentary',
    systemVersion: 'v4.7.9'
  });

  assert.match(prompt, /Top page: draw large bold black Japanese text title: "白黒ポテチ袋創作ブーム!\?"/);
  assert.doesNotMatch(prompt, /NO quotes\/punctuation around title/);
});
