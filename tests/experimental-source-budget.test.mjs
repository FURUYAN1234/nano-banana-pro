import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from 'vite';
import fs from 'node:fs/promises';
const server=await createServer({appType:'custom',logLevel:'silent',server:{middlewareMode:true}});
try {
 const m=await server.ssrLoadModule('/src/lib/experimental-manga.js');
 const {applyPageComposition}=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
 const fixture=JSON.parse(await fs.readFile(new URL('./fixtures/experimental-news-budget.json',import.meta.url),'utf8'));
 const input={...fixture,enabled:true,colorMode:'monochrome',providerFamily:'chatgpt',showWatermarks:true,mosaicCopyrightedCharacters:true,promptMaxChars:28880};
 const source=m.readExperimentalSource(input);
 const makePlan=()=>applyPageComposition({count:source.panels.length,layout:'free',reason:'元の演出を保持する回帰',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:p.text.match(/^状況:\s*(.+)$/m)[1],dialogueIds:p.dialogueIds,breakout:null}))},source);
 test('six mixed-media monochrome scenes preserve source acting within reference-reserved budget',async()=>{
  const plan=makePlan();let calls=0;
  const prepared=await m.prepareExperimentalManga(input,async()=>{calls++;return JSON.stringify(plan);});
  assert.equal(calls,1);assert.ok(prepared.prompt.length<=28880);
  for(const p of plan.panels){assert.ok(prepared.prompt.includes(p.camera));assert.ok(prepared.prompt.includes(p.action));}
  for(const d of source.dialogue)assert.ok(prepared.prompt.includes(JSON.stringify(d.text)));
  assert.deepEqual(prepared.plan.composition,source.composition);
  assert.match(prepared.prompt,/GEKIGA CAST CHECK/);assert.match(prepared.prompt,/PANEL EDGE CONTINUITY LOCK/);
 });
 test('rewritten planner staging fits without requiring exact source paragraph duplication',async()=>{
  const plan=makePlan();
  for(const p of plan.panels)p.action=p.action.replace('。','。'+p.camera);
  const authoredCompilerPhrase='Physical shots retain recognizable setting anchors and depth; scripted abstract beats may omit scenery, never story evidence. Simplify nonessential detail; keep focal actions and required reactions readable.';
  plan.panels[0].action+=authoredCompilerPhrase;
  const prepared=await m.prepareExperimentalManga(input,async()=>JSON.stringify(plan));
  assert.ok(prepared.prompt.length<=28880);
  for(const p of plan.panels){assert.ok(prepared.prompt.includes(p.camera));assert.ok(prepared.prompt.includes(p.action));}
  for(const original of source.panels)assert.ok(prepared.prompt.includes(original.text.match(/^状況:\s*(.+)$/m)[1]));
  for(const d of source.dialogue)assert.ok(prepared.prompt.includes(JSON.stringify(d.text)));
 });
 test('unshareable authored overflow still rejects without clipping or paid replanning',async()=>{
  const plan=makePlan();plan.panels[0].action+='独立した追加指定。'.repeat(4000);let calls=0;
  await assert.rejects(m.prepareExperimentalManga(input,async()=>{calls++;return JSON.stringify(plan);}),error=>{
   assert.equal(error.code,'IMAGE_PROMPT_BUDGET');assert.ok(error.diagnosticContext.finalPrompt.includes(plan.panels[0].action));
   assert.equal(error.diagnosticContext.scenario,input.scenario);return true;
  });
  assert.equal(calls,1);
 });
}finally{await server.close();}
