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
const MONOCHROME_SCREEN_MASK = 'SCREEN MASK: screen=assigned material/dark-skin bases or bounded form/cast shadows; unassigned=white; no dots/grain. Never convert whole-image brightness to dots. Shadow boundaries follow light and form; screen area alone is not a defect.';
const MONOCHROME_PAPER = 'PAPER: unassigned areas match balloon white; no scan haze/fibers. Change style with ink construction, never a page-wide texture layer.';
const MONOCHROME_INK_LIGHT_SOURCE = 'INK LIGHT SOURCE: glow/transparency/fog=white cutouts+black contours; no glow/screen veil. Preserve light direction/perspective/drama.';
const MONOCHROME_NEUTRAL_INK = 'NEUTRAL INK: R=G=B everywhere; no tint, including fine lines/screens/reflections/highlights.';
const MONOCHROME_SCREENED_SKIN_BASE = 'SCREENED SKIN BASE: dark/tanned=screen before lighting; light keeps base; shade=black/hatching. Small light-driven highlights allowed; no broad white islands/base drift. Overrides style lighting.';
const MONOCHROME_SKIN_PAPER_BASE = 'SKIN PAPER BASE: lit light skin=#FFFFFF, identical to balloon interiors. No base wash/texture. Form and cast shadows use bounded screen/black shapes.';
// 肌の白地処理は線画を消す指示ではない。長文短縮後も描画工程を分離する。
const MONOCHROME_NATIVE_INKING = 'NATIVE MANGA INKING: black pen lines first, then bounded blacks, then screen masks; never trace painted luminance into grey contours. Facial strokes are ink, not skin fill: crisp eyelids/pupils/nose/mouth; never erase them for white skin or highlights. Separate strokes with white gaps; selected soft styles vary strokes, never fade facial anchors.';
const MONOCHROME_NATIVE_INKING_COMPACT = 'NATIVE MANGA INKING: 墨線→ベタ→網点マスク。輝度トレス禁止。目蓋・瞳・鼻・口は肌と別の墨線。白肌・光・柔らかい画風でも消さず。';
const MONOCHROME_TONE_ALLOCATION = `MONOCHROME THREE-TONE MANUSCRIPT: white paper, black ink and purpose-assigned Japanese screentone. These are drawing materials, not a fixed density quota or a three-color pixel limit. Not desaturated painted art.
WHITE PAPER RESERVE: keep unprinted white light planes. Lit areas of light skin, light walls, ceilings and light fabric stay pure white; no base tone/dots/hatching. Screentone only in assigned material midtones or bounded shadows. Never screen a whole light-skin face, panel or background as a default veil. Preserve intentional material bases and motivated shadows even when broad. Hatching describes form as ink strokes.
${MONOCHROME_SCREEN_MASK}
${MONOCHROME_PAPER}
VALUE DESIGN: distinguish paper, ink and assigned tone areas; preserve skin identity, volume and focal contrast without global brightening.`;
const MONOCHROME_DEFOCUS = 'DEPTH OF FIELD / DEFOCUS: reduce distant line density and widen white gaps; never add screentone for distance or blur.';

// 色の制限と演出の強度を分離し、Web短縮版にも同一の変換指示を残す。
export const MONOCHROME_DRAMATIC_LIGHTING = 'INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts. Background simplification preserves perspective, contact shadows and depth. Scripted peak/quiet contrast.';

