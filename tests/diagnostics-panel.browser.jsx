import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import ControlBar from '../src/components/ControlBar.jsx';
import ErrorBoundary from '../src/components/ErrorBoundary.jsx';
import {installDiagnostics, recordDiagnostic} from '../src/lib/diagnostics.js';
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
  if (crash) return <Broken />;
  return <>
    <ControlBar controlBarRef={bar} diagnosticHost={diagnosticHost} currentStep={4} />
    <main style={{paddingTop:260,minHeight:'200vh',background:'#080c12',color:'#cbd5e1'}}>
      <div className="system-header-with-diagnostics" style={{'--workflow-header-offset':'220px'}}>
        <h1 style={{fontSize:18}}>調査ログUI検証（模擬エラー・API不使用）</h1>
        <div ref={setDiagnosticHost} className="diagnostic-slot" />
      </div>
      <p>実API・生成・認証は使いません。このテストの記録はlocalhost専用です。</p>
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
