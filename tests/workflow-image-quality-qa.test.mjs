import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { runImageQualityFailsafe } from '../src/lib/image-quality-failsafe.js';
import * as imageQualityQa from '../src/lib/image-quality-qa.js';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const step4Source = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('a malformed primary QA report stops supplementary paid audits and keeps the image', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const reviewCriticalCameraCandidate/)[1];
  for (const text of ['not JSON', '{"pass":true,"issues":[],"spatial_checks":{"$columns":["panel"],"$rows":[[]]}}']) {
    let requests = 0;
    const requestOptions = [];
    const context = {
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
    assert.equal(requests, 1);
    assert.deepEqual(requestOptions, [{ outputProfile: 'image-quality-review' }]);
    assert.equal(result.candidate, candidate);
    assert.equal(result.finalReview.requestFailed, true);
  }
});

test('the actual independent camera workflow sends only the contract panel without another generation', async () => {
  const callback = workflowSource.match(/const reviewCriticalCameraCandidate = ([\s\S]+?);\r?\n\r?\n      const retainedImage/)[1];
  const finalPrompt = "## Panel 3\nEXPLICIT REAR CAMERA: camera is physically behind [Observer]'s shoulder; rear head/shoulder foreground.";
  const context = { ...imageQualityQa, qualityMode: 'four-panel',
    extractMangaPanelCrops: async () => [1, 2, 3, 4].map(panel => `data:image/png;base64,crop${panel}`),
    callAI: async (prompt, images) => {
      assert.deepEqual(images.map(image => image.inlineData.data), ['crop3']);
      assert.match(prompt, /Image 1 = panel 3/);
      return { text: '{"pass":true,"checks":[]}' };
    }, statCallback: () => {} };
  const review = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
  const result = await review({ base64Img: 'page', mimeType: 'image/png' }, finalPrompt);
  assert.equal(result.pass, false, 'an unobserved short PASS cannot certify the image');
});

test('the actual workflow retains primary findings when a supplementary hand or bubble API request times out', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const reviewCriticalCameraCandidate/)[1];
  for (const missingHand of [true, false]) {
    let requests = 0;
    const primary = { pass: false, observations: { hands: 'Three visible hands on one actor' }, issues: [
      { type: 'anatomy', panel: 2, subject: 'actor', reason: 'Three visible hands attached to one actor' },
      ...(missingHand ? [{ type: 'unverified', panel: 2, subject: 'actor', reason: 'Missing or incomplete per-actor visible-hand inventory' }] : []),
    ] };
    const context = {
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
      buildActorHandAuditPrompt: () => 'hands', parseActorHandAuditResponse: () => [],
      buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: review => review,
    };
    const reviewCandidate = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const result = await runImageQualityFailsafe({
      originalCandidate: { base64Img: 'image', mimeType: 'image/png' }, originalPrompt: 'APPROVED',
      reviewCandidate, allowRepair: false,
      generateRepairCandidate: async () => assert.fail('review timeout cannot trigger another paid image'),
    });
    assert.equal(requests, missingHand ? 3 : 2);
    assert.equal(result.stopReason, 'repair_disabled');
    assert.equal(result.finalReview.pass, false);
    assert.ok(result.finalReview.issues.some(issue => issue.type === 'anatomy'));
    assert.equal(result.finalReview.observations.hands, primary.observations.hands);
  }
});

