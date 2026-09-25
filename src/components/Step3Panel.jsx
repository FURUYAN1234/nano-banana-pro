import React, { useEffect, useRef } from 'react';
import {
  Wand2,
  Loader2,
  ArrowRight
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';

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
  assembleThought,
  isAssembling,
  promptActionRef,
  colorMode = 'color',
  setColorMode,
  isColorModeLocked = false
}) {
  const progressLogRef = useRef(null);
  const controlsDisabled = currentStep < 3 || isSearching || isAnalyzing || isEnhancing
    || is360CameraWorking || isAssembling || isColorModeLocked;

  useEffect(() => {
    if (isAssembling) {
      progressLogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isAssembling]);

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
        <Wand2 size={24} /> STEP 03: プロンプト生成（画像指示文の構築）
      </div>

      <fieldset disabled={controlsDisabled} className="manga-color-mode" aria-describedby="manga-color-mode-help">
        <legend>出力モード</legend>
        <div className="manga-color-mode-options">
          {[['color', 'カラー'], ['monochrome', '白黒']].map(([value, label]) => (
            <label key={value} className={`manga-color-mode-option ${colorMode === value ? 'is-selected' : ''}`}>
              <input type="radio" name="manga-color-mode" value={value} checked={colorMode === value}
                onChange={() => setColorMode(value)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <p id="manga-color-mode-help">
          {colorMode === 'monochrome' ? '漫画原稿三階調：白地・黒ベタ・単一スクリーントーン。肌の明部は真白、グレースケール不使用。人物・焦点はGペンの強弱で強調。' : '色彩とライティングを活かしたカラー漫画。'}
          <br />選択後にSTEP3を押して反映します。全設定リセットまで選択を保持します。
        </p>
      </fieldset>

      <button
        ref={promptActionRef}
        onClick={() => assemblePrompt()}
        disabled={controlsDisabled}
        aria-current={currentStep === 3 ? 'step' : undefined}
        className={`primary-step-action primary-step-action-neutral-edge w-full relative py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:cursor-not-allowed group/gen shadow-xl
          ${currentStep === 3 ? 'ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]' : ''}
          ${currentStep === 3 && !isAssembling ? 'next-step-gentle-pulse' : ''}
        `}
      >
        {isAssembling ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span className="animate-pulse">指示文（プロンプト）を構築中...</span>
          </>
        ) : (
          <>
            <Wand2 size={24} className={`text-blue-600 ${currentStep === 3 ? 'animate-bounce' : ''} `} />
            <span>画像用の指示文（プロンプト）を構築する (STEP 3)</span>
            <ArrowRight size={24} className="opacity-60" />
          </>
        )}
      </button>

      {(isAssembling || assembleThought) && (
        <div ref={progressLogRef} aria-live="polite">
          <ThinkingLog thought={assembleThought} placeholder="> プロンプト構築を開始しています..." />
        </div>
      )}
    </section>
  );
}
