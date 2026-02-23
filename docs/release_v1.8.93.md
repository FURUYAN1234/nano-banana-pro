# v1.8.93 Alpha

## Quality Improvement & Cleanliness / 品質向上とクリーンアップ

### 🔧 Improvements / 改善点

* **Vertical Text Enforcement / 縦書きの強制**:
  * Revised prompt to strongly enforce vertical Japanese text in speech bubbles. / 吹き出し内の日本語が横書きになりやすい問題を修正し、縦書きになるよう指示を強化しました。
* **No English Subtitles / 英語字幕の削除**:
  * Added negative constraints to prevent unwanted English translations below sound effects (SFX). / 擬音（オノマトペ）の下に英語の訳文が表示される現象を修正しました。
* **Dialogue Cleanup / セリフのクリーンアップ**:
  * Implemented a logic to automatically remove parenthetical actions (e.g., "(laughs)", "(angry)") from the dialogue text. / AIが生成するセリフに含まれるト書き（「(笑)」や「(怒って)」など）をプログラム側で自動削除するようにしました。

---
**Full Changelog**: <https://github.com/FURUYANA1234/nano-banana-pro/compare/v1.8.92...v1.8.93>
