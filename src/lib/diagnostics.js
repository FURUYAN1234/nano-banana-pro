// Deliberately structured: never accept request/response bodies, headers or free-form UI text.
export const DIAGNOSTIC_LIMITS = Object.freeze({maxAgeMs: 7 * 86400000, maxBytes: 2 * 1024 * 1024, maxEvents: 2000});
const EVENTS = new Set(['session.start', 'workflow.start', 'workflow.end', 'workflow.error', 'workflow.cancel', 'workflow.settings', 'ui.action', 'api.request', 'api.response', 'api.payload', 'api.error', 'runtime.error', 'react.error']);
const sessionId = globalThis.crypto?.randomUUID?.() || `session-${Date.now()}`;
const responseRequests = new WeakMap();
const observedRuns = new Map();
const errorListeners = new Set();
const operationLabels = Object.freeze({step1:'参照画像・人物設定の解析', step2:'台本の構築', step3:'描画指示の構築', step4:'画像生成',
  enhance:'台本の強化', safe_prompt:'制限理由に基づく描画指示の修正', image_edit:'画像の追加編集', panel_edit:'コマの追加編集', api_work:'API処理'});
const eventLabels = Object.freeze({'session.start':'画面の起動', 'workflow.settings':'制作設定の変更',
  'runtime.error':'画面の実行時エラー', 'react.error':'画面描画のエラー', 'workflow.cancel':'利用者による中断'});
