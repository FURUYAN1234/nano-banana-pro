# HANDOFF.md (v3.57-alpha)

## Current Status
- v3.57-alphaデプロイ待ち。OpenAI APIの本格利用に向けたUI、状態管理、エラーハンドリングを改善し、タイムアウト時間を延長。

## Done
- `App.jsx`: パスワードマネージャーによるAPIキー保存の競合を避けるため、GeminiとOpenAIでフォーム（`action`、`autoComplete="current-password"`）を分離し、保存時のリセット処理を削除。
- `App.jsx`: OpenAI APIの画像生成時における進行中表示（2〜4分待機）を追加。
- `App.jsx`: OpenAIモデルでの生成完了時に誤ってフォールバック警告が表示されるバグを修正。
- `src/lib/openai.js`: 無効な `response_format` パラメータを削除し、タイムアウトを240秒に延長。
- `README.md`: OpenAI APIの「テスト機能」を「正式機能（アプリ内直接生成）」に昇格させ、ChangeLogを更新。

## Remaining / Next Steps
- OpenAI APIの稼働状況の監視、必要に応じたUI文言の微調整。

## Risks
- なし。

## Files Modified (v3.57-alpha)
- `src/App.jsx`
- `src/lib/openai.js`
- `package.json`
- `index.html`
- `README.md`
