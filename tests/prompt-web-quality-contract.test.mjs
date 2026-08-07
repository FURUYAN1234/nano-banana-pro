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

test('both provider prompts require rich physical settings without obscuring the cast', () => {
  for (const prompt of [buildChatGptPrompt(), buildGeminiPrompt()]) {
    assert.match(prompt, /RICH PANEL COMPOSITION \/ CHARACTER CLARITY LOCK/);
    assert.match(prompt, /one fixed environmental anchor plus at least two additional physical setting cues|1 fixed anchor \+ 2 physical setting cues/i);
    assert.match(prompt, /VFX[^\n]*(?:overlays|overlay)[^\n]*never replace[^\n]*(?:physical )?setting/i);
    assert.match(prompt, /face, eye direction, silhouette, hands, and key action|face, eyes, silhouette, hands and action stay crisp/i);
    assert.match(prompt, /background detail[^\n]*lower contrast[^\n]*softer edges|background (?:stays )?rich but softer(?: and|\/)lower contrast/i);
    assert.match(prompt, /blank walls, flat gradients(?:,| or) black voids/i);
  }
});

test('both provider prompts lock each named character wardrobe colors across panel styles', () => {
  for (const prompt of [buildChatGptPrompt(), buildGeminiPrompt()]) {
    assert.match(prompt, /CROSS-PANEL WARDROBE COLOR LOCK/);
    assert.match(prompt, /choose each named character's (?:concrete )?garment items, base colors, accent colors, material, and pattern once/i);
    assert.match(prompt, /reuse that exact wardrobe assignment in every later panel/i);
    assert.match(prompt, /PANEL STYLE LOCK.*(?:background|environment).*VFX.*rendering treatment/i);
    assert.match(prompt, /must not recolor, replace, add, or remove (?:that character's )?garments/i);
    assert.match(prompt, /lighting may change highlights and shadows, but the garment's canonical base and accent colors remain recognizable/i);
    assert.doesNotMatch(prompt, /PANEL STYLE LOCK:[^\n]*linework, palette, shading/i);
    assert.match(prompt, /PANEL STYLE LOCK:[^\n]*linework, environmental palette, shading/i);
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
  assert.match(prompt, /cast\/background light and color|background (?:stays )?rich|physical setting cues/i);
  assert.match(prompt, /\banatomy\b/i);
  assert.match(prompt, /setting depth|background (?:stays )?rich|physical setting cues/i);
  assert.match(prompt, /CLOTHING FOLD SHADOW ASSIST|FOLD SHADOWS:/);
  assert.match(prompt, /overlapping, pinched, and intersecting fabric folds|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /wedge-shaped triangular cel-shaded shadow planes|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /distinct small dark triangular fill at each selected crease junction|FOLD SHADOWS: crisp triangular overlap shadows/i);
  assert.match(prompt, /not printed patterns or random geometric marks|no geometric patterns/i);
  assert.match(prompt, /PANEL-BY-PANEL CLOTHING FOLD PRIORITY|FOLD PRIORITY:/);
  assert.match(prompt, /2-4 distinct small dark triangular shadow fills|2-4 dark triangular crease shadows/i);
  assert.match(prompt, /Draw in a high-budget, chic and cinematic full-color TV anime style/);
  assert.match(prompt, /official Japanese animation illustration/);
  assert.doesNotMatch(prompt, /Base style: full-color TV anime/);
  assert.match(prompt, /one character, punctuation mark, added word, omitted word, or speaker|BUBBLE QA: copy TEXT exactly/i);
  assert.match(prompt, /bubble tail tip must terminate at its assigned speaker's mouth\/head silhouette|tails? touch (?:mapped )?speaker mouth\/head/i);
  assert.match(prompt, /hair color, hairstyle, eye color, glasses status, skin tone, outfit|CHARACTER QA: preserve identity/i);
  assert.match(prompt, /at least three of linework, environmental palette, shading, background\/VFX, texture\/surface treatment/i);
  assert.match(prompt, /same clean anime style with only pose, expression, saturation, glow, or speed lines changed/i);
  assert.doesNotMatch(prompt, /canned pudding|bottled drink/i);
});

test('Gemini prompt has stability locks for dialogue duplication, invented cast, and dark-style shadow interpretation', () => {
  const prompt = buildGeminiPrompt();

  assert.match(prompt, /Generated by Gemini with Super FURU AI 4-koma v4\.8\.2-test/);
  assert.match(prompt, /GEMINI STABILITY \/ QUALITY LOCK/);
  assert.match(prompt, /richer professional manga finish than a flat template/i);
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
