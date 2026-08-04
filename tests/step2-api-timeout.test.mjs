import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('STEP2 scenario creation and enhancement request a three-minute text API timeout only for their own calls', async () => {
  const source = await readFile(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');

  assert.match(source, /const STEP2_TEXT_TIMEOUT_MS = 180_000;/);
  assert.match(
    source,
    /callAI\(contentPrompt, \[\], castList, onProgress, \{ timeoutMs: STEP2_TEXT_TIMEOUT_MS \}\)/
  );
  assert.match(
    source,
    /callAI\(prompt, \[\], castList, onProgress, \{ timeoutMs: STEP2_TEXT_TIMEOUT_MS \}\)/
  );
  assert.doesNotMatch(
    source,
    /callAI\(cameraWorkPrompt, \[bg360ImageParts\], null, onCameraProgress, \{ timeoutMs: STEP2_TEXT_TIMEOUT_MS \}\)/
  );
});

test('text provider clients honor a caller-supplied timeout instead of their shared default', async () => {
  const [routerSource, geminiSource, openAiSource] = await Promise.all([
    readFile(new URL('../src/lib/ai-provider.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/gemini.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/openai-text.js', import.meta.url), 'utf8')
  ]);

  assert.match(routerSource, /callOpenAIText\(prompt, images, systemInstruction, onThinkingUpdate, options\)/);
  assert.match(routerSource, /callThinkingGemini\(prompt, images, systemInstruction, onThinkingUpdate, options\)/);
  assert.match(geminiSource, /setTimeout\(\(\) => controller\.abort\(\), timeoutMs\)/);
  assert.match(openAiSource, /setTimeout\(\(\) => controller\.abort\(\), timeoutMs\)/);
});
