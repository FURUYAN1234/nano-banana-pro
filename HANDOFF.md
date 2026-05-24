# HANDOFF.md

## 現在のステータス (v4.1.2)
- **Pending Verification** (検証待ち)
- 「Alpha」表記の完全排除、スクリプト（deploy_hf.ps1 / generate_release_text.js / update_version.cjs）のバグ修正を完了し、バージョン `v4.1.2` のデプロイ、リリース作成を実行中です。

## 完了した項目 (Done)
- [x] `App.jsx` と `ControlBar.jsx` で `ResizeObserver` による動的高さ監視を実装（エンジンの切り替えや画面折り返しに完璧に自動追従）
- [x] バージョンアップ（v4.1.2）と各ファイル同期（package.json, constants.js, index.html, README.md, hf-nano-banana-pro/README.md）
- [x] ローカル開発環境での動作確認と表示隙間バグの完全解消
- [x] バージョン繰り上げ規則（9の次はマイナー繰り上げ）を `docs/project_standards.md` および `docs/deploy.md` に明文化
- [x] スクリプト内の「Alpha」強制付与箇所の完全排除（deploy_hf.ps1 / generate_release_text.js）
- [x] `update_version.cjs` の太字マークダウン崩れバグを修正

## 残りのタスク (Remaining Tasks)
- [ ] GitHub PagesへのデプロイおよびGitHub Release (v4.1.2) の作成
- [ ] フルアプリバックアップの起動実行
- [ ] バックアップファイルの生成整合性検証
