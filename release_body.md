## 🚀 Updates / 変更点

* **UI/UX Refinements (Progress Trackers):** Fixed intermittent countdown stalling during cross-model fallback steps by switching interval logic to a resilient inline regex update. Also decoupled `isGeneratingImage` state in STEP 4 to prevent total screen deactivation while retaining action-lock on necessary elements.
* **Content Policy Rescue UI Upgrade:** Frozen the generated output console via inline `style={{ height: '240px' }}` forcing stable panel footprint regardless of Tailwind DOM repaints, and injected empty-state placeholder strings.
* **Component Localization (i18n):** Deeply replaced developer-facing "Visual Cortex Protocols Initiated...", "Scanning pixel data arrays...", and "Extracting facial landmarks..." fake streaming strings to native Japanese equivalent to ensure coherent domestic UI/UX on STEP 1 & STEP 2 endpoints.

---

* **UI/UXの全体的な改善（進捗バーの修正等）:** STEP1～STEP2でモデルがフォールバックして切り替わる際、コールバックログが挿入されてタイマーが停止してしまう問題を、正規表現の緩和によって修正し、常にカウントが続くように改善しました。また、STEP4（画像生成）のUI状態を他のSTEPと分離させ、生成中も全画面が非活性にならず、不要なハングアップ感を消去しました。
* **コンテンツポリシーパネルの視認性固定:** エラー回避用の進捗ログ出力パネルが結果出力後にガタつく問題を修正するため、Tailwindクラスの`h-48`からインラインスタイルの`height: 240px`固定指定に変更し、解析前でもプレースホルダーを常時表示させることでレイアウトを完全に固定化しました。
* **フェイクストリーミングメッセージの日本語化:** STEP1のキャラクター解析時やSTEP2のシチュエーション構築時などに表示される英語のフェイクストリーミングログ（`Visual Cortex Protocols Initiated...` 等）を全て直感的な日本語に翻訳し、UXを統一しました。
