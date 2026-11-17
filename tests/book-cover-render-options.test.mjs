import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBookIllustrationPrompt } from '../src/lib/book-presentation.js';
import { readRenderOptions, readProtectedCast } from '../src/lib/render-options.js';

test('cover metadata follows every title, watermark and mosaic switch without dropping author credit', () => {
  for (const showTitle of [false, true]) for (const showWatermarks of [false, true]) for (const mosaicCopyrightedCharacters of [false, true]) {
    const options = { showTitle, showWatermarks, mosaicCopyrightedCharacters };
    const prompt = buildBookIllustrationPrompt({
      ...options, direction: 'Approved original-person cover', castList: '## 葵\nOriginal adult character',
      colorMode: 'monochrome', pageIndex: 1, presentation: { authorName: 'Custom author', logoText: 'Approved title' },
    });
    assert.deepEqual(readRenderOptions(prompt), options);
    assert.equal(prompt.includes('Cover/title lettering:'), showTitle);
    assert.match(prompt, /Cover author credit: print exactly "Custom author"/);
    assert.match(prompt, /independent of the title\/logo and watermark switches/);
    assert.equal(prompt.includes('MOSAIC TARGET SCOPE:'), mosaicCopyrightedCharacters);
    assert.deepEqual(readProtectedCast(prompt), mosaicCopyrightedCharacters ? ['葵'] : []);
    assert.doesNotMatch(prompt, /Keep the A4 portrait canvas, all four outer frame/);
  }
});
