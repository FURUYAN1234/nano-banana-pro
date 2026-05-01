## v2.90.0 Alpha — Punchline Randomizer & Reset Fix

### 🐛 Bug Fix
- **Reset input button now clears analysis results**: Clicking "Reset Input" now also clears the character analysis results (castList) in addition to uploaded images. Previously, analysis results remained visible after reset.
- **「入力をリセット」ボタンの修正**: リセット時にキャラクター解析結果（castList）もクリアされるようになりました。従来は解析結果が残ったままになっていたバグを修正しました。

### ✨ Improvement
- **Punchline type randomizer (Anti-Repetition System)**: Implemented a JS-side random selector that picks one of 8 punchline types on every generation. This prevents the AI from gravitating toward the same ending patterns (e.g., "character pointing", "collection gag"). The randomization happens in JavaScript, not inside the AI, to ensure true variety.
- **オチランダム化システム（マンネリ防止）**: 生成ごとに8種類のオチタイプをJS側でランダムに決定し、AIに強制するシステムを実装。キャラクターのペルソナ（趣味・口癖）をそのままオチに使う「ペルソナ依存オチ」を明示的に禁止するAnti-Persona-Gravityルールも追加。

### 🧹 Cleanup
- Removed unused `resetAll` function from codebase.
- 未使用の`resetAll`関数を削除。

