import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { buildRenderOptionsContract, readRenderOptions, assertRenderOptions, buildRenderOptionsQa } from '../src/lib/render-options.js';
import { PAGE_LAYOUT, scalePageLayout, buildPageDrawPlan, detectPageBands, normalizePageCandidate } from '../src/lib/manga-page-layout.js';

let server, build, native, qa, Step3;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ buildMangaPrompt: build } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  ({ buildImageQualityQaPrompt: qa } = await server.ssrLoadModule('/src/lib/image-quality-qa.js'));
  ({ default: Step3 } = await server.ssrLoadModule('/src/components/Step3Panel.jsx'));
});
after(async () => { await server?.close(); });

const scenario = count => `## タイトル: 星を見る約束\nLocation: 屋上\n${Array.from({ length: count }, (_, i) => `[${i + 1}コマ目]\n[Camera: ${i % 2 ? '床から強く見上げる' : '高所から俯瞰'}]\n[EMOTION: NORMAL]\n状況: 葵が凛に星を示し、凛が空を見る。\n葵「星を見る約束だね」`).join('\n')}`;
const options = { mosaicCopyrightedCharacters: false, showWatermarks: false, showTitle: false };

test('title defaults ON for legacy prompts; explicit OFF is round-tripped and stale selection fails closed', () => {
  assert.equal(readRenderOptions('').showTitle, true);
  assert.equal(readRenderOptions('[RENDER OPTIONS: copyrighted_mosaic=off; watermarks=off]').showTitle, true);
  const prompt = buildRenderOptionsContract(options);
  assert.equal(readRenderOptions(prompt).showTitle, false);
  assert.equal(assertRenderOptions(prompt, options), prompt);
  assert.throws(() => assertRenderOptions(prompt, { ...options, showTitle: true }), /STEP3/);
  assert.throws(() => assertRenderOptions(buildRenderOptionsContract({ ...options, showTitle: true }), options), /STEP3/);
  assert.throws(() => assertRenderOptions(prompt + '\n- Top title EXACTLY "unexpected"', options), /STEP3/);
  assert.match(buildRenderOptionsQa(prompt), /TITLE OFF CHECK/);
  assert.doesNotMatch(buildRenderOptionsQa(prompt), /Preserve the title|Inspect the title/);
});

for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
  test(`${providerFamily}/${colorMode}: title OFF removes rendering instructions and band but preserves story text`, () => {
    const args = { scenario: scenario(4), castList: '## 葵\n黒髪の成人女性\n## 凛\n茶髪の成人女性', providerFamily, colorMode, ...options };
    const off = build(args);
    assert.equal(readRenderOptions(off).showTitle, false);
    assert.match(off, /NO PAGE TITLE/);
    assert.match(off, /星を見る約束だね/);
    assert.match(off, /Title metadata \(not printed\): 星を見る約束/);
    assert.doesNotMatch(off, /Top title EXACTLY|Top page: draw large|Page title: render|TYPE: title EXTRA-BOLD|title6\.5%|panels\+gutters91\.3%|Preserve the title/);
    assert.match(off, /no clipping/);
    assert.equal((off.match(/^## Panel /gm) || []).length, 4);
    const on = build({ ...args, showTitle: true });
    assert.match(on, /Top title EXACTLY|Top page: draw large/);
    assert.match(on, /title6\.5%/);
    assert.equal(readRenderOptions(on).showTitle, true);
    assert.doesNotMatch(qa({ finalPrompt: off }), /TITLE BAND CHECK: the title must/);
    assert.match(qa({ finalPrompt: off }), /TITLE OFF CHECK/);
  });
}

for (const count of [5, 8]) test(`native ${count}-panel prompt and review share title OFF without changing panel rects`, () => {
  const input = { enabled: true, scenarioMode: 'experimental-manga', scenario: scenario(count), castList: '## 葵\n## 凛', colorMode: 'color', ...options };
  const source = native.readExperimentalSource(input);
  const plan = { count, layout: 'two_columns', reason: '会話の順序', panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: '葵が凛に星を示し、凛が空を見る。', dialogueIds: p.dialogueIds, breakout: null })) };
  const off = native.buildExperimentalImagePrompt(plan, source, input);
  assert.match(off, /NO PAGE TITLE/);
  assert.doesNotMatch(off, /Top title EXACTLY|上6\.5%は題字|中91\.3%/);
  assert.match(off, /星を見る約束だね/);
  assert.equal((off.match(/\[PAGE FRAME P\d+ \|/g) || []).length, count);
  const on = native.buildExperimentalImagePrompt(plan, source, { ...input, showTitle: true });
  assert.match(on, /Top title EXACTLY/);
  assert.deepEqual([...off.matchAll(/^rect=(.+); source beat/gm)].map(m => m[1]), [...on.matchAll(/^rect=(.+); source beat/gm)].map(m => m[1]));
  const review = native.buildExperimentalReviewPrompt(plan, source, input);
  assert.match(review, /Title required EXACTLY null/);
  assert.match(review, /TITLE OFF CHECK/);
});

test('title-free A4 draw plan redistributes the title band and retains a safe outer inset', () => {
  const on = scalePageLayout(1584);
  const off = scalePageLayout(1584, { showTitle: false });
  assert.equal(on.titleHeight, PAGE_LAYOUT.titleHeight);
  assert.equal(off.titleHeight, off.inset);
  assert.equal(off.panelHeight, on.panelHeight + on.titleHeight - off.inset);
  assert.equal(off.titleHeight + off.panelHeight + off.footerHeight, off.height);
  const bands = { canvas: { width: 1120, height: 1584 }, title: null, panels: { x: 20, y: 10, width: 1080, height: 1530 }, footer: { x: 20, y: 1550, width: 1000, height: 20 } };
  const plan = buildPageDrawPlan(bands, { showTitle: false });
  assert.equal(plan.length, 2);
  assert.equal(plan[0].destination.y, off.inset);
  assert.ok(plan[0].destination.x >= off.inset);
  assert.ok(plan[0].destination.y + plan[0].destination.height <= off.height - off.footerHeight);
});