export const MONOCHROME_RENDERING_LOCK = `[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]
${MONOCHROME_NATIVE_INKING}
LETTERING SPACE: tall balloons; vertical text wins over available space. Reflow balloon columns before staging art; never turn Japanese speech horizontal to fit.
REQUIRED OUTPUT MEDIUM: finished Japanese black-and-white manga manuscript. Draw black #000000 ink on white #FFFFFF paper, then apply regular screentone within assigned masks. Not grayscale conversion, not desaturated color and not whole-page halftone rendering.
${MONOCHROME_REFERENCE_SEPARATION}
${MONOCHROME_TONE_ALLOCATION}
G-PEN INK DIRECTION: NORMAL default; panel recipe wins. Decisive thick-to-thin strokes, sharp tapered entry/exit, springy curved contours and forceful black accents. Use a clear hierarchy: bold near-side silhouettes and contact/overlap accents, medium structural contours, fine face/eye/finger details and lighter distant lines. Solid blacks and crisp white cutouts anchor the composition. Never uniformly thicken every line, merge fingers/features into black blobs, or replace clean ink with scratchy noise. Lit light skin remains unprinted even in the most forceful panel.
BLACK-HAIR INK LOCK: hair that is black or among the darkest hair in the references uses a substantial solid-black mass as its base. Preserve form with only narrow, intentional white highlight/shine cutouts and a few directional strand lines; never replace the dark hair base with uniform grey or screentone.
INK-DRIVEN COMPOSITION: actively exploit foreshortened foreground forms, diagonal staging, strong camera height/tilt, layered depth and asymmetrical black/white mass balance. Direct the eye to the acting face, important hand and story prop; let tapered action lines follow physical movement without obscuring them. Vary scale and viewpoint across panels; reserve the strongest black mass and stroke accents for the story's emphatic beat. Preserve explicit Camera/Action, quiet beats and readable silhouettes: do not force every panel into an impact frame, close-up, fisheye or speed-line burst. Keep the four-panel grid intact.
${MONOCHROME_SKIN_PAPER_BASE}
CHEEK SCREEN: explicit blush/flush or canonical makeup only; small, else white; no default/peak or copied sheet blush.
CANONICAL SKIN TONE MAP: light skin uses white-paper base, with bounded shadows. Dark/tanned face, neck, limbs, hands and palms share a uniform screen base; preserve reference-specific palm/sole differences, never invent them. Blush on screened skin uses expression lines, not extra screen density.
${MONOCHROME_SCREENED_SKIN_BASE}
SCREENTONE: clean regular black marks on white paper; consistent bases across panels, separate bounded shadows. No stacked screens, moire or random dithering. Keep paper reserves, black masses and directional hatching distinct.
FORBIDDEN: No broad grey base wash, grayscale gradients, soft airbrush, translucent washes, colored pixels, sepia, selective-color accents, colored light, bloom or tinted paper. Preserve natural crisp ink edges; never erase facial strokes to expose white paper.
${MONOCHROME_DEFOCUS}
${MONOCHROME_INK_LIGHT_SOURCE}
${MONOCHROME_NEUTRAL_INK}
REFERENCE / PRIORITY: preserve identity, hair, glasses, clothing, props and anatomy; panel recipes may redraw facial construction unless reference-style locked. Replace source hues/paint, retaining light direction, contrast and dramatic ink/white/line weight. Never restore source colors.
${MONOCHROME_DRAMATIC_LIGHTING}
Keep exact dialogue/title/required lettering, script events, cast, camera, poses and acting. Color words inside required text remain verbatim; they do not authorize colored pixels. Do not print this contract or its labels. Inspect the entire page before delivering; remove any tint/grey wash and leave lit light skin pure white.`;

