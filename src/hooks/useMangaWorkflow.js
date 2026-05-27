import { useState, useRef, useEffect, useCallback } from 'react';

// --- Imports (paths adjusted from ./lib/ to ../lib/) ---
import { setApiKey, getApiKey } from '../lib/gemini';
import { generateImageWithImagen } from '../lib/imagen';
import { generateImageWithOpenAI, setOpenAIApiKey, getOpenAIApiKey } from '../lib/openai';
import { callAI, setActiveEngine, getActiveEngine, getEngineDisplayName } from '../lib/ai-provider';
import { getLocationDetails } from '../lib/knowledge';

// --- Refactored Imports (Phase 1-2) ---
import { SYSTEM_VERSION, getPunchlineLabel, DEFAULT_CATEGORIES, getModelBadgeInfo, EMOTION_STYLES, cameraAngles, cameraLensMap, DYNAMIC_CAMERA_PROTOCOL, ANTI_CHARSHEET_PREFIX } from '../lib/constants';
import { translateApiError, applySafetyAgeUp, sanitizeForDocumentary } from '../lib/safety-filters';
import { cropEquirectangular, validate360Image, get360AnalysisPrompt, parse360Analysis } from '../lib/panorama360';
import { getCharacterAnalysisPrompt, getScenarioEnhancePrompt, getScenarioPrompt, getPolicyAnalysisPrompt, getPolicyFallbackPrompt, buildChatGPTMangaPrompt, buildGeminiMangaPrompt } from '../lib/prompts';
import { buildIdentityMatrix, getCharTraitsFromMatrix, extractDialogueOnly, extractActionOnly, injectOutfitReminder, extractPlacementRule, extractCastLimitRule, getCameraForPanel, getCameraForChatGPT, stripWeightTags, extractEmotionStyle, buildEmotionBlock, cleanCastList } from '../lib/panel-utils';
import { buildMangaPrompt } from '../lib/prompt-assembler';
import { generateScenario, enhanceScenarioText } from '../lib/scenario-provider';
import { fixPolicyViolation } from '../lib/policy-fixer';

