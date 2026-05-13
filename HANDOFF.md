# HANDOFF

## Current Status
- ドキュメンタリーモード用のコンテンツサニタイザーをv3.0にアップデートし、3層ハイブリッド設計（Tier1: 完全意味置換, Tier2: ●伏せ字, Tier3: 完全置換）を実装完了しました。
- ユーザーによるローカル検証が成功し、ニュース本文の安全な漫画化（過激なトリガーワードの回避）が機能することを確認しました。
- システムバージョンは `v3.47-alpha` に更新されています。

## Done Items
- `src/App.jsx` の `CONTENT_SAFETY_DICT` を拡張し、Tier1に核・WMD関連および軍事コンテキスト増幅語を追加しました。
- 爆弾関連をTier2からTier1寄りの完全置換に変更し、血液関連パターンをTier3に拡充しました。
- `package.json`, `index.html`, `src/App.jsx` のバージョンを `v3.47-alpha` に更新しました。
- `README.md` に Changelog を追記しました。

## Remaining Tasks
- GitHub Pages および Hugging Face Spaces へのデプロイ実行。

## Risks & Notes
- デプロイを実行する際は、本プロジェクトの `docs/deploy.md` の手順に必ず従うこと。
