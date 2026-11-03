import test from 'node:test';
import assert from 'node:assert/strict';
import * as refs from '../src/lib/reference-assets.js';
import {buildOpenAIReferencePlan, getOpenAIPromptBodyBudget} from '../src/lib/openai-image-references.js';
import {buildGeminiReferencePlan} from '../src/lib/gemini-image-references.js';

const analyzed = (image, name, profile) => ({ image, analysisCompleted: true,
  items: [{ kind: 'character', name, description: 'Appearance' }], castProfiles: { [name]: profile } });
const first = analyzed('a', 'A', '## A\nOriginal appearance');
const second = analyzed('b', 'B', '## B\nOther appearance');

test('removal rebuilds AI-derived cast while another sheet of the same person keeps that person', () => {
  const original = refs.reconcileReferenceCast('', [], [first, second]);
  assert.equal(refs.reconcileReferenceCast(original, [first, second], [second]), second.castProfiles.B);
  const turn = analyzed('turn', 'A', '## A\nOriginal appearance and side view');
  const combined = refs.reconcileReferenceCast(original, [first, second], [first, second, turn]);
  assert.match(combined, /side view/);
  assert.match(refs.reconcileReferenceCast(combined, [first, second, turn], [second, turn]), /## A/);
  assert.equal(refs.reconcileReferenceCast(original, [first, second], []), '');
});

test('removing a sheet removes its edited profile but preserves surviving edits and manual characters', () => {
  const edited = '## A\nRemoved user-written personality\n\n## B\nRetained user-written personality\n\n## C\nManual character';
  const next = refs.reconcileReferenceCast(edited, [first, second], [second]);
  assert.doesNotMatch(next, /## A|Removed user-written personality|Original appearance/);
  assert.match(next, /## B\nRetained user-written personality/);
  assert.match(next, /## C\nManual character/);
});

test('another surviving sheet of the same person retains that person and manual edits', () => {
  const turn = analyzed('turn', 'A', '## A\nSide view');
  const edited = '## A\nUser-written personality\n\n## B\nOther appearance';
  assert.match(refs.reconcileReferenceCast(edited, [first, turn, second], [turn, second]), /User-written personality/);
});

test('removal uses source identity even when the editable material name was changed', () => {
  const renamed = {...first, items: [{...first.items[0], name: 'Edited material label'}]};
  const next = refs.reconcileReferenceCast('## A\nUser-written personality', [renamed], []);
  assert.equal(next, '');
});

test('replacing a sheet with a newly analyzed version cannot resurrect the removed edited profile', () => {
  const edited = '## A\nOld edited clothing\n\n## B\nOther appearance';
  const retained = refs.reconcileReferenceCast(edited, [first, second], [second]);
  const fresh = refs.parseReferenceAnalysis(JSON.stringify({castList: '## A\nNew clothing from replacement image',
    references: [{imageIndex: 1, items: [{kind: 'character', name: 'A', description: 'New clothing'}]}]}), ['replacement'], retained);
  const assets = refs.mergeReferenceAnalysis([second], fresh, ['b', 'replacement']);
  const next = refs.reconcileReferenceCast(retained, [second], assets);
  assert.match(next, /New clothing from replacement image/);
  assert.doesNotMatch(next, /Old edited clothing/);
  assert.match(next, /## B\nOther appearance/);
});

test('incremental analysis selects new and failed references but skips completed unknown references', () => {
  const done = {image:'known',analysisCompleted:true,items:[{kind:'unknown',name:'uncertain',description:'visible form'}]};
  assert.deepEqual(refs.getReferenceImagesToAnalyze(['known','failed','new'], [done]), ['failed','new']);
  assert.deepEqual(refs.getReferenceImagesToAnalyze(['known'], [done]), []);
});

test('adding three labelled photo subjects to five edited characters retains profile ownership through rename and removal', () => {
  const existingNames = ['アオ', 'ベニ', 'ミドリ', 'シロ', 'クロ'];
  const previous = ['sheet-one', 'sheet-two'].map((image, index) => {
    const names = index === 0 ? existingNames.slice(0, 2) : existingNames.slice(2);
    return {image, analysisCompleted: true,
      items: names.map(name => ({kind: 'character', name, description: '既存の人物資料'})),
      castProfiles: Object.fromEntries(names.map(name => [name, `## ${name}\n元の設定`])),
    };
  });
  const originalCast = refs.reconcileReferenceCast('', [], previous);
  const editedCast = originalCast.replace('## アオ\n元の設定', '## アオ\n手編集した設定');
  const newNames = ['長髪の男性', '金髪の男性', '眼鏡の男性'];
  const response = {
    castList: newNames.map(name => `## 仮名：${name}\n追加写真の人物設定`).join('\n\n'),
    references: [{imageIndex: 1, items: newNames.map(name => ({
      kind: 'character', name: `仮名：${name}`, description: '追加写真の視覚的特徴',
    }))}],
  };
  const images = ['sheet-one', 'sheet-two', 'photo'];
  const snapshot = structuredClone(previous);
  const analysis = refs.parseReferenceAnalysis(JSON.stringify(response), ['photo'], editedCast);
  const assets = refs.mergeReferenceAnalysis(previous, analysis, images);
  const cast = refs.reconcileReferenceCast(editedCast, previous, assets);
  assert.equal(cast, `${editedCast}\n\n${response.castList}`);
  assert.deepEqual(previous, snapshot, 'completed references are not mutated');
  assert.deepEqual(assets[2].items.map(item => item.name), newNames);
  assert.deepEqual(Object.keys(assets[2].castProfiles), newNames);
  assert.deepEqual(refs.getReferenceImagesToAnalyze(images, assets), []);

  const renamed = refs.editReferenceAsset(cast, assets, 'photo', 0, 'name', '新しい名前');
  assert.equal(renamed.error, '');
  assert.match(renamed.castList, /## 仮名：新しい名前/);
  assert.deepEqual(Object.keys(renamed.assets[2].castProfiles), ['新しい名前', ...newNames.slice(1)]);
  const copied = refs.buildRecognitionEditorText(renamed.castList, renamed.assets, images);
  const parsedCopy = refs.parseRecognitionEditorText(copied, images, null, renamed.assets);
  assert.equal(parsedCopy.castList, renamed.castList);
  assert.deepEqual(parsedCopy.assets[2].items.map(item => item.name), ['新しい名前', ...newNames.slice(1)]);
  assert.deepEqual(parsedCopy.assets[2].castProfiles, renamed.assets[2].castProfiles);
  assert.equal(parsedCopy.assets[2].analysisCompleted, true);
  const headingEdit = refs.editReferenceCast(renamed.castList,
    renamed.castList.replace('## 仮名：新しい名前', '## 仮名：見出しから改名'), renamed.assets);
  assert.equal(headingEdit.error, '');
  assert.equal(headingEdit.assets[2].items[0].name, '見出しから改名');
  assert.equal(refs.reconcileReferenceCast(headingEdit.castList, headingEdit.assets, previous), editedCast);
});

test('number changes track image identity, panorama moves last, removed targets never become another material', () => {
  const before = ['a','b','panorama'], after = ['b','c','panorama'];
  const text = refs.remapReferenceNumbers('画像2を持つ。画像3を背景にする。画像1は使わない。台詞「画像2」', before, after);
  assert.match(text, /画像1を持つ/);
  assert.match(text, /画像3を背景/);
  assert.match(text, /削除済み素材/);
  assert.match(text, /台詞「画像2」/);
  assert.match(refs.remapReferenceNumbers(text, after, ['c','panorama']), /削除済み素材（旧画像1）/);
  assert.equal(refs.remapReferenceNumbers('画像2', ['a','panorama'], ['a','b','panorama']), '画像3');
});

test('recognition edits preserve completion and per-image cast provenance', () => {
  const previous = [{ image:'x', analysisCompleted:true, items:[{kind:'unknown',name:'shape',description:'old'}],castProfiles:{} }];
  const edited = refs.parseRecognitionEditorText(refs.buildRecognitionEditorText('',previous,['x']).replace('old','new'), ['x'], null, previous);
  assert.equal(edited.assets[0].analysisCompleted,true);
  assert.equal(edited.assets[0].items[0].description,'new');
});

test('accepted long automatic recognition does not consume the image prompt twice, while manual descriptions remain intact',()=>{
  const images=Array.from({length:14},(_,i)=>`data:image/png;base64,${Buffer.from('material'+i).toString('base64')}`);
  const assets=images.map((image,i)=>({image,items:[{kind:'prop',name:'Object'+i,description:'Appearance '.repeat(175)}]}));
  assets[0].items[0]={...assets[0].items[0],description:'User requires the box to have an oval handle',userEdited:true};
  const openai=buildOpenAIReferencePlan({characterImages:images,referenceAssets:assets,compact:true});
  const gemini=buildGeminiReferencePlan({characterImages:images,referenceAssets:assets,compact:true});
  const web=refs.buildWebReferencePlan({images,referenceAssets:assets,compact:true});
  assert.ok(getOpenAIPromptBodyBudget(openai)>28000);
  for(const plan of [openai,gemini,web]) {assert.match(plan.rolePrompt,/oval handle/); assert.doesNotMatch(plan.rolePrompt,/Appearance Appearance/);}
  const imageContext=refs.buildReferenceAssetContext(assets,images,{purpose:'image'});
  assert.ok(imageContext.length<2000); assert.match(imageContext,/M14/);
  assert.match(refs.buildReferenceAssetContext(assets,images),/Appearance Appearance/);
  const repair=buildOpenAIReferencePlan({characterImages:images,referenceAssets:assets,compact:true,originalCandidate:{base64Img:'eA=='}});
  assert.match(repair.rolePrompt,/Image 2:.*MATERIAL M1\./);
  assert.doesNotMatch(repair.rolePrompt.split('\n').find(line=>line.startsWith('Image 1:')),/MATERIAL/);
});
