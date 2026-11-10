import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createServer } from 'vite';
import { castInventoryIssues } from '../src/lib/image-quality-qa.js';
import { buildImageQualityRepairPrompt } from '../src/lib/image-quality-failsafe.js';

const panel=JSON.parse(fs.readFileSync(new URL('./fixtures/unexpected-cast-observation.json',import.meta.url),'utf8'));
const names=['人物Ａ','人物Ｃ'];
const knownNames=['人物Ａ','人物Ｂ','人物Ｃ','人物Ｄ','人物Ｅ'];
const inspect=(p=panel,known=knownNames)=>castInventoryIssues(p.cast_instances,4,names,{knownNames:known,bodies:p.physical_bodies});

test('an independently identified out-of-panel cast reaches the same bounded repair even without a model correction',async()=>{
  const extra=inspect().find(issue=>issue.type==='cast_count'&&issue.subject==='人物Ｄ');
  assert.ok(extra,'a known character with three independent body records must not disappear as unverified');
  assert.equal(extra.castConservation.beforeNamedBodies,3);
  assert.equal(extra.castConservation.afterNamedBodies,2);
  assert.deepEqual(extra.castConservation.actors.map(a=>[a.name,a.operation]),[['人物Ａ','retain'],['人物Ｃ','retain'],['人物Ｄ','remove_all']]);
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const {experimentalRepairIssues}=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const review={anatomy:'uncertain',corrections:[],evidence:[panel]};
    const plan={count:6,expectedCast:[{panel:4,names},{panel:1,names:knownNames}]};
    const issues=experimentalRepairIssues(review,plan);
    assert.ok(issues.some(i=>i.type==='cast_count'&&i.panel===4&&i.subject==='人物Ｄ'));
    for(const compact of [false,true]) {
      const prompt=buildImageQualityRepairPrompt({originalPrompt:'Approved script.',sourceMode:'source-image',panelCount:6,compact,issues});
      assert.match(prompt,/3 existing named bodies -> 2 final named bodies/);
      assert.match(prompt,/"operation":"remove_all"/);
      assert.match(prompt,/remove_all[^\n]*erase|remove_all[^\n]*除去/);
      assert.match(prompt,/"name":"人物Ａ","operation":"retain"/);
    }
  } finally { await server.close(); }
});

test('uncertain, invented, unbound and reused identities never authorize deleting a body',()=>{
  for(const mutate of [
    p=>{p.cast_instances[2].status='uncertain';},
    p=>{p.cast_instances[2].name='未登録の背景人物';},
    p=>{p.cast_instances[2].instances[0].body_id='not-observed';},
    p=>{p.cast_instances[2].instances[0].matched_features=['想像した髪','想像した眼鏡'];},
    p=>{p.cast_instances[2].instances[0].matched_features.push(null);},
    p=>{p.cast_instances[2].instances[0].matched_features=[p.physical_bodies[2].features[0],p.physical_bodies[2].features[0]];},
    p=>{p.cast_instances[1].instances[0].body_id='body_3';},
  ]) {
    const copy=structuredClone(panel);mutate(copy);
    assert.ok(!inspect(copy).some(i=>i.type==='cast_count'&&i.subject!=='人物Ａ'&&i.subject!=='人物Ｃ'));
  }
  assert.ok(!inspect(panel,[]).some(i=>i.type==='cast_count'),'a name not in the approved cast is not a known extra');
  const expected=structuredClone(panel);expected.cast_instances.pop();expected.physical_bodies.pop();
  assert.deepEqual(inspect(expected),[]);
});
