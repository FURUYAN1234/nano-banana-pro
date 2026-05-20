// --- 定数・タグ定義 (constants.js) ---
// App.jsx から抽出された共有定数

export const SYSTEM_VERSION = "v3.77-alpha";

// --- Punchline ラベル変換関数 ---
export const getPunchlineLabel = (type) => {
  switch (type) {
    case "Surreal": return "静寂型 (シュール)";
    case "Explosion": return "爆発型 (カオス)";
    case "FakeEmotion": return "感動詐欺";
    case "Metafiction": return "メタフィクション";
    case "Unreasonable": return "理不尽な制裁";
    case "RunningGag": return "天丼";
    case "Dream": return "夢オチ (ループ)";
    case "PsychoHorror": return "サイコホラー (狂気)";
    case "Misunderstanding": return "盛大な勘違い (すれ違い)";
    case "CanceledEnding": return "打ち切りエンド (俺たちの戦いはこれからだ)";
    case "Documentary": return "ドキュメンタリー (原文忠実)";
    default: return "自動 (AIにおまかせ)";
  }
};

// --- ニュースカテゴリ初期値 ---
export const DEFAULT_CATEGORIES = [
  { id: 'politics', label: '政治・経済', icon: '💼', checked: false, keywords: '最新 政治 経済 社会ニュース' },
  { id: 'sports', label: 'スポーツ', icon: '🏅', checked: false, keywords: '最新 スポーツ 競技 大会 結果' },
  { id: 'animals', label: '動物・癒し', icon: '🐱', checked: false, keywords: '最新 動物 ペット 癒しニュース' },
  { id: 'food', label: 'グルメ', icon: '🍜', checked: false, keywords: '最新 食べ物 グルメ スイーツ トレンド' },
  { id: 'ent', label: 'エンタメ', icon: '🎬', checked: false, keywords: '最新 映画 ドラマ 音楽 エンタメ' },
  { id: 'science', label: '科学・宇宙', icon: '🚀', checked: false, keywords: '最新 科学 宇宙 考古学 発見' },
  { id: 'bnews', label: 'B級ニュース', icon: '🤪', checked: false, keywords: '面白い 海外のB級ニュース ハプニング' },
  { id: 'life', label: '生活・健康', icon: '🌱', checked: false, keywords: '生活 ライフハック 健康' },
];

// --- [v1.7.0] モデルバッジ情報 ---
// AIモデルIDからバッジ表示用の情報を返す純粋関数
export const getModelBadgeInfo = (modelId) => {
  if (!modelId) return null;

  // Gemini 3.5 / 3.1系 = 最高品質 (Next-Gen)
  if (modelId.includes("3.5") || modelId.includes("3.1")) {
    return {
      label: "NEXT GEN",
      tier: "Supreme",
      color: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",
      desc: `Gemini ${modelId.includes("3.5") ? "3.5" : "3.1"}: 最高品質 (Next Generation)`
    };
  }
  // Gemini 3.0 Flash / 2.5 Pro = 高品質
  if (modelId.includes("3-flash") || modelId.includes("2.5-pro")) {
    return {
      label: "HIGH QUALITY",
      tier: "Active",
      color: "bg-blue-600 text-white",
      desc: "Gemini 3.0/2.5 Pro: 高品質"
    };
  }
  // Gemini 2.5 Flash (画像生成含む) = 安定
  if (modelId.includes("2.5-flash") && !modelId.includes("lite")) {
    return {
      label: "STABLE",
      tier: "Active",
      color: "bg-indigo-600 text-white",
      desc: "Gemini 2.5 Flash: 安定・高速"
    };
  }
  // Flash Lite系 = 標準品質
  if (modelId.includes("lite") || modelId.includes("latest")) {
    return {
      label: "STANDARD QUALITY",
      tier: "Lite",
      color: "bg-gray-600 text-white",
      desc: "Flash Lite: 標準品質 (API制限回避中...)"
    };
  }
  // Imagen系 = レガシー
  if (modelId.includes("imagen")) {
    return {
      label: "LEGACY",
      tier: "Lite",
      color: "bg-amber-700 text-white",
      desc: "Imagen: レガシーモデル (2026/06廃止予定)"
    };
  }
  // [v3.59] OpenAI GPT系モデル
  if (modelId.includes("gpt-4") || modelId.includes("gpt-3")) {
    return {
      label: "ChatGPT",
      tier: "Active",
      color: "bg-emerald-600 text-white",
      desc: `OpenAI ${modelId}: テキスト生成`
    };
  }
  // [v3.59] OpenAI 画像生成モデル
  if (modelId.includes("gpt-image") || modelId.includes("dall-e")) {
    return {
      label: "ChatGPT IMG",
      tier: "Active",
      color: "bg-emerald-500 text-white",
      desc: `OpenAI ${modelId}: 画像生成`
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
