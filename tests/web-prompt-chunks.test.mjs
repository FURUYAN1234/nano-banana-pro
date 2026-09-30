import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const chunksModule = await import('../src/lib/web-prompt-chunks.js').catch(() => ({}));
const splitWebPromptForPaste = chunksModule.splitWebPromptForPaste;
const ensureWebPromptTrailingNewline = chunksModule.ensureWebPromptTrailingNewline;

test('copied Web prompt ends at the next line without adding an empty line', () => {
  assert.equal(typeof ensureWebPromptTrailingNewline, 'function');
  assert.equal(ensureWebPromptTrailingNewline('last instruction'), 'last instruction\n');
  assert.equal(ensureWebPromptTrailingNewline('last instruction\n'), 'last instruction\n');
  assert.equal(ensureWebPromptTrailingNewline('last instruction\n\n'), 'last instruction\n');
  assert.equal(ensureWebPromptTrailingNewline('last instruction\r\n'), 'last instruction\n');
  const prompt = ensureWebPromptTrailingNewline(`${'A'.repeat(6000)}\n${'B'.repeat(6000)}\n${'C'.repeat(6000)}`);
  const chunks = splitWebPromptForPaste(prompt);
  assert.ok(chunks.every(chunk => chunk.endsWith('\n')));
  assert.equal(chunks.join(''), prompt);
  assert.equal(prompt.at(-2), 'C');
});

test('the STEP4 full, split and TXT copy paths share the trailing-newline preparation', () => {
  const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  assert.match(source, /const prepareWebCopyPrompt = \(prompt\) => \{[\s\S]*?assertRenderOptions\([\s\S]*?return ensureWebPromptTrailingNewline\(/);
  assert.match(source, /webCopyPartLengths = splitWebPromptForPaste\(prepareWebCopyPrompt\(finalPrompt\)\)/);
  assert.match(source, /copiedPrompt = prepareWebCopyPrompt\(finalPrompt\)/);
});

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

test('prefer a whole-line boundary even when it is far from the balanced target', () => {
  const prompt = `${'A'.repeat(6000)}\n${'B'.repeat(6000)}\n${'C'.repeat(6000)}`;
  const chunks = splitWebPromptForPaste(prompt);
  assert.deepEqual(chunks, [`${'A'.repeat(6000)}\n`, `${'B'.repeat(6000)}\n`, 'C'.repeat(6000)]);
  assert.equal(chunks.join(''), prompt);
});

test('invalid paste size is rejected', () => {
  assert.throws(() => splitWebPromptForPaste('text', 0), /positive integer/i);
});
