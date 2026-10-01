# Deploy Rules: nano-banana-pro

## Authoritative workflow

共通手順の正本は `C:\Users\sx717\Antigravity\docs\unified_release_completion.md`、機械可読契約は `C:\Users\sx717\Antigravity\scripts\release-apps.json` の `nano-banana-pro`、実行入口は `C:\Users\sx717\Antigravity\scripts\publish_app_release.ps1` である。手動の個別release sequenceや専用transactionを使用しない。

## App-specific requirements

- 毎回、PDFマニュアル・README・note記事の本文全体を候補版の実装と比較して更新する。履歴追記だけで済ませない。`docs/readme-body-audit.json` は版、同梱PDF全件のSHA-256、内容・視覚確認結果を必須とし、`pre_deploy_check.js` が古い記録を拒否する。PDF編集原稿と安全化済み図版は `docs/manuals/build_manuals.py` と `docs/manuals/assets/`。PythonのReportLab/Pillow/pypdf/pypdfium2/pdfplumber、日本語フォントBIZ UDゴシックを使い、`output/pdf/` に生成する。全ページ確認後、公開PDFへコピーする。公開noteの本文・リンク・画像・埋め込みの読み戻しはprivate social receiptへ記録し、rootの `verify_social_completion.mjs` を `--require-documentation-review` 付きで実行する。

- Nano Banana Proの正式リリースはGitHub Pagesの公開・公開バージョン検証、GitHub Release、Cドライブ公開版コピーで完結する。Hugging Face Spaceへのデプロイ・待機・公開検証は行わない。
- `validationCommands` の `pre_deploy_check.js`、全Node tests、警告0のlintを全て通す。
- 毎回、READMEのChangeLogだけでなく本文の全見出しを現行UI・ソース・配布JSON/ZIP・リンクと照合し、過剰な説明、欠落、誤記を直す。結果を `docs/readme-body-audit.json` の `findings` と `reviewedSections` に記録する。`pre_deploy_check.js` はREADME、`src`、`public`、版情報、配布ZIPとの一致を毎回検証し、古い監査記録では停止する。`findings` は自動生成せず、実際の本文確認の結果を書く。
- Git tagまたはGitHub Releaseの同一versionが既に別candidateを指す場合は、tag強制更新や過去Release改変を行わない。パッチversionを上げた新しいcandidateでfail forwardし、新しいレシートを開始する。
- API key、token、認証情報をGitHub Pages、GitHub Release、レシート、ログへ含めない。
- GitHub source ZIPを検証して `C:\nano-banana-pro-main` へ配置し、既存コピーは削除せず時刻付きで退避する。
- フルバックアップは別の明示操作であり、`-RunFullBackup` なしに開始しない。

## Commands

```powershell
powershell -ExecutionPolicy Bypass -File ..\scripts\release_app_preflight.ps1 `
  -App nano-banana-pro `
  -NotesPath <absolute-path-to-vX.Y.Z.md>

powershell -ExecutionPolicy Bypass -File ..\scripts\publish_app_release.ps1 `
  -App nano-banana-pro `
  -NotesPath <absolute-path-to-vX.Y.Z.md> `
  -ReleaseTitle "Nano Banana Pro vX.Y.Z"
```

完了条件は共通レシートの全工程が現在の証拠で `verified` であること。コード、Pages、Release、ZIP、Cドライブコピーのどれかが未確認なら未完了である。
