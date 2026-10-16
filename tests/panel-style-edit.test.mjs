import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { crc32, deflateSync, inflateSync } from 'node:zlib';
import { buildEmotionBlock } from '../src/lib/panel-utils.js';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS } from '../src/lib/image-prompt-budget.js';
import { normalizeOpenAIImageDataUrl, OPENAI_IMAGE_DATA_URL_MAX_CHARS } from '../src/lib/openai-image-references.js';

let server, panelEditor, createPanelStyleEditPlan, buildPanelStyleEditRequest, composePanelPixels,
  readPanelStyleEditFrames, preparePanelStyleEdit, composePanelStyleEdit, experimentalLayout, experimentalLayoutOptions;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  panelEditor = await server.ssrLoadModule('/src/lib/panel-style-edit.js');
  ({ createPanelStyleEditPlan, buildPanelStyleEditRequest, composePanelPixels,
    readPanelStyleEditFrames, preparePanelStyleEdit, composePanelStyleEdit } = panelEditor);
  ({ experimentalLayout, experimentalLayoutOptions } = await server.ssrLoadModule('/src/lib/experimental-manga.js'));
});
after(async () => { await server?.close(); });

const image = (width, height, paint = (x, y) => [x % 256, y % 256, (x + y) % 256, 255]) => {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) data.set(paint(x, y), (y * width + x) * 4);
  return { width, height, data };
};
const sourceUrl = 'data:image/png;base64,c291cmNl';
const region = { x: 20, y: 25, width: 80, height: 60 };
test('both panel edit methods carry the source monochrome medium without changing color requests', () => {
  for (const provider of ['openai','gemini']) for (const mode of ['style','free']) {
    const plan=createPanelStyleEditPlan({width:200,height:240},region,undefined,provider);
    const options=mode==='style'?{mode,style:'POP_ART'}:{mode,instruction:'手に持つ本へ星印を一つ追加。'};
    const mono=buildPanelStyleEditRequest(sourceUrl,plan,{...options,colorMode:'monochrome'});
    assert.match(mono.prompt,/TONE PLACEMENT: lit light skin\/light materials=paper white; middle shadows=screentone; deepest shadows=solid black/);
    assert.match(mono.prompt,/SCREENED SKIN BASE:.*(?:keep base in light|light keeps base)/);
    assert.match(mono.prompt,/Never substitute flat-gray paint for screentone/);
    assert.match(mono.prompt,/EDIT TONE LOCK: source hair\/skin\/garment base assignments stay fixed/);
    assert.doesNotMatch(mono.prompt,/darkest[^\n]*solid black/);
    const color=buildPanelStyleEditRequest(sourceUrl,plan,{...options,colorMode:'color'});
    assert.doesNotMatch(color.prompt,/MONOCHROME THREE-TONE MANUSCRIPT LOCK|TONE PLACEMENT:/);
    if(mode==='free') assert.ok(mono.prompt.includes(options.instruction));
  }
});
test('Gemini uses supported square canvases without shrinking native panels', () => {
  for (const [width, edge, imageSize] of [[800, 1024, '1K'], [1500, 2048, '2K'], [2200, 4096, '4K']]) {
    const plan = createPanelStyleEditPlan({width:3000,height:4000}, {x:0,y:0,width,height:300}, undefined, 'gemini');
    assert.deepEqual(plan.canvas,{width:edge,height:edge});
    assert.equal(plan.editRegion.width,width);
    assert.deepEqual(plan.imageOptions,{aspectRatio:'1:1',imageSize});
    const request = buildPanelStyleEditRequest(sourceUrl,plan,{style:'SKETCH',colorMode:'monochrome'});
    assert.match(request.prompt,/monochrome/i);
  }
  assert.throws(()=>createPanelStyleEditPlan({width:5000,height:5000},{x:0,y:0,width:4500,height:100},undefined,'gemini'),/サイズ|原寸/);
  assert.throws(()=>createPanelStyleEditPlan({width:200,height:240},region,undefined,'unknown'),/provider|プロバイダー/i);
});

