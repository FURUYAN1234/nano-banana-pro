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

const handKinematicsLine = (prompt) =>
  prompt.match(/^HAND \/ PROP KINEMATICS LOCK:.*$/m)?.[0] || '';

test('all hand and prop situations use one shared kinematics contract without rewriting the action', () => {
  const action = 'ミクは両手でケーキ皿を持ち、リンは両手で頭を抱え、目を血走らせて画面を指差し、サエコは腕を組む。';

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildPrompt(providerFamily, action);
    const panel = panelTwoSection(prompt);
    const contract = handKinematicsLine(prompt);

    assert.match(panel, /ミクは両手でケーキ皿を持ち/);
    assert.match(panel, /リンは両手で頭を抱え[^。\n]*指差/);
    assert.match(contract, /anatomical LEFT and RIGHT/i);
    assert.match(contract, /one simultaneous role\/contact per hand/i);
    assert.match(contract, /subject-relative.*not viewer-left\/viewer-right/i);
    assert.match(contract, /palm.*thumb.*finger.*wrist/i);
    assert.match(contract, /one owning actor per prop/i);
    assert.match(contract, /final described state/i);
    assert.doesNotMatch(prompt, /HAND ALLOCATION LOCK:/);
    assert.doesNotMatch(prompt, /HAND POSE LOCK:/);
    assert.doesNotMatch(prompt, /PROP-HAND OWNERSHIP LOCK:/);
    assert.doesNotMatch(prompt, /ARM-CROSS PROP RELEASE LOCK:/);
  }
});

test('unrelated hand and prop actions receive the exact same situation-agnostic contract', () => {
  const actions = [
    'ミクは片手で箱を支え、もう片手で鍵を回す。',
    'リンは両手で布を絞る。',
    'サエコは皿を台に置いてから腕を組む。',
    'アカリは相手から封筒を受け取る。'
  ];

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const contracts = actions.map((action) => handKinematicsLine(buildPrompt(providerFamily, action)));

    assert.ok(contracts.every(Boolean));
    assert.equal(new Set(contracts).size, 1);
    assert.doesNotMatch(contracts[0], /箱|鍵|布|皿|封筒|スマホ|新聞/);
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
