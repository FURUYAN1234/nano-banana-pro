import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { EMOTION_STYLES, COMPACT_EMOTION_STYLES } from '../src/lib/constants.js';

let server;
let buildMangaPrompt;
let buildMangaPromptArtifact, validateMangaPromptArtifact;

// The shared output ceiling follows GPT Image API, not the browser paste threshold.
const EMPIRICAL_CHATGPT_WEB_COPY_SOFT_BUDGET_CHARS = 32000;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildMangaPrompt, buildMangaPromptArtifact, validateMangaPromptArtifact } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

test('source protection retains panel-first art direction for both providers and media', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const options = { scenario: buildScenarioWithEmotions(['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']),
        castList: CAST_LIST, colorMode, providerFamily, punchlineType: 'Auto', systemVersion: 'test' };
      const prompt = buildMangaPrompt(options);
      assert.match(prompt, /PANEL-FIRST ART DIRECTION:/);
      const firstPanel = prompt.indexOf('## Panel 1');
      const finishing = providerFamily === 'chatgpt' ? prompt.indexOf('OUTPUT: Single image.') : prompt.lastIndexOf('\nStyle:');
      assert.ok(firstPanel >= 0 && finishing > firstPanel, providerFamily + '/' + colorMode);
      assert.ok(prompt.indexOf('## Panel 4') < finishing);
      if (colorMode === 'monochrome' || providerFamily === 'chatgpt') {
        assert.ok(prompt.indexOf('## Panel 4') < prompt.indexOf('STRICT SCRIPT LOCK:'), 'OpenAI and monochrome drawing brief must precede global audit prose');
      } else {
        assert.ok(prompt.indexOf('STRICT SCRIPT LOCK:') < firstPanel, 'Gemini color ordering stays unchanged');
      }
      const locked = buildMangaPrompt({ ...options, punchlineType: 'SeriousDocumentary' });
      assert.doesNotMatch(locked, /PANEL-FIRST ART DIRECTION:/);
    }
  }
});

test('review artifact protects scoped script, style and skin after budget and safety processing', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const options = { scenario: buildScenarioWithEmotions(['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']),
        castList: CAST_LIST, colorMode, providerFamily, punchlineType: 'Auto', systemVersion: 'test', cinematicTechniques: false };
      const artifact = buildMangaPromptArtifact(options);
      assert.equal(validateMangaPromptArtifact(artifact.prompt, artifact).valid, true);
      assert.equal(validateMangaPromptArtifact(artifact.prompt + '\nREVIEW NOTE: Keep existing action.', artifact).valid, true);
      for (const block of artifact.protectedBlocks) {
        assert.equal(validateMangaPromptArtifact(artifact.prompt.replace(block.text, ''), artifact).valid, false, block.text);
      }
      const camera = artifact.protectedBlocks.find(block => block.panel === 3 && block.text.startsWith('Camera:'));
      const moved = artifact.prompt.replace(camera.text, '').replace('## Panel 4', `## Panel 4\n${camera.text}`);
      assert.equal(validateMangaPromptArtifact(moved, artifact).valid, false);
      assert.equal(validateMangaPromptArtifact(artifact.prompt.replace('## Panel 3', '## Panel 4'), artifact).valid, false);
      assert.equal(validateMangaPromptArtifact(artifact.prompt.replace('## Panel 4', '## Panel 3\n## Panel 4'), artifact).valid, false);
      assert.equal(validateMangaPromptArtifact(artifact.prompt.replace(camera.text, `${camera.text}\n${camera.text}`), artifact).valid, false);
      assert.doesNotMatch(artifact.prompt, /__DIALOGUE_LITERAL_/);
      assert.equal((artifact.prompt.match(/NON-VISIBLE CASTING(?: CONSTRAINT)?:/g) || []).length, 1);
    }
  }
});

after(async () => {
  await server?.close();
});

