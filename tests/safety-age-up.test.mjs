import test from 'node:test';
import assert from 'node:assert/strict';

import { applySafetyAgeUp, sanitizeForDocumentary } from '../src/lib/safety-filters.js';

test('age-up preserves occupational uniforms and their role assignments', () => {
  const clothing = '警察官は制服、消防士は防火服、看護師は看護制服、駅員は鉄道会社の制服、来訪者は私服。';
  const result = applySafetyAgeUp(`Important Character Cast:\n${clothing}`);
  assert.ok(result.includes(clothing));
  assert.match(result, /Every depicted person is an adult, age 20 or older/);
  assert.doesNotMatch(result, /フォーマルな服装/);
});

test('age-up still handles explicitly school-coded Japanese clothing', () => {
  const result = applySafetyAgeUp('学校制服、学校の制服、学園制服、ブレザー制服、学生服、セーラー服');
  assert.doesNotMatch(result, /学校(?:の)?制服|学園制服|ブレザー制服|学生服|セーラー服/);
  assert.match(result, /フォーマルな服装/);
});

test('age-up preserves negated school attire so casual clothing is not contradicted', () => {
  const prompt = 'Outfit: ミクは私服。学校制服ではない。リンは私服で、セーラー服は着ない。 No school uniform. [人物A]: 学校制服。';
  const result = applySafetyAgeUp(prompt);
  assert.match(result, /学校制服ではない/);
  assert.match(result, /No school uniform/);
  assert.match(result, /セーラー服は着ない/);
  assert.doesNotMatch(result, /フォーマルな服装ではない/);
  assert.match(result, /\[人物A\]: フォーマルな服装/);
});

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
  assert.match(result, /non-visible casting constraint/i);
  assert.match(result, /every depicted person is an adult, age 20 or older/i);
  assert.match(result, /never render any part of it as visible text/i);
  assert.doesNotMatch(result, /All characters depicted in this image are adults aged 20 or older/i);
  assert.doesNotMatch(result, /\bminors?\b/i);
});

test('applySafetyAgeUp preserves compound words in verbatim dialogue while still aging up a standalone role', () => {
  const prompt = [
    'Important Character Cast:',
    '- [人物A]: 少年, short hair',
    'Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="これ、“青少年保護”って建前だけど、ホントは何を守りたいのかな？".',
  ].join('\n');

  const result = applySafetyAgeUp(prompt);

  assert.match(result, /\[人物A\]: 男性, short hair/);
  assert.match(result, /青少年保護/);
  assert.doesNotMatch(result, /青男性保護/);
});

test('safety filters preserve exact printable titles and dialogue while adjusting visual traits', () => {
  const prompt = [
    '- Title: 高校生のころ',
    '- Top title EXACTLY "高校生のころ", large black, centered.',
    '- [人物A]: 高校生, セーラー服',
    'Dialogue (verbatim bubbles): B1="小学生の時、grapeを食べた。"',
  ].join('\n');
  const aged = applySafetyAgeUp(prompt);
  assert.match(aged, /Title: 高校生のころ/);
  assert.match(aged, /title EXACTLY "高校生のころ"/);
  assert.match(aged, /B1="小学生の時、grapeを食べた。"/);
  assert.doesNotMatch(aged, /\[人物A\]: 高校生, セーラー服/);

  const documentary = sanitizeForDocumentary(`${prompt}\nAction: grape and parson stand near a school.`);
  assert.match(documentary, /B1="小学生の時、grapeを食べた。"/);
  assert.match(documentary, /Action: grape and parson stand near a school\./);
});
