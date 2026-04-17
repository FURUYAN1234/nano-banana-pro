# deploy_hf.ps1 — Hugging Face Spaces 自動デプロイスクリプト
# 使い方: npm run deploy:hf
# 前提: GitHub Pages デプロイ（npm run deploy）が完了済みであること

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# === 設定 ===
# npm run deploy:hf 経由の場合 $PSScriptRoot が空になるため、フォールバック付き
if ($PSScriptRoot) {
    $ProjectRoot = Split-Path -Parent $PSScriptRoot
} else {
    $ProjectRoot = (Get-Location).Path
}
$HfRoot = "C:\Users\sx717\Downloads\hf\nano-banana-pro\nano-banana-pro"
$DistDir = Join-Path $ProjectRoot "dist"

# === バージョン取得 ===
$PackageJson = Get-Content (Join-Path $ProjectRoot "package.json") -Encoding UTF8 | ConvertFrom-Json
$Version = $PackageJson.version
# 表示用バージョン: "2.51.0-alpha" → "v2.51 Alpha"
$DisplayVersion = $Version -replace '\.0-alpha$', '' -replace '^', 'v' 
$DisplayVersion = "$DisplayVersion Alpha"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  HF Spaces Deploy: $DisplayVersion" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# === Step 1: dist が存在するか確認 ===
if (-not (Test-Path $DistDir)) {
    Write-Host "[BUILD] dist/ が見つかりません。ビルドを実行します..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] ビルドに失敗しました。" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Pop-Location
} else {
    Write-Host "[OK] dist/ フォルダを検出しました。" -ForegroundColor Green
}

# === Step 2: HF フォルダの存在確認 ===
if (-not (Test-Path (Join-Path $HfRoot ".git"))) {
    Write-Host "[ERROR] HF フォルダが見つかりません: $HfRoot" -ForegroundColor Red
    Write-Host "        .git が存在するフォルダを確認してください。" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] HF フォルダを検出: $HfRoot" -ForegroundColor Green

# === Step 3: HF フォルダのクリーンアップ（.git, .gitattributes, README.md は保持） ===
Write-Host "[CLEAN] HF フォルダをクリーンアップ中..." -ForegroundColor Yellow
$ProtectedItems = @(".git", ".gitattributes", "README.md")
Get-ChildItem $HfRoot -Force | Where-Object {
    $ProtectedItems -notcontains $_.Name
} | ForEach-Object {
    if ($_.PSIsContainer) {
        Remove-Item $_.FullName -Recurse -Force
    } else {
        Remove-Item $_.FullName -Force
    }
    Write-Host "  削除: $($_.Name)" -ForegroundColor DarkGray
}

# === Step 4: dist の中身を HF フォルダへコピー ===
Write-Host "[COPY] dist/ → HF フォルダへコピー中..." -ForegroundColor Yellow
Get-ChildItem $DistDir -Force | ForEach-Object {
    # README.md は絶対にコピーしない（HFの起動設定が含まれるため）
    if ($_.Name -eq "README.md") {
        Write-Host "  スキップ: README.md（HF設定を保護）" -ForegroundColor Magenta
        return
    }
    $Destination = Join-Path $HfRoot $_.Name
    if ($_.PSIsContainer) {
        Copy-Item $_.FullName $Destination -Recurse -Force
    } else {
        Copy-Item $_.FullName $Destination -Force
    }
    Write-Host "  コピー: $($_.Name)" -ForegroundColor DarkGray
}

# === Step 5: Git 操作 ===
Write-Host "[GIT] コミット＆プッシュ中..." -ForegroundColor Yellow
Push-Location $HfRoot

git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] git add に失敗しました。" -ForegroundColor Red
    Pop-Location
    exit 1
}

$CommitMsg = "Update to $DisplayVersion"
git commit -m $CommitMsg
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARN] コミットするものがないか、エラーが発生しました。" -ForegroundColor Yellow
    # 変更なしの可能性があるので続行
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] git push に失敗しました。" -ForegroundColor Red
    Write-Host "        認証情報を確認してください。" -ForegroundColor Red
    Pop-Location
    exit 1
}

Pop-Location

# === 完了 ===
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  HF Spaces デプロイ完了！" -ForegroundColor Green
Write-Host "  バージョン: $DisplayVersion" -ForegroundColor Green
Write-Host "  URL: https://huggingface.co/spaces/FURUYAN/nano-banana-pro" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "[TIP] 反映されない場合はブラウザキャッシュをクリアするか、シークレットモードで確認してください。" -ForegroundColor DarkGray
