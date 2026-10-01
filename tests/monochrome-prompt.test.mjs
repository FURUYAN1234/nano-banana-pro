import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createServer } from 'vite';

let server, buildMangaPrompt, buildEmotionBlock, EMOTION_STYLES, buildImageQualityQaPrompt, buildImageQualityRepairPrompt;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  ({ buildEmotionBlock } = await server.ssrLoadModule('/src/lib/panel-utils.js'));
  ({ EMOTION_STYLES } = await server.ssrLoadModule('/src/lib/constants.js'));
  ({ buildImageQualityQaPrompt } = await server.ssrLoadModule('/src/lib/image-quality-qa.js'));
  ({ buildImageQualityRepairPrompt } = await server.ssrLoadModule('/src/lib/image-quality-failsafe.js'));
});
after(async () => { await server?.close(); });

const castList = '## 葵\n- blue hair, red eyes, tanned skin, glasses\n## 凛\n- black hair, pale skin, no glasses';
const scenario = (styles = ['GEKIGA', 'SUMI_INK', 'MONOCHROME_ACCENT', 'GOLDEN_HOUR'], extra = '') => `
## タイトル: 赤と青の話
Location: 図書館
Outfit: red jacket and blue shirt
${styles.map((style, i) => `[${i + 1}コマ目: ${['起', '承', '転', '結'][i]}]
[EMOTION: ${style}]
[Camera: ローアングル]
Action: 葵が凛に本を渡す。凛は本を受け取り、驚いてのけぞる。背景に本棚と机がある。${extra}
葵「赤と青はそのまま書いてね。」
凛「白い紙だね。」`).join('\n')}`;
const build = (providerFamily, colorMode, overrides = {}) => buildMangaPrompt({
  scenario: scenario(), castList, colorMode, providerFamily, systemVersion: 'test', punchlineType: 'Auto', ...overrides,
});

test('white light planes and restricted tone regions survive provider, style and Web compaction paths', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
      const prompt = build(providerFamily, 'monochrome', { punchlineType });
      assert.match(prompt, /WHITE (?:PAPER )?RESERVE:.*(?:unprinted white light planes|unassigned(?: lit planes)?=white)/);
      assert.match(prompt, /MONOCHROME THREE-TONE MANUSCRIPT:/);
      assert.match(prompt, /white/);
      assert.match(prompt, /(?:solid )?black/);
      assert.match(prompt, /bounded.*(?:screen|screentone)/);
      assert.match(prompt, /(?:no.*(?:panel|face).*BG.*veil|area alone is not a defect)/i);
      assert.match(prompt, /DEF[Oo]CUS:.*(?:fewer.*lines|reduce.*line density).*white gaps/);
      assert.doesNotMatch(prompt, /halftone (?:blur|defocus)|blur[^\n.;]*in black-on-white halftone|distant depth-of-field in black-on-white halftone/);
      // Serious mode already exceeds the soft budget in HEAD (15,815 chars).
      // Its medium guarantees must survive too; don't replace its style/script to force this cap.
      if (providerFamily === 'chatgpt' && punchlineType === 'Auto') assert.ok(prompt.length <= 32000, `shared Web/API budget: ${prompt.length}`);
      const review = buildImageQualityQaPrompt({ finalPrompt: prompt, referenceImageCount: 2 });
      assert.match(review, /screened.*lit.*(?:walls|background)/);
    }
  }
});