test('panel recipes can redraw reference facial rendering without changing identity or camera', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario: buildScenarioWithEmotions(['NORMAL', 'IMPACT', 'GEKIGA', 'IMPACT']), castList: CAST_LIST, colorMode: 'color', providerFamily, punchlineType: 'Auto', systemVersion: 'test' });
    if (providerFamily === 'chatgpt') {
      assert.match(prompt, /Preserve gaze and emotional intent, not reference facial geometry/);
      assert.match(prompt, /Redraw eyes, nose, mouth and jaw in each panel's medium/);
      assert.match(prompt, /linework\/folds follow panel medium, not fixed anime/);
      assert.match(prompt, /Same face means same identity, not retained anime proportions/);
      assert.match(prompt, /Keep identity\/age and scripted emotion\/gaze\/pose\/Camera/);
    } else {
      assert.match(prompt, /Identity from refs; facial construction\/ink\/shading from panel recipe/);
      assert.match(prompt, /Redraw visible faces with small realistic eyes/);
    }
    assert.match(prompt, /Keep Camera\/Action\/identity\/age\/wardrobe/);
  }
});

test('the visually verified gekiga facial anatomy survives providers, media and prompt budgets', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      for (const promptMaxChars of [24000, 32000]) {
        const options = { scenario: buildScenarioWithEmotions(['NORMAL', 'GEKIGA', 'NORMAL', 'NORMAL']),
          castList: CAST_LIST, colorMode, providerFamily, promptMaxChars, punchlineType: 'Auto', systemVersion: 'test' };
        const prompt = buildMangaPrompt(options);
        const faceRecipe = prompt.split('## Panel 2')[1].split('## Panel 3')[0];
        assert.match(faceRecipe, /Redraw visible faces with small realistic eyes\/irises/i);
        assert.match(faceRecipe, /heavy anatomical eyelids/i);
        assert.match(faceRecipe, /pronounced nose bridges/i);
        assert.match(faceRecipe, /carved cheek\/jaw planes/i);
        assert.match(faceRecipe, /identity\/age/i);
        assert.match(faceRecipe, /ink|crosshatching/i);
        assert.match(faceRecipe, /Camera|camera/);
        const locked = buildMangaPrompt({ ...options, punchlineType: 'SeriousDocumentary' });
        assert.doesNotMatch(locked, /Redraw visible faces with small realistic eyes/i);
      }
    }
  }
  assert.match(COMPACT_EMOTION_STYLES.GEKIGA, /Redraw visible faces with small realistic eyes/i);
  const fullPage = buildMangaPrompt({ scenario: buildScenarioWithEmotions(Array(4).fill('GEKIGA')),
    castList: CAST_LIST, colorMode: 'color', providerFamily: 'chatgpt', promptMaxChars: 24000,
    punchlineType: 'Auto', systemVersion: 'test' });
  assert.equal((fullPage.match(/Redraw visible faces with small realistic eyes/g) || []).length, 4);
  assert.equal((fullPage.match(/not anime faces with gritty backgrounds/g) || []).length, 4);
  assert.ok(fullPage.length <= 24000);
});

test('color anime fallback belongs only to effective NORMAL panels, never the page', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const promptMaxChars of [24000, 32000]) {
      for (const emotions of [Array(4).fill('NORMAL'), ['NORMAL', 'GEKIGA', 'WATERCOLOR', 'CHIBI_GAG'], Array(4).fill('GEKIGA')]) {
        const prompt = buildMangaPrompt({ scenario: buildScenarioWithEmotions(emotions), castList: CAST_LIST,
          providerFamily, colorMode: 'color', promptMaxChars, punchlineType: 'Auto', systemVersion: 'test' });
        const animeDefaults = prompt.match(/^.*(?:TV anime style|clean anime illustration background|smooth cel shading).*$/gm) || [];
        assert.equal(animeDefaults.length, emotions.filter(style => style === 'NORMAL').length);
        for (const line of animeDefaults) assert.match(line, /^NORMAL PANEL RENDERING:/);
        const sections = prompt.split(/^## Panel \d+\s*$/m).slice(1);
        for (let index = 0; index < 4; index++) {
          assert.equal(sections[index].includes('NORMAL PANEL RENDERING:'), emotions[index] === 'NORMAL');
        }
      }
    }
  }
});

