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

const run = (web, logs = [], scenarioModelId = 'gpt-6-luna') => client.callOpenAIText('fixture', null, 'fixture instructions', message => logs.push(message), {
  modelRoute: 'scenario', scenarioModelId, useWebSearch: web,
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

test('independent STEP1 and STEP3 selections reach the matching OpenAI requests', async () => {
  const bodies = [];
  globalThis.fetch = async (_url, init) => {
    bodies.push(JSON.parse(init.body));
    return Response.json(payload(false, { text: 'complete fixture' }));
  };
  await client.callOpenAIText('analyze', ['data:image/png;base64,fixture'], null, null,
    { visionModelId: 'gpt-6-luna' });
  await client.callOpenAIText('assemble', null, null, null,
    { modelRoute: 'scenario', scenarioModelId: 'gpt-6-sol' });
  assert.deepEqual(bodies.map(body => body.model), ['gpt-6-luna', 'gpt-6-sol']);
  assert.match(JSON.stringify(bodies[0].messages), /image_url/);
  assert.doesNotMatch(JSON.stringify(bodies[1].messages), /image_url/);
});

test('primary image QA uses model-specific headroom and reports the actual request limit', async () => {
  for (const target of ['gpt-6.1-sol', 'gpt-6-sol', 'gpt-5.6-luna']) {
    const bodies = [], logs = [];
    globalThis.fetch = async (_url, init) => {
      const body = JSON.parse(init.body); bodies.push(body);
      return body.model === target ? Response.json(payload(false, { text: 'complete review'.repeat(1000) }))
        : Response.json({ error: { message: 'Temporary fixture outage' } }, { status: 503 });
    };
    const result = await client.callOpenAIText('review', ['data:image/png;base64,fixture'], null,
      line => logs.push(line), { outputProfile: 'image-quality-review' });
    const limit = 32768;
    assert.equal(result.model, target);
    assert.equal(bodies.at(-1).max_completion_tokens, limit);
    assert.ok(logs.some(line => line.includes('[RESPONSE]') && line.includes(`limit=${limit}`)));
    assert.ok(logs.some(line => line.includes(`${limit.toLocaleString()} tokens`)));
  }
});

test('primary QA truncation never walks the fallback chain or accepts parseable partial JSON', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json(payload(false, { text: '{"pass":true,"issues":[]}', limited: true })); };
  await assert.rejects(client.callOpenAIText('review', ['data:image/png;base64,fixture'], null, null,
    { outputProfile: 'image-quality-review' }), error => error.code === 'OUTPUT_TOKEN_LIMIT' && /limit=32768/.test(error.message));
  assert.equal(calls, 1);
});

test('invalid output purpose fails before a provider request', async () => {
  globalThis.fetch = async () => assert.fail('invalid local option cannot spend a request');
  await assert.rejects(client.callOpenAIText('review', null, null, null, { outputProfile: 'unbounded' }), /Unsupported output profile/);
});

test('explicit JSON output reaches the Chat request without changing ordinary text requests', async () => {
  const bodies = [];
  globalThis.fetch = async (_url, init) => {
    bodies.push(JSON.parse(init.body));
    return Response.json(payload(false, { text: '{"status":"unverified"}' }));
  };
  for (const responseFormat of [undefined, 'json_object']) {
    const result = await client.callOpenAIText('Return JSON.', ['data:image/png;base64,fixture'], null, null,
      { outputProfile: 'image-quality-review', responseFormat });
    assert.equal(result.finishReason, 'stop');
    assert.equal(result.usage.completion_tokens, 32768);
  }
  assert.equal(bodies.length, 2);
  assert.equal(bodies[0].response_format, undefined);
  assert.deepEqual(bodies[1], { ...bodies[0], response_format: { type: 'json_object' } });
});

test('unsupported JSON formats fail before any Chat request or fallback', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json(payload(false, { text: 'fixture' })); };
  for (const responseFormat of [null, 'json', { type: 'json_object' }]) {
    await assert.rejects(client.callOpenAIText('fixture', null, null, null, { responseFormat }), /Unsupported response format/);
    await assert.rejects(client.requestOpenAIChatCompletion({ modelId: 'gpt-4.1', messages: [],
      apiKey: 'test-only-credential', timeoutMs: 1000, responseFormat }), /Unsupported response format/);
  }
  assert.equal(calls, 0);
});