for (const family of ['chatgpt', 'gemini']) {
  test(`${family}: shared output demands three-tone manga ink with screentone-only midtones`, () => {
    const prompt = build(family, 'monochrome');
    assert.match(prompt, /\[ MONOCHROME THREE-TONE MANUSCRIPT LOCK \]/);
    assert.match(prompt, /#000000/);
    assert.match(prompt, /#FFFFFF/);
    assert.match(prompt, /(?:lit.*light skin.*pure white|LIGHT-SKIN \[[^\]]+\]:[^\n]*white paper)/i);
    assert.match(prompt, /CHEEK (?:SCREENTONE EXCEPTION|SCREEN):.*(?:explicit.*(?:blush|flush).*(?:emotional )?peak|明示された赤面・化粧だけ)/i);
    assert.match(prompt, /(?:SKIN TONE MAP:|SCREENED-SKIN \[)/i);
    assert.match(prompt, /(?:light skin uses white|light skin\/wall\/sky=white|LIGHT-SKIN \[[^\]]+\]:[^\n]*white paper)/i);
    assert.match(prompt, /(?:tanned or dark skin uses the one uniform screentone|SCREENED-SKIN[^\n]*uniform screen)/i);
    assert.match(prompt, /(?:hands, palms|hands\/palms|limbs\/palms)/i);
    assert.match(prompt, /Small light-driven highlights allowed|小さい光点は可/i);
    assert.match(prompt, /no broad white islands\/base drift|広い白抜き・ベース漂流は禁止/i);
    assert.match(prompt, /(?:Do not invent lighter palms\/soles|lighter palms\/soles as defects|(?:invented )?light palms\/soles|no patches\/light palms|no broad patches or invented light palms)/i);
    assert.match(prompt, /SCREENED-SKIN \[葵\]:/i);
    assert.match(prompt, /LIGHT-SKIN \[凛\]:[^\n]*white paper/i);
    assert.match(prompt, /PANEL INK:[^\n]*white\/black/i);
    assert.equal((prompt.match(/CHEEKS: none/g) || []).length, 4);
    assert.match(prompt, /drawing materials, not a (?:fixed density quota|pixel limit)/i);
    assert.match(prompt, /Form and cast shadows use bounded screen\/black shapes/i);
    assert.match(prompt, /SKIN PAPER BASE: lit light skin=#FFFFFF[^\n]*No base wash\/texture/i);
    assert.match(prompt, /SCREENTONE:.*(?:consistent bases|consistent assigned bases)/i);
    assert.match(prompt, /(?:not|no) (?:grayscale|halftone rendering)/i);
    assert.match(prompt, /No [^\n]*gr[ae]y(?:\/|.*)gradients?|no [^\n]*grey wash\/gradient/i);
    assert.match(prompt, /(?:colored references.*identity|refs=identity).*not.*palette/i);
    assert.match(prompt, /CROSS-PANEL WARDROBE TONE LOCK/);
    assert.match(prompt, /(?:BLACK-HAIR INK LOCK|dark(?:est)? hair)[^\n]*(?:solid black|black mass)[^\n]*(?:white highlight|white shine)/i);
    assert.doesNotMatch(prompt, /FULL COLOR \(not black and white\)|rich deep color grading|chic cinematic color grading|characters remain clean and fully colored|single vivid color element|Match shadow directions and ambient color temperature/i);
    assert.equal((prompt.match(/## Panel \d/g) || []).length, 4);
    assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
    assert.ok(prompt.includes('ローアングル') || prompt.includes('LOW ANGLE'));
    assert.match(prompt, /BODY ACTING|EXPRESSIVE DIRECTION/);
    assert.match(prompt, /G-PEN(?: INK DIRECTION)?:/);
    assert.match(prompt, /pressure.*taper|taper.*pressure/i);
    assert.match(prompt, /MONOCHROME BACKGROUND CLARITY LOCK/);
    assert.match(prompt, /simplify nonessential textures|omit (?:optional )?textures/i);
    assert.match(prompt, /story-required object or clue|Keep location\/depth\/all story evidence|keep setting\/depth\/story evidence/i);
    if (family === 'chatgpt') assert.ok(prompt.length <= 32000, `shared Web/API budget: ${prompt.length}`);
  });
  test(`${family}: default/color ignores monochrome words in cast metadata`, () => {
    for (const mode of [undefined, 'color', 'auto']) {
      const prompt = build(family, mode, { castList: `${castList}\nstyle_tag: monochrome screentone` });
      assert.match(prompt, /cinematic full-color TV anime style/);
      assert.doesNotMatch(prompt, /\[ MONOCHROME TWO-VALUE RENDERING LOCK \]/);
    }
  });
  test(`${family}: panorama is rendered in ink rather than requiring reference colors`, () => {
    const prompt = build(family, 'monochrome', { bg360Image: 'test-fixture', bg360Enabled: true, bg360Analysis: { lighting: 'sunset', objects: 'shelves' }, bg360CroppedPanels: ['a', 'b', 'c', 'd'] });
    assert.match(prompt, /BACKGROUND REFERENCE/);
    assert.doesNotMatch(prompt, /Match colors, lighting|Match shadow directions and ambient color temperature|reference \(colors, lighting, architecture\)/);
  });
}

test('cheek screen is localized only to the explicitly blushing character and panel', () => {
  const withOneBlush = scenario().replace(
    'Action: 葵が凛に本を渡す。凛は本を受け取り、驚いてのけぞる。背景に本棚と机がある。',
    'Action: 葵が凛に本を渡す。凛は頬を赤くして本を受け取り、驚いてのけぞる。背景に本棚と机がある。'
  );
  const prompt = build('chatgpt', 'monochrome', { scenario: withOneBlush });
  assert.match(prompt, /CHEEK: \[凛\] small screen only/);
  assert.equal((prompt.match(/CHEEKS: none/g) || []).length, 3);
});

test('monochrome style changes retain white skin and do not inherit incidental blush or fixed face geometry', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = build(providerFamily, 'monochrome', { scenario: scenario(['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']) });
    assert.doesNotMatch(prompt, /one (?:deliberate emotional )?peak|Reproduce reference geometry and design/);
    assert.match(prompt, /no default\/peak or copied sheet blush|既定の頬模様・見本の赤面の転写は禁止/);
    assert.match(prompt, /CHIBI_GAG;.*2-3 heads tall.*explicit proportions override.*Enlarge the skull.*compress torso.*Camera\/Action/i);
    assert.match(prompt, /GEKIGA;.*smaller anatomically proportioned eyes.*constructed nose bridge.*Replace round anime facial construction/);
    assert.match(prompt, /WATERCOLOR;.*assigned material\/shadow masks.*lit light skin/);
    assert.match(prompt, /panel recipe redraws facial construction/);
    assert.equal((prompt.match(/CHEEKS: none/g) || []).length, 4);
    assert.match(prompt, /Form and cast shadows use bounded screen\/black shapes/);
  }
});

test('light-skin paper base is explicit without forcing facial shading in full and compact prompts', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const promptMaxChars of [32000, 19000]) {
      const prompt = build(providerFamily, 'monochrome', { promptMaxChars });
      assert.match(prompt, /SKIN PAPER BASE:.*#FFFFFF.*balloon interiors/);
      assert.match(prompt, /No base wash\/texture/);
      assert.doesNotMatch(prompt, /To avoid a flat blank face|Focal face: one bounded/);
      assert.match(prompt, /Form and cast shadows use bounded screen\/black shapes/);
      assert.match(prompt, /FACE INK:.*eyes\/nose\/mouth.*white gaps/);
      assert.match(prompt, /no feature merging or disappearing hairlines/);
      // Bounded cast shadows and canonical darker skin remain valid.
      assert.match(prompt, /bounded.*shadow/i);
      assert.match(prompt, /SCREENED-SKIN \[葵\]:.*uniform screen/);
      const review = buildImageQualityQaPrompt({ finalPrompt: prompt, referenceImageCount: 2 });
      assert.match(review, /Compare lit light-skin interiors with nearby white balloon interiors/);
      assert.match(review, /broad light-grey base is a defect even without visible dots/);
      assert.match(review, /Do not reject light-driven screen or solid-black shadows for having area/);
      assert.match(review, /merged eyes\/nose\/mouth or lost facial strokes/);
    }
  }
});

test('white skin reserves lit planes while preserving anatomical form and cast shadows', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const promptMaxChars of [32000, 19000]) {
      const prompt = build(providerFamily, 'monochrome', { promptMaxChars });
      assert.match(prompt, /LIGHT-SKIN \[凛\]: lit face\/neck\/limbs=white paper; form\/cast shade=screen or black/);
      assert.equal((prompt.match(/WHITE-SKIN\[凛\]:lit=unprinted; shade=screen\/black/g) || []).length, 4);
      assert.match(prompt, /BODY VOLUME:.*form shadows.*cast shadows/);
      assert.match(prompt, /Follow light direction; no fixed shadow quota|Light direction, no quota/);
      assert.doesNotMatch(prompt, /screen only bounded cast shadow/);
      const review = buildImageQualityQaPrompt({ finalPrompt: prompt, referenceImageCount: 2 });
      assert.match(review, /form and cast shadows.*flat bodies/);
      assert.match(review, /Diffuse light or intentional flat stylization alone is not a defect/);
    }
  }
});

