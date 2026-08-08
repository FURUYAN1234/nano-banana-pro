import assert from 'node:assert/strict';
import test from 'node:test';
import { isImagePolicyError } from '../src/lib/image-policy-error.js';

test('recognizes OpenAI safety-system rejections as policy errors', () => {
  assert.equal(
    isImagePolicyError('Your request was rejected by the safety system.'),
    true
  );
});

test('does not misclassify a timeout as a policy error', () => {
  assert.equal(isImagePolicyError('Request timed out after 120 seconds.'), false);
});
