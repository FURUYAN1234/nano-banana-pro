import { getScenarioPanelBlocks, validateMangaScenario } from './scenario-validation.js';
import { collectCastNameEntries, extractDialogueOnly, cleanCastList, stripWeightTags, extractCastLimitRule, buildActorMediumInstruction, buildIdentityMatrix } from './panel-utils.js';
import { buildImageQualityContract, FUNCTIONAL_SURFACE_ORIENTATION_LOCK, OBJECT_GEOMETRY_LOCK, BODY_ACTING_BASELINE, EXPRESSIVE_DIRECTION, FUNCTIONAL_SURFACE_PROJECTION_RULE, HEAD_VOLUME_LOCK, SKIN_LIGHTING, WARDROBE_COMPONENT_LOCK } from './shared-image-quality.js';
import { COMPACT_EMOTION_STYLES, GEKIGA_FACE_CONSTRUCTION, SYSTEM_VERSION } from './constants.js';
import { extractScenarioTitle, buildMangaWatermark, PROMPT_PROVIDER_FAMILIES, normalizePromptProviderFamily, buildMonochromePanelInkLock } from './prompt-assembler.js';
import { MONOCHROME_IMAGE_QUALITY_CONTRACT, MONOCHROME_EMOTION_STYLES, MONOCHROME_RENDERING_LOCK_COMPACT, sanitizeMonochromeSourceDescription, MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT, MONOCHROME_REFERENCE_SEPARATION, MONOCHROME_QA_RULE } from './manga-render-mode.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from './web-prompt-chunks.js';
import { buildRenderOptionsContract, buildProtectedCastContract, COPYRIGHT_MOSAIC_TARGET_SCOPE } from './render-options.js';
import { createApiError, formatApiErrorDetails, getApiErrorInfo, sanitizeErrorMessage } from './api-errors.js';
import { selectImageQualityCandidate, runPageImageQuality, isMaterialImageQualityIssue } from './image-quality-failsafe.js';
import { inspectImageDimensions, extractNativeImageRegion, inspectVariablePanelFrames } from './manga-page-layout.js';
import { extractPanelCastContracts, castInventoryIssues, groundWardrobeIssue, WARDROBE_CONTINUITY_QA_CONTRACT } from './image-quality-qa.js';
import { classifyCameraElevation, getPanelShotExecution, sharePanelShotExecution } from './composition-variety.js';
import { assertImagePromptBudget, OPENAI_IMAGE_PROMPT_MAX_CHARS } from './image-prompt-budget.js';
import { withScenarioBalloonLayoutRecovery } from './prompt-assembly-recovery.js';
import { readExplicitOutfit, hasScopedOutfitAssignment, OUTFIT_SCOPE_CONTRACT } from './seasonal-outfit.js';
import { withImageReviewCancellation } from './api-work-cancellation.js';

const fail = message => { throw new Error(`実験的コマ割り: ${message}`); };
const cancelled = signal => { if (signal?.aborted) throw new DOMException('実験を停止しました。', 'AbortError'); };
const direction = (text, name) => String(text).match(new RegExp(`\\[${name}:\\s*([^\\]]+)\\]`, 'i'))?.[1]?.trim() || '';

export const EXPERIMENTAL_PROMPT_REVISION = 46;
const EXPERIMENTAL_INSPECTION_VERSION = 10;
const EXPERIMENTAL_PROMPT_SOFT_TARGET_CHARS = 15000;
const READING_FLOW_DIRECTION = `READING FLOW WITH ACTING: preserve camera strength, drawing quality, style, expression and dramatic energy. 最初の吹き出し→主動作/反応→次コマへ、場面に根拠のある視線・身振り・道具の向き・奥行き・明暗・余白で誘導。矢印、強制左向き整列、同一ポーズは禁止。読みやすさのために遠近や演技を弱めず、後ろ姿を振り向かせず、必要人物/道具を消さず、全コマを静かにしない。焦点の大胆な強調と明瞭なコマ間を両立。No eye-level shots: 座位/ちび人物にも明確な高低差を設け、顔・体・背景の上面/下面を投影。Characters never look at the viewer or camera lens; 視線は場面内の人/物/出来事へ。正面顔だけでカメラ目線と判定せず、動機のある首向き/表情、隠れた目、手元接写を保持。任意の誘導が物語と競合したら誘導を省き、物語の勢いは残す。`;
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
  return Object.entries(EXPERIMENTAL_LAYOUTS).filter(([id])=>
    id!=='strips'
    &&(id!=='tall_right_middle'||[5,6,7].includes(count))).map(([id,option])=>({id,...option}));
}
export const EXPERIMENTAL_VISUAL_EFFECTS = Object.freeze({
  hero_scale: {label:'見せ場を大きく',instruction:'HERO SCALE: use the allocated frame generously for the decisive gesture and expression, with strong near/far size contrast. Preserve required full-body crops and every scripted prop; never enlarge a face by replacing the required Camera.'},
  foreground_depth: {label:'手前・奥の対比',instruction:'FOREGROUND DEPTH: stage one motivated foreground hand/object, the acting subject in the middle, and a readable distant setting. Maintain physically consistent perspective and ownership; keep balloons and essential action clear.'},
  diagonal_frame: {label:'斜めのコマ枠',instruction:'DIAGONAL FRAME: use a mildly slanted frame edge inside its allocated rectangle, preserving a clear white gutter and the planned right-to-left reading slot. This is a border treatment, not permission to change Camera, add panels, clip required feet or cross an outer page edge.'},
  silent_pause: {label:'無言の間',silentOnly:true,instruction:'SILENT PAUSE: let a specific eye-line, held gesture or tiny reaction create a beat of silence. No added dialogue, caption, event or epilogue; retain the source moment.'},
  match_cut: {label:'同じ形でつなぐ',instruction:'MATCH CUT: connect adjacent moments of the same source beat through the existing prop silhouette, gesture or direction. Keep object identity/state and chronology; do not repeat the identical frozen pose or weaken an anchor Camera.'},
  motion_trail: {label:'動きの軌跡',instruction:'MOTION TRAIL: use directional streaks and, only for a moving prop, faint transparent trailing outlines behind its ONE current solid position. No extra solid props, cloned people, detached or repeated limbs. Preserve the actual action and its receiver.'},
  silhouette: {label:'シルエット',silentOnly:true,instruction:'SILHOUETTE: use a recognizable silhouette and readable negative shapes for a brief silent reaction. Retain hairstyle, wardrobe outline, pose and ownership. Keep the source art medium; do not conceal the anchor shot or invent a new lighting/time/weather event.'},
  negative_space: {label:'余白で見せる',silentOnly:true,instruction:'NEGATIVE SPACE: leave purposeful uncluttered space WITHIN this panel around the visible reaction, using the source sky/background. Do not enlarge outer page margins or erase the required setting or action.'},
  impact_background: {label:'背景で勢いを出す',instruction:'IMPACT BACKGROUND: in this frame, simplify background details into medium-appropriate directional marks around the focal action. Retain spatial anchors and story props, no printed effect words, invented explosion or changed source rendering medium.'},
  rim_light: {label:'輪郭の光',instruction:'RIM LIGHT: if supported by the existing light source, use a restrained edge highlight to separate the actor from the background. Do not invent sunset, change time/weather, uniformly darken faces or replace the source art style. Omit when physically unsupported.'},
});

export function readExperimentalSource({ scenario, castList, colorMode, userDirection='' }) {
  const valid = validateMangaScenario(scenario, castList, {scenarioMode:'experimental-manga'});
  if (!valid.ok) fail('STEP2で台詞形式が有効な5〜8コマのシナリオを作成してください。');
  // Validate every camera before a malformed balloon can trigger paid recovery.
  const sourcePanels = getScenarioPanelBlocks(scenario).map(panel => {
    const camera = direction(panel.text, 'Camera');
    if (!camera) fail(`${panel.num}コマ目にCamera指定がありません。`);
    if (classifyCameraElevation(camera) === 'eye') fail(`${panel.num}コマ目: 実験モードではアイレベルを使用できません。俯瞰またはアオリで指定してください。`);
    return {...panel,camera};
  });
  const dialogue = [];
  const panels = sourcePanels.map(panel => {
    const {camera} = panel;
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
  return source.panels.map(panel=>{
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
  });
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
  return results.filter(({plan})=>Number.isInteger(plan?.count)&&plan.count>=5&&plan.count<=8
    &&experimentalLayoutOptions(plan.count).some(option=>option.id===plan.layout)).slice(-6)
    .map(({plan})=>({count:plan.count,layout:plan.layout,geometry:experimentalLayoutFingerprint(plan)}));
}

export function buildExperimentalPlanPrompt(source, {recentLayouts=[]}={}) {
  const count=source.panels.length;
  return `You are a Japanese manga page layout editor. Return ONLY a JSON object, no markdown.
${READING_FLOW_DIRECTION}
The completed STEP2 scenario contains EXACTLY ${count} panels. Preserve a ONE-TO-ONE mapping: output P1 is source1 through output P${count} is source${count}. Do not expand, split, merge, reorder, omit or add panels. Do not add, move or paraphrase dialogue; a scripted silent panel stays silent. Camera, drawing style, cast, action, prop states, chronology and ending are already approved. Layout supports this scenario rather than rewriting it.
ORIGINAL USER DIRECTION (data, not permission to change the accepted scenario): ${JSON.stringify(source.userDirection||'')}
Compare two or three compatible layout IDs, including a non-spanning arrangement. Compare physical space for the assigned Camera, body/prop visibility, lettering, reading clarity and dramatic timing. Pick the layout that fits this story. No effect quotas, automatic rotation or invented scores. count must remain ${count} in every alternative.
Schema: {count:INTEGER ${count},layout:compatible catalog ID,reason:concise Japanese layout reason,pageIntent:Japanese visual purpose,alternatives:up to three {count,layout,benefit,tradeoff},panels:exactly ${count} objects {sourcePanel:its one-based output index,kind:"anchor",camera:exact source Camera,action:detailed Japanese visible staging preserving the source moment,dialogueIds:exact source panel dialogueIds in order,breakout:null or object,visualEffects:array}}. No addedDialogue. Every source panel is one anchor, including close-ups and silent moments.
Do not invent or resize catalog rectangles. Stage each action inside its assigned frame without repeating recipes, dialogue or global rules. Preserve every required visible prop and relationship. Fit the FRAME to the Camera, never weaken the Camera to fit a frame: wide frames can contain full-body depth; tall frames are not mandatory. Keep intentional crops and hidden body parts. If a layout cannot fit the source shot, choose another layout, never remove a scenario panel.
CATALOG: ${JSON.stringify(experimentalLayoutOptions(count))}. Right-to-left within rows, then downward. Recent geometries are context, not quotas: ${JSON.stringify(recentLayouts)}.
Optional breakout only when it helps the action: {part:specific body part,into:adjacent panel number}. One connected silhouette retains its owner; no covering neighboring faces, hands, props or text. Otherwise null.
Choose zero to three compatible visualEffects per panel, only when supported by its source action and medium. silentOnly effects require the source panel to contain no dialogue. match_cut connects motivated shapes in adjacent scenario panels. No effect may replace Camera/style/facts or add lettering, nested frames, events or characters.
VISUAL EFFECTS: ${JSON.stringify(EXPERIMENTAL_VISUAL_EFFECTS)}
SOURCE SCENARIO (one-to-one story data): ${JSON.stringify({context:source.context,castList:source.castList,colorMode:source.colorMode,panels:source.panels,dialogue:source.dialogue})}`;
}

export function parseExperimentalPlan(text) {
  const clean=String(text).trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');
  try { return JSON.parse(clean); } catch { fail('配置案のJSONを読み取れません。自動再試行はしません。'); }
}

export function parseExperimentalReview(text, response={}) {
  const stage=['inventory','assessment'].includes(response.stage)?response.stage:'review';
  const finishReason=['stop','STOP','length','max_output_tokens','MAX_TOKENS','content_filter','SAFETY'].includes(response.finishReason)
    ?response.finishReason:'unknown';
  const tokens=response.usage?.completion_tokens??response.usage?.output_tokens??response.usage?.candidatesTokenCount;
  // Keep stage/size/completion evidence, never model text or provider error excerpts.
  const reviewDiagnostics={stage,characters:String(text??'').length,finishReason,completionTokens:Number.isFinite(tokens)?tokens:null};
  const reject=(code,message)=>{
    const detail=`stage=${stage}; chars=${reviewDiagnostics.characters}; finish=${finishReason}; output_tokens=${reviewDiagnostics.completionTokens??'unknown'}`;
    throw Object.assign(createApiError(`${message}画像を保持し、自動再試行はしません。 (${detail})`,{code}),{reviewDiagnostics});
  };
  if(response.finishReason&&!['stop','STOP'].includes(response.finishReason)) {
    reject('REVIEW_INCOMPLETE','画像検査の応答が途中で終了しました。');
  }
  let parsed;
  try { parsed=parseExperimentalPlan(text); }
  catch { reject('REVIEW_INVALID_JSON','画像検査の応答本文をJSONオブジェクトとして読み取れませんでした。'); }
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)) {
    reject('REVIEW_INVALID_JSON','画像検査の応答本文がJSONオブジェクトではありません。');
  }
  return parsed;
}

