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
    providerFamily: 'chatgpt',
    punchlineType: 'Documentary',
    systemVersion: 'v4.7.9'
  });

  assert.match(
    prompt,
    /Top title EXACTLY "白黒ポテチ袋創作ブーム!\?"/
  );
  assert.doesNotMatch(
    prompt,
    /Top title EXACTLY "白黒ポテチ袋創作ブーム"/
  );
});

test('plain or Markdown scenario title labels are metadata, never printed in the manga title', () => {
  for (const heading of ['タイトル: 書店の勘違い', 'タイトル：書店の勘違い', '## タイトル: 書店の勘違い', 'Title: 書店の勘違い']) {
    const prompt = buildMangaPrompt({
      scenario: `${heading}\nLocation: 書店\n[1コマ目: 起]\nアカリ「見つけた！」\n[2コマ目: 承]\nヒカリ「何を？」\n[3コマ目: 転]\nサエコ「本よ。」\n[4コマ目: 結]\nアカリ「やった！」`,
      castList: CAST_LIST, colorMode: 'color', providerFamily: 'chatgpt', systemVersion: 'v6.6.8',
    });
    assert.match(prompt, /Top title EXACTLY "書店の勘違い"/);
    assert.doesNotMatch(prompt, /Top title EXACTLY "(?:タイトル|Title)[:：]/);
    assert.match(prompt, /- Title: 書店の勘違い/);
  }
});

test('preserves terminal title punctuation in Gemini prompt title', () => {
  const prompt = buildMangaPrompt({
    scenario: SCENARIO_WITH_PUNCTUATED_TITLE,
    castList: CAST_LIST,
    colorMode: 'color',
    providerFamily: 'gemini',
    punchlineType: 'Documentary',
    systemVersion: 'v4.7.9'
  });

  assert.match(prompt, /Top page: draw large black Japanese text title: "白黒ポテチ袋創作ブーム!\?"/);
  assert.doesNotMatch(prompt, /NO quotes\/punctuation around title/);
});
