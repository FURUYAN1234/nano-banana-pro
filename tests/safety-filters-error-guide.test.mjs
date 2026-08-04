import assert from 'node:assert/strict';
import test from 'node:test';

import { translateApiError } from '../src/lib/safety-filters.js';

test('reports a dynamic-background validation failure instead of a network timeout', () => {
  const guide = translateApiError('dynamic_background_invalid: background_unsafe');

  assert.match(guide, /背景設計/);
  assert.doesNotMatch(guide, /タイムアウト/);
});

test('reports a scenario-content validation failure instead of a network timeout', () => {
  const guide = translateApiError('シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。');

  assert.match(guide, /シナリオ本文/);
  assert.doesNotMatch(guide, /タイムアウト/);
});