export function buildExperimentalWebCopy(prompt) {
  return splitWebPromptForPaste(ensureWebPromptTrailingNewline(prompt));
}

function experimentalCastRule(panel,source,colorMode=source.colorMode) {
  const sourcePanel=source.panels[panel.sourcePanel-1];
  return extractCastLimitRule(sourcePanel.text,source.castList,{compact:true,colorMode,effectiveStyle:sourcePanel.style,storyText:source.panels.map(item=>item.text).join('\n')});
}

// The STEP2 manifest is authoritative; STEP3 only arranges those exact panels.
export function resolveExperimentalDialogue(plan, source) {
  if(plan.addedDialogue!==undefined&&(!Array.isArray(plan.addedDialogue)||plan.addedDialogue.length)) fail('STEP3では台詞を追加できません。STEP2の台詞を保持してください。');
  for(const [index,panel] of plan.panels.entries()) {
    const original=source.panels[index];
    if(JSON.stringify(panel.dialogueIds)!==JSON.stringify(original.dialogueIds)) fail('元のコマの台詞・順番を変更できません。');
  }
  return source.dialogue;
}

export function validateExperimentalPlan(plan, source) {
  if(!Number.isInteger(plan?.count)||plan.count<5||plan.count>8||!Array.isArray(plan.panels)||plan.panels.length!==plan.count) fail('コマ数は5〜8で、配置案と一致する必要があります。');
  if(plan.count!==source.panels.length) fail('STEP2のコマ数と配置案が一致しません。コマの追加・削除はできません。');
  if(typeof plan.reason!=='string'||!plan.reason.trim()) fail('配置を選んだ理由が必要です。');
  if(plan.panels.some(panel=>classifyCameraElevation(panel.camera)==='eye')) fail('実験モードではアイレベルを使用できません。俯瞰またはアオリで配置を設計してください。');
  if(!experimentalLayoutOptions(plan.count).some(option=>option.id===plan.layout)) fail('コマ数に対応する配置が必要です。');
  const rects=experimentalLayout(plan.count,plan.layout);
  plan.panels.forEach((p,i)=>{
    if(p.sourcePanel!==i+1) fail('元のコマの順番を変更できません。');
    const original=source.panels[p.sourcePanel-1];
    if(p.kind!=='anchor'||typeof p.camera!=='string'||!p.camera.trim()||typeof p.action!=='string'||!p.action.trim()||!Array.isArray(p.dialogueIds)) fail('各コマの役割・Camera・状況・台詞IDが必要です。');
    const effects=p.visualEffects??[];
    if(!Array.isArray(effects)||effects.length>3||new Set(effects).size!==effects.length||effects.some(id=>!Object.hasOwn(EXPERIMENTAL_VISUAL_EFFECTS,id))) fail('演出は既知の候補から重複なく3つまで選びます。');
    effects.forEach(id=>{
      const effect=EXPERIMENTAL_VISUAL_EFFECTS[id];
      if(effect.silentOnly&&p.dialogueIds.length) fail('この演出は元から無言のコマ専用です。');
    });
    if(p.camera.trim()!==original.camera) fail(`${i+1}コマ目のCameraを弱めたり置換できません。`);
    if(p.breakout!==null&&p.breakout!==undefined) {
      const b=p.breakout, a=rects[i], target=rects[b.into-1];
      const adjacent=target&&b.into!==i+1&&((Math.abs(a.x+a.w-target.x)<.00001||Math.abs(target.x+target.w-a.x)<.00001)&&Math.min(a.y+a.h,target.y+target.h)>Math.max(a.y,target.y)+.001
        ||(Math.abs(a.y+a.h-target.y)<.00001||Math.abs(target.y+target.h-a.y)<.00001)&&Math.min(a.x+a.w,target.x+target.w)>Math.max(a.x,target.x)+.001);
      if(!Number.isInteger(b.into)||!adjacent||typeof b.part!=='string'||!b.part.trim()) fail('枠越え先は辺を共有する隣接コマに限ります。');
    }
  });
  const expectedDialogue=resolveExperimentalDialogue(plan,source);
  const expectedCast=extractPanelCastContracts(plan.panels.map((p,i)=>`## Panel ${i+1}\n${experimentalCastRule(p,source)}`).join('\n'));
  return {...plan,expectedDialogue,expectedCast};
}

export function buildExperimentalPageContract(plan,source) {
  const {expectedDialogue}=validateExperimentalPlan(plan,source);
  const dialogue=new Map(expectedDialogue.map(line=>[line.id,line]));
  return {count:plan.count,panels:plan.panels.map((panel,index)=>({
    panel:index+1,sourcePanel:panel.sourcePanel,camera:panel.camera,
    style:source.panels[panel.sourcePanel-1].style||'preserve source/reference art style',action:panel.action,
    dialogue:panel.dialogueIds.map(id=>{
      const {speaker,text}=dialogue.get(id);
      return {speaker,text};
    })
  }))};
}

function physicalPanelPosition(rect) {
  const side=rect.w===1?'FULL WIDTH':rect.x===0?'LEFT':'RIGHT';
  return `${side}, top=${Math.round(rect.y*100)}%, bottom=${Math.round((rect.y+rect.h)*100)}% of comic area`;
}

export function buildExperimentalReadingReviewContract(plan) {
  const rects=experimentalLayout(plan.count,plan.layout);
  return `PHYSICAL INVENTORY: Observe the actual drawn frames. The supplied native crops use independently observed frame bounds and physical reading order, not planned proportions. Number actual panels RIGHT before LEFT within each row, then downward. A spanning right panel is read before the stacked left panels. NEVER move observations to match expected story events. Each evidence item includes dialogue: complete balloon STRINGS ordered by balloon position RIGHTMOST FIRST, then downward; read vertical columns right-to-left within each balloon. Preserve punctuation and heart symbols exactly; never paraphrase. Use the native frame crop, [] for silence, null if unreadable. Never copy expected text as observations. pageEvidence must be one STRING transcribing observed title/footer, marking missing/unreadable text. Planned slots are comparison targets only, NEVER observed geometry: ${JSON.stringify(rects.map((rect,i)=>({panel:i+1,position:physicalPanelPosition(rect)})))}.`;
}

export function orderObservedFrames(observations,count) {
  const invalid=()=>{throw createApiError('実画像のコマ境界を確認できません。予定位置で切り出さず、検査を未確認として保持します。',{code:'REVIEW_INVALID_GEOMETRY'});};
  if(!Array.isArray(observations)||!observations.length||observations.length>16
    ||count!=null&&observations.length!==count) return invalid();
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
  return {images,instruction:`ATTACHED SPATIAL EVIDENCE: Image 1 is the intact full page for count, actual layout, title and overall continuity. Images 2..${frames.length+1} are native-pixel crops of the frame bounds detected from the actual image pixels, sorted right-to-left then downward, not cuts at planned proportions. ${labels.join('; ')}. Images ${frames.length+2}/${frames.length+3} are left/right footer crops; they are NOT story panels. For evidence Pn, inspect its assigned crop and the intact page. Never renumber crops from story events. If a measured crop straddles actual frames or clips required evidence, report uncertainty; never treat neighboring or clipped text as that panel's speech. The intact page is authoritative. Return ALL top-level keys: status, observedCount, readingOrder, camera, style, story, anatomy, pageText, breakout, issues, pageEvidence (one STRING), evidence (exactly ${plan.count} panel objects with panel, physical_bodies, text_regions, camera, style, story, anatomy, cast_instances; exclude footer crops).`};
}

function readObservedBalloons(evidence) {
  const regions=evidence?.text_regions;
  if(!Array.isArray(regions)||regions.some(r=>!r||!['speech_balloon','printed_object','caption','sound_effect'].includes(r.region_kind))) return null;
  const speech=regions.filter(r=>r.region_kind==='speech_balloon');
  if(speech.some(r=>typeof r.text!=='string'||!r.text.trim()||!Number.isFinite(r.center_x)||r.center_x<0||r.center_x>1)) return null;
  return [...speech].sort((a,b)=>b.center_x-a.center_x).map(r=>r.text);
}

// These schemas constrain structure only. Null/uncertain is always available
// for unresolved pixels; counts, body ownership and visual truth stay audited.
const reviewObject = (properties, nullable=false) => ({type:nullable?['object','null']:'object',properties,
  required:Object.keys(properties),additionalProperties:false});
const reviewArray = (items, nullable=false) => ({type:nullable?['array','null']:'array',items});
const reviewText = {type:['string','null']};
const reviewPoint = {...reviewArray({type:'number',minimum:0,maximum:1},true),minItems:2,maxItems:2};
const reviewVerdict = {type:'string',enum:['pass','fail','uncertain']};
const reviewMedium = {type:'string',enum:[...new Set([...Object.keys(COMPACT_EMOTION_STYLES),'NORMAL','REFERENCE','mixed','uncertain'])]};
const reviewTextRegions = reviewArray(reviewObject({
  region_kind:{type:'string',enum:['speech_balloon','printed_object','caption','sound_effect','uncertain']},
  text:reviewText,container_evidence:reviewText,center_x:{type:['number','null'],minimum:0,maximum:1},
}),true);
const reviewFormats = {
  inventory:reviewObject({pageEvidence:reviewText,evidence:reviewArray(reviewObject({
    panel:{type:'integer'},text_regions:reviewTextRegions,
    physical_bodies:reviewArray(reviewObject({id:{type:'string'},
      bounds:{...reviewArray({type:'number',minimum:0,maximum:1},true),minItems:4,maxItems:4},
      features:reviewArray({type:'string'}),
      gaze:reviewObject({eye_visibility:{type:'string',enum:['visible','not_visible','occluded','too_small','uncertain']},
        direction:{type:'string',enum:['in_scene','at_viewer','no_visible_eyes','uncertain']},eye_position:reviewPoint,
        eye_evidence:reviewText,face_direction:reviewText,
        visibility_basis:{type:'string',enum:['visible_eyes','closed_eyes','rear_head','outside_frame','non_face_crop','occluded','too_small','uncertain']},

        target:reviewObject({description:reviewText,position:reviewPoint},true),
      },true),
    }),true),
  }))}),
  assessment:reviewObject({
    corrections:reviewArray(reviewObject({
      type:{type:'string',enum:['panel_layout','cast_count','anatomy','object_geometry','prop_ownership','camera_geometry','bubble_text','bubble_order','title_text','extra_text','story_integrity','wardrobe_continuity','art_style']},
      panel:{type:['integer','null']},subject:reviewText,observed:reviewText,expected:reviewText,correction:reviewText,
      materialImpact:{type:'string',enum:['material','minor_variation','none','uncertain']},impactReason:reviewText,
    })),
    status:{type:'string',enum:['pass','warning','unverified']},observedCount:{type:['integer','null']},
    readingOrder:reviewVerdict,camera:reviewVerdict,style:reviewVerdict,story:reviewVerdict,anatomy:reviewVerdict,pageText:reviewVerdict,
    breakout:{type:'string',enum:['pass','fail','uncertain','not_requested']},issues:reviewArray({type:'string'}),pageEvidence:reviewText,
    wardrobe_observation:reviewObject({status:reviewVerdict,evidence:reviewText,issues:reviewArray(reviewObject({
      panel:{type:'integer'},subject:reviewText,reason:reviewText,
      material_impact:{type:'string',enum:['none','minor_variation','material','uncertain']},impact_reason:reviewText,
      wardrobe_evidence:reviewObject({basis:{type:'string',enum:['cross_panel','approved_outfit']},component:reviewText,
        difference_kind:{type:'string',enum:['component_state','layering','anatomical_side']},
        expected_scope:reviewText,expected_quote:reviewText,first_panel:{type:['integer','null']},
        first_body_id:reviewText,later_body_id:reviewText,first_location:reviewText,later_location:reviewText,
        first_state:reviewText,later_state:reviewText,first_visibility:reviewText,later_visibility:reviewText,
        matched_features:reviewArray({type:'string'}),scripted_change:reviewText,
        layer_relation:reviewText,first_body_side:reviewText,later_body_side:reviewText,
      },true),
    }))},true),
    evidence:reviewArray(reviewObject({
      panel:{type:'integer'},story:reviewText,anatomy:reviewText,breakout:reviewText,
      view:reviewObject({elevation:{type:'string',enum:['high','low','eye_level','uncertain']},
        gaze:{type:'string',enum:['in_scene','at_viewer','no_visible_eyes','uncertain']},evidence:reviewText},true),
      style_observation:reviewObject({medium:reviewMedium,status:reviewVerdict,evidence:reviewText,
        actors:reviewArray(reviewObject({body_id:reviewText,medium:reviewMedium,status:reviewVerdict,
          face_visibility:{type:'string',enum:['visible','hidden','too_small','uncertain']},face:reviewText,shading:reviewText}),true)},true),
      cast_instances:reviewArray(reviewObject({name:{type:'string'},
        status:{type:'string',enum:['ok','defect','uncertain']},evidence:reviewText,
        instances:reviewArray(reviewObject({body_id:reviewText,location:reviewText,feature_indices:reviewArray({type:'integer',minimum:0})}),true),
      }),true),
      body_dispositions:reviewArray(reviewObject({body_id:reviewText,kind:{type:'string',enum:['non_cast','uncertain']},
        feature_indices:reviewArray({type:'integer',minimum:0}),evidence:reviewText,
      }),true),
      text_regions:reviewTextRegions,dialogue:reviewArray({type:'string'},true),
    })),
  }),
};

