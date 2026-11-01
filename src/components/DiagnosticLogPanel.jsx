import React, { useState } from 'react';
import { readDiagnostics, clearDiagnostics } from '../lib/diagnostics.js';

export default function DiagnosticLogPanel() {
  const [report, setReport] = useState(null);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const refresh = async () => {
    setBusy(true);
    try { setReport(await readDiagnostics()); setNotice(''); }
    finally { setBusy(false); }
  };
  const save = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(report, null, 2)], {type:'application/json'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `super-furu-diagnostics-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const button = 'rounded border border-slate-600 px-3 py-1 text-xs text-slate-200 disabled:opacity-50';
  return (
    <div className="text-left text-slate-300">
      {!report ? <button type="button" onClick={refresh} disabled={busy} className={button}>
        {busy ? 'ログを読み込み中…' : '不具合調査ログ'}
      </button> : <section aria-label="不具合調査ログ" className="rounded-xl border border-slate-600 bg-slate-950 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-bold">不具合調査ログ</h2>
          <button type="button" onClick={() => setReport(null)} className={button}>閉じる</button>
        </div>
        <p className="text-sm">不具合が起きた時刻と操作を添えて、このログを修正担当のAIへ渡してください。実行IDで操作・通信・エラーを辿れます。</p>
        <p className="text-xs">このブラウザーの同じURL内に直近7日分を保存します。記録データは最大2MiB・2,000件で、古い方から削除します。APIキー、入力本文、画像本体は記録しません。</p>
        <p className="text-xs">保存先：{globalThis.location?.origin} ／ {report.events.length}件 ／ {report.storageState === 'persistent' ? 'ブラウザーに保存済み' : '一時記録のみ（再読み込みで失われます）'}</p>
        {report.storageState !== 'persistent' && <p role="alert" className="text-amber-300">ログを永続保存できません。この画面からJSONを保存してください。アプリの処理は継続できます。</p>}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={refresh} disabled={busy} className={button}>最新に更新</button>
          <button type="button" onClick={save} className={button}>JSONを保存</button>
          <button type="button" className={button} onClick={async () => {
            try { await navigator.clipboard.writeText(JSON.stringify(report, null, 2)); setNotice('ログをコピーしました。'); }
            catch { setNotice('コピーできませんでした。JSONを保存するか、下の欄から選択してください。'); }
          }}>ログをコピー</button>
          <button type="button" className={button} disabled={busy} onClick={async () => { await clearDiagnostics(); await refresh(); }}>記録を削除</button>
        </div>
        <p role="status" className="text-xs">{notice}</p>
        <textarea aria-label="AIへ渡す調査ログJSON" readOnly value={JSON.stringify(report, null, 2)}
          style={{width:'100%', height:'18rem', display:'block', boxSizing:'border-box', fontFamily:'monospace', fontSize:12}}
          className="bg-black text-slate-200 p-3 rounded border border-slate-700" />
      </section>}
    </div>
  );
}
