import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveMonochromeRenderIntent, MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT, MONOCHROME_QA_RULE } from '../src/lib/manga-render-mode.js';
import * as renderMode from '../src/lib/manga-render-mode.js';

test('selected monochrome mode survives a manually edited brief without changing its art direction', () => {
  const brief = 'Draw black-and-white manga.\nGEKIGA: carved faces.\nCHIBI: compressed bodies.\nDialogue: 「赤い服」';
  const result = renderMode.ensureMangaColorModeContract(brief, 'monochrome');
  assert.equal(result.slice(0, brief.length), brief);
  assert.equal(renderMode.isMonochromePrompt(result), true);
  assert.match(result, /NEUTRAL INK: R=G=B/);
  assert.match(result, /SCREENED SKIN BASE: dark\/tanned=screen/);
  assert.match(result, /bounded shadows/);
  assert.equal(renderMode.ensureMangaColorModeContract(result, 'monochrome'), result);
  assert.equal(renderMode.ensureMangaColorModeContract(brief, 'color'), brief);
  assert.equal(renderMode.ensureMangaColorModeContract('', 'monochrome'), '');
});

test('style, canonical bases and shadow permission are independent immutable values', () => {
  const skinBases = [{ subject: '乙', base: 'screen' }, { subject: '甲', base: 'paper' }, { subject: '丙', base: 'reference' }];
  const intent = resolveMonochromeRenderIntent({ style: 'GEKIGA', skinBases });
  assert.equal(intent.style, 'GEKIGA');
  assert.deepEqual(intent.skinBases, skinBases);
  assert.deepEqual(intent.screenRoles, ['assigned-material', 'canonical-dark-skin', 'bounded-shadow']);
  assert.ok(Object.isFrozen(intent.skinBases[0]));
  assert.notEqual(intent.skinBases, skinBases);
  assert.match(intent.lineRule, /carved facial planes/);
  const fixed = resolveMonochromeRenderIntent({ style: 'GEKIGA', preserveReferenceStyle: true });
  assert.equal(fixed.style, 'REFERENCE');
  assert.doesNotMatch(fixed.lineRule, /carved facial planes/);
  assert.equal(resolveMonochromeRenderIntent({ style: 'CHIBI_GAG', seriousTone: true }).style, 'NORMAL');
  assert.equal(resolveMonochromeRenderIntent({ style: 'unknown' }).style, 'NORMAL');
});

test('all medium routes allow bounded shadows without density quotas or banning ink antialiasing', () => {
  for (const contract of [MONOCHROME_RENDERING_LOCK, MONOCHROME_RENDERING_LOCK_COMPACT, MONOCHROME_QA_RULE]) {
    assert.match(contract, /bounded.*shadow/i);
    assert.doesNotMatch(contract, /screen lighting\/depth|exactly three visual|screen is sparse|screen, sparse|single screen is sparse|without grey antialias|screen-dominant page\/panel/i);
    assert.match(contract, /(?:page-wide|page\/panel).*veil|veil/i);
  }
});