// One response owns each observed body and text region; derived dialogue is computed locally.
reviewFormats.assessment.properties.evidence.items.properties.physical_bodies = reviewFormats.inventory.properties.evidence.items.properties.physical_bodies;
reviewFormats.assessment.properties.evidence.items.required.push('physical_bodies');
delete reviewFormats.assessment.properties.evidence.items.properties.dialogue;
reviewFormats.assessment.properties.evidence.items.required = reviewFormats.assessment.properties.evidence.items.required.filter(key=>key!=='dialogue');


// Expand references only within one observed panel. Missing, duplicated or invalid
// references remain unknown; no expected character features are filled in.
function expandReviewObservations(panel) {
  const bodies=Array.isArray(panel.physical_bodies)?panel.physical_bodies:[];
  const features=entry=>{
    const matches=bodies.filter(body=>body?.id===entry?.body_id),indices=entry?.feature_indices;
    if(matches.length!==1||!Array.isArray(matches[0].features)||!Array.isArray(indices)
      ||indices.length<2||new Set(indices).size!==indices.length
      ||indices.some(index=>!Number.isInteger(index)||index<0||index>=matches[0].features.length))return null;
    return indices.map(index=>matches[0].features[index]);
  };
  const expandFeatures=(entry,key)=>entry&&typeof entry==='object'
    ?{...entry,...(!Object.hasOwn(entry,key)&&Object.hasOwn(entry,'feature_indices')?{[key]:features(entry)}:{})}:entry;
  return {...panel,
    ...(!Object.hasOwn(panel,'camera')?{camera:panel.view?.evidence??null}:{}),
    ...(!Object.hasOwn(panel,'style')?{style:panel.style_observation?.evidence??null}:{}),
    physical_bodies:Array.isArray(panel.physical_bodies)?bodies.map(body=>body?.gaze&&typeof body.gaze==='object'
      ?{...body,gaze:{...body.gaze,...(!Object.hasOwn(body.gaze,'pupil_placement')
        ?{pupil_placement:body.gaze.eye_visibility==='visible'&&body.gaze.visibility_basis==='visible_eyes'?body.gaze.eye_evidence:null}:{})}}:body):panel.physical_bodies,
    cast_instances:Array.isArray(panel.cast_instances)?panel.cast_instances.map(actor=>actor&&typeof actor==='object'
      ?{...actor,...(!Object.hasOwn(actor,'observed_count')?{observed_count:Array.isArray(actor.instances)?actor.instances.length:null}:{}),
        instances:Array.isArray(actor.instances)?actor.instances.map(entry=>expandFeatures(entry,'matched_features')):actor.instances}:actor):panel.cast_instances,
    body_dispositions:Array.isArray(panel.body_dispositions)?panel.body_dispositions.map(entry=>expandFeatures(entry,'observed_features')):panel.body_dispositions,
  };
}

export async function reviewExperimentalImage({image,plan,prompt,signal,reviewContext,useStructuredOutput=false,onPhaseProgress=()=>{}},request,regionTools) {
  const phaseRequest=async(stage,phasePrompt,attachments,phaseSignal,options)=>{
    cancelled(phaseSignal);
    const label=reviewContext?.candidateLabel||'今回の画像';
    const started=Date.now();
    onPhaseProgress(`${label} / ${stage}: 検査全体で共有する残り時間内で応答を待ちます。`);
    try {
      const response=await request(phasePrompt,attachments,phaseSignal,{...options,
        ...(useStructuredOutput?{responseFormat:{type:'json_schema',json_schema:{
          name:`manga_review_${stage}`,strict:true,schema:reviewFormats[stage],
        }}}:{}),
      });
      cancelled(phaseSignal);
      onPhaseProgress(`${label} / ${stage}: 応答受信（${Date.now()-started}ms）。`);
      return response;
    } catch(error) {
      onPhaseProgress(`${label} / ${stage}: ${phaseSignal?.aborted?'停止':error?.code==='TIMEOUT'?'APIの応答待ち上限到達':'検査未完了'}（${Date.now()-started}ms）。`);
      throw error;
    }
  };
  cancelled(signal);
  const detected=await (regionTools?.detect||inspectVariablePanelFrames)(`data:${image.mimeType};base64,${image.base64Img}`);
  cancelled(signal);
  const frames=orderObservedFrames(detected);
  if(frames.length!==plan.count) {
    // Count is pixel-derived; incompatible geometry cannot safely bind planned
    // actors or speech to crops. Retain this fact without a paid model review.
    return {review:validateExperimentalReview({inspectionKind:'frame-geometry',observedCount:frames.length,
      observedFrames:frames.map(({bounds})=>({bounds}))},plan),model:'local frame geometry',
      finishReason:'local',characters:0,attachedImages:0,requests:0};
  }
  const spatial=await prepareExperimentalReviewImages(image,plan,signal,regionTools,frames);
  // Observe pixels and compare the approved source in one response.
  // Local validation still derives dialogue order from observed coordinates.
  const inventoryPrompt=`Observe visible physical bodies and transcribe readable lettering from the attached images. Record visible pixels separately from the expected script supplied below; never fill observations from that script. Image 1 is the full page; images 2..${frames.length+1} are actual native-pixel panel crops in reading order; the last two images enlarge the left/right footer. In the combined assessment JSON, include pageEvidence (one STRING transcribing the actual title/footer) and evidence (exactly ${frames.length} objects: panel, text_regions, physical_bodies). panel is an integer 1..${frames.length}, not an image number or string. ${frames.map((_,index)=>`Image ${index+2} = P${index+1}`).join('; ')}. Never use the image number as the panel ID. Each physical_bodies array is a pixel-grounded census of ALL distinct physical bodies visible in THAT assigned panel crop only, including partial rear heads and cropped limbs. Never import a person from another panel or infer a fully hidden body. Use [] for no visible bodies. Each body must have id (unique string within the panel), bounds (array of exactly four numbers: left, top, width, height), and features (array of at least two strings describing the actual hair, face, clothing or visible body part). Bounds are normalized within THAT assigned crop: 0<=left,top and left+width<=1, top+height<=1. Describe actual colors, shapes, garments or the visible hand/cuff; never copy schema labels as observations and never guess names. A disconnected hand/limb whose owner is not visible is its own partial-body record; do not duplicate a connected visible body. Depictions inside photos/screens are excluded from physical bodies. For EACH physical body record add gaze, based on pixels independently of names or story: visibility_basis (visible_eyes|closed_eyes|rear_head|outside_frame|non_face_crop|occluded|too_small|uncertain), eye_visibility (visible|not_visible|occluded|too_small|uncertain), direction (in_scene|at_viewer|no_visible_eyes|uncertain), eye_position ([x,y] of the visible eyes within THAT crop, null if unobservable), eye_evidence (actual pupil/iris position relative to eyelids and visible sclera, or the concrete reason eyes are not visible), face_direction (observed face orientation, not an inferred gaze), and target (description and position [x,y] of the actual visible in-scene target, null when unresolved). All positions are crop-normalized. Use your own distinct observations for each body; never repeat a group-level gaze claim. A frontal face or tilted head alone does not establish looking at the viewer. at_viewer requires visible pupil/eyelid evidence that the visual axis points out toward the reader. In-scene claims require an observable target and its position; never infer one from props, dialogue or expected action. Closed eyes, rear heads, heads outside the crop and non-face-only crops may use not_visible/no_visible_eyes with a concrete anatomical/crop explanation; occluded or tiny eyes remain uncertain. Use null for unobservable details, never invent them to satisfy the fields. Each region has region_kind (speech_balloon|printed_object|caption|sound_effect|uncertain), text (verbatim including punctuation, null if unreadable), container_evidence, and center_x for speech balloons (0 left, 1 right within THAT crop, center of the balloon body excluding its tail). Observe coordinates from pixels, never infer them from a character, conversational order, or sentence meaning. A free-floating rounded/thought balloon is speech_balloon; lettering on screens/signs/props is printed_object; standalone noise/action lettering is sound_effect. Use text_regions:[] for a visibly silent crop without lettering. Mark uncertainty; never invent or complete text. Keep these observations separate from the quality verdicts in the same response.`;
  const responseInstructions=useStructuredOutput
    ? "Use the supplied strict JSON schema; do not repeat its template or field definitions. Root checks are verdicts. Panel view.evidence, style_observation.evidence, story and anatomy are concise Japanese pixel observations (at least 8 characters), not verdict labels. Observe first, derive verdicts second. Missing evidence stays null/uncertain."
    : '\nROOT VERDICTS ONLY: the top-level camera/style/story/anatomy fields are pass/fail/uncertain. PANEL OBSERVATIONS ARE PROSE: view.evidence, style_observation.evidence, story and anatomy describe actual visible evidence in concise Japanese (at least 8 characters), never verdict labels. Angular enums belong only to evidence[].view.elevation. Each evidence object has this shape, filling all prose from the pixels, not copying this template: {"panel":1,"story":"<visible action and prop evidence>","anatomy":"<visible body continuity and duplication evidence>","view":{"elevation":"uncertain","gaze":"uncertain","evidence":"<visible projection and gaze targets>"},"style_observation":{"medium":"<observed medium>","status":"<pass|fail|uncertain>","evidence":"<visible setting and clothing medium>","actors":[{"body_id":"<independent inventory id>","medium":"<observed medium>","status":"<pass|fail|uncertain>","face_visibility":"<visible|hidden|too_small|uncertain>","face":"<visible facial construction or reason it cannot be inspected>","shading":"<visible shading marks or reason they cannot be inspected>"}]},"body_dispositions":[],"cast_instances":[{"name":"<required cast name>","status":"<ok|defect|uncertain>","instances":[{"body_id":"<independent inventory id>","location":"<distinct visible body location>","feature_indices":[0,1]}]}],"text_regions":[]}. Never compress observations into verdict labels.\nREQUIRED ASSESSMENT FIELDS (types and choices, not prefilled answers): observedCount: integer counted from the full page; null only when actual panel boundaries cannot be resolved, with the visual ambiguity stated in issues. Do not substitute the requested count or the number of supplied crops. Assess each required check independently: readingOrder, camera, style, story, anatomy, pageText each take exactly one of pass/fail/uncertain from the actual observations. Use pass for supported compliance, fail for a concrete material violation, uncertain only for an unresolved observation; name that unresolved observation in issues. An uncertain check must not erase a confirmed failure or make unrelated checks uncertain. status: warning when a concrete failure is present; otherwise unverified if any required check is unresolved; otherwise pass. breakout: pass/fail/uncertain when requested, not_requested otherwise. issues: array of concrete Japanese problems or unresolved observations, empty only when none. pageEvidence: one string transcribing observed lettering. evidence: array containing every panel observation. Complete observations first and derive every root verdict from them before returning JSON. These fields have no default verdict. Never use a boolean, sentence or object for a root verdict. Supply every panel observation in evidence. Each evidence item MUST include text_regions: an array of observed regions with region_kind (speech_balloon|printed_object|caption|sound_effect|uncertain), text (verbatim or null), container_evidence, and center_x for speech balloons (0 left, 1 right within its native crop, body center excluding tail). A free-floating rounded/thought balloon is speech_balloon; lettering on camera screens, signs or props is printed_object. Standalone action/noise lettering is sound_effect, NEVER speech. Include text_regions:[] in a visibly silent frame without lettering. Do not write silence descriptions as speech. Never guess uncertain text. The program filters speech_balloon regions and sorts their coordinates; your JSON order is not the reading order.';
  const response=await phaseRequest('assessment',[inventoryPrompt,prompt,spatial.instruction,
    'Return physical_bodies and text_regions once per panel; derive no dialogue array. Bind cast and style to the same observed body IDs; never invent bodies. Store projection once in view.evidence, medium once in style_observation.evidence, and pupil/lid observations once in gaze.eye_evidence; omit panel camera/style and gaze.pupil_placement. Cast and body dispositions use feature_indices into their same-panel body features, not copied feature strings. Counts are derived from instances, not returned. Keep the shortest sufficient observation; use null only where unobservable.',
    "MATERIAL DEFECTS FIRST: inspect duplicate/missing identities, connected limbs and joint directions, actual gaze targets and scripted gaze changes, physical panel chronology, dialogue/speaker ownership, and missing story-critical actions or props. Inspect every panel once. A harmless coherent pose/expression, natural foreshortening, occlusion, subtle shading or finish variation is not a defect. Check the requested medium, not an ideal amount of detail. Use the shortest sufficient observation per field; expand only a concrete material defect with an actionable correction. Do not repeat the source or narrate the inspection. Uncertainty never authorizes repair.",responseInstructions].join('\n'),spatial.images,signal,{responseFormat:'json_object'});
  cancelled(signal);
  const assessed=parseExperimentalReview(response.text,{...response,stage:'assessment'});
  if(Array.isArray(assessed.evidence))assessed.evidence=assessed.evidence.map(entry=>entry&&typeof entry==='object'?expandReviewObservations(entry):entry);
  const inventory=assessed;
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
  let expectedStyles=null;
  try { expectedStyles=JSON.parse(prompt.match(/^EXPECTED PANEL STYLES: (.+)$/m)?.[1]); } catch { /* Missing source media cannot establish style compliance. */ }
  let expectedOutfits=null;
  try { expectedOutfits=JSON.parse(prompt.match(/^EXPECTED OUTFIT SCOPES: (.+)$/m)?.[1]); } catch { /* Missing authority is never supplied by the reviewer. */ }
  return {review:{...assessed,inspectionVersion:EXPERIMENTAL_INSPECTION_VERSION,pageEvidence:inventory.pageEvidence,expectedPageText,expectedStyles,expectedOutfits,evidence,observedFrames:frames.map(({bounds})=>({bounds}))},model:response.model,
    finishReason:response.finishReason,characters:response.text.length,attachedImages:spatial.images.length,requests:1};
}

