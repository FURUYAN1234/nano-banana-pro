import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOpenAIReferencePlan, appendOpenAIReferencePrompt, appendOpenAIWebReferencePrompt,
  getOpenAIPromptBodyBudget } from '../src/lib/openai-image-references.js';
import { buildGeneratedImageMetadata, embedGeneratedImageMetadata,
  extractGeneratedImageMetadata } from '../src/lib/generated-image-metadata.js';
import { getImageInputBudget } from '../src/lib/image-input-budget.js';

const selector = await import('../src/lib/panel-medium-reference.js').catch(error => {
  if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error;
  return {};
});
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;
const guide = image('neutral technique atlas');
const scenario = styles => styles.map((style, i) => `[${i + 1}コマ目]\n[画風： ${style}]\n[Camera: 上から見下ろす]\n状況: 人物が手紙を渡す。\nセリフなし`).join('\n');
const select = options => {
  assert.equal(typeof selector.selectPanelMediumStyles, 'function');
  return selector.selectPanelMediumStyles(options);
};
const medium = styles => ({ imageUrl: guide, styles });
const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Zl1sAAAAASUVORK5CYII=';

test('normal and native scenarios select only the actual special media, without changing source', () => {
  for (const count of [4, 5, 6, 7, 8]) {
    const styles = ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG', 'POP_ART', 'NORMAL'].slice(0, count);
    const source = scenario(styles);
    assert.deepEqual(select({ scenario: source, colorMode: 'color' }), ['POP_ART', 'WATERCOLOR', 'GEKIGA']);
    assert.equal(source, scenario(styles));
  }
  assert.deepEqual(select({ scenario: scenario(['GEKIGA', 'NORMAL', 'GEKIGA', 'NORMAL']) }), ['GEKIGA']);
  assert.deepEqual(select({ scenario: '[1コマ目]\n人物「[画風: POP_ART]と書いてある。」\n[2コマ目]\n[EMOTION: NORMAL]' }), []);
});

test('monochrome, explicit source-style lock and custom style exclude the automatic guide', () => {
  const source = scenario(['POP_ART', 'WATERCOLOR', 'GEKIGA', 'NORMAL']);
  for (const options of [
    { colorMode: 'monochrome' }, { preserveReferenceStyle: true },
    { styleJson: { style_name: '指定画風', reproduction_prompt: '作者の指定を優先' } },
    { punchlineType: 'SeriousDocumentary' },
  ]) assert.deepEqual(select({ scenario: source, ...options }), []);
  assert.deepEqual(select({ scenario: `Punchline: シリアス・ドキュメンタリー\n${source}` }), []);
  assert.deepEqual(select({ scenario: scenario(['NORMAL', 'SKETCH', 'CHIBI_GAG', 'NORMAL']) }), []);
  assert.deepEqual(select({ scenario: '' }), []);
});

test('style-only reference follows original materials, has no M number and scopes technique by declared medium', () => {
  const sheets = [image('person'), image('prop')];
  const plan = buildOpenAIReferencePlan({ characterImages: sheets, backgroundImage: image('panorama'), backgroundEnabled: true,
    referenceAssets: [{ image: sheets[0], items: [{ kind: 'character', name: '人物', description: '' }] },
      { image: sheets[1], items: [{ kind: 'prop', name: '手紙', description: '' }] }],
    mediumReference: medium(['POP_ART', 'GEKIGA']) });
  assert.deepEqual(plan.imageInputs.map(x => x.image_url), [...sheets, image('panorama'), guide]);
  assert.deepEqual(plan.referenceRoles, ['character_reference', 'prop_reference', 'background_reference', 'style_reference']);
  assert.deepEqual(plan.counts, { character: 2, background: 1, original: 0, styleReference: 1 });
  const line = plan.rolePrompt.split('\n').find(x => x.startsWith('Image 4:'));
  assert.match(line, /STYLE ONLY/);
  assert.doesNotMatch(line, /MATERIAL M\d/);
  assert.match(line, /TOP LEFT=POP_ART/);
  assert.match(line, /MIDDLE LEFT=GEKIGA/);
  assert.doesNotMatch(line, /NORMAL|WATERCOLOR|SKETCH|CHIBI_GAG/);
  assert.match(line, /明示された画風のコマだけに適用.*未選択セルは無視/);
  assert.match(line, /出力位置ではなくコマ指定の媒体で対応/);
  assert.match(line, /見える顔\/髪.*輪郭の強弱.*ハッチ.*網点.*pigment washes.*painted edges/);
  assert.match(line, /人物参照\/STEP1素材\/修復・編集元ではなくM番号なし/);
  assert.match(line, /見本の顔\/同一性\/識別特徴\/髪型・色\/服\/ポーズ\/Camera\/構図\/背景\/小物\/文字\/6分割配置は複製しない/);
  assert.match(line, /同一性の資料は承認済みプロンプトと人物参照のみ/);
  assert.match(line, /指定の衣装\/固有色\/ポーズ\/Camera\/Action\/表情\/台詞\/可視人物\/コマ数\/配置\/各コマの媒体を保持/);
  assert.match(line, /見本人物\/ラベルやこの指示文を描画しない/);
  assert.match(plan.rolePrompt, /Image 3: BACKGROUND REFERENCE.*MATERIAL M3/);
});

