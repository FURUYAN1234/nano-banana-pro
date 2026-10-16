import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getImageEditInstructionMaxChars } from '../lib/image-edit.js';

export function ImageEditSection({ image, busy = false, panelEditor, children }) {
  const [target, setTarget] = useState(panelEditor ? 'panel' : 'whole');
  const [disclosure, setDisclosure] = useState({ expanded: false, hasOpened: false });
  if (!image) return null;
  const selectedTarget = panelEditor && target === 'panel' ? 'panel' : 'whole';
  const { expanded, hasOpened } = disclosure;
  return (
    <div style={{ width: '100%' }} className="web-prompt-disclosure image-edit-section">
      <button type="button" aria-expanded={expanded} aria-controls="image-edit-section-content"
        disabled={busy}
        onClick={() => { if (!busy) setDisclosure({ expanded: !expanded, hasOpened: true }); }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', width: '100%', boxSizing: 'border-box', margin: 0, padding: '12px', border: 0, borderRadius: '12px', background: '#fde4bd', color: '#000', textAlign: 'left', cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.5 : 1, fontSize: '13px', fontWeight: 700, lineHeight: 1.6 }}
        className="web-prompt-disclosure-toggle">
        <span style={{ fontSize: '13px', lineHeight: 1.6, fontWeight: 700 }}>ページ全体／コマを選んで修正</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }} className="flex items-center gap-2">
          <span style={{ fontSize: '10px', lineHeight: 1.5, fontWeight: 700 }}>クリックで{expanded ? '閉じる' : '開く'}</span>
          <ChevronDown size={18} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
        </span>
      </button>
      <div id="image-edit-section-content" hidden={!expanded} style={{ padding: '10px', fontSize: '13px', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)' }} className="p-4 space-y-3 bg-black/20">
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', margin: '0 0 8px', fontSize: '13px', lineHeight: 1.5 }} className="block text-sm">修正対象
          <select aria-label="修正対象" value={selectedTarget} disabled={busy}
            onChange={event => { if (!busy) setTarget(event.target.value); }}
            style={{ width: 'auto', margin: 0, padding: '5px 8px', fontSize: '13px', lineHeight: 1.5 }}
            className="ml-2 rounded border border-white/20 bg-slate-900 p-2">
            {panelEditor && <option value="panel">コマごと</option>}
            <option value="whole">絵全体</option>
          </select>
        </label>
        {selectedTarget === 'panel' && React.cloneElement(panelEditor, { enabled: hasOpened })}
        <div data-edit-target="whole" hidden={selectedTarget !== 'whole'}>{children}</div>
      </div>
    </div>
  );
}

export default function ImageEditForm({ image, busy = false, providerLabel, onSubmit, draft, onDraftChange, colorMode = 'color' }) {
  const [localInstruction, setLocalInstruction] = useState('');
  const instruction = draft ?? localInstruction;
  const setInstruction = onDraftChange ?? setLocalInstruction;
  const sending = useRef(false);
  if (!image) return null;
  const maxChars = getImageEditInstructionMaxChars(colorMode);
  return (
    <form className="w-full text-left"
      onSubmit={async event => {
        event.preventDefault();
        if (busy || sending.current || !instruction.trim() || instruction.length > maxChars) return;
        sending.current = true;
        try { await onSubmit(instruction); }
        finally { sending.current = false; }
      }}>
      <label htmlFor="image-edit-instruction" style={{ display: 'block', fontSize: '13px', lineHeight: 1.5, margin: '4px 0' }} className="block text-sm font-bold text-blue-200 mb-2">ページ全体への指示</label>
      <textarea id="image-edit-instruction" rows={6} value={instruction}
        style={{ width: '100%', minHeight: '9rem', boxSizing: 'border-box', fontSize: '14px', lineHeight: 1.6, resize: 'vertical' }}
        maxLength={maxChars}
        onChange={event => setInstruction(event.target.value)} disabled={busy}
        placeholder="ページ全体で変更したい内容を入力してください。"
        aria-describedby="image-edit-help"
        className="w-full rounded-lg border border-white/15 bg-black/30 p-3 text-sm text-white disabled:opacity-50" />
      <p id="image-edit-help" style={{ margin: '4px 0', fontSize: '12px', lineHeight: 1.45 }} className="mt-2 text-slate-400">ページ全体を{providerLabel}で修正します。他のコマも変わる場合があります。</p>
      <p style={{ margin: '4px 0', fontSize: '11px', lineHeight: 1.5 }} className="mt-1 text-right text-slate-400" aria-live="polite">残り{Math.max(0, maxChars - instruction.length).toLocaleString()}文字（固定指示文の分は確保済み）</p>
      <button type="submit" disabled={busy || !instruction.trim() || instruction.length > maxChars}
        style={{ width: '100%', boxSizing: 'border-box', margin: '6px 0 0', padding: '8px 12px', fontSize: '13px', lineHeight: 1.5 }}
        className="image-edit-submit image-edit-action mt-3 w-full rounded-lg px-4 py-3 text-sm font-bold">
        {busy ? '画像処理中…' : 'ページ全体を修正（追加課金あり）'}
      </button>
    </form>
  );
}
