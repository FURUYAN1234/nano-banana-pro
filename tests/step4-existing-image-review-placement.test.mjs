import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('generated image actions expose only the original download label and no debug controls', async () => {
  const [source, workflow] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
  ]);
  const imageArea = source.slice(source.indexOf('alt="Generated Result"'));
  // QA and downloads must receive the actual generated artwork, including its
  // variable panel heights and designed title. Never split/rasterize it first.
  assert.doesNotMatch(workflow, /typesetFourPanelCandidate|four-panel-typesetter/);
  const downloadIndex = imageArea.indexOf('元画像をダウンロード');
  const backIndex = imageArea.indexOf('最初（STEP 1）に戻る');

  assert.ok(downloadIndex >= 0);
  assert.ok(backIndex > downloadIndex);
  assert.doesNotMatch(imageArea, /固定比率画像をダウンロード/);
  assert.doesNotMatch(imageArea, /加工前の元画像をダウンロード/);
  assert.doesNotMatch(imageArea, /表示中の画像をQA再検査/);
  assert.match(imageArea.slice(downloadIndex, backIndex), /isFourPanelPage && !hasFixedPageLayout && normalizeDisplayedPage/);
  assert.match(source, /inferImageQualityMode\(finalPrompt\) === 'four-panel'/);
  assert.match(source, /APIで新しい画像を生成する（STEP4）[\s\S]*最終プロンプトから毎回、新規画像を生成します/);
  assert.match(workflow, /setImageQualityNeedsRepair\(false\)[\s\S]*const hasDefiniteFinalFailure/);
  assert.match(workflow, /issue\.type !== 'unverified'/);
  assert.match(workflow, /setImageQualityNeedsRepair\(Boolean\(allowImageQualityRepair && hasDefiniteFinalFailure\)\)/);
  assert.match(workflow, /generationHistory\.find\(item => item\.img === generatedImage\)/);
  assert.match(workflow, /originalImage: retainedHistory\?\.originalImage/);
  assert.match(workflow, /pageLayout: retainedHistory\?\.pageLayout/);
  assert.match(workflow, /if \(originalCandidate\.pageLayout\)[\s\S]*setGenerationHistory/);
  assert.match(workflow, /candidateImages = new Set[\s\S]*prev\.filter\(item => !candidateImages\.has\(item\.img\)\)/);
});
