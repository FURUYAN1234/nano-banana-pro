v4.7.1: Fallback Chain History and Image API Compatibility / Fallback Chain履歴と画像API仕様追従

## What's New / 更新内容

* Added the latest Fallback Chain history entry for the verified Nano Banana 2 and ChatGPT Images 2.0 paths.
* Clarified that STEP 4 Gemini image generation uses `gemini-3.1-flash-image` with REST v1beta `responseModalities: ["TEXT", "IMAGE"]` only.
* Clarified that Gemini `imageConfig` is intentionally not sent because the locally verified non-gray output path does not use it.
* Documented the OpenAI STEP 4 image generation settings: `gpt-image-2`, PNG output, high quality, and a 600-second timeout.
* Documented the scenario completeness guard that blocks image generation when any panel is missing or lacks quoted dialogue.
* Added a quality caveat that in-image text is generated as pixels by the model, so exact character-for-character text fidelity cannot be guaranteed.

* 検証済みのNano Banana 2 / ChatGPT Images 2.0経路に合わせ、Fallback Chain履歴を追記しました。
* STEP 4のGemini画像生成は `gemini-3.1-flash-image` を使い、REST v1beta の `responseModalities: ["TEXT", "IMAGE"]` のみで送信することを明記しました。
* ローカル検証で非グレー画像が得られた経路に合わせ、Gemini画像生成では `imageConfig` を送信しないことを明記しました。
* OpenAI STEP 4画像生成の設定として、`gpt-image-2`、PNG出力、高品質、600秒タイムアウトを明記しました。
* 4コマ見出しや各コマの「」付きセリフが欠けている場合に画像生成を止める、シナリオ完全性ガードを明記しました。
* 画像内文字はモデルがピクセルとして描画するため、完全な文字一致は保証できないという品質上の但し書きを追加しました。
