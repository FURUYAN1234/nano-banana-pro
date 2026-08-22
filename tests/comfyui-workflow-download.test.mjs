import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const workflowUrl = new URL(
  '../public/workflows/Super-FURU-AI-4-koma-System-4-Panel-Manga-to-Video.json',
  import.meta.url,
);
const customNodeZipUrl = new URL('../public/downloads/ComfyUI-NanoBanana-H3.zip', import.meta.url);

const hashText = (value) => createHash('sha256').update(value, 'utf8').digest('hex');
const hashBytes = (value) => createHash('sha256').update(value).digest('hex');

const readZipFiles = (url) => {
  const archive = readFileSync(url);
  const endSignature = 0x06054b50;
  let endOffset = archive.length - 22;
  while (endOffset >= 0 && archive.readUInt32LE(endOffset) !== endSignature) endOffset -= 1;
  assert.ok(endOffset >= 0, 'ZIP end-of-central-directory record must exist');

  const entryCount = archive.readUInt16LE(endOffset + 10);
  let centralOffset = archive.readUInt32LE(endOffset + 16);
  const files = new Map();

  for (let index = 0; index < entryCount; index += 1) {
    assert.equal(archive.readUInt32LE(centralOffset), 0x02014b50, 'ZIP central-directory entry must be valid');
    const method = archive.readUInt16LE(centralOffset + 10);
    const compressedSize = archive.readUInt32LE(centralOffset + 20);
    const nameLength = archive.readUInt16LE(centralOffset + 28);
    const extraLength = archive.readUInt16LE(centralOffset + 30);
    const commentLength = archive.readUInt16LE(centralOffset + 32);
    const localOffset = archive.readUInt32LE(centralOffset + 42);
    const name = archive.subarray(centralOffset + 46, centralOffset + 46 + nameLength)
      .toString('utf8')
      .replaceAll('\\', '/');

    if (!name.endsWith('/')) {
      assert.equal(archive.readUInt32LE(localOffset), 0x04034b50, 'ZIP local-file entry must be valid');
      const localNameLength = archive.readUInt16LE(localOffset + 26);
      const localExtraLength = archive.readUInt16LE(localOffset + 28);
      const dataOffset = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = archive.subarray(dataOffset, dataOffset + compressedSize);
      const content = method === 0 ? compressed : inflateRawSync(compressed);
      assert.ok(method === 0 || method === 8, `unsupported ZIP compression method for ${name}`);
      files.set(name, content);
    }

    centralOffset += 46 + nameLength + extraLength + commentLength;
  }

  return files;
};

