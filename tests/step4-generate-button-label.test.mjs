import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('STEP4 generation button keeps model and quality details in the settings button only', () => {
  assert.match(
    step4PanelSource,
    /isGeneratingImage \? "画像を生成中\.\.\." : "APIで画像をアプリ内で生成する（STEP4）"/,
  );
  assert.doesNotMatch(step4PanelSource, /画像を生成する \(STEP 4[:）]/);
});

test('STEP4 omits the API-only reference supplement implementation note', () => {
  assert.doesNotMatch(
    step4PanelSource,
    /API生成時は、添付する参照画像の用途を示す補足を本文の後ろに追加します。入力した本文やコピー内容は書き換えません。/,
  );
});

test('editable-prompt guidance sits between the thinking log and prompt editor', () => {
  const thinkingLogIndex = step4PanelSource.indexOf('<ThinkingLog thought={assembleThought}');
  const guidanceIndex = step4PanelSource.indexOf('この欄で直接編集できます。編集した内容が、プロンプトのコピーと画像生成の両方に使われます。');
  const promptEditorIndex = step4PanelSource.indexOf('<textarea\n                id="final-prompt-editor"');

  assert.ok(thinkingLogIndex >= 0);
  assert.ok(guidanceIndex > thinkingLogIndex);
  assert.ok(promptEditorIndex > guidanceIndex);
});

test('final prompt heading keeps edit guidance out of the title', () => {
  assert.match(step4PanelSource, />\s*最終プロンプト\s*<\/label>/);
  assert.doesNotMatch(step4PanelSource, /最終プロンプト（直接編集できます）/);
  assert.match(step4PanelSource, />DYNAMIC ENGINE V1\.2\.3<\/span>/);
});
