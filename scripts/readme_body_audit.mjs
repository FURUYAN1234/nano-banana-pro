import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

export function collectReadmeBodyEvidence(appRoot) {
  const root = resolve(appRoot);
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const releaseConfig = JSON.parse(readFileSync(join(root, '..', 'scripts', 'release-apps.json'), 'utf8'));
  const releaseAsset = releaseConfig.apps.find((app) => app.id === 'nano-banana-pro')?.releaseAssets?.[0]?.path;
  if (!releaseAsset) throw new Error('Nano Banana Pro release asset is not configured');
  const tree = (name) => execFileSync('git', ['-C', root, 'rev-parse', `HEAD:${name}`], { encoding: 'utf8' }).trim();

  return {
    readmeSha256: sha256(readme),
    sourceTree: tree('src'),
    publicTree: tree('public'),
    packageSha256: sha256(readFileSync(join(root, 'package.json'))),
    releaseAssetSha256: sha256(readFileSync(join(root, releaseAsset))),
    reviewedSections: [...readme.matchAll(/^## (?!#)(.+)$/gm)].map((match) => match[1]),
  };
}

export function validateReadmeBodyAudit(audit, evidence) {
  const errors = [];
  for (const field of ['readmeSha256', 'sourceTree', 'publicTree', 'packageSha256', 'releaseAssetSha256']) {
    if (!audit || audit[field] !== evidence[field]) errors.push(`${field} is missing or stale`);
  }
  if (!audit || JSON.stringify(audit.reviewedSections) !== JSON.stringify(evidence.reviewedSections)) {
    errors.push('reviewedSections must list every current README section in order');
  }
  if (typeof audit?.findings !== 'string' || audit.findings.trim().length < 30) {
    errors.push('findings must record the human body review and its result');
  }
  return errors;
}
