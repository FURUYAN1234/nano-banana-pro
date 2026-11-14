import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('bundled manuals are real PDF documents', async () => {
  for (const name of ['gemini-api-beginner-guide-2026-10-01.pdf', 'super-furu-ai-4koma-full-manual-2026-10-01.pdf']) {
    const pdf = await readFile(new URL(`../public/downloads/${name}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
    assert.ok(pdf.length > 10000);
  }
});

test('PDF manuals share one equal-sized responsive group', async () => {
  const modal = await readFile(new URL('../src/components/ApiKeyModal.jsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const manual = modal.match(/<a\s+href=\{geminiManualUrl\}[^>]+className="([^"]+)"/);
  assert.ok(manual, 'Gemini manual button is rendered');
  assert.equal(manual[1], 'manual-link-button');
  assert.match(css, /\.api-pdf-guides--three\s*\{\s*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.api-pdf-guides \.manual-link-button\s*\{[^}]*min-height: 42px/);
  assert.match(css, /@media \(max-width: 560px\)\s*\{\s*\.api-pdf-guides, \.api-pdf-guides--three\s*\{\s*grid-template-columns: 1fr/);
});
