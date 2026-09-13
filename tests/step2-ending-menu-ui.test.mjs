import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('STEP2 ending selector is visually distinct and explicitly identified as a menu', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/Step2Panel.jsx'),
    readSource('src/index.css'),
  ]);

  assert.match(source, /className="punchline-select-hint"[^>]*>\s*▼ 選択メニュー\s*<\/span>/);
  assert.match(source, /<div className="punchline-select-control">[\s\S]*?<select[\s\S]*?aria-label="ストーリーの結末を選択"[\s\S]*?className="punchline-select-input[^"]*appearance-none/);
  assert.match(source, /<ChevronDown[^>]*className="punchline-select-chevron"[^>]*aria-hidden="true"/);
  assert.match(css, /\.punchline-select-input\s*\{[\s\S]*?background-color:\s*#fff7d6;[\s\S]*?color:\s*#111827;/);
  assert.match(css, /\.punchline-select-input\s*\{[\s\S]*?min-height:\s*28px;[\s\S]*?padding:\s*3px 36px 3px 8px;[\s\S]*?font-size:\s*12px;/);
  assert.match(css, /\.punchline-select-chevron\s*\{[\s\S]*?pointer-events:\s*none;/);
});

test('STEP2 ending selector row has a fixed visible gap before the generate button', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/Step2Panel.jsx'),
    readSource('src/index.css'),
  ]);

  assert.match(source, /className="scenario-settings-grid flex flex-col md:flex-row gap-4"/);
  assert.match(css, /\.scenario-settings-grid\s*\{\s*margin-bottom:\s*12px;\s*\}/);
});
