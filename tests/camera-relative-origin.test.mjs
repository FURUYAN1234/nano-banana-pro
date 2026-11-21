import assert from 'node:assert/strict';
import test from 'node:test';
import { classifyCameraElevation, getPanelShotExecution } from '../src/lib/composition-variety.js';
import { assertGeneratedScenarioCameraContract } from '../src/lib/scenario-validation.js';
import { requestSafeScenario } from '../src/lib/location-policy.js';

const scenario = camera => Array.from({ length: 4 }, (_, i) => `[${i + 1}コマ目]\n[Camera: ${i === 2 ? camera : '右上から見下ろす広角'}]\n[EMOTION: NORMAL]\n状況: 成人の作業員が箱を確認する。\n作業員「確認します。」`).join('\n');

test('relative camera origins accept full front/rear azimuth names without requiring a stock projection phrase', () => {
  for (const height of ['低', '高']) for (const direction of ['右前方', '左前方', '右後方', '左後方']) {
    const camera = `作業台の天面より${height}い${direction}からの広角。成人の作業員と持った箱を大きく捉える。`;
    assert.equal(classifyCameraElevation(camera), height === '低' ? 'low' : 'high', camera);
    assert.doesNotThrow(() => assertGeneratedScenarioCameraContract(scenario(camera), '', { scenarioMode: 'four-panel' }));
    const cue = getPanelShotExecution(camera, { compact: true });
    assert.match(cue, /指定角を弱めず強めない|指定高\/角度\/体格を保持/);
    assert.match(cue, /広角|近遠/);
  }
});

test('relative actor/prop height, rejected placement and real eye-level do not authorize a generated camera', () => {
  for (const camera of ['箱が座面より低い右前方に置かれている。', '人物が座面より低い右前方から箱を押す。',
    '人物は天面より高い左前方から手を伸ばす。', '座面より低い右前方からは撮らない。正面の中景。',
    '座面より低い右前方からの広角だが、座った人物のアイレベルで撮る。']) {
    assert.throws(() => assertGeneratedScenarioCameraContract(scenario(camera), camera, { scenarioMode: 'four-panel' }), { code: 'CAMERA_CONTRACT' }, camera);
  }
});

test('relative origins also accept a front/back direction without a side and a leading diagonal modifier', () => {
  for (const height of ['低', '高']) for (const direction of ['前方', '後方', '斜め右前方', '斜め左後方']) {
    assert.equal(classifyCameraElevation(`基準面より${height}い${direction}からの広角。`), height === '低' ? 'low' : 'high');
  }
  for (const camera of ['人物が基準面より低い前方から箱を押す。', '人物は基準面より高い斜め右前方から手を伸ばす。', '基準面より低い斜め右前方からは撮らない。']) {
    assert.equal(classifyCameraElevation(camera), 'unspecified');
  }
});

test('an actor relative clause can precede the camera origin, but actor peeking alone is not a camera', () => {
  assert.equal(classifyCameraElevation('人物が座る作業台より低い右前方からの広角。'), 'low');
  assert.equal(classifyCameraElevation('カメラは作業台より高い左前方から撮影する。'), 'high');
  assert.equal(classifyCameraElevation('人物が作業台より低い右前方からのぞく。'), 'unspecified');
});

test('a relative height followed by a comma and an explicit shot is a usable camera origin', () => {
  const high = '来館者用コメント端末の高さより少し上、左前斜めからの広角。右手前の人物を大きく、左奥の人物と端末を小さく置く。';
  assert.equal(classifyCameraElevation(high), 'high');
  assert.doesNotThrow(() => assertGeneratedScenarioCameraContract(scenario(high)));
  assert.equal(classifyCameraElevation('机の高さよりわずかに下、右後方からの望遠。'), 'low');
  assert.equal(classifyCameraElevation('目線の高さよりやや上、左前方から撮影する。'), 'high');
  for (const camera of [
    '人物の手は端末の高さより少し上、左前斜めから端末へ伸びる。',
    '端末の高さより少し上、左前斜めからの広角は使わない。正面から捉える。',
    '端末の高さより少し上、左前斜めからの広角。座った人物のアイレベルで撮る。',
  ]) assert.throws(() => assertGeneratedScenarioCameraContract(scenario(camera)), {code:'CAMERA_CONTRACT'}, camera);
});

test('the existing provider retry gate accepts a valid relative origin unchanged after one response', async () => {
  const accepted = scenario('作業台の天面より低い右前方からの広角。成人の作業員と箱を捉える。');
  let requests = 0;
  const result = await requestSafeScenario({ initialPrompt: 'A neutral workshop scene', maxAttempts: 3,
    requestScenario: async () => { requests++; return { text: JSON.stringify({ location: '工房', scenario: accepted }) }; },
    parseScenario: response => JSON.parse(response.text),
    validateScenario: parsed => assertGeneratedScenarioCameraContract(parsed.scenario),
  });
  assert.equal(requests, 1, 'an already valid camera must not consume a repair request');
  assert.equal(result.parsed.scenario, accepted);
  assert(!result.validationWarning);
});
