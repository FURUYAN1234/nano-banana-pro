import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { HAND_PROP_KINEMATICS_LOCK, HAND_PROP_KINEMATICS_LOCK_COMPACT } from '../src/lib/hand-prop-kinematics.js';

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
## 4. アカリ
- orange bob, no glasses
## 5. ヒカリ
- blonde bob, round glasses
`;

const REPORTED_SHINAGAWA_SCENARIO = `
## タイトル: 品川駅の乗車列
Location: 雨天の品川駅港南口タクシー乗り場
Outfit: 全員が大雨対応の私服と折り畳み傘。ヒカリは丸眼鏡とショルダーバッグ。

[1コマ目: 起]
[EMOTION: GEKIGA]
状況: ミクが閉じた傘を右手に握り、左手を胸元へ引き寄せて列を見る。
ミク「この行列、黙って並ぶ空気じゃないよ！」

[2コマ目: 承]
[EMOTION: IMPACT]
状況: サエコは案内板へ左手を伸ばし、右手で傘を固定する。リンは案内板を指す。
リン「二十台でこの圧、演出が強すぎる！」
サエコ「列を会議場にするな！」

[3コマ目: 転]
[EMOTION: CHIBI_GAG]
状況: ミク、リン、アカリが傘の下で演説隊形を組み、サエコが制止する。
ミク「動くなら今しかないって！」
アカリ「よーし、先頭を守るよ！」
サエコ「誰から何を守る気だ！」

