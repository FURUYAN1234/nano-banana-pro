import React from 'react';

// CANARY TEST
console.log("HELLO_USER_FIXED_VERSION_2_25");

import {
  CheckCircle2
} from 'lucide-react';
// --- Imports ---
import { setOpenAIApiKey, getOpenAIApiKey } from './lib/openai';

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
    copyPrompt,
    currentStep,
    customLocation,
    customOutfit,
    enableChatGPTMode,
    enableOpenAIApi,
    enhanceBackgrounds,
    enhanceBodyLang,
    enhanceCameraWork,
    enhanceDialogue,
    enhanceEffects,
    enhanceExpressions,
    enhanceLog,
    enhanceScenario,
    finalPrompt,
    fullAutoStep,
    genLog,
    genLogRef,
    generateScenarioFromNews,
    generatedImage,
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
    isScenarioCopied,
    isSearching,
    mangaTitle,
    manualTopic,
    originalScenario,
    outputRef,
    partialReset,
    policyErrorMsg,
    policyFixLog,
    processFiles,
    punchlineType,
    regenerateImage,
    regenerateSafePrompt,
    revertScenario,
    scenario,
    scenarioThought,
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
    setShowModal,
    setShowOpenAIKeyModal,
    setTargetDate,
    showModal,
    showOpenAIKeyModal,
    showStatus,
    status,
    step2Ref,
    step3Ref,
    styleJson,
    setStyleJson,
    targetDate,
    toggleCategory,
    usedModel,
  } = useMangaWorkflow();

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <ApiKeyModal isOpen={showModal} onSave={handleSetKey} provider="google" />
      <ApiKeyModal 
        isOpen={showOpenAIKeyModal} 
        onSave={(key) => {
          const newKey = key.trim();
          const existingKey = getOpenAIApiKey();
          if (newKey === "" && existingKey) {
            setEnableOpenAIApi(true);
            showStatus("🔑 既存のOpenAI APIキーを適用しました。");
            setShowOpenAIKeyModal(false);
          } else if (newKey.startsWith("sk-")) {
            setOpenAIApiKey(newKey);
            setEnableOpenAIApi(true);
            showStatus("🔑 新しいOpenAI APIキーをセキュアに保存しました。");
            setShowOpenAIKeyModal(false);
          } else {
            alert("エラー：APIキーは 'sk-' から始まる文字列である必要があります。");
          }
        }} 
        onClose={() => {
          setShowOpenAIKeyModal(false);
          if (!getOpenAIApiKey()) {
            setEnableOpenAIApi(false); // 取消時はチェックを外す
          }
        }} 
        provider="openai" 
      />
      <ControlBar
        currentStep={currentStep}
        apiKey={apiKey}
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

      <div className={`relative z-10 max-w-5xl mx-auto px-4 pb-4 space-y-8 md:px-10 md:pb-10 ${
        (selectedEngine === 'openai' || enableOpenAIApi)
          ? 'pt-[130px] md:pt-[150px]'
          : 'pt-[55px] md:pt-[65px]'
      }`}>
        {/* === ヘッダー領域 === */}
        <SystemHeader
          SYSTEM_VERSION={SYSTEM_VERSION}
          apiKey={apiKey}
          selectedEngine={selectedEngine}
          partialReset={partialReset}
          hardReset={hardReset}
          usedModel={usedModel}
          getModelBadgeInfo={getModelBadgeInfo}
        />



        <main className="space-y-8" style={{ filter: apiKey ? 'none' : 'blur(10px)', pointerEvents: apiKey ? 'auto' : 'none', transition: 'filter 0.5s ease' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* 01: キャラクター入力 (Dynamic Style) */}
            <Step1Panel
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              apiKey={apiKey}
              processFiles={processFiles}
              currentStep={currentStep}
              isAnalyzing={isAnalyzing}
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
              setPunchlineType={setPunchlineType}
              isSearching={isSearching}
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
              isEnhancing={isEnhancing}
              enhanceScenario={enhanceScenario}
              revertScenario={revertScenario}
              enhanceLog={enhanceLog}
              showStatus={showStatus}
              styleJson={styleJson}
            />
          </div>

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

          {/* 03: プロンプト生成 - Tailwind p-8等がJITで無視されるためインラインスタイルで適用 */}
            <Step3Panel
              step3Ref={step3Ref}
              currentStep={currentStep}
              isSearching={isSearching}
              isAnalyzing={isAnalyzing}
              isEnhancing={isEnhancing}
              is360CameraWorking={is360CameraWorking}
              assemblePrompt={assemblePrompt}
              isAssembling={isAssembling}
            />

          {/* 出力結果 */}
          <Step4Panel
              outputRef={outputRef}
              currentStep={currentStep}
              isSearching={isSearching}
              isAnalyzing={isAnalyzing}
              isEnhancing={isEnhancing}
              finalPrompt={finalPrompt}
              copyPrompt={copyPrompt}
              assembleThought={assembleThought}
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
              punchlineType={punchlineType}
              colorMode={colorMode}
              enhanceExpressions={enhanceExpressions}
              enhanceBodyLang={enhanceBodyLang}
              enhanceEffects={enhanceEffects}
              enhanceBackgrounds={enhanceBackgrounds}
              enhanceCameraWork={enhanceCameraWork}
              enhanceDialogue={enhanceDialogue}
              SYSTEM_VERSION={SYSTEM_VERSION}
              isAssembling={isAssembling}
              regenerateImage={regenerateImage}
              isGeneratingImage={isGeneratingImage}
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
              genLogRef={genLogRef}
              genLog={genLog}
              imageResultRef={imageResultRef}
              generatedImage={generatedImage}
              isFullAutoMode={isFullAutoMode}
              fullAutoStep={fullAutoStep}
              mangaTitle={mangaTitle}
              isFallbackUsed={isFallbackUsed}
              enableOpenAIApi={enableOpenAIApi}
              setGeneratedImage={setGeneratedImage}
              generationHistory={generationHistory}
              setGenerationHistory={setGenerationHistory}
            />

            <GenerationHistory
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
            />
          
          </main >

        <footer className="text-center text-slate-500 text-[9px] font-bold tracking-[0.3em] uppercase py-10 px-4">
          &copy; 2026 FURU <span className="mx-2 sm:mx-4">|</span> NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM
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
