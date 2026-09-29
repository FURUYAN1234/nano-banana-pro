import { FOCAL_READABILITY, FOCAL_SUBJECT_SEPARATION_FALLBACK, SKIN_LIGHTING, SHARED_IMAGE_QUALITY_CONTRACT } from './shared-image-quality.js';

export const normalizeMangaColorMode = (value) => value === 'monochrome' ? 'monochrome' : 'color';
export const isMonochromePrompt = (prompt) => {
  const value = String(prompt || '');
  return value.includes('[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]')
    || value.includes('[ MONOCHROME TWO-VALUE RENDERING LOCK ]');
};

// Character analysis intentionally records source colors for full-color output.
// In monochrome mode those chroma adjectives must not travel downstream as
// reproduction commands. This vocabulary is medium metadata, not a cast- or
// sample-specific exception; names/headings are kept untouched.
const SOURCE_CHROMA_WORDS = Object.freeze([
  'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet', 'pink',
  'brown', 'black', 'white', 'gray', 'grey', 'blond', 'blonde', 'ginger',
  'auburn', 'silver', 'gold', 'golden', 'navy', 'cyan', 'magenta', 'teal',
  'turquoise', 'emerald', 'amber', 'beige', 'cream', 'ivory', 'maroon',
  'burgundy', 'indigo', 'lavender', 'lilac', 'peach', 'coral', 'salmon',
  'khaki', 'scarlet', 'crimson', 'vermilion', 'ochre', 'sepia', 'multicolor',
  'multicolored', 'rainbow', 'pastel', 'neon'
]);
const SOURCE_CHROMA_TOKEN_RE = new RegExp(`\\b(?:${SOURCE_CHROMA_WORDS.join('|')})\\b`, 'gi');
const SOURCE_CHROMA_QUALIFIER_RE = /\b(?:very\s+)?(?:light|dark|deep|bright|vivid|muted)\b(?=\s+(?:hair|eyes?|iris|irises|skin|complexion|tips?|ends?|streaks?|highlights?|shirt|blouse|jacket|coat|vest|dress|skirt|uniform|cardigan|hoodie|sweater|tie|ribbon|shoes?|socks?))/gi;
const SOURCE_CHROMA_JA_BEFORE_FEATURE_RE = /(?:黒|白|赤|青|緑|黄|橙|紫|桃|茶|灰|銀|金|紺|藍|水色|ピンク|ベージュ)(?:色)?(?=\s*(?:髪|毛|目|瞳|肌|シャツ|ブラウス|上着|ジャケット|コート|ベスト|服|制服|スカート|リボン|靴|靴下))/g;

const stripChromaFromDescriptorLine = (line) => String(line || '')
  .replace(SOURCE_CHROMA_QUALIFIER_RE, '')
  .replace(SOURCE_CHROMA_TOKEN_RE, '')
  .replace(SOURCE_CHROMA_JA_BEFORE_FEATURE_RE, '')
  .replace(/\(\s*:\s*\d+(?:\.\d+)?\s*\)/g, '')
  .replace(/\s{2,}/g, ' ')
  .replace(/\s+,/g, ',')
  .replace(/,\s*,+/g, ',')
  .replace(/:\s*,/g, ': ')
  .replace(/,\s*$/g, '')
  .trim();

export const sanitizeMonochromeSourceDescription = (value = '') => String(value)
  .split('\n')
  .map((line) => {
    if (/^\s*##/.test(line)) return line;
    const castPrefix = line.match(/^(\s*-\s*Character\s*\[[^\]]+\]\s*:)(.*)$/i);
    if (!castPrefix) return stripChromaFromDescriptorLine(line);
    return `${castPrefix[1]} ${stripChromaFromDescriptorLine(castPrefix[2])}`.trimEnd();
  })
  .join('\n')
  .trim();

