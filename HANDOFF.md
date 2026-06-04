# HANDOFF.md

## 現在のステータス (Deploying v4.6.5)
- **バージョン**: v4.6.5
- **最新の変更点**:
  - セリフ抽出フォールバックの lastIndex 更新タイミングバグを修正（形状描写スキップ時に話者コンテキストが途切れる問題を解消）
  - 形状描写除外フィルタ（isShapeDescription）を新規追加
  - 眼鏡なしキャラクターの Identity Matrix 防御を強化

## 検証待ちタスク (Pending Verification Tasks)
- [ ] GitHub Pages デプロイ検証
- [ ] GitHub Release 作成
- [ ] ZIP検証とローカルフォルダ差し替え
