import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs/promises';import vm from'node:vm';
import{preserveMcpRecognitionScenario,assertMcpApplyCommitted,selectMcpPageSnapshot}from'../src/lib/mcp/page-state.js';
const source=await fs.readFile(new URL('../src/App.jsx',import.meta.url),'utf8');const start=source.indexOf('  const executeMcpOperation = '),end=source.indexOf('\n  const nativePageModeEnabled',start);const body=source.slice(start+'  const executeMcpOperation = '.length,end).trim().replace(/;$/,'');
test('actual recognition dispatcher applies new target before clearing/processing, preventing cross-book context/history while keeping same-page script',async()=>{
 for(const samePage of[false,true]){
 const project={id:'new',pages:[{id:'target',index:1}],plan:{detail:{pages:[{pageId:'target',scenario:'approved scenario'}]}}};
 let state={bookPageContext:{projectId:samePage?'new':'old',pageId:samePage?'target':'old-page',assetSignature:[]},scenario:samePage?'explicit own script':'foreign script',originalScenario:samePage?'explicit own script':'foreign script',generationHistory:[{id:samePage?'own-history':'foreign-history'}]};
 const snapshot=samePage?structuredClone(state):undefined,events=[];
 const workflow={captureMcpState:()=>structuredClone(state),waitForMcpCommit:async()=>{},markMcpCompletion(){},prepareMcpRecognition(){events.push('prepare');state.images=[];state.referenceAssets=[];},applyMcpPage(job){events.push('apply');const saved=selectMcpPageSnapshot(job.snapshot,project.id,'target',[]);state={...saved,bookPageContext:{projectId:'new',pageId:'target',applicationToken:'committed',assetSignature:[]},scenario:saved?.scenario??'approved scenario',originalScenario:saved?.originalScenario??'approved scenario',generationHistory:saved?.generationHistory??[]};return{applicationToken:'committed'};}};
 const processFiles=async()=>{events.push('process');assert.equal(state.bookPageContext.projectId,'new');assert.equal(state.bookPageContext.pageId,'target');assert.equal(state.generationHistory.length,samePage?1:0);state.scenario='';return true;};
 const execute=vm.runInNewContext('('+body+')',{workflow,isApiProcessing:false,processFiles,preserveMcpRecognitionScenario,assertMcpApplyCommitted,Date,File,atob,Uint8Array});const context={throwIfCancelled(){},invoke:job=>execute(job,context)};
 const result=await execute({operation:'recognition',projectId:'new',pageId:'target',project,page:{id:'target',index:1},snapshot,assets:[]},context);
 assert.deepEqual(events,['apply','prepare','process']);assert.equal(result.snapshot.bookPageContext.projectId,'new');assert.equal(result.snapshot.scenario,samePage?'explicit own script':'approved scenario');assert.equal(result.snapshot.originalScenario,result.snapshot.scenario);assert.equal(result.snapshot.generationHistory.length,samePage?1:0);
 }
});
