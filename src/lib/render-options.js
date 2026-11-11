export const COPYRIGHT_MOSAIC_INSTRUCTION = '版権キャラクターにおおきなモザイクをかける';

// 参照資料の役割と、台本で実際に描く遮蔽対象を同一視しない。
export const COPYRIGHT_MOSAIC_TARGET_SCOPE = 'MOSAIC TARGET SCOPE: No targets => NO MOSAIC. Sheets/names/style/likeness never prove copyright. Only existing-work depictions in Action/prints; no name-only mentions, originals or text. Explicit cast subject/region masks only.';

export const buildProtectedCastContract = (names = []) => names.length ? [
  `MOSAIC PROTECTED CAST: ${JSON.stringify([...new Set(names)])}`,
  'Never automatically mosaic these registered characters.',
].join('\n') : '';

export const readProtectedCast = (prompt = '') => {
  const line = String(prompt).match(/^MOSAIC PROTECTED CAST: (.+)$/m)?.[1];
  if (!line) return [];
  try {
    const names = JSON.parse(line);
    return Array.isArray(names) && names.every(name => typeof name === 'string' && name.trim()) ? names : [];
  } catch { return []; }
};

export const buildCopyrightMosaicInstruction = (enabled = true) => enabled
  ? `${COPYRIGHT_MOSAIC_TARGET_SCOPE}\n対象限定で${COPYRIGHT_MOSAIC_INSTRUCTION}。特大モザイク（顔幅4〜6個の不透明正方形）で全身・印刷人物の目・口・顔の細部を判読できなくする。ドット絵化ではなく遮蔽。名前/役割/行動保持。指示非印字。`
  : '';

export const NO_PAGE_TITLE = 'NO PAGE TITLE: Do not print a page title, heading, title box or title band. Reclaim the entire former title area for the story panels, starting below the small outer safety margin. Keep the A4 portrait canvas, all four outer frame sides/corners, white outer margins and internal gutters. Preserve verbatim dialogue and scripted in-scene lettering, even when they mention the title. The scenario title remains metadata only.';

const MANGA_BACKGROUND_SIMPLIFICATION = [
  '[MANGA BACKGROUND SIMPLIFICATION]',
  'FINAL BACKGROUND MODE: TWO DIFFERENT DETAIL DENSITIES IN ONE FINISHED IMAGE. Draw this final result directly in one generation. Complete every character using the full original FRAME MEDIUM / ACTOR MEDIUM recipe assigned to that frame. Only the environment follows each frame’s SPATIAL or ABSTRACT background direction below. Background instructions override scenic density, not character style or construction.',
  'CHARACTERS: preserve the exact scripted cast count, one body per named actor, identity, pose and the full finish required by that actor’s assigned medium. NORMAL keeps precise eyes, hair lines/highlights, modeled face/hands and costume folds/seams. GEKIGA keeps facial planes and hatching; WATERCOLOR keeps pigment layers and painted edges; POP_ART keeps its original bold ink and printed halftone faces. These are separate frame-specific recipes, never a page-wide cel-shading or POP override. Background density does not change character rendering.',
  'ENVIRONMENT: floor/wall/rug/shelf/table/chair surfaces are scenery even when touched or in the foreground. Preserve silhouette, perspective and physical contact; omit wood grain, plank seams, tiny repeated books, carvings, textile patterns and decorative reflections. Keep actual story clues, held props and required text detailed. Do not protect furniture ornament merely because a person touches it.',
  'SPATIAL backgrounds keep recognizable place landmarks in a few broad shapes, opaque local colors and broad depth shadows (transparent washes in watercolor). In ABSTRACT frames, the background may be as abstract as POP ART: large color fields/geometry, rendered with the assigned medium, behind fully finished characters. No blur over intricate scenery, pale detailed drawing, uncolored draft or all-white page. Reduction must be obvious at page size.',
  'Preserve dialogue, title, camera, action, prop ownership, panel count and layout. Background space stays INSIDE panels. For four stacked panels, keep three narrow white gaps about 1–1.5% of page height; keep all other planned gutters. Inspect people separately from scenery. Do not print these directions.',
  '[END MANGA BACKGROUND SIMPLIFICATION]',
].join('\n');

