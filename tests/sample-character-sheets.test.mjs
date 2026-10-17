import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React from 'react';
import { createServer } from 'vite';
import { loadSampleCharacterSheets } from '../src/lib/sample-character-sheets.js';

let server, SampleCharacterSheetsButton;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: SampleCharacterSheetsButton } = await server.ssrLoadModule('/src/components/SampleCharacterSheetsButton.jsx'));
});
after(async () => server?.close());

test('sample sheets are real JPEG files loaded in the displayed order through the ordinary file path', async () => {
  const requests = [];
  const fetchImpl = async url => {
    requests.push(url);
    const name = url.split('/').at(-1);
    const bytes = readFileSync(new URL(`../public/sample-character-sheets/${name}`, import.meta.url));
    return new Response(bytes, { status: 200, headers: { 'content-type': 'image/jpeg' } });
  };
  const files = await loadSampleCharacterSheets({ fetchImpl, baseUrl: '/nano-banana-pro/' });
  assert.deepEqual(requests, [
    '/nano-banana-pro/sample-character-sheets/sample-character-sheet-1.jpg',
    '/nano-banana-pro/sample-character-sheets/sample-character-sheet-2.jpg',
  ]);
  assert.deepEqual(files.map(file => file.name), ['sample-character-sheet-1.jpg', 'sample-character-sheet-2.jpg']);
  assert.ok(files.every(file => file instanceof File && file.type === 'image/jpeg' && file.size > 200_000));
});

test('missing or non-image sample assets reject the whole load', async () => {
  await assert.rejects(loadSampleCharacterSheets({ fetchImpl: async () => new Response('', { status: 404 }) }), /読み込めませんでした/);
  await assert.rejects(loadSampleCharacterSheets({ fetchImpl: async () => new Response('<html>fallback</html>', { status: 200, headers: { 'content-type': 'text/html' } }) }), /画像形式/);
});

test('sample button sends both files to the existing STEP1 processor without direct API work', async t => {
  t.mock.method(React, 'useState', value => [value, () => {}]);
  t.mock.method(globalThis, 'fetch', async url => {
    const name = url.split('/').at(-1);
    const bytes = readFileSync(new URL(`../public/sample-character-sheets/${name}`, import.meta.url));
    return new Response(bytes, { status: 200, headers: { 'content-type': 'image/jpeg' } });
  });
  let submitted = null;
  const tree = SampleCharacterSheetsButton({ processFiles: files => { submitted = files; } });
  await tree.props.children[0].props.onClick();
  assert.deepEqual(submitted?.map(file => file.name), ['sample-character-sheet-1.jpg', 'sample-character-sheet-2.jpg']);
});

test('disabled button and a failed asset load never submit files to STEP1', async t => {
  const errors = [];
  t.mock.method(React, 'useState', value => [value, next => { if (typeof next === 'string') errors.push(next); }]);
  t.mock.method(globalThis, 'fetch', async () => new Response('', { status: 404 }));
  let calls = 0;
  const processFiles = () => { calls++; };
  await SampleCharacterSheetsButton({ processFiles, disabled: true }).props.children[0].props.onClick();
  await SampleCharacterSheetsButton({ processFiles }).props.children[0].props.onClick();
  assert.equal(calls, 0);
  assert.ok(errors.some(message => message.includes('読み込めませんでした')));
});
