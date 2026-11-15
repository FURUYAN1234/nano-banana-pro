export const MANUAL_TOPIC_FIELD_ID = 'manual-topic-input';
export const SCENARIO_FIELD_ID = 'generated-scenario';
const sources = Object.freeze({ typing: 'textarea', paste: 'textarea', voice: 'dictation', 'reference-remap': 'reference-remap', reset: 'reset' });
const inputTypes = new Set(['insertText', 'insertFromPaste', 'insertFromDrop', 'insertLineBreak', 'insertCompositionText', 'deleteContentBackward', 'deleteContentForward', 'historyUndo', 'historyRedo']);
const flushReasons = new Set(['blur', 'next-step', 'before-change', 'export', 'unmount']);

// Own all topic writes. Diagnostic failure must never interfere with editing.
// Keystrokes are one pending transaction, not one persisted event per key.
export function createManualTopicInput({ initialValue = '', setValue, record, now = Date.now }) {
  let value = initialValue, scenario = '', pending = null;
  const emit = entry => { try { record('workflow.input', entry); } catch { /* observation only */ } };
  const flush = reason => {
    if (!flushReasons.has(reason)) throw new TypeError('Manual topic input: unknown flush reason');
    if (pending) { const entry = pending; pending = null; emit({ ...entry, flushReason: reason }); }
  };
  return {
    get value() { return value; },
    observeScenario(next) { scenario = String(next || ''); },
    flush,
    update(nextValue, metadata = {}) {
      const { reason, source, fieldId, targetId, inputType, trusted } = metadata && typeof metadata === 'object' ? metadata : {};
      const knownReason = Object.hasOwn(sources, reason);
      const wrongField = source === 'textarea' && (fieldId !== MANUAL_TOPIC_FIELD_ID || targetId !== MANUAL_TOPIC_FIELD_ID);
      if (!knownReason || sources[reason] !== source || wrongField) {
        flush('before-change');
        const field = id => [MANUAL_TOPIC_FIELD_ID, SCENARIO_FIELD_ID].includes(id) ? id : 'other';
        emit({ inputRejected: true, rejectionReason: !knownReason ? 'invalid-reason' : wrongField ? 'wrong-field' : 'wrong-source',
          ...(knownReason ? { inputReason: reason } : {}), inputSource: Object.values(sources).includes(source) ? source : 'other',
          inputField: field(fieldId), inputTarget: field(targetId), beforeLength: value.length, afterLength: value.length,
          changeCount: 0, ...(typeof trusted === 'boolean' ? { inputTrusted: trusted } : {}) });
        return false;
      }
      const next = typeof nextValue === 'function' ? nextValue(value) : nextValue;
      if (typeof next !== 'string') throw new TypeError('Manual topic input: value must be text');
      if (reason !== 'typing') flush('before-change');
      if (next === value) return;
      const changedAt = now();
      const entry = { inputReason: reason, inputSource: source,
        inputField: MANUAL_TOPIC_FIELD_ID, ...(source === 'textarea' ? { inputTarget: targetId, inputType: inputTypes.has(inputType) ? inputType : 'other' } : {}),
        ...(typeof trusted === 'boolean' ? { inputTrusted: trusted } : {}),
        beforeLength: value.length, afterLength: next.length, changeCount: 1,
        firstChangedAt: changedAt, lastChangedAt: changedAt,
        scenarioEqualsBefore: value === scenario, scenarioEqualsAfter: next === scenario };
      if (reason === 'typing' && pending && pending.inputTrusted !== entry.inputTrusted) flush('before-change');
      value = next;
      setValue(next);
      if (reason === 'typing') {
        pending = pending ? { ...pending, afterLength: entry.afterLength, lastChangedAt: changedAt,
          changeCount: pending.changeCount + 1, scenarioEqualsAfter: entry.scenarioEqualsAfter,
          inputType: pending.inputType === entry.inputType ? entry.inputType : 'other' } : entry;
      } else emit({ ...entry, flushReason: 'before-change' });
    },
  };
}
