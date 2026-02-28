import React, { useState, useRef, useEffect } from 'react';

// CANARY TEST
console.log("HELLO_USER_FIXED_VERSION_1_8_36");

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
  Download
} from 'lucide-react';
// --- Imports ---
import { setApiKey, getApiKey, callThinkingGemini } from './lib/gemini';
import { generateImageWithImagen } from './lib/imagen';

const SYSTEM_VERSION = "v2.04.0 Alpha";

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


// --- Thinking Log Component ---
const ThinkingLog = ({ thought }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thought]);

  if (!thought) return null;
  return (
    <div className="w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs h-[180px] overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
      <div className="flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold">
        <BrainCircuit size={16} /> Neural Process (Thinking Mode)
      </div>
      <div ref={scrollRef} className="h-[120px] overflow-y-auto custom-scrollbar text-blue-100 leading-relaxed whitespace-pre-wrap font-mono text-[10px] scroll-smooth">
        {thought}
        <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />
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
          <h1>⚠️ SYSTEM CRASH (v1.8.47 Alpha)</h1>
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

  const SYSTEM_VERSION = "v2.2.NaN Alpha"; // [ZENITH UPGRADE]
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
  const [isGenerationError, setIsGenerationError] = useState(false);

  // Thoughts
  const [analyzeThought, setAnalyzeThought] = useState("");
  const [scenarioThought, setScenarioThought] = useState("");
  const [assembleThought, setAssembleThought] = useState("");

  const [status, setStatus] = useState("");
  const [colorMode, setColorMode] = useState("auto");
  const [isDragging, setIsDragging] = useState(false);
  const [genLog, setGenLog] = useState([]); // New Log State

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
    setAnalyzeThought("Visual Cortex Protocols Initiated...\n> Scanning pixel data arrays...\n> Identifying character morphologies...");

    // Fake Streaming Effect for user engagement
    const thinkTimer = setInterval(() => {
      setAnalyzeThought(prev => {
        if (prev.length > 800) return prev;
        const messages = [
          ".", ".", ".",
          "\n> Extracting facial landmarks...",
          "\n> Analyzing hair topology vectors...",
          "\n> Detecting fashion attributes...",
        ];
        return prev + messages[Math.floor(Math.random() * messages.length)];
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
        /* TARGET: Analyze ONLY the currently uploaded image. Do not recall past sessions. */
        
        あなたはプロの漫画家兼キャラクターデザイナー（解析特化）です。
        以下の「絶対厳守ルール」に従い、現在の画像のみを解析してください。

        【0. 画像スタイル判定 (Style Detection)】
        ・**最初に必ず「STYLE_TAG: MONOCHROME」または「STYLE_TAG: COLOR」と出力せよ。**

        【1. キャラクター数と同一性の完全一致 (Count & Identity)】
        ・画像内の**「固有名を持つキャラ」**を全てリストアップせよ。入力画像が複数ある場合、**全ての画像を確認し、全キャラクターを抽出せよ**。絶対に1人で止まるな。

        【2. 特徴の超精密分解 (High-Fidelity Decomposition)】

        A. **【性別と年齢 (Gender & Age)】**:
           - **最重要**: 性別を間違えるな。ショートカットの女性を男性と誤認するな。
           - 女性なら (female:1.6), (girl:1.4)、男性なら (male:1.6), (boy:1.4) を必ず付与せよ。
           - 年齢感も記述せよ (teenager, adult, elderly child)。

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
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (teenager:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** （※眼鏡無しなら **(no glasses:1.5)** を絶対付与） |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (sailor uniform:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | **[WEIGHTS]: (cheerful:1.3), (energetic:1.2)** （※英語の性格タグを必須で記述） |
      `;


      const result = await callThinkingGemini(prompt, imageParts, null, (msg) => {
        setAnalyzeThought(prev => prev + `\n> ${msg}`);
      });
      setCastList(result.text);
      setUsedModel(result.model); // [v1.7.0] Track Model
      setAnalyzeThought(result.thought || "思考プロセスが完了しました。");
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
             - 「メイン2人だけ」のような手抜きは禁止。全員に役割を与え、画面を賑やかにすること。
             - 人数が多い場合は、1コマに複数人を詰め込んで密度の高い会話劇にせよ。
             - **【キャラ設定の完全保持】**: 提供された各キャラクターの属性（例: ギャル、オタク、優等生、ツッコミ役など）や固有の口調を絶対に混同するな。「Aキャラクター」と「Bキャラクター」の口調や性格が入れ替わるなどのエラーを厳格に禁止する。与えられた文字情報（性格設定）に完全に忠実なセリフを書け。
 
         1. **「原則: 語るな、見せろ」 (Show, Don't Tell... but Explain Briefly)**:
            - 絵での表現が最優先。補足説明は許可するが、**「短く、簡潔に」**行え。
            - 長文の自分語りや、説明調のセリフは厳禁。読者の読む気を削ぐな。
 
         2. **テキストの量的制限 (Compact Text Quantity)**:
            - **厳守**: 1コマあたりのフキダシは**「最大2つまで」**。
            - セリフは**「短い一文」**に収めよ（例: 「なんだって！？」OK、「それはつまり...ということなのか？」NG）。
            - **禁止**: セリフ内に「(怒って)」「(笑いながら)」等のト書き・感情描写を入れるな。絵で表現せよ。
           - 画面の80%以上は「絵」でなければならない。文字で埋め尽くすな。

        3. **オチと構図の多様化 (Variety Constraints)**:
           - **必須**: 「手前に大きく顔があるキャラ」「奥で小さく驚くキャラ」など、**遠近感**を強調せよ。棒立ちは厳禁。
           - **オチ**: 「全員泣いて終わり」等のワンパターンを禁止。シュールな静寂、無言の圧力、社会的死など多様にせよ。
           
        3. **4コマ目の演出**:
           - 必ずしもデフォルメ（SD）にする必要はない。ネタがシリアスなら、**劇画調のリアルな絶望顔**で落としても良い。ネタに合わせてスタイルを適応させよ。

        【出力フォーマット（絶対厳守・会話禁止）】
        返答、挨拶、説明（「分かりました」「以下がシナリオです」等）は **一切出力しないこと**。
        以下の独自フォーマット **のみ** を出力してください。Markdownのコードブロックも不要です。

        Topic: [ニュースの見出し（15文字以内）]
        Location: [${customLocation.trim() ? "必ず『" + customLocation.trim() + "』にせよ" : "ニュースの内容に即した舞台（例: 砂漠、法廷、宇宙）。※教室は禁止"}]
        Scenario:
        [1コマ目: 起]
        (状況とセリフ...)

        [2コマ目: 承]
        (状況とセリフ...)

        [3コマ目: 転]
        (状況とセリフ...)

        [4コマ目: 結]
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
      setIsSearching(false);
    }
  };

  // --- Step 3: Prompt Assembly (Super FURU v121.3) ---
  const assemblePrompt = async () => {
    if (!castList || !scenario) return showStatus("キャストとシナリオが必要です。");
    setIsAssembling(true);
    setFinalPrompt(""); // Clear previous prompt to indicate loading
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

      const dynamicCamera = `
    CRITICAL COMPOSITION & GAG MANGA RULES:
    1. Do NOT draw characters just standing neutrally or looking directly at the camera. They MUST interact with each other.
    2. Always use dynamic and extreme camera angles: worm's-eye view, bird's-eye view, or tilted dutch angles. Use extreme perspective distortion (fisheye or ultra-wide lens) for dramatic effect. Avoid flat, boring shots.
    3. [GAG VFX]: Use comic visual effects, but DO NOT over-use speedlines (action lines) unless it is a high-action scene. Add giant anime sweat drops, popping veins, or abstract backgrounds for punchlines/reactions. 
    4. [EXAGGERATED EMOTIONS]: FORCE extreme, comical, and highly exaggerated facial expressions! Do NOT draw neutral or slightly smiling faces. Exaggerate expressions (blank white eyes, jaw-dropping shock, intense fury, crying waterfalls) while strictly maintaining top-tier, beautiful anime art quality.
    5. [BODY ACTING]: Characters must physically react with their entire bodies (throwing arms up, falling, etc.). Exaggerate their gestures to the absolute limit. Do NOT over-use the "adjusting glasses" pose unless the character is explicitly wearing glasses.
    `;

      const cleanTopic = scenario.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim() || scenario.split('\n')[0].substring(0, 20);

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
        "Dramatic Close-up on eyes", // Keep one close-up for dramatic moments, but dilute its probability
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
          if (m) validCharacters.push(m[1].trim());
        });

        const formattedBubbles = [];
        let bubbleCount = 1;

        lines.forEach(line => {
          // Check if line indicates dialogue
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          let isDialogue = false;
          let speaker = "Speaker";
          let clean = line;

          if (match && match[1].trim()) {
            let tempSpeaker = match[1].replace(/^(SFX|効果音|BGM|Action)/i, '').trim();
            tempSpeaker = tempSpeaker.replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();

            // Validate if speaker is an actual character or generic known speaker
            if (validCharacters.some(c => tempSpeaker.includes(c) || c.includes(tempSpeaker)) || tempSpeaker === "全員" || tempSpeaker === "Speaker") {
              speaker = tempSpeaker;
              isDialogue = true;
            }
          } else if (line.trim().startsWith('「')) {
            isDialogue = true;
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
              formattedBubbles.push(`(Speech Bubble ${bubbleCount} by ${speaker}: "${clean}")`);
              bubbleCount++;
            }
          }
        });

        if (formattedBubbles.length === 0) {
          return "(No speech bubble) (CRITICAL: Do NOT draw any speech bubbles or text. Emphasize character facial expressions, body language, and environmental atmosphere instead.)";
        }
        return formattedBubbles.join(', ');
      };

      const extractActionOnly = (fullPanelText, placementRule = "") => {
        const lines = fullPanelText.split('\n');

        const validCharacters = [];
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) validCharacters.push(m[1].trim());
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

        let actionStr = actionLines.join(' ').trim() || "Characters interacting dynamically based on dialogue.";

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

      const extractPlacementRule = (fullPanelText) => {
        const lines = fullPanelText.split('\n');
        const dialogLines = lines.filter(line => line.includes('：') || line.includes(':') || line.includes('「'));
        const speakers = [];
        dialogLines.forEach(line => {
          const match = line.match(/^(.*?)(?:[:：]|「)/);
          if (match && match[1].trim()) {
            let speaker = match[1].replace(/^(SFX|効果音|BGM|Action|\(.*?\))/gi, '').replace(/^[【\[（(]/, '').replace(/[】\]）)]$/, '').trim();
            if (speaker && !speakers.includes(speaker)) {
              speakers.push(speaker);
            }
          }
        });
        if (speakers.length >= 2) {
          return `CRITICAL PLACEMENT: ${speakers[0]} MUST be drawn on the RIGHT side. ${speakers[1]} MUST be drawn on the LEFT side.`;
        } else if (speakers.length === 1) {
          return `CRITICAL PLACEMENT: ${speakers[0]} is the main focus of this panel.`;
        }
        return `CRITICAL PLACEMENT: Follow the natural dialogue flow.`;
      };

      // [v2.04] Anti-Cloning Constraint: Count characters strictly and enforce isolated presence rules per panel
      const extractCastLimitRule = (fullPanelText) => {
        const charsInPanel = new Set();
        const lines = fullPanelText.split('\n');

        // Find valid cast names
        const validCharacters = [];
        castList.split('\n').forEach(cLine => {
          const m = cLine.replace(/\*\*/g, '').trim().match(/^##\s*(?:\d+\.\s*)?(.*)/);
          if (m) {
            const nameOnly = m[1].trim().split('(')[0].trim().split('（')[0].trim();
            if (nameOnly) validCharacters.push(nameOnly);
          }
        });

        // Scan panel text for mentions of valid cast
        lines.forEach(line => {
          validCharacters.forEach(c => {
            if (line.includes(c)) charsInPanel.add(c);
          });
        });

        const charsArray = Array.from(charsInPanel);
        if (charsArray.length === 0) return "";
        const formattedNames = charsArray.map(c => `[${c}]`).join(' and ');
        return `CRITICAL CAST LIMIT: ONLY draw ${formattedNames} in this panel. Do NOT draw any background characters. The total number of people in this panel MUST be exactly ${charsArray.length}.`;
      };

      const VAR_PANEL_1_KI = `(Camera: ${getRandomAngle()}), (Background: ${cleanLocation}), (Action: ${extractActionOnly(panel1Text)}), ${extractDialogueOnly(panel1Text)}`;
      const VAR_PANEL_2_SHO = `(Camera: ${getRandomAngle()}), (Background: ${cleanLocation}), (Action: ${extractActionOnly(panel2Text)}), ${extractDialogueOnly(panel2Text)}`;
      const VAR_PANEL_3_TEN = `(Camera: ${getRandomAngle()}), (Background: ${cleanLocation}), (Action: ${extractActionOnly(panel3Text)}), ${extractDialogueOnly(panel3Text)}`;
      // [v1.9.5] Clean up Cast List to extract ONLY visual tags, removing all Japanese text
      // This prevents the AI from hallucinating Japanese text onto the canvas based on personality descriptions.
      let cleanCastData = "";
      let currentCharacter = "";
      const castLines = castList.split('\n');
      for (let i = 0; i < castLines.length; i++) {
        const line = castLines[i].replace(/\*\*/g, '').trim();
        if (line.startsWith('## ')) {
          currentCharacter = line.replace(/^##\s*(?:\d+\.\s*)?/, '').trim();
          cleanCastData += `\n- Character [${currentCharacter}]: `;
        }
        const tagsMatch = line.match(/(?:\[WEIGHTS?\]|\[weighted tags\]):\s*(.*?)(?:\||$)/i);
        if (tagsMatch && currentCharacter) {
          let tags = tagsMatch[1].trim();
          if (tags && tags !== "()" && tags !== "-") {
            cleanCastData += tags + ", ";
          }
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
At the very top of the page, draw a large, bold, black Japanese text title that says: "${safeTopic}".
Draw a tiny English watermark text exactly ON the bottom-right border of the 4th panel: "Generated by Super FURU AI 4-koma System ${SYSTEM_VERSION}". Do NOT add extra white space below the 4th panel for the watermark.

CRITICAL PANEL SIZE COMMAND: The canvas MUST be divided into exactly 4 EQUAL horizontal panels stacked vertically from top to bottom. All 4 panels MUST be the EXACT SAME height and EXACT SAME width.
The art style is: ${styleCore}.
(Apply dramatic anime cinematic lighting and high-budget visual effects, but do not clutter the screen with excessive speedlines).

Overall Setting: ${safeLocation}.

CRITICAL VISUAL REPRODUCTION PROTOCOL:
If an image is attached, you MUST reproduce the character designs from the attached reference image with 100% absolute fidelity. You MUST strictly confirm and maintain every detail: exact hairstyle, hair color, and the presence or absence of glasses for every character in every panel.

Important Character Cast:
${VAR_CAST_LIST}
${customOutfit.trim() ? `All characters are wearing: ${customOutfit.trim()}.` : ''}

Camera and Composition Rules:
${dynamicCamera}
CRITICAL ANTI-CLONING RULE: NEVER draw the exact same character twice inside a single panel. A character can only appear ONCE per panel.


## Panel 1 (Top)
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
${extractPlacementRule(panel1Text)}
${extractCastLimitRule(panel1Text)}
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${extractActionOnly(panel1Text, extractPlacementRule(panel1Text))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel1Text)}.

## Panel 2
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
${extractPlacementRule(panel2Text)}
${extractCastLimitRule(panel2Text)}
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${extractActionOnly(panel2Text, extractPlacementRule(panel2Text))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel2Text)}.

## Panel 3
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
${extractPlacementRule(panel3Text)}
${extractCastLimitRule(panel3Text)}
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${extractActionOnly(panel3Text, extractPlacementRule(panel3Text))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel3Text)}.

## Panel 4 (Bottom)
Camera: ${getRandomAngle()} (Ensure camera is NOT flat eye-level).
${extractPlacementRule(panel4Text)}
${extractCastLimitRule(panel4Text)}
Visual Action (Do NOT write this as text on the canvas, draw it visually): ${extractActionOnly(panel4Text, extractPlacementRule(panel4Text))}.
Dialogue (ONLY write this inside speech bubbles): ${extractDialogueOnly(panel4Text)}.

Important constraints:
- Ensure the characters accurately reflect classic anime styles.
- Do NOT merge panels. Keep 4 distinct panels with white gutters between them.
- Do NOT write situation/narration explanations as text on the screen. The Visual Action must only be illustrated.
- Write the Japanese spoken text clearly inside white manga speech bubbles.
- Do NOT add random English text except for the watermark.
- Maintain character consistency across all 4 panels.
- Flow is from top panel to bottom panel.
- Ensure the watermark is positioned at the absolute bottom edge of the image, with no extra whitespace below it.
      `;

      // Wait a bit to simulate processing/syncing (Important for User Experience)
      await new Promise(resolve => setTimeout(resolve, 800));

      setFinalPrompt(constructedPrompt.trim());
      setAssembleThought(prev => prev + "\n> Optimization Vectors: CALCULATED.\n> Structure Lock: ACTIVE.\n> Satire Logic: REINFORCED.\n> [SUCCESS] Final Prompt Grid Assembled.");
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
    if (isAssembling || !finalPrompt) return;
    setIsAssembling(true);
    setIsGenerationError(false);
    setGenLog(["[SYSTEM] Sequence Started: Initializing generation protocols...", "[SYSTEM] Locking prompt parameters..."]);

    // Artificial delay to ensure user sees the process starting
    await new Promise(r => setTimeout(r, 800));

    try {
      showStatus("Google AI (Gemini/Imagen) に送信中...");
      setGenLog(prev => [...prev, "[NET] Establishing secure connection to Google Cloud...", "[NET] Uploading prompt payload (v88.1)..."]);

      await new Promise(r => setTimeout(r, 1000)); // More visibility

      const statCallback = (msg) => {
        setGenLog(prev => [...prev, msg]);
      };

      const { base64Img, usedModel: generatedModelId } = await generateImageWithImagen(finalPrompt, statCallback);
      setGenLog(prev => [...prev, `[SUCCESS] Data stream received from Generation API (${generatedModelId}).`, "[RENDER] Decoding Base64 image data...", "[RENDER] Rendering final canvas..."]);

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
        guideLines = [
          "[ERROR GUIDE] 🚨 プロンプトがAIの安全基準（NSFW等の検閲）に引っかかり、生成が拒否されました。",
          "[ERROR GUIDE] 【対処法】「シナリオ」や「キャラクター設定」の中に、センシティブ・不適切な単語（服が破ける、過激な暴力、露骨な表現など）が含まれていないか確認し、削除して再試行してください。"
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
      setIsAssembling(false);
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

                {/* 場所・服装設定プレビューは grid 外へ移動済み */}

              </div>
            </section>
          </div>

          {/* 場所・服装設定プレビュー - STEP2以降のみ表示 */}
          <div className={`bg-[#1a1625] border border-blue-500/30 p-4 pb-5 rounded-xl flex flex-col gap-3 text-xs font-mono shadow-inner transition-all duration-300
            ${currentStep < 2 ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
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

                <ThinkingLog thought={assembleThought} />

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
                    <div className="bg-slate-900 border-t border-white/10 p-2 text-[10px] text-slate-500 text-center font-mono">
                      ※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 <span className="text-orange-400 font-bold">「最終プロンプトを構築する」</span> を押してください。
                    </div>

                    <button
                      onClick={() => { console.log("Regenerating..."); regenerateImage(); }}
                      disabled={!finalPrompt || isAssembling}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait"
                    >
                      {isAssembling ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} />}
                      {isAssembling ? "再生成中..." : "画像を生成する (STEP 4: Google AI)"}
                    </button>
                  </div>

                  {/* PRO TIPS FOR EXTERNAL GENERATION */}
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

                  {/* Generation Log Terminal */}
                  <div className="mt-4 p-4 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 h-32 overflow-y-auto">
                    <div className="opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between">
                      <span>KERNEL LOG MONITOR</span>
                      <span className="text-[10px] text-blue-500">v1.3.5 (Gemini 2.0 Native)</span>
                    </div>
                    {genLog.length === 0 ? (
                      <div className="text-white/30 italic">Ready to generate...</div>
                    ) : (
                      genLog.map((log, i) => (
                        <div key={i} className="mb-1">
                          <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                          {log}
                        </div>
                      ))
                    )}
                    {isAssembling && <div className="animate-pulse">_</div>}
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
