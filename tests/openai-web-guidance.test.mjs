import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const ui = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('Web guidance explains savings and the separate API bill', () => {
  assert.match(ui, /API画像生成料金を節約したい/);
  assert.match(ui, /サブスク料金とは別(?:会計|です)/);
  assert.match(ui, /利用枠・上限/);
  assert.match(ui, /キャラ解析・シナリオ生成などのAPI料金/);
  assert.doesNotMatch(ui, /画像を直接添付できないため/);
  assert.doesNotMatch(ui, /おまかせ生成/);
  assert.doesNotMatch(ui, /キャラクターのクオリティや再現度が劇的に向上/);
  assert.match(readme, /a ChatGPT subscription does not include OpenAI API usage/);
});

test('long prompt guidance keeps the API ceiling while allowing lossless over-limit Web exports', () => {
  assert.match(ui, /API生成の上限は、参照画像の説明を含め32,000文字/);
  assert.match(ui, /上限を超えても、分割コピー・全文保存で内容を取り出せます/);
  assert.doesNotMatch(ui, /共通上限32,000文字/);
  assert.match(ui, /プロンプトが添付ファイルになった場合でも、環境によりテキストフィールドへ戻せる場合は全文貼付が可能です。/);
  assert.match(ui, /onClick=\{\(\) => copyPrompt\(true\)\}/);
  assert.match(readme, /編集などで上限を超えても、総文字数・分割／全文コピー・保存は利用でき、全文を切り捨てず取り出せます/);
  assert.match(readme, /API送信は上限超過を拒否します/);
  assert.match(readme, /Web側の入力・添付制限は利用環境によって異なります/);
  assert.doesNotMatch(readme, /uses an empirical 10,000-character soft budget/);
  assert.match(ui, /webCopyPartLengths\.map/);
  assert.match(ui, /copyPrompt\(false, index\)/);
  assert.match(ui, /全文を一括コピー/);
  assert.match(readme, /同じ入力欄へすべて貼ってから一度だけ送信/);
});
