import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('STEP2 scenario creation and enhancement request a ten-minute text API timeout', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /const STEP2_TEXT_TIMEOUT_MS = 600_000;/);
  assert.match(
    source,
    /callAI\(contentPrompt, \[\], scenarioCastContext, onProgress, \{[\s\S]*?timeoutMs: STEP2_TEXT_TIMEOUT_MS,[\s\S]*?modelRoute: 'scenario',[\s\S]*?useWebSearch: inputMode === 'news'[\s\S]*?\}\)/
  );
  assert.match(
    source,
    /callAI\(prompt, \[\], buildScenarioCastContext\(castList\), onProgress, \{ timeoutMs: STEP2_TEXT_TIMEOUT_MS, modelRoute: 'scenario' \}\)/
  );
});

test('all STEP API defaults and Gemini image generation allow ten minutes', async () => {
  const [routerSource, geminiSource, openAiSource, imagenSource, openAiImageSource] = await Promise.all([
    readFile(new URL('../src/lib/ai-provider.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/gemini.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/imagen.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/openai.js', import.meta.url), 'utf8')
  ]);

  assert.match(routerSource, /callOpenAIText\(prompt, images, systemInstruction, onThinkingUpdate, options\)/);
  assert.match(routerSource, /callThinkingGemini\(prompt, images, systemInstruction, onThinkingUpdate, options\)/);
  assert.match(geminiSource, /const GEMINI_TEXT_TIMEOUT_MS = 600_000;/);
  assert.match(openAiSource, /const OPENAI_TEXT_TIMEOUT_MS = 600_000;/);
  assert.match(imagenSource, /const GEMINI_IMAGE_TIMEOUT_MS = 600_000;/);
  assert.match(imagenSource, /setTimeout\(\(\) => controller\.abort\(\), GEMINI_IMAGE_TIMEOUT_MS\)/);
  assert.match(openAiImageSource, /const OPENAI_IMAGE_TIMEOUT_MS = 600000;/);
  assert.match(geminiSource, /setTimeout\(\(\) => controller\.abort\(\), timeoutMs\)/);
  assert.match(openAiSource, /setTimeout\(\(\) => controller\.abort\(\), timeoutMs\)/);
});
