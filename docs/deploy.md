# Deploy Rules: nano-banana-pro

## Authoritative workflow

共通手順の正本は 親リポジトリの `docs/unified_release_completion.md`、機械可読契約は 親リポジトリの `scripts/release-apps.json` の `nano-banana-pro`、実行入口は 親リポジトリの `scripts/publish_app_release.ps1` である。手動の個別release sequenceや専用transactionを使用しない。

## App-specific requirements

- デプロイごとに前回のスキル見直し以降の漫画制作記録・不具合対応・本人の指摘を確認し、作品に依存しない改善を `mcp/skills/manga-book-production/SKILL.md` へ反映する。重複・矛盾・不要な確認を整理し、特定キャラ・台詞・構図を固定規則にしない。変更不要ならその理由を残す。`docs/manga-skill-review.json` に候補版、`collectMangaSkillEvidence` の内容ハッシュ、見直し期間・根拠記録、採用／既存対応／一般化しない判断、実施した検証を記録する。`pre_deploy_check.js` は記録の欠落・別版・スキル変更後の古い記録・未検証を拒否する。この検査は見直しの内容や実生成の品質を自動で証明するものではない。
- 見直しは各デプロイ直前の24時間以内に行う。同じ版・同じスキルでも古い見直し記録は再利用せず、前回以降の制作結果と追加の指摘を確認する。内容ハッシュは `references/` 等の補助資料も含むスキル全体を対象とし、本文だけの一致で済ませない。
- 配布・告知を分担しても、主担当がリリースの候補コミット、レシート、担当先と実行IDを保持し、公開版・添付物・告知先の実物まで確認する。停止・失敗・修正見込み変更を把握したら、本人からの質問を待たず、直近の完了、影響、次の対応、必要な入力を伝える。前提が整った独立作業は進め、同じ状態の繰り返し通知を避ける。
- スキルだけの変更もデプロイ対象に含める。アプリ同梱版・単体スキルZIP・導入済みコピーと配布説明を同じ正本へ揃え、ローカル同期だけを公開完了としない。今回の対象・版・公開範囲への有効な許可を維持し、改善指示だけで自動公開しない。公開更新のSNS告知には更新内容が分かる参考画像を必ず添付する。今回の採用原稿・衣装設定画像・変更画面などから内容に合う実物を選び、秘密情報・未採用候補・無関係な旧作を除く。告知用の追加生成は不要で、完成作品の投稿とは別に本文・添付画像・公開後の実物を確認する。
- スキル更新時は自動選択用のdescriptionと `agents/openai.yaml`、1ページ／複数ページの手順、実際のMCP能力・起動処理との一致を確認する。公開するアプリ同梱版・スキルZIPを同じ正本から作り、このPCの導入済みスキルも独自編集を保護して同期する。今回版に対する公開許可は別途維持し、スキルの改善指示だけで公開を開始しない。

- 毎回のデプロイ直前にOpenAIとGeminiの公式料金表を開き、使用モデルの通常料金（Batch割引と区別）を画面・README・マニュアルと照合する。価格が同じでも確認日を更新する。既存の `docs/readme-body-audit.json` の `pricingReview` に候補版、料金設定のSHA-256、確認日時、両公式URL、照合結果を記録する。`pre_deploy_check.js` は記録欠落・別版・設定変更・24時間超過・未来日時を拒否する。この機械チェックは公式ページの実読に代わるものではない。

- 毎回、PDFマニュアル・README・note記事の本文全体を候補版の実装と比較して更新する。履歴追記だけで済ませない。`docs/readme-body-audit.json` は版、同梱PDF全件のSHA-256、内容・視覚確認結果を必須とし、`pre_deploy_check.js` が古い記録を拒否する。PDF編集原稿と安全化済み図版は `docs/manuals/build_manuals.py` と `docs/manuals/assets/`。PythonのReportLab/Pillow/pypdf/pypdfium2/pdfplumber、日本語フォントBIZ UDゴシックを使い、`output/pdf/` に生成する。全ページ確認後、公開PDFへコピーする。公開noteの本文・リンク・画像・埋め込みの読み戻しはprivate social receiptへ記録し、rootの `verify_social_completion.mjs` を `--require-documentation-review` 付きで実行する。

- Nano Banana Proの正式リリースはGitHub Pagesの公開・公開バージョン検証、GitHub Release、Cドライブ公開版コピーで完結する。Hugging Face Spaceへのデプロイ・待機・公開検証は行わない。
- `validationCommands` の `pre_deploy_check.js`、全Node tests、警告0のlintを全て通す。
- 毎回、READMEのChangeLogだけでなく本文の全見出しを現行UI・ソース・配布JSON/ZIP・リンクと照合し、過剰な説明、欠落、誤記を直す。結果を `docs/readme-body-audit.json` の `findings` と `reviewedSections` に記録する。`pre_deploy_check.js` はREADME、`src`、`public`、版情報、配布ZIPとの一致を毎回検証し、古い監査記録では停止する。`findings` は自動生成せず、実際の本文確認の結果を書く。
- Git tagまたはGitHub Releaseの同一versionが既に別candidateを指す場合は、tag強制更新や過去Release改変を行わない。パッチversionを上げた新しいcandidateでfail forwardし、新しいレシートを開始する。
- API key、token、認証情報をGitHub Pages、GitHub Release、レシート、ログへ含めない。
- GitHub source ZIPを検証して固定の `C:\nano-banana-pro-main` へ配置する。共通手順が既存コピーを固定の `.rollback` へ一時退避し、完全tree照合に成功したら退避を削除する。置換に失敗した場合は復元する。版番号・日時別の配布フォルダは作らない。
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
