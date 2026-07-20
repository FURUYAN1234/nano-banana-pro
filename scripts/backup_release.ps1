$ErrorActionPreference = 'Stop'
$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$hfRoot = Join-Path $env:USERPROFILE 'Antigravity\hf-nano-banana-pro'
$version = (Get-Content (Join-Path $projectRoot 'package.json') -Raw | ConvertFrom-Json).version
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$backupRoot = Join-Path 'C:\tmp\nbp-backups' ("v$version-$stamp")
$stage = Join-Path $backupRoot 'payload'
$zip = Join-Path $backupRoot ("nano-banana-pro-v$version-full.zip")
$manifest = Join-Path $backupRoot 'manifest.json'
$restore = Join-Path $backupRoot 'restore-check'

New-Item -ItemType Directory -Path $stage -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $stage 'app') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $stage 'hf') -Force | Out-Null

$excluded = @('node_modules','dist','.git','.tmp_release_worktrees')
$appItems = Get-ChildItem -LiteralPath $projectRoot -Force | Where-Object { $excluded -notcontains $_.Name }
foreach ($item in $appItems) { Copy-Item -LiteralPath $item.FullName -Destination (Join-Path (Join-Path $stage 'app') $item.Name) -Recurse -Force }
if (-not (Test-Path (Join-Path $hfRoot '.git'))) { throw "HF repository missing: $hfRoot" }
$hfItems = Get-ChildItem -LiteralPath $hfRoot -Force | Where-Object { $_.Name -notin @('.git','node_modules','dist') }
foreach ($item in $hfItems) { Copy-Item -LiteralPath $item.FullName -Destination (Join-Path (Join-Path $stage 'hf') $item.Name) -Recurse -Force }

$required = @(
  (Join-Path $stage 'app\package.json'),
  (Join-Path $stage 'app\README.md'),
  (Join-Path $stage 'app\src\lib\scenario-content-policy.js'),
  (Join-Path $stage 'app\tests\scenario-content-policy.test.mjs'),
  (Join-Path $stage 'hf\README.md'),
  (Join-Path $stage 'hf\Dockerfile'),
  (Join-Path $stage 'hf\nginx.conf')
)
foreach ($path in $required) { if (-not (Test-Path -LiteralPath $path)) { throw "Required backup file missing: $path" } }

Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $zip -Force
if (-not (Test-Path -LiteralPath $zip)) { throw 'Backup archive was not created' }
$hash = (Get-FileHash -LiteralPath $zip -Algorithm SHA256).Hash
$entries = (Get-ChildItem -LiteralPath $stage -Recurse -File).Count
Expand-Archive -LiteralPath $zip -DestinationPath $restore -Force
foreach ($path in $required) {
  $relative = $path.Substring($stage.Length).TrimStart('\')
  if (-not (Test-Path -LiteralPath (Join-Path $restore $relative))) { throw "Restore check failed: $relative" }
}

[pscustomobject]@{
  version = "v$version"
  createdAt = (Get-Date).ToString('o')
  archive = $zip
  sha256 = $hash
  fileCount = $entries
  excluded = $excluded
  sources = @($projectRoot, $hfRoot)
} | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifest -Encoding UTF8

Remove-Item -LiteralPath $stage -Recurse -Force
Remove-Item -LiteralPath $restore -Recurse -Force
Write-Output (Get-Content -Raw -LiteralPath $manifest)