// This contract travels in the final prompt itself: API and manual Web paste
// must not depend on an API-only suffix or an image post-processing step.
// 短縮版にも同じ参照解釈を残す。色の境界は形状情報として網点へ置き換える。
export const MONOCHROME_REFERENCE_SEPARATION = `BLACK INK PLATE: redraw. Colored references: identity, not palette.
SOURCE COLOR BOUNDARIES: fix regions/accents/gradients/tips/streaks as black/white/screens.
SCENE COLOR PRIORITY: keep story and verbatim text; source hues yield to assigned ink/skin bases.`;

// 全体・Web短縮の両方で、白地と網点を置ける領域を同じ条件で固定する。
const MONOCHROME_SCREEN_MASK = 'SCREEN MASK: white/black first; screen=assigned material/dark-skin bases or bounded shadows; unassigned=white. Never convert brightness to dots or screen lighting/depth.';
const MONOCHROME_INK_LIGHT_SOURCE = 'INK LIGHT SOURCE: glow/transparency/fog=white cutouts+black contours; no glow/screen veil. Preserve light direction/perspective/drama.';
const MONOCHROME_NEUTRAL_INK = 'NEUTRAL INK: R=G=B everywhere; no tint, including fine lines/screens/reflections/highlights.';
const MONOCHROME_SCREENED_SKIN_BASE = 'SCREENED SKIN BASE: dark/tanned=one screen before lighting; light keeps base; shade=black/hatching. Small light-driven highlights allowed; no broad white islands/cross-panel base changes. Overrides style lighting.';
const MONOCHROME_SKIN_PAPER_BASE = 'SKIN PAPER BASE: lit light skin=#FFFFFF, identical to balloon interiors. No base wash/texture. Form and cast shadows use bounded screen/black shapes; lit planes stay white.';
const MONOCHROME_TONE_ALLOCATION = `MONOCHROME THREE-TONE MANUSCRIPT: use exactly three visual tone classes: (1) white paper, (2) solid black ink, (3) one bounded black-on-white screentone. This is Japanese manga screentone, not halftone rendering and not grayscale.
WHITE PAPER RESERVE: every panel keeps a large area of unprinted paper. Lit areas of light skin, light walls, ceilings and light fabric stay pure white; no base tone/dots/hatching. Screentone only in assigned material midtones or bounded shadows. Never screen a whole light-skin face, panel or background. Hatching remains black line texture, never a fourth tonal class. Overrides reference shading/style.
${MONOCHROME_SCREEN_MASK}
VALUE DESIGN: White and solid black must dominate; screen is sparse and secondary.`;
const MONOCHROME_DEFOCUS = 'DEPTH OF FIELD / DEFOCUS: reduce distant line density and widen white gaps; never add screentone for distance or blur.';

// 色の制限と演出の強度を分離し、Web短縮版にも同一の変換指示を残す。
export const MONOCHROME_DRAMATIC_LIGHTING = 'INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts. Background simplification preserves perspective, contact shadows and depth. Scripted peak/quiet contrast.';

