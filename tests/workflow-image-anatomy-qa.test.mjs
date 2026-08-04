import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image generation runs vision anatomy QA before accepting an output and retries one rejected image', () => {
  assert.match(workflowSource, /buildImageAnatomyQaPrompt/);
  assert.match(workflowSource, /parseImageAnatomyQaResponse/);
  assert.match(workflowSource, /buildImageAnatomyRetryPrompt/);
  assert.match(workflowSource, /const visualQaImage = enableOpenAIApi[\s\S]{0,200}finalImageStr/);
  assert.match(workflowSource, /callAI\(\s*buildImageAnatomyQaPrompt[\s\S]{0,500}\[visualQaImage\]/);
  assert.match(workflowSource, /VISUAL_QA_MAX_RETRIES\s*=\s*1/);
  assert.match(workflowSource, /buildImageAnatomyRetryPrompt\(currentPrompt, visualQa\.issues\)/);
});
