import test from 'node:test';
import assert from 'node:assert/strict';

import {
  clearApiSession,
  getApiCredential,
  getApiSessionSnapshot,
  setApiSession,
} from '../src/lib/api-session.js';

test.afterEach(() => clearApiSession());

test('keeps one provider credential in memory while exposing only safe connection state', () => {
  setApiSession('openai', 'sk-test-secret');

  assert.deepEqual(getApiSessionSnapshot(), {
    provider: 'openai',
    status: 'connected',
    credentialPresent: true,
  });
  assert.equal(getApiCredential('openai'), 'sk-test-secret');
  assert.equal(getApiCredential('gemini'), '');
  assert.equal(JSON.stringify(getApiSessionSnapshot()).includes('sk-test-secret'), false);
});

test('clearing another provider does not destroy the active session', () => {
  setApiSession('openai', 'sk-test-secret');
  clearApiSession('gemini');

  assert.equal(getApiSessionSnapshot().credentialPresent, true);
  assert.equal(getApiCredential('openai'), 'sk-test-secret');
});
