import React from 'react';
import {
  Copy,
  Globe,
  Loader2,
  CheckCircle2,
  Download,
  ImageIcon,
  ChevronDown,
  AlertTriangle,
  Trash2,
  Check,
  BrainCircuit,
  Wand2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import ThinkingLog from './ThinkingLog';
import Panorama360Viewer from './Panorama360Viewer';

const getGeneratedImageExtension = (dataUrl) => {
  const mimeMatch = typeof dataUrl === 'string' ? dataUrl.match(/^data:([^;,]+)/) : null;
  const mimeType = (mimeMatch?.[1] || 'image/png').toLowerCase();
  return {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  }[mimeType] || 'png';
};

const CHATGPT_2X_UPSCALE_PROMPT = `SELF-TRAINED 2X IMAGE UPSCALE TASK

Use the attached image as the only visual source. Create a 2x upscaled version of that exact image.

Execution rules:
- Use only the Python environment available in this chat.
- You may use standard Python libraries plus Pillow, NumPy, OpenCV if available, and PyTorch if available.
- Do not install packages.
- Do not download models, weights, checkpoints, ONNX files, datasets, or code from the internet.
- Do not use any external pretrained super-resolution model.

Method:
1. Read the attached image and record its original width and height.
2. If the image is very large, train on a resized working copy while preserving the original aspect ratio.
3. Build training pairs from the image itself: crop random patches, downscale them to create low-resolution inputs, then learn low-resolution to high-resolution restoration from those pairs.
4. Use a tiny residual CNN suitable for CPU execution. Keep it lightweight enough to finish quickly.
5. Train briefly with an L1-style reconstruction objective and mild augmentation such as flips.
6. Upscale the original image to exactly 2x width and 2x height with a high-quality interpolation baseline.
7. Apply the trained CNN as a subtle restoration pass. Use tiled inference if needed to avoid memory issues.
8. Preserve the original composition, colors, speech bubbles, Japanese text, title, watermarks, panel borders, and aspect ratio. Do not redraw, reinterpret, crop, extend, or change the story.

Fallback:
If PyTorch or GPU/CPU time is unavailable, make the best possible 2x result with Pillow/OpenCV interpolation plus conservative sharpening, and clearly say that the neural restoration pass was skipped.

Output:
- Display the 2x upscaled image directly in the chat/web page if the interface supports inline image display.
- If inline display is not possible, provide a file link labeled exactly: 2倍アップスケール画像をダウンロード
- After the image, report only this short Japanese summary:

完了しました。2倍にアップスケールしました。
入力: {input_width}x{input_height} px → 出力: {output_width}x{output_height} px

Replace the placeholders with the measured pixel values.
Do not include implementation notes unless an error prevents completion.`;

/**
 * STEP 04: 4コマ漫画生成 ＆ 履歴パネル
 */
export default function Step4Panel({
  outputRef,
  currentStep,
  isSearching,
  isAnalyzing,
  isEnhancing,
  finalPrompt,
  copyPrompt,
  assembleThought,
  enableChatGPTMode,
  selectedEngine,
  bg360Image,
  bg360Analysis,
  bg360Enabled,
  bg360CameraWork,
  bg360CroppedPanels,
  isCopied,
  isMetaSaved,
  setIsMetaSaved,
  castList,
  scenario,
  punchlineType,
  colorMode,
  enhanceExpressions,
  enhanceBodyLang,
  enhanceEffects,
  enhanceBackgrounds,
  enhanceCameraWork,
  enhanceDialogue,
  SYSTEM_VERSION,
  isAssembling,
  regenerateImage,
  isGeneratingImage,
  isFixPromptCopied,
  setIsFixPromptCopied,
  isPolicyPanelOpen,
  setIsPolicyPanelOpen,
  isPolicyCopied,
  setIsPolicyCopied,
  policyErrorMsg,
  setPolicyErrorMsg,
  regenerateSafePrompt,
  isFixingPolicy,
  policyFixLog,
  genLogRef,
  genLog,
  imageResultRef,
  generatedImage,
  isFullAutoMode,
  fullAutoStep,
  mangaTitle,
  isFallbackUsed,
  usedModel,
  enableOpenAIApi,
  showPolicyChoice,
  policyAutoRetrying,
  handlePolicyAutoFix,
  handlePolicySwitchToWeb
}) {
  const generatedImageExtension = getGeneratedImageExtension(generatedImage);
  const [isUpscalePromptCopied, setIsUpscalePromptCopied] = React.useState(false);

  return (
    <div
      ref={outputRef}
      className="relative flex flex-col gap-12 mt-12 border-t border-white/5 pt-12 transition-all duration-500"
    >
      {/* 出力結果ロックオーバーレイ */}
      {(currentStep < 3 || isSearching || isAnalyzing || isEnhancing) && (
        <div style={{ position: 'absolute', inset: -2, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', pointerEvents: 'auto', borderRadius: '0.625rem' }} />
      )}

      {/* 左: プロンプト & 思考ログ */}
      <section className="relative group h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-[#0d1117] p-8 rounded-xl border border-white/5 shadow-3xl h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={copyPrompt}
                disabled={!finalPrompt}
                className="bg-[#1c2128] hover:bg-white hover:text-black text-slate-400 p-2 rounded-lg transition-all border border-white/10"
                title="プロンプトをコピー"
              >
                <Copy size={14} />
              </button>
              <span className="text-[9px] font-mono text-slate-600">DYNAMIC ENGINE V1.2.3</span>
            </div>
          </div>

          <ThinkingLog thought={assembleThought} placeholder="> ボタンを押すとプロンプト構築ログがここに表示されます..." />

          <div className="flex flex-col h-full mt-4 gap-4">
            <div className="relative flex-1">
              <textarea
                value={finalPrompt}
                readOnly
                style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
                className="w-full h-full min-h-[300px] text-xs font-mono border-none resize-none focus:outline-none leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500"
                placeholder="◀ 上の「画像用の指示文（プロンプト）を構築する」ボタンを押すと、ここに生成された指示文（プロンプト）が表示されます。"
              />
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col gap-4 mt-2 relative z-50">
              {/* 360°背景モード時のリマインダーバナー */}
              {bg360Image && bg360Analysis && bg360Enabled && finalPrompt && (
                <div className="bg-[#0a1628] border border-cyan-500/30 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                        <Globe size={12} /> 🌐 360°背景モード (ON)
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        このプロンプトと一緒に以下を添付してください：<br />
                        <span className="text-white">✅ キャラクターシート（いつも通り）</span><br />
                        <span className="text-cyan-300">✅ 360°背景画像（読み込み済みのファイル）</span><br />
                        <span className="text-slate-500">※AIがアスペクト比2:1の画像を自動的に背景参照として認識します</span>
                      </p>
                    </div>
                  </div>
                  {/* 360°インタラクティブビューアー */}
                  <Panorama360Viewer imageSrc={bg360Image} height={120} />
                  <p className="text-[9px] text-slate-600 text-center">ドラッグで回転 / ホイールでズーム</p>

                  {/* カメラワーク＋クロップ画像プレビュー */}
                  {bg360CameraWork && bg360CroppedPanels && bg360CroppedPanels.length === 4 && (
                    <div className="mt-2 border-t border-cyan-500/20 pt-3">
                      <div className="text-[10px] font-bold text-amber-300 mb-2 flex items-center gap-1">
                        🎬 AI Camera Work — コマ別方角プレビュー
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {bg360CameraWork.panels.map((panel, idx) => {
                          const dirs = ['北(正面)', '北東', '東(右)', '南東', '南(背面)', '南西', '西(左)', '北西'];
                          const dirLabel = dirs[Math.round(((panel.yaw % 360 + 360) % 360) / 45) % 8];
                          return (
                            <div key={idx} className="relative">
                              <img
                                src={bg360CroppedPanels[idx]}
                                alt={`Panel ${panel.panel} - ${dirLabel}`}
                                className="w-full aspect-[4/3] object-cover rounded-md border border-cyan-500/30 shadow-lg"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-[7px] text-cyan-200 px-1 py-0.5 rounded-b-md text-center truncate">
                                <span className="font-bold">コマ{panel.panel}</span> {dirLabel} <span className="text-slate-400">FOV{panel.fov}°</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[8px] text-slate-600 text-center mt-2">各コマで使用される背景の方角</p>
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={copyPrompt}
                disabled={!finalPrompt}
                className={`w-full ${isCopied ? 'bg-green-600' : 'bg-slate-800 hover:bg-slate-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10`}
              >
                {isCopied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                {isCopied ? "コピー完了！" : "📋 プロンプトをコピーする"}
              </button>

              {/* コピーボタン下の親切な補足ガイド */}
              {finalPrompt && (
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-white/5">
                  {selectedEngine === 'openai' ? (
                    (bg360Image && bg360Enabled) ? (
                      <span>💡 <strong>【手動生成用】</strong> コピーしたプロンプトを <strong>ChatGPT公式Web版</strong> に貼り付け、<strong>キャラクターシート画像</strong> と <strong>360°背景画像</strong> を一緒に添付して送信してください。</span>
                    ) : (
                      <span>💡 <strong>【手動生成用】</strong> コピーしたプロンプトを <strong>ChatGPT公式Web版</strong> に貼り付け、<strong>キャラクターシート画像</strong> を一緒に添付して送信してください。</span>
                    )
                  ) : (
                    enableChatGPTMode ? (
                      <span>💡 <strong>【手動生成用（ChatGPT専用）】</strong> コピーしたプロンプトを <strong>ChatGPT公式Web版</strong> に貼り付け、<strong>キャラクターシート画像</strong>（および360°背景画像）を一緒に添付して送信してください。（※毎回新しいチャットで生成することを推奨）</span>
                    ) : (
                      (bg360Image && bg360Enabled) ? (
                        <span>💡 <strong>【手動生成用】</strong> コピーしたプロンプトを外部の <strong>Gemini公式Web版</strong> などに貼り付け、<strong>キャラクターシート画像</strong> と <strong>360°背景画像</strong> を一緒に添付して送信してください。</span>
                      ) : (
                        <span>💡 <strong>【手動生成用】</strong> コピーしたプロンプトを外部の <strong>Gemini公式Web版</strong> などに貼り付け、<strong>キャラクターシート画像</strong> を一緒に添付して送信してください。</span>
                      )
                    )
                  )}
                </div>
              )}

              {/* メタデータ保存ボタン */}
              <button
                onClick={async () => {
                  const now = new Date();
                  const isoTime = now.toISOString();
                  const promptMode = selectedEngine === 'openai' ? 'ChatGPT Engine (自動)' : (enableChatGPTMode ? 'ChatGPT専用プロンプト' : 'Gemini用プロンプト');
                  
                  // ハッシュ計算 (Proof of Generation)
                  const dataToHash = `${scenario || ""}|${finalPrompt || ""}|${isoTime}|${SYSTEM_VERSION}`;
                  const encoder = new TextEncoder();
                  const data = encoder.encode(dataToHash);
                  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                  const hashArray = Array.from(new Uint8Array(hashBuffer));
                  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                  const metadata = {
                    "ファイル情報": {
                      "フォーマットバージョン": 2,
                      "生成ツール": "Super FURU AI 4-koma System",
                      "アプリバージョン": SYSTEM_VERSION,
                      "リポジトリ": "https://github.com/FURUYAN1234/nano-banana-pro",
                      "保存日時": now.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
                      "ISO日時": isoTime
                    },
                    "来歴と証跡 (Provenance & Audit)": {
                      "使用モデル (Model Accountability)": usedModel || (selectedEngine === 'openai' ? "gpt-image-2" : "gemini-3.1-flash-image"),
                      "フォールバック発生 (Fallback Occurred)": !!isFallbackUsed,
                      "生成証明ハッシュ (Proof of Generation)": hashHex,
                      "ハッシュアルゴリズム": "SHA-256",
                      "ハッシュ対象データ構成": "シナリオ本文 + 最終プロンプト + ISOタイムスタンプ + アプリバージョン",
                      "コンテンツフットプリント (Content Footprint)": {
                        "プロンプト文字数": finalPrompt ? finalPrompt.length : 0,
                        "シナリオ文字数": scenario ? scenario.length : 0
                      }
                    },
                    "プロンプト判別": {
                      "モード": promptMode,
                      "AIエンジン": selectedEngine === 'openai' ? 'ChatGPT' : 'Gemini',
                      "ChatGPTモード": enableChatGPTMode,
                      "説明": selectedEngine === 'openai'
                        ? "ChatGPT Engine で全ルーチンを実行。ChatGPT Images 2.0 専用プロンプトが自動生成されます。"
                        : enableChatGPTMode
                          ? "ChatGPT Images 2.0 専用に最適化されたプロンプトです。Geminiには非対応です。"
                          : "Gemini用プロンプトです。ChatGPTに貼り付けるとレイアウトが崩れる可能性があります。"
                    },
                    "キャラクターシート解析結果": castList || "(未解析)",
                    "シナリオ": scenario || "(未生成)",
                    "最終プロンプト": finalPrompt || "(未生成)",
                    "生成設定": {
                      "パンチラインタイプ": punchlineType,
                      "カラーモード": colorMode,
                      "強化オプション": {
                        "表情強化": enhanceExpressions,
                        "ボディランゲージ強化": enhanceBodyLang,
                        "照明・演出強化": enhanceEffects,
                        "背景強化": enhanceBackgrounds,
                        "カメラワーク強化": enhanceCameraWork,
                        "セリフ・ギャグ強化": enhanceDialogue
                      },
                      "360度背景": {
                        "画像読込": !!bg360Image,
                        "有効": bg360Enabled,
                        "場所": bg360Analysis?.location || "(未解析)",
                        "空間タイプ": bg360Analysis?.spatialType || "(未解析)",
                        "光源": bg360Analysis?.lighting || "(未解析)"
                      }
                    }
                  };
                  const jsonStr = JSON.stringify(metadata, null, 2);
                  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  const titleMatch = scenario?.match(/タイトル[:：]\s*(.+)/);
                  const titleSlug = titleMatch ? titleMatch[1].trim().substring(0, 20).replace(/[\\/:*?"<>|]/g, '_') : 'untitled';
                  const ts = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
                  a.download = `AI_4-koma_metadata_${titleSlug}_${ts}.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                  setIsMetaSaved(true);
                  setTimeout(() => setIsMetaSaved(false), 2500);
                }}
                disabled={!finalPrompt}
                className={`w-full ${isMetaSaved ? 'bg-green-600' : 'bg-amber-900/50 hover:bg-amber-800/60'} ${isMetaSaved ? 'text-white' : 'text-amber-400'} font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border ${isMetaSaved ? 'border-green-500/50' : 'border-amber-700/30'} disabled:opacity-30 disabled:cursor-not-allowed text-sm`}
              >
                {isMetaSaved ? '保存完了！' : '📂 設定ファイルを保存 (JSON)'}
              </button>
            </div>

            <div className="relative mt-2">
              {!isAssembling && !finalPrompt && (
                <div style={{ position: 'absolute', inset: -2, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.85)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', pointerEvents: 'auto', borderRadius: '0.625rem' }} />
              )}

              {/* Instruction Footer */}
              <div className="bg-slate-900 border-t border-white/10 p-2 text-[11px] text-slate-500 text-center font-mono">
                ※内容を修正したい場合は、上の「シナリオ」を直接書き換えてから、再度 <span className="text-orange-400 font-bold">「最終プロンプトを構築する」</span> を押してください。
              </div>

              <button
                onClick={regenerateImage}
                disabled={!finalPrompt || isGeneratingImage || isFixingPolicy}
                className={`w-full ${selectedEngine === 'openai' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-orange-600 hover:bg-orange-500'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`}
              >
                {isGeneratingImage ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} />}
                <div className="flex flex-col items-center">
                  <span>{isGeneratingImage ? "画像を生成中..." : `画像を生成する (STEP 4: ${selectedEngine === 'openai' ? 'ChatGPT Images 2.0' : 'Google AI'})`}</span>
                </div>
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2">
                ⚠️ このアプリ経由の自動生成では、キャラクター設定や背景の画像を直接添付できないため、<span className="text-amber-400/80">文章（テキスト）のみを元にした「おまかせ生成」</span>になります。
                キャラクターの見た目や背景を正確に再現したい場合は、下の <span className="text-orange-300">💡 コツ（プロのやり方）</span> を参考に、ブラウザ版での手動生成をお試しください。
              </p>

              {/* PRO TIPS FOR EXTERNAL GENERATION */}
              <div className="mt-4 p-3 bg-orange-950/40 border border-orange-500/30 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 text-orange-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                  </div>
                  <div className="text-xs text-orange-200/80 leading-relaxed font-sans">
                    <span className="font-bold text-orange-300">💡 コツ（プロのやり方）：完璧な4コマ漫画を作りたい時は？</span><br />
                    {selectedEngine === 'openai' ? (
                      <>
                        キャラクターの見た目が崩れたり、背景がイメージと異なる場合は、上の「コピー」ボタンでプロンプトをコピーし、公式の <a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ChatGPTウェブ版 🤖</a> に<strong>「元のキャラクター設定画像（および360°背景画像）」</strong>と一緒に直接貼り付けて送信してください。<br />
                        画像そのものを参照して生成するため、キャラクターのクオリティや再現度が劇的に向上します！<br />
                        <span className="inline-block mt-2 text-[12px] text-yellow-300 font-bold bg-yellow-900/50 px-2 py-1.5 rounded border border-yellow-500/30">
                          ⚠️ 注意：プロンプトを貼り付けた際、ファイルとして添付されてしまった場合は、必ず「テキストフィールドに表示」をクリックしてプロンプトの全文を展開してから、キャラクターシート等の画像を添付してください。
                        </span><br />
                        <span className="inline-block mt-2 text-[11px] text-cyan-300/80">
                          ⚠️ <strong>ChatGPTの仕様上、縦に細長すぎる画像になってしまう場合</strong>は、ChatGPT側の「アスペクト比」ボタンで手動修正するのではなく、以下の「画像比率修正プロンプト」をコピーしてChatGPTに貼り付けてみてください。綺麗な4コマの形に修正されます。
                        </span>
                      </>
                    ) : (
                      <>
                        キャラクターの見た目が崩れたり、背景がイメージと異なる場合は、上の「コピー」ボタンでプロンプトをコピーし、公式の <a href="https://gemini.google.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Geminiウェブ版 🤖</a> に<strong>「元のキャラクター設定画像（および360°背景画像）」</strong>と一緒に直接貼り付けて送信してください。<br />
                        画像そのものを参照して生成するため、キャラクターのクオリティや再現度が劇的に向上します！
                      </>
                    )}

                    {selectedEngine === 'openai' && (
                      <div className="mt-3 block w-full">
                        <button
                          className={`mt-2 ${isFixPromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-slate-700 hover:bg-slate-600 border-white/10'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                          style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                          onClick={() => {
                            const titleFromPrompt =
                              finalPrompt?.match(/Top page:\s*draw large bold black Japanese text that reads exactly "([^"]+)"/i)?.[1] ||
                              finalPrompt?.match(/Top page:\s*draw large bold Japanese text title:\s*"([^"]+)"/i)?.[1] ||
                              scenario?.match(/タイトル[:：]\s*([^\n]+)/)?.[1]?.trim().replace(/\s+([!！?？]+)$/u, '$1') ||
                              "";
                            const titleReapplyBlock = titleFromPrompt ? `
━━━━━━━━━━━━━━━━━━
■ TITLE RE-APPLICATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST REDRAW the top title exactly: "${titleFromPrompt}"
- The title MUST be large bold black Japanese text centered above Panel 1.
- The title is NOT optional. Do NOT omit it while fixing A4 size.
- Reserve enough top title area inside the A4 canvas so the title is fully visible and not cropped.
- Do NOT move the title into a speech bubble, caption box, panel background, watermark, or dialogue.
` : "";
                            const fixPrompt = `[ABSOLUTE OVERRIDE — FORCE FULL REBUILD]

You MUST discard the previously generated image completely.
DO NOT crop, resize, extend, pad, or reuse any part of the previous image.
This is NOT a correction. This is a FULL REGENERATION.

THIS IS A STRUCTURAL CORRECTION TASK. PRIORITIZE LAYOUT OVER STYLE.

━━━━━━━━━━━━━━━━━━
■ ART STYLE PRESERVATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST maintain the high-quality lighting, shading, and rich details of the original manga style.
- DO NOT simplify the art style or colors. 
- "Prioritizing layout" does NOT mean you can degrade the artistic rendering quality.

━━━━━━━━━━━━━━━━━━
■ CANVAS — HARD LOCK
━━━━━━━━━━━━━━━━━━
- Aspect ratio MUST be EXACTLY 1:1.414 (A4 portrait)
- Resolution MUST be EXACTLY 1024×1448 px
- Any taller-than-A4 output is STRICTLY FORBIDDEN
- Any 3:4, square, or long-strip image is a FAILURE

━━━━━━━━━━━━━━━━━━
■ PANEL SYSTEM — HARD LOCK
━━━━━━━━━━━━━━━━━━
- EXACTLY 4 panels
- Panels MUST be horizontal strips stacked vertically
- ALL panels MUST be identical size (height & width)
- Panels MUST fill ~95% of canvas width
- NO extra margins on ANY edge (top/bottom/left/right)

■ GUTTERS
- Thick white gutters between panels (approx 3% height)
- Gutters MUST be uniform
- Panels MUST NOT touch
${titleReapplyBlock}

━━━━━━━━━━━━━━━━━━
■ WATERMARK RE-APPLICATION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST REDRAW the watermarks exactly on the 4th panel.
- Bottom-Right watermark: "Generated by ChatGPT with Super FURU AI 4-koma ${SYSTEM_VERSION}"
- Bottom-Left watermark: "ネームから全自動の自律式統合AI漫画システム :https://note.com/happy_duck780" (Use an extremely small font size to prevent it from overlapping with the right watermark)
- Both MUST be horizontal text (left-to-right). NEVER rotate 90 degrees. Make sure they do not overlap.
- Do NOT forget to include them in this new generation.

━━━━━━━━━━━━━━━━━━
■ ANTI-ANTIGRAVITY SAFETY
━━━━━━━━━━━━━━━━━━
- Antigravity / extreme camera distortion MUST NOT change canvas shape
- Perspective distortion is allowed ONLY inside panels
- The OUTER CANVAS must remain perfectly A4 rectangular
- NO vertical stretching of entire image
- NO panel deformation due to camera effects

━━━━━━━━━━━━━━━━━━
■ FULL RE-LAYOUT (CRITICAL)
━━━━━━━━━━━━━━━━━━
- You MUST rebuild ALL panel compositions from scratch
- Recalculate framing, character placement, and camera for A4
- DO NOT reuse previous layout, even partially
- DO NOT "adjust" — COMPLETELY REDRAW

━━━━━━━━━━━━━━━━━━
■ STRICT FAILURE CONDITIONS
━━━━━━━━━━━━━━━━━━
If ANY of the following occurs, REGENERATE AGAIN automatically:
- Canvas ratio is not exactly 1:1.414 → FAIL
- Image is taller than A4 → FAIL
- Panels are uneven → FAIL
- Margins exist → FAIL
- Panels look cropped or stretched → FAIL
- Top title is missing, cropped, moved into a panel, or rewritten → FAIL
- Layout resembles previous image → FAIL
- Watermarks are missing → FAIL

Repeat regeneration until ALL conditions are satisfied.

━━━━━━━━━━━━━━━━━━
■ HORIZONTAL-TO-VERTICAL TEXT CORRECTION (CRITICAL)
━━━━━━━━━━━━━━━━━━
- ALL text inside speech bubbles MUST be vertical Japanese (tategaki: top-to-bottom, right-to-left columns).
- If ANY speech bubble text is horizontal (yokogaki: left-to-right), you MUST redraw those bubbles with vertical text.
- This applies to ALL panels — check every single speech bubble.
- Horizontal text in speech bubbles is a FAILURE condition and requires immediate correction.

━━━━━━━━━━━━━━━━━━
■ OUTPUT RULE
━━━━━━━━━━━━━━━━━━
SELF-REVIEW before finalizing:
1. Verify finger count on all visible hands (exactly 5 fingers each).
2. Verify ALL speech bubble text is vertical (tategaki). If ANY horizontal text is found → REDRAW those bubbles immediately.
3. Check for text errors or garbled characters and fix internally.
4. Verify the top title is present, centered, fully visible, and copied exactly.

Only output the corrected A4 4-panel manga image.
No explanations. No partial results.`;
                            navigator.clipboard.writeText(fixPrompt);
                            setIsFixPromptCopied(true);
                            setTimeout(() => setIsFixPromptCopied(false), 2000);
                          }}
                        >
                          📋 画像比率修正プロンプトをコピー
                          {isFixPromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                        </button>
                        <div className="mt-3 pt-3 border-t border-orange-500/20">
                          <p className="text-[11px] text-cyan-300/80 leading-relaxed">
                            ✨ ChatGPTの画像を2倍にアップスケールしたい場合は、生成済画像に対して、以下の「画像2倍アップスケールプロンプト」をコピーしてChatGPTに貼り付けてみてください。高精細な画像に補正されます。
                          </p>
                          <button
                            className={`mt-2 ${isUpscalePromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-cyan-900/70 hover:bg-cyan-800/80 border-cyan-500/30'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                            style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                            onClick={() => {
                              navigator.clipboard.writeText(CHATGPT_2X_UPSCALE_PROMPT);
                              setIsUpscalePromptCopied(true);
                              setTimeout(() => setIsUpscalePromptCopied(false), 2000);
                            }}
                          >
                            <span style={{ visibility: isUpscalePromptCopied ? 'hidden' : 'visible' }}>📋 画像2倍アップスケールプロンプトをコピー</span>
                            {isUpscalePromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* [v4.2.0] コンテンツポリシー選択メッセージボックス（パネルとは独立） */}
              {showPolicyChoice && (
                <div className="mt-4 bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/40 rounded-xl p-5 space-y-3 shadow-lg shadow-red-900/20">
                  <div className="flex items-center gap-2 text-red-300 font-bold" style={{ fontSize: '14px' }}>
                    <AlertTriangle size={20} className="text-red-400 animate-pulse" />
                    <span>⚠️ 画像生成が制限されました（ポリシー制限）</span>
                  </div>
                  <p className="text-yellow-200/80 leading-relaxed" style={{ fontSize: '12px' }}>
                    表現の一部がAIの安全基準（ポリシー）に触れたため、画像の生成がスキップされました。以下の方法で解決できます：
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 border border-blue-400/30"
                      style={{ fontSize: '12px' }}
                      onClick={handlePolicyAutoFix}
                      disabled={policyAutoRetrying || isFixingPolicy || isGeneratingImage}
                    >
                      {policyAutoRetrying ? (
                        <><Loader2 size={16} className="animate-spin" /> 自動修正中...</>
                      ) : (
                        <><RefreshCw size={16} /> 自動修正して再生成する</>
                      )}
                    </button>
                    <button
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/10"
                      style={{ fontSize: '12px' }}
                      onClick={handlePolicySwitchToWeb}
                      disabled={policyAutoRetrying || isGeneratingImage}
                    >
                      <ExternalLink size={16} /> Web版に切り替える
                    </button>
                  </div>
                  <p className="text-slate-400" style={{ fontSize: '10px' }}>
                    💡 「自動修正して再生成する」を選ぶと、AIが安全な表現に言葉を書き換えて再度作り直します。
                  </p>
                </div>
              )}

              {/* コンテンツポリシー手動救済パネル（折りたたみ式・任意で開ける） */}
              <div className={`mt-4 border border-yellow-500/30 rounded-lg overflow-hidden ${!finalPrompt ? 'opacity-40 pointer-events-none' : ''}`}>
                <button
                  className="w-full flex items-center justify-between px-4 py-3 bg-yellow-900/25 hover:bg-yellow-900/50 transition-all duration-150 cursor-pointer disabled:cursor-not-allowed border-l-4 border-yellow-500 hover:border-yellow-400 group/policy-hdr"
                  onClick={() => setIsPolicyPanelOpen(!isPolicyPanelOpen)}
                  disabled={!finalPrompt}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <span className="text-base font-black tracking-wide text-yellow-200 group-hover/policy-hdr:text-yellow-100 transition-colors">安全基準（ポリシー）に引っかかって画像が出ない場合</span>
                    {!finalPrompt && <span className="text-[10px] text-slate-500">(STEP3完了後に利用可能)</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-colors">
                      {isPolicyPanelOpen ? 'クリックで閉じる' : 'クリックで開く'}
                    </span>
                    <ChevronDown size={18} className={`text-yellow-400 group-hover/policy-hdr:text-yellow-300 transition-all duration-300 ${isPolicyPanelOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isPolicyPanelOpen && (
                  <div className="p-3 bg-yellow-950/20 space-y-3" style={{ fontSize: '12px' }}>
                    <div className="text-yellow-200/80 leading-relaxed space-y-2" style={{ fontSize: '11px' }}>
                      <p>
                        web貼り付け方式でコンテンツエラーが出た場合は、下の <strong className="text-yellow-100">「質問メッセージをコピー」</strong> ボタンを押し、ChatGPTやGeminiのチャット欄に貼り付けて送信すると、より具体的な制限の原因を教えてもらえます。
                      </p>
                      <p>
                        AIから返ってきた回答を下の入力欄に貼り付けると、 <strong className="text-yellow-100">「表現を調整したプロンプトを再生成する」</strong> ボタンが押せるようになります。
                      </p>
                    </div>

                    <button
                      className={`${isPolicyCopied ? 'bg-green-600 border-green-500/30' : 'bg-slate-700 hover:bg-slate-600 border-white/10'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                      style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                      onClick={() => {
                        navigator.clipboard.writeText("先ほどのプロンプトが拒否された理由を教えてください。具体的にどの単語・表現がコンテンツポリシーに違反していましたか？");
                        setIsPolicyCopied(true);
                        setTimeout(() => setIsPolicyCopied(false), 2000);
                      }}
                    >
                      <span style={{ visibility: isPolicyCopied ? 'hidden' : 'visible' }}>📋 制限の理由を尋ねる質問をコピー</span>
                      {isPolicyCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                    </button>

                    <textarea
                      style={{ color: '#ffffff', backgroundColor: '#000000' }}
                      className="w-full bg-[#000000] text-white text-xs p-2 rounded border border-yellow-500/20 focus:border-yellow-500/50 outline-none min-h-[60px] font-mono placeholder-slate-500"
                      value={policyErrorMsg}
                      onChange={(e) => setPolicyErrorMsg(e.target.value)}
                      placeholder={selectedEngine === 'openai'
                        ? "例: Your request was rejected as a result of our safety system...\n例: content_policy_violation と表示された\n例: アオリ構図が弾かれたかもしれない"
                        : "例: I can't generate images that depict minors...\n例: Geminiの回答: 制服と未成年の組み合わせが原因...\n例: アオリ構図が弾かれたかもしれない"}
                    />

                    <button
                      className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-700 disabled:opacity-50 text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all"
                      style={{ fontSize: '12px' }}
                      onClick={regenerateSafePrompt}
                      disabled={isFixingPolicy || isGeneratingImage || !policyErrorMsg.trim() || !finalPrompt}
                    >
                      {isFixingPolicy ? (
                        <><Loader2 size={16} className="animate-spin" /> 分析・修正中...</>
                      ) : (
                        <><Wand2 size={16} /> 表現をマイルドに修正して再生成する</>
                      )}
                    </button>

                    {/* コンテンツポリシーログ */}
                    <pre style={{ height: '160px', overflowY: 'auto' }} className="text-xs text-green-400 bg-black/60 p-3 rounded whitespace-pre-wrap font-mono custom-scrollbar leading-relaxed">
                      {policyFixLog || "> 待機中... 「配慮版プロンプトを再生成する」ボタンを押すとAI分析を開始します。"}
                    </pre>
                  </div>
                )}
              </div>

              {/* Generation Log Terminal */}
              <div
                ref={genLogRef}
                className="mt-4 p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-xs text-green-400 custom-scrollbar"
                style={{ height: '160px', overflowY: 'auto' }}
              >
                <div className="opacity-50 mb-2 border-b border-white/10 pb-1 flex justify-between text-xs">
                  <span>🖥 画像生成ログ (STEP 4)</span>
                  <span className={selectedEngine === 'openai' ? "text-emerald-500" : "text-blue-500"}>{selectedEngine === 'openai' ? 'v1.3.5 (ChatGPT Images 2.0)' : 'v1.3.5 (Gemini Native Image)'}</span>
                </div>
                {genLog.length === 0 ? (
                  <div className="text-white/30">待機中... 「画像を生成する」ボタンを押すと開始します。</div>
                ) : (
                  genLog.map((log, i) => (
                    <div key={i} className="mb-1 leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
                {isGeneratingImage && <div className="animate-pulse">_</div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 右: 生成画像エリア */}
      <section ref={imageResultRef} className="relative group bg-[#0d1117] rounded-xl border border-white/5 min-h-[600px] flex flex-col overflow-hidden">
        {/* 描画エリアロックオーバーレイ */}
        {(((!generatedImage && !isGeneratingImage) || isSearching || isAssembling || isEnhancing || (isFullAutoMode && fullAutoStep > 0 && fullAutoStep < 4)) && !isGeneratingImage) && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.85)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', pointerEvents: 'auto', borderRadius: '0.75rem' }} className="flex flex-col items-center justify-center">
            {(isSearching || isAssembling || isEnhancing || (isFullAutoMode && fullAutoStep > 0 && fullAutoStep < 4)) && (
              <div className="flex flex-col items-center gap-3 bg-black/60 px-8 py-6 rounded-2xl border border-white/10 shadow-2xl animate-pulse">
                 <Loader2 size={36} className="animate-spin text-blue-500" />
                 <span className="text-sm font-bold tracking-widest text-blue-400">
                   {(isSearching || isAssembling) ? "シナリオ・プロンプト生成中..." : "自動生成 待機中..."}
                 </span>
              </div>
            )}
          </div>
        )}

        {/* 画像生成中のオーバーレイ */}
        {isGeneratingImage && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 200, backgroundColor: 'rgba(10,12,16,0.85)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', pointerEvents: 'auto', borderRadius: '0.75rem' }} className="flex flex-col items-center justify-center">
            <div className="relative flex flex-col items-center justify-center space-y-6 w-full max-w-md mx-auto">
              <Loader2 size={64} className="animate-spin text-blue-500 mx-auto" />
              <div className="absolute inset-0 blur-xl bg-blue-500/10 animate-pulse pointer-events-none" />

              <div className="z-10 bg-black/80 border border-blue-500/50 rounded-2xl px-8 py-6 shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-in fade-in zoom-in duration-300 backdrop-blur-md w-full">
                <p className="text-lg font-black text-blue-400 tracking-widest animate-pulse flex items-center justify-center gap-2">
                  画像生成中 <span className="flex space-x-1"><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span><span className="animate-bounce delay-300">.</span></span>
                </p>
                <p className="text-xs text-blue-200/90 mt-4 font-bold text-center leading-relaxed">
                  高品質な画像を生成しています。<br />
                  <span className="text-orange-400">※最大2〜6分程度かかる場合があります。<br/>このままお待ちください。</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Title Header */}
        <div className="w-full bg-[#050608] border-b border-white/5 p-6 flex items-center justify-center z-20 shadow-xl">
          {mangaTitle ? (
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest leading-relaxed text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {mangaTitle}
            </h3>
          ) : (
            <div className="h-8 w-32 bg-white/5 rounded-full animate-pulse" />
          )}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative p-4 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          {generatedImage ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              <img src={generatedImage} className="max-w-full max-h-[70vh] object-contain shadow-2xl" alt="Generated Result" />
              
              {/* 妥協版警告の復活 */}
              {isFallbackUsed && (
                <div className="w-full max-w-2xl bg-orange-500/10 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-lg mt-2 mx-auto">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-orange-500 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm">
                      <h4 className="text-orange-400 font-bold mb-1">【ご案内】混雑のため一時的に簡易モデルで生成されました</h4>
                      <p className="text-orange-200/80 leading-relaxed mb-3">
                        最新モデルへの接続が大変混み合っているため、一時的に自動バックアップ用のモデルで画像を生成しました。<br/>
                        このため、<span className="text-white font-bold">セリフの文字化けや、キャラクターの見た目のズレ</span> が発生しやすくなっています。
                      </p>
                      <div className="bg-black/40 rounded p-3 text-left">
                        <p className="text-orange-300 font-bold mb-2">完璧な画質・正確なキャラクターで生成する手順：</p>
                        <ol className="list-decimal list-inside text-slate-300 space-y-1 text-xs">
                          <li>画面左側の「<span className="text-white font-bold">プロンプトをコピーする</span>」ボタンを押します。</li>
                          <li><a href={enableOpenAIApi ? "https://chatgpt.com/" : "https://gemini.google.com/app"} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{enableOpenAIApi ? 'ChatGPTウェブ版' : 'Geminiウェブ版'}</a> を開きます。</li>
                          <li>コピーした文章を貼り付け、元のキャラクターシート画像を一緒に添付して送信してください。</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full px-8 mt-2">
                <button
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = generatedImage;
                    // API別ファイル名: AI_4koma_comic_{API名}_{タイトル}_{年月日時分秒14桁}.png
                    const now = new Date();
                    const apiName = selectedEngine === 'openai' ? 'ChatGPT' : 'Gemini';
                    // タイトル取得: mangaTitle state → scenarioからの抽出 → フォールバック
                    let rawTitle = mangaTitle;
                    if (!rawTitle && scenario) {
                      const m = scenario.match(/##\s*タイトル[:：]\s*(.+?)(?:\s*!|\s*$)/m);
                      if (m) rawTitle = m[1].trim();
                    }
                    const titleSlug = rawTitle
                      ? rawTitle.substring(0, 30).replace(/[\\/:*?"<>|\s]/g, '_')
                      : 'untitled';
                    const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;
                    a.download = `AI_4koma_comic_${apiName}_${titleSlug}_${ts}.${generatedImageExtension}`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/20 active:scale-95"
                >
                  <Download size={20} /> 元画像をダウンロード (.{generatedImageExtension})
                </button>

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full mt-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-slate-600/50 active:scale-95"
                >
                  最初（STEP 1）に戻る
                </button>
              </div>

            </div>
          ) : (
            <div className="opacity-30 space-y-6 flex flex-col items-center justify-center w-full h-full text-center">
              <BrainCircuit size={80} className="mx-auto" />
              <div className="space-y-2 text-center">
                <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-500">Ready to Start</p>
                <p className="text-[10px] font-bold text-slate-600">ここに生成された4コマ漫画が表示されます</p>
              </div>
            </div>
          )}
        </div>
      </section>


    </div>
  );
}
