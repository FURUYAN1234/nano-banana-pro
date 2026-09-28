import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { collectReadmeBodyEvidence, validateReadmeBodyAudit } from '../scripts/readme_body_audit.mjs';

const appRoot = fileURLToPath(new URL('..', import.meta.url));
const audit = JSON.parse(readFileSync(new URL('../docs/readme-body-audit.json', import.meta.url), 'utf8'));
const evidence = collectReadmeBodyEvidence(appRoot);

test('pre-deploy check requires a review of the exact README body and release inputs', () => {
  const preDeploy = readFileSync(new URL('../scripts/pre_deploy_check.js', import.meta.url), 'utf8');
  assert.match(preDeploy, /validateReadmeBodyAudit\(readmeAudit, collectReadmeBodyEvidence\(process\.cwd\(\)\)\)/);
  assert.deepEqual(validateReadmeBodyAudit(audit, evidence), []);
});

test('a changed README, source tree, or section list invalidates the prior audit', () => {
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, readmeSha256: 'changed' }).join(' '), /readmeSha256/);
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, sourceTree: 'changed' }).join(' '), /sourceTree/);
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, reviewedSections: [...evidence.reviewedSections, 'New section'] }).join(' '), /reviewedSections/);
});

test('an empty review finding cannot satisfy the release gate', () => {
  assert.match(validateReadmeBodyAudit({ ...audit, findings: '' }, evidence).join(' '), /findings/);
});
