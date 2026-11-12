import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCastRepairConservation, formatCastRepairConservation } from '../src/lib/manga-cast-repair.js';
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
  assert.doesNotMatch(formatCastRepairConservation(4,result,{compact:true}),/MISSING CAST/);
});

test('missing identities receive a direct visible insertion operation before the conservation ledger',()=>{
  const result=buildCastRepairConservation(inventory,names,bodies);
  for(const compact of [false,true]) {
    const prompt=formatCastRepairConservation(4,result,{compact});
    assert.match(prompt,/MISSING CAST P4: \["B"\]を各1人追加/);
    assert.ok(prompt.indexOf('MISSING CAST P4')<prompt.indexOf('CAST RECONCILIATION P4'));
    for(const instruction of ['同ページ・参照シート','台本の立ち位置と動作','頭と身体が見える','既存人物の人数・同一性','最小限の間隔・遮蔽変更可','隠して追加済みにしない'])
      assert.ok(prompt.includes(instruction),instruction);
    assert.ok(prompt.includes(JSON.stringify(result.actors)),'all observed identities and head coordinates remain intact');
  }
});

test('missing-actor rules are shared once after an earlier duplicate repair without losing panel-specific additions',()=>{
  const duplicate=structuredClone(inventory);
  duplicate[1]={name:'B',status:'defect',observed_count:2,instances:[{location:'front',matched_features:['gold hair','jacket']},{location:'back',matched_features:['gold hair','jacket']}]};
  const contracts=[buildCastRepairConservation(duplicate,names),buildCastRepairConservation(inventory,names,bodies),buildCastRepairConservation(inventory,names,bodies)];
  const prompt=buildImageQualityRepairPrompt({originalPrompt:'Approved scene.',sourceMode:'source-image',panelCount:6,compact:true,
    issues:contracts.map((castConservation,index)=>({type:'cast_count',panel:index+1,subject:'B',reason:'independent census',castConservation}))});
  assert.equal(prompt.split('全MISSING CAST共通').length-1,1);
  assert.doesNotMatch(prompt,/MISSING CAST P1/);
  assert.match(prompt,/MISSING CAST P2: \["B"\]を各1人追加/);
  assert.match(prompt,/MISSING CAST P3: \["B"\]を各1人追加/);
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
