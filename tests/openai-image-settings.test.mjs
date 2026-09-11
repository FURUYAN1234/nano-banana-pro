import test from 'node:test';
import assert from 'node:assert/strict';
import * as settings from '../src/lib/openai-image-settings.js';
import { buildOpenAIImageRequestBody } from '../src/lib/openai.js';

test('each Sunburst choice sends its model and quality separately', () => {
  for (const quality of ['high', 'xhigh', 'max']) {
    const request = buildOpenAIImageRequestBody('same prompt', { quality: `sunburst-${quality}` });
    assert.equal(request.model, 'gpt-image-2.5-sunburst');
    assert.equal(request.quality, quality);
    assert.equal(request.prompt, 'same prompt');
  }
});

test('chooses Sunburst xhigh only when the verified model list contains Sunburst', async () => {
  const settings = await import(`../src/lib/openai-image-settings.js?initial-selection=${Date.now()}`);

  assert.equal(
    settings.selectInitialOpenAIImageQuality(['gpt-image-2.5-sunburst', 'gpt-image-2']),
    'sunburst-xhigh',
  );
  assert.equal(
    settings.selectInitialOpenAIImageQuality(['gpt-image-2.5-flare', 'gpt-image-2']),
    'gpt-image-2-high',
  );
});

test('selection starts at xhigh and never reads or writes browser storage', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const values = new Map();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => values.get(key), setItem: (key, value) => values.set(key, value),
  } });
  try {
    assert.equal(settings.DEFAULT_OPENAI_IMAGE_QUALITY, 'sunburst-xhigh');
    assert.equal(settings.normalizeOpenAIImageQuality('high'), 'high');
    assert.equal(settings.normalizeOpenAIImageQuality('invalid'), 'sunburst-xhigh');
    assert.equal(settings.readOpenAIImageQuality, undefined);
    assert.equal(settings.saveOpenAIImageQuality, undefined);
    assert.equal(values.size, 0);
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
    else delete globalThis.localStorage;
  }
});

test('2.0 is an explicit high-quality option, not an automatic fallback', () => {
  const request = buildOpenAIImageRequestBody('same prompt', { quality: 'gpt-image-2-high' });
  assert.equal(request.model, 'gpt-image-2');
  assert.equal(request.quality, 'high');
  assert.equal(settings.OPENAI_IMAGE_OPTIONS.length, 6);
});

test('larger output is explicit and does not change default image dimensions', () => {
  const larger = buildOpenAIImageRequestBody('same prompt', { quality: 'sunburst-xhigh', size: '1536x2304' });
  assert.equal(larger.quality, 'xhigh');
  assert.equal(larger.size, '1536x2304');
  assert.equal(buildOpenAIImageRequestBody('same prompt').size, '1024x1536');
  assert.equal(buildOpenAIImageRequestBody('same prompt', { quality: 'sunburst-max' }).size, '1024x1536');
});

test('only explicit organization verification failures on 2.5 show the verification warning', () => {
  assert.equal(typeof settings.isOpenAIImageVerificationError, 'function');
  const message = "OpenAI API Error: 403 Your organization must be verified to use the model 'gpt-image-2.5-flare'.";
  assert.equal(settings.isOpenAIImageVerificationError(message, 'xhigh'), true);
  assert.equal(settings.isOpenAIImageVerificationError(message, 'gpt-image-2-high'), false);
  for (const error of ['403 permission denied', '401 invalid key', '429 insufficient_quota', 'network error']) {
    assert.equal(settings.isOpenAIImageVerificationError(error, 'xhigh'), false);
  }
});

test('quality and size remain independent and never change the prompt for either API route', async () => {
  const {buildOpenAIImageRequest} = await import('../src/lib/openai.js');
  for (const quality of ['sunburst-xhigh', 'sunburst-max', 'gpt-image-2-high']) {
    for (const size of ['1024x1536', '1536x2304']) {
      for (const imageInputs of [[], [{image_url: 'data:image/png;base64,YQ=='}]]) {
        const request = buildOpenAIImageRequest('unchanged Web prompt', {quality, size, imageInputs});
        assert.equal(request.body.size, size);
        assert.equal(request.body.prompt, 'unchanged Web prompt');
        assert.equal(request.body.quality, settings.resolveOpenAIImageOption(quality).quality);
      }
    }
  }
  assert.equal(settings.normalizeOpenAIImageSize('invalid'), '1024x1536');
});