export function buildExperimentalImagePrompt(plan, source, { colorMode, providerFamily=PROMPT_PROVIDER_FAMILIES.GEMINI, mosaicCopyrightedCharacters=false, showWatermarks=false, referenceContext='', imageEngineLabel='Gemini', scenarioModelLabel, promptMaxChars=OPENAI_IMAGE_PROMPT_MAX_CHARS }={}) {
  const effectiveProviderFamily=normalizePromptProviderFamily(providerFamily);
  validateExperimentalPlan(plan,source);
  const rects=experimentalLayout(plan.count,plan.layout);
  const readingPairs=rects.flatMap((rect,i)=>{
    const next=rects[i+1];
    return next&&rect.y===next.y&&rect.x>next.x?[`P${i+1} RIGHT precedes P${i+2} LEFT`]:[];
  });
  const title=extractScenarioTitle(source.scenario);
  const sourceFacts=experimentalStoryFacts(source);
  const activeOutfit=readExplicitOutfit(source.context);
  // Move only the authored global line, outside reference observations. Keep the
  // source intact for panel scopes/QA and preserve every other context byte.
  let renderedContext=source.context, sceneOutfit='';
  if(activeOutfit){
    const line=[...source.context.matchAll(/[^\r\n]+/g)].find(match=>readExplicitOutfit(match[0])===activeOutfit);
    if(line){
      const start=line.index,end=start+line[0].length;
      const after=source.context.slice(end).match(/^\r?\n/)?.[0]||'';
      const before=source.context.slice(0,start).match(/\r?\n$/)?.[0]||'';
      sceneOutfit=line[0]+(after||before||'\n');
      renderedContext=source.context.slice(0,start-(after?0:before.length))+source.context.slice(end+after.length);
    }
  }
  const scopedOutfit=hasScopedOutfitAssignment(activeOutfit,collectCastNameEntries(source.castList),source.castList);
  const panelOutfits=source.panels.map(panel=>readExplicitOutfit(panel.text));
  const watermark=buildMangaWatermark({imageEngineLabel,scenarioModelLabel,systemVersion:SYSTEM_VERSION,isChatGPTFamily:/^ChatGPT/.test(imageEngineLabel)});
  const castRules=plan.panels.map(p=>experimentalCastRule(p,source,colorMode).split('\n'));
  const monochromeIdentity = colorMode === 'monochrome' ? buildIdentityMatrix(source.castList, {monochrome:true}) : '';
  const referenceCast = effectiveProviderFamily===PROMPT_PROVIDER_FAMILIES.CHATGPT ? stripWeightTags(cleanCastList(source.castList,scopedOutfit?'':activeOutfit)) : cleanCastList(source.castList,scopedOutfit?'':activeOutfit);
  // Share the four-panel lettering boundary: Bn values are printable, while
  // speaker ownership and balloon geometry remain nonprinting metadata.
  const dialogueBlocks=compact=>plan.panels.map(p=>extractDialogueOnly(source.panels[p.sourcePanel-1].text,source.castList,{forImagePrompt:true,compactMetadata:compact,separateMetadata:true}));
  const fullDialogue=dialogueBlocks(false),compactDialogue=dialogueBlocks(true);
  // Hoist only identical compiler-owned rules. Never deduplicate source prose,
  // actor rosters, dialogue, or panel-specific staging by textual similarity.
  const commonCast=new Map();
  castRules.forEach((rules,index)=>rules.forEach(rule=>{
    if(/^(?:CAST INSTANCE LOCK:|CAST DEPTH:)/.test(rule)) {
      if(!commonCast.has(rule)) commonCast.set(rule,[]);
      commonCast.get(rule).push(index+1);
    }
  }));
  const styles=[...new Set(plan.panels.map(p=>source.panels[p.sourcePanel-1].style))];
  // Facial construction stays shared; this mode shades it with pen strokes,
  // not the large solid shadow planes used by the previous recipe.
  const recipes={NORMAL:'Use the established source/reference character drawing style throughout faces, clothing, props and setting. Preserve the usual eye geometry and clean contours; do not inherit another frame’s special medium or hatch treatment.',...(colorMode==='monochrome'?MONOCHROME_EMOTION_STYLES:COMPACT_EMOTION_STYLES),
    GEKIGA:`In THIS PANEL ONLY, fully redraw faces as realistic GEKIGA manga. ${GEKIGA_FACE_CONSTRUCTION} Primary facial shading is dense fine pen hatching and crossing strokes, retaining narrow light gaps between lines. Solid black is a secondary accent in local occlusion/contact shadows. Keep recognizable identity/age, scripted emotion, gaze, Camera/Action and body acting. ${colorMode==='monochrome'?'BLACK AND WHITE ink on paper.':'FULL COLOR; opaque local color beneath the pen drawing.'}`};
  const effects=[...new Set(plan.panels.flatMap(p=>p.visualEffects??[]))];
  // Translate only compiler-owned prose. Authored facts, actions and recipes stay exact.
  const qualityContract=(colorMode==='monochrome'?MONOCHROME_IMAGE_QUALITY_CONTRACT:buildImageQualityContract({panelMedia:true}))
    .replace("Preserve the user's requested cast, action, setting, and camera. Quality enrichment must support those directions, never replace them.", '指定の人物・動作・場所・Cameraを保持。品質補強は指定を支え、置換しない。')
    .replace('Render a rich physical setting with meaningful environmental anchors and layered foreground, midground, and background; do not default to empty walls, flat gradients, or generic blank rooms unless physical emptiness is explicitly requested.', '意味のある環境の手掛かりと前景・中景・背景の層を豊かに描く。物理的な空虚さの明示指定がなければ、空の壁・平坦なグラデーション・無個性な空室へ簡略化しない。')
    .replace("Establish one primary focal subject or action and at most one supporting cue per panel. Use scale, placement, value and medium-appropriate edges to make the acting face, hand and story prop readable. Render actors, faces, clothing, props AND background in that panel's assigned medium; do not apply one generic ink or paint treatment across the page. Simplify secondary detail without erasing required setting evidence.", '各コマの主焦点は主対象または動作一つ、補助焦点は最大一つ。大きさ・配置・明暗・指定媒体の輪郭で演技する顔/手/物語の道具を明瞭に。人物/顔/服/道具/背景すべてをその枠の媒体で描き、全ページを同じ墨/塗りへ均さない。補助細部を整理しても必要な場所の証拠は消さない。')
    .replace("FOCAL READABILITY: preserve shot scale, elevation, side, gaze, head turn and required body/prop visibility. Keep reactions, lettering and contact readable using the assigned medium's edges, pigment or ink, not an imposed contour style. Never turn a rear head toward the viewer for clarity.", 'FOCAL READABILITY: 寄引き/仰俯角/撮影側/視線/頭の向き/必要な身体と道具の見え方を保持。反応/文字/接触は指定媒体の輪郭/顔料/墨で明瞭にし、別媒体の輪郭を強制しない。明瞭化のため後頭部を読者へ振り向かせない。')
    .replace('Keep lighting and color coherent between cast and setting: use a motivated key light, fill, and rim or equivalent emotional lighting, with the cast clear against a softer, lower-contrast background.', '人物と場所の光/色を整合。根拠のある主光・補助光・輪郭光または相応の感情照明を使い、柔らかく低コントラストの背景から人物を明確に分離。')
    .replace(SKIN_LIGHTING, 'SKIN LIGHT: 肌の基調色を保ち、ハイライトは小さく柔らかく控えめに。鼻/頬の白墨状の塊は禁止。主光/補助光/輪郭光・影の深さ・目/髪の輝きを保持。明示の濡れ/光沢/様式化照明を優先し、白黒では紙白規則。CHEEK RENDERING: 物語/参照の識別特徴と指定媒体に従う（水彩は肌になじむ淡彩）。全員に定型の頬染め判子/縞を付けない。感情による赤面/化粧/墨と影の面は保持。参照シートに偶然ある頬染めを恒久的特徴にしない。')
    .replace('Keep coherent anatomy and joint direction at the neck, shoulder, elbow, wrist, hip, knee, and ankle. Use exactly the limbs implied by each visible character; preserve natural prop ownership, grip, contact, support, and left/right orientation.', '首/肩/肘/手首/腰/膝/足首の解剖と関節方向を整合。各可視人物に必要な四肢の数を厳守し、道具の所有/握り/接触/支持/左右を自然に保つ。')
    .replace('Model clothing folds at real overlaps, pinches and intersections using the assigned medium: transparent pigment for watercolor, ink planes for ink-based recipes. Preserve natural material texture; do not impose opaque cel-fill on transparent painting.', '服の皺は実際の重なり/つまみ/交差に置く。水彩は透明顔料、墨の媒体は墨の面を使い、自然な材質を保持。透明画へ不透明なセル塗りを強制しない。')
    .replace('Do not duplicate, merge, or replace main characters. Allow ordinary background people suited to the setting; no main-cast clones or new dominant characters.', '主要人物の複製/融合/置換禁止。場所に合う普通の背景人物は許容し、主要人物の分身や新たな支配的キャラは追加しない。')
    .replace('Keep focal surfaces legible; avoid accidental compression noise, moire and decorative particles. Preserve deliberate pigment pooling, paper grain, pencil texture or hatching belonging to the assigned medium. VFX never replace physical setting or story evidence.', '主焦点の面を明瞭にし、偶発的な圧縮ノイズ/モアレ/装飾粒子を避ける。指定媒体の意図した色溜まり/紙目/鉛筆の質感/カケアミは保持。VFXで実在の場所や物語の証拠を代用しない。')
    .replace(BODY_ACTING_BASELINE, 'BODY ACTING BASELINE: 参照ポーズは同一性資料で、反復演技/性格の型ではない。明示動作を全保持。物語に必要な指差し/伸手/打撃/全身反動/跳躍/強い短縮を許容し、種類を禁じず目的/シルエット/振幅を変える。動作の時点・支持/空中軌道・重心・左右の手の役割・接触対象を解き、脚本の視点内で可視の演技/手掛かりを読めるように。')
    .replace(EXPRESSIVE_DIRECTION, 'EXPRESSIVE DIRECTION: 明瞭で生きた漫画。強い高さ/傾き/短縮、全身誇張、重さ/輪郭/表情。Camera/Actionを実描写し、速度線で動作/透視を代用しない。任意の方向ブラーは指定動線に沿い、主動作/接触/文字を保持、静止へ動きを捏造しない。水平目線の集合絵に均さず、距離/光/VFXでコマ対比。明示静寂/Camera/Action/同一性/台詞原文/四肢/道具の所有と向きを守る。誇張自体は描画欠陥でない。')
    .replace(FUNCTIONAL_SURFACE_PROJECTION_RULE, 'VIEWPOINT: 読み手の反対から直立端末/紙は裏、平置きの文字は上下逆/回転して見え、可読性のため画布に直立させない。位置未指定時だけ実際の読み手の後頭部/肩を前景にして表を見せる。他者が読む時に保持者の肩越しにしない。明示Cameraと強い高さ/傾斜/短縮を保ち、その視点から表裏と文字を投影。標準肩越しへ平坦化しない。')
    .replace(HEAD_VOLUME_LOCK, '頭蓋/顔縁/耳/眼鏡は一つの頭部体積。指定の向き/遮蔽を保持。耳は片側一つ、遠い耳は遮蔽。頭蓋の伸長/積重ね禁止、顎と首は整合。後頭部に顔を捏造しない。横顔/様式化/短縮は許容。硬い被り物も頭と回転し、視点通りの表/裏/縁に。明示の両面意匠は許容。')
    .replace(FUNCTIONAL_SURFACE_ORIENTATION_LOCK, 'FUNCTIONAL SURFACE ORIENTATION LOCK: 情報/操作/光学/サービス面（画面・モニター・携帯・名札・看板・ラベル・文書・申請書・印刷紙・カード・本・地図・領収書・券・メニュー・新聞・キーボード・操作盤・レンズ・背面画面）の表/裏/対象を解く。対象は保持者でなくActionで決定: 読む/操作=本人、提出/提示=受取人。作中の操作/接客/読書/鑑賞/撮影対象へ正面を向け、漫画読者への読みやすさで回転しない。対象の反対からは裏/縁。モニター背面は筐体/台座、画面を透かさない。机の上向き紙は上から見え、文字の天地は読む人物向き。後ろ向き人物の胸元の紙/端末は胴体に隠れてよく、正面や手を背中に透過させず、見える場合だけ身体に接続した側面/裏/縁を描く。明示Cameraの位置/高さ/仰俯角/レンズ/切取りは固定、可読性のため移動禁止。位置未指定時のみ物でなくCameraを移し、実際に読む人物の後頭部/肩を前景に。カメラ/閲覧者へ提示する例外は脚本で受取人として明示された時だけ。')
    .replace(OBJECT_GEOMETRY_LOCK, 'OBJECT GEOMETRY LOCK: 体積/接触/遮蔽を解き、隠れた輪郭は整合して消失/再開。頭/髪/体/物へ道具を貫通・融合・接線で埋め込まない。重なりか隙間を明確にし、指定接触/Action/Cameraを保持。厚み/綴じ/折り目/角から印字面（表紙/背/本文/小口/ラベル/画面）を識別。文字はその面の軸/透視に従い、画布基準・面またぎ・小口の表紙化は禁止。まず直立した物に各字の天地を含め組版し、一枚の印刷テクスチャとして物と回転/投影。完成Camera像へ直接組版しない。積む/回す時に背文字を再組版したり行だけ回して字を画布に直立させない。縦横書きとも成立し、元の組版を保持。原文に根拠のあるシュールなギャグ/変形は保ち、出来事でなく輪郭を明確化。笑いを無関係な描画欠陥の口実にしない。');
  const render=compact=>`Create ONE complete Japanese manga page with EXACTLY ${plan.count} framed panels. A4縦、外周全体を保持。左右白余白各0.6%、残り98.8%をコマに使用し切り落とさない。上6.5%は題字、中91.3%はコマと溝、下2.2%はフッター。Internal white gutters は明瞭に分離し、外余白で代用しない。
Top title EXACTLY ${JSON.stringify(title)}: 白地中央に大きい極太長体ゴシック、囲み枠/帯/罫線なし。台詞は縦書き漫画明朝。コマ番号/計画ラベル/Camera/参照トークンは印字禁止。RTL READING ORDER: P1〜P${plan.count}は右→左、上→下の順。指定矩形と各時点を厳守。
PHYSICAL READING PATH (not printed): ${rects.map((_,i)=>`P${i+1}`).join(' -> ')}. PAGE FRAME内の一場面をその位置に描く。FINAL ENDING is P${plan.count}; 結末の台詞/反応はそこに置く。
${readingPairs.length?`ROW CHRONOLOGY: ${readingPairs.join('; ')}. 各組の先行場面が先。絵/吹き出しの均衡のために入替えない。ページ位置であり、コマ内Camera/Actionの方向ではない。`:''}
${colorMode==='monochrome'?'BLACK AND WHITE ink and screentones only, no colored regions.\n'+MONOCHROME_REFERENCE_SEPARATION:'Full color; preserve each source panel art style.'}
原文条件は対応枠直前に一度だけ記載。台詞トークンは正確なID参照で、印字/重複発話禁止。source beat番号は配置指定ではない。
PAGE PLAN layout=${plan.layout}: rectは漫画領域内の正規化座標、x=左,y=上。細い白溝は枠内側。読順位置固定、またぎ矩形は一枚の未分割コマ。原文条件で配置を変えない。
PAGE DIRECTION: ${typeof plan.pageIntent==='string'?plan.pageIntent:plan.reason}
強調前にCameraと体/道具の関係を解く。意図した切取りを保持し、接写へ全身を強制しない。顔/体/服/道具/背景を指定媒体で構築し、アニメ顔へのフィルター化は禁止。
場面内の隣接/前後/向かい/席位置を移動/転換の根拠なく入替えない。画面左右の固定ではない。俯瞰/アオリ/切返し/アップ/望遠の奥行圧縮/寄引き/遮蔽と自然な移動を許容。登場指定を守り、全員を毎回横一列にしない。
PAGE FRAME内 Camera: execute physical projection at full strength. Camera/Action/原文内の左右・前後はコマ内部の演技で、ページ上の位置ではない。Dialogue: Bnの引用符内の本文だけを原文通り印字。B1から右→左 (rightmost balloon first)。話者名/番号/TAIL TIP LOCK/BALLOON LAYOUTは印字禁止。本文内の呼びかけ/名乗りは保持。TAIL TIP LOCK: proximity never reassigns ownership. SILENTは発話追加禁止。
FRAME MEDIUMは囲まれた一枠専用、印字禁止。溝ごとに媒体を再構築し、同一人物でも前コマの描法を引き継がない。${compact?'\nALL ACTORS: 脇役も含む全可視人物を、その枠の媒体で描き、見える顔を全て再構築。主役だけでは不可。同一性/感情/視線/脚本上の見え方を保持。':''}${fullDialogue.some(block=>block.includes(' BALLOON LAYOUT'))?`\nBALLOON LAYOUT: Bn = nth Dialogue entry in that frame; metadata for the SAME balloon, not additional speech.${compact?' x=0 left/1 right within each frame; NEVER PRINT; preserve Camera/Action.':''}`:''}
原文各コマ→PAGE FRAMEは1対1。動作/道具状態/Camera/画風/台詞を全保持。その時点だけを描き、後の結果の先取り/早い結末反復は禁止。明示breakout以外は身体を枠内に収める。
[REFERENCE CAST DATA]
以下は参照人物の観察データ。重み付き語も全コマ共通の描画命令ではない。年齢・肌・髪・眼鏡・顔の識別点・左右差を保持。資料の描法と様式的な目対顔/頭対体比はNORMALで採用し、特殊媒体では各FRAME MEDIUMとACTOR MEDIUMで描き直す。脚本で明示された身体特徴と表情は保持。
CAST: ${colorMode==='monochrome'?sanitizeMonochromeSourceDescription(referenceCast):referenceCast}
[END REFERENCE CAST DATA]
${sceneOutfit}${plan.panels.map((p,i)=>{
    const orig=source.panels[p.sourcePanel-1];
    // Anchors retain the source cast. Inserts use only their own visible staging,
    // so a hand close-up does not acquire every actor from the source beat.
    const castRule=castRules[i].filter(rule=>(commonCast.get(rule)?.length??0)<2).join('\n');
    return `${i===0||plan.panels[i-1].sourcePanel!==p.sourcePanel?sourceFacts[p.sourcePanel-1]+'\n':''}[PAGE FRAME P${i+1} | ${physicalPanelPosition(rects[i])}${i===plan.count-1?' | FINAL ENDING':''}]
rect=${JSON.stringify(rects[i])}; source beat=${p.sourcePanel}; kind=${p.kind};
${compact?'Camera:':'Inside this frame — Camera:'} ${p.camera}; Style: ${orig.style||'preserve source/reference art style'}; Action: ${p.action}
${getPanelShotExecution(p.camera,{compact:true})}${panelOutfits[p.sourcePanel-1]?`\nFRAME OUTFIT: ${panelOutfits[p.sourcePanel-1]}`:''}
${recipes[orig.style]?`FRAME MEDIUM P${i+1} — ${orig.style}: ${recipes[orig.style]}${compact&&orig.style!=='GEKIGA'?' ALL ACTORS.':' Every visible actor in this frame: 脇役も同じ媒体で描き、見える顔を全て再構築。主役だけでは不可。同一性/感情/視線/脚本上の見え方を保持。'}`:''}

${colorMode==='monochrome'?buildMonochromePanelInkLock(orig.text+'\n'+p.action,monochromeIdentity)+'\n':''}${buildActorMediumInstruction(orig.style,colorMode)}
${castRule}
Dialogue: ${p.dialogueIds.length?(compact?compactDialogue[i]:fullDialogue[i]):'SILENT'}
${p.breakout?`Intentional border breakout: ${p.breakout.part} of a character in P${i+1} crosses into adjacent P${p.breakout.into}. One continuous foreground layer; border and gutter disappear behind its connected silhouette and resume after it. Keep source shoulder/hip ownership, no duplicate or detached limb. Keep adjacent faces, acting hands, key props and text entirely unobscured; no cross-scene interaction. If a clean crossing is impossible, keep the body inside its source panel.`:''}
[END PAGE FRAME P${i+1}]`;
  }).join('\n')}
${READING_FLOW_DIRECTION}
PANEL RENDERING MAP: each Pn's Style field assigns its medium; never reorder frames.
Identity is not a frozen drawing style. 年齢/髪/眼鏡/衣装/明示同一性を保ち、全可視人物をコマの媒体で描き直す。顔構造・目対顔/頭対体比・輪郭・影形の変更は意図した画風差。${colorMode==='monochrome'?'白黒の各FRAME MEDIUMを顔/髪/服/背景へ適用。NORMALのアニメ目/セル顔をGEKIGAへ持ち込まない。GEKIGAは遠景の脇役も細い解剖学的瞼/写実面/墨の顔影。水彩枠も墨線/紙白による白黒用の描法で、人物だけ別媒体にしない。実現のための拡大/切抜きは禁止。':'NORMALのアニメ目/セル顔をGEKIGAへ、不透明人物を水彩背景へ持ち込まない。GEKIGAは遠景の脇役も細い解剖学的瞼/写実面/墨の顔影。実現のための拡大/切抜きは禁止。水彩は顔/服/背景すべて透明顔料と紙白。'}隣接媒体/明暗を明確に切替え、表情/表面質感だけの変化にしない。
REFERENCES: identity and asset design; selected panel recipe determines drawing style, face/eye construction and body stylization. 参照の描法/目の大きさ/簡略顔を同一性として固定しない。年齢・顔の識別点・髪・肌色・眼鏡を保持し、設定資料の配置/ラベルを転載しない。${activeOutfit?'Outfitは参照の服より優先。同一性/髪/眼鏡は保持。':''} ${referenceContext}
${WARDROBE_COMPONENT_LOCK}
${scopedOutfit||panelOutfits.some(Boolean)?OUTFIT_SCOPE_CONTRACT:''}
${sceneOutfit&&!renderedContext?'':`SOURCE FACTS (not captions): preserve every condition. Context: ${renderedContext}`}
${styles.includes('GEKIGA')?`GEKIGA CAST CHECK (${plan.panels.flatMap((p,i)=>source.panels[p.sourcePanel-1].style==='GEKIGA'?[`P${i+1}`]:[]).join(', ')} only): HATCH-FIRST FACE CONSTRUCTION — DEEP-CUT GEKIGA。ペン線で意図的に深い彫りを作る。穏やか・微笑・遠景・眼鏡を含む全可視顔を再構築。ハッチ前に頭蓋と顔面を組立て、眉骨下へくぼむ眼、眼球を包む厚い瞼と狭い開口・小さい虹彩、突出する鼻梁/鼻側面/小鼻、明瞭な頬骨/顎角を陰影なしでも読める輪郭にする。眼窩/こめかみ/鼻側面/頬下面/首へ、各面と脚本の光に沿う細い交差ペン線。線間隔/角度/筆圧を変え、個々の線と狭い紙白の隙間を残す。明部へ線を先細りさせ、影は広い塗潰しや柔らかなグラデでなく線の層で深める。内部は細線、外輪郭は強弱ある太い筆線。黒ベタは鼻孔/顎下など最深部の小さな遮蔽の補助だけ。顔のハッチを大きな平坦セル影で代替しない。彫った顔の量感であり、汚れ/装飾傷/加齢皺/灰色テクスチャ被せではない。柔光でも同じ光向きでハッチ密度差を明瞭にし、穏やかな感情で彫りを弱めない。${colorMode==='monochrome'?'墨と紙白。顔の陰影はペン線で、均一な灰色網点にしない。':'主となるハッチの下に不透明色。明部の肌色と顔の影全体の細線を保持。'}参照の眼形状/簡略鼻を上書き。劇画の柔らかさは感情で、丸いアニメ顔ではない。年齢/髪/肌色/眼鏡/顔の識別点で同一性を保つ。微笑は口と頬を緩め、目を拡大せず、彫った面/密な顔ハッチを消さない。脚本の視線/Camera/切取り/表情と性別表現を保持し、怒り/加齢/皺を追加しない。冷静な顔は冷静に。他コマは各自の顔構造/媒体を保持。`:''}
${[...commonCast].filter(([,panels])=>panels.length>1).map(([rule,panels])=>`Applies only to ${panels.map(n=>`P${n}`).join(', ')}: ${rule}`).join('\n')}
${effects.map(id=>`Applies only to ${plan.panels.flatMap((p,i)=>(p.visualEffects??[]).includes(id)?[`P${i+1}`]:[]).join(', ')}: ${EXPERIMENTAL_VISUAL_EFFECTS[id].instruction}`).join('\n')}
${qualityContract}${colorMode==='monochrome'?'\n'+MONOCHROME_RENDERING_LOCK_COMPACT+'\n'+MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT:''}
PANEL EDGE CONTINUITY LOCK: PAGE CONTAINMENT: 外枠の四辺/四隅を余白付きで画布内へ収め、切落とし/画外拡張は禁止。明示の枠なし/裁切り指定は優先。内部の枠越えは外周裁切りの許可ではない。道具/画面/文字は自枠内、隣場面への流出は明示時のみ。原則、見える頭と髪の全輪郭を余裕付きで枠内に。演出上の枠越えは一つの連続した前景層とし、枠線は頭/髪の全輪郭の後ろで止まり、その後に再開。顔/髪を枠線で貫く・輪郭の切断・外側断片の複製・枠内外の位置ずれは禁止。綺麗に越えられなければ全輪郭を枠内に保持。
LIMB OWNERSHIP CHECK (internal; never print): 全コマの各人物の左右の腕/手/脚/足を可視・自然な遮蔽・画面外に分類。見える手→手首→肘→本人の肩、足→足首→膝→本人の腰を辿り、隠れた部分も自然につなぐ。所有者不明/余分/融合/分離/理由のない欠落、家具や他人の体から出る手足は禁止。指定の解剖/ポーズ/接触/Camera/切取り/短縮を保持し、隠れた四肢の露出や全身画角を強制しない。仕上げ前に所有/接続の曖昧さだけを直し、動作や構図を変えない。
${buildRenderOptionsContract({mosaicCopyrightedCharacters,showWatermarks})}
${mosaicCopyrightedCharacters?'':COPYRIGHT_MOSAIC_TARGET_SCOPE}
${buildProtectedCastContract(collectCastNameEntries(source.castList).map(entry=>entry.displayName))}
${showWatermarks?`FOOTER ONLY, below the last panel: 両クレジットを一度ずつ、小さな横書きで安全域内に全文読めるよう重なりなく配置。Bottom-left EXACTLY "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780". Bottom-right EXACTLY ${JSON.stringify(watermark)}. コマ内/道具上への転載禁止。`:'No watermark or footer text; leave footer blank.'}
描画前確認: コマ数/日本式読順/元の結末/全台詞と話者/強い物理Camera/連続する人体/正確な枠越え層。全コマを正面バストへ変換しない。原文にない題字を作らない。`;
  const full=render(false);
  // Only repeated compiler prose is hoisted when necessary. Authored fields,
  // every complete medium recipe and GEKIGA's per-frame cast direction stay exact.
  return full.length>Math.min(promptMaxChars,EXPERIMENTAL_PROMPT_SOFT_TARGET_CHARS)?sharePanelShotExecution(render(true)):full;
}

