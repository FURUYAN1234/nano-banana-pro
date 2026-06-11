## What's New / 更新内容

### Bug Fixes / バグ修正

- **Dialogue extraction: Expression description false positive** / セリフ抽出: 表情描写の誤抽出修正
  - Quoted text containing emotion notation symbols (e.g. `「怒り＋呆れMAX」`) was incorrectly extracted as speech bubble dialogue. Added `isExpressionOrActionDescription` filter to detect and exclude these.
  - カギ括弧内の感情記述記号（＋やMAX等）を含む表情描写がセリフとして誤抽出される問題を修正。

- **Dialogue extraction: Action idiom false positive** / セリフ抽出: 動作イディオムの誤抽出修正
  - Common action/state idioms (e.g. `「言葉を失う」`, `「息を呑む」`, `「絶句」`) were appearing in speech bubbles. Added idiom detection to the fallback parser.
  - 動作・状態イディオム（「言葉を失う」「息を呑む」等）がセリフ吹き出しに混入するバグを修正。

- **Visual text context: Compound word false negative** / 視覚テキスト判定: 複合語の誤マッチ修正
  - The word `一文字` (straight line) in `口元を一文字に引き締めて` was matching the `文字` (text/character) pattern in `isVisualTextByContext`, causing legitimate dialogue `「ログ記録は…？」` to be silently dropped. Added negative lookbehind `(?<![一数何])` to prevent compound word false matches.
  - 「一文字に引き締めて」の「一文字」が「文字」に誤マッチし、正規セリフ「ログ記録は…？」が消失するバグを修正。
