// Deliberately structured: never accept request/response bodies, headers or free-form UI text.
export const DIAGNOSTIC_LIMITS = Object.freeze({maxAgeMs: 7 * 86400000, maxBytes: 2 * 1024 * 1024, maxEvents: 2000});
const EVENTS = new Set(['session.start', 'workflow.start', 'workflow.end', 'workflow.error', 'workflow.cancel', 'workflow.settings', 'ui.action', 'api.request', 'api.response', 'api.payload', 'api.error', 'runtime.error', 'react.error']);
const sessionId = globalThis.crypto?.randomUUID?.() || `session-${Date.now()}`;
const responseRequests = new WeakMap();
const observedRuns = new Map();
let context = {}, settings = {}, appVersion = import.meta.hot?.data.version || 'unknown', queue = Promise.resolve(), memory = [], storageState = 'initializing', dbPromise;
if (import.meta.hot) import.meta.hot.dispose(data => { data.version = appVersion; });
const id = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const bytes = value => new TextEncoder().encode(JSON.stringify(value)).length;
const safeToken = value => typeof value === 'string' && /^[a-zA-Z0-9_.:-]{1,128}$/.test(value)
  && !/(?:sk-|AIza|Bearer|token|secret|authorization)/i.test(value) ? value : undefined;
const safeModel = value => typeof value === 'string' && /^(?:gpt-|gemini-|imagen-|dall-e-)[a-zA-Z0-9._-]{1,100}$/.test(value) ? safeToken(value) : undefined;
const stackFrames = value => String(value || '').split('\n').slice(1, 9).map(line => {
  // Keep only a JS filename/line/column. Exception text, function arguments and full paths are omitted.
  const frame = line.match(/(?:^|[/\\])([a-zA-Z0-9_.-]+\.(?:[cm]?js|jsx|tsx?))(?:\?[^\s)]*?)?(?::(\d+):(\d+))?(?=[\s)]|$)/);
  return frame ? `${frame[1]}${frame[2] ? `:${frame[2]}:${frame[3]}` : ''}` : null;
}).filter(Boolean).join('\n');

export function summarizeDiagnosticError(error) {
  const text = String(error?.message ?? error ?? '').toLowerCase();
  const errorKind = /timeout|timed out/.test(text) ? 'timeout' : /fetch|network|connection/.test(text) ? 'network'
    : /api.?key|unauthorized|authentication/.test(text) ? 'authentication'
      : /policy|safety|blocked/.test(text) ? 'policy' : /json|parse|syntax/.test(text) ? 'format'
        : /invalid|validation|contract/.test(text) ? 'validation' : 'unknown';
  return {errorName: safeToken(error?.name), errorCode: safeToken(error?.code), errorKind,
    status: Number.isFinite(Number(error?.status)) ? Number(error.status) : undefined,
    stack: stackFrames(error?.stack)};
}

export function makeDiagnosticEvent(event, details = {}, {now = Date.now(), sessionId: session = sessionId} = {}) {
  if (!EVENTS.has(event)) throw new TypeError('Unknown diagnostic event');
  const row = {id: id(), time: now, event, sessionId: safeToken(session) || sessionId, version: appVersion};
  for (const key of ['runId', 'requestId', 'providerRequestId', 'operation', 'errorName', 'errorCode', 'errorKind', 'outcome', 'inputMode', 'colorMode', 'endpoint']) {
    const value = safeToken(details[key]);
    if (value !== undefined) row[key] = value;
  }
  for (const key of ['requestedModel', 'responseModel', 'analysisModel', 'scenarioModel', 'promptModel']) {
    const value = safeModel(details[key]);
    if (value !== undefined) row[key] = value;
  }
  if (['openai', 'gemini'].includes(details.provider)) row.provider = details.provider;
  for (const key of ['step', 'imageCount', 'characterCount', 'scenarioLength', 'promptLength', 'status', 'elapsedMs', 'inputTokens', 'outputTokens', 'panelCount']) {
    if (typeof details[key] === 'number' && Number.isFinite(details[key]) && details[key] >= 0) row[key] = Math.round(details[key]);
  }
  for (const key of ['fullAuto', 'experimental', 'fallback', 'ok']) if (typeof details[key] === 'boolean') row[key] = details[key];
  // Only accept already reduced frame identifiers, never arbitrary stacks/messages.
  if (details.stack) row.stack = String(details.stack).split('\n').filter(line => safeToken(line) && /^[a-zA-Z0-9_.-]+\.(?:[cm]?js|jsx|tsx?)(?::\d+:\d+)?$/.test(line)).slice(0, 8).join('\n');
  return row;
}

