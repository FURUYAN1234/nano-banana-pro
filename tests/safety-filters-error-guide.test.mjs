import assert from 'node:assert/strict';
import test from 'node:test';

import { translateApiError } from '../src/lib/safety-filters.js';
import { assertImagePromptBudget } from '../src/lib/image-prompt-budget.js';
import { assertDialogueQuoteBalance } from '../src/lib/bubble-text.js';

test('reports a scenario-content validation failure instead of a network timeout', () => {
  const guide = translateApiError('シナリオ本文の表現衛生ポリシーに違反する表現を検出しました。');

  assert.match(guide, /シナリオ本文/);
  assert.match(guide, /全3試行/);
  assert.match(guide, /後続へ渡せるシナリオが残りませんでした/);
  assert.doesNotMatch(guide, /タイムアウト/);
});

test('local validation and programming failures never claim server congestion', () => {
  for (const run of [() => assertImagePromptBudget('x'.repeat(32001)), () => assertDialogueQuoteBalance('「未完了')]) {
    assert.throws(run, error => {
      const guide = translateApiError(error);
      assert.match(guide, /入力|指示文/);
      assert.doesNotMatch(guide, /混雑|数分時間|通信エラーが発生/);
      assert.ok(guide.includes(error.message));
      return true;
    });
  }
  assert.match(translateApiError(new TypeError('value.split is not a function')), /内部エラー/);
  assert.match(translateApiError(new Error('unclassified failure')), /原因未分類/);
});

test('API failure categories give distinct, evidence-based advice and safe details', () => {
  const cases = [
    [{status:401, message:'invalid_api_key'}, /認証/],
    [{status:403, message:'permission denied'}, /権限/],
    [{status:404, message:'model not found'}, /モデル/],
    [{status:429, code:'insufficient_quota', message:'quota'}, /利用枠・残高/],
    [{status:429, message:'rate limit'}, /レート制限/],
    [{status:503, message:'Service Unavailable'}, /APIサーバー/],
    [new Error('Timeout awaiting response'), /時間切れ/],
    [new TypeError('Failed to fetch'), /ネットワーク/],
    [{code:'EMPTY_RESPONSE', message:'No text'}, /空の応答/],
    [{code:'INVALID_RESPONSE', message:'Not JSON'}, /応答形式/],
    [{code:'content_policy_violation', message:'blocked'}, /安全基準/],
  ];
  for (const [error, expected] of cases) assert.match(translateApiError(error), expected);
  const guide = translateApiError({status:401, message:'Incorrect API key: sk-proj-TESTSECRET123456; Bearer TESTTOKEN; key=AIzaTESTSECRET123456'});
  assert.doesNotMatch(guide, /TESTSECRET|TESTTOKEN/);
  assert.match(guide, /401/);
});

test('incidental words do not override HTTP evidence or turn an internal error into input advice', () => {
  assert.match(translateApiError({status:503, message:'billing safety service unavailable'}), /APIサーバー/);
  assert.match(translateApiError(new TypeError("Cannot read properties of undefined (reading '台詞')")), /内部エラー/);
  assert.match(translateApiError(new Error('request blocked by extension')), /原因未分類/);
});

test('documentary source fidelity errors are explained as local validation failures', () => {
  const guide = translateApiError('documentary source facts missing: missing anchors: 10月');

  assert.match(guide, /原文忠実性検証/);
  assert.match(guide, /通信エラーではありません/);
  assert.doesNotMatch(guide, /タイムアウト/);
});
