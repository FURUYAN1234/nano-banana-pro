import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server;
let validateMangaScenario;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ validateMangaScenario } = await server.ssrLoadModule('/src/lib/scenario-validation.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = 'アカリ\nヒカリ\nミク\nサエコ';

const fourPanels = (body) => [1, 2, 3, 4].map(n => `[${n}コマ目]\n${body}`).join('\n');

test('accepts explicit silent beats but not accidentally missing dialogue', () => {
  for (const marker of ['セリフなし', 'セリフ: なし', '無言', 'Dialogue: none', 'No dialogue']) {
    const result = validateMangaScenario(fourPanels(`状況: 箱を渡す。\n${marker}`), CAST_LIST);
    assert.equal(result.ok, true, marker);
    assert.deepEqual(result.silentPanels, [1, 2, 3, 4]);
    assert.deepEqual(result.panelsMissingDialogue, []);
  }
  for (const body of ['状況: 無言で箱を渡す。', '無言ではない', '状況: 箱を渡す。']) {
    assert.equal(validateMangaScenario(fourPanels(body), CAST_LIST).ok, false, body);
  }
});

test('rejects spoken quotes embedded in visual situation lines because the final bubble parser excludes them', () => {
  const scenario = `
[1コマ目: 起]
状況: アカリが机を指して「始めよう！」と叫ぶ。
[2コマ目: 承]
状況: ヒカリが資料を持ち「確認するね。」と答える。
[3コマ目: 転]
状況: ミクが窓の外を見て「嫌な予感…！」とつぶやく。
[4コマ目: 結]
状況: サエコが扉を閉め「これで終わり。」と宣言する。`;

  const validation = validateMangaScenario(scenario, CAST_LIST);

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.panelsMissingDialogue, [1, 2, 3, 4]);
});
