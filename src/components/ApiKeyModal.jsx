import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

// --- API Key Modal (Dual Engine Support) ---
// [v3.59] 起動時モーダル（provider="google"）は Dual Engine 対応:
//   - sk- で始まるキー → ChatGPT Engine（全ルーチンがOpenAI API経由）
//   - それ以外 → Gemini Engine（従来通り）
const ApiKeyModal = ({ isOpen, onSave, onClose, provider = "google" }) => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  // [v3.59] モーダルが開くたびに入力をリセット（前のAPIキーが残らないようにする）
  useEffect(() => {
    if (isOpen) {
      setKey("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!key.trim()) {
      setError("APIキーを入力してください");
      return;
    }
    setError("");
    onSave(key);
  };

  const isGoogle = provider === "google";
  const isOpenAIProvider = provider === "openai";

  // [v3.59] 起動時モーダルは統合表示
  const isDualMode = isGoogle; // 起動時のみ Dual Engine UI

  // 入力中のキーがOpenAI形式かどうかをリアルタイム判定
  const isOpenAIKey = key.trim().startsWith("sk-");

  const title = isOpenAIProvider ? "OpenAI API Key が必要です"
    : isDualMode ? "AI Engine を選択" : "API Key が必要です";
  const placeholder = isDualMode ? "Gemini AI Key または OpenAI Key (sk-...) を入力..."
    : isOpenAIProvider ? "sk-proj-..." : "Google AI API Key を入力...";

  // リンクURLはDual Mode時は入力内容に応じて動的に切り替え
  const geminiLinkUrl = "https://aistudio.google.com/app/apikey";
  const openaiLinkUrl = "https://platform.openai.com/api-keys";
  const linkUrl = isOpenAIProvider ? openaiLinkUrl : geminiLinkUrl;
  const linkText = isOpenAIProvider ? "🔑 OpenAI キーを取得" : "🔑 キーを取得";

  // Dual Mode時のテーマカラーは入力内容で動的に変わる
  const activeColor = isDualMode && isOpenAIKey ? 'emerald' : (isOpenAIProvider ? 'emerald' : 'blue');
  const iconBgClass = activeColor === 'emerald' ? "bg-emerald-600" : "bg-blue-600";
  const borderClass = activeColor === 'emerald' ? "border-emerald-500/30" : "border-blue-500/30";
  const shadowClass = activeColor === 'emerald' ? "shadow-emerald-500/10" : "shadow-blue-500/10";
  const btnClass = activeColor === 'emerald' ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-500";
  const focusBorderClass = activeColor === 'emerald' ? "focus:border-emerald-500" : "focus:border-blue-500";
  const focusShadowClass = activeColor === 'emerald' ? "focus:shadow-[0_0_12px_rgba(16,185,129,0.2)]" : "focus:shadow-[0_0_12px_rgba(59,130,246,0.2)]";

  return (
    <div className="fixed top-0 left-0 right-0 z-[99999] animate-in slide-in-from-top duration-300">
      <div className="max-w-5xl mx-auto px-4 md:px-10 pt-4 relative">
        <div className={`bg-[#0f1115]/95 backdrop-blur-2xl border ${borderClass} rounded-xl shadow-2xl ${shadowClass} p-4 flex flex-col gap-4 relative pr-10 transition-all duration-300`}>
          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 text-slate-500 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              title="キャンセル"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}

          {/* 上段: アイコン + ラベル + 入力 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* 左: アイコンとラベル */}
            <div className="flex items-center gap-3 shrink-0">
              <div className={`p-2 ${iconBgClass} rounded-lg animate-pulse transition-colors duration-300`}>
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-[10px] text-slate-500">ブラウザメモリ内のみ保持・外部送信なし</p>
              </div>
            </div>

            {/* 中央: 入力フィールド */}
            <div className="flex-1 w-full md:w-auto">
              <div className="flex gap-2">
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} action={isOpenAIKey ? '/openai-key' : '/gemini-key'} method="dialog" className="flex gap-2 flex-1" autoComplete="off">
                <input
                  id="dual-engine-api-key-input"
                  name={isOpenAIKey ? "openai-api-key" : "gemini-api-key"}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  type="password"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  placeholder={placeholder}
                  className={`flex-1 bg-black/50 text-white placeholder:text-slate-600 px-4 py-2.5 rounded-lg border border-white/10 ${focusBorderClass} outline-none font-mono text-sm tracking-wider transition-all ${focusShadowClass}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  autoFocus
                />
                <button
                  onClick={handleSave}
                  className={`${btnClass} text-white font-bold px-6 py-2.5 rounded-lg transition-all text-sm whitespace-nowrap active:scale-95`}
                >
                  接続
                </button>
                </form>
              </div>
              {error && <p className="text-red-400 text-[10px] mt-1 pl-1">{error}</p>}
            </div>
          </div>

          {/* 下段: Dual Engine 説明 + キー取得リンク */}
          {isDualMode ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-t border-white/5 pt-3">
              {/* エンジン自動判定インジケーター */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold transition-all duration-300 ${
                  isOpenAIKey 
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                    : key.trim() 
                      ? 'bg-blue-500/15 border-blue-500/40 text-blue-400'
                      : 'bg-white/5 border-white/10 text-slate-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isOpenAIKey ? 'bg-emerald-400' : key.trim() ? 'bg-blue-400' : 'bg-slate-600'
                  }`} />
                  {isOpenAIKey ? '🟢 ChatGPT Engine で起動' : key.trim() ? '🔵 Gemini Engine で起動' : '入力待ち...'}
                </div>
                {isOpenAIKey && (
                  <span className="text-[9px] text-amber-400/70">⚠ 従量課金（OpenAI API）</span>
                )}
              </div>
              {/* キー取得リンク（両方表示） */}
              <div className="flex items-center gap-4">
                <a href={geminiLinkUrl} target="_blank" rel="noreferrer" className="text-[11px] text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 whitespace-nowrap">
                  🔵 Gemini キー取得（無料）
                </a>
                <span className="text-slate-600 text-[10px]">|</span>
                <a href={openaiLinkUrl} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-400 hover:text-emerald-300 underline decoration-emerald-400/30 whitespace-nowrap">
                  🟢 OpenAI キー取得（従量課金）
                </a>
              </div>
            </div>
          ) : (
            /* 非Dualモード（OpenAI単体モーダル）: 従来通り */
            <div className="flex justify-end">
              <a
                href={linkUrl}
                target="_blank"
                rel="noreferrer"
                className={`text-[11px] ${activeColor === 'emerald' ? 'text-emerald-400 hover:text-emerald-300 decoration-emerald-400/30' : 'text-cyan-400 hover:text-cyan-300 decoration-cyan-400/30'} underline whitespace-nowrap shrink-0`}
              >
                {linkText}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
