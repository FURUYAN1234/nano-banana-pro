import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  DEFAULT_GEMINI_IMAGE_OPTIONS,
  GEMINI_IMAGE_PRICE_SNAPSHOT_DATE,
  formatGeminiImagePricingSummary,
  formatGeminiImageSettingsSummary,
} from '../src/lib/gemini-image-settings.js';
import {buildGeminiImageGenerationConfig} from '../src/lib/imagen.js';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('Gemini image defaults are explicit and shared with the API request', () => {
  assert.deepEqual(DEFAULT_GEMINI_IMAGE_OPTIONS, {aspectRatio: '3:4', imageSize: '1K'});
  assert.deepEqual(buildGeminiImageGenerationConfig(), {
    type: 'image',
    mime_type: 'image/jpeg',
    aspect_ratio: '3:4',
    image_size: '1K',
  });
});

test('Gemini STEP4 summary states model, request size, and normalized A4 size', () => {
  assert.equal(
    formatGeminiImageSettingsSummary(),
    'Gemini 3.1 Flash Image・1K / 3:4（API 896×1200 → A4 848×1200）・品質切替なし',
  );
});

test('Gemini image price snapshot exposes per-image and retry costs', () => {
  assert.equal(GEMINI_IMAGE_PRICE_SNAPSHOT_DATE, '2026-09-25');
  assert.equal(
    formatGeminiImagePricingSummary(),
    'Gemini 3.1 Flash Image｜画像出力 1K $0.067/枚（最大4枚 $0.268）＋入力 $0.50 / 100万トークン',
  );
});

test('Gemini pricing and concrete automatic settings are visible in STEP4', () => {
  assert.match(step4PanelSource, /formatGeminiImagePricingSummary\(\)/);
  assert.match(step4PanelSource, /GEMINI_IMAGE_PRICE_SNAPSHOT_DATE/);
  assert.match(step4PanelSource, /formatGeminiImageSettingsSummary\(\)/);
  assert.match(step4PanelSource, /Google公式料金/);
  assert.doesNotMatch(step4PanelSource, /'Google AI：自動設定'/);
});
