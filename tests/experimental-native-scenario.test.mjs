import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const { extractDialogueOnly } = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const {resolvePageWorkflow}=await server.ssrLoadModule('/src/lib/page-workflow.js');
  const inputFor=count=>({enabled:true,scenarioMode:'experimental-manga',castList:'## ユウ',colorMode:'color',scenario:Array.from({length:count},(_,i)=>`[${i+1}コマ目]\n[Camera: 高い位置から俯瞰]\n[EMOTION: NORMAL]\n状況: ユウが道具を順に確かめる。\n${i===2?'セリフなし':`ユウ「確認${i+1}」`}`).join('\n')});
  const planFor=source=>({count:source.panels.length,layout:'two_columns',reason:'動作順を保ち、隣り合う場面を対比する',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが指定の道具を確かめる。',dialogueIds:p.dialogueIds,breakout:null}))});
  test('native five and eight panels survive STEP3 once, without expansion or silent padding',async()=>{
    for(const count of [5,8]) {
      const input=inputFor(count),source=m.readExperimentalSource(input),plan=planFor(source);let calls=0;
      const prepared=await m.prepareExperimentalManga(input,async prompt=>{
        calls++;assert.match(prompt,/one.to.one/i);assert.doesNotMatch(prompt,/Expand the four beats|addedDialogue.*optional|choose count=5/i);return JSON.stringify(plan);
      });
      assert.equal(calls,1);assert.equal(prepared.plan.count,count);
      assert.equal(prepared.plan.panels.filter(p=>!p.dialogueIds.length).length,1);
      assert.equal(prepared.plan.expansionReview,undefined);
      assert.equal(resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:prepared.prompt,input}).count,count);
      assert.match(prepared.prompt,new RegExp(`EXACTLY ${count} framed panels`));
    }
  });
  test('wrong-mode scenarios fail before an API request',async()=>{
    for(const count of [4,9]) {
      let calls=0;
      await assert.rejects(m.prepareExperimentalManga(inputFor(count),async()=>{calls++;return '{}';}),/5.*8|コマ/);
      assert.equal(calls,0);
    }
  });
  test('native eye-level source cameras fail before planning or an earlier balloon repair request',async()=>{
    for(const camera of ['目線の高さから望遠の中景','床近く、座った人物の目の高さから撮る','eye-level shot']) {
      for(const malformedBalloon of [false,true]) {
        const input=inputFor(5);let panel=0,calls=0;
        input.scenario=input.scenario.replace(/\[Camera: [^\]]+\]/g,original=>++panel===3?`[Camera: ${camera}]`:original);
        if(malformedBalloon) input.scenario=input.scenario.replace('状況:','BalloonLayout: []\n状況:');
        const failure=await m.prepareExperimentalManga(input,async()=>{calls++;throw new Error('unexpected paid request');}).catch(error=>error);
        assert.equal(calls,0,`${camera}; malformed balloon=${malformedBalloon}`);
        assert.match(failure.message,/3コマ目.*アイレベル/);
      }
    }
  });
  test('native camera preflight preserves negations, legitimate elevation and unspecified height',async()=>{
    for(const camera of ['アイレベルではなく、手元を高所から俯瞰','目の高さより高い右後方から30度俯瞰','低い位置から見上げる。魚眼・アイレベルは使わない。','camera positioned above eye level','low angle, not eye-level','正面、望遠のダッチアングル','アイレベル禁止、望遠の接写']) {
      const input=inputFor(5);let panel=0,calls=0;
      input.scenario=input.scenario.replace(/\[Camera: [^\]]+\]/g,original=>++panel===3?`[Camera: ${camera}]`:original)
        .replace('ユウが道具を順に確かめる。','ユウが道具を目の高さへ持ち上げる。');
      const source=m.readExperimentalSource(input),plan=planFor(source);
      const prepared=await m.prepareExperimentalManga(input,async()=>{calls++;return JSON.stringify(plan);});
      assert.equal(calls,1,camera);assert.equal(prepared.source.scenario,input.scenario);
      assert.equal(prepared.plan.panels[2].camera,camera);
      assert.ok(prepared.prompt.includes(camera));
    }
  });
  test('native conversion rejects added panels, reordered scenes, moved dialogue and changed cameras',()=>{
    const source=m.readExperimentalSource(inputFor(5));
    for(const mutate of [p=>{p.panels.push({...p.panels[4]});p.count=6;},p=>{p.panels[2].kind='insert';},p=>{[p.panels[0],p.panels[1]]=[p.panels[1],p.panels[0]];},p=>{p.panels[0].camera='下からアオリ';},p=>{p.panels[2].dialogueIds=p.panels[0].dialogueIds;p.panels[0].dialogueIds=[];},p=>{p.addedDialogue=[{id:'add:1',sourcePanel:1,speaker:'ユウ',text:'追加',purpose:'新規'}];}]) {
      const plan=planFor(source);mutate(plan);assert.throws(()=>m.validateExperimentalPlan(plan,source));
    }
    assert.doesNotThrow(()=>m.validateExperimentalPlan(planFor(source),source));
  });
  test('intentional silent framing remains allowed without adding a new frame',()=>{
    const source=m.readExperimentalSource(inputFor(5)),plan=planFor(source);
    plan.panels[2].visualEffects=['silent_pause'];assert.doesNotThrow(()=>m.validateExperimentalPlan(plan,source));
    plan.panels[0].visualEffects=['silent_pause'];assert.throws(()=>m.validateExperimentalPlan(plan,source),/無言/);
  });

  const balloon = (speaker='ユウ', x=0.7) => ({speaker,x,anchor:'右側の頭の輪郭',route:'上の余白から頭へ'});
  const recoveryInput = (count=6) => {
    const input=inputFor(count);
    input.castList+='\n## ナギ';
    input.scenario=input.scenario.replace('状況:', `BalloonLayout: ${JSON.stringify([balloon()])}\n状況:`)
      .replace(`[${count}コマ目]`, `[${count}コマ目]\nBalloonLayout: ${JSON.stringify([balloon(),balloon('ナギ',0.3)])}`);
    return input;
  };
  const fixedScenario = input => input.scenario.replace(JSON.stringify([balloon(),balloon('ナギ',0.3)]),JSON.stringify([balloon()]));
  const patch = count => JSON.stringify([{panel:count,field:'BalloonLayout',value:[balloon()]}]);
  test('native STEP3 repairs only broken balloon metadata once before planning, including panels5–8', async()=>{
    for(const count of [5,6,7,8]) {
      const input=recoveryInput(count), original=input.scenario, progress=[];
      const fixed=fixedScenario(input), source=m.readExperimentalSource({...input,scenario:fixed});
      let calls=0;
      const prepared=await m.prepareExperimentalManga({...input,onProgress:message=>progress.push(message)},async prompt=>{
        calls++;
        if(calls===1) {assert.match(prompt,/BalloonLayoutだけ/);assert.match(prompt,new RegExp(`確認${count}`));return patch(count);}
        assert.equal(calls,2);return JSON.stringify(planFor(source));
      });
      assert.equal(calls,2);
      assert.equal(input.scenario,original);
      assert.equal(prepared.source.scenario,fixed);
      assert.equal(prepared.source.scenario.replace(/^BalloonLayout:.*$/gm,''),original.replace(/^BalloonLayout:.*$/gm,''));
      assert.equal(prepared.colorLayoutContext.scenario,fixed);
      assert.equal(resolvePageWorkflow({experimentalEnabled:true,prepared,prompt:prepared.prompt,input:{...input,scenario:fixed}}).count,count);
      assert.equal(prepared.source.panels[2].dialogueIds.length,0);
      assert.ok(progress.some(message=>message.includes('自動修復')));
      let repeated=0;
      const recolored=await m.prepareExperimentalManga({...input,scenario:fixed,colorMode:'monochrome'},async()=>{repeated++;assert.fail('no repeated API after recovery');},{colorOnlyPrepared:prepared});
      assert.equal(repeated,0);assert.deepEqual(recolored.plan,prepared.plan);
    }
  });
  test('native repair rejects content edits, healthy-panel edits, invalid layout and API errors without planning or retry',async()=>{
    const input=recoveryInput();
    for(const raw of ['not JSON',JSON.stringify([{panel:6,field:'Camera',value:'正面'}]),
      JSON.stringify([{panel:1,field:'BalloonLayout',value:[balloon()]}]),
      JSON.stringify([{panel:6,field:'BalloonLayout',value:[]}]),
      JSON.stringify([{panel:6,field:'BalloonLayout',value:[balloon()],dialogue:'改変'}])]) {
      let calls=0;
      await assert.rejects(m.prepareExperimentalManga(input,async()=>{calls++;return raw;}),error=>error.code==='BALLOON_LAYOUT_REPAIR_FAILED'&&error.message.includes('6コマ目'));
      assert.equal(calls,1);
    }
    let calls=0;const cause=Object.assign(new Error('provider unavailable'),{status:503});
    await assert.rejects(m.prepareExperimentalManga(input,async()=>{calls++;throw cause;}),error=>error.code==='BALLOON_LAYOUT_REPAIR_FAILED'&&error.cause===cause);
    assert.equal(calls,1);
  });
  test('native cancellation during balloon repair cannot publish a plan or prompt',async()=>{
    const controller=new AbortController();let calls=0;
    await assert.rejects(m.prepareExperimentalManga({...recoveryInput(),signal:controller.signal},async(_prompt,signal)=>{
      calls++;assert.equal(signal,controller.signal);controller.abort();return patch(6);
    }),{name:'AbortError'});
    assert.equal(calls,1);
  });
  test('native orchestration consumes its own repaired source without weakening supplied-plan identity checks',async()=>{
    const input=recoveryInput(6);delete input.scenarioMode;
    const fixed=fixedScenario(input), source=m.readExperimentalSource({...input,scenario:fixed});
    let requests=0,images=0;
    const result=await m.runExperimentalManga(input,{
      plan:async()=>++requests===1?patch(6):JSON.stringify(planFor(source)),
      image:async()=>{images++;return {base64Img:'test-only',mimeType:'image/png'};},
      review:async()=>{throw new Error('test-only unavailable review');},
    });
    assert.equal(requests,2);assert.equal(images,1);assert.equal(result.source.scenario,fixed);
    const prepared=await m.prepareExperimentalManga({...input,scenario:fixed},async()=>JSON.stringify(planFor(source)));
    await assert.rejects(m.runExperimentalManga({...input,prepared},{image:async()=>{images++;}}),/変更/);
    assert.equal(images,1,'a caller-supplied plan cannot silently change the scenario');
  });

  for (const compact of [false, true]) test(`${compact ? 'compact' : 'ordinary'} native prompt binds local balloon labels to the same dialogue without additional speech`, () => {
    const input = inputFor(5);
    let panel = 0;
    input.scenario = input.scenario.replace(/状況:/g, () => {
      const index = panel++;
      return 'BalloonLayout: ' + JSON.stringify(index === 2 ? [] : [{ speaker: 'ユウ', x: 0.7, anchor: 'ユウの口元', route: '上の余白からユウの口元へ' }]) + '\n状況:';
    });
    const source = m.readExperimentalSource(input), plan = planFor(source);
    const prompt = m.buildExperimentalImagePrompt(plan, source, { ...input, ...(compact ? { promptMaxChars: 1 } : {}) });
    const mapping = 'BALLOON LAYOUT: Bn = nth Dialogue entry in that frame; metadata for the SAME balloon, not additional speech.';
    assert.equal(prompt.split(mapping).length - 1, 1);
    assert.ok(prompt.indexOf(mapping) < prompt.indexOf('[PAGE FRAME P1 |'));
    const frames = prompt.split('[PAGE FRAME ').slice(1).map(frame => frame.split('[END PAGE FRAME')[0]);
    for (const [index, frame] of frames.entries()) {
      assert.ok(frame.includes(source.panels[index].camera));
      if (index === 2) { assert.match(frame, /Dialogue: SILENT/); assert.doesNotMatch(frame, /BALLOON LAYOUT/); }
      else {
        assert.equal((frame.match(/B1 x=0\.7/g) || []).length, 1);
        const entry = source.dialogue[source.panels[index].dialogueIds[0]];
        assert.ok(frame.includes(JSON.stringify(entry)));
        assert.equal(prompt.split(JSON.stringify(entry.text)).length - 1, 1);
      }
    }
    assert.equal(prompt.includes(' ALL ACTORS.'), compact, 'both renderer branches are exercised');
  });

  test('native frames retain each approved balloon placement exactly once without duplicating speech', async () => {
 
    for (const count of [5, 6, 7, 8]) for (const colorMode of ['color', 'monochrome']) {
      const castList = '## ユウ（進行役）\n## ナギ';
      const scenario = Array.from({ length: count }, (_, i) => {
        const layout = i === count - 1 ? [] : [
          { speaker: 'ユウ（進行役）', x: 0.76, anchor: '右手前のユウの口元、位置' + (i + 1), route: '上の余白' + (i + 1) + 'からユウの口へ' },
          { speaker: 'ナギ', x: 0.28, anchor: '左奥のナギの口元、位置' + (i + 1), route: '左の余白' + (i + 1) + 'からナギの口元へ' },
        ];
        return '[' + (i + 1) + 'コマ目]\n[Camera: ' + (i === 1 ? 'ユウの肩越し、後頭部を手前に置く高所からの俯瞰' : '高い位置から強い俯瞰') + ']\n[EMOTION: NORMAL]\nBalloonLayout: ' + JSON.stringify(layout) + '\n状況: ユウとナギが段階' + (i + 1) + 'の配置を確認する。\n' + (i === count - 1 ? 'セリフなし' : 'ユウ「手順' + (i + 1) + 'です。」\nナギ「確認' + (i + 1) + 'できた。」');
      }).join('\n');
      const input = { enabled: true, scenarioMode: 'experimental-manga', scenario, castList, colorMode };
      const source = m.readExperimentalSource(input), plan = planFor(source);
      const prepared = await m.prepareExperimentalManga(input, async () => JSON.stringify(plan));
      const frames = prepared.prompt.split('[PAGE FRAME ').slice(1).map(frame => frame.split('[END PAGE FRAME')[0]);
      assert.equal(frames.length, count);
      assert.equal((prepared.prompt.match(/ BALLOON LAYOUT(?: \(NEVER PRINT; x=0 left\/1 right; preserve Camera\/Action\))?: B1 /g)||[]).length, count - 1);
      assert.doesNotMatch(prepared.prompt, /BalloonLayout:/, 'raw source JSON must not be printed a second time');
      for (const [i, frame] of frames.entries()) {
        const expected = extractDialogueOnly(source.panels[i].text, castList, { forImagePrompt: true, layoutOnly: true });
        if (i === count - 1) { assert.match(frame, /Dialogue: SILENT/); assert.doesNotMatch(frame, /BALLOON LAYOUT/); }
        else {
          const expectedBody=expected.replace(' BALLOON LAYOUT (NEVER PRINT; x=0 left/1 right; preserve Camera/Action): ','');
          assert.ok(frame.includes(expectedBody),'positions, speaker, anchor and route remain exact in either compiler form');
          for (const id of source.panels[i].dialogueIds) assert.equal(prepared.prompt.split(JSON.stringify(source.dialogue[id].text)).length - 1, 1);
          assert.match(frame, /B1 x=0\.76, \[ユウ\]/); assert.match(frame, /B2 x=0\.28, \[ナギ\]/);
        }
        assert.ok(frame.includes(source.panels[i].camera));
      }
      assert.match(frames[1], /ユウの頭の見える輪郭/); assert.doesNotMatch(frames[1], /ユウの口元|ユウの口へ/);
      let calls = 0;
      await assert.rejects(m.prepareExperimentalManga({ ...input, scenario: scenario.replace('"speaker":"ユウ（進行役）"', '"speaker":"ナギ"') }, async () => { calls++; return JSON.stringify(plan); }), /BalloonLayout/);
      assert.equal(calls, 1, 'wrong owners get one layout-only repair; a plan returned as repair must be rejected');
    }
  });

} finally {await server.close();}
