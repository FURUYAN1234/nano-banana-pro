# Project Standards & Deployment Protocol (Nano Bacteria Pro)

本ドキュメントは、プロジェクトの品質維持、デプロイ安全性、および開発環境の安定性を保証するための絶対的な遵守事項をまとめたものである。

## 1. 言語・ドキュメント基準 (Language & Output Standards)

- **基本言語**: **日本語**。
  - 特段の指示がない限り、全ての応答、コメント、ドキュメントは日本語で行うこと。
- **ドキュメント管理**:
  - **タスク管理**: `task.md` (Checklist)
  - **実装計画**: `implementation_plan.md` (コーディング前)
  - **検証報告**: `walkthrough.md` (検証完了後)
  - **例外**: 単発の単純作業やスピード優先の状況ではドキュメント作成をスキップ可（複雑な場合は許可を得ること）。
  - **保存先**: プロジェクトルートの `docs/` ディレクトリ（Agentic modeのartifactsは `brain/` に分離）。

## 2. 実行環境・文字コード規約 (Environment & Encoding) - CRITICAL

Windows環境下での文字化けや実行エラー（"Agent execution terminated due to error"）を防ぐため、以下の設定を**最優先**で適用すること。

### シェル実行時の必須設定

コマンド実行時は、必ず冒頭で文字コードを **UTF-8** に設定する。

- **PowerShell**:

  ```powershell
  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8; <command>
  ```

- **Command Prompt (cmd)**:

  ```cmd
  chcp 65001 > nul && <command>
  ```

### ファイル操作 (File I/O)

- **読み書き原則**: 全てのファイル操作（読み込み・書き込み）において **UTF-8** を明示的に指定する。
- **Shift-JIS禁止**: Shift-JISでの読み込みは「データ破壊」とみなす。
- **PowerShellでの書き込み**:
  - 必ず `-Encoding UTF8` を付与する。
  - インデントが強制される場合やフォーマット崩れを防ぐため、`Set-Content` とヒアドキュメントを活用し、生のテキストデータとして書き込むこと。
- **Pythonスクリプト**: 標準入出力がUTF-8で行われるようコード内で強制すること。

## 3. バージョン管理規律 (Version Control Discipline)

修正や新機能の実装時は、**バージョン番号を単なる文字列として扱わない**こと。「コードの変更 ＝ バージョンの更新」を徹底する。

### 同期対象ファイル (必須)

デプロイ前に、以下の5箇所全てのバージョン番号 (`x.y.z`) を一致させること。

1. **`package.json`**: `"version": "x.y.z"`
2. **`src/App.jsx`**: `const SYSTEM_VERSION = "x.y.z"`
3. **`index.html`**: `<title>Nano Banana Pro vX.Y.Z</title>`
4. **`README.md`**: バージョン記載箇所およびChangeLog
5. **GitHub Release**: リリースタグとコードバージョンを一致させる

## 4. GitHub Pages デプロイ手順 (Deployment Protocol)

「404 Not Found」や「キャッシュ汚染」を防ぐため、以下の手順を厳守すること。検証を拒否することは禁止とする。

### Phase 1: 事前チェック (Pre-Deployment Check)

- [ ] `package.json` のバージョンは更新されたか？
- [ ] `index.html` のタイトルは更新されたか？
- [ ] `public/.nojekyll` は存在するか？（MIMEタイプエラー防止）

### Phase 2: 実行 (Execution)

- コマンド: `npm run deploy` (または `gh-pages -d dist`)
- **注意**: コンソールの "Published" メッセージだけで成功と判断しないこと。

### Phase 3: デプロイ検証 (Verification) - Mandatory

1. **待機**: ユーザーへの報告前に **1〜2分** 待機する（バックグラウンド処理のため）。
2. **リモート確認**:

    ```bash
    git show origin/gh-pages:index.html
    ```

    - 上記コマンドで*サーバー側*のコンテンツがローカルの変更と一致することを確認する。
    - **古い内容** → Push失敗またはGitの反映ラグ。
    - **新しい内容** → デプロイ成功（CDN反映待ち）。
