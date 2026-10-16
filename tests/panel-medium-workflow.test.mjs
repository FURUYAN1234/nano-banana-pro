import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import { parse } from '@babel/parser';
import * as references from '../src/lib/openai-image-references.js';
import { applyOpenAIImageEngineWatermark, resolveOpenAIImageOption } from '../src/lib/openai-image-settings.js';
import { ensureWebPromptTrailingNewline } from '../src/lib/web-prompt-chunks.js';
import { selectPanelMediumStyles } from '../src/lib/panel-medium-reference.js';

const workflow = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
const step4 = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const nodes = source => {
  const found = [];
  function visit(value) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value)) { value.forEach(visit); return; }
    if (value.type) found.push(value);
    for (const [key, child] of Object.entries(value)) if (!['loc', 'comments', 'tokens'].includes(key)) visit(child);
  }
  visit(parse(source, { sourceType: 'module', plugins: ['jsx'] }));
  return found;
};
const workflowNodes = nodes(workflow);
const calls = name => workflowNodes.filter(node => node.type === 'CallExpression' && node.callee.name === name);
const evaluate = (source, node, context) => vm.runInNewContext(`(${source.slice(node.start, node.end)})`, context);
// Node cannot import Vite's ?inline PNG. Execute the actual exported function
// with its actual asset bytes, applying only that import's data-URL conversion.
const builtin = {};
const builtinUrl = new URL('../src/lib/builtin-panel-medium-reference.js', import.meta.url);
if (existsSync(builtinUrl)) {
  const source = readFileSync(builtinUrl, 'utf8');
  const syntax = nodes(source);
  const asset = syntax.find(node => node.type === 'ImportDeclaration' && node.source.value.endsWith('.png?inline'));
  assert.ok(asset, 'builtin uses an inline local PNG');
  const bytes = readFileSync(new URL(asset.source.value.replace(/\?inline$/, ''), builtinUrl));
  const declaration = syntax.find(node => node.type === 'FunctionDeclaration' && node.id.name === 'getBuiltinPanelMediumReference');
  assert.ok(declaration);
  builtin.getBuiltinPanelMediumReference = evaluate(source, declaration, {
    selectPanelMediumStyles, [asset.specifiers[0].local.name]: `data:image/png;base64,${bytes.toString('base64')}`,
  });
}
const callback = (name, context) => {
  const declaration = workflowNodes.find(node => node.type === 'VariableDeclarator' && node.id.name === name);
  assert.ok(declaration, `production callback ${name} exists`);
  return evaluate(workflow, declaration.init, context);
};
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;
const scenario = styles => styles.map((style, i) => `[${i + 1}コマ目]\n[EMOTION: ${style}]\n[Camera: 上から]\n状況: 手紙を渡す。\nセリフなし`).join('\n');
const normal = scenario(['NORMAL', 'SKETCH', 'CHIBI_GAG', 'NORMAL']);
const mixed = scenario(['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG']);
function setup(overrides = {}) {
  const plans = [];
  const images = [image('first character'), image('second character')];
  const context = {
    ...references, applyOpenAIImageEngineWatermark, resolveOpenAIImageOption, ensureWebPromptTrailingNewline,
    getBuiltinPanelMediumReference: options => {
      assert.equal(typeof builtin.getBuiltinPanelMediumReference, 'function');
      return builtin.getBuiltinPanelMediumReference(options);
    },
    buildOpenAIReferencePlan: options => {
      const plan = references.buildOpenAIReferencePlan(options); plans.push(plan); return plan;
    },
    scenario: mixed, sourceScenario: mixed, currentScenario: mixed, generationScenario: mixed,
    colorMode: 'color', styleJson: null, punchlineType: 'Auto', activePunchlineType: 'Auto',
    resolvedPunchlineTypeRef: { current: 'Auto' }, isOpenAIEngine: true,
    images, imagesRef: { current: images }, referenceAssets: [], referenceAssetsRef: { current: [] },
    bg360Image: null, bg360Enabled: false, originalCandidate: null, repairSource: null,
    openAIImageQuality: 'sunburst-max', openAIImageSize: '2240x3168',
    referenceEditorError: '', experimentalEnabled: false, inferImageQualityMode: () => 'single-image',
    getCurrentPromptProviderFamily: () => 'chatgpt', PROMPT_PROVIDER_FAMILIES: { CHATGPT: 'chatgpt' },
    progressPhase: '', statCallback: () => {}, ...overrides,
  };
  return { context, plans };
}
const guideInputs = plan => plan.imageInputs.filter((_, i) => plan.referenceRoles?.[i] === 'style_reference');

