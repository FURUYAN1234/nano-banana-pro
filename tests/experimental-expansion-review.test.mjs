import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {GEKIGA_FACE_CONSTRUCTION}=await server.ssrLoadModule('/src/lib/constants.js');
  const {buildActorMediumInstruction}=await server.ssrLoadModule('/src/lib/panel-utils.js');
  const input={enabled:true,colorMode:'color',castList:'## ユウ\n## ナギ',scenario:[1,2,3,4,5].map(n=>`[${n}コマ目]\n[Camera: 高い位置から俯瞰]\n[EMOTION: GEKIGA]\n状況: ユウが箱を開き、ナギが穏やかに見守る。\nユウ「確認${n}」`).join('\n')};
  const source=m.readExperimentalSource(input);
  const plan={count:5,layout:'two_columns',reason:'順序を保った対比',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが箱を開き、ナギが穏やかに見守る。',dialogueIds:p.dialogueIds,breakout:null}))};
  test('compact gekiga recipe changes facial construction without changing calm acting',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/calm|gentle|穏やか/);
    assert.match(prompt,/怒り\/加齢\/皺を追加しない/);
    assert.match(prompt,/穏やか・微笑・遠景・眼鏡を含む全可視顔を再構築/);
    assert.match(prompt,/small irises partly covered by thick anatomical lids/i);
    assert.match(prompt,/nose.*cheek.*jaw/i);
    assert.match(prompt,/内部は細線、外輪郭は強弱ある太い筆線/);
    assert.doesNotMatch(m.buildExperimentalImagePrompt(plan,{...source,panels:source.panels.map(p=>({...p,style:'NORMAL'}))},input),/GEKIGA CAST CHECK/);
  });
  test('experimental color gekiga keeps shared facial construction with hatch-led shading at the rendering boundary',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.ok(prompt.includes(GEKIGA_FACE_CONSTRUCTION));
    assert.match(prompt,/Primary facial shading is dense fine pen hatching/i);
    const normal=m.buildExperimentalImagePrompt(plan,{...source,panels:source.panels.map(p=>({...p,style:'NORMAL'}))},input);
    assert.ok(!normal.includes(GEKIGA_FACE_CONSTRUCTION));
  });
  test('gekiga uses ink-built facial volumes and overrides reference eye geometry without changing emotion',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/HATCH-FIRST FACE CONSTRUCTION/);
    assert.match(prompt,/眉骨下へくぼむ眼、眼球を包む厚い瞼/);
    assert.match(prompt,/narrow eye openings, small irises partly covered by thick anatomical lids/i);
    assert.match(prompt,/projecting nose bridge, sidewalls and nostril wings/i);
    assert.match(prompt,/dense fine multi-directional facial kakeami with visible line gaps/i);
    assert.match(prompt,/参照の眼形状\/簡略鼻を上書き/);
    assert.match(prompt,/微笑は口と頬を緩め、目を拡大せず/);
    assert.match(prompt,/主となるハッチの下に不透明色/);
    assert.match(prompt,/怒り\/加齢\/皺を追加しない/);
    const observation=m.buildExperimentalReviewPrompt(plan,source);
    assert.match(observation,/State which visible face still has enlarged anime eyes or a simplified nose/);
    assert.match(observation,/A pass requires visible facial construction evidence/);
  });
  test('strong facial ink is scoped to gekiga panels and does not impose color on monochrome',()=>{
    const mixed={...source,panels:source.panels.map((p,i)=>({...p,style:i===2?'GEKIGA':'WATERCOLOR'}))};
    const prompt=m.buildExperimentalImagePrompt(plan,mixed,input);
    assert.match(prompt,/GEKIGA CAST CHECK \(P3 only\)/);
    assert.doesNotMatch(m.buildExperimentalImagePrompt(plan,{...source,panels:source.panels.map(p=>({...p,style:'NORMAL'}))},input),/HATCH-FIRST FACE CONSTRUCTION/);
    const mono=m.buildExperimentalImagePrompt(plan,source,{...input,colorMode:'monochrome'});
    assert.match(mono,/HATCH-FIRST FACE CONSTRUCTION/);
    assert.doesNotMatch(mono,/主となるハッチの下に不透明色/);
    assert.match(mono,/墨と紙白。顔の陰影はペン線で、均一な灰色網点にしない/);
  });
  test('gekiga requests deliberately deep facial relief instead of merely more fine shading',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/DEEP-CUT GEKIGA/);
    assert.match(prompt,/眉骨下へくぼむ眼/);
    assert.match(prompt,/突出する鼻梁\/鼻側面\/小鼻、明瞭な頬骨\/顎角/);
    assert.match(prompt,/各面と脚本の光に沿う細い交差ペン線/);
    assert.match(prompt,/個々の線と狭い紙白の隙間を残す/);
    assert.match(prompt,/dense fine multi-directional facial kakeami/i);
    assert.match(prompt,/線間隔\/角度\/筆圧を変え/);
    assert.match(prompt,/汚れ\/装飾傷\/加齢皺\/灰色テクスチャ被せではない/);
    assert.match(prompt,/柔光でも同じ光向きでハッチ密度差を明瞭/);
    assert.match(prompt,/参照の眼形状\/簡略鼻を上書き。劇画の柔らかさは感情で、丸いアニメ顔ではない/);
    assert.match(prompt,/微笑は口と頬を緩め、目を拡大せず/);
    assert.match(prompt,/脚本の視線\/Camera\/切取り\/表情と性別表現を保持/);
    assert.match(prompt,/黒ベタは鼻孔\/顎下など最深部の小さな遮蔽の補助だけ/);
    assert.match(prompt,/ハッチ前に頭蓋と顔面を組立て/);
    assert.match(prompt,/陰影なしでも読める輪郭/);
    assert.match(prompt,/眼窩\/こめかみ\/鼻側面\/頬下面\/首/);
    assert.match(prompt,/明部へ線を先細りさせ、影は広い塗潰しや柔らかなグラデでなく線の層で深める/);
    assert.match(prompt,/内部は細線、外輪郭は強弱ある太い筆線/);
    assert.match(prompt,/顔のハッチを大きな平坦セル影で代替しない/);
    assert.match(prompt,/年齢\/髪\/肌色\/眼鏡\/顔の識別点で同一性を保つ/);
    assert.match(prompt,/冷静な顔は冷静に。他コマは各自の顔構造\/媒体を保持/);
    assert.doesNotMatch(prompt,/large connected black masses|dominant black ink|hard ink separation/i);
  });
  test('deep-cut reminder follows only actual gekiga frames, including mixed and monochrome pages',()=>{
    const mixed={...source,panels:source.panels.map((p,i)=>({...p,style:i===2?'GEKIGA':'WATERCOLOR'}))};
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(plan,mixed,{...input,colorMode});
      const frames=prompt.split('[PAGE FRAME ').slice(1);
      assert.equal(frames.length,5);
      for(const [i,frame] of frames.entries()) {
        assert.equal(frame.includes(buildActorMediumInstruction('GEKIGA',colorMode)),i===2);
        assert.ok(frame.includes(buildActorMediumInstruction(i===2?'GEKIGA':'WATERCOLOR',colorMode)));
      }
    }
    const ordinary=m.buildExperimentalImagePrompt(plan,{...source,panels:source.panels.map(p=>({...p,style:'NORMAL'}))},input);
    assert.doesNotMatch(ordinary,/DEEP-CUT GEKIGA|^ACTOR MEDIUM\b/m);
  });
  test('native actor bindings follow the canonical frame style even when original text differs',()=>{
    const mixed={...source,panels:source.panels.map((p,i)=>({...p,style:i===2?'GEKIGA':i===4?'NORMAL':'WATERCOLOR'}))};
    assert.ok(mixed.panels.every(p=>p.text.includes('[EMOTION: GEKIGA]')),'fixture retains the conflicting original metadata');
    const prompt=m.buildExperimentalImagePrompt(plan,mixed,input);
    const frames=prompt.split('[PAGE FRAME ').slice(1).map(frame=>frame.split('[END PAGE FRAME')[0]);
    for(const [index,frame] of frames.entries()) {
      const style=mixed.panels[index].style;
      assert.match(frame,new RegExp(`FRAME MEDIUM P${index+1} — ${style}:`));
      const roster=frame.split('\n').find(line=>line.startsWith('CAST COUNT:'));
      assert.ok(roster);
      if(style==='NORMAL') {
        assert.doesNotMatch(roster,/\]=(GEKIGA|WATERCOLOR)/);
        assert.doesNotMatch(frame,/ACTOR MEDIUM/);
      } else {
        assert.equal((roster.match(new RegExp(`\\]=${style}`,'g'))||[]).length,2);
        assert.doesNotMatch(roster,new RegExp(`\\]=${style==='GEKIGA'?'WATERCOLOR':'GEKIGA'}`));
        assert.ok(frame.includes(buildActorMediumInstruction(style,'color')));
      }
      assert.ok(frame.includes(plan.panels[index].camera));
      assert.ok(frame.includes(plan.panels[index].action));
      assert.ok(frame.includes(`確認${index+1}`));
    }
  });
  test('side-by-side frames receive explicit chronological pairs while strips receive none',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/ROW CHRONOLOGY: P1 RIGHT precedes P2 LEFT; P3 RIGHT precedes P4 LEFT/);
    assert.match(prompt,/各組の先行場面が先。絵\/吹き出しの均衡のために入替えない。ページ位置であり、コマ内Camera\/Actionの方向ではない。/);
    assert.throws(()=>m.buildExperimentalImagePrompt({...plan,layout:'strips'},source,input),/配置/);
  });
  test('character references never become an implicit drawing-style lock in the experimental prompt',()=>{
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(plan,source,{...input,colorMode});
      assert.doesNotMatch(prompt,/identity\/style\/asset references/);
      assert.match(prompt,/REFERENCES:.*identity.*asset.*selected panel recipe determines.*face\/eye construction/i);
    }
  });
  test('every frame binds its complete medium to all visible actors, including successive watercolor panels',()=>{
    const mixed={...source,panels:source.panels.map((p,i)=>({...p,style:['NORMAL','GEKIGA','WATERCOLOR','WATERCOLOR','GEKIGA'][i]}))};
    const mediaPlan=plan;
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(mediaPlan,mixed,{...input,colorMode});
      const frames=[...prompt.matchAll(/\[PAGE FRAME P\d+[^\n]*\][\s\S]*?\[END PAGE FRAME P\d+\]/g)].map(match=>match[0]);
      assert.equal(frames.length,5);
      for(const [i,frame] of frames.entries()) {
        const style=mixed.panels[mediaPlan.panels[i].sourcePanel-1].style;
        assert.match(frame,new RegExp(`FRAME MEDIUM P${i+1} — ${style}:`));
        assert.match(frame,/Every visible actor in this frame|ALL ACTORS\./);
        if(frame.includes('ALL ACTORS.')) assert.match(prompt,/ALL ACTORS: 脇役も含む全可視人物を、その枠の媒体で描き、見える顔を全て再構築。主役だけでは不可。同一性\/感情\/視線\/脚本上の見え方を保持。/);
        if(style==='WATERCOLOR') {
          assert.match(frame,/水彩|wash|pigment/i);
          assert.ok(!frame.includes(buildActorMediumInstruction('GEKIGA','color')));
          assert.doesNotMatch(frame,/fully redraw faces as realistic GEKIGA|\]=GEKIGA/);
        }
        if(style==='GEKIGA') {
          assert.ok(frame.includes(GEKIGA_FACE_CONSTRUCTION));
          assert.match(frame,/narrow eye openings, small irises partly covered by thick anatomical lids/);
        }
      }
    }
  });
} finally {await server.close();}
