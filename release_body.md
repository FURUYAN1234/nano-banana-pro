## What's New / 更新内容

* Corrected the version sequence: `4.9.0` advances to `4.9.1`; this release supersedes the mistakenly numbered `v4.10.0` without rewriting published history.
* Added generic hand-allocation handling when one character is instructed to use both hands and point at the same time. The prompt assigns the non-pointing action to one hand and pointing to the other, explicitly prohibiting a third hand.
* Recognized numbered Markdown character headings such as `## 2. Character`, so the same protection applies to character settings produced by the analyzer.
* Added regression coverage for the conflicting-action case and confirmed the fix through a real OpenAI `gpt-image-2` manga generation.

* バージョン番号を訂正しました。`4.9.0` の次は `4.9.1` です。公開済み履歴は改竄せず、誤った `v4.10.0` を正しい `v4.9.1` で置き換えます。
* 同一人物へ両手を使う動作と指差しが同時に指定された際、非指差し動作を片手、指差しをもう片手へ配分する汎用処理を追加し、三本目の手を明示的に禁止しました。
* `## 2. キャラクター名` のような番号付きMarkdown人物見出しを認識し、キャラクター解析後の設定でも同じ保護を適用します。
* 競合動作の回帰テストを追加し、実OpenAI `gpt-image-2` の4コマ生成で修正を確認しました。
