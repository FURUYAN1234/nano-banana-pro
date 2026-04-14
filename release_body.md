## Release Notes (v2.45 Alpha)

### 🎨 UI & UX Improvements (UI/UXの改善)
- **Standardized Progress Windows**: Unified font sizes across all progress logs and explanation panels (STEP 4 & Content Policy) to `text-xs` (12px) for improved readability, while maintaining `11px` for high-density neural process logs. Fixed a bug where dynamic height changes caused UI layout shifts by enforcing a static `160px` height structure. 
  (進捗窓のフォントサイズと高さを全ステップで統一。コンテンツポリシーやPRO TIPの説明は視認性の高い12pxに、プロセスログは情報密度の高い11pxに最適化。高さ変動によるレイアウト崩れをインラインスタイルで固定化しました。)
- **Translated Thinking Logs**: Localized remaining English system messages in STEP 3's Neural Process logs into Japanese for a fully unified language experience.
  (STEP3のプロンプト構築画面のシステムメッセージのうち、英語のままだった箇所をすべて日本語化しました。)

### 🐛 Bug Fixes (バグ修正)
- **Fixed Progress Timer Disappearance**: Resolved an issue where the sequential AI generation progress timer (e.g., "⏳ AI応答を待機中...") would scroll out of view when new status messages were appended by the API callback. The timer now dynamically detaches and re-appends to the bottom of the log stream, ensuring it is always visible.
  (画像生成およびシナリオ強化中のタイマーが、リアルタイムに追記されるログに埋もれて見えなくなる問題を修正。タイマーが常に最新のログ末尾に再描画されるようにロジックを改修しました。)
