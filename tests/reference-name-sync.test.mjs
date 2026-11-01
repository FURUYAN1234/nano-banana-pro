import test from 'node:test';
import assert from 'node:assert/strict';
import * as refs from '../src/lib/reference-assets.js';

const profile = name => `## 1. ${name}\n眼鏡をかけた人物。`;
const asset = (image, name) => ({image, analysisCompleted:true, items:[{kind:'character',name,description:`「${name}」の表情集`}],castProfiles:{[name]:profile(name)}});
const original = () => [asset('front','名無し'),asset('side','名無し'),asset('other','名無し太郎'),{image:'room',items:[{kind:'background',name:'名無し',description:'背景'}]}];
const cast = () => `${profile('名無し')}\n\n${profile('名無し太郎')}`;

test('name field updates profiles, all sheets of the same person, provenance and exports without changing another person or material',()=>{
  const before=original();
  const result=refs.editReferenceAsset(cast(),before,'front',0,'name','青葉');
  assert.match(result.castList,/## 1\. 青葉/);
  assert.match(result.castList,/## 1\. 名無し太郎/);
  assert.deepEqual(result.assets.map(a=>a.items[0].name),['青葉','青葉','名無し太郎','名無し']);
  assert.equal(result.assets[0].castProfiles['名無し'],undefined);
  assert.match(result.assets[0].castProfiles['青葉'],/## 1\. 青葉/);
  assert.match(result.assets[1].items[0].description,/「青葉」/);
  assert.equal(before[0].items[0].name,'名無し');
  const copy=refs.buildRecognitionEditorText(result.castList,result.assets,result.assets.map(a=>a.image));
  assert.match(copy,/人物｜"青葉"/);
  assert.equal(refs.reconcileReferenceCast(result.castList,result.assets,result.assets.slice(2)),profile('名無し太郎'));
});

test('editing a profile heading updates reference names and preserves edited personality',()=>{
  const next=cast().replace('## 1. 名無し\n','## 1. 白石\n');
  const result=refs.editReferenceCast(cast(),next,original());
  assert.deepEqual(result.assets.slice(0,3).map(a=>a.items[0].name),['白石','白石','名無し太郎']);
  assert.equal(result.castList,next);
  assert.equal(result.error,'');
});

test('a new heading that contains the old name is not renamed twice',()=>{
  const result=refs.editReferenceCast(profile('青葉'),profile('青葉子'),[asset('a','青葉')]);
  assert.equal(result.castList,profile('青葉子'));
  assert.equal(result.assets[0].items[0].name,'青葉子');
});

test('empty name draft retains the linked identity so clear-then-type works',()=>{
  const blank=refs.editReferenceAsset(cast(),original(),'front',0,'name','');
  assert.equal(blank.assets[0].items[0].name,'');
  assert.equal(blank.castList,cast());
  const renamed=refs.editReferenceAsset(blank.castList,blank.assets,'front',0,'name','陽');
  assert.match(renamed.castList,/## 1\. 陽/);
  assert.equal(renamed.assets[1].items[0].name,'陽');
});

test('duplicate names stay editable but cannot merge identities or enable copying',()=>{
  const result=refs.editReferenceAsset(cast(),original(),'front',0,'name','名無し太郎');
  assert.ok(result.error);
  assert.equal(result.castList,cast());
  assert.equal(result.assets[0].items[0].name,'名無し太郎');
  assert.ok(refs.editReferenceAsset(result.castList,result.assets,'front',0,'description','編集').error);
  assert.ok(refs.editReferenceCast(result.castList,result.castList,result.assets).error);
  const fixed=refs.editReferenceAsset(result.castList,result.assets,'front',0,'name','名無し太郎の友人');
  assert.equal(fixed.error,'');
  assert.match(fixed.castList,/## 1\. 名無し太郎の友人/);
});

test('body edits, reordering and add/remove do not rename unrelated people',()=>{
  for(const next of [cast().replace('眼鏡','丸眼鏡'),`${profile('名無し太郎')}\n\n${profile('名無し')}`,`${cast()}\n\n${profile('新しい人物')}`,profile('名無し太郎')]) {
    const result=refs.editReferenceCast(cast(),next,original());
    assert.deepEqual(result.assets,original());
  }
  const blank=refs.editReferenceCast(cast(),cast().replace('## 1. 名無し\n','## 1. \n'),original());
  assert.equal(blank.deferBaseline,true);
});

test('a previously edited label can recover its unambiguous original profile link',()=>{
  const assets=[{...asset('front','仮名'),items:[{kind:'character',name:'旧手編集',description:'人物'}]}];
  const result=refs.editReferenceAsset(profile('仮名'),assets,'front',0,'name','正式名');
  assert.equal(result.castList,profile('正式名'));
});

test('background names and description edits remain independent; punctuation and Latin names are literal',()=>{
  const result=refs.editReferenceAsset(cast(),original(),'room',0,'name','空');
  assert.equal(result.castList,cast());
  assert.equal(result.assets[0].items[0].name,'名無し');
  const latin=refs.editReferenceAsset('## A\nAppearance: A / Alice',[asset('a','A'),asset('b','Alice')],'a',0,'name','B(仮)');
  assert.match(latin.castList,/Appearance: B\(仮\) \/ Alice/);
});
