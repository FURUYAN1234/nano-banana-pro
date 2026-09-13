import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { MINIMAX_H3_COMFYUI_PROMPT } from '../src/lib/minimax-h3-prompt.js';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const minimaxPromptSource = readFileSync(new URL('../src/lib/minimax-h3-prompt.js', import.meta.url), 'utf8');

test('MiniMax H3 copied instruction exactly matches the reviewed generic v5.9.9 authoring prompt', () => {
  assert.equal(MINIMAX_H3_COMFYUI_PROMPT.length, 10840);
  assert.equal(
    createHash('sha256').update(MINIMAX_H3_COMFYUI_PROMPT, 'utf8').digest('hex'),
    'b88b745aa5bb069aadea898235157201708454bf2d61b804b695c3396103b0c3',
  );
});

test('MiniMax H3 helper copies the current four-panel prompt-authoring instruction', () => {
  assert.match(step4PanelSource, /標準H3・汎用プロンプトをコピー/);
  assert.match(step4PanelSource, /await copyTextToClipboard\(MINIMAX_H3_COMFYUI_PROMPT\)/);
  assert.match(minimaxPromptSource, /Reference-to-Video \(R2V \/ Ref2VA\)/);
  assert.match(minimaxPromptSource, /subject_definitions:/);
  assert.match(minimaxPromptSource, /non_diegetic_music:/);
  assert.match(minimaxPromptSource, /panel_cast\[1\]/);
  assert.match(minimaxPromptSource, /immutable identity signature/);
  assert.match(minimaxPromptSource, /no singing, voice-like lead, subtitles, captions, title, end credit, URL/);
  assert.doesNotMatch(minimaxPromptSource, /overlay_title:/);
});

test('MiniMax H3 clipboard helper prefers the reliable Clipboard API before execCommand fallback', () => {
  const helperStart = step4PanelSource.indexOf('const copyTextToClipboard = async (text) => {');
  const helperEnd = step4PanelSource.indexOf('\n};', helperStart);
  const helperSource = step4PanelSource.slice(helperStart, helperEnd);

  assert.ok(helperStart >= 0, 'clipboard helper must exist');
  assert.ok(
    helperSource.indexOf('navigator.clipboard.writeText(text)') < helperSource.indexOf("document.execCommand('copy')"),
    'navigator.clipboard.writeText must run before the legacy execCommand fallback',
  );
});

test('MiniMax H3 prompt uses one reference image and prioritizes dialogue over text and BGM', () => {
  assert.match(minimaxPromptSource, /one reference image/);
  assert.match(minimaxPromptSource, /<Picture 1>, the only active visual reference/);
  assert.match(minimaxPromptSource, /spoken Japanese is the highest audio priority/);
  assert.match(minimaxPromptSource, /low-volume instrumental BGM/);
  assert.match(minimaxPromptSource, /Preserve every essential conversational turn and its owner/);
  assert.match(minimaxPromptSource, /6–8 Japanese mora per second/);
});

test('MiniMax H3 prompt prevents speaker swaps without forcing all dialogue into kana', () => {
  assert.match(minimaxPromptSource, /natural orthography inside <d>\[Japanese\]/);
  assert.match(minimaxPromptSource, /Never convert every line to kana by default/);
  assert.match(minimaxPromptSource, /Only the named speaker moves lips/);
  assert.match(minimaxPromptSource, /every visible non-speaker keeps the mouth closed/);
});

test('MiniMax H3 prompt restores varied character acting and camera paths without weakening dialogue binding', () => {
  assert.match(minimaxPromptSource, /Every shot has one clear primary character action with start pose, readable mid-action, and settled end pose/);
  assert.match(minimaxPromptSource, /at least one independent secondary reaction/);
  assert.match(minimaxPromptSource, /Truck Left\/Right, Tracking Shot, or gentle 10–20 degree Arc Shot/);
  assert.match(minimaxPromptSource, /motion type and, when meaningful, amplitude and speed/);
  assert.match(minimaxPromptSource, /stronger diagonal dolly, controlled arc, foreground parallax, low crane, or reframe/);
  assert.match(minimaxPromptSource, /Camera movement alone does not count as animation/);
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

test('MiniMax H3 UI explains the feature and separates the standard-template and latest workflow routes', () => {
  const introIndex = step4PanelSource.indexOf('FURU four-panel manga to video / FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）');
  const manualIndex = step4PanelSource.indexOf('<h4 id="minimax-h3-prompt-heading"');
  const allInOneIndex = step4PanelSource.indexOf('<h4 id="comfyui-workflow-heading"');
  const promptButtonIndex = step4PanelSource.indexOf('標準H3・汎用プロンプトをコピー', manualIndex);
  const customNodeButtonIndex = step4PanelSource.indexOf('同梱カスタムノード3点・導入セットをダウンロード', allInOneIndex);
  const workflowButtonIndex = step4PanelSource.indexOf('自動可変尺・Fused4step・SLA ワークフローをダウンロード', allInOneIndex);

  assert.notEqual(introIndex, -1, 'the H3 helper needs a feature-level introduction');
  assert.ok(introIndex < manualIndex, 'the introduction must precede the manual route');
  assert.ok(manualIndex < allInOneIndex, 'the manual route must precede the all-in-one route');
  assert.match(step4PanelSource, /MiniMax H3は参照画像のキャラクター・構図・場面を引き継ぎながら動画を生成する/);
  assert.match(step4PanelSource, /ComfyUI標準のMiniMax H3ワークフローを自分で操作する/);
  assert.match(step4PanelSource, /Fused4step・SLA 配布ワークフロー/);
  assert.ok(manualIndex < promptButtonIndex && promptButtonIndex < allInOneIndex, 'the prompt copy action belongs directly under the manual route');
  assert.ok(allInOneIndex < customNodeButtonIndex && customNodeButtonIndex < workflowButtonIndex, 'install the custom node before offering the workflow JSON');
});

test('README documents the current MiniMax H3 connection and starter settings', () => {
  assert.match(readmeSource, /ref_image_0/);
  assert.match(readmeSource, /ref_image_1.*以降/);
  assert.match(readmeSource, /Resolution Selector \(Size\)/);
  assert.match(readmeSource, /基本スケジューラー/);
  assert.match(readmeSource, /字幕なし/);
  assert.match(readmeSource, /ComfyUI標準テンプレートを自分で使う場合/);
  assert.match(readmeSource, /Fused4step・SLA 配布ワークフローを使う場合/);
  assert.match(readmeSource, /2つは別の操作/);
});
