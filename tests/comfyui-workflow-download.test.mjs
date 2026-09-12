import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL('../public/workflows/FourPanel_NonLM_4step_20260912203033_v6.0.9.json', import.meta.url);
const customNodeZipUrl = new URL('../.release-assets/ComfyUI_H3_FourPanel_NonLM_20260912203033_v6.0.9.zip', import.meta.url);
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

test('STEP4 provides separate current Fused4 SLA workflow and bundled-five-node downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*同梱カスタムノード5点・導入セットをダウンロード[\s\S]*Fused4step・SLA ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /COMFYUI_CUSTOM_NODE_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*?download=\{COMFYUI_CUSTOM_NODE_FILENAME\}/);
  assert.match(step4PanelSource, /href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*?download=\{COMFYUI_WORKFLOW_FILENAME\}/);
  assert.notEqual(workflowUrl.pathname, customNodeZipUrl.pathname, 'the two downloads must target different files');
  assert.match(step4PanelSource, /FourPanel_NonLM_4step_20260912203033_v6\.0\.9\.json/);
  assert.match(step4PanelSource, /ComfyUI_H3_FourPanel_NonLM_20260912203033_v6\.0\.9\.zip/);
  assert.match(step4PanelSource, /github\.com\/FURUYAN1234\/nano-banana-pro\/releases\/download\/v6\.0\.9/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-MiniMax-H3-Long-Video.*ComfyUI-Spectrum-MiniMax-H3/s);
  assert.match(step4PanelSource, /軽く要約＋必要な台詞だけ延長.*基本5秒.*最大15秒.*台詞がない場合だけ既定30秒/s);
  assert.match(step4PanelSource, /Fused 4ステップ.*音声補正.*2ステップ.*H3生成BGMあり/s);
  assert.match(step4PanelSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes.*Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(step4PanelSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(step4PanelSource, /https:\/\/github\.com\/PlagueKind\/ComfyUI-PlagueKind-Nodes/);
  assert.match(step4PanelSource, /区間.*生成.*検査.*最大5候補/s);
  assert.match(step4PanelSource, /MIT.*GPL-3\.0-only.*GPL-3\.0-or-later/s);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.match(step4PanelSource, /初回込み最大5候補/);
  assert.match(step4PanelSource, /途中.*合格.*即.*進/);
  assert.match(step4PanelSource, /全候補.*不合格.*最良/);
  assert.match(step4PanelSource, /追加取得.*不要/);
  assert.match(step4PanelSource, /RELEASE_PREVENTION_JA\.md/);
  assert.equal([...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length, 3);
});

test('supplied current Fused4 SLA workflow bytes and graph are preserved', () => {
  assert.equal(existsSync(workflowUrl), true, 'workflow JSON must be distributed from public/workflows');
  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), '21cfa093250230db078caebb3a951c005dd79c24e97fd2c7ca91555227f18241');
  assert.doesNotMatch(readFileSync(sourceAttributesUrl, 'utf8'), /public\/downloads\/.*\.zip/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /workflows\/FourPanel_NonLM_4step_20260912203033_v6\.0\.9\.json -text/);
  assert.doesNotMatch(readFileSync(publishedAttributesUrl, 'utf8'), /downloads\/.*\.zip/);
  assert.match(packageJson.scripts.deploy, /gh-pages -d dist --dotfiles/);
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 26);
  assert.equal(workflow.links.length, 29);
  for (const type of ['MiniMaxH3LongReferenceSampler', 'TimestampedSaveVideo', 'NanoBananaH3Transform', 'JapaneseDialoguePronunciationReview', 'DeterministicTitleWatermarkOverlay', 'DeterministicEndCreditOverlay', 'H3SLAAttention']) assert.ok(workflow.nodes.some((node) => node.type === type), `${type} must be present`);
  const text = bytes.toString('utf8');
  assert.match(text, /5秒/);
  assert.match(text, /軽く要約＋必要な台詞だけ延長/);
  assert.match(text, /30秒/);
  assert.match(text, /H3生成BGM/);
  assert.doesNotMatch(text, /latest_saved_video_url|production_approval|validated_prompt_id/);
  const longVideoNode = workflow.nodes.find((node) => node.type === 'MiniMaxH3LongReferenceSampler');
  assert.equal(longVideoNode.widgets_values[13], 2, 'the supplied audio-refine setting must use two steps');
  assert.equal(longVideoNode.widgets_values[14], 0.5, 'the supplied audio-refine denoise must remain 0.5');
  for (const url of ['https://huggingface.co/Kijai/MiniMax-H3-experimental/resolve/main/minimax_h3_video_vae_int8_convrot.safetensors', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors', 'https://huggingface.co/MATLOWAI/minimax-h3-fused-turbo-int8-convrot/resolve/main/diffusion_models/minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors']) assert.match(text, new RegExp(url.replace(/[.?]/g, '\\$&')));
  assert.doesNotMatch(text, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('release asset preserves the supplied API distribution manifest, licensing, and no credential artifact', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be staged outside the Git source tree');
  const bundleBytes = readFileSync(customNodeZipUrl);
  assert.equal(hashBytes(bundleBytes), 'b572826f85f9cb1dd60d2899a8ba6214c3590d71ec4becc68a14bb1872338f3a');
  const files = new Map([...readZipFilesFromBuffer(bundleBytes)].map(([name, content]) => [name.replace(/^ComfyUI_H3_FourPanel_NonLM\//, ''), content]));
  const expected = [
    'CHANGELOG.md', 'models.json', 'README.md', 'SHA256SUMS.json', 'RELEASE_PREVENTION_JA.md', 'LICENSES_AND_NOTICES.md', 'licenses/Apache-2.0-LightX2V.txt', 'workflows/FourPanel_NonLM_4step_20260912203033_v6.0.9.json',
    'custom_nodes/ComfyUI-H3-AudioRefine/LICENSE', 'custom_nodes/ComfyUI-PlagueKind-Nodes/LICENSE',
    'custom_nodes/ComfyUI-NanoBanana-H3/LICENSE', 'custom_nodes/ComfyUI-NanoBanana-H3/__init__.py', 'custom_nodes/ComfyUI-NanoBanana-H3/web/nanobanana_h3.js',
    'custom_nodes/ComfyUI-MiniMax-H3-Long-Video/LICENSE', 'custom_nodes/ComfyUI-MiniMax-H3-Long-Video/minimax_h3_long_video/nodes.py',
    'custom_nodes/ComfyUI-Spectrum-MiniMax-H3/LICENSE', 'custom_nodes/ComfyUI-Spectrum-MiniMax-H3/comfyui_spectrum_h3/nodes.py',
  ];
  for (const name of expected) assert.ok(files.has(name), `${name} must be present`);
  for (const name of ['VERSION_CORRECTION_JA.md', 'VALIDATION.md', 'custom_nodes/ComfyUI-NanoBanana-H3/speaker_audit.py']) assert.ok(files.has(name), `${name} must be present`);
  assert.match(files.get('VERSION_CORRECTION_JA.md').toString('utf8'), /5\.9\.7/);
  assert.match(step4PanelSource, /採用済みでも全検査合格とは限りません/);
  assert.match(readmeSource, /採用済みでも全検査合格とは限りません/);
  assert.equal(hashBytes(files.get('workflows/FourPanel_NonLM_4step_20260912203033_v6.0.9.json')), '21cfa093250230db078caebb3a951c005dd79c24e97fd2c7ca91555227f18241');
  const license = files.get('custom_nodes/ComfyUI-NanoBanana-H3/LICENSE').toString('utf8');
  assert.match(license, /MIT License/);
  assert.equal(files.has('README_JA.md'), false, 'bundle must use one inline bilingual README');
  const bundleReadme = files.get('README.md').toString('utf8');
  assert.match(bundleReadme, /5フォルダー/);
  assert.match(bundleReadme, /English \/ 日本語/);
  assert.match(files.get('LICENSES_AND_NOTICES.md').toString('utf8'), /LightX2V[\s\S]*Apache-2\.0/);
  assert.match(files.get('RELEASE_PREVENTION_JA.md').toString('utf8'), /CP932[\s\S]*APIキー/);
  assert.match(files.get('custom_nodes/ComfyUI-MiniMax-H3-Long-Video/minimax_h3_long_video/nodes.py').toString('utf8'), /max_attempts=5/);
  assert.match(files.get('custom_nodes/ComfyUI-MiniMax-H3-Long-Video/minimax_h3_long_video/nodes.py').toString('utf8'), /simplify_framing=visual_failures >= 2/);
  const manifestEntries = JSON.parse(files.get('SHA256SUMS.json').toString('utf8'));
  assert.equal(Object.keys(manifestEntries).length, files.size - 1, 'the supplied manifest must cover every distributed payload');
  for (const [name, content] of files) {
    if (name === 'SHA256SUMS.json') continue;
    assert.equal(manifestEntries[name], hashBytes(content), `${name} must match its supplied manifest hash`);
  }
  for (const [name, content] of files) {
    assert.doesNotMatch(content.toString('utf8'), /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|nanobanana_h3_credentials/i, `${name} must not contain a credential artifact`);
    assert.doesNotMatch(name, /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak)|[^/]+\.bak-[^/]+)(?:\/|$)/i);
  }
});

test('README matches the current H3 API distribution and workflow does not describe credential persistence', () => {
  assert.match(readmeSource, /FourPanel_NonLM_4step_20260912203033_v6\.0\.9/);
  assert.match(readmeSource, /Fused 4ステップ.*音声補正2ステップ.*denoise 0\.5.*SLA Attention/);
  assert.match(readmeSource, /不足モデル.*ダウンロード/);
  assert.match(readmeSource, /5フォルダ/);
  assert.match(readmeSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes.*Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(readmeSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(readmeSource, /区間.*生成.*検査.*最大5候補/s);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3.*MIT.*ComfyUI-MiniMax-H3-Long-Video.*GPL-3\.0-only.*ComfyUI-Spectrum-MiniMax-H3.*GPL-3\.0-or-later/s);
  for (const entry of readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true }).filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    assert.doesNotMatch(readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8'), /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  }
});
