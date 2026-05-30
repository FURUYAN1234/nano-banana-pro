import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FALLBACK_CHAINS, FALLBACK_CHAIN_HISTORY } from '../lib/fallback-chain-history';

export default function FallbackChainViewer({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = ['STEP 1', 'STEP 2', 'STEP 3', 'STEP 4'];
  const groupedByStep = {};
  for (const step of steps) {
    groupedByStep[step] = FALLBACK_CHAINS.filter(c => c.step === step);
  }

  // 全内容を1つのテキストにまとめる（現在の構成 + 更新履歴）
  const formatAll = () => {
    // 最新の更新日時を取得
    const latestDate = FALLBACK_CHAIN_HISTORY.length > 0
      ? FALLBACK_CHAIN_HISTORY[0].date
      : 'N/A';

    let text = `=== AI Model Fallback Chain (${latestDate}) ===\n`;

    for (const step of steps) {
      const chains = groupedByStep[step];
      if (chains.length === 0) continue;
      const first = chains[0];
      text += `\n--- ${step}: ${first.label} ---\n`;
      text += `${first.description}\n`;
      for (const chain of chains) {
        text += `\n  [${chain.provider}] (${chain.sourceFile})\n`;
        chain.models.forEach((m, i) => {
          text += `    ${i + 1}. ${m.id} [${m.role}] - ${m.note}\n`;
        });
      }
      text += '\n';
    }

    // 更新履歴（差分と理由）
    if (FALLBACK_CHAIN_HISTORY.length > 0) {
      text += '\n=== Update History ===\n';
      for (const entry of FALLBACK_CHAIN_HISTORY) {
        text += `\n[${entry.version}] ${entry.date}\n`;
        if (entry.note) text += `${entry.note}\n`;
        for (const change of entry.changes) {
          text += `  ${change.action} | ${change.step} → ${change.detail}\n`;
        }
      }
    }

    return text;
  };

  const handleCopy = async () => {
    const text = formatAll();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <>
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 99998, backgroundColor: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: 99999,
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '360px',
          maxHeight: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#111318',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* ヘッダー */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fallback Chain</span>
          <button
            onClick={onClose}
            style={{ color: '#94a3b8', fontSize: '16px', fontWeight: 'bold', lineHeight: 1, padding: '4px 8px', cursor: 'pointer', background: 'transparent', border: 'none', borderRadius: '4px' }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
          >
            ✕
          </button>
        </div>

        {/* 全内容（1つのpre、1回のコピーで全部取れる） */}
        <pre
          ref={contentRef}
          style={{
            flex: 1, overflowY: 'auto', padding: '8px 12px', margin: 0,
            fontSize: '10px', lineHeight: 1.6, fontFamily: 'monospace',
            color: '#cbd5e1', whiteSpace: 'pre-wrap', minHeight: 0,
          }}
        >
          {formatAll()}
        </pre>

        {/* コピーボタン */}
        <div style={{ padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
          <button
            onClick={handleCopy}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '6px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer',
              color: copied ? '#4ade80' : '#94a3b8',
              backgroundColor: copied ? 'rgba(22,101,52,0.3)' : 'rgba(255,255,255,0.05)',
              border: 'none',
            }}
          >
            {copied ? '✓ コピーしました' : '📋 テキストでコピー'}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
