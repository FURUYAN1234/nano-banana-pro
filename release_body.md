## 📱 Responsive Layout & UI Polish / レスポンシブ対応およびUIの洗練

### What's New / 変更内容

**1. Responsive Header Fix / ヘッダーのレスポンシブ対応**
- Fixed text overflow and layout truncation on extremely narrow browser widths by implementing `flex-wrap` and `whitespace-normal` on the header elements. The sticky progress bar is now completely responsive and will not cut off text.
- ブラウザ幅を極端に狭めた際に文字が見切れる問題を修正しました。ヘッダーの各要素に `flex-wrap` と `whitespace-normal` を導入し、完全なレスポンシブ対応を実現しました。

**2. Full Auto Button Labeling Optimization / フルオートボタン表記の最適化**
- Validated "Full Auto" button action-oriented labeling ("⚡ フルオート ON" / "⏹ フルオート中断") to provide optimal UX, and corrected the instructional text to accurately reflect the system's hard reset behavior upon interruption.
- フルオートボタンのアクション指向の表記（「⚡ フルオート ON」 / 「⏹ フルオート中断」）を最適化し、中断後に再開した際の仕様（STEP2からの新シナリオ再生成）が説明文に正確に反映されるよう修正しました。
