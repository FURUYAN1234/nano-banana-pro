import { callAI } from './ai-provider';
import { getReactionGuidelines } from './knowledge';
import { getScenarioPrompt } from './prompts';
import { cropEquirectangular } from './panorama360';
import { applyManualStagingLocks } from './manual-staging';
import { createDynamicLocationPlan, requestSafeScenario } from './location-policy';
import {
  assertSafeScenarioContent,
  requestSafeScenarioContent,
  SAFE_CONTENT_RETRY_INSTRUCTION
} from './scenario-content-policy';
import {
  assertVisualStoryEvidence,
  VISUAL_STORY_EVIDENCE_RETRY_INSTRUCTION
} from './visual-story-evidence';
import {
  assertDynamicBackground,
  DYNAMIC_BACKGROUND_RETRY_INSTRUCTION,
  parseDynamicBackground
} from './dynamic-background';
import {
  assertActiveFinalPanelStaging,
  FINAL_PANEL_ACTIVE_STAGING_RETRY_INSTRUCTION
} from './final-panel-staging';
import {
  buildScenarioEnhancementPrompt,
  runValidatedScenarioEnhancement
} from './scenario-enhancement';
import {
  assertManualTopicExclusions,
  MANUAL_TOPIC_EXCLUSION_RETRY_INSTRUCTION
} from './manual-topic-exclusions';

const STEP2_TEXT_TIMEOUT_MS = 180_000;

const scenarioRetryLabels = {
  SAFE_LOCATION: '安全な舞台設定',
  SCENARIO_CONTENT: 'シナリオ本文の表現衛生',
  MANUAL_TOPIC_EXCLUSION: '手動入力の禁止条件',
  VISUAL_STORY_EVIDENCE: '出来事を証明する視覚要素',
  DYNAMIC_BACKGROUND: '動的背景設計',
  FINAL_PANEL_STAGING: '4コマ目の能動アクション'
};

const assertScenarioCheck = (code, check) => {
  try {
    check();
  } catch (error) {
    error.code = code;
    throw error;
  }
};

const validateScenarioForRetry = ({ scenario, punchlineType, manualTopic }) => {
  const checks = [
    ['SCENARIO_CONTENT', () => assertSafeScenarioContent(scenario)],
    ['MANUAL_TOPIC_EXCLUSION', () => assertManualTopicExclusions(scenario.scenario, manualTopic)],
    ['VISUAL_STORY_EVIDENCE', () => assertVisualStoryEvidence(scenario)],
    ['DYNAMIC_BACKGROUND', () => assertDynamicBackground(scenario)],
    ['FINAL_PANEL_STAGING', () => assertActiveFinalPanelStaging({
      scenario: scenario.scenario,
      punchlineType
    })]
  ];
  const failures = [];
  for (const [code, check] of checks) {
    try {
      assertScenarioCheck(code, check);
    } catch (error) {
      failures.push({ code, message: error?.message || code });
    }
  }
  if (failures.length > 0) {
    const error = new Error(failures.map(({ message }) => message).join(' / '));
    error.code = failures[0].code;
    error.qualityScore = checks.length - failures.length;
    error.qualityIssues = failures;
    throw error;
  }
  return true;
};

export const formatScenarioRetryProgress = ({ code, nextAttempt, maxAttempts } = {}) => {
  const label = scenarioRetryLabels[code] || 'シナリオ出力';
  const attemptPrefix = nextAttempt && maxAttempts ? `試行 ${nextAttempt}/${maxAttempts}: ` : '';
  return `${attemptPrefix}「${label}」の品質検証に通らなかったため、改善条件を追加してシナリオを再生成します...`;
};

const scenarioQualityRetryInstructions = {
  SCENARIO_CONTENT: SAFE_CONTENT_RETRY_INSTRUCTION,
  MANUAL_TOPIC_EXCLUSION: MANUAL_TOPIC_EXCLUSION_RETRY_INSTRUCTION,
  VISUAL_STORY_EVIDENCE: VISUAL_STORY_EVIDENCE_RETRY_INSTRUCTION,
  DYNAMIC_BACKGROUND: DYNAMIC_BACKGROUND_RETRY_INSTRUCTION,
  FINAL_PANEL_STAGING: FINAL_PANEL_ACTIVE_STAGING_RETRY_INSTRUCTION
};

