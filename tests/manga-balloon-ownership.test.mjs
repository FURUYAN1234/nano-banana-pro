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

test('anonymous tail geometry binds the visible head instead of a contradictory model name',()=>{
  const input=fixture();
  input.bodies[0].head_bounds=[.6,.12,.2,.2];
  input.bodies[1].head_bounds=[.1,.12,.2,.2];
  input.regions[0].tail_targets=[{root:[.72,.02],tip:[.7,.15],region:'head',evidence:'上の吹き出しから短い尾が右の頭の輪郭に接続する。',body_id:'b'}];
  input.regions[1].tail_targets=[{root:[.2,.02],tip:[.2,.15],region:'head',evidence:'上の吹き出しから短い尾が左の頭の輪郭に接続する。'}];
  assert.deepEqual(inspectBalloonOwnership(input),[],'pixels, not the contradictory semantic label, identify the head');
  [input.regions[0].tail_targets,input.regions[1].tail_targets]=[input.regions[1].tail_targets,input.regions[0].tail_targets];
  const failures=inspectBalloonOwnership(input);
  assert.deepEqual(failures.map(issue=>issue.type),['bubble_speaker','bubble_speaker']);
  assert.match(failures[0].correction,/甲/);
  assert.match(failures[0].correction,/erase.*tail/i);
  assert.match(failures[0].correction,/"headRectangle":\[0\.6,0\.12,0\.2,0\.2\]/);
});

test('compact ownership repair retains exact speech, observed destination and safe rerouting constraints',()=>{
  const input=fixture();
  input.bodies[0].head_bounds=[.6,.12,.2,.2];input.bodies[0].features='丸眼鏡、短い黒髪、青い上着';
  input.bodies[1].head_bounds=[.1,.12,.2,.2];
  input.regions[0].tail_targets=[{root:[.2,.02],tip:[.2,.15],region:'head',evidence:'吹き出しの尾は左人物の頭の輪郭に続いている。'}];
  const correction=inspectBalloonOwnership(input)[0].correction;
  assert.ok(correction.length<500,`ownership instruction is ${correction.length} characters`);
  for(const value of ['待って！','甲','乙','丸眼鏡、短い黒髪、青い上着','"headRectangle":[0.6,0.12,0.2,0.2]',
    '左,上,幅,高さ','x右向き','y下向き','頭の輪郭','短縮だけ','背景を復元','文字・頭を横切らず','屈曲可',
    '全文字・読順・人物数・身体位置・動作・Camera','人物を追加・移動しない'])assert.ok(correction.includes(value),value);
});

test('geometry keeps natural tail gaps valid and rejects incomplete or competing head evidence',()=>{
  const base=()=>{
    const input=fixture();input.expected.pop();input.regions.pop();
    input.bodies[0].head_bounds=[.6,.35,.2,.2];input.bodies[1].head_bounds=[.1,.35,.2,.2];
    input.regions[0].tail_targets=[{root:[.7,.05],tip:[.7,.25],region:'head',evidence:'下向きの尾の延長上には右の頭だけが見える。'}];
    return input;
  };
  assert.deepEqual(inspectBalloonOwnership(base()),[]);
  for(const damage of [x=>x.regions[0].tail_targets[0].root=null,
    x=>x.bodies[1].head_bounds=null,
    x=>x.bodies[1].head_bounds=[.61,.36,.18,.18],
    x=>x.regions[0].tail_targets[0].tip=[.7,.04]]) {
    const input=base();damage(input);assert.equal(inspectBalloonOwnership(input)[0].type,'unverified');
  }
});

test('a tail passing through a competing head cannot silently pass ownership',()=>{
  const input=fixture();input.expected.pop();input.regions.pop();
  input.bodies[0].head_bounds=[.6,.65,.2,.15];
  input.bodies[1].bounds=[.55,.1,.4,.8];input.bodies[1].head_bounds=[.6,.25,.2,.15];
  input.regions[0].tail_targets=[{root:[.7,.05],tip:[.7,.7],region:'head',evidence:'長い尾の途中に別の頭が重なり、先端は下の頭へ続く。'}];
  assert.equal(inspectBalloonOwnership(input)[0].type,'unverified');
});
