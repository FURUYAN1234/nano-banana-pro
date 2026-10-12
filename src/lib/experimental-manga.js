import { getScenarioPanelBlocks, validateMangaScenario } from './scenario-validation.js';
import { collectCastNameEntries, extractDialogueOnly, cleanCastList, extractCastLimitRule } from './panel-utils.js';
import { buildImageQualityContract, PANEL_EDGE_CONTINUITY_LOCK, LIMB_OWNERSHIP_CHECK } from './shared-image-quality.js';
import { COMPACT_EMOTION_STYLES, SYSTEM_VERSION } from './constants.js';
import { extractScenarioTitle, buildMangaWatermark } from './prompt-assembler.js';
import { MONOCHROME_IMAGE_QUALITY_CONTRACT, MONOCHROME_EMOTION_STYLES, MONOCHROME_RENDERING_LOCK_COMPACT } from './manga-render-mode.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from './web-prompt-chunks.js';
import { buildRenderOptionsContract, buildProtectedCastContract, COPYRIGHT_MOSAIC_TARGET_SCOPE } from './render-options.js';
import { createApiError, formatApiErrorDetails, getApiErrorInfo, sanitizeErrorMessage } from './api-errors.js';
import { selectImageQualityCandidate, runPageImageQuality } from './image-quality-failsafe.js';
import { inspectImageDimensions, extractNativeImageRegion, inspectVariablePanelFrames } from './manga-page-layout.js';
import { extractPanelCastContracts, castInventoryIssues } from './image-quality-qa.js';
import { classifyCameraElevation } from './composition-variety.js';

const fail = message => { throw new Error(`実験的コマ割り: ${message}`); };
const cancelled = signal => { if (signal?.aborted) throw new DOMException('実験を停止しました。', 'AbortError'); };
const direction = (text, name) => String(text).match(new RegExp(`\\[${name}:\\s*([^\\]]+)\\]`, 'i'))?.[1]?.trim() || '';

export const EXPERIMENTAL_PROMPT_REVISION = 11;
const READING_FLOW_DIRECTION = `READING FLOW WITH ACTING: preserve camera strength, drawing quality, style, expression and dramatic energy. Guide attention from each panel's first balloon through the focal action/reaction toward the next physical reading slot using motivated in-scene gaze, gesture, prop orientation, depth, value contrast and breathing room. Use only cues that fit the scene; no arrows, forced left-facing lineup or identical poses. Do not flatten perspective, weaken acting, turn a rear figure around, remove required cast/props, or make every panel equally quiet for legibility. Keep bold accents on the focal event while maintaining clear gutters and a readable route to the next panel. No eye-level shots: use a visibly higher or lower camera relative to the actors, including seated or chibi actors, with corresponding top/underside projection on faces, bodies and setting. Characters never look at the viewer or camera lens; their gaze belongs to a person, object or event inside the scene. A frontal face is not automatically lens contact; preserve physically motivated head turns and expressions. Hidden eyes and hand close-ups remain valid. If an optional visual cue competes with the story, remove that cue, not the story's energy.`;
export const EXPERIMENTAL_LAYOUTS = Object.freeze({
  strips:{label:'横長コマを縦に並べる',description:'Full-width horizontal strips; count rows.'},
  two_columns:{label:'左右2列の段組み',description:'Rows of two panels, right first; an odd final panel is full-width.'},
  hero_top:{label:'上に大きな横長の見せ場',description:'Panel1 is full-width, 38% height; remaining panels use two-column rows in the lower62%.'},
  hero_bottom:{label:'下に大きな横長の見せ場',description:'Last panel is full-width, 38% height; preceding panels use two-column rows in the upper62%.'},
  mixed_rows:{label:'横長と左右分割を混ぜる',description:'Rows are [panels in row, fraction of comic area height], fixed: count5=[[2,0.26],[1,0.42],[2,0.32]],6=[[2,0.20],[1,0.30],[2,0.23],[1,0.27]],7=[[1,0.18],[2,0.20],[1,0.22],[2,0.20],[1,0.20]],8=[[2,0.15],[1,0.25],[2,0.20],[1,0.25],[2,0.15]].'},
  tall_right_top:{label:'上段に縦長の見せ場',description:'Panel1 spans the upper52% on the right, panels2/3 stacked on its left; remaining panels form two-column rows below.'},
  tall_right_bottom:{label:'下段に縦長の見せ場',description:'Opening panels form two-column rows in the upper48%; final3 panels are a tall right panel followed by two stacked left panels.'},
  tall_right_middle:{label:'中段に縦長の見せ場',description:'For count5..7 only: top pair height0.23, middle tall right panel3 beside left panels4/5. Middle height: count5=0.77, count6/7=0.52; count6 has a bottom wide panel height0.25, count7 a bottom pair height0.25.'},
});

export function experimentalLayoutOptions(count) {
  if(!Number.isInteger(count)||count<5||count>8) fail('実験モードのコマ数は5〜8です。');
  return Object.entries(EXPERIMENTAL_LAYOUTS).filter(([id])=>id!=='tall_right_middle'||[5,6,7].includes(count)).map(([id,option])=>({id,...option}));
}
export const EXPERIMENTAL_VISUAL_EFFECTS = Object.freeze({
  hero_scale: {label:'見せ場を大きく',instruction:'HERO SCALE: use the allocated frame generously for the decisive gesture and expression, with strong near/far size contrast. Preserve required full-body crops and every scripted prop; never enlarge a face by replacing the required Camera.'},
  foreground_depth: {label:'手前・奥の対比',instruction:'FOREGROUND DEPTH: stage one motivated foreground hand/object, the acting subject in the middle, and a readable distant setting. Maintain physically consistent perspective and ownership; keep balloons and essential action clear.'},
  diagonal_frame: {label:'斜めのコマ枠',instruction:'DIAGONAL FRAME: use a mildly slanted frame edge inside its allocated rectangle, preserving a clear white gutter and the planned right-to-left reading slot. This is a border treatment, not permission to change Camera, add panels, clip required feet or cross an outer page edge.'},
  silent_pause: {label:'無言の間',silentInsert:true,instruction:'SILENT PAUSE: let a specific eye-line, held gesture or tiny reaction create a beat of silence. No added dialogue, caption, event or epilogue; retain the source moment.'},
  match_cut: {label:'同じ形でつなぐ',instruction:'MATCH CUT: connect adjacent moments of the same source beat through the existing prop silhouette, gesture or direction. Keep object identity/state and chronology; do not repeat the identical frozen pose or weaken an anchor Camera.'},
  motion_trail: {label:'動きの軌跡',instruction:'MOTION TRAIL: use directional streaks and, only for a moving prop, faint transparent trailing outlines behind its ONE current solid position. No extra solid props, cloned people, detached or repeated limbs. Preserve the actual action and its receiver.'},
  silhouette: {label:'シルエット',silentInsert:true,instruction:'SILHOUETTE: use a recognizable silhouette and readable negative shapes for a brief silent reaction. Retain hairstyle, wardrobe outline, pose and ownership. Keep the source art medium; do not conceal the anchor shot or invent a new lighting/time/weather event.'},
  negative_space: {label:'余白で見せる',silentInsert:true,instruction:'NEGATIVE SPACE: leave purposeful uncluttered space WITHIN this panel around the visible reaction, using the source sky/background. Do not enlarge outer page margins or erase the required setting or action.'},
  impact_background: {label:'背景で勢いを出す',insertOnly:true,instruction:'IMPACT BACKGROUND: in this short insert, simplify background details into medium-appropriate directional marks around the focal action. Retain spatial anchors and story props, no printed effect words, invented explosion or changed source rendering medium.'},
  rim_light: {label:'輪郭の光',instruction:'RIM LIGHT: if supported by the existing light source, use a restrained edge highlight to separate the actor from the background. Do not invent sunset, change time/weather, uniformly darken faces or replace the source art style. Omit when physically unsupported.'},
});

export function readExperimentalSource({ scenario, castList, colorMode, userDirection='' }) {
  const valid = validateMangaScenario(scenario, castList);
  if (!valid.ok) fail('元台本は台詞形式が有効な1〜4コマである必要があります。');
  const dialogue = [];
  const panels = getScenarioPanelBlocks(scenario).map(panel => {
    const camera = direction(panel.text, 'Camera');
    if (!camera) fail(`${panel.num}コマ目にCamera指定がありません。`);
    const dialogueIds = extractDialogueOnly(panel.text, castList, { forImagePrompt: true, asEntries: true }).map(entry => {
      const id = dialogue.length;
      dialogue.push({ id, sourcePanel: panel.num, speaker: entry.speaker, text: entry.text });
      return id;
    });
    return { id: panel.num, header:panel.header, text: panel.text, camera, style: direction(panel.text, 'EMOTION'), dialogueIds };
  });
  const withoutThought=String(scenario).replace(/<thought>[\s\S]*?<\/thought>/gi,'');
  const context=withoutThought.slice(0,withoutThought.indexOf(panels[0].header)).trim();
  return { scenario, context, castList, colorMode, panels, dialogue, userDirection };
}

