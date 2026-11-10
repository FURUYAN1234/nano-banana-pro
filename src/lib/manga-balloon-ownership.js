const text=value=>typeof value==='string'&&value.trim().length>=8;
const normalized=value=>String(value??'').normalize('NFKC').replace(/\s/gu,'');
const point=value=>Array.isArray(value)&&value.length===2&&value.every(n=>Number.isFinite(n)&&n>=0&&n<=1);
const rect=value=>Array.isArray(value)&&value.length===4&&value.every(Number.isFinite)
  &&value[0]>=0&&value[1]>=0&&value[2]>0&&value[3]>0&&value[0]+value[2]<=1.01&&value[1]+value[3]<=1.01;
const contains=(box,[x,y],margin=0)=>x>=box[0]-margin&&x<=box[0]+box[2]+margin
  &&y>=box[1]-margin&&y<=box[1]+box[3]+margin;

// The model observes anonymous head rectangles and the tail's root/tip.
// It does not choose an owner. Resolve the first unambiguous visible head on
// that ray locally, so a narrative-derived body_id cannot override pixels.
function geometricTailBody(target,bodies) {
  if(!point(target.root)||!point(target.tip))return null;
  const [rx,ry]=target.root,[tx,ty]=target.tip,dx=tx-rx,dy=ty-ry,length=Math.hypot(dx,dy);
  if(length<.01)return null;
  const heads=[];
  for(const body of bodies) {
    if(body.head_bounds===null&&['outside_frame','non_face_crop'].includes(body.gaze?.visibility_basis))continue;
    if(!rect(body.bounds)||!rect(body.head_bounds))return null;
    const [x,y,w,h]=body.head_bounds;
    if(!contains(body.bounds,[x,y],.03)||!contains(body.bounds,[x+w,y+h],.03))return null;
    heads.push({body,box:[Math.max(0,x-.015),Math.max(0,y-.015),w+.03,h+.03]});
  }
  if(heads.some(({box})=>contains(box,target.root)))return null;
  const touching=heads.filter(({box})=>contains(box,target.tip));
  if(touching.length>1)return null;
  const hits=heads.flatMap(({body,box})=>{
    let enter=0,leave=Infinity;
    for(const [origin,direction,min,max] of [[rx,dx,box[0],box[0]+box[2]],[ry,dy,box[1],box[1]+box[3]]]) {
      if(Math.abs(direction)<1e-8){if(origin<min||origin>max)return [];continue;}
      const a=(min-origin)/direction,b=(max-origin)/direction;
      enter=Math.max(enter,Math.min(a,b));leave=Math.min(leave,Math.max(a,b));
    }
    return enter<=leave&&(enter-1)*length<=.35?[{body,enter,distance:enter*length}]:[];
  }).sort((a,b)=>a.distance-b.distance);
  if(hits[0]?.enter<1&&touching[0]?.body!==hits[0].body)return null;
  return hits.length&&(!hits[1]||hits[1].distance-hits[0].distance>.025)?hits[0].body:null;
}

// Bind a pixel-observed tail to an independently identified body. Correct OCR
// and reading order alone cannot establish who actually owns the balloon.
export function inspectBalloonOwnership({panel,expected,regions,bodies,cast}) {
  const issue=(type,reason)=>({type,panel,subject:'bubble_speaker',reason});
  if(!Array.isArray(regions)||!Array.isArray(expected)||!Array.isArray(bodies)||!Array.isArray(cast))
    return [issue('unverified','吹き出しの尾・身体・話者の観察が不足しています。')];
  const speech=regions.filter(r=>r.region_kind==='speech_balloon').sort((a,b)=>b.center_x-a.center_x);
  if(speech.length!==expected.length)return [issue('unverified','台詞の数が一致せず、尾と予定話者の対応は未確認です。')];
  return speech.flatMap((balloon,i)=>{
    const line=expected[i],targets=balloon.tail_targets;
    const unresolved=()=>[issue('unverified',`${i+1}番目の吹き出しの尾と話者の対応は未確認です。`)];
    if(normalized(balloon.text)!==normalized(line.text)||!Number.isFinite(balloon.center_x)
      ||!Array.isArray(line.owners)||!line.owners.length||line.owners.some(name=>typeof name!=='string'||!name.trim())
      ||!Array.isArray(targets)||!targets.length)return unresolved();
    const observed=[];
    for(const target of targets) {
      const geometric=Object.hasOwn(target,'root')||bodies.some(body=>Object.hasOwn(body,'head_bounds'));
      const resolved=geometric?geometricTailBody(target,bodies):null;
      const matches=geometric?(resolved?[resolved]:[]):bodies.filter(body=>body.id===target.body_id),body=matches[0];
      if(matches.length!==1||!Array.isArray(body.bounds)||body.bounds.length!==4
        ||!['head','mouth'].includes(target.region)||!text(target.evidence)
        ||!Array.isArray(target.tip)||target.tip.length!==2||target.tip.some(n=>!Number.isFinite(n)||n<0||n>1))return unresolved();
      const [x,y,w,h]=body.bounds,[tx,ty]=target.tip;
      if(!geometric&&(tx<x-.08||tx>x+w+.08||ty<y-.08||ty>y+h+.08))return unresolved();
      const owners=cast.filter(actor=>actor.status==='ok'&&actor.instances?.some(instance=>instance.body_id===body.id));
      if(owners.length!==1||observed.includes(owners[0].name))return unresolved();
      observed.push(owners[0].name);
    }
    const destinations=line.owners.flatMap(name=>{
      const actors=cast.filter(actor=>actor.name===name&&actor.status==='ok'&&actor.instances?.length===1);
      const heads=actors.length===1?bodies.filter(body=>body.id===actors[0].instances[0].body_id&&rect(body.head_bounds)):[];
      return heads.length===1?[{speaker:name,headRectangle:heads[0].head_bounds,visibleFeatures:heads[0].features}]:[];
    });
    const spatialTarget=destinations.length===line.owners.length
      ?` Independently observed destination heads in THIS panel (left,top,width,height; 0..1, x left-to-right, y top-to-bottom): ${JSON.stringify(destinations)}. The new pointed endpoint must visibly reach that head contour; merely deleting/shortening the old tail is not a correction.`:'';
    return JSON.stringify([...observed].sort())===JSON.stringify([...line.owners].sort())?[]:
      [{...issue('bubble_speaker',`「${balloon.text}」の尾は${observed.join('・')}へ接続していますが、予定話者は${line.owners.join('・')}です。${targets.map(t=>t.evidence).join(' ')}`),
        correction:`For balloon ${i+1} containing ${JSON.stringify(line.text)}, erase its incorrect tail completely and restore the exposed artwork. Draw a clear continuous tail to the visible head of ${line.owners.join('・')}, not ${observed.join('・')}.${spatialTarget} Route through empty space without crossing another head or text; a short bend is allowed. Preserve the exact lettering, balloon reading order, existing cast, body positions, action and camera. Never add or move a person to meet the old tail.`}];
  });
}
