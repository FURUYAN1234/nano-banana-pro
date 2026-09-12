import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('only the STEP 1 control face receives the blue treatment, not its drop area', async () => {
  const source = await readSource('src/components/Step1Panel.jsx');

  assert.match(
    source,
    /\{\(images\.length > 0 \|\| isAnalyzing\) && \(\s*<label className="w-14 h-14/,
  );
  assert.match(
    source,
    /<label style=\{\{ minWidth: 0 \}\} className="flex-1 flex flex-col items-center justify-center text-slate-500 cursor-pointer/,
  );
  assert.doesNotMatch(
    source,
    /<label className="primary-step-action flex-1/,
  );
  assert.match(
    source,
    /<span className="primary-step-action primary-step-action-accent-border[^\n]*\bw-full\b[^\n]*">\s*キャラクター設定画像を選択 \(STEP 1\)/,
  );
});

test('STEP 1 drop guidance names both selection paths and optional companion files', async () => {
  const source = await readSource('src/components/Step1Panel.jsx');

  assert.match(
    source,
    /<p className="text-xs font-bold text-slate-400">\s*上記STEP1のボタンを押して、キャラクター設定画像（キャラシート）を選択するか、ここにドロップしてください。（複数枚を同時に、または後から追加ドロップすることも可能です。必須ではありませんが、360°背景画像や、作風設定のJSONファイルも一緒に読み込むことが出来ます。）\s*<\/p>/,
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