// Preserve unrecognized prose verbatim; only known structural tags are removed.
// Dialogue references are lossless and prevent printing source speech twice.
function experimentalStoryFacts(source) {
  let marker='source-dialogue:';
  while(source.scenario.includes(marker)) marker='_'+marker;
  return [source.context,...source.panels.map(panel=>{
    let content=panel.text.slice(panel.header.length)
      .replace(/\[(?:Camera|EMOTION):\s*[^\]]+\]/gi,'')
      .replace(/^\s*BalloonLayout\s*[:：].*$/gim,'').trim();
    const entries=panel.dialogueIds.map(id=>source.dialogue[id]).sort((a,b)=>b.text.length-a.text.length);
    // One pass keeps repeated/sub-string speech from corrupting other references.
    if(entries.length) {
      const escaped=entries.map(d=>d.text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
      content=content.replace(new RegExp(escaped.join('|'),'g'),text=>`<${marker}${entries.find(d=>d.text===text).id}>`);
    }
    return `Source beat ${panel.id} (facts only, not a panel layout):\n${content}`;
  })].filter(Boolean).join('\n');
}

// Reading order is explicit: right-to-left within each row, then downward.
// Tall right-hand panels are read before the two stacked left-hand panels.
export function experimentalLayout(count, layout=count===8?'two_columns':'tall_right_middle') {
  if(!experimentalLayoutOptions(count).some(option=>option.id===layout)) fail('コマ数に対応する配置を選んでください。');
  const r = (x,y,w,h) => ({x,y,w,h});
  const pairRows=(n,y,height)=>{
    const rows=Math.ceil(n/2),h=height/rows;
    return Array.from({length:rows},(_,row)=>n-row*2===1?[r(0,y+row*h,1,h)]:[r(.5,y+row*h,.5,h),r(0,y+row*h,.5,h)]).flat();
  };
  if(layout==='strips') return Array.from({length:count},(_,i)=>r(0,i/count,1,1/count));
  if(layout==='two_columns') return pairRows(count,0,1);
  if(layout==='hero_top') return [r(0,0,1,.38),...pairRows(count-1,.38,.62)];
  if(layout==='hero_bottom') return [...pairRows(count-1,0,.62),r(0,.62,1,.38)];
  if(layout==='tall_right_top') return [r(.5,0,.5,.52),r(0,0,.5,.26),r(0,.26,.5,.26),...pairRows(count-3,.52,.48)];
  if(layout==='tall_right_bottom') return [...pairRows(count-3,0,.48),r(.5,.48,.5,.52),r(0,.48,.5,.26),r(0,.74,.5,.26)];
  if(layout==='mixed_rows') {
    const patterns={5:[[2,.26],[1,.42],[2,.32]],6:[[2,.2],[1,.3],[2,.23],[1,.27]],7:[[1,.18],[2,.2],[1,.22],[2,.2],[1,.2]],8:[[2,.15],[1,.25],[2,.2],[1,.25],[2,.15]]};
    let y=0;
    return patterns[count].flatMap(([n,h])=>{const row=n===1?[r(0,y,1,h)]:[r(.5,y,.5,h),r(0,y,.5,h)];y+=h;return row;});
  }
  const top=.23, middle=count===5?.77:.52;
  const rects=[r(.5,0,.5,top),r(0,0,.5,top),r(.5,top,.5,middle),r(0,top,.5,middle/2),r(0,top+middle/2,.5,middle/2)];
  if(count===6) rects.push(r(0,.75,1,.25));
  if(count===7) rects.push(r(.5,.75,.5,.25),r(0,.75,.5,.25));
  return rects;
}

export function experimentalLayoutFingerprint(plan) {
  return JSON.stringify(experimentalLayout(plan.count,plan.layout).map(rect=>
    Object.fromEntries(Object.entries(rect).map(([key,value])=>[key,Math.round(value*1e6)/1e6]))));
}

export function summarizeExperimentalLayouts(results) {
  return results.filter(({plan})=>Number.isInteger(plan?.count)&&plan.count>=5&&plan.count<=8).slice(-6).map(({plan})=>({count:plan.count,layout:plan.layout,geometry:experimentalLayoutFingerprint(plan)}));
}

export function buildExperimentalPlanPrompt(source, {recentLayouts=[]}={}) {
  return `You are a Japanese manga page editor. Return ONLY a JSON object, no markdown.
${READING_FLOW_DIRECTION}
ORIGINAL USER DIRECTION (not captions): ${JSON.stringify(source.userDirection||'')}. Preserve its page-specific count/range, pacing and visual requests within the supported 5..8 panels. A four-panel SOURCE SCRIPT format request describes the input beats, not necessarily the final page count. Experimental mode ALWAYS requires at least five and at most eight panels, even when the original request asks for four. Follow an explicit final-page count/range only within 5..8; otherwise choose within 5..8. The approved source below fixes the story, dialogue, cast and Camera: do not reintroduce discarded story events from the original request.
Identify the moment or feeling this story most deserves to show: action, discovery, contrast, reaction or deliberate quiet. Choose count=5..8, layout and beat allocation TOGETHER. At least one additional panel beyond the four source beats is mandatory: expand an existing action detail, reaction or silent pause without inventing an event. Omit unhelpful optional panels only while retaining at least five panels. Preserve all original facts, cast, ending, and dramatic camera strength. No new plot, prop, fact, speech, or epilogue.
Briefly compare two or three meaningfully different compatible geometries within THIS response, using different layout IDs. Merely changing count while retaining the same spanning-panel structure is NOT a different composition. Include a non-spanning arrangement and compare it fairly. Compare Camera fit, required body/prop visibility, dialogue space, reading clarity and emotional timing. No invented scores, panel/effect quota or automatic layout rotation. Explain each alternative's benefit and tradeoff; fully expand only the selected plan.
Schema fields: count (INTEGER 5..8), layout (compatible catalog ID), reason (concise Japanese reason for count AND layout), pageIntent (concise Japanese visual purpose), alternatives (up to three short objects: count,layout,benefit,tradeoff), panels (exactly count objects: sourcePanel INTEGER1..4, kind anchor|insert, camera string, action detailed Japanese visible staging, purpose short Japanese, dialogueIds integer array, breakout null or object, visualEffects array). Return actual values, not schema descriptions.
Catalog geometry is fixed. Do not invent or resize its heights. Keep numerical frame allocations out of action; the renderer supplies the exact rectangles. Use action for staging inside that available frame.
Exactly count panels. sourcePanel is 1..4 in nondecreasing order. Each original beat has exactly one anchor: copy its Camera verbatim, retain that beat's required action and style. Additional kind=insert panels may provide a different strong shot/close-up/reaction. Last panel is sourcePanel=4,kind=anchor; never add a beat after the ending. Each source dialogue ID appears once, in original order, only in panels of its source beat. Silent inserts use []. Do not paraphrase dialogue. Do not replace overhead/low-angle/wide/full-body direction with an easy frontal bust.
Fit the FRAME to the Camera, never weaken the Camera to fit a frame. Full-body requires space for the specified head-to-feet/support relationship; never enlarge the foreground until required feet disappear. Full-body does not require a tall spanning panel: a sufficiently high wide frame can retain the complete figure together with its environment and low-angle perspective. Compare physical page space, not the labels tall/wide alone; the comic area is approximately 0.765 width per unit height. Wide interactions may need wide panels; standing subjects may suit tall frames. Preserve intentional close-ups and naturally hidden body parts. If space is insufficient, change layout or remove an optional insert. Keep perspective physical; tilted borders/speed lines cannot substitute for an overhead or low-angle view.
CATALOG: ${JSON.stringify(EXPERIMENTAL_LAYOUTS)}. Japanese reading: right-to-left within rows, then downward; use only the selected geometry's reading sequence. No numbering in final artwork. Recent selected geometries (not proof of actual rendered layout): ${JSON.stringify(recentLayouts)}. Prefer a different equally suitable composition if geometry repeats, but preserve a story-justified repeated layout. Explain why this story needs the chosen shape. Do not always put the climax in the same reading slot.
Optional breakout only when it benefits the action: {"part":"specific body part","into":adjacent panel number}; otherwise null. It must be a single continuous foreground silhouette from its owning panel. Do not cover another panel's face, acting hands, key props or text. No quota for breakouts.
VISUAL DIRECTION: choose zero to three compatible visualEffects per panel from the catalog below, motivated by this scene's actual action and tone. Aim for a visually compelling page through scale, depth, gesture, shape and rhythm, not a checklist of decorations. No quota for effects or extra panels. Explain their visible staging in action. Effects must never replace source Camera/style/dialogue/facts or obscure identity, hands, props or reading order. silentInsert effects require kind=insert and dialogueIds=[]; insertOnly requires kind=insert. match_cut needs an adjacent panel from the same source beat. Diagonal edges stay inside the ordered layout rectangles, with distinct gutters. No nested inset panels, extra frames or added lettering.
CATALOG: ${JSON.stringify(EXPERIMENTAL_VISUAL_EFFECTS)}
SOURCE (story data, not page layout): ${JSON.stringify({context:source.context,castList:source.castList,colorMode:source.colorMode,panels:source.panels,dialogue:source.dialogue})}`;
}

