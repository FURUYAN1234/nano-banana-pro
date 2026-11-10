import test from 'node:test';
import assert from 'node:assert/strict';
import {japaneseColumnLayouts,verticalColumnPositions} from '../src/lib/japanese-lettering.js';

test('news dialogue wraps at phrase boundaries without dividing verbs or nouns',()=>{
  const cases=[
    ['この城塞の歴史を、模型で伝えたい！',['この城塞の','歴史を、','模型で','伝えたい！']],
    ['宮殿や僧院の跡が見つかったの。',['宮殿や','僧院の跡が','見つかったの。']],
    ['星形の窓まであるんだ！',['星形の','窓まで','あるんだ！']],
  ];
  for(const [text,expected] of cases){
    const layouts=japaneseColumnLayouts(text);
    assert.deepEqual(layouts.find(x=>x.length===expected.length),expected);
    for(const columns of layouts){assert.equal(columns.join(''),text);assert(!columns.some(x=>/^[、。！？）」』ぁぃぅぇぉっゃゅょ]/u.test(x)));}
  }
});
test('short columns share the top of the centered paragraph instead of floating independently',()=>{
  const positions=verticalColumnPositions(['古い壁と、','新しい壁が','並んで','見えるね。'],{x:10,y:20,width:200,height:300},24);
  assert.equal(new Set(positions.map(x=>x.top)).size,1);
  assert(positions[0].x>positions[1].x);
  assert(positions.every(x=>x.top>=20));
});
test('lettering preserves graphemes and punctuation and leaves authored lines intact',()=>{
  for(const text of ['「ガ」か\u3099👩‍🔬を見て！','国際連合教育科学文化機関から届いたよ。','作品より札が主役だよ？'])
    for(const columns of japaneseColumnLayouts(text))assert.equal(columns.join(''),text);
  for(const text of ['そのまま\n二行に','Keep this exact text','',null])assert.deepEqual(japaneseColumnLayouts(text),[]);
});
