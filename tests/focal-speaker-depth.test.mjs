import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { buildSingleImageEmotionalPrompt } from '../src/lib/single-image-prompt.js';
import { readFileSync } from 'node:fs';
import { restoreFocusBefore756 } from './helpers/prompt-policy-normalization.mjs';

let server;
let buildMangaPrompt;
let native;
let getScenarioPrompt;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
  native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
});
after(async () => { await server?.close(); });

test('older isolation snapshots invert only frozen compiler focus clauses and preserve authored or unknown changes', () => {
  const mappings = JSON.parse(readFileSync(new URL('./fixtures/focus-756-normalization.json', import.meta.url), 'utf8'));
  for (const { current, previous } of mappings) {
    const prefix = current.startsWith('FOCUS PLAN:') ? 'FOCAL READABILITY: ' : '';
    assert.equal(restoreFocusBefore756(prefix + current), prefix + previous);
    assert.equal(restoreFocusBefore756('Action: ' + current), 'Action: ' + current);
    assert.notEqual(restoreFocusBefore756(prefix + current + ' UNKNOWN CHANGE'), prefix + previous);
    assert.notEqual(restoreFocusBefore756(prefix + current.slice(0, -1) + 'ALTERED'), prefix + previous);
  }
});

const castList = '## Speaker\n- short dark hair\n## Listener\n- long light hair';
const scenario = `## Title: A small discovery
Location: workshop
Outfit: work clothes
${[1, 2, 3, 4].map(panel => `[${panel}コマ目]
[EMOTION: ${panel === 3 ? 'WATERCOLOR' : 'NORMAL'}]
[Camera: ${panel === 4 ? 'explicit deep focus, eye-level' : 'high-angle wide view with a blurred foreground box'}]
Action: Speaker holds a labelled tool in the middle distance. Listener reacts beside Speaker. Distant shelves retain their shape. ${panel === 3 ? 'Scripted abstract background.' : ''}
Speaker「ここを見て。」`).join('\n\n')}`;

test('speaker, reaction and main action focus survives both media and compaction without foreground sharpness bias', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) for (const colorMode of ['color', 'monochrome']) {
    for (const extra of ['', ' identity detail'.repeat(350)]) {
      const prompt = buildMangaPrompt({ scenario, castList: castList + extra, providerFamily, colorMode, punchlineType: 'Auto', systemVersion: 'test' });
      assert.match(prompt, /FOCUS PLAN:.*speaker\/reaction\/action sharp/);
      assert.match(prompt, /useful sharp\/blur planes:.*nonessential near\/far defocused, not pale\/thin/);
      assert.doesNotMatch(prompt, /optional near\/far soft\/thin\/pale/);
      assert.match(prompt, /same depth=same focus/);
      assert.match(prompt, /Text\/contact\/reactions readable/);
      assert.match(prompt, /exposition\/deep focus\/abstraction wins/);
      assert.match(prompt, /Camera\/Action fixed/);
      assert.match(prompt, /high-angle wide view with a blurred foreground box/);
      assert.match(prompt, /explicit deep focus, eye-level/);
      assert.doesNotMatch(prompt, /CLEAN FINISH: crisp FG, soft BG|Story-critical reactions\/visible props|story evidence, acting faces, hands and props stay clear/);
    }
  }
});

test('STEP2 and native planning choose useful actual defocus in staging without adding a camera or focus schema', () => {
  const step2 = getScenarioPrompt({ scenarioMode: 'experimental-manga', inputMode: 'manual', manualTopic: '工房の発見', customLocation: '', customOutfit: '', recentScenarios: [] });
  assert.match(step2, /焦点は撮影位置・レンズと別軸/);
  assert.match(step2, /有効な場面だけ/);
  assert.match(step2, /実際にぼかす/);
  const input = { scenario: scenario.replace('explicit deep focus, eye-level', 'explicit deep focus, high-angle') + '\n[5コマ目]\n[EMOTION: NORMAL]\n[Camera: low-angle telephoto rear view]\nAction: Speaker puts down the tool.\nSpeaker「終わり。」', castList, colorMode: 'color' };
  const source = native.readExperimentalSource(input);
  const planning = native.buildExperimentalPlanPrompt(source);
  assert.match(planning, /In action, when useful name the sharp subject\/action and nonessential different-depth planes to visibly defocus/);
  assert.match(planning, /wide exposition, explicit deep focus, abstract style, required text\/contact\/reactions and equal-depth actors win/);
  assert.match(planning, /Do not return a camera field/);
  assert.doesNotMatch(planning, /focusPlan:|focusPlane:|blurPlanes:/);
  const plan = { count: 5, layout: 'mixed_rows', reason: '発見と反応', panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: p.text, dialogueIds: p.dialogueIds, breakout: null, visualEffects: ['foreground_depth'] })) };
  const original = JSON.stringify(source);
  for (const colorMode of ['color', 'monochrome']) for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = native.buildExperimentalImagePrompt(plan, { ...source, colorMode }, { colorMode, providerFamily });
    assert.match(prompt, /useful sharp\/blur planes:.*nonessential near\/far defocused/);
    assert.match(prompt, /FOREGROUND DEPTH: useful nonessential near\/far planes visibly defocused/);
    for (const panel of source.panels) assert(prompt.includes(panel.camera), panel.camera);
    assert(prompt.length <= 32000);
  }
  assert.equal(JSON.stringify(source), original);
});

test('scene lettering permits photographic defocus but keeps required text legible and forbids censorship', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({ scenario, castList: castList + ' identity detail'.repeat(350), providerFamily, colorMode: 'color', punchlineType: 'Auto', systemVersion: 'test' });
    assert.match(prompt, /SCENE LETTERING: scripted object text exact\/readable; repeat only if scripted/);
    assert.match(prompt, /No censoring\/blanking\/simplifying just for unscripted text/i);
    assert.match(prompt, /depth blur\/thin\/pale allowed, required text readable/i);
  }
});

test('single-image copy uses the same scene-led focus without making every visible prop sharp', () => {
  const prompt = buildSingleImageEmotionalPrompt();
  assert.match(prompt, /speaker\/reaction partner\/main action/);
  assert.match(prompt, /near\/far softness or thinner\/paler detail/);
  assert.match(prompt, /required props\/contact and lettering sharp/);
  assert.match(prompt, /equal depths share focus.*explicit deep focus or abstraction/);
  assert.doesNotMatch(prompt, /visible props and required lettering sharp/);
  assert.ok(prompt.length <= 9500);
});
