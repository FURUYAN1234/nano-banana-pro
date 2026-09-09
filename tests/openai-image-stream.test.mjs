import test from 'node:test';
import assert from 'node:assert/strict';

import { readOpenAIImageStream } from '../src/lib/openai.js';

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

test('keeps the latest decodable partial image when the stream drops before completion', async () => {
  const encoder = new TextEncoder();
  const response = {
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: {"type":"image_generation.partial_image","partial_image_index":0,"b64_json":"usable-partial"}\n\n'));
        setTimeout(() => controller.error(new TypeError('network error')), 0);
      },
    }),
  };
  const statuses = [];

  const image = await readOpenAIImageStream(response, (status) => statuses.push(status));

  assert.equal(image, 'usable-partial');
  assert.equal(statuses.some((status) => status.includes('途中画像を採用')), true);
});

const editOptions = {eventPrefix: 'image_edit', requireFinal: true};
const editEvent = (suffix, b64_json) => ({type: `image_edit.${suffix}`, b64_json});
const droppingResponse = event => {
  let reads = 0;
  return {body: {getReader: () => ({read: async () => {
    if (reads++ === 0) return {done: false, value: new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)};
    throw new TypeError('network interrupted');
  }})}};
};

test('edits require the completed event rather than a partial or DONE marker', async () => {
  assert.equal(await readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial'), editEvent('completed', 'final')), () => {}, editOptions), 'final');
  await assert.rejects(readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(new Response('data: [DONE]\n\n'), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(streamResponse({type: 'unknown', b64_json: 'not-final'}), () => {}, editOptions), /最終画像/);
});

test('edits salvage only a completed image after a transport interruption', async () => {
  await assert.rejects(readOpenAIImageStream(droppingResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /network interrupted/);
  assert.equal(await readOpenAIImageStream(droppingResponse(editEvent('completed', 'final')), () => {}, editOptions), 'final');
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
