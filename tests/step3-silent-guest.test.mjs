import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';
import {extractActionOnly,extractDialogueOnly,extractCastLimitRule,resolveScriptedReferenceRoles,buildScriptedReferenceRoleInstruction} from '../src/lib/panel-utils.js';

const fixture=JSON.parse(readFileSync(new URL('./fixtures/step3-silent-guest.json',import.meta.url),'utf8'));
const names=rule=>[...(rule.match(/(?:CAST COUNT:|ANTI-CLONE REMINDER:)[^\n]*/)?.[0]||'').matchAll(/\[([^\]]+)\]/g)].map(m=>m[1]).sort();
test('document quotations remain lettering while explicit readout and actual speakers stay dialogue',()=>{
  for(const document of ['回答書','答弁書','通知書','決定書','依頼書']){
    const action=`状況: ${document}の「回答の理由は不明です」は読めるままにする。`;
    assert.deepEqual(extractDialogueOnly(action,'## 回答者',{asEntries:true}),[],document);
    assert.ok(extractActionOnly(action,'## 回答者').includes('「回答の理由は不明です」'));
    const spoken=`状況: 回答者が${document}の「回答の理由は不明です」と読み上げる。`;
    assert.deepEqual(extractDialogueOnly(spoken,'## 回答者',{asEntries:true}).map(e=>e.text),['回答の理由は不明です']);
  }
  assert.deepEqual(extractDialogueOnly('回答書「話します。」','## 回答書',{asEntries:true}).map(e=>e.text),['話します。']);
});

test('reference casting uses only the unique unused generic reference and never asserts face identification',()=>{
  const cast='## 観察者\n## スーツ姿の男性';
  const story='状況: 来訪者の大きな上半身が右側を占める。\n観察者「どうぞ」';
  const unique=resolveScriptedReferenceRoles(cast,story,['来訪者']);
  assert.deepEqual(unique.bindings,[{referenceName:'スーツ姿の男性',scriptedName:'来訪者'}]);
  assert.match(buildScriptedReferenceRoleInstruction(unique),/not face identification/);
  const rule=extractCastLimitRule(story,cast,{compact:true,scriptedNames:['来訪者'],storyText:story});
  assert.deepEqual(names(rule),['来訪者','観察者'].sort());
  assert.doesNotMatch(rule,/ABSENT:[^\n]*スーツ姿の男性/);
  const separate=story+'\n状況: スーツ姿の男性は奥で待つ。';
  assert.deepEqual(resolveScriptedReferenceRoles(cast,separate,['来訪者']).bindings,[],'an independently scripted actor cannot be relabeled');
  const several=resolveScriptedReferenceRoles(cast+'\n## コート姿の男性',story,['来訪者']);
  assert.deepEqual(several.bindings,[]);
  assert.equal(several.unresolvedReferences.length,2);
  assert.match(buildScriptedReferenceRoleInstruction(several),/REFERENCE ROLE ALLOCATION/);
  const inferred=extractCastLimitRule(story,cast+'\n## コート姿の男性',{compact:true,scriptedNames:['来訪者'],storyText:story});
  assert.doesNotMatch(inferred,/ABSENT:[^\n]*(?:スーツ姿の男性|コート姿の男性)/);
  assert.deepEqual(names(inferred),['来訪者','観察者'].sort());
});

test('silent guest presence requires a visible current body, not just foreground metadata or possessions',()=>{
  const rule=text=>extractCastLimitRule('状況: '+text,'## 観察者',{compact:true,scriptedNames:['来訪者']});
  assert.ok(names(rule('来訪者の大きな上半身が画面右側を占める。彼は片手を机に残す。')).includes('来訪者'));
  for(const text of ['来訪者の手袋だけが机に置かれる。','来訪者の上半身の写真が机に置かれる。','来訪者は画面外にいる。','「来訪者の上半身が画面を占める」と書いてある。'])assert.ok(!names(rule(text)).includes('来訪者'),text);
  for(const text of ['写真の中で来訪者の大きな上半身が右側を占める。','来訪者の上半身がポスターに大きく描かれる。']){
    const result=rule(text);assert.ok(!names(result).includes('来訪者'),text);
    assert.match(result,/SCRIPTED DEPICTED FIGURES:.*来訪者/);
  }
  const collision=extractCastLimitRule('状況: 元来訪者の大きな上半身が右側を占める。','## 観察者\n## 元来訪者',{compact:true,scriptedNames:['来訪者']});
  assert.deepEqual(names(collision),['元来訪者']);
});

