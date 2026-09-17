import React, { useState } from 'react';

export default function ExplanationPanel({ value, onChange, notice, busy }) {
  const [copyStatus, setCopyStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus('コピーしました。');
    } catch {
      setCopyStatus('コピーできませんでした。文章を選択してコピーしてください。');
    }
  }
  return (
    <section aria-labelledby="sns-explanation-heading" className="sns-explanation" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="sns-explanation-heading" className="font-bold text-lg text-slate-100" style={{ margin: 0 }}>解説 <span className="text-sm font-normal text-slate-400">SNS投稿用</span></h2>
        <button type="button" onClick={copy} disabled={busy || !value.trim()} className="px-4 py-2 border border-cyan-500/40 text-cyan-200 rounded disabled:opacity-40">文章と参考リンクをコピー</button>
      </div>
      <p className="text-sm text-slate-400" style={{ margin: 0 }}>題材の解説と参考リンクを編集し、漫画と一緒にSNSへ投稿できます。演出強化では編集内容を保持します。</p>
      <label htmlFor="sns-explanation" className="sr-only">SNS投稿用の解説</label>
      <textarea id="sns-explanation" value={value} title={notice} disabled={busy} onChange={e => { onChange(e.target.value); setCopyStatus(''); }} rows={7} className="w-full rounded border border-white/15 bg-black/30 p-3 text-sm text-slate-100 leading-relaxed" style={{ resize: 'vertical' }} placeholder={notice || '解説と参考リンクがここに表示されます。手入力もできます。'} />
      <p className="text-xs text-slate-400" style={{ margin: 0 }}>{busy ? 'シナリオと解説を作成中…' : notice || '新しいシナリオを生成すると、この欄も置き換わります。'}</p>
      {copyStatus && <p role="status" className="text-sm text-cyan-200" style={{ margin: 0 }}>{copyStatus}</p>}
    </section>
  );
}
