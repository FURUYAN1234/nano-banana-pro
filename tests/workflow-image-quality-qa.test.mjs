import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runPageImageQuality } from '../src/lib/image-quality-failsafe.js';
import {addGenerationHistoryItem} from '../src/lib/generation-history.js';
import * as imageQualityQa from '../src/lib/image-quality-qa.js';

const runImageQualityFailsafe = options => runPageImageQuality({kind:'four-panel',count:4},{...options,mode:'four-panel'});
const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const step4Source = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

// These fixtures isolate supplementary audits; format recovery is exercised below with the real helper.
const primaryQaFixture = parse => async ({ prompt, images, request, onProgress, options }) => {
  const response = await request(prompt, images, null, onProgress, { outputProfile: 'image-quality-review' });
  return { response, review: parse(response.text, options) };
};

test('unverified quality logging states that judging is incomplete and retains the actual observation', () => {
  const block = workflowSource.match(/const qualityReviewUnverified = ([\s\S]+?)\r?\n      if \(qualityOutcome.repairReview/)[0]
    .replace(/\r?\n      if \(qualityOutcome.repairReview$/, '');
  const qualityOutcome = { originalReview: { pass: false, issues: [{ type: 'unverified', panel: 2,
    subject: 'art_style', reason: 'Actor at left retains a flat anime face; ink evidence is unresolved.' }] } };
  let log = ['earlier generation'];
  new Function('qualityOutcome', 'setGenLog', 'formatImageQualityIssue', block)(
    qualityOutcome, callback => { log = callback(log); }, imageQualityQa.formatImageQualityIssue);
  assert.match(log.join('\n'), /未完了/);
  assert.match(log.join('\n'), /合格を確認できません/);
  assert.doesNotMatch(log.join('\n'), /具体的な問題は検出されていません|異常なし|PASS/);
  assert.ok(log.some(line => line.includes(qualityOutcome.originalReview.issues[0].reason)));
  assert.equal(log[0], 'earlier generation');
});

test('a malformed primary QA report stops supplementary paid audits and keeps the image', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  for (const text of ['not JSON', '{"pass":true,"issues":[],"spatial_checks":{"$columns":["panel"],"$rows":[[]]}}']) {
    let requests = 0;
    const requestOptions = [];
    const context = { experimentalPrepared:null, generationScenario:"", extractBubbleContracts: imageQualityQa.extractBubbleContracts,
      ...imageQualityQa, qualityMode: 'four-panel', scenario: '', castList: '', images: [], isOpenAIEngine: true, colorMode: 'color',
      inspectImageDimensions: async () => ({ width: 100, height: 400 }), getImageContentHash: async () => 'hash',
      extractMangaPanelCrops: async () => ['one', 'two', 'three', 'four'],
      buildImageQualityQaImageParts: () => [], buildImageQualityQaPrompt: () => 'primary',
      callAI: async (_prompt, _images, _system, _log, options) => {
        requests++; requestOptions.push(options);
        return { text };
      }, statCallback: () => {},
    };
    const reviewCandidate = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const candidate = { base64Img: 'image', mimeType: 'image/png' };
    const originalPrompt = "## Panel 3\nEXPLICIT REAR CAMERA: camera is physically behind [Observer]'s shoulder; rear head/shoulder foreground.";
    assert.equal(imageQualityQa.hasCriticalRearCameraContract(originalPrompt), true);
    const result = await runImageQualityFailsafe({ originalCandidate: candidate, originalPrompt, reviewCandidate,
      allowRepair: true, reviewCriticalCamera: async () => assert.fail('failed primary cannot spend camera audit'),
      generateRepairCandidate: async () => assert.fail('malformed evidence cannot spend an image') });
    assert.equal(requests, 1, 'malformed review cannot trigger a second paid inspection');
    assert.ok(requestOptions.every(options => options.outputProfile === 'image-quality-review'));
    assert.equal(result.candidate, candidate);
    assert.equal(result.finalReview.requestFailed, true);
  }
});

test('the actual workflow rejects a second review request at the API boundary', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  let calls=0;
  const context={experimentalPrepared:null,qualityMode:'single-image',generationScenario:'',castList:'',images:[],
    isOpenAIEngine:true,colorMode:'color',inspectImageDimensions:async()=>({width:100,height:100}),getImageContentHash:async()=> 'hash',
    buildImageQualityQaImageParts:()=>[],buildImageQualityQaPrompt:()=> 'quality',statCallback:()=>{},
    callAI:async()=>{calls++;return {text:'{}'};},requestImageQualityQa:async({request})=>{
      await request('first',[]);await request('forbidden second',[]);throw Error('unreachable');
    }};
  const reviewCandidate=new Function(...Object.keys(context),'let progressPhase; return ('+callback+');')(...Object.values(context));
  const result=await reviewCandidate({base64Img:'same',mimeType:'image/png'},'approved');
  assert.equal(calls,1);assert.equal(result.requestFailed,true);assert.match(result.issues[0].reason,/1回まで/);
});

