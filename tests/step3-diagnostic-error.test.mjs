import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  beginDiagnosticAction, getDiagnosticContext, diagnosticConsole, readDiagnostics,
} from '../src/lib/diagnostics.js';

// Exercise the production catch body, including its actual diagnostic facade.
const source = readFileSync(process.env.STEP3_DIAGNOSTIC_SOURCE || new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const step3Start = source.indexOf('const assemblePrompt = async');
const step3 = source.slice(step3Start, source.indexOf('// [v3.04]', step3Start));
const start = step3.lastIndexOf('} catch (error) {') + '} catch (error) {'.length;
const body = step3.slice(start, step3.indexOf('} finally {', start));
const handleFailure = new Function('error', 'console', 'translateApiError', 'promptScenarioEpoch',
  'scenarioRunEpochRef', 'assemblyRun', 'promptAssemblyRunRef', 'setAssembleThought', 'showStatus', body);

test('STEP3 exports the original failure metadata without private text', async () => {
  beginDiagnosticAction('step3');
  const { runId } = getDiagnosticContext();
  const error = Object.assign(new Error('private scenario sk-secret'), { code: 'BALLOON_LAYOUT_INVALID' });
  error.stack = 'Error: private scenario sk-secret\n    at compile (https://example.invalid/assets/index-test.js:12:34)';
  let thought = '';
  let status = '';
  const originalConsole = globalThis.console.error;
  globalThis.console.error = () => {};
  try {
    handleFailure(error, diagnosticConsole, () => 'translated failure', 1, { current: 1 }, 1,
      { current: 1 }, update => { thought = update(thought); }, value => { status = value; });
  } finally {
    globalThis.console.error = originalConsole;
  }
  const report = await readDiagnostics();
  const events = report.events.filter(row => row.runId === runId && row.event === 'workflow.error');
  assert.equal(events.length, 1);
  assert.equal(events[0].errorName, 'Error');
  assert.equal(events[0].errorCode, 'BALLOON_LAYOUT_INVALID');
  assert.equal(events[0].stack, 'index-test.js:12:34');
  assert.doesNotMatch(JSON.stringify(events), /private scenario|sk-secret|example.invalid|translated failure/);
  assert.match(thought, /translated failure/);
  assert.match(status, /指示文を構築できませんでした/);
});

test('stale STEP3 failures cannot report an error for a later scenario', () => {
  let calls = 0;
  handleFailure(new Error('stale'), { error: () => { calls++; } }, () => 'stale', 1,
    { current: 2 }, 1, { current: 1 }, () => { calls++; }, () => { calls++; });
  assert.equal(calls, 0);
});
