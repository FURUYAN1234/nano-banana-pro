import {getScenarioPanelBlocks} from '../scenario-validation.js';
import {extractDialogueOnly} from '../panel-utils.js';

// The normal compiler may repair invalid BalloonLayout lines. Reconstruct that
// narrow repair against the approved original instead of trusting a new script
// or stripping all layout/staging constraints from the comparison.
export function isApprovedMcpScenario(expected,state){
 if(state.scenario===expected)return true;
 const prepared=state.assembly?.experimentalPrepared?.source;
 if(typeof expected!=='string'||typeof state.scenario!=='string'||prepared?.scenario!==state.scenario||prepared.castList!==state.castList)return false;
 const before=getScenarioPanelBlocks(expected),after=getScenarioPanelBlocks(state.scenario),edits=[];
 if(!before.length||before.length!==after.length)return false;
 for(let index=0;index<before.length;index++){
  if(before[index].text===after[index].text)continue;
  try{extractDialogueOnly(before[index].text,state.castList,{forImagePrompt:true});return false;}
  catch(error){if(error.code!=='BALLOON_LAYOUT_INVALID')return false;}
  const lines=[...after[index].text.matchAll(/^BalloonLayout\s*[:：]([^\r\n]*)$/gm)];
  const originals=[...before[index].text.matchAll(/^BalloonLayout\s*[:：][^\r\n]*$/gm)];
  if(lines.length!==1||originals.length!==1)return false;
  try{
   const value=JSON.parse(lines[0][1]);
   if(!Array.isArray(value)||value.some(item=>!item||Object.keys(item).some(key=>!['speaker','x','anchor','route'].includes(key))||['speaker','anchor','route'].some(key=>typeof item[key]!=='string'||!item[key].trim()||/[\r\n]/.test(item[key]))))return false;
   extractDialogueOnly(after[index].text,state.castList,{forImagePrompt:true});
   const start=expected.indexOf(before[index].text)+originals[0].index;
   edits.push({start,end:start+originals[0][0].length,replacement:`BalloonLayout: ${JSON.stringify(value)}`});
  }catch{return false;}
 }
 if(!edits.length)return false;
 let reconstructed=expected;
 for(const edit of edits.sort((a,b)=>b.start-a.start))reconstructed=reconstructed.slice(0,edit.start)+edit.replacement+reconstructed.slice(edit.end);
 return reconstructed===state.scenario;
}
