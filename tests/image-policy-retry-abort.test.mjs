import assert from 'node:assert/strict';
import test from 'node:test';
import { retryImagePolicyGeneration } from '../src/lib/image-policy-retry.js';

test('a stopped policy repair never sends another image request', async () => {
  let stopped = false;
  let generations = 0;
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'rejected',
    shouldStop: () => stopped,
    repairPrompt: async () => { stopped = true; return { success: true, modifiedPrompt: 'safe' }; },
    generateImage: async () => { generations += 1; return { success: true }; },
  });
  assert.equal(result.reason, 'cancelled');
  assert.equal(generations, 0);
});

test('a stopped policy retry does not begin its next repair', async () => {
  let stopped = false;
  let repairs = 0;
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'rejected',
    shouldStop: () => stopped,
    repairPrompt: async () => { repairs += 1; return { success: true, modifiedPrompt: 'safe' }; },
    generateImage: async () => { stopped = true; return { success: false, policyError: 'again' }; },
  });
  assert.equal(result.reason, 'cancelled');
  assert.equal(repairs, 1);
});