[4コマ目: 結]
[EMOTION: IMPACT]
[Camera: 右前斜め上方の望遠圧縮、Bokeh Depth。前景でヒカリが案内板を拭いて指す手を大きく見せる。]
状況: ヒカリが丸眼鏡を指先で直し、濡れた案内板の文字をハンカチで拭いた左手を止め、右手の人差し指で「乗車列」を示す。ヒカリは眉を困った形に下げ、目を案内板からミクへ移し、口を小さく開け、胴体をミクへ向ける。
ヒカリ「これ、集会の受付じゃなくて乗車列だよ！」`;

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

const panelFourSection = (prompt) =>
  prompt.match(/## Panel 4[\s\S]*$/)?.[0] || '';

const handKinematicsLine = (prompt) =>
  prompt.match(/^HAND \/ PROP KINEMATICS LOCK:.*$/m)?.[0] || '';

test('all hand and prop situations use one shared kinematics contract with a two-hand final-state limit', () => {
  const action = 'ミクは両手でケーキ皿を持ち、リンは両手で頭を抱え、目を血走らせて画面を指差し、サエコは腕を組む。';

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, action);
    const panel = panelTwoSection(prompt);
    const contract = handKinematicsLine(prompt);

    assert.match(panel, /ミクは両手でケーキ皿を持ち/);
    assert.match(panel, /リンは両手で頭を抱え[^。\n]*指差/);
    assert.match(contract, /anatomical LEFT and RIGHT/i);
    assert.match(contract, /one simultaneous role\/contact per hand/i);
    assert.match(contract, /overbook(?:s|ed)/i);
    assert.match(contract, /(?:never add a|never) third hand/i);
    assert.match(contract, /subject-relative.*not viewer-left\/viewer-right/i);
    assert.match(contract, /palm.*thumb.*finger.*wrist/i);
    assert.match(contract, /shoulder.*elbow.*wrist.*hand/i);
    assert.match(contract, /palm\/dorsum.*actual contact target.*never reversed\/mirrored/i);
    assert.match(contract, /foreshortening.*enlarge.*near hand.*compress.*never lengthen.*(?:upper|forearm)/i);
    assert.match(contract, /shoulder-elbow-wrist proportions plausible/i);
    assert.match(contract, /one owning actor per prop/i);
    assert.match(contract, /final described state/i);
    assert.doesNotMatch(prompt, /HAND ALLOCATION LOCK:/);
    assert.doesNotMatch(prompt, /HAND POSE LOCK:/);
    assert.doesNotMatch(prompt, /PROP-HAND OWNERSHIP LOCK:/);
    assert.doesNotMatch(prompt, /ARM-CROSS PROP RELEASE LOCK:/);
  }
  assert.match(HAND_PROP_KINEMATICS_LOCK, /explicit LEFT\/RIGHT and latest final-state roles win/i);
  assert.match(HAND_PROP_KINEMATICS_LOCK_COMPACT, /final explicit sides only/i);
  assert.match(HAND_PROP_KINEMATICS_LOCK_COMPACT, /shoulder>elbow>wrist>hand/i);
});

test('panel-specific guard resolves the reported glasses, handkerchief, and pointing overbooking in panel 4', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: REPORTED_SHINAGAWA_SCENARIO,
      castList: CAST_LIST,
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v6.4.7-test'
    });
    const panel = panelFourSection(prompt);

    assert.match(panel, /ヒカリが丸眼鏡を指先で直し/);
    assert.match(panel, /HAND ROLE RESOLUTION:/);
    assert.match(panel, /final explicit LEFT and RIGHT roles only/i);
    assert.match(panel, /earlier unsided gesture is completed and not visible/i);
    assert.match(panel, /never draw a third hand/i);
  }
});

test('ordinary two-hand actions do not receive an overbooking guard', () => {
  for (const action of [
    'ヒカリは左手で看板を拭き、右手で文字を指す。',
    'ヒカリは両手で本を持つ。'
  ]) {
    const panel = panelTwoSection(buildPrompt('chatgpt', action));
    assert.doesNotMatch(panel, /HAND ROLE RESOLUTION:/);
  }
});

test('two-sided props distinguish an operated rear from a presented readable front', () => {
  assert.match(HAND_PROP_KINEMATICS_LOCK, /display\/readable front and a separate working rear/i);
  assert.match(HAND_PROP_KINEMATICS_LOCK, /opening\/adjusting\/deploying a rear mechanism/i);
  assert.match(HAND_PROP_KINEMATICS_LOCK, /presents\/displays the prop, expose its front to the recipient/i);
});

test('unrelated hand and prop actions use only the shared full or compact situation-agnostic contract', () => {
  const actions = [
    'ミクは片手で箱を支え、もう片手で鍵を回す。',
    'リンは両手で布を絞る。',
    'サエコは皿を台に置いてから腕を組む。',
    'アカリは相手から封筒を受け取る。'
  ];

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const contracts = actions.map((action) => handKinematicsLine(buildPrompt(providerFamily, action)));

    assert.ok(contracts.every(Boolean));
    for (const contract of contracts) {
      // Prompt length may select either existing representation, never a
      // situation-specific hand rule or a partially truncated contract.
      assert.ok([HAND_PROP_KINEMATICS_LOCK, HAND_PROP_KINEMATICS_LOCK_COMPACT].includes(contract));
      assert.doesNotMatch(contract, /箱|鍵|布|皿|封筒|スマホ|新聞/);
    }
  }
});

test('sequential prop placement and a later pose remain verbatim under the generic final-state rule', () => {
  const action = 'サエコは資料ファイルを机にトンと立て、背筋を伸ばし腕組み気味。アカリはカップケーキを食べる。';

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, action);
    const panel = panelTwoSection(prompt);

    assert.match(panel, /サエコは資料ファイルを机にトンと立て、背筋を伸ばし腕組み気味/);
    assert.match(handKinematicsLine(prompt), /released objects remain physically supported/i);
    assert.doesNotMatch(prompt, /ARM-CROSS PROP RELEASE LOCK:/);
  }
});

test('different characters retain separate action ownership without sample-specific branches', () => {
  const action = 'サエコは資料ファイルを机にトンと立てる。リンは腕を組む。';
  const prompt = buildPrompt('chatgpt', action);
  const panel = panelTwoSection(prompt);

  assert.match(panel, /サエコは資料ファイルを机にトンと立てる。リンは腕を組む/);
  assert.match(handKinematicsLine(prompt), /never cross ownership between characters/i);
  assert.doesNotMatch(panel, /ARM-CROSS PROP RELEASE LOCK:/);
});