export const MONOCHROME_RENDERING_LOCK = `[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]
REQUIRED OUTPUT MEDIUM: finished Japanese black-and-white manga manuscript. Use white paper, solid black ink and one bounded screentone as the only three visual tone classes. The screentone itself is printed with pure black #000000 marks on pure white #FFFFFF paper. Not grayscale, not desaturated color and not halftone rendering.
${MONOCHROME_REFERENCE_SEPARATION}
${MONOCHROME_TONE_ALLOCATION}
G-PEN INK DIRECTION: strongly emphasize the pressure-sensitive G-pen nib character: decisive thick-to-thin strokes, sharp tapered entry/exit, springy curved contours and forceful black accents. Use a clear hierarchy: bold near-side silhouettes and contact/overlap accents, medium structural contours, fine face/eye/finger details and lighter distant lines. Solid blacks and crisp white cutouts anchor the composition. Never uniformly thicken every line, merge fingers/features into black blobs, or replace clean ink with scratchy noise. Lit light skin remains unprinted even in the most forceful panel.
BLACK-HAIR INK LOCK: hair that is black or among the darkest hair in the references uses a substantial solid-black mass as its base. Preserve form with only narrow, intentional white highlight/shine cutouts and a few directional strand lines; never replace the dark hair base with uniform grey or screentone.
INK-DRIVEN COMPOSITION: actively exploit foreshortened foreground forms, diagonal staging, strong camera height/tilt, layered depth and asymmetrical black/white mass balance. Direct the eye to the acting face, important hand and story prop; let tapered action lines follow physical movement without obscuring them. Vary scale and viewpoint across panels; reserve the strongest black mass and stroke accents for the story's emphatic beat. Preserve explicit Camera/Action, quiet beats and readable silhouettes: do not force every panel into an impact frame, close-up, fisheye or speed-line burst. Keep the four-panel grid intact.
${MONOCHROME_SKIN_PAPER_BASE}
CHEEK SCREENTONE EXCEPTION: use a small localized cheek screen only when the Action explicitly says blush, flush or red cheeks, or at one deliberate emotional peak. Never apply cheek tone as a default beauty effect or to every character; all other cheeks remain white paper.
CANONICAL SKIN TONE MAP: light skin uses white-paper base, with bounded shadows. Dark/tanned face, neck, limbs, hands and palms share a uniform screen base; preserve reference-specific palm/sole differences, never invent them. Blush on screened skin uses expression lines, not extra screen density.
${MONOCHROME_SCREENED_SKIN_BASE}
SCREENTONE: the sole middle tone is a clean, consistent Japanese manga screentone printed as separable black marks on white paper. Do not simulate continuous tones by changing dot density panel by panel. No stacked screens, moire or random dithering. Whites remain white and solid blacks remain solid. Hatching may describe form as black linework but must not create an additional tonal tier.
FORBIDDEN: No flat grey fills, grayscale gradients, soft airbrush, translucent washes, colored pixels, sepia, selective-color accents, colored light, bloom or tinted paper. Edges of ink and dots stay black/white without grey antialias fringes.
${MONOCHROME_DEFOCUS}
${MONOCHROME_INK_LIGHT_SOURCE}
${MONOCHROME_NEUTRAL_INK}
REFERENCE / PRIORITY: preserve hairstyle, face/eye shape, glasses, clothing design, patterns, props and anatomy. This medium replaces source hues and paint materials; preserve lighting direction, contrast and dramatic intensity through ink shapes, white highlights and line weight. Never restore reference colors.
${MONOCHROME_DRAMATIC_LIGHTING}
Keep exact dialogue/title/required lettering, script events, cast, camera, poses and acting. Color words inside required text remain verbatim; they do not authorize colored pixels. Do not print this contract or its labels. Inspect the entire page before delivering; remove any tint/grey wash and leave lit light skin pure white.`;

// Manual ChatGPT Web prompts have a conservative empirical copy budget. This
// keeps the same medium invariants when only our explanatory wording is folded.
export const MONOCHROME_RENDERING_LOCK_COMPACT = `[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]
MONOCHROME THREE-TONE MANUSCRIPT: #000000/#FFFFFF + one screen; not grayscale/halftone/color.
BLACK INK PLATE: redraw; refs=identity, not palette.
SOURCE COLOR BOUNDARIES: white/black/screen.
SCENE COLOR PRIORITY: story and verbatim text over source hues.
WHITE PAPER RESERVE: large unprinted white each panel; lit light skin/wall/sky=white; never whole-face/panel/BG screen.
${MONOCHROME_SKIN_PAPER_BASE}
${MONOCHROME_SCREENED_SKIN_BASE}
CHEEK SCREEN: explicit blush/flush or one peak; small, else white.
SCREENTONE: one fixed screen, sparse/bounded. White+solid black dominate; no page/panel veil, grey/gradient/wash/tint/moire.
${MONOCHROME_SCREEN_MASK}
${MONOCHROME_INK_LIGHT_SOURCE}
${MONOCHROME_NEUTRAL_INK}
DEPTH-OF-FIELD DEFOCUS: fewer far lines/wider white gaps; never add screentone for distance or blur.
G-PEN INK DIRECTION: pressure-taper; bold focal/fine face-hand lines. BLACK-HAIR INK LOCK: reference-black/darkest hair=solid black mass+narrow white highlight/shine, never screen base.
INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts; keep depth/beats.
Keep script/Camera/Action; never print rules.`;

