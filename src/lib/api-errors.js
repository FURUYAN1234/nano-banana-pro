// Keep provider evidence separate from the user-facing diagnosis. Never infer
// congestion from an unknown exception, and never expose credentials in logs.
export const sanitizeErrorMessage = value => String(value ?? '')
  .replace(/\b(?:sk-[\w*-]+|AIza[\w*-]+)/g, '[REDACTED]')
  .replace(/\bBearer\s+[^\s,;"']+/gi, 'Bearer [REDACTED]')
  .replace(/((?:api[_-]?key|x-goog-api-key|access_token|authorization)["']?\s*[:=]\s*["']?)[^\s,;"'&]+/gi, '$1[REDACTED]')
  .slice(0, 600);

export const createApiError = (message, details = {}) => Object.assign(
  new Error(sanitizeErrorMessage(message)),
  Object.fromEntries(['provider', 'model', 'status', 'code', 'name'].filter(key => details[key] != null)
    .map(key => [key, key === 'status' ? Number(details[key]) : sanitizeErrorMessage(details[key])]))
);

export const readApiJson = async (response, details) => {
  let data;
  try {
    data = await response.json();
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw createApiError(response.ok ? 'API応答をJSONとして読み取れませんでした。' : response.statusText || `HTTP ${response.status}`, {
      ...details, status:response.status, code:response.ok ? 'INVALID_RESPONSE' : 'HTTP_ERROR'
    });
  }
  if (!response.ok || data?.error) {
    throw createApiError(data?.error?.message || response.statusText || `HTTP ${response.status}`, {
      ...details, status:response.status, code:data?.error?.status || data?.error?.code || 'HTTP_ERROR'
    });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw createApiError('API応答がJSONオブジェクトではありません。', {...details, status:response.status, code:'INVALID_RESPONSE'});
  }
  return data;
};

export const getApiErrorInfo = error => {
  const message = sanitizeErrorMessage(error?.message ?? error);
  const text = `${error?.code || ''} ${message}`.toLowerCase();
  const status = Number(error?.status) || Number(message.match(/(?:\bHTTP\s+|\bCode:\s*|^)([45]\d\d)\b/i)?.[1]);
  const info = (kind, label, advice) => ({kind, label, advice});
  if (error?.code === 'BALLOON_LAYOUT_INVALID') return info('balloon_layout', '吹き出し配置と抽出台詞の不一致', '詳細のコマと配置・抽出台詞を照合してください。引用の抽出違いも含めて確認が必要です。通信障害ではありません。');
  if (error?.name === 'AbortError' || error?.code === 'CANCELLED') return info('cancelled', '処理を中断しました', '必要なら現在の入力で再実行してください。');
  if (status === 504) return info('timeout', 'APIサーバーの応答待ち時間切れ', 'API側がHTTP 504を返しました。時間を置いて再試行してください。');
  if (status >= 500) return info('server', 'APIサーバー側のエラー', '時間を置いて再試行してください。繰り返す場合はプロバイダーの稼働状況を確認してください。');
  if (/insufficient_quota|billing|credit balance|payment required/.test(text) || status === 402) return info('quota', '利用枠・残高不足', 'APIの残高・課金設定・利用枠を確認してください。待機だけでは解消しない場合があります。');
  if (status === 401 || /invalid_api_key|api_key_invalid|api key (?:not valid|is invalid)|invalid api key|incorrect api key/.test(text)) return info('auth', 'API認証エラー', '接続設定で使用中のプロバイダーのAPIキーを確認してください。');
  if (/key.*(?:not set|設定されていません)|apiキー.*設定されていません/.test(text)) return info('auth', 'API未接続', '接続設定で使用するプロバイダーのAPIキーを入力してください。');
  if (/content_policy|blocked by safety|safety filter|responsible ai|prohibited_content/.test(text)) return info('policy', '安全基準による拒否', '拒否理由を確認し、入力内容を見直してください。');
  if (status === 403 || /permission_denied|permission denied/.test(text)) return info('permission', 'APIアクセス権限エラー', 'キーの権限・モデルの利用権限を確認してください。');
  if (status === 404 || /model_not_found|model.*(?:not found|not supported)/.test(text)) return info('model', 'モデルが利用できません', 'モデル名と利用権限を確認してください。');
  if (status === 429 || /resource_exhausted|rate.?limit|quota exceeded/.test(text)) return info('rate', 'APIレート制限・使用量制限', 'APIの制限内容を確認してください。短時間の制限なら時間を置き、日次上限などは解除時刻を確認してください。');
  if (/timeout|timed out|deadline_exceeded/.test(text) || status === 408) return info('timeout', '応答待ちの時間切れ', '応答が制限時間内に完了しませんでした。混雑か接続問題かは、この情報だけでは確定できません。');
  if (/failed to fetch|fetch failed|networkerror|network error|network request failed|load failed|econnreset|enotfound/.test(text)) return info('network', 'ネットワーク接続エラー', 'ネットワーク接続・ブラウザーの通信制限を確認してください。HTTP応答を受け取れていません。');
  if (error?.code === 'OUTPUT_TOKEN_LIMIT') return info('output_limit', 'AIの出力トークン上限に到達', '推論と本文の生成が上限で途中終了しました。未完成の結果は採用せず停止しました。入力を整理するか、別のモデルで再実行してください。待機では解消しません。');
  if (error?.code === 'INCOMPLETE_RESPONSE') return info('response', 'AI応答が未完了', '応答の終了状態を確認してください。途中の本文は採用していません。');
  if (error?.code === 'EMPTY_RESPONSE') return info('empty', 'AIから空の応答', '応答本文がありませんでした。再試行しても続く場合は入力とモデルを確認してください。');
  if (error?.code === 'NO_IMAGE_OUTPUT') return info('empty_image', 'AIの応答に画像がありません', '画像データを受け取れませんでした。詳細の終了状態と応答を確認してください。この情報だけではパラメーター不正・安全基準による拒否・一時的な障害のいずれかは確定できません。');
  if (error?.code === 'INVALID_RESPONSE' || error?.name === 'SyntaxError') return info('response', 'AI応答形式のエラー', '応答を読み取れませんでした。再試行しても続く場合は詳細を確認してください。');
  if (status >= 400) return info('request', 'APIリクエストが拒否されました', '詳細にある入力・パラメーターの問題を確認してください。待機だけでは解消しない場合があります。');
  if (['TypeError', 'ReferenceError', 'RangeError'].includes(error?.name)) return info('internal', 'アプリ内部エラー', '待機では解消できない可能性があります。表示された詳細と直前の操作を報告してください。');
  if (/dialogue_syntax|serious_prompt_mode_mismatch|プロンプト.*(?:上限|不正|文字列)|台詞|吹き出し|シナリオ.*(?:不正|一致|不完全)|incomplete 4-koma|unknown prompt provider/.test(text)) return info('input', '入力・指示文の検証エラー', '詳細にある入力箇所を修正してからSTEP3を再実行してください。通信障害ではありません。');
  return info('unknown', '原因未分類のエラー', '詳細を確認してください。サーバー混雑とは判定できません。');
};

export const formatApiErrorDetails = error => {
  const tags = [Number.isInteger(error?.panelNumber) && `${error.panelNumber}コマ目`, error?.provider, error?.model, error?.status && `HTTP ${error.status}`, error?.code].filter(Boolean);
  return sanitizeErrorMessage(`${tags.length ? `[${tags.join(' / ')}] ` : ''}${error?.message ?? error ?? '詳細なし'}`);
};

export const shouldStopApiFallback = error => ['auth', 'quota', 'cancelled', 'policy', 'output_limit'].includes(getApiErrorInfo(error).kind);

export const aggregateApiErrors = (provider, failures) => {
  const error = createApiError(`${provider}: 全モデル接続失敗。各試行の理由を確認してください。`, {provider, code:'API_MODELS_FAILED'});
  error.failures = failures;
  return error;
};

export const formatApiErrorGuide = error => {
  if (error?.failures?.length) {
    return `[ERROR GUIDE] ${error.message}\n${error.failures.map(failure => formatApiErrorGuide(failure)).join('\n')}`;
  }
  const {label, advice} = getApiErrorInfo(error);
  return `[ERROR GUIDE] ${label}\n[対処法] ${advice}\n[詳細] ${formatApiErrorDetails(error)}`;
};
