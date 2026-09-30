import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import { createServer } from 'vite';
import { getApiErrorInfo } from '../src/lib/api-errors.js';

let server, client, session;
const originalFetch = globalThis.fetch;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  client = await server.ssrLoadModule('/src/lib/openai-text.js');
  session = await server.ssrLoadModule('/src/lib/api-session.js');
  session.setApiSession('openai', 'test-only-credential');
});
after(async () => { globalThis.fetch = originalFetch; session?.clearApiSession(); await server?.close(); });

const run = (web, logs = []) => client.callOpenAIText('fixture', null, 'fixture instructions', message => logs.push(message), {
  modelRoute: 'scenario', scenarioModelId: 'gpt-6-luna', useWebSearch: web,
});
const payload = (web, { text = '', limited = false, refusal = false } = {}) => web ? {
  status: limited || refusal ? 'incomplete' : 'completed',
  incomplete_details: limited ? { reason: 'max_output_tokens' } : refusal ? { reason: 'content_filter' } : null,
  output: [{ type: 'message', content: refusal ? [{ type: 'refusal', refusal: 'fixture refusal' }] : [{ type: 'output_text', text }] }],
  usage: { input_tokens: 20000, output_tokens: 32768, output_tokens_details: { reasoning_tokens: 32000 } },
} : {
  choices: [{ finish_reason: limited ? 'length' : refusal ? 'content_filter' : 'stop', message: { content: text, refusal: refusal ? 'fixture refusal' : null } }],
  usage: { prompt_tokens: 20000, completion_tokens: 32768, completion_tokens_details: { reasoning_tokens: 32000 } },
};

for (const web of [false, true]) {
  const route = web ? 'Responses search' : 'Chat';
  test(`${route}: reasoning receives headroom without lowering effort or changing the selected model`, async () => {
    let body;
    globalThis.fetch = async (_url, init) => { body = JSON.parse(init.body); return Response.json(payload(web, { text: 'complete fixture' })); };
    const logs = [];
    const result = await run(web, logs);
    assert.equal(body.model, 'gpt-6-luna');
    assert.equal(web ? body.max_output_tokens : body.max_completion_tokens, 32768);
    assert.equal(body.reasoning_effort, undefined);
    assert.equal(result.text, 'complete fixture');
    assert.ok(logs.some(line => line.includes('[RESPONSE]') && line.includes('32000') && line.includes('32768')));
  });

  for (const text of ['', '{"Scenario":"truncated but superficially parseable"}']) {
    test(`${route}: output limit is not an empty response or a usable partial scenario (${text ? 'partial' : 'empty'})`, async () => {
      let calls = 0;
      globalThis.fetch = async () => { calls++; return Response.json(payload(web, { text, limited: true })); };
      await assert.rejects(run(web), error => {
        assert.equal(error.code, 'OUTPUT_TOKEN_LIMIT');
        assert.equal(error.model, 'gpt-6-luna');
        assert.equal(getApiErrorInfo(error).kind, 'output_limit');
        assert.match(error.message, /32768/);
        assert.match(error.message, /32000/);
        return true;
      });
      assert.equal(calls, 1, 'a local output cap must not walk the fallback chain with more paid requests');
    });
  }

  test(`${route}: provider-completed whitespace is truly empty and retains the normal fallback route`, async () => {
    let calls = 0;
    const logs = [];
    globalThis.fetch = async () => Response.json(payload(web, { text: ++calls === 1 ? '  \n ' : 'complete fixture' }));
    const result = await run(web, logs);
    assert.equal(calls, 2);
    assert.equal(result.model, 'gpt-5.6-luna');
    assert.ok(logs.some(line => line.includes('EMPTY_RESPONSE')));
    assert.ok(logs.some(line => line.includes('[RESPONSE]')));
  });

  test(`${route}: structured refusal remains terminal`, async () => {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return Response.json(payload(web, { refusal: true })); };
    await assert.rejects(run(web), error => error.code === 'content_policy_violation');
    assert.equal(calls, 1);
  });
}

test('Responses: other incomplete statuses never become successful text', async () => {
  globalThis.fetch = async () => Response.json({ ...payload(true, { text: 'partial fixture' }), status: 'in_progress' });
  await assert.rejects(run(true), error => error.failures.every(item => item.code === 'INCOMPLETE_RESPONSE'));
});
