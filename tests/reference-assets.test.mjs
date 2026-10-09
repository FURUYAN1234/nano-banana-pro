import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOpenAIReferencePlan, appendOpenAIReferencePrompt } from '../src/lib/openai-image-references.js';
import { buildGeminiReferencePlan, appendGeminiReferencePrompt } from '../src/lib/gemini-image-references.js';

const lib = await import('../src/lib/reference-assets.js').catch(error => {
  if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
  return {};
});
const image = id => `data:image/png;base64,${Buffer.from(id).toString('base64')}`;
const images = ['front', 'expressions', 'turnaround', 'other person', 'room', 'key', 'unclear'].map(image);
const castList = 'STYLE_TAG: COLOR\n## 1. アオ\n人物設定\n## 2. ベニ\n人物設定';
const entry = (imageIndex, kind, name, description) => ({ imageIndex, items: [{ kind, name, description }] });
const payload = () => ({ castList, references: [
  entry(1, 'character', 'アオ', '人物の正面と外見'),
  entry(2, 'character', 'アオ', '同一人物の表情集'),
  entry(3, 'character', 'アオ', '同一人物の正面・側面・背面'),
  entry(4, 'character', 'ベニ', '別の人物'),
  entry(5, 'background', '作業室', '奥に扉、左に窓。背景の通行人はキャストではない'),
  entry(6, 'prop', '鍵', '丸い持ち手。持ち主は不明'),
  entry(7, 'unknown', '未分類の資料', '人物か彫像か判別できない'),
] });
const parse = value => {
  assert.equal(typeof lib.parseReferenceAnalysis, 'function', 'a validated material boundary is required');
  return lib.parseReferenceAnalysis(JSON.stringify(value), images);
};

test('one mixed batch groups expression/turnaround references under the same two identities', () => {
  const result = parse(payload());
  assert.equal(result.castList, castList);
  assert.equal(result.assets.length, images.length);
  assert.deepEqual(result.assets.slice(0, 3).map(asset => asset.items[0].name), ['アオ', 'アオ', 'アオ']);
  assert.equal(result.assets[4].items[0].kind, 'background');
  assert.equal(result.assets[5].items[0].kind, 'prop');
  assert.equal(result.assets[6].items[0].kind, 'unknown');
});

test('missing, duplicate, foreign or invented image indices cannot silently discard or misassign inputs', () => {
  for (const mutation of [
    p => p.references.pop(),
    p => { p.references[1].imageIndex = 1; },
    p => { p.references[0].imageIndex = 8; },
    p => { p.references[0].imageIndex = '1'; },
  ]) {
    const p = payload(); mutation(p);
    assert.throws(() => parse(p), /素材解析/);
  }
});

test('unknown material remains usable without inventing a cast member; unsupported roles fail', () => {
  const p = payload(); p.references[6].items[0].kind = 'system';
  assert.throws(() => parse(p), /素材解析/);
  const accepted = parse(payload());
  assert.doesNotMatch(accepted.castList, /未分類|作業室|鍵/);
});

test('character names must correspond to unique cast identities, not background/prop headings', () => {
  const p = payload(); p.references[0].items[0].name = '架空の第三者';
  assert.throws(() => parse(p), /素材解析/);
  const q = payload(); q.castList += '\n## 3. 鍵\n小物';
  assert.throws(() => parse(q), /素材解析/);
});

test('a single sheet may carry several characters and an object without forcing one role', () => {
  const p = payload(); p.references[0].items.push({ kind: 'prop', name: 'ペン', description: '短いペン' });
  assert.equal(parse(p).assets[0].items.length, 2);
});

test('additional materials cannot overwrite existing user-authored character settings', () => {
  const original = 'STYLE_TAG: COLOR\n## 1. アオ\n手動で決めた特徴と性格';
  const p = payload(); p.castList = p.castList.replace('人物設定', 'モデルが書き直した設定');
  const result = lib.parseReferenceAnalysis(JSON.stringify(p), images, original);
  assert.ok(result.castList.startsWith(original));
  assert.doesNotMatch(result.castList, /モデルが書き直した設定/);
  assert.match(result.castList, /ベニ/);
});

