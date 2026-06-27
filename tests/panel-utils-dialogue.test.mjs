import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildEmotionBlock;
let extractEmotionStyle;
let extractActionOnly;
let extractDialogueOnly;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  const panelUtils = await server.ssrLoadModule('/src/lib/panel-utils.js');
  buildEmotionBlock = panelUtils.buildEmotionBlock;
  extractEmotionStyle = panelUtils.extractEmotionStyle;
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

test('does not promote embedded action quotes into final speech bubbles when explicit dialogue lines exist', () => {
  const panelText = `
[4コマ目: 結]
[EMOTION: ULTRA_IMPACT]
状況: 奥から謎のAI推進派おじさんが背後霊のようにスライディング乱入、「全部AIで自動生成できるのにー！」と両手をブン投げて絶叫。瞬間、全員の顔が真っ赤に膨張し、頭頂部から怒りのオーラが噴火。
全員「お前のせいだー！！」
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.doesNotMatch(dialogue, /全部AIで自動生成できるのにー！/);
  assert.match(dialogue, /Speech Bubble 1 \[全員\]: "お前のせいだー！！"/);
});

test('keeps embedded spoken quotes out of visual action text', () => {
  const panelText = `
[4コマ目: 結]
状況: 奥から謎のAI推進派おじさんが背後霊のようにスライディング乱入、「全部AIで自動生成できるのにー！」と両手をブン投げて絶叫。
全員「お前のせいだー！！」
`;

  const action = extractActionOnly(panelText, CAST_LIST);

  assert.doesNotMatch(action, /全部AIで自動生成できるのにー！/);
  assert.doesNotMatch(action, /listed dialogue content/);
  assert.doesNotMatch(action, /do not render this quoted text/);
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

test('does not promote quotes inside situation or reaction notes into final speech bubbles', () => {
  const panelText = `
[2コマ目: 承]
[EMOTION: PANIC+GROTESQUE]
状況: アカリは頬を膨らませ口に手を突っ込む勢いで「綿あめ…！」と呻き、ヒカリはメガネが斜めにずれたまま「うぅ…」と呟く。サエコは看板に向かって「職務質問！」と叫び出しそうな気配。
リン「昭和の幽霊が出そうだね。」
アカリ「屋台の綿あめどこ？」
（リアクション: サエコ→「撤収！」と叫びつつ隊列を調整。ヒカリ→指でメガネを直す）
`;

  const dialogue = extractDialogueOnly(panelText, CAST_LIST);

  assert.doesNotMatch(dialogue, /綿あめ…！/);
  assert.doesNotMatch(dialogue, /うぅ…/);
  assert.doesNotMatch(dialogue, /職務質問！/);
  assert.doesNotMatch(dialogue, /撤収！/);
  assert.match(dialogue, /Speech Bubble 1 \[リン\]: "昭和の幽霊が出そうだね。"/);
  assert.match(dialogue, /Speech Bubble 2 \[アカリ\]: "屋台の綿あめどこ？"/);
});

test('removes control tokens from visual action while keeping the situation body', () => {
  const panelText = `
[1コマ目: 起]
[EMOTION: OVERDRIVE_SUSPENSE]
[Camera: Dramatic Dutch Angle Wide + Low-Angle]
状況: 部屋全体にサーチライトのような強烈な光が差し、リンはネット記事のスマホを頭上に掲げる。サエコ→腕組み＋顔に青筋、ミク→雑誌をバシバシめくる
リン「AIでウイルス作った19歳が逮捕だって。」
`;

  const action = extractActionOnly(panelText, CAST_LIST);

  assert.doesNotMatch(action, /\[EMOTION:/);
  assert.doesNotMatch(action, /OVERDRIVE_SUSPENSE/);
  assert.doesNotMatch(action, /\[Camera:/);
  assert.doesNotMatch(action, /Dramatic Dutch Angle/);
  assert.doesNotMatch(action, /状況[:：]/);
  assert.match(action, /部屋全体にサーチライト/);
  assert.match(action, /リンはネット記事のスマホを頭上に掲げる/);
  assert.match(action, /サエコ→腕組み/);
});

test('keeps explicitly visible poster text but removes spoken quote placeholders from action', () => {
  const panelText = `
[1コマ目: 起]
[EMOTION: NORMAL]
[Camera: Aesthetic Thirds]
状況: 会場の一角、展示パネルの前で5人が集まる。背後に「デザイン募集」ポスターとスポットライト。空調の音が微かに響く。リンは小声で「ルールどこ？」と呟く。
ミク「ねえ、AIで描いたのも応募OKだよね？」
`;

  const action = extractActionOnly(panelText, CAST_LIST);

  assert.match(action, /「デザイン募集」ポスター/);
  assert.doesNotMatch(action, /ルールどこ/);
  assert.doesNotMatch(action, /listed dialogue content/);
  assert.doesNotMatch(action, /non-text ambient sound effect/);
  assert.doesNotMatch(action, /do not render/);
  assert.match(action, /リンは小声で呟く/);
});

test('removes dangling speech verbs after stripping quoted spoken text from action', () => {
  const panelText = `
[4コマ目: 結]
[EMOTION: DARK_ANIME]
状況: ミクが展示パネルの前で難しい顔。「尊重って新しいトレンド？」と呟き、ヒカリが冷ややかな目でスマホを見つめる。
ミク「尊重って新しいトレンド？」
ヒカリ「それ、流行ってほしくないな。」
`;

  const action = extractActionOnly(panelText, CAST_LIST);

  assert.match(action, /ミクが展示パネルの前で難しい顔。/);
  assert.match(action, /ヒカリが冷ややかな目でスマホを見つめる/);
  assert.doesNotMatch(action, /尊重って新しいトレンド/);
  assert.doesNotMatch(action, /。と呟き/);
  assert.doesNotMatch(action, /listed dialogue content/);
});

test('adds comedic overlay only when a comedy-tagged emotion maps to a serious style', () => {
  const panicGagBlock = buildEmotionBlock(`
[EMOTION: PANIC_GAG]
アカリ「もうパソコン、触りたくない…。」
`);
  const purePanicBlock = buildEmotionBlock(`
[EMOTION: PANIC]
アカリ「もうパソコン、触りたくない…。」
`);
  const hyperGagBlock = buildEmotionBlock(`
[EMOTION: HYPER_GAG]
アカリ「もうパソコン、触りたくない…。」
`);

  assert.equal(extractEmotionStyle('[EMOTION: PANIC_GAG]'), 'HORROR');
  assert.match(panicGagBlock, /PANEL STYLE LOCK: HORROR/);
  assert.match(panicGagBlock, /GAG INTENT OVERLAY/);
  assert.match(panicGagBlock, /do NOT flatten the dramatic styling into a plain chibi gag/);

  assert.equal(extractEmotionStyle('[EMOTION: PANIC]'), 'HORROR');
  assert.match(purePanicBlock, /PANEL STYLE LOCK: HORROR/);
  assert.doesNotMatch(purePanicBlock, /GAG INTENT OVERLAY/);

  assert.equal(extractEmotionStyle('[EMOTION: HYPER_GAG]'), 'IMPACT');
  assert.match(hyperGagBlock, /PANEL STYLE LOCK: IMPACT/);
  assert.doesNotMatch(hyperGagBlock, /GAG INTENT OVERLAY/);
});
