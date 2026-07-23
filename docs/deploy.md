# Deploy Rules: nano-banana-pro

## Authoritative workflow

共通手順の正本は `C:\Users\sx717\Antigravity\docs\unified_release_completion.md`、機械可読契約は `C:\Users\sx717\Antigravity\scripts\release-apps.json` の `nano-banana-pro`、実行入口は `C:\Users\sx717\Antigravity\scripts\publish_app_release.ps1` である。手動の個別release sequenceや専用transactionを使用しない。

## App-specific requirements

- 共通のGitHub Pages工程に加えて、Nano Banana ProだけはHugging Face deploymentと公開バージョン検証が必須。
- `validationCommands` の `pre_deploy_check.js`、全Node tests、警告0のlintを全て通す。
- Git tagまたはGitHub Releaseの同一versionが既に別candidateを指す場合は、tag強制更新や過去Release改変を行わない。パッチversionを上げた新しいcandidateでfail forwardし、新しいレシートを開始する。
- HF用private file、API key、token、認証情報をGitHub Pages、GitHub Release、レシート、ログへ含めない。
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

完了条件は共通レシートの `hugging_face` を含む全工程が現在の証拠で `verified` であること。コード、Pages、HF、Release、ZIP、Cドライブコピーのどれかが未確認なら未完了である。
