import io
import re

# 1. Update App.jsx
with io.open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_content = f.read()

# Update version
app_content = re.sub(r'const SYSTEM_VERSION = "v2\.\d+ Alpha";', 'const SYSTEM_VERSION = "v2.84 Alpha";', app_content)

# Replace everything from the NEW STICKY TOP PROGRESS BAR to the <main tag
pattern = re.compile(r'\{\/\* 画面上部固定プログレスバー.*?<main className="space-y-8"', re.DOTALL)

replacement = """      {/* 画面上部固定プログレスバー (Sticky Progress Bar) */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-[#0f1115]/95 backdrop-blur-md border-b border-white/10 flex flex-col justify-center w-full px-4 py-2 shadow-xl">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center relative">
          
          {/* 中央: 進捗ステップ（矢印と適切なサイズ） */}
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto custom-scrollbar">
            {/* Step 1 */}
            <div className={`flex items-center gap-1.5 md:gap-2 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${currentStep === 1 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]' : currentStep > 1 ? 'bg-blue-600/50 text-blue-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 1 ? <Check size={14} /> : '1'}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">解析</span>
            </div>
            
            <ArrowRight size={12} className="text-white/20 hidden md:block" />
            
            {/* Step 2 */}
            <div className={`flex items-center gap-1.5 md:gap-2 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${currentStep === 2 ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]' : currentStep > 2 ? 'bg-purple-600/50 text-purple-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 2 ? <Check size={14} /> : '2'}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">シナリオ</span>
            </div>
            
            <ArrowRight size={12} className="text-white/20 hidden md:block" />
            
            {/* Step 3 */}
            <div className={`flex items-center gap-1.5 md:gap-2 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${currentStep === 3 ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]' : currentStep > 3 ? 'bg-orange-600/50 text-orange-200' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 3 ? <Check size={14} /> : '3'}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">プロンプト</span>
            </div>
            
            <ArrowRight size={12} className="text-white/20 hidden md:block" />
            
            {/* Step 4 */}
            <div className={`flex items-center gap-1.5 md:gap-2 ${currentStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${currentStep === 4 ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]' : currentStep > 4 ? 'bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-white/10 text-white/50'}`}>
                {currentStep > 4 ? <Check size={14} /> : '4'}
              </div>
              <span className="text-[10px] md:text-xs font-bold text-white tracking-wider">画像生成</span>
            </div>
          </div>
        </div>

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

      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-4 pt-[60px] md:px-10 md:pb-10 md:pt-[68px] space-y-8">
        
        {/* === ヘッダー領域 === */}
        <header className="flex flex-col items-center justify-center gap-6 bg-[#0f1115] p-6 md:p-8 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* タイトル領域 */}
          <div className="flex flex-col items-center text-center z-10 w-full">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20">
                <BrainCircuit size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tighter text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                  Super FURU AI <span className="text-white text-2xl ml-2 tracking-widest">4-koma System</span> <span className="text-xs text-yellow-500 font-mono align-top ml-1">{SYSTEM_VERSION}</span>
                </h1>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                    Social Satire Engine [ 演出強化版 ]
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-black tracking-wider">PRO</span>
                </div>
              </div>
            </div>

            {/* API接続状態バッジ */}
            {(() => {
              const info = getModelBadgeInfo(usedModel);
              return (
                <div className="flex items-center gap-4 mt-3">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider ${apiKey ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'}`}>
                    <span className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-400' : 'bg-red-400'}`} />
                    {apiKey ? 'CONNECTED' : 'NO API KEY'}
                  </div>
                  {info && (
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${info.color} shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative`}>
                      <span className="text-[10px] font-black uppercase tracking-widest">{info.label}</span>
                      <span className="w-[1px] h-3 bg-white/40" />
                      <span className="text-[10px] font-bold truncate max-w-[150px] md:max-w-none">{info.desc}</span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          {/* コントロール領域 */}
          <div className="flex flex-col items-center gap-4 w-full max-w-md z-10">
            <div className="w-full text-center">
              <button
                disabled={!apiKey}
                onClick={handleFullAutoToggle}
                className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-lg transition-all shadow-[0_0_20px_rgba(0,0,0,0.3)] border ${
                  isFullAutoMode
                    ? 'bg-red-900/90 hover:bg-red-800 text-red-100 border-red-500/50 animate-pulse'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white border-blue-400/30'
                } disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                {isFullAutoMode ? (
                  <><Square size={20} fill="currentColor" /> 中断</>
                ) : (
                  <><Zap size={20} className={castList ? "text-yellow-300" : ""} /> フルオート</>
                )}
              </button>
              <p className="text-xs font-bold text-slate-400 mt-2">
                キャラクターシートをドロップして自動開始
              </p>
            </div>

            {/* STEP1に戻るボタン */}
            <button
              disabled={!apiKey || (!castList && !scenario)}
              onClick={partialReset}
              className="w-full group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/5"
            >
              <RefreshCw size={18} className="group-hover:-rotate-180 transition-transform duration-500" /> STEP1に戻る
            </button>
            
            {/* 完全リセット */}
            <button onClick={resetAll} className="text-[10px] text-slate-500 hover:text-slate-300 underline underline-offset-4 mt-2">
              入力をリセット
            </button>
          </div>
        </header>

        <main className="space-y-8" style={{ filter: apiKey ? 'none' : 'blur(10px)', pointerEvents: apiKey ? 'auto' : 'none', transition: 'filter 0.5s ease' }}"""

app_content = pattern.sub(replacement, app_content)

with io.open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_content)

# 2. Update package.json
with io.open('package.json', 'r', encoding='utf-8') as f:
    pkg_content = f.read()

pkg_content = re.sub(r'"version": "2\.\d+\.\d+-alpha"', '"version": "2.84.0-alpha"', pkg_content)

with io.open('package.json', 'w', encoding='utf-8') as f:
    f.write(pkg_content)

# 3. Update index.html
with io.open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

html_content = re.sub(r'<title>Nano Banana Pro v2\.\d+ Alpha</title>', '<title>Nano Banana Pro v2.84 Alpha</title>', html_content)

with io.open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Restored v2.80 layout correctly and bumped version to v2.84.0.")