test('editor orders observed regions in Japanese reading order and retains actual pixel bounds', () => {
  const regions = [
    { x: 31, y: 208, width: 1081, height: 886 }, { x: 1128, y: 208, width: 1083, height: 886 },
    { x: 1128, y: 1106, width: 1082, height: 904 }, { x: 31, y: 1107, width: 1081, height: 904 },
    { x: 1128, y: 2023, width: 1082, height: 1043 }, { x: 31, y: 2024, width: 1080, height: 1042 },
  ]; // Actual detected bounds of the retained image; planned cuts must never replace them.
  const before = structuredClone(regions);
  for (const options of [{}, { plan: { count: 6, layout: 'two_columns' } }]) {
    const result = panelEditor.orderPanelStyleEditFrames(regions, { width: 2240, height: 3168 }, options);
    assert.equal(result.readingOrderConfirmed, true);
    assert.deepEqual(result.frames.map(frame => frame.region), [regions[1], regions[0], ...regions.slice(2)]);
    assert.deepEqual(result.frames.map(frame => frame.index), [0, 1, 2, 3, 4, 5]);
    assert.deepEqual(result.frames.map(frame => frame.panelNumber), [1, 2, 3, 4, 5, 6]);
  }
  assert.deepEqual(regions, before);
});

test('simple vertical, mixed-width and right-spanning layouts retain their reading order', () => {
  const page = { width: 1000, height: 1000 };
  const fixtures = [
    [0, 1, 2, 3].map(n => ({ x: 10, y: 10 + 240 * n, width: 970, height: 220 })),
    [{ x: 10, y: 10, width: 970, height: 220 }, { x: 510, y: 250, width: 470, height: 220 },
      { x: 10, y: 251, width: 470, height: 219 }, { x: 10, y: 490, width: 970, height: 490 }],
    [{ x: 510, y: 10, width: 470, height: 460 }, { x: 10, y: 11, width: 470, height: 219 },
      { x: 10, y: 250, width: 470, height: 220 }, { x: 10, y: 490, width: 970, height: 490 }],
  ];
  for (const expected of fixtures) {
    const result = panelEditor.orderPanelStyleEditFrames([...expected].reverse(), page);
    assert.equal(result.readingOrderConfirmed, true);
    assert.deepEqual(result.frames.map(frame => frame.region), expected);
    assert.deepEqual(result.frames.map(frame => frame.panelNumber), [1, 2, 3, 4]);
  }
});

test('every supported saved native layout confirms order without adopting planned crop sizes', () => {
  const page = { width: 2000, height: 2000 };
  for (const count of [5, 6, 7, 8]) for (const { id: layout } of experimentalLayoutOptions(count)) {
    const regions = experimentalLayout(count, layout).map(r => ({
      x: Math.round(r.x * 1900) + 25, y: Math.round(r.y * 1900) + 25,
      width: Math.round(r.w * 1900) - 10, height: Math.round(r.h * 1900) - 10,
    }));
    const result = panelEditor.orderPanelStyleEditFrames([...regions].reverse(), page, { plan: { count, layout } });
    assert.equal(result.readingOrderConfirmed, true, `${count}/${layout}`);
    assert.deepEqual(result.frames.map(frame => frame.region), regions, `${count}/${layout}`);
  }
});