test('the actual workflow retains primary findings without supplementary hand or bubble requests', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  for (const missingHand of [true, false]) {
    let requests = 0;
    const primary = { pass: false, observations: { hands: 'Three visible hands on one actor' }, issues: [
      { type: 'anatomy', panel: 2, subject: 'actor', reason: 'Three visible hands attached to one actor' },
      ...(missingHand ? [{ type: 'unverified', panel: 2, subject: 'actor', reason: 'Missing or incomplete per-actor visible-hand inventory' }] : []),
    ] };
    const context = { experimentalPrepared:null, generationScenario:"", extractBubbleContracts: imageQualityQa.extractBubbleContracts,
      qualityMode: 'four-panel', scenario: '', castList: '', images: [], isOpenAIEngine: true, colorMode: 'color',
      inspectImageDimensions: async () => ({ width: 100, height: 400 }), getImageContentHash: async () => 'hash',
      extractMangaPanelCrops: async () => ['one', 'two', 'three', 'four'],
      buildImageQualityQaImageParts: () => [0, 1, 2, 3, 4], buildImageQualityQaPrompt: () => 'primary',
      callAI: async () => {
        if (++requests === 1) return { text: 'primary report' };
        throw new Error('This supplementary API request timed out.');
      },
      parseImageQualityQaResponse: () => primary, statCallback: () => {},
      extractPanelCastContracts: () => [{ panel: 2, actors: ['actor'] }],
      requestActorHandAudit: async ({ request }) => ({ response: await request('hands', [], null, () => {}), issues: [] }),
      buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: review => review,
    };
    context.requestImageQualityQa = primaryQaFixture(context.parseImageQualityQaResponse);
    const reviewCandidate = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const result = await runImageQualityFailsafe({
      originalCandidate: { base64Img: 'image', mimeType: 'image/png' }, originalPrompt: 'APPROVED',
      reviewCandidate, allowRepair: false, reviewOnly:true,
      generateRepairCandidate: async () => assert.fail('review timeout cannot trigger another paid image'),
    });
    assert.equal(requests,1);
    assert.equal(result.validationWarning,true);
    assert.equal(result.finalReview.pass, false);
    assert.ok(result.finalReview.issues.some(issue => issue.type === 'anatomy'));
    assert.equal(result.finalReview.observations.hands, primary.observations.hands);
  }
});

test('native monochrome chroma findings survive every QA outcome without authorizing a paid repair', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  const native = { status: 'detected', width: 100, height: 400, coloredPixels: 576, coloredFraction: 0.0144,
    maxChannelDifference: 20, region: { bounds: { x: 12, y: 20, width: 24, height: 24 }, coloredPixels: 576,
      coloredFraction: 1, sampleRgb: [202, 186, 182] } };
  for (const outcome of ['success', 'primary_failure', 'native_failure']) {
    let inspected = 0, requests = 0;
    const progress = [];
    const context = { experimentalPrepared:null, generationScenario:"", extractBubbleContracts: imageQualityQa.extractBubbleContracts,
      qualityMode: 'four-panel', scenario: '', castList: '', images: [], isOpenAIEngine: true, colorMode: 'monochrome',
      inspectImageDimensions: async () => ({ width: 100, height: 400 }), getImageContentHash: async () => 'native-source-hash',
      inspectNativeMonochromeChroma: async value => {
        inspected++; assert.equal(value, 'data:image/png;base64,unchanged');
        if (outcome === 'native_failure') throw new Error('Canvas unavailable');
        return native;
      },
      extractMangaPanelCrops: async () => ['one', 'two', 'three', 'four'],
      buildImageQualityQaImageParts: () => [0, 1, 2, 3, 4], buildImageQualityQaPrompt: () => 'primary',
      callAI: async prompt => {
        requests++;
        if ((outcome === 'primary_failure' && prompt.startsWith('primary')) || (outcome === 'hand_failure' && prompt === 'hands')
          || (outcome === 'bubble_failure' && prompt === 'bubbles')) throw new Error(`${outcome} timed out`);
        return { text: '{}' };
      },
      parseImageQualityQaResponse: () => ({ pass: outcome !== 'hand_failure', observations: { hands: 'observed hands' },
        issues: outcome === 'hand_failure' ? [{ type: 'unverified', panel: 2, reason: 'Missing or incomplete per-actor visible-hand inventory' }] : [] }),
      statCallback: () => {}, extractPanelCastContracts: () => [{ panel: 2, actors: ['actor'] }],
      requestActorHandAudit: async ({ request }) => ({ response: await request('hands', [], null, () => {}), issues: [] }),
      buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: imageQualityQa.applyBubbleInventory,
    };
    context.requestImageQualityQa = primaryQaFixture(context.parseImageQualityQaResponse);
    const reviewCandidate = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const candidate = { base64Img: 'unchanged', mimeType: 'image/png' };
    const result = await runImageQualityFailsafe({ originalCandidate: candidate, originalPrompt: '', reviewCandidate, allowRepair: true,
      onProgress: value => progress.push(value), generateRepairCandidate: async () => assert.fail('native inspection cannot spend another image') });
    assert.equal(inspected, 1, outcome);
    assert.equal(requests,1);
    assert.equal(result.candidate, candidate);
    assert.equal(result.attempts, 1);
    assert.equal(result.finalReview.pass, false);
    assert.ok(result.finalReview.issues.some(issue => issue.type === 'unverified' && issue.subject === 'monochrome_native_chroma'));
    assert.equal(result.finalReview.nativeChroma.status, outcome === 'native_failure' ? 'unverified' : 'detected');
    if (outcome !== 'native_failure') {
      assert.equal(result.finalReview.nativeChroma.sourceHash, 'native-source-hash');
      assert.deepEqual(result.finalReview.nativeChroma.region, native.region);
      assert.ok(progress.some(value => /色残り/.test(value)), 'local detection must be explicitly reported');
      assert.ok(progress.every(value => !/明確な欠陥がない|根拠不足のみ/.test(value)), 'detected color is not lack of evidence');
    }
  }
});