test('the four real planner expressions use the same builtin guide with complete attachment budget', () => {
  const planners = calls('buildOpenAIReferencePlan');
  assert.equal(planners.length, 4, 'native budget, ordinary budget, Web copy, API');
  const h = setup();
  const plans = planners.map(node => evaluate(workflow, node, h.context));
  assert.ok(plans.every(plan => guideInputs(plan).length === 1));
  assert.ok(plans.every(plan => guideInputs(plan)[0].image_url === guideInputs(plans[0])[0].image_url));
  assert.ok(plans.every(plan => plan.rolePrompt === plans[0].rolePrompt));
  const budgets = calls('getOpenAIPromptBodyBudget').map(node => evaluate(workflow, node, h.context));
  assert.equal(budgets.length, 2);
  assert.deepEqual(budgets, Array(2).fill(references.getOpenAIPromptBodyBudget(plans[0])));
  assert.equal(budgets[0] + plans[0].rolePrompt.length + 2, 32000);
});

test('each production planner uses its current scenario instead of a stale display scenario', () => {
  const planners = calls('buildOpenAIReferencePlan');
  const scenarioNames = ['sourceScenario', 'currentScenario', 'scenario', 'generationScenario'];
  for (const [index, name] of scenarioNames.entries()) {
    const h = setup({ scenario: normal, sourceScenario: normal, currentScenario: normal, generationScenario: normal, [name]: mixed });
    const plan = evaluate(workflow, planners[index], h.context);
    assert.equal(guideInputs(plan).length, 1, `${name} determines the current generation's media`);
  }
});

test('all four actual call sites exclude mono, custom style, source-style lock and ordinary media', () => {
  for (const overrides of [{ colorMode: 'monochrome' }, { styleJson: { style_name: '利用者指定', reproduction_prompt: '指定描法' } },
    { punchlineType: 'SeriousDocumentary', activePunchlineType: 'SeriousDocumentary', resolvedPunchlineTypeRef: { current: 'SeriousDocumentary' } },
    { scenario: normal, sourceScenario: normal, currentScenario: normal, generationScenario: normal }]) {
    const h = setup(overrides);
    for (const node of calls('buildOpenAIReferencePlan')) {
      const plan = evaluate(workflow, node, h.context);
      assert.equal(guideInputs(plan).length, 0);
      assert.equal(plan.imageInputs.length, 2);
      assert.doesNotMatch(plan.rolePrompt, /STYLE ONLY/);
    }
  }
});

test('actual Web callback and API callback send the same scoped guide without mutating authored prompt', async () => {
  const h = setup();
  const prompt = 'Camera: 背後から望遠\nAction: 手紙を差し出す\nDialogue: 「受け取って。」';
  const copied = callback('prepareWebCopyPrompt', h.context)(prompt);
  const stoppedAtTransport = new Error('TEST_TRANSPORT_CAPTURE_NO_IMAGE_GENERATED');
  const sent = [];
  h.context.generateImageWithOpenAI = async (...args) => { sent.push(args); throw stoppedAtTransport; };
  await assert.rejects(callback('generateImageCandidate', h.context)(prompt), error => error === stoppedAtTransport);
  assert.equal(sent.length, 1);
  assert.equal(sent[0][0] + '\n', copied);
  assert.equal(sent[0][0].slice(0, prompt.length), prompt);
  assert.deepEqual(sent[0][2].imageInputs, h.plans[0].imageInputs);
  assert.equal(guideInputs(h.plans[0]).length, 1);
  assert.match(copied, /STYLE ONLY.*TOP LEFT=POP_ART; MIDDLE RIGHT=WATERCOLOR; MIDDLE LEFT=GEKIGA.*明示された画風のコマだけに適用し、未選択セルは無視/);
});

test('actual API callback rejects capacity overflow before transport and retains guide with 14 refs plus repair source', async () => {
  const sheets = Array.from({ length: 14 }, (_, i) => image(`sheet ${i}`));
  const source = { mimeType: 'image/png', base64Img: Buffer.from('source page').toString('base64') };
  const stoppedAtTransport = new Error('TEST_TRANSPORT_CAPTURE_NO_IMAGE_GENERATED');
  for (const extra of [false, true]) {
    let sent = null;
    const h = setup({ images: [...sheets, ...(extra ? [image('extra')] : [])],
      generateImageWithOpenAI: async (...args) => { sent = args; throw stoppedAtTransport; } });
    const pending = callback('generateImageCandidate', h.context)('Camera: overhead', { repair: true, repairSource: source });
    if (extra) { await assert.rejects(pending, /16枚/); assert.equal(sent, null); }
    else { await assert.rejects(pending, error => error === stoppedAtTransport); assert.equal(sent[2].imageInputs.length, 16);
      assert.equal(h.plans[0].referenceRoles.at(-1), 'style_reference'); assert.equal(h.plans[0].referenceRoles[0], 'repair_source'); }
  }
});

