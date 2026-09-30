import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let server, ImageEditForm;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: ImageEditForm } = await server.ssrLoadModule('/src/components/ImageEditForm.jsx'));
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
