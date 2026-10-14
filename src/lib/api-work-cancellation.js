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

// User stop covers the whole inspection, including bodies and follow-up calls.
// Each provider request owns its timeout; elapsed review time never shortens it.
export async function withImageReviewCancellation(request, signal) {
  const parent = getApiWorkSignal(signal);
  throwIfApiWorkCancelled(parent);
  let stop;
  const boundary = new Promise((_, reject) => {
    stop = () => reject(createApiError('処理を強制停止しました。', {code:'CANCELLED'}));
    parent.addEventListener('abort', stop, {once:true});
  });
  try {
    return await Promise.race([Promise.resolve().then(() => {
      throwIfApiWorkCancelled(parent);
      return request(parent);
    }), boundary]);
  } finally { parent.removeEventListener('abort', stop); }
}
