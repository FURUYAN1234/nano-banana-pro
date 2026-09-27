// The ChatGPT composer was observed to turn a single 10,000-character paste
// into a TXT attachment. Leave room below that observed UI boundary.
export const WEB_PASTE_CHUNK_CHARS = 9500;

export function splitWebPromptForPaste(prompt, maxChars = WEB_PASTE_CHUNK_CHARS) {
  if (!Number.isInteger(maxChars) || maxChars < 2) {
    throw new RangeError('Paste size must be a positive integer of at least 2.');
  }
  if (typeof prompt !== 'string') throw new TypeError('Prompt must be a string.');
  if (!prompt) return [];

  const chunks = [];
  let start = 0;

  while (prompt.length - start > maxChars) {
    const end = start + maxChars;
    const newline = prompt.lastIndexOf('\n', end - 1);
    let cut = newline >= start ? newline + 1 : end;
    // A single line over the limit must be split; keep UTF-16 pairs intact.
    if (cut === end && /[\uD800-\uDBFF]/.test(prompt[cut - 1] || '') && /[\uDC00-\uDFFF]/.test(prompt[cut] || '')) {
      cut--;
    }
    chunks.push(prompt.slice(start, cut));
    start = cut;
  }
  chunks.push(prompt.slice(start));

  if (chunks.some(chunk => !chunk || chunk.length > maxChars) || chunks.join('') !== prompt) {
    throw new Error('Web paste split did not preserve the complete prompt.');
  }
  return chunks;
}
