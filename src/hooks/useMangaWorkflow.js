import { getImageContentHash, buildReferenceRecognitionMetadata } from '../lib/generated-image-metadata.js';
import { beginApiWork, cancelApiWork } from '../lib/api-work-cancellation.js';
import { useState, useRef, useEffect } from 'react';

// --- Imports (paths adjusted from ./lib/ to ../lib/) ---
import { setApiKey } from '../lib/gemini';
import { GEMINI_IMAGE_MODEL } from '../lib/gemini-image-settings.js';
import { generateImageWithImagen } from '../lib/imagen';
import { assertRenderOptions, readRenderOptions } from '../lib/render-options.js';
import { collectCastNameEntries } from '../lib/panel-utils.js';
import { buildImageEditRequest } from '../lib/image-edit.js';
import { formatApiErrorGuide } from '../lib/api-errors.js';
import { generateImageWithOpenAI, setOpenAIApiKey } from '../lib/openai';
import {buildOpenAIReferencePlan, appendOpenAIReferencePrompt, getOpenAIPromptBodyBudget} from '../lib/openai-image-references.js';
import {buildGeminiReferencePlan, buildGeminiImageApiPrompt, appendGeminiReferencePrompt} from '../lib/gemini-image-references.js';
import { buildReferenceAnalysisPrompt, parseReferenceAnalysis, buildReferenceAssetContext, buildWebReferencePlan, buildRecognitionEditorText, parseRecognitionEditorText, reconcileReferenceCast, mergeReferenceAnalysis, getReferenceImagesToAnalyze, remapReferenceNumbers } from '../lib/reference-assets.js';
import { getImageInputBudget, assertImageInputBudget, planImageAddition } from '../lib/image-input-budget.js';
import { callAI, setActiveEngine } from '../lib/ai-provider';
import { reviewComedyPrompt } from '../lib/comedy-review';
import { assembleMangaPromptWithRecovery } from '../lib/prompt-assembly-recovery.js';
import { normalizeMangaColorMode, ensureMangaColorModeContract } from '../lib/manga-render-mode.js';
import { assertPromptEndingModeConsistency, getEndingModePolicy, isDocumentaryEnding, resolveScenarioEndingType } from '../lib/ending-mode-policy.js';
import { assertPrintableDialogue } from '../lib/bubble-text.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from '../lib/web-prompt-chunks.js';

// --- Refactored Imports (Phase 1-2) ---
import { SYSTEM_VERSION, DEFAULT_CATEGORIES, EMOTION_STYLES, DYNAMIC_CAMERA_PROTOCOL, ANTI_CHARSHEET_PREFIX } from '../lib/constants';
import { translateApiError } from '../lib/safety-filters';
import { get360AnalysisPrompt, parse360Analysis } from '../lib/panorama360';
import { isEquirectangularFile, readFileAsDataURL } from '../lib/input-files.js';
import { getCharacterAnalysisPrompt } from '../lib/prompts';
import {
  validateMangaPromptArtifact,
  PROMPT_PROVIDER_FAMILIES,
  normalizePromptProviderFamily
} from '../lib/prompt-assembler';
import { addGenerationHistoryItem, collectRecentScenarioOutcomes, getWorkflowStep } from '../lib/generation-history';
import { createFinalImageSaver } from '../lib/generated-image-save.js';
import { inspectImageDimensions, inspectNativeMonochromeChroma, extractMangaPanelCrops, normalizePageCandidate, formatPageLayoutStatus } from '../lib/manga-page-layout.js';
import { generateScenario, enhanceScenarioText } from '../lib/scenario-provider';
import { fixPolicyViolation } from '../lib/policy-fixer';
import { verifyApiKeyConnection } from '../lib/api-key-preflight';
import { clearApiSession, getApiSessionSnapshot } from '../lib/api-session';
import {
  formatMangaScenarioValidationIssue,
  validateMangaScenario
} from '../lib/scenario-validation';
import { formatGeneratedMangaTitle } from '../lib/manga-title';
import { isImagePolicyError } from '../lib/image-policy-error';
import { MAX_IMAGE_POLICY_RETRIES, retryImagePolicyGeneration } from '../lib/image-policy-retry.js';
import {
  buildImageQualityQaImageParts,
  buildBubbleInventoryPrompt,
  applyBubbleInventory,
  buildImageQualityQaPrompt,
  buildActorHandAuditPrompt,
  parseActorHandAuditResponse,
  extractPanelCastContracts,
  buildCriticalCameraQaRequest,
  parseCriticalCameraQaResponse,
  buildImageQualityComparisonPrompt,
  parseImageQualityComparison,
  formatImageQualityIssue,
  requestImageQualityQa
} from '../lib/image-quality-qa';
import { buildImageFailureAnalysisPrompt, formatImageQualityStopReason, GEMINI_IMAGE_REPAIR_PROMPT_MAX_CHARS, inferImageQualityMode, isMaterialImageQualityIssue, runImageQualityFailsafe } from '../lib/image-quality-failsafe';
import { getEffectiveEngine } from '../lib/engine-state';
import { DEFAULT_OPENAI_IMAGE_QUALITY, DEFAULT_OPENAI_IMAGE_SIZE, normalizeOpenAIImageSize, normalizeOpenAIImageQuality, resolveOpenAIImageOption, formatOpenAIImageEngineName, applyOpenAIImageEngineWatermark, selectInitialOpenAIImageQuality, isOpenAIImageVerificationError, OPENAI_IMAGE_VERIFICATION_MESSAGE } from '../lib/openai-image-settings.js';
import { DEFAULT_OPENAI_SCENARIO_MODEL_ID, OPENAI_SCENARIO_MODEL_OPTIONS, OPENAI_SCENARIO_TEXT_MODEL_IDS } from '../lib/openai-model-routes.js';

