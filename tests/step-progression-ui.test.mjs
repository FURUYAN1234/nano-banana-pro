import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('STEP4 output stays hidden until a final prompt exists', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

  assert.match(app, /Boolean\(finalPrompt\?\.trim\(\)\)\s*&&\s*\(\s*<Step4Panel/);
});

test('the next actionable STEP button pulses after each completed step', async () => {
  const [step2, step3, step4, css] = await Promise.all([
    readFile(new URL('../src/components/Step2Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step3Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(step2, /currentStep === 2 && !isSearching[\s\S]*?next-step-gentle-pulse/);
  assert.match(step3, /currentStep === 3 && !isAssembling[\s\S]*?next-step-gentle-pulse/);
  assert.match(step4, /currentStep === 4 && !isGeneratingImage[\s\S]*?next-step-gentle-pulse/);
  assert.match(css, /@keyframes next-step-gentle-pulse/);
  assert.match(css, /filter:\s*brightness\(0\.84\)[\s\S]*filter:\s*brightness\(1\.18\)/);
  assert.match(css, /animation:\s*next-step-gentle-pulse 1\.6s ease-in-out infinite/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.next-step-gentle-pulse[\s\S]*animation:\s*none/);
});