const mangaBackgroundBlock = /^\[MANGA BACKGROUND SIMPLIFICATION\]\r?\n[\s\S]*?^\[END MANGA BACKGROUND SIMPLIFICATION\](?=\r?\n|$)/m;

// Rewrite only app-authored policy lines, never Action/Dialogue/reference data.
// Unique BG MODE clauses make these narrow substitutions reversible on OFF.
const backgroundPolicyChanges = [
  [/^- (?:Render a rich physical setting|BG MODE:)/, 'Render a rich physical setting with meaningful environmental anchors and layered foreground, midground, and background; do not default to empty walls, flat gradients, or generic blank rooms unless physical emptiness is explicitly requested.', 'BG MODE: follow each frame’s background plan. SPATIAL uses a few large location shapes; ABSTRACT replaces the literal room with color fields and geometry. Full actor rendering and story evidence remain intact.', 'BG MODE: keep a readable setting with the required landmarks, perspective and depth layers. Reduce nonessential ornaments, tiny surface marks and repeated scenery motifs. Preserve the panel medium, environmental color/light and full character finish.'],
  [/^- (?:意味のある環境|BG MODE:)/, '意味のある環境の手掛かりと前景・中景・背景の層を豊かに描く。物理的な空虚さの明示指定がなければ、空の壁・平坦なグラデーション・無個性な空室へ簡略化しない。', 'BG MODE: 各枠の背景指定に従う。SPATIALは場所を少数の形で示し、ABSTRACTは室内描写を色面・図形へ置き換える。人物の元の描法・仕上げと物語の証拠は保持する。', 'BG MODE: 場所の目印・遠近・前景中景背景の関係を保持し、背景の不要な装飾・微細な表面模様・反復する景物だけを減らす。コマの媒体、背景の色と光、人物本来の仕上げは維持する。'],
  [/^Applies only to .*FOREGROUND DEPTH:/, 'and a readable distant setting.', 'and the assigned background design (BG MODE): use large color fields instead of a literal distant setting in ABSTRACT frames.'],
  [/^- (?:主要人物の複製|BG MODE CAST:)/, '主要人物の複製/融合/置換禁止。場所に合う普通の背景人物は許容し、主要人物の分身や新たな支配的キャラは追加しない。', 'BG MODE CAST: 各枠のCAST COUNT／NO OTHER HUMANSを優先。指定人数がある枠ではその名簿の各人を一度ずつ描き、背景人物を増やさない。同じ人物への視線・動作・別角度の言及は同じ一つの身体へ対応づける。指定人数がない場合だけ場所に合う脇役を許容。主要人物の複製・融合・置換は禁止。'],
  [/^(?:NORMAL PANEL RENDERING|NORMAL CHARACTER AND STORY-PROP RENDERING \(BG MODE\)):/, 'NORMAL PANEL RENDERING:', 'NORMAL CHARACTER AND STORY-PROP RENDERING (BG MODE):'],
  [/^(?:- )?FOCAL READABILITY:/, 'Keep setting texture/shadow depth', 'BG MODE: keep large setting shapes, opaque local colors and broad depth shadows, without material microtexture', 'BG MODE: keep sparse setting contours and flat planes without material texture or scenic shading'],
  [/^RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK:/, 'keep setting/depth and foreground/midground/background shapes; optional nonfocal near/far blur/thin/pale detail.', 'BG MODE: keep spatial relationships through sparse contours and plain planes; omit decorative scenery.'],
  [/^(?:RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK|PAGE READING RHYTHM(?: \(direction only; never print\))?):/, 'no default blank backdrop', 'BG MODE: keep a calm finished setting behind dialogue and reactions', 'BG MODE: open paper is the default behind dialogue and reactions'],
  [/^SCENE LETTERING:/, 'Otherwise keep natural artwork/icons/colors/borders/material/layout and any context-appropriate lettering, length/density/readability. No censoring/blanking/simplifying just for unscripted text; depth blur/thin/pale allowed, required text readable.', 'BG MODE: omit incidental poster artwork and decorative lettering; retain exact scripted text, required story clues and the simple supporting object contour.'],
  [/^- Use negative space and selective detail/, 'Do not replace a setting with a blank backdrop merely because the beat is quiet; preserve explicit scripted abstraction.', 'BG MODE: quiet beats keep broad setting color/tone planes and necessary spatial cues; omit ornamental marks.', 'BG MODE: use open paper or a plain color field for quiet beats, keeping only required spatial cues and story evidence.'],
  [/^- Follow SCENE LETTERING:/, 'other physical surfaces may freely contain natural context-appropriate lettering with no amount, density or readability cap.', 'BG MODE: nonessential background surfaces are plain; preserve required lettering only.'],
  [/^\((?:background rendering|BG MODE)/, 'background rendering follows the selected panel medium: 2.5', 'BG MODE: sparse background contours and flat shapes; character medium stays unchanged: 2.5'],
];
const panelBackgroundDesign = (frame, index) => {
  // Assign an actual background treatment, rather than asking the image model
  // to choose between two conflicting options in every panel. Explicit movement
  // and the establishing frame keep spatial anchors; talking/reaction frames
  // can use abstract backgrounds regardless of their CHARACTER medium.
  const action = frame.match(/(?:^|[;\n])\s*Action(?:\s*\([^\r\n)]*\))?:\s*([^\r\n]*)/m)?.[1] || '';
  const camera = frame.match(/(?:^|[;\n])\s*Camera:\s*([^\r\n]*)/m)?.[1] || '';
  const dialogue = frame.match(/^Dialogue(?:\s*\([^\r\n)]*\))?:[^\r\n]*/m)?.[0] || '';
  const medium = frame.match(/^(?:MONOCHROME )?PANEL STYLE LOCK:\s*([A-Z_]+)\b/m)?.[1]
    || frame.match(/\bStyle:\s*([A-Z_]+)\b/)?.[1]
    || frame.match(/^FRAME MEDIUM[^\n]*?—\s*([A-Z_]+)\b/m)?.[1] || 'NORMAL';
  const spatial = index === 0 || /小走り|駆け|歩[くきい]|走って|走り(?:出|去|寄)|移動|移[るりっ]|場面転換|別の場所|入室|退室/.test(action);
  const abstract = !spatial && (['POP_ART', 'IMPACT', 'CHIBI_GAG'].includes(medium)
    || /\bB[2-9]=/.test(dialogue) || (dialogue.match(/「[^」]*」/g) || []).length > 1
    || /接写|クローズ|手元|中景|close[- ]?up/i.test(camera)
    || /笑|驚|叫|ツッコミ|反応|怒|にら|睨|口を大きく/.test(action));
  const treatment = abstract
    ? 'BACKGROUND=ABSTRACT: この枠の人物・物語の道具の背後は、2～4群の大きな色面・図形・放射形で構成する。室内・窓・床・書架の描写はこの枠では描かない。ぼかした室内にも置き換えない。身体が接触する家具は無地の輪郭面だけ保持。物語の道具・手掛かり・文字は省略しない。'
    : 'BACKGROUND=SPATIAL: 背景だけを大きな切り絵のような3～5群の形へ整理。書架は棚枠と本の集合を示す無地の長方形、床と壁は一面と大きな落ち影。机・椅子は輪郭と大きな明暗だけ。個々の本・木目・床板線・絨毯模様・彫刻・細かな反射は省く。場所の目印と身体の接触は保持。';
  const actorFinish = medium === 'NORMAL'
    ? 'NORMAL人物の顔・瞳・髪・衣装のしわと陰影は省略せず、POPやベタ塗りへ変えない。'
    : medium === 'POP_ART'
      ? '全人物の顔・髪・服も元のPOP_ARTの太い墨輪郭・印刷色面・網点を完遂。背景だけの網点にしない。'
      : `全人物は元の${medium}の人物描法を完遂し、背景の形数の削減を人物の描き込みへ適用しない。`;
  return `BACKGROUND DESIGN FOR THIS PANEL: ${treatment} 人物はこの枠のFRAME MEDIUM／ACTOR MEDIUMどおり通常の細部まで完成。${actorFinish} 指定人数・構図・台詞を保持。Do not print this direction.`;
};

