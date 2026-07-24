import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step2PanelSource = readFileSync(
  new URL('../src/components/Step2Panel.jsx', import.meta.url),
  'utf8'
);

test('scenario enhancement panel provides an all-categories toggle in its final grid slot', () => {
  assert.match(step2PanelSource, /全カテゴリを選択/);
  assert.match(step2PanelSource, /全カテゴリを解除/);
  assert.match(step2PanelSource, /aria-pressed=\{allEnhancementCategoriesSelected\}/);
  assert.match(step2PanelSource, /setEnhanceExpressions\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceBodyLang\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceEffects\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceBackgrounds\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceCameraWork\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceDialogue\(selectAllEnhancementCategories\)/);
  assert.match(step2PanelSource, /setEnhanceGag\(selectAllEnhancementCategories\)/);
});

test('all-categories toggle makes active selection unmistakable', () => {
  assert.match(step2PanelSource, /bg-lime-300/);
  assert.match(step2PanelSource, /shadow-\[0_0_18px_rgba\(190,242,100,0\.75\)\]/);
  assert.match(step2PanelSource, /bg-slate-800/);
  assert.match(step2PanelSource, /全選択中/);
});
