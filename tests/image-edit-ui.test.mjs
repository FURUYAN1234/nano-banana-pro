import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let server, ImageEditForm, Step4Panel, GenerationHistory;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: ImageEditForm } = await server.ssrLoadModule('/src/components/ImageEditForm.jsx'));
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
  assert.match(html, /この画像への追加指示/);
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

const renderStep4 = props => renderToStaticMarkup(React.createElement(Step4Panel, {
  currentStep: 4, selectedEngine: 'openai', finalPrompt: 'Four-panel comic',
  webCopyPartLengths: [], policyPromptHistory: [], policyErrorMsg: '',
  genLog: ['[4/5] データストリーム受信完了 (Model: fixture)', '[WAIT] カメラ検査中… 合計441秒経過'], scenario: '',
  isGeneratingImage: true, ...props,
}));

test('an existing image remains visible and downloadable during QA while image edits stay locked', () => {
  const html = renderStep4({ generatedImage: 'data:image/png;base64,YQ==' });
  const result = html.slice(html.lastIndexOf('<section'));
  assert.match(result, /alt="Generated Result"/);
  assert.doesNotMatch(result, /backdrop-filter|z-index:200/);
  assert.match(result, /role="status"[^>]*>[\s\S]*カメラ検査中… 合計441秒経過/);
  assert.match(result, /<textarea[^>]*disabled=""/);
  const download = result.match(/<button[^>]*>[\s\S]*?PNGをダウンロード（制作情報入り）<\/button>/)?.[0];
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

test('history keeps its lock but suppresses the redundant badge only during STEP4', () => {
  const props = { generationHistory: [{ id: 1, img: 'data:image/png;base64,YQ==' }] };
  const step4 = renderToStaticMarkup(React.createElement(GenerationHistory, { ...props, isGeneratingImage: true }));
  assert.match(step4, /backdrop-filter:blur\(2px\)/);
  assert.doesNotMatch(step4, /生成中\.\.\./);
  const step2 = renderToStaticMarkup(React.createElement(GenerationHistory, { ...props, isSearching: true }));
  assert.match(step2, /生成中\.\.\./);
});

test('completed images have no processing mask or status and allow editing again', () => {
  const result = renderStep4({ generatedImage: 'data:image/png;base64,YQ==', isGeneratingImage: false }).split('<section').at(-1);
  assert.doesNotMatch(result, /backdrop-filter|role="status"/);
  assert.doesNotMatch(result.match(/<textarea[^>]*>/)[0], /disabled=""/);
  assert.match(result, /PNGをダウンロード（制作情報入り）/);
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
