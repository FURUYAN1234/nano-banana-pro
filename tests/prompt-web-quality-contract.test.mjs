import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildMangaPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

after(async () => {
  await server?.close();
});

const CAST_LIST = `
## Hero
- blonde hair, no glasses, warm skin
## Analyst
- dark hair, glasses, pale skin
## Friend
- orange bob hair, no glasses
`;

const SCENARIO = `
## Title: Generic Product Panic!?
Location: supermarket aisle
Outfit: casual clothes

[1コマ目: 起]
[EMOTION: WATERCOLOR]
Action: Hero points at a sealed limited-edition package on a shelf.
Hero「This is exactly the kind of thing that spreads!」

[2コマ目: 承]
[EMOTION: RETRO]
Action: Friend holds the same sealed package while Analyst compares the label.
Friend「Can this really become dessert?」
Analyst「We have to verify the format.」

[3コマ目: 転]
[EMOTION: HORROR]
Action: Analyst tastes a tiny spoonful while Hero records the reaction.
Analyst「My sense of taste is lost.」
Hero「Does this read on camera?」

[4コマ目: 結]
[EMOTION: MONOCHROME_ACCENT]
Action: Friend presents the same package as the only colored object in a monochrome panel.
Friend「This may be the seasonal comic.」
`;

const buildChatGptPrompt = () => buildMangaPrompt({
  scenario: SCENARIO,
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily: 'chatgpt',
  punchlineType: 'Auto',
  systemVersion: 'v4.8.2-test'
});

const buildGeminiPrompt = () => buildMangaPrompt({
  scenario: SCENARIO,
  castList: CAST_LIST,
  colorMode: 'color',
  providerFamily: 'gemini',
  punchlineType: 'Auto',
  systemVersion: 'v4.8.2-test'
});

test('generic wardrobe component continuity survives both providers, media, styles and long compaction', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
    for (const punchlineType of ['Auto', 'SeriousDocumentary']) for (const extra of ['', ' identity detail'.repeat(900)]) {
      const prompt = buildMangaPrompt({ scenario: SCENARIO, castList: CAST_LIST + extra, colorMode, providerFamily, punchlineType, systemVersion: 'test' });
      assert.match(prompt, /WARDROBE COMPONENT LOCK:/);
      assert.match(prompt, /有無\/数\/形\/取付位置/);
      assert.match(prompt, /変更は台本の着脱等のみ/);
      assert.doesNotMatch(prompt, /OUTFIT CONSISTENCY:[^\n]*NO changes\./);
      assert.match(prompt, /遮蔽\/画面外\/短縮/);
      assert.doesNotMatch(prompt, /サスペンダー|suspenders|アカリ/);
    }
  }
});

