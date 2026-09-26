import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('the STEP 3 web-prompt copy button uses a pale-yellow face instead of white', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(source, /プロンプトをコピーする（Web \/ Work用）/);
  assert.match(source, /isCopied \? 'bg-green-600' : 'web-prompt-copy-action'/);
  assert.match(css, /\.web-prompt-copy-action\s*\{\s*background-color: #fef3c7;\s*color: #451a03;/);
  assert.match(css, /\.web-prompt-copy-action:hover\s*\{\s*background-color: #fde68a;/);
});

test('split copy buttons progressively brighten without increasing their height', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  assert.match(source, /58 \+ \(index \/ \(webCopyPartLengths\.length - 1\)\) \* 30/);
  const rule = css.match(/\.web-prompt-copy-part\s*\{([^}]+)\}/)?.[1];
  assert.ok(rule, 'split-copy styling is present');
  assert.match(rule, /linear-gradient/);
  assert.match(rule, /color: #082f49/);
  assert.doesNotMatch(rule, /(?:min-height|height|padding)\s*:/);
  assert.match(css, /\.web-prompt-copy-part:focus-visible/);
});