test('one editor and clipboard text contain character profiles plus background and prop recognition', () => {
  const { assets } = parse(payload());
  const text = lib.buildRecognitionEditorText(castList, assets, images);
  for (const term of ['アオ', 'ベニ', '画像5｜背景', '画像6｜小物', '持ち主は不明']) assert.ok(text.includes(term), term);
  const result = lib.parseRecognitionEditorText(text, images);
  assert.equal(result.castList, castList);
  assert.deepEqual(result.assets, assets);
  assert.doesNotMatch(result.castList, /作業室|鍵/);
  const edit = lib.parseRecognitionEditorText(text.replace('丸い持ち手', '四角い持ち手'), images);
  assert.match(edit.assets[5].items[0].description, /四角い持ち手/);
  assert.throws(() => lib.parseRecognitionEditorText(text.replace('画像6｜小物', '画像9｜小物'), images), /素材解析/);
});

test('panorama recognition stays in the same editor and remains separate from ordinary image roles', () => {
  const { assets } = parse(payload());
  const panorama = { location: '庭', lighting: '夕方', spatialType: 'outdoor' };
  const text = lib.buildRecognitionEditorText(castList, assets, images, panorama);
  const result = lib.parseRecognitionEditorText(text, images, panorama);
  assert.deepEqual(result.background, panorama);
  assert.equal(result.assets.length, images.length);
});

test('a unique existing character alias resolves to its canonical heading without adding a person', () => {
  const p = payload(); p.castList = p.castList.replace('アオ', 'アオ（Ao）');
  const result = parse(p);
  assert.equal(result.assets[0].items[0].name, 'アオ（Ao）');
  assert.equal(result.assets[1].items[0].name, 'アオ（Ao）');
});

test('an ambiguous shared alias cannot silently connect an image to the wrong person', () => {
  const p = payload(); p.castList = '## 1. 北 アオ\n人物設定\n## 2. 南 アオ\n人物設定';
  assert.throws(() => parse(p), /素材解析/);
});

test('scenario context keeps appearance, spatial cues and uncertain ownership as data', () => {
  const { assets } = parse(payload());
  const context = lib.buildReferenceAssetContext(assets, images);
  for (const term of ['アオ', 'ベニ', '作業室', '鍵', '持ち主は不明', '三面図', '未分類']) assert.ok(context.includes(term), term);
  assert.doesNotMatch(context, /data:image|base64/);
});

test('both providers use every original in the same order, with actual character/background/prop roles', () => {
  const { assets } = parse(payload());
  const openai = buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets });
  const gemini = buildGeminiReferencePlan({ characterImages: images, referenceAssets: assets });
  assert.deepEqual(openai.imageInputs.map(item => item.image_url), images);
  assert.deepEqual(gemini.referenceImages, images);
  for (const plan of [openai, gemini]) {
    assert.match(plan.rolePrompt, /Image 5:.*BACKGROUND REFERENCE.*作業室/);
    assert.match(plan.rolePrompt, /Image 6:.*PROP REFERENCE.*鍵/);
    assert.match(plan.rolePrompt, /Image 7:.*UNCLASSIFIED REFERENCE/);
    assert.doesNotMatch(plan.rolePrompt.split('\n').find(line => line.startsWith('Image 6:')), /CHARACTER REFERENCE/);
    assert.match(plan.rolePrompt, /同一人物の表情集/);
  }
});

test('Web uses the same original references including the panorama, while API repair numbering is independent', () => {
  const { assets } = parse(payload()); const bg = image('panorama');
  const web = lib.buildWebReferencePlan({ images, referenceAssets: assets, backgroundImage: bg, backgroundEnabled: true });
  assert.deepEqual(web.referenceImages, [...images, bg]);
  assert.match(web.rolePrompt, /Image 8:.*BACKGROUND REFERENCE/);
  const repair = buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets,
    originalCandidate: { base64Img: 'YQ==', mimeType: 'image/png' } });
  assert.match(repair.rolePrompt, /Image 1: SOURCE IMAGE TO EDIT/);
  assert.match(repair.rolePrompt, /Image 7:.*PROP REFERENCE/);
  assert.match(web.rolePrompt, /Image 6:.*PROP REFERENCE/);
  assert.ok(appendOpenAIReferencePrompt('台本', buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets })).includes('持ち主は不明'));
  assert.ok(appendGeminiReferencePrompt('台本', web).includes('同一人物の表情集'));
});

test('removal/reordering cannot shift identities, and missing metadata fails rather than labeling a prop as a person', () => {
  const { assets } = parse(payload());
  const reordered = [images[5], images[0]];
  const plan = buildOpenAIReferencePlan({ characterImages: reordered, referenceAssets: assets });
  assert.match(plan.rolePrompt, /Image 1:.*PROP REFERENCE/);
  assert.match(plan.rolePrompt, /Image 2:.*CHARACTER REFERENCE.*アオ/);
  assert.throws(() => buildOpenAIReferencePlan({ characterImages: [image('new')], referenceAssets: assets }), /素材解析/);
});