export function retainDiagnosticEvents(rows, now = Date.now(), limits = {}) {
  const {maxAgeMs, maxEvents, maxBytes} = {...DIAGNOSTIC_LIMITS, ...limits};
  const unique = new Map(rows.filter(row => Number.isFinite(row.time) && row.time >= now - maxAgeMs && row.time <= now + 60000).map(row => [row.id, row]));
  const kept = [...unique.values()].sort((a, b) => a.time - b.time).slice(-maxEvents);
  let size = bytes(kept);
  while (kept.length && size > maxBytes) {
    const first = kept.shift();
    size -= bytes(first) + (kept.length ? 1 : 0);
  }
  return kept;
}

function openDatabase() {
  if (!globalThis.indexedDB) return Promise.reject(new Error('IndexedDB unavailable'));
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = globalThis.indexedDB.open('super-furu-diagnostics', 1);
    let expired = false;
    const timer = setTimeout(() => { expired = true; reject(new Error('Diagnostic database blocked')); }, 1500);
    request.onupgradeneeded = () => request.result.createObjectStore('logs');
    request.onerror = () => { clearTimeout(timer); reject(request.error); };
    request.onblocked = () => { clearTimeout(timer); expired = true; reject(new Error('Diagnostic database blocked')); };
    request.onsuccess = () => {
      clearTimeout(timer);
      if (expired) { request.result.close(); return; }
      const db = request.result;
      db.onversionchange = () => { db.close(); dbPromise = undefined; };
      resolve(db);
    };
  }).catch(error => { dbPromise = undefined; throw error; });
  return dbPromise;
}

// A single read/write transaction makes pruning and appends atomic across tabs.
async function persist(clear = false) {
  const db = await openDatabase();
  const pending = memory;
  return new Promise((resolve, reject) => {
    const tx = db.transaction('logs', 'readwrite');
    const store = tx.objectStore('logs');
    const request = store.get('events');
    let rows;
    request.onsuccess = () => {
      rows = clear ? [] : retainDiagnosticEvents([...(request.result || []), ...pending]);
      store.put(rows, 'events');
    };
    tx.oncomplete = () => { memory = []; storageState = 'persistent'; resolve(rows); };
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Diagnostic write aborted'));
  });
}

function enqueue(clear = false) {
  const result = queue.then(async () => {
    try { return await persist(clear); }
    catch { storageState = 'memory_only'; memory = clear ? [] : retainDiagnosticEvents(memory); return memory; }
  });
  queue = result.catch(() => {});
  return result;
}

export function recordDiagnostic(event, details = {}) {
  // All failure paths are isolated from the application/API operation being observed.
  try {
    const row = makeDiagnosticEvent(event, {...context, ...details});
    // Append inside the queue, so a preceding transaction cannot discard a newer event.
    queue = queue.then(() => { memory = retainDiagnosticEvents([...memory, row]); });
    return enqueue();
  } catch { return Promise.resolve([]); }
}

export const readDiagnostics = async () => {
  const events = await enqueue();
  return {schemaVersion: 1, exportedAt: new Date().toISOString(), version: appVersion, storageState,
    limits: DIAGNOSTIC_LIMITS, scope: 'this-browser-origin', events};
};
export const clearDiagnostics = () => enqueue(true);

