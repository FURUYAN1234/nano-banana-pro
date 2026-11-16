import test from 'node:test';import assert from 'node:assert/strict';
import {mcpDiagnosticError,summarizeMcpDiagnostics,readMcpDiagnostics}from'../../src/lib/mcp/diagnostics.js';
import {assertNoSecrets}from'../../src/lib/mcp/contract.js';
test('real failure shape preserves Camera context, redacts secrets/images and marks bounded omission',()=>{
 const source={code:'CAMERA_CONTRACT',message:'bad sk-abcdefghijklmnopqrstuvw Bearer privateValue',diagnosticContext:{stage:'scenario_contract',scenario:'Camera: '+ 'あ'.repeat(70000)+' sk-hiddenSecret',validationError:'token check api_key=privateKey data:image/png;base64,PRIVATE'},diagnosticRunId:'run-1'};
 const error=mcpDiagnosticError(source);assert.equal(error.code,'CAMERA_CONTRACT');assert.equal(error.diagnosticRunId,'run-1');assert.match(error.failureContext.scenario,/Camera:/);assert.ok(error.failureContext.truncatedFields.includes('scenario'));assert.ok(Buffer.byteLength(JSON.stringify(error.failureContext))<=32768);assert.doesNotMatch(JSON.stringify(error),/abcdefghijklmnop|privateValue|privateKey|base64,PRIVATE/);assert.doesNotThrow(()=>assertNoSecrets(error));
 const twice=mcpDiagnosticError(error);assert.deepEqual(twice,error);
});
test('bounded latest diagnostic events distinguish warnings from real errors and never traverse arbitrary HTTP payloads',()=>{
 const events=Array.from({length:50},(_,i)=>({time:100+i,id:`e${i}`,event:i===49?'workflow.warning':'workflow.error',runId:'run-1',requestId:'request-1',errorCode:'CAMERA_CONTRACT',payload:'Bearer secretValue',apiKey:'private',failureContext:{scenario:'画'.repeat(70000),validationError:'why'}}));
 const result=summarizeMcpDiagnostics({storageState:'persistent',events});assert.equal(result.summary.errors,49);assert.equal(result.summary.warnings,1);assert.ok(result.events.length<=20);assert.equal(result.events.at(-1).severity,'warning');assert.ok(Buffer.byteLength(JSON.stringify(result.events))<=65536);assert.ok(result.omittedEvents>0);assert.equal(result.truncated,true);assert.doesNotMatch(JSON.stringify(result),/secretValue|apiKey|private/);assert.doesNotThrow(()=>assertNoSecrets(result));
 const warnings=summarizeMcpDiagnostics({events:[{time:1,event:'workflow.warning',ok:false}]});assert.equal(warnings.summary.errors,0);assert.equal(warnings.events[0].severity,'warning');
});
test('diagnostic reader handles unavailable storage independently, and since filters older unrelated failures',async()=>{
 const unavailable=await readMcpDiagnostics(async()=>{throw new Error('unavailable');});assert.equal(unavailable.status,'unavailable');
 const current=await readMcpDiagnostics(async()=>({events:[{time:1,event:'workflow.error'},{time:3,event:'workflow.warning'}]}),{since:2});assert.equal(current.summary.errors,0);assert.equal(current.summary.warnings,1);
});

import {promises as fs}from'node:fs';import path from'node:path';import os from'node:os';
import {ProjectStore}from'../src/store.mjs';import{JobQueue}from'../src/jobs.mjs';
test('failed job persists new sanitized bounded context across reload without modifying old job evidence',async()=>{
 const root=await fs.mkdtemp(path.join(process.env.MANGA_MCP_TEST_ROOT||os.tmpdir(),'job-diagnostics-'));
 try{const store=await new ProjectStore(path.join(root,'state')).init();const downloads=path.join(root,'downloads');await fs.mkdir(downloads);const project=await store.create({name:'Diagnostic test'},'create');const jobs=await new JobQueue(store,{downloadsDirectory:downloads}).init();await jobs.connect('browser',['read_state']);const queued=await jobs.submit({projectId:project.id,expectedRevision:project.revision,idempotencyKey:'failed',operation:'read_state'});const dispatch=(await jobs.next('browser')).job;await jobs.start('browser',{jobId:queued.id,attemptId:dispatch.attemptId});const error={code:'CAMERA_CONTRACT',message:'Failure Bearer privateValue',diagnosticContext:{stage:'scenario_contract',scenario:'[Camera: floor18deg]',validationError:'fisheye positive sk-abcdefghijklmnopqrstuvw'}};
 const done=await jobs.complete('browser',{jobId:queued.id,attemptId:dispatch.attemptId,success:false,error});assert.equal(done.state,'failed');assert.equal(done.error.code,'CAMERA_CONTRACT');assert.equal(done.error.failureContext.scenario,'[Camera: floor18deg]');assert.doesNotMatch(JSON.stringify(done),/privateValue|abcdefghijklmnop/);
 const before=await fs.readFile(path.join(jobs.directory,queued.id+'.json'));const loaded=await new JobQueue(store,{downloadsDirectory:downloads}).init();assert.deepEqual(loaded.get(queued.id).error,done.error);assert.deepEqual(await fs.readFile(path.join(jobs.directory,queued.id+'.json')),before);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
