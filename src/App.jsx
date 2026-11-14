import { getBuiltinPanelMediumReference } from './lib/builtin-panel-medium-reference.js';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import {
  CheckCircle2
} from 'lucide-react';
// --- Imports ---
import { getOpenAIApiKey } from './lib/openai';

// --- Refactored Imports (Phase 1-2) ---
import { SYSTEM_VERSION, getPunchlineLabel } from './lib/constants';

// --- Custom Hook (all business logic) ---
import useMangaWorkflow from './hooks/useMangaWorkflow';

// --- UI Components ---
import ApiKeyModal from './components/ApiKeyModal';
import ErrorBoundary from './components/ErrorBoundary';
import Step1Panel from './components/Step1Panel';
import SampleCharacterSheetsButton from './components/SampleCharacterSheetsButton';
import Step2Panel from './components/Step2Panel';
import ModelSelectionPanel from './components/ModelSelectionPanel';
import Step3Panel from './components/Step3Panel';
import ExplanationPanel from './components/ExplanationPanel';
import Step4Panel from './components/Step4Panel';
import { getEffectiveEngine } from './lib/engine-state';
import { hasStep1WorkflowInput, shouldScrollToEmptyStep1, scheduleWorkflowScroll, scrollToWorkflowAction, scrollToWorkflowStep } from './lib/step-navigation.js';
import ControlBar from './components/ControlBar';
import SystemHeader from './components/SystemHeader';
import GenerationPreview from './components/GenerationPreview';
import GenerationHistory from './components/GenerationHistory';
import ExperimentalMangaPanel from './components/ExperimentalMangaPanel';

