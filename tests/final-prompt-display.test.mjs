import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { buildOpenAIReferencePlan, appendOpenAIWebReferencePrompt, appendOpenAIReferencePrompt } from '../src/lib/openai-image-references.js';
import { buildWebReferencePlan } from '../src/lib/reference-assets.js';
import { appendGeminiReferencePrompt } from '../src/lib/gemini-image-references.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from '../src/lib/web-prompt-chunks.js';

let server, Step4Panel;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
});
after(async () => { await server?.close(); });

const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
const field = (html, id) => {
  const match = html.match(new RegExp(`<textarea\\b(?=[^>]*id="${id}")([^>]*)>([\\s\\S]*?)</textarea>`));
  assert.ok(match, `missing ${id}`);
  return { attributes: match[1], text: match[2] };
};
const render = props => renderToStaticMarkup(React.createElement(Step4Panel, {
  currentStep: 3, selectedEngine: 'openai', genLog: [], webCopyPartLengths: [],
  policyPromptHistory: [], policyErrorMsg: '', scenario: '', ...props,
}));

for (const provider of ['openai', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
  test(`${provider} ${colorMode}: the visible final text includes the complete export supplement exactly once`, async () => {
    const images = ['data:image/png;base64,YQ=='];
    const plan = provider === 'openai'
      ? buildOpenAIReferencePlan({ characterImages: images, colorMode, compact: true })
      : buildWebReferencePlan({ images, colorMode, compact: true });
    const append = provider === 'openai' ? appendOpenAIWebReferencePrompt : appendGeminiReferencePrompt;
    const prepare = body => ensureWebPromptTrailingNewline(append(body, plan));
    for (const body of ['台詞「そのまま。」\nCamera: high angle\n', '編集後の台詞「変更した本文。」\n']) {
      const expected = prepare(body);
      const html = render({ finalPrompt: body, prepareWebCopyPrompt: prepare, selectedEngine: provider });
      const preview = field(html, 'final-prompt-editor');
      assert.equal(preview.text, escapeHtml(expected));
      assert.match(preview.attributes, /readonly=""/i);
      const editor = field(html, 'prompt-body-editor');
      assert.equal(editor.text, escapeHtml(body));
      assert.doesNotMatch(editor.attributes, /readonly/i);
      assert.equal(splitWebPromptForPaste(expected).join(''), expected);
      assert.equal(await new Blob([expected]).text(), expected);
      if (provider === 'openai') assert.equal(ensureWebPromptTrailingNewline(appendOpenAIReferencePrompt(body, plan)), expected);
      assert.equal((preview.text.match(/IMAGE REFERENCE ROLES/g) || []).length, 1);
    }
  });
}

test('invalid preparation cannot silently display the incomplete body as the final prompt', () => {
  const body = '保持する編集内容';
  const html = render({ finalPrompt: body, prepareWebCopyPrompt: () => { throw new Error('参照設定を確認してください。'); } });
  assert.equal(field(html, 'final-prompt-editor').text, '');
  assert.equal(field(html, 'prompt-body-editor').text, body);
  assert.match(html, /role="alert"/);
  assert.match(html, /参照設定を確認してください。/);
});

test('empty prompt never exports a reference-only instruction', () => {
  let calls = 0;
  const html = render({ finalPrompt: '', prepareWebCopyPrompt: () => { calls++; return '参照だけ'; } });
  assert.equal(field(html, 'final-prompt-editor').text, '');
  assert.equal(calls, 0);
});

test('oversized exports remain fully visible and recoverable without weakening the API limit', () => {
  const body = '本文。'.repeat(11000);
  const plan = buildOpenAIReferencePlan({ colorMode: 'monochrome' });
  const prepare = value => ensureWebPromptTrailingNewline(appendOpenAIWebReferencePrompt(value, plan));
  const html = render({ finalPrompt: body, prepareWebCopyPrompt: prepare });
  assert.equal(field(html, 'final-prompt-editor').text, escapeHtml(prepare(body)));
  assert.throws(() => appendOpenAIReferencePrompt(body, plan), /上限|32,000/);
});
