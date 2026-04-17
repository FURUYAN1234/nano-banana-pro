# HANDOFF

## Goal
マルチエージェント用ドキュメントアーキテクチャ（4本柱モデル）および、Hugging Face Spacesへの自動デプロイスクリプトの整備。

## Current Status
整備完了。Antigravity側 (`C:\Users\sx717\Antigravity\nano-banana-pro`) から GitHub リモートリポジトリへ Push される状態。

## Done
- `AGENTS.md` の作成（常駐ルールおよび Four-File Operating Model 記載）
- `docs/project_standards.md` の作成（API待機ロジック、Geometry Lock 等の絶対防衛ライン明記）
- `docs/deploy.md` の作成（HF Spaces向けプラットフォーム特有設定の記載）
- `scripts/deploy_hf.ps1` の追加（HF自動デプロイスクリプト）
- `package.json` の更新（`npm run deploy:hf` スクリプト追加）
- `.agent/workflows/deploy.md` の更新（HFデプロイステップの追加）

## Remaining Tasks
- 特になし（Codex側での作業環境の同期待ち）

## Decisions
- 各プロジェクトごとのコンテキスト汚染を防ぐため、アプリ固有のルールは `docs/project_standards.md` と `docs/deploy.md` に集約することとした。

## Constraints
- 各種設定ファイル（`vite.config.js`）やHF向けの `README.md` 等、プラットフォーム固有の仕様は `docs/deploy.md` および絶対防衛ラインの指示に従い、勝手に書き換えないこと。

## Touched Files
- `AGENTS.md` [NEW]
- `HANDOFF.md` [MODIFIED]
- `docs/project_standards.md` [NEW]
- `docs/deploy.md` [NEW]
- `scripts/deploy_hf.ps1` [NEW]
- `package.json` [MODIFIED]
- `.agent/workflows/deploy.md` [MODIFIED]

## Entry Points
- `AGENTS.md`
- `HANDOFF.md`

## Verification
- [x] ルール策定およびファイル配置
- [x] Git Push 準備完了

## Risks / Assumptions
- Codex側の作業ディレクトリ（`C:\Users\sx717\OneDrive\Documents\New project`）が同じ GitHub リモートリポジトリ（`FURUYAN1234/nano-banana-pro.git`）の clone であることを前提としている。

## Diff Scope
- Other (Documentation & CI/CD Scripts)

## Project Rules
- 詳細は `docs/project_standards.md`, `docs/deploy.md` 参照

## Next Step
Codex側は、作業再開の前に自身の作業ディレクトリ（`New project`）上で `git pull origin main` を行い、Antigravity側で追加された変更を取り込むこと。

## Suggested Commands
```bash
git pull origin main
```
