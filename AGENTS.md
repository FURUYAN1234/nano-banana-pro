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
