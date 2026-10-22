import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {findReadmeLanguageGaps} from '../scripts/readme_body_audit.mjs';

test('bilingual coverage accepts paired text, version headings, URLs, identifiers and unchanged code examples', () => {
  assert.deepEqual(findReadmeLanguageGaps('# Panel modes / コマ数\n\nChoose the story mode. / 物語の形式を選びます。\n\n### v7.1.7 (2026-10-22)\n\nhttps://example.com\n\n```text\n日本語の操作例\n```\n\n| Style / 画風 | NORMAL |\n|---|---|'), []);
});
test('Japanese prose with English technical identifiers still needs an English explanation', () => {
  assert.equal(findReadmeLanguageGaps('STEP2ではOutfitとCameraを保ちます。')[0]?.missing, 'English');
});

test('a bilingual bold label does not mask an untranslated explanation', () => {
  assert.equal(findReadmeLanguageGaps('**Panel-count switch / コマ数の切替:** STEP2の上で切り替えます。')[0]?.missing, 'English');
});
test('English-only prose needs Japanese even beneath a bilingual heading', () => {
  assert.equal(findReadmeLanguageGaps('## Modes / モード\n\nChoose the story mode.')[0]?.missing, 'Japanese');
});
test('each table cell and image description has its own language coverage', () => {
  const gaps=findReadmeLanguageGaps('| Style / 画風 | 太い輪郭と網点 |\n\n![Open the application](image.png)');
  assert.deepEqual(gaps.map(x=>x.missing), ['English','Japanese']);
});
test('all README headings, prose, table cells, captions and changelog entries have both languages', () => {
  const gaps=findReadmeLanguageGaps(readFileSync(new URL('../README.md',import.meta.url),'utf8'));
  assert.deepEqual(gaps, [], JSON.stringify(gaps,null,2));
});