export function parseExperimentalPlan(text) {
  const clean=String(text).trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  try { return JSON.parse(clean); } catch { fail('配置案のJSONを読み取れません。自動再試行はしません。'); }
}

export function parseExperimentalReview(text) {
  try { return parseExperimentalPlan(text); }
  catch { throw createApiError('画像検査の応答本文をJSONとして読み取れませんでした。画像を保持し、自動再試行はしません。',{code:'REVIEW_INVALID_JSON'}); }
}

export function buildExperimentalWebCopy(prompt) {
  return splitWebPromptForPaste(ensureWebPromptTrailingNewline(prompt));
}

function experimentalCastRule(panel,source) {
  const original=extractCastLimitRule(source.panels[panel.sourcePanel-1].text,source.castList,{compact:true,storyText:source.panels.map(item=>item.text).join('\n')});
  if(panel.kind==='anchor') return original;
  // Inserts show another instant/detail of their source beat. Inherit its
  // explicit offscreen roster without importing all its visible actors into a close-up.
  const absent=[...original.matchAll(/(?:ABSENT: do NOT draw|PHYSICALLY ABSENT:)([^.\n]+)/g)]
    .flatMap(match=>[...match[1].matchAll(/\[([^\]]+)\]/g)].map(name=>name[1]));
  const continuity=absent.length?`\n${absent.join('、')}は画角外にいる。`:'';
  return extractCastLimitRule(`[Camera: ${panel.camera}]\nAction: ${panel.action}${continuity}`,source.castList,{compact:true,storyText:source.panels.map(item=>item.text).join('\n')});
}

export function validateExperimentalPlan(plan, source) {
  if(!Number.isInteger(plan?.count)||plan.count<5||plan.count>8||!Array.isArray(plan.panels)||plan.panels.length!==plan.count) fail('コマ数は5〜8で、配置案と一致する必要があります。');
  if(typeof plan.reason!=='string'||!plan.reason.trim()) fail('コマ数を選んだ理由が必要です。');
  if(plan.panels.some(panel=>classifyCameraElevation(panel.camera)==='eye')) fail('実験モードではアイレベルを使用できません。俯瞰またはアオリで配置を設計してください。');
  if(!experimentalLayoutOptions(plan.count).some(option=>option.id===plan.layout)) fail('コマ数に対応する配置が必要です。');
  const rects=experimentalLayout(plan.count,plan.layout), anchors=[0,0,0,0], dialogue=[];
  let previous=1;
  plan.panels.forEach((p,i)=>{
    if(!Number.isInteger(p.sourcePanel)||p.sourcePanel<previous||p.sourcePanel>4) fail('元の出来事の順番を変更できません。');
    previous=p.sourcePanel;
    const original=source.panels[p.sourcePanel-1];
    if(!['anchor','insert'].includes(p.kind)||typeof p.camera!=='string'||!p.camera.trim()||typeof p.action!=='string'||!p.action.trim()||!Array.isArray(p.dialogueIds)) fail('各コマの役割・Camera・状況・台詞IDが必要です。');
    const effects=p.visualEffects??[];
    if(!Array.isArray(effects)||effects.length>3||new Set(effects).size!==effects.length||effects.some(id=>!Object.hasOwn(EXPERIMENTAL_VISUAL_EFFECTS,id))) fail('演出は既知の候補から重複なく3つまで選びます。');
    effects.forEach(id=>{
      const effect=EXPERIMENTAL_VISUAL_EFFECTS[id];
      if(effect.silentInsert&&(p.kind!=='insert'||p.dialogueIds.length)) fail('この演出は無言の挿入コマ専用です。');
      if(effect.insertOnly&&p.kind!=='insert') fail('この演出は挿入コマ専用です。');
      if(id==='match_cut'&&![plan.panels[i-1],plan.panels[i+1]].some(next=>next?.sourcePanel===p.sourcePanel)) fail('同じ形でつなぐ演出には同じ出来事の隣接コマが必要です。');
    });
    if(p.kind==='anchor') {
      anchors[p.sourcePanel-1]++;
      if(p.camera.trim()!==original.camera) fail(`${i+1}コマ目のCameraを弱めたり置換できません。`);
    }
    p.dialogueIds.forEach(id=>{
      if(!Number.isInteger(id)||source.dialogue[id]?.sourcePanel!==p.sourcePanel) fail('台詞を別の出来事へ移せません。');
      dialogue.push(id);
    });
    if(p.breakout!==null&&p.breakout!==undefined) {
      const b=p.breakout, a=rects[i], target=rects[b.into-1];
      const adjacent=target&&b.into!==i+1&&((Math.abs(a.x+a.w-target.x)<.00001||Math.abs(target.x+target.w-a.x)<.00001)&&Math.min(a.y+a.h,target.y+target.h)>Math.max(a.y,target.y)+.001
        ||(Math.abs(a.y+a.h-target.y)<.00001||Math.abs(target.y+target.h-a.y)<.00001)&&Math.min(a.x+a.w,target.x+target.w)>Math.max(a.x,target.x)+.001);
      if(!Number.isInteger(b.into)||!adjacent||typeof b.part!=='string'||!b.part.trim()) fail('枠越え先は辺を共有する隣接コマに限ります。');
    }
  });
  if(anchors.some(n=>n!==1)) fail('元の4つの出来事を各1回保持してください。');
  if(plan.panels.at(-1).sourcePanel!==4||plan.panels.at(-1).kind!=='anchor') fail('元の結末を最後に保持してください。');
  if(dialogue.join(',')!==source.dialogue.map(d=>d.id).join(',')) fail('元の台詞の欠落・重複・順番変更があります。');
  const expectedCast=extractPanelCastContracts(plan.panels.map((p,i)=>`## Panel ${i+1}\n${experimentalCastRule(p,source)}`).join('\n'));
  return {...plan,expectedDialogue:source.dialogue.map(({id,text})=>({id,text})),expectedCast};
}

function physicalPanelPosition(rect) {
  const side=rect.w===1?'FULL WIDTH':rect.x===0?'LEFT':'RIGHT';
  return `${side}, top=${Math.round(rect.y*100)}%, bottom=${Math.round((rect.y+rect.h)*100)}% of comic area`;
}

export function buildExperimentalReadingReviewContract(plan) {
  const rects=experimentalLayout(plan.count,plan.layout);
  return `PHYSICAL INVENTORY: Observe the actual drawn frames. The supplied native crops use independently observed frame bounds and physical reading order, not planned proportions. Number actual panels RIGHT before LEFT within each row, then downward. A spanning right panel is read before the stacked left panels. NEVER move observations to match expected story events. Each evidence item includes dialogue: complete balloon STRINGS ordered by balloon position RIGHTMOST FIRST, then downward; read vertical columns right-to-left within each balloon. Preserve punctuation and heart symbols exactly; never paraphrase. Use the native frame crop, [] for silence, null if unreadable. Never copy expected text as observations. pageEvidence must be one STRING transcribing observed title/footer, marking missing/unreadable text. Planned slots are comparison targets only, NEVER observed geometry: ${JSON.stringify(rects.map((rect,i)=>({panel:i+1,position:physicalPanelPosition(rect)})))}.`;
}

function orderObservedFrames(observations,count) {
  const invalid=()=>{throw createApiError('実画像のコマ境界を確認できません。予定位置で切り出さず、検査を未確認として保持します。',{code:'REVIEW_INVALID_GEOMETRY'});};
  if(!Array.isArray(observations)||observations.length!==count) return invalid();
  for(const frame of observations) {
    const b=frame?.bounds;
    if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)
      ||b[0]<0||b[1]<0||b[2]<.03||b[3]<.03||b[0]+b[2]>1.001||b[1]+b[3]>1.001) return invalid();
  }
  for(let i=0;i<observations.length;i++) for(let j=i+1;j<observations.length;j++) {
    const [x,y,w,h]=observations[i].bounds,[a,b,c,d]=observations[j].bounds;
    const overlap=Math.max(0,Math.min(x+w,a+c)-Math.max(x,a))*Math.max(0,Math.min(y+h,b+d)-Math.max(y,b));
    if(overlap>Math.min(w*h,c*d)*.08) return invalid();
  }
  const pending=[...observations].sort((a,b)=>a.bounds[1]-b.bounds[1]),ordered=[];
  while(pending.length) {
    const top=pending[0].bounds[1],row=[];
    while(pending.length&&pending[0].bounds[1]-top<.02)row.push(pending.shift());
    ordered.push(...row.sort((a,b)=>b.bounds[0]-a.bounds[0]));
  }
  return ordered;
}

