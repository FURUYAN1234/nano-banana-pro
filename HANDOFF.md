# HANDOFF

## Current Status
- 1枚絵用（ChatGPT Images 2.0向け）のプロンプトを「ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.0」へ刷新しました。
- 感情ベクトルの自動検知、シネマティックなカメラワーク・ライティング・表情・VFXの適用が実装され、画像生成テストにて正常な効果を確認済み。
- UIのボタンテキストも最新の機能説明に合わせて更新されました。
- システムバージョンは `v3.43-alpha` に更新されています。

## Done Items
- `src/App.jsx` の1枚絵コピー用プロンプトをv2.0へ更新。
- 同ボタンのラベルおよび説明テキストを更新。
- バージョン番号の同期（package.json, App.jsx, index.html, README.md）。
- ローカル環境での表示と機能のテスト確認。

## Remaining Tasks
- GitHub Pages へのデプロイ（これから実行）。

## Risks & Notes
- デプロイを実行する際は、本プロジェクトの `docs/deploy.md` の手順に必ず従うこと。
- 次回以降、UIやコアロジックを修正する際は必ず `temp_App_backup.jsx` 等のバックアップを作成してから着手すること。
