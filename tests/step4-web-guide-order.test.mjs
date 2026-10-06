import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('ChatGPT Web disclosure starts closed and contains every manual action, leaving API generation outside', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx');
    const props = {
      currentStep: 4, finalPrompt: 'OUTPUT: Single image.', genLog: [],
      policyErrorMsg: '', castList: '', scenario: '', webCopyPartLengths: [9463, 9471, 3833],
    };
    for (const mode of [{ selectedEngine: 'openai' }, { selectedEngine: 'gemini', enableChatGPTMode: true }]) {
      const html = renderToStaticMarkup(React.createElement(Step4Panel, { ...props, ...mode }));
      const disclosure = html.match(/<details class="web-prompt-disclosure">([\s\S]*?)<\/details>/)?.[1];
      assert.ok(disclosure, 'native details has no open attribute, so it starts closed');
      assert.match(disclosure, /<summary[^>]*>ChatGPTのWebでプロンプトを貼り付け（API節約可能）<\/summary>/);
      for (const text of ['ChatGPT Webへの貼り付け手順', '全文プロンプトを.txtで保存する', 'Web版生成用 制作情報JSONを保存', '制作情報JSONは後で制作条件を確認']) {
        assert.ok(disclosure.includes(text), text);
      }
      assert.doesNotMatch(disclosure, /APIで新しい画像を生成する/);
      assert.match(html.slice(html.indexOf('</details>') + '</details>'.length), /APIで新しい画像を生成する/);
      if (mode.selectedEngine === 'openai') {
        assert.ok(disclosure.includes('1/3 をコピー'));
        assert.ok(disclosure.includes('全文を一括コピー'));
      }
    }
    const geminiHtml = renderToStaticMarkup(React.createElement(Step4Panel, { ...props, selectedEngine: 'gemini' }));
    assert.doesNotMatch(geminiHtml, /web-prompt-disclosure/);
    assert.match(geminiHtml, /プロンプトをコピーする（Web \/ Work用）/);
  } finally {
    await server.close();
  }
});

test('STEP4 places Web safety help between upscale and video guides with scoped labels', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx');
    const html = renderToStaticMarkup(React.createElement(Step4Panel, {
      currentStep: 4, finalPrompt: 'OUTPUT: Single image.', genLog: [],
      policyErrorMsg: '', castList: '', scenario: '', webCopyPartLengths: [],
    }));
    const upscale = html.indexOf('画像比率修正・アップスケール（web貼り付け時）');
    const safety = html.indexOf('安全基準（ポリシー）に引っかかって画像が出ない場合（web貼り付け時）');
    const video = html.indexOf('4コマ漫画を動画化（miniMax H3/ComfyUI）');
    assert.ok(upscale >= 0 && safety > upscale && video > safety);
    assert.doesNotMatch(html, />FURUの4コマ漫画を動画化（MiniMax H3 \/ ComfyUI）<\/span>/);
  } finally {
    await server.close();
  }
});
