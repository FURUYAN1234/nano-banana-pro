import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const target = 'https://furuyan1234.github.io/nano-banana-pro/';

test('README demo image and copyable URL both target the published app', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  const linkedImage = readme.match(/\[!\[[^\]]+\]\(docs\/assets\/demo-site-button\.png\)\]\(([^)]+)\)/);
  assert.equal(linkedImage?.[1], target);
  assert.ok(readme.includes(`[${target}](${target})`));
  const png = readFileSync(new URL('../docs/assets/demo-site-button.png', import.meta.url));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  const svg = readFileSync(new URL('../docs/assets/demo-site-button.svg', import.meta.url), 'utf8');
  assert.ok(svg.includes(target));
});
