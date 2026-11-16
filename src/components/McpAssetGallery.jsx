import React from 'react';

const roles={character_sheet:'キャラクターシート',prop:'小物',background:'背景'};
export default function McpAssetGallery({assets=[]}){
 if(!assets.length)return null;
 return <section className="mcp-asset-gallery" aria-label="保存済みの共通資料">
  <h2>保存済みの共通資料</h2>
  <div>{assets.map(asset=><figure key={asset.slotId}>
   <img src={asset.dataUrl} alt={`${roles[asset.role]||'資料'}：${asset.slotId}`} />
   <figcaption>{roles[asset.role]||'資料'}・{asset.slotId}</figcaption>
  </figure>)}</div>
 </section>;
}
