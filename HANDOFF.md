# HANDOFF

## Current Status
- セリフ抽出およびキャラ配置ロジックにおいて、効果音や「（リアクション: ...）」等のト書きが話者名として誤認され、吹き出しや配置指示に混入する致命的なバグを修正完了しました。
- AGENTS.md に「バグ修正・コード変更後のローカル検証提示義務」のルールを追加完了しました。
- システムバージョンは `v3.46-alpha` に更新されています。

## Done Items
- `src/App.jsx` の `isMetaTag` 判定条件に、効果音パターンの検出ロジックとリアクション指示の検出ロジックを追加し、3つの抽出関数に適用しました。
- 修正後のローカル動作検証にて、偽の吹き出しが排除されたことを確認。
- AGENTS.md にセクション 3.6 を追加。
- `src/App.jsx` に監査用メタデータJSONのダウンロード機能を追加しました。
- `README.md` および HF 用 `README.md` に新機能を追記し、バージョン番号の同期（`package.json`, `App.jsx`, `index.html`）を完了しました。

## Remaining Tasks
- GitHub Pages および Hugging Face Spaces へのデプロイ実行。

## Risks & Notes
- デプロイを実行する際は、本プロジェクトの `docs/deploy.md` の手順に必ず従うこと。