export default function useMangaWorkflow() {
  const [scenarioModelId, setScenarioModelIdState] = useState(DEFAULT_OPENAI_SCENARIO_MODEL_ID);
  const setScenarioModelId = (modelId) => {
    const nextModelId = OPENAI_SCENARIO_TEXT_MODEL_IDS.includes(modelId)
      ? modelId
      : DEFAULT_OPENAI_SCENARIO_MODEL_ID;
    setScenarioModelIdState(nextModelId);
  };
  const resetScenarioModelId = () => setScenarioModelId(DEFAULT_OPENAI_SCENARIO_MODEL_ID);
  const [openAIImageQuality, setOpenAIImageQualityState] = useState(DEFAULT_OPENAI_IMAGE_QUALITY);
  const [openAIImageSize, setOpenAIImageSizeState] = useState(DEFAULT_OPENAI_IMAGE_SIZE);
  const openAIImageQualityChosen = useRef(false);
  const setOpenAIImageSize = (value) => setOpenAIImageSizeState(normalizeOpenAIImageSize(value));
  const [openAIImageVerificationWarning, setOpenAIImageVerificationWarning] = useState('');
  const [allowImageQualityRepair, setAllowImageQualityRepair] = useState(true);
  const [imageQualityNeedsRepair, setImageQualityNeedsRepair] = useState(false);
  const qualityRetryAbortRef = useRef(false);
  const stopQualityRetries = () => { qualityRetryAbortRef.current = true; };
  const setOpenAIImageQuality = (value) => {
    openAIImageQualityChosen.current = true;
    setOpenAIImageQualityState(normalizeOpenAIImageQuality(value));
    setOpenAIImageVerificationWarning('');
  };
  // Force Build 2026-02-06 07:07 // Build 2026-02-06-01
  const initialApiSession = getApiSessionSnapshot();
  const [apiKey, setApiKeyState] = useState(initialApiSession.credentialPresent);
  const [showModal, setShowModal] = useState(false); // FIXEDCRITICAL RESTORE
  const [selectedEngine, setSelectedEngine] = useState(initialApiSession.provider || 'gemini'); // [v3.59] Dual Engine: 'gemini' | 'openai'
  const [inputMode, setInputMode] = useState("news"); // 'news' | 'manual'
  const [manualTopic, setManualTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [customLocation, setCustomLocation] = useState(''); // [v1.8.103] Custom Location Override
  const [customOutfit, setCustomOutfit] = useState(''); // [v1.8.103] Custom Outfit Override
  const [lockedLocation, setLockedLocation] = useState(''); // STEP2実行時に確定した場所
  const [lockedOutfit, setLockedOutfit] = useState('');     // STEP2実行時に確定した服装
  const [punchlineType, setPunchlineTypeState] = useState('Auto'); // [v3.31] Punchline Director
  const [resolvedPunchlineType, setResolvedPunchlineType] = useState('');
  const resolvedPunchlineTypeRef = useRef('');
  const updateResolvedPunchlineType = (value = '') => {
    const nextValue = String(value || '');
    resolvedPunchlineTypeRef.current = nextValue;
    setResolvedPunchlineType(nextValue);
  };
  const effectivePunchlineType = resolvedPunchlineType || punchlineType;

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  const toggleCategory = (id) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  // App State
  // Fix: Default to JST (UTC+9) to prevent "Yesterday" bug
  const getJSTDate = () => {
    const d = new Date();
    d.setHours(d.getHours() + 9);
    return d.toISOString().split('T')[0];
  };
  const [targetDate, setTargetDate] = useState(getJSTDate());
  const [castList, setCastListState] = useState("");
  const castRevisionRef = useRef(0);
  const castListRef = useRef('');
  const setCastList = (value) => {
    castRevisionRef.current += 1;
    castListRef.current = typeof value === 'function' ? value(castListRef.current) : value;
    setCastListState(castListRef.current);
  };
  const [scenario, setScenario] = useState("");
  const [explanation, setExplanation] = useState("");
  const [explanationNotice, setExplanationNotice] = useState("");
  const [mangaTitle, setMangaTitle] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");
  const promptAssemblyRunRef = useRef(0);
  const promptAssemblyAbortRef = useRef(null);
  useEffect(() => () => promptAssemblyAbortRef.current?.abort(), []);

  // [v1.7.0] Model Quality Indicator State
  const [usedModel, setUsedModel] = useState(null);
  // STEP 1 and STEP 2 both update the general UI badge. Keep the scenario
  // provenance synchronous and separate so full-auto STEP 2 -> STEP 3 cannot
  // stamp the previous character-analysis model into the manga footer.
  const scenarioUsedModelRef = useRef(null);
  const recentScenarioTextsRef = useRef([]);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  // Initialize System
  useEffect(() => {
    const session = getApiSessionSnapshot();
    if (!session.credentialPresent) {
      setApiKeyState(false);
      setShowModal(true);
      return;
    }

    const provider = session.provider || 'gemini';
    const useOpenAI = provider === 'openai';
    setApiKeyState(true);
    setActiveEngine(provider);
    setSelectedEngine(provider);
    setEnableOpenAIApi(useOpenAI);
    setEnableChatGPTMode(useOpenAI);
    setShowModal(false);
    setShowOpenAIKeyModal(false);
  }, []);

  // getModelBadgeInfo → src/lib/constants.js に移動済み
  const [images, setImagesState] = useState([]);
  const imagesRef = useRef([]);
  const [referenceAssets, setReferenceAssetsState] = useState([]);
  const referenceAssetsRef = useRef([]);
  const [recognitionDraft, setRecognitionDraft] = useState(null);
  const [referenceEditorError, setReferenceEditorError] = useState('');
  const setReferenceAssets = (assets) => {
    referenceAssetsRef.current = assets;
    setReferenceAssetsState(assets);
  };
  const setImages = (value) => {
    const next = typeof value === 'function' ? value(imagesRef.current) : value;
    if (next.length === imagesRef.current.length && next.every((image, index) => image === imagesRef.current[index])) return;
    const previousAssets = referenceAssetsRef.current;
    const nextAssets = next.map(image => previousAssets.find(asset => asset.image === image)
      || { image, items: [{ kind: 'unknown', name: '未解析の素材', description: 'AIによる素材認識は未確認。台本に合う視覚情報だけを使用する。' }] });
    const panorama = bg360EnabledRef.current && bg360ImageRef.current ? [bg360ImageRef.current] : [];
    invalidateReferenceOutputs([...imagesRef.current, ...panorama], [...next, ...panorama]);
    imagesRef.current = next;
    setImagesState(next);
    setCastList(reconcileReferenceCast(castListRef.current, previousAssets, nextAssets));
    setReferenceAssets(nextAssets);
    setImageInputError('');
  };
  const [imageInputError, setImageInputError] = useState('');
  const [styleJson, setStyleJson] = useState(null); // [v3.90] Style Analyzer Engine JSON

  // States for Steps
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const isAnalyzingRef = useRef(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false); // [v2.44] STEP4専用state（isAssemblingとの混同を防止）
  const [isGenerationError, setIsGenerationError] = useState(false);

  // Thoughts
  const [analyzeThought, setAnalyzeThought] = useState("");
  const [scenarioThought, setScenarioThought] = useState("");
  const [assembleThought, setAssembleThought] = useState("");

  const [status, setStatus] = useState("");
  const [colorMode, setColorModeState] = useState("color");
  const [mosaicCopyrightedCharacters, setMosaicCopyrightedCharactersState] = useState(true);
  const [showWatermarks, setShowWatermarksState] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [genLog, setGenLog] = useState([]); // New Log State

  // [v2.35] コンテンツポリシー救済パネル
  const [policyErrorMsg, setPolicyErrorMsg] = useState("");
  const [isFixingPolicy, setIsFixingPolicy] = useState(false);
  const [policyFixLog, setPolicyFixLog] = useState("");
  const [isPolicyPanelOpen, setIsPolicyPanelOpen] = useState(false);

  // [v4.2.0] コンテンツポリシー自動修正＆リトライ選択UI
  const [showPolicyChoice, setShowPolicyChoice] = useState(false); // 選択UIの表示制御
  const [policyAutoRetrying, setPolicyAutoRetrying] = useState(false); // 自動リトライ中フラグ
  const [policyPromptHistory, setPolicyPromptHistory] = useState([]);
  const MAX_POLICY_RETRIES = MAX_IMAGE_POLICY_RETRIES;
  const lastPolicyErrorRef = useRef(""); // 直近のポリシーエラーメッセージ（state更新待ち不要）

  // [v2.41] シナリオ強化パネル
  const [enhanceExpressions, setEnhanceExpressions] = useState(false); // 表情強化
  const [enhanceBodyLang, setEnhanceBodyLang] = useState(false);       // ボディランゲージ強化
  const [enhanceEffects, setEnhanceEffects] = useState(false);         // 照明・演出強化
  const [enhanceBackgrounds, setEnhanceBackgrounds] = useState(false); // 背景強化
  const [enhanceCameraWork, setEnhanceCameraWork] = useState(false);   // [v2.47] カメラワーク強化
  const [enhanceDialogue, setEnhanceDialogue] = useState(false);       // セリフ書き換え
  const [enhanceGag, setEnhanceGag] = useState(false);                 // ギャグの間・リアクション強化
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceLog, setEnhanceLog] = useState("");
  const [isEnhancePanelOpen, setIsEnhancePanelOpen] = useState(false);
  const [originalScenario, setOriginalScenario] = useState(""); // 強化前の原文保持用
  const [enableChatGPTMode, setEnableChatGPTMode] = useState(false); // [v2.61] ChatGPT Images 2.0 強化プロンプト
  const [enableOpenAIApi, setEnableOpenAIApi] = useState(false); // [v2.87] ChatGPT Images 2.0 API
  const [showOpenAIKeyModal, setShowOpenAIKeyModal] = useState(false); // [v2.88] Secure API key modal
  const [isCastListCopied, setIsCastListCopied] = useState(false);
  const [isScenarioCopied, setIsScenarioCopied] = useState(false);
  const [isMetaSaved, setIsMetaSaved] = useState(false); // [v3.46] メタデータ保存フィードバック

  // Legacy sessions can preserve one old flag across a hot update. Treat either
  // OpenAI signal as authoritative and immediately restore one coherent engine.
  const effectiveEngine = getEffectiveEngine(selectedEngine, enableOpenAIApi);
  const isOpenAIEngine = effectiveEngine === 'openai';
  useEffect(() => {
    if (isOpenAIEngine && selectedEngine !== 'openai') {
      setSelectedEngine('openai');
      setActiveEngine('openai');
    }
    if (isOpenAIEngine && !enableOpenAIApi) {
      setEnableOpenAIApi(true);
    }
    if (isOpenAIEngine && !enableChatGPTMode) {
      setEnableChatGPTMode(true);
    }
  }, [enableChatGPTMode, enableOpenAIApi, isOpenAIEngine, selectedEngine]);

  // [v3.48] 360度背景画像読み込み (Studio Shooting Protocol)
  const [bg360Image, setBg360ImageState] = useState(null);
  const bg360ImageRef = useRef(null);
  const setBg360Image = (image) => {
    if (image === bg360ImageRef.current) return;
    const previous = [...imagesRef.current, ...(bg360EnabledRef.current && bg360ImageRef.current ? [bg360ImageRef.current] : [])];
    bg360ImageRef.current = image;
    setBg360ImageState(image);
    invalidateReferenceOutputs(previous, [...imagesRef.current, ...(bg360EnabledRef.current && image ? [image] : [])]);
  };
  const [bg360ImageParts, setBg360ImageParts] = useState(null);       // Gemini API送信用パーツ
  const [bg360Analysis, setBg360Analysis] = useState(null);           // AI解析結果 {location, lighting, spatialType}
  const [is360Analyzing, setIs360Analyzing] = useState(false);        // 解析中フラグ
  const [bg360Enabled, setBg360EnabledState] = useState(false);
  const bg360EnabledRef = useRef(false);
  const setBg360Enabled = (value) => {
    const next = Boolean(typeof value === 'function' ? value(bg360EnabledRef.current) : value);
    try {
      if (next) assertImageInputBudget({ characterImages: imagesRef.current, backgroundEnabled: true });
    } catch (error) {
      setImageInputError(error.message);
      return false;
    }
    if (next === bg360EnabledRef.current) return true;
    const previous = [...imagesRef.current, ...(bg360EnabledRef.current && bg360ImageRef.current ? [bg360ImageRef.current] : [])];
    bg360EnabledRef.current = next;
    setBg360EnabledState(next);
    invalidateReferenceOutputs(previous, [...imagesRef.current, ...(next && bg360ImageRef.current ? [bg360ImageRef.current] : [])]);
    setImageInputError('');
    return true;
  };
  const imageInputBudget = getImageInputBudget({ characterImages: images, backgroundEnabled: bg360Enabled });
  const [bg360CameraWork, setBg360CameraWork] = useState(null);        // [v3.53] 360°カメラワーク設計結果 {panels: [{panel, camera, yaw, pitch, fov, reasoning}]}
  const [bg360CroppedPanels, setBg360CroppedPanels] = useState(null);   // [v3.53 Phase2] 各コマ用クロップ済み背景画像 [base64, base64, base64, base64]
  const [is360CameraWorking, setIs360CameraWorking] = useState(false);  // [v3.53] カメラワーク設計＋クロップ処理中フラグ（Step3ブロック用）

  // cropEquirectangular → src/lib/panorama360.js に移動済み

  // [v2.78] フルオート生成モード
  const [isFullAutoMode, setIsFullAutoMode] = useState(false); // フルオート実行中フラグ
  const isFullAutoModeRef = useRef(false);
  useEffect(() => {
    isFullAutoModeRef.current = isFullAutoMode;
  }, [isFullAutoMode]);
  const [isEndlessMode, setIsEndlessMode] = useState(false); // [v2.86] 無限ループ生成フラグ
  const isEndlessModeRef = useRef(false);
  const [fullAutoStep, setFullAutoStep] = useState(0); // 0=待機, 2=STEP2, 3=STEP3, 4=STEP4
  // eslint-disable-next-line no-unused-vars
  const [fullAutoCountdown, setFullAutoCountdown] = useState(0); // カウントダウン表示用
  const [triggerFullAuto, setTriggerFullAuto] = useState(0); // [v2.78] Effect Trigger
  const fullAutoAbortRef = useRef(false); // 中断フラグ（useRefで即時反映）
  const scenarioRunEpochRef = useRef(0); // Late STEP2/STEP3 results may update only their current run.
  const [isAborting, setIsAborting] = useState(false); // 中断処理中フラグ
  // [v2.78] 自動スクロール用Ref
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const outputRef = useRef(null);
  const imageResultRef = useRef(null);
  const genLogRef = useRef(null); // [v2.88] Auto-scroll for Image Gen Log

  // [v2.88] Auto-scroll genLog terminal
  useEffect(() => {
    if (genLogRef.current) {
      genLogRef.current.scrollTop = genLogRef.current.scrollHeight;
    }
  }, [genLog]);

  // Logic centralization for v1.4.9
  const isAssembleDisabled = isAssembling || !castList || castList.length < 20 || !scenario || scenario.length < 20 || isSearching || isAnalyzing || Boolean(referenceEditorError);

  const recognitionPanorama = bg360Enabled && bg360Analysis ? bg360Analysis : null;
  const recognitionText = recognitionDraft ?? buildRecognitionEditorText(castList, referenceAssets, images, recognitionPanorama);
  const setRecognitionText = (text) => {
    setRecognitionDraft(text);
    try {
      const parsed = parseRecognitionEditorText(text, imagesRef.current, recognitionPanorama, referenceAssetsRef.current);
      setCastList(parsed.castList);
      setReferenceAssets(parsed.assets);
      if (parsed.background) setBg360Analysis(parsed.background);
      setReferenceEditorError('');
      invalidatePromptAssembly();
      setFinalPrompt('');
    } catch (error) {
      setReferenceEditorError(error.message);
    }
  };

  // Image Generation
  const [generatedImage, setGeneratedImage] = useState("");
  const [imageEditDrafts, setImageEditDrafts] = useState({});
  const setImageEditDraft = (image, text) => setImageEditDrafts(previous => ({ ...previous, [image]: text }));
  const imageEditRunRef = useRef(null);
  const [generationHistory, setGenerationHistory] = useState([]); // [v2.86] Generated Image History
  const finalImageSaverRef = useRef(null);
  const autoSaveFinalImage = async (item, isCurrent) => {
    finalImageSaverRef.current ||= createFinalImageSaver();
    try {
      const result = await finalImageSaverRef.current(item, SYSTEM_VERSION, isCurrent);
      if (result === 'stale') return false;
      if (result === 'requested') setGenLog(lines => [...lines,
        '[自動保存] 制作情報入りPNGのダウンロードを開始しました。ブラウザーのダウンロード一覧で完了を確認してください。']);
      return true;
    } catch (error) {
      if (!isCurrent()) return false;
      fullAutoAbortRef.current = true;
      setIsGenerationError(true);
      setGenLog(lines => [...lines, `[保存エラー] ${error.message} 生成画像は保持しています。「保存先を選んで保存」から保存してください。`]);
      showStatus('自動保存の準備に失敗したため、自動進行を停止しました。生成画像は保持しています。');
      return false;
    }
  };

  const invalidatePromptAssembly = () => {
    promptAssemblyRunRef.current += 1;
    promptAssemblyAbortRef.current?.abort();
    promptAssemblyAbortRef.current = null;
    setIsAssembling(false);
  };

  const finishScenarioTiming = (epoch, outcome) => {
    const timing = scenarioRunEpochRef.timing;
    if (!timing || timing.epoch !== epoch) return;
    scenarioRunEpochRef.timing = null;
    const elapsed = Math.max(0, Date.now() - timing.startedAt);
    setScenarioThought(prev => `${prev.replace(/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/g, '')}\n> [STEP2 TIME] ${outcome}: ${(elapsed / 1000).toFixed(3)}秒`);
  };

  const invalidateScenarioRun = (reason = '中断（入力変更・リセット時点）') => {
    finishScenarioTiming(scenarioRunEpochRef.current, reason);
    scenarioRunEpochRef.current += 1;
    invalidatePromptAssembly();
    qualityRetryAbortRef.current = true;
    // The invalidating action owns cleanup. Obsolete finally blocks must not
    // clear a successor's busy state when their requests eventually settle.
    setIsSearching(false);
    setIsAnalyzing(false);
    isAnalyzingRef.current = false;
    setIs360Analyzing(false);
    setIsEnhancing(false);
    setIs360CameraWorking(false);
    setIsGeneratingImage(false);
    setIsFixingPolicy(false);
    setPolicyAutoRetrying(false);
    return scenarioRunEpochRef.current;
  };

  // Material identity is the boundary for every dependent run, including Web
  // attachment instructions. History remains intact; old active output cannot
  // silently become a result for a different set of references.
  const invalidateReferenceOutputs = (previousImages, nextImages) => {
    cancelApiWork();
    invalidateScenarioRun('素材変更');
    fullAutoAbortRef.current = true;
    isFullAutoModeRef.current = false;
    isEndlessModeRef.current = false;
    scenarioRunEpochRef.fullAutoRun = (scenarioRunEpochRef.fullAutoRun || 0) + 1;
    setIsFullAutoMode(false);
    setIsEndlessMode(false);
    setFullAutoStep(0);
    setIsAborting(false);
    if (previousImages && nextImages) setManualTopic(text => remapReferenceNumbers(text, previousImages, nextImages));
    setScenario('');
    setOriginalScenario('');
    setExplanation('');
    setExplanationNotice('');
    setMangaTitle('');
    setFinalPrompt('');
    setGeneratedImage(null);
    setBg360CameraWork(null);
    setBg360CroppedPanels(null);
    setIsCastListCopied(false);
    setIsScenarioCopied(false);
    setIsMetaSaved(false);
  };

  const editReferenceItem = (image, itemIndex, field, value) => {
    if (!['name', 'description'].includes(field)) return;
    invalidateReferenceOutputs();
    setReferenceAssets(referenceAssetsRef.current.map(asset => asset.image !== image ? asset : {
      ...asset, items: asset.items.map((item, index) => index !== itemIndex ? item : { ...item, [field]: value, userEdited: true }),
    }));
  };
  const editCastList = (text) => {
    invalidateReferenceOutputs();
    setCastList(text);
  };
  const editBackground = (field, value) => {
    if (!['location', 'lighting', 'spatialType', 'objects', 'mood'].includes(field)) return;
    invalidateReferenceOutputs();
    setBg360Analysis(previous => ({ ...previous, [field]: value }));
  };

  const invalidateScenarioOutput = () => {
    invalidateScenarioRun();
    invalidatePromptAssembly();
    qualityRetryAbortRef.current = true;
    setFinalPrompt("");
    setGeneratedImage(null);
    setIsGeneratingImage(false);
    setIsFixingPolicy(false);
    setPolicyAutoRetrying(false);
  };

  const setScenarioFromUser = (nextScenario) => {
    invalidateScenarioRun();
    invalidatePromptAssembly();
    qualityRetryAbortRef.current = true;
    fullAutoAbortRef.current = true;
    isFullAutoModeRef.current = false;
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    setIsAborting(false);
    setIsSearching(false);
    setIsAssembling(false);
    setIsGeneratingImage(false);
    setIsFixingPolicy(false);
    setPolicyAutoRetrying(false);
    updateResolvedPunchlineType('');
    setScenario(nextScenario);
    setFinalPrompt("");
    setGeneratedImage(null);
  };

  const setPunchlineType = (value) => {
    const nextPunchlineType = String(value || 'Auto');
    if (nextPunchlineType === punchlineType && !resolvedPunchlineTypeRef.current) return;
    invalidateScenarioRun();
    qualityRetryAbortRef.current = true;
    invalidatePromptAssembly();
    fullAutoAbortRef.current = true;
    isFullAutoModeRef.current = false;
    setPunchlineTypeState(nextPunchlineType);
    updateResolvedPunchlineType('');
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    setIsAborting(false);
    setIsSearching(false);
    setIsAssembling(false);
    setIsGeneratingImage(false);
    setIsFixingPolicy(false);
    setPolicyAutoRetrying(false);
    setScenario("");
    setExplanation("");
    setExplanationNotice("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setScenarioThought("");
    setAssembleThought("");
    setGenLog([]);
    setOriginalScenario("");
    setEnhanceLog("");
    showStatus('結末モードを変更しました。STEP2からシナリオを作り直してください。');
  };

  const getCurrentPromptProviderFamily = () => (
    isOpenAIEngine
      ? PROMPT_PROVIDER_FAMILIES.CHATGPT
      : PROMPT_PROVIDER_FAMILIES.GEMINI
  );


  const handleSetKey = async (key) => {
    showStatus("APIキーを検証中です...");
    const verification = await verifyApiKeyConnection(key);
    if (!verification.ok) {
      if (verification.failureKind === 'transient') {
        showStatus(`一時的な接続エラーです。入力は保持されています: ${verification.message}`);
        return verification;
      }

      clearApiSession();
      setApiKeyState(false);
      setApiKey("");
      setOpenAIApiKey("");
      setEnableOpenAIApi(false);
      setEnableChatGPTMode(false);
      setActiveEngine('gemini');
      setSelectedEngine('gemini');
      showStatus(`APIキー検証失敗: ${verification.message}`);
      return verification;
    }
    key = verification.sanitizedKey;
    // APIキーのサニタイズ: 非ASCII文字を除去（コピペ時の見えない文字対策）
    const cleanKey = key.replace(/[^\u0000-\u007F]/g, "").trim();
    if (cleanKey !== key) {
      showStatus("APIキーに含まれる不要な文字を自動削除しました。");
    }

    // [v3.59] Dual Engine: APIキーのプレフィックスでエンジンを自動判定
    if (cleanKey.startsWith("sk-")) {
      // OpenAI APIキー → ChatGPTエンジンに切り替え
      if (!openAIImageQualityChosen.current) {
        setOpenAIImageQualityState(selectInitialOpenAIImageQuality(verification.availableModelIds));
      }
      setOpenAIImageVerificationWarning('');
      setOpenAIApiKey(cleanKey);
      setActiveEngine('openai');
      setSelectedEngine('openai');
      setEnableOpenAIApi(true); // 画像生成もOpenAI経由に
      setEnableChatGPTMode(true); // プロンプトもChatGPT最適化
      setApiKeyState(true);
      setShowModal(false);
      setShowOpenAIKeyModal(false);
      showStatus("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。");
      console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode");
    } else {
      // Gemini APIキー → 従来のGeminiエンジン（デフォルト）
      setApiKey(cleanKey);
      setApiKeyState(true);
      setActiveEngine('gemini');
      setSelectedEngine('gemini');
      setShowModal(false);
      setShowOpenAIKeyModal(false);
      showStatus("✅ Gemini Engine 接続完了！キャラクターシートをアップロードして開始してください。");
      console.log("[Dual Engine] Using Gemini mode (default)");
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const showStatus = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 4000);
  };

  // validate360Image → src/lib/panorama360.js に移動済み


  const processFiles = async (files) => {
    // API KEY CHECK
    if (!apiKey) {
      showStatus("先にAPIキーを入力してシステムに接続してください！");
      setShowModal(true);
      return;
    }
    if (files.length === 0) return;
    if (isAnalyzingRef.current) {
      showStatus('キャラクター解析が終わってから追加してください。');
      return;
    }
    setImageInputError('');
    isAnalyzingRef.current = true;
    let inputEpoch = scenarioRunEpochRef.current;
    let castRevisionAtStart = castRevisionRef.current;

    // 非同期処理に入る前に、現在のキャストリストの値を保持しておく（累積・マージ用）
    let currentCastList = castListRef.current;
    const armedFullAuto = isFullAutoModeRef.current && !scenario && !finalPrompt && !isSearching && !isGeneratingImage;
    const armedEndless = armedFullAuto && isEndlessModeRef.current;

    setIsAnalyzing(true);
    setAnalyzeThought('制作素材の認識を開始しました。人物・表情集・三面図・背景・小物をまとめて確認します。');

    // [v2.44] フェイクストリーミング＋経過時間表示（フォールバック待ち中にハングアップに見えない対策）
    // モデルフォールバック時もタイマーが継続するように、APIコールバック後も常に経過時間を更新する
    let thinkTickCount = 0;
    const thinkTimer = setInterval(() => {
      if (inputEpoch !== scenarioRunEpochRef.current) return;
      thinkTickCount++;
      setAnalyzeThought(prev => {
        // それ以降は経過時間をカウンター表示（上書き方式で行を増やさない）
        const elapsed = Math.floor(thinkTickCount * 0.8);
        // 既存の経過表示行を更新（なければ追加）
        // [v2.44] APIコールバックが挿入されても、末尾のタイマー行を正確に更新する
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
        // [v2.44 Fix] APIコールバックが⏳行のあとにメッセージを追加した場合でも
        // 常に末尾に表示されるよう、既存⏳行を削除してから末尾に再追加する
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    let imageArray = [];
    let detected360File = null; // [v3.48] 360度画像自動検出用
    let detectedStyleJson = null; // [v3.90] 作風JSON

    try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // [v3.90] 作風JSONのチェック
      if (file.name.endsWith('.json') || file.type === 'application/json') {
        try {
          const text = await file.text();
          if (inputEpoch !== scenarioRunEpochRef.current) return;
          const json = JSON.parse(text);
          if (json.style_name && json.reproduction_prompt) {
            detectedStyleJson = json;
            setAnalyzeThought(prev => prev + `\n> 🎭 作風JSONを検出: ${json.style_name}`);
          } else {
            showStatus("⚠️ 無効なJSONです。作風解析エンジンの出力を使用してください。");
            setAnalyzeThought(prev => prev + `\n> ⚠️ 読み込まれたJSONは作風解析エンジン用ではありませんでした。`);
          }
        } catch {
          showStatus("⚠️ JSONファイルの読み込みに失敗しました。");
        }
        continue;
      }

      // [v3.48] アスペクト比2:1チェック ＆ XMPメタデータ判定（360度 equirectangular判定）
      const is360 = await isEquirectangularFile(file);
      const dataUrl = await readFileAsDataURL(file);
      if (inputEpoch !== scenarioRunEpochRef.current) return;
      if (is360 && !detected360File) {
        detected360File = { base64: dataUrl, mimeType: file.type };
        setAnalyzeThought(prev => prev + `\n> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`);
      } else {
        imageArray.push(dataUrl);
      }
    }

    // Check the complete addition before changing images, style or background, or calling an API.
    const addition = planImageAddition({
      existingImages: imagesRef.current,
      incomingImages: imageArray,
      backgroundEnabled: bg360EnabledRef.current || Boolean(detected360File),
    });
    imageArray = addition.addedImages;
    setImages(addition.images);
    if (detectedStyleJson) {
      setStyleJson(detectedStyleJson);
      showStatus(`作風を適用: ${detectedStyleJson.style_name}`);
    }

    if (detected360File) {
      setBg360Image(detected360File.base64);
      setBg360Enabled(true);
      setBg360Analysis(null);
    }
    const analysisImages = getReferenceImagesToAnalyze(addition.images, referenceAssetsRef.current);
    if (analysisImages.length || detected360File || detectedStyleJson) invalidateReferenceOutputs();
    inputEpoch = scenarioRunEpochRef.current;
    castRevisionAtStart = castRevisionRef.current;
    currentCastList = castListRef.current;
    isAnalyzingRef.current = true;
    setIsAnalyzing(true);
    if (armedFullAuto) {
      fullAutoAbortRef.current = false;
      isFullAutoModeRef.current = true;
      setIsFullAutoMode(true);
      isEndlessModeRef.current = armedEndless;
      setIsEndlessMode(armedEndless);
    }
    beginApiWork();

    // [v3.50] 360度画像が検出された場合、バックグラウンドで空間解析を実行
    // ※ v3.48時点ではこのブロックがtry-catchの外にあり、さらに bg360Enabled state が未定義だったため
    //    ReferenceErrorで processFiles 全体が即死し、isAnalyzingもthinkTimerもクリーンアップされなかった。
    if (detected360File) {
      try {
        const base64Data = detected360File.base64.split(',')[1];
        const imagePart = {
          inlineData: { mimeType: detected360File.mimeType, data: base64Data }
        };
        setBg360ImageParts(imagePart);

        setIs360Analyzing(true);
        setAnalyzeThought(prev => prev + `\n> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);
        const analysisResult = await callAI(get360AnalysisPrompt(), [imagePart], null, () => {});
        if (inputEpoch !== scenarioRunEpochRef.current) return;
        const analysis = parse360Analysis(analysisResult.text);
        setBg360Analysis(analysis);
        setCustomLocation(analysis.location);
        showStatus(`🌐 360°背景を検出: ${analysis.location}`);
        setAnalyzeThought(prev => prev + `\n> 🌐 空間解析完了: ${analysis.location}`);
      } catch (err) {
        if (inputEpoch !== scenarioRunEpochRef.current) return;
        console.warn('[360° BG] Analysis failed:', err);
        setBg360Analysis(null);
        setBg360Enabled(false);
        inputEpoch = scenarioRunEpochRef.current;
        isAnalyzingRef.current = true;
        setIsAnalyzing(true);
        beginApiWork();
        setCustomLocation('');
        showStatus('360°背景の空間解析に失敗しました。画像を確認して再試行してください。');
      } finally {
        if (inputEpoch === scenarioRunEpochRef.current) setIs360Analyzing(false);
      }
    }

    if (analysisImages.length === 0 && detected360File) {
      // 360度画像のみドロップされた場合はキャラシート解析をスキップ
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
      setAnalyzeThought(prev => prev + `\n> 🌐 360°背景の取り込み処理が終了しました。通常素材は保持され、後から追加もできます。`);
      showStatus('360°背景の取り込み処理が終了しました。通常素材は後から追加できます。');
      return;
    }
    if (analysisImages.length === 0) {
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
      if (detectedStyleJson) {
        setAnalyzeThought(prev => prev + `\n> ✅ 作風JSONを読み込みました。`);
      }
      return;
    }

    showStatus(`制作素材${analysisImages.length}枚をまとめて認識中...${detected360File ? '（+ 360°背景1枚検出済み）' : ''}`);

      // Map all images to Gemini API parts
      const imageParts = analysisImages.map(img => {
        const base64Data = img.split(',')[1];
        const mimeType = img.split(';')[0].split(':')[1];
        return {
          inlineData: { mimeType, data: base64Data }
        };
      });

      // キャラクター解析プロンプト（テンプレートは prompts.js に外部化済み）
      const prompt = buildReferenceAnalysisPrompt(getCharacterAnalysisPrompt(), analysisImages.length, currentCastList);

      const result = await callAI(prompt, imageParts, null, (msg) => {
        if (inputEpoch === scenarioRunEpochRef.current) setAnalyzeThought(prev => prev + `\n> ${msg}`);
      });
      if (inputEpoch !== scenarioRunEpochRef.current) return;
      if (castRevisionAtStart !== castRevisionRef.current) {
        showStatus('解析中にキャストが編集されたため、解析結果の上書きを中止しました。必要なら画像を再解析してください。');
        return;
      }
      const analysis = parseReferenceAnalysis(result.text, analysisImages, currentCastList);
      if (addition.images.length !== imagesRef.current.length || addition.images.some((image, index) => image !== imagesRef.current[index])) {
        showStatus('解析中に素材が変更されたため、結果の上書きを中止しました。必要なら素材を再解析してください。');
        return;
      }
      const previousAssets = referenceAssetsRef.current;
      const mergedAssets = mergeReferenceAnalysis(previousAssets, analysis, addition.images);
      setCastList(reconcileReferenceCast(castListRef.current, previousAssets, mergedAssets));
      setReferenceAssets(mergedAssets);
      setUsedModel(result.model); // [v1.7.0] Track Model
      // [v2.42] 蓄積ログを保持し、完了メッセージとThinking Traceを追記（上書きしない）
      setAnalyzeThought(prev => {
        const separator = "\n\n--- ✅ 解析完了 ---\n";
        const thoughtTrace = result.thought && result.thought !== "通常処理が完了しました（思考トレースは利用不可）。"
          ? `> [思考トレース]\n${result.thought}`
          : "> 通常処理が完了しました（思考トレースは利用不可）。";
        return prev + separator + thoughtTrace;
      });
      showStatus('素材の認識が完了しました。認識結果をシナリオ・描画指示・Web貼付文へ引き継ぎます。');

      // [v2.78] フルオート武装中なら自動的にSTEP2→3→4を開始
      if (isFullAutoModeRef.current) {
        if (!fullAutoAbortRef.current) {
          setTriggerFullAuto(prev => prev + 1);
        } else {
          setIsFullAutoMode(false);
          setFullAutoStep(0);
          setIsAborting(false);
          showStatus("⏹ フルオートを中断しました。");
        }
      }
    } catch (error) {
      if (inputEpoch !== scenarioRunEpochRef.current) return;
      console.error(error);
      if (/API Key is not set|OpenAI APIキーが設定されていません/.test(String(error.message || ''))) {
        setShowOpenAIKeyModal(true);
      }
      if (error.code === 'IMAGE_INPUT_LIMIT') setImageInputError(error.message);
      const translatedMsg = translateApiError(error);
      setAnalyzeThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("解析エラー: " + error.message);
      if (isFullAutoModeRef.current) {
        setIsFullAutoMode(false);
        setFullAutoStep(0);
        setIsAborting(false);
      }
    } finally {
      clearInterval(thinkTimer);
      if (inputEpoch === scenarioRunEpochRef.current) {
        setIsAnalyzing(false);
        isAnalyzingRef.current = false;
      }
    }
  };

  // --- Step 2.5: Scenario Enhancement (v2.41) ---
  // シナリオ強化機能: 選択されたカテゴリに基づいてシナリオの演出を強化する
  const enhanceScenario = async () => {
    if (referenceEditorError) return showStatus(referenceEditorError);
    beginApiWork();
    if (!scenario || scenario.length < 20) return showStatus("先にシナリオを生成してください。");
    const anySelected = enhanceExpressions || enhanceBodyLang || enhanceEffects || enhanceBackgrounds || enhanceCameraWork || enhanceDialogue || enhanceGag;
    if (!anySelected) return showStatus("少なくとも1つの強化カテゴリをONにしてください。");
    if (isEnhancing) return;
    const enhanceEpoch = scenarioRunEpochRef.current;

    setIsEnhancing(true);
    setEnhanceLog("> [START] シナリオ強化を開始します...");

    // 強化前の原文を保存（初回のみ。既に保存済みなら上書きしない）
    if (!originalScenario) {
      setOriginalScenario(scenario);
      setEnhanceLog(prev => prev + "\n> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）");
    }

    const selectedCategories = [
      enhanceExpressions && 'expressions',
      enhanceBodyLang && 'body',
      enhanceEffects && 'effects',
      enhanceBackgrounds && 'background',
      enhanceCameraWork && 'camera',
      enhanceDialogue && 'dialogue',
      enhanceGag && 'gag'
    ].filter(Boolean);

    setEnhanceLog(prev => prev + `\n> [CONFIG] 強化カテゴリ: ${selectedCategories.join(', ')}`);

    let enhanceTickCount = 0;
    const enhanceTimer = setInterval(() => {
      if (enhanceEpoch !== scenarioRunEpochRef.current) return;
      enhanceTickCount++;
      setEnhanceLog(prev => {
        const elapsed = Math.floor(enhanceTickCount * 0.8);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    try {
      setEnhanceLog(prev => prev + `\n> [API] ${isOpenAIEngine ? 'OpenAI' : 'Gemini'} にシナリオ強化をリクエスト中...`);
      const result = await enhanceScenarioText({
        scenario,
        referenceAssetContext: buildReferenceAssetContext(referenceAssetsRef.current, imagesRef.current, { panorama: bg360Enabled ? bg360Analysis : null }),
        selectedCategories,
        punchlineType: resolvedPunchlineTypeRef.current || punchlineType,
        castList,
        styleJson,
        scenarioModelId,
        onProgress: (msg) => {
          if (enhanceEpoch === scenarioRunEpochRef.current) setEnhanceLog(prev => prev + `\n> [API] ${msg}`);
        }
      });
      if (enhanceEpoch !== scenarioRunEpochRef.current) return;

      if (result && result.text && (result.validation?.ok || result.validationWarning)) {
        invalidateScenarioOutput();
        setScenario(result.text);
        setEnhanceLog(prev => {
          const retryInfo = result.attempts > 1 ? ` / 自動修正 ${result.attempts - 1}回` : '';
          const warningLog = result.validationWarning
            ? `\n> [WARNING] 強化品質の再試行上限に達したため、${result.fallbackToOriginal ? '元のシナリオ' : '最良の安全候補'}を保持してSTEP3へ進めます: ${result.validation?.issueCodes?.join(', ') || 'quality_check'}`
            : '';
          const successLabel = result.fallbackToOriginal ? '元のシナリオを保持しました' : '選択カテゴリだけを強化しました';
          const baseLog = prev + `\n> [SUCCESS] ${successLabel}（${result.text.length}文字${retryInfo}）${warningLog}\n> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`;
          if (result.thought) {
            const separator = "\n\n--- ✅ シナリオ強化完了 (思考トレース) ---\n";
            return baseLog + separator + result.thought;
          }
          return baseLog;
        });
        setEnhanceExpressions(false);
        setEnhanceBodyLang(false);
        setEnhanceEffects(false);
        setEnhanceBackgrounds(false);
        setEnhanceCameraWork(false);
        setEnhanceDialogue(false);
        setEnhanceGag(false);
        showStatus(result.validationWarning ? "強化品質の警告がありますが、STEP3へ進めます" : "シナリオ強化完了！");
      } else {
        setEnhanceLog(prev => prev + "\n> [ERROR] AIの応答が短すぎます。もう一度お試しください。");
        showStatus("強化失敗: AIの応答が不十分です");
      }
    } catch (error) {
      if (enhanceEpoch !== scenarioRunEpochRef.current) return;
      setEnhanceLog(prev => prev + `\n> [ERROR] ${error.message}`);
      showStatus("強化エラー: " + error.message);
    } finally {
      clearInterval(enhanceTimer);
      if (enhanceEpoch === scenarioRunEpochRef.current) setIsEnhancing(false);
    }
  };

  // シナリオを強化前の原文に復元する
  const revertScenario = () => {
    if (originalScenario) {
      invalidateScenarioOutput();
      setScenario(originalScenario);
      setOriginalScenario("");
      setEnhanceLog(prev => prev + "\n> [REVERT] 元のシナリオに復元しました。");
      showStatus("シナリオを元に戻しました");
    }
  };

  // --- Step 2: Scenario ---
  const generateScenarioFromNews = async (categoriesOverride, inputModeOverride = null) => {
    if (referenceEditorError) return showStatus(referenceEditorError);
    beginApiWork();
    if (!castList) return showStatus("先にキャラクターを解析してください。");
    if (isSearching) return;

    const effectiveCategories = Array.isArray(categoriesOverride) ? categoriesOverride : categories;
    const effectiveInputMode = inputModeOverride || inputMode;

    if (effectiveInputMode === 'manual' && !manualTopic.trim()) {
      alert("自由入力トピックを入力してください。");
      return;
    }
    if (effectiveInputMode === 'news' && !effectiveCategories.find(c => c.checked)) {
      alert("少なくとも1つのカテゴリを選択してください。");
      return;
    }

    const scenarioRunEpoch = invalidateScenarioRun();
    setIsSearching(true);
    setExplanation("");
    setExplanationNotice("");
    setScenarioThought("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setAssembleThought("");
    setGenLog([]);
    setOriginalScenario("");
    setEnhanceLog("");
    updateResolvedPunchlineType('');
    scenarioUsedModelRef.current = null;

    if (effectiveInputMode === 'manual') {
      setScenario("");
      setScenarioThought(`> コンテキスト強制リブート: 開始\n > モード: 手動入力 \n > 対象: ${manualTopic.substring(0, 30)}...`);
    } else {
      const activeCats = effectiveCategories.filter(c => c.checked);
      if (activeCats.length > 0) {
        const categoryKeywords = activeCats.map(c => c.keywords).join(' ');
        showStatus(`カテゴリ「${activeCats.map(c => c.label).join('・')}」で最新ニュースを検索中... (${targetDate})`);
        setScenario("");
        const searchProvider = isOpenAIEngine ? 'OpenAI Web Search' : 'Google Grounding';
        setScenarioThought(`> コンテキスト強制リブート: 開始\n > 対象カテゴリ: ${activeCats.map(c => c.label).join('、')} (キーワード: ${categoryKeywords}) \n > 対象日付: ${targetDate} \n > ${searchProvider} で検索中...`);
      }
    }

    const scenarioStartedAt = Date.now();
    scenarioRunEpochRef.timing = { epoch: scenarioRunEpoch, startedAt: scenarioStartedAt };
    let scenarioOutcome = '失敗';
    const scenarioTimer = setInterval(() => {
      setScenarioThought(prev => {
        if (scenarioRunEpoch !== scenarioRunEpochRef.current) return prev;
        const elapsed = Math.floor((Date.now() - scenarioStartedAt) / 1000);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    try {
      const result = await generateScenario({
        recentScenarios: collectRecentScenarioOutcomes([scenario, ...recentScenarioTextsRef.current,
          ...generationHistory.map(item => item.metadataContext?.scenario)]),
        mosaicCopyrightedCharacters,
        castList,
        categories: effectiveCategories,
        referenceAssetContext: buildReferenceAssetContext(referenceAssetsRef.current, imagesRef.current, { panorama: bg360Enabled ? bg360Analysis : null }),
        inputMode: effectiveInputMode,
        manualTopic,
        searchTopic,
        targetDate,
        customLocation,
        customOutfit,
        punchlineType,
        bg360Image,
        bg360Analysis,
        bg360Enabled,
        bg360ImageParts,
        styleJson,
        scenarioModelId,
        onProgress: (msg) => {
          if (scenarioRunEpoch !== scenarioRunEpochRef.current) return;
          setScenarioThought(prev => prev + `\n > [API] ${msg} `);
        },
        onCameraProgress: (msg) => {
          if (scenarioRunEpoch !== scenarioRunEpochRef.current) return;
          if (msg.startsWith("🎬")) {
            setScenarioThought(prev => prev + `\n > ${msg}`);
            if (msg.includes("開始")) {
              setIs360CameraWorking(true);
            } else if (msg.includes("完了") || msg.includes("失敗")) {
              setIs360CameraWorking(false);
            }
          } else {
            setScenarioThought(prev => prev + `\n > [Camera AI] ${msg}`);
          }
        }
      });

      if (scenarioRunEpoch !== scenarioRunEpochRef.current) {
        return null;
      }

      updateResolvedPunchlineType(result.resolvedEndingType || punchlineType);
      setExplanation(result.explanation?.text || "");
      setExplanationNotice(result.explanation?.notice || "解説を取得できませんでした。手入力できます。");
      scenarioUsedModelRef.current = result.usedModel;
      setUsedModel(result.usedModel);
      setScenarioThought(prev => prev + `\n > [MODEL] 最終採用モデル: ${result.usedModel}`);
      const resolvedLocation = customLocation.trim() || String(result.location || '').trim();
      setLockedLocation(resolvedLocation);
      setLockedOutfit(customOutfit.trim() || result.outfit || "");

      if (result.cameraWork) {
        setBg360CameraWork(result.cameraWork);
        const yawToDirection = (yaw) => {
          const dirs = ['北(正面)', '北東', '東(右)', '南東', '南(背面)', '南西', '西(左)', '北西'];
          return dirs[Math.round(((yaw % 360 + 360) % 360) / 45) % 8];
        };
        const shotTypeJa = (type) => {
          const map = { 'establishing_shot': 'ロングショット', 'wide_shot': 'ワイドショット', 'medium_shot': 'ミドルショット', 'close_up': 'クローズアップ', 'extreme_close_up': '超クローズアップ', 'over_the_shoulder': '肩越しショット', 'bird_eye': '俯瞰', 'worm_eye': 'アオリ' };
          return map[type] || type;
        };

        let cwDisplayLines = '\n > 🎬 ══════ 360° カメラワーク設計完了 ══════';
        result.cameraWork.panels.forEach(p => {
          cwDisplayLines += `\n > 🎬 コマ${p.panel}: ${yawToDirection(p.yaw)} (yaw:${p.yaw}°) / ${shotTypeJa(p.camera)} / FOV:${p.fov}°`;
          cwDisplayLines += `\n >    └─ ${p.reasoning}`;
        });
        cwDisplayLines += '\n > 🎬 ══════════════════════════════════';
        setScenarioThought(prev => prev + cwDisplayLines);
      }

      if (result.croppedPanels) {
        setBg360CroppedPanels(result.croppedPanels);
        setScenarioThought(prev => prev + `\n > 🔲 [Crop] ✅ ${result.croppedPanels.length}枚のクロップ画像を生成しました`);
      }

      const loglineLine = result.logline ? `\nLogline: ${result.logline}` : '';
      const visualEvidenceLine = result.visualEvidence ? `\nVisualEvidence: ${result.visualEvidence}` : '';
      const outfitLine = (customOutfit.trim() || result.outfit) ? `\nOutfit: ${customOutfit.trim() || result.outfit}` : '';
      const punchlineLine = result.punchline ? `\nPunchline: ${result.punchline}` : '';
      const bg360HeaderLine = bg360Image
        ? (bg360Enabled
          ? `\n🌐 360°背景: ON (${bg360Analysis?.location || '解析済み'} / ${bg360Analysis?.spatialType === 'indoor' ? '室内' : bg360Analysis?.spatialType === 'outdoor' ? '屋外' : '複合'}) — 添付ファイル: STEP1の参照素材＋360°背景画像`
          : `\n🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`)
        : '';

      let cameraWorkHeaderLine = '';
      if (result.cameraWork) {
        const yawToDirection = (yaw) => {
          const dirs = ['北(正面)', '北東', '東(右)', '南東', '南(背面)', '南西', '西(左)', '北西'];
          return dirs[Math.round(((yaw % 360 + 360) % 360) / 45) % 8];
        };
        const shotTypeJa = (type) => {
          const map = { 'establishing_shot': 'ロングショット', 'wide_shot': 'ワイドショット', 'medium_shot': 'ミドルショット', 'close_up': 'クローズアップ', 'extreme_close_up': '超クローズアップ', 'over_the_shoulder': '肩越しショット', 'bird_eye': '俯瞰', 'worm_eye': 'アオリ' };
          return map[type] || type;
        };
        cameraWorkHeaderLine = '\n🎬 360° Camera Work:';
        result.cameraWork.panels.forEach(p => {
          cameraWorkHeaderLine += `\n  Panel${p.panel}: ${yawToDirection(p.yaw)}(${p.yaw}°) ${shotTypeJa(p.camera)} FOV${p.fov}° — ${p.reasoning}`;
        });
      }

      const generatedTitle = formatGeneratedMangaTitle(result.topic);
      const locationLine = resolvedLocation ? `\nLocation: ${resolvedLocation}` : '';
      const finalScenarioText = `## タイトル: ${generatedTitle}${loglineLine}${locationLine}${visualEvidenceLine}${outfitLine}${punchlineLine}${bg360HeaderLine}${cameraWorkHeaderLine}\n\n${result.scenario} `;
      setScenario(finalScenarioText);
      recentScenarioTextsRef.current = [finalScenarioText, ...recentScenarioTextsRef.current.filter(text => text !== finalScenarioText)].slice(0, 6);
      setMangaTitle(generatedTitle); // タイトルをstateに保存（画像ダウンロード時のファイル名に使用）
      const scenarioValidation = validateMangaScenario(finalScenarioText, castList);
      const qualityWarnings = [];
      if (result.validationWarning) {
        qualityWarnings.push(`STEP2検証: ${result.validationWarning.code}: ${result.validationWarning.message}`);
      }
      if (!scenarioValidation.ok) {
        const validationIssue = formatMangaScenarioValidationIssue(scenarioValidation);
        qualityWarnings.push(`4コマ検証: ${validationIssue}`);
      }
      if (qualityWarnings.length > 0) {
        const warningMessage = `シナリオ品質警告: ${qualityWarnings.join(' / ')}`;
        const nextAction = '最良候補を保持し、品質警告のままSTEP3・STEP4へ進めます。画像品質も自動修正・比較します。';
        setScenarioThought(prev => prev + `\n\n[SCENARIO QUALITY WARNING] ${warningMessage}\n> ${nextAction}`);
        showStatus(`${warningMessage} ${nextAction}`);
      } else {
        showStatus("シナリオの生成が完了しました！");
      }
      setIs360CameraWorking(false);

      if (result.thought) {
        setScenarioThought(prev => {
          const separator = "\n\n--- ✅ シナリオ生成完了 (思考トレース) ---\n";
          return prev + separator + result.thought;
        });
      }

      scenarioOutcome = '完了';
      return finalScenarioText;
    } catch (error) {
      if (scenarioRunEpoch !== scenarioRunEpochRef.current) return null;
      console.error(error);
      if (/API Key is not set|OpenAI APIキーが設定されていません/.test(String(error.message || ''))) {
        setShowOpenAIKeyModal(true);
      }
      const translatedMsg = translateApiError(error);
      if (['CAMERA_CONTRACT', 'STYLE_CONTRACT'].includes(error.code) && error.scenario) {
        const contract = error.code === 'CAMERA_CONTRACT' ? 'カメラ' : '画風';
        setScenarioThought(prev => prev + `\n\n[${contract}契約未達・未採用候補を保持]\n${error.scenario}\n\n自動構成の${contract}契約が未達のためSTEP3・画像生成へ進めません。`);
      }
      setScenarioThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("シナリオ生成エラー");
      setIs360CameraWorking(false);
      return null;
    } finally {
      clearInterval(scenarioTimer);
      if (scenarioRunEpoch === scenarioRunEpochRef.current) {
        finishScenarioTiming(scenarioRunEpoch, scenarioOutcome);
        setIs360CameraWorking(false);
        setIsSearching(false);
      }
    }
  };

  const isColorModeLocked = isAssembling || isGeneratingImage || isFullAutoMode
    || isSearching || isAnalyzing || isEnhancing || is360CameraWorking
    || isFixingPolicy || policyAutoRetrying;

  const setMosaicCopyrightedCharacters = (enabled) => {
    if (isColorModeLocked || enabled === mosaicCopyrightedCharacters) return;
    setMosaicCopyrightedCharactersState(Boolean(enabled));
    setScenarioFromUser('');
    setExplanation('');
    setExplanationNotice('');
    setOriginalScenario('');
    setScenarioThought('');
    setAssembleThought('');
    setEnhanceLog('');
    setGenLog([]);
    showStatus('モザイク設定を変更しました。STEP2からシナリオを作り直してください。');
  };

  const setShowWatermarks = (enabled) => {
    if (isColorModeLocked || enabled === showWatermarks) return;
    setShowWatermarksState(Boolean(enabled));
    invalidateScenarioOutput();
    setAssembleThought('');
    setGenLog([]);
    showStatus('ウオーターマーク設定を変更しました。STEP3で指示文を再構築してください。');
  };

  // Selection invalidates dependent output but never initiates assembly/API work.
  // STEP1/STEP2 resets preserve this preference; only full settings reset clears it.
  const setColorMode = (value) => {
    if (isColorModeLocked) return;
    const nextMode = normalizeMangaColorMode(value);
    if (nextMode === colorMode) return;
    setColorModeState(nextMode);
    invalidatePromptAssembly();
    setFinalPrompt("");
    setGeneratedImage(null);
    setAssembleThought("");
    setIsCopied(false);
    setCopiedPartIndex(null);
    setIsTextSaved(false);
    clearTimeout(copyFeedbackTimerRef.current);
    setIsMetaSaved(false);
    setGenLog([]);
    setIsGenerationError(false);
    setPolicyErrorMsg("");
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setShowPolicyChoice(false);
    lastPolicyErrorRef.current = "";
    showStatus(`${nextMode === 'monochrome' ? '白黒' : 'カラー'}を選択しました。STEP3で指示文を再構築してください。`);
  };

  // --- Step 3: Prompt Assembly (Super FURU v121.3) ---
  // [v2.79] 戻り値変更: フルオート連鎖用（文字列=成功, null=失敗）
  const assemblePrompt = async (skipGuard = false, overrideScenario = null, providerFamilyOverride = null) => {
    try {
      assertImageInputBudget({ characterImages: imagesRef.current, backgroundEnabled: bg360EnabledRef.current });
      if (referenceEditorError) throw new Error(referenceEditorError);
    } catch (error) {
      setImageInputError(error.message);
      showStatus(error.message);
      return null;
    }
    beginApiWork();
    const promptScenarioEpoch = scenarioRunEpochRef.current;
    const currentScenario = overrideScenario || scenario;
    if (!skipGuard && (!castList || !currentScenario)) return showStatus("キャストとシナリオが必要です。");
    invalidatePromptAssembly();
    const assemblyRun = promptAssemblyRunRef.current;
    const controller = new AbortController();
    promptAssemblyAbortRef.current = controller;
    const scenarioValidation = validateMangaScenario(currentScenario, castList);
    const assemblyQualityWarning = !scenarioValidation.ok
      ? `シナリオ品質警告: ${formatMangaScenarioValidationIssue(scenarioValidation)}。取得済みの内容を保持し、品質警告のままSTEP4へ進めます。`
      : '';
    if (assemblyQualityWarning) showStatus(assemblyQualityWarning);
    setIsAssembling(true);
    setFinalPrompt(""); // Clear previous prompt to indicate loading
    setGenLog([]); // [v3.01] Clear previous image generation logs
    // [v2.35] 救済パネルリセット
    setPolicyErrorMsg("");
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setShowPolicyChoice(false); // [v4.2.0] 選択UIリセット
    lastPolicyErrorRef.current = ""; // [v4.2.0] エラーメッセージrefリセット
    setAssembleThought(`${assemblyQualityWarning ? `[SCENARIO QUALITY WARNING] ${assemblyQualityWarning}\n` : ''}スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...`);

    const effectiveProviderFamily = normalizePromptProviderFamily(
      providerFamilyOverride || getCurrentPromptProviderFamily()
    );

    // Track the real wait without appending invented processing stages.
    const assemblyStartedAt = Date.now();
    const thinkTimer = setInterval(() => {
      if (promptScenarioEpoch !== scenarioRunEpochRef.current || assemblyRun !== promptAssemblyRunRef.current) return;
      setAssembleThought(prev => {
        const elapsed = Math.floor((Date.now() - assemblyStartedAt) / 1000);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
        return timerRegex.test(prev) ? prev.replace(timerRegex, timerLine) : prev + timerLine;
      });
    }, 1000);

    try {
      const activePunchlineType = resolvedPunchlineTypeRef.current || resolveScenarioEndingType(currentScenario, punchlineType);
      updateResolvedPunchlineType(activePunchlineType);
      const promptMaxChars = effectiveProviderFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT
        ? getOpenAIPromptBodyBudget(buildOpenAIReferencePlan({ compact: true,
          characterImages: images, backgroundImage: bg360Image, backgroundEnabled: bg360Enabled,
          referenceAssets: referenceAssetsRef.current,
          colorMode,
        }))
        : undefined;
      // [v3.82-alpha] リファクタリング: 外部モジュールでプロンプトを構築
      const assembled = await assembleMangaPromptWithRecovery({
        mosaicCopyrightedCharacters,
        showWatermarks,
        scenario: currentScenario,
        castList,
        colorMode,
        providerFamily: effectiveProviderFamily,
        referenceAssetContext: buildReferenceAssetContext(referenceAssetsRef.current, imagesRef.current, { purpose: 'image', panorama: bg360Enabled ? bg360Analysis : null }),
        bg360Image,
        bg360Analysis,
        bg360Enabled,
        bg360CroppedPanels,
        punchlineType: activePunchlineType,
        systemVersion: SYSTEM_VERSION,
        imageEngineLabel: effectiveProviderFamily === PROMPT_PROVIDER_FAMILIES.CHATGPT ? formatOpenAIImageEngineName(openAIImageQuality) : GEMINI_IMAGE_MODEL.replace(/^gemini-nano-banana-/, 'Gemini Nano Banana '),
        scenarioModelLabel: OPENAI_SCENARIO_MODEL_OPTIONS.find(({ id }) => id === scenarioUsedModelRef.current)?.label,
        allowScenarioQualityWarning: true,
        promptMaxChars
      }, callAI, message => {
        if (promptScenarioEpoch === scenarioRunEpochRef.current && assemblyRun === promptAssemblyRunRef.current) {
          setAssembleThought(prev => prev + `\n> ${message}`);
        }
      }, controller.signal);
      if (promptScenarioEpoch !== scenarioRunEpochRef.current || assemblyRun !== promptAssemblyRunRef.current) return null;
      const promptArtifact = assembled.artifact;

      const safePrompt = promptArtifact.prompt;
      const endingPolicy = getEndingModePolicy(activePunchlineType);
      setAssembleThought(prev => prev + (endingPolicy.preserveReferenceStyle
        ? "\n> 原文忠実性と全4コマの参照絵柄固定を保ってAI精査中..."
        : endingPolicy.endingTone === 'serious'
          ? "\n> シリアス結末の因果と余韻を保ってAI精査中..."
          : "\n> ギャグの意図を保ってAI精査中..."));
      const reviewed = await reviewComedyPrompt({
        prompt: safePrompt,
        validatePrompt: candidate => validateMangaPromptArtifact(candidate, promptArtifact),
        promptMaxChars,
        scenario: assembled.scenario,
        castList,
        reviewTone: endingPolicy.endingTone,
        preserveReferenceStyle: endingPolicy.preserveReferenceStyle,
        signal: controller.signal
      }, callAI, message => {
        if (promptScenarioEpoch === scenarioRunEpochRef.current && assemblyRun === promptAssemblyRunRef.current) {
          setAssembleThought(prev => prev + `\n> ${message}`);
        }
      });

      if (promptScenarioEpoch !== scenarioRunEpochRef.current || assemblyRun !== promptAssemblyRunRef.current) return null;

      if (isDocumentaryEnding(activePunchlineType)) {
        setAssembleThought(prev => prev + `\n> [${endingPolicy.preserveReferenceStyle ? 'シリアス' : 'ギャグ'}・ドキュメンタリー] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)`);
      }

      setAssembleThought(prev => prev + "\n> [v3.31] 事故防止プロトコル全モデル適用済み:\n>   ✅ 縦書きを優先（構図に適した横書きは許容）\n>   ✅ セリフ勝手追加禁止\n>   ✅ キャラの外見は維持し、設定資料の配置・説明文はコピーしない\n>   ✅ カメラワーク平易化禁止\n>   ✅ プロンプト分岐 (ChatGPT/Gemini)\n>   ✅ 出力前チェックリスト追加");

      assertPromptEndingModeConsistency({ prompt: reviewed.prompt, punchlineType: activePunchlineType });
      assertPrintableDialogue(reviewed.prompt);
      assertRenderOptions(reviewed.prompt, { mosaicCopyrightedCharacters, showWatermarks, protectedCast: collectCastNameEntries(castList).map(entry => entry.displayName) });
      promptAssemblyRunRef.completedRun = assemblyRun;
      if (assembled.repaired) setScenario(assembled.scenario);
      setFinalPrompt(reviewed.prompt);
      setAssembleThought(prev => prev + `\n> 出力モード: ${colorMode === 'monochrome' ? '白黒漫画原稿（墨線・白地・肌や素材と影に応じたトーン）' : 'カラー'}`);
      setAssembleThought(prev => prev + `\n> ${reviewed.warning || "AI精査完了"}`);
      setAssembleThought(prev => prev + "\n> セーフティ年齢フィルター: 適用済み\n> 最適化ベクトル: 計算完了\n> 構造ロック: 有効\n> 風刺ロジック: 強化済み\n> [完了] 最終プロンプトを構築しました。");
      showStatus(reviewed.warning
        ? "指示文を構築しましたが、AI精査に警告があります。STEP3の理由を確認してください。"
        : "最終プロンプトの構築が完了しました。コピーまたはSTEP4の画像生成へ進めます。");
      return reviewed.prompt; // [v2.79] フルオート連鎖用: 成功

    } catch (error) {
      if (promptScenarioEpoch !== scenarioRunEpochRef.current || assemblyRun !== promptAssemblyRunRef.current) return null;
      const translatedMsg = translateApiError(error);
      console.error(translatedMsg);
      setAssembleThought(prev => prev + `\n\n${translatedMsg}`);
      showStatus("指示文を構築できませんでした。STEP3のエラー理由を確認してください。");
      return null; // [v2.79] フルオート連鎖用: 失敗
    } finally {
      clearInterval(thinkTimer);
      if (assemblyRun === promptAssemblyRunRef.current) {
        const elapsed = Math.max(0, Date.now() - assemblyStartedAt);
        setAssembleThought(prev => `${prev.replace(/\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/g, '')}\n> [STEP3 TIME] 処理終了（合計${(elapsed / 1000).toFixed(3)}秒）`);
        promptAssemblyAbortRef.current = null;
        setIsAssembling(false);
      }
    }
  };

  // [v3.04] ChatGPTモードのチェックボックスが切り替わった時、既にプロンプトが生成されていれば自動再構築する
  useEffect(() => {
    if (finalPrompt && !isAssembling && currentStep >= 3) {
      assemblePrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEngine, enableOpenAIApi]);

  // [v3.59] ソフトリセット: キャラクター解析(STEP1)を保持し、STEP2以降をリセット
  const partialReset = () => {
    cancelApiWork();
    invalidateScenarioRun();
    isFullAutoModeRef.current = false;
    isEndlessModeRef.current = false;
    setIsEndlessMode(false);
    qualityRetryAbortRef.current = true;
    fullAutoAbortRef.current = true;
    invalidatePromptAssembly();
    scenarioUsedModelRef.current = null;
    setIsAssembling(false);
    setIsSearching(false);
    setIsGeneratingImage(false);
    setPolicyAutoRetrying(false);
    // castList は保持する（キャラクター解析結果）
    // images は保持する（ドロップしたキャラクターシート画像）
    // analyzeThought は保持する（STEP1のログ）
    setScenario("");
    setExplanation("");
    setExplanationNotice("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setScenarioThought("");
    setAssembleThought("");
    setGenLog([]);
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    // STEP1 material and its recognition survive a STEP2 reset.
    setCustomLocation("");
    setCustomOutfit("");
    setBg360CameraWork(null); // [v3.53] カメラワーク設計結果もリセット
    setBg360CroppedPanels(null); // [v3.53 Phase2] クロップ画像もリセット
    setIs360CameraWorking(false); // [v3.53] カメラワーク処理フラグリセット
    
    // [v3.91-alpha] カテゴリ選択やシナリオ関連設定を完全に初期化
    setCategories(DEFAULT_CATEGORIES);
    setManualTopic("");
    setSearchTopic("");
    setLockedLocation("");
    setLockedOutfit("");
    setPunchlineType("Auto");
    setInputMode("news");
    setOriginalScenario("");
    
    // 演出強化系の設定を全リセット
    setEnhanceExpressions(false);
    setEnhanceBodyLang(false);
    setEnhanceEffects(false);
    setEnhanceBackgrounds(false);
    setEnhanceCameraWork(false);
    setEnhanceDialogue(false);
    setEnhanceGag(false);
    setIsEnhancing(false);
    setEnhanceLog("");
    setIsEnhancePanelOpen(false);
    
    // ポリシーリセット
    setPolicyErrorMsg("");
    setIsFixingPolicy(false);
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setShowPolicyChoice(false); // [v4.2.0]
    lastPolicyErrorRef.current = "";
    
    // コピー状態リセット
    setIsScenarioCopied(false);
    setIsMetaSaved(false);

    showStatus("シナリオ以降をリセットしました。キャラクター解析は保持しています。");
  };

  // STEP1 reset: preserve the configured API connection while discarding character analysis and dependent work.
  const step1Reset = () => {
    partialReset();
    setCastList("");
    setImages([]);
    setBg360Image(null);
    setBg360ImageParts(null);
    setBg360Analysis(null);
    setBg360Enabled(false);
    setRecognitionDraft(null);
    setReferenceEditorError('');
    setAnalyzeThought("");
    setStyleJson(null);
    setIsCastListCopied(false);
    setIsDragging(false);
    showStatus("キャラクター解析からリセットしました。API接続は保持しています。");
  };

  // [v3.59] ハードリセット: 全データ消去 + APIキー再入力モーダルを表示
  const hardReset = () => {
    cancelApiWork();
    invalidateScenarioRun();
    isFullAutoModeRef.current = false;
    isEndlessModeRef.current = false;
    setIsEndlessMode(false);
    setImageEditDrafts({});
    setRecognitionDraft(null);
    setReferenceEditorError('');
    qualityRetryAbortRef.current = true;
    fullAutoAbortRef.current = true;
    invalidatePromptAssembly();
    scenarioUsedModelRef.current = null;
    recentScenarioTextsRef.current = [];
    setIsAssembling(false);
    setIsSearching(false);
    setIsGeneratingImage(false);
    setPolicyAutoRetrying(false);
    setColorModeState("color");
    setMosaicCopyrightedCharactersState(true);
    setShowWatermarksState(true);
    resetScenarioModelId();
    setCastList("");
    setScenario("");
    setExplanation("");
    setExplanationNotice("");
    setFinalPrompt("");
    setImages([]);
    setGeneratedImage(null);
    setAnalyzeThought("");
    setScenarioThought("");
    setAssembleThought("");
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    setCustomLocation("");
    setCustomOutfit("");
    setBg360Image(null);
    setBg360ImageParts(null);
    setBg360Analysis(null);
    setBg360CameraWork(null);
    setBg360CroppedPanels(null);
    setIs360CameraWorking(false);
    setUsedModel(null);
    setGenerationHistory([]);
    setGenLog([]);

    // [v3.91-alpha] カテゴリ選択やシナリオ関連設定を完全に初期化
    setCategories(DEFAULT_CATEGORIES);
    setManualTopic("");
    setSearchTopic("");
    setLockedLocation("");
    setLockedOutfit("");
    setBg360Enabled(false);
    setPunchlineType("Auto");
    setInputMode("news");
    setOriginalScenario("");
    
    // 演出強化系の設定を全リセット
    setEnhanceExpressions(false);
    setEnhanceBodyLang(false);
    setEnhanceEffects(false);
    setEnhanceBackgrounds(false);
    setEnhanceCameraWork(false);
    setEnhanceDialogue(false);
    setEnhanceGag(false);
    setIsEnhancing(false);
    setEnhanceLog("");
    setIsEnhancePanelOpen(false);
    
    // ポリシーリセット
    setPolicyErrorMsg("");
    setIsFixingPolicy(false);
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setShowPolicyChoice(false); // [v4.2.0]
    lastPolicyErrorRef.current = "";
    
    // コピー状態リセット
    setIsCastListCopied(false);
    setIsScenarioCopied(false);
    setIsMetaSaved(false);

    // [v3.59] APIキー完全クリア: React state + gemini lib + OpenAI lib + ai-provider
    setApiKeyState("");           // React state (UI表示用)
    setApiKey("");                // gemini lib のキーストア
    setOpenAIApiKey("");          // OpenAI lib のキーストア
    setActiveEngine("");          // ai-provider のエンジン設定
    setSelectedEngine("");        // React state のエンジン選択
    setEnableOpenAIApi(false);
    setEnableChatGPTMode(false);
    setShowModal(true);
    showStatus("全データをリセットしました。APIキーを再入力してください。");
  };

  const [isCopied, setIsCopied] = useState(false);
  const [copiedPartIndex, setCopiedPartIndex] = useState(null);
  const [isTextSaved, setIsTextSaved] = useState(false);
  const copyFeedbackTimerRef = useRef(null);
  useEffect(() => () => clearTimeout(copyFeedbackTimerRef.current), []);
  const [isFixPromptCopied, setIsFixPromptCopied] = useState(false);
  const [isPolicyCopied, setIsPolicyCopied] = useState(false);

  // Use the same complete text as the initial API request, including image roles.
  // Validate again at copy time because the user may edit the text or references.
  const prepareWebCopyPrompt = (prompt) => {
    if (referenceEditorError) throw new Error(referenceEditorError);
    if (inferImageQualityMode(prompt) === 'four-panel') assertRenderOptions(prompt, { mosaicCopyrightedCharacters, showWatermarks, protectedCast: collectCastNameEntries(castList).map(entry => entry.displayName) });
    return ensureWebPromptTrailingNewline(getCurrentPromptProviderFamily() === PROMPT_PROVIDER_FAMILIES.CHATGPT
      ? appendOpenAIReferencePrompt(applyOpenAIImageEngineWatermark(prompt, openAIImageQuality), buildOpenAIReferencePlan({ compact: true,
        characterImages: images, backgroundImage: bg360Image, backgroundEnabled: bg360Enabled,
        referenceAssets: referenceAssetsRef.current,
        colorMode,
      }))
      : appendGeminiReferencePrompt(prompt, buildWebReferencePlan({ compact: true,
        images, referenceAssets: referenceAssetsRef.current, backgroundImage: bg360Image, backgroundEnabled: bg360Enabled, colorMode,
      })));
  };

  let webCopyPartLengths = [];
  if (finalPrompt) {
    try {
      webCopyPartLengths = splitWebPromptForPaste(prepareWebCopyPrompt(finalPrompt)).map(part => part.length);
    } catch {
      // The existing copy-time validation reports the actionable error.
    }
  }

  const copyPrompt = async (asTextFile = false, partIndex = null) => {
    if (!finalPrompt) return;
    let copiedPrompt;
    try {
      assertPromptEndingModeConsistency({ prompt: finalPrompt, punchlineType: resolvedPunchlineTypeRef.current || punchlineType });
      assertPrintableDialogue(finalPrompt);
      copiedPrompt = prepareWebCopyPrompt(finalPrompt);
    } catch (error) {
      showStatus(error.message);
      return;
    }
    if (asTextFile === true) {
      try {
        const url = URL.createObjectURL(new Blob([copiedPrompt], { type: 'text/plain;charset=utf-8' }));
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'manga-image-prompt.txt';
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch {
        showStatus('指示文の.txt保存を開始できませんでした。');
        return;
      }
      clearTimeout(copyFeedbackTimerRef.current);
      setCopiedPartIndex(null);
      setIsCopied(false);
      setIsTextSaved(true);
      copyFeedbackTimerRef.current = setTimeout(() => setIsTextSaved(false), 2000);
      showStatus('画像生成の指示文を.txtで保存しました。参照画像と一緒に添付してください。');
      return;
    }
    let textToCopy = copiedPrompt;
    if (partIndex !== null) {
      const parts = splitWebPromptForPaste(copiedPrompt);
      if (!Number.isInteger(partIndex) || partIndex < 0 || partIndex >= parts.length) {
        showStatus('分割したプロンプトの番号が無効です。');
        return;
      }
      textToCopy = parts[partIndex];
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      showStatus('クリップボードにコピーできませんでした。ブラウザの権限を確認してください。');
      return;
    }
    clearTimeout(copyFeedbackTimerRef.current);
    setCopiedPartIndex(partIndex);
    setIsCopied(partIndex === null);
    setIsTextSaved(false);
    copyFeedbackTimerRef.current = setTimeout(() => {
      setCopiedPartIndex(null);
      setIsCopied(false);
      setIsTextSaved(false);
    }, 2000);

    // [v4.2.1] ポリシーエラーが出ている状態でコピーした場合
    // → Web版に貼り付ける意思表示とみなし、救済パネルを展開＆メッセージボックスを閉じる
    if (policyErrorMsg || lastPolicyErrorRef.current) {
      setIsPolicyPanelOpen(true);
      setShowPolicyChoice(false);
      showStatus("📋 コピーしました → Web版に貼り付けて、下の🛡️救済パネルで手動対応できます");
    } else {
      showStatus(partIndex === null
        ? "クリップボードにコピーしました！"
        : `${partIndex + 1}/${webCopyPartLengths.length} をコピーしました。同じChatGPT入力欄に貼り、最後まで送信しないでください。`);
    }
  };
  // Local-only placement also makes existing successful API images reviewable
  // without paying for another generation. Always retain the original pixels.
  const normalizeDisplayedPage = async () => {
    if (!generatedImage || isGeneratingImage || inferImageQualityMode(finalPrompt) !== 'four-panel') return;
    const previous = generationHistory.find(item => item.img === generatedImage);
    const sourceImage = previous?.originalImage || generatedImage;
    const match = sourceImage.match(/^data:(image\/[^;]+);base64,([\s\S]+)$/);
    if (!match) return showStatus('配置する画像を読み取れません。');
    const candidate = await normalizePageCandidate({ mimeType: match[1], base64Img: match[2] });
    if (!candidate.pageLayout.applied) return showStatus(`ページ配置は未適用です。${candidate.pageLayout.reason} 元画像を保持しました。`);
    const img = `data:${candidate.mimeType};base64,${candidate.base64Img}`;
    setGeneratedImage(img);
    setImageQualityNeedsRepair(false);
    setGenerationHistory(items => addGenerationHistoryItem(items, {
      id: Date.now(), img, originalImage: sourceImage, pageLayout: candidate.pageLayout,
      modelId: previous?.modelId,
      mimeType: candidate.mimeType,
      generatedAt: previous?.generatedAt,
      metadataContext: previous?.metadataContext,
      workflowSource: previous?.workflowSource,
      fallbackOccurred: previous?.fallbackOccurred,
      qualityPass: false, selected: true,
    }));
    showStatus('ページ比率を揃えました。元画像も保持しています。追加API課金なし／配置後の画像QAは未実行です。');
  };

  const editGeneratedImage = async (instruction) => {
    beginApiWork();
    const epoch = scenarioRunEpochRef.current;
    if (!generatedImage || isGeneratingImage || isSearching || isAssembling || isEnhancing
      || isAnalyzing || is360CameraWorking || isFixingPolicy || isFullAutoMode
      || imageEditRunRef.current?.epoch === epoch) return false;
    let request;
    try { request = buildImageEditRequest(generatedImage, instruction); }
    catch (error) { showStatus(translateApiError(error)); return false; }
    const run = { epoch };
    imageEditRunRef.current = run;
    const sourceImage = generatedImage;
    const sourceHistory = generationHistory.find(item => item.img === sourceImage);
    const isCurrent = () => scenarioRunEpochRef.current === epoch && imageEditRunRef.current === run;
    const log = message => { if (isCurrent()) setGenLog(items => [...items, message]); };
    setIsGeneratingImage(true);
    setIsGenerationError(false);
    setOpenAIImageVerificationWarning('');
    setGenLog(['[画像修正] 表示中の画像と追加指示を送信します。元画像は保持します。']);
    const startedAt = Date.now();
    const timer = setInterval(() => {
      if (isCurrent()) setGenLog(items => [...items.filter(item => !item.startsWith('[WAIT]')),
        `[WAIT] 画像修正中… ${Math.floor((Date.now() - startedAt) / 1000)}秒経過`]);
    }, 1000);
    try {
      const response = isOpenAIEngine
        ? await generateImageWithOpenAI(request.prompt, log, {
          quality: openAIImageQuality, size: openAIImageSize, imageInputs: request.imageInputs,
        })
        : await generateImageWithImagen(request.prompt, log, request.referenceImages);
      if (!isCurrent()) return false;
      const base64 = String(response.base64Img || '').replace(/\s+/g, '');
      if (!base64) throw new Error('Image response did not include usable image data.');
      const rawMimeType = response.mimeType || 'image/png';
      const candidate = await normalizePageCandidate({
        base64Img: base64, mimeType: rawMimeType, modelId: response.usedModel,
      });
      if (!isCurrent()) return false;
      if (!candidate.pageLayout?.applied) {
        throw new Error(`修正画像のページ比率を自動補正できませんでした。${candidate.pageLayout?.reason || ''}`.trim());
      }
      const mimeType = candidate.mimeType || rawMimeType;
      const img = `data:${mimeType};base64,${candidate.base64Img}`;
      const timestamp = Date.now();
      const editedHistoryItem = {
          id: timestamp, img, mimeType, modelId: response.usedModel,
          originalImage: candidate.originalImage,
          pageLayout: candidate.pageLayout,
          generatedAt: new Date(timestamp).toISOString(), sourceImage,
          qualityPass: false, selected: true, editInstruction: instruction.trim(),
          workflowSource: sourceHistory?.workflowSource,
          metadataContext: {
            provider: isOpenAIEngine ? 'openai' : 'gemini', scenario: '', finalPrompt: request.prompt,
            inputImages: [{ role: 'edit_source', dataUrl: sourceImage }],
            settings: { manual_image_edit: true, quality_review: 'not_run' },
          },
      };
      setGenerationHistory(items => {
        const retained = items.some(item => item.img === sourceImage) ? items
          : addGenerationHistoryItem(items, { ...sourceHistory, id: timestamp - 1, img: sourceImage });
        return addGenerationHistoryItem(retained, editedHistoryItem);
      });
      setGeneratedImage(img);
      setIsFallbackUsed(false);
      setImageQualityNeedsRepair(false);
      log(formatPageLayoutStatus(candidate.pageLayout));
      if (!await autoSaveFinalImage(editedHistoryItem, isCurrent)) return false;
      log('[画像修正] 完了。修正前の画像は履歴から選べます。自動品質検査は未実行です。');
      showStatus('修正版を表示しました。変更箇所を確認してください。元画像は履歴に残っています。');
      return true;
    } catch (error) {
      if (!isCurrent()) return false;
      const message = translateApiError(error);
      log(`[画像修正エラー] ${message}`);
      showStatus(`修正できませんでした。元画像を保持しました。${message}`);
      setIsGenerationError(true);
      return false;
    } finally {
      clearInterval(timer);
      if (isCurrent()) setIsGeneratingImage(false);
      if (imageEditRunRef.current === run) imageEditRunRef.current = null;
    }
  };

  // --- Step 4: Image Generation ---
  const assertImageGenerationPrompt = (prompt) => {
    assertPromptEndingModeConsistency({ prompt, punchlineType: resolvedPunchlineTypeRef.current || punchlineType });
    assertPrintableDialogue(prompt);
    if (inferImageQualityMode(prompt) === 'four-panel') assertRenderOptions(prompt, { mosaicCopyrightedCharacters, showWatermarks, protectedCast: collectCastNameEntries(castList).map(entry => entry.displayName) });
  };

  // [v2.79] 戻り値変更: フルオート連鎖用（true=成功, false=失敗）
  const generateImageOnce = async (skipGuard = false, overridePrompt = null, generationOptions = {}) => {
    if (referenceEditorError) { showStatus(referenceEditorError); return false; }
    if (generationOptions.policyAttempt && (!allowImageQualityRepair || generationOptions.reviewOnly || qualityRetryAbortRef.current)) return false;
    try {
      assertImageInputBudget({ characterImages: imagesRef.current, backgroundEnabled: bg360EnabledRef.current });
    } catch (error) {
      setImageInputError(error.message);
      showStatus(error.message);
      return false;
    }
    beginApiWork();
    setImageQualityNeedsRepair(false);
    const editablePrompt = overridePrompt || finalPrompt;
    const workflowSource = { promptAssemblyRun: promptAssemblyRunRef.completedRun, finalPrompt: editablePrompt };
    const qualityMode = inferImageQualityMode(editablePrompt);
    const enginePrompt = isOpenAIEngine && !generationOptions.reviewOnly
      ? applyOpenAIImageEngineWatermark(editablePrompt, openAIImageQuality) : editablePrompt;
    const currentPrompt = qualityMode === 'four-panel'
      ? ensureMangaColorModeContract(enginePrompt, colorMode)
      : enginePrompt;
    const metadataSettings = {
      punchline_type: punchlineType,
      color_mode: colorMode,
      ...readRenderOptions(currentPrompt),
      expression_enhancement: Boolean(enhanceExpressions),
      body_language_enhancement: Boolean(enhanceBodyLang),
      effects_enhancement: Boolean(enhanceEffects),
      background_enhancement: Boolean(enhanceBackgrounds),
      camera_enhancement: Boolean(enhanceCameraWork),
      dialogue_rewrite: Boolean(enhanceDialogue),
      ending_direction_enhancement: Boolean(enhanceGag),
      enhancement_label: getEndingModePolicy(punchlineType).endingTone === 'serious' ? 'シリアス演出強化' : 'ギャグ演出強化',
      ending_tone: getEndingModePolicy(punchlineType).endingTone === 'serious' ? 'serious' : 'gag',
      character_analysis_used: Boolean(castList),
      background_analysis_used: Boolean(bg360Enabled && bg360Analysis),
      background_reference_used: Boolean(bg360Enabled && bg360Image),
    };
    if (isGeneratingImage || imageEditRunRef.current?.epoch === scenarioRunEpochRef.current || (!skipGuard && !currentPrompt)) return false;
    try {
      assertImageGenerationPrompt(currentPrompt);
    } catch (error) {
      showStatus(error.message);
      setGenLog(prev => [...prev, `[PROMPT VALIDATION ERROR] ${error.message}`]);
      return false;
    }
    qualityRetryAbortRef.current = false;
    const qualityRunEpoch = scenarioRunEpochRef.current;
    setIsGeneratingImage(true);
    setIsGenerationError(false);
    
    // [v4.2.3] 新規の生成開始時にポリシーエラー関連ステートをリセット
    setPolicyErrorMsg("");
    lastPolicyErrorRef.current = "";
    setShowPolicyChoice(false);
    
    // [v3.04i] 進捗窓(genLog)にChatGPTモードのバッチ/警告を明示
    const initialLogs = generationOptions.policyAttempt
      ? [`[POLICY AUTO-FIX] 画像再生成 ${generationOptions.policyAttempt}/${MAX_POLICY_RETRIES}`, "[1/5] プロンプトパラメータをロック中...", "[2/5] セーフティフィルターを検証中..."]
      : ["[1/5] プロンプトパラメータをロック中...", "[2/5] セーフティフィルターを検証中..."];
    if (enginePrompt !== editablePrompt) initialLogs.push('[WATERMARK] 表記を現在の画像生成エンジン名へ同期しました。');
    if (currentPrompt !== enginePrompt) initialLogs.push('[MODE] 選択中の白黒指定を、編集した描画指示に反映しました。');
    if (getCurrentPromptProviderFamily() === PROMPT_PROVIDER_FAMILIES.CHATGPT) {
      initialLogs.push("[2.5/5] ✅ ChatGPT Engine: ChatGPT-family prompt structure locked.");
    } else {
      initialLogs.push("[2.5/5] ✅ Gemini Engine: Gemini-family prompt structure locked.");
    }
    setGenLog(initialLogs);

    // [v2.44] 進捗ステップ表示＋経過時間カウンター
    const generationStartedAt = Date.now();
    let progressPhase = generationOptions.reviewOnly ? '品質再検査' : '画像生成';
    const genTimer = setInterval(() => {
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return;
      const elapsed = Math.floor((Date.now() - generationStartedAt) / 1000);
      const waitLine = `[WAIT] ⏳ ${progressPhase}中… 合計${elapsed}秒経過`;
      setGenLog(prev => {
        if (qualityRunEpoch !== scenarioRunEpochRef.current) return prev;
        const waitIndex = prev.findIndex(entry => entry.startsWith("[WAIT]"));
        if (waitIndex !== -1) {
          const newLog = [...prev];
          newLog[waitIndex] = waitLine;
          return newLog;
        }
        return [...prev, waitLine];
      });
    }, 1000);

    // Artificial delay to ensure user sees the process starting
    await new Promise(r => setTimeout(r, 800));

    try {
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;
      const referenceContext = await buildReferenceRecognitionMetadata({
        images, referenceAssets: referenceAssetsRef.current, castList,
        backgroundImage: bg360Image, backgroundEnabled: bg360Enabled, backgroundAnalysis: bg360Analysis,
      });
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;
      setOpenAIImageVerificationWarning('');
      showStatus(isOpenAIEngine ? `${resolveOpenAIImageOption(openAIImageQuality).label} に送信中...` : "Google AI (Gemini/Imagen) に送信中...");
      setGenLog(prev => [...prev, "[3/5] クラウドAPIへ接続中...", "[3/5] プロンプトデータをアップロード中..."]);

      await new Promise(r => setTimeout(r, 1000)); // More visibility
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;

      const statCallback = (msg) => {
        if (qualityRunEpoch !== scenarioRunEpochRef.current) return;
        setGenLog(prev => qualityRunEpoch === scenarioRunEpochRef.current ? [...prev, msg] : prev);
      };

      const geminiReferenceImages = Array.isArray(generationOptions.referenceImages)
        ? generationOptions.referenceImages
        : ((bg360CroppedPanels && bg360Enabled && bg360CroppedPanels.length === 4)
          ? bg360CroppedPanels
          : []);
      const geminiImageOptions = generationOptions.imageOptions || {};

      const generateImageCandidate = async (prompt, {repair = false, repairSource = null} = {}) => {
        progressPhase = repair ? '修正画像生成' : '画像生成';
        let response;
        let metadataPrompt;
        let metadataInputImages;
        if (isOpenAIEngine) {
          const referencePlan = buildOpenAIReferencePlan({ compact: true,
            characterImages: images,
            referenceAssets: referenceAssetsRef.current,
            backgroundImage: bg360Image,
            backgroundEnabled: bg360Enabled,
            originalCandidate: repairSource,
            colorMode,
          });
          const apiPrompt = appendOpenAIReferencePrompt(applyOpenAIImageEngineWatermark(prompt, openAIImageQuality), referencePlan);
          metadataPrompt = apiPrompt;
          const roles = [
            ...Array(referencePlan.counts.original).fill('repair_source'),
            ...Array(referencePlan.counts.character).fill('character_reference'),
            ...Array(referencePlan.counts.background).fill('background_reference'),
          ];
          metadataInputImages = referencePlan.imageInputs.map((item, index) => ({
            role: referencePlan.referenceRoles?.[index] || roles[index] || 'reference', dataUrl: item.image_url,
          }));
          const {character, background, original} = referencePlan.counts;
          statCallback(`[REF] OpenAI入力: 参照素材${character}枚、360°背景${background}枚、修復元${original}枚`);
          statCallback(repair
            ? `[QUALITY QA] ${resolveOpenAIImageOption(openAIImageQuality).label} で元画像の限定修正を実行中です...`
            : `[INFO] ${resolveOpenAIImageOption(openAIImageQuality).label} の最終画像を待機します...`);
          response = await generateImageWithOpenAI(apiPrompt, statCallback, {
            quality: openAIImageQuality,
            size: openAIImageSize,
            imageInputs: referencePlan.imageInputs,
          });
        } else {
          const referencePlan = buildGeminiReferencePlan({ compact: true,
            characterImages: images,
            referenceAssets: referenceAssetsRef.current,
            colorMode,
            referenceImages: geminiReferenceImages,
            backgroundReferences: !Array.isArray(generationOptions.referenceImages),
          });
          const apiPrompt = buildGeminiImageApiPrompt(prompt, referencePlan);
          metadataPrompt = apiPrompt;
          metadataInputImages = referencePlan.referenceImages.map((dataUrl, index) => ({
            role: referencePlan.referenceRoles?.[index] || (index < images.length ? 'character_reference'
              : Array.isArray(generationOptions.referenceImages) ? 'additional_reference' : 'background_reference'),
            dataUrl,
          }));
          statCallback(`[REF] Gemini入力: 参照素材${referencePlan.counts.character}枚、背景・追加参照${referencePlan.counts.other}枚`);
          response = await generateImageWithImagen(apiPrompt, statCallback, referencePlan.referenceImages, geminiImageOptions);
        }
        const normalizedImage = String(response.base64Img || '').replace(/\s+/g, '');
        if (!normalizedImage) throw new Error('Image response did not include usable image data.');
        const candidate = {
          base64Img: normalizedImage, mimeType: response.mimeType || 'image/png', modelId: response.usedModel,
          workflowSource,
          metadataContext: {
            provider: isOpenAIEngine ? 'openai' : 'gemini', scenario,
            finalPrompt: metadataPrompt, inputImages: metadataInputImages, settings: metadataSettings, referenceContext,
          },
        };
        if (qualityMode !== 'four-panel') return candidate;
        const normalized = await normalizePageCandidate(candidate);
        statCallback(formatPageLayoutStatus(normalized.pageLayout));
        return normalized;
      };

      const reviewImageCandidate = async (candidate, candidatePrompt, { onReviewProgress } = {}) => {
        progressPhase = '品質検査';
        let review;
        try {
          const candidateImage = `data:${candidate.mimeType || 'image/png'};base64,${candidate.base64Img}`;
          const dimensions = await inspectImageDimensions(candidateImage);
          const evidenceContext = { sourceViews: [{
            hash: await getImageContentHash(candidateImage),
            stage: candidate.originalImage && candidate.originalImage !== candidateImage ? 'normalized' : 'original',
            ...dimensions, region: { x: 0, y: 0, ...dimensions }, scale: 1,
          }] };
          if (isOpenAIEngine && colorMode === 'monochrome' && qualityMode === 'four-panel') {
            let nativeChroma, reason;
            try {
              nativeChroma = { ...await inspectNativeMonochromeChroma(candidateImage),
                sourceHash: evidenceContext.sourceViews[0].hash, sourceStage: evidenceContext.sourceViews[0].stage, scale: 1 };
              const region = nativeChroma.region;
              reason = nativeChroma.status === 'detected'
                ? `原寸RGBに広い色残りを検出。領域${JSON.stringify(region.bounds)}、RGB=${region.sampleRgb.join('/')}、色画素率${(nativeChroma.coloredFraction * 100).toFixed(2)}%。物体は認識せず、自動有料修正には使用しません。`
                : '原寸RGBで広い色残りを検出せず。墨線・白地・網点の適合を保証する検査ではありません。';
            } catch (error) {
              nativeChroma = { status: 'unverified', sourceHash: evidenceContext.sourceViews[0].hash };
              reason = `原寸RGB検査は未確認です: ${error.message}`;
            }
            review = { pass: false, nativeChroma, observations: { monochrome_native_chroma: reason },
              issues: nativeChroma.status === 'not_detected' ? []
                : [{ type: 'unverified', panel: null, subject: 'monochrome_native_chroma', reason }] };
            statCallback(`[原寸RGB検査] ${reason}`);
            onReviewProgress?.(review);
          }
          const panelImages = qualityMode === 'four-panel'
            ? await extractMangaPanelCrops(candidateImage)
            : [];
          const qualityImageParts = buildImageQualityQaImageParts({
            candidate,
            panelImages,
            referenceImages: images,
          });
          const qualityPrompt = buildImageQualityQaPrompt({
            scenario,
            castList,
            finalPrompt: candidatePrompt,
            mode: qualityMode,
            referenceImageCount: images.length,
            panelCropCount: panelImages.length,
            evidenceContext,
            requirePanelStyleEvidence: isOpenAIEngine && colorMode === 'color',
          });
          const nativeReview = review;
          const { response: qualityResponse, review: parsedReview } = await requestImageQualityQa({
            prompt: qualityPrompt, images: qualityImageParts, request: callAI,
            onProgress: (msg) => statCallback(`[QUALITY QA] ${msg}`),
            options: {
              mode: qualityMode, finalPrompt: candidatePrompt, referenceImageCount: images.length,
              evidenceContext, requirePanelStyleEvidence: isOpenAIEngine && colorMode === 'color',
            },
          });
          review = parsedReview;
          if (nativeReview?.nativeChroma) {
            review = { ...review, nativeChroma: nativeReview.nativeChroma,
              pass: review.pass && nativeReview.issues.length === 0,
              issues: [...review.issues, ...nativeReview.issues],
              observations: { ...review.observations, ...nativeReview.observations } };
          }
          onReviewProgress?.(review);
          const reviewTokens = qualityResponse.usage?.completion_tokens ?? qualityResponse.usage?.output_tokens;
          statCallback(`[QUALITY QA] 応答サイズ: ${String(qualityResponse.text ?? '').length.toLocaleString()}文字${Number.isFinite(reviewTokens) ? `・出力 ${reviewTokens.toLocaleString()} tokens` : ''}。`);
          if (review.requestFailed) return review;
          const missingCastEvidence = issue => issue.type === 'unverified' && (issue.subject === 'cast_count'
            || issue.reason?.startsWith('Named-cast count lacks distinct body locations'));
          const missingHandPanels = new Set(review.issues
            .filter(issue => issue.type === 'unverified' && issue.reason?.startsWith('Missing or incomplete per-actor visible-hand inventory')
              || missingCastEvidence(issue))
            .map(issue => issue.panel));
          if (qualityMode === 'four-panel' && panelImages.length === 4 && missingHandPanels.size) {
            const contracts = extractPanelCastContracts(candidatePrompt).filter(({ panel }) => missingHandPanels.has(panel));
            if (contracts.length) {
              statCallback(`[QUALITY QA] 人物・手の記録が欠けた${contracts.map(({ panel }) => `${panel}コマ`).join('・')}を各コマの拡大画像で補足検査します。画像は再生成しません。`);
              const cropParts = buildImageQualityQaImageParts({ candidate, panelImages }).slice(1);
              for (const contract of contracts) {
                try {
                  const audit = await callAI(buildActorHandAuditPrompt([contract]), [cropParts[contract.panel - 1]], null,
                    msg => statCallback(`[手の独立監査 / ${contract.panel}コマ] ${msg}`));
                  const auditIssues = parseActorHandAuditResponse(audit.text, [contract]);
                  const stillMissing = new Set(auditIssues
                    .filter(issue => issue.reason?.startsWith('Missing or incomplete per-actor visible-hand inventory'))
                    .map(issue => `${issue.panel}:${issue.subject}`));
                  review.issues = review.issues.filter(issue => !(
                    issue.panel === contract.panel && issue.reason?.startsWith('Missing or incomplete per-actor visible-hand inventory')
                    && !stillMissing.has(`${issue.panel}:${issue.subject}`)
                  ) && !(
                    issue.panel === contract.panel && missingCastEvidence(issue)
                    && !auditIssues.some(item => missingCastEvidence(item)
                      && (issue.subject === 'cast_count' || item.subject === issue.subject))
                  ));
                  review.issues.push(...auditIssues.filter(issue => !issue.reason?.startsWith('Missing or incomplete per-actor visible-hand inventory')));
                  review.pass = review.issues.length === 0;
                  onReviewProgress?.(review);
                  const material = auditIssues.filter(issue => issue.type === 'anatomy' || issue.type === 'cast_count');
                  statCallback(`[手の独立監査 / ${contract.panel}コマ] ${material.length ? `手・人数の明確な不一致 ${material.map(issue => issue.subject).join('・')}` : auditIssues.length ? '判定に未確認あり' : '人物・可視の手の数に異常なし'}。`);
                } catch (error) {
                  statCallback(`[手の独立監査 / ${contract.panel}コマ] 未確認: ${error.message}`);
                }
              }
              review.pass = review.issues.length === 0;
            }
          }
          if (candidate.pageLayout?.applied === false) {
            review.pass = false;
            review.issues.push({ type: 'unverified', panel: null, subject: 'page_layout', reason: candidate.pageLayout.reason });
          }
          onReviewProgress?.(review);
          if (qualityMode === 'single-image') return review;
          // 正解は渡さず候補ページと同一ページの拡大コマから文字・実字の位置を読む。
          let inventoryText = '';
          try {
            const inventory = await callAI(buildBubbleInventoryPrompt({ panelCropCount: panelImages.length }),
              buildImageQualityQaImageParts({ candidate, panelImages }), null,
              msg => statCallback(`[読順転記] ${msg}`));
            inventoryText = inventory.text;
          } catch (error) {
            statCallback(`[読順転記] 未確認: ${error.message}`);
          }
          return applyBubbleInventory(review, inventoryText, candidatePrompt);
        } catch (qualityError) {
          return {
            ...review,
            pass: false,
            requestFailed: true,
            issues: [...(review?.issues || []), {
              type: 'unverified',
              panel: null,
              subject: 'image quality review',
              reason: qualityError?.message || 'Quality review request failed.'
            }]
          };
        }
      };

      const reviewCriticalCameraCandidate = async (candidate, candidatePrompt) => {
        progressPhase = 'カメラ検査';
        const panelImages = qualityMode === 'four-panel'
          ? await extractMangaPanelCrops(`data:${candidate.mimeType || 'image/png'};base64,${candidate.base64Img}`)
          : [];
        const cameraRequest = buildCriticalCameraQaRequest({ candidate, panelImages, finalPrompt: candidatePrompt });
        if (!cameraRequest.prompt) return { pass: true, issues: [] };
        const response = await callAI(
          cameraRequest.prompt,
          cameraRequest.images,
          null,
          msg => statCallback(`[カメラ独立監査] ${msg}`),
        );
        return parseCriticalCameraQaResponse(response.text, { finalPrompt: candidatePrompt });
      };

      const retainedImage = generationOptions.reviewExisting
        ? String(generatedImage || '').match(/^data:(image\/[^;]+);base64,([\s\S]+)$/) : null;
      if (generationOptions.reviewExisting && !retainedImage) throw new Error('再検査する画像がありません。');
      const retainedHistory = retainedImage
        ? generationHistory.find(item => item.img === generatedImage) : null;
      const originalCandidate = retainedImage
        ? {
          mimeType: retainedImage[1], base64Img: retainedImage[2], modelId: retainedHistory?.modelId || null,
          originalImage: retainedHistory?.originalImage,
          pageLayout: retainedHistory?.pageLayout,
          metadataContext: retainedHistory?.metadataContext,
          workflowSource: retainedHistory?.workflowSource,
        }
        : await generateImageCandidate(currentPrompt);
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;
      if (retainedImage) statCallback('[QUALITY QA] 表示中の画像を再検査します。初回の画像生成は行いません。');
      let generatedModelId = originalCandidate.modelId;
      let generatedMimeType = originalCandidate.mimeType;
      setGenLog(prev => [...prev, `[4/5] データストリーム受信完了 (Model: ${generatedModelId})`, "[5/5] Base64画像データをデコード・レンダリング中..."]);

      const finalImageStr = `data:${generatedMimeType};base64,${originalCandidate.base64Img}`;
      setGeneratedImage(finalImageStr);
      // The image is intentionally displayed before QA finishes. Publish its
      // layout metadata at the same time so the download UI never briefly
      // mislabels an already-normalized page as the raw source.
      if (originalCandidate.pageLayout) {
        setGenerationHistory(items => addGenerationHistoryItem(items, {
          id: Date.now(), img: finalImageStr,
          originalImage: originalCandidate.originalImage,
          pageLayout: originalCandidate.pageLayout,
          metadataContext: originalCandidate.metadataContext,
          workflowSource: originalCandidate.workflowSource,
          qualityPass: false, selected: true,
        }));
      }
      const repairEnabled = allowImageQualityRepair && !generationOptions.reviewOnly;
      statCallback(repairEnabled
        ? '[QUALITY QA] キャラクターシート・人物・手・小物・吹き出しを検査中です。明確な重大欠陥だけ最大3回修正します。未確認だけなら最良画像を保持します。'
        : '[QUALITY QA] 自動修正OFF：元画像を表示して品質検査します。追加の画像生成は行いません。');

      const qualityOutcome = await runImageQualityFailsafe({
        allowRepair: repairEnabled,
        shouldStop: () => qualityRetryAbortRef.current || scenarioRunEpochRef.current !== qualityRunEpoch
          || (isFullAutoMode && fullAutoAbortRef.current),
        analyzeFailure: async ({ candidate, originalPrompt, issues, history, feedback }) => {
          progressPhase = '修正方針の解析';
          const response = await callAI(
            buildImageFailureAnalysisPrompt({ originalPrompt, issues, history, feedback }),
            buildImageQualityQaImageParts({ candidate, referenceImages: images }),
            null, msg => statCallback(`[修正解析] ${msg}`)
          );
          return response.text;
        },
        originalCandidate,
        originalPrompt: currentPrompt,
        mode: qualityMode,
        reviewCandidate: reviewImageCandidate,
        reviewCriticalCamera: reviewCriticalCameraCandidate,
        generateRepairCandidate: (repairPrompt, sourceCandidate = originalCandidate) => generateImageCandidate(repairPrompt, {
          repair: true,
          repairSource: isOpenAIEngine ? sourceCandidate : null,
        }),
        repairSourceMode: isOpenAIEngine ? 'source-image' : 'regenerate',
        repairPromptMaxChars: isOpenAIEngine ? undefined : GEMINI_IMAGE_REPAIR_PROMPT_MAX_CHARS,
        compareCandidates: async (original, repair, originalPrompt, comparisonOptions = {}) => {
          progressPhase = '画像候補の比較';
          statCallback('[QUALITY QA] 元画像と修正版を直接比較し、台詞・人物・動作を優先して自動選択します。');
          const comparisonParts = [
            ...buildImageQualityQaImageParts({ candidate: original }),
            ...buildImageQualityQaImageParts({ candidate: repair, referenceImages: images }),
          ];
          const comparison = await callAI(
            buildImageQualityComparisonPrompt({ scenario, castList, finalPrompt: originalPrompt, ...comparisonOptions }),
            comparisonParts, null, msg => statCallback(`[QUALITY QA] ${msg}`)
          );
          return parseImageQualityComparison(comparison.text);
        },
        onProgress: (msg) => statCallback(`[QUALITY QA] ${msg}`),
      });
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;
      const qualityResult = qualityOutcome.finalReview;
      const hasDefiniteFinalFailure = qualityResult?.pass !== true
        && Array.isArray(qualityResult?.issues)
        && qualityResult.issues.some(issue => isMaterialImageQualityIssue(issue, qualityResult.evidenceContext));
      setImageQualityNeedsRepair(Boolean(repairEnabled && hasDefiniteFinalFailure));
      if (qualityResult.observations) {
        const labels = { title: 'タイトル', dialogue: 'セリフ・無言', hands: '左右の手', props: '小道具' };
        Object.entries(qualityResult.observations).forEach(([key, value]) => {
          if (value) setGenLog(prev => [...prev, `[品質検査 / ${labels[key] || key}] ${value}`]);
        });
      }
      for (const entry of qualityResult.spatialChecks || []) {
        if (!entry.camera_geometry) continue;
        const axes = { elevation: '高低・上下角', azimuth: '左右・前後', framing: '寄り引き', lens: 'レンズ遠近' };
        for (const [axis, label] of Object.entries(axes)) {
          const dimension = entry.camera_geometry.dimensions?.[axis];
          if (dimension) statCallback(`[カメラ検査 / ${entry.panel}コマ / ${label} / ${dimension.status}] 指定: ${dimension.requested} / 観察: ${dimension.observed}`);
        }
      }
      const qualityReviewUnverified = Array.isArray(qualityOutcome.originalReview?.issues)
        && qualityOutcome.originalReview.issues.length > 0
        && qualityOutcome.originalReview.issues.every((issue) => issue?.type === 'unverified');

      if (qualityOutcome.originalReview.nativeChroma?.status === 'detected') {
        setGenLog(prev => [...prev,
          '[QUALITY QA] ⚠️ 原寸RGBに広い色残りを検出しました。物体認識は行わず、この結果だけでは自動有料修正しません。',
          ...qualityOutcome.originalReview.issues.map(issue => `[QUALITY QA] ${formatImageQualityIssue(issue)}`)]);
      } else if (!qualityOutcome.originalReview.pass && qualityReviewUnverified) {
        setGenLog(prev => [
          ...prev,
          '[QUALITY QA] ℹ️ 画像品質レビューは未完了です。検査証拠が不足または矛盾しているため、合格を確認できません。',
          ...qualityOutcome.originalReview.issues.map((issue) => `[QUALITY QA] ${formatImageQualityIssue(issue)}`)
        ]);
      } else if (!qualityOutcome.originalReview.pass) {
        setGenLog(prev => [
          ...prev,
          '[QUALITY QA] ⚠️ 元画像の品質検査で問題を検出しました。',
          ...qualityOutcome.originalReview.issues.map((issue) => `[QUALITY QA] ${formatImageQualityIssue(issue)}`)
        ]);
      }
      if (qualityOutcome.repairReview && !qualityOutcome.repairReview.pass) {
        setGenLog(prev => [
          ...prev,
          '[QUALITY QA] ⚠️ 修正版画像も品質検査NGでした。',
          ...qualityOutcome.repairReview.issues.map((issue) => `[QUALITY QA] ${formatImageQualityIssue(issue)}`)
        ]);
      }
      if (qualityOutcome.fallbackReview && !qualityOutcome.fallbackReview.pass) {
        setGenLog(prev => [...prev, '[QUALITY QA] 印字を簡略化した最終候補にも確認事項が残りました。',
          ...qualityOutcome.fallbackReview.issues.map(issue => `[QUALITY QA] ${formatImageQualityIssue(issue)}`)]);
      }

      if (qualityOutcome.candidate !== originalCandidate) {
        generatedModelId = qualityOutcome.candidate.modelId;
        generatedMimeType = qualityOutcome.candidate.mimeType;
      }
      const acceptedImageStr = `data:${generatedMimeType};base64,${qualityOutcome.candidate.base64Img}`;
      setGeneratedImage(acceptedImageStr);
      const timestamp = Date.now();
      const acceptedHistoryItem = {
        id: timestamp, img: acceptedImageStr,
        modelId: qualityOutcome.candidate.modelId,
        mimeType: qualityOutcome.candidate.mimeType || 'image/png',
        generatedAt: new Date(timestamp).toISOString(),
        originalImage: qualityOutcome.candidate.originalImage,
        pageLayout: qualityOutcome.candidate.pageLayout,
        metadataContext: qualityOutcome.candidate.metadataContext,
        workflowSource: qualityOutcome.candidate.workflowSource,
        fallbackOccurred: Boolean(qualityOutcome.candidate.modelId
          && qualityOutcome.candidate.modelId !== GEMINI_IMAGE_MODEL
          && !qualityOutcome.candidate.modelId.startsWith('gpt-')),
        qualityPass: qualityResult?.pass === true, selected: true,
      };
      setGenerationHistory(prev => {
        const candidateImages = new Set(qualityOutcome.candidates.map(entry =>
          `data:${entry.candidate.mimeType || 'image/png'};base64,${entry.candidate.base64Img}`));
        return addGenerationHistoryItem(prev, acceptedHistoryItem, { removeImages: candidateImages });
      });

      if (!qualityOutcome.canContinue) {
        setIsGenerationError(true);
        fullAutoAbortRef.current = true;
        showStatus('修正リトライを停止しました。生成済み画像は履歴に保持しています。');
        return false;
      }
      // Reinspection without a changed image must not create another download.
      if (!(generationOptions.reviewExisting && acceptedImageStr === generatedImage)) {
        const saved = await autoSaveFinalImage(acceptedHistoryItem, () => qualityRunEpoch === scenarioRunEpochRef.current
          && !qualityRetryAbortRef.current && (!isFullAutoMode || !fullAutoAbortRef.current));
        if (!saved) return false;
      }
      setIsGenerationError(false);
      if (qualityOutcome.validationWarning) {
        const comparedCandidate = qualityOutcome.history?.some(entry => entry.comparison);
        setGenLog(prev => [...prev,
          `[QUALITY QA] ${comparedCandidate ? '比較で保持した最良候補を採用' : '元画像を保持'}・警告あり（${formatImageQualityStopReason(qualityOutcome.stopReason)}）。後続作業を続行します。`,
          ...qualityResult.issues.map(issue => `[残る確認事項] ${formatImageQualityIssue(issue)}`),
        ]);
      } else {
        statCallback(qualityOutcome.attempts > 1
          ? `[QUALITY QA] ✅ PASS — ${qualityOutcome.attempts - 1}回の修正後、品質ゲートを通過しました。`
          : '[QUALITY QA] ✅ PASS — 品質ゲートを通過しました。');
      }

      // [v3.56] OpenAIモデル (gpt-image-2等) は正規モデルとして扱い、フォールバック警告を出さない
      const isOpenAIModel = generatedModelId && generatedModelId.startsWith("gpt-");
      if (generatedModelId && generatedModelId !== GEMINI_IMAGE_MODEL && !isOpenAIModel) {
        // gemini-2.5系やimagen系はフォールバック扱い（妥協版警告を表示）
        setIsFallbackUsed(true);
        setGenLog(prev => [
          ...prev,
          "[WARNING] 画像モデル(Nano Banana 2.1)への接続がタイムアウト等で失敗しました。",
          "[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。",
          "[GUIDE] ★手動生成を推奨します★",
          "[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          `[GUIDE] 2. ${isOpenAIEngine ? 'ChatGPT' : 'Gemini'}(Web版)を開く: ${isOpenAIEngine ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          "[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",
          `[GUIDE] 4. 貼り付けて${isOpenAIEngine ? '送信する' : '「思考モード」で送信する'}`,
          "[COMPLETE] Image successfully generated (with warnings)."
        ]);
      } else {
        setIsFallbackUsed(false);
        setGenLog(prev => [...prev, qualityOutcome.validationWarning
          ? '[COMPLETE] Best available image selected (quality warning).'
          : '[COMPLETE] Image successfully generated.']);
      }
      showStatus(qualityOutcome.validationWarning
        ? qualityOutcome.history?.some(entry => entry.comparison)
          ? "比較で保持した候補を採用しました（品質警告あり）"
          : "元画像を保持しました（品質警告あり）"
        : "画像生成完了！");
      return true; // [v2.78] フルオート連鎖用: 成功
    } catch (error) {
      if (qualityRunEpoch !== scenarioRunEpochRef.current) return false;
      console.error(error);
      setIsGenerationError(true);

      const errMsg = error.message || "";
      let guideLines = [];

      if (isOpenAIEngine && isOpenAIImageVerificationError(errMsg, openAIImageQuality)) {
        setOpenAIImageVerificationWarning(OPENAI_IMAGE_VERIFICATION_MESSAGE);
        if (isFullAutoMode) fullAutoAbortRef.current = true;
        guideLines = [`[ERROR GUIDE] ${OPENAI_IMAGE_VERIFICATION_MESSAGE}`];
      } else if (errMsg.includes("OpenAI APIキーが設定されていません。")) {
        setShowModal(true);
        guideLines = [
          "[ERROR GUIDE] OpenAI APIキーをメモリから読み取れませんでした。作業内容を保持したまま再入力画面を開きます。"
        ];
      } else if (error.code === 'NO_IMAGE_OUTPUT') {
        guideLines = formatApiErrorGuide(error).split('\n');
      } else if (errMsg.includes("Unknown parameter") || errMsg.includes("Invalid parameter") || errMsg.includes("Invalid value at") || errMsg.includes("invalid_request")) {
        // [v3.56] APIリクエストのパラメータ不正（コンテンツポリシーとは無関係）
        guideLines = [
          `[ERROR GUIDE] ⚙️ APIパラメータの形式が不正です（${isOpenAIEngine ? 'OpenAI' : 'Google'}側の仕様変更の可能性）。`,
          "[ERROR GUIDE] 【原因】AIモデルの仕様更新により、送信パラメータが合わなくなっている可能性があります。",
          "[ERROR GUIDE] 【対処法】アプリ側の送信形式を修正する必要があります。通信障害として再試行しても解決しません。"
        ];
      } else if (isImagePolicyError(errMsg)) {
        const policyRepairEnabled = allowImageQualityRepair && !generationOptions.reviewOnly && !qualityRetryAbortRef.current;
        setPolicyErrorMsg(errMsg);
        lastPolicyErrorRef.current = errMsg; // ref経由で即時参照可能にする
        setShowPolicyChoice(!policyRepairEnabled || !generationOptions.suppressPolicyChoice);
        guideLines = [
          "[ERROR GUIDE] 🚨 表現の一部がAIの安全基準（ポリシー）に触れたため、生成がスキップされました。",
          policyRepairEnabled
            ? `[ERROR GUIDE] 【自動修正】安全な表現への修正と画像再生成を最大${MAX_POLICY_RETRIES}回まで内部で試します。`
            : "[ERROR GUIDE] 自動修正は無効です。この実行では追加の修正解析・画像生成を行いません。",
          "[ERROR GUIDE] 【対処法】拒否内容を確認し、許可された表現に修正してください。"
        ];
      } else if (errMsg.includes("not found") || errMsg.includes("not supported") || errMsg.includes("404") || errMsg.includes("403") || errMsg.includes("401")) {
        // フルオートおよびエンドレスモードを停止
        if (isFullAutoMode) {
          fullAutoAbortRef.current = true;
        }
        guideLines = [
          `[ERROR GUIDE] 🔑 現在のAPIキーでは、本アプリ経由での画像生成が許可されていないか、無効になっています（${isOpenAIEngine ? 'OpenAI' : 'Google'}の権限設定）。`,
          `[ERROR GUIDE] 【対処法】本アプリでの自動生成は一旦諦め、以下の手順で公式ウェブ版から手動で生成してください。`,
          "[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",
          `[ERROR GUIDE] 2. ${isOpenAIEngine ? 'ChatGPTウェブ版' : 'Geminiウェブ版'} を開きます: ${isOpenAIEngine ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。`
        ];
      } else {
        guideLines = formatApiErrorGuide(error).split('\n');
      }

      setGenLog(prev => [
        ...prev,
        `[ERROR] ${error.message} `,
        "[SYSTEM] Sequence Aborted.",
        "--------------------------------------------------",
        ...guideLines
      ]);
      showStatus(`生成エラー: ${error.message} `);
      return false; // [v2.78] フルオート連鎖用: 失敗
      // alert(`画像生成に失敗しました。\nエラー: ${ error.message } `); // Disable alert to show UI guide instead
    } finally {
      clearInterval(genTimer);
      if (qualityRunEpoch === scenarioRunEpochRef.current) {
        const elapsed = Math.max(0, Date.now() - generationStartedAt);
        setGenLog(prev => [...prev.filter(log => !log.startsWith('[WAIT]')),
          `[WAIT] STEP4終了（合計${Math.floor(elapsed / 1000)}秒）`]);
        setIsGeneratingImage(false);
      }
    }
  };

  const runPolicyAutoRetries = async ({ initialPrompt, initialPolicyError, generationOptions = {} }) => {
    if (!initialPrompt || !initialPolicyError) return false;
    if (!allowImageQualityRepair || generationOptions.reviewOnly || qualityRetryAbortRef.current) {
      setShowPolicyChoice(true);
      setGenLog(prev => [...prev, '[POLICY AUTO-FIX] 自動修正OFF・検査専用・停止指定のため、追加の修正解析・画像生成を行いません。']);
      return false;
    }
    const policyEpoch = scenarioRunEpochRef.current;
    const shouldStop = () => !allowImageQualityRepair || generationOptions.reviewOnly || qualityRetryAbortRef.current
      || policyEpoch !== scenarioRunEpochRef.current || (isFullAutoMode && fullAutoAbortRef.current);

    setShowPolicyChoice(false);
    setPolicyAutoRetrying(true);
    setIsFixingPolicy(true);
    setPolicyPromptHistory([initialPrompt]);
    setPolicyFixLog(`> [AUTO-FIX 0/${MAX_POLICY_RETRIES}] コンテンツポリシー自動修正を開始します。`);

    try {
      const result = await retryImagePolicyGeneration({
        initialPrompt,
        initialPolicyError,
        shouldStop,
        validatePrompt: assertImageGenerationPrompt,
        onAttempt: ({ phase, attempt, maxRetries, reason, repairError }) => {
          if (phase !== 'replan' || shouldStop()) return;
          const cause = {
            no_prompt_change: '実質的な変更なし',
            repeated_prompt: '拒否済みの文への逆戻り',
            invalid_repair: '必須条件との不整合',
            no_safe_revision: '条件を保つ修正案をまだ特定できていない',
          }[reason] || '修正案の取得失敗';
          setGenLog(prev => [...prev, `[POLICY AUTO-FIX] 修正案を不採用（${cause}）。${repairError || ''} 画像APIへ再送せず、${attempt < maxRetries ? 'この理由を次の修正検討へ引き継ぎます。' : '今回の修正検討上限に達したため、結果をまとめます。'}`]);
        },
        repairPrompt: async ({ prompt, policyError, attempt, maxRetries, repairFeedback }) => {
          if (shouldStop()) return null;
          setIsFixingPolicy(true);
          setPolicyFixLog(prev => `${prev}\n> [AUTO-FIX ${attempt}/${maxRetries}] 拒否原因を解析し、安全な表現へ修正中...`);
          setGenLog(prev => [
            ...prev,
            `[POLICY AUTO-FIX] 🔄 自動修正 ${attempt}/${maxRetries}（変更内容と必須条件の検査に通った場合だけ画像APIを再利用します）...`
          ]);
          return fixPolicyViolation({
            finalPrompt: prompt,
            policyErrorMsg: policyError,
            selectedEngine,
            repairFeedback,
            shouldStop,
            onProgress: (msg) => {
              if (policyEpoch === scenarioRunEpochRef.current) setPolicyFixLog(prev => `${prev}\n> ${msg}`);
            },
          });
        },
        generateImage: async ({ prompt, attempt, maxRetries }) => {
          if (shouldStop()) return { success: false, policyError: '' };
          setFinalPrompt(prompt);
          setPolicyPromptHistory(prev => prev[prev.length - 1] === prompt ? prev : [...prev, prompt]);
          setPolicyErrorMsg("");
          lastPolicyErrorRef.current = "";
          setIsFixingPolicy(false);
          setGenLog(prev => [
            ...prev,
            `[POLICY AUTO-FIX] 画像再生成 ${attempt}/${maxRetries} を開始します。`
          ]);
          const success = await generateImageOnce(true, prompt, {
            ...generationOptions,
            suppressPolicyChoice: true,
            policyAttempt: attempt,
          });
          return {
            success,
            policyError: lastPolicyErrorRef.current,
          };
        },
      });
      if (policyEpoch !== scenarioRunEpochRef.current || result.reason === 'cancelled') return false;

      setPolicyPromptHistory(result.promptHistory);
      setFinalPrompt(result.prompt);

      if (result.success) {
        setPolicyErrorMsg("");
        lastPolicyErrorRef.current = "";
        setShowPolicyChoice(false);
        setGenLog(prev => [
          ...prev,
          `[POLICY AUTO-FIX] ✅ 修正検討${result.repairAttempts}回・画像再生成${result.attempts}回で成功しました。`
        ]);
        return true;
      }

      if (result.policyError) {
        setPolicyErrorMsg(result.policyError);
        lastPolicyErrorRef.current = result.policyError;
      }
      const exhausted = result.reason === 'policy_retry_exhausted';
      setGenLog(prev => [
        ...prev,
        exhausted
          ? `[POLICY AUTO-FIX] ⚠️ 修正検討${result.repairAttempts}回（画像再生成${result.attempts}回）の上限まで検討しましたが、画像生成に至りませんでした。取得済みの画像と有効な指示文を保持します。${result.repairError || result.policyError || ''}`
          : `[POLICY AUTO-FIX] ⚠️ 自動修正を継続できませんでした（${result.reason}）。取得済みの画像と指示文を保持します。`
      ]);
      setShowPolicyChoice(!isEndlessModeRef.current && result.reason !== 'generation_failed');
      return false;
    } catch (error) {
      if (policyEpoch !== scenarioRunEpochRef.current) return false;
      console.error("[POLICY AUTO-FIX] Error:", error);
      setPolicyFixLog(prev => `${prev}\n> [ERROR] ${error.message}`);
      setGenLog(prev => [...prev, `[POLICY AUTO-FIX] ❌ 自動修正に失敗: ${error.message}`]);
      setShowPolicyChoice(!isEndlessModeRef.current);
      return false;
    } finally {
      if (policyEpoch === scenarioRunEpochRef.current) {
        setIsFixingPolicy(false);
        setPolicyAutoRetrying(false);
      }
    }
  };

  const regenerateImage = async (skipGuard = false, overridePrompt = null, generationOptions = {}) => {
    const generationEpoch = scenarioRunEpochRef.current;
    const currentPrompt = overridePrompt || finalPrompt;
    const policyRepairEnabled = allowImageQualityRepair && !generationOptions.reviewOnly;
    setPolicyPromptHistory([]);
    const success = await generateImageOnce(skipGuard, overridePrompt, {
      ...generationOptions,
      suppressPolicyChoice: policyRepairEnabled,
    });
    if (generationEpoch !== scenarioRunEpochRef.current) return false;
    if (success || !lastPolicyErrorRef.current) return success;
    if (!policyRepairEnabled || qualityRetryAbortRef.current) return false;

    return runPolicyAutoRetries({
      initialPrompt: currentPrompt,
      initialPolicyError: lastPolicyErrorRef.current,
      generationOptions,
    });
  };

  // --- [v2.44] コンテンツポリシー救済: 2段階置換方式 + 進捗表示 ---
  // Phase 1: AIが「問題箇所 → 安全な置換」のJSONテーブルを出力
  // Phase 2: そのテーブルを機械的に元プロンプトに適用（全文再出力不要）
  const regenerateSafePrompt = async () => {
    beginApiWork();
    if (!finalPrompt || !policyErrorMsg.trim()) return;
    const policyEpoch = scenarioRunEpochRef.current;
    setIsFixingPolicy(true);
    setPolicyFixLog("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");

    let policyTickCount = 0;
    const policyTimer = setInterval(() => {
      if (policyEpoch !== scenarioRunEpochRef.current) return;
      policyTickCount++;
      setPolicyFixLog(prev => {
        const elapsed = Math.floor(policyTickCount * 1.0);
        const timerLine = `\n> ⏳ AI分析中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI分析中\.\.\..*\(\d+秒経過\)/;
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, timerLine);
        }
        return prev + timerLine;
      });
    }, 1000);

    try {
      const result = await fixPolicyViolation({
        finalPrompt,
        policyErrorMsg,
        selectedEngine,
        onProgress: (msg) => {
          if (policyEpoch === scenarioRunEpochRef.current) setPolicyFixLog(prev => prev + `\n> ${msg}`);
        }
      });

      if (policyEpoch !== scenarioRunEpochRef.current) return;
      if (result.success && result.modifiedPrompt) {
        setFinalPrompt(result.modifiedPrompt);
        if (result.method === "replacement") {
          setPolicyFixLog(prev => prev + `\n> [Phase 5/5] ✅ ${result.appliedCount}箇所を修正しました（${result.failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`);
        } else {
          setPolicyFixLog(prev => prev + "\n> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。");
        }
        setPolicyFixLog(prev => prev + `\n> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${isOpenAIEngine ? 'ChatGPT' : 'Gemini'} Web版で生成してください。`);
        setPolicyErrorMsg("");
        lastPolicyErrorRef.current = "";
      }
    } catch (error) {
      if (policyEpoch !== scenarioRunEpochRef.current) return;
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [ERROR] ${error.message}`);
    } finally {
      clearInterval(policyTimer);
      if (policyEpoch === scenarioRunEpochRef.current) setIsFixingPolicy(false);
    }
  };

  // 上限到達後に利用者がもう一度試す場合も、同じ最大5回の内部ループを使う。
  const handlePolicyAutoFix = async () => {
    beginApiWork();
    const errorMsg = lastPolicyErrorRef.current || policyErrorMsg;
    if (!finalPrompt || !errorMsg.trim()) return;
    if (allowImageQualityRepair) qualityRetryAbortRef.current = false;
    return runPolicyAutoRetries({
      initialPrompt: finalPrompt,
      initialPolicyError: errorMsg,
    });
  };

  // [v4.2.0] 「Web版に切り替える」ボタン押下時のハンドラ
  const handlePolicySwitchToWeb = () => {
    setShowPolicyChoice(false); // メッセージボックスを閉じる
    setIsPolicyPanelOpen(true); // 手動救済パネルを展開する

    // [v4.2.4] Web版切り替え時にポリシーエラー情報をクリア
    // これを行わないと、次回の通常コピー時に copyPrompt の条件判定で
    // エラーが残っていると誤認され、救済パネルが再展開されるバグが発生する
    setPolicyErrorMsg("");
    lastPolicyErrorRef.current = "";

    // プロンプトをクリップボードにコピー
    if (finalPrompt) {
      let copiedPrompt;
      try {
        assertPromptEndingModeConsistency({ prompt: finalPrompt, punchlineType: resolvedPunchlineTypeRef.current || punchlineType });
        assertPrintableDialogue(finalPrompt);
        copiedPrompt = prepareWebCopyPrompt(finalPrompt);
      } catch (error) {
        showStatus(error.message);
        return;
      }
      navigator.clipboard.writeText(copiedPrompt);
    }

    const webUrl = isOpenAIEngine ? 'https://chatgpt.com/' : 'https://gemini.google.com/app';
    const engineName = isOpenAIEngine ? 'ChatGPT' : 'Gemini';

    setGenLog(prev => [
      ...prev,
      "[POLICY WEB-SWITCH] 📋 プロンプトをクリップボードにコピーしました。",
      `[POLICY WEB-SWITCH] 🌐 ${engineName} Web版で画像を生成してください: ${webUrl}`,
      "[POLICY WEB-SWITCH] 💡 Web版に貼り付け時、キャラクターシート画像も一緒に添付すると再現性が高まります。"
    ]);
    showStatus(`📋 プロンプトをコピーしました → ${engineName} Web版に貼り付けてください`);
  };

  // [v2.78] フルオート生成トリガー監視
  useEffect(() => {
    if (triggerFullAuto > 0 && !fullAutoAbortRef.current) {
      runFullAuto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerFullAuto]);

  // --- [v2.78] フルオート生成モード ---
  // STEP2→3→4を自動連鎖実行する。handleFullAutoToggleから呼ばれる。
  const runFullAuto = async () => {
    if (!castList || castList.length < 20) {
      showStatus("先にキャラクターシートをアップロードしてください。");
      setIsFullAutoMode(false);
      return;
    }

    // フルオート開始
    const fullAutoRun = (scenarioRunEpochRef.fullAutoRun || 0) + 1;
    scenarioRunEpochRef.fullAutoRun = fullAutoRun;
    let fullAutoEpoch = invalidateScenarioRun();
    let nextRoundQueued = false;
    const ownsRun = () => scenarioRunEpochRef.fullAutoRun === fullAutoRun;
    const isCurrent = () => ownsRun() && scenarioRunEpochRef.current === fullAutoEpoch && !fullAutoAbortRef.current;
    qualityRetryAbortRef.current = true;
    setPolicyAutoRetrying(false);
    fullAutoAbortRef.current = false;
    setIsFullAutoMode(true);
    setEnableChatGPTMode(isOpenAIEngine);

    try {
    // [v4.2.7] 新しい周回の開始時に、前回の生成データ（シナリオ、プロンプト、画像等）を即時リセット
    // これにより currentStep が 2 に下がり、画面レイアウトの再レンダリングが先行して完了します
    setScenario("");
    setExplanation("");
    setExplanationNotice("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setScenarioThought("");
    setAssembleThought("");
    setGenLog([]);
    setOriginalScenario("");
    setEnhanceLog("");
    setPolicyErrorMsg("");
    lastPolicyErrorRef.current = "";
    setShowPolicyChoice(false);

    // --- STEP2: シナリオ生成 ---
    setFullAutoStep(2);
    // カテゴリをランダムで1〜2個選択し、直接オブジェクトとして生成
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    const count = Math.random() > 0.5 ? 2 : 1;
    const selectedIds = shuffled.slice(0, count).map(c => c.id);
    const overrideCategories = categories.map(c => ({ ...c, checked: selectedIds.includes(c.id) }));
    // UIにも反映
    setCategories(overrideCategories);
    // 手入力済みの場所・服装は、フルオートと連続生成の各周回でも保持する。
    // 空欄の場合だけ、従来どおりAIが題材に合わせて選ぶ。
    setInputMode("news"); // ニュース検索モード固定

    // 自動スクロール: STEP2へ (ステート更新に伴う再レンダリング完了を待ってからスクロールを実行)
    await new Promise(r => setTimeout(r, 400));
    if (!isCurrent()) return;
    step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await new Promise(r => setTimeout(r, 600)); // スクロール完了をしっかり待つ

    if (!isCurrent()) return;
    const scenarioRequest = generateScenarioFromNews(overrideCategories, "news");
    fullAutoEpoch = scenarioRunEpochRef.current;
    const generatedScenario = await scenarioRequest;
    if (!isCurrent()) return;
    if (fullAutoAbortRef.current || !generatedScenario) {
      setIsFullAutoMode(false);
      setFullAutoStep(0);
      setIsAborting(false);
      if (fullAutoAbortRef.current) showStatus("⏹ フルオートを中断しました。");
      return;
    }

    // --- STEP3: プロンプト組立 ---
    setFullAutoStep(3);
    step3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    await new Promise(r => setTimeout(r, 300));

    if (!isCurrent()) return;
    const fullAutoProviderFamily = getCurrentPromptProviderFamily();
    const generatedPrompt = await assemblePrompt(true, generatedScenario, fullAutoProviderFamily);
    if (!isCurrent()) return;
    if (fullAutoAbortRef.current || !generatedPrompt) {
      setIsFullAutoMode(false);
      setFullAutoStep(0);
      setIsAborting(false);
      if (fullAutoAbortRef.current) showStatus("⏹ フルオートを中断しました。");
      return;
    }

    // --- STEP4: 画像生成（コンテンツポリシー自動リトライ付き） ---
    setFullAutoStep(4);
    // フルオート時、進捗がすべて見えるように画面の「一番下」までスクロールする
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    await new Promise(r => setTimeout(r, 300));

    if (!isCurrent()) return;
    // 手動生成と同じ共通ループで、自動修正設定を守る。
    const step4ok = await regenerateImage(true, generatedPrompt);
    if (!isCurrent()) return;

    // ポリシー関連のステートをクリーンアップ
    setIsFixingPolicy(false);

    // ポリシーエラーで終了した時の処理
    const hasPolicyError = !!lastPolicyErrorRef.current;
    if (!step4ok && hasPolicyError) {
      setGenLog(prev => [
        ...prev,
        '[FULL-AUTO POLICY-FIX] ⚠️ ポリシーエラーのため自動生成を停止しました。修正の実行状況は上のログを確認してください。',
        isEndlessModeRef.current
          ? "[FULL-AUTO] 次の作品に進みます..."
          : "[FULL-AUTO] ユーザーに判断を委ねます。メッセージボックスを表示します。"
      ]);
      if (!isEndlessModeRef.current) {
        // 通常フルオート: メッセージボックス（選択UI）を表示してユーザーに判断を委ねる
        setShowPolicyChoice(true);
      }
    } else {
      // 正常終了または一般のエラーで終了した場合は選択UIとエラーRefをクリア
      setShowPolicyChoice(false);
      lastPolicyErrorRef.current = "";
    }
    
    // 最終スクロール: 生成画像へ
    await new Promise(r => setTimeout(r, 800));
    if (!isCurrent()) return;
    imageResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (isEndlessModeRef.current) {
      // 連続生成（エンドレスモード）: 成功でも失敗でも次へ進む
      if (!fullAutoAbortRef.current) {
        showStatus(step4ok
          ? "🔄 連続生成モードON：次の作品を生成します..."
          : hasPolicyError
            ? "🔄 ポリシーエラーのため次の作品に進みます..."
            : "🔄 生成エラーのため次の作品に進みます...");
        setTimeout(() => {
          if (isCurrent()) {
            setTriggerFullAuto(prev => prev + 1);
          } else if (ownsRun()) {
            setIsFullAutoMode(false);
            setFullAutoStep(0);
            setIsAborting(false);
          }
        }, 2000); // 少し待ってから次へ
        nextRoundQueued = true;
      } else {
        setIsFullAutoMode(false);
        setFullAutoStep(0);
        setIsAborting(false);
        showStatus("⏹ 連続生成を中断しました。");
      }
    } else {
      // フルオート完了（通常モード：ボタン自動解除）
      setIsFullAutoMode(false);
      setFullAutoStep(0);
      setIsAborting(false);
      if (step4ok) {
        showStatus("🎉 フルオート生成完了！4コマ漫画が生成されました！");
      }
    }
    } catch (error) {
      if (isCurrent()) {
        fullAutoAbortRef.current = true;
        setGenLog(prev => [...prev, `[FULL-AUTO ERROR] ${translateApiError(error)}`]);
        showStatus('フルオートを停止しました。エラー理由を確認し、続きのSTEPから再実行してください。');
      }
    } finally {
      if (ownsRun() && !nextRoundQueued) {
        isFullAutoModeRef.current = false;
        setIsFullAutoMode(false);
        setFullAutoStep(0);
        setIsAborting(false);
      }
    }
  };

  // [v2.78] フルオートトグルハンドラ
  // castList有 → 即実行 / castList無 → 武装待機（ドロップで自動開始）
    const handleFullAutoToggle = async () => {
    scenarioRunEpochRef.fullAutoRun = (scenarioRunEpochRef.fullAutoRun || 0) + 1;
    if (isFullAutoMode) {
      stopApiProcessing();
      return;
    }

      fullAutoAbortRef.current = false;
    setIsAborting(false);
    setIsFullAutoMode(true);
    
    if (castList && castList.length >= 20) {
      // STEP1完了済み → 状態更新後に即実行させる
      setTriggerFullAuto(prev => prev + 1);
    } else {
      // STEP1未完了 → 武装待機
      showStatus("🚀 フルオート待機中: キャラクターシートをドロップしてください");
    }
  };

  // Manual STEP actions and full-auto share the same stop boundary.
  const stopApiProcessing = () => {
    cancelApiWork();
    fullAutoAbortRef.current = true;
    isFullAutoModeRef.current = false;
    isEndlessModeRef.current = false;
    scenarioRunEpochRef.fullAutoRun = (scenarioRunEpochRef.fullAutoRun || 0) + 1;
    invalidateScenarioRun('強制停止');
    if (isAnalyzing || is360Analyzing) setAnalyzeThought(prev => `${prev}\n> ⏹ 強制停止しました。取得済みデータを保持します。`);
    if (isAssembling) setAssembleThought(prev => `${prev}\n> ⏹ 強制停止しました。`);
    if (isGeneratingImage || isFixingPolicy || policyAutoRetrying) setGenLog(prev => [...prev.filter(log => !log.startsWith('[WAIT]')), '[STOPPED] 強制停止しました。取得済み画像を保持します。']);
    setIsAnalyzing(false);
    isAnalyzingRef.current = false;
    setIs360Analyzing(false);
    setIsEndlessMode(false);
    
    // [v4.2.7] 中断時に即座にUIのローディング状態を解除
    setIsSearching(false);
    setIsAssembling(false);
    setIsGeneratingImage(false);
    setIsFixingPolicy(false);
    setIs360CameraWorking(false);
    
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    setIsAborting(false);
    showStatus("⏹ API処理を強制停止しました。取得済みの台本・画像は残しています。");
  };

  // Determine Current Step
  const currentStep = getWorkflowStep({ castList, scenario, finalPrompt, generatedImage,
    promptAssemblyRun: promptAssemblyRunRef.completedRun,
    imageSource: generationHistory.find(item => item.img === generatedImage)?.workflowSource });
  const isApiProcessing = isAnalyzing || is360Analyzing || isSearching || isEnhancing || isAssembling
    || isGeneratingImage || isFixingPolicy || is360CameraWorking || policyAutoRetrying || isFullAutoMode;

  // --- Return all 113 variables needed by JSX ---
  return {
    imageInputBudget,
    imageInputError,
    referenceAssets,
    editReferenceItem,
    editCastList,
    editBackground,
    imageEditDrafts,
    setImageEditDraft,
    recognitionText,
    setRecognitionText,
    referenceEditorError,
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
    imageQualityNeedsRepair,
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
    normalizeDisplayedPage,
    editGeneratedImage,
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
    setScenario: setScenarioFromUser,
    setScenarioModelId,
    setShowModal,
    setShowOpenAIKeyModal,
    setStyleJson,
    step1Reset,
    setTargetDate,
    showModal,
    showOpenAIKeyModal,
    showStatus,
    status,
    step2Ref,
    step3Ref,
    styleJson,
    targetDate,
    toggleCategory,
    usedModel,
  };
}
