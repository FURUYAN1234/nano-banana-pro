import {extractDialogueOnly} from '../panel-utils.js';
import {sanitizeFailureContext} from '../diagnostic-failure-context.js';
import { createBookPageMode } from '../page-production-contract.js';
import { MangaControlError } from './contract.js';
import {getScenarioPanelBlocks} from '../scenario-validation.js';
import { applyBookHeroTop, bookHeroTopFrames } from '../book-presentation.js';
import {readPageComposition, summarizePageComposition} from '../manga-page-composition.js';

// Carry bounded observed continuity, never a previous panel's dialogue/camera/style instructions.
export function bookDetailContinuity(pages) {
  const previous=[...pages].reverse().find(page=>page.kind!=='illustration'&&page.scenario);
  if(!previous)return null;
  const lastPanel=getScenarioPanelBlocks(previous.scenario).at(-1)?.text||'';
  const state=lastPanel.split('\n').filter(line=>/^\s*(?:状況|Action|ObjectState|小道具の状態)\s*[:：]/i.test(line))
    .map(line=>line.replace(/「[^」]*」|『[^』]*』|"[^"\n]*"/g,'' )).join('\n').slice(0,1200);
  return {sourcePageId:previous.pageId,location:String(previous.location||'').slice(0,1200),outfit:String(previous.outfit||'').slice(0,2400),observedFinalState:state};
}

const explicitlySilentBook = project => {
  const notNegated = text => String(text||'').split(/[。\n]/).filter(line=>!/(?:ではな|でな|禁止|避け|not |never |avoid )/i.test(line)).join('\n');
  const whole = notNegated(project.brief);
  if (/(?:全編|全ページ|全体|一切)[^。\n]{0,24}(?:セリフなし|台詞なし|台詞無し|無言|発話なし)|(?:サイレント|無声|無言|台詞のない|セリフのない)漫画|(?:wordless|silent|dialogue-free)\s+(?:comic|manga|story|book)/i.test(whole)) return true;
  return project.plan.outline.pages.every(page=>/(?:全コマ|全体|ページ全体)[^。\n]{0,16}(?:無言|セリフなし|台詞なし|発話なし)/.test(notNegated(page.beat+'\n'+(page.direction||''))));
};
export function bookDetailDialogueEntries(panel,castBible) {
  const source=String(panel).split('\n').filter(line=>!/^\s*(?:人物の正式名|正式なキャラ名)\s*[:：]/.test(line)
    &&!/^\s*[^「」\n:：]+[:：]\s*(?:セリフなし|台詞なし|台詞無し|発話なし|無言|no dialogue|no speech)[。.!！]?\s*$/i.test(line)).join('\n');
  return extractDialogueOnly(source,castBible,{asEntries:true});
}
export function assertBookDetailDialogue(project,pages,castBible) {
  const comics=pages.filter(page=>page.kind!=='illustration');
  if(!comics.length||explicitlySilentBook(project)||comics.some(page=>getScenarioPanelBlocks(page.scenario).some(panel=>bookDetailDialogueEntries(panel.text,castBible).length)))return;
  const error=new MangaControlError('BOOK_DIALOGUE_MISSING','The new book outline expanded into no spoken dialogue anywhere without an explicit silent-book request. Review this draft; no image was generated.');
  error.diagnosticContext=sanitizeFailureContext({stage:'book_detail_authoring',validationError:error.message,scenario:comics.map(page=>`PAGE ${page.pageId}\n${page.scenario}`).join('\n\n')});
  throw error;
}

export async function buildBookDetail(project, generateScenario, { onProgress = () => {}, signal } = {}) {
  const outline = project.plan?.outline;
  if (!outline?.pages || outline.pages.length !== project.pages.length) throw new MangaControlError('OUTLINE_REQUIRED', 'Generate and review the book outline first.');
  const castBible = project.castBible || (outline.cast || []).map((cast, i) => `## ${i + 1}. ${cast.name || cast.id}\n${cast.description}`).join('\n\n');
  if (castBible.length < 20) throw new MangaControlError('CAST_REQUIRED', 'The plan needs a usable shared cast description before detailed scenes can be generated.');
  const pages = [];
  for (const [index, page] of project.pages.entries()) {
    signal?.throwIfAborted();
    const beat = outline.pages[index];
    if (beat.pageId !== page.id) throw new MangaControlError('PLAN_INVALID', 'Outline page order does not match this project.');
    const settings = { ...project.settings, ...page.settings };
    // Only this page is user staging input. Structured book context must never
    // enter manual-staging extraction (other pages can contain panel numbers,
    // speech locks and cover-only directions).
    const context = `${beat.beat}\n${beat.direction || ''}\nPresentation for THIS PAGE: ${JSON.stringify(page.presentation)}\n${page.presentation?.coverLayout==='hero_top'?`PAGE FRAME CONTRACT: PageComposition.layout=free, frames=${JSON.stringify(bookHeroTopFrames(page.panelCount))}. First panel is the top-half hero; preserve this geometry and design connected figures/breakouts relative to these edges.`:''}`;
    const bookContext = `BOOK CONTINUITY DATA ONLY. This is not user staging for the current page. Never apply another page's dialogue, panel directions, title, silence or cover format to this page. Current page ID: ${page.id}; page ${index+1}/${project.pages.length}.\n${JSON.stringify({synopsis:outline.synopsis, pages:outline.pages.map(p=>({pageId:p.pageId,beat:p.beat})),previousPages:pages.map(p=>({pageId:p.pageId,kind:p.kind})),establishedContinuity:bookDetailContinuity(pages)})}\nFor an uninterrupted scene retain established location, each character wardrobe and object state; these are story continuity, not reference-sheet costume defaults. Current explicit scene/time jump, wardrobe/location change or changed object action takes precedence. Last observed state is context, never an instruction to repeat its pose/action/camera/dialogue. Preserve shared identity and continuity. Draw only the current page beat; do not restart or independently end the story.`;
    if (page.kind === 'illustration') {
      pages.push({ pageId: page.id, kind: page.kind, panelCount: 1, direction: context, scenario: null, settings });
      continue;
    }
    onProgress(`本の詳細台本 ${index + 1}/${project.pages.length} (${page.panelCount}コマ)`);
    const result = await generateScenario({ scenarioMode: createBookPageMode(page.panelCount, { finalPage: index === project.pages.length - 1 }),
      autoSelectPanelCount: false, bookOutlineExpansion:true, castList: castBible, categories: [], inputMode: 'manual', manualTopic: context, referenceAssetContext: bookContext,
      recentPageCompositions: pages.filter(p=>p.kind!=='illustration'&&p.panelCount>=2).slice(-6).reverse()
        .map(p=>summarizePageComposition(readPageComposition(p.scenario,p.panelCount),p.panelCount)).filter(Boolean),
      searchTopic: '', targetDate: '', customLocation: settings.customLocation || '', customOutfit: settings.customOutfit || '',
      punchlineType: settings.punchlineType || 'Auto', mosaicCopyrightedCharacters: settings.mosaicCopyrightedCharacters !== false,
      scenarioModelId: settings.scenarioModelId, onProgress, onCameraProgress: onProgress });
    signal?.throwIfAborted();
    if (!result?.scenario) throw new MangaControlError('SCENARIO_FAILED', 'The existing scenario engine did not return a completed page.');
    pages.push({ pageId: page.id, kind: page.kind, panelCount: page.panelCount, scenario: applyBookHeroTop(result.scenario,page.panelCount,page.presentation),
      location: result.location, outfit: result.outfit, model: result.usedModel, settings });
  }
  assertBookDetailDialogue(project,pages,castBible);
  const assetSpecs = (outline.assetSpecs || []).map(spec=>({...spec,revision:spec.revision??1}));
  return { outline, castBible, assetSpecs, detail: { castBible, assetSpecs, pages } };
}