export default function useMangaWorkflow() {
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
  const [styleJson, setStyleJson] = useState(null); // [v3.90] Style Analyzer Engine JSON

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

  // [v4.2.0] コンテンツポリシー自動修正＆リトライ選択UI
  const [showPolicyChoice, setShowPolicyChoice] = useState(false); // 選択UIの表示制御
  const [policyAutoRetrying, setPolicyAutoRetrying] = useState(false); // 自動リトライ中フラグ
  const MAX_POLICY_RETRIES = 3; // 最大リトライ回数
  const lastPolicyErrorRef = useRef(""); // 直近のポリシーエラーメッセージ（state更新待ち不要）

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

    // 非同期処理に入る前に、現在のキャストリストの値を保持しておく（累積・マージ用）
    const currentCastList = castList;

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
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
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
    let detectedStyleJson = null; // [v3.90] 作風JSON

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // [v3.90] 作風JSONのチェック
      if (file.name.endsWith('.json') || file.type === 'application/json') {
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          if (json.style_name && json.reproduction_prompt) {
            detectedStyleJson = json;
            setStyleJson(json);
            showStatus(`作風を適用: ${json.style_name}`);
            setAnalyzeThought(prev => prev + `\n> 🎭 作風JSONを検出: ${json.style_name}`);
          } else {
            showStatus("⚠️ 無効なJSONです。作風解析エンジンの出力を使用してください。");
            setAnalyzeThought(prev => prev + `\n> ⚠️ 読み込まれたJSONは作風解析エンジン用ではありませんでした。`);
          }
        } catch (e) {
          showStatus("⚠️ JSONファイルの読み込みに失敗しました。");
        }
        continue;
      }

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
      if (detectedStyleJson) {
        setAnalyzeThought(prev => prev + `\n> ✅ 作風JSONを読み込みました。`);
      }
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
      let prompt = getCharacterAnalysisPrompt();
      if (currentCastList && currentCastList.trim().length > 10) {
        prompt += `\n\n\n【最重要: 既存キャストリストのマージ指示】\n現在、すでに以下のキャストリストが存在します。\n既存のキャラクターの設定や、ユーザーによる手動修正内容を一切変更・削除することなく維持してください。\n今回新しく提供された画像から解析された新キャラクターの情報を、既存のフォーマットに合わせて重複しないように末尾に追加（マージ）した、最終的なキャストリストを出力してください。\n既存のキャラクターが今回追加された画像と同一であると明確に判断できる場合は、既存の設定に新しい特徴をマージ・追記しても構いませんが、基本的には既存の情報を消さないでください。\n\n【既存のキャストリスト】\n${currentCastList}`;
      }

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
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setAnalyzeThought(prev => prev + `\n\n[システムエラー]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("解析エラー: " + error.message);
      if (isFullAutoModeRef.current) {
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
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
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
        styleJson,
        onProgress: (msg) => setEnhanceLog(prev => prev + `\n> [API] ${msg}`)
      });

      if (result && result.text && result.text.length > 50) {
        setScenario(result.text);
        setEnhanceLog(prev => {
          const baseLog = prev + `\n> [SUCCESS] シナリオを強化しました！（${result.text.length}文字）\n> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`;
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
  const generateScenarioFromNews = async (categoriesOverride, inputModeOverride = null) => {
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

    setIsSearching(true);
    setScenarioThought("");
    setFinalPrompt("");
    setGeneratedImage(null);
    setAssembleThought("");
    setGenLog([]);
    setOriginalScenario("");
    setEnhanceLog("");

    let randomCategory = "";
    if (effectiveInputMode === 'manual') {
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
        const timerRegex = /\n> ⏳ AI応答を待機中\.\.\..*\(\d+秒経過\)/;
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

      if (result.thought) {
        setScenarioThought(prev => {
          const separator = "\n\n--- ✅ シナリオ生成完了 (思考トレース) ---\n";
          return prev + separator + result.thought;
        });
      }

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
  const assemblePrompt = async (skipGuard = false, overrideScenario = null, enableChatGPTModeOverride = null) => {
    const currentScenario = overrideScenario || scenario;
    if (!skipGuard && (!castList || !currentScenario)) return showStatus("キャストとシナリオが必要です。");
    setIsAssembling(true);
    setFinalPrompt(""); // Clear previous prompt to indicate loading
    setGenLog([]); // [v3.01] Clear previous image generation logs
    // [v2.35] 救済パネルリセット
    setPolicyErrorMsg("");
    setPolicyFixLog("");
    setIsPolicyPanelOpen(false);
    setShowPolicyChoice(false); // [v4.2.0] 選択UIリセット
    lastPolicyErrorRef.current = ""; // [v4.2.0] エラーメッセージrefリセット
    setAssembleThought("スーパーフル・プロトコル v121.3 (Universal Master) を起動中... 全データの整合性をチェックしています...");

    const effectiveChatGPTMode = typeof enableChatGPTModeOverride === 'boolean' ? enableChatGPTModeOverride : enableChatGPTMode;

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
        enableChatGPTMode: effectiveChatGPTMode,
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
    setEnhanceFACS(false);
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
    setEnhanceFACS(false);
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
  const [isFixPromptCopied, setIsFixPromptCopied] = useState(false);
  const [isPolicyCopied, setIsPolicyCopied] = useState(false);

  const copyPrompt = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    // [v4.2.1] ポリシーエラーが出ている状態でコピーした場合
    // → Web版に貼り付ける意思表示とみなし、救済パネルを展開＆メッセージボックスを閉じる
    if (policyErrorMsg || lastPolicyErrorRef.current) {
      setIsPolicyPanelOpen(true);
      setShowPolicyChoice(false);
      showStatus("📋 コピーしました → Web版に貼り付けて、下の🛡️救済パネルで手動対応できます");
    } else {
      showStatus("クリップボードにコピーしました！");
    }
  };
  // --- Step 4: Image Generation ---
  // [v2.79] 戻り値変更: フルオート連鎖用（true=成功, false=失敗）
  const regenerateImage = async (skipGuard = false, overridePrompt = null) => {
    const currentPrompt = overridePrompt || finalPrompt;
    if (isGeneratingImage || (!skipGuard && !currentPrompt)) return false;
    setIsGeneratingImage(true);
    setIsGenerationError(false);
    
    // [v4.2.3] 新規の生成開始時にポリシーエラー関連ステートをリセット
    setPolicyErrorMsg("");
    lastPolicyErrorRef.current = "";
    setShowPolicyChoice(false);
    
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

      if (errMsg.includes("Unknown parameter") || errMsg.includes("Invalid parameter")) {
        // [v3.56] APIリクエストのパラメータ不正（コンテンツポリシーとは無関係）
        guideLines = [
          `[ERROR GUIDE] ⚙️ APIパラメータの形式が不正です（${enableOpenAIApi ? 'OpenAI' : 'Google'}側の仕様変更の可能性）。`,
          "[ERROR GUIDE] 【原因】AIモデルの仕様更新により、送信パラメータが合わなくなっている可能性があります。",
          "[ERROR GUIDE] 【対処法】お手数ですが以下の手動手順で画像を生成してください。",
          "[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPTウェブ版' : 'Geminiウェブ版'} を開きます: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。`
        ];
      } else if (errMsg.includes("sensitive") || errMsg.includes("Responsible AI") || errMsg.includes("content_policy_violation") || (errMsg.includes("400") && (errMsg.includes("safety") || errMsg.includes("policy") || errMsg.includes("violation") || errMsg.includes("sensitive")))) {
        // [v4.2.0] コンテンツポリシーエラー → メッセージボックス表示（パネルは開かない）
        setPolicyErrorMsg(errMsg);
        lastPolicyErrorRef.current = errMsg; // ref経由で即時参照可能にする
        setShowPolicyChoice(true); // メッセージボックスを表示
        guideLines = [
          "[ERROR GUIDE] 🚨 表現の一部がAIの安全基準（ポリシー）に触れたため、生成がスキップされました。",
          "[ERROR GUIDE] 【自動修正】「自動修正して再生成する」を押すと、安全な言葉に書き換えて自動で作り直します。",
          "[ERROR GUIDE] 【手動生成】プロンプトをコピーし、公式のウェブ版チャット等に貼り付けて直接お試しください。"
        ];
      } else if (errMsg.includes("not found") || errMsg.includes("not supported") || errMsg.includes("404") || errMsg.includes("403") || errMsg.includes("401")) {
        // フルオートおよびエンドレスモードを停止
        if (isFullAutoMode) {
          fullAutoAbortRef.current = true;
        }
        guideLines = [
          `[ERROR GUIDE] 🔑 現在のAPIキーでは、本アプリ経由での画像生成が許可されていないか、無効になっています（${enableOpenAIApi ? 'OpenAI' : 'Google'}の権限設定）。`,
          `[ERROR GUIDE] 【対処法】本アプリでの自動生成は一旦諦め、以下の手順で公式ウェブ版から手動で生成してください。`,
          "[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPTウェブ版' : 'Geminiウェブ版'} を開きます: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。`
        ];
      } else {
        guideLines = [
          `[ERROR GUIDE] ⏲️ 接続タイムアウト、または一時的な通信エラーで生成に失敗しました（${enableOpenAIApi ? 'OpenAI' : 'Google'}サーバーの混雑など）。`,
          "[ERROR GUIDE] 【対処法】数分時間を置いてから「画像を生成する」を再度試すか、以下の手順で公式ウェブ版から生成してください。",
          "[ERROR GUIDE] 1. 画面左下の「プロンプトをコピーする」ボタンを押します。",
          `[ERROR GUIDE] 2. ${enableOpenAIApi ? 'ChatGPTウェブ版' : 'Geminiウェブ版'} を開きます: ${enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app'}`,
          `[ERROR GUIDE] 3. コピーしたプロンプトを貼り付け、元の「キャラクター設定画像」を一緒に添付して送信してください。`
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
        lastPolicyErrorRef.current = "";
      }
    } catch (error) {
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [ERROR] ${error.message}`);
    } finally {
      clearInterval(policyTimer);
      setIsFixingPolicy(false);
    }
  };

  // --- [v4.2.0] コンテンツポリシー自動修正＆リトライ（手動モード用） ---
  // 「自動修正して再生成」ボタン押下時: fixPolicyViolation → 修正プロンプトで再生成
  // 再度弾かれたらregenerateImageのcatchが再びメッセージボックスを表示するので、
  // ユーザーが毎回「もう一度試す」か「Web版に切り替える」かを判断できる（回数制限なし）
  const handlePolicyAutoFix = async () => {
    const errorMsg = lastPolicyErrorRef.current || policyErrorMsg;
    if (!finalPrompt || !errorMsg.trim()) return;

    setShowPolicyChoice(false); // メッセージボックスを閉じる
    setPolicyAutoRetrying(true);

    setGenLog(prev => [
      ...prev,
      "[POLICY AUTO-FIX] 🔄 自動修正を開始します..."
    ]);
    setPolicyFixLog("> [AUTO-FIX] コンテンツポリシーアドバイザーを起動中...");
    setIsFixingPolicy(true);

    let policyTickCount = 0;
    const policyTimer = setInterval(() => {
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
      // Phase 1: プロンプト修正
      const result = await fixPolicyViolation({
        finalPrompt,
        policyErrorMsg: errorMsg,
        selectedEngine,
        onProgress: (msg) => setPolicyFixLog(prev => prev + `\n> ${msg}`)
      });

      clearInterval(policyTimer);

      if (result.success && result.modifiedPrompt) {
        setFinalPrompt(result.modifiedPrompt);
        const methodLabel = result.method === "replacement"
          ? `✅ ${result.appliedCount}箇所を修正（${result.failedCount}箇所スキップ）`
          : "✅ フォールバック方式で配慮版プロンプトを生成";
        setPolicyFixLog(prev => prev + `\n> ${methodLabel}`);
        setGenLog(prev => [...prev, `[POLICY AUTO-FIX] ${methodLabel}。修正プロンプトで再生成します...`]);
        setPolicyErrorMsg("");
        lastPolicyErrorRef.current = "";
        setIsFixingPolicy(false);

        // Phase 2: 修正プロンプトで自動再生成
        // regenerateImageが内部でエラーをキャッチし、再度ポリシーエラーならメッセージボックスが再表示される
        const genSuccess = await regenerateImage(true, result.modifiedPrompt);

        if (genSuccess) {
          setGenLog(prev => [...prev, "[POLICY AUTO-FIX] ✅ 自動修正＆再生成が成功しました！"]);
        }
        // genSuccessがfalseの場合、regenerateImage内のcatchでメッセージボックスが再表示済み
      } else {
        throw new Error("AIがプロンプトを修正できませんでした。");
      }
    } catch (error) {
      clearInterval(policyTimer);
      console.error("[POLICY AUTO-FIX] Error:", error);
      setPolicyFixLog(prev => prev + `\n> [ERROR] ${error.message}`);
      setGenLog(prev => [...prev, `[POLICY AUTO-FIX] ❌ 自動修正に失敗: ${error.message}`]);

      // 修正自体が失敗 → メッセージボックスを再表示してユーザーに判断を委ねる
      setShowPolicyChoice(true);
    } finally {
      setIsFixingPolicy(false);
      setPolicyAutoRetrying(false);
    }
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
      navigator.clipboard.writeText(finalPrompt);
    }

    const webUrl = enableOpenAIApi ? 'https://chatgpt.com/' : 'https://gemini.google.com/app';
    const engineName = enableOpenAIApi ? 'ChatGPT' : 'Gemini';

    setGenLog(prev => [
      ...prev,
      "[POLICY WEB-SWITCH] 📋 プロンプトをクリップボードにコピーしました。",
      `[POLICY WEB-SWITCH] 🌐 ${engineName} Web版で画像を生成してください: ${webUrl}`,
      "[POLICY WEB-SWITCH] 💡 Web版に貼り付け時、キャラクターシート画像も一緒に添付すると再現性が高まります。"
    ]);
    showStatus(`📋 プロンプトをコピーしました → ${engineName} Web版に貼り付けてください`);
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

    const generatedScenario = await generateScenarioFromNews(overrideCategories, "news");
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
    const generatedPrompt = await assemblePrompt(true, generatedScenario, false); 
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

    // [v4.2.0] フルオート用ポリシーリトライループ
    let step4ok = false;
    let fullAutoPolicyRetries = 0;
    let currentGenPrompt = generatedPrompt;

    while (!step4ok && fullAutoPolicyRetries <= MAX_POLICY_RETRIES) {
      if (fullAutoAbortRef.current) break;

      step4ok = await regenerateImage(true, currentGenPrompt);

      if (!step4ok && lastPolicyErrorRef.current && fullAutoPolicyRetries < MAX_POLICY_RETRIES) {
        // コンテンツポリシーエラー → 選択UIを抑制し、自動修正を実行
        fullAutoPolicyRetries++;
        setShowPolicyChoice(false); // フルオート中は選択UIを出さない
        setIsFixingPolicy(true);

        setGenLog(prev => [
          ...prev,
          `[FULL-AUTO POLICY-FIX] 🔄 コンテンツポリシー自動修正 (${fullAutoPolicyRetries}/${MAX_POLICY_RETRIES})...`
        ]);
        setPolicyFixLog(`> [FULL-AUTO ${fullAutoPolicyRetries}/${MAX_POLICY_RETRIES}] コンテンツポリシーアドバイザーを起動中...`);

        try {
          const fixResult = await fixPolicyViolation({
            finalPrompt: currentGenPrompt,
            policyErrorMsg: lastPolicyErrorRef.current,
            selectedEngine,
            onProgress: (msg) => setPolicyFixLog(prev => prev + `\n> ${msg}`)
          });

          if (fixResult.success && fixResult.modifiedPrompt) {
            currentGenPrompt = fixResult.modifiedPrompt;
            setFinalPrompt(fixResult.modifiedPrompt);
            setPolicyErrorMsg("");
            lastPolicyErrorRef.current = "";
            setIsFixingPolicy(false);

            const methodLabel = fixResult.method === "replacement"
              ? `✅ ${fixResult.appliedCount}箇所を修正`
              : "✅ フォールバック方式で修正";
            setGenLog(prev => [...prev, `[FULL-AUTO POLICY-FIX] ${methodLabel}。修正プロンプトで再生成します...`]);
          } else {
            setIsFixingPolicy(false);
            setGenLog(prev => [...prev, "[FULL-AUTO POLICY-FIX] ❌ AIがプロンプトを修正できませんでした。"]);
            break; // 修正失敗 → ループ脱出
          }
        } catch (fixError) {
          setIsFixingPolicy(false);
          console.error("[FULL-AUTO POLICY-FIX] Error:", fixError);
          setGenLog(prev => [...prev, `[FULL-AUTO POLICY-FIX] ❌ 自動修正エラー: ${fixError.message}`]);
          break; // エラー → ループ脱出
        }
      } else if (!step4ok) {
        // ポリシーエラー以外の失敗、またはリトライ上限到達
        break;
      }
    }

    // ポリシー関連のステートをクリーンアップ
    setIsFixingPolicy(false);

    // ポリシーエラーで終了した時の処理
    const hasPolicyError = !!lastPolicyErrorRef.current;
    if (!step4ok && hasPolicyError) {
      setGenLog(prev => [
        ...prev,
        `[FULL-AUTO POLICY-FIX] ⚠️ ポリシーエラーのため自動生成を停止しました（リトライ: ${fullAutoPolicyRetries}/${MAX_POLICY_RETRIES}回）。`,
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

  // --- Return all 113 variables needed by JSX ---
  return {
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
    setStyleJson,
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
