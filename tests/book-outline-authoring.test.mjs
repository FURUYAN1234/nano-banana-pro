import test from 'node:test';import assert from 'node:assert/strict';import{createServer}from'vite';
import{buildBookDetail,assertBookDetailDialogue,bookDetailContinuity,bookDetailDialogueEntries}from'../src/lib/mcp/book-detail.js';
import{createBookPageMode}from'../src/lib/page-production-contract.js';
const cast='## 1. Nagi\nAdult courier, blue hair, speaks calmly.';
const scene=(speech='',state='Nagi holds the cable with the box closed.')=>`[1コマ目]\n[Camera: Low angle]\n[EMOTION: NORMAL]\n状況: ${state}\n${speech||'セリフなし'}\nBalloonLayout: []`;
const project=()=>({brief:'Two friends prepare a screening on the same terrace in one evening.',castBible:cast,settings:{},pages:[1,2].map(i=>({id:'p'+i,kind:'comic',panelCount:1,presentation:{}})),plan:{outline:{synopsis:'Preparation then screening',cast:[],assetSpecs:[],pages:[{pageId:'p1',beat:'Prepare the cable',direction:'Wide foreground acting'},{pageId:'p2',beat:'Connect the projector',direction:'Continue the same scene'}]},detail:{pages:[{pageId:'p1',outfit:'BAD PREVIOUS DRAFT OUTFIT',scenario:'BAD PREVIOUS DRAFT'}]}}});
test('outline adapter carries only newly established bounded wardrobe/location/object state, not old bad detail or prior speech/Camera/style',async()=>{
 const p=project(),before=structuredClone(p),calls=[];
 const result=await buildBookDetail(p,async input=>{calls.push(input);return{scenario:scene('Nagi:「Ready?」'),location:'Terrace at dusk',outfit:'Nagi wears a blue windbreaker and dark pants'};});
 assert.equal(calls.length,2);assert.equal(calls[0].bookOutlineExpansion,true);assert.doesNotMatch(calls[0].referenceAssetContext,/BAD PREVIOUS DRAFT/);
 assert.match(calls[1].referenceAssetContext,/blue windbreaker/);assert.match(calls[1].referenceAssetContext,/Terrace at dusk/);assert.match(calls[1].referenceAssetContext,/holds the cable/);assert.doesNotMatch(calls[1].referenceAssetContext,/Ready\?|Low angle|EMOTION|BalloonLayout/);assert.equal(result.detail.pages[1].outfit,result.detail.pages[0].outfit);assert.deepEqual(p,before);
 const huge=bookDetailContinuity([{pageId:'p0',kind:'comic',location:'L'.repeat(9000),outfit:'O'.repeat(9000),scenario:scene('', 'S'.repeat(9000))}]);assert.ok(JSON.stringify(huge).length<5000);
});
test('explicit current scene/clothes changes override inherited continuity without unconditional customOutfit freeze',async()=>{
 const p=project();p.pages[1].settings={customLocation:'Mountain, next morning',customOutfit:'Nagi wears a raincoat'};p.plan.outline.pages[1].direction='The next morning, change into a raincoat and move to the mountain.';
 const calls=[];await buildBookDetail(p,async input=>{calls.push(input);return{scenario:scene('Nagi:「Let us go.」'),location:input.customLocation||'Terrace',outfit:input.customOutfit||'Nagi wears a blue windbreaker'};});
 assert.equal(calls[1].customLocation,'Mountain, next morning');assert.equal(calls[1].customOutfit,'Nagi wears a raincoat');assert.match(calls[1].manualTopic,/next morning/);assert.match(calls[1].referenceAssetContext,/Current explicit scene\/time jump.*takes precedence/);
});
test('whole-book guard rejects actual all-silent output, ignoring quoted SFX/title/END; individual silent page remains valid',()=>{
 const p=project(),silent=p.pages.map(page=>({...page,scenario:scene('', 'A sign reads「END」. SFX「CLANG」.')}));
 assert.throws(()=>assertBookDetailDialogue(p,silent,cast),error=>error.code==='BOOK_DIALOGUE_MISSING'&&error.diagnosticContext.stage==='book_detail_authoring');
 const malformed=structuredClone(silent);malformed[0].scenario=scene('人物の正式名:「Nagi」');malformed[1].scenario=scene('Nagi: セリフなし。');assert.throws(()=>assertBookDetailDialogue(p,malformed,cast),{code:'BOOK_DIALOGUE_MISSING'});
 assert.equal(bookDetailDialogueEntries(scene('Nagi:「セリフなし。」'),cast).length,1,'literal quoted dialogue remains literal speech');
 const mixed=structuredClone(silent);mixed[1].scenario=scene('Nagi:「Ready.」');assert.doesNotThrow(()=>assertBookDetailDialogue(p,mixed,cast));
 p.plan.outline.pages[0].direction='This page is entirely silent. 全コマ無言';assert.throws(()=>assertBookDetailDialogue(p,silent,cast),{code:'BOOK_DIALOGUE_MISSING'});
 p.brief='全編セリフなしのサイレント漫画。';assert.doesNotThrow(()=>assertBookDetailDialogue(p,silent,cast));
 p.brief='サイレント漫画ではなく会話のある物語。';assert.throws(()=>assertBookDetailDialogue(p,silent,cast),{code:'BOOK_DIALOGUE_MISSING'});
});
test('actual detail publication rejects entirely silent ordinary draft but accepts explicitly silent book without a speech quota',async()=>{
 const p=project(),before=structuredClone(p);
 await assert.rejects(buildBookDetail(p,async()=>({scenario:scene('Nagi: セリフなし。'),outfit:'Blue jacket',location:'Terrace'})),{code:'BOOK_DIALOGUE_MISSING'});assert.deepEqual(p,before);
 p.brief='A wordless comic about preparing a screening.';
 const result=await buildBookDetail(p,async()=>({scenario:scene(),outfit:'Blue jacket',location:'Terrace'}));assert.equal(result.detail.pages.length,2);
});
test('failure and cancellation preserve source plan and never publish partial generated detail',async()=>{
 for(const cancel of[false,true]){
 const p=project(),before=structuredClone(p),controller=new AbortController();let count=0;
 await assert.rejects(buildBookDetail(p,async()=>{count++;if(count===1){if(cancel)controller.abort();return{scenario:scene('Nagi:「Ready.」'),outfit:'Nagi wears a blue jacket'};}throw new Error('Provider failure');},{signal:controller.signal}));assert.deepEqual(p,before);assert.equal(count,cancel?1:2);
 }
});
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true,hmr:false}});
try{const{getScenarioPrompt}=await server.ssrLoadModule('/src/lib/prompts.js');
 test('authoring is opt-in: natural original speech allowed, explicit silent/literal text preserved, ordinary/imported contract unchanged',()=>{
 const base={scenarioMode:createBookPageMode(2),manualTopic:'Nagi:「Exact supplied words.」\n2コマ目はセリフなし。',customLocation:'',customOutfit:'',punchlineType:'Auto',inputMode:'manual'};
 const original=getScenarioPrompt(base),expanded=getScenarioPrompt({...base,bookOutlineExpansion:true});
 assert.doesNotMatch(original,/あらすじから新規ネームへ展開/);assert.match(expanded,/原文に台詞が書かれていないことは無言指定ではない/);assert.match(expanded,/明示された無言・セリフなしの範囲は守り/);assert.match(expanded,/提示済みの正確な台詞は文字列を保つ/);assert.match(expanded,/話者数のノルマは設けず/);assert.match(expanded,/季節から毎ページ選び直さない/);assert.match(expanded,/現在ページに明示の着替え.*優先/);assert.ok(expanded.includes('Exact supplied words.'));
 const ordinary=getScenarioPrompt({...base,scenarioMode:'four-panel',bookOutlineExpansion:true});assert.doesNotMatch(ordinary,/あらすじから新規ネームへ展開/);
 });
}finally{await server.close();}
