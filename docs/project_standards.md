# PROJECT RULES: nano-banana-pro

## Project Overview
Nano Banana Pro は、Gemini などの生成AIを用いたマンガ（画像＋シナリオ）生成ツールである。

## Architecture Guardrails (絶対防衛ライン)
AI（Codex等）の過剰な最適化によるシステム破壊を絶対に防ぐこと。以下のロジックは、冗長・特殊・長すぎるように見えても、推測で削除・短縮・単純化してはいけない。

### 1. API特有のエラーハンドリング
- Gemini API 等の `429 Too Many Requests` 回避や、非同期処理の確実性を担保するための意図的な `wait loop`, `retry` 処理, `defensive fallback` を勝手に削らないこと。

### 2. プロンプトの物理強制力 (Geometry Lock)
- `Absolute Physical Geometry Lock` を筆頭とする、AIのハルシネーションやフォーマット逸脱を防ぐための「執拗で長大なルール指定」。プロンプトが長すぎるからといって、システムの中核を勝手に要約・短縮してはならない。

## Forbidden Files / Settings (変更禁止)
- `src/App.jsx` 内にある `SYSTEM_VERSION` などは、必ず `package.json` 等と連動させること（単独変更しない）。
- API Key などの機密情報をフロントエンドコードにハードコードしないこと（.env経由やユーザー入力とする）。
