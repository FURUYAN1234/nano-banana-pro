import test from 'node:test';
import assert from 'node:assert/strict';
import {promises as fs} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ProjectStore,approvalHash,pageGenerationMetadata} from '../src/store.mjs';
import {JobQueue} from '../src/jobs.mjs';
import {buildGenerationSaveSnapshot} from '../../src/lib/generation-history.js';

const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6tZkAAAAASUVORK5CYII=';
const original={id:1794919643001,img:png,selected:false,metadataContext:{scenario:'Approved scene',finalPrompt:'Original approved rendering',settings:{auto_quality_repair:false}}};
const repair={id:1794919643002,img:png,selected:true,metadataContext:{scenario:'Approved scene',finalPrompt:'Automatic repair rendering',settings:{auto_quality_repair:true}}};

test('history adoption checkpoints only the requested original as selected without mutating retained input',async()=>{
  const root=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||os.tmpdir(),'history-select-metadata-'));
  try{
    const store=await new ProjectStore(root).init();
    let project=await store.create({name:'History metadata',totalPages:1},'create');
    await store.setPlan({projectId:project.id,expectedRevision:project.revision,idempotencyKey:'plan',outline:'Approved outline',detail:{pages:[{pageId:project.pages[0].id,scenario:'Approved scene'}]}});
    project=await store.get(project.id);
    await store.requestApproval({projectId:project.id,expectedRevision:project.revision,idempotencyKey:'approve',action:'record_user_response',decision:'approve',userResponse:'Fixture approval',planHash:approvalHash(project),planRevision:project.plan.revision});
    project=await store.get(project.id);
    const downloads=path.join(root,'downloads');await fs.mkdir(downloads);
    const jobs=await new JobQueue(store,{downloadsDirectory:downloads}).init();await jobs.connect('browser',['edit_state']);
    const submitted=await jobs.submit({projectId:project.id,pageId:project.pages[0].id,expectedRevision:project.revision,idempotencyKey:'select-original',operation:'edit_state',input:{action:'history_select',historyId:String(original.id)}});
    const {job}=await jobs.next('browser');await jobs.start('browser',{jobId:submitted.id,attemptId:job.attemptId});
    const snapshot={scenario:'Approved scene',finalPrompt:'Original approved rendering',generatedImage:repair.img,generationHistory:structuredClone([repair,original])};
    const before=structuredClone(snapshot);
    const oldPayload={...snapshot,generatedImage:original.img,accepted:true,generationHistory:[original,repair]};
    assert.deepEqual(pageGenerationMetadata(oldPayload).context,repair.metadataContext);
    await assert.rejects(jobs.checkpointPage('browser',{jobId:job.id,attemptId:job.attemptId,pageId:project.pages[0].id,dataUrl:png,metadata:original.metadataContext,snapshot:oldPayload}),{code:'GENERATION_METADATA_MISMATCH'});
    const selected=buildGenerationSaveSnapshot(snapshot,original);
    assert.deepEqual(snapshot,before);
    assert.deepEqual(selected.generationHistory.map(h=>[h.id,h.selected]),[[original.id,true],[repair.id,false]]);
    assert.deepEqual(pageGenerationMetadata(selected).context,original.metadataContext);
    await assert.rejects(jobs.checkpointPage('browser',{jobId:job.id,attemptId:job.attemptId,pageId:project.pages[0].id,dataUrl:png,metadata:repair.metadataContext,snapshot:selected}),{code:'GENERATION_METADATA_MISMATCH'});
    await jobs.checkpointPage('browser',{jobId:job.id,attemptId:job.attemptId,pageId:project.pages[0].id,dataUrl:png,metadata:original.metadataContext,snapshot:selected});
    const saved=await store.get(project.id);
    assert.deepEqual(pageGenerationMetadata(saved.pages[0].snapshot).context,original.metadataContext);
    assert.equal(saved.pages[0].snapshot.accepted,true);
    assert.deepEqual(saved.approval,project.approval);
    assert.equal(saved.pages[0].snapshot.generationHistory.length,2);
  }finally{await fs.rm(root,{recursive:true,force:true});}
});

test('a newly generated candidate is the sole selection while old original/repair contexts stay intact',()=>{
  const snapshot={generationHistory:structuredClone([repair,original]).map(item=>({...item,selected:true})),scenario:'Approved scene'};
  const fresh={id:3,img:png,metadataContext:{scenario:'Approved scene',finalPrompt:'Local face edit'}};
  const result=buildGenerationSaveSnapshot(snapshot,fresh);
  assert.equal(result.generatedImage,png);assert.equal(result.accepted,true);
  assert.deepEqual(result.generationHistory.map(h=>h.selected),[true,false,false]);
  assert.deepEqual(result.generationHistory.slice(1).map(h=>h.metadataContext),[repair.metadataContext,original.metadataContext]);
});