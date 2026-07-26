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
