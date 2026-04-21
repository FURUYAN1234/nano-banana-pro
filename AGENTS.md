# AGENTS.md

## Four-File Operating Model
All apps should use this four-file structure for multi-agent development.

- `AGENTS.md`
  - Defines how AI agents should behave.
  - Contains shared behavior rules, trigger rules, handoff rules, guardrails, and anti-refactoring rules.
- `HANDOFF.md`
  - Captures the current work snapshot.
  - Contains current status, done items, remaining tasks, risks, verification state, and next steps.
- `docs/project_standards.md`
  - Captures static app-specific rules.
  - Contains product specifications, architecture decisions, forbidden changes, protected behavior, and app-specific constraints.
- `docs/deploy.md`
  - Captures app-specific deployment rules.
  - Contains deploy target, deploy commands, platform-specific settings, forbidden deploy commands, and services that are not applicable.

**When switching apps, read these files in this order:**
1. `AGENTS.md`
2. `HANDOFF.md`
3. `docs/project_standards.md`
4. `docs/deploy.md`
5. `docs/codex_pc_sync.md` (if present; shared multi-PC / multi-app sync rules)

**Never infer deploy targets or platform rules from another app.**

---

## 常駐基本ルール (Resident Rules)

あなたは Codex / Antigravity などと連携するマルチエージェント開発環境の実装担当AIである。
通常は実装・修正・調査を行うが、他のエージェントとの相互運用を最優先する。

### 0. 絶対遵守プロセス (Mandatory Pre-Execution Protocol)
- **いかなるタスク（コード修正・調査・デプロイ）を開始する前にも、必ず以下のファイルの内容を優先的に読み込むこと（`view_file`ツール等の使用を強制する）。**
  1. `docs/project_standards.md` （個別アプリの設計・環境・禁止事項）
  2. `docs/deploy.md` （個別アプリのリリース・デプロイに関する制約と全手順）
- **汎用知識の封印**: LLM自身が持つ「一般的なWeb開発やデプロイの知識」で推測・代行してはならない。必ず上記「個別ルール」に記載された手順とコマンドを厳格に踏襲すること。

### 1. トリガー検知
- **「〇〇から移動した」** → 受領モード（まずは Analysis / Plan を出力して行動方針を確定する）
- **「〇〇に移動する」** → handoffモード（即座に作業を停止し、HANDOFF.mdを書いて引き継ぐ）

### 2. 受領時の原則
- 推測を排除し、`HANDOFF.md` と `docs/` フォルダのルールを最優先する。
- 尋ねられてもいない不要な再設計・命名変更・フォーマット変更を絶対に行わない。

### 3. handoff時の原則
- 新規実装やリファクタリングなど、「ついで」のコード修正を一切行わない。
- 完全に現状をスナップショットとして `HANDOFF.md` へ出力し、後任エージェントが差分を安全にレビューできることを最優先とする。

### 4. Knowledge Sync（記憶の共有化）
- 迷ったら推測する前に `docs/` を読む。
- 深刻なバグ修正、新たなプラットフォーム固有の仕様（Vite、HF Spaces、GH Pagesなど）を発見した場合、単にコードを直して終わりにせず、必ず `docs/troubleshooting.md` 等に事象と対策を書き残す。

### 5. Gemini API モデル定期監査 (Model Audit Protocol) — 全アプリ共通

本プロジェクト群（nano-banana-pro, comic-translation, character-sheet, story-maker）は全て Google Gemini API を使用しており、各アプリにモデルのフォールバックチェーンが存在する。

#### トリガー条件（以下のいずれかに該当する場合に実施）
- **デプロイ時**: バージョンアップ＋デプロイ指示を受けた際に、モデルリストの鮮度を簡易チェックする。
- **メジャー修正時**: 機能追加やAPI周りの修正を行う際に、ついでにモデル可用性を確認する。
- **前回監査から1ヶ月以上経過**: 前回の監査日時が1ヶ月以上前の場合、積極的に確認する。
- **API エラー多発時**: 404、モデル未検出、Quota超過などのエラー報告を受けた場合は即時確認。

#### 監査項目
1. **廃止チェック**: フォールバック内のモデルが deprecated / shutdown されていないか Web検索で確認する。
2. **新規モデル**: より高性能・安定した新モデルがリリースされていないか確認する。
3. **無料枠変更**: Free tier の制限変更（Pro系の有料化等）がないか確認する。
4. **フォールバック順序**: 上記を踏まえて、無料枠ユーザーが最もスムーズに使える順序になっているか再評価する。

#### 監査対象ファイル（アプリ別）
| アプリ | テキスト生成モデル | 画像生成モデル |
|---|---|---|
| nano-banana-pro | `src/lib/gemini.js` | `src/lib/imagen.js` |
| comic-translation | Gemini APIクライアント該当ファイル | — |
| character-sheet | Gemini APIクライアント該当ファイル | — |
| story-maker | Gemini APIクライアント該当ファイル | — |

#### 実施方法
- `search_web` で「Gemini API available models [現在の年月]」「Imagen deprecated」等を検索し、最新情報を取得する。
- 変更があった場合はユーザーに報告し、承認を得てから修正する。勝手にモデルを追加・削除しない。
- 監査結果（最終確認日・変更の有無）を簡潔にユーザーに報告する。

#### 最終監査記録
- **2026-04-21**: 全モデル可用性確認済み。gemini-2.5-pro を有料専用として降格、gemini-3.1-flash-lite-preview を昇格、imagen-3.0系を削除、gemini-2.5-flash-image をフォールバックに追加。Imagen全系列は2026/06/24に廃止予定。
