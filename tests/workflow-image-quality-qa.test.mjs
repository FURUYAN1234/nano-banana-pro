import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image generation displays the received image before running one visible combined quality gate', () => {
  const renderIndex = workflowSource.indexOf('setGeneratedImage(finalImageStr)');
  const qaIndex = workflowSource.indexOf('const qualityOutcome = await runImageQualityFailsafe');

  assert.ok(renderIndex >= 0);
  assert.ok(qaIndex > renderIndex);
  assert.match(workflowSource, /buildImageQualityQaImageParts\(\{[\s\S]*candidate,[\s\S]*panelImages,[\s\S]*referenceImages:\s*images/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length/);
  assert.match(workflowSource, /panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /callAI\([\s\S]*qualityPrompt,[\s\S]*qualityImageParts/);
  assert.match(workflowSource, /\[QUALITY QA\].*キャラクターシート・人物・手・小物・吹き出し/);
  assert.match(workflowSource, /formatImageQualityIssue/);
  assert.match(workflowSource, /qualityOutcome\.validationWarning/);
  assert.match(workflowSource, /const qualityMode = inferImageQualityMode\(currentPrompt\)/);
  assert.match(workflowSource, /parseImageQualityQaResponse\(qualityResponse.text, \{[\s\S]*mode: qualityMode,[\s\S]*finalPrompt: candidatePrompt,[\s\S]*referenceImageCount:\s*images\.length/);
  assert.match(workflowSource, /buildImageQualityQaPrompt\(\{[\s\S]*scenario,[\s\S]*castList,[\s\S]*finalPrompt:\s*candidatePrompt,[\s\S]*mode:\s*qualityMode/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length,[\s\S]*panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /originalPrompt: currentPrompt,[\s\S]*mode: qualityMode,/);
});

test('best available fallback continues with a warning while explicit cancellation stops', () => {
  assert.match(workflowSource, /if \(!qualityOutcome.canContinue\) \{[\s\S]*?fullAutoAbortRef.current = true;[\s\S]*?return false;/);
  assert.match(workflowSource, /Best available image selected \(quality warning\)/);
  assert.match(workflowSource, /qualityOutcome.candidates.reduce/);
  assert.match(workflowSource, /analyzeFailure: async[\s\S]*buildImageFailureAnalysisPrompt/);
  assert.match(workflowSource, /shouldStop:.*qualityRetryAbortRef.current/);
});

test('OpenAI generation binds initial references and the actual repair source', () => {
  assert.match(workflowSource, /buildOpenAIReferencePlan\(\{[\s\S]*?characterImages:\s*images/);
  assert.match(workflowSource, /backgroundImage:\s*bg360Image/);
  assert.match(workflowSource, /backgroundEnabled:\s*bg360Enabled/);
  assert.match(workflowSource, /originalCandidate:\s*repairSource/);
  assert.match(workflowSource, /appendOpenAIReferencePrompt\(prompt, referencePlan\)/);
  assert.match(workflowSource, /imageInputs:\s*referencePlan\.imageInputs/);
  assert.match(workflowSource, /sourceCandidate = originalCandidate/);
  assert.match(workflowSource, /repairSource:\s*isOpenAIEngine\s*\?\s*sourceCandidate\s*:\s*null/);
  assert.match(workflowSource, /finalPrompt: originalPrompt, \.\.\.comparisonOptions/);
});
