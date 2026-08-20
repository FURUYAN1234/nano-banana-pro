import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const workflowUrl = new URL(
  '../public/workflows/Super-FURU-AI-4-koma-System-4-Panel-Manga-to-Video.json',
  import.meta.url,
);

const hashText = (value) => createHash('sha256').update(value, 'utf8').digest('hex');

test('STEP4 exposes a separate ComfyUI workflow JSON download directly below the H3 copy action', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_WORKFLOW_FILENAME\}[\s\S]*role="button"[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.doesNotMatch(step4PanelSource, /const downloadComfyUIWorkflow = \(\) =>/);
  assert.doesNotMatch(step4PanelSource, /anchor\.click\(\)/);
  assert.match(step4PanelSource, /標準ワークフローを自分で使う場合/);
  assert.match(step4PanelSource, /画像変換から動画化まで全部お任せにする場合/);
  assert.match(step4PanelSource, /この操作ではワークフローJSONをダウンロードしません/);
  assert.match(step4PanelSource, /プロンプトのコピーボタンとは別の機能です/);
  assert.doesNotMatch(step4PanelSource, /backgroundColor: '#(?:86198f|334155)'/);
  assert.equal(
    [...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length,
    2,
    'the H3 prompt and workflow actions must use the same explicit visual style',
  );
  assert.match(step4PanelSource, /const H3_ACTION_BUTTON_STYLE = Object\.freeze\(\{[\s\S]*backgroundColor: '#f0f0f0'[\s\S]*color: '#000000'/);
  assert.match(step4PanelSource, /<section aria-labelledby="minimax-h3-prompt-heading">[\s\S]*MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*<\/section>[\s\S]*<section aria-labelledby="comfyui-workflow-heading">[\s\S]*ComfyUIワークフローJSONをダウンロード[\s\S]*<\/section>/);
  assert.match(step4PanelSource, /JSON自体はブラウザで構文・ノード構成・初期値を確認できます/);
  assert.match(step4PanelSource, /設定ファイルとは別/);
  assert.match(step4PanelSource, /MiniMax H3.*モデル/);
  assert.match(step4PanelSource, /NanoBananaH3Transform/);
  assert.match(step4PanelSource, /DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /APIキー.*含ま/);
  assert.match(step4PanelSource, /document\.execCommand\('copy'\)/);
  assert.match(step4PanelSource, /await copyTextToClipboard\(MINIMAX_H3_COMFYUI_PROMPT\)/);
});

test('H3 copy keeps the synchronous selection fallback inside the original click activation', () => {
  const legacyCopyIndex = step4PanelSource.indexOf("document.execCommand('copy')");
  const asyncClipboardIndex = step4PanelSource.indexOf('await navigator.clipboard.writeText(text)');

  assert.notEqual(legacyCopyIndex, -1);
  assert.notEqual(asyncClipboardIndex, -1);
  assert.ok(legacyCopyIndex < asyncClipboardIndex, 'legacy copy must run before the first await');
  assert.match(step4PanelSource, /textarea\.focus\(\)/);
  assert.match(step4PanelSource, /textarea\.setSelectionRange\(0, text\.length\)/);
});

test('distributed ComfyUI workflow is sanitized and keeps the original bilingual guidance', () => {
  assert.equal(existsSync(workflowUrl), true, 'ComfyUI workflow JSON must be distributed from public/workflows');
  if (!existsSync(workflowUrl)) return;

  const workflow = JSON.parse(readFileSync(workflowUrl, 'utf8'));
  const node = (id) => workflow.nodes.find((candidate) => candidate.id === id);

  assert.equal(node(138)?.widgets_values?.[0], '');
  assert.equal(node(139)?.widgets_values?.[0], '');
  assert.equal(node(137)?.widgets_values?.[0], 'Super_FURU_AI_4koma_public_sample.png');
  assert.equal(node(137)?.widgets_values?.[1], 'image');

  assert.equal(hashText(node(116)?.widgets_values?.[0] ?? ''), '74b072c7474db6775305c20eb01849908612b924c1ad144e847034776fd04582');
  assert.equal(hashText(node(117)?.widgets_values?.[0] ?? ''), '04062af471a7219ab444eae915be7227ee85d5d44870ec3932061d9a97ad64d0');

  const downloadNote = workflow.nodes.find((candidate) => candidate.type === 'MarkdownNote'
    && candidate.title === 'Download Workflow JSON / ワークフローJSONをダウンロード');
  assert.ok(downloadNote, 'workflow must include a download note beside NanoBananaH3Transform');
  assert.match(downloadNote.widgets_values[0], /raw\.githubusercontent\.com\/FURUYAN1234\/nano-banana-pro\/main\/public\/workflows\/Super-FURU-AI-4-koma-System-4-Panel-Manga-to-Video\.json/);
  assert.match(downloadNote.widgets_values[0], /API key/i);
  assert.match(downloadNote.widgets_values[0], /NanoBananaH3Transform/);
  assert.match(downloadNote.widgets_values[0], /DeterministicEndCreditOverlay/);
  assert.ok(Math.abs(downloadNote.pos[0] - node(141).pos[0]) <= 500);
  assert.ok(Math.abs(downloadNote.pos[1] - node(141).pos[1]) <= 700);
});
