import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runPageImageQuality} from '../src/lib/image-quality-failsafe.js';

const fixture=JSON.parse(readFileSync(new URL('./fixtures/mixed-image-repair.json',import.meta.url),'utf8'));

async function verifyRepair({originalPrompt,issues,maxChars,panelCount}) {
  let calls=0;
  const result=await runPageImageQuality({kind:'experimental-manga',count:panelCount},{mode:'experimental-manga',allowRepair:true,
    originalCandidate:{base64Img:'original'},originalPrompt,repairPromptMaxChars:maxChars,
    reviewCandidate:async()=>({pass:false,issues,evidenceContext:{panelCount}}),
    generateRepairCandidate:async prompt=>{
      calls++;
      assert(prompt.length<=maxChars);
      assert(prompt.endsWith(originalPrompt),'the complete approved contract remains verbatim');
      for(const issue of issues){
        assert(prompt.includes(`panel ${issue.panel} / ${issue.type}`));
        if(issue.letteringTargets)for(const target of issue.letteringTargets){
          assert(prompt.includes(target.text));
          assert(prompt.includes(JSON.stringify(target.columnsRightToLeft)));
        }
        else {assert(prompt.includes(issue.reason));assert(prompt.includes(issue.correction));}
        if(issue.castConservation)assert(prompt.includes(JSON.stringify(issue.castConservation.actors)));
      }
      return {base64Img:'repaired'};
    }});
  assert.equal(calls,1,result.repairError?.message);
  assert.equal(result.stopReason,'single_repair_completed');
  assert.equal(result.finalReview.notRechecked,true,'sending a repair is not pixel acceptance');
}

test('synthetic eleven simultaneous text, tail, frame, cast, style and camera defects reach the one edit',()=>verifyRepair(fixture));

test('every panel can have independent text, camera and cast defects without repeating shared instructions',async()=>{
  for(const panelCount of [5,6,7,8]){
    const template=fixture.issues.find(i=>i.type==='cast_count');
    const text=fixture.issues.find(i=>i.type==='bubble_text');
    const camera=fixture.issues.find(i=>i.type==='camera_geometry');
    const issues=Array.from({length:panelCount},(_,i)=>[text,camera,template].map(issue=>({...structuredClone(issue),panel:i+1}))).flat();
    await verifyRepair({originalPrompt:'APPROVED\n'+'原文'.repeat(9000),issues,maxChars:30165,panelCount});
  }
});
