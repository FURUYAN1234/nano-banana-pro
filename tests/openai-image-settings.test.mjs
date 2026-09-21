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

test('A4 manga output is requested directly and larger output keeps the same manuscript ratio', () => {
  const larger = buildOpenAIImageRequestBody('same prompt', { quality: 'sunburst-xhigh', size: '2240x3168' });
  assert.equal(larger.quality, 'xhigh');
  assert.equal(larger.size, '2240x3168');
  assert.equal(buildOpenAIImageRequestBody('same prompt').size, '1120x1584');
  assert.equal(buildOpenAIImageRequestBody('same prompt', { quality: 'sunburst-max' }).size, '1120x1584');
  for (const size of ['1120x1584', '2240x3168']) {
    const [width, height] = size.split('x').map(Number);
    assert.equal(width / height, 70 / 99);
    assert.equal(width % 16, 0);
    assert.equal(height % 16, 0);
  }
});

test('formats the current quality and size for the collapsed STEP4 settings button', () => {
  assert.equal(
    settings.formatOpenAIImageSettingsSummary('sunburst-xhigh', '1120x1584'),
    'GPT Image 2.5 Sunburst / xhigh・A4標準：1120×1584',
  );
  assert.equal(
    settings.formatOpenAIImageSettingsSummary('gpt-image-2-high', '2240x3168'),
    'GPT Image 2.0 / high・A4大：2240×3168',
  );
  assert.equal(
    settings.formatOpenAIImageSettingsSummary('invalid', 'invalid'),
    'GPT Image 2.5 Sunburst / xhigh・A4標準：1120×1584',
  );
});

test('formats the official image API token prices for the selected STEP4 model', () => {
  assert.equal(settings.OPENAI_IMAGE_PRICE_SNAPSHOT_DATE, '2026-09-22');
  assert.equal(
    settings.formatOpenAIImagePricingSummary('sunburst-xhigh'),
    'GPT Image 2.5 Sunburst｜画像 入力 $8（キャッシュ $2）/ 出力 $30・テキスト 入力 $5（キャッシュ $1.25） USD / 100万トークン',
  );
  assert.equal(
    settings.formatOpenAIImagePricingSummary('gpt-image-2-high'),
    'GPT Image 2.0｜画像 入力 $4（キャッシュ $1）/ 出力 $15・テキスト 入力 $2.5（キャッシュ $0.625） USD / 100万トークン',
  );
  assert.equal(
    settings.formatOpenAIImagePricingSummary('invalid'),
    settings.formatOpenAIImagePricingSummary('sunburst-xhigh'),
  );
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
    for (const size of ['1120x1584', '2240x3168']) {
      for (const imageInputs of [[], [{image_url: 'data:image/png;base64,YQ=='}]]) {
        const request = buildOpenAIImageRequest('unchanged Web prompt', {quality, size, imageInputs});
        assert.equal(request.body.size, size);
        assert.equal(request.body.prompt, 'unchanged Web prompt');
        assert.equal(request.body.quality, settings.resolveOpenAIImageOption(quality).quality);
      }
    }
  }
  assert.equal(settings.normalizeOpenAIImageSize('invalid'), '1120x1584');
});
