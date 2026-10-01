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
