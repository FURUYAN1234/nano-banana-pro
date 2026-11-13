import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {runPageImageQuality}=await server.ssrLoadModule('/src/lib/image-quality-failsafe.js');
  const composition={layout:'free',frames:[{x:.5,y:0,w:.5,h:1},{x:0,y:0,w:.5,h:.33},{x:0,y:.33,w:.5,h:.33},{x:0,y:.66,w:.5,h:.34}],reason:'右の演者を大きく描き、左の三つの反応につなぐ。',heroPanels:[1],foregrounds:[{panel:1,character:'客演者',over:[2,3,4],placement:'全身の右肩と上腕を左の小コマへ連続させ、文字を隠さない。'}],breakouts:[],bleed:[{panel:1,edges:['right','bottom']}]};
  const makeInput=(action,extra='')=>({enabled:true,scenarioMode:'experimental-manga',castList:'## ユウ\n短い黒髪。\n## ミオ\n丸眼鏡。',colorMode:'color',scenario:`Title: 舞台の記録\nPageComposition: ${JSON.stringify(composition)}\n`+Array.from({length:4},(_,i)=>`[${i+1}コマ目]\n[Camera: ${i?'高所から俯瞰':'床近くから見上げる全身'}]\n[EMOTION: NORMAL]\n状況: ${i?'ミオが椅子に座る。':action}\n${i?'ミオ「見えるね。」':'ユウ「こちらだよ。」'+extra}`).join('\n')});
  const prepare=async input=>{
    const source=m.readExperimentalSource(input);
    return m.prepareExperimentalManga(input,async()=>JSON.stringify({count:4,layout:'free',reason:'元の配置と出来事を保持する。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',action:p.text,dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))}));
  };
  test('a silent scripted guest without a reference sheet survives the ordinary STEP3 contract',async()=>{
    const result=await prepare(makeInput('客演者は片膝をゆるめ、片手を腰に置いた大きなポーズ。ユウが横で見上げる。'));
    assert.deepEqual(result.plan.expectedCast[0].names,['ユウ','客演者']);
    assert.match(result.prompt,/GUEST CONTINUITY: \[客演者\]/);
    assert.match(result.prompt,/PAGE DOMINANT FIGURE F1: 客演者/);
    assert(result.plan.expectedCast.slice(1).every(p=>!p.names.includes('客演者')),'incoming figure must not add local guest bodies');
  });
  test('foreground review distinguishes a later scene from a detached part of the same body', async()=>{
    const input=makeInput('客演者は片膝をゆるめ、片手を腰に置いた大きなポーズ。ユウが横で見上げる。');
    const result=await prepare(input);
    const review=m.buildExperimentalReviewPrompt(result.plan,m.readExperimentalSource(input));
    assert.match(review,/scripted reappearance in a later panel is its own scene/);
    assert.match(review,/different neighboring edge\/body part is minor_variation/);
    assert.match(review,/SAME scene\/body/);
    assert.match(review,/unconfirmed intended connection is uncertain/);
  });
  test('a depicted silent figure is preserved separately from physical visitors and tiny replicas',async()=>{
    const result=await prepare(makeInput('モニターの画面内の客演者の風刺再現像は片膝をゆるめ、片手を腰に置いた大きなポーズ。ユウが横で見上げる。'));
    assert.deepEqual(result.plan.expectedCast[0].names,['ユウ']);
    assert.deepEqual(result.plan.expectedCast[0].depictedNames,['客演者']);
    assert.match(result.prompt,/SCRIPTED DEPICTED FIGURES: \[客演者\]/);
    assert.doesNotMatch(result.prompt,/DIEGETIC REPLICA LAYER: \[客演者\].*tiny/);
    assert.match(result.prompt,/PAGE DOMINANT FIGURE F1: 客演者/);
  });
  test('missing, quoted, text-only, offscreen or explicitly undrawn names cannot authorize a foreground',async()=>{
    for(const action of [
      'ユウがモニターを見上げる。',
      'ユウが「客演者は片手を腰に置いたポーズ」と書かれた文字だけを見る。',
      '客演者の名前がモニターに表示される。ユウが見上げる。',
      '客演者は画面外で待機する。ユウが見上げる。',
      '客演者は描かない。ユウが見上げる。',
      '客演者の再現像は表示しない。ユウが見上げる。',
      '客演者はポーズを取るが、その姿は描かない。ユウが見上げる。',
    ])await assert.rejects(prepare(makeInput(action)),/可視人物/,action);
    await assert.rejects(prepare(makeInput('ユウが見上げる。','\nユウ「客演者はポーズを取るよ。」')),/可視人物/);
  });
  test('a referenced depiction remains a drawing, including an exclusive silent pose',async()=>{
    const input=makeInput('モニター内の客演者の再現像だけは片手を腰に置いたポーズを保つ。ユウが横で見上げる。');
    input.castList+='\n## 客演者\n長い灰色の髪。';
    const result=await prepare(input);
    assert.deepEqual(result.plan.expectedCast[0].names,['ユウ']);
    assert.deepEqual(result.plan.expectedCast[0].depictedNames,['客演者']);
    const frame=result.prompt.split('[PAGE FRAME P1 |')[1].split('[END PAGE FRAME P1]')[0];
    assert.doesNotMatch(frame,/ABSENT:.*\[客演者\]|DIEGETIC REPLICA LAYER:.*\[客演者\]/);
  });
  test('the contract remains name-independent and keeps a later local guest appearance',async()=>{
    const input=makeInput('客演者が大きく手を振る。ユウが横で見上げる。');
    input.scenario=input.scenario.replaceAll('客演者','Alex Rivera').replace('状況: ミオが椅子に座る。','状況: Alex Riveraが椅子に座る。ミオは横で見守る。');
    const result=await prepare(input);
    assert(result.plan.expectedCast[0].names.includes('Alex Rivera'));
    assert(result.plan.expectedCast[1].names.includes('Alex Rivera'));
  });
  test('speech from a screen does not turn a depicted guest into a physical visitor',async()=>{
    const input=makeInput('画面内の客演者の再現像は片手を腰に置いたポーズ。ユウが見上げる。','\n客演者「どうぞ。」');
    const result=await prepare(input);
    assert.deepEqual(result.plan.expectedCast[0].names,['ユウ']);
    assert.deepEqual(result.plan.expectedCast[0].depictedNames,['客演者']);
    assert(result.plan.expectedDialogue.some(line=>line.speaker==='客演者'&&line.text==='どうぞ。'));
  });
  test('six depicted appearances leave room for one complete multi-defect repair beside five detailed reference sheets',async()=>{
    const input=JSON.parse(readFileSync(new URL('./fixtures/scripted-depiction-page.json',import.meta.url),'utf8'));
    const source=m.readExperimentalSource(input);
    const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify({count:6,layout:'free',reason:'元構成を保持。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))}));
    assert(prepared.plan.expectedCast.every(p=>p.depictedNames?.includes('展示役')));
    // Captured structural/lettering evidence, with all named people anonymized.
    const issues=input.reviewIssues;
    let edits=0;
    const result=await runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,originalCandidate:{base64Img:'fixture'},originalPrompt:prepared.prompt,repairPromptMaxChars:30390,
      reviewCandidate:async()=>({pass:false,issues}),generateRepairCandidate:async prompt=>{
        edits++;assert(prompt.length<=30390);assert(prompt.endsWith(prepared.prompt));
        for(const issue of issues)assert(prompt.includes(`panel ${issue.panel}`));
        for(const line of prepared.plan.expectedDialogue)assert(prompt.includes(line.text));
        return {base64Img:'edited-fixture'};
      }});
    if(result.repairError)throw result.repairError;
    assert.equal(edits,1);assert.equal(result.stopReason,'single_repair_completed');
  });
} finally {await server.close();}