test('local color fallback retains unmarked and serious suppressed-chibi defaults without changing reference or ink modes', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const options = { scenario: buildScenarioWithEmotions(Array(4).fill('NORMAL')).replaceAll('[EMOTION: NORMAL]', ''),
      castList: CAST_LIST, providerFamily, colorMode: 'color', punchlineType: 'Auto', systemVersion: 'test' };
    assert.equal((buildMangaPrompt(options).match(/^NORMAL PANEL RENDERING:/gm) || []).length, 4);
    const serious = buildMangaPrompt({ ...options, scenario: buildScenarioWithEmotions(Array(4).fill('CHIBI_GAG')), punchlineType: 'SeriousAuto' });
    assert.equal((serious.match(/^NORMAL PANEL RENDERING:/gm) || []).length, 4);
    assert.match(serious, /SERIOUS PANEL ACTING ONLY:/);
    for (const overrides of [{ colorMode: 'monochrome' }, { punchlineType: 'SeriousDocumentary' }]) {
      assert.doesNotMatch(buildMangaPrompt({ ...options, ...overrides }), /NORMAL PANEL RENDERING:/);
    }
  }
});

test('every selectable non-default color style has a concrete budget-safe recipe', () => {
  for (const style of Object.keys(EMOTION_STYLES).filter(style => style !== 'NORMAL')) {
    assert.ok(COMPACT_EMOTION_STYLES[style]?.length > 50, `missing drawing recipe for ${style}`);
  }
});

test('panel art direction precedes shared finish rules without duplicating or dropping the storyboard', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      const prompt = buildMangaPrompt({ scenario: buildScenarioWithEmotions(['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']), castList: CAST_LIST, colorMode, providerFamily, punchlineType: 'Auto', systemVersion: 'test' });
      assert.match(prompt, /PANEL-FIRST ART DIRECTION:/);
      assert.ok(prompt.indexOf('## Panel 1') < prompt.indexOf('FOCAL READABILITY:'));
      if (colorMode === 'monochrome') {
        const panel3 = prompt.split('## Panel 3')[1].split('## Panel 4')[0];
        const panel4 = prompt.split('## Panel 4')[1];
        assert.match(panel3, /MONOCHROME PANEL STYLE LOCK: GEKIGA;/);
        assert.match(panel4, /MONOCHROME PANEL STYLE LOCK: CHIBI_GAG;/);
        assert.match(panel3, /Camera:.*\n[\s\S]*Action/);
        assert.ok(prompt.indexOf('[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]') < prompt.indexOf('## Panel 1'), 'white-paper medium must remain explicit before the storyboard');
        assert.equal((prompt.match(/\[ MONOCHROME THREE-TONE MANUSCRIPT LOCK \]/g) || []).length, 1);
        assert.match(prompt, /Selected panel recipes override default linework and facial construction|Panel recipes override default strokes\/faces/);
      }
      assert.equal((prompt.match(/^## Panel [1-4]/gm) || []).length, 4);
      for (const style of ['WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']) {
        assert.match(prompt, new RegExp(`PANEL STYLE LOCK: ${style};`));
        assert.equal((prompt.match(new RegExp(`PANEL STYLE LOCK: ${style};`, 'g')) || []).length, 1);
      }
      assert.match(prompt, /TEXT \(PRINT VALUES ONLY\)/);
      assert.match(prompt, /IDENTITY CONTINUITY:/);
      assert.match(prompt, /HAND \/ PROP KINEMATICS LOCK:/);
    }
  }
});

