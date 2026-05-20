import React from 'react';
import { Loader2, ImageIcon, Trash2, Check } from 'lucide-react';

export default function GenerationHistory({
  generationHistory,
  setGenerationHistory,
  generatedImage,
  setGeneratedImage,
  isSearching,
  isAssembling,
  isGeneratingImage,
  isEnhancing,
  isFullAutoMode,
  fullAutoStep
}) {
  if (generationHistory.length === 0) return null;

  const isGenerating = isSearching || isAssembling || isGeneratingImage || isEnhancing || (isFullAutoMode && fullAutoStep > 0 && fullAutoStep < 4);

  return (
    <section className="relative bg-[#0a0c10] border border-white/10 rounded-2xl p-4 shadow-xl mt-6 mx-2 lg:mx-0">
      {/* 生成中は履歴をロック */}
      {isGenerating && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, backgroundColor: 'rgba(10,12,16,0.6)', backdropFilter: 'blur(2px)', pointerEvents: 'auto', borderRadius: '1rem' }} className="flex items-center justify-center">
          <span className="text-xs font-bold text-slate-400 bg-black/80 px-3 py-1 rounded-full border border-white/10 shadow-lg flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> 生成中...
          </span>
        </div>
      )}
      <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-0">
        <h4 className="text-slate-300 text-xs font-bold flex items-center gap-2">
          <ImageIcon size={14} className="text-blue-400" />
          生成履歴 ({generationHistory.length})
        </h4>
        <button
          onClick={() => {
            if(window.confirm('生成履歴をすべて削除しますか？')) {
              setGenerationHistory([]);
              setGeneratedImage("");
            }
          }}
          className="flex items-center gap-1 px-2 py-1 text-[10px] text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
        >
          <Trash2 size={12} /> 全削除
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 px-1">
        {generationHistory.map((historyItem) => (
          <div
            key={historyItem.id}
            onClick={() => setGeneratedImage(historyItem.img)}
            style={{ width: '64px', height: '96px', flexShrink: 0 }}
            className={`relative rounded-md overflow-hidden cursor-pointer transition-all border-2 group ${
              generatedImage === historyItem.img 
                ? 'border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] scale-105 z-10' 
                : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
            }`}
          >
            <img src={historyItem.img} className="w-full h-full object-cover" alt="History thumbnail" />
            {generatedImage === historyItem.img && (
              <div className="absolute top-1 right-1 bg-blue-500 text-white rounded-full p-0.5 shadow-lg">
                <Check size={10} strokeWidth={3} />
              </div>
            )}
            {/* 個別削除ボタン (Hover) */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setGenerationHistory(prev => prev.filter(h => h.id !== historyItem.id));
                if (generatedImage === historyItem.img) setGeneratedImage("");
              }}
              className="absolute top-1 left-1 bg-black/60 text-red-400 rounded-full p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all shadow-lg"
            >
              <Trash2 size={10} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
