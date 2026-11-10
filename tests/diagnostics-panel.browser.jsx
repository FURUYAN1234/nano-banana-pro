import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import ControlBar from '../src/components/ControlBar.jsx';
import ErrorBoundary from '../src/components/ErrorBoundary.jsx';
import {installDiagnostics, recordDiagnostic, makeDiagnosticEvent, readDiagnostics} from '../src/lib/diagnostics.js';
import '../src/index.css';

// Open only at localhost:5173. This origin has separate browser storage from
// the normal 127.0.0.1 app. No credentials, requests or paid generation exist here.
if (location.hostname !== 'localhost') throw new Error('Use localhost test origin');
installDiagnostics({version:'test-7.2.4'});
function Broken() { throw new Error('Controlled React fixture failure'); }
function Harness() {
  const bar = useRef(null);
  const [diagnosticHost, setDiagnosticHost] = useState(null);
  const [crash, setCrash] = useState(false);
  const [metrics, setMetrics] = useState('未計測');
  const hold=useRef(false);
  const holdRead=async()=>{
    const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('super-furu-diagnostics',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
    hold.current=true;
    const deadline=performance.now()+30000;
    const tx=db.transaction('logs','readwrite');
    const keepAlive=()=>{const request=tx.objectStore('logs').get('fixture-hold');request.onsuccess=()=>{if(hold.current&&performance.now()<deadline)keepAlive();};};
    keepAlive();
    tx.oncomplete=()=>db.close();
    setMetrics('テスト用保存待機中。ログを開いて待機表示を確認し、保存待機を解除してください。');
  };
  const measure = async () => {
    const started=performance.now();
    const observer=new MutationObserver(()=>{
      const save=[...document.querySelectorAll('button')].find(b=>b.textContent==='JSONを保存');
      if (!save || save.disabled) return;
      observer.disconnect();
      requestAnimationFrame(()=>requestAnimationFrame(()=>setMetrics(JSON.stringify({
        readyMs:Math.round(performance.now()-started),previewChars:document.querySelector('.diagnostic-json')?.textContent.length||0,
      }))));
    });
    observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled']});
    await recordDiagnostic('workflow.error',{errorCode:'FIXTURE_TERMINAL',operation:'fixture_load'});
  };
  const seed=async()=>{
    const db=await new Promise((resolve,reject)=>{const r=indexedDB.open('super-furu-diagnostics',1);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
    const now=Date.now();
    const rows=Array.from({length:2000},(_,i)=>makeDiagnosticEvent(i%200===0?'workflow.error':'api.response',i%200===0
      ?{errorCode:'FIXTURE_HISTORY',failureContext:{scenario:'検証用の架空の台本。'.repeat(3000),validationResponse:'検証用の過去の品質判定。'.repeat(2500)}}
      :{operation:'step2',requestedModel:'gpt-6-luna',responseModel:'gpt-6-luna',status:200,ok:true},{now:now-2000+i}));
    await new Promise((resolve,reject)=>{const tx=db.transaction('logs','readwrite');tx.objectStore('logs').put(rows,'events');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});
    db.close();
    const report=await readDiagnostics();
    setMetrics(JSON.stringify({seeded:report.events.length,bytes:new TextEncoder().encode(JSON.stringify(report)).length}));
  };
  if (crash) return <Broken />;
  return <>
    <ControlBar controlBarRef={bar} diagnosticHost={diagnosticHost} currentStep={4} />
    <main style={{paddingTop:260,minHeight:'200vh',background:'#080c12',color:'#cbd5e1'}}>
      <div className="system-header-with-diagnostics" style={{'--workflow-header-offset':'220px'}}>
        <h1 style={{fontSize:18}}>調査ログUI検証（模擬エラー・API不使用）</h1>
        <div ref={setDiagnosticHost} className="diagnostic-slot" />
      </div>
      <p>実API・生成・認証は使いません。このテストの記録はlocalhost専用です。</p>
      <button onClick={seed}>大量のテストログを準備</button>
      <button onClick={measure}>ログ表示時間を計測</button>
      <button onClick={holdRead}>読み込み待機を模擬（API不使用）</button>
      <button onClick={()=>{hold.current=false;}}>保存待機を解除</button>
      <output aria-label="ログUI測定結果">{metrics}</output>
      <button onClick={()=>recordDiagnostic('workflow.warning',{errorCode:'SCENARIO_PAYOFF_QUALITY',failureContext:{scenario:'修復前の台本',validationError:'flat_action_staging'}})}>修復中の指摘を記録</button>
      <button onClick={()=>recordDiagnostic('api.response',{status:200,ok:true})}>正常イベントを記録</button>
      <button onClick={()=>recordDiagnostic('workflow.cancel',{outcome:'requested'})}>中断イベントを記録</button>
      <button onClick={()=>recordDiagnostic('workflow.error',{errorCode:'CANCELLED'})}>中断結果を記録</button>
      <button onClick={()=>recordDiagnostic('api.error',{errorName:'TypeError',errorKind:'network',operation:'fixture_network'})}>通信失敗を模擬（API不使用）</button>
      <button onClick={()=>{setTimeout(()=>{throw new Error('Controlled runtime fixture failure');},0);}}>ランタイム例外を発生（API不使用）</button>
      <button onClick={()=>setCrash(true)}>React例外を発生（API不使用）</button>
    </main>
  </>;
}
createRoot(document.getElementById('root')).render(<ErrorBoundary><Harness /></ErrorBoundary>);
