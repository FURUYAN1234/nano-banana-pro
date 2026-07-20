## Nano Banana Pro v4.9.5

### 日本語

- シナリオ本文全体の表現衛生チェックを追加し、危険な生物・武器化・内臓表現などを検出した場合は再試行または fail-closed にします。
- 背景ロケーションを安全なキュレーション候補または安全な新規ロケーションのハイブリッド方式に整理し、360度背景分析でも危険な有機表現を通しません。
- Gemini と OpenAI のシナリオ→画像生成を実 API で検証しました（テキスト生成と画像生成の各段階）。
- API キー、個人情報、固有名詞、ゴミファイル、Hugging Face 公開物をデプロイ前ゲートで検査します。

### English

- Added full-scenario wording hygiene checks with retry and fail-closed behavior for unsafe biological, weaponized, or body-interior content.
- Hardened the background-location flow around a safe curated-or-new hybrid plan, including 360-degree background analysis safety checks.
- Verified the scenario-to-image flow with real Gemini and OpenAI API runs across text and image-generation stages.
- Added release gates for API-key/PII/proper-noun/garbage-file hygiene and Hugging Face publication checks.

### Verification

- 79 automated tests passed.
- ESLint passed.
- Production build passed.
- Strict pre-deploy security/version/hygiene checks passed for v4.9.5.
