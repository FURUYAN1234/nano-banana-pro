import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
  const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {cleanCastList,stripWeightTags} = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const castList = '## ユウ\n[WEIGHTS]: (large eyes:1.3), (black hair:1.4), (young adult:1.2)\n左頬にほくろ。\n## ナギ\n[WEIGHTS]: (glasses:1.6), (blonde hair:1.3)\n片眉が高い。';
  const scenario = '## タイトル: 二人の箱\n'+['NORMAL','POP_ART','WATERCOLOR','GEKIGA','SKETCH','CHIBI_GAG'].map((style,i)=>
    `[${i+1}コマ目]\n[EMOTION: ${style}]\n[Camera: 左上から45度の俯瞰。二人の手元へ寄る。]\n状況: ユウとナギが箱を持つ。\nセリフなし`).join('\n');
  const input = {enabled:true,scenarioMode:'experimental-manga',scenario,castList,colorMode:'color'};
  const source = native.readExperimentalSource(input);
  const plan = {count:6,layout:'two_columns',reason:'二人で運ぶ',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウとナギが箱を支える。',dialogueIds:p.dialogueIds,breakout:null}))};
  const castSection = prompt => prompt.match(/^CAST: (.*(?:\n(?!\[END REFERENCE CAST DATA\]).*)*)/m)?.[0];
  test('native ChatGPT CAST uses the same numeric-weight normalization as ordinary ChatGPT without losing identity words',()=>{
    const chat = native.buildExperimentalImagePrompt(plan,source,{...input,providerFamily:'chatgpt'});
    const gemini = native.buildExperimentalImagePrompt(plan,source,{...input,providerFamily:'gemini'});
    const before = castSection(gemini);
    const after = castSection(chat);
    assert.ok(before&&after);
    assert.match(before,/\(large eyes:1\.3\)/);
    assert.doesNotMatch(after,/\([^()]+:\d+(?:\.\d+)?\)/);
    assert.equal(after,`CAST: ${stripWeightTags(cleanCastList(castList,''))}`);
    assert.equal(chat.replace(after,'CAST: unchanged words'),gemini.replace(before,'CAST: unchanged words'),
      'camera, acting, speech, styles and all other clauses must remain byte-identical');
    assert.equal(source.castList,castList,'do not mutate the user character sheet analysis');
  });
  test('native provider normalization rejects unknown families and preserves the legacy Gemini default',()=>{
    assert.equal(native.buildExperimentalImagePrompt(plan,source,input),native.buildExperimentalImagePrompt(plan,source,{...input,providerFamily:'gemini'}));
    assert.throws(()=>native.buildExperimentalImagePrompt(plan,source,{...input,providerFamily:'typo'}),/provider family/);
  });
  test('an invalid native provider is rejected before any paid planning or recovery call',async()=>{
    let calls=0;
    await assert.rejects(native.prepareExperimentalManga({...input,providerFamily:'typo'},async()=>{
      calls++;return JSON.stringify(plan);
    }),/provider family/);
    assert.equal(calls,0);
  });
} finally { await server.close(); }
