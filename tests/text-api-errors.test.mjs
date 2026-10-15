import assert from 'node:assert/strict';
import {after, before, test} from 'node:test';
import {createServer} from 'vite';
import {translateApiError} from '../src/lib/safety-filters.js';
import {OPENAI_TEXT_MODEL_IDS} from '../src/lib/openai-model-routes.js';
import {GEMINI_TEXT_MODEL_IDS} from '../src/lib/gemini-model-routes.js';

let server, openai, gemini, session;
const originalFetch = globalThis.fetch;
before(async () => {
  server = await createServer({appType:'custom', logLevel:'silent', server:{middlewareMode:true}});
  openai = await server.ssrLoadModule('/src/lib/openai-text.js');
  gemini = await server.ssrLoadModule('/src/lib/gemini.js');
  session = await server.ssrLoadModule('/src/lib/api-session.js');
});
after(async () => {globalThis.fetch = originalFetch; session?.clearApiSession(); await server?.close();});

for (const provider of ['openai', 'gemini']) {
  const run = options => (provider === 'openai' ? openai.callOpenAIText : gemini.callThinkingGemini)('fixture', null, null, () => {}, options);
  test(`${provider}: terminal authentication/quota errors stop with status, model and safe reason`, async () => {
    session.setApiSession(provider, 'test-only-credential');
    for (const [status, code] of [[401, 'invalid_api_key'], [429, 'insufficient_quota']]) {
      let calls = 0;
      globalThis.fetch = async () => {
        calls++;
        return Response.json({error:{code, message:'Test failure sk-proj-TESTSECRET123456'}}, {status});
      };
      await assert.rejects(run(), error => {
        assert.equal(error.status, status);
        assert.equal(error.provider, provider);
        assert.ok(error.model);
        assert.doesNotMatch(error.message, /TESTSECRET/);
        return true;
      });
      assert.equal(calls, 1, 'same credential failure must not walk every model');
    }
  });

  test(`${provider}: exhausted model failures retain actual evidence; a new run recovers without reload`, async () => {
    session.setApiSession(provider, 'test-only-credential');
    const expectedModels = provider === 'openai' ? OPENAI_TEXT_MODEL_IDS : GEMINI_TEXT_MODEL_IDS;
    let calls = 0;
    globalThis.fetch = async () => {
      calls++;
      return Response.json({error:{code:'server_error', message:'fixture service unavailable'}}, {status:503});
    };
    await assert.rejects(run(), error => {
      assert.deepEqual(error.failures.map(failure => failure.model), expectedModels);
      assert.ok(error.failures.every(failure => failure.status === 503 && failure.model));
      assert.match(translateApiError(error), /503/);
      assert.match(translateApiError(error), /APIサーバー/);
      return true;
    });
    assert.equal(calls, expectedModels.length, 'each configured fallback is tried once without unrelated model-list diagnosis');
    globalThis.fetch = async () => Response.json(provider === 'openai'
      ? {choices:[{message:{content:'recovered'}, finish_reason:'stop'}]}
      : {candidates:[{content:{parts:[{text:'recovered'}]}}]});
    assert.equal((await run()).text, 'recovered');
  });

  test(`${provider}: cancellation aborts the active fetch without trying another model`, async () => {
    session.setApiSession(provider, 'test-only-credential');
    const controller = new AbortController();
    let calls = 0;
    globalThis.fetch = async (_url, init) => {
      calls++;
      controller.abort();
      assert.equal(init.signal.aborted, true);
      throw new DOMException('cancelled', 'AbortError');
    };
    await assert.rejects(run({signal:controller.signal}), error => error.code === 'CANCELLED');
    assert.equal(calls, 1);
  });
}

test('OpenAI: malformed success body differs from an HTTP failure with a non-JSON body', async () => {
  for (const status of [200, 502]) {
    globalThis.fetch = async () => new Response('<html>upstream error</html>', {status});
    await assert.rejects(openai.requestOpenAIChatCompletion({modelId:'fixture',messages:[],apiKey:'test-only',timeoutMs:100}), error => {
      assert.equal(error.status, status);
      assert.equal(error.code, status === 200 ? 'INVALID_RESPONSE' : 'HTTP_ERROR');
      return true;
    });
  }
});

test('OpenAI: ordinary quoted refusal wording is usable; only a structured refusal is classified as policy', async () => {
  session.setApiSession('openai', 'test-only-credential');
  globalThis.fetch = async () => Response.json({choices:[{message:{content:'The character says "I\'m sorry".'}}]});
  assert.equal((await openai.callOpenAIText('fixture')).text, 'The character says "I\'m sorry".');
  globalThis.fetch = async () => Response.json({choices:[{message:{content:null, refusal:'Cannot fulfill this request'}}]});
  await assert.rejects(openai.callOpenAIText('fixture'), error => error.code === 'content_policy_violation');
});

test('scenario and migrated STEP3 routes use modern chat parameters', async () => {
  session.setApiSession('openai', 'test-only-credential');
  for (const model of ['gpt-6-astra', 'gpt-5.6-sol', 'gpt-6.1-sol']) {
    let body;
    globalThis.fetch = async (_url, init) => {
      body = JSON.parse(init.body);
      return Response.json({choices:[{message:{content:'fixture reply'}}]});
    };
    await openai.callOpenAIText('fixture', null, 'instruction', () => {}, model === 'gpt-6.1-sol' ? {} : {modelRoute:'scenario',scenarioModelId:model});
    assert.equal(body.model, model);
    assert.equal(body.messages[0].role, 'developer');
      assert.equal(body.max_completion_tokens, 32768);
      assert.equal(body.max_tokens, undefined);
      assert.equal(body.temperature, undefined);
  }
});
