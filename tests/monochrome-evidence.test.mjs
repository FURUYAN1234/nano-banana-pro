import test from 'node:test';
import assert from 'node:assert/strict';
import { assessMonochromeEvidence, parseImageQualityQaResponse } from '../src/lib/image-quality-qa.js';
import { isMaterialImageQualityIssue } from '../src/lib/image-quality-failsafe.js';

const context = { sourceViews: [{ hash: 'source-png', stage: 'original', width: 1000, height: 1400,
  region: { x: 0, y: 0, width: 1000, height: 1400 }, scale: 1 }] };
const issue = (change = {}) => ({ type: 'monochrome_rendering', panel: 2, monochromeEvidence: {
  sourceHash: 'source-png', sourceStage: 'original', scale: 1,
  region: { x: 100, y: 200, width: 100, height: 100 }, expectedRole: 'paper',
  observedPattern: 'broad-screen-veil', observation: 'Dots cover the light wall and unshaded light skin.',
  materialImpact: 'material', status: 'defect', detailScale: 'broad', ...change,
} });

test('only localized material mismatches from supplied native image evidence permit repair', () => {
  assert.equal(isMaterialImageQualityIssue({ type: 'monochrome_rendering' }), false);
  assert.equal(isMaterialImageQualityIssue(issue(), context), true);
  for (const change of [
    { sourceHash: 'invented' }, { sourceStage: 'preview' }, { scale: 0.5 },
    { region: { x: 950, y: 200, width: 100, height: 100 } },
    { region: { x: 1.5, y: 1, width: 10, height: 10 } },
    { observation: '' }, { materialImpact: 'minor' }, { status: 'uncertain' },
    { expectedRole: 'canonical-dark-skin' }, { detailScale: 'fine' },
  ]) assert.equal(isMaterialImageQualityIssue(issue(change), context), false, JSON.stringify(change));
  assert.equal(assessMonochromeEvidence(issue({ status: 'ok', expectedRole: 'bounded-shadow' }), context).status, 'pass');
  assert.equal(isMaterialImageQualityIssue(issue({ expectedRole: 'canonical-dark-skin', observedPattern: 'base-whitened' }), context), true);
  const roi = { sourceViews: [{ ...context.sourceViews[0], region: { x: 50, y: 150, width: 200, height: 200 } }] };
  assert.equal(isMaterialImageQualityIssue(issue({ detailScale: 'fine' }), roi), true);
  assert.equal(isMaterialImageQualityIssue(issue({ detailScale: 'fine' }), { sourceViews: [{ ...roi.sourceViews[0], scale: 2 }] }), false);
});

test('QA ignores model provenance and downgrades unsupported monochrome claims', () => {
  const response = JSON.stringify({ pass: false, issues: [issue()], evidenceContext: context });
  const untrusted = parseImageQualityQaResponse(response);
  assert.equal(untrusted.issues[0].type, 'unverified');
  assert.equal(untrusted.evidenceContext, undefined);
  const trusted = parseImageQualityQaResponse(response, { evidenceContext: context });
  assert.equal(trusted.issues[0].type, 'monochrome_rendering');
  assert.equal(trusted.evidenceContext, context);
  const truncated = parseImageQualityQaResponse(response, { evidenceContext: context, finishReason: 'length' });
  assert.ok(truncated.issues.every(i => !isMaterialImageQualityIssue(i, context)));
});
