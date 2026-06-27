import assert from 'node:assert/strict';
import test from 'node:test';

import {
  addGenerationHistoryItem,
  MAX_GENERATION_HISTORY_ITEMS
} from '../src/lib/generation-history.js';

test('generated image history keeps only the latest data URL to avoid browser memory pileup', () => {
  const oldHistory = [
    { id: 1, img: `data:image/png;base64,${'a'.repeat(128)}` },
    { id: 2, img: `data:image/png;base64,${'b'.repeat(128)}` }
  ];
  const latest = { id: 3, img: `data:image/png;base64,${'c'.repeat(128)}` };

  assert.equal(MAX_GENERATION_HISTORY_ITEMS, 1);
  assert.deepEqual(addGenerationHistoryItem(oldHistory, latest), [latest]);
});