// Manual ChatGPT Web prompts have a conservative empirical copy budget. This
// keeps the same medium invariants when only our explanatory wording is folded.
export const MONOCHROME_RENDERING_LOCK_COMPACT = `[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]
${MONOCHROME_NATIVE_INKING_COMPACT}
縦長フキダシ。空間より縦書き優先。
MONOCHROME THREE-TONE MANUSCRIPT: #000000/#FFFFFF + assigned screens; drawing materials, not a pixel limit; no grayscale/whole-page halftone/color.
BLACK INK PLATE: redraw; refs=identity, not palette.
WHITE PAPER RESERVE: unassigned lit planes=white; no face/panel/BG veil. Assigned bases and motivated shadows may be broad.
${MONOCHROME_SKIN_PAPER_BASE}
SCREENED SKIN BASE: dark/tanned=screen; keep base in light; shade=black/hatching. 小さい光点は可。広い白抜き・ベース漂流は禁止。画風の光効果より肌割当を優先。
CHEEK SCREEN: 明示された赤面・化粧だけ小さく表す。既定の頬模様・見本の赤面の転写は禁止。
SCREENTONE: consistent assigned bases and bounded shadows; no grey wash/gradient/tint/moire; 面積割当なし、全体膜禁止。
SCREEN MASK: assigned material/dark-skin bases or bounded shadows; unassigned=white; no dots/grain. Never convert brightness to dots. 陰影の境界は光源と立体に従う。面積だけで欠陥としない。
PAPER: unassigned areas match balloon white; no scan haze/fibers. 画風差は墨の構築で描く。紙全体の質感レイヤーは禁止。
INK LIGHT SOURCE: white cutouts+black contours; no glow/screen veil. 光源・遠近・演出保持。
NEUTRAL INK: R=G=B; no tint in ink/screen/light/reflections.
DEPTH-OF-FIELD DEFOCUS: fewer far lines/wider white gaps; 遠近・ぼけで網点を足さない。
G-PEN INK DIRECTION: NORMAL default; panel recipe wins. BLACK-HAIR INK LOCK: darkest hair=solid black; white shine, no screen.
INK LIGHT / ACTING: full-body action amplitude; directional solid-black cast shadows, white rim cutouts; keep depth/beats.
台本・Camera・Action・台詞は保持。原色は再現せず、文字中の色名は原文保持。指示非印字。`;

export const MONOCHROME_FINAL_CHROMA_AUDIT = 'MONOCHROME FINAL CHROMA AUDIT (MANDATORY): source colors are identity metadata, never output color. Inspect every panel, including hair roots/ends/highlights, irises, lips, cheeks, skin shadows, clothing, props, reflections, VFX, backgrounds, antialiased edges and tiny details. Visible hue, tint, sepia or broad grey base wash outside assigned masks is a defect; natural neutral ink-edge antialiasing is allowed: redraw with pure black, pure white and regular black-on-white dots/hatching. Leave lit light skin unprinted; keep screens inside assigned masks. Do not deliver until it passes.';
export const MONOCHROME_FINAL_CHROMA_AUDIT_COMPACT = 'MONOCHROME FINAL CHROMA AUDIT: no tint/grey/veil; lit light skin=unprinted; screen only inside assigned masks.';

// The editor accepts user-authored briefs as well as assembled prompts. Carry
// the selected medium into generation and QA even when that brief has no marker.
export const ensureMangaColorModeContract = (prompt, colorMode) => {
  if (!prompt.trim() || normalizeMangaColorMode(colorMode) !== 'monochrome' || isMonochromePrompt(prompt)) return prompt;
  return `${prompt}\n\n${MONOCHROME_RENDERING_LOCK_COMPACT}\n${MONOCHROME_FINAL_CHROMA_AUDIT}`;
};

export const MONOCHROME_WARDROBE_LOCK = `CROSS-PANEL WARDROBE TONE LOCK:
- Assign each character's garment items, patterns and white/solid-black/screentone regions once; keep the same assignment in all panels. Style changes affect ink treatment, not identity, wardrobe or which garment region uses which tone.`;

export const MONOCHROME_STYLE_QA = 'MONOCHROME STYLE DIFFERENCE QA: Selected panel recipes override default linework and facial construction. Keep script/identity/wardrobe/layout/camera/acting/tones; no numeric quota.';

const SCREEN_ROLES = Object.freeze(['assigned-material', 'canonical-dark-skin', 'bounded-shadow']);

export const resolveMonochromeRenderIntent = ({ style = 'NORMAL', preserveReferenceStyle = false, seriousTone = false, skinBases = [] } = {}) => {
  const selected = preserveReferenceStyle ? 'REFERENCE'
    : seriousTone && /CHIBI|COMEDY/i.test(style) ? 'NORMAL'
      : Object.hasOwn(MONOCHROME_EMOTION_STYLES, style) ? style : 'NORMAL';
  return Object.freeze({
    medium: 'native-monochrome', style: selected,
    preserveReferenceStyle, seriousTone,
    skinBases: Object.freeze(skinBases.map(({ subject, base }) => Object.freeze({
      subject, base: ['paper', 'screen'].includes(base) ? base : 'reference',
    }))),
    screenRoles: SCREEN_ROLES, paperRule: MONOCHROME_PAPER,
    lineRule: selected === 'REFERENCE'
      ? 'Preserve reference-sheet linework, facial construction and proportions; translate palette to assigned ink/skin bases.'
      : selected === 'NORMAL'
        ? 'Pressure-taper black penwork; bold focal silhouettes, distinct fine face/hand strokes and purposeful black accents.'
        : MONOCHROME_EMOTION_STYLES[selected],
  });
};

