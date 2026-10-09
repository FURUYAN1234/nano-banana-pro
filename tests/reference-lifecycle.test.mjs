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

test('user-edited and manually added character settings survive material changes', () => {
  const edited = '## A\nUser-written personality\n\n## B\nOther appearance\n\n## C\nManual character';
  const next = refs.reconcileReferenceCast(edited, [first, second], [second]);
  assert.match(next, /User-written personality/);
  assert.match(next, /Manual character/);
  assert.doesNotMatch(next, /Original appearance/);
});

test('incremental analysis selects new and failed references but skips completed unknown references', () => {
  const done = {image:'known',analysisCompleted:true,items:[{kind:'unknown',name:'uncertain',description:'visible form'}]};
  assert.deepEqual(refs.getReferenceImagesToAnalyze(['known','failed','new'], [done]), ['failed','new']);
  assert.deepEqual(refs.getReferenceImagesToAnalyze(['known'], [done]), []);
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
