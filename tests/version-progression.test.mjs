import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('release tooling does not force a minor bump after patch 9', async () => {
  const [updater, preDeploy] = await Promise.all([
    readFile(new URL('../scripts/update_version.cjs', import.meta.url), 'utf8'),
    readFile(new URL('../scripts/pre_deploy_check.js', import.meta.url), 'utf8')
  ]);

  for (const source of [updater, preDeploy]) {
    assert.doesNotMatch(source, /patch version is ['"]9['"]/);
    assert.doesNotMatch(source, /remoteParts\[2\] === 9/);
  }
});
