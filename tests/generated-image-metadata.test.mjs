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

test('reference recognition snapshot follows current material order, preserves edits and never exports raw images or credentials', async () => {
  const {buildReferenceRecognitionMetadata} = await import('../src/lib/generated-image-metadata.js');
  const images=[MINIMAL_JPEG,ONE_PIXEL_PNG];
  const assets=[{image:ONE_PIXEL_PNG,analysisCompleted:true,items:[{kind:'character',name:'A',description:'Red coat'}]},
    {image:MINIMAL_JPEG,analysisCompleted:true,items:[{kind:'prop',name:'Key',description:'Edited handle',userEdited:true}]},
    {image:'deleted',items:[{kind:'background',name:'DELETED',description:'old'}]}];
  const background={location:'Gallery',spatialType:'indoor',lighting:'Daylight',objects:'Bench',mood:'Calm',apiKey:'must-not-export'};
  const pending=buildReferenceRecognitionMetadata({images,referenceAssets:assets,castList:'## A\nEdited profile\nBearer abcdefghijklmnopqrstuvwxyz123456',backgroundImage:ONE_PIXEL_PNG,backgroundEnabled:true,backgroundAnalysis:background});
  images.reverse(); assets[1].items[0].description='LATER CHANGE'; background.location='LATER CHANGE';
  const context=await pending;
  assert.deepEqual(context.materials.map(m=>m.image_number),[1,2,3]);
  assert.equal(context.materials[0].items[0].description,'Edited handle');
  assert.equal(context.materials[0].items[0].user_edited,true);
  assert.equal(context.materials[1].items[0].name,'A');
  assert.equal(context.background.image_number,3); assert.equal(context.background.analysis.location,'Gallery');
  assert.match(context.character_settings,/Edited profile/);
  const result=await buildFixture({referenceContext:context});
  assert.deepEqual(result.reference_context,context);
  const serialized=serializeGeneratedImageMetadata(result);
  assert.doesNotMatch(serialized,/LATER CHANGE|DELETED|data:image|must-not-export|abcdefghijklmnopqrstuvwxyz123456/);
  const web=await buildWebGenerationMetadata({referenceContext:context});
  assert.deepEqual(web.reference_context,context);
  assert.equal((await buildFixture()).reference_context,null);
});

test('STEP4 Web JSON saves the same prepared prompt as the Web copy path',async()=>{
  const source=await readFile(new URL('../src/components/Step4Panel.jsx',import.meta.url),'utf8');
  const expression=source.split('const buildCurrentWebGenerationMetadata = ')[1].split('const prepareCurrentImageSave')[0].trim().replace(/;$/,'');
  const ctx={buildWebGenerationMetadata,SYSTEM_VERSION:'test',isOpenAIImageMode:true,enableChatGPTMode:true,
    scenario:'scenario',finalPrompt:'base prompt',getCurrentMetadataInputImages:()=>[],getCurrentMetadataSettings:()=>({}),
    prepareWebCopyPrompt:prompt=>prompt+'\nImage 1: MATERIAL M1. Edited handle.',
    buildReferenceRecognitionMetadata:(await import('../src/lib/generated-image-metadata.js')).buildReferenceRecognitionMetadata,
    images:[],referenceAssets:[],castList:'',bg360Image:null,bg360Enabled:false,bg360Analysis:null};
  const build=new Function(...Object.keys(ctx),`return (${expression});`)(...Object.values(ctx));
  const metadata=await build('2026-10-09');
  assert.equal(metadata.prompt.final_sent_prompt,ctx.prepareWebCopyPrompt(ctx.finalPrompt));
});

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
  assert.equal(metadata.schema_version, 4);
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
    'api_keys', 'raw_reference_images', 'analysis_logs',
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
    source.indexOf('プロンプトをコピーする（Web / Work用）'),
    source.indexOf('APIで新しい画像を生成する（STEP4）'),
  );

  assert.match(source, /buildCurrentWebGenerationMetadata\s*=\s*async\s*\(preparedAt\)\s*=>\s*buildWebGenerationMetadata\(/);
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
  assert.ok(apiSettingsIndex < apiActionIndex, 'API settings should precede STEP4; privacy guidance stays directly below the action');
  assert.doesNotMatch(source, /安全化した同じ制作情報JSON/);
  assert.match(source, /prepareGeneratedImageSave/);
  assert.match(source, /saveImageToChosenLocation/);
  assert.doesNotMatch(source, /キャラクターシート解析結果/);
  assert.doesNotMatch(source, /"場所": bg360Analysis/);
  assert.doesNotMatch(source, /type="checkbox"[^>]*(?:metadata|privacy)|(?:metadata|privacy)[^>]*type="checkbox"/i);
});

