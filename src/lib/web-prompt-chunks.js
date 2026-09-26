// The ChatGPT composer was observed to turn a single 10,000-character paste
// into a TXT attachment. Leave room below that observed UI boundary.
export const WEB_PASTE_CHUNK_CHARS = 9500;

export function splitWebPromptForPaste(prompt, maxChars = WEB_PASTE_CHUNK_CHARS) {
  if (!Number.isInteger(maxChars) || maxChars < 2) {
    throw new RangeError('Paste size must be a positive integer of at least 2.');
  }
  if (typeof prompt !== 'string') throw new TypeError('Prompt must be a string.');
  if (!prompt) return [];

  const count = Math.ceil(prompt.length / maxChars);
  const chunks = [];
  let start = 0;

  for (let remaining = count; remaining > 1; remaining--) {
    const minimum = Math.max(start + 1, prompt.length - (remaining - 1) * maxChars);
    const maximum = Math.min(start + maxChars, prompt.length - (remaining - 1));
    const target = Math.max(minimum, Math.min(maximum, start + Math.round((prompt.length - start) / remaining)));
    let cut = target;
    let bestScore = Infinity;

    // Prefer a nearby paragraph or line boundary without changing the text.
    for (let candidate = Math.max(minimum, target - 512); candidate <= Math.min(maximum, target + 512); candidate++) {
      if (prompt[candidate - 1] !== '\n') continue;
      const score = Math.abs(candidate - target) - (prompt[candidate - 2] === '\n' ? 100 : 0);
      if (score < bestScore) {
        bestScore = score;
        cut = candidate;
      }
    }

    // JavaScript lengths use UTF-16 code units; never break an emoji in half.
    if (/[\uD800-\uDBFF]/.test(prompt[cut - 1] || '') && /[\uDC00-\uDFFF]/.test(prompt[cut] || '')) {
      cut = cut < maximum ? cut + 1 : cut - 1;
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
