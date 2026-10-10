import React from 'react';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildSingleImageEmotionalPrompt;
let buildMangaPrompt;
let Step4Panel;
let buildImageQualityQaPrompt;
let buildImageQualityRepairPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildSingleImageEmotionalPrompt } = await server.ssrLoadModule('/src/lib/single-image-prompt.js'));
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ buildImageQualityQaPrompt } = await server.ssrLoadModule('/src/lib/image-quality-qa.js'));
  ({ buildImageQualityRepairPrompt } = await server.ssrLoadModule('/src/lib/image-quality-failsafe.js'));
});

after(async () => {
  await server?.close();
});

test('cheek treatment follows narrative cues and medium without banning expressive blush or triggering cosmetic repairs', () => {
  const scenario = ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'].map((style, i) =>
    `[${i + 1}コマ目]\n[EMOTION: ${style}]\nAction: 葵が照れて頬を赤らめ、凛は落ち着いて資料を見る。\n葵「ありがとう。」`).join('\n');
  const prompts = ['chatgpt', 'gemini'].map(providerFamily =>
    buildMangaPrompt({ scenario, castList: '## 葵\n- adult, short hair\n## 凛\n- adult, long hair', colorMode: 'color', providerFamily, punchlineType: 'Auto' }));
  for (const prompt of prompts) {
    assert.match(prompt, /CHEEK RENDERING:.*story\/reference.*panel medium/);
    assert.match(prompt, /watercolor=skin-integrated wash/);
    assert.match(prompt, /no default blush stamps\/stripes across cast/);
    assert.match(prompt, /Preserve expressive blush, makeup and ink\/shadow planes/);
    assert.match(prompt, /never copy incidental reference-sheet blush as a permanent facial trait/);
    assert.doesNotMatch(prompt, /never blush|no blush allowed/i);
    const repair = buildImageQualityRepairPrompt({ originalPrompt: prompt, issues: [], sourceMode: 'source-image' });
    assert.ok(repair.includes('CHEEK RENDERING:'));
  }
  const qa = buildImageQualityQaPrompt({ finalPrompt: prompts[1] });
  assert.match(qa, /Cosmetic cheek-style differences alone.*unverified.*not.*paid repair/);
});

test('single-image copy retains the accepted compact text below the safe paste budget', () => {
  const prompt = buildSingleImageEmotionalPrompt();
  assert.ok(prompt.length <= 9500, `expected no more than 9,500 chars for Web copy, got ${prompt.length}`);
  assert.equal(prompt.length, 8911);
  // Pin the accepted copy plus the scoped focal-depth repair; no unrelated four-panel additions.
  assert.equal(createHash('sha256').update(prompt).digest('hex'),
    'c9d3b117f0169252f69e576a8cb5f8273a757056ed3069e2222ed36d37fe7b1e');
  assert.doesNotMatch(prompt, /SHARED IMAGE QUALITY CONTRACT|four panels|panel contrast|CINEMATIC_TECHNIQUES/i);
});

test('compact append prompt preserves content priority, rendering and geometry safeguards', () => {
  const prompt = buildSingleImageEmotionalPrompt();
  for (const requirement of [
    /user's preceding prompt and supplied references/,
    /Explicit user choices take priority/,
    /Improve unspecified details without replacing the user's idea/,
    /brows, eyelids, mouth, cheeks, gaze, posture, gesture and weight/,
    /Preserve requested actions.*pointing, reaching, impact, recoil, leaps and strong foreshortening/,
    /Preserve explicit camera position, side, height, tilt, lens, crop and head turns/,
    /one primary subject or action and at most one supporting focal cue/,
    /Use at most one optional framing.*existing physical scene cue/,
    /Otherwise retain the baseline view/,
    /G-pen-like line hierarchy.*pressure-tapered thick-to-hairline/,
    /Avoid uniform heavy outlines or black-clogged features/,
    /lighten\/desaturate the background or deepen values/,
    /Preserve form shadows and eye\/hair glints/,
    /watercolor blush integrates with skin/,
    /Avoid automatic identical cheek stamps or stripes/,
    /do not treat incidental reference blush as a permanent trait/,
    /Preserve requested makeup, expressive blush and deliberate ink\/shadow planes/,
    /Hands and feet belong to the correct person/,
    /anatomical left\/right follows that person's body, not the viewer/,
    /Naturally hidden or cropped limbs need not be exposed/,
    /Project skull, face edge, ears, jaw, neck and eyewear as one head volume/,
    /Explicit outfits override the setting's era, culture or genre/,
    /Infer clothing from the setting only where unspecified/,
    /No penetration, fusion or tangent edges/,
    /Preserve intended surreal gags and transformations/,
    /Reading\/operating targets the user of the object; showing\/submitting targets the recipient/,
    /monitor rear shows casing and stand, never screen content through it/,
    /never project its front or the person's hands through their back/,
    /Do not rotate objects toward the camera just for legibility/,
    /actual reader.*not automatically behind a different holder/,
    /including each glyph's top direction.*rotate and project the entire printed texture/,
    /Never bridge different faces or mistake a page-block edge for a cover/,
    /preserving its wording/,
    /default to vertical Japanese; honor an explicit alternative/,
    /Do not add bubbles otherwise/,
    /text may appear rotated or upside down/,
    /no unintended grain, speckles, dithering, moire/,
    /Do not print these checks or directions in the artwork/
  ]) assert.match(prompt, requirement);
  assert.doesNotMatch(prompt, /never blush|no blush allowed|vertical Japanese only/i);
  const repair = buildImageQualityRepairPrompt({ originalPrompt: prompt, issues: [], sourceMode: 'source-image' });
  assert.ok(repair.includes(prompt), 'repair route must retain the full approved single-image prompt');
});

