import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import test from 'node:test';
import {createServer} from 'vite';
import {restoreReviewedShotExecution} from './helpers/prompt-policy-normalization.mjs';
import {readFileSync} from 'node:fs';
const wardrobeChanges=JSON.parse(readFileSync(new URL('./fixtures/selection-shared-contract-normalization.json',import.meta.url))).entries.filter(({name})=>name.startsWith('WARDROBE_708_'));
const beforeWardrobeChange=value=>wardrobeChanges.reduce((text,change)=>text.replaceAll(change.current,change.previous),restoreReviewedShotExecution(value));

test('normal four-panel prompts and shared quality text match released v7.0.2',async()=>{
  const released=new Map(['prompt-assembler','shared-image-quality'].map(name=>[name,
    execFileSync('git',['show',`v7.0.2:src/lib/${name}.js`],{encoding:'utf8'})]));
  const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true},plugins:[{
    name:'read-only-release-baseline',enforce:'pre',load(id){
      if(!id.endsWith('?released'))return;
      const name=id.match(/([^/]+)\.js\?released$/)?.[1];
      return released.get(name);
    }
  }]});
  try {
    const old=await server.ssrLoadModule('/src/lib/prompt-assembler.js?released');
    const current=await server.ssrLoadModule('/src/lib/prompt-assembler.js');
    const oldQuality=await server.ssrLoadModule('/src/lib/shared-image-quality.js?released');
    const quality=await server.ssrLoadModule('/src/lib/shared-image-quality.js');
    assert.equal(quality.SHARED_IMAGE_QUALITY_CONTRACT,oldQuality.SHARED_IMAGE_QUALITY_CONTRACT);
    for(const providerFamily of ['chatgpt','gemini']) for(const colorMode of ['color','monochrome'])
      for(const showWatermarks of [false,true]) for(const scenarioModelLabel of [undefined,'scenario model']) {
        const input={providerFamily,colorMode,showWatermarks,scenarioModelLabel,systemVersion:'v7.0.2',castList:'Character [A]: adult',
          scenario:'Topic: 工作\n'+[1,2,3,4].map(n=>`[${n}コマ目]\n[Camera: ${n%2?'俯瞰':'アオリ'}]\n[EMOTION: NORMAL]\n状況: 人物Aが道具を順番に置く\nA「${n}番目」`).join('\n')};
        // Only the reviewed exact camera clauses may move into scoped sharing.
        // Restore them on both sides; every other released prompt byte stays exact.
        assert.equal(beforeWardrobeChange(current.buildMangaPrompt(input)),
          beforeWardrobeChange(old.buildMangaPrompt(input)),JSON.stringify({providerFamily,colorMode,showWatermarks,scenarioModelLabel}));
      }
  } finally {await server.close();}
});
