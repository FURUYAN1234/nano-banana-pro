import React from 'react';
import {SYSTEM_VERSION} from '../lib/constants';
import {selectGeneratedImageDirectory,getGeneratedImageSaveDestination,prepareGeneratedImageSave,saveGeneratedImagePair} from '../lib/generated-image-save.js';

export default function AutoSaveGuide({onTestComplete}={}){
 const [testing,setTesting]=React.useState(false),[message,setMessage]=React.useState(''),[destination,setDestination]=React.useState(getGeneratedImageSaveDestination);
 const runRef=React.useRef(0);React.useEffect(()=>()=>{runRef.current+=1;},[]);
 const choose=async()=>{try{const result=await selectGeneratedImageDirectory();setDestination(getGeneratedImageSaveDestination());setMessage(result.mode==='cancelled'?'選択をキャンセルしました。保存は開始していません。':result.mode==='folder'?`親フォルダー「${result.name}」を選択しました。生成後はその下へ作品ごとに保存します。`:'このブラウザーでは作品フォルダー入りZIPで保存します。');}catch(error){setMessage(error.message);}};
 const testSave=async()=>{const run=++runRef.current;setTesting(true);onTestComplete?.(false);try{
  const canvas=document.createElement('canvas');canvas.width=560;canvas.height=120;const ctx=canvas.getContext('2d');if(!ctx)throw new Error('保存確認用の画像を作成できませんでした。');ctx.fillStyle='#fff';ctx.fillRect(0,0,560,120);ctx.fillStyle='#000';ctx.font='20px sans-serif';ctx.fillText('Super FURU AI 4-koma System',16,46);ctx.fillText('PNG + JSON 保存確認',16,82);
  const saved=await prepareGeneratedImageSave({id:Date.now(),img:canvas.toDataURL('image/png'),modelId:'save_test_no_api',metadataContext:{provider:'unknown',scenario:'Topic: 保存テスト',finalPrompt:'無料の保存経路確認。APIは使用していません。',inputImages:[],settings:{test_only:true}}},SYSTEM_VERSION);
  if(run!==runRef.current)return;const status=await saveGeneratedImagePair(saved,{isCurrent:()=>run===runRef.current});if(run!==runRef.current)return;
  setMessage(status==='saved'?'作品フォルダーのPNGとJSONを保存し、両方の内容を読み戻して照合しました。':status==='requested'?'作品フォルダー入りZIPを1件ダウンロード要求しました。ZIPを展開して同名PNGとJSONを確認してください。':'保存確認を中断しました。');onTestComplete?.(status==='saved'||status==='requested');
 }catch(error){if(run===runRef.current)setMessage(error.message);}finally{if(run===runRef.current)setTesting(false);}};
 return <div className="auto-save-guide">
  <p>API生成後の最終画像と制作情報JSONを、作品名・日時付きの同じ作品フォルダーへまとめます。対応ブラウザーでは、生成前に親フォルダーを一度選択してください。</p>
  <p>{destination.mode==='folder'?`現在の親フォルダー：${destination.name}。PNGとJSONの両方を保存・照合します。`:'現在はZIP保存です。作品フォルダー入りZIPを1件ダウンロードし、展開して保管してください。'}</p>
  {destination.supported&&<button type="button" className="save-guide-button" disabled={testing} onClick={choose}>保存先の親フォルダーを選択</button>}
  <p>フォルダーの許可はこの画面を開いている間だけ使います。再読み込み後は再選択してください。生成完了時に選択画面を突然開くことはありません。「保存先を選んで保存」からも変更できます。</p>
  <p>Web版・アプリ内ブラウザーなどフォルダー保存が使えない場合や許可がない場合はZIPになります。ZIPはブラウザーのダウンロード一覧と保存先で確認してください。自動・連続生成では、このサイトの自動ダウンロードを許可し、毎回の保存先確認をOFFにします。</p>
  <p className="save-setup-reminder">下の無料テストで、作品フォルダーのPNGとJSONを確認してください。</p>
  <button type="button" className="save-guide-button" disabled={testing} onClick={testSave}>{testing?'保存確認中…':'作品フォルダーのPNG＋JSON保存をテスト（無料・API不使用）'}</button>
  {message&&<p role="status">{message}</p>}
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
    <p>{mode === 'settings' ? 'テスト終了後、作品フォルダーのPNGとJSONを確認して「閉じる」を押すと確認完了になります。追加のチェック欄はありません。' : 'テスト終了後、作品フォルダーのPNGとJSONを確認して、下のボタンでモードをONにしてください。'}</p>
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
