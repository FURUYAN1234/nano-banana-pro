const SOURCE_LOCK = `Use the attached four-panel manga page as the only visual source.
Preserve every named character, face, hair, glasses, skin tone, costume, prop, setting, story beat, dialogue, speech-bubble speaker, title, panel order, and existing watermark exactly as shown.
Do not add, remove, merge, duplicate, rename, crop away, or replace any character or story element.`;

export const GEMINI_A4_RELAYOUT_PROMPT = `${SOURCE_LOCK}

Rebuild the whole page as exactly four equal horizontal manga panels stacked vertically in a clean 3:4 portrait canvas. Keep uniform white gutters and no extra outer margins. Do not make the page extremely tall, square, landscape, or a single illustration. This is a layout correction, not a new story or redesign.

Before returning the image, verify that all four panels are present, equal in size, fully visible, and retain the original Japanese dialogue and speaker-to-bubble assignment.`;

export const GEMINI_2K_REFINEMENT_PROMPT = `${SOURCE_LOCK}

Create a high-resolution 2K refinement of this exact page. Preserve its composition and pixels' visual meaning: do not reinterpret, crop, extend, relayout, translate, replace text, alter colors, or invent detail that changes the story. Improve only clean line edges, legibility, and fine texture while keeping all panel borders, Japanese text, titles, and watermarks intact.`;
