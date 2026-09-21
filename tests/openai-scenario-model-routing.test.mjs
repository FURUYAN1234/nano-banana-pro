import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('only STEP2 generation and enhancement request the dedicated scenario route', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(
    source,
    /callAI\(contentPrompt, \[\], scenarioCastContext, onProgress, \{[\s\S]*?timeoutMs: STEP2_TEXT_TIMEOUT_MS,[\s\S]*?modelRoute: 'scenario',[\s\S]*?scenarioModelId,[\s\S]*?useWebSearch: inputMode === 'news'[\s\S]*?\}\)/
  );
  assert.match(
    source,
    /callAI\(prompt, \[\], buildScenarioCastContext\(castList\), onProgress, \{[\s\S]*?timeoutMs: STEP2_TEXT_TIMEOUT_MS,[\s\S]*?modelRoute: 'scenario',[\s\S]*?scenarioModelId[\s\S]*?\}\)/
  );
  assert.doesNotMatch(source, /callAI\(cameraWorkPrompt, \[bg360ImageParts\], null, onCameraProgress, \{[^}]*modelRoute: 'scenario'/);
});

test('news-category scenarios request web search only through the active OpenAI provider route', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /useWebSearch: inputMode === 'news'/);
  assert.doesNotMatch(source, /callThinkingGemini\(/);
  assert.doesNotMatch(source, /googleSearch/);
});

test('the OpenAI text client tries GPT-6 before stable text fallbacks only for the scenario route', async () => {
  const [source, routeSource] = await Promise.all([
    readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/openai-model-routes.js', import.meta.url), 'utf8'),
  ]);

  assert.match(routeSource, /openai-scenario-models\.json/);
  assert.match(routeSource, /OPENAI_SCENARIO_TEXT_MODEL_IDS = OPENAI_SCENARIO_MODEL_OPTIONS\.map/);
  assert.match(source, /options\.modelRoute === 'scenario'\s*\? getOpenAIScenarioModelRoute\(options\.scenarioModelId\)/);
  assert.doesNotMatch(routeSource, /OPENAI_VISION_MODEL_IDS = \[\s*'gpt-(?:5\.6|6-astra)'/);
});

test('the text client starts a fixed STEP2 selection and only uses its lower fallbacks', async () => {
  const source = await readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8');

  assert.match(source, /getOpenAIScenarioModelRoute/);
  assert.match(source, /options\.modelRoute === 'scenario'\s*\? getOpenAIScenarioModelRoute\(options\.scenarioModelId\)/);
});

test('GPT-6 Astra and every GPT-5.6 scenario model use current Chat Completions parameters', async () => {
  const source = await readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8');

  assert.match(source, /const usesModernChatParameters = modelId === "gpt-6-astra" \|\| modelId\.startsWith\("gpt-5\.6-"\);/);
  assert.match(source, /role: usesModernChatParameters \? "developer" : "system"/);
  assert.match(source, /\.\.\.\(usesModernChatParameters\s*\? \{ max_completion_tokens: 8192 \}\s*:\s*\{ temperature: 0\.7, max_tokens: 8192 \}\)/);
});

test('the text router follows the connected API session after a Vite update', async () => {
  const source = await readFile(new URL('../src/lib/ai-provider.js', import.meta.url), 'utf8');

  assert.match(source, /import \{ getApiSessionSnapshot \} from '\.\/api-session';/);
  assert.match(source, /const session = getApiSessionSnapshot\(\);/);
  assert.match(source, /session\.credentialPresent \? session\.provider : activeEngine/);
  assert.match(source, /const effectiveEngine = getActiveEngine\(\);/);
});
