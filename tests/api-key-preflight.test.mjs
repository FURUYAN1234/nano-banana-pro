import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateApiKeyInput,
  verifyApiKeyConnection,
} from '../src/lib/api-key-preflight.js';

const geminiKey = `AIza${'A'.repeat(35)}`;
const openAiKey = `sk-proj-${'a'.repeat(48)}`;

test('rejects arbitrary non-empty text before STEP access', () => {
  const result = validateApiKeyInput('just some random text');
  assert.equal(result.ok, false);
  assert.equal(result.provider, null);
  assert.match(result.message, /APIキーの形式が正しくありません/);
});

test('does not call the network for keys that fail local provider format checks', async () => {
  let fetchCalled = false;
  const result = await verifyApiKeyConnection('not-a-real-api-key', {
    fetchImpl: async () => {
      fetchCalled = true;
      throw new Error('fetch should not be called');
    },
  });

  assert.equal(result.ok, false);
  assert.equal(fetchCalled, false);
});

test('does not call the network for a shortened OpenAI-looking key', async () => {
  let fetchCalled = false;
  const result = await verifyApiKeyConnection('sk-proj-short', {
    fetchImpl: async () => {
      fetchCalled = true;
      throw new Error('fetch should not be called');
    },
  });

  assert.equal(result.ok, false);
  assert.equal(result.provider, null);
  assert.equal(fetchCalled, false);
});

test('rejects a Gemini-shaped key when the provider preflight rejects it', async () => {
  const result = await verifyApiKeyConnection(geminiKey, {
    fetchImpl: async () => ({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      json: async () => ({ error: { message: 'API key not valid' } }),
    }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.provider, 'gemini');
});

test('does not expose provider-returned API key fragments in verification errors', async () => {
  const result = await verifyApiKeyConnection(openAiKey, {
    fetchImpl: async () => ({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({
        error: {
          message: `Incorrect API key provided: ${openAiKey}. You can find your API key at https://platform.openai.com/account/api-keys.`,
        },
      }),
    }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.provider, 'openai');
  assert.equal(result.message.includes(openAiKey), false);
  assert.equal(result.message.includes('sk-proj-'), false);
  assert.match(result.message, /OpenAI APIキーの検証に失敗しました/);
});

test('accepts a Gemini key only after the models endpoint responds successfully', async () => {
  const result = await verifyApiKeyConnection(geminiKey, {
    fetchImpl: async (url, options) => {
      assert.match(url, /\/v1beta\/models$/);
      assert.equal(options.headers['x-goog-api-key'], geminiKey);
      return {
        ok: true,
        status: 200,
        json: async () => ({ models: [{ name: 'models/gemini-test' }] }),
      };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.provider, 'gemini');
  assert.equal(result.sanitizedKey, geminiKey);
});

test('accepts an OpenAI key only after the models endpoint responds successfully', async () => {
  const result = await verifyApiKeyConnection(openAiKey, {
    fetchImpl: async (url, options) => {
      assert.equal(url, 'https://api.openai.com/v1/models');
      assert.equal(options.headers.Authorization, `Bearer ${openAiKey}`);
      return {
        ok: true,
        status: 200,
        json: async () => ({ data: [{ id: 'gpt-test' }] }),
      };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.provider, 'openai');
  assert.equal(result.sanitizedKey, openAiKey);
});
