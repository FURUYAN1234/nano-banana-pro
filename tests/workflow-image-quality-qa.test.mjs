import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image generation displays the received image before running one visible combined quality gate', () => {
  const renderIndex = workflowSource.indexOf('setGeneratedImage(finalImageStr)');
  const qaIndex = workflowSource.indexOf('const qualityOutcome = await runImageQualityFailsafe');

  assert.ok(renderIndex >= 0);
  assert.ok(qaIndex > renderIndex);
  assert.match(workflowSource, /buildImageQualityQaImageParts\(\{[\s\S]*candidate,[\s\S]*referenceImages:\s*images/);
  assert.match(workflowSource, /referenceImageCount:\s*qualityImageParts\.length - 1/);
  assert.match(workflowSource, /callAI\([\s\S]*qualityPrompt,[\s\S]*qualityImageParts/);
  assert.match(workflowSource, /\[QUALITY QA\].*キャラクターシート・人物・手・小物・吹き出し/);
  assert.match(workflowSource, /formatImageQualityIssue/);
  assert.match(workflowSource, /qualityResult\.pass/);
  assert.match(workflowSource, /const qualityMode = inferImageQualityMode\(currentPrompt\)/);
  assert.match(workflowSource, /buildImageQualityQaPrompt\(\{[\s\S]*scenario,[\s\S]*castList,[\s\S]*finalPrompt:\s*candidatePrompt,[\s\S]*mode:\s*qualityMode,[\s\S]*referenceImageCount/);
  assert.match(workflowSource, /originalPrompt: currentPrompt,[\s\S]*mode: qualityMode,/);
});

test('quality failure uses one bounded repair candidate and falls back to the saved original without stopping', () => {
  assert.doesNotMatch(workflowSource, /buildImageAnatomyRetryPrompt|VISUAL_QA_MAX_RETRIES|visualQaAttempt/);
  assert.match(workflowSource, /runImageQualityFailsafe/);
  assert.match(workflowSource, /fallbackToOriginal/);
  assert.match(workflowSource, /保存済みの元画像/);
  assert.doesNotMatch(workflowSource, /品質ゲート.*自動処理を停止/);
  assert.match(workflowSource, /Image successfully generated \(quality warning\)/);
  assert.match(workflowSource, /画像品質レビューは未確認です。画像の具体的な問題は検出されていません。/);
});
