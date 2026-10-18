import assert from 'node:assert/strict';
import test from 'node:test';
import { getEndingModePolicy, resolveGeneratedEnding, resolveScenarioEndingType } from '../src/lib/ending-mode-policy.js';

const endings = [
  ['AngerProtest', '怒り・抗議', 'serious'],
  ['EarnedReversal', '逆転・反撃', 'serious'],
  ['ComicRage', '激怒・逆ギレ', 'gag'],
  ['SelfInflicted', '自業自得・ブーメラン', 'gag'],
  ['RoleReversal', '立場逆転', 'gag']
];

for (const [type, label, tone] of endings) {
  test(`${label} resolves within its selected family and preserves explicit selections`, () => {
    const policy = getEndingModePolicy(type);
    assert.equal(policy.label, label);
    assert.equal(policy.endingTone, tone);
    assert.equal(policy.documentary, false);
    assert.equal(policy.preserveReferenceStyle, false);
    assert.equal(resolveScenarioEndingType(`Punchline: ${label}`, ''), type);
    assert.equal(resolveScenarioEndingType(`Punchline: ${type}`, ''), type);
    const family = tone === 'serious' ? 'SeriousAuto' : 'GagAuto';
    const otherFamily = tone === 'serious' ? 'GagAuto' : 'SeriousAuto';
    assert.deepEqual(resolveGeneratedEnding({ activeType: family, generatedPunchline: label }), { type, label });
    assert.equal(resolveGeneratedEnding({ activeType: otherFamily, generatedPunchline: label }).type, otherFamily);
    assert.deepEqual(resolveGeneratedEnding({ activeType: type, generatedPunchline: '夢オチ (ループ)' }), { type, label });
  });
}
