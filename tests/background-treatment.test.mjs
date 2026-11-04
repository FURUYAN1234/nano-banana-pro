import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, Step4Panel, background, buildMangaPrompt, experimental;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
  background = await server.ssrLoadModule('/src/lib/render-options.js');
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  experimental = await server.ssrLoadModule('/src/lib/experimental-manga.js');
});
after(async () => { await server?.close(); });

const prompt = '  手編集した指示\n[API IMAGE REFERENCE ROLES]\nImage 1: keep the station clock.\nDo not print this reference manifest in the image.\n\n';
const render = (text, extra) => renderToStaticMarkup(React.createElement(Step4Panel, {
  currentStep: 3, selectedEngine: 'gemini', genLog: [], webCopyPartLengths: [],
  policyPromptHistory: [], policyErrorMsg: '', scenario: '', finalPrompt: text,
  prepareWebCopyPrompt: value => value, setFinalPrompt: () => {}, ...extra,
}));
const checkbox = html => html.match(/<input\b(?=[^>]*id="simplify-manga-background")[^>]*>/)?.[0];

test('the final prompt offers an initially unchecked background treatment and locks it during image generation', () => {
  const initial = checkbox(render(prompt));
  assert.ok(initial, 'STEP4 must render the optional background checkbox');
  assert.doesNotMatch(initial, /checked|disabled/);
  const active = checkbox(render(background.setMangaBackgroundSimplification(prompt, true), { isGeneratingImage: true }));
  assert.match(active, /checked/);
  assert.match(active, /disabled/);
});

test('toggling adds only background direction and restores the edited prompt exactly', () => {
  const { setMangaBackgroundSimplification: toggle, hasMangaBackgroundSimplification: has } = background;
  assert.equal(toggle(prompt, false), prompt);
  assert.equal(toggle('', true), '');
  assert.equal(has(prompt), false);
  const enabled = toggle(prompt, true);
  assert.equal(has(enabled), true);
  assert.match(enabled, /BACKGROUND SIMPLIFICATION/);
  assert.ok(enabled.startsWith('[MANGA BACKGROUND SIMPLIFICATION]'));
  assert.ok(enabled.endsWith(prompt));
  assert.equal(toggle(enabled, true), enabled);
  const edited = enabled.replace('手編集した指示', 'さらに編集した指示');
  assert.equal(toggle(edited, false), prompt.replace('手編集した指示', 'さらに編集した指示'));
  assert.equal(toggle(enabled.replace(/\n/g, '\r\n'), false), prompt.replace(/\n/g, '\r\n'));
});

test('background mode preserves story instructions and restores original text when disabled', () => {
  const { setMangaBackgroundSimplification: toggle } = background;
  for (const original of [
    'FOCAL READABILITY: Keep setting texture/shadow depth.\n## Panel 4\nAction: intricate wallpaper.\nDialogue: "その模様が手がかりだ。"',
    'SCENE LETTERING: No censoring/blanking/simplifying just for unscripted text.\r\n## Panel 8\r\n看板に「出口」と書く。\r\n\r\n',
  ]) {
    const on = toggle(original, true);
    for (const line of original.split(/\r?\n/).filter(line => /^(?:Action:|Dialogue:|看板)/.test(line))) {
      assert.ok(on.includes(line), 'dialogue, required signs and hand edits must not be rewritten');
    }
    assert.equal(on.indexOf('[MANGA BACKGROUND SIMPLIFICATION]'), 0);
    assert.equal(toggle(on, false), original);
  }
});

test('legacy prefix instructions remain removable without damaging the editable prompt', () => {
  const legacy = `[MANGA BACKGROUND SIMPLIFICATION]\nReduce incidental detail.\n[END MANGA BACKGROUND SIMPLIFICATION]\n\n${prompt}`;
  assert.equal(background.hasMangaBackgroundSimplification(legacy), true);
  assert.equal(background.setMangaBackgroundSimplification(legacy, false), prompt);
});

