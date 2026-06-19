/**
 * AIモデルフォールバックチェーンの構成情報と更新履歴
 * 
 * ※ 更新履歴への追加は、ユーザーが明示的に指示した場合のみ行う。
 *   通常のバグフィックスではモデル構成は変わらないため、更新履歴は追加しない。
 *   モデルの順番変更・統廃合・新規追加が「確定」した時点でのみ追記する。
 */

// 現在のフォールバックチェーン構成（各STEPごとに分離して定義）
// ※ 実際のフォールバックロジックは各ファイル (gemini.js, openai-text.js, imagen.js, openai.js) にある。
//    ここは「表示用のスナップショット」であり、実行時の動作には影響しない。
export const FALLBACK_CHAINS = [
  {
    id: 'step1-gemini',
    step: 'STEP 1',
    label: 'キャラクター解析（画像認識）',
    description: 'キャラクターシート画像をAIが読み取り、髪色・髪型・メガネの有無・性格などをテキストデータとして抽出する。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'Gemini',
    sourceFile: 'src/lib/gemini.js',
    models: [
      { id: 'gemini-3.5-flash', role: 'Primary', note: 'Next-Gen 最高品質' },
      { id: 'gemini-2.5-flash', role: 'Backup', note: '安定・高速' },
      { id: 'gemini-2.5-pro', role: 'Backup', note: '高品質' },
      { id: 'gemini-flash-latest', role: 'Fallback', note: '最新安定版' },
      { id: 'gemini-pro-latest', role: 'Fallback', note: '最新Pro版' },
    ]
  },
  {
    id: 'step1-openai',
    step: 'STEP 1',
    label: 'キャラクター解析（画像認識）',
    description: 'キャラクターシート画像をAIが読み取り、髪色・髪型・メガネの有無・性格などをテキストデータとして抽出する。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'OpenAI',
    sourceFile: 'src/lib/openai-text.js',
    models: [
      { id: 'gpt-4.1', role: 'Primary', note: '高品質・1Mコンテキスト' },
      { id: 'gpt-4o', role: 'Backup', note: 'Vision安定実績' },
      { id: 'gpt-4.1-mini', role: 'Fallback', note: 'コスト効率' },
    ]
  },
  {
    id: 'step2-gemini',
    step: 'STEP 2',
    label: 'シナリオ生成（ストーリー構築）',
    description: 'ユーザーが入力したテーマやキーワードから、4コマ漫画のシナリオ（起承転結・セリフ・感情タグ・カメラワーク）を自動生成する。Web検索によるリアルタイムニュース取得にも対応。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'Gemini',
    sourceFile: 'src/lib/gemini.js',
    models: [
      { id: 'gemini-3.5-flash', role: 'Primary', note: 'Next-Gen 最高品質' },
      { id: 'gemini-2.5-flash', role: 'Backup', note: '安定・高速' },
      { id: 'gemini-2.5-pro', role: 'Backup', note: '高品質' },
      { id: 'gemini-flash-latest', role: 'Fallback', note: '最新安定版' },
      { id: 'gemini-pro-latest', role: 'Fallback', note: '最新Pro版' },
    ]
  },
  {
    id: 'step2-openai',
    step: 'STEP 2',
    label: 'シナリオ生成（ストーリー構築）',
    description: 'ユーザーが入力したテーマやキーワードから、4コマ漫画のシナリオ（起承転結・セリフ・感情タグ・カメラワーク）を自動生成する。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'OpenAI',
    sourceFile: 'src/lib/openai-text.js',
    models: [
      { id: 'gpt-4.1', role: 'Primary', note: '高品質・1Mコンテキスト' },
      { id: 'gpt-4.1-mini', role: 'Backup', note: 'コスト効率・高速' },
      { id: 'gpt-4.1-nano', role: 'Backup', note: '最軽量・最速' },
      { id: 'gpt-4o', role: 'Fallback', note: '安定実績' },
    ]
  },
  {
    id: 'step3-gemini',
    step: 'STEP 3',
    label: 'プロンプト組立（画像指示文の構築）',
    description: 'シナリオのセリフ・感情・カメラアングルを解析し、画像生成AIに渡す超詳細なプロンプト（英語の指示文）を自動構築する。キャラクターの配置ルールやクローン防止ロジックもここで適用。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'Gemini',
    sourceFile: 'src/lib/gemini.js',
    models: [
      { id: 'gemini-3.5-flash', role: 'Primary', note: 'Next-Gen 最高品質' },
      { id: 'gemini-2.5-flash', role: 'Backup', note: '安定・高速' },
      { id: 'gemini-2.5-pro', role: 'Backup', note: '高品質' },
      { id: 'gemini-flash-latest', role: 'Fallback', note: '最新安定版' },
      { id: 'gemini-pro-latest', role: 'Fallback', note: '最新Pro版' },
    ]
  },
  {
    id: 'step3-openai',
    step: 'STEP 3',
    label: 'プロンプト組立（画像指示文の構築）',
    description: 'シナリオのセリフ・感情・カメラアングルを解析し、画像生成AIに渡す超詳細なプロンプト（英語の指示文）を自動構築する。キャラクターの配置ルールやクローン防止ロジックもここで適用。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'OpenAI',
    sourceFile: 'src/lib/openai-text.js',
    models: [
      { id: 'gpt-4.1', role: 'Primary', note: '高品質・1Mコンテキスト' },
      { id: 'gpt-4.1-mini', role: 'Backup', note: 'コスト効率・高速' },
      { id: 'gpt-4.1-nano', role: 'Backup', note: '最軽量・最速' },
      { id: 'gpt-4o', role: 'Fallback', note: '安定実績' },
    ]
  },
  {
    id: 'step4-gemini',
    step: 'STEP 4',
    label: '4コマ漫画画像生成',
    description: '組み立てたプロンプトとキャラクターシート参照画像をAIに渡し、4コマ漫画の画像を1枚生成する。フキダシ・背景・カメラワーク・感情演出を含む完成画像が出力される。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'Gemini',
    sourceFile: 'src/lib/imagen.js',
    models: [
      { id: 'gemini-3.1-flash-image', role: 'Primary', note: 'Nano Banana 2 4コマ漫画生成用' },
    ]
  },
  {
    id: 'step4-openai',
    step: 'STEP 4',
    label: '4コマ漫画画像生成',
    description: '組み立てたプロンプトをChatGPTに渡し、4コマ漫画の画像を1枚生成する。フキダシ・背景・カメラワーク・感情演出を含む完成画像が出力される。※注記: 現在のアプリのAPIは、最新APIの対応状況や安定稼働を考慮し、あえて古い世代のモデルをPrimaryに設定している場合があります。',
    provider: 'OpenAI',
    sourceFile: 'src/lib/openai.js',
    models: [
      { id: 'gpt-image-2', role: 'Primary', note: '単一モデル（フォールバックなし）' },
    ]
  }
];

