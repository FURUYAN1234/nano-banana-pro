import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { EMOTION_STYLES, COMPACT_EMOTION_STYLES } from '../src/lib/constants.js';

let server;
let buildMangaPrompt;

// The shared output ceiling follows GPT Image API, not the browser paste threshold.
const EMPIRICAL_CHATGPT_WEB_COPY_SOFT_BUDGET_CHARS = 32000;

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

test('every selectable non-default color style has a concrete budget-safe recipe', () => {
  for (const style of Object.keys(EMOTION_STYLES).filter(style => style !== 'NORMAL')) {
    assert.ok(COMPACT_EMOTION_STYLES[style]?.length > 50, `missing drawing recipe for ${style}`);
  }
});

test('budget compression preserves executable style recipes, not just style names', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: buildScenarioWithEmotions(['GEKIGA', 'SHOUJO', 'WATERCOLOR', 'CHIBI_GAG']),
      castList: CAST_LIST + ' stable identity detail'.repeat(400),
      colorMode: 'color', providerFamily, punchlineType: 'Auto', systemVersion: 'test'
    });
    assert.match(prompt, /Style:.*carved facial planes.*brow.*cheek.*jaw/i);
    assert.match(prompt, /Style:.*delicate thin linework/i);
    assert.match(prompt, /Style:.*transparent color washes/i);
    assert.match(prompt, /Style:.*chibi.*Camera\/Action.*gaze/i);
    assert.match(prompt, /selected recipe overrides default rendering/i);
    assert.doesNotMatch(prompt, /ALL characters.*2-3|dot-like eyes|Characters look older/i);
    if (providerFamily === 'chatgpt') assert.ok(prompt.length <= 32000);
  }
});

test('monochrome preserves strong facial drawing and camera-first chibi interpretation', () => {
  const prompt = buildMangaPrompt({
    scenario: buildScenarioWithEmotions(['GEKIGA', 'SHOUJO', 'WATERCOLOR', 'CHIBI_GAG']),
    castList: CAST_LIST, colorMode: 'monochrome', providerFamily: 'chatgpt', punchlineType: 'Auto'
  });
  assert.match(prompt, /GEKIGA;.*carved facial planes.*brow.*cheek.*jaw/i);
  assert.match(prompt, /CHIBI_GAG;.*Camera\/Action.*gaze/i);
  assert.match(prompt, /Explicit user proportions win/i);
  assert.doesNotMatch(prompt, /dot eyes|exaggerated tiny limbs|Use 7-8 head proportions/i);
});

const CAST_LIST = `
## 繝溘け
- blonde hair
## 繝ｪ繝ｳ
- brown hair, glasses
## 繧ｵ繧ｨ繧ｳ
- black hair
`;

const buildScenarioWithEmotions = (emotions) => `
## 繧ｿ繧､繝医Ν: 菴憺｢ｨ衝突チェック!?
Location: 古い電器店街
Outfit: business casual

[1コマ目: 起]
[EMOTION: ${emotions[0]}]
繝溘け「始まったよ。」
Action: 背景の店頭ポスターと棚が絵柄テスト用に見えている。
[2コマ目: 承]
[EMOTION: ${emotions[1]}]
繝ｪ繝ｳ「質感を見たいね。」
Action: 背景に照明と奥行きがある。
[3コマ目: 転]
[EMOTION: ${emotions[2]}]
繧ｵ繧ｨ繧ｳ「禁止文に負けるな。」
Action: 店内の壁面と商品箱が大きく映る。
[4コマ目: 結]
[EMOTION: ${emotions[3]}]
繝溘け「効いてる。」
Action: 背景の看板と空気感が最後の確認対象になる。
`;

test('selected texture-driven styles add compact panel exceptions to the final ChatGPT prompt', () => {
  const prompt = buildMangaPrompt({
    scenario: buildScenarioWithEmotions(['RETRO', 'POP_ART', 'WATERCOLOR', 'SKETCH']),
    castList: CAST_LIST,
    colorMode: 'color',
    providerFamily: 'chatgpt',
    punchlineType: 'Auto',
    systemVersion: 'v4.8.2-test'
  });

  assert.match(prompt, /CLEAN SURFACE PROTOCOL:.*panel style exception|CLEAN: no noise except style exceptions/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional halftone\/screentone on backgrounds and retro panel borders only/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional Ben-Day dots and retro print texture only/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional watercolor wash and paper grain only/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional pencil grain, rough hatching, and construction lines only/i);
  assert.equal((prompt.match(/PANEL STYLE LOCK:/g) || []).length, 4);
  for (const style of ['RETRO', 'POP_ART', 'WATERCOLOR', 'SKETCH']) {
    assert.ok(prompt.includes(`PANEL STYLE LOCK: ${style};`));
  }
  assert.match(prompt, /ART-STYLE DIFFERENCE QA LOCK:.*linework/i);
  assert.match(prompt, /no numeric (?:change )?quota/i);
  assert.doesNotMatch(prompt, /Change at least three visual axes/i);
  assert.ok(
    prompt.length <= EMPIRICAL_CHATGPT_WEB_COPY_SOFT_BUDGET_CHARS,
    `expected prompt to stay within the empirical Web-copy soft budget (${EMPIRICAL_CHATGPT_WEB_COPY_SOFT_BUDGET_CHARS.toLocaleString()} chars), got ${prompt.length}`
  );
});

test('selected light and motion styles keep their intended effects without global-noise ambiguity', () => {
  const prompt = buildMangaPrompt({
    scenario: buildScenarioWithEmotions(['GLITTER', 'NEON', 'SPEED', 'SUMI_INK']),
    castList: CAST_LIST,
    colorMode: 'color',
    providerFamily: 'gemini',
    punchlineType: 'Auto',
    systemVersion: 'v4.8.2-test'
  });

  assert.match(prompt, /STYLE EXCEPTION: controlled sparkle highlights and aura around the acting character only/i);
  assert.match(prompt, /STYLE EXCEPTION: controlled neon glow, bloom, lens flare, and wet reflections only/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional directional speed lines and motion streaks only/i);
  assert.match(prompt, /STYLE EXCEPTION: intentional sumi ink splashes, brush strokes, and ink wash only/i);
  for (const style of ['GLITTER', 'NEON', 'SPEED', 'SUMI_INK']) {
    assert.ok(prompt.includes(`PANEL STYLE LOCK: ${style}; use the selected style recipe below; preserve identity and canonical wardrobe.`));
  }
  assert.doesNotMatch(prompt, /Change at least three visual axes/i);
  assert.doesNotMatch(prompt, /STYLE EXCEPTION:[^\n]{220,}/);
});

test('free-form emotion descriptors are normalized to strong panel style locks', () => {
  const prompt = buildMangaPrompt({
    scenario: buildScenarioWithEmotions(['HYPER-ANTICIPATION', 'PANIC+GROTESQUE', 'EXTREME FROZEN+ABSURD', 'SHOCK+ABSURD']),
    castList: CAST_LIST,
    colorMode: 'color',
    providerFamily: 'chatgpt',
    punchlineType: 'Auto',
    systemVersion: 'v4.8.2-test'
  });

  assert.match(prompt, /PANEL STYLE LOCK: GLITTER;/);
  assert.match(prompt, /PANEL STYLE LOCK: GEKIGA;/);
  assert.doesNotMatch(prompt, /PANEL STYLE LOCK: HORROR|dark horror manga style/i);
  assert.match(prompt, /PANEL STYLE LOCK: BLANK;/);
  assert.match(prompt, /PANEL STYLE LOCK: IMPACT;/);
});
