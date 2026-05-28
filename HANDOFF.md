# HANDOFF.md

## 現在のステータス (v4.4.7 - デプロイ準備中)
- **Completed** (完了)
  - 全STEPのAPI呼び出しタイムアウトを+60秒延長（Gemini: 120s, OpenAI-Text: 120s, Imagen: 180s, OpenAI-Image: 360s）。
  - UI上の画像生成の所要時間表示を「2〜6分」に更新。
  - 安全ポリシーのエラー文言（web貼り付け方式）を明確化。
  - バージョン番号を **v4.4.7** に引き上げ、`package.json`, `index.html`, `src/lib/constants.js`, `README.md` の同期を完了。

## 残りのタスク (Remaining Tasks)
- 本番環境（GitHub Pages）へのデプロイ (`npm run deploy`) を完了する。
- 変更内容のコミットとプッシュ、およびアノテーテッドタグ打ち (`v4.4.7`) / リリース作成 (`gh release create`) を完了する。
- ZIP検証と C ドライブローカル展開バックアップ (`C:\nano-banana-pro-main` の差し替え) を完了する。