test('actual initial-image callback finishes monochrome manga before layout while color and single-image outputs bypass it', async () => {
  for (const [colorMode,qualityMode,expected] of [['color','four-panel',0],['monochrome','four-panel',1],['monochrome','experimental-manga',1],['monochrome','single-image',0]]) {
    let finishes=0;
    const h=setup({colorMode,qualityMode,workflowSource:{},metadataSettings:{},referenceContext:{},
      generateImageWithOpenAI:async()=>({base64Img:'YWJj',mimeType:'image/png'}),
      finalizeMonochromeCandidate:async(candidate,mode)=>{assert.equal(mode,'monochrome');finishes++;return {...candidate,base64Img:'ZGVm'};},
      normalizePageCandidate:async candidate=>candidate,formatPageLayoutStatus:()=>'',
    });
    const candidate=await callback('generateImageCandidate',h.context)('image prompt');
    assert.equal(finishes,expected,JSON.stringify({colorMode,qualityMode}));
    assert.equal(candidate.base64Img,expected?'ZGVm':'YWJj');
  }
});

test('App passes the selected guide to Web export without displaying an unsolicited portrait preview', () => {
  const appNodes = nodes(app);
  const panel = appNodes.find(node => node.type === 'JSXOpeningElement' && node.name.name === 'Step4Panel');
  const prop = panel.attributes.find(node => node.name?.name === 'mediumReference');
  assert.ok(prop?.value?.expression, 'Step4 receives the authoritative selected guide');
  const h = setup({ isOpenAIImageMode: true, enableChatGPTMode: true });
  const selected = evaluate(app, prop.value.expression, h.context);
  assert.ok(selected?.imageUrl);
  const elements = nodes(step4).filter(node => node.type === 'JSXOpeningElement');
  const anchor = elements.find(node => node.name.name === 'a' && node.attributes.some(attr => attr.name?.name === 'download' && attr.value?.value === 'nano-panel-media.png'));
  const preview = elements.find(node => node.name.name === 'img' && node.attributes.some(attr => attr.name?.name === 'alt' && attr.value?.value === 'コマの描法見本'));
  assert.ok(anchor, 'existing export area provides the exact guide file');
  assert.equal(preview, undefined, 'Web instructions must not insert the bundled portrait image into STEP4');
  for (const [element, attribute] of [[anchor, 'href']]) {
    const expression = element.attributes.find(attr => attr.name?.name === attribute)?.value?.expression;
    assert.ok(expression);
    assert.equal(evaluate(step4, expression, { mediumReference: selected }), selected.imageUrl);
  }
  for (const overrides of [{ colorMode: 'monochrome' }, { styleJson: { style_name: '固定' } }, { scenario: normal }]) {
    assert.equal(evaluate(app, prop.value.expression, setup({ isOpenAIImageMode: true, enableChatGPTMode: true, ...overrides }).context), null);
  }
  const syntax = nodes(step4);
  const provider = syntax.find(node => node.type === 'VariableDeclarator' && node.id.name === 'isChatGPTWebGuide');
  const exportGuard = syntax.find(node => node.type === 'LogicalExpression' && node.operator === '&&'
    && node.right.start <= anchor.start && node.right.end >= anchor.end
    && step4.slice(node.left.start, node.left.end).includes('isChatGPTWebGuide'));
  assert.ok(exportGuard, 'guide download is inside the existing ChatGPT export guard');
  for (const [isOpenAIImageMode, enableChatGPTMode, expected] of [[false, false, false], [false, true, true], [true, false, true]]) {
    const isChatGPTWebGuide = evaluate(step4, provider.init, { isOpenAIImageMode, enableChatGPTMode });
    assert.equal(Boolean(evaluate(step4, exportGuard.left, { isChatGPTWebGuide, finalPrompt: 'ready' })), expected);
    assert.equal(Boolean(evaluate(step4, exportGuard.left, { isChatGPTWebGuide, finalPrompt: '' })), false);
  }
});
