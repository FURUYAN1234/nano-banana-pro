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
      enhanceCategories.push("【表情データベースによる表情の強化】各キャラの表情描写を限界まで大げさ・劇的にしてください（基準ウェイト2.5〜3.0相当）。キャラクターの感情を「怒る」「悲しむ」などの抽象語で済ませず、以下の【マンガ表情データベース】から最適なものを選択・組み合わせてト書きに物理的な視覚描写として追加してください。\n" +
        "【マンガ表情データベース】\n" +
        "・驚愕・絶望系：瞳孔を開く、白目になる、顔に斜線の影（青ざめる）、滝のような冷や汗、口を大きく開けて震える、髪の毛が逆立ち限界まで見開いた目\n" +
        "・激怒系：額に青筋（血管マーク）、白目のない黒目だけの鋭い眼光、歯を食いしばる、瞳に炎が宿る、顔が真っ赤になり湯気が出る\n" +
        "・歓喜・興奮系：目をキラキラ輝かせる（星マーク）、頬を赤らめる、とろけたような笑顔、鼻息が荒い、顔のパーツが画面からはみ出るほどの満面の笑み\n" +
        "・狂気・シュール系：光の消えたハイライト無しの瞳、不気味な三日月型の笑顔、無表情（点目）で真顔、虚無の目\n" +
        "・泣き系：滝のように噴き出す涙、目尻に涙を浮かべてうるうるさせる、顔をくしゃくしゃにして号泣\n\n" +
        "微笑みや軽い驚きのような控えめな表現は絶対に禁止し、常軌を逸した激しいリアクションに書き換えてください。\n\n" +
        "⚠️【セリフ保護ルール - 絶対厳守】⚠️\n表情の強化描写は必ず「状況」欄（Visual Action / ト書き）にのみ記述すること。\n「」で囲まれたセリフ（Speech Bubble内の台詞テキスト）には、表情の描写文を絶対に書き込まないこと。\nセリフ欄には元のセリフをそのまま残すか、セリフとして自然な短い発言のみを書くこと。\n悪い例: Speech Bubble 1: \"顔が真っ赤になり湯気が出るように…\" ← これは描写文であってセリフではない。禁止。\n良い例: 状況欄に「顔が真っ赤になり湯気が出るほど怒り狂う表情」と書き、セリフ欄は元の短い台詞を維持する。");
    }
    if (enhanceBodyLang) {
      enhanceCategories.push("【ボディランゲージの強化】棒立ちの状態を禁止します。通常の2倍以上の過剰なアクションで全身で感情を表現してください（基準ウェイト2.5〜3.0相当）。例: 画面を突き破る勢いで前のめりになる、腕を天井まで大きく振り上げる、机を粉砕する勢いで叩く、椅子から転げ落ちる等。体全体を使った異常なほど大きなアクションを書いてください。");
    }
    if (enhanceEffects) {
      enhanceCategories.push("【照明・演出の強化】各コマの「状況」欄に映画的・劇画的な演出効果を限界突破レベルで追加してください（基準ウェイト2.8相当）。例: 逆光で人物がシルエットになる、極端なリムライトで輪郭が光る、柔らかい大気グロー(soft atmospheric glow)が画面を包む、パンチラインのコマには画面を覆い尽くす集中線やインパクトフレーム、気迫のオーラ、スムーズな光の拡散(smooth light diffusion)で画面を満たすなどの視覚効果をト書きとして追記してください。\n⚠️【ノイズ防止】光の演出で以下の表現は使用禁止（GPT-image-2でノイズの原因となる）:\n- sparkling light particles → 代わりに soft glow を使え\n- glowing dust → 代わりに clean bloom を使え\n- magical particles / floating embers → 代わりに subtle luminous edges / soft atmospheric glow を使え\n- Tyndall effect / volumetric dust → 代わりに smooth light diffusion / gentle rim light を使え");
    }
    if (enhanceBackgrounds) {
      enhanceCategories.push("【背景の強化】各コマの背景描写に奥行きと空間の説得力を追加してください。ただしノイズやチラつきを防ぐため、以下のルールを厳守すること。\n- 背景のディテールは「構造的に意味のある要素」のみを追加する（建物、家具、空、雲、木など大きな構造物）。ランダムな細かい模様・テクスチャ・粒子は追加禁止。\n- 背景の描き込み密度はキャラクターより低くすること（キャラの方が常に目立つように）。\n- 空間の奥行き感を出すために、前景・中景・遠景のレイヤー分離と色の明暗差（空気遠近法）を活用する。\n- 例: 教室なら窓からの柔らかい光と影の落ち方、黒板の文字、奥に見える廊下。屋外なら空の広がり、建物のシルエット、遠景のぼかし。\n- 「狂気的な密度」「びっしり描き込む」のような過剰な描き込み指示は禁止。画面がノイズだらけになる原因となる。");
    }
    // [v2.47] カメラワーク強化
    if (enhanceCameraWork) {
      enhanceCategories.push("【カメラワークの強化】各コマに極限的なカメラアングル指示を追加してください。各コマの「状況」欄の冒頭に [Camera: ○○] の形式で追記します。通常のカメラワークの限界レベルの歪み（ウェイト2.8〜3.0相当）を想定した指示にしてください。\n- ローアングル/アオリ（キャラクターが巨人のように見上げられ、天井や空が大きく広がる極端な見上げ。※ただしキャラの全身は必ず描画し、靴だけのアップにはしないこと）\n- 俯瞰/バードアイ（真上から見下ろし、圧倒的なスケール感と孤立感）\n- ダッチアングル（画面が15度〜30度傾くような異常事態の演出）\n- 超広角/フィッシュアイ（画面の端が丸く歪むほどの誇張・コミカルな歪み。※ただし鼻が団子鼻(豚鼻)になる造形崩壊は絶対禁止）\n- 引き/ロングショット（宇宙や上空からの空気感）\n- パンニング/追跡ショット（キャラの移動方向にカメラが追従し、背景がモーションブラーで流れる）\n⚠️ クローズアップ・マクロ特写は全キャラ描画義務と矛盾するため使用禁止。靴や足だけのアップ画にならないこと。\n4コマ全てを同じアングルにしないでください。コマごとにアングルを変えてドラマチックなダイナミズムを作ってください。⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、救済機能で対応可能です。");
    }
    // [v2.47] セリフ・ギャグ強化
    if (enhanceDialogue) {
      enhanceCategories.push("【セリフ・ギャグの強化 — お笑い構造メソッド適用】4コマ漫画の笑いの構造を根本から再設計してください。\n\n■ ズレを作る技法（以下から最低2つ適用せよ）:\n- 【置換】状況や出来事を全く別の文脈に言い換えてセリフを書き直す（例: 深刻な会議 → 小学生の給食会議のようなセリフに）\n- 【誇張】リアクションや感情を極限まで増幅する。「驚く」→「魂が肉体から離脱するレベルで驚愕」\n- 【逆転】キャラの普段の立場・力関係を入れ替えたセリフにする（普段クールなキャラが取り乱す、普段バカなキャラが正論を言う等）\n- 【不条理】脈絡のない狂った要素を堂々とセリフに混ぜる。多少意味不明でも勢いで笑えればOK\n- 【緊張と緩和】3コマ目まで空気を極限まで張り詰めるセリフにし、4コマ目で完全崩壊させる\n- 【常識に戻る】全員が暴走する中、1人だけ冷静に「いや普通に考えておかしいだろ」と常識を提示する\n\n■ ズレを見せる構成技法:\n- 【フリ】1コマ目のセリフは「普通の予想」を作る前置き。ここでは笑わせなくてよい\n- 【ボケ】2コマ目でズレた発言を投入し「あれ？」と思わせる\n- 【ツッコミ】ボケで生まれたズレを鋭い一言で指摘して笑いを明確化する。弱い定型ツッコミは禁止、状況に即した具体的な叫び声にせよ\n- 【オチ】4コマ目でズレを確定し笑いを完成。全エネルギーをここに集中投下\n- 【天丼】1コマ目の小ネタを3コマ目で形を変えて再登場させ、4コマ目で爆発させる（4コマでは最強テクニック）\n- 【ノリツッコミ】ツッコミ役が一旦ボケに乗っかってから「いや待てよ！」と自分で崩す\n- 【かぶせ】ボケの直後にさらにもう一段ボケを重ねて畳み掛ける\n\n■ セリフの質的ルール:\n- セリフは短く鋭く。だらだら説明するセリフは削って、一言で致命傷を与えるセリフにする\n- 可能なら言葉遊び、ダブルミーニング、予想の裏切りを仕込む\n- 全てのセリフに笑いを無理に入れず、笑いの最大ポイントをオチに集中させる\n- ギャグ強度は最大。おとなしい優等生ギャグは禁止。強烈にボケまくれ");
    }
    // [v2.69] コマ割り演出・時間演出は削除済み（ChatGPT画像生成ではタグ形式が解釈されず効果なし）

    setEnhanceLog(prev => prev + `\n> [CONFIG] 強化カテゴリ: ${enhanceCategories.length}個`);

    // [v2.44] 経過時間カウンター（シナリオ強化API待機中のハングアップ防止）
    let enhanceTickCount = 0;
    const enhanceTimer = setInterval(() => {
      enhanceTickCount++;
      setEnhanceLog(prev => {
        if (enhanceTickCount <= 5) {
          const messages = [
            "\n> [PROCESS] 演出データベースを参照中...",
            "\n> [PROCESS] 感情ベクトルを計算中...",
            "\n> [PROCESS] 表現パターンを最適化中...",
          ];
          return prev + messages[Math.floor(Math.random() * messages.length)];
        }
        const elapsed = Math.floor(enhanceTickCount * 0.8);
        const timerLine = `\n> ⏳ AI応答を待機中... (${elapsed}秒経過)`;
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\.\s*\(\d+秒経過\)/;
        // [v2.44 Fix] 常に末尾に⏳行が表示されるよう既存行を削除して追記
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    // シナリオ強化プロンプト（テンプレートは prompts.js に外部化済み）
    const enhancePrompt = getScenarioEnhancePrompt(scenario, enhanceCategories);

    try {
      setEnhanceLog(prev => prev + `\n> [API] ${selectedEngine === 'openai' ? 'OpenAI' : 'Gemini'} にシナリオ強化をリクエスト中...`);
      const result = await callAI(enhancePrompt, [], castList, (msg) => {
        setEnhanceLog(prev => prev + `\n> [API] ${msg}`);
      });

      if (result && result.text && result.text.length > 50) {
        setScenario(result.text.trim());
        setEnhanceLog(prev => prev + `\n> [SUCCESS] シナリオを強化しました！（${result.text.length}文字）\n> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`);
        // [v2.48] 強化完了後にカテゴリボタンをリセット（次の強化は白紙から選択）
        setEnhanceExpressions(false);
        setEnhanceBodyLang(false);
        setEnhanceEffects(false);
        setEnhanceBackgrounds(false);
        setEnhanceCameraWork(false);
        setEnhanceDialogue(false);
        setEnhanceFACS(false);
        // [v2.69] コマ割り・時間演出は削除済み
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
  // [v2.78] 戻り値追加 + categoriesOverrideパラメータ追加（フルオート時のstate反映タイミングバグ修正）
  const generateScenarioFromNews = async (categoriesOverride) => {
    if (!castList) return showStatus("先にキャラクターを解析してください。");
    if (isSearching) return;

    // [v2.78] カテゴリオーバーライドがあればそれを使用（フルオート時）。Eventオブジェクト誤爆回避のため配列かチェック
    const effectiveCategories = Array.isArray(categoriesOverride) ? categoriesOverride : categories;

    // Manual Mode Check
    if (inputMode === 'manual' && !manualTopic.trim()) {
      alert("自由入力トピックを入力してください。");
      return;
    }
    // News Mode Check
    if (inputMode === 'news' && !effectiveCategories.find(c => c.checked)) {
      alert("少なくとも1つのカテゴリを選択してください。");
      return;
    }

    setIsSearching(true);
    setScenarioThought("");
    setFinalPrompt(""); // Fix: Clear previous prompt to prevent "Instant Done" state
    setGeneratedImage(null); // Fix: Clear previous image
    setAssembleThought(""); // Fix: Clear previous assembly log
    setGenLog([]); // [v3.01] Clear previous image generation logs
    // [v2.50] シナリオ強化stateのリセット（新規シナリオ生成時に前回の強化状態が残る問題を修正）
    setOriginalScenario(""); // 強化前の原文をクリア（「強化済み」バッジ消去 + 古いシナリオへの誤復元防止）
    setEnhanceLog(""); // 強化ログをクリア

    let randomCategory = "";

    // Determine Topic
    if (inputMode === 'manual') {
      randomCategory = "手動入力";
      setScenario("");
      setScenarioThought(`> コンテキスト強制リブート: 開始\n > モード: 手動入力 \n > 対象: ${manualTopic.substring(0, 30)}...`);
    } else {
      const activeCats = effectiveCategories.filter(c => c.checked);
      // FIX: Combined keywords from all selected categories
      if (activeCats.length > 0) {
        randomCategory = activeCats.map(c => c.keywords).join(' ');

        showStatus(`カテゴリ「${activeCats.map(c => c.label).join('・')}」で最新ニュースを検索中... (${targetDate})`);
        setScenario("");
        setScenarioThought(`> コンテキスト強制リブート: 開始\n > 対象カテゴリ: ${activeCats.map(c => c.label).join('、')} (キーワード: ${randomCategory}) \n > 対象日付: ${targetDate} \n > Google Grounding で検索中...`);
      } else {
        // Fallback if checked but empty (should not happen due to validation)
        randomCategory = "最新ニュース";
      }
    }

    // Exclude repetitive AI topics
    const searchTopicKeywords = `${randomCategory} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;

    // [v2.44] フェイクストリーミング＋経過時間表示（STEP1と同様のUX統一）
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
        // [v2.44 Fix] 常に末尾に⏳行が表示されるよう既存行を削除して追記
        if (timerRegex.test(prev)) {
          return prev.replace(timerRegex, '') + timerLine;
        }
        return prev + timerLine;
      });
    }, 800);

    try {
      // 1. Search for news OR Use Manual Input
      let newsContext = "";

      if (inputMode === 'manual') {
        // Manual Input Path
        newsContext = `
         【ユーザー提供トピック/URL】:
         ${manualTopic}
         
         (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
         URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
         `;

        // [RESTORED] Direct URL Fetching Logic
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const urls = manualTopic.match(urlRegex);
        if (urls && urls.length > 0) {
          setScenarioThought(`> 手動入力内にURLを検出: ${urls[0]} \n> プロキシ経由でコンテンツを取得中...`);
          try {
            // Fetch via proxy buffer to bypass CORS
            const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(urls[0])}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();

            // Extract text using native DOMParser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            // Strip out script and style elements
            const scripts = doc.querySelectorAll('script, style');
            scripts.forEach(s => s.remove());

            // Gather readable text primarily from content tags
            const textElements = doc.querySelectorAll('h1, h2, h3, h4, p, li, article, section');
            let extractedText = "";
            textElements.forEach(el => {
              if (el.textContent.trim()) {
                extractedText += el.textContent.trim() + "\n";
              }
            });

            // Fallback to body text if specific tags were empty
            if (!extractedText.trim()) {
              extractedText = doc.body.textContent || "";
            }

            // Clean up excess whitespace and limit length
            const cleanText = extractedText.replace(/\s+/g, ' ').substring(0, 3000);

            setScenarioThought(prev => prev + `\n> コンテンツ抽出完了 (${cleanText.length}文字)。注入中...`);
            newsContext = `
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${cleanText}
             
             (指示): 上記はユーザーが入力したURL（ ${urls[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `;
          } catch (fetchErr) {
            console.error("URL Fetch Error: ", fetchErr);
            setScenarioThought(prev => prev + `\n> 警告: URLコンテンツの取得に失敗しました (${fetchErr.message})。LLMの内部知識で補完します。`);
          }
        }

      }

      // [v1.8.94] Location Randomizer Logic
      const locationList = [
        "寂れた商店街", "無人島", "ファミレスの厨房", "満員電車", "首相官邸", "ライブハウス", "コンビニ前", "古民家", "火星基地",
        "学校の屋上", "深夜のオフィス", "結婚式場", "工事現場", "刑務所の面会室", "豪華客船の甲板", "雪山のロッジ",
        "砂漠の真ん中", "海底トンネル", "裁判所", "病院の待合室", "動物園の檻の中", "美術館", "映画館の最前列",
        "ラーメン屋のカウンター", "温泉旅館", "サウナの中", "エレベーターの中", "断崖絶壁", "廃墟の遊園地", "月面",
        "飛行機の機内", "新幹線の座席", "警察署の取調室", "ゴミ捨て場", "高級ホテルのスイートルーム", "スタジアム",
        "神社の境内", "教会の告解室", "地下アイドルの握手会", "ゲームセンター", "コインランドリー", "公園のベンチ",
        "洞窟の奥", "ジャングルの奥地", "南極基地", "国際宇宙ステーション", "潜水艦の内部", "戦車の内部", "魔法使いの塔",
        "異世界の酒場", "魔王城の玉座", "RPGのダンジョン", "サイバーパンクな路地裏", "昭和の茶の間", "江戸時代の長屋",
        "渋谷スクランブル交差点", "秋葉原の電気街", "京都の竹林", "大阪の道頓堀", "沖縄のビーチ", "北海道のラベンダー畑"
      ];
      // Select one location randomly
      const forcedLocation = locationList[Math.floor(Math.random() * locationList.length)];
      console.log("Forced Location:", forcedLocation); // Debug log

      // [v3.68] ローカルRAGによるディテールの動的注入
      const activeLocation = bg360Image && bg360Analysis && bg360Enabled 
        ? bg360Analysis.location 
        : (customLocation.trim() ? customLocation.trim() : forcedLocation);
      const ragLocationDetails = getLocationDetails(activeLocation);
      const ragReactions = getRandomReactions();

      // STEP2 scenario prompt (template externalized to prompts.js)
      const scenarioPrompt = getScenarioPrompt({
        randomCategory,
        targetDate,
        inputMode,
        manualTopic,
        newsContext,
        searchTopicKeywords,
        bg360Image,
        bg360Analysis,
        bg360Enabled,
        customLocation,
        forcedLocation,
        customOutfit,
        ragLocationDetails,
        ragReactions,
        punchlineType
      });

      // Call Gemini with the Cast List context to ensure character consistnecy in logic
      // [v3.48] 360度背景画像が読み込まれている場合はマルチモーダル入力として添付
      const scenarioImages = (bg360ImageParts && bg360Enabled) ? [bg360ImageParts] : [];
      const result = await callAI(scenarioPrompt, scenarioImages, castList, (msg) => {
        setScenarioThought(prev => prev + `\n > [API] ${msg} `);
      });
      setUsedModel(result.model); // [v1.7.0] Track Model

      // Basic parsing of the result (assuming Gemini follows JSON format majority of time, 
      // but adding fallback parsing for robustness)
      // Robust Parsing (Plain Text Regex)
      let parsedData = { topic: randomCategory, scenario: "" };

      try {
        const titleMatch = result.text.match(/Topic:\s*(.+)/i);
        const loglineMatch = result.text.match(/Logline:\s*(.+)/i);
        const locationMatch = result.text.match(/Location:\s*(.+)/i);
        const outfitMatch = result.text.match(/Outfit:\s*(.+)/i);
        const punchlineMatch = result.text.match(/Punchline:\s*(.+)/i);
        const scenarioMatch = result.text.match(/Scenario:\s*([\s\S]+)/i);

        if (scenarioMatch) {
          parsedData.topic = titleMatch ? titleMatch[1].trim() : randomCategory;
          // [v2.42] AIが「Topic: xxx」形式で出力した場合のプレフィックス除去
          parsedData.topic = parsedData.topic.replace(/^Topic:\s*/i, '').trim();
          parsedData.logline = loglineMatch ? loglineMatch[1].trim() : "";
          parsedData.location = locationMatch ? locationMatch[1].trim() : "Generic Background";
          parsedData.outfit = outfitMatch ? outfitMatch[1].trim() : "";
          parsedData.punchline = punchlineMatch ? punchlineMatch[1].trim() : "";
          parsedData.scenario = scenarioMatch[1].trim();
        } else {
          // Fallback: Try JSON just in case the model ignored instructions, or raw
          const jsonMatch = result.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const json = JSON.parse(jsonMatch[0]);
            parsedData.topic = json.topic || randomCategory;
            parsedData.location = json.location || "Generic Background";
            parsedData.scenario = json.scenario || result.text;
          } else {
            // [v1.8.57] Logic Safety: If result is short/garbage, do not hallucinate randomly.
            if (result.text.length < 20) {
              throw new Error("AI returned empty or invalid response.");
            }
            // Treat raw text as scenario, but use the URL/Input as topic if available.
            parsedData.topic = inputMode === 'manual' ? (manualTopic || "Custom Scenario") : (searchTopic || "Generated Scenario");
            parsedData.scenario = result.text;
          }
        }
      } catch (e) {
        // Ultimate Fallback: Treat entire text as scenario
        console.warn("Parse warning:", e);
        parsedData.scenario = result.text;
        parsedData.topic = "Generated Scenario";
      }

      // [v1.8.57] Anti-Hallucination Check for URLs
      // If the User Input was a URL, but the AI generated a scenario clearly unrelated (e.g. Curling), we can't easily detect semantics,
      // but we can ensure the TOPIC reflects the input source.

      // [v1.95] Quality Fix: Do NOT remove parenthetical text to preserve inner monologues and emotions
      const cleanScenario = (text) => {
        return text;
      };

      parsedData.scenario = cleanScenario(parsedData.scenario);

      setScenario(parsedData.scenario);
      // [v2.43] シナリオテキストにLocation/Outfit行を含めて表示・編集可能にする
      const loglineLine = parsedData.logline ? `\nLogline: ${parsedData.logline}` : '';
      const outfitLine = (customOutfit.trim() || parsedData.outfit) ? `\nOutfit: ${customOutfit.trim() || parsedData.outfit}` : '';
      const punchlineLine = parsedData.punchline ? `\nPunchline: ${parsedData.punchline}` : '';
      // [v3.50] 360°背景モードのヘッダー情報
      const bg360HeaderLine = bg360Image
        ? (bg360Enabled
          ? `\n🌐 360°背景: ON (${bg360Analysis?.location || '解析済み'} / ${bg360Analysis?.spatialType === 'indoor' ? '室内' : bg360Analysis?.spatialType === 'outdoor' ? '屋外' : '複合'}) — 添付ファイル: キャラシート＋360°画像`
          : `\n🌐 360°背景: OFF — 背景はAIが自由選定 / 添付ファイル: キャラシートのみ`)
        : '';
      // [v3.53] 元のsetScenarioはカメラワーク処理後に統合版として呼ばれるため、ここでは省略

      // [v2.43] ロック値もセット（GENERATION PREVIEW表示用）
      setLockedLocation(customLocation.trim() || parsedData.location || "Unspecified");
      setLockedOutfit(customOutfit.trim() || parsedData.outfit || "");

      setScenarioThought(prev => prev + `\n > トピック選定: ${parsedData.topic} \n > シナリオ構築完了。`);
      showStatus("シナリオの生成が完了しました！");

      // [v3.53] 360°カメラワーク自律設計 (Pass 1: AI Camera Work Design)
      // 360°背景が有効な場合、AIにシナリオの各コマに最適な方角を判断させる
      let cameraWorkHeaderLine = '';
      if (bg360Image && bg360Analysis && bg360Enabled && bg360ImageParts) {
        try {
          setScenarioThought(prev => prev + `\n > 🎬 [360° Camera AI] カメラワーク自律設計を開始...`);
          showStatus('🎬 360°カメラワーク設計中...');
          setIs360CameraWorking(true); // [v3.53] Step3ブロック開始

          const cameraWorkPrompt = `あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${parsedData.scenario}

【360°背景の解析情報】
- 場所: ${bg360Analysis.location}
- 光源: ${bg360Analysis.lighting}
- 空間タイプ: ${bg360Analysis.spatialType}
- 特徴物: ${bg360Analysis.objects || 'なし'}
- 雰囲気: ${bg360Analysis.mood || '不明'}

【設計ルール】
1. 各コマは360°空間の**異なる方角**を活用し、空間の立体感を演出すること
2. yawは0°=正面、90°=右、180°=背面、270°=左
3. pitchは0°=水平、正の値=上向き、負の値=下向き（±30°以内推奨）
4. FOVはカメラのショットに合わせて調整（60°=望遠、90°=標準、120°=広角）
5. 光源方向を考慮し、逆光・順光・サイドライトを各コマで使い分けること
6. 4コマ中少なくとも3コマは異なるyaw方向（差が45°以上）にすること

**必ず以下のJSON形式のみで出力してください。それ以外のテキストは一切不要です。**
{
  "panels": [
    {
      "panel": 1,
      "camera": "ショットタイプ（例: establishing_shot, close_up, medium_shot, wide_shot）",
      "yaw": 0,
      "pitch": 0,
      "fov": 90,
      "reasoning": "この方角を選んだ理由（日本語・1文）"
    },
    { "panel": 2, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 3, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 4, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." }
  ]
}`;

          const cameraWorkResult = await callAI(cameraWorkPrompt, [bg360ImageParts], null, (msg) => {
            setScenarioThought(prev => prev + `\n > [Camera AI] ${msg}`);
          });

          // JSONをパース
          const cwJsonStr = cameraWorkResult.text.match(/\{[\s\S]*\}/)?.[0];
          if (cwJsonStr) {
            const cameraWork = JSON.parse(cwJsonStr);
            setBg360CameraWork(cameraWork);

            // 進捗窓にカメラワーク設計結果を表示
            const yawToDirection = (yaw) => {
              const dirs = ['北(正面)', '北東', '東(右)', '南東', '南(背面)', '南西', '西(左)', '北西'];
              return dirs[Math.round(((yaw % 360 + 360) % 360) / 45) % 8];
            };
            const shotTypeJa = (type) => {
              const map = { 'establishing_shot': 'ロングショット', 'wide_shot': 'ワイドショット', 'medium_shot': 'ミドルショット', 'close_up': 'クローズアップ', 'extreme_close_up': '超クローズアップ', 'over_the_shoulder': '肩越しショット', 'bird_eye': '俯瞰', 'worm_eye': 'アオリ' };
              return map[type] || type;
            };

            let cwDisplayLines = '\n > 🎬 ══════ 360° カメラワーク設計完了 ══════';
            cameraWork.panels.forEach(p => {
              cwDisplayLines += `\n > 🎬 コマ${p.panel}: ${yawToDirection(p.yaw)} (yaw:${p.yaw}°) / ${shotTypeJa(p.camera)} / FOV:${p.fov}°`;
              cwDisplayLines += `\n >    └─ ${p.reasoning}`;
            });
            cwDisplayLines += '\n > 🎬 ══════════════════════════════════';

            setScenarioThought(prev => prev + cwDisplayLines);
            showStatus('🎬 360°カメラワーク設計完了！背景クロップを開始...');

            // [v3.53 Phase2] 各コマの方角に基づいて360°画像をクロップ
            try {
              setScenarioThought(prev => prev + '\n > 🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...');
              const croppedResults = [];
              for (const panel of cameraWork.panels) {
                const cropped = await cropEquirectangular(
                  bg360Image,
                  panel.yaw,
                  panel.pitch || 0,
                  panel.fov || 90
                );
                croppedResults.push(cropped);
              }
              setBg360CroppedPanels(croppedResults);
              setScenarioThought(prev => prev + `\n > 🔲 [Crop] ✅ ${croppedResults.length}枚のクロップ画像を生成しました`);
              showStatus('🎬 カメラワーク設計＋背景クロップ完了！');
              setIs360CameraWorking(false); // [v3.53] Step3ブロック解除
            } catch (cropErr) {
              console.warn('[360° Crop] Cropping failed:', cropErr);
              setScenarioThought(prev => prev + `\n > ⚠️ [Crop] クロップに失敗しました: ${cropErr.message}（スキップ）`);
              setIs360CameraWorking(false); // [v3.53] 失敗時もブロック解除
            }

            // シナリオヘッダーに追加する文字列を構築
            cameraWorkHeaderLine = '\n🎬 360° Camera Work:';
            cameraWork.panels.forEach(p => {
              cameraWorkHeaderLine += `\n  Panel${p.panel}: ${yawToDirection(p.yaw)}(${p.yaw}°) ${shotTypeJa(p.camera)} FOV${p.fov}° — ${p.reasoning}`;
            });
          } else {
            console.warn('[360° Camera AI] JSON parse failed, skipping camera work');
            setScenarioThought(prev => prev + '\n > ⚠️ [Camera AI] カメラワーク設計のJSON解析に失敗しました（スキップ）');
            setIs360CameraWorking(false); // [v3.53] JSON解析失敗時もブロック解除
          }
        } catch (cwErr) {
          console.warn('[360° Camera AI] Camera work design failed:', cwErr);
          setScenarioThought(prev => prev + `\n > ⚠️ [Camera AI] カメラワーク設計に失敗しました: ${cwErr.message}（スキップ — シナリオ生成には影響しません）`);
          setIs360CameraWorking(false); // [v3.53] 失敗時もブロック解除
        }
      }

      const finalScenarioText = `## タイトル: ${parsedData.topic} !?${loglineLine}\nLocation: ${parsedData.location || "Unspecified"}${outfitLine}${punchlineLine}${bg360HeaderLine}${cameraWorkHeaderLine}\n\n${parsedData.scenario} `;
      setScenario(finalScenarioText);
      return finalScenarioText; // [v2.79] フルオート連鎖用: テキスト自体を返す

    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setScenarioThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("シナリオ生成エラー");
      return null; // [v2.79] フルオート連鎖用: 失敗
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
      // Determine Style Variable based on user choice OR Auto-detection
      let isMonochrome = colorMode === 'monochrome';
      if (colorMode === 'auto') {
        const lowerCast = castList.toLowerCase();
        // Look for the specific declaration forced in analysis or general keywords
        isMonochrome = lowerCast.includes('style_tag: monochrome') || lowerCast.includes('monochrome') || lowerCast.includes('greyscale') || lowerCast.includes('screentone');
      }

      // [v1.9.1] Natural Language Style Core for Imagen 4
      const styleCore = isMonochrome
        ? "Draw in a traditional Japanese black and white manga style using G-pen ink lines, screentones, and manual hatching. The artwork should have high-contrast black and white shading without any color, similar to a professionally published comic."
        : "Draw in a high-budget, vibrant full-color TV anime style. The characters should have delicate and detailed anime features with beautiful eyes, cinematic lighting, and sharp clean ink contours. Ensure the artwork looks like an official Japanese animation illustration.";
      // extractEmotionStyle, buildEmotionBlock -> panel-utils.js に外部化済み

      // [v2.25] キャスト解析結果からIdentity Matrixを自動生成

      // [v2.25] キャラ名からIdentity Matrixの特徴行を返すヘルパー

      const dynamicCamera = DYNAMIC_CAMERA_PROTOCOL;

      // [v2.42] タイトル抽出 + 「Topic:」プレフィックス除去サニタイズ
      let cleanTopic = currentScenario.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim() || currentScenario.split('\n')[0].substring(0, 20);
      // AIが「Topic: xxx」というラベル付きで出力してしまうケースを除去
      cleanTopic = cleanTopic.replace(/^Topic:\s*/i, '').trim();

      // [v2.43] シナリオテキストから場所・服装を読み取る（ユーザーの直接編集を反映）
      const scenarioLocationMatch = currentScenario.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim();
      const scenarioOutfitMatch = currentScenario.match(/Outfit:\s*(.*?)(\n|$)/i)?.[1]?.trim();
      const cleanLocation = scenarioLocationMatch || "Generic Detailed Background";
      // [v2.43] 服装もシナリオテキストから取得（「なし」やキャラシート準拠系は空扱い）
      const activeOutfit = (scenarioOutfitMatch && !/^(なし|キャラシート準拠|none|default)/i.test(scenarioOutfitMatch)) ? scenarioOutfitMatch : "";

      // [v1.9.5] Remove markdown codeblock artifacts that leak into Visual Action extraction
      const cleanScenario = currentScenario.replace(/```(?:json|markdown)?/gi, '').trim();

      // [v1.8.3] Smart Splitter for Panels
      const extractPanel = (text, header, nextHeader) => {
        const regex = new RegExp(`\\[${header}.*?\\]([\\s\\S]*?)(?=\\[${nextHeader}|$)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : "";
      };

      const panel1Text = extractPanel(cleanScenario, "1コマ目", "2コマ目") || cleanScenario;
      const panel2Text = extractPanel(cleanScenario, "2コマ目", "3コマ目");
      const panel3Text = extractPanel(cleanScenario, "3コマ目", "4コマ目");
      const panel4Text = extractPanel(cleanScenario, "4コマ目", "UNKNOWN");

      // cameraAngles -> constants.js に外部化済み
      // [v2.53.2] Fisher-Yatesシャッフルで4パネル全て異なるカメラアングルを保証
      // 旧getRandomAngle()は重複が発生していたため廃止
      const shuffleArray = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };
      const shuffledCameras = shuffleArray(cameraAngles).slice(0, 4);
      const cameraState = { index: 0 };

      // [v2.54.0] Extract AI selected camera tags, or fallback to Fisher-Yates generator
      // cameraLensMap -> constants.js に外部化済み


      // [v3.55] ChatGPT用: Geminiウェイトタグを自然言語に変換（プロンプト文字数圧縮）
      // (tag name:2.7) → tag name に変換し、重複や冗長な修飾を除去

      // [v3.55] ChatGPT用: カメラタグの自然言語化（~1300文字削減）

      // [v1.95] Dialogue Cleaner & Formatter (Line-by-Line Fix + Speaker Extraction with Character Validation)


      // [v2.43] 各パネルに服装リマインドを自動注入（シナリオテキストのOutfit行から取得）
      // [v2.30] キャストリスト解析 -> panel-utils.js cleanCastList に外部化済み
      const VAR_CAST_LIST = cleanCastList(castList, activeOutfit);

      // [v3.55] ChatGPT用: キャストデータからウェイトタグを除去して自然言語化（~850文字削減）
      const VAR_CAST_LIST_CHATGPT = enableChatGPTMode ? stripWeightTags(VAR_CAST_LIST) : VAR_CAST_LIST;

      // Ensure we always have non-empty prompt texts
      const safeLocation = cleanLocation || "Detailed Background";
      const safeTopic = cleanTopic || "4-koma Manga";
      
      // [v2.62] Dynamic watermark for ChatGPT
      const watermarkEng = enableChatGPTMode 
        ? `Generated by ChatGPT with Super FURU AI 4-koma ${SYSTEM_VERSION}`
        : `Generated by Super FURU AI 4-koma ${SYSTEM_VERSION}`;

      // [v3.31] ChatGPTモード時は専用の超圧縮プロンプトを使用、Gemini時は最適化版を使用する分岐構造
      let rawPrompt = "";

      // パネルセクション文字列のビルド (ChatGPT/Gemini共通)
      const panels = [panel1Text, panel2Text, panel3Text, panel4Text];
      let panelSections = "";

      if (enableChatGPTMode) {
        // ChatGPTモード: パネルセクション構築
        panelSections = panels.map((pt, i) => {
          const num = i + 1;
          return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
${extractCastLimitRule(pt, castList).replace(/\\\\[/g, '').replace(/\\\\]/g, '')}
Camera: ${getCameraForChatGPT(pt, cameraState)}
Action: ${injectOutfitReminder(extractActionOnly(pt, castList, extractPlacementRule(pt, castList)), activeOutfit)}
Dialogue (Japanese text inside speech bubbles only): ${extractDialogueOnly(pt, castList)}`;
        }).join('\n\n');

        rawPrompt = buildChatGPTMangaPrompt({
          safeTopic, watermarkEng, styleCore, safeLocation,
          bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels, enableChatGPTMode,
          VAR_CAST_LIST_CHATGPT, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
          panelSections
        });
      } else {
        // Geminiモード: パネルセクション構築
        panelSections = panels.map((pt, i) => {
          const num = i + 1;
          return `## Panel ${num}
${buildEmotionBlock(pt)}
${extractPlacementRule(pt, castList)}
${extractCastLimitRule(pt, castList)}
Camera: ${getCameraForPanel(pt, shuffledCameras, cameraState)}.
[LENS]: (ABOVE CAMERA DISTORTION MAX:2.9), (NEVER normal photograph:3.0), (extreme severe perspective warp:2.7), (violently tilted horizon:2.6). Break normal camera angle.
Action (Visual ONLY): ${injectOutfitReminder(extractActionOnly(pt, castList, extractPlacementRule(pt, castList)), activeOutfit)}.
Dialogue (ONLY inside bubbles): ${extractDialogueOnly(pt, castList)}.`;
        }).join('\n\n');

        // [v3.50] Gemini用: 画像生成強制 + キャラシート防止プレフィックス
        const antiCharSheetPrefix = ANTI_CHARSHEET_PREFIX;
        rawPrompt = antiCharSheetPrefix + buildGeminiMangaPrompt({
          safeTopic, watermarkEng, styleCore, safeLocation,
          bg360Image, bg360Analysis, bg360Enabled, bg360CroppedPanels,
          VAR_CAST_LIST, identityMatrix: buildIdentityMatrix(castList), activeOutfit,
          dynamicCamera, panelSections
        });
      }

      // Wait a bit to simulate processing/syncing (Important for User Experience)
      await new Promise(resolve => setTimeout(resolve, 800));

      // [v2.27] セーフティ年齢引き上げ変換を適用
      let safePrompt = applySafetyAgeUp(rawPrompt.trim());

      // [v3.47] ドキュメンタリーモードの場合、コンテンツサニタイザーを追加適用
      if (punchlineType === 'Documentary') {
        safePrompt = sanitizeForDocumentary(safePrompt);
        setAssembleThought(prev => prev + "\n> [ドキュメンタリーモード] コンテンツセーフティ・サニタイザー適用済み (危険ワードを安全な言い換えに自動変換)");
      }

      setAssembleThought(prev => prev + "\n> [v3.31] 事故防止プロトコル全モデル適用済み:\n>   ✅ 縦書きセリフ強制\n>   ✅ セリフ勝手追加禁止\n>   ✅ 参照画像キャラシート再現禁止\n>   ✅ カメラワーク平易化禁止\n>   ✅ プロンプト分岐 (ChatGPT/Gemini)\n>   ✅ 出力前チェックリスト追加");



      setFinalPrompt(safePrompt);
      setAssembleThought(prev => prev + "\n> セーフティ年齢フィルター: 適用済み\n> 最適化ベクトル: 計算完了\n> 構造ロック: 有効\n> 風刺ロジック: 強化済み\n> [完了] 最終プロンプトを構築しました。");
      showStatus("最終プロンプトの構築が完了しました。画像生成を開始します...");
      return safePrompt; // [v2.79] フルオート連鎖用: 成功

      // Auto-trigger Image Generation handled by effect if needed, but manual button usually forces user to check.

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

    // [v2.44] 経過時間カウンター
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
      // === Phase 1: エラーメッセージの解析 ===
      setPolicyFixLog(prev => prev + "\n> [Phase 1/5] エラーメッセージを解析中...");
      setPolicyFixLog(prev => prev + "\n> [Phase 2/5] 問題箇所の特定をAIにリクエスト中...");

      const metaPrompt = getPolicyAnalysisPrompt(policyErrorMsg.trim(), finalPrompt);

      const result = await callAI(metaPrompt, [], null, (msg) => {
        setPolicyFixLog(prev => prev + `\n> ${msg}`);
      });

      setPolicyFixLog(prev => prev + "\n> [Phase 3/5] AIの応答を受信・解析中...");

      if (!result.text || result.text.trim().length < 10) {
        setPolicyFixLog(prev => prev + "\n> [ERROR] AIからの応答が空です。エラー情報をより詳しく入力して再試行してください。");
        return;
      }

      // === Phase 4: 置換テーブルのパースと適用 ===
      setPolicyFixLog(prev => prev + "\n> [Phase 4/5] 置換テーブルをプロンプトに適用中...");

      let replacements = [];
      try {
        // JSONブロックを抽出（マークダウンコードフェンス対応）
        let jsonStr = result.text.trim();
        const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
          jsonStr = jsonMatch[1].trim();
        }
        // 先頭の [ を探す
        const bracketStart = jsonStr.indexOf('[');
        const bracketEnd = jsonStr.lastIndexOf(']');
        if (bracketStart !== -1 && bracketEnd !== -1) {
          jsonStr = jsonStr.substring(bracketStart, bracketEnd + 1);
        }
        replacements = JSON.parse(jsonStr);
      } catch (parseError) {
        console.error("JSON parse error:", parseError, "Raw:", result.text);
        setPolicyFixLog(prev => prev + "\n> [WARNING] AIの出力をJSON解析できませんでした。フォールバック（全文再生成）モードに切り替えます...");
        // フォールバック: 従来の全文再生成方式
        await regenerateSafePromptFallback();
        return;
      }

      if (!Array.isArray(replacements) || replacements.length === 0) {
        setPolicyFixLog(prev => prev + "\n> [WARNING] 置換対象が見つかりませんでした。エラー情報をより具体的に入力して再試行してください。");
        return;
      }

      // 置換を適用
      let modifiedPrompt = finalPrompt;
      let appliedCount = 0;
      let failedCount = 0;

      for (const rep of replacements) {
        if (!rep.from || !rep.to) continue;
        if (modifiedPrompt.includes(rep.from)) {
          modifiedPrompt = modifiedPrompt.replace(rep.from, rep.to);
          appliedCount++;
          setPolicyFixLog(prev => prev + `\n> ✅ "${rep.from.substring(0, 40)}..." → "${rep.to.substring(0, 40)}..." (${rep.reason || ''})`);
        } else {
          failedCount++;
          setPolicyFixLog(prev => prev + `\n> ⚠️ 未発見（スキップ）: "${rep.from.substring(0, 50)}..."`);
        }
      }

      if (appliedCount > 0) {
        setFinalPrompt(modifiedPrompt);
        setPolicyFixLog(prev => prev + `\n> [Phase 5/5] ✅ ${appliedCount}箇所を修正しました（${failedCount}箇所はスキップ）。STEP3のプロンプト欄に反映済みです。`);
        setPolicyFixLog(prev => prev + `\n> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」して${selectedEngine === 'openai' ? 'ChatGPT' : 'Gemini'} Web版で生成してください。`);
        // [v2.48] 修正適用後にエラーメッセージ入力をクリア（古い情報の混入防止）
        setPolicyErrorMsg("");
      } else {
        setPolicyFixLog(prev => prev + "\n> [WARNING] AIが提案した修正箇所がプロンプト内に見つかりませんでした。");
        setPolicyFixLog(prev => prev + "\n> [GUIDE] フォールバック（全文再生成）モードに切り替えます...");
        await regenerateSafePromptFallback();
      }
    } catch (error) {
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [ERROR] ${error.message}`);
    } finally {
      clearInterval(policyTimer);
      setIsFixingPolicy(false);
    }
  };

  // --- [v2.42] フォールバック: 従来の全文再生成方式（JSONパース失敗時の保険） ---
  const regenerateSafePromptFallback = async () => {
    setPolicyFixLog(prev => prev + "\n> [Fallback] 全文再生成モードで修正中...");
    try {
      const fallbackPrompt = getPolicyFallbackPrompt(policyErrorMsg.trim(), finalPrompt);

      const result = await callAI(fallbackPrompt, [], null, (msg) => {
        setPolicyFixLog(prev => prev + `\n> ${msg}`);
      });

      if (result.text && result.text.length > 100) {
        setFinalPrompt(result.text.trim());
        setPolicyFixLog(prev => prev + "\n> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。");
        // [v2.48] フォールバック成功時もエラーメッセージ入力をクリア
        setPolicyErrorMsg("");
      } else {
        setPolicyFixLog(prev => prev + "\n> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。");
      }
    } catch (error) {
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [Fallback ERROR] ${error.message}`);
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







