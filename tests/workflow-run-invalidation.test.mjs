import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflow = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('scenario enhancement and revert invalidate previously assembled output', () => {
  const enhance = workflow.slice(workflow.indexOf('const enhanceScenario ='), workflow.indexOf('const revertScenario ='));
  const revert = workflow.slice(workflow.indexOf('const revertScenario ='), workflow.indexOf('const generateScenarioFromNews ='));
  assert.match(enhance, /const enhanceEpoch = scenarioRunEpochRef\.current/);
  assert.match(enhance, /if \(enhanceEpoch !== scenarioRunEpochRef\.current\) return/);
  assert.match(enhance, /invalidateScenarioOutput\(\);[\s\S]*setScenario\(result\.text\)/);
  assert.match(revert, /invalidateScenarioOutput\(\);[\s\S]*setScenario\(originalScenario\)/);
});

test('resets and a new full-auto round invalidate in-flight work before clearing UI', () => {
  for (const name of ['partialReset', 'hardReset', 'runFullAuto']) {
    const start = workflow.indexOf(`const ${name} =`);
    const end = workflow.indexOf('\n  };', start);
    assert.ok(start >= 0 && end > start, name);
    assert.match(workflow.slice(start, end), /invalidateScenarioRun\(\)/, name);
  }
});

test('hard reset clears session story comparison data before clearing public history', () => {
  const hardReset = workflow.slice(workflow.indexOf('const hardReset ='), workflow.indexOf('\n  };', workflow.indexOf('const hardReset =')));
  assert.match(hardReset, /recentScenarioTextsRef\.current = \[\];[\s\S]*setGenerationHistory\(\[\]\)/);
});

test('image generation discards stale API and QA results after reset', () => {
  const generation = workflow.slice(workflow.indexOf('const generateImageOnce ='), workflow.indexOf('const runPolicyAutoRetries ='));
  assert.match(generation, /await generateImageCandidate\(currentPrompt\);[\s\S]*if \(qualityRunEpoch !== scenarioRunEpochRef\.current\) return false;[\s\S]*setGeneratedImage\(finalImageStr\)/);
  assert.match(generation, /await runImageQualityFailsafe\([\s\S]*if \(qualityRunEpoch !== scenarioRunEpochRef\.current\) return false;[\s\S]*setGeneratedImage\(acceptedImageStr\)/);
});

test('file input serializes drops and releases analysis state after read failures', () => {
  const input = workflow.slice(workflow.indexOf('const processFiles ='), workflow.indexOf('const enhanceScenario ='));
  assert.match(input, /if \(isAnalyzingRef\.current\) \{/);
  assert.match(input, /let castRevisionAtStart = castRevisionRef\.current/);
  assert.match(input, /isAnalyzingRef\.current = true/);
  assert.match(input, /await readFileAsDataURL\(file\)/);
  assert.match(input, /if \(inputEpoch !== scenarioRunEpochRef\.current\) return;[\s\S]*setCastList\(reconcileReferenceCast/);
  assert.match(input, /if \(castRevisionAtStart !== castRevisionRef\.current\) \{[\s\S]*return;[\s\S]*\}[\s\S]*setCastList\(reconcileReferenceCast/);
  assert.match(input, /finally \{[\s\S]*clearInterval\(thinkTimer\);[\s\S]*setIsAnalyzing\(false\);[\s\S]*isAnalyzingRef\.current = false/);
});
