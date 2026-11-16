import { getMcpSettingCatalog } from './catalog.js';
import {isApprovedMcpScenario} from './scenario-approval.js';
export const MCP_CONTRACT_VERSION = 1;
export const MCP_STATE_EDIT_ACTIONS=Object.freeze(['topic','scenario','prompt','cast','recognition','reference_item','background','style_json','explanation','enhance_revert','history_select','history_clear','normalize_image','panel_inspect','panel_generate','panel_adopt','panel_discard']);
export const PAGE_SETTING_TYPES = Object.freeze({
  colorMode: ['color', 'monochrome'], showTitle: 'boolean', showWatermarks: 'boolean',
  engine:['openai','gemini'],backgroundSimplification:'boolean',useBackground360:'boolean',newsCategories:'string[]',
  mosaicCopyrightedCharacters: 'boolean',
  allowImageQualityRepair: 'boolean', pageNumber: 'boolean',
  analysisModelId: 'string', scenarioModelId: 'string', promptModelId: 'string',
  openAIImageQuality: 'string', openAIImageSize: 'string',
  customLocation: 'string', customOutfit: 'string', punchlineType: 'string',
  targetDate: 'string', inputMode: ['manual', 'news'],
  enhanceExpressions: 'boolean', enhanceBodyLang: 'boolean', enhanceEffects: 'boolean',
  enhanceBackgrounds: 'boolean', enhanceCameraWork: 'boolean', enhanceDialogue: 'boolean', enhanceGag: 'boolean',
});
export const DEFAULT_PAGE_SETTINGS = Object.freeze({
  colorMode: 'color', showTitle: true, showWatermarks: true, pageNumber: false,
  mosaicCopyrightedCharacters: true, allowImageQualityRepair: true,
  backgroundSimplification:false,useBackground360:false,inputMode:'manual',newsCategories:[],
  enhanceExpressions:false,enhanceBodyLang:false,enhanceEffects:false,enhanceBackgrounds:false,enhanceCameraWork:false,enhanceDialogue:false,enhanceGag:false,
});

export function assertAppliedMcpPage(job, state) {
  const context=state?.bookPageContext,page=job.project.pages.find(item=>item.id===job.pageId);
  if(!page||context?.projectId!==job.projectId||context?.pageId!==job.pageId)throw new MangaControlError('PAGE_NOT_APPLIED','Apply this exact project/page before invoking a page operation.');
  if(context.panelCount!==page.panelCount||context.kind!==page.kind||JSON.stringify(context.presentation)!==JSON.stringify(page.presentation||{}))throw new MangaControlError('PAGE_SETTINGS_STALE','Page layout/presentation changed. Apply the current page again.');
  const expected=validatePageSettings({...job.project.settings,...page.settings});
  if(Object.entries(expected).some(([key,value])=>JSON.stringify(context.appliedSettings?.[key])!==JSON.stringify(value)
    ||!(job.operation==='prompt'&&key==='backgroundSimplification')&&Object.hasOwn(state.settings||{},key)&&JSON.stringify(state.settings[key])!==JSON.stringify(value)))throw new MangaControlError('PAGE_SETTINGS_STALE','Project/page settings changed. Apply the current page again before invoking an API.');
  if(context.appliedEngine!==state.settings?.engine)throw new MangaControlError('ENGINE_CONNECTION_REQUIRED','The active provider changed. Apply this page after connecting its requested engine.');
  const bindings=Object.entries(resolvePageAssetBindings(job.project,page)).map(([slotId,binding])=>`${slotId}:${binding.asset.id}:${binding.role}`).sort();
  if(JSON.stringify(bindings)!==JSON.stringify(context.assetSignature))throw new MangaControlError('PAGE_ASSETS_STALE','Common assets changed. Apply the current page again.');
  if(state.images?.length!==context.appliedImages?.length||state.images?.some((image,index)=>image!==context.appliedImages[index]))throw new MangaControlError('PAGE_ASSETS_STALE','Application materials were edited after this page was applied.');
  if(job.expectedScenario!==undefined&&!isApprovedMcpScenario(job.expectedScenario,state))throw new MangaControlError('PAGE_SCENARIO_STALE','Application scenario differs from the stored approved page. Save the change, present it for approval, and apply the current page.');
  return true;
}
export function resolvePageAssetBindings(project,page) {
  const bindings={...project.assetBindings};
  for(const [slotId,override] of Object.entries(page?.assetOverrides||{})) {
    if(override===null)delete bindings[slotId];else bindings[slotId]=override;
  }
  return bindings;
}