test('ink-only quality and selective screen masks survive full and compressed provider prompts', () => {
  for (const family of ['gemini', 'chatgpt']) {
    for (const [promptMaxChars, extra] of [[32000, ''], [19000, ''], [32000, '人物は本棚の前から机の方へ歩きながら、相手の返事を待っている。'.repeat(20)]]) {
      const options = { promptMaxChars, cinematicTechniques: false, scenario: scenario(undefined, extra) };
      const prompt = build(family, 'monochrome', options);
      assert.doesNotMatch(prompt, /warm\/cool color planes|lighten\/desaturate BG|desaturate background colors|colored facial skin keeps/);
      assert.match(prompt, /SCREEN MASK:.*unassigned.*white.*never.*brightness.*dots/i);
      assert.match(prompt, /INK LIGHT SOURCE:.*white cutouts.*no glow.*veil/i);
      assert.match(prompt, /NEUTRAL INK:.*R=G=B.*tint/i);
      assert.match(prompt, /WHITE-SKIN\[凛\]:lit=unprinted; shade=screen\/black/);
      // Legitimate material/skin tone and shadow regions must remain possible.
      assert.match(prompt, /SCREENED-SKIN \[葵\]:.*uniform screen/);
      assert.match(prompt, /bounded.*shadow/i);
      assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
      assert.match(prompt, /ローアングル|LOW ANGLE/);
      if (extra) assert.ok(prompt.includes(extra), 'long Action must remain intact');
      if (family === 'chatgpt') assert.ok(prompt.length <= promptMaxChars);
      const color = build(family, 'color', options);
      assert.match(color, /warm\/cool color planes/);
      assert.doesNotMatch(color, /SCREEN MASK:|NEUTRAL INK:/);
    }
  }
});

