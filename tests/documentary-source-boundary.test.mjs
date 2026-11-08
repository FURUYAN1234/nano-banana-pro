import assert from 'node:assert/strict';
import test from 'node:test';
import {
  selectDocumentarySourceText,
  validateDocumentarySourceFidelity,
  attachDocumentarySourceFacts
} from '../src/lib/documentary-source-fidelity.js';

const select = (manualTopic, extractedArticleText = '') => selectDocumentarySourceText({
  inputMode: 'manual', manualTopic, extractedArticleText
});

test('creative drawing directions are not documentary quotations or internal facts', () => {
  const direction = '色々な角度やアングル、コマ枠をキャラが一部ぶち抜いたりはみ出したり、超高速で飛んだり撥ねたり、エフェクトバリバリで、異世界大大大バトルを描く。';
  const sourceText = select(direction);
  const scenarioText = '[1コマ目]\n状況: 魔法使いが渓谷を跳び越える。光の軌跡が斜めの枠から伸びる。';
  assert.equal(sourceText, '');
  assert.equal(validateDocumentarySourceFidelity({sourceText, scenarioText}).ok, true);
  assert.equal(attachDocumentarySourceFacts(scenarioText, sourceText), scenarioText);
});

test('unrelated authoring directions are excluded without a sample-specific vocabulary', () => {
  for (const direction of [
    '俯瞰カメラとローアングルを交互に使って描いてください。',
    '演出指示: 柔らかな線画と大胆なコマ割りで表現する。',
    '2コマ目は水彩、最終コマは劇画にしてください。'
  ]) assert.equal(select(direction), '', direction);
});

test('mixed source and direction preserve all factual checks', () => {
  const facts = '市の施設は4月から受付時間を20時から18時へ変更する。利用者には事前通知を行った。代替窓口も増設した。';
  const sourceText = select(`${facts}\n俯瞰カメラとローアングルを交互に使って描いてください。`);
  assert.equal(sourceText.replace(/\s/g, ''), facts);
  assert.equal(validateDocumentarySourceFidelity({sourceText, scenarioText: facts}).ok, true);
  const bad = validateDocumentarySourceFidelity({sourceText, scenarioText: facts.replace('20時', '21時')});
  assert.equal(bad.ok, false);
  assert.ok(bad.missingAnchors.includes('20時'));
});

test('numeric facts embedded in a drawing request remain protected', () => {
  const text = '4月に3人が救助された場面を俯瞰カメラで描いてください。';
  assert.equal(select(text), text);
  assert.equal(validateDocumentarySourceFidelity({sourceText: select(text), scenarioText: '救助活動を描く。'}).ok, false);
});

test('reported art, quoted requests and ambiguous source prose are retained', () => {
  for (const text of [
    '画家はカメラで撮った街を線画で描く。',
    '監督は「俯瞰カメラで描いてください」と指示した。',
    '研究所は新方式を発表し、その構図を漫画で描いてください。',
    '工房では繊細な線画の制作を続けている。'
  ]) assert.equal(select(text), text);
});

test('retrieved article text is never filtered as a user drawing directive', () => {
  const article = '全コマを斜めの構図で描いてください。';
  assert.equal(select('構図を変えて描いてください。', article), article);
});
