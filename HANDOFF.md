# HANDOFF.md (v3.55-alpha)

## Current Status
- v3.55-alpha デプロイ中。ChatGPTモードのプロンプト最適化（文字数大幅削減）およびGPT-Image-2のAPIリクエストパラメータ最適化完了。
- GitHub Pages + Hugging Face Spaces へのデプロイ準備完了。

## Done
- `openai.js`: GPT-Image-2 APIコール時の `quality: "high"`, `response_format: "b64_json"` パラメータ追加。
- `App.jsx`: ChatGPTモード時のカメラ指示をGeminiウェイトタグではなく自然言語に変更 (`getCameraForChatGPT`)。
- `App.jsx`: キャスト制限ルールのGeminiウェイトタグをChatGPTモード時に除去 (`stripWeightTags`)。
- `package.json`, `index.html`, `README.md` のバージョン更新およびChangeLog追記。

## Remaining / Next Steps
- ChatGPT側での長文テキストコピペエラーが頻発しないかの確認と、生成画像のカメラワーク・品質の継続検証。
- OpenAI APIの将来的な仕様変更・機能拡張（画像入力対応等）へのキャッチアップ。

## Risks
- APIが正式解放された際、`quality: "high"` 指定が正しく反映・動作するか未知の仕様変更の可能性あり。

## Files Modified (v3.55-alpha)
- `src/lib/openai.js` — APIパラメータ最適化
- `src/App.jsx` — ChatGPTモード時のプロンプト文字数削減（カメラ・キャスト）
- `package.json` — v3.55-alpha
- `index.html` — v3.55-alpha
- `README.md` — ChangeLog 更新
