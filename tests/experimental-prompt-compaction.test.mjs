import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const shared=await server.ssrLoadModule('/src/lib/shared-image-quality.js');
  const {EMOTION_STYLES,COMPACT_EMOTION_STYLES,GEKIGA_FACE_CONSTRUCTION}=await server.ssrLoadModule('/src/lib/constants.js');
  const mono=await server.ssrLoadModule('/src/lib/manga-render-mode.js');
  const {assertRenderOptions}=await server.ssrLoadModule('/src/lib/render-options.js');
  const styles=['GEKIGA','WATERCOLOR','POP_ART','SKETCH','GEKIGA','WATERCOLOR','POP_ART','SKETCH'];
  const castList='## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)';
  const scenario='## タイトル: 記号も、そのまま。\nLocation: 光が入る作業室\nOutfit: ユウは赤い上着、ナギは青い服。\n'+styles.map((style,i)=>`[${i+1}コマ目]\n[Camera: ${i%2?'右前の床上15cmから30度見上げる広角。':'左前から机上を45度見下ろす俯瞰。'}]\n[EMOTION: ${style}]\n状況: 手前のユウと奥のナギだけが木の箱を持つ。ユウの左手が底を支え、ナギの右手が側面を支える。これは行動${i+1}。\nユウ「ここは、${i+1}番目です！」\nナギ「はい。続きをどうぞ♡」`).join('\n');
  const input={enabled:true,scenario,castList,colorMode:'color',showWatermarks:true,mosaicCopyrightedCharacters:true};
  const source=m.readExperimentalSource(input);
  const planResponse=(_prompt,plan)=>JSON.stringify(plan);
  const plan={count:8,layout:'two_columns',reason:'手順と反応の対比',pageIntent:'手の連携を見せる',panels:source.panels.map((p,i)=>({sourcePanel:i+1,kind:'anchor',camera:p.camera,action:`ユウとナギだけが木の箱を持つ。左手と右手は別人の手。行動${i+1}。`,dialogueIds:p.dialogueIds,visualEffects:['foreground_depth'],breakout:null}))};
  const occurrences=(text,fragment)=>text.split(fragment).length-1;
  test('native plain-name rosters do not add partial outfit defaults to complete assignments',()=>{
    for(const roster of ['ユウ、ナギ','ユウ, ナギ']) for(const colorMode of ['color','monochrome']) {
      const options={...input,castList:roster,colorMode};
      const complete=m.buildExperimentalImagePrompt(plan,m.readExperimentalSource(options),options);
      assert.doesNotMatch(complete,/OUTFIT SCOPE:/);
      assert.ok(complete.includes('ユウは赤い上着、ナギは青い服。'));
      for(const panel of plan.panels) { assert.ok(complete.includes(panel.camera)); assert.ok(complete.includes(panel.action)); }
      const partial={...options,scenario:scenario.replace(/^Outfit:.*$/m,'Outfit: ユウは赤い上着。')};
      assert.match(m.buildExperimentalImagePrompt(plan,m.readExperimentalSource(partial),partial),/OUTFIT SCOPE:/);
      const local={...options,scenario:scenario.replace('[3コマ目]','[3コマ目]\n[Outfit: ナギは雨具]')};
      const withLocal=m.buildExperimentalImagePrompt(plan,m.readExperimentalSource(local),local);
      assert.match(withLocal,/OUTFIT SCOPE:/);
      assert.equal(occurrences(withLocal,'FRAME OUTFIT: ナギは雨具'),1);
    }
  });
  test('native global and panel outfits remain separate and unassigned actors retain reference wardrobes',()=>{
    const local='ユウは作業用コート';
    const reference='## ユウ\n髪: black hair\n衣装: school uniform\n## ナギ\n髪: long hair\n衣装: sailor uniform';
    for(const header of ['Outfit: default','Outfit: none','','Outfit: ユウは雨具']) for(const colorMode of ['color','monochrome']) {
      const variant=scenario.replace(/^Outfit:.*$/m,header).replace('[3コマ目]',`[3コマ目]\n[Outfit: ${local}]`);
      const options={...input,scenario:variant,castList:reference,colorMode};
      const src=m.readExperimentalSource(options);
      const prompt=m.buildExperimentalImagePrompt(plan,src,options);
      assert.match(prompt,/sailor uniform/);
      if(!header.includes('雨具')) assert.match(prompt,/school uniform/);
      assert.match(prompt,/OUTFIT SCOPE:.*指定人物\/役割だけ.*未指定人物\/コマ.*参照/);
      const frames=prompt.split('[PAGE FRAME ').slice(1).map(frame=>frame.split('[END PAGE FRAME')[0]);
      for(const [i,frame] of frames.entries()) {
        if(i===2) assert.ok(frame.includes(`FRAME OUTFIT: ${local}`));
        else assert.ok(!frame.includes(`FRAME OUTFIT: ${local}`));
        assert.ok(frame.includes(plan.panels[i].camera));assert.ok(frame.includes(plan.panels[i].action));
      }
    }
    const all={...input,castList:reference,scenario:scenario.replace(/^Outfit:.*$/m,'Outfit: 作業着')};
    const prompt=m.buildExperimentalImagePrompt(plan,m.readExperimentalSource(all),all);
    assert.doesNotMatch(prompt,/school uniform|sailor uniform/,'unscoped global clothing still replaces all reference outfits');
    for(const outfit of ['ユウはコート、ナギは作業着。全員、指定の普段着。','ユウはコート、ナギは作業着。']) {
      const options={...all,scenario:scenario.replace(/^Outfit:.*$/m,`Outfit: ${outfit}`).replace('[3コマ目]',`[3コマ目]\n[Outfit: ${local}]`)};
      const complete=m.buildExperimentalImagePrompt(plan,m.readExperimentalSource(options),options);
      assert.doesNotMatch(complete,/school uniform|sailor uniform/,'complete named global assignments replace contradictory reference garments');
      assert.match(complete,/OUTFIT SCOPE:/,'the local exception still has explicit panel priority');
      assert.equal(occurrences(complete,`FRAME OUTFIT: ${local}`),1);
    }
  });
  test('native close-up keeps a no-full-body-addition camera verbatim without adding a conflicting full-body cue',()=>{
    const camera='台の右上方から15度見下ろす接写。直前の中景からズームインし、ユウの目元、自然につながる右手、水平器の中央を同じ近景に収める。画角外の全身を追加しない。';
    let index=0;
    const options={...input,scenario:scenario.replace(/\[Camera: [^\]]+\]/g,original=>index++===3?`[Camera: ${camera}]`:original)};
    const src=m.readExperimentalSource(options);
    const native={...plan,panels:plan.panels.map((p,i)=>({...p,camera:src.panels[i].camera}))};
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(native,src,{...options,colorMode});
      const frame=prompt.split('[PAGE FRAME P4 |')[1].split('[END PAGE FRAME')[0];
      assert.ok(frame.includes(camera));
      const execution=frame.match(/^SHOT EXECUTION:.*$/m)?.[0]||'';
      assert.match(execution,/主対象を寄りで切取/);
      assert.doesNotMatch(execution,/両靴|全身|引き:/);
      assert.ok(frame.includes(native.panels[3].action));
      for(const id of native.panels[3].dialogueIds) assert.ok(frame.includes(JSON.stringify(src.dialogue[id])));
    }
  });
  test('native frames carry their own compact physical camera cues before the medium without changing source fields',()=>{
    const cameras=[
      '左前の高所から40度俯瞰する広角中景。',
      '右前の低い位置から20度アオリ、時計回り12度のダッチアングル。',
      '少し上から25度見下ろす望遠中景。',
      '右後方からの手元の接写。',
      '低い位置から水平に撮る中景。',
      '中景。人物が相手を見下ろし、首を傾ける。',
      '左側面から少し上で見下ろす顔のアップ。',
      '高所から60度俯瞰する広角の全身引き。',
    ];
    for(const count of [5,6,7,8]) for(const colorMode of ['color','monochrome']) {
      const variantScenario='## タイトル: カメラ検証\nLocation: 共同作業室\n'+cameras.slice(0,count).map((camera,i)=>`[${i+1}コマ目]\n[Camera: ${camera}]\n[EMOTION: ${styles[i]}]\n状況: ユウとナギが箱を確認する。ユウは首を傾け、眉を少し下げて微笑む。\nユウ「ここは${i+1}番目。」`).join('\n');
      const options={...input,scenario:variantScenario,colorMode};
      const src=m.readExperimentalSource(options);
      const native={...plan,count,panels:src.panels.map((p,i)=>({...plan.panels[i],camera:p.camera,action:'ユウとナギが箱を確認する。ユウは首を傾け、眉を少し下げて微笑む。',dialogueIds:p.dialogueIds}))};
      const prompt=m.buildExperimentalImagePrompt(native,src,options);
      const frames=prompt.split('[PAGE FRAME ').slice(1).map(frame=>frame.split('[END PAGE FRAME')[0]);
      for(const [i,frame] of frames.entries()) {
        assert.ok(frame.includes(`Camera: ${cameras[i]}; Style: ${styles[i]}; Action: ${native.panels[i].action}`));
        for(const id of native.panels[i].dialogueIds) assert.ok(frame.includes(JSON.stringify(src.dialogue[id])));
        const recipe=colorMode==='monochrome'?mono.MONOCHROME_EMOTION_STYLES[styles[i]]:COMPACT_EMOTION_STYLES[styles[i]];
        if(styles[i]!=='GEKIGA') assert.ok(frame.includes(recipe));
        else assert.ok(frame.includes(GEKIGA_FACE_CONSTRUCTION));
        if(i!==5) assert.match(frame,/Action: [^\n]+\nSHOT EXECUTION: [^\n]+\nFRAME MEDIUM/);
      }
      const cues=frames.map((frame,i)=>[frame.match(/^SHOT EXECUTION:.*$/m)?.[0]||'',
        ...[...prompt.matchAll(/^SHOT (P\d+(?:\/P\d+)*) ONLY: (.+)$/gm)].filter(match=>match[1].split('/').includes(`P${i+1}`)).map(match=>match[2])].filter(Boolean).join('; '));
      for(const i of [0,1,2,6,7].filter(i=>i<count)) assert.match(cues[i],/人物\/注視先を配置→.*首傾げ・表情保持.*可視瞳を指定先へ.*独立Cameraで立体投影→画風/);
      for(const i of [3,4,5].filter(i=>i<count)) assert.doesNotMatch(cues[i],/人物\/注視先を配置/,'shared cue must not reach horizontal, rear-only or unspecified views');
      assert.match(cues[0],/頭\/肩の上面.*胴の短縮/);
      assert.match(cues[1],/顎\/道具下面.*顔\/体\/場.*背景だけ.*傾けない.*顔だけでなく.*場面軸/);
      assert.match(cues[2],/遠い撮影位置.*長焦点.*奥行圧縮.*収束.*ぼかしだけ.*不可/);
      assert.match(cues[3],/寄りで切取.*背面.*距離\/切取り保持/);
      assert.match(cues[4],/水平.*低い地平線/);
      for(const i of [0,2,3,4,5,6,7].filter(i=>i<count)) assert.doesNotMatch(cues[i],/場面軸/);
      assert.doesNotMatch(cues[3],/頭\/肩の上面|顎\/道具下面|全身/);
      assert.doesNotMatch(cues[4],/顎\/道具下面|見上げ/);
      if(count>=6) assert.equal(cues[5],'','unspecified camera must not inherit camera instructions from another frame or actor action');
      assert.ok(prompt.length<32000);
    }
    assert.equal(m.EXPERIMENTAL_PROMPT_REVISION,34);
  });
  test('native prompts compact before the hard ceiling while preserving every camera, acting and medium',()=>{
    const cameras=[
      '左前・頭上2mから45度俯瞰、広角の全身引き。',
      '右後ろ・床上15cmから30度アオリ、強い遠近の中景。',
      '真上から90度見下ろす俯瞰、机全体を含む引き。',
      '左後方の肩越しから手元へズーム、指定の接写。',
      '右前の高所から20度見下ろす望遠、奥行きを圧縮。',
      '右側面の低所から25度見上げ、時計回り18度のダッチアングル。',
      '正面の高所から35度見下ろす中景。意図した同じ構図を保持。',
      '正面の高所から35度見下ろす中景。意図した同じ構図を保持。',
    ];
    const detailedScenario=scenario.replace(/\[Camera: [^\]]+\]/g,()=>`[Camera: ${cameras.shift()}]`);
    const detailedSource=m.readExperimentalSource({...input,scenario:detailedScenario});
    const detailedPlan={...plan,panels:plan.panels.map((p,i)=>({...p,camera:detailedSource.panels[i].camera,
      action:p.action+'眉を八の字に下げ、口元は微笑む。左足に重心を乗せ、右腕を相手へ伸ばす。'}))};
    const options={...input,scenario:detailedScenario};
    const prompt=m.buildExperimentalImagePrompt(detailedPlan,detailedSource,options);
    assert.ok(prompt.length>15000&&prompt.length<32000,'exercise the soft-target interval');
    assert.equal(prompt,m.buildExperimentalImagePrompt(detailedPlan,detailedSource,{...options,promptMaxChars:1}),
      'safe compaction must not wait for a hard-budget overflow');
    for(const [i,p] of detailedPlan.panels.entries()) {
      const frame=prompt.split(`[PAGE FRAME P${i+1} |`)[1].split('[END PAGE FRAME')[0];
      assert.ok(frame.includes(p.camera));assert.ok(frame.includes(p.action));
      assert.ok(frame.includes(`Style: ${detailedSource.panels[i].style}`));
      for(const id of p.dialogueIds) assert.ok(frame.includes(JSON.stringify(detailedSource.dialogue[id])));
    }
  });
  // Portable regression fixture: five adult cast sheets and a body-staged six-panel script.
  // Names are changed; source length/media/identity and action detail match the observed load.
  const budgetScenario="## タイトル: 葉脈をつなぐ一色\nLogline: お世話になった人へ贈るカードを刷るナオ、ユキ、カナタ、コハル、マコト。欠けた葉脈を前に手順を整え直し、五人の仕事が重なった一枚を完成させる。\nLocation: 夕方の共同アトリエにある大きな版画作業台\nVisualEvidence: 葉模様の小さな木版、葉脈の欠けた試し刷り、インクローラー、ばれん、位置を合わせたカード用紙、つながった葉の刷り上がり\nOutfit: ナオは明るい長袖トップスと作業エプロン、ユキは柔らかなカーディガンと作業エプロン、カナタは落ち着いた色の長袖シャツと厚手の作業エプロン、コハルは朱色系のブラウスと短めの作業エプロン、マコトは淡色ブラウスとキャンバス地の作業エプロン。全員、作業しやすい普段着で袖口を整える。\nPunchline: 静寂型 (シュール)\n\n[1コマ目: 導入]\n[EMOTION: NORMAL]\n[Camera: 作業台の左後方、頭上約2メートルから35度見下ろす広角の引き。机の天面と五人の頭頂、夕方の窓光が伸ばす長い影を一緒に捉え、台の木目が葉の版へ視線を導く。]\nBalloonLayout: [{\"speaker\":\"マコト\",\"x\":0.76,\"anchor\":\"画面奥中央、前髪と眼鏡の輪郭\",\"route\":\"画面上部の右余白から奥中央へ短く下ろす\"}]\n状況: 夕方の共同アトリエ。大きな作業台の奥中央で、淡色ブラウスにキャンバス地のエプロンを着たマコトが、両足を台の下で安定させ、腰をわずかに前へ寄せて、自分の葉模様の小さな木版を両手で作業面へ静かに置く。左隣のカナタは落ち着いた色のシャツと厚手のエプロン姿で、片手を台に添え、もう片方の腕を体側に保って版へ身を傾ける。右側のナオは明るいトップスとエプロン姿で、自分のインクローラーを手元に置き、片足を半歩引いて作業台へ向く。手前左のユキはカーディガンとエプロンで自分のばれんを手元に寄せ、肩をすぼめて確認する。手前右のコハルは朱色系ブラウスと短いエプロンで、両手を使って自分のカード用紙の端をそろえ、重心を前へ移す。窓からの橙色の光が紙の端を照らし、五人の長い影が台に伸びる。その影の細い部分だけ、五人の姿勢にも道具の形にも合わない葉脈のような線が、かすかに交差している。\nマコト「この葉を、お世話になった人へ贈ろう。」\n\n[2コマ目: 欠けの発見]\n[EMOTION: GEKIGA]\n[Camera: 作業台の右前方、座った人物の胸より低い位置から15度見上げる中寄り。マコトとカナタの顔を大きく、机上の版と試し刷りを手前に置く。奥の三人も同じ劇画の描法で控えめに入れる。]\nBalloonLayout: [{\"speaker\":\"マコト\",\"x\":0.78,\"anchor\":\"右前景、眼鏡と頬の輪郭\",\"route\":\"右上の余白からマコトの見える口元へ\"},{\"speaker\":\"カナタ\",\"x\":0.39,\"anchor\":\"左中景、前髪と頬の輪郭\",\"route\":\"左上の余白からカナタの見える口元へ\"}]\n状況: 試し刷りの紙をマコトが右手で持ち、左手の木版と見比べる。紙には葉脈の一部が白く途切れている。マコトは眼鏡越しに欠けた線を追い、片方の眉をわずかに上げ、首と肩を紙へ傾ける。左手は木版を揺らさないように支え、右肘を体に寄せて紙を目の高さへ保つ。カナタは隣で左手をマコトの手首の下へ添え、右手で版の端を支える。台に近い足へ重心を置き、二人の手元をのぞき込む。二人の顔には写実的な面取り、明瞭な鼻梁と顎、細密なカケアミを施す。特にマコトの眼鏡越しの目元にも彫りとカケアミをはっきり描く。怒りや威嚇ではなく、集中した穏やかな表情。黒ベタ主体にしない。ナオは自分のローラーを台に置き、肩を前へ寄せて欠けを見つめる。ユキは自分のばれんを手前に置いたまま、腰を少し落として版の外縁を確かめる。コハルは揃えた紙束を胸の前で両腕に抱え直し、紙を崩さないよう肘を締める。三人も同じ劇画調。\nマコト「葉脈のここだけ、紙に出てない。」\nカナタ「端の押さえ方を見直しましょう。」\n\n[3コマ目: 手元の協力]\n[EMOTION: GEKIGA]\n[Camera: 作業台の左側、立った人物の肩より高い位置から30度見下ろす斜め中景。左手前のナオのローラーから、中央のマコトとカナタの支える手、右奥で待つユキとコハルへ視線が流れる。顔は中寄りの大きさで、全員を劇画の顔・線・陰影で描く。]\nBalloonLayout: [{\"speaker\":\"マコト\",\"x\":0.75,\"anchor\":\"中央右、眼鏡と前髪の輪郭\",\"route\":\"右上の余白からマコトの見える口元へ\"},{\"speaker\":\"カナタ\",\"x\":0.39,\"anchor\":\"中央左、黒髪と頬の輪郭\",\"route\":\"左上の余白からカナタの見える口元へ\"}]\n状況: 欠けた試し刷りは台に残る。マコトは左手で紙を押さえ、右手の指先で木版の端を示す。体は版へまっすぐ向け、右肘を浮かせて指先だけを慎重に伸ばす。カナタはマコトの右手首を左手で静かに支え、右手で木版の外縁を固定する。両足を台に向けて踏ん張り、手元がずれないよう上体を安定させる。二人の顔には明瞭な彫りと細密なカケアミを描き、マコトの眼鏡越しの顔も十分に見せる。二人とも集中した穏やかな表情。ナオは自分のローラーを両手で扱い、片足を台へ寄せて木版にインクを均一にのせる。ユキは自分のばれんを右手に持ち、肘を曲げて次の工程に備える。コハルは自分のカード用紙を両手でまっすぐ揃え、紙束を胸元近くで安定させて待つ。五人の袖口は台に触れない位置にある。\nマコト「この端まで、ちゃんと押さえたい。」\nカナタ「手首は支えるわ。力をまっすぐ伝えて。」\n\n[4コマ目: 押さえる]\n[EMOTION: NORMAL]\n[Camera: 作業台の手前右から、台面より少し高い位置で25度見下ろす広角中景。画面右のコハルの揃えた紙端から、中央の版とユキのばれんへ斜めに読む。腰から上の身体の傾きと、前後に分かれた手元を見せる。]\nBalloonLayout: [{\"speaker\":\"コハル\",\"x\":0.77,\"anchor\":\"右手前、ボブの輪郭\",\"route\":\"右上の余白からコハルの見える口元へ\"},{\"speaker\":\"ユキ\",\"x\":0.39,\"anchor\":\"左中景、ツインテールと丸眼鏡の輪郭\",\"route\":\"左上の余白からユキの見える口元へ\"}]\n状況: インクをのせ終えたマコトの木版に、マコトがカード用紙をそっと重ねる。腰を台へ寄せ、両手で用紙の端を保つ。カナタは両足を安定させて前へ体を傾け、版の外縁を押さえ続ける。コハルは右手で紙の角を合わせ、左手で反対側の端を軽く保持し、前足へ体重を移して角を見つめる。ユキは左側から右手で自分のばれんを紙の上へ置き、左手で紙の端を支えながら、膝を少し緩めてゆっくり一定に押さえ始める。ナオは自分のローラーを台の端に置き、体を引いて両手を空け、紙の位置を見守る。\nコハル「角、ぴたりと合ったよ！」\nユキ「ゆっくり、均等に押さえるね。」\n\n[5コマ目: めくる瞬間]\n[EMOTION: NORMAL]\n[Camera: マコトの左肩越しに、作業台の右上から55度見下ろす寄り。めくれ始めた紙と、下から現れる新しい葉の刷り上がりを同じ画面に収め、手元以外の背景は台の木目だけに整理する。]\nBalloonLayout: []\n状況: ばれんで紙全体を押さえ終えた後。マコトは片足を台へ寄せ、両手でカード用紙の手前角をつまみ、手首を返しながらゆっくり持ち上げる。めくれた紙の下から、葉の輪郭と、試し刷りで欠けていた葉脈が一本につながった刷り上がりが現れる。新しい刷り上がりが初めて見える瞬間。カナタは両足を崩さず版の外縁を押さえた手を保ち、首を静かに紙へ傾ける。ユキは自分のばれんを台へ置いた直後、手を離して上体を止め、視線を現れた線へ向ける。ナオは自分のローラーのそばで肩を固め、両手を台の縁近くにとどめる。コハルは紙束を胸元に抱えたまま、身を少し乗り出して見つめる。全員の顔と視線は紙へ向き、誰もカメラを見ない。セリフも擬音も置かず、めくる手とつながった葉の形だけで伝える。\nセリフなし\n\n[6コマ目: 五人の一色]\n[EMOTION: WATERCOLOR]\n[Camera: 作業台の左前方、座った人物の腰より低い位置から25度見下ろす中広景。手前の完成カードを少し大きく、五人の上半身と顔を周囲に奥行き差をつけて配置する。夕方の窓光と作業台の木目も含め、人物・衣服・紙・背景すべてを淡い透明水彩で描く。]\nBalloonLayout: []\n状況: つながった葉の完成カードが作業台中央に置かれ、試し刷りはその脇に残る。人物にも劇画のカケアミや太い黒輪郭を持ち込まず、水彩の淡い色溜まりと紙白で描く。マコトは両足を台の下にそろえ、眼鏡越しに葉を見つめ、肩の力を抜いた小さな笑顔。カナタは版を支えた手を台に下ろし、手首の力をほどいて目を細め、口元をやわらげる。ナオはローラーを置いた手を腰へ戻し、片方の肩を緩めて頬を上げる。ユキはばれんをカードの横に置き、上体を少し引いて満足そうに目を細める。コハルは揃えた紙束を台へ置き、片手を紙束のそばに残したままカードへ身を乗り出して笑う。五人はそれぞれの仕事が重なった一枚を囲み、声を出すより先に顔をほころばせる。そのとき、窓光の向きとは逆へ、完成カードの葉だけの影が机いっぱいに広がる。五人の手、ローラー、ばれん、木版を避けるように枝分かれしながら、実物よりはるかに大きな葉の形を描いている。五人は説明も驚きの身振りもなく、カードとその奇妙な影を静かに見つめる。\nセリフなし";
  const budgetCast="## 1. ナオ\n| カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |\n| :--- | :--- | :--- |\n| **基本(Base)** | 性別: 女性<br>年齢: 若い成人 | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |\n| **髪(Hair)** | 色: ブロンド（毛先ピンクのグラデーション）<br>長さ: ミディアムロング（鎖骨付近まで）<br>構造: Loose/Wavy<br>前髪: Blunt（ラウンド系） | **[WEIGHTS]: (medium-long wavy hair:1.4), (blonde hair:1.4), (pink tips:1.2)** |\n| **顔(Face)** | 目: ブラウン、ぱっちり気味で表情豊か、ややツリ目<br>肌: 健康的な褐色（Tanned）<br>髭: 無し<br>眼鏡: 無し | **[WEIGHTS]: (tanned skin:1.5), (no glasses:1.5), (brown eyes:1.1)** |\n| **服装(Outfit)** | 制服（白シャツ、紺スカート、ネクタイ無し。シャツは着崩し、腰にカーディガン） | **[WEIGHTS]: (school uniform:1.2), (casual style:1.1)** |\n| **性格(Mind)** | **[OCR抽出]**: 設定・陽気で流行に敏感なギャル。都市伝説ネタ厳禁。表現が豊か。明るく感情表現が豊か。 | **[WEIGHTS]: (gyaru:1.3), (cheerful:1.3), (expressive:1.2), (outgoing:1.1)** |\n\n## 2. ユキ\n| カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |\n| :--- | :--- | :--- |\n| **基本(Base)** | 性別: 女性<br>年齢: 若い成人 | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |\n| **髪(Hair)** | 色: 赤みのある茶色（ライトブラウン）<br>長さ: 肩上（顎下～首レベル）<br>構造: ストレートツインテール（ピンクリボン）<br>前髪: Blunt | **[WEIGHTS]: (twintails:1.3), (light brown hair:1.4), (chin-length:1.2)** |\n| **顔(Face)** | 目: ブラウン、丸めで大きめ、ややタレ目<br>肌: 明るめ（Pale）<br>髭: 無し<br>眼鏡: あり（丸型、Under-rim） | **[WEIGHTS]: (glasses:1.2), (round glasses:1.2), (pale skin:1.1)** |\n| **服装(Outfit)** | 制服（ベージュカーディガン、紺スカート、リボンタイ） | **[WEIGHTS]: (school uniform:1.2), (cardigan:1.1)** |\n| **性格(Mind)** | **[OCR抽出]**: お金ネタ・レトロネタ・オタク系女子。都市伝説ネタ厳禁。夢見がち。 | **[WEIGHTS]: (otaku girl:1.2), (daydreamer:1.2), (meganekko:1.1)** |\n\n## 3. カナタ\n| カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |\n| :--- | :--- | :--- |\n| **基本(Base)** | 性別: 女性<br>年齢: 若い成人 | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |\n| **髪(Hair)** | 色: 黒<br>長さ: ロング（腰まで）<br>構造: ストレート<br>前髪: Blunt | **[WEIGHTS]: (very long straight black hair:1.6), (black hair:1.4)** |\n| **顔(Face)** | 目: ブラウン、厳しい表情・ツリ目傾向<br>肌: 明るめ（Pale）<br>髭: 無し<br>眼鏡: 無し | **[WEIGHTS]: (no glasses:1.5), (strict expression:1.2)** |\n| **服装(Outfit)** | 制服（ブレザータイプ、ネイビー、赤リボン） | **[WEIGHTS]: (school uniform:1.2), (blazer:1.1)** |\n| **性格(Mind)** | **[OCR抽出]**: 厳格な風紀委員長。校則違反には容赦なく、現金を没収しようとする。真面目すぎる性格。 | **[WEIGHTS]: (strict:1.3), (serious:1.2), (student council president:1.1)** |\n\n## 4. コハル\n| カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |\n| :--- | :--- | :--- |\n| **基本(Base)** | 性別: 女性<br>年齢: 若い成人 | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |\n| **髪(Hair)** | 色: オレンジ（朱色寄りの赤毛）<br>長さ: ミディアムボブ（首～顎下、肩には届かない）<br>構造: 内巻きボブ（Internal Round Bob）<br>前髪: Blunt | **[WEIGHTS]: (medium bob:1.4), (ginger hair:1.4), (internal round bob:1.3)** |\n| **顔(Face)** | 目: ブラウン、元気で大きめな目、ややタレ目<br>肌: 明るめ（Pale）<br>髭: 無し<br>眼鏡: 無し | **[WEIGHTS]: (no glasses:1.5), (cheerful face:1.1)** |\n| **服装(Outfit)** | 制服（セーラー服、白紺、赤リボン） | **[WEIGHTS]: (sailor uniform:1.2)** |\n| **性格(Mind)** | **[OCR抽出]**: 設定・元気で少しドジな少女。甘いものが大好きで、いつも何か食べている。誰とでも仲良くなれる。 | **[WEIGHTS]: (clumsy:1.2), (cheerful:1.3), (sweets lover:1.1), (friendly:1.1)** |\n\n## 5. マコト\n| カテゴリ | 特徴の詳細（日本語） | 画像生成AI用 重み付きタグ (Weighted Immutable Prompts) |\n| :--- | :--- | :--- |\n| **基本(Base)** | 性別: 女性<br>年齢: 若い成人 | **[WEIGHTS]: (female:1.6), (woman:1.4), (young adult:1.2)** |\n| **髪(Hair)** | 色: ブロンド（明るい金髪）<br>長さ: ボブ（顎ライン）<br>構造: ストレートボブ（Flicked ends無し）<br>前髪: Blunt | **[WEIGHTS]: (straight bob:1.5), (blonde hair:1.4), (chin-length:1.2)** |\n| **顔(Face)** | 目: 青、丸くやや大きめ<br>肌: 明るめ（Pale）<br>髭: 無し<br>眼鏡: あり（丸型、Under-rim） | **[WEIGHTS]: (glasses:1.2), (round glasses:1.2), (blue eyes:1.1)** |\n| **服装(Outfit)** | 制服（セーラー服、白紺、赤リボン） | **[WEIGHTS]: (sailor uniform:1.2)** |\n| **性格(Mind)** | **[OCR抽出]**: 設定・読書好きな優等生。コハルの幼馴染で、いつも彼女の世話を焼いている。少し恥ずかしがり屋。 | **[WEIGHTS]: (bookworm:1.2), (honor student:1.2), (shy:1.2), (caring:1.1)** |";
  const budgetInput={enabled:true,scenario:budgetScenario,castList:budgetCast,colorMode:'color',showWatermarks:true,mosaicCopyrightedCharacters:true,imageEngineLabel:'ChatGPT Images 2.5',scenarioModelLabel:'GPT-6 Luna',promptMaxChars:30460};
  const diagnosticPlanFor=src=>({count:src.panels.length,layout:'two_columns',reason:'ローカル回帰用の順序保持配置',panels:src.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null}))});
  test('gekiga changes facial construction while retaining hatch-led shade and calm identity in every route',()=>{
    for(const recipe of [EMOTION_STYLES.GEKIGA.style,COMPACT_EMOTION_STYLES.GEKIGA,mono.MONOCHROME_EMOTION_STYLES.GEKIGA]) {
      assert.ok(recipe.includes(GEKIGA_FACE_CONSTRUCTION));
      assert.match(recipe,/narrow eye openings/i);
      assert.match(recipe,/nostril wings/i);
      assert.match(recipe,/distinct cheekbone and jaw angles/i);
      assert.match(recipe,/hatching.*primary/i);
      assert.doesNotMatch(recipe,/solid ink shadow planes/);
    }
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(plan,source,{...input,colorMode});
      const frames=prompt.split('[PAGE FRAME ').slice(1);
      assert.match(frames[0],/narrow eye openings/);
      assert.doesNotMatch(frames[1].split('[END PAGE FRAME')[0],/narrow eye openings/,'watercolor keeps its own construction');
      assert.match(prompt,/soft describes emotion, not rounded anime anatomy/i);
      assert.match(prompt,/no added anger, age or wrinkles/i);
      assert.match(prompt,/visible line gaps/);
    }
  });
  test('five-person strengthened six-panel source preserves all authored data inside the reserved budget',async()=>{
    const src=m.readExperimentalSource(budgetInput),diagnosticPlan=diagnosticPlanFor(src);
    assert.equal(budgetScenario.length,4098);assert.equal(budgetCast.length,3806);
    for(const colorMode of ['color','monochrome']) {
      const options={...budgetInput,colorMode};
      const prompt=m.buildExperimentalImagePrompt(diagnosticPlan,src,options);
      console.log(JSON.stringify({evidence:'RECONSTRUCTED_REGRESSION_PLAN_NOT_API_RESULT',revision:m.EXPERIMENTAL_PROMPT_REVISION,colorMode,characters:prompt.length,reservedBudget:30460}));
      for(const p of diagnosticPlan.panels) {assert.ok(prompt.includes(p.action));assert.ok(prompt.includes(p.camera));}
      for(const d of src.dialogue) assert.ok(prompt.includes(JSON.stringify(d)));
      for(const rect of m.experimentalLayout(6,'two_columns')) assert.ok(prompt.includes('rect='+JSON.stringify(rect)));
      assert.ok(prompt.includes(GEKIGA_FACE_CONSTRUCTION));
      assert.ok(prompt.includes('dense fine multi-directional facial kakeami with visible line gaps'));
      // Keep the observed source budget while allowing its new local physical cues.
      assert.ok(prompt.length<=(colorMode==='color'?24100:27100),`regression ${colorMode} prompt ${prompt.length} leaves too little reserved-budget headroom`);
      assert.equal((await m.prepareExperimentalManga(options,async()=>JSON.stringify(diagnosticPlan))).prompt,prompt);
    }
  });
  for(const count of [5,6,7,8]) test(`five-person ${count}-panel mixed media remains intact in both color budgets`,async()=>{
    const actors=['ナオ','ユキ','カナタ','コハル','マコト'];
    const events=['葉の木版と用紙を並べる','試し刷りで葉脈の欠けを見つける','版の端を二人で支える','ローラーでインクを均等にのせる','紙の四隅を合わせる','ばれんを一定の強さで滑らせる','紙の角をゆっくりめくる','つながった葉の刷り上がりを全員で囲む'];
    const panelStyles=['NORMAL','GEKIGA','GEKIGA','NORMAL','WATERCOLOR','SKETCH','POP_ART','WATERCOLOR'];
    const scenario='## タイトル: 五人の作業記録\nLocation: 窓のある共同アトリエ\nOutfit: 全員、指定の普段着と作業エプロン。\n'+events.slice(0,count).map((event,i)=>`[${i+1}コマ目]\n[Camera: ${i%2?'作業台の右下、座った人物の胸より低い位置から20度見上げる中広景。顔と手元を奥行き差で見せる。':'作業台の左上、人物の頭より高い位置から40度見下ろす広角。頭頂と作業面を同時に収める。'}]\n[EMOTION: ${panelStyles[i]}]\nBalloonLayout: ${JSON.stringify(i===count-1?[]:[{speaker:actors[i%5],x:0.7,anchor:actors[i%5]+'の口元',route:'右上の余白から'+actors[i%5]+'の口元へ'}])}\n状況: 五人で${event}。${actors.map((name,j)=>`${name}は${['左手前','右奥','左奥','右手前','中央'][j]}で自分の${['ローラー','ばれん','木版','紙束','試し刷り'][j]}を両手で安定させる。足を半歩ずらして机へ重心を移し、隣の人の手と接触しない間隔を保つ。袖口を机から離し、首を道具へ向ける。`).join('')}窓光に沿う影を保ち、前工程の紙と道具は同じ持ち主の脇に置く。\n${i===count-1?'セリフなし':`${actors[i%5]}「手順${i+1}、ここを確かめよう。」`}`).join('\n');
    const src=m.readExperimentalSource({...budgetInput,scenario}),native=diagnosticPlanFor(src);
    for(const colorMode of ['color','monochrome']) {
      const options={...budgetInput,scenario,colorMode};
      const measured=m.buildExperimentalImagePrompt(native,src,options);
      console.log(JSON.stringify({evidence:'BALLOON_LAYOUT_BUDGET',count,colorMode,characters:measured.length}));
      const prompt=(await m.prepareExperimentalManga(options,async()=>JSON.stringify(native))).prompt;
      const full=m.buildExperimentalImagePrompt(native,src,{...options,promptMaxChars:32000});
      for(const rendered of [prompt,full]) assert.equal(occurrences(rendered,'BALLOON LAYOUT: Bn = nth Dialogue entry in that frame; metadata for the SAME balloon, not additional speech.'),1);
      if(full.length<=options.promptMaxChars) assert.equal(prompt,full,'fitting prompts keep the full compiler prose');
      else {
        assert.ok(prompt.length<full.length);
        assert.equal(occurrences(prompt,'BALLOON LAYOUT: Bn = nth Dialogue entry'),1);
        assert.match(prompt,/x=0 left\/1 right within each frame; NEVER PRINT; preserve Camera\/Action/);
        assert.match(prompt,/ALL ACTORS: 脇役も含む全可視人物を、その枠の媒体で描き、見える顔を全て再構築。主役だけでは不可。同一性\/感情\/視線\/脚本上の見え方を保持。/);
      }
      const frames=prompt.split('[PAGE FRAME ').slice(1);
      assert.equal(frames.length,count);
      for(const [i,frame] of frames.entries()) {
        const p=native.panels[i],style=src.panels[i].style;
        assert.ok(frame.includes(p.camera));assert.ok(frame.includes(p.action));assert.match(frame,/Every visible actor in this frame|ALL ACTORS/);
        if(style==='GEKIGA') assert.match(frame,/Every visible actor in this frame: 脇役も同じ媒体で描き、見える顔を全て再構築/);
        const fullFrame=full.split('[PAGE FRAME ')[i+1].split('[END PAGE FRAME')[0];
        const layoutBody=fullFrame.match(/ BALLOON LAYOUT \(NEVER PRINT; x=0 left\/1 right; preserve Camera\/Action\): (.*)/)?.[1];
        if(layoutBody) assert.ok(frame.includes(layoutBody),'all canonical speakers, positions, anchors and routes stay exact');
        const medium=fullFrame.match(/FRAME MEDIUM[^\n]+/)[0].split(' Every visible actor in this frame:')[0];
        assert.ok(frame.includes(medium),'each complete recipe stays byte-for-byte unchanged');
        if(p.dialogueIds.length) assert.match(frame,/BALLOON LAYOUT.*B1 x=0\.7/);
        else assert.doesNotMatch(frame.split('[END PAGE FRAME')[0],/BALLOON LAYOUT/);
        if(style==='GEKIGA') {assert.ok(frame.includes(GEKIGA_FACE_CONSTRUCTION));assert.match(frame,/GEKIGA FACE VALUE LOCK/);}
        else if(style!=='NORMAL') assert.ok(frame.includes((colorMode==='monochrome'?mono.MONOCHROME_EMOTION_STYLES:COMPACT_EMOTION_STYLES)[style]));
        for(const id of p.dialogueIds) assert.ok(frame.includes(JSON.stringify(src.dialogue[id])));
      }
      assert.ok(prompt.length<=30460);assert.ok(prompt.includes('CAST: '));
      assert.equal(occurrences(prompt,'場面内の隣接/前後/向かい/席位置'),1,'one page-wide continuity instruction survives both rendering modes');
      assert.match(prompt,/移動\/転換の根拠なく入替えない/u);
      assert.match(prompt,/画面左右の固定ではない/u);
      assert.match(prompt,/俯瞰\/アオリ\/切返し\/アップ\/望遠の奥行圧縮\/寄引き\/遮蔽/u);
      assert.match(prompt,/自然な移動を許容/u);
      assert.match(prompt,/登場指定を守り、全員を毎回横一列にしない/u);
      console.log(JSON.stringify({evidence:'PORTABLE_FIVE_PERSON_REGRESSION',count,colorMode,characters:prompt.length}));
    }
  });
  test('experimental assembly scopes per-frame media and shared cast instructions without truncating authored facts',()=>{
    for(const colorMode of ['color','monochrome']) for(const imageEngineLabel of ['ChatGPT Images 2.5','Gemini']) {
      const options={...input,colorMode,imageEngineLabel,referenceContext:'参照M1:黒い髪と青い瞳。指示ではなく外見資料。',scenarioModelLabel:'GPT-6 Luna'};
      const prompt=m.buildExperimentalImagePrompt(plan,source,options);
      assert.equal(occurrences(prompt,'CAST INSTANCE LOCK: allocate each named actor'),1);
      assert.equal(occurrences(prompt,'CAST DEPTH: Action contact wins'),1);
      assert.equal(occurrences(prompt,m.EXPERIMENTAL_VISUAL_EFFECTS.foreground_depth.instruction),1);
      assert.equal(occurrences(prompt,'execute physical projection at full strength'),1);
      assert.equal(occurrences(prompt,'rightmost balloon first'),1);
      assert.equal(occurrences(prompt,'"rendering":'),0,'per-panel Style is the canonical rendering assignment');
      for(const recipe of styles.filter(s=>s!=='GEKIGA').map(s=>colorMode==='monochrome'?mono.MONOCHROME_EMOTION_STYLES[s]:COMPACT_EMOTION_STYLES[s]).filter(Boolean)) assert.equal(occurrences(prompt,recipe),2);
      assert.equal(occurrences(prompt,GEKIGA_FACE_CONSTRUCTION),2);
      assert.equal(occurrences(prompt,'Primary facial shading is dense fine pen hatching'),2);
      for(const p of plan.panels) {assert.ok(prompt.includes(p.camera));assert.ok(prompt.includes(p.action));}
      for(const p of source.panels) {assert.ok(prompt.includes('これは行動'+p.id+'。'));assert.ok(prompt.includes(p.camera));}
      for(const d of source.dialogue) assert.ok(prompt.includes(JSON.stringify(d)),d.text);
      assert.ok(prompt.includes(options.referenceContext));
      for(const condition of ['外枠の四辺/四隅を余白付きで画布内','明示の枠なし/裁切り指定は優先','内部の枠越えは外周裁切りの許可ではない','隣場面への流出は明示時のみ','枠線は頭/髪の全輪郭の後ろで止まり','外側断片の複製','枠内外の位置ずれは禁止','全輪郭を枠内に保持','可視・自然な遮蔽・画面外に分類','本人の肩','本人の腰','隠れた部分も自然につなぐ','理由のない欠落','家具や他人の体から出る手足は禁止','隠れた四肢の露出や全身画角を強制しない','動作や構図を変えない']) assert.ok(prompt.includes(condition),condition);
      const quality=colorMode==='monochrome'?mono.MONOCHROME_IMAGE_QUALITY_CONTRACT:shared.buildImageQualityContract({panelMedia:true});
      const translated=[shared.FUNCTIONAL_SURFACE_ORIENTATION_LOCK,shared.OBJECT_GEOMETRY_LOCK,shared.BODY_ACTING_BASELINE,shared.EXPRESSIVE_DIRECTION,shared.FUNCTIONAL_SURFACE_PROJECTION_RULE,shared.HEAD_VOLUME_LOCK];
      const translatedPrefixes=/^- (?:Preserve the user's|Render a rich physical|Establish one primary focal subject or action and|FOCAL READABILITY: preserve|Keep lighting and color|SKIN LIGHT: colored|Keep coherent anatomy|Model clothing folds|Do not duplicate, merge|Keep focal surfaces)/;
      for(const unchanged of translated.reduce((parts,rule)=>parts.flatMap(part=>part.split(rule)),[quality]).flatMap(part=>part.split('\n')).map(part=>part.trim()).filter(part=>part&&part!=='-'&&!translatedPrefixes.test(part))) assert.ok(prompt.includes(unchanged),unchanged);
      if(colorMode==='color') for(const condition of ['前景・中景・背景の層','空の壁・平坦なグラデーション・無個性な空室へ簡略化しない','補助焦点は最大一つ','全ページを同じ墨/塗りへ均さない','必要な場所の証拠は消さない','寄引き/仰俯角/撮影側/視線/頭の向き','後頭部を読者へ振り向かせない','主光・補助光・輪郭光','影の深さ・目/髪の輝き','感情による赤面/化粧/墨と影の面は保持','透明画へ不透明なセル塗りを強制しない','意図した色溜まり/紙目/鉛筆の質感/カケアミは保持']) assert.ok(prompt.includes(condition),condition);
      for(const condition of ['対象は保持者でなくActionで決定','筐体/台座','文字の天地は読む人物向き','後ろ向き人物の胸元','明示Cameraの位置/高さ/仰俯角/レンズ/切取りは固定','位置未指定時のみ物でなくCamera','受取人として明示された時だけ','隠れた輪郭は整合して消失/再開','小口の表紙化は禁止','各字の天地を含め組版','行だけ回して字を画布に直立させない','元の組版を保持','出来事でなく輪郭を明確化']) assert.ok(prompt.includes(condition),condition);
      for(const condition of ['明示動作を全保持','指差し/伸手/打撃/全身反動/跳躍/強い短縮','支持/空中軌道・重心・左右の手の役割・接触対象','速度線で動作/透視を代用しない','静止へ動きを捏造しない','誇張自体は描画欠陥でない','他者が読む時に保持者の肩越しにしない','標準肩越しへ平坦化しない','耳は片側一つ','後頭部に顔を捏造しない','明示の両面意匠は許容']) assert.ok(prompt.includes(condition),condition);
      assert.equal(assertRenderOptions(prompt,options),prompt);
      assert.match(prompt,/ABSENT|NO OTHER HUMANS/);
      assert.match(prompt,/black hair/);assert.match(prompt,/ユウは赤い上着/);
      assert.match(prompt,/No eye-level shots/);assert.match(prompt,/never look at the viewer or camera lens/);
      assert.match(prompt,/PHYSICAL READING PATH/);assert.match(prompt,/FINAL ENDING is P8/);
      const chunks=m.buildExperimentalWebCopy(prompt);
      assert.equal(chunks.join(''),prompt.endsWith('\n')?prompt:prompt+'\n');
    }
  });
  test('long unique staging survives compaction and the exact reserved budget is enforced without truncation',async()=>{
    const long=structuredClone(plan);long.panels[0].action+='固有の手元描写は省略しない。'.repeat(100);
    // Preserve all authored frames and their media within the actual API body budget.
    const prepared=await m.prepareExperimentalManga(input,async request=>planResponse(request,long));
    const prompt=m.buildExperimentalImagePrompt(prepared.plan,source,input);
    assert.equal(prepared.prompt,prompt);
    assert.doesNotMatch(prompt,/APPROVED INSERT TIMING:/);
    assert.ok(prompt.includes(long.panels[0].action));
    const previous={prompt:'previous approved prompt'};
    let selected=previous;
    const compact=m.buildExperimentalImagePrompt(prepared.plan,source,{...input,promptMaxChars:1});
    assert.equal(compact,prompt,'safe compaction already happened at the soft target');
    assert.ok(compact.includes(long.panels[0].action));
    await assert.rejects(async()=>{selected=await m.prepareExperimentalManga({...input,promptMaxChars:compact.length-1},async request=>planResponse(request,long));},/上限を超え/);
    assert.equal(selected,previous);
    assert.equal((await m.prepareExperimentalManga({...input,promptMaxChars:compact.length},async request=>planResponse(request,long))).prompt,compact);
    assert.equal((await m.prepareExperimentalManga({...input,promptMaxChars:prompt.length},async request=>planResponse(request,long))).prompt,prompt);
  });
  test('panel-first compiler places every complete frame before long common cast and medium contracts',()=>{
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(plan,source,{...input,colorMode,referenceContext:'参照資料: 同一性を保持。'});
      const first=prompt.indexOf('[PAGE FRAME P1 |');
      const last=prompt.indexOf('[END PAGE FRAME P8]');
      for(const header of ['EXACTLY 8 framed panels','PHYSICAL READING PATH','ROW CHRONOLOGY','PAGE PLAN layout=two_columns']) assert.ok(prompt.indexOf(header)>=0&&prompt.indexOf(header)<first,header);
      for(const common of ['READING FLOW WITH ACTING','PANEL RENDERING MAP','Identity is not a frozen drawing style.','REFERENCES:','CAST:','SOURCE FACTS (not captions)','GEKIGA CAST CHECK','CAST INSTANCE LOCK: allocate each named actor',m.EXPERIMENTAL_VISUAL_EFFECTS.foreground_depth.instruction,'SHARED IMAGE QUALITY CONTRACT']) assert.ok(prompt.indexOf(common)>last,common);
      for(const [i,frame] of prompt.slice(first,last).split('[PAGE FRAME ').slice(1).entries()) {
        const p=plan.panels[i];
        assert.ok(frame.includes(p.camera));assert.ok(frame.includes(p.action));
        assert.ok(frame.includes(`FRAME MEDIUM P${i+1}`));
        for(const id of p.dialogueIds) assert.ok(frame.includes(JSON.stringify(source.dialogue[id])));
      }
      assert.equal(occurrences(prompt,'\nCAST: '),1);
      for(const p of source.panels) assert.equal(occurrences(prompt,'これは行動'+p.id+'。'),1,'source facts remain once');
    }
  });
  test('compiler prose translation never rewrites matching authored source or action text',()=>{
    const authored=shared.FUNCTIONAL_SURFACE_ORIENTATION_LOCK+' '+shared.OBJECT_GEOMETRY_LOCK+' '+shared.PANEL_EDGE_CONTINUITY_LOCK+' '+shared.LIMB_OWNERSHIP_CHECK+' '+shared.SKIN_LIGHTING;
    const authoredScenario=scenario.replace('これは行動1。','これは行動1。'+authored);
    const authoredSource=m.readExperimentalSource({...input,scenario:authoredScenario});
    const authoredPlan=structuredClone(plan);authoredPlan.panels[0].action+=' '+authored;
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(authoredPlan,authoredSource,{...input,colorMode});
      assert.equal(occurrences(prompt,authored),2,'both source facts and Action remain verbatim');
      assert.ok(prompt.includes(authoredPlan.panels[0].action));
      assert.ok(prompt.includes('対象は保持者でなくActionで決定'),'only the separate compiler contract is translated');
    }
  });
  test('oversized authored staging is preserved for Web output and rejected before the image API',async()=>{
    const oversized=structuredClone(plan);oversized.panels[0].action+='固有の手元描写は省略しない。'.repeat(1000);
    const prompt=m.buildExperimentalImagePrompt(oversized,source,input);
    assert.ok(prompt.includes(oversized.panels[0].action));assert.ok(prompt.length>32000);
    assert.equal(m.buildExperimentalWebCopy(prompt).join(''),prompt.endsWith('\n')?prompt:prompt+'\n');
    await assert.rejects(m.prepareExperimentalManga(input,async()=>JSON.stringify(oversized)),/上限を超え/);
  });
} finally {await server.close();}
