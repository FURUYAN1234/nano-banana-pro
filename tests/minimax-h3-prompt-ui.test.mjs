import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('MiniMax H3 helper copies the four-panel Reference-to-Video prompt', () => {
  assert.match(step4PanelSource, /MINIMAX_H3_COMFYUI_PROMPT/);
  assert.match(step4PanelSource, /MiniMax H3.*ComfyUI用プロンプトをコピー/);
  assert.match(step4PanelSource, /navigator\.clipboard\.writeText\(MINIMAX_H3_COMFYUI_PROMPT\)/);
  assert.match(step4PanelSource, /Reference-to-Video \(R2V \/ Ref2VA\)/);
  assert.match(step4PanelSource, /subject_definitions:/);
  assert.match(step4PanelSource, /non_diegetic_music:/);
});

test('MiniMax H3 helper explains the copy-to-ComfyUI reference workflow', () => {
  assert.match(step4PanelSource, /このボタンで指示文をコピー/);
  assert.match(step4PanelSource, /生成済みの4コマ漫画をチャットに添付/);
  assert.match(step4PanelSource, /ComfyUIでMiniMax H3 Reference-to-Videoを選択/);
  assert.match(step4PanelSource, /Reference Image/);
  assert.match(step4PanelSource, /出力された英語プロンプトをPrompt欄に貼り付けて実行/);
});

test('README documents the MiniMax H3 Reference-to-Video workflow separately from the in-app image pipeline', () => {
  assert.match(readmeSource, /MiniMax H3.*ComfyUI.*Reference-to-Video/);
  assert.match(readmeSource, /生成済みの4コマ漫画をダウンロード/);
  assert.match(readmeSource, /画像対応チャットに4コマ漫画を添付/);
  assert.match(readmeSource, /Reference Image/);
  assert.match(readmeSource, /Prompt.*貼り付けて実行/);
  assert.match(readmeSource, /アプリ内で動画を生成・送信しません/);
});
