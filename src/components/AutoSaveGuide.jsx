import React from 'react';
import { downloadImageDataUrl } from '../lib/generation-history.js';

export default function AutoSaveGuide({ onTestComplete } = {}) {
  const [testing, setTesting] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const runRef = React.useRef(0);
  React.useEffect(() => () => { runRef.current += 1; }, []);
  const testDownloads = async () => {
    const run = ++runRef.current;
    onTestComplete?.(false);
    setTesting(true);
    setMessage('確認用PNGを2枚、6秒間隔でダウンロードします（合計約12秒）。この画面を開いたままお待ちください。');
    const stamp = Date.now();
    try {
      for (let number = 1; number <= 2; number += 1) {
        await new Promise(resolve => setTimeout(resolve, 6000));
        if (run !== runRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = 560; canvas.height = 120;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('確認画像を作成できませんでした。');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000000'; ctx.font = '20px sans-serif';
        ctx.fillText('Super FURU AI 4-koma System', 16, 46);
        ctx.fillText(`保存確認 ${number}/2`, 16, 82);
        downloadImageDataUrl(canvas.toDataURL('image/png'), `Super_FURU_AI_4-koma_System_save-check-${stamp}-${number}.png`);
      }
      setMessage('2枚のダウンロードを要求しました。保存先に「1.png」「2.png」で終わる2枚があるか確認してください。1枚だけの場合は、このサイトの自動ダウンロードを許可してください。');
      onTestComplete?.(true);
    } catch (error) { if (run === runRef.current) setMessage(error.message); }
    finally { if (run === runRef.current) setTesting(false); }
  };
  return <div className="auto-save-guide">
    <p>ブラウザーの自動保存設定が済んでいれば、APIで生成した最終画像は、手動・全自動・連続モードとも制作情報入りPNGで自動保存されます。保存ボタンを毎回押す必要はありません。別の場所にも保存したい場合は「保存先を選んで保存」を使います。</p>
    <p>Chromeでは最初に次の設定を手動で行ってください。アプリからブラウザーの設定は変更できません。</p>
    <ol className="save-setup-steps">
      <li>保存先フォルダを変更する場合は、Chrome右上の「⋮」→ 設定 → ダウンロード → 保存先の「変更」でフォルダを選びます。アプリから自動保存先を変更することはできません。</li>
      <li>設定 → ダウンロード →「ダウンロード前に各ファイルの保存場所を確認する」を<strong>OFF</strong>にします（他のサイトにも適用されます）。</li>
      <li>設定 → プライバシーとセキュリティ → サイトの設定で「その他の権限」の右端の「∨」を押して展開し、その中の「自動ダウンロード」を開きます。次の3つを「許可するサイト」に追加します。<br />
        <code>http://localhost:5173</code><br /><code>http://127.0.0.1:5173</code><br /><code>https://furuyan1234.github.io</code>
        <br />メニューが見つからない、または展開できない場合は、次のアドレスをコピーし、Chromeのアドレス欄（Ctrl＋L）に貼り付けてEnterを押すと直接開けます。<br />
        <code>chrome://settings/content/automaticDownloads</code>
      </li>
    </ol>
    <p>127.0.0.1とlocalhostは、どのPCでもそのPC自身を指します。ブラウザーのアドレス欄で、その後の「:」に続く番号がポート番号です。標準は5173ですが、例えば「http://localhost:5174/」なら「http://localhost:5174」も許可してください。</p>
    <p>自動保存先はChromeの「設定 → ダウンロード」で指定したフォルダです。設定は使用するブラウザー・プロファイルごとに必要です。Web版ChatGPT／Geminiで生成した画像の保存は各サービス側で行います。</p>
    <p>アプリ内ブラウザーでは保存できない場合があります。実際に使用するChromeでこのページを開いて確認してください。</p>
    <p className="save-setup-reminder">Chromeの自動保存設定を完了したら、下記テストボタンをクリックしてください。</p>
    <button type="button" className="save-guide-button" disabled={testing} onClick={testDownloads}>{testing ? '保存テスト中…' : '2枚の自動保存をテスト（無料・API不使用）'}</button>
    {message && <p role="status">{message}</p>}
    <p>アプリはブラウザーへのダウンロード要求まで行います。実際の保存完了はダウンロード一覧・保存先で確認してください。</p>
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
  return <dialog ref={dialogRef} className="save-start-dialog" aria-labelledby="save-start-title" onCancel={close}>
    <h3 id="save-start-title">{mode === 'settings' ? '自動保存の設定・動作確認（初回確認必須）' : `${mode === 'endless' ? '連続ループ生成' : '全自動モード'}を始める前に`}</h3>
    <AutoSaveGuide onTestComplete={setTestCompleted} />
    <p>{mode === 'settings' ? 'テスト終了後、2枚が保存されたことを確認して「閉じる」を押すと確認完了になります。追加のチェック欄はありません。' : 'テスト終了後、2枚が保存されたことを確認して、下のボタンでモードをONにしてください。'}</p>
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
