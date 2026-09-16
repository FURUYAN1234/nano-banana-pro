import assert from 'node:assert/strict';
import test from 'node:test';

import {
  addGenerationHistoryItem,
  buildGeneratedImageFilename,
  downloadImageDataUrl,
  writeImageDataUrlToDirectory,
  MAX_GENERATION_HISTORY_ITEMS
} from '../src/lib/generation-history.js';

test('generated image history keeps multiple recent API images for selection during a loop', () => {
  const oldHistory = [
    { id: 1, img: `data:image/png;base64,${'a'.repeat(128)}` },
    { id: 2, img: `data:image/png;base64,${'b'.repeat(128)}` }
  ];
  const latest = { id: 3, img: `data:image/png;base64,${'c'.repeat(128)}` };

  assert.equal(MAX_GENERATION_HISTORY_ITEMS, 10);
  assert.deepEqual(addGenerationHistoryItem(oldHistory, latest), [latest, ...oldHistory]);
});

test('generated image history retains only the newest ten images in memory', () => {
  const oldHistory = Array.from({ length: 10 }, (_, index) => ({ id: index + 1, img: `data:image/png;base64,${index}` }));
  const latest = { id: 11, img: 'data:image/png;base64,latest' };

  assert.deepEqual(addGenerationHistoryItem(oldHistory, latest), [latest, ...oldHistory.slice(0, 9)]);
});

test('manual and automatic saves share the existing API-title-date-time filename convention', () => {
  const filename = buildGeneratedImageFilename({
    apiName: 'ChatGPT',
    title: 'タイトル / 使用禁止:文字',
    extension: 'png',
    now: new Date(2026, 8, 16, 7, 5, 9)
  });

  assert.equal(filename, 'AI_4koma_comic_ChatGPT_タイトル___使用禁止_文字_20260916070509.png');
});

test('download helper saves the selected data URL through the browser download surface', () => {
  const clicked = [];
  const parent = { appendChild: node => clicked.push(['append', node]), removeChild: node => clicked.push(['remove', node]) };
  const documentObject = { body: parent, createElement: () => ({ click() { clicked.push(['click', this]); } }) };

  downloadImageDataUrl('data:image/png;base64,saved-image', 'AI_4koma_comic_ChatGPT_title_20260916070509.png', documentObject);

  assert.equal(clicked[0][0], 'append');
  assert.equal(clicked[1][0], 'click');
  assert.equal(clicked[2][0], 'remove');
  assert.equal(clicked[0][1].href, 'data:image/png;base64,saved-image');
  assert.equal(clicked[0][1].download, 'AI_4koma_comic_ChatGPT_title_20260916070509.png');
});

test('automatic saving reports success only after the selected directory file writer closes', async () => {
  const writes = [];
  const directoryHandle = {
    async getFileHandle(filename, options) {
      writes.push(['file', filename, options]);
      return {
        async createWritable() {
          writes.push(['writer']);
          return {
            async write(blob) { writes.push(['write', blob]); },
            async close() { writes.push(['close']); }
          };
        }
      };
    }
  };
  const blob = { size: 42, type: 'image/png' };

  const result = await writeImageDataUrlToDirectory({
    imageDataUrl: 'data:image/png;base64,saved-image',
    filename: 'AI_4koma_comic_ChatGPT_title_20260916070509.png',
    directoryHandle,
    fetchFn: async () => ({ blob: async () => blob })
  });

  assert.deepEqual(result, { ok: true, filename: 'AI_4koma_comic_ChatGPT_title_20260916070509.png' });
  assert.deepEqual(writes.map(([kind]) => kind), ['file', 'writer', 'write', 'close']);
  assert.equal(writes[0][2].create, true);
  assert.equal(writes[2][1], blob);
});
