import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { inflateRawSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const standardH3PromptSource = readFileSync(new URL('../src/lib/minimax-h3-prompt.js', import.meta.url), 'utf8');
const readmeSource = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const releaseContract = JSON.parse(readFileSync(new URL('../../scripts/release-apps.json', import.meta.url), 'utf8'));
const workflowUrl = process.env.H3_WORKFLOW_JSON ? pathToFileURL(process.env.H3_WORKFLOW_JSON) : new URL('../public/workflows/FourPanel_NonLM_4step_20261002-071924.json', import.meta.url);
const customNodeZipUrl = process.env.H3_CUSTOM_NODE_ZIP ? pathToFileURL(process.env.H3_CUSTOM_NODE_ZIP) : new URL('../.release-assets/ComfyUI_H3_FourPanel_NonLM_20261002-071924_authfix1.zip', import.meta.url);
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

test('distributed authentication accepts every global and individual model while rejecting unknown selections', () => {
  const archive = readZipFilesFromBuffer(readFileSync(customNodeZipUrl));
  const source = (suffix) => [...archive].find(([name]) => name.endsWith(suffix))?.[1].toString('utf8');
  const settings = source('/ComfyUI-NanoBanana-H3/model_settings.py');
  const server = source('/ComfyUI-NanoBanana-H3/__init__.py');
  const browser = source('/web/nanobanana_h3_dialogue_contract_v1.js');
  assert.ok(settings && server && browser, 'the distributed authentication contract must be complete');
  const python = (script, payload) => {
    const result = spawnSync('python', ['-B', '-c', script], {
      input: JSON.stringify(payload), encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
    });
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return JSON.parse(result.stdout);
  };
  const presets = python(`import ast,json,sys
t=ast.parse(json.load(sys.stdin)['settings'])
print(json.dumps(next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='PRESETS' for x in n.targets))))`, { settings });
  let preset;
  const context = { app: { registerExtension() {}, graph: {
    links: { 1: { origin_id: 7 } }, getNodeById() { return { widgets: [{ name: 'preset', value: preset }] }; },
  } }, api: {} };
  runInNewContext(browser.replace(/^import .*;\s*$/gm, ''), context);
  const cases = [];
  for (const [label, model] of Object.entries(presets)) {
    if (model == null) continue;
    preset = label;
    for (const mode of ['individual', 'global']) {
      const node = { widgets: [{ name: 'text_model', value: mode === 'global' ? '一括設定に従う' : model }], inputs: [{ name: 'api_models', link: 1 }] };
      cases.push({ mode, expected: model, selection: context.selectedVerificationModel(node) });
    }
  }
  assert.equal(cases.length, 48, 'all 24 advertised models need both authentication paths');
  preset = 'unknown-preset';
  assert.equal(context.selectedVerificationModel({ widgets: [], inputs: [{ name: 'api_models', link: 1 }] }), 'unknown-preset', 'unknown global choices must reach the rejecting server boundary, never silently become the legacy model');
  const result = python(`import ast,asyncio,json,re,sys,types
p=json.load(sys.stdin); settings={};exec(compile(p['settings'],'model_settings.py','exec'),settings)
t=ast.parse(p['server']); names={'_sanitize_api_key','_credential','_set_session_credential','_session_credential_configured','save_credential','credential_status'}
functions=[n for n in t.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef)) and n.name in names]
for n in functions:n.decorator_list=[]
program=compile(ast.fix_missing_locations(ast.Module(body=functions,type_ignores=[])),'distributed_credential.py','exec')
token='synthetic-unit-test-placeholder-only'; calls=[]
class Web:
 @staticmethod
 def json_response(body,status=200):return {'status':status,'body':body}
class Request:
 def __init__(self,body=None,query=None):self.body=body;self.query=query or {}
 async def json(self):return self.body
def validate(provider,key,model):calls.append((provider,model))
def fresh():
 n={'re':re,'asyncio':asyncio,'web':Web,'model_settings':types.SimpleNamespace(**settings),'_SESSION_CREDENTIALS':{},'_LAST_CREDENTIAL_PROVIDER':None,'_UNIFIED_SLOT':'workflow_api','_PROVIDERS':('OpenAI API','Google Gemini API'),'_SLOT_RE':re.compile(r'^[A-Za-z0-9_-]+$'),'_validate_credential':validate};exec(program,n);return n
def invoke(selection,provider='OpenAI API'):
 n=fresh(); before=len(calls);result=asyncio.run(n['save_credential'](Request({'provider':provider,'slot':'workflow_api','api_key':token,'model':selection})))
 assert token not in json.dumps(result),'response disclosed a synthetic credential'
 return n,result,calls[before:]
for c in p['cases']:
 n,r,used=invoke(c['selection']);assert r['status']==200,(c['mode'],c['expected'],r['status'])
 assert used==[('OpenAI API',c['expected'])],(c['mode'],c['expected'],'wrong verification model')
 assert r['body']['verification_model']==c['expected']
 assert n['_credential']('OpenAI API')==token
for selection in [None,'現行互換']:
 n,r,used=invoke(selection);assert r['status']==200 and used==[('OpenAI API',None)]
for selection in ['unknown-model','unknown-preset','一括設定に従う',123,{},[]]:
 n,r,used=invoke(selection);assert r['status']==400 and not used and not n['_SESSION_CREDENTIALS']
n,r,used=invoke('gpt-6-luna','Google Gemini API');assert r['status']==400 and not used
n,r,used=invoke(None,'Google Gemini API');assert r['status']==200 and used==[('Google Gemini API',None)]
n=fresh();n['_set_session_credential']('OpenAI API','workflow_api',token)
assert n['_session_credential_configured']('OpenAI API','workflow_api')
assert not n['_session_credential_configured']('Google Gemini API','workflow_api')
assert not fresh()['_session_credential_configured']('OpenAI API','workflow_api')
r=asyncio.run(n['credential_status'](Request(query={'provider':'OpenAI API','slot':'workflow_api'})))
assert r['body']=={'configured':True,'provider':'OpenAI API','slot':'workflow_api','storage':'process_memory'} and token not in json.dumps(r)
print(json.dumps({'model_paths':len(p['cases']),'negative_cases':7,'memory_and_status':True}))`, { settings, server, cases });
  assert.deepEqual(result, { model_paths: 48, negative_cases: 7, memory_and_status: true });
});

test('STEP4 provides the generic standard-H3 prompt and separate current Fused4 SLA downloads', () => {
  assert.match(step4PanelSource, /標準H3・汎用プロンプトをコピー[\s\S]*同梱カスタムノード3点・導入セットをダウンロード[\s\S]*Fused4step・SLA ワークフローをダウンロード/);
  assert.match(step4PanelSource, /COMFYUI_WORKFLOW_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /COMFYUI_CUSTOM_NODE_DOWNLOAD_URL/);
  assert.match(step4PanelSource, /href=\{COMFYUI_CUSTOM_NODE_DOWNLOAD_URL\}[\s\S]*?download=\{COMFYUI_CUSTOM_NODE_FILENAME\}/);
  assert.match(step4PanelSource, /href=\{COMFYUI_WORKFLOW_DOWNLOAD_URL\}[\s\S]*?download=\{COMFYUI_WORKFLOW_FILENAME\}/);
  assert.notEqual(workflowUrl.pathname, customNodeZipUrl.pathname, 'the two downloads must target different files');
  assert.match(step4PanelSource, /FourPanel_NonLM_4step_20261002-071924\.json/);
  assert.match(step4PanelSource, /ComfyUI_H3_FourPanel_NonLM_20261002-071924_authfix1\.zip/);
  assert.match(step4PanelSource, /github\.com\/FURUYAN1234\/nano-banana-pro\/releases\/download\/\$\{SYSTEM_VERSION\}/);
  assert.match(step4PanelSource, /ComfyUI-NanoBanana-H3.*ComfyUI-MiniMax-H3-Long-Video.*ComfyUI-Spectrum-MiniMax-H3/s);
  assert.match(step4PanelSource, /軽く要約＋必要な台詞だけ延長.*基本5秒.*最大15秒.*台詞がない場合だけ既定30秒/s);
  assert.match(step4PanelSource, /Fused 4ステップ.*音声再精錬.*4ステップ.*denoise 1\.0.*独立したBGM作曲・合成ノードは含みません/s);
  assert.match(step4PanelSource, /28ノード.*quality_status: needs_review/s);
  assert.match(step4PanelSource, /一括設定または個別設定.*接続確認にも選択中のモデル/s);
  assert.match(step4PanelSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes/s);
  assert.match(step4PanelSource, /ComfyUI-H3-AudioRefine.*Triton|Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(step4PanelSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(step4PanelSource, /https:\/\/github\.com\/PlagueKind\/ComfyUI-PlagueKind-Nodes/);
  assert.match(step4PanelSource, /区間.*生成.*検査.*最大5候補/s);
  assert.match(step4PanelSource, /MIT.*GPL-3\.0-only.*GPL-3\.0-or-later/s);
  assert.match(step4PanelSource, /接続中のComfyUIサーバーのプロセスメモリ/);
  assert.doesNotMatch(step4PanelSource, /ComfyUI API/);
  assert.match(step4PanelSource, /初回込み最大5候補/);
  assert.match(step4PanelSource, /途中.*合格.*即.*進/);
  assert.match(step4PanelSource, /全候補.*不合格.*最良/);
  assert.match(step4PanelSource, /3フォルダ.*同梱/);
  assert.match(step4PanelSource, /ComfyUI-PlagueKind-Nodes.*ComfyUI-H3-AudioRefine.*Triton.*別途/s);
  assert.match(step4PanelSource, /画像前処理.*APIによる台詞抽出・読み確認.*行ごとの自動可変尺.*候補比較.*音声・映像監査.*終端波形修復/s);
  assert.match(step4PanelSource, /標準版.*画像.*台詞.*秒数.*フレーム数.*手動/s);
  assert.match(step4PanelSource, /README\.md.*VALIDATION\.md/s);
  assert.equal([...step4PanelSource.matchAll(/style=\{H3_ACTION_BUTTON_STYLE\}/g)].length, 3);
});

test('standard H3 clipboard prompt is generic and carries transferable four-panel know-how', () => {
  assert.match(standardH3PromptSource, /STANDARD H3 FOUR-PANEL AUTHORING PROMPT v5\.9\.9/);
  assert.match(standardH3PromptSource, /panel_cast\[1\].*panel_cast\[2\].*panel_cast\[3\].*panel_cast\[4\]/s);
  assert.match(standardH3PromptSource, /derive.*attached.*four-panel manga/s);
  assert.match(standardH3PromptSource, /one active speaker.*one dialogue window/s);
  assert.match(standardH3PromptSource, /silent buffer.*before.*after/s);
  assert.match(standardH3PromptSource, /low-volume instrumental BGM/s);
  assert.match(standardH3PromptSource, /fixed total duration.*output frames/s);
  assert.match(standardH3PromptSource, /cannot automate.*image preprocessing.*API dialogue extraction.*reading review.*candidate comparison.*audio.*video audit.*waveform-tail repair/s);
  assert.match(standardH3PromptSource, /4–15 seconds/);
  assert.match(standardH3PromptSource, /\[Shot 1\].*no timestamp.*\[Shot N\] At MM:SS\.mmm/s);
  assert.match(standardH3PromptSource, /preserve.*word.*punctuation.*verbatim/is);
  assert.match(standardH3PromptSource, /motion type.*amplitude.*speed/s);
  assert.match(standardH3PromptSource, /350–500 English words/);
  assert.match(standardH3PromptSource, /subject_definitions:[\s\S]*summary:[\s\S]*retention_analysis:[\s\S]*detailed_description:[\s\S]*overall_soundscape:[\s\S]*non_diegetic_music:/);
  assert.doesNotMatch(standardH3PromptSource, /アカリ|ヒカリ|ミク|リン|サエコ|ビデオデッキ/);
});

test('supplied current Fused4 SLA workflow bytes and graph are preserved', () => {
  assert.equal(existsSync(workflowUrl), true, 'workflow JSON must be distributed from public/workflows');
  const bytes = readFileSync(workflowUrl);
  assert.equal(hashBytes(bytes), 'cad9cb67c7138deb14588f567b8dda5f06c0862ea6b787a1cd12faa55dba45d0');
  assert.doesNotMatch(readFileSync(sourceAttributesUrl, 'utf8'), /public\/downloads\/.*\.zip/);
  assert.match(readFileSync(publishedAttributesUrl, 'utf8'), /workflows\/FourPanel_NonLM_4step_20261002-071924\.json -text/);
  assert.doesNotMatch(readFileSync(publishedAttributesUrl, 'utf8'), /downloads\/.*\.zip/);
  assert.match(packageJson.scripts.deploy, /gh-pages -d dist --dotfiles/);
  const workflow = JSON.parse(bytes.toString('utf8'));
  assert.equal(workflow.nodes.length, 28);
  assert.equal(workflow.links.length, 36);
  for (const type of ['MiniMaxH3CloudPrompt', 'MiniMaxH3LongReferenceSampler', 'TimestampedSaveVideo', 'NanoBananaH3Transform', 'JapaneseDialoguePronunciationReview', 'DeterministicTitleWatermarkOverlay', 'DeterministicEndCreditOverlay', 'H3SLAAttention', 'H3APIModelSettings']) assert.ok(workflow.nodes.some((node) => node.type === type), `${type} must be present`);
  assert.equal(workflow.nodes.some(node => ['H3SeparateMusicPlan', 'H3ContinuousBGM'].includes(node.type)), false, 'the supplied graph has no independent BGM composition/mixing path');
  assert.deepEqual(workflow.nodes.find(node => node.type === 'H3APIModelSettings').widgets_values, ['GPT-6 Luna', '無効']);
  const text = bytes.toString('utf8');
  assert.match(text, /5秒/);
  assert.match(text, /軽く要約＋必要な台詞だけ延長/);
  assert.match(text, /30秒/);
  assert.match(text, /latest_saved_video_url/);
  assert.equal(workflow.extra.h3_generated_bgm.separate_composer_connected, false);
  assert.equal(workflow.extra.production_approval.all_content_verified, false, 'content warnings must remain visible');
  const longVideoNode = workflow.nodes.find((node) => node.type === 'MiniMaxH3LongReferenceSampler');
  assert.equal(longVideoNode.widgets_values[13], 4, 'the supplied sampler must preserve four generation steps');
  assert.equal(longVideoNode.widgets_values[14], 1, 'the supplied sampler must preserve full denoise');
  for (const url of ['https://huggingface.co/Kijai/MiniMax-H3-experimental/resolve/main/minimax_h3_video_vae_int8_convrot.safetensors', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors', 'https://huggingface.co/MATLOWAI/minimax-h3-fused-turbo-int8-convrot/resolve/main/diffusion_models/minimax_h3_fused_refdelta_r1024_turbo8_mystic07_int8_convrot.safetensors', 'https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors']) assert.match(text, new RegExp(url.replace(/[.?]/g, '\\$&')));
  assert.doesNotMatch(text, /AIza[0-9A-Za-z_-]{20,}|sk-[0-9A-Za-z_-]{20,}|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY/);
});

test('release asset preserves the supplied timestamped distribution manifest, licensing, verifier, and no credential artifact', () => {
  assert.equal(existsSync(customNodeZipUrl), true, 'custom-node bundle must be staged outside the Git source tree');
  const bundleBytes = readFileSync(customNodeZipUrl);
  assert.equal(hashBytes(bundleBytes), '341487084ffc48f14569609c36557d77b4770a052b70f2323488dc0604e6d7f0');
  const releaseAsset = releaseContract.apps.find(app => app.id === 'nano-banana-pro')?.releaseAssets?.[0];
  assert.equal(releaseAsset?.path, '.release-assets/ComfyUI_H3_FourPanel_NonLM_20261002-071924_authfix1.zip');
  assert.equal(releaseAsset?.name, 'ComfyUI_H3_FourPanel_NonLM_20261002-071924_authfix1.zip');
  const files = new Map([...readZipFilesFromBuffer(bundleBytes)].map(([name, content]) => [name.replace(/^ComfyUI_H3_FourPanel_NonLM_20261002-071924\//, ''), content]));
  const expected = [
    'VERSION.json', 'models.json', 'README.md', 'VALIDATION.md', 'verify_package.py', 'SHA256SUMS.json', 'LICENSES_AND_NOTICES.md', 'workflows/FourPanel_NonLM_4step_20261002-071924.json',
    'custom_nodes/ComfyUI-NanoBanana-H3/LICENSE', 'custom_nodes/ComfyUI-NanoBanana-H3/__init__.py', 'custom_nodes/ComfyUI-NanoBanana-H3/web/nanobanana_h3_dialogue_contract_v1.js',
    'custom_nodes/ComfyUI-MiniMax-H3-Long-Video/LICENSE', 'custom_nodes/ComfyUI-MiniMax-H3-Long-Video/minimax_h3_long_video/nodes.py',
    'custom_nodes/ComfyUI-Spectrum-MiniMax-H3/LICENSE', 'custom_nodes/ComfyUI-Spectrum-MiniMax-H3/comfyui_spectrum_h3/nodes.py',
  ];
  for (const name of expected) assert.ok(files.has(name), `${name} must be present`);
  for (const name of ['custom_nodes/ComfyUI-NanoBanana-H3/speaker_audit.py', 'licenses/MINIMAX_H3_LICENSE.txt', 'licenses/NOTICE.txt']) assert.ok(files.has(name), `${name} must be present`);
  assert.match(step4PanelSource, /採用済みでも全検査合格とは限りません/);
  assert.match(readmeSource, /採用済みでも全検査合格とは限りません/);
  assert.equal(hashBytes(files.get('workflows/FourPanel_NonLM_4step_20261002-071924.json')), 'cad9cb67c7138deb14588f567b8dda5f06c0862ea6b787a1cd12faa55dba45d0');
  const license = files.get('custom_nodes/ComfyUI-NanoBanana-H3/LICENSE').toString('utf8');
  assert.match(license, /MIT License/);
  assert.equal(files.has('custom_nodes/ComfyUI-H3-AudioRefine/LICENSE'), false, 'AudioRefine is a separately required dependency');
  assert.equal(files.has('custom_nodes/ComfyUI-PlagueKind-Nodes/LICENSE'), false, 'PlagueKind is a separately required dependency');
  const bundleReadme = files.get('README.md').toString('utf8');
  assert.match(bundleReadme, /three custom-node packages|カスタムノード3種/);
  assert.match(bundleReadme, /No model weights, keys.*are bundled/s);
  assert.match(bundleReadme, /ComfyUI-H3-AudioRefine.*H3AudioRefineSampler/s);
  const version = JSON.parse(files.get('VERSION.json').toString('utf8'));
  assert.equal(version.status, 'tested-output-with-content-warnings');
  assert.equal(version.quality_status, 'needs_review');
  assert.equal(version.distribution_revision, 'authfix1');
  assert.equal(version.base_archive_sha256, '80bfbf8569f0875e4d14d804cf090e3c805975f7dc0a53a4d7a5ed7a712a8b82');
  assert.match(files.get('VALIDATION.md').toString('utf8'), /do not call a real API or run ComfyUI\/GPU generation/);
  assert.match(files.get('VALIDATION.md').toString('utf8'), /Pending: segment 6 speaker\/pronunciation warnings/);
  assert.equal(JSON.parse(files.get('models.json').toString('utf8')).length, 4);
  const serverCode = files.get('custom_nodes/ComfyUI-NanoBanana-H3/__init__.py').toString('utf8');
  const browserCode = files.get('custom_nodes/ComfyUI-NanoBanana-H3/web/nanobanana_h3_dialogue_contract_v1.js').toString('utf8');
  assert.match(serverCode, /_SESSION_CREDENTIALS:\s*dict\[str, dict\[str, str\]\] = \{\}/);
  assert.match(serverCode, /_validate_credential, provider, api_key[\s\S]*_set_session_credential\(provider, slot, api_key\)/);
  assert.match(serverCode, /credential_status[\s\S]*"configured": configured[\s\S]*"storage": "process_memory"/);
  assert.match(browserCode, /if \(!\(await ensureWorkflowCredentialsForRun\(\)\)\) return null;[\s\S]*originalQueuePrompt\.apply\(this, arguments\)/);
  assert.match(browserCode, /if \(!configured\) return false;/);
  assert.match(browserCode, /sessionStorage\.setItem\(draftKey, JSON\.stringify\(dialogueFields/);
  assert.doesNotMatch(browserCode, /(?:localStorage|sessionStorage)\.setItem\([^\n]*(?:apiKey|api_key|credential)/i);
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
  assert.match(readmeSource, /FourPanel_NonLM_4step_20261002-071924/);
  assert.match(readmeSource, /Fused4step・SLA 配布ワークフロー/);
  assert.match(readmeSource, /不足モデル.*ダウンロード/);
  assert.match(readmeSource, /3フォルダ/);
  assert.match(readmeSource, /H3 SLA Attention.*ComfyUI-PlagueKind-Nodes.*Triton.*ComfyUI-H3-AudioRefine/s);
  assert.match(readmeSource, /https:\/\/github\.com\/Adudeguyman\/ComfyUI-H3-AudioRefine/);
  assert.match(readmeSource, /区間.*生成.*検査.*最大5候補/s);
  assert.match(readmeSource, /ComfyUI-NanoBanana-H3.*MIT.*ComfyUI-MiniMax-H3-Long-Video.*GPL-3\.0-only.*ComfyUI-Spectrum-MiniMax-H3.*GPL-3\.0-or-later/s);
  assert.ok(readmeSource.includes(`/releases/download/v${packageJson.version}/ComfyUI_H3_FourPanel_NonLM_20261002-071924_authfix1.zip`));
  assert.match(readmeSource, /ComfyUIサーバーのプロセスメモリ/);
  assert.match(readmeSource, /再起動.*消去/);
  assert.doesNotMatch(readmeSource, /### Unreleased \/ 未公開（2026-09-28）/);
  for (const entry of readdirSync(publicWorkflowDirectoryUrl, { withFileTypes: true }).filter((item) => item.isFile() && item.name.endsWith('.json'))) {
    assert.doesNotMatch(readFileSync(new URL(entry.name, publicWorkflowDirectoryUrl), 'utf8'), /nanobanana_h3_credentials\.json|暗号化なしで保存/);
  }
});

test('distributed credential gate defers execution, cancels without queuing, and resumes once after registration', async () => {
  const archive = readZipFilesFromBuffer(readFileSync(customNodeZipUrl));
  const source = [...archive].find(([name]) => name.endsWith('/web/nanobanana_h3_dialogue_contract_v1.js'))?.[1].toString('utf8');
  assert.ok(source, 'distributed browser extension must be present');
  let extension;
  let queued = 0;
  let configured = false;
  let overlay;
  let credentialPosts = 0;
  const node = { type: 'NanoBananaH3Transform', widgets: [{ name: 'provider', value: 'OpenAI API' }], __nanoBananaCredentialButton: { name: '' }, setDirtyCanvas() {} };
  const app = {
    graph: { _nodes: [node] },
    registerExtension(value) { extension = value; },
    async queuePrompt() { queued += 1; return 'queued'; },
  };
  const makeElement = () => {
    const fields = new Map();
    return {
      dataset: {}, style: {}, innerHTML: '', value: '',
      appendChild(child) { this.child = child; },
      remove() { if (overlay === this) overlay = null; },
      focus() {},
      querySelector(selector) {
        if (!fields.has(selector)) fields.set(selector, makeElement());
        return fields.get(selector);
      },
    };
  };
  const document = {
    body: { appendChild(value) { overlay = value; } },
    createElement: makeElement,
    querySelector() { return overlay || null; },
  };
  const fetch = async (url) => {
    if (url.startsWith('/nanobanana_h3/credential_status?')) return { ok: true, json: async () => ({ configured }) };
    if (url === '/nanobanana_h3/credential') {
      credentialPosts += 1;
      configured = true;
      return { ok: true, json: async () => ({ configured: true }) };
    }
    if (url === '/nanobanana_h3/dialogue_review/pending') return { ok: true, json: async () => ({ pending: [] }) };
    throw new Error(`Unexpected fetch: ${url}`);
  };
  const storage = { setItem() { throw new Error('Credentials must not be persisted'); } };
  runInNewContext(source.replace(/^import .*;\s*$/gm, ''), {
    app, api: { addEventListener() {} }, document, fetch, alert() {},
    URLSearchParams, queueMicrotask, setInterval() {}, sessionStorage: storage, localStorage: storage,
  });
  extension.setup();
  assert.equal(overlay, undefined, 'loading the workflow must not open a credential dialog');

  class WorkflowNode {
    constructor() { this.type = 'NanoBananaH3Transform'; this.widgets = [{ name: 'provider', value: 'OpenAI API' }]; }
    setDirtyCanvas() {}
    addWidget(type, name, value) { const widget = { type, name, value }; this.widgets.push(widget); return widget; }
  }
  extension.beforeRegisterNodeDef(WorkflowNode, { name: 'NanoBananaH3Transform' });
  const switchedNode = new WorkflowNode();
  switchedNode.onNodeCreated();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(overlay, undefined, 'node creation only checks registration state');
  switchedNode.widgets[0].value = 'Google Gemini API';
  switchedNode.onWidgetChanged('provider', 'Google Gemini API', 'OpenAI API');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(overlay, undefined, 'provider changes must not request a key until Execute');
  switchedNode.onConfigure();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(overlay, undefined, 'workflow configuration must not open the dialog');

  const cancelled = app.queuePrompt('cancelled');
  await new Promise(resolve => setImmediate(resolve));
  assert.ok(overlay, 'an unregistered provider must pause execution and open the dialog');
  overlay.child.querySelector('[data-close]').onclick();
  assert.equal(await cancelled, null);
  assert.equal(queued, 0, 'cancel must not queue the workflow');

  const resumed = app.queuePrompt('resumed');
  await new Promise(resolve => setImmediate(resolve));
  assert.ok(overlay);
  overlay.child.querySelector('[data-key]').value = 'test-only-placeholder';
  await overlay.child.querySelector('[data-save]').onclick();
  assert.equal(await resumed, 'queued');
  assert.equal(credentialPosts, 1);
  assert.equal(queued, 1, 'successful registration must resume the pending execution exactly once');

  assert.equal(await app.queuePrompt('already-configured'), 'queued');
  assert.equal(queued, 2);
  assert.equal(overlay, null, 'an already configured provider must not reopen the dialog');
});
