import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';
import * as openaiReferences from '../src/lib/openai-image-references.js';
import * as geminiReferences from '../src/lib/gemini-image-references.js';
import { applyOpenAIImageEngineWatermark } from '../src/lib/openai-image-settings.js';
import { assertImagePromptBudget } from '../src/lib/image-prompt-budget.js';
import { ensureWebPromptTrailingNewline, splitWebPromptForPaste } from '../src/lib/web-prompt-chunks.js';
import { buildWebGenerationMetadata } from '../src/lib/generated-image-metadata.js';
import { resolveFinalPromptReviewContract } from '../src/lib/final-prompt-review-contract.js';
import { setMangaBackgroundSimplification } from '../src/lib/render-options.js';

const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
let server, Step4Panel, experimental;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
  experimental = await server.ssrLoadModule('/src/lib/experimental-manga.js');
});
after(async () => { await server?.close(); });
const edited = '編集した全文。\n[API IMAGE REFERENCE ROLES]\nImage 1: 手で変更した参照指示。\n\n';

test('the sole final prompt field directly edits the full text, including reference instructions', () => {
  const html = renderToStaticMarkup(React.createElement(Step4Panel, {
    currentStep: 3, selectedEngine: 'openai', genLog: [], webCopyPartLengths: [],
    policyPromptHistory: [], policyErrorMsg: '', scenario: '', finalPrompt: edited,
    prepareWebCopyPrompt: text => text, setFinalPrompt: () => {},
  }));
  const field = html.match(/<textarea\b(?=[^>]*id="final-prompt-editor")([^>]*)>([\s\S]*?)<\/textarea>/);
  assert.ok(field);
  assert.doesNotMatch(field[1], /readonly/i);
  assert.equal(field[2], edited);
  assert.doesNotMatch(html, /prompt-body-editor|本文を編集/);
});

test('copy, every split, TXT and JSON preserve edited text without appending or trimming it', async () => {
  const body = source.split('const prepareWebCopyPrompt = ')[1].split('let webCopyPartLengths')[0].trim().replace(/;$/, '');
  const scope = { referenceEditorError: '', isExperimentalPage: () => false,
    inferImageQualityMode: () => 'single-image', assertRenderOptions: () => {},
    getCurrentPromptProviderFamily: () => 'chatgpt', PROMPT_PROVIDER_FAMILIES: {CHATGPT:'chatgpt'},
    ...openaiReferences, applyOpenAIImageEngineWatermark, ensureWebPromptTrailingNewline,
    openAIImageQuality:'max', images:[], bg360Enabled:false, bg360Image:null,
    referenceAssetsRef:{current:[]}, colorMode:'color', scenario:'', styleJson:null, punchlineType:'Auto',
    getBuiltinPanelMediumReference:()=>null,
  };
  const prepare = new Function(...Object.keys(scope), `return (${body})`)(...Object.values(scope));
  for (const text of [edited, edited.repeat(900), '', '末尾改行なし']) {
    assert.equal(prepare(text), text);
    assert.equal(splitWebPromptForPaste(prepare(text)).join(''), text);
    assert.equal(await new Blob([prepare(text)]).text(), text);
    const metadata = await buildWebGenerationMetadata({provider:'openai', finalPrompt:prepare(text)});
    assert.equal(metadata.prompt.final_sent_prompt, text);
  }
});

for (const isOpenAIEngine of [true, false]) {
 for (const simplified of [false, true]) {
  test(`${isOpenAIEngine ? 'OpenAI' : 'Gemini'} ordinary API transport preserves the final text and character references with background mode ${simplified ? 'ON' : 'OFF'}`, async () => {
    const start = source.indexOf('        progressPhase = repair ?');
    const end = source.indexOf('        const normalizedImage =', start);
    assert.ok(start > 0 && end > start);
    let sent, sentReferences;
    const finalText = setMangaBackgroundSimplification(edited, simplified);
    const characterSheet = 'data:image/png;base64,YQ==';
    const scope = {
      prompt:finalText, repair:false, repairSource:null, progressPhase:'', isOpenAIEngine,
      ...openaiReferences, ...geminiReferences, applyOpenAIImageEngineWatermark, assertImagePromptBudget,
      images:[characterSheet], referenceAssetsRef:{current:[]}, bg360Image:null, bg360Enabled:false, colorMode:'monochrome',
      generationScenario:'', styleJson:null, punchlineType:'Auto', getBuiltinPanelMediumReference:()=>null,
      statCallback:()=>{}, resolveOpenAIImageOption:()=>({label:'test'}), openAIImageQuality:'max', openAIImageSize:'auto',
      geminiReferenceImages:[], geminiImageOptions:{}, generationOptions:{},
      generateImageWithOpenAI:async (text, _progress, options) => { sent=text; sentReferences=options.imageInputs.map(item=>item.image_url); return {}; },
      generateImageWithImagen:async (text, _progress, references) => { sent=text; sentReferences=references; return {}; },
    };
    const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
    const metadataPrompt=await new AsyncFunction(...Object.keys(scope), source.slice(start,end)+'return metadataPrompt;')(...Object.values(scope));
    assert.equal(sent,finalText);
    assert.equal(metadataPrompt,finalText);
    assert.deepEqual(sentReferences,[characterSheet], 'background simplification must retain the original character-sheet bytes');
  });
 }
}