test('monochrome applies to all reference types without discarding geometry or changing original bytes', () => {
  const { assets } = parse(payload());
  const color = buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets });
  const mono = buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets, colorMode: 'monochrome' });
  assert.deepEqual(color.imageInputs, mono.imageInputs);
  assert.match(mono.rolePrompt, /PROP REFERENCE.*native black ink/);
  assert.match(mono.rolePrompt, /BACKGROUND REFERENCE.*native black ink/);
});


test('mixed-reference manifests share policy once and retain every per-image visual fact', () => {
  const { assets } = parse(payload());
  const plans = [
    buildOpenAIReferencePlan({ characterImages: images, referenceAssets: assets }),
    buildGeminiReferencePlan({ characterImages: images, referenceAssets: assets }),
    lib.buildWebReferencePlan({ images, referenceAssets: assets }),
  ];
  for (const plan of plans) {
    assert.equal((plan.rolePrompt.match(/expression sheets and turnaround views show the same person/g) || []).length, 1);
    for (const [index, asset] of assets.entries()) {
      const line = plan.rolePrompt.split('\n').find(value => value.startsWith(`Image ${index + 1}:`));
      for (const item of asset.items) {
        assert.ok(line.includes(item.name));
        assert.ok(line.includes(item.description));
      }
    }
    assert.match(plan.rolePrompt, /do not invent ownership/);
    assert.match(plan.rolePrompt, /Do not copy sheet layout/);
    assert.ok(plan.rolePrompt.length < 3500, `shared policies should not grow with character count: ${plan.rolePrompt.length}`);
  }
});


test('panorama remains the last original and receives the new last number after ordinary additions', () => {
  const { assets } = parse(payload()); const panorama = image('panorama-middle-drop');
  const initial = lib.buildWebReferencePlan({ images, referenceAssets: assets, backgroundImage: panorama, backgroundEnabled: true });
  const laterImage = image('later-prop');
  const updated = lib.buildWebReferencePlan({ images: [...images, laterImage], referenceAssets: [...assets, {image: laterImage, items: [{kind:'prop',name:'ノート',description:'四角い赤いノート'}]}], backgroundImage: panorama, backgroundEnabled: true });
  assert.equal(initial.referenceImages.at(-1), panorama);
  assert.match(initial.rolePrompt, /Image 8: BACKGROUND REFERENCE/);
  assert.equal(updated.referenceImages.at(-1), panorama);
  assert.equal(updated.referenceImages.at(-2), laterImage);
  assert.match(updated.rolePrompt, /Image 8: PROP REFERENCE.*ノート/);
  assert.match(updated.rolePrompt, /Image 9: BACKGROUND REFERENCE/);
  assert.equal(new Set(updated.referenceImages).size, 9);
});


test('scenario material numbers include the enabled panorama after ordinary images', () => {
 const {assets} = parse(payload());
 const panorama={location:'白い展示室',lighting:'大きな窓の自然光',spatialType:'indoor',objects:'ベンチ',mood:'静か'};
 const active=lib.buildReferenceAssetContext(assets,images,{panorama});
 const data=JSON.parse(active.split('\n')[1]);
 assert.equal(data.at(-1).imageIndex,8);
 assert.equal(data.at(-1).items[0].name,'360°背景');
 assert.ok(data.at(-1).items[0].description.includes('白い展示室'));
 assert.equal(JSON.parse(lib.buildReferenceAssetContext(assets,images).split('\n')[1]).length,7);
});


test('safe generation metadata retains background/prop roles instead of marking every ordinary image as a character', () => {
 const {assets} = parse(payload());
 for(const plan of [buildOpenAIReferencePlan({characterImages:images,referenceAssets:assets}),buildGeminiReferencePlan({characterImages:images,referenceAssets:assets})]) {
  assert.deepEqual(plan.referenceRoles,['character_reference','character_reference','character_reference','character_reference','background_reference','prop_reference','unclassified_reference']);
 }
 const repair=buildOpenAIReferencePlan({characterImages:[images[5],images[0]],referenceAssets:assets,originalCandidate:{base64Img:'YQ==',mimeType:'image/png'}});
 assert.deepEqual(repair.referenceRoles,['repair_source','prop_reference','character_reference']);
});
