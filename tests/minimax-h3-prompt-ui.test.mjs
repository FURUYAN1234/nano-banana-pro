import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const minimaxPromptSource = readFileSync(new URL('../src/lib/minimax-h3-prompt.js', import.meta.url), 'utf8');

test('MiniMax H3 helper copies the current four-panel prompt-authoring instruction', () => {
  assert.match(step4PanelSource, /MiniMax H3.*ComfyUI用プロンプトをコピー/);
  assert.match(step4PanelSource, /navigator\.clipboard\.writeText\(MINIMAX_H3_COMFYUI_PROMPT\)/);
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
  assert.match(minimaxPromptSource, /Every shot that is not explicitly still must use one modest but clearly visible, physically coherent camera trajectory/);
  assert.match(minimaxPromptSource, /Across the four shots, vary the camera path/);
  assert.match(minimaxPromptSource, /For an arc, lateral track, or vertical move, specify the start, midpoint, and end state/);
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

test('README documents the current MiniMax H3 connection and starter settings', () => {
  assert.match(readmeSource, /ref_image_0/);
  assert.match(readmeSource, /ref_image_1.*以降/);
  assert.match(readmeSource, /Resolution Selector \(Size\)/);
  assert.match(readmeSource, /基本スケジューラー/);
  assert.match(readmeSource, /字幕なし/);
});
