const rectangle=b=>Array.isArray(b)&&b.length===4&&b.every(Number.isFinite)&&b[0]>=0&&b[1]>=0&&b[2]>0&&b[3]>0&&b[0]+b[2]<=1.001&&b[1]+b[3]<=1.001;
export function inspectHeadInventory(heads,bodies) {
  if(!Array.isArray(heads)||!Array.isArray(bodies))return {complete:false,reason:'missing_head_inventory'};
  const ids=heads.map(h=>h?.body_id);
  if(heads.some(h=>typeof h?.body_id!=='string'||!h.body_id||!rectangle(h.bounds))||new Set(ids).size!==ids.length)return {complete:false,reason:'invalid_head_inventory'};
  const withHeads=bodies.filter(b=>b.head_bounds!=null);
  if(withHeads.length!==heads.length)return {complete:false,reason:'head_body_count_mismatch'};
  for(const head of heads){
    const matches=withHeads.filter(b=>b.id===head.body_id);
    if(matches.length!==1||!rectangle(matches[0].head_bounds)||head.bounds.some((n,i)=>Math.abs(n-matches[0].head_bounds[i])>.025))return {complete:false,reason:'head_body_position_mismatch'};
  }
  return {complete:true,reason:'matched'};
}
