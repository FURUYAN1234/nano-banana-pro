## Nano Banana Pro v2.46 Alpha - UI Locking Mechanism Overhaul 🔒

### 🐞 Bug Fixes & Improvements (English)
*   **STEP UI Disablement Overhaul**: Completely rewrote the UI element deactivation logic for steps that are currently locked (e.g. while processing or waiting for preceding steps). 
    *   Replaced unreliable Tailwind `blur` filter classes with robust inline-styled overlay panels (`absolute inset-[-2px] z-[200] background-color: rgba(0,0,0,0.92) backdrop-filter: blur(8px)`).
    *   This perfectly solves visual bugs caused by stacking context inconsistencies where locked panels remained clearly visible beneath blurred CSS filters.
*   **Font Style Correction**: Removed unintended `italic` classes applied to placeholder text within the **Neural Process (Thinking Mode) log** and the **STEP 4 Image Generation standby message**, restoring consistent typography.

---

### 🐞 バグ修正・改善事項 (日本語)
*   **STEP非活性化ロジックの抜本的改修**: 処理中や前提条件を満たしていないブロック（STEP2〜4）が見えてしまう・操作可能になってしまう不具合を完全に修正しました。
    *   CSSフィルターによる `blur` クラス指定を廃止し、**各要素上に強制的に被さるインラインスタイルの暗転オーバーレイ**（z-index: 200, バックドロップブラー付き）を配置する方式に変更しました。
    *   これにより、スタッキングコンテキスト（階層構造）の問題に起因する親のフィルター貫通バグが完全に解消され、待機中は後続UIが確実に見えなくなり、操作もブロックされます。
*   **フォントスタイルの修正**: **ThinkingLog** のプレースホルダーメッセージや、**STEP4出力エリア**の「待機中…」メッセージに誤って掛かっていた `italic` （斜体）のクラスを取り除き、通常のフォントスタイルに統一しました。
