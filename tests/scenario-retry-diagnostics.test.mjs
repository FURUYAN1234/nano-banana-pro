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
        const error = new Error('visual story evidence is incomplete');
        error.code = 'VISUAL_STORY_EVIDENCE';
        throw error;
      }
    },
    onRetry: (event) => retryEvents.push(event),
    maxAttempts: 2
  });

  assert.deepEqual(retryEvents.map(({ attempt, code, kind }) => ({ attempt, code, kind })), [
    { attempt: 1, code: 'VISUAL_STORY_EVIDENCE', kind: 'quality' }
  ]);
});

test('scenario retry UI reports the actual failed check and never claims an unrelated safety failure', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /formatScenarioRetryProgress/);
  assert.match(source, /VISUAL_STORY_EVIDENCE/);
  assert.doesNotMatch(source, /DYNAMIC_BACKGROUND/);
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

test('scenario generation makes bounded, quality-directed retries rather than hiding a generic retry', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /scenarioQualityRetryInstructions/);
  assert.match(source, /onRetry:\s*\(retry\)\s*=>\s*onProgress\(formatScenarioRetryProgress\(retry\)\)/);
  assert.match(source, /requestSafeScenario\(\{[\s\S]*?maxAttempts:\s*3[\s\S]*?\}\);/);
});

test('scenario generation retries a missing bubble contract before a prompt can be assembled', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /DIALOGUE_CONTRACT/);
  assert.match(source, /assertMangaScenarioDialogueContract/);
  assert.match(source, /DIALOGUE_CONTRACT_RETRY_INSTRUCTION/);
});

test('scenario content policy participates in the shared three-attempt quality loop', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /requestSafeScenarioContent\(\{[\s\S]*?maxAttempts:\s*1[\s\S]*?\}\)/);
  assert.match(source, /\['SCENARIO_CONTENT',\s*\(\)\s*=>\s*assertSafeScenarioContent\(scenario\)\]/);
  assert.match(source, /SCENARIO_CONTENT:\s*SAFE_CONTENT_RETRY_INSTRUCTION/);
});

test('retry progress reports the next total attempt out of three', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /試行 \$\{nextAttempt\}\/\$\{maxAttempts\}:/);
});

test('a safe scenario with a quality-gate warning remains usable after one API request', async () => {
  let requests = 0;

  const result = await requestSafeScenario({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async () => ({ text: `response ${++requests}` }),
    parseScenario: (response) => ({ location: '駅前広場', scenario: response.text }),
    validateScenario: () => {
      const error = new Error('final_panel_staging_invalid');
      error.code = 'FINAL_PANEL_STAGING';
      throw error;
    },
    maxAttempts: 1
  });

  assert.equal(requests, 1);
  assert.equal(result.parsed.scenario, 'response 1');
  assert.deepEqual(result.validationWarning, {
    code: 'FINAL_PANEL_STAGING',
    message: 'final_panel_staging_invalid',
    qualityScore: 0
  });
});

test('a quality retry keeps the final safe scenario when the quality budget is exhausted', async () => {
  const retryEvents = [];
  let requests = 0;

  const result = await requestSafeScenario({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async () => ({ text: `response ${++requests}` }),
    parseScenario: (response) => ({ location: 'station', scenario: response.text }),
    validateScenario: () => {
      const error = new Error('final_panel_staging_invalid');
      error.code = 'FINAL_PANEL_STAGING';
      throw error;
    },
    retryInstruction: ({ code }) => `QUALITY FIX: ${code}`,
    onRetry: (event) => retryEvents.push(event),
    maxAttempts: 3
  });

  assert.equal(requests, 3);
  assert.equal(result.parsed.scenario, 'response 3');
  assert.equal(result.validationWarning.code, 'FINAL_PANEL_STAGING');
  assert.deepEqual(retryEvents.map(({ attempt, code, kind }) => ({ attempt, code, kind })), [
    { attempt: 1, code: 'FINAL_PANEL_STAGING', kind: 'quality' },
    { attempt: 2, code: 'FINAL_PANEL_STAGING', kind: 'quality' }
  ]);
  assert.deepEqual(retryEvents.map(({ nextAttempt, maxAttempts }) => ({ nextAttempt, maxAttempts })), [
    { nextAttempt: 2, maxAttempts: 3 },
    { nextAttempt: 3, maxAttempts: 3 }
  ]);
});

test('a quality retry returns the highest-scoring safe scenario rather than blindly using the last response', async () => {
  let requests = 0;
  const result = await requestSafeScenario({
    initialPrompt: 'BASE PROMPT',
    requestScenario: async () => ({ text: `response ${++requests}` }),
    parseScenario: (response) => ({ location: 'station', scenario: response.text }),
    validateScenario: (parsed) => {
      const error = new Error(`quality issue in ${parsed.scenario}`);
      error.code = 'SCENARIO_QUALITY';
      error.qualityScore = parsed.scenario === 'response 2' ? 2 : 1;
      throw error;
    },
    maxAttempts: 3
  });

  assert.equal(requests, 3);
  assert.equal(result.parsed.scenario, 'response 2');
  assert.equal(result.validationWarning.message, 'quality issue in response 2');
});

test('a blocking dialogue contract retries and never returns an unusable scenario after its retry budget is exhausted', async () => {
  let requests = 0;
  const retryEvents = [];

  await assert.rejects(
    requestSafeScenario({
      initialPrompt: 'BASE PROMPT',
      requestScenario: async () => ({ text: `response ${++requests}` }),
      parseScenario: (response) => ({ location: 'station', scenario: response.text }),
      validateScenario: () => {
        const error = new Error('panel(s) without speech-bubble dialogue: 1, 2, 3, 4');
        error.code = 'DIALOGUE_CONTRACT';
        error.qualityScore = 0;
        error.blocking = true;
        throw error;
      },
      retryInstruction: ({ code }) => `QUALITY RETRY: ${code}`,
      onRetry: (event) => retryEvents.push(event),
      maxAttempts: 3
    }),
    /speech-bubble dialogue/
  );

  assert.equal(requests, 3);
  assert.deepEqual(retryEvents.map(({ attempt, code, kind }) => ({ attempt, code, kind })), [
    { attempt: 1, code: 'DIALOGUE_CONTRACT', kind: 'quality' },
    { attempt: 2, code: 'DIALOGUE_CONTRACT', kind: 'quality' }
  ]);
});

test('quality-gate warnings do not block STEP3 or STEP4', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

  assert.match(source, /\[SCENARIO QUALITY WARNING\]/);
  assert.match(source, /品質警告のままSTEP3・STEP4へ進めます/);
  assert.doesNotMatch(source, /STEP2を再実行してください/);
  assert.doesNotMatch(source, /STEP2で4コマすべてに「」付きセリフを作り直してください/);
});

test('dialogue-contract exhaustion directs the user to regenerate the scenario instead of sending a no-dialogue prompt to STEP4', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

  assert.match(source, /error\?\.code === 'DIALOGUE_CONTRACT'/);
  assert.match(source, /吹き出し用セリフを抽出できませんでした/);
  assert.match(source, /STEP2の「シナリオ生成」をもう一度実行してください/);
});
