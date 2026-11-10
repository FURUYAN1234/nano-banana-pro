import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCastRepairConservation } from '../src/lib/manga-cast-repair.js';
import { buildImageQualityRepairPrompt } from '../src/lib/image-quality-failsafe.js';
import { castInventoryIssues } from '../src/lib/image-quality-qa.js';
import { createServer } from 'vite';

const names=['A','B','C'];
const inventory=[
  {name:'A',status:'ok',observed_count:1,instances:[{body_id:'one',location:'left',matched_features:['red bob','brown eyes']}]},
  {name:'B',status:'defect',observed_count:0,instances:[],evidence:'No long-haired blonde body is visible anywhere in this panel.'},
  {name:'C',status:'ok',observed_count:1,instances:[{body_id:'three',location:'right',matched_features:['twin tails','glasses']}]},
];
const bodies=[{id:'one',head_bounds:[.1,.1,.2,.2]},{id:'three',head_bounds:[.6,.2,.2,.2]}];
test('missing actor repair carries every retained identity and spatial head, with exact before/after counts',()=>{
  const result=buildCastRepairConservation(inventory,names,bodies);
  assert.equal(result.beforeNamedBodies,2);
  assert.equal(result.afterNamedBodies,3);
  assert.deepEqual(result.actors.map(x=>[x.name,x.operation]),[['A','retain'],['B','add_once'],['C','retain']]);
  assert.deepEqual(result.actors[2].sourceBodies[0].headBounds,[.6,.2,.2,.2]);
  for(const compact of [false,true]){
    const prompt=buildImageQualityRepairPrompt({originalPrompt:'Approved scene.',sourceMode:'source-image',panelCount:6,compact,
      issues:[{type:'cast_count',panel:4,subject:'B',reason:'missing B',castConservation:result}]});
    assert.match(prompt,/CAST RECONCILIATION P4/);
    assert.match(prompt,/2 existing named bodies -> 3 final named bodies/);
    assert.match(prompt,/"name":"C","operation":"retain"/);
    assert.match(prompt,/same existing body/);
  }
});
test('duplicate removal records both sources, never preserving both under a generic preserve lock',()=>{
  const duplicate=structuredClone(inventory);
  duplicate[1]={name:'B',status:'defect',observed_count:2,instances:[{location:'front',matched_features:['long gold hair','yellow jacket']},{location:'back',matched_features:['long gold hair','yellow jacket']}]};
  const result=buildCastRepairConservation(duplicate,names);
  assert.equal(result.beforeNamedBodies,4);
  assert.equal(result.actors[1].operation,'retain_one_remove_extras');
  assert.equal(result.actors[1].sourceBodies.length,2);
});
test('uncertain or inconsistent identity evidence never authorizes a cast delta',()=>{
  const invalids=[
    inventory.map((x,i)=>i===1?{...x,status:'uncertain'}:x),
    inventory.map((x,i)=>i===2?{...x,observed_count:2}:x),
    inventory.slice(1),
    [...inventory,inventory[0]],
    inventory.map((x,i)=>i===2?{...x,instances:[{location:'right',matched_features:['glasses']}]}:x),
  ];
  for(const invalid of invalids)assert.equal(buildCastRepairConservation(invalid,names,bodies),null);
});
test('normal and experimental review paths carry conservation into the same bounded image edit',async()=>{
  const standard=castInventoryIssues(inventory,4,names).find(x=>x.type==='cast_count');
  assert.equal(standard.castConservation.afterNamedBodies,3);
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try{
  const {experimentalRepairIssues}=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const experimental=experimentalRepairIssues({anatomy:'fail',evidence:[{panel:4,cast_instances:inventory,physical_bodies:bodies}],
    corrections:[{panel:4,type:'cast_count',subject:'B',materialImpact:'material',impactReason:'Required actor is absent',observed:'Two named actors visible',expected:'Three named actors visible',correction:'Restore B once'}]},
    {count:6,expectedCast:[{panel:4,names}]}).find(x=>x.type==='cast_count');
  assert.equal(experimental.castConservation.afterNamedBodies,3);
  assert.deepEqual(experimental.castConservation.actors[2].sourceBodies[0].headBounds,bodies[1].head_bounds);
  }finally{await server.close();}
});
