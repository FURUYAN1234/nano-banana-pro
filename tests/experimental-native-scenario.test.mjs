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
      assert.equal(prepared.prompt.split('BALLOON LAYOUT (NEVER PRINT;').length - 1, count - 1);
      assert.doesNotMatch(prepared.prompt, /BalloonLayout:/, 'raw source JSON must not be printed a second time');
      for (const [i, frame] of frames.entries()) {
        const expected = extractDialogueOnly(source.panels[i].text, castList, { forImagePrompt: true, layoutOnly: true });
        if (i === count - 1) { assert.match(frame, /Dialogue: SILENT/); assert.doesNotMatch(frame, /BALLOON LAYOUT/); }
        else {
          assert.ok(frame.includes(expected));
          for (const id of source.panels[i].dialogueIds) assert.equal(prepared.prompt.split(JSON.stringify(source.dialogue[id].text)).length - 1, 1);
          assert.match(frame, /B1 x=0\.76, \[ユウ\]/); assert.match(frame, /B2 x=0\.28, \[ナギ\]/);
        }
        assert.ok(frame.includes(source.panels[i].camera));
      }
      assert.match(frames[1], /ユウの頭の見える輪郭/); assert.doesNotMatch(frames[1], /ユウの口元|ユウの口へ/);
      let calls = 0;
      await assert.rejects(m.prepareExperimentalManga({ ...input, scenario: scenario.replace('"speaker":"ユウ（進行役）"', '"speaker":"ナギ"') }, async () => { calls++; return JSON.stringify(plan); }), /BalloonLayout/);
      assert.equal(calls, 0, 'wrong owners must fail before another planning request');
    }
  });

} finally {await server.close();}
