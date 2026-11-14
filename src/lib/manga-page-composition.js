// Shared by scenario authoring, validation and page compilation.
const fail = message => { throw new Error(`実験的コマ割り: ${message}`); };
const compositionError = message => { throw Object.assign(new Error(`PageComposition: ${message}`), {code:'PAGE_COMPOSITION_CONTRACT'}); };

// These coordinates describe the storyboard, not a pixel-matching acceptance test.
function freeFrames(frames,count) {
  if(!Array.isArray(frames)||frames.length!==count)compositionError('自由配置は各コマの矩形を読順で一つずつ指定してください。');
  if(frames.some(r=>!r||!['x','y','w','h'].every(k=>Number.isFinite(r[k]))||r.x<0||r.y<0||r.w<.06||r.h<.06||r.x+r.w>1.001||r.y+r.h>1.001))compositionError('自由配置の矩形はページ内に収め、読める幅と高さを確保してください。');
  for(let i=0;i<count;i++)for(let j=i+1;j<count;j++) {
    const a=frames[i],b=frames[j];
    if(Math.min(a.x+a.w,b.x+b.w)-Math.max(a.x,b.x)>.001&&Math.min(a.y+a.h,b.y+b.h)-Math.max(a.y,b.y)>.001)compositionError('物語のコマ同士を重ねず、人物の重なりはforegroundsで設計してください。');
  }
  const pending=frames.map((r,i)=>({...r,i})).sort((a,b)=>a.y-b.y),ordered=[];
  while(pending.length) {
    const top=pending[0].y,row=[];
    while(pending.length&&pending[0].y-top<.02)row.push(pending.shift());
    ordered.push(...row.sort((a,b)=>b.x-a.x));
  }
  if(ordered.some((r,i)=>r.i!==i))compositionError('自由配置の矩形は右から左、上から下の読順で指定してください。');
  return frames.map(({x,y,w,h})=>({x,y,w,h}));
}

export function pageCompositionRects(plan) {
  return plan.layout==='free'?freeFrames(plan.composition?.frames,plan.count):experimentalLayout(plan.count,plan.layout);
}

