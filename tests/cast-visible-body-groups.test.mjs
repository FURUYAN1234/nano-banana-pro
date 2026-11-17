import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';
import {extractCastLimitRule,extractActionOnly} from '../src/lib/panel-utils.js';
import {restoreCastCountWordingBefore804} from './helpers/prompt-policy-normalization.mjs';

const names=rule=>[...(rule.match(/CAST COUNT:[^\n]*/)?.[0]||'').matchAll(/\[([^\]]+)\]/g)].map(m=>m[1]).sort();
const fixture=JSON.parse(readFileSync(new URL('./fixtures/cast-preimage-guardian.json',import.meta.url),'utf8'));
const page2Fixture=JSON.parse(readFileSync(new URL('./fixtures/cast-page2-punctuated-body.json',import.meta.url),'utf8'));
const panels=fixture.scenario.split(/(?=\[\d+コマ目)/).slice(1);
test('actual second-page source revalidation retains its punctuated opponent body without changing the other two panels',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try{
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const source=structuredClone(page2Fixture.source),original=JSON.stringify(source);
    const plan=m.validateExperimentalPlan(structuredClone(page2Fixture.plan),source);
    assert.ok(plan.expectedCast[0].names.includes('石の守護獣'));
    assert.deepEqual(plan.expectedCast[1],page2Fixture.plan.expectedCast[1]);
    assert.deepEqual(plan.expectedCast[2],page2Fixture.plan.expectedCast[2]);
    assert.equal(JSON.stringify(source),original);
    assert.deepEqual(plan.expectedDialogue,page2Fixture.plan.expectedDialogue);
    assert.deepEqual(plan.panels.map(p=>p.camera),page2Fixture.plan.panels.map(p=>p.camera));
    const prompt=m.buildExperimentalImagePrompt(plan,source,{colorMode:source.colorMode,providerFamily:'chatgpt'});
    const first=prompt.split('[PAGE FRAME P1 |')[1].split('[END PAGE FRAME P1]')[0];
    assert.match(first,/CAST COUNT:[^\n]*石の守護獣/);
    assert.doesNotMatch(first,/ABSENT:[^\n]*石の守護獣/);
  }finally{await server.close();}
});
test('neutral body-count clauses preserve the previous budget and exact numeric meaning',()=>{
  const pairs=[
    ['NO OTHER ACTORS: exactly 6 bodies.','NO OTHER HUMANS: exactly 6 people.'],
    ['TOTAL 6 bodies; no others.','TOTAL 6 people; no others.'],
    ['PHYSICAL TOTAL 6 full-size bodies; no other full-size actors.','PHYSICAL TOTAL 6 full-size people; no other full-size humans.'],
    ['ABSOLUTELY NO OTHER ACTORS ALLOWED.','ABSOLUTELY NO OTHER HUMANS ALLOWED.'],
    ['Total EXACTLY 6 distinct cast bodies.','Total EXACTLY 6 distinct individuals.'],
  ];
  for(const [current,previous] of pairs){
    assert.equal(current.length,previous.length);
    assert.equal(Buffer.byteLength(current),Buffer.byteLength(previous));
    assert.equal(restoreCastCountWordingBefore804(current),previous);
  }
  assert.equal(restoreCastCountWordingBefore804('NO OTHER ACTORS: exactly six bodies.'),'NO OTHER ACTORS: exactly six bodies.');
});
test('the normal compiler passes declared party context to both prompt and QA contracts without rewriting the saved scenario',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try {
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const input={enabled:true,scenarioMode:'book-page-4-continue',colorMode:'monochrome',castList:fixture.castList,scenario:fixture.scenario,userDirection:fixture.userDirection};
    const source=m.readExperimentalSource(input);
    const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify({count:4,layout:'vertical_page',reason:'配置は承認台本を使う',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:extractActionOnly(p.text,fixture.castList),dialogueIds:p.dialogueIds}))}));
    assert.equal(prepared.source.scenario,fixture.scenario);
    assert.deepEqual(prepared.plan.expectedDialogue,source.dialogue);
    for(const panel of [1,2])assert.equal(prepared.plan.expectedCast.find(p=>p.panel===panel).names.length,6);
    assert.ok(prepared.plan.expectedCast.find(p=>p.panel===4).names.includes('石の守護獣'));
    for(const panel of [1,2,4]){
      const text=prepared.prompt.split(`[PAGE FRAME P${panel} |`)[1].split(`[END PAGE FRAME P${panel}]`)[0];
      assert.doesNotMatch(text,/ABSENT:[^\n]*石の守護獣/);
      assert.match(text,/bodies/);
      assert.equal(prepared.plan.panels[panel-1].camera,source.panels[panel-1].camera);
    }
  }finally{await server.close();}
});
test('saved preimage failure keeps the physical opponent and the explicitly counted five-person party',()=>{
  const expected=['アカリ','ヒカリ','ミク','リン','サエコ','石の守護獣'].sort();
  for(const index of [0,1,3]) {
    const rule=extractCastLimitRule(panels[index],fixture.castList,{compact:true,storyText:fixture.scenario,groupContext:fixture.userDirection});
    assert.ok(names(rule).includes('石の守護獣'),`P${index+1}: physical opponent`);
    if(index<2)assert.deepEqual(names(rule),expected,`P${index+1}: counted party and visible opponent`);
    assert.doesNotMatch(rule,/ABSENT:[^\n]*石の守護獣/);
    assert.doesNotMatch(rule,/(?:exactly|TOTAL) \d+ (?:people|full-size people)/);
    assert.match(rule,/bodies/);
  }
});

