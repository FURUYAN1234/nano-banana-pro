import test from 'node:test';
import assert from 'node:assert/strict';
import {parseBookOutline,buildBookOutlineRequest} from '../src/lib/mcp/book-plan.js';
const sha='a'.repeat(64),sha2='b'.repeat(64);
const project={pages:[{id:'one'}],assetBindings:{sheet:{asset:{id:sha},role:'character_sheet',description:'Recognized original'},sheet2:{asset:{id:sha2},role:'character_sheet'}}};
const spec=(id,role='character_sheet')=>({id,role,description:'Approved description differing from recognition'});
const parse=(specs,p=project)=>parseBookOutline(JSON.stringify({outline:{cast:[],assetSpecs:specs,pages:[{pageId:'one',beat:'Existing characters meet'}]}}),p).outline.assetSpecs;
test('same-role unique immutable asset references normalize to existing slots without changing story or binding',()=>{
 const before=structuredClone(project);
 assert.deepEqual(parse([spec(sha),spec(sha2),spec('new-prop','prop')]),[spec('sheet'),spec('sheet2'),spec('new-prop','prop')]);
 assert.deepEqual(project,before);
 assert.deepEqual(parse([spec('sheet')]),[spec('sheet')]);
 assert.match(buildBookOutlineRequest(project),/existingAssets.slotId as assetSpecs.id/);
 assert.match(buildBookOutlineRequest(project),/assetId is an immutable content hash, never a slot ID/);
});
test('ambiguous asset mappings, role substitutions, unknown hashes and duplicate normalized slots reject',()=>{
 const cases=[()=>parse([spec(sha)],{...project,assetBindings:{...project.assetBindings,duplicate:{asset:{id:sha},role:'character_sheet'}}}),
 ()=>parse([spec(sha,'background')]),()=>parse([spec('sheet','prop')]),()=>parse([spec('c'.repeat(64))]),
 ()=>parse([spec(sha),spec('sheet')]),()=>parse([spec('sheet')],{...project,assetBindings:{...project.assetBindings,another:{asset:{id:'sheet'},role:'character_sheet'}}})];
 for(const run of cases)assert.throws(run,{code:'PLAN_INVALID'});
});
test('new resource specifications remain allowed for supplied sheets, with no fuzzy description or identity inference',()=>{
 assert.deepEqual(parse([spec('new-background','background'),spec('unrelated-new-sheet')]),[spec('new-background','background'),spec('unrelated-new-sheet')]);
});
