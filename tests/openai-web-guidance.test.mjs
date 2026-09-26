import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const ui = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('Web guidance explains savings and the separate API bill', () => {
  assert.match(ui, /API画像生成料金を節約したい/);
  assert.match(ui, /サブスク料金とは別会計/);
  assert.match(ui, /利用枠・上限/);
  assert.match(ui, /キャラ解析・シナリオ生成などのAPI料金/);
  assert.doesNotMatch(ui, /画像を直接添付できないため/);
  assert.doesNotMatch(ui, /おまかせ生成/);
  assert.doesNotMatch(ui, /キャラクターのクオリティや再現度が劇的に向上/);
  assert.match(readme, /a ChatGPT subscription does not include OpenAI API usage/);
});

test('long prompt guidance separates the shared API ceiling from Web input and supports TXT attachments', () => {
  assert.match(ui, /共通上限32,000文字/);
  assert.match(ui, /テキストフィールドへ戻す必要はありません/);
  assert.match(ui, /onClick=\{\(\) => copyPrompt\(true\)\}/);
  assert.match(readme, /Web入力欄や添付ファイルの絶対上限ではありません/);
  assert.doesNotMatch(readme, /uses an empirical 10,000-character soft budget/);
  assert.match(ui, /webCopyPartLengths\.map/);
  assert.match(ui, /copyPrompt\(false, index\)/);
  assert.match(ui, /全文を一括コピー/);
  assert.match(readme, /同じ入力欄へすべて貼ってから一度だけ送信/);
});