export function beginDiagnosticRun(operation, metadata = {}) {
  context = {...settings, ...metadata, runId: id(), operation};
  observedRuns.set(operation, {...context});
  void recordDiagnostic('workflow.start');
  return {...context};
}
export const getDiagnosticContext = () => ({...context});
export function configureDiagnosticSettings(next) { settings = {...next}; }
export function beginDiagnosticAction(operation, metadata = {}) {
  // STEP1 can become busy before async file preparation reaches beginApiWork.
  // Reuse that observed run rather than splitting its request from its end.
  const observed = observedRuns.get(operation);
  context = {...observed, ...settings, ...metadata, runId: observed?.runId || id(), operation};
  if (observed) observedRuns.set(operation, {...context});
  void recordDiagnostic('ui.action');
}
export function observeDiagnosticRun(operation) {
  const matchesOperation = operation === 'step4'
    ? ['step4', 'image_edit', 'panel_edit'].includes(context.operation) : context.operation === operation;
  if (!context.runId || !matchesOperation) return beginDiagnosticRun(operation);
  const run = {...context};
  observedRuns.set(run.operation, run);
  void recordDiagnostic('workflow.start', run);
  return run;
}
export function endDiagnosticRun(run, outcome, error) {
  const observed = observedRuns.get(run.operation);
  const snapshot = observed?.runId === run.runId ? {...run, ...observed} : run;
  void recordDiagnostic(error ? 'workflow.error' : 'workflow.end', {...snapshot, outcome,
    ...(error ? summarizeDiagnosticError(error) : {})});
  if (observed?.runId === run.runId) observedRuns.delete(run.operation);
  if (context.runId === run.runId) context = {};
}

export const getDiagnosticRequest = response => responseRequests.get(response) || {};
function requestMetadata(url, options) {
  try {
    const parsed = new URL(String(url));
    const provider = parsed.hostname === 'api.openai.com' ? 'openai'
      : parsed.hostname === 'generativelanguage.googleapis.com' ? 'gemini' : undefined;
    if (!provider) return null;
    const requestedModel = provider === 'gemini' && parsed.pathname.includes('/models/')
      ? safeModel(parsed.pathname.match(/\/models\/([^/:]+)/)?.[1])
      // All OpenAI request builders put model first. Never parse or retain the content payload.
      : safeModel(typeof options?.body === 'string' ? options.body.slice(0, 180).match(/^\s*\{\s*"model"\s*:\s*"([^"\\]+)"/)?.[1] : undefined);
    const endpoint = provider === 'openai' ? parsed.pathname.split('/').filter(Boolean).join('.')
      : parsed.pathname.endsWith('/interactions') ? 'interactions' : parsed.pathname.includes(':generateContent') ? 'generateContent' : 'models';
    return {provider, endpoint, requestedModel};
  } catch { return null; }
}

export function createDiagnosticFetch(fetcher, sink = recordDiagnostic, getContext = () => context) {
  const emit = (event, data) => { try { Promise.resolve(sink(event, data)).catch(() => {}); } catch { /* observation cannot break a request */ } };
  return async (url, options) => {
    const metadata = requestMetadata(url, options);
    if (!metadata) return fetcher(url, options);
    const request = {...getContext(), ...metadata, requestId: id()};
    const startedAt = Date.now();
    emit('api.request', request);
    try {
      const response = await fetcher(url, options);
      responseRequests.set(response, request);
      emit('api.response', {...request, status: response.status, ok: response.ok,
        elapsedMs: Date.now() - startedAt, providerRequestId: safeToken(response.headers?.get?.('x-request-id'))});
      return response;
    } catch (error) {
      emit('api.error', {...request, ...summarizeDiagnosticError(error), elapsedMs: Date.now() - startedAt});
      throw error;
    }
  };
}
export const diagnosticFetch = createDiagnosticFetch((...args) => globalThis.fetch(...args));

// Only callers that import this facade are observed. No global console interception.
export const diagnosticConsole = Object.fromEntries(['log', 'warn', 'error'].map(level => [level, (...args) => {
  if (level === 'error') void recordDiagnostic('workflow.error', summarizeDiagnosticError(args.find(value => value instanceof Error) || args[0]));
  globalThis.console[level](...args);
}]));

export function installDiagnostics({version, target = globalThis.window} = {}) {
  appVersion = safeToken(version) || 'unknown';
  void recordDiagnostic('session.start');
  const onError = event => { void recordDiagnostic('runtime.error', summarizeDiagnosticError(event.error)); };
  const onRejection = event => { void recordDiagnostic('runtime.error', summarizeDiagnosticError(event.reason)); };
  target?.addEventListener('error', onError);
  target?.addEventListener('unhandledrejection', onRejection);
  // Prune while the app is open, even if the user is not making requests.
  const timer = target?.setInterval(() => { void enqueue(); }, 3600000);
  return () => {
    target?.removeEventListener('error', onError);
    target?.removeEventListener('unhandledrejection', onRejection);
    if (timer !== undefined) target.clearInterval(timer);
  };
}
