v4.7.9: Generic Dialogue & Prop Text Guard / 汎用台詞抽出・小物文字ガード

## What's New / 更新内容

* Fixed dialogue extraction so visual prop/sign quotes in Action text no longer become speech-bubble dialogue.
* Added generic support for short third-party speaker labels such as staff, passersby, or other named non-reference speakers.
* Fixed cast-limit prompts when the only dialogue speaker is outside the reference cast but the Action uses broad group cues such as "everyone", "all characters", "全員", "みんな", or "一同".
* Added a soft incidental prop/background text policy: small context-appropriate text on props is allowed, but unrelated or dominant text must not replace dialogue, titles, watermarks, punchlines, or explicitly requested scene text.

* Action内の看板・旗・小物などの引用文字が、吹き出し台詞へ誤流入する問題を汎用的に修正しました。
* スタッフ、通行人、モブなど、参照キャラ外の短い話者ラベル付き台詞を汎用的に扱えるようにしました。
* 台詞話者が参照キャラ外で、Action側に「全員」「みんな」「一同」などの広いグループ指示がある場合に、メインキャラを誤って描画禁止しないようにしました。
* 本・袋・ポスター・看板・画面・ラベル・服などの小物/背景文字について、文脈に合う短い装飾は許可しつつ、台詞・タイトル・透かし・オチ・明示指定文字列を置き換える文字は禁止するソフトガードを追加しました。
