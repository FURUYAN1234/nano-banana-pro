import { VERTICAL_DIALOGUE_GEOMETRY } from '../../src/lib/bubble-text.js';
import { readFileSync } from 'node:fs';

// Exact inverse mappings from the reviewed pre-change commit. Never strip a
// style recipe or normalize an unknown line: an unlisted change must fail.
const selectionContracts = JSON.parse(readFileSync(new URL('../fixtures/selection-shared-contract-normalization.json', import.meta.url), 'utf8'));
export const restorePreSelectionContracts = value => {
  let result = String(value);
  const compact = result.includes('TYPE: title ');
  for (const contract of selectionContracts.entries) {
    result = result.replaceAll(contract.current, compact && contract.compactPrevious || contract.previous);
  }
  result = result
    .replaceAll('look down from the scripted higher viewpoint, not eye-level: head/shoulder tops, shortened torsos, upper prop faces, floor/table planes as visible', 'look down from physically above heads, not eye-level: head/shoulder tops, short torsos, upper prop faces, floor/table planes')
    .replaceAll('; pitch strength follows script, never force steep overhead', '')
    .replaceAll('natural occlusion allowed; keep Camera/cast, never expose hidden limbs', 'hips/knees/feet unobscured')
    .replaceAll('Story-critical reactions/required props/lettering stay sharp; other props follow depth.', 'Story-critical reactions/visible props/lettering stay sharp.')
    .replace(/^CAST LIMIT: required cast ([^\n]+?)(?:; focus follows Camera\/Action)?\.$/gm, 'CAST LIMIT: focus $1.')
    .replace(/^CRITICAL CAST PLACEMENT: Include ([^\n]+?); optical focus follows Camera\/Action, not cast count\.$/gm, 'CRITICAL CAST PLACEMENT: Ensure $1 are the main focus.')
    .replaceAll('IDENTITY CONTINUITY: same hair/wardrobe/glasses/identity anchors; expressions and panel drawing styles may vary.', 'IDENTITY CONTINUITY: keep each character recognizable through hairstyle, wardrobe, glasses and other identity anchors; facial expression and drawing style may vary with the scene without creating a new person.');
  if (compact && !result.includes('BODY ACTING BASELINE:')) {
    result = result.replace(/^EXPRESSIVE DIRECTION:/m, 'BODY ACTING BASELINE: allow pointing/reaching/impact/full-body exaggeration; vary silhouette; action phase/support/contact.\nEXPRESSIVE DIRECTION:');
  }
  if (compact && !result.includes('KEY PROP / OBJECT CONSISTENCY:')) {
    result = result.replace(/^- Only Dialogue becomes white bubbles:/m, 'KEY PROP / OBJECT CONSISTENCY:\n- Props: preserve identity; scripted state/holder changes only.\n- Only Dialogue becomes white bubbles:');
  }
  return result;
};

// These older snapshots freeze art-style isolation. The user has since changed
// the shared writing policy and required physical-cast allocation. Normalize ONLY
// those accepted shared contracts; all other prompt bytes remain frozen.
export const restorePrePolicyContracts = value => String(value)
  .replaceAll('PROMPT PRIORITY: cast/count/identity/glasses/wardrobe, exact script/Camera/panel medium/layout. 人数のため顔出し/横並び/画風・投影変更不可。', 'PROMPT PRIORITY: protect cast/count/identity/glasses, wardrobe, exact script, Camera geometry, layout/style/medium.')
  .replaceAll(VERTICAL_DIALOGUE_GEOMETRY, 'Upright glyphs top-to-bottom; columns right-to-left. No horizontal/rotated rows, including single-balloon shouts.')
  .replaceAll('- Prefer vertical Japanese tategaki in regular manga Mincho: slender black strokes on white, clear counters and readable spacing.', '- Render every Japanese dialogue bubble in vertical Japanese tategaki using regular-weight Japanese manga Mincho-style type: slender, even strokes, clear counters, tight but readable vertical spacing, and black text on a white bubble.')
  .replaceAll('- Only Dialogue becomes white bubbles: prefer_vertical Japanese tategaki, verbatim character-by-character; horizontal is allowed for composition/readability; no paraphrase, synonyms, softening, added/omitted words.', '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim character-by-character; no paraphrase, synonyms, softening, added/omitted words, or horizontal text.')
  .replaceAll('- Only Dialogue becomes white bubbles: verbatim・言換/軟化/追加/省略禁止。TYPE準拠。', '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim; no paraphrase/synonyms/softening/addition/omission/horizontal text.')
  .replaceAll('CAST INSTANCE LOCK: 各人物は背景も実体1人。紙/画面の像で代替不可。\n', '')
  .replaceAll('below all faces (crouched/chibi too); look up: chin/jaw/prop undersides, forehead recedes, low horizon, upward convergence. Face/body/setting share projection, no frontal face on tilted BG; keep scripted height/pitch/proportions', 'low camera below faces including crouched/chibi; look up: chin/jaw undersides, prop undersides from below; forehead recedes, horizon below faces, upward convergence; facial planes, body and setting share projection, not frontal faces on a tilted background; preserve scripted height/pitch/proportions')
  .replaceAll('CAST INSTANCE LOCK: allocate each named actor one physical body silhouette at scripted depth, including background actors. Every Camera/Action/dialogue/reaction mention updates that same physical body; never clone, omit a required actor, or substitute a depicted replica. Preserve scripted crops, hidden faces and expressive depth.', 'CAST INSTANCE LOCK: allocate each named actor one body silhouette (a full-size physical actor), in one depth position, one time in this panel. Every Camera/Action/dialogue/reaction mention updates that same physical body; never create another full-size body from a repeated mention, even across foreground/background or panel-edge occlusion.');
