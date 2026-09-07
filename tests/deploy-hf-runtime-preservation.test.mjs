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

test('HF deploy derives byte-preservation attributes from every Pages distribution asset and reserves LFS for large ZIPs', async () => {
  const script = await readFile(new URL('../scripts/deploy_hf.ps1', import.meta.url), 'utf8');
  const pagesAttributes = await readFile(new URL('../public/.gitattributes', import.meta.url), 'utf8');

  const copyIndex = script.indexOf('# === Step 5: Preserve distribution bytes and use LFS only when a ZIP needs it ===');
  const attributesReadIndex = script.indexOf('$PublicDistributionAttributes = @(Get-Content -LiteralPath (Join-Path $ProjectRoot "public\\.gitattributes") -Encoding UTF8)');
  const zipPathsIndex = script.indexOf('$HfDistributionZipPaths = @($PublicDistributionAttributes |');
  const lfsLoopIndex = script.indexOf('foreach ($HfLfsZipPath in $HfLfsZipPaths)');
  const byteRulesIndex = script.indexOf('$HfBytePreservationRules = @($PublicDistributionAttributes |');
  const gitAddIndex = script.indexOf('git add .');

  assert.ok(copyIndex !== -1 && copyIndex < attributesReadIndex, 'HF-only attribute derivation must happen after the dist copy');
  assert.ok(attributesReadIndex < zipPathsIndex && zipPathsIndex < lfsLoopIndex, 'all current download ZIPs must be read before deciding whether LFS is necessary');
  assert.ok(lfsLoopIndex < byteRulesIndex && byteRulesIndex < gitAddIndex, 'workflow JSON and ZIP checksum byte rules must be written before git add');
  assert.match(script, /Where-Object \{ \$_ -match '\^downloads\/.+\\\.zip -text\$' \}/);
  assert.match(script, /\$HfLfsThresholdBytes\s*=\s*10MB/);
  assert.match(script, /Get-Item -LiteralPath \$sourceZip -ErrorAction Stop\)\.Length -gt \$HfLfsThresholdBytes/);
  assert.match(script, /\$HfPlainZipPaths/);
  assert.match(script, /Using regular Git for small ZIP/);
  assert.match(script, /Where-Object \{ \$_ -match '\^\(\?:workflows\/.+\\\.json\|downloads\/.+\\\.zip\(\?:\\\.sha256\\\.txt\)\?\) -text\$' \}/);
  assert.match(script, /git lfs track \$HfLfsZipPath/);
  assert.match(script, /Add-Content[^\n]*\$HfAttributesPath[^\n]*HfBytePreservationRule/s);
  assert.match(script, /if \(\$LASTEXITCODE -ne 0\) \{\s*Write-Host "\[ERROR\] git lfs track failed\."/s);
  assert.doesNotMatch(script, /MiniMax-H3-4Koma-Fused4Step-SLA-Bundle-2026-09-06-r8/);
  assert.doesNotMatch(script, /git lfs track "downloads\/\*\.zip"/);
  assert.doesNotMatch(pagesAttributes, /downloads\/\*\.zip\s+filter=lfs/);
});
