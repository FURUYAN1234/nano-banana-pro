import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { isImagePolicyError } from '../src/lib/image-policy-error.js';
import {
  MAX_IMAGE_POLICY_RETRIES,
  retryImagePolicyGeneration,
} from '../src/lib/image-policy-retry.js';

test('recognizes OpenAI safety-system rejections as policy errors', () => {
  assert.equal(
    isImagePolicyError('Your request was rejected by the safety system.'),
    true
  );
});

test('does not misclassify a timeout as a policy error', () => {
  assert.equal(isImagePolicyError('Request timed out after 120 seconds.'), false);
});

test('automatically repairs and retries policy-blocked image generation up to five times', async () => {
  const repairAttempts = [];
  const generationAttempts = [];

  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original prompt',
    initialPolicyError: 'content_policy_violation',
    repairPrompt: async ({ prompt, attempt }) => {
      repairAttempts.push({ prompt, attempt });
      return { success: true, modifiedPrompt: `${prompt} repaired-${attempt}` };
    },
    generateImage: async ({ prompt, attempt }) => {
      generationAttempts.push({ prompt, attempt });
      return { success: false, policyError: 'rejected by safety system' };
    },
  });

  assert.equal(MAX_IMAGE_POLICY_RETRIES, 5);
  assert.equal(result.success, false);
  assert.equal(result.reason, 'policy_retry_exhausted');
  assert.equal(result.attempts, 5);
  assert.equal(repairAttempts.length, 5);
  assert.equal(generationAttempts.length, 5);
  assert.equal(result.promptHistory.length, 6);
  assert.equal(result.promptHistory[0], 'original prompt');
});

test('stops policy retries as soon as a repaired image succeeds', async () => {
  const generatedPrompts = [];

  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original prompt',
    initialPolicyError: 'content policy rejection',
    repairPrompt: async ({ prompt, attempt }) => ({
      success: true,
      modifiedPrompt: `${prompt} repaired-${attempt}`,
    }),
    generateImage: async ({ prompt, attempt }) => {
      generatedPrompts.push(prompt);
      return attempt === 2
        ? { success: true }
        : { success: false, policyError: 'content policy rejection' };
    },
  });

  assert.equal(result.success, true);
  assert.equal(result.attempts, 2);
  assert.equal(generatedPrompts.length, 2);
  assert.equal(result.promptHistory.length, 3);
});

test('stops automatic policy repair when image generation fails for another reason', async () => {
  let repairCount = 0;

  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original prompt',
    initialPolicyError: 'content policy rejection',
    repairPrompt: async ({ prompt }) => {
      repairCount += 1;
      return { success: true, modifiedPrompt: `${prompt} repaired` };
    },
    generateImage: async () => ({ success: false, policyError: '' }),
  });

  assert.equal(result.success, false);
  assert.equal(result.reason, 'generation_failed');
  assert.equal(result.attempts, 1);
  assert.equal(repairCount, 1);
});

test('STEP4 policy recovery keeps the last successful image and exposes the five-attempt limit', () => {
  const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const step4Source = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  const singleGenerationSource = workflowSource
    .split('const generateImageOnce = async')[1]
    ?.split('const runPolicyAutoRetries = async')[0] || '';

  assert.match(workflowSource, /retryImagePolicyGeneration/);
  assert.doesNotMatch(singleGenerationSource, /setGeneratedImage\((?:null|"")\)/);
  assert.match(step4Source, /最大5回・画像APIを再利用/);
});
