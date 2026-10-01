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

test('Gemini manual reuses the existing provider button style with spacing only', async () => {
  const modal = await readFile(new URL('../src/components/ApiKeyModal.jsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const manual = modal.match(/<a\s+href=\{geminiManualUrl\}[^>]+className="([^"]+)"/);
  assert.ok(manual, 'Gemini manual button is rendered');
  assert.deepEqual(manual[1].split(/\s+/), ['api-key-link', 'api-key-link--gemini', 'api-key-manual-link']);
  const spacing = css.match(/\.api-key-manual-link\s*\{([^}]+)\}/);
  assert.ok(spacing);
  assert.equal(spacing[1].trim(), 'margin-left: 10px;');
  assert.doesNotMatch(css, /\.api-key-link\.manual-link-button/);
});
