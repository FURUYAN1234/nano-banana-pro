import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('full-auto image generation assembles a ChatGPT prompt when the active API engine is OpenAI', () => {
  assert.doesNotMatch(
    source,
    /assemblePrompt\(\s*true\s*,\s*generatedScenario\s*,\s*false\s*\)/,
    'full-auto must not force Gemini prompt assembly while ChatGPT/OpenAI image generation is active'
  );
  assert.doesNotMatch(
    source,
    /fullAutoChatGPTPromptMode/,
    'full-auto must not reduce provider selection to the legacy ChatGPT boolean'
  );
  assert.match(
    source,
    /const\s+fullAutoProviderFamily\s*=\s*getCurrentPromptProviderFamily\(\s*\)\s*;/,
    'full-auto prompt family should follow the active provider family'
  );
  assert.match(
    source,
    /assemblePrompt\(\s*true\s*,\s*generatedScenario\s*,\s*fullAutoProviderFamily\s*\)/,
    'full-auto should pass the explicit providerFamily into prompt assembly'
  );
});

test('a stale legacy provider flag self-heals to one OpenAI engine state before any workflow action', () => {
  assert.match(
    source,
    /const effectiveEngine = getEffectiveEngine\(selectedEngine, enableOpenAIApi\);\s*const isOpenAIEngine = effectiveEngine === 'openai';/,
    'the workflow needs one effective provider predicate'
  );
  assert.match(
    source,
    /if \(isOpenAIEngine && selectedEngine !== 'openai'\) \{\s*setSelectedEngine\('openai'\);\s*setActiveEngine\('openai'\);/,
    'an OpenAI image flag must repair the stale display and text-route engine state'
  );
  assert.match(
    source,
    /if \(isOpenAIEngine && !enableOpenAIApi\) \{\s*setEnableOpenAIApi\(true\);/,
    'an OpenAI text-route state must repair the stale image-route flag'
  );
  assert.match(
    source,
    /if \(isOpenAIEngine\) \{\s*statCallback[\s\S]*?generateImageWithOpenAI/,
    'STEP4 image execution must use that same effective OpenAI state'
  );
});
