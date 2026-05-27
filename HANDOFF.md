# HANDOFF.md

## 現在のステータス (v4.3.0 - デプロイ確認待ち)
- **Completed** (完了)
  - 括弧内カギ括弧のセリフ誤検出修正、グループスピーカーの全キャスト不在判定修正、ト書き内引用のセリフ化防止の3つのバグ修正を `panel-utils.js` に移植適用。
  - バージョン番号を **v4.3.0** に引き上げ、`package.json`, `index.html`, `src/lib/constants.js`, `README.md` (ChangeLog) の同期を完了。
  - 自己完結スクリプトを用いたユニットテストによる挙動検証を完了し、全ケース正常動作を確認。
  - 本番ビルドテスト (`npm run build`) による文法・ビルドエラーが無いことを確認。
  - 不要な一時ファイルのクリーンアップを完了。
- **In Progress** (進行中)
  - ローカルでのユーザー動作確認およびリモートへの Force Push / デプロイ許可待ち。

## 今回の変更内容 (v4.3.0)
- [x] **シナリオパーサーのバグ修正移植**
  - ト書き括弧内の「ハ」の字等がセリフとして誤抽出される問題を、事前括弧除去 (`lineForParsing`) の適用により修正。
  - 「全員」「他全員」判定時に全キャストをパネルに登録するよう修正し、キャストが全員コマから除外されるバグを解消。
  - ト書き内の擬音語・形状表現・修飾語がセリフ化する問題を、後続テキストのコンテキスト分析およびフィルタ追加により防止。
- [x] **バージョン同期**
  - アプリ全体でバージョンを `v4.3.0` に同期。

---

## 残りのタスク (Remaining Tasks)
- [ ] ユーザーの承認を得て Git コマンドを実行する
  - `git commit --allow-empty -m "v4.3.0: Fix dialogue extraction from parenthetical and onomatopoeia filter"`
  - `git push origin main --force` (本日の一連の改悪コミット履歴を上書きするため)
- [ ] 本番環境（GitHub Pages）へのデプロイ (`npm run deploy`)
- [ ] タグ打ち (`git tag v4.3.0` / `git push origin v4.3.0 --force`) および GitHub Release 作成
- [ ] HF Spaces へのデプロイ (`npm run deploy:hf`)
- [ ] ZIP検証と C ドライブローカル展開バックアップ
- [ ] フルバックアップスクリプト (`backup_full.ps1`) の実行

---