export const MONOCHROME_FINAL_CHROMA_AUDIT = 'MONOCHROME FINAL CHROMA AUDIT (MANDATORY): source colors are identity metadata, never output color. Inspect every panel, including hair roots/ends/highlights, irises, lips, cheeks, skin shadows, clothing, props, reflections, VFX, backgrounds, antialiased edges and tiny details. ANY hue, tint, sepia, colored fringe or continuous grey fill fails the whole render: redraw with pure black, pure white and regular black-on-white dots/hatching. Leave lit light skin unprinted; keep screens inside assigned masks. Do not deliver until it passes.';
export const MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT = 'MONOCHROME FINAL CHROMA AUDIT: no tint/grey/veil; lit light skin=unprinted; screen only inside assigned masks.';

export const MONOCHROME_WARDROBE_LOCK = `CROSS-PANEL WARDROBE TONE LOCK:
- Assign each character's garment items, patterns and white/solid-black/screentone regions once; keep the same assignment in all panels. Style changes affect ink treatment, not identity, wardrobe or which garment region uses which tone.`;

export const MONOCHROME_STYLE_QA = 'MONOCHROME STYLE DIFFERENCE QA: make selected styles recognizable through characteristic ink lines, black shapes and screens; no numeric change quota. Preserve script/identity/wardrobe/layout/camera/acting and fixed tone assignments.';

export const MONOCHROME_BACKGROUND_LOCK = 'MONOCHROME BACKGROUND CLARITY LOCK: prioritize focal faces, hands, key props, action silhouettes and lettering. Explicitly scripted abstract beats may omit scenery, never story evidence or contacts. In physical-setting shots simplify nonessential textures and reduce background contrast while retaining recognizable environmental shapes, perspective/depth and every story-required object or clue. Reduce line density in distant planes; preserve white light planes and bounded tone regions. Equal-depth objects share focus. Keep setting light/dark masses; no background-wide screen veil.';
export const MONOCHROME_BACKGROUND_LOCK_COMPACT = 'MONOCHROME BACKGROUND CLARITY LOCK: omit optional textures; keep setting/depth/story evidence/white planes.';

// Adapt only our authored quality text, never replace words in user dialogue,
// Actions, cast descriptions or other source data.
export const MONOCHROME_FOCAL_READABILITY = FOCAL_READABILITY
  .replace('local light/dark value and warm/cool color planes', 'white/solid-black planes')
  .replace('If depth-of-field blur still merges focal, lighten/desaturate BG or deepen behind light silhouettes', 'If focal still merges, reduce BG line density or place bounded solid black behind light silhouettes');
export const MONOCHROME_SKIN_LIGHTING = 'BODY VOLUME: wrap connected form shadows around turning limbs/torso; retain hair/jaw/clothing cast shadows. Follow light direction; no fixed shadow quota. Shade=bounded screen/black, lit=canonical base; no wash. FACE INK: tapered eyes/nose/mouth, distinct white gaps; no feature merging or disappearing hairlines. Bold silhouettes, fine facial lines; shadows preserve expression.';
export const MONOCHROME_IMAGE_QUALITY_CONTRACT = SHARED_IMAGE_QUALITY_CONTRACT
  .replace(FOCAL_READABILITY, MONOCHROME_FOCAL_READABILITY)
  .replace(`- ${FOCAL_SUBJECT_SEPARATION_FALLBACK}\n`, '')
  .replace(SKIN_LIGHTING, MONOCHROME_SKIN_LIGHTING)
  .replace(/- Render a rich physical setting[^\n]*/, '- Physical shots retain recognizable setting anchors and depth; scripted abstract beats may omit scenery, never story evidence. Simplify nonessential detail; keep focal actions and required reactions readable.')
  .replace(/- Keep lighting and color coherent[^\n]*/, '- Keep light direction coherent through bounded ink shadows and white light planes; simplify distant line density while keeping environmental shapes and focal subjects readable.')
  .replace(/- Keep surfaces clean:[^\n]*/, '- Keep surfaces clean: intentional regular black-on-white screentone and hatching are allowed, never random noise, moire or floating dust. Keep lit light skin, bubbles and gutters pure white. Scripted abstract beats may omit scenery, never story evidence.');