export function buildExperimentalReviewPrompt(plan, source, options={}) {
  const {expectedCast,expectedDialogue}=validateExperimentalPlan(plan,source);
  // The enlarged-frame reader never receives the expected speech. Comparison
  // is deterministic afterwards, so a model cannot echo the answer as OCR.
  const blind=value=>{
    let serialized=JSON.stringify(value);
    for(const entry of [...expectedDialogue].sort((a,b)=>b.text.length-a.text.length)) {
      serialized=serialized.replaceAll(JSON.stringify(entry.text).slice(1,-1),`<speech-${entry.id}-withheld>`);
    }
    return serialized;
  };
  const expectedFooter=options.showWatermarks?{
    left:'ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780',
    right:buildMangaWatermark({imageEngineLabel:options.imageEngineLabel||'Gemini',scenarioModelLabel:options.scenarioModelLabel,systemVersion:SYSTEM_VERSION,isChatGPTFamily:/^ChatGPT/.test(options.imageEngineLabel||'')})
  }:null;
  return `Read the actual attached generated manga. Return ONLY JSON with status (pass|warning|unverified), observedCount (integer or null), readingOrder/camera/style/story/anatomy/pageText (pass|fail|uncertain), breakout (pass|fail|uncertain|not_requested), issues (array of Japanese observed problems, empty when none), pageEvidence (STRING: transcribe actual title/footer lettering seen, including missing/unreadable text), evidence (one item for EVERY panel, with panel number, Japanese view.evidence/style_observation.evidence/story/anatomy observations, and breakout observation when requested). ${buildExperimentalReadingReviewContract(plan)} Never copy example text, source descriptions, or Camera labels as observed evidence. Defaults for anything not observable are uncertain/null, never pass. Optional border breakouts and visualEffects may be omitted if needed for a clean coherent composition; their absence alone is not a material failure or a reason for regeneration. Distinguish translucent prop motion trails from solid duplicate props or extra limbs. Observe slanted borders as borders, not a change to the physical Camera.
${READING_FLOW_DIRECTION}
Inspect exact panel count/reading order, ALL required camera elevations/projections/crops and style differences, original action/facts/ending/dialogue ownership and connected anatomy; adjacent faces/text remain legible. Locate each observation in the actual page, describe visible body extent and occlusion; never infer hidden/cropped feet or a breakout from the plan. Cropped feet alone are advisory, never a camera failure or a regeneration reason. Camera observations describe visible head/shoulder planes, horizon and perspective; style observations describe actor faces/bodies and background pigment/ink separately, not tag names. Keep each observation concise.
CORRECTIONS IN THE SAME RESPONSE: Include corrections:[] when no grounded material defect is visible. For each confirmed defect, return {type,panel,subject,observed,expected,correction,materialImpact,impactReason}. Use the actual visible region and approved source; correction is a concrete local editing instruction preserving all correct content. Inspect ALL required areas now; no later analysis or second review will fill missing work. materialImpact is material only for a clear harmful mismatch, never hidden details, uncertain identity, a small coherent acting variation, or stylistic preference. Keep observations concise; do not repeat the full scenario. Report unknowns as uncertain, never invent compliance.
NATIVE PANEL FIDELITY: exactly ${plan.count} source panels, one-to-one. Preserve count, reading order, action, facts, causal progression, ending and dialogue. No additional frames, inserted beats or unscripted speech are authorized. Purposeful scripted silence remains silent; never demand speech to fill a panel. Allow source-grounded staging within the same moment and harmless coherent acting variation, without merging or splitting source panels, omitting source action, changing the premise or replacing the payoff. Expected speech is withheld here; independent transcription is checked against the original panel-by-panel dialogue manifest afterwards.
${plan.panels.some(p=>source.panels[p.sourcePanel-1].style==='GEKIGA')?"GEKIGA OBSERVATION: in assigned GEKIGA frames inspect each visible actor, including calm, smiling and bespectacled faces. Describe actual eye/iris proportions, eyelid thickness, constructed nose/cheek/jaw planes and facial pen shading separately from background/clothing detail. Locate dense intersecting fine strokes, visible gaps and changes in line density following the facial planes; broad flat black or colored shadow patches, smooth gradients, a few thin cheek lines or costume hatching do not establish this strong gekiga recipe. Black may support local occlusions but must not replace the main hatched shading. State which visible face still has enlarged anime eyes or a simplified nose, if any; never replace this check with generic praise such as detailed, realistic or finely shaded. These unchanged face constructions are a style mismatch even when the illustration is attractive or the background is richly inked. A pass requires visible facial construction evidence, not anger, costume texture, one successful actor or a restatement of the prompt. Preserve scripted age and emotion; do not demand anger or wrinkles. If a face is too small/hidden to inspect, report that limit rather than inventing compliance.\n":''}
${source.colorMode==='monochrome'?MONOCHROME_RENDERING_LOCK_COMPACT+'\n'+MONOCHROME_REFERENCE_SEPARATION+'\n'+MONOCHROME_QA_RULE+'\n':''}EXPECTED PANEL STYLES: ${JSON.stringify(plan.panels.map((p,i)=>({panel:i+1,style:source.panels[p.sourcePanel-1].style||'REFERENCE'})))}
${WARDROBE_CONTINUITY_QA_CONTRACT}
${OUTFIT_SCOPE_CONTRACT}
EXPECTED OUTFIT SCOPES: ${JSON.stringify({global:readExplicitOutfit(source.context),castNames:[...new Set(expectedCast.flatMap(entry=>entry.names))],panels:plan.panels.map((p,i)=>({panel:i+1,outfit:readExplicitOutfit(source.panels[p.sourcePanel-1].text)}))})}
NATIVE WARDROBE OBSERVATION: add top-level wardrobe_observation:{status:"pass|fail|uncertain",evidence:"Japanese observations of actual garments, visible regions, applicable approved outfit scopes and cross-panel continuity",issues:[]}. Inspect every visible actor against the applicable explicit Outfit, even when that actor appears only once, and recurring actors against each other. Clothing mentioned among identity features is not an outfit-compliance check. Use the independent physical_bodies clothing features and actual pixels; never rewrite an observed garment as the requested garment. A normal/chibi/painted rendering change, coherent folds, lighting, camera reversal, or hidden clothing is not a clothing defect. For a confirmed difference each issue contains panel,subject,reason,material_impact (none|minor_variation|material|uncertain),impact_reason,wardrobe_evidence. Use basis=cross_panel and the shared two-panel evidence above for continuity; add first_body_id and later_body_id from those panels' blind inventory and bind both to the same named actor. For a single-panel explicit-outfit conflict use basis=approved_outfit, difference_kind=component_state, expected_scope=global|panel, expected_quote containing ONLY the applicable named actor clause(s), copied exactly and joined with 。 (final sentence terminator optional); for an unscoped shared outfit copy that instruction. Never quote other actors or the whole multi-actor scope, later_body_id, component,later_location,later_state,later_visibility,matched_features,scripted_change. Do not infer a garment's hidden lower part from a generic uniform label. For an applicable panel override quote that panel's instruction, not the displaced global outfit. Resolve named/role scope only from the source; if applicability is ambiguous, mark uncertain rather than inventing an assignment. Unused evidence fields are null. No explicit outfit and no repeated visible clothing means assess the available reference or state the observation limit. status=fail only for a grounded material difference, uncertain for unresolved required clothing, otherwise pass. Report visible compliant scripted costume changes in evidence with issues:[]; do not turn them into repair requests. An issue with unresolved visibility, identity, scope or scripted change remains unverified. An empty issues list alone does not establish a pass.
BODY-BOUND STYLE OBSERVATIONS: each panel evidence also requires style_observation:{medium,status,evidence,actors:[{body_id,medium,status,face_visibility,face,shading}]}. medium is the actual observed rendering tag (NORMAL|${Object.keys(COMPACT_EMOTION_STYLES).join('|')}|REFERENCE|mixed|uncertain), never copied from the expected tag. status is pass|fail|uncertain. The outer evidence describes the visible setting/clothing medium in Japanese, not merely a verdict. actors must contain exactly one record for EVERY body_id in that panel's independent physical_bodies census, including glasses, rear heads and partial bodies; do not borrow a successful actor or another crop's observation. face_visibility is visible|hidden|too_small|uncertain. style_observation.evidence and each actor face/shading must be separate Japanese observations of at least 8 characters, describing visible medium, facial construction or shading marks; state the specific observation limit when uncertain. Visible faces require concrete evidence for both; an attractive background or one matching actor does not establish all actors. Inspect neighboring panels independently for medium leakage, including unwanted facial pen hatching in a watercolor panel. Hidden, tiny or ambiguous faces are uncertain, never a style defect or a reason for another paid generation. Fail only a clearly observed material mismatch; minor coherent variation is allowed. These model observations support review, not a guarantee of pixel-level correctness.
VIEW OBSERVATION: Every panel evidence includes view:{elevation:"high|low|eye_level|uncertain",gaze:"in_scene|at_viewer|no_visible_eyes|uncertain",evidence:"concrete visible projection cues and gaze targets, in Japanese"}. Choose one value per enum from the pixels, not the plan. high/low describes physical projection relative to the subjects, not a tilted border, a tall character or background alone. For a hands-only insert judge the camera above/below the action surface. Inspect all visible eyes: at_viewer if any actor clearly looks into the page-reader lens; in_scene only if the visible gazes have in-scene targets; no_visible_eyes for rear heads or hand close-ups; uncertain for ambiguous direction. A face shown frontally does not by itself prove camera eye contact. Reading-flow accents are optional: do not mark a vivid coherent scene defective merely because it lacks an obvious guiding line.
CAST INSTANCE INVENTORY: Include cast_instances in each panel evidence for every required name in ${JSON.stringify(expectedCast)}. Each record: {name,status:"ok|defect|uncertain",evidence,instances:[{body_id,location,feature_indices:[two or more distinct zero-based indices of visible identity cues in that same body's features]}]}. Count distinct physical bodies, including partial rear heads and background actors; Camera/Action/speech mentions refer to the SAME body. A foreground shoulder and the same actor in the background are TWO instances. A legitimate crop or hidden face is not absence; mark uncertainty when identity cannot be established. Zero requires an evidence string describing visible absence. Only explicitly listed replicaNames may have tiny contained representations excluded from physical count. Never exclude a full-size body as a replica. Count is computed locally from instances.length; do not return observed_count. These records are observations, not a restatement of the required count.
BODY IDENTITY COVERAGE: Assess EVERY independent physical_bodies ID, including after all required cast names have a match. Never stop after the first identity match: another separate matching body belongs in that actor's instances. For each body not assigned to cast_instances, return exactly one body_dispositions entry: {body_id,kind:"non_cast|uncertain",feature_indices:[two or more distinct zero-based indices into that same census body's features],evidence:"visible reason for the identity disposition"}. Use non_cast only for grounded ordinary background people with at least two observed distinguishing features and explain why they are not a required actor; background position, small size, clothing alone or already having found the named actor is not sufficient. Possible named-cast identity, rear views, crops and occlusion without enough cues remain uncertain, not a confirmed duplicate. Do not force ordinary background people into the named cast or invent hidden bodies. Never list a body in both cast_instances and body_dispositions, and do not invent IDs. Use [] only when every census body is already assigned. Unresolved or unexamined bodies make anatomy uncertain; preserve any independently confirmed duplicate or anatomy failure.
Title required EXACTLY ${JSON.stringify(extractScenarioTitle(source.scenario))}. Footer expected exact text: ${JSON.stringify(expectedFooter)} (null means no footer). Transcribe observed lettering separately; never complete unreadable lettering from this expected text. Missing required title/credits is fail; unreadable is uncertain. Requested labels are NOT visual evidence. status=warning when a concrete material failure is confirmed, even if another check is uncertain. Otherwise status=pass only when count matches, all required checks pass, and complete visual evidence exists; unresolved required checks mean unverified. Optional breakout absence alone does not change status. Do not suggest paid regeneration for a minor coherent variation. SOURCE (expected speech withheld; transcribe only the attached crops): ${blind({context:source.context,castList:source.castList,panels:source.panels})}\nPLAN: ${blind({count:plan.count,layout:plan.layout,panels:plan.panels})}`;
}

