import test from 'node:test';
import assert from 'node:assert/strict';

const chunksModule = await import('../src/lib/web-prompt-chunks.js').catch(() => ({}));
const splitWebPromptForPaste = chunksModule.splitWebPromptForPaste;

test('Web paste chunks keep the complete prompt inline-sized and in order', () => {
  assert.equal(typeof splitWebPromptForPaste, 'function');
  const prompt = `${'A'.repeat(7600)}\n\n${'B'.repeat(7900)}\n${'C'.repeat(15000)}`;
  const chunks = splitWebPromptForPaste(prompt);
  assert.equal(chunks.length, 4);
  assert.ok(chunks.every(chunk => chunk.length > 0 && chunk.length <= 9500));
  assert.equal(chunks.join(''), prompt);
  assert.ok(chunks[0].endsWith('\n\n'));
});

test('short prompts need one copy, including an exact 9500-character prompt', () => {
  for (const length of [1, 9500]) {
    const prompt = 'X'.repeat(length);
    assert.deepEqual(splitWebPromptForPaste(prompt), [prompt]);
  }
  assert.deepEqual(splitWebPromptForPaste(''), []);
});

test('chunk boundaries do not split Unicode surrogate pairs', () => {
  const prompt = `${'a'.repeat(4750)}😀${'b'.repeat(4749)}`;
  const chunks = splitWebPromptForPaste(prompt);
  assert.equal(chunks.join(''), prompt);
  assert.ok(chunks.every(chunk => chunk.length <= 9500));
  assert.ok(chunks.every(chunk => !/[\uD800-\uDBFF]$/.test(chunk) && !/^[\uDC00-\uDFFF]/.test(chunk)));
});

test('invalid paste size is rejected', () => {
  assert.throws(() => splitWebPromptForPaste('text', 0), /positive integer/i);
});
