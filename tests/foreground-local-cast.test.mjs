import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';
import {extractCastLimitRule} from '../src/lib/panel-utils.js';
const names=rule=>[...(rule.match(/CAST COUNT:[^\n]*/)?.[0]||'').matchAll(/\[([^\]]+)\]/g)].map(m=>m[1]).sort();
const cast='## ユウ\n## ナオ\n## ケイ';

test('an incoming foreground body is not another local actor, while actual local appearances stay',()=>{
  const foreign='パネル1から越えるユウの同じ身体は、ナオの顔と吹き出しを隠さない位置に通す。';
  const options={compact:true,overlayCast:['ユウ']};
  for(const text of [foreign,'コマ1からはみ出したユウの大きな全身は、小コマの顔を隠さない。','ユウの右脚が元コマの枠を越えて小コマへ通る。']){
    const rule=extractCastLimitRule('状況: '+text+'ナオは扉を開く。\nナオ「開いた」',cast,options);
    assert.deepEqual(names(rule),['ナオ'],text);
    assert.doesNotMatch(rule,/ABSENT:[^\n]*\[ユウ\]/);
  }
  for(const local of ['ユウはナオの横で扉を開く。','一方ユウはナオの横に立つ。','一方ユウは扉を越えてナオの横に立つ。','\nユウ「帰ろう」']){
    assert.deepEqual(names(extractCastLimitRule('状況: '+foreign+local+'\nナオ「開いた」',cast,options)),['ナオ','ユウ'],local);
  }
  assert.deepEqual(names(extractCastLimitRule('状況: '+foreign.replace('。','、一方ユウは扉を越えてナオの横に立つ。')+'\nナオ「開いた」',cast,options)),['ナオ','ユウ'],'an actual local action must survive in the same clause');
  assert.deepEqual(names(extractCastLimitRule('状況: '+foreign+'\nナオ「開いた」',cast,{compact:true})),['ナオ','ユウ'],'without authored ownership, the resolver must not invent an overlay');
});

test('actual stronger page normal validation removes only the receiving-scene overlay count and retains final reappearance',async()=>{
  const fixture=JSON.parse(readFileSync(new URL('./fixtures/foreground-local-cast-preimage.json',import.meta.url),'utf8'));
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try{
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const source=structuredClone(fixture.source),before=JSON.stringify(source);
    const plan=m.validateExperimentalPlan(structuredClone(fixture.plan),source);
    assert.deepEqual(plan.expectedCast[0],fixture.plan.expectedCast[0]);
    assert.deepEqual(plan.expectedCast[1].names,fixture.plan.expectedCast[1].names.filter(n=>n!=='アカリ'));
    assert.deepEqual(plan.expectedCast[2],fixture.plan.expectedCast[2]);
    assert.ok(plan.expectedCast[2].names.includes('アカリ'));
    assert.deepEqual(plan.expectedDialogue,fixture.plan.expectedDialogue);
    assert.deepEqual(plan.panels.map(p=>p.camera),fixture.plan.panels.map(p=>p.camera));
    assert.equal(JSON.stringify(source),before);
    for(const colorMode of ['monochrome','color']){
      const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode,providerFamily:'chatgpt'});
      const p2=prompt.split('[PAGE FRAME P2 |')[1].split('[END PAGE FRAME P2]')[0];
      assert.match(p2,/LOCAL CAST SCOPE:[^\n]*\[アカリ\]/);
      assert.doesNotMatch(p2,/CAST COUNT:[^\n]*\[アカリ\]/);
      assert.doesNotMatch(p2,/ABSENT:[^\n]*\[アカリ\]/);
      assert.match(prompt,/PAGE DOMINANT FIGURE F1: アカリ/);
    }
  }finally{await server.close();}
});
test('foreign ownership covers incoming fragments, explicit aliases and silent scripted guests without suppressing their local speech',()=>{
  assert.deepEqual(names(extractCastLimitRule('状況: ユウの右脚が元コマの枠を越えてこのコマへ通る。ナオが扉を開く。\nナオ「開いた」',cast,{compact:true,incomingCast:['ユウ']})),['ナオ']);
  const aliased='## 天城ユウ（ユウ）\n## ナオ';
  assert.deepEqual(names(extractCastLimitRule('状況: パネル1から越えるユウの同じ身体は、ナオの顔を隠さない。\nナオ「開いた」',aliased,{compact:true,overlayCast:['天城ユウ']})),['ナオ']);
  const options={compact:true,scriptedNames:['客演者'],overlayCast:['客演者'],storyText:'客演者「先に行く」'};
  const action='状況: パネル1から越える客演者の大きな上半身は、ナオの顔を隠さない。';
  assert.deepEqual(names(extractCastLimitRule(action+'\nナオ「開いた」','## ナオ',options)),['ナオ']);
  assert.deepEqual(names(extractCastLimitRule(action+'\n客演者「帰ろう」\nナオ「開いた」','## ナオ',options)),['ナオ','客演者']);
});
test('longer registered names are not masked or counted as a shorter foreign owner',()=>{
  assert.deepEqual(names(extractCastLimitRule('状況: ユウは椅子で手を振る。ナオが立つ。','## 元ユウ\n## ナオ',{compact:true})),['ナオ','元ユウ'],'derived alias is preserved when the short name is not separately registered');
  for(const longer of ['元ユウ','城のユウ']){
    const castList=`## ユウ\n## ${longer}\n## ナオ`,options={compact:true,overlayCast:['ユウ'],scriptedNames:['ユウ']};
    for(const action of [`${longer}の右脚が枠を越えてこのコマへ通る。`,`${longer}は椅子で手を振る。`]){
      assert.deepEqual(names(extractCastLimitRule('状況: '+action+'ナオは扉を開く。\nナオ「開いた」',castList,options)),['ナオ',longer].sort(),action);
    }
    const foreign='パネル1から越えるユウの同じ身体は、ナオの顔を隠さない。';
    assert.deepEqual(names(extractCastLimitRule('状況: '+foreign+longer+'は椅子で手を振る。\nナオ「開いた」',castList,options)),['ナオ',longer].sort());
    assert.deepEqual(names(extractCastLimitRule('状況: '+foreign+longer+'は椅子で手を振る。\nユウ「帰ろう」\nナオ「開いた」',castList,options)),['ナオ','ユウ',longer].sort(),'actual local speech still establishes the short-name actor');
  }
});