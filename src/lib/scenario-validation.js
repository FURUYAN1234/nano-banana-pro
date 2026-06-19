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

const DIALOGUE_QUOTE_RE = /\u300C[^\u300D]{2,}\u300D/;
const NO_DIALOGUE_RE = /(?:\u7121\u8A00|\u53F0\u8A5E\s*(?:\u306A\u3057|\u7121\u3057)|\u30BB\u30EA\u30D5\s*(?:\u306A\u3057|\u7121\u3057)|\u305B\u308A\u3075\s*(?:\u306A\u3057|\u7121\u3057)|without\s+dialogue|no\s+dialogue|Characters interact without dialogue)/i;

const stripThoughtBlocks = (text) => String(text || '').replace(/<thought>[\s\S]*?<\/thought>/gi, '');

const createPanelHeaderRegex = () => /\[\s*([1-4\uFF11-\uFF14\u4E00\u4E8C\u4E09\u56DB])\s*(?:\u30B3\u30DE\u76EE|\u3053\u307E\u76EE)[^\]]*\]/gu;

const normalizePanelNumber = (value) => PANEL_NUMBER_MAP.get(value) || null;

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
    .filter((panel) => panel.found && !DIALOGUE_QUOTE_RE.test(panel.text))
    .map((panel) => panel.num);
  const silentPanels = panels
    .filter((panel) => panel.found && NO_DIALOGUE_RE.test(panel.text) && !DIALOGUE_QUOTE_RE.test(panel.text))
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
