import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('OpenAI key survives only an in-memory Vite hot update', async () => {
  const [openAiSource, sessionSource] = await Promise.all([
    readFile(new URL('../src/lib/openai.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/lib/api-session.js', import.meta.url), 'utf8'),
  ]);

  assert.match(openAiSource, /getApiCredential\('openai'\)/);
  assert.match(sessionSource, /import\.meta\.hot\?\.data\.apiSession/);
  assert.match(sessionSource, /import\.meta\.hot\.dispose/);
  assert.doesNotMatch(`${openAiSource}\n${sessionSource}`, /localStorage|sessionStorage/);
});

test('missing OpenAI key during STEP2 opens the re-entry modal', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

  assert.match(source, /API Key is not set[\s\S]{0,500}setShowOpenAIKeyModal\(true\)/);
});
