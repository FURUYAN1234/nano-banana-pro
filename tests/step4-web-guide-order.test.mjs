import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

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
