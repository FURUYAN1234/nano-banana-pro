import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('API key modal does not label an unverified key as a running engine', async () => {
  const source = await readSource('../src/components/ApiKeyModal.jsx');

  assert.equal(source.includes('Engine で起動'), false);
  assert.match(source, /OpenAI形式（未検証）/);
  assert.match(source, /Gemini形式（未検証）/);
  assert.match(source, /whitespace-pre-wrap break-words/);
});

test('main UI receives an empty API key while an API modal is open', async () => {
  const source = await readSource('../src/App.jsx');

  assert.match(source, /const apiKeyForUnlockedUi = isMainLocked \? "" : apiKey;/);
  assert.match(source, /<ControlBar[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
  assert.match(source, /<SystemHeader[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
  assert.match(source, /<Step1Panel[\s\S]*?apiKey=\{apiKeyForUnlockedUi\}/);
});

test('saved API keys are preflight-verified before restoring connected state', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');

  assert.match(source, /verifyApiKeyConnection\(savedKey\)/);
  assert.match(source, /setShowModal\(true\);[\s\S]*?showStatus\("保存済みAPIキーの検証に失敗しました。再入力してください。"\)/);
});
