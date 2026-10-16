import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { transformSync } from 'esbuild';
import vm from 'node:vm';
import { parse as parseCss } from 'postcss';
import { buildImageEditRequest, getImageEditInstructionMaxChars } from '../src/lib/image-edit.js';
import { OPENAI_IMAGE_PROMPT_MAX_CHARS } from '../src/lib/image-prompt-budget.js';

let server, ImageEditForm, ImageEditSection, Step4Panel, GenerationHistory;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: ImageEditForm, ImageEditSection } = await server.ssrLoadModule('/src/components/ImageEditForm.jsx'));
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
  ({ default: GenerationHistory } = await server.ssrLoadModule('/src/components/GenerationHistory.jsx'));
});
after(async () => { await server?.close(); });
const render = props => renderToStaticMarkup(React.createElement(ImageEditForm, { providerLabel: 'Gemini', onSubmit() {}, ...props }));

test('correction form is absent until an image exists', () => {
  assert.equal(render({ image: '' }), '');
  assert.equal(render({ image: null }), '');
});
test('after generation the input is available, with empty submissions disabled', () => {
  const html = render({ image: 'data:image/png;base64,YQ==' });
  assert.match(html, /ページ全体への指示/);
  assert.match(html, /他のコマも変わる場合があります/);
  assert.doesNotMatch(html.match(/<textarea[^>]*>/)[0], / disabled=""/);
  assert.match(html.match(/<textarea[^>]*>/)[0], /maxLength="\d+"/i);
  assert.match(html.match(/<textarea[^>]*>/)[0], /rows="6"/);
  assert.match(html.match(/<button[^>]*>/)[0], / disabled=""/);
  assert.match(html, /htmlFor|for="image-edit-instruction"/);
});
test('during processing both the input and send button are disabled', () => {
  const html = render({ image: 'data:image/png;base64,YQ==', busy: true });
  assert.match(html.match(/<textarea[^>]*>/)[0], / disabled=""/);
  assert.match(html.match(/<button[^>]*>/)[0], / disabled=""/);
});
test('whole-page input reserves the actual monochrome instruction size before enabling submission', () => {
  const source='data:image/png;base64,YQ==';
  const limit=mode=>Number(render({image:source,colorMode:mode}).match(/maxlength="(\d+)"/i)[1]);
  const color=limit('color'),mono=limit('monochrome');
  assert.ok(mono<color);
  for(const [colorMode,max] of [['color',color],['monochrome',mono]]) {
    assert.equal(buildImageEditRequest(source,'あ'.repeat(max),{colorMode}).prompt.length,OPENAI_IMAGE_PROMPT_MAX_CHARS);
    assert.throws(()=>buildImageEditRequest(source,'あ'.repeat(max+1),{colorMode}),/上限|長|文字/);
  }
});

test('editable fields share a readable white palette while readonly output is excluded', () => {
  const css = parseCss(readFileSync(new URL('../src/index.css', import.meta.url), 'utf8'));
  const ruleFor = selector => {
    const matches = [];
    css.walkRules(rule => { if (rule.selectors.includes(selector)) matches.push(rule); });
    assert.ok(matches.length, `missing shared rule: ${selector}`);
    return matches;
  };
  const palette = ruleFor('textarea:not([readonly])')[0];
  assert.ok(palette.selectors.includes('textarea:not([readonly])'));
  assert.ok(palette.selectors.includes('.image-edit-section select'));
  for (const [property, value] of Object.entries({ background: '#fff', color: '#111', 'caret-color': '#111', border: '1px solid #94a3b8' })) {
    const declaration = palette.nodes.find(node => node.prop === property);
    assert.equal(declaration?.value, value);
    assert.equal(declaration.important, true, `${property} must override existing STEP2 inline colors`);
  }
  assert.equal(ruleFor('textarea:not([readonly])::placeholder')[0].nodes.find(node => node.prop === 'color').value, '#64748b');
  const disabledField = ruleFor('textarea:not([readonly]):disabled')[0];
  assert.ok(disabledField.selectors.includes('.image-edit-section select:disabled'));
  assert.equal(disabledField.nodes.find(node => node.prop === 'opacity').value, '1');
  for (const selector of ['.image-edit-section .image-edit-action', '.image-edit-section .image-edit-action:disabled']) {
    const declarations = Object.fromEntries(ruleFor(selector)[0].nodes.map(node => [node.prop, node.value]));
    assert.ok(declarations.background && declarations.color && (declarations.border || declarations['border-color']));
  }
});

