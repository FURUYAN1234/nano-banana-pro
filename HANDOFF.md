# HANDOFF.md (v3.75-alpha / Prompt & Panorama Refactoring Done)

## Current Status
- **DEPLOYMENT** (デプロイ実行中)
- `src/App.jsx` を 5,157行 → **4,844行** (313行削減) まで圧縮完了。
- Phase 3-A（360°パノラマロジックおよび一部巨大プロンプトテンプレートの分離）完了。
- ビルド成功（`npm run build` 通過）＆ローカル動作確認済み。
- ユーザー指示「画像まででたのでいったんデフロイして」に基づき、デプロイ手順を実行中。

## Done (Phase 3)
- `src/lib/panorama360.js` [NEW]: `cropEquirectangular`, `validate360Image`, `get360AnalysisPrompt`, `parse360Analysis` を App.jsx から抽出・統合。
- `src/lib/prompts.js` [NEW]: `getCharacterAnalysisPrompt` (STEP1用 78行), `getScenarioEnhancePrompt` (STEP2.5用 33行) を App.jsx から抽出。
- `src/lib/constants.js` [UPDATED]: `getModelBadgeInfo` 関数を追加 (App.jsx から移動)。
- `src/App.jsx` [UPDATED]: 上記モジュールのインポートに置換、インラインプロンプト・関数定義を削除。

## Done (Previous Phases 1-2, already committed)
- `src/lib/constants.js`: 定数およびカテゴリ定義の切り出し。
- `src/lib/ai-provider.js`: AI交信用のバックエンド統合および Zenith Protocol フォールバック制御の分離。
- `src/lib/imagen.js` & `src/lib/gemini.js`: 画像生成ロジックの分離。
- `src/lib/safety-filters.js`: エラー翻訳・セーフティフィルター分離。

## Remaining / Next Steps (Priority Order)
1. **Phase 3 残り**: App.jsx 内の他のプロンプトテンプレート外出し
   - STEP2 シナリオ生成プロンプト (~数百行の巨大テンプレート)
   - STEP3 `assemblePrompt` 内のプロンプト組立ロジック (~1,218行 — **最大の山場**)
   - ポリシー修正プロンプト (`regenerateSafePrompt`, `regenerateSafePromptFallback`)
2. **Phase 4**: JSX UIコンポーネント分割 (~1,700行のJSX部)
   - Header, Step1Panel, Step2Panel, Step3Panel, Step4Panel
3. **リファクタリングの継続**: デプロイ完了後、残りの分割作業を再開する。

## Risks
- `assemblePrompt` (1,218行) のリファクタリングは state への密結合が激しく、慎重に進める必要あり。
- 前回 `multi_replace_file_content` でターゲットコンテンツの誤マッチが発生し App.jsx が破壊された事例あり → `git checkout -- src/App.jsx` で復元済み。**今後は1回の編集で複数ブロックをまたがる置換は避け、1つずつ安全に行うこと。**

## Architecture (Current)
```
src/
37: src/
38: ├── App.jsx            (4,844行 — 目標500行)
39: ├── lib/
40: │   ├── ai-provider.js   (Zenith Protocol, callAI)
41: │   ├── constants.js     (SYSTEM_VERSION, categories, getModelBadgeInfo)
42: │   ├── gemini.js        (Gemini API connection)
43: │   ├── imagen.js        (Image generation)
44: │   ├── knowledge.js     (RAG knowledge base)
45: │   ├── panorama360.js   [NEW] (360° image processing)
46: │   ├── prompts.js       [NEW] (Prompt templates)
47: │   └── safety-filters.js (Error translation, safety)
48: └── components/
49:     ├── ThinkingLog.jsx
50:     ├── Panorama360Viewer.jsx
51:     └── StepGuide.jsx
```
