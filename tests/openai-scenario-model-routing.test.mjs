import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('only STEP2 generation and enhancement request the dedicated scenario route', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(
    source,
    /callAI\(contentPrompt, \[\], scenarioCastContext, onProgress, \{[\s\S]*?timeoutMs: STEP2_TEXT_TIMEOUT_MS,[\s\S]*?modelRoute: 'scenario',\s*useWebSearch: inputMode === 'news'[\s\S]*?\}\)/
  );
  assert.match(
    source,
    /callAI\(prompt, \[\], buildScenarioCastContext\(castList\), onProgress, \{ timeoutMs: STEP2_TEXT_TIMEOUT_MS, modelRoute: 'scenario' \}\)/
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

  assert.match(routeSource, /export const OPENAI_SCENARIO_TEXT_MODEL_IDS = \[[\s\S]*?'gpt-6-astra'[\s\S]*?'gpt-5\.6-sol'[\s\S]*?'gpt-4\.1'/);
  assert.match(source, /options\.modelRoute === 'scenario'\s*\? OPENAI_SCENARIO_TEXT_MODEL_IDS/);
  assert.doesNotMatch(routeSource, /OPENAI_VISION_MODEL_IDS = \[\s*'gpt-(?:5\.6|6-astra)'/);
});

test('GPT-6 Astra and GPT-5.6 Sol use current Chat Completions parameters', async () => {
  const source = await readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8');

  assert.match(source, /const usesModernChatParameters = modelId === "gpt-6-astra" \|\| modelId === "gpt-5\.6-sol";/);
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
