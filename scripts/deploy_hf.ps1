# deploy_hf.ps1 - Hugging Face Spaces deploy script
# Usage: npm run deploy:hf (or: powershell -ExecutionPolicy Bypass -File scripts/deploy_hf.ps1)
# Prerequisite: npm run build (or npm run deploy) completed

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# === Config ===
if ($PSScriptRoot) {
    $ProjectRoot = Split-Path -Parent $PSScriptRoot
} else {
    $ProjectRoot = (Get-Location).Path
}
$HfRoot = Join-Path $env:USERPROFILE "Antigravity\hf-nano-banana-pro"
$DistDir = Join-Path $ProjectRoot "dist"

# === Version ===
$PackageJson = Get-Content (Join-Path $ProjectRoot "package.json") -Encoding UTF8 | ConvertFrom-Json
$Version = $PackageJson.version
$DisplayVersion = "v$Version"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HF Spaces Deploy: $DisplayVersion" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# === Step 1: Ensure dist exists ===
if (-not (Test-Path $DistDir)) {
    Write-Host "[BUILD] dist/ not found. Building..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Build failed." -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location
} else {
    Write-Host "[OK] dist/ found." -ForegroundColor Green
}

# === Step 2: Verify HF folder ===
if (-not (Test-Path (Join-Path $HfRoot ".git"))) {
    Write-Host "[ERROR] HF folder not found: $HfRoot" -ForegroundColor Red
    Write-Host "        Clone from: https://huggingface.co/spaces/FURUYAN/nano-banana-pro" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] HF folder: $HfRoot" -ForegroundColor Green

# === Step 3: Guard HF runtime files and clean generated assets ===
$RequiredHfRuntimeFiles = @("Dockerfile", "nginx.conf")
$MissingRuntimeFiles = @($RequiredHfRuntimeFiles | Where-Object {
    -not (Test-Path (Join-Path $HfRoot $_))
})
if ($MissingRuntimeFiles.Count -gt 0) {
    Write-Host "[ERROR] HF folder is missing required runtime file(s): $($MissingRuntimeFiles -join ', ')" -ForegroundColor Red
    exit 1
}

# Preserve the Space runtime and metadata while replacing only built assets.
Write-Host "[CLEAN] Cleaning HF folder..." -ForegroundColor Yellow
$ProtectedItems = @(".git", ".gitattributes", "README.md", "Dockerfile", "nginx.conf")
Get-ChildItem $HfRoot -Force | Where-Object {
    $ProtectedItems -notcontains $_.Name
} | ForEach-Object {
    if ($_.PSIsContainer) {
        Remove-Item $_.FullName -Recurse -Force
    } else {
        Remove-Item $_.FullName -Force
    }
    Write-Host "  Deleted: $($_.Name)" -ForegroundColor DarkGray
}

# === Step 4: Copy dist contents to HF folder (preserve HF-specific files) ===
Write-Host "[COPY] dist/ -> HF folder..." -ForegroundColor Yellow
$CopyProtectedItems = @(".gitattributes", "README.md")
Get-ChildItem $DistDir -Force | ForEach-Object {
    if ($CopyProtectedItems -contains $_.Name) {
        Write-Host "  SKIP: $($_.Name) (HF config protected)" -ForegroundColor Magenta
        return
    }
    $Destination = Join-Path $HfRoot $_.Name
    if ($_.PSIsContainer) {
        Copy-Item $_.FullName $Destination -Recurse -Force
    } else {
        Copy-Item $_.FullName $Destination -Force
    }
    Write-Host "  Copied: $($_.Name)" -ForegroundColor DarkGray
}

