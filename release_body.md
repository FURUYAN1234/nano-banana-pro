## Nano Banana Pro v2.59.0-alpha

### EN
- **Optimization**: Completely overhauled the Gemini API model fallback lists in preparation for the deprecation of the official Imagen series models (June 24, 2026). Promoted `gemini-3.1-flash-lite-preview` and `gemini-2.5-flash-image` as primary free-tier fallbacks, and correctly updated modal payloads for native Gemini image generation. 
- **System**: Implemented the multi-agent `Model Audit Protocol` across the standard `AGENTS.md` file, standardizing API availability checks across all 4 Antigravity applications.
- **UI**: Added the new NEXT GEN (gemini-3.1) and LEGACY (imagen) badges to the user interface to visually delineate legacy and tier capacities appropriately.

### JP
- **最適化**: 2026年6月24日に予定されているImagen全系列の廃止に向けて、Gemini APIのモデルフォールバックリストを全面刷新しました。無料枠での動作を保証するため `gemini-3.1-flash-lite-preview` や `gemini-2.5-flash-image` を主要フォールバックに昇格させ、画像生成時の必須ペイロードを改修しました。
- **システム**: `AGENTS.md` に「Gemini API モデル定期監査 (Model Audit Protocol)」ルールを追加し、全4アプリ共通でのAPI可用性自動チェック体制を確立しました。
- **UI**: モデル表示バッジを更新し、次世代モデル（NEXT GEN）と廃止予定モデル（LEGACY）を視覚的に判別できるようにしました。
