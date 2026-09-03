import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL('../public/workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-VariableDuration-2026-09-03.json', import.meta.url);
const customNodeZipUrl = new URL('../public/downloads/MiniMax-H3-4Koma-VariableDuration-Hybrid-b25-Bundle-2026-09-03.zip', import.meta.url);
const publishedAttributesUrl = new URL('../public/.gitattributes', import.meta.url);
const publicWorkflowDirectoryUrl = new URL('../public/workflows/', import.meta.url);

const hashBytes = (value) => createHash('sha256').update(value).digest('hex');

const readZipFilesFromBuffer = (archive) => {
  let endOffset = archive.length - 22;
  while (endOffset >= 0 && archive.readUInt32LE(endOffset) !== 0x06054b50) endOffset -= 1;
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
    const name = archive.subarray(centralOffset + 46, centralOffset + 46 + nameLength).toString('utf8').replaceAll('\\', '/');
    if (!name.endsWith('/')) {
      assert.equal(archive.readUInt32LE(localOffset), 0x04034b50, 'ZIP local-file entry must be valid');
      const dataOffset = localOffset + 30 + archive.readUInt16LE(localOffset + 26) + archive.readUInt16LE(localOffset + 28);
      const compressed = archive.subarray(dataOffset, dataOffset + compressedSize);
      assert.ok(method === 0 || method === 8, `unsupported ZIP compression method for ${name}`);
      files.set(name, method === 0 ? compressed : inflateRawSync(compressed));
    }
    centralOffset += 46 + nameLength + extraLength + commentLength;
  }
  return files;
};

test('STEP4 provides separate variable-duration workflow and three-node bundle downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*必須カスタムノード3点・導入セットをダウンロード[\s\S]*自動可変尺・Hybrid b25 ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /COMFYUI_CUSTOM_NODE_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /Super-FURU-AI-4koma-H3-Hybrid-b25-VariableDuration-2026-09-03\.json/);
  assert.match(step4PanelSource, /MiniMax-H3-4Koma-VariableDuration-Hybrid-b25-Bundle-2026-09-03\.zip/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-MiniMax-H3-Long-Video.*ComfyUI-Spectrum-MiniMax-H3/s);
  assert.match(step4PanelSource, /5秒刻み.*最大は30秒/s);
  assert.match(step4PanelSource, /このワークフロー専用の独自統合ノード/);
  assert.match(step4PanelSource, /GPL-3\.0-only.*GPL-3\.0-or-later/s);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.doesNotMatch(step4PanelSource, /FusedTurbo-Spectrum-SLA/);
  assert.equal([...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length, 3);
});

test('supplied variable-duration workflow bytes and graph are preserved', () => {
  assert.equal(existsSync(workflowUrl), true, 'workflow JSON must be distributed from public/workflows');
  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), '5ea044a38897410f05cb7051c04c924a0254207218977ffe2794d06a516e1d97');
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /Super-FURU-AI-4koma-H3-Hybrid-b25-VariableDuration-2026-09-03\.json -text/);
  assert.match(packageJson.scripts.deploy, /gh-pages -d dist --dotfiles/);
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 27);
  assert.equal(workflow.links.length, 29);
  for (const type of ['MiniMaxH3LongReferenceSampler', 'TimestampedSaveVideo', 'NanoBananaH3Transform', 'JapaneseDialoguePronunciationReview', 'DeterministicTitleWatermarkOverlay', 'DeterministicEndCreditOverlay', 'SpectrumApplyMiniMaxH3', 'LoraLoaderModelOnly']) assert.ok(workflow.nodes.some((node) => node.type === type), `${type} must be present`);
  const text = bytes.toString('utf8');
  assert.match(text, /5秒/);
  assert.match(text, /30秒/);
  assert.doesNotMatch(text, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('bundle includes the supplied raw node folders, licensing, and no credential artifact', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be distributed from public/downloads');
  const files = readZipFilesFromBuffer(readFileSync(customNodeZipUrl));
  const root = 'MiniMax-H3_自動可変尺_今回成功版_配布用_20260903/';
  const expected = [
    'README_最初にお読みください.md', 'VERSION.txt', 'カスタムノード・ライセンスと出典.md', 'モデル一覧・取得先.md',
    '01_ワークフロー【今回成功版】/【高速LoRA＋Spectrum＋INT8 VAE・非LM Studio・自動可変尺】四コマ_Hybrid-b25.json',
    '02_カスタムノード/ComfyUI-NanoBanana-H3/LICENSE', '02_カスタムノード/ComfyUI-NanoBanana-H3/NOTICE.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/README_API_SECURITY.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/__init__.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/h3_prompt_system.txt', '02_カスタムノード/ComfyUI-NanoBanana-H3/web/nanobanana_h3.js',
    '02_カスタムノード/ComfyUI-MiniMax-H3-Long-Video/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/COPYRIGHT',
  ];
  for (const name of expected) assert.ok(files.has(`${root}${name}`), `${name} must be present`);
  assert.equal(hashBytes(files.get(`${root}01_ワークフロー【今回成功版】/【高速LoRA＋Spectrum＋INT8 VAE・非LM Studio・自動可変尺】四コマ_Hybrid-b25.json`)), '5ea044a38897410f05cb7051c04c924a0254207218977ffe2794d06a516e1d97');
  const notice = files.get(`${root}02_カスタムノード/ComfyUI-NanoBanana-H3/NOTICE.md`).toString('utf8');
  assert.match(notice, /original source files.*GPL-3\.0-or-later/is);
  assert.match(notice, /does not grant rights to ComfyUI.*OpenAI or Google services/is);
  for (const [name, content] of files) {
    assert.doesNotMatch(content.toString('utf8'), /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|nanobanana_h3_credentials/i, `${name} must not contain a credential artifact`);
    assert.doesNotMatch(name, /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak)|[^/]+\.bak-[^/]+)(?:\/|$)/i);
  }
});

test('README matches the new distribution and workflow does not describe credential persistence', () => {
  assert.match(readmeSource, /VariableDuration-2026-09-03/);
  assert.match(readmeSource, /VariableDuration-Hybrid-b25-Bundle-2026-09-03/);
  assert.match(readmeSource, /3フォルダ/);
  assert.match(readmeSource, /独自統合ノード/);
  for (const entry of readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true }).filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    assert.doesNotMatch(readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8'), /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  }
});
