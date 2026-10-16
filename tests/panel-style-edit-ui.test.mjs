import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { transformSync } from 'esbuild';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let server, PanelStyleEditForm, Step4Panel;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: PanelStyleEditForm } = await server.ssrLoadModule('/src/components/PanelStyleEditForm.jsx'));
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
});
after(async () => { await server?.close(); });

const sourceImage = 'data:image/png;base64,b3JpZ2luYWw=';
test('the app exposes no standalone saved-image upload before API output', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.equal(/SavedMangaImageInput|loadSavedMangaImage/.test(app), false);
  assert.match(app, /Boolean\(finalPrompt\?\.trim\(\) \|\| generatedImage\)/);
});
const frames = Array.from({ length: 6 }, (_, index) => ({
  index, panelNumber: index + 1, region: { x: 10, y: 20 + index * 100, width: 200, height: 90 },
  thumbnail: `data:image/png;base64,cGFuZWw${index}`,
}));
const prepared = { sourceImage, width: 220, height: 640, frames, readingOrderConfirmed: true };
const candidate = { sourceImage, panelIndex: 1, region: frames[1].region, mode: 'style', style: 'POP_ART',
  before: frames[1].thumbnail, after: 'data:image/png;base64,YWZ0ZXI=', image: 'data:image/png;base64,Y29tcG9zaXRl' };
const callbacks = { onPrepare: async () => prepared, onGenerate: async () => candidate, onAdopt: async () => true, onDiscard() {} };