test('text fields have square edges while buttons and selects use moderate corners without reducing label space', () => {
  const css = parseCss(readFileSync(new URL('../src/index.css', import.meta.url), 'utf8'));
  const palette = css.nodes.find(node => node.type === 'rule' && node.selectors.includes('textarea:not([readonly])'));
  const inputs = palette.selectors.find(selector => selector.startsWith('input'));
  assert.ok(inputs, 'single-line free inputs must use the same palette as textarea');
  assert.match(inputs, /:not\(\[readonly\]\)/);
  assert.match(inputs, /:not\(\[type\]\)/, 'default text inputs include STEP1 material names and background attributes');
  for (const type of ['text', 'password', 'search', 'url', 'email', 'tel', 'number']) assert.ok(inputs.includes(`[type="${type}"]`), type);
  for (const type of ['checkbox', 'radio', 'file', 'range', 'date', 'hidden']) assert.equal(inputs.includes(`[type="${type}"]`), false, type);
  const actionRule = css.nodes.find(node => node.type === 'rule' && node.selectors.includes('select'));
  assert.ok(actionRule);
  assert.deepEqual(actionRule.selectors, ['select', 'button']);
  assert.equal(actionRule.nodes.find(node => node.prop === 'border-radius')?.value, '8px');
  assert.equal(actionRule.nodes.find(node => node.prop === 'border-radius')?.important, true, 'overrides inconsistent old inline radii');
  assert.deepEqual(actionRule.nodes.map(node => node.prop), ['border-radius'], 'shape rule must not shrink padding, line-height or label space');
  const textRule = css.nodes.find(node => node.type === 'rule' && node.selectors.includes('textarea'));
  assert.equal(textRule.nodes.find(node => node.prop === 'border-radius')?.value, '0');
  assert.equal(textRule.nodes.find(node => node.prop === 'border-radius')?.important, true);
  const textInputs = textRule.selectors.find(selector => selector.startsWith('input'));
  assert.equal(textInputs.includes('[readonly]'), false, 'readonly text fields also use square edges');
  for (const type of ['checkbox', 'radio', 'file', 'range', 'date', 'hidden']) assert.equal(textInputs.includes(`[type="${type}"]`), false, type);
  assert.deepEqual(textRule.nodes.map(node => node.prop), ['border-radius']);
});

function mountEditComponent(name, props) {
  const slots = [];
  let cursor = 0, tree;
  const react = {
    createElement(type, attrs, ...children) { return { type, props: { ...attrs, children } }; },
    cloneElement(element, attrs) { return { ...element, props: { ...element.props, ...attrs } }; },
    useState(initial) { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = value; }]; },
    useRef(initial) { const i = cursor++; return slots[i] ??= { current: initial }; },
  };
  const source = readFileSync(new URL('../src/components/ImageEditForm.jsx', import.meta.url), 'utf8');
  const context = { module: { exports: {} }, require: path => {
    if (path === 'react') return react;
    if (path === 'lucide-react') return { ChevronDown() {} };
    assert.equal(path, '../lib/image-edit.js');
    return { getImageEditInstructionMaxChars };
  } };
  vm.runInNewContext(transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'transform' }).code, context);
  const walk = node => !node || typeof node !== 'object' ? [] : Array.isArray(node) ? node.flatMap(walk) : [node, ...walk(node.props?.children)];
  const render = updates => { props = { ...props, ...updates }; cursor = 0; tree = context.module.exports[name](props); return tree; };
  render();
  return { render, nodes: () => walk(tree), find: type => walk(tree).find(node => node.type === type) };
}

