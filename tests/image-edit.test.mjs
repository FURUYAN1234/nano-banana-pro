import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { buildImageEditRequest, IMAGE_EDIT_INSTRUCTION_MAX_CHARS } from '../src/lib/image-edit.js';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS } from '../src/lib/image-prompt-budget.js';
import { formatPageLayoutStatus } from '../src/lib/manga-page-layout.js';
import { beginApiWork } from '../src/lib/api-work-cancellation.js';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const source = 'data:image/png;base64,c291cmNl';

test('edit budget reserves the fixed instructions and rejects one character over the API limit', () => {
  const instruction = 'あ'.repeat(IMAGE_EDIT_INSTRUCTION_MAX_CHARS);
  assert.equal(buildImageEditRequest(source, instruction).prompt.length, OPENAI_IMAGE_PROMPT_MAX_CHARS);
  assert.throws(() => buildImageEditRequest(source, instruction + 'い'), /上限|長|文字/);
});

test('edit request carries the source image and latest instruction without old scenario locks', () => {
  const request = buildImageEditRequest(source, '  台詞を「また明日！」に変更  ');
  assert.deepEqual(request.imageInputs, [{ image_url: source }]);
  assert.deepEqual(request.referenceImages, [source]);
  assert.ok(request.prompt.endsWith('台詞を「また明日！」に変更'));
  assert.match(request.prompt, /user instruction takes priority/i);
  assert.throws(() => buildImageEditRequest('', '修正'), /画像データ/);
  assert.throws(() => buildImageEditRequest(source, ' '), /入力/);
  assert.throws(() => buildImageEditRequest(source, 'x'.repeat(40000)), /上限|長|文字/);
});

test('a requested face repair preserves the shot and acting while rebuilding connected head geometry', () => {
  const prompt = buildImageEditRequest(source, '2コマ目右の人物の顔崩れだけ修正。').prompt;
  assert.match(prompt, /LOCAL ANATOMY REPAIR/);
  assert.match(prompt, /cranium, face, ear, jaw and neck/);
  assert.match(prompt, /head turn, gaze, expression/);
  assert.match(prompt, /perspective, foreshortening/);
  assert.match(prompt, /focus\/blur and linework/);
  assert.match(prompt, /only when requested/);
  assert.ok(prompt.endsWith('2コマ目右の人物の顔崩れだけ修正。'));
  const transformation = buildImageEditRequest(source, '顔を意図的な異形へ変える').prompt;
  assert.match(transformation, /user instruction takes priority/);
  assert.ok(transformation.endsWith('顔を意図的な異形へ変える'));
});

function setup(overrides = {}) {
  let displayed = source;
  let history = [{ id: 1, img: source }];
  let busy = false;
  const calls = [];
  const normalizations = [];
  const context = {
    beginApiWork,
    generatedImage: source, generationHistory: history, isGeneratingImage: false,
    isSearching: false, isAssembling: false, isEnhancing: false, isFullAutoMode: false,
    isFixingPolicy: false, isAnalyzing: false, is360CameraWorking: false,
    imageEditRunRef: { current: null }, scenarioRunEpochRef: { current: 1 },
    isOpenAIEngine: true, openAIImageQuality: 'high', openAIImageSize: '1024x1536',
    formatPageLayoutStatus,
    buildImageEditRequest: (image, instruction) => {
      if (!image || !instruction.trim()) throw new Error('invalid input');
      return { prompt: instruction.trim(), imageInputs: [{ image_url: image }], referenceImages: [image] };
    },
    generateImageWithOpenAI: (...args) => new Promise((resolve, reject) => calls.push({ args, resolve, reject })),
    generateImageWithImagen: (...args) => new Promise((resolve, reject) => calls.push({ args, resolve, reject })),
    normalizePageCandidate: async candidate => {
      normalizations.push(candidate);
      return {
        ...candidate,
        base64Img: 'bm9ybWFsaXplZA==',
        mimeType: 'image/png',
        originalImage: `data:${candidate.mimeType};base64,${candidate.base64Img}`,
        pageLayout: { applied: true, mode: 'normalized', layout: { width: 848, height: 1200 } },
      };
    },
    setIsGeneratingImage: v => { busy = v; }, setIsGenerationError: () => {},
    setGeneratedImage: v => { displayed = v; }, setIsFallbackUsed: () => {},
    setImageQualityNeedsRepair: () => {}, setOpenAIImageVerificationWarning: () => {},
    setGenLog: () => {}, showStatus: () => {}, translateApiError: e => e.message,
    setGenerationHistory: update => { history = update(history); },
    addGenerationHistoryItem: (items, item) => [item, ...items].slice(0, 10),
    Date, setInterval: () => 1, clearInterval: () => {},
    ...overrides,
  };
  const start = workflow.indexOf('const editGeneratedImage =');
  assert.notEqual(start, -1, 'manual edit handler must exist');
  const end = workflow.indexOf('// --- Step 4: Image Generation ---', start);
  vm.runInNewContext(workflow.slice(start, end) + '\nglobalThis.edit = editGeneratedImage;', context);
  return { context, calls, normalizations, state: () => ({ displayed, history, busy }) };
}

test('manual edit sends the displayed image once and retains its history', async () => {
  const h = setup();
  const pending = h.context.edit('帽子の色を変更');
  assert.equal(h.state().busy, true);
  assert.equal(await h.context.edit('duplicate'), false);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].args[2].imageInputs[0].image_url, source);
  h.calls[0].resolve({ base64Img: 'ZWRpdA==', mimeType: 'image/png', usedModel: 'gpt-test' });
  assert.equal(await pending, true);
  assert.equal(h.normalizations.length, 1);
  assert.equal(h.normalizations[0].base64Img, 'ZWRpdA==');
  assert.equal(h.state().displayed, 'data:image/png;base64,bm9ybWFsaXplZA==');
  assert.equal(h.state().history[1].img, source);
  assert.equal(h.state().history[0].originalImage, 'data:image/png;base64,ZWRpdA==');
  assert.equal(h.state().history[0].pageLayout.applied, true);
  assert.equal(h.state().history[0].qualityPass, false);
  assert.equal(h.state().busy, false);
});

test('Gemini receives the same source image and failure keeps the image and history', async () => {
  const h = setup({ isOpenAIEngine: false });
  const pending = h.context.edit('表情を変える');
  assert.equal(h.calls[0].args[2][0], source);
  h.calls[0].reject(new Error('HTTP 429'));
  assert.equal(await pending, false);
  assert.equal(h.state().displayed, source);
  assert.equal(h.state().history.length, 1);
  assert.equal(h.state().busy, false);
});

test('stale edit cannot publish after scenario reset', async () => {
  const h = setup();
  const pending = h.context.edit('変更');
  h.context.scenarioRunEpochRef.current++;
  h.calls[0].resolve({ base64Img: 'ZWRpdA==', mimeType: 'image/png' });
  assert.equal(await pending, false);
  assert.equal(h.state().displayed, source);
  assert.equal(h.state().history.length, 1);
});

test('missing image, blank instruction and active generation never call a provider', async () => {
  for (const overrides of [{ generatedImage: '' }, { isGeneratingImage: true }, { isFullAutoMode: true }]) {
    const h = setup(overrides);
    assert.equal(await h.context.edit('修正'), false);
    assert.equal(h.calls.length, 0);
  }
  const h = setup();
  assert.equal(await h.context.edit('  '), false);
  assert.equal(h.calls.length, 0);
});
