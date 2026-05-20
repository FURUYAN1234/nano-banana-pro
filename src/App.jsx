import React, { useState, useRef, useEffect, useCallback } from 'react';

// CANARY TEST
console.log("HELLO_USER_FIXED_VERSION_2_25");

import {
  Camera,
  RefreshCw,
  Wand2,
  FileText,
  Copy,
  Loader2,
  CheckCircle2,
  Trash2,
  BrainCircuit,
  UploadCloud,
  Zap,
  ChevronRight,
  Sparkles,
  Terminal,
  Image as ImageIcon,
  Plus,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  Check,
  Square,
  Globe,
  Edit3,
  Download,
  ChevronDown,
  LogOut
} from 'lucide-react';
// --- Imports ---
import { setApiKey, getApiKey } from './lib/gemini';
import { generateImageWithImagen } from './lib/imagen';
import { generateImageWithOpenAI, setOpenAIApiKey, getOpenAIApiKey } from './lib/openai';
import { callAI, setActiveEngine, getActiveEngine, getEngineDisplayName } from './lib/ai-provider';
import { getLocationDetails, getRandomReactions } from './lib/knowledge';

// --- Refactored Imports (Phase 1-2) ---
import { SYSTEM_VERSION, getPunchlineLabel, DEFAULT_CATEGORIES, getModelBadgeInfo, EMOTION_STYLES, cameraAngles, cameraLensMap, DYNAMIC_CAMERA_PROTOCOL, ANTI_CHARSHEET_PREFIX } from './lib/constants';
import { translateApiError, applySafetyAgeUp, sanitizeForDocumentary } from './lib/safety-filters';
import { cropEquirectangular, validate360Image, get360AnalysisPrompt, parse360Analysis } from './lib/panorama360';
import { getCharacterAnalysisPrompt, getScenarioEnhancePrompt, getScenarioPrompt, getPolicyAnalysisPrompt, getPolicyFallbackPrompt, buildChatGPTMangaPrompt, buildGeminiMangaPrompt } from './lib/prompts';
import { buildIdentityMatrix, getCharTraitsFromMatrix, extractDialogueOnly, extractActionOnly, injectOutfitReminder, extractPlacementRule, extractCastLimitRule, getCameraForPanel, getCameraForChatGPT, stripWeightTags, extractEmotionStyle, buildEmotionBlock, cleanCastList } from './lib/panel-utils';
import { buildMangaPrompt } from './lib/prompt-assembler';
import { generateScenario, enhanceScenarioText } from './lib/scenario-provider';
import { fixPolicyViolation } from './lib/policy-fixer';
import ThinkingLog from './components/ThinkingLog';
import Panorama360Viewer from './components/Panorama360Viewer';
import StepGuide from './components/StepGuide';
import ApiKeyModal from './components/ApiKeyModal';
import ErrorBoundary from './components/ErrorBoundary';
import Step1Panel from './components/Step1Panel';
import Step2Panel from './components/Step2Panel';
import Step3Panel from './components/Step3Panel';
import Step4Panel from './components/Step4Panel';

