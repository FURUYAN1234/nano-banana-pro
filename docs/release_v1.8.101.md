## 🚀 Release v1.8.101 Alpha

### 📝 Summary / 概要

This release significantly improves the AI's understanding of complex prompt instructions, eliminating scenarios where dialogue metadata or SFX tags were erroneously rendered as captions.
本リリースでは、AIプロンプトのパース精度を大幅に向上させ、台詞のメタデータや効果音タグが誤って画像内のキャプションとして描画されてしまう問題を解消しました。

### ✨ Key Changes / 主な変更点

- **[PROMPT FIX] Dialogue Cleaner Refactor**: Completely rewrote the regex text filtering to process lines iteratively structure.
  - **ダイアログクリーナー刷新**: セリフを抽出する正規表現処理を根本的に見直し、1行ずつより正確にクリーニングするようリファクタリングしました。
  
- **[BUG FIX] Prevent Raw Syntax Render**: Prevented AI from rendering raw syntax like `(Speaker: サエコ)` or `SFX:` as textual captions directly onto the manga canvas and speech bubbles.
  - **メタデータ描画バグの修正**: `(Speaker: サエコ)` や `SFX:` のような接頭辞が、AIによって吹き出し内やキャンバスにそのまま文字として描き込まれてしまう現象を防止しました。

### 📦 Verify / 確認

- This version is active on GitHub Pages.
  本バージョンはGitHub Pages上で既に稼働しています。
- Please check that URL parameters like `?v=18101` serve the correct version.
  キャッシュ対策として `?v=18101` などのクエリパラメータを付与してアクセスし、正しく適用されているか確認してください。