test('one styled folded edit section selects panel or whole image and keeps the whole-image draft mounted', () => {
  const panel = React.createElement('div', { id: 'panel-fixture' });
  const whole = React.createElement(ImageEditForm, { image: 'image', draft: '保全する指示', providerLabel: 'OpenAI', onSubmit() {} });
  const h = mountEditComponent('ImageEditSection', { image: 'image', panelEditor: panel, children: whole });
  const panelNode = () => h.nodes().find(node => node.props?.id === 'panel-fixture');
  const sectionContent = () => h.nodes().find(node => node.props?.id === 'image-edit-section-content');
  assert.equal(h.find('button').props['aria-expanded'], false);
  assert.equal(sectionContent().props.hidden, true);
  assert.equal(panelNode().props.enabled, false, 'closed initial section must not prepare panels');
  h.find('button').props.onClick(); h.render();
  assert.equal(h.find('button').props['aria-expanded'], true);
  assert.equal(sectionContent().props.hidden, false);
  assert.equal(panelNode().props.enabled, true);
  h.find('button').props.onClick(); h.render();
  assert.equal(sectionContent().props.hidden, true);
  assert.equal(h.find('select').props['aria-label'], '修正対象');
  assert.equal(h.find('select').props.value, 'panel');
  assert.ok(panelNode());
  const wholeContainer = () => h.nodes().find(node => node.props?.['data-edit-target'] === 'whole');
  assert.equal(wholeContainer().props.hidden, true);
  assert.ok(h.nodes().includes(whole), 'the whole form stays mounted to preserve its local or controlled draft');
  h.find('select').props.onChange({ target: { value: 'whole' } }); h.render();
  assert.equal(panelNode(), undefined, 'panel controls unmount so their candidate cleanup runs');
  assert.equal(wholeContainer().props.hidden, false);
  assert.ok(h.nodes().includes(whole));
  h.render({ busy: true });
  assert.equal(h.find('select').props.disabled, true);
  h.find('select').props.onChange({ target: { value: 'panel' } }); h.render();
  assert.equal(h.find('select').props.value, 'whole');
  h.render({ busy: false });
  h.find('select').props.onChange({ target: { value: 'panel' } }); h.render();
  assert.ok(panelNode());
  const html = renderToStaticMarkup(React.createElement(ImageEditSection, { image: 'image', panelEditor: panel }, whole));
  assert.match(html, /ページ全体／コマを選んで修正/);
  assert.equal((html.match(/aria-controls="image-edit-section-content"/g) || []).length, 1);
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /class="web-prompt-disclosure-toggle"/);
  assert.equal(h.find('button').props.style.padding, '12px');
  assert.equal(h.find('button').props.style.borderRadius, '12px');
  assert.equal(h.find('button').props.style.fontSize, '13px');
  assert.equal(h.find('select').props.style.fontSize, '13px');
  assert.match(html, /class="web-prompt-disclosure image-edit-section"/);
  for (const property of ['background', 'backgroundColor', 'color', 'border']) assert.equal(h.find('select').props.style[property], undefined);
  assert.match(html, /クリックで開く/);
  assert.doesNotMatch(html, /<details\b/);
});

test('busy generation or review prevents opening or closing the editor and restores it afterward', () => {
  const h = mountEditComponent('ImageEditSection', { image:'image', busy:true, panelEditor:React.createElement('div') });
  assert.equal(h.find('button').props.disabled, true);
  h.find('button').props.onClick(); h.render();
  assert.equal(h.find('button').props['aria-expanded'], false);
  h.render({busy:false});
  assert.equal(h.find('button').props.disabled, false);
  h.find('button').props.onClick(); h.render();
  assert.equal(h.find('button').props['aria-expanded'], true);
  h.render({busy:true});
  h.find('button').props.onClick(); h.render();
  assert.equal(h.find('button').props['aria-expanded'], true, 'busy state retains the open form and its draft');
});

