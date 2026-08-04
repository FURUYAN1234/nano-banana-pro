import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertManualTopicExclusions,
  buildManualTopicExclusionPrompt
} from '../src/lib/manual-topic-exclusions.js';

const MANUAL_TOPIC = `すかいらーく、消費税減税見据えテイクアウト強化へ
お金ネタ・レトロねた・都市伝説・風紀ねた禁止`;

test('manual topic exclusions reject prohibited comedy markers but retain supplied factual context', () => {
  assert.doesNotThrow(() => assertManualTopicExclusions(
    '消費税の税率差を説明し、テイクアウトの出来立て感を描く。',
    MANUAL_TOPIC
  ));

  assert.throws(
    () => assertManualTopicExclusions('財布のひもを締める節約ギャグで締める。', MANUAL_TOPIC),
    (error) => error.code === 'MANUAL_TOPIC_EXCLUSION' && /お金ネタ/.test(error.message)
  );
  assert.throws(
    () => assertManualTopicExclusions('校則違反を取り締まるオチにする。', MANUAL_TOPIC),
    (error) => error.code === 'MANUAL_TOPIC_EXCLUSION' && /風紀/.test(error.message)
  );
});

test('manual topic exclusion prompt states concrete banned-comedy markers without forbidding supplied facts', () => {
  const prompt = buildManualTopicExclusionPrompt(MANUAL_TOPIC);

  assert.match(prompt, /財布/);
  assert.match(prompt, /校則/);
  assert.match(prompt, /消費税や税率差など、入力本文に含まれる事実説明は保持/);
});
