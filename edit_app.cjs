const fs = require('fs');
const filePath = './src/App.jsx';

let code = fs.readFileSync(filePath, 'utf8');
const lines = code.split('\n');

// Find the exact start line containing "6. **【カメラ演出タグ"
let startIdx = -1;
let endIdx = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('6. **【カメラ演出タグ (Camera Direction Tag)】**:')) {
        startIdx = i;
    }
    // End is the line with "4コマ目（結）" 
    if (startIdx !== -1 && lines[i].includes('4コマ目（結）: オチの感情に合わせて自由選択')) {
        endIdx = i;
        break;
    }
}

if (startIdx === -1 || endIdx === -1) {
    console.log("FAILED: Could not find camera section boundaries.");
    console.log("startIdx:", startIdx, "endIdx:", endIdx);
    process.exit(1);
}

console.log(`Found camera section: lines ${startIdx+1} to ${endIdx+1}`);

// Build the replacement content (matching the file's indentation style)
const newSection = `        6. **【カメラ演出タグ (Camera Direction Tag) — 極限物理描写モード v2.55】**:
           - 各コマの冒頭に [Camera: XXX] タグを**必ず1つ**付与せよ。
           - **【超重要・カメラ名だけでは不十分】**: [Camera: XXX] タグの直後に、**そのカメラアングルで物理的に何が見えるかの極限描写**を必ず1〜2文書け。
           - カメラ名を書いただけ（例:「[Camera: ローアングル]」のみ）は**絶対に禁止**。
           - **物理描写の書き方（全コマ必須）**: 「カメラがどこにあり」「何が巨大に見え」「何が歪み」「光がどう当たるか」を具体的に書け:
              * 俯瞰/バードアイ → 「成層圏を突き抜け、銀河の果てから地球の一点を凝視するような極限の俯瞰。太陽光が海面で核爆発的な反射を放つ」
              * ローアングル/アオリ → 「地面の亀裂から見上げる、靴の裏が画面の8割を占拠し頭部が豆粒ほどに遠ざかる。背後から大噴火の逆光が吹き荒れる」
              * フィッシュアイ → 「画面の端が球体のように丸く歪み、中央の顔が巨大に膨れ上がり、周囲の建物が飴細工のようにぐにゃりと曲がる」
              * ダッチアングル → 「世界が30度傾き、壁も床も天井も重力を忘れて斜めに流れ、キャラが滑り落ちそうな不安定感で画面が崩壊する」
              * 望遠圧縮 → 「100m先の背景が目の前まで迫り、キャラと背景の距離感が消失し、圧迫的な密度で空間が潰れる」
              * ワームズアイ → 「アリの目線から見上げ、靴底の泥の粒まで見える地面すれすれ。人間が巨人のようにそびえ立つ」
              * マクロ特写 → 「瞳のハイライトの中に周囲の風景が映り込むほどの超接写。睫毛の一本一本が柱のように太い」
           - 選択肢: 俯瞰/バードアイ、ローアングル/アオリ、ダッチアングル、超広角/フィッシュアイ、望遠圧縮、ワームズアイ、ドローン俯瞰、マクロ特写
           - 【制約】4コマの中で**同じカメラを2回以上使うのは禁止**。必ず4種類の異なるカメラを選べ。

        7. **【リアクション描写の極限化 (Extreme Reaction Mandate v2.55)】**:
           - 各コマのト書きに記載するキャラのリアクションは、**通常の3倍以上の過激さ**で書け。
           - 「驚く」→「眼球がソケットから飛び出し背骨が物理限界を超えて逆Cの字にしなる」
           - 「怒る」→「顔中の血管が爆発しそうなほど怒り狂い、足元の地面に大穴が穿たれる」
           - 「喜ぶ」→「顔面が多幸感でドロドロに融解し、全身の毛穴から歓喜の汗を噴水のように噴き出す」
           - 「慌てる」→「マッハを超える超高速移動で残像を残しながら物を隠す」
           - 控えめな表現（微笑む、少し驚く、首を傾げる等）は**禁止**。常に限界突破させよ。`;

// Replace lines startIdx to endIdx with new content
const before = lines.slice(0, startIdx);
const after = lines.slice(endIdx + 1);
const newLines = newSection.split('\n');

const result = [...before, ...newLines, ...after].join('\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log(`SUCCESS: Replaced ${endIdx - startIdx + 1} lines (${startIdx+1}-${endIdx+1}) with ${newLines.length} new lines.`);
