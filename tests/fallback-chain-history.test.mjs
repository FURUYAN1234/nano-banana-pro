import test from 'node:test';
import assert from 'node:assert/strict';

import { FALLBACK_CHAINS, FALLBACK_CHAIN_SOURCE_IDS } from '../src/lib/fallback-chain-history.js';
import {
  OPENAI_TEXT_MODEL_IDS,
  OPENAI_SCENARIO_TEXT_MODEL_IDS,
  OPENAI_VISION_MODEL_IDS,
} from '../src/lib/openai-model-routes.js';
import {
  DEFAULT_OPENAI_IMAGE_QUALITY,
  FALLBACK_OPENAI_IMAGE_QUALITY,
  OPENAI_IMAGE_MODEL,
  resolveOpenAIImageOption,
} from '../src/lib/openai-image-settings.js';

const chainModels = (id) => {
  const chain = FALLBACK_CHAINS.find((candidate) => candidate.id === id);
  assert.ok(chain, `missing fallback-chain snapshot: ${id}`);
  return chain.models.map(({ id: modelId }) => modelId);
};

test('the STEP2 OpenAI snapshot starts with the active scenario route', () => {
  assert.strictEqual(FALLBACK_CHAIN_SOURCE_IDS['step2-openai'], OPENAI_SCENARIO_TEXT_MODEL_IDS);
  assert.deepEqual(chainModels('step2-openai'), OPENAI_SCENARIO_TEXT_MODEL_IDS);
});

test('the STEP1 and STEP3 OpenAI chains use their active routes', () => {
  assert.strictEqual(FALLBACK_CHAIN_SOURCE_IDS['step1-openai'], OPENAI_VISION_MODEL_IDS);
  assert.strictEqual(FALLBACK_CHAIN_SOURCE_IDS['step3-openai'], OPENAI_TEXT_MODEL_IDS);
  assert.deepEqual(chainModels('step1-openai'), OPENAI_VISION_MODEL_IDS);
  assert.deepEqual(chainModels('step3-openai'), OPENAI_TEXT_MODEL_IDS);
});

test('the STEP4 OpenAI snapshot distinguishes its default model from selectable alternatives', () => {
  const chain = FALLBACK_CHAINS.find((candidate) => candidate.id === 'step4-openai');
  assert.deepEqual(chain.models.map(({ id }) => id), [
    resolveOpenAIImageOption(DEFAULT_OPENAI_IMAGE_QUALITY).model,
    OPENAI_IMAGE_MODEL,
    resolveOpenAIImageOption(FALLBACK_OPENAI_IMAGE_QUALITY).model,
  ]);
  assert.equal(chain.models[0].role, 'Default');
  assert.equal(chain.models[1].role, 'Selectable');
  assert.equal(chain.models[2].role, 'Fallback');
  assert.deepEqual(FALLBACK_CHAIN_SOURCE_IDS['step4-openai'], chain.models.map(({ id }) => id));
});
