import test from 'node:test';
import assert from 'node:assert/strict';
import * as d from '../src/lib/diagnostics.js';

test('only failures export explicit input snapshots, with secrets redacted and omissions declared', () => {
  const failureContext={scenario:'ミク「動け！」\nsk-test-secret Bearer token-value\ndata:image/png;base64,AAAA',castList:'## ミク',repairResponse:'x'.repeat(150000),apiKey:'private-key'};
  const row=d.makeDiagnosticEvent('workflow.error',{failureContext});
  assert.match(row.failureContext.scenario,/ミク「動け！」/);
  assert.doesNotMatch(JSON.stringify(row),/sk-test-secret|token-value|data:image|AAAA|private-key|apiKey/);
  assert(row.failureContext.truncatedFields.includes('repairResponse'));
  assert.equal(row.failureContext.originalLengths.repairResponse,150000);
  assert.equal(d.makeDiagnosticEvent('api.payload',{failureContext}).failureContext,undefined);
  assert.equal(d.makeDiagnosticEvent('api.response',{ok:false,failureContext}).failureContext.scenario,row.failureContext.scenario);
});

test('failure keeps the invocation snapshot and merges specific repair evidence under the same run ID', async () => {
  const inputs={scenario:'失敗時の台本',castList:'失敗時のキャスト',userTopic:'元のお題',punchlineType:'GagAction'};
  d.beginDiagnosticAction('step3',{failureContext:inputs});
  const run=d.observeDiagnosticRun('step3');
  inputs.scenario='後から編集された別台本';
  const error=Object.assign(new Error('private exception not approved'),{code:'BALLOON_LAYOUT_REPAIR_FAILED',diagnosticContext:{repairResponse:'[]',issues:[{panel:1,reason:'件数不一致',dialogue:[{speaker:'ミク',text:'動け！'}]}]}});
  await d.recordDiagnostic('workflow.error',d.summarizeDiagnosticError(error));
  d.endDiagnosticRun(run,'settled');
  const report=await d.readDiagnostics();
  const rows=report.events.filter(row=>row.runId===run.runId);
  const failure=rows.find(row=>row.event==='workflow.error');
  assert.equal(failure.failureContext.scenario,'失敗時の台本');
  assert.equal(failure.failureContext.castList,'失敗時のキャスト');
  assert.equal(failure.failureContext.repairResponse,'[]');
  assert.equal(failure.failureContext.issues[0].dialogue[0].text,'動け！');
  assert(rows.filter(row=>row.event!=='workflow.error').every(row=>!row.failureContext));
  assert.doesNotMatch(JSON.stringify(rows),/後から編集|private exception/);
  d.beginDiagnosticAction('step2');
  await d.recordDiagnostic('workflow.error',{errorName:'Error'});
  assert.equal((await d.readDiagnostics()).events.at(-1).failureContext,undefined);
});

test('large UTF-8 failure evidence cannot evict its own event from the persistent log', () => {
  const failureContext={scenario:'台本'.repeat(60000),castList:'人物'.repeat(60000),finalPrompt:'描画'.repeat(60000),
    repairResponse:'応答'.repeat(60000),validationResponse:'監査'.repeat(60000),
    issues:Array.from({length:8},(_,i)=>({panel:i+1,reason:'理由'.repeat(4000),dialogue:Array.from({length:32},()=>({speaker:'人物',text:'台詞'.repeat(4000)}))}))};
  const row=d.makeDiagnosticEvent('workflow.error',{failureContext});
  assert(new TextEncoder().encode(JSON.stringify(row)).length<600*1024);
  assert(row.failureContext.truncatedFields.includes('issues'));
  assert.deepEqual(d.retainDiagnosticEvents([row]),[row]);
});

test('JSON escaping is included in the failure evidence byte budget', () => {
  const text='\u0001'.repeat(64000);
  const failureContext={scenario:text,castList:text,finalPrompt:text,repairResponse:text,validationResponse:text,
    issues:Array.from({length:8},()=>({reason:text,dialogue:Array.from({length:32},()=>({speaker:text,text}))}))};
  const row=d.makeDiagnosticEvent('workflow.error',{failureContext});
  assert(new TextEncoder().encode(JSON.stringify(row)).length<600*1024);
  assert.deepEqual(d.retainDiagnosticEvents([row]),[row]);
});
