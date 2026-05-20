# HANDOFF.md (v3.82-alpha / Refactor & Deploy)

## Current Status
- **PROMPT ASSEMBLER REFACTOR COMPLETED** (プロンプト組立ロジックの外部化完了)
- `App.jsx` 内の複雑なプロンプト構築関数 `assemblePrompt` を `src/lib/prompt-assembler.js` に抽出・外部化しました。
- これにより、`App.jsx` から約 200 行の密結合プロンプト構築処理が削減され、状態遷移やパラメータ管理が大幅にシンプル化されました。
- プロダクションビルド (`npm run build`) はエラーなく成功しており、構文的な健全性を保証しています。
- ローカル開発サーバーは正常に動作しています。

## Done (Phase 3)
- `src/lib/prompt-assembler.js` [NEW]: `assemblePrompt` 内のプロンプト構築ロジックを `buildMangaPrompt` として完全に外出しし、状態管理のクリーンアップを実施。
- `src/lib/panel-utils.js` [UPDATED]: `extractEmotionStyle`, `buildEmotionBlock`, `cleanCastList` などのユーティリティ関数群を外部化。
- `src/lib/prompts.js` [UPDATED]: ChatGPT/Gemini 用の巨大マンガプロンプトテンプレートをビルダー関数 (`buildChatGPTMangaPrompt`, `buildGeminiMangaPrompt`) として外部化。
- `src/App.jsx` [UPDATED]: プロンプト構築処理を `buildMangaPrompt` の呼び出しに置換し、さらにコードをクリーンアップ。

## Done (Previous Phases 1-2, already committed)
- `src/lib/constants.js`: 定数およびカテゴリ定義の切り出し。
- `src/lib/ai-provider.js`: AI交信用のバックエンド統合および Zenith Protocol フォールバック制御の分離。
- `src/lib/imagen.js` & `src/lib/gemini.js`: 画像生成ロジックの分離.
- `src/lib/safety-filters.js`: エラー翻訳・セーフティフィルター分離。

## Remaining / Next Steps (Priority Order)
1. **Phase 3 残り**: App.jsx 内の他のプロンプトテンプレート外出し
   - STEP2 シナリオ生成プロンプト (~数百行の巨大テンプレート)
   - ポリシー修正プロンプト (`regenerateSafePrompt`, `regenerateSafePromptFallback`)
2. **Phase 4**: JSX UIコンポーネント分割 (~1,700行のJSX部)
   - Header, Step1Panel, Step2Panel, Step3Panel, Step4Panel
3. **リファクタリングの継続**: デプロイ完了後、残りの分割作業を再開する。

## Risks
- `assemblePrompt` からの state 依存ロジック切り出しは成功したものの、今後のシナリオ生成（STEP2）の外部化においても、`setScenario` や各 thought state とのやり取りを慎重に処理する必要あり。

## Architecture (Current)
```
src/
├── App.jsx            (4,560行 — 目標500行へ前進)
├── lib/
│   ├── ai-provider.js   (Zenith Protocol, callAI)
│   ├── constants.js     (SYSTEM_VERSION, categories, getModelBadgeInfo)
│   ├── gemini.js        (Gemini API connection)
│   ├── imagen.js        (Image generation)
│   ├── knowledge.js     (RAG knowledge base)
│   ├── panorama360.js   (360° image processing)
│   ├── prompt-assembler.js [NEW] (buildMangaPrompt)
│   ├── prompts.js       (Prompt templates)
│   └── safety-filters.js (Error translation, safety)
└── components/
    ├── ThinkingLog.jsx
    ├── Panorama360Viewer.jsx
    └── StepGuide.jsx
```
