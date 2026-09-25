export const VERTICAL_DIALOGUE_GEOMETRY = 'Upright glyphs top-to-bottom; columns right-to-left. No horizontal/rotated rows, including single-balloon shouts.';

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
