import { extractDialogueOnly } from './panel-utils.js';

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

const NO_DIALOGUE_RE = /^\s*(?:[-*]\s*)?(?:無言|(?:台詞|セリフ|せりふ)\s*[:：]?\s*(?:なし|無し)|(?:Dialogue\s*:\s*)?(?:none|no\s+dialogue|without\s+dialogue))\s*[。.!]?\s*$/im;

const stripThoughtBlocks = (text) => String(text || '').replace(/<thought>[\s\S]*?<\/thought>/gi, '');

const createPanelHeaderRegex = () => /\[\s*([1-4\uFF11-\uFF14\u4E00\u4E8C\u4E09\u56DB])\s*(?:\u30B3\u30DE\u76EE|\u3053\u307E\u76EE)[^\]]*\]/gu;

const normalizePanelNumber = (value) => PANEL_NUMBER_MAP.get(value) || null;

const NO_DIALOGUE_PLACEHOLDER = '(Characters interact without dialogue in this panel)';

const hasSpeechBubbleDialogue = (panelText, castList) =>
  extractDialogueOnly(panelText, castList) !== NO_DIALOGUE_PLACEHOLDER;

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

export const validateMangaScenario = (scenarioText, castList = '') => {
  const panels = getScenarioPanelBlocks(scenarioText);
  const missingPanels = panels.filter((panel) => !panel.found).map((panel) => panel.num);
  const panelsMissingDialogue = panels
    .filter((panel) => panel.found && !hasSpeechBubbleDialogue(panel.text, castList) && !NO_DIALOGUE_RE.test(panel.text))
    .map((panel) => panel.num);
  const silentPanels = panels
    .filter((panel) => panel.found && NO_DIALOGUE_RE.test(panel.text) && !hasSpeechBubbleDialogue(panel.text, castList))
    .map((panel) => panel.num);

  return {
    ok: missingPanels.length === 0 && panelsMissingDialogue.length === 0,
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
  return issues.join('; ') || 'unknown scenario validation error';
};
