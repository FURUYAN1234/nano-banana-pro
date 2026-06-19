v4.7.2: A4 PNG Export and Dialogue Classification Fixes / A4 PNG出力とセリフ分類修正

## What's New / 更新内容

* Added an A4 PNG download for generated 4-koma images. The original image is preserved and fit into a white `1024x1448` canvas without cropping.
* Kept the original-image download available separately, so users can choose either the raw model output or the A4-ready export.
* Strengthened the A4 repair prompt so the top title is explicitly redrawn and missing/cropped/moved titles are treated as failures.
* Improved dialogue extraction so visual labels, signs, amount displays, and screen text are not promoted into speech bubbles.
* Preserved spoken quote forms such as `...と呟く/叫ぶ/言う` as actual dialogue while keeping visible labels in Action.

* A4比率PNGダウンロードを追加しました。生成元画像を切り抜かず、白い `1024x1448` キャンバス内に収めます。
* 元画像ダウンロードも残し、モデル出力そのままとA4提出向け出力を選べるようにしました。
* A4修正プロンプトでタイトル再描画を明示し、タイトル欠落・切れ・移動・書き換えを失敗条件にしました。
* 看板、ラベル、金額表示、画面表示などの引用が吹き出し化されないよう、セリフ抽出を改善しました。
* `...と呟く/叫ぶ/言う` 形式の発話引用はDialogueとして保持し、表示文字はAction側に残します。
