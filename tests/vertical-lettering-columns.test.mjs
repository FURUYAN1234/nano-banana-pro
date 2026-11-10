import test from 'node:test';
import assert from 'node:assert/strict';
import {buildVerticalLetteringColumns} from '../src/lib/bubble-text.js';

test('repair columns retain every source grapheme in reading order',()=>{
  for(const text of ['なら、模型でも違いを残すわ。','残すって、違いごと伝えることなんだね。','「ガ」か\u3099👩‍🔬を見て！']) {
    const columns=buildVerticalLetteringColumns(text);
    assert.equal(columns.join(''),text);
    assert(columns.every(column=>[...new Intl.Segmenter('ja',{granularity:'grapheme'}).segment(column)].length<=9));
    assert(!columns.some(column=>/^\p{Mark}/u.test(column)));
  }
  assert.deepEqual(buildVerticalLetteringColumns('なら、模型でも違いを残すわ。'),['なら、模型でも','違いを残すわ。']);
});
test('authored line breaks and non-Japanese typography are not reformatted',()=>{
  for(const text of ['Keep this exact text','そのまま\n二行に','',null])assert.equal(buildVerticalLetteringColumns(text),null);
});