// Turn only a grounded failing check into an edit. Missing observations,
// uncertain findings and coherent minor variations never authorize generation.
export function experimentalRepairIssues(review, plan) {
  if(review?.validationErrors?.length||!Array.isArray(review?.corrections))return [];
  const category={panel_layout:'readingOrder',cast_count:'anatomy',anatomy:'anatomy',object_geometry:'anatomy',
    prop_ownership:'story',camera_geometry:'camera',bubble_text:'readingOrder',bubble_order:'readingOrder',
    title_text:'pageText',extra_text:'pageText',story_integrity:'story',wardrobe_continuity:'story',art_style:'style'};
  return review.corrections.filter(issue=>issue?.materialImpact==='material'&&review[category[issue.type]]==='fail'
    &&(issue.panel===null||Number.isInteger(issue.panel)&&issue.panel>=1&&issue.panel<=plan.count)
    &&['subject','observed','expected','correction','impactReason'].every(key=>typeof issue[key]==='string'&&issue[key].trim())
    &&issue.observed.trim()!==issue.expected.trim()
  ).flatMap(issue=>{
    const result={type:issue.type,panel:issue.panel,subject:issue.subject,materialImpact:issue.materialImpact,
      impactReason:issue.impactReason,reason:`Observed: ${issue.observed}; expected: ${issue.expected}.`,correction:issue.correction};
    if(issue.type==='art_style') {
      const observed=review.evidence?.find(entry=>entry.panel===issue.panel)?.style_observation;
      const actor=observed?.actors?.find(entry=>entry.status==='fail'&&entry.face_visibility==='visible');
      if(!actor)return [];
      result.styleEvidence={status:'defect',materialImpact:'requested_medium_missing',visibleRegion:'face',
        expectedStyle:issue.expected,observedStyle:observed.medium,subject:issue.subject,location:`panel ${issue.panel}`,
        observed:actor.face+' '+actor.shading};
    }
    return [result];
  });
}

