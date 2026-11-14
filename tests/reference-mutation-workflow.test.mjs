import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {reconcileReferenceCast, remapReferenceNumbers, mergeReferenceAnalysis, buildRecognitionEditorText, buildWebReferencePlan, editReferenceAsset, parseCharacterEditorText, getReferenceCharacterRequirement} from '../src/lib/reference-assets.js';
import {DEFAULT_OPENAI_STEP1_MODEL_ID, DEFAULT_OPENAI_STEP3_MODEL_ID} from '../src/lib/openai-model-routes.js';
import {getWorkflowStep} from '../src/lib/generation-history.js';

const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8');
// Execute the actual event/transition functions with observable state setters.
// Network response ordering is tested separately by image-intake-workflow.
function workflow() {
  const a = {image:'a',analysisCompleted:true,items:[{kind:'character',name:'A',description:'front'}],castProfiles:{A:'## A\nFront view'}};
  const b = {image:'b',analysisCompleted:true,items:[{kind:'prop',name:'box',description:'User box'}]};
  const state = {castList:'## A\nFront view',images:['a','b'],scenario:'old scenario',finalPrompt:'old prompt',manualTopic:'画像2を使う。画像3を舞台にする。',bg360Image:'panorama',isAnalyzing:true,is360Analyzing:true};
  const ctx = { promptAssemblyRunRef:{current:0}, DEFAULT_OPENAI_STEP1_MODEL_ID, DEFAULT_OPENAI_STEP3_MODEL_ID,
    DEFAULT_CATEGORIES:[], reconcileReferenceCast,remapReferenceNumbers,editReferenceAsset,parseCharacterEditorText,castNameBaselineRef:{current:state.castList},finishScenarioTiming:()=>{},cancelApiWork:()=>{state.cancelled=true;},
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
  for (const name of ['invalidateScenarioRun','invalidateReferenceOutputs','setImages','setCastList','setReferenceAssets','setBg360Image','setBg360Enabled','resetPageCaches','partialReset','step1Reset','hardReset','editReferenceItem','editCastList']) ctx[name]=bind(name);
  return {state,ctx,a,b};
}

test('the actual STEP1 textarea callback retains an invalid paste, blocks generation/copy, then accepts Story format',()=>{
  const step1=readFileSync(new URL('../src/components/Step1Panel.jsx',import.meta.url),'utf8');
  const app=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8');
  const textarea=step1.match(/<textarea\s+id="reference-recognition-editor"[\s\S]*?\/>/)[0];
  const callback=textarea.match(/onChange=\{\(e\) => (\w+)\(e.target.value\)\}/)[1];
  assert.match(app,new RegExp(callback+'=\\{'+callback+'\\}'),'the UI callback is the one supplied by the app');
  assert.match(textarea,/value=\{castEditorText\}/);assert.match(app,/castEditorText=\{castEditorText\}/);
  assert.match(source,/castEditorText: castDraft \?\? castList/,'rejected drafts remain visible in the actual textarea');
  const {state,ctx}=workflow();ctx.setImages([]);
  const stepExpression=source.match(/const currentStep = ([\s\S]*?);/)[1];
  const step=()=>new Function('referenceEditorError','castList','scenario','finalPrompt','generatedImage','promptAssemblyRunRef','generationHistory','getWorkflowStep',`return ${stepExpression};`)(state.referenceEditorError,ctx.castListRef.current,state.scenario,state.finalPrompt,null,{},[],getWorkflowStep);
  const invalid='Topic: 動作確認\nScenario:\n[1コマ目] これは人物情報ではありません。';
  ctx[callback](invalid);
  assert.equal(state.castDraft,invalid);assert.equal(ctx.castListRef.current,'');assert.match(state.referenceEditorError,/Story Maker/);assert.equal(step(),1);
  const copyExpression=step1.match(/const canCopyRecognition = ([\s\S]*?);/)[1];
  const canCopy=()=>new Function('isAnalyzing','recognitionText','referenceEditorError','images','referenceAssets','imageInputError','imageInputBudget',`return ${copyExpression};`)(false,buildRecognitionEditorText(ctx.castListRef.current,ctx.referenceAssetsRef.current,ctx.imagesRef.current),state.referenceEditorError,ctx.imagesRef.current,ctx.referenceAssetsRef.current,'',null);
  assert.equal(canCopy(),false);
  const normal='## 1. 葵\n外見: 黒い短髪\n服装: 青灰色の作業着';ctx[callback](normal);
  assert.equal(ctx.castListRef.current,normal);assert.equal(state.castDraft,null);assert.equal(state.referenceEditorError,'');assert.equal(canCopy(),true);assert.equal(step(),2);
  ctx[callback](invalid);assert.equal(ctx.castListRef.current,normal,'invalid replacement never becomes an accepted cast');assert.equal(state.castDraft,invalid);assert.equal(canCopy(),false);assert.equal(step(),1);
  ctx[callback]('');assert.equal(ctx.castListRef.current,'');assert.equal(state.referenceEditorError,'');assert.equal(canCopy(),false);
});

test('the actual character editor merges Story profiles without losing other images or local name edits',()=>{
  const {ctx,state}=workflow();
  ctx.editCastList('## 1. 葵\n外見: 黒い短髪\n服装: 青灰色の作業着');
  assert.match(ctx.castListRef.current,/## A/);assert.match(ctx.castListRef.current,/## 1\. 葵/);
  assert.deepEqual(ctx.referenceAssetsRef.current.map(a=>a.image),['a','b']);
  assert.equal(ctx.referenceAssetsRef.current[1].items[0].name,'box');
  const accepted=ctx.castListRef.current;
  ctx.editCastList('Topic: 動作確認\nScenario:\n[1コマ目] これは人物情報ではありません。');
  assert.match(state.referenceEditorError,/Story Maker/);assert.equal(ctx.castListRef.current,accepted);
});

test('deleting or clearing the last actor leaves supporting materials intact and blocks downstream work until a person returns',()=>{
  const {ctx,state}=workflow();
  const expression=source.match(/const referenceEditorError = ([^;]+);/)[1];
  const currentError=()=>new Function('referenceEditorInputError','getReferenceCharacterRequirement','castList','referenceAssets','images','bg360Enabled','bg360Image',`return ${expression};`)(state.referenceEditorError||'',getReferenceCharacterRequirement,ctx.castListRef.current,ctx.referenceAssetsRef.current,ctx.imagesRef.current,ctx.bg360EnabledRef.current,ctx.bg360ImageRef.current);
  assert.equal(currentError(),'');
  ctx.setImages(['b']);
  assert.equal(ctx.castListRef.current,'');assert.match(currentError(),/人物を1人以上/);assert.doesNotMatch(currentError(),/受け入れていません/);
  assert.equal(ctx.referenceAssetsRef.current[0].items[0].kind,'prop');assert.equal(ctx.bg360ImageRef.current,'panorama');
  const character='## 1. 葵\n外見: 黒い短髪\n服装: 青灰色の作業着';ctx.editCastList(character);
  assert.equal(currentError(),'');assert.equal(ctx.castListRef.current,character);
  ctx.editCastList('');assert.match(currentError(),/人物を1人以上/);
  ctx.setImages([]);assert.match(currentError(),/人物を1人以上/,'360 background alone has the same requirement');
  ctx.setBg360Enabled(false);assert.equal(currentError(),'','an empty start has no misleading material error');
  for(const callback of ['generateScenarioFromNews','assemblePrompt','runFullAuto']) {
    const start=source.indexOf(`const ${callback} = `),body=source.slice(start,source.indexOf('\n  };',start));
    assert.match(body,/if \(referenceEditorError\)/,`${callback} respects the same derived prerequisite`);
  }
});

test('actual STEP1 handlers synchronize in both directions, including clear-then-type and subsequent deletion',()=>{
  const {state,ctx}=workflow();
  state.recognitionDraft='old serialized recognition';
  ctx.editReferenceItem('a',0,'name','Named');
  assert.match(ctx.castListRef.current,/## Named/);
  assert.equal(state.recognitionDraft,null);
  assert.equal(state.scenario,''); assert.equal(state.finalPrompt,'');
  ctx.editCastList(ctx.castListRef.current.replace('## Named','## '));
  ctx.editCastList(ctx.castListRef.current.replace('## ','## Final'));
  assert.equal(ctx.referenceAssetsRef.current[0].items[0].name,'Final');
  assert.equal(ctx.referenceAssetsRef.current[0].castProfiles.Final,'## Final\nFront view');
  ctx.setImages(['b']);
  assert.equal(ctx.castListRef.current,'');
});

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
