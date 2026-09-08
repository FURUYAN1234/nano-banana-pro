# Hugging Face ZIP deployment recovery

## Binary rejection / バイナリ拒否

On 2026-09-07, the Hub rejected the 421,717-byte distribution ZIP as a regular Git binary. A size below 10 MB does not make this ZIP acceptable as a regular blob. v5.9.3 tracks every existing ZIP declared by `public/.gitattributes` with Git LFS in the HF checkout only. Pages attributes remain unchanged.

2026-09-07の送信では、421,717バイトの配布ZIPも通常Gitのバイナリとして拒否されました。v5.9.3では `public/.gitattributes` に記載され、実在する全ZIPをHF側だけでGit LFS対象にします。Pages側の属性は変更しません。

Unpublished deployment commits can retain rejected blobs in history. The official deployment script first preserves those commits on a local recovery branch, then rebuilds from `origin/main`. Do not force-push or delete recovery branches. Resume releases through the workspace's `scripts/publish_app_release.ps1`; full backup is a separate operation after remote publication is verified.

拒否されたZIPが未公開コミットの履歴に残る場合があります。正式な送信スクリプトは、そのコミットを復旧用ブランチへ退避してから `origin/main` を基点に再構築します。強制pushや復旧用ブランチの削除は行いません。リリースは共通の `scripts/publish_app_release.ps1` から実行し、リモート反映を確認した後に別工程でフルバックアップします。
