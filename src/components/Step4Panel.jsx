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
import { GEMINI_A4_RELAYOUT_PROMPT, GEMINI_2K_REFINEMENT_PROMPT } from '../lib/gemini-image-edit';
import { getEffectiveEngine } from '../lib/engine-state';
import { MINIMAX_H3_COMFYUI_PROMPT } from '../lib/minimax-h3-prompt';

const COMFYUI_WORKFLOW_FILENAME = 'Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json';
const COMFYUI_WORKFLOW_DOWNLOAD_URL = `${import.meta.env.BASE_URL}workflows/${COMFYUI_WORKFLOW_FILENAME}`;
const COMFYUI_CUSTOM_NODE_FILENAME = 'ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip';
const COMFYUI_CUSTOM_NODE_DOWNLOAD_URL = `${import.meta.env.BASE_URL}downloads/${COMFYUI_CUSTOM_NODE_FILENAME}`;

const H3_ACTION_BUTTON_STYLE = Object.freeze({
  fontSize: '10px',
  minWidth: '220px',
  position: 'relative',
  backgroundColor: '#f0f0f0',
  color: '#000000',
  border: '1px solid #000000',
  borderRadius: '0px',
  padding: '1px 6px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 400,
  lineHeight: 'normal',
  boxSizing: 'border-box',
  textDecoration: 'none',
  cursor: 'pointer',
});

const copyTextToClipboard = async (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
  if (copied) return;

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  throw new Error('Clipboard copy failed');
};

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

