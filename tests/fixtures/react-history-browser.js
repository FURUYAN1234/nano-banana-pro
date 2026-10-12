import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { installReactPerformanceDetail } from '/src/lib/react-performance-detail.js';
installReactPerformanceDetail({ development: true });
const report = { errors: [], measures: 0, maxDetailBytes: 0, ticks: 0, changes: 0, sourceLength: 0 };
const show = () => { document.querySelector('#diagnostics').textContent = JSON.stringify(report, null, 2); };
window.addEventListener('error', e => { report.errors.push(e.message); show(); });
window.addEventListener('unhandledrejection', e => { report.errors.push(String(e.reason)); show(); });
new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    if (entry.detail?.devtools?.track !== 'Components ⚛') continue;
    report.measures++;
    report.maxDetailBytes = Math.max(report.maxDetailBytes, new TextEncoder().encode(JSON.stringify(entry.detail)).length);
    performance.clearMeasures(entry.name);
  }
  show();
}).observe({ type: 'measure', buffered: true });
const blob = await new Promise(resolve => { document.querySelector('#image-input').addEventListener('change', event => resolve(event.target.files[0]), { once: true }); });
const image = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });
report.sourceLength = image.length;
function HistoryView({ generatedImage, generationHistory, imageEditDrafts }) {
  return React.createElement('section', null,
    React.createElement('p',null,`画像 ${generatedImage.length}文字、履歴 ${generationHistory.length}件、編集 ${Object.keys(imageEditDrafts).length}件`),
    ...generationHistory.map(item => React.createElement('img',{key:item.id,src:item.image,alt:`履歴${item.id}`})));
}
function App() {
  const [history,setHistory] = useState(Array.from({length:10},(_,id)=>({id,image:image+'#'+id})));
  const [changes,setChanges] = useState(0);
  const [ticks,setTicks] = useState(0);
  useEffect(()=>{ const timer=setInterval(()=>setTicks(n=>n+1),1000); return()=>clearInterval(timer); },[]);
  useEffect(()=>{report.ticks=ticks;report.changes=changes;show();},[ticks,changes]);
  const advance = () => { const id=changes+10; setHistory(prior=>[{id,image:image+'#'+id},...prior].slice(0,10));setChanges(n=>n+1); };
  const props={generatedImage:history[0].image,generationHistory:history,imageEditDrafts:{[history[0].image]:{text:'保持'}}};
  return React.createElement(React.Fragment,null,
    React.createElement('button',{onClick:advance},'履歴の先頭に追加'),
    React.createElement('p',null,`後続更新 ${ticks}回・履歴追加 ${changes}回`),
    React.createElement(HistoryView,props),React.createElement(HistoryView,props));
}
createRoot(document.querySelector('#root')).render(React.createElement(StrictMode,null,React.createElement(App)));
