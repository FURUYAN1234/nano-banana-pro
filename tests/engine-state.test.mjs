import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getEffectiveEngine } from '../src/lib/engine-state.js';

const systemHeaderSource = await readFile(new URL('../src/components/SystemHeader.jsx', import.meta.url), 'utf8');
const controlBarSource = await readFile(new URL('../src/components/ControlBar.jsx', import.meta.url), 'utf8');
const step2PanelSource = await readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8');
const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

test('an OpenAI signal from either legacy state resolves the complete workflow to OpenAI', () => {
  assert.equal(getEffectiveEngine('openai', true), 'openai');
  assert.equal(getEffectiveEngine('openai', false), 'openai');
  assert.equal(getEffectiveEngine('gemini', true), 'openai');
  assert.equal(getEffectiveEngine('', true), 'openai');
});

test('Gemini is selected only when neither legacy state requests OpenAI', () => {
  assert.equal(getEffectiveEngine('gemini', false), 'gemini');
  assert.equal(getEffectiveEngine('', false), 'gemini');
});

test('all provider-sensitive header controls use the same effective engine resolver', () => {
  for (const source of [systemHeaderSource, controlBarSource]) {
    assert.match(source, /import \{ getEffectiveEngine \} from ['"]\.\.\/lib\/engine-state['"];/);
    assert.match(source, /const isOpenAIEngine = getEffectiveEngine\(selectedEngine, enableOpenAIApi\) === 'openai';/);
    assert.doesNotMatch(source, /selectedEngine === 'openai'/);
  }
});

test('Gemini UI hides the OpenAI-only scenario-model selector', () => {
  assert.match(step2PanelSource, /import \{ getEffectiveEngine \} from ['"]\.\.\/lib\/engine-state['"];/);
  assert.match(step2PanelSource, /const isOpenAIEngine = getEffectiveEngine\(selectedEngine, enableOpenAIApi\) === 'openai';/);
  assert.match(step2PanelSource, /\{isOpenAIEngine && \(\s*<div className="scenario-model-select-card/);
  assert.match(appSource, /<Step2Panel[\s\S]*?selectedEngine=\{selectedEngine\}[\s\S]*?enableOpenAIApi=\{enableOpenAIApi\}/);
});
