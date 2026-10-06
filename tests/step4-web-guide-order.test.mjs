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
      assert.match(disclosure, /<summary[^>]*>ChatGPTのWebでプロンプトを貼り付け（API節約可能）／4コマ漫画を動画化<\/summary>/);
      for (const text of ['ChatGPT Webへの貼り付け手順', '全文プロンプトを.txtで保存する', 'Web版生成用 制作情報JSONを保存', '制作情報JSONは後で制作条件を確認', '画像比率修正・アップスケール（web貼り付け時）', '安全基準（ポリシー）に引っかかって画像が出ない場合（web貼り付け時）']) {
        assert.ok(disclosure.includes(text), text);
      }
      assert.doesNotMatch(disclosure, /APIで新しい画像を生成する/);
      assert.ok(disclosure.includes('プロンプトが添付ファイルになった場合でも、環境によりテキストフィールドへ戻せる場合は全文貼付が可能です'));
      assert.doesNotMatch(disclosure, /TXTを使う場合はテキストフィールドへ戻す必要はありません/);
      const metadataHelp = disclosure.indexOf('ChatGPTへ貼り付ける必要はありません。');
      const imageHelp = disclosure.indexOf('画像比率修正・アップスケール（web貼り付け時）');
      const policyHelp = disclosure.indexOf('安全基準（ポリシー）に引っかかって画像が出ない場合（web貼り付け時）');
      assert.ok(metadataHelp >= 0 && imageHelp > metadataHelp && policyHelp > imageHelp);
      const videoHelp = disclosure.indexOf('4コマ漫画を動画化（miniMax H3/ComfyUI）');
      assert.ok(videoHelp > policyHelp, 'video help is nested after safety help');
      assert.equal((html.match(/aria-controls="video-guide-content"/g) || []).length, 1);
      assert.doesNotMatch(disclosure, /aria-controls="api-settings-content"/);
      assert.equal((html.match(/aria-controls="image-help-content"/g) || []).length, 1);
      assert.match(html.slice(html.indexOf('</details>') + '</details>'.length), /APIで新しい画像を生成する/);
      if (mode.selectedEngine === 'openai') {
        for (const [part, count] of [['1/3', '9,463'], ['2/3', '9,471'], ['3/3', '3,833']]) {
          assert.ok(disclosure.includes(`${part} をコピー（${count}文字）`));
        }
        assert.ok(disclosure.includes('全文を一括コピー'));
        assert.ok(disclosure.includes('22,767文字'));
      }
    }
    const geminiHtml = renderToStaticMarkup(React.createElement(Step4Panel, { ...props, selectedEngine: 'gemini' }));
    assert.doesNotMatch(geminiHtml, /web-prompt-disclosure/);
    assert.match(geminiHtml, /プロンプトをコピーする（Web \/ Work用）/);
  } finally {
    await server.close();
  }
});

test('API settings stay outside Web help and immediately precede STEP4 with a small gap for every engine', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx');
    for (const mode of [{ selectedEngine: 'openai' }, { selectedEngine: 'gemini', enableChatGPTMode: true }, { selectedEngine: 'gemini' }]) {
      const html = renderToStaticMarkup(React.createElement(Step4Panel, {
        currentStep: 4, finalPrompt: 'OUTPUT: Single image.', genLog: [],
        policyErrorMsg: '', castList: '', scenario: '', webCopyPartLengths: [], ...mode,
      }));
      const settings = html.indexOf('aria-controls="api-settings-content"');
      const step4 = html.indexOf('APIで新しい画像を生成する（STEP4）');
      assert.ok(settings >= 0 && settings < step4);
      assert.equal((html.match(/aria-controls="api-settings-content"/g) || []).length, 1);
      assert.match(html.slice(0, settings), /style="margin:0 0 6px"[^>]*><button[^>]*$/);
      assert.doesNotMatch(html.slice(settings, step4), /aria-controls="(?:image-help|video-guide)-content"/);
    }
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
