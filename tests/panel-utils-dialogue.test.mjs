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
