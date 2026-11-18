export const DRAFT_SPOKEN_ENDINGS = `完結した日本語の吹き出し台詞は、1ページ漫画でも複数ページの本文でも、各ページの最終コマまで確認する。平叙文の末尾は「。」、驚き・問いかけは「！」「？」または「！？」等の組合せで閉じる。「いいよ……。」のように平叙の余韻を残す。感嘆符・疑問符に句点を重ねず、「行く？」を「行く。」へ変えない。句点等は話者の台詞の閉じ括弧の内側に置く。タイトル・人名札・擬音、同じ文が次の吹き出しや行に続く途中には機械的に加えない。吹き出し内の改行・改列は文末ではない。印字した文字を読順でつなぎ、文の途中に余分な「。」がないかも確認する。明示的に固定された原文や承認済みの語気は守る。`;

const LINE_WRAP_PUNCTUATION = '改行・改列で句点を足さない。';

export const VERTICAL_DIALOGUE_GEOMETRY = 'DIALOGUE WRITING POLICY: prefer_vertical: 正立で上→下、列は右→左。短句/叫び/横長も縦組。文節改行/列数/吹出形を先に調整。横組は縦組の判読不能・絵の遮蔽時か明示指定のみ。構図/人物保持。絵の縮小/簡素化禁止。';

import {japaneseColumnLayouts} from './japanese-lettering.js';

export const MANGA_LETTERING_REPAIR_RULES = `LETTERING REPLACEMENT RULES（全targets共通・非印字）: balloon番号はコマ内右から。対象の文字を全消去しtext全文を描く。継ぎ足し禁止。元の書体・太さ(stroke weight)・見かけの文字サイズ・密度を保持し、小型化/細字化/余白拡大禁止。文節で改行。${LINE_WRAP_PUNCTUATION}必要時だけ最小限resize the balloon interior。顔を保つ。columnsRightToLeftは上→下の列を右→左に並べた全文で、連結はtextと一致。省略/重複/並替え禁止。preserveOtherBalloons=trueなら対象外は不変、falseならapprovedSpeechの全文/数を復元。尾は指定話者へ。正しい演技/Camera/同一性/枠/絵を保持。助詞/繰返し音も全字照合し、短縮/言換え禁止。話者名/数/この指示は描かない。`;

// Compile exact source glyphs into phrase-aware vertical columns for a lettering
// replacement. Preserve authored line breaks and non-Japanese typography.
export function buildVerticalLetteringColumns(text) {
  if(typeof text!=='string'||/[\r\n]/u.test(text)||!/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u.test(text))return null;
  const layouts=japaneseColumnLayouts(text);
  return layouts.find(columns=>columns.every(column=>[...new Intl.Segmenter('ja',{granularity:'grapheme'}).segment(column)].length<=9))||layouts.at(-1)||null;
}

// 印字本文はJSON文字列として往復させる。本文中の引用符やB番号を制御情報へ解釈しない。
export const readBubbleTextValues = (source = '', { strict = false } = {}) => {
  const entries = [];
  const text = String(source);
  const spans = [];
  const pattern = /\b(B\d+)\s*=\s*("(?:\\.|[^"\\])*")/g;
  for (const match of text.matchAll(pattern)) {
    try {
      if (!/^(?:\s*(?:;|\.|\[|$))/.test(text.slice(match.index + match[0].length))) throw new Error();
      entries.push({ bubble: match[1], text: JSON.parse(match[2]) });
      spans.push([match.index, match.index + match[0].length]);
    } catch {
      if (strict) throw new Error('吹き出しの印字本文が不正です。引用符とエスケープを確認してください。');
      return [];
    }
  }
  const remainder = spans.reduceRight((value, [start, end]) => value.slice(0, start) + value.slice(end), text);
  if (strict && /\bB\d+\s*=\s*(?!>)/.test(remainder)) {
    throw new Error('吹き出しの印字本文が不正です。引用符とエスケープを確認してください。');
  }
  return entries;
};

export const assertDialogueQuoteBalance = (text, speaker = '') => {
  let depth = 0;
  for (const character of text) {
    if (character === '「') depth++;
    if (character === '」') depth--;
    if (depth < 0) break;
  }
  if (depth !== 0) {
    const error = new Error(`台詞の括弧「」が対応していません${speaker ? `（話者: ${speaker}）` : ''}。STEP2の台詞行を確認してください。`);
    error.code = 'DIALOGUE_SYNTAX';
    throw error;
  }
};

// 編集済みの最終プロンプトにも適用し、不正な本文のコピーやAPI送信を止める。
export const assertPrintableDialogue = (prompt = '') => {
  for (const rawLine of String(prompt).split(/\r?\n/)) {
    const line = rawLine.trimStart();
    if (!/^(?:\\?- Panel \d+ required dialogue:|Dialogue\b)/.test(line)
      || !line.includes('TEXT (PRINT VALUES ONLY)')) continue;
    const entries = readBubbleTextValues(line, { strict: true });
    if (!entries.length || entries.some((entry, index) => entry.bubble !== `B${index + 1}` || !entry.text.trim())) {
      throw new Error('吹き出しの本文または番号が不正です。最終プロンプトのDialogue欄を確認してください。');
    }
    for (const entry of entries) assertDialogueQuoteBalance(entry.text);
  }
  return prompt;
};
