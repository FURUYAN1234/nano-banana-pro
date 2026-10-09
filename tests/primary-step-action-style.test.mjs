import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('STEP 1 keeps one persistent wide white material button with black text', async () => {
  const [source, css] = await Promise.all([readSource('src/components/Step1Panel.jsx'), readSource('src/index.css')]);
  assert.match(source, /素材画像を選択 \(STEP 1\)/);
  assert.equal((source.match(/type="file"/g) || []).length, 1);
  assert.match(source, /materialInputRef\.current\?\.click\(\)/);
  assert.match(css, /\.reference-file-selection button \{[^}]*width: 100%;[^}]*background: #ffffff;[^}]*color: #000000;/);
  assert.match(source, /onDrop=/);
  assert.doesNotMatch(css.match(/\.reference-file-selection button \{[^}]*\}/)[0], /padding|border-radius|height|font/);
  assert.match(source, /ボタンでも、STEP1の枠内全体へのドロップでもできます/);
  assert.doesNotMatch(source, /reference-add-input|素材を再解析|<details/);
});

test('reference count is white, bold and slightly larger than guidance', async () => {
  const [source, css] = await Promise.all([readSource('src/components/Step1Panel.jsx'), readSource('src/index.css')]);
  assert.match(source, /<p className="reference-image-count">参照素材画像：/);
  assert.match(css, /\.reference-intake-guidance \.reference-image-count \{ color: #ffffff; font-weight: 700; font-size: 13px;/);
});

test('STEP 2 and STEP 3 keep their neutral raised edge while STEP 4 keeps its thin accent border', async () => {
  const [step2, step3, step4, css] = await Promise.all([
    readSource('src/components/Step2Panel.jsx'),
    readSource('src/components/Step3Panel.jsx'),
    readSource('src/components/Step4Panel.jsx'),
    readSource('src/index.css'),
  ]);

  assert.match(step2, /primary-step-action primary-step-action-neutral-edge[^\n]*border-b-\[6px\]/);
  assert.match(step3, /primary-step-action primary-step-action-neutral-edge[^\n]*border-b-\[6px\]/);
  assert.match(step4, /primary-step-action primary-step-action-accent-border/);
  assert.match(css, /\.primary-step-action-accent-border\s*\{\s*border-color: #7dd3fc;/);
  assert.match(css, /\.primary-step-action-neutral-edge\s*\{\s*border-bottom-color: #cbd5e1;/);
});
