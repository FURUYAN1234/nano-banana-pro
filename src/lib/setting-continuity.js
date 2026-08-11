const GENERIC_LOCATIONS = /^(?:unspecified|generic(?: detailed)? background|detailed background|AIおまかせ|ニュース内容に即した場所)$/i;

const SETTING_CUE_PATTERNS = [
  /早朝|朝日|午前|朝(?:[、。\s]|$)/,
  /正午|午後|日中|昼(?:[、。\s]|$)/,
  /夕方|夕暮れ|夕日|日没|黄昏/,
  /夜間|深夜|月明かり|夜(?:[、。\s]|$)/,
  /雨上がり|雨天|豪雨|小雨|土砂降り|雨(?:[、。\sの]|$)/,
  /降雪|吹雪|雪(?:[、。\sの]|$)/,
  /快晴|晴天|晴れ|青空/,
  /曇天|曇り|曇(?:[、。\sの]|$)/,
  /濃霧|霧(?:[、。\sの]|$)/,
];

const extractLocation = (scenario) => (
  String(scenario || '').match(/^Location\s*:\s*(.+)$/im)?.[1]?.trim() || ''
);

const extractSettingCues = (scenario) => SETTING_CUE_PATTERNS
  .map((pattern) => String(scenario || '').match(pattern)?.[0]?.trim())
  .filter(Boolean);

export const buildSettingContinuityLock = (scenario = '') => {
  const location = extractLocation(scenario);
  if (!location || GENERIC_LOCATIONS.test(location)) return '';

  const cues = [...new Set(extractSettingCues(scenario))];
  const cueClause = cues.length > 0
    ? ` Preserve only these explicitly scripted time/weather cues: ${cues.join(' / ')}.`
    : '';

  return `SETTING CONTINUITY (LOW PRIORITY): keep the declared Location "${location}" recognizable across panels.${cueClause} This rule is subordinate to CHARACTER ANATOMY, HAND/PROP OWNERSHIP, and DIALOGUE/BUBBLE ACCURACY; simplify or omit background detail whenever needed to keep people, hands, props, and dialogue correct.`;
};
