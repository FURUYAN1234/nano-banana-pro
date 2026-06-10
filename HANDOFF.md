# HANDOFF.md

## 現在のステータス (Deploying v4.6.7)
- **バージョン**: v4.6.7
- **最新の変更点**:
  - extractDialogueOnly fallback: 表情描写（「怒り＋呆れMAX」等）がセリフとして誤抽出されるバグを修正（isExpressionOrActionDescription追加）
  - extractDialogueOnly fallback: 動作イディオム（「言葉を失う」等）がセリフ吹き出しに混入するバグを修正
  - isVisualTextByContext: 「一文字」が「文字」に誤マッチし正規セリフ「ログ記録は…？」が消失するバグを修正（negative lookbehind追加）

## 検証待ちタスク (Pending Verification Tasks)
- [ ] GitHub Pages デプロイ検証
- [ ] GitHub Release 作成
- [ ] ZIP検証とローカルフォルダ差し替え