test('ON resolves generated background conflicts locally while OFF restores both provider prompts', () => {
  const scenario = `Topic: 待ち合わせ\nLocation: 木造の待合室\n${[1, 2, 3, 4].map(n => `[${n}コマ目]\n[Camera: ローアングル]\nAction: 葵が青い鞄を持つ。壁には木目。\n葵「模様を見て」`).join('\n')}`;
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const original = buildMangaPrompt({scenario, castList:'## 葵\n黒髪の成人女性、眼鏡。', providerFamily, colorMode:'color', systemVersion:'test', punchlineType:'Auto', cinematicTechniques:false});
    const on = background.setMangaBackgroundSimplification(original, true);
    assert.doesNotMatch(on, /Keep setting texture\/shadow depth|no default blank backdrop|Do not replace a setting with a blank backdrop|No censoring\/blanking\/simplifying just for unscripted text/);
    assert.doesNotMatch(on, /^- Render a rich physical setting/m);
    assert.equal((on.match(/^BACKGROUND DESIGN FOR THIS PANEL:/gm) || []).length, 4);
    for (const line of original.split('\n').filter(line => /^(?:Action|Dialogue|Camera|CAST|ACTOR MEDIUM|Image \d|REFERENCE-SHEET)/.test(line))) {
      assert.ok(on.includes(line), `protect character, story and reference line: ${line}`);
    }
    for (const line of original.split('\n').filter(line => /^NORMAL PANEL RENDERING:/.test(line))) {
      assert.ok(on.includes(line.replace('NORMAL PANEL RENDERING:', 'NORMAL CHARACTER AND STORY-PROP RENDERING (BG MODE):')), 'retain the complete character rendering recipe while limiting its scope');
    }
    assert.doesNotMatch(on, /^NORMAL PANEL RENDERING:/m);
    assert.equal(background.setMangaBackgroundSimplification(on, false), original);
    assert.equal(background.setMangaBackgroundSimplification(on, true), on);
    const crlf = original.replace(/\n/g, '\r\n');
    assert.equal(background.setMangaBackgroundSimplification(background.setMangaBackgroundSimplification(crlf, true), false), crlf);
  }
});

test('background-rule phrases in dialogue or actions are never replaced', () => {
  const original = '## Panel 1\nDialogue: "Keep setting texture/shadow depth"\nAction: a note reads "no default blank backdrop".\nCamera: rear view';
  const on = background.setMangaBackgroundSimplification(original, true);
  for (const line of original.split('\n')) assert.ok(on.includes(line));
  assert.equal(background.setMangaBackgroundSimplification(on.replace('rear view','high angle'), false), original.replace('rear view','high angle'));
});

test('normal-character dialogue gets an abstract background while movement retains space, without confusing architectural lines with running', () => {
  const original = [
    '## Panel 1\nStyle: NORMAL\nAction: 葵が図書室で話す。\nDialogue: 「ここだよ」',
    '## Panel 2\nStyle: NORMAL\nAction: 葵と蓮が話す。\nDialogue: B1="本当？"; B2="そうだよ"',
    '## Panel 3\nStyle: NORMAL\nAction: 葵が扉へ小走りに移る。\nDialogue: B1="来て"; B2="待って"',
    '## Panel 4\nStyle: POP_ART\nAction: 書架の線が斜めに走る。葵は笑う。\nDialogue: 「まさか！」',
  ].join('\n');
  const on = background.setMangaBackgroundSimplification(original, true);
  assert.deepEqual(on.match(/BACKGROUND=(?:SPATIAL|ABSTRACT)/g),
    ['BACKGROUND=SPATIAL','BACKGROUND=ABSTRACT','BACKGROUND=SPATIAL','BACKGROUND=ABSTRACT']);
  assert.equal(background.setMangaBackgroundSimplification(on,false), original);
  assert.equal((on.match(/^Style: NORMAL$/gm)||[]).length,3);
  assert.equal((on.match(/^Style: POP_ART$/gm)||[]).length,1);
  assert.match(on,/NORMAL人物[^\n]*POPやベタ塗りへ変えない/);
});

test('quality review distinguishes intentionally sparse scenery from character deterioration', () => {
  assert.doesNotMatch(background.buildRenderOptionsQa(prompt), /BACKGROUND-ONLY MODE CHECK/);
  const qa = background.buildRenderOptionsQa(background.setMangaBackgroundSimplification(prompt, true));
  assert.match(qa, /BACKGROUND-ONLY MODE CHECK/);
  assert.match(qa, /Inspect characters separately/);
  assert.match(qa, /Hidden\/small details remain uncertain/);
  assert.match(qa, /Report both nearly unchanged detailed scenery and unintended loss of essential/);
  assert.match(qa, /Do not flag this permitted abstraction as missing scenery/);
});

test('ordinary four-panel compiler fields keep movement and medium scope for both providers', () => {
  const media = ['NORMAL','NORMAL','POP_ART','WATERCOLOR'];
  const scenario = 'Topic: 図書室\nLocation: 図書室\n' + media.map((m,i) =>
    `[${i+1}コマ目]\n[Camera: 俯瞰の引き]\n[EMOTION: ${m}]\n状況: ${i===3?'葵が扉へ歩いて移動する。':'葵と蓮が手紙を見る。'}\n葵「本当？」\n蓮「そうだよ」`).join('\n');
  for (const providerFamily of ['chatgpt','gemini']) {
    const original = buildMangaPrompt({scenario,castList:'## 葵\n黒髪。\n## 蓮\n茶髪。',providerFamily,colorMode:'color',punchlineType:'Auto',cinematicTechniques:false});
    const on = background.setMangaBackgroundSimplification(original,true);
    assert.deepEqual(on.match(/BACKGROUND=(?:SPATIAL|ABSTRACT)/g),
      ['BACKGROUND=SPATIAL','BACKGROUND=ABSTRACT','BACKGROUND=ABSTRACT','BACKGROUND=SPATIAL']);
    const pop = on.split('## Panel 3')[1].split('## Panel 4')[0];
    const direction = pop.match(/^BACKGROUND DESIGN FOR THIS PANEL:.*$/m)?.[0];
    assert.match(direction,/元のPOP_ART/);
    assert.doesNotMatch(direction,/NORMAL人物/);
    assert.equal(background.setMangaBackgroundSimplification(on,false),original);
  }
});