test('ambiguous crossing columns and mismatched plans remain editable without claimed panel numbers', () => {
  const page = { width: 1000, height: 1000 };
  const crossing = [{ x: 510, y: 10, width: 470, height: 580 }, { x: 10, y: 10, width: 470, height: 280 },
    { x: 10, y: 310, width: 470, height: 670 }, { x: 510, y: 610, width: 470, height: 370 }];
  const ordinary = [0, 1, 2, 3].map(n => ({ x: 10, y: 10 + 240 * n, width: 970, height: 220 }));
  const sixStrips = Array.from({ length: 6 }, (_, n) => ({ x: 10, y: 10 + 160 * n, width: 970, height: 140 }));
  for (const [regions, options] of [[crossing, {}], [ordinary, { plan: { count: 4, layout: 'two_columns' } }],
    [ordinary, { plan: { count: 6, layout: 'two_columns' } }], [ordinary, { plan: { count: 4, layout: 'unknown' } }],
    [sixStrips, { plan: { count: 6, layout: 'two_columns' } }]]) {
    const result = panelEditor.orderPanelStyleEditFrames(regions, page, options);
    assert.equal(result.readingOrderConfirmed, false);
    assert.ok(result.readingOrderNote.trim());
    assert.equal(result.frames.length, regions.length);
    assert.ok(result.frames.every(frame => frame.panelNumber === null));
    assert.deepEqual(new Set(result.frames.map(frame => JSON.stringify(frame.region))), new Set(regions.map(frame => JSON.stringify(frame))));
  }
  assert.throws(() => panelEditor.orderPanelStyleEditFrames([{ x: -1, y: 0, width: 100, height: 100 }], page), /領域|画像/);
  assert.throws(() => panelEditor.orderPanelStyleEditFrames([ordinary[0], { ...ordinary[0], x: 20 }], page), /重な|重複|領域/);
});

test('panel plan uses an existing API size, centers without scaling, and validates geometry before payment', () => {
  for (const [size, width, height] of [['1120x1584', 1120, 1584], ['2240x3168', 2240, 3168]]) {
    const plan = createPanelStyleEditPlan({ width: 2000, height: 2800 }, region, size);
    assert.equal(plan.size, size);
    assert.deepEqual(plan.canvas, { width, height });
    assert.deepEqual(plan.region, region);
    assert.deepEqual(plan.editRegion, { x: Math.floor((width - 80) / 2), y: Math.floor((height - 60) / 2), width: 80, height: 60 });
    assert.deepEqual(plan.page, { width: 2000, height: 2800 });
  }
  for (const invalid of [null, { ...region, x: -1 }, { ...region, y: 0.5 }, { ...region, width: 0 }, { ...region, x: 180 }]) {
    assert.throws(() => createPanelStyleEditPlan({ width: 200, height: 240 }, invalid, '1120x1584'), /領域|整数|画像/);
  }
  assert.throws(() => createPanelStyleEditPlan({ width: 200, height: 240 }, region, '80x60'), /対応|サイズ/);
  assert.throws(() => createPanelStyleEditPlan({ width: 2240, height: 3168 }, { x: 0, y: 0, width: 2000, height: 500 }, '1120x1584'), /大きい.*サイズ/);
  assert.doesNotThrow(() => createPanelStyleEditPlan({ width: 2240, height: 3168 }, { x: 0, y: 0, width: 2000, height: 500 }, '2240x3168'));
});

test('all six explicit styles reuse the common recipes while preserving the source panel and speech', () => {
  const plan = createPanelStyleEditPlan({ width: 200, height: 240 }, region, '1120x1584');
  for (const colorMode of ['color', 'monochrome']) for (const style of ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG']) {
    const request = buildPanelStyleEditRequest(sourceUrl, plan, { style, colorMode });
    assert.deepEqual(request.imageInputs, [{ image_url: sourceUrl }]);
    assert.deepEqual(request.referenceImages, [sourceUrl]);
    assert.ok(request.prompt.includes(buildEmotionBlock(`[EMOTION: ${style}]`, colorMode, { providerFamily: 'chatgpt' }).trim()));
    if (style === 'NORMAL' && colorMode === 'monochrome') assert.match(request.prompt, /standard Japanese manga ink drawing/);
    assert.match(request.prompt, /Camera\/Action/);
    assert.match(request.prompt, /dialogue.*exactly/i);
    assert.match(request.prompt, /expressions.*gaze.*poses/i);
    assert.match(request.prompt, /padding.*not.*scene/i);
    assert.match(request.prompt, /1120.*1584/);
    assert.ok(request.prompt.includes(JSON.stringify(plan.editRegion)));
    assert.match(request.prompt, /Do not add.*speaker names/i);
  }
  assert.throws(() => buildPanelStyleEditRequest(sourceUrl, plan, { style: 'UNKNOWN' }), /画風/);
  assert.throws(() => buildPanelStyleEditRequest(sourceUrl, plan, { style: 'POP_ART', colorMode: 'sepia' }), /カラー|色/);
  assert.throws(() => buildPanelStyleEditRequest(sourceUrl, { ...plan, editRegion: { ...plan.editRegion, x: 0 } }, { style: 'POP_ART' }), /領域|計画/);
});

