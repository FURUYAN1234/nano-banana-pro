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
