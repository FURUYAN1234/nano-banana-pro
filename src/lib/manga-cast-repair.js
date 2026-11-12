// Carry the independently observed identities into the edit. A generic
// "add the missing actor" loses which already-correct bodies must survive.
export function buildCastRepairConservation(inventory,names,bodies=[],extraNames=[]) {
  if(!Array.isArray(inventory)||!Array.isArray(names)||!names.length
    ||new Set(names).size!==names.length)return null;
  const actors=[];
  for(const name of [...names,...extraNames.filter(name=>!names.includes(name))]){
    const remove=extraNames.includes(name)&&!names.includes(name);
    const matches=inventory.filter(actor=>actor?.name===name);
    if(matches.length!==1)return null;
    const actor=matches[0],instances=actor.instances;
    if(!['ok','defect'].includes(actor.status)||!Array.isArray(instances)
      ||actor.observed_count!==instances.length||!remove&&actor.status==='ok'&&instances.length!==1
      ||remove&&instances.length===0)return null;
    if(instances.length===0&&!(typeof actor.evidence==='string'&&actor.evidence.trim().length>=8))return null;
    const sourceBodies=[];
    for(const instance of instances){
      const features=instance?.matched_features;
      if(typeof instance?.location!=='string'||!instance.location.trim()
        ||!Array.isArray(features)||new Set(features.filter(x=>typeof x==='string'&&x.trim())).size<2)return null;
      const candidates=bodies.filter(body=>body.id===instance.body_id);
      const head=candidates.length===1?candidates[0].head_bounds:null;
      const validHead=Array.isArray(head)&&head.length===4&&head.every(Number.isFinite)
        &&head[0]>=0&&head[1]>=0&&head[2]>0&&head[3]>0&&head[0]+head[2]<=1.001&&head[1]+head[3]<=1.001;
      sourceBodies.push({location:instance.location,features:[...new Set(features)],
        ...(validHead?{headBounds:head}:{} )});
    }
    actors.push({name,operation:remove?'remove_all':instances.length===0?'add_once':instances.length===1?'retain':'retain_one_remove_extras',sourceBodies});
  }
  return {beforeNamedBodies:actors.reduce((n,actor)=>n+actor.sourceBodies.length,0),afterNamedBodies:names.length,actors};
}

export function formatCastRepairConservation(panel,contract,{compact=false,includeRules=true,includeMissingRules=true}={}) {
  if(!contract)return '';
  const missing=contract.actors.filter(actor=>actor.operation==='add_once').map(actor=>actor.name);
  const restore=missing.length?`MISSING CAST P${panel}: ${JSON.stringify(missing)}を各1人追加。${includeMissingRules?'全MISSING CAST共通: 同ページ・参照シートの同一人物を指定媒体で描く。台本の立ち位置と動作に沿い、頭と身体が見える場所を確保。既存人物の人数・同一性を保持。最小限の間隔・遮蔽変更可。隠して追加済みにしない。':''}\n`:'';
  if(compact)return `${restore}CAST RECONCILIATION P${panel}: ${contract.beforeNamedBodies} existing named bodies -> ${contract.afterNamedBodies} final named bodies. ${includeRules?'全CAST台帳共通: 同一性/人数厳守。retain=same existing body保持、add_once=欠員一体追加、retain_one_remove_extras=動作/奥行きに合う一体保持・余分除去、remove_all=同定済み指定外身体のみ除去。除去跡を背景復元。その他人物/背景人物/明示像は保持し分身禁止。Camera同時修正は既存身体を一度再投影し旧頭/身体を除く。headBounds=[左,上,幅,高さ]、コマ内0..1の観察位置（追加先でない）。吹出裏も再計数しremove_allは0体・他name各1体。':''}非印字台帳:${JSON.stringify(contract.actors)}`;
  return `${restore}CAST RECONCILIATION P${panel}: ${contract.beforeNamedBodies} existing named bodies -> ${contract.afterNamedBodies} final named bodies. The following ledger describes those SAME physical actors, not additional staging requests. For retain, keep the same existing body${missing.length?' (only the spacing change required above is allowed)':' at its source location'}: do not redraw a second head, face or torso beside it. For add_once, insert only that missing identity. For retain_one_remove_extras, retain one source body consistent with the action and erase the extras. For remove_all, erase only the independently identified out-of-panel cast bodies and restore the exposed background. If a camera correction changes projection in this SAME panel, relocate/reproject each retained body once instead of retaining its old copy as well. Coordinates are observed head rectangles [left,top,width,height] relative to this panel, not insertion slots or page coordinates. Preserve ordinary background people and explicit depicted replicas separately. Recount distinct heads across the entire final panel, including behind balloons: exactly one physical instance per retained/added name and zero per remove_all name. Nonprinting edit ledger: ${JSON.stringify(contract.actors)}`;
}
