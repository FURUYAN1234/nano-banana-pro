import { VERTICAL_DIALOGUE_GEOMETRY } from '../../src/lib/bubble-text.js';
import { readFileSync } from 'node:fs';

// Exact inverse mappings from the reviewed pre-change commit. Never strip a
// unknown recipe or prompt line: an unlisted change must fail.
const selectionContracts = JSON.parse(readFileSync(new URL('../fixtures/selection-shared-contract-normalization.json', import.meta.url), 'utf8'));

// Reviewed 2026-10-16 additions, frozen independently of the production helper.
// Remove only these complete compiler lines, never a prefix or an unknown edit.
const reviewedActorMediumLines = new Set([
  'ACTOR MEDIUM GEKIGA: 顔は眉骨/眼窩→張り出す鼻→頬骨/顎の面から構築。個人の識別点を保ち、参照の目の大きさをこの骨格へ翻訳。dense fine multi-directional facial kakeami with visible line gaps が各面に沿う。穏やかな笑顔も同じ立体描法。加齢/怒りを足さない。 全可視人物に適用。Camera/Action・表情・切取りを保持、隠れた顔の露出や寄りへの変更禁止。',
  'ACTOR MEDIUM WATERCOLOR: 顔の頬/鼻・髪の束・服の量感を透明顔料の重なりで構築。肌と髪にも紙白、途切れた縁の色溜まり、目/口は少数の色線。セル塗り顔への質感上乗せにしない。 全可視人物に適用。Camera/Action・表情・切取りを保持、隠れた顔の露出や寄りへの変更禁止。',
  'ACTOR MEDIUM POP_ART: 顔の頬/鼻・髪・服を太い墨輪郭と不透明な印刷色面で構築。顔の影も間隔の明瞭なBen-Day網点で造形。目口の判読を保ち、人物の滑らかなセル陰影を印刷面へ置換。背景だけの網点では不可。 全可視人物に適用。Camera/Action・表情・切取りを保持、隠れた顔の露出や寄りへの変更禁止。',
  'ACTOR MEDIUM GEKIGA: 全人物の顔を劇画骨格で描く。',
  'ACTOR MEDIUM WATERCOLOR: 顔の頬/鼻・髪の束・服を疎な途切れ墨線と限定した網点の形で構築。白紙・指定肌ベース・判読できる目口を保持。灰色の紙下地や一様なセル顔を継承しない。',
  'ACTOR MEDIUM POP_ART: 顔の頬/鼻・髪・服を太い墨輪郭と白黒の印刷面で構築。指定肌ベースを守り、顔の影も間隔の明瞭なBen-Day網点。目口を明瞭に保ち、背景だけの網点では不可。',
]);
// Invert only the reviewed local construction + immediately following compiler
// roster. A different style, instruction, name or authored field remains visible.
export const restoreReviewedActorBindings = value => {
  const oldSuffix = ' 全可視人物に適用。Camera/Action・表情・切取りを保持、隠れた顔の露出や寄りへの変更禁止。';
  const colorLines = [...reviewedActorMediumLines].filter(line => line.endsWith(oldSuffix));
  let style = '', reviewed = false;
  return String(value).split('\n').map((line, index, lines) => {
    if (/^(?:## Panel \d+|\[PAGE FRAME P\d+ \|)/.test(line)) { style = ''; reviewed = false; }
    const scope = line.match(/^(?:PANEL STYLE LOCK: |FRAME MEDIUM P\d+ — )(POP_ART|WATERCOLOR|GEKIGA)(?:;|:)/);
    if (scope) { style = scope[1]; reviewed = false; }
    const oldLine = colorLines.find(candidate => candidate.startsWith(`ACTOR MEDIUM ${style}: `));
    if (oldLine && line === oldLine.replace(`ACTOR MEDIUM ${style}:`, 'ACTOR MEDIUM:').slice(0, -oldSuffix.length)) {
      reviewed = true;
      return oldLine;
    }
    if (reviewed && /^(?:CAST LIMIT: required cast |CRITICAL CAST PLACEMENT: Include )/.test(lines[index - 1] || '')) {
      const roster = `\\[[^\\]\\n]+\\]=${style}(?:, \\[[^\\]\\n]+\\]=${style})*`;
      const compact = new RegExp(`^CAST COUNT: ${roster} each EXACTLY ONCE(?:; no named-character duplicates)?\\.$`);
      const full = new RegExp(`^ANTI-CLONE REMINDER: ${roster} — each appears EXACTLY ONCE\\. If a character is mentioned in both the placement rule AND the visual action, they are the SAME person — do NOT draw a second copy\\.$`);
      if (compact.test(line) || full.test(line)) return line.replaceAll(`]=${style}`, ']');
    }
    return line;
  }).join('\n');
};

export const restoreReviewedActorMedium = value => restoreReviewedActorBindings(value).split('\n')
  .filter(line => !reviewedActorMediumLines.has(line)).join('\n');

// Existing compaction can omit this global-rule reminder. These two exact
// normalized recipes are the only newly reached variants; old hashes stay fixed.
const reviewedCompactMonoRecipes = new Set([
  'MONOCHROME PANEL STYLE LOCK: CHIBI_GAG; Super-deformed chibi anatomy: normally 2-3 heads tall, unless explicit proportions override. Enlarge the skull; compress torso and jointed limbs, not merely eyes. Preserve Camera/Action, body acting, individual gaze/reactions, hair/glasses. Project this redesigned body into the same shot, not a zoom or lineup. Black accents on white.',
  'MONOCHROME PANEL STYLE LOCK: WATERCOLOR; Painterly softness through sparse broken ink contours and open white paper. Screen only inside assigned material/shadow masks; never wash or dots over lit light skin.',
]);
export const restoreReviewedMonoStyleReminder = value => String(value).split('\n')
  .map(line => reviewedCompactMonoRecipes.has(line)
    ? `${line} Preserve script/Camera/Action, cast, glasses and wardrobe tone assignments.` : line).join('\n');

export const restoreReviewedShotExecution = value => {
  let result = String(value);
  // Invert only reviewed generated clauses and their exact panel scope.
  // Unknown shared rules and authored text must still fail the old style hashes.
  const order = '人物/注視先を配置→指定の体/首/顔向き・首傾げ・表情保持、可視の瞳を指定先へ（対象未指定/閉眼/明示の読者目線は保持）→独立Cameraで立体投影→画風';
  const conditionalOrder = '人物/注視先を配置→指定の体/首/顔向き・首傾げ・表情保持、注視先明示かつ顔向き未指定なら対象に応じた自然な頭向きを補う（明示の横目/目だけの移動/顔上げ/背面を優先、顔/対象の遮蔽保持）、可視瞳を指定先へ（対象未指定/閉眼/明示の読者目線保持）→独立Cameraで立体投影→画風';
  const naturalRear = '後方は基準対象に対して保持。人物の指定向きを保持し、見える正面/側面/背面はCamera/Actionの位置関係から投影。場所/道具の向きで全員を回さない。距離/切取り保持、肩越し接写を強制しない';
  const previousRear = '後方は基準対象に対して保持。背面指定の人物だけ背面を描く。場所/道具の向きで全員を回さない。距離/切取り保持、肩越し接写を強制しない';
  // Exact inverse at compiler-owned shot boundaries only. An altered exception,
  // unknown clause, or the same words inside authored Action must stay visible.
  result = result.replace(/^(## Panel \d+\nCamera:[^\n]*\n)(SHOT EXECUTION: [^\n]*)$/gm,
    (_line, prefix, shot) => prefix + shot
      .replace(`SHOT EXECUTION: ${conditionalOrder}; `, `SHOT EXECUTION: ${order}; `)
      .replace(`rear view: ${naturalRear}`, `rear view: ${previousRear}`)
      .replace('ロール: 場面の鉛直/水平を光軸回りに投影。机の遠近線だけで代用せず透視収束保持。指定角を弱めず強めない',
        'tilt scene axes, not only faces')
      .replace('指定角を弱めず強めない', 'pitch strength follows script, never force steep overhead'));
  const high = 'look down from the scripted higher viewpoint, not eye-level: head/shoulder tops, shortened torsos, upper prop faces, floor/table planes as visible';
  const shared = [];
  result = result.replace(/^SHOT (P\d+(?:\/P\d+)*) ONLY: (.+)\.\n/gm, (line, panels, cue) => {
    if (cue === conditionalOrder) cue = order;
    if (![order, high].includes(cue)) return line;
    shared.push({panels:panels.split('/'),cue});return '';
  });
  result = result.replace(/^(## Panel (\d+)\nCamera:[^\n]*\n)(SHOT EXECUTION: [^\n]*)$/gm, (_line, prefix, number, shot) => {
    const rules=shared.filter(rule=>rule.panels.includes(`P${number}`));
    if(rules.some(rule=>rule.cue===high)) shot=shot.replace('actors and setting share downward projection',`${high}; actors and setting share downward projection`);
    if(rules.some(rule=>rule.cue===order)) shot=shot.replace('SHOT EXECUTION: ',`SHOT EXECUTION: ${order}; `);
    return prefix+shot;
  });
  return result;
};

// Invert only the two reviewed CHIBI drawing recipes at their compiler-owned
// style boundary. Unknown additions and authored Camera/Action remain visible.
const reviewedChibiColor = '色は不透明な塗りで鮮明に置き、淡い水彩下地を継承しない。明示された淡色指定は優先。';
const reviewedChibiRecipes = new Map([
  [`Style: THIS PANEL ONLY: 大きな頭・短い胴・関節ある手足へ再構成した表情豊かなちび。通常体の目だけを拡大しない。Camera/Action・身体演技・視線・表情・髪/眼鏡を保ち、誇張と透視を両立。通常頭身への戻しや可愛さ目的のズーム禁止。適用Outfit優先、未指定は継続/参照服。服種/色/重ね着はちび化で変えず、明示の着替えは反映。服の描法・しわは画風と動作に従う。 ${reviewedChibiColor}`,
    `Style: In THIS PANEL ONLY, redraw the actors as expressive chibi: enlarged heads above shortened torsos and jointed limbs, not just bigger eyes on normal bodies. Preserve Camera/Action, body acting, gaze, facial reactions, hair and glasses. Adapt deformation to keep acting and perspective readable; never replace chibi with unchanged anime or zoom for cuteness. ${reviewedChibiColor}`],
  [`Style: 大頭・短い胴・関節ある手足の表情豊かなちびへ再構成。通常アニメのまま不可。Camera/Action・演技/視線/髪/眼鏡と透視を保持、可愛さ目的のズーム禁止。適用Outfit優先、未指定は継続/参照服。服種/色/重ね着をちび化で変えず明示着替えは反映。服の描法/しわは画風/動作に従う。 ${reviewedChibiColor}`,
    `Style: Redraw enlarged heads, shortened torsos and jointed limbs as expressive chibi, not unchanged anime. Keep Camera/Action, acting/gaze/hair/glasses; readable perspective, no zoom for cuteness. ${reviewedChibiColor}`],
]);
export const restoreReviewedChibiWardrobe = value => String(value).replace(
  /^(PANEL STYLE LOCK: CHIBI_GAG;[^\n]*\n)(Style: [^\n]*)$/gm,
  (line, prefix, recipe) => reviewedChibiRecipes.has(recipe) ? prefix + reviewedChibiRecipes.get(recipe) : line);

// Invert only the reviewed fold lines inside an identified compiler output.
// Author text, unknown suffixes and unsupported wording remain byte-visible.
export const restoreReviewedFoldRendering = value => {
  const text = String(value);
  const reference = /^REFERENCE-SHEET STYLE QA LOCK:$/m.test(text);
  const gemini = /^GEMINI STABILITY \/ QUALITY LOCK:$/m.test(text);
  const fixed = 'Keep reference fold/shadow treatment; no new method.';
  const color = 'FOLD PRIORITY: 2-4 triangular overlap/pinch shadows in panel medium; hard cel edges NORMAL/unmarked only; no geometric patterns.';
  const legacyQuality = '- Add clothing-fold shadows only where fabric overlaps, pinches, or intersects: use clean, localized cel-shaded shadow planes, never random geometric patterns or texture noise.';
  const legacyAssist = 'for full-color clothing only, render overlapping, pinched, and intersecting fabric folds with a few crisp wedge-shaped triangular cel-shaded shadow planes. Make a distinct small dark triangular fill at each selected crease junction, not merely a soft fold gradient. Use them as form shadows, not printed patterns or random geometric marks; preserve the outfit, material, and scene lighting.';
  const legacyPriority = 'When a panel shows folded clothing, render 2-4 distinct small dark triangular shadow fills at visible crease junctions. Use hard cel-shaded edges, especially on light shirts, blouses, jackets, and sleeves. These are localized form shadows only: never scatter triangles across smooth fabric or turn them into a print/pattern.';
  const mappings = gemini ? new Map(reference ? [
    [`- ${fixed}`, legacyQuality],
    [`- CLOTHING FOLD SHADOW ASSIST: ${fixed}`, "- CLOTHING FOLD SHADOW ASSIST: follow the character sheet's existing fold-line and shadow treatment; do not impose a different cel-shading, ink or painting method."],
    [`PANEL-BY-PANEL CLOTHING FOLD PRIORITY: ${fixed}`, "PANEL-BY-PANEL CLOTHING FOLD PRIORITY: Follow the character sheet's existing fold-line and shadow treatment in every panel; do not introduce a new rendering method."],
  ] : [
    [`- ${color}`, legacyQuality],
    ['- CLOTHING FOLD SHADOW ASSIST: Follow panel medium and FOLD PRIORITY below.', `- CLOTHING FOLD SHADOW ASSIST: ${legacyAssist}`],
    [`PANEL-BY-PANEL CLOTHING FOLD PRIORITY: ${color}`, `PANEL-BY-PANEL CLOTHING FOLD PRIORITY: ${legacyPriority}`],
  ]) : new Map(reference ? [
    [`- FOLD SHADOWS: ${fixed}`, '- FOLD SHADOWS: crisp triangular overlap shadows; no geometric patterns.'],
    [`FOLD PRIORITY: ${fixed}`, /^CHARACTER QA: (?:identity\/wardrobe\/ink\/tone|preserve identity\/wardrobe)\.$/m.test(text)
      ? 'FOLD PRIORITY: 2-4 dark triangular crease shadows at overlap/pinch only.' : 'FOLD PRIORITY: 2-4 dark triangular crease shadows.'],
  ] : []);
  return text.split('\n').map(line => mappings.get(line) ?? line).join('\n');
};

export const restorePreSelectionContracts = (value, context = {}) => {
  let result = restoreReviewedFoldRendering(restoreReviewedChibiWardrobe(restoreReviewedShotExecution(restoreReviewedActorMedium(value))));
  const compact = result.includes('TYPE: title ');
  for (const contract of selectionContracts.entries) {
    if (contract.providerFamily && contract.providerFamily !== context.providerFamily) continue;
    if (contract.colorMode && contract.colorMode !== context.colorMode) continue;
    result = result.replaceAll(contract.current, compact ? contract.compactPrevious ?? contract.previous : contract.previous);
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
  // Exact inverse of the separately tested rear-anchor correction. Preserve the
  // media-isolation baseline; unknown cue or authored-content changes still fail.
  .replaceAll('rear view: 後方は基準対象に対して保持。背面指定の人物だけ背面を描く。場所/道具の向きで全員を回さない。距離/切取り保持、肩越し接写を強制しない', 'show back planes of the scripted subject; preserve crop/distance, no forced close OTS')
  .replaceAll('PROMPT PRIORITY: cast/count/identity/glasses/wardrobe, exact script/Camera/panel medium/layout. 人数のため顔出し/横並び/画風・投影変更不可。', 'PROMPT PRIORITY: protect cast/count/identity/glasses, wardrobe, exact script, Camera geometry, layout/style/medium.')
  .replaceAll(VERTICAL_DIALOGUE_GEOMETRY, 'Upright glyphs top-to-bottom; columns right-to-left. No horizontal/rotated rows, including single-balloon shouts.')
  .replaceAll('- Prefer vertical Japanese tategaki in regular manga Mincho: slender black strokes on white, clear counters and readable spacing.', '- Render every Japanese dialogue bubble in vertical Japanese tategaki using regular-weight Japanese manga Mincho-style type: slender, even strokes, clear counters, tight but readable vertical spacing, and black text on a white bubble.')
  .replaceAll('- Only Dialogue becomes white bubbles: prefer_vertical Japanese tategaki, verbatim character-by-character; horizontal is allowed for composition/readability; no paraphrase, synonyms, softening, added/omitted words.', '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim character-by-character; no paraphrase, synonyms, softening, added/omitted words, or horizontal text.')
  .replaceAll('- Only Dialogue becomes white bubbles: verbatim・言換/軟化/追加/省略禁止。TYPE準拠。', '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim; no paraphrase/synonyms/softening/addition/omission/horizontal text.')
  .replaceAll('CAST INSTANCE LOCK: 各人物は背景も実体1人。紙/画面の像で代替不可。\n', '')
  .replaceAll('below all faces (crouched/chibi too); look up: chin/jaw/prop undersides, forehead recedes, low horizon, upward convergence. Face/body/setting share projection, no frontal face on tilted BG; keep scripted height/pitch/proportions', 'low camera below faces including crouched/chibi; look up: chin/jaw undersides, prop undersides from below; forehead recedes, horizon below faces, upward convergence; facial planes, body and setting share projection, not frontal faces on a tilted background; preserve scripted height/pitch/proportions')
  .replaceAll('CAST INSTANCE LOCK: allocate each named actor one physical body silhouette at scripted depth, including background actors. Every Camera/Action/dialogue/reaction mention updates that same physical body; never clone, omit a required actor, or substitute a depicted replica. Preserve scripted crops, hidden faces and expressive depth.', 'CAST INSTANCE LOCK: allocate each named actor one body silhouette (a full-size physical actor), in one depth position, one time in this panel. Every Camera/Action/dialogue/reaction mention updates that same physical body; never create another full-size body from a repeated mention, even across foreground/background or panel-edge occlusion.');
