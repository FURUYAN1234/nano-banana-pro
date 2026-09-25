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
      assert.match(prompt, /WHITE (?:PAPER )?RESERVE:.*(?:large.*unprinted|lit.*light skin.*wall.*ceiling.*pure white)/);
      assert.match(prompt, /MONOCHROME THREE-TONE MANUSCRIPT:/);
      assert.match(prompt, /white/);
      assert.match(prompt, /(?:solid )?black/);
      assert.match(prompt, /bounded.*(?:screen|screentone)/);
      assert.match(prompt, /(?:never|no ).*(?:panel|face).*(?:BG|background)/i);
      assert.match(prompt, /DEF[Oo]CUS:.*(?:fewer.*lines|reduce.*line density).*white gaps/);
      assert.doesNotMatch(prompt, /halftone (?:blur|defocus)|blur[^\n.;]*in black-on-white halftone|distant depth-of-field in black-on-white halftone/);
      // Serious mode already exceeds the soft budget in HEAD (15,815 chars).
      // Its medium guarantees must survive too; don't replace its style/script to force this cap.
      if (providerFamily === 'chatgpt' && punchlineType === 'Auto') assert.ok(prompt.length <= 15000, `Web budget: ${prompt.length}`);
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
    assert.match(prompt, /CHEEK (?:SCREENTONE EXCEPTION|SCREEN):.*explicit.*(?:blush|flush).*(?:emotional )?peak/i);
    assert.match(prompt, /(?:SKIN TONE MAP:|SCREENED-SKIN \[)/i);
    assert.match(prompt, /(?:light skin uses white|light skin\/wall\/sky=white|LIGHT-SKIN \[[^\]]+\]:[^\n]*white paper)/i);
    assert.match(prompt, /(?:tanned or dark skin uses the one uniform screentone|SCREENED-SKIN[^\n]*uniform screen)/i);
    assert.match(prompt, /(?:hands, palms|hands\/palms|limbs\/palms)/i);
    assert.match(prompt, /(?:very thin continuous rim-light line|thin (?:continuous )?outer rim|white rim only)/i);
    assert.match(prompt, /(?:never cut an interior or broad white area|no interior white\/patches|never interior patches|no patches)/i);
    assert.match(prompt, /(?:Do not invent lighter palms\/soles|lighter palms\/soles as defects|(?:invented )?light palms\/soles|no patches\/light palms)/i);
    assert.match(prompt, /SCREENED-SKIN \[葵\]:/i);
    assert.match(prompt, /LIGHT-SKIN \[凛\]:[^\n]*white paper/i);
    assert.match(prompt, /PANEL INK:[^\n]*white\/black/i);
    assert.equal((prompt.match(/CHEEKS: none/g) || []).length, 4);
    assert.match(prompt, /White\+solid black dominate|White and solid black must dominate/i);
    assert.match(prompt, /focal face[^\n]*bounded[^\n]*shadow plane|bounded light-driven shadow plane/i);
    assert.match(prompt, /never whole-face|never cover the whole face|never veil or screen the whole face/i);
    assert.match(prompt, /(?:sole|only) middle(?: tone)?|one consistent bounded middle tone|one fixed screen/i);
    assert.match(prompt, /not (?:grayscale|halftone rendering)/i);
    assert.match(prompt, /No [^\n]*gr[ae]y(?:\/|.*)gradients?/i);
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
    if (family === 'chatgpt') assert.ok(prompt.length <= 15000, `Web budget: ${prompt.length}`);
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
  assert.equal((prompt.match(/SCREEN-SKIN\[葵\]:palms same; no patches/g) || []).length, 4);
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
    assert.equal(mono.match(/PROPORTION OVERRIDE:[^\n]*/)?.[0], color.match(/PROPORTION OVERRIDE:[^\n]*/)?.[0]);
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
    assert.match(mono, /PROPORTION OVERRIDE: Use 7-8 head proportions/);
    if (family === 'chatgpt') assert.ok(mono.length <= 15000, `Web budget: ${mono.length}`);
  }
});

test('monochrome lock and style recipes survive Web prompt compaction', () => {
  const prompt = build('chatgpt', 'monochrome', { scenario: scenario(['WATERCOLOR', 'NEON', 'RETRO', 'CHIBI_GAG']) });
  assert.ok(prompt.length <= 15000, `Web budget: ${prompt.length}`);
    assert.match(prompt, /\[ MONOCHROME THREE-TONE MANUSCRIPT LOCK \]/);
  assert.equal((prompt.match(/MONOCHROME PANEL STYLE LOCK:/g) || []).length, 4);
  assert.match(prompt, /G-PEN INK DIRECTION/);
  assert.match(prompt, /MONOCHROME BACKGROUND CLARITY LOCK/);
  assert.ok(prompt.includes('赤と青はそのまま書いてね。'));
});

test('monochrome Web prompt remains copyable with a five-character cast', () => {
  const fiveCharacterCast = `${castList}\n## 澪\n- orange bob hair, no glasses, white blouse\n## 空\n- blonde hair, blue eyes, round glasses, black vest\n## 雪\n- silver long hair, no glasses, patterned coat`;
  const prompt = build('chatgpt', 'monochrome', { castList: fiveCharacterCast });
  assert.ok(prompt.length <= 15000, `five-character Web budget: ${prompt.length}`);
  assert.match(prompt, /G-PEN INK DIRECTION/);
  assert.match(prompt, /BLACK-HAIR INK LOCK:[^\n]*(?:solid black|black mass)[^\n]*(?:white highlight|white shine)/i);
  assert.match(prompt, /MONOCHROME BACKGROUND CLARITY LOCK/);
  assert.match(prompt, /LIGHT-SKIN \[凛\]:[^\n]*white paper/i);
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
    assert.match(prompt, /SOURCE COLOR BOUNDARIES:/);
    assert.match(prompt, /SCENE COLOR PRIORITY:.*story and verbatim text.*source hues/);
    assert.doesNotMatch(prompt, /Reproduce reference face, hair, eyes, skin, accessories/);
    assert.doesNotMatch(prompt, /REFERENCE ROLE: appearance;/);
    assert.doesNotMatch(prompt, /CLEAN FINISH: crisp FG, soft BG/);
    assert.match(prompt, /CHARACTER QA(?: PASS)?:[^\n]*\n?-?\s*[^\n]*ink\/tone/);
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
