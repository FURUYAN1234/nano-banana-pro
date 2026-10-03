import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

// Exercise the actual finally blocks with a fixed clock and React-style setters.
function finish(name, overrides = {}) {
  const start = source.indexOf(`const ${name} = `);
  const end = source.indexOf('\n  };', start);
  const body = source.slice(start, end);
  const finalizer = body.slice(body.lastIndexOf('} finally {') + 11).replace(/\}\s*$/, '');
  const state = {
    Date: { now: () => 126432 }, clearInterval() {}, thinkTimer: 1, genTimer: 2,
    assemblyRun: 3, promptAssemblyRunRef: { current: 3 },
    promptScenarioEpoch: 4, qualityRunEpoch: 4, scenarioRunEpochRef: { current: 4 },
    promptAssemblyAbortRef: { current: {} }, assemblyStartedAt: 1000, generationStartedAt: 1000,
    assembleThought: '診断ログ\n> ⏳ AI応答を待機中... (120秒経過)\n> 処理結果',
    genLog: ['診断ログ', '[WAIT] ⏳ 画像生成中… 合計120秒経過', '処理結果'],
    isAssembling: true, isGeneratingImage: true, ...overrides,
  };
  const scope = { ...state };
  for (const key of ['assembleThought', 'genLog', 'isAssembling', 'isGeneratingImage']) {
    scope[`set${key[0].toUpperCase()}${key.slice(1)}`] = value => {
      state[key] = typeof value === 'function' ? value(state[key]) : value;
    };
  }
  new Function(...Object.keys(scope), finalizer)(...Object.values(scope));
  return state;
}

for (const result of ['完了', 'エラー: upstream failure']) {
  test(`STEP3 retains final elapsed time after ${result}`, () => {
    const state = finish('assemblePrompt', {
      assembleThought: `診断ログ\n> ⏳ AI応答を待機中... (120秒経過)\n> ${result}`,
    });
    assert.match(state.assembleThought.split('\n').at(-1), /\[STEP3 TIME\].*125\.432秒/);
    assert.ok(state.assembleThought.includes(result));
    assert.doesNotMatch(state.assembleThought, /AI応答を待機中/);
    assert.equal(state.isAssembling, false);
  });
  test(`STEP4 moves final elapsed time below ${result}`, () => {
    const state = finish('generateImageOnce', { genLog: ['[WAIT] 合計120秒経過', result] });
    assert.match(state.genLog.at(-1), /STEP4終了.*125秒/);
    assert.equal(state.genLog[0], result);
    assert.equal(state.genLog.filter(line => line.startsWith('[WAIT]')).length, 1);
    assert.equal(state.isGeneratingImage, false);
  });
}

test('sub-second completion still records time without a timer tick', () => {
  assert.match(finish('assemblePrompt', { assembleThought: '完了', Date: { now: () => 1250 } }).assembleThought, /0\.250秒）$/);
  assert.match(finish('generateImageOnce', { genLog: ['完了'], Date: { now: () => 1250 } }).genLog.at(-1), /合計0秒/);
});

test('stale finalizers cannot append time to the newer run', () => {
  const step3 = finish('assemblePrompt', { assemblyRun: 2 });
  assert.doesNotMatch(step3.assembleThought, /STEP3 TIME/);
  assert.equal(step3.isAssembling, true);
  const step4 = finish('generateImageOnce', { qualityRunEpoch: 2 });
  assert.equal(step4.genLog.at(-1), '処理結果');
  assert.equal(step4.isGeneratingImage, true);
});
