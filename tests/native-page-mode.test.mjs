import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {createServer} from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const hook=await readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
const start=hook.indexOf('const changePageMode = ');
const callback=hook.slice(start+'const changePageMode = '.length,hook.indexOf('\n  };',start)+4);
function modeState() {
  const state={punchlineType:'Auto',isApiProcessing:false,experimentalEnabled:false,scenario:'four',originalScenario:'four-original',scenarioThought:'four audit',explanation:'four explanation',explanationNotice:'',mangaTitle:'four title',enhanceLog:'four edit',lockedLocation:'room',lockedOutfit:'coat',bg360CameraWork:null,bg360CroppedPanels:[],castListRef:{current:'cast'},colorMode:'color',showWatermarks:true,mosaicCopyrightedCharacters:true,selectedEngine:'openai',openAIImageQuality:'max',scenarioUsedModelRef:{current:'four-model'},usedModel:'four-model',imagesRef:{current:[]},referenceAssetsRef:{current:[]},bg360EnabledRef:{current:false},bg360ImageRef:{current:null},bg360Analysis:null,styleJson:{},getCurrentPromptProviderFamily:()=> 'chatgpt',inputMode:'manual',manualTopic:'original',promptAssemblyRunRef:{current:1,completedRun:1},resolvedPunchlineTypeRef:{current:'four-ending'},finalPrompt:'four-prompt',generatedImage:'four-image',generationHistory:[{img:'four-history'}],genLog:['four-image-log'],assembleThought:'four assembly',showStatus:()=>{},invalidatePromptAssembly:()=>{},scenarioRunEpochRef:{current:0}};
  const scope=new Proxy(state,{has:()=>true,get:(s,k)=>{if(k===Symbol.unscopables)return undefined;if(k in s)return s[k];if(/^set[A-Z]/.test(k))return v=>{s[k[3].toLowerCase()+k.slice(4)]=v;};if(k==='updateResolvedPunchlineType')return v=>{s.resolvedPunchlineTypeRef.current=v;};if(k in globalThis)return globalThis[k];throw Error('Missing dependency '+String(k));}});
  return {state,change:new Function('scope',`with(scope){return (${callback});}`)(scope)};
}
test('switching preserves separate scenarios, provenance and completed output for each mode',()=>{
  const {state,change}=modeState();assert.equal(change(true),true);state.experimentalEnabled=true;
  assert.equal(state.scenario,'');assert.equal(state.originalScenario,'');assert.equal(state.finalPrompt,'');
  Object.assign(state,{scenario:'six',originalScenario:'six-original',scenarioThought:'six audit',finalPrompt:'six-prompt',generatedImage:'six-image',generationHistory:[{img:'six-history'}]});state.scenarioUsedModelRef.current='six-model';
  assert.equal(change(false),true);state.experimentalEnabled=false;
  assert.equal(state.scenario,'four');assert.equal(state.originalScenario,'four-original');assert.equal(state.scenarioThought,'four audit');assert.equal(state.scenarioUsedModelRef.current,'four-model');assert.equal(state.finalPrompt,'four-prompt');assert.equal(state.generatedImage,'four-image');
  change(true);state.experimentalEnabled=true;assert.equal(state.scenario,'six');assert.equal(state.finalPrompt,'six-prompt');assert.equal(state.scenarioUsedModelRef.current,'six-model');
});
test('shared settings invalidate an old prompt without discarding either mode scenario or image',()=>{
  const {state,change}=modeState();change(true);state.experimentalEnabled=true;state.scenario='six';state.colorMode='monochrome';change(false);
  assert.equal(state.scenario,'four');assert.equal(state.finalPrompt,'');assert.equal(state.generatedImage,'four-image');
});
test('busy mode cannot switch or discard work',()=>{const {state,change}=modeState();state.isApiProcessing=true;assert.equal(change(true),false);assert.equal(state.scenario,'four');});
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const {default:Panel}=await server.ssrLoadModule('/src/components/ExperimentalMangaPanel.jsx');
  test('mode switch is available before STEP2 and explains native scenario creation in both states',()=>{
    for(const enabled of [false,true]) {
      const html=renderToStaticMarkup(React.createElement(Panel,{enabled,currentStep:2,onModeChange:()=>{}}));
      assert.match(html,/role="switch"/);assert.match(html,/最初から5〜8コマ/);assert.doesNotMatch(html,/元の4コマ台本|保存していた4コマ用プロンプトへ戻り/);
    }
    assert.equal(renderToStaticMarkup(React.createElement(Panel,{currentStep:1})), '');
  });
  test('App places the switch before STEP2 rather than wrapping STEP3',async()=>{
    const app=await readFile(new URL('../src/App.jsx',import.meta.url),'utf8');
    assert.ok(app.indexOf('<ExperimentalMangaPanel')<app.indexOf('<Step2Panel'));
    assert.doesNotMatch(app,/<\/ExperimentalMangaPanel>/);
  });
} finally {await server.close();}
