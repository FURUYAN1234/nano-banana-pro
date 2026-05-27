// --- 定数・タグ定義 (constants.js) ---
// App.jsx から抽出された共有定数

export const SYSTEM_VERSION = "v4.3.6";

// --- Punchline ラベル変換関数 ---
export const getPunchlineLabel = (type) => {
  switch (type) {
    case "Surreal": return "静寂型 (シュール)";
    case "Explosion": return "爆発型 (カオス)";
    case "FakeEmotion": return "感動詐欺";
    case "Metafiction": return "メタフィクション";
    case "Unreasonable": return "理不尽な制裁";
    case "RunningGag": return "天丼";
    case "Dream": return "夢オチ (ループ)";
    case "PsychoHorror": return "サイコホラー (狂気)";
    case "Misunderstanding": return "盛大な勘違い (すれ違い)";
    case "CanceledEnding": return "打ち切りエンド (俺たちの戦いはこれからだ)";
    case "Documentary": return "ドキュメンタリー (原文忠実)";
    default: return "自動 (AIにおまかせ)";
  }
};

// --- ニュースカテゴリ初期値 ---
export const DEFAULT_CATEGORIES = [
  { id: 'politics', label: '政治・経済', icon: '💼', checked: false, keywords: '最新 政治 経済 社会ニュース' },
  { id: 'sports', label: 'スポーツ', icon: '🏅', checked: false, keywords: '最新 スポーツ 競技 大会 結果' },
  { id: 'animals', label: '動物・癒し', icon: '🐱', checked: false, keywords: '最新 動物 ペット 癒しニュース' },
  { id: 'food', label: 'グルメ', icon: '🍜', checked: false, keywords: '最新 食べ物 グルメ スイーツ トレンド' },
  { id: 'ent', label: 'エンタメ', icon: '🎬', checked: false, keywords: '最新 映画 ドラマ 音楽 エンタメ' },
  { id: 'science', label: '科学・宇宙', icon: '🚀', checked: false, keywords: '最新 科学 宇宙 考古学 発見' },
  { id: 'bnews', label: 'B級ニュース', icon: '🤪', checked: false, keywords: '面白い 海外のB級ニュース ハプニング' },
  { id: 'life', label: '生活・健康', icon: '🌱', checked: false, keywords: '生活 ライフハック 健康' },
];

// --- [v1.7.0] モデルバッジ情報 ---
// AIモデルIDからバッジ表示用の情報を返す純粋関数
export const getModelBadgeInfo = (modelId) => {
  if (!modelId) return null;

  // Gemini 3.5 / 3.1系 = 最高品質 (Next-Gen)
  if (modelId.includes("3.5") || modelId.includes("3.1")) {
    return {
      label: "NEXT GEN",
      tier: "Supreme",
      color: "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black",
      desc: `Gemini ${modelId.includes("3.5") ? "3.5" : "3.1"}: 最高品質 (Next Generation)`
    };
  }
  // Gemini 3.0 Flash / 2.5 Pro = 高品質
  if (modelId.includes("3-flash") || modelId.includes("2.5-pro")) {
    return {
      label: "HIGH QUALITY",
      tier: "Active",
      color: "bg-blue-600 text-white",
      desc: "Gemini 3.0/2.5 Pro: 高品質"
    };
  }
  // Gemini 2.5 Flash (画像生成含む) = 安定
  if (modelId.includes("2.5-flash") && !modelId.includes("lite")) {
    return {
      label: "STABLE",
      tier: "Active",
      color: "bg-indigo-600 text-white",
      desc: "Gemini 2.5 Flash: 安定・高速"
    };
  }
  // Flash Lite系 = 標準品質
  if (modelId.includes("lite") || modelId.includes("latest")) {
    return {
      label: "STANDARD QUALITY",
      tier: "Lite",
      color: "bg-gray-600 text-white",
      desc: "Flash Lite: 標準品質 (API制限回避中...)"
    };
  }
  // Imagen系 = レガシー
  if (modelId.includes("imagen")) {
    return {
      label: "LEGACY",
      tier: "Lite",
      color: "bg-amber-700 text-white",
      desc: "Imagen: レガシーモデル (2026/06廃止予定)"
    };
  }
  // [v3.59] OpenAI GPT系モデル
  if (modelId.includes("gpt-4") || modelId.includes("gpt-3")) {
    return {
      label: "ChatGPT",
      tier: "Active",
      color: "bg-emerald-600 text-white",
      desc: `OpenAI ${modelId}: テキスト生成`
    };
  }
  // [v3.59] OpenAI 画像生成モデル
  if (modelId.includes("gpt-image") || modelId.includes("dall-e")) {
    return {
      label: "ChatGPT IMG",
      tier: "Active",
      color: "bg-emerald-500 text-white",
      desc: `OpenAI ${modelId}: 画像生成`
    };
  }
  // Fallback
  return {
    label: "UNKNOWN MODEL",
    tier: "Unknown",
    color: "bg-slate-600 text-white",
    desc: modelId
  };
};

