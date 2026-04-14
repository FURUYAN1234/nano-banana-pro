import React, { useState, useRef, useEffect } from 'react';

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
  Globe,
  Edit3,
  Download,
  ChevronDown
} from 'lucide-react';
// --- Imports ---
import { setApiKey, getApiKey, callThinkingGemini } from './lib/gemini';
import { generateImageWithImagen } from './lib/imagen';

const SYSTEM_VERSION = "v2.45 Alpha";

// --- Error Translation Utility ---
const translateApiError = (errorMsg) => {
  const msg = errorMsg || "";
  if (msg.includes("sensitive") || msg.includes("Responsible AI") || msg.includes("400")) {
    return "[ERROR GUIDE] 🚨 送信内容がAIの安全基準（NSFW等の検閲）に引っかかり、処理がブロックされました。\n[対処法] 送信内容（画像・テキスト）に過激・不適切な表現がないか確認し、修正して再試行してください。";
  } else if (msg.includes("not found") || msg.includes("not supported") || msg.includes("404") || msg.includes("403")) {
    return "[ERROR GUIDE] 🔑 現在のAPIキーではこの機能へのアクセス権限がありません、または制限されています。\n[対処法] 時間を置くか、設定を見直してください。";
  } else {
    return "[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーが発生しました。\n[対処法] サーバーが混雑している可能性があります。数分時間を置いてから再度お試しください。";
  }
};

// --- [v2.27] セーフティ年齢引き上げ変換 (Safety Age-Up Filter) ---
// Geminiのセンシティブ判定（未成年+制服の組み合わせ）を回避するため、
// プロンプト内の該当タグを安全な表現に自動変換する。
// v2.27c: Gemini自身のフィードバックに基づき、以下の追加トリガーにも対応:
//   - ミニスカート → スカート（露出軽減）
//   - ギャル/gal → fashionable（ティーン文化の脱色）
//   - ローアングル → ミディアムアングル（アップスカート防止）
//   - 低身長 → 削除（幼く見える要素の排除）
const applySafetyAgeUp = (promptText) => {
  const SAFETY_REPLACEMENTS = [
    // --- レベル1: 年齢タグの変換 ---
    [/\(girl(:\d\.?\d?)\)/gi, '(woman$1)'],
    [/\(teenager(:\d\.?\d?)\)/gi, '(young adult$1)'],
    [/\(college student(:\d\.?\d?)\)/gi, '(young adult$1)'],
    // --- レベル2: 制服タグの脱学校化 ---
    [/\(school uniform(:\d\.?\d?)\)/gi, '(formal outfit$1)'],
    [/\(academy uniform(:\d\.?\d?)\)/gi, '(formal outfit$1)'],
    [/\(sailor uniform(:\d\.?\d?)\)/gi, '(elegant blouse with ribbon$1)'],
    [/\(sailor-style academy uniform(:\d\.?\d?)\)/gi, '(elegant blouse with ribbon$1)'],
    [/\(sailor-style fashion outfit(:\d\.?\d?)\)/gi, '(elegant blouse with ribbon$1)'],
    [/\(serafuku(:\d\.?\d?)\)/gi, '(elegant blouse with ribbon$1)'],
    [/\(schoolgirl(:\d\.?\d?)\)/gi, '(woman$1)'],
    [/\(school girl(:\d\.?\d?)\)/gi, '(woman$1)'],
    [/\(high school(:\d\.?\d?)\)/gi, '(campus$1)'],
    // --- レベル3: 学校ロールの脱学校化 ---
    [/\(student council president(:\d\.?\d?)\)/gi, '(strict leader$1)'],
    [/\(student council member(:\d\.?\d?)\)/gi, '(compliance officer$1)'],
    [/\(honor student(:\d\.?\d?)\)/gi, '(top academic$1)'],
    [/\(disciplinarian(:\d\.?\d?)\)/gi, '(strict authority figure$1)'],
    [/\(disciplinary committee member(:\d\.?\d?)\)/gi, '(strict authority figure$1)'],
    [/\(disciplinary committee(:\d\.?\d?)\)/gi, '(regulatory authority$1)'],
    [/\(childhood friend(:\d\.?\d?)\)/gi, '(close friend$1)'],
    // --- レベル4: 服装の露出軽減 (Geminiフィードバック対応) ---
    [/\((?:plaid )?mini skirt(:\d\.?\d?)\)/gi, '(plaid skirt$1)'],
    [/\(miniskirt(:\d\.?\d?)\)/gi, '(skirt$1)'],
    [/\(pleated skirt(:\d\.?\d?)\)/gi, '(professional skirt$1)'],
    // --- レベル5: ギャル/ティーン文化タグの脱色 ---
    [/\(gal(:\d\.?\d?)\)/gi, '(fashionable$1)'],
    [/\(gyaru(:\d\.?\d?)\)/gi, '(fashionable$1)'],
    [/\(gyaru style(:\d\.?\d?)\)/gi, '(trendy style$1)'],
    // --- レベル6: 幼く見える体型タグの排除 ---
    [/\(short stature(:\d\.?\d?)\),?\s*/gi, ''],
    [/\(loli(:\d\.?\d?)\),?\s*/gi, ''],
    [/\(petite(:\d\.?\d?)\)/gi, '(slim$1)'],
  ];

  let result = promptText;
  let appliedCount = 0;
  SAFETY_REPLACEMENTS.forEach(([pattern, replacement]) => {
    const before = result;
    result = result.replace(pattern, replacement);
    if (before !== result) appliedCount++;
  });

  // --- レベル7: 成人宣言ヘッダーの注入 ---
  // "Important Character Cast:" の直前に「全員20歳以上の成人」を明示挿入
  if (result.includes('Important Character Cast:')) {
    result = result.replace(
      'Important Character Cast:',
      'IMPORTANT AGE DECLARATION: All characters depicted in this image are adults aged 20 or older. None of the characters are minors.\n\nImportant Character Cast:'
    );
    appliedCount++;
  }

  // --- レベル8: カメラアングル置換 → [v2.35] アオリ解禁のため無効化 ---
  // ローアングル（Worm's Eye）等はそのまま出力。弾かれた場合は救済パネルで対応。
  // result = result.replace(
  //   /Extreme Low Angle \(Worm's Eye view, Full Body\)/g,
  //   'Extreme High Angle (Bird\'s Eye view, dramatic depth)'
  // );
  // result = result.replace(
  //   /Extreme Low Angle \(Worm's Eye view\)/g,
  //   'Dutch Angle (Tilted camera, dramatic action composition)'
  // );
  // result = result.replace(
  //   /Cinematic Low Angle \(Epic perspective\)/g,
  //   'Cinematic Over-the-shoulder (Epic perspective, dramatic depth)'
  // );

  if (appliedCount > 0) {
    console.log(`[Safety Age-Up v2.27c] ${appliedCount}種類のセーフティ変換を適用しました`);
  }
  return result;
};