test('cheek screen follows the nearest named subject in a compound action', () => {
  const withCompoundAction = scenario().replace(
    'Action: 葵が凛に本を渡す。凛は本を受け取り、驚いてのけぞる。背景に本棚と机がある。',
    'Action: 葵は目尻を潤ませて凛へ本を差し出し、凛は頬を赤くして受け取る。背景に本棚と机がある。'
  );
  const prompt = build('chatgpt', 'monochrome', { scenario: withCompoundAction });
  assert.match(prompt, /CHEEK: \[凛\] small screen only/);
  assert.doesNotMatch(prompt, /CHEEK: \[葵\] small screen only/);
});

test('every panel rejects an all-over screen and repeats character-specific skin values', () => {
  const prompt = build('chatgpt', 'monochrome');
  assert.equal((prompt.match(/no veil/g) || []).length, 4);
  assert.equal((prompt.match(/WHITE-SKIN\[凛\]/g) || []).length, 4);
  assert.equal((prompt.match(/SCREEN-SKIN\[葵\]:base stays in light; no broad patches/g) || []).length, 4);
});

test('qualified light-skin fields keep white reserves without borrowing adjacent traits or whitening dark skin', () => {
  const variedSkinCast = '## 葵\n| 顔 | 肌: 小麦色<br>目: 明るい茶色 | tanned skin |\n## 凛\n| 顔 | 肌：普通～やや明るい<br>目: 黒 | no glasses |\n## 澪\n| 顔 | 肌: 未指定<br>目: 明るい茶色 | no glasses |';
  for (const family of ['gemini', 'chatgpt']) {
    const prompt = build(family, 'monochrome', { castList: variedSkinCast });
    assert.match(prompt, /LIGHT-SKIN \[凛\]:.*white paper/);
    assert.match(prompt, /WHITE-SKIN\[凛\]:lit=unprinted; shade=screen\/black/);
    assert.match(prompt, /SCREENED-SKIN \[葵\]:.*uniform screen/);
    assert.doesNotMatch(prompt, /LIGHT-SKIN \[[^\]]*(?:葵|澪)/);
  }
});

test('every monochrome emotion uses ink-specific direction, not its color recipe', () => {
  for (const style of Object.keys(EMOTION_STYLES).filter(s => s !== 'NORMAL')) {
    const block = buildEmotionBlock(`[EMOTION: ${style}]\n葵「はい。」\n凛「うん。」`, 'monochrome');
    assert.match(block, /MONOCHROME PANEL STYLE LOCK:/, style);
    assert.doesNotMatch(block, /full color|vibrant.*color|color wash|sepia|gaussian blur|golden backlight|neon pink|graphite|ink wash|soft bloom|grayscale panel|palette/i, style);
    assert.match(block, /black|white|ink|hatch/i, style);
  }
});