3. **ライブ確認**: ブラウザキャッシュを回避するため、クエリパラメータ付きURLでアクセス確認を行う。
    - 例: `https://.../index.html?v=TIMESTAMP`

### Phase 4: トラブルシューティング

- **更新されない場合**: コンテンツが古いままなら、空コミットでビルドをトリガーする。
  - `git commit --allow-empty -m "Trigger Build"`
- **404エラー**: GitHub Actionsのステータスを確認（`queued`になっていないか）。`gh-pages`ブランチを盲目的に削除しないこと。
- **緊急時**: 標準ツールが完全に機能せず、Actionsも停止している場合に限り、手動Git Reset（`dist`初期化 & Force Push）を許可する。

## 5. 禁止事項 (Forbidden Actions)

- ❌ **早すぎる "Fixed!" 宣言**: `git show origin/...` で新しいバージョン文字列を確認するまでは「修正完了」と報告しないこと。
- ❌ **盲目的な Force Push**: `gh-pages` ブランチの削除やForce Pushは、GitHub Pagesの設定解除のリスクがあるため、必要な場合を除き避けること。
- ❌ **"No packages published" への過剰反応**: GitHub UI上の "Packages" 表記はソースコードホスティングとは無関係であるため無視すること。

## 6. リリース手順詳細 (Release Workflow)

ユーザーが「デプロイ」や「リリース」を指示した場合、以下の手順を追加で実行すること。

1. **バージョン更新の確認**:
    - バグ修正 (Bugfix) や機能追加 (Feature) が含まれる場合、必ずバージョン番号をインクリメントすること。未更新の場合は更新してからデプロイすること。
2. **リリースノート作成**:
    - GitHub Release 用に、**英語と日本語の併記**でタイトルと本文を作成すること。
    - タイトルと本文は Markdown 形式で明確に分離して提示すること。
3. **アーカイブ検証**:
    - タグ打ち (`git tag vX.Y.Z`) 後、GitHub上で正しく Zip ファイルが生成され、ダウンロード可能かを確認すること（URLのあてずっぽうではなく、Releasesページからの導線確認）。

## 7. 実装・設計ガイドライン (Implementation & Design Guidelines)

プロジェクトの品質と一貫性を保つため、以下のルールを追加で遵守すること。

### 7.1 コード品質と構成 (Code Quality & Structure)

- **巨大ファイルの分割**: `src/App.jsx` 等が肥大化しないよう、1ファイル **500行** (または一定の複雑度) を超えた場合はコンポーネント分割を検討すること。
- **コメント言語**: コード内のコメントは原則 **日本語** で統一し、特にAI生成ロジックの意図を明確に残すこと。

### 7.2 セキュリティとプライバシー (Security & Privacy)

- **Secrets管理**: APIキーなどの機密情報をコードにハードコードしないこと。必ず `.env` (環境変数) またはユーザー入力フォームを利用すること。
- **ストレージ制限**: セキュリティ強化のため、APIキーなどの機密情報を `localStorage` に永続化しないこと。

### 7.3 デザインとUI (Design & UI)

- **CSS利用基準**: 基本的に **Vanilla CSS** (`index.css`, `App.css`) を使用すること。Tailwind CSS は明示的な指示がない限り避けること。
- **アクセシビリティ**: 視認性を確保するため、テキストと背景のコントラスト比を十分に確保すること（ハイコントラスト推奨）。

### 7.4 スクリプト運用 (Scripts)

- **命名規則**: 処理内容が明確な `動詞_目的語.ext` (例: `update_version.js`) の形式を維持すること。
- **実行環境**: Python/Node.js スクリプトは `package.json` の `scripts` に登録し、`npm run xxx` で実行可能にすることを推奨する。