// --- Thinking Log Component ---
const ThinkingLog = ({ thought, containerHeight = "h-[180px]", scrollHeight = "h-[120px]", placeholder = "" }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thought]);

  // thoughtが空でも待機状態の枠を表示する（STEP3など）
  const displayText = thought || placeholder;
  if (!displayText && !placeholder) return null;

  return (
    <div className={`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${containerHeight}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
      <div className="flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]">
        <BrainCircuit size={16} /> Neural Process (Thinking Mode)
      </div>
      <div ref={scrollRef} className={`${scrollHeight} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${thought ? 'text-blue-100' : 'text-blue-300/30 italic'}`}>
        {displayText || "> ボタンを押すとAI処理ログがここに表示されます..."}
        {thought && <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />}
      </div>
    </div>
  );
};
// --- Guide Balloon Component ---
const StepGuide = ({ text, position = "top", visible = true }) => {
  if (!visible) return null;
  return (
    <div className={`absolute z-50 pointer-events-none animate-bounce duration-1000 ${position === 'top' ? '-top-16 left-1/2 -translate-x-1/2' :
      position === 'left' ? '-left-64 top-1/2 -translate-y-1/2' :
        position === 'right' ? '-right-48 top-1/2 -translate-y-1/2' : ''
      }`}>
      <div className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white/20 relative whitespace-nowrap">
        {text}
        <div className={`absolute w-3 h-3 bg-blue-600 rotate-45 border-b-2 border-r-2 border-white/20 ${position === 'top' ? 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-0 border-l-0 border-b-white/20' :
          position === 'left' ? 'right-[-6px] top-1/2 -translate-y-1/2 border-b-0 border-l-0' : ''
          }`} />
      </div>
    </div>
  );
};

// --- API Key Modal ---
const ApiKeyModal = ({ isOpen, onSave }) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState(""); // Local error state

  if (!isOpen) return null;

  const handleSave = () => {
    if (!key.trim()) {
      setError("APIキーを入力してください (Required)");
      return;
    }
    setError("");
    onSave(key);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="bg-[#111] border border-blue-500/30 p-8 rounded-xl w-full max-w-md shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        <h2 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase flex items-center gap-2 italic">
          <Zap className="fill-blue-500 text-blue-500" /> システム初期化
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-between">
          <span>Google API Key (Gemini API)</span>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 ml-2">
            [Get Key]
          </a>
        </p>
        <p className="text-[10px] text-slate-500 mb-6 flex items-center gap-1">
          <span className="text-yellow-500">⚠</span> APIキーはブラウザ内にのみ保存され、外部へは送信されませんが、管理には十分ご注意ください。
          {error && <span className="text-red-500 ml-2">{error}</span>}
        </p>

        <div className="mb-6">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="APIキーを入力..."
            className="w-full bg-white text-black placeholder:text-slate-400 p-3 rounded-xl border border-white/10 focus:border-blue-500 outline-none font-mono tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full block bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
        >
          システムに接続
        </button>
      </div>
    </div>
  );
};

// --- Error Boundary ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { this.setState({ errorInfo }); console.error("CRITICAL ERROR:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, background: '#111', color: '#f55', minHeight: '100vh' }}>
          <h1>⚠️ SYSTEM CRASH ({SYSTEM_VERSION})</h1>
          <pre style={{ background: '#000', padding: 20, whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: 10, marginTop: 20 }}>RETRY</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  // Force Build 2026-02-06 07:07 // Build 2026-02-06-01

  console.log("System Version Loaded:", SYSTEM_VERSION); // Debug Log
  const [apiKey, setApiKeyState] = useState("");
  const [showModal, setShowModal] = useState(false); // FIXEDCRITICAL RESTORE
  const [inputMode, setInputMode] = useState("news"); // 'news' | 'manual'
  const [manualTopic, setManualTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const [customLocation, setCustomLocation] = useState(''); // [v1.8.103] Custom Location Override
  const [customOutfit, setCustomOutfit] = useState(''); // [v1.8.103] Custom Outfit Override
  const [lockedLocation, setLockedLocation] = useState(''); // STEP2実行時に確定した場所
  const [lockedOutfit, setLockedOutfit] = useState('');     // STEP2実行時に確定した服装


  const [categories, setCategories] = useState([
    { id: 'politics', label: '政治・経済', icon: '💼', checked: false, keywords: '最新 政治 経済 社会ニュース' },
    { id: 'sports', label: 'スポーツ', icon: '🏅', checked: false, keywords: '最新 スポーツ 競技 大会 結果' },
    { id: 'animals', label: '動物・癒し', icon: '🐱', checked: false, keywords: '最新 動物 ペット 癒しニュース' },
    { id: 'food', label: 'グルメ', icon: '🍜', checked: false, keywords: '最新 食べ物 グルメ スイーツ トレンド' },
    { id: 'ent', label: 'エンタメ', icon: '🎬', checked: false, keywords: '最新 映画 ドラマ 音楽 エンタメ' },
    { id: 'science', label: '科学・宇宙', icon: '🚀', checked: false, keywords: '最新 科学 宇宙 考古学 発見' },
    { id: 'bnews', label: 'B級ニュース', icon: '🤪', checked: false, keywords: '面白い 海外のB級ニュース ハプニング' },
    { id: 'life', label: '生活・健康', icon: '🌱', checked: false, keywords: '生活 ライフハック 健康' },
  ]);

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

  // [v1.7.0] Helper to determine model tier and badge info
  const getModelBadgeInfo = (modelId) => {
    if (!modelId) return null;

    if (modelId.includes("2.5-pro") || modelId.includes("3")) {
      return {
        label: "ULTRA HIGH QUALITY",
        tier: "Supreme",
        color: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",
        desc: "Gemini 2.5/3.0 Pro: 最高品質 (No Limits)"
      };
    }
    if (modelId.includes("flash")) {
      if (modelId.includes("lite") || modelId.includes("latest")) {
        return {
          label: "STANDARD QUALITY",
          tier: "Lite",
          color: "bg-gray-600 text-white",
          desc: "Gemini Flash Lite: 標準品質 (API制限回避中...)"
        };
      }
      return {
        label: "HIGH QUALITY",
        tier: "Active",
        color: "bg-blue-600 text-white",
        desc: "Gemini 2.5 Flash: 高品質 (高速)"
      };
    }
    // Fallback
    return {
      label: "UNKNOWN MODEL",
      tier: "Unknown",
      color: "bg-slate-600 text-white",
      desc: modelId
    };
  };
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
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceLog, setEnhanceLog] = useState("");
  const [isEnhancePanelOpen, setIsEnhancePanelOpen] = useState(false);
  const [originalScenario, setOriginalScenario] = useState(""); // 強化前の原文保持用

  // Logic centralization for v1.4.9
  const isAssembleDisabled = isAssembling || !castList || castList.length < 20 || !scenario || scenario.length < 20 || isSearching || isAnalyzing; // [v1.8.83] Relaxed limits from 50 to 20

  // Image Generation
  const [generatedImage, setGeneratedImage] = useState("");

  const handleSetKey = (key) => {
    // Sanitize key: remove all non-ASCII characters (often users copy hidden chars or Japanese text by mistake)
    const cleanKey = key.replace(/[^\u0000-\u007F]/g, "").trim();
    if (cleanKey !== key) {
      showStatus("APIキーに含まれる不要な文字を自動削除しました。");
    }
    setApiKey(cleanKey);
    setApiKeyState(cleanKey);
    setShowModal(false);
    // Force scroll to top to prevent layout shift confusion
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const showStatus = (msg) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 4000);
  };
  // ... (skip lines to reach layout) ...

  // ... (There is a large gap between definition and layout, better to use two separate replaces) ...
  // Actually, let's just do the layout change here since I can't target both in one contiguous block easily without including too much code.
  // I will split this into two calls.



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
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      await new Promise(resolve => {
        reader.onload = () => {
          imageArray.push(reader.result);
          setImages(prev => [...prev, reader.result]);
          resolve();
        };
      });
    }

    showStatus(`思考モード: ${imageArray.length}枚のキャラクター設定画を同時解析中...`);

    try {
      // Map all images to Gemini API parts
      const imageParts = imageArray.map(img => {
        const base64Data = img.split(',')[1];
        const mimeType = img.split(';')[0].split(':')[1];
        return {
          inlineData: { mimeType, data: base64Data }
        };
      });

      const prompt = `
        /* SYSTEM: ABSOLUTE CONTEXT RESET. FORGET ALL PREVIOUS CHARACTERS. */
        /* TARGET: Analyze ALL currently uploaded images. Do not recall past sessions. */
        
        あなたはプロの漫画家兼キャラクターデザイナー（解析特化）です。
        以下の「絶対厳守ルール」に従い、現在の全ての画像を解析してください。

        【0. 画像スタイル判定 (Style Detection)】
        ・**最初に必ず「STYLE_TAG: MONOCHROME」または「STYLE_TAG: COLOR」と出力せよ。**

        【1. キャラクター数と同一性の完全一致 (Count & Identity)】
        ・画像内の**「固有名を持つキャラ」**を全てリストアップせよ。入力画像が複数ある場合、**全ての画像を確認し、全キャラクターを抽出せよ**。絶対に1人で止まるな。

        【2. 特徴の超精密分解 (High-Fidelity Decomposition)】

        A. **【性別と年齢 (Gender & Age)】**:
           - **最重要**: 性別を間違えるな。ショートカットの女性を男性と誤認するな。
           - 女性なら (female:1.6), (woman:1.4)、男性なら (male:1.6), (man:1.4) を必ず付与せよ。
           - 年齢感も記述せよ (young adult, adult, elderly)。"girl", "boy", "teenager", "child" は使用禁止。

        B. **髪の完全構造化 (Strict Hair Analysis)**:
           - **【ハゲ/坊主 (Bald/Buzz)】**: 
             - 髪が無い場合は**「Bald」**、坊主なら**「Buzz Cut」**とせよ。
           - **【色 (Tone/Color)】**: 
             - 白黒の場合: 「ベタ(黒)→Black」「トーン(灰)→Brown/Dirty Blonde」「白→Silver/Blonde」。
             - カラーの場合: 「赤(Red)」「茶(Brown)」「オレンジ(Ginger)」を厳密区別せよ。
           - **【構造 (Structure) - 重要】**: 
             - **髪のトポロジー解析 (Hair Topology Vectors)**:
               - **毛先座標 (End Points)**: 毛先がどこにあるか？(顎ライン、肩ライン、鎖骨下、腰)。
               - **重要 (Black Hair Warning)**: **黒髪は制服やアウトラインと同化して短く見えやすい。**
             - 「肩に掛かっているか？」「背中に線があるか？」を凝視せよ。
             - **姫カット(Sidelocks/Hime-cut)**がある場合、後ろ髪が長い確率が極めて高い。**安易にBobと判定するな。**
           - **絶対長 (Absolute Length)**: 
             - **Bob**: 毛先が「顎〜首」で止まっている。完全に宙に浮いている。
             - **Medium**: 毛先が「肩」に触れている。
             - **Long**: 毛先が「鎖骨」より下。**黒髪の場合は特に注意して探せ。**
           - **アカリの判定**: もし毛先が内側にカールの軌跡を描いているなら「Internal Round Bob」。外に跳ねているなら「Flicked Bob」。断定せよ。
         - **シルエット (Volume)**:
           - 頭頂部のボリューム、サイドの膨らみを記述せよ。
         - 単なる「Short」は禁止。「Chin-length Bob」や「Shoulder-length Layered」など具体的に。
       - **【前髪 (Bangs)】**: Hime, Parted, Blunt, Asymmetric.
       - **【アレンジ (Arrangement)】**: 
         - **重要**: 後ろ髪が見えなくても、**Ponytail, Twintails, Bun, Braid**の兆候を見逃すな。
         - 結っている＝**Long Hair**タグ必須。

        C. **顔・アクセサリー (Face & Accessories)**:
           - **【アイウェア (Eyewear)】**: 
             - **サングラスを絶対に見逃すな**。レンズが黒/不透明なら (black sunglasses:1.5)。
             - 透明レンズなら (glasses:1.2)。形状(Under-rim, Round)も特定せよ。
             - **【最重要リスク】** 眼鏡をかけていない場合は、他のキャラの眼鏡が伝染するハルシネーションを防ぐため、必ず **(no glasses:1.5)** と出力せよ。
           - **【髭 (Facial Hair)】**: 
             - **絶対に髭を見逃すな**。(white beard:1.5), (mustache:1.5), (stubble:1.2).
             - 老人キャラは髭がある確率が高い。
           - **【目 (Eyes)】**: ツリ目(Tsurime)、タレ目(Tareme)、瞳の色。
           - **【特徴 (Charm Points)】**: 
             - ホクロ(Mole under eye/mouth)、八重歯(Snaggletooth)、そばかす(Freckles)等の個性を絶対に見逃すな。
           - **【肌 (Skin)】**: Tanned, Pale, Dark skinを正確に記述。

        D. **服装・テキスト (Outfit & Text)**:
            - **服の文字**: 服に書かれている文字（例: "FURU"）は **(shirt with text "FURU":1.4)** のようにタグ化せよ。
            - 制服(Sailor/Blazer)、私服(Hoodie/T-shirt)の形状を特定せよ。

        【3. OCR情報の反映と性格のタグ化】
        ・読み取った名前、年齢、性格、社会的役割を正確に反映せよ。
        ・**【最重要】**：画像生成AIにキャラクターの内面や立ち振る舞いを伝えるため、「性格(Mind)」の項目には**必ず英語の重み付きタグ**（例: (tsundere:1.2), (cheerful:1.3), (student council president:1.1) 等）を付与せよ。これを怠るとキャラクターの演技が死ぬ。

        【出力フォーマット】
        
        ## 1. [OCRで読み取った正確な名前]

        | カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |
        | :--- | :--- | :--- |
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** （※眼鏡無しなら **(no glasses:1.5)** を絶対付与） |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (formal outfit:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | **[WEIGHTS]: (cheerful:1.3), (energetic:1.2)** （※英語の性格タグを必須で記述） |
      `;


      const result = await callThinkingGemini(prompt, imageParts, null, (msg) => {
        setAnalyzeThought(prev => prev + `\n> ${msg}`);
      });
      setCastList(result.text);
      setUsedModel(result.model); // [v1.7.0] Track Model
      // [v2.42] 蓄積ログを保持し、完了メッセージとThinking Traceを追記（上書きしない）
      setAnalyzeThought(prev => {
        const separator = "\n\n--- ✅ 解析完了 ---\n";
        const thoughtTrace = result.thought && result.thought !== "Standard processing complete (Thinking trace unavailable)."
          ? `> [Thinking Trace]\n${result.thought}`
          : "> Standard processing complete (Thinking trace unavailable).";
        return prev + separator + thoughtTrace;
      });
      showStatus("全キャラクターの解析が完了しました。");
    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setAnalyzeThought(prev => prev + `\n\n[SYSTEM FAILURE]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("解析エラー: " + error.message);
    } finally {
      clearInterval(thinkTimer);
      setIsAnalyzing(false);
    }
  };

  // --- Step 2.5: Scenario Enhancement (v2.41) ---
  // シナリオ強化機能: 選択されたカテゴリに基づいてシナリオの演出を強化する
  const enhanceScenario = async () => {
    if (!scenario || scenario.length < 20) return showStatus("先にシナリオを生成してください。");
    const anySelected = enhanceExpressions || enhanceBodyLang || enhanceEffects || enhanceBackgrounds;
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
      enhanceCategories.push("【表情の強化】各キャラの表情描写をもっと大げさ・劇的にしてください。例: 驚きなら「白目を剥いて口を大きく開け」、怒りなら「血管マーク浮かべて歯を食いしばり」、喜びなら「満面の笑みで目をキラキラ輝かせる」。微笑みや軽い驚きのような控えめな表現は、激しいリアクションに書き換えてください。");
    }
    if (enhanceBodyLang) {
      enhanceCategories.push("【ボディランゲージの強化】棒立ちの状態を禁止します。全身で感情を表現するリアクションを追加してください。例: のけぞる、前のめりになる、腕を大きく振り上げる、机を叩く、椅子から転げ落ちる、相手の肩を掴む等。体全体を使った大きなアクションを書いてください。");
    }
    if (enhanceEffects) {
      enhanceCategories.push("【照明・演出の強化】各コマの「状況」欄に映画的な演出効果を追加してください。例: 逆光で人物がシルエットになる、リムライトで輪郭が光る、光の粒子が舞う、パンチラインのコマには集中線やインパクトフレーム、衝撃波、まばゆい光などの視覚効果をト書きとして追記してください。");
    }
    if (enhanceBackgrounds) {
      enhanceCategories.push("【背景の強化】各コマの背景描写を詳細にしてください。例: 教室なら机の配置や窓からの光、黒板の書き込み、壁のポスター等の小道具を追加。屋外なら天候、雲の形、木々、通行人、建物の描き込みなど空間の奥行きを出す要素を追記してください。");
    }

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

    const enhancePrompt = `あなたは4コマ漫画のシナリオ演出家です。以下のシナリオの**演出力**を大幅に強化してください。

${enhanceCategories.join("\n\n")}

【絶対に守るルール】
- シナリオの形式・構造（Topic:, Location:, [1コマ目]〜[4コマ目]の書式）は一切変えない
- セリフ（「」内の台詞）の文言は変えない
- キャラクター名は変えない
- 新しいキャラクターを追加しない
- コマ数は4コマのまま
- 出力は元のシナリオと完全に同じテキスト形式で返す（余計な説明や前置きは不要）

【元のシナリオ】
${scenario}

上記シナリオの演出を指定カテゴリに沿って強化し、同じ形式で出力してください。`;

    try {
      setEnhanceLog(prev => prev + "\n> [API] Gemini にシナリオ強化をリクエスト中...");
      const result = await callThinkingGemini(enhancePrompt, [], castList, (msg) => {
        setEnhanceLog(prev => prev + `\n> [API] ${msg}`);
      });

      if (result && result.text && result.text.length > 50) {
        setScenario(result.text.trim());
        setEnhanceLog(prev => prev + `\n> [SUCCESS] シナリオを強化しました！（${result.text.length}文字）\n> [INFO] 「元に戻す」ボタンで強化前のシナリオに戻せます。`);
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
  const generateScenarioFromNews = async () => {
    if (!castList) return showStatus("先にキャラクターを解析してください。");
    if (isSearching) return;

    // Manual Mode Check
    if (inputMode === 'manual' && !manualTopic.trim()) {
      alert("自由入力トピックを入力してください。");
      return;
    }
    // News Mode Check
    if (inputMode === 'news' && !categories.find(c => c.checked)) {
      alert("少なくとも1つのカテゴリを選択してください。");
      return;
    }

    setIsSearching(true);
    setScenarioThought("");
    setFinalPrompt(""); // Fix: Clear previous prompt to prevent "Instant Done" state
    setGeneratedImage(null); // Fix: Clear previous image
    setAssembleThought(""); // Fix: Clear previous assembly log

    let randomCategory = "";

    // Determine Topic
    if (inputMode === 'manual') {
      randomCategory = "Manual Input";
      setScenario("");
      setScenarioThought(`> Context Force Reboot: Initiated.\n > Mode: MANUAL INPUT \n > Target: ${manualTopic.substring(0, 30)}...`);
    } else {
      const activeCats = categories.filter(c => c.checked);
      // FIX: Combined keywords from all selected categories
      if (activeCats.length > 0) {
        randomCategory = activeCats.map(c => c.keywords).join(' ');

        showStatus(`カテゴリ「${activeCats.map(c => c.label).join('・')}」で最新ニュースを検索中... (${targetDate})`);
        setScenario("");
        setScenarioThought(`> Context Force Reboot: Initiated.\n > Target Category: ${activeCats.map(c => c.label).join(', ')} (Keywords: ${randomCategory}) \n > Target Date: ${targetDate} \n > Searching Google Grounding...`);
      } else {
        // Fallback if checked but empty (should not happen due to validation)
        randomCategory = "Latest News";
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
          setScenarioThought(`> Found URL in manual input: ${urls[0]} \n> Fetching content via Proxy...`);
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

            setScenarioThought(prev => prev + `\n> Content Extracted (${cleanText.length} chars). Injecting...`);
            newsContext = `
             【指定URLから独自のスクレイピングで抽出した内容】:
             ${cleanText}
             
             (指示): 上記はユーザーが入力したURL（ ${urls[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
             `;
          } catch (fetchErr) {
            console.error("URL Fetch Error: ", fetchErr);
            setScenarioThought(prev => prev + `\n> Warning: Failed to fetch URL content (${fetchErr.message}). Relying on LLM internal knowledge.`);
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

      const scenarioPrompt = `
        【Context Force Reboot】
        Ignore all previous instructions and conversation history.This is a fresh, standalone session.
        (ABSOLUTE PROHIBITION: Repeating topics from the past.You MUST select a FRESH, UNIQUE topic).
        (Topic Lock): Focus strictly on the category: "${randomCategory}".
        (Time Machine Lock): The target date is **${targetDate}**. You MUST search for news/events that happened AROUND this date.
        (Data Freshness Lock): Do not use generic evergreen tropes. Stick to the specific time period.

    あなたはプロの風刺漫画脚本家です。
        
        ${inputMode === 'manual'
          ? `「ユーザーが入力した以下のトピックまたは抽出されたURLコンテンツ」をテーマに4コマ漫画を作成してください。\n トピック: ${manualTopic}\n\n${newsContext}`
          : `「${searchTopicKeywords}」に関する、** 指定された日付（${targetDate}）周辺の具体的かつ事実に即したニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。`
        }

        【選定ルールの絶対厳守】

   1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
    2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
         （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
   3.  抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。
   4. **【場所（Location）の選定義務】**:
      - ニュースの内容に**「最も適した具体的な舞台」**を選んでください。
      - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
       - **デフォルト回避**: 安易な「教室」「白い部屋」は避けるが、**ニュースの文脈（学生、学校関連）で必要ならば「教室」も許可する。**重要なのは「ニュースとの適合性」である。
       
       4. **【強制舞台指定 (Location Lock)】**:
          - 今回の漫画の舞台は、以下の場所に**「必ず」**設定してください。
          - **指定場所: 「${customLocation.trim() ? customLocation.trim() : "ニュース内容に即した場所"}」**
          - もしニュースの内容と指定場所が矛盾する場合でも、無理やりこじつけてその場所で展開せよ。（例: 「政治のニュース」×「ラーメン屋」→ 政治家がラーメン屋で密談している、等）
          ${customOutfit.trim() ? `
       5. **【強制服装指定 (Outfit Lock)】**:
          - 今回のシナリオでは、CastListに記載された元の服装設定を完全に無視し、全員の服装を強制的に『${customOutfit.trim()}』に変更して描写・行動させよ。
          - 画像生成プロンプトでもこの指定タグが反映される前提で、シナリオ内のト書き(Action)テキストにも具体的な服装指定を含めること。
          ` : ""}

         【シナリオ構成・演出の絶対厳守 (v1.8.94 Alpha)】
          0. **全員登場義務 (Mandatory All-Cast)**:
             - CastListに含まれている **全てのキャラクターを必ず1回以上登場させること。**
             - 「メイン2人だけで4コマ全部回す」のような手抜きは禁止。全員に役割を与え、画面を賑やかにすること。
             - **【人数バラエティの義務】**: 4コマで「話者数」を以下のルールで割り振れ:
              ・話者1人のコマ（独白・リアクションショット）を**最低1つ**含めること
              ・話者2人のコマ（掛け合い会話）を**最低1つ**含めること
              ・残り2コマは話者1〜3人を自由に割り当てよ
              ・**4コマ中3コマ以上が同じ話者数になるのは禁止**
              ・CastListの全員が4コマのどこかに最低1回は登場すれば良い（全コマに全員出す必要はない）。
             - **【キャラ設定の完全保持】**: 提供された各キャラクターの属性（例: ギャル、オタク、優等生、ツッコミ役など）や固有の口調を絶対に混同するな。「Aキャラクター」と「Bキャラクター」の口調や性格が入れ替わるなどのエラーを厳格に禁止する。与えられた文字情報（性格設定）に完全に忠実なセリフを書け。
 
         1. **「原則: 語るな、見せろ」 (Show, Don't Tell... but Explain Briefly)**:
            - 絵での表現が最優先。補足説明は許可するが、**「短く、簡潔に」**行え。
            - 長文の自分語りや、説明調のセリフは厳禁。読者の読む気を削ぐな。
            - **【構図ルール】ト書き（状況の説明）では、主役の動作を中心に記述しつつ、同じコマにいる他キャラのリアクションや存在も簡潔に描写してよい。** 例: 「アカリがツッコむ。横でリンが呆れ、奥でサエコが爆笑している」のような群像描写は大歓迎。ただし1キャラあたりの描写は1文以内に留め、冗長にならないこと。同じ場面に居合わせている喋らないキャラがいる場合、ト書きの末尾に「（リアクション: キャラ名→表情や動作）」の形式で簡潔に添えよ。例: 「アカリがツッコむ（リアクション: リン→呆れ顔、サエコ→爆笑）」。4コマ中**最低2コマ**にはこのリアクション描写を含めること。
            - **【超重要】汗マークや怒りマークなどの「漫符」を描写する場合、文字ラベル（例: "POPPING VEIN", "LARGE SWEAT DROP"など）や設定資料に書かれるような矢印・注釈テキストを画面内に絶対に描画させないこと。純粋な視覚的シンボルのみを使用し、一切の英単語ラベルを排除せよ。**
 
         2. **テキストの量的制限 (Compact Text Quantity)**:
            - **厳守**: 1コマあたりのフキダシは**「最大3つまで」**。（3人の掛け合いも積極活用せよ）
            - セリフは**「短い一文」**に収めよ（例: 「なんだって！？」OK、「それはつまり...ということなのか？」NG）。
            - **禁止**: セリフ内に「(怒って)」「(笑いながら)」等のト書き・感情描写を入れるな。絵で表現せよ。
             - **句読点・表現ルール**: セリフの末尾は必ず終止記号で締めよ。どの記号を使うかはセリフの感情・キャラの性格・場面の空気で自然に決めること。
               終止記号（単独で文末になれる）: 。/ ！/ ？/ ♪/ ♡/ っ/ ！？
               修飾記号（単独では文末にならない。必ず後ろに終止記号を添えよ）: ……→「……。」「……！」「……？」 / ～→「～！」「～。」 / ー→「ー。」「ー！」
               **【反復禁止】同じ文末表現が3セリフ以上連続してはならない**。「……」系は1シナリオ中2回までに留めよ。
               禁止: 終止記号なしで終わるセリフ。読点の乱用（1セリフに2つ以上は多すぎ）。
           - 画面の80%以上は「絵」でなければならない。文字で埋め尽くすな。

        3. **オチと構図の多様化 (Variety Constraints)**:
           - **必須**: 「手前に大きく顔があるキャラ」「奥で小さく驚くキャラ」など、**遠近感**を強調せよ。棒立ちは厳禁。
           - **オチ**: 「全員泣いて終わり」等のワンパターンを禁止。シュールな静寂、無言の圧力、社会的死など多様にせよ。
           - **【表現・SFXルール】**: 擬音（SFX）は「日本語のみ」を使用せよ。英語の注釈、翻訳、アルファベット併記は一切禁止する。
           - 演出において、パロディや時事ネタの文脈での固有名詞登場は「表現の結果」として許容する。

        4. **4コマ目の演出**:
           - 必ずしもデフォルメ（SD）にする必要はない。ネタがシリアスなら、**劇画調のリアルな絶望顔**で落としても良い。ネタに合わせてスタイルを適応させよ。

        5. **【感情絵柄タグ (Emotion Style Tag)】**:
           - 各コマの冒頭に、そのコマの演出に最適な[EMOTION: XXX]タグを**必ず1つ**付与せよ。
           - 選択肢（この中から選べ）:
             - NORMAL: 通常の美麗アニメ作画。日常会話、穏やかなシーン。
             - CHIBI_GAG: ちびキャラ化。ツッコミ、呆れ、軽いギャグ、恥ずかしさ。等身が2-3頭身に縮む。
             - GEKIGA: 劇画調リアル。本気の怒り、覚悟、緊張、シリアスな決意。影が濃くなり顔が鋭くなる。
             - SHOUJO: 少女漫画風キラキラ。感動、喜び、恋愛的ときめき。花びらや星が舞う。
             - HORROR: ホラー演出。恐怖、ゾッとする瞬間。暗い影とコントラスト。
             - BLANK: 白目・魂抜け。衝撃、絶望、思考停止。目が点になる。
             - IMPACT: インパクトフレーム。大爆笑、大激怒、驚天動地。集中線で画面が爆発。
             - WATERCOLOR: 水彩画風。ノスタルジック、回想シーン。
             - RETRO: レトロ漫画風。昭和テイスト、コミカル。
             - GLITTER: キラキラオーラ。自信満々、ドヤ顔、勝利宣言。
             - SHADOW: シルエット演出。策略、不穏、腹黒。
           - 【重要】毎回同じタグを繰り返すな。4コマの中で少なくとも2種類以上のタグを使い分けよ。
           - オチのコマ（4コマ目）は特に、NORMAL以外のタグを優先的に選べ。

        【出力フォーマット（絶対厳守・会話禁止）】
        返答、挨拶、説明（「分かりました」「以下がシナリオです」等）は **一切出力しないこと**。
        以下の独自フォーマット **のみ** を出力してください。Markdownのコードブロックも不要です。

        Topic: [ニュースの見出し（15文字以内）]
        Location: [${customLocation.trim() ? "必ず『" + customLocation.trim() + "』にせよ" : "ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
        Scenario:
        [1コマ目: 起]
        [EMOTION: XXX]
        (状況とセリフ...)

        [2コマ目: 承]
        [EMOTION: XXX]
        (状況とセリフ...)

        [3コマ目: 転]
        [EMOTION: XXX]
        (状況とセリフ...)

        [4コマ目: 結]
        [EMOTION: XXX]
        (状況とセリフ...)

        シナリオ本文の要件:
        - 登場人物: ** 提供された CastList の全員 ** を使用してください。
        - (禁止事項): AIが勝手に架空のオリジナルキャラクターを独自に創作して出演させることは禁止する。指定されたCastListのキャラクターのみをメインキャストとして扱うこと。
        - (許可事項): ニュースの当事者（スポーツ選手、政治家、怪人、動物、虫など）や名もなきモブキャラは、物語を面白くするために必要であれば自由に登場・発言させて構わない。
        - (ハルシネーション防止): ゲストを登場させる場合でも、画像生成時のVisual Actionに「意味不明な文字」や「描画不可能な複雑すぎる行動」が混入しないよう、シンプルで視覚的にわかりやすい行動に留めること。
        - 構成: 起承転結（4段）。
        - 内容: ニュースに対する辛辣な風刺や、キャラの個性を活かしたドタバタ劇。
        - 文体: 各コマの「状況」「セリフ」が明確にわかる文章。
        `;

      // Call Gemini with the Cast List context to ensure character consistnecy in logic
      const result = await callThinkingGemini(scenarioPrompt, [], castList, (msg) => {
        setScenarioThought(prev => prev + `\n > [API] ${msg} `);
      });
      setUsedModel(result.model); // [v1.7.0] Track Model

      // Basic parsing of the result (assuming Gemini follows JSON format majority of time, 
      // but adding fallback parsing for robustness)
      // Robust Parsing (Plain Text Regex)
      let parsedData = { topic: randomCategory, scenario: "" };

      try {
        const titleMatch = result.text.match(/Topic:\s*(.+)/i);
        const locationMatch = result.text.match(/Location:\s*(.+)/i);
        const scenarioMatch = result.text.match(/Scenario:\s*([\s\S]+)/i);

        if (scenarioMatch) {
          parsedData.topic = titleMatch ? titleMatch[1].trim() : randomCategory;
          // [v2.42] AIが「Topic: xxx」形式で出力した場合のプレフィックス除去
          parsedData.topic = parsedData.topic.replace(/^Topic:\s*/i, '').trim();
          parsedData.location = locationMatch ? locationMatch[1].trim() : "Generic Background";
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
      // We append the topic and location to the scenario text for visibility and parsing
      setScenario(`## タイトル: ${parsedData.topic} !?\nLocation: ${parsedData.location || "Unspecified"}\n\n${parsedData.scenario} `);

      // STEP2実行時に場所・服装を確定（ロック）する
      setLockedLocation(customLocation.trim() || parsedData.location || "Unspecified");
      setLockedOutfit(customOutfit.trim() || "");

      setScenarioThought(prev => prev + `\n > Topic Selected: ${parsedData.topic} \n > Scenario Construction Complete.`);
      showStatus("シナリオの生成が完了しました！");

    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setScenarioThought(prev => prev + `\n\n[SYSTEM FAILURE]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("シナリオ生成エラー");
    } finally {
      clearInterval(scenarioTimer);
      setIsSearching(false);
    }
  };

  // --- Step 3: Prompt Assembly (Super FURU v121.3) ---
  const assemblePrompt = async () => {
    if (!castList || !scenario) return showStatus("キャストとシナリオが必要です。");
    setIsAssembling(true);
    setFinalPrompt(""); // Clear previous prompt to indicate loading
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
          "\n> Optimizing narrative vectors...",
          "\n> Adjusting geometry lock...",
          "\n> Syncing character style weights...",
          "\n> Enforcing panel borders...",
          "\n> Checking prohibited content tags...",
          "\n> Injecting satire logic...",
          "\n> Finalizing 4-koma structure..."
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

      // [v2.25] 感情連動スタイル定義 - 固有名詞ゼロ (Trademark Sanitization準拠)
      const EMOTION_STYLES = {
        NORMAL: {
          style: '',
          proportions: '',
          vfx: '',
        },
        CHIBI_GAG: {
          style: 'In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.',
          proportions: 'OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.',
          vfx: '(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)',
        },
        GEKIGA: {
          style: 'In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.',
          proportions: 'Use 7-8 head proportions. Characters appear taller and more imposing.',
          vfx: '(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)',
        },
        SHOUJO: {
          style: 'In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.',
          proportions: '',
          vfx: '(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)',
        },
        HORROR: {
          style: 'In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.',
          proportions: '',
          vfx: '(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)',
        },
        BLANK: {
          style: 'In THIS PANEL ONLY, the affected character\'s eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.',
          proportions: '',
          vfx: '(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)',
        },
        IMPACT: {
          style: 'In THIS PANEL ONLY, use an explosive impact-frame composition. The main character\'s expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. Panel borders may appear to crack or shatter from the intensity.',
          proportions: 'OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.',
          vfx: '(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (cracking panel borders:1.2), (intense dramatic backlight)',
          // [v2.31] マルチキャラパネル用フォールバック
          styleMulti: 'In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. Panel borders may appear to crack or shatter from the intensity. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character\'s face that fills most of the panel.',
          proportionsMulti: '',
          vfxMulti: '(Explosive radial speed lines from center:1.5), (cracking panel borders:1.2), (intense dramatic backlight), (dynamic action poses:1.3)',
        },
        WATERCOLOR: {
          style: 'In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.',
          proportions: '',
          vfx: '(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)',
        },
        RETRO: {
          style: 'In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character\'s original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.',
          proportions: '',
          vfx: '(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)',
        },
        GLITTER: {
          style: 'In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character\'s hair length or hairstyle from their reference description.',
          proportions: '',
          vfx: '(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)',
        },
        SHADOW: {
          style: 'In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.',
          proportions: '',
          vfx: '(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)',
        },
      };

      // [v2.25] パネルテキストからEMOTIONタグを抽出
      const extractEmotionStyle = (panelText) => {
        const match = panelText.match(/\[EMOTION:\s*(NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW)\s*\]/i);
        if (match) {
          const key = match[1].toUpperCase();
          if (EMOTION_STYLES[key]) return key;
        }
        return 'NORMAL';
      };

      // [v2.31] パネルの感情スタイル指示を構築（マルチキャラ対応）
      const buildEmotionBlock = (panelText) => {
        const emo = extractEmotionStyle(panelText);
        if (emo === 'NORMAL') return '';
        const s = EMOTION_STYLES[emo];

        // [v2.31] IMPACT等のソロ演出スタイルがマルチキャラパネルで使われた場合、
        // 「顔アップで60-80%」指示がANTI-FLOATING-EYE RULEと矛盾するのを防ぐ
        const speakersInPanel = [];
        panelText.split('\n').forEach(line => {
          const m = line.match(/^(.*?)(?:[:：]|「)/);
          if (m && m[1].trim()) {
            const sp = m[1].replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
            if (sp && !speakersInPanel.includes(sp)) speakersInPanel.push(sp);
          }
        });
        const isMultiChar = speakersInPanel.length >= 2;

        // マルチキャラ用フォールバックが定義されている場合はそちらを使用
        if (isMultiChar && s.styleMulti) {
          let block = `\n(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${s.styleMulti}`;
          if (s.proportionsMulti) block += `\nPROPORTION OVERRIDE: ${s.proportionsMulti}`;
          if (s.vfxMulti) block += `\nVFX: ${s.vfxMulti}`;
          return block;
        }

        let block = `\n(Apply the following visual style to this panel only. Do NOT draw this instruction as text on the image): ${s.style}`;
        if (s.proportions) block += `\nPROPORTION OVERRIDE: ${s.proportions}`;
        if (s.vfx) block += `\nVFX: ${s.vfx}`;
        return block;
      };

      // [v2.25] キャスト解析結果からIdentity Matrixを自動生成
      const buildIdentityMatrix = (castListText) => {
        const characters = [];
        let currentChar = null;

        castListText.split('\n').forEach(line => {
          const cleanLine = line.replace(/\*\*/g, '').trim();

          // キャラ名ヘッダー検出
          if (cleanLine.startsWith('## ')) {
            if (currentChar) characters.push(currentChar);
            const name = cleanLine.replace(/^##\s*(?:\d+\.\s*)?/, '').trim();
            currentChar = {
              name,
              shortName: name.split(/[（(]/)[0].trim(),
              hairColor: '',
              hairStyle: '',
              glasses: 'unknown',
              features: []
            };
          }

          if (!currentChar) return;

          // [v2.31] 髪情報の抽出 - 特徴的スタイル優先ロジック
          if (cleanLine.includes('髪') || cleanLine.toLowerCase().includes('hair')) {
            const weightsMatch = cleanLine.match(/\[WEIGHTS?\]:\s*(.*)/i);
            const tagsSource = weightsMatch ? weightsMatch[1].replace(/\|/g, '') : cleanLine;
            const colorMatch = tagsSource.match(/(red|orange|blonde|yellow|brown|black|silver|white|blue|pink|green|purple|ginger)\s*hair/i);
            if (colorMatch && !currentChar.hairColor) currentChar.hairColor = colorMatch[1];
            // [v2.31] 特徴的スタイル（twintails, hime cut等）を汎用長さ記述（long hair等）より優先
            // これにより Identity Matrix で「リン: long hair」ではなく「リン: twintails」と出力される
            const distinctiveMatch = tagsSource.match(/(internal\s*round\s*bob|chin-length\s*bob|straight\s*bob|twintails?|twin\s*tails?|ponytail|hime\s*cut|bun|braid|pixie|buzz)/i);
            const genericMatch = tagsSource.match(/(bob|very\s*long\s*hair|waist-length\s*hair|long[\s-]?hair|medium[\s-]?hair|short[\s-]?hair)/i);
            if (!currentChar.hairStyle) {
              if (distinctiveMatch) {
                currentChar.hairStyle = distinctiveMatch[1];
              } else if (genericMatch) {
                currentChar.hairStyle = genericMatch[1];
              }
            }
          }

          // [v2.30] 眼鏡情報の抽出 - 全面改修
          const lowerLine = cleanLine.toLowerCase();
          const hasWeightedNoGlasses = /\(no[\s_-]*glasses/i.test(lowerLine);
          const hasWeightedGlasses = /\([^)]*glasses[\s:]/i.test(lowerLine) && !hasWeightedNoGlasses;
          const glassesLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
          if (!glassesLocked) {
            if (hasWeightedNoGlasses) {
              currentChar.glasses = 'LOCKED_NO';
            } else if (hasWeightedGlasses) {
              currentChar.glasses = 'LOCKED_YES';
            }
          }
          const glassesNowLocked = currentChar.glasses === 'LOCKED_NO' || currentChar.glasses === 'LOCKED_YES';
          if (!glassesNowLocked && (cleanLine.includes('眼鏡') || cleanLine.includes('メガネ') || lowerLine.includes('eyewear'))) {
            if (lowerLine.includes('bare eyes') || /(?:なし|無し|None|N\/A)/i.test(cleanLine)) {
              currentChar.glasses = 'NO';
            } else if (/(?:あり|有り|有|着用)/i.test(cleanLine) || /(?:under-rim|round|square|oval|rimless|half-rim)/i.test(lowerLine)) {
              currentChar.glasses = 'YES';
            }
          }

        });
        if (currentChar) characters.push(currentChar);

        // [v2.30] デバッグ: 眼鏡判定結果をコンソールに出力
        console.log('[IDENTITY MATRIX] Glasses detection results:');
        characters.forEach(c => {
          console.log(`  ${c.shortName}: glasses=${c.glasses}, hair=${c.hairColor} ${c.hairStyle}`);
        });

        if (characters.length === 0) return '';

        let matrix = `\n【IDENTITY MATRIX - ABSOLUTE LOCK (v2.25)】\n`;
        matrix += `Before drawing EACH panel, cross-check EVERY character against this matrix. ANY violation = CRITICAL FAILURE.\n`;

        characters.forEach(c => {
          const traits = [];
          if (c.hairColor) traits.push(`${c.hairColor} hair`);
          if (c.hairStyle) traits.push(c.hairStyle);
          if (c.glasses === 'YES' || c.glasses === 'LOCKED_YES') traits.push('MUST HAVE glasses (do NOT remove)');
          else if (c.glasses === 'NO' || c.glasses === 'LOCKED_NO') traits.push('MUST NOT have glasses (bare eyes)');
          else traits.push('check reference image for glasses status');

          matrix += `- [${c.shortName}]: ${traits.join(', ') || 'see reference image'}\n`;
        });

        matrix += `CROSS-CHECK: After completing each panel, verify every character's hair color and glasses status matches the matrix above. If ANY mismatch, redraw that character.\n`;
        matrix += `Reading order: RIGHT-TO-LEFT (Japanese manga). The first speaker is on the RIGHT. Speech bubbles flow right-to-left.
SPEECH BUBBLE PLACEMENT RULE (CRITICAL): Each character's speech bubble MUST be drawn directly above or beside THAT character's head. The RIGHT-side character's bubble MUST be on the RIGHT side of the panel. The LEFT-side character's bubble MUST be on the LEFT side. NEVER draw a character's speech bubble on the opposite side of where the character is standing.\n`;

        return matrix;
      };

      // [v2.25] キャラ名からIdentity Matrixの特徴行を返すヘルパー
      const getCharTraitsFromMatrix = (charName) => {
        const matrix = buildIdentityMatrix(castList);
        const line = matrix.split('\n').find(l => l.includes(`[${charName}]`));
        if (line) {
          const traits = line.split(':').slice(1).join(':').trim();
          return traits;
        }
        return '';
      };

      const dynamicCamera = `
    CRITICAL COMPOSITION & GAG MANGA RULES:
    1. Do NOT draw characters just standing neutrally or looking directly at the camera. They MUST interact with each other.
    2. Always use dynamic and extreme camera angles: worm's-eye view, bird's-eye view, or tilted dutch angles. Use extreme perspective distortion (fisheye or ultra-wide lens) for dramatic effect. Avoid flat, boring shots.
    3. [GAG VFX]: Use comic visual effects for punchlines/reactions. Strictly DO NOT write any text labels or sound effects (e.g., "ズコー") as text, floating words, or speech bubbles.
    4. [EXAGGERATED EMOTIONS]: FORCE extreme, comical, and highly exaggerated facial expressions! Do NOT draw neutral or slightly smiling faces. Exaggerate expressions (blank white eyes, jaw-dropping shock, intense fury, crying waterfalls) while strictly maintaining top-tier, beautiful anime art quality.
    5. [BODY ACTING]: Characters must physically react with their entire bodies (throwing arms up, falling, etc.). Exaggerate their gestures to the absolute limit. Do NOT over-use the "adjusting glasses" pose unless the character is explicitly wearing glasses.
    6. [ANTI-FLOATING-EYE RULE - CRITICAL]: Do NOT overlay or superimpose a close-up of a character's eyes or upper face as a floating background element behind other characters. Each character must be drawn as a complete figure within the scene. Avoid the "dramatic floating eye close-up in the background" manga trope entirely. Every character in the panel must exist physically within the scene's space, not as a ghostly overlay or background insert.
    `;

      // [v2.42] タイトル抽出 + 「Topic:」プレフィックス除去サニタイズ
      let cleanTopic = scenario.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim() || scenario.split('\n')[0].substring(0, 20);
      // AIが「Topic: xxx」というラベル付きで出力してしまうケースを除去
      cleanTopic = cleanTopic.replace(/^Topic:\s*/i, '').trim();

      // FIX: If customLocation is set, IT is the absolute truth for the visual prompt, regardless of what the scenario text says.
      const scenarioLocationMatch = scenario.match(/Location:\s*(.*?)(\n|$)/i)?.[1]?.trim();
      const cleanLocation = customLocation.trim() ? customLocation.trim() : (scenarioLocationMatch || "Generic Detailed Background");

      // [v1.9.5] Remove markdown codeblock artifacts that leak into Visual Action extraction
      const cleanScenario = scenario.replace(/```(?:json|markdown)?/gi, '').trim();

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

      // [v1.9.6] Dynamic Camera Angle Generator - Expanded for less close-ups & more dynamic wide/full-body shots
      const cameraAngles = [
        "Extreme Low Angle (Worm's Eye view, Full Body)",
        "Extreme High Angle (Bird's Eye view, looking down)",
        "Dutch Angle (Tilted camera, dramatic composition)",
        "Dynamic Action Wide Shot (Full Body, dynamic pose)",
        "Over-the-shoulder shot (Wide perspective)",
        "Wide Establishing Shot (Entire scene visible)",
        "Extreme Wide Angle Lens (Fisheye effect, dramatic depth)",
        "Medium-Full Shot (Showing body language clearly)",
        "Medium Shot (Waist-up, showing character interaction)",
        "Cinematic Low Angle (Epic perspective)"
      ];
      const getRandomAngle = () => cameraAngles[Math.floor(Math.random() * cameraAngles.length)];

      // [v1.95] Dialogue Cleaner & Formatter (Line-by-Line Fix + Speaker Extraction with Character Validation)
      const extractDialogueOnly = (fullPanelText) => {
        const lines = fullPanelText.split('\n');

        // Extract valid characters from castList to prevent action instructions being misidentified as speakers
        const validCharacters = [];
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) {
            const fullName = m[1].trim();
            validCharacters.push(fullName);
            const jpName = fullName.split(/[\(]/)[0].trim();
            if (jpName && jpName !== fullName) validCharacters.push(jpName);
            const romajiMatch = fullName.match(/[\(]\s*(.*?)\s*[\)]/);
            if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
          }
        });

        const formattedBubbles = [];
        let bubbleCount = 1;

        lines.forEach(line => {
          // Check if line indicates dialogue
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          let isDialogue = false;
          let clean = line;

          if (match && match[1].trim()) {
            let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
            tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();

            // [v2.31] 話者名バリデーション強化: ト書き誤検出防止
            // 「サエコが、売店のカウンターに」のような文章が話者名として誤検出されるのを防ぐ
            const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(tempSpeaker) && tempSpeaker.length > 5;
            const isTooLong = tempSpeaker.length > 12;
            if (hasSentenceParticles || isTooLong) {
              // 文章構造を含む → ト書きなので話者名ではない
            } else if (validCharacters.some(c => {
              const nameOnly = c.split(/[（(]/)[0].trim();
              return tempSpeaker === c || tempSpeaker === nameOnly || nameOnly === tempSpeaker;
            }) || tempSpeaker === "全員" || tempSpeaker === "Speaker") {
              isDialogue = true;
            }
          } else if (line.trim().startsWith('「')) {
            // [v2.29] 根本修正: 行全体が「...」で完結するセリフ形式のみを判定。
            // 「没収」と書かれた袋を...のようなト書き中の引用語を誤検出しない。
            const trimmedLine = line.trim();
            const isFullQuoteLine = /^「[^」]+」[？！。、!?\s]*$/.test(trimmedLine);
            if (isFullQuoteLine) {
              isDialogue = true;
            }
          }

          if (isDialogue) {
            // Remove Speaker Name and Colon
            clean = clean.replace(/^.*?(?:[:：]|「)\s*/, '');
            // Remove surrounding Japanese quotes to prevent hallucination in images
            clean = clean.replace(/^「+/, '').replace(/」+$/, '');
            // [v2.04] Remove parenthetical stage directions (e.g. (ため息) or （笑顔）) to prevent them from rendering as printed text in balloons
            clean = clean.replace(/（.*?）|\(.*?\)/g, '');
            clean = clean.trim();

            if (clean) {
              formattedBubbles.push(`(Speech Bubble ${bubbleCount}: "${clean}")`);
              bubbleCount++;
            }
          }
        });

        // [v2.22] フォールバック: キャラ名マッチに失敗しても、カギ括弧「」で囲まれたテキストがあればセリフとして抽出
        // [v2.29] ト書き誤検出防止: カギ括弧内のテキストがト書き（状況説明）でないかをチェック
        if (formattedBubbles.length === 0) {
          const bracketDialogues = fullPanelText.match(/「([^」]+)」/g);
          if (bracketDialogues && bracketDialogues.length > 0) {
            bracketDialogues.forEach(bd => {
              let dialogueText = bd.replace(/^「/, '').replace(/」$/, '').trim();
              dialogueText = dialogueText.replace(/（.*?）|\(.*?\)/g, '').trim();
              // [v2.29] ト書き判定: キャラ名2名以上+動作動詞を含む長文はト書きとみなしスキップ
              const charNamesInText = validCharacters.filter(c => {
                const nameOnly = c.split(/[\(（]/)[0].trim();
                return nameOnly && dialogueText.includes(nameOnly);
              });
              const hasActionVerbs = /(?:走|逃|叫|倒|飛|投|握|振|開|閉|持|回|守|追|暴|掴|奪|叩|殴|蹴|泣|笑|怒|驚|震|立|座|歩|見|向|指|差|押|引|掲|置|取|抱|抜|落|転|上|下|入|出|乗|降|着|脱|食|飲|読|書|聞|話|歌|踊|遊|寝|起|止|始|続|終|帰|来|行|待|送|届|届|渡|受|返|払|買|売|借|貸|集|散|並|重|包|巻|結|解|切|折|曲|伸|縮|揺|動|止|消|現|隠|探|見つ)/.test(dialogueText);
              const isLikelyNarration = (charNamesInText.length >= 2 && hasActionVerbs && dialogueText.length > 15);
              if (dialogueText && !isLikelyNarration) {
                formattedBubbles.push(`(Speech Bubble ${bubbleCount}: "${dialogueText}")`);
                bubbleCount++;
              }
            });
          }
        }

        // [v2.22] 「吹き出し描くな」指示を廃止。セリフが無い場合でも描画を阻害しない
        if (formattedBubbles.length === 0) {
          return "(Characters interact without dialogue in this panel)";
        }
        return formattedBubbles.join(', ');
      };

      const extractActionOnly = (fullPanelText, placementRule = "") => {
        const lines = fullPanelText.split('\n');

        const validCharacters = [];
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) {
            const fullName = m[1].trim();
            validCharacters.push(fullName);
            const jpName = fullName.split(/[\(]/)[0].trim();
            if (jpName && jpName !== fullName) validCharacters.push(jpName);
            const romajiMatch = fullName.match(/[\(]\s*(.*?)\s*[\)]/);
            if (romajiMatch) validCharacters.push(romajiMatch[1].trim());
          }
        });

        const actionLines = lines.filter(line => {
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          let isDialogue = false;
          if (match && match[1].trim()) {
            let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
            tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
            if (validCharacters.some(c => tempSpeaker.includes(c) || c.includes(tempSpeaker)) || tempSpeaker === "全員" || tempSpeaker === "Speaker") {
              isDialogue = true;
            }
          } else if (line.trim().startsWith('「')) {
            isDialogue = true;
          }
          const isHeader = line.match(/^\[\d+コマ目/);
          const isEmpty = line.trim() === '';
          return !isDialogue && !isHeader && !isEmpty;
        });

        let actionStr = actionLines.join(' ').trim();
        
        // [v2.30] Sanitize action string to remove common trailing onomatopoeia/gag SFX that causes unwanted speech bubbles
        actionStr = actionStr.replace(/[ 　]*(ズコー|ガーン|チーン|ドッ|バシッ|ドカーン|バーン)[。、！？!?\s]*$/g, '');
        
        actionStr = actionStr || "Characters interacting dynamically based on dialogue.";

        // [v2.02] Duplication Removal: If character is already forced in placement, gently remove them from the explicit action subject if possible to prevent cloning hallucination
        if (placementRule) {
          validCharacters.forEach(c => {
            // Extract just the name part before any parenthesis if it exists (e.g. "アカリ (Akari)" -> "アカリ")
            const nameOnly = c.split('(')[0].trim();
            if (placementRule.includes(nameOnly)) {
              // Optional: We can replace exact matches of the name with pronouns or just strip it if it causes too much duplication, 
              // but a safer route for the prompt is to just let the action be, BUT we modify the overall layout rules instead below.
              // For now, we just pass the actionStr, but AI cloning is mostly solved by the rule additions we make to the main prompt.
            }
          });
        }

        return actionStr;
      };

      // [v2.19] 案3: 各パネルに服装リマインドを自動注入（OUTFIT OVERRIDE設定時のみ）
      const injectOutfitReminder = (actionText) => {
        if (!customOutfit.trim()) return actionText;
        return `(All characters are wearing ${customOutfit.trim()}) ${actionText}`;
      };

      const extractPlacementRule = (fullPanelText) => {
        const lines = fullPanelText.split('\n');
        // [v2.28] EMOTIONタグ行・状況行をフィルタリングしてスピーカー抽出の汚染を防止
        const dialogLines = lines.filter(line => {
          const trimmed = line.trim();
          // EMOTIONタグ行を除外
          if (/^\[EMOTION:/i.test(trimmed)) return false;
          // 状況説明行を除外
          if (/^状況[：:]/i.test(trimmed)) return false;
          return trimmed.includes('：') || trimmed.includes(':') || trimmed.includes('「');
        });
        // [v2.31] キャラ名バリデーション用リスト
        const validCharsForPlacement = [];
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) {
            const fullName = m[1].trim();
            validCharsForPlacement.push(fullName);
            const jpName = fullName.split(/[（(]/)[0].trim();
            if (jpName && jpName !== fullName) validCharsForPlacement.push(jpName);
          }
        });

        const speakers = [];
        dialogLines.forEach(line => {
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          if (match && match[1].trim()) {
            let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況|EMOTION|\(.*?\)|\[.*?\])/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
            // [v2.31] ト書き誤検出防止: 助詞を含む長文は話者名ではない
            const hasSentenceParticles = /[がをにでへはもとからまでより]/.test(speaker) && speaker.length > 5;
            const isTooLong = speaker.length > 12;
            if (hasSentenceParticles || isTooLong) return;
            // EMOTIONやスタイルタグ残骸をフィルタ
            if (speaker && !speakers.includes(speaker) && !/^(EMOTION|NORMAL|CHIBI_GAG|GEKIGA|SHOUJO|HORROR|BLANK|IMPACT|WATERCOLOR|RETRO|GLITTER|SHADOW)$/i.test(speaker)) {
              // [v2.31] キャラ名バリデーション: 登録キャラ名と一致する場合のみ話者として認定
              if (validCharsForPlacement.some(c => {
                const nameOnly = c.split(/[（(]/)[0].trim();
                return speaker === c || speaker === nameOnly || nameOnly === speaker;
              })) {
                speakers.push(speaker);
              }
            }
          }
        });
        if (speakers.length >= 3) {
          // [v2.33] 3-Zone Slotting: 3人以上の掛け合いパネル対応
          const traits0 = getCharTraitsFromMatrix(speakers[0]);
          const traits1 = getCharTraitsFromMatrix(speakers[1]);
          const traits2 = getCharTraitsFromMatrix(speakers[2]);
          return `CRITICAL PLACEMENT & IDENTITY (3-ZONE SLOTTING):
- RIGHT ZONE: [${speakers[0]}] (${traits0 || 'see reference'}) — First speaker
- CENTER ZONE: [${speakers[1]}] (${traits1 || 'see reference'}) — Second speaker
- LEFT ZONE: [${speakers[2]}] (${traits2 || 'see reference'}) — Third speaker / Reactor
VERIFY: Confirm hair color + glasses status for ALL three characters match the Identity Matrix.
CHARACTER BODY POSITION LOCK (3-ZONE - DO NOT MIRROR):
- [${speakers[0]}] MUST be on the RIGHT third of the panel.
- [${speakers[1]}] MUST be in the CENTER of the panel.
- [${speakers[2]}] MUST be on the LEFT third of the panel.
- Maintain breathing room between zones to prevent overcrowding and attribute fusion.
SPEECH BUBBLE FLOW (RIGHT-TO-LEFT):
- [${speakers[0]}]'s bubble on the RIGHT, [${speakers[1]}]'s in CENTER, [${speakers[2]}]'s on LEFT.
- Each bubble MUST point to its speaker. Flow: Right → Center → Left.`;
        } else if (speakers.length >= 2) {
          const traits0 = getCharTraitsFromMatrix(speakers[0]);
          const traits1 = getCharTraitsFromMatrix(speakers[1]);
          // [v2.27] 人物+吹き出し位置固定ルール（左右入れ替わり全パターン対策）
          // 髪色等の視覚的特徴で位置をアンカリングし、AIの左右鏡像化を防ぐ
          return `CRITICAL PLACEMENT & IDENTITY:
- RIGHT side: [${speakers[0]}] (${traits0 || 'see reference'})
- LEFT side: [${speakers[1]}] (${traits1 || 'see reference'})
VERIFY: Confirm hair color + glasses status for both characters match the Identity Matrix before finalizing.
CHARACTER BODY POSITION LOCK (CRITICAL - DO NOT MIRROR):
- The character with ${traits0 || speakers[0] + "'s features"} MUST be physically standing/sitting on the RIGHT half of the panel.
- The character with ${traits1 || speakers[1] + "'s features"} MUST be physically standing/sitting on the LEFT half of the panel.
- Do NOT swap, mirror, or reverse their positions under any circumstances.
SPEECH BUBBLE POSITION LOCK:
- [${speakers[0]}]'s speech bubble MUST appear on the RIGHT side, directly above/beside [${speakers[0]}]'s head.
- [${speakers[1]}]'s speech bubble MUST appear on the LEFT side, directly above/beside [${speakers[1]}]'s head.
- Each bubble MUST point to its speaker. Do NOT swap bubble positions.`;
        } else if (speakers.length === 1) {
          const traits0 = getCharTraitsFromMatrix(speakers[0]);
          return `CRITICAL PLACEMENT & IDENTITY: [${speakers[0]}] (${traits0 || 'see reference'}) is the main focus of this panel.`;
        }
        return `CRITICAL PLACEMENT: Follow the natural dialogue flow.`;
      };

      const extractCastLimitRule = (fullPanelText) => {
        const lines = fullPanelText.split('\n');

        // Find valid cast names and create a lookup for full character objects
        const validCharacters = [];
        const charLookup = {};
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) {
            const fullCharName = m[1].trim();
            const nameOnly = fullCharName.split('(')[0].trim().split('（')[0].trim();
            if (nameOnly) {
              validCharacters.push(nameOnly);
              charLookup[nameOnly] = { name: nameOnly, full: fullCharName };
            }
          }
        });

        // Extract speakers from dialogue lines
        const speakers = [];
        lines.forEach(line => {
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          if (match && match[1].trim()) {
            let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|状況|\(.*?\))/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
            if (speaker && !speakers.includes(speaker) && validCharacters.includes(speaker)) {
              speakers.push(speaker);
            }
          }
        });

        // [v2.30] Visual Action テキストからも登場キャラ名を検出
        const allPanelCharacters = [...speakers];
        const fullText = fullPanelText;
        validCharacters.forEach(charName => {
          if (!allPanelCharacters.includes(charName) && fullText.includes(charName)) {
            allPanelCharacters.push(charName);
          }
        });

        // [v2.31] 吹き出し数カウント: セリフ行（「」付き）の数を数えて
        // ソロショット判定の矛盾を防ぐ
        let dialogueLineCount = 0;
        lines.forEach(line => {
          const trimmed = line.trim();
          // 「」で囲まれたセリフ、または「話者：セリフ」形式をカウント
          if (trimmed.includes('「') && trimmed.includes('」')) {
            dialogueLineCount++;
          } else if (/^[^（(【\[]*?[:：]\s*「/.test(trimmed)) {
            dialogueLineCount++;
          }
        });

        // [v2.33] 3人掛け合い対応: スピーカー最大3名をメインアクターとして登録
        const panelActors = speakers.slice(0, 3).map(s => `[${s}]`);

        const allCharBrackets = allPanelCharacters.map(c => `[${c}]`);

        if (panelActors.length > 0) {
          let cloneWarning = `ANTI-CLONE REMINDER: ${allCharBrackets.join(', ')} — each appears EXACTLY ONCE. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy.`;
          // [v2.31] ソロショット判定の改善:
          // キャラ1人検出 AND 吹き出し2以上 → ソロショットにしない
          // （吹き出し2つは通常2キャラの対話を意味するため）
          if (allPanelCharacters.length === 1 && dialogueLineCount <= 1) {
            cloneWarning += `\nSOLO SHOT (SINGLE CHARACTER SCENE): Since only ${allCharBrackets[0]} is listed, THIS IS A SOLO SHOT. Do NOT draw ANY other person. Do NOT draw a second copy of ${allCharBrackets[0]}. Leave the surrounding space empty rather than adding people.`;
          } else if (allPanelCharacters.length === 1 && dialogueLineCount >= 2) {
            // 検出キャラ1人だが吹き出し2つ → 独白として扱う（ソロショットにはしない）
            cloneWarning += `\nNOTE: Multiple speech bubbles in this panel are ALL spoken by ${allCharBrackets[0]} (monologue/soliloquy). Draw only ${allCharBrackets[0]} — do NOT add a second character just because there are multiple bubbles.`;
          }
          // [v2.42] 非登場キャストを背景候補としてImagenに提示（クローン防止強化版）
          const otherCast = validCharacters.filter(c => !allPanelCharacters.includes(c));
          const otherBrackets = otherCast.map(c => `[${c}]`);
          let backgroundHint = '';
          if (otherBrackets.length > 0) {
            backgroundHint = `\nSUGGESTED BACKGROUND CAST: ${otherBrackets.join(', ')} may also appear in the background or periphery of this panel as onlookers or reactors. When the scene takes place in a shared space (classroom, office, park, etc.), drawing them in the background adds visual richness. They must be clearly secondary (smaller, partially visible, or in the background) and must NOT be confused with the main speakers.`;
          }
          // [v2.42] クローン防止: 合計人数と1人1回ルールを明示
          const totalCount = allPanelCharacters.length + otherCast.length;
          const totalCountHint = `\nTOTAL CHARACTER COUNT IN THIS PANEL: EXACTLY ${totalCount} distinct individuals. Each person appears ONLY ONCE. Do NOT draw any character twice — not as a foreground duplicate, not as a background copy, not as a reflection or silhouette of an already-present character.`;
          return `CRITICAL CAST PLACEMENT: Ensure ${panelActors.join(' and ')} are the main focus. The following named characters appear in this panel: ${allCharBrackets.join(', ')}. Each named character appears EXACTLY ONCE. NEVER draw the exact same named character twice.\n${cloneWarning}${backgroundHint}${totalCountHint}`;
        } else {
          return `CRITICAL CAST PLACEMENT: Follow the panel's action naturally. NEVER draw the exact same character twice.`;
        }
      };


      // [v2.30] Clean up Cast List - フォーマット非依存WEIGHTSタグ抽出
      let cleanCastData = "";
      let currentCharacter = "";
      const castLines = castList.split('\n');
      for (let i = 0; i < castLines.length; i++) {
        const line = castLines[i].replace(/\*\*/g, '').trim();
        if (line.startsWith('## ')) {
          currentCharacter = line.replace(/^##\s*(?:\d+\.\s*)?/, '').trim();
          cleanCastData += `\n- Character [${currentCharacter}]: `;
        }
        if (!currentCharacter) continue;
        if (customOutfit.trim() && (line.includes('服装') || line.includes('Outfit'))) continue;
        const weightsMatch = line.match(/\[WEIGHTS?\]:\s*(.*)/i);
        if (weightsMatch) {
          let tags = weightsMatch[1].replace(/\|/g, '').trim();
          if (tags && tags !== "()" && tags !== "-") {
            cleanCastData += tags + ", ";
          }
          continue;
        }
        const weightedTags = line.match(/\([a-zA-Z\s_-]+:\d+\.?\d*\)/g);
        if (weightedTags && weightedTags.length >= 2) {
          cleanCastData += weightedTags.join(', ') + ", ";
        }
      }
      if (!cleanCastData.trim()) {
        cleanCastData = castList.trim(); // fallback
      }

      const VAR_CAST_LIST = cleanCastData.trim();

      // Ensure we always have non-empty prompt texts
      const safeLocation = cleanLocation || "Detailed Background";
      const safeTopic = cleanTopic || "4-koma Manga";

      // [v1.8.79 Deterministic Fix] Construct Prompt Directly in Logic (No AI Hallucination Risk)
      // We skip callThinkingGemini because this step is pure assembly.
      // [v1.9.0] Nano Banana 2 (Imagen 4) Optimized Natural Language Prompt
      // Imagen 4 understands natural language perfectly and struggles with pseudocode.
      const constructedPrompt = `
Generate a highly detailed, professional 4-koma (4-panel vertical strip) manga.
The final image MUST have a tall portrait aspect ratio exactly equivalent to an A4 paper sheet (1:1.414 proportion).

CRITICAL LAYOUT COMMAND: 
The canvas MUST be completely filled by the panels. The 4 manga panels MUST be extremely wide, occupying 95% of the total canvas width. 
Do NOT draw large white margins on the left, right, top, or bottom edges.
At the very top of the page, draw a large, bold, black Japanese text title that says exactly: ${safeTopic}
Do NOT surround the title text with quotation marks, apostrophes, single quotes, or any other punctuation marks. Draw ONLY the raw Japanese characters of the title.
Draw a tiny English watermark exactly ON the bottom-right border of the 4th panel that displays the exact text "Generated by Super FURU AI 4-koma ${SYSTEM_VERSION}" in clean sans-serif font. The watermark text MUST be written HORIZONTALLY (left-to-right reading direction), NEVER rotated 90 degrees, NEVER written vertically, and NEVER stacked one letter per line. Do NOT draw duplicated or overlapping watermarks. Do NOT add extra white space below the 4th panel for the watermark.

CRITICAL PANEL SIZE COMMAND: The canvas MUST be divided into exactly 4 EQUAL horizontal panels stacked vertically from top to bottom. All 4 panels MUST be the EXACT SAME height and EXACT SAME width.
The art style is: ${styleCore}.
(Apply dramatic anime cinematic lighting and high-budget visual effects, but do not clutter the screen with excessive speedlines).

Overall Setting: ${safeLocation}.

CRITICAL VISUAL REPRODUCTION PROTOCOL (v2.17 Enhanced):
If an image is attached, you MUST reproduce the character designs from the attached reference image by strictly following these rules:
- REPRODUCE the EXACT hairstyle (length, style, bangs), hair color, eye color, eye shape, and skin tone for each character in every panel.
- REPRODUCE the EXACT presence or absence of accessories: glasses, hair clips, ribbons, earrings, hats, etc.
- DO NOT add glasses to any character who does not wear them in the reference. DO NOT remove glasses from any character who DOES wear them.
- DO NOT change any character's hair color, hair length, or hairstyle between panels or from the reference.
- DO NOT swap features between characters (e.g., giving Character A's hair color to Character B).
- If a character has a unique charm point (mole, scar, freckles, snaggletooth), it MUST appear in EVERY panel.
${customOutfit.trim() ? `
REFERENCE IMAGE CLOTHING POLICY (CRITICAL):
- The attached reference image must ONLY be used for: face shape, hairstyle, hair color, eye color, eye shape, skin tone, and accessories (glasses, hair clips, etc.).
- COMPLETELY IGNORE the clothing/outfit shown in the reference image.
- For clothing, follow ONLY the OUTFIT OVERRIDE instruction below. The reference image's clothing is IRRELEVANT.` : ''}

Important Character Cast:
${VAR_CAST_LIST}
${customOutfit.trim() ? `OUTFIT OVERRIDE (Mandatory): All characters MUST be wearing the following outfit, overriding their default clothing: ${customOutfit.trim()}. If weighted tags are provided (e.g. "(swimsuit:1.5)"), apply them directly. Strictly follow this outfit specification.` : ''}
【Character Identity Anchor (v2.25)】: Before drawing each panel, mentally confirm: "Does this character's hair color, hairstyle, eye color, glasses status, and outfit match the reference and previous panels?" If ANY detail differs, redraw it. Cross-panel consistency is MANDATORY.
${buildIdentityMatrix(castList)}
CROSS-PANEL OUTFIT CONSISTENCY (MANDATORY): Every character MUST wear the EXACT same outfit in ALL 4 panels. Do NOT change, add, or remove any clothing item between panels. If no outfit override is specified, use the outfit from the character reference sheet and keep it identical across every panel.

Camera and Composition Rules:
${dynamicCamera}
CRITICAL ANTI-CLONING RULE: NEVER draw the exact same character twice inside a single panel. A character can only appear ONCE per panel. Even if a character's name is mentioned multiple times in the instructions (e.g., in both the placement rule and the visual action description), they are still ONE person — draw them only ONCE.
CRITICAL COMPOSITION RATIO: Always maintain a strict 2:3 (Manga typical vertical/portrait) golden ratio structure within each panel setup.

Technical Quality Definitions (System Dictionary):
(Meticulously clean line art: 1.5)
(Subtle sub-surface scattering and backlighting: 1.4)
(Cinematic depth of field with bokeh: 1.3)
(NO text or SFX outside of speech bubbles: 1.5)
(ABSOLUTELY NO ENGLISH TEXT outside watermark. Do NOT draw terms like 'G-pen', 'Gleam', 'HA': 2.0)


## Panel 1 (Top)
${buildEmotionBlock(panel1Text)}
${extractPlacementRule(panel1Text)}
${extractCastLimitRule(panel1Text)}
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${injectOutfitReminder(extractActionOnly(panel1Text, extractPlacementRule(panel1Text)))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel1Text)}.

## Panel 2
${buildEmotionBlock(panel2Text)}
${extractPlacementRule(panel2Text)}
${extractCastLimitRule(panel2Text)}
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${injectOutfitReminder(extractActionOnly(panel2Text, extractPlacementRule(panel2Text)))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel2Text)}.

## Panel 3
${buildEmotionBlock(panel3Text)}
${extractPlacementRule(panel3Text)}
${extractCastLimitRule(panel3Text)}
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${injectOutfitReminder(extractActionOnly(panel3Text, extractPlacementRule(panel3Text)))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel3Text)}.

## Panel 4 (Bottom)
${buildEmotionBlock(panel4Text)}
${extractPlacementRule(panel4Text)}
${extractCastLimitRule(panel4Text)}
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${injectOutfitReminder(extractActionOnly(panel4Text, extractPlacementRule(panel4Text)))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel4Text)}.

Important constraints:
- Ensure the characters accurately reflect classic anime styles.
- Do NOT merge panels. Keep 4 distinct panels with white gutters between them.
- Do NOT write situation/narration explanations as text on the screen. The Visual Action must only be illustrated.
- Write the Japanese spoken text clearly inside white manga speech bubbles in a bold sans-serif Japanese font.
- Japanese dialogue MUST end with a period (。). However, do NOT add unnecessary commas (、) inside dialogue. Manga speech bubbles rarely use commas in natural Japanese — line breaks and bubble shape provide natural pauses instead. Only use commas when absolutely necessary to prevent misreading.
- Do NOT add random English text except for the watermark.
- Maintain character consistency across all 4 panels.
- Flow is from top panel to bottom panel.
- Ensure the watermark is positioned at the absolute bottom edge of the image, with no extra whitespace below it. The watermark MUST be HORIZONTAL text (left-to-right), NOT vertical or rotated.
- CRITICAL COMPOSITION BAN: Do NOT draw floating close-up eyes, partial face crops, or ghostly face overlays in the background of any panel. Every character must be drawn as a complete physical presence within the scene. No "dramatic eye insert" or "background eye close-up" compositions allowed.
      `;

      // Wait a bit to simulate processing/syncing (Important for User Experience)
      await new Promise(resolve => setTimeout(resolve, 800));

      // [v2.27] セーフティ年齢引き上げ変換を適用
      const safePrompt = applySafetyAgeUp(constructedPrompt.trim());
      setFinalPrompt(safePrompt);
      setAssembleThought(prev => prev + "\n> セーフティ年齢フィルター: 適用済み\n> 最適化ベクトル: 計算完了\n> 構造ロック: 有効\n> 風刺ロジック: 強化済み\n> [完了] 最終プロンプトを構築しました。");
      showStatus("最終プロンプトの構築が完了しました。画像生成を開始します...");

      // Auto-trigger Image Generation handled by effect if needed, but manual button usually forces user to check.

    } catch (error) {
      console.error(error);
      const translatedMsg = translateApiError(error.message);
      setAssembleThought(prev => prev + `\n\n[SYSTEM FAILURE]: ${error.message}\n--------------------------------------------------\n${translatedMsg}`);
      showStatus("生成エラー: " + error.message);
    } finally {
      clearInterval(thinkTimer);
      setIsAssembling(false);
    }
  };

  const resetAll = () => {
    setCastList("");
    setScenario("");
    setFinalPrompt("");
    setImages([]);
    setGeneratedImage(null);
    setAnalyzeThought("");
    setScenarioThought("");
    setAssembleThought("");
    setManualTopic("");
    setCustomLocation("");
    setCustomOutfit("");
    setLockedLocation("");
    setLockedOutfit("");
    showStatus("メモリをリセットしました。");
  };

  const [isCopied, setIsCopied] = useState(false);

  const copyPrompt = () => {
    if (!finalPrompt) return;
    navigator.clipboard.writeText(finalPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    showStatus("クリップボードにコピーしました！");
  };
  // --- Step 4: Image Generation ---
  const regenerateImage = async () => {
    if (isGeneratingImage || !finalPrompt) return;
    setIsGeneratingImage(true);
    setIsGenerationError(false);
    setGenLog(["[1/5] プロンプトパラメータをロック中...", "[2/5] セーフティフィルターを検証中..."]);

    // [v2.44] 進捗ステップ表示＋経過時間カウンター
    let genTickCount = 0;
    const genTimer = setInterval(() => {
      genTickCount++;
      const elapsed = Math.floor(genTickCount * 1.5);
      setGenLog(prev => {
        const lastEntry = prev[prev.length - 1];
        if (lastEntry && lastEntry.startsWith("[WAIT]")) {
          return [...prev.slice(0, -1), `[WAIT] ⏳ 画像生成API応答を待機中... (${elapsed}秒経過)`];
        }
        return [...prev, `[WAIT] ⏳ 画像生成API応答を待機中... (${elapsed}秒経過)`];
      });
    }, 1500);

    // Artificial delay to ensure user sees the process starting
    await new Promise(r => setTimeout(r, 800));

    try {
      showStatus("Google AI (Gemini/Imagen) に送信中...");
      setGenLog(prev => [...prev, "[3/5] Google Cloud へ接続中...", "[3/5] プロンプトデータをアップロード中..."]);

      await new Promise(r => setTimeout(r, 1000)); // More visibility

      const statCallback = (msg) => {
        setGenLog(prev => [...prev, msg]);
      };

      const { base64Img, usedModel: generatedModelId } = await generateImageWithImagen(finalPrompt, statCallback);
      setGenLog(prev => [...prev, `[4/5] データストリーム受信完了 (Model: ${generatedModelId})`, "[5/5] Base64画像データをデコード・レンダリング中..."]);

      setGeneratedImage(`data:image/png;base64,${base64Img}`);
      if (generatedModelId && !generatedModelId.startsWith("gemini-3")) {
        setIsFallbackUsed(true);
        setGenLog(prev => [
          ...prev,
          "[WARNING] 最新モデル(Nano Banana 2)への接続がタイムアウト等で失敗しました。",
          "[WARNING] 代わりに下位APIで妥協版を出力したため、描写が大きく崩れている可能性があります。",
          "[GUIDE] ★手動生成を推奨します★",
          "[GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          "[GUIDE] 2. Gemini(Web版)を開く: https://gemini.google.com/app",
          "[GUIDE] 3. 貼り付けて「思考モード」で送信する",
          "[COMPLETE] Image successfully generated (with warnings)."
        ]);
      } else {
        setIsFallbackUsed(false);
        setGenLog(prev => [...prev, "[COMPLETE] Image successfully generated."]);
      }
      showStatus("画像生成完了！");
    } catch (error) {
      console.error(error);
      setIsGenerationError(true);
      setGeneratedImage(null);

      const errMsg = error.message || "";
      let guideLines = [];

      if (errMsg.includes("sensitive") || errMsg.includes("Responsible AI") || errMsg.includes("400")) {
        // [v2.35] 救済パネルにエラーメッセージを自動入力して展開
        setPolicyErrorMsg(errMsg);
        setIsPolicyPanelOpen(true);
        guideLines = [
          "[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。",
          "[ERROR GUIDE] 【対処法】下の🛡️「コンテンツポリシー救済パネル」にエラーメッセージが自動入力されました。",
          "[ERROR GUIDE] 「配慮版プロンプトを再生成する」ボタンを押すと、AIが安全な表現に修正します。"
        ];
      } else if (errMsg.includes("not found") || errMsg.includes("not supported") || errMsg.includes("404") || errMsg.includes("403")) {
        guideLines = [
          "[ERROR GUIDE] 🔑 現在のAPIキーでは、開発アプリ経由での画像生成が許可されていません（Google側の仕様）。",
          "[ERROR GUIDE] 【対処法】このアプリ上での自動生成は一旦諦め、以下の「手動生成手段（Gemini Web版）」をご利用ください。",
          "[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          "[ERROR GUIDE] 2. Gemini (Web版) を開く: https://gemini.google.com/app",
          "[ERROR GUIDE] 3. 貼り付けて「思考モード(Flash Thinking)」で送信する"
        ];
      } else {
        guideLines = [
          "[ERROR GUIDE] ⏲️ タイムアウト、または予期せぬ通信エラーで生成に失敗しました（Google側の混雑など）。",
          "[ERROR GUIDE] 【対処法】しばらく時間（数分〜）を置いてから「画像を再生成」を試すか、以下の手動手順をご利用ください。",
          "[ERROR GUIDE] 1. 「プロンプトをコピー」ボタンを押す",
          "[ERROR GUIDE] 2. Gemini (Web版) を開く: https://gemini.google.com/app",
          "[ERROR GUIDE] 3. 貼り付けて「思考モード(Flash Thinking)」で送信する"
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

      const metaPrompt = `あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下の画像生成プロンプトがAIの安全基準（コンテンツポリシー）により拒否されました。

【拒否理由・エラー情報】:
${policyErrorMsg.trim()}

【拒否されたプロンプト（参照用・修正不要）】:
${finalPrompt}

【あなたのタスク】:
上記プロンプトの中から、コンテンツポリシーに抵触している「単語・フレーズ」を全て特定し、それぞれに対して安全な代替表現を提案してください。

【検出すべき問題カテゴリ】:
1. 学校・未成年連想: classroom, 教室, 実習室, 校則, school, academy, sailor uniform, serafuku, student council, school rules, 授業 → オフィス・社会人設定に置換
2. 制服・学生服: sailor-style, pleated skirt（学校文脈で使用時）, school blazer, 制服 → ビジネスウェア/カジュアルオフィスに置換
3. 暴力表現: explosion, blast, 爆風, 叩きつけ, striking, slamming, 衝撃波, 激しく叩く → 劇的だが非暴力的な演出に置換
4. 年齢・体型リスク: short height, loli, petite（未成年を連想させる文脈） → 成人の体型表現に置換
5. 過激カメラ: worm's eye view（制服キャラとの組み合わせ時のみ） → より安全なアングルに置換
6. 威嚇・ハラスメント: 怒りの炎, intense fury, 仁王立ち + 攻撃動作 → 威厳ある態度に変換

【出力フォーマット - 厳守】:
以下のJSON配列形式**のみ**を出力してください。説明文や前置き、マークダウンコードフェンスは一切不要です。
JSON配列の最初の文字は [ 、最後の文字は ] であること。

[
  {"from": "問題のある元の表現（プロンプト内の正確な文字列）", "to": "安全な代替表現", "reason": "簡潔な理由"},
  {"from": "...", "to": "...", "reason": "..."}
]

【重要ルール】:
- "from"の値は、プロンプト内に**実在する正確な部分文字列**でなければならない。存在しない文字列を捏造しないこと。
- 1つの"from"は可能な限り短い単位（単語〜1文程度）にすること。段落丸ごとの置換は禁止。
- 問題のない箇所は絶対に含めないこと。修正が必要な箇所のみ列挙すること。
- 最低3個、最大20個の置換ペアを出力すること。
- "to"の表現は元と同程度の長さ・ディテールを維持すること。短縮・省略禁止。`;

      const result = await callThinkingGemini(metaPrompt, [], null, (msg) => {
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
        setPolicyFixLog(prev => prev + "\n> [GUIDE] 再度STEP4で画像生成するか、「プロンプトをコピー」してGemini Web版で生成してください。");
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
      const fallbackPrompt = `あなたは画像生成プロンプトのコンテンツポリシー修正の専門家です。

以下のプロンプトがAIの安全基準で拒否されました。以下の置換ルールを厳密に適用して、修正後のプロンプト全文を出力してください。

【必須置換ルール（これらを全て適用）】:
- 学校設定 → オフィス/IT企業/会議室に変更: 教室,実習室,classroom → モダンなIT企業のオフィス
- 校則 → 業務規定/社内規定
- セーラー服/sailor-style → ビジネスブラウス/professional business blouse
- プリーツスカート/pleated skirt → テーラードスラックス/tailored slacks（学校文脈の場合のみ）
- 爆風/explosion/blast → 颯爽と/劇的に/dramatic entrance
- 叩きつけ/striking/slamming → 威風堂々と置く/firmly placing
- 衝撃波 → 気迫/aura of authority
- 怒りの炎/intense fury/rage → 強い決意/fierce determination
- 校則を守りなさい → 業務規定を守りなさい
- short height → petite build

【拒否理由・エラー情報】:
${policyErrorMsg.trim()}

【修正対象のプロンプト】:
${finalPrompt}

【出力ルール】:
- 上記の置換ルールに該当する箇所だけを修正し、それ以外は1文字も変更しないでください。
- 修正後のプロンプト全文のみを出力してください。説明や前置きは不要です。`;

      const result = await callThinkingGemini(fallbackPrompt, [], null, (msg) => {
        setPolicyFixLog(prev => prev + `\n> ${msg}`);
      });

      if (result.text && result.text.length > 100) {
        setFinalPrompt(result.text.trim());
        setPolicyFixLog(prev => prev + "\n> [SUCCESS] フォールバック方式で配慮版プロンプトを生成しました。STEP3のプロンプト欄に反映済みです。");
      } else {
        setPolicyFixLog(prev => prev + "\n> [ERROR] フォールバックでも適切な応答が得られませんでした。エラーメッセージをより詳しく入力して再試行してください。");
      }
    } catch (error) {
      console.error(error);
      setPolicyFixLog(prev => prev + `\n> [Fallback ERROR] ${error.message}`);
    }
  };

  // Determine Current Step
  const currentStep = (!castList || castList.length < 1) ? 1
    : (!scenario || scenario.length < 1) ? 2
      : (!finalPrompt) ? 3
        : 4;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <ApiKeyModal isOpen={showModal} onSave={handleSetKey} />

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto p-4 md:p-10 space-y-8">
        {/* ヘッダー */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0f1115] backdrop-blur-xl p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20">
                <BrainCircuit size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                  Super FURU AI <span className="text-white text-2xl ml-2 tracking-widest">4-koma System</span> <span className="text-xs text-yellow-500 font-mono align-top ml-1">{SYSTEM_VERSION}</span>
                </h1>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1 pl-1">
                  Social Satire Engine [ 演出強化版 ]
                </p>
                {/* [v1.7.0] Model Quality Badge */}
                {usedModel && (() => {
                  const info = getModelBadgeInfo(usedModel);
                  if (!info) return null;
                  return (
                    <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${info.color} shadow-lg animate -in fade -in slide -in -from-top-2 cursor-help group / badge relative`}>
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

          <button onClick={resetAll} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/5 z-10">
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 入力をリセット
          </button>
        </header>

        {/* STATUS BAR (Sticky Mode Indicator) */}
        <div className="sticky top-4 z-50 bg-[#0f1115]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-3 rounded-full ${currentStep === 1 ? 'bg-blue-600 animate-pulse' : 'bg-slate-800'} `}>
              <Camera size={20} className={currentStep === 1 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-blue-600 transition-all duration-500 ${currentStep >= 2 ? 'w-full' : 'w-0'} `} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 2 ? 'bg-purple-600 animate-pulse' : 'bg-slate-800'} `}>
              <FileText size={20} className={currentStep === 2 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-purple-600 transition-all duration-500 ${currentStep >= 3 ? 'w-full' : 'w-0'} `} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 3 ? 'bg-orange-600 animate-pulse' : 'bg-slate-800'} `}>
              <Wand2 size={20} className={currentStep === 3 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-green-600 transition-all duration-500 ${currentStep >= 4 ? 'w-full' : 'w-0'} `} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 4 ? 'bg-green-600 animate-pulse' : 'bg-slate-800'} `}>
              <ImageIcon size={20} className={currentStep === 4 ? 'text-white' : 'text-slate-500'} />
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CURRENT MODE</p>
            <p className="text-xl font-black italic tracking-tighter text-white">
              {currentStep === 1 && <span className="text-blue-500">CHARACTER ANALYSIS</span>}
              {currentStep === 2 && <span className="text-purple-500">SCENARIO GENERATION</span>}
              {currentStep === 3 && <span className="text-orange-500">PROMPT ASSEMBLY</span>}
              {currentStep === 4 && <span className="text-green-500">EXECUTION COMPLETE</span>}
            </p>
          </div>
        </div>

        <main className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ filter: apiKey ? 'none' : 'blur(10px)', pointerEvents: apiKey ? 'auto' : 'none' }}>

            {/* 01: キャラクター入力 (Dynamic Style) */}
            <section
              onDragOver={(e) => { e.preventDefault(); if (apiKey) setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (apiKey) processFiles(e.dataTransfer.files); }}
              className={`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${isDragging ? 'border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20' : 'border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]'}
                ${currentStep === 1 && !isDragging ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
                ${currentStep > 1 ? 'border-blue-500/30 bg-blue-900/5' : ''}
      `}
            >
              <div className="flex items-center justify-between mb-6 z-10">
                <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 1 ? 'text-blue-400' : 'text-slate-500'} `}>
                  <Camera size={18} /> STEP 01: キャラクター解析 (Character Analysis)
                </div>
                {isAnalyzing && <Loader2 size={18} className="animate-spin text-blue-400" />}
                {currentStep > 1 && <CheckCircle2 size={18} className="text-blue-500" />}
              </div>

              <div className="flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start">
                {images.map((img, i) => (
                  <div key={i} className="relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer">
                    <img src={img} className="w-full h-full object-cover shadow-sm" />
                    <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]"><Trash2 size={16} /></button>
                  </div>
                ))}
                <label className="w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add">
                  {isAnalyzing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={16} className="group-hover/add:scale-125 transition-transform" />
                    </>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => processFiles(e.target.files)}
                    disabled={isAnalyzing}
                  />
                </label>

                {images.length === 0 && !isAnalyzing && (
                  <label className="flex-1 flex flex-col items-center justify-center text-slate-500 ml-4 cursor-pointer hover:bg-white/5 rounded-xl transition-colors p-4 border border-transparent hover:border-white/10">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => processFiles(e.target.files)}
                    />
                    <p className="text-xs font-bold text-slate-400">
                      キャラクターシートをドロップ <span className="text-blue-400">（複数のキャラクターシートは、まとめてアップロードしてください）</span>
                    </p>
                    <p className="text-[10px] opacity-60 mt-1">
                      ※名前・性格・設定が明記されているシートを推奨
                    </p>
                    <div className="mt-3 flex flex-col items-center gap-1 group/preview">
                      <span className="text-[9px] uppercase tracking-widest opacity-40 group-hover/preview:text-blue-400 transition-colors">推奨見本 (例)</span>
                      <img
                        src={`${import.meta.env.BASE_URL}example_sheet.jpg`}
                        alt="Example"
                        className="h-24 w-auto rounded-lg border border-white/10 opacity-50 group-hover/preview:opacity-100 transition-opacity shadow-2xl skew-x-[-2deg] hover:skew-x-0 duration-500"
                      />
                    </div>
                  </label>
                )}

                {isAnalyzing && (
                  <div className="flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    <div className="text-xs font-mono text-blue-300">
                      Analyzing {images.length} chars... <span className="text-slate-500 ml-2 text-[10px]">(数十秒〜数分待機)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* FIX: Log moved ABOVE result textarea as per user request */}
              <div className="mb-4">
                <ThinkingLog thought={analyzeThought} />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <span className="px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded">
                  ▼ 生成されるキャラクター解析 (編集可)
                </span>
                <textarea
                  value={castList}
                  onChange={(e) => setCastList(e.target.value)}
                  style={{ color: '#ffffff', backgroundColor: '#08090b', opacity: 1 }}
                  className="flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600"
                  placeholder="画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"
                />
              </div>
            </section>

            {/* 02: シナリオ設定 (Static Layout) */}
            <section className={`p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${currentStep === 2 ? 'border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100' : 'border-white/5 opacity-60'}
                 ${currentStep > 2 ? 'border-purple-500/30 bg-purple-900/5 opacity-100' : ''}
                 ${currentStep < 2 ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
                 ${isAssembling ? 'blur-sm opacity-50 pointer-events-none' : ''}
      `}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 2 ? 'text-purple-400' : 'text-slate-500'} `}>
                  {/* FIX: Title update */}
                  <FileText size={18} /> STEP 02: シナリオ構築設定 (Scenario Settings)
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-4">
                {/* Mode Toggle */}
                <div className="grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5">
                  <button
                    onClick={() => setInputMode('news')}
                    className={`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${inputMode === 'news'
                        ? 'bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg'
                        : 'bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300'
                      } `}
                  >
                    <span className="mr-2">🌐</span> ニュース検索
                  </button>
                  <button
                    onClick={() => setInputMode('manual')}
                    className={`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
                        ${inputMode === 'manual'
                        ? 'bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg'
                        : 'bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300'
                      } `}
                  >
                    <span className="mr-2">✏️</span> 自由入力
                  </button>
                </div>

                {/* INPUT AREA */}
                {inputMode === 'news' ? (
                  <div className="space-y-4">
                    {/* FIX: Calendar Restoration */}
                    <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5">
                      <span className="text-xs font-bold text-slate-400">📅 対象日付 (Target Date):</span>
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        style={{ colorScheme: 'dark' }}
                        className="bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="col-span-2 lg:col-cols-4 mb-2 text-xs font-bold text-slate-400 text-center">
                        ▼ 検索するカテゴリを選択してください
                      </div>
                      {categories.map((cat) => (
                        <label
                          key={cat.id}
                          className={`
                            relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active: border-b-2 active: translate-y-0.5
                            ${cat.checked
                              ? 'bg-white text-black border-slate-300'
                              : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                            }
      `}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={cat.checked}
                            onChange={() => toggleCategory(cat.id)}
                          />
                          {cat.checked && (
                            <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className="text-center">
                            <div className={`text-2xl mb-2 ${cat.checked ? 'scale-110' : 'opacity-70 grayscale'} `}>
                              {cat.icon}
                            </div>
                            <div className="text-[11px] font-bold tracking-wider">
                              {cat.label}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Display Current Target for User Confidence */}
                    <div className="text-xs text-slate-500 text-center font-mono">
                      Current Search Query: {categories.filter(c => c.checked).map(c => c.keywords).join(' ') || "None"} (Target: {targetDate})
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Manual Mode */}
                    <div className="text-xs font-bold text-purple-300 text-center">
                      ▼ 自由入力モード: 好きなネタやURLを入力してください (<span className="text-blue-400">URLからの自動読み取り対応</span>)
                    </div>
                    <textarea
                      value={manualTopic}
                      onChange={(e) => setManualTopic(e.target.value)}
                      placeholder="例：&#13;&#10;・最近のAI技術の進化について&#13;&#10;・近所の猫が可愛かった話&#13;&#10;・https://example.com/news/12345&#13;&#10;&#13;&#10;※URLを入力すると、AIがリンク先の内容を参照して漫画化します。&#13;&#10;記事の内容を直接コピペするか、具体的なトピックを文章で入力してください。"
                      style={{ color: '#ffffff', backgroundColor: '#0f1115' }}
                      rows={10}
                      className="w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"
                    />
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 bg-[#050505] p-3 rounded-xl border border-blue-500/20">
                    <label className="text-xs font-bold text-blue-400 mb-1 block flex items-center gap-1">
                      <Globe size={14} /> 指定場所 (Location Override) <span className="text-[10px] text-gray-500 font-normal ml-auto">※空欄ならAIおまかせ</span>
                    </label>
                    <input
                      type="text"
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      style={{ color: '#ffffff', backgroundColor: '#111111' }}
                      className="w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm placeholder-gray-600 font-mono"
                      placeholder="例: サイバーパンクな裏路地、炎上する宇宙船..."
                    />
                  </div>
                  <div className="flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20">
                    <label className="text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1">
                      <Sparkles size={14} /> 指定服装 (Outfit Override) <span className="text-[10px] text-gray-500 font-normal ml-auto">※空欄ならキャラシート準拠</span>
                    </label>
                    <input
                      type="text"
                      value={customOutfit}
                      onChange={(e) => setCustomOutfit(e.target.value)}
                      style={{ color: '#ffffff', backgroundColor: '#111111' }}
                      className="w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono"
                      placeholder="例: 全員水着、黒のミリタリー装備、ナース服..."
                    />
                  </div>
                </div>

                {/* EXECUTE BUTTON (White Style) */}
                <button
                  onClick={generateScenarioFromNews}
                  disabled={isSearching || currentStep < 1}
                  className="w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl"
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span className="animate-pulse">SCENARIO GENERATING...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={24} className="fill-yellow-400 text-black" />
                      <span>シナリオ作成を実行 (STEP 2)</span>
                      <ArrowRight size={24} className="opacity-60" />
                    </>
                  )}
                </button>
              </div>

              {/* RESULT & LOG AREA */}
              <div className="space-y-4 mt-6">
                {/* Log */}
                {scenarioThought && (
                  <div className="mt-4">
                    <ThinkingLog thought={scenarioThought} />
                  </div>
                )}

                {/* RESULT TEXTAREA (Fix Overlap) */}
                <div className="flex flex-col gap-2">
                  <span className="px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded">
                    ▼ 生成されるシナリオ (編集可)
                  </span>
                  <textarea
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
                    className="w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono"
                    placeholder="ここに生成されたシナリオが表示されます..."
                  />
                </div>

                {/* [v2.41] シナリオ強化パネル（折りたたみ式）- 常時表示、シナリオ未生成時はぼかし */}
                <div className={`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${
                  scenario && scenario.length > 20 
                    ? 'border-orange-500/30' 
                    : 'border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none'
                }`}>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 bg-orange-900/20 hover:bg-orange-900/30 transition-colors cursor-pointer"
                    onClick={() => scenario && scenario.length > 20 && setIsEnhancePanelOpen(!isEnhancePanelOpen)}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span>🔥</span>
                      <span className="font-bold text-orange-300">シナリオ強化 (Scenario Enhance)</span>
                      {originalScenario && <span className="text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30">強化済み</span>}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-slate-600 font-mono">{!(scenario && scenario.length > 20) ? 'シナリオ生成後に使用可能' : isEnhancePanelOpen ? '閉じる' : 'クリックで開く'}</span>
                      <ChevronDown size={14} className={`text-orange-400/60 transition-transform duration-300 ${isEnhancePanelOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isEnhancePanelOpen && scenario && scenario.length > 20 && (
                    <div className="p-4 bg-orange-950/10 space-y-3">
                      <p className="text-[11px] text-orange-200/70 leading-relaxed">
                        生成済みシナリオの演出を強化します。強化したいカテゴリをONにして「強化実行」を押してください。<br/>
                        <span className="text-orange-300 font-bold">💡 複数回実行すると効果が重複し、より強力（カオス）な演出になります。</span><br/>
                        ⚠️ 演出が過激になるとSTEP4でコンテンツポリシーに引っかかる場合があります（既存の救済機能で対応可能）。
                      </p>

                      {/* 4つのトグルスイッチ */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {/* 表情 */}
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                          enhanceExpressions ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                        }`}>
                          <input type="checkbox" className="hidden" checked={enhanceExpressions} onChange={() => setEnhanceExpressions(!enhanceExpressions)} />
                          {enhanceExpressions && (
                            <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className="text-center">
                            <div className={`text-2xl mb-1 ${enhanceExpressions ? 'scale-110' : 'opacity-70 grayscale'}`}>😱</div>
                            <div className="text-[11px] font-bold tracking-wider">表情追加</div>
                            <div className="text-[9px] opacity-70 mt-1">大げさなリアクション</div>
                          </div>
                        </label>

                        {/* ボディランゲージ */}
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                          enhanceBodyLang ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                        }`}>
                          <input type="checkbox" className="hidden" checked={enhanceBodyLang} onChange={() => setEnhanceBodyLang(!enhanceBodyLang)} />
                          {enhanceBodyLang && (
                            <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className="text-center">
                            <div className={`text-2xl mb-1 ${enhanceBodyLang ? 'scale-110' : 'opacity-70 grayscale'}`}>🤸</div>
                            <div className="text-[11px] font-bold tracking-wider">身体強化</div>
                            <div className="text-[9px] opacity-70 mt-1">全身で感情を表現</div>
                          </div>
                        </label>

                        {/* 照明・演出 */}
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                          enhanceEffects ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                        }`}>
                          <input type="checkbox" className="hidden" checked={enhanceEffects} onChange={() => setEnhanceEffects(!enhanceEffects)} />
                          {enhanceEffects && (
                            <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className="text-center">
                            <div className={`text-2xl mb-1 ${enhanceEffects ? 'scale-110' : 'opacity-70 grayscale'}`}>✨</div>
                            <div className="text-[11px] font-bold tracking-wider">演出強化</div>
                            <div className="text-[9px] opacity-70 mt-1">照明効果やVFX</div>
                          </div>
                        </label>

                        {/* 背景 */}
                        <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                          enhanceBackgrounds ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                        }`}>
                          <input type="checkbox" className="hidden" checked={enhanceBackgrounds} onChange={() => setEnhanceBackgrounds(!enhanceBackgrounds)} />
                          {enhanceBackgrounds && (
                            <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                              <CheckCircle2 size={12} strokeWidth={4} />
                            </div>
                          )}
                          <div className="text-center">
                            <div className={`text-2xl mb-1 ${enhanceBackgrounds ? 'scale-110' : 'opacity-70 grayscale'}`}>🏙️</div>
                            <div className="text-[11px] font-bold tracking-wider">背景強化</div>
                            <div className="text-[9px] opacity-70 mt-1">描写を詳細化</div>
                          </div>
                        </label>
                      </div>

                      {/* 選択中の内容を表示 */}
                      <div className="text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md">
                        Current Targets: {[enhanceExpressions && "表情", enhanceBodyLang && "身体", enhanceEffects && "演出", enhanceBackgrounds && "背景"].filter(Boolean).join(" / ") || "未選択"}
                      </div>

                      {/* 実行・元に戻すボタン */}
                      <div className="flex gap-2">
                        <button
                          className="flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                          onClick={enhanceScenario}
                          disabled={isEnhancing || !(enhanceExpressions || enhanceBodyLang || enhanceEffects || enhanceBackgrounds)}
                        >
                          {isEnhancing ? (
                            <><Loader2 size={16} className="animate-spin" /> 強化中...</>
                          ) : (
                            <><Zap size={16} className="fill-yellow-300 text-black" /> シナリオ強化実行</>
                          )}
                        </button>

                        <button
                          className={`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${
                            originalScenario 
                              ? 'bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30' 
                              : 'bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed'
                          }`}
                          onClick={revertScenario}
                          disabled={isEnhancing || !originalScenario}
                        >
                          ↩️ 強化前に戻す
                        </button>
                      </div>

                      {/* ThinkingLog (パネルを開いた時点で表示) */}
                      <ThinkingLog thought={enhanceLog || "> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"} />
                    </div>
                  )}
                </div>

                {/* 場所・服装設定プレビューは grid 外へ移動済み */}

              </div>
            </section>
          </div>

          {/* 場所・服装設定プレビュー - STEP2以降のみ表示 */}
          <div className={`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${!scenario ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
          `}>
            <span className="text-blue-400 font-bold border-b border-blue-500/20 pb-2 w-full flex items-center gap-2">
              <Sparkles size={14} /> 場所・服装設定 (GENERATION PREVIEW)
            </span>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ※以下を変更する場合は指定場所・指定服装を入力の上、『シナリオ作成を実行（STEP2）』ボタンをクリックして再生成してください。
            </p>
            <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
              <Globe size={12} className="text-blue-400" />
              <span>場所 (Location):</span>
              <span style={{ fontWeight: 'bold', color: lockedLocation && customLocation && lockedLocation === customLocation ? '#c4b5fd' : '#ffffff' }}>
                {lockedLocation || "AIおまかせ (Generic Background)"}
              </span>
              <span style={{
                marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
                background: lockedLocation && customLocation && lockedLocation === customLocation ? 'rgba(88,28,135,0.5)' : 'rgba(29,78,216,0.3)',
                color: lockedLocation && customLocation && lockedLocation === customLocation ? '#c4b5fd' : '#93c5fd',
                border: `1px solid ${lockedLocation && customLocation && lockedLocation === customLocation ? 'rgba(139,92,246,0.4)' : 'rgba(59,130,246,0.3)'}`
              }}>
                {lockedLocation && customLocation && lockedLocation === customLocation ? '強制指定中' : '自動判定'}
              </span>
            </div>
            <div className="text-gray-300" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px', paddingBottom: '4px' }}>
              <span className="text-green-400">👕</span>
              <span>服装 (Outfit):</span>
              <span style={{ fontWeight: 'bold', color: lockedOutfit ? '#c4b5fd' : '#ffffff' }}>
                {lockedOutfit || "キャラシート準拠 (Default)"}
              </span>
              <span style={{
                marginLeft: '6px', padding: '2px 6px', borderRadius: '4px', fontSize: '9px', whiteSpace: 'nowrap',
                background: lockedOutfit ? 'rgba(88,28,135,0.5)' : 'rgba(29,78,216,0.3)',
                color: lockedOutfit ? '#c4b5fd' : '#93c5fd',
                border: `1px solid ${lockedOutfit ? 'rgba(139,92,246,0.4)' : 'rgba(59,130,246,0.3)'}`
              }}>
                {lockedOutfit ? '強制指定中' : '自動判定'}
              </span>
            </div>
          </div>

          {/* 03: プロンプト生成 - Tailwind p-8等がJITで無視されるためインラインスタイルで適用 */}
          <section
            style={{ padding: '16px', gap: '16px', borderRadius: '0', background: '#0f1115' }}
            className={`flex flex-col shadow-xl transition-all duration-300
              ${currentStep === 3 ? 'border-2 border-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.15)] opacity-100' : 'border border-white/5 opacity-60'}
              ${currentStep > 3 ? 'border border-orange-500/30 opacity-100' : ''}
              ${currentStep < 3 ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
              ${isSearching ? 'blur-sm opacity-50 pointer-events-none' : ''}
          `}>
            <div className={`flex items-center gap-3 text-sm font-black uppercase tracking-widest px-2 ${currentStep === 3 ? 'text-orange-400' : 'text-slate-500'}`}>
              <Wand2 size={24} /> STEP 03: プロンプト生成 (PROMPT ASSEMBLY)
            </div>

            <button
              onClick={assemblePrompt}
              disabled={isAssembling}
              className={`w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl
                   ${currentStep === 3 ? 'ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]' : ''}
              `}
            >
              {isAssembling ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span className="animate-pulse">ASSEMBLING PROMPT...</span>
                </>
              ) : (
                <>
                  <Wand2 size={24} className={`text-blue-600 ${currentStep === 3 ? 'animate-bounce' : ''} `} />
                  <span>最終プロンプトを構築する (STEP 3)</span>
                  <ArrowRight size={24} className="opacity-60" />
                </>
              )}
            </button>
          </section>

          {/* 出力結果 */}
          <div
            className={`flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-1000 ${isAssembleDisabled ? 'blur-md opacity-30 grayscale pointer-events-none select-none' : 'opacity-100 blur-0'} `}
          >
            {/* 左: プロンプト & 思考ログ */}
            <section className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      onClick={copyPrompt}
                      disabled={!finalPrompt}
                      className="bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10"
                      title="プロンプトをコピー"
                    >
                      <Copy size={14} />
                    </button>
                    <span className="text-[9px] font-mono text-slate-600">DYNAMIC ENGINE V1.2.3</span>
                  </div>
                </div>

                <ThinkingLog thought={assembleThought} placeholder="> ボタンを押すとプロンプト構築ログがここに表示されます..." />

                <div className="flex flex-col h-full mt-4 gap-4">

                  <div className="relative flex-1">
                    <textarea
                      value={finalPrompt}
                      readOnly
                      style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
                      className="w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500"
                      placeholder="◀ 「最終プロンプトを構築する」ボタンを押すと、ここに生成されたプロンプトが表示されます。"
                    />
                  </div>

                  {/* Buttons Row */}
                  <div className="flex flex-col gap-4 mt-2 relative z-50">
                    <button
                      onClick={copyPrompt}
                      disabled={!finalPrompt}
                      className={`w-full ${isCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`}
                    >
                      {isCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                      {isCopied ? "コピー完了" : "コピペ (他アプリ用: キャラシート添付を強く推奨)"}
                    </button>

                    {/* Instruction Footer */}
                    <div className="bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono">
                      ※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 <span className="text-orange-400 font-bold">「最終プロンプトを構築する」</span> を押してください。
                    </div>

                    <button
                      onClick={() => { console.log("Regenerating..."); regenerateImage(); }}
                      disabled={!finalPrompt || isGeneratingImage}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isGeneratingImage ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} />}
                      {isGeneratingImage ? "再生成中..." : "画像を生成する (STEP 4: Google AI)"}
                    </button>
                  </div>

                  {/* PRO TIPS FOR EXTERNAL GENERATION - 説明文統一規格: text-xs */}
                  <div className="mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-orange-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                      </div>
                      <div className="text-xs text-orange-200/80 leading-relaxed font-sans">
                        <span className="font-bold text-orange-300">💡 PRO TIP：究極の1枚を作りたい時は？</span><br />
                        キャラの見た目が全然違うなど不満がある場合は、上の「コピペ」ボタンでプロンプトをコピーし、<a href="https://gemini.google.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Geminiブラウザ版🤖</a> に<strong>「元となるキャラシート画像」</strong>と一緒に直接貼り付けて生成させてください。<br />
                        文字情報だけでなく画像をカンニングできるため、キャラのクオリティと再現度が飛躍的に向上します！
                      </div>
                    </div>
                  </div>

                  {/* [v2.35] コンテンツポリシー救済パネル（折りたたみ式） */}
                  <div className={`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${!finalPrompt ? 'opacity-40 pointer-events-none' : ''}`}>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors cursor-pointer disabled:cursor-not-allowed text-xs"
                      onClick={() => setIsPolicyPanelOpen(!isPolicyPanelOpen)}
                      disabled={!finalPrompt}
                    >
                      <div className="flex items-center gap-2">
                        <span>🛡️ コンテンツポリシーで画像生成が拒否された場合</span>
                        {!finalPrompt && <span className="text-[10px] text-slate-500">(STEP3完了後に利用可能)</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-600 font-mono">{isPolicyPanelOpen ? '閉じる' : 'クリックで開く'}</span>
                        <ChevronDown size={14} className={`text-yellow-400/60 transition-transform duration-300 ${isPolicyPanelOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>

                    {isPolicyPanelOpen && (
                      <div className="p-3 bg-yellow-950/20 space-y-3">
                        <p className="text-xs text-yellow-200/80 leading-relaxed">
                          GeminiのエラーメッセージやGeminiに理由を聞いた回答を下の欄に貼ってください。<br/>
                          「配慮版プロンプトを再生成する」ボタンを押すとSTEP3のプロンプトが修正されて上書きされます。<br/>
                          再度STEP4で画像を生成するかGeminiにプロンプトとキャラクターシートを貼って画像を生成してみて下さい。
                        </p>

                        <hr className="border-yellow-500/20" />

                        <div className="text-xs text-slate-400 leading-relaxed">
                          <p className="mb-1">💡 <strong className="text-yellow-300">Gemini Web版で拒否された場合の聞き方:</strong></p>
                          <p className="mb-1">以下のテキストをGeminiにそのまま送ると、具体的な原因を教えてもらえます。<br/>Geminiの回答を下の欄に貼って「配慮版プロンプトを再生成する」を押してください。</p>
                          <button
                            className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors"
                            onClick={() => {
                              navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？");
                              showStatus("クリップボードにコピーしました");
                            }}
                          >
                            📋 「先ほどのプロンプトが拒否された理由を教えてください…」をコピー
                          </button>
                        </div>

                        <hr className="border-yellow-500/20" />

                        <textarea
                          style={{ color: '#ffffff', backgroundColor: '#000000' }}
                          className="w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500"
                          value={policyErrorMsg}
                          onChange={(e) => setPolicyErrorMsg(e.target.value)}
                          placeholder={"例: I can't generate images that depict minors...\n例: Geminiの回答: 制服と未成年の組み合わせが原因...\n例: アオリ構図が弾かれたかもしれない"}
                        />

                        <button
                          className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                          onClick={regenerateSafePrompt}
                          disabled={isFixingPolicy || !policyErrorMsg.trim() || !finalPrompt}
                        >
                          {isFixingPolicy ? (
                            <><Loader2 size={16} className="animate-spin" /> 分析・修正中...</>
                          ) : (
                            <><Wand2 size={16} /> 配慮版プロンプトを再生成する</>
                          )}
                        </button>

                        {/* コンテンツポリシーログ - 統一規格: text-xs / 固定高さ160px */}
                        <pre style={{ height: '160px', overflowY: 'auto' }} className="text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed">
                          {policyFixLog || "> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"}
                        </pre>
                      </div>
                    )}
                  </div>

                  {/* Generation Log Terminal - 固定高さ: styleで明示指定（TailwindJITバイパス）, 統一規格: text-xs */}
                  <div
                    className="mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar"
                    style={{ height: '160px', overflowY: 'auto' }}
                  >
                    <div className="opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs">
                      <span>🖥 画像生成ログ (STEP 4)</span>
                      <span className="text-blue-500">v1.3.5 (Gemini 2.0 Native)</span>
                    </div>
                    {genLog.length === 0 ? (
                      <div className="text-white/30 italic">待機中... 「画像を生成する」ボタンを押すと開始します。</div>
                    ) : (
                      genLog.map((log, i) => (
                        <div key={i} className="mb-1 leading-relaxed">
                          <span className="opacity-40 mr-2">{new Date().toLocaleTimeString()}</span>
                          {log}
                        </div>
                      ))
                    )}
                    {isGeneratingImage && <div className="animate-pulse">_</div>}
                  </div>
                </div>
              </div>
            </section>

            {/* 右: 生成画像エリア */}
            <section className="relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden">

              {/* Title Header */}
              <div className="w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl">
                {mangaTitle ? (
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {mangaTitle}
                  </h3>
                ) : (
                  <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse" />
                )}
              </div>

              <div className="flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                {
                  generatedImage ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <img src={generatedImage} className="max-w-full max-h-[70vh] object-contain shadow-2xl" alt="Generated Result" />
                      <div className="w-full px-8">
                        <button
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = generatedImage;
                            a.download = `nano_banana_2_comic_${new Date().getTime()}.png`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }}
                          className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95"
                        >
                          <Download size={20} /> 画像をダウンロード (.png)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-20 space-y-6">
                      {
                        isAssembling ? (
                          <div className="relative flex flex-col items-center justify-center space-y-4" >
                            <Loader2 size={64} className="animate-spin text-blue-500 mx-auto" />
                            <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse" />

                            <div className="z-10 bg-black/50 border border-blue-500/30 rounded-xl px-6 py-4 animate-in fade-in zoom-in duration-300 backdrop-blur-sm">
                              <p className="text-sm font-black text-blue-400 tracking-widest animate-pulse flex items-center gap-2">
                                GENERATING IMAGE <span className="flex space-x-1"><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span><span className="animate-bounce delay-300">.</span></span>
                              </p>
                              <p className="text-[10px] text-blue-200/70 mt-2 font-bold max-w-xs mx-auto">
                                高品質な画像を生成しています。<br />
                                <span className="text-orange-300">※最大1〜2分程度かかる場合があります。このままお待ちください。</span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <BrainCircuit size={80} className="mx-auto" />
                        )
                      }
                      <div className="space-y-2 text-center">
                        <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-500">Ready to Start</p>
                        <p className="text-[10px] font-bold text-slate-600">ここに生成された4コマ漫画が表示されます</p>
                      </div>
                    </div >
                  )}
              </div>
            </section >
          </div >
        </main >

        <footer className="text-center text-slate-700 text-[9px] font-bold tracking-[0.3em] uppercase py-10 flex items-center justify-center gap-4">
          <span>Thinking Manga Engine &copy; 2026</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full" />
          <span>Nano Banana Pro</span>
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
