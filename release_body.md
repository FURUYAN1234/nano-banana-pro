v4.7.3: Role Speaker Dialogue Retention / 役割話者のセリフ保持修正

## What's New / 更新内容

* Fixed a prompt-assembly issue where role speakers such as `男子` and `ギャル` could be lost when character-sheet OCR produced a non-person heading instead of separate character names.
* Preserved role speakers through dialogue extraction, placement rules, and cast-limit rules so both characters remain present and speech bubbles are not collapsed into a solo/monologue scene.
* Added generic character-analysis guidance: OCR that does not look like a person name or person label must not become a character name.
* When names are absent, the character analysis step now asks the model to split visible people into separate role-based provisional character sections.

* キャラクターシートOCRが人物名ではない見出しを出した場合に、`男子` / `ギャル` などの役割話者が失われるプロンプト組み立て問題を修正しました。
* セリフ抽出、配置ルール、人数制限ルールで役割話者を保持し、2人の掛け合いがソロ/独白扱いに潰れないようにしました。
* 人名・人物ラベルとして成立していないOCR文字列をキャラクター名にしない汎用解析ルールを追加しました。
* 名前が書かれていない人物は、見た目と役割に基づく仮人物名で分割するようキャラクター解析ステップを強化しました。