function App() {
  const [experimentEnabled, setExperimentEnabled] = useState(true);
  // --- All 113 variables from useMangaWorkflow (auto-audited, zero omissions) ---
  const {
    changePageMode,
    scenarioModeValid,
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
    mosaicCopyrightedCharacters,
    setMosaicCopyrightedCharacters,
    showWatermarks,
    setShowWatermarks,
    showTitle,
    setShowTitle,
    setColorMode,
    isColorModeLocked,
    copyPrompt,
    prepareWebCopyPrompt,
    webCopyPartLengths,
    copiedPartIndex,
    isTextSaved,
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
    editGeneratedImage,
    preparePanelStyleEditor,
    generatePanelStyleEdit,
    adoptPanelStyleEdit,
    discardPanelStyleEdit,
    generationHistory,
    handleFullAutoToggle,
    handleSetKey,
    hardReset,
    imageResultRef,
    images,
    referenceAssets,
    editReferenceItem,
    editCastList,
    castEditorText,
    editBackground,
    imageEditDrafts,
    setImageEditDraft,
    recognitionText,
    setRecognitionText,
    referenceEditorError,
    imageInputBudget,
    imageInputError,
    inputMode,
    is360Analyzing,
    is360CameraWorking,
    isAborting,
    isApiProcessing,
    stopApiProcessing,
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
    analysisModelId,
    scenarioModelId,
    promptModelId,
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
    setAnalysisModelId,
    setScenarioModelId,
    setPromptModelId,
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
  } = useMangaWorkflow({experimentalEnabled:experimentEnabled,onAutoPageModeChange:setExperimentEnabled});
  const nativePageModeEnabled = experimentEnabled && getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai';
  const isApiModalOpen = showModal || showOpenAIKeyModal;
  const isMainLocked = !apiKey || isApiModalOpen;
  const step1HasInput = hasStep1WorkflowInput({ images, referenceAssets, castEditorText, castList, recognitionText, bg360Image, styleJson });
  const workflowScrollBusy = isAnalyzing || is360Analyzing || isSearching || isAssembling || isEnhancing
    || is360CameraWorking || isGeneratingImage || isFixingPolicy || isAborting;
  const emptyStep1ScrollBusy = workflowScrollBusy || isFullAutoMode || isEndlessMode;

  const [fixedHeaderHeight, setFixedHeaderHeight] = useState(70);
  const measuredHeaderHeightRef = useRef(fixedHeaderHeight);
  const [autoSaveCheckStatus, setAutoSaveCheckStatus] = useState('pending');
  const autoSaveVerified = autoSaveCheckStatus === 'passed';
  const [fixedHeaderElement, setFixedHeaderElement] = useState(null);
  const captureFixedHeader = useCallback(element => {
    setFixedHeaderElement(element);
  }, []);
  const [diagnosticHost, setDiagnosticHost] = useState(null);
  const previousStep1ViewRef = useRef(null);
  const step2ActionRef = useRef(null);
  const step3ActionRef = useRef(null);
  const step4ActionRef = useRef(null);
  const step1ProgressRef = useRef(null);
  const step2ProgressRef = useRef(null);

  useEffect(() => {
    if (!fixedHeaderElement) return;
    const measure = () => {
      // HMR can replace the element without changing the workflow state.
      // Ignore a detached old bar's zero-height notification and bind the new node.
      if (!fixedHeaderElement.isConnected) return;
      const height = fixedHeaderElement.getBoundingClientRect().height;
      if (Number.isFinite(height) && height > 0) {
        measuredHeaderHeightRef.current = Math.ceil(height);
        setFixedHeaderHeight(measuredHeaderHeightRef.current);
      }
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(fixedHeaderElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [fixedHeaderElement]);

  useEffect(() => {
    const next = { step: currentStep, empty: !step1HasInput, unlocked: !isMainLocked, busy: emptyStep1ScrollBusy };
    const shouldScroll = shouldScrollToEmptyStep1(previousStep1ViewRef.current, next);
    previousStep1ViewRef.current = next;
    if (!shouldScroll) return;
    return scheduleWorkflowScroll(() => scrollToWorkflowStep(1, { currentStep, browserWindow: window }), window);
  }, [currentStep, step1HasInput, isMainLocked, emptyStep1ScrollBusy]);

  useEffect(() => {
    if (isAnalyzing) {
      return scheduleWorkflowScroll(() => {
        step1ProgressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, window);
    }
    if (isSearching) {
      return scheduleWorkflowScroll(() => {
        step2ProgressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, window);
    }
  }, [isAnalyzing, isSearching]);

  useEffect(() => {
    if (!isGeneratingImage) return;
    const frame = requestAnimationFrame(() => {
      imageResultRef.current?.scrollIntoView({
        block: 'center',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [isGeneratingImage, imageResultRef]);

  useEffect(() => {
    if (currentStep < 2 || isMainLocked || workflowScrollBusy) return;
    const activeActionRef = currentStep === 2
      ? step2ActionRef
      : currentStep === 3
        ? step3ActionRef
        : currentStep === 4
          ? step4ActionRef
          : null;

    return scheduleWorkflowScroll(() => {
      scrollToWorkflowAction(activeActionRef?.current, { browserWindow: window, headerOffset: measuredHeaderHeightRef.current });
    }, window);
  }, [currentStep, isMainLocked, workflowScrollBusy]);

  const apiKeyForUnlockedUi = isMainLocked ? "" : apiKey;
  const isStepNavigationDisabled = isMainLocked || isApiProcessing || isAborting || isFullAutoMode;
  const handleNavigateToStep = step => scrollToWorkflowStep(step, {
    currentStep, disabled: isStepNavigationDisabled, browserWindow: window,
    headerOffset: fixedHeaderHeight,
    targets: { 2: step2Ref.current, 3: step3Ref.current, 4: outputRef.current },
  });

  return (
    <div className="app-shell min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30">
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
      <div ref={captureFixedHeader} className="app-fixed-header">
      <ControlBar
        embedded
        diagnosticHost={diagnosticHost}
        analysisModelId={analysisModelId}
        scenarioModelId={scenarioModelId}
        promptModelId={promptModelId}
        onNavigateToStep={handleNavigateToStep}
        currentStep={currentStep}
        activeStep={isAnalyzing || is360Analyzing ? 1 : isSearching || isEnhancing ? 2
          : isAssembling || is360CameraWorking || isFixingPolicy ? 3 : isGeneratingImage ? 4 : 0}
        imagePhase={genLog.some(log => /\[QUALITY QA\]|\[候補比較\]/.test(String(log))) ? '検査中' : '生成中'}
        apiKey={apiKeyForUnlockedUi}
        isEndlessMode={isEndlessMode}
        setIsEndlessMode={setIsEndlessMode}
        isEndlessModeRef={isEndlessModeRef}
        isAborting={isAborting}
        isApiProcessing={isApiProcessing}
        onStopApiProcessing={stopApiProcessing}
        handleFullAutoToggle={handleFullAutoToggle}
        isFullAutoMode={isFullAutoMode}
        autoSaveVerified={autoSaveVerified}
        onAutoSaveVerified={() => setAutoSaveCheckStatus('passed')}
        showStatus={showStatus}
      />
        <div className="system-header-with-diagnostics"><SystemHeader
          SYSTEM_VERSION={SYSTEM_VERSION}
          apiKey={apiKeyForUnlockedUi}
          selectedEngine={selectedEngine}
          enableOpenAIApi={enableOpenAIApi}
          partialReset={partialReset}
          step1Reset={step1Reset}
          hardReset={hardReset}
        />
        <div ref={setDiagnosticHost} className="diagnostic-slot" />
        </div>
      </div>
      
        
         {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div 
        style={{ paddingTop: `${fixedHeaderHeight}px` }}
        className="relative z-10 max-w-5xl mx-auto px-4 pb-4 space-y-8 md:px-10 md:pb-10"
      >
        <AutoSaveSettingsButton autoSaveVerified={autoSaveVerified} onVerified={() => setAutoSaveCheckStatus('passed')} />
        <main className="space-y-8" style={{ filter: isMainLocked ? 'blur(10px)' : 'none', pointerEvents: isMainLocked ? 'none' : 'auto', transition: 'filter 0.5s ease' }}>
          {getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai' && (
            <ModelSelectionPanel
              analysisModelId={analysisModelId} setAnalysisModelId={setAnalysisModelId}
              scenarioModelId={scenarioModelId} setScenarioModelId={setScenarioModelId}
              promptModelId={promptModelId} setPromptModelId={setPromptModelId}
              disabled={isApiProcessing}
            />
          )}
          <aside className="workflow-edit-notice"><strong>✎ 白い入力欄は、生成後も編集できます</strong><p>人物情報・台本・描画指示に手を入れてから次のSTEPへ進めます。自動処理を使う場合は「解析・生成強制ストップ」で止めてから編集してください。</p></aside>
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <SampleCharacterSheetsButton processFiles={processFiles} disabled={isAnalyzing || isApiProcessing} />

            {/* 01: キャラクター入力 (Dynamic Style) */}
            <Step1Panel
              setShowModal={setShowModal}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              apiKey={apiKeyForUnlockedUi}
              processFiles={processFiles}
              imageInputBudget={imageInputBudget}
              imageInputError={imageInputError}
              currentStep={currentStep}
              isAnalyzing={isAnalyzing}
              analysisProgressRef={step1ProgressRef}
              images={images}
              referenceAssets={referenceAssets}
              editReferenceItem={editReferenceItem}
              castList={castList}
              editCastList={editCastList}
              castEditorText={castEditorText}
              bg360Analysis={bg360Analysis}
              editBackground={editBackground}
              showStatus={showStatus}
              recognitionText={recognitionText}
              setRecognitionText={setRecognitionText}
              referenceEditorError={referenceEditorError}
              setImages={setImages}
              bg360Image={bg360Image}
              bg360Enabled={bg360Enabled}
              analyzeThought={analyzeThought}
              isCastListCopied={isCastListCopied}
              setIsCastListCopied={setIsCastListCopied}
              styleJson={styleJson}
              setStyleJson={setStyleJson}
            />

          {getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai' && <ExperimentalMangaPanel enabled={experimentEnabled} onModeChange={enabled=>{if(changePageMode(enabled))setExperimentEnabled(enabled);}}
            currentStep={currentStep} isAnalyzing={isAnalyzing} isSearching={isSearching}
            normalBusy={isApiProcessing || isFullAutoMode || isEndlessMode || isEnhancing || is360CameraWorking}
            />}

            {/* 02: シナリオ設定 (Static Layout) */}
            <div hidden={isAnalyzing}><Step2Panel
              experimentEnabled={nativePageModeEnabled}
              mosaicCopyrightedCharacters={mosaicCopyrightedCharacters}
              setMosaicCopyrightedCharacters={setMosaicCopyrightedCharacters}
              isRenderOptionsLocked={isColorModeLocked}
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
            /></div>
          </div>

          {!isAnalyzing && !isSearching && currentStep >= 3 && (
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
            </>
          )}
          {!isAnalyzing && !isSearching && currentStep >= 3 && <ExplanationPanel value={explanation} onChange={setExplanation} notice={explanationNotice} busy={isSearching} />}
              <div  ref={step3Ref} className="flex flex-col gap-4">

                {/* 03: プロンプト生成 - Tailwind p-8等がJITで無視されるためインラインスタイルで適用 */}
                <Step3Panel
                  showTitle={showTitle}
                  setShowTitle={setShowTitle}
                  showWatermarks={showWatermarks}
                  setShowWatermarks={setShowWatermarks}
                  colorMode={colorMode}
                  setColorMode={setColorMode}
                  isColorModeLocked={isColorModeLocked}
                  currentStep={currentStep}
                  isSearching={isSearching}
                  isAnalyzing={isAnalyzing}
                  isEnhancing={isEnhancing}
                  is360CameraWorking={is360CameraWorking}
                  experimentEnabled={nativePageModeEnabled}
                  scenarioModeValid={scenarioModeValid}
                  assemblePrompt={assemblePrompt}
                  assembleThought={assembleThought}
                  isAssembling={isAssembling}
                  promptActionRef={step3ActionRef}
                />
              </div>


          {/* 出力結果 */}
          <div>
          {!isAnalyzing && !isSearching && !isAssembling && Boolean(finalPrompt?.trim() || generatedImage) && (<Step4Panel
              onNavigateToStep={handleNavigateToStep}
              isStepNavigationDisabled={isStepNavigationDisabled}
              experimentalEnabled={nativePageModeEnabled}
              referenceAssets={referenceAssets}
              imageEditDrafts={imageEditDrafts}
              setImageEditDraft={setImageEditDraft}
              outputRef={outputRef}
              currentStep={currentStep}
              isSearching={isSearching}
              isAnalyzing={isAnalyzing}
              isEnhancing={isEnhancing}
              finalPrompt={finalPrompt}
              setFinalPrompt={setFinalPrompt}
              copyPrompt={copyPrompt}
              prepareWebCopyPrompt={prepareWebCopyPrompt}
              mediumReference={getBuiltinPanelMediumReference({scenario,colorMode,styleJson,punchlineType})}
              webCopyPartLengths={webCopyPartLengths}
              copiedPartIndex={copiedPartIndex}
              isTextSaved={isTextSaved}
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
              editGeneratedImage={editGeneratedImage}
              preparePanelStyleEditor={preparePanelStyleEditor}
              generatePanelStyleEdit={generatePanelStyleEdit}
              adoptPanelStyleEdit={adoptPanelStyleEdit}
              discardPanelStyleEdit={discardPanelStyleEdit}
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

            {Boolean(finalPrompt?.trim() || generatedImage) && (<GenerationHistory
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
          
          </div>
          </main >

        {!isAnalyzing && !isSearching && !isAssembling && <footer className="text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4">
          &copy; 2026 FURU <span className="mx-2 sm:mx-4">|</span> SUPER FURU AI 4-KOMA SYSTEM
        </footer>}
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
import { AutoSaveSettingsButton } from './components/AutoSaveGuide';