// [v2.25] 感情連動スタイル定義 - 固有名詞ゼロ (Trademark Sanitization準拠)
export const EMOTION_STYLES = {
  NORMAL: {
    style: '',
    proportions: '',
    vfx: '',
  },
  CHIBI_GAG: {
    style: 'In THIS PANEL ONLY, draw ALL characters in a super-deformed chibi style with 2-3 head-to-body proportions. Use simplified round faces, dot-like eyes, and exaggerated tiny limbs. The art style shifts to a cute comedic register. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible even in chibi form. Draw oversized cute round glasses on their chibi face. Do NOT simplify away glasses — they are a core identity trait, not an optional accessory.',
    proportions: 'OVERRIDE: Use 2-3 head proportions for this panel ONLY. The 6-7 head lock is SUSPENDED.',
    vfx: '(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)',
  },
  GEKIGA: {
    style: 'In THIS PANEL ONLY, shift to a mature realistic illustration style with heavy ink shadows, sharp angular facial features, detailed muscle/bone structure visible through skin tension, and dramatic chiaroscuro lighting. Characters look older and more intense. IMPORTANT: Keep the image in FULL COLOR (not black and white). Use deep vivid colors with high contrast shadows, not monochrome.',
    proportions: 'Use 7-8 head proportions. Characters appear taller and more imposing.',
    vfx: '(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)',
  },
  SHOUJO: {
    style: 'In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.',
    proportions: '',
    vfx: '(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)',
  },
  HORROR: {
    style: 'In THIS PANEL ONLY, shift to a dark horror manga style with extreme shadow coverage (70%+ of panel), unsettling off-center composition, and characters lit from below or behind creating sinister silhouettes.',
    proportions: '',
    vfx: '(Dark heavy ink shadows covering most of panel:1.5), (dramatic underlighting:1.4), (distorted wide-angle perspective), (character eyes glowing in darkness)',
  },
  BLANK: {
    style: 'In THIS PANEL ONLY, the affected character\'s eyes become completely white/blank dots with no pupils. Their face loses color (becomes pale/grey). A dark shadow or aura surrounds them. Their body is frozen stiff in a rigid pose. CRITICAL GLASSES RULE: If a character wears glasses according to the Identity Matrix, their glasses MUST remain clearly visible on their face even with blank white eyes. Draw the glasses frames prominently and show the blank white eyes THROUGH the glasses lenses. Do NOT remove glasses for the blank eye effect.',
    proportions: '',
    vfx: '(Blank white circular eyes with no pupils:1.5), (desaturated pale skin:1.3), (dark depression aura emanating:1.3), (frozen stiff mannequin-like pose), (glasses preserved if character wears them:1.5)',
  },
  IMPACT: {
    style: 'In THIS PANEL ONLY, use an explosive impact-frame composition. The main character\'s expression fills 60-80% of the panel. Dramatic radial speed lines burst from the center. The panel glows with intense energy aura radiating outward.',
    proportions: 'OVERRIDE: Use 2-4 head proportions. Extreme close-up with foreshortening allowed.',
    vfx: '(Explosive radial speed lines from center:1.5), (screen-filling extreme close-up face:1.4), (intense glowing energy aura:1.2), (intense dramatic backlight)',
    // [v2.31] マルチキャラパネル用フォールバック
    // [v2.57] ひび割れ演出を削除し、エネルギー放射型演出に差し替え
    styleMulti: 'In THIS PANEL ONLY, use a dramatic impact-frame composition with intense energy. Dramatic radial speed lines burst from the center of the panel. The panel glows with intense energy aura radiating outward. IMPORTANT: Show ALL characters listed in the panel at full body or waist-up — do NOT zoom into a single face. Do NOT create a close-up of one character\'s face that fills most of the panel. Do NOT draw cracks, fractures, or shattering effects on the panel borders.',
    proportionsMulti: '',
    vfxMulti: '(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)',
  },
  WATERCOLOR: {
    style: 'In THIS PANEL ONLY, shift to a soft watercolor painting style with blurred edges, transparent color washes, and visible paper texture. The mood is nostalgic and dreamlike.',
    proportions: '',
    vfx: '(Soft watercolor washes:1.4), (blurred dreamy edges:1.3), (muted warm sepia tones), (visible paper grain texture)',
  },
  RETRO: {
    style: 'In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character\'s original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.',
    proportions: '',
    vfx: '(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)',
  },
  GLITTER: {
    style: 'In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character\'s hair length or hairstyle from their reference description.',
    proportions: '',
    vfx: '(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)',
  },
  SHADOW: {
    style: 'In THIS PANEL ONLY, the scheming character is rendered mostly in dark silhouette with only their eyes glowing visibly. A menacing dark aura surrounds them. The mood is sinister and calculating.',
    proportions: '',
    vfx: '(Character in dark silhouette:1.4), (glowing eyes in darkness:1.5), (dark menacing aura:1.3), (evil subtle smile barely visible)',
  },
};