const strictReviewFormat = () => ({type:'json_schema',json_schema:{name:'review_test',strict:true,schema:{
  type:'object',properties:{status:{type:'string',enum:['pass','uncertain']},evidence:{type:['string','null']}},
  required:['status','evidence'],additionalProperties:false,
}}});

test('strict structured QA reaches Chat unchanged and retains its output and response limits',async()=>{
  const format=strictReviewFormat(),bodies=[],logs=[];
  globalThis.fetch=async(_url,init)=>{bodies.push(JSON.parse(init.body));return Response.json(payload(false,{text:'{"status":"uncertain","evidence":null}'}));};
  const result=await client.callOpenAIText('Return JSON.',['data:image/png;base64,fixture'],null,line=>logs.push(line),
    {outputProfile:'image-quality-review',responseFormat:format});
  assert.deepEqual(bodies[0].response_format,format);
  assert.equal(bodies[0].max_completion_tokens,32768);
  assert.equal(bodies[0].max_tokens,undefined);
  assert.equal(bodies[0].model,'gpt-6.1-sol');assert.equal(result.finishReason,'stop');
  assert.ok(logs.some(line=>line.includes('600秒')));assert.equal(bodies.length,1);
});

test('invalid strict schemas fail before transport and cannot be mixed with Web Search',async()=>{
  let calls=0;globalThis.fetch=async()=>{calls++;return Response.json(payload(false,{text:'{}'}));};
  for(const alter of [
    f=>{f.json_schema.strict=false;},f=>{f.json_schema.name='invalid name';},
    f=>{f.json_schema.schema.additionalProperties=true;},f=>{f.json_schema.schema.required=['status'];},
    f=>{f.json_schema.schema.properties.child={type:'object',properties:{},required:[]};f.json_schema.schema.required.push('child');},
    f=>{f.json_schema.schema.properties.items={type:'array'};f.json_schema.schema.required.push('items');},
  ]) {
    const format=strictReviewFormat();alter(format);
    await assert.rejects(client.callOpenAIText('JSON',null,null,null,{responseFormat:format}),/Unsupported response format/);
    await assert.rejects(client.requestOpenAIChatCompletion({modelId:'gpt-4.1',messages:[],apiKey:'test-only-credential',timeoutMs:1000,responseFormat:format}),/Unsupported response format/);
  }
  await assert.rejects(client.callOpenAIText('JSON',null,null,null,{responseFormat:strictReviewFormat(),useWebSearch:true}),/JSON response format.*Web Search/);
  assert.equal(calls,0);
});

test('strict QA refusal and truncation remain terminal without format fallback or retry',async()=>{
  for(const issue of [{limited:true},{refusal:true}]) {
    let calls=0;globalThis.fetch=async()=>{calls++;return Response.json(payload(false,{text:'{"status":"pass","evidence":null}',...issue}));};
    await assert.rejects(client.callOpenAIText('JSON',['data:image/png;base64,fixture'],null,null,
      {responseFormat:strictReviewFormat(),outputProfile:'image-quality-review'}),error=>error.code===(issue.limited?'OUTPUT_TOKEN_LIMIT':'content_policy_violation'));
    assert.equal(calls,1);
  }
});

test('strict structured QA accepts only explicit stop even when other finishes contain valid JSON',async()=>{
  for(const finishReason of [undefined,null,'unknown','tool_calls','function_call']) {
    let calls=0;
    globalThis.fetch=async()=>{
      calls++;const result=payload(false,{text:'{"status":"pass","evidence":null}'});
      if(finishReason===undefined)delete result.choices[0].finish_reason;
      else result.choices[0].finish_reason=finishReason;
      return Response.json(result);
    };
    await assert.rejects(client.callOpenAIText('JSON',['data:image/png;base64,fixture'],null,null,
      {responseFormat:strictReviewFormat(),outputProfile:'image-quality-review'}),error=>error.code==='INCOMPLETE_RESPONSE');
    assert.equal(calls,1,'an unknown completion cannot trigger a paid format/model retry');
  }
});

