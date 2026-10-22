import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const manuals = [
  ['full-manual', 'super-furu-ai-4koma-full-manual-2026-10-01.pdf'],
  ['openai-api-guide', 'openai-api-beginner-guide-2026-09-30.pdf'],
  ['gemini-api-guide', 'gemini-api-beginner-guide-2026-10-01.pdf'],
];

test('README has exactly three image buttons that open the corresponding PDF', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const buttons = [...readme.matchAll(/\[!\[([^\]]+)\]\((docs\/assets\/(?:full-manual|openai-api-guide|gemini-api-guide)-button\.png)\)\]\(([^)]+)\)/g)];
  assert.equal(buttons.length, 3);
  for (const [slug, filename] of manuals) {
    const button = buttons.find(([, , asset]) => asset === `docs/assets/${slug}-button.png`);
    assert.ok(button, `${slug} image button exists`);
    assert.equal(button[3], `https://furuyan1234.github.io/nano-banana-pro/downloads/${filename}`);
    assert.match(button[1], /[A-Za-z]/);
    assert.match(button[1], /[\u3040-\u30ff\u3400-\u9fff]/);
    const png = readFileSync(new URL(`../${button[2]}`, import.meta.url));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    const pdf = readFileSync(new URL(`../public/downloads/${filename}`, import.meta.url));
    assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  }
});
