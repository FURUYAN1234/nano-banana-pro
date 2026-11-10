import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectHeadInventory} from '../src/lib/manga-head-inventory.js';
test('separate matching heads cannot collapse to one named body',()=>{
  const heads=[{body_id:'body_1',bounds:[.3,.1,.12,.15]},{body_id:'body_2',bounds:[.7,.4,.12,.15]}];
  const bodies=heads.map(h=>({id:h.body_id,head_bounds:h.bounds}));
  assert.equal(inspectHeadInventory(heads,bodies).complete,true);
  assert.equal(inspectHeadInventory(heads,bodies.slice(0,1)).reason,'head_body_count_mismatch');
  assert.equal(inspectHeadInventory(heads,[bodies[0],{...bodies[1],head_bounds:bodies[0].head_bounds}]).reason,'head_body_position_mismatch');
});
test('authored hidden heads need no invented landmark, while malformed observations never pass',()=>{
  assert.equal(inspectHeadInventory([],[{id:'hand',head_bounds:null}]).complete,true);
  assert.equal(inspectHeadInventory(null,[]).complete,false);
  assert.equal(inspectHeadInventory([{body_id:'x',bounds:[0,0,-1,.2]}],[]).complete,false);
});
