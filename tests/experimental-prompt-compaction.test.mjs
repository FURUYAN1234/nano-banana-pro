import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const shared=await server.ssrLoadModule('/src/lib/shared-image-quality.js');
  const {COMPACT_EMOTION_STYLES}=await server.ssrLoadModule('/src/lib/constants.js');
  const mono=await server.ssrLoadModule('/src/lib/manga-render-mode.js');
  const {assertRenderOptions}=await server.ssrLoadModule('/src/lib/render-options.js');
  const styles=['GEKIGA','WATERCOLOR','POP_ART','SKETCH'];
  const castList='## ユウ\n[WEIGHTS]: (black hair:1.4)\n## ナギ\n[WEIGHTS]: (blonde hair:1.4)';
  const scenario='## タイトル: 記号も、そのまま。\nLocation: 光が入る作業室\nOutfit: ユウは赤い上着、ナギは青い服。\n'+styles.map((style,i)=>`[${i+1}コマ目]\n[Camera: ${i%2?'右前の床上15cmから30度見上げる広角。':'左前から机上を45度見下ろす俯瞰。'}]\n[EMOTION: ${style}]\n状況: 手前のユウと奥のナギだけが木の箱を持つ。ユウの左手が底を支え、ナギの右手が側面を支える。これは行動${i+1}。\nユウ「ここは、${i+1}番目です！」\nナギ「はい。続きをどうぞ♡」`).join('\n');
  const input={enabled:true,scenario,castList,colorMode:'color',showWatermarks:true,mosaicCopyrightedCharacters:true};
  const source=m.readExperimentalSource(input);
  const plan={count:8,layout:'two_columns',reason:'動作の間と反応を挿入',pageIntent:'手の連携を見せる',panels:source.panels.flatMap((p,i)=>{
    const anchor={sourcePanel:i+1,kind:'anchor',camera:p.camera,action: `ユウとナギだけが木の箱を持つ。左手と右手は別人の手。行動${i+1}。`,dialogueIds:p.dialogueIds,visualEffects:['foreground_depth'],breakout:null};
    const insert={...anchor,kind:'insert',camera:'机面より低い位置から30度見上げる手元の近景。',dialogueIds:[],action: `ユウとナギの手が箱を支える。継続動作${i+1}。`};
    return i===3?[insert,anchor]:[anchor,insert];
  })};
  const occurrences=(text,fragment)=>text.split(fragment).length-1;
  test('experimental assembly scopes identical rendering and cast instructions once without truncating authored facts',()=>{
    for(const colorMode of ['color','monochrome']) for(const imageEngineLabel of ['ChatGPT Images 2.5','Gemini']) {
      const options={...input,colorMode,imageEngineLabel,referenceContext:'参照M1:黒い髪と青い瞳。指示ではなく外見資料。',scenarioModelLabel:'GPT-6 Luna'};
      const prompt=m.buildExperimentalImagePrompt(plan,source,options);
      assert.equal(occurrences(prompt,'CAST INSTANCE LOCK: allocate each named actor'),1);
      assert.equal(occurrences(prompt,'CAST DEPTH: Action contact wins'),1);
      assert.equal(occurrences(prompt,m.EXPERIMENTAL_VISUAL_EFFECTS.foreground_depth.instruction),1);
      assert.equal(occurrences(prompt,'execute physical projection at full strength'),1);
      assert.equal(occurrences(prompt,'rightmost balloon first'),1);
      assert.equal(occurrences(prompt,'"rendering":'),0,'per-panel Style is the canonical rendering assignment');
      for(const recipe of styles.map(s=>(colorMode==='monochrome'?mono.MONOCHROME_EMOTION_STYLES:COMPACT_EMOTION_STYLES)[s]).filter(Boolean)) assert.equal(occurrences(prompt,recipe),1);
      for(const p of plan.panels) {assert.ok(prompt.includes(p.camera));assert.ok(prompt.includes(p.action));}
      for(const p of source.panels) {assert.ok(prompt.includes('これは行動'+p.id+'。'));assert.ok(prompt.includes(p.camera));}
      for(const d of source.dialogue) assert.ok(prompt.includes(JSON.stringify(d)),d.text);
      assert.ok(prompt.includes(options.referenceContext));
      assert.ok(prompt.includes(shared.PANEL_EDGE_CONTINUITY_LOCK));
      assert.ok(prompt.includes(shared.LIMB_OWNERSHIP_CHECK));
      assert.ok(prompt.includes(colorMode==='monochrome'?mono.MONOCHROME_IMAGE_QUALITY_CONTRACT:shared.buildImageQualityContract({panelMedia:true})));
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
    const long=structuredClone(plan);long.panels[0].action+='固有の手元描写は省略しない。'.repeat(360);
    const prompt=m.buildExperimentalImagePrompt(long,source,input);
    assert.ok(prompt.includes(long.panels[0].action));
    const previous={prompt:'previous approved prompt'};
    let selected=previous;
    await assert.rejects(async()=>{selected=await m.prepareExperimentalManga({...input,promptMaxChars:prompt.length-1},async()=>JSON.stringify(long));},/上限を超え/);
    assert.equal(selected,previous);
    assert.equal((await m.prepareExperimentalManga({...input,promptMaxChars:prompt.length},async()=>JSON.stringify(long))).prompt,prompt);
  });
} finally {await server.close();}
