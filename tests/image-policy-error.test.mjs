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

for (const modifiedPrompt of ['original prompt', '  original\n\t prompt  ']) {
  test(`does not resend an unchanged policy prompt (${JSON.stringify(modifiedPrompt)})`, async () => {
    let repairs = 0;
    const result = await retryImagePolicyGeneration({
      initialPrompt: 'original prompt', initialPolicyError: 'generic refusal',
      repairPrompt: async () => { repairs++; return { success: true, modifiedPrompt }; },
      generateImage: async () => assert.fail('unchanged repair must not spend another image request'),
    });
    assert.equal(result.reason, 'policy_retry_exhausted');
    assert.equal(result.lastRepairReason, 'no_prompt_change');
    assert.equal(result.attempts, 0);
    assert.equal(repairs, 5);
    assert.equal(result.prompt, 'original prompt');
    assert.deepEqual(result.promptHistory, ['original prompt']);
  });
}

test('stops a cycle before resending any previously rejected prompt', async () => {
  const generated = [];
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'generic refusal',
    repairPrompt: async ({ attempt }) => ({ success: true, modifiedPrompt: attempt === 1 ? 'revised' : ' original\n' }),
    generateImage: async ({ prompt }) => { generated.push(prompt); return { success: false, policyError: 'generic refusal' }; },
  });
  assert.equal(result.reason, 'policy_retry_exhausted');
  assert.equal(result.lastRepairReason, 'repeated_prompt');
  assert.equal(result.attempts, 1);
  assert.deepEqual(generated, ['revised']);
  assert.equal(result.prompt, 'revised');
  assert.deepEqual(result.promptHistory, ['original', 'revised']);
});

test('rejects a broken repair contract before adopting the prompt or requesting an image', async () => {
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'generic refusal',
    repairPrompt: async () => ({ success: true, modifiedPrompt: 'changed but invalid' }),
    validatePrompt: () => { throw new Error('Required rendering setting changed'); },
    generateImage: async () => assert.fail('invalid repair must not reach image API'),
  });
  assert.equal(result.reason, 'policy_retry_exhausted');
  assert.equal(result.lastRepairReason, 'invalid_repair');
  assert.equal(result.attempts, 0);
  assert.equal(result.repairError, 'Required rendering setting changed');
  assert.equal(result.prompt, 'original');
  assert.deepEqual(result.promptHistory, ['original']);
});

test('a generic repeated refusal does not prevent genuinely changed valid attempts', async () => {
  const checked = [], generated = [];
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'generic refusal',
    repairPrompt: async ({ attempt }) => ({ success: true, modifiedPrompt: `revision ${attempt}` }),
    validatePrompt: prompt => checked.push(prompt),
    generateImage: async ({ prompt, attempt }) => { generated.push(prompt); return attempt === 2 ? { success: true } : { success: false, policyError: 'generic refusal' }; },
  });
  assert.equal(result.success, true);
  assert.equal(result.attempts, 2);
  assert.deepEqual(checked, ['revision 1', 'revision 2']);
  assert.deepEqual(generated, checked);
});

for (const defect of ['unchanged', 'invalid', 'no_safe_revision']) {
  test(`replans a ${defect} proposal with feedback and generates the next valid proposal`, async () => {
    const generated = [], events = [];
    const result = await retryImagePolicyGeneration({
      initialPrompt: 'original', initialPolicyError: 'generic refusal',
      repairPrompt: async ({ attempt, repairFeedback }) => {
        if (attempt === 1) return defect === 'no_safe_revision'
          ? { success: false, reason: defect, message: 'No permissible change identified' }
          : { success: true, modifiedPrompt: defect === 'invalid' ? 'broken setting' : 'original' };
        assert.match(repairFeedback, defect === 'invalid' ? /Required setting changed/ : defect === 'unchanged' ? /no_prompt_change/ : /No permissible change identified/);
        return { success: true, modifiedPrompt: 'valid new solution' };
      },
      validatePrompt: prompt => { if (prompt === 'broken setting') throw new Error('Required setting changed'); },
      onAttempt: event => events.push(event.phase),
      generateImage: async ({ prompt }) => { generated.push(prompt); return { success: true }; },
    });
    assert.equal(result.success, true);
    assert.equal(result.attempts, 1);
    assert.equal(result.repairAttempts, 2);
    assert.deepEqual(generated, ['valid new solution']);
    assert.deepEqual(result.promptHistory, ['original', 'valid new solution']);
    assert.deepEqual(events, ['repair', 'replan', 'repair', 'generate']);
  });
}

test('a rejected cycle becomes feedback for a different plan instead of ending the workflow', async () => {
  const generated = [];
  const result = await retryImagePolicyGeneration({
    initialPrompt: 'original', initialPolicyError: 'generic refusal',
    repairPrompt: async ({ attempt, repairFeedback }) => {
      if (attempt === 3) {
        assert.match(repairFeedback, /repeated_prompt/);
        assert.match(repairFeedback, /first revision/);
      }
      return { success: true, modifiedPrompt: ['first revision', 'original', 'new solution'][attempt - 1] };
    },
    generateImage: async ({ prompt }) => { generated.push(prompt); return { success: prompt === 'new solution', policyError: 'generic refusal' }; },
  });
  assert.equal(result.success, true);
  assert.equal(result.attempts, 2);
  assert.equal(result.repairAttempts, 3);
  assert.deepEqual(generated, ['first revision', 'new solution']);
});

test('STEP4 policy recovery keeps the last successful image and exposes the five-attempt limit', () => {
  const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const step4Source = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  const singleGenerationSource = workflowSource
    .split('const generateImageOnce = async')[1]
    ?.split('const runPolicyAutoRetries = async')[0] || '';

  assert.match(workflowSource, /retryImagePolicyGeneration/);
  assert.doesNotMatch(singleGenerationSource, /setGeneratedImage\((?:null|"")\)/);
  assert.match(step4Source, /最大5回の修正検討/);
  assert.match(step4Source, /その理由を次の検討に渡して作り直し/);
});