test('every selected-media subset lists only its exact atlas cells in selection order with a shorter role', () => {
  const locations = { POP_ART: 'TOP LEFT', WATERCOLOR: 'MIDDLE RIGHT', GEKIGA: 'MIDDLE LEFT' };
  const supported = Object.keys(locations);
  const subsets = Array.from({ length: 7 }, (_, mask) => supported.filter((_, i) => ((mask + 1) & (1 << i)) !== 0));
  subsets.push(['GEKIGA', 'WATERCOLOR', 'POP_ART']);
  for (const styles of subsets) {
    const selected = select({ scenario: scenario(['NORMAL', ...styles, 'SKETCH', 'CHIBI_GAG']) });
    assert.deepEqual(selected, styles);
    const instruction = selector.buildPanelMediumReferenceInstruction(selected);
    const mappings = [...instruction.matchAll(/(TOP LEFT|MIDDLE RIGHT|MIDDLE LEFT)=(POP_ART|WATERCOLOR|GEKIGA)/g)]
      .map(([, location, style]) => ({ location, style }));
    assert.deepEqual(mappings, styles.map(style => ({ location: locations[style], style })));
    for (const style of ['NORMAL', 'SKETCH', 'CHIBI_GAG', ...supported.filter(style => !styles.includes(style))]) {
      assert.ok(!instruction.includes(style), `Unselected medium ${style} must not be listed`);
    }
    // Before compression even the shortest one-medium instruction had 1,120 characters.
    assert.ok(instruction.length < 1120, `Instruction remains too long: ${instruction.length}`);
    const plan = buildOpenAIReferencePlan({ characterImages: [image('person')], mediumReference: medium(selected) });
    assert.equal(plan.rolePrompt.split('\n').find(line => line.startsWith('Image 2:')), `Image 2: ${instruction}`);
    assert.deepEqual(plan.imageInputs.map(input => input.image_url), [image('person'), guide]);
  }
});

test('14 main references retain the guide and reserved repair source within 16 inputs', () => {
  const sheets = Array.from({ length: 14 }, (_, i) => image(`person ${i}`));
  const originalCandidate = { mimeType: 'image/png', base64Img: Buffer.from('source page').toString('base64') };
  const initial = buildOpenAIReferencePlan({ characterImages: sheets, mediumReference: medium(['WATERCOLOR']) });
  const repair = buildOpenAIReferencePlan({ characterImages: sheets, originalCandidate, mediumReference: medium(['WATERCOLOR']) });
  assert.equal(initial.imageInputs.length, 15);
  assert.equal(repair.imageInputs.length, 16);
  assert.deepEqual(repair.imageInputs.slice(1), initial.imageInputs);
  assert.deepEqual(repair.referenceRoles, ['repair_source', ...Array(14).fill('character_reference'), 'style_reference']);
  assert.equal(getImageInputBudget({ characterImages: sheets }).maxCharacterImages, 14);
  const bg = buildOpenAIReferencePlan({ characterImages: sheets.slice(0, 10), backgroundImage: image('panorama'), backgroundEnabled: true,
    originalCandidate, mediumReference: medium(['WATERCOLOR']) });
  assert.equal(bg.imageInputs.length, 13);
  assert.throws(() => buildOpenAIReferencePlan({ characterImages: [...sheets, image('extra')], originalCandidate,
    mediumReference: medium(['WATERCOLOR']) }), /16枚/);
});

