import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

// Coverage only: language presence cannot prove that two translations mean the same thing.
export function findReadmeLanguageGaps(markdown) {
  const gaps = [];
  let fence = false;
  const check = (text, line, kind) => {
    // A translated bold label must not mask a Japanese-only explanation.
    const body = kind === 'prose' ? text.replace(/^\s*(?:[-*]\s+|\d+[.)]\s+)?\*\*[^*]+\*\*\s*[:：]?\s*/, '') : text;
    const clean = body.replace(/`[^`]+`/g, '').replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/https?:\/\/\S+/g, '').replace(/<[^>]*>/g, '').replace(/[*_#>|]/g, '').trim();
    if (!clean || /^v?\d+(?:\.\d+)+(?:\s*\([\d-]+\))?$/.test(clean) || /^[\d\s:.,%×~～–—+/$→←↔⇄-]+$/.test(clean) || /^[A-Z][A-Z0-9_]+$/.test(clean)) return;
    const japanese = /[\u3040-\u30ff\u3400-\u9fff]/.test(clean);
    const shortLabel = !/[。.!?！？]/.test(clean);
    const english = kind === 'prose' && !shortLabel
      ? /[A-Za-z][a-z]+(?:[ ,:;()'-]+[A-Za-z][a-z]+){2,}/.test(clean)
      : /[A-Za-z]{2,}/.test(clean);
    if (!japanese || !english) gaps.push({ line, kind, missing: japanese ? 'English' : 'Japanese', text });
  };
  markdown.split(/\r?\n/).forEach((line, index) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    if (fence || !line.trim() || /^\s*(?:---+|<!--|https?:\/\/\S+\s*$|\|[-:| ]+\|\s*$)/.test(line)) return;
    if (/^\s*\|/.test(line)) {
      line.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).forEach(cell => check(cell, index + 1, 'table cell'));
    } else if (/^\s*#{1,6}\s/.test(line)) check(line, index + 1, 'heading');
    else if (/^!?\[!|^!\[|<img\b/.test(line.trim())) {
      const alts = [...line.matchAll(/alt="([^"]+)"|!\[([^\]]*)\]/g)];
      for (const match of alts) check(match[1] ?? match[2], index + 1, 'image description');
    } else check(line, index + 1, 'prose');
  });
  return gaps;
}

export function collectReadmeBodyEvidence(appRoot) {
  const root = resolve(appRoot);
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const releaseConfig = JSON.parse(readFileSync(join(root, '..', 'scripts', 'release-apps.json'), 'utf8'));
  const releaseAsset = releaseConfig.apps.find((app) => app.id === 'nano-banana-pro')?.releaseAssets?.[0]?.path;
  if (!releaseAsset) throw new Error('Nano Banana Pro release asset is not configured');
  const tree = (name) => execFileSync('git', ['-C', root, 'rev-parse', `HEAD:${name}`], { encoding: 'utf8' }).trim();

  return {
    pricingSourceSha256: sha256(['src/lib/openai-image-settings.js', 'src/lib/gemini-image-settings.js', 'src/config/openai-scenario-models.json', 'src/lib/gemini-model-routes.js'].map((name) => readFileSync(join(root, name), 'utf8')).join('\n')),
    manualVersion: JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version,
    manualSourceSha256: sha256(['docs/manuals/build_manuals.py', 'docs/manuals/build_openai_guide.py'].map((name) => readFileSync(join(root, name), 'utf8')).join('\n')),
    manualFiles: readdirSync(join(root, 'public/downloads')).filter((name) => /(?:guide|manual).*\.pdf$/.test(name)).sort().map((name) => ({ name, sha256: sha256(readFileSync(join(root, 'public/downloads', name))) })),
    readmeSha256: sha256(readme),
    readmeLanguageGaps: findReadmeLanguageGaps(readme),
    sourceTree: tree('src'),
    publicTree: tree('public'),
    packageSha256: sha256(readFileSync(join(root, 'package.json'))),
    releaseAssetSha256: sha256(readFileSync(join(root, releaseAsset))),
    reviewedSections: [...readme.matchAll(/^## (?!#)(.+)$/gm)].map((match) => match[1]),
  };
}

// A dated evidence gate, not an automatic claim that upstream prices are current.
export function validatePricingReview(review, evidence, now = Date.now()) {
  const errors = [];
  if (review?.version !== evidence.manualVersion) errors.push('pricing review version is missing or stale');
  if (review?.sourceSha256 !== evidence.pricingSourceSha256) errors.push('pricing source hash is missing or stale');
  const checkedAt = Date.parse(review?.checkedAt);
  if (!Number.isFinite(checkedAt) || checkedAt > now || now - checkedAt > 24 * 60 * 60 * 1000) errors.push('official prices must be checked within 24 hours before every deployment');
  for (const url of ['https://developers.openai.com/api/docs/pricing', 'https://ai.google.dev/gemini-api/docs/pricing']) {
    if (!review?.sources?.includes(url)) errors.push(`missing official pricing source: ${url}`);
  }
  if (typeof review?.findings !== 'string' || review.findings.trim().length < 30) errors.push('pricing findings must distinguish standard and batch rates');
  return errors;
}

export function validateReadmeBodyAudit(audit, evidence) {
  const errors = [];
  for (const gap of evidence.readmeLanguageGaps ?? []) errors.push(`README line ${gap.line} ${gap.kind} is missing ${gap.missing}`);
  if (audit?.manualVersion !== evidence.manualVersion) errors.push('manualVersion is missing or stale');
  if (audit?.manualSourceSha256 !== evidence.manualSourceSha256) errors.push('manualSourceSha256 is missing or stale');
  if (JSON.stringify(audit?.manualFiles) !== JSON.stringify(evidence.manualFiles)) errors.push('manualFiles are missing or stale');
  if (typeof audit?.manualFindings !== 'string' || audit.manualFindings.trim().length < 30) errors.push('manualFindings must record content, version and visual review');
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
