import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as page from '../src/lib/manga-page-layout.js';
import { formatApiErrorGuide } from '../src/lib/api-errors.js';

// Execute the real shared post-generation block, including its logging, so a
// normalizer-only pass cannot hide a failure before the candidate reaches QA.
const source = readFileSync(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
const block = source.match(/const normalized = await normalizePageCandidate\(candidate\);[\s\S]*?return normalized;/)?.[0];
assert.ok(block);
const run = vm.runInNewContext(`(async (candidate, normalizePageCandidate, statCallback, formatPageLayoutStatus) => { ${block} })`);

const guideBlock = source.match(/const errMsg = error.message \|\| "";[\s\S]*?(?=\n      setGenLog\(prev => \[)/)?.[0];
assert.ok(guideBlock);
const errorGuide = vm.runInNewContext(`(error => { ${guideBlock}; return guideLines.join('\\n'); })`, {
  isOpenAIEngine: false, isFullAutoMode: false, isImagePolicyError: () => false, formatApiErrorGuide,
});

test('generation errors distinguish internal faults from actual timeouts and network failures', () => {
  const internal = errorGuide(new TypeError("Cannot read properties of undefined (reading 'width')"));
  assert.match(internal, /アプリ内部エラー/);
  assert.doesNotMatch(internal, /サーバーの混雑|数分時間を置いて|接続タイムアウト/);
  assert.match(errorGuide(new Error('request timed out')), /応答待ちの時間切れ/);
  assert.match(errorGuide(new TypeError('Failed to fetch')), /ネットワーク接続エラー/);
});

for (const [modelId, width, height] of [
  ['gpt-image', 2240, 3168], ['gpt-image', 1120, 1584], ['gemini-image', 848, 1200],
]) {
  test(`${modelId} already-A4 image passes the actual workflow log without re-encoding or invented bands (${width}x${height})`, async () => {
    const candidate = { modelId, base64Img: 'original-image-bytes', mimeType: 'image/png' };
    const logs = [];
    const result = await run(candidate,
      c => page.normalizePageCandidate(c, async () => { throw new Error('must not re-encode'); }, async () => ({ width, height })),
      message => logs.push(message), page.formatPageLayoutStatus);
    assert.equal(result.base64Img, candidate.base64Img);
    assert.equal(result.modelId, modelId);
    assert.equal(result.pageLayout.layout, undefined);
    assert.match(logs.join('\n'), new RegExp(`${width}×${height}.*再処理せず`));
    assert.doesNotMatch(logs.join('\n'), /タイトル\d|フッター\d|undefined/);
  });
}

test('off-ratio Gemini output passes normalization and the same workflow log, retaining its source', async () => {
  let normalized = 0;
  const candidate = { modelId: 'gemini-image', base64Img: 'raw', mimeType: 'image/png' };
  const logs = [];
  const result = await run(candidate, c => page.normalizePageCandidate(c, async () => {
    normalized++;
    return { applied: true, dataUrl: 'data:image/png;base64,fixed', layout: page.scalePageLayout(1200) };
  }, async () => ({ width: 896, height: 1200 })), message => logs.push(message), page.formatPageLayoutStatus);
  assert.equal(normalized, 1);
  assert.equal(result.base64Img, 'fixed');
  assert.equal(result.originalImage, 'data:image/png;base64,raw');
  assert.match(logs.join('\n'), /848×1200/);
});

test('failed normalization retains the candidate and reports the failure without a success claim', async () => {
  const candidate = { base64Img: 'raw', mimeType: 'image/png' };
  const logs = [];
  const result = await run(candidate, c => page.normalizePageCandidate(c,
    async () => ({ applied: false, reason: 'decode failed' }), async () => ({ width: 896, height: 1200 })),
  message => logs.push(message), page.formatPageLayoutStatus);
  assert.equal(result.base64Img, 'raw');
  assert.equal(result.pageLayout.applied, false);
  assert.match(logs.join('\n'), /未適用.*decode failed/);
  assert.doesNotMatch(logs.join('\n'), /自動補正して|再処理せず/);
});
