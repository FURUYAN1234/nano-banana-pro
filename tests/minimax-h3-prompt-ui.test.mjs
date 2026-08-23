import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { MINIMAX_H3_COMFYUI_PROMPT } from '../src/lib/minimax-h3-prompt.js';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const minimaxPromptSource = readFileSync(new URL('../src/lib/minimax-h3-prompt.js', import.meta.url), 'utf8');

test('MiniMax H3 copied instruction exactly matches the supplied replacement', () => {
  assert.equal(MINIMAX_H3_COMFYUI_PROMPT.length, 19824);
  assert.equal(
    createHash('sha256').update(MINIMAX_H3_COMFYUI_PROMPT, 'utf8').digest('hex'),
    '39fc7a0a792f6b4de96ea8b2df923f93c37514cba80f6b85196e825201cb639f',
  );
});

test('MiniMax H3 helper copies the current four-panel prompt-authoring instruction', () => {
  assert.match(step4PanelSource, /MiniMax H3.*ComfyUI用プロンプトをコピー/);
  assert.match(step4PanelSource, /await copyTextToClipboard\(MINIMAX_H3_COMFYUI_PROMPT\)/);
  assert.match(minimaxPromptSource, /Reference-to-Video \(R2V \/ Ref2VA\)/);
  assert.match(minimaxPromptSource, /subject_definitions:/);
  assert.match(minimaxPromptSource, /non_diegetic_music:/);
});

test('MiniMax H3 prompt uses one reference image and prioritizes dialogue over subtitles and BGM', () => {
  assert.match(minimaxPromptSource, /ref_image_0/);
  assert.match(minimaxPromptSource, /ref_image_1 以降は接続しません/);
  assert.match(minimaxPromptSource, /no dialogue subtitles or captions/);
  assert.match(minimaxPromptSource, /no background music when spoken dialogue exists/);
  assert.match(minimaxPromptSource, /Preserve the original conversation structure/);
  assert.match(minimaxPromptSource, /Target a clear Japanese speaking rate of approximately 6 to 8 mora per second/);
});

test('MiniMax H3 prompt prevents speaker swaps without forcing all dialogue into kana', () => {
  assert.match(minimaxPromptSource, /use normal Japanese orthography to preserve semantic and emotional cues/);
  assert.match(minimaxPromptSource, /Do not convert an entire dialogue line to hiragana-only or katakana-only/);
  assert.match(minimaxPromptSource, /the named speaker is the only character allowed to move lips/);
  assert.match(minimaxPromptSource, /Every visible non-speaking character keeps lips fully closed/);
});

test('MiniMax H3 prompt restores varied character acting and camera paths without weakening dialogue binding', () => {
  assert.match(minimaxPromptSource, /Every visible character must perform at least one role-appropriate, physically plausible movement in every shot/);
  assert.match(minimaxPromptSource, /Speaking and story-critical characters must visibly perform dialogue, facial reaction, gesture, posture shift, or purposeful action/);
  assert.match(minimaxPromptSource, /Background and crowd characters must perform individually varied, restrained secondary action/);
  assert.match(minimaxPromptSource, /Every shot that is not explicitly still uses one clearly visible, physically coherent primary camera route/);
  assert.match(minimaxPromptSource, /Across the four shots, vary the route among lateral tracking, a gentle arc or orbit, a diagonal dolly with foreground parallax, and a low-to-high crane or reframe/);
  assert.match(minimaxPromptSource, /For every route, specify start, midpoint, and end viewpoint, framing, subject placement, and visible parallax/);
  assert.match(minimaxPromptSource, /Camera movement alone never counts as animation/);
  assert.match(minimaxPromptSource, /In every shot, show at least two independently visible in-scene changes/);
  assert.doesNotMatch(minimaxPromptSource, /one modest but clearly visible/);
  assert.doesNotMatch(minimaxPromptSource, /Use a static camera, a short push-in, a gentle lateral track, or a small arc/);
  assert.doesNotMatch(minimaxPromptSource, /Do not require every visible character to perform a large independent action/);
});

test('MiniMax H3 UI identifies the exact ComfyUI sockets and fields to set', () => {
  assert.match(step4PanelSource, /MiniMax H3 Reference-to-Video（R2V \/ Ref2VA）.*ワークフローを選択/);
  assert.match(step4PanelSource, /選ぶワークフロー.*MiniMax H3 Reference-to-Video（R2V \/ Ref2VA）/);
  assert.match(step4PanelSource, /最初の参照入力.*ref_image_0/);
  assert.match(step4PanelSource, /同じ4コマ漫画を最初の参照入力.*ref_image_0.*ref_image_1.*以降.*接続しない/);
  assert.match(step4PanelSource, /Resolution Selector \(Size\).*メガピクセル.*0\.4/);
  assert.match(step4PanelSource, /アスペクト比.*16:9 \(Widescreen\)/);
  assert.doesNotMatch(step4PanelSource, /Float \(Duration\).*15\.0/);
  assert.match(step4PanelSource, /基本スケジューラー.*normal/);
});

test('MiniMax H3 UI explains the feature and separates the two usage routes before their actions', () => {
  const introIndex = step4PanelSource.indexOf('4コマ漫画から動画を作る（MiniMax H3 / ComfyUI）');
  const manualIndex = step4PanelSource.indexOf('<h4 id="minimax-h3-prompt-heading"');
  const allInOneIndex = step4PanelSource.indexOf('<h4 id="comfyui-workflow-heading"');
  const promptButtonIndex = step4PanelSource.indexOf('MiniMax H3・ComfyUI用プロンプトをコピー', manualIndex);
  const customNodeButtonIndex = step4PanelSource.indexOf('Nano Banana-H3 カスタムノードをダウンロード', allInOneIndex);
  const workflowButtonIndex = step4PanelSource.indexOf('ComfyUIワークフローJSONをダウンロード', allInOneIndex);

  assert.notEqual(introIndex, -1, 'the H3 helper needs a feature-level introduction');
  assert.ok(introIndex < manualIndex, 'the introduction must precede the manual route');
  assert.ok(manualIndex < allInOneIndex, 'the manual route must precede the all-in-one route');
  assert.match(step4PanelSource, /MiniMax H3は、参照画像のキャラクター・構図・場面を引き継ぎながら動画を生成する/);
  assert.match(step4PanelSource, /自分でComfyUIのMiniMax H3ワークフローを操作する/);
  assert.match(step4PanelSource, /画像変換から動画化、クレジット合成までを専用ワークフローでまとめて行う/);
  assert.ok(manualIndex < promptButtonIndex && promptButtonIndex < allInOneIndex, 'the prompt copy action belongs directly under the manual route');
  assert.ok(allInOneIndex < customNodeButtonIndex && customNodeButtonIndex < workflowButtonIndex, 'install the custom node before offering the workflow JSON');
});

test('README documents the current MiniMax H3 connection and starter settings', () => {
  assert.match(readmeSource, /ref_image_0/);
  assert.match(readmeSource, /ref_image_1.*以降/);
  assert.match(readmeSource, /Resolution Selector \(Size\)/);
  assert.match(readmeSource, /基本スケジューラー/);
  assert.match(readmeSource, /字幕なし/);
  assert.match(readmeSource, /標準ワークフローを自分で使う場合/);
  assert.match(readmeSource, /画像変換から動画化まで全部お任せにする場合/);
  assert.match(readmeSource, /2つは別の操作/);
});
