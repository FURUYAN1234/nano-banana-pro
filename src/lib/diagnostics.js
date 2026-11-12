import { sanitizeFailureContext } from './diagnostic-failure-context.js';
// Metadata stays structured. Explicit invocation inputs and repair evidence are saved only on failure.
export const DIAGNOSTIC_LIMITS = Object.freeze({maxAgeMs: 7 * 86400000, maxBytes: 2 * 1024 * 1024, maxEvents: 2000});
const EVENTS = new Set(['session.start', 'workflow.start', 'workflow.end', 'workflow.error', 'workflow.warning', 'workflow.review', 'workflow.cancel', 'workflow.settings', 'ui.action', 'api.request', 'api.response', 'api.payload', 'api.error', 'runtime.error', 'react.error', 'image.lettering', 'image.review']);
const sessionId = globalThis.crypto?.randomUUID?.() || `session-${Date.now()}`;
const responseRequests = new WeakMap();
const observedRuns = new Map();
const errorListeners = new Set();
const operationLabels = Object.freeze({step1:'参照画像・人物設定の解析', step2:'台本の構築', step3:'描画指示の構築', step4:'画像生成',
  enhance:'台本の強化', safe_prompt:'制限理由に基づく描画指示の修正', image_edit:'画像の追加編集', panel_edit:'コマの追加編集', api_work:'API処理'});
const eventLabels = Object.freeze({'session.start':'画面の起動', 'workflow.settings':'制作設定の変更',
  'runtime.error':'画面の実行時エラー', 'react.error':'画面描画のエラー', 'workflow.cancel':'利用者による中断',
  'workflow.warning':'処理を継続する検査指摘', 'workflow.review':'台本の品質検査結果', 'image.review':'画像の品質検査と修正結果'});