test('whole image is available without panel editing and keeps the existing single-flight submit behavior', async () => {
  const wholeOnly = mountEditComponent('ImageEditSection', { image: 'image', children: React.createElement('form') });
  assert.equal(wholeOnly.find('select').props.value, 'whole');
  assert.equal(wholeOnly.nodes().some(node => node.type === 'option' && node.props.value === 'panel'), false);
  let calls = 0, finish, submitted, changed;
  const h = mountEditComponent('default', { image: 'image', draft: 'ページ全体を修正する指示', onDraftChange: value => { changed = value; },
    onSubmit: value => { submitted = value; calls++; return new Promise(resolve => { finish = resolve; }); } });
  assert.match(h.find('button').props.className, /\bimage-edit-action\b/);
  for (const node of [h.find('textarea'), h.find('button')]) {
    for (const property of ['background', 'backgroundColor', 'color', 'border', 'opacity']) assert.equal(node.props.style[property], undefined);
  }
  h.find('textarea').props.onChange({ target: { value: '編集した指示' } });
  assert.equal(changed, '編集した指示');
  h.render({ draft: changed });
  assert.equal(h.find('textarea').props.value, changed);
  const submit = h.find('form').props.onSubmit;
  const event = { preventDefault() {} };
  const pending = submit(event); await submit(event);
  assert.equal(calls, 1);
  assert.equal(submitted, changed);
  finish(); await pending;
  h.render({ busy: true }); await h.find('form').props.onSubmit(event);
  assert.equal(calls, 1);
  h.render({ busy: false, draft: '  ' }); await h.find('form').props.onSubmit(event);
  assert.equal(calls, 1);
});

const renderStep4 = props => renderToStaticMarkup(React.createElement(Step4Panel, {
  currentStep: 4, selectedEngine: 'openai', finalPrompt: 'Four-panel comic',
  webCopyPartLengths: [], policyPromptHistory: [], policyErrorMsg: '',
  genLog: ['[4/5] データストリーム受信完了 (Model: fixture)', '[WAIT] カメラ検査中… 合計441秒経過'], scenario: '',
  isGeneratingImage: true, ...props,
}));

test('user image-edit surfaces never expose the verification-only AI recheck action', () => {
  for (const selectedEngine of ['gemini', 'openai']) for (const experimentalEnabled of [false, true])
    for (const isGeneratingImage of [false, true]) for (const generatedImage of ['', 'data:image/png;base64,YQ==']) {
      const html = renderStep4({ selectedEngine, experimentalEnabled, isGeneratingImage, generatedImage });
      assert.doesNotMatch(html, /AIで画像を再検査|画像再生成なし・解析API課金あり/);
    }
});

test('completed STEP4 keeps its elapsed time last even after a post-generation status message', () => {
  const html = renderStep4({ isGeneratingImage: false,
    genLog: ['[WAIT] STEP4終了（合計133秒）', '[POLICY AUTO-FIX] 処理結果'],
  });
  assert.ok(html.indexOf('STEP4終了（合計133秒）') > html.indexOf('[POLICY AUTO-FIX] 処理結果'));
  assert.equal(html.split('STEP4終了（合計133秒）').length - 1, 1);
});

test('policy recovery UI follows the automatic-repair setting without claiming unperformed retries', () => {
  for (const allowImageQualityRepair of [false, true]) {
    const html = renderStep4({ isGeneratingImage: false, showPolicyChoice: true, allowImageQualityRepair });
    const retry = html.match(/<button\b[^>]*>[^]*?もう一度自動修正して再生成する<\/button>/)?.[0];
    assert.ok(retry);
    const retryTag = retry.slice(retry.lastIndexOf('<button'), retry.indexOf('>', retry.lastIndexOf('<button')) + 1);
    assert.equal(/disabled=""/.test(retryTag), !allowImageQualityRepair);
    assert.equal(html.includes('自動修正OFFのため、追加の修正解析・画像生成は行いません。'), !allowImageQualityRepair);
    assert.doesNotMatch(html, /内部で最大5回まで[^<]*試しました/);
  }
});

test('policy prompt repair exposes the existing stop action before its image request', () => {
  const html = renderStep4({ isGeneratingImage: false, isFixingPolicy: true, policyAutoRetrying: true, allowImageQualityRepair: true });
  assert.match(html, /自動修正を停止（現在の応答後）/);
  const manual = renderStep4({ isGeneratingImage: false, isFixingPolicy: true, policyAutoRetrying: false, allowImageQualityRepair: true });
  assert.doesNotMatch(manual, /自動修正を停止（現在の応答後）/);
});

