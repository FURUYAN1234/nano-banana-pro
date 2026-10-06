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
