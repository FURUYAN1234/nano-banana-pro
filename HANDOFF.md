# HANDOFF.md (v3.56-alpha)

## Current Status
- v3.56-alpha。APIキー入力欄のブラウザパスワード自動入力（Autofill）による干渉バグを修正。OpenAI APIのテスト実行結果としてCORS/Fetchエラーを観測。

## Done
- `App.jsx`: `ApiKeyModal` において、GeminiとOpenAIのパスワード入力欄に固有の `id` と `name` を付与し、`autoComplete="new-password"` を設定することで、ブラウザの入力支援機能が両者を混同する問題を解決。
- `package.json`, `index.html`, `README.md` のバージョン更新およびChangeLog追記。

## Remaining / Next Steps
- OpenAI APIへの直接リクエストがブラウザからのCORS制限等により `Failed to fetch` で弾かれる現状（API側仕様）に対する、ユーザーへのUI説明の維持またはバックエンドへの処理移行の検討（現在は意図通りの挙動として扱う）。

## Risks
- APIが正式解放された際、`quality: "high"` 指定が正しく反映・動作するか未知の仕様変更の可能性あり。

## Files Modified (v3.56-alpha)
- `src/App.jsx` — APIキー入力欄の属性修正 (Autofill対策)
- `package.json` — v3.56-alpha
- `index.html` — v3.56-alpha
- `README.md` — ChangeLog 更新
