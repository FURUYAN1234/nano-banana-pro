// --- 定数・タグ定義 (constants.js) ---
// App.jsx から抽出された共有定数

export const SYSTEM_VERSION = "v3.74-alpha";

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
