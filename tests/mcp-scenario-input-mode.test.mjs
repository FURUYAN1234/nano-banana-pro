import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs/promises';import vm from'node:vm';
import{assertAppliedMcpPage,validatePageSettings}from'../src/lib/mcp/contract.js';
const app=await fs.readFile(new URL('../src/App.jsx',import.meta.url),'utf8'),a=app.indexOf('  const executeMcpOperation = '),b=app.indexOf('\n  const nativePageModeEnabled',a),dispatchBody=app.slice(a+'  const executeMcpOperation = '.length,b).trim().replace(/;$/,'');
const hook=await fs.readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8'),h=hook.indexOf('  const generateScenarioFromNews = '),boundary=hook.indexOf('\n      if (scenarioRunEpoch !== scenarioRunEpochRef.current) {',hook.indexOf('      const result = await generateScenario({',h));
// Execute the real entry/guards/reset/provider-input boundary; provider settlement/UI formatting is outside this routing regression.
const hookBody=hook.slice(h+'  const generateScenarioFromNews = '.length,boundary)+'\nreturn result; } finally { clearInterval(scenarioTimer); setIsSearching(false); } };';
async function run({mode,topic='',checked=true,stale=false}){
 const calls=[],resets=[],alerts=[];const categories=[{id:'science',label:'科学',keywords:'space science',checked},{id:'sports',label:'スポーツ',keywords:'sports',checked:false}];
 const epoch={current:1,resume:null};
 const env={referenceEditorError:'',beginApiWork(){},castList:'## 1. Nagi\nAdult courier.',isSearching:false,categories,inputMode:mode,scenario:'APPROVED ORIGINAL SCRIPT',isFullAutoModeRef:{current:false},isEndlessModeRef:{current:false},isOpenAIEngine:true,manualTopic:topic,alert:x=>alerts.push(x),invalidateScenarioRun:()=>1,scenarioRunEpochRef:epoch,updateResolvedPunchlineType(){},scenarioUsedModelRef:{current:null},showStatus:()=>null,targetDate:'2026-11-15',Date,setInterval:()=>1,clearInterval(){},createScenarioSourceKey:async()=> 'source',recentScenarioTextsRef:{current:[]},generationHistory:[],getScenarioMode:()=> 'four-panel',collectRecentPageCompositions:()=>[],collectRecentScenarioOutcomes:()=>[],findScenarioSourceKey:()=>null,mosaicCopyrightedCharacters:true,buildReferenceAssetContext:()=>'',referenceAssetsRef:{current:[]},imagesRef:{current:[]},bg360Enabled:false,bg360Analysis:null,searchTopic:'news query',customLocation:'',customOutfit:'',punchlineType:'Auto',bg360Image:null,bg360ImageParts:null,styleJson:null,scenarioModelId:'gpt-6-luna',generateScenario:async input=>{calls.push(input);return{scenario:'NEW DRAFT'};}};
 for(const name of new Set([...hookBody.matchAll(/\b(set[A-Z]\w*)\(/g)].map(m=>m[1])))env[name]=value=>{if(name==='setScenario')resets.push(value);};
 const generateScenarioFromNews=vm.runInNewContext('('+hookBody.trim().replace(/;$/,'')+')',env);
 const settings=validatePageSettings({inputMode:mode,newsCategories:checked?['science']:[],targetDate:env.targetDate,engine:'openai'});const page={id:'page',kind:'comic',panelCount:4,presentation:{},settings:{}};const project={id:'project',pages:[page],settings,assetBindings:{}};
 const state={scenario:'APPROVED ORIGINAL SCRIPT',images:[],settings,bookPageContext:{projectId:'project',pageId:'page',panelCount:4,kind:'comic',presentation:{},appliedSettings:settings,appliedEngine:'openai',assetSignature:[],appliedImages:[]}};
 const workflow={captureMcpState:()=>structuredClone(state),waitForMcpCommit:async()=>{},markMcpCompletion(){}};
 const dispatch=vm.runInNewContext('('+dispatchBody+')',{Date,isApiProcessing:false,workflow,generateScenarioFromNews,assertAppliedMcpPage,assertMcpRecognitionReady(){},readMcpDiagnostics:async()=>({events:[]}),readDiagnostics(){}});
 let error;try{await dispatch({operation:'scenario',projectId:'project',pageId:'page',project,expectedScenario:stale?'CHANGED SCRIPT':'APPROVED ORIGINAL SCRIPT'},{throwIfCancelled(){}});}catch(cause){error=cause;}
 return{calls,resets,alerts,error,state};
}
test('MCP news dispatch uses actual news categories/date despite empty manual topic',async()=>{
 const result=await run({mode:'news'});assert.equal(result.error,undefined);assert.equal(result.calls.length,1);assert.equal(result.calls[0].inputMode,'news');assert.equal(result.calls[0].targetDate,'2026-11-15');assert.equal(result.calls[0].categories.filter(c=>c.checked)[0].id,'science');assert.equal(result.calls[0].manualTopic,'');assert.equal(result.alerts.length,0);
});
test('MCP manual dispatch preserves literal topic and provider model, never becomes news',async()=>{
 const topic='Literal manual story: 台詞「そのまま」。';const result=await run({mode:'manual',topic});assert.equal(result.calls.length,1);assert.equal(result.calls[0].inputMode,'manual');assert.equal(result.calls[0].manualTopic,topic);assert.equal(result.calls[0].scenarioModelId,'gpt-6-luna');assert.equal(result.error,undefined);
});
test('empty manual input or missing news selection fails preflight without provider call or script reset',async()=>{
 for(const args of [{mode:'manual',topic:''},{mode:'news',checked:false}]){const result=await run(args);assert.equal(result.calls.length,0);assert.equal(result.resets.length,0);assert.equal(result.alerts.length,1);assert.equal(result.state.scenario,'APPROVED ORIGINAL SCRIPT');}
});
test('approved page ownership/scenario guard remains before either provider path',async()=>{
 for(const mode of['manual','news']){const result=await run({mode,topic:'valid manual',stale:true});assert.equal(result.error.code,'PAGE_SCENARIO_STALE');assert.equal(result.calls.length,0);assert.equal(result.resets.length,0);}
});
