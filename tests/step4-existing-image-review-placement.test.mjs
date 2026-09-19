import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('existing-image review is shown with the generated image actions below download', async () => {
  const [source, workflow] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
  ]);
  const imageArea = source.slice(source.indexOf('alt="Generated Result"'));
  const downloadIndex = imageArea.indexOf('元画像をダウンロード');
  const reviewIndex = imageArea.indexOf('表示中の画像をQA再検査（必要時のみ修正生成）');
  const backIndex = imageArea.indexOf('最初（STEP 1）に戻る');

  assert.ok(downloadIndex >= 0);
  assert.ok(reviewIndex > downloadIndex);
  assert.ok(backIndex > reviewIndex);
  assert.match(imageArea.slice(downloadIndex, backIndex), /allowImageQualityRepair && imageQualityNeedsRepair/);
  assert.match(imageArea.slice(downloadIndex, backIndex), /自動修正ONでQA不合格の画像です。再検査し、必要なら追加の画像APIを使用します/);
  assert.equal(source.slice(0, source.indexOf('alt="Generated Result"')).includes('表示中の画像をQA再検査（必要時のみ修正生成）'), false);
  assert.match(source, /APIで新しい画像を生成する（STEP4）[\s\S]*最終プロンプトから毎回、新規画像を生成します/);
  assert.match(workflow, /setImageQualityNeedsRepair\(false\)[\s\S]*const hasDefiniteFinalFailure/);
  assert.match(workflow, /issue\.type !== 'unverified'/);
  assert.match(workflow, /setImageQualityNeedsRepair\(Boolean\(allowImageQualityRepair && hasDefiniteFinalFailure\)\)/);
});
