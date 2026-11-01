import React from 'react';
import { RefreshCw, LogOut } from 'lucide-react';
import { getEffectiveEngine } from '../lib/engine-state';

export default function SystemHeader({SYSTEM_VERSION, apiKey, selectedEngine, enableOpenAIApi, partialReset, step1Reset, hardReset}) {
  const isOpenAIEngine = getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai';
  return <header className="system-header">
    <h1 className="font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
      Super FURU AI <span className="text-white">4-koma System</span> <span className="text-yellow-500 font-mono">{SYSTEM_VERSION}</span>
    </h1>
    <div className="system-engine-label" style={{color:apiKey ? '#6ee7b7' : '#fca5a5'}}>
      {apiKey ? (isOpenAIEngine ? '✅ ChatGPT Engine' : '✅ Gemini Engine') : '⚠ 未接続'}
    </div>
    {apiKey && (
      <div className="system-reset-controls flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={partialReset}
          className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10"
          title="キャラクター設定は残したまま、シナリオ・指示文・画像をリセットして新しく作り直します"
        >
          <RefreshCw size={12} /> シナリオ（STEP2）からやり直す
        </button>
        <button
          onClick={step1Reset}
          className="flex items-center gap-1.5 bg-blue-950/40 hover:bg-blue-900/50 text-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-blue-500/20"
          title="API接続は残したまま、キャラクターシート・抽出設定・解析ログと、それ以降の作業をリセットします"
        >
          <RefreshCw size={12} /> キャラクター解析（STEP1）からやり直す
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
  </header>;
}
