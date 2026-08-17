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

test('MiniMax H3 copied prompt makes enabled BGM continuous and mandatory', () => {
  assert.match(step4PanelSource, /BGM enforcement rules:/);
  assert.match(step4PanelSource, /mandatory continuous audience-only audio layer/);
  assert.match(step4PanelSource, /begin at 00:00\.000, continue through the final frame/);
  assert.match(step4PanelSource, /begin with the exact word “MANDATORY:”/);
  assert.match(step4PanelSource, /Write “N\/A” in non_diegetic_music only when the user explicitly disables BGM/);
});

test('MiniMax H3 copied prompt translates timed direction into H3 shot notation', () => {
  assert.match(step4PanelSource, /Temporal direction rewrite rules:/);
  assert.match(step4PanelSource, /Translate every requested timed cut, camera move, or transition into explicit shot timing/);
  assert.match(step4PanelSource, /start, midpoint, and end state/);
  assert.match(step4PanelSource, /Do not invent a camera move when neither the manga nor the user requests one/);
});

test('MiniMax H3 copied prompt preserves only genuine cross-cut dialogue with scenetrans', () => {
  assert.match(step4PanelSource, /<scenetrans>/);
  assert.match(step4PanelSource, /Only when one spoken line genuinely continues across a planned shot boundary/);
  assert.match(step4PanelSource, /Do not split ordinary separate speech balloons into a fake cross-cut line/);
});

test('MiniMax H3 helper explains the copy-to-ComfyUI reference workflow', () => {
  assert.match(step4PanelSource, /このボタンで指示文をコピー、同時に生成済みの4コマ漫画をチャットに添付し、送信/);
  assert.match(step4PanelSource, /出力されたプロンプトをコピー/);
  assert.match(step4PanelSource, /ComfyUIでMiniMax H3 Reference-to-Videoを選択/);
  assert.match(step4PanelSource, /Reference Image/);
  assert.match(step4PanelSource, /画角と秒数を確認の上、先ほど出力された英語プロンプトをPrompt欄に貼り付けて実行/);
});

test('README documents the MiniMax H3 Reference-to-Video workflow separately from the in-app image pipeline', () => {
  assert.match(readmeSource, /MiniMax H3.*ComfyUI.*Reference-to-Video/);
  assert.match(readmeSource, /生成済みの4コマ漫画をダウンロード/);
  assert.match(readmeSource, /指示文をコピーし、同時に画像対応チャットへ4コマ漫画を添付して送信/);
  assert.match(readmeSource, /出力された英語のMiniMax H3プロンプトをコピー/);
  assert.match(readmeSource, /Reference Image/);
  assert.match(readmeSource, /画角と秒数を確認してから、英語プロンプトを `Prompt` に貼り付けて実行/);
  assert.match(readmeSource, /アプリ内で動画を生成・送信しません/);
});

test('README documents the MiniMax H3 timing and cross-cut dialogue safeguards', () => {
  assert.match(readmeSource, /秒単位のカット・カメラ移動を開始・中間・終了の状態まで英語プロンプトへ展開/);
  assert.match(readmeSource, /実際にカットをまたぐ同一台詞だけを `scenetrans` で分割/);
});
