# v2.47 Alpha - Camera Work & Dialogue Enhancement / カメラワーク・セリフ強化

## 🐛 Bug Fixes / バグ修正

- **STEP3 "最終プロンプトを構築する" ボタン押下時にSTEP2エリアが消えるバグを修正**
  - Fixed: STEP2 overlay incorrectly activated during STEP3 prompt assembly (`isAssembling` removed from STEP2 lock condition)
- **STEP3構築中にSTEP4エリア（ボタン下）が真っ黒になりログが見えないバグを修正**
  - Fixed: STEP4 overlay now hides during prompt assembly so users can see the build progress log

## ✨ New Features / 新機能

### シナリオ強化パネル - 2カテゴリ追加 (4→6)

- **📷 カメラワーク強化**: 各コマにアオリ・俯瞰・ダッチアングル・超広角等の映画的カメラアングル指示を追加
  - ⚠️ アオリ等の過激なアングルはコンテンツポリシーに引っかかる場合がありますが、既存の救済機能で対応可能
- **💬 セリフ・ギャグ強化**: 4コマ漫画の起承転結テンポを最大化。ツッコミのキレ向上、オチの破壊力最大化、伏線回収による笑い

## 📐 UI Changes / UI変更

- シナリオ強化パネルのグリッドレイアウトを `2x2` → `2x3` (lg: `3x2`) に拡張
- Current Targets表示にカメラ・セリフカテゴリを追加
