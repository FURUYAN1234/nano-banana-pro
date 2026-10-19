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

export const IMAGE_REVIEW_BUDGET_MS = 600_000;
const reviewTimeout = () => createApiError('品質検査の合計待ち時間が上限に達しました。画像を保持し、検査未完了として終了します。', {code:'IMAGE_REVIEW_TIMEOUT'});

// One STEP4 run shares this budget across inspection, confirmation and comparison.
// Time outside run() (notably paid image generation) does not consume QA time.
export function createImageReviewBudget({timeoutMs = IMAGE_REVIEW_BUDGET_MS} = {}) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) throw new TypeError('Invalid image review budget');
  let remainingMs = timeoutMs;
  let activeSince = null;
  return {
    get exhausted() { return remainingMs <= 0; },
    get elapsedMs() { return Math.min(timeoutMs, timeoutMs - remainingMs + (activeSince === null ? 0 : Date.now() - activeSince)); },
    async run(request, signal) {
      if (remainingMs <= 0) throw reviewTimeout();
      const startedAt = Date.now();
      activeSince = startedAt;
      try {
        return await withImageReviewCancellation(request, signal, {timeoutMs:remainingMs});
      } catch (error) {
        if (error.code === 'IMAGE_REVIEW_TIMEOUT') remainingMs = 0;
        throw error;
      } finally {
        remainingMs = Math.max(0, remainingMs - (Date.now() - startedAt));
        activeSince = null;
      }
    },
  };
}

// Race even when a transport/body reader fails to settle after its signal aborts.
export async function withImageReviewCancellation(request, signal, {timeoutMs} = {}) {
  const parent = getApiWorkSignal(signal);
  throwIfApiWorkCancelled(parent);
  const controller = new AbortController();
  const workSignal = AbortSignal.any([parent, controller.signal]);
  let stop, timer;
  const boundary = new Promise((_, reject) => {
    stop = () => reject(createApiError('処理を強制停止しました。', {code:'CANCELLED'}));
    parent.addEventListener('abort', stop, {once:true});
    if (timeoutMs !== undefined) timer = setTimeout(() => {
      const error = reviewTimeout();
      reject(error);
      controller.abort(error);
    }, timeoutMs);
  });
  try {
    return await Promise.race([Promise.resolve().then(() => {
      throwIfApiWorkCancelled(workSignal);
      return request(workSignal);
    }), boundary]);
  } finally {
    clearTimeout(timer);
    parent.removeEventListener('abort', stop);
  }
}
