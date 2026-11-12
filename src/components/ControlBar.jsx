import React from 'react';
import { Check, RefreshCw, Zap, Square, Loader2 } from 'lucide-react';
import { AutoSaveStartDialog } from './AutoSaveGuide';
import DiagnosticLogPanel from './DiagnosticLogPanel';
import FallbackChainViewer from './FallbackChainViewer';

export default function ControlBar({
  embedded = false,
  diagnosticHost,
  analysisModelId,
  scenarioModelId,
  promptModelId,
  controlBarRef,
  currentStep = 1,
  activeStep = 0,
  onNavigateToStep,
  imagePhase = '生成中',
  apiKey,
  isEndlessMode,
  setIsEndlessMode,
  isEndlessModeRef,
  isAborting,
  isApiProcessing = false,
  onStopApiProcessing,
  handleFullAutoToggle,
  isFullAutoMode,
  autoSaveVerified = false,
  onAutoSaveVerified,
}) {
  const [pendingMode, setPendingMode] = React.useState(null);
  const [showFallbackChain, setShowFallbackChain] = React.useState(false);
  const navigationDisabled = !apiKey || activeStep > 0 || isApiProcessing || isAborting
    || isFullAutoMode || typeof onNavigateToStep !== 'function';
  const setEndless = next => {
    setIsEndlessMode(next);
    if (isEndlessModeRef) isEndlessModeRef.current = next;
  };
  const requestMode = mode => {
    if (!apiKey || isAborting) return;
    if (!autoSaveVerified) setPendingMode(mode);
    else if (mode === 'endless') setEndless(true);
    else handleFullAutoToggle();
  };

  return (
    <div ref={controlBarRef} className={`${embedded ? 'workflow-controls-embedded' : 'fixed top-0 left-0 right-0 z-[100]'} bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden`}>
      <div className="workflow-header-row flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
        
        <div className="workflow-progress-tools">
        <a href={`${import.meta.env.BASE_URL}downloads/super-furu-ai-4koma-full-manual-2026-10-01.pdf`}
          target="_blank" rel="noreferrer" className="manual-link-button workflow-manual-link">使い方マニュアル</a>
        <ol aria-label="制作の進捗" aria-live="polite" className="workflow-progress">
          {['解析', 'シナリオ', 'プロンプト', '画像生成'].map((label, index) => {
            const step = index + 1;
            const state = activeStep > 0
              ? step < activeStep ? 'complete' : step === activeStep ? 'active' : 'waiting'
              : step < currentStep ? 'complete' : step === currentStep ? 'ready' : 'waiting';
            const status = state === 'active' ? step === 4 ? imagePhase : '実行中'
              : state === 'complete' ? step === 4 ? '生成済み' : '完了'
                : state === 'ready' ? '次の操作' : '待機';
            const content = <>
              <span className="workflow-progress-mark" aria-hidden="true">{state === 'complete' ? <Check size={14} /> : step}</span>
              <span className="workflow-progress-label">{label}</span>
              <span className="workflow-progress-status">{status}</span>
            </>;
            return <li key={step} className="workflow-progress-item" data-state={state}
              aria-current={state === 'active' ? 'step' : undefined}>
              {state === 'complete' ? <button type="button"
                className="workflow-progress-step workflow-progress-return" data-state={state}
                disabled={navigationDisabled}
                aria-label={`STEP${step} ${label}に戻る`}
                title={navigationDisabled ? '処理中や未接続時は移動できません' : `クリックしてSTEP${step} ${label}に戻る（内容は保持されます）`}
                onClick={() => { if (!navigationDisabled) onNavigateToStep(step); }}>
                {content}
              </button> : <span className="workflow-progress-step" data-state={state}>{content}</span>}
            </li>;
          })}
        </ol>
        <div className="workflow-utility-tools">
        <DiagnosticLogPanel panelHost={diagnosticHost} />
        <button type="button" className="diagnostic-button workflow-model-chain" onClick={() => setShowFallbackChain(true)}
          title="AIモデルフォールバックチェーンの構成を確認">⚙ Model Chain</button>
        </div>
        </div>

        {/* Controls - フルオートボタン */}
        <div className="workflow-mode-controls flex flex-wrap items-center justify-center gap-4 shrink-0 max-w-full">
          {/* 連続生成(ループ)トグル */}
          <button
            disabled={!apiKey || isAborting}
            aria-pressed={Boolean(isEndlessMode)}
            onClick={() => {
              if (isEndlessMode) setEndless(false);
              else requestMode('endless');
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
            <span className="whitespace-nowrap">{isEndlessMode ? '🔁 連続ループ生成 ON' : '🔁 連続ループ生成 OFF'}</span>
          </button>

          {/* フルオートボタン */}
          <button
            disabled={!apiKey || isAborting}
            aria-pressed={Boolean(isFullAutoMode)}
            onClick={() => isFullAutoMode ? handleFullAutoToggle() : requestMode('fullAuto')}
            title="途中までの内容があれば未完了のSTEPから再開。生成中に押すと通信と自動進行を中断。1作品の完了後は自動OFFになり、もう一度ONにすると新しい作品を開始します。"
            style={{ color: isFullAutoMode ? (isAborting ? '#ffffff' : '#dc2626') : '#ffffff' }}
            className={`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${
              isFullAutoMode
                ? (isAborting ? 'bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100' : 'bg-red-50 border-red-300 shadow-lg')
                : 'bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]'
            } ${!apiKey && !isAborting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isFullAutoMode ? (isAborting ? <Loader2 size={14} className="animate-spin" /> : <Square size={14} fill="currentColor" />) : <Zap size={14} />}
            {isFullAutoMode ? (isAborting ? '停止処理中...' : '⚡ 全自動モード（フルオート） ON') : '⚡ 全自動モード（フルオート） OFF'}
          </button>
          
          <button
            type="button"
            disabled={!isApiProcessing}
            onClick={onStopApiProcessing}
            title="進行中のAPI通信と自動進行を中断し、取得済みの台本・画像を保持します。送信済み処理の課金は取り消せません。"
            className="api-force-stop"
          >
            解析・生成強制ストップ
          </button>
        </div>

        {/* 説明文 */}
        <div className={`workflow-mode-help flex flex-col justify-center text-[10px] leading-relaxed text-center transition-opacity duration-300 ${!apiKey ? 'text-slate-600 opacity-40' : 'text-slate-400'}`}>
            <span className="whitespace-normal text-slate-300 font-bold">💡 全自動モード（フルオート）の使い方：</span>
            <span className="whitespace-normal">・「⚡ 全自動モード ON」にして画像をドロップ（またはドロップ後にON）すると、漫画を全自動で最後まで生成します。</span>
            <span className="whitespace-normal">・新しい作品はニュースから生成し、OpenAIは内容に応じて4〜8コマと配置を自動選択します。Geminiは4コマです。</span>
            <span className="whitespace-normal">・同じボタンで停止し、再度ONにすると未完了のSTEPから再開します。手動で進めた台本・プロンプトも引き継ぎます。</span>
            <span className="whitespace-normal">・台本まであればSTEP3、プロンプトまであればSTEP4へ進みます。通信を止めた工程は再実行し、STEP2の再開では入力した題材・設定を保持します。</span>
            <span className="whitespace-normal">・1作品の完了後に再度ONにすると新しい作品を開始します。途中から新しく作り直す場合は「シナリオ（STEP2）からやり直す」を使います。</span>
            <span className="whitespace-normal">・「連続ループ生成」をONにすると、自動生成完了後に自動で次の作品（別のシナリオ）を永遠に作り続けます。</span>
        </div>
      </div>

      
      <FallbackChainViewer analysisModelId={analysisModelId} scenarioModelId={scenarioModelId} promptModelId={promptModelId}
        isOpen={showFallbackChain} onClose={() => setShowFallbackChain(false)} />
      {pendingMode && <AutoSaveStartDialog mode={pendingMode} onCancel={() => setPendingMode(null)} onConfirm={() => {
        const mode = pendingMode;
        setPendingMode(null);
        if (!apiKey || isAborting) return;
        onAutoSaveVerified?.();
        if (mode === 'endless') setEndless(true);
        else if (!isFullAutoMode) handleFullAutoToggle();
      }} />}

    </div>
  );
}
