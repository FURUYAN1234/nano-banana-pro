import test from 'node:test';
import assert from 'node:assert/strict';

import { readOpenAIImageStream, generateImageWithOpenAI, setOpenAIApiKey } from '../src/lib/openai.js';

const streamResponse = (...events) => new Response(
  events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(''),
  { status: 200, headers: { 'content-type': 'text/event-stream' } },
);

test('returns the final image from an OpenAI image generation stream', async () => {
  const statuses = [];
  const response = streamResponse(
    { type: 'image_generation.partial_image', partial_image_index: 0, b64_json: 'partial-image' },
    { type: 'image_generation.completed', b64_json: 'final-image' },
  );

  const image = await readOpenAIImageStream(response, (status) => statuses.push(status));

  assert.equal(image, 'final-image');
  assert.equal(statuses.some((status) => status.includes('途中画像')), true);
});

test('handles SSE chunks that split JSON across stream reads', async () => {
  const encoder = new TextEncoder();
  const response = {
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"type":"image_generation.'));
        controller.enqueue(encoder.encode('completed","b64_json":"split-final"}\n\n'));
        controller.close();
      },
    }),
  };

  assert.equal(await readOpenAIImageStream(response, () => {}), 'split-final');
});

test('surfaces provider errors from the image stream', async () => {
  const response = streamResponse({ type: 'error', error: { message: 'image generation rejected' } });

  await assert.rejects(
    readOpenAIImageStream(response, () => {}),
    /image generation rejected/,
  );
});

test('does not report a partial image as a completed generation when the stream drops', async () => {
  const encoder = new TextEncoder();
  const response = {
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"type":"image_generation.partial_image","partial_image_index":0,"b64_json":"usable-partial"}\n\n'));
        setTimeout(() => controller.error(new TypeError('network error')), 0);
      },
    }),
  };
  await assert.rejects(readOpenAIImageStream(response, () => {}), /network error/);
});

const editOptions = {eventPrefix: 'image_edit', requireFinal: true};
const editEvent = (suffix, b64_json) => ({type: `image_edit.${suffix}`, b64_json});
const droppingResponse = event => {
  let reads = 0;
  return {body: new ReadableStream({pull(controller) {
    if (reads++ === 0) controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`));
    else controller.error(new TypeError('network interrupted'));
  }})};
};

test('edits require the completed event rather than a partial or DONE marker', async () => {
  assert.equal(await readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial'), editEvent('completed', 'final')), () => {}, editOptions), 'final');
  await assert.rejects(readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(new Response('data: [DONE]\n\n'), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(streamResponse({type: 'unknown', b64_json: 'not-final'}), () => {}, editOptions), /最終画像/);
});

test('edits reject transport interruption even after a completed event', async () => {
  await assert.rejects(readOpenAIImageStream(droppingResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /network interrupted/);
  await assert.rejects(readOpenAIImageStream(droppingResponse(editEvent('completed', 'final')), () => {}, editOptions), /network interrupted/);
});

test('generation rejects a provider error or malformed event after a partial image', async () => {
  const partial = `data: ${JSON.stringify({type:'image_generation.partial_image',b64_json:'partial'})}\n\n`;
  await assert.rejects(readOpenAIImageStream(new Response(partial + 'data: {bad-json}\n\n')), /応答形式/);
  await assert.rejects(readOpenAIImageStream(new Response(partial + 'data: {"type":"error","message":"rejected"}\n\n')), /rejected/);
});

test('image generation timeout remains active while the response body is stalled', async () => {
  const originalFetch = globalThis.fetch;
  let bodyController;
  setOpenAIApiKey('test-only-key');
  globalThis.fetch = async (_url, options) => {
    const body = new ReadableStream({start(controller) {
      bodyController = controller;
      options.signal.addEventListener('abort', () => controller.error(new DOMException('aborted', 'AbortError')));
    }});
    return new Response(body, {headers: {'content-type':'text/event-stream'}});
  };
  try {
    const result = await Promise.race([
      generateImageWithOpenAI('test prompt', () => {}, {timeoutMs: 20}).then(() => 'unexpected success', error => error.message),
      new Promise(resolve => setTimeout(() => resolve('still waiting after headers'), 120)),
    ]);
    assert.match(result, /Time out/, result);
  } finally {
    bodyController?.error(new Error('test cleanup'));
    globalThis.fetch = originalFetch;
    setOpenAIApiKey('');
  }
});

test('explicit provider errors and malformed JSON remain errors after completion', async () => {
  const completed = `data: ${JSON.stringify(editEvent('completed', 'final'))}\n\n`;
  await assert.rejects(readOpenAIImageStream(new Response(completed + 'data: {"type":"error","message":"rejected"}\n\n'), () => {}, editOptions), /rejected/);
  await assert.rejects(readOpenAIImageStream(new Response(completed + 'data: {not-json}\n\n'), () => {}, editOptions), /応答形式/);
});

test('edits assemble CRLF, multi-data lines, split reads and an unterminated final event', async () => {
  const chunks = ['data: {"type":"image_edit.', 'completed",\r\ndata: "b64_json":"final"}'];
  const response = {body: new ReadableStream({start(controller) {
    for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
    controller.close();
  }})};
  assert.equal(await readOpenAIImageStream(response, () => {}, editOptions), 'final');
});
