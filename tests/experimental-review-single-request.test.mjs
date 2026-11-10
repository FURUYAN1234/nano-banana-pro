import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';

const server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {runPageImageQuality} = await server.ssrLoadModule('/src/lib/image-quality-failsafe.js');
  test('observed elevation must match the planned direction, not merely be non-eye-level', () => {
    for(const [camera,elevation,mismatch] of [['俯瞰','low',true],['アオリ','high',true],['俯瞰','high',false],['アオリ','low',false],['俯瞰','uncertain',false]]) {
      const plan={count:1,panels:[{camera}]};
      const result=m.validateExperimentalReview({inspectionVersion:11,observedCount:1,camera:'pass',evidence:[{panel:1,
        view:{elevation,gaze:'uncertain',evidence:'人物の頭頂と肩の上面および床の面が見える。'}}]},plan);
      assert.equal(result.issues.some(issue=>issue.includes('指定は')&&issue.includes('実画像の投影')),mismatch);
      if(mismatch)assert.equal(result.camera,'fail');
    }
  });
  test('missing local frames use one whole-page inspection with or without a planned breakout', async () => {
    const frames=m.experimentalLayout(6,'tall_right_top').map((r,i)=>({panel:i+1,bounds:[.02+.96*r.x,.08+.88*r.y,.95*r.w,.87*r.h],edgeEvidence:'上下左右の実線と白い溝が連続して見える。'}));
    for(const requestedBreakout of [true,false]) for(const detected of [[],frames.slice(0,3)]) {
    const plan={count:6,layout:'tall_right_top',panels:frames.map((_,i)=>({breakout:requestedBreakout&&i===1?{part:'hand',into:1}:null}))};
    let requests=0;
    const response={complete:true,observedFrames:frames,observedCount:6,status:'warning',camera:'fail',
      pageEvidence:'実際の題字を観察',issues:['後ろ姿の指定に対し、正面の両眼と口が見える。'],
      evidence:frames.map((_,i)=>({panel:i+1,view:{elevation:'high',gaze:'uncertain',evidence:'両眼と口が正面から見え、肩の前面が見える。'},physical_bodies:[],text_regions:[]}))};
    const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,prompt:'Expected source contract'},
      async(prompt,images)=>{requests++;assert.match(prompt,/Expected source contract/);assert.match(prompt,/observedFrames/);
        assert.doesNotMatch(prompt,/Inspect only the physical comic frames/);assert.equal(images.length,3);
        return {text:JSON.stringify(response),model:'test-only'};},
      {detect:async()=>detected,inspect:async()=>({width:2240,height:3168}),crop:async(_image,rect)=>{assert.ok(rect.y>=3000,'only footer crops, never predicted panel slots');return {dataUrl:'footer'};}});
    assert.equal(requests,1);assert.equal(result.review.camera,'fail');assert.equal(result.review.evidence.length,6);
    assert.equal(result.review.inspectionKind,'whole-page-assessment');
    assert.deepEqual(result.review.evidence[1].bounds,frames[1].bounds);
    }
  });
  test('ambiguous or mismatched whole-page observations never fabricate crops or permit repair', async () => {
    const plan={count:6,layout:'tall_right_top',panels:Array.from({length:6},(_,i)=>({breakout:i===1?{part:'hand',into:1}:null}))};
    const realFrames=m.experimentalLayout(5,'two_columns').map(r=>({bounds:[.02+.96*r.x,.08+.88*r.y,.95*r.w,.87*r.h],edgeEvidence:'輪郭線の接続と白いコマ間が見える。'}));
    for(const [frames,complete,status] of [[realFrames,true,'warning'],[realFrames,false,'unverified'],[realFrames.map(()=>realFrames[0]),true,'unverified']]) {
      let requests=0;
      const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,prompt:'Source contract for comparison'},
        async(prompt,images)=>{
          requests++;assert.equal(images.length,3);assert.match(prompt,/Never copy expected layout coordinates/);
          return {text:JSON.stringify({complete,observedFrames:frames}),model:'test-only'};
        },{detect:async()=>[],inspect:async()=>({width:2240,height:3168}),crop:async(_image,rect)=>{
          assert.ok(rect.y>=3000,'never crop guessed panels');return {dataUrl:'footer'};
        }});
      const review=m.validateExperimentalReview(result.review,plan);
      assert.equal(requests,1);
      assert.equal(review.status,status);
      assert.equal(review.observedCount,status==='warning'?5:null);
      assert.equal(review.camera,'uncertain');
      assert.deepEqual(m.experimentalRepairIssues(review,plan),[],'partial observation cannot spend a repair');
    }
  });
  test('automatic correction OFF performs no inspection or repair for any page kind',async()=>{
    for(const [kind,count] of [['single-image',1],['four-panel',4],['experimental-manga',6]]) {
      const originalCandidate={base64Img:'original',mimeType:'image/png'};
      const forbidden=()=>{throw Error('OFF must never call a paid inspection or repair');};
      const result=await runPageImageQuality({kind,count},{mode:kind,allowRepair:false,originalCandidate,
        originalPrompt:'approved',reviewCandidate:forbidden,generateRepairCandidate:forbidden,
        analyzeFailure:forbidden,reviewCriticalCamera:forbidden,compareCandidates:forbidden});
      assert.equal(result.candidate,originalCandidate);
      assert.equal(result.originalReview.skipped,true);
      assert.equal(result.originalReview.pass,false,'not inspected is not PASS');
      assert.equal(result.attempts,1);
    }
  });
  test('automatic correction ON reviews once and repairs all material findings once without reinspection',async()=>{
    for(const [kind,count] of [['single-image',1],['four-panel',4],['experimental-manga',6]]) {
      let reviews=0,repairs=0;
      const originalCandidate={base64Img:'original',mimeType:'image/png'},fixed={base64Img:'fixed',mimeType:'image/png'};
      const forbidden=()=>{throw Error('separate analysis, comparison or extra audit is prohibited');};
      const result=await runPageImageQuality({kind,count},{mode:kind,allowRepair:true,originalCandidate,
        originalPrompt:'approved',reviewCandidate:async()=>{reviews++;return {pass:false,issues:[
          {type:'anatomy',panel:1,subject:'arm',reason:'detached hand'},
          {type:'bubble_text',panel:1,subject:'speech',reason:'missing required line'},
        ]};},generateRepairCandidate:async(prompt,source)=>{
          repairs++;assert.equal(source,originalCandidate);assert.match(prompt,/detached hand/);assert.match(prompt,/missing required line/);return fixed;
        },analyzeFailure:forbidden,reviewCriticalCamera:forbidden,compareCandidates:forbidden});
      assert.equal(reviews,1);assert.equal(repairs,1);assert.equal(result.candidate,fixed);
      assert.equal(result.finalReview.pass,false,'uninspected repair must not be reported as verified PASS');
      assert.ok(result.candidates.some(entry=>entry.candidate===originalCandidate),'original must remain recoverable');
    }
  });
  test('routine review observes and assesses each candidate in one API request',async()=>{
    for(const count of [5,6,8]) for(const useStructuredOutput of [false,true]) {
      const plan={count,layout:'mixed_rows',panels:Array.from({length:count},()=>({}))};
      const frames=m.experimentalLayout(count,plan.layout).map(r=>({bounds:[.01+.98*r.x,.05+.9*r.y,.98*r.w,.88*r.h]}));
      const evidence=frames.map((_,i)=>({panel:i+1,physical_bodies:[],text_regions:[],camera:null,style:null,story:null,anatomy:null}));
      const calls=[];
      const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,
        prompt:'Test-only source contract',useStructuredOutput},async(prompt,images,signal,options)=>{
        calls.push({prompt,images,signal,options});
        return {text:JSON.stringify({status:'unverified',pageEvidence:null,evidence}),model:'test-only'};
      },{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-only-crop'})});
      assert.equal(calls.length,1,'ordinary inspection must not spend a second API request');
      assert.equal(result.requests,1);
      assert.equal(calls[0].images.length,count+3,'full page, every native crop and both footer crops remain inspected');
      assert.equal(result.review.status,'unverified','missing observations never become a pass');
      assert.equal(result.review.pageEvidence,null);
      assert.deepEqual(result.review.evidence.map(e=>e.dialogue),Array.from({length:count},()=>[]));
      if(useStructuredOutput) {
        const schema=calls[0].options.responseFormat.json_schema.schema;
        const fields=schema.properties.evidence.items.properties;
        assert.ok(Object.keys(schema.properties).indexOf('evidence') < Object.keys(schema.properties).indexOf('corrections'),
          'strict decoding must observe bodies and lettering before prescribing corrections');
        assert.deepEqual(Object.keys(fields).slice(0,4),['panel','head_inventory','physical_bodies','text_regions'],
          'neutral pixel inventory precedes expected identities and semantic judgments');
        for(const key of ['physical_bodies','text_regions','cast_instances','style_observation','view'])assert.ok(fields[key],key);
        assert.equal(fields.dialogue,undefined,'speech ordering is calculated from observed text, not generated twice');
        assert.doesNotMatch(calls[0].prompt,/Each evidence object has this shape|REQUIRED ASSESSMENT FIELDS/,
          'strict schema already supplies the complete response shape');
        assert.match(calls[0].prompt,/MATERIAL DEFECTS FIRST/);
      }
    }
  });
  test('review includes detailed medium guidance only for a medium used on the page',()=>{
    const scenario=Array.from({length:6},(_,i)=>`[${i+1}コマ目]\n[Camera: 強い俯瞰、広角]\n[EMOTION: NORMAL]\n状況: 人物が箱を運ぶ\nセリフなし`).join('\n');
    const source=m.readExperimentalSource({scenario,castList:'人物',colorMode:'color'});
    const plan={count:6,layout:'mixed_rows',reason:'元の順番を保持',panels:source.panels.map((p,i)=>({sourcePanel:i+1,kind:'anchor',camera:p.camera,action:'人物が箱を運ぶ',dialogueIds:[],breakout:null}))};
    assert.doesNotMatch(m.buildExperimentalReviewPrompt(plan,source),/GEKIGA OBSERVATION:/);
    const mixed=structuredClone(source); mixed.panels[2].style='GEKIGA';
    assert.match(m.buildExperimentalReviewPrompt(plan,mixed),/GEKIGA OBSERVATION:/,
      'an applicable medium check must remain present');
  });
  test('uncertainty, harmless differences, review failure and cancellation never spend a repair',async()=>{
    for(const state of ['uncertain','minor','review_failure','timeout','cancelled']) {
      let reviews=0;const image={base64Img:'original'};
      const result=await runPageImageQuality({kind:'four-panel',count:4},{mode:'four-panel',allowRepair:true,originalCandidate:image,
        originalPrompt:'approved',shouldStop:()=>state==='cancelled'&&reviews>0,isReviewBudgetExhausted:()=>state==='timeout',
        reviewCandidate:async()=>{reviews++;if(state==='review_failure')throw Error('offline');
          return {pass:false,issues:[state==='minor'?{type:'camera_geometry',materialImpact:'minor_variation',impactReason:'story remains readable'}
            :{type:state==='uncertain'?'unverified':'anatomy',reason:'visible observation'}]};},
        generateRepairCandidate:()=>assert.fail('no paid edit for '+state)});
      assert.equal(reviews,1);assert.equal(result.candidate,image);assert.equal(result.attempts,1);assert.equal(result.finalReview.pass,false);
    }
  });
  test('all material corrections reach the one edit and failed edits retain the source',async()=>{
    for(const fail of [false,true]) {
      let edits=0;const image={base64Img:'original'};
      const issues=Array.from({length:12},(_,i)=>({type:'bubble_text',panel:i%4+1,subject:'speech'+i,reason:'missing line '+i,correction:'restore line '+i}));
      const result=await runPageImageQuality({kind:'four-panel',count:4},{mode:'four-panel',allowRepair:true,originalCandidate:image,originalPrompt:'approved',
        reviewCandidate:async()=>({pass:false,issues}),generateRepairCandidate:async prompt=>{
          edits++;for(const issue of issues)assert.ok(prompt.includes(issue.correction));assert.match(prompt,/candidate 2\/2/);
          if(fail)throw Error('image request failed');return {base64Img:'fixed'};
        }});
      assert.equal(edits,1);assert.equal(result.candidate.base64Img,fail?'original':'fixed');
      if(fail){assert.equal(result.stopReason,'repair_failed');assert.equal(result.finalReview.issues.length,12);}
    }
  });
  test('variable-page corrections require material failed checks and keep harmless or incomplete records advisory',()=>{
    const issue={type:'story_integrity',panel:6,subject:'recipient',observed:'required item is absent',expected:'recipient receives required item',
      correction:'restore the missing transfer without changing the scene',materialImpact:'material',impactReason:'the final action cannot be read'};
    const report={story:'fail',corrections:[issue]};
    assert.equal(m.experimentalRepairIssues(report,{count:6}).length,1);
    for(const change of [{materialImpact:'uncertain'},{materialImpact:'minor_variation'},{panel:7},{correction:''},{expected:issue.observed}])
      assert.deepEqual(m.experimentalRepairIssues({...report,corrections:[{...issue,...change}]},{count:6}),[]);
    assert.deepEqual(m.experimentalRepairIssues({...report,story:'uncertain'},{count:6}),[]);
    assert.deepEqual(m.experimentalRepairIssues({...report,validationErrors:['missing evidence']},{count:6}),[]);
  });

  test('four defective speech panels and two camera fixes fit beside a real-sized approved page without dropping targets',async()=>{
    const texts=[
      ['壁の骨組み、せーので立てるよ！','底を押さえる、傾けないで！'],
      ['新しく補う部分は、元の壁と見分けられる形にしよう。','境目を隠さず、模型にも残すわ。'],
      ['丸い窓はここ、四角い扉はその隣ね！','部品の配置が、模型の中でつながったわ。'],
      ['模型は創作。元の遺構と補う部分の違いは、きちんと伝えるわ。','保存の現場にも、その区別が受け継がれていくのね。'],
    ];
    const panelNumbers=[2,4,5,6],expectedDialogue=[];
    const panels=Array.from({length:6},()=>({dialogueIds:[]}));
    for(const [i,number] of panelNumbers.entries()) for(const [j,text] of texts[i].entries()) {
      const id=expectedDialogue.length+1;expectedDialogue.push({id,text,speaker:j?'乙':'甲'});panels[number-1].dialogueIds.push(id);
    }
    const plan={count:6,panels,expectedDialogue};
    const report={readingOrder:'fail',corrections:[],evidence:panelNumbers.map(panel=>({panel,dialogue:['欠落した台詞','別の欠落'],
      text_regions:['欠落した台詞','別の欠落'].map((text,i)=>({region_kind:'speech_balloon',text,center_x:.8-i*.6,container_evidence:'白い吹き出し内の文字を読んだ。'}))}))};
    const issues=[...m.experimentalRepairIssues(report,plan),...[5,6].map(panel=>({type:'camera_geometry',panel,
      reason:'上面を広く見下ろす投影。',correction:'指定の低い位置から人物と道具を同じ仰角で捉え、見える下面を描く。'}))];
    assert.equal(issues.length,6);
    const originalPrompt=('APPROVED CONTENT\n'+JSON.stringify(expectedDialogue)).padEnd(25408,'設');
    let edits=0;
    const result=await runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,
      originalCandidate:{base64Img:'original'},originalPrompt,repairPromptMaxChars:30460,
      reviewCandidate:async()=>({pass:false,issues}),generateRepairCandidate:async prompt=>{
        edits++;assert(prompt.length<=30460);assert(prompt.endsWith(originalPrompt));
        for(const issue of issues.filter(x=>x.letteringTargets)) for(const target of issue.letteringTargets){
          assert(prompt.includes(target.text));assert(prompt.includes(JSON.stringify(target.columnsRightToLeft)));
        }
        assert.match(prompt,/stroke weight/);assert.match(prompt,/Panel 5 CAMERA OVERRIDE/);assert.match(prompt,/Panel 6 CAMERA OVERRIDE/);
        return {base64Img:'fixed'};
      }});
    assert.equal(edits,1);assert.equal(result.stopReason,'single_repair_completed');
  });

  test('independently transcribed missing, extra and reordered speech reaches the one repair without model corrections',async()=>{
    const expected=['宮殿や僧院の跡が見つかったの。','なら、模型でも違いを残すわ。'];
    const plan={count:6,panels:Array.from({length:6},(_,i)=>({dialogueIds:i?[]:[1,2]})),expectedDialogue:expected.map((text,i)=>({id:i+1,text,speaker:i?'乙':'甲'}))};
    const report=spoken=>({inspectionVersion:11,readingOrder:'fail',corrections:[],evidence:[{panel:1,
      dialogue:spoken,text_regions:spoken.map((text,i)=>({region_kind:'speech_balloon',text,center_x:.8-i*.3,container_evidence:'白い吹き出しの内側に文字がある。'}))}]});
    for(const spoken of [[expected[0],'なら、違いを残すわ。'],['宮殿や僧院の跡が僧侶を見つかったの。',expected[1]],[],[...expected].reverse()]) {
      const issues=m.experimentalRepairIssues(report(spoken),plan);
      assert.equal(issues.length,1,'local text mismatch must not disappear into an advisory');
      assert.equal(issues[0].type,'bubble_text');
      if(spoken.length===expected.length) {
        assert.deepEqual(issues[0].letteringTargets.map(target=>target.balloon),
          expected.flatMap((text,index)=>text===spoken[index]?[]:[index+1]));
      }
      for(const target of issues[0].letteringTargets)assert.equal(target.columnsRightToLeft.join(''),target.text);
      const second=issues[0].letteringTargets.find(target=>target.balloon===2);
      if(second)assert.deepEqual(second.columnsRightToLeft,['なら、模型でも','違いを残すわ。']);
      let repairs=0;
      await runPageImageQuality({kind:'experimental-manga',count:6},{mode:'experimental-manga',allowRepair:true,
        originalCandidate:{base64Img:'original'},originalPrompt:'approved',reviewCandidate:async()=>({pass:false,issues}),
        generateRepairCandidate:async prompt=>{repairs++;for(const line of expected)assert.ok(prompt.includes(line));
          for(const line of spoken.filter(text=>!expected.includes(text)))assert.ok(!prompt.includes(line),'incorrect lettering must not be offered as drawable text');
          assert.match(prompt,/erase the complete existing lettering/i);
          assert.match(prompt,/resize the balloon interior/i);
          return {base64Img:'fixed'};}});
      assert.equal(repairs,1);
    }
    for(const spoken of [expected,['宮殿や僧院の跡が\n見つかったの！','なら 模型でも違いを残すわ']])
      assert.deepEqual(m.experimentalRepairIssues(report(spoken),plan),[],'punctuation and line wrapping are harmless');
    const unknown=report(['読めない',expected[1]]);unknown.evidence[0].text_regions[0].text=null;
    assert.deepEqual(m.experimentalRepairIssues(unknown,plan),[],'unreadable pixels cannot authorize repair');
    const incomplete=report([expected[0],'欠落']);incomplete.validationErrors=['incomplete observation'];
    assert.deepEqual(m.experimentalRepairIssues(incomplete,plan),[]);
    const stale=report(['別の台詞',expected[1]]);stale.evidence[0].dialogue=expected;
    assert.deepEqual(m.experimentalRepairIssues(stale,plan),[],'legacy mismatched transcription arrays stay unverified');
  });

  test('speech is assembled from visible reading units without correcting malformed lettering',async()=>{
    const plan={count:6,layout:'mixed_rows',panels:Array.from({length:6},()=>({camera:'俯瞰',dialogueIds:[]}))};
    const frames=m.experimentalLayout(6,plan.layout).map(r=>({bounds:[.01+.98*r.x,.05+.9*r.y,.98*r.w,.88*r.h]}));
    const corrected='残すって、違いごと伝えることなんだね。';
    for(const [units,expected] of [[['残すって、','違いごと','伝えること','伝んだね。'],['残すって、違いごと伝えること伝んだね。']],
      [['右の列','左の列'],['右の列左の列']],[null,null],[['読める列',null],null],[[],null]]) {
      const evidence=frames.map((_,i)=>({panel:i+1,physical_bodies:[],text_regions:i?[]:[{region_kind:'speech_balloon',
        text:corrected,reading_units:units,center_x:.7,container_evidence:'丸い吹き出しに縦書きの列がある。'}]}));
      const result=await m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,prompt:'Blind source',useStructuredOutput:true},
        async()=>{
          return {text:JSON.stringify({status:'unverified',evidence}),model:'test-only'};
        },{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-only-crop'})});
      assert.deepEqual(result.review.evidence[0].dialogue,expected,'a fluent sentence must not overwrite observed glyph columns');
    }
  });

  test('compact review schema stores shared observations once and resolves only same-panel feature references',async()=>{
    const plan={count:6,layout:'mixed_rows',panels:Array.from({length:6},()=>({camera:'approved high view',dialogueIds:[]})),expectedCast:Array.from({length:6},(_,i)=>({panel:i+1,names:['人物甲']}))};
    const frames=m.experimentalLayout(6,plan.layout).map(r=>({bounds:[.01+.98*r.x,.05+.9*r.y,.98*r.w,.88*r.h]}));
    const body=id=>({id,bounds:[.1,.1,.5,.7],features:['黒い長髪','青い上着'],gaze:{eye_visibility:'visible',direction:'in_scene',eye_position:[.3,.2],eye_evidence:'瞳が瞼の右側に寄り右下の箱に向く。',face_direction:'右下を向いた顔の側面',visibility_basis:'visible_eyes',target:{description:'右下の箱',position:[.8,.8]}}});
    const panel=i=>({panel:i+1,story:'人物が右下の箱を持ち上げている。',anatomy:'両手は腕につながり人物は一人である。',breakout:null,
      view:{elevation:'high',gaze:'in_scene',evidence:'頭頂と肩の上面と机面が見えている。'},style_observation:{medium:'NORMAL',status:'pass',evidence:'細い輪郭と明るい色面が見えている。',actors:[{body_id:'body',medium:'NORMAL',status:'pass',face_visibility:'visible',face:'目鼻の輪郭が明瞭に描かれている。',shading:'頬には一段の淡い影が描かれている。'}]},
      physical_bodies:[body('body')],text_regions:[],cast_instances:[{name:'人物甲',status:'ok',evidence:null,instances:[{body_id:'body',location:'中央の人物',feature_indices:[0,1]}]}],body_dispositions:[]});
    const report={status:'pass',observedCount:6,readingOrder:'pass',camera:'pass',style:'pass',story:'pass',anatomy:'pass',pageText:'pass',breakout:'not_requested',issues:[],pageEvidence:'ページ上部に作品の題字が見えている。',evidence:Array.from({length:6},(_,i)=>panel(i))};
    const run=async response=>m.reviewExperimentalImage({image:{mimeType:'image/png',base64Img:'test-only'},plan,prompt:'Test-only contract',useStructuredOutput:true},async(_prompt,_images,_signal,options)=>{
      const fields=options.responseFormat.json_schema.schema.properties.evidence.items.properties;
      for(const field of ['camera','style'])assert.equal(fields[field],undefined);
      assert.equal(fields.physical_bodies.items.properties.gaze.properties.pupil_placement,undefined);
      assert.equal(fields.physical_bodies.items.properties.head_bounds.minItems,4);
      const tail=fields.text_regions.items.properties.tail_targets.items.properties;
      assert.equal(tail.body_id,undefined,'the API must not infer a semantic owner');
      assert.equal(tail.root.minItems,2);assert.equal(tail.tip.minItems,2);
      assert.equal(fields.cast_instances.items.properties.observed_count,undefined);
      assert.ok(fields.cast_instances.items.properties.instances.items.properties.feature_indices);
      assert.equal(fields.cast_instances.items.properties.instances.items.properties.matched_features,undefined);
      return {text:JSON.stringify(response),finishReason:'stop'};
    },{detect:async()=>frames,inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'test-only-crop'})});
    const valid=await run(report),p=valid.review.evidence[0];
    assert.equal(p.camera,p.view.evidence);assert.equal(p.style,p.style_observation.evidence);
    assert.equal(p.physical_bodies[0].gaze.pupil_placement,p.physical_bodies[0].gaze.eye_evidence);
    assert.equal(p.cast_instances[0].observed_count,1);
    assert.deepEqual(p.cast_instances[0].instances[0].matched_features,['黒い長髪','青い上着']);
    assert.equal(m.validateExperimentalReview(valid.review,plan).anatomy,'pass');
    for(const indices of [[0,99],[0,0],[-1,1],[0,'1'],[]]){
      const invalid=structuredClone(report);invalid.evidence[0].cast_instances[0].instances[0].feature_indices=indices;
      const reviewed=await run(invalid);
      assert.equal(m.validateExperimentalReview(reviewed.review,plan).anatomy,'uncertain','invalid feature references cannot establish identity');
    }
    for(const mutation of [p=>{p.cast_instances[0].instances[0].body_id='other-panel-only';},p=>{p.physical_bodies.push(structuredClone(p.physical_bodies[0]));}]){
      const invalid=structuredClone(report);mutation(invalid.evidence[0]);
      assert.equal(m.validateExperimentalReview((await run(invalid)).review,plan).anatomy,'uncertain');
    }
    const duplicate=structuredClone(report);duplicate.evidence[0].physical_bodies.push({...body('second'),bounds:[.65,.1,.3,.7]});
    duplicate.evidence[0].cast_instances[0].instances.push({body_id:'second',location:'右側の別の人物',feature_indices:[0,1]});
    assert.equal(m.validateExperimentalReview((await run(duplicate)).review,plan).anatomy,'fail','a confirmed duplicate must still fail');
    const viewer=structuredClone(report);Object.assign(viewer.evidence[0].physical_bodies[0].gaze,{direction:'at_viewer',eye_evidence:'左右の瞳と瞼が正対し読者への視軸が見える。',target:null});
    assert.equal(m.validateExperimentalReview((await run(viewer)).review,plan).camera,'fail','actual reader-directed gaze must still fail');
    const background=structuredClone(report);
    background.evidence[0].physical_bodies.push({...body('visitor'),bounds:[.65,.1,.3,.7],features:['灰色の短髪','白いエプロン']});
    background.evidence[0].body_dispositions=[{body_id:'visitor',kind:'non_cast',feature_indices:[0,1],evidence:'灰色の短髪と白いエプロンの別人が奥に立つ。'}];
    assert.equal(m.validateExperimentalReview((await run(background)).review,plan).anatomy,'pass','grounded ordinary background people remain allowed');
    background.evidence[0].body_dispositions[0].feature_indices=[0,99];
    assert.equal(m.validateExperimentalReview((await run(background)).review,plan).anatomy,'uncertain','invalid non-cast references cannot hide an extra body');
    const unseen=structuredClone(report);unseen.evidence[0].physical_bodies[0].gaze.eye_evidence=null;
    assert.equal(m.validateExperimentalReview((await run(unseen)).review,plan).camera,'uncertain','no fabricated pupil evidence');
    const legacy=structuredClone(report);legacy.evidence[0].cast_instances[0].observed_count=7;
    assert.equal((await run(legacy)).review.evidence[0].cast_instances[0].observed_count,7,'never overwrite contradictory explicit legacy evidence');
  });

} finally {await server.close();}
