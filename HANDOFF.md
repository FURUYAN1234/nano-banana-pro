# HANDOFF.md

## 現在のステータス (v4.2.6 - ローカル修正完了・動作検証済み)
- **Completed** (完了)
  - 画面表示の各種文章（プレースホルダー、ボタンラベル、説明文、警告メッセージ）のリライト・分かりやすさ向上を完了。
  - バージョン番号を **v4.2.6** に引き上げ、`package.json`, `index.html`, `constants.js`, `README.md` と同期。
  - ローカル開発サーバー ([http://localhost:5173/](http://localhost:5173/)) による動作検証およびプロダクションビルドテスト（`npm run build`）をクリア。
  - ユーザーおよび自動レビューポリシーにより実装計画が承認済み。
  - これより Git コミット・プッシュおよび本番環境へのデプロイを実行します。

## 今回の変更内容 (UI & UX Rewrite)
- [x] **キャラクター解析パネルの文言整理** ([Step1Panel.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step1Panel.jsx))
  - タイトルを「STEP 01: キャラクター解析（設定の読み込み）」に変更。
  - キャラクターシートのドロップエリアを親しみやすくわかりやすい案内にリライト。
  - コピーボタンのラベルを「📋 キャラクター設定をコピー」に簡素化。
- [x] **シナリオ設定パネルの文言整理** ([Step2Panel.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step2Panel.jsx))
  - ラベル「Location Override」を「指定場所（背景の指定）」、「Outfit Override」を「指定服装（コスチューム指定）」に変更。
  - 「オチ・ディレクター」を「ストーリーの結末（オチの方向性）」に変更。
  - コピーボタンのラベルを「📋 シナリオをコピー」に簡素化。
  - シナリオ演出強化エリア内の説明文と注意事項をより平易な日本語にリライト。
- [x] **プロンプト生成パネルの文言整理** ([Step3Panel.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step3Panel.jsx))
  - 「プロンプトを構築中」であることを直感的に伝える表現に変更。
- [x] **画像生成出力パネルの文言整理** ([Step4Panel.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step4Panel.jsx))
  - コピペボタンを「📋 プロンプトをコピーする」にスッキリと簡素化。
  - ボタンの真下に、選択エンジンや背景設定に連動した丁寧な「手動コピペ手順ガイド」を配置。
  - 「妥協版警告」を「簡易モデル（自動バックアップモデル）での生成案内」へと前向きな案内にリライト。
  - ポリシー制限メッセージボックスのテキストを「⚠️ 画像生成が制限されました（ポリシー制限）」と「表現の一部がAIの安全基準（ポリシー）に触れたため、画像の生成がスキップされました」に変更。
- [x] **コントロールバーとヘルプ文言の整理** ([ControlBar.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/ControlBar.jsx))
  - ループ・フルオートのボタンテキストを「🔁 連続ループ生成 ON / 解除」「⚡ 全自動モード（フルオート） ON / 中断」に分かりやすく変更。
  - ヘルプ説明文を箇条書きに整理し、視認性を向上。
  - 1枚絵用の感情シネマプロンプトコピーボタンのテキストや注釈をスッキリ整理。
- [x] **システムヘッダーの整理** ([SystemHeader.jsx](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/components/SystemHeader.jsx))
  - リセット系のボタン説明を直感的にし、レート制限時のアラートを「⚠️ 一時的な接続制限モード」に変更。
- [x] **エラーガイド文言の整理** ([safety-filters.js](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/lib/safety-filters.js) / [useMangaWorkflow.js](file:///c:/Users/sx717/Antigravity/nano-banana-pro/src/hooks/useMangaWorkflow.js))
  - 通信エラーやキーエラー発生時の対処手順ガイドを優しく丁寧な日本語にブラッシュアップ。

---

## 残りのタスク (Remaining Tasks)
- [ ] Git コミット＆プッシュ（`git push origin master`）
- [ ] 本番環境へのデプロイ（`npm run deploy`）
- [ ] タグ打ちおよび GitHub Release 作成
- [ ] ZIP検証とCドライブ展開バックアップ
の「自動修正」「Web版へ切り替え」ボタンを `disabled` にし、プロンプト競合や並行リクエストを防ぐガードを追加。

---

## ⚠️ Gemini 3.1 Pro へのバグ監査・再チェック依頼事項
今回修正した画像生成APIとポリシーエラーハンドリング周辺について、以下の観点から徹底的な追加監査を行ってください。

1. **エラー判定条件のすり抜け監査**:
   - `useMangaWorkflow.js` L1175 におけるポリシーエラー判定条件 `errMsg.includes("sensitive") || errMsg.includes("Responsible AI") || errMsg.includes("content_policy_violation") || (errMsg.includes("400") && (errMsg.includes("safety") || errMsg.includes("policy") || errMsg.includes("violation") || errMsg.includes("sensitive")))` が、OpenAI (ChatGPT Images 2.0) や Gemini の最新のAPIエラー仕様と完全に一致しているか、将来的なすり抜けリスクがないか検証してください。
2. **非同期ステートクリアのタイミング監査**:
   - 画像生成の開始時（`regenerateImage` L1062）で `setPolicyErrorMsg("")` や `lastPolicyErrorRef.current = ""` をクリアしていますが、非同期実行中のレンダリングやユーザー操作によって、古いステートや表示が一瞬フラッシュ（ちらつき）したり、予期せぬ判定タイミングでエラー画面がチラ見えするような競合がないかチェックしてください。
3. **部分リセット・ハードリセット実行時の確実性**:
   - `partialReset`（部分リセット）や `hardReset`（APIキー等全クリア）時に、今回修正に関わったポリシー関連の state / ref が完全に初期化されるか検証してください。
4. **UI操作による不整合リスク**:
   - 画像生成中やポリシー自動修正中に、ユーザーがSTEP 2やSTEP 3のシナリオ編集、オチ指定、演出強化オプションなどを変更した場合、生成される画像や次のステップの状態管理に不整合が生じないか、UIの disabled 制御の不足がないか監査してください。

## 残りのタスク (Remaining Tasks)
- [ ] ユーザー承認後の Git push（`git push origin main`）