export async function prepareExperimentalReviewImages(image,plan,signal,{inspect=inspectImageDimensions,crop=extractNativeImageRegion}={},observedFrames=[]) {
  cancelled(signal);
  const original=`data:${image.mimeType};base64,${image.base64Img}`;
  const {width,height}=await inspect(original);
  const images=[original],labels=[];
  const frames=observedFrames.length?orderObservedFrames(observedFrames,plan.count):[];
  for(const [index,frame] of frames.entries()) {
    cancelled(signal);
    const [left,top,w,h]=frame.bounds;
    const x=Math.round(width*left),y=Math.round(height*top);
    const right=Math.min(width,Math.round(width*(left+w))),bottom=Math.min(height,Math.round(height*(top+h)));
    const region=await crop(original,{x,y,width:right-x,height:bottom-y});
    images.push(region.dataUrl);
    labels.push(`Image ${index+2} = physical P${index+1}, observed full-page bounds=${JSON.stringify(frame.bounds)}`);
  }
  const footerY=Math.floor(height*.978),half=Math.floor(width/2);
  for(const [x,w] of [[0,half],[half,width-half]]) {
    cancelled(signal);
    images.push((await crop(original,{x,y:footerY,width:w,height:height-footerY})).dataUrl);
  }
  cancelled(signal);
  return {images,instruction:`ATTACHED SPATIAL EVIDENCE: Image 1 is the intact full page for count, actual layout, title and overall continuity. Images 2..${frames.length+1} are native-pixel crops of the frame bounds detected from the actual image pixels, sorted right-to-left then downward, not cuts at planned proportions. ${labels.join('; ')}. Images ${frames.length+2}/${frames.length+3} are left/right footer crops; they are NOT story panels. For evidence Pn, inspect its assigned crop and the intact page. Never renumber crops from story events. If a measured crop straddles actual frames or clips required evidence, report uncertainty; never treat neighboring or clipped text as that panel's speech. The intact page is authoritative. Return ALL top-level keys: status, observedCount, readingOrder, camera, style, story, anatomy, pageText, breakout, issues, pageEvidence (one STRING), evidence (exactly ${plan.count} panel objects with panel, dialogue, camera, style, story, anatomy, cast_instances; exclude footer crops).`};
}

function readObservedBalloons(evidence) {
  const regions=evidence?.text_regions;
  if(!Array.isArray(regions)||regions.some(r=>!r||!['speech_balloon','printed_object','caption','sound_effect'].includes(r.region_kind))) return null;
  const speech=regions.filter(r=>r.region_kind==='speech_balloon');
  if(speech.some(r=>typeof r.text!=='string'||!r.text.trim()||!Number.isFinite(r.center_x)||r.center_x<0||r.center_x>1)) return null;
  return [...speech].sort((a,b)=>b.center_x-a.center_x).map(r=>r.text);
}