function inspectIndependentBodyGaze(bodies, incompleteCensus, structured = false) {
  const text=value=>typeof value==='string'&&value.trim().length>=8;
  const point=value=>Array.isArray(value)&&value.length===2&&value.every(n=>Number.isFinite(n)&&n>=0&&n<=1);
  const basis=gaze=>[gaze?.eye_evidence,gaze?.face_direction].map(value=>typeof value==='string'?value.trim():'').join('|');
  const observations=bodies.map(body=>{
    const gaze=body.gaze;
    const uncertain={body:body.id,direction:'uncertain'};
    if(!gaze||!text(gaze.eye_evidence)) return uncertain;
    if(gaze.eye_visibility==='not_visible') {
      const concrete=structured ? ['closed_eyes','rear_head','outside_frame','non_face_crop'].includes(gaze.visibility_basis)&&gaze.pupil_placement===null : /後頭部|後ろ姿|背面|頭[^。\n]*(?:コマ外|画角外)|(?:手|足|腕|脚)[^。\n]*(?:だけ|のみ)|rear|back of (?:the )?head|(?:head|face)[^.;]*(?:outside|cropped)|only[^.;]*(?:hand|arm|leg|foot)/i.test(gaze.eye_evidence);
      return concrete&&gaze.direction==='no_visible_eyes'&&gaze.eye_position===null
        ?{body:body.id,direction:'no_visible_eyes'}:uncertain;
    }
    if(gaze.eye_visibility!=='visible'||!point(gaze.eye_position)||!text(gaze.face_direction)
      ||(structured ? gaze.visibility_basis!=='visible_eyes'||!text(gaze.pupil_placement)
        : !/瞳|虹彩|黒目|眼球|pupil|iris/i.test(gaze.eye_evidence)||!/瞼|まぶた|白目|eyelid|sclera/i.test(gaze.eye_evidence))) return uncertain;
    const [x,y,w,h]=body.bounds,[eyeX,eyeY]=gaze.eye_position;
    if(eyeX<x||eyeX>x+w||eyeY<y||eyeY>y+h
      ||bodies.filter(other=>other.gaze?.eye_visibility==='visible'&&basis(other.gaze)===basis(gaze)).length!==1) return uncertain;
    if(gaze.direction==='at_viewer'&&gaze.target===null&&(structured||/読者|カメラ|レンズ|紙面の外|viewer|camera|lens|out of (?:the )?page/i.test(gaze.eye_evidence))) {
      return {body:body.id,direction:'at_viewer',evidence:gaze.eye_evidence};
    }
    if(gaze.direction==='in_scene'&&typeof gaze.target?.description==='string'&&gaze.target.description.trim()&&point(gaze.target?.position)
      &&gaze.target.position.some((n,i)=>Math.abs(n-gaze.eye_position[i])>1e-6)) return {body:body.id,direction:'in_scene'};
    return uncertain;
  });
  const directions=observations.map(item=>item.direction);
  const direction=directions.includes('at_viewer')?'at_viewer'
    :incompleteCensus||directions.includes('uncertain')?'uncertain'
      :directions.includes('in_scene')?'in_scene':'no_visible_eyes';
  return {direction,observations};
}

