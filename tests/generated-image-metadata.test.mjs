import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  GENERATED_IMAGE_METADATA_KEYWORD,
  buildGeneratedImageMetadata,
  buildWebGenerationMetadata,
  embedGeneratedImageMetadata,
  extractGeneratedImageMetadata,
  serializeGeneratedImageMetadata,
} from '../src/lib/generated-image-metadata.js';

const ONE_PIXEL_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nKsAAAAASUVORK5CYII=';
const MINIMAL_JPEG = `data:image/jpeg;base64,${Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 2, 0xff, 0xd9]).toString('base64')}`;

const buildFixture = (overrides = {}) => buildGeneratedImageMetadata({
  appVersion: '6.5.3',
  generatedAt: '2026-09-24T09:00:00.000Z',
  provider: 'openai',
  modelId: 'gpt-image-2',
  workflowMode: 'guided',
  humanOversightLevel: 'prompt_guided',
  scenario: '架空の図書館を扱う4コマ',
  finalPrompt: 'FINAL PROMPT\nBearer abcdefghijklmnopqrstuvwxyz123456\nC:\\Users\\private-user\\secret.png',
  fallbackOccurred: false,
  inputImages: [
    { role: 'character_reference', dataUrl: ONE_PIXEL_PNG },
    { role: 'background_reference', dataUrl: ONE_PIXEL_PNG },
  ],
  outputImage: ONE_PIXEL_PNG,
  settings: {
    punchline_type: 'Auto',
    color_mode: 'color',
    character_analysis_used: true,
    background_analysis_used: true,
  },
  rawCharacterAnalysis: '実在人物かもしれない解析全文',
  rawBackgroundAnalysis: { location: '実在する住所かもしれない場所', lighting: '夕方' },
  ...overrides,
});

test('audit metadata keeps the final prompt but automatically omits raw character and place analysis', async () => {
  const metadata = await buildFixture();
  const serialized = serializeGeneratedImageMetadata(metadata);

  assert.equal(metadata.schema, 'furu.nano_banana_pro');
  assert.equal(metadata.schema_version, 3);
  assert.equal(metadata.record_type, 'api_image_generation');
  assert.equal(metadata.generated_at, '2026-09-24T09:00:00.000Z');
  assert.equal(metadata.provenance.digital_source_type, 'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia');
  assert.equal(metadata.provenance.human_oversight_level, 'prompt_guided');
  assert.equal(metadata.ai.provider, 'openai');
  assert.equal(metadata.ai.model_id, 'gpt-image-2');
  assert.equal(metadata.standards.iptc.ai_system_used, 'OpenAI / gpt-image-2');
  assert.equal(metadata.standards.iptc.ai_prompt_information, metadata.prompt.final_sent_prompt);
  assert.match(metadata.prompt.final_sent_prompt, /\[REDACTED_API_KEY\]/);
  assert.match(metadata.prompt.final_sent_prompt, /\[REDACTED_LOCAL_PATH\]/);
  assert.equal(metadata.inputs.length, 2);
  assert.deepEqual(metadata.inputs.map(({ role }) => role), ['character_reference', 'background_reference']);
  assert.ok(metadata.inputs.every(({ sha256 }) => /^[a-f0-9]{64}$/.test(sha256)));
  assert.match(metadata.output.content_sha256, /^[a-f0-9]{64}$/);
  assert.match(metadata.generation_id, /^urn:sha256:[a-f0-9]{64}$/);
  assert.deepEqual(metadata.privacy.omitted_fields, [
    'character_analysis',
    'background_analysis.location',
    'background_analysis.spatial_type',
    'background_analysis.lighting',
    'background_analysis.objects',
    'background_analysis.mood',
  ]);
  assert.equal(metadata.privacy.api_key_included, false);
  assert.equal(metadata.privacy.raw_reference_images_included, false);
  assert.doesNotMatch(serialized, /実在人物かもしれない解析全文/);
  assert.doesNotMatch(serialized, /実在する住所かもしれない場所/);
  assert.doesNotMatch(serialized, /abcdefghijklmnopqrstuvwxyz123456/);
  assert.doesNotMatch(serialized, /private-user/);
});

test('PNG and JPEG downloads embed the canonical API image record', async () => {
  const metadata = await buildFixture({ finalPrompt: `長い日本語プロンプト\n${'構図と台詞を厳密に保持する。'.repeat(5000)}` });

  for (const source of [ONE_PIXEL_PNG, MINIMAL_JPEG]) {
    const embedded = embedGeneratedImageMetadata(source, metadata);
    const restored = await extractGeneratedImageMetadata(embedded);
    assert.deepEqual(restored, metadata);
    assert.equal(serializeGeneratedImageMetadata(restored), serializeGeneratedImageMetadata(metadata));
  }
});

