import test from 'node:test';
import assert from 'node:assert/strict';
import { validateVisualStoryEvidence } from '../src/lib/visual-story-evidence.js';

test('visual evidence recognizes the same fullwidth and kanji panel headers as scenario validation', () => {
  for (const numbers of [['１', '２', '３', '４'], ['一', '二', '三', '四']]) {
    const scenario = numbers.map((n, index) => `[${n}コマ目]\n状況: ${index < 2 ? '電車と時刻表' : '駅のホーム'}。`).join('\n');
    const result = validateVisualStoryEvidence({visualEvidence: '電車、時刻表、駅のホーム', scenario});
    assert.equal(result.ok, true, numbers.join(','));
    assert.equal(result.coveredPanels, 4);
  }
});
