import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('image-generation wait copy names the selected model without an unverified fixed ETA', () => {
  assert.match(workflowSource, /resolveOpenAIImageOption\(openAIImageQuality\).label[^\n]*最終画像/);
  assert.match(step4PanelSource, /生成時間はモデル・品質・混雑状況で変わります/);
  assert.doesNotMatch(step4PanelSource, /通常2〜10分/);
  assert.doesNotMatch(step4PanelSource, /最大2〜6分/);
});
