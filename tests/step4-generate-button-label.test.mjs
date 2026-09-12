import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('STEP4 generation button keeps model and quality details in the settings button only', () => {
  assert.match(
    step4PanelSource,
    /isGeneratingImage \? "画像を生成中\.\.\." : "画像を生成する \(STEP 4\)"/,
  );
  assert.doesNotMatch(step4PanelSource, /画像を生成する \(STEP 4:/);
});
