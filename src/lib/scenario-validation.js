const PANEL_NUMBER_MAP = new Map([
  ['1', 1],
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['\uFF11', 1],
  ['\uFF12', 2],
  ['\uFF13', 3],
  ['\uFF14', 4],
  ['\u4E00', 1],
  ['\u4E8C', 2],
  ['\u4E09', 3],
  ['\u56DB', 4]
]);

const DIALOGUE_QUOTE_SCAN_RE = /\u300C([^\u300D]{2,})\u300D/g;
const DIALOGUE_META_LINE_RE = /^\s*(?:Camera|Location|Outfit|EMOTION|状況(?:演出)?|Action|リアクション|Reaction|設定|物理描写|SFX|SE|効果音|音響効果|音響|音声|BGM|ナレーション|テロップ|背景|Background|カメラワーク|CameraWork|Camera\s*Work|Punchline)\s*[:：]/i;
const SPOKEN_QUOTE_POST_RE = /^\s*(?:と|って)?\s*(?:言|いう|言い|言う|言った|叫|叫び|叫ぶ|叫ん|呼|呼び|呟|つぶや|つぶやき|囁|ささや|ささやき|読み上げ|読みあげ|読み|発表|告げ|答|返|話|語|宣言|嘆|漏ら|口に|述べ|怒鳴|呻|うめ|唸|ツッコ|つっこ|突っ込|問|尋)/;
const VISUAL_TEXT_CONTEXT_RE = /(?:席|看板|札|プレート|ラベル|テロップ|字幕|見出し|タイトル|ロゴ|表示|文字|名札|タグ|欄|枠|ボード|画面|スクリーン|モニター|ディスプレイ|サイン|案内|標識|速報|点滅|資料|項目|フォント)/;
const NO_DIALOGUE_RE = /(?:\u7121\u8A00|\u53F0\u8A5E\s*(?:\u306A\u3057|\u7121\u3057)|\u30BB\u30EA\u30D5\s*(?:\u306A\u3057|\u7121\u3057)|\u305B\u308A\u3075\s*(?:\u306A\u3057|\u7121\u3057)|without\s+dialogue|no\s+dialogue|Characters interact without dialogue)/i;

const stripThoughtBlocks = (text) => String(text || '').replace(/<thought>[\s\S]*?<\/thought>/gi, '');

const createPanelHeaderRegex = () => /\[\s*([1-4\uFF11-\uFF14\u4E00\u4E8C\u4E09\u56DB])\s*(?:\u30B3\u30DE\u76EE|\u3053\u307E\u76EE)[^\]]*\]/gu;

const normalizePanelNumber = (value) => PANEL_NUMBER_MAP.get(value) || null;

const hasSpokenQuotePostContext = (postText = '') => SPOKEN_QUOTE_POST_RE.test(postText.trim());

const hasSpeechBubbleDialogue = (panelText) => String(panelText || '').split('\n').some((line) => {
  const trimmed = line.trim();
  if (!trimmed) return false;

  if (/^\u300C[^\u300D]{2,}\u300D[？！。、!?\s]*$/.test(trimmed)) {
    return true;
  }

  const explicitSpeakerLine = trimmed.match(/^([^「」\n]{1,24})\u300C([^\u300D]{2,})\u300D/);
  const postExplicitQuoteText = explicitSpeakerLine ? trimmed.slice(explicitSpeakerLine[0].length) : '';
  const explicitPrefix = explicitSpeakerLine?.[1]?.trim() || '';
  if (
    explicitSpeakerLine &&
    !DIALOGUE_META_LINE_RE.test(trimmed) &&
    !VISUAL_TEXT_CONTEXT_RE.test(`${explicitPrefix}${postExplicitQuoteText}`)
  ) {
    return true;
  }

  DIALOGUE_QUOTE_SCAN_RE.lastIndex = 0;
  let quoteMatch;
  while ((quoteMatch = DIALOGUE_QUOTE_SCAN_RE.exec(trimmed)) !== null) {
    const postText = trimmed.slice(quoteMatch.index + quoteMatch[0].length);
    if (hasSpokenQuotePostContext(postText)) {
      return true;
    }
  }

  return false;
});

export const getScenarioPanelBlocks = (scenarioText) => {
  const text = stripThoughtBlocks(scenarioText);
  const matches = [...text.matchAll(createPanelHeaderRegex())]
    .map((match) => ({
      num: normalizePanelNumber(match[1]),
      index: match.index,
      header: match[0]
    }))
    .filter((match) => match.num >= 1 && match.num <= 4)
    .sort((a, b) => a.index - b.index);

  return [1, 2, 3, 4].map((num) => {
    const matchIndex = matches.findIndex((match) => match.num === num);
    if (matchIndex === -1) {
      return { num, found: false, header: '', text: '' };
    }
    const match = matches[matchIndex];
    const next = matches.find((candidate) => candidate.index > match.index && candidate.num !== num);
    const end = next ? next.index : text.length;
    return {
      num,
      found: true,
      header: match.header,
      text: text.slice(match.index, end).trim()
    };
  });
};

export const validateMangaScenario = (scenarioText) => {
  const panels = getScenarioPanelBlocks(scenarioText);
  const missingPanels = panels.filter((panel) => !panel.found).map((panel) => panel.num);
  const panelsMissingDialogue = panels
    .filter((panel) => panel.found && !hasSpeechBubbleDialogue(panel.text))
    .map((panel) => panel.num);
  const silentPanels = panels
    .filter((panel) => panel.found && NO_DIALOGUE_RE.test(panel.text) && !hasSpeechBubbleDialogue(panel.text))
    .map((panel) => panel.num);

  return {
    ok: missingPanels.length === 0 && panelsMissingDialogue.length === 0 && silentPanels.length === 0,
    missingPanels,
    panelsMissingDialogue,
    silentPanels,
    panels
  };
};

export const formatMangaScenarioValidationIssue = (validation) => {
  const issues = [];
  if (validation.missingPanels.length) {
    issues.push(`missing panel(s): ${validation.missingPanels.join(', ')}`);
  }
  if (validation.panelsMissingDialogue.length) {
    issues.push(`panel(s) without speech-bubble dialogue: ${validation.panelsMissingDialogue.join(', ')}`);
  }
  if (validation.silentPanels.length) {
    issues.push(`panel(s) marked as no-dialogue: ${validation.silentPanels.join(', ')}`);
  }
  return issues.join('; ') || 'unknown scenario validation error';
};
