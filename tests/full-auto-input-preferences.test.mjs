import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');

const functionBody = (name) => {
  const start = source.indexOf(`const ${name} =`);
  const end = source.indexOf('\n  };', start);
  assert.ok(start >= 0 && end > start, `${name} function must exist`);
  return source.slice(start, end);
};

test('full-auto and its loop preserve manually entered location and outfit overrides', () => {
  const fullAutoBody = functionBody('runFullAuto');

  assert.doesNotMatch(fullAutoBody, /setCustomLocation\(\s*["']{2}\s*\)/);
  assert.doesNotMatch(fullAutoBody, /setCustomOutfit\(\s*["']{2}\s*\)/);
  assert.match(fullAutoBody, /setTriggerFullAuto\(prev => prev \+ 1\)/, 'loop must start the next run through the same preserving path');
});

test('soft resets and full-auto retain prompt color mode and chosen OpenAI image settings', () => {
  const partialResetBody = functionBody('partialReset');
  const fullAutoBody = functionBody('runFullAuto');

  for (const body of [partialResetBody, fullAutoBody]) {
    assert.doesNotMatch(body, /setColorModeState\(/);
    assert.doesNotMatch(body, /setOpenAIImageQualityState\(/);
    assert.doesNotMatch(body, /setOpenAIImageSizeState\(/);
  }
});
