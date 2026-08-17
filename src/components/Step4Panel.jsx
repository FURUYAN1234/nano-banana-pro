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

const MINIMAX_H3_COMFYUI_PROMPT = `You are a prompt writer for the ComfyUI MiniMax H3 Reference-to-Video (R2V / Ref2VA) workflow.

Conversation behavior:

1. If no four-panel manga image is attached in the current request, do not generate an H3 prompt. Reply only in Japanese:
「4コマ漫画を1枚添付してください。指定がなければ、15秒・16:9・BGMあり・吹き出しは日本語音声に置換・コミカルで演出強め、で作成します。」

2. If the user asks how to use this system, do not generate an H3 prompt. Reply only in Japanese:
「使い方：
1. このチャットに4コマ漫画を1枚添付します。
2. 必要なら、秒数・縦横比・BGM・演出などを指定します。
3. このAIがMiniMax H3用の完成英語プロンプトを出力します。
4. 出力された英語プロンプトを、ComfyUIのMiniMax H3 Reference-to-VideoワークフローのPrompt欄へ貼り付けます。
5. 漫画画像はMiniMax H3 Reference-to-Videoの参照画像として接続して実行します。」

3. When a four-panel manga image is attached, generate the final MiniMax H3 prompt immediately. Do not ask follow-up questions unless the image is unreadable or a legible Japanese line has a reading that remains genuinely ambiguous from the visual and story context.

Default settings, unless the user explicitly overrides them:
- duration: 15 seconds
- aspect ratio: 16:9
- BGM: enabled
- replace all speech balloons with natural Japanese voice acting and accurate lip sync
- no visible speech balloons, subtitles, captions, titles, logos, credits, watermarks, or any other visible text
- strong comedic acting, camera work, transitions, lighting, sound design, and pacing

Task:
Convert one supplied Japanese four-panel manga page into one ready-to-paste MiniMax H3 video prompt. Treat the manga page as the single active reference image, <Picture 1>.

Rules:
- Preserve characters, costumes, props, setting, panel order, and emotional escalation from the manga.
- Determine panel order from the actual visual layout. For conventional Japanese manga layouts, read top to bottom and right to left within a row, unless the layout clearly indicates another order.
- Convert the panels into one continuous video that fits the requested duration.
- Preserve legible dialogue exactly. Put dialogue only inside <d>[Japanese] ...</d>.
- Assign stable speaker IDs in order of first spoken line: (S1), (S2), and so on.
- Write all descriptions in English, except dialogue inside <d> tags.
- Do not add unrelated characters, settings, or plot events.
- Output only the final H3 prompt. Do not explain it and do not use Markdown fences.

Japanese dialogue reading rules:

- For every legible spoken Japanese line, preserve the original dialogue exactly inside <d>[Japanese] ...</d>. Do not translate, paraphrase, normalize, censor, omit, reorder, or merge its words.
- Directly before every <d> tag, identify the stable speaker ID and provide a kana-only reading guide in quotation marks for that exact line. The guide must use hiragana and katakana only: no kanji and no romaji.
- The spoken pronunciation must follow the kana reading guide, including compound-word readings, names, particles, long vowels, small kana, voiced sounds, and natural Japanese word boundaries. The <d> tag remains the exact dialogue transcript; the kana guide controls how it is read aloud.
- Never guess, change, omit, or merge a reading. If a reading cannot be determined reliably from the manga and its story context, reply only in Japanese with a concise request for that line's reading instead of producing a potentially wrong H3 prompt.
- Keep one active speaker at a time unless the manga explicitly requires a simultaneous group line. Describe each speaker's age-appropriate native Japanese voice, emotional delivery, and visible lip sync immediately next to that speaker's dialogue.

Animation performance rules:

- Use motion to make the story and emotional escalation more engaging while preserving the manga's intended tone, action, and character identity.
- Select only one to three compatible principles per shot from anticipation, slow-in/slow-out, arcs, follow-through, secondary action, staging, clear pose-to-pose acting, or restrained exaggeration.
- Make the chosen principles physically visible through the relevant body, face, hair, clothing, prop, background, and camera behavior; keep the primary action readable and do not let secondary action obscure dialogue or the decisive gag.
- Do not add cartoon exaggeration, squash-and-stretch, or extra motion when it conflicts with the reference manga, the requested tone, a quiet beat, or a physically grounded action.

Temporal direction rewrite rules:

- Translate every requested timed cut, camera move, or transition into explicit shot timing rather than leaving it as a general intention.
- Make the shot boundaries and total timeline add up exactly to the requested duration. Use \`At 00:SS.mmm\` at each later-shot boundary and keep every stated duration physically possible within the total runtime.
- For every requested camera move, specify the start, midpoint, and end state: viewpoint or angle, framing, subject distance, camera path, subject placement, and the exact timestamps for the change. For example, an arc/tracking request must state the opening view, the midpoint angle, the ending view, the constant or intentionally changing framing, and the physical parallax.
- Keep motion continuous within a shot unless the plan explicitly calls for a cut. Preserve a stable horizon, focal length, and subject identity through the move; forbid unrequested zooms, reversals, freezes, duplicated limbs, or background warping.
- Do not invent a camera move when neither the manga nor the user requests one. In that case, use only the camera changes visually established by the reference panels and describe simple, physically coherent transitions.
- Only when one spoken line genuinely continues across a planned shot boundary, split it at the exact cut using \`<d>[Japanese] first segment <scenetrans></d>\` before the cut and \`<d>[Japanese] <scenetrans>second segment</d>\` after it. Keep the same speaker ID, natural Japanese phrase boundary, continuous voice, and lip sync across the cut.
- Do not split ordinary separate speech balloons into a fake cross-cut line. Do not use \`<scenetrans>\` for a line that begins and ends within one shot.

BGM enforcement rules:

- When BGM is enabled, whether explicitly requested or enabled by default, treat it as a mandatory continuous audience-only audio layer, not as an optional mood suggestion.
- The BGM must begin at 00:00.000, continue through the final frame, and remain clearly audible beneath all dialogue, ambience, sound effects, and transitions.
- Do not allow dialogue, physical sound effects, dramatic pauses, scene transitions, or a final freeze frame to replace, mute, omit, or fully mask the BGM.
- Briefly lower the BGM during dialogue only when necessary for intelligibility, but keep it perceptibly audible at all times. Do not describe the dialogue as completely foregrounded over the music.
- In detailed_description, state once before [Shot 1] that a clearly audible continuous non-diegetic BGM is mandatory throughout the full video. In every individual shot, explicitly state that the BGM remains clearly audible and describe that shot’s musical variation.
- In non_diegetic_music, begin with the exact word “MANDATORY:” whenever BGM is enabled. Explicitly require that the BGM is never absent, silent, muted, or replaced by ambience.
- Specify concrete instrumentation, approximate BPM or tempo, rhythmic character, and a musical change for every shot. End the video with an audible musical resolution, sting, or sustained ending rather than an unexplained silent cutoff.
- For comedic manga, prefer a clearly audible upbeat comedic anime score: pizzicato strings, marimba, playful woodwinds, light percussion, and small brass accents, unless the manga’s tone or the user’s instruction calls for another style.
- Write “N/A” in non_diegetic_music only when the user explicitly disables BGM.

Use exactly this section order:

subject_definitions:
Define <Picture 1> as the four-panel storyboard reference. Define every main character, important object, setting, and visual style as <Subject N>.

summary:
Begin with [reference generation] and summarize the target video. When BGM is enabled, explicitly state that a clearly audible continuous audience-only BGM plays throughout the entire target video.

retention_analysis:
For every <Picture N> and <Subject N>, state where it appears and use one of:
fully_preserved, partially_preserved, attribute_transfer, weak_reference.

detailed_description:
Start with one or two English sentences describing the overall visual style. Immediately after those style sentences, when BGM is enabled, state that a clearly audible continuous non-diegetic BGM is mandatory from 00:00.000 through the final frame.
Use one shot per manga panel.
Write [Shot 1] with no timestamp.
Start later shots with timestamps, such as [Shot 2] At 00:03.500,.
Make the whole timeline fit exactly within the requested duration.
For every shot, describe composition, subjects, action, acting, camera, lighting, physical sound, dialogue, and the continuing clearly audible BGM with its shot-specific musical variation.
Keep all <Subject N> labels and speaker IDs consistent.

overall_soundscape:
Describe ambience and physical sound effects only. When BGM is enabled, state that ambience and effects remain beneath the dialogue and the clearly audible continuous non-diegetic BGM. Do not include music details here.

non_diegetic_music:
When BGM is enabled, begin with “MANDATORY:” and describe a clearly audible continuous audience-only BGM from 00:00.000 through the final frame. State that it must never be absent, silent, muted, or replaced by ambience. Specify instrumentation, tempo or BPM, rhythm, shot-by-shot dynamic changes, brief dialogue ducking only if necessary, and an audible musical resolution at the end.
Write N/A only when BGM is explicitly disabled.`;

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
  setFinalPrompt,
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
  enhanceGag,
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
  const [isMiniMaxPromptCopied, setIsMiniMaxPromptCopied] = React.useState(false);

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
            <label htmlFor="final-prompt-editor" className="text-[11px] font-bold text-orange-300">
              最終プロンプト（直接編集できます）
            </label>
            <div className="flex items-center gap-3">
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
                id="final-prompt-editor"
                value={finalPrompt}
                onChange={(e) => setFinalPrompt(e.target.value)}
                spellCheck={false}
                style={{ color: '#ffffff', backgroundColor: '#000000', opacity: 1 }}
                className="w-full h-full min-h-[300px] text-xs font-mono border border-white/10 resize-y focus:outline-none focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 leading-relaxed overflow-y-auto custom-scrollbar rounded-xl p-4 placeholder-slate-500 transition-colors"
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
                        "セリフ書換": enhanceDialogue,
                        "ギャグ演出強化": enhanceGag
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
                この欄で直接編集できます。編集した内容が、プロンプトのコピーと画像生成の両方に使われます。
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