test('an existing image remains visible and downloadable during QA while image edits stay locked', () => {
  const html = renderStep4({ generatedImage: 'data:image/png;base64,YQ==' });
  const result = html.slice(html.lastIndexOf('<section'));
  assert.match(result, /alt="Generated Result"/);
  assert.doesNotMatch(result, /backdrop-filter|z-index:200/);
  assert.match(result, /role="status"[^>]*>[\s\S]*カメラ検査中… 合計441秒経過/);
  assert.match(result, /<textarea[^>]*disabled=""/);
  const download = result.match(/<button[^>]*>[\s\S]*?保存先を選んで保存（制作情報入りPNG）<\/button>/)?.[0];
  assert.ok(download);
  assert.doesNotMatch(download.slice(download.lastIndexOf('<button')), /disabled=""/);
});

test('initial generation still shows its waiting overlay until an image exists', () => {
  const result = renderStep4({ generatedImage: '', genLog: [] }).split('<section').at(-1);
  assert.match(result, /backdrop-filter:blur\(6px\)/);
  assert.match(result, /画像生成中/);
  assert.doesNotMatch(result, /alt="Generated Result"/);
});

test('a previous image is preserved under the mask while the next image is still being generated', () => {
  const result = renderStep4({
    generatedImage: 'data:image/png;base64,b2xk',
    genLog: ['[1/5] プロンプトパラメータをロック中...', '[WAIT] ⏳ 画像生成中… 合計12秒経過'],
  }).split('<section').at(-1);
  assert.match(result, /src="data:image\/png;base64,b2xk"/);
  assert.match(result, /backdrop-filter:blur\(6px\)/);
  assert.match(result, /z-index:200/);
  assert.match(result, /<textarea[^>]*disabled=""/);
  assert.match(result, /画像生成中… 合計12秒経過/);
});

test('both generation and QA show one compact spinning status with their elapsed time', () => {
  for (const received of [false, true]) {
    const logs = received ? ['[4/5] データストリーム受信完了 (Model: fixture)'] : [];
    logs.push(`[WAIT] ⏳ ${received ? '品質検査' : '画像生成'}中… 合計14秒経過`);
    const result = renderStep4({ generatedImage: 'data:image/png;base64,YQ==', genLog: logs }).split('<section').at(-1);
    const status = result.match(/<p[^>]*role="status"[^>]*>[\s\S]*?<\/p>/)?.[0];
    assert.ok(status);
    assert.match(status, /step4-processing-status/);
    assert.match(status, /step4-processing-spinner/);
    assert.match(status, /合計14秒経過/);
    assert.doesNotMatch(status, /<br|text-lg|py-3/);
    assert.equal((result.match(/role="status"/g) || []).length, 1);
    const imageZone = result.match(/<div[^>]*class="step4-image-display"[^>]*>([\s\S]*?)<\/div>/)?.[1];
    assert.ok(imageZone, 'the image itself has a positioning and scroll target');
    assert.match(imageZone, /role="status"/);
    assert.match(imageZone, /alt="Generated Result"/);
    assert.doesNotMatch(imageZone, /<textarea|PNGをダウンロード/);
  }
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /\.step4-processing-status\s*\{[^}]*font-size:\s*16px;[^}]*line-height:\s*24px;[^}]*white-space:\s*nowrap;/);
  assert.match(css, /\.step4-processing-spinner\s*\{[^}]*animation:\s*step4-processing-spin\s+[\d.]+s\s+linear\s+infinite;/);
  assert.match(css, /@keyframes step4-processing-spin\s*\{[\s\S]*?rotate\(360deg\)/);
  const statusStyle = css.match(/\.step4-processing-status\s*\{([^}]+)\}/)?.[1];
  assert.match(statusStyle, /position:\s*absolute;/);
  assert.match(statusStyle, /top:\s*50%;/);
  assert.match(statusStyle, /left:\s*50%;/);
  assert.match(statusStyle, /transform:\s*translate\(-50%,\s*-50%\);/);
  assert.match(css, /\.step4-image-display\s*\{[^}]*position:\s*relative;/);
  assert.match(statusStyle, /z-index:\s*201;/);
  assert.match(statusStyle, /pointer-events:\s*none;/);
});