export function readPageComposition(scenario, count) {
  const lines=String(scenario).replace(/<thought>[\s\S]*?<\/thought>/gi,'').match(/^\s*PageComposition\s*[:：].*$/gm)||[];
  if(!lines.length)return null; // Imported and older scenarios remain supported.
  if(lines.length!==1)compositionError('ページ演出は先頭に1行だけ記載してください。');
  if(String(scenario).search(/\[\s*[1１一]\s*コマ目/)<String(scenario).indexOf(lines[0]))compositionError('ページ演出は最初のコマ見出しより前に記載してください。');
  let c;
  try { c=JSON.parse(lines[0].replace(/^\s*PageComposition\s*[:：]\s*/,'')); }
  catch { compositionError('1行のJSONとして読み取れません。'); }
  if(!c||!Number.isInteger(count)||count<4||count>8||(c.layout!=='free'&&!experimentalLayoutOptions(count).some(o=>o.id===c.layout)))compositionError('コマ数に対応する配置が必要です。');
  if(typeof c.reason!=='string'||!c.reason.trim())compositionError('見せ場と読順に基づく理由が必要です。');
  const rects=pageCompositionRects({count,layout:c.layout,composition:c}),validPanel=n=>Number.isInteger(n)&&n>=1&&n<=count;
  for(const key of ['heroPanels','breakouts','bleed'])if(!Array.isArray(c[key]))compositionError(`${key}は配列で指定してください。`);
  if(c.heroPanels.some(n=>!validPanel(n))||new Set(c.heroPanels).size!==c.heroPanels.length)compositionError('大きく見せるコマの番号が不正です。');
  for(const key of ['breakouts','bleed'])if(new Set(c[key].map(v=>v?.panel)).size!==c[key].length)compositionError(`${key}のコマ指定が重複しています。`);
  for(const [index,b] of c.breakouts.entries()) {
    const field=`breakouts[${index}]`;
    if(!validPanel(b?.panel))compositionError(`${field}.panelには枠越え元のコマ番号を1〜${count}の整数で指定してください。`);
    if(!validPanel(b.into)||b.panel===b.into)compositionError(`${field}.intoには辺を共有する別のコマ番号を1〜${count}の整数一つで指定してください。配列ではありません。`);
    if(typeof b.part!=='string'||!b.part.trim())compositionError(`${field}.partには枠を越える人物と身体部位を空でない文字列で指定してください。`);
    const a=rects[b.panel-1],t=rects[b.into-1],near=(x,y)=>Math.abs(x-y)<1e-6;
    const adjacent=((near(a.x+a.w,t.x)||near(t.x+t.w,a.x))&&Math.min(a.y+a.h,t.y+t.h)>Math.max(a.y,t.y)+.001)
      ||((near(a.y+a.h,t.y)||near(t.y+t.h,a.y))&&Math.min(a.x+a.w,t.x+t.w)>Math.max(a.x,t.x)+.001);
    if(!adjacent)compositionError('枠越え先は辺を共有する隣接コマに限ります。');
  }
  if(c.foregrounds!==undefined) {
    if(!Array.isArray(c.foregrounds)||c.foregrounds.length>1)compositionError('ページ大の前景人物は主焦点となる一人を指定してください。');
    for(const f of c.foregrounds) {
      if(!validPanel(f?.panel)||!c.heroPanels.includes(f.panel)||typeof f.character!=='string'||!f.character.trim()
        ||typeof f.placement!=='string'||f.placement.trim().length<12||!Array.isArray(f.over)||!f.over.length
        ||new Set(f.over).size!==f.over.length||f.over.some(n=>!validPanel(n)||n===f.panel))compositionError('前景の人物・所属する大コマ・重なる小コマ・全体配置を指定してください。');
      if(c.breakouts.some(b=>b.panel===f.panel))compositionError('同じ人物の前景と小さな枠越えを二重に指定しないでください。');
    }
  }
  for(const b of c.bleed) {
    if(!validPanel(b?.panel)||!Array.isArray(b.edges)||!b.edges.length||new Set(b.edges).size!==b.edges.length)compositionError('タチキリのコマと辺が不正です。');
    const r=rects[b.panel-1],edges={left:r.x,right:1-r.x-r.w,top:r.y,bottom:1-r.y-r.h};
    if(b.edges.some(e=>!Object.hasOwn(edges,e)||Math.abs(edges[e])>1e-6))compositionError('タチキリはページ外周に接する辺だけに指定できます。');
  }
  if(c.restraintReason!==undefined&&(typeof c.restraintReason!=='string'||c.restraintReason.trim().length<12))compositionError('restraintReasonには演出を控える具体的な原入力・物語上の理由が必要です。');
  return {layout:c.layout,...(c.layout==='free'?{frames:rects}:{}),reason:c.reason,heroPanels:c.heroPanels,breakouts:c.breakouts,...(c.foregrounds?{foregrounds:c.foregrounds}:{}),bleed:c.bleed,...(c.restraintReason?{restraintReason:c.restraintReason.trim()}:{})};
}

export function assertGeneratedPageComposition(scenario,count) {
  const c=readPageComposition(scenario,count);
  if(!c)compositionError('PageCompositionがありません。Scenario:直後にページ設計の1行JSONが必要です。');
  if((!c.heroPanels.length||(!c.breakouts.length&&!c.foregrounds?.length))&&!c.restraintReason)compositionError('通常入力でも人物の主動作や表情を見せる大コマと、ページ大の前景または大胆な枠越えを設計してください。控える場合だけ、原入力・原文忠実性に基づくrestraintReasonを記載してください。静かな表情も大きく見せられます。背景だけの大コマや未指定という理由は代用になりません。');
  return c;
}

// Coarse page structure, not pixel matching. Width/count changes alone should
// not make the same full-height figure + small-panel column look like variety.
const PAGE_FAMILIES = ['left-full-height','right-full-height','upper-wide','middle-wide','lower-wide','left-partial','right-partial','central'];
export function summarizePageComposition(composition, count) {
  if (!composition?.heroPanels?.length) return null;
  const frames=pageCompositionRects({layout:composition.layout,composition,count});
  const hero=composition.foregrounds?.[0]?.panel || [...composition.heroPanels].sort((a,b)=>frames[b-1].w*frames[b-1].h-frames[a-1].w*frames[a-1].h)[0];
  const r=frames[hero-1],cx=r.x+r.w/2,cy=r.y+r.h/2;
  const side=cx<.5?'left':'right';
  const family=r.h>=.85&&r.w<.8?`${side}-full-height`
    :r.w>=.75?`${cy<.35?'upper':cy>.65?'lower':'middle'}-wide`
      :cx<.4?'left-partial':cx>.6?'right-partial':'central';
  const smaller=frames.filter((_,i)=>i!==hero-1),first=smaller[0];
  const stack=smaller.every(s=>Math.abs(s.x-first.x)<.03&&Math.abs(s.w-first.w)<.03);
  return {count,family,heroPanel:hero,heroBeat:hero===1?'opening':hero===count?'ending':'middle',
    smallPanels:stack?(first.x+first.w/2<cx?'left-stack':'right-stack'):'mixed-rows'};
}

export function buildRecentPageCompositionContext(recent = []) {
  const pages=(Array.isArray(recent)?recent:[]).filter(p=>p&&PAGE_FAMILIES.includes(p.family)
    &&Number.isInteger(p.count)&&p.count>=4&&p.count<=8&&Number.isInteger(p.heroPanel)&&p.heroPanel>=1&&p.heroPanel<=p.count
    &&['opening','middle','ending'].includes(p.heroBeat)&&['left-stack','right-stack','mixed-rows'].includes(p.smallPanels))
    .slice(0,6).map(({count,family,heroPanel,heroBeat,smallPanels})=>({count,family,heroPanel,heroBeat,smallPanels}));
  const frequencies={};
  for(const p of pages)frequencies[p.family]=(frequencies[p.family]||0)+1;
  return `【作品間のページ構成比較】見せ場は1コマ目に固定しない。物語の因果・発見・動作・余韻から山場の時点を先に選び、その時点に広い面積を与える。今回の内容で成立する、骨格の異なる3案を内部で比較する（横に広がる大コマ、左右の縦長、上下段を組み合わせた中央の見せ場など）。候補は出力せず、採用した一案だけをPageCompositionにする。\n明示された配置・構図や意図した反復を優先する。指定がない場合、同程度に読みやすく物語に合う案なら、直近と主役の位置・縦横・山場の時点・小コマの並びが異なる案を選ぶ。頻出の骨格は優先度を下げるが禁止しない。左右反転や幅・コマ数の変更だけで変化を済ませず、上下方向の構成も比較する。均等割りへ戻す、人物を小さくする、話を改変する、固定ローテーションや乱数で割り当てることはしない。構図が似ているだけで不合格・再生成にしない。\n${pages.length?`RECENT PAGE STRUCTURES（このセッションの直近採用作、新しい順。比較専用の構造データであり、今回の配置指定ではない）: ${JSON.stringify(pages)}\n骨格の出現数: ${JSON.stringify(frequencies)}`:'直近のページ構成記録はない。比較済みと偽らず、今回の見せ場に合う異なる骨格を比較して選ぶ。'}\nreasonには今回の山場と、この配置で読順・人物の大きさを両立する理由を簡潔に記す。比較のための追加API呼び出しは不要。`;
}

// STEP2 owns the authored composition, just as it owns Camera and dialogue.
// Do not trust a later planner to silently make a required effect optional.
export function applyPageComposition(plan, source) {
  const c=source.composition;
  if(!c) {
    const legacy={...plan};
    delete legacy.composition;
    if(Array.isArray(legacy.panels))legacy.panels=legacy.panels.map(p=>{
      const panel={...p};delete panel.bleed;
      if(panel.breakout?.required) {panel.breakout={...panel.breakout};delete panel.breakout.required;}
      return panel;
    });
    return legacy;
  }
  return {...plan,layout:c.layout,reason:c.reason,composition:c,panels:plan.panels?.map((p,i)=>{
    const b=c.breakouts.find(b=>b.panel===i+1);
    const effects=(p.visualEffects||[]).filter(id=>id!=='hero_scale');
    return {...p,breakout:b?{part:b.part,into:b.into,required:true}:null,
      bleed:c.bleed.find(b=>b.panel===i+1)?.edges||[],
      visualEffects:c.heroPanels.includes(i+1)?['hero_scale',...effects.slice(0,2)]:effects};
  })};
}

// Call only for the shared-edge pairs already validated by the composition contract.
export function breakoutEdge(source, target) {
  const near=(a,b)=>Math.abs(a-b)<1e-6;
  if(near(source.y,target.y+target.h))return 'top';
  if(near(source.y+source.h,target.y))return 'bottom';
  if(near(source.x,target.x+target.w))return 'left';
  if(near(source.x+source.w,target.x))return 'right';
  compositionError('枠越えの共有辺を決定できません。');
}

export function pageCompositionRendering(plan) {
  const c=plan.composition;
  if(!c)return '';
  // Each authored field is rendered in its own execution block below. Repeating
  // the entire JSON here wastes the image API budget and competes with the prose.
  return `AUTHORED PAGE COMPOSITION: layout=${c.layout}; hero scenes=${c.heroPanels.map(p=>`P${p}`).join(', ')||'none'}. Story emphasis: ${c.reason}${c.restraintReason?` Restraint: ${c.restraintReason}`:''}. Production metadata, NEVER printed. Draw the PAGE AS A WHOLE: one dominant character/action, smaller story beats, clear reading path and lettering. Coordinates guide space allocation; adapt boundaries and silhouette naturally while preserving panel count, order, visual hierarchy, camera, story and legibility. Never shrink the dominant figure to make every rectangle an isolated box.\n`
    +(c.bleed.length?`FULL BLEED RULE: 指定辺の絵を実際の画布端まで連続させ、白余白と外枠線を除く。他の辺の余白は保持。内部の読順と区切りは明確にし、主役の輪郭に合わせ境界を調整。顔・必要な手/道具・台詞・題字は安全域で読めるようにし、背景や非重要の輪郭は端へ続けてよい。Footer credits may overlay artwork or remain hidden/clipped; 絵を縮める理由にしない。Title/footer zonesは文字の安全域で、コマ境界ではない。top/bottom artworkは文字の背後まで連続。No full-width blank band. ページ全体の拡大・裁切りは禁止。\n`: '')
    +c.bleed.map(b=>`FULL BLEED P${b.panel}: on ${b.edges.join(', ')} ONLY; apply the shared rule.`).join('\n');
}

export function pageCompositionForeground(plan,source) {
  if(!plan.composition)return '';
  const rects=pageCompositionRects(plan);
  const dominant=(plan.composition.foregrounds||[]).map((f,i)=>`PAGE DOMINANT FIGURE F${i+1}: ${f.character}, source=P${f.panel}, overlapping ${f.over.map(n=>`P${n}`).join(', ')}. ${f.placement} ページの主役となる大きな一続きの身体を最初に配置し、周囲に小コマと台詞を収める。元場面のCamera・姿勢・道具とSOURCE MEDIUM ${source.panels[f.panel-1].style||'reference style'}を保持。身体と表情を大きく見せ、小コマと明確な大小差を作る。同じ人物の追加立ち絵や分離した頭を貼らない。枠線と溝は身体の背後で止め、その先で再開。越境部分もP${f.panel}の身体で、受入場面の新たな人物ではない。脚本上の別時点の再登場は独立した場面として残す。小コマの動作・顔・必要な道具・吹き出しを読めるように保つ。前景の台詞は元場面の発話一回だけ。境界や重なり量は自然に調整してよく、大きく一続きの人物と読みやすい物語を優先する。`);
  return [...dominant,...plan.composition.breakouts.map((b,i)=>{
    const a=rects[b.panel-1],t=rects[b.into-1],edge=breakoutEdge(a,t);
    const seam=['left','right'].includes(edge)
      ?`x=${edge==='left'?a.x:a.x+a.w}, y=${Math.max(a.y,t.y)}..${Math.min(a.y+a.h,t.y+t.h)}`
      :`y=${edge==='top'?a.y:a.y+a.h}, x=${Math.max(a.x,t.x)}..${Math.min(a.x+a.w,t.x+t.w)}`;
    return `PAGE FOREGROUND F${i+1}: ${b.part}, owned by P${b.panel}, extends into P${b.into} across P${b.panel}.${edge} (${seam} in comic-area coordinates). Draw this actor as ONE physical body with ONE head across this pair, not a complete body inside P${b.panel} plus a second head/limb in P${b.into}. Lay out this connected silhouette FIRST across the shared edge; then draw both panels behind it. Put the named part itself beyond the edge and keep its neck/shoulder/torso connection visibly continuous to the SAME source body. SOURCE MEDIUM: ${source.panels[b.panel-1].style||'source/reference style'}; source Camera and pose remain authoritative. The receiving-panel Camera and medium do not reproject or redraw F${i+1}. Panel-local positions, cast counts and balloon tails must accommodate this one body, never create a second face as a tail target. Receiving story actors/props/text keep clear; unrelated story appearances remain in their own panels.`;
  })].join('\n');
}

export function requiredCompositionChecks(plan) {
  const c=plan.composition;
  if(!c)return [];
  return [...c.heroPanels.map(panel=>({id:`hero:P${panel}`,panel})),
    ...(c.foregrounds||[]).map(f=>({id:`foreground:P${f.panel}`,panel:f.panel})),
    ...c.breakouts.map(b=>({id:`breakout:P${b.panel}`,panel:b.panel})),
    ...c.bleed.flatMap(b=>b.edges.map(edge=>({id:`bleed:P${b.panel}:${edge}`,panel:b.panel})))];
}

export function inspectCompositionChecks(review, plan) {
  const required=requiredCompositionChecks(plan);
  if(!required.length)return {status:'not_requested',checks:[]};
  const checks=required.map(expected=>{
    const matches=(Array.isArray(review?.compositionChecks)?review.compositionChecks:[]).filter(c=>c?.id===expected.id);
    const c=matches[0];
    return {...expected,status:matches.length===1&&['pass','fail'].includes(c.status)&&typeof c.observed==='string'&&c.observed.trim().length>=8?c.status:'uncertain',observed:c?.observed||'',
      materialImpact:c?.materialImpact,impactReason:c?.impactReason};
  });
  return {status:checks.some(c=>c.status==='fail')?'fail':checks.every(c=>c.status==='pass')?'pass':'uncertain',checks};
}

// A foreground fragment remains in the blind body census. Only a grounded,
// visibly continuous link exempts it from this small scene's local cast/style.
export function observedForegroundBodies(review,plan,panel) {
  const result=new Map(),records=review?.evidence?.filter(e=>e?.panel===panel)||[];
  if(records.length!==1)return result;
  const target=records[0],text=v=>typeof v==='string'&&v.trim().length>=8;
  const supported=(features,body)=>Array.isArray(features)&&new Set(features).size>=2&&features.every(f=>body?.features?.includes(f));
  for(const d of target.body_dispositions||[]) {
    if(d.kind!=='foreground'||!text(d.evidence)||result.has(d.body_id))continue;
    const foreground=plan.composition?.foregrounds?.find(f=>f.panel===d.source_panel&&f.panel!==panel);
    const breakout=plan.composition?.breakouts?.find(b=>b.panel===d.source_panel&&b.panel!==panel);
    const sourceNames=plan.expectedCast?.find(entry=>entry.panel===d.source_panel)?.names||[];
    const character=breakout&&[...sourceNames].sort((a,b)=>b.length-a.length).find(name=>breakout.part.includes(name));
    const f=foreground||(character?{panel:breakout.panel,character,over:[breakout.into]}:null);
    const checks=(review.compositionChecks||[]).filter(c=>c.id===`${foreground?'foreground':'breakout'}:P${d.source_panel}`);
    const sources=(review.evidence||[]).filter(e=>e.panel===d.source_panel),source=sources[0];
    const bodies=(target.physical_bodies||[]).filter(b=>b.id===d.body_id);
    const owners=(source?.physical_bodies||[]).filter(b=>b.id===d.source_body_id);
    const identities=(source?.cast_instances||[]).filter(a=>a.name===f?.character&&a.status==='ok');
    const binding=identities.length===1?identities[0].instances?.find(b=>b.body_id===d.source_body_id):null;
    const coherentShift=checks[0]?.status==='fail'&&checks[0]?.materialImpact==='minor_variation'&&text(checks[0]?.impactReason);
    if(!f||checks.length!==1||!(checks[0].status==='pass'||coherentShift)||!text(checks[0].observed)||sources.length!==1||bodies.length!==1||owners.length!==1
      ||!supported(d.observed_features,bodies[0])||!supported(binding?.matched_features,owners[0])
      ||(target.body_dispositions||[]).filter(entry=>entry.body_id===d.body_id).length!==1
      ||target.cast_instances?.some(a=>a.instances?.some(b=>b.body_id===d.body_id)))continue;
    result.set(d.body_id,f);
  }
  return result;
}

export function pageCompositionReview(plan) {
  if(!plan.composition)return '';
  const sceneContinuity = 'SCENE IDENTITY BEFORE FOREGROUND COMPLIANCE: A scripted reappearance in a later panel is its own scene, including a naturally cropped head or shoulder. Do not attach that later actor to the preceding dominant figure merely because the same character was requested to overlap that panel. First trace the actual dominant silhouette across the page. A coherent figure crossing a different neighboring edge/body part is minor_variation when story, dialogue and hierarchy remain readable; a separate scripted reaction is not a severed body. Report a disconnected-body defect only for a visibly detached or duplicated anatomical fragment of the SAME scene/body, with its incompatible contours located. An unconfirmed intended connection is uncertain, never evidence of physical damage. The local CAST COUNT check compares grounded physical counts only; another category\'s defect label cannot turn one observed actor into a missing or duplicate actor.';
  return `${sceneContinuity}\n${pageCompositionReviewContract(plan)}`;
}

function pageCompositionReviewContract(plan) {
  return `${pageCompositionRendering(plan)}\nThese authored effects are REQUIRED; optional-effect waivers do not apply. Return compositionChecks with one {id,status:pass|fail|uncertain,observed:concrete Japanese visual evidence,materialImpact:material|minor_variation|none|uncertain,impactReason:concrete visible effect on readability/story or creative hierarchy} for EACH of ${JSON.stringify(requiredCompositionChecks(plan))}. Observe actual artwork, not this metadata. Judge the whole page before local details: readable story, strong large/small contrast, one coherent dominant body. Foreground checks need a visibly dominant connected figure spanning the intended group of small frames; a small character contained in one box fails, while natural shifts in silhouette or overlap amount are allowed. Never demand exact coordinates or overlap percentages. Hero checks need the character/action's visible size and contrast with smaller neighboring frames, not merely a large empty background. Breakout checks need a visible connected silhouette crossing the assigned internal edge: describe which of the authored parts actually cross and which remain inside. A hair tip or one raised hand does not satisfy an authored whole head/shoulder crossing; assess the requested extent, never infer hidden connections. The crossing keeps its source panel's medium and body owner. Bleed checks need artwork reaching that actual canvas edge without white margin/outer frame, including through any title/footer zone on the specified edge. Authorized bleed is NOT an accidental page crop; missing faces, essential props, dialogue or a required title still fail their own checks; footer visibility follows the allowed overlap/occlusion policy. Report effect compliance separately from material impact. A missing required effect is repairable ONLY when the failed check also has materialImpact=material with concrete harm: missing dominant hierarchy, disconnected body, hidden speech/necessary action, or broken story flow. Harmless margin/bleed differences, a natural change of crossing body part or edge, and coherent overlap shifts remain minor_variation while their compliance status stays honest; do not fabricate harm from metadata or demand another paid edit. Optional unrequested effects may be absent without failure. Do not infer compliance from a layout ID.`;
}


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
  if(!Number.isInteger(count)||count<4||count>8) fail('実験モードのコマ数は4〜8です。');
  return Object.entries(EXPERIMENTAL_LAYOUTS).filter(([id])=>
    id!=='strips'
    &&(id!=='tall_right_middle'||[5,6,7].includes(count))).map(([id,option])=>({id,...option}));
}
// Reading order is explicit: right-to-left within each row, then downward.
// Tall right-hand panels are read before the two stacked left-hand panels.
export function experimentalLayout(count, layout=[4,8].includes(count)?'two_columns':'tall_right_middle') {
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
    const patterns={4:[[1,.2],[1,.5],[2,.3]],5:[[2,.26],[1,.42],[2,.32]],6:[[2,.2],[1,.3],[2,.23],[1,.27]],7:[[1,.18],[2,.2],[1,.22],[2,.2],[1,.2]],8:[[2,.15],[1,.25],[2,.2],[1,.25],[2,.15]]};
    let y=0;
    return patterns[count].flatMap(([n,h])=>{const row=n===1?[r(0,y,1,h)]:[r(.5,y,.5,h),r(0,y,.5,h)];y+=h;return row;});
  }
  const top=.23, middle=count===5?.77:.52;
  const rects=[r(.5,0,.5,top),r(0,0,.5,top),r(.5,top,.5,middle),r(0,top,.5,middle/2),r(0,top+middle/2,.5,middle/2)];
  if(count===6) rects.push(r(0,.75,1,.25));
  if(count===7) rects.push(r(.5,.75,.5,.25),r(0,.75,.5,.25));
  return rects;
}


