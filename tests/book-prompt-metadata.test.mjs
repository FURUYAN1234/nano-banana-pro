import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs/promises';import vm from'node:vm';import{createServer}from'vite';
import{createBookPageMode}from'../src/lib/page-production-contract.js';
import{normalizeBookPromptMetadata,bookPromptContext}from'../src/lib/book-prompt-metadata.js';
const cast='## 1. Nagi\n| Hair | blue short hair | (blue short hair:1.4) |\n| Outfit | Japanese sailor school uniform | (Japanese sailor school uniform:1.3), (red neckerchief:1.2) |';
const script='[1コマ目]\n[Camera: low-angle view]\n[EMOTION: NORMAL]\n状況: Nagi connects the projector cable.\nNagi:「Ready.」\nBalloonLayout: [{"speaker":"Nagi","text":"Ready.","x":0.7,"y":0.2,"w":0.2,"h":0.2,"tail":"Nagi mouth","anchor":"right","route":"clear sky"}]';
const meta={title:'五人で灯す上映会',location:'Same terrace at dusk',outfit:'Nagi wears a blouse, denim pants and zip-up jacket'};
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true,hmr:false}});
try{const native=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const read=(scenario=script,bookMetadata=meta,colorMode='monochrome')=>native.readExperimentalSource({scenario,bookMetadata,castList:cast,colorMode,scenarioMode:createBookPageMode(1),allowScenarioQualityWarning:true});
 const plan=source=>native.validateExperimentalPlan({count:1,layout:'vertical_page',reason:'Connect cable in one visual beat',panels:[{sourcePanel:1,kind:'anchor',camera:'low-angle view',action:'Nagi connects the projector cable.',dialogueIds:[0]}]},source);
 test('actual hook adapter supplies book metadata separately and leaves ordinary input unmodified',async()=>{
  const hook=await fs.readFile(new URL('../src/hooks/useMangaWorkflow.js',import.meta.url),'utf8'),a=hook.indexOf('  const experimentalInput = '),b=hook.indexOf('\n  const changePageMode',a),body=hook.slice(a+'  const experimentalInput = '.length,b).trim().replace(/;$/,'');
  for(const book of[true,false]){
   const env={scenario:script,getScenarioMode:()=>createBookPageMode(1),castListRef:{current:cast},colorMode:'monochrome',mosaicCopyrightedCharacters:false,showWatermarks:false,showTitle:true,bookPageContextRef:{current:book?{projectTitle:meta.title,presentation:{logoText:meta.title,coverLayout:'hero_top'},pageIndex:1}:null},lockedLocation:meta.location,lockedOutfit:meta.outfit,getCurrentPromptProviderFamily:()=> 'chatgpt',inputMode:'manual',manualTopic:'Approved story',isOpenAIEngine:false,GEMINI_IMAGE_MODEL:'gemini-nano-banana-fixture',OPENAI_SCENARIO_MODEL_OPTIONS:[],scenarioUsedModelRef:{current:null},buildReferenceAssetContext:()=>'',referenceAssetsRef:{current:[]},imagesRef:{current:[]},bg360Enabled:false,bg360Analysis:null,hasCharacterReferenceImages:()=>true,bg360Image:null,summarizeExperimentalLayouts:()=>[],generationHistoryRef:{current:[]}};
   const input=vm.runInNewContext('('+body+')',env)();assert.equal(input.scenario,script);assert.equal(Boolean(input.bookMetadata),book);
   if(book){const source=native.readExperimentalSource(input),prompt=native.buildExperimentalImagePrompt(plan(source),source,{...input,promptMaxChars:32000});assert.ok(prompt.includes(meta.title));assert.ok(prompt.includes(meta.outfit));assert.doesNotMatch(prompt,/Japanese sailor school uniform|red neckerchief/);}
  }
 });
 test('book title/location/outfit survive actual mono and color compilation and QA while literal script is unchanged',()=>{
  for(const colorMode of['color','monochrome']){const source=read(script,meta,colorMode),p=plan(source);const prompt=native.buildExperimentalImagePrompt(p,source,{colorMode,showTitle:true,providerFamily:'chatgpt',promptMaxChars:32000});assert.equal(source.scenario,script);assert.ok(prompt.includes(meta.title));assert.ok(prompt.includes(meta.location));assert.ok(prompt.includes(meta.outfit));assert.doesNotMatch(prompt,/Japanese sailor school uniform|red neckerchief/);assert.doesNotMatch(prompt,/Top title EXACTLY "無題"/);const qa=native.buildExperimentalReviewPrompt(p,source,{showTitle:true,colorMode});assert.ok(qa.includes(meta.title));assert.ok(qa.includes(meta.outfit));}
 });
 test('explicit current-page headers override book scene defaults and partial/missing metadata uses normal behavior',()=>{
  const explicit='Topic: Chapter title\nLocation: New room\nOutfit: Nagi wears a raincoat\n'+script,source=read(explicit);assert.match(source.context,/Topic: Chapter title/);assert.match(source.context,/Location: New room/);assert.match(source.context,/Outfit: Nagi wears a raincoat/);assert.doesNotMatch(source.context,/Same terrace|denim pants|五人で/);
  assert.equal(bookPromptContext('Outfit: Explicit',{outfit:'Fallback'}),'Outfit: Explicit');
  const multiline={...meta,outfit:'アカリ: ブラウス\nヒカリ: デニム\r\nミク: ジップアップ\nリン: パーカー\nサエコ: カーディガン',location:'Terrace\n at dusk'};const normalized=normalizeBookPromptMetadata(multiline);assert.equal(normalized.outfit,'アカリ: ブラウス ヒカリ: デニム ミク: ジップアップ リン: パーカー サエコ: カーディガン');assert.equal(normalized.location,'Terrace at dusk');assert.ok(bookPromptContext('',normalized).includes(normalized.outfit));
  const markdown='## タイトル: 明示の題名\nOutfit: Explicit jacket\nLocation: Explicit room';const markdownContext=bookPromptContext(markdown,normalized);assert.equal(markdownContext,markdown);const markdownSource=read(markdown+'\n'+script,normalized);assert.equal(markdownSource.scenario,markdown+'\n'+script);assert.ok(native.buildExperimentalImagePrompt(plan(markdownSource),markdownSource,{colorMode:'monochrome',showTitle:true,promptMaxChars:32000}).includes('明示の題名'));assert.doesNotMatch(markdownSource.context,/五人で|ブラウス/);
  assert.equal(bookPromptContext('',{}),'');
  for(const colorMode of['color','monochrome']){const original=native.readExperimentalSource({scenario:explicit,castList:cast,colorMode,scenarioMode:createBookPageMode(1),allowScenarioQualityWarning:true});assert.equal(original.bookMetadata,undefined);assert.equal(original.scenario,explicit);assert.ok(original.context.includes('Nagi wears a raincoat'));}
 });
 test('malformed metadata fails before prompt/API; changed metadata rejects stale prepared image dispatch',async()=>{
  for(const value of [{outfit:5},{outfit:'x'.repeat(16001)},{privateToken:'secret'},[]])assert.throws(()=>normalizeBookPromptMetadata(value),{code:'BOOK_METADATA_INVALID'});
  const source=read(),p=plan(source),prompt=native.buildExperimentalImagePrompt(p,source,{colorMode:'monochrome',showTitle:true,promptMaxChars:32000});let imageCalls=0;
  await assert.rejects(native.runExperimentalManga({enabled:true,scenario:script,bookMetadata:{...meta,outfit:'Different clothes'},castList:cast,colorMode:'monochrome',scenarioMode:createBookPageMode(1),prepared:{source,plan:p,prompt}},{image:async()=>{imageCalls++;}}),/STEP3/);assert.equal(imageCalls,0);
 });
}finally{await server.close();}