export const MONOCHROME_BACKGROUND_LOCK = 'MONOCHROME BACKGROUND CLARITY LOCK: prioritize focal faces, hands, key props, action silhouettes and lettering. Explicitly scripted abstract beats may omit scenery, never story evidence or contacts. In physical-setting shots simplify nonessential textures and reduce background contrast while retaining recognizable environmental shapes, perspective/depth and every story-required object or clue. Reduce line density in distant planes; preserve white light planes and bounded tone regions. Equal-depth objects share focus. Keep setting light/dark masses; no background-wide screen veil.';
export const MONOCHROME_BACKGROUND_LOCK_COMPACT = 'MONOCHROME BACKGROUND CLARITY LOCK: omit optional textures; keep setting/depth/story evidence/white planes.';

// Adapt only our authored quality text, never replace words in user dialogue,
// Actions, cast descriptions or other source data.
export const MONOCHROME_FOCAL_READABILITY = 'FOCAL READABILITY: Focal ink follows the panel recipe; NORMAL=pressure-taper. Camera scale/height/side/head turn fixed; visible features only. Rear acting=head/shoulders/weight; scripted profiles win. Bold focal silhouettes/contacts, fine separate face/hand lines; no uniform thickening/clogging. Sharp story reactions/props/text. Support/BG thin/quiet; white/black planes, motivated edge light, face/hand gaps. If merged: fewer BG lines or bounded black behind light forms; stronger style ink. Keep setting/depth/light/identity/tones and gaze/diagonal/negative-space flow; no glow over ink.';
export const MONOCHROME_SKIN_LIGHTING = 'BODY VOLUME: wrap connected form shadows around turning limbs/torso; retain hair/jaw/clothing cast shadows. Follow light direction; no fixed shadow quota. Shade=bounded screen/black, lit=canonical base; no wash. FACE INK: tapered eyes/nose/mouth, distinct white gaps; no feature merging or disappearing hairlines. Bold silhouettes, fine facial lines; shadows preserve expression.';
export const MONOCHROME_IMAGE_QUALITY_CONTRACT = SHARED_IMAGE_QUALITY_CONTRACT
  .replace(FOCAL_READABILITY, MONOCHROME_FOCAL_READABILITY)
  .replace('the strongest G-pen-like contour: visibly heavier pressure-tapered strokes', 'the strongest contour within its panel recipe: clear style-specific strokes')
  .replace(`- ${FOCAL_SUBJECT_SEPARATION_FALLBACK}\n`, '')
  .replace(SKIN_LIGHTING, MONOCHROME_SKIN_LIGHTING)
  .replace(/- Render a rich physical setting[^\n]*/, '- Physical shots retain recognizable setting anchors and depth; scripted abstract beats may omit scenery, never story evidence. Simplify nonessential detail; keep focal actions and required reactions readable.')
  .replace(/- Keep lighting and color coherent[^\n]*/, '- Keep light direction coherent through bounded ink shadows and white light planes; simplify distant line density while keeping environmental shapes and focal subjects readable.')
  .replace(/- Keep surfaces clean:[^\n]*/, '- Keep surfaces clean: intentional regular black-on-white screentone and hatching are allowed, never random noise, moire or floating dust. Keep lit light skin, bubbles and gutters pure white. Scripted abstract beats may omit scenery, never story evidence.');

