const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Remove overflow-x-hidden
content = content.replace(
  '<div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">',
  '<div className="min-h-screen bg-[#0a0c10] text-slate-100 font-sans selection:bg-blue-500/30">'
);

// 2. Replace the NEW STICKY PROGRESS BAR + Header with the v2.77 layout + full auto buttons
const pattern = /\{\/\* NEW STICKY TOP PROGRESS BAR \*\/\}[\s\S]*?<main className="space-y-8" style=\{\{ filter: apiKey \? 'none' : 'blur\(10px\)', pointerEvents: apiKey \? 'auto' : 'none', transition: 'filter 0\.5s ease' \}\}>/;

const replacement = `{/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto p-4 md:p-10 space-y-8 z-10">
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
                <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                    Social Satire Engine [ 演出強化版 ]
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[8px] font-black tracking-wider">PRO</span>
                </div>
                {/* Model info badge */}
                {(() => {
                  const info = getModelBadgeInfo(usedModel);
                  if (!info) return null;
                  return (
                    <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 shadow-lg animate-in fade-in slide-in-from-top-2 cursor-help group/badge relative" style={{ backgroundColor: info.color.split(' ')[0].replace('bg-', '') }}>
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

          <div className="flex flex-col gap-3 items-center md:items-end z-10 w-full md:w-auto">
            <button onClick={resetAll} className="w-full md:w-auto group flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all border border-white/5">
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" /> 入力をリセット
            </button>
            <div className="flex flex-col items-center w-full md:w-auto">
              <button
                disabled={!apiKey}
                onClick={handleFullAutoToggle}
                className={\`w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black transition-all shadow-lg border \${
                  isFullAutoMode
                    ? 'bg-red-900/80 hover:bg-red-800 text-red-100 border-red-500/50 animate-pulse'
                    : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white border-blue-400/30'
                } disabled:opacity-30 disabled:cursor-not-allowed\`}
              >
                {isFullAutoMode ? (
                  <><Square size={16} fill="currentColor" /> フルオート中断</>
                ) : (
                  <><Zap size={16} className={castList ? "text-yellow-300" : ""} /> 全自動生成モード</>
                )}
              </button>
              <p className="text-[10px] text-slate-500 mt-2 text-center">キャラクターシートをドロップして自動開始</p>
            </div>
          </div>
        </header>

        {/* STATUS BAR (Sticky Mode Indicator) */}
        <div className="sticky top-4 z-50 bg-[#0f1115]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-xl shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className={\`p-3 rounded-full \${currentStep === 1 ? 'bg-blue-600 animate-pulse' : 'bg-slate-800'} \`}>
              <Camera size={20} className={currentStep === 1 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={\`h-full bg-blue-600 transition-all duration-500 \${currentStep >= 2 ? 'w-full' : 'w-0'} \`} />
            </div>
            <div className={\`p-3 rounded-full \${currentStep === 2 ? 'bg-purple-600 animate-pulse' : 'bg-slate-800'} \`}>
              <FileText size={20} className={currentStep === 2 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={\`h-full bg-purple-600 transition-all duration-500 \${currentStep >= 3 ? 'w-full' : 'w-0'} \`} />
            </div>
            <div className={\`p-3 rounded-full \${currentStep === 3 ? 'bg-orange-600 animate-pulse' : 'bg-slate-800'} \`}>
              <Wand2 size={20} className={currentStep === 3 ? 'text-white' : 'text-slate-500'} />
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div className={\`h-full bg-green-600 transition-all duration-500 \${currentStep >= 4 ? 'w-full' : 'w-0'} \`} />
            </div>
            <div className={\`p-3 rounded-full \${currentStep >= 4 ? 'bg-green-600 animate-pulse' : 'bg-slate-800'} \`}>
              <ImageIcon size={20} className={currentStep >= 4 ? 'text-white' : 'text-slate-500'} />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider \${apiKey ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse'}\`}>
              <span className={\`w-2 h-2 rounded-full \${apiKey ? 'bg-green-400' : 'bg-red-400'}\`} />
              {apiKey ? 'CONNECTED' : 'NO API KEY'}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">CURRENT MODE</p>
              <p className="text-xl font-black italic tracking-tighter text-white">
                {currentStep === 1 && <span className="text-blue-500">CHARACTER ANALYSIS</span>}
                {currentStep === 2 && <span className="text-purple-500">SCENARIO GENERATION</span>}
                {currentStep === 3 && <span className="text-orange-500">PROMPT ASSEMBLY</span>}
                {currentStep >= 4 && <span className="text-green-500">EXECUTION COMPLETE</span>}
              </p>
            </div>
          </div>
        </div>

        <main className="space-y-8" style={{ filter: apiKey ? 'none' : 'blur(10px)', pointerEvents: apiKey ? 'auto' : 'none', transition: 'filter 0.5s ease' }}>\`;

content = content.replace(pattern, replacement);

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Successfully patched App.jsx');
