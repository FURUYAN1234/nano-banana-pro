import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';
import { FOCAL_DEPTH_HIERARCHY } from '../src/lib/shared-image-quality.js';

// Retain the original isolation baseline; normalize only the authorized shared
// focus contract, independently covered by expressive-direction.test.mjs.
const withoutFocusRepair = value => value.replaceAll(` ${FOCAL_DEPTH_HIERARCHY}`, '')
  .replaceAll('Rear=head/shoulders/weight;', 'Rear acting=head/shoulders/weight;')
  .replaceAll('Sharp story reactions/props/text. white/black planes', 'Sharp story reactions/props/text. Support/BG thin/quiet; white/black planes')
  .replaceAll('Keep setting/depth/light/identity/tones/gaze/diagonal/negative-space; no glow.',
    'Keep setting/depth/light/identity/tones and gaze/diagonal/negative-space flow; no glow over ink.')
  .replaceAll('crisp story focus; soften nonessential near/far planes in the panel medium; preserve required text and lighting.',
    'crisp foreground, softer background, lighting.');

// This is the accepted COLOR state immediately before the mono-only change,
// not the earlier pre-color-repair baseline. Update only after explicit approval.
const baseline = JSON.parse(readFileSync(new URL('./fixtures/mono-style-isolation-baseline.json', import.meta.url), 'utf8'));
const scenario = readFileSync(new URL(`./fixtures/${baseline.scenarioFixture}`, import.meta.url), 'utf8');
const sha256 = value => createHash('sha256').update(withoutFocusRepair(value)).digest('hex');
let server, buildMangaPrompt;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});
after(async () => { await server?.close(); });

function scenarioFor(input) {
  let panel = 0;
  let text = scenario.replace(/\[EMOTION:\s*[^\]]+\]/g, () => `[EMOTION: ${input.emotions[panel++]}]`);
  assert.equal(panel, 4);
  if (input.ending) text = text.replace(/^Punchline:.*$/m, `Punchline: ${input.ending}`);
  return text;
}

test('mono isolation covers every GEKIGA panel position, other styles, both budgets and the reference exception', () => {
  assert.equal(sha256(scenario), baseline.scenarioSha256, 'the baseline scenario itself must not silently change');
  assert.equal(baseline.records.length, 32);
  for (let position = 0; position < 4; position++) {
    const input = baseline.cases.find(value => value.name === `gekiga-panel-${position + 1}`);
    assert.equal(input.emotions[position], 'GEKIGA');
    assert.deepEqual([...input.emotions].sort(), ['CHIBI_GAG', 'GEKIGA', 'NORMAL', 'WATERCOLOR']);
    for (const providerFamily of ['chatgpt', 'gemini']) {
      for (const colorMode of providerFamily === 'chatgpt' ? ['color'] : ['color', 'monochrome']) {
        for (const budget of [24000, 32000]) {
          assert.ok(baseline.records.some(record => record.case === input.name && record.providerFamily === providerFamily
            && record.colorMode === colorMode && record.promptMaxChars === budget));
        }
      }
    }
  }
  assert.equal(baseline.cases.find(value => value.name === 'reference-style-exception').ending, 'SeriousDocumentary');
});

for (const record of baseline.records) {
  test(`mono-only repair preserves exact ${record.providerFamily}/${record.colorMode}/${record.case}/${record.promptMaxChars} output`, () => {
    const input = baseline.cases.find(value => value.name === record.case);
    const prompt = buildMangaPrompt({ ...baseline.options, scenario: scenarioFor(input),
      providerFamily: record.providerFamily, colorMode: record.colorMode, promptMaxChars: record.promptMaxChars });
    assert.equal(sha256(prompt), record.sha256, 'a non-target prompt byte changed');
    assert.equal(Buffer.byteLength(withoutFocusRepair(prompt)), record.utf8Bytes);
    assert.equal(withoutFocusRepair(prompt).length, record.characters);
    if (input.ending) assert.match(prompt, /REFERENCE-SHEET/);
  });
}

test('OpenAI monochrome keeps every neighboring NORMAL, WATERCOLOR and CHIBI panel byte-identical', () => {
  assert.equal(baseline.nonTargetPanels.length, 8);
  for (const record of baseline.nonTargetPanels) {
    const input = baseline.cases.find(value => value.name === record.case);
    const prompt = buildMangaPrompt({ ...baseline.options, scenario: scenarioFor(input),
      providerFamily: 'chatgpt', colorMode: 'monochrome', promptMaxChars: record.promptMaxChars });
    const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
    assert.equal(panels.length, 4);
    assert.equal(record.panels.length, 3);
    for (const panel of record.panels) {
      assert.equal(sha256(panels[panel.panel - 1]), panel.sha256, `${record.case} panel ${panel.panel}/${record.promptMaxChars}`);
    }
  }
});

test('only the OpenAI monochrome GEKIGA panel receives structural ink and facial reconstruction', () => {
  for (const input of baseline.cases.filter(value => !value.ending)) {
    for (const promptMaxChars of [24000, 32000]) {
      const prompt = buildMangaPrompt({ ...baseline.options, scenario: scenarioFor(input),
        providerFamily: 'chatgpt', colorMode: 'monochrome', promptMaxChars });
      const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
      const gekiga = panels[input.emotions.indexOf('GEKIGA')];
      assert.match(gekiga, /small realistic eyes\/irises/i);
      assert.match(gekiga, /large solid-black shadow planes/i);
      assert.match(gekiga, /dense directional crosshatching ON faces\/hands/i);
      assert.match(gekiga, /same identity/i);
      assert.match(gekiga, /(?:not|do not retain)[^\n.]*anime/i);
      assert.match(gekiga, /scripted emotion\/gaze\/pose\/Camera/i);
      assert.ok(prompt.length <= promptMaxChars);
    }
  }
});

test('OpenAI monochrome GEKIGA reserves lit light skin without stripping necessary tone roles', () => {
  for (const input of baseline.cases.filter(value => !value.ending)) {
    const prompt = buildMangaPrompt({ ...baseline.options, scenario: scenarioFor(input),
      providerFamily: 'chatgpt', colorMode: 'monochrome', promptMaxChars: 24000 });
    const panels = prompt.split(/^## Panel \d+\s*$/m).slice(1);
    const gekiga = panels[input.emotions.indexOf('GEKIGA')];
    // Assert the actual assembled panel, where the rendering rule reaches the API.
    assert.match(gekiga, /白肌の明部は墨線の間を無地白/);
    assert.match(gekiga, /灰色・網点の下地なし/);
    assert.match(gekiga, /光源に沿う局所影、褐色肌、衣服のトーンは残す/);
    assert.match(gekiga, /crosshatching ON faces\/hands in shadow/);
    assert.doesNotMatch(gekiga, /Keep[^\n]*skin\/material tones/);
  }
});
