export const VERTICAL_DIALOGUE_GEOMETRY = 'DIALOGUE WRITING POLICY: prefer_vertical: 正立で上→下、列は右→左。短句/叫び/横長も縦組。文節改行/列数/吹出形を先に調整。横組は縦組の判読不能・絵の遮蔽時か明示指定のみ。構図/人物保持。絵の縮小/簡素化禁止。';

import {japaneseColumnLayouts} from './japanese-lettering.js';

export const MANGA_LETTERING_REPAIR_RULES = `LETTERING REPLACEMENT RULES（全targets共通・非印字）: balloon番号はコマ内右から。対象の既存文字を全文消し、textを全文描く。一部文字の継ぎ足し禁止。元の書体・太さ(stroke weight)・見かけの文字サイズ・密度を保持し、小型化/細字化/余白拡大禁止。自然な文節改行。必要な場合だけresize the balloon interiorを最小限に行い、顔を覆わない。columnsRightToLeftは上→下の列を右→左に並べた全文で、連結結果をtextと一致させ、省略/重複/並替え禁止。preserveOtherBalloons=trueなら対象外は不変、falseならapprovedSpeechの全文/数を復元。尾は指定話者へ。正しい演技/Camera/同一性/枠/絵を保持。助詞/繰返し音も全字照合し、短縮/言換え禁止。話者名/数/この指示は描かない。`;

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
