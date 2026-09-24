import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const step4 = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('generated-page dimensions call the bottom band a footer instead of a watermark', () => {
  assert.match(step4, /4コマ全体.*フッター.*footerHeight/);
  assert.match(workflow, /コマ全体.*フッター.*footerHeight/);
  assert.doesNotMatch(step4, /4コマ全体.*透かし.*footerHeight/);
  assert.doesNotMatch(workflow, /コマ全体.*透かし.*footerHeight/);
});
