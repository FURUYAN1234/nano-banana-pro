import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('release version matches the app, lockfile, HTML title and current README guidance', () => {
  const version = JSON.parse(read('../package.json')).version;
  const lock = JSON.parse(read('../package-lock.json'));
  assert.equal(lock.version, version);
  assert.equal(lock.packages[''].version, version);
  assert.match(read('../src/lib/constants.js'), new RegExp(`SYSTEM_VERSION = "v${version.replaceAll('.', '\\.')}"`));
  assert.match(read('../index.html'), new RegExp(`<title>Nano Banana Pro v${version.replaceAll('.', '\\.')}<\\/title>`));
  const readme = read('../README.md');
  assert.ok(readme.includes(`> Current source version: **v${version}** / 現在のソース版: **v${version}**`));
  assert.ok(readme.includes(`matching v${version} FourPanel Release asset`));
  assert.ok(readme.includes(`v${version} FourPanel Releaseアセット`));
});
