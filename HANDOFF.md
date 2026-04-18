# HANDOFF (Nano Banana Pro)

## Current Status
- 🎉 **v2.52.0-alpha (v2.52 Alpha) - 安定板デプロイ完了**
- GitHub Pages, GitHub Releases (zip), および **Hugging Face Spaces** のすべての環境への再同期・デプロイが完了しています。

## Architecture & Rule Enforcement (重要)
- 全体ルール（`AGENTS.md`）の改修により、AIは本プロジェクト（nano-banana-pro）の作業を開始する前に、必ず `docs/project_standards.md` と `docs/deploy.md` を読み込むよう強制されています。
- **Hugging Face スペースへのデプロイ対象は本アプリ（nano-banana-pro）のみ**です。この設定は `docs/deploy.md` に隔離されているため、他のアプリ（character_sheet等）のAIが誤ってHFへデプロイしようとする事故は発生しません。

## Done Items
- `src/App.jsx` の「画像をカンニングできる」表現を「画像を参照できる」に修正。
- バージョンインクリメントスクリプト（`update_version.js`）を適用し、3ファイルのバージョンを同期。
- リリースとタグによる完全デプロイ。
- 全アプリの `AGENTS.md` を同期・強固化。

## Remaining Tasks / Next Steps
- 特になし（ユーザーからの新たな修正依頼・機能追加プロンプトを待機中）。

## Verification State
- `http://localhost:5173/` 稼働確認済み
- [GitHub Pages](https://furuyan1234.github.io/nano-banana-pro/) へ `v2.52 Alpha` 反映済み
- [Hugging Face Spaces](https://huggingface.co/spaces/FURUYAN/nano-banana-pro) へ `v2.52 Alpha` 反映済み

## Risks
なし（Gitとリモート環境のバージョン同期に成功しています）
