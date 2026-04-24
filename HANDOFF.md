# HANDOFF (Nano Banana Pro → Codex)

## Snapshot Date
2026-04-24T10:27:00+09:00

## Current Status
- ✅ **v2.67.0-alpha** — 安定稼働中（GitHub Pages + HF Spaces デプロイ済み）
- ブランチ: `main`
- 未コミット変更: `release_body.md` のみ（前回リリースの残り、無害）
- 直近5コミット:
  - `f19c91b` Bump version and Deploy
  - `5e61a44` Bump version to v2.66.0-alpha and Deploy
  - `de1bcb8` Bump version to v2.65.0-alpha and Deploy
  - `eab6adb` Bump version and Deploy
  - `93aa27a` chore(release): v2.63.0-alpha

## Architecture & Key Files
| 用途 | ファイル |
|------|----------|
| メインUI | `src/App.jsx` |
| テキスト生成API | `src/lib/gemini.js` |
| 画像生成API | `src/lib/imagen.js` |
| バージョン同期スクリプト | `scripts/update_version.js` |
| HFデプロイスクリプト | `scripts/deploy_hf.ps1` |
| ビルド設定 | `vite.config.js` (base: `'./'` — 変更禁止) |

## Rule Enforcement (重要)
- 作業開始前に **必ず** `docs/project_standards.md` と `docs/deploy.md` を読むこと。
- バージョン同期対象: `package.json`, `src/App.jsx` (SYSTEM_VERSION), `index.html` (<title>)
- デプロイ先: GitHub Pages + Hugging Face Spaces（HFデプロイは本アプリのみ）
- **`--prerelease` フラグ使用禁止**（全バージョンが `-alpha` のため `--latest` を使用）

## Gemini API Model Audit
- **最終監査日**: 2026-04-21
- gemini-2.5-pro を有料専用として降格済み
- gemini-3.1-flash-lite-preview を昇格済み
- imagen-3.0系を削除済み（Imagen全系列は2026/06/24に廃止予定）
- gemini-2.5-flash-image をフォールバックに追加済み

## Remaining Tasks
- 特になし（ユーザーからの新たな指示を待機中）

## Verification State
- GitHub Pages: https://furuyan1234.github.io/nano-banana-pro/
- HF Spaces: https://huggingface.co/spaces/FURUYAN/nano-banana-pro

## Risks
なし

## Entry Points for Codex
1. `AGENTS.md` → 全体ルール
2. `docs/project_standards.md` → コード規約・禁止事項
3. `docs/deploy.md` → デプロイ手順（一気通貫フロー）

## Suggested First Command
```bash
git pull origin main
```
