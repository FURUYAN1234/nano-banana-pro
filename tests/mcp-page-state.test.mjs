import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRecognitionEditorText,getReferenceImagesToAnalyze} from '../src/lib/reference-assets.js';
import {prepareMcpReferenceState,selectMcpPageSnapshot,assertMcpApplyCommitted,assertMcpRecognitionReady} from '../src/lib/mcp/page-state.js';

test('five unparsed assets receive matching placeholders before the actual recognition editor renders',()=>{
 const images=Array.from({length:5},(_,i)=>`fixture-image-${i}`);
 assert.throws(()=>buildRecognitionEditorText('Shared cast',[],images),{code:'REFERENCE_ANALYSIS_INVALID'});
 const references=prepareMcpReferenceState(images,[],'Shared cast');
 assert.equal(references.length,5);
 assert.equal(getReferenceImagesToAnalyze(images,references).length,5);
 const text=buildRecognitionEditorText('Shared cast',references,images);
 assert.equal((text.match(/未解析の素材/g)||[]).length,5);
});
test('analyzed restoration keeps exact image mapping; stale/duplicate/partial analysis is rejected before setters',()=>{
 const images=['sheet','prop'],references=images.map((image,i)=>({image,analysisCompleted:true,items:[{kind:i?'prop':'character',name:i?'Envelope':'Nagi',description:'Observed detail'}]}));
 assert.deepEqual(prepareMcpReferenceState(images,references,'Shared cast'),references);
 assert.deepEqual(getReferenceImagesToAnalyze(images,references),[]);
 for(const invalid of [[references[0]],[references[0],references[0]], [{...references[0],image:'foreign'}]])assert.throws(()=>prepareMcpReferenceState(images,invalid),{code:'REFERENCE_ANALYSIS_INVALID'});
});
test('only an empty pre-commit normal snapshot is recoverable; authored or foreign state is retained and rejected',()=>{
 assert.equal(selectMcpPageSnapshot({format:1,bookPageContext:null,scenario:'',images:[],referenceAssets:[]},'p','page'),undefined);
 assert.throws(()=>selectMcpPageSnapshot({format:1,scenario:'User-authored scene'},'p','page'),{code:'PAGE_SNAPSHOT_MISMATCH'});
 assert.throws(()=>selectMcpPageSnapshot({bookPageContext:{projectId:'other',pageId:'page'}},'p','page'),{code:'PAGE_SNAPSHOT_MISMATCH'});
});
test('material slots filled after an earlier apply cannot hide new assets behind an empty saved image array',()=>{
 const snapshot={format:1,bookPageContext:{projectId:'p',pageId:'page',assetSignature:[]},images:[],referenceAssets:[],scenario:'Approved scene',finalPrompt:'Old prompt',generatedImage:'Retained result'};
 const restored=selectMcpPageSnapshot(snapshot,'p','page',['sheet:sha:character_sheet']);
 assert.equal(restored.images,undefined);assert.equal(restored.referenceAssets,undefined);assert.equal(restored.scenario,'Approved scene');assert.equal(restored.generatedImage,'Retained result');assert.equal(restored.accepted,false);assert.equal(restored.finalPrompt,'');
});
test('apply success requires the exact token in a committed snapshot, never the prior React state',()=>{
 const result={applicationToken:'new'},snapshot={bookPageContext:{projectId:'p',pageId:'page',applicationToken:'new'}};
 assert.equal(assertMcpApplyCommitted(result,snapshot,'p','page'),snapshot);
 for(const invalid of [null,{bookPageContext:{...snapshot.bookPageContext,applicationToken:'old'}},{bookPageContext:{...snapshot.bookPageContext,pageId:'other'}}])assert.throws(()=>assertMcpApplyCommitted(result,invalid,'p','page'),{code:'PAGE_APPLY_NOT_COMMITTED'});
});
test('MCP recognition guard preserves text-only and analyzed pages but blocks unparsed image generation',()=>{
 assert.doesNotThrow(()=>assertMcpRecognitionReady({images:[],referenceAssets:[],castList:'Approved textual cast'}));
 assert.doesNotThrow(()=>assertMcpRecognitionReady({images:['sheet'],referenceAssets:[{image:'sheet',analysisCompleted:true}]}));
 assert.throws(()=>assertMcpRecognitionReady({images:['sheet'],referenceAssets:prepareMcpReferenceState(['sheet'])}),{code:'RECOGNITION_REQUIRED'});
 assert.throws(()=>assertMcpRecognitionReady({images:['new-sheet'],referenceAssets:[{image:'old-sheet',analysisCompleted:true}]}),{code:'RECOGNITION_REQUIRED'});
});
