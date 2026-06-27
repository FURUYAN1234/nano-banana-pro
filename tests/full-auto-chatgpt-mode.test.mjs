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
