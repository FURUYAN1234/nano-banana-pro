import React, { useRef, useState } from 'react';
import { IMAGE_EDIT_INSTRUCTION_MAX_CHARS } from '../lib/image-edit.js';

export default function ImageEditForm({ image, busy = false, providerLabel, onSubmit }) {
  const [instruction, setInstruction] = useState('');
  const sending = useRef(false);
  if (!image) return null;
  return (
    <form className="w-full max-w-2xl rounded-xl border border-blue-400/30 bg-blue-500/5 p-4 text-left"
      onSubmit={async event => {
        event.preventDefault();
        if (busy || sending.current || !instruction.trim() || instruction.length > IMAGE_EDIT_INSTRUCTION_MAX_CHARS) return;
        sending.current = true;
        try { await onSubmit(instruction); }
        finally { sending.current = false; }
      }}>
      <label htmlFor="image-edit-instruction" className="block text-sm font-bold text-blue-200 mb-2">この画像への追加指示</label>
      <textarea id="image-edit-instruction" rows={6} value={instruction}
        style={{ width: '100%', minHeight: '9rem', boxSizing: 'border-box', fontSize: '14px', lineHeight: 1.6, resize: 'vertical' }}
        maxLength={IMAGE_EDIT_INSTRUCTION_MAX_CHARS}
        onChange={event => setInstruction(event.target.value)} disabled={busy}
        placeholder="変更したい箇所と、どう変えたいかを入力してください。"
        aria-describedby="image-edit-help"
        className="w-full rounded-lg border border-white/15 bg-black/30 p-3 text-sm text-white disabled:opacity-50" />
      <p id="image-edit-help" style={{ fontSize: '11px', lineHeight: 1.6 }} className="mt-2 text-slate-400">表示中の画像を{providerLabel}へ送って修正します。元画像は履歴に残ります。送信ごとにAPI利用料がかかります。</p>
      <p style={{ fontSize: '11px', lineHeight: 1.6 }} className="mt-1 text-right text-slate-400" aria-live="polite">残り{Math.max(0, IMAGE_EDIT_INSTRUCTION_MAX_CHARS - instruction.length).toLocaleString()}文字（固定指示文の分は確保済み）</p>
      <button type="submit" disabled={busy || !instruction.trim() || instruction.length > IMAGE_EDIT_INSTRUCTION_MAX_CHARS}
        className="image-edit-submit mt-3 w-full rounded-lg px-4 py-3 text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed">
        {busy ? '画像処理中…' : '追加指示を送信して修正'}
      </button>
    </form>
  );
}
