# HANDOFF.md

## 現在のステータス (Deploying v4.6.6)
- **バージョン**: v4.6.6
- **最新の変更点**:
  - 擬音語（ガチャン！、ガリッ！！等）がセリフ吹き出しに混入するバグを修正（isSfx正規表現にンを追加、SFXステム18語拡充）
  - protectNonDialogueTextHintsが隣接セリフの語彙を誤検知し正当なセリフを破壊するバグを修正（文脈ウィンドウ56→30文字に縮小）
  - 音響効果等のSEメタタグ直後の擬音がフォールバックループで誤抽出される問題を修正

## 検証待ちタスク (Pending Verification Tasks)
- [ ] GitHub Pages デプロイ検証
- [ ] GitHub Release 作成
- [ ] ZIP検証とローカルフォルダ差し替え
