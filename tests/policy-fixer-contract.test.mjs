import test, {before, after} from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

let server;
let applyPolicyReplacements;
let assertPolicyRepairPreservesPrompt;
before(async () => {
  server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  ({applyPolicyReplacements, assertPolicyRepairPreservesPrompt} = await server.ssrLoadModule('/src/lib/policy-fixer.js'));
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