// Medium-specific interpretations retain the selected expressive register;
// colored recipes are not included and then contradicted by a later warning.
export const MONOCHROME_EMOTION_STYLES = Object.freeze({
  CHIBI_GAG: 'Super-deformed chibi anatomy: normally 2-3 heads tall, unless explicit proportions override. Enlarge the skull; compress torso and jointed limbs, not merely eyes. Preserve Camera/Action, body acting, individual gaze/reactions, hair/glasses. Project this redesigned body into the same shot, not a zoom or lineup. Black accents on white.',
  GEKIGA: 'Fully redraw GEKIGA faces with carved facial planes: smaller anatomically proportioned eyes, constructed nose bridge, angular brow/cheek/jaw, brush contours, solid ink shadows and directional crosshatching on turning planes. Replace round anime facial construction, not just its shading. Keep identity/age, scripted eyelids/mouth/gaze, Camera/Action/body acting and skin bases.',
  SHOUJO: 'Romantic delicate black penwork, outlined flowers and airy white highlights; sparse regular screen dots behind the cast and star-shaped eye highlights. Keep faces, glasses and dialogue readable.',
  HORROR: 'Tense horror-manga penwork, jagged contours and strong black shadow masses with sparse hatching; preserve the existing cast, readable faces and scripted comedic exaggeration.',
  BLANK: 'Frozen deadpan expression, blank white eyes and stiff posture; clean sparse ink contours and canonical facial bases. Preserve glasses around the blank eyes.',
  IMPACT: 'Explosive impact composition with bold ink contours, radial black speed lines and white burst shapes. Keep every scripted participant visible; never replace a multi-character scene with one giant face or crack panel borders.',
  WATERCOLOR: 'Painterly softness through sparse broken ink contours and open white paper. Screen only inside assigned material/shadow masks; never wash or dots over lit light skin.',
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

export const MONOCHROME_QA_RULE = 'MONOCHROME REVIEW: the approved manuscript uses white paper, black ink and purpose-assigned Japanese screentone. Canonical dark skin, assigned materials and light-driven bounded shadows may occupy broad areas. Screen coverage alone is not a defect. A page-wide base tint or unsupported atmosphere veil over reserved white planes is a monochrome_rendering defect. Judge semantic regions, not an exact pixel-value count; natural edge antialiasing is allowed. It is not desaturated painted art; hatching is ink linework. Do not restore reference colors or reject intentional tone mapping as character_reference. Compare identity by hairstyle, glasses, design and stable tone assignments; facial construction follows the panel style unless reference-style locked. Hair that is black or among the darkest in the reference uses substantial solid black with only narrow white highlight/shine cutouts; a grey or screened dark-hair base is a monochrome_rendering defect. Light skin uses white base. Check form and cast shadows on visible anatomy: erased light-driven planes that flatten volume into flat bodies need review. Diffuse light or intentional flat stylization alone is not a defect; ambiguous shade is unverified. Do not reject light-driven screen or solid-black shadows for having area; judge their boundary and direction, not a tiny-shadow quota. Report merged eyes/nose/mouth or lost facial strokes when they obscure expression; preserve intentional stylization and use unverified for resizing ambiguity. Compare lit light-skin interiors with nearby white balloon interiors, away from ink edges: a broad light-grey base is a defect even without visible dots. Do not confuse bounded cast shadows or canonical dark-skin bases with this defect; uncertain edge/resizing shades are unverified. Canonically dark/tanned skin retains its uniform screen base in light, with black/hatching for shadow. Small light-driven highlights and reference-specific palm/sole differences are allowed when the base identity remains clear. Report broad white islands, conspicuous patchiness, face/body mismatch or cross-panel base changes that alter the assigned skin tone. Do not regenerate for a tiny highlight or ambiguous screen marks; use unverified when necessary. Report monochrome_rendering for visible color, flat grey washes/gradients, variable-density or stacked screens, screened/grey lit light skin, repeated default cheek tone without explicit blush/flush/red-cheek Action or canonical makeup, light walls, ceilings or light fabric, and a background-wide screen veil. Separate bounded shadows, the allowed small localized cheek exception, and assigned material midtones from reserved white light planes. Glow and depth never justify a screen veil or warm/cool tint. This is visual review, not a file bit-depth verification; use unverified for ambiguous marks.';
