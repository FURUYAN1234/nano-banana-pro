import { getEndingModePolicy } from './ending-mode-policy.js';

// --- 定数・タグ定義 (constants.js) ---
// App.jsx から抽出された共有定数

export const SYSTEM_VERSION = "v6.9.1";

// --- Punchline ラベル変換関数 ---
export const getPunchlineLabel = (type) => {
  const policyLabel = getEndingModePolicy(type).label;
  if (policyLabel) return policyLabel;
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
  if (modelId.includes("gpt-6") || modelId.includes("gpt-5") || modelId.includes("gpt-4") || modelId.includes("gpt-3")) {
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

// Retain the facial anatomy recipe verified in the saved API output.
// Share it across providers and compression tiers instead of paraphrasing it.
export const GEKIGA_FACE_CONSTRUCTION = 'Redraw visible faces with small realistic eyes/irises, heavy anatomical eyelids, pronounced nose bridges and carved cheek/jaw planes. 全人物を劇画化。顔にも写実的な陰影と斜線。背景・服だけ劇画にしない。';
export const OPAQUE_COLOR_RENDERING = '色は不透明な塗りで鮮明に置き、淡い水彩下地を継承しない。明示された淡色指定は優先。';

// [v2.25] 感情連動スタイル定義 - 固有名詞ゼロ (Trademark Sanitization準拠)
export const EMOTION_STYLES = {
  NORMAL: {
    style: '',
    proportions: '',
    vfx: '',
  },
  CHIBI_GAG: {
    style: `In THIS PANEL ONLY, redraw the actors as expressive chibi: enlarged heads above shortened torsos and jointed limbs, not just bigger eyes on normal bodies. Preserve Camera/Action, body acting, gaze, facial reactions, hair and glasses. Adapt deformation to keep acting and perspective readable; never replace chibi with unchanged anime or zoom for cuteness. ${OPAQUE_COLOR_RENDERING}`,
    proportions: 'Explicit user proportions win. Otherwise choose the degree of chibi deformation around camera, body acting and expression; no compulsory all-cast head ratio.',
    vfx: '(Exaggerated sweat drops:1.3), (popping veins:1.2), (comedic steam from head), (glasses preserved on chibi face if character wears them:1.5)',
  },
  GEKIGA: {
    style: `In THIS PANEL ONLY, fully redraw faces as realistic GEKIGA manga. ${GEKIGA_FACE_CONSTRUCTION} Thick variable brush contours, solid ink shadow planes and directional facial crosshatching model this anatomy. Keep recognizable identity/age, scripted gaze, Camera/Action and body acting; no added anger, age or wrinkles. FULL COLOR. ${OPAQUE_COLOR_RENDERING}`,
    proportions: '',
    vfx: '(Heavy crosshatching shadows:1.4), (dramatic rim lighting:1.5), (high contrast deep shadows with stark chiaroscuro lighting), (intense speed lines in background)',
    surfaceException: 'intentional crosshatching and deep ink shadows only',
  },
  SHOUJO: {
    style: 'In THIS PANEL ONLY, shift to a soft romantic illustration style with sparkling highlights in the eyes, delicate thin linework, and dreamy soft-focus backgrounds filled with floating flower petals, sparkles, and light bokeh.',
    proportions: '',
    vfx: '(Sparkling star-shaped eye highlights:1.4), (floating cherry blossom petals:1.3), (soft pastel gradient background), (screen tone roses and bubbles)',
    surfaceException: 'controlled sparkle highlights, petals, bokeh, and screen-tone roses only',
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
    style: 'In THIS PANEL ONLY, use a sharp graphic impact frame: forceful brush contours, hard shadow masses, explosive directional strokes and decisive action silhouettes. Preserve the scripted Camera/Action, crop and cast; facial intensity must not force a close-up or change body proportions.',
    proportions: '',
    vfx: '(Explosive radial speed lines from action:1.5), (intense dramatic backlight), (clear action silhouette:1.4)',
    surfaceException: 'intentional radial speed lines and controlled impact aura only',
    // [v2.31] マルチキャラパネル用フォールバック
    // [v2.57] ひび割れ演出を削除し、エネルギー放射型演出に差し替え
    styleMulti: 'In THIS PANEL ONLY, use a sharp graphic impact frame: forceful brush contours, hard shadow masses and explosive directional strokes around distinct cast action silhouettes. Preserve scripted Camera/Action and crop; never trade the group action for a single face or shatter panel borders.',
    proportionsMulti: '',
    vfxMulti: '(Explosive radial speed lines from center:1.5), (intense glowing energy aura:1.2), (intense dramatic backlight), (dynamic action poses:1.3)',
  },
  WATERCOLOR: {
    style: 'In THIS PANEL ONLY: transparent color washes ON faces/hair/clothes. 前景・人物・小物・背景すべて透明水彩の淡い薄塗り。水のにじみ、色溜まり、重なる淡い洗い。Luminous diluted color, paper white through light areas, pale soft shadows and sparse colored edges; no heavy black contours or opaque base. No cel-fill or watercolor filter over anime; pigment shapes build faces and folds. Keep dark hair/wardrobe identity, legible eyes/hands/text and Camera/Action/identity.',
    proportions: '',
    vfx: '(Luminous transparent watercolor washes:1.4), (soft broken pigment edges:1.3), (paper white through light areas), (subtle paper grain)',
    surfaceException: 'intentional watercolor wash and paper grain only',
  },
  RETRO: {
    style: 'In THIS PANEL ONLY, shift to a 1970s-1980s retro manga style with halftone dot shading, thick bold outlines, and classic exaggerated sweat/shock visual metaphors. IMPORTANT: Maintain each character\'s original vibrant hair colors and eye colors accurately despite the retro art style shift. Do NOT desaturate or mute character colors.',
    proportions: '',
    vfx: '(Halftone dot pattern shading:1.4), (thick bold outlines:1.3), (retro manga panel borders), (classic manga shock symbols)',
    surfaceException: 'intentional halftone/screentone on backgrounds and retro panel borders only',
  },
  GLITTER: {
    style: 'In THIS PANEL ONLY, the main character radiates confidence with dramatic golden backlighting, brilliant sparkle effects around their face, and a confident smirk or triumphant expression. Their hair is dramatically highlighted by the backlighting. Do NOT change any character\'s hair length or hairstyle from their reference description.',
    proportions: '',
    vfx: '(Dramatic golden backlight aura:1.4), (brilliant sparkle highlights:1.3), (sparkle particle effects around face:1.3), (confident smirk expression)',
    surfaceException: 'controlled sparkle highlights and aura around the acting character only',
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
  style: 'In THIS PANEL ONLY, the entire composition conveys extreme speed and motion. CRITICAL: Keep faces and eyes SHARP and clearly readable — apply motion blur ONLY to moving parts (legs, arms, hair tips, clothing edges). Background becomes directional speed lines radiating from the movement direction. The panel feels like a single frame captured from an intense chase or sudden dash, as if the camera is panning to track the subject.',
  proportions: '',
  vfx: '(sharp focus on face and eyes:1.5), (motion blur only on moving parts:1.4), (directional motion blur following movement:1.4), (extreme horizontal speed lines filling background:1.5), (wind-blown hair and clothing:1.3), (dynamic forward-leaning running pose:1.3), (after-image ghosting effect:1.2), (panning shot sense of speed:1.3)',
  surfaceException: 'intentional directional speed lines and motion streaks only',
};
EMOTION_STYLES.FLASHBACK = {
  style: 'In THIS PANEL ONLY, shift to a memory/flashback visual style. The entire panel is rendered in warm sepia tones with soft vignette darkening at the edges. Lines are slightly softer and hazier than normal panels. A dreamy, nostalgic atmosphere pervades the scene. Panel borders may appear wavy or fade out to indicate this is a memory.',
  proportions: '',
  vfx: '(Warm sepia color grading:1.5), (soft vignette darkening at panel edges:1.4), (dreamy soft-focus gaussian blur:1.3), (faded desaturated colors:1.2), (wavy or dissolved panel border edges:1.2)',
};
EMOTION_STYLES.UKIYOE = {
  style: 'In THIS PANEL ONLY, redraw the existing actors and scene as ukiyo-e woodblock: carved black contours, flat pigment planes and rhythmic printed shapes on faces and clothing. Preserve Camera/Action, identity, canonical hair colors and accessories; do not substitute a stock historical scene or leave normal anime actors over a woodblock background.',
  proportions: 'Characters may appear slightly elongated with elegant poses typical of ukiyo-e figure drawing.',
  vfx: '(Flat bold color areas with no gradients:1.4), (thick black woodblock-style outlines:1.5), (stylized wave or cloud patterns in background:1.3), (traditional Japanese color palette - indigo vermillion ochre:1.3)',
};
EMOTION_STYLES.POP_ART = {
  style: 'In THIS PANEL ONLY, redraw actors as pop-art print: thick graphic contours, flat vivid pigment planes and controlled Ben-Day dots modeling faces and clothing. Keep Camera/Action, identity, dialogue and bubble layout. Colorful dots only behind unchanged anime actors are insufficient.',
  proportions: '',
  vfx: '(Bold Ben-Day halftone dot shading:1.5), (primary color palette - red blue yellow:1.4), (thick bold pop art outlines:1.4), (high contrast flat color fills:1.3), (retro comic book printing texture:1.2)',
  surfaceException: 'intentional Ben-Day dots and retro print texture only',
};
EMOTION_STYLES.SKETCH = {
  style: 'In THIS PANEL ONLY, construct the actors with loose visible pencil strokes, rough hatching and paper grain; faces, hair and clothing share the sketch medium, with readable focal features. Keep Camera/Action and recognizable identity. Paper texture behind clean cel actors is insufficient.',
  proportions: '',
  vfx: '(Rough pencil sketch lines:1.5), (visible construction guidelines:1.3), (loose crosshatch shading:1.4), (unfinished edges fading to white paper:1.3), (graphite pencil texture on paper grain:1.2)',
  surfaceException: 'intentional pencil grain, rough hatching, and construction lines only',
};
EMOTION_STYLES.NEON = {
  style: 'In THIS PANEL ONLY, shift to a cyberpunk neon-lit aesthetic. The scene is bathed in intense neon glow from pink, cyan, and purple light sources. Characters have neon rim lighting outlining their silhouettes. The background is dark with glowing signs, light trails, and reflective wet surfaces. The mood is futuristic and electric.',
  proportions: '',
  vfx: '(Intense neon pink and cyan rim lighting:1.5), (dark background with glowing light sources:1.4), (reflective wet surface catching neon colors:1.3), (light bloom and lens flare from neon:1.3), (cyberpunk color palette - magenta cyan purple:1.4)',
  surfaceException: 'controlled neon glow, bloom, lens flare, and wet reflections only',
};
// [v2.95] 画風パレット拡張: 6つの新EMOTION_STYLES（厚塗り・パステル・セル画・ダーク・繊細線・高彩度）
EMOTION_STYLES.THICK_PAINT = {
  style: 'In THIS PANEL ONLY, paint actor faces, hair and clothing with overlapping opaque brush masses, visible layered strokes and impasto-like edge accents; model turning forms through pigment and light, not only a textured background. Preserve Camera/Action, recognizable identity, age and focal facial features.',
  proportions: '',
  vfx: '(Visible thick brush stroke texture:1.5), (rich oil painting color depth:1.4), (dramatic chiaroscuro light modeling:1.4), (three-dimensional form through heavy shading:1.3), (warm subsurface scattering on skin:1.2)',
  surfaceException: 'intentional visible brush-stroke texture and paint layering only',
};
EMOTION_STYLES.PASTEL = {
  style: 'In THIS PANEL ONLY, shift to a soft pastel anime illustration style. Use light desaturated colors, gentle gradients, and a warm dreamy atmosphere. Lines are thin and delicate. The overall mood should feel gentle, healing, and calming like a picture book illustration.',
  proportions: '',
  vfx: '(Soft pastel color palette:1.5), (gentle gradient sky background:1.3), (warm diffused lighting:1.4), (thin delicate line art:1.3), (light bloom soft glow:1.2)',
  surfaceException: 'controlled soft bloom and pastel glow only',
};
EMOTION_STYLES.CEL = {
  style: 'In THIS PANEL ONLY, shift to a modern high-budget TV anime cel animation style. Use vibrant, highly saturated colors with clearly defined deep shadow areas. Outlines are bold and distinct to separate characters from the background. The color palette is rich, energetic, and visually popping.',
  proportions: '',
  vfx: '(Modern high-budget TV anime cel shading:1.5), (vibrant highly saturated colors:1.5), (clearly defined hard-edge deep shadows:1.4), (bold prominent character outlines:1.4), (rich energetic color palette:1.3)',
};
EMOTION_STYLES.DARK_ANIME = {
  style: 'In THIS PANEL ONLY, shift to a dark atmospheric anime style. The overall brightness is significantly reduced. Deep shadows dominate the composition. Colors are desaturated except for occasional accent lighting (moonlight, streetlamp, screen glow). The mood is mysterious, tense, and foreboding.',
  proportions: '',
  vfx: '(Overall dark low-key lighting:1.5), (deep dramatic shadows covering 60% of panel:1.4), (desaturated muted color palette:1.3), (single accent light source creating rim light:1.4), (atmospheric fog or haze:1.2)',
  surfaceException: 'controlled atmospheric fog or haze only',
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
// [v4.7.5] 新EMOTION追加: 墨インク・モノクロアクセント・ゴールデンアワー
EMOTION_STYLES.SUMI_INK = {
  style: 'In THIS PANEL ONLY, shift to a dramatic Japanese ink splash aesthetic. The background features bold black sumi ink splashes and dynamic calligraphy brush strokes erupting behind or around the characters. Generous white negative space contrasts with the explosive ink. Characters remain clean and fully colored in the foreground while the ink effects create dramatic energy behind them. The mood is intense, elegant, and distinctly Japanese.',
  proportions: '',
  vfx: '(black sumi ink splash behind character:1.5), (dynamic calligraphy brush strokes:1.4), (white negative space background:1.4), (ink wash gradient:1.2), (controlled ink splatter:1.3), (clear character silhouette:1.4), (subtle red accent on key element:1.2)',
  surfaceException: 'intentional sumi ink splashes, brush strokes, and ink wash only',
};
EMOTION_STYLES.MONOCHROME_ACCENT = {
  style: 'In THIS PANEL ONLY, render the entire panel in dramatic grayscale monochrome EXCEPT for one single vivid color element (such as a key object, a character\'s eyes, or a critical item). This creates a cinematic selective-color effect that instantly draws the viewer\'s eye to the most important element in the scene. The contrast between the monochrome world and the single vivid color maximizes dramatic impact.',
  proportions: '',
  vfx: '(monochrome grayscale panel:1.5), (single vivid color accent on key element:1.5), (high contrast black and white:1.4), (dramatic selective color technique:1.4), (cinematic desaturated atmosphere:1.3), (sharp focus on colored element:1.3)',
};
EMOTION_STYLES.GOLDEN_HOUR = {
  style: 'In THIS PANEL ONLY, bathe the entire scene in warm golden sunset lighting. Long dramatic shadows stretch across the ground. Everything is illuminated by rich amber-orange light from a low sun angle, creating an emotionally charged, cinematic atmosphere. Characters are warmly backlit with golden rim lighting outlining their silhouettes. The mood is nostalgic, beautiful, and emotionally resonant — perfect for fake-emotional endings or dramatic irony.',
  proportions: '',
  vfx: '(warm golden hour sunlight:1.5), (long dramatic shadows:1.4), (rich amber orange rim lighting:1.4), (low sun angle backlight:1.3), (warm color temperature shift:1.3), (cinematic emotional atmosphere:1.3), (soft lens diffusion:1.2)',
  surfaceException: 'controlled golden rim light and soft lens diffusion only',
};

// Budget-safe drawing recipes. Keep the visual operation, not a bare style name.
export const COMPACT_EMOTION_STYLES = Object.freeze({
  CHIBI_GAG: `Redraw enlarged heads, shortened torsos and jointed limbs as expressive chibi, not unchanged anime. Keep Camera/Action, acting/gaze/hair/glasses; readable perspective, no zoom for cuteness. ${OPAQUE_COLOR_RENDERING}`,
  GEKIGA: `Realistic gekiga: ${GEKIGA_FACE_CONSTRUCTION} Brush ink/facial hatching; keep identity/age/color, gaze and Camera/Action. ${OPAQUE_COLOR_RENDERING}`,
  SHOUJO: 'Delicate thin linework, fine eyelashes, luminous layered irises, airy soft shading, petals and bokeh behind clear acting faces.',
  HORROR: 'Deep ink masses, sharp lit facial planes and eerie rim/underlighting; keep scripted framing and cast.',
  BLANK: 'Affected face: blank pupil-less eyes behind retained glasses, pale face, rigid acting and dark emotional aura.',
  IMPACT: 'Forceful brush contours, hard shadow masses and explosive strokes; crisp action silhouettes in the scripted crop.',
  WATERCOLOR: '前景・人物・小物・背景すべて透明水彩の淡い薄塗り、にじみ、色溜まり、重なる淡い洗い。Dilute luminous color, paper white through light areas, pale soft shadows; no heavy black contours or opaque base. No cel-fill or watercolor filter over anime; pigment shapes build faces and folds. Keep dark hair/wardrobe, legible eyes/hands/text, Camera/Action/identity.',
  RETRO: 'Bold period-manga contours, graphic screentone shadows and classic expressive marks; keep canonical character colors.',
  GLITTER: 'Golden backlight, brilliant controlled sparkles and hair rim highlights; preserve scripted expressions.',
  SHADOW: 'Existing actor in deep cast-shadow silhouette with readable eye highlights and facial contour; no new figure.',
  SPEED: 'Directional strokes and panning streaks following actual movement; sharp focal face and limbs.',
  FLASHBACK: 'Delicate faded-memory rendering, soft vignette and subdued environmental palette; identity and costume remain.',
  UKIYOE: 'Carved woodblock actor contours, flat pigment planes and rhythmic printed shapes on faces/clothing; existing scene, Camera/Action/identity fixed.',
  POP_ART: 'Bold graphic actor contours, flat vivid pigment and Ben-Day dots on faces/clothing; Camera/Action/identity/lettering fixed, not background-only dots.',
  SKETCH: 'Visible pencil strokes and deliberate hatching construct actor faces/hair/clothing; paper grain, readable features, Camera/Action/identity fixed.',
  NEON: 'Colored neon rims and sharp reflected light on dark surfaces, controlled glow behind crisp faces.',
  THICK_PAINT: 'Opaque brush masses and layered strokes model actor faces/hair/clothing, with impasto-like edges; Camera/Action/identity/age fixed, not background texture alone.',
  PASTEL: 'Soft pastel pigment, gentle diffused light and airy low-contrast shading; clear focal edges.',
  CEL: 'Decisive animation ink, flat color fills and hard-edged cel-shadow planes; no painterly gradients.',
  DARK_ANIME: 'Deep low-key shadow planes, restrained environmental color and narrow motivated rim light.',
  THIN_LINE: 'Ultra-fine precise contours, delicate hair/fabric detail and sparse fine hatching; clean color.',
  HIGH_SATURATION: 'Vivid saturated environmental color planes and strong complementary contrast; recognizable skin and wardrobe hues.',
  SUMI_INK: 'Bold calligraphic black brush strokes and controlled ink wash behind clean colored actors; white negative space.',
  MONOCHROME_ACCENT: 'Grayscale scene with one isolated vivid focal-color accent; crisp black/white contrast.',
  GOLDEN_HOUR: 'Amber sunset key light, long cast shadows and warm rim highlights; cinematic color depth.'
});

// One palette contract drives automatic selection and observed actor-medium QA.
// Automatic selection uses the six visually reviewed media. Other recipes
// remain readable for explicitly imported/manual scenarios.
const actorDrawingStyles = {
  GEKIGA: { family: 'gekiga' },
  CHIBI_GAG: { family: 'chibi', actorCue: 'shortened_body', evidence: 'enlarged head plus shortened torso and jointed limbs, projected through the fixed Camera' },
  WATERCOLOR: { family: 'watercolor', actorCue: 'transparent_washes', evidence: 'transparent pigment layers and broken pooling edges on the actor, not just paper or background' },
  UKIYOE: { family: 'woodblock', actorCue: 'woodblock_planes', evidence: 'carved actor contours and flat pigment planes' },
  POP_ART: { family: 'pop_print', actorCue: 'ben_day_print', evidence: 'bold actor contours, flat color and Ben-Day print marks on actor planes' },
  SKETCH: { family: 'pencil', actorCue: 'pencil_strokes', evidence: 'visible pencil strokes and hatching constructing the actor' },
  THICK_PAINT: { family: 'opaque_paint', actorCue: 'opaque_brush_masses', evidence: 'overlapping opaque brush masses modeling the actor' },
};
export const STYLE_DRAWING_CONTRACTS = Object.freeze(Object.fromEntries(Object.keys(EMOTION_STYLES).map(style => [style,
  Object.freeze({ family: 'anime', actorCue: null, automatic: ['NORMAL', 'GEKIGA', 'WATERCOLOR', 'POP_ART', 'SKETCH', 'CHIBI_GAG'].includes(style), ...actorDrawingStyles[style] }),
])));

// [v2.53.3] HYPER-DYNAMIC Camera Angle Generator — 数値ウェイト付きタグ強化版
export const cameraAngles = [
  "LOW ANGLE WIDE SHOT: (rectilinear wide-angle perspective:1.8), (low angle:1.7), (near-far scale contrast:1.6). Camera at knee height looking up; foreground and distant bodies follow coherent perspective, straight setting lines remain straight",
  "DYNAMIC TELEPHOTO HIGH ANGLE: (telephoto compression:1.8), (extreme high angle:1.7), (flattened depth:1.6), (compressed background:1.5). Looking down from above, faces large, bodies compress vertically",
  "EXTREME DUTCH ANGLE (30° tilt): (dutch angle 30 degrees:1.8), (tilted horizon:1.7), (diagonal composition:1.6), (zero horizontal lines:1.5). Entire scene tilted 30 degrees, floor becomes steep diagonal",
  "FLOOR-LEVEL WIDE ANGLE: (extreme low angle:1.8), (rectilinear wide-angle depth:1.7), (exaggerated foreshortening:1.6), (towering characters:1.5). Camera on floor looking up; ceiling and architectural lines retain straight projection",
  "DRAMATIC TELEPHOTO MEDIUM SHOT: (telephoto compression:1.8), (claustrophobic depth:1.7), (flattened spatial layers:1.6). Background objects unnaturally close to characters",
  "BIRD'S EYE DUTCH ANGLE (20° tilt): (extreme high angle:1.8), (bird's eye view:1.7), (dutch angle 20 degrees:1.6), (foreshortened bodies:1.5). Directly overhead, tilted 20 degrees",
  "WIDE ANGLE OVER-THE-SHOULDER: (rectilinear wide-angle perspective:1.7), (over-the-shoulder composition:1.6), (foreground-background depth:1.5). View from behind one character's shoulder with straight environmental edges",
  "CINEMATIC LOW ANGLE TELEPHOTO: (extreme low angle:1.8), (telephoto compression:1.7), (imposing heroic pose:1.5). Camera below chin level, background compresses dramatically flat",
  "DYNAMIC ACTION WIDE SHOT: (rectilinear wide-angle perspective:1.8), (coherent spatial depth:1.7), (exaggerated depth separation:1.6). Full scene with strong near-far scale contrast and straight setting lines",
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

// [v4.5.6] シネマティック構図10選マッピング辞書
export const cinematicCompositionMap = {
  'Epic Wide': '(dynamic wide-angle lens:1.5), (cinematic composition:1.4), (extreme depth of field:1.3), (environmental shot:1.2), (expansive background:1.2), (structural scale:1.3)',
  'Dominant Low': '(low-angle shot:1.5), (looking down at viewer:1.4), (heroic posture:1.3), (powerful stance:1.3), (dramatic framing:1.4), (background convergence:1.2)',
  'Innocent High': '(high-angle shot:1.5), (looking up at viewer:1.4), (cute expression:1.3), (emotional gaze:1.4), (upper body emphasis:1.3), (soft lighting:1.4), (vulnerable aesthetic:1.3)',
  'Hyper Perspective': '(extreme foreshortening:1.6), (story-action depth axis:1.5), (asymmetrical body axis:1.4), (environment convergence:1.3), (intense perspective:1.5)',
  'Aesthetic Thirds': '(rule of thirds composition:1.6), (off-center subject:1.5), (professional photography framing:1.4), (balanced negative space:1.5), (artistic breathing room:1.4), (aesthetic positioning:1.3)',
  'Over The Shoulder': '(looking back:1.5), (over-the-shoulder shot:1.4), (turning head:1.4), (twisting waist:1.3), (dynamic hair flow:1.2), (enticing gaze:1.3), (side profile highlight:1.4)',
  'Deep Emotion Close': '(closeup shot:1.5), (portrait composition:1.4), (large pupil:1.2), (detailed eyes:1.4), (shallow depth of field:1.5), (blurred background:1.6), (crisp focus on facial features:1.5)',
  'Cinematic Slant': '(dutch angle:1.5), (tilted camera framing:1.4), (unstable composition:1.3), (dynamic tension:1.4), (diagonal lines:1.3), (stylish disorientation:1.2), (action movie vibe:1.3)',
  'Graceful Full Shot': '(full body shot:1.5), (contrapposto pose:1.4), (twisting waist:1.3), (body line emphasis:1.4), (model posture:1.3), (elegant silhouette:1.4), (balanced framing:1.2)',
  'Bokeh Depth': '(eye-level shot:1.5), (front view:1.2), (depth layer background:1.4), (foreground bokeh:1.6), (background blur:1.5), (layered composition:1.4), (high contrast depth:1.3), (immersive distance:1.4)'
};

// --- [v4.0] Dynamic Camera Protocol (App.jsx -> externalized) ---
export const DYNAMIC_CAMERA_PROTOCOL = `
ANTIGRAVITY CAMERA PROTOCOL:
- CAMERA INTENSITY: follow each scripted camera's distance, height, tilt and perspective. Preserve strong foreshortening when requested; do not add extreme distortion to every panel. Quiet or fixed shots provide contrast.
- BODY PERSPECTIVE: near/far scale follows the chosen lens and distance; preserve anatomy and the scripted action, with no mandatory enlargement ratio.
- ANTI-CLONE: Each character appears ONLY ONCE per panel.
- EYE-LINE BASE: during dialogue, visible gaze/face/torso aim at another character, never lens/front unless the story explicitly has an in-world direct address. Build depth with three-quarter faces, back-three-quarter or over-the-shoulder partner views, and foreground/midground/background layers; vary these arrangements across panels instead of flattening every conversation into side profiles.
- VFX MUST follow the panel's perspective and reading rhythm, leaving the focal target clear.
`;

// --- [v3.50] Anti-CharSheet Prefix (App.jsx -> externalized) ---
export const ANTI_CHARSHEET_PREFIX = `🎨 OUTPUT FORMAT: SINGLE 4-PANEL MANGA PAGE.
[🔥 CRITICAL RULES]
- DRAW A 4-PANEL MANGA SCENE. NOT A CHARACTER SHEET.
- TEXT POLICY: Draw ONLY the specified title, speech-bubble dialogue, and watermarks. Do NOT draw random labels, SFX, captions, or extra text.
- Reference images are ONLY for hair/eyes/glasses. DO NOT copy their layout.
`;
