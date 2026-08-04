import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('release tooling carries patch 9 and rejects two-digit minor or patch versions', async () => {
  const [updater, preDeploy] = await Promise.all([
    readFile(new URL('../scripts/update_version.cjs', import.meta.url), 'utf8'),
    readFile(new URL('../scripts/pre_deploy_check.js', import.meta.url), 'utf8')
  ]);

  assert.match(updater, /function getExpectedNextVersion\(currentVersion\)/);
  assert.match(updater, /patch === 9/);
  assert.match(updater, /minor === 9/);
  assert.match(updater, /nextMinor > 9 \|\| nextPatch > 9/);
  assert.match(updater, /packageLock: path\.join\(__dirname, '\.\.\/package-lock\.json'\)/);
  assert.match(updater, /must advance from v\$\{currentVersion\} to v\$\{expectedVersion\}/);

  assert.match(preDeploy, /minor > 9 \|\| patch > 9/);
});