test('empty title/footer regions are accepted only when their output options permit them', () => {
  const width = 100, height = 600, data = new Uint8ClampedArray(width * height * 4).fill(255);
  for (const y of [5, 150, 300, 450, 590]) for (let x = 5; x < 95; x++) data.set([0, 0, 0, 255], (y * width + x) * 4);
  assert.equal(detectPageBands({ data, width, height }), null);
  assert.equal(detectPageBands({ data, width, height }, { showTitle: false }), null, 'required credits cannot silently disappear');
  const bands = detectPageBands({ data, width, height }, options);
  assert.equal(bands.panelFrames.length, 4);
  assert.equal(bands.title, null);
  assert.equal(bands.footer, null);
});

test('normalization uses the image prompt options rather than a later UI selection', async () => {
  let seen;
  await normalizePageCandidate({ base64Img: 'raw', metadataContext: { finalPrompt: buildRenderOptionsContract(options) } },
    async (_image, actual) => { seen = actual; return { applied: false }; }, async () => ({ width: 100, height: 100 }));
  assert.equal(seen.showTitle, false);
  assert.equal(seen.showWatermarks, false);
});

test('native review accepts an explicitly empty page-text contract and rejects missing expectations', () => {
  const count = 5;
  const plan = { count, layout: 'two_columns', panels: Array.from({ length: count }, (_, i) => ({ sourcePanel: i + 1, camera: '高所から俯瞰', action: '葵が葉を見下ろす。', breakout: null })), expectedCast: Array.from({ length: count }, (_, i) => ({ panel: i + 1, names: ['葵'] })) };
  const report = { inspectionVersion: 3, status: 'pass', observedCount: count, readingOrder: 'pass', camera: 'pass', style: 'pass', story: 'pass', anatomy: 'pass', pageText: 'pass', breakout: 'not_requested', issues: [], pageEvidence: '題字とクレジット領域に印字はなく、外枠と余白が見える', expectedPageText: [], pageTextOptional: true,
    evidence: plan.panels.map((_, i) => ({ panel: i + 1, camera: '頭頂と肩の上面が見える', style: '顔の輪郭と陰影が明瞭', story: '人物の動作と道具が整合', anatomy: '両手と肩の接続が連続', physical_bodies: [{ id: 'body1', bounds: [0.1, 0.1, 0.5, 0.8], features: ['黒い短髪', '赤いコート'] }], cast_instances: [{ name: '葵', observed_count: 1, status: 'ok', instances: [{ body_id: 'body1', location: '中央', matched_features: ['黒い短髪', '赤いコート'] }] }] })) };
  assert.equal(native.validateExperimentalReview(structuredClone(report), plan).status, 'pass');
  for (const patch of [{ pageTextOptional: false }, { expectedPageText: null }]) {
    const rejected = native.validateExperimentalReview(structuredClone({ ...report, ...patch }), plan);
    assert.equal(rejected.status, 'unverified');
    assert.ok(rejected.validationErrors.some(s => s.includes('expectedPageText')));
  }
});

test('native title checkbox defaults checked, can be unchecked and locks while busy', () => {
  const render = props => renderToStaticMarkup(React.createElement(Step3, { currentStep: 3, ...props }));
  const checkbox = html => html.match(/<input[^>]+aria-label="タイトルを表示"[^>]*>/)?.[0];
  assert.match(checkbox(render({})), /checked=""/);
  assert.doesNotMatch(checkbox(render({ showTitle: false })), /checked=""/);
  assert.match(checkbox(render({ isColorModeLocked: true })), /disabled=""/);
});

test('title and watermark help use small text with compact spacing', () => {
  const html = renderToStaticMarkup(React.createElement(Step3, { currentStep: 3 }));
  for (const text of ['OFFで題字の領域をコマに使います。外枠と余白は残します。', '画像下部に生成情報とクレジットを表記します。']) {
    const paragraph = [...html.matchAll(/<p([^>]*)>([^<]+)<\/p>/g)].find(m => m[2] === text);
    assert.ok(paragraph, `Missing compact help: ${text}`);
    assert.match(paragraph[1], /font-size:11px/);
    assert.match(paragraph[1], /margin:0/);
  }
  assert.match(html, /display:flex;flex-direction:column;gap:8px/);
});

test('actual title handler invalidates STEP3 only, retains scenario/history and never calls an API', () => {
  const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const body = source.match(/const setShowTitle = \(enabled\) => \{([\s\S]*?)\n  \};/)?.[1];
  assert.ok(body);
  const calls = [];
  const context = { Boolean, isColorModeLocked: false, showTitle: true, showStatus() {} };
  for (const fn of new Set(body.match(/\b(?:set\w+|invalidateScenarioOutput)(?=\()/g))) context[fn] = v => calls.push([fn, v]);
  vm.runInNewContext(`(enabled => {${body}})(false)`, context);
  assert.ok(calls.some(([fn, v]) => fn === 'setShowTitleState' && v === false));
  assert.ok(calls.some(([fn]) => fn === 'invalidateScenarioOutput'));
  assert.doesNotMatch(body, /setScenario\(|setMangaTitle\(|setGenerationHistory\(|generateScenario\(|assemblePrompt\(|regenerateImage\(/);
  calls.length = 0; context.isColorModeLocked = true;
  vm.runInNewContext(`(enabled => {${body}})(false)`, context);
  assert.equal(calls.length, 0);
});
