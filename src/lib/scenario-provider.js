import { callAI } from './ai-provider';
import { getLocationDetails, getRandomReactions } from './knowledge';
import { getScenarioPrompt, getScenarioEnhancePrompt } from './prompts';
import { cropEquirectangular } from './panorama360';

// [v3.85-alpha] シナリオ生成と強化ロジックの外部モジュール化

/**
 * ニュースカテゴリまたは手動トピックから4コマ漫画のシナリオを生成する
 */
export async function generateScenario({
  castList,
  categories,
  inputMode,
  manualTopic,
  searchTopic,
  targetDate,
  customLocation,
  customOutfit,
  punchlineType,
  bg360Image,
  bg360Analysis,
  bg360Enabled,
  bg360ImageParts,
  styleJson,
  onProgress,
  onCameraProgress
}) {
  // 1. カテゴリの決定
  let randomCategory = "";
  if (inputMode === 'manual') {
    randomCategory = "手動入力";
  } else {
    const activeCats = categories.filter(c => c.checked);
    if (activeCats.length > 0) {
      randomCategory = activeCats.map(c => c.keywords).join(' ');
    } else {
      randomCategory = "最新ニュース";
    }
  }

  // 除外キーワード
  const searchTopicKeywords = `${randomCategory} -AI -人工知能 -ChatGPT -Gemini -生成AI -ロボット -テクノロジー -スマホ -IT`;

  // 2. ニュースコンテキストまたは手動入力処理
  let newsContext = "";
  if (inputMode === 'manual') {
    newsContext = `
    【ユーザー提供トピック/URL】:
    ${manualTopic}
    
    (指示): 上記のユーザー入力（メモまたはURLの内容）を「ニュースソース」として扱い、シナリオを作成せよ。
    URLが含まれる場合は、そのリンク先の内容を推測・補完して構成せよ。
    `;

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = manualTopic.match(urlRegex);
    if (urls && urls.length > 0) {
      onProgress(`手動入力内にURLを検出: ${urls[0]}\n> プロキシ経由でコンテンツを取得中...`);
      try {
        const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(urls[0])}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const scripts = doc.querySelectorAll('script, style');
        scripts.forEach(s => s.remove());

        const textElements = doc.querySelectorAll('h1, h2, h3, h4, p, li, article, section');
        let extractedText = "";
        textElements.forEach(el => {
          if (el.textContent.trim()) {
            extractedText += el.textContent.trim() + "\n";
          }
        });

        if (!extractedText.trim()) {
          extractedText = doc.body.textContent || "";
        }

        const cleanText = extractedText.replace(/\s+/g, ' ').substring(0, 3000);
        onProgress(`コンテンツ抽出完了 (${cleanText.length}文字)。注入中...`);
        newsContext = `
        【指定URLから独自のスクレイピングで抽出した内容】:
        ${cleanText}
        
        (指示): 上記はユーザーが入力したURL（ ${urls[0]} ）から直接抽出した本文テキストである。この内容を「最も重要な一次情報ソース」として扱い、内容を要約・反映させた上でシナリオを作成せよ。
        `;
      } catch (fetchErr) {
        console.error("URL Fetch Error: ", fetchErr);
        onProgress(`警告: URLコンテンツの取得に失敗しました (${fetchErr.message})。LLMの内部知識で補完します。`);
      }
    }
  }

  // 3. ロケーション決定とRAG
  const locationList = [
    "寂れた商店街", "無人島", "ファミレスの厨房", "満員電車", "首相官邸", "ライブハウス", "コンビニ前", "古民家", "火星基地",
    "学校の屋上", "深夜のオフィス", "結婚式場", "工事現場", "刑務所の面会室", "豪華客船の甲板", "雪山のロッジ",
    "砂漠の真ん中", "海底トンネル", "裁判所", "病院の待合室", "動物園の檻の中", "美術館", "映画館の最前列",
    "ラーメン屋のカウンター", "温泉旅館", "サウナの中", "エレベーターの中", "断崖絶壁", "廃墟の遊園地", "月面",
    "飛行機の機内", "新幹線の座席", "警察署の取調室", "ゴミ捨て場", "高級ホテルのスイートルーム", "スタジアム",
    "神社の境内", "教会の告解室", "地下アイドルの握手会", "ゲームセンター", "コインランドリー", "公園 of the bench",
    "洞窟の奥", "ジャングルの奥地", "南極基地", "国際宇宙ステーション", "潜水艦の内部", "戦車の内部", "魔法使いの塔",
    "異世界の酒場", "魔王城の玉座", "RPGのダンジョン", "サイバーパンクな路地裏", "昭和の茶の間", "江戸時代の長屋",
    "渋谷スクランブル交差点", "秋葉原の電気街", "京都の竹林", "大阪の道頓堀", "沖縄のビーチ", "北海道のラベンダー畑"
  ];
  const forcedLocation = locationList[Math.floor(Math.random() * locationList.length)];
  
  const activeLocation = bg360Image && bg360Analysis && bg360Enabled 
    ? bg360Analysis.location 
    : (customLocation.trim() ? customLocation.trim() : forcedLocation);
  
  onProgress(`ローカルRAGにアクセス中...\n> 舞台「${activeLocation}」に関する演出情報および感情リアクション辞書を取得中...`);

  const ragLocationDetails = getLocationDetails(activeLocation);
  const ragReactions = getRandomReactions();

  if (styleJson) {
    onProgress(`📝 [作風適用] 外部JSONの作風『${styleJson.style_name}』をシナリオ構成に注入します...`);
  }

  // 4. シナリオプロンプトの構築とAPI呼び出し
  const scenarioPrompt = getScenarioPrompt({
    randomCategory,
    targetDate,
    inputMode,
    manualTopic,
    newsContext,
    searchTopicKeywords,
    bg360Image,
    bg360Analysis,
    bg360Enabled,
    customLocation,
    forcedLocation,
    customOutfit,
    ragLocationDetails,
    ragReactions,
    punchlineType,
    styleJson
  });

  const scenarioImages = (bg360ImageParts && bg360Enabled) ? [bg360ImageParts] : [];
  const result = await callAI(scenarioPrompt, scenarioImages, castList, onProgress);

  // 5. 応答のパース
  let parsedData = { topic: randomCategory, scenario: "" };
  try {
    const titleMatch = result.text.match(/Topic:\s*(.+)/i);
    const loglineMatch = result.text.match(/Logline:\s*(.+)/i);
    const locationMatch = result.text.match(/Location:\s*(.+)/i);
    const outfitMatch = result.text.match(/Outfit:\s*(.+)/i);
    const punchlineMatch = result.text.match(/Punchline:\s*(.+)/i);
    const scenarioMatch = result.text.match(/Scenario:\s*([\s\S]+)/i);

    if (scenarioMatch) {
      parsedData.topic = titleMatch ? titleMatch[1].trim() : randomCategory;
      parsedData.topic = parsedData.topic.replace(/^Topic:\s*/i, '').trim();
      parsedData.logline = loglineMatch ? loglineMatch[1].trim() : "";
      parsedData.location = locationMatch ? locationMatch[1].trim() : "Generic Background";
      parsedData.outfit = outfitMatch ? outfitMatch[1].trim() : "";
      parsedData.punchline = punchlineMatch ? punchlineMatch[1].trim() : "";
      parsedData.scenario = scenarioMatch[1].trim();
    } else {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const json = JSON.parse(jsonMatch[0]);
        parsedData.topic = json.topic || randomCategory;
        parsedData.location = json.location || "Generic Background";
        parsedData.scenario = json.scenario || result.text;
      } else {
        if (result.text.length < 20) {
          throw new Error("AI returned empty or invalid response.");
        }
        parsedData.topic = inputMode === 'manual' ? (manualTopic || "Custom Scenario") : (searchTopic || "Generated Scenario");
        parsedData.scenario = result.text;
      }
    }
  } catch (e) {
    console.warn("Parse warning:", e);
    parsedData.scenario = result.text;
    parsedData.topic = "Generated Scenario";
  }

  // 6. 360°カメラワーク自律設計
  let cameraWork = null;
  let croppedPanels = null;

  if (bg360Image && bg360Analysis && bg360Enabled && bg360ImageParts) {
    try {
      onCameraProgress("🎬 [360° Camera AI] カメラワーク自律設計を開始...");
      const cameraWorkPrompt = `あなたは映画監督兼シネマトグラファーです。
以下の4コマ漫画シナリオと360度パノラマ背景画像を分析し、各コマに最適なカメラの方角を設計してください。

【シナリオ】
${parsedData.scenario}

【360°背景の解析情報】
- 場所: ${bg360Analysis.location}
- 光源: ${bg360Analysis.lighting}
- 空間タイプ: ${bg360Analysis.spatialType}
- 特徴物: ${bg360Analysis.objects || 'なし'}
- 雰囲気: ${bg360Analysis.mood || '不明'}

【設計ルール】
1. 各コマは360°空間の**異なる方角**を活用し、空間の立体感を演出すること
2. yawは0°=正面、90°=右、180°=背面、270°=左
3. pitchは0°=水平、正の値=上向き、負の値=下向き（±30°以内推奨）
4. FOVはカメラのショットに合わせて調整（60°=望遠、90°=標準、120°=広角）
5. 光源方向を考慮し、逆光・順光・サイドライトを各コマで使い分けること
6. 4コマ中少なくとも3コマは異なるyaw方向（差が45°以上）にすること

**必ず以下のJSON形式のみで出力してください。それ以外のテキストは一切不要です。**
{
  "panels": [
    {
      "panel": 1,
      "camera": "ショットタイプ（例: establishing_shot, close_up, medium_shot, wide_shot）",
      "yaw": 0,
      "pitch": 0,
      "fov": 90,
      "reasoning": "この方角を選んだ理由（日本語・1文）"
    },
    { "panel": 2, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 3, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." },
    { "panel": 4, "camera": "...", "yaw": 0, "pitch": 0, "fov": 90, "reasoning": "..." }
  ]
}`;

      const cameraWorkResult = await callAI(cameraWorkPrompt, [bg360ImageParts], null, onCameraProgress);
      const cwJsonStr = cameraWorkResult.text.match(/\{[\s\S]*\}/)?.[0];
      if (cwJsonStr) {
        cameraWork = JSON.parse(cwJsonStr);
        onCameraProgress("🔲 [Crop] 360°画像から各コマの方角ビューをクロップ中...");
        
        croppedPanels = [];
        for (const panel of cameraWork.panels) {
          const cropped = await cropEquirectangular(
            bg360Image,
            panel.yaw,
            panel.pitch || 0,
            panel.fov || 90
          );
          croppedPanels.push(cropped);
        }
      }
    } catch (cwErr) {
      console.warn('[360° Camera AI] Camera work design failed:', cwErr);
      onCameraProgress(`⚠️ [Camera AI] カメラワーク設計に失敗しました: ${cwErr.message}`);
    }
  }

  return {
    topic: parsedData.topic,
    logline: parsedData.logline,
    location: parsedData.location,
    outfit: parsedData.outfit,
    punchline: parsedData.punchline,
    scenario: parsedData.scenario,
    cameraWork,
    croppedPanels,
    usedModel: result.model
  };
}

/**
 * シナリオテキストを選択された演出カテゴリで強化する
 */
export async function enhanceScenarioText({
  scenario,
  enhanceCategories,
  castList,
  styleJson,
  onProgress
}) {
  const enhancePrompt = getScenarioEnhancePrompt(scenario, enhanceCategories, styleJson);
  const result = await callAI(enhancePrompt, [], castList, onProgress);
  return {
    text: result.text.trim(),
    usedModel: result.model
  };
}
