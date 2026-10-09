import React, { useRef } from 'react';
import {
  Camera,
  Loader2,
  CheckCircle2,
  Trash2,
  Globe,
  Copy
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';
import { REFERENCE_KIND_LABELS } from '../lib/reference-assets.js';

/**
 * STEP 01: キャラクター解析 ＆ 360°背景読み込みパネル
 */
export default function Step1Panel({
  apiKey,
  isDragging,
  setIsDragging,
  processFiles,
  images,
  referenceAssets = [],
  recognitionText = '',
  setRecognitionText,
  referenceEditorError = '',
  setImages,
  bg360Image,
  bg360Enabled,
  isAnalyzing,
  analysisProgressRef,
  analyzeThought,
  isCastListCopied,
  setIsCastListCopied,
  currentStep,
  setShowModal,
  imageInputBudget,
  imageInputError,
  styleJson,
  setStyleJson
}) {
  const materialInputRef = useRef(null);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Allow the same files to be selected again after an over-limit rejection.
    event.target.value = '';
    if (!apiKey) setShowModal(true);
    else processFiles(files);
  };
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
          <Camera size={18} /> STEP 01: 素材の認識（人物・背景・小物）
        </div>
        {isAnalyzing && <Loader2 size={18} className="animate-spin text-blue-400" />}
        {currentStep > 1 && <CheckCircle2 size={18} className="text-blue-500" />}
      </div>

      <div className="reference-intake-guidance" aria-live="polite">
        <p>素材の追加は、下の「素材画像を選択」ボタンでも、STEP1の枠内全体へのドロップでもできます。後からの追加も同じ操作です。</p>
        <p className="reference-image-count">参照素材画像：{imageInputBudget.characterImageCount} / {imageInputBudget.maxCharacterImages}枚（あと{imageInputBudget.remaining}枚・OpenAI／Gemini共通）</p>
        <p className="mt-1 text-[11px] text-slate-400">
          {bg360Enabled ? '360°背景ON：その他の参照素材は合計10枚まで。API用に4コマ分の背景枠を確保します。Webへは元の360°背景1枚を添付するため、元画像は合計11枚までです。' : '人物・表情集・三面図・通常背景・小物を合わせて14枚まで。360°背景ONでは、その他の参照素材は合計10枚までです。'}
          作風JSONは枚数に含めません。上限を超える追加は受け付けず、既存の画像・設定を保持します。
        </p>
        <p className="mt-1 text-[11px] text-slate-400">素材をまとめてドロップすると、AIが種類・同じ人物・関係・使いどころを判断し、シナリオとAPI／Webの描画指示へ極力反映します。認識できない場合や取り違える場合、今回のまんがには使用しない場合もあります。素材全点の登場や完全再現を保証するものではありません。</p>
        <p>2D背景と360°背景が両方ある場合、指定がなければ360°背景を舞台の基準にします。自由入力の素材・コマ別指定を優先し、2D背景も場面に合う範囲で使います。添付順は画像番号との対応づけのためで、背景の使用優先度を決めるものではありません。</p>
        <p className="mt-1 text-[11px] text-slate-400">1枚に複数の人物・素材が載っていても1枚です。同じ人物の表情集・三面図は一人分の資料として扱います。</p>
        <p className="mt-1 text-[11px] text-slate-400">ChatGPTやGeminiのWeb版で生成するときは、STEP1で読み込んだ素材画像をもう一度添付してください。添付する順番は、STEP1に現在表示されている「1、2、3…」の番号順です。360°背景は途中で追加しても最後に表示されます。その後に通常素材を追加すると、360°背景は最後へ繰り下がり、番号も更新されます。API画像生成では、アプリが対応づけて送信するため、並べ直しや再添付は不要です。</p>
      </div>
      {(imageInputError || !imageInputBudget.fits) && (
        <p role="alert" className="mb-4 rounded-lg border border-amber-500/50 bg-amber-950/30 p-3 text-xs text-amber-200 leading-relaxed">
          {imageInputError || `現在のキャラシート画像が上限${imageInputBudget.maxCharacterImages}枚を超えています。画像を減らしてください。`}
        </p>
      )}

      <div className="reference-file-selection">
        <button type="button" onClick={() => materialInputRef.current?.click()} disabled={isAnalyzing}>
          素材画像を選択 (STEP 1)
        </button>
        <input ref={materialInputRef} type="file" multiple accept="image/*,.json" onChange={handleFileChange} disabled={isAnalyzing} hidden />
      </div>
      <div className="reference-drop-area" role="region" aria-label="読み込んだ素材画像">
        {images.map((img, i) => (
          <div key={i} className="reference-thumbnail">
            <img src={img} className="w-full h-full object-cover shadow-sm" alt={`参照素材${i + 1}`} title={`画像${i + 1}\n${referenceAssets.find(asset => asset.image === img)?.items.map(item => `${REFERENCE_KIND_LABELS[item.kind]}: ${item.name} — ${item.description}`).join('\n') || '解析待ち'}`} />
            <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center truncate">{i + 1}: {referenceAssets.find(asset => asset.image === img)?.items.map(item => REFERENCE_KIND_LABELS[item.kind]).filter((kind, index, kinds) => kinds.indexOf(kind) === index).join('・') || '解析待ち'}</span>
            <button
              onClick={() => setImages(images.filter((_, idx) => idx !== i))}
              disabled={isAnalyzing}
              aria-label={`参照素材${i + 1}を削除`}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-all backdrop-blur-[1px]"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {bg360Image && (
          <div
            className={`relative w-[112px] min-w-[112px] max-w-[112px] h-14 flex-shrink-0 rounded-lg overflow-hidden border ${bg360Enabled ? 'border-cyan-500/50' : 'border-slate-700'} transition-all`}
            title={`画像${images.length + 1}\n360°パノラマ背景 (下の「場所設定」から詳細確認可能)`}
          >
            <img src={bg360Image} className={`w-full h-full object-cover shadow-sm ${bg360Enabled ? 'opacity-100' : 'opacity-40 grayscale'}`} alt="360 bg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1">
              <Globe size={8} /> {images.length + 1}: 360°背景
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
        {images.length === 0 && !isAnalyzing && (
          <div style={{ minWidth: 0 }} className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <p className="text-xs font-bold text-slate-400">
              キャラクター設定・表情集・三面図・背景・小物の画像をまとめて選択するか、STEP1の枠内全体にドロップしてください。分類や番号の指定は不要です。後から追加でき、360°背景や作風設定JSONも一緒に読み込めます。
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
          </div>
        )}

        {isAnalyzing && (
          <div className="flex-1 flex items-center gap-3 ml-4 animate-in fade-in slide-in-from-left-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <div className="text-xs font-mono text-blue-300">
              Analyzing {images.length} sheets... <span className="text-slate-500 ml-2 text-[10px]">(数十秒〜数分待機)</span>
            </div>
          </div>
        )}
      </div>

      <div ref={analysisProgressRef} className="reference-analysis-progress">
        <ThinkingLog thought={analyzeThought} />
      </div>

        <div className="reference-recognition">
          <div className="reference-recognition-heading">
            <h3><label htmlFor="reference-recognition-editor">認識結果（人物・背景・小物／編集できます）</label></h3>
          </div>
          <p className="reference-recognition-note">解析ログの結果をここに表示し、シナリオ・描画指示へ引き継ぎます。認識できない場合や取り違える場合、今回のまんがには使用しない場合もあります。</p>
        <textarea
          id="reference-recognition-editor"
          value={recognitionText}
          onChange={(e) => setRecognitionText(e.target.value)}
          className="reference-recognition-editor"
          aria-invalid={Boolean(referenceEditorError)}
          disabled={isAnalyzing}
          placeholder="画像をアップロードして特徴を自動抽出、または直接入力して設定を記述します。"
        />
        {referenceEditorError && <p role="alert">{referenceEditorError}</p>}
        <div className="mt-2 relative z-50">
          <button
            onClick={() => {
              navigator.clipboard.writeText(recognitionText);
              setIsCastListCopied(true);
              setTimeout(() => setIsCastListCopied(false), 2000);
            }}
            disabled={!recognitionText || Boolean(referenceEditorError)}
            className={`w-full ${isCastListCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCastListCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {isCastListCopied ? "コピー完了" : "📋 認識結果をコピー"}
          </button>
        </div>
      </div>
    </section>
  );
}
