import React from 'react';
import {
  Camera,
  Loader2,
  CheckCircle2,
  Trash2,
  Globe,
  Plus,
  Copy
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';

/**
 * STEP 01: キャラクター解析 ＆ 360°背景読み込みパネル
 */
export default function Step1Panel({
  apiKey,
  isDragging,
  setIsDragging,
  processFiles,
  images,
  setImages,
  bg360Image,
  bg360Enabled,
  isAnalyzing,
  analyzeThought,
  castList,
  setCastList,
  isCastListCopied,
  setIsCastListCopied,
  currentStep,
  setShowModal,
  styleJson,
  setStyleJson
}) {
  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        if (apiKey) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (apiKey) processFiles(e.dataTransfer.files);
      }}
      className={`group p-8 rounded-xl border-2 transition-all flex flex-col relative overflow-hidden duration-500 min-h-[300px] justify-center
        ${isDragging ? 'border-blue-500 bg-blue-500/20 border-solid scale-105 shadow-2xl z-20' : 'border-dashed border-slate-700 bg-[#0f1115] hover:border-slate-500 hover:bg-[#161b22]'}
        ${currentStep === 1 && !isDragging ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}
        ${currentStep > 1 ? 'border-blue-500/30 bg-blue-900/5' : ''}
      `}
    >
      <div className="flex items-center justify-between mb-6 z-10">
        <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 1 ? 'text-blue-400' : 'text-slate-500'} `}>
          <Camera size={18} /> STEP 01: キャラクター解析（設定の読み込み）
        </div>
        {isAnalyzing && <Loader2 size={18} className="animate-spin text-blue-400" />}
        {currentStep > 1 && <CheckCircle2 size={18} className="text-blue-500" />}
      </div>

      <div className="flex flex-wrap gap-2 mb-6 z-10 p-4 bg-[#0a0c10] rounded-3xl border border-white/10 h-[130px] overflow-y-auto custom-scrollbar content-start">
        {images.map((img, i) => (
          <div key={i} className="relative w-[56px] min-w-[56px] max-w-[56px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group/img transition-all hover:scale-110 hover:z-50 hover:shadow-xl hover:border-blue-400 cursor-pointer">
            <img src={img} className="w-full h-full object-cover shadow-sm" alt={`char-${i}`} />
            <button
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {bg360Image && (
          <div
            className={`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${bg360Enabled ? 'border-cyan-500/50' : 'border-slate-700'} transition-all`}
            title="360°パノラマ背景 (下の「場所設定」から詳細確認可能)"
          >
            <img src={bg360Image} className={`w-full h-full object-cover shadow-sm ${bg360Enabled ? 'opacity-100' : 'opacity-40 grayscale'}`} alt="360 bg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1">
              <Globe size={8} /> 360° BACKGROUND
            </div>
          </div>
        )}
        {styleJson && (
          <div
            className={`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border border-purple-500/50 bg-purple-900/30 flex items-center justify-center group/style transition-all shadow-sm`}
            title={`適用中の作風: ${styleJson.style_name}\n\nクリックして解除`}
          >
            <div className="text-center p-1 w-full">
              <span className="text-[8px] block opacity-70 text-purple-300 font-bold mb-0.5">適用中の作風</span>
              <div className="text-[10px] text-white font-bold leading-tight line-clamp-2">{styleJson.style_name}</div>
            </div>
            <button
              onClick={() => setStyleJson(null)}
              className="absolute inset-0 bg-black/70 opacity-0 group-hover/style:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[2px]"
            >
              <Trash2 size={16} />
              <span className="text-[10px] ml-1 font-bold">解除</span>
            </button>
          </div>
        )}
        <label className="w-14 h-14 flex flex-col items-center justify-center cursor-pointer rounded-lg border border-dashed border-white/10 hover:border-blue-500 hover:bg-blue-500/10 transition-all text-slate-500 hover:text-blue-400 group/add">
          {isAnalyzing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Plus size={16} className="group-hover/add:scale-125 transition-transform" />
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (!apiKey) {
                setShowModal(true);
              } else {
                processFiles(e.target.files);
              }
            }}
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
              onChange={(e) => {
                if (!apiKey) {
                  setShowModal(true);
                } else {
                  processFiles(e.target.files);
                }
              }}
            />
            <p className="text-xs font-bold text-slate-400">
              キャラクター設定画像（キャラシート）をここにドロップしてください。 <span className="text-blue-400">（複数枚を同時に、または後から追加ドロップすることも可能です。360°背景画像や、作風設定のJSONファイルも一緒に読み込めます）</span>
            </p>
            <p className="text-[10px] opacity-60 mt-1">
              ※名前や性格、特徴が書かれた設定シートを推奨。
              <br />※Story Makerなどで出力した「作風json」ファイルを投げ込むと、漫画のタッチや作風が変化します。
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

      <div className="mb-4">
        <ThinkingLog thought={analyzeThought} />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <span className="px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded">
          ▼ 抽出されたキャラクター設定 (自由に編集・追加できます)
        </span>
        <textarea
          value={castList}
          onChange={(e) => setCastList(e.target.value)}
          style={{ color: '#ffffff', backgroundColor: '#08090b', opacity: 1 }}
          className="flex-1 w-full min-h-[140px] p-6 rounded-2xl text-sm border border-white/5 focus:border-blue-500/50 outline-none leading-relaxed resize-none font-medium z-10 placeholder-slate-600"
          placeholder="画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"
        />
        <div className="mt-2 relative z-50">
          <button
            onClick={() => {
              navigator.clipboard.writeText(castList);
              setIsCastListCopied(true);
              setTimeout(() => setIsCastListCopied(false), 2000);
            }}
            disabled={!castList}
            className={`w-full ${isCastListCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCastListCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {isCastListCopied ? "コピー完了" : "📋 キャラクター設定をコピー"}
          </button>
        </div>
      </div>
    </section>
  );
}