export async function reviewExperimentalImage({image,plan,prompt,signal},request,regionTools) {
  cancelled(signal);
  const detected=await (regionTools?.detect||inspectVariablePanelFrames)(`data:${image.mimeType};base64,${image.base64Img}`,plan.count);
  const frames=orderObservedFrames(detected,plan.count);
  const spatial=await prepareExperimentalReviewImages(image,plan,signal,regionTools,frames);
  // Read lettering and its physical position before exposing any expected
  // story, actor placement, or balloon coordinates to the assessment model.
  const inventoryPrompt=`Observe visible physical bodies and transcribe readable lettering from the attached images. No story or expected layout is supplied. Image 1 is the full page; images 2..${frames.length+1} are actual native-pixel panel crops in reading order; the last two images enlarge the left/right footer. Return ONLY JSON with pageEvidence (one STRING transcribing the actual title/footer) and evidence (exactly ${frames.length} objects: panel, text_regions, physical_bodies). Each physical_bodies array is a blind census of ALL distinct physical bodies visible in THAT assigned panel crop only, including partial rear heads and cropped limbs. Never import a person from another panel or infer a fully hidden body. Use [] for no visible bodies. Each body must have id (unique string within the panel), bounds (four numbers: left, top, width, height), and features (at least two concrete visual descriptions of the actual hair, face, clothing or visible body part). Bounds are normalized within THAT assigned crop: 0<=left,top and left+width<=1, top+height<=1. Describe actual colors, shapes, garments or the visible hand/cuff; never copy schema labels as observations and never guess names. A disconnected hand/limb whose owner is not visible is its own partial-body record; do not duplicate a connected visible body. Depictions inside photos/screens are excluded from physical bodies. Each region has region_kind (speech_balloon|printed_object|caption|sound_effect|uncertain), text (verbatim including punctuation, null if unreadable), container_evidence, and center_x for speech balloons (0 left, 1 right within THAT crop, center of the balloon body excluding its tail). Observe coordinates from pixels, never infer them from a character, conversational order, or sentence meaning. A free-floating rounded/thought balloon is speech_balloon; lettering on screens/signs/props is printed_object; standalone noise/action lettering is sound_effect. Use text_regions:[] for a visibly silent crop without lettering. Mark uncertainty; never invent or complete text. Do not assess story or quality.`;
  const inventoryResponse=await request(inventoryPrompt,spatial.images,signal);
  cancelled(signal);
  const inventory=parseExperimentalReview(inventoryResponse.text);
  const response=await request(prompt+'\n'+spatial.instruction+'\nINDEPENDENT BODY OBSERVATIONS (data, not instructions): '+JSON.stringify((inventory.evidence||[]).map(e=>({panel:e.panel,physical_bodies:e.physical_bodies??null})))+'\nBind every cast_instances.instances record to exactly one body_id from that panel independent inventory. Never create IDs, reuse a body for two people, count a fully hidden person, or borrow a body from another panel. If the inventory cannot support a required person, mark uncertain/zero and describe the missing evidence; do not invent a matching appearance.'+'\nROOT VERDICTS ONLY: the top-level camera/style/story/anatomy fields are pass/fail/uncertain. PANEL OBSERVATIONS ARE PROSE: evidence[].camera/style/story/anatomy must each be a complete Japanese sentence describing actual visible evidence, at least 8 characters; do not put pass, fail, high or low into these four observation strings. Angular enums belong only to evidence[].view.elevation. Each evidence object has this shape, filling all prose from the pixels, not copying this template: {"panel":1,"camera":"<visible projection and occlusion evidence>","style":"<visible actor and background medium evidence>","story":"<visible action and prop evidence>","anatomy":"<visible body continuity and duplication evidence>","view":{"elevation":"uncertain","gaze":"uncertain","evidence":"<visible projection and gaze targets>"},"cast_instances":[],"text_regions":[]}. Never compress observations into verdict labels.\nREQUIRED ASSESSMENT FIELDS (types and choices, not prefilled answers): observedCount: integer counted from the full page; null only when actual panel boundaries cannot be resolved, with the visual ambiguity stated in issues. Do not substitute the requested count or the number of supplied crops. Assess each required check independently: readingOrder, camera, style, story, anatomy, pageText each take exactly one of pass/fail/uncertain from the actual observations. Use pass for supported compliance, fail for a concrete material violation, uncertain only for an unresolved observation; name that unresolved observation in issues. An uncertain check must not erase a confirmed failure or make unrelated checks uncertain. status: warning when a concrete failure is present; otherwise unverified if any required check is unresolved; otherwise pass. breakout: pass/fail/uncertain when requested, not_requested otherwise. issues: array of concrete Japanese problems or unresolved observations, empty only when none. pageEvidence: one string transcribing observed lettering. evidence: array containing every panel observation. Complete observations first and derive every root verdict from them before returning JSON. These fields have no default verdict. Never use a boolean, sentence or object for a root verdict. Supply every panel observation in evidence. Each evidence item MUST include text_regions: an array of observed regions with region_kind (speech_balloon|printed_object|caption|sound_effect|uncertain), text (verbatim or null), container_evidence, and center_x for speech balloons (0 left, 1 right within its native crop, body center excluding tail). A free-floating rounded/thought balloon is speech_balloon; lettering on camera screens, signs or props is printed_object. Standalone action/noise lettering is sound_effect, NEVER speech. Include text_regions:[] in a visibly silent frame without lettering. Do not write silence descriptions as speech. Never guess uncertain text. The program filters speech_balloon regions and sorts their coordinates; your JSON order is not the reading order.',spatial.images,signal);
  cancelled(signal);
  const assessed=parseExperimentalReview(response.text);
  const evidence=frames.map((frame,i)=>{
    const findings=Array.isArray(assessed.evidence)?assessed.evidence.filter(e=>e?.panel===i+1):[];
    const transcriptions=Array.isArray(inventory.evidence)?inventory.evidence.filter(e=>e?.panel===i+1):[];
    const transcription=transcriptions.length===1?transcriptions[0]:null;
    const [x,y,w,h]=frame.bounds;
    return {...(findings.length===1?findings[0]:{}),panel:i+1,center:[x+w/2,y+h/2],bounds:frame.bounds,
      physical_bodies:transcription?.physical_bodies??null,text_regions:transcription?.text_regions??null,dialogue:transcription?readObservedBalloons(transcription):null};
  });
  // Read only the compiler's explicit page-text contract, never model-supplied expectations.
  let expectedPageText=null;
  try {
    const title=JSON.parse(prompt.match(/Title required EXACTLY ("(?:\\.|[^"\\])*")\. Footer expected exact text:/)?.[1]);
    const footer=JSON.parse(prompt.match(/Footer expected exact text: (null|\{[^\n]*?\}) \(null means no footer\)/)?.[1]);
    expectedPageText=[title,...Object.values(footer||{})];
    if(expectedPageText.some(text=>typeof text!=='string'||!text.trim())) expectedPageText=null;
  } catch { /* Unknown legacy contract must stay unverified. */ }
  return {review:{...assessed,inspectionVersion:4,pageEvidence:inventory.pageEvidence,expectedPageText,evidence,observedFrames:frames.map(({bounds})=>({bounds}))},model:response.model,
    finishReason:response.finishReason,characters:inventoryResponse.text.length+response.text.length,attachedImages:spatial.images.length,requests:2};
}

export function buildExperimentalImagePrompt(plan, source, { colorMode, mosaicCopyrightedCharacters=false, showWatermarks=false, referenceContext='', imageEngineLabel='Gemini', scenarioModelLabel }={}) {
  validateExperimentalPlan(plan,source);
  const rects=experimentalLayout(plan.count,plan.layout);
  const title=extractScenarioTitle(source.scenario);
  const scenarioOutfit=source.scenario.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim();
  const activeOutfit=scenarioOutfit&&!/^(なし|キャラシート準拠|none|default)/i.test(scenarioOutfit)?scenarioOutfit:'';
  const watermark=buildMangaWatermark({imageEngineLabel,scenarioModelLabel,systemVersion:SYSTEM_VERSION,isChatGPTFamily:/^ChatGPT/.test(imageEngineLabel)});
  return `Create ONE complete Japanese manga page with EXACTLY ${plan.count} framed panels. A4 portrait, intact outer page. Outer left/right white margins: 0.6% of page width each; comic frames use the remaining 98.8%, without clipping. Reserve top 6.5% for title, middle 91.3% for panels and gutters, bottom 2.2% for footer. Internal white gutters remain visibly separate; never widen outer margins to imitate gutters.
Top title EXACTLY ${JSON.stringify(title)}, large EXTRA-BOLD condensed Japanese Gothic, centered on plain white with no enclosing frame, banner or rule. Dialogue uses vertical Japanese manga Mincho lettering. Never print panel numbers, planning labels, Camera or source-reference tokens. RTL READING ORDER: P1 through P${plan.count} below are already ordered right-to-left, then top-to-bottom. Follow these rectangles and preserve distinct story moments.
PHYSICAL READING PATH (not printed): ${rects.map((rect,i)=>`P${i+1} [${physicalPanelPosition(rect)}]`).join(' -> ')}. FINAL ENDING is P${plan.count} [${physicalPanelPosition(rects.at(-1))}]. Never move its dialogue/reaction to an earlier physical slot or swap the final two panels.
${colorMode==='monochrome'?'BLACK AND WHITE ink and screentones only, no colored regions.':'Full color; preserve each source panel art style.'}
${READING_FLOW_DIRECTION}
PANEL RENDERING MAP (assignments only; never reorder frames): ${JSON.stringify(plan.panels.map((p,i)=>({panel:i+1,rendering:source.panels[p.sourcePanel-1].style||'source/reference'})))}.
Identity is not a frozen drawing style. Keep the same age, hairstyle, eyewear, wardrobe, and distinctive identity cues, while deliberately REDRAWING the visible actors in each assigned style. Where the source style calls for it, facial construction, eye-to-face proportions, head-to-body proportions, contours and shadow shapes change with that style. These changes are intentional, not identity drift. Explicit source identity requirements still prevail. Treat each frame as its own rendering pass: do not carry NORMAL anime eyes and a cel-shaded face through GEKIGA or paint a watercolor background behind an unchanged opaque actor. In GEKIGA, ALL visible actors need narrow anatomical eyelids, realistic facial planes and ink-built face shadows, even in a wide shot; do not zoom in or crop the scene to obtain them. In WATERCOLOR, transparent pigment and paper light construct faces and clothing as well as the environment. Keep the assigned medium's contrast visibly distinct from neighboring styles; dramatic expression or texture alone is not a style change.
REFERENCES: attached images are identity/style/asset references, never copy their sheet layout or labels. ${activeOutfit?'The source Outfit replaces reference-sheet clothing; keep identity, hair and eyewear.':''} ${referenceContext}
CAST: ${cleanCastList(source.castList,activeOutfit)}
SOURCE FACTS (not captions): dialogue-reference tokens refer only to the exact dialogue IDs assigned below; never draw tokens or repeat speech from these facts. Keep every source-supported condition; source beats are not output panel numbers.
${experimentalStoryFacts(source)}
PAGE PLAN layout=${plan.layout}: normalized allocation rectangles within the comic area ONLY, y=top,x=left. Reserve narrow white gutters INSIDE the allocation edges, without changing reading slots. A spanning rectangle is one uninterrupted frame, never divide it. Source facts cannot override this selected page geometry.
PAGE DIRECTION: ${typeof plan.pageIntent==='string'?plan.pageIntent:plan.reason}
Fit the required Camera and visible body/prop relationships inside each frame before optional accents. Keep intentional crops; never impose full-body framing on close-ups. Execute each medium on faces, bodies, clothing, props and background; do not merely filter an unchanged anime face.
${plan.panels.map((p,i)=>{
    const orig=source.panels[p.sourcePanel-1];
    const recipe=(colorMode==='monochrome'?MONOCHROME_EMOTION_STYLES:COMPACT_EMOTION_STYLES)[orig.style];
    // Anchors retain the source cast. Inserts use only their own visible staging,
    // so a hand close-up does not acquire every actor from the source beat.
    const castRule=experimentalCastRule(p,source);
    return `P${i+1} rect=${JSON.stringify(rects[i])}; source beat=${p.sourcePanel}; Camera (execute physical projection at full strength): ${p.camera}; Style: ${orig.style||'preserve source/reference art style'}; ${recipe||''}; Action: ${p.action}; ${p.kind==='anchor'?'Retain all essential visible action and prop/state evidence of original beat.':''}
${castRule}
Dialogue (verbatim, in this order, rightmost balloon first): ${p.dialogueIds.length?p.dialogueIds.map(id=>JSON.stringify(source.dialogue[id])).join('; '):'SILENT, no invented speech.'}
${(p.visualEffects??[]).map(id=>EXPERIMENTAL_VISUAL_EFFECTS[id].instruction).join('\n')}
${p.breakout?`Intentional border breakout: ${p.breakout.part} of a character in P${i+1} crosses into adjacent P${p.breakout.into}. One continuous foreground layer; border and gutter disappear behind its connected silhouette and resume after it. Keep source shoulder/hip ownership, no duplicate or detached limb. Keep adjacent faces, acting hands, key props and text entirely unobscured; no cross-scene interaction. If a clean crossing is impossible, keep the body inside its source panel.`:'Keep body silhouettes inside this panel.'}`;
  }).join('\n')}
${colorMode==='monochrome'?`${MONOCHROME_IMAGE_QUALITY_CONTRACT}\n${MONOCHROME_RENDERING_LOCK_COMPACT}`:buildImageQualityContract({panelMedia:true})}
${PANEL_EDGE_CONTINUITY_LOCK}
${LIMB_OWNERSHIP_CHECK}
${buildRenderOptionsContract({mosaicCopyrightedCharacters,showWatermarks})}
${COPYRIGHT_MOSAIC_TARGET_SCOPE}
${buildProtectedCastContract(collectCastNameEntries(source.castList).map(entry=>entry.displayName))}
${showWatermarks?`FOOTER ONLY, below the last panel: both credits once, tiny horizontal, complete and legible within the safe edges, never overlapping. Bottom-left EXACTLY "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780". Bottom-right EXACTLY ${JSON.stringify(watermark)}. Do not place either credit inside panels or on props.`:'No watermark or footer text; leave footer blank.'}
Before rendering verify panel count, Japanese reading flow, original ending, every speech line and speaker, strong physical Camera projection, continuous anatomy and clean breakout layering. No universal frontal bust conversion. No new title unless present in source.`;
}

export function buildExperimentalReviewPrompt(plan, source, options={}) {
  const {expectedCast}=validateExperimentalPlan(plan,source);
  // The enlarged-frame reader never receives the expected speech. Comparison
  // is deterministic afterwards, so a model cannot echo the answer as OCR.
  const blind=value=>{
    let serialized=JSON.stringify(value);
    for(const entry of [...source.dialogue].sort((a,b)=>b.text.length-a.text.length)) {
      serialized=serialized.replaceAll(JSON.stringify(entry.text).slice(1,-1),`<speech-${entry.id}-withheld>`);
    }
    return serialized;
  };
  const expectedFooter=options.showWatermarks?{
    left:'ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780',
    right:buildMangaWatermark({imageEngineLabel:options.imageEngineLabel||'Gemini',scenarioModelLabel:options.scenarioModelLabel,systemVersion:SYSTEM_VERSION,isChatGPTFamily:/^ChatGPT/.test(options.imageEngineLabel||'')})
  }:null;
  return `Read the actual attached generated manga. Return ONLY JSON with status (pass|warning|unverified), observedCount (integer or null), readingOrder/camera/style/story/anatomy/pageText (pass|fail|uncertain), breakout (pass|fail|uncertain|not_requested), issues (array of Japanese observed problems, empty when none), pageEvidence (STRING: transcribe actual title/footer lettering seen, including missing/unreadable text), evidence (one item for EVERY panel, with panel number and Japanese camera/style/story/anatomy visual observations, and breakout observation when requested). ${buildExperimentalReadingReviewContract(plan)} Never copy example text, source descriptions, or Camera labels as observed evidence. Defaults for anything not observable are uncertain/null, never pass. Optional border breakouts and visualEffects may be omitted if needed for a clean coherent composition; their absence alone is not a material failure or a reason for regeneration. Distinguish translucent prop motion trails from solid duplicate props or extra limbs. Observe slanted borders as borders, not a change to the physical Camera.
${READING_FLOW_DIRECTION}
Inspect exact panel count/reading order, ALL required camera elevations/projections/crops and style differences, original action/facts/ending/dialogue ownership and connected anatomy; adjacent faces/text remain legible. Locate each observation in the actual page, describe visible body extent and occlusion; never infer hidden/cropped feet or a breakout from the plan. Cropped feet alone are advisory, never a camera failure or a regeneration reason. Camera observations describe visible head/shoulder planes, horizon and perspective; style observations describe actor faces/bodies and background pigment/ink separately, not tag names. Keep each observation concise.
VIEW OBSERVATION: Every panel evidence includes view:{elevation:"high|low|eye_level|uncertain",gaze:"in_scene|at_viewer|no_visible_eyes|uncertain",evidence:"concrete visible projection cues and gaze targets, in Japanese"}. Choose one value per enum from the pixels, not the plan. high/low describes physical projection relative to the subjects, not a tilted border, a tall character or background alone. For a hands-only insert judge the camera above/below the action surface. Inspect all visible eyes: at_viewer if any actor clearly looks into the page-reader lens; in_scene only if the visible gazes have in-scene targets; no_visible_eyes for rear heads or hand close-ups; uncertain for ambiguous direction. A face shown frontally does not by itself prove camera eye contact. Reading-flow accents are optional: do not mark a vivid coherent scene defective merely because it lacks an obvious guiding line.
CAST INSTANCE INVENTORY: Include cast_instances in each panel evidence for every required name in ${JSON.stringify(expectedCast)}. Each record: {name,observed_count,status:"ok|defect|uncertain",instances:[{body_id,location,matched_features:[two visible identity cues]}]}. Count distinct physical bodies, including partial rear heads and background actors; Camera/Action/speech mentions refer to the SAME body. A foreground shoulder and the same actor in the background are TWO instances. A legitimate crop or hidden face is not absence; mark uncertainty when identity cannot be established. Zero requires an evidence string describing visible absence. Only explicitly listed replicaNames may have tiny contained representations excluded from physical count. Never exclude a full-size body as a replica. Count must equal instances.length. These records are observations, not a restatement of the required count.
Title required EXACTLY ${JSON.stringify(extractScenarioTitle(source.scenario))}. Footer expected exact text: ${JSON.stringify(expectedFooter)} (null means no footer). Transcribe observed lettering separately; never complete unreadable lettering from this expected text. Missing required title/credits is fail; unreadable is uncertain. Requested labels are NOT visual evidence. status=warning when a concrete material failure is confirmed, even if another check is uncertain. Otherwise status=pass only when count matches, all required checks pass, and complete visual evidence exists; unresolved required checks mean unverified. Optional breakout absence alone does not change status. Do not suggest paid regeneration for a minor coherent variation. SOURCE (expected speech withheld; transcribe only the attached crops): ${blind({context:source.context,castList:source.castList,panels:source.panels})}\nPLAN: ${blind({count:plan.count,layout:plan.layout,panels:plan.panels})}`;
}

export function validateExperimentalReview(review, plan) {
  review=review?{...review}:review;
  const keys=['readingOrder','camera','style','story','anatomy','pageText'];
  const text=value=>typeof value==='string'&&value.trim().length>=8;
  // 旧失敗記録ではコマ境界・吹き出し観察が失われている場合がある。
  // 独立した読順根拠が残る場合だけ、既知の人物観察エラーを再評価する。
  const canRecheckCensus=review?.inspectionVersion>=3&&(!Array.isArray(plan.expectedDialogue)
    ||Array.isArray(review.observedFrames)&&Array.isArray(review.evidence)&&review.evidence.every(e=>
      Array.isArray(e?.bounds)&&Array.isArray(e?.dialogue)&&Array.isArray(e?.text_regions)
      &&JSON.stringify(readObservedBalloons(e))===JSON.stringify(e.dialogue)));
  const legacyCensusPanels=new Set();
  const validationErrors=(Array.isArray(review?.validationErrors)?review.validationErrors:[]).filter(error=>{
    if(typeof error!=='string') return false;
    const match=error.match(/^evidence\[([1-9]\d*)\]\.(?:physical_bodies: missing or invalid independent census|cast_instances: unsupported or reused body_id)$/);
    if(canRecheckCensus&&match&&Number(match[1])<=plan.count) {legacyCensusPanels.add(Number(match[1]));return false;}
    return true;
  });
  if(review) delete review.validationErrors;
  if(Array.isArray(review?.evidence)) review.evidence=review.evidence.map(e=>e&&typeof e==='object'?{...e}:e);
  if(review?.observedFrames&&Array.isArray(review?.evidence)) {
    try {
      const frames=orderObservedFrames(review.observedFrames,plan.count);
      review.evidence=review.evidence.map(e=>({...e,panel:frames.findIndex(frame=>JSON.stringify(frame.bounds)===JSON.stringify(e.bounds))+1}));
    } catch {validationErrors.push('observedFrames: ambiguous or overlapping actual frame bounds');}
  } else if(Array.isArray(plan.expectedDialogue)&&Array.isArray(review?.evidence)) {
    const rects=experimentalLayout(plan.count,plan.layout);
    review.evidence=review.evidence.map((observation,index)=>{
      const center=observation?.center;
      const valid=Array.isArray(center)&&center.length===2&&center.every(n=>Number.isFinite(n)&&n>0&&n<1);
      const slot=valid?rects.findIndex(r=>center[0]>r.x&&center[0]<r.x+r.w&&center[1]>r.y&&center[1]<r.y+r.h):-1;
      if(slot<0) validationErrors.push(`evidence[${index+1}].center: missing or outside a frame`);
      return {...observation,panel:slot<0?null:slot+1};
    });
  }
  if(!['pass','warning','unverified'].includes(review?.status)) validationErrors.push('status: invalid');
  for(const k of keys) if(!['pass','fail','uncertain'].includes(review?.[k])) validationErrors.push(`${k}: invalid`);
  if(!['pass','fail','uncertain','not_requested'].includes(review?.breakout)) validationErrors.push('breakout: invalid');
  if(!text(review?.pageEvidence)) validationErrors.push('pageEvidence: missing or too short');
  if(!Array.isArray(review?.evidence)||review.evidence.length!==plan.count) validationErrors.push('evidence: panel count mismatch');
  const readingIssues=[];
  const normalizeDialogue=value=>value.normalize('NFKC').replace(/[\s\p{P}]/gu,'');
  if(Object.hasOwn(review||{},'expectedPageText')) {
    if(!Array.isArray(review.expectedPageText)||!review.expectedPageText.length) validationErrors.push('expectedPageText: unavailable');
    else if(typeof review.pageEvidence==='string'&&review.expectedPageText.some(value=>typeof value!=='string'||!normalizeDialogue(review.pageEvidence).includes(normalizeDialogue(value)))) {
      review.pageText='uncertain';
      review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),'題字・クレジットの独立転記が指定と一致しないため未確認です。誤読もあり得るので目視で確認してください。'])];
    }
  }
  plan.panels.forEach((p,i)=>{
    const observed=Array.isArray(review?.evidence)?review.evidence.filter(e=>e?.panel===i+1):[];
    if(observed.length!==1) {validationErrors.push(`evidence[${i+1}]: missing or duplicate`);return;}
    if(review.inspectionVersion>=4) {
      const view=observed[0].view;
      if(!view||!['high','low','eye_level','uncertain'].includes(view.elevation)||!['in_scene','at_viewer','no_visible_eyes','uncertain'].includes(view.gaze)||!text(view.evidence)) {
        validationErrors.push(`evidence[${i+1}].view: missing or invalid projection/gaze evidence`);
      } else if(view.elevation==='eye_level'||view.gaze==='at_viewer') {
        review.camera='fail';
        review.issues=[...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ: ${view.elevation==='eye_level'?'アイレベル':'カメラ目線'}を観察。${view.evidence}`];
      } else if((view.elevation==='uncertain'||view.gaze==='uncertain')&&review.camera!=='fail') review.camera='uncertain';
    }
    if(review.inspectionVersion>=3) {
      const bodies=observed[0].physical_bodies;
      const cueCount=body=>body.features.flatMap(v=>v.split(/[,、;；]/)).filter(v=>v.trim()).length;
      const validBody=body=>typeof body?.id==='string'&&body.id.trim()&&Array.isArray(body.bounds)&&body.bounds.length===4&&body.bounds.every(n=>Number.isFinite(n)&&n>=0&&n<=1)&&body.bounds[2]>0&&body.bounds[3]>0&&body.bounds[0]+body.bounds[2]<=1+1e-9&&body.bounds[1]+body.bounds[3]<=1+1e-9&&Array.isArray(body.features)&&body.features.length>0&&body.features.every(v=>typeof v==='string'&&v.trim());
      const bodyRecords=Array.isArray(bodies)?bodies:[];
      const trustedBodies=bodyRecords.filter(body=>validBody(body)&&bodyRecords.filter(other=>other?.id===body.id).length===1);
      const invalidBodies=!Array.isArray(bodies)||trustedBodies.length!==bodyRecords.length;
      const cast=observed[0].cast_instances,actors=Array.isArray(cast)?cast:[];
      const bindings=actors.flatMap(actor=>Array.isArray(actor?.instances)?actor.instances:[]);
      const trustedCast=actors.filter(actor=>typeof actor?.name==='string'&&actor.name.trim()
        &&Number.isInteger(actor.observed_count)&&actor.observed_count>=0
        &&['ok','defect','uncertain'].includes(actor.status)&&Array.isArray(actor.instances)
        &&actor.instances.length===actor.observed_count&&(!invalidBodies||actor.observed_count>0)
        &&actor.instances.every(instance=>trustedBodies.some(body=>body.id===instance?.body_id)
          &&bindings.filter(other=>other?.body_id===instance.body_id).length===1))
        .map(actor=>actor.instances.some(instance=>cueCount(trustedBodies.find(body=>body.id===instance.body_id))<2)
          ?{...actor,status:'uncertain'}:actor);
      const invalidCast=!Array.isArray(cast)||trustedCast.length!==actors.length;
      // 記録全体を除外する場合も、正常な部分だけで確認できた重複は失わない。
      // 部分件数を総数として保存せず、確認できた最低数として不合格の根拠を残す。
      for(const name of (plan.expectedCast||[]).filter(entry=>entry.panel===i+1).flatMap(entry=>entry.names)) {
        const records=actors.filter(actor=>actor?.name===name),actor=records[0];
        if(records.length!==1||!['ok','defect'].includes(actor.status)||!Array.isArray(actor.instances)||trustedCast.includes(actor)) continue;
        const groundedInstances=actor.instances.filter(instance=>trustedBodies.some(body=>body.id===instance?.body_id&&cueCount(body)>=2)
          &&bindings.filter(other=>other?.body_id===instance.body_id).length===1
          &&!castInventoryIssues([{...actor,observed_count:1,instances:[instance]}],i+1,[name]).some(issue=>issue.type==='unverified'));
        if(groundedInstances.length>1) {
          review.anatomy='fail';
          review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ / ${name}: 正常な観察だけでも少なくとも${groundedInstances.length}体の別の身体が確認されています (${groundedInstances.map(instance=>instance.location).join(' / ')})。`])];
        }
      }
      if(invalidBodies) observed[0].physical_bodies=trustedBodies.length?trustedBodies:null;
      if(invalidCast||trustedCast.some((actor,index)=>actor!==actors[index])) observed[0].cast_instances=trustedCast.length?trustedCast:null;
      // 不正な人物観察を除外しても、独立したページの観察は保持する。
      // 正常な人物記録は残し、根拠のある重複は後段で不合格にする。
      if(invalidBodies||invalidCast||legacyCensusPanels.has(i+1)) {
        if(review.anatomy!=='fail') review.anatomy='uncertain';
        review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ: 人物観察の形式または身体との対応を確認できない記録は判定から除外し、人物検査を未確認にしています。`])];
      }
      if(trustedBodies.some(body=>cueCount(body)<2)) {
        if(review.anatomy!=='fail') review.anatomy='uncertain';
        review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ: 一部の人物は見える特徴が少なく、人物同定は未確認です。`])];
      }
    }
    for(const k of ['camera','style','story','anatomy']) if(!text(observed[0][k])) validationErrors.push(`evidence[${i+1}].${k}: missing or too short`);
    if(typeof observed[0].camera==='string'&&observed[0].camera.trim()===p.camera.trim()) validationErrors.push(`evidence[${i+1}].camera: source echoed`);
    if(Array.isArray(plan.expectedDialogue)) {
      const spoken=observed[0].dialogue;
      if(!Array.isArray(spoken)||spoken.some(s=>typeof s!=='string'||!s.trim())) validationErrors.push(`evidence[${i+1}].dialogue: missing or unreadable physical-slot transcription`);
      else {
        const expected=p.dialogueIds.map(id=>plan.expectedDialogue.find(d=>d.id===id)?.text);
        if(expected.some(s=>typeof s!=='string')||JSON.stringify(spoken.map(normalizeDialogue))!==JSON.stringify(expected.map(s=>normalizeDialogue(s||'')))) readingIssues.push(`実画像の読順${i+1}コマ目の台詞が予定した位置と一致しません。`);
      }
    }
  });
  if(readingIssues.length) review={...review,readingOrder:'fail',issues:[...new Set([...(Array.isArray(review.issues)?review.issues:[]),...readingIssues])]};
  const castIssues=(plan.expectedCast||[]).flatMap(({panel,names})=>{
    const evidence=review?.evidence?.find(e=>e.panel===panel);
    return castInventoryIssues(evidence?.cast_instances,panel,names);
  });
  if(castIssues.length) {
    const definite=castIssues.some(issue=>issue.type==='cast_count');
    review={...review,anatomy:definite||review.anatomy==='fail'?'fail':'uncertain',
      issues:[...new Set([...(Array.isArray(review?.issues)?review.issues:[]),...castIssues.map(issue=>`${issue.panel}コマ / ${issue.subject}: ${issue.reason}`)])]};
  }
  const safeIssues=Array.isArray(review?.issues)&&review.issues.every(issue=>typeof issue==='string'&&issue.trim());
  if(!safeIssues) validationErrors.push('issues: invalid');
  if(validationErrors.length) {
    const clean=value=>value==null?null:typeof value==='string'?sanitizeErrorMessage(value):JSON.stringify(value,(_key,item)=>typeof item==='string'?sanitizeErrorMessage(item):item);
    const structured=value=>value==null?null:typeof value==='object'?JSON.parse(clean(value)):clean(value);
    return {status:'unverified',observedCount:Number.isInteger(review?.observedCount)?review.observedCount:null,
      ...(Number.isInteger(review?.inspectionVersion)?{inspectionVersion:review.inspectionVersion}:{}),
      ...(Object.hasOwn(review||{},'expectedPageText')?{expectedPageText:Array.isArray(review.expectedPageText)?review.expectedPageText.map(clean):null}:{}),
      ...Object.fromEntries([...keys,'breakout','pageEvidence'].map(k=>[k,clean(review?.[k])])),
      evidence:Array.isArray(review?.evidence)?review.evidence.slice(0,16).map(e=>({panel:Number.isInteger(e?.panel)?e.panel:null,center:Array.isArray(e?.center)?e.center.filter(Number.isFinite).slice(0,2):null,...Object.fromEntries(['camera','style','story','anatomy','breakout'].map(k=>[k,clean(e?.[k])])),view:structured(e?.view),cast_instances:structured(e?.cast_instances),physical_bodies:structured(e?.physical_bodies),dialogue:Array.isArray(e?.dialogue)?e.dialogue.map(clean):null})):[],
      validationErrors:[...new Set(validationErrors)],issues:safeIssues&&review.issues.length?[...new Set(review.issues.map(clean))]:['画像検査の形式または各コマの観察根拠が不十分です。目視確認が必要です。']};
  }
  const checks=keys.map(k=>review[k]);
  // Breakout is optional staging, not an acceptance gate. Harmful overlap or
  // disconnected anatomy still fails the required reading/anatomy checks.
  // A supported failure survives uncertainty in another check. Invalid
  // observation records have already returned unverified above.
  const status=checks.includes('fail')||(Number.isInteger(review.observedCount)&&review.observedCount!==plan.count)||review.status==='warning'?'warning'
    :!Number.isInteger(review.observedCount)||review.status==='unverified'?'unverified':checks.every(v=>v==='pass')?'pass':'unverified';
  return {...review,status};
}

