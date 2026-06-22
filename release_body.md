v4.7.4: Generic Dialogue Retention / 汎用セリフ保持修正

## What's New / 更新内容

* Fixed generic cast parsing so note/metadata headings are not treated as characters.
* Normalized provisional-name heading labels before creating cast entries.
* Preserved dialogue from person-like compound speaker labels by mapping them back to matching cast entries through generic descriptor tokens.
* Excluded panel headers from dialogue extraction so panel labels cannot become speech bubbles.

* 備考・補足などの非キャラクター見出しをキャラクター扱いしない汎用パースに修正しました。
* 仮名・暫定名などの見出しラベルをキャラクター名から除去するようにしました。
* 人物を表す複合ラベル話者を、汎用的な特徴トークンで対応するキャストへ名寄せし、台詞が落ちないようにしました。
* コマ見出しをセリフ抽出から除外し、パネルラベルが吹き出し化されないようにしました。
