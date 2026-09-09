import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOpenAIImageRequest, generateImageWithOpenAI, setOpenAIApiKey} from '../src/lib/openai.js';
import {buildOpenAIReferencePlan, appendOpenAIReferencePrompt} from '../src/lib/openai-image-references.js';
import {runImageQualityFailsafe} from '../src/lib/image-quality-failsafe.js';

const ref = {image_url: 'data:image/png;base64,YQ=='};

test('provider error echoes do not expose credentials or image inputs', async () => {
  const savedFetch = globalThis.fetch;
  const fakeKey = 'test-only-credential-not-a-real-key';
  setOpenAIApiKey(fakeKey);
  try {
    for (const stream of [false, true]) {
      const message = 'rejected ' + fakeKey + ' ' + ref.image_url;
      globalThis.fetch = async () => stream
        ? new Response('data: ' + JSON.stringify({type: 'error', message}) + '\n\n', {headers: {'content-type': 'text/event-stream'}})
        : new Response(JSON.stringify({error: {message}}), {status: 400});
      await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]}), error => {
        assert.equal(error.message.includes(fakeKey), false);
        assert.equal(error.message.includes(ref.image_url), false);
        return true;
      });
    }
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('initial and bounded repair compose the same references with the completed original first', async () => {
  const savedFetch = globalThis.fetch;
  const calls = [];
  const originalBytes = Buffer.from('non-production original fixture').toString('base64');
  const repairedBytes = Buffer.from('non-production repair fixture').toString('base64');
  const backgroundImage = 'data:image/png;base64,Yg==';
  const approved = '  Manual script\r\n台詞「そのまま。」\n';
  setOpenAIApiKey('test-key');
  globalThis.fetch = async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    return new Response(JSON.stringify({data: [{b64_json: calls.length === 1 ? originalBytes : repairedBytes}]}));
  };
  try {
    const generate = async (prompt, originalCandidate = null, characterImages = [ref.image_url]) => {
      const plan = buildOpenAIReferencePlan({characterImages, backgroundImage, backgroundEnabled: true, originalCandidate});
      return generateImageWithOpenAI(appendOpenAIReferencePrompt(prompt, plan), () => {}, {imageInputs: plan.imageInputs});
    };
    const original = await generate(approved);
    const result = await runImageQualityFailsafe({
      originalCandidate: original, originalPrompt: approved, repairSourceMode: 'source-image',
      reviewCandidate: async candidate => candidate === original
        ? {pass: false, issues: [{type: 'anatomy', reason: 'extra finger'}]} : {pass: true},
      generateRepairCandidate: prompt => generate(prompt, original),
      compareCandidates: async () => ({preferred: 'repair'}),
    });
    assert.equal(calls.length, 2);
    assert.ok(calls.every(call => call.url.endsWith('/images/edits')));
    assert.deepEqual(calls[0].body.images, [ref, {image_url: backgroundImage}]);
    assert.deepEqual(calls[1].body.images, [{image_url: 'data:image/png;base64,' + originalBytes}, ...calls[0].body.images]);
    assert.ok(calls.every(call => call.body.prompt.startsWith(approved)));
    assert.equal(result.candidate.base64Img, repairedBytes);

    const sixteenSheets = Array.from({length: 16}, (_, i) => 'data:image/png;base64,' + Buffer.from('sheet' + i).toString('base64'));
    const limited = await runImageQualityFailsafe({
      originalCandidate: original, originalPrompt: approved, repairSourceMode: 'source-image',
      reviewCandidate: async () => ({pass: false, issues: [{type: 'anatomy', reason: 'extra finger'}]}),
      generateRepairCandidate: prompt => generate(prompt, original, sixteenSheets),
    });
    assert.equal(limited.candidate, original);
    assert.match(limited.repairError.message, /16枚/);
    assert.equal(calls.length, 2, 'over-limit repair sends no additional POST');
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('edits request carries image data without changing the selected model or quality', () => {
  const request = buildOpenAIImageRequest('approved', {quality: 'sunburst-xhigh', imageInputs: [ref]});
  assert.equal(request.url, 'https://api.openai.com/v1/images/edits');
  assert.equal(request.isEdit, true);
  assert.deepEqual(request.body.images, [ref]);
  assert.equal(request.body.model, 'gpt-image-2.5-sunburst');
  assert.equal(request.body.quality, 'xhigh');
  assert.equal(request.body.prompt, 'approved');
  assert.equal(request.body.n, 1);
  assert.equal(request.body.output_format, 'png');
  assert.equal(request.body.moderation, 'low');
  assert.equal(request.body.stream, true);
  assert.equal(request.body.partial_images, 1);
  assert.equal('input_fidelity' in request.body, false);
});

test('explicit 2.0 remains 2.0 and accepts the same reference path', () => {
  const request = buildOpenAIImageRequest('approved', {quality: 'gpt-image-2-high', imageInputs: [ref]});
  assert.equal(request.body.model, 'gpt-image-2');
  assert.equal(request.body.quality, 'high');
  assert.equal(request.isEdit, true);
});

test('no references retains the existing generation body', () => {
  const request = buildOpenAIImageRequest('text only', {});
  assert.equal(request.url, 'https://api.openai.com/v1/images/generations');
  assert.equal('images' in request.body, false);
});

test('edit transport sends exactly one POST and never falls back after ambiguous fetch failure', async () => {
  const savedFetch = globalThis.fetch;
  let calls = 0;
  setOpenAIApiKey('test-key');
  globalThis.fetch = async () => { calls++; throw new TypeError('Failed to fetch'); };
  try {
    await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]}), /Failed to fetch/);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('edit request reaches the real request builder and returns completed SSE data', async () => {
  const savedFetch = globalThis.fetch;
  const calls = [];
  setOpenAIApiKey('test-key');
  globalThis.fetch = async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    return new Response('data: {"type":"image_edit.completed","b64_json":"ZmluYWw="}\n\n', {
      headers: {'content-type': 'text/event-stream'},
    });
  };
  try {
    const result = await generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]});
    assert.equal(result.base64Img, 'ZmluYWw=');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.openai.com/v1/images/edits');
    assert.deepEqual(calls[0].body.images, [ref]);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('HTTP failures retain their status and never retry the edit POST', async () => {
  const savedFetch = globalThis.fetch;
  setOpenAIApiKey('test-key');
  try {
    for (const status of [400, 401, 403, 429, 500]) {
      let calls = 0;
      globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({error: {message: 'rejected'}}), {status}); };
      await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]}), new RegExp(`OpenAI API Error: ${status}`));
      assert.equal(calls, 1);
    }
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('empty edit JSON is not logged as completed and invalid inputs never reach fetch', async () => {
  const savedFetch = globalThis.fetch;
  let calls = 0;
  const statuses = [];
  setOpenAIApiKey('test-key');
  globalThis.fetch = async () => { calls++; return new Response('{"data":[]}'); };
  try {
    await assert.rejects(generateImageWithOpenAI('approved', text => statuses.push(text), {imageInputs: [ref]}), /完成画像/);
    assert.equal(calls, 1);
    assert.equal(statuses.some(text => /完了しました|成功しました/.test(text)), false);
    calls = 0;
    for (const imageInputs of [Array.from({length: 17}, () => ref), [{image_url: 'invalid'}]]) {
      await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs}));
    }
    await assert.rejects(generateImageWithOpenAI('x'.repeat(32001), () => {}, {imageInputs: [ref]}));
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('edit deadline remains armed while the response body is incomplete', async () => {
  const saved = {fetch: globalThis.fetch, setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout};
  let fireDeadline;
  let delay;
  let cleared = false;
  let calls = 0;
  let notifyBody;
  const bodyStarted = new Promise(resolve => { notifyBody = resolve; });
  const timerHandle = {};
  setOpenAIApiKey('test-key');
  globalThis.setTimeout = (callback, ms) => { fireDeadline = callback; delay = ms; return timerHandle; };
  globalThis.clearTimeout = handle => { if (handle === timerHandle) cleared = true; };
  globalThis.fetch = async (_url, options) => {
    calls++;
    return {ok: true, headers: {get: () => 'application/json'}, json: () => {
      notifyBody();
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), {once: true});
      });
    }};
  };
  let pending;
  let rejection;
  try {
    pending = generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]});
    rejection = assert.rejects(pending, /Time out/);
    await bodyStarted;
    assert.equal(delay, 600000);
    assert.equal(cleared, false);
    fireDeadline();
    await rejection;
    assert.equal(calls, 1);
    assert.equal(cleared, true);
  } finally {
    if (fireDeadline) fireDeadline();
    if (pending) await pending.catch(() => {});
    if (rejection) await rejection.catch(() => {});
    globalThis.fetch = saved.fetch;
    globalThis.setTimeout = saved.setTimeout;
    globalThis.clearTimeout = saved.clearTimeout;
    setOpenAIApiKey('');
  }
});