test('unique qualified body references allow reflexive ownership and camera sides, not quoted/historical/ambiguous bodies',()=>{
  const cast='## 配達員\n## 鋼の機械獣';
  for(const text of ['状況: 鉤が機械獣自身の右前腕にある石板の縁へ掛かる。','[Camera: 機械獣の右側面から、前腕の継ぎ目を見通す。]','状況: 配達員が機械獣を見据える。']) {
    assert.ok(names(extractCastLimitRule(text+'\n配達員「今だ」',cast,{compact:true})).includes('鋼の機械獣'),text);
  }
  for(const pause of ['、','，',', ',' '])assert.ok(names(extractCastLimitRule(`状況: 前へ崩れた機械獣の${pause}開いた胸部へ配達員が踏み込む。\n配達員「今だ」`,cast,{compact:true})).includes('鋼の機械獣'));
  for(const text of ['機械獣自身の腕について話す。','機械獣自身の腕の写真を見通す。','「機械獣自身の腕に掛かる」と書いた紙。','機械獣自身の腕は画面外にある。','回想では機械獣自身の腕が光った。']) {
    assert.deepEqual(names(extractCastLimitRule('状況: '+text+'\n配達員「今だ」',cast,{compact:true})),['配達員'],text);
  }
  for(const collision of ['## 木の機械獣','## 機械獣']) {
    const result=names(extractCastLimitRule('状況: 鉤が機械獣自身の右前腕に掛かる。\n配達員「今だ」',cast+'\n'+collision,{compact:true}));
    assert.ok(!result.includes('鋼の機械獣'));
  }
  for(const object of ['手袋','腕時計','胸当て','首飾り','足跡','腕の模型']){
    assert.deepEqual(names(extractCastLimitRule(`状況: 騎士の${object}だけが机に置かれている。\n配達員「届いたよ」`,'## 配達員\n## 城の騎士',{compact:true})),['配達員']);
  }
});

test('party context requires an explicit counted list and a present group, never a generic or quoted mention',()=>{
  const cast='## 甲\n## 乙\n## 丙\n## 岩の巨人';
  const story='[Camera: 三人と岩の巨人の距離を広角で捉える。]\n状況: 甲が岩の巨人の腕を見上げる。';
  const rule=text=>extractCastLimitRule(text+'\n甲「進もう」',cast,{compact:true,storyText:story,groupContext:'3人、甲・乙・丙を再利用。'});
  assert.deepEqual(names(rule('状況: 周囲の仲間は石の陰から核へ目を向ける。')),['丙','乙','甲'].sort());
  for(const text of ['状況: 甲が「周囲の仲間は石の陰から目を向ける」と話す。','状況: 仲間について話す。','状況: 周囲の仲間は画面外にいる。'])assert.deepEqual(names(rule(text)),['甲'],text);
  assert.deepEqual(names(extractCastLimitRule('状況: 周囲の仲間は目を向ける。\n甲「進もう」',cast,{compact:true})),['甲']);
  const ambiguous=story+'\n[Camera: 三人と丙の距離を捉える。]';
  assert.deepEqual(names(extractCastLimitRule('状況: 周囲の仲間は目を向ける。\n甲「進もう」',cast,{compact:true,storyText:ambiguous})),['甲']);
  assert.deepEqual(names(extractCastLimitRule('状況: 客三人が目を向ける。\n甲「進もう」',cast,{compact:true,storyText:story})),['甲']);
});

test('explicit party enumeration resolves a camera count but rejects contradictory, quoted and unrelated groups',()=>{
  const cast='## 甲\n## 乙\n## 丙\n## 岩の巨人';
  const panel='[Camera: 広角の引きで三人と石畳の距離を見せる。]\n甲「進もう」';
  const rule=groupContext=>names(extractCastLimitRule(panel,cast,{compact:true,groupContext}));
  assert.deepEqual(rule('いつもの3人、甲・乙・丙を再利用。'),['丙','乙','甲'].sort());
  assert.deepEqual(rule('いつもの３人、甲・乙・丙を再利用。'),['丙','乙','甲'].sort());
  for(const context of ['「3人、甲・乙・丙」と書いた札。','3人、甲・乙を再利用。','2人、甲・乙・丙を再利用。','13人、甲・乙・丙を再利用。','3人、甲・乙・丙。3人、甲・乙・岩の巨人。','3人、甲・乙・丙について話す。'])assert.deepEqual(rule(context),['甲'],context);
  assert.deepEqual(names(extractCastLimitRule('状況: 周囲の仲間は画面外にいる。\n甲「進もう」',cast,{compact:true,groupContext:'3人、甲・乙・丙を再利用。'})),['甲']);
  for(const text of ['状況: 三人が写る画面を甲が持つ。','状況: 三人は画面外で待つ。甲が窓を開く。','[Camera: 三人は画角外。甲の手元だけ。]','状況: 三人は描かない。甲が窓を開く。','状況: 三人の肖像を甲が見上げる。'])assert.deepEqual(names(extractCastLimitRule(text+'\n甲「ここだ」',cast,{compact:true,groupContext:'3人、甲・乙・丙を再利用。'})),['甲'],text);
});
