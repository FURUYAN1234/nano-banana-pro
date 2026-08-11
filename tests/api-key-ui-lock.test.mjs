import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('API key modal does not label an unverified key as a running engine', async () => {
  const source = await readSource('../src/components/ApiKeyModal.jsx');

  assert.match(source, /whitespace-pre-wrap break-words/);
  assert.match(source, /verify|讀懆ｨｼ|検証/i);
});

test('main UI receives an empty API key while an API modal is open', async () => {
  const source = await readSource('../src/App.jsx');

  assert.match(source, /const apiKeyForUnlockedUi = isMainLocked \? "" : apiKey;/);
  assert.match(source, /<ControlBar[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
  assert.match(source, /<SystemHeader[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
  assert.match(source, /<Step1Panel[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
});

test('verified in-memory API session restores connected state without replaying preflight', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');

  assert.match(source, /getApiSessionSnapshot\(\)/);
  assert.doesNotMatch(source, /verifyApiKeyConnection\(savedKey\)/);
  assert.match(source, /credentialPresent/);
});

test('Vite refresh relies on the unified memory session instead of a window bootstrap flag', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');

  assert.doesNotMatch(source, /API_BOOTSTRAP_WINDOW_FLAG/);
  assert.doesNotMatch(source, /openai-engine-active/);
  assert.doesNotMatch(source, /localStorage\.setItem\([^\n]*api.?key/i);
});

test('transient preflight failure keeps the current session and entered key available for retry', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');

  assert.match(source, /verification\.failureKind === 'transient'/);
  const transientBranch = source.slice(source.indexOf("verification.failureKind === 'transient'"));
  assert.doesNotMatch(transientBranch.slice(0, transientBranch.indexOf('return verification;')), /clearApiSession/);
});

test('a missing in-memory OpenAI key reopens the modal without clearing manga work', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');

  assert.match(source, /errMsg\.includes\([\s\S]*?setShowModal\(true\)/);
});
