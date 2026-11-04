import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildEnhancementReviewPrompt, parseEnhancementReview } from '../src/lib/scenario-enhancement-review.js';
import { runValidatedScenarioEnhancement, validateScenarioEnhancement } from '../src/lib/scenario-enhancement.js';

const original = `## タイトル: 最後の箱
Logline: 閉店する二人が最後の荷物を片付ける。
Location: 倉庫
Outfit: 作業服
Punchline: シリアス
${Array.from({ length: 4 }, (_, i) => `
[${i + 1}コマ目: ${['起','承','転','結'][i]}]
[EMOTION: GEKIGA]
[Camera: アイレベル]
状況: 襟の刺繍がある作業服の甲が箱を持ち、乙は手を添える。
甲「${i === 3 ? 'この箱で終わりだ。' : 'ここに置こう。'}」
（リアクション: 乙→箱を見つめる）`).join('\n')}`;
const candidate = original.replace('この箱で終わりだ。', 'これで店じまいだ。');
const comparison = { originalScenario: original, candidateScenario: candidate, selectedCategories: ['dialogue'] };
const review = (verdict = 'improved', overrides = {}) => ({ categories: [{
  category: 'dialogue', verdict, panel: 4, before: 'この箱で終わりだ。', after: 'これで店じまいだ。',
  gain: '箱の移動だけでなく店との別れを短い言葉で伝える。', ...overrides
}], regressions: [] });
const run = (options = {}) => runValidatedScenarioEnhancement({
  ...comparison, buildPrompt: () => 'test prompt',
  requestEnhancement: async () => ({ text: candidate, usedModel: 'test' }),
  requestReview: async input => parseEnhancementReview(JSON.stringify(review()), input), ...options
});

test('a substantive change passes only after a separate comparison with verified quotes', async () => {
  let compared = 0;
  const result = await run({ requestReview: async input => {
    compared++; return parseEnhancementReview(JSON.stringify(review()), input);
  } });
  assert.equal(compared, 1);
  assert.equal(result.validation.ok, true);
  assert.deepEqual(result.validation.improvedCategories, ['dialogue']);
  assert.equal(result.text, candidate);
});

test('synonym-only changes cannot succeed just because the selected field changed', async () => {
  const synonym = original.replace('この箱で終わりだ。', 'この箱で終了だ。');
  assert.equal(validateScenarioEnhancement({ ...comparison, candidateScenario: synonym }).ok, true);
  const result = await run({ requestEnhancement: async () => ({ text: synonym }),
    requestReview: async input => parseEnhancementReview(JSON.stringify(review('no_gain', {
      after: 'この箱で終了だ。', gain: '終了という同義語へ変えただけで意味と間が変わらない。'
    })), input) });
  assert.equal(result.fallbackToOriginal, true);
  assert.equal(result.validation.ok, false);
  assert.equal(result.text, original);
  assert.equal(result.attempts, 2);
  assert.ok(result.rejectedValidation.issueCodes.includes('semantic_dialogue_no_gain'));
});

test('punctuation-only candidates are rejected locally without paying for comparison', async () => {
  let compared = 0;
  const result = await run({ requestEnhancement: async () => ({ text: original.replace('終わりだ。', '終わりだ！') }),
    requestReview: async () => { compared++; return review(); } });
  assert.equal(compared, 0);
  assert.equal(result.fallbackToOriginal, true);
  assert.ok(result.rejectedValidation.issueCodes.includes('formatting_only'));
});

test('a verified gain never overrides lost character rendering or other regressions', async () => {
  const degraded = candidate.replace('襟の刺繍がある作業服の甲', '簡単な線だけで描いた甲');
  const result = await run({ selectedCategories: ['dialogue', 'body'],
    requestEnhancement: async () => ({ text: degraded }), requestReview: async input => {
      const response = review();
      response.categories.push({category:'body', verdict:'no_gain', panel:1,
        before:'襟の刺繍がある作業服の甲', after:'簡単な線だけで描いた甲', gain:'動作は改善されていない。'});
      response.regressions.push({panel:1, before:'襟の刺繍がある作業服の甲', after:'簡単な線だけで描いた甲', reason:'衣装の刺繍と描き込みが失われた。'});
      return parseEnhancementReview(JSON.stringify(response), input);
    } });
  assert.equal(result.fallbackToOriginal, true);
  assert.ok(result.rejectedValidation.issueCodes.includes('semantic_regression'));
});

test('uncertain or failed comparison cannot be reported as successful enhancement', async () => {
  for (const requestReview of [async () => review('uncertain'), async () => { throw new Error('review unavailable'); }]) {
    const result = await run({ requestReview });
    assert.equal(result.fallbackToOriginal, true);
    assert.equal(result.validationWarning, true);
    assert.equal(result.validation.ok, false);
  }
});

test('fabricated, wrong-panel or missing evidence is rejected', () => {
  for (const value of [review('improved', {before:'存在しないセリフ'}), review('improved', {panel:1}),
    {...review(), categories:[]}, {...review(), regressions:[{panel:4,before:'この箱で終わりだ。',after:'存在しない',reason:'退行'}]}]) {
    assert.throws(() => parseEnhancementReview(JSON.stringify(value), comparison));
  }
  const unchangedQuote = review('improved', { before:'甲', after:'甲' });
  assert.equal(parseEnhancementReview(JSON.stringify(unchangedQuote), comparison).categories[0].verdict, 'no_gain');
});

test('cancellation during review propagates without retrying or adopting a candidate', async () => {
  const controller = new AbortController();
  let authored = 0;
  await assert.rejects(run({ signal:controller.signal,
    requestEnhancement: async () => { authored++; return {text:candidate}; },
    requestReview: async () => { controller.abort(); return review(); }
  }), { name:'AbortError' });
  assert.equal(authored, 1);
});

test('comparison is mandatory and production uses the selected scenario model and cancellation signal', async () => {
  await assert.rejects(run({requestReview:undefined}), /API検査/);
  const provider = readFileSync(new URL('../src/lib/scenario-provider.js', import.meta.url), 'utf8');
  assert.match(provider, /callAI\(buildEnhancementReviewPrompt\(comparison\), \[\], context, onProgress, options\)/);
  assert.match(provider, /parseEnhancementReview\(review.text, comparison\)/);
  assert.match(provider, /modelRoute: 'scenario', scenarioModelId, signal/);
  const prompt = buildEnhancementReviewPrompt(comparison);
  assert.ok(prompt.includes(original) && prompt.includes(candidate));
  assert.match(prompt, /人物を簡素に描く指示/);
});
