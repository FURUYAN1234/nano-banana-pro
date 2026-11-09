import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectBalloonOwnership } from '../src/lib/manga-balloon-ownership.js';

const fixture=()=>({panel:2,expected:[{text:'待って！',owners:['甲']},{text:'分かった。',owners:['乙']}],
  bodies:[{id:'a',bounds:[.55,.1,.4,.8]},{id:'b',bounds:[.05,.1,.4,.8]}],
  cast:[{name:'甲',status:'ok',instances:[{body_id:'a'}]},{name:'乙',status:'ok',instances:[{body_id:'b'}]}],
  regions:[{region_kind:'speech_balloon',text:'待って！',center_x:.8,tail_targets:[{body_id:'a',tip:[.7,.2],region:'head',evidence:'右の吹き出しの下から尾が右人物の頭の輪郭へ続く。'}]},
    {region_kind:'speech_balloon',text:'分かった。',center_x:.2,tail_targets:[{body_id:'b',tip:[.2,.2],region:'mouth',evidence:'左の吹き出しの細い尾が左人物の口元で終わる。'}]}]});
test('exact text and physical order do not conceal swapped balloon owners',()=>{
  const input=fixture();assert.deepEqual(inspectBalloonOwnership(input),[]);
  [input.regions[0].tail_targets,input.regions[1].tail_targets]=[input.regions[1].tail_targets,input.regions[0].tail_targets];
  assert.deepEqual(inspectBalloonOwnership(input).map(x=>x.type),['bubble_speaker','bubble_speaker']);
});
test('ambiguous tails and unbound bodies stay unverified, not repair authorizations',()=>{
  for(const damage of [x=>x.regions[0].tail_targets=null,x=>x.regions[0].tail_targets[0].region='uncertain',
    x=>x.regions[0].tail_targets[0].tip=[.1,.95],x=>x.cast[0].status='uncertain',
    x=>x.expected[0].owners=[''],x=>x.expected[0].owners=[undefined]]) {
    const input=fixture();damage(input);assert.equal(inspectBalloonOwnership(input)[0].type,'unverified');
  }
});
test('silent panels, rear head tails and explicitly shared balloons preserve their ownership',()=>{
  assert.deepEqual(inspectBalloonOwnership({...fixture(),expected:[],regions:[]}),[]);
  const input=fixture();input.expected=[{text:'待って！',owners:['甲','乙']}];
  input.regions[0].tail_targets.push(input.regions[1].tail_targets[0]);input.regions.pop();
  assert.deepEqual(inspectBalloonOwnership(input),[]);
  input.regions[0].tail_targets.pop();assert.equal(inspectBalloonOwnership(input)[0].type,'bubble_speaker');
});
