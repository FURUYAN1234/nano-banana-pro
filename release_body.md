## What's New / 更新内容

### Version correction / バージョン訂正

* `v4.10.0` was an erroneous version number. The correct successor to `v4.9.0` is `v4.9.1`; the erroneous Release and tag were removed.
* No additional application logic was added after the mistaken `v4.10.0` publication. The changes below are the actual contents introduced since `v4.9.0`.

* `v4.10.0` は誤った版番号です。`v4.9.0` の正しい次版は `v4.9.1` のため、誤ったReleaseとタグを削除しました。
* 誤った `v4.10.0` 公開後に追加したアプリ本体ロジックはありません。以下は `v4.9.0` から実際に追加された内容です。

### Included changes since v4.9.0 / v4.9.0からの実装内容

* Added generic hand-allocation handling when one character is instructed to use both hands and point at the same time. The prompt assigns the non-pointing action to one hand and pointing to the other, explicitly prohibiting a third hand.
* Recognized numbered Markdown character headings such as `## 2. Character`, so the same protection applies to character settings produced by the analyzer.
* Added regression coverage for the conflicting-action case and confirmed the fix through a real OpenAI `gpt-image-2` manga generation.

* 同一人物へ両手を使う動作と指差しが同時に指定された際、非指差し動作を片手、指差しをもう片手へ配分する汎用処理を追加し、三本目の手を明示的に禁止しました。
* `## 2. キャラクター名` のような番号付きMarkdown人物見出しを認識し、キャラクター解析後の設定でも同じ保護を適用します。
* 競合動作の回帰テストを追加し、実OpenAI `gpt-image-2` の4コマ生成で修正を確認しました。
