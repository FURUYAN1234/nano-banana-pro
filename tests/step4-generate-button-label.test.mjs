import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('STEP4 generation button shows the selected model official API prices inside the button', () => {
  assert.match(
    step4PanelSource,
    /isGeneratingImage \? "画像を生成中\.\.\." : "APIで新しい画像を生成する（STEP4）"/,
  );
  assert.match(step4PanelSource, /formatOpenAIImagePricingSummary\(openAIImageQuality\)/);
  assert.match(step4PanelSource, /OPENAI_IMAGE_PRICE_SNAPSHOT_DATE/);
  assert.match(step4PanelSource, /OpenAI公式料金/);
  assert.doesNotMatch(step4PanelSource, /最終プロンプトから毎回、新規画像を生成します/);
  assert.doesNotMatch(step4PanelSource, /画像を生成する \(STEP 4[:）]/);
});

test('STEP4 generation button is visibly separated from the settings-file save button', () => {
  assert.match(
    step4PanelSource,
    /<div className="relative" style=\{\{ paddingTop: '12px' \}\}>[\s\S]*?APIで新しい画像を生成する（STEP4）/,
  );
});

test('quality retry stop control appears only while automatic repair is enabled and generation is active', () => {
  assert.match(
    step4PanelSource,
    /\{isGeneratingImage && allowImageQualityRepair && \([\s\S]*?<button[\s\S]*?type="button"[\s\S]*?onClick=\{stopQualityRetries\}/,
  );
  assert.match(step4PanelSource, /自動修正を停止（現在の応答後）/);
  assert.doesNotMatch(step4PanelSource, /現在のAPI応答後、追加画像を生成しません/);
  assert.match(step4PanelSource, /inline-flex min-h-10 items-center rounded-lg border border-amber-400\/50/);
  assert.doesNotMatch(step4PanelSource, /stopQualityRetries[\s\S]{0,500}w-full/);
  assert.doesNotMatch(step4PanelSource, /stopQualityRetries\} className="[^"]*underline/);
});

test('STEP4 omits the API-only reference supplement implementation note', () => {
  assert.doesNotMatch(
    step4PanelSource,
    /API生成時は、添付する参照画像の用途を示す補足を本文の後ろに追加します。入力した本文やコピー内容は書き換えません。/,
  );
});

test('editable-prompt guidance leads into the prompt editor after STEP3 owns the thinking log', () => {
  const guidanceIndex = step4PanelSource.indexOf('この欄で直接編集できます。編集した内容が、プロンプトのコピーと画像生成の両方に使われます。');
  const promptEditorIndex = step4PanelSource.search(/<textarea\r?\n\s+id="final-prompt-editor"/);

  assert.doesNotMatch(step4PanelSource, /<ThinkingLog thought=\{assembleThought\}/);
  assert.ok(guidanceIndex >= 0);
  assert.ok(promptEditorIndex > guidanceIndex);
});

test('final prompt heading keeps edit guidance out of the title', () => {
  assert.match(step4PanelSource, />\s*最終プロンプト\s*<\/label>/);
  assert.doesNotMatch(step4PanelSource, /最終プロンプト（直接編集できます）/);
  assert.match(step4PanelSource, />DYNAMIC ENGINE V1\.2\.3<\/span>/);
});