# === Step 5: Preserve distribution bytes and use LFS only when a ZIP needs it ===
# This is intentionally applied only inside the HF checkout. Adding the rule to
# public/.gitattributes would turn GitHub Pages downloads into pointer files.
# Small supplied workflow bundles are ordinary Git blobs; routing them through LFS
# would unnecessarily require a separate authenticated object upload.
Write-Host "[DIST] Syncing current distribution attributes..." -ForegroundColor Yellow
Push-Location $HfRoot
$PublicDistributionAttributes = @(Get-Content -LiteralPath (Join-Path $ProjectRoot "public\.gitattributes") -Encoding UTF8)
$HfDistributionZipPaths = @($PublicDistributionAttributes |
    Where-Object { $_ -match '^downloads/.+\.zip -text$' } |
    ForEach-Object { ($_ -split '\s+')[0] }
)
if ($HfDistributionZipPaths.Count -eq 0) {
    Write-Host "[ERROR] No distribution ZIPs were declared in public/.gitattributes." -ForegroundColor Red
    Pop-Location
    exit 1
}
$HfLfsThresholdBytes = 10MB
$HfLfsZipPaths = @($HfDistributionZipPaths | Where-Object {
    $sourceZip = Join-Path $ProjectRoot (($_ -replace '/', '\\'))
    (Get-Item -LiteralPath $sourceZip -ErrorAction Stop).Length -gt $HfLfsThresholdBytes
})
$HfPlainZipPaths = @($HfDistributionZipPaths | Where-Object { $_ -notin $HfLfsZipPaths })
$HfAttributesPath = Join-Path $HfRoot ".gitattributes"
$HfAttributeLines = @(Get-Content -LiteralPath $HfAttributesPath -Encoding UTF8)
foreach ($HfPlainZipPath in $HfPlainZipPaths) {
    $lfsRule = "$HfPlainZipPath filter=lfs diff=lfs merge=lfs -text"
    if ($HfAttributeLines -ccontains $lfsRule) {
        $HfAttributeLines = @($HfAttributeLines | Where-Object { $_ -cne $lfsRule })
        Set-Content -LiteralPath $HfAttributesPath -Value $HfAttributeLines -Encoding UTF8
        Write-Host "  Using regular Git for small ZIP: $HfPlainZipPath" -ForegroundColor DarkGray
    }
}
foreach ($HfLfsZipPath in $HfLfsZipPaths) {
    git lfs track $HfLfsZipPath
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] git lfs track failed." -ForegroundColor Red
        Pop-Location
        exit 1
    }
}

$HfBytePreservationRules = @($PublicDistributionAttributes |
    Where-Object { $_ -match '^(?:workflows/.+\.json|downloads/.+\.zip(?:\.sha256\.txt)?) -text$' }
)
$HfAttributeLines = @(Get-Content -LiteralPath $HfAttributesPath -Encoding UTF8)
foreach ($HfBytePreservationRule in $HfBytePreservationRules) {
    if ($HfAttributeLines -cnotcontains $HfBytePreservationRule) {
        Add-Content -LiteralPath $HfAttributesPath -Value $HfBytePreservationRule -Encoding UTF8 -ErrorAction Stop
        Write-Host "  Preserving exact bytes: $HfBytePreservationRule" -ForegroundColor DarkGray
    }
}
Pop-Location

# === Step 6: Verify vite base path in built index.html ===
$BuiltIndex = Join-Path $HfRoot "index.html"
if (Test-Path $BuiltIndex) {
    $indexContent = Get-Content $BuiltIndex -Raw -Encoding UTF8
    if ($indexContent -match 'src="/assets/' -or $indexContent -match 'href="/assets/') {
        Write-Host "[WARN] Absolute paths detected in index.html! vite.config.js base may be wrong." -ForegroundColor Red
    } else {
        Write-Host "[OK] Relative paths confirmed in index.html." -ForegroundColor Green
    }
}

# === Step 7: Git commit & push ===
Write-Host "[GIT] Committing and pushing..." -ForegroundColor Yellow
Push-Location $HfRoot

git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] git add failed." -ForegroundColor Red
    Pop-Location
    exit 1
}

$CommitMsg = "Update to $DisplayVersion Final"
git commit -m $CommitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] Nothing to commit or commit error." -ForegroundColor Yellow
}

# Pull with auto-merge to avoid Vim prompt
git pull --no-edit origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] git pull encountered issues." -ForegroundColor Yellow
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] git push failed. Check credentials." -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

# === Done ===
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  HF Spaces Deploy Complete!" -ForegroundColor Green
Write-Host "  Version: $DisplayVersion" -ForegroundColor Green
Write-Host "  URL: https://huggingface.co/spaces/FURUYAN/nano-banana-pro" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "[TIP] If not updated, clear browser cache or use incognito mode." -ForegroundColor DarkGray
