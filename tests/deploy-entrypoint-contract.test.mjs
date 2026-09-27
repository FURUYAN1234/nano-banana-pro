import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('app validation is read-only and rejects an uncommitted candidate', () => {
  const source = read('../scripts/pre_deploy_check.js');
  assert.match(source, /git status --porcelain/);
  assert.match(source, /Uncommitted changes|uncommitted changes/);
  assert.doesNotMatch(source, /git fetch|git pull|git rebase|git reset|git push/);
});

test('retired Hugging Face entrypoint cannot publish outside the official release transaction', () => {
  const script = read('../scripts/deploy_hf.ps1');
  assert.match(script, /対象外|retired|廃止/i);
  assert.doesNotMatch(script, /git (?:push|reset|pull)|Copy-Item|Remove-Item/);
});