const applyBackgroundPolicies = (prompt, enabled) => prompt.split(/(\r?\n)/).map(line => {
  for (const [scope, normal, simplified, ...legacy] of backgroundPolicyChanges) {
    if (!scope.test(line)) continue;
    if (enabled) line = line.replace(normal, simplified);
    else for (const clause of [simplified, ...legacy]) line = line.replace(clause, normal);
  }
  return line;
}).join('');

export const hasMangaBackgroundSimplification = (prompt = '') => mangaBackgroundBlock.test(prompt);

export const setMangaBackgroundSimplification = (prompt, enabled) => {
  if (!enabled) {
    const match = mangaBackgroundBlock.exec(prompt);
    if (!match) return prompt;
    const before = prompt.slice(0, match.index);
    const after = prompt.slice(match.index + match[0].length);
    // Both prefix and older suffix candidates must restore the exact original.
    // Remove only our two separator newlines; retain every original byte/edit.
    const restored = match.index === 0
      ? after.replace(/^(?:\r?\n){0,2}/, '')
      : before.replace(/(?:\r?\n){2}$/, '') + after;
    return applyBackgroundPolicies(restored.replace(/\r?\nBACKGROUND DESIGN FOR THIS PANEL:[^\r\n]*/g, ''), false);
  }
  if (!prompt.trim() || hasMangaBackgroundSimplification(prompt)) return prompt;
  let directed = applyBackgroundPolicies(prompt, true);
  const frames = [...directed.matchAll(/^(## Panel \d+[^\r\n]*|\[PAGE FRAME P\d+ \|[^\r\n]*)(\r?\n|$)/gm)];
  for (let i = frames.length - 1; i >= 0; i--) {
    const match = frames[i];
    const start = match.index + match[0].length;
    const frame = directed.slice(start, frames[i + 1]?.index ?? directed.length);
    const endTag = frame.match(/^\[END PAGE FRAME P\d+\]/m);
    const actorRecipe = [...frame.matchAll(/^(?:ACTOR MEDIUM|NORMAL PANEL RENDERING|NORMAL CHARACTER AND STORY-PROP RENDERING \(BG MODE\)):[^\r\n]*/gm)].at(-1);
    // The ordinary medium recipe remains verbatim. Apply only scenic density
    // after it, within the same frame, rather than letting a later all-frame
    // rendering instruction silently override the optional background mode.
    const insertAt = endTag
      ? start + endTag.index - (frame.slice(0, endTag.index).match(/\r?\n$/)?.[0].length || 0)
      : actorRecipe ? start + actorRecipe.index + actorRecipe[0].length
        : match.index + match[1].length;
    directed = directed.slice(0, insertAt) + (match[2] || '\n')
      + panelBackgroundDesign(frame.split('[END PAGE FRAME')[0], i) + directed.slice(insertAt);
  }
  return `${MANGA_BACKGROUND_SIMPLIFICATION}\n\n${directed}`;
};

export const WATERMARK_ART_PRIORITY = 'WATERMARK ART PRIORITY: 下部注記のみ重なり/全隠れ/見切れ/判読不能可。可視文言保持。絵/台詞/題字/タチキリ優先、露出用縮小/白帯/修復禁止。';
export const allowsWatermarkOverlap = (prompt='') => String(prompt).includes('WATERMARK ART PRIORITY:');
export const isPermittedWatermarkOverlapIssue = (issue,prompt='') => {
  if(!allowsWatermarkOverlap(prompt)||!readRenderOptions(prompt).showWatermarks||!['panel_layout','title_text','surface_text','unverified'].includes(issue?.type)) return false;
  const subject=String(issue.subject||'');
  if(!/watermark|footer|credit|ウォーターマーク|ウオーターマーク|フッター|クレジット/i.test(subject)||/dialogue|balloon|title|台詞|セリフ|吹き出し|題字|タイトル/i.test(subject)) return false;
  const observation=String(issue.observed||issue.reason||'');
  return /occlu|hidden|overlap|clip|crop|truncat|missing|unreadable|not visible|隠|重な|見切|切れ|欠け|欠落|見え|読め|未表示/i.test(observation);
};

export const buildRenderOptionsContract = ({ mosaicCopyrightedCharacters = true, showWatermarks = true, showTitle = true, bottomBleed = false } = {}) => [
  `[RENDER OPTIONS: copyrighted_mosaic=${mosaicCopyrightedCharacters ? 'on' : 'off'}; watermarks=${showWatermarks ? 'on' : 'off'}${showTitle ? '' : '; title=off'}]`,
  buildCopyrightMosaicInstruction(mosaicCopyrightedCharacters),
  showTitle ? '' : NO_PAGE_TITLE,
  showWatermarks ? WATERMARK_ART_PRIORITY : '',
  showWatermarks ? '' : `FOOTER: ${bottomBleed ? 'continue the authored bleed artwork to the canvas bottom; no blank footer band.' : 'leave the bottom margin blank.'} Do not draw either footer watermark, credit, signature or attribution URL. Preserve ${showTitle ? 'the title, ' : ''}dialogue and scripted in-scene lettering.`,
].filter(Boolean).join('\n');

// Read the contract attached to this image's prompt, not a later UI selection.
// Legacy prompts had mandatory credits and no automatic copyrighted mosaic.
export const readRenderOptions = (prompt = '') => {
  const match = String(prompt).match(/^\[RENDER OPTIONS: copyrighted_mosaic=(on|off); watermarks=(on|off)(?:; title=(on|off))?\]$/m);
  return { mosaicCopyrightedCharacters: match?.[1] === 'on', showWatermarks: match ? match[2] === 'on' : true, showTitle: match?.[3] !== 'off' };
};

export const assertRenderOptions = (prompt, options) => {
  const bottomBleed=options.bottomBleed??/^FULL BLEED P\d+:.*on [^;\n]*\bbottom\b/m.test(String(prompt));
  if (!String(prompt).includes(buildRenderOptionsContract({...options,bottomBleed}))) {
    throw new Error('タイトル／モザイク／ウオーターマークの設定が指示文と一致しません。STEP3で再構築してください。');
  }
  if (options.showTitle === false && /^(?:- )?(?:Top title EXACTLY|Top page:.*text title:|Page title: render|TYPE: title EXTRA-BOLD)/m.test(String(prompt))) {
    throw new Error('タイトルOFFの指示文に題字の描画指定が残っています。STEP3で再構築してください。');
  }
  if (options.mosaicCopyrightedCharacters && options.protectedCast?.length
      && !String(prompt).includes(buildProtectedCastContract(options.protectedCast))) {
    throw new Error('登録キャストのモザイク除外指定が指示文と一致しません。STEP3で再構築してください。');
  }
  return prompt;
};

export const buildRenderOptionsQa = (prompt = '') => {
  const options = readRenderOptions(prompt);
  return [
    hasMangaBackgroundSimplification(prompt) ? 'BACKGROUND-ONLY MODE CHECK: require an obvious reduction of background shapes and fine lines. Judge by scene function: establishing/movement/clue/contact frames retain recognizable location landmarks and spatial relationships in a few large colored or toned shapes; reaction/retort/emotional/conversation frames may intentionally replace scenery with bold color fields, geometry, radial shapes or tone/dot areas. Do not flag this permitted abstraction as missing scenery or restore its ornament. Report both nearly unchanged detailed scenery and unintended loss of essential location/clue/contact evidence. An uncolored draft or empty white page is not requested. Inspect characters separately: compare visible eyes, hair strands, face modeling, hands, costume seams/folds and shading against character references and the specified panel medium. Background simplification never authorizes reduced character detail, washed-out figures or lost character shading. Report located visible regressions; do not infer preservation from matching hair color or clothing alone. Hidden/small details remain uncertain. Retain story-critical props, exact lettering and camera geometry. Sparse scenery alone is neither a character-quality failure nor proof of success.' : '',
    options.showTitle ? '' : 'TITLE OFF CHECK: no page title or title band is requested. Its absence is correct. Report an invented page heading or an unused reserved title band as panel_layout only with visible material evidence. Never add or restore a title during repair. Preserve dialogue and required in-scene lettering even when they match the metadata title.',
    options.mosaicCopyrightedCharacters ? buildProtectedCastContract(readProtectedCast(prompt)) : '',
    options.mosaicCopyrightedCharacters ? 'UNAUTHORIZED MOSAIC CHECK: inspect every registered cast face and body for coarse square censorship blocks. Report visible unrequested masking as action_fidelity with panel, subject and localized pixel evidence; do not excuse it as intentional copyright masking. Distinguish natural shadows, physical masks/helmets, sunglasses and depth blur from pixel blocks. An explicit scripted region mask remains allowed.' : '',
    options.mosaicCopyrightedCharacters ? `${COPYRIGHT_MOSAIC_TARGET_SCOPE}\nMOSAIC CHECK: inspect only authorized target depictions in the generated candidate, including printed artwork; reference sheets are comparison evidence, never output areas to mask. Large opaque square blocks must obscure facial details. Pixel-art styling or tiny pixels leaving eyes and mouth legible are insufficient; report clearly visible missing/insufficient masking as action_fidelity with panel and pixel evidence. Intentional mosaic on copyrighted characters is not a defect. Do not restore or invent their concealed face, clothing or anatomy. Inspect visible story actions and unaffected characters normally; hidden details remain unverified and are not repair targets. Mosaic on unrelated original characters or required text is not authorized. A reference's likeness alone is insufficient evidence to demand added masking or a paid repair.` : '',
    options.showWatermarks
      ? allowsWatermarkOverlap(prompt) ? 'WATERMARK VISIBILITY CHECK: footer credits may overlay artwork; partly/fully hidden, occluded, clipped or unreadable footer credits are allowed. Record only what is visible; do not infer hidden lettering. Their visibility alone is not a defect, uncertainty gate or reason for repair. Do not add a blank strip, shrink the art, or restore hidden credits. This exception applies ONLY to footer credits: title, speech and story-required text remain protected.' : 'WATERMARK EDGE CHECK: inspect the complete left and right footer text from pixels, including the first/last glyphs and their top/bottom strokes. Record cropped or missing required watermark text as panel_layout, and unreadable text as unverified. A clipped URL or credit is not an acceptable decorative-text fallback. Do not infer missing glyphs from the supplied prompt.'
      : `FOOTER CHECK: no footer watermarks are requested. Their absence is correct, not missing required text or a layout defect. Do not add credits during repair. Inspect ${options.showTitle ? 'the title, ' : ''}dialogue and scripted in-scene text normally.`,
  ].filter(Boolean).join('\n');
};
