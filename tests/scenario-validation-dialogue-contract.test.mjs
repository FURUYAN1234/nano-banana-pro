import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

let server;
let validateMangaScenario;
let assertGeneratedScenarioCameraContract;
let assertGeneratedScenarioStyleContract;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ validateMangaScenario, assertGeneratedScenarioCameraContract, assertGeneratedScenarioStyleContract } = await server.ssrLoadModule('/src/lib/scenario-validation.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = 'アカリ\nヒカリ\nミク\nサエコ';

const fourPanels = (body) => [1, 2, 3, 4].map(n => `[${n}コマ目]\n${body}`).join('\n');

test('automatic style boundary permits the accepted six media and preserves imported legacy recipes', () => {
  assert.equal(typeof assertGeneratedScenarioStyleContract, 'function');
  for (const style of ['PASTEL', 'UKIYOE', 'THICK_PAINT', 'CEL', 'IMPACT', 'RETRO', 'SHOUJO', 'SUMI_INK']) {
    const excluded = fourPanels(`[EMOTION: ${style}]\n[Camera: 俯瞰]\nセリフなし`);
    assert.throws(() => assertGeneratedScenarioStyleContract(excluded), error => error.code === 'STYLE_CONTRACT' && error.scenario === excluded);
    assert.equal(validateMangaScenario(excluded).ok, true, 'explicit imported scripts keep their legacy recipe');
  }
  for (const style of ['NORMAL', 'GEKIGA', 'CHIBI_GAG', 'WATERCOLOR', 'POP_ART', 'SKETCH', 'HORROR']) {
    assert.equal(assertGeneratedScenarioStyleContract(fourPanels(`[EMOTION: ${style}]\n[Camera: 俯瞰]\nセリフなし`)), true, style);
  }
});

test('automatic cameras reject eye-level and unspecified elevation before image assembly', () => {
  assert.equal(typeof assertGeneratedScenarioCameraContract, 'function');
  for (const camera of ['アイレベル・左側面・望遠', 'Over The Shoulder・中景', '']) {
    const scenario = fourPanels(`${camera ? `[Camera: ${camera}]\n` : ''}状況: 二人が道具を渡す。\nセリフなし`);
    assert.throws(() => assertGeneratedScenarioCameraContract(scenario), error =>
      error.code === 'CAMERA_CONTRACT' && error.scenario === scenario && /1.*2.*3.*4/.test(error.message));
  }
});

test('automatic cameras allow real high/low variation and intentional non-eye-level repeats', () => {
  const cameras = ['左後方から高く撮る広角の引き', '右前から低めに撮る望遠接写', '高い位置から見下ろす広角', '床から見上げる右側面の全身'];
  const scenario = cameras.map((camera, i) => `[${i + 1}コマ目]\n[Camera: ${camera}]\nセリフなし`).join('\n');
  assert.equal(assertGeneratedScenarioCameraContract(scenario), true);
  assert.equal(assertGeneratedScenarioCameraContract(fourPanels('[Camera: 俯瞰・同じ構図]\nセリフなし')), true);
});

test('automatic cameras reject fisheye while retaining wide-angle and negated fisheye instructions', () => {
  for (const camera of ['俯瞰の魚眼', 'ローアングルのフィッシュアイ', 'high-angle fisheye view', 'low-angle fish-eye view']) {
    const scenario = fourPanels(`[Camera: ${camera}]\nセリフなし`);
    assert.throws(() => assertGeneratedScenarioCameraContract(scenario), error =>
      error.code === 'CAMERA_CONTRACT' && /魚眼/.test(error.message) && error.scenario === scenario);
    assert.equal(validateMangaScenario(scenario).ok, true, 'imported scenarios keep their explicit camera');
  }
  for (const camera of ['俯瞰の超広角', 'アオリの広角、魚眼禁止', 'high-angle wide shot, no fisheye', 'ローアングル、フィッシュアイではなく広角']) {
    assert.equal(assertGeneratedScenarioCameraContract(fourPanels(`[Camera: ${camera}]\nセリフなし`)), true, camera);
  }
});

test('only an explicit user eye-level directive can override the automatic camera policy', () => {
  const scenario = [1, 2, 3, 4].map(n => `[${n}コマ目]\n[Camera: ${n === 2 ? 'アイレベル・望遠' : '俯瞰'}]\nセリフなし`).join('\n');
  for (const source of ['2コマ目はアイレベルで撮る。', '[2コマ目]\n[Camera: アイレベル・望遠]']) {
    assert.equal(assertGeneratedScenarioCameraContract(scenario, source), true);
  }
  for (const source of ['', 'アイレベルは禁止。', '2コマ目はアイレベルにしない。', '登場人物がアイレベルという言葉を説明する。', '1コマ目はアイレベルで撮る。', '[2コマ目]\n[Camera: アイレベルを避ける]', '[2コマ目]\n[Camera: アイレベルは使わない]', '[2コマ目]\n[Camera: no eye-level camera]']) {
    assert.throws(() => assertGeneratedScenarioCameraContract(scenario, source), { code: 'CAMERA_CONTRACT' });
  }
  const flat = fourPanels('[Camera: アイレベル]\nセリフなし');
  assert.throws(() => assertGeneratedScenarioCameraContract(flat, 'カメラはアイレベルではなく俯瞰にする。'), { code: 'CAMERA_CONTRACT' });
  const firstTwoFlat = scenario.replace('[Camera: 俯瞰]', '[Camera: アイレベル]');
  assert.throws(() => assertGeneratedScenarioCameraContract(firstTwoFlat, '1コマ目は俯瞰、2コマ目はアイレベルで撮る。'), { code: 'CAMERA_CONTRACT' });
});

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

test('does not mistake accepted non-ASCII panel headers for dialogue', () => {
  for (const numbers of [['１', '２', '３', '４'], ['一', '二', '三', '四']]) {
    const scenario = numbers.map(num => `[ ${num} こま目: 起]\n状況: 人物が箱を運ぶ。`).join('\n');
    const result = validateMangaScenario(scenario, CAST_LIST);
    assert.equal(result.ok, false);
    assert.deepEqual(result.panelsMissingDialogue, [1, 2, 3, 4]);
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

test('rejects duplicate, extra, and out-of-order panel headers instead of silently rearranging or dropping panels', () => {
  const panel = n => `[${n}コマ目]\nアカリ「了解。」`;
  for (const numbers of [[1, 3, 2, 4], [1, 2, 3, 4, 1], [1, 2, 3, 4, 5]]) {
    const result = validateMangaScenario(numbers.map(panel).join('\n'), CAST_LIST);
    assert.equal(result.ok, false, numbers.join(','));
    assert.ok(result.invalidPanelSequence?.length, numbers.join(','));
  }
});