function App() {
  // Force Build 2026-02-06 07:07 // Build 2026-02-06-01
  console.log("System Version Loaded:", SYSTEM_VERSION); // Debug Log
  const [apiKey, setApiKeyState] = useState("");
  const [showModal, setShowModal] = useState(false); // FIXEDCRITICAL RESTORE
  const [selectedEngine, setSelectedEngine] = useState('gemini'); // [v3.59] Dual Engine: 'gemini' | 'openai'
  const [inputMode, setInputMode] = useState("news"); // 'news' | 'manual'
  const [manualTopic, setManualTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [customLocation, setCustomLocation] = useState(''); // [v1.8.103] Custom Location Override
  const [customOutfit, setCustomOutfit] = useState(''); // [v1.8.103] Custom Outfit Override
  const [lockedLocation, setLockedLocation] = useState(''); // STEP2実行時に確定した場所
  const [lockedOutfit, setLockedOutfit] = useState('');     // STEP2実行時に確定した服装
  const [punchlineType, setPunchlineType] = useState('Auto'); // [v3.31] Punchline Director

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
  const [castList, setCastList] = useState("");
  const [scenario, setScenario] = useState("");
  const [mangaTitle, setMangaTitle] = useState("");
  const [finalPrompt, setFinalPrompt] = useState("");

  // [v1.7.0] Model Quality Indicator State
  const [usedModel, setUsedModel] = useState(null);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);

  // Initialize System
  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKey(savedKey);
      setApiKeyState(savedKey);
    } else {
      setShowModal(true);
    }
  }, []);

  // getModelBadgeInfo → src/lib/constants.js に移動済み
  const [images, setImages] = useState([]);

  // States for Steps
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAssembling, setIsAssembling] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false); // [v2.44] STEP4専用state（isAssemblingとの混同を防止）
  const [isGenerationError, setIsGenerationError] = useState(false);

  // Thoughts
  const [analyzeThought, setAnalyzeThought] = useState("");
  const [scenarioThought, setScenarioThought] = useState("");
  const [assembleThought, setAssembleThought] = useState("");

  const [status, setStatus] = useState("");
  const [colorMode, setColorMode] = useState("auto");
  const [isDragging, setIsDragging] = useState(false);
  const [genLog, setGenLog] = useState([]); // New Log State

  // [v2.35] コンテンツポリシー救済パネル
  const [policyErrorMsg, setPolicyErrorMsg] = useState("");
  const [isFixingPolicy, setIsFixingPolicy] = useState(false);
  const [policyFixLog, setPolicyFixLog] = useState("");
  const [isPolicyPanelOpen, setIsPolicyPanelOpen] = useState(false);

  // [v2.41] シナリオ強化パネル
  const [enhanceExpressions, setEnhanceExpressions] = useState(false); // 表情強化
  const [enhanceBodyLang, setEnhanceBodyLang] = useState(false);       // ボディランゲージ強化
  const [enhanceEffects, setEnhanceEffects] = useState(false);         // 照明・演出強化
  const [enhanceBackgrounds, setEnhanceBackgrounds] = useState(false); // 背景強化
  const [enhanceCameraWork, setEnhanceCameraWork] = useState(false);   // [v2.47] カメラワーク強化
  const [enhanceDialogue, setEnhanceDialogue] = useState(false);       // [v2.47] セリフ・ギャグ強化
  // [v2.69] コマ割り演出・時間演出を削除（ChatGPT画像生成ではタグ形式の指示が解釈されず効果ゼロのため）
  const [enhanceFACS, setEnhanceFACS] = useState(false);               // [v3.50 Fix] FACS表情強化（欠落修正）
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceLog, setEnhanceLog] = useState("");
  const [isEnhancePanelOpen, setIsEnhancePanelOpen] = useState(false);
  const [originalScenario, setOriginalScenario] = useState(""); // 強化前の原文保持用
  const [enableChatGPTMode, setEnableChatGPTMode] = useState(false); // [v2.61] ChatGPT Images 2.0 強化プロンプト
  const [enableOpenAIApi, setEnableOpenAIApi] = useState(false); // [v2.87] ChatGPT Images 2.0 API
  const [showOpenAIKeyModal, setShowOpenAIKeyModal] = useState(false); // [v2.88] Secure API key modal
  const [openAIKeyInput, setOpenAIKeyInput] = useState("");
  const [isCastListCopied, setIsCastListCopied] = useState(false);
  const [isScenarioCopied, setIsScenarioCopied] = useState(false);
  const [isMetaSaved, setIsMetaSaved] = useState(false); // [v3.46] メタデータ保存フィードバック

  // [v3.48] 360度背景画像読み込み (Studio Shooting Protocol)
  const [is360PanelOpen, setIs360PanelOpen] = useState(false);       // 折りたたみパネル開閉
  const [bg360Image, setBg360Image] = useState(null);                 // Base64プレビュー用
  const [bg360ImageParts, setBg360ImageParts] = useState(null);       // Gemini API送信用パーツ
  const [bg360Analysis, setBg360Analysis] = useState(null);           // AI解析結果 {location, lighting, spatialType}
  const [is360Analyzing, setIs360Analyzing] = useState(false);        // 解析中フラグ
  const [bg360Error, setBg360Error] = useState('');                    // バリデーションエラー
  const [is360DragOver, setIs360DragOver] = useState(false);          // ドラッグオーバー状態
  const [bg360Enabled, setBg360Enabled] = useState(false);            // [v3.50 Fix] 360°背景有効化フラグ（欠落修正 — これが無いとドロップ時にReferenceErrorでハングアップしていた）
  const [bg360CameraWork, setBg360CameraWork] = useState(null);        // [v3.53] 360°カメラワーク設計結果 {panels: [{panel, camera, yaw, pitch, fov, reasoning}]}
  const [bg360CroppedPanels, setBg360CroppedPanels] = useState(null);   // [v3.53 Phase2] 各コマ用クロップ済み背景画像 [base64, base64, base64, base64]
  const [is360CameraWorking, setIs360CameraWorking] = useState(false);  // [v3.53] カメラワーク設計＋クロップ処理中フラグ（Step3ブロック用）

  // cropEquirectangular → src/lib/panorama360.js に移動済み

  const handleToggleOpenAIApi = (checked) => {
    if (checked) {
      setOpenAIKeyInput(""); // フォームをリセット
      setShowOpenAIKeyModal(true);
    } else {
      setEnableOpenAIApi(false);
    }
  };

  // [v2.78] フルオート生成モード
  const [isFullAutoMode, setIsFullAutoMode] = useState(false); // フルオート実行中フラグ
  const [isEndlessMode, setIsEndlessMode] = useState(false); // [v2.86] 無限ループ生成フラグ
  const isEndlessModeRef = useRef(false);
  const [fullAutoStep, setFullAutoStep] = useState(0); // 0=待機, 2=STEP2, 3=STEP3, 4=STEP4
  // eslint-disable-next-line no-unused-vars
  const [fullAutoCountdown, setFullAutoCountdown] = useState(0); // カウントダウン表示用
  const [triggerFullAuto, setTriggerFullAuto] = useState(0); // [v2.78] Effect Trigger
  const fullAutoAbortRef = useRef(false); // 中断フラグ（useRefで即時反映）
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
  const isAssembleDisabled = isAssembling || !castList || castList.length < 20 || !scenario || scenario.length < 20 || isSearching || isAnalyzing; // [v1.8.83] Relaxed limits from 50 to 20

  // Image Generation
  const [generatedImage, setGeneratedImage] = useState("");
  const [generationHistory, setGenerationHistory] = useState([]); // [v2.86] Generated Image History


  const handleSetKey = (key) => {
    // APIキーのサニタイズ: 非ASCII文字を除去（コピペ時の見えない文字対策）
    const cleanKey = key.replace(/[^\u0000-\u007F]/g, "").trim();
    if (cleanKey !== key) {
      showStatus("APIキーに含まれる不要な文字を自動削除しました。");
    }

    // [v3.59] Dual Engine: APIキーのプレフィックスでエンジンを自動判定
    if (cleanKey.startsWith("sk-")) {
      // OpenAI APIキー → ChatGPTエンジンに切り替え
      setOpenAIApiKey(cleanKey);
      setActiveEngine('openai');
      setSelectedEngine('openai');
      setEnableOpenAIApi(true); // 画像生成もOpenAI経由に
      setEnableChatGPTMode(true); // プロンプトもChatGPT最適化
      // Gemini APIキーは不要だがダミーで空文字回避（UI表示用）
      setApiKeyState('openai-engine-active');
      setShowModal(false);
      showStatus("✅ ChatGPT Engine 接続完了！全ステップがChatGPT APIで動作します。");
      console.log("[Dual Engine] Switched to OpenAI/ChatGPT mode");
    } else {
      // Gemini APIキー → 従来のGeminiエンジン（デフォルト）
      setApiKey(cleanKey);
      setApiKeyState(cleanKey);
      setActiveEngine('gemini');
      setSelectedEngine('gemini');
      setShowModal(false);
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

  // 360度画像をBase64に変換してGemini API送信用パーツを生成
  const process360Image = async (file) => {
    setBg360Error('');
    setBg360Analysis(null);
    setIs360Analyzing(true);

    try {
      // バリデーション
      const validResult = await validate360Image(file);
      if (validResult.warning) {
        console.warn(`[360° BG] ${validResult.warning}`);
      }

      // Base64変換
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject('ファイルの読み込みに失敗しました。');
        reader.readAsDataURL(file);
      });

      // プレビュー用に保存
      setBg360Image(base64);

      // Gemini API送信用パーツを作成
      const base64Data = base64.split(',')[1];
      const imagePart = {
        inlineData: {
          mimeType: file.type,
          data: base64Data
        }
      };
      setBg360ImageParts(imagePart);

      // 場所テキスト入力をクリア（背景画像が場所の上位互換として機能するため）
      setCustomLocation('');

      // Geminiで空間解析を実行（プロンプトは panorama360.js に外部化済み）
      const analysisResult = await callAI(get360AnalysisPrompt(), [imagePart], null, (msg) => {
        console.log(`[360° BG Analysis] ${msg}`);
      });

      // JSONをパース（パーサーは panorama360.js に外部化済み）
      const analysis = parse360Analysis(analysisResult.text);
      setBg360Analysis(analysis);
      if (analysis.location !== '360°パノラマ画像') {
        showStatus(`✅ 360°背景を読み込みました: ${analysis.location}`);
      } else {
        showStatus('✅ 360°背景を読み込みました（解析結果は簡略化されています）');
      }
    } catch (err) {
      console.error('[360° BG] Validation/Processing failed:', err);
      setBg360Error(typeof err === 'string' ? err : err.message || '画像の処理に失敗しました。');
      setBg360Image(null);
      setBg360ImageParts(null);
    } finally {
      setIs360Analyzing(false);
    }
  };

  // 360度背景画像のクリア
  const clear360Background = () => {
    setBg360Image(null);
    setBg360ImageParts(null);
    setBg360Analysis(null);
    setBg360Error('');
    showStatus('360°背景画像を解除しました。');
  };



  const processFiles = async (files) => {
    // API KEY CHECK
    if (!apiKey) {
      showStatus("先にAPIキーを入力してシステムに接続してください！");
      setShowModal(true);
      return;
    }
    if (files.length === 0) return;
    setIsAnalyzing(true);
    setAnalyzeThought("キャラクター解析プロトコルを開始しました...\n> ピクセルデータをスキャン中...\n> キャラクター形態を識別中...");

    // [v2.44] フェイクストリーミング＋経過時間表示（フォールバック待ち中にハングアップに見えない対策）
    // モデルフォールバック時もタイマーが継続するように、APIコールバック後も常に経過時間を更新する
    let thinkTickCount = 0;
    const thinkTimer = setInterval(() => {
      thinkTickCount++;
      setAnalyzeThought(prev => {
        // 最初の10回（8秒間）はフェイクメッセージ
        if (thinkTickCount <= 10) {
          const messages = [
            ".", ".", ".",
            "\n> 顔の特徴点を抽出中...",
            "\n> 髪型トポロジーを解析中...",
            "\n> ファッション属性を検出中...",
          ];
          return prev + messages[Math.floor(Math.random() * messages.length)];
        }
        // それ以降は経過時間をカウンター表示（上書き方式で行を増やさない）
        const elapsed = Math.floor(thinkTickCount * 0.8);
        // 既存の経過表示行を更新（なければ追加）
        // [v2.44] APIコールバックが挿入されても、末尾のタイマー行を正確に更新する
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;
        // [v2.44 Fix] APIコールバックが⏳行のあとにメッセージを追加した場合でも
        // 常に末尾に表示されるよう、既存⏳行を削除してから末尾に再追加する
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    const imageArray = [];
    let detected360File = null; // [v3.48] 360度画像自動検出用

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // [v3.48] アスペクト比2:1チェック ＆ XMPメタデータ判定（360度 equirectangular判定）
      const is360 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target.result;
          const view = new Uint8Array(buffer);
          let metadataFound = false;
          // XMP等に含まれる文字列 "equirectangular" を探す (ASCII判定)
          const searchString = "equirectangular";
          let matchIndex = 0;
          for (let j = 0; j < Math.min(view.length, 65536); j++) {
            if (view[j] === searchString.charCodeAt(matchIndex)) {
              matchIndex++;
              if (matchIndex === searchString.length) {
                metadataFound = true;
                break;
              }
            } else {
              matchIndex = 0;
            }
          }

          const img = new Image();
          img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight;
            const isRatioValid = Math.abs(ratio - 2.0) < 0.15; // 誤差15%許容
            // 比率2:1かつメタデータが存在する場合のみ360度画像として扱う
            resolve(isRatioValid && metadataFound); 
          };
          img.onerror = () => resolve(false);
          img.src = URL.createObjectURL(file);
        };
        // 最初の64KBだけ読み込んでメタデータ判定
        const slice = file.slice(0, 65536);
        reader.readAsArrayBuffer(slice);
      });

      const reader = new FileReader();
      reader.readAsDataURL(file);
      await new Promise(resolve => {
        reader.onload = () => {
          if (is360 && !detected360File) {
            // 360度画像として分離（キャラシート配列には入れない）
            detected360File = { base64: reader.result, mimeType: file.type };
            setAnalyzeThought(prev => prev + `\n> 🌐 360°背景画像を検出 (アスペクト比 2:1)。キャラシートとは分離して処理します...`);
          } else {
            // 通常のキャラクターシートとして処理
            imageArray.push(reader.result);
            setImages(prev => [...prev, reader.result]);
          }
          resolve();
        };
      });
    }

    // [v3.50] 360度画像が検出された場合、バックグラウンドで空間解析を実行
    // ※ v3.48時点ではこのブロックがtry-catchの外にあり、さらに bg360Enabled state が未定義だったため
    //    ReferenceErrorで processFiles 全体が即死し、isAnalyzingもthinkTimerもクリーンアップされなかった。
    if (detected360File) {
      try {
        setBg360Enabled(true);
        setBg360Image(detected360File.base64);
        const base64Data = detected360File.base64.split(',')[1];
        const imagePart = {
          inlineData: { mimeType: detected360File.mimeType, data: base64Data }
        };
        setBg360ImageParts(imagePart);

        setIs360Analyzing(true);
        setAnalyzeThought(prev => prev + `\n> 🌐 360°空間解析を実行中... (API通信保護のため順次処理)`);
        const analysisResult = await callAI(get360AnalysisPrompt(), [imagePart], null, () => {});
        const analysis = parse360Analysis(analysisResult.text);
        setBg360Analysis(analysis);
        setCustomLocation(analysis.location);
        showStatus(`🌐 360°背景を検出: ${analysis.location}`);
        setAnalyzeThought(prev => prev + `\n> 🌐 空間解析完了: ${analysis.location}`);
      } catch (err) {
        console.warn('[360° BG] Analysis failed:', err);
        setBg360Analysis({ location: '360°パノラマ画像', lighting: '不明', spatialType: 'unknown', objects: '', mood: '' });
        setCustomLocation('360°パノラマ画像（解析失敗）');
      } finally {
        setIs360Analyzing(false);
      }
    }

    if (imageArray.length === 0 && detected360File) {
      // 360度画像のみドロップされた場合はキャラシート解析をスキップ
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
      setAnalyzeThought(prev => prev + `\n> 🌐 360°背景画像のみが検出されました。キャラクターシートも一緒にドロップしてください。`);
      showStatus('360°背景画像を検出しました。キャラクターシートを追加してください。');
      return;
    }
    if (imageArray.length === 0) {
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
      return;
    }

    showStatus(`思考モード: ${imageArray.length}枚のキャラクター設定画を同時解析中...${detected360File ? '（+ 360°背景1枚検出済み）' : ''}`);

    try {
      // Map all images to Gemini API parts
      const imageParts = imageArray.map(img => {
        const base64Data = img.split(',')[1];
        const mimeType = img.split(';')[0].split(':')[1];
        return {
          inlineData: { mimeType, data: base64Data }
        };
      });

      // キャラクター解析プロンプト（テンプレートは prompts.js に外部化済み）
      const prompt = getCharacterAnalysisPrompt();

      const result = await callAI(prompt, imageParts, null, (msg) => {
        setAnalyzeThought(prev => prev + `\n> ${msg}`);
      });
      setCastList(result.text);
      setUsedModel(result.model); // [v1.7.0] Track Model
      // [v2.42] 蓄積ログを保持し、完了メッセージとThinking Traceを追記（上書きしない）
      setAnalyzeThought(prev => {
        const separator = "\n\n--- ✅ 解析完了 ---\n";
        const thoughtTrace = result.thought && result.thought !== "通常処理が完了しました（思考トレースは利用不可）。"
          ? `> [思考トレース]\n${result.thought}`
          : "> 通常処理が完了しました（思考トレースは利用不可）。";
        return prev + separator + thoughtTrace;
      });
      showStatus("全キャラクターの解析が完了しました。");

      // [v2.78] フルオート武装中なら自動的にSTEP2→3→4を開始
      if (isFullAutoMode) {
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
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setAnalyzeThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("解析エラー: " + error.message);
      if (isFullAutoMode) {
        setIsFullAutoMode(false);
        setFullAutoStep(0);
        setIsAborting(false);
      }
    } finally {
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
    }
  };

  // --- Step 2.5: Scenario Enhancement (v2.41) ---
  // シナリオ強化機能: 選択されたカテゴリに基づいてシナリオの演出を強化する
  const enhanceScenario = async () => {
    if (!scenario || scenario.length < 20) return showStatus("先にシナリオを生成してください。");
    const anySelected = enhanceExpressions || enhanceBodyLang || enhanceEffects || enhanceBackgrounds || enhanceCameraWork || enhanceDialogue || enhanceFACS;
    if (!anySelected) return showStatus("少なくとも1つの強化カテゴリをONにしてください。");
    if (isEnhancing) return;

    setIsEnhancing(true);
    setEnhanceLog("> [START] シナリオ強化を開始します...");

    // 強化前の原文を保存（初回のみ。既に保存済みなら上書きしない）
    if (!originalScenario) {
      setOriginalScenario(scenario);
      setEnhanceLog(prev => prev + "\n> [SAVE] 元のシナリオを保存しました（元に戻すボタンで復元可能）");
    }

    // カテゴリ別の強化指示を組み立て
    const enhanceCategories = [];
    if (enhanceExpressions) {
      enhanceCategories.push("【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。...");
    }
    if (enhanceBodyLang) {
      enhanceCategories.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。");
    }
    if (enhanceEffects) {
      enhanceCategories.push("【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください。");
    }
    if (enhanceBackgrounds) {
      enhanceCategories.push("【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。");
    }
    if (enhanceCameraWork) {
      enhanceCategories.push("【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。");
    }
    if (enhanceDialogue) {
      enhanceCategories.push("【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。");
    }

    setEnhanceLog(prev => prev + `\n> [CONFIG] 強化カテゴリ: ${enhanceCategories.length}個`);

    let enhanceTickCount = 0;
    const enhanceTimer = setInterval(() => {
      enhanceTickCount++;
      setEnhanceLog(prev => {
        const elapsed = Math.floor(enhanceTickCount * 0.8);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    try {
      setEnhanceLog(prev => prev + `\n> [API] ${selectedEngine === 'openai' ? 'OpenAI' : 'Gemini'} にシナリオ強化をリクエスト中...`);
      const result = await enhanceScenarioText({
        scenario,
        enhanceCategories,
        castList,
        onProgress: (msg) => setEnhanceLog(prev => prev + `\n> [API] ${msg}`)
      });

      if (result && result.text && result.text.length > 50) {
        setScenario(result.text);
        setEnhanceLog(prev => prev + `\n> [SUCCESS] シナリオを強化しました！（${result.text.length}文字）\n> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`);
        setEnhanceExpressions(false);
        setEnhanceBodyLang(false);
        setEnhanceEffects(false);
        setEnhanceBackgrounds(false);
        setEnhanceCameraWork(false);
        setEnhanceDialogue(false);
        setEnhanceFACS(false);
        showStatus("シナリオ強化完了！");
      } else {
        setEnhanceLog(prev => prev + "\n> [ERROR] AIの応答が短すぎます。もう一度お試しください。");
        showStatus("強化失敗: AIの応答が不十分です");
      }
    } catch (error) {
      setEnhanceLog(prev => prev + `\n> [ERROR] ${error.message}`);
      showStatus("強化エラー: " + error.message);
    } finally {
      clearInterval(enhanceTimer);
      setIsEnhancing(false);
    }
  };

  // シナリオを強化前の原文に復元する
  const revertScenario = () => {
    if (originalScenario) {
      setScenario(originalScenario);
      setOriginalScenario("");
      setEnhanceLog(prev => prev + "\n> [REVERT] 元のシナリオに復元しました。");
      showStatus("シナリオを元に戻しました");
    }
  };

  // --- Step 2: Scenario ---
  const generateScenarioFromNews = async (categoriesOverride) => {
    if (!castList) return showStatus("先にキャラクターを解析してください。");
    if (isSearching) return;

    const effectiveCategories = Array.isArray(categoriesOverride) ? categoriesOverride : categories;

    if (inputMode === 'manual' && !manualTopic.trim()) {
      alert("自由入力トピックを入力してください。");
      return;
    }
    if (inputMode === 'news' && !effectiveCategories.find(c => c.checked)) {
      alert("少なくとも1つのカテゴリを選択してください。");
      return;
    }

    setIsSearching(true);
    setScenarioThought("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setAssembleThought("");
    setGenLog([]);
    setOriginalScenario("");
    setEnhanceLog("");

    let randomCategory = "";
    if (inputMode === 'manual') {
      randomCategory = "手動入力";
      setScenario("");
      setScenarioThought(`> コンテキスト強制リブート: 開始\n > モード: 手動入力 \n > 対象: ${manualTopic.substring(0, 30)}...`);
    } else {
      const activeCats = effectiveCategories.filter(c => c.checked);
      if (activeCats.length > 0) {
        randomCategory = activeCats.map(c => c.keywords).join(' ');
        showStatus(`カテゴリ「${activeCats.map(c => c.label).join('・')}」で最新ニュースを検索中... (${targetDate})`);
        setScenario("");
        setScenarioThought(`> コンテキスト強制リブート: 開始\n > 対象カテゴリ: ${activeCats.map(c => c.label).join('、')} (キーワード: ${randomCategory}) \n > 対象日付: ${targetDate} \n > Google Grounding で検索中...`);
      } else {
        randomCategory = "最新ニュース";
      }
    }

    let scenarioTickCount = 0;
    const scenarioTimer = setInterval(() => {
      scenarioTickCount++;
      setScenarioThought(prev => {
        if (scenarioTickCount <= 8) {
          const messages = [
            ".", ".", ".",
            "\n> グローバルニュースデータベースをスキャン中...",
            "\n> トレンドトピックをクロスリファレンス中...",
            "\n> 関連記事をフィルタリング中...",
            "\n> ナラティブフレームワークを構築中...",
          ];
          return prev + messages[Math.floor(Math.random() * messages.length)];
        }
        const elapsed = Math.floor(scenarioTickCount * 0.8);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    try {
      const result = await generateScenario({
        castList,
        categories: effectiveCategories,
        inputMode,
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
        onProgress: (msg) => setScenarioThought(prev => prev + `\n > [API] ${msg} `),
        onCameraProgress: (msg) => {
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

      setUsedModel(result.usedModel);
      setLockedLocation(customLocation.trim() || result.location || "Unspecified");
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
      const outfitLine = (customOutfit.trim() || result.outfit) ? `\nOutfit: ${customOutfit.trim() || result.outfit}` : '';
      const punchlineLine = result.punchline ? `\nPunchline: ${result.punchline}` : '';
      const bg360HeaderLine = bg360Image
        ? (bg360Enabled
          ? `\n🌐 360°背景: ON (${bg360Analysis?.location || '解析済み'} / ${bg360Analysis?.spatialType === 'indoor' ? '室内' : bg360Analysis?.spatialType === 'outdoor' ? '屋外' : '複合'}) — 添付ファイル: キャラシート＋360°画像`
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

      const finalScenarioText = `## タイトル: ${result.topic} !?${loglineLine}\nLocation: ${result.location || "Unspecified"}${outfitLine}${punchlineLine}${bg360HeaderLine}${cameraWorkHeaderLine}\n\n${result.scenario} `;
      setScenario(finalScenarioText);
      showStatus("シナリオの生成が完了しました！");
      setIs360CameraWorking(false);
      return finalScenarioText;
    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setScenarioThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("シナリオ生成エラー");
      setIs360CameraWorking(false);
      return null;
    } finally {
      clearInterval(scenarioTimer);
      setIsSearching(false);
    }
  };

  // --- Step 3: Prompt Assembly (Super FURU v121.3) ---
  // [v2.79] 戻り値変更: フルオート連鎖用（文字列=成功, null=失敗）
  const assemblePrompt = async (skipGuard = false, overrideScenario = null) => {
    const currentScenario = overrideScenario || scenario;
    if (!skipGuard && (!castList || !currentScenario)) return showStatus("キャストとシナリオが必要です。");
    setIsAssembling(true);
    setFinalPrompt(""); // Clear previous prompt to indicate loading
    setGenLog([]); // [v3.01] Clear previous image generation logs
    // [v2.35] 救済パネルリセット
    setPolicyErrorMsg("");
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setAssembleThought("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");

    // Fake Streaming Effect
    const thinkTimer = setInterval(() => {
      setAssembleThought(prev => {
        if (prev.length > 800) return prev;
        const messages = [
          ".", ".", ".",
          "\n> 物語ベクトルを最適化中...",
          "\n> ジオメトリロックを調整中...",
          "\n> キャラクタースタイルの重みを同期中...",
          "\n> パネル枠線を適用中...",
          "\n> 禁止コンテンツタグをチェック中...",
          "\n> 風刺ロジックを注入中...",
          "\n> 4コマ構造を最終化中..."
        ];
        // Don't add random messages if we are done (safety)
        if (!isAssembling) return prev;

        const msg = messages[Math.floor(Math.random() * messages.length)];
        return prev + msg;
      });
    }, 600);

    try {
      // [v3.82-alpha] リファクタリング: 外部モジュールでプロンプトを構築
      const safePrompt = buildMangaPrompt({
        scenario: currentScenario,
        castList,
        colorMode,
        enableChatGPTMode,
        bg360Image,
        bg360Analysis,
        bg360Enabled,
        bg360CroppedPanels,
        punchlineType,
        systemVersion: SYSTEM_VERSION
      });

      // Wait a bit to simulate processing/syncing (Important for User Experience)
      await new Promise(resolve => setTimeout(resolve, 800));

      if (punchlineType === 'Documentary') {
        setAssembleThought(prev => prev + "\n> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)");
      }

      setAssembleThought(prev => prev + "\n> [v3.31] 事故防止プロトコル全モデル適用済み:\n>   ✅ 縦書きセリフ強制\n>   ✅ セリフ勝手追加禁止\n>   ✅ 参照画像キャラシート再現禁止\n>   ✅ カメラワーク平易化禁止\n>   ✅ プロンプト分岐 (ChatGPT/Gemini)\n>   ✅ 出力前チェックリスト追加");

      setFinalPrompt(safePrompt);
      setAssembleThought(prev => prev + "\n> セーフティ年齢フィルター: 適用済み\n> 最適化ベクトル: 計算完了\n> 構造ロック: 有効\n> 風刺ロジック: 強化済み\n> [完了] 最終プロンプトを構築しました。");
      showStatus("最終プロンプトの構築が完了しました。画像生成を開始します...");
      return safePrompt; // [v2.79] フルオート連鎖用: 成功

    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setAssembleThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("生成エラー: " + error.message);
      return null; // [v2.79] フルオート連鎖用: 失敗
    } finally {
      clearInterval(thinkTimer);
      setIsAssembling(false);
    }
  };

  // [v3.04] ChatGPTモードのチェックボックスが切り替わった時、既にプロンプトが生成されていれば自動再構築する
  useEffect(() => {
    if (finalPrompt && !isAssembling && currentStep >= 3) {
      assemblePrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableChatGPTMode]);

  // [v3.59] ソフトリセット: キャラクター解析(STEP1)を保持し、STEP2以降をリセット
  const partialReset = () => {
    // castList は保持する（キャラクター解析結果）
    // images は保持する（ドロップしたキャラクターシート画像）
    // analyzeThought は保持する（STEP1のログ）
    setScenario("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setScenarioThought("");
    setAssembleThought("");
    setGenLog([]);
    setIsFullAutoMode(false);
    setFullAutoStep(0);
    // [v3.48-alpha2] Clear manual inputs and 360 background on reset
    setCustomLocation("");
    setCustomOutfit("");
    setBg360Image(null);
    setBg360ImageParts(null);
    setBg360Analysis(null);
    setBg360CameraWork(null); // [v3.53] カメラワーク設計結果もリセット
    setBg360CroppedPanels(null); // [v3.53 Phase2] クロップ画像もリセット
    setIs360CameraWorking(false); // [v3.53] カメラワーク処理フラグリセット
    showStatus("シナリオ以降をリセットしました。キャラクター解析は保持しています。");
  };

  // [v3.59] ハードリセット: 全データ消去 + APIキー再入力モーダルを表示
  const hardReset = () => {
    setCastList("");
    setScenario("");
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
  const [isFixPromptCopied, setIsFixPromptCopied] = useState(false);
  const [isPolicyCopied, setIsPolicyCopied] = useState(false);

  const copyPrompt = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    showStatus("クリップボードにコピーしました！");
  };
  // --- Step 4: Image Generation ---
  // [v2.79] 戻り値変更: フルオート連鎖用（true=成功, false=失敗）
  const regenerateImage = async (skipGuard = false, overridePrompt = null) => {
    const currentPrompt = overridePrompt || finalPrompt;
    if (isGeneratingImage || (!skipGuard && !currentPrompt)) return false;
    setIsGeneratingImage(true);
    setIsGenerationError(false);
    
    // [v3.04i] 進捗窓(genLog)にChatGPTモードのバッチ/警告を明示
    const initialLogs = ["[1/5] プロンプトパラメータをロック中...", "[2/5] セーフティフィルターを検証中..."];
    if (enableChatGPTMode) {
      if (selectedEngine === 'openai') {
        // OpenAI Engine では ChatGPT プロンプトは当然の標準動作 → 情報表示
        initialLogs.push("[2.5/5] ✅ ChatGPT Engine: プロンプト最適化を適用中...");
      } else {
        // Gemini Engine で手動で ChatGPT モードを ON にした場合 → 注意表示
        initialLogs.push("[2.5/5] ⚠️ [ChatGPT Mode] 有効: プロンプト構造の特殊最適化を適用中...");
      }
    }
    setGenLog(initialLogs);

    // [v2.44] 進捗ステップ表示＋経過時間カウンター
    let genTickCount = 0;
    const genTimer = setInterval(() => {
      genTickCount++;
      const elapsed = Math.floor(genTickCount * 1.5);
      setGenLog(prev => {
        const waitIndex = prev.findIndex(entry => entry.startsWith("[WAIT]"));
        if (waitIndex !== -1) {
          const newLog = [...prev];
          newLog[waitIndex] = `[WAIT] ⏳ 画像生成API応答を待機中... (${elapsed}秒経過)`;
          return newLog;
        }
        return [...prev, `[WAIT] ⏳ 画像生成API応答を待機中... (${elapsed}秒経過)`];
      });
    }, 1500);

    // Artificial delay to ensure user sees the process starting
    await new Promise(r => setTimeout(r, 800));

    try {
      showStatus(enableOpenAIApi ? "OpenAI (ChatGPT Images 2.0) に送信中..." : "Google AI (Gemini/Imagen) に送信中...");
      setGenLog(prev => [...prev, "[3/5] クラウドAPIへ接続中...", "[3/5] プロンプトデータをアップロード中..."]);

      await new Promise(r => setTimeout(r, 1000)); // More visibility

      const statCallback = (msg) => {
        setGenLog(prev => [...prev, msg]);
      };

      let base64Img, generatedModelId;
      if (enableOpenAIApi) {
        // [v3.56] OpenAI API直接生成
        statCallback("[INFO] ⏳ gpt-image-2 の画像生成には通常2〜5分かかります。しばらくお待ちください...");
        const res = await generateImageWithOpenAI(currentPrompt, statCallback);
        base64Img = res.base64Img;
        generatedModelId = res.usedModel;
      } else {
        // [v3.53 Phase3] 360°クロップ済み背景画像がある場合、参照画像として添付
        const refImages = (bg360CroppedPanels && bg360Enabled && bg360CroppedPanels.length === 4)
          ? bg360CroppedPanels
          : [];
        if (refImages.length > 0) {
          statCallback(`[REF] 360°背景クロップ画像 ${refImages.length}枚を参照画像として添付`);
        }
        const res = await generateImageWithImagen(currentPrompt, statCallback, refImages);
        base64Img = res.base64Img;
        generatedModelId = res.usedModel;
      }
      setGenLog(prev => [...prev, `[4/5] データストリーム受信完了 (Model: ${generatedModelId})`, "[5/5] Base64画像データをデコード・レンダリング中..."]);

      const finalImageStr = `data:image/png;base64,${base64Img}`;
      setGeneratedImage(finalImageStr);
      setGenerationHistory(prev => [{ id: Date.now(), img: finalImageStr }, ...prev]); // [v2.86] Add to history
      
      // [v3.56] OpenAIモデル (gpt-image-2等) は正規モデルとして扱い、フォールバック警告を出さない
      const isOpenAIModel = generatedModelId && generatedModelId.startsWith("gpt-");
      if (generatedModelId && !generatedModelId.startsWith("gemini-3") && !isOpenAIModel) {
        // gemini-2.5系やimagen系はフォールバック扱い（妥協版警告を表示）
        setIsFallbackUsed(true);
        setGenLog(prev => [
          ...prev,
          "[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。",
          "[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。",
          "[GUIDE] ★手動生成を推奨します★",
          "[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          `[GUIDE] 2. ${enableOpenAIApi ? 'ChatGPT' : 'Gemini'}(Web版)を開く: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          "[GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する",
          `[GUIDE] 4. 貼り付けて${enableOpenAIApi ? '送信する' : '「思考モード」で送信する'}`,
          "[COMPLETE] Image successfully generated (with warnings)."
        ]);
      } else {
        setIsFallbackUsed(false);
        setGenLog(prev => [...prev, "[COMPLETE] Image successfully generated."]);
      }
      showStatus("画像生成完了！");
      return true; // [v2.78] フルオート連鎖用: 成功
    } catch (error) {
      console.error(error);
      setIsGenerationError(true);
      setGeneratedImage(null);

      const errMsg = error.message || "";
      let guideLines = [];

      if (errMsg.includes("Unknown parameter") || errMsg.includes("invalid") || errMsg.includes("Invalid")) {
        // [v3.56] APIリクエストのパラメータ不正（コンテンツポリシーとは無関係）
        guideLines = [
          `[ERROR GUIDE] ⚙️ APIリクエストのパラメータが不正です（${enableOpenAIApi ? 'OpenAI' : 'Google'}側の仕様変更の可能性）。`,
          "[ERROR GUIDE] 【原因】APIの仕様が更新され、送信パラメータが無効になっている可能性があります。",
          "[ERROR GUIDE] 【対処法】開発者にこのエラーメッセージを報告してください。または以下の手動手段をご利用ください。",
          "[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPT' : 'Gemini'} (Web版) を開く: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）`,
          `[ERROR GUIDE] 4. 貼り付けて送信する`
        ];
      } else if (errMsg.includes("sensitive") || errMsg.includes("Responsible AI") || (errMsg.includes("400") && !errMsg.includes("Unknown parameter"))) {
        // [v2.35] 救済パネルにエラーメッセージを自動入力して展開
        setPolicyErrorMsg(errMsg);
        setIsPolicyPanelOpen(true);
        guideLines = [
          "[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。",
          "[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。",
          "[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"
        ];
      } else if (errMsg.includes("not found") || errMsg.includes("not supported") || errMsg.includes("404") || errMsg.includes("403") || errMsg.includes("401")) {
        guideLines = [
          `[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていないか、無効です（${enableOpenAIApi ? 'OpenAI側' : 'Google側'}の仕様・権限）。`,
          `[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（${enableOpenAIApi ? 'ChatGPT' : 'Gemini'} Web版）」をご利用ください。`,
          "[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPT' : 'Gemini'} (Web版) を開く: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）`,
          `[ERROR GUIDE] 4. 貼り付けて送信する`
        ];
      } else {
        guideLines = [
          `[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（${enableOpenAIApi ? 'OpenAI側' : 'Google側'}の混雑など）。`,
          "[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。",
          "[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPT' : 'Gemini'} (Web版) を開く: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. 「元となるキャラクターシート画像」を一緒に添付する（※キャラ再現に必須）`,
          `[ERROR GUIDE] 4. 貼り付けて送信する`
        ];
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
      setIsGeneratingImage(false);
    }
  };

  // --- [v2.44] コンテンツポリシー救済: 2段階置換方式 + 進捗表示 ---
  // Phase 1: AIが「問題箇所 → 安全な置換」のJSONテーブルを出力
  // Phase 2: そのテーブルを機械的に元プロンプトに適用（全文再出力不要）
  const regenerateSafePrompt = async () => {
    if (!finalPrompt || !policyErrorMsg.trim()) return;
    setIsFixingPolicy(true);
    setPolicyFixLog("> [Phase 0/5] コンテンツポリシーアドバイザーを起動中...");

    let policyTickCount = 0;
    const policyTimer = setInterval(() => {
      policyTickCount++;
      setPolicyFixLog(prev => {
        const elapsed = Math.floor(policyTickCount * 1.0);
        const timerLine = `\n> ⏳ AI分析中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI分析中\.\.\.\s*\(\d+秒経過\)/;
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
        onProgress: (msg) => setPolicyFixLog(prev => prev + `\n> ${msg}`)
      });

      if (result.success && result.modifiedPrompt) {
        setFinalPrompt(result.modifiedPrompt);
        if (result.method === "replacement") {
          setPolicyFixLog(prev => prev + `\n> [Phase 5/5] ✅ ${result.appliedCount}箇所を修正しました（${result.failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`);
        } else {
          setPolicyFixLog(prev => prev + "\n> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。");
        }
        setPolicyFixLog(prev => prev + `\n> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${selectedEngine === 'openai' ? 'ChatGPT' : 'Gemini'} Web版で生成してください。`);
        setPolicyErrorMsg("");
      }
    } catch (error) {
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [ERROR] ${error.message}`);
    } finally {
      clearInterval(policyTimer);
      setIsFixingPolicy(false);
    }
  };

  // [v2.78] フルオート生成トリガー監視
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (triggerFullAuto > 0 && !fullAutoAbortRef.current) {
      runFullAuto();
    }
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
    fullAutoAbortRef.current = false;
    setIsFullAutoMode(true);
    setEnableChatGPTMode(false); // ChatGPTモードOFF（デモ用ノーマルモード）

    // --- STEP2: シナリオ生成 ---
    setFullAutoStep(2);
    // カテゴリをランダムで1〜2個選択し、直接オブジェクトとして生成
    const shuffled = [...categories].sort(() => Math.random() - 0.5);
    const count = Math.random() > 0.5 ? 2 : 1;
    const selectedIds = shuffled.slice(0, count).map(c => c.id);
    const overrideCategories = categories.map(c => ({ ...c, checked: selectedIds.includes(c.id) }));
    // UIにも反映
    setCategories(overrideCategories);
    // 場所・服装はAIまかせ（クリア）
    setCustomLocation("");
    setCustomOutfit("");
    setInputMode("news"); // ニュース検索モード固定

    // 自動スクロール: STEP2へ
    await new Promise(r => setTimeout(r, 200));
    step2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const generatedScenario = await generateScenarioFromNews(overrideCategories);
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

    // stale state回避のため文字列を直接渡す
    const generatedPrompt = await assemblePrompt(true, generatedScenario); 
    if (fullAutoAbortRef.current || !generatedPrompt) {
      setIsFullAutoMode(false);
      setFullAutoStep(0);
      setIsAborting(false);
      if (fullAutoAbortRef.current) showStatus("⏹ フルオートを中断しました。");
      return;
    }

    // --- STEP4: 画像生成 ---
    setFullAutoStep(4);
    // フルオート時、進捗がすべて見えるように画面の「一番下」までスクロールする
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    await new Promise(r => setTimeout(r, 300));

    const step4ok = await regenerateImage(true, generatedPrompt); 
    
    // 最終スクロール: 生成画像へ
    await new Promise(r => setTimeout(r, 800));
    imageResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (isEndlessModeRef.current) {
      // 連続生成（エンドレスモード）
      if (!fullAutoAbortRef.current) {
        showStatus("🔄 連続生成モードON：次の作品を生成します...");
        setTimeout(() => {
          if (!fullAutoAbortRef.current) {
            setTriggerFullAuto(prev => prev + 1);
          }
        }, 2000); // 少し待ってから次へ
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
  };

  // [v2.78] フルオートトグルハンドラ
  // castList有 → 即実行 / castList無 → 武装待機（ドロップで自動開始）
  const handleFullAutoToggle = () => {
    if (isFullAutoMode) {
      // 実行中 or 武装中 → 中断/解除
      fullAutoAbortRef.current = true;
      if (fullAutoStep > 0 || isAnalyzing || isSearching || isAssembling || isGeneratingImage) {
        setIsAborting(true);
        showStatus("⚠️ 中断処理中...（現在のステップが完了するまでお待ちください）");
      } else {
        setIsFullAutoMode(false);
        setFullAutoStep(0);
        setIsAborting(false);
        showStatus("フルオートを解除しました。");
      }
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

  // フルオート中断
  // eslint-disable-next-line no-unused-vars
  const abortFullAuto = () => {
    fullAutoAbortRef.current = true;
    if (fullAutoStep > 0 || isAnalyzing || isSearching || isAssembling || isGeneratingImage) {
      setIsAborting(true);
    } else {
      setIsFullAutoMode(false);
      setFullAutoStep(0);
      setIsAborting(false);
    }
  };

  // Determine Current Step
  const currentStep = (!castList || castList.length < 1) ? 1
    : (!scenario || scenario.length < 1) ? 2
      : (!finalPrompt) ? 3
        : (!generatedImage) ? 4
          : 5;

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
      {/* STICKY TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden">
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
              {/* 物理的に全角スペースを右側に挿入して密着を防止 */}
              <span className="text-sm font-bold text-white tracking-wider">画像生成　</span>
            </div>
          </div>

          {/* ================= 絶対に潰れない物理スペーサー ================= */}
          <div className="hidden xl:block w-12 lg:w-16 shrink-0"></div>

          {/* Controls (Center Right) - フルオートボタン＋説明文 */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full">
            {/* [v2.86] 連続生成(ループ)トグル */}
            <button
              disabled={!apiKey || isAborting}
              onClick={() => {
                const nextState = !isEndlessMode;
                setIsEndlessMode(nextState);
                isEndlessModeRef.current = nextState;
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
              <span className="whitespace-nowrap">{isEndlessMode ? '無限ループ設定 解除' : '無限ループ設定 ON'}</span>
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
              {isFullAutoMode ? (isAborting ? '停止処理中...' : 'フルオート中断') : '⚡ フルオート ON'}
            </button>
            
            {/* ================= ボタンと説明文の間の物理スペーサー ================= */}
            <div className="hidden sm:block w-6 shrink-0"></div>

            {/* 説明文（3行構成、折り返し対応） */}
            <div className={`flex flex-col justify-center text-[10.5px] leading-relaxed max-w-[600px] text-center sm:text-left transition-opacity duration-300 ${!apiKey ? 'text-slate-600 opacity-40' : 'text-slate-400'}`}>
              <span className="whitespace-normal">　【⚡ フルオート ON】にして画像をドロップ、もしくはドロップ後に押す→全自動で生成。完了後は自動OFF。　</span>
              <span className="whitespace-normal">　生成中は同ボタンで中断（以降はSTEPボタンで進行）。中断後再度押すと新シナリオで再生成を始めます。　</span>
              <span className="whitespace-normal">　※「無限ループ設定」をONにしてフルオートを開始すると、完了後に自動で次の作品の生成を永遠に繰り返します。　</span>
            </div>
          </div>
        </div>
        
        {/* [v3.23-alpha] Web版ChatGPT用 コピーボタン (β) — OpenAI Engine (API直接生成) 時のみ表示 */}
        {(selectedEngine === 'openai' || enableOpenAIApi) && (
        <div className="flex justify-center w-full max-w-7xl mx-auto px-2 pb-1">
          <button
            onClick={() => {
              const protocol = `[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
You are a world-class anime film director and cinematographer. Your mission is to create a SINGLE breathtaking illustration that makes the viewer FEEL something powerful — not just see a character standing there.

READ the user's instruction carefully. Detect the EMOTIONAL VECTOR (joy, sadness, anger, tension, love, loneliness, triumph, fear, nostalgia, serenity, chaos, comedy, etc.) from their text — even if they only say something simple like "draw her eating ramen." Find the hidden emotion and AMPLIFY it through every visual element below.

If the user gives NO emotional direction at all, DEFAULT to creating an image that radiates warmth, narrative depth, and cinematic beauty — as if this frame is the most emotionally pivotal moment in an anime film.

[ 1. EMOTIONAL ACTING & EXPRESSION — The Soul of the Image ]
- FACE: Characters MUST show rich, layered facial expressions. Use the Facial Action Coding System (FACS): combine specific Action Units (brow furrow + lip tremble + glistening eyes = suppressed tears). NEVER draw a flat, neutral, default expression. Every face tells a story.
- EYES: Eyes are the emotional anchor. Draw large, detailed anime eyes with multiple layers: iris gradient, bright catchlight highlights (circular + star sparkle), visible emotion (tears welling, fire burning, light fading, stars sparkling). Eye moisture level should match the emotion.
- BODY LANGUAGE: The entire body must act. Clenched fists for determination, slumped shoulders for defeat, wind-caught hair for freedom, mid-gesture frozen motion for surprise. Weight distribution must feel natural and dynamic — use contrapposto, dynamic lean, or full-body action poses. NEVER use a stiff T-pose or mannequin stance.
- MICRO-EXPRESSIONS: Add subtle secondary expressions — a slight lip quiver, one eyebrow raised higher than the other, fingers gripping fabric unconsciously. These details create emotional depth that separates masterwork from generic output.

[ 2. CINEMATIC CAMERA & LENS — The Director's Eye ]
Choose the camera angle and lens that BEST serves the emotion. Here is your toolkit:
- INTIMACY/VULNERABILITY: Tight close-up (bust shot or face), shallow depth of field (f/1.4 bokeh), slight Dutch angle for unease, or straight-on for confrontation.
- POWER/TRIUMPH: Extreme low angle (worm's-eye view) looking UP at the character. Wide-angle lens (24mm) for imposing presence. Character dominates the frame.
- LONELINESS/SMALLNESS: Extreme wide shot with the character tiny in a vast environment. High angle (bird's-eye) looking DOWN. The emptiness around them IS the emotion.
- ACTION/CHAOS: Dynamic diagonal composition, motion blur on extremities, speed lines radiating from impact point, camera tilted 15-30° Dutch angle.
- NOSTALGIA/MEMORY: Soft telephoto lens (85-135mm) compression, warm color grading, slight vignette at edges, dreamy shallow focus.
- COMEDY/ABSURDITY: Exaggerated wide-angle (fisheye-adjacent) for comedic distortion, super-deformed reaction shots, dramatic zoom lines.
- EPIC/CINEMATIC: Sweeping wide establishing shot with golden ratio composition, atmospheric perspective, volumetric light shafts.
IMPORTANT: NEVER default to a flat, eye-level, center-framed shot. Every camera choice must be INTENTIONAL and emotion-driven.

[ 3. DRAMATIC LIGHTING & COLOR PSYCHOLOGY ]
Lighting is emotion made visible. Match the lighting setup to the feeling:
- JOY/WARMTH: Golden hour warm key light (3000K), soft fill, orange-pink rim light. Warm color palette dominance.
- SADNESS/MELANCHOLY: Cool blue-grey key light, minimal fill (high shadow ratio), single warm accent light (a streetlamp, a phone screen) as a beacon of hope. Desaturated palette with one warm accent color.
- ANGER/INTENSITY: Hard directional red-orange key light from below or side, deep black shadows, high contrast. Saturated reds and magentas.
- TENSION/SUSPENSE: Single harsh spotlight creating extreme contrast, character half-lit half-shadow (split lighting). Cool teal shadows vs warm highlights.
- LOVE/TENDERNESS: Soft diffused backlight creating a luminous halo, warm fill, cherry-blossom pink and peach tones. Ethereal glow.
- TRIUMPH/GLORY: Dramatic backlight explosion (contre-jour), golden rim light outlining the entire silhouette, lens flare from behind.
- FEAR/HORROR: Underlighting (flashlight-under-chin effect), sickly green or purple color cast, deep vignette swallowing the edges.
- NOSTALGIA: Warm sepia-shifted color grading, soft gaussian glow, muted but harmonious palette.
TECHNIQUE: Always use 3-point anime lighting as a BASE (key + fill + rim), then MODIFY it for emotional effect. Use warm/cool color temperature CONTRAST — never flat uniform lighting.

[ 4. ATMOSPHERIC VFX & ENVIRONMENTAL STORYTELLING ]
The environment and effects must ECHO the character's emotion, not just be a backdrop:
- Wind direction, particle effects (petals, leaves, snow, embers, rain), volumetric fog/mist, god rays, and atmospheric haze should all serve the emotional narrative.
- ENVIRONMENTAL EMPATHY: If the character is sad, the sky could be overcast with a single break in the clouds. If joyful, golden light floods the scene. If angry, the environment reacts (cracking ground, swirling debris).
- DEPTH LAYERS: Create clear foreground (blurred elements close to camera), midground (character in sharp focus), and background (atmospheric depth) for cinematic parallax.
- ANTI-GLITTER RULE: Do NOT add random magical floating particles, sparkles, or fairy dust unless the emotion specifically calls for it (like wonder or magic). Keep the air intentional.

[ 5. ART STYLE & VISUAL FIDELITY ]
- RENDER: High-budget Japanese TV anime feature film quality. Clean cel-shading with rich color depth, sharp ink contour lines, smooth gradients. NO photorealistic texturing, NO film grain, NO noise.
- LINE WEIGHT HIERARCHY: Foreground characters get 3px bold ink outlines. Background objects get 1px thin lines. This creates instant visual depth.
- CHARACTER SEPARATION: Add a subtle 2-3px white glow (compositing rim) outside the character's outline to prevent blending with the background. Characters MUST have higher saturation and contrast than their environment.
- HAIR: Must show a glossy anime-style shine band (angel ring / tenshi no wa). Individual strand detail at edges.
- SKIN: Warm subsurface scattering hint on lit areas. Clean shadows with slight color shift (warm light = cool shadow, cool light = warm shadow).

[ 6. TEXT & OUTPUT RULES ]
- If speech bubbles or text are drawn, ALL text MUST be vertical Japanese. ZERO horizontal text.
- Do not add random background text, floating letters, or unnecessary sound effects unless the scene demands it.
- SELF-REVIEW: After drawing, carefully verify finger count on all hands (exactly 5), check for text errors, and fix internally before displaying the final result.`;
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
              <span className="whitespace-nowrap">{isPolicyCopied ? 'コピー完了！' : '🎬 1枚絵 ChatGPT用 感情シネマプロンプトをコピー'}</span>
            </div>
            <span className="text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500">
              【1枚絵用】ChatGPTにキャラ画像を添付→指示を書く→このプロンプトを貼り付けて送信。指示の文脈からエモーショナルな演出を自動で適用します。
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

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[130px] md:px-10 md:pb-10 md:pt-[150px] space-y-8">
        {/* === ヘッダー領域 === */}
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
                  {/* [v2.48] API認証状態バッジ - タイトル枠内に常時表示 */}
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-black tracking-wider ${apiKey ? (selectedEngine === 'openai' ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' : 'bg-green-500/15 border-green-500/40 text-green-400') : 'bg-red-500/15 border-red-500/40 text-red-400 animate-pulse'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${apiKey ? (selectedEngine === 'openai' ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]' : 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]') : 'bg-red-400'}`} />
                    {apiKey ? (selectedEngine === 'openai' ? '✅ ChatGPT Engine' : '✅ Gemini Engine') : '⚠ 未接続'}
                  </div>
                  {/* [v3.59] ソフトリセットボタン: キャラ保持 + シナリオ以降リセット */}
                  {apiKey && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={partialReset}
                        className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-white/10"
                        title="キャラクター解析を保持したまま、シナリオ・プロンプト・画像をリセットします"
                      >
                        <RefreshCw size={12} /> シナリオから再生成
                      </button>
                      <button
                        onClick={hardReset}
                        className="flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-500/20"
                        title="全データを消去してAPIキーの再入力画面に戻ります（エンジン切替もこちら）"
                      >
                        <LogOut size={12} /> エンジン変更・全リセット
                      </button>
                    </div>
                  )}
                </div>
                {/* [v1.7.0] Model Quality Badge */}
                {usedModel && (() => {
                  const info = getModelBadgeInfo(usedModel);
                  if (!info) return null;
                  return (
                    <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${info.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`}>
                      <span className="text-[10px] font-black uppercase tracking-widest">{info.label}</span>
                      <span className="w-[1px] h-3 bg-white/40" />
                      <span className="text-[10px] font-bold truncate max-w-[150px] md:max-w-none">{info.desc}</span>

                      {/* Tooltip for Explanation */}
                      <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-[#0f1115] border border-white/20 rounded-xl text-[10px] text-slate-300 z-50 invisible group-hover/badge:visible shadow-2xl backdrop-blur-xl">
                        <p className="font-bold text-white mb-1 border-b border-white/10 pb-1">AIモデル品質情報</p>
                        <p>現在 <span className="font-mono text-blue-300">{usedModel}</span> を使用中。</p>
                        {info.tier === "Lite" && (
                          <div className="mt-2 text-yellow-500 bg-yellow-500/10 p-2 rounded relative">
                            <AlertTriangle size={10} className="absolute top-2 right-2" />
                            <span className="font-bold block mb-1">⚠️ 品質制限モード</span>
                            API制限(429)回避のため、軽量モデルを使用中。生成品質が低下する場合があります。上限解除までお待ちください。
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
            />
          </div>

          {/* 場所・服装設定プレビュー - STEP2以降のみ表示 */}
          <div className={`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${!scenario ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
          `}>
            <span className="text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2">
              <Sparkles size={14} /> {bg360Image ? '背景・服装・オチ設定' : '場所・服装・オチ設定'} (GENERATION PREVIEW)
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ※以下はシナリオ内の <code className="text-blue-300">Location:</code> / <code className="text-purple-300">Outfit:</code> / <code className="text-yellow-300">Punchline:</code> 行から自動取得されます。変更したい場合はシナリオ内の該当行を直接編集してください。
            </p>
            {(() => {
              // [v2.43] シナリオテキストからリアルタイムで場所・服装を取得
              const previewLocation = scenario?.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
              const previewOutfit = scenario?.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
              const previewPunchline = scenario?.match(/Punchline:\s*(.*?)(\n|$)/i)?.[1]?.trim() || '';
              // [v3.48] 360度背景画像の有無で場所表示を動的切り替え
              const has360Bg = !!bg360Image && !!bg360Analysis && bg360Enabled;
              const locationLabel = has360Bg ? '背景 (Background)' : '場所 (Location)';
              const locationValue = has360Bg
                ? (previewLocation || bg360Analysis?.location || '360°画像')
                : (previewLocation || (customLocation.trim() || "AIおまかせ"));
              const locationBadge = has360Bg ? '画像解析' : (customLocation.trim() ? '手入力' : 'AIおまかせ');
              const locationColor = has360Bg ? '#67e8f9' : (customLocation.trim() ? '#ffffff' : '#93c5fd');
              const badgeBg = has360Bg ? 'rgba(6,182,212,0.3)' : (customLocation.trim() ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)');
              const badgeColor = has360Bg ? '#67e8f9' : (customLocation.trim() ? '#d1d5db' : '#93c5fd');
              const badgeBorder = has360Bg ? 'rgba(6,182,212,0.4)' : (customLocation.trim() ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)');
              return (<>
                <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  {has360Bg ? <Globe size={12} className="text-cyan-400" /> : <Globe size={12} className="text-blue-400" />}
                  <span>{locationLabel}:</span>
                  <span style={{ fontWeight: 'bold', color: locationColor }}>
                    {locationValue}
                  </span>
                  <span style={{
                    marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
                    background: badgeBg,
                    color: badgeColor,
                    border: `1px solid ${badgeBorder}`
                  }}>
                    {locationBadge}
                  </span>
                </div>
                <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="text-green-400">👕</span>
                  <span>服装 (Outfit):</span>
                  <span style={{ fontWeight: 'bold', color: customOutfit.trim() ? '#ffffff' : '#93c5fd' }}>
                    {previewOutfit || (customOutfit.trim() || "AIおまかせ")}
                  </span>
                  <span style={{
                    marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
                    background: customOutfit.trim() ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)',
                    color: customOutfit.trim() ? '#d1d5db' : '#93c5fd',
                    border: `1px solid ${customOutfit.trim() ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)'}`
                  }}>
                    {customOutfit.trim() ? '手入力' : 'AIおまかせ'}
                  </span>
                </div>
                <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', paddingBottom: '4px' }}>
                  <span className="text-yellow-400">🎬</span>
                  <span>オチ (Punchline):</span>
                  <span style={{ fontWeight: 'bold', color: previewPunchline || punchlineType !== 'Auto' ? '#ffffff' : '#93c5fd' }}>
                    {previewPunchline || (punchlineType === 'Auto' ? "AIおまかせ" : getPunchlineLabel(punchlineType))}
                  </span>
                  <span style={{
                    marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
                    background: punchlineType !== 'Auto' ? 'rgba(100,100,100,0.4)' : 'rgba(29,78,216,0.3)',
                    color: punchlineType !== 'Auto' ? '#d1d5db' : '#93c5fd',
                    border: `1px solid ${punchlineType !== 'Auto' ? 'rgba(150,150,150,0.3)' : 'rgba(59,130,246,0.3)'}`
                  }}>
                    {punchlineType !== 'Auto' ? '強制指定' : 'AIおまかせ'}
                  </span>
                </div>
              </>);
            })()}
          </div>

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

            {/* [v2.86] 生成履歴ギャラリー (別セクション) */}
            {generationHistory.length > 0 && (
              <section className="relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0">
                {/* [v2.87] 生成中は履歴をロック（触れないようにする） */}
                {(isSearching || isAssembling || isGeneratingImage || isEnhancing || (isFullAutoMode && fullAutoStep > 0 && fullAutoStep < 4)) && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundColor: 'rgba(10,12,16,0.6)', backdropFilter: 'blur(2px)', pointerEvents: 'auto', borderRadius: '1rem' }} className="flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin" /> 生成中...
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0">
                  <h4 className="text-slate-300 text-xs font-bold flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-400" />
                    生成履歴 ({generationHistory.length})
                  </h4>
                  <button
                    onClick={() => {
                      if(window.confirm('生成履歴をすべて削除しますか？')) {
                        setGenerationHistory([]);
                        setGeneratedImage("");
                      }
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    <Trash2 size={12} /> 全削除
                  </button>
                </div>
                <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1">
                  {generationHistory.map((historyItem) => (
                    <div
                      key={historyItem.id}
                      onClick={() => setGeneratedImage(historyItem.img)}
                      style={{ width: '64px', height: '96px', flexShrink: 0 }}
                      className={`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${
                        generatedImage === historyItem.img 
                          ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10' 
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={historyItem.img} className="w-full h-full object-cover" alt="History thumbnail" />
                      {generatedImage === historyItem.img && (
                        <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg">
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                      {/* 個別削除ボタン (Hover) */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setGenerationHistory(prev => prev.filter(h => h.id !== historyItem.id));
                          if (generatedImage === historyItem.img) setGeneratedImage("");
                        }}
                        className="absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                      >
                        <Trash2 size={10} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          
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







