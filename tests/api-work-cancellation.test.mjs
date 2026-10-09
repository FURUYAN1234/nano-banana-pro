import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFile } from 'node:fs/promises';

test('force stop aborts text/image requests and streamed bodies without provider fallback; the next action can resume', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  const originalFetch = globalThis.fetch;
  try {
    const control = await server.ssrLoadModule('/src/lib/api-work-cancellation.js');
    const openai = await server.ssrLoadModule('/src/lib/openai.js');
    const openaiText = await server.ssrLoadModule('/src/lib/openai-text.js');
    const gemini = await server.ssrLoadModule('/src/lib/gemini.js');
    const imagen = await server.ssrLoadModule('/src/lib/imagen.js');
    const calls = [
      ['OpenAI text', () => openai.setOpenAIApiKey('unit-test-credential'), () => openaiText.callOpenAIText('Test request')],
      ['Gemini text', () => gemini.setApiKey('unit-test-credential'), () => gemini.callThinkingGemini('Test request')],
      ['OpenAI image', () => openai.setOpenAIApiKey('unit-test-credential'), () => openai.generateImageWithOpenAI('Test image', () => {})],
      ['OpenAI reference edit', () => openai.setOpenAIApiKey('unit-test-credential'), () => openai.generateImageWithOpenAI('Test image', () => {}, { imageInputs: [{image_url:'data:image/png;base64,aGVsbG8='}] })],
      ['Gemini image', () => gemini.setApiKey('unit-test-credential'), () => imagen.generateImageWithImagen('Test image', () => {})],
    ];
    for (const [name, configure, run] of calls) {
      for (const streamedBody of name.startsWith('OpenAI') ? [false, true] : [false]) {
        control.beginApiWork();
        configure();
        let started, signalAtStart, requestCount = 0;
        const ready = new Promise(resolve => { started = resolve; });
        globalThis.fetch = async (_url, options) => {
          if (name === 'OpenAI reference edit') assert.match(_url, /\/images\/edits$/);
          requestCount++;
          signalAtStart = options.signal;
          assert.ok(signalAtStart, name);
          if (streamedBody) {
            const body = new ReadableStream({ start(controller) {
              signalAtStart.addEventListener('abort', () => controller.error(new DOMException('Stopped', 'AbortError')), { once: true });
            } });
            started();
            return new Response(body, { headers: { 'Content-Type': 'text/event-stream' } });
          }
          return new Promise((_resolve, reject) => {
            signalAtStart.addEventListener('abort', () => reject(new DOMException('Stopped', 'AbortError')), { once: true });
            started();
          });
        };
        const pending = run();
        await ready;
        control.cancelApiWork();
        await assert.rejects(pending, error => error.code === 'CANCELLED', name);
        assert.equal(requestCount, 1, `${name}: no fallback or stream retry after stop`);
        assert.equal(signalAtStart.aborted, true);
        control.beginApiWork();
        assert.equal(signalAtStart.aborted, true, 'the obsolete request stays cancelled');
        assert.equal(control.getApiWorkSignal().aborted, false, 'next explicit action has a fresh signal');
      }
    }
  } finally {
    globalThis.fetch = originalFetch;
    await server.close();
  }
});

test('STOP cancels an already-open image stream even without transport abort propagation', async () => {
  const server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const {readOpenAIImageStream} = await server.ssrLoadModule('/src/lib/openai.js');
    const controller = new AbortController();
    let cancelled = false;
    const response = new Response(new ReadableStream({cancel(){cancelled=true;}}));
    const pending = readOpenAIImageStream(response,()=>{}, {signal:controller.signal});
    controller.abort();
    const result = await Promise.race([pending.then(()=> 'completed',error=>error.code),new Promise(resolve=>setTimeout(()=>resolve('still waiting'),100))]);
    assert.equal(result,'CANCELLED');
    assert.equal(cancelled,true);
  } finally {await server.close();}
});

test('STOP removes old image-wait status and preserves the acquired data', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
  const start = source.indexOf('const stopApiProcessing = () => {');
  const body = source.slice(start,source.indexOf('\n  };',start)+5).replace('const stopApiProcessing =','return');
  let logs = ['[OpenAI] request sent','[WAIT] ⏳ 画像生成中… 合計13秒経過'];
  let cancelled = false, epoch = 0;
  const noop = () => {};
  const values = {cancelApiWork:()=>{cancelled=true;},fullAutoAbortRef:{current:false},isFullAutoModeRef:{current:false},isEndlessModeRef:{current:false},scenarioRunEpochRef:{current:0},
    invalidateScenarioRun:()=>{epoch++;},isAnalyzing:false,is360Analyzing:false,isAssembling:false,isGeneratingImage:true,isFixingPolicy:false,policyAutoRetrying:false,
    setAnalyzeThought:noop,setAssembleThought:noop,setGenLog:update=>{logs=update(logs);},setIsAnalyzing:noop,isAnalyzingRef:{current:false},setIs360Analyzing:noop,
    setIsEndlessMode:noop,setIsSearching:noop,setIsAssembling:noop,setIsGeneratingImage:noop,setIsFixingPolicy:noop,setIs360CameraWorking:noop,setIsFullAutoMode:noop,setFullAutoStep:noop,setIsAborting:noop,showStatus:noop};
  new Function(...Object.keys(values),body)(...Object.values(values))();
  assert.equal(cancelled,true); assert.equal(epoch,1);
  assert.ok(logs.includes('[OpenAI] request sent'));
  assert.ok(logs.some(log=>log.startsWith('[STOPPED]')));
  assert.ok(!logs.some(log=>log.startsWith('[WAIT]')));
});

test('fixed control bar always shows a pale-orange/red stop button, enabled only for processing', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: ControlBar } = await server.ssrLoadModule('/src/components/ControlBar.jsx');
    for (const busy of [false, true]) {
      const html = renderToStaticMarkup(React.createElement(ControlBar, { isApiProcessing: busy }));
      const button = html.match(/<button([^>]*)class="api-force-stop"([^>]*)>解析・生成強制ストップ<\/button>/);
      assert.ok(button);
      assert.equal((button[1] + button[2]).includes('disabled'), !busy);
      assert.match(html, /fixed top-0/);
    }
    const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
    assert.match(css, /\.api-force-stop,\s*\.api-force-stop:disabled\s*\{[^}]*background-color: #fed7aa;[^}]*color: #b91c1c;[^}]*opacity: 1;/);
    assert.match(css, /\.api-force-stop,\s*\.api-force-stop:disabled\s*\{[^}]*border-radius: 0;/);
  } finally {
    await server.close();
  }
});
