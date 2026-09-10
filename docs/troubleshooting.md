# STEP4 image generation / 画像生成

- An explicit `organization must be verified` response for GPT Image 2.5 is an organization-verification gate, not proof of an invalid API key. Check organization settings, complete individual verification in the official UI, and allow approval to propagate. The STEP4 selector offers manual GPT Image 2.0 selection without automatic resubmission.
- `Action:` lines can contain silent actors. Classifying them as dialogue omitted these actors from generated cast constraints. `extractCastLimitRule` now collects explicit Action lines before dialogue classification; a two-character, one-speaker regression test protects this behavior.
- STEP4 now exposes an automatic-quality-repair checkbox, enabled by default to preserve existing behavior. Disable it for a one-image-per-setting comparison: QA still runs but retains the original image and warning without a paid repair attempt. A regression test asserts zero repair calls even for concrete QA failures. Automated QA can return PASS despite missing dialogue; it does not establish exact script compliance.
- A repair passing QA no longer automatically replaces the original. Direct image comparison must explicitly prefer the repair with a concrete reason; ties, invalid comparison output, missing comparison service or errors retain the original. Both comparison inputs are ordered explicitly (original first, repair second), followed by available reference images.

# Hugging Face ZIP deployment recovery

## NO_APP_FILE with Dockerfile present / Dockerfileが存在する場合のNO_APP_FILE

On 2026-09-10, the authenticated runtime API reported `NO_APP_FILE` although the published repository had `sdk: docker`, a root `Dockerfile`, and nginx configured for port 7860. The build-log API returned HTTP 200 with an empty stream. After explicit user approval, one `HfApi.restart_space(..., factory_reboot=True)` changed the state to BUILDING and then RUNNING at the same v5.9.6 commit. The browser loaded the application. No application source, repository, hardware tier, or Space configuration was changed by this recovery. The underlying Hub cause remains unproven.

2026年9月10日、Dockerfileとポート設定が正しく公開されている状態でも、HFは `NO_APP_FILE` と判定し、ビルドログは空でした。利用者の明示承認を得たFactory restartを1回実行すると、同じv5.9.6コミットのままRUNNINGへ復旧し、ブラウザーで表示できました。アプリのソースやSpaceの設定、ハードウェア契約は変更していません。HF内部で停滞した原因までは断定していません。今後もFactory restartを通常デプロイへ自動追加せず、公開ファイル・現在の実行状態・ログを確認してから、その復旧操作の承認を得てください。

## Binary rejection / バイナリ拒否

On 2026-09-07, the Hub rejected the 421,717-byte distribution ZIP as a regular Git binary. A size below 10 MB does not make this ZIP acceptable as a regular blob. v5.9.3 tracks every existing ZIP declared by `public/.gitattributes` with Git LFS in the HF checkout only. Pages attributes remain unchanged.

2026-09-07の送信では、421,717バイトの配布ZIPも通常Gitのバイナリとして拒否されました。v5.9.3では `public/.gitattributes` に記載され、実在する全ZIPをHF側だけでGit LFS対象にします。Pages側の属性は変更しません。

Unpublished deployment commits can retain rejected blobs in history. The official deployment script first preserves those commits on a local recovery branch, then rebuilds from `origin/main`. Do not force-push or delete recovery branches. Resume releases through the workspace's `scripts/publish_app_release.ps1`; full backup is a separate operation after remote publication is verified.

拒否されたZIPが未公開コミットの履歴に残る場合があります。正式な送信スクリプトは、そのコミットを復旧用ブランチへ退避してから `origin/main` を基点に再構築します。強制pushや復旧用ブランチの削除は行いません。リリースは共通の `scripts/publish_app_release.ps1` から実行し、リモート反映を確認した後に別工程でフルバックアップします。