test('monochrome retains color-independent proportion overrides and serious-mode protection', () => {
  for (const style of ['CHIBI_GAG', 'GEKIGA', 'UKIYOE']) {
    const panel = `[EMOTION: ${style}]\n葵「はい。」\n凛「うん。」`;
    const color = buildEmotionBlock(panel, 'color');
    const mono = buildEmotionBlock(panel, 'monochrome');
    if (style === 'CHIBI_GAG') {
      assert.match(mono, /Explicit user proportions win; otherwise retain shortened body and enlarged head within the requested Camera\/Action/);
      assert.doesNotMatch(mono, /compulsory.*head ratio|ALL characters.*2-3/);
    } else {
      assert.equal(mono.match(/PROPORTION OVERRIDE:[^\n]*/)?.[0], color.match(/PROPORTION OVERRIDE:[^\n]*/)?.[0]);
    }
    assert.doesNotMatch(buildEmotionBlock(panel, 'monochrome', { preserveReferenceStyle: true }), /PROPORTION OVERRIDE:/);
  }
});

test('ink lighting and physical depth survive long Web compaction without changing actions', () => {
  for (const family of ['chatgpt', 'gemini']) {
    const input = { scenario: scenario(['GLITTER', 'CHIBI_GAG', 'GEKIGA', 'IMPACT']).replace('Outfit: red jacket and blue shirt', 'Outfit: jacket and shirt') };
    const color = build(family, 'color', input);
    const mono = build(family, 'monochrome', input);
    assert.match(mono, /INK LIGHT \/ ACTING:.*full-body action amplitude/);
    assert.match(mono, /directional solid-black cast shadows, white rim cutouts/);
    assert.match(mono, /background simplification preserves perspective, contact shadows and depth|keep depth\/beats|keep perspective\/contact\/depth/i);
    assert.doesNotMatch(mono, /overrides ALL color\/paint\/lighting/);
    assert.deepEqual(mono.match(/^Camera:.*$/gm), color.match(/^Camera:.*$/gm));
    assert.deepEqual(mono.match(/^Action \(visual only\):.*$/gm), color.match(/^Action \(visual only\):.*$/gm));
    assert.match(mono, /carved facial planes|carved brow\/nose\/cheek\/jaw planes/i);
    assert.doesNotMatch(mono, /PROPORTION OVERRIDE: Use 7-8 head proportions/);
    if (family === 'chatgpt') assert.ok(mono.length <= 32000, `shared Web/API budget: ${mono.length}`);
  }
});

test('monochrome lock and style recipes survive Web prompt compaction', () => {
  const prompt = build('chatgpt', 'monochrome', { scenario: scenario(['WATERCOLOR', 'NEON', 'RETRO', 'CHIBI_GAG']) });
  assert.ok(prompt.length <= 32000, `shared Web/API budget: ${prompt.length}`);
    assert.match(prompt, /\[ MONOCHROME THREE-TONE MANUSCRIPT LOCK \]/);
  assert.equal((prompt.match(/MONOCHROME PANEL STYLE LOCK:/g) || []).length, 4);
  assert.match(prompt, /G-PEN INK DIRECTION/);
  assert.match(prompt, /MONOCHROME BACKGROUND CLARITY LOCK/);
  assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
});

test('monochrome Web prompt remains copyable with a five-character cast', () => {
  const fiveCharacterCast = `${castList}\n## 澪\n- orange bob hair, no glasses, white blouse\n## 空\n- blonde hair, blue eyes, round glasses, black vest\n## 雪\n- silver long hair, no glasses, patterned coat`;
  const prompt = build('chatgpt', 'monochrome', { castList: fiveCharacterCast });
  assert.ok(prompt.length <= 32000, `five-character shared Web/API budget: ${prompt.length}`);
  assert.match(prompt, /G-PEN INK DIRECTION/);
  assert.match(prompt, /BLACK-HAIR INK LOCK:[^\n]*(?:solid black|black mass)[^\n]*(?:white highlight|white shine)/i);
  assert.match(prompt, /MONOCHROME BACKGROUND CLARITY LOCK/);
  assert.match(prompt, /LIGHT-SKIN \[凛\]:[^\n]*white paper/i);
});

