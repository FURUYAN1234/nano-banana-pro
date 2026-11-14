import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let extractScenarioTitle;
let native;
let applyPageComposition;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt, extractScenarioTitle } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  ({ applyPageComposition } = await server.ssrLoadModule('/src/lib/manga-page-composition.js'));
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

test('title fallback preserves authored titles but never prints scenario control data', () => {
  for (const label of ['Title', 'タイトル', 'Topic']) {
    assert.equal(extractScenarioTitle(`PageComposition: {}\n${label}: 書店の朝 !?\n[1コマ目]`), '書店の朝!?');
  }
  assert.equal(extractScenarioTitle('書店の朝\n[1コマ目]\n状況: 棚を開ける。'), '書店の朝');
  for (const first of ['PageComposition: {}', '[Camera: 俯瞰]', 'Camera: 俯瞰', '[EMOTION: NORMAL]', 'Style: NORMAL', '[1コマ目: 起]', '## Panel 1', 'Location: 店内', 'Scenario:', '状況: 棚を開ける。', 'Title:', '']) {
    assert.equal(extractScenarioTitle(`${first}\n[1コマ目]\n状況: 棚を開ける。\n店員「開店です」`), '無題', first);
  }
});

test('untitled control-prefixed scenario uses the same safe title in both generators and native QA', () => {
  const scenario = Array.from({ length: 4 }, (_, i) => `[${i + 1}コマ目]\n[Camera: 左上から俯瞰]\n[EMOTION: NORMAL]\n状況: 人物が並んだ本を見比べる。\nセリフなし`).join('\n');
  const composition = { layout: 'two_columns', reason: '本を見比べる動作を順に読む', heroPanels: [], breakouts: [], bleed: [], restraintReason: '静かな比較の順番を保つため均等な枠を使う。' };
  const sourceScenario = `PageComposition: ${JSON.stringify(composition)}\n${scenario}`;
  const normal = buildMangaPrompt({ scenario: sourceScenario, castList: CAST_LIST, colorMode: 'color', providerFamily: 'chatgpt' });
  assert.match(normal, /Top title EXACTLY "無題"/);
  const source = native.readExperimentalSource({ scenario: sourceScenario, castList: CAST_LIST, colorMode: 'color', allowScenarioQualityWarning: true });
  const plan = applyPageComposition({ count: 4, layout: 'two_columns', reason: '会話を順に読む', panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: '人物が並んだ本を見比べる。', dialogueIds: p.dialogueIds, breakout: null })) }, source);
  const image = native.buildExperimentalImagePrompt(plan, source, { colorMode: 'color', showTitle: true });
  const review = native.buildExperimentalReviewPrompt(plan, source, { showTitle: true });
  assert.match(image, /Top title EXACTLY "無題"/);
  assert.match(review, /Title required EXACTLY "無題"/);
  assert.doesNotMatch(normal + image + review, /(?:Top title EXACTLY|Title required EXACTLY) "PageComposition/);
});

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
