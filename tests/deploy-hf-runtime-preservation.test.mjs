import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('HF deploy preserves the Docker runtime and SPA routing configuration', async () => {
  const script = await readFile(new URL('../scripts/deploy_hf.ps1', import.meta.url), 'utf8');

  assert.match(script, /\$ProtectedItems\s*=\s*@\([^\n]*"Dockerfile"/);
  assert.match(script, /\$ProtectedItems\s*=\s*@\([^\n]*"nginx\.conf"/);
  assert.match(
    script,
    /\$CopyProtectedItems\s*=\s*@\([^\n]*"\.gitattributes"[^\n]*"README\.md"/,
    'the dist copy must not replace Hugging Face-specific LFS attributes',
  );
  assert.match(script, /if \(\$CopyProtectedItems -contains \$_\.Name\)/);
  assert.match(script, /RequiredHfRuntimeFiles/);
  assert.match(script, /missing required runtime file/);
});

test('HF deploy tracks distribution ZIPs through the Hub LFS bridge without changing Pages assets', async () => {
  const script = await readFile(new URL('../scripts/deploy_hf.ps1', import.meta.url), 'utf8');
  const pagesAttributes = await readFile(new URL('../public/.gitattributes', import.meta.url), 'utf8');

  const copyIndex = script.indexOf('# === Step 5: Track HF binary downloads through the LFS/Xet bridge ===');
  const lfsTrackCommand = 'git lfs track "downloads/MiniMax-H3-4Koma-Recommended-VariableDuration-H3BGM-Audio2Step-Bundle-2026-09-05-081753.zip"';
  const lfsTrackIndex = script.indexOf(lfsTrackCommand);
  const workflowByteRule = '"workflows/Super-FURU-AI-4koma-H3-Hybrid-b25-Recommended-VariableDuration-H3BGM-Audio2Step-2026-09-05.json -text"';
  const workflowByteRuleIndex = script.indexOf(workflowByteRule);
  const gitAddIndex = script.indexOf('git add .');

  assert.ok(copyIndex !== -1 && copyIndex < lfsTrackIndex, 'HF-only tracking must happen after the dist copy');
  assert.ok(lfsTrackIndex < gitAddIndex, 'ZIPs must be converted to pointers before git add');
  assert.ok(lfsTrackIndex < workflowByteRuleIndex && workflowByteRuleIndex < gitAddIndex, 'the supplied workflow must be marked binary before git add');
  assert.match(script, /Add-Content[^\n]*\.gitattributes[^\n]*HfBytePreservationRule/s);
  assert.match(script, /if \(\$LASTEXITCODE -ne 0\) \{\s*Write-Host "\[ERROR\] git lfs track failed\."/s);
  assert.doesNotMatch(script, /git lfs track "downloads\/\*\.zip"/);
  assert.doesNotMatch(pagesAttributes, /downloads\/\*\.zip\s+filter=lfs/);
});
