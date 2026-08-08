import test from 'node:test';
import assert from 'node:assert/strict';

import { applySafetyAgeUp } from '../src/lib/safety-filters.js';

test('applySafetyAgeUp removes plain-text school and minor-coded character traits', () => {
  const prompt = [
    'Important Character Cast:',
    '- [ミク]: sailor uniform, gyaru style, student council president',
    '- [ヒカリ]: honor student, childhood friend, disciplinarian, otaku girl',
    'Style: super-deformed chibi style with 2-3 head-to-body proportions.',
    'Use simplified round faces, dot-like eyes, and exaggerated tiny limbs.',
    'Show detailed muscle/bone structure visible through skin tension.',
  ].join('\n');

  const result = applySafetyAgeUp(prompt);

  assert.doesNotMatch(
    result,
    /sailor uniform|gyaru style|student council president|honor student|childhood friend|disciplinarian|otaku girl/i,
  );
  assert.match(result, /elegant blouse with ribbon/i);
  assert.match(result, /fashionable style/i);
  assert.match(result, /workplace team leader/i);
  assert.match(result, /high-achieving adult/i);
  assert.match(result, /longtime adult friend/i);
  assert.match(result, /strict adult authority figure/i);
  assert.match(result, /adult pop-culture enthusiast/i);
  assert.match(result, /adult caricature style with mature proportions/i);
  assert.match(result, /stylized mature faces, clear adult proportions, and simplified limbs/i);
  assert.match(result, /mature facial structure and detailed fabric folds/i);
  assert.doesNotMatch(result, /2-3 head-to-body|tiny limbs|bone structure visible through skin tension/i);
  assert.match(result, /All characters depicted in this image are adults aged 20 or older/i);
  assert.doesNotMatch(result, /\bminors?\b/i);
});