test('screened skin keeps its base under light while small motivated highlights remain allowed', () => {
  for (const providerFamily of ['gemini', 'chatgpt']) {
    for (const promptMaxChars of [32000, 19000]) {
      const prompt = build(providerFamily, 'monochrome', { promptMaxChars });
      assert.match(prompt, /SCREENED SKIN BASE:.*(?:before lighting.*Overrides style lighting|keep base in light.*画風の光効果より肌割当を優先)/);
      assert.match(prompt, /(?:light keeps base|keep base in light); shade=black\/hatching/);
      assert.match(prompt, /Small light-driven highlights allowed|小さい光点は可/);
      assert.doesNotMatch(prompt, /white lit skin|lit skin (?:always )?white|pure white lit skin|never source hues or skin tone/i,
        'shared and compact identity rules must not whiten the canonical screened-skin base');
      assert.doesNotMatch(prompt, /white rim only|Any interior or broad white skin area|Lit skin remains unprinted|leave lit skin pure white/);
      assert.match(prompt, /SCREENED-SKIN \[葵\]:.*keep base in light/);
      assert.equal((prompt.match(/SCREEN-SKIN\[葵\]:base stays in light/g) || []).length, 4);
      const review = buildImageQualityQaPrompt({ finalPrompt: prompt, referenceImageCount: 2 });
      assert.match(review, /Small light-driven highlights.*are allowed/);
      assert.match(review, /broad white islands.*cross-panel base changes/);
      assert.match(review, /Do not regenerate for a tiny highlight or ambiguous screen marks/);
    }
  }
  for (const style of Object.keys(EMOTION_STYLES).filter(s => s !== 'NORMAL')) {
    const block = buildEmotionBlock(`[EMOTION: ${style}]\n葵「はい。」`, 'monochrome');
    assert.doesNotMatch(block, /any lit skin stays white|white lit skin|lit faces remain entirely white|lit faces unprinted|white facial areas|clean white lit face|pose and white lit planes/);
  }
});

test('native manga inking survives compaction without treating facial strokes as skin tone', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const promptMaxChars of [32000, 19000]) {
      const prompt = build(providerFamily, 'monochrome', { promptMaxChars });
      assert.match(prompt, /NATIVE MANGA INKING:.*(?:pen lines first.*bounded blacks.*screen masks|墨線→ベタ→網点マスク)/);
      assert.match(prompt, /Facial strokes are ink, not skin fill:.*eyelids.*pupils.*nose.*mouth|目蓋・瞳・鼻・口は肌と別の墨線/);
      assert.match(prompt, /never erase them for white skin or highlights|白肌・光・柔らかい画風でも消さず/);
      assert.match(prompt, /selected soft styles vary strokes, never fade facial anchors|白肌・光・柔らかい画風でも消さず/);
      assert.match(prompt, /unassigned=white; no dots\/grain/);
      assert.match(prompt, /G-PEN INK DIRECTION: NORMAL default; panel recipe wins/);
      assert.match(prompt, /Focal ink follows the panel recipe/);
      assert.doesNotMatch(prompt, /Focal G-pen: strongest|strengthen focal G-pen/);
      assert.match(prompt, /PAPER: unassigned areas match balloon white; no scan haze\/fibers/);
      assert.match(prompt, /tall balloons; vertical text wins over available space|縦長フキダシ。空間より縦書き優先/);
      assert.match(prompt, /SCREENED-SKIN \[葵\]:.*keep base in light/);
      assert.match(prompt, /WHITE-SKIN\[凛\]:lit=unprinted; shade=screen\/black/);
    }
  }
});

test('monochrome mode replaces scenario-wide color output commands without changing dialogue', () => {
  const source = scenario().replace('Action: 葵が凛に本を渡す。', 'Action: 全編カラー。葵が凛に本を渡す。');
  const prompt = build('chatgpt', 'monochrome', { scenario: source });

  assert.doesNotMatch(prompt, /Action \(visual only\):[^\n]*全編カラー/);
  assert.match(prompt, /Action \(visual only\):[^\n]*全編白黒（純白・純黒・網点）/);
  assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
});

