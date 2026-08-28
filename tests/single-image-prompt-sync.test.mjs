import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let buildSingleImageEmotionalPrompt;
let buildMangaPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ buildSingleImageEmotionalPrompt } = await server.ssrLoadModule('/src/lib/single-image-prompt.js'));
  ({ buildMangaPrompt } = await server.ssrLoadModule('/src/lib/prompt-assembler.js'));
});

after(async () => {
  await server?.close();
});

test('single-image copy prompt applies the current shared image-quality contract', () => {
  const prompt = buildSingleImageEmotionalPrompt();

  assert.match(prompt, /ANTIGRAVITY EMOTIONAL CINEMA ENGINE/);
  assert.match(prompt, /SHARED IMAGE QUALITY CONTRACT/);
  assert.match(prompt, /preserve the user's requested cast, action, setting, and camera/i);
  assert.match(prompt, /rich physical setting/i);
  assert.match(prompt, /lighting and color coherent/i);
  assert.match(prompt, /coherent anatomy/i);
  assert.match(prompt, /clothing-fold shadows/i);
  assert.match(prompt, /Do not invent, duplicate, merge, or replace characters/i);
  assert.match(prompt, /FUNCTIONAL SURFACE ORIENTATION LOCK/);
  assert.match(prompt, /front face toward (?:the )?actual operator, customer, or intended reader/i);
  assert.match(prompt, /move the camera, never rotate the object toward the viewer/i);
  assert.match(prompt, /documents, forms, printed pages, cards, books, maps/i);
  assert.match(prompt, /direction-dependent information, control, optical, or service face/i);
  assert.match(prompt, /receipts, tickets, menus, newspapers, keyboards, control panels, camera lenses, and rear monitors/i);
  assert.match(prompt, /explicitly says.*present.*camera or viewer/i);
  assert.match(prompt, /derive the intended target from the action, not from who holds the object/i);
  assert.match(prompt, /read or operate means self.*submit, present, or show means the recipient/i);
  assert.match(prompt, /BODY ACTING BASELINE/);
  assert.match(prompt, /Never default to a flat, eye-level, center-framed shot/i);
  assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
  assert.match(prompt, /do not default to pointing.*thrusting.*striking a supporting surface/i);
  assert.match(prompt, /action phase.*weight-bearing support.*contact target/i);
});

test('single-image copy prompt retains its established emotional and rendering safeguards', () => {
  const prompt = buildSingleImageEmotionalPrompt();

  assert.match(prompt, /Facial Action Coding System/);
  assert.match(prompt, /line-weight hierarchy/i);
  assert.match(prompt, /No character-sheet layout/i);
  assert.match(prompt, /matching shoulder/i);
  assert.match(prompt, /vertical Japanese only/i);
});

test('single-image copy prompt uses one fail-closed cinematic router without exceeding its baseline length', () => {
  const prompt = buildSingleImageEmotionalPrompt();

  assert.match(prompt, /CINEMATIC DEPTH ROUTER/);
  assert.match(prompt, /one existing physical scene cue.*one optional/i);
  assert.match(prompt, /Otherwise keep the baseline camera/i);
  assert.match(prompt, /User camera, cast, action, anatomy, and text win/i);
  assert.doesNotMatch(prompt, /frame_within_frame|story_reflection|prism_refraction|CINEMATIC_TECHNIQUES/);
  assert.equal((prompt.match(/CINEMATIC DEPTH ROUTER/g) || []).length, 1);
  assert.ok(prompt.length <= 6466, `expected no more than 6,466 chars, got ${prompt.length}`);
});

test('quality upgrades require real verification of both image-output paths', () => {
  const standards = readFileSync(new URL('../docs/project_standards.md', import.meta.url), 'utf8');

  assert.match(standards, /four-panel API image generation/i);
  assert.match(standards, /single-image copy-prompt generation/i);
  assert.match(standards, /品質改善を完了と報告する前/);
});

test('four-panel and single-image outputs consume the same shared quality contract', () => {
  const scenario = `
[1コマ目: 起]
状況: Hero が駅のロビーで地図を開く。
Hero「着いたよ。」
[2コマ目: 承]
状況: Hero が案内板を指さす。
Hero「この出口だね。」
[3コマ目: 転]
状況: Hero が改札前で切符を確認する。
Hero「間に合った。」
[4コマ目: 結]
状況: Hero がホームへ歩き出す。
Hero「行こう。」`;

  for (const providerFamily of ['chatgpt', 'gemini']) {
    const prompt = buildMangaPrompt({
      scenario,
      castList: '## Hero\n- black hair, green eyes',
      colorMode: 'color',
      providerFamily,
      punchlineType: 'Auto',
      systemVersion: 'v5.2.1-test'
    });
    assert.match(prompt, /SHARED IMAGE QUALITY CONTRACT/);
    assert.match(prompt, /FUNCTIONAL SURFACE ORIENTATION LOCK/);
    assert.match(prompt, /move the camera, never rotate the object toward the viewer/i);
    assert.match(prompt, /documents, forms, printed pages, cards, books, maps/i);
    assert.match(prompt, /direction-dependent information, control, optical, or service face/i);
    assert.match(prompt, /explicitly says.*present.*camera or viewer/i);
    assert.match(prompt, /BODY ACTING BASELINE/);
    assert.match(prompt, /reference-sheet pose is identity evidence, not a recurring action/i);
    assert.match(prompt, /do not default to pointing.*thrusting.*striking a supporting surface/i);
  }

  const controlBar = readFileSync(new URL('../src/components/ControlBar.jsx', import.meta.url), 'utf8');
  assert.match(controlBar, /import \{ buildSingleImageEmotionalPrompt \}/);
  assert.match(controlBar, /const protocol = buildSingleImageEmotionalPrompt\(\)/);
});
