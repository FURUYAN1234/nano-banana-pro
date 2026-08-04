import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { requestSafeScenario } from '../src/lib/location-policy.js';

test('scenario retry passes the rejected validation code to its progress callback', async () => {
  const retryEvents = [];
  let attempts = 0;

  await requestSafeScenario({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async () => ({ text: `response ${++attempts}` }),
    parseScenario: (response) => ({ location: 'library', scenario: response.text }),
    validateScenario: (parsed) => {
      if (parsed.scenario === 'response 1') {
        const error = new Error('dynamic background is incomplete');
        error.code = 'DYNAMIC_BACKGROUND';
        throw error;
      }
    },
    onRetry: (event) => retryEvents.push(event)
  });

  assert.deepEqual(retryEvents, [{ attempt: 1, code: 'DYNAMIC_BACKGROUND' }]);
});

test('scenario retry UI reports the actual failed check and never claims an unrelated safety failure', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /formatScenarioRetryProgress/);
  assert.match(source, /DYNAMIC_BACKGROUND/);
  assert.doesNotMatch(source, /舞台の安全性、動的背景設計、または出来事を証明する視覚要素/);
});

test('scenario waiting UI never pretends to scan external news when no such request runs', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

  assert.doesNotMatch(source, /グローバルニュースデータベースをスキャン中/);
  assert.doesNotMatch(source, /トレンドトピックをクロスリファレンス中/);
  assert.doesNotMatch(source, /ナラティブフレームワークを構築中/);
});

test('manual scenario input is labelled as user-provided rather than verified external fact', async () => {
  const source = await readFile(new URL('../src/lib/prompts.js', import.meta.url), 'utf8');
  const providerSource = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /ユーザー入力は外部事実として断定しない/);
  assert.match(source, /思考トレースでは「ユーザー提供トピック」と明記する/);
  assert.match(source, /inputMode === 'manual' \? 'ユーザー提供トピックが反映されているか'/);
  assert.doesNotMatch(providerSource, /「ニュースソース」として扱い/);
  assert.doesNotMatch(providerSource, /LLMの内部知識で補完/);
});

test('scenario generation keeps one final background-validation attempt after a content rewrite', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /requestSafeScenario\(\{[\s\S]*?maxAttempts:\s*3[\s\S]*?\}\);/);
});
