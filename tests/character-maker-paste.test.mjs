import test from 'node:test';
import assert from 'node:assert/strict';
import {parseRecognitionEditorText,parseCharacterEditorText,buildRecognitionEditorText,mergeReferenceAnalysis,reconcileReferenceCast,getReferenceImagesToAnalyze} from '../src/lib/reference-assets.js';
import {collectCastNameEntries} from '../src/lib/panel-utils.js';

// The ordinary Character Maker design-copy schema, with sample profile data.
const design=`An elaborate and professional character design sheet.
OVERALL LAYOUT: 12-Panel Grid character design sheet with facial expressions.
ART STYLE TO ENFORCE: clean anime
## 1. LAYOUT INSTRUCTIONS (ABSOLUTE PRIORITY)
CRITICAL LAYOUT: arrange a 3x4 grid.
## 2. ART STYLE INSTRUCTIONS (CRITICAL)
Use the requested style.
## 3. CHARACTER INFORMATION (APPLICATION TYPESET)
  ■氏名：葵
## 4. CHARACTER APPEARANCE
Hair: 黒髪.
## 5. OUTFIT & EQUIPMENT
Base costume: 青灰色の作業着.
## 6. POSE, EXPRESSION & MANNERISM
Base pose: standing.
## 7. BACKGROUND & STRICT RULES
Background MUST be plain pure white. No typography.`;

test('known design-copy input is rejected before its seven headings become characters',()=>{
  for(const source of [design,design.replaceAll('\n','\r\n'),'\n'+design+'\n']) {
    assert.throws(()=>parseRecognitionEditorText(source),error=>error.code==='CHARACTER_DESIGN_PROMPT_NOT_CAST'&&/「テキストCopy」はシート作成用/.test(error.message)&&/生成したシート画像/.test(error.message)&&/Story Maker/.test(error.message));
    assert(source.includes('■氏名：葵'),'the original pasted source remains available for correction');
  }
});
test('known design copy is also rejected inside the image-plus-text editor',()=>{
  const image='data:image/png;base64,fixture';
  const source=buildRecognitionEditorText(design,[{image,items:[{kind:'character',name:'葵',description:'同一人物の三面図'}]}],[image]);
  assert.throws(()=>parseRecognitionEditorText(source,[image]),/生成したシート画像/);
});
test('Story Maker character format remains a single correctly named actor',()=>{
  const text='## 1. 葵\n基本: 映画館の若い係員\n外見: 黒髪の短髪、丸眼鏡\n服装: 青灰色の作業着と黒いズボン\n性格・口調: 丁寧\n関係・演技: 佐伯の助手';
  const parsed=parseRecognitionEditorText(text);
  assert.equal(parsed.castList,text);
  assert.deepEqual(collectCastNameEntries(parsed.castList).map(e=>e.displayName),['葵']);
});
test('same-format handwritten names and content do not trigger the Character Maker design guard',()=>{
  for(const name of ['Layout Artist','CHARACTER APPEARANCE']) {
    const text=`## 1. ${name}\n外見: 長い黒髪\n服装: 白い作業着\nメモ: A professional character design sheet artist.`;
    assert.equal(parseRecognitionEditorText(text).castList,text);
  }
});