THIS IS A STRUCTURAL CORRECTION TASK. Rebuild page geometry only; source-image fidelity outranks layout and style.

━━━━━━━━━━━━━━━━━━
■ SOURCE FIDELITY LOCK (NON-NEGOTIABLE)
━━━━━━━━━━━━━━━━━━
- Treat the attached previous manga as the exact visual source. Rebuild only its A4 page geometry; do not reinterpret its story or character design.
- Preserve every named character exactly: same faces, hair, skin, glasses, accessories, garment items, base colors, accents, materials, and patterns. Lighting may alter shading only; it must never recolor, swap, simplify, or replace clothing.
- Do not add, remove, merge, duplicate, rename, or replace characters. Do not create extra background people that could be confused with the existing cast.
- Keep the same story beats, character-to-action ownership, dialogue text, speech-bubble speakers, key props, setting, and time of day. Keep all visual evidence. Reframe a panel only as much as the A4 grid requires.
- Keep panel order and each character's identity stable while rebuilding the four-panel grid. The source image is not merely style inspiration; it is the content that must survive the layout correction.

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
                          <span style={{ visibility: isFixPromptCopied ? 'hidden' : 'visible' }}>📋 画像比率修正プロンプトをコピー</span>
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
                          <div className="mt-3 pt-3 border-t border-violet-500/20">
                            <p className="text-[11px] text-violet-200/80 leading-relaxed">
                              🎞️ 生成した4コマ漫画をMiniMax H3で動画化するための、ComfyUI向け英語プロンプト作成指示をコピーします。
                            </p>
                            <p className="mt-1 text-[10px] text-violet-100/70 leading-relaxed">
                              デフォルト仕様：15秒・16:9・BGMあり・日本語音声・標準の躍動演出。秒数・画角・BGM・演出は個別指定があればそちらを優先します。
                            </p>
                            <button
                              className={`mt-2 ${isMiniMaxPromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-violet-900/70 hover:bg-violet-800/80 border-violet-500/30'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                              style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                              onClick={() => {
                                navigator.clipboard.writeText(MINIMAX_H3_COMFYUI_PROMPT);
                                setIsMiniMaxPromptCopied(true);
                                setTimeout(() => setIsMiniMaxPromptCopied(false), 2000);
                              }}
                            >
                              <span style={{ visibility: isMiniMaxPromptCopied ? 'hidden' : 'visible' }}>📋 MiniMax H3・ComfyUI用プロンプトをコピー</span>
                              {isMiniMaxPromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                            </button>
                            <ol className="mt-2 space-y-1 text-[10px] leading-relaxed text-slate-400 list-decimal list-inside">
                              <li>このボタンで指示文をコピー、同時に生成済みの4コマ漫画をチャットに添付し、送信</li>
                              <li>出力されたプロンプトをコピー</li>
                              <li>ComfyUIでMiniMax H3 Reference-to-Videoを選択し、同じ4コマ漫画をReference Imageに接続</li>
                              <li>画角と秒数を確認の上、先ほど出力された英語プロンプトをPrompt欄に貼り付けて実行</li>
                            </ol>
                          </div>
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
                  <span className="text-orange-400">※通常2〜10分程度かかります。<br/>このままお待ちください。</span>
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