test('native monochrome chroma findings survive every QA outcome without authorizing a paid repair', async () => {
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const reviewCriticalCameraCandidate/)[1];
  const native = { status: 'detected', width: 100, height: 400, coloredPixels: 576, coloredFraction: 0.0144,
    maxChannelDifference: 20, region: { bounds: { x: 12, y: 20, width: 24, height: 24 }, coloredPixels: 576,
      coloredFraction: 1, sampleRgb: [202, 186, 182] } };
  for (const outcome of ['success', 'primary_failure', 'hand_failure', 'bubble_failure', 'native_failure']) {
    let inspected = 0, requests = 0;
    const progress = [];
    const context = {
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
        if ((outcome === 'primary_failure' && prompt === 'primary') || (outcome === 'hand_failure' && prompt === 'hands')
          || (outcome === 'bubble_failure' && prompt === 'bubbles')) throw new Error(`${outcome} timed out`);
        return { text: '{}' };
      },
      parseImageQualityQaResponse: () => ({ pass: outcome !== 'hand_failure', observations: { hands: 'observed hands' },
        issues: outcome === 'hand_failure' ? [{ type: 'unverified', panel: 2, reason: 'Missing or incomplete per-actor visible-hand inventory' }] : [] }),
      statCallback: () => {}, extractPanelCastContracts: () => [{ panel: 2, actors: ['actor'] }],
      buildActorHandAuditPrompt: () => 'hands', parseActorHandAuditResponse: () => [],
      buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: imageQualityQa.applyBubbleInventory,
    };
    const reviewCandidate = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const candidate = { base64Img: 'unchanged', mimeType: 'image/png' };
    const result = await runImageQualityFailsafe({ originalCandidate: candidate, originalPrompt: '', reviewCandidate, allowRepair: true,
      onProgress: value => progress.push(value), generateRepairCandidate: async () => assert.fail('native inspection cannot spend another image') });
    assert.equal(inspected, 1, outcome);
    assert.equal(requests, outcome === 'primary_failure' ? 1 : outcome === 'hand_failure' ? 3 : 2);
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
  const callback = workflowSource.match(/const reviewImageCandidate = ([\s\S]+?);\r?\n\r?\n      const reviewCriticalCameraCandidate/)[1];
  for (const [isOpenAIEngine, colorMode, qualityMode] of [[true, 'color', 'four-panel'], [false, 'monochrome', 'four-panel'],
    [false, 'color', 'four-panel'], [true, 'monochrome', 'single-image']]) {
    const context = { isOpenAIEngine, colorMode, qualityMode, scenario: '', castList: '', images: [],
      inspectNativeMonochromeChroma: () => assert.fail('non-target path must not inspect pixels'),
      inspectImageDimensions: async () => ({ width: 100, height: 400 }), getImageContentHash: async () => 'hash',
      extractMangaPanelCrops: async () => [], buildImageQualityQaImageParts: () => [], buildImageQualityQaPrompt: () => 'primary',
      callAI: async () => ({ text: '{}' }), parseImageQualityQaResponse: () => ({ pass: true, issues: [], observations: {} }),
      statCallback: () => {}, buildBubbleInventoryPrompt: () => 'bubbles', applyBubbleInventory: review => review };
    const review = new Function(...Object.keys(context), `let progressPhase; return (${callback});`)(...Object.values(context));
    const result = await review({ base64Img: 'unchanged' }, '');
    assert.equal(result.pass, true);
    assert.equal('nativeChroma' in result, false);
  }
});

