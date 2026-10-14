import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {GEKIGA_FACE_CONSTRUCTION}=await server.ssrLoadModule('/src/lib/constants.js');
  const input={enabled:true,colorMode:'color',castList:'## ユウ\n## ナギ',scenario:[1,2,3,4,5].map(n=>`[${n}コマ目]\n[Camera: 高い位置から俯瞰]\n[EMOTION: GEKIGA]\n状況: ユウが箱を開き、ナギが穏やかに見守る。\nユウ「確認${n}」`).join('\n')};
  const source=m.readExperimentalSource(input);
  const plan={count:5,layout:'two_columns',reason:'順序を保った対比',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが箱を開き、ナギが穏やかに見守る。',dialogueIds:p.dialogueIds,breakout:null}))};
  test('compact gekiga recipe changes facial construction without changing calm acting',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/calm|gentle|穏やか/);
    assert.match(prompt,/no added anger, age or wrinkles/i);
    assert.match(prompt,/every visible face, including[^\n]*bespectacled actors/i);
    assert.match(prompt,/small irises partly covered by thick anatomical lids/i);
    assert.match(prompt,/nose.*cheek.*jaw/i);
    assert.match(prompt,/line weight|brush contours/i);
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
    assert.match(prompt,/recessed eyes under the brow ridge, lids wrapping eyeballs/i);
    assert.match(prompt,/narrow eye openings, small irises partly covered by thick anatomical lids/i);
    assert.match(prompt,/projecting nose bridge, sidewalls and nostril wings/i);
    assert.match(prompt,/dense fine multi-directional facial kakeami with visible line gaps/i);
    assert.match(prompt,/Override reference eye geometry/i);
    assert.match(prompt,/smile.*without enlarging eyes/i);
    assert.match(prompt,/Opaque color sits beneath the dominant pen hatching/i);
    assert.match(prompt,/no added anger, age|do not add anger/i);
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
    assert.doesNotMatch(mono,/Opaque color sits beneath the dominant pen hatching/);
  });
  test('gekiga requests deliberately deep facial relief instead of merely more fine shading',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/DEEP-CUT GEKIGA/);
    assert.match(prompt,/recessed eyes under the brow ridge/i);
    assert.match(prompt,/projecting nasal sidewalls and nostril wings, distinct cheekbone and jaw angles/i);
    assert.match(prompt,/fine crossing pen strokes following each plane and the scripted light/i);
    assert.match(prompt,/individual strokes and narrow paper-light gaps/i);
    assert.match(prompt,/dense fine multi-directional facial kakeami/i);
    assert.match(prompt,/Vary line spacing, angle and pressure/i);
    assert.match(prompt,/not dirt, decorative scratches, age creases/i);
    assert.match(prompt,/Even in soft light.*hatch density/i);
    assert.match(prompt,/Override reference eye geometry and simplified nose rendering; in GEKIGA, soft describes emotion, not rounded anime anatomy/i);
    assert.match(prompt,/smile.*without enlarging eyes/i);
    assert.match(prompt,/Keep scripted gaze, Camera, crop and expression/);
    assert.match(prompt,/Solid black is a secondary accent/i);
    assert.doesNotMatch(prompt,/large connected black masses|dominant black ink|hard ink separation/i);
  });
  test('deep-cut reminder follows only actual gekiga frames, including mixed and monochrome pages',()=>{
    const mixed={...source,panels:source.panels.map((p,i)=>({...p,style:i===2?'GEKIGA':'WATERCOLOR'}))};
    for(const colorMode of ['color','monochrome']) {
      const prompt=m.buildExperimentalImagePrompt(plan,mixed,{...input,colorMode});
      const frames=prompt.split('[PAGE FRAME ').slice(1);
      assert.equal(frames.length,5);
      for(const [i,frame] of frames.entries()) {
        assert.equal(frame.includes('GEKIGA FACE VALUE LOCK:'),i===2);
      }
    }
    const ordinary=m.buildExperimentalImagePrompt(plan,{...source,panels:source.panels.map(p=>({...p,style:'NORMAL'}))},input);
    assert.doesNotMatch(ordinary,/DEEP-CUT GEKIGA|GEKIGA FACE VALUE LOCK/);
  });
  test('side-by-side frames receive explicit chronological pairs while strips receive none',()=>{
    const prompt=m.buildExperimentalImagePrompt(plan,source,input);
    assert.match(prompt,/ROW CHRONOLOGY: P1 RIGHT precedes P2 LEFT; P3 RIGHT precedes P4 LEFT/);
    assert.match(prompt,/各組の先行場面が先。絵\/吹き出しの均衡のために入替えない。ページ位置であり、コマ内Camera\/Actionの方向ではない。/);
    const strips=m.buildExperimentalImagePrompt({...plan,layout:'strips'},source,input);
    assert.doesNotMatch(strips,/ROW CHRONOLOGY:/);
    assert.match(strips,/P1 -> P2 -> P3 -> P4 -> P5/);
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
          assert.doesNotMatch(frame,/GEKIGA FACE VALUE LOCK|fully redraw faces as realistic GEKIGA/);
        }
        if(style==='GEKIGA') {
          assert.ok(frame.includes(GEKIGA_FACE_CONSTRUCTION));
          assert.match(frame,/narrow eye openings, small irises partly covered by thick anatomical lids/);
        }
      }
    }
  });
} finally {await server.close();}
