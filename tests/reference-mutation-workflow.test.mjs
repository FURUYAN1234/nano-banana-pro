import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {reconcileReferenceCast, remapReferenceNumbers, mergeReferenceAnalysis, buildRecognitionEditorText, buildWebReferencePlan} from '../src/lib/reference-assets.js';

const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
// Execute the actual event/transition functions with observable state setters.
// Network response ordering is tested separately by image-intake-workflow.
function workflow() {
  const a = {image:'a',analysisCompleted:true,items:[{kind:'character',name:'A',description:'front'}],castProfiles:{A:'## A\nFront view'}};
  const b = {image:'b',analysisCompleted:true,items:[{kind:'prop',name:'box',description:'User box'}]};
  const state = {castList:'## A\nFront view',images:['a','b'],scenario:'old scenario',finalPrompt:'old prompt',manualTopic:'画像2を使う。画像3を舞台にする。',bg360Image:'panorama',isAnalyzing:true,is360Analyzing:true};
  const ctx = {
    DEFAULT_CATEGORIES:[], reconcileReferenceCast,remapReferenceNumbers,finishScenarioTiming:()=>{},cancelApiWork:()=>{state.cancelled=true;},
    invalidatePromptAssembly:()=>{},showStatus:()=>{},resetScenarioModelId:()=>{},
    scenarioRunEpochRef:{current:5},scenarioUsedModelRef:{current:null},qualityRetryAbortRef:{current:false},fullAutoAbortRef:{current:false},
    isFullAutoModeRef:{current:true},isEndlessModeRef:{current:true},isAnalyzingRef:{current:true},
    imagesRef:{current:state.images},referenceAssetsRef:{current:[a,b]},castListRef:{current:state.castList},castRevisionRef:{current:1},
    bg360ImageRef:{current:'panorama'},bg360EnabledRef:{current:true},recentScenarioTextsRef:{current:[]},lastPolicyErrorRef:{current:''},
    assertImageInputBudget:()=>{},
  };
  for (const name of new Set([...source.matchAll(/\b(set[A-Z]\w*)\(/g)].map(match=>match[1]))) ctx[name]=value=>{
    const key=name[3].toLowerCase()+name.slice(4); state[key]=typeof value==='function'?value(state[key]):value;
  };
  const bind = name => (...args) => {
    const definition=source.match(new RegExp('const '+name+' = (\\([^\\n]*\\)) => \\{([\\s\\S]*?)\\n  \\};'));
    assert.ok(definition,name);
    return new Function(...Object.keys(ctx),`return ${definition[1]} => {${definition[2]}}`)(...Object.values(ctx))(...args);
  };
  for (const name of ['invalidateScenarioRun','invalidateReferenceOutputs','setImages','setCastList','setReferenceAssets','setBg360Image','setBg360Enabled','partialReset','step1Reset','hardReset','editReferenceItem']) ctx[name]=bind(name);
  return {state,ctx,a,b};
}

for(const action of ['partialReset','step1Reset','hardReset']) test(`${action} releases recognition state and synchronous guard, rejecting obsolete completion`,()=>{
  const {state,ctx}=workflow(); const oldEpoch=ctx.scenarioRunEpochRef.current;
  ctx[action]();
  assert.equal(state.isAnalyzing,false); assert.equal(state.is360Analyzing,false); assert.equal(ctx.isAnalyzingRef.current,false);
  assert.ok(ctx.scenarioRunEpochRef.current>oldEpoch); assert.equal(state.cancelled,true);
  assert.equal(ctx.isFullAutoModeRef.current,false); assert.equal(ctx.isEndlessModeRef.current,false);
  if(action==='partialReset') {assert.equal(state.bg360Image,'panorama'); assert.equal(ctx.bg360EnabledRef.current,true); assert.equal(ctx.imagesRef.current.length,2);}
  else {assert.equal(ctx.imagesRef.current.length,0); assert.equal(ctx.bg360ImageRef.current,null);}
});

test('delete rebuilds cast and numbering and discards stale outputs; no-op preserves current output',()=>{
  const {state,ctx,b}=workflow();
  ctx.setImages(['a','b']); assert.equal(state.finalPrompt,'old prompt');
  ctx.setImages(['b']);
  assert.equal(ctx.castListRef.current,''); assert.deepEqual(ctx.referenceAssetsRef.current,[b]);
  assert.equal(state.manualTopic,'画像1を使う。画像2を舞台にする。');
  assert.equal(state.scenario,''); assert.equal(state.finalPrompt,''); assert.equal(state.generatedImage,null);
  assert.ok(ctx.scenarioRunEpochRef.current>5);
});

test('panorama OFF invalidates outputs and cannot redirect its number to a surviving prop',()=>{
  const {state,ctx}=workflow(); ctx.setBg360Enabled(false);
  assert.equal(state.finalPrompt,''); assert.equal(state.scenario,'');
  assert.match(state.manualTopic,/削除済み素材（旧画像3）/);
  assert.equal(state.bg360Image,'panorama');
});

test('successive add, reorder, middle/front deletion and re-add keep recognition, edits, cast and Web numbers attached to images',()=>{
  const {state,ctx,a}=workflow();
  const verify = expected => {
    assert.deepEqual(ctx.imagesRef.current,expected);
    assert.deepEqual(ctx.referenceAssetsRef.current.map(asset=>asset.image),expected);
    const web=buildWebReferencePlan({images:expected,referenceAssets:ctx.referenceAssetsRef.current,backgroundImage:'panorama',backgroundEnabled:true});
    assert.deepEqual(web.referenceImages,[...expected,'panorama']);
    assert.match(web.rolePrompt,new RegExp(`Image ${expected.length+1}: BACKGROUND REFERENCE`));
    const copy=buildRecognitionEditorText(ctx.castListRef.current,ctx.referenceAssetsRef.current,expected);
    expected.forEach((image,index)=>{
      const asset=ctx.referenceAssetsRef.current.find(item=>item.image===image);
      for(const item of asset.items)assert.ok(copy.includes(`画像${index+1}｜`) && copy.includes(JSON.stringify(item.name)));
      assert.ok(web.rolePrompt.split('\n').find(line=>line.startsWith(`Image ${index+1}:`)).includes(asset.items[0].name));
    });
  };
  ctx.setImages(current=>[...current,'c']);
  const incoming={castList:'',assets:[{image:'c',items:[{kind:'background',name:'Garden',description:'Trees'}]}]};
  ctx.setReferenceAssets(mergeReferenceAnalysis(ctx.referenceAssetsRef.current,incoming,ctx.imagesRef.current));
  verify(['a','b','c']); assert.match(state.manualTopic,/画像4を舞台/);
  ctx.setImages(['c','a','b']); verify(['c','a','b']);
  ctx.editReferenceItem('b',0,'description','Edited handle');
  assert.equal(ctx.referenceAssetsRef.current[2].items[0].description,'Edited handle');
  ctx.setImages(current=>current.filter(image=>image!=='a')); verify(['c','b']);
  assert.equal(ctx.castListRef.current,'');
  assert.equal(ctx.referenceAssetsRef.current[1].items[0].description,'Edited handle');
  ctx.setImages(current=>current.filter(image=>image!=='c')); verify(['b']);
  assert.match(state.manualTopic,/画像1を使う。画像2を舞台/);
  ctx.setImages(current=>[...current,'a']);
  const before=ctx.referenceAssetsRef.current;
  const after=mergeReferenceAnalysis(before,{castList:a.castProfiles.A,assets:[a]},ctx.imagesRef.current);
  ctx.setCastList(reconcileReferenceCast(ctx.castListRef.current,before,after)); ctx.setReferenceAssets(after);
  verify(['b','a']); assert.equal(ctx.castListRef.current,a.castProfiles.A);
  ctx.setImages([]); verify([]); assert.equal(ctx.castListRef.current,'');
  assert.match(state.manualTopic,/削除済み素材/);
});