test('native chroma inspection is never invoked for color, Gemini or single-image workflows', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  for (const [isOpenAIEngine, colorMode, qualityMode] of [[true, 'color', 'four-panel'], [false, 'monochrome', 'four-panel'],
    [false, 'color', 'four-panel'], [true, 'monochrome', 'single-image']]) {
    const context = { experimentalPrepared:null, generationScenario:"", extractBubbleContracts: imageQualityQa.extractBubbleContracts, isOpenAIEngine, colorMode, qualityMode, scenario: '', castList: '', images: [],
      inspectNativeMonochromeChroma: () => assert.fail('non-target path must not inspect pixels'),
      inspectImageDimensions: async () => ({ width: 100, height: 400 }), getImageContentHash: async () => 'hash',
      extractMangaPanelCrops: async () => [], buildImageQualityQaImageParts: () => [], buildImageQualityQaPrompt: () => 'primary',
      callAI: async () => ({ text: '{}' }), parseImageQualityQaResponse: () => ({ pass: true, issues: [], observations: {} }),
      statCallback: () => {}, buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: review => review };
    context.requestImageQualityQa = primaryQaFixture(context.parseImageQualityQaResponse);
    const review = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const result = await review({ base64Img: 'unchanged' }, '');
    assert.equal(result.pass, true);
    assert.equal('nativeChroma' in result, false);
  }
});