test('a silent foreground guest visibly moving on stairs or a ramp is counted in the source frame',()=>{
  const rule=text=>extractCastLimitRule('状況: '+text,'## 観察者',{compact:true,scriptedNames:['来訪者']});
  for(const text of [
    '来訪者は濃紺の服で、タラップを一段ずつ慎重に降りる。',
    '来訪者が階段を二段ずつ上る。',
    '来訪者はスロープをゆっくり下って入口へ進む。',
    '観察者が階段を上り、来訪者がタラップを降りる。',
  ]) assert.ok(names(rule(text)).includes('来訪者'),text);
  for(const text of [
    '来訪者は階段を降りる予定だ。',
    '来訪者は画面外で階段を降りる。',
    '来訪者の名前だけが階段の案内板に表示される。',
    '来訪者を放送で呼び出し、観察者が階段を降りる。',
    '来訪者はスケッチの作者、観察者が階段を降りる。',
  ]) assert.ok(!names(rule(text)).includes('来訪者'),text);
  const depiction=rule('写真の中で来訪者がタラップを降りる。');
  assert.doesNotMatch(depiction,/CAST COUNT:[^\n]*来訪者/);
  assert.match(depiction,/SCRIPTED DEPICTED FIGURES:.*来訪者/);
});

test('actual reported STEP3 scenario compiles with a single inferred reference role and unchanged authored data',async()=>{
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
  try{
    const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
    const input={scenario:fixture.scenario,castList:fixture.castList,colorMode:'color',userDirection:fixture.userDirection,allowScenarioQualityWarning:true};
    const source=m.readExperimentalSource(input);
    assert.equal(source.castList,fixture.castList);
    assert.equal(source.scenario,fixture.scenario);
    const last=source.dialogue.filter(entry=>entry.sourcePanel===5);
    assert.deepEqual(last.map(entry=>entry.speaker),['サエコ']);
    // The old response planned a spurious paper-text balloon. Keep the source
    // guard strict: only a new response using the corrected dialogue IDs passes.
    await assert.rejects(m.prepareExperimentalManga({...input,enabled:true},async()=>JSON.stringify(fixture.plan)),/元のコマの台詞/);
    const reply=structuredClone(fixture.plan);
    reply.panels.forEach((panel,index)=>{panel.dialogueIds=source.panels[index].dialogueIds;});
    const prepared=await m.prepareExperimentalManga({...input,enabled:true},async()=>JSON.stringify(reply));
    const plan=prepared.plan;
    const cast=plan.expectedCast.find(p=>p.panel===5);
    assert.ok(cast.names.includes('小泉防衛相'));
    assert.ok(!cast.names.includes('スーツ姿の男性'));
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/REFERENCE ROLE BINDING:[^\n]*スーツ姿の男性[^\n]*小泉防衛相/);
    assert.match(m.buildExperimentalReviewPrompt(plan,source,input),/REFERENCE ROLE BINDING:[^\n]*スーツ姿の男性[^\n]*小泉防衛相/);
    assert.doesNotMatch(prompt,/ABSENT:[^\n]*スーツ姿の男性/);
    assert.ok(prompt.includes('回答書の「存否を含め不開示」'));
    assert.ok(prompt.includes('小泉防衛相の「確認した」という発言の吹き出しが置かれる'));
    assert.equal(plan.panels[4].camera,source.panels[4].camera);
    assert.deepEqual(plan.expectedDialogue,source.dialogue);
  }finally{await server.close();}
});
