import {selectMcpPageSnapshot} from '../../src/lib/mcp/page-state.js';
import {MangaControlError} from '../../src/lib/mcp/contract.js';

export function assertPageTransportBudget(value,limit=500_000_000){
 let characters=0;
 const visit=item=>{
  if(item?.__mangaAsset===true)characters+=Math.ceil(item.bytes/3)*4+100;
  else if(typeof item==='string')characters+=item.startsWith('data:image/')?item.length+2:JSON.stringify(item).length;
  else if(item&&typeof item==='object'){characters+=2;for(const[key,child]of Object.entries(item)){characters+=key.length*6+4;visit(child);}}
  else characters+=10;
  if(characters>limit)throw new MangaControlError('PAGE_PAYLOAD_TOO_LARGE','This page state exceeds the local JSON transport limit. Retained assets are unchanged; reduce retained page history before dispatching again.');
 };
 visit(value);return characters;
}

// applyMcpPage reconstructs the context from the job's bindings. Repeating its
// previous image bytes here can exceed V8's maximum JSON string length even
// when every individual source is valid and below the input size limit.
export function compactPageTransport(project,page,assetSignature,{recognitionReset=false}={}) {
 const owner=page?.snapshot?.bookPageContext;
 const foreignSnapshotOmitted=Boolean(recognitionReset&&owner&&(owner.projectId!==project.id||owner.pageId!==page.id));
 const selected=selectMcpPageSnapshot(foreignSnapshotOmitted?undefined:page?.snapshot,project.id,page?.id,assetSignature);
 const snapshot=selected?{...selected,bookPageContext:selected.bookPageContext?{...selected.bookPageContext,assets:undefined,appliedImages:undefined,continuityReferences:undefined}:undefined}:selected;
 const recognition=project.recognition?{...project.recognition}:undefined;
 if(recognition&&snapshot){
  for(const key of ['images','referenceAssets','castList','bg360Image','bg360Analysis','bg360ImageParts'])if(snapshot[key]!=null)delete recognition[key];
 }
 return {snapshot,recognition,...(foreignSnapshotOmitted?{foreignSnapshotOmitted:true}:{})};
}