test('API image history snapshots the actual request and export reads that snapshot', async () => {
  const workflow = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const step4 = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  assert.match(workflow, /metadataPrompt = apiPrompt/);
  assert.match(workflow, /metadataContext: \{[\s\S]*finalPrompt: metadataPrompt, inputImages: metadataInputImages/);
  assert.match(workflow, /metadataContext: qualityOutcome\.candidate\.metadataContext/);
  assert.match(step4, /prepareGeneratedImageSave\(\{ \.\.\.displayedHistory, img: generatedImage \}, SYSTEM_VERSION\)/);
  assert.match(workflow, /const referenceContext = await buildReferenceRecognitionMetadata\(/);
  assert.match(workflow, /settings: metadataSettings, referenceContext/);
});

test('metadata rejects invalid material numbering, keeps background OFF explicit, and preserves historical records',async()=>{
  const {buildReferenceRecognitionMetadata}=await import('../src/lib/generated-image-metadata.js');
  const before=await buildReferenceRecognitionMetadata({images:[ONE_PIXEL_PNG,MINIMAL_JPEG],
    referenceAssets:[{image:ONE_PIXEL_PNG,items:[{kind:'unknown',name:'Uncertain',description:'Unconfirmed'}]},
      {image:MINIMAL_JPEG,items:[{kind:'prop',name:'Key',description:'Old'}]}],castList:'## A\nOld',
    backgroundImage:ONE_PIXEL_PNG,backgroundEnabled:false,backgroundAnalysis:{location:'OFF background'}});
  assert.equal(before.materials.length,2); assert.equal(before.background.analysis,null);
  assert.equal(before.materials[0].items[0].kind,'unknown');
  const saved=await buildFixture({referenceContext:before});
  const after=await buildReferenceRecognitionMetadata({images:[MINIMAL_JPEG],referenceAssets:[{image:MINIMAL_JPEG,items:[{kind:'prop',name:'Key',description:'New'}]}],castList:''});
  assert.equal(after.materials[0].image_number,1); assert.equal(after.character_settings,'');
  assert.equal(saved.reference_context.character_settings,'## A\nOld');
  assert.equal(saved.reference_context.materials[1].items[0].description,'Old');
  assert.deepEqual((await extractGeneratedImageMetadata(embedGeneratedImageMetadata(ONE_PIXEL_PNG,saved))).reference_context,before);
  for(const invalid of [
    {...before,materials:[{...before.materials[0],image_number:2}]},
    {...before,background:{enabled:true,image_number:2,analysis:{}}},
  ])await assert.rejects(buildFixture({referenceContext:invalid}),/制作情報/);
  const arbitrary={...before,apiKey:'NEVER_EXPORT',rawImage:ONE_PIXEL_PNG,materials:before.materials.map(m=>({...m,dataUrl:ONE_PIXEL_PNG}))};
  assert.doesNotMatch(JSON.stringify((await buildFixture({referenceContext:arbitrary})).reference_context),/NEVER_EXPORT|data:image/);
  await assert.rejects(buildReferenceRecognitionMetadata({images:[ONE_PIXEL_PNG],referenceAssets:[]}),/読み込み画像と解析結果が不一致/);
});