// Medium-specific interpretations retain the selected expressive register;
// colored recipes are not included and then contradicted by a later warning.
export const MONOCHROME_EMOTION_STYLES = Object.freeze({
  CHIBI_GAG: 'Expressive chibi caricature; preserve Camera/Action, jointed body acting, individual gaze and facial reactions, hair and glasses. Reduce deformation if it hides acting or flattens perspective; no zoom for cuteness. Black comedic accents on white.',
  GEKIGA: 'Forceful realistic gekiga: carved facial planes at brow, nose, cheek and jaw; tense eyelids and mouth, bold pressure-varied contours, sculpted solid-black facial shadows and directional crosshatching. Redraw facial construction, not just darker anime shading. Keep identity, age, pose and canonical skin bases.',
  SHOUJO: 'Romantic delicate black penwork, outlined flowers and airy white highlights; sparse regular screen dots behind the cast and star-shaped eye highlights. Keep faces, glasses and dialogue readable.',
  HORROR: 'Tense horror-manga penwork, jagged contours and strong black shadow masses with sparse hatching; preserve the existing cast, readable faces and scripted comedic exaggeration.',
  BLANK: 'Frozen deadpan expression, blank white eyes and stiff posture; clean sparse ink contours and canonical facial bases. Preserve glasses around the blank eyes.',
  IMPACT: 'Explosive impact composition with bold ink contours, radial black speed lines and white burst shapes. Keep every scripted participant visible; never replace a multi-character scene with one giant face or crack panel borders.',
  WATERCOLOR: 'Dreamlike delicate ink contours and airy white shapes; translate wash softness into sparse regular black dots on white, with hard dot edges. Keep lit light skin unprinted.',
  RETRO: 'Classic retro manga, thick bold black outlines, the same assigned screentone and exaggerated sweat/shock symbols; clean canonical facial bases.',
  GLITTER: 'Triumphant confident expression, black star outlines and white cutout highlights against controlled black/screentone shapes; retain original hairstyle and canonical facial base.',
  SHADOW: 'Scheming expression framed by solid black cast shadows and white eye highlights; preserve enough facial contour for identity and keep light-skin lit planes white. No additional silhouette character.',
  SPEED: 'Extreme speed through directional black strokes and panning-like hatching; sharp focal faces/eyes, clear moving limbs and wind-blown clothing. Background defocus follows depth; no duplicate people.',
  FLASHBACK: 'Memory scene with delicate ink lines, wavy but separate panel boundaries and sparse regular black dots toward the edges; airy white centers, crisp marks and canonical lit facial bases.',
  UKIYOE: 'Woodblock-like bold black carved contours, flat black and white shapes, elegant elongated figures and patterned hatching integrated with the existing physical setting.',
  POP_ART: 'Punchy graphic composition, thick black outlines, strong black/white shapes and regular Ben-Day dots. Preserve Japanese bubble typography and the declared scene.',
  SKETCH: 'Loose energetic pen sketch with crisp black strokes and deliberate crosshatching separated by white gaps; retain recognizable faces, clear acting and clean lit skin.',
  NEON: 'Electric night atmosphere via white cutout light strips and crisp white rim highlights against controlled black masses and regular screen dots; wet reflections as hard ink/white shapes.',
  THICK_PAINT: 'Weighty sculptural brush-ink rendering: broad solid black brush shapes, decisive white highlights and dense controlled hatching in shadows. Keep light-skin lit planes unprinted.',
  PASTEL: 'Gentle airy mood, fine black lines, large white regions and sparse regular screen dots on background/shadows; light-skin lit planes remain white.',
  CEL: 'Bold animation-like black outlines and crisp solid black cel-shadow shapes with restrained regular screen dots; clear silhouettes and pure white light-skin lit planes.',
  DARK_ANIME: 'Tense low-key scene with deep solid blacks, narrow white rim highlights and controlled hatching; faces remain identifiable and light-skin lit planes stay white.',
  THIN_LINE: 'Ultra-fine precise black penwork for hair, facial features and fabric folds; delicate sparse hatching and regular dots only in shadows, with pure white light-skin lit planes.',
  HIGH_SATURATION: 'Translate explosive visual energy into maximum black/white graphic contrast, bold ink line-weight changes and alternating solid-black/white background shapes; preserve physical setting and readable faces.',
  SUMI_INK: 'Bold solid-black brush strokes and bounded ink splashes behind the cast, contrasted with crisp white shapes; preserve setting anchors and clean canonical lit facial bases.',
  MONOCHROME_ACCENT: 'Emphasize the key element by isolated solid black or pure white contrast against regular screened surroundings. The accent itself is also strictly black and white.',
  GOLDEN_HOUR: 'Low-angle sunset translated into long solid-black cast shadows and sharp white rim highlights; nostalgic atmosphere via sparse regular screen dots and delicate ink lines.',
});

