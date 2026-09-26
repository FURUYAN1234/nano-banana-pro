import React, { useState, useEffect, useRef } from 'react';

import {
  CheckCircle2
} from 'lucide-react';
// --- Imports ---
import { getOpenAIApiKey } from './lib/openai';

// --- Refactored Imports (Phase 1-2) ---
import { SYSTEM_VERSION, getPunchlineLabel, getModelBadgeInfo } from './lib/constants';

// --- Custom Hook (all business logic) ---
import useMangaWorkflow from './hooks/useMangaWorkflow';

// --- UI Components ---
import ApiKeyModal from './components/ApiKeyModal';
import ErrorBoundary from './components/ErrorBoundary';
import Step1Panel from './components/Step1Panel';
import Step2Panel from './components/Step2Panel';
import Step3Panel from './components/Step3Panel';
import ExplanationPanel from './components/ExplanationPanel';
import Step4Panel from './components/Step4Panel';
import ControlBar from './components/ControlBar';
import SystemHeader from './components/SystemHeader';
import GenerationPreview from './components/GenerationPreview';
import GenerationHistory from './components/GenerationHistory';

function App() {
  // --- All 113 variables from useMangaWorkflow (auto-audited, zero omissions) ---
  const {
    analyzeThought,
    apiKey,
    assemblePrompt,
    assembleThought,
    bg360Analysis,
    bg360CameraWork,
    bg360CroppedPanels,
    bg360Enabled,
    bg360Image,
    castList,
    categories,
    colorMode,
    setColorMode,
    isColorModeLocked,
    copyPrompt,
    webCopyPartLengths,
    currentStep,
    customLocation,
    customOutfit,
    enableChatGPTMode,
    enableOpenAIApi,
    enhanceBackgrounds,
    enhanceBodyLang,
    enhanceCameraWork,
    enhanceDialogue,
    enhanceGag,
    enhanceEffects,
    enhanceExpressions,
    enhanceLog,
    enhanceScenario,
    finalPrompt,
    setFinalPrompt,
    fullAutoStep,
    genLog,
    genLogRef,
    generateScenarioFromNews,
    generatedImage,
    normalizeDisplayedPage,
    generationHistory,
    handleFullAutoToggle,
    handleSetKey,
    hardReset,
    imageResultRef,
    images,
    inputMode,
    is360Analyzing,
    is360CameraWorking,
    isAborting,
    isAnalyzing,
    isAssembling,
    isCastListCopied,
    isCopied,
    isDragging,
    isEndlessMode,
    isEndlessModeRef,
    isEnhancePanelOpen,
    isEnhancing,
    isFallbackUsed,
    isFixPromptCopied,
    isFixingPolicy,
    isFullAutoMode,
    isGeneratingImage,
    isMetaSaved,
    isPolicyCopied,
    isPolicyPanelOpen,
    showPolicyChoice,
    policyAutoRetrying,
    handlePolicyAutoFix,
    handlePolicySwitchToWeb,
    MAX_POLICY_RETRIES,
    isScenarioCopied,
    isSearching,
    mangaTitle,
    manualTopic,
    originalScenario,
    outputRef,
    partialReset,
    policyErrorMsg,
    policyFixLog,
    policyPromptHistory,
    processFiles,
    punchlineType,
    effectivePunchlineType,
    regenerateImage,
    openAIImageQuality,
    openAIImageSize,
    setOpenAIImageSize,
    openAIImageVerificationWarning,
    allowImageQualityRepair,
    setAllowImageQualityRepair,
    stopQualityRetries,
    setOpenAIImageQuality,
    regenerateSafePrompt,
    revertScenario,
    scenario,
    explanation,
    setExplanation,
    explanationNotice,
    scenarioThought,
    scenarioModelId,
    selectedEngine,
    setBg360Enabled,
    setCastList,
    setCustomLocation,
    setCustomOutfit,
    setEnableOpenAIApi,
    setEnhanceBackgrounds,
    setEnhanceBodyLang,
    setEnhanceCameraWork,
    setEnhanceDialogue,
    setEnhanceGag,
    setEnhanceEffects,
    setEnhanceExpressions,
    setGeneratedImage,
    setGenerationHistory,
    setImages,
    setInputMode,
    setIsCastListCopied,
    setIsDragging,
    setIsEndlessMode,
    setIsEnhancePanelOpen,
    setIsFixPromptCopied,
    setIsMetaSaved,
    setIsPolicyCopied,
    setIsPolicyPanelOpen,
    setIsScenarioCopied,
    setManualTopic,
    setPolicyErrorMsg,
    setPunchlineType,
    setScenario,
    setScenarioModelId,
    setShowModal,
    setShowOpenAIKeyModal,
    setTargetDate,
    showModal,
    showOpenAIKeyModal,
    showStatus,
    step1Reset,
    status,
    step2Ref,
    step3Ref,
    styleJson,
    setStyleJson,
    targetDate,
    toggleCategory,
    usedModel,
  } = useMangaWorkflow();

  const [controlBarHeight, setControlBarHeight] = useState(70);
  const controlBarRef = useRef(null);
  const wasAssemblingRef = useRef(false);
  const step2ActionRef = useRef(null);
  const step3ActionRef = useRef(null);
  const step4ActionRef = useRef(null);
  const step1ProgressRef = useRef(null);
  const step2ProgressRef = useRef(null);

  useEffect(() => {
    if (!controlBarRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const height = entry.borderBoxSize
          ? (entry.borderBoxSize[0] ? entry.borderBoxSize[0].blockSize : entry.target.getBoundingClientRect().height)
          : entry.target.getBoundingClientRect().height;
        // Add 12px margin beneath control bar for optimal breathing room
        setControlBarHeight(height + 12);
      }
    });

    resizeObserver.observe(controlBarRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [apiKey, selectedEngine, enableOpenAIApi, currentStep]);

  useEffect(() => {
    if (isAssembling) {
      wasAssemblingRef.current = true;
      return;
    }
    if (!wasAssemblingRef.current || !finalPrompt?.trim()) return;

    wasAssemblingRef.current = false;
    requestAnimationFrame(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [finalPrompt, isAssembling, outputRef]);

  useEffect(() => {
    if (isAnalyzing) {
      requestAnimationFrame(() => {
        step1ProgressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }
    if (isSearching) {
      requestAnimationFrame(() => {
        step2ProgressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, [isAnalyzing, isSearching]);

  useEffect(() => {
    if (currentStep < 2 || isAnalyzing || isSearching || isAssembling || isEnhancing || is360CameraWorking || isGeneratingImage) return;
    const activeActionRef = currentStep === 2
      ? step2ActionRef
      : currentStep === 3
        ? step3ActionRef
        : currentStep === 4
          ? step4ActionRef
          : null;

    requestAnimationFrame(() => {
      activeActionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  }, [currentStep, isAnalyzing, isSearching, isAssembling, isEnhancing, is360CameraWorking, isGeneratingImage]);

  const isApiModalOpen = showModal || showOpenAIKeyModal;
  const isMainLocked = !apiKey || isApiModalOpen;
  const apiKeyForUnlockedUi = isMainLocked ? "" : apiKey;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <ApiKeyModal isOpen={showModal} onSave={handleSetKey} provider="google" />
      <ApiKeyModal 
        isOpen={showOpenAIKeyModal} 
        onSave={handleSetKey}
        onClose={() => {
          setShowOpenAIKeyModal(false);
          if (!getOpenAIApiKey()) {
            setEnableOpenAIApi(false); // 取消時はチェックを外す
          }
        }} 
        provider="openai" 
      />
      <ControlBar
        controlBarRef={controlBarRef}
        currentStep={currentStep}
        apiKey={apiKeyForUnlockedUi}
        isEndlessMode={isEndlessMode}
        setIsEndlessMode={setIsEndlessMode}
        isEndlessModeRef={isEndlessModeRef}
        isAborting={isAborting}
        handleFullAutoToggle={handleFullAutoToggle}
        isFullAutoMode={isFullAutoMode}
        selectedEngine={selectedEngine}
        enableOpenAIApi={enableOpenAIApi}
        isPolicyCopied={isPolicyCopied}
        setIsPolicyCopied={setIsPolicyCopied}
        showStatus={showStatus}
      />
      
        
         {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div 
        style={{ paddingTop: `${controlBarHeight}px` }}
        className="relative z-10 max-w-5xl mx-auto px-4 pb-4 space-y-8 md:px-10 md:pb-10"
      >
        {/* === ヘッダー領域 === */}
        <SystemHeader
          SYSTEM_VERSION={SYSTEM_VERSION}
          apiKey={apiKeyForUnlockedUi}
          selectedEngine={selectedEngine}
          enableOpenAIApi={enableOpenAIApi}
          partialReset={partialReset}
          step1Reset={step1Reset}
          hardReset={hardReset}
          usedModel={usedModel}
          getModelBadgeInfo={getModelBadgeInfo}
        />



        <main className="space-y-8" style={{ filter: isMainLocked ? 'blur(10px)' : 'none', pointerEvents: isMainLocked ? 'none' : 'auto', transition: 'filter 0.5s ease' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* 01: キャラクター入力 (Dynamic Style) */}
            <Step1Panel
              setShowModal={setShowModal}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              apiKey={apiKeyForUnlockedUi}
              processFiles={processFiles}
              currentStep={currentStep}
              isAnalyzing={isAnalyzing}
              analysisProgressRef={step1ProgressRef}
              images={images}
              setImages={setImages}
              bg360Image={bg360Image}
              bg360Enabled={bg360Enabled}
              analyzeThought={analyzeThought}
              castList={castList}
              setCastList={setCastList}
              isCastListCopied={isCastListCopied}
              setIsCastListCopied={setIsCastListCopied}
              styleJson={styleJson}
              setStyleJson={setStyleJson}
            />

            {/* 02: シナリオ設定 (Static Layout) */}
            <Step2Panel
              step2Ref={step2Ref}
              currentStep={currentStep}
              isAnalyzing={isAnalyzing}
              selectedEngine={selectedEngine}
              enableOpenAIApi={enableOpenAIApi}
              inputMode={inputMode}
              setInputMode={setInputMode}
              targetDate={targetDate}
              setTargetDate={setTargetDate}
              categories={categories}
              toggleCategory={toggleCategory}
              manualTopic={manualTopic}
              setManualTopic={setManualTopic}
              bg360Image={bg360Image}
              bg360Enabled={bg360Enabled}
              setBg360Enabled={setBg360Enabled}
              bg360Analysis={bg360Analysis}
              is360Analyzing={is360Analyzing}
              customLocation={customLocation}
              setCustomLocation={setCustomLocation}
              customOutfit={customOutfit}
              setCustomOutfit={setCustomOutfit}
              punchlineType={punchlineType}
              effectivePunchlineType={effectivePunchlineType}
              setPunchlineType={setPunchlineType}
              scenarioModelId={scenarioModelId}
              setScenarioModelId={setScenarioModelId}
              isSearching={isSearching}
              scenarioActionRef={step2ActionRef}
              scenarioProgressRef={step2ProgressRef}
              generateScenarioFromNews={generateScenarioFromNews}
              scenarioThought={scenarioThought}
              scenario={scenario}
              setScenario={setScenario}
              isScenarioCopied={isScenarioCopied}
              setIsScenarioCopied={setIsScenarioCopied}
              originalScenario={originalScenario}
              isEnhancePanelOpen={isEnhancePanelOpen}
              setIsEnhancePanelOpen={setIsEnhancePanelOpen}
              enhanceExpressions={enhanceExpressions}
              setEnhanceExpressions={setEnhanceExpressions}
              enhanceBodyLang={enhanceBodyLang}
              setEnhanceBodyLang={setEnhanceBodyLang}
              enhanceEffects={enhanceEffects}
              setEnhanceEffects={setEnhanceEffects}
              enhanceBackgrounds={enhanceBackgrounds}
              setEnhanceBackgrounds={setEnhanceBackgrounds}
              enhanceCameraWork={enhanceCameraWork}
              setEnhanceCameraWork={setEnhanceCameraWork}
              enhanceDialogue={enhanceDialogue}
              setEnhanceDialogue={setEnhanceDialogue}
              enhanceGag={enhanceGag}
              setEnhanceGag={setEnhanceGag}
              isEnhancing={isEnhancing}
              enhanceScenario={enhanceScenario}
              revertScenario={revertScenario}
              enhanceLog={enhanceLog}
              showStatus={showStatus}
              styleJson={styleJson}
            />
          </div>

          {currentStep >= 3 && (
            <>
              <GenerationPreview
                scenario={scenario}
                bg360Image={bg360Image}
                bg360Analysis={bg360Analysis}
                bg360Enabled={bg360Enabled}
                customLocation={customLocation}
                customOutfit={customOutfit}
                punchlineType={punchlineType}
                getPunchlineLabel={getPunchlineLabel}
              />

              <div ref={step3Ref} className="flex flex-col gap-4">
                <ExplanationPanel value={explanation} onChange={setExplanation} notice={explanationNotice} busy={isSearching} />

                {/* 03: プロンプト生成 - Tailwind p-8等がJITで無視されるためインラインスタイルで適用 */}
                <Step3Panel
                  colorMode={colorMode}
                  setColorMode={setColorMode}
                  isColorModeLocked={isColorModeLocked}
                  currentStep={currentStep}
                  isSearching={isSearching}
                  isAnalyzing={isAnalyzing}
                  isEnhancing={isEnhancing}
                  is360CameraWorking={is360CameraWorking}
                  assemblePrompt={assemblePrompt}
                  assembleThought={assembleThought}
                  isAssembling={isAssembling}
                  promptActionRef={step3ActionRef}
                />
              </div>
            </>
          )}

          {/* 出力結果 */}
          {Boolean(finalPrompt?.trim()) && (<Step4Panel
              outputRef={outputRef}
              currentStep={currentStep}
              isSearching={isSearching}
              isAnalyzing={isAnalyzing}
              isEnhancing={isEnhancing}
              finalPrompt={finalPrompt}
              setFinalPrompt={setFinalPrompt}
              copyPrompt={copyPrompt}
              webCopyPartLengths={webCopyPartLengths}
              enableChatGPTMode={enableChatGPTMode}
              selectedEngine={selectedEngine}
              bg360Image={bg360Image}
              bg360Analysis={bg360Analysis}
              bg360Enabled={bg360Enabled}
              bg360CameraWork={bg360CameraWork}
              bg360CroppedPanels={bg360CroppedPanels}
              isCopied={isCopied}
              isMetaSaved={isMetaSaved}
              setIsMetaSaved={setIsMetaSaved}
              castList={castList}
              scenario={scenario}
              punchlineType={effectivePunchlineType}
              colorMode={colorMode}
              enhanceExpressions={enhanceExpressions}
              enhanceBodyLang={enhanceBodyLang}
              enhanceEffects={enhanceEffects}
              enhanceBackgrounds={enhanceBackgrounds}
              enhanceCameraWork={enhanceCameraWork}
              enhanceDialogue={enhanceDialogue}
              enhanceGag={enhanceGag}
              SYSTEM_VERSION={SYSTEM_VERSION}
              isAssembling={isAssembling}
               regenerateImage={regenerateImage}
              openAIImageQuality={openAIImageQuality}
              openAIImageSize={openAIImageSize}
              setOpenAIImageSize={setOpenAIImageSize}
              openAIImageVerificationWarning={openAIImageVerificationWarning}
              stopQualityRetries={stopQualityRetries}
              allowImageQualityRepair={allowImageQualityRepair}
              setAllowImageQualityRepair={setAllowImageQualityRepair}
              setOpenAIImageQuality={setOpenAIImageQuality}
              isGeneratingImage={isGeneratingImage}
              imageActionRef={step4ActionRef}
              isFixPromptCopied={isFixPromptCopied}
              setIsFixPromptCopied={setIsFixPromptCopied}
              isPolicyPanelOpen={isPolicyPanelOpen}
              setIsPolicyPanelOpen={setIsPolicyPanelOpen}
              isPolicyCopied={isPolicyCopied}
              setIsPolicyCopied={setIsPolicyCopied}
              policyErrorMsg={policyErrorMsg}
              setPolicyErrorMsg={setPolicyErrorMsg}
              regenerateSafePrompt={regenerateSafePrompt}
              isFixingPolicy={isFixingPolicy}
              policyFixLog={policyFixLog}
              policyPromptHistory={policyPromptHistory}
              genLogRef={genLogRef}
              genLog={genLog}
              imageResultRef={imageResultRef}
              generatedImage={generatedImage}
              images={images}
              normalizeDisplayedPage={normalizeDisplayedPage}
              isFullAutoMode={isFullAutoMode}
              fullAutoStep={fullAutoStep}
              mangaTitle={mangaTitle}
              isFallbackUsed={isFallbackUsed}
              enableOpenAIApi={enableOpenAIApi}
              setGeneratedImage={setGeneratedImage}
              generationHistory={generationHistory}
              setGenerationHistory={setGenerationHistory}
              showPolicyChoice={showPolicyChoice}
              policyAutoRetrying={policyAutoRetrying}
              handlePolicyAutoFix={handlePolicyAutoFix}
              handlePolicySwitchToWeb={handlePolicySwitchToWeb}
              MAX_POLICY_RETRIES={MAX_POLICY_RETRIES}
            />)}

            {Boolean(finalPrompt?.trim()) && (<GenerationHistory
              generationHistory={generationHistory}
              setGenerationHistory={setGenerationHistory}
              generatedImage={generatedImage}
              setGeneratedImage={setGeneratedImage}
              isSearching={isSearching}
              isAssembling={isAssembling}
              isGeneratingImage={isGeneratingImage}
              isEnhancing={isEnhancing}
              isFullAutoMode={isFullAutoMode}
              fullAutoStep={fullAutoStep}
            />)}
          
          </main >

        <footer className="text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4">
          &copy; 2026 FURU <span className="mx-2 sm:mx-4">|</span> SUPER FURU AI 4-KOMA SYSTEM
        </footer>
      </div >

      {/* 通知 (日本語) */}
      {
        status && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md text-black px-8 py-4 rounded-[2rem] text-xs font-bold flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] border border-white/20 animate-in fade-in slide-in-from-bottom-10">
            <CheckCircle2 size={18} className="text-green-600" /> {status}
          </div>
        )
      }

      {/* (OpenAI API Key Modal was unified with standard ApiKeyModal) */}

      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.2); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.4); }
    `}} />
    </div >
  );
}

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
