import React from 'react';
import { BrainCircuit, RefreshCw, LogOut, AlertTriangle } from 'lucide-react';

export default function SystemHeader({
  SYSTEM_VERSION,
  apiKey,
  selectedEngine,
  partialReset,
  hardReset,
  usedModel,
  getModelBadgeInfo
}) {
  return (
    <header className="flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center z-10 w-full">
        <div className="flex flex-col items-center justify-center gap-2 mb-2 w-full max-w-full overflow-hidden">
          <div className="flex flex-col items-center text-center max-w-full">
            <div className="flex flex-row items-center justify-center gap-3 flex-nowrap text-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 shrink-0">
                <BrainCircuit size={28} className="text-white" />
              </div>
              <h1 className="text-xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] whitespace-nowrap">
                Super FURU AI <span className="text-white text-lg md:text-3xl ml-1 tracking-widest">4-koma System</span> <span className="text-lg md:text-3xl text-yellow-500 font-mono ml-2">{SYSTEM_VERSION}</span>
              </h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                Social Satire Engine [ 演出強化版 ]
              </p>
              
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${apiKey ? (selectedEngine === 'openai' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-green-500/15 border-green-500/40 text-green-400') : 'bg-red-500/15 border-red-500/40 text-red-400 animate-pulse'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${apiKey ? (selectedEngine === 'openai' ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]') : 'bg-red-400'}`} />
                {apiKey ? (selectedEngine === 'openai' ? '✅ ChatGPT Engine' : '✅ Gemini Engine') : '⚠ 未接続'}
              </div>
              
              {apiKey && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={partialReset}
                    className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10"
                    title="キャラクター設定は残したまま、シナリオ・指示文・画像をリセットして新しく作り直します"
                  >
                    <RefreshCw size={12} /> シナリオから作り直す
                  </button>
                  <button
                    onClick={hardReset}
                    className="flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20"
                    title="すべてのデータを削除し、最初のAPIキー入力画面に戻ります（AIエンジンの切り替えもここで行えます）"
                  >
                    <LogOut size={12} /> 最初からやり直す（設定クリア）
                  </button>
                </div>
              )}
            </div>
            
            {usedModel && (() => {
              const info = getModelBadgeInfo(usedModel);
              if (!info) return null;
              return (
                <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${info.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`}>
                  <span className="text-[10px] font-black uppercase tracking-widest">{info.label}</span>
                  <span className="w-[1px] h-3 bg-white/40" />
                  <span className="text-[10px] font-bold truncate max-w-[150px] md:max-w-none">{info.desc}</span>

                  <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl">
                    <p className="font-bold text-white mb-1 border-b border-white/10 pb-1">AIモデル品質情報</p>
                    <p>現在 <span className="font-mono text-blue-300">{usedModel}</span> を使用中。</p>
                    {info.tier === "Lite" && (
                      <div className="mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative">
                        <AlertTriangle size={10} className="absolute top-2 right-2" />
                        <span className="font-bold block mb-1">⚠️ 一時的な接続制限モード</span>
                        APIアクセス制限を回避するため、自動的に軽量モデル（低消費）に切り替えています。画像やシナリオの品質が一時的に低下する場合がありますが、しばらくお待ちいただくと自動的に元の最高品質に戻ります。
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </header>
  );
}
