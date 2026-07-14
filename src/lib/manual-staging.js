const STAGING_CUE_RE = /(?:話しかけ|語りかけ|呼びかけ|問いかけ|会話相手|聞き手|見つめ|視線|目線|正面|カメラ|画面|読者|観客|視聴者|向かい合|向き合|振り向|(?:を|へ|に)向(?:く|かう|ける|いて)|(?:を|へ|に)見(?:る|ない)|face(?:s|d|ing)?|look(?:s|ed|ing)?|gaze|eye[-\s]?line|address(?:es|ed|ing)?)/i;
const PANEL_REF_RE = /([1-4一二三四])\s*コマ目/gu;
const PANEL_NUMBER = { '1': 1, '2': 2, '3': 3, '4': 4, 一: 1, 二: 2, 三: 3, 四: 4 };
const LOCK_MARKER = '[USER STAGING LOCK - ABSOLUTE]';

const splitDirectiveSentences = (manualTopic) => String(manualTopic || '')
  .split(/(?<=[。！？!?])\s*|\r?\n+/u)
  .map((sentence) => sentence.trim())
  .filter(Boolean);

const collectManualStagingDirectives = (manualTopic) => {
  const global = [];
  const byPanel = new Map();

  splitDirectiveSentences(manualTopic).forEach((sentence) => {
    if (!STAGING_CUE_RE.test(sentence)) return;
    const panelNumbers = [...sentence.matchAll(PANEL_REF_RE)]
      .map((match) => PANEL_NUMBER[match[1]])
      .filter(Boolean);

    if (panelNumbers.length === 0) {
      global.push(sentence);
      return;
    }

    [...new Set(panelNumbers)].forEach((panelNumber) => {
      const existing = byPanel.get(panelNumber) || [];
      existing.push(sentence);
      byPanel.set(panelNumber, existing);
    });
  });

  return { global, byPanel };
};

export const applyManualStagingLocks = (scenario, manualTopic) => {
  const text = String(scenario || '');
  if (!text || text.includes(LOCK_MARKER)) return text;

  const directives = collectManualStagingDirectives(manualTopic);
  if (directives.global.length === 0 && directives.byPanel.size === 0) return text;

  let currentPanel = null;
  return text.split('\n').flatMap((line) => {
    const panelMatch = line.match(/^\[([1-4一二三四])\s*コマ目/u);
    if (panelMatch) currentPanel = PANEL_NUMBER[panelMatch[1]];
    if (!currentPanel || !/^\s*状況\s*[:：]/u.test(line)) return [line];

    const panelDirectives = [
      ...directives.global,
      ...(directives.byPanel.get(currentPanel) || [])
    ];
    if (panelDirectives.length === 0) return [line];

    return [line, `${LOCK_MARKER}: ${[...new Set(panelDirectives)].join(' ')}`];
  }).join('\n');
};
