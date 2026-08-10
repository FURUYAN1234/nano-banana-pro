import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('OpenAI image-generation wait copy consistently states the current 2-to-10-minute expectation', () => {
  assert.match(workflowSource, /gpt-image-2[^\n]*通常2〜10分/);
  assert.match(step4PanelSource, /通常2〜10分/);
  assert.doesNotMatch(step4PanelSource, /最大2〜6分/);
});