test('re-embedding replaces prior app metadata instead of accumulating stale copies', async () => {
  const first = embedGeneratedImageMetadata(ONE_PIXEL_PNG, await buildFixture({ finalPrompt: 'first' }));
  const secondMetadata = await buildFixture({ finalPrompt: 'second' });
  const second = embedGeneratedImageMetadata(first, secondMetadata);
  const binary = Buffer.from(second.split(',')[1], 'base64').toString('latin1');

  assert.deepEqual(await extractGeneratedImageMetadata(second), secondMetadata);
  // One occurrence is the iTXt keyword and one is the canonical JSON schema.
  assert.equal(binary.split(GENERATED_IMAGE_METADATA_KEYWORD).length - 1, 2);
});

test('Web companion metadata is prepared without an output image or API-only provenance', async () => {
  const metadata = await buildWebGenerationMetadata({
    appVersion: '6.5.7',
    preparedAt: '2026-09-25T09:00:00.000Z',
    provider: 'openai',
    scenario: '架空の図書館を扱う4コマ',
    finalPrompt: 'WEB PROMPT\nBearer abcdefghijklmnopqrstuvwxyz123456',
    inputImages: [{ role: 'character_reference', dataUrl: ONE_PIXEL_PNG }],
    settings: { color_mode: 'color' },
  });

  assert.equal(metadata.record_type, 'web_generation_companion');
  assert.match(metadata.record_id, /^urn:sha256:[a-f0-9]{64}$/);
  assert.equal(metadata.prepared_at, '2026-09-25T09:00:00.000Z');
  assert.equal(metadata.prompt.workflow_mode, 'manual_web_generation');
  assert.equal(metadata.ai.provider, 'openai');
  assert.equal(metadata.ai.model_id, null);
  assert.equal(metadata.ai.fallback_occurred, null);
  assert.equal(metadata.inputs.length, 1);
  assert.match(metadata.inputs[0].sha256, /^[a-f0-9]{64}$/);
  assert.equal('generation_id' in metadata, false);
  assert.equal('output' in metadata, false);
  assert.doesNotMatch(serializeGeneratedImageMetadata(metadata), /abcdefghijklmnopqrstuvwxyz123456/);
});

test('Web companion metadata rejects API-only image provenance fields at its boundary', async () => {
  await assert.rejects(
    buildWebGenerationMetadata({
      appVersion: '6.5.7',
      preparedAt: '2026-09-25T09:00:00.000Z',
      provider: 'openai',
      scenario: '架空の図書館を扱う4コマ',
      finalPrompt: 'WEB PROMPT',
      outputImage: ONE_PIXEL_PNG,
      modelId: 'gpt-image-2',
    }),
    /Web版用制作情報にAPI画像専用項目は指定できません/,
  );
});

test('STEP4 keeps Web companion JSON independent from API image metadata', async () => {
  const source = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  const webSection = source.slice(
    source.indexOf('プロンプトをコピーする（web貼り付け時）'),
    source.indexOf('APIで新しい画像を生成する（STEP4）'),
  );

  assert.match(source, /buildCurrentWebGenerationMetadata\s*=\s*\(preparedAt\)\s*=>\s*buildWebGenerationMetadata\(/);
  assert.match(webSection, /buildCurrentWebGenerationMetadata\(/);
  assert.match(webSection, /disabled=\{!finalPrompt\}/);
  assert.match(webSection, /Web版生成用 制作情報JSONを保存/);
  assert.doesNotMatch(webSection, /buildCurrentGeneratedImageMetadata|convertImageDataUrlToPng|!generatedImage/);
});

test('STEP4 places concise metadata privacy guidance directly in the API generation flow', async () => {
  const source = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

  const apiActionIndex = source.indexOf('APIで新しい画像を生成する（STEP4）');
  const privacyCopyIndex = source.indexOf('生成画像には、安全化した制作情報を保存します。');
  const apiSettingsIndex = source.indexOf('API生成時の品質・サイズ');

  assert.ok(apiActionIndex >= 0, 'API generation action should exist');
  assert.ok(privacyCopyIndex > apiActionIndex, 'privacy guidance should follow the API generation action');
  assert.ok(apiSettingsIndex > privacyCopyIndex, 'privacy guidance should precede the API settings');
  assert.doesNotMatch(source, /安全化した同じ制作情報JSON/);
  assert.match(source, /buildGeneratedImageMetadata/);
  assert.match(source, /embedGeneratedImageMetadata/);
  assert.doesNotMatch(source, /キャラクターシート解析結果/);
  assert.doesNotMatch(source, /"場所": bg360Analysis/);
  assert.doesNotMatch(source, /type="checkbox"[^>]*(?:metadata|privacy)|(?:metadata|privacy)[^>]*type="checkbox"/i);
});