export const SCENARIO_PAGE_COMPOSITION = `【ページ全体から設計する4〜8コマ】台詞を書く前に、一ページで最も大きく見せたい人物の表情・登場・動作と、小コマで伝える準備・発見・反応・オチを決める。通常入力でもページを支配する一人の大きな姿と小さな場面の明確な対比を設計する。人物が小さい均等な枠を並べ、最後に髪先だけを出す設計にしない。穏やかな笑顔や読書、食事の表情も大きな見せ場になる。大胆さを無関係な戦闘・事故・大げさな感情に置き換えない。元の物語、同一性、Camera、画風、台詞、読順を保持する。
【主役と小コマを同時に配置】見せ場の動作・表情と、その前後を読む流れに合わせて人物の大きな全身や半身を置く。横へ伸びる動作や複数人の関係は幅のある大コマ、上下の動作や立ち姿は縦長、溜めからの解放は中段や下段の大きな領域など、物語から形と位置を選ぶ。大コマの位置も小コマの並びも毎回同じ型へ固定しない。横長の見せ場でも小コマとの明確な面積差を取り、身体や表情を大胆に大きく描く。一人の大きな身体を複数の小コマや溝の手前へ重ねてよい。重なる相手は一コマに限定しない。小コマの重要な人物・道具・台詞を隠さず、大きな人物の身体を各小コマへ別々に描き足さない。見せ場の後に小コマでオチを回収してよい。見せ場を枠へ縮めて押し込まず、周囲の枠と台詞の空間を先に設計する。外周へ接する主役や背景にはタチキリを合わせ、絵を実際の画布端まで続ける。下部ウォーターマークは絵の上・一部隠れ・切れを許容し、人物を縮める理由にしない。タイトルと物語の文字は読める位置に保つ。
【形式】Scenario:直後、最初のコマ見出しより前に PageComposition: の1行JSONを置く。特定の配置を基本形にしない。必須キーは layout（通常は"free"）、frames（各コマの{x,y,w,h}の配列）、reason（今回の山場と読順を支える理由）、heroPanels（大きく見せるコマ番号の配列）、foregrounds、breakouts、bleed。foregroundsの要素は{panel,character,over,placement}、breakoutsの要素は{panel,part,into}、bleedの要素は{panel,edges}。番号・座標は数値で記す。heroPanelsには山場のコマ番号を必ず入れ、foregroundsかbreakoutsの少なくとも一方を具体的な要素で満たす。状況・reasonに「はみ出す」と書くだけで両配列を[]にしてはいけない。使用しない側と不要なbleedだけを[]にする（原文の明示制約によるrestraintReasonがある場合を除く）。配置・コマ比率・見せ場番号・重なる先は今回の物語から設計する。
framesは漫画領域内の0〜1座標（x左、y上、w幅、h高さ）をコマ数だけ右→左、上→下の読順で指定する。矩形同士は重ねない。大きな人物の重なりはforegroundsで表す。縦長の大コマに小コマを沿わせる場合も、上下の広い大コマに小コマの段を組み合わせる場合も、場面の先後が自然に読める配置にする。細い溝・軽い斜辺・境界の自然な調整は描画時に許容し、数値一致は目的にしない。foregroundsは主焦点の一人だけ、panelはその人物が演技する元コマ、characterは人物設定の正式名、overは重なる別コマ番号、placementは全身または大きな半身と受入余白を具体的に書く。元コマ内にも同じ身体を重ねて描く別の立ち絵ではない。元コマのCamera・描法・姿勢を一続きに保つ。受入コマの状況にはその場面自身の人物・行動だけを書く。前景の重なりを理由に同じ人物を新たな登場人物として列挙しない。別時点としてその人物が再登場する小コマは、その独立した動作を明記してよい。
【別の構図】ページ大の前景より一つの動作の枠越えが物語に適する場合はforegroundsを[]にして、breakouts:[{"panel":番号,"part":"人物名と頭・肩・腕など","into":辺を共有する隣接コマ番号}]を用いる。framesは溝を除いた設計座標なので、隣接する辺は同じ座標にする（上コマのy+h=下コマのy、または左コマのx+w=右コマのx）。実際の白い溝は描画時に加える。角だけで接するコマや離れたコマへbreakoutsを指定しない。複数の小コマに一続きの人物を重ねる演出はforegroundsのover配列で表す。胸→首→頭、肩→腕→手が接続するポーズと受入空間を状況にも書く。直立した全身の肩を下辺から出すなど、身体と共有辺が逆の配置は不可。受入側に同じ人物の肩越しや別ポーズを足して越境に見せかけない。頭・肩の指定を髪先や手だけで代用しない。ただし絵として自然な接続・強い見せ場・読みやすさが成立すれば位置や越境量の微差は許容する。
既存配置も使える: ${JSON.stringify(Object.fromEntries(Object.entries(EXPERIMENTAL_LAYOUTS).filter(([id])=>id!=='strips')))}。既存IDならframesは不要。候補へ収めるために見せ場を縮めず、合わなければfreeを使う。heroPanelsは見せ場の番号。bleedは必要なコマと実際に接する外周のleft/right/top/bottomを指定し、不要なら[]。通常は大コマとforegroundsまたはbreakoutsを設計する。明示された均等配置・越境禁止・原文への忠実性と衝突するときだけ、具体的なrestraintReasonを記して抑える。未指定や静かな題材という理由だけで弱めない。制作メタデータや構図の説明を作中の台詞にしない。`;
