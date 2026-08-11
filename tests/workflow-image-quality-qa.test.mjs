import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image generation displays the received image before running one visible combined quality gate', () => {
  const renderIndex = workflowSource.indexOf('setGeneratedImage(finalImageStr)');
  const qaIndex = workflowSource.indexOf('const qualityPrompt = buildImageQualityQaPrompt');

  assert.ok(renderIndex >= 0);
  assert.ok(qaIndex > renderIndex);
  assert.match(workflowSource, /inlineData:\s*\{\s*mimeType:\s*generatedMimeType,\s*data:\s*normalizedBase64Img/);
  assert.match(workflowSource, /\[QUALITY QA\].*人物・手・小物・吹き出し/);
  assert.match(workflowSource, /formatImageQualityIssue/);
  assert.match(workflowSource, /qualityResult\.pass/);
  assert.match(workflowSource, /buildImageQualityQaPrompt\(\{ scenario, castList, finalPrompt: currentPrompt \}\)/);
});

test('quality failure keeps the image visible, stops full auto, and never auto-regenerates', () => {
  assert.doesNotMatch(workflowSource, /buildImageAnatomyRetryPrompt|VISUAL_QA_MAX_RETRIES|visualQaAttempt/);
  assert.doesNotMatch(workflowSource, /regenerateImage\([^)]*quality|regenerateImage\([^)]*qa/i);
  assert.match(workflowSource, /if \(!qualityResult\.pass\)[\s\S]*?return false;/);

  const qualityBranch = workflowSource.slice(workflowSource.indexOf('if (!qualityResult.pass)'));
  assert.doesNotMatch(qualityBranch.slice(0, qualityBranch.indexOf('return false;')), /setGeneratedImage\(null\)/);
});
