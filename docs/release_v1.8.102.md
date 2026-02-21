## 🚀 Release v1.8.102 Alpha (Emergency Hotfix)

### 📝 Summary / 概要
This is an emergency hotfix to address a critical regression introduced in v1.8.101 where speaker identities were completely stripped from the action prompt, causing the AI to lose context of who is in the scene. Furthermore, this update fixes a local deployment issue where the background server process would hang and prevent automated deployments.

本リリースは、直前のv1.8.101で発生した「セリフから取得すべき話者情報が完全に消失してしまい、AIが誰を描けば良いか分からなくなる」という致命的なプロンプト抽出（Text Bleeding対策の副作用）バグを修正するための緊急パッチです。また、ローカルのViteサーバープロセスが残留して後続の開発作業がスタック（固まる）問題も解消し、安全な終了手順を徹底しました。

### ✨ Key Changes / 主な変更点
- **[PROMPT HOTFIX] Restored Speaker Extraction**: Re-engineered dialogue parsing to correctly extract author names and safely inject them into the `(Action: )` string (e.g., `The characters [ミク, リン] are in the scene.`), ensuring characters are drawn without causing raw text bleeding on the canvas.
  - **話者情報の抽出復元**: セリフを抽出しつつ、話者の名前（ミク、リン等）を正確に取り出して `Action` 欄へ注入するロジックを再構築しました。これにより、画像内に不要な文字として名前が誤描画されるのを防ぎつつ、AIに「誰がそのコマにいるか」を正しく伝達できるようになりました。

- **[FORMAT ENHANCEMENT] Structured Speech Bubbles**: The prompt for text elements is now cleanly structured as `(Speech Bubble 1 by [Speaker]: "[Text]")`, giving the AI better alignment between text semantics and character positions.
  - **吹き出しの構造化**: プロンプトのセリフ指示を `(Speech Bubble 1 by [話者名]: "[セリフ]")` のように構造化し、AIがどのセリフを誰が発しているかより正確に理解できるようレイアウト定義を改善しました。

- **[DEV-OPS] Resolved Process Execution Hangs**: Terminated zombie background processes and cleared Vite caches that were causing automated Git/NPM commands to stall indefinitely.
  - **ローカルサーバー残留問題の解消**: ローカル起動時の開発サーバー（`npm run dev`）がバックグラウンドで処理を専有し、後続のデプロイやGit操作が「固まって止まる（ハングする）」原因となっていたプロセス管理の不備を修正しました。

### 📦 Verify / 確認
- This version is active on GitHub Pages.
  本バージョンはGitHub Pages上で既に稼働しています。
- Please check that URL parameters like `?v=18102` serve the correct version.
  キャッシュ対策として `?v=18102` などのクエリパラメータを付与してアクセスし、正しく適用されているか確認してください。
