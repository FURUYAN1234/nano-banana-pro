import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const appSource = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const workflowSource = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

test('final prompt setter is exposed to the prompt panel', () => {
  assert.match(workflowSource, /finalPrompt,[\s\S]*?setFinalPrompt,/);
  assert.match(appSource, /finalPrompt,[\s\S]*?setFinalPrompt,/);
  assert.match(
    appSource,
    /<Step4Panel[\s\S]*?finalPrompt=\{finalPrompt\}[\s\S]*?setFinalPrompt=\{setFinalPrompt\}/,
  );
});

test('final prompt textarea can be edited directly', () => {
  assert.match(
    step4PanelSource,
    /<textarea[\s\S]*?value=\{finalPrompt\}[\s\S]*?onChange=\{\(e\) => setFinalPrompt\(e\.target\.value\)\}/,
  );

  const finalPromptTextarea = step4PanelSource.match(
    /<textarea[\s\S]*?value=\{finalPrompt\}[\s\S]*?\/>/,
  )?.[0] ?? '';

  assert.doesNotMatch(finalPromptTextarea, /\breadOnly\b/);
});

test('prompt editor guidance explains that edits feed copy and image generation', () => {
  assert.match(
    step4PanelSource,
    /この欄で直接編集できます。編集した内容が、プロンプトのコピーと画像生成の両方に使われます。/,
  );
  assert.doesNotMatch(
    step4PanelSource,
    /内容を修正したい場合は、上の「シナリオ」を直接書き換えてから/,
  );
});
