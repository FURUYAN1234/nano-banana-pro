# HANDOFF.md (v3.53-alpha)

## Current Status
- v3.53-alpha デプロイ中。360° Autonomous Camera AI + Canvas Crop Engine を実装済み。
- GitHub Pages + Hugging Face Spaces へのデプロイを実施中。

## Done
- 360°背景からAIが自律的にカメラ方角(yaw/pitch/FOV)を設計する「自律カメラワークAI」実装
- Canvas APIベースの正距円筒図法クロッピングエンジン実装（水平ラップアラウンド対応）
- `is360CameraWorking` フラグによるSTEP3ロックガード追加
- カメラワークプレビューUI（方角ラベル・FOV情報付きグリッド）追加
- 360°クロッププレビューのホバーオーバーレイ削除（静的ラベルのみに簡素化）
- Three.jsベース360°ビューアー（v3.52で実装）安定動作確認済み

## Remaining / Next Steps (Phase 3)
- **個別背景注入**: 各コマ生成プロンプトへの360°クロップ済み画像の個別引き渡しロジック構築
- クロップ画像が生成された背景と正しくマッチしているかの視覚的バリデーション

## Risks
- Gemini 2.0 Flash は2026年6月1日にシャットダウン予定（本プロジェクトは2.5 Flash使用中のため影響なし）
- Canvas API クロッピングは大きな画像（8K以上）でメモリ制約が発生する可能性あり

## Files Modified (v3.53)
- `src/App.jsx` — カメラワークAI + クロップエンジン + ロックガード + プレビューUI
- `package.json` — v3.53-alpha
- `index.html` — v3.53-alpha
- `README.md` — Features + ChangeLog 更新
