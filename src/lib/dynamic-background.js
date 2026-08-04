import { isSafeLocationContent } from './location-policy.js';

const FIELD_LABELS = {
  space: 'BackgroundSpace',
  layers: 'BackgroundLayers',
  lighting: 'BackgroundLighting',
  atmosphere: 'BackgroundAtmosphere',
  anchors: 'BackgroundAnchors',
  interactions: 'BackgroundInteractions',
  avoid: 'BackgroundAvoid'
};

const normalizeList = (value) => [...new Set(String(value || '')
  .normalize('NFKC')
  .replace(/^[\[【]|[\]】]$/g, '')
  .split(/[、,，／/|]/)
  .map((item) => item.trim().replace(/^[-・\d.\s]+/, ''))
  .filter((item) => item.length >= 2))];

const extractField = (text, label) => (
  String(text || '').match(new RegExp(`^${label}\\s*:\\s*(.+)$`, 'im'))?.[1]?.trim() || ''
);

const CONTINUITY_GROUPS = {
  time: [
    /早朝|午前|朝日|朝(?:[、。\s]|$)/,
    /正午|午後|日中|昼(?:[、。\s]|$)/,
    /夕方|夕暮れ|夕日|日没|黄昏|GOLDEN_HOUR/i,
    /夜間|深夜|月明かり|夜(?:[、。\s]|$)/
  ],
  weather: [
    /快晴|晴天|晴れ|青空/,
    /雨天|豪雨|小雨|土砂降り|雨(?:[、。\sの]|$)/,
    /降雪|吹雪|雪(?:[、。\sの]|$)/,
    /曇天|曇り|曇(?:[、。\sの]|$)/,
    /濃霧|霧(?:[、。\sの]|$)/
  ]
};

const hasContinuityConflict = (declared, scenario, groups) => {
  const declaredGroups = groups
    .map((pattern, index) => (pattern.test(String(declared || '')) ? index : -1))
    .filter((index) => index >= 0);
  if (declaredGroups.length !== 1) return false;
  return groups.some((pattern, index) => index !== declaredGroups[0] && pattern.test(String(scenario || '')));
};

export const parseDynamicBackground = (text = '') => {
  const design = Object.fromEntries(
    Object.entries(FIELD_LABELS).map(([key, label]) => [key, extractField(text, label)])
  );
  design.anchors = normalizeList(design.anchors);
  design.interactions = normalizeList(design.interactions);
  return design;
};

export const formatDynamicBackground = (design = {}) => (
  Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = Array.isArray(design[key]) ? design[key].join('、') : String(design[key] || '').trim();
      return value ? `${label}: ${value}` : '';
    })
    .filter(Boolean)
    .join('\n')
);

export const validateDynamicBackground = ({ location = '', backgroundDesign = {}, scenario = '' } = {}) => {
  const design = backgroundDesign && typeof backgroundDesign === 'object'
    ? backgroundDesign
    : parseDynamicBackground(backgroundDesign);
  const issueCodes = [];
  const genericLocation = /^(?:generic(?: detailed)? background|detailed background|unspecified|AIおまかせ|ニュース内容に即した場所)$/i;
  const textFields = ['space', 'layers', 'lighting', 'atmosphere', 'avoid'];

  if (!String(location).trim() || genericLocation.test(String(location).trim())) issueCodes.push('background_location_concrete');
  for (const field of textFields) {
    if (String(design[field] || '').trim().length < 6) issueCodes.push(`background_${field}_missing`);
  }
  if (!/前景/.test(design.layers || '') || !/中景/.test(design.layers || '') || !/後景/.test(design.layers || '')) {
    issueCodes.push('background_layers_incomplete');
  }
  if (!Array.isArray(design.anchors) || design.anchors.length < 2 || design.anchors.length > 3) {
    issueCodes.push('background_anchor_count');
  }
  if (!Array.isArray(design.interactions) || design.interactions.length < 2 || design.interactions.length > 5) {
    issueCodes.push('background_interaction_count');
  }

  if (hasContinuityConflict(design.lighting, scenario, CONTINUITY_GROUPS.time)) {
    issueCodes.push('background_time_conflict');
  }
  if (hasContinuityConflict(design.lighting, scenario, CONTINUITY_GROUPS.weather)) {
    issueCodes.push('background_weather_conflict');
  }

  // BackgroundAvoid is a negative instruction and is expected to name hazards
  // such as "horror" or "body interiors".  Validate the pictured setting,
  // not the words that explicitly forbid it.
  const { avoid: _avoid, ...picturedDesign } = design;
  if (!isSafeLocationContent(location, picturedDesign)) issueCodes.push('background_unsafe');

  return {
    ok: issueCodes.length === 0,
    design,
    coveredPanels: 0,
    usedAnchors: [],
    issueCodes: [...new Set(issueCodes)]
  };
};

export const assertDynamicBackground = (parsedScenario) => {
  const validation = validateDynamicBackground(parsedScenario);
  if (!validation.ok) {
    const error = new Error(`dynamic_background_invalid: ${validation.issueCodes.join(', ')}`);
    error.validation = validation;
    throw error;
  }
  return true;
};

export const DYNAMIC_BACKGROUND_RETRY_INSTRUCTION = `DYNAMIC BACKGROUND RETRY:
The previous scenario lacked a complete, safe, reusable background design. Regenerate the complete response.
Choose one concrete story-fit Location and output every Background field exactly once. BackgroundLayers must explicitly name 前景, 中景, and 後景. BackgroundAnchors must contain 2 or 3 short drawable objects, and BackgroundInteractions must contain 2 to 5 usable props or surfaces. Copy at least one exact BackgroundAnchors word into the visual situation/action text of EVERY panel, using at least two distinct anchors overall. Keep location, architecture, time/weather, and the main light source consistent across all four panels; never introduce a different time-of-day or weather word in a later panel. Do not use a preset catalogue, generic background, horror, gore, body interiors, or biological scenery.`;

export const buildDynamicBackgroundLock = (scenario = '') => {
  const design = parseDynamicBackground(scenario);
  if (design.anchors.length < 2) return '';
  return `DYNAMIC BACKGROUND CONTINUITY LOCK: all four panels remain in the Location declared by the approved scenario. Preserve this generated environment instead of substituting a generic backdrop. SPACE: ${design.space}. LAYERS: ${design.layers}. LIGHTING/TIME/WEATHER: ${design.lighting}. ATMOSPHERE: ${design.atmosphere}. FIXED ANCHORS: ${design.anchors.map((item) => `"${item}"`).join(' / ')}; visibly retain at least one fixed anchor in EVERY panel and preserve at least two distinct anchors across the page. INTERACTION PROPS/SURFACES: ${design.interactions.map((item) => `"${item}"`).join(' / ')}. AVOID: ${design.avoid}. Never change location, architecture, time of day, weather, or primary light direction between panels.`;
};
