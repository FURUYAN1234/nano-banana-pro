import { createApiError } from './api-errors.js';

// One in-memory signal spans text, image streams, QA and provider fallbacks.
// Old requests keep their aborted signal when a new user action starts.
let workController = new AbortController();

export const beginApiWork = () => {
  if (workController.signal.aborted) workController = new AbortController();
};

export const cancelApiWork = () => workController.abort();

export const getApiWorkSignal = (signal) => signal
  ? AbortSignal.any([workController.signal, signal]) : workController.signal;

export const throwIfApiWorkCancelled = (signal) => {
  if (signal?.aborted) throw createApiError('処理を強制停止しました。', { code: 'CANCELLED' });
};

// Covers a whole inspection, including response bodies and supplementary calls.
export async function withImageReviewDeadline(request, signal, budgetMs = 120_000) {
  const parent = getApiWorkSignal(signal);
  throwIfApiWorkCancelled(parent);
  const deadline = new AbortController();
  const combined = AbortSignal.any([parent, deadline.signal]);
  let timer, stop;
  const boundary = new Promise((_, reject) => {
    timer = setTimeout(() => {
      deadline.abort();
      reject(createApiError('画像検査の待機上限に達しました。画像を保持し、未確認とします。', {code:'REVIEW_TIMEOUT'}));
    }, budgetMs);
    stop = () => reject(createApiError('処理を強制停止しました。', {code:'CANCELLED'}));
    parent.addEventListener('abort', stop, {once:true});
  });
  try { return await Promise.race([Promise.resolve().then(() => request(combined)), boundary]); }
  finally { clearTimeout(timer); parent.removeEventListener('abort', stop); }
}
