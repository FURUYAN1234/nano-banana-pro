import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { buildSingleImageEmotionalPrompt } from '../src/lib/single-image-prompt.js';

let server;
let buildMangaPrompt;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});
after(async () => { await server?.close(); });

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
      assert.match(prompt, /FOCUS PLAN:.*speaker\/reaction partner\/main action sharp/);
      assert.match(prompt, /optional near\/far soft\/thin\/pale/);
      assert.match(prompt, /equal depth=same focus/);
      assert.match(prompt, /Required text\/contact\/reactions readable/);
      assert.match(prompt, /explicit deep focus\/abstract style wins/);
      assert.match(prompt, /Keep setting shapes/);
      assert.match(prompt, /high-angle wide view with a blurred foreground box/);
      assert.match(prompt, /explicit deep focus, eye-level/);
      assert.doesNotMatch(prompt, /CLEAN FINISH: crisp FG, soft BG|Story-critical reactions\/visible props|story evidence, acting faces, hands and props stay clear/);
    }
  }
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
