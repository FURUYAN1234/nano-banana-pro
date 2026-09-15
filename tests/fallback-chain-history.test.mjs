import test from 'node:test';
import assert from 'node:assert/strict';

import { FALLBACK_CHAINS } from '../src/lib/fallback-chain-history.js';

const chainModels = (id) => {
  const chain = FALLBACK_CHAINS.find((candidate) => candidate.id === id);
  assert.ok(chain, `missing fallback-chain snapshot: ${id}`);
  return chain.models.map(({ id: modelId }) => modelId);
};

test('the STEP2 OpenAI snapshot starts with the active scenario route', () => {
  assert.deepEqual(chainModels('step2-openai'), [
    'gpt-6-astra',
    'gpt-5.6-sol',
    'gpt-4.1',
    'gpt-4.1-mini',
    'gpt-4.1-nano',
    'gpt-4o',
  ]);
});

test('the STEP4 OpenAI snapshot distinguishes its default model from selectable alternatives', () => {
  const chain = FALLBACK_CHAINS.find((candidate) => candidate.id === 'step4-openai');
  assert.deepEqual(chain.models.map(({ id }) => id), [
    'gpt-image-2.5-sunburst',
    'gpt-image-2.5-flare',
    'gpt-image-2',
  ]);
  assert.equal(chain.models[0].role, 'Default');
  assert.equal(chain.models[1].role, 'Selectable');
  assert.equal(chain.models[2].role, 'Fallback');
});
