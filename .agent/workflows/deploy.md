# /deploy - Auto-Increment Version and Full Deploy (Turbo Mode)

// turbo-all

## Overview
一気通貫デプロイ。GitHub Pages + GitHub Release + Hugging Face Spaces の全ターゲットにデプロイする。

**重要**: 必ず `docs/deploy.md` の正規デプロイフローに従うこと。

## Pre-requisites
- ローカルサーバーでの検証が完了していること
- ユーザーから「デプロイ」の指示が出ていること

## Step 1: Clean temp files
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; Remove-Item .git-status.txt, diff.txt, eslint_out.txt, git_log_temp.txt, git_status.txt, git-status.txt -Force -ErrorAction SilentlyContinue
```

## Step 2: Bump version
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; node scripts/update_version.js
```

## Step 3: Verify version sync (3 files)
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; node -p "require('./package.json').version"; Select-String -Path src/App.jsx -Pattern 'SYSTEM_VERSION' | Select-Object -First 1 | ForEach-Object { $_.Line.Trim() }; Select-String -Path index.html -Pattern '<title>' | ForEach-Object { $_.Line.Trim() }
```
**全3箇所が同一バージョンであることを目視確認してから次へ。**

## Step 4: Git commit & push
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; git add .; git commit -m "Bump version and Deploy"; git push origin main
```

## Step 5: Deploy to GitHub Pages
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; npm run deploy
```

## Step 6: Verify gh-pages remote
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; git fetch origin gh-pages; git show origin/gh-pages:index.html | Select-String '<title>'
```
**新バージョンが表示されなければ再度 fetch して確認。**

## Step 7: Create git tag & push
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; git tag vX.Y.Z-alpha; git push origin --tags
```
**Replace vX.Y.Z-alpha with actual version.**

## Step 8: Create release notes
`release_body.md` にリリースノートを日英併記で作成する。

## Step 9: Display tag text to user
**タイトル**と**本文**をそれぞれMarkdownコードブロックで表示:
- タイトル: 英語 / 日本語
- 本文: 英語 / 日本語

## Step 10: Create GitHub Release
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; gh release create vX.Y.Z-alpha --title "vX.Y.Z-alpha - Title EN / タイトルJP" -F release_body.md
```

## Step 11: Verify ZIP download
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; gh release view vX.Y.Z-alpha --json tagName,name,publishedAt,assets,zipballUrl
```
Release URL を提示。

## Step 12: Deploy to Hugging Face Spaces
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; npm run deploy:hf
```

## Step 13: Verify HF deployment
HF URL を提示: https://huggingface.co/spaces/FURUYAN/nano-banana-pro

## Final Report
全ターゲットのバージョンを表形式で報告:
| Target | Version | Status |
|--------|---------|--------|
| package.json | vX.Y | ✅ |
| App.jsx | vX.Y | ✅ |
| index.html | vX.Y | ✅ |
| GitHub Pages | vX.Y | ✅ |
| GitHub Release | vX.Y | ✅ |
| HF Spaces | vX.Y | ✅ |
