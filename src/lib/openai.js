export const generateImageWithOpenAI = async (prompt, statCallback) => {
  statCallback("[OpenAI] ChatGPT Images 2.0 にリクエストを送信中...");
  
  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) {
    throw new Error("OpenAI APIキーが設定されていません。");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 180000); // 180s timeout (DALL-E 3 can be slow)

  let response;
  try {
    response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1792", // OpenAI API supports 1024x1792 for vertical aspect ratio
        response_format: "b64_json",
        style: "vivid"
      }),
      signal: controller.signal
    });
  } catch (e) {
    if (e.name === 'AbortError' || e.message.includes('aborted')) {
      throw new Error("API Time out (180秒経過による強制切断)。サーバーが混雑しているか、応答がありません。");
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
      usedModel: "dall-e-3"
    };
  } else {
    throw new Error("APIレスポンスに画像データが含まれていませんでした。");
  }
};
