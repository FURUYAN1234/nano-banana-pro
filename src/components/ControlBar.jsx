import React from 'react';
import { Check, ArrowRight, RefreshCw, Zap, Square, Loader2, Copy } from 'lucide-react';
import { buildSingleImageEmotionalPrompt } from '../lib/single-image-prompt';
import { getEffectiveEngine } from '../lib/engine-state';

export default function ControlBar({
  controlBarRef,
  currentStep,
  apiKey,
  isEndlessMode,
  setIsEndlessMode,
  isEndlessModeRef,
  isAborting,
  handleFullAutoToggle,
  isFullAutoMode,
  selectedEngine,
  enableOpenAIApi,
  isPolicyCopied,
  setIsPolicyCopied
}) {
  const isOpenAIEngine = getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai';

  return (
    <div ref={controlBarRef} className="fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden">
      <div className="flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3">
        
        {/* Progress Steps (Center Left) */}
        <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${!apiKey ? 'opacity-30' : 'opacity-100'}`}>
          {/* Step 1: 解析 */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 1 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]' : currentStep > 1 ? 'bg-blue-600/50 text-blue-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 1 ? <Check size={16} /> : '1'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">解析</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 2: シナリオ */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 2 ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]' : currentStep > 2 ? 'bg-purple-600/50 text-purple-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 2 ? <Check size={16} /> : '2'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">シナリオ</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 3: プロンプト */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 3 ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]' : currentStep > 3 ? 'bg-orange-600/50 text-orange-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 3 ? <Check size={16} /> : '3'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">プロンプト</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 4: 画像生成 */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 4 ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]' : currentStep > 4 ? 'bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 4 ? <Check size={16} /> : '4'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">画像生成　</span>
          </div>
        </div>

        {/* 物理スペーサー */}
        <div className="hidden xl:block w-12 lg:w-16 shrink-0"></div>

        {/* Controls - フルオートボタン＋説明文 */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full">
          {/* 連続生成(ループ)トグル */}
          <button
            disabled={!apiKey || isAborting}
            onClick={() => {
              const nextState = !isEndlessMode;
              setIsEndlessMode(nextState);
              if (isEndlessModeRef) {
                isEndlessModeRef.current = nextState;
              }
            }}
            title="ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。"
            style={{ color: isEndlessMode ? '#dc2626' : '#ffffff' }}
            className={`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${
              isEndlessMode
                ? 'bg-red-50 border-red-300 shadow-lg'
                : 'bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <RefreshCw size={14} className={isEndlessMode ? 'animate-spin' : ''} style={{ animationDuration: '3s' }} />
            <span className="whitespace-nowrap">{isEndlessMode ? '🔁 連続ループ生成を解除' : '🔁 連続ループ生成 ON'}</span>
          </button>

          {/* フルオートボタン */}
          <button
            disabled={!apiKey || isAborting}
            onClick={handleFullAutoToggle}
            title="画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。"
            style={{ color: isFullAutoMode ? (isAborting ? '#ffffff' : '#dc2626') : '#ffffff' }}
            className={`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${
              isFullAutoMode
                ? (isAborting ? 'bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100' : 'bg-red-50 border-red-300 shadow-lg')
                : 'bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]'
            } ${!apiKey && !isAborting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isFullAutoMode ? (isAborting ? <Loader2 size={14} className="animate-spin" /> : <Square size={14} fill="currentColor" />) : <Zap size={14} />}
            {isFullAutoMode ? (isAborting ? '停止処理中...' : '全自動モード 中断') : '⚡ 全自動モード（フルオート） ON'}
          </button>
          
          <div className="hidden sm:block w-6 shrink-0"></div>

          {/* 説明文 */}
          <div className={`flex flex-col justify-center text-[10px] leading-relaxed max-w-[650px] text-center sm:text-left transition-opacity duration-300 ${!apiKey ? 'text-slate-600 opacity-40' : 'text-slate-400'}`}>
            <span className="whitespace-normal text-slate-300 font-bold">💡 全自動モード（フルオート）の使い方：</span>
            <span className="whitespace-normal">・「⚡ 全自動モード ON」にして画像をドロップ（またはドロップ後にON）すると、4コマ漫画を全自動で最後まで生成します。</span>
            <span className="whitespace-normal">・途中で中断したい場合は同じボタンで停止できます。以降は手動（各STEPボタン）で進行可能です。</span>
            <span className="whitespace-normal">・「連続ループ生成」をONにすると、自動生成完了後に自動で次の作品（別のシナリオ）を永遠に作り続けます。</span>
          </div>
        </div>
      </div>
      
      {/* Web版ChatGPT用 コピーボタン (β) */}
      {isOpenAIEngine && (
        <div className="flex justify-center w-full max-w-7xl mx-auto px-2 pb-1">
          <button
            onClick={() => {
              const protocol = buildSingleImageEmotionalPrompt();
              navigator.clipboard.writeText(protocol);
              setIsPolicyCopied(true);
              setTimeout(() => setIsPolicyCopied(false), 2000);
            }}
            title="Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。"
            className={`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${
              isPolicyCopied
                ? 'bg-white border-green-500 text-green-600'
                : 'bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]'
            }`}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              {isPolicyCopied ? <Check size={16} /> : <Copy size={16} />}
              <span className="whitespace-nowrap">{isPolicyCopied ? 'コピー完了！' : '🎬 ChatGPT用 1枚絵エモーショナルプロンプトをコピー'}</span>
            </div>
            <span className="text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500">
              【1枚絵用】プロンプトをコピーしてChatGPTのチャット欄に貼り付け、元のキャラクター画像と一緒に送信すると、シネマチックで感情豊かなイラストが生成されます。
            </span>
          </button>
        </div>
      )}

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
        <div className={`h-full transition-all duration-700 ease-out
          ${currentStep === 1 ? 'w-1/4 bg-blue-500' :
            currentStep === 2 ? 'w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
            currentStep === 3 ? 'w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' :
            currentStep >= 4 ? 'w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'w-0'}
        `} />
      </div>
    </div>
  );
}