export async function withExperimentalReviewDeadline(request, signal, budgetMs=120_000) {
  cancelled(signal);
  const timeoutController=new AbortController();
  const workSignal=signal?AbortSignal.any([signal,timeoutController.signal]):timeoutController.signal;
  let timer,stop;
  const timeoutError=()=>Object.assign(new Error('画像検査の待機上限に達しました。画像を保持し、未確認とします。'),{code:'REVIEW_TIMEOUT'});
  const boundary=new Promise((_,reject)=>{
    timer=setTimeout(()=>{timeoutController.abort();reject(timeoutError());},budgetMs);
    stop=()=>reject(new DOMException('実験を停止しました。','AbortError'));
    signal?.addEventListener('abort',stop,{once:true});
  });
  try { return await Promise.race([Promise.resolve().then(()=>request(workSignal)),boundary]); }
  catch(error) { if(timeoutController.signal.aborted&&!signal?.aborted) throw timeoutError();throw error; }
  finally {clearTimeout(timer);signal?.removeEventListener('abort',stop);}
}

// Both independent inspections share the same wall-clock window. A stale old
// inspection must not start with only the time left by the new inspection.
export async function reviewExperimentalCandidatePair(candidate, original, reviewCandidate, signal, {budgetMs=120_000,onProgress=()=>{}}={}) {
  cancelled(signal);
  const previous=original&&validateExperimentalReview(original.review,original.plan);
  const refresh=original&&(previous.inspectionVersion!==4||previous.validationErrors?.length);
  const inspect=image=>withExperimentalReviewDeadline(workSignal=>reviewCandidate(image,workSignal),signal,budgetMs);
  if(refresh) onProgress('新旧の画像を並行して検査します。画像は生成しません。');
  const [current,old]=await Promise.allSettled([inspect(candidate),...(refresh?[inspect(original.image)]:[])]);
  cancelled(signal);
  if(old?.status==='fulfilled') original.review=original.image.experimentalReview;
  else if(old?.status==='rejected') onProgress('以前の画像の検査は未完了です。比較の根拠として使いません。');
  if(current.status==='rejected') throw current.reason;
  return current.value;
}

