import assert from 'node:assert/strict';
import test from 'node:test';

import {
  assertSafeScenarioContent,
  requestSafeScenarioContent
} from '../src/lib/scenario-content-policy.js';

test('rejects unsafe biological and weaponized wording across the full scenario text', () => {
  assert.throws(
    () => assertSafeScenarioContent({
      title: '冷たい新作スイーツ',
      logline: '教室の新作を紹介する',
      scenario: '牛の分泌液を使った生物兵器のような料理を披露する'
    }),
    /表現衛生/
  );
});

test('allows harmless comedy and retries once with a safe rewrite instruction', async () => {
  const prompts = [];
  const responses = [
    { title: '危険な比喩', scenario: '生物兵器みたいな見た目で笑いを取る' },
    { title: '安全な比喩', scenario: '宇宙食みたいな見た目で笑いを取る' }
  ];

  const result = await requestSafeScenarioContent({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async (prompt) => {
      prompts.push(prompt);
      return responses[prompts.length - 1];
    },
    onRetry: () => {},
    maxAttempts: 2
  });

  assert.equal(result.attempts, 2);
  assert.equal(result.parsed.title, '安全な比喩');
  assert.match(prompts[1], /SAFE SCENARIO CONTENT RETRY/);
});

test('fails closed after two unsafe scenario responses', async () => {
  await assert.rejects(
    requestSafeScenarioContent({
      initialPrompt: 'BASE PROMPT',
      requestScenario: async () => ({ scenario: 'body-horror flesh weapon' }),
      onRetry: () => {},
      maxAttempts: 2
    }),
    /表現衛生/
  );
});
