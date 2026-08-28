import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const workflowUrl = new URL(
  '../public/workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json',
  import.meta.url,
);
const customNodeZipUrl = new URL(
  '../public/downloads/ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip',
  import.meta.url,
);
const publishedAttributesUrl = new URL('../public/.gitattributes', import.meta.url);

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

test('STEP4 exposes the shared custom node before the latest workflow JSON as separate direct downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*Nano Bananaカスタムノードをダウンロード[\s\S]*最新版・最強版ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /const COMFYUI_WORKFLOW_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}workflows\/\$\{COMFYUI_WORKFLOW_FILENAME\}`;/);
  assert.match(step4PanelSource, /const COMFYUI_CUSTOM_NODE_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}downloads\/\$\{COMFYUI_CUSTOM_NODE_FILENAME\}`;/);
  assert.doesNotMatch(step4PanelSource, /raw\.githubusercontent\.com\/FURUYAN1234\/nano-banana-pro/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_WORKFLOW_FILENAME\}[\s\S]*role="button"[\s\S]*最新版・最強版ワークフローをダウンロード/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_CUSTOM_NODE_FILENAME\}[\s\S]*role="button"[\s\S]*Nano Bananaカスタムノードをダウンロード/);
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
  assert.match(step4PanelSource, /ComfyUI\/user\/nanobanana_h3_credentials\.json/);
  assert.match(step4PanelSource, /暗号化されません/);
  assert.match(step4PanelSource, /多くの場合/);
  assert.match(step4PanelSource, /Turbo v4 LoRA.*強度.*1\.0.*Euler.*Beta.*8 steps/s);
  assert.match(step4PanelSource, /カスタムノードは標準版・Turbo LoRA版で共通/);
  assert.match(step4PanelSource, /JSONだけでは実行できません/);
  assert.match(step4PanelSource, /ComfyUI\/custom_nodes\/ComfyUI-NanoBanana-H3\//);
  assert.match(step4PanelSource, /ComfyUIを完全に再起動/);
  assert.match(step4PanelSource, /🔐 APIキー未登録／登録/);
  assert.match(step4PanelSource, /APIキーはワークフローJSONや配布ZIPには保存されず/);
  assert.match(step4PanelSource, /Turbo v4 LoRAの不足項目に <code>Download<\/code> が表示/);
  assert.match(step4PanelSource, /NanoBananaH3Transform[\s\S]*DeterministicTitleWatermarkOverlay[\s\S]*DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /実際のサンプリング設定は4 stepsではなく8 steps/);
  assert.match(step4PanelSource, /overlay_title.*動画生成後.*一度だけ/s);
  assert.match(step4PanelSource, /黒字＋白縁、背景バーなし/);
  assert.match(step4PanelSource, /APIキー・認証情報・モデル・LoRA・漫画画像・生成動画は配布物に含まれません/);
  assert.match(step4PanelSource, /配布元のライセンスに同意して取得/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3-Latest-2026-08-26\.zip/);
  assert.match(step4PanelSource, /Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1\.json/);
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

test('distributed Turbo v4 LoRA workflow has the supplied 8-step sampling and compositing contract', () => {
  assert.equal(existsSync(workflowUrl), true, 'ComfyUI workflow JSON must be distributed from public/workflows');
  if (!existsSync(workflowUrl)) return;

  const bytes = readFileSync(workflowUrl);
  assert.equal(
    readFileSync(publishedAttributesUrl, 'utf8').includes(
      'workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json -text',
    ),
    true,
    'the published Git attributes must preserve the supplier workflow bytes',
  );
  assert.match(
    packageJson.scripts.deploy,
    /gh-pages -d dist --dotfiles/,
    'the static deploy must include the published Git attributes file',
  );
  assert.equal(hashBytes(bytes), 'c43a72ee7853ba7066ea09f660674698aa9efb15628611f48d4b9c24493727bc');
  const workflow = JSON.parse(bytes.toString('utf8'));
  const workflowText = bytes.toString('utf8');
  assert.equal(workflow.nodes.length, 27);
  assert.equal(workflow.links.length, 31);
  assert.ok(!workflow.nodes.some((node) => node.type === 'PreviewImage'));
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'BasicScheduler')?.widgets_values,
    ['beta', 8, 1],
  );
  assert.deepEqual(workflow.nodes.find((node) => node.type === 'KSamplerSelect')?.widgets_values, ['euler']);
  assert.deepEqual(
    workflow.nodes.find((node) => node.type === 'LoraLoaderModelOnly')?.widgets_values,
    ['minimax_h3_turbo_v4_step600_ema_pruned_comfyui.safetensors', 1],
  );
  assert.ok(workflow.nodes.some((node) => node.type === 'NanoBananaH3Transform'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicTitleWatermarkOverlay'));
  assert.ok(workflow.nodes.some((node) => node.type === 'DeterministicEndCreditOverlay'));
  assert.deepEqual(
    workflow.nodes
      .filter((node) => node.type === 'MarkdownNote')
      .map((node) => node.title)
      .filter((title) => ['配布前の必須環境・モデル配置', '解像度早見表'].includes(title))
      .sort(),
    ['解像度早見表', '配布前の必須環境・モデル配置'].sort(),
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
  assert.equal(hasLink('LoraLoaderModelOnly', 0, 'BasicScheduler', 0), true);
  assert.equal(hasLink('LoraLoaderModelOnly', 0, 'BasicGuider', 0), true);
  assert.equal(hasLink('NanoBananaH3Transform', 0, 'MiniMaxH3ReferenceToVideo', 3), true);
  assert.equal(hasLink('NanoBananaH3Transform', 1, 'MiniMaxH3ReferenceToVideo', 8), true);
  assert.equal(hasLink('NanoBananaH3Transform', 2, 'DeterministicTitleWatermarkOverlay', 2), true);
  assert.equal(hasLink('DeterministicTitleWatermarkOverlay', 0, 'DeterministicEndCreditOverlay', 0), true);
  assert.equal(hasLink('DeterministicEndCreditOverlay', 0, 'CreateVideo', 0), true);
  assert.match(workflowText, /Turbo v4 LoRA.*`8` steps/s);
  assert.doesNotMatch(workflowText, /4 steps —|6 steps —/);
});

test('distributed H3 workflow embeds verified one-click metadata and bilingual FURU four-panel guidance', () => {
  const workflow = JSON.parse(readFileSync(workflowUrl, 'utf8'));
  const modelEntries = workflow.nodes.flatMap((node) => node.properties?.models ?? []);

  assert.deepEqual(modelEntries, [
    {
      name: 'minimax_h3_video_vae_fp16.safetensors',
      url: 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_video_vae_fp16.safetensors?download=true',
      hash: '7c1f131492e7eddacaac9069a61b81bdd39de5cc96561e677c5eab1cdce5e522',
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
      name: 'minimax_h3_hybrid_fl2va_ref2va_b25-49-int8.safetensors',
      url: 'https://huggingface.co/smhfacct/Minimax-H3-fl2va-ref2va-hybrid-models/resolve/main/minimax_h3_hybrid_fl2va_ref2va_b25-49-int8.safetensors?download=true',
      hash: 'a629cfea8d89a071b140c6e1935dc9a23e72de6badc18975a2bb9e6d1423d76d',
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
    {
      name: 'minimax_h3_turbo_v4_step600_ema_pruned_comfyui.safetensors',
      url: 'https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI/resolve/main/minimax_h3_turbo_v4_step600_ema_pruned_comfyui.safetensors?download=true',
      hash: '7098acf3ee75028fd9fcd948f50fcc8d995057fabb76f86bd3ca2c0ffc58e409',
      hash_type: 'SHA256',
      directory: 'loras',
    },
  ]);

  const workflowText = readFileSync(workflowUrl, 'utf8');
  assert.match(workflowText, /FURU four-panel manga to video/);
  assert.match(workflowText, /FURUの4コマ漫画を動画化/);
  assert.match(workflowText, /Open this workflow: missing H3 model cards show Download/);
  assert.match(workflowText, /ワークフローを開くと不足モデルにDownloadが表示/);
  assert.match(step4PanelSource, /FURU four-panel manga to video/);
  assert.match(step4PanelSource, /FURUの4コマ漫画を動画化/);
  assert.match(readmeSource, /FURU four-panel manga to video/);
  assert.match(readmeSource, /FURUの4コマ漫画を動画化/);
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
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/__init__.py')), 'a370f1cfaafe22d9d34629c356f86f999aa02079d98431ff94f91c9e23dfec6c');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/h3_prompt_system.txt')), '8c44135df96071ef16c122cdc93f44845b744600367cdfbec46684aa5d992eaf');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/web/nanobanana_h3.js')), '4beabe1a66efb6cbd6c371ccf2a64ca461af3d6419220b59ae9f025e3f933669');
  assert.doesNotMatch([...files.keys()].join('\n'), /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak))(?:\/|$)/i);

  const combinedText = Buffer.concat([...files.values()]).toString('utf8');
  assert.doesNotMatch(combinedText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('README keeps the custom-node-first installation contract in sync with STEP4', () => {
  assert.match(readmeSource, /Turbo v4 LoRA.*8 steps/s);
  assert.match(readmeSource, /ComfyUI\/custom_nodes\//);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3/);
  assert.match(readmeSource, /🔐 APIキー未登録／登録/);
  assert.match(readmeSource, /NanoBananaH3Transform/);
  assert.match(readmeSource, /DeterministicTitleWatermarkOverlay/);
  assert.match(readmeSource, /DeterministicEndCreditOverlay/);
  assert.match(readmeSource, /黒字＋白縁・背景バーなし/);
  assert.match(readmeSource, /固定クレジット/);
  assert.match(readmeSource, /Turbo v4 LoRA.*強度.*1\.0.*Euler.*Beta.*8 steps/s);
  assert.match(readmeSource, /手動.*標準.*normal/s);
  assert.match(readmeSource, /(?:OpenAI API.*Google Gemini API|Google Gemini API.*OpenAI API)/s);
  assert.doesNotMatch(readmeSource, /ComfyUI API/);
  assert.match(readmeSource, /ComfyUI\/user\/nanobanana_h3_credentials\.json/);
  assert.match(readmeSource, /暗号化.*されません/);
  assert.match(readmeSource, /多くの場合/);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3-Latest-2026-08-26\.zip/);
  assert.match(readmeSource, /Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1\.json/);
  assert.match(readmeSource, /同名の旧版.*フォルダ単位で差し替え/s);
  assert.match(readmeSource, /新旧.*混在させません/);
  assert.match(readmeSource, /user\/default\/workflows/);
  assert.match(readmeSource, /gemini-3\.1-flash-image.*gemini-2\.5-flash/s);
  assert.match(readmeSource, /gpt-image-2.*gpt-4\.1-mini/s);
});
