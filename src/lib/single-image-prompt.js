import { SHARED_IMAGE_QUALITY_CONTRACT } from './shared-image-quality';
import { buildSingleImageCinematicRouter } from './cinematic-techniques';

const LEGACY_SINGLE_IMAGE_CAMERA_SLOT = `- Choose a camera angle and lens that serve the requested emotion: intimate close-ups for vulnerability, low angles for power, wide shots for loneliness, diagonals for action, and stable framing for tender or observational scenes.
- Never default to a flat, eye-level, center-framed shot. Keep any explicit user camera direction over automatic staging.`;

export const buildSingleImageEmotionalPrompt = () => `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE expressive anime illustration with cinematic staging.

Express the requested emotion through acting, camera and light. If unspecified, use warmth and narrative depth while preserving the user's content.

[ 1. EMOTIONAL ACTING & EXPRESSION ]
- Give visible faces specific expressions with matching body language; avoid mannequin poses and stiff T-poses.
- Use the Facial Action Coding System: combine specific brow, eyelid, mouth, and cheek cues instead of a generic face. Make the eyes the emotional anchor with clear iris depth and natural catchlights. Use posture, gesture, weight distribution, and expressions ranging from subtle to exaggerated full-body acting to show the story.

[ 2. CINEMATIC CAMERA ]
${buildSingleImageCinematicRouter(LEGACY_SINGLE_IMAGE_CAMERA_SLOT.length)}

[ 3. LIGHTING & COLOR ]
- Use emotional, motivated lighting: warm key and soft fill for joy, cool shadows with one warm practical accent for melancholy, controlled directional contrast for tension, and diffused backlight for tenderness.
- Use warm/cool color-temperature contrast when it supports the scene; avoid flat uniform lighting.

[ 4. ENVIRONMENTAL STORYTELLING ]
- Let weather, wind, practical effects, architecture, and props support the emotion and the action. Use environmental phenomena only when they belong to the requested setting; never add decorative glitter, dust, or lens-flare artifacts.

[ 5. ART STYLE & OUTPUT ]
- Render high-budget Japanese TV-anime illustration quality: clean cel shading, rich but controlled color depth, sharp ink contours, smooth gradients, and no photorealistic skin, cloth, or film texture.
- Use a line-weight hierarchy: the focused cast has stronger clean ink contours while setting elements remain lighter and softer. No character-sheet layout, expression grid, or reference-sheet appearance.
- Keep every visible hand anatomically correct. When a gesture names a right or left hand, connect it to the matching shoulder from the character's own body, never viewer-left/viewer-right. Do not mirror, reverse, or add hands.
- If Japanese speech bubbles are requested, use vertical Japanese only. Other requested printed text follows its physical surface and specified writing direction. Never add random text, floating letters, labels, or sound effects. Treat mood words and SFX names as visual direction unless visible text is explicitly requested.
- Before returning the image, review hand anatomy, finger count, visible text, and character identity.

${SHARED_IMAGE_QUALITY_CONTRACT}`;
