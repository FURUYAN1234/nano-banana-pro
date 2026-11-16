import test from 'node:test';import assert from 'node:assert/strict';import {startBridge} from '../src/bridge.mjs';import {compactPageTransport,assertPageTransportBudget} from '../src/page-transport.mjs';import {AssetStore} from '../src/assets.mjs';
const image={__mangaAsset:true,id:'a'.repeat(64),sha256:'a'.repeat(64),mimeType:'image/png',bytes:100};
test('oversized retained history is rejected before hydration rather than terminating JSON transport',()=>{
 assert.doesNotThrow(()=>assertPageTransportBudget({images:[image]}));
 assert.throws(()=>assertPageTransportBudget({history:Array(8).fill({...image,bytes:49_999_999})}),{code:'PAGE_PAYLOAD_TOO_LARGE'});
});
test('page transport preserves authored state and removes only superseded image copies',()=>{
 const snapshot={bookPageContext:{projectId:'p',pageId:'page',assetSignature:[],assets:[{dataUrl:image}],appliedImages:[image],continuityReferences:[image]},scenario:'',manualTopic:'brief',images:[image],referenceAssets:[{image,items:[{name:'A'}]}],castList:'',generatedImage:image};
 const project={id:'p',recognition:{images:[image],referenceAssets:[{image}],castList:'fallback',bg360Analysis:'retained'}};
 const result=compactPageTransport(project,{id:'page',snapshot},[]);
 assert.equal(result.snapshot.scenario,'');assert.equal(result.snapshot.manualTopic,'brief');assert.deepEqual(result.snapshot.generatedImage,image);assert.equal(result.snapshot.bookPageContext.assets,undefined);assert.equal(result.snapshot.bookPageContext.appliedImages,undefined);
 assert.equal(result.recognition.images,undefined);assert.equal(result.recognition.referenceAssets,undefined);assert.equal(result.recognition.castList,undefined);assert.equal(result.recognition.bg360Analysis,'retained');assert.equal(snapshot.bookPageContext.assets.length,1);
 const stale=compactPageTransport(project,{id:'page',snapshot},['new:asset:prop']);assert.equal(stale.snapshot.images,undefined);assert.deepEqual(stale.recognition.images,[image]);
 const fresh=compactPageTransport(project,{id:'page'},[]);assert.deepEqual(fresh.recognition.images,[image]);
});
test('one hydrate operation reads each immutable image once without caching across operations or hiding invalid IDs',async()=>{
 const store=new AssetStore({});let count=0;store.dataUrl=async value=>{count++;assert.equal(value.id,image.id);return 'data:image/png;base64,AA==';};
 assert.deepEqual(await store.hydrate({images:[image],references:[{image}]}),{images:['data:image/png;base64,AA=='],references:[{image:'data:image/png;base64,AA=='}]});assert.equal(count,1);await store.hydrate(image);assert.equal(count,2);
 await assert.rejects(store.hydrate([image,{...image,id:'invalid'}]));
});
test('JSON serialization failure returns an error before headers and the bridge stays alive',async()=>{
 const jobs={heartbeat:()=>({unsupported:1n})};const bridge=await startBridge({store:{},jobs,appRoot:'.',distDirectory:'.',port:0,mcpHttp:{token:'local-test',health:()=>({unsupported:1n})}});
 try{const response=await fetch(bridge.origin+'/health',{headers:{Authorization:'Bearer local-test'}});assert.equal(response.status,400);assert.equal((await response.json()).error.code,'BRIDGE_FAILED');const alive=await fetch(bridge.origin+'/health');assert.equal(alive.status,401);}finally{await bridge.close();}
});
import {ProjectStore} from '../src/store.mjs';import {JobQueue}from'../src/jobs.mjs';import{promises as fs}from'node:fs';import os from'node:os';import path from'node:path';
test('oversized dispatch fails before asset reads and releases the active queue slot',async()=>{
 const directory=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||os.tmpdir(),'manga-budget-'));try{
 const store=await new ProjectStore(directory).init(),project=await store.create({name:'Budget'},'create'),page=project.pages[0];page.snapshot={format:1,bookPageContext:{projectId:project.id,pageId:page.id,assetSignature:[]},scenario:'approved',images:Array(8).fill({...image,bytes:49_999_999})};await store.atomic(await store.projectPath(project.id),project);
 await fs.mkdir(path.join(directory,'downloads'),{recursive:true});const jobs=await new JobQueue(store,{downloadsDirectory:path.join(directory,'downloads')}).init();await jobs.connect('budget',['apply_page','read_state']);const first=await jobs.submit({projectId:project.id,pageId:page.id,expectedRevision:1,idempotencyKey:'too-large',operation:'apply_page'});
 await assert.rejects(jobs.next('budget'),{code:'PAGE_PAYLOAD_TOO_LARGE'});assert.equal(jobs.get(first.id).state,'failed');assert.equal(jobs.get(first.id).executionStarted,false);
 const next=await jobs.submit({projectId:project.id,pageId:page.id,expectedRevision:1,idempotencyKey:'safe-read',operation:'read_state'});assert.equal((await jobs.next('budget')).job.id,next.id);
 }finally{await fs.rm(directory,{recursive:true,force:true});}
});

test('only explicit recognition reset omits a foreign snapshot; ordinary apply still rejects and same-page data stays intact',()=>{
 const project={id:'new',recognition:{images:['current-sheet']}};const foreign={id:'target',snapshot:{bookPageContext:{projectId:'old',pageId:'old-page',assetSignature:[]},generationHistory:[{img:'foreign-image'}],scenario:'foreign-script'}};
 assert.throws(()=>compactPageTransport(project,foreign,[]),{code:'PAGE_SNAPSHOT_MISMATCH'});
 const reset=compactPageTransport(project,foreign,[],{recognitionReset:true});assert.equal(reset.foreignSnapshotOmitted,true);assert.equal(reset.snapshot,undefined);assert.deepEqual(reset.recognition.images,['current-sheet']);
 const same={id:'target',snapshot:{bookPageContext:{projectId:'new',pageId:'target',assetSignature:[]},generationHistory:[{img:'own-image'}],scenario:'approved script',manualTopic:'own topic'}};const kept=compactPageTransport(project,same,[],{recognitionReset:true});assert.equal(kept.snapshot.scenario,'approved script');assert.equal(kept.snapshot.generationHistory[0].img,'own-image');assert.equal(kept.snapshot.manualTopic,'own topic');assert.equal(kept.foreignSnapshotOmitted,undefined);
});