test('image generation displays the received image before running one visible combined quality gate', () => {
  const renderIndex = workflowSource.indexOf('setGeneratedImage(finalImageStr)');
  const qaIndex = workflowSource.indexOf('qualityOutcome = await runPageImageQuality');
  assert.match(workflowSource, /runPageImageQuality\(pageContract,/);

  assert.ok(renderIndex >= 0);
  assert.ok(qaIndex > renderIndex);
  assert.match(workflowSource, /buildImageQualityQaImageParts\(\{[\s\S]*candidate,[\s\S]*panelImages,[\s\S]*referenceImages:\s*images/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length/);
  assert.match(workflowSource, /panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /requestImageQualityQa\(\{\s*prompt: qualityPrompt, images: qualityImageParts, request: reviewRequest,/);
  assert.match(workflowSource, /総合検査1回/);
  assert.match(workflowSource, /formatImageQualityIssue/);
  assert.match(workflowSource, /qualityOutcome\.validationWarning/);
  assert.match(workflowSource, /const qualityMode=pageContract.kind/);
  assert.match(workflowSource, /requestImageQualityQa\(\{[\s\S]*options: \{\s*mode: qualityMode, finalPrompt: candidatePrompt, referenceImageCount: images\.length/);
  assert.match(workflowSource, /buildImageQualityQaPrompt\(\{[\s\S]*scenario:generationScenario,[\s\S]*castList,[\s\S]*finalPrompt:\s*candidatePrompt,[\s\S]*mode:\s*qualityMode/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length,[\s\S]*panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /originalPrompt: currentPrompt,[\s\S]*mode: qualityMode,/);
});

test('best available fallback continues with a warning while explicit cancellation stops', () => {
  assert.match(workflowSource, /if \(!qualityOutcome.canContinue\) \{[\s\S]*?fullAutoAbortRef.current = true;[\s\S]*?return false;/);
  assert.match(workflowSource, /Best available image selected \(quality warning\)/);
  assert.doesNotMatch(workflowSource, /qualityOutcome.candidates.reduce/);

  assert.doesNotMatch(workflowSource, /analyzeFailure:|reviewCriticalCamera:|compareCandidates:/);
  assert.match(workflowSource, /shouldStop:.*qualityRetryAbortRef.current/);

  assert.doesNotMatch(workflowSource, /qualityOutcome\.attempts > 1 \? '最良候補を採用'/);
});

test('internal retained-image review remains available without a user-facing recheck action', () => {
  assert.match(workflowSource, /generationOptions\.reviewExisting[\s\S]*?generatedImage/);
  assert.match(workflowSource, /: await generateImageCandidate\(currentPrompt\)/);
  assert.doesNotMatch(step4Source, /reviewExisting:\s*true|AIで画像を再検査/);
  assert.match(workflowSource, /const repairEnabled = allowImageQualityRepair && !generationOptions\.reviewOnly/);
  assert.match(workflowSource, /allowRepair: repairEnabled/);
});

test('missing actor evidence remains unresolved without a separate paid audit', () => {
  assert.doesNotMatch(workflowSource,/requestActorHandAudit\(|reviewCriticalCameraCandidate/);
  assert.match(workflowSource,/applyBubbleInventory\(review, qualityResponse.text, candidatePrompt\)/);
});

test('OpenAI generation binds initial references and the actual repair source', () => {
  assert.match(workflowSource, /buildOpenAIReferencePlan\(\{[\s\S]*?characterImages:\s*images/);
  assert.match(workflowSource, /backgroundImage:\s*bg360Image/);
  assert.match(workflowSource, /backgroundEnabled:\s*bg360Enabled/);
  assert.match(workflowSource, /originalCandidate:\s*repairSource/);
  assert.match(workflowSource, /appendOpenAIReferencePrompt\(applyOpenAIImageEngineWatermark\(prompt, openAIImageQuality\), referencePlan\)/);
  assert.match(workflowSource, /imageInputs:\s*referencePlan\.imageInputs/);
  assert.match(workflowSource, /sourceCandidate = originalCandidate/);
  assert.match(workflowSource, /repairSource:\s*isOpenAIEngine\s*\?\s*sourceCandidate\s*:\s*null/);

});

test('adopting one automatic repair preserves the actual original image and its metadata',()=>{
  const section=workflowSource.slice(workflowSource.indexOf('const acceptedHistoryItem ='));
  const body=section.match(/setGenerationHistory\(prev => \{([\s\S]*?)\r?\n      \}\);/)[1];
  const originalCandidate={base64Img:'original',mimeType:'image/png',metadataContext:{source:'original'},modelId:'source-model'};
  const acceptedHistoryItem={id:20,img:'data:image/png;base64,fixed',metadataContext:{source:'fixed'},selected:true};
  const context={originalCandidate,acceptedHistoryItem,acceptedImageStr:acceptedHistoryItem.img,finalImageStr:'data:image/png;base64,original',
    timestamp:20,experimentalPrepared:null,qualityOutcome:{candidate:{base64Img:'fixed'},originalReview:{pass:false}},addGenerationHistoryItem};
  const update=new Function(...Object.keys(context),'return prev=>{'+body+'};')(...Object.values(context));
  const history=update([{id:1,img:'older-user-image'},{id:19,img:context.finalImageStr}]);
  assert.equal(history.filter(item=>item.img===context.finalImageStr).length,1);
  assert.equal(history.filter(item=>item.img===acceptedHistoryItem.img).length,1);
  assert.ok(history.some(item=>item.img==='older-user-image'));
  assert.deepEqual(history.find(item=>item.img===context.finalImageStr).metadataContext,{source:'original'});
});

test('provider rejection stops the normal generation action without an automatic prompt retry',async()=>{
  const callback=workflowSource.match(/const regenerateImage = ([\s\S]+?);\r?\n\r?\n  \/\//)[1];
  let generated=0;
  const context={setPolicyPromptHistory:()=>{},generateImageOnce:async()=>{generated++;return false;},
    runPolicyAutoRetries:()=>assert.fail('a rejected generation cannot start a hidden paid loop')};
  const generate=new Function(...Object.keys(context),'return ('+callback+');')(...Object.values(context));
  assert.equal(await generate(),false);assert.equal(generated,1);
});
