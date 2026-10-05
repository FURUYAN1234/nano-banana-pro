import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {readFileSync} from 'node:fs';

let server;
let applyPolicyReplacements;
let assertPolicyRepairPreservesPrompt;
let getPolicyAnalysisPrompt, getPolicyFallbackPrompt;
const fixerSource = readFileSync(new URL('../src/lib/policy-fixer.js', import.meta.url), 'utf8');
before(async () => {
  server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  ({applyPolicyReplacements, assertPolicyRepairPreservesPrompt} = await server.ssrLoadModule('/src/lib/policy-fixer.js'));
  ({getPolicyAnalysisPrompt, getPolicyFallbackPrompt} = await server.ssrLoadModule('/src/lib/prompts.js'));
});
after(async () => {await server?.close();});

test('policy replacement inserts dollar sequences literally', () => {
  const result = applyPolicyReplacements('before unsafe after', [{from:'unsafe',to:'$&-$`-$$'}]);
  assert.equal(result.modifiedPrompt, 'before $&-$`-$$ after');
  assert.equal(result.appliedCount, 1);
});

test('full policy repair cannot silently rewrite a bubble or title', () => {
  const original = 'Top title EXACTLY "原題"\n## Panel 1\nTEXT (PRINT VALUES ONLY): B1="台詞。"';
  assert.throws(() => assertPolicyRepairPreservesPrompt(original, original.replace('台詞。', '別の台詞。')), /台詞/);
  assert.throws(() => assertPolicyRepairPreservesPrompt(original, original.replace('原題', '別題')), /タイトル/);
  assert.equal(assertPolicyRepairPreservesPrompt(original, original), original);
});

// Run the production function with only its API transport replaced.
const fixWith = callAI => new Function('callAI', 'getPolicyAnalysisPrompt', 'getPolicyFallbackPrompt',
  'applyPolicyReplacements', 'assertPolicyRepairPreservesPrompt',
  `return (${fixerSource.slice(fixerSource.indexOf('export async function fixPolicyViolation') + 'export '.length)});`
)(callAI, getPolicyAnalysisPrompt, getPolicyFallbackPrompt, applyPolicyReplacements, assertPolicyRepairPreservesPrompt);

test('the next policy analysis receives the concrete rejected-plan feedback', async () => {
  const requests = [];
  const fix = fixWith(async prompt => {
    requests.push(prompt);
    return {text: '[{"from":"intense effect","to":"gentle effect","reason":"lower intensity"}]'};
  });
  const finalPrompt = 'Approved scene with intense effect';
  const first = await fix({finalPrompt, policyErrorMsg: 'generic refusal', onProgress: () => {}});
  const repairFeedback = '前案はモザイク除外指定を削除したため不採用。描画設定を保持した別案を検討する。';
  const next = await fix({finalPrompt, policyErrorMsg: 'generic refusal', repairFeedback, onProgress: () => {}});
  assert.equal(first.success, true);
  assert.equal(next.success, true);
  assert.equal(requests.length, 2);
  assert.ok(requests[1].includes(repairFeedback));
  assert.ok(!requests[0].includes(repairFeedback));
  assert.equal(requests[1].split(finalPrompt).length - 1, 1);
});

test('policy fallback receives the same rejected-plan feedback without repeating the source prompt', async () => {
  const requests = [];
  const finalPrompt = `Approved scene with intense effect. ${'Preserve identity and camera. '.repeat(5)}`;
  const repairFeedback = '前案が既出の指示文へ戻ったため不採用。別の変更を検討する。';
  const fix = fixWith(async prompt => {
    requests.push(prompt);
    return {text: requests.length === 1 ? '[{"from":"missing phrase","to":"replacement"}]' : finalPrompt.replace('intense', 'gentle')};
  });
  assert.equal((await fix({finalPrompt, policyErrorMsg: 'generic refusal', repairFeedback, onProgress: () => {}})).success, true);
  assert.equal(requests.length, 2);
  for (const prompt of requests) {
    assert.ok(prompt.includes(repairFeedback));
    assert.equal(prompt.split(finalPrompt).length - 1, 1);
  }
});

test('no identified compliant revision is reported without an invented fallback rewrite', async () => {
  let requests = 0;
  const messages = [];
  const result = await fixWith(async () => { requests++; return {text: '[]'}; })({
    finalPrompt: 'Approved scene', policyErrorMsg: 'generic refusal', repairFeedback: '前案が無変更だった。',
    onProgress: message => messages.push(message),
  });
  assert.equal(requests, 1);
  assert.equal(result.success, false);
  assert.equal(result.reason, 'no_safe_revision');
  assert.match(result.message, /特定できません/);
  assert.ok(messages.includes(result.message));
});

for (const fallback of [false, true]) {
  test(`${fallback ? 'fallback' : 'replacement'} contract failure is returned for replanning without another API call`, async () => {
    const original = `Top title EXACTLY "原題"\n## Panel 1\nTEXT (PRINT VALUES ONLY): B1="台詞。"\n${'Preserve the approved scene. '.repeat(4)}`;
    let requests = 0;
    const result = await fixWith(async () => {
      requests++;
      return {text: fallback
        ? requests === 1 ? '[{"from":"missing phrase","to":"replacement"}]' : original.replace('台詞。', '別の台詞。')
        : '[{"from":"台詞。","to":"別の台詞。"}]'};
    })({finalPrompt: original, policyErrorMsg: 'generic refusal', onProgress: () => {}});
    assert.equal(result.success, false);
    assert.equal(result.reason, 'invalid_repair');
    assert.match(result.message, /台詞/);
    assert.equal(requests, fallback ? 2 : 1);
  });
}

test('cancelling during policy analysis prevents the paid fallback request', async () => {
  let stopped = false, requests = 0;
  const result = await fixWith(async () => {
    requests++;
    stopped = true;
    return {text: '[{"from":"missing phrase","to":"replacement"}]'};
  })({finalPrompt: 'Approved scene', policyErrorMsg: 'generic refusal', shouldStop: () => stopped, onProgress: () => {}});
  assert.equal(requests, 1);
  assert.equal(result.success, false);
  assert.equal(result.reason, 'cancelled');
});

test('a pre-cancelled policy repair makes no text API request', async () => {
  let requests = 0;
  const result = await fixWith(async () => { requests++; return {text: '[]'}; })({
    finalPrompt: 'Approved scene', policyErrorMsg: 'generic refusal', shouldStop: () => true, onProgress: () => {},
  });
  assert.equal(requests, 0);
  assert.equal(result.reason, 'cancelled');
});

test('policy transport errors still propagate instead of becoming rejected-plan feedback', async () => {
  const error = new Error('transport disconnected');
  await assert.rejects(fixWith(async () => { throw error; })({
    finalPrompt: 'Approved scene', policyErrorMsg: 'generic refusal', onProgress: () => {},
  }), error);
});

for (const fallback of [false, true]) {
  test(`${fallback ? 'short fallback' : 'empty analysis'} response is returned for replanning instead of throwing`, async () => {
    let requests = 0;
    const result = await fixWith(async () => {
      requests++;
      return {text: fallback
        ? requests === 1 ? '[{"from":"missing phrase","to":"replacement"}]' : 'Too short'
        : '   '};
    })({finalPrompt: 'Approved scene', policyErrorMsg: 'generic refusal', onProgress: () => {}});
    assert.equal(result.success, false);
    assert.equal(result.reason, 'invalid_response');
    assert.match(result.message, fallback ? /フォールバック/ : /応答が空/);
    assert.equal(requests, fallback ? 2 : 1);
    assert.equal(result.modifiedPrompt, undefined);
  });
}
