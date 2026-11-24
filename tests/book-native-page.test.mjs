import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { createBookPageMode } from '../src/lib/page-production-contract.js';

const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
try {
  const native = await server.ssrLoadModule('/src/lib/experimental-manga.js');
  const {resolveBookPageNumber}=await server.ssrLoadModule('/src/lib/book-presentation.js');
  const { getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js');
  const { buildScenarioPayoffReviewPrompt } = await server.ssrLoadModule('/src/lib/scenario-payoff-quality.js');
  test('native review traces limb ownership and scene relationships even after a manual prompt edit', () => {
    const source = native.readExperimentalSource({
      scenario: '[1コマ目]\n[Camera: 広角で全身]\n[EMOTION: NORMAL]\n状況: 葵が箱の向こうを指す。\nセリフなし',
      scenarioMode: createBookPageMode(1), castList: '葵', colorMode: 'color',
    });
    const plan = native.validateExperimentalPlan({
      count: 1, layout: 'vertical_page', reason: '箱の向こうを指す',
      panels: [{sourcePanel: 1, kind: 'anchor', camera: source.panels[0].camera, action: '葵が箱の向こうを指す', dialogueIds: []}],
    }, source);
    const finalPrompt = native.buildExperimentalImagePrompt(plan, source);
    for (const options of [{}, {finalPrompt}]) {
      const prompt = native.buildExperimentalReviewPrompt(plan, source, options);
      assert.match(prompt, /shoulder.*elbow.*wrist.*hand/);
      assert.match(prompt, /pelvis.*hip.*knee.*ankle.*foot/);
      assert.match(prompt, /foreground.*middle ground.*background/);
      assert.match(prompt, /left and right sleeve length.*cuff position/);
      assert.match(prompt, /glasses.*hair accessories.*jewelry.*straps/);
      assert.match(prompt, /prop.*owner.*handed off/);
      assert.match(prompt, /inside.*in front of.*behind/);
      assert.match(prompt, /when adjacent panels are available/);
      assert.match(prompt, /foreshortening.*occlusion/);
    }
  });
  for (const count of [1, 2, 3]) test(`shared native ${count}-panel contract reaches layout, rendering and review without rewriting source`, () => {
    const mode = createBookPageMode(count);
    const scenario = Array.from({ length: count }, (_, i) => `[${i + 1}コマ目]\n[Camera: 強い右上方からの俯瞰、広角で全身を捉える]\n[EMOTION: NORMAL]\n状況: 葵が箱の蓋を持ち上げ中を確認する。\nセリフなし`).join('\n');
    const source = native.readExperimentalSource({ scenario, scenarioMode: mode, castList: '葵', colorMode: 'monochrome' });
    const plan = { count, layout: 'vertical_page', reason: '箱を開く動きが縦に続く', panels: source.panels.map(p => ({ sourcePanel: p.id, kind: 'anchor', camera: p.camera, action: '葵が箱を開く', dialogueIds: [] })) };
    assert.equal(native.validateExperimentalPlan(plan, source).count, count);
    const prompt = native.buildExperimentalImagePrompt(plan, source, { colorMode: 'monochrome', providerFamily: 'chatgpt' });
    assert.equal((prompt.match(/^\[PAGE FRAME /gm) || []).length, count);
    assert.equal(source.scenario, scenario);
    assert.match(prompt, /箱の蓋/);
    const presentation={presentation:{logoText:'本の表紙'.repeat(25),endingText:'おしまい'.repeat(25),endingOverlap:true},pageIndex:3,pageNumber:true,showTitle:true};
    const presented=native.buildExperimentalImagePrompt(plan,source,{colorMode:'monochrome',providerFamily:'chatgpt',bookPresentation:presentation,promptMaxChars:32000});
    assert.ok(presented.includes(JSON.stringify(presentation.presentation.endingText)),'full approved lettering remains');
    const bounded=native.buildExperimentalImagePrompt(plan,source,{colorMode:'monochrome',providerFamily:'chatgpt',bookPresentation:presentation,promptMaxChars:presented.length});
    assert.ok(bounded.length<=presented.length,'book presentation participates in the same budget');
    assert.throws(()=>native.buildExperimentalImagePrompt(plan,source,{colorMode:'monochrome',providerFamily:'chatgpt',bookPresentation:presentation,promptMaxChars:300}),/上限|文字|budget/i);
    const review = buildScenarioPayoffReviewPrompt({ scenario, scenarioMode: mode, punchlineType: 'Auto' });
    assert.equal(/(?:1〜0コマ|panel3_prediction: 0コマ目|^- 0コマ目)/m.test(review), false, 'review must not refer to nonexistent earlier panels');
    assert.match(review, /独立したオチ.*強制しない/);
    const generation = getScenarioPrompt({ scenarioMode: mode, inputMode: 'manual', manualTopic: '箱を開ける途中の場面', castList: '葵', punchlineType: 'Auto', customLocation: '', customOutfit: '', categories: [] });
    assert.match(generation, new RegExp(`全${count}コマ`));
    assert.doesNotMatch(generation, /4コマでは導入/);
    assert.throws(() => native.readExperimentalSource({ scenario, castList: '葵', colorMode: 'monochrome' }), /コマ/);
  });
  test('final-page-only normal footer pair coexists with independent centered body numbering in actual compiled prompts',()=>{
    const project={settings:{showWatermarks:false,pageNumber:false},pages:[{id:'cover',index:1,settings:{pageNumber:false}},...[1,2,3].map(n=>({id:'body'+n,index:n+1,settings:{pageNumber:true,...(n===3?{showWatermarks:true}:{showWatermarks:false})}}))]};
    for(const count of [1,2,3]){
      const page=project.pages[count],settings={...project.settings,...page.settings};
      const scenario=Array.from({length:count},(_,i)=>`[${i+1}コマ目]\n[Camera: 右上方から俯瞰、広角で全身]\n[EMOTION: NORMAL]\n状況: 葵が箱を運ぶ。\nセリフなし`).join('\n');
      const source=native.readExperimentalSource({scenario,scenarioMode:createBookPageMode(count,{finalPage:count===3}),castList:'葵',colorMode:'color'});
      const plan=native.validateExperimentalPlan({count,layout:'vertical_page',reason:'運ぶ動き',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'葵が箱を運ぶ。',dialogueIds:[]}))},source);
      const prompt=native.buildExperimentalImagePrompt(plan,source,{colorMode:'color',providerFamily:'chatgpt',showTitle:false,showWatermarks:settings.showWatermarks,imageEngineLabel:'ChatGPT Images 2.6 Sunburst',scenarioModelLabel:'GPT-6 Luna',bookPresentation:{presentation:{},pageIndex:page.index,pageNumber:settings.pageNumber,displayPageNumber:resolveBookPageNumber(project,page.id),showTitle:false}});
      assert.match(prompt,new RegExp(`page number ${count} discreetly at bottom center`));assert.match(prompt,/separated from any existing left\/right footer marks without replacing either/);
      const review=native.buildExperimentalReviewPrompt(plan,source,{finalPrompt:prompt});
      const footer=JSON.parse(review.match(/Footer expected exact text: (null|\{[^\n]*?\}) \(null means no footer\)/)?.[1]);
      if(count<3)assert.equal(footer,null);else{assert.deepEqual(Object.keys(footer).sort(),['left','right']);for(const text of Object.values(footer)){assert.ok(text.length>0);assert.ok(prompt.includes(JSON.stringify(text)));}}
      assert.ok(prompt.length<=32000);
      console.log('[book-footer-contract]',JSON.stringify({bodyPage:count,showWatermarks:settings.showWatermarks,pageNumber:resolveBookPageNumber(project,page.id),promptCharacters:prompt.length,footer}));
    }
    assert.equal(resolveBookPageNumber(project,'cover'),null);assert.equal(project.settings.showWatermarks,false);
  });
} finally { await server.close(); }