test('six-panel mixed-media pages receive background scope in every frame without rewriting actor recipes', async () => {
  const media=['NORMAL','WATERCOLOR','GEKIGA','SHOUJO','CHIBI_GAG','GEKIGA'];
  const scenario=media.map((style,i)=>`[${i+1}コマ目]\n[Camera: 斜め上から中景]\n[EMOTION: ${style}]\n状況: 葵と蓮が机の手紙を見る。\n葵「確認${i+1}」`).join('\n');
  const input={enabled:true,scenarioMode:'experimental-manga',scenario,castList:'## 葵\n黒髪。\n## 蓮\n茶髪。',colorMode:'color'};
  const source=experimental.readExperimentalSource(input);
  const prepared=await experimental.prepareExperimentalManga(input,async()=>JSON.stringify({count:6,layout:'hero_bottom',reason:'最後の反応を広くする',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'葵と蓮が机の手紙を見る。',dialogueIds:p.dialogueIds,breakout:null}))}));
  const on=background.setMangaBackgroundSimplification(prepared.prompt,true);
  for(let n=1;n<=6;n++) {
    const frame=on.split(`[PAGE FRAME P${n} |`)[1]?.split(`[END PAGE FRAME P${n}]`)[0];
    assert.match(frame,/BACKGROUND DESIGN FOR THIS PANEL:/,`background scope missing from P${n}`);
  }
  for(const line of prepared.prompt.split('\n').filter(line=>/^(?:FRAME MEDIUM P|ACTOR MEDIUM)/.test(line)))assert.ok(on.includes(line),'keep the complete original actor medium recipe');
  for (const frame of on.split(/^\[PAGE FRAME P\d+ \|/m).slice(1)) {
    const body = frame.split('[END PAGE FRAME')[0];
    assert.ok(body.indexOf('BACKGROUND DESIGN FOR THIS PANEL:') > body.indexOf('ACTOR MEDIUM:'),
      'scope background density after the ordinary per-frame medium recipe, so it cannot be overwritten by that recipe');
    const medium = body.match(/Style:\s*([A-Z_]+)/)?.[1];
    const direction = body.match(/^BACKGROUND DESIGN FOR THIS PANEL:.*$/m)?.[0];
    if (medium !== 'NORMAL') assert.doesNotMatch(direction, /NORMAL人物/,
      'do not inject a different actor medium into a special-medium frame');
  }
  assert.doesNotMatch(on,/BACKGROUND MEDIUM: clean flat-color vector-style/,'do not override all assigned media with one flat style');
  assert.doesNotMatch(on,/^- 意味のある環境.*簡略化しない/m,'remove compiler-owned scenery-density conflict in experimental pages');
  assert.match(on,/人物はこの枠のFRAME MEDIUM／ACTOR MEDIUMどおり通常の細部まで完成/);
  assert.doesNotMatch(on,/and a readable distant setting\./,'abstract frames must not inherit a mandatory literal far background');
  assert.doesNotMatch(on,/every character[^\n]*at full normal detail/,'keep medium-specific finish instead of imposing NORMAL detail on POP or watercolor actors');
  assert.doesNotMatch(on,/場所に合う普通の背景人物は許容/,'respect exact cast count over generic background-people permission');
  assert.equal(background.setMangaBackgroundSimplification(on,false),prepared.prompt);
});

test('background mode preserves finished setting color and depth, including restoration of older white-layer prompts', () => {
  const {setMangaBackgroundSimplification: toggle} = background;
  const original = 'FOCAL READABILITY: Keep setting texture/shadow depth.\nPAGE READING RHYTHM: no default blank backdrop\nNORMAL PANEL RENDERING: full-color cel shading\n## Panel 1\nAction: a red flower is the clue.';
  const on = toggle(original, true);
  assert.match(on, /TWO DIFFERENT DETAIL DENSITIES IN ONE FINISHED IMAGE/);
  assert.match(on, /opaque local colors and broad depth shadows/);
  assert.match(on, /No blur over intricate scenery, pale detailed drawing, uncolored draft/);
  assert.match(on, /Draw this final result directly in one generation/);
  assert.match(on, /the background may be as abstract as POP ART/);
  assert.doesNotMatch(on, /WHITE PAPER:|open paper is the default/);
  const legacy = on.replace('BG MODE: keep large setting shapes, opaque local colors and broad depth shadows, without material microtexture', 'BG MODE: keep sparse setting contours and flat planes without material texture or scenic shading').replace('BG MODE: keep a calm finished setting behind dialogue and reactions', 'BG MODE: open paper is the default behind dialogue and reactions');
  assert.equal(toggle(legacy, false), original);
});