const canonical='## 1. 葵\n外見: 黒髪の短髪、丸眼鏡\n服装: 青灰色の作業着と黒いズボン';
const previousCast='## 葵\n外見: 黒髪\n服装: 青い上着\n\n## 佐伯\n外見: 白髪\n服装: 手編集した緑の作業着';
const imageAssets=()=>[
  {image:'person',analysisCompleted:true,castProfiles:{葵:'## 葵\n外見: 黒髪\n服装: 青い上着',佐伯:'## 佐伯\n外見: 白髪\n服装: 元の上着'},items:[{kind:'character',name:'葵',castName:'葵',userEdited:true,description:'二つの立ち姿は同じ葵'},{kind:'character',name:'佐伯',description:'白髪の年配者'}]},
  {image:'room',analysisCompleted:true,items:[{kind:'background',name:'映写室',description:'奥に映写窓'}]},
  {image:'reel',analysisCompleted:true,items:[{kind:'prop',name:'リール',description:'丸い金属のリール'}]},
];
test('canonical whole-field paste updates one profile and preserves other edited people and all image assets',()=>{
  const assets=imageAssets(),before=structuredClone(assets),images=assets.map(a=>a.image);
  const result=parseRecognitionEditorText(canonical,images,null,assets,previousCast);
  assert(result.castList.includes(canonical));assert(result.castList.includes('手編集した緑の作業着'));
  assert.deepEqual(collectCastNameEntries(result.castList).map(e=>e.displayName),['葵','佐伯']);
  assert.deepEqual(result.assets,before);assert.deepEqual(assets,before);
  const saved=buildRecognitionEditorText(result.castList,result.assets,images);
  const restored=parseRecognitionEditorText(saved,images,null,result.assets,result.castList);
  assert.equal(restored.castList,result.castList);assert.deepEqual(restored.assets,result.assets);
  assert(saved.includes('画像2｜背景'));assert(saved.includes('画像3｜小物'));
});
test('canonical paste preserves panorama separately and new text-only actors never steal an image identity',()=>{
  const assets=imageAssets(),images=assets.map(a=>a.image),panorama={location:'客席',lighting:'薄暗い',spatialType:'indoor'};
  const result=parseRecognitionEditorText(canonical.replace('## 1. 葵','## 1. ミオ'),images,panorama,assets,previousCast);
  assert.deepEqual(result.background,panorama);assert.deepEqual(result.assets,assets);
  assert.deepEqual(collectCastNameEntries(result.castList).map(e=>e.displayName),['葵','佐伯','ミオ']);
  const onlyPanorama=parseRecognitionEditorText(canonical,[],panorama,[],previousCast);
  assert.deepEqual(onlyPanorama.background,panorama);
});
test('canonical edits survive adding, recognizing, saving and reloading another image',()=>{
  const assets=imageAssets(),images=assets.map(a=>a.image);
  const edited=parseRecognitionEditorText(canonical,images,null,assets,previousCast);
  const added=[...images,'new-prop'],pending=[...edited.assets,{image:'new-prop',items:[{kind:'unknown',name:'未解析の素材',description:'AI認識は未確認'}]}];
  const castAfterAdd=reconcileReferenceCast(edited.castList,edited.assets,pending);
  assert(castAfterAdd.includes(canonical));assert.deepEqual(getReferenceImagesToAnalyze(added,pending),['new-prop']);
  const merged=mergeReferenceAnalysis(pending,{recognizedCastList:'',castList:castAfterAdd,assets:[{image:'new-prop',items:[{kind:'prop',name:'缶',description:'古い金属缶'}]}]},added);
  const castAfterAnalysis=reconcileReferenceCast(castAfterAdd,pending,merged);
  const saved=buildRecognitionEditorText(castAfterAnalysis,merged,added);
  const restored=parseRecognitionEditorText(saved,added,null,merged,castAfterAnalysis);
  assert(restored.castList.includes(canonical));assert(restored.castList.includes('手編集した緑の作業着'));
  assert.equal(restored.assets[3].items[0].name,'缶');assert.deepEqual(getReferenceImagesToAnalyze(added,restored.assets),[]);
  assert.equal(restored.assets[0].items[0].userEdited,true);
});
test('incomplete composite editors, unrelated prose and uncertain image mappings remain errors',()=>{
  const assets=imageAssets(),images=assets.map(a=>a.image);
  for(const invalid of ['ただの物語の文章','## 葵\n外見: 黒髪','## 葵\n外見: \n服装: 青い上着','## 葵\n外見: 黒髪\n服装: \n注記: 空欄',canonical+'\n## 葵\n外見: 長髪\n服装: 赤い服','【人物設定】\n'+canonical,'【画像ごとの認識】\n'+canonical]) {
    assert.throws(()=>parseRecognitionEditorText(invalid,images,null,assets,previousCast));
  }
  assert.throws(()=>parseRecognitionEditorText(canonical,images,null,assets.slice(1),previousCast),/解析結果/);
  assert.throws(()=>parseRecognitionEditorText(canonical,images,null,[...assets,assets[0]],previousCast),/解析結果/);
});

test('blank text clears a text-only roster but scenario, malformed and incomplete profiles are rejected',()=>{
  for(const empty of ['', ' \n\t'])assert.deepEqual(parseRecognitionEditorText(empty),{castList:'',assets:[],background:null});
  const invalid=[
    'Topic: 映画館\nScenario:\n[1コマ目]\n葵が映写機を操作する。',
    'ただの物語の文章', '## 葵\n外見: 黒髪\n服装: 青い上着',
    '## 1. \n外見: 黒髪\n服装: 青い上着',
    '## 1. 葵\n外見: 黒髪', '## 1. 葵\n外見: \n服装: 青い上着',
    '## 1. 葵\n外見: 黒髪\n服装: \n性格・口調: 丁寧',
    canonical+'\n\n## 2. 葵\n外見: 長髪\n服装: 赤い服',
    canonical+'\n\n## 3. 佐伯\n外見: 白髪\n服装: 緑の服',
    canonical+'\nScenario: 漫画台本を混ぜない',
    '【STEP1用：人物設定・ここから】\n'+canonical,
    '## 1. CHARACTER INFORMATION\nHair: black\nBase costume: blue',
  ];
  const assets=imageAssets(),images=assets.map(a=>a.image);
  for(const input of invalid) {
    assert.throws(()=>parseRecognitionEditorText(input),/Story Maker.*人物設定/,input);
    assert.throws(()=>parseRecognitionEditorText(input,images,null,assets,previousCast),undefined,input);
  }
});

test('multiple numbered Story profiles and panorama-only save round-trip retain the same names',()=>{
  const text=canonical+'\n\n## 2. 佐伯\n外見：白髪、面長\n服装：緑の上着';
  const panorama={location:'客席',lighting:'薄暗い',spatialType:'indoor'};
  const result=parseRecognitionEditorText(text.replaceAll('\n','\r\n'),[],panorama);
  assert.deepEqual(collectCastNameEntries(result.castList).map(e=>e.displayName),['葵','佐伯']);
  const saved=buildRecognitionEditorText(result.castList,[],[],panorama);
  assert.deepEqual(parseRecognitionEditorText(saved,[],panorama),result);
});

test('fullwidth ordinal separators accepted by Story are normalized before Manga reads the names',()=>{
  const text=canonical.replace('1.','1．');
  for(const parsed of [parseRecognitionEditorText(text),parseCharacterEditorText(text)]) {
    assert.equal(parsed.castList,canonical);
    assert.deepEqual(collectCastNameEntries(parsed.castList).map(e=>e.displayName),['葵']);
  }
  for(const invalid of [design,'Topic: 動作確認\nScenario:\n[1コマ目] 台本',canonical.replace('服装: 青灰色の作業着と黒いズボン','服装:')])assert.throws(()=>parseCharacterEditorText(invalid));
});
