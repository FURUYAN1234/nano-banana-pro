import { extractDialogueOnly, extractEmotionStyle } from './panel-utils.js';
import { classifyCameraElevation, isFisheyeCamera } from './composition-variety.js';
import { STYLE_DRAWING_CONTRACTS } from './constants.js';

const PANEL_NUMBER_MAP = new Map(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'].map((value, index) => [value, index + 1]));

export const getScenarioPanelCountRange = (scenarioMode = 'four-panel') => {
  if (scenarioMode === 'four-panel') return [4, 4];
  if (scenarioMode === 'experimental-manga') return [5, 8];
  throw new Error('Unknown scenario mode: ' + scenarioMode);
};

// Keep the raw topic intact: panel totals are mode settings, while story facts,
// quoted comics and directions for individual panels remain source material.
export const buildScenarioPanelCountInstruction = (scenarioMode = 'four-panel') => {
  const [min, max] = getScenarioPanelCountRange(scenarioMode);
  return min === max
    ? '【モード固定のコマ数契約】四コマモードは常に全4コマ。自由入力による漫画全体の総コマ数の指定は無視し、モードを変更しない。コマ数指定に従わないことを要望不一致や修正理由にしない。1〜4コマの画風・カメラ・演技・台詞の個別指定は保持する。範囲外のコマ番号を理由にコマを追加しない。物語中の数値・引用・作中漫画のコマ数は削除・改変しない。'
    : '【モード固定のコマ数契約】実験的コマ割りは5〜8コマ。範囲内の総コマ数の指定があれば従い、未指定なら内容に合う必要数を選ぶ。決定済み台本の監査・修正ではそのコマ数を保つ。原文の物語・引用・数値と各コマの画風・カメラ・演技・台詞は保持する。';
};

const NO_DIALOGUE_RE = /^\s*(?:[-*]\s*)?(?:無言|(?:台詞|セリフ|せりふ)\s*[:：]?\s*(?:なし|無し)|(?:Dialogue\s*:\s*)?(?:none|no\s+dialogue|without\s+dialogue))\s*[。.!]?\s*$/im;

const stripThoughtBlocks = (text) => String(text || '').replace(/<thought>[\s\S]*?<\/thought>/gi, '');

const createPanelHeaderRegex = () => /\[\s*([0-9\uFF10-\uFF19\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D\u5341]+)\s*(?:\u30B3\u30DE\u76EE|\u3053\u307E\u76EE)[^\]]*\]/gu;

const normalizePanelNumber = (value) => {
  const normalized = String(value).normalize('NFKC');
  return /^[0-9]+$/.test(normalized) ? Number(normalized) : PANEL_NUMBER_MAP.get(normalized) || null;
};

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
  return matches.map((match, index) => ({
    num: match.num,
    found: true,
    header: match.header,
    text: text.slice(match.index, matches[index + 1]?.index ?? text.length).trim()
  }));
};

const inspectPanelStructure = (scenarioText, scenarioMode) => {
  const headers = findPanelHeaders(stripThoughtBlocks(scenarioText));
  const panelCountRange = getScenarioPanelCountRange(scenarioMode);
  const structuralValid = headers.length >= panelCountRange[0] && headers.length <= panelCountRange[1]
    && headers.every((header, index) => header.num === index + 1);
  const expectedCount = Math.min(panelCountRange[1], Math.max(panelCountRange[0], headers.length));
  return {
    structuralValid,
    panelCountRange,
    invalidPanelSequence: structuralValid ? [] : headers.map(header => header.numberText),
    missingPanels: Array.from({ length: expectedCount }, (_, index) => index + 1)
      .filter(num => !headers.some(header => header.num === num))
  };
};

export const assertScenarioPanelStructure = (scenarioText, { scenarioMode = 'four-panel' } = {}) => {
  const structure = inspectPanelStructure(scenarioText, scenarioMode);
  if (structure.structuralValid) return true;
  const range = structure.panelCountRange.join('–');
  const error = new Error('コマ見出しは選択モードの ' + range + ' コマを1から欠番・重複なしの順番で記載してください。');
  error.code = 'PANEL_STRUCTURE_CONTRACT';
  error.scenario = String(scenarioText || '');
  error.qualityScore = 0;
  throw error;
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
    const panels = [...sentence.matchAll(/([1-8一二三四五六七八])\s*コマ目/gu)]
      .map(match => normalizePanelNumber(match[1]));
    return panels.length ? panels.includes(panelNumber)
      : /全コマ|各コマ|カメラ(?:は|を)|\b(?:all|every) panels?\b/i.test(sentence);
  });
};

// Only the original user input can grant an eye-level exception. Generated
// Camera text is not user authority. Imported/manual scenarios keep their own
// contract; this guard belongs to the automatic scenario-generation boundary.
export const assertGeneratedScenarioCameraContract = (scenarioText, userTopic = '', options = {}) => {
  assertScenarioPanelStructure(scenarioText, options);
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
  error.qualityScore = getScenarioPanelBlocks(scenarioText).length - invalid.length;
  throw error;
};

export const assertGeneratedScenarioStyleContract = (scenarioText, options = {}) => {
  assertScenarioPanelStructure(scenarioText, options);
  const invalid = getScenarioPanelBlocks(scenarioText).filter(panel =>
    STYLE_DRAWING_CONTRACTS[extractEmotionStyle(panel.text)]?.automatic === false);
  if (!invalid.length) return true;
  const error = new Error(`${invalid.map(panel => panel.num).join('・')}コマ目: 自動生成の選択対象外の画風です。許可された既存の描法から場面に合うものを選び、Camera・演技・台詞を保持してください。`);
  error.code = 'STYLE_CONTRACT';
  error.scenario = String(scenarioText || '');
  error.qualityScore = getScenarioPanelBlocks(scenarioText).length - invalid.length;
  throw error;
};

export const validateMangaScenario = (scenarioText, castList = '', { scenarioMode = 'four-panel' } = {}) => {
  const structure = inspectPanelStructure(scenarioText, scenarioMode);
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

  const panelsMissingDialogue = panels
    .filter((panel) => panel.found && !hasDialogue.get(panel.num) && !NO_DIALOGUE_RE.test(panel.text))
    .map((panel) => panel.num);
  const silentPanels = panels
    .filter((panel) => panel.found && NO_DIALOGUE_RE.test(panel.text) && !hasDialogue.get(panel.num))
    .map((panel) => panel.num);

  return {
    ok: structure.structuralValid && panelsMissingDialogue.length === 0 && invalidDialogue.length === 0,
    scenarioMode,
    ...structure,
    invalidDialogue,
    panelsMissingDialogue,
    silentPanels,
    panels
  };
};

export const formatMangaScenarioValidationIssue = (validation) => {
  const issues = [];
  if (validation.structuralValid === false || validation.invalidPanelSequence?.length) {
    const range = validation.panelCountRange || [4, 4];
    issues.push(`panel headers must appear exactly once in order 1 through N (${range[0]}–${range[1]} panels); found: ${validation.invalidPanelSequence.join(', ') || 'none'}`);
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
