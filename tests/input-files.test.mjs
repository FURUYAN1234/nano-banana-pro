import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileAsDataURL, isEquirectangularFile } from '../src/lib/input-files.js';

test('file read resolves data and rejects read errors and aborts', async () => {
  class Reader {
    readAsDataURL(file) {
      if (file.kind === 'ok') {
        this.result = 'data:image/png;base64,AA==';
        this.onload();
      } else if (file.kind === 'error') {
        this.error = new Error('disk error');
        this.onerror();
      } else {
        this.onabort();
      }
    }
  }
  assert.equal(await readFileAsDataURL({ kind: 'ok' }, Reader), 'data:image/png;base64,AA==');
  await assert.rejects(readFileAsDataURL({ kind: 'error' }, Reader), /disk error/);
  await assert.rejects(readFileAsDataURL({ kind: 'abort' }, Reader), /中断/);
});

test('panorama probe releases object URL on success and decode failure', async () => {
  const released = [];
  const urlApi = {
    createObjectURL: () => 'blob:test',
    revokeObjectURL: (url) => released.push(url)
  };
  const file = {
    slice: () => ({ arrayBuffer: async () => new TextEncoder().encode('x-equirectangular-x').buffer })
  };
  class GoodImage {
    naturalWidth = 200;
    naturalHeight = 100;
    set src(_url) { this.onload(); }
  }
  class BadImage {
    set src(_url) { this.onerror(); }
  }
  assert.equal(await isEquirectangularFile(file, { ImageClass: GoodImage, urlApi }), true);
  assert.equal(await isEquirectangularFile(file, { ImageClass: BadImage, urlApi }), false);
  assert.deepEqual(released, ['blob:test', 'blob:test']);
});
