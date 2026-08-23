import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { inflateRawSync } from 'node:zlib';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const workflowUrl = new URL(
  '../public/workflows/Super-FURU-AI-4koma-H3-Turbo-v4-LoRA-8step.json',
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

test('STEP4 exposes the shared custom node before the Turbo LoRA workflow JSON as separate direct downloads', () => {
  assert.match(step4PanelSource, /MiniMax H3・ComfyUI用プロンプトをコピー[\s\S]*Nano Banana-H3 カスタムノードをダウンロード[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /const COMFYUI_WORKFLOW_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}workflows\/\$\{COMFYUI_WORKFLOW_FILENAME\}`;/);
  assert.match(step4PanelSource, /const COMFYUI_CUSTOM_NODE_DOWNLOAD_URL = `\$\{import\.meta\.env\.BASE_URL\}downloads\/\$\{COMFYUI_CUSTOM_NODE_FILENAME\}`;/);
  assert.doesNotMatch(step4PanelSource, /raw\.githubusercontent\.com\/FURUYAN1234\/nano-banana-pro/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_WORKFLOW_FILENAME\}[\s\S]*role="button"[\s\S]*ComfyUIワークフローJSONをダウンロード/);
  assert.match(step4PanelSource, /<a[\s\S]*href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*download=\{COMFYUI_CUSTOM_NODE_FILENAME\}[\s\S]*role="button"[\s\S]*Nano Banana-H3 カスタムノードをダウンロード/);
  assert.doesNotMatch(step4PanelSource, /const downloadComfyUIWorkflow = \(\) =>/);
  assert.doesNotMatch(step4PanelSource, /anchor\.click\(\)/);
  assert.match(step4PanelSource, /ComfyUI標準テンプレートを自分で使う場合/);
  assert.match(step4PanelSource, /Turbo LoRA専用ワークフローを使う場合/);
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
  assert.match(step4PanelSource, /APIキーはワークフローJSONや配布ZIPには保存されません/);
  assert.match(step4PanelSource, /MiniMax H3の本体モデル・テキストエンコーダ・映像VAE・音声VAE/);
  assert.match(step4PanelSource, /NanoBananaH3Transform[\s\S]*DeterministicTitleWatermarkOverlay[\s\S]*DeterministicEndCreditOverlay/);
  assert.match(step4PanelSource, /実際のサンプリング設定は4 stepsではなく8 steps/);
  assert.match(step4PanelSource, /overlay_title.*動画生成後.*一度だけ/s);
  assert.match(step4PanelSource, /黒字＋白縁、背景バーなし/);
  assert.match(step4PanelSource, /APIキー・認証情報・モデル・LoRA・漫画画像・生成動画は配布物に含まれません/);
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

test('distributed Turbo v4 LoRA workflow has the supplied 8-step sampling and compositing contract', () => {
  assert.equal(existsSync(workflowUrl), true, 'ComfyUI workflow JSON must be distributed from public/workflows');
  if (!existsSync(workflowUrl)) return;

  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), 'c35bac4b788fbd17166ef3c10bd3e36b3fa7784800f2ec5dfc38f37511aba42f');
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
  assert.match(workflowText, /8 steps — Recommended/);
  assert.doesNotMatch(workflowText, /4 steps —|6 steps —/);
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
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/__init__.py')), 'e5edbbca99f4682b20aeb6e00347cc06afeb6a8d4bb830ac1874fc4463fa9a99');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/h3_prompt_system.txt')), '2ffe02dd6e5006dc37ff653f3ae5e4d6b265d7199e23d5af6694221643dda3c2');
  assert.equal(hashBytes(files.get('ComfyUI-NanoBanana-H3/web/nanobanana_h3.js')), '4beabe1a66efb6cbd6c371ccf2a64ca461af3d6419220b59ae9f025e3f933669');
  assert.doesNotMatch([...files.keys()].join('\n'), /(?:^|\/)(__pycache__|[^/]+\.(?:pyc|bak))(?:\/|$)/i);

  const combinedText = Buffer.concat([...files.values()]).toString('utf8');
  assert.doesNotMatch(combinedText, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
  assert.match(combinedText, /OpenAI API/);
  assert.match(combinedText, /Google Gemini API/);
  assert.doesNotMatch(combinedText, /ComfyUI API/);
  assert.match(combinedText, /overlay_title/);
  assert.match(combinedText, /panel_cast\[1\]/);
  assert.match(combinedText, /do not assume that a person appears in every panel or in the final panel/);
  assert.match(combinedText, /without inventing a global cast requirement/);
});

test('custom node fails closed when overlay_title metadata is absent, malformed, duplicated, or a placeholder', () => {
  const files = readZipFiles(customNodeZipUrl);
  const initSource = files.get('ComfyUI-NanoBanana-H3/__init__.py');
  const probe = String.raw`
import ast, json, re, sys
source = sys.stdin.buffer.read().decode("utf-8")
tree = ast.parse(source)
selected = []
for node in tree.body:
    if isinstance(node, ast.Assign) and any(
        isinstance(target, ast.Name) and target.id in {"_OVERLAY_TITLE_RE", "_OVERLAY_TITLE_PLACEHOLDER"}
        for target in node.targets
    ):
        selected.append(node)
    if isinstance(node, ast.FunctionDef) and node.name == "_split_h3_prompt_and_title":
        selected.append(node)
namespace = {"re": re}
exec(compile(ast.Module(body=selected, type_ignores=[]), "<distributed-node>", "exec"), namespace)
split = namespace["_split_h3_prompt_and_title"]
valid_prompt, valid_title = split('overlay_title: "正しい題名"\n\nsubject_definitions:\n<Picture 1>')
results = {"valid_title": valid_title, "valid_removed": "overlay_title" not in valid_prompt}
for name, value in {
    "empty": "",
    "missing": "subject_definitions:\n<Picture 1>",
    "unquoted": "overlay_title: 正しい題名\nsubject_definitions:\n<Picture 1>",
    "duplicate": 'overlay_title: "題名1"\noverlay_title: "題名2"\nsubject_definitions:\n<Picture 1>',
    "placeholder": 'overlay_title: "<the exact Japanese manga title copied from the supplied image>"\nsubject_definitions:\n<Picture 1>',
}.items():
    try:
        split(value)
        results[name] = "accepted"
    except RuntimeError:
        results[name] = "rejected"
print(json.dumps(results, ensure_ascii=True))
`;
  const run = spawnSync('python', ['-c', probe], { input: initSource, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(JSON.parse(run.stdout), {
    valid_title: '正しい題名',
    valid_removed: true,
    empty: 'rejected',
    missing: 'rejected',
    unquoted: 'rejected',
    duplicate: 'rejected',
    placeholder: 'rejected',
  });
});

test('README keeps the custom-node-first installation contract in sync with STEP4', () => {
  assert.match(readmeSource, /Turbo v4 LoRA.*8 steps/s);
  assert.match(readmeSource, /ComfyUI\/custom_nodes\/ComfyUI-NanoBanana-H3\//);
  assert.match(readmeSource, /🔐 APIキー未登録／登録/);
  assert.match(readmeSource, /NanoBananaH3Transform/);
  assert.match(readmeSource, /DeterministicTitleWatermarkOverlay/);
  assert.match(readmeSource, /DeterministicEndCreditOverlay/);
  assert.match(readmeSource, /黒字＋白縁・背景バーなし/);
  assert.match(readmeSource, /固定クレジット/);
  assert.match(readmeSource, /Turbo v4 LoRA.*強度.*1\.0.*Euler.*Beta.*8 steps/s);
  assert.match(readmeSource, /手動.*標準.*normal/s);
  assert.match(readmeSource, /OpenAI API.*Google Gemini API/s);
  assert.doesNotMatch(readmeSource, /ComfyUI API/);
  assert.match(readmeSource, /ComfyUI\/user\/nanobanana_h3_credentials\.json/);
  assert.match(readmeSource, /暗号化.*されません/);
  assert.match(readmeSource, /多くの場合/);
});
