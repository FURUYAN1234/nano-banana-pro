import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('the STEP 3 web-prompt copy button uses a pale-yellow face instead of white', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(source, /プロンプトをコピーする（web貼り付け時）/);
  assert.match(source, /isCopied \? 'bg-green-600' : 'web-prompt-copy-action'/);
  assert.match(css, /\.web-prompt-copy-action\s*\{\s*background-color: #fef3c7;\s*color: #451a03;/);
  assert.match(css, /\.web-prompt-copy-action:hover\s*\{\s*background-color: #fde68a;/);
});
