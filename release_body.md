## What's New / 変更点

### BugFix
- **[BugFix]** Fixed a bug in ChatGPT mode (GPT-image-2) where a black border was drawn around the entire page. The phrase "OUTER FRAME" in the CANVAS LOCK section was interpreted by DALL-E as a physical border drawing instruction; replaced with "image boundaries" and added explicit "NO PAGE BORDERS" rule to the ANTI-NOISE section as a double-block countermeasure.
- **[BugFix]** ChatGPTモード（GPT-image-2）で生成されるプロンプトにおいて、ページ全体に黒い外枠（border）が描画される問題を修正。CANVAS LOCKセクションの `OUTER FRAME` という表現がDALL-Eに物理的な枠線描画として解釈されていたため、`image boundaries` に変更し、さらにANTI-NOISEセクションに枠線描画の明示的禁止（NO PAGE BORDERS）を追加するダブルブロック方式で対策しました。

### Cleanup
- **[Cleanup]** Removed stale backup file (`temp_App_backup.jsx`) from the repository for a cleaner public-facing codebase.
- **[Cleanup]** 古いバックアップファイル（`temp_App_backup.jsx`）をリポジトリから削除。世界公開リポジトリの美観を維持。
