import React, { useRef, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';

// --- Thinking Log Component ---
const ThinkingLog = ({ thought, containerHeight = "h-[180px]", scrollHeight = "h-[120px]", placeholder = "" }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [thought]);

  // thoughtが空でも待機状態の枠を表示する（STEP3など）
  const displayText = thought || placeholder;
  if (!displayText && !placeholder) return null;

  return (
    <div className={`w-full bg-[#050505] border border-blue-500/20 rounded-2xl p-6 font-mono text-xs overflow-hidden relative group mt-4 animate-in fade-in slide-in-from-top-4 ${containerHeight}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
      <div className="flex items-center gap-2 text-blue-400 mb-4 uppercase tracking-widest font-bold text-[11px]">
        <BrainCircuit size={16} /> Neural Process (Thinking Mode)
      </div>
      <div ref={scrollRef} className={`${scrollHeight} overflow-y-auto custom-scrollbar leading-relaxed whitespace-pre-wrap font-mono text-[11px] scroll-smooth ${thought ? 'text-blue-100' : 'text-blue-300/30'}`}>
        {displayText || "> ボタンを押すとAI処理ログがここに表示されます..."}
        {thought && <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse" />}
      </div>
    </div>
  );
};

export default ThinkingLog;