// [v2.68] 演出レパートリー拡充: 6つの新EMOTION_STYLES
// 元に戻す場合: このブロック（SPEED〜NEON）を削除し、extractEmotionStyleの正規表現からも除去すること
EMOTION_STYLES.SPEED = {
  style: 'In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. All characters are drawn with heavy motion blur trails behind them. Background becomes pure horizontal speed lines radiating from the direction of movement. The panel feels like a single frame captured from an intense chase or sudden dash.',
  proportions: '',
  vfx: '(Extreme horizontal speed lines filling background:1.5), (heavy motion blur on character bodies:1.4), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2)',
};
EMOTION_STYLES.FLASHBACK = {
  style: 'In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.',
  proportions: '',
  vfx: '(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)',
};
EMOTION_STYLES.UKIYOE = {
  style: 'In THIS PANEL ONLY, shift to a Japanese ukiyo-e woodblock print style. Use flat areas of bold color with strong black outlines. Characters are drawn with stylized proportions reminiscent of Edo-period art. Backgrounds feature iconic elements like waves, mountains, or cherry blossoms in the flat ukiyo-e tradition. IMPORTANT: Maintain each character\'s identity (hair color, accessories) despite the art style shift.',
  proportions: 'Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.',
  vfx: '(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)',
};
EMOTION_STYLES.POP_ART = {
  style: 'In THIS PANEL ONLY, shift to a vibrant pop art comic style inspired by Roy Lichtenstein. Use bold primary colors (red, blue, yellow), thick black outlines, and Ben-Day dot patterns for shading. The composition should feel graphic and punchy with high contrast. Speech bubbles should have bold jagged edges.',
  proportions: '',
  vfx: '(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)',
};
EMOTION_STYLES.SKETCH = {
  style: 'In THIS PANEL ONLY, the art style shifts to a rough pencil sketch or storyboard draft. Lines are loose, scratchy, and intentionally unfinished. Some areas may have construction lines or rough hatching visible. The effect suggests this panel is a "raw thought" or "unpolished reality" breaking through the clean manga surface. IMPORTANT: Characters must still be recognizable by their key features.',
  proportions: '',
  vfx: '(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)',
};
EMOTION_STYLES.NEON = {
  style: 'In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.',
  proportions: '',
  vfx: '(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)',
};
// [v2.95] 画風パレット拡張: 6つの新EMOTION_STYLES（厚塗り・パステル・セル画・ダーク・繊細線・高彩度）
EMOTION_STYLES.THICK_PAINT = {
  style: 'In THIS PANEL ONLY, shift to a thick impasto digital painting style. Use heavy brush strokes with visible texture, rich color layering, and strong three-dimensional form through dramatic light and shadow modeling. The overall impression should feel weighty, substantial, and premium like a gallery painting.',
  proportions: '',
  vfx: '(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)',
};
EMOTION_STYLES.PASTEL = {
  style: 'In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.',
  proportions: '',
  vfx: '(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)',
};
EMOTION_STYLES.CEL = {
  style: 'In THIS PANEL ONLY, shift to a classic cel animation style reminiscent of 1990s TV anime. Use flat solid color fills with clearly defined shadow areas (no gradients within shadow regions). Outlines are clean and consistent in weight. The color palette is bold but slightly muted compared to modern digital anime.',
  proportions: '',
  vfx: '(Flat cel-shaded color fills:1.5), (clearly defined hard-edge shadow areas:1.4), (consistent clean outlines:1.3), (slightly muted retro TV anime color palette:1.3), (simple solid color backgrounds:1.2)',
};
EMOTION_STYLES.DARK_ANIME = {
  style: 'In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.',
  proportions: '',
  vfx: '(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)',
};
EMOTION_STYLES.THIN_LINE = {
  style: 'In THIS PANEL ONLY, shift to an ultra-fine detailed line art style. Every strand of hair, fabric fold, and facial feature is rendered with extremely thin precise lines. The level of detail is exceptionally high, creating a delicate and elegant visual impression. Colors are clean and precise.',
  proportions: '',
  vfx: '(Ultra-fine hairline pen strokes:1.5), (extremely detailed hair strand rendering:1.4), (precise delicate facial feature linework:1.4), (intricate fabric fold details:1.3), (clean precise coloring within fine outlines:1.3)',
};
EMOTION_STYLES.HIGH_SATURATION = {
  style: 'In THIS PANEL ONLY, push all colors to maximum vivid saturation. The entire panel explodes with intense chromatic energy. Every color is cranked to its most vibrant extreme. The effect is eye-catching, energetic, and overwhelming in the best way.',
  proportions: '',
  vfx: '(Maximum color saturation boost:1.5), (vivid electric blue sky or background:1.4), (intense warm highlights on skin:1.3), (neon-bright accent colors on clothing:1.4), (color contrast pushed to extreme:1.3)',
};

