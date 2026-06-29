import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('ChatGPT tips include a separate 2x upscale prompt copy action', () => {
  assert.match(step4PanelSource, /✨ ChatGPTの画像を2倍にアップスケールしたい場合/);
  assert.match(step4PanelSource, /画像2倍アップスケールプロンプトをコピー/);
  assert.match(step4PanelSource, /SELF-TRAINED 2X IMAGE UPSCALE TASK/);
  assert.match(step4PanelSource, /完了しました。2倍にアップスケールしました。/);
  assert.match(step4PanelSource, /2倍アップスケール画像をダウンロード/);
});

test('upscale helper prompt is original and does not copy the social post title', () => {
  assert.doesNotMatch(step4PanelSource, /GPT Native Super Resolution Ver2\.1/);
  assert.doesNotMatch(step4PanelSource, /Eris Create Lab/);
});
