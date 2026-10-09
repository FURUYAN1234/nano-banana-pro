import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareGeneratedImageSave, saveImageToChosenLocation, createFinalImageSaver } from '../src/lib/generated-image-save.js';
import { extractGeneratedImageMetadata } from '../src/lib/generated-image-metadata.js';
import { readFile } from 'node:fs/promises';
import { addGenerationHistoryItem } from '../src/lib/generation-history.js';

const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nKsAAAAASUVORK5CYII=';
const item = { id: 10, img: png, generatedAt: '2026-10-09T00:00:00Z', modelId: 'gpt-test', metadataContext: { provider: 'openai', scenario: '## タイトル：保存の検証', finalPrompt: 'test', inputImages: [], settings: { quality: 'high' } } };

test('prepared PNG retains generation snapshot and unique filename', async () => {
  const saved = await prepareGeneratedImageSave(item, 'test');
  const metadata = extractGeneratedImageMetadata(saved.dataUrl);
  assert.ok(metadata);
  assert.match(saved.filename, /保存の検証/);
  assert.notEqual(saved.filename, (await prepareGeneratedImageSave(item, 'test')).filename);
});

test('final save waits for preparation, rejects stale completion and deduplicates concurrent calls', async () => {
  let finish, current = true;
  const calls = [];
  const saver = createFinalImageSaver({ prepare: () => new Promise(resolve => { finish = resolve; }), download: (...args) => calls.push(args) });
  const pending = saver(item, 'test', () => current);
  const duplicate = saver(item, 'test', () => current);
  assert.equal(calls.length, 0);
  current = false; finish({ dataUrl: png, filename: 'a.png' });
  assert.equal(await pending, 'stale'); assert.equal(await duplicate, 'stale');
  assert.equal(calls.length, 0);
  current = true;
  const next = saver(item, 'test', () => current);
  finish({ dataUrl: png, filename: 'a.png' });
  assert.equal(await next, 'requested');
  assert.equal(await saver(item, 'test', () => current), 'duplicate');
  assert.equal(calls.length, 1);
});

test('save picker opens before asynchronous preparation; cancellation never downloads', async () => {
  const order = [];
  const prepare = async () => { order.push('prepare'); return { dataUrl: png, filename: 'a.png' }; };
  const picker = () => { order.push('picker'); return Promise.resolve({ createWritable: async () => ({ write: async blob => { assert.ok(blob instanceof Blob); order.push('write'); }, close: async () => order.push('close') }) }); };
  assert.equal(await saveImageToChosenLocation({ prepare, picker, filename: 'a.png' }), 'saved');
  assert.deepEqual(order, ['picker', 'prepare', 'write', 'close']);
  let downloaded = false;
  assert.equal(await saveImageToChosenLocation({ prepare, picker: () => Promise.reject(new DOMException('cancel', 'AbortError')), download: () => { downloaded = true; } }), 'cancelled');
  assert.equal(downloaded, false);
});

test('unsupported picker uses download; preparation failure preserves error without download', async () => {
  const calls = [];
  assert.equal(await saveImageToChosenLocation({ picker: null, prepare: async () => ({ dataUrl: png, filename: 'a.png' }), download: (...args) => calls.push(args) }), 'requested');
  const saver = createFinalImageSaver({ prepare: async () => { throw new Error('encode failed'); }, download: () => calls.push('bad') });
  await assert.rejects(saver(item, 'test', () => true), /encode failed/);
  assert.equal(calls.length, 1);
});

test('production final-selection block saves accepted snapshot before continuing, never stopped or unchanged review images', async () => {
  const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const start = source.indexOf('      const acceptedImageStr =');
  const end = source.indexOf('    } catch (error)', start);
  assert.ok(start > 0 && end > start);
  const block = source.slice(start, end);
  for (const mode of ['manual', 'full-auto', 'endless', 'stopped', 'review', 'stale', 'save-failed']) {
    const downloaded = [], history = [];
    let release;
    const current = { value: true };
    const save = createFinalImageSaver({ prepare: () => new Promise(resolve => { release = resolve; }), download: (...args) => downloaded.push(args) });
    const candidate = { base64Img: png.split(',')[1], mimeType: 'image/png', modelId: 'gpt-test', metadataContext: item.metadataContext };
    const ctx = {
      generatedMimeType: 'image/png', generatedModelId: 'gpt-test',
      qualityOutcome: { candidate, candidates: [{ candidate }], canContinue: mode !== 'stopped', validationWarning: false, attempts: 1 },
      qualityResult: { pass: true }, generationOptions: { reviewExisting: mode === 'review' },
      generatedImage: png, GEMINI_IMAGE_MODEL: 'gemini-test',
      addGenerationHistoryItem, setGenerationHistory: fn => history.push(...fn([])),
      setGeneratedImage() {}, setIsGenerationError() {}, setIsFallbackUsed() {}, setGenLog() {}, showStatus() {}, statCallback() {},
      scenarioRunEpochRef: { current: 1 }, qualityRunEpoch: 1, qualityRetryAbortRef: { current: false },
      fullAutoAbortRef: { current: false }, isFullAutoMode: ['full-auto', 'endless'].includes(mode),
      autoSaveFinalImage: async (snapshot, isCurrent) => {
        if (mode === 'save-failed') return false;
        const result = await save(snapshot, 'test', () => current.value && isCurrent());
        return result !== 'stale';
      },
    };
    const execute = new Function(...Object.keys(ctx), `return (async () => {${block}})()`);
    let finished = false;
    const pending = execute(...Object.values(ctx)).then(value => { finished = true; return value; });
    if (release) {
      assert.equal(finished, false, mode);
      if (mode === 'stale') current.value = false;
      release({ dataUrl: png, filename: 'test.png' });
    }
    const result = await pending;
    assert.equal(downloaded.length, ['manual', 'full-auto', 'endless'].includes(mode) ? 1 : 0, mode);
    assert.equal(result, !['stopped', 'stale', 'save-failed'].includes(mode), mode);
    assert.equal(history[0].metadataContext, item.metadataContext);
  }
});
