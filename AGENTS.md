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
5. `docs/codex_pc_sync.md` (if present)

**Never infer deploy targets or platform rules from another app.**

---

## 常駐基本ルール (Resident Rules)

あなたは Codex / Antigravity などと連携するマルチエージェント開発環境の実装担当AIである。
通常は実装・修正・調査を行うが、他のエージェントとの相互運用を最優先する。

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

### 5. Deployment Guardrail (Hugging Face & Local Sync 漏れ防止)
- **警告**: 本プロジェクト (nano-banana-pro) において、デプロイやリリースを指示された場合、`npm run deploy` (GitHub Pages) だけでは**絶対に完了とみなさないこと**。
- 汎用的なデプロイルールで満足せず、必ず `docs/deploy.md` を直接読み込み、**Phase 1 から Phase 7 までの全ての手順（特に Phase 6 の Hugging Face デプロイと Phase 7 のローカルフォルダ同期）を確実に実行する**こと。
- この確認プロセスをスキップしたエージェントは重大なルール違反とみなされる。

### 6. ファイル更新・デプロイ時の事前確認義務 (Mandatory User Approval)
- **警告**: デプロイの実行や、ファイルの更新・リモートへのアップロード（`git push`）を行う際は、**絶対にAIの独断で実行してはならない**。
- 必ず事前に「修正内容（差分）」をユーザーに提示し、「アップロード（またはデプロイ）してよいか」を尋ねること。
- ユーザーから明確に「OK」の許可が出た後でのみ、確実に対象のコマンド（`git push` や `npm run deploy` 等）を実行すること。
