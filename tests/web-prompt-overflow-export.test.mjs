import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createServer } from 'vite';
import * as references from '../src/lib/openai-image-references.js';
import { buildOpenAIImageRequest } from '../src/lib/openai.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from '../src/lib/web-prompt-chunks.js';
import { buildWebGenerationMetadata, serializeGeneratedImageMetadata } from '../src/lib/generated-image-metadata.js';
import { applyOpenAIImageEngineWatermark } from '../src/lib/openai-image-settings.js';

// Synthetic text and reference bytes, used only for local export regression tests.
const longPrompt = `Create ONE complete Japanese manga page with EXACTLY 7 framed panels.\n${'台詞「そのまま、残す。」\n'.repeat(2600)}`.slice(0, 33540);
const plan = references.buildOpenAIReferencePlan({ characterImages: ['data:image/png;base64,YQ=='] });
const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const appendForWeb = references.appendOpenAIWebReferencePrompt ?? references.appendOpenAIReferencePrompt;
const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
let getBuiltinPanelMediumReference;
try {
  ({ getBuiltinPanelMediumReference } = await server.ssrLoadModule('/src/lib/builtin-panel-medium-reference.js'));
} finally {
  await server.close();
}

function webPreparation(overrides = {}) {
  const expression = workflow.split('const prepareWebCopyPrompt = ')[1].split('let webCopyPartLengths')[0].trim().replace(/;$/, '');
  const scope = {
    ...references, appendOpenAIWebReferencePrompt: appendForWeb, applyOpenAIImageEngineWatermark, ensureWebPromptTrailingNewline,
    referenceEditorError: '', experimentalEnabled: true,
    resolvePageWorkflow: () => ({ kind: 'experimental-manga', count: 7 }),
    promptAssemblyRunRef: { experimentalPrepared: {} }, experimentalInput: () => ({}),
    inferImageQualityMode: () => 'four-panel', assertRenderOptions: () => {},
    mosaicCopyrightedCharacters: true, showTitle: true, showWatermarks: true, castList: '', collectCastNameEntries: () => [],
    getCurrentPromptProviderFamily: () => 'chatgpt', PROMPT_PROVIDER_FAMILIES: { CHATGPT: 'chatgpt' },
    openAIImageQuality: 'max', images: ['data:image/png;base64,YQ=='], referenceAssetsRef: { current: [] },
    bg360Image: null, bg360Enabled: false, colorMode: 'color', scenario: '', styleJson: null, punchlineType: 'Auto',
    getBuiltinPanelMediumReference, ...overrides,
  };
  scope.isExperimentalPage=()=>scope.experimentalEnabled;
  return new Function(...Object.keys(scope), `return (${expression});`)(...Object.values(scope));
}

test('over-limit seven-panel Web prompt retains the exact text and count for split, full copy and TXT', async () => {
  assert.equal(longPrompt.length, 33540);
  const prepare = webPreparation();
  const text = prepare(longPrompt);
  assert.equal(text, ensureWebPromptTrailingNewline(`${longPrompt}\n\n${plan.rolePrompt}`));
  const chunks = splitWebPromptForPaste(text);
  assert.ok(chunks.length > 1);
  assert.ok(chunks.every(chunk => chunk.length <= 9500));
  assert.equal(chunks.reduce((count, chunk) => count + chunk.length, 0), text.length);
  assert.equal(chunks.join(''), text);
  assert.equal(await new Blob([text], { type: 'text/plain;charset=utf-8' }).text(), text);
  assert.throws(() => references.appendOpenAIReferencePrompt(longPrompt, plan), /32,000/);
  assert.throws(() => buildOpenAIImageRequest(text), /32,000/);
});

test('over-limit Web export retains the active medium reference and every authored byte', () => {
  const scenario = '[1コマ目]\n[EMOTION: POP_ART]\n[Camera: 上から]\n状況: 箱を持つ。\nセリフなし';
  const mediumReference = getBuiltinPanelMediumReference({ scenario, colorMode: 'color', styleJson: null, punchlineType: 'Auto' });
  assert.ok(mediumReference);
  const guidePlan = references.buildOpenAIReferencePlan({ compact: true, characterImages: ['data:image/png;base64,YQ=='], mediumReference });
  const text = webPreparation({ scenario })(longPrompt);
  assert.equal(text, ensureWebPromptTrailingNewline(`${longPrompt}\n\n${guidePlan.rolePrompt}`));
  assert.equal(splitWebPromptForPaste(text).join(''), text);
  assert.throws(() => references.appendOpenAIReferencePrompt(longPrompt, guidePlan), /32,000/);
});

test('ordinary four-panel export preserves the former API preparation bytes for both media', () => {
  for (const colorMode of ['color', 'monochrome']) {
    for (const characterImages of [[], ['data:image/png;base64,YQ==']]) {
      const referencePlan = references.buildOpenAIReferencePlan({ colorMode, characterImages });
      const prompt = '四コマの台詞「このまま、使います。」\nCamera: high-angle\n';
      assert.equal(appendForWeb(prompt, referencePlan), references.appendOpenAIReferencePrompt(prompt, referencePlan));
    }
  }
  assert.throws(() => appendForWeb(null, plan), /文字列/);
});

test('Web export and API generation agree at exactly 32,000, but only export accepts one extra character', () => {
  const body = '文'.repeat(references.getOpenAIPromptBodyBudget(plan));
  const exact = appendForWeb(body, plan);
  assert.equal(exact.length, 32000);
  assert.equal(exact, references.appendOpenAIReferencePrompt(body, plan));
  const over = appendForWeb(body + '。', plan);
  assert.equal(over.length, 32001);
  assert.equal(over.slice(0, body.length + 1), body + '。');
  assert.throws(() => references.appendOpenAIReferencePrompt(body + '。', plan), /上限/);
});

test('over-limit metadata export retains safe full text and existing credential redaction', async () => {
  const text = webPreparation()(longPrompt);
  const metadata = await buildWebGenerationMetadata({ finalPrompt: text, provider: 'openai', scenario: '元の四コマ台本' });
  assert.equal(JSON.parse(serializeGeneratedImageMetadata(metadata)).prompt.final_sent_prompt, text);
  const privateText = `${text}Bearer syntheticCredential1234567890\nC:\\Users\\private-user\\private.png`;
  const safe = serializeGeneratedImageMetadata(await buildWebGenerationMetadata({ finalPrompt: privateText, provider: 'openai' }));
  assert.doesNotMatch(safe, /syntheticCredential1234567890|private-user/);
  assert.equal(metadata.privacy.api_key_included, false);
  assert.equal(metadata.privacy.raw_reference_images_included, false);
});

test('Web overflow recovery still rejects stale experimental plans, reference errors and invalid normal render options', () => {
  assert.throws(() => webPreparation({ referenceEditorError: '素材の認識を修正してください。' })(longPrompt), /素材の認識/);
  assert.throws(() => webPreparation({ resolvePageWorkflow: () => { throw new Error('元台本が変更されています。'); } })(longPrompt), /元台本/);
  assert.throws(() => webPreparation({ experimentalEnabled: false, assertRenderOptions: () => { throw new Error('表示設定の不一致'); } })('four panels'), /表示設定/);
});