// 更新履歴データ（新しい順に並べる。上に積み上がる方式。）
// ※ ユーザーの明示的な指示があった場合のみ、ここにエントリを追加する。
//   通常のバグフィックスでは追加しない。
//   date は必ず 'YYYY-MM-DD HH:MM JST' 形式で日時を記録すること。
export const FALLBACK_CHAIN_HISTORY = [
  // ↑ 新しいエントリはここに追加する（降順）
  {
    version: 'v4.7.1',
    date: '2026-06-19 17:26 JST',
    note: 'Nano Banana 2とChatGPT Images 2.0の実検証結果に合わせ、STEP4画像生成の正しい送信設定と制限事項を履歴へ明記。',
    changes: [
      { step: 'STEP 4 (Gemini)', action: '構成', detail: 'gemini-3.1-flash-image（Nano Banana 2）固定。preview系へのロールバックなし' },
      { step: 'STEP 4 (Gemini)', action: '設定', detail: 'REST v1beta / responseModalities=["TEXT","IMAGE"] のみ。imageConfigは送信しない' },
      { step: 'STEP 4 (OpenAI)', action: '構成', detail: 'gpt-image-2 固定。1024x1792 / high / output_format=png / 600秒タイムアウト' },
      { step: 'STEP 3-4', action: '安全対策', detail: '4コマ見出しと各コマ1つ以上の「」付きセリフを検証し、不完全シナリオの画像生成を停止' },
      { step: '品質注記', action: '仕様', detail: '画像内文字はモデルがピクセルとして描画するため、完全な文字一致は保証されない' },
    ]
  },
  {
    version: 'v4.7.0',
    date: '2026-06-19 15:37 JST',
    note: 'Gemini画像生成モデルをpreview廃止予定に合わせて現行GA構成へ更新し、OpenAI画像生成の送信前ガードを追加。',
    changes: [
      { step: 'STEP 4 (Gemini)', action: '構成', detail: 'gemini-3.1-flash-image（Nano Banana 2）固定' },
      { step: 'STEP 4 (Gemini)', action: '設定', detail: 'REST v1beta / responseModalities=["TEXT","IMAGE"] のみ（imageConfigなし）' },
      { step: 'STEP 4 (OpenAI)', action: '安全対策', detail: 'gpt-image-2 プロンプト32,000文字上限チェック / output_format=png' },
    ]
  },
  {
    version: 'v4.5.2',
    date: '2026-05-30 11:09 JST',
    note: '初期スナップショット（フォールバックチェーン ビューア導入時点の構成）',
    changes: [
      { step: 'STEP 1 (Gemini)', action: '構成', detail: 'gemini-3.5-flash → 2.5-flash → 2.5-pro → flash-latest → pro-latest' },
      { step: 'STEP 1 (OpenAI)', action: '構成', detail: 'gpt-4.1 → 4o → 4.1-mini' },
      { step: 'STEP 2 (Gemini)', action: '構成', detail: 'gemini-3.5-flash → 2.5-flash → 2.5-pro → flash-latest → pro-latest' },
      { step: 'STEP 2 (OpenAI)', action: '構成', detail: 'gpt-4.1 → 4.1-mini → 4.1-nano → 4o' },
      { step: 'STEP 3 (Gemini)', action: '構成', detail: 'gemini-3.5-flash → 2.5-flash → 2.5-pro → flash-latest → pro-latest' },
      { step: 'STEP 3 (OpenAI)', action: '構成', detail: 'gpt-4.1 → 4.1-mini → 4.1-nano → 4o' },
      { step: 'STEP 4 (Gemini)', action: '構成', detail: 'gemini-3.1-flash-image-preview → 2.5-flash-image' },
      { step: 'STEP 4 (OpenAI)', action: '構成', detail: 'gpt-image-2（単一）' },
    ]
  }
];
