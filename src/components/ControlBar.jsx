import React from 'react';
import { Check, ArrowRight, RefreshCw, Zap, Square, Loader2, Copy } from 'lucide-react';

export default function ControlBar({
  controlBarRef,
  currentStep,
  apiKey,
  isEndlessMode,
  setIsEndlessMode,
  isEndlessModeRef,
  isAborting,
  handleFullAutoToggle,
  isFullAutoMode,
  selectedEngine,
  enableOpenAIApi,
  isPolicyCopied,
  setIsPolicyCopied
}) {
  return (
    <div ref={controlBarRef} className="fixed top-0 left-0 right-0 z-[100] bg-[#0f1115] border-b border-white/10 px-2 md:px-8 py-2 md:py-3 shadow-xl w-full flex flex-col gap-2 md:gap-3 overflow-x-hidden">
      <div className="flex flex-wrap xl:flex-nowrap items-center justify-center max-w-7xl mx-auto w-full gap-y-3">
        
        {/* Progress Steps (Center Left) */}
        <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-4 shrink-0 transition-opacity duration-300 ${!apiKey ? 'opacity-30' : 'opacity-100'}`}>
          {/* Step 1: 解析 */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 1 ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]' : currentStep > 1 ? 'bg-blue-600/50 text-blue-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 1 ? <Check size={16} /> : '1'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">解析</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 2: シナリオ */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 2 ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]' : currentStep > 2 ? 'bg-purple-600/50 text-purple-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 2 ? <Check size={16} /> : '2'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">シナリオ</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 3: プロンプト */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 3 ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.6)]' : currentStep > 3 ? 'bg-orange-600/50 text-orange-200' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 3 ? <Check size={16} /> : '3'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">プロンプト</span>
          </div>
          
          <ArrowRight size={14} className="text-white/30 shrink-0 mx-0.5 sm:mx-1" />
          
          {/* Step 4: 画像生成 */}
          <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === 4 ? 'bg-green-500 text-white shadow-[0_0_10px_rgba(34,197,94,0.6)]' : currentStep > 4 ? 'bg-green-600/50 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-white/10 text-white/50'}`}>
              {currentStep > 4 ? <Check size={16} /> : '4'}
            </div>
            <span className="text-sm font-bold text-white tracking-wider">画像生成　</span>
          </div>
        </div>

        {/* 物理スペーサー */}
        <div className="hidden xl:block w-12 lg:w-16 shrink-0"></div>

        {/* Controls - フルオートボタン＋説明文 */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 lg:gap-6 shrink-0 max-w-full">
          {/* 連続生成(ループ)トグル */}
          <button
            disabled={!apiKey || isAborting}
            onClick={() => {
              const nextState = !isEndlessMode;
              setIsEndlessMode(nextState);
              if (isEndlessModeRef) {
                isEndlessModeRef.current = nextState;
              }
            }}
            title="ONにすると、フルオート完了時に同じキャラクターで永遠にシナリオ生成と画像生成を繰り返します。完全停止するにはフルオート中断を押してください。"
            style={{ color: isEndlessMode ? '#dc2626' : '#ffffff' }}
            className={`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${
              isEndlessMode
                ? 'bg-red-50 border-red-300 shadow-lg'
                : 'bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <RefreshCw size={14} className={isEndlessMode ? 'animate-spin' : ''} style={{ animationDuration: '3s' }} />
            <span className="whitespace-nowrap">{isEndlessMode ? '🔁 連続ループ生成を解除' : '🔁 連続ループ生成 ON'}</span>
          </button>

          {/* フルオートボタン */}
          <button
            disabled={!apiKey || isAborting}
            onClick={handleFullAutoToggle}
            title="画像をドロップするだけで4コマを全自動生成。完了後は自動OFF。生成中に押すと即中断。"
            style={{ color: isFullAutoMode ? (isAborting ? '#ffffff' : '#dc2626') : '#ffffff' }}
            className={`min-w-[160px] flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none shrink-0 active:border-b-2 active:translate-y-0.5 ${
              isFullAutoMode
                ? (isAborting ? 'bg-slate-700 border-slate-500 shadow-none cursor-wait opacity-100' : 'bg-red-50 border-red-300 shadow-lg')
                : 'bg-[#2d3a4d] border-[#4a5568] hover:bg-[#3d4f66]'
            } ${!apiKey && !isAborting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isFullAutoMode ? (isAborting ? <Loader2 size={14} className="animate-spin" /> : <Square size={14} fill="currentColor" />) : <Zap size={14} />}
            {isFullAutoMode ? (isAborting ? '停止処理中...' : '全自動モード 中断') : '⚡ 全自動モード（フルオート） ON'}
          </button>
          
          <div className="hidden sm:block w-6 shrink-0"></div>

          {/* 説明文 */}
          <div className={`flex flex-col justify-center text-[10px] leading-relaxed max-w-[650px] text-center sm:text-left transition-opacity duration-300 ${!apiKey ? 'text-slate-600 opacity-40' : 'text-slate-400'}`}>
            <span className="whitespace-normal text-slate-300 font-bold">💡 全自動モード（フルオート）の使い方：</span>
            <span className="whitespace-normal">・「⚡ 全自動モード ON」にして画像をドロップ（またはドロップ後にON）すると、4コマ漫画を全自動で最後まで生成します。</span>
            <span className="whitespace-normal">・途中で中断したい場合は同じボタンで停止できます。以降は手動（各STEPボタン）で進行可能です。</span>
            <span className="whitespace-normal">・「連続ループ生成」をONにすると、自動生成完了後に自動で次の作品（別のシナリオ）を永遠に作り続けます。</span>
          </div>
        </div>
      </div>
      
      {/* Web版ChatGPT用 コピーボタン (β) */}
      {(selectedEngine === 'openai' || enableOpenAIApi) && (
        <div className="flex justify-center w-full max-w-7xl mx-auto px-2 pb-1">
          <button
            onClick={() => {
              const protocol = `[ 🎨 ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0 ]
You are a world-class anime film director and cinematographer. Your mission is to create a SINGLE breathtaking illustration that makes the viewer FEEL something powerful — not just see a character standing there.

READ the user's instruction carefully. Detect the EMOTIONAL VECTOR (joy, sadness, anger, tension, love, loneliness, triumph, fear, nostalgia, serenity, chaos, comedy, etc.) from their text — even if they only say something simple like "draw her eating ramen." Find the hidden emotion and AMPLIFY it through every visual element below.

If the user gives NO emotional direction at all, DEFAULT to creating an image that radiates warmth, narrative depth, and cinematic beauty — as if this frame is the most emotionally pivotal moment in an anime film.

[ 1. EMOTIONAL ACTING & EXPRESSION — The Soul of the Image ]
- FACE: Characters MUST show rich, layered facial expressions. Use the Facial Action Coding System (FACS): combine specific Action Units (brow furrow + lip tremble + glistening eyes = suppressed tears). NEVER draw a flat, neutral, default expression. Every face tells a story.
- EYES: Eyes are the emotional anchor. Draw large, detailed anime eyes with multiple layers: iris gradient, bright catchlight highlights (circular + star sparkle), visible emotion (tears welling, fire burning, light fading, stars sparkling). Eye moisture level should match the emotion.
- BODY LANGUAGE: The entire body must act. Clenched fists for determination, slumped shoulders for defeat, wind-caught hair for freedom, mid-gesture frozen motion for surprise. Weight distribution must feel natural and dynamic — use contrapposto, dynamic lean, or full-body action poses. NEVER use a stiff T-pose or mannequin stance.
- MICRO-EXPRESSIONS: Add subtle secondary expressions — a slight lip quiver, one eyebrow raised higher than the other, fingers gripping fabric unconsciously. These details create emotional depth that separates masterwork from generic output.

[ 2. CINEMATIC CAMERA & LENS — The Director's Eye ]
Choose the camera angle and lens that BEST serves the emotion. Here is your toolkit:
- INTIMACY/VULNERABILITY: Tight close-up (bust shot or face), shallow depth of field (f/1.4 bokeh), slight Dutch angle for unease, or straight-on for confrontation.
- POWER/TRIUMPH: Extreme low angle (worm's-eye view) looking UP at the character. Wide-angle lens (24mm) for imposing presence. Character dominates the frame.
- LONELINESS/SMALLNESS: Extreme wide shot with the character tiny in a vast environment. High angle (bird's-eye) looking DOWN. The emptiness around them IS the emotion.
- ACTION/CHAOS: Dynamic diagonal composition, motion blur on extremities, speed lines radiating from impact point, camera tilted 15-30° Dutch angle.
- NOSTALGIA/MEMORY: Soft telephoto lens (85-135mm) compression, warm color grading, slight vignette at edges, dreamy shallow focus.
- COMEDY/ABSURDITY: Exaggerated wide-angle (fisheye-adjacent) for comedic distortion, super-deformed reaction shots, dramatic zoom lines.
- EPIC/CINEMATIC: Sweeping wide establishing shot with golden ratio composition, atmospheric perspective, volumetric light shafts.
IMPORTANT: NEVER default to a flat, eye-level, center-framed shot. Every camera choice must be INTENTIONAL and emotion-driven.

[ 3. DRAMATIC LIGHTING & COLOR PSYCHOLOGY ]
Lighting is emotion made visible. Match the lighting setup to the feeling:
- JOY/WARMTH: Golden hour warm key light (3000K), soft fill, orange-pink rim light. Warm color palette dominance.
- SADNESS/MELANCHOLY: Cool blue-grey key light, minimal fill (high shadow ratio), single warm accent light (a streetlamp, a phone screen) as a beacon of hope. Desaturated palette with one warm accent color.
- ANGER/INTENSITY: Hard directional red-orange key light from below or side, deep black shadows, high contrast. Saturated reds and magentas.
- TENSION/SUSPENSE: Single harsh spotlight creating extreme contrast, character half-lit half-shadow (split lighting). Cool teal shadows vs warm highlights.
- LOVE/TENDERNESS: Soft diffused backlight creating a luminous halo, warm fill, cherry-blossom pink and peach tones. Ethereal glow.
- TRIUMPH/GLORY: Dramatic backlight explosion (contre-jour), golden rim light outlining the entire silhouette, lens flare from behind.
- FEAR/HORROR: Underlighting (flashlight-under-chin effect), sickly green or purple color cast, deep vignette swallowing the edges.
- NOSTALGIA: Warm sepia-shifted color grading, soft gaussian glow, muted but harmonious palette.
TECHNIQUE: Always use 3-point anime lighting as a BASE (key + fill + rim), then MODIFY it for emotional effect. Use warm/cool color temperature CONTRAST — never flat uniform lighting.

[ 4. ATMOSPHERIC VFX & ENVIRONMENTAL STORYTELLING ]
The environment and effects must ECHO the character's emotion, not just be a backdrop:
- Wind direction, particle effects (petals, leaves, snow, embers, rain), volumetric fog/mist, god rays, and atmospheric haze should all serve the emotional narrative.
- ENVIRONMENTAL EMPATHY: If the character is sad, the sky could be overcast with a single break in the clouds. If joyful, golden light floods the scene. If angry, the environment reacts (cracking ground, swirling debris).
- DEPTH LAYERS: Create clear foreground (blurred elements close to camera), midground (character in sharp focus), and background (atmospheric depth) for cinematic parallax.
- ANTI-GLITTER & ANTI-NOISE PROTOCOL:
  * ABSOLUTELY NO ChatGPT-style magical floating particles, NO glittering/sparkling effects, NO dust motes, NO lens flares, NO moiré patterns. Keep the air completely clean and empty.
  * ZERO NOISE TOLERANCE: The final image MUST be completely free of visual noise, grain, micro-texture artifacts, dithering patterns, and any speckle-like artifacts. Every surface must be CLEAN and SMOOTH.
  * NO MICRO-DETAIL CLUTTER: Do NOT fill empty areas with random tiny dots, scratches, dust particles, or halftone-like noise patterns. Clean color fills and smooth gradients ONLY.
  * NO OVER-RENDERING: Do NOT apply photorealistic texture rendering (cloth weave, skin pores, hair strand noise) to anime-style characters. Keep surfaces FLAT and CLEAN as in professional TV anime cel-shading.

[ 5. ART STYLE & VISUAL FIDELITY ]
- RENDER: High-budget Japanese TV anime feature film quality. Clean cel-shading with rich color depth, sharp ink contour lines, smooth gradients. NO photorealistic texturing, NO film grain, NO noise.
- POSITIVE SAFE RENDERING STYLE: Clean anime illustration finish, smooth cel shading, soft clean shading, smooth gradients, clean color surfaces, low texture density, refined but not overly detailed material response, controlled exposure, soft diffused lighting, no visible grain, no speckled texture, no pointillism, no stippling, no dithering, no halftone dots, no noisy particles, no glitter dust, no gritty film grain, no rough paper texture, no canvas grain, no over-sharpened details.
- BANNED PROMPT WORD COMBINATIONS — NEVER USE THESE:
  * Do NOT combine: ultra-detailed + film grain + cinematic
  * Do NOT combine: realistic texture + micro details
  * Do NOT combine: magical particles + glowing dust
  * Do NOT combine: high contrast + sharp details (use clean contrast + smooth edges instead)
  * Do NOT combine: illustrative realism + gritty texture
  * Do NOT use: paper grain, canvas texture, rough texture, grainy texture, overly crisp
- LINE WEIGHT HIERARCHY: Foreground characters get 3px bold ink outlines. Background objects get 1px thin lines. This creates instant visual depth.
- CHARACTER SEPARATION: Add a subtle 2-3px white glow (compositing rim) outside the character's outline to prevent blending with the background. Characters MUST have higher saturation and contrast than their environment.
- HAIR: Must show a glossy anime-style shine band (angel ring / tenshi no wa). Individual strand detail at edges.
- SKIN: Warm subsurface scattering hint on lit areas. Clean shadows with slight color shift (warm light = cool shadow, cool light = warm shadow).
- THINGS TO AVOID:
  * No floating close-up eyes or ghostly face overlays in backgrounds.
  * No character sheet layout, expression grid, or reference sheet appearance.
  * No extra characters beyond those specified.
  * No sparkling light particles, no glowing dust, no magical particles, no floating embers, no volumetric dust.
  * No film grain, paper grain, canvas texture, or rough textures.

[ 6. TEXT & OUTPUT RULES ]
- If speech bubbles or text are drawn, ALL text MUST be vertical Japanese (tategaki). ZERO horizontal text allowed.
- HORIZONTAL-TO-VERTICAL CORRECTION: If you detect ANY horizontal text (yokogaki) inside speech bubbles or dialogue balloons, you MUST redraw it as vertical text (tategaki, top-to-bottom, right-to-left columns). This is a MANDATORY fix — horizontal Japanese text in manga speech bubbles is a critical error.
- Do not add random background text, floating letters, or unnecessary sound effects unless the scene demands it.
- Quoted ambience, SFX names, mood words, aura names, and emotion labels in the instruction are NOT visible lettering. Express them with environment, motion, lighting, and poses unless the prompt explicitly asks for handwriting, signage, labels, printed text, or screen text.
- SELF-REVIEW: After drawing, carefully verify: (1) finger count on all hands (exactly 5), (2) ALL text inside speech bubbles is VERTICAL (tategaki) — if any horizontal text is found, immediately regenerate with vertical text, (3) check for text errors, and fix internally before displaying the final result.`;
              navigator.clipboard.writeText(protocol);
              setIsPolicyCopied(true);
              setTimeout(() => setIsPolicyCopied(false), 2000);
            }}
            title="Web版ChatGPT用の1枚絵エモーショナル演出プロンプトをクリップボードにコピーします。指示内容の感情を自動検知し、カメラ・ライティング・表情・VFXを最適化します。"
            className={`w-full flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 rounded-xl text-sm font-black tracking-widest transition-all duration-100 border-2 border-b-4 select-none active:border-b-2 active:translate-y-0.5 shadow-lg ${
              isPolicyCopied
                ? 'bg-white border-green-500 text-green-600'
                : 'bg-white border-slate-300 hover:bg-slate-50 text-[#2d3a4d]'
            }`}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              {isPolicyCopied ? <Check size={16} /> : <Copy size={16} />}
              <span className="whitespace-nowrap">{isPolicyCopied ? 'コピー完了！' : '🎬 ChatGPT用 1枚絵エモーショナルプロンプトをコピー'}</span>
            </div>
            <span className="text-[10px] md:text-[11px] font-normal tracking-normal whitespace-normal text-center text-slate-500">
              【1枚絵用】プロンプトをコピーしてChatGPTのチャット欄に貼り付け、元のキャラクター画像と一緒に送信すると、シネマチックで感情豊かなイラストが生成されます。
            </span>
          </button>
        </div>
      )}

      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
        <div className={`h-full transition-all duration-700 ease-out
          ${currentStep === 1 ? 'w-1/4 bg-blue-500' :
            currentStep === 2 ? 'w-2/4 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
            currentStep === 3 ? 'w-3/4 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' :
            currentStep >= 4 ? 'w-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'w-0'}
        `} />
      </div>
    </div>
  );
}
