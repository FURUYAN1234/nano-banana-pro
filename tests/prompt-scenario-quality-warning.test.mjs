import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;
let extractCastLimitRule;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ extractCastLimitRule } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
});

after(async () => {
  await server?.close();
});

test('an explicit no-extra-customers instruction cannot authorize background mobs', () => {
  const cast = '## アカリ\n- adult woman\n## ヒカリ\n- adult woman';
  for (const compact of [true, false]) {
    const rule = extractCastLimitRule('状況: アカリとヒカリが話す。追加の客はいない。\nアカリ「どうぞ。」', cast, { compact });
    assert.doesNotMatch(rule, /plus required adult mobs|Allow additional background characters/);
    assert.match(rule, /NO OTHER HUMANS/);
  }
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

test('both providers compile explicitly silent panels without adding dialogue', () => {
  const scenario = incompleteScenario.replace('[4コマ目: 結]', '[3コマ目: 転]\n状況: ミクが窓を見る。\nセリフなし\n\n[4コマ目: 結]');
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ ...promptArgs, scenario, providerFamily });
    assert.match(prompt, /Panel 3/);
    assert.match(prompt, /NO speech bubbles/);
    for (const rule of ['SINGLE INSTANT:', 'REVEAL ORDER:', 'REACTION TARGET:', 'PROP STATE:', 'REFERENCE ROLE:']) {
      assert.ok(prompt.includes(rule), `${providerFamily} must retain ${rule} after prompt compaction`);
    }
    assert.doesNotMatch(prompt, /never substitute; keep it identical/);
  }
});

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

test('prompt assembly continues on missing dialogue when the workflow opts into quality warnings', () => {
  const dialogueMissingScenario = incompleteScenario.replace(
    '[4コマ目: 結]',
    '[3コマ目: 転]\n状況: ミクが窓を見て「嫌な予感…！」とつぶやく。\n\n[4コマ目: 結]'
  );

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ ...promptArgs, providerFamily, scenario: dialogueMissingScenario, allowScenarioQualityWarning: true });
    assert.match(prompt, /Panel 3/);
    assert.match(prompt, /始めよう/);
  }
});
