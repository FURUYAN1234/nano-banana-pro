# HANDOFF.md

## 現在のステータス (Deploying v4.6.3)
- **バージョン**: v4.6.3
- **最新の変更点**:
  - コロン形式ト書き（キャラ名：ポーズ描写）のセリフ誤抽出を修正
  - 照明・SE行がキャラ名として扱われる不具合を修正
  - MOOD_CONTEXT_REの過剰マッチ（表情/反応等）を修正
  - protectNonDialogueTextHintsがセリフのカギ括弧を破壊する不具合を修正

## 検証待ちタスク (Pending Verification Tasks)
- [x] GitHub Pages デプロイ検証
- [x] GitHub Release 作成
- [x] `backup_launch.bat` によるPS1フルアプリバックアップ完了