export const MONOCHROME_QA_RULE = 'MONOCHROME REVIEW: the approved manga manuscript uses exactly three visual tone classes: white paper, solid black, and one bounded Japanese screentone. White and solid-black masses dominate; the single screen is sparse and confined to a few bounded shadows/materials. A screen-dominant page/panel, page-wide base tint, atmosphere veil or lack of large unprinted white regions is a monochrome_rendering defect. It is not grayscale or halftone rendering; hatching is black line texture, not a fourth tone. Do not restore reference colors or reject intentional tone mapping as character_reference. Compare identity by face/eye shape, hairstyle, glasses, design and stable tone assignments. Hair that is black or among the darkest in the reference uses substantial solid black with only narrow white highlight/shine cutouts; a grey or screened dark-hair base is a monochrome_rendering defect. Light skin uses white base. Check form and cast shadows on visible anatomy: erased light-driven planes that flatten volume into flat bodies need review. Diffuse light or intentional flat stylization alone is not a defect; ambiguous shade is unverified. Do not reject light-driven screen or solid-black shadows for having area; judge their boundary and direction, not a tiny-shadow quota. Report merged eyes/nose/mouth or lost facial strokes when they obscure expression; preserve intentional stylization and use unverified for resizing ambiguity. Compare lit light-skin interiors with nearby white balloon interiors, away from ink edges: a broad light-grey base is a defect even without visible dots. Do not confuse bounded cast shadows or canonical dark-skin bases with this defect; uncertain edge/resizing shades are unverified. Canonically dark/tanned skin retains its uniform screen base in light, with black/hatching for shadow. Small light-driven highlights and reference-specific palm/sole differences are allowed when the base identity remains clear. Report broad white islands, conspicuous patchiness, face/body mismatch or cross-panel base changes that alter the assigned skin tone. Do not regenerate for a tiny highlight or ambiguous screen marks; use unverified when necessary. Report monochrome_rendering for visible color, flat grey washes/gradients, variable-density or stacked screens, screened/grey lit light skin, repeated default cheek tone without explicit blush/flush/red-cheek Action or a single emotional peak, light walls, ceilings or light fabric, and a background-wide screen veil. Separate bounded shadows, the allowed small localized cheek exception, and assigned material midtones from reserved white light planes. Glow and depth never justify a screen veil or warm/cool tint. This is visual review, not a file bit-depth verification; use unverified for ambiguous marks.';
