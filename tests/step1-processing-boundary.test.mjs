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
    assert.doesNotMatch(pending, /<details class="reference-material-details"[^>]*\sopen=/);
    const unknownFinished = render({ images: ['new-image'], recognitionText: '種類を判別できませんでした',
      referenceAssets: [{ image: 'new-image', analysisCompleted: true, items: [{ kind: 'unknown' }] }] });
    assert.doesNotMatch(copy(unknownFinished)[1], /\sdisabled=""/);
    assert.match(unknownFinished, /<details class="reference-material-details"[^>]*\sopen=""/);
    const ready = render({ images: ['ready-image'], recognitionText: '背景・小物の認識結果',
      referenceAssets: [{ image: 'ready-image', items: [{ kind: 'prop' }, { kind: 'background' }] }] });
    assert.doesNotMatch(copy(ready)[1], /\sdisabled=""/);
    assert.match(ready, /reference-recognition-editor/);
    assert.match(ready, /<details class="reference-material-details"[^>]*\sopen=""/);
    const textOnly=render({castList:'## 1. 葵\n外見: 黒髪\n服装: 青い服\n'+'長い人物設定\n'.repeat(100),referenceAssets:[{image:'deleted',analysisCompleted:true,items:[{kind:'character',name:'Removed',description:'古い認識'}]}]});
    assert.doesNotMatch(textOnly, /<details class="reference-material-details"[^>]*\sopen=/);
    assert.doesNotMatch(textOnly,/Removed|古い認識/);
    assert.match(textOnly,/画像の認識結果はありません/);
    for(const html of [ready,textOnly,render({})])assert.match(html,/<textarea id="reference-recognition-editor" rows="6"/);
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

test('thumbnail hover and compact recognition follow current images, not recognition arrival order', async () => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { default: Step1 } = await server.ssrLoadModule('/src/components/Step1Panel.jsx');
    const html = renderToStaticMarkup(React.createElement(Step1, {
      images: ['prop', 'sheet'], currentStep: 1, castList: '## A\nProfile',
      referenceAssets: [
        {image:'deleted', items:[{kind:'background',name:'Removed',description:'Old'}]},
        {image:'sheet', items:[{kind:'character',name:'A',description:'Red coat'}, {kind:'character',name:'B',description:'Blue coat'}]},
        {image:'prop', items:[{kind:'prop',name:'Key',description:'Round handle'}]},
      ],
      imageInputBudget: {characterImageCount:2,maxCharacterImages:14,remaining:12,fits:true},
    }));
    assert.match(html, /<div[^>]*class="reference-thumbnail"[^>]*title="画像1\n小物: Key/);
    assert.doesNotMatch(html, /Removed|画像3の素材/);
    assert.match(html, /<summary>素材ごとの認識詳細：小物 Key ／ 人物 A ／ 人物 B<\/summary>/);
    assert.match(html, /aria-label="画像1の素材1の名前"[^>]*value="Key"/);
    assert.match(html, /aria-label="画像2の素材2の名前"[^>]*value="B"/);
    const details = html.indexOf('<details class="reference-material-details"');
    const detailsEnd = html.indexOf('</details>',details);
    const characters = html.indexOf('class="reference-recognition-scroll"');
    assert.ok(details > 0 && details < html.indexOf('class="reference-recognition-item"'));
    assert.ok(detailsEnd < characters && characters < html.indexOf('id="reference-recognition-editor"'),'material details are above and outside the character field');
    assert.match(html, /class="reference-recognition-row"/);
    assert.doesNotMatch(html, /rows="2"/);
  } finally { await server.close(); }
});

test('common character field keeps its base height while open material descriptions alone grow',async()=>{
  const [panel,css]=await Promise.all(['src/components/Step1Panel.jsx','src/index.css'].map(path=>readFile(new URL('../'+path,import.meta.url),'utf8')));
  const characterCss=css.match(/\.reference-recognition-editor\s*\{([^}]+)\}/)[1];
  assert.match(characterCss,/(?:^|;)\s*height:\s*160px;/);assert.match(characterCss,/min-height:\s*160px;/);
  assert.match(characterCss,/overflow-y:\s*auto;/);assert.match(characterCss,/resize:\s*vertical;/);
  assert.doesNotMatch(css.match(/\.reference-recognition-scroll\s*\{([^}]+)\}/)[1],/max-height|overflow/);
  const effects=[...panel.matchAll(/useLayoutEffect\(\(\) => \{([\s\S]*?)\n  \}, \[([^\]]*)\]\);/g)];
  assert.equal(effects.length,2);
  const listeners=new Map(),fields=[{style:{height:'original'},scrollHeight:120},{style:{height:'original'},scrollHeight:60}];
  const details={open:false,clientWidth:400,querySelectorAll:selector=>{assert.equal(selector,'textarea');return fields;},addEventListener:(type,callback)=>listeners.set(type,callback),removeEventListener:type=>listeners.delete(type)};
  let resized,disconnected=false;
  const cleanup=new Function('materialDetailsRef','ResizeObserver',effects[1][1])({current:details},class {constructor(fn){resized=fn;}observe(node){assert.equal(node,details);}disconnect(){disconnected=true;}});
  assert.equal(fields[0].style.height,'original','closed contents are not measured at zero height');
  new Function('materialDetailsRef','hasRecognizedMaterials',effects[0][1])({current:details},true);
  listeners.get('toggle')();assert.deepEqual(fields.map(f=>f.style.height),['122px','62px']);
  fields[0].scrollHeight=210;details.clientWidth=250;resized();assert.equal(fields[0].style.height,'212px');
  details.open=false;fields[0].scrollHeight=0;listeners.get('toggle')();assert.equal(fields[0].style.height,'212px');
  assert.doesNotMatch(effects[0][2],/referenceAssets|castList|castEditorText/,'ordinary edits do not force a manually closed list open');
  assert.match(effects[0][2],/images/);assert.match(effects[0][2],/materialReadyState/);
  new Function('materialDetailsRef','hasRecognizedMaterials',effects[0][1])({current:details},false);assert.equal(details.open,false,'removing recognized images closes the list');
  cleanup();assert.equal(listeners.size,0);assert.equal(disconnected,true);
});
