import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
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
## 4. アカリ
- orange bob, no glasses
## 5. ヒカリ
- blonde bob, round glasses
`;

const REPORTED_SCENARIO = `
## タイトル: 手動入力の展示攻略
Location: 展示ホール
Outfit: 全員が展示会向けの私服とスニーカー。

[1コマ目: 起]
[EMOTION: HIGH_SATURATION]
状況: ミクが入力用キーボードへ手を伸ばし、奥のヒカリが見守る。
ミク「今日は手入力で主役になるっしょ！」

[2コマ目: 承]
[EMOTION: CHIBI_GAG]
状況: リンが展示ラベルを指し、ミクがメモを重ねようとし、サエコが止める。
リン「入力欄が紙じゃないよ！？」
サエコ「そこへ書くな！」

[3コマ目: 転]
[EMOTION: IMPACT]
[Camera: 前景のアカリが持つキーボードを大きく見せ、奥でミク、リン、サエコ、ヒカリが別々の方向へ身を反らす。]
状況: アカリがキーを連打する。（リアクション: ミク→両肩を上げる、リン→前のめり、サエコ→腕を伸ばす、ヒカリ→胸元で両手を握る）
アカリ「手で入れたら展示も動くの！？」
ミク「動かす場所が違うって！」
サエコ「全員、手を止めて！」

[4コマ目: 結]
[EMOTION: MONOCHROME_ACCENT]
[Camera: 展示ケース、五人の身体、停止したキーボードを重ねる。]
状況: 五人が展示ケースをのぞく。ケース内には今の場面を再現した極小の展示ホールがあり、ミニチュアの五人は全員、巨大なメモを見上げる。現実のミク、リン、サエコ、アカリ、ヒカリは箱の外で手を止める。
セリフなし`;

const panel = (prompt, number) => prompt.match(new RegExp(`## Panel ${number}[\\s\\S]*?(?=## Panel ${number + 1}|$)`))?.[0] || '';

test('both four-panel provider prompts keep reaction mentions on one body and isolate scripted miniatures', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: REPORTED_SCENARIO,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v6.5.0-test',
    });
    const third = panel(prompt, 3);
    const fourth = panel(prompt, 4);

    assert.match(third, /CAST INSTANCE LOCK:.*(?:Camera\/Action\/dialogue\/reaction.*same physical body|all mentions reuse it|reuse same)/is);
    assert.match(third, /(?:NO OTHER HUMANS: exactly|TOTAL) 5 people/);
    assert.doesNotMatch(third, /DIEGETIC REPLICA LAYER/);

    assert.match(fourth, /DIEGETIC REPLICA LAYER:.*\[ミク\].*\[リン\].*\[サエコ\].*\[アカリ\].*\[ヒカリ\]/is);
    assert.match(fourth, /one tiny replica each.*inside the explicitly scripted container\/surface|one tiny copy each inside scripted container only/is);
    assert.match(fourth, /PHYSICAL TOTAL 5 full-size people; no other full-size humans/i);
    assert.doesNotMatch(fourth, /(?:NO OTHER HUMANS: exactly|TOTAL) 5 people/);
  }
});
