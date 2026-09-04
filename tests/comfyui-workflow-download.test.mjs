import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL('../public/workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-Recommended-VariableDuration-H3BGM-2026-09-04.json', import.meta.url);
const customNodeZipUrl = new URL('../public/downloads/MiniMax-H3-4Koma-Recommended-VariableDuration-H3BGM-Bundle-2026-09-04-140019.zip', import.meta.url);
const sourceAttributesUrl = new URL('../.gitattributes', import.meta.url);
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

test('STEP4 provides separate recommended H3-BGM variable-duration workflow and three-node bundle downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*必須カスタムノード3点・導入セットをダウンロード[\s\S]*自動可変尺・Hybrid b25・H3生成BGM ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /COMFYUI_CUSTOM_NODE_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /Super-FURU-AI-4koma-H3-Hybrid-b25-Recommended-VariableDuration-H3BGM-2026-09-04\.json/);
  assert.match(step4PanelSource, /MiniMax-H3-4Koma-Recommended-VariableDuration-H3BGM-Bundle-2026-09-04-140019\.zip/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-MiniMax-H3-Long-Video.*ComfyUI-Spectrum-MiniMax-H3/s);
  assert.match(step4PanelSource, /台詞1本につき5秒.*上限なし.*台詞がない場合だけ既定30秒/s);
  assert.match(step4PanelSource, /MiniMax H3自身が内容に合う低音量BGM/);
  assert.match(step4PanelSource, /Spectrumはサンプラー高速化の実行時フック.*隔離Python子プロセス.*ComfyUI user cache.*ffmpeg/s);
  assert.match(step4PanelSource, /このワークフロー専用の独自統合ノード/);
  assert.match(step4PanelSource, /MIT.*GPL-3\.0-only.*GPL-3\.0-or-later/s);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.doesNotMatch(step4PanelSource, /FusedTurbo-Spectrum-SLA/);
  assert.equal([...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length, 3);
});

test('supplied recommended H3-BGM workflow bytes and graph are preserved', () => {
  assert.equal(existsSync(workflowUrl), true, 'workflow JSON must be distributed from public/workflows');
  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), 'b1158a516112362a8c23a88461879f15b7c0c2bccbdf363f94f0bf7faba2680e');
  assert.match(readFileSync(sourceAttributesUrl, 'utf8'), /public\/downloads\/MiniMax-H3-4Koma-Recommended-VariableDuration-H3BGM-Bundle-2026-09-04-140019\.zip -text/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /Super-FURU-AI-4koma-H3-Hybrid-b25-Recommended-VariableDuration-H3BGM-2026-09-04\.json -text/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /downloads\/MiniMax-H3-4Koma-Recommended-VariableDuration-H3BGM-Bundle-2026-09-04-140019\.zip -text/);
  assert.match(packageJson.scripts.deploy, /gh-pages -d dist --dotfiles/);
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 27);
  assert.equal(workflow.links.length, 29);
  for (const type of ['MiniMaxH3LongReferenceSampler', 'TimestampedSaveVideo', 'NanoBananaH3Transform', 'JapaneseDialoguePronunciationReview', 'DeterministicTitleWatermarkOverlay', 'DeterministicEndCreditOverlay', 'SpectrumApplyMiniMaxH3', 'LoraLoaderModelOnly']) assert.ok(workflow.nodes.some((node) => node.type === type), `${type} must be present`);
  const text = bytes.toString('utf8');
  assert.match(text, /5秒/);
  assert.match(text, /30秒/);
  assert.match(text, /"h3_generated_bgm"/);
  assert.equal(workflow.extra.h3_generated_bgm.enabled, true);
  assert.equal(workflow.extra.h3_turbo.duration_mode, 'dialogue_turns_x_5_seconds_unbounded');
  assert.equal(workflow.extra.h3_turbo.fallback_duration_seconds, 30);
  assert.match(text, /final non_diegetic_music field must contain the selected H3-generated instrumental cue/);
  assert.doesNotMatch(text, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('bundle preserves the supplied release bytes, manifest, licensing, and no credential artifact', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be distributed from public/downloads');
  const bundleBytes = readFileSync(customNodeZipUrl);
  assert.equal(hashBytes(bundleBytes), '3f036794b88e065098385317861471673e49896f02015d518355b552ae8f144e');
  const files = readZipFilesFromBuffer(bundleBytes);
  const root = 'Super-FURU-AI_4koma_MiniMax-H3_完全可変尺_H3生成BGM_推奨版_20260904-140019/';
  const expected = [
    'README_最初にお読みください.md', 'VERSION.txt', 'MANIFEST_SHA256.txt', 'LICENSE_ワークフローと独自ノード.txt', 'カスタムノード・ライセンスと出典.md', 'モデル一覧・取得先.md', 'セットアップ.ps1', '03_発音辞書テンプレート/pronunciation_dictionary.example.json',
    '01_ワークフロー【推奨版・H3生成BGM】/【推奨版・H3生成BGM・非LM Studio・完全可変尺】四コマ_Hybrid-b25.json',
    '02_カスタムノード/ComfyUI-NanoBanana-H3/LICENSE', '02_カスタムノード/ComfyUI-NanoBanana-H3/README.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/README_API_SECURITY.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/__init__.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/h3_prompt_system.txt', '02_カスタムノード/ComfyUI-NanoBanana-H3/web/nanobanana_h3.js',
    '02_カスタムノード/ComfyUI-MiniMax-H3-Long-Video/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/COPYRIGHT',
  ];
  for (const name of expected) assert.ok(files.has(`${root}${name}`), `${name} must be present`);
  assert.equal(hashBytes(files.get(`${root}01_ワークフロー【推奨版・H3生成BGM】/【推奨版・H3生成BGM・非LM Studio・完全可変尺】四コマ_Hybrid-b25.json`)), 'b1158a516112362a8c23a88461879f15b7c0c2bccbdf363f94f0bf7faba2680e');
  const license = files.get(`${root}02_カスタムノード/ComfyUI-NanoBanana-H3/LICENSE`).toString('utf8');
  assert.match(license, /MIT License/);
  const manifest = files.get(`${root}MANIFEST_SHA256.txt`).toString('utf8');
  assert.ok(manifest.length > 0, 'the supplied manifest must be retained byte-for-byte');
  for (const [name, content] of files) {
    assert.doesNotMatch(content.toString('utf8'), /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|nanobanana_h3_credentials/i, `${name} must not contain a credential artifact`);
    assert.doesNotMatch(name, /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak)|[^/]+\.bak-[^/]+)(?:\/|$)/i);
  }
});

test('README matches the recommended H3-BGM distribution and workflow does not describe credential persistence', () => {
  assert.match(readmeSource, /Recommended-VariableDuration-H3BGM-2026-09-04/);
  assert.match(readmeSource, /Recommended-VariableDuration-H3BGM-Bundle-2026-09-04-140019/);
  assert.match(readmeSource, /MiniMax H3自身が内容に合う低音量BGM/);
  assert.match(readmeSource, /Spectrum installs runtime hooks.*isolated Python child process.*ComfyUI user cache.*ffmpeg/s);
  assert.match(readmeSource, /3フォルダ/);
  assert.match(readmeSource, /独自統合ノード/);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3.*MIT.*ComfyUI-MiniMax-H3-Long-Video.*GPL-3\.0-only.*ComfyUI-Spectrum-MiniMax-H3.*GPL-3\.0-or-later/s);
  for (const entry of readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true }).filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    assert.doesNotMatch(readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8'), /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  }
});
