# HANDOFF.md

## 現在のステータス (v4.3.5 - デプロイ処理中)
- **Completed** (完了)
  - Gemini APIモデルリストを最新化し、廃止された旧モデルを排除。
  - バージョン番号を **v4.3.5** に引き上げ、`package.json`, `index.html`, `constants.js`, `README.md` と同期。
- **In Progress** (進行中)
  - 本番環境（GitHub Pages）へのデプロイ
  - リリースタグ打ちおよび GitHub Release 作成
  - ZIPアーカイブの検証と C ドライブローカル展開バックアップ

## 今回の変更内容 (v4.3.5)
- [x] **Gemini Models Updated**: Gemini API のモデルリストから廃止済みの旧モデルを除外し、最新モデルのみに整理。
- [x] **Version Sync**: v4.3.5 へのインクリメントと各ファイル同期

---

## 残りのタスク (Remaining Tasks)
- [ ] 本番環境へのデプロイ（`npm run deploy`）および Hugging Face デプロイ（`npm run deploy:hf`）
- [ ] タグ打ちおよび GitHub Release 作成
- [ ] ZIP検証と C ドライブ展開バックアップ


---
