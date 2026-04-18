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
$HfRoot = "C:\Users\sx717\Antigravity\hf-nano-banana-pro"
$DistDir = Join-Path $ProjectRoot "dist"

# === Version ===
$PackageJson = Get-Content (Join-Path $ProjectRoot "package.json") -Encoding UTF8 | ConvertFrom-Json
$Version = $PackageJson.version
$DisplayVersion = $Version -replace '\.0-alpha$', '' -replace '^', 'v'
$DisplayVersion = "$DisplayVersion Alpha"

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

# === Step 3: Clean HF folder (preserve .git, .gitattributes, README.md) ===
Write-Host "[CLEAN] Cleaning HF folder..." -ForegroundColor Yellow
$ProtectedItems = @(".git", ".gitattributes", "README.md")
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

# === Step 4: Copy dist contents to HF folder (NEVER overwrite README.md) ===
Write-Host "[COPY] dist/ -> HF folder..." -ForegroundColor Yellow
Get-ChildItem $DistDir -Force | ForEach-Object {
    if ($_.Name -eq "README.md") {
        Write-Host "  SKIP: README.md (HF config protected)" -ForegroundColor Magenta
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

# === Step 5: Verify vite base path in built index.html ===
$BuiltIndex = Join-Path $HfRoot "index.html"
if (Test-Path $BuiltIndex) {
    $indexContent = Get-Content $BuiltIndex -Raw -Encoding UTF8
    if ($indexContent -match 'src="/assets/' -or $indexContent -match 'href="/assets/') {
        Write-Host "[WARN] Absolute paths detected in index.html! vite.config.js base may be wrong." -ForegroundColor Red
    } else {
        Write-Host "[OK] Relative paths confirmed in index.html." -ForegroundColor Green
    }
}

# === Step 6: Git commit & push ===
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