test('history names the active preparation stage while preserving the existing lock', () => {
  const props = { generationHistory: [{ id: 1, img: 'data:image/png;base64,YQ==' }] };
  for (const [state, label] of [
    [{ isAssembling: true }, 'プロンプト作成中…'],
    [{ isSearching: true }, 'シナリオ作成中…'],
    [{ isEnhancing: true }, 'シナリオ強化中…'],
    [{ isFullAutoMode: true, fullAutoStep: 1 }, '自動処理中…'],
    [{ isFullAutoMode: true, fullAutoStep: 3 }, '自動処理中…'],
  ]) {
    const html = renderToStaticMarkup(React.createElement(GenerationHistory, { ...props, ...state }));
    assert.ok(html.includes(label), `history must describe ${label}`);
    assert.match(html, /backdrop-filter:blur\(2px\)/);
    assert.match(html, /pointer-events:auto/);
    assert.match(html, /animate-spin/);
    assert.doesNotMatch(html, /生成中\.\.\./, 'preparation must not imply image generation');
  }
});

test('history suppresses the redundant badge during STEP4 even if preparation flags overlap', () => {
  const props = { generationHistory: [{ id: 1, img: 'data:image/png;base64,YQ==' }], isGeneratingImage: true };
  for (const state of [{}, { isAssembling: true, isSearching: true, isEnhancing: true, isFullAutoMode: true, fullAutoStep: 3 }]) {
    const html = renderToStaticMarkup(React.createElement(GenerationHistory, { ...props, ...state }));
    assert.match(html, /backdrop-filter:blur\(2px\)/);
    assert.doesNotMatch(html, /animate-spin|作成中|強化中|自動処理中|生成中/);
  }
});

test('idle or empty history has no preparation badge or lock', () => {
  const props = { generationHistory: [{ id: 1, img: 'data:image/png;base64,YQ==' }] };
  for (const state of [{}, { isFullAutoMode: false, fullAutoStep: 2 }, { isFullAutoMode: true, fullAutoStep: 0 }, { isFullAutoMode: true, fullAutoStep: 4 }]) {
    const html = renderToStaticMarkup(React.createElement(GenerationHistory, { ...props, ...state }));
    assert.doesNotMatch(html, /backdrop-filter|animate-spin|作成中|強化中|自動処理中|生成中/);
  }
  assert.equal(renderToStaticMarkup(React.createElement(GenerationHistory, { generationHistory: [], isAssembling: true })), '');
});

test('completed images have no processing mask or status and allow editing again', () => {
  const result = renderStep4({ generatedImage: 'data:image/png;base64,YQ==', isGeneratingImage: false }).split('<section').at(-1);
  assert.doesNotMatch(result, /backdrop-filter|role="status"/);
  assert.doesNotMatch(result.match(/<textarea[^>]*>/)[0], /disabled=""/);
  assert.match(result, /保存先を選んで保存（制作情報入りPNG）/);
});

test('image info survives edits without borrowing unverified layout measurements', () => {
  const source = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  const definition = source.match(/const getDisplayedImageInfo = [\s\S]*?\n};/)?.[0];
  assert.ok(definition, 'image information must not depend only on fixed page layout metadata');
  const format = vm.runInNewContext(`${definition}; getDisplayedImageInfo`);
  const size = { width: 2240, height: 3168 };
  const layout = { applied: true, layout: { ...size, titleHeight: 206, panelHeight: 2892, footerHeight: 70 } };
  assert.equal(format(size), '2240×3168');
  assert.match(format(size, layout), /タイトル206px・4コマ全体2892px・フッター70px/);
  assert.equal(format({ width: 1120, height: 1584 }, layout), '1120×1584');
  assert.equal(format(null), '画像サイズを確認中…');
});
