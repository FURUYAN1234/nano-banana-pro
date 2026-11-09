const text=value=>typeof value==='string'&&value.trim().length>=8;
const normalized=value=>String(value??'').normalize('NFKC').replace(/\s/gu,'');

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
      const matches=bodies.filter(body=>body.id===target.body_id),body=matches[0];
      if(matches.length!==1||!Array.isArray(body.bounds)||body.bounds.length!==4
        ||!['head','mouth'].includes(target.region)||!text(target.evidence)
        ||!Array.isArray(target.tip)||target.tip.length!==2||target.tip.some(n=>!Number.isFinite(n)||n<0||n>1))return unresolved();
      const [x,y,w,h]=body.bounds,[tx,ty]=target.tip;
      if(tx<x-.08||tx>x+w+.08||ty<y-.08||ty>y+h+.08)return unresolved();
      const owners=cast.filter(actor=>actor.status==='ok'&&actor.instances?.some(instance=>instance.body_id===body.id));
      if(owners.length!==1||observed.includes(owners[0].name))return unresolved();
      observed.push(owners[0].name);
    }
    return JSON.stringify([...observed].sort())===JSON.stringify([...line.owners].sort())?[]:
      [issue('bubble_speaker',`「${balloon.text}」の尾は${observed.join('・')}へ接続していますが、予定話者は${line.owners.join('・')}です。${targets.map(t=>t.evidence).join(' ')}`)];
  });
}