test('the actual single-image button handler copies the complete accepted text', async (t) => {
  t.mock.method(React, 'useState', initial => [initial, () => {}]);
  const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  const copied = [];
  const states = [];
  t.mock.timers.enable({ apis: ['setTimeout'] });
  Object.defineProperty(globalThis, 'navigator', { configurable: true,
    value: { clipboard: { writeText: async text => { copied.push(text); } } } });
  t.after(() => {
    if (originalNavigator) Object.defineProperty(globalThis, 'navigator', originalNavigator);
    else delete globalThis.navigator;
  });
  const tree = Step4Panel({ selectedEngine: 'openai', enableOpenAIApi: true,
    currentStep: 4, finalPrompt: 'UI fixture', genLog: [], webCopyPartLengths: [], setIsPolicyCopied: value => states.push(value) });
  function findCopyButton(node) {
    if (!node || typeof node !== 'object') return undefined;
    if (node.type === 'button' && node.props.title?.includes('1枚絵')) return node;
    const children = [node.props?.children].flat(Infinity);
    return children.map(findCopyButton).find(Boolean);
  }
  const button = findCopyButton(tree);
  assert.ok(button, 'OpenAI mode exposes the single-image copy action');
  await button.props.onClick();
  assert.deepEqual(copied, [buildSingleImageEmotionalPrompt()]);
  assert.deepEqual(states, [true]);
  t.mock.timers.tick(2000);
  assert.deepEqual(states, [true, false]);
  const geminiTree = Step4Panel({ selectedEngine: 'gemini', enableOpenAIApi: false, currentStep: 4, finalPrompt: 'UI fixture', genLog: [], webCopyPartLengths: [] });
  assert.equal(findCopyButton(geminiTree), undefined, 'single-image ChatGPT action stays scoped to OpenAI');
});

test('quality upgrades require route-specific evidence without an unwanted single-image API run', () => {
  const standards = readFileSync(new URL('../docs/project_standards.md', import.meta.url), 'utf8');

  assert.match(standards, /four-panel API image generation/i);
  assert.match(standards, /single-image Web paste route, inspect the exact text produced by the copy button/i);
  assert.match(standards, /API image generation is not required for this route/i);
  assert.match(standards, /品質改善を完了と報告する前/);
});

test('four-panel and single-image outputs retain common quality requirements with scoped panel-medium strokes', () => {
  const scenario = `
[1コマ目: 起]
状況: Hero が駅のロビーで地図を開く。
Hero「着いたよ。」
[2コマ目: 承]
状況: Hero が案内板を指さす。
Hero「この出口だね。」
[3コマ目: 転]
状況: Hero が改札前で切符を確認する。
Hero「間に合った。」
[4コマ目: 結]
状況: Hero がホームへ歩き出す。
Hero「行こう。」`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: '## Hero\n- black hair, green eyes',
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.2.1-test'
    });
    assert.match(prompt, /SHARED IMAGE QUALITY CONTRACT/);
    assert.match(prompt, /FUNCTIONAL SURFACE ORIENTATION LOCK/);
    assert.match(prompt, /(?:move the camera, never rotate the object toward the viewer|If unspecified, move camera, never object)/i);
    assert.match(prompt, /documents, forms, printed pages, cards, books, maps/i);
    assert.match(prompt, /(?:direction-dependent information, control, optical, or service face|directional faces)/i);
    assert.match(prompt, /(?:explicitly says.*present.*camera or viewer|Present to camera\/viewer only if scripted)/i);
    assert.match(prompt, /BODY ACTING BASELINE|BODY ACTING \/ GESTURE VARIETY LOCK/);
    assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
    assert.match(prompt, /BODY ACTING BASELINE:.*allow.*pointing.*reaching.*impact|BODY ACTING \/ GESTURE VARIETY LOCK:.*Full-body exaggeration.*preserve explicitly scripted pointing\/surface impact.*exact hand pose\/contact/i);
    assert.match(prompt, /one primary focal subject/i);
    if (providerFamily === 'chatgpt') {
      assert.match(prompt, /NORMAL\/unmarked[^\n]*pressure[^\n]*thick-to-hairline[^\n]*(?:contour|silhouette|outline|accents)/i);
      assert.match(prompt, /Focal strokes follow panel medium/);
      assert.match(prompt, /Legible faces in that medium/);
      assert.doesNotMatch(prompt, /Focal G-pen:/);
    } else {
      assert.match(prompt, /strongest G-pen-like contour|Focal G-pen: strongest pressure-tapered/i);
    }
    assert.match(prompt, /back of the head.*do not invent eyes, nose, or mouth|rear head.*no invented face/i);
  }

  const step4Panel = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  assert.match(step4Panel, /import \{ buildSingleImageEmotionalPrompt \}/);
  assert.match(step4Panel, /copyTextToClipboard\(buildSingleImageEmotionalPrompt\(\)\)/);
});
