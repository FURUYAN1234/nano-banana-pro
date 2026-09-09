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

const scenario = `
## Title: A New Discovery
Location: library

[1コマ目: 起]
Hero「見つけたよ。」

[2コマ目: 承]
Friend「本当なの？」

[3コマ目: 転]
Hero「ここに書いてある。」

[4コマ目: 結]
Friend「読んでみよう。」`;

test('both provider prompts keep a bold Gothic title separate from slender Mincho speech bubbles', () => {
  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: '## Hero\n- black hair\n## Friend\n- blonde hair',
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.9.4-test'
    });

    assert.match(prompt, /PAGE TYPE HIERARCHY/);
    assert.match(prompt, /title.*EXTRA-BOLD.*Japanese Gothic/i);
    assert.match(prompt, /SPEECH BUBBLE TYPE LOCK/);
    assert.match(prompt, /regular-weight.*Japanese manga Mincho-style/i);
    assert.match(prompt, /NEVER use bold Gothic or bold sans-serif inside speech bubbles/i);
    assert.match(prompt, /vertical Japanese tategaki/i);
  }
});
