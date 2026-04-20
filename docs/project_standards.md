# PROJECT RULES: nano-banana-pro

## Project Overview
Nano Banana Pro は、Gemini などの生成AIを用いたマンガ（画像＋シナリオ）生成ツールである。

## Architecture Guardrails (絶対防衛ライン)
AI（Codex等）の過剰な最適化によるシステム破壊を絶対に防ぐこと。以下のロジックは、冗長・特殊・長すぎるように見えても、推測で削除・短縮・単純化してはいけない。

### 1. API特有のエラーハンドリング
- Gemini API 等の `429 Too Many Requests` 回避や、非同期処理の確実性を担保するための意図的な `wait loop`, `retry` 処理, `defensive fallback` を勝手に削らないこと。

### 2. プロンプトの物理強制力 (Geometry Lock)
- `Absolute Physical Geometry Lock` を筆頭とする、AIのハルシネーションやフォーマット逸脱を防ぐための「執拗で長大なルール指定」。プロンプトが長すぎるからといって、システムの中核を勝手に要約・短縮してはならない。

## 1. 言語・ドキュメント基準 (Language & Output Standards)
- **基本言語**: **日本語**。特段の指示がない限り、全ての応答、コメント、ドキュメントは日本語で行うこと。
- **ドキュメント管理**:
  - `task.md` (Checklist)
  - `implementation_plan.md` (コーディング前)
  - `walkthrough.md` (検証完了後)

## 2. 実行環境・文字コード規約 (Environment & Encoding) - CRITICAL
Windows環境下での文字化けや実行エラーを防ぐため、以下の設定を最優先で適用すること。
- **PowerShell実行時の必須設定**: `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; <command>`
- **ファイル操作原則**: 全てのファイル操作においてUTF-8を明示的に指定する。Shift-JISでの読み込みは「データ破壊」とみなす。

## 3. バージョン管理規律 (Version Control Discipline)
修正時は、バージョン番号を単なる文字列として扱わず、以下の同期対象ファイル全ての一致を確認すること。
1. `package.json`
2. `src/App.jsx` (`SYSTEM_VERSION`)
3. `index.html` (`<title>`)
4. `README.md` (ChangeLog)

## 4. 禁止事項 (Forbidden Actions)
- `src/App.jsx` 内にある `SYSTEM_VERSION` などは、必ず `package.json` 等と連動させること（単独変更しない）。
- API Key などの機密情報をフロントエンドコードにハードコード・永続化しないこと（.env経由やユーザー入力とする）。
- **確認なきバージョン更新報告**: 置換等のエラーに気付かず成功したと盲信しない。実際のファイル中身を確認する。
- 盲目的な `gh-pages` ブランチの削除やForce Pushは避けること。

## 5. デザインとUI (Design & UI)
- 基本的に **Vanilla CSS** (`index.css`, `App.css`) を使用すること。Tailwind CSS は明示的な指示がない限り避けない。
- コンポジットが500行を超える巨大ファイルとなった場合、コンポーネント分割を検討すること。

## 6. ローカルサーバー必須ルール (Dev Server - MANDATORY)
- **コード修正後は必ず `npm run dev` でローカルサーバーを起動**し、URLをユーザーに表示すること。
- サーバーが立ち上がっていない状態でユーザーに確認を求めることは**厳禁**。
- 起動前に `taskkill /F /IM node.exe` と Viteキャッシュクリア (`Remove-Item -Recurse -Force node_modules\.vite`) を実行すること。
- デプロイ指示を受けた場合も、まずサーバーで動作確認してからデプロイフローに入ること。
