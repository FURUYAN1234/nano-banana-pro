import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { readDiagnostics, clearDiagnostics, subscribeDiagnosticErrors } from '../lib/diagnostics.js';

export default function DiagnosticLogPanel({defaultOpen = false, panelHost}) {
  const [report, setReport] = useState(null);
  const [open, setOpen] = useState(defaultOpen);
  const [fromError, setFromError] = useState(defaultOpen);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(defaultOpen);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const refreshing = useRef(false);
  const titleId = useId();
  const reportJson = useMemo(() => report ? JSON.stringify(report, null, 2) : '', [report]);
  const preview = useMemo(() => report ? JSON.stringify({exportedAt:report.exportedAt,
    version:report.version, events:report.events.slice(-10)}, null, 2).slice(0, 16000) : '', [report]);
  const refresh = useCallback(async () => {
    if (refreshing.current) return;
    refreshing.current = true;
    setBusy(true);
    try { setReport(await readDiagnostics()); setNotice(''); }
    catch { setNotice('ログを読み込めませんでした。「最新に更新」で再試行できます。'); }
    finally { refreshing.current = false; setBusy(false); }
  }, []);
  const show = useCallback((error = false) => {
    setFromError(error);
    setOpen(true);
    void refresh();
  }, [refresh]);
  useEffect(() => subscribeDiagnosticErrors(() => show(true)), [show]);
  useEffect(() => {
    if (!defaultOpen) return;
    let active = true;
    void readDiagnostics().then(next => {
      if (active) { setReport(next); setBusy(false); }
    });
    return () => { active = false; };
  }, [defaultOpen]);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    closeRef.current?.focus({preventScroll:true});
    const fit = () => {
      const top = dialogRef.current.getBoundingClientRect().top;
      dialogRef.current.style.setProperty('--diagnostic-available-height', `${Math.max(100, window.innerHeight - top - 28)}px`);
    };
    fit();
    window.addEventListener('resize', fit);
    const onKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', fit);
      document.removeEventListener('keydown', onKey);
      if (previousFocus?.isConnected) previousFocus.focus({preventScroll:true});
    };
  }, [open]);
  const save = () => {
    const url = URL.createObjectURL(new Blob([reportJson], {type:'application/json'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `super-furu-diagnostics-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const panel = open && <section role="region" id={`${titleId}-panel`} aria-labelledby={titleId} className="diagnostic-panel" ref={dialogRef} tabIndex={0}>
          <div className="diagnostic-header">
            <h2 id={titleId}>不具合調査ログ</h2>
            <button type="button" ref={closeRef} onClick={() => setOpen(false)} className="diagnostic-button">閉じる</button>
          </div>
          <div className="diagnostic-content">
            {fromError && <p role="status" className="diagnostic-error-notice">エラーを検出したため開きました。調査記録をJSONで保存できます。</p>}
            <p>発生時刻・操作・アプリの仕様・調査手順はログに含まれます。JSONを丸ごと調査担当のAIへ渡し、簡単な症状をひと言添えてください。</p>
            <p>同じブラウザー・同じURL内に直近7日分を保存します。記録データは最大2MiB・2,000件で、古い方から削除します。失敗時は、その実行の台本・人物設定・入力・描画指示と修復内容も残します。JSONを共有するとこれらの文章も渡ります。APIキーと画像本体は除外し、長文の省略はJSONに明記します。</p>
            {report ? <>
              <p>保存先：{globalThis.location?.origin} ／ {report.events.length}件 ／ {report.storageState === 'persistent' ? 'ブラウザーに保存済み' : '一時記録のみ（再読み込みで失われます）'}</p>
              {report.storageState !== 'persistent' && <p role="alert" className="diagnostic-error-notice">ログを永続保存できません。JSONを保存してください。アプリの処理は継続できます。</p>}
            </> : <p role="status">ログを読み込み中…</p>}
            <div className="diagnostic-actions">
              <button type="button" onClick={refresh} disabled={busy} className="diagnostic-button">最新に更新</button>
              <button type="button" onClick={save} disabled={!report} className="diagnostic-button">JSONを保存</button>
              <button type="button" disabled={!report} className="diagnostic-button" onClick={async () => {
                try { await navigator.clipboard.writeText(reportJson); setNotice('ログをコピーしました。'); }
                catch { setNotice('コピーできませんでした。「JSONを保存」で全文を保存してください。'); }
              }}>ログをコピー</button>
              <button type="button" className="diagnostic-button" disabled={!report || busy} onClick={async () => { await clearDiagnostics(); await refresh(); }}>記録を削除</button>
            </div>
            {notice && <p role="status">{notice}</p>}
            {report && <>
              <p>取得時刻：{new Date(report.exportedAt).toLocaleString()}。画面は直近10件・最大16,000文字のプレビューです。保存・コピーには全件と調査用の仕様・手順が含まれます。</p>
              {busy && <p>更新中も、取得済みのログを保存・コピーできます。</p>}
              <pre aria-label="調査ログのプレビュー" className="diagnostic-json">{preview}</pre>
            </>}
            <div className="diagnostic-footer"><button type="button" onClick={() => setOpen(false)} className="diagnostic-button">ログを閉じる</button></div>
          </div>
        </section>;
  return <>
    <button type="button" onClick={() => open ? setOpen(false) : show()} aria-expanded={open} aria-controls={`${titleId}-panel`}
      className="diagnostic-button diagnostic-trigger">不具合調査ログ</button>
    {panelHost ? createPortal(panel, panelHost) : panel}
    {open && busy && createPortal(<div className="diagnostic-loading" role="status" aria-live="polite">
      <span className="diagnostic-loading-spinner" aria-hidden="true" />
      <div><strong>{report ? '調査ログを更新しています' : '調査ログを準備しています'}</strong>
        <p>{report ? '取得済みのログは保存できます。' : 'しばらくお待ちください。準備ができると保存・コピーできます。'}</p></div>
    </div>, document.body)}
  </>;
}