export function validateExperimentalReview(review, plan) {
  if(review?.inspectionKind==='frame-geometry') {
    let frames=[];
    try {frames=orderObservedFrames(review.observedFrames);} catch { /* Ambiguous pixels cannot establish a count. */ }
    // A joined pair can be one closed rectangle: fewer candidates cannot prove
    // the page's total count. Only a validated excess establishes a mismatch.
    const excess=frames.length>plan.count&&frames.length===review.observedCount;
    return {inspectionKind:'frame-geometry',inspectionVersion:EXPERIMENTAL_INSPECTION_VERSION,status:excess?'warning':'unverified',
      observedCount:excess?frames.length:null,observedFrames:frames,evidence:[],
      readingOrder:'uncertain',camera:'uncertain',style:'uncertain',story:'uncertain',anatomy:'uncertain',pageText:'uncertain',
      breakout:plan.panels.some(p=>p.breakout)?'uncertain':'not_requested',pageEvidence:null,
      issues:[excess?`実画像で独立した矩形コマ枠を${frames.length}個検出しましたが、指定は${plan.count}コマです。画像を保持します。人物・台詞・画風は未検査です。`:'実画像の総コマ数を裏付ける境界記録が不十分です。枠の連結や検出漏れもあり得るため、画像を保持し、目視確認してください。']};
  }
  // A retained image may have no completed review. Normalize the root before
  // cast auditing so missing evidence stays unverified instead of aborting.
  review=review&&typeof review==='object'&&!Array.isArray(review)?{...review}:{};
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
  const styleChecks=[];
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
      } else if(view.elevation==='eye_level'||(review.inspectionVersion<6&&view.gaze==='at_viewer')) {
        review.camera='fail';
        review.issues=[...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ: ${view.elevation==='eye_level'?'アイレベル':'カメラ目線'}を観察。${view.evidence}`];
      } else if((view.elevation==='uncertain'||(review.inspectionVersion<6&&view.gaze==='uncertain'))&&review.camera!=='fail') review.camera='uncertain';
    }
    if(review.inspectionVersion>=3) {
      const bodies=observed[0].physical_bodies;
      const cueCount=body=>body.features.flatMap(v=>v.split(/[,、;；]/)).filter(v=>v.trim()).length;
      const validBody=body=>typeof body?.id==='string'&&body.id.trim()&&Array.isArray(body.bounds)&&body.bounds.length===4&&body.bounds.every(n=>Number.isFinite(n)&&n>=0&&n<=1)&&body.bounds[2]>0&&body.bounds[3]>0&&body.bounds[0]+body.bounds[2]<=1+1e-9&&body.bounds[1]+body.bounds[3]<=1+1e-9&&Array.isArray(body.features)&&body.features.length>0&&body.features.every(v=>typeof v==='string'&&v.trim());
      const bodyRecords=Array.isArray(bodies)?bodies:[];
      const trustedBodies=bodyRecords.filter(body=>validBody(body)&&bodyRecords.filter(other=>other?.id===body.id).length===1);
      const invalidBodies=!Array.isArray(bodies)||trustedBodies.length!==bodyRecords.length;
      if(review.inspectionVersion>=6) {
        const gaze=inspectIndependentBodyGaze(trustedBodies,invalidBodies,review.inspectionVersion>=10);
        const view=observed[0].view;
        if(view&&typeof view==='object') observed[0].view={...view,assessment_gaze:view.assessment_gaze??view.gaze,gaze:gaze.direction};
        if(gaze.direction==='at_viewer') review.camera='fail';
        else if(gaze.direction==='uncertain'&&review.camera!=='fail') review.camera='uncertain';
        const issues=gaze.observations.filter(item=>['at_viewer','uncertain'].includes(item.direction)).map(item=>
          `${i+1}コマ / ${item.body}: ${item.direction==='at_viewer'?`独立した瞳・瞼の観察でカメラ目線を確認。${item.evidence}`:'目の可視性・瞳と瞼・位置・対象の独立根拠が不足しており、視線は未確認です。'}`);
        if(invalidBodies) issues.push(`${i+1}コマ: 身体観察が不完全なため、除外された人物の視線は未確認です。`);
        review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),...issues])];
      }
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
      if(Array.isArray(plan.expectedCast)) {
        // Cast-to-body binding alone can silently omit a second physical body.
        // Account for the remaining census without treating a crowd as clones.
        const expectedNames=plan.expectedCast.filter(entry=>entry.panel===i+1).flatMap(entry=>entry.names);
        const namedCast=trustedCast.filter(actor=>expectedNames.includes(actor.name));
        const boundIds=new Set(namedCast.flatMap(actor=>actor.instances.map(instance=>instance.body_id)));
        const unboundBodies=trustedBodies.filter(body=>!boundIds.has(body.id));
        const dispositions=Array.isArray(observed[0].body_dispositions)?observed[0].body_dispositions:[];
        const invalidDisposition=namedCast.length!==trustedCast.length||dispositions.some(entry=>!unboundBodies.some(body=>body.id===entry?.body_id)
          ||dispositions.filter(other=>other?.body_id===entry?.body_id).length!==1);
        const unresolved=unboundBodies.filter(body=>{
          const matches=dispositions.filter(entry=>entry?.body_id===body.id),entry=matches[0];
          return matches.length!==1||entry.kind!=='non_cast'||!text(entry.evidence)
            ||!Array.isArray(entry.observed_features)||!entry.observed_features.length
            ||!entry.observed_features.every(feature=>typeof feature==='string'&&body.features.includes(feature))
            ||new Set(entry.observed_features.flatMap(feature=>feature.split(/[,、;；]/))
              .map(feature=>feature.normalize('NFKC').trim().toLowerCase()).filter(Boolean)).size<2;
        });
        if(invalidDisposition||unresolved.length) {
          if(review.anatomy!=='fail') review.anatomy='uncertain';
          const details=unresolved.length?unresolved.map(body=>body.id).join(', '):'身体IDの重複または対応範囲';
          review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ / ${details}: 独立して観察された身体の人物対応・背景人物としての根拠が未確認です。重複とは断定せず、人物検査を未確認にしています。`])];
        }
      }
    }
    if(review.inspectionVersion>=5) {
      const expected=Array.isArray(review.expectedStyles)?review.expectedStyles.filter(item=>item?.panel===i+1):[];
      const medium=expected.length===1?expected[0].style:null;
      const style=observed[0].style_observation;
      const assess=(entry,evidence)=>{
        if(!medium||!entry||!['pass','fail','uncertain'].includes(entry.status)||!text(evidence)
          ||typeof entry.medium!=='string'||(!Object.hasOwn(COMPACT_EMOTION_STYLES,entry.medium)&&!['NORMAL','REFERENCE','mixed','uncertain'].includes(entry.medium))) return 'uncertain';
        if(entry.status==='uncertain'||entry.medium==='uncertain') return 'uncertain';
        return entry.status==='fail'||(medium!=='REFERENCE'&&entry.medium!==medium)?'fail':'pass';
      };
      const checks=[assess(style,style?.evidence)];
      const bodies=observed[0].physical_bodies,actors=style?.actors;
      if(!Array.isArray(bodies)||!Array.isArray(actors)) checks.push('uncertain');
      else {
        if(actors.length!==bodies.length||actors.some(actor=>!bodies.some(body=>body.id===actor?.body_id))) checks.push('uncertain');
        for(const body of bodies) {
          const matches=actors.filter(actor=>actor?.body_id===body.id),actor=matches[0];
          checks.push(matches.length===1&&actor.face_visibility==='visible'&&text(actor.face)&&text(actor.shading)
            ?assess(actor,actor.face+' '+actor.shading):'uncertain');
        }
      }
      const verdict=checks.includes('fail')?'fail':checks.includes('uncertain')?'uncertain':'pass';
      styleChecks.push(verdict);
      if(verdict!=='pass') review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),`${i+1}コマ: ${verdict==='fail'?'指定画風と異なる媒体または顔の描法が観察されています。':'人物ごとの顔・陰影または媒体との対応を確認できず、画風は未確認です。'}`])];
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
  if(review?.inspectionVersion>=5) {
    review.style=styleChecks.includes('fail')?'fail':styleChecks.length===plan.count&&styleChecks.every(value=>value==='pass')?'pass':'uncertain';
    if(review.status==='warning'&&!keys.some(key=>review[key]==='fail')) review.status='unverified';
  }
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
  if(review.inspectionVersion>=7) {
    const wardrobe=review.wardrobe_observation;
    const authority=review.expectedOutfits;
    const validAuthority=authority&&typeof authority.global==='string'&&Array.isArray(authority.panels)
      &&authority.panels.length===plan.count&&plan.panels.every((_,i)=>authority.panels.filter(entry=>entry?.panel===i+1&&typeof entry.outfit==='string').length===1);
    let uncertain=!validAuthority||!wardrobe||!['pass','fail','uncertain'].includes(wardrobe.status)
      ||!text(wardrobe.evidence)||!Array.isArray(wardrobe.issues)||wardrobe.status==='uncertain';
    let material=false;
    const wardrobeIssues=[];
    const bodyBound=(panel,bodyId,subject)=>{
      const observation=Array.isArray(review.evidence)?review.evidence.find(entry=>entry.panel===panel):null;
      const actors=observation?.cast_instances?.filter(actor=>actor.name===subject);
      return actors?.length===1&&actors[0].status==='ok'&&actors[0].instances?.length===1
        &&actors[0].instances[0].body_id===bodyId&&observation.physical_bodies?.some(body=>body.id===bodyId);
    };
    for(const issue of Array.isArray(wardrobe?.issues)?wardrobe.issues:[]) {
      const evidence=issue?.wardrobe_evidence;
      const bound=bodyBound(issue?.panel,evidence?.later_body_id,issue?.subject)
        &&(evidence?.basis==='approved_outfit'||evidence?.basis==='cross_panel'&&bodyBound(evidence.first_panel,evidence.first_body_id,issue.subject));
      const grounded=groundWardrobeIssue({type:'wardrobe_continuity',panel:issue?.panel,subject:issue?.subject,reason:issue?.reason,
        materialImpact:issue?.material_impact,impactReason:issue?.impact_reason},evidence,'experimental-manga',validAuthority?authority:null);
      if(!bound||!text(issue?.reason)||!text(issue?.impact_reason)||grounded.type==='unverified'||!['none','minor_variation','material'].includes(issue?.material_impact)) {
        uncertain=true;continue;
      }
      if(isMaterialImageQualityIssue(grounded)) {material=true;wardrobeIssues.push(`${issue.panel}コマ / ${issue.subject}: 衣装不一致。${grounded.reason}`);}
    }
    if(wardrobe?.status==='fail'&&!material) uncertain=true;
    if(material) review.story='fail';
    else if(uncertain&&review.story!=='fail') review.story='uncertain';
    if(uncertain) wardrobeIssues.push('衣装の指定・可視部位・人物対応またはコマ間の観察根拠が不足しているため、衣装は未確認です。');
    review.issues=[...new Set([...(Array.isArray(review.issues)?review.issues:[]),...wardrobeIssues])];
  }
  const safeIssues=Array.isArray(review?.issues)&&review.issues.every(issue=>typeof issue==='string'&&issue.trim());
  if(!safeIssues) validationErrors.push('issues: invalid');
  if(validationErrors.length) {
    const clean=value=>value==null?null:typeof value==='string'?sanitizeErrorMessage(value):JSON.stringify(value,(_key,item)=>typeof item==='string'?sanitizeErrorMessage(item):item);
    const structured=value=>value==null?null:typeof value==='object'?JSON.parse(clean(value)):clean(value);
    return {status:'unverified',observedCount:Number.isInteger(review?.observedCount)?review.observedCount:null,
      ...(Number.isInteger(review?.inspectionVersion)?{inspectionVersion:review.inspectionVersion}:{}),
      ...(Object.hasOwn(review||{},'expectedPageText')?{expectedPageText:Array.isArray(review.expectedPageText)?review.expectedPageText.map(clean):null}:{}),
      ...(Object.hasOwn(review||{},'expectedStyles')?{expectedStyles:structured(review.expectedStyles)}:{}),
      ...(Object.hasOwn(review||{},'expectedOutfits')?{expectedOutfits:structured(review.expectedOutfits)}:{}),
      ...(Object.hasOwn(review||{},'wardrobe_observation')?{wardrobe_observation:structured(review.wardrobe_observation)}:{}),
      ...Object.fromEntries([...keys,'breakout','pageEvidence'].map(k=>[k,clean(review?.[k])])),
      evidence:Array.isArray(review?.evidence)?review.evidence.slice(0,16).map(e=>({panel:Number.isInteger(e?.panel)?e.panel:null,center:Array.isArray(e?.center)?e.center.filter(Number.isFinite).slice(0,2):null,...Object.fromEntries(['camera','style','story','anatomy','breakout'].map(k=>[k,clean(e?.[k])])),style_observation:structured(e?.style_observation),view:structured(e?.view),cast_instances:structured(e?.cast_instances),body_dispositions:structured(e?.body_dispositions),physical_bodies:structured(e?.physical_bodies),dialogue:Array.isArray(e?.dialogue)?e.dialogue.map(clean):null})):[],
      validationErrors:[...new Set(validationErrors)],issues:safeIssues&&review.issues.length?[...new Set(review.issues.map(clean))]:['画像検査の形式または各コマの観察根拠が不十分です。目視確認が必要です。']};
  }
  const checks=keys.map(k=>review[k]);
  const denseStrips=[5,6,7,8].includes(plan.count)&&Array.isArray(review.observedFrames)
    &&review.observedFrames.length===plan.count
    &&review.observedFrames.every(frame=>frame.bounds[2]>=.75&&frame.bounds[2]>frame.bounds[3]*1.42);
  if(denseStrips) review.issues=[...new Set([...review.issues,`${plan.count}コマがすべて横長の全幅帯として描かれ、各コマの文字と演技を読む高さが不足しています。画像を保持し、配置を目視確認してください。`])];
  // Breakout is optional staging, not an acceptance gate. Harmful overlap or
  // disconnected anatomy still fails the required reading/anatomy checks.
  // A supported failure survives uncertainty in another check. Invalid
  // observation records have already returned unverified above.
  const status=denseStrips||checks.includes('fail')||(Number.isInteger(review.observedCount)&&review.observedCount!==plan.count)||review.status==='warning'?'warning'
    :!Number.isInteger(review.observedCount)||review.status==='unverified'?'unverified':checks.every(v=>v==='pass')?'pass':'unverified';
  return {...review,status};
}

// Independent inspections start together under the caller's shared QA budget.
export async function reviewExperimentalCandidatePair(candidate, original, reviewCandidate, signal, {onProgress=()=>{}}={}) {
  cancelled(signal);
  const previous=original&&validateExperimentalReview(original.review,original.plan);
  const refresh=original&&(previous.inspectionVersion!==EXPERIMENTAL_INSPECTION_VERSION||previous.validationErrors?.length);
  const inspect=image=>withImageReviewCancellation(workSignal=>reviewCandidate(image,workSignal,{
    candidateLabel:image===candidate?'今回の画像':'以前の画像',
  }),signal);
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

function colorLayoutContext(input) {
  // Keep image strings by reference; no duplicate serialized image payloads.
  return {revision:EXPERIMENTAL_PROMPT_REVISION,providerFamily:input.providerFamily??PROMPT_PROVIDER_FAMILIES.GEMINI,scenario:input.scenario,castList:input.castList,
    scenarioMode:input.scenarioMode,userDirection:input.userDirection,referenceContext:input.referenceContext,
    mosaicCopyrightedCharacters:input.mosaicCopyrightedCharacters,showWatermarks:input.showWatermarks,
    imageEngineLabel:input.imageEngineLabel,scenarioModelLabel:input.scenarioModelLabel,
    referenceImages:input.referenceImages?.slice(),backgroundImage:input.backgroundImage,backgroundEnabled:input.backgroundEnabled};
}

export async function prepareExperimentalManga(input, requestPlan, {colorOnlyPrepared=null}={}) {
  if(input.enabled!==true) fail('実験スイッチがOFFです。');
  cancelled(input.signal);
  normalizePromptProviderFamily(input.providerFamily??PROMPT_PROVIDER_FAMILIES.GEMINI);
  const recovered=await withScenarioBalloonLayoutRecovery({...input,scenarioMode:'experimental-manga'},readExperimentalSource,
    (prompt,_images,_system,onProgress,{signal})=>requestPlan(prompt,signal),input.onProgress,input.signal);
  input={...input,scenario:recovered.scenario};
  const source=recovered.value;
  const context=colorLayoutContext(input);
  const previous=colorOnlyPrepared;
  const sameInputs=previous?.colorLayoutContext && Object.entries(context).every(([key,value])=>
    key==='referenceImages' && Array.isArray(value)
      ? Array.isArray(previous.colorLayoutContext[key]) && value.length===previous.colorLayoutContext[key].length
        && value.every((image,index)=>image===previous.colorLayoutContext[key][index])
      : Object.is(value,previous.colorLayoutContext[key]));
  let plan;
  if(sameInputs && ['scenario','castList','userDirection'].every(key=>previous.source?.[key]===source[key])
    && ['color','monochrome'].includes(previous.source?.colorMode)) {
    try {
      const candidate=validateExperimentalPlan(previous.plan,source);
      // Reconstruct the stored full/compact form independently of the new request budget.
      // A smaller current cap must reject locally, never spend another layout request.
      const originalPrompt=buildExperimentalImagePrompt(candidate,{...source,colorMode:previous.source.colorMode},{...input,colorMode:previous.source.colorMode,promptMaxChars:previous.prompt?.length});
      if(previous.prompt===originalPrompt) plan=candidate;
    } catch {
      // A legacy or invalid plan uses the ordinary planning path, never a bypass.
    }
  }
  if(!plan) {
    const response=await requestPlan(buildExperimentalPlanPrompt(source,input),input.signal);
    cancelled(input.signal);
    plan=validateExperimentalPlan(parseExperimentalPlan(response),source);
  }
  const prompt=buildExperimentalImagePrompt(plan,source,input);
  assertImagePromptBudget(prompt,input.promptMaxChars);
  return {source,plan,prompt,colorLayoutContext:context};
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
  if(!input.prepared) input={...input,scenario:prepared.source.scenario};
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
  let review={status:'skipped',issues:[]};
  const reviewStarted=performance.now();
  let diagnostic={stage:'validation'};
  const qualityOutcome=await runPageImageQuality({kind:'experimental-manga',count:plan.count},{
    mode:'experimental-manga',allowRepair:false,reviewOnly:input.reviewOnly===true,originalCandidate:image,originalPrompt:prompt,
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