test('composition changes only the selected exact pixels and preserves both inputs including alpha', () => {
  const source = image(9, 8, (x, y) => [x, y, x + y, (x * 17 + y * 13) % 256]);
  const patch = image(3, 4, () => [99, 88, 77, 128]);
  const area = { x: 2, y: 1, width: 3, height: 4 };
  const before = source.data.slice(), patchBefore = patch.data.slice();
  const result = composePanelPixels(source, patch, area);
  assert.notEqual(result.data, source.data);
  assert.deepEqual(source.data, before);
  assert.deepEqual(patch.data, patchBefore);
  for (let y = 0; y < source.height; y++) for (let x = 0; x < source.width; x++) {
    const p = (y * source.width + x) * 4;
    const inside = x >= 2 && x < 5 && y >= 1 && y < 5;
    assert.deepEqual(result.data.slice(p, p + 4), inside ? patch.data.slice(0, 4) : before.slice(p, p + 4));
  }
  assert.throws(() => composePanelPixels(source, image(6, 8), area), /寸法|原寸/);
  assert.throws(() => composePanelPixels(source, image(3, 3), area), /寸法|原寸/);
  assert.throws(() => composePanelPixels(source, patch, { ...area, x: 8 }), /領域/);
  assert.throws(() => composePanelPixels({ ...source, data: [] }, patch, area), /画素/);
  assert.doesNotThrow(() => composePanelPixels(source, image(9, 8), { x: 0, y: 0, width: 9, height: 8 }));
});

test('free panel edits retain literal requested changes without style-mode locks', () => {
  const plan = createPanelStyleEditPlan({ width: 200, height: 240 }, region, '1120x1584');
  const instruction = '視点を横からの広角に変更し、人物を一人追加。\n台詞を「こちらへ！」に変え、赤い服と水彩画にする。';
  for (const colorMode of ['color', 'monochrome']) {
    const request = buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'free', instruction, colorMode });
    assert.deepEqual(request.imageInputs, [{ image_url: sourceUrl }]);
    assert.deepEqual(request.referenceImages, [sourceUrl]);
    assert.ok(request.prompt.includes(instruction), 'the complete user request stays literal');
    assert.match(request.prompt, /except where the user explicitly requests a change and its necessary local consequences/);
    assert.match(request.prompt, /user instruction takes priority/i);
    assert.ok(request.prompt.includes(JSON.stringify(plan.editRegion)));
    assert.match(request.prompt, /1120 x 1584/);
    assert.match(request.prompt, /padding/i);
    assert.doesNotMatch(request.prompt, /SELECTED PANEL STYLE EDIT|Keep all dialogue text exactly|Keep the existing Camera\/Action|Maintain full color|Maintain monochrome|Change only the drawing medium|Do not add labels, speaker names/);
    assert.doesNotMatch(request.prompt, /ACTOR MEDIUM|PANEL STYLE LOCK|Every visible actor in this frame/);
  }
  for (const style of ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG']) {
    assert.deepEqual(buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'style', style }),
      buildPanelStyleEditRequest(sourceUrl, plan, { style }), 'the legacy style-only call remains supported');
  }
});

