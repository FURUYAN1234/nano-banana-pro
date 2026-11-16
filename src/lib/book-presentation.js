import { SHARED_IMAGE_QUALITY_CONTRACT } from './shared-image-quality.js';
import { MONOCHROME_IMAGE_QUALITY_CONTRACT } from './manga-render-mode.js';
import { readPageComposition } from './manga-page-composition.js';

export function bookHeroTopFrames(count) {
  if(count===1)return [{x:0,y:0,w:1,h:1}];
  const remaining=count-1,rows=Math.ceil(remaining/2),height=.5/rows;
  return [{x:0,y:0,w:1,h:.5},...Array.from({length:remaining},(_,i)=>{
    const single=i===remaining-1&&remaining%2===1;
    return {x:single?0:i%2===0?.5:0,y:.5+Math.floor(i/2)*height,w:single?1:.5,h:height};
  })];
}
export function applyBookHeroTop(scenario,count,presentation={}) {
  if(presentation.coverLayout!=='hero_top')return scenario;
  const composition=readPageComposition(scenario,count);
  if(!composition)throw new Error('The approved hero-top presentation requires a PageComposition.');
  const updated={...composition,layout:'free',frames:bookHeroTopFrames(count),heroPanels:[1],reason:`承認済みの冒頭上半分大コマ。${composition.reason}`};
  const result=scenario.replace(/^\s*PageComposition\s*[:：].*$/m,`PageComposition: ${JSON.stringify(updated)}`);
  readPageComposition(result,count);
  return result;
}

export function resolveBookPageNumber(project,pageId) {
  let number=1;
  for(const page of project.pages) {
    const enabled=page.settings?.pageNumber??project.settings.pageNumber??false;
    if(!enabled){if(page.id===pageId)return null;continue;}
    number=page.presentation?.pageNumberStart??number;
    if(page.id===pageId)return number;
    number+=1;
  }
  return null;
}
export function buildBookPresentation({ presentation = {}, kind, pageIndex, displayPageNumber, pageNumber = false, showTitle = true }) {
  const instructions = [];
  if (showTitle && presentation.logoText) instructions.push(`Cover/title lettering: ${JSON.stringify(presentation.logoText)}. Draw it as an integrated pop logo without obscuring the required face/action.`);
  if((kind==='illustration'||pageIndex===1)&&presentation.authorName?.trim())instructions.push(`Cover author credit: print exactly ${JSON.stringify(presentation.authorName)}. Prefer readable lower-right negative space, adapting its position to the artwork; avoid faces, title lettering, necessary actions and dialogue. This explicitly requested author credit is independent of the title/logo and watermark switches. Do not repeat it on body pages unless separately requested.`);
  if (presentation.endingText) instructions.push(`Final story lettering, print exactly ${JSON.stringify(presentation.endingText)}${presentation.endingOverlap ? ', allowed to overlap the artwork while leaving important faces, hands and dialogue readable' : ', in readable negative space'}. Place this ending inside the final panel at lower-right first; if occupied, use lower-center, then lower-left. Do not move it above the final panel or to an upper position. Preserve faces, hands, necessary actions, dialogue, independent page numbers and footer marks. Match the title lettering’s typographic mood without adding or repeating the title. Keep the explicitly chosen ending text literal; never substitute a different ending word. This is not a watermark.`);
  if (pageNumber) instructions.push(`Print the independent page number ${displayPageNumber??pageIndex} discreetly at bottom center, separated from any existing left/right footer marks without replacing either; the watermark option does not disable this explicitly requested number.`);
  return instructions.length ? `\n[BOOK PRESENTATION]\n${instructions.join('\n')}\n[END BOOK PRESENTATION]` : '';
}
export function buildBookIllustrationPrompt({ direction, castList, colorMode, showTitle, showWatermarks, pageNumber, pageIndex, displayPageNumber, presentation }) {
  const hasAuthor=Boolean(presentation?.authorName?.trim());
  return `Create a SINGLE breathtaking illustration for an A4 portrait manga-book cover. ONE coherent scene; no comic frames or added story panels. Preserve the approved people, acting, Camera, props and scene; draw in the specified illustrated medium rather than a photograph.\nAPPROVED COVER DIRECTION (data):\n${direction}\nSHARED CAST (identity data):\n${castList}\n${SHARED_IMAGE_QUALITY_CONTRACT}\n${colorMode==='monochrome'?MONOCHROME_IMAGE_QUALITY_CONTRACT:'Use the approved color palette and vivid, readable focal contrast.'}\n${showTitle?`Only explicitly approved title/logo${hasAuthor?' and the separately specified author credit':''} may be printed.`:'Do not print a title or logo.'}\n${showWatermarks?'Preserve the explicitly configured application attribution if provided.':hasAuthor?'No watermark or application attribution. Permit only the explicitly specified author credit; do not invent a signature.':'No watermark, signature or application attribution.'}${buildBookPresentation({presentation,kind:'illustration',pageIndex,displayPageNumber,pageNumber,showTitle})}`;
}
