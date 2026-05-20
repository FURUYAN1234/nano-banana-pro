# HANDOFF.md (v3.87-alpha / Stale State Closure Bugfix & Deploy)

## Current Status
- **FULL AUTO CHARACTER ANALYSIS SYNC BUG FIXED** (キャラクター解析中にフルオートを押した場合のステート同期バグ修正完了)
- `App.jsx` 内の非同期関数 `processFiles`（キャラクター解析）実行中にユーザーがフルオートボタンを押した場合、非同期処理のクロージャ内に古いステート `isFullAutoMode = false` がキャプチャされてしまい、解析完了後にフルオートが始まらないバグを修正。
- `isFullAutoModeRef` を導入し、 `processFiles` 内で最新のフルオートモード状態を参照できるようにすることで、認識中にフルオートボタンを押した場合でも完了後に自動でSTEP2→3→4へと進むようにした。
- ローカル環境でビルド動作確認を行い、正常にビルドできることを確認。

## Done (v3.87-alpha)
- `src/App.jsx` [UPDATED]: `isFullAutoModeRef` を定義して `isFullAutoMode` ステートと同期させ、非同期関数 `processFiles` 内で `isFullAutoMode` の代わりに `isFullAutoModeRef.current` をチェックするように修正。
- `HANDOFF.md`, `package.json`, `src/lib/constants.js`, `index.html`, `README.md` のバージョンを `3.87-alpha` に同期。

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
1. **Phase 4**: JSX UIコンポーネント分割 (~1,700行のJSX部)
   - Header, Step1Panel, Step2Panel, Step3Panel, Step4Panel
2. **リファクタリングの継続**: デプロイ完了後、残りの分割作業を再開する。

## Risks
- `isFullAutoModeRef.current` によるステートラグ解消は完璧だが、他の長時間の非同期処理（画像生成やシナリオ生成など）でも、実行中にユーザーが設定を切り替えた場合のステート一貫性について注意深く実装する必要がある。

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
│   ├── prompt-assembler.js (buildMangaPrompt)
│   ├── prompts.js       (Prompt templates)
│   └── safety-filters.js (Error translation, safety)
└── components/
    ├── ThinkingLog.jsx
    ├── Panorama360Viewer.jsx
    └── StepGuide.jsx
```
