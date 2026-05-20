# HANDOFF.md (v3.86-alpha / Full Auto Bugfix & Deploy)

## Current Status
- **SCENARIO GENERATION & POLICY FIXER REFACTOR COMPLETED** (シナリオ生成・ポリシー自動修正ロジックの外部モジュール化完了)
- **FULL AUTO STATE SYNC BUG FIXED** (フルオート生成モード時のステート同期遅れによる不具合を修正)
- `App.jsx` 内のシナリオ生成ロジックを `src/lib/scenario-provider.js` に、ポリシー自動修正ロジックを `src/lib/policy-fixer.js` にそれぞれ抽出・外部化。
- フルオート生成時に React のステート更新ラグによって手動入力モードと誤判定されたり、意図しない ChatGPT モードがオンになったりする不具合を、引数によるオーバーライドを導入して完全に解消。
- ローカル環境での画像生成および一連の動作の動作検証を完了。

## Done (v3.86-alpha)
- `src/App.jsx` [UPDATED]: `generateScenarioFromNews` および `assemblePrompt` にオーバーライド用引数を追加し、`runFullAuto` 内でこれらを明示的に渡すことでステートラグによる不具合を修正。
- `HANDOFF.md`, `package.json`, `src/lib/constants.js`, `index.html`, `README.md` のバージョンを `3.86-alpha` に同期。

## Done (Phase 3 - Part 2)
- `src/lib/scenario-provider.js` [NEW]: シナリオ生成処理（ ** `generateScenario` ** / ** `generateScenarioStream` ** ）および数百行に及ぶ巨大なシナリオ生成プロンプトテンプレートを外部ファイル化。
- `src/lib/policy-fixer.js` [NEW]: コンテンツポリシーの自動修正処理（ ** `regenerateSafePrompt` ** / ** `regenerateSafePromptFallback` ** ）および付随するプロンプト定義を外部ファイル化。
- `src/App.jsx` [UPDATED]: シナリオ生成およびポリシー自動修正処理を外部モジュール呼び出しに差し替え。

## Done (Phase 3 - Part 1)
- `src/lib/prompt-assembler.js` [NEW]: `assemblePrompt` 内のプロンプト構築ロジックを `buildMangaPrompt` として外出し。
- `src/lib/panel-utils.js` [UPDATED]: ユーティリティ関数群（`extractEmotionStyle` 等）を外部化。
- `src/lib/prompts.js` [UPDATED]: ChatGPT/Gemini 用の巨大マンガプロンプトテンプレートをビルダー関数として外部化。

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
