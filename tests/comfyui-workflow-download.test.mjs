import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL('../public/workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-Fused4Step-SLA-2026-09-06-r6.json', import.meta.url);
const customNodeZipUrl = new URL('../public/downloads/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6.zip', import.meta.url);
const customNodeZipShaUrl = new URL('../public/downloads/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6.zip.sha256.txt', import.meta.url);
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

test('STEP4 provides separate Fused4step SLA workflow and bundled-three-node downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*同梱カスタムノード3点・導入セットをダウンロード[\s\S]*Fused4step・SLA ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /COMFYUI_CUSTOM_NODE_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /Super-FURU-AI-4koma-H3-Hybrid-b25-Fused4Step-SLA-2026-09-06-r6\.json/);
  assert.match(step4PanelSource, /MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6\.zip/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-MiniMax-H3-Long-Video.*ComfyUI-Spectrum-MiniMax-H3/s);
  assert.match(step4PanelSource, /台詞1本につき5秒.*上限なし.*台詞がない場合だけ既定30秒/s);
  assert.match(step4PanelSource, /Fused 4ステップ.*音声補正.*2ステップ.*H3生成BGMあり/s);
  assert.match(step4PanelSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes.*Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(step4PanelSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(step4PanelSource, /https:\/\/github\.com\/PlagueKind\/ComfyUI-PlagueKind-Nodes/);
  assert.match(step4PanelSource, /区間.*生成.*検査.*最大3回/s);
  assert.match(step4PanelSource, /MIT.*GPL-3\.0-only.*GPL-3\.0-or-later/s);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.equal([...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length, 3);
});

test('supplied Fused4step SLA workflow bytes and graph are preserved', () => {
  assert.equal(existsSync(workflowUrl), true, 'workflow JSON must be distributed from public/workflows');
  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), '2497abf683cb2ed595fd089e5bef638d914e989831def0737392c3aa5387c7ff');
  assert.match(readFileSync(sourceAttributesUrl, 'utf8'), /public\/downloads\/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6\.zip -text/);
  assert.match(readFileSync(sourceAttributesUrl, 'utf8'), /public\/downloads\/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6\.zip\.sha256\.txt -text/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /Super-FURU-AI-4koma-H3-Hybrid-b25-Fused4Step-SLA-2026-09-06-r6\.json -text/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /downloads\/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6\.zip -text/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /downloads\/MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r6\.zip\.sha256\.txt -text/);
  assert.match(packageJson.scripts.deploy, /gh-pages -d dist --dotfiles/);
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 26);
  assert.equal(workflow.links.length, 28);
  for (const type of ['MiniMaxH3LongReferenceSampler', 'TimestampedSaveVideo', 'NanoBananaH3Transform', 'JapaneseDialoguePronunciationReview', 'DeterministicTitleWatermarkOverlay', 'DeterministicEndCreditOverlay', 'H3SLAAttention']) assert.ok(workflow.nodes.some((node) => node.type === type), `${type} must be present`);
  const text = bytes.toString('utf8');
  assert.match(text, /5秒/);
  assert.match(text, /30秒/);
  assert.match(text, /H3-GENERATED BGM AND DIALOGUE STABILITY OVERRIDE/);
  assert.match(text, /final non_diegetic_music field must contain the selected H3-generated instrumental cue and must not be N\/A/);
  assert.match(text, /区間.*生成.*検査.*原因別修正.*最大3回/s);
  assert.equal(workflow.extra.distribution.version, '2026-09-06-r6');
  assert.equal(workflow.extra.distribution.video_steps, 4);
  assert.equal(workflow.extra.distribution.audio_refine_steps, 2);
  const longVideoNode = workflow.nodes.find((node) => node.type === 'MiniMaxH3LongReferenceSampler');
  assert.equal(longVideoNode.widgets_values[13], 2, 'the supplied audio-refine setting must use two steps');
  assert.equal(longVideoNode.widgets_values[14], 0.5, 'the supplied audio-refine denoise must remain 0.5');
  for (const url of ['https://huggingface.co/Kijai/MiniMax-H3-experimental/resolve/main/minimax_h3_video_vae_int8_convrot.safetensors?download=true', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors?download=true', 'https://huggingface.co/MATLOWAI/minimax-h3-fused-turbo-int8-convrot/resolve/main/diffusion_models/minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors?download=true']) assert.match(text, new RegExp(url.replace(/[.?]/g, '\\$&')));
  assert.doesNotMatch(text, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('bundle preserves its corrected BGM contract, manifest, licensing, and no credential artifact', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be distributed from public/downloads');
  const bundleBytes = readFileSync(customNodeZipUrl);
  assert.equal(existsSync(customNodeZipShaUrl), true, 'the downloadable bundle must include a SHA-256 sidecar');
  const advertisedHash = readFileSync(customNodeZipShaUrl, 'utf8').trim().split(/\s+/)[0];
  assert.equal(advertisedHash.toLowerCase(), hashBytes(bundleBytes));
  const files = readZipFilesFromBuffer(bundleBytes);
  const root = 'Super-FURU-AI_四コマ_非LLM_Fused4step_SLA_配布用_20260906_r6/';
  const expected = [
    'README_最初にお読みください.md', 'VERSION.txt', 'MANIFEST_SHA256.txt', 'LICENSE_ワークフローと独自ノード.txt', 'カスタムノード・ライセンスと出典.md', 'モデル一覧・取得先.md', 'セットアップ.ps1', '検証記録.json', '配布設定を検査.py', '外部必須ノード.json', '必須ノードの確認.ps1', '必須ノード取得.html',
    '01_ワークフロー/【最新版・2026-09-06-r6・非LLM・Fused4step＋SLA】四コマ_区間検査.json',
    '02_カスタムノード/ComfyUI-NanoBanana-H3/LICENSE', '02_カスタムノード/ComfyUI-NanoBanana-H3/README.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/README_API_SECURITY.md', '02_カスタムノード/ComfyUI-NanoBanana-H3/__init__.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/audio_audit_policy.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/h3_prompt_system.txt', '02_カスタムノード/ComfyUI-NanoBanana-H3/identity_contract.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/resume_context.py', '02_カスタムノード/ComfyUI-NanoBanana-H3/web/nanobanana_h3.js', '02_カスタムノード/ComfyUI-NanoBanana-H3/web/timestamped_save_video_preview.js',
    '02_カスタムノード/ComfyUI-MiniMax-H3-Long-Video/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/LICENSE', '02_カスタムノード/ComfyUI-Spectrum-MiniMax-H3/COPYRIGHT',
  ];
  for (const name of expected) assert.ok(files.has(`${root}${name}`), `${name} must be present`);
  assert.equal(hashBytes(files.get(`${root}01_ワークフロー/【最新版・2026-09-06-r6・非LLM・Fused4step＋SLA】四コマ_区間検査.json`)), '2497abf683cb2ed595fd089e5bef638d914e989831def0737392c3aa5387c7ff');
  const license = files.get(`${root}02_カスタムノード/ComfyUI-NanoBanana-H3/LICENSE`).toString('utf8');
  assert.match(license, /MIT License/);
  const bundleReadme = files.get(`${root}README_最初にお読みください.md`).toString('utf8');
  assert.match(bundleReadme, /H3生成BGMあり/);
  assert.doesNotMatch(bundleReadme, /BGMなし/);
  assert.match(bundleReadme, /不足モデル.*ダウンロード候補/);
  assert.match(bundleReadme, /ComfyUI-PlagueKind-Nodes/);
  assert.match(bundleReadme, /ComfyUI-H3-AudioRefine/);
  assert.match(bundleReadme, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(bundleReadme, /APIキー/);
  assert.match(bundleReadme, /ワークフロー.*読み込/);
  const manifest = files.get(`${root}MANIFEST_SHA256.txt`).toString('utf8');
  assert.ok(manifest.length > 0, 'the supplied manifest must be retained byte-for-byte');
  const manifestEntries = new Map([...manifest.matchAll(/^([a-f0-9]{64})  (.+)$/gm)].map(([, hash, name]) => [name, hash]));
  assert.equal(manifestEntries.size, 85, 'the bundle manifest must cover every distributed payload');
  for (const [name, content] of files) {
    if (name === `${root}MANIFEST_SHA256.txt`) continue;
    assert.equal(manifestEntries.get(name.slice(root.length)), hashBytes(content), `${name} must match its supplied manifest hash`);
  }
  for (const [name, content] of files) {
    assert.doesNotMatch(content.toString('utf8'), /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|nanobanana_h3_credentials/i, `${name} must not contain a credential artifact`);
    assert.doesNotMatch(name, /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak)|[^/]+\.bak-[^/]+)(?:\/|$)/i);
  }
});

test('README matches the H3-BGM distribution and workflow does not describe credential persistence', () => {
  assert.match(readmeSource, /Fused4Step-SLA-2026-09-06-r6/);
  assert.match(readmeSource, /Fused 4ステップ.*音声補正2ステップ.*H3生成BGMあり/);
  assert.match(readmeSource, /不足モデル.*ダウンロード/);
  assert.match(readmeSource, /3フォルダ/);
  assert.match(readmeSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes.*Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(readmeSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(readmeSource, /区間.*生成.*検査.*最大3回/s);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3.*MIT.*ComfyUI-MiniMax-H3-Long-Video.*GPL-3\.0-only.*ComfyUI-Spectrum-MiniMax-H3.*GPL-3\.0-or-later/s);
  for (const entry of readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true }).filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    assert.doesNotMatch(readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8'), /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  }
});
