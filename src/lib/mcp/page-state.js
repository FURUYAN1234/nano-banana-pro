import {buildRecognitionEditorText} from '../reference-assets.js';
import {MangaControlError} from './contract.js';

export function resolveMcpScenarioUsedModel(snapshot,planned,{restoreNormal=false}={}){
 if(snapshot?.scenarioUsedModel)return snapshot.scenarioUsedModel;
 // Only the actual detailed-script result supplies missing provenance. A
 // manually replaced script and a normal-session restore cannot borrow it.
 if(restoreNormal||(snapshot?.scenario!=null&&snapshot.scenario!==planned?.scenario))return null;
 return planned?.model||null;
}

export function preserveMcpRecognitionScenario(snapshot,source,project,pageId){
 const owner=source?.bookPageContext;
 const samePage=owner?.projectId===project.id&&owner?.pageId===pageId;
 const planned=project.plan?.detail?.pages?.find(page=>page.pageId===pageId);
 // Recognition clears derived output, not an approved script or an intentional
 // empty edit. Use the pre-recognition state only when its ownership matches.
 snapshot.scenario=(samePage?source.scenario:undefined)??planned?.scenario??planned?.direction??'';
 snapshot.originalScenario=(samePage?source.originalScenario:undefined)??snapshot.scenario;
 snapshot.scenarioUsedModel=resolveMcpScenarioUsedModel(samePage?source:undefined,planned);
 return snapshot;
}

export function selectMcpPageSnapshot(snapshot,projectId,pageId,assetSignature){
 if(!snapshot)return undefined;
 const owner=snapshot.bookPageContext;
 if(owner&&(owner.projectId!==projectId||owner.pageId!==pageId))throw new MangaControlError('PAGE_SNAPSHOT_MISMATCH','The saved state belongs to another project/page.');
 if(snapshot.format===1&&!owner){
  // Older failed apply operations could checkpoint the pre-commit, empty
  // normal UI. Recover only that empty state, never discard authored content.
  const hasContent=['scenario','finalPrompt','generatedImage','castList','manualTopic'].some(key=>Boolean(snapshot[key]))
   ||Boolean(snapshot.images?.length)||Boolean(snapshot.referenceAssets?.length);
  if(hasContent)throw new MangaControlError('PAGE_SNAPSHOT_MISMATCH','This retained normal-session state must be explicitly restored rather than assigned to a book page.');
  return undefined;
 }
 if(owner&&assetSignature&&JSON.stringify(owner.assetSignature)!==JSON.stringify(assetSignature))return {...snapshot,images:undefined,referenceAssets:undefined,finalPrompt:'',assembly:{},accepted:false};
 return snapshot;
}
export function prepareMcpReferenceState(images=[],provided=[],castList=''){
 if(!Array.isArray(images)||!Array.isArray(provided))throw new MangaControlError('REFERENCE_ANALYSIS_INVALID','Image/reference state must be arrays.');
 const references=images.map(image=>{
  const matches=provided.filter(asset=>asset.image===image);
  if(matches.length>1)throw new MangaControlError('REFERENCE_ANALYSIS_INVALID','Duplicate reference analysis for one image.');
  if(!matches.length){
   if(provided.length)throw new MangaControlError('REFERENCE_ANALYSIS_INVALID','Saved reference analysis does not match every restored image.');
   return {image,items:[{kind:'unknown',name:'未解析の素材',description:'AIによる素材認識は未確認。台本に合う視覚情報だけを使用する。'}]};
  }
  const asset=matches[0];
  if(!Array.isArray(asset.items)||!asset.items.length||asset.items.some(item=>!['character','background','prop','unknown'].includes(item.kind)||typeof item.name!=='string'||typeof item.description!=='string'))throw new MangaControlError('REFERENCE_ANALYSIS_INVALID','Saved reference items are incomplete.');
  return asset;
 });
 if(provided.some(asset=>!images.includes(asset.image)))throw new MangaControlError('REFERENCE_ANALYSIS_INVALID','Saved reference analysis contains an unrelated image.');
 // Exercise the actual normal editor formatter before any React setters run.
 buildRecognitionEditorText(castList,references,images);
 return references;
}
export function assertMcpApplyCommitted(result,snapshot,projectId,pageId){
 if(!result?.applicationToken||snapshot?.bookPageContext?.applicationToken!==result.applicationToken
  ||snapshot.bookPageContext.projectId!==projectId||snapshot.bookPageContext.pageId!==pageId)throw new MangaControlError('PAGE_APPLY_NOT_COMMITTED','The application did not commit this page state; the retained prior state was not saved as success.');
 return snapshot;
}
export function assertMcpRecognitionReady(state){
 if((state.images||[]).some(image=>{
  const matches=(state.referenceAssets||[]).filter(asset=>asset.image===image);
  return matches.length!==1||matches[0].analysisCompleted!==true;
 }))throw new MangaControlError('RECOGNITION_REQUIRED','Recognize this page’s supplied/generated material images with STEP1, then apply the saved page again before generation. Text-only character input does not require image recognition.');
}
