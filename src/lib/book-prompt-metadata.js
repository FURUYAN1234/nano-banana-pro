import {extractScenarioTitle} from './scenario-title.js';
import {readExplicitOutfit} from './seasonal-outfit.js';
// Book adapters keep approved page metadata separately from the literal script.
// Materialize only missing global fields in derived prompt context, never edit the script.
export function normalizeBookPromptMetadata(value){
 if(value===undefined||value===null)return undefined;
 if(typeof value!=='object'||Array.isArray(value)||Object.keys(value).some(key=>!['title','location','outfit'].includes(key)))throw Object.assign(new Error('Invalid book prompt metadata.'),{code:'BOOK_METADATA_INVALID'});
 const result={};
 for(const key of ['title','location','outfit']){
  if(value[key]===undefined)continue;
  if(typeof value[key]!=='string'||value[key].length>16000)throw Object.assign(new Error('Book metadata fields must be bounded strings.'),{code:'BOOK_METADATA_INVALID'});
  if(value[key].trim())result[key]=value[key].replace(/[ \t]*(?:\r\n?|\n)[ \t]*/g,' ').trim();
 }
 return result;
}
export function bookPromptContext(context,metadata){
 if(!metadata)return context;
 const explicitTitle=/^[ \t]*(?:#{1,6}[ \t]*)?(?:タイトル|Title|Topic)[ \t]*[:：][ \t]*\S/im.test(context);
 const present={title:explicitTitle||extractScenarioTitle(context)!=='無題',location:/^[ \t]*(?:#{1,6}[ \t]*)?Location[ \t]*[:：][ \t]*\S/im.test(context),outfit:Boolean(readExplicitOutfit(context))};
 const additions=[['title','Topic'],['location','Location'],['outfit','Outfit']].flatMap(([key,label])=>metadata[key]&&!present[key]?[`${label}: ${metadata[key]}`]:[]);
 return [additions.join('\n'),context].filter(Boolean).join('\n');
}
