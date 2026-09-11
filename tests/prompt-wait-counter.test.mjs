import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const assembly = workflow.slice(workflow.indexOf('const assemblePrompt ='), workflow.indexOf('// [v3.04]'));

test('prompt review updates one elapsed-time line and ignores superseded runs', () => {
  let now = 10000;
  let thought = 'AI精査中...';
  let tick;
  const epoch = { current: 1 };
  const run = { current: 1 };
  const timer = assembly.slice(assembly.indexOf('const assemblyStartedAt'), assembly.indexOf('\n    try {'));
  vm.runInNewContext(timer, {
    Date: { now: () => now },
    setInterval: (callback, delay) => { assert.equal(delay, 1000); tick = callback; },
    setAssembleThought: update => { thought = update(thought); },
    promptScenarioEpoch: 1, scenarioRunEpochRef: epoch,
    assemblyRun: 1, promptAssemblyRunRef: run,
  });
  now += 1000;
  tick();
  assert.match(thought, /AI応答を待機中\.\.\. \(1秒経過\)/);
  thought += '\n' + '進捗ログ'.repeat(250);
  now += 64000;
  tick();
  assert.match(thought, /\(65秒経過\)/);
  assert.equal(thought.match(/AI応答を待機中/g).length, 1);
  const previous = thought;
  run.current++;
  now += 1000;
  tick();
  assert.equal(thought, previous);
  run.current = 1;
  epoch.current++;
  tick();
  assert.equal(thought, previous);
  assert.match(assembly, /finally\s*\{\s*clearInterval\(thinkTimer\)/);
});
