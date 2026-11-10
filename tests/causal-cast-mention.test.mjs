import test from 'node:test';
import assert from 'node:assert/strict';
import {extractCastLimitRule} from '../src/lib/panel-utils.js';

const cast='## 1. アカリ\n赤いボブ。\n## 2. ミク\n金髪。\n## 3. サエコ\n黒い長髪。\n## 4. ヒカリ\n眼鏡。';
const base='[Camera: ミクとサエコを低所から見上げ、奥のヒカリも入れる。]\n状況: アカリの言葉を受け、ミクが壁パネルを持ち上げる。サエコは下端を支え、ヒカリは見守る。\nミク「立てるよ！」\nサエコ「支えるわ！」';
test('a causal reference to earlier speech does not require an otherwise unseen body',()=>{
  for(const word of ['言葉','提案','説明','発言','指示','呼びかけ']){
    const rule=extractCastLimitRule(base.replace('言葉',word),cast,{compact:true});
    assert.match(rule,/CAST COUNT: \[ミク\], \[サエコ\], \[ヒカリ\] each EXACTLY ONCE/);
    assert.match(rule,/ABSENT: do NOT draw \[アカリ\]/);
    assert.match(rule,/exactly 3 people/);
  }
});
test('independent current action, camera presence and speech still require that actor',()=>{
  for(const extra of ['\n状況: アカリも壁を支えている。','\n[Camera: アカリの肩を手前に入れる。]','\nアカリ「ここを持つね。」']){
    const rule=extractCastLimitRule(base+extra,cast,{compact:true});
    assert.match(rule,/exactly 4 people/);
    assert.doesNotMatch(rule,/ABSENT:.*\[アカリ\]/);
  }
  assert.match(extractCastLimitRule(base.replace('アカリの言葉を受け','アカリの手を受け止め'),cast,{compact:true}),/exactly 4 people/);
});