test('panel edit mode rejects blank, invalid and mixed payloads before sending', () => {
  const plan = createPanelStyleEditPlan({ width: 200, height: 240 }, region, '1120x1584');
  const invalid = [
    {}, { mode: 'free' }, { mode: 'free', instruction: '' }, { mode: 'free', instruction: ' \n\t' },
    { mode: 'free', instruction: null }, { mode: 'free', instruction: 7 },
    { mode: 'free', instruction: ['change'] }, { mode: 'free', instruction: { text: 'change' } },
    { mode: 'other', style: 'POP_ART' }, { mode: null, style: 'POP_ART' },
    { mode: 'free', instruction: 'change', style: 'POP_ART' },
    { mode: 'free', instruction: 'change', style: '' },
    { mode: 'style', style: 'POP_ART', instruction: 'change' },
    { style: 'POP_ART', instruction: '' }, { style: 'POP_ART', instruction: null },
    { mode: 'free', instruction: 'change', colorMode: 'sepia' },
  ];
  for (const options of invalid) assert.throws(() => buildPanelStyleEditRequest(sourceUrl, plan, options), undefined, JSON.stringify(options));
  assert.doesNotThrow(() => buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'free', instruction: 'change', style: undefined }));
  assert.doesNotThrow(() => buildPanelStyleEditRequest(sourceUrl, plan, { style: 'POP_ART', instruction: undefined }));
});

test('free panel edits share the exact API prompt ceiling without truncating user instructions', () => {
  const plan = createPanelStyleEditPlan({ width: 200, height: 240 }, region, '1120x1584');
  const one = buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'free', instruction: 'a' });
  const instruction = '字'.repeat(OPENAI_IMAGE_PROMPT_MAX_CHARS - one.prompt.length + 1);
  const exact = buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'free', instruction });
  assert.equal(exact.prompt.length, OPENAI_IMAGE_PROMPT_MAX_CHARS);
  assert.ok(exact.prompt.includes(instruction));
  assert.throws(() => buildPanelStyleEditRequest(sourceUrl, plan, { mode: 'free', instruction: instruction + '字' }), /上限|切り捨て/);
});

// Canvas test double only. Production always decodes actual supplied images.
async function withCanvas(run) {
  const previous = { Image: globalThis.Image, document: globalThis.document };
  const registry = new Map();
  let serial = 0;
  const env = { registry, onEncode: null, add(pixels) {
    const url = `data:image/png;base64,${Buffer.from(`fixture-${++serial}`).toString('base64')}`;
    registry.set(url, { ...pixels, data: pixels.data.slice() });
    return url;
  } };
  globalThis.Image = class {
    async decode() {
      const pixels = registry.get(this.src);
      if (!pixels) throw new Error('test fixture missing');
      this.pixels = pixels; this.naturalWidth = pixels.width; this.naturalHeight = pixels.height;
    }
  };
  globalThis.document = { createElement: () => {
    let pixels;
    const canvas = { width: 0, height: 0 };
    const current = () => {
      if (!pixels || pixels.width !== canvas.width || pixels.height !== canvas.height) pixels = image(canvas.width, canvas.height, () => [0, 0, 0, 0]);
      return pixels;
    };
    const context = {
      fillStyle: '', imageSmoothingEnabled: true,
      fillRect(x, y, width, height) {
        assert.equal(this.fillStyle, '#ffffff');
        assert.deepEqual([x, y, width, height], [0, 0, canvas.width, canvas.height]);
        current().data.fill(255);
      },
      drawImage(input, ...args) {
        const inputPixels = input.pixels;
        let sx = 0, sy = 0, sw = inputPixels.width, sh = inputPixels.height, dx, dy;
        if (args.length === 2) [dx, dy] = args;
        else {
          let dw, dh; [sx, sy, sw, sh, dx, dy, dw, dh] = args;
          assert.equal(sw, dw, 'no panel rescale'); assert.equal(sh, dh, 'no panel rescale');
        }
        const target = current();
        for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) {
          const start = ((sy + y) * inputPixels.width + sx + x) * 4;
          target.data.set(inputPixels.data.subarray(start, start + 4), ((dy + y) * target.width + dx + x) * 4);
        }
      },
      getImageData(x, y, width, height) {
        const source = current();
        return image(width, height, (dx, dy) => source.data.subarray(((y + dy) * source.width + x + dx) * 4, ((y + dy) * source.width + x + dx) * 4 + 4));
      },
      createImageData: (width, height) => image(width, height, () => [0, 0, 0, 0]),
      putImageData(patch, x, y) {
        assert.deepEqual([x, y], [0, 0]);
        pixels = { width: patch.width, height: patch.height, data: patch.data.slice() };
      },
    };
    canvas.getContext = () => context;
    canvas.toDataURL = type => {
      assert.equal(type, 'image/png');
      const result = { ...current(), data: current().data.slice() };
      const encoded = env.onEncode?.(result);
      if (typeof encoded === 'string') { registry.set(encoded, result); return encoded; }
      return env.add(result);
    };
    return canvas;
  } };
  try { await run(env); } finally { globalThis.Image = previous.Image; globalThis.document = previous.document; }
}

