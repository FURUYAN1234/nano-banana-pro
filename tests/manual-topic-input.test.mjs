import assert from 'node:assert/strict';
import test from 'node:test';
import { createManualTopicInput, MANUAL_TOPIC_FIELD_ID } from '../src/lib/manual-topic-input.js';
import { makeDiagnosticEvent, readDiagnostics, recordDiagnostic, subscribeDiagnosticInputFlush } from '../src/lib/diagnostics.js';

const field = (reason = 'typing') => ({ reason, source: 'textarea', fieldId: MANUAL_TOPIC_FIELD_ID, targetId: MANUAL_TOPIC_FIELD_ID, inputType: reason === 'paste' ? 'insertFromPaste' : 'insertText' });
function input() {
  const events = [], values = [];
  let now = 100;
  const controller = createManualTopicInput({ initialValue: 'original topic', setValue: value => values.push(value), record: (event, details) => events.push({ event, ...details }), now: () => now++ });
  controller.observeScenario('a generated scenario');
  return { controller, events, values };
}

test('typing coalesces until blur or the next STEP, preserving actual change times and equality without text', () => {
  const { controller, events } = input();
  controller.update('first edit', field());
  controller.update('a generated scenario', field());
  assert.equal(events.length, 0);
  controller.flush('blur');
  assert.deepEqual(events.map(e => [e.inputReason, e.beforeLength, e.afterLength, e.changeCount, e.firstChangedAt, e.lastChangedAt, e.scenarioEqualsBefore, e.scenarioEqualsAfter]),
    [['typing', 14, 20, 2, 100, 101, false, true]]);
  assert(!JSON.stringify(events).includes('generated scenario'));
  controller.update('next edit', field());
  controller.flush('next-step');
  assert.equal(events.length, 2);
  assert.equal(events[1].flushReason, 'next-step');
  controller.flush('next-step');
  assert.equal(events.length, 2);
});

test('paste, dictation, reference remapping and reset have distinct reasons and accept legitimate full scripts', () => {
  const { controller, events } = input();
  const script = '[1コマ目]\n全文の脚本'.repeat(100);
  controller.update(script, field('paste'));
  controller.update(previous => previous + '音声', { reason: 'voice', source: 'dictation' });
  controller.update(previous => previous.replace('全文', '画像2'), { reason: 'reference-remap', source: 'reference-remap' });
  controller.update('', { reason: 'reset', source: 'reset' });
  assert.deepEqual(events.map(e => e.inputReason), ['paste', 'voice', 'reference-remap', 'reset']);
  assert.equal(events[0].afterLength, script.length);
  assert.equal(controller.value, '');
});

test('unknown reasons and events from the scenario field cannot mutate the topic or evaluate an updater', () => {
  const { controller, events, values } = input();
  for (const metadata of [{ reason: 'scenario-result', source: 'textarea' }, { ...field(), fieldId: 'generated-scenario' }, { ...field(), targetId: 'generated-scenario' }, { reason: 'voice', source: 'textarea' }, {}, null, 'unknown']) {
    assert.equal(controller.update(() => { throw new Error('updater must not run'); }, metadata), false);
  }
  assert.equal(controller.value, 'original topic');
  assert.equal(events.length, 7);
  assert(events.every(event => event.inputRejected && event.beforeLength === event.afterLength));
  assert.equal(values.length, 0);
});

test('untrusted but correctly targeted input is accepted and only its boolean provenance is recorded', () => {
  const { controller, events } = input();
  controller.update('legitimate automation or paste', { ...field('paste'), trusted: false });
  assert.equal(controller.value, 'legitimate automation or paste');
  assert.equal(events[0].inputTrusted, false);
});

test('typing of different trust provenance is never represented by the first event alone', () => {
  const { controller, events } = input();
  controller.update('trusted edit', { ...field(), trusted: true });
  controller.update('script dispatched edit', { ...field(), trusted: false });
  controller.flush('blur');
  assert.deepEqual(events.map(e => [e.inputTrusted, e.changeCount]), [[true, 1], [false, 1]]);
});

test('input diagnostics whitelist metadata and never retain supplied content or clipboard data', () => {
  const row = makeDiagnosticEvent('workflow.input', { inputReason: 'paste', inputSource: 'textarea', inputField: MANUAL_TOPIC_FIELD_ID, inputTarget: MANUAL_TOPIC_FIELD_ID,
    inputType: 'insertFromPaste', beforeLength: 10, afterLength: 20, firstChangedAt: 100, lastChangedAt: 110, changeCount: 1,
    scenarioEqualsBefore: false, scenarioEqualsAfter: true, flushReason: 'before-change', value: 'PRIVATE_TEXT', clipboard: 'SECRET_CLIPBOARD', failureContext: { userTopic: 'PRIVATE_TOPIC' } });
  assert.equal(row.inputReason, 'paste');
  assert.equal(row.afterLength, 20);
  assert.equal(row.scenarioEqualsAfter, true);
  assert.doesNotMatch(JSON.stringify(row), /PRIVATE|SECRET|failureContext|clipboard/);
});

test('JSON export flushes pending typing before reading persisted events, without one event per key', async () => {
  const controller = createManualTopicInput({ setValue() {}, record: recordDiagnostic });
  const unsubscribe = subscribeDiagnosticInputFlush(() => controller.flush('export'));
  try {
    for (let n = 1; n <= 300; n++) controller.update('x'.repeat(n), field());
    const report = await readDiagnostics();
    const input = report.events.filter(row => row.event === 'workflow.input');
    assert.equal(input.length, 1);
    assert.equal(input[0].changeCount, 300);
    assert.equal(input[0].afterLength, 300);
    assert.equal(input[0].flushReason, 'export');
    assert(!Object.hasOwn(input[0], 'runId'), 'input edits must not inherit a previous API run');
    assert.doesNotMatch(JSON.stringify(input), /xxxxxxxxxx/);
  } finally { unsubscribe(); }
});
