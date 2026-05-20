# HANDOFF.md (v3.88-alpha / ControlBar Modularization & Deploy)

## Current Status
- **ControlBar Component Modularized** (上部コントロールバーの外部コンポーネント化完了)
- `src/App.jsx` 内の上部プログレスバー / 設定操作ボタンを `<ControlBar>` （ `src/components/ControlBar.jsx` ）へ分割・抽出し、JSXコード量を大幅に削減（約190行）。インポートパスのバグを解消し、一貫ビルドと動作を検証完了。
- **FULL AUTO CHARACTER ANALYSIS SYNC BUG FIXED** (キャラクター解析中にフルオートを押した場合のステート同期バグ修正完了)
- `isFullAutoModeRef` を導入し、 `processFiles` 内で最新のフルオートモード状態を参照できるようにすることで、認識中にフルオートボタンを押した場合でも完了後に自動でSTEP2→3→4へと進むようにした。

## Done (v3.88-alpha)
- `src/components/ControlBar.jsx` [NEW]: 上部プログレスバーおよび各種操作ボタン群（フルオート、無限ループ等）を外部コンポーネントとして新規作成。
- `src/App.jsx` [UPDATED]: コントロールバーの JSX コードを削除し、 `<ControlBar>` に置き換え。インポートを統合。
- `HANDOFF.md`, `package.json`, `src/lib/constants.js`, `index.html`, `README.md` のバージョンを `3.88-alpha` に同期。

## Done (v3.86-alpha)
- `src/App.jsx` [UPDATED]: `generateScenarioFromNews` および `assemblePrompt` にオーバーライド用引数を追加し、`runFullAuto` 内でこれらを明示的に渡すことでステートラグによる不具合を修正。

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
- `src/lib/ai-provider.js`: AI交信用のバックエンド統合および Zenith Protocol フォールバック制御 of 分離。
- `src/lib/imagen.js` & `src/lib/gemini.js`: 画像生成ロジックの分離.
- `src/lib/safety-filters.js`: エラー翻訳・セーフティフィルター分離。

## Remaining / Next Steps (Priority Order)
1. **リファクタリングの継続**: 順次さらなる細分化（カスタムフックの抽出等）が必要な場合に検討。
2. **システム稼働の監視**: 新モデルへの移行や API の安定性を継続チェック。

## Risks
- `isFullAutoModeRef.current` によるステートラグ解消は完璧だが、他の長時間の非同期処理（画像生成やシナリオ生成など）でも、実行中にユーザーが設定を切り替えた場合のステート一貫性について注意深く実装する必要がある。

## Architecture (Current)
```
src/
├── App.jsx            (1,602行 — モジュール分割・集約完了)
├── lib/
│   ├── ai-provider.js   (Zenith Protocol, callAI)
│   ├── constants.js     (SYSTEM_VERSION, categories, getModelBadgeInfo)
│   ├── gemini.js        (Gemini API connection)
│   ├── imagen.js        (Image generation)
│   ├── knowledge.js     (RAG knowledge base)
│   ├── panorama360.js   (360° image processing)
│   ├── prompt-assembler.js (buildMangaPrompt)
│   ├── prompts.js       (Prompt templates)
│   ├── safety-filters.js (Error translation, safety)
│   ├── scenario-provider.js (generateScenario)
│   └── policy-fixer.js  (regenerateSafePrompt)
└── components/
    ├── ControlBar.jsx   (Sticky top progress & controls)
    ├── SystemHeader.jsx
    ├── ApiKeyModal.jsx
    ├── Step1Panel.jsx   (Image upload / analysis)
    ├── Step2Panel.jsx   (Scenario editor)
    ├── Step3Panel.jsx   (Prompt assembler)
    ├── Step4Panel.jsx   (Manga grid & downloader)
    ├── GenerationPreview.jsx
    ├── GenerationHistory.jsx
    ├── ThinkingLog.jsx
    ├── Panorama360Viewer.jsx
    └── StepGuide.jsx
```