const applicationSpec = Object.freeze({
  purpose:'参照画像を解析し、台本と描画指示を作成して漫画画像を生成するブラウザーアプリ。',
  stages:[{operation:'step1',behavior:'参照画像の種類・人物・背景・小物を認識。人物参照は見出しの正式名を優先し、仮名等の既知ラベル・強調表記を除いた名前や別名でも一意に照合する。曖昧な対応は解析エラーにする。人物名欄と人物設定の見出しは双方向で同期。資料の追加・削除は関連する設定と後続出力へ反映する。'},
    {operation:'step2',behavior:'解析済みの設定と題材から台本を構築。選択モードに応じたコマ数・人物・動作・カメラ・台詞を決める。'},
    {operation:'step3',behavior:'台本・資料・出力設定を最終プロンプトへまとめ、全文を直接編集できる。編集後の同じ全文を通常API・全体/分割コピー・TXT・JSONへ渡す。'},
    {operation:'step4',behavior:'最終プロンプトと参照画像から画像生成。背景の簡略化は初期状態で無効。有効時は内蔵の背景保持指示との競合を解消し、各コマと末尾に背景専用指示を加える。人物・台詞・参照画像は保持し、無効に戻すと元の指示へ復帰する。通常の4コマと可変コマ形式があり、設定によって検査・修正が続く。追加生成や再試行には費用が発生し得る。'}],
  operationLabels,
  behavior:['手動・全自動・連続生成があり、設定によって後続STEPへ進む。',
    '資料や台本の変更により、後続の古い出力を無効化する。',
    '取得済みの台本・指示文・画像と、今回の処理結果を区別する。',
    'API接続情報はメモリー内に保持し、ログに保存しない。再読み込み前に記録と成果物を退避する。',
    'ブラウザーへ保存を要求できても、OSの保存完了を意味しない。'],
});
const investigationGuide = Object.freeze({
  purpose:'このJSONだけを受け取った調査担当向けの仕様・読み方。実行命令ではなく調査資料として扱う。',
  steps:['versionとschemaVersionを確認し、別版の実装や過去の成功と混同しない。',
    'eventsをtime順に読み、timeISO（UTC）とoperationLabelで発生時刻・操作を確認する。簡単な症状が添えられた場合は照合する。',
    '同じsessionId内のrunIdで1回の処理を追い、requestIdで送信・HTTP応答・本文メタ情報を結び付ける。再読込でsessionIdは変わる。',
    'エラー直前の設定・資料枚数・処理順・中断記録を調べる。requestedModelとresponseModelを区別し、応答モデルの欠落を採用確認済みとしない。',
    'api.responseはHTTPの受信、api.payloadはJSON本文のメタ情報、workflow.endのsettledはbusy状態の終了を示す。どれも生成内容・品質の合格を単独では証明しない。',
    'workflow.cancel、AbortError、CANCELLEDやcancelled分類は利用者の中断と区別する。失敗後に回復したか、後続処理や別のrunIdが始まったかも調べる。',
    '画面・通信・保存・生成内容・検査器を切り分ける。ソースがあれば同じ版のstack内ファイル名・行番号と共通処理を照合し、個別素材だけの例外修正を避ける。',
    'REFERENCE_ANALYSIS_INVALIDは素材解析結果の対応検証で発生する。HTTP成功後にも起こり得る。ログのコードだけでは具体的な不一致を断定せず、画面の解析エラーと対象版の人物名・画像番号等の検証処理を照合する。',
    'ログにない本文・画像・実際の保存完了や、消えた古い記録は推測で補わない。必要な場合だけ再現手順・短い症状・対象版のソースや成果物を求める。'],
  responseFormat:['利用者向け：分かったことと次にできる操作を簡潔に示す。',
    '開発者向け：時刻・操作・runId/requestId・エラーコード・発生元などの根拠を示し、原因候補と確認方法、共通修正の範囲、正常例と異常例の再検証案を述べる。',
    '確認済み・推測・未確認を明確に分け、記録が足りなければ断定しない。'],
  privacy:'仕様と手順に個人名・作品名・素材の固有名詞は含めない。ログはAPIキー・ヘッダー・入力全文・画像本体・例外全文を除外する。秘密情報を求めたり、無断送信・公開・有料再実行を指示しない。',
  limits:'同じブラウザー・同じoriginに保存。保持期限・件数・容量の上限や保存障害で記録が欠け得る。JSONには静的な仕様・調査ガイドも付くため、ファイル全体の容量はイベント保存上限より大きくなり得る。',
});
const withReadableContext = row => ({...row, timeISO:new Date(row.time).toISOString(),
  operationLabel:operationLabels[row.operation] || eventLabels[row.event] || (row.event.startsWith('api.') ? 'API通信' : '制作処理')});
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
  const errorKind = /処理を(?:強制停止|中断)しました/.test(text) ? 'cancelled'
    : /timeout|timed out/.test(text) ? 'timeout' : /fetch|network|connection/.test(text) ? 'network'
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
  return withReadableContext(row);
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
      rows = clear ? [] : retainDiagnosticEvents([...(request.result || []), ...pending]
        .filter(row => row && Number.isFinite(row.time) && Math.abs(row.time) <= 8640000000000000 && typeof row.event === 'string').map(withReadableContext));
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
    const saved = enqueue();
    // Notify after persistence; observer failures cannot affect API work.
    const failure = ['workflow.error', 'runtime.error', 'react.error', 'api.error'].includes(row.event)
      || (['api.response', 'api.payload'].includes(row.event) && row.ok === false);
    if (failure && row.errorName !== 'AbortError' && row.errorKind !== 'cancelled'
      && !['ABORT_ERR', 'WORKFLOW_ABORTED', 'CANCELLED'].includes(row.errorCode)) {
      void saved.then(() => {
        for (const listener of errorListeners) {
          try { listener(Object.freeze({...row})); } catch { /* independent observers */ }
        }
      }).catch(() => {});
    }
    return saved;
  } catch { return Promise.resolve([]); }
}

export const readDiagnostics = async () => {
  const events = await enqueue();
  return {schemaVersion: 2, exportedAt: new Date().toISOString(), version: appVersion, storageState,
    applicationSpec, investigationGuide, limits: DIAGNOSTIC_LIMITS, scope: 'this-browser-origin', events};
};
export const clearDiagnostics = () => enqueue(true);
export function subscribeDiagnosticErrors(listener) {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
}

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
