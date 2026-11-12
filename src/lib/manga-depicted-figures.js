const text=value=>typeof value==='string'&&value.trim().length>=8;
const rect=value=>Array.isArray(value)&&value.length===4&&value.every(Number.isFinite)
  &&value[0]>=0&&value[1]>=0&&value[2]>0&&value[3]>0&&value[0]+value[2]<=1.001&&value[1]+value[3]<=1.001;

// Screen/picture figures are visible story content, never missing live actors.
// Preserve uncertainty when the display, identity or silhouette is unreadable.
export function inspectDepictedFigures(observation,names=[],panel) {
  const issues=[],bodies=[],cast=[],styles=[];
  for(const name of names) {
    const records=observation?.depicted_figures?.filter(record=>record.name===name)||[];
    const record=records[0],body=record?.body;
    const unresolved=()=>issues.push({type:'unverified',panel,subject:name,reason:'画面・絵の中の人物の姿と同定根拠が不足しています。実空間の欠員とは扱いません。'});
    if(records.length!==1||!text(record.evidence)||!text(record.container_evidence)) {unresolved();continue;}
    if(record.status==='missing'&&body===null) {
      issues.push({type:'story_integrity',panel,subject:name,materialImpact:'material',
        impactReason:'脚本に必要な画面内の人物描写が欠落している。',reason:record.evidence,
        correction:`P${panel}の指定された画面/絵の中へ${name}の描像だけを元の大きさ・姿勢で復元する。現場に人物を追加せず、他の人物・全文・媒体・Cameraを保持。`});
      continue;
    }
    const indices=record.feature_indices;
    if(record.status!=='present'||!body||typeof body.id!=='string'||!rect(body.bounds)||!rect(body.head_bounds)
      ||body.head_bounds[0]<body.bounds[0]-.03||body.head_bounds[1]<body.bounds[1]-.03
      ||body.head_bounds[0]+body.head_bounds[2]>body.bounds[0]+body.bounds[2]+.03
      ||body.head_bounds[1]+body.head_bounds[3]>body.bounds[1]+body.bounds[3]+.03
      ||!Array.isArray(body.features)||!Array.isArray(indices)||new Set(indices).size<2
      ||indices.some(i=>!Number.isInteger(i)||typeof body.features[i]!=='string'||!body.features[i].trim())
      ||bodies.some(other=>other.id===body.id)||observation.physical_bodies?.some(other=>other.id===body.id)) {unresolved();continue;}
    bodies.push(body);
    cast.push({name,status:'ok',observed_count:1,evidence:record.evidence,instances:[{body_id:body.id,location:record.container_evidence,matched_features:indices.map(i=>body.features[i])}]});
    styles.push(record.style_observation);
  }
  return {issues,bodies,cast,styles,status:issues.some(issue=>issue.type==='story_integrity')?'fail':issues.length?'uncertain':'pass'};
}