test('invalid or multiple guides and styles fail before transport; existing image roles cannot be reused', () => {
  for (const value of [[], [medium(['POP_ART'])], {}, { imageUrl: guide, styles: [] },
    { imageUrl: guide, styles: 'POP_ART' }, medium(['NORMAL']), medium(['SKETCH']), medium(['CHIBI_GAG']),
    medium(['POP_ART', 'UNKNOWN']), medium(['POP_ART', 'POP_ART']), { imageUrl: 'https://example.invalid/a.png', styles: ['GEKIGA'] }]) {
    assert.throws(() => buildOpenAIReferencePlan({ mediumReference: value }), /描法|画風|画像/);
  }
  assert.throws(() => buildOpenAIReferencePlan({ colorMode: 'monochrome', mediumReference: medium(['POP_ART']) }), /カラー/);
  for (const options of [{ characterImages: [guide] }, { backgroundEnabled: true, backgroundImage: guide },
    { originalCandidate: { mimeType: 'image/png', base64Img: guide.split(',')[1] } }]) {
    assert.throws(() => buildOpenAIReferencePlan({ ...options, mediumReference: medium(['POP_ART']) }), /用途/);
  }
});

test('no guide preserves the existing manifest and count shape for initial, monochrome and repair calls', () => {
  for (const colorMode of ['color', 'monochrome']) for (const repair of [false, true]) {
    const options = { colorMode, characterImages: [image('person')], ...(repair ? { originalCandidate: { base64Img: 'YQ==', mimeType: 'image/png' } } : {}) };
    const before = buildOpenAIReferencePlan(options);
    assert.deepEqual(buildOpenAIReferencePlan({ ...options, mediumReference: null }), before);
    assert.deepEqual(before.counts, { character: 1, background: 0, original: repair ? 1 : 0 });
    assert.ok(!Object.hasOwn(before, 'referenceRoles'));
    assert.doesNotMatch(before.rolePrompt, /STYLE ONLY/);
  }
});

test('API and Web use the same scoped manifest, retain authored text and reserve its full prompt budget', () => {
  const body = 'Camera: 後ろから望遠\r\nAction: 手を差し出す\nDialogue: 「そのまま。」';
  const plan = buildOpenAIReferencePlan({ characterImages: [image('person')], mediumReference: medium(['GEKIGA']) });
  const api = appendOpenAIReferencePrompt(body, plan);
  assert.equal(api, appendOpenAIWebReferencePrompt(body, plan));
  assert.equal(api.slice(0, body.length), body);
  assert.equal(getOpenAIPromptBodyBudget(plan) + plan.rolePrompt.length + 2, 32000);
  assert.throws(() => appendOpenAIReferencePrompt('x'.repeat(getOpenAIPromptBodyBudget(plan) + 1), plan), /上限|32000|32,000/);
});

test('style role and guide hash survive metadata PNG roundtrip without becoming a recognized material', async () => {
  const plan = buildOpenAIReferencePlan({ characterImages: [image('person')], mediumReference: medium(['POP_ART']) });
  const metadata = await buildGeneratedImageMetadata({ appVersion: 'test', generatedAt: '2026-10-16T00:00:00Z',
    provider: 'openai', modelId: 'test', workflowMode: 'api_image_generation', scenario: 'sample',
    finalPrompt: appendOpenAIReferencePrompt('Camera: overhead', plan), outputImage: png,
    inputImages: plan.imageInputs.map((entry, i) => ({ role: plan.referenceRoles?.[i], dataUrl: entry.image_url })) });
  const restored = await extractGeneratedImageMetadata(embedGeneratedImageMetadata(png, metadata));
  assert.deepEqual(restored.inputs.map(x => x.role), ['character_reference', 'style_reference']);
  assert.deepEqual(restored.inputs, metadata.inputs);
  assert.match(restored.inputs[1].sha256, /^[a-f0-9]{64}$/);
  assert.equal(restored.reference_context, null);
  assert.doesNotMatch(JSON.stringify(restored), /data:image/);
});
