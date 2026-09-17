import test from 'node:test';
import assert from 'node:assert/strict';
import { splitSnsExplanation, buildSnsExplanation, normalizeSources, openAISources, geminiSources, cleanScenarioTopic } from '../src/lib/sns-explanation.js';

const text = '[SNS_EXPLANATION]\n題材の解説\n確認された内容。\n[/SNS_EXPLANATION]\nTopic: 題名\nScenario: 台本';

test('search citations cannot become visible manga title text', () => {
  assert.equal(cleanScenarioTopic('題名 ([source](https://example.com/news/))'), '題名');
  assert.equal(cleanScenarioTopic('題名 [source](https://example.com/news/)'), '題名');
  assert.equal(cleanScenarioTopic('普通の題名（補足）'), '普通の題名（補足）');
});

test('posting metadata is removed from script and missing/unfinished blocks cannot leak', () => {
  assert.deepEqual(splitSnsExplanation(text), { explanation: '題材の解説\n確認された内容。', text: 'Topic: 題名\nScenario: 台本' });
  assert.equal(splitSnsExplanation('Scenario: 本文').explanation, '');
  assert.equal(splitSnsExplanation('Scenario: 本文\n[SNS_EXPLANATION]broken').text, 'Scenario: 本文');
});

test('only provider citations become news reference links, deduplicated and safe', () => {
  const sources = openAISources({ output: [{ content: [{ annotations: [
    { type: 'url_citation', url: 'https://example.com/source', title: '出典' },
    { type: 'url_citation', url: 'https://example.com/source', title: '重複' },
    { type: 'other', url: 'https://example.com/ignore' }
  ] }] }] });
  assert.equal(sources.length, 1);
  const output = buildSnsExplanation({ text: text.replace('確認された内容。', '確認された内容。[偽リンク](https://fake.example/news)'), sources, inputMode: 'news' });
  assert.match(output.text, /参考リンク\n出典\nhttps:\/\/example.com\/source/);
  assert.doesNotMatch(output.text, /fake.example|Scenario:/);
  assert.deepEqual(normalizeSources([{ url: 'javascript:alert(1)' }, { url: 'https://user:pass@example.com/' }]), []);
});

test('Gemini grounding sources and absent sources are handled explicitly', () => {
  assert.deepEqual(geminiSources({ groundingMetadata: { groundingChunks: [{ web: { uri: 'https://example.com/', title: '資料' } }, {}] } }), [{ url: 'https://example.com/', title: '資料' }]);
  assert.match(buildSnsExplanation({ text, inputMode: 'news' }).notice, /取得されていません/);
  assert.match(buildSnsExplanation({ text: 'Scenario: 本文', inputMode: 'news' }).notice, /解説を取得できません/);
});

test('manual input retains only supplied URLs and identifies them as needing confirmation', () => {
  const output = buildSnsExplanation({ text, inputMode: 'manual', manualTopic: '話題 https://example.com/article。', sources: [{ url: 'https://ignored.example/' }] });
  assert.match(output.text, /入力URL・内容は要確認/);
  assert.match(output.text, /https:\/\/example.com\/article$/);
  assert.doesNotMatch(output.text, /ignored/);
  assert.doesNotMatch(buildSnsExplanation({ text, inputMode: 'manual', manualTopic: '創作テーマ' }).text, /https?:/);
});

test('fiction disclaimer uses parentheses without double wrapping', () => {
  for (const disclaimer of ['実在のニュースではありません。', '実在のニュースや事件の紹介ではありません。']) {
    const result = splitSnsExplanation(`[SNS_EXPLANATION]紹介文。${disclaimer}[/SNS_EXPLANATION]`);
    assert.equal(result.explanation, `紹介文。\n（${disclaimer}）`);
    assert.equal(splitSnsExplanation(`[SNS_EXPLANATION]${result.explanation}[/SNS_EXPLANATION]`).explanation, result.explanation);
    assert.equal(splitSnsExplanation(`[SNS_EXPLANATION]紹介文。（${disclaimer}）[/SNS_EXPLANATION]`).explanation, result.explanation);
  }
});
