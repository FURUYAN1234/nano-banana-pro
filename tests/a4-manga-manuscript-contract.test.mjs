import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  MANGA_MANUSCRIPT_ASPECT_LABEL,
  MANGA_MANUSCRIPT_LARGE,
  MANGA_MANUSCRIPT_RATIO_LABEL,
  MANGA_MANUSCRIPT_STANDARD,
} from '../src/lib/manga-manuscript-format.js';

const prompts = readFileSync(new URL('../src/lib/prompts.js', import.meta.url), 'utf8');
const assembler = readFileSync(new URL('../src/lib/prompt-assembler.js', import.meta.url), 'utf8');
const step4 = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('all manga output contracts use one A4 manuscript ratio without 2:3 or 3:4 aliases', () => {
  const combined = `${prompts}\n${assembler}\n${step4}`;
  assert.equal(MANGA_MANUSCRIPT_RATIO_LABEL, '210:297');
  assert.equal(MANGA_MANUSCRIPT_ASPECT_LABEL, '1:1.414');
  assert.deepEqual([MANGA_MANUSCRIPT_STANDARD.value, MANGA_MANUSCRIPT_LARGE.value], ['1120x1584', '2240x3168']);
  assert.match(prompts, /A4 PORTRAIT \$\{MANGA_MANUSCRIPT_RATIO_LABEL\}/);
  assert.match(prompts, /exact A4 portrait aspect ratio \$\{MANGA_MANUSCRIPT_RATIO_LABEL\}/i);
  assert.match(prompts, /MANGA_MANUSCRIPT_STANDARD\.value/);
  assert.match(prompts, /MANGA_MANUSCRIPT_LARGE\.value/);
  assert.match(assembler, /PAGE:A4 \$\{MANGA_MANUSCRIPT_RATIO_LABEL\}.*MANGA_MANUSCRIPT_STANDARD\.value.*MANGA_MANUSCRIPT_LARGE\.value/s);
  assert.match(step4, /MANGA_MANUSCRIPT_RATIO_LABEL/);
  assert.doesNotMatch(combined, /exact(?:ly)? 2:3|\[FORMAT: 2:3|PAGE:2:3|clean 3:4 portrait canvas/i);
});
