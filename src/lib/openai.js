// ※ OpenAIの画像生成はフォールバック配列を持たず、最高品質の単一モデルを直接指定します。
const OPENAI_IMAGE_MODEL = "gpt-image-2";
const OPENAI_IMAGE_TIMEOUT_MS = 600000;
const OPENAI_IMAGE_TIMEOUT_SECONDS = OPENAI_IMAGE_TIMEOUT_MS / 1000;
const OPENAI_IMAGE_PROMPT_MAX_CHARS = 32000;

let currentOpenAIApiKey = "";

export const setOpenAIApiKey = (key) => {
    currentOpenAIApiKey = key;
};

export const getOpenAIApiKey = () => {
    return currentOpenAIApiKey;
};

export const generateImageWithOpenAI = async (prompt, statCallback) => {
  statCallback("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");
  
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    throw new Error("OpenAI APIキーが設定されていません。");
  }

  const promptLength = prompt?.length || 0;
  if (promptLength > OPENAI_IMAGE_PROMPT_MAX_CHARS) {
    throw new Error(`OpenAI画像生成プロンプトが長すぎます（${promptLength.toLocaleString()}文字 / 上限${OPENAI_IMAGE_PROMPT_MAX_CHARS.toLocaleString()}文字）。プロンプトを短くしてから再実行してください。`);
  }
  if (promptLength > OPENAI_IMAGE_PROMPT_MAX_CHARS * 0.9) {
    statCallback(`[WARN] OpenAI画像生成プロンプトが上限に近づいています（${promptLength.toLocaleString()} / ${OPENAI_IMAGE_PROMPT_MAX_CHARS.toLocaleString()}文字）`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENAI_IMAGE_TIMEOUT_MS); // gpt-image-2 high quality can exceed 6 minutes when congested.

  let response;
  try {
    response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: OPENAI_IMAGE_MODEL,
        prompt: prompt,
        n: 1,
        size: "1024x1792", // OpenAI API supports 1024x1792 for vertical aspect ratio
        quality: "high", // [v3.55] 最高品質モード: テキスト描画精度・ディテールが大幅向上（EvoLinkAI推奨設定）
        output_format: "png",
        // ※ gpt-image-2 は response_format ではなく output_format を使用する別仕様。
        //    b64_json はデフォルトで返るため、画像形式のみ明示する。
      }),
      signal: controller.signal
    });
  } catch (e) {
    if (e.name === 'AbortError' || e.message.includes('aborted')) {
      throw new Error(`API Time out (${OPENAI_IMAGE_TIMEOUT_SECONDS}秒経過による強制切断)。サーバーが混雑しているか、応答がありません。`);
    }
    throw e;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API Error: ${response.status} ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  statCallback("[OpenAI] 画像の生成に成功しました。");
  
  if (data.data && data.data.length > 0) {
    return {
      base64Img: data.data[0].b64_json,
      mimeType: "image/png",
      usedModel: OPENAI_IMAGE_MODEL
    };
  } else {
    throw new Error("APIレスポンスに画像データが含まれていませんでした。");
  }
};
