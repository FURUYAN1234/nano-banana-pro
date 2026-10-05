import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createHash } from 'node:crypto';
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';
import { FOCAL_DEPTH_HIERARCHY } from '../src/lib/shared-image-quality.js';
import { withoutMosaicRepair } from './helpers/mosaic-isolation.mjs';
import { restorePrePolicyContracts, restorePreSelectionContracts } from './helpers/prompt-policy-normalization.mjs';

// Exclude only the newly authorized shared focus wording. All pre-existing
// camera, acting and medium instructions remain frozen against the old hash.
// Normalize only the authorized shared scale wording; the separate final-prompt
// regression checks its depth/occlusion/ground-plane and stylization safeguards.
const withoutScaleRepair = value => restorePrePolicyContracts(restorePreSelectionContracts(withoutMosaicRepair(value)))
  .replaceAll('Keep required cast once; supporting cast: lower visual emphasis, never miniature bodies; scale follows depth, occlusion and ground plane; preserve scripted size differences and chibi', 'Keep required cast once; supporting cast smaller/lower contrast when Camera/Action permits, not equal portraits')
  .replaceAll('supporting cast: lower visual emphasis, never miniature bodies; scale follows depth, occlusion and ground plane; preserve scripted size differences and chibi', 'supporting cast smaller/lower contrast')
  .replaceAll('脇役縮小禁止。遠近・遮蔽・接地に整合。指定体格差・ちび保持。', 'support smaller/lower-contrast.');
const withoutFocusRepair = value => withoutScaleRepair(value).replaceAll(` ${FOCAL_DEPTH_HIERARCHY}`, '')
  .replaceAll('Rear=head/shoulders/weight;', 'Rear acting=head/shoulders/weight;')
  .replaceAll('Sharp story reactions/props/text. white/black planes', 'Sharp story reactions/props/text. Support/BG thin/quiet; white/black planes')
  .replaceAll('Keep setting/depth/light/identity/tones/gaze/diagonal/negative-space; no glow.',
    'Keep setting/depth/light/identity/tones and gaze/diagonal/negative-space flow; no glow over ink.')
  .replaceAll('crisp story focus; soften nonessential near/far planes in the panel medium; preserve required text and lighting.',
    'crisp foreground, softer background, lighting.');

const scenario = readFileSync(new URL('./fixtures/ai-illustration-balloon-layout.txt', import.meta.url), 'utf8');
const options = { scenario, castList: 'ミク、リン、サエコ、アカリ、ヒカリ', systemVersion: 'test', punchlineType: 'Auto', cinematicTechniques: false };
let server, buildMangaPrompt;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});
after(async () => { await server?.close(); });

test('OpenAI color compiles the accepted storyboard-first order without editing the final prompt', () => {
  const prompt = buildMangaPrompt({ ...options, providerFamily: 'chatgpt', colorMode: 'color' });
  assert.ok(prompt.indexOf('## Panel 4') < prompt.indexOf('STRICT SCRIPT LOCK:'));
  assert.match(prompt.split('## Panel 1')[1].split('## Panel 2')[0], /PANEL STYLE LOCK: GEKIGA/);
  assert.match(prompt.split('## Panel 3')[1].split('## Panel 4')[0], /PANEL STYLE LOCK: IMPACT/);
  assert.match(prompt.split('## Panel 4')[1], /PANEL STYLE LOCK: CHIBI_GAG/);
  assert.equal((prompt.match(/^## Panel [1-4]/gm) || []).length, 4);
});

test('OpenAI color repair preserves byte-identical output in other provider/medium paths', () => {
  const baselines = JSON.parse(readFileSync(new URL('./fixtures/color-isolation-baseline.json', import.meta.url), 'utf8'));
  for (const baseline of baselines) {
    // The user subsequently authorized OpenAI-only mono GEKIGA strengthening.
    // Its unchanged neighboring panels and all other routes are now frozen by
    // mono-style-isolation.test.mjs against the accepted post-color-fix state.
    if (baseline.options.providerFamily === 'chatgpt' && baseline.options.colorMode === 'monochrome') continue;
    const prompt = buildMangaPrompt({ ...options, ...baseline.options });
    assert.equal(createHash('sha256').update(withoutFocusRepair(prompt)).digest('hex'), baseline.sha256, JSON.stringify(baseline.options));
  }
});

test('OpenAI color keeps common facial and fabric finishing subordinate to each panel medium after compaction', () => {
  for (const promptMaxChars of [24000, 32000]) {
    const prompt = buildMangaPrompt({ ...options, providerFamily: 'chatgpt', colorMode: 'color', promptMaxChars });
    assert.match(prompt, /Preserve gaze and emotional intent, not reference facial geometry/);
    assert.match(prompt, /Redraw eyes, nose, mouth and jaw in each panel's medium/);
    assert.doesNotMatch(prompt, /fine eyes\/mouth\/fingers/);
    const folds = prompt.split('\n').filter(line => /(?:FOLD SHADOWS|FOLD PRIORITY|CLOTHING FOLD)/.test(line));
    assert.ok(folds.length > 0);
    for (const line of folds) assert.match(line, /panel.*medium|NORMAL\/unmarked only/, line);
    assert.match(prompt, /PANEL STYLE LOCK: GEKIGA/);
    assert.match(prompt, /PANEL STYLE LOCK: CHIBI_GAG/);
  }
});

test('a reference-style documentary remains reference locked, with no color media override', () => {
  const prompt = buildMangaPrompt({ ...options, providerFamily: 'chatgpt', colorMode: 'color',
    scenario: scenario.replace(/^Punchline:.*$/m, 'Punchline: SeriousDocumentary') });
  assert.match(prompt, /REFERENCE-SHEET/);
  assert.doesNotMatch(prompt, /PANEL-FIRST ART DIRECTION:/);
});

test('OpenAI color GEKIGA intensifies facial drawing without changing acting or leaking to other panels', () => {
  for (const promptMaxChars of [24000, 32000]) {
    const prompt = buildMangaPrompt({ ...options, providerFamily: 'chatgpt', colorMode: 'color', promptMaxChars });
    const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
    assert.match(panels[0], /high-intensity GEKIGA/);
    assert.match(panels[0], /large solid-black shadow planes/i);
    assert.match(panels[0], /dense directional crosshatching/);
    assert.match(panels[0], /small realistic eyes\/irises/);
    assert.match(panels[0], /crosshatching ON faces\/hands/);
    assert.match(panels[0], /scripted emotion\/gaze\/pose\/Camera/);
    assert.match(panels[0], /no added anger, age or wrinkles/);
    for (const panel of panels.slice(1)) assert.doesNotMatch(panel, /high-intensity GEKIGA/);
    assert.ok(prompt.length <= promptMaxChars);
  }
});
