import test from 'node:test';
import assert from 'node:assert/strict';
import {createMcpCommitFence} from '../src/lib/mcp/commit-fence.js';
import {preserveMcpRecognitionScenario} from '../src/lib/mcp/page-state.js';
test('commit fence waits for the requested layout commit, including delayed rendering',async()=>{
 let scheduled;const fence=createMcpCommitFence(id=>scheduled=id);let done=false;
 const pending=fence.wait({timeoutMs:500}).then(value=>{done=true;return value;});
 fence.commit(0,{scenario:'old'});await new Promise(resolve=>setTimeout(resolve,25));assert.equal(done,false);
 const snapshot={scenario:'new'};fence.commit(scheduled,snapshot);const result=await pending;
 snapshot.scenario='mutated';assert.equal(result.scenario,'new');
});
test('commit fence times out without accepting old state and late commits are harmless',async()=>{
 const fence=createMcpCommitFence(()=>{});await assert.rejects(fence.wait({timeoutMs:10}),{code:'REACT_COMMIT_TIMEOUT'});fence.commit(1,{scenario:'late'});
});
test('commit fence observes cancellation before commit and while waiting; unmount rejects',async()=>{
 const fence=createMcpCommitFence(()=>{});const cancelled=Object.assign(new Error('cancel'),{code:'CANCELLED'});
 await assert.rejects(fence.wait({throwIfCancelled(){throw cancelled;}}),{code:'CANCELLED'});
 let stop=false;const pending=fence.wait({throwIfCancelled(){if(stop)throw cancelled;}});stop=true;
 await assert.rejects(pending,{code:'CANCELLED'});
 const unmounted=fence.wait();fence.cancelAll();await assert.rejects(unmounted,{code:'CANCELLED'});
});
test('recognition success and failure preserve approved and explicitly empty page scripts',()=>{
 const project={id:'p',plan:{detail:{pages:[{pageId:'page',scenario:'approved'}]}}};
 for(const scenario of ['edited',''])for(const success of [true,false]){
 const source={bookPageContext:{projectId:'p',pageId:'page'},scenario,originalScenario:scenario,manualTopic:'brief'};
 const result=preserveMcpRecognitionScenario({scenario:'',success},source,project,'page');
 assert.equal(result.scenario,scenario);assert.equal(result.originalScenario,scenario);assert.equal(result.manualTopic,undefined);assert.equal(source.manualTopic,'brief');
 }
 assert.equal(preserveMcpRecognitionScenario({},null,project,'page').scenario,'approved');
 assert.equal(preserveMcpRecognitionScenario({},{bookPageContext:{projectId:'other',pageId:'page'},scenario:'foreign'},project,'page').scenario,'approved');
});
