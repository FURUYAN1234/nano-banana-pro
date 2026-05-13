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

### 3.5. 破壊的変更前の防衛プロトコル (Safety Protocols)
- **【編集前のスナップショット義務】**: `src/App.jsx` などのコアファイルを編集する際は、必ず事前にバックアップファイル（例: `temp_App_backup.jsx`）を作成し、いつでも元の状態にロールバックできるようにしてから作業を開始する。
- **【Visual Regression（視覚的な後退）の確認義務】**: UIに変更を加えた後は、直ちに「作業完了」と報告しないこと。必ず `npm run dev` で起動し、ブラウザサブエージェント（`browser_subagent`）等を用いて「他の要素が崩れていないか」「意図したレイアウト通りか」を自己検証してから報告する。

### 3.6. バグ修正・コード変更後のローカル検証提示義務 (Mandatory Local Verification)
- **【絶対ルール】** `src/App.jsx` 等のコードにバグ修正や機能変更を加えた場合、修正の報告と**同時に**以下を**必ず**実行すること。ユーザーからの指示を待つな。
  1. `npm run dev` でローカル開発サーバーを起動する（既に起動中なら再起動不要）。
  2. ローカルURL（例: `http://localhost:5173/`）を**明示的にユーザーに提示**する。
  3. 「ローカルで検証をお願いします」と一言添える。
- **禁止**: コード修正を報告しておきながら、サーバーのURLを提示せず「デプロイしますか？」と先に進むこと。ユーザーが手元で動作確認する機会を必ず設けること。

### 4. Knowledge Sync（記憶の共有化）
- 迷ったら推測する前に `docs/` を読む。
- 深刻なバグ修正、新たなプラットフォーム固有の仕様（Vite、HF Spaces、GH Pagesなど）を発見した場合、単にコードを直して終わりにせず、必ず `docs/troubleshooting.md` 等に事象と対策を書き残す。

### 5. Deployment Guardrail (デプロイ前のセキュリティ監査と完了条件)
- **【必須】デプロイ前セキュリティ監査**: デプロイを実行する前に、**必ず**以下の3点のセキュリティ・コンプライアンスチェックを実施すること。これをスキップしたままデプロイフローに入ってはならない。
  1. **個人情報・著作権の保護**: 個人情報の漏洩や、著作権違反の恐れがある固有名詞がコード・ドキュメント内にハードコード・混入していないか。
  2. **機密情報の保護**: APIキー等の機密情報が漏洩する設計（例: `localStorage` への永続保存や平文での埋め込み）になっていないか、Gitツリーに乗っていないか。
  3. **不要ファイルの排除**: `*.txt`, `*.py`, `temp_*.jsx` などの一時ファイルやテストスクリプトがプロジェクトルートに放置されたまま世界公開される状態（みっともない状態）になっていないか。
- **警告**: 本プロジェクトにおいて、デプロイやリリースを指示された場合、`npm run deploy` (GitHub Pages) だけでは**絶対に完了とみなさないこと**。
- 汎用的なデプロイルールで満足せず、必ず `docs/deploy.md` を直接読み込み、**Phase 1 から Phase 7 までの全ての手順（特に Phase 6 の Hugging Face デプロイと Phase 7 のローカルフォルダ同期）を確実に実行する**こと。
- この確認プロセスと監査をスキップしたエージェントは重大なルール違反とみなされる。

### 6. ファイル更新・デプロイ時の事前確認義務 (Mandatory User Approval)
- **警告**: デプロイの実行や、ファイルの更新・リモートへのアップロード（`git push`）を行う際は、**絶対にAIの独断で実行してはならない**。
- 必ず事前に「修正内容（差分）」をユーザーに提示し、「アップロード（またはデプロイ）してよいか」を尋ねること。
- ユーザーから明確に「OK」の許可が出た後でのみ、確実に対象のコマンド（`git push` や `npm run deploy` 等）を実行すること。

### 7. 定期的なゴミファイルのお掃除提案 (Garbage Collection)
- プロジェクトルートに作業用のゴミファイル（`*.txt`, `*.py`, 退避させた `temp_*.jsx` などの一時ファイルやスクリプト）が溜まっている場合、AIはこれらを放置せず、**定期的に「これらの一時不要ファイルを削除してよいか？」をユーザーに提案・確認**すること。
- 世界公開するリポジトリの美観と安全性を保つため、デプロイ前には特にゴミファイルが散乱していないかをチェックすること。

### 8. API・モデルの定期監査プロトコル (API & Model Intelligence Audit)
- **【必須】APIモデルの死活チェックと最新化**: Gemini APIやOpenAI APIのモデル（例: `gemini-1.5-pro` や `dall-e-3` 等）を扱う処理に触れる際、またはユーザーから要請があった場合、現在コードで指定されているモデルが**非推奨化・アクセス不可になっていないか**、より高性能な**新規モデル（2.0や3.0など）が登場していないか**を必ず確認すること。
- **仕様変更のキャッチアップ**: 画像生成のルール変更（アスペクト比の制限、プロンプトの文字数上限、セーフティフィルターの厳格化など）の仕様変更情報を、Web検索ツール（`search_web` や `perplexity` など）を用いていち早く収集し、プロジェクトのプロンプト構成やUIに落とし込むこと。
- **プロアクティブな提案**: 情報収集の結果、現行のシステムが将来的に機能不全に陥るリスクや、より品質を向上させる新しい仕様が見つかった場合は、ユーザーに**能動的かつ早急に**報告し、対応策を提案すること。ユーザーに指摘される前に自ら動く姿勢を徹底すること。

### 9. Changelog Maintenance Protocol (ドキュメント整備義務)
- **絶対にサボらない**: `README.md` の ChangeLog 更新はAIの重要な責務である。バージョン更新時は、最新の変更履歴を必ず**一番上（降順）**に追記すること。
- **古い履歴のパージ**: ChangeLogが際限なく肥大化するのを防ぐため、履歴は常に**最新10〜15件程度**を維持し、古いものは容赦なく削除（パージ）すること。
- **自律的修正**: ユーザーに「履歴が更新されていない」「順序がおかしい」と指摘されるのはエージェントの恥である。作業時に履歴の乱れを発見した場合は、指示されなくとも自律的に整理・整頓を実行すること。
