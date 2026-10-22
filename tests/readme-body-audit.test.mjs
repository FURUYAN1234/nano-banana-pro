import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { collectReadmeBodyEvidence, validateReadmeBodyAudit, validatePricingReview } from '../scripts/readme_body_audit.mjs';

const appRoot = fileURLToPath(new URL('..', import.meta.url));
const audit = JSON.parse(readFileSync(new URL('../docs/readme-body-audit.json', import.meta.url), 'utf8'));
const evidence = collectReadmeBodyEvidence(appRoot);

test('current README explains the default page mode and scoped technique guide', () => {
  const current = readFileSync(new URL('../README.md', import.meta.url), 'utf8').split(/^## .*ChangeLog/m)[0];
  for (const expected of [
    /初期状態は右の「5～8コマ生成」です/,
    /再読み込み後は右の「5～8コマ生成」です/,
    /reload resets the switch to the right, 5–8-panel position/,
    /カラーのPOP・水彩・劇画/,
    /白黒、カスタム画風.*SeriousDocumentary.*添付しません/,
    /nano-panel-media\.png.*最後に添付/,
  ]) assert.ok(expected.test(current), `Missing current documentation: ${expected}`);
  assert.ok(!/初期状態(?:は|が)左の「4コマ生成」|Six- and eight-panel pages exclude/.test(current));
});

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

test('language omissions fail the shared release gate even with matching file hashes', () => {
  const gaps = [{line: 42, kind: 'prose', missing: 'English'}];
  assert.match(validateReadmeBodyAudit(audit, {...evidence, readmeLanguageGaps: gaps}).join(' '), /README line 42 prose is missing English/);
});

test('a new release or a changed PDF requires a renewed manual review', () => {
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, manualVersion: 'next' }).join(' '), /manualVersion/);
  assert.match(validateReadmeBodyAudit(audit, { ...evidence, manualFiles: evidence.manualFiles.map((file) => ({ ...file, sha256: 'changed' })) }).join(' '), /manualFiles/);
  assert.match(validateReadmeBodyAudit({ ...audit, manualFindings: '' }, evidence).join(' '), /manualFindings/);
});