const applicationSpec = Object.freeze({
  purpose:'参照画像を解析し、台本と描画指示を作成して漫画画像を生成するブラウザーアプリ。',
  automation:'全自動ONは停止工程と保持された成果物から再開する。手動で完成した台本はSTEP3、描画指示はSTEP4へ引き継ぐ。停止したAPI通信は継続せずその工程を再実行する。STEP2再開は題材・入力方式・構成選択を保持。STEP1は保持中の入力ファイルを再解析する。新規作品と連続ループの次周回はニュースSTEP2から開始。途中の素材・台本変更は古い再開位置を無効化する。',
  stages:[{operation:'step1',behavior:'参照画像の種類・人物・背景・小物を認識。人物参照は見出しの正式名を優先し、仮名等の既知ラベル・強調表記を除いた名前や別名でも一意に照合する。曖昧な対応は解析エラーにする。人物名欄と人物設定の見出しは双方向で同期。資料の追加・削除は関連する設定と後続出力へ反映する。'},
    {operation:'step2',behavior:'解析済みの設定と題材から台本を構築。選択モードに応じたコマ数・人物・動作・カメラ・台詞を決める。ドキュメンタリーの原文検査は明確な制作・演出指示を本文から分ける。数値・引用・報道・曖昧な叙述と取得済み記事本文は検査対象として保持し、演出指示は生成への指定として渡す。'},
    {operation:'step3',behavior:'台本・資料・出力設定を最終プロンプトへまとめ、全文を直接編集できる。フキダシは縦書きの列割りを優先し、読めない・重要な絵を隠す場合や明示指定時だけ個別に横書きを許す。人物や絵柄を簡素化して文字を収めない。編集後の同じ全文を通常API・全体/分割コピー・TXT・JSONへ渡す。'},
    {operation:'step4',behavior:'最終プロンプトと参照画像から画像生成。背景の簡略化は初期状態で無効。有効時は内蔵の背景保持指示との競合を解消し、各コマと末尾に背景専用指示を加える。人物・台詞・参照画像は保持し、無効に戻すと元の指示へ復帰する。通常の4コマと可変コマ形式があり、設定によって検査・修正が続く。追加生成や再試行には費用が発生し得る。'}],
  operationLabels,
  pageCompositionSelection:'4〜8コマのSTEP2は物語に最も効果的な山場を先に選び、異なるページ構成を比較する。直近6作品のセッション履歴から構図だけを参照し、同程度に内容へ適した候補間で反復の優先度を下げる。明示配置を優先し、類似だけで再生成しない。再読み込み・全設定リセットで比較履歴は消去。横長4段のレガシーは対象外。',
  actionAndLayout:'シリアスとギャグの両方でアクションを選択可能。話に沿った全身の重心移動・ひねり・踏み込み・反動を見せ場へ具体化し、途中の動作と結末をつなぐ。因果の接続・身体演技・選択したアクションの結末を別々に検査する。一般ニュースも報道事実を保ち、架空キャストの行動で動勢を描く。無関係な戦闘や事故は加えず、明示された静止や構図を守る。通常の結末でも場面に合う大胆な動きを任意に織り交ぜ、固定回数を要求しない。4〜8コマの縦2段指定は一枠として描くよう指示し、意図した手足や頭のはみ出しを許容する。',
  behavior:['シナリオ強化: 選択カテゴリの候補を作成し、編集範囲を検査後、同じ選択モデルの別API呼出しで元台本と比較する。引用を照合し、単なる表記変更・意味のない言い換えを改善と扱わない。候補は最大2回。人物・画風・話の退行や比較失敗は不採用。全項目の改善、一部の改善、元台本保持を区別して表示する。',
    '4〜8コマの通常台本はPageCompositionで自由な矩形配置とページ大の主役を設計する。foregroundsは複数の小コマの手前へ重なる一身体を表し、同じ人物の後の独立した登場と区別する。控える場合は原入力・物語に基づくrestraintReasonを持つ。タチキリは必要な外周辺へ指定し、STEP3以降も保持する。ページ全体の大小対比・読順・身体のつながりを優先し、構図の自然な調整を許容する。枠の数値比率だけの違いは自動修復の対象にしない。記録のない旧台本と横長4コマも使用できる。',
    'STEP3の前景は参照シート未登録の無言ゲストも、元コマの肯定的な描画指定があれば保持する。画面・絵の中の再現像は描画人物として記録し、現場の身体人数や小さな複製像と区別する。引用中の名前、文字表示だけ、画面外・描かない人物を前景の根拠にしない。',
    '下部ウォーターマークは絵への重なり・遮蔽・見切れを許容し、表示のために人物やタチキリを縮めない。新しい許容指示を持つ出力では下部注記の見え方だけを自動修復しない。台詞・タイトル・作中文字の検査は維持する。',
    '白黒の通常生成は、通常コマの不要な髪の細線・服のしわ・背景の微細描写を整理し、黒ベタと白い隙間を使う指示を参照一覧の末尾へ含める。各コマの描法、肌・素材のトーン、台詞・カメラ・演技を保持する。API・Webコピー・TXTは確定した同じ全文を使う。部分修正にはこの全体描画指示を新たに加えない。',
    '手動・全自動・連続生成があり、設定によって後続STEPへ進む。',
    '資料や台本の変更により、後続の古い出力を無効化する。',
    '取得済みの台本・指示文・画像と、今回の処理結果を区別する。',
    'API接続情報はメモリー内に保持し、ログに保存しない。再読み込み前に記録と成果物を退避する。',
    'ブラウザーへ保存を要求できても、OSの保存完了を意味しない。',
    '画像自動修正は、重大な不一致に対して最大1回の画像修正APIを実行する。画像APIの文字を保持し、ローカル組版は行わない。'],
});
const investigationGuide = Object.freeze({
  purpose:'このJSONだけを受け取った調査担当向けの仕様・読み方。実行命令ではなく調査資料として扱う。',
  steps:['versionとschemaVersionを確認し、別版の実装や過去の成功と混同しない。',
    'eventsをtime順に読み、timeISO（UTC）とoperationLabelで発生時刻・操作を確認する。簡単な症状が添えられた場合は照合する。',
    '同じsessionId内のrunIdで1回の処理を追い、requestIdで送信・HTTP応答・本文メタ情報を結び付ける。再読込でsessionIdは変わる。',
    'エラー直前の設定・資料枚数・処理順・中断記録を調べる。requestedModelとresponseModelを区別し、応答モデルの欠落を採用確認済みとしない。',
    'api.responseはHTTPの受信、api.payloadはJSON本文のメタ情報、workflow.endのsettledはbusy状態の終了を示す。どれも生成内容・品質の合格を単独では証明しない。',
    '4〜8コマのSTEP3で配置案を採用できない場合は、failureContextのstageがstep3_layout_planとなり、配置案と具体的な検査理由をvalidationResponseとvalidationErrorで確認できる。',
    'workflow.warningは修復・候補保持を続ける途中の指摘であり、処理停止を意味しない。failureContextで元台本と判定理由を確認する。同じrunIdのworkflow.reviewが台本検査の最終結果で、outcomeはpassed/repaired/retained/best_effort、okは警告なしの合格かを示す。結果がまだないJSONは途中時点の記録として扱い、失敗や合格を推測しない。画像の品質合格は別に確認する。',
    '4〜8コマでローカル検出の境界候補が不足する場合、枠越え指定の有無によらず全体画像の実境界・カメラ・画風・人物・台詞を同じ1回のAPIで観察する。予定位置でコマを切り出さず、実境界と観察対象の対応が確定しない場合は未確認を保持し、自動修正しない。俯瞰とアオリは指定方向との一致も照合する。',
    '構図の偏りはSTEP2のPageComposition、STEP3の最終プロンプト、生成画像の順に切り分ける。配置の類似だけを描画欠陥や修復理由にせず、物語の効果と読順・見せ場の大きさを優先する。',
    'PageCompositionは期待値であり成功証拠ではない。実画像の大コマ・指定した身体部位の連続性・共有辺・タチキリの外周到達を照合する。別の手足や髪先だけで指定範囲の達成としない。画面外の集団や越境受入空間の人物名を独立した身体へ誤変換していないかも調べる。下部注記の許容された隠れと、物語の文字欠落を区別する。',
    '越境人物はページ全体の一つの前景として先に配置し、受入コマのCamera・媒体で別身体を描き直さない。検査の一部欠落は未確認を維持する。実境界の記録と独立した指定構図の失敗根拠が揃う場合だけ、その構図の修正を最大1回の修復へ渡す。根拠不足や境界不明から修復を推定しない。',
    'enhanceの同じrunIdに候補作成と比較の複数APIが含まれる。強化ログの引用・採用結果を確認し、HTTP成功や文字差分だけで改善と判断しない。縦書き優先は横書きの全面禁止ではなく、文字方向だけを理由に画像修正を起動しない。',
    'workflow.cancel、AbortError、CANCELLEDやcancelled分類は利用者の中断と区別する。失敗後に回復したか、後続処理や別のrunIdが始まったかも調べる。',
    '画面・通信・保存・生成内容・検査器を切り分ける。ソースがあれば同じ版のstack内ファイル名・行番号と共通処理を照合し、個別素材だけの例外修正を避ける。',
    'image.reviewは画像検査と修正の最終採否。passedだけが検査合格で、repaired_unverifiedは修正出力を受信したが再検査していない状態。repair_failedは修正失敗。送信前の上限超過にもerrorCode・promptLength・promptMaxCharsとfailureContextの台本・指摘・観察を保存する。image.letteringとsettings.local_letteringは、撤回済みの旧候補の文字上書き記録であり、現在の通常処理は画像APIの文字を保持する。',
    '白黒の線の密度を調べる場合は、通常生成と部分修正を区別し、通常コマの線整理と劇画等の意図的なカケアミを混同しない。肌・素材トーンや台詞・カメラの維持は実画像で別に確認する。',
    '失敗イベントのfailureContextには、その実行開始時の台本・人物設定・入力・描画指示を記録する。吹き出し修復失敗には修復応答・各コマの抽出台詞・具体的な不一致も付く。STEP3の文字数超過には、step3_image_prompt_budgetとして組立後の候補全文も残す。STEP2の品質検査不合格には、step2_scenario_validationとして実際に不合格になった生成候補とvalidationErrorの判定理由を残す。実行開始時に表示されていた前の台本とは区別する。originalLengthsとtruncatedFieldsで省略を確認し、再読み込み後の別台本と混同しない。一般API本文・任意の例外全文は保存しない。4〜8コマも台詞なしの品質警告は原文を保持して継続し、配置だけの修復後にも同じ条件を使う。壊れた台詞はDIALOGUE_SYNTAX、コマ構造の不備はPANEL_STRUCTURE_CONTRACTで停止する。旧版で保存されなかった本文は復元できない。',
    'IMAGE_PROMPT_BUDGETは描画指示が文字数上限を超えたときの検証エラー。promptLengthとpromptMaxCharsを照合する。参照説明分を予約した本文上限は32,000文字より小さくなる。',
    'REFERENCE_ANALYSIS_INVALIDは素材解析結果の対応検証で発生する。HTTP成功後にも起こり得る。ログのコードだけでは具体的な不一致を断定せず、画面の解析エラーと対象版の人物名・画像番号等の検証処理を照合する。',
    'DOCUMENTARY_SOURCE_FIDELITYは事実本文の数値・重要語句・語句網羅の検査で発生する。自由入力の制作指示を本文と誤認していないか、実入力と画面の失敗理由を対象版の本文選択処理へ照合する。コードだけで生成物の事実欠落と断定しない。',
    'ログにない本文・画像・実際の保存完了や、消えた古い記録は推測で補わない。必要な場合だけ再現手順・短い症状・対象版のソースや成果物を求める。'],
  responseFormat:['利用者向け：分かったことと次にできる操作を簡潔に示す。',
    '開発者向け：時刻・操作・runId/requestId・エラーコード・発生元などの根拠を示し、原因候補と確認方法、共通修正の範囲、正常例と異常例の再検証案を述べる。',
    '確認済み・推測・未確認を明確に分け、記録が足りなければ断定しない。'],
  privacy:'静的な仕様と手順に個人名・作品名・素材の固有名詞は含めない。失敗イベントのfailureContextには作品の文章や人物設定が含まれる。APIキー・ヘッダー・画像本体は保存せず、既知の認証文字列も伏せる。ログを共有すると記録された文章も相手へ渡る。秘密情報を求めたり、無断送信・公開・有料再実行を指示しない。',
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
      : (['IMAGE_PROMPT_BUDGET','EXPERIMENTAL_PLAN_INVALID'].includes(error?.code) || /_CONTRACT$/.test(error?.code || '')) || /invalid|validation|contract/.test(text) ? 'validation' : 'unknown';
  return {errorName: safeToken(error?.name), errorCode: safeToken(error?.code), errorKind,
    status: Number.isFinite(Number(error?.status)) ? Number(error.status) : undefined,
    ...(error?.code === 'IMAGE_PROMPT_BUDGET' ? {promptLength:error.promptLength, promptMaxChars:error.promptMaxChars} : {}),
    ...(error?.diagnosticContext ? {failureContext:sanitizeFailureContext(error.diagnosticContext)} : {}),
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
  for (const key of ['step', 'imageCount', 'characterCount', 'scenarioLength', 'promptLength', 'promptMaxChars', 'status', 'elapsedMs', 'inputTokens', 'outputTokens', 'panelCount']) {
    if (typeof details[key] === 'number' && Number.isFinite(details[key]) && details[key] >= 0) row[key] = Math.round(details[key]);
  }
  for (const key of ['fullAuto', 'experimental', 'fallback', 'ok']) if (typeof details[key] === 'boolean') row[key] = details[key];
  if(event==='image.lettering') {
    for(const key of ['applied','outsideBalloonInteriorsUnchanged'])if(typeof details[key]==='boolean')row[key]=details[key];
    if(['disabled','authored_typography','unresolved_dialogue','canvas_unavailable','invalid_pixels','unresolved_frames','matched_closed_balloons','unresolved_balloons','outside_pixels_changed','no_pixel_change'].includes(details.reason))row.reason=details.reason;
    else if(String(details.reason||'').startsWith('lettering_unavailable:'))row.reason='lettering_unavailable';
    if(Number.isInteger(details.version)&&details.version>=0)row.letteringVersion=details.version;
    if(Number.isInteger(details.balloonCount)&&details.balloonCount>=0)row.balloonCount=details.balloonCount;
    row.skippedPanels=Array.isArray(details.skippedPanels)?[...new Set(details.skippedPanels.filter(n=>Number.isInteger(n)&&n>=1&&n<=8))]:[];
  }
  if (['workflow.error','workflow.warning','runtime.error','react.error','api.error'].includes(event)
    || (['api.response','api.payload'].includes(event) && details.ok === false)
    || (event === 'image.review' && details.ok === false && details.outcome !== 'skipped')) {
    const snapshot=sanitizeFailureContext(details.failureContext);
    if (snapshot) row.failureContext=snapshot;
  }
  // Only accept already reduced frame identifiers, never arbitrary stacks/messages.
  if (details.stack) row.stack = String(details.stack).split('\n').filter(line => safeToken(line) && /^[a-zA-Z0-9_.-]+\.(?:[cm]?js|jsx|tsx?)(?::\d+:\d+)?$/.test(line)).slice(0, 8).join('\n');
  return withReadableContext(row);
}

// Image repair can fail before an HTTP request exists. Keep its bounded review
// and invocation inputs in the JSON, without serializing candidate pixels or
// treating an edited-but-unreviewed image as a passing inspection.
export function recordImageQualityReview(result, {observations = [], ...invocation} = {}) {
  const original=result?.originalReview||{}, final=result?.finalReview||{};
  const ok=final.pass===true&&!final.notRechecked;
  const outcome=original.skipped?'skipped':ok?'passed':final.notRechecked?'repaired_unverified':result?.stopReason||'unverified';
  const error=result?.repairError;
  return recordDiagnostic('image.review', {outcome,ok,
    ...(error?summarizeDiagnosticError(error):{}),
    ...(!ok&&outcome!=='skipped'?{failureContext:{...invocation,stage:'image_quality',
      validationError:error?String(error.message||error):'',
      validationResponse:JSON.stringify({outcome,originalPass:original.pass===true,
        originalIssues:original.issues||[],finalIssues:final.issues||[],notRechecked:final.notRechecked===true,observations})}}:{}),
  });
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
async function persist(clear = false, readOnly = false) {
  const db = await openDatabase();
  const pending = memory;
  return new Promise((resolve, reject) => {
    const onlyRead = readOnly && !clear && !pending.length;
    const tx = db.transaction('logs', onlyRead ? 'readonly' : 'readwrite');
    const store = tx.objectStore('logs');
    const request = store.get('events');
    let rows;
    request.onsuccess = () => {
      rows = clear ? [] : retainDiagnosticEvents([...(request.result || []), ...pending]
        .filter(row => row && Number.isFinite(row.time) && Math.abs(row.time) <= 8640000000000000 && typeof row.event === 'string').map(withReadableContext));
      if (!onlyRead) store.put(rows, 'events');
    };
    tx.oncomplete = () => { memory = []; storageState = 'persistent'; resolve(rows); };
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Diagnostic write aborted'));
  });
}

function enqueue(clear = false, readOnly = false) {
  const result = queue.then(async () => {
    try { return await persist(clear, readOnly); }
    catch { storageState = 'memory_only'; memory = clear ? [] : retainDiagnosticEvents(memory); return memory; }
  });
  queue = result.catch(() => {});
  return result;
}

export function recordDiagnostic(event, details = {}) {
  // All failure paths are isolated from the application/API operation being observed.
  try {
    const base = details.runId && details.runId !== context.runId ? {} : context;
    const failureContext = base.failureContext || details.failureContext ? {
      ...base.failureContext, ...details.failureContext,
      originalLengths:{...base.failureContext?.originalLengths,...details.failureContext?.originalLengths},
      truncatedFields:[...(base.failureContext?.truncatedFields || []),...(details.failureContext?.truncatedFields || [])],
    } : undefined;
    const row = makeDiagnosticEvent(event, {...base, ...details, failureContext});
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
  const events = await enqueue(false, true);
  return {schemaVersion: 2, exportedAt: new Date().toISOString(), version: appVersion, storageState,
    applicationSpec, investigationGuide, limits: DIAGNOSTIC_LIMITS, scope: 'this-browser-origin', events};
};
export const clearDiagnostics = () => enqueue(true);
export function subscribeDiagnosticErrors(listener) {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
}

export function beginDiagnosticRun(operation, metadata = {}) {
  context = {...settings, ...metadata, failureContext:sanitizeFailureContext(metadata.failureContext), runId: id(), operation};
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
  context = {...observed, ...settings, ...metadata,
    failureContext:sanitizeFailureContext(metadata.failureContext ?? observed?.failureContext),
    runId: observed?.runId || id(), operation};
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
      : safeModel(typeof options?.body === 'string' ? options.body.slice(0, 180).match(/^\s*\{\s*"model"\s*:\s*"([^"\\]+)"/)?.[1]
        : typeof FormData !== 'undefined' && options?.body instanceof FormData ? options.body.get('model') : undefined);
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