export const LEGACY_MINIMAX_H3_COMFYUI_PROMPT = `You are a prompt writer for the ComfyUI MiniMax H3 Reference-to-Video (R2V / Ref2VA) workflow.

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
- replace all speech balloons with natural Japanese voice acting and accurate lip sync; remove every original speech-balloon shape, border, tail, and white interior from the moving footage
- the only readable foreground textual elements in the final video are the opening title, dialogue captions, and ending credit production graphics; environmental signage may remain only as background-only visual texture that cannot be read as actual words, Japanese characters, numbers, or URLs
- strong comedic acting, purposeful camera movement, transitions, lighting, sound design, and pacing

Task:
Convert one supplied Japanese four-panel manga page into one ready-to-paste MiniMax H3 video prompt. Treat the manga page as the single active reference image, <Picture 1>.

Rules:
- Preserve characters, costumes, props, setting, panel order, and emotional escalation from the manga.
- Determine panel order from the actual visual layout. For conventional Japanese manga layouts, read top to bottom and right to left within each row, unless the layout clearly indicates another order. When describing panel order in subject_definitions or summary, explicitly keep that same order. Never reduce this to “top-to-bottom” only or reverse a row.
- Convert the panels into one continuous video that fits the requested duration.
- Preserve the source dialogue's spoken meaning, order, and punctuation. Supply it to the H3 speech engine only in its verified kana reading inside <d>[Japanese] ...</d>, and preserve the original Japanese source dialogue separately as the exact caption string.
- Assign stable speaker IDs in order of first spoken line: (S1), (S2), and so on.
- Write all descriptions in English, except the kana-only dialogue inside <d> tags and the original Japanese source dialogue inside caption_text fields.
- Do not add unrelated characters, settings, or plot events.
- Output only the final ready-to-paste H3 prompt in plain text. Do not explain it and do not use Markdown fences. Do not use Markdown link syntax or auto-links.

Japanese dialogue reading rules:

- All Japanese dialogue supplied to MiniMax H3 must be kana-only. For every legible spoken Japanese line, first determine its exact spoken wording and then put that verified hiragana/katakana reading inside <d>[Japanese] ...</d>. Do not put the original kanji transcript inside <d> tags; use it only in the matching caption_text field below.
- Directly before every <d> tag, identify the stable speaker ID and repeat the same kana-only dialogue in quotation marks. Both copies must use hiragana and katakana only: no kanji and no romaji.
- The spoken pronunciation must follow the kana-only dialogue exactly, including compound-word readings, names, particles, long vowels, small kana, voiced sounds, natural Japanese word boundaries, and punctuation pauses.
- Never guess, change, omit, or merge a reading. If a reading cannot be determined reliably from the manga and its story context, reply only in Japanese with a concise request for that line's reading instead of producing a potentially wrong H3 prompt.
- Keep one active speaker at a time unless the manga explicitly requires a simultaneous group line. Describe each speaker's age-appropriate native Japanese voice, emotional delivery, and visible lip sync immediately next to that speaker's dialogue.

Japanese dialogue caption rules:

- For every legible spoken Japanese line, preserve the original Japanese source dialogue as the exact caption string. This source text is separate from the kana-only H3 speech input.
- Immediately beside the matching speaker ID and <d>[Japanese] kana-only reading</d> line, write caption_text: 「exact original Japanese source dialogue」 once. Keep the source punctuation and quotation marks exactly as read from the manga.
- Do not transcribe, paraphrase, normalize, omit, merge, translate, phoneticize, or invent caption text. If a source dialogue line is not legible, reply only in Japanese with a concise request for that exact line instead of generating a potentially wrong H3 prompt.
- Reserve the bottom-center caption safe area for dialogue captions throughout the video. The opening title and ending credit must never occupy or overlap that caption safe area, even when they are visible at the same time as a spoken line.
- For each line, render one clean, bold Japanese sans-serif bottom-center open caption using its caption_text. It must begin exactly when that line begins and disappear when that line ends, following the mapped shot timestamps and matching lip sync. A genuinely cut-spanning line using <scenetrans> keeps one unbroken caption_text active across that cut.
- Maintain strong local contrast for every dialogue caption against its changing background. Caption contrast may use a thin outline, soft shadow, or minimal translucent backing only when needed; keep that treatment compact and avoid covering faces, hands, decisive props, or panel borders.
- Do not make karaoke, word-by-word, phonetic, speaker-name, repeated, or duplicate captions. Do not add captions for narration, sound effects, title, ending credit, signs, props, or any text that is not an audible dialogue line.

Animation performance rules:

- Use motion to make the story and emotional escalation more engaging while preserving the manga's intended tone, action, and character identity.
- Treat every visible character, including background and crowd characters, as an active performer rather than a static part of the scenery.
- Every visible character must perform at least one role-appropriate, physically plausible movement in every shot where they are visible, unless the reference manga or the user explicitly requires that character to remain intentionally still.
- Speaking and story-critical characters must visibly perform their dialogue, facial reaction, gesture, posture shift, or purposeful action. Background and crowd characters must perform restrained secondary action such as blinking, gaze shifts, breathing, weight shifts, hair or clothing response, prop handling, or a context-appropriate reaction.
- Do not leave background or crowd characters as static cutouts, frozen poses, or duplicated looped motion. Keep their secondary action subtle, individually varied, and subordinate to the primary action, dialogue, caption safe area, and decisive gag.
- Select only one to three compatible principles per shot from anticipation, slow-in/slow-out, arcs, follow-through, secondary action, staging, clear pose-to-pose acting, or restrained exaggeration.
- Make the chosen principles physically visible through the relevant body, face, hair, clothing, prop, background, and camera behavior; keep the primary action readable and do not let secondary action obscure dialogue or the decisive gag.
- Do not add cartoon exaggeration, squash-and-stretch, or extra motion when it conflicts with the reference manga, the requested tone, a quiet beat, or a physically grounded action.
- Unless the user explicitly asks for a still shot, every shot must include one modest but clearly visible physically coherent camera trajectory plus visible primary acting. Do not write a static-hold instruction, “same stable composition,” or “no camera move” for the default dynamic-comedy mode.

Temporal direction rewrite rules:

- Translate every requested timed cut, camera move, or transition into explicit shot timing rather than leaving it as a general intention.
- Make the shot boundaries and total timeline add up exactly to the requested duration. Use \`At 00:SS.mmm\` at each later-shot boundary and keep every stated duration physically possible within the total runtime.
- For every requested camera move, specify the start, midpoint, and end state: viewpoint or angle, framing, subject distance, camera path, subject placement, and the exact timestamps for the change. For example, an arc/tracking request must state the opening view, the midpoint angle, the ending view, the constant or intentionally changing framing, and the physical parallax.
- Keep motion continuous within a shot unless the plan explicitly calls for a cut. Preserve a stable horizon, focal length, and subject identity through the move; forbid unrequested zooms, reversals, freezes, duplicated limbs, or background warping.
- In the default dynamic-comedy mode, choose a simple camera move that supports the panel action: a short push-in, lateral track, vertical crane, or gentle arc. Do not use a locked camera unless the user explicitly requests one; do not use extreme zooms, reversals, or unstable camera shake.
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
Write N/A only when BGM is explicitly disabled.

Publication graphics override:

This is an explicit exception to the generic no-visible-text rule above. For this publication-ready version, the only readable foreground textual elements in the entire video are the opening title, dialogue captions, and ending credit. Do not show speech balloons, logos, watermarks, labels, signs, speaker names, captions for non-dialogue text, or any other readable foreground text. Background signs, kiosk screens, placards, labels, and printed props may retain natural-looking text-like texture only when it is too small, blurred, distorted, or abstract to read as actual letters, Japanese words, numbers, or URLs.

1. Perform OCR only to identify the four-panel manga title from the attached image. The title may be outside the panel grid, but it is not video scene material. Use the OCR title exactly as read. Do not invent a title. If OCR cannot read the title reliably, reply only in Japanese with a concise request for the title and do not generate the H3 prompt. Do not treat any text outside manga panels as a video source. The four manga panels alone provide the story, characters, dialogue, action, setting, and visual reference; the OCR title is a separate opening-only production graphic.

2. In the final H3 prompt, add an opening title card only from 00:00.000 through 00:01.600 of a 15-second video. Display the exact title once as a small, tasteful title logo in the visually quietest corner. Choose the corner autonomously after analyzing every panel, and keep a safe margin from faces, hands, speech balloons, decisive props, panel borders, the first action, and the reserved bottom-center caption safe area. Choose the title's type weight, color, outline, subtle shadow, and restrained entrance animation to fit the manga's genre, palette, and emotional tone. Maintain strong contrast against its local background; if color alone is insufficient, add a thin outline, soft shadow, or minimal translucent backing without making a large label. The title must fade out completely by 00:01.600. No title pixels may remain at or after 00:01.600. It must not behave like a subtitle or cover the story.

3. From 00:01.600 through 00:13.200, show no readable foreground text except the exact dialogue captions mapped to audible spoken lines: no title, ending credit, speech balloons, logos, watermarks, speaker names, captions for non-dialogue text, or other overlays. Every dialogue caption must use its caption_text verbatim, remain bottom-center, begin exactly when that line begins, and disappear when that line ends. Remove every original speech-balloon shape, border, tail, and white interior; replace those regions with coherent scene background, lighting, or environmental detail. Preserve the normal H3 dialogue, kana-only speech, BGM, timing, and animation rules above.

4. In a 15-second video, add the ending credit only from exactly 00:13.200 through 00:15.000, once in the visually quietest corner. Do not show the ending credit before 00:13.200, including anywhere earlier in the final story shot. Choose its exact screen position autonomously per video, avoiding faces, dialogue, action, panel borders, and the reserved bottom-center caption safe area; it must never overlap a dialogue caption. Maintain strong contrast against its local background with an adaptive text color and, only when necessary, a thin outline, soft shadow, or minimal translucent backing. Fade the ending credit in gently from 00:13.200 to 00:13.450, keep it compact and fully readable, then fade it out from 00:14.720 through 00:15.000.

Do not emit the ending credit as a literal URL in the authoring response, because chat renderers can transform or escape URLs. Instead, write this exact render instruction in the final H3 prompt and make MiniMax H3 perform the assembly at video render time:
- Literal prefix (exact, including the ASCII space before the colon): ネームから全自動の自律式統合AI漫画システム :
- URL character tokens (concatenate with no spaces): h t t p s : / / n o t e . c o m / h a p p y _ d u c k 7 8 0
- Render the visible ending credit by concatenating that prefix and those URL character tokens, with no spaces, line breaks, brackets, backslashes, markup, or added characters. The character-token instruction itself is the complete credit specification; do not restate, spell out, or independently rewrite the assembled line anywhere else in the authoring response.

5. State the exact opening title card and ending-credit timing, corner-placement rationale, title treatment, and fade behavior in detailed_description. The title and ending credit are production graphics, not dialogue: never put either inside <d> tags and never ask the characters to speak them.`;

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
  // Image generation and every STEP4 label use one resolved provider. Legacy
  // session flags can disagree during a hot update, so never branch on either
  // raw flag directly.
  const isOpenAIImageMode = getEffectiveEngine(selectedEngine, enableOpenAIApi) === 'openai';
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
                  {isOpenAIImageMode ? (
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
                  const promptMode = isOpenAIImageMode ? 'ChatGPT Engine (自動)' : (enableChatGPTMode ? 'ChatGPT専用プロンプト' : 'Gemini用プロンプト');
                  
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
                      "使用モデル (Model Accountability)": usedModel || (isOpenAIImageMode ? "gpt-image-2" : "gemini-3.1-flash-image"),
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
                      "AIエンジン": isOpenAIImageMode ? 'ChatGPT' : 'Gemini',
                      "ChatGPTモード": enableChatGPTMode,
                      "説明": isOpenAIImageMode
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
                className={`w-full ${isOpenAIImageMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-orange-600 hover:bg-orange-500'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg border border-white/10 active:scale-95 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-wait mt-4`}
              >
                {isGeneratingImage ? <Loader2 size={20} className="animate-spin" /> : <ImageIcon size={20} />}
                <div className="flex flex-col items-center">
                  <span>{isGeneratingImage ? "画像を生成中..." : `画像を生成する (STEP 4: ${isOpenAIImageMode ? 'ChatGPT Images 2.0' : 'Google AI'})`}</span>
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
                    {isOpenAIImageMode ? (
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

                    {!isOpenAIImageMode && (
                      <div className="mt-3 block w-full border-t border-blue-500/20 pt-3">
                        <p className="text-[11px] text-cyan-200/90 leading-relaxed">
                          ✨ <strong>Gemini Web用の修正プロンプト</strong>：生成結果の比率・人物・手足・コマ割りがおかしい場合は、下の文をコピーし、Geminiウェブ版に<strong>生成済み画像を添付</strong>して送信してください。
                        </p>
                        <button
                          className={`mt-2 ${isFixPromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-blue-900/70 hover:bg-blue-800/80 border-blue-500/30'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                          style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                          onClick={() => {
                            navigator.clipboard.writeText(GEMINI_A4_RELAYOUT_PROMPT);
                            setIsFixPromptCopied(true);
                            setTimeout(() => setIsFixPromptCopied(false), 2000);
                          }}
                        >
                          <span style={{ visibility: isFixPromptCopied ? 'hidden' : 'visible' }}>📋 Gemini用画像比率修正プロンプトをコピー</span>
                          {isFixPromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                        </button>
                        <button
                          className={`mt-2 ml-2 ${isUpscalePromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-cyan-900/70 hover:bg-cyan-800/80 border-cyan-500/30'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                          style={{ fontSize: '10px', minWidth: '120px', position: 'relative' }}
                          onClick={() => {
                            navigator.clipboard.writeText(GEMINI_2K_REFINEMENT_PROMPT);
                            setIsUpscalePromptCopied(true);
                            setTimeout(() => setIsUpscalePromptCopied(false), 2000);
                          }}
                        >
                          <span style={{ visibility: isUpscalePromptCopied ? 'hidden' : 'visible' }}>📋 Gemini用2K高解像度プロンプトをコピー</span>
                          {isUpscalePromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                        </button>
                        <p className="mt-2 text-[10px] text-slate-400 leading-relaxed">
                          ※アプリ内のGemini APIでは再加工しません。コピーした文と画像をGeminiウェブ版へ貼り付ける手動修正用です。
                        </p>
                      </div>
                    )}

                    {isOpenAIImageMode && (
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
                        </div>
                    </div>
                    )}
                          <div className="mt-3 space-y-5 border-t border-slate-600/40 pt-3">
                            <section aria-labelledby="minimax-h3-intro-heading">
                              <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/15 p-3">
                                <h4 id="minimax-h3-intro-heading" className="text-[13px] font-black text-white">FURU four-panel manga to video / FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）</h4>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                                  Convert one completed Super FURU AI four-panel manga page into a MiniMax H3 video while preserving its panel order, cast, dialogue ownership, actions, setting, and punchline. / 完成したSuper FURU AIの4コマ漫画1枚を、コマ順、登場人物、台詞の話者、動作、場所、オチを守ったMiniMax H3動画へ変換します。MiniMax H3は参照画像のキャラクター・構図・場面を引き継ぎながら動画を生成する Reference-to-Video モデルです。
                                </p>
                                <p className="mt-2 text-[10px] font-bold text-cyan-100">利用方法は2つあります。</p>
                                <ul className="mt-1 space-y-1 text-[10px] leading-relaxed text-slate-300 list-disc pl-4">
                                  <li><strong>ComfyUI標準のMiniMax H3ワークフローを自分で操作する</strong>：下の「ComfyUI標準テンプレートを自分で使う場合」へ進みます。</li>
                                  <li><strong>Nano Bananaによる画像変換から動画生成、タイトル・固定クレジット合成まで行う</strong>：下の「最新版・最強版ワークフローを使う場合」へ進みます。</li>
                                </ul>
                              </div>
                            </section>

                            <section aria-labelledby="minimax-h3-prompt-heading">
                              <div className="rounded-lg border border-slate-600/60 bg-slate-950/35 p-3">
                                <h4 id="minimax-h3-prompt-heading" className="text-[12px] font-black text-white">ComfyUI標準テンプレートを自分で使う場合</h4>
                                <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                                  ComfyUI標準の <code>MiniMax H3 Reference-to-Video（R2V / Ref2VA）</code> を自分で設定して使う人向けです。生成した4コマ漫画からH3用の英語プロンプトを作る指示文だけをコピーします。この操作ではワークフローJSONをダウンロードしません。
                                </p>
                                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">
                                  デフォルト仕様：15秒・16:9・会話音声優先・字幕なし・BGMなし。
                                </p>
                                <button
                                  className={`mt-2 ${isMiniMaxPromptCopied ? 'bg-green-600 border-green-500/30' : 'bg-slate-700 hover:bg-slate-600 border-white/10'} text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95`}
                                  style={H3_ACTION_BUTTON_STYLE}
                                  onClick={async () => {
                                    await copyTextToClipboard(MINIMAX_H3_COMFYUI_PROMPT);
                                    setIsMiniMaxPromptCopied(true);
                                    setTimeout(() => setIsMiniMaxPromptCopied(false), 2000);
                                  }}
                                >
                                  <span style={{ visibility: isMiniMaxPromptCopied ? 'hidden' : 'visible' }}>📋 MiniMax H3・ComfyUI用プロンプトをコピー</span>
                                  {isMiniMaxPromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>✅ コピー完了</span>}
                                </button>
                                <ol className="mt-2 space-y-1 text-[10px] leading-relaxed text-slate-300 list-decimal list-inside">
                                  <li>この指示文をコピーし、生成済みの4コマ漫画と一緒にChatGPTまたはGeminiへ送信</li>
                                  <li>出力されたMiniMax H3用の英語プロンプトをコピー</li>
                                  <li>ComfyUIワークフローの <code>Prompt</code> 欄へ貼り付け</li>
                                </ol>
                                <div className="mt-3 rounded border border-slate-600/50 bg-black/20 p-2.5 text-[10px] leading-relaxed text-slate-300">
                                  <p className="font-bold text-white">標準テンプレートの開始設定</p>
                                  <ol className="mt-1.5 space-y-1 list-decimal list-inside">
                                    <li><strong>選ぶワークフロー</strong> → <code>MiniMax H3 Reference-to-Video（R2V / Ref2VA）</code> ワークフローを選択。</li>
                                    <li><strong>MiniMax H3 Reference to Video</strong> → 同じ4コマ漫画を最初の参照入力 <code>ref_image_0</code> にだけ接続。<code>ref_image_1</code> 以降には接続しない。</li>
                                    <li><strong>Resolution Selector (Size)</strong> → アスペクト比 <code>16:9 (Widescreen)</code>、メガピクセル <code>0.4</code> から開始。</li>
                                    <li><strong>基本スケジューラー</strong> → <code>normal</code> から開始。</li>
                                  </ol>
                                </div>
                                <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
                                  コピペ用指示文は、各コマの人物集合を <code>panel_cast[N]</code> として入力画像から毎回読み取り、人物ごとの識別署名も動的に作ります。特定の人数、髪色、眼鏡、服装、最終コマへの全員集合は固定しません。標準テンプレートには後段タイトル合成ノードがないため、タイトルはShot 1だけに表示します。
                                </p>
                              </div>
                            </section>

                            <section aria-labelledby="comfyui-workflow-heading">
                              <div className="rounded-lg border border-slate-600/60 bg-slate-950/35 p-3">
                                <h4 id="comfyui-workflow-heading" className="text-[12px] font-black text-white">最新版・最強版ワークフローを使う場合</h4>
                                <p className="mt-1 text-[10px] leading-relaxed text-slate-300">
                                  This route runs the FURU four-panel manga to video contract end-to-end: Nano Banana image conversion, H3 prompt creation, MiniMax H3 video generation, and deterministic title and end-credit compositing. / この経路はFURUの4コマ漫画を動画化する仕様を、Nano Banana画像変換、H3プロンプト作成、MiniMax H3動画生成、固定タイトルとエンドクレジットの合成まで一連のノードで実行します。下のボタンで最新版・最強版のComfyUIワークフローJSONを取得します。プロンプトのコピーボタンとは別の機能です。
                                </p>
                                <p className="mt-1 text-[10px] leading-relaxed text-slate-400">既存の設定ファイルとは別のJSONです。本体の「設定ファイルを保存（JSON）」は使用しません。</p>
                                <div className="mt-3 rounded border border-amber-400/40 bg-amber-950/25 p-3 text-[10px] leading-relaxed text-slate-200">
                                  <p className="font-bold text-amber-200">
                                    このワークフローには共通カスタムノード <code>ComfyUI-NanoBanana-H3</code> が必要です。カスタムノードは標準版・Turbo LoRA版で共通で、LoRA専用の別実装ではありません。先に導入してComfyUIを再起動してからJSONを読み込んでください。JSONだけでは実行できません。
                                  </p>
                                  <a
                                    href={COMFYUI_CUSTOM_NODE_DOWNLOAD_URL}
                                    download={COMFYUI_CUSTOM_NODE_FILENAME}
                                    role="button"
                                    className="mt-2 bg-slate-700 hover:bg-slate-600 border-white/10 text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95 no-underline"
                                    style={H3_ACTION_BUTTON_STYLE}
                                    aria-label="Nano Bananaカスタムノードをダウンロード"
                                  >
                                    <Download size={13} /> Nano Bananaカスタムノードをダウンロード
                                  </a>
                                  <ol className="mt-3 space-y-1.5 list-decimal pl-4">
                                    <li>「Nano Bananaカスタムノードをダウンロード」を押して <code>ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip</code> を保存します。</li>
                                    <li>ZIPを展開し、生成された <code>ComfyUI-NanoBanana-H3</code> フォルダを <code>ComfyUI/custom_nodes/</code> へ配置します。最終配置が <code>ComfyUI/custom_nodes/ComfyUI-NanoBanana-H3/__init__.py</code> になることを確認します。</li>
                                    <li>同名の旧版がある場合はComfyUIを完全終了し、旧版をバックアップしてからフォルダ単位で差し替えます。新旧カスタムノードのファイルは混在させません。</li>
                                    <li><code>SpectrumApplyMiniMaxH3</code> を使うため、ComfyUI Managerから <code>ComfyUI-Spectrum-MiniMax-H3</code> を導入します。</li>
                                    <li>下のボタンから <code>Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json</code> を保存し、<code>ComfyUI/user/default/workflows/</code> 以下へ配置します。</li>
                                    <li>カスタムノードとJSONの配置後、ComfyUIを完全に再起動してからワークフローを開きます。</li>
                                    <li><code>4. API設定＋画像変換＋H3プロンプト生成（同一Provider）</code> ノードで <code>OpenAI API</code> または <code>Google Gemini API</code> を選び、「<strong>🔐 APIキー未登録／登録</strong>」から移行先PCで利用者自身のキーを再登録します。1回の実行では、選択中の同一Providerが画像変換とH3プロンプト作成の両方に使われます。APIキーはワークフローJSONや配布ZIPには保存されず、登録情報はローカルの <code>ComfyUI/user/nanobanana_h3_credentials.json</code> に暗号化されません。</li>
                                    <li>Google Gemini APIでは画像変換に <code>gemini-3.1-flash-image</code>、H3プロンプト作成・画像QAに <code>gemini-2.5-flash</code> を使います。OpenAI APIでは画像変換に <code>gpt-image-2</code>、H3プロンプト作成・画像QAに <code>gpt-4.1-mini</code> を使います。</li>
                                    <li>ワークフローを開くと、MiniMax H3本体、テキストエンコーダ、映像VAE <code>minimax_h3_video_vae_int8_convrot.safetensors</code>、音声VAE、Turbo v4 LoRAの不足項目に <code>Download</code> が表示されます。表示された項目をすべて取得し、モデル候補が更新されない場合はComfyUIを再起動します。各ローダーには配布URL、SHA256、保存先、ファイル名を登録済みです。ComfyUI Desktopは管理対象フォルダへ保存します。ブラウザ版でDownloadが通常のブラウザ保存になった場合だけ、表示された保存先へ手動で移動します。</li>
                                  </ol>
                                  <div className="mt-3 border-t border-amber-300/20 pt-2">
                                    <p className="font-bold text-white">次の4ノードが読めない場合</p>
                                    <ul className="mt-1 list-disc space-y-0.5 pl-4 font-mono text-[9px] text-slate-300">
                                      <li>NanoBananaH3Transform</li>
                                      <li>DeterministicTitleWatermarkOverlay</li>
                                      <li>DeterministicEndCreditOverlay</li>
                                      <li>SpectrumApplyMiniMaxH3</li>
                                    </ul>
                                    <p className="mt-1 text-slate-300"><code>SpectrumApplyMiniMaxH3</code> だけが読めない場合は、ComfyUI Managerで <code>ComfyUI-Spectrum-MiniMax-H3</code> の導入状態を確認します。それ以外は、多くの場合カスタムノードの配置、またはComfyUIの完全な再起動が未完了です。解決しない場合は二重展開、ComfyUIの読込エラー、バージョン互換性も確認してください。</p>
                                  </div>
                                </div>
                                <div className="mt-3 space-y-1 text-[10px] leading-relaxed text-slate-300">
                                  <p><strong>既定のTurbo LoRA設定</strong>：15秒・16:9・0.4MP・Turbo v4 LoRA（強度 <code>1.0</code>）・Euler sampler・Beta scheduler・8 steps。</p>
                                  <p>ファイル名の「v4」はLoRAのバージョンです。実際のサンプリング設定は4 stepsではなく8 stepsです。</p>
                                  <p>H3本体にはタイトル、字幕、URL、終了クレジットを生成させません。タイトルは <code>overlay_title</code> として抽出し、動画生成後に左上へ一度だけ、黒字＋白縁、背景バーなしで合成します。固定クレジットも後段ノードで合成します。</p>
                                  <p>人物集合と識別署名は各入力漫画の各コマから動的に導出し、特定の人数や外見、最終フレームの構成を固定しません。</p>
                                  <p>APIキー・認証情報・モデル・LoRA・漫画画像・生成動画は配布物に含まれません。</p>
                                  <p>MiniMax H3モデルとTurbo LoRAは、利用者自身が配布元のライセンスに同意して取得してください。</p>
                                </div>
                                <a
                                  href={COMFYUI_WORKFLOW_DOWNLOAD_URL}
                                  download={COMFYUI_WORKFLOW_FILENAME}
                                  role="button"
                                  className="mt-2 bg-slate-700 hover:bg-slate-600 border-white/10 text-white px-3 py-1.5 rounded transition-all inline-flex items-center justify-center gap-1.5 border font-bold active:scale-95 no-underline"
                                  style={H3_ACTION_BUTTON_STYLE}
                                  aria-label="最新版・最強版ワークフローをダウンロード"
                                >
                                  <Download size={13} /> 最新版・最強版ワークフローをダウンロード
                                </a>
                                <div className="mt-2 space-y-1 text-[10px] leading-relaxed text-slate-300">
                                  <p>ZIPには <code>ComfyUI-NanoBanana-H3/__init__.py</code>、<code>ComfyUI-NanoBanana-H3/h3_prompt_system.txt</code>、<code>ComfyUI-NanoBanana-H3/web/nanobanana_h3.js</code> のみを収録しています。</p>
                                  <p>モデル重み、LoRA重み、APIキー、認証情報、漫画画像、生成済み動画は収録していません。</p>
                                </div>
                              </div>
                            </section>
                          </div>
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
                      placeholder={isOpenAIImageMode
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
                  <span className={isOpenAIImageMode ? "text-emerald-500" : "text-blue-500"}>{isOpenAIImageMode ? 'v1.3.5 (ChatGPT Images 2.0)' : 'v1.3.5 (Gemini Native Image)'}</span>
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
                          <li><a href={isOpenAIImageMode ? "https://chatgpt.com/" : "https://gemini.google.com/app"} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{isOpenAIImageMode ? 'ChatGPTウェブ版' : 'Geminiウェブ版'}</a> を開きます。</li>
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
                    const apiName = isOpenAIImageMode ? 'ChatGPT' : 'Gemini';
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
