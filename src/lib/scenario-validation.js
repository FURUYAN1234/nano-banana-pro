import { extractDialogueOnly, extractEmotionStyle } from './panel-utils.js';
import { classifyCameraElevation, isFisheyeCamera } from './composition-variety.js';
import { STYLE_DRAWING_CONTRACTS } from './constants.js';

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

const createPanelHeaderRegex = () => /\[\s*([0-9\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341]+)\s*(?:\u30B3\u30DE\u76EE|\u3053\u307E\u76EE)[^\]]*\]/gu;

const normalizePanelNumber = (value) => PANEL_NUMBER_MAP.get(value) || null;

const findPanelHeaders = (text) => [...text.matchAll(createPanelHeaderRegex())]
  .map((match) => ({
    num: normalizePanelNumber(match[1]),
    numberText: match[1],
    index: match.index,
    header: match[0]
  }));

const NO_DIALOGUE_PLACEHOLDER = '(Characters interact without dialogue in this panel)';

const hasSpeechBubbleDialogue = (panelText, castList) =>
  extractDialogueOnly(panelText, castList) !== NO_DIALOGUE_PLACEHOLDER;

export const getScenarioPanelBlocks = (scenarioText) => {
  const text = stripThoughtBlocks(scenarioText);
  const matches = findPanelHeaders(text);

  return [1, 2, 3, 4].map((num) => {
    const matchIndex = matches.findIndex((match) => match.num === num);
    if (matchIndex === -1) {
      return { num, found: false, header: '', text: '' };
    }
    const match = matches[matchIndex];
    const next = matches.find((candidate) => candidate.index > match.index);
    const end = next ? next.index : text.length;
    return {
      num,
      found: true,
      header: match.header,
      text: text.slice(match.index, end).trim()
    };
  });
};

const userRequestsEyeLevel = (userTopic, panelNumber) => {
  const source = String(userTopic || '').normalize('NFKC');
  const negated = /禁止|しない|使わない|用いない|避け|不可|ではなく|でなく|以外|\b(?:not|never|no|avoid)\b/i;
  const userPanel = getScenarioPanelBlocks(source).find(panel => panel.num === panelNumber && panel.found);
  const explicitCamera = userPanel?.text.match(/\[Camera\s*[:：]\s*([^\]]+)\]/i)?.[1];
  if (explicitCamera && !negated.test(explicitCamera) && classifyCameraElevation(explicitCamera) === 'eye') return true;
  return source.split(/[。！？、，,;；\n]/u).some(sentence => {
    if (!/(?:アイレベル(?:で|に|の)|eye[ -]level\s+(?:shot|view|camera))/i.test(sentence)
      || negated.test(sentence)) return false;
    const panels = [...sentence.matchAll(/([1-4一二三四])\s*コマ目/gu)]
      .map(match => normalizePanelNumber(match[1]));
    return panels.length ? panels.includes(panelNumber)
      : /全コマ|各コマ|カメラ(?:は|を)|\b(?:all|every) panels?\b/i.test(sentence);
  });
};

// Only the original user input can grant an eye-level exception. Generated
// Camera text is not user authority. Imported/manual scenarios keep their own
// contract; this guard belongs to the automatic scenario-generation boundary.
export const assertGeneratedScenarioCameraContract = (scenarioText, userTopic = '') => {
  const invalid = getScenarioPanelBlocks(scenarioText).filter(panel => {
    const camera = panel.text.match(/\[Camera\s*[:：]\s*([^\]]+)\]/i)?.[1] || '';
    const elevation = classifyCameraElevation(camera);
    return !panel.found || isFisheyeCamera(camera) || (elevation !== 'high' && elevation !== 'low'
      && !(elevation === 'eye' && userRequestsEyeLevel(userTopic, panel.num)));
  });
  if (!invalid.length) return true;
  const error = new Error(`${invalid.map(panel => panel.num).join('・')}コマ目: 自動構成のCameraには俯瞰またはアオリの撮影位置・投影を明記してください。肩越し・レンズ名だけでは高さになりません。ユーザーが明示したコマ以外のアイレベルは禁止です。魚眼は使わず、広角は通常の直線投影で指定してください。`);
  error.code = 'CAMERA_CONTRACT';
  error.scenario = String(scenarioText || '');
  error.qualityScore = 4 - invalid.length;
  throw error;
};

export const assertGeneratedScenarioStyleContract = (scenarioText) => {
  const invalid = getScenarioPanelBlocks(scenarioText).filter(panel =>
    STYLE_DRAWING_CONTRACTS[extractEmotionStyle(panel.text)]?.automatic === false);
  if (!invalid.length) return true;
  const error = new Error(`${invalid.map(panel => panel.num).join('・')}コマ目: 自動生成の選択対象外の画風です。許可された既存の描法から場面に合うものを選び、Camera・演技・台詞を保持してください。`);
  error.code = 'STYLE_CONTRACT';
  error.scenario = String(scenarioText || '');
  error.qualityScore = 4 - invalid.length;
  throw error;
};

export const validateMangaScenario = (scenarioText, castList = '') => {
  const headers = findPanelHeaders(stripThoughtBlocks(scenarioText));
  const invalidPanelSequence = headers.map((header) => header.num).join(',') === '1,2,3,4'
    ? []
    : headers.map((header) => header.numberText);
  const panels = getScenarioPanelBlocks(scenarioText);
  const invalidDialogue = [];
  const hasDialogue = new Map(panels.filter(panel => panel.found).map(panel => {
    try {
      return [panel.num, hasSpeechBubbleDialogue(panel.text, castList)];
    } catch (error) {
      if (error.code !== 'DIALOGUE_SYNTAX') throw error;
      invalidDialogue.push({ panel: panel.num, message: error.message });
      return [panel.num, false];
    }
  }));
  const missingPanels = panels.filter((panel) => !panel.found).map((panel) => panel.num);
  const panelsMissingDialogue = panels
    .filter((panel) => panel.found && !hasDialogue.get(panel.num) && !NO_DIALOGUE_RE.test(panel.text))
    .map((panel) => panel.num);
  const silentPanels = panels
    .filter((panel) => panel.found && NO_DIALOGUE_RE.test(panel.text) && !hasDialogue.get(panel.num))
    .map((panel) => panel.num);

  return {
    ok: invalidPanelSequence.length === 0 && missingPanels.length === 0 && panelsMissingDialogue.length === 0 && invalidDialogue.length === 0,
    invalidPanelSequence,
    invalidDialogue,
    missingPanels,
    panelsMissingDialogue,
    silentPanels,
    panels
  };
};

export const formatMangaScenarioValidationIssue = (validation) => {
  const issues = [];
  if (validation.invalidPanelSequence?.length) {
    issues.push(`panel headers must appear exactly once in order 1, 2, 3, 4; found: ${validation.invalidPanelSequence.join(', ')}`);
  }
  for (const issue of validation.invalidDialogue || []) {
    issues.push(`${issue.panel}コマ目: ${issue.message}`);
  }
  if (validation.missingPanels.length) {
    issues.push(`missing panel(s): ${validation.missingPanels.join(', ')}`);
  }
  if (validation.panelsMissingDialogue.length) {
    issues.push(`panel(s) without speech-bubble dialogue: ${validation.panelsMissingDialogue.join(', ')}`);
  }
  return issues.join('; ') || 'unknown scenario validation error';
};