test('monochrome cast identity removes arbitrary source chroma while preserving structural traits', () => {
  const chromaticCast = `## Character Alpha
- [WEIGHTS]: (female:1.6), (waist-length braided cyan hair:1.5), (magenta eyes:1.3), (round glasses:1.4), (emerald trench coat:1.2)
## Character Beta
- [WEIGHTS]: (male:1.6), (violet undercut hair:1.5), (amber eyes:1.3), (no glasses:1.5), (teal hooded jacket:1.2)`;
  const monochromePrompt = build('chatgpt', 'monochrome', { castList: chromaticCast });
  const colorPrompt = build('chatgpt', 'color', { castList: chromaticCast });

  assert.doesNotMatch(monochromePrompt, /\b(?:cyan|magenta|emerald|violet|amber|teal)\b/i);
  assert.doesNotMatch(monochromePrompt, /CROSS-CHECK: hair color/i);
  assert.match(monochromePrompt, /waist-length braided.*hair|braided.*hair/i);
  assert.match(monochromePrompt, /round glasses/i);
  assert.match(monochromePrompt, /trench coat/i);
  assert.match(monochromePrompt, /FINAL CHROMA AUDIT/i);
  assert.match(colorPrompt, /cyan hair/i);
  assert.match(colorPrompt, /magenta eyes/i);
  assert.match(colorPrompt, /emerald trench coat/i);
});

test('both providers retain ink-only reference and script priority through compaction', () => {
  const referenceCast = `${castList}\n## Character Gamma\n- long wavy hair, two-tone tips, round glasses, patterned jacket\n## Character Delta\n- short braided hair, gradient streaks, no glasses, striped vest\n## Character Epsilon\n- straight bob hair, no glasses, coat`;
  for (const family of ['chatgpt', 'gemini']) {
    const prompt = build(family, 'monochrome', { castList: referenceCast });
    assert.match(prompt, /BLACK INK PLATE:/);
    assert.match(prompt, /SOURCE COLOR BOUNDARIES:|原色は再現せず/);
    assert.match(prompt, /SCENE COLOR PRIORITY:.*story and verbatim text.*source hues|文字中の色名は原文保持/);
    assert.doesNotMatch(prompt, /Reproduce reference face, hair, eyes, skin, accessories/);
    assert.doesNotMatch(prompt, /REFERENCE ROLE: appearance;/);
    assert.doesNotMatch(prompt, /CLEAN FINISH: crisp FG, soft BG/);
    assert.match(prompt, /CHARACTER QA(?: PASS)?:[^\n]*\n?-?\s*[^\n]*(?:ink\/tone|skin bases)/);
    assert.equal((prompt.match(/PANEL INK:/g) || []).length, 4);
    assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
    // Plain cast paragraphs used to be silently dropped. Preserve those required
    // identities even when this expanded five-person fixture exceeds the soft
    // Web target; the dedicated compact-fixture budget tests still enforce 15k.
    assert.match(prompt, /long wavy hair/);
    assert.match(prompt, /short braided hair/);
    if (family === 'chatgpt') assert.ok(prompt.length < 32000, `API hard budget: ${prompt.length}`);
  }
  const color = build('chatgpt', 'color', { castList: referenceCast });
  assert.doesNotMatch(color, /BLACK INK PLATE:|PANEL INK CHECK:/);
});

test('API QA accepts intentional tone mapping instead of asking for colored references', () => {
  const prompt = buildImageQualityQaPrompt({ finalPrompt: build('chatgpt', 'monochrome'), referenceImageCount: 2 });
  assert.match(prompt, /monochrome_rendering/);
  assert.match(prompt, /Do not restore reference colors/);
  assert.match(prompt, /not.*pixel|cannot.*pixel/i);
  assert.doesNotMatch(prompt, /outfit, hairstyle, hair color, eye color, eyewear/);
});

test('API image repair preserves the requested ink medium, not erroneous color pixels', () => {
  const prompt = buildImageQualityRepairPrompt({ originalPrompt: build('chatgpt', 'monochrome'), sourceMode: 'source-image', issues: [{ type: 'monochrome_rendering', panel: 1, reason: 'visible tint on lit skin' }] });
  assert.match(prompt, /preserve.*monochrome medium/i);
  assert.match(prompt, /remove the reported forbidden color or grey/i);
  assert.doesNotMatch(prompt, /typography, colors, or already-correct content/);
});