// Execute the component's real event handlers with synchronous hook storage.
// The keyed child is remounted on image changes, including effect cleanup.
function mount(props = {}, componentName = 'default') {
  let slots = [], cursor = 0, effects = [], cleanups = [], instanceKey;
  const react = {
    createElement(type, attrs, ...children) { return { type, key: attrs?.key, props: { ...attrs, children } }; },
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial;
      return [slots[index], value => { slots[index] = typeof value === 'function' ? value(slots[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; return slots[index] ??= { current: initial }; },
    useEffect(effect, deps) {
      const index = cursor++;
      if (!(index in slots) || deps.some((value, offset) => !Object.is(value, slots[index][offset]))) {
        slots[index] = deps;
        effects.push(() => { cleanups[index]?.(); cleanups[index] = effect(); });
      }
    },
  };
  const code = transformSync(readFileSync(new URL('../src/components/PanelStyleEditForm.jsx', import.meta.url), 'utf8'),
    { loader: 'jsx', format: 'cjs', jsx: 'transform' }).code;
  const context = { module: { exports: {} }, require: name => { assert.equal(name, 'react'); return react; } };
  vm.runInNewContext(code, context);
  let currentProps = { image: sourceImage, panelCount: 6, ...callbacks, ...props }, tree;
  function render(nextProps = {}) {
    currentProps = { ...currentProps, ...nextProps };
    cursor = 0;
    const wrapper = context.module.exports[componentName](currentProps);
    if (!wrapper) return tree = null;
    if (typeof wrapper.type !== 'function') {
      tree = wrapper;
      effects.splice(0).forEach(effect => effect());
      return tree;
    }
    if (wrapper.key !== instanceKey) {
      cleanups.forEach(cleanup => cleanup?.());
      slots = []; cleanups = []; instanceKey = wrapper.key;
    }
    cursor = 0;
    tree = wrapper.type(wrapper.props);
    effects.splice(0).forEach(effect => effect());
    return tree;
  }
  function walk(node) {
    if (Array.isArray(node)) return node.flatMap(walk);
    if (!node || typeof node !== 'object') return [];
    return [node, ...walk(node.props?.children)];
  }
  const nodes = () => walk(tree);
  function text(node) {
    if (Array.isArray(node)) return node.map(text).join('');
    return node && typeof node === 'object' ? text(node.props?.children) : String(node ?? '');
  }
  const find = (type, label) => nodes().find(node => node.type === type && text(node).includes(label));
  render();
  return { render, nodes, text: () => text(tree), find,
    settle: async () => { await new Promise(setImmediate); render(); },
    unmount: () => { cleanups.forEach(cleanup => cleanup?.()); },
    button: label => { const node = find('button', label); assert.ok(node, `button ${label}`); return node; },
    change: (label, value) => { const node = nodes().find(item => item.props?.['aria-label'] === label); assert.ok(node, label); node.props.onChange({ target: { value, checked: value } }); render(); },
  };
}

test('Gemini count choices admit only four while OpenAI retains four through eight', async () => {
  const calls = [];
  const h = mount({ panelCount: undefined, maxPanelCount: 4, onPrepare: async args => { calls.push(args); return { ...prepared, frames: frames.slice(0, 4) }; } });
  assert.deepEqual(h.nodes().filter(node => node.type === 'option' && node.props.value).map(node => node.props.value), [4]);
  h.change('この画像のコマ数', '6');
  await h.settle();
  assert.equal(calls.length, 0);
  h.change('この画像のコマ数', '4');
  await h.settle();
  assert.equal(calls[0].panelCount, 4);
});

async function select(harness) {
  await harness.settle();
  harness.button('2コマ目').props.onClick(); harness.render();
  harness.change('変更後の絵柄', 'POP_ART');
}

test('preparation is automatic and local after a valid count; paid controls require a visual selection', async () => {
  const calls = [];
  const h = mount({ panelCount: undefined, onPrepare: async args => { calls.push(args); return prepared; }, onGenerate: async () => { throw new Error('unexpected paid call'); } });
  assert.equal(calls.length, 0);
  const countSelect = h.nodes().find(node => node.props?.['aria-label'] === 'この画像のコマ数');
  for (const property of ['background', 'backgroundColor', 'color', 'border']) assert.equal(countSelect.props.style[property], undefined);
  assert.equal(h.nodes().some(node => node.type === 'details'), false, 'the parent provides the single editing disclosure');
  assert.equal(h.find('button', 'コマを読み込む'), undefined);
  h.change('この画像のコマ数', '6');
  await h.settle();
  assert.equal(calls.length, 1);
  assert.equal(calls[0].sourceImage, sourceImage);
  assert.equal(calls[0].panelCount, 6);
  assert.equal(h.nodes().filter(node => node.type === 'img').length, 6);
  assert.equal(h.find('button', '修正（追加課金あり）'), undefined);
  assert.equal(h.nodes().some(node => node.props?.['aria-label'] === '修正方法'), false);
  h.button('2コマ目').props.onClick(); h.render();
  assert.deepEqual(h.nodes().filter(node => node.type === 'option' && node.props.value && !['style', 'free'].includes(node.props.value)).map(node => node.props.value),
    ['NORMAL', 'POP_ART', 'WATERCOLOR', 'GEKIGA', 'SKETCH', 'CHIBI_GAG']);
  assert.equal(h.button('2コマ目を修正（追加課金あり）').props.disabled, true);
  for (const node of h.nodes().filter(node => node.type === 'select')) {
    for (const property of ['background', 'backgroundColor', 'color', 'border']) assert.equal(node.props.style[property], undefined);
  }
  const submit = h.button('2コマ目を修正（追加課金あり）');
  assert.match(submit.props.className, /\bimage-edit-action\b/);
  for (const property of ['background', 'backgroundColor', 'color', 'border', 'opacity']) assert.equal(submit.props.style[property], undefined);
  h.change('変更後の絵柄', 'POP_ART');
  assert.equal(h.button('2コマ目を修正（追加課金あり）').props.disabled, false);
  assert.match(h.text(), /追加課金あり/);
  assert.doesNotMatch(h.text(), /OpenAI画像APIを1回/);
});

test('candidate generation is single-flight and adoption requires checked visual review', async () => {
  let finish, calls = 0, adoption;
  const h = mount({ onGenerate: args => { calls++; assert.equal(args.panelIndex, 1); assert.equal(args.region, frames[1].region); assert.equal(args.mode, 'style'); assert.equal(args.style, 'POP_ART'); assert.equal('instruction' in args, false); return new Promise(resolve => { finish = resolve; }); },
    onAdopt: async args => { adoption = args; return true; } });
  await select(h);
  const generate = h.button('修正（追加課金あり）').props.onClick;
  const pending = generate();
  await generate(); h.render();
  assert.equal(calls, 1);
  finish(candidate); await pending; h.render();
  assert.equal(h.nodes().some(node => node.type === 'img' && node.props.src === candidate.image), false, 'only selected panel comparisons appear here');
  assert.ok(h.nodes().some(node => node.type === 'img' && node.props.src === candidate.before));
  assert.ok(h.nodes().some(node => node.type === 'img' && node.props.src === candidate.after));
  assert.equal(h.find('button', '修正（追加課金あり）'), undefined);
  assert.equal(h.button('この候補を採用').props.disabled, true);
  await h.button('この候補を採用').props.onClick();
  assert.equal(adoption, undefined);
  h.change('修正候補の目視確認', true);
  await h.button('この候補を採用').props.onClick();
  assert.equal(adoption.candidate, candidate);
  assert.equal(adoption.reviewConfirmed, true);
});

test('discard preserves the source and generation failures never retry automatically', async () => {
  let discarded = 0, calls = 0;
  const h = mount({ onDiscard() { discarded++; }, onGenerate: async () => { calls++; return candidate; } });
  await select(h);
  await h.button('修正（追加課金あり）').props.onClick(); h.render();
  await h.button('候補を破棄').props.onClick(); h.render();
  assert.equal(discarded, 1);
  assert.equal(calls, 1);
  assert.equal(h.find('button', 'この候補を採用'), undefined);
  assert.ok(h.nodes().some(node => node.type === 'img' && node.props.src === frames[1].thumbnail));
  h.render({ onGenerate: async () => { calls++; throw new Error('fixture failure'); } });
  await h.button('修正（追加課金あり）').props.onClick(); h.render();
  assert.equal(calls, 2);
  assert.match(h.text(), /fixture failure/);
  assert.equal(h.find('button', 'この候補を採用'), undefined);
});

test('failed or mismatched results cannot become adoptable candidates', async () => {
  for (const result of [null, { ...candidate, sourceImage: 'another-image' }, { ...candidate, style: 'GEKIGA' },
    { ...candidate, mode: 'free' }, { ...candidate, mode: undefined }, { ...candidate, region: frames[2].region }]) {
    let calls = 0;
    const h = mount({ onGenerate: async () => { calls++; return result; } });
    await select(h);
    await h.button('修正（追加課金あり）').props.onClick(); h.render();
    assert.equal(calls, 1);
    assert.equal(h.find('button', 'この候補を採用'), undefined);
    assert.ok(h.nodes().some(node => node.props.role === 'alert'));
  }
});

test('free input shows only its instruction field and sends one explicit nonblank request before reviewed adoption', async () => {
  let request, adoption, calls = 0;
  const instruction = '右手に持ったブロックを自然な形に修正する。';
  const freeCandidate = { ...candidate, mode: 'free', instruction };
  delete freeCandidate.style;
  const h = mount({ onGenerate: async args => { calls++; request = args; return freeCandidate; },
    onAdopt: async args => { adoption = args; return true; } });
  await select(h);
  assert.equal(h.nodes().some(node => node.type === 'textarea'), false);
  h.change('修正方法', 'free');
  assert.equal(h.nodes().some(node => node.props?.['aria-label'] === '変更後の絵柄'), false);
  assert.ok(h.nodes().some(node => node.type === 'textarea' && node.props?.['aria-label'] === '選んだコマへの指示'));
  const input = h.nodes().find(node => node.type === 'textarea');
  assert.equal(input.props.rows, 6);
  assert.equal(input.props.style.fontSize, '14px');
  assert.equal(input.props.style.resize, 'vertical');
  assert.equal(input.props.style.minHeight, '9em');
  for (const property of ['background', 'backgroundColor', 'color', 'border']) assert.equal(input.props.style[property], undefined);
  h.change('選んだコマへの指示', ' \n ');
  assert.equal(h.button('修正（追加課金あり）').props.disabled, true);
  await h.button('修正（追加課金あり）').props.onClick();
  assert.equal(calls, 0);
  h.change('選んだコマへの指示', ` ${instruction}\n`);
  assert.equal(h.button('修正（追加課金あり）').props.disabled, false);
  await h.button('修正（追加課金あり）').props.onClick(); h.render();
  assert.equal(calls, 1);
  assert.equal(request.mode, 'free');
  assert.equal(request.instruction, instruction);
  assert.equal('style' in request, false);
  assert.equal(request.sourceImage, sourceImage);
  assert.equal(request.panelIndex, 1);
  assert.equal(request.region, frames[1].region);
  assert.equal(h.button('この候補を採用').props.disabled, true);
  h.change('修正候補の目視確認', true);
  await h.button('この候補を採用').props.onClick();
  assert.equal(adoption.candidate, freeCandidate);
});

test('free response must echo the chosen instruction, mode and region; a rejected candidate is discarded', async () => {
  const instruction = '手を自然に修正する。';
  for (const overrides of [{ instruction: '別の修正' }, { mode: 'style' }, { region: frames[0].region }]) {
    let discarded = 0;
    const h = mount({ onGenerate: async () => ({ ...candidate, style: undefined, mode: 'free', instruction, ...overrides }),
      onDiscard() { discarded++; } });
    await select(h);
    h.change('修正方法', 'free');
    h.change('選んだコマへの指示', instruction);
    await h.button('修正（追加課金あり）').props.onClick(); h.render();
    assert.equal(h.find('button', 'この候補を採用'), undefined);
    assert.equal(discarded, 1);
    assert.ok(h.nodes().some(node => node.props.role === 'alert'));
  }
});

test('mode changes restore only the applicable controls and source change clears a free instruction', async () => {
  const h = mount();
  await select(h);
  h.change('修正方法', 'free');
  h.change('選んだコマへの指示', '手を修正する。');
  h.change('修正方法', 'style');
  assert.equal(h.nodes().some(node => node.type === 'textarea'), false);
  assert.ok(h.nodes().some(node => node.props?.['aria-label'] === '変更後の絵柄'));
  h.render({ image: 'data:image/png;base64,bmV3', onPrepare: async () => ({ ...prepared, sourceImage: 'data:image/png;base64,bmV3' }) });
  await h.settle();
  h.button('2コマ目').props.onClick(); h.render();
  h.change('修正方法', 'free');
  assert.equal(h.nodes().find(node => node.type === 'textarea').props.value, '');
  assert.equal(h.button('修正（追加課金あり）').props.disabled, true);
});

test('source change drops selection and ignores an old delayed candidate; busy disallows paid requests', async () => {
  let finish, calls = 0, discarded = 0;
  const h = mount({ onDiscard: () => { discarded++; }, onGenerate: () => { calls++; return new Promise(resolve => { finish = resolve; }); } });
  await select(h);
  h.render({ busy: true });
  await h.button('修正（追加課金あり）').props.onClick();
  assert.equal(calls, 0);
  h.render({ busy: false });
  h.render({ onDiscard: () => { discarded++; } });
  assert.equal(discarded, 0, 'parent callback identity changes must not clear a pending edit');
  const pending = h.button('修正（追加課金あり）').props.onClick();
  h.render({ image: 'data:image/png;base64,bmV3', panelCount: undefined });
  assert.equal(discarded, 1);
  finish(candidate); await pending; h.render();
  assert.equal(h.find('button', 'この候補を採用'), undefined);
  assert.equal(h.find('button', 'コマを読み込む'), undefined);
  assert.ok(h.nodes().some(node => node.props?.['aria-label'] === 'この画像のコマ数'));
  assert.equal(h.nodes().filter(node => node.type === 'img').length, 0);
});

test('opening starts automatic preparation once and a newer image rejects the old delayed frame result', async () => {
  let finishOld, calls = 0;
  const nextImage = 'data:image/png;base64,bmV3';
  const nextFrames = frames.map(item => ({ ...item, thumbnail: `${item.thumbnail}-new` }));
  const h = mount({ enabled: false, onPrepare: () => { calls++; return new Promise(resolve => { finishOld = resolve; }); } });
  assert.equal(calls, 0);
  h.render({ enabled: true });
  assert.equal(calls, 1);
  h.render({ image: nextImage, enabled: false, onPrepare: async () => { calls++; return { ...prepared, sourceImage: nextImage, frames: nextFrames }; } });
  assert.equal(calls, 1, 'a history switch waits for the new section to open');
  h.render({ enabled: true }); await h.settle();
  assert.equal(calls, 2);
  finishOld(prepared); await h.settle();
  assert.ok(h.nodes().some(node => node.type === 'img' && node.props.src === nextFrames[0].thumbnail));
  assert.equal(h.nodes().some(node => node.type === 'img' && node.props.src === frames[0].thumbnail), false);
  assert.equal(h.find('button', '修正（追加課金あり）'), undefined);
  h.render({ onPrepare: async () => { throw new Error('callback changes must not reread the same image'); } });
  await h.settle();
  assert.equal(calls, 2);
  assert.equal(h.nodes().some(node => node.props.role === 'alert'), false);
});

test('panel labels use confirmed reading numbers without changing edit identity, or show uncertainty', async () => {
  let request;
  const reordered = [{ ...frames[1], panelNumber: 1 }, { ...frames[0], panelNumber: 2 }];
  const h = mount({ onPrepare: async () => ({ ...prepared, frames: reordered }), onGenerate: async args => { request = args; return null; } });
  await h.settle();
  h.button('2コマ目').props.onClick(); h.render();
  h.change('変更後の絵柄', 'GEKIGA');
  await h.button('2コマ目を修正（追加課金あり）').props.onClick();
  assert.equal(request.panelIndex, frames[0].index);
  assert.equal(request.region, frames[0].region);
  const uncertain = mount({ onPrepare: async () => ({ ...prepared, readingOrderConfirmed: false, readingOrderNote: '段組みを確認できません。' }) });
  await uncertain.settle();
  assert.match(uncertain.text(), /段組みを確認できません/);
  assert.equal(uncertain.find('button', '1コマ目'), undefined);
  uncertain.button('範囲1（順番未確認）').props.onClick(); uncertain.render();
  assert.ok(uncertain.button('選んだ範囲を修正（追加課金あり）'));
});

test('leaving panel editing discards an unadopted candidate and invalidates its old adopt handler', async () => {
  let discarded = 0, adopted = 0;
  const h = mount({ onDiscard() { discarded++; }, onAdopt() { adopted++; return true; } });
  await select(h);
  await h.button('修正（追加課金あり）').props.onClick(); h.render();
  h.change('修正候補の目視確認', true);
  const adopt = h.button('この候補を採用').props.onClick;
  h.unmount(); await adopt();
  assert.equal(discarded, 1);
  assert.equal(adopted, 0);
});

const renderStep4 = props => renderToStaticMarkup(React.createElement(Step4Panel, {
  currentStep: 4, selectedEngine: 'openai', finalPrompt: 'Four-panel comic',
  webCopyPartLengths: [], policyPromptHistory: [], policyErrorMsg: '', genLog: [], scenario: '',
  generatedImage: sourceImage, preparePanelStyleEditor: callbacks.onPrepare, generatePanelStyleEdit: callbacks.onGenerate,
  adoptPanelStyleEdit: callbacks.onAdopt, discardPanelStyleEdit: callbacks.onDiscard, ...props,
}));

test('opening panel editing while busy waits and prepares once when processing ends', async () => {
  let calls = 0;
  const h = mount({ enabled: false, busy: true, onPrepare: async () => { calls++; return prepared; } });
  h.render({ enabled: true });
  await h.settle();
  assert.equal(calls, 0, 'busy opening must not call the workflow that rejects preparation');
  h.render({ busy: false });
  await h.settle();
  assert.equal(calls, 1);
  assert.ok(h.button('1コマ目'));
  h.render(); await h.settle();
  assert.equal(calls, 1, 'ordinary renders must not repeat preparation');
});

test('STEP4 locks the shared editor for both providers and both color modes during generation and review', () => {
  const toggle = html => html.match(/<button\b[^>]*aria-controls="image-edit-section-content"[^>]*>/)?.[0];
  for (const selectedEngine of ['openai','gemini']) for (const colorMode of ['color','monochrome']) {
    const props = {selectedEngine,colorMode};
    assert.doesNotMatch(toggle(renderStep4(props)), /disabled=""/);
    for (const work of [{isGeneratingImage:true}, {isGeneratingImage:true,genLog:['[QUALITY QA] 検査中']}, {isAnalyzing:true}, {isFixingPolicy:true}]) {
      assert.match(toggle(renderStep4({...props,...work})), /disabled=""/, JSON.stringify({selectedEngine,colorMode,work}));
    }
  }
});

test('busy transitions after preparation preserve the selected edit and unadopted candidate', async () => {
  let calls = 0;
  const h = mount({ onPrepare: async () => { calls++; return prepared; } });
  await select(h);
  h.render({ busy: true }); await h.settle();
  h.render({ busy: false }); await h.settle();
  assert.equal(calls, 1);
  assert.equal(h.button('2コマ目を修正（追加課金あり）').props.disabled, false);
  await h.button('2コマ目を修正（追加課金あり）').props.onClick(); h.render();
  h.change('修正候補の目視確認', true);
  h.render({ busy: true }); await h.settle();
  h.render({ busy: false }); await h.settle();
  assert.equal(calls, 1);
  assert.equal(h.button('この候補を採用').props.disabled, false);
  assert.ok(h.nodes().some(node => node.type === 'img' && node.props.src === candidate.after));
});

test('STEP4 offers editing for the displayed OpenAI image independently of current scenario mode and prompt', () => {
  const html = renderStep4({ experimentalEnabled: true, generationHistory: [
    { img: 'other', metadataContext: { settings: { panel_count: 4 } } },
    { img: sourceImage, metadataContext: { settings: { panel_count: 6 } } },
  ] });
  assert.match(html, /ページ全体／コマを選んで修正/);
  assert.match(html, /この画像：6コマ/);
  assert.doesNotMatch(html, /aria-label="この画像のコマ数"/);
  assert.match(renderStep4({ experimentalEnabled: true, experimentalPanelCount: 8 }), /aria-label="この画像のコマ数"/);
  assert.match(renderStep4({ selectedEngine: 'gemini' }), /<option value="panel"/);
  assert.match(renderStep4({ selectedEngine: 'gemini' }), /ページ全体への指示/);
  for (const finalPrompt of ['', '[ANTIGRAVITY EMOTIONAL CINEMA ENGINE]']) {
    for (const experimentalEnabled of [false, true]) {
      assert.match(renderStep4({ finalPrompt, experimentalEnabled }), /ページ全体／コマを選んで修正/);
      assert.match(renderStep4({ finalPrompt, experimentalEnabled }), /aria-label="この画像のコマ数"/);
      for (const panel_count of [4, 8]) {
        const historical = renderStep4({ finalPrompt, experimentalEnabled,
          generationHistory: [{ img: sourceImage, metadataContext: { settings: { panel_count } } }] });
        assert.match(historical, new RegExp(`この画像：${panel_count}コマ`));
        assert.doesNotMatch(historical, /aria-label="この画像のコマ数"/);
      }
    }
  }
  assert.equal(renderToStaticMarkup(React.createElement(PanelStyleEditForm, { image: '', ...callbacks })), '');
});

test('imported manga uses its history identity with explicit count choice and no inferred four-panel normalization', () => {
  const importedHistory = [{ img: sourceImage, metadataContext: { settings: { imported_manga: true } } }];
  for (const finalPrompt of ['', '[ANTIGRAVITY EMOTIONAL CINEMA ENGINE]']) {
    const html = renderStep4({ finalPrompt, generationHistory: importedHistory, normalizeDisplayedPage() {} });
    assert.match(html, /ページ全体／コマを選んで修正/);
    assert.match(html, /aria-label="この画像のコマ数"/);
    assert.doesNotMatch(html, /ページ比率を揃える（追加課金なし）/);
  }
  const ordinary = renderStep4({ generationHistory: [{ img: 'another-image', metadataContext: { settings: { imported_manga: true } } }], normalizeDisplayedPage() {} });
  assert.match(ordinary, /ページ比率を揃える（追加課金なし）/, 'an unrelated imported history item must not alter ordinary four-panel behavior');
});

test('saved-image editing is not covered by the step prerequisite overlay, while generation and busy locks remain', () => {
  const props = { currentStep: 1, finalPrompt: '', scenario: '', generationHistory: [
    { img: sourceImage, metadataContext: { settings: { imported_manga: true } } },
  ] };
  const outerOverlay = html => /<div\b[^>]*style="[^"]*background-color:rgba\(10,12,16,0\.92\)[^"]*backdrop-filter:blur\(8px\)/.test(html);
  const generationButton = html => html.match(/<button\b[^>]*>[\s\S]*?<\/button>/g)?.find(button => button.includes('APIで新しい画像を生成する（STEP4）'));
  const html = renderStep4(props);
  assert.equal(outerOverlay(html), false, 'a displayed saved image must not be covered by the page-wide prerequisite overlay');
  assert.match(html, /ページ全体／コマを選んで修正/);
  assert.match(generationButton(html), /^<button\b[^>]*disabled=""/);
  assert.equal(html.includes('background-color:rgba(10,12,16,0.85);backdrop-filter:blur(6px)'), true, 'the prompt prerequisite still covers new generation settings');
  assert.equal(outerOverlay(renderStep4({ ...props, generatedImage: '' })), true);
  for (const busy of [{ isSearching: true }, { isAnalyzing: true }, { isEnhancing: true }]) {
    assert.equal(outerOverlay(renderStep4({ ...props, ...busy })), true, 'active preparation still locks the output');
  }
  assert.match(generationButton(renderStep4({ ...props, finalPrompt: 'Four-panel comic' })), /^<button\b[^>]*disabled=""/, 'an old prompt must not unlock a new generation before STEP3');
  assert.doesNotMatch(generationButton(renderStep4({ currentStep: 3 })), /^<button\b[^>]*disabled=""/);
});
