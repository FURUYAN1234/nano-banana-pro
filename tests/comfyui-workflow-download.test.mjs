import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL(
  '../public/workflows/Super-FURU-AI-4koma-H3-FusedTurbo-Spectrum-SLA-8step-v1.json',
  import.meta.url,
);
const customNodeZipUrl = new URL(
  '../public/downloads/MiniMax-H3-4Koma-15s-FusedTurbo-Spectrum-SLA-Bundle-2026-09-03.zip',
  import.meta.url,
);
const publishedAttributesUrl = new URL('../public/.gitattributes', import.meta.url);
const publicWorkflowDirectoryUrl = new URL('../public/workflows/', import.meta.url);

const hashText = (value) => createHash('sha256').update(value, 'utf8').digest('hex');
const hashBytes = (value) => createHash('sha256').update(value).digest('hex');

const readZipFilesFromBuffer = (archive) => {
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

const readZipFiles = (url) => readZipFilesFromBuffer(readFileSync(url));

test('STEP4 exposes the required four-node bundle before the latest workflow JSON as separate direct downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*必須カスタムノード4点・導入セットをダウンロード[\s\S]*最新版・最強版ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /const COMFYUI_WORKFLOW_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}workflows\/\$\{COMFYUI_WORKFLOW_FILENAME\}`;/);
  assert.match(step4PanelSource, /const COMFYUI_CUSTOM_NODE_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}downloads\/\$\{COMFYUI_CUSTOM_NODE_FILENAME\}`;/);
  assert.doesNotMatch(step4PanelSource, /raw\.githubusercontent\.com\/FURUYAN1234\/nano-banana-pro/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_WORKFLOW_FILENAME\}[\s\S]*role="button"[\s\S]*最新版・最強版ワークフローをダウンロード/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_CUSTOM_NODE_FILENAME\}[\s\S]*role="button"[\s\S]*必須カスタムノード4点・導入セットをダウンロード/);
  assert.doesNotMatch(step4PanelSource, /const downloadComfyUIWorkflow = \(\) =>/);
  assert.doesNotMatch(step4PanelSource, /anchor\.click\(\)/);
  assert.match(step4PanelSource, /ComfyUI標準テンプレートを自分で使う場合/);
  assert.match(step4PanelSource, /最新版・最強版ワークフローを使う場合/);
  assert.match(step4PanelSource, /この操作ではワークフローJSONをダウンロードしません/);
  assert.match(step4PanelSource, /プロンプトのコピーボタンとは別の機能です/);
  assert.doesNotMatch(step4PanelSource, /backgroundColor: '#(?:86198f|334155)'/);
  assert.equal(
    [...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length,
    3,
    'the H3 prompt and both download actions must use the same explicit visual style',
  );
  assert.match(step4PanelSource, /const H3_ACTION_BUTTON_STYLE = Object\.freeze\(\{[\s\S]*backgroundColor: '#f0f0f0'[\s\S]*color: '#000000'/);
  assert.match(step4PanelSource, /<section aria-labelledby="minimax-h3-prompt-heading">[\s\S]*MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*<\/section>[\s\S]*<section aria-labelledby="comfyui-workflow-heading">[\s\S]*最新版・最強版ワークフローをダウンロード[\s\S]*<\/section>/);
  assert.match(step4PanelSource, /設定ファイルとは別/);
  assert.match(step4PanelSource, /MiniMax H3.*モデル/);
  assert.match(step4PanelSource, /NanoBananaH3Transform/);
  assert.match(step4PanelSource, /DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /APIキー.*含ま/);
  assert.match(step4PanelSource, /OpenAI API.*Google Gemini API/s);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.match(step4PanelSource, /ワークフローのシート移動.*残/);
  assert.match(step4PanelSource, /ワークフロー読込時.*選択中.*Provider.*未登録.*入力ダイアログ.*自動/s);
  assert.match(step4PanelSource, /ComfyUIアプリ／サーバーを終了または再起動すると消去/);
  assert.match(step4PanelSource, /実行時だけ.*選択したAPI/s);
  assert.doesNotMatch(step4PanelSource, /nanobanana_h3_credentials\.json|暗号化されません/);
  assert.match(step4PanelSource, /Fused Turbo.*Spectrum.*SLA.*RES Multistep.*Simple.*8 steps/s);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-Spectrum-MiniMax-H3.*ComfyUI-PlagueKind-Nodes.*ComfyUI-MiniMax-H3-MotionCache-FastVAE/s);
  assert.match(step4PanelSource, /minimax_h3_video_vae_int8_convrot\.safetensors/);
  assert.match(step4PanelSource, /4つのカスタムノードZIP/);
  assert.match(step4PanelSource, /JSONだけでは実行できません/);
  assert.match(step4PanelSource, /ComfyUI\/custom_nodes\/ComfyUI-NanoBanana-H3\//);
  assert.match(step4PanelSource, /ComfyUIを完全に再起動/);
  assert.match(step4PanelSource, /🔐 APIキー未登録／登録/);
  assert.match(step4PanelSource, /ワークフローJSON、配布ZIP、設定ファイル、ディスクには保存されず/);
  assert.match(step4PanelSource, /Fused Turbo本体.*テキストエンコーダ.*映像VAE.*音声VAE.*4モデル/s);
  assert.match(step4PanelSource, /独立したTurbo LoRA.*SLA LoRA.*不要/s);
  assert.match(step4PanelSource, /NanoBananaH3Transform[\s\S]*DeterministicTitleWatermarkOverlay[\s\S]*DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /実際のサンプリング設定は8 steps/);
  assert.match(step4PanelSource, /overlay_title.*動画生成後.*一度だけ/s);
  assert.match(step4PanelSource, /黒字＋白縁、背景バーなし/);
  assert.match(step4PanelSource, /APIキー・認証情報・モデル本体・漫画画像・生成動画は配布物に含まれません/);
  assert.match(step4PanelSource, /配布元のライセンスに同意して取得/);
  assert.match(step4PanelSource, /MiniMax-H3-4Koma-15s-FusedTurbo-Spectrum-SLA-Bundle-2026-09-03\.zip/);
  assert.match(step4PanelSource, /Super-FURU-AI-4koma-H3-FusedTurbo-Spectrum-SLA-8step-v1\.json/);
  assert.match(step4PanelSource, /同名の旧版がある場合.*フォルダ単位で差し替え/s);
  assert.match(step4PanelSource, /新旧.*混在させません/);
  assert.match(step4PanelSource, /user\/default\/workflows/);
  assert.match(step4PanelSource, /gemini-3\.1-flash-image.*gemini-2\.5-flash/s);
  assert.match(step4PanelSource, /gpt-image-2.*gpt-4\.1-mini/s);
  assert.match(step4PanelSource, /(?:ノード4|4\. API設定).*同一Provider/s);
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

test('distributed Fused Turbo workflow has the supplied Spectrum and SLA 8-step sampling contract', () => {
  assert.equal(existsSync(workflowUrl), true, 'ComfyUI workflow JSON must be distributed from public/workflows');
  if (!existsSync(workflowUrl)) return;

  const bytes = readFileSync(workflowUrl);
  assert.equal(
    readFileSync(publishedAttributesUrl, 'utf8').includes(
      'workflows/Super-FURU-AI-4koma-H3-FusedTurbo-Spectrum-SLA-8step-v1.json -text',
    ),
    true,
    'the published Git attributes must preserve the supplier workflow bytes',
  );
  assert.match(
    packageJson.scripts.deploy,
    /gh-pages -d dist --dotfiles/,
    'the static deploy must include the published Git attributes file',
  );
  const workflow = JSON.parse(bytes.toString('utf8'));
  const workflowText = bytes.toString('utf8');
  assert.match(workflowText, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.match(workflowText, /ComfyUIを終了または再起動すると消去/);
  assert.doesNotMatch(workflowText, /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  assert.equal(workflow.nodes.length, 28);
  assert.equal(workflow.links.length, 32);
  assert.ok(!workflow.nodes.some((node) => node.type === 'PreviewImage'));
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'BasicScheduler')?.widgets_values,
    ['simple', 8, 1],
  );
  assert.deepEqual(workflow.nodes.find((node) => node.type === 'KSamplerSelect')?.widgets_values, ['res_multistep']);
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'UNETLoader')?.widgets_values,
    ['minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors', 'default'],
  );
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'SpectrumApplyMiniMaxH3')?.widgets_values,
    [true, 0.5, 1, 0.1, 2, 0.75, 1, 1, 8, false, 'system_ram', true, false, false, true, 0, 'system_ram', 'off', 0.65, false, false, 'coordinate_rls', 'hard_clip', 0.4, 'no_attenuation', 'balanced'],
  );
  assert.deepEqual(workflow.nodes.find((node) => node.type === 'H3SLAAttention')?.widgets_values, [0.9, '64', 8192, 0, true, true]);
  assert.deepEqual(workflow.nodes.find((node) => node.type === 'MiniMaxH3FastVAEDecode')?.widgets_values, [2]);
  assert.equal(workflow.nodes.some((node) => node.type === 'LoraLoaderModelOnly'), false);
  assert.ok(workflow.nodes.some((node) => node.type === 'NanoBananaH3Transform'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicTitleWatermarkOverlay'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicEndCreditOverlay'));
  assert.deepEqual(
    workflow.nodes
      .filter((node) => node.type === 'MarkdownNote')
      .map((node) => node.title)
      .filter((title) => ['【15秒・四コマ従来版】3本の違い・使い方', '配布前の必須環境・モデル配置', '解像度早見表'].includes(title))
      .sort(),
    ['【15秒・四コマ従来版】3本の違い・使い方', '配布前の必須環境・モデル配置', '解像度早見表'].sort(),
  );
  assert.deepEqual(
    workflow.nodes.find((node) => node.id === 141)?.widgets_values?.[0],
    'Google Gemini API',
  );
  assert.match(
    workflow.nodes.find((node) => node.id === 141)?.title ?? '',
    /4\. API設定.*同一Provider/,
  );

  const idOf = (type) => workflow.nodes.find((node) => node.type === type)?.id;
  const hasLink = (fromType, fromSlot, toType, toSlot) => workflow.links.some((link) => (
    link[1] === idOf(fromType)
    && link[2] === fromSlot
    && link[3] === idOf(toType)
    && link[4] === toSlot
  ));
  assert.equal(hasLink('UNETLoader', 0, 'SpectrumApplyMiniMaxH3', 0), true);
  assert.equal(hasLink('SpectrumApplyMiniMaxH3', 0, 'H3SLAAttention', 0), true);
  assert.equal(hasLink('H3SLAAttention', 0, 'BasicScheduler', 0), true);
  assert.equal(hasLink('H3SLAAttention', 0, 'BasicGuider', 0), true);
  assert.equal(hasLink('NanoBananaH3Transform', 0, 'MiniMaxH3ReferenceToVideo', 3), true);
  assert.equal(hasLink('NanoBananaH3Transform', 1, 'MiniMaxH3ReferenceToVideo', 8), true);
  assert.equal(hasLink('NanoBananaH3Transform', 2, 'DeterministicTitleWatermarkOverlay', 2), true);
  assert.equal(hasLink('DeterministicTitleWatermarkOverlay', 0, 'DeterministicEndCreditOverlay', 0), true);
  assert.equal(hasLink('DeterministicEndCreditOverlay', 0, 'CreateVideo', 0), true);
  assert.match(workflowText, /Fused Turbo INT8 ConvRot.*Spectrum.*H3 SLA Attention.*8 steps/s);
  assert.equal(workflow.extra?.h3_turbo?.separate_turbo_lora_required, false);
  assert.match(workflowText, /独立したTurbo LoRAは不要です/);
  assert.doesNotMatch(workflowText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('distributed H3 workflow embeds the supplied four-model metadata and four-node setup guidance', () => {
  const workflow = JSON.parse(readFileSync(workflowUrl, 'utf8'));
  const modelEntries = workflow.nodes.flatMap((node) => node.properties?.models ?? []);

  assert.deepEqual(modelEntries, [
    {
      name: 'minimax_h3_video_vae_int8_convrot.safetensors',
      url: 'https://huggingface.co/Kijai/MiniMax-H3-experimental/resolve/main/minimax_h3_video_vae_int8_convrot.safetensors?download=true',
      hash: '9bb2d96f218c76babd85e0611b85ca8fb330a90546c01a0005e8a58a59593410',
      hash_type: 'SHA256',
      directory: 'vae',
    },
    {
      name: 'minimax_h3_audio_vae_fp32.safetensors',
      url: 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors?download=true',
      hash: '8e505d95dd1561d47abd43d4238fd40d9bb1ae9e147ed0a4cba778d76ae4db48',
      hash_type: 'SHA256',
      directory: 'vae',
    },
    {
      name: 'minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors',
      url: 'https://huggingface.co/MATLOWAI/minimax-h3-fused-turbo-int8-convrot/resolve/main/diffusion_models/minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors?download=true',
      hash: '4262e4e9963c553fa00016bbe83961407a4fc0a888be95fd836c8d4f2304e48b',
      hash_type: 'SHA256',
      directory: 'diffusion_models',
    },
    {
      name: 'qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors',
      url: 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors?download=true',
      hash: '35a88d51044231fe332301d7a62aa81e3f2cba62febeb446e2c1e3e0ef76f2c6',
      hash_type: 'SHA256',
      directory: 'text_encoders',
    },
  ]);

  const workflowText = readFileSync(workflowUrl, 'utf8');
  assert.match(workflowText, /MiniMax-H3 四コマ→15秒動画/);
  assert.match(workflowText, /必須モデルは4点/);
  assert.match(workflowText, /ComfyUI-PlagueKind-Nodes/);
  assert.match(workflowText, /ComfyUI-MiniMax-H3-MotionCache-FastVAE/);
  assert.match(step4PanelSource, /FURU four-panel manga to video/);
  assert.match(step4PanelSource, /FURUの4コマ漫画を動画化/);
  assert.match(readmeSource, /FURU four-panel manga to video/);
  assert.match(readmeSource, /FURUの4コマ漫画を動画化/);
});

test('distribution bundle contains the four supplied custom-node packs without stale backup files', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be distributed from public/downloads');
  if (!existsSync(customNodeZipUrl)) return;

  const files = readZipFiles(customNodeZipUrl);
  const root = 'MiniMax-H3_四コマ15秒_高速版_配布用_2026-09-03/';
  const expectedNodeArchives = [
    'ComfyUI-MiniMax-H3-MotionCache-FastVAE.zip',
    'ComfyUI-NanoBanana-H3.zip',
    'ComfyUI-PlagueKind-Nodes.zip',
    'ComfyUI-Spectrum-MiniMax-H3.zip',
  ];
  for (const archiveName of expectedNodeArchives) {
    assert.equal(files.has(`${root}02_カスタムノード/${archiveName}`), true, `${archiveName} must be present`);
  }
  assert.equal(files.has(`${root}README_必ずお読みください.md`), true);
  assert.equal(files.has(`${root}README_ワークフロー作成PC用.md`), true);
  assert.equal(files.has(`${root}03_モデル直リンク/モデル一覧とSHA256.txt`), true);
  assert.equal(files.has(`${root}04_動作確認/検証結果.txt`), true);
  assert.equal(
    files.has(`${root}01_ワークフロー/【配布用・検証済】MiniMax-H3_四コマ15秒_FusedTurbo_Spectrum_SLA_8step.json`),
    true,
  );

  const nanoArchive = readZipFilesFromBuffer(files.get(`${root}02_カスタムノード/ComfyUI-NanoBanana-H3.zip`));
  assert.deepEqual([...nanoArchive.keys()].sort(), [
    'ComfyUI-NanoBanana-H3/__init__.py',
    'ComfyUI-NanoBanana-H3/h3_prompt_system.txt',
    'ComfyUI-NanoBanana-H3/web/nanobanana_h3.js',
  ]);
  assert.equal(hashBytes(nanoArchive.get('ComfyUI-NanoBanana-H3/h3_prompt_system.txt')), '8c44135df96071ef16c122cdc93f44845b744600367cdfbec46684aa5d992eaf');
  assert.doesNotMatch([...nanoArchive.keys()].join('\n'), /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak)|[^/]+\.bak-[^/]+)(?:\/|$)/i);

  const pythonSource = nanoArchive.get('ComfyUI-NanoBanana-H3/__init__.py').toString('utf8');
  const browserSource = nanoArchive.get('ComfyUI-NanoBanana-H3/web/nanobanana_h3.js').toString('utf8');
  assert.match(pythonSource, /_SESSION_CREDENTIALS/);
  assert.equal(
    [...pythonSource.matchAll(/_SESSION_CREDENTIALS\.setdefault\(slot, \{\}\)\[provider\] = api_key/g)].length,
    2,
    'both credential registration routes must keep the key in process memory',
  );
  assert.equal(
    [...pythonSource.matchAll(/"storage": "process_memory"/g)].length,
    3,
    'registration and status responses must identify process-memory storage without returning a key',
  );
  assert.doesNotMatch(pythonSource, /nanobanana_h3_credentials\.json|_read_credentials|_write_credentials|mkstemp|json\.dump/);
  assert.match(browserSource, /ComfyUI.*プロセスメモリ/);
  assert.match(browserSource, /再起動.*消去/);
  assert.match(browserSource, /afterConfigureGraph/);
  assert.match(browserSource, /widgetValue\(node, "provider"/);
  assert.match(browserSource, /if \(!status\.configured\) showCredentialDialog/);
  assert.doesNotMatch(browserSource, /認証して保存|ディスクへ保存します|JSONへ保存します|JSONに保存されます/);

  const bundleReadme = files.get(`${root}README_必ずお読みください.md`).toString('utf8');
  const authorPcReadme = files.get(`${root}README_ワークフロー作成PC用.md`).toString('utf8');
  const verificationRecord = files.get(`${root}04_動作確認/検証結果.txt`).toString('utf8');
  const bundledWorkflow = files.get(
    `${root}01_ワークフロー/【配布用・検証済】MiniMax-H3_四コマ15秒_FusedTurbo_Spectrum_SLA_8step.json`,
  );
  assert.deepEqual(bundledWorkflow, readFileSync(workflowUrl));
  for (const documentText of [bundleReadme, verificationRecord, bundledWorkflow.toString('utf8')]) {
    assert.match(documentText, /プロセス(?:の)?メモリ/);
    assert.match(documentText, /再起動.*消去/);
    assert.doesNotMatch(documentText, /nanobanana_h3_credentials\.json|暗号化なしで保存|認証して保存/);
  }
  assert.match(authorPcReadme, /最重要チェック項目/);
  assert.match(authorPcReadme, /旧資格情報ファイル.*中身を開かず/s);
  assert.match(authorPcReadme, /ワークフローのシート移動.*保持/s);
  assert.match(authorPcReadme, /ComfyUI.*終了.*再起動.*消去/s);
  assert.match(authorPcReadme, /選択中.*Provider.*入力ダイアログ.*自動/s);
  assert.match(authorPcReadme, /APIキー値.*表示.*記録/s);

  const combinedText = Buffer.concat([...files.values()].filter((value) => value.length < 200_000)).toString('utf8');
  assert.doesNotMatch(combinedText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
  const nestedText = Buffer.concat([...nanoArchive.values()]).toString('utf8');
  assert.doesNotMatch(nestedText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('README keeps the custom-node-first installation contract in sync with STEP4', () => {
  assert.match(readmeSource, /Fused Turbo.*Spectrum.*SLA.*8 steps/s);
  assert.match(readmeSource, /SpectrumApplyMiniMaxH3/);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3.*ComfyUI-Spectrum-MiniMax-H3.*ComfyUI-PlagueKind-Nodes.*ComfyUI-MiniMax-H3-MotionCache-FastVAE/s);
  assert.match(readmeSource, /minimax_h3_video_vae_int8_convrot\.safetensors/);
  assert.match(readmeSource, /ComfyUI\/custom_nodes\//);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3/);
  assert.match(readmeSource, /🔐 APIキー未登録／登録/);
  assert.match(readmeSource, /NanoBananaH3Transform/);
  assert.match(readmeSource, /DeterministicTitleWatermarkOverlay/);
  assert.match(readmeSource, /DeterministicEndCreditOverlay/);
  assert.match(readmeSource, /黒字＋白縁・背景バーなし/);
  assert.match(readmeSource, /固定クレジット/);
  assert.match(readmeSource, /RES Multistep.*Simple.*8 steps/s);
  assert.match(readmeSource, /手動.*標準.*normal/s);
  assert.match(readmeSource, /(?:OpenAI API.*Google Gemini API|Google Gemini API.*OpenAI API)/s);
  assert.doesNotMatch(readmeSource, /ComfyUI API/);
  assert.match(readmeSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.match(readmeSource, /ワークフローのシート移動.*残/);
  assert.match(readmeSource, /ワークフロー読込時.*選択中.*Provider.*未登録.*入力ダイアログ.*自動/s);
  assert.match(readmeSource, /ComfyUIアプリ／サーバーを終了または再起動すると消去/);
  assert.doesNotMatch(readmeSource, /nanobanana_h3_credentials\.json|暗号化.*されません/);
  assert.match(readmeSource, /MiniMax-H3-4Koma-15s-FusedTurbo-Spectrum-SLA-Bundle-2026-09-03\.zip/);
  assert.match(readmeSource, /Super-FURU-AI-4koma-H3-FusedTurbo-Spectrum-SLA-8step-v1\.json/);
  assert.match(readmeSource, /同名の旧版.*フォルダ単位で差し替え/s);
  assert.match(readmeSource, /新旧.*混在させません/);
  assert.match(readmeSource, /user\/default\/workflows/);
  assert.match(readmeSource, /gemini-3\.1-flash-image.*gemini-2\.5-flash/s);
  assert.match(readmeSource, /gpt-image-2.*gpt-4\.1-mini/s);
});

test('every distributed workflow describes process-memory-only API credentials', () => {
  const workflowFiles = readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'));
  assert.ok(workflowFiles.length > 0);
  for (const entry of workflowFiles) {
    const workflowText = readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8');
    assert.doesNotMatch(
      workflowText,
      /nanobanana_h3_credentials\.json|暗号化なしで保存|stored locally without encryption/,
      `${entry.name} must not describe disk-persisted credentials`,
    );
  }
});
