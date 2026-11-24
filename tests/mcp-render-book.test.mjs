
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBookFinalReviewPrompt, parseBookFinalReview, renderBookInOrder } from '../src/lib/mcp/render-book.js';

function bookRun({ faultyPage, cancelled, noSavedImage } = {}) {
  const pages = [
    { id: 'cover', index: 0, kind: 'illustration' },
    { id: 'first', index: 1, kind: 'manga', panelCount: 4 },
    { id: 'last', index: 2, kind: 'manga', panelCount: 4 },
  ];
  const saved = new Set(['cover']);
  const operations = [];
  const context = {
    throwIfCancelled() {
      if (cancelled && operations.includes('review:cover:none')) {
        throw Object.assign(new Error('Cancelled'), { code: 'CANCELLED' });
      }
    },
    async loadPage(pageId) {
      operations.push('load:' + pageId);
      return { pageId, page: pages.find(page => page.id === pageId), expectedScenario: pageId,
        snapshot: saved.has(pageId) ? { accepted: true, generatedImage: 'saved-' + pageId } : undefined };
    },
    async invoke({ operation, pageId }) {
      operations.push(operation + ':' + pageId);
      if (operation === 'image' && pageId !== noSavedImage) saved.add(pageId);
      return { success: true };
    },
  };
  const run = renderBookInOrder({
    job: { project: { pages } }, context,
    async reviewPage({ pageId, snapshot }, previous) {
      assert.equal(snapshot.generatedImage, 'saved-' + pageId);
      operations.push('review:' + pageId + ':' + (previous?.scenario ?? 'none'));
      return { status: pageId === faultyPage ? 'defect' : 'pass', imageSha256: pageId };
    },
  });
  return { run, operations };
}

test('book renders and saves all pending pages before reviewing every saved page in order', async () => {
  const { run, operations } = bookRun();
  const outcome = await run;
  assert.equal(outcome.success, true);
  assert.deepEqual(outcome.result.completed, [
    { pageId: 'cover', retained: true }, { pageId: 'first', retained: false }, { pageId: 'last', retained: false },
  ]);
  assert.deepEqual(operations.filter(op => !op.startsWith('load:')), [
    'apply_page:first', 'prompt:first', 'image:first',
    'apply_page:last', 'prompt:last', 'image:last',
    'review:cover:none', 'review:first:cover', 'review:last:first',
  ]);
  assert.equal(outcome.result.finalReview.status, 'pass');
});

test('final defects preserve saved pages and do not prevent reviewing subsequent pages', async () => {
  const { run } = bookRun({ faultyPage: 'first' });
  const result = await run;
  assert.equal(result.success, false);
  assert.equal(result.result.complete, false);
  assert.equal(result.result.finalReview.status, 'needs_review');
  assert.deepEqual(result.result.finalReview.pages.map(page => page.status), ['pass', 'defect', 'pass']);
});

test('a missing saved page and an explicit cancellation cannot give a completed review', async () => {
  const missing = await bookRun({ noSavedImage: 'last' }).run;
  assert.equal(missing.error.code, 'BOOK_FINAL_REVIEW_SOURCE_MISSING');
  await assert.rejects(bookRun({ cancelled: true }).run, { code: 'CANCELLED' });
});

test('final review requires grounded findings and shares the visual review criteria', () => {
  assert.deepEqual(parseBookFinalReview('{"checked":true,"findings":[]}', 4), { status: 'pass', findings: [] });
  for (const findings of [
    '{"checked":false,"findings":[]}',
    '{"checked":true,"findings":[{"status":"defect","panel":5,"evidence":"loose cuff","expected":"long sleeve"}]}',
    '{"checked":true,"findings":[{"status":"defect","panel":1,"evidence":"","expected":"long sleeve"}]}',
  ]) assert.throws(() => parseBookFinalReview(findings, 4));
  const review = parseBookFinalReview('{"checked":true,"findings":[{"status":"unverified","panel":2,"evidence":"text obscured","expected":"speaker named in script"}]}', 4);
  assert.equal(review.status, 'unverified');
  const prompt = buildBookFinalReviewPrompt({
    page: { index: 2, kind: 'manga', panelCount: 4 },
    scenario: 'keep long sleeves', previousPage: { index: 1, scenario: 'take the key' }, references: [{ role: 'character_sheet' }],
  });
  for (const phrase of ['LIMB OWNERSHIP', 'SCENE RELATIONSHIPS', 'VISIBLE WARDROBE AND PROPS', 'previous story page', 'take the key', 'character_sheet']) {
    assert.ok(prompt.includes(phrase), phrase);
  }
});
