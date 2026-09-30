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

for (const model of ['gpt-6.1-sol', 'gpt-6-astra', 'gpt-5.6-sol', 'gpt-4.1']) {
  test(`${model}: Chat uses the matching parameter family`, async () => {
    let body;
    globalThis.fetch = async (_url, init) => { body = JSON.parse(init.body); return Response.json(payload(false, { text: 'complete fixture' })); };
    await client.requestOpenAIChatCompletion({ modelId: model, messages: [{role:'user',content:'fixture'}], apiKey:'test-only-credential', timeoutMs:1000 });
    const modern = model !== 'gpt-4.1';
    assert.equal(body.max_completion_tokens, modern ? 32768 : undefined);
    assert.equal(body.max_tokens, modern ? undefined : 8192);
    assert.equal(body.temperature, modern ? undefined : 0.7);
  });
}
for (const web of [false, true]) {
  test(`Sol 6.1 ${web ? 'search' : 'manual'}: selected model reports success and terminal safety refusal does not fall back`, async () => {
    let calls=0, body;
    globalThis.fetch = async (_url, init) => { calls++; body=JSON.parse(init.body); return Response.json(payload(web, {text:'complete fixture'})); };
    const options={modelRoute:'scenario',scenarioModelId:'gpt-6.1-sol',useWebSearch:web};
    const result=await client.callOpenAIText('fixture',null,null,undefined,options);
    assert.equal(result.model,'gpt-6.1-sol');
    assert.equal(web ? body.max_output_tokens : body.max_completion_tokens,32768);
    assert.equal(calls,1);
    globalThis.fetch = async () => { calls++; return Response.json(payload(web,{refusal:true})); };
    await assert.rejects(client.callOpenAIText('fixture',null,null,undefined,options), error=>error.code==='content_policy_violation');
    assert.equal(calls,2);
  });
}

test('Sol 6.1 unavailability falls back to Sol and reports the adopted model', async () => {
  const models=[], logs=[];
  globalThis.fetch=async (_url,init)=> {
    models.push(JSON.parse(init.body).model);
    return models.length===1 ? Response.json({error:{message:'model unavailable',code:'model_not_found'}},{status:404}) : Response.json(payload(false,{text:'complete fixture'}));
  };
  const result=await client.callOpenAIText('fixture',null,null,line=>logs.push(line),{modelRoute:'scenario',scenarioModelId:'gpt-6.1-sol'});
  assert.deepEqual(models,['gpt-6.1-sol','gpt-6-sol']);
  assert.equal(result.model,'gpt-6-sol');
  assert.ok(logs.some(line=>line.includes('最終採用モデル: gpt-6-sol')));
});
