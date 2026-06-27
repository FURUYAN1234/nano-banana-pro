import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('generated image UI does not offer a separate A4 PNG export that can hide source aspect issues', () => {
  assert.doesNotMatch(step4PanelSource, /A4 PNG/);
  assert.doesNotMatch(step4PanelSource, /createA4PngDataUrl/);
  assert.doesNotMatch(step4PanelSource, /A4_EXPORT_(?:WIDTH|HEIGHT)/);
});
