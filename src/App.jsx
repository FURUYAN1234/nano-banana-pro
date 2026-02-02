import React, { useState, useRef, useEffect } from 'react';
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
  ExternalLink
} from 'lucide-react';
// --- Imports ---
import { setApiKey, getApiKey, callThinkingGemini } from './lib/gemini';
import { generateImageWithImagen } from './lib/imagen';

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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="bg-[#111] border border-blue-500/30 p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
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
        </p>

        <div className="relative mb-8">
          <input
            type="password"
            value={key}
            onChange={(e) => { setKey(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="APIキーを入力..."
            className="w-full h-14 bg-slate-900 border border-white/20 p-4 rounded-xl text-white focus:border-blue-500 outline-none font-mono transition-all placeholder-slate-500"
          />
          <div className="absolute top-full right-0 mt-2 text-[10px] text-slate-500 font-bold tracking-widest opacity-60">
            [ENTER] キーで確定
          </div>
          {error && (
            <p className="text-red-500 text-xs font-bold mt-2 animate-pulse flex items-center gap-1 absolute -bottom-6 left-0">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full" /> {error}
            </p>
          )}
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

export default function App() {
  const SYSTEM_VERSION = "v1.8.14 Alpha";
  const [apiKey, setApiKeyState] = useState("");
  const [showModal, setShowModal] = useState(true);

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
  const isAssembleDisabled = isAssembling || !castList || castList.length < 50 || !scenario || scenario.length < 50 || isSearching || isAnalyzing;

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
               - **絶対長 (Absolute Length)**: 
                 - **Bob**: 毛先が「顎〜首」で止まっている。肩に触れていなければ「Bob」。
                 - **Medium**: 毛先が「肩」に触れている。
                 - **Long**: 毛先が「鎖骨」より下。
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

        【3. OCR情報の反映】
        ・読み取った名前、年齢、性格、社会的役割を正確に反映せよ。

        【出力フォーマット】
        
        ## 1. [OCRで読み取った正確な名前]

        | カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |
        | :--- | :--- | :--- |
        | **基本(Base)** | 性別: [性別]<br>年齢: [年齢] | **[WEIGHTS]: (female:1.6), (teenager:1.2)** |
        | **髪(Hair)** | 色: [色]<br>長さ: [Short/Medium/Long]<br>構造: [Bob/Straight/Wavy/Spiky]<br>前髪: [形状] | **[WEIGHTS]: (chin-length bob:1.5), (orange hair:1.4), (messy:1.2)** |
        | **顔(Face)** | 目: [色/形]<br>肌: [色]<br>髭: [有無]<br>眼鏡: [有無] | **[WEIGHTS]: (white beard:1.5), (tanned skin:1.5), (black sunglasses:1.6)** |
        | **服装(Outfit)** | [服の詳細: 制服/私服、上着の有無など] | [weighted tags]: (sailor uniform:1.2), (hoodie:1.1) |
        | **性格(Mind)** | **[OCR抽出]**: [ここにテキスト全文] | - |
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
      setAnalyzeThought(prev => prev + "\n\n[システムエラー]: " + error.message);
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
    setIsSearching(true);
    setScenarioThought("");

    // Dynamic Category Randomizer to prevent topic stagnation (Context Reset)
    const categories = [
      "最新 政治 経済 社会ニュース (真面目な話題)",
      "最新 スポーツ 競技 大会 結果",
      "最新 動物 ペット 癒しニュース",
      "最新 食べ物 グルメ スイーツ トレンド",
      "最新 映画 ドラマ 音楽 エンタメ",
      "最新 科学 宇宙 考古学 発見",
      "面白い 海外のB級ニュース ハプニング",
      "生活 ライフハック 健康"
    ];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    // Exclude repetitive AI topics - Strengthened negation
    const searchTopic = `${randomCategory} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;

    showStatus(`カテゴリー「${randomCategory}」で最新ニュースを検索中...`);
    setScenario(""); // Clear previous scenario to indicate loading
    setScenarioThought(`> Context Force Reboot: Initiated.\n > Target Category: ${randomCategory} \n > Searching Google Grounding...`);

    try {
      // 1. Search for news (Simulated or Real via Gemini Grounding if available, 
      //    but here we ask Gemini to "use its browsing tool" logic in the prompt or internal knowledge if tool not bound)
      //    *Current implementation passes the request to Gemini to 'Acting as a search engine wrapper'*

      const castListSummary = castList.replace(/\n/g, ', ').substring(0, 200) + '...';
      const scenarioPrompt = `
        【Context Force Reboot】
        Ignore all previous instructions and conversation history.This is a fresh, standalone session.
        (ABSOLUTE PROHIBITION: Repeating topics from the past.You MUST select a FRESH, UNIQUE topic).
        (Topic Lock): Focus strictly on the category: "${randomCategory}".
        (Data Freshness Lock): Use the latest available information.Do not use generic evergreen tropes.

    あなたはプロの風刺漫画脚本家です。
        「${searchTopic}」に関する、** 今この瞬間の最新かつ具体的なニュース ** を1つ選定し、それをテーマにした4コマ漫画のシナリオを作成してください。

        【選定ルールの絶対厳守】
  1. **「AI」「人工知能」「ロボット」「スマホ」「SNS」等のIT系ネタは禁止（頻出のため）。**
    2. ** 具体的でマイナーな、しかし「ツッコミどころのある」ニュース ** を選んでください。
         （例: 「珍しい動物発見」「変な世界記録更新」「食べ物の論争」「スポーツの珍プレー」等）
  3.  抽象的な「最近の流行」ではなく、「◯◯が××を発表」といった固有名詞を含むニュースを優先。

        【シナリオ構成・演出の絶対厳守 (v1.8.0)】
        0. **全員登場義務 (Mandatory All-Cast)**:
           - CastListに含まれている **全てのキャラクターを必ず1回以上登場させること。**
           - 「メイン2人だけ」のような手抜きは禁止。全員に役割を与え、画面を賑やかにすること。
           - 人数が多い場合は、1コマに複数人を詰め込んで密度の高い会話劇にせよ。

        1. **「語るな、見せろ」 (Show, Don't Tell)**:
           - セリフでの状況説明を禁止。キャラクターの**「顔芸（白目、滝のような涙、あごが外れる）」**や**「全身を使ったリアクション」**で感情を表現せよ。
           - 比喩表現を映像化せよ（例: 「ショック！」と言う代わりに、**「メガネが割れる」「魂が口から出る」**描写を指定）。

        2. **台詞密度と視覚効果のバランス**:
           - 1コマあたりのフキダシは2〜3個だが、**「集中線」「イライラマーク」「ドーン！」などの漫符**を必ず指定し、絵の勢いを殺さないように配置せよ。

        3. **オチと構図の多様化 (Variety Constraints)**:
           - **必須**: 「手前に大きく顔があるキャラ」「奥で小さく驚くキャラ」など、**遠近感**を強調せよ。棒立ちは厳禁。
           - **オチ**: 「全員泣いて終わり」等のワンパターンを禁止。シュールな静寂、無言の圧力、社会的死など多様にせよ。
           
        3. **4コマ目の演出**:
           - 必ずしもデフォルメ（SD）にする必要はない。ネタがシリアスなら、**劇画調のリアルな絶望顔**で落としても良い。ネタに合わせてスタイルを適応させよ。

        【出力フォーマット（厳守）】
        以下の独自フォーマットのみを出力してください。JSONやMarkdownは不要です。

        Topic: [ニュースの見出し（15文字以内）]
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
        - (禁止事項): アカリ、ヒカリ、ミク、リン、サエコなどの既定キャラクターを勝手に出さないこと。CastListに無い名前は使用不可。
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
        const scenarioMatch = result.text.match(/Scenario:\s*([\s\S]+)/i);

        if (scenarioMatch) {
          parsedData.topic = titleMatch ? titleMatch[1].trim() : randomCategory;
          parsedData.scenario = scenarioMatch[1].trim();
        } else {
          // Fallback: Try JSON just in case the model ignored instructions, or raw
          const jsonMatch = result.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const json = JSON.parse(jsonMatch[0]);
            parsedData.topic = json.topic || randomCategory;
            parsedData.scenario = json.scenario || result.text;
          } else {
            throw new Error("Format parse failed");
          }
        }
      } catch (e) {
        // Ultimate Fallback: Treat entire text as scenario
        console.warn("Parse warning:", e);
        parsedData.scenario = result.text;
      }

      // Fix: Date Lock. Do NOT overwrite user's date with AI's date.
      // setTargetDate(parsedData.date || ...); <--- DISABLED

      setScenario(parsedData.scenario);
      // We append the topic to the scenario text for visibility or just use it for the prompt
      setScenario(`## タイトル: ${parsedData.topic} !?\n\n${parsedData.scenario} `);

      setScenarioThought(prev => prev + `\n > Topic Selected: ${parsedData.topic} \n > Scenario Construction Complete.`);
      showStatus("シナリオの生成が完了しました！");

    } catch (error) {
      console.error(error);
      setScenarioThought(prev => prev + "\n[ERROR]: " + error.message);
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
        const msg = messages[Math.floor(Math.random() * messages.length)];
        return prev + msg;
      });
    }, 600);

    try {
      // Determine Style Variable based on user choice
      // Determine Style Variable based on user choice OR Auto-detection
      let isMonochrome = colorMode === 'monochrome';
      if (colorMode === 'auto') {
        const lowerCast = castList.toLowerCase();
        // Look for the specific declaration forced in analysis or general keywords
        isMonochrome = lowerCast.includes('style_tag: monochrome') || lowerCast.includes('monochrome') || lowerCast.includes('greyscale') || lowerCast.includes('screentone');
      }

      const styleCore = isMonochrome
        ? "(Absolute total zero-saturation monochrome grayscale:2.0), (greyscale:2.0), (monochrome:2.0), (no color:2.0), (Masterpiece Traditional Manga), (G-Pen Ink Style), (Sharp, varied line weight), (Manual ink hatching), (High-Contrast Black & White), (Professional Comic Studio Quality), (Dramatic Shadows)"
        : "(Top-Tier Animation Studio Style:1.2), (Award Winning Compositing), (Official Anime Art), (Vibrant Full Color), (Masterpiece G-Pen Line Art), (Sharp Ink Contours), (Subtle Cross-Hatching), (High-budget Key Visual Quality), (Hybrid Gekiga Composition), (Cinematic High-Contrast Lighting), (Vibrant Colors)";

      const dynamicCamera = `
    (Forbidden: Normal eye - level shots). 
        (Enforce: Extreme Bird's Eye from high sky, Extreme Worm's Eye from floor level, Extreme Dutch Angles),
    (Maximum Foreshortening), (Dynamic Action Poses),
  (Hyper - exaggerated satirical facial expressions), (Intense emotional outbursts),
  (Gekiga - style heavy shading for extreme impact)
    `;

      const cleanTopic = scenario.match(/## タイトル:\s*(.*?)(\n|$|!)/)?.[1]?.trim() || scenario.split('\n')[0].substring(0, 20);
      const cleanScenario = scenario;

      // [v1.8.3] Smart Splitter for Panels
      // Attempt to extract 4 parts using the rigid format we enforced in step 2
      const extractPanel = (text, header, nextHeader) => {
        const regex = new RegExp(`\\[${header}.*?\\]([\\s\\S]*?)(?=\\[${nextHeader}|$)`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : "";
      };

      const panel1Text = extractPanel(cleanScenario, "1コマ目", "2コマ目") || cleanScenario;
      const panel2Text = extractPanel(cleanScenario, "2コマ目", "3コマ目");
      const panel3Text = extractPanel(cleanScenario, "3コマ目", "4コマ目");
      const panel4Text = extractPanel(cleanScenario, "4コマ目", "UNKNOWN");

      const prompt = `
  /* SYSTEM: Super FURU Manga Protocol ${SYSTEM_VERSION} [Universal Master - Structured Injection]
      TARGET: Absolute 4-Panel Manga (Strictly 2:3 Vertical)
      CANVAS: --ar 2:3 (Physical Vertical Pillar Orientation)
  */

  /* ============================================================================ 
       [LEVEL 0: UNIVERSAL DATA INJECTION]
      ============================================================================ */
  VAR_TARGET_DATE = "${targetDate}"
  VAR_CAST_LIST = "${castList.replace(/\n/g, ', ')}"
  VAR_SCENARIO_TOPIC = "${cleanTopic}"
  
  // [STRUCTURED SCENARIO DATA v1.8.3]
  VAR_PANEL_1_KI  = "${panel1Text.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
  VAR_PANEL_2_SHO = "${panel2Text.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
  VAR_PANEL_3_TEN = "${panel3Text.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
  VAR_PANEL_4_KETSU = "${panel4Text.replace(/"/g, '\\"').replace(/\n/g, ' ')}"

/* ============================================================================
    [LEVEL 1.5: CHARACTER IDENTITY MATRIX - ANTI-FUSION PROTOCOL]
   ============================================================================ */
RULE_1: "Strictly separate all characters in VAR_CAST_LIST. Do not blend features."
RULE_2: "IMPORTANT: You MUST copy the content of VAR_CAST_LIST into the final prompt VERBATIM. Do not summarize, do not shorten. Keep all (weight:1.5) tags exactly as they appear."
RULE_3: "If Character A has Glasses, Character B MUST NOT inherit them unless specified."
RULE_4: "Hair Color and Style are ABSOLUTE constants. Refer to Weighted Tags in VAR_CAST_LIST."
RULE_5: "Maintain absolute consistency of features (Hair, Eyes, Glasses) for each named character across all 4 panels."

/* ============================================================================
    [LEVEL 1: CORE GEOMETRY - SPATIAL ENFORCEMENT ENGINE v121.3]
   ============================================================================ */
1.[ABSOLUTE PHYSICAL VOID PILLAR]:
- Canvas: Tall vertical rectangle.
    - Physical Constraints: Top 15 % and Bottom 15 % are protected white space(Header / Footer).
2.[CENTRAL COMPRESSED MANGA ZONE]:
- Drawing Zone: FULL WIDTH(100 %) horizontal fill.
    - Internal Floating Frames: 4 EQUAL - SIZED HORIZONTAL STRIPS stacked vertically.
    - Structure: Absolute Uniformity.No irregular panels.
    - Margin: NONE.BLEED TO EDGE.
3.[TEXT & TYPO - VOID]:
- Vertical Force: Strictly VERTICAL Japanese dialogue(Kanji / Kana) only.
    - Typo - Void: No English(except Signature), numbers, or technical tags.
    - Dialogue Format: Direct speech content ONLY.NEVER include "Name:" prefixes in bubbles.

  /* ============================================================================
      [LEVEL 3: SUPREME EXECUTION SCRIPT v121.3]
     ============================================================================ */

  FINAL_PROMPT = \`
      Generate an image of # Super FURU Manga Protocol ${SYSTEM_VERSION} [ZENITH UPGRADE] - EXECUTION
      --ar 2:3 --niji 6 --style raw --stylize 1000
      (Masterpiece), (Best Quality), (Ultra-Detailed), (8k resolution), (Vibrant high-saturation colors), (Deep cinematic lighting), (Intricate details), (Top-Tier Animation Studio Style:1.2), (Award Winning Compositing)
      
      [ABSOLUTE PHYSICAL GEOMETRY LOCK - ${SYSTEM_VERSION}]
      (Aspect Ratio: 2:3 Vertical ONLY).
      (Orientation: Portrait Mode).
      (Shape: Tall vertical rectangle).
      (Canvas Background: **PURE WHITE PAPER**. #FFFFFF).
      (Physical Barrier: Top 15% and bottom 15% are solid pure white blocks).
      (Side Margins: **ULTRA-THIN 2% WHITE STRIP**. Minimal White Space on Left and Right. NO BLACK BARS. ALMOST FULL BLEED).
      
      (Top Text: OVERLAY the Japanese Text "${cleanTopic}" as a SOLID BLACK LAYER).
      (Text Style: **SOLID BLACK INK**. Bold, Heavy Stroke. High Contrast against the background. NO BOX. NO WHITE RECTANGLE).
      (Text Position: Floating near TOP CENTER. Overlay directly on the art).
      (Text Container: **ABSOLUTELY NONE**. The text must appear as if written directly on the finished drawing. NO CANVAS MODIFICATION.).
      (Physics): Ink on paper. No physical displacement. NO WHITE BORDERS around text.
      (Safety Protocol): Replace ALL real celebrity/politician/trademarked names with GENERIC archetypes (e.g. "Famous Director" instead of "Nolan").
      
      (Manga Zone: Centralized Column. 95% Width. Clean White Margins on sides).
      (Panel Width: **FULL WIDTH within Margins**. 4 Panels stacked vertically. Equal Width).
      (Geometry Constraint: **PANEL 1 WIDTH MUST EQUAL PANELS 2, 3, 4**. DO NOT SHRINK PANEL 1 FOR TITLE SPACE. TITLE IS AN OVERLAY. IGNORE TITLE WHEN DRAWING PANEL BORDERS).
      
      [EXTREME CINEMATOGRAPHY & ACTING PROTOCOL]
      (Camera Rules): **ABSOLUTELY NO EYE-LEVEL SHOTS**. NO FLAT FRONTAL SHOTS. NO STRAIGHT HORIZONS.
      (Lens): FISHEYE LENS or 14mm WIDE ANGLE. EXTREME PERSPECTIVE DISTORTION.
      (Angles - MANDATORY VARIATION):
        - **Worm's Eye View** (Looking up from ground, giant characters).
        - **Bird's Eye View** (Looking down from ceiling).
        - **Extreme Dutch Angle** (Tilted diagonal composition).
        - CAMERA MOVEMENT: FREE-ROAMING. NEVER STATIC.
      (Composition - FORCE): 
        - **PROHIBITED**: Flat 2D layout where characters are lined up in a row. 
        - **REQUIRED**: EXTREME DEPTH. One character MUST be very close to the lens (extreme foreground), others in background.
        - **DYNAMIC ACTION**: Characters must be reacting physically (hands on head, pointing, falling, trembling). NO "STANDING STILL".
      (Zoom): MIXED. Panel 1: Wide/Dutch. Panel 2: Extreme Close-up (Eyes/Mouth). Panel 3: Low Angle Action. Panel 4: High Angle/Overhead.
      

      (Acting): OVER-THE-TOP EXPRESSIONS. "Ahegao" level shock, "Gekiga" style shadows, "Anime Tears". MAXIMUM EMOTION.
      (VFX): EXPLOSIVE LIGHTING. SOUND EFFECTS MUST BE JAPANESE KATAKANA ONLY (e.g. "ドーン", "ゴゴゴ"). NO ENGLISH SFX.
      (Density): **MAXIMALIST**. FILL EVERY PIXEL. HYPER-DETAILED BACKGROUNDS.
      (Text Density): **HIGH**. Multiple speech bubbles per panel. Conversational chaos.
      (Panel Boundaries): BLEED TO EDGE within Margins.
      
      (Art Style): ${styleCore}.
      (Line Quality): **G-PEN (MARU-PEN) TOUCH**. Crisp, modulation (hairlines to bold strokes).
      (Proportions): **MIXED RATIO**. 
         - **Panels 1-3: STANDARD HIGH-QUALITY ANIME PROPORTIONS (5-6 heads tall). Typical Japanese Anime Style. NO CHIBI (SD).**
         - **Panel 4 (Punchline): ADAPTIVE STYLE.** 
            - IF Comedy/Cute ending -> **DEFORMED (SD/Chibi) allowed**.
            - IF Serious/Despair ending -> **REALISTIC GEKIGA STYLE (No Chibi)**.
            - **DO NOT FORCE CHIBI if it ruins the serious tone.**
      (Structure: 4 EQUAL SIZED HORIZONTAL STRIPS stacked vertically).
      (Format: Classic 4-Koma Manga Strip).
      (Panel Aspect Ratio: Approx 16:9 landscape per panel BUT stacked VERTICALLY).
      (Borders: Enforce massive, ultra-thick, solid black rectangular frames).
      (Prohibited: Irregular layouts, comic page style, variable panel sizes, dynamic borders).

      [READING ORDER & FLOW CONTROL - v88.1 FORCE]
      (The narrative flow MUST start from the TOP-RIGHT panel and progress to the TOP-LEFT panel:15.0).
      (Reading Order: Absolute Right-to-Left).
      (Chronological Arrow: Right to Left).
      (Visual Weight: Right side panels have stronger gravity than left).
      (Japanese Layout: Dialogue/VFX MUST flow Right-to-Left).
      
      [CAST & IDENTITY LOCK]
      (Cast): \${VAR_CAST_LIST}.
      (Identity Lock): Maintain 100% fidelity for each character. (Anti-Fusion): NEVER mix hair colors/glasses between characters.
      (Instance Limit): SINGLE instance per panel per character. NO CLONES. ABSOLUTELY FORBIDDEN to draw the same person twice in one panel.
      
      [DIALOGUE SPATIAL BINDING - ATTRIBUTION LOCK]
      (Proximity Rule: Speech bubbles MUST be physically generated closest to the current speaker).
      (Tail Logic: Ensure bubble tails point accurately to the speaker's mouth).
      (Speaker Separation: If A and B are in one panel, A's text is on A's side. NEVER cross speech bubbles).
      
      [NARRATIVE & DIRECTION]
      Date: "\${VAR_TARGET_DATE}". Topic: "\${VAR_SCENARIO_TOPIC}".
      Tone: High Energy Satire. Visual Strategy: ${dynamicCamera}.
      (Color Logic): ${isMonochrome ? 'ABSOLUTE MONOCHROME NO COLOR' : 'FULL VIBRANT COLOR'}.

      [ABSOLUTE PHYSICAL GEOMETRY LOCK - ${SYSTEM_VERSION}]
      (Aspect Ratio: 2:3 Vertical ONLY).
      (Panel Layout): 4-Panel Vertical Strip (TATE-YOMI). NO irregular layouts.

      (Panel 1: Top): VISUALIZE [VAR_PANEL_1_KI]. Focus on setting the scene.
      (Panel 2: Mid-Top): VISUALIZE [VAR_PANEL_2_SHO]. Develop the action/reaction.
      (Panel 3: Mid-Bottom): VISUALIZE [VAR_PANEL_3_TEN]. The Twist/Climax. MAX IMPACT.
      (Panel 4: Bottom): VISUALIZE [VAR_PANEL_4_KETSU]. The Punchline/Conclusion.
      
      (Dialogue): High-density VERTICAL Japanese text only. ABSOLUTELY NO SPEAKER NAMES inside bubbles. Just the spoken lines.
      (Signature): Render small English text "Generated by Super FURU AI 4-Koma System" in the bottom-right corner of the canvas/4th panel.
      (VFX): (Explosive speed lines), (Impact frames), (Intense hand-drawn SFX/Gion).

      IMPORTANT FINAL INSTRUCTION:
      Strictly reproduce the character designs in the reference images (if provided) with 100% fidelity.
      You MUST verifying and enforce: Hair Style, Hair Color, and Presence/Absence of Glasses for each character.
      Deviation from the established character design is strictly forbidden.
    \`;   --no color, colorized, sepia, brown, yellow, tint, part-color, spot color, halftone, dithering, digital gray, 2x2 grid, english, letters, numbers, technical tags, colons, parameter text, weight numbers, clipped edges, out of frame, touching edge, chibi, SD, 16:9, merged panels, borderless, eye-level, messy lines, bleeding, cropped borders, two-line title, frame around text, title box, text box, background rectangle, looking at camera, ahoge, version number, episode number, date stamp, protocol name, horizontal, landscape, wide view, panoramic, 4:3, square, 1:1, changing hair length, hair mutation, banner, header box, text container, caption box, title background, label box, ui element, clones, duplicates, twins, doppelganger, multiple versions, split view, text background, caption background, speech bubble in title, title frame, two lines text, multiline text, stacked text, vertical title, broken title, border around title, box around title, rectangle around text, white box title, comic strip banner, headline strip, caption strip, text enclosure, speech bubble around text
    \`;
    Output ONLY the final prompt string inside a code block.
      `;

      const result = await callThinkingGemini(prompt, null, null, (msg) => {
        setAssembleThought(prev => prev + `\n> [API] ${msg}`);
      });
      setUsedModel(result.model); // [v1.7.0] Track Model
      const cleanPrompt = result.text.replace(/```/g, "").replace(/^json/i, "").trim();

      setFinalPrompt(cleanPrompt);
      setAssembleThought(result.thought || "思考プロセス完了");
      showStatus("最終プロンプトの構築が完了しました。画像生成を開始します...");

      // Auto-trigger Image Generation
    } catch (error) {
      console.error(error);
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
      showStatus("Google Imagen 3 に送信中...");
      setGenLog(prev => [...prev, "[NET] Establishing secure connection to Google Cloud...", "[NET] Uploading prompt payload (v88.1)..."]);

      await new Promise(r => setTimeout(r, 1000)); // More visibility

      const base64Img = await generateImageWithImagen(finalPrompt);
      setGenLog(prev => [...prev, "[SUCCESS] Data stream received from Imagen 3.", "[RENDER] Decoding Base64 image data...", "[RENDER] Rendering final canvas..."]);

      setGeneratedImage(`data:image/png;base64,${base64Img}`);
      showStatus("画像生成完了！");
      setGenLog(prev => [...prev, "[COMPLETE] Image successfully generated."]);
    } catch (error) {
      console.error(error);
      setIsGenerationError(true);
      setGeneratedImage(null); // Force null to trigger error UI
      setGenLog(prev => [...prev, `[ERROR] ${error.message}`, "[SYSTEM] Sequence Aborted."]);
      showStatus(`生成エラー: ${error.message}`);
      // alert(`画像生成に失敗しました。\nエラー: ${error.message}`); // Disable alert to show UI guide instead
    } finally {
      setIsAssembling(false);
    }
  };

  // Determine Current Step
  const currentStep = (!castList || castList.length < 50) ? 1
    : (!scenario || scenario.length < 50) ? 2
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
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0f1115] backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
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

          <button onClick={resetAll} className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/5 z-10">
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 入力をリセット
          </button>
        </header>

        {/* STATUS BAR (Sticky Mode Indicator) */}
        <div className="sticky top-4 z-50 bg-[#0f1115]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-3 rounded-full ${currentStep === 1 ? 'bg-blue-600 animate-pulse' : 'bg-slate-800'}`}>
              <Camera size={20} className={currentStep === 1 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-blue-600 transition-all duration-500 ${currentStep >= 2 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 2 ? 'bg-purple-600 animate-pulse' : 'bg-slate-800'}`}>
              <FileText size={20} className={currentStep === 2 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-purple-600 transition-all duration-500 ${currentStep >= 3 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 3 ? 'bg-orange-600 animate-pulse' : 'bg-slate-800'}`}>
              <Wand2 size={20} className={currentStep === 3 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-green-600 transition-all duration-500 ${currentStep >= 4 ? 'w-full' : 'w-0'}`} />
            </div>
            <div className={`p-3 rounded-full ${currentStep === 4 ? 'bg-green-600 animate-pulse' : 'bg-slate-800'}`}>
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
              className={`group p-8 rounded-[3rem] border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
                ${isDragging ? 'border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20' : 'border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]'}
                ${currentStep === 1 && !isDragging ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
                ${currentStep > 1 ? 'border-blue-500/30 bg-blue-900/5' : ''}
              `}
            >
              <div className="flex items-center justify-between mb-6 z-10">
                <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 1 ? 'text-blue-400' : 'text-slate-500'}`}>
                  <Camera size={18} /> 01. キャラクター解析
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
                      複数枚のキャラクターシートは <span className="text-blue-400">同時に（まとめて）</span> アップロードして下さい
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

              <textarea
                value={castList}
                onChange={(e) => setCastList(e.target.value)}
                style={{ color: '#ffffff', backgroundColor: '#08090b', opacity: 1 }}
                className="flex-1 w-full min-h-[140px] p-6 rounded-[2rem] text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600"
                placeholder="画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"
              />

              <ThinkingLog thought={analyzeThought} />
            </section>

            {/* 02: シナリオ設定 (Static Layout) */}
            <section className={`p-8 rounded-[3rem] bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
                 ${currentStep === 2 ? 'border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100' : 'border-white/5 opacity-60'}
                 ${currentStep > 2 ? 'border-purple-500/30 bg-purple-900/5 opacity-100' : ''}
                 ${currentStep < 2 ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
                 ${isAssembling ? 'blur-sm opacity-50 pointer-events-none' : ''}
            `}>
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 2 ? 'text-purple-400' : 'text-slate-500'}`}>
                  <FileText size={18} /> 02. ニュース統合型シナリオ
                </div>

                <button
                  onClick={generateScenarioFromNews}
                  disabled={isSearching || currentStep < 1}
                  className="w-full relative bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  {isSearching ? <Loader2 size={24} className="animate-spin" /> : <Zap size={24} />}
                  <span>{isSearching ? "シナリオ生成中..." : "シナリオを自動生成する"}</span>
                </button>
              </div>

              {/* ... Content ... */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase ml-2 tracking-widest">対象の日付 (今日または過去)</label>
                  <input
                    type="date"
                    max={new Date().toLocaleDateString('en-CA')}
                    value={targetDate}
                    onChange={(e) => {
                      const max = new Date().toLocaleDateString('en-CA');
                      setTargetDate(e.target.value > max ? max : e.target.value);
                    }}
                    className="w-full p-4 bg-slate-800 rounded-2xl border border-white/20 text-xs font-bold text-white focus:border-blue-500/50 outline-none cursor-pointer hover:bg-slate-700 transition-colors [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-inner-spin-button]:appearance-none"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-slate-500 uppercase ml-2 tracking-widest">描画スタイル</label>
                  <select
                    value={colorMode}
                    onChange={(e) => setColorMode(e.target.value)}
                    className="w-full p-4 bg-slate-800 rounded-2xl border border-white/20 text-xs font-bold text-white focus:border-blue-500/50 outline-none appearance-none cursor-pointer hover:bg-slate-700"
                  >
                    <option value="auto">自動判別スタイル</option>
                    <option value="monochrome">モノクロ（劇画調）</option>
                    <option value="color">カラー（アニメ風）</option>
                  </select>
                </div>
              </div>

              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
                className="flex-1 w-full min-h-[140px] p-6 rounded-[2rem] text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium placeholder-slate-600"
                placeholder="4コマ漫画の各コマにおける、アングル指示、演技指示、および台詞の内容をここに記述します。"
              />

              <div className="mt-4">
                <ThinkingLog thought={scenarioThought || (isSearching ? "シナリオ構成AI: 検索＆プロット構築中..." : "")} />
              </div>

              {/* Loading Overlay */}
              {isSearching && (
                <div className="absolute inset-0 z-50 bg-[#0f1115]/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-[3rem] border border-purple-500/30">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse rounded-full" />
                    <Loader2 size={64} className="relative text-purple-400 animate-spin duration-1000" />
                  </div>
                  <div className="mt-6 text-center space-y-2">
                    <p className="text-2xl font-black text-white tracking-widest animate-pulse">
                      NEWS SCANNING...
                    </p>
                    <p className="text-xs font-mono text-purple-300">
                      最新トレンドを検索＆サタイア構築中
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* 03: プロンプト生成 (Static Layout) */}
          <section className={`pt-2 transition-all duration-300
            ${currentStep === 3 ? 'opacity-100' : 'opacity-100'}
            ${currentStep < 3 ? 'blur-[4px] opacity-30 grayscale pointer-events-none' : ''}
            ${isSearching ? 'blur-sm opacity-50 pointer-events-none' : ''}
          `}>
            <button
              onClick={assemblePrompt}
              disabled={isAssembleDisabled}
              className={`w-full group bg-white text-black font-black py-12 rounded-[3rem] shadow-2xl overflow-hidden hover:bg-slate-100 active:scale-[0.99] transition-all disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed
                     ${currentStep === 3 ? 'ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0a0c10]' : ''}
                  `}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                <div className="flex items-center gap-4">
                  {isAssembling ? <Loader2 size={32} className="animate-spin text-blue-600" /> : <Wand2 size={32} className={`text-blue-600 ${currentStep === 3 ? 'animate-bounce' : ''}`} />}
                  <span className="text-3xl tracking-tighter italic">
                    {isAssembling ? "思考および描画中..." : "最終プロンプトを構築する"}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">全ての解析データと演出案を統合</span>
              </div>
            </button>
          </section>

          {/* 出力結果 */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 border-t border-white/5 pt-12 transition-all duration-1000 ${isAssembleDisabled ? 'blur-md opacity-30 grayscale pointer-events-none select-none' : 'opacity-100 blur-0'}`}
          >
            {/* 左: プロンプト & 思考ログ */}
            <section className="relative group h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-[#0d1117] p-8 rounded-[3rem] border border-white/5 shadow-3xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-yellow-400 uppercase tracking-widest">
                    <Zap size={14} /> 構築されたプロンプト
                  </div>
                  <div className="flex items-center gap-3">
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
                      {isCopied ? "コピー完了" : "コピペ (他アプリ/保存用)"}
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
                      {isAssembling ? "再生成中..." : "画像を生成 (Imagen 3)"}
                    </button>
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
            <section className="relative group bg-[#0d1117] rounded-[3rem] border border-white/5 min-h-[600px] flex flex-col overflow-hidden">

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

              <div className="flex-1 flex items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                {
                  generatedImage ? (
                    <img src={generatedImage} className="w-full h-full object-contain rounded-[1rem] shadow-2xl" alt="Generated Result" />
                  ) : isGenerationError ? (
                    <div className="text-center p-6 space-y-6 max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
                      <div className="bg-red-900/10 border border-red-500/30 rounded-3xl p-8 backdrop-blur-md">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <AlertTriangle size={32} className="text-red-500 animate-pulse" />
                          <h3 className="text-lg font-black text-red-500 tracking-wider">画像生成機能の制限について</h3>
                        </div>

                        <div className="text-left bg-black/40 rounded-xl p-4 mb-6 border border-white/5 space-y-2">
                          <p className="text-[11px] text-slate-300 leading-relaxed font-bold">
                            申し訳ございません。現在、Google側のAPI仕様により、お客様のAPIキーでは<span className="text-red-400">「アプリ経由での画像生成」が許可されていません。</span>
                          </p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            ※これはアプリの故障ではなく、Google Cloudの権限設定によるものです（Web版のGemini Advancedが使えても、API経由の利用は別途承認が必要な場合があります）。制限が解除されるまで、以下の「手動生成」を推奨します。
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-white flex items-center justify-center gap-2">
                            <span className="w-20 h-[1px] bg-white/20"></span>
                            【 推奨される解決策 】
                            <span className="w-20 h-[1px] bg-white/20"></span>
                          </h4>

                          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-white/10 text-left space-y-4 shadow-lg">
                            {/* Step 1 */}
                            <div className="flex items-start gap-4">
                              <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">1</div>
                              <div>
                                <p className="text-xs font-bold text-blue-200 mb-1">プロンプトをコピー</p>
                                <button
                                  onClick={copyPrompt}
                                  className="text-[10px] bg-blue-600/20 hover:bg-blue-600 hover:text-white text-blue-300 px-3 py-1 rounded-lg transition-colors border border-blue-500/30 flex items-center gap-2"
                                >
                                  <Copy size={10} /> コピーする
                                </button>
                              </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start gap-4">
                              <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">2</div>
                              <div>
                                <p className="text-xs font-bold text-purple-200 mb-1">Gemini (Web版) を開く</p>
                                <a
                                  href="https://gemini.google.com/app"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-purple-300 underline hover:text-white flex items-center gap-1"
                                >
                                  https://gemini.google.com/app <ExternalLink size={10} />
                                </a>
                                <p className="text-[9px] text-slate-500 mt-1">※別タブで開きます</p>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start gap-4">
                              <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">3</div>
                              <div>
                                <p className="text-xs font-bold text-green-200 mb-1">貼り付けて送信 <span className="text-yellow-400 text-[9px] ml-1">(思考モード推奨)</span></p>
                                <p className="text-[10px] text-slate-400">
                                  入力欄に貼り付け、モデルを<strong className="text-white">「思考モード (2.0 Flash Thinking)」</strong>にして送信してください。
                                  入力欄で <span className="border border-white/20 px-1 rounded bg-black">Ctrl + V</span> (または右クリック→貼り付け) して送信すれば、最高画質で生成されます。
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-20 space-y-6">
                      {
                        isAssembling ? (
                          <div className="relative" >
                            <Loader2 size={64} className="animate-spin text-blue-500 mx-auto" />
                            <div className="absolute inset-0 blur-xl bg-blue-500/30 animate-pulse" />
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
