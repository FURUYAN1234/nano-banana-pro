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
  assert.match(script, /git fetch origin main/);
  assert.match(script, /\$HfLocalOnlyCommitCount/);
  assert.doesNotMatch(script, /Select-String -SimpleMatch "Objects to be pushed/);
  assert.match(script, /if \(\$HfLocalOnlyCommitCount -gt 0\)/);
  assert.match(script, /recovery\/hf-unpublished-lfs/);
  assert.match(script, /git reset --mixed origin\/main/);
});

test('HF deploy removes stale ZIP attributes and preserves current workflow bytes', async () => {
  const script = await readFile(new URL('../scripts/deploy_hf.ps1', import.meta.url), 'utf8');
  const pagesAttributes = await readFile(new URL('../public/.gitattributes', import.meta.url), 'utf8');
  const copyIndex = script.indexOf('# === Step 6: Preserve current workflow bytes ===');
  const attributesReadIndex = script.indexOf('$PublicDistributionAttributes = @(Get-Content');
  const byteRulesIndex = script.indexOf('$HfBytePreservationRules = @($PublicDistributionAttributes |');
  const gitAddIndex = script.indexOf('git add .');
  assert.ok(copyIndex !== -1 && copyIndex < attributesReadIndex);
  assert.ok(attributesReadIndex < byteRulesIndex && byteRulesIndex < gitAddIndex);
  assert.match(script, /Where-Object \{ \$_ -notmatch/);
  assert.doesNotMatch(script, /\$HfCurrentZipPaths|git lfs track \$HfLfsZipPath/);
  assert.match(script, /Add-Content[^\n]*\$HfAttributesPath[^\n]*HfBytePreservationRule/s);
  assert.doesNotMatch(pagesAttributes, /downloads\/.+\.zip/);
  assert.match(pagesAttributes, /workflows\/FourPanel_NonLM_4step_20260912203033_v6\.0\.9\.json -text/);
});