// [v2.53.3] HYPER-DYNAMIC Camera Angle Generator — 数値ウェイト付きタグ強化版
export const cameraAngles = [
  "EXTREME FISH-EYE LOW ANGLE: (fish-eye barrel distortion:1.8), (extreme low angle:1.7), (bulging foreground objects:1.6), (curved horizon:1.5). Camera at knee height, spherical distortion warps floor outward, character legs appear massive",
  "DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically",
  "EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal",
  "ULTRA LOW ANGLE FISH-EYE: (extreme low angle:1.8), (fish-eye distortion:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking straight up, ceiling curves into dome",
  "DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters",
  "BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees",
  "EXTREME WIDE ANGLE OVER-THE-SHOULDER: (fish-eye distortion:1.7), (over-the-shoulder composition:1.6), (barrel distortion:1.5). Fish-eye from behind one character's massive shoulder",
  "CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat",
  "DYNAMIC ACTION FISH-EYE WIDE SHOT: (fish-eye barrel distortion:1.8), (spherical scene distortion:1.7), (exaggerated depth separation:1.6). Full scene through spherical distortion, edges curve dramatically",
  "WORM'S EYE EXTREME DUTCH (15° tilt): (extreme low angle:1.8), (worm's eye view:1.7), (dutch angle 15 degrees:1.6), (towering full-body from below:1.5). Camera at ground level tilted, ant's-eye perspective. NEVER crop to shoes only"
];

// [v2.60] AIのカメラ名から具体的なレンズ歪みウェイトタグへのマッピング辞書
export const cameraLensMap = {
  '俯瞰': '(ultra extreme high angle:2.7), (steep bird\'s eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)',
  'バードアイ': '(ultra extreme high angle:2.7), (steep bird\'s eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)',
  'ローアングル': '(ultra extreme low angle:2.7), (deep worm\'s eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)',
  'アオリ': '(ultra extreme low angle:2.7), (deep worm\'s eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)',
  'ダッチ': '(severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6)',
  'フィッシュアイ': '(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)',
  '超広角': '(extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5)',
  '望遠': '(extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6)',
  'ワームズアイ': '(ultra extreme low angle:2.7), (deep worm\'s eye view:2.6), (staring up from the floor:2.7), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0)',
  'ドローン': '(ultra extreme high angle:2.7), (aerial drone shot:2.5), (bird\'s eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0)',
  'パンニング': '(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)',
  '追跡': '(dynamic panning shot:2.5), (motion blur background:2.4), (tracking camera following movement:2.5), (speed lines directional:2.3)',
};

