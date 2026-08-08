import test from 'node:test';
import assert from 'node:assert/strict';

import { buildOpenAIImageRequestBody } from '../src/lib/openai.js';

test('gpt-image request uses the supported low moderation level', () => {
  const request = buildOpenAIImageRequestBody('full production manga prompt');

  assert.equal(request.model, 'gpt-image-2');
  assert.equal(request.prompt, 'full production manga prompt');
  assert.equal(request.moderation, 'low');
  assert.equal(request.stream, true);
  assert.equal(request.partial_images, 1);
});