function comparisonReadingEvidence(review, plan) {
  if (!Array.isArray(plan.expectedDialogue)) return null;
  const normalized = lines => lines.map(line => line.normalize('NFKC').replace(/[\s\p{P}]/gu, ''));
  return plan.panels.map((panel, index) => {
    const observed = review.evidence?.find(item => item.panel === index + 1);
    const expected = panel.dialogueIds.map(id => plan.expectedDialogue.find(line => line.id === id)?.text);
    const dialogue = observed?.dialogue;
    const readable = Array.isArray(dialogue) && dialogue.every(line => typeof line === 'string')
      && expected.every(line => typeof line === 'string');
    return { panel: index + 1,
      status: !readable ? 'uncertain' : JSON.stringify(normalized(dialogue)) === JSON.stringify(normalized(expected)) ? 'pass' : 'fail',
      dialogue: readable ? dialogue : null,
      balloons: (observed?.text_regions || []).filter(region => region.region_kind === 'speech_balloon')
        .map(({text, center_x}) => ({text, center_x})) };
  });
}

export async function selectExperimentalCandidate(original, next, compareCandidates, signal, refreshReview) {
  const asSharedReview=review=>({pass:review.status==='pass',issues:review.issues.map(reason=>({type:review.status==='warning'?'experimental_quality':'unverified',panel:null,reason}))});
  let previous=validateExperimentalReview(original.review,original.plan);
  const retain=reason=>({candidate:original.image,selectedReview:asSharedReview(previous),comparison:{preferred:'original',status:'not_compared',reason}});
  if(!original.groupId||original.groupId!==next.groupId||original.prompt!==next.prompt) return retain('準備した台本・設定が異なるため、比較しません。');
  const current=validateExperimentalReview(next.review,next.plan);
  const stale=current.inspectionVersion&&original.review?.inspectionVersion!==current.inspectionVersion;
  if(stale) {
    previous={...previous,status:'unverified',issues:[...previous.issues,'以前の検査方式による判定のため、現在の基準では未確認です。']};
    original.review=previous;
    original.image.experimentalReview=previous;
  }
  if(current.validationErrors?.length) return retain('今回の検査根拠が不十分なため、これまでの候補を保持します。');
  if(stale||previous.validationErrors?.length) {
    if(!refreshReview)return retain('以前の検査根拠を確認できないため、これまでの画像を保持します。');
    try {
      previous=validateExperimentalReview(await refreshReview(original.image),original.plan);
      original.review=previous;
      original.image.experimentalReview=previous;
    }
    catch {return retain('以前の画像の再検査が完了しなかったため、画像を保持します。');}
  }
  if(current.inspectionVersion&&(previous.inspectionVersion!==current.inspectionVersion||previous.validationErrors?.length)) return retain('以前の画像の検査基準を確認できないため、画像を保持します。');
  const reviewKeys=['readingOrder','camera','style','story','anatomy','pageText'];
  const regressed=reviewKeys.filter(k=>previous[k]==='pass'&&current[k]==='fail');
  if(previous.observedCount===original.plan.count&&current.observedCount!==next.plan.count) regressed.push('panelCount');
  if(regressed.length) return retain(`既に満たしていた条件に劣化または未確認があります: ${regressed.join(', ')}`);
  const originalReview=asSharedReview(previous),repairReview=asSharedReview(current);
  const originalReading=comparisonReadingEvidence(previous,original.plan);
  const nextReading=comparisonReadingEvidence(current,next.plan);
  const readingEvidence=originalReading&&nextReading?{original:originalReading,repair:nextReading}:null;
  const selection=await selectImageQualityCandidate({originalCandidate:original.image,repairCandidate:next.image,
    originalReview,repairReview,originalIssues:originalReview.issues,
    prompt:original.prompt,compareCandidates:async(a,b,prompt,options)=>{
      const candidateUncertainties={original:reviewKeys.filter(k=>previous[k]==='uncertain'),repair:reviewKeys.filter(k=>current[k]==='uncertain')};
      const result=await compareCandidates(a,b,prompt,{...options,candidateUncertainties,...(readingEvidence?{readingEvidence}:{})});
      if(readingEvidence && Object.entries(readingEvidence).some(([candidate,panels])=>{
        const checks=result?.readingOrderChecks?.[candidate];
        return !Array.isArray(checks)||checks.length!==panels.length||panels.some(panel=>{
          const matched=checks.filter(check=>check?.panel===panel.panel);
          return matched.length!==1||matched[0].status!==panel.status;
        });
      })) return {preferred:'original',status:'not_compared',unverified:true,
        reason:'比較の読順判定が独立した台詞転記の根拠と一致しないか不足しているため、比較未確認として以前の画像を保持します。'};
      return {...result,status:['original','repair'].includes(result?.preferred)&&result?.reason&&!result?.unverified?'completed':'not_compared'};
    },shouldStop:()=>Boolean(signal?.aborted)});
  selection.comparison.status=selection.comparison.status||'not_compared';
  selection.selectedReview=selection.candidate===original.image?originalReview:repairReview;
  return selection;
}

