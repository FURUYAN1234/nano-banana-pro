import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { globSync } from 'tinyglobby';

const require = createRequire(import.meta.url);
const matchFiles = require('picomatch');
const globby = createRequire(require.resolve('gh-pages/package.json'))('globby');

test('both the Vite and Pages tools select the same nested files and dotfiles', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'furu-tool-globs-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  mkdirSync(join(dir, '原稿'));
  for (const name of ['.nojekyll', 'index.html', '原稿/表紙.png', '原稿/本文.png', '原稿/台本.json']) {
    writeFileSync(join(dir, name), '');
  }
  for (const list of [globSync, globby.sync]) {
    const images = list(['**/*.png', '!**/本文.png'], { cwd: dir }).sort();
    assert.deepEqual(images, ['原稿/表紙.png']);
    const all = list('**/*', { cwd: dir, dot: true }).sort();
    assert.deepEqual(all, ['.nojekyll', 'index.html', '原稿/台本.json', '原稿/本文.png', '原稿/表紙.png'].sort());
  }
});

test('Vite deny patterns preserve dotfiles, extensions, directory roots and Windows paths', () => {
  const denied = matchFiles(['**/.env', '**/.env.*', '**/.git/**', '**/*.{crt,pem}'], {
    dot: true, nocase: true, windows: true,
  });
  for (const file of ['.env', 'config/.env.local', 'repo/.git', 'repo\\.git\\HEAD', 'tls/LOCAL.PEM']) {
    assert.equal(denied(file), true, file);
  }
  for (const file of ['src/main.jsx', 'assets/logo.png', '.github/workflows/publish.yml']) {
    assert.equal(denied(file), false, file);
  }
});