test('budget compression preserves executable style recipes, not just style names', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario: buildScenarioWithEmotions(['GEKIGA', 'SHOUJO', 'WATERCOLOR', 'CHIBI_GAG']),
      castList: CAST_LIST + ' stable identity detail'.repeat(400),
      colorMode: 'color', providerFamily, punchlineType: 'Auto', systemVersion: 'test'
    });
    assert.match(prompt, providerFamily === 'chatgpt'
      ? /Style:.*Redraw visible faces.*small realistic eyes\/irises.*nose bridges.*cheek\/jaw.*solid-black shadow planes.*crosshatching ON faces\/hands/i
      : /Style:.*Redraw visible faces.*heavy anatomical eyelids.*cheek\/jaw/i);
    assert.match(prompt, /Style:.*delicate thin linework/i);
    assert.match(prompt, /Style:.*transparent color washes/i);
    assert.match(prompt, /Style:.*chibi.*Camera\/Action.*gaze/i);
    if (providerFamily === 'chatgpt') {
      assert.match(prompt, /Preserve gaze and emotional intent, not reference facial geometry/);
      assert.match(prompt, /Redraw eyes, nose, mouth and jaw in each panel's medium/);
      assert.match(prompt, /linework\/folds follow panel medium, not fixed anime/);
      assert.match(prompt, /Same face means same identity, not retained anime proportions/);
      assert.match(prompt, /Keep identity\/age and scripted emotion\/gaze\/pose\/Camera/);
    } else {
      assert.match(prompt, /facial construction\/ink\/shading from panel recipe/i);
      assert.match(prompt, /Identity from refs/i);
      assert.match(prompt, /G-pen.*subordinate to the panel recipe/i);
      assert.match(prompt, /Keep recognizable identity\/age, scripted gaze, Camera\/Action and body acting|keep identity\/age\/color, gaze and Camera\/Action/i);
    }
    assert.doesNotMatch(prompt, /narrow natural eyes/);
    assert.match(prompt, /Keep Camera\/Action\/identity\/age\/wardrobe/);
    assert.doesNotMatch(prompt, /ALL characters.*2-3|dot-like eyes|Characters look older/i);
    if (providerFamily === 'chatgpt') assert.ok(prompt.length <= 32000);
  }
});

test('panel-first presentation does not invent style switches for normal or reference-locked pages', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    for (const colorMode of ['color', 'monochrome']) {
      for (const punchlineType of ['Auto', 'SeriousDocumentary']) {
        const prompt = buildMangaPrompt({
          scenario: buildScenarioWithEmotions(punchlineType === 'SeriousDocumentary'
            ? ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG']
            : ['NORMAL', 'NORMAL', 'NORMAL', 'NORMAL']),
          castList: CAST_LIST, colorMode, providerFamily, punchlineType, systemVersion: 'test'
        });
        assert.doesNotMatch(prompt, /PANEL-FIRST ART DIRECTION:/);
        assert.equal((prompt.match(/^## Panel [1-4]/gm) || []).length, 4);
        assert.match(prompt, /TEXT \(PRINT VALUES ONLY\)/);
        assert.doesNotMatch(prompt, /^P\d+\nMONOCHROME PANEL STYLE LOCK:/m);
      }
    }
  }
});

test('monochrome preserves strong facial drawing and camera-first chibi interpretation', () => {
  const prompt = buildMangaPrompt({
    scenario: buildScenarioWithEmotions(['GEKIGA', 'SHOUJO', 'WATERCOLOR', 'CHIBI_GAG']),
    castList: CAST_LIST, colorMode: 'monochrome', providerFamily: 'chatgpt', punchlineType: 'Auto'
  });
  assert.match(prompt, /GEKIGA;.*small realistic eyes\/irises.*heavy anatomical eyelids.*pronounced nose bridges.*carved cheek\/jaw/i);
  assert.match(prompt, /CHIBI_GAG;.*Camera\/Action.*gaze/i);
  assert.match(prompt, /Explicit user proportions win/i);
  assert.match(prompt, /CHIBI: Explicit user proportions win; otherwise retain shortened body and enlarged head within the requested Camera\/Action/);
  assert.doesNotMatch(prompt, /camera\/acting\/expression before chibi degree/);
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
