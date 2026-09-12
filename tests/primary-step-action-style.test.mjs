import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('only the STEP 1 control face receives the blue treatment, not its drop area', async () => {
  const source = await readSource('src/components/Step1Panel.jsx');

  assert.match(
    source,
    /<label className="flex-1 flex flex-col items-center/,
  );
  assert.doesNotMatch(
    source,
    /<label className="primary-step-action flex-1/,
  );
  assert.match(
    source,
    /<span className="primary-step-action primary-step-action-accent-border[^\n]*">\s*キャラクター設定画像を選択 \(STEP 1\)/,
  );
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
