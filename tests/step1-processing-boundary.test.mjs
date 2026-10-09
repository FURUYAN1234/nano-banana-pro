import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import { readFile } from 'node:fs/promises';

test('downstream steps and footer cannot extend the page past the active recognition progress', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
  assert.match(app, /<div hidden=\{isAnalyzing\}><Step2Panel/);
  assert.match(app, /\{!isAnalyzing && !isSearching && currentStep >= 3/);
  assert.match(app, /\{!isAnalyzing && !isSearching && !isAssembling && Boolean\(finalPrompt/);
  assert.match(app, /\{!isAnalyzing && !isSearching && !isAssembling && <footer/);
});

test('STEP1 exposes editing and copying only after recognition, preserving manual editing', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step1 } = await server.ssrLoadModule('/src/components/Step1Panel.jsx');
    const base = { images: [], referenceAssets: [], recognitionText: '', currentStep: 1,
      imageInputBudget: { characterImageCount: 0, maxCharacterImages: 14, remaining: 14, fits: true } };
    const render = props => renderToStaticMarkup(React.createElement(Step1, { ...base, ...props }));
    const copy = html => [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].find(([, , body]) => /認識結果をコピー/.test(body));
    const busy = render({ isAnalyzing: true, recognitionText: 'pending', images: ['pending-image'] });
    assert.doesNotMatch(busy, /reference-recognition-editor/);
    assert.equal(copy(busy), undefined);
    const pending = render({ images: ['new-image'], recognitionText: '未解析の素材',
      referenceAssets: [{ image: 'new-image', items: [{ kind: 'unknown' }] }] });
    assert.match(copy(pending)[1], /\sdisabled=""/);
    const unknownFinished = render({ images: ['new-image'], recognitionText: '種類を判別できませんでした',
      referenceAssets: [{ image: 'new-image', analysisCompleted: true, items: [{ kind: 'unknown' }] }] });
    assert.doesNotMatch(copy(unknownFinished)[1], /\sdisabled=""/);
    const ready = render({ images: ['ready-image'], recognitionText: '背景・小物の認識結果',
      referenceAssets: [{ image: 'ready-image', items: [{ kind: 'prop' }, { kind: 'background' }] }] });
    assert.doesNotMatch(copy(ready)[1], /\sdisabled=""/);
    assert.match(ready, /reference-recognition-editor/);
    assert.doesNotMatch(copy(render({ recognitionText: '手入力の人物設定' }))[1], /\sdisabled=""/);
    assert.match(copy(render({ recognitionText: '設定', referenceEditorError: 'invalid' }))[1], /\sdisabled=""/);
  } finally { await server.close(); }
});

test('recognition copy reports success only after clipboard completion and reports rejection',async()=>{
  const panel=await readFile(new URL('../src/components/Step1Panel.jsx',import.meta.url),'utf8');
  const callback=panel.match(/onClick=\{async \(\) => \{([\s\S]*?)\n            \}\}/)[1];
  for(const reject of [false,true]) {
    let copied=false, message='',finish;
    const clipboard={writeText:()=>new Promise((resolve,fail)=>{finish=()=>reject?fail(new Error('denied')):resolve();})};
    const handler=new Function('navigator','recognitionText','setIsCastListCopied','setTimeout','showStatus',`return async()=>{${callback}}`)({clipboard},'content',v=>{copied=v;},()=>{},m=>{message=m;});
    const run=handler(); assert.equal(copied,false); finish(); await run;
    assert.equal(copied,!reject); if(reject)assert.match(message,/コピーできません/);
  }
});
