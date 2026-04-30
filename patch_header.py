import io
import re

with io.open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'\{\/\* 背景装飾 \*\/}.*?<main className="space-y-8" style=\{\{ filter: apiKey \? \'none\' : \'blur\(10px\)\', pointerEvents: apiKey \? \'auto\' : \'none\', transition: \'filter 0\.5s ease\' \}\}>', re.DOTALL)

replacement = """      {/* 画面上部固定プログレスバー (NEW STICKY TOP PROGRESS BAR) */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0f1115]/95 backdrop-blur-md border-b border-white/10 flex flex-col justify-center w-full h-[64px] shadow-2xl">
        <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-between relative">
          
          {/* 左側: API状態窓 */}
          <div className="flex items-center w-48 shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider ${apiKey ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${apiKey ? 'bg-green-400' : 'bg-red-400'}`} />
              {apiKey ? 'CONNECTED' : 'NO API KEY'}
            </div>
          </div>

          {/* 中央: 進捗ステップ（ユーザー要望により中央寄せ＋矢印＋大きな文字） */}
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className={`flex items-center gap-2 transition-all duration-300 ${currentStep >= 1 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${currentStep === 1 ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.8)]' : currentStep > 1 ? 'bg-blue-600/50 text-blue-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </div>
              <span className="text-sm font-black text-white tracking-widest drop-shadow-md">解析</span>
            </div>
            
            <ArrowRight size={18} className="text-white/40" />
            
            <div className={`flex items-center gap-2 transition-all duration-300 ${currentStep >= 2 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${currentStep === 2 ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.8)]' : currentStep > 2 ? 'bg-purple-600/50 text-purple-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 2 ? <Check size={16} /> : '2'}
              </div>
              <span className="text-sm font-black text-white tracking-widest drop-shadow-md">シナリオ</span>
            </div>
            
            <ArrowRight size={18} className="text-white/40" />
            
            <div className={`flex items-center gap-2 transition-all duration-300 ${currentStep >= 3 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${currentStep === 3 ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.8)]' : currentStep > 3 ? 'bg-orange-600/50 text-orange-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 3 ? <Check size={16} /> : '3'}
              </div>
              <span className="text-sm font-black text-white tracking-widest drop-shadow-md">プロンプト</span>
            </div>
            
            <ArrowRight size={18} className="text-white/40" />
            
            <div className={`flex items-center gap-2 transition-all duration-300 ${currentStep >= 4 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${currentStep === 4 ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)]' : currentStep > 4 ? 'bg-green-600/50 text-green-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 4 ? <Check size={16} /> : '4'}
              </div>
              <span className="text-sm font-black text-white tracking-widest drop-shadow-md">画像生成</span>
            </div>
          </div>

          {/* 右側: やり直すボタン (STP1に戻るボタン) */}
          <div className="flex items-center justify-end w-48 shrink-0">
            <button
              disabled={!apiKey || (!castList && !scenario)}
              onClick={partialReset}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-slate-600 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed group"
              title="キャラクター設定を維持したまま、シナリオ作成(STP2)からやり直す"
            >
              <RefreshCw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
              <span>STP1からやり直す</span>
            </button>
          </div>
        </div>

        {/* Progress Line Bar at bottom of sticky header */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-white/10 w-full">
          <div className={`h-full transition-all duration-700 ease-out
            ${currentStep === 1 ? 'w-1/4 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]' :
              currentStep === 2 ? 'w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]' :
              currentStep === 3 ? 'w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]' :
              currentStep >= 4 ? 'w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'w-0'}
          `} />
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[80px] md:px-10 md:pb-10 md:pt-[100px] space-y-8">
        
        {/* === ヘッダー領域 === */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* 左側: タイトル */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 shrink-0">
                <BrainCircuit size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] flex items-center flex-wrap gap-2">
                  <span>Super FURU AI</span>
                  <span className="text-white text-lg md:text-2xl tracking-widest">4-koma System</span>
                  <span className="text-[10px] md:text-xs text-yellow-500 font-mono align-top">{SYSTEM_VERSION}</span>
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                    Social Satire Engine [ 演出強化版 ]
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-black tracking-wider">PRO</span>
                </div>
                {(() => {
                  const info = getModelBadgeInfo(usedModel);
                  if (!info) return null;
                  return (
                    <div className={`mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${info.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`}>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">{info.label}</span>
                      <span className="w-[1px] h-3 bg-white/40" />
                      <span className="text-[10px] font-bold truncate max-w-[150px] md:max-w-none text-white">{info.desc}</span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[250px] bg-slate-800 text-slate-200 text-[10px] p-2 rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-white/10 whitespace-normal text-center leading-relaxed">
                        {info.tooltip}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* 右側: コントロールボタン群（ユーザー要望通り右寄せ＋説明文はボタンの直下） */}
          <div className="flex flex-col items-center md:items-end gap-4 z-10 w-full md:w-auto">
            <div className="flex flex-col items-center md:items-end w-full">
              <button
                disabled={!apiKey}
                onClick={handleFullAutoToggle}
                className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] border ${
                  isFullAutoMode
                    ? 'bg-red-900/90 hover:bg-red-800 text-red-100 border-red-500/50 animate-pulse'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white border-blue-400/30'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {isFullAutoMode ? (
                  <><Square size={20} fill="currentColor" /> フルオート中断</>
                ) : (
                  <><Zap size={20} className={castList ? "text-yellow-300" : ""} /> 全自動生成モード（STP2~4連鎖）</>
                )}
              </button>
              <p className="text-xs font-bold text-blue-300/80 mt-2 text-center md:text-right bg-blue-900/20 px-3 py-1 rounded-full border border-blue-500/10">
                ✨ キャラクターシートをドロップして自動開始
              </p>
            </div>

            <button onClick={resetAll} className="w-full md:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/10">
              <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> 完全初期化 (ハードリセット)
            </button>
          </div>
        </header>

        <main className="space-y-8" style={{ filter: apiKey ? 'none' : 'blur(10px)', pointerEvents: apiKey ? 'auto' : 'none', transition: 'filter 0.5s ease' }}>"""

content = pattern.sub(replacement, content)

with io.open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched App.jsx successfully.")
