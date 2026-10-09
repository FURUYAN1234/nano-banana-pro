import React from 'react';
import { downloadImageDataUrl } from '../lib/generation-history.js';

export default function AutoSaveGuide() {
  const [testing, setTesting] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const runRef = React.useRef(0);
  React.useEffect(() => () => { runRef.current += 1; }, []);
  const testDownloads = async () => {
    const run = ++runRef.current;
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
    } catch (error) { if (run === runRef.current) setMessage(error.message); }
    finally { if (run === runRef.current) setTesting(false); }
  };
  return <div className="auto-save-guide">
    <p>APIで生成した最終画像は、手動・全自動・連続モードとも制作情報入りPNGで自動ダウンロードします。保存ボタンを毎回押す必要はありません。別の場所にも保存したい場合は「保存先を選んで保存」を使います。</p>
    <p>Chromeでは最初に次の設定を手動で行ってください。アプリからブラウザーの設定は変更できません。</p>
    <ol>
      <li>設定 → ダウンロード →「ダウンロード前に各ファイルの保存場所を確認する」を<strong>OFF</strong>にします（他のサイトにも適用されます）。</li>
      <li>設定 → プライバシーとセキュリティ → サイトの設定 → その他の権限 → 自動ダウンロードで、次の3つを「許可するサイト」に追加します。<br />
        <code>http://localhost:5173</code><br /><code>http://127.0.0.1:5173</code><br /><code>https://furuyan1234.github.io</code>
      </li>
    </ol>
    <p>127.0.0.1とlocalhostは、どのPCでもそのPC自身を指します。ブラウザーのアドレス欄で、その後の「:」に続く番号がポート番号です。標準は5173ですが、例えば「http://localhost:5174/」なら「http://localhost:5174」も許可してください。</p>
    <p>保存先はChromeの「ダウンロード」で指定したフォルダです。設定は使用するブラウザー・プロファイルごとに必要です。Web版ChatGPT／Geminiで生成した画像の保存は各サービス側で行います。</p>
    <p>アプリ内ブラウザーでは保存できない場合があります。実際に使用するChromeでこのページを開いて確認してください。</p>
    <button type="button" className="save-guide-button save-guide-secondary" disabled={testing} onClick={testDownloads}>{testing ? '保存テスト中…' : '2枚の自動保存をテスト（無料・API不使用）'}</button>
    {message && <p role="status">{message}</p>}
    <p>アプリはブラウザーへのダウンロード要求まで行います。実際の保存完了はダウンロード一覧・保存先で確認してください。</p>
  </div>;
}

export function AutoSaveStartDialog({ mode, onConfirm, onCancel }) {
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return <dialog ref={dialogRef} className="save-start-dialog" aria-labelledby="save-start-title" onCancel={onCancel}>
    <h3 id="save-start-title">{mode === 'settings' ? '自動保存の設定・動作確認' : `${mode === 'endless' ? '連続ループ生成' : '全自動モード'}を始める前に`}</h3>
    <AutoSaveGuide />
    {mode !== 'settings' && <>
      <p>API料金が発生します。連続モードでは停止するまで生成を繰り返します。</p>
      <button type="button" className="save-guide-button" onClick={onConfirm}>設定済み・{mode === 'endless' ? '連続モードをONにする' : '全自動モードをONにする'}</button>
    </>}
    <button type="button" className="save-guide-button" onClick={onCancel}>{mode === 'settings' ? '閉じる' : 'キャンセル'}</button>
  </dialog>;
}

export function AutoSaveSettingsButton() {
  const [open, setOpen] = React.useState(false);
  return <>
    <button type="button" className="save-guide-button save-guide-secondary" onClick={() => setOpen(true)}>自動保存の設定・動作確認</button>
    {open && <AutoSaveStartDialog mode="settings" onCancel={() => setOpen(false)} />}
  </>;
}
