import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('version updater synchronizes root lock metadata regardless of field order and preserves dependencies', () => {
  const root = mkdtempSync(join(tmpdir(), 'nano-version-'));
  try {
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'src/lib'), { recursive: true });
    for (const path of ['scripts/update_version.cjs', 'package.json', 'package-lock.json', 'src/lib/constants.js', 'index.html', 'README.md']) {
      writeFileSync(join(root, path), read(`../${path}`));
    }
    const pkg = JSON.parse(read('../package.json'));
    const lock = { name: pkg.name, version: '1.0.0', lockfileVersion: 3, packages: {} };
    pkg.version = '1.0.0';
    lock.version = '1.0.0';
    lock.packages[''] = { license: 'TEST LICENSE', name: pkg.name, version: '1.0.0', dependencies: { example: '1.0.0' } };
    lock.packages['node_modules/example'] = { version: '1.0.0', license: 'MIT' };
    writeFileSync(join(root, 'package.json'), JSON.stringify(pkg));
    writeFileSync(join(root, 'package-lock.json'), JSON.stringify(lock, null, 2));
    const result = spawnSync(process.execPath, [join(root, 'scripts/update_version.cjs'), '1.0.1', '修正', 'Fix'], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr + result.stdout);
    const actual = JSON.parse(readFileSync(join(root, 'package-lock.json'), 'utf8'));
    lock.version = '1.0.1';
    lock.packages[''].version = '1.0.1';
    assert.deepEqual(actual, lock);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

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
