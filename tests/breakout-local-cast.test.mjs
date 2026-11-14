import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const c=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  const qa=await server.ssrLoadModule('/src/lib/image-quality-qa.js');
  const p=await server.ssrLoadModule('/src/lib/panel-utils.js');
  const inputFor=(action,speech='セリフなし',name='ユウ')=>({enabled:true,scenarioMode:'experimental-manga',hasCharacterReferences:false,colorMode:'color',castList:`## ${name}\n短い黒髪、青い作業服。\n## ミオ\n白髪、緑の作業服。`,scenario:
    'Title: 仕事の記録\nPageComposition: '+JSON.stringify({layout:'two_columns',reason:'最後に大きな反応を見せる。',heroPanels:[4],foregrounds:[],breakouts:[{panel:4,part:`${name}の頭・肩`,into:3}],bleed:[]})+'\n'+
    [1,2,3,4].map(n=>`[${n}コマ目]\n[Camera: ${n%2?'机の上方から見下ろす中景':'床から見上げる半身'}]\n[EMOTION: NORMAL]\n状況: ${n===3?action:n===4?`${name}が大きく笑う。`:'ミオが机で作業する。'}\n${n===3?speech:'セリフなし'}`).join('\n')});
  const prepare=async input=>{
    const source=m.readExperimentalSource(input);
    return m.prepareExperimentalManga(input,async()=>JSON.stringify({count:4,layout:'two_columns',reason:'元の各場面を保持する。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',action:p.text,dialogueIds:p.dialogueIds,breakout:null,visualEffects:[]}))}));
  };
  test('incoming breakout does not erase an independently acting or speaking local appearance',async()=>{
    for(const [action,speech,name] of [
      ['ユウはリールを押さえ、ミオが機械を再開する。','ユウ「動いたね。」','ユウ'],
      ['ミオは手を止め、ユウがレバーを引く。','セリフなし','ユウ'],
      ['Alex Riveraがレバーを引く。ミオは手を止める。','セリフなし','Alex Rivera'],
      ['前景のユウの肩が4コマ目から枠を越えるが、奥の別時点のユウの手はリールを押さえる。ミオは機械を再開する。','セリフなし','ユウ'],
      ['奥の別時点のユウの手はリールを押さえ、前景のユウの肩が4コマ目から枠を越える。ミオは機械を再開する。','セリフなし','ユウ'],
    ]) {
      const result=await prepare(inputFor(action,speech,name));
      assert(result.plan.expectedCast[2].names.includes(name),`${name} remains a local story actor`);
      assert.match(result.prompt,/この小コマ自身の別時点の登場は下記人数に含み/);
    }
  });
  test('an incoming silhouette or reserved receiving area does not authorize another local body',async()=>{
    for(const action of ['ミオがレバーを引く。','ミオがレバーを引く。次のコマからユウの肩が出る余白を空ける。','ミオがレバーを引く。ユウの頭と肩が4コマ目から枠を越えて続く。','ミオがレバーを引く。4コマ目からユウが枠を越えてはみ出す。']) {
      const result=await prepare(inputFor(action));
      assert.deepEqual(result.plan.expectedCast[2].names,['ミオ']);
    }
  });
  test('the restored local cast still rejects grounded duplicate and missing bodies',async()=>{
    const result=await prepare(inputFor('ユウがレバーを引く。ミオは機械を押さえる。'));
    const names=result.plan.expectedCast[2].names;
    const inventory=names.map((name,i)=>({name,status:'ok',observed_count:1,instances:[{body_id:'b'+i,location:`机の${i?'右':'左'}の独立した身体`,matched_features:['短い髪','青い作業服']}]}));
    assert.deepEqual(qa.castInventoryIssues(inventory,3,names),[]);
    const duplicate=structuredClone(inventory);duplicate[0].observed_count=2;duplicate[0].instances.push({body_id:'extra',location:'奥にある二つ目の独立した身体',matched_features:['短い髪','青い作業服']});
    assert(qa.castInventoryIssues(duplicate,3,names).some(issue=>issue.type==='cast_count'));
    const absent=structuredClone(inventory);absent[0]={name:names[0],status:'defect',observed_count:0,instances:[],evidence:'机の左には人物が見えず、空いた床と椅子だけが描かれている。'};
    assert(qa.castInventoryIssues(absent,3,names).some(issue=>issue.type==='cast_count'));
  });
  test('text-only NORMAL generation and review use the shared concrete normal recipe',async()=>{
    for(const colorMode of ['color','monochrome']) {
      const input={...inputFor('ミオがレバーを引く。'),colorMode};
      const result=await prepare(input);
      const recipe=p.buildNormalPanelRendering(colorMode);
      assert(result.prompt.includes(recipe));
      assert(m.buildExperimentalReviewPrompt(result.plan,result.source,input).includes(recipe));
      assert.doesNotMatch(result.prompt,/Use the established source\/reference character drawing style/);
      const refs=m.buildExperimentalImagePrompt(result.plan,result.source,{...input,hasCharacterReferences:true});
      assert.match(refs,/Use the established source\/reference character drawing style/);
    }
  });
  test('a breakout fragment requires grounded continuity and cannot exempt the separate local actor',async()=>{
    const result=await prepare(inputFor('ユウがレバーを引く。ミオは機械を押さえる。'));
    const review={compositionChecks:[{id:'breakout:P4',status:'pass',observed:'左の胴から右の肩へ輪郭が続き、枠線は身体の背後で途切れる。'}],evidence:[
      {panel:4,physical_bodies:[{id:'source',features:['短い黒髪','青い作業服']}],cast_instances:[{name:'ユウ',status:'ok',instances:[{body_id:'source',matched_features:['短い黒髪','青い作業服']}]}]},
      {panel:3,physical_bodies:[{id:'fragment',features:['青い作業服','袖の白い縫い目']},{id:'local',features:['短い黒髪','青い作業服']}],cast_instances:[{name:'ユウ',status:'ok',instances:[{body_id:'local',matched_features:['短い黒髪','青い作業服']}]}],body_dispositions:[{body_id:'fragment',kind:'foreground',source_panel:4,source_body_id:'source',observed_features:['青い作業服','袖の白い縫い目'],evidence:'左の身体からこの袖まで一続きの輪郭が確認できる。'}]},
    ]};
    assert.equal(c.observedForegroundBodies(review,result.plan,3).get('fragment')?.panel,4);
    assert(!c.observedForegroundBodies(review,result.plan,3).has('local'));
    assert.match(m.buildExperimentalReviewPrompt(result.plan,result.source),/Authored cross-panel layers:.*breakouts/);
    for(const damage of [r=>r.compositionChecks[0].status='uncertain',r=>r.compositionChecks[0].status='fail',r=>r.evidence[0].cast_instances[0].instances[0].matched_features=['invented'],r=>r.evidence[1].body_dispositions[0].body_id='local']) {
      const bad=structuredClone(review);damage(bad);
      assert.equal(c.observedForegroundBodies(bad,result.plan,3).size,0);
    }
  });
  test('NORMAL review keeps concrete media mismatches and missing evidence distinct',async()=>{
    const {plan}=await prepare(inputFor('ミオがレバーを引く。'));
    const report={inspectionVersion:5,status:'pass',observedCount:4,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'uncertain',pageEvidence:'題字とクレジットが読める。',issues:[],expectedStyles:[1,2,3,4].map(panel=>({panel,style:'NORMAL'})),evidence:[1,2,3,4].map(panel=>({panel,center:panel%2?[.75,panel<3?.25:.75]:[.25,panel<3?.25:.75],camera:'机の上面と奥行きが見える。',style:'不透明な色面と清潔な輪郭線。',story:'機械と手元の動作が読める。',anatomy:'身体の連続した輪郭が見える。',style_observation:{medium:'NORMAL',status:'pass',evidence:'不透明な色面と清潔な輪郭線。',actors:[]},physical_bodies:[],cast_instances:[]}))};
    assert.equal(m.validateExperimentalReview(report,plan).style,'pass');
    const mismatch=structuredClone(report);mismatch.evidence[0].style_observation.medium='WATERCOLOR';
    assert.equal(m.validateExperimentalReview(mismatch,plan).style,'fail');
    const unreadable=structuredClone(report);unreadable.evidence[0].style_observation.evidence=null;
    assert.equal(m.validateExperimentalReview(unreadable,plan).style,'uncertain');
  });
  test('the new cast/style compiler revision invalidates old cached layouts',async()=>{
    const input=inputFor('ミオがレバーを引く。'),prepared=await prepare(input);
    assert.equal(prepared.colorLayoutContext.revision,m.EXPERIMENTAL_PROMPT_REVISION);
    assert(m.EXPERIMENTAL_PROMPT_REVISION>=68);
    await m.prepareExperimentalManga(input,async()=>assert.fail('current validated cache should be reusable'),{colorOnlyPrepared:prepared});
    const legacy={...prepared,colorLayoutContext:{...prepared.colorLayoutContext,revision:67}};
    let calls=0;
    await m.prepareExperimentalManga(input,async()=>{calls++;return JSON.stringify(prepared.plan);},{colorOnlyPrepared:legacy});
    assert.equal(calls,1);
  });
  test('free frame labels use authored extents including margins; fixed layouts keep their positions',async()=>{
    const input=inputFor('ミオがレバーを引く。');
    const authored=JSON.parse(input.scenario.match(/^PageComposition: (.+)$/m)[1]);
    authored.layout='free';authored.frames=[{x:.51,y:0,w:.47,h:.2},{x:.02,y:0,w:.47,h:.2},{x:.02,y:.22,w:.96,h:.38},{x:.02,y:.60,w:.96,h:.40}];
    const free=await prepare({...input,scenario:input.scenario.replace(/^PageComposition: .+$/m,'PageComposition: '+JSON.stringify(authored))});
    for(const [i,side]of ['RIGHT','LEFT','FULL WIDTH','FULL WIDTH'].entries()) {
      assert(free.prompt.includes(`[PAGE FRAME P${i+1} | ${side},`));
      assert(m.buildExperimentalReviewPrompt(free.plan,free.source).includes(`"panel":${i+1},"position":"${side},`));
    }
    const fixed=await prepare(input);
    for(const [i,side]of ['RIGHT','LEFT','RIGHT','LEFT'].entries())assert(fixed.prompt.includes(`[PAGE FRAME P${i+1} | ${side},`));
    authored.frames[2]={x:.3,y:.22,w:.4,h:.38};
    const centered=await prepare({...input,scenario:input.scenario.replace(/^PageComposition: .+$/m,'PageComposition: '+JSON.stringify(authored))});
    assert(centered.prompt.includes('[PAGE FRAME P3 | CENTER,'));
    assert(m.buildExperimentalReviewPrompt(centered.plan,centered.source).includes('"panel":3,"position":"CENTER,'));
  });
} finally {await server.close();}