export function validateBookPresentation(value={}) {
  const rules={coverLayout:['illustration','hero_top'],logoText:'string',authorName:'string',endingText:'string',endingOverlap:'boolean',pageNumberStart:'number'};
  if(!value||typeof value!=='object'||Array.isArray(value))throw new MangaControlError('INVALID_PRESENTATION','Presentation must be an object.');
  for(const [key,item] of Object.entries(value)) {
    const type=rules[key];
    if(!type||(Array.isArray(type)?!type.includes(item):typeof item!==type))throw new MangaControlError('INVALID_PRESENTATION',`Unsupported presentation field/value: ${key}.`);
    if(typeof item==='string'&&item.length>200)throw new MangaControlError('INVALID_PRESENTATION','Presentation lettering is limited to 200 characters.');
    if(key==='pageNumberStart'&&(!Number.isInteger(item)||item<0||item>999))throw new MangaControlError('INVALID_PRESENTATION','Page number start must be an integer 0–999.');
  }
  return structuredClone(value);
}
export class MangaControlError extends Error {
  constructor(code, message) { super(message); this.name = 'MangaControlError'; this.code = code; }
}
export function assertSafeIdentifier(id) {
  if (typeof id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,127}$/.test(id)) {
    throw new MangaControlError('INVALID_ID', 'Use the project/page/job identifier returned by this server.');
  }
  return id;
}
export function assertNoSecrets(value) {
  if (typeof value === 'string') {
    if (!value.startsWith('data:image/') && /\b(?:sk-(?:proj-)?[A-Za-z0-9_-]{20,}|AIza[A-Za-z0-9_-]{20,})/.test(value)) {
      throw new MangaControlError('SECRET_NOT_ALLOWED', 'Enter provider credentials only in the normal connected application.');
    }
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (/^(?:apiKey|api_key|credential|authorization|accessToken|refreshToken|secret|apiSession)$/i.test(key)) {
        throw new MangaControlError('SECRET_NOT_ALLOWED', 'Credentials and session storage are never accepted or persisted by MCP.');
      }
      assertNoSecrets(child);
    }
  }
}
export function validatePageSettings(settings = {}) {
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) throw new MangaControlError('INVALID_SETTINGS', 'Settings must be an object.');
  assertNoSecrets(settings);
  const catalog = getMcpSettingCatalog();
  for (const [key, value] of Object.entries(settings)) {
    const type = PAGE_SETTING_TYPES[key];
    if (!type || (type==='string[]'? !Array.isArray(value)||value.some(item=>typeof item!=='string')||new Set(value).size!==value.length : Array.isArray(type) ? !type.includes(value) : typeof value !== type)) {
      throw new MangaControlError('INVALID_SETTINGS', `Unsupported value for setting ${key}. Read manga_capabilities.`);
    }
    if (catalog[key] && (Array.isArray(value)?value.some(item=>!catalog[key].includes(item)):!catalog[key].includes(value))) throw new MangaControlError('UNKNOWN_SETTING_VALUE', `Unknown ${key}; choose a value listed by manga_capabilities. No default fallback is used.`);
  }
  return structuredClone(settings);
}
export const MCP_OPERATION_COVERAGE = Object.freeze({
  project: 'available', page_settings: 'available', snapshot: 'available', plan_approval: 'available',
  recognition: 'available', scenario: 'available', enhance: 'available', prompt: 'available',
  image: 'available', image_edit: 'available', history: 'available', assets: 'available',
  create_manga: 'available', exports: 'page_png_json_available', advanced_edits:'available',
});
