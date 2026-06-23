v4.8.0: Generic Dialogue & Title Fix / 汎用台詞抽出とタイトル句読点修正

## What's New / 更新内容

* Extracted spoken quotes embedded in action narration alongside explicit dialogue while preserving source order.
* Preserved terminal title punctuation such as `!?` in generated manga prompts and Step 4 prompt rebuilds.
* Documented the highest-priority rule that bug fixes must remain generic and must not hardcode proper nouns, sample words, character names, sample dialogue, product/place names, trend words, or one-off prompt fragments in production source.
* Added regression tests for embedded spoken quote extraction, visual quote exclusion, handwriting text exclusion, and title punctuation preservation.

* 状況文の中に埋め込まれた発話引用を、明示台詞と同時に抽出し、元の出現順を維持するよう修正しました。
* 漫画タイトル末尾の `!?` などを、最終プロンプトおよびStep 4再構築時に保持するよう修正しました。
* バグ修正は汎用ルールとして実装し、production source に固有名詞、サンプル語、キャラクター名、サンプル台詞、商品名、場所名、流行語、個別プロンプト片をハードコードしない最重要ルールを明文化しました。
* 状況文内発話の抽出、視覚文字の台詞除外、手書き文字の台詞除外、タイトル句読点保持の回帰テストを追加しました。
