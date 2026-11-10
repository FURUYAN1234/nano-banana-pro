import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { buildOpenAIReferencePlan, normalizeOpenAIImageDataUrl } from '../src/lib/openai-image-references.js';
import { buildImageEditRequest } from '../src/lib/image-edit.js';
import { generateImageWithOpenAI, setOpenAIApiKey } from '../src/lib/openai.js';
import { createDiagnosticFetch } from '../src/lib/diagnostics.js';
import { getApiErrorInfo } from '../src/lib/api-errors.js';

// Non-production byte fixtures exercise upload framing, not image quality.
const sourceBytes = Buffer.alloc(15_739_095, 0x5a);
const source = `data:image/png;base64,${sourceBytes.toString('base64')}`;
const sheet = 'data:image/jpeg;base64,c2hlZXQ=';
const digest = value => createHash('sha256').update(value).digest('hex');

test('a completed A4 PNG over the JSON URL limit reaches the same edit API losslessly via multipart', async () => {
  const previousFetch = globalThis.fetch;
  let calls = 0;
  setOpenAIApiKey('test-only-upload-key');
  try {
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(url, 'https://api.openai.com/v1/images/edits');
      assert.ok(options.body instanceof FormData);
      assert.equal(new Headers(options.headers).has('Content-Type'), false, 'browser supplies the multipart boundary');
      const files = options.body.getAll('image[]');
      assert.equal(files.length, 2);
      assert.equal(files[0].type, 'image/png');
      assert.equal(digest(Buffer.from(await files[0].arrayBuffer())), digest(sourceBytes));
      assert.equal(files[1].type, 'image/jpeg');
      assert.equal(await files[1].text(), 'sheet');
      assert.equal(options.body.get('model'), 'gpt-image-2.6-sunburst');
      assert.equal(options.body.get('quality'), 'max');
      assert.equal(options.body.get('size'), '2240x3168');
      assert.equal(options.body.get('stream'), 'true');
      assert.equal(options.body.get('partial_images'), '1');
      assert.equal(options.body.get('output_format'), 'png');
      assert.equal(options.body.get('prompt'), '承認済みの台詞・動作は保持。');
      assert.equal(options.body.has('images'), false);
      return new Response('data: {"type":"image_edit.completed","b64_json":"ZG9uZQ=="}\n\n', { headers: { 'content-type': 'text/event-stream' } });
    };
    const plan = buildOpenAIReferencePlan({ originalCandidate: { base64Img: source.split(',')[1], mimeType: 'image/png' }, characterImages: [sheet] });
    const output = await generateImageWithOpenAI('承認済みの台詞・動作は保持。', () => {}, { imageInputs: plan.imageInputs, size: '2240x3168' });
    assert.equal(output.base64Img, 'ZG9uZQ==');
    assert.equal(calls, 1);
    assert.equal(buildImageEditRequest(source, '台詞だけ修正').imageInputs[0].image_url, source);
    assert.throws(() => normalizeOpenAIImageDataUrl(source), /上限/, 'the JSON-specific limit is retained');
  } finally { globalThis.fetch = previousFetch; setOpenAIApiKey(''); }
});

test('images at the file upload size limit fail before any request without leaking bytes', async () => {
  const oversized = `data:image/png;base64,${Buffer.alloc(50_000_000).toString('base64')}`;
  assert.throws(() => buildImageEditRequest(oversized, '修正'), error => {
    assert.match(error.message, /50.*MB|50.*MiB/);
    assert.equal(getApiErrorInfo(error).kind, 'image_input_limit');
    assert.doesNotMatch(error.message, /data:image|AAAA/);
    return true;
  });
});

test('an ambiguous multipart failure sends one request and does not retry or change models', async () => {
  const previousFetch = globalThis.fetch;
  let calls = 0;
  setOpenAIApiKey('test-only-upload-key');
  try {
    globalThis.fetch = async (_url, options) => {
      calls++;
      assert.ok(options.body instanceof FormData);
      throw new TypeError('Failed to fetch');
    };
    await assert.rejects(generateImageWithOpenAI('保持', () => {}, { imageInputs: [{ image_url: source }] }), /Failed to fetch/);
    assert.equal(calls, 1);
  } finally { globalThis.fetch = previousFetch; setOpenAIApiKey(''); }
});

test('multipart diagnostic records retain model and endpoint without retaining image bytes', async () => {
  const events = [];
  const body = new FormData();
  body.set('model', 'gpt-image-2.6-sunburst');
  body.append('image[]', new Blob(['private image bytes'], { type: 'image/png' }), 'source.png');
  const fetcher = createDiagnosticFetch(async () => new Response('{}'), (event, data) => events.push({ event, ...data }));
  await fetcher('https://api.openai.com/v1/images/edits', { method: 'POST', body });
  assert.equal(events[0].requestedModel, 'gpt-image-2.6-sunburst');
  assert.equal(events[0].endpoint, 'v1.images.edits');
  assert.doesNotMatch(JSON.stringify(events), /private image|source.png/);
});