test('long wardrobe compaction retains the canonical outfit and explicit per-panel changes', () => {
  const outfit = 'Heroは青いシャツ（長袖）、Friendは白い上着、Analystは緑の服';
  const scenario = SCENARIO.replace('Outfit: casual clothes', `Outfit: ${outfit}`)
    .replace('Action: Friend presents', 'Action: Friend takes off the outer jacket and presents');
  const prompt = buildMangaPrompt({ scenario, castList: CAST_LIST + ' identity detail'.repeat(1100),
    colorMode: 'color', providerFamily: 'chatgpt', punchlineType: 'Auto', systemVersion: 'test' });
  assert.ok(prompt.includes(`Follow role-specific outfit assignments: ${outfit};`));
  assert.ok(prompt.includes('Friend takes off the outer jacket'));
  assert.doesNotMatch(prompt, /Action \(visual only\): \(Outfit assignment:/);
});

test('both provider prompts preserve physical settings while allowing density contrast', () => {
  for (const prompt of [buildChatGptPrompt(), buildGeminiPrompt()]) {
    assert.match(prompt, /OBJECT GEOMETRY LOCK/);
    assert.match(prompt, /occlusion|rear contour/);
    assert.match(prompt, /spine/);
    assert.match(prompt, /perspective, not (?:(?:to )?the )?canvas/);
    assert.match(prompt, /glyph.*(?:top|canvas-upright)/);
    assert.match(prompt, /never re-typeset stacked books|Stacking or turning a book must not re-typeset/);
    assert.match(prompt, /surreal gags/);
    assert.match(prompt, /RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK/);
    assert.match(prompt, /story-required (?:physical )?setting cues|retain setting\/depth|keep setting\/depth/i);
    assert.match(prompt, /negative space/i);
    assert.doesNotMatch(prompt, /one fixed environmental anchor plus at least two|1 fixed anchor \+ 2 physical setting cues/i);
    assert.match(prompt, /ABSTRACT BEAT:.*scripted.*(?:omission|omit)|setting or scripted abstraction/i);
    assert.match(prompt, /never remove story evidence|props stay/i);
    assert.match(prompt, /face, eye direction, silhouette, hands, and key action|story evidence\/actions\/reactions clear/i);
    assert.match(prompt, /environmental shapes[^\n]*lower contrast than the focal target|real shots (?:retain setting\/depth;|keep setting\/depth,) far blur/i);
    assert.match(prompt, /quiet beats[^\n]*(?:reduce|lower)|peak\/quiet beat, negative space\/density|negative space; clear story\/joke, peak\/quiet, density/i);
  }
});

test('both provider prompts preserve artwork and freely allow natural incidental lettering', () => {
  for (const prompt of [buildChatGptPrompt(), buildGeminiPrompt()]) {
    assert.match(prompt, /(?:posters?, signs?, packages?, menus?\/book covers? keep|Other surfaces:) natural artwork\/pictograms\/colors\/borders\/material\/layout/i);
    assert.match(prompt, /never suppress, simplify, blank, grey, blur, pixelate, mosaic or censor a surface|Never suppress\/simplify\/blank\/grey\/blur\/pixelate\/mosaic\/censor surfaces/i);
    assert.match(prompt, /freely render context-appropriate lettering.*readable\/decorative.*short\/long.*any amount\/density|context-appropriate readable\/decorative lettering, short\/long, any amount\/density/i);
    assert.doesNotMatch(prompt, /Action text: only scripted|include sparse|no gibberish|pseudo-lettering|unrelated text/i);
    assert.doesNotMatch(prompt, /Other surfaces unlettered|otherwise unlettered surfaces/i);
  }
});

test('both provider prompts lock each named character wardrobe colors across panel styles', () => {
  for (const prompt of [buildChatGptPrompt(), buildGeminiPrompt()]) {
    assert.match(prompt, /CROSS-PANEL WARDROBE COLOR LOCK/);
    if (prompt.includes('CROSS-PANEL WARDROBE COLOR LOCK: fix garment items/colors once;')) {
      assert.match(prompt, /fix garment items\/colors once; reuse in all panels; style and lighting never change canonical wardrobe/);
    } else {
      assert.match(prompt, /choose each named character's (?:concrete )?garment items, base colors, accent colors, material, and pattern once/i);
      assert.match(prompt, /reuse that exact wardrobe assignment in every later panel/i);
      assert.match(prompt, /PANEL STYLE LOCK.*(?:background|environment).*VFX.*rendering treatment/i);
      assert.match(prompt, /keep every (?:named character's )?garment item and (?:its|their) colors unchanged/i);
      assert.match(prompt, /lighting may change highlights and shadows, but the garment's canonical base and accent colors remain recognizable/i);
    }
    assert.doesNotMatch(
      prompt,
      /remove (?:that character's )?garments/i,
      'wardrobe continuity must use positive keep-language so image safety does not misread a negated undressing instruction'
    );
    assert.doesNotMatch(prompt, /PANEL STYLE LOCK:[^\n]*linework, palette, shading/i);
    assert.match(prompt, /PANEL STYLE LOCK:[^\n]*(?:preserve identity and canonical wardrobe|apply global style QA)/i);
  }
});

test('ChatGPT Web prompt has generic quality locks for dialogue, bubbles, characters, and key props', () => {
  const prompt = buildChatGptPrompt();

  assert.match(prompt, /STRICT SCRIPT LOCK/);
  assert.match(prompt, /Top title EXACTLY "Generic Product Panic!\?"/);
  assert.match(prompt, /KEY PROP \/ OBJECT CONSISTENCY/);
  assert.match(prompt, /DIALOGUE \/ BUBBLE QA LOCK/);
  assert.match(prompt, /CHARACTER QA(?: PASS)?/);
  assert.match(prompt, /ART-STYLE DIFFERENCE QA LOCK/);
  assert.match(prompt, /MANGA FINISH ASSIST|FINISH: bubbles, anatomy/);
  assert.match(prompt, /SAFE VISUAL CONTENT LOCK|SAFE VISUAL:/);
  assert.match(prompt, /No horror\/gore\/blood, body interiors, organs\/viscera\/brain\/flesh\/living tissue|no gore\/blood\/(?:body interiors\/)?organs\/flesh\/organic horror/i);
  assert.doesNotMatch(prompt, /PANEL STYLE LOCK: HORROR|dark horror manga style/i);
  assert.match(prompt, /PANEL STYLE LOCK: GEKIGA/i);
  assert.match(prompt, /preserve script\/cast\/(?:dialogue\/)?camera\/layout/i);
  assert.match(prompt, /keep bubble space|FINISH: bubbles, anatomy/i);
  assert.match(prompt, /cast\/background light and color|setting or scripted abstraction/i);
  assert.match(prompt, /\banatomy\b/i);
  assert.match(prompt, /setting depth|retain setting\/depth|keep setting\/depth/i);
  assert.match(prompt, /CLOTHING FOLD SHADOW ASSIST|FOLD SHADOWS:/);
  assert.match(prompt, /overlapping, pinched, and intersecting fabric folds|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /wedge-shaped triangular cel-shaded shadow planes|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /distinct small dark triangular fill at each selected crease junction|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /not printed patterns or random geometric marks|no geometric patterns/i);
  assert.match(prompt, /PANEL-BY-PANEL CLOTHING FOLD PRIORITY|FOLD PRIORITY:/);
  assert.match(prompt, /2-4 distinct small dark triangular shadow fills|2-4 dark triangular crease shadows/i);
  assert.match(prompt, /Draw in a high-budget, chic and cinematic full-color TV anime style|Chic cinematic full-color TV anime/);
  assert.match(prompt, /official Japanese animation illustration|polished Japanese animation finish/);
  assert.doesNotMatch(prompt, /Base style: full-color TV anime/);
  assert.match(prompt, /immutable typeset layer.*compare every glyph|BUBBLE QA: immutable TEXT.*compare every glyph/i);
  assert.match(prompt, /bubble tail tip must terminate at its assigned speaker's mouth\/head silhouette|mapped tails/i);
  assert.match(prompt, /hair color, hairstyle, eye color, glasses status, skin tone, outfit|CHARACTER QA: preserve identity/i);
  assert.match(prompt, /ART-STYLE DIFFERENCE QA LOCK:.*linework/i);
  assert.match(prompt, /no numeric (?:change )?quota/i);
  assert.match(prompt, /pose, expression, saturation, glow, or speed lines alone are insufficient|not only expression\/VFX/i);
  assert.doesNotMatch(prompt, /canned pudding|bottled drink/i);
});

test('API and Web final prompt locks single-bubble tails to the mapped speaker endpoint', () => {
  const prompt = buildChatGptPrompt();

  assert.match(prompt, /B1=>\[Hero\] mouth\/head/);
  assert.match(prompt, /B1=>\[Friend\] mouth\/head/);
  assert.match(prompt, /proximity never reassigns/);
  assert.match(prompt, /SINGLE BUBBLE:[^\n]*(?:speaker side|speaker-side)[^\n]*(?:(?:shortest|short)[^\n]*tail|TAIL GEOMETRY:[^\n]*shortest unobstructed route to mapped mouth\/head)/i);
  assert.match(prompt, /MULTIPLE BUBBLES:[^\n]*B1 rightmost[^\n]*later (?:bubbles )?strictly left/i);
  assert.match(prompt, /DRAW BALLOON BODIES BEFORE ACTORS:[^\n]*x=0 left,100 right[^\n]*freeze (?:balloon bodies at )?numeric slots/i);
  assert.equal((prompt.match(/DRAW BALLOON BODIES BEFORE ACTORS:/g) || []).length, 1);
  assert.doesNotMatch(prompt, /DRAW BODIES BEFORE ART/i);
});

test('Gemini prompt has stability locks for dialogue duplication, invented cast, and dark-style shadow interpretation', () => {
  const prompt = buildGeminiPrompt();

  assert.match(prompt, /Generated by Gemini with Super FURU AI 4-koma v4\.8\.2-test/);
  assert.match(prompt, /GEMINI STABILITY \/ QUALITY LOCK/);
  assert.match(prompt, /MANGA FINISH ASSIST: preserve script\/cast\/camera\/layout; keep bubble space/i);
  assert.match(prompt, /Do NOT invent a new dominant person, black silhouette, monster, ghost, mascot, presenter, antagonist, or narrator figure/i);
  assert.match(prompt, /draw lighting\/shadow ON that existing named character/i);
  assert.match(prompt, /Do NOT duplicate a line, split one line into repeated bubbles, add new warning phrases, or create extra bubbles/i);
  assert.match(prompt, /Do NOT normalize punctuation/i);
  assert.match(prompt, /Preserve the selected scenario style and each PANEL STYLE LOCK/i);
  assert.match(prompt, /MANGA FINISH ASSIST/);
  assert.match(prompt, /SAFE VISUAL CONTENT LOCK/);
  assert.match(prompt, /No horror\/gore\/blood, body interiors, organs\/viscera\/brain\/flesh\/living tissue/i);
  assert.doesNotMatch(prompt, /PANEL STYLE LOCK: HORROR|dark horror manga style/i);
  assert.match(prompt, /PANEL STYLE LOCK: GEKIGA/i);
  assert.match(prompt, /preserve script\/cast\/camera\/layout/i);
  assert.match(prompt, /keep bubble space/i);
  assert.match(prompt, /cast\/background light and color/i);
  assert.match(prompt, /coherent anatomy/i);
  assert.match(prompt, /setting depth/i);
  assert.match(prompt, /CLOTHING FOLD SHADOW ASSIST/);
  assert.match(prompt, /overlapping, pinched, and intersecting fabric folds/i);
  assert.match(prompt, /wedge-shaped triangular cel-shaded shadow planes/i);
  assert.match(prompt, /distinct small dark triangular fill at each selected crease junction/i);
  assert.match(prompt, /not printed patterns or random geometric marks/i);
  assert.match(prompt, /PANEL-BY-PANEL CLOTHING FOLD PRIORITY/);
  assert.match(prompt, /2-4 distinct small dark triangular shadow fills/i);
  assert.doesNotMatch(prompt, /Japanese dialogue MUST end with a period/i);
  assert.doesNotMatch(prompt, /accurately reflect classic anime styles/i);
  assert.doesNotMatch(prompt, /デザイン募集|著作権|クッキー|現金/);
});
