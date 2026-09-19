import { SHARED_IMAGE_QUALITY_CONTRACT, WARDROBE_ENVIRONMENT_CONTRAST_LOCK_COMPACT } from './shared-image-quality';
import { buildSingleImageCinematicRouter } from './cinematic-techniques';

const LEGACY_SINGLE_IMAGE_CAMERA_SLOT = `- Choose a camera angle and lens that serve the requested emotion: intimate close-ups for vulnerability, low angles for power, wide shots for loneliness, diagonals for action, and stable framing for tender or observational scenes.
- Never default to a flat, eye-level, center-framed shot. Keep any explicit user camera direction over automatic staging.`;

export const buildSingleImageEmotionalPrompt = () => `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE expressive anime illustration with cinematic staging.

Express emotion through acting, camera and light while preserving the user's content.

[ 1. EMOTIONAL ACTING & EXPRESSION ]
- Give visible faces specific expressions with matching body language; avoid mannequin poses.
- Use the Facial Action Coding System: combine brow, eyelid, mouth and cheek cues. Use gaze, posture, gesture and weight distribution from subtle restraint to full-body exaggeration.

[ 2. CINEMATIC CAMERA ]
${buildSingleImageCinematicRouter(LEGACY_SINGLE_IMAGE_CAMERA_SLOT.length)}

[ 3. LIGHTING & COLOR ]
- Use motivated key/fill/rim or practical light and warm/cool contrast suited to the emotion; avoid flat uniform lighting.

[ 4. ENVIRONMENTAL STORYTELLING ]
- Let weather, architecture and props support the requested setting and action; never add decorative glitter, dust or lens-flare artifacts.

[ 5. ART STYLE & OUTPUT ]
- Render high-budget Japanese TV-anime quality: clean cel shading, controlled color depth and sharp ink contours; no photorealistic skin or film texture.
- Use a line-weight hierarchy: the focused cast has stronger clean ink contours while setting elements remain lighter and softer. No character-sheet layout, expression grid, or reference-sheet appearance.
- Keep hands anatomical. Named right/left hands connect to the matching shoulder on the character, never viewer-left/right; do not mirror, reverse or add hands.
- If bubbles are requested, use vertical Japanese only. Other requested printed text follows its physical surface and specified writing direction. Add no random text; mood/SFX names stay visual directions unless explicitly printable.
- Review anatomy, visible text and identity before returning the image.

${SHARED_IMAGE_QUALITY_CONTRACT}
- ${WARDROBE_ENVIRONMENT_CONTRAST_LOCK_COMPACT}`;
