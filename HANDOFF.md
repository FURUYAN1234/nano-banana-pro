# HANDOFF.md

## 現在のステータス (v4.4.3 - リリース・デプロイ検証完了)
- **Completed** (完了)
  - 全アプリ（`nano-banana-pro`, `story-maker`, `character_sheet`, `comic_translation`, `Retouch`, `panoforge-main`, `remotion_video_2`, `short_movie`）におけるAPIモデル自動取得トラップ、および存在しない架空・プレビューモデル（gpt-5.x, gemini-3.x, gpt-image-2等）の静的定義を完全に根絶し、動作確認済みの実在モデル（gpt-4o, gpt-4o-mini, gemini-2.0-flash, gemini-1.5-flash/pro, imagen-3.0, dall-e-3）に正常化。
  - バージョン番号を **v4.4.3** に引き上げ、`package.json`, `index.html`, `src/lib/constants.js`, `README.md` (ChangeLog), `Hugging Face README.md` の同期を完了。
  - 本番ビルドテスト (`npm run build`) による文法・ビルドエラーが無いことを確認。
  - 本番環境（GitHub Pages）へのデプロイ (`npm run deploy`) を完了。
  - 変更内容のコミットとプッシュ、およびアノテーテッドタグ打ち (`v4.4.3`) / リリース作成 (`gh release create`) を完了。
  - ZIP検証と C ドライブローカル展開バックアップ (`C:\nano-banana-pro-main` の差し替え) を完了（`version: 4.4.3` 確認済み）。
  - ローカル開発サーバー (Vite) を `http://localhost:5173/` にて再起動完了。

## 残りのタスク (Remaining Tasks)
- なし (全アプリのクリーンアップおよびモデル正常化デプロイ完了)