test('STEP4 exposes the custom node before the standard workflow JSON as separate direct downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*Nano Banana-H3 カスタムノードをダウンロード[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /const COMFYUI_WORKFLOW_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}workflows\/\$\{COMFYUI_WORKFLOW_FILENAME\}`;/);
  assert.match(step4PanelSource, /const COMFYUI_CUSTOM_NODE_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}downloads\/\$\{COMFYUI_CUSTOM_NODE_FILENAME\}`;/);
  assert.doesNotMatch(step4PanelSource, /raw\.githubusercontent\.com\/FURUYAN1234\/nano-banana-pro/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_WORKFLOW_FILENAME\}[\s\S]*role="button"[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_CUSTOM_NODE_FILENAME\}[\s\S]*role="button"[\s\S]*Nano Banana-H3 カスタムノードをダウンロード/);
  assert.doesNotMatch(step4PanelSource, /const downloadComfyUIWorkflow = \(\) =>/);
  assert.doesNotMatch(step4PanelSource, /anchor\.click\(\)/);
  assert.match(step4PanelSource, /標準ワークフローを自分で使う場合/);
  assert.match(step4PanelSource, /画像変換から動画化まで全部お任せにする場合/);
  assert.match(step4PanelSource, /この操作ではワークフローJSONをダウンロードしません/);
  assert.match(step4PanelSource, /プロンプトのコピーボタンとは別の機能です/);
  assert.doesNotMatch(step4PanelSource, /backgroundColor: '#(?:86198f|334155)'/);
  assert.equal(
    [...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length,
    3,
    'the H3 prompt and both download actions must use the same explicit visual style',
  );
  assert.match(step4PanelSource, /const H3_ACTION_BUTTON_STYLE = Object\.freeze\(\{[\s\S]*backgroundColor: '#f0f0f0'[\s\S]*color: '#000000'/);
  assert.match(step4PanelSource, /<section aria-labelledby="minimax-h3-prompt-heading">[\s\S]*MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*<\/section>[\s\S]*<section aria-labelledby="comfyui-workflow-heading">[\s\S]*ComfyUIワークフローJSONをダウンロード[\s\S]*<\/section>/);
  assert.match(step4PanelSource, /設定ファイルとは別/);
  assert.match(step4PanelSource, /MiniMax H3.*モデル/);
  assert.match(step4PanelSource, /NanoBananaH3Transform/);
  assert.match(step4PanelSource, /DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /APIキー.*含ま/);
  assert.match(step4PanelSource, /Google Gemini API.*ComfyUI API/s);
  assert.match(step4PanelSource, /ComfyUI\/user\/nanobanana_h3_credentials\.json/);
  assert.match(step4PanelSource, /暗号化されません/);
  assert.match(step4PanelSource, /多くの場合/);
  assert.match(step4PanelSource, /simple.*20ステップ/s);
  assert.match(step4PanelSource, /この標準版ワークフローには Nano Banana-H3 カスタムノードが必要です/);
  assert.match(step4PanelSource, /JSONだけでは実行できません/);
  assert.match(step4PanelSource, /ComfyUI\/custom_nodes\/ComfyUI-NanoBanana-H3\//);
  assert.match(step4PanelSource, /ComfyUIを完全に再起動/);
  assert.match(step4PanelSource, /🔐 APIキー未登録／登録/);
  assert.match(step4PanelSource, /APIキーはワークフローJSONには保存されません/);
  assert.match(step4PanelSource, /MiniMax H3の本体モデル・テキストエンコーダ・映像VAE・音声VAE/);
  assert.match(step4PanelSource, /NanoBananaH3Transform[\s\S]*DeterministicTitleWatermarkOverlay[\s\S]*DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /標準版は20ステップ版/);
  assert.match(step4PanelSource, /H3生成後にタイトルと固定クレジットを合成/);
  assert.match(step4PanelSource, /黒字＋白縁、背景バーなし/);
  assert.match(step4PanelSource, /APIキー・モデル・漫画画像は配布物に含まれません/);
  assert.match(step4PanelSource, /配布元のライセンスに同意して取得/);
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

test('distributed standard workflow is the exact user-supplied 20-step JSON without PreviewImage', () => {
  assert.equal(existsSync(workflowUrl), true, 'ComfyUI workflow JSON must be distributed from public/workflows');
  if (!existsSync(workflowUrl)) return;

  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), '9f21c48d7bd30b920f055ecf1b16969bfa709063780dd4c60053258df39f563b');
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 26);
  assert.equal(workflow.links.length, 30);
  assert.ok(!workflow.nodes.some((node) => node.type === 'PreviewImage'));
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'BasicScheduler')?.widgets_values,
    ['simple', 20, 1],
  );
  assert.ok(workflow.nodes.some((node) => node.type === 'NanoBananaH3Transform'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicTitleWatermarkOverlay'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicEndCreditOverlay'));
});

test('custom-node ZIP has the required root folder, exact source files, and no forbidden extras', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node ZIP must be distributed from public/downloads');
  if (!existsSync(customNodeZipUrl)) return;

  const files = readZipFiles(customNodeZipUrl);
  assert.deepEqual([...files.keys()].sort(), [
    'ComfyUI-NanoBanana-H3/__init__.py',
    'ComfyUI-NanoBanana-H3/h3_prompt_system.txt',
    'ComfyUI-NanoBanana-H3/web/nanobanana_h3.js',
  ]);
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/__init__.py')), '77657d6ea68a7098cd2f1e40a6f6631054d6d6ae9c43323a10caaf5ff22d7af0');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/h3_prompt_system.txt')), '808811a45c2fd33ee4148ad3ab6c235afa909505b68b362e9cfaa75002a7590e');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/web/nanobanana_h3.js')), '8d06430e83e1512be2a1c0f217457ee57b0d94a39edc76401f98ebd4c2cf45c5');
  assert.doesNotMatch([...files.keys()].join('\n'), /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak))(?:\/|$)/i);

  const combinedText = Buffer.concat([...files.values()]).toString('utf8');
  assert.doesNotMatch(combinedText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('README keeps the custom-node-first installation contract in sync with STEP4', () => {
  assert.match(readmeSource, /標準20ステップ版ワークフロー/);
  assert.match(readmeSource, /ComfyUI\/custom_nodes\/ComfyUI-NanoBanana-H3\//);
  assert.match(readmeSource, /🔐 APIキー未登録／登録/);
  assert.match(readmeSource, /NanoBananaH3Transform/);
  assert.match(readmeSource, /DeterministicTitleWatermarkOverlay/);
  assert.match(readmeSource, /DeterministicEndCreditOverlay/);
  assert.match(readmeSource, /黒字＋白縁・背景バーなし/);
  assert.match(readmeSource, /固定クレジット/);
  assert.match(readmeSource, /配布専用.*標準.*simple.*20ステップ/s);
  assert.match(readmeSource, /手動.*標準.*normal/s);
  assert.match(readmeSource, /Google Gemini API.*ComfyUI API/s);
  assert.match(readmeSource, /ComfyUI\/user\/nanobanana_h3_credentials\.json/);
  assert.match(readmeSource, /暗号化.*されません/);
  assert.match(readmeSource, /多くの場合/);
});
