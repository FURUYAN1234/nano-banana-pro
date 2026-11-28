import React from 'react';
import { SYSTEM_VERSION } from '../lib/constants';
import { prepareGeneratedImageSave, requestGeneratedPng } from '../lib/generated-image-save.js';

export default function AutoSaveGuide({ onTestComplete } = {}) {
  const [testing, setTesting] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [receipt, setReceipt] = React.useState('');
  const runRef = React.useRef(0);
  React.useEffect(() => () => { runRef.current += 1; }, []);

  async function testSave() {
    const run = ++runRef.current;
    const isCurrent = () => run === runRef.current;
    setTesting(true);
    setReceipt('');
    setMessage('テストPNGを準備しています…');
    onTestComplete?.(false);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 560;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('テストPNGを作成できませんでした。');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.font = '20px sans-serif';
      ctx.fillText('Super FURU AI 4-koma System', 16, 46);
      ctx.fillText('PNG 保存テスト', 16, 82);
      const saved = await prepareGeneratedImageSave({
        id: Date.now(), img: canvas.toDataURL('image/png'), modelId: 'save_test_no_api',
        metadataContext: { provider: 'unknown', scenario: 'Topic: 保存テスト', finalPrompt: 'PNG保存テスト', settings: { test_only: true } },
      }, SYSTEM_VERSION);
      await requestGeneratedPng(saved, { isCurrent });
      if (isCurrent()) {
        setMessage(`「${saved.filename}」のダウンロードを要求しました。ブラウザーのダウンロード一覧か保存先で、このファイルを確認してください。`);
        setReceipt(saved.filename);
      }
    } catch (error) {
      if (isCurrent()) setMessage(error.message || 'PNGのダウンロードを開始できませんでした。');
    } finally {
      if (isCurrent()) setTesting(false);
    }
  }

  return <div className="auto-save-guide">
    <p>生成が終わると、制作情報付きのPNGをブラウザーのダウンロード先へ1枚保存します。保存場所はブラウザーのダウンロード設定で変更できます。</p>
    <p>ダウンロードが見つからないときは、生成画像の下の「PNGを保存」で保存先を選べます。</p>
    <p className="save-setup-reminder">無料テストでPNGの保存先を確認してください。</p>
    <button type="button" className="save-guide-button" disabled={testing} onClick={testSave}>{testing ? '準備中…' : 'PNGの自動保存をテスト（無料・API不使用）'}</button>
    {message && <p className="save-test-result" role="status" aria-live="polite">{message}</p>}
    {receipt && <button type="button" className="save-guide-button" onClick={() => {
      setMessage(`確認済み：${receipt}`);
      setReceipt('');
      onTestComplete?.(true);
    }}>保存先にテストPNGがあることを確認した</button>}
  </div>;
}

export function AutoSaveStartDialog({ mode, onConfirm, onCancel }) {
  const dialogRef = React.useRef(null);
  const [testCompleted, setTestCompleted] = React.useState(false);
  React.useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  const close = () => {
    if (mode === 'settings' && testCompleted) onConfirm();
    else onCancel();
  };
  return <dialog ref={dialogRef} className="save-start-dialog" aria-labelledby="save-start-title" onCancel={onCancel}>
    <h3 id="save-start-title">{mode === 'settings' ? '自動保存の設定・動作確認（初回確認必須）' : `${mode === 'endless' ? '連続ループ生成' : '全自動モード'}を始める前に`}</h3>
    <AutoSaveGuide onTestComplete={setTestCompleted} />
    <p>{mode === 'settings' ? '保存先でテストPNGを確認したら、この画面を閉じてください。' : '保存先でテストPNGを確認したら、下のボタンでモードをONにできます。'}</p>
    <p>確認済みの間は設定ボタンを隠し、全自動・連続ループの開始確認を省略します。リロードすると再確認が必要です。</p>
    {mode !== 'settings' && <>
      <p>API料金が発生します。連続モードでは停止するまで生成を繰り返します。</p>
      <button type="button" className="save-guide-button" disabled={!testCompleted} onClick={() => { if (testCompleted) onConfirm(); }}>設定済み・{mode === 'endless' ? '連続モードをONにする' : '全自動モードをONにする'}</button>
    </>}
    <button type="button" className="save-guide-button" onClick={close}>{mode === 'settings' ? '閉じる' : 'キャンセル'}</button>
  </dialog>;
}

export function AutoSaveSettingsButton({ autoSaveVerified = false, onVerified } = {}) {
  const [open, setOpen] = React.useState(false);
  if (autoSaveVerified) return null;
  return <>
    <button type="button" className="save-guide-button save-guide-required" onClick={() => setOpen(true)}>自動保存の設定・動作確認（初回確認必須）</button>
    {open && <AutoSaveStartDialog mode="settings" onCancel={() => setOpen(false)} onConfirm={() => {
      onVerified?.();
      setOpen(false);
    }} />}
  </>;
}
