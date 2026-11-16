import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('generated image actions expose the PNG and JSON save label without debug controls', async () => {
  const [source, workflow] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
  ]);
  const imageArea = source.slice(source.indexOf('alt="Generated Result"'));
  // QA and downloads must receive the actual generated artwork, including its
  // variable panel heights and designed title. Never split/rasterize it first.
  assert.doesNotMatch(workflow, /typesetFourPanelCandidate|four-panel-typesetter/);
  const downloadIndex = imageArea.indexOf('保存先を選んで保存（作品フォルダー・PNG＋JSON）');
  const backIndex = imageArea.indexOf('aria-label="STEPへ移動"');

  assert.ok(downloadIndex >= 0);
  assert.ok(backIndex > downloadIndex);
  assert.match(imageArea.slice(downloadIndex,backIndex),/作品フォルダーへPNGとJSONを一緒に保存/);
  assert.match(imageArea.slice(downloadIndex,backIndex),/ZIPを1件保存し、展開して保管/);
  assert.doesNotMatch(imageArea,/個別の保存先選択はPNGのみ/);
  assert.doesNotMatch(imageArea, /固定比率画像をダウンロード/);
  assert.doesNotMatch(imageArea, /加工前の元画像をダウンロード/);
  assert.doesNotMatch(imageArea, /表示中の画像をQA再検査/);
  assert.doesNotMatch(source, /AIで画像を再検査|existingImageReviewControl|reviewExisting:\s*true/);
  assert.doesNotMatch(imageArea, /検査のみ行います（画像再生成なし・解析API課金あり）/);
  assert.match(imageArea.slice(downloadIndex, backIndex), /isFourPanelPage && !hasFixedPageLayout && normalizeDisplayedPage/);
  assert.match(source, /inferImageQualityMode\(finalPrompt\) === 'four-panel'/);
  assert.match(source, /APIで新しい画像を生成する（STEP4）/);
  assert.doesNotMatch(source, /最終プロンプトから毎回、新規画像を生成します/);
  assert.match(workflow, /setImageQualityNeedsRepair\(false\)[\s\S]*const hasDefiniteFinalFailure/);
  assert.match(workflow, /qualityResult\.issues\.some\(issue => isMaterialImageQualityIssue\(issue, qualityResult\.evidenceContext\)\)/);
  assert.match(workflow, /setImageQualityNeedsRepair\(Boolean\(repairEnabled && hasDefiniteFinalFailure\)\)/);
  assert.match(workflow, /generationHistory\.find\(item => item\.img === generatedImage\)/);
  assert.match(workflow, /originalImage: retainedHistory\?\.originalImage/);
  assert.match(workflow, /pageLayout: retainedHistory\?\.pageLayout/);
  assert.match(workflow, /if \(originalCandidate\.pageLayout \|\| experimentalPrepared\)[\s\S]*setGenerationHistory/);
  assert.doesNotMatch(workflow, /removeImages:\s*candidateImages/);
  assert.match(workflow, /return addGenerationHistoryItem\(retained, acceptedHistoryItem, \{ removeImages: new Set\(\[acceptedImageStr\]\)/);
});