test('image generation displays the received image before running one visible combined quality gate', () => {
  const renderIndex = workflowSource.indexOf('setGeneratedImage(finalImageStr)');
  const qaIndex = workflowSource.indexOf('const qualityOutcome = await runImageQualityFailsafe');

  assert.ok(renderIndex >= 0);
  assert.ok(qaIndex > renderIndex);
  assert.match(workflowSource, /buildImageQualityQaImageParts\(\{[\s\S]*candidate,[\s\S]*panelImages,[\s\S]*referenceImages:\s*images/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length/);
  assert.match(workflowSource, /panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /callAI\([\s\S]*qualityPrompt,[\s\S]*qualityImageParts/);
  assert.match(workflowSource, /\[QUALITY QA\].*キャラクターシート・人物・手・小物・吹き出し/);
  assert.match(workflowSource, /formatImageQualityIssue/);
  assert.match(workflowSource, /qualityOutcome\.validationWarning/);
  assert.match(workflowSource, /const qualityMode = inferImageQualityMode\(editablePrompt\)/);
  assert.match(workflowSource, /parseImageQualityQaResponse\(qualityResponse.text, \{[\s\S]*mode: qualityMode,[\s\S]*finalPrompt: candidatePrompt,[\s\S]*referenceImageCount:\s*images\.length/);
  assert.match(workflowSource, /buildImageQualityQaPrompt\(\{[\s\S]*scenario,[\s\S]*castList,[\s\S]*finalPrompt:\s*candidatePrompt,[\s\S]*mode:\s*qualityMode/);
  assert.match(workflowSource, /referenceImageCount:\s*images\.length,[\s\S]*panelCropCount:\s*panelImages\.length/);
  assert.match(workflowSource, /originalPrompt: currentPrompt,[\s\S]*mode: qualityMode,/);
});

test('best available fallback continues with a warning while explicit cancellation stops', () => {
  assert.match(workflowSource, /if \(!qualityOutcome.canContinue\) \{[\s\S]*?fullAutoAbortRef.current = true;[\s\S]*?return false;/);
  assert.match(workflowSource, /Best available image selected \(quality warning\)/);
  assert.doesNotMatch(workflowSource, /qualityOutcome.candidates.reduce/);
  assert.match(workflowSource, /addGenerationHistoryItem\(prev,[\s\S]*removeImages:\s*candidateImages/);
  assert.match(workflowSource, /analyzeFailure: async[\s\S]*buildImageFailureAnalysisPrompt/);
  assert.match(workflowSource, /shouldStop:.*qualityRetryAbortRef.current/);
  assert.match(workflowSource, /qualityOutcome\.history\?\.some\(entry => entry\.comparison\)/);
  assert.doesNotMatch(workflowSource, /qualityOutcome\.attempts > 1 \? '最良候補を採用'/);
});

test('retained-image retry is available without generating a fresh original image', () => {
  assert.match(workflowSource, /generationOptions\.reviewExisting[\s\S]*?generatedImage/);
  assert.match(workflowSource, /: await generateImageCandidate\(currentPrompt\)/);
  assert.match(step4Source, /generatedImage\s*&&[\s\S]*?regenerateImage\(false, null, \{ reviewExisting: true, reviewOnly: !allowImageQualityRepair \}\)/);
  assert.match(workflowSource, /const repairEnabled = allowImageQualityRepair && !generationOptions\.reviewOnly/);
  assert.match(workflowSource, /allowRepair: repairEnabled/);
});

test('missing per-actor hand evidence triggers per-panel crop-only audits without generating another image', () => {
  assert.match(workflowSource, /missingHandPanels\.size[\s\S]*?buildActorHandAuditPrompt\(\[contract\]\)[\s\S]*?parseActorHandAuditResponse\(audit\.text, \[contract\]\)/);
  assert.match(workflowSource, /const cropParts = buildImageQualityQaImageParts\(\{ candidate, panelImages \}\)\.slice\(1\)/);
  assert.match(workflowSource, /\[cropParts\[contract\.panel - 1\]\]/);
  assert.match(workflowSource, /\[手の独立監査 \/ \$\{contract\.panel\}コマ\]/);
});

test('OpenAI generation binds initial references and the actual repair source', () => {
  assert.match(workflowSource, /buildOpenAIReferencePlan\(\{[\s\S]*?characterImages:\s*images/);
  assert.match(workflowSource, /backgroundImage:\s*bg360Image/);
  assert.match(workflowSource, /backgroundEnabled:\s*bg360Enabled/);
  assert.match(workflowSource, /originalCandidate:\s*repairSource/);
  assert.match(workflowSource, /appendOpenAIReferencePrompt\(prompt, referencePlan\)/);
  assert.match(workflowSource, /imageInputs:\s*referencePlan\.imageInputs/);
  assert.match(workflowSource, /sourceCandidate = originalCandidate/);
  assert.match(workflowSource, /repairSource:\s*isOpenAIEngine\s*\?\s*sourceCandidate\s*:\s*null/);
  assert.match(workflowSource, /finalPrompt: originalPrompt, \.\.\.comparisonOptions/);
});
