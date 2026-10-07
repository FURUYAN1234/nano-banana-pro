import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { collectReadmeBodyEvidence, validateReadmeBodyAudit, validatePricingReview } from '../scripts/readme_body_audit.mjs';

const appRoot = fileURLToPath(new URL('..', import.meta.url));
const audit = JSON.parse(readFileSync(new URL('../docs/readme-body-audit.json', import.meta.url), 'utf8'));
const evidence = collectReadmeBodyEvidence(appRoot);

test('deployment pricing gate accepts current official review and rejects stale, missing or changed evidence', () => {
  const now = Date.parse('2026-10-07T05:00:00Z');
  const review = { version: evidence.manualVersion, sourceSha256: evidence.pricingSourceSha256, checkedAt: '2026-10-07T04:00:00Z', sources: ['https://developers.openai.com/api/docs/pricing', 'https://ai.google.dev/gemini-api/docs/pricing'], findings: 'Reviewed standard image and scenario rates, excluding Batch discounts.' };
  assert.deepEqual(validatePricingReview(review, evidence, now), []);
  for (const patch of [{ version: 'older' }, { sourceSha256: 'changed' }, { checkedAt: '2026-10-05T00:00:00Z' }, { checkedAt: 'invalid' }, { checkedAt: '2026-10-08T00:00:00Z' }, { sources: [review.sources[0]] }, { findings: '' }]) {
    assert.ok(validatePricingReview({ ...review, ...patch }, evidence, now).length > 0);
  }
  assert.ok(validatePricingReview(undefined, evidence, now).length > 0);
  assert.match(readFileSync(new URL('../scripts/pre_deploy_check.js', import.meta.url), 'utf8'), /validatePricingReview\(readmeAudit.pricingReview/);
});

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

test('a new release or a changed PDF requires a renewed manual review', () => {
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, manualVersion: 'next' }).join(' '), /manualVersion/);
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, manualFiles: evidence.manualFiles.map((file) => ({ ...file, sha256: 'changed' })) }).join(' '), /manualFiles/);
  assert.match(validateReadmeBodyAudit({ ...audit, manualFindings: '' }, evidence).join(' '), /manualFindings/);
});
