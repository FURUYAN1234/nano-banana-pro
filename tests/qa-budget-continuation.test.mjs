import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createServer} from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const p=await server.ssrLoadModule('/src/lib/panel-utils.js');
  const qa=await server.ssrLoadModule('/src/lib/image-quality-qa.js');
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const r=await server.ssrLoadModule('/src/lib/image-quality-failsafe.js');
  const refs=await server.ssrLoadModule('/src/lib/openai-image-references.js');
  const {inspectDepictedFigures}=await server.ssrLoadModule('/src/lib/manga-depicted-figures.js');
  const cast='## ユウ\n短い髪。\n## ミオ\n丸眼鏡。';
  test('captured repair overflow sends every instruction once, with the entire approved reference',async()=>{
    const fixture=JSON.parse(readFileSync(new URL('./fixtures/qa-repair-budget.json',import.meta.url),'utf8'));
    const originalPrompt=refs.stripImageReferenceManifest(fixture.prompt);
    let sent=0;
    const eligible=fixture.issues.filter(issue=>r.isMaterialImageQualityIssue(issue,{panelCount:6}));
    const outcome=await r.runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,originalCandidate:{base64Img:'test'},originalPrompt,repairPromptMaxChars:30651,reviewCandidate:async()=>({pass:false,issues:fixture.issues,evidenceContext:{panelCount:6}}),generateRepairCandidate:async prompt=>{
      sent++;assert(prompt.length<=30651);assert(prompt.endsWith(originalPrompt));
      const data=JSON.parse(prompt.match(/\n(\{"sharedSuffix":[^\n]+\})/)[1]);
      assert.equal(data.edits.length,eligible.length);
      for(const [index,issue] of eligible.entries())assert.equal(data.edits[index][3]+(data.edits[index][4]?data.sharedSuffix:''),issue.correction||issue.reason);
      return {base64Img:'test-edited'};
    }});
    if(outcome.repairError)throw outcome.repairError;
    assert.equal(sent,1);
  });
  test('a speaking press-conference figure is a depiction, including a shortened later subject',()=>{
    for(const text of [
      '状況: 山田太郎代表の別個の記者会見映像。山田は会見机の向こうから記者へ顔と胴体を向けて話す。画面の縁のみが見え、視聴ブースの二人は画面外。\n山田太郎「賛成です。」',
      '状況: モニター内の山田太郎代表が会見机から記者へ顔を向けている。\n山田太郎「どうぞ。」',
      '状況: 前の会見とは別の映像に切り替わり、山田太郎代表が会見机の向こうから記者へ体を向けている。\n山田太郎「賛成です。」',
    ]) {
      const contract=qa.extractPanelCastContracts('## Panel 1\n'+p.extractCastLimitRule(text,cast,{compact:true}))[0];
      assert.deepEqual(contract?.names,[]);
      assert.deepEqual(contract?.depictedNames,['山田太郎']);
    }
    const physical=qa.extractPanelCastContracts('## Panel 1\n'+p.extractCastLimitRule('状況: 会見場。山田太郎が机の前で話す。ユウは画面の端で見守る。\n山田太郎「どうぞ。」',cast,{compact:true}))[0];
    assert(physical.names.includes('山田太郎'));
    assert(!physical.depictedNames?.includes('山田太郎'));
  });
  test('the reported source gives both screen speakers depicted contracts before the image request',async()=>{
    const fixture=JSON.parse(readFileSync(new URL('./fixtures/experimental-news-budget.json',import.meta.url),'utf8'));
    const input={...fixture,enabled:true,colorMode:'monochrome',providerFamily:'chatgpt',promptMaxChars:28880};
    const source=m.readExperimentalSource(input);
    const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify({count:6,layout:'free',reason:'元台本の全場面を保持する。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null}))}));
    for(const panel of [2,3]) {
      const speaker=source.dialogue.find(d=>d.id===source.panels[panel-1].dialogueIds[0]).speaker;
      const contract=prepared.plan.expectedCast.find(p=>p.panel===panel);
      assert(contract.depictedNames?.includes(speaker));assert(!contract.names.includes(speaker));
    }
    const foreground=source.composition.foregrounds[0];
    assert(!prepared.plan.expectedCast.find(p=>p.panel===foreground.over[0]).names.includes(foreground.character),'reserved incoming silhouette is not a second local actor');
  });
  test('reserving a later silhouette excludes only that mention, keeping a separate local appearance',()=>{
    for(const reservation of ['次のコマからユウの頭と肩が重なる余白を残す。','ユウの頭と肩が次のコマから重なる位置を左下に空け、文字を右へ寄せる。']) {
      const contract=body=>qa.extractPanelCastContracts('## Panel 1\n'+p.extractCastLimitRule(body,cast,{compact:true,overlayCast:['ユウ'],scriptedNames:['ユウ']}))[0];
      assert(!contract(`状況: ${reservation}ミオが札を見ている。\nミオ「こちら。」`).names.includes('ユウ'));
      assert(contract(`状況: ${reservation}ユウは手前の椅子でカップを持っている。ミオが話す。\nミオ「こちら。」`).names.includes('ユウ'),'a real later scene must retain its own local body');
    }
  });
  test('composition compliance alone must not fabricate material harm or authorize an edit',()=>{
    const plan={count:1,layout:'free',composition:{heroPanels:[1],foregrounds:[],breakouts:[],bleed:[]},panels:[{}]};
    const review={observedCount:1,observedFrames:[{bounds:[0,0,1,1],edgeEvidence:'ページ内の一つの枠の四辺が明瞭に見える。'}],evidence:[{panel:1,story:'一人の人物と発話が大きく読める。'}],compositionChecks:[{id:'hero:P1',status:'fail',observed:'指定より小さいが人物と台詞は読め、動作は成立している。',materialImpact:'minor_variation',impactReason:'人物・動作・台詞・物語を損なわない構図の差。'}],corrections:[]};
    assert.deepEqual(m.experimentalRepairIssues(review,plan),[]);
    const broken=structuredClone(review);
    Object.assign(broken.compositionChecks[0],{observed:'見せ場の人物が消え、誰の動作か読めない空の大コマ。',materialImpact:'material',impactReason:'主役と中心動作が欠落して物語が成立しない。'});
    assert(m.experimentalRepairIssues(broken,plan).some(i=>i.type==='page_composition'));
    delete broken.compositionChecks[0].materialImpact;
    assert.deepEqual(m.experimentalRepairIssues(broken,plan),[],'missing impact evidence stays unverified, never auto-passes');
  });
  test('depicted presence, actual missing figures and uncertainty stay distinct from live cast',()=>{
    const record={name:'展示役',status:'present',container_evidence:'モニターの黒い内枠に囲まれた映像内に見える。',evidence:'白い長髪と丸眼鏡の人物の頭と肩が見える。',
      body:{id:'screen1',bounds:[.2,.2,.4,.5],head_bounds:[.3,.2,.2,.2],features:['白い長髪','丸眼鏡']},feature_indices:[0,1],style_observation:{medium:'SKETCH',status:'pass',face_visibility:'visible',face:'細い鉛筆線で瞼と頬を描いている。',shading:'顔の側面を細かな鉛筆斜線で表している。'}};
    assert.equal(inspectDepictedFigures({physical_bodies:[],depicted_figures:[record]},['展示役'],2).status,'pass');
    const missing={...record,status:'missing',body:null,evidence:'モニター内は背景と文字だけで人物の描像がない。'};
    const bad=inspectDepictedFigures({depicted_figures:[missing]},['展示役'],2);
    assert.equal(bad.status,'fail');assert.equal(bad.issues[0].type,'story_integrity');assert.match(bad.issues[0].correction,/現場に人物を追加せず/);
    for(const observed of [[],[{...missing,status:'uncertain'}],[{...record,feature_indices:[0]}]]) {
      const unknown=inspectDepictedFigures({depicted_figures:observed},['展示役'],2);
      assert.equal(unknown.status,'uncertain');assert(unknown.issues.every(issue=>issue.type==='unverified'));
    }
  });
  test('an uncertain camera observation cannot spend an edit even when the summary says fail',()=>{
    const issue={type:'camera_geometry',panel:1,subject:'画面の視点',observed:'机の天面など高い視点を示す投影が確認しにくい。',expected:'上方から見下ろす俯瞰。',correction:'俯瞰へ描き直す。',materialImpact:'material',impactReason:'俯瞰の指定に合わない。'};
    const plan={count:1,panels:[{camera:'高い位置から俯瞰'}]};
    const review={camera:'fail',corrections:[issue],evidence:[{panel:1,view:{elevation:'uncertain',evidence:'顔と机の上面が不明瞭で俯角を判定しにくい。'}}]};
    assert.deepEqual(m.experimentalRepairIssues(review,plan),[]);
    const broken=structuredClone(review);broken.evidence[0].view.elevation='low';
    broken.corrections[0].observed='机の裏面と人物の顎下が大きく見える低いアオリ。';
    assert.equal(m.experimentalRepairIssues(broken,plan).filter(i=>i.type==='camera_geometry').length,1);
  });
  test('unaltered real API observations no longer create a missing incoming actor or uncertain camera edit',async()=>{
    const actual=JSON.parse(readFileSync(new URL('./fixtures/qa-incoming-foreground-observation.json',import.meta.url),'utf8'));
    const input={...JSON.parse(readFileSync(new URL('./fixtures/experimental-news-budget.json',import.meta.url),'utf8')),enabled:true,colorMode:'monochrome',providerFamily:'chatgpt',promptMaxChars:28880};
    const source=m.readExperimentalSource(input);
    const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify({count:6,layout:'free',reason:'元台本の人物と構成を保持する。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null}))}));
    const names=prepared.plan.expectedCast.find(c=>c.panel===3).names;
    const issues=qa.castInventoryIssues(actual.panel3.cast_instances,3,names,{knownNames:prepared.plan.expectedCast.flatMap(c=>c.names),bodies:actual.panel3.physical_bodies});
    assert(!issues.some(i=>i.type==='cast_count'),'real zero-body observation is correct for the reserved incoming figure');
    assert.equal(inspectDepictedFigures(actual.panel3,prepared.plan.expectedCast.find(c=>c.panel===3).depictedNames,3).status,'pass');
    const observed=actual.cameraIssue.reason.match(/^Observed: ([\s\S]*); expected:/)[1];
    const correction={...actual.cameraIssue,observed,expected:'高い位置から俯瞰する。',materialImpact:'material',impactReason:'俯瞰指定と一致しない。'};
    assert(!m.experimentalRepairIssues({observedCount:6,camera:'fail',corrections:[correction],evidence:[actual.panel3]},prepared.plan).some(i=>i.type==='camera_geometry'));
  });
  test('a full six-panel repair stays within its reserved API budget without dropping any correction or source',async()=>{
    const input=JSON.parse(readFileSync(new URL('./fixtures/experimental-news-budget.json',import.meta.url),'utf8'));
    const source=m.readExperimentalSource({...input,colorMode:'monochrome'});
    const prepared=await m.prepareExperimentalManga({...input,enabled:true,colorMode:'monochrome',providerFamily:'chatgpt',showWatermarks:true,promptMaxChars:28880},async()=>JSON.stringify({count:6,layout:'free',reason:'元台本の配置と演技を保持する。',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null}))}));
    const originalPrompt=refs.stripImageReferenceManifest(prepared.prompt);
    const issues=Array.from({length:16},(_,i)=>({type:'story_integrity',panel:i%6+1,subject:`必要動作${i+1}`,materialImpact:'material',impactReason:'接点の欠落で話の帰結が分からない。',reason:'人物の顔と主動作は見えるが、小道具との接点が途切れ、前後の出来事のつながりが読めない。'.repeat(2),correction:`修正${i+1}: 指定された手から小道具までを連続して描き、元の人物・台詞・カメラと出来事を保持する。`}));
    let calls=0;
    const out=await r.runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,originalCandidate:{base64Img:'test-only'},originalPrompt,repairPromptMaxChars:30651,reviewCandidate:async()=>({pass:false,issues}),generateRepairCandidate:async prompt=>{
      calls++;assert(prompt.length<=30651);assert(prompt.endsWith(originalPrompt));
      const data=prompt.match(/\n(\{"sharedSuffix":[^\n]+\})/);
      if(data){const parsed=JSON.parse(data[1]);for(const [i,issue] of issues.entries())assert.equal(parsed.edits[i][3]+(parsed.edits[i][4]?parsed.sharedSuffix:''),issue.correction);}
      else for(const issue of issues)assert(prompt.includes(issue.correction));
      return {base64Img:'edited-test-only'};
    }});
    if(out.repairError)throw out.repairError;
    assert.equal(calls,1);assert.equal(out.stopReason,'single_repair_completed');
  });
} finally {await server.close();}
