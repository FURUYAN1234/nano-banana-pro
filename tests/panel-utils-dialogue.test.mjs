import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let extractActionOnly;
let extractDialogueOnly;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  const panelUtils = await server.ssrLoadModule('/src/lib/panel-utils.js');
  extractActionOnly = panelUtils.extractActionOnly;
  extractDialogueOnly = panelUtils.extractDialogueOnly;
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

test('extracts spoken quotes embedded in action even when the panel also has explicit dialogue', () => {
  const panelText = `
[4コマ目: 結]
[EMOTION: ULTRA_IMPACT]
状況: 奥から謎のAI推進派おじさんが背後霊のようにスライディング乱入、「全部AIで自動生成できるのにー！」と両手をブン投げて絶叫。瞬間、全員の顔が真っ赤に膨張し、頭頂部から怒りのオーラが噴火。
全員「お前のせいだー！！」
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.match(dialogue, /Speech Bubble 1 \[謎のAI推進派おじさん\]: "全部AIで自動生成できるのにー！"/);
  assert.match(dialogue, /Speech Bubble 2 \[全員\]: "お前のせいだー！！"/);
});

test('keeps embedded spoken quotes out of visual action text', () => {
  const panelText = `
[4コマ目: 結]
状況: 奥から謎のAI推進派おじさんが背後霊のようにスライディング乱入、「全部AIで自動生成できるのにー！」と両手をブン投げて絶叫。
全員「お前のせいだー！！」
`;

  const action = extractActionOnly(panelText, CAST_LIST);

  assert.doesNotMatch(action, /全部AIで自動生成できるのにー！/);
  assert.match(action, /listed dialogue content/);
});

test('does not turn explicit handwriting quotes into speech bubbles', () => {
  const panelText = `
[3コマ目: 転]
状況: サエコは「風紀」とだけ太字で書きながら、怒りで顔面が紅潮している。
アカリ「私、カロリーゼロのポテチ描いた！」
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.doesNotMatch(dialogue, /風紀/);
  assert.match(dialogue, /Speech Bubble 1 \[アカリ\]: "私、カロリーゼロのポテチ描いた！"/);
});

test('does not promote action quote fragments already covered by explicit dialogue', () => {
  const panelText = `
[3コマ目: 転]
状況: リンが肩越しに原稿をめくりながら「90秒なら…」と目をギラギラさせてアカリに囁きかけ、アカリは口をへの字にして歯を食いしばりながら「35分は…」と顔面蒼白で言い放つ。
リン「90秒なら我慢して見られるよ！」
アカリ「35分は…とても最後まで見られない…」
ミク「ひどいよー…。」
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.doesNotMatch(dialogue, /Speech Bubble \d \[リン\]: "90秒なら…"/);
  assert.doesNotMatch(dialogue, /Speech Bubble \d \[アカリ\]: "35分は…"/);
  assert.match(dialogue, /Speech Bubble 1 \[リン\]: "90秒なら我慢して見られるよ！"/);
  assert.match(dialogue, /Speech Bubble 2 \[アカリ\]: "35分は…とても最後まで見られない…"/);
  assert.match(dialogue, /Speech Bubble 3 \[ミク\]: "ひどいよー…。"/);
});

test('does not promote unowned action narration quotes into speech bubbles', () => {
  const panelText = `
[4コマ目: 結]
状況: スタジオ全景、全員が机の上にペンや資料を「バンバンバンバン！！」と猛烈な勢いで叩きつけ、「今しかない！」の大絶叫がスタジオに轟く。
アカリ「我々の仕事が奪われないうちにこの才能を潰そう！」
リン「御意！」
サエコ「AI作品は無条件で却下よね！」
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.doesNotMatch(dialogue, /Speech Bubble \d: "今しかない！"/);
  assert.doesNotMatch(dialogue, /バンバンバンバン/);
  assert.match(dialogue, /Speech Bubble 1 \[アカリ\]: "我々の仕事が奪われないうちにこの才能を潰そう！"/);
  assert.match(dialogue, /Speech Bubble 2 \[リン\]: "御意！"/);
  assert.match(dialogue, /Speech Bubble 3 \[サエコ\]: "AI作品は無条件で却下よね！"/);
});