export async function prepareExperimentalManga(input, requestPlan) {
  if(input.enabled!==true) fail('実験スイッチがOFFです。');
  cancelled(input.signal);
  const source=readExperimentalSource(input);
  const response=await requestPlan(buildExperimentalPlanPrompt(source,input),input.signal);
  cancelled(input.signal);
  const plan=validateExperimentalPlan(parseExperimentalPlan(response),source);
  const prompt=buildExperimentalImagePrompt(plan,source,input);
  return {source,plan,prompt};
}

export function experimentalImageSaveItem(item) {
  if(!item?.image?.base64Img) fail('保存する画像がありません。');
  return {id:item.id,img:`data:${item.image.mimeType||'image/png'};base64,${item.image.base64Img}`,
    modelId:item.image.usedModel,metadataContext:item.metadataContext};
}

export async function runExperimentalManga(input, {plan:requestPlan,image:requestImage,review:requestReview,onImage=()=>{},onPlan=()=>{}}) {
  if(input.enabled!==true) fail('実験スイッチがOFFです。');
  cancelled(input.signal);
  const prepared=input.prepared||await prepareExperimentalManga(input,requestPlan);
  if(prepared.source.scenario!==input.scenario||prepared.source.castList!==input.castList||prepared.source.colorMode!==input.colorMode||(prepared.source.userDirection||'')!==(input.userDirection||'')) fail('元台本または人物・色・演出設定が変更されました。STEP3を作り直してください。');
  const source=readExperimentalSource(input);
  const plan=validateExperimentalPlan(prepared.plan,source);
  const prompt=buildExperimentalImagePrompt(plan,source,input);
  if(prepared.prompt!==prompt) fail('描画指示または設定が更新されました。STEP3を作り直してください。');
  onPlan({plan,prompt});
  const imageStarted=performance.now();
  const image=await requestImage(prompt,input.signal);
  const imageMs=Math.round(performance.now()-imageStarted);
  cancelled(input.signal);
  if(!image?.base64Img) fail('APIから画像が返りませんでした。');
  onImage({image,plan,prompt});
  let review;
  const reviewStarted=performance.now();
  let diagnostic={stage:'validation'};
  const qualityOutcome=await runPageImageQuality({kind:'experimental-manga',count:plan.count},{
    mode:'experimental-manga',allowRepair:false,originalCandidate:image,originalPrompt:prompt,
    shouldStop:()=>Boolean(input.signal?.aborted),
    reviewCandidate:async()=>{
      try {
        review=validateExperimentalReview(await requestReview(buildExperimentalReviewPrompt(plan,source,input),image,input.signal),plan);
      } catch(error) {
        cancelled(input.signal);
        const decode=error?.code==='REVIEW_INVALID_JSON';
        diagnostic={stage:decode?'decode':'request',kind:decode?'response':getApiErrorInfo(error).kind};
        review={status:'unverified',issues:[`画像は保持しました。検査未完了: ${formatApiErrorDetails(error)}`]};
      }
      return {pass:review.status==='pass',issues:review.issues.map(reason=>({type:review.status==='warning'?'experimental_quality':'unverified',panel:null,reason}))};
    },
  });
  cancelled(input.signal);
  review={...review,diagnostics:{...diagnostic,imageMs,reviewMs:Math.round(performance.now()-reviewStarted)}};
  return {source,plan,prompt,image:qualityOutcome.candidate,review};
}