// --- [v4.0] Dynamic Camera Protocol (App.jsx -> externalized) ---
      export const DYNAMIC_CAMERA_PROTOCOL = `
ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0):

§1. CAMERA DISTORTION WEIGHTS (MANDATORY — Apply these weighted tags to EVERY panel):
(extreme perspective distortion:2.8), (ABSOLUTELY NO eye-level shot:2.9), (NO flat symmetrical composition:2.9), (dramatic severe camera angle:2.7), (extreme visible lens distortion:2.6), (violently tilted horizon line:2.5), (heavily foreshortened body proportions:2.6), (extreme exaggerated depth of field:2.5)

Available lens effects — EACH PANEL MUST USE ONE:
  * (extreme fish-eye barrel distortion:2.8), (massive bulging foreground:2.5), (lens curve warping straight lines:2.6), (subject face very close to curved glass:2.5) — Ultra wide-angle spherical distortion
  * (extreme telephoto compression:2.7), (dangerously close background:2.4), (claustrophobic flattened space:2.5), (distant objects appear massive behind character:2.6) — Background crushes into foreground
  * (severe dutch angle 45 degrees:2.7), (violently tilted world:2.6), (falling gravity sensation:2.5), (sideways slanted walls and floor:2.6) — Frame tilted 15-45 degrees
  * (ultra extreme low angle:2.7), (deep worm's eye view:2.6), (staring up from the floor:2.7), (ceiling is clearly visible:2.8), (towering full-body character from below:2.5), (PHYSICAL CAMERA PLACEMENT: placed flat on the ground looking straight up at the sky:2.0) — Camera at ground level looking UP. IMPORTANT: Always show full body, NEVER crop to shoes only.
  * (ultra extreme high angle:2.7), (steep bird's eye view:2.6), (looking down at the floor:2.7), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0), (character viewed from directly above their head:2.8), (wide shot of the ground beneath:2.5), (PHYSICAL CAMERA PLACEMENT: suspended 10 meters in the air looking straight down at the ground:2.0) — Camera from above looking DOWN

[FLAT SHOT BAN]: (eye-level shot:0.1), (straight-on symmetrical:0.1) — Eye-level/straight compositions are FORBIDDEN. Weight them down to near-zero.
[BODY DEFORMATION]: Characters' body parts closest to camera MUST be drawn 50%+ larger than far-side parts. This distortion is INTENTIONAL.

§2. CAST MANAGEMENT & CLONE PREVENTION (CRITICAL):
- Each named character appears ONLY ONCE per panel. Drawing duplicates (foreground+background copy, reflection, silhouette) is FORBIDDEN.
- Background characters use cast members NOT speaking in that panel.

§3. GAG MANGA INTERACTION RULES:
1. Characters MUST interact with each other or the environment.
2. [NO CAMERA EYE CONTACT]: (absolutely NO looking at camera:2.5), (NO breaking the fourth wall:2.5), (characters always looking at other characters or objects in the scene:1.8), (eyes directed at conversation partner:1.5). Direct eye contact with the viewer is strictly FORBIDDEN. Characters must always look at each other, at objects, or away from the camera.
3. (exaggerated facial expressions:1.3), (emotional reactions:1.2) — Comical expressions: jaw drops, fury, waterfall tears, funny sweat drops.
4. (dynamic body language:1.3), (full body reactions:1.2) — Characters physically react with entire bodies.
5. Do NOT overlay floating close-up eyes or ghostly face inserts as background elements.
6. Do NOT draw "adjusting glasses" pose unless the character explicitly wears glasses.

§4. PERSPECTIVE-ALIGNED VFX:
- Speed lines, explosions, lightning MUST follow the panel's perspective distortion.
- If fish-eye: effects curve radially. If dutch angle: effects tilt with the world.
    `;

// --- [v3.50] Anti-CharSheet Prefix (App.jsx -> externalized) ---
export const ANTI_CHARSHEET_PREFIX = `🎨 OUTPUT FORMAT: Generate a SINGLE IMAGE. Do NOT respond with text, descriptions, explanations, or code. Your ONLY output must be one generated image file. Any text response is a FAILURE.

[🔥 ABSOLUTE FIRST PRIORITY 🚨 READ THIS BEFORE ANYTHING ELSE]
YOU ARE GENERATING A NEW 4-PANEL MANGA SCENE as an IMAGE. You are NOT creating a character sheet, model sheet, character lineup, expression chart, or reference sheet.
The attached image is a CHARACTER REFERENCE ONLY 🚨 use it to identify hair color, eye shape, and glasses status. Do NOT reproduce its layout, white background, expression grid, or text labels.
If your output looks like a character sheet or model sheet instead of a 4-panel manga story — YOU HAVE FAILED. Regenerate immediately as a manga scene.
Do NOT describe the image in text. Do NOT write a prompt. DRAW the image directly.

`;