test('detected thumbnail regions require the observed count and cannot fabricate a missing panel', async () => withCanvas(async env => {
  const rectangles = [{ x: 10, y: 20, width: 80, height: 90 }, { x: 110, y: 20, width: 80, height: 90 },
    { x: 10, y: 130, width: 80, height: 90 }, { x: 110, y: 130, width: 80, height: 90 }];
  const pixels = image(200, 240, (x, y) => rectangles.some(r => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height) ? [80, 60, 50, 255] : [255, 255, 255, 255]);
  const source = env.add(pixels);
  const result = await readPanelStyleEditFrames(source, 4);
  assert.equal(result.sourceImage, source);
  assert.deepEqual([result.width, result.height], [200, 240]);
  assert.deepEqual(result.frames.map(frame => frame.region), [rectangles[1], rectangles[0], rectangles[3], rectangles[2]]);
  assert.deepEqual(result.frames.map(frame => frame.index), [0, 1, 2, 3]);
  assert.deepEqual(result.frames.map(frame => frame.panelNumber), [1, 2, 3, 4]);
  assert.equal(result.readingOrderConfirmed, true);
  assert.ok(result.frames.every(frame => env.registry.get(frame.thumbnail).width === frame.region.width));
  const mismatched = await readPanelStyleEditFrames(source, 4, { plan: { count: 6, layout: 'two_columns' } });
  assert.equal(mismatched.readingOrderConfirmed, false);
  assert.equal(mismatched.frames.length, 4);
  assert.ok(mismatched.frames.every(frame => frame.panelNumber === null && env.registry.has(frame.thumbnail)));
  await assert.rejects(readPanelStyleEditFrames(source, 5), /コマ|領域/);
  await assert.rejects(readPanelStyleEditFrames(source, 3), /コマ/);
  await assert.rejects(readPanelStyleEditFrames(env.add(image(200, 240, () => [255, 255, 255, 255])), 4), /コマ|領域/);
}));