// [v3.85-alpha] シナリオ生成と強化ロジックの外部モジュール化

const parseScenarioResponse = (result, {
  randomCategory,
  inputMode,
  manualTopic,
  searchTopic
}) => {
  let parsedData = { topic: randomCategory, scenario: '' };

  try {
    const titleMatch = result.text.match(/Topic:\s*(.+)/i);
    const loglineMatch = result.text.match(/Logline:\s*(.+)/i);
    const locationMatch = result.text.match(/Location:\s*(.+)/i);
    const visualEvidenceMatch = result.text.match(/VisualEvidence:\s*(.+)/i);
    const outfitMatch = result.text.match(/Outfit:\s*(.+)/i);
    const punchlineMatch = result.text.match(/Punchline:\s*(.+)/i);
    const scenarioMatch = result.text.match(/Scenario:\s*([\s\S]+)/i);

    if (scenarioMatch) {
      parsedData.topic = titleMatch ? titleMatch[1].trim() : randomCategory;
      parsedData.topic = parsedData.topic.replace(/^Topic:\s*/i, '').trim();
      parsedData.logline = loglineMatch ? loglineMatch[1].trim() : '';
      parsedData.location = locationMatch ? locationMatch[1].trim() : 'Generic Background';
      parsedData.visualEvidence = visualEvidenceMatch ? visualEvidenceMatch[1].trim() : '';
      parsedData.backgroundDesign = parseDynamicBackground(result.text);
      parsedData.outfit = outfitMatch ? outfitMatch[1].trim() : '';
      parsedData.punchline = punchlineMatch ? punchlineMatch[1].trim() : '';
      parsedData.scenario = scenarioMatch[1].trim();
    } else {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const json = JSON.parse(jsonMatch[0]);
        parsedData.topic = json.topic || randomCategory;
        parsedData.location = json.location || 'Generic Background';
        parsedData.visualEvidence = json.visualEvidence || '';
        parsedData.backgroundDesign = json.backgroundDesign || parseDynamicBackground(result.text);
        parsedData.scenario = json.scenario || result.text;
      } else {
        if (result.text.length < 20) throw new Error('AI returned empty or invalid response.');
        parsedData.topic = inputMode === 'manual'
          ? (manualTopic || 'Custom Scenario')
          : (searchTopic || 'Generated Scenario');
        parsedData.location = 'Generic Background';
        parsedData.scenario = result.text;
      }
    }
  } catch (error) {
    console.warn('Parse warning:', error);
    parsedData.location = 'Generic Background';
    parsedData.scenario = result.text;
    parsedData.topic = 'Generated Scenario';
  }

  if (inputMode === 'manual') {
    parsedData.scenario = applyManualStagingLocks(parsedData.scenario, manualTopic);
  }

  return parsedData;
};

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
    
    (扱い): 上記はユーザー提供のトピックまたはメモであり、外部事実として断定しない。入力文に書かれた内容だけを材料にシナリオを作成せよ。
    URLが含まれる場合も、本文の取得に成功したときだけその抽出内容を使い、取得できなければURLの内容を推測・補完してはならない。
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
        onProgress(`警告: URLコンテンツの取得に失敗しました (${fetchErr.message})。URLの内容は使用せず、ユーザー入力の本文だけでシナリオを作成します。`);
      }
    }
  }

  // 3. ロケーション決定と動的背景設計
  const backgroundLocation = bg360Image && bg360Analysis && bg360Enabled
    ? bg360Analysis.location
    : '';
  const comedyToneOptions = ['HighTension', 'SurrealQuiet', 'IntellectualBlack'];
  const activeComedyTone = comedyToneOptions[Math.floor(Math.random() * comedyToneOptions.length)];
  const locationPlan = createDynamicLocationPlan({
    customLocation,
    backgroundLocation,
    backgroundDetails: backgroundLocation ? bg360Analysis : null
  });
  onProgress('動的背景を設計中...\n> 場所、空間構造、前景・中景・後景、光源、小道具、4コマ共通アンカーを内容から構築します。');
  const ragReactions = getReactionGuidelines();

  // オチタイプの決定論的ランダム化 (Auto時の偏り防止)
  let activePunchlineType = punchlineType === 'PsychoHorror' ? 'Surreal' : punchlineType;
  if (!punchlineType || punchlineType === 'Auto') {
    const punchlineOptions = [
      'Explosion',       // 爆発型
      'Surreal',         // 静寂型（シュール）
      'FakeEmotion',     // 感動詐欺
      'Metafiction',     // メタ崩壊型
      'Unreasonable',    // 理不尽な制裁型
      'RunningGag',      // 天丼爆発型
      'Dream',           // 夢オチ型
      'Misunderstanding', // 盛大な勘違い型
      'CanceledEnding'   // 打ち切りエンド型
    ];
    activePunchlineType = punchlineOptions[Math.floor(Math.random() * punchlineOptions.length)];
  }

  onProgress(`📝 演出設計: [オチ] ${activePunchlineType} / [トーン] ${activeComedyTone}`);

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
    customOutfit,
    locationPlan,
    ragReactions,
    punchlineType: activePunchlineType,
    comedyTone: activeComedyTone,
    styleJson
  });

  const safeScenarioResult = await requestSafeScenario({
    initialPrompt: scenarioPrompt,
    requestScenario: (prompt) => requestSafeScenarioContent({
      initialPrompt: prompt,
      requestScenario: (contentPrompt) => callAI(contentPrompt, [], castList, onProgress, { timeoutMs: STEP2_TEXT_TIMEOUT_MS }),
      maxAttempts: 1
    }).then(({ response }) => response),
    parseScenario: (response) => parseScenarioResponse(response, {
      randomCategory,
      inputMode,
      manualTopic,
      searchTopic
    }),
    validateScenario: (parsedScenario) => validateScenarioForRetry({
      scenario: parsedScenario,
      punchlineType: activePunchlineType,
      manualTopic: inputMode === 'manual' ? manualTopic : ''
    }),
    retryInstruction: ({ code }) => scenarioQualityRetryInstructions[code] || '',
    onRetry: (retry) => onProgress(formatScenarioRetryProgress(retry)),
    maxAttempts: 3
  });
  const result = safeScenarioResult.response;
  const parsedData = safeScenarioResult.parsed;

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
    visualEvidence: parsedData.visualEvidence,
    dynamicBackground: parsedData.backgroundDesign,
    outfit: parsedData.outfit,
    punchline: parsedData.punchline,
    scenario: parsedData.scenario,
    cameraWork,
    croppedPanels,
    usedModel: result.model,
    thought: result.thought,
    validationWarning: safeScenarioResult.validationWarning || null
  };
}

/**
 * シナリオテキストを選択された演出カテゴリで強化する
 */
export async function enhanceScenarioText({
  scenario,
  selectedCategories,
  castList,
  styleJson,
  onProgress
}) {
  return runValidatedScenarioEnhancement({
    originalScenario: scenario,
    selectedCategories,
    buildPrompt: ({ validationIssues }) =>
      buildScenarioEnhancementPrompt({
        scenario,
        selectedCategories,
        styleJson,
        validationIssues
      }),
    requestEnhancement: async (prompt) => {
      const result = await callAI(prompt, [], castList, onProgress, { timeoutMs: STEP2_TEXT_TIMEOUT_MS });
      return {
        text: result.text,
        usedModel: result.model,
        thought: result.thought
      };
    },
    onRetry: (validation) => {
      onProgress?.(`出力検証NGのため自動修正します: ${validation.issueCodes.join(', ')}`);
    },
    onWarning: (validation, _text, fallbackToOriginal) => {
      const retained = fallbackToOriginal ? '元のシナリオ' : '最良の安全候補';
      onProgress?.(`強化品質の再試行上限に達したため、${retained}を保持して続行します: ${validation.issueCodes.join(', ')}`);
    }
  });
}
