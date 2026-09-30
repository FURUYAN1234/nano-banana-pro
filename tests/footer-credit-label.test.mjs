import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { formatPageLayoutStatus, scalePageLayout } from '../src/lib/manga-page-layout.js';

const step4 = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('generated-page dimensions call the bottom band a footer instead of a watermark', () => {
  assert.match(step4, /4コマ全体.*フッター.*footerHeight/);
  const status = formatPageLayoutStatus({ applied: true, layout: scalePageLayout(1584) });
  assert.match(status, /コマ全体1446px・フッター35px/);
  assert.doesNotMatch(step4, /4コマ全体.*透かし.*footerHeight/);
  assert.doesNotMatch(status, /透かし/);
});