test('five-panel QA derives dialogue, cast and action from the edited final document', async () => {
  const scenario = Array.from({length:5},(_,i)=>`[${i+1}コマ目]\n[Camera: 上から強く俯瞰]\n[EMOTION: NORMAL]\n状況: ユウが青いカップを持つ。\nユウ「確認${i+1}」`).join('\n');
  const input = {enabled:true,scenarioMode:'experimental-manga',scenario,castList:'## ユウ',colorMode:'color',showWatermarks:false};
  const source = experimental.readExperimentalSource(input);
  const prepared = await experimental.prepareExperimentalManga(input, async()=>JSON.stringify({count:5,layout:'hero_bottom',reason:'最後の集合を広くする',panels:source.panels.map(p=>({sourcePanel:p.id,kind:'anchor',camera:p.camera,action:'ユウが青いカップを持つ。',dialogueIds:p.dialogueIds,breakout:null}))}));
  const original = resolveFinalPromptReviewContract(prepared, prepared.prompt);
  assert.deepEqual(original.plan.expectedDialogue.map(d=>d.text),source.dialogue.map(d=>d.text));
  const edited = prepared.prompt.replaceAll('青いカップ','赤いカップ').replace('確認1','一つずつ確かめよう');
  const review = resolveFinalPromptReviewContract(prepared, edited);
  assert.equal(review.plan.expectedDialogue[0].text,'一つずつ確かめよう');
  assert.match(review.plan.panels[0].action,/赤いカップ/);
  assert.deepEqual(review.plan.expectedCast[0].names,['ユウ']);
  const qa = experimental.buildExperimentalReviewPrompt(review.plan,review.source,{finalPrompt:edited});
  assert.doesNotMatch(qa,/青いカップ|一つずつ確かめよう|確認1/);
  assert.match(qa,/赤いカップ/);
  const lettering = edited.replace(/^Top title EXACTLY "(?:\\.|[^"\\])*"/m, 'Top title EXACTLY "編集した題字"')
    .replace('No watermark or footer text; leave footer blank.', 'FOOTER ONLY: Bottom-left EXACTLY "編集した左クレジット". Bottom-right EXACTLY "編集した右クレジット".');
  const letteringQa = experimental.buildExperimentalReviewPrompt(review.plan,review.source,{finalPrompt:lettering});
  assert.match(letteringQa,/Title required EXACTLY "編集した題字"\. Footer expected exact text: \{"left":"編集した左クレジット","right":"編集した右クレジット"\} \(null means no footer\)/);
  assert.match(qa,/Footer expected exact text: null \(null means no footer\)/);
  const inspectLettering = async prompt => experimental.reviewExperimentalImage({
    image:{mimeType:'image/png',base64Img:'fixture'},plan:review.plan,prompt,
  },async()=>({text:JSON.stringify({status:'unverified',evidence:[],issues:[],pageEvidence:'編集した題字\n編集した左クレジット\n編集した右クレジット'}),finishReason:'stop'}),{
    detect:async()=>experimental.experimentalLayout(5,review.plan.layout).map(r=>({bounds:[r.x,r.y,r.w,r.h]})),
    inspect:async()=>({width:2240,height:3168}),crop:async()=>({dataUrl:'fixture-crop'}),
  });
  assert.deepEqual((await inspectLettering(letteringQa)).review.expectedPageText,
    ['編集した題字','編集した左クレジット','編集した右クレジット']);
  const unknownQa=experimental.buildExperimentalReviewPrompt(review.plan,review.source,{finalPrompt:lettering.replace('Top title EXACTLY','Ambiguous title instruction')});
  assert.equal((await inspectLettering(unknownQa)).review.expectedPageText,null,'unreadable edits must not fall back to the old title');
  const backgroundQa = experimental.buildExperimentalReviewPrompt(review.plan,review.source,{finalPrompt:setMangaBackgroundSimplification(edited,true)});
  assert.match(backgroundQa,/BACKGROUND-ONLY MODE CHECK/);
  assert.doesNotMatch(qa,/BACKGROUND-ONLY MODE CHECK/);
  assert.equal(prepared.source.dialogue[0].text,'確認1','editing never mutates STEP2 history');
  assert.throws(()=>resolveFinalPromptReviewContract(prepared,'ユーザーが構造ごと置き換えた文章'),/未確認/);
});
