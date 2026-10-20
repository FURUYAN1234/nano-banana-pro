import assert from 'node:assert/strict';
import test from 'node:test';
import * as validation from '../src/lib/scenario-validation.js';

const scenario = count => Array.from({length:count}, (_,i)=>`[${i+1}コマ目]\n状況: 手元の変化を確認する。\nA「確認した。」`).join('\n');

test('content-based selection resolves four panels and every supported native count', () => {
  for (const count of [4,5,6,7,8]) {
    const reason = count === 4 ? '導入、行動、変化、結末が一つずつで伝わる' : '原因から結果までの行動と判断を分けて見せる必要がある';
    assert.deepEqual(validation.resolveAutoScenarioMode({scenario:scenario(count),panelCountReason:reason}), {
      scenarioMode:count===4?'four-panel':'experimental-manga',panelCount:count,reason,
    });
  }
});

test('auto selection rejects missing reasons, out-of-range counts and broken sequences', () => {
  for (const count of [0,3,9]) {
    assert.throws(()=>validation.resolveAutoScenarioMode({scenario:scenario(count),panelCountReason:'内容に必要'}));
  }
  for (const reason of ['', '  ', undefined]) {
    assert.throws(()=>validation.resolveAutoScenarioMode({scenario:scenario(4),panelCountReason:reason}));
  }
  for (const text of [scenario(5).replace('[3コマ目]','[2コマ目]'),scenario(5).replace('[3コマ目]','[8コマ目]')]) {
    assert.throws(()=>validation.resolveAutoScenarioMode({scenario:text,panelCountReason:'内容に必要'}));
  }
});

test('ordinary manual mode contracts still reject a scenario from the other mode', () => {
  assert.equal(validation.assertScenarioPanelStructure(scenario(4),{scenarioMode:'four-panel'}),true);
  assert.equal(validation.assertScenarioPanelStructure(scenario(6),{scenarioMode:'experimental-manga'}),true);
  assert.throws(()=>validation.assertScenarioPanelStructure(scenario(6),{scenarioMode:'four-panel'}));
  assert.throws(()=>validation.assertScenarioPanelStructure(scenario(4),{scenarioMode:'experimental-manga'}));
});