test('reopening an adopted panel edit retains verified frames and refreshes thumbnails even if its drawn rule changes', async () => withCanvas(async env => {
  const rectangles = [{ x: 10, y: 20, width: 80, height: 90 }, { x: 110, y: 20, width: 80, height: 90 },
    { x: 10, y: 130, width: 80, height: 90 }, { x: 110, y: 130, width: 80, height: 90 }];
  const pixels = image(200, 240, (x, y) => rectangles.some(r => x >= r.x && x < r.x + r.width && y >= r.y && y < r.y + r.height) ? [80, 60, 50, 255] : [255, 255, 255, 255]);
  const sourceImage = env.add(pixels);
  const original = await readPanelStyleEditFrames(sourceImage, 4);
  const region = original.frames[0].region;
  const edited = composePanelPixels(pixels, image(region.width, region.height, () => [255, 255, 255, 255]), region);
  const adopted = env.add(edited);
  await assert.rejects(readPanelStyleEditFrames(adopted, 4), /コマ枠/);
  const editLineage = [{ sourceImage, region }];
  const reopened = await readPanelStyleEditFrames(adopted, 4, { editLineage });
  assert.deepEqual(reopened.frames.map(f => f.region), original.frames.map(f => f.region));
  assert.deepEqual(reopened.frames.map(f => f.panelNumber), [1, 2, 3, 4]);
  assert.ok(env.registry.get(reopened.frames[0].thumbnail).data.every(v => v === 255), 'thumbnail comes from current adopted pixels');
  const secondRegion = original.frames[1].region;
  const twice = env.add(composePanelPixels(edited, image(secondRegion.width, secondRegion.height, () => [0,0,0,255]), secondRegion));
  const reopenedTwice = await readPanelStyleEditFrames(twice, 4, {
    editLineage: [{ sourceImage: adopted, region: secondRegion }, ...editLineage],
  });
  assert.deepEqual(reopenedTwice.frames.map(f => f.region), original.frames.map(f => f.region));
  assert.deepEqual([...env.registry.get(reopenedTwice.frames[1].thumbnail).data.slice(0,4)], [0,0,0,255]);
  const invalid = { ...edited, data: edited.data.slice() }; invalid.data[0] = 0;
  await assert.rejects(readPanelStyleEditFrames(env.add(invalid), 4, { editLineage }), /対象外|画素/);
  await assert.rejects(readPanelStyleEditFrames(adopted, 4, { editLineage: [{ sourceImage, region: { ...region, width: region.width + 1 } }] }), /領域|コマ/);
}));

test('browser adapter pads only one native crop, rejects bad output dimensions, and proves outside PNG pixels', async () => withCanvas(async env => {
  const pixels = image(200, 240);
  const source = env.add(pixels);
  const prepared = await preparePanelStyleEdit(source, region, { requestedSize: '1120x1584', style: 'POP_ART', colorMode: 'color' });
  assert.equal(prepared.sourceImage, source);
  assert.deepEqual([env.registry.get(prepared.before).width, env.registry.get(prepared.before).height], [80, 60]);
  const padded = env.registry.get(prepared.request.imageInputs[0].image_url);
  const target = prepared.plan.editRegion;
  assert.deepEqual([...padded.data.slice(0, 4)], [255, 255, 255, 255]);
  assert.deepEqual([...padded.data.slice((target.y * padded.width + target.x) * 4, (target.y * padded.width + target.x) * 4 + 4)], [20, 25, 45, 255]);
  // Changed padding is discarded, not a false reason for paid regeneration.
  const returned = image(padded.width, padded.height, () => [9, 8, 7, 255]);
  const composed = await composePanelStyleEdit(source, env.add(returned), prepared.plan);
  assert.equal(composed.outsidePixelsUnchanged, true);
  assert.deepEqual([composed.width, composed.height], [200, 240]);
  const result = env.registry.get(composed.dataUrl);
  assert.deepEqual(result, composePanelPixels(pixels, image(80, 60, () => [9, 8, 7, 255]), region));
  assert.deepEqual(env.registry.get(source), pixels);
  assert.deepEqual([env.registry.get(composed.after).width, env.registry.get(composed.after).height], [80, 60]);
  await assert.rejects(composePanelStyleEdit(source, env.add(image(560, 792)), prepared.plan), /寸法|サイズ/);
  await assert.rejects(composePanelStyleEdit(source, env.add(image(1584, 1120)), prepared.plan), /寸法|サイズ/);
  await assert.rejects(composePanelStyleEdit(env.add(image(199, 240)), env.add(returned), prepared.plan), /元画像|寸法/);
  env.onEncode = output => { if (output.width === 200 && output.height === 240) output.data[0] ^= 255; };
  await assert.rejects(composePanelStyleEdit(source, env.add(returned), prepared.plan), /範囲外|コマ外/);
}));

