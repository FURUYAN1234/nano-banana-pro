import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workflowSource = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const step4Source = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('automatic final-image saving defaults on, survives partial reset, and returns on full settings reset', () => {
  assert.match(workflowSource, /const \[autoSaveGeneratedImage, setAutoSaveGeneratedImage\] = useState\(true\)/);

  const partialReset = workflowSource.slice(workflowSource.indexOf('const partialReset'), workflowSource.indexOf('const step1Reset'));
  assert.doesNotMatch(partialReset, /setAutoSaveGeneratedImage/);

  const hardReset = workflowSource.slice(workflowSource.indexOf('const hardReset'), workflowSource.indexOf('const [isCopied'));
  assert.match(hardReset, /setAutoSaveGeneratedImage\(true\)/);
});

test('history and automatic saving use only the quality-selected final API image', () => {
  const qualityOutcomeIndex = workflowSource.indexOf('const qualityOutcome = await runImageQualityFailsafe');
  const firstHistoryIndex = workflowSource.indexOf('setGenerationHistory(prev => addGenerationHistoryItem');
  const autoSaveIndex = workflowSource.indexOf('if (autoSaveGeneratedImage)');

  assert.ok(qualityOutcomeIndex >= 0);
  assert.ok(firstHistoryIndex > qualityOutcomeIndex);
  assert.ok(autoSaveIndex > firstHistoryIndex);
  assert.match(workflowSource, /const acceptedImageStr = `data:\$\{generatedMimeType\};base64,\$\{qualityOutcome\.candidate\.base64Img\}`/);
  assert.match(workflowSource, /writeImageDataUrlToDirectory\(\{/);
  assert.match(workflowSource, /\[SAVE\] 完成画像を自動保存しました:/);
});

test('automatic saving obtains a writable directory before manual or full-auto STEP4 API requests and clears it only on full reset', () => {
  const fullAutoToggle = workflowSource.slice(workflowSource.indexOf('const handleFullAutoToggle'), workflowSource.indexOf('// フルオート中断'));
  const hardReset = workflowSource.slice(workflowSource.indexOf('const hardReset'), workflowSource.indexOf('const [isCopied'));

  assert.match(workflowSource, /const prepareAutoSaveDirectory = async \(\) =>/);
  assert.match(workflowSource, /window\.showDirectoryPicker\(\{ mode: 'readwrite' \}\)/);
  assert.match(workflowSource, /autoSaveDirectoryRef\.current = directoryHandle/);
  assert.match(fullAutoToggle, /await prepareAutoSaveDirectory\(\)/);
  assert.match(hardReset, /autoSaveDirectoryRef\.current = null/);
});

test('STEP4 exposes the persistent automatic-save switch directly below the API image generate button', () => {
  assert.match(appSource, /autoSaveGeneratedImage=\{autoSaveGeneratedImage\}/);
  assert.match(appSource, /setAutoSaveGeneratedImage=\{setAutoSaveGeneratedImage\}/);
  assert.match(step4Source, /完成画像を自動保存（API生成のみ）/);
  assert.match(step4Source, /checked=\{autoSaveGeneratedImage\}/);
  assert.match(step4Source, /Downloads直下は選べないため専用サブフォルダーを指定/);
});
