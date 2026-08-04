import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image generation renders the received image without hidden vision QA or automatic regeneration', () => {
  assert.match(workflowSource, /setGeneratedImage\(finalImageStr\)/);
  assert.doesNotMatch(workflowSource, /buildImageAnatomyQaPrompt/);
  assert.doesNotMatch(workflowSource, /parseImageAnatomyQaResponse/);
  assert.doesNotMatch(workflowSource, /buildImageAnatomyRetryPrompt/);
  assert.doesNotMatch(workflowSource, /VISUAL_QA_MAX_RETRIES/);
  assert.doesNotMatch(workflowSource, /Regenerating once with anatomy correction/);
});
