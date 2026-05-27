import React from 'react';
import {
  FileText,
  CheckCircle2,
  Globe,
  Loader2,
  Sparkles,
  Zap,
  ArrowRight,
  Copy,
  ChevronDown
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';
import Panorama360Viewer from './Panorama360Viewer';

/**
 * STEP 02: シナリオ構築設定パネル
 */
export default function Step2Panel({
  step2Ref,
  currentStep,
  isAnalyzing,
  inputMode,
  setInputMode,
  targetDate,
  setTargetDate,
  categories,
  toggleCategory,
  manualTopic,
  setManualTopic,
  bg360Image,
  bg360Enabled,
  setBg360Enabled,
  bg360Analysis,
  is360Analyzing,
  customLocation,
  setCustomLocation,
  customOutfit,
  setCustomOutfit,
  punchlineType,
  setPunchlineType,
  isSearching,
  generateScenarioFromNews,
  scenarioThought,
  scenario,
  setScenario,
  isScenarioCopied,
  setIsScenarioCopied,
  originalScenario,
  isEnhancePanelOpen,
  setIsEnhancePanelOpen,
  enhanceExpressions,
  setEnhanceExpressions,
  enhanceBodyLang,
  setEnhanceBodyLang,
  enhanceEffects,
  setEnhanceEffects,
  enhanceBackgrounds,
  setEnhanceBackgrounds,
  enhanceCameraWork,
  setEnhanceCameraWork,
  enhanceDialogue,
  setEnhanceDialogue,
  isEnhancing,
  enhanceScenario,
  revertScenario,
  enhanceLog,
  showStatus,
  styleJson
}) {
  return (
    <section
      ref={step2Ref}
      className={`relative p-8 rounded-xl bg-[#0f1115] border flex flex-col space-y-6 shadow-xl transition-all duration-300
        ${currentStep === 2 ? 'border-2 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.2)] opacity-100' : 'border-white/5 opacity-60'}
        ${currentStep > 2 ? 'border-purple-500/30 bg-purple-900/5 opacity-100' : ''}
      `}
    >
      {/* STEP2ロックオーバーレイ: STEP1未完了 or 解析中 */}
      {(currentStep < 2 || isAnalyzing) && (
        <div style={{ position: 'absolute', inset: -2, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', pointerEvents: 'auto', borderRadius: '0.875rem' }} />
      )}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 2 ? 'text-purple-400' : 'text-slate-500'} `}>
          <FileText size={18} /> STEP 02: シナリオ構築設定（ストーリー設定）
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-4 p-1 bg-slate-900/50 rounded-2xl border border-white/5">
          <button
            onClick={() => setInputMode('news')}
            className={`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${inputMode === 'news'
                ? 'bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg'
                : 'bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300'
              } `}
          >
            <span className="mr-2">🌐</span> ニュース検索
          </button>
          <button
            onClick={() => setInputMode('manual')}
            className={`py-4 rounded-xl text-sm font-black tracking-widest transition-all 
              ${inputMode === 'manual'
                ? 'bg-white text-black border-b-[4px] border-slate-300 translate-y-0 shadow-lg'
                : 'bg-[#1e293b] text-slate-500 border-b-[4px] border-[#0f172a] hover:bg-[#334155] hover:text-slate-300'
              } `}
          >
            <span className="mr-2">✏️</span> 自由入力
          </button>
        </div>

        {/* INPUT AREA */}
        {inputMode === 'news' ? (
          <div className="space-y-4">
            {/* Calendar */}
            <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5">
              <span className="text-xs font-bold text-slate-400">📅 対象日付 (Target Date):</span>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                style={{ colorScheme: 'dark' }}
                className="bg-transparent text-white font-mono font-bold outline-none border-b border-white/20 focus:border-blue-500 py-1 px-2"
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="col-span-2 lg:col-span-4 mb-2 text-xs font-bold text-slate-400 text-center">
                ▼ 検索するカテゴリを選択してください
              </div>
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className={`
                    relative flex items-center justify-center p-4 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5
                    ${cat.checked
                      ? 'bg-white text-black border-slate-300'
                      : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={cat.checked}
                    onChange={() => toggleCategory(cat.id)}
                  />
                  {cat.checked && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-2 ${cat.checked ? 'scale-110' : 'opacity-70 grayscale'} `}>
                      {cat.icon}
                    </div>
                    <div className="text-[11px] font-bold tracking-wider">
                      {cat.label}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="text-xs text-slate-500 text-center font-mono">
              現在の検索クエリ: {categories.filter(c => c.checked).map(c => c.keywords).join(' ') || "なし"} (対象日付: {targetDate})
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-xs font-bold text-purple-300 text-center">
              ▼ 自由入力：描きたいテーマや、ニュースのURLを自由に入力してください (<span className="text-blue-400">URLからの自動読み込みに対応</span>)
            </div>
            <textarea
              value={manualTopic}
              onChange={(e) => setManualTopic(e.target.value)}
              placeholder="例：&#13;&#10;・最近のAI技術の進化について&#13;&#10;・近所の猫が可愛かった話&#13;&#10;・https://example.com/news/12345&#13;&#10;&#13;&#10;※WebサイトのURLを入力すると、AIがそのページの内容を読み込んで漫画化します。&#13;&#10;ニュース記事を直接コピー＆ペーストするか、作りたいお話のイメージを文章で入力してください。"
              style={{ color: '#ffffff', backgroundColor: '#0f1115' }}
              rows={10}
              className="w-full bg-[#0f1115] border-2 border-purple-900/50 rounded-xl p-6 text-base text-white focus:border-purple-500 focus:shadow-md outline-none placeholder-slate-500 font-medium leading-relaxed resize-none"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className={`flex-1 p-3 rounded-xl border ${(bg360Image && bg360Enabled) ? 'bg-[#050a14] border-cyan-500/30' : 'bg-[#050505] border-gray-700/50'}`}>
            <label className="text-xs font-bold mb-2 block flex items-center gap-1" style={{ color: (bg360Image && bg360Enabled) ? '#67e8f9' : '#ffffff' }}>
              <Globe size={14} />
              {bg360Image
                ? (bg360Enabled ? '🌐 360°背景 (ON)' : '指定場所（背景の指定）')
                : '指定場所（背景の指定）'
              }
              <span className="text-[10px] font-normal ml-auto flex items-center gap-2">
                {is360Analyzing && (
                  <span className="text-yellow-400 animate-pulse flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> 解析中...</span>
                )}
                {bg360Image && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setBg360Enabled(!bg360Enabled);
                      showStatus(bg360Enabled ? '360°背景をOFFにしました（手入力が優先されます）' : '360°背景をONにしました');
                    }}
                    className={`px-3 py-1 rounded-md border text-[11px] font-bold transition-all ${
                      bg360Enabled
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/40'
                        : 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20'
                    }`}
                    title={bg360Enabled ? 'クリックで360°背景をOFF → 自由入力に切り替え' : 'クリックで360°背景をON → パノラマビューアーに切り替え'}
                  >
                    {bg360Enabled ? '🌐 ON → OFFにする' : '🌐 OFF → ONにする'}
                  </button>
                )}
                {!bg360Image && (
                  <span className="text-gray-500">※空欄ならAIおまかせ</span>
                )}
              </span>
            </label>

            {bg360Image && bg360Enabled ? (
              <div className="space-y-2">
                <Panorama360Viewer imageSrc={bg360Image} height={160} />
                {bg360Analysis && (
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">📍 {bg360Analysis.location}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">☀️ {bg360Analysis.lighting}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">{bg360Analysis.spatialType === 'indoor' ? '🏠 室内' : bg360Analysis.spatialType === 'outdoor' ? '🌳 屋外' : '🔀 複合'}</span>
                    {bg360Analysis.mood && <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">🎭 {bg360Analysis.mood}</span>}
                  </div>
                )}
                <p className="text-[9px] text-slate-600 text-center">ドラッグで回転 / ホイールでズーム</p>
              </div>
            ) : (
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                style={{ color: '#ffffff', backgroundColor: '#111111' }}
                className="w-full p-2 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm font-mono placeholder-gray-600"
                placeholder="例: サイバーパンクな裏路地、炎上する宇宙船... (空欄ならAIにおまかせ)"
              />
            )}
          </div>

          <div className="flex-1 bg-[#050505] p-3 rounded-xl border border-purple-500/20">
            <label className="text-xs font-bold text-purple-400 mb-1 block flex items-center gap-1">
              <Sparkles size={14} /> 指定服装（コスチューム指定） <span className="text-[10px] text-gray-500 font-normal ml-auto">※空欄ならAIおまかせ</span>
            </label>
            <input
              type="text"
              value={customOutfit}
              onChange={(e) => setCustomOutfit(e.target.value)}
              style={{ color: '#ffffff', backgroundColor: '#111111' }}
              className="w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm placeholder-gray-600 font-mono"
              placeholder="例: キャラシート通り / 全員水着 / ミリタリー装備... (空欄ならAIにおまかせ)"
            />
          </div>
          <div className="flex-1 bg-[#050505] p-3 rounded-xl border border-yellow-500/20">
            <label className="text-xs font-bold text-yellow-400 mb-1 block flex items-center gap-1">
              <span>🎬</span> ストーリーの結末（オチの方向性） <span className="text-[10px] text-gray-500 font-normal ml-auto">※ストーリー展開の指定</span>
            </label>
            <select
              value={punchlineType}
              onChange={(e) => setPunchlineType(e.target.value)}
              style={{ color: '#ffffff', backgroundColor: '#111111' }}
              className="w-full bg-[#111] text-white p-2 rounded border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none text-sm font-mono cursor-pointer"
            >
              <option value="Auto">🤖 自動 (AIにおまかせ)</option>
              <option value="Surreal">❄️ 静寂型 (シュール/無言)</option>
              <option value="Explosion">🔥 爆発型 (カオス/叫び)</option>
              <option value="FakeEmotion">😢 感動詐欺 (いい話風の狂気)</option>
              <option value="Metafiction">📖 メタフィクション (枠を越える)</option>
              <option value="Unreasonable">🔨 理不尽な制裁 (突然の暴力)</option>
              <option value="RunningGag">🔁 天丼 (同じボケの最終形態)</option>
              <option value="Dream">🛏️ 夢オチ (ループの恐怖)</option>
              <option value="PsychoHorror">🔪 サイコホラー (突然の狂気)</option>
              <option value="Misunderstanding">🤷 盛大な勘違い (すれ違いの頂点)</option>
              <option value="CanceledEnding">🏃 打ち切りエンド (俺たちの戦いはこれからだ)</option>
              <option value="Documentary">📰 ドキュメンタリー (原文忠実＋オチだけ漫画化)</option>
            </select>
          </div>
        </div>

        {/* EXECUTE BUTTON */}
        <button
          onClick={generateScenarioFromNews}
          disabled={isSearching || currentStep < 1}
          className="w-full relative bg-white hover:bg-slate-200 text-black py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 border-b-[6px] border-slate-300 active:border-b-0 active:translate-y-[6px] transition-all disabled:opacity-50 disabled:grayscale disabled:border-none disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed group/gen shadow-xl"
        >
          {isSearching ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              <span className="animate-pulse">SCENARIO GENERATING...</span>
            </>
          ) : (
            <>
              <Zap size={24} className="fill-yellow-400 text-black" />
              <span>シナリオ作成を実行 (STEP 2)</span>
              <ArrowRight size={24} className="opacity-60" />
            </>
          )}
        </button>
      </div>

      {/* RESULT & LOG AREA */}
      <div className="space-y-4 mt-6">
        {/* Log */}
        {scenarioThought && (
          <div className="mt-4">
            <ThinkingLog thought={scenarioThought} />
          </div>
        )}

        {/* RESULT TEXTAREA */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2 bg-[#0f1115] text-xs font-bold text-slate-400 w-fit rounded">
              ▼ 生成されたシナリオ (自由に編集・書き換えができます)
            </span>
            {styleJson && scenario && scenario.length > 20 && (
              <span className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 text-[10px] font-bold border border-purple-500/30 flex items-center gap-1 shadow-sm">
                <Sparkles size={10} /> 作風適用済: {styleJson.style_name}
              </span>
            )}
          </div>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
            className="w-full min-h-[200px] p-6 rounded-2xl text-base border-2 border-slate-700/50 focus:border-blue-500 focus:shadow-md outline-none leading-relaxed resize-y font-medium placeholder-slate-700 font-mono"
            placeholder="ここに生成されたシナリオが表示されます。💡 他のアプリ（Story Maker等）で作成したシナリオをここに直接貼り付けて進めることもできます。（貼り付ける際は Topic: / Location: / Outfit: / Punchline: / Scenario: などの形式に合わせてください）"
          />
          <div className="mt-2 relative z-50">
            <button
              onClick={() => {
                navigator.clipboard.writeText(scenario);
                setIsScenarioCopied(true);
                setTimeout(() => setIsScenarioCopied(false), 2000);
              }}
              disabled={!scenario}
              className={`w-full ${isScenarioCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isScenarioCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
              {isScenarioCopied ? "コピー完了" : "📋 シナリオをコピー"}
            </button>
          </div>
        </div>

        {/* シナリオ強化パネル */}
        <div className={`mt-2 border rounded-lg overflow-hidden transition-all duration-300 ${
          scenario && scenario.length > 20 
            ? 'border-orange-500/30' 
            : 'border-slate-700/30 blur-[2px] opacity-40 grayscale pointer-events-none'
        }`}>
          <button
            className="w-full flex items-center justify-between px-4 py-3 bg-orange-900/25 hover:bg-orange-900/50 transition-all duration-150 cursor-pointer border-l-4 border-orange-500 hover:border-orange-400 group/enhance-hdr"
            onClick={() => scenario && scenario.length > 20 && setIsEnhancePanelOpen(!isEnhancePanelOpen)}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">🔥</span>
              <span className="text-base font-black tracking-wide text-orange-200 group-hover/enhance-hdr:text-orange-100 transition-colors">シナリオ強化</span>
              <span className="text-xs font-bold text-orange-400/70 hidden sm:inline">Scenario Enhance</span>
              {originalScenario && <span className="text-[9px] bg-green-600/30 text-green-300 px-1.5 py-0.5 rounded-full border border-green-500/30 font-bold">✓ 強化済み</span>}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-colors">
                {!(scenario && scenario.length > 20) ? 'シナリオ生成後に使用可能' : isEnhancePanelOpen ? '▲ クリックで閉じる' : '▼ クリックで開く'}
              </span>
              <ChevronDown size={18} className={`text-orange-400 group-hover/enhance-hdr:text-orange-300 transition-all duration-300 ${isEnhancePanelOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isEnhancePanelOpen && scenario && scenario.length > 20 && (
            <div className="p-4 bg-orange-950/10 space-y-3">
              <p className="text-[11px] text-orange-200/70 leading-relaxed">
                生成されたシナリオの演出（カメラワークや表情など）をさらに大げさ・詳細に強化します。強化したい項目をONにして「シナリオ強化実行」を押してください。<br/>
                <span className="text-orange-300 font-bold">💡 何度も実行すると効果が重なり、よりパワフル（カオス）な展開になります。</span><br/>
                ⚠️ 演出を過激にしすぎると、画像生成時に安全基準（ポリシー制限）にかかる場合があります。その際は画像生成画面の救済機能をお使いください。
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceExpressions ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceExpressions} onChange={() => setEnhanceExpressions(!enhanceExpressions)} />
                  {enhanceExpressions && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceExpressions ? 'scale-110' : 'opacity-70 grayscale'}`}>😱</div>
                    <div className="text-[11px] font-bold tracking-wider">表情追加</div>
                    <div className="text-[9px] opacity-70 mt-1">大げさなリアクション</div>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceBodyLang ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceBodyLang} onChange={() => setEnhanceBodyLang(!enhanceBodyLang)} />
                  {enhanceBodyLang && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceBodyLang ? 'scale-110' : 'opacity-70 grayscale'}`}>🤸</div>
                    <div className="text-[11px] font-bold tracking-wider">身体強化</div>
                    <div className="text-[9px] opacity-70 mt-1">全身で感情を表現</div>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceEffects ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceEffects} onChange={() => setEnhanceEffects(!enhanceEffects)} />
                  {enhanceEffects && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceEffects ? 'scale-110' : 'opacity-70 grayscale'}`}>✨</div>
                    <div className="text-[11px] font-bold tracking-wider">演出強化</div>
                    <div className="text-[9px] opacity-70 mt-1">照明効果やVFX</div>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceBackgrounds ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceBackgrounds} onChange={() => setEnhanceBackgrounds(!enhanceBackgrounds)} />
                  {enhanceBackgrounds && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceBackgrounds ? 'scale-110' : 'opacity-70 grayscale'}`}>🏙️</div>
                    <div className="text-[11px] font-bold tracking-wider">背景強化</div>
                    <div className="text-[9px] opacity-70 mt-1">描写を詳細化</div>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceCameraWork ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceCameraWork} onChange={() => setEnhanceCameraWork(!enhanceCameraWork)} />
                  {enhanceCameraWork && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceCameraWork ? 'scale-110' : 'opacity-70 grayscale'}`}>📷</div>
                    <div className="text-[11px] font-bold tracking-wider">カメラワーク</div>
                    <div className="text-[9px] opacity-70 mt-1">アオリ・俯瞰等</div>
                  </div>
                </label>

                <label className={`relative flex items-center justify-center p-3 rounded-xl cursor-pointer border-2 border-b-4 transition-all duration-100 group overflow-hidden select-none active:border-b-2 active:translate-y-0.5 ${
                  enhanceDialogue ? 'bg-white text-black border-slate-300' : 'bg-[#1e293b] text-slate-400 border-[#0f172a] hover:bg-[#334155]'
                }`}>
                  <input type="checkbox" className="hidden" checked={enhanceDialogue} onChange={() => setEnhanceDialogue(!enhanceDialogue)} />
                  {enhanceDialogue && (
                    <div className="absolute top-2 right-2 bg-white text-blue-600 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={12} strokeWidth={4} />
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${enhanceDialogue ? 'scale-110' : 'opacity-70 grayscale'}`}>💬</div>
                    <div className="text-[11px] font-bold tracking-wider">セリフ強化</div>
                    <div className="text-[9px] opacity-70 mt-1">ギャグ・オチ最大化</div>
                  </div>
                </label>
              </div>

              <div className="text-xs text-orange-200/80 text-center font-mono py-1.5 bg-black/20 border border-white/5 rounded-md">
                強化対象: {[enhanceExpressions && "表情", enhanceBodyLang && "身体", enhanceEffects && "演出", enhanceBackgrounds && "背景", enhanceCameraWork && "カメラ", enhanceDialogue && "セリフ"].filter(Boolean).join(" / ") || "未選択"}
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
                  onClick={enhanceScenario}
                  disabled={isEnhancing || !(enhanceExpressions || enhanceBodyLang || enhanceEffects || enhanceBackgrounds || enhanceCameraWork || enhanceDialogue)}
                >
                  {isEnhancing ? (
                    <><Loader2 size={16} className="animate-spin" /> 強化中...</>
                  ) : (
                    <><Zap size={16} className="fill-yellow-300 text-black" /> シナリオ強化実行</>
                  )}
                </button>

                <button
                  className={`py-2 px-4 rounded-lg flex items-center justify-center gap-1 transition-all text-sm font-bold ${
                    originalScenario 
                      ? 'bg-red-800/60 hover:bg-red-700/60 text-red-200 border border-red-500/30' 
                      : 'bg-slate-800 text-slate-600 border border-slate-700/30 cursor-not-allowed'
                  }`}
                  onClick={revertScenario}
                  disabled={isEnhancing || !originalScenario}
                >
                  ↩️ 強化前に戻す
                </button>
              </div>

              <ThinkingLog thought={enhanceLog || "> 待機中...強化したいカテゴリを選んで「シナリオ強化実行」ボタンを押してください。"} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
