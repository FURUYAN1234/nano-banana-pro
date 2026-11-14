import React, { useLayoutEffect, useRef } from 'react';
import {
  Camera,
  Loader2,
  CheckCircle2,
  Trash2,
  Globe,
  Copy
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';
import RelatedAppLink from './RelatedAppLink';
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
  castList = '',
  castEditorText = castList,
  editCastList,
  editReferenceItem,
  bg360Analysis,
  editBackground,
  showStatus,
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
  const materialDetailsRef = useRef(null);
  const materialReadyState = images.map(image => {
    const asset = referenceAssets.find(entry => entry.image === image);
    return asset?.items?.length && (asset.analysisCompleted === true || asset.items.some(item => item.kind !== 'unknown')) ? 'ready' : 'pending';
  }).join(',');
  const panoramaReady = Boolean(bg360Enabled && bg360Analysis);
  const hasRecognizedMaterials = materialReadyState.includes('ready') || panoramaReady;
  // Open newly recognized/current materials, without reopening on name or
  // description edits after the user has deliberately collapsed the list.
  useLayoutEffect(() => {
    if (materialDetailsRef.current) materialDetailsRef.current.open = hasRecognizedMaterials;
  }, [images, materialReadyState, panoramaReady, hasRecognizedMaterials, isAnalyzing]);
  // Only per-material descriptions grow. The common character field keeps its
  // six-line base height and its own scrollbar/manual resize before and after AI.
  useLayoutEffect(() => {
    const container = materialDetailsRef.current;
    if (!container) return;
    const fit = () => {
      if (!container.open) return;
      container.querySelectorAll('textarea').forEach(field => {
        field.style.height = '0px';
        field.style.height = `${field.scrollHeight + 2}px`;
      });
    };
    fit();
    container.addEventListener('toggle', fit);
    let width = container.clientWidth;
    const observer = new ResizeObserver(() => {
      if (container.clientWidth !== width) {
        width = container.clientWidth;
        fit();
      }
    });
    observer.observe(container);
    return () => { container.removeEventListener('toggle', fit); observer.disconnect(); };
  }, [images, referenceAssets, bg360Analysis, bg360Enabled, isAnalyzing]);
  const canCopyRecognition = !isAnalyzing && Boolean(recognitionText.trim()) && !referenceEditorError
    && images.every(image => referenceAssets.some(asset => asset.image === image
      && asset.items?.length > 0 && (asset.analysisCompleted === true || asset.items.every(item => item.kind !== 'unknown'))));
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
        if (!Array.from(e.dataTransfer.types || []).includes('Files')) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = isAnalyzing ? 'none' : 'copy';
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsDragging(false);
      }}
      onDrop={(e) => {
        if (!e.dataTransfer.files?.length) return;
        e.preventDefault();
        setIsDragging(false);
        if (isAnalyzing) return;
        if (!apiKey) setShowModal(true);
        else processFiles(e.dataTransfer.files);
      }}
      aria-label="STEP1 キャラクターシート読み込み・画像ドロップ範囲"
      className={'reference-step-panel group p-8 rounded-xl flex flex-col relative min-h-[300px]' + (isDragging ? ' is-dragging' : '')}
    >
      <div className="flex items-center justify-between mb-6 z-10">
        <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest ${currentStep === 1 ? 'text-blue-400' : 'text-slate-500'} `}>
          <Camera size={18} /> STEP 01: キャラクターシート読み込み
        </div>
        {isAnalyzing && <Loader2 size={18} className="animate-spin text-blue-400" />}
        {currentStep > 1 && <CheckCircle2 size={18} className="text-blue-500" />}
      </div>

      <div className="reference-upload-primary">
        <strong>{isDragging ? (isAnalyzing ? '画像を解析中です。完了後に追加できます' : 'この枠内で放して画像を読み込む') : 'キャラクターシートをここへドロップ'}</strong>
        <p>この青い枠の内側すべてが画像のドロップ範囲です。下の白い人物情報欄の上でも受け付けます。</p>
        <span>または、ファイルから選択</span>
        <div className="reference-file-selection">
        <button type="button" onClick={() => materialInputRef.current?.click()} disabled={isAnalyzing}>
          素材画像を選択 (STEP 1)
        </button>
        <input ref={materialInputRef} type="file" multiple accept="image/*,.json" onChange={handleFileChange} disabled={isAnalyzing} hidden />
        </div>
      </div>

      <RelatedAppLink app="character" />

      {(imageInputError || !imageInputBudget.fits) && (
        <p role="alert" className="mb-4 rounded-lg border border-amber-500/50 bg-amber-950/30 p-3 text-xs text-amber-200 leading-relaxed">
          {imageInputError || `現在のキャラシート画像が上限${imageInputBudget.maxCharacterImages}枚を超えています。画像を減らしてください。`}
        </p>
      )}

      <div className="reference-drop-area" role="region" aria-label="読み込んだ素材画像">
        {images.map((img, i) => (
          <div key={img} className="reference-thumbnail" title={`画像${i + 1}\n${referenceAssets.find(asset => asset.image === img)?.items.map(item => `${REFERENCE_KIND_LABELS[item.kind]}: ${item.name} — ${item.description}`).join('\n') || '解析待ち'}`}>
            <img src={img} className="w-full h-full object-cover shadow-sm" alt={`参照素材${i + 1}`} />
            <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white text-center truncate">{i + 1}: {referenceAssets.find(asset => asset.image === img)?.items.map(item => REFERENCE_KIND_LABELS[item.kind]).filter((kind, index, kinds) => kinds.indexOf(kind) === index).join('・') || '解析待ち'}</span>
            <button
              onClick={() => setImages(current => current.filter(image => image !== img))}
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
            title={`${bg360Enabled ? `画像${images.length + 1}` : '番号なし・参照OFF'}\n360°パノラマ背景 (下の「場所設定」から詳細確認可能)`}
          >
            <img src={bg360Image} className={`w-full h-full object-cover shadow-sm ${bg360Enabled ? 'opacity-100' : 'opacity-40 grayscale'}`} alt="360 bg" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[8px] text-cyan-300 text-center font-bold px-1 py-0.5 truncate flex items-center justify-center gap-1">
              <Globe size={8} /> {bg360Enabled ? `${images.length + 1}: 360°背景` : '360°背景・参照OFF'}
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
              人物の表情集・三面図も、背景・小物の画像もまとめて追加できます。分類や画像番号は自動で付けます。
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

      <details className="reference-intake-guidance"><summary>素材の追加ルールとWebでの使用</summary>
        <p>画像がない場合は、Story Makerの「STEP1用」人物情報を白い欄へ貼り付けます。人物名の連番見出し・「外見:」「服装:」が必要です。人物画像がない場合はこのテキストを人物の基準とし、API生成とWeb用指示文へ反映します。背景や描法見本は人物シートの代わりには使いません。</p>
        <p>素材の追加は、下の「素材画像を選択」ボタンでも、STEP1の枠内全体へのドロップでもできます。後からの追加も同じ操作です。</p>
        <p>追加・削除・背景ON/OFF後は認識結果と人物設定を更新し、シナリオ以降を作り直します。画像をすべて外した人物は設定も削除し、差し替え画像は新たに解析します。残る人物と手入力人物の編集は保持します。Webへ貼付済みの指示文・添付画像は、新しい内容と現在の番号順に差し替えてください。</p>
        <p className="reference-image-count">参照素材画像：{imageInputBudget.characterImageCount} / {imageInputBudget.maxCharacterImages}枚（あと{imageInputBudget.remaining}枚・OpenAI／Gemini共通）</p>
        <p className="mt-1 text-[11px] text-slate-400">
          {bg360Enabled ? '360°背景ON：その他の参照素材は合計10枚まで。API用に4コマ分の背景枠を確保します。Webへは元の360°背景1枚を添付するため、元画像は合計11枚までです。' : '人物・表情集・三面図・通常背景・小物を合わせて14枚まで。360°背景ONでは、その他の参照素材は合計10枚までです。'}
          作風JSONは枚数に含めません。上限を超える追加は受け付けず、既存の画像・設定を保持します。
        </p>
        <p className="mt-1 text-[11px] text-slate-400">素材をまとめてドロップすると、AIが種類・同じ人物・関係・使いどころを判断し、シナリオとAPI／Webの描画指示へ極力反映します。認識できない場合や取り違える場合、今回のまんがには使用しない場合もあります。素材全点の登場や完全再現を保証するものではありません。</p>
        <p>2D背景と360°背景が両方ある場合、指定がなければ360°背景を舞台の基準にします。自由入力の素材・コマ別指定を優先し、2D背景も場面に合う範囲で使います。添付順は画像番号との対応づけのためで、背景の使用優先度を決めるものではありません。</p>
        <p className="mt-1 text-[11px] text-slate-400">1枚に複数の人物・素材が載っていても1枚です。同じ人物の表情集・三面図は一人分の資料として扱います。</p>
        <p className="mt-1 text-[11px] text-slate-400">ChatGPTやGeminiのWeb版で生成するとき、STEP1で画像を読み込んだ場合は同じ素材画像をもう一度添付してください。人物設定テキストだけを使う場合、人物画像の添付は不要です。画像がある場合の添付順は、STEP1に現在表示されている「1、2、3…」の番号順です。360°背景は途中で追加しても最後に表示されます。その後に通常素材を追加すると、360°背景は最後へ繰り下がり、番号も更新されます。API画像生成では、アプリが対応づけて送信するため、並べ直しや再添付は不要です。</p>
      </details>

      <div ref={analysisProgressRef} className="reference-analysis-progress">
        <ThinkingLog thought={analyzeThought} />
      </div>

      {!isAnalyzing && <div className="reference-recognition">
          <div className="reference-recognition-heading">
            <h3><label htmlFor="reference-recognition-editor">認識結果（人物・背景・小物／編集できます）</label></h3>
          </div>
          <p className="reference-recognition-note">解析ログの結果をここに表示し、シナリオ・描画指示へ引き継ぎます。人物名欄と人物設定の名前見出しは、どちらを編集しても連動します。同じ人物の別シートにも反映します。認識できない場合や取り違える場合、今回のまんがには使用しない場合もあります。</p>
        <details className="reference-material-details" ref={materialDetailsRef} open={hasRecognizedMaterials}>
          <summary>素材ごとの認識詳細：{images.flatMap(image => referenceAssets.find(asset => asset.image === image)?.items || []).map(item => REFERENCE_KIND_LABELS[item.kind] + ' ' + item.name).join(' ／ ') || '解析待ち'}</summary>
        {!images.length && !panoramaReady && <p>画像の認識結果はありません。人物設定テキストだけを使う場合は、下の人物情報欄へ貼り付けてください。</p>}
        {images.map((image, imageIndex) => {
          const asset = referenceAssets.find(entry => entry.image === image);
          return <div key={image} className="reference-recognition-item">
            {asset?.items?.length ? asset.items.map((item, itemIndex) => <div key={itemIndex} className="reference-recognition-row">
              <span>{itemIndex === 0 ? `画像${imageIndex + 1}` : ''}</span>
              <label>{REFERENCE_KIND_LABELS[item.kind]}：<input aria-label={`画像${imageIndex + 1}の素材${itemIndex + 1}の名前`}
                value={item.name} onChange={event => editReferenceItem(image, itemIndex, 'name', event.target.value)} /></label>
              <textarea aria-label={`画像${imageIndex + 1}の素材${itemIndex + 1}の認識内容`} rows={1}
                value={item.description} onChange={event => editReferenceItem(image, itemIndex, 'description', event.target.value)} />
            </div>) : <span>画像{imageIndex + 1}：解析待ち</span>}
          </div>;
        })}
        {bg360Enabled && bg360Analysis && <div className="reference-recognition-item">
          <strong>画像{images.length + 1}：360°背景</strong>
          {Object.entries({location:'場所', lighting:'光', objects:'小物・設備', mood:'雰囲気'}).map(([field, label]) =>
            <label key={field}>{label}<input value={bg360Analysis[field] || ''} onChange={event => editBackground(field, event.target.value)} /></label>)}
        </div>}
        </details>
        <div className="reference-recognition-scroll" role="region" aria-label="人物設定">
        <label htmlFor="reference-recognition-editor">人物情報（画像の認識結果／Story Makerから貼り付け） <span className="editable-field-badge">✎ 編集できます</span></label>
        <p id="reference-character-input-help" className="reference-character-input-help">画像をドロップすると、認識した人物情報がここに入ります。画像がない場合はStory Makerの「STEP1用」人物情報を貼り付けてください。「## 1. 名前」の連番見出し・「外見:」「服装:」が必要です。台本はSTEP2へ貼り付けます。</p>
        <p className="field-edit-help">名前・外見・服装を修正してからSTEP2へ進めます。台本がある状態で人物設定を変えた場合は、STEP2以降を作り直してください。</p>
        <textarea
          id="reference-recognition-editor"
          rows={6}
          value={castEditorText}
          onChange={(e) => editCastList(e.target.value)}
          className="reference-recognition-editor"
          aria-describedby="reference-character-input-help"
          aria-invalid={Boolean(referenceEditorError)}
          disabled={isAnalyzing}
          placeholder={'キャラクターシート画像をこの欄へドロップ → 認識結果を表示\n画像がない場合：Story Makerの「STEP1用」人物情報を貼り付け\n\n人物情報の形式：\n## 1. 葵\n外見: 短い黒髪、丸い眼鏡。\n服装: 紺色のジャケット、黒いズボン。'}
        />

        </div>
        {referenceEditorError && <p role="alert">{referenceEditorError}</p>}
        <div className="mt-2 relative z-50">
          <button
            onClick={async () => {
              setIsCastListCopied(false);
              try {
                await navigator.clipboard.writeText(recognitionText);
                setIsCastListCopied(true);
                setTimeout(() => setIsCastListCopied(false), 2000);
              } catch {
                showStatus('コピーできませんでした。ブラウザーのクリップボード権限を確認してください。');
              }
            }}
            disabled={!canCopyRecognition}
            className={`w-full ${isCastListCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCastListCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
            {isCastListCopied ? "コピー完了" : "📋 認識結果をコピー"}
          </button>
        </div>
      </div>}
    </section>
  );
}