test('free edit preparation and composition use the same crop boundary and retain the original', async () => withCanvas(async env => {
  const pixels = image(200, 240);
  const source = env.add(pixels);
  const instruction = '人物の位置と視点を変え、台詞を短くする。';
  const prepared = await preparePanelStyleEdit(source, region, { requestedSize: '1120x1584', mode: 'free', instruction });
  assert.equal(prepared.sourceImage, source);
  assert.ok(prepared.request.prompt.includes(instruction));
  assert.doesNotMatch(prepared.request.prompt, /Keep all dialogue text exactly|Keep the existing Camera\/Action|SELECTED PANEL STYLE EDIT/);
  const patch = image(region.width, region.height, () => [180, 50, 90, 255]);
  const returned = image(prepared.plan.canvas.width, prepared.plan.canvas.height, () => [180, 50, 90, 255]);
  const composed = await composePanelStyleEdit(source, env.add(returned), prepared.plan);
  assert.equal(composed.outsidePixelsUnchanged, true);
  assert.deepEqual(env.registry.get(composed.dataUrl), composePanelPixels(pixels, patch, region));
  assert.deepEqual(env.registry.get(source), pixels);
  await assert.rejects(composePanelStyleEdit(source, env.add(image(560, 792)), prepared.plan), /寸法|サイズ/);
}));

test('local source, returned PNG and PNG round-trip may exceed upload size while API inputs still reject it', async () => withCanvas(async env => {
  const pixels = image(2240, 3168, () => [90, 100, 110, 255]);
  const scanlines = Buffer.alloc((pixels.width * 4 + 1) * pixels.height);
  for (let y = 0; y < pixels.height; y++) scanlines.set(pixels.data.subarray(y * pixels.width * 4, (y + 1) * pixels.width * 4), y * (pixels.width * 4 + 1) + 1);
  const chunk = (type, data) => {
    const result = Buffer.alloc(data.length + 12);
    result.writeUInt32BE(data.length); result.write(type, 4); result.set(data, 8);
    result.writeUInt32BE(crc32(result.subarray(4, -4)), result.length - 4);
    return result;
  };
  const header = Buffer.alloc(13);
  header.writeUInt32BE(pixels.width); header.writeUInt32BE(pixels.height, 4); header[8] = 8; header[9] = 6;
  const compressed = deflateSync(scanlines, { level: 0 });
  assert.deepEqual(inflateSync(compressed), scanlines);
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))]);
  const largeUrl = `data:image/png;base64,${png.toString('base64')}`;
  assert.ok(largeUrl.length > OPENAI_IMAGE_DATA_URL_MAX_CHARS);
  // Valid RGBA PNG bytes; the canvas double models their local decoded pixels.
  env.registry.set(largeUrl, pixels);
  env.onEncode = result => result.width === pixels.width && result.height === pixels.height ? largeUrl : undefined;
  const plan = createPanelStyleEditPlan(pixels, region, '2240x3168');
  const result = await composePanelStyleEdit(largeUrl, largeUrl, plan);
  assert.equal(result.outsidePixelsUnchanged, true);
  assert.equal(result.dataUrl, largeUrl, 'the oversized local PNG round-trip is retained');
  assert.deepEqual(env.registry.get(largeUrl).data, pixels.data);
  assert.throws(() => normalizeOpenAIImageDataUrl(largeUrl), /API.*上限/);
  assert.throws(() => buildPanelStyleEditRequest(largeUrl, plan, { mode: 'free', instruction: '小物だけ修正する。' }), /API.*上限/);
}));

test('local decoding still rejects unsafe MIME, malformed base64, failed decode and invalid dimensions', async () => withCanvas(async env => {
  const pixels = image(200, 240), source = env.add(pixels);
  const plan = createPanelStyleEditPlan(pixels, region, '1120x1584');
  for (const invalid of ['https://example.invalid/image.png', 'data:image/svg+xml;base64,PHN2Zz4=',
    'data:text/html;base64,PGgxPg==', 'data:image/png;base64,%%%=', 'data:image/png;base64,YQ=',
    'data:image/png;base64,', 'data:image/png;base64,YQ==AAAA', 'data:image/png;base64,YWJj']) {
    await assert.rejects(composePanelStyleEdit(source, invalid, plan));
  }
  await assert.rejects(composePanelStyleEdit(source, env.add(image(0, 100)), plan), /寸法|画像/);
  assert.deepEqual(env.registry.get(source), pixels);
}));