test('strict structured QA propagates user stop during transport without a retry',async()=>{
  const controller=new AbortController();let sent,calls=0;
  const ready=new Promise(resolve=>{sent=resolve;});
  globalThis.fetch=async(_url,init)=>{
    calls++;assert.deepEqual(JSON.parse(init.body).response_format,strictReviewFormat());sent();
    return new Promise((_,reject)=>init.signal.addEventListener('abort',()=>reject(new DOMException('stopped','AbortError')),{once:true}));
  };
  const pending=client.callOpenAIText('JSON',['data:image/png;base64,fixture'],null,null,
    {responseFormat:strictReviewFormat(),outputProfile:'image-quality-review',signal:controller.signal});
  await ready;controller.abort();
  await assert.rejects(pending,error=>error.code==='CANCELLED');assert.equal(calls,1);
});

test('JSON output cannot be silently ignored by the separate Web Search route', async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return Response.json(payload(true, { text: 'fixture' })); };
  await assert.rejects(client.callOpenAIText('Return JSON.', null, null, null,
    { responseFormat: 'json_object', useWebSearch: true }), /JSON response format.*Web Search/);
  assert.equal(calls, 0);
});

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

  test(`${route}: provider-completed whitespace is truly empty and retains the normal fallback route for other selections`, async () => {
    const models = [];
    const logs = [];
    globalThis.fetch = async (_url, init) => {
      models.push(JSON.parse(init.body).model);
      return Response.json(payload(web, { text: models.length === 1 ? '  \n ' : 'complete fixture' }));
    };
    const result = await run(web, logs, 'gpt-6-sol');
    assert.deepEqual(models, ['gpt-6-sol', 'gpt-5.6-sol']);
    assert.equal(result.model, 'gpt-5.6-sol');
    assert.ok(logs.some(line => line.includes('EMPTY_RESPONSE')));
    assert.ok(logs.some(line => line.includes('[RESPONSE]')));
    assert.ok(logs.some(line => line.includes('失敗時は下位モデルへフォールバック')));
  });

  for (const failure of ['EMPTY_RESPONSE', 'model_not_found']) {
    test(`${route}: DEV Luna ${failure} fails without requesting a replacement model`, async () => {
      assert.equal(server.config.isProduction, false, 'this guard is specific to the local development build');
      const models = [], logs = [];
      globalThis.fetch = async (_url, init) => {
        models.push(JSON.parse(init.body).model);
        if (models.length > 1) return Response.json(payload(web, { text: 'replacement must not be accepted' }));
        return failure === 'EMPTY_RESPONSE'
          ? Response.json(payload(web, { text: '  \n ' }))
          : Response.json({ error: { message: 'model unavailable', code: failure } }, { status: 404 });
      };
      await assert.rejects(run(web, logs), error => {
        assert.equal(error.failures.length, 1);
        assert.equal(error.failures[0].code, failure);
        assert.equal(error.failures[0].model, 'gpt-6-luna');
        return true;
      });
      assert.deepEqual(models, ['gpt-6-luna']);
      assert.ok(!logs.some(line => line.includes('最終採用モデル:')));
      assert.ok(logs.some(line => line.includes('失敗時は別モデルへ自動切替せず停止')));
      assert.ok(!logs.some(line => line.includes('下位モデルへフォールバック')));
    });
  }

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

for (const { unavailable, expectedModels, adoptedModel } of [
  { unavailable: 1, expectedModels: ['gpt-6.1-sol', 'gpt-6.1-terra'], adoptedModel: 'gpt-6.1-terra' },
  { unavailable: 2, expectedModels: ['gpt-6.1-sol', 'gpt-6.1-terra', 'gpt-6-sol'], adoptedModel: 'gpt-6-sol' },
]) {
  test(`Sol 6.1 falls through ${unavailable} unavailable model(s) and reports ${adoptedModel}`, async () => {
    const models=[], logs=[];
    globalThis.fetch=async (_url,init)=> {
      models.push(JSON.parse(init.body).model);
      return models.length<=unavailable ? Response.json({error:{message:'model unavailable',code:'model_not_found'}},{status:404}) : Response.json(payload(false,{text:'complete fixture'}));
    };
    const result=await client.callOpenAIText('fixture',null,null,line=>logs.push(line),{modelRoute:'scenario',scenarioModelId:'gpt-6.1-sol'});
    assert.deepEqual(models,expectedModels);
    assert.equal(result.model,adoptedModel);
    assert.ok(logs.some(line=>line.includes(`最終採用モデル: ${adoptedModel}`)));
  });
}
