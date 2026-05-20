import React from 'react';
import {
  Wand2,
  Loader2,
  ArrowRight
} from 'lucide-react';

/**
 * STEP 03: プロンプト生成パネル
 */
export default function Step3Panel({
  step3Ref,
  currentStep,
  isSearching,
  isAnalyzing,
  isEnhancing,
  is360CameraWorking,
  assemblePrompt,
  isAssembling
}) {
  return (
    <section
      ref={step3Ref}
      style={{ padding: '16px', gap: '16px', borderRadius: '0', background: '#0f1115', position: 'relative' }}
      className={`flex flex-col shadow-xl transition-all duration-300
        ${currentStep === 3 ? 'border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100' : 'border border-white/5 opacity-60'}
        ${currentStep > 3 ? 'border border-orange-500/30 opacity-100' : ''}
      `}
    >
      {/* STEP3ロックオーバーレイ: STEP2未完了 or 解析中 or 検索中 or シナリオ強化中 or カメラワーク処理中 */}
      {(currentStep < 3 || isSearching || isAnalyzing || isEnhancing || is360CameraWorking) && (
        <div style={{ position: 'absolute', inset: -2, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', pointerEvents: 'auto' }}>
          {/* カメラワーク処理中のメッセージ */}
          {is360CameraWorking && currentStep >= 3 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-400"></div>
              <p className="text-cyan-300 text-sm font-bold animate-pulse">🎬 360° カメラワーク設計＋背景クロップ中...</p>
              <p className="text-slate-500 text-xs">完了すると自動的にアンロックされます</p>
            </div>
          )}
        </div>
      )}
      <div className={`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${currentStep === 3 ? 'text-orange-400' : 'text-slate-500'}`}>
        <Wand2 size={24} /> STEP 03: プロンプト生成 (PROMPT ASSEMBLY)
      </div>

      <button
        onClick={assemblePrompt}
        disabled={isAssembling || is360CameraWorking}
        className={`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
          ${currentStep === 3 ? 'ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]' : ''}
        `}
      >
        {isAssembling ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span className="animate-pulse">ASSEMBLING PROMPT...</span>
          </>
        ) : (
          <>
            <Wand2 size={24} className={`text-blue-600 ${currentStep === 3 ? 'animate-bounce' : ''} `} />
            <span>最終プロンプトを構築する (STEP 3)</span>
            <ArrowRight size={24} className="opacity-60" />
          </>
        )}
      </button>
    </section>
  );
}
