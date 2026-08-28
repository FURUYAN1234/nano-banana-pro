const freezeTechnique = (technique) => Object.freeze(technique);

export const CINEMATIC_TECHNIQUES = Object.freeze([
  freezeTechnique({
    id: 'frame_within_frame',
    risk: 'low',
    cue: /窓|扉|ドア|門|アーチ|棚|カーテン|フェンス|肩越し|window|door|arch|shelf|curtain|fence|shoulder/i,
    compact: 'frame-edge depth'
  }),
  freezeTechnique({
    id: 'foreground_occlusion',
    risk: 'low',
    cue: /前景|手前|肩越し|覗|foreground|over.the.shoulder|peek/i,
    compact: 'edge foreground'
  }),
  freezeTechnique({
    id: 'gobo_shadow',
    risk: 'low',
    cue: /ブラインド|格子|木漏れ日|葉.{0,8}影|フェンス.{0,8}影|舞台照明|blind|lattice|foliage shadow|gobo/i,
    compact: 'patterned light'
  }),
  freezeTechnique({
    id: 'atmospheric_perspective',
    risk: 'low',
    cue: /遠景|街全体|都市|山|海|地平線|廊下|ドローン|俯瞰|wide|city|mountain|horizon|corridor|drone|aerial/i,
    compact: 'aerial depth haze'
  }),
  freezeTechnique({
    id: 'story_reflection',
    risk: 'high',
    cue: /鏡|窓ガラス|ガラス壁|水面|水たまり|磨かれた床|mirror|window glass|puddle|water surface|polished floor/i,
    compact: 'same-cast reflection'
  }),
  freezeTechnique({
    id: 'split_diopter',
    risk: 'medium',
    cue: /前景.{0,40}(?:遠景|奥)|手前.{0,40}(?:遠く|奥)|near.{0,40}far|foreground.{0,40}background/i,
    compact: 'near-far focus'
  }),
  freezeTechnique({
    id: 'shutter_drag',
    risk: 'medium',
    cue: /走|疾走|追跡|電車|車|群衆|雨.{0,12}流|panning|tracking|running|train|traffic|crowd/i,
    compact: 'sharp face motion trails'
  }),
  freezeTechnique({
    id: 'prism_refraction',
    risk: 'high',
    cue: /プリズム|水晶|結晶|ガラス越し|水越し|prism|crystal|through glass|through water/i,
    compact: 'edge glass refraction'
  }),
  freezeTechnique({
    id: 'tilt_shift',
    risk: 'medium',
    cue: /ドローン俯瞰|鳥瞰|バードアイ|真上.{0,16}街|aerial|drone|bird.?s.eye/i,
    compact: 'miniature aerial depth'
  })
]);

const RISK_ORDER = Object.freeze({ low: 0, medium: 1, high: 2 });
const DETAIL_OR_TEXT_PRIORITY_RE = /手元|超接写|マクロ|Deep Emotion Close|hand.detail|macro|extreme close|文字を読む|小さな文字|契約書|書類の文字|readable text/i;
const SINGLE_IMAGE_CINEMATIC_ROUTER = 'CINEMATIC DEPTH ROUTER: Never default to a flat, eye-level, center-framed shot. If one existing physical scene cue supports one optional frame, shadow, depth, or optic, use one. Do not invent source or obscure/duplicate/reflect/refract/blur faces/hands/text/props. Otherwise keep the baseline camera. User camera, cast, action, anatomy, and text win.';

export const selectPageCinematicTechniques = (panels, { location = '' } = {}) => {
  if (!Array.isArray(panels)) return [];

  const candidates = [];
  panels.forEach((panel, panelIndex) => {
    const panelText = String(panel || '').trim();
    if (!panelText || DETAIL_OR_TEXT_PRIORITY_RE.test(panelText)) return;

    const searchableText = `${location}\n${panelText}`;
    CINEMATIC_TECHNIQUES.forEach((technique, techniqueIndex) => {
      if (!technique.cue.test(searchableText)) return;
      candidates.push({
        ...technique,
        panelNumber: panelIndex + 1,
        techniqueIndex
      });
    });
  });

  candidates.sort((left, right) => (
    RISK_ORDER[left.risk] - RISK_ORDER[right.risk]
    || left.panelNumber - right.panelNumber
    || left.techniqueIndex - right.techniqueIndex
  ));

  const selected = [];
  const selectedIds = new Set();
  const selectedPanels = new Set();
  for (const candidate of candidates) {
    if (selected.length >= 2) break;
    if (selectedIds.has(candidate.id) || selectedPanels.has(candidate.panelNumber)) continue;
    const { techniqueIndex: _techniqueIndex, ...assignment } = candidate;
    selected.push(assignment);
    selectedIds.add(candidate.id);
    selectedPanels.add(candidate.panelNumber);
  }

  return selected.sort((left, right) => left.panelNumber - right.panelNumber);
};

export const formatCinematicTechniqueSlot = (assignments, maxLength) => {
  if (!Array.isArray(assignments) || assignments.length === 0 || !Number.isInteger(maxLength) || maxLength <= 0) {
    return '';
  }

  const parts = assignments
    .slice(0, 2)
    .map(({ panelNumber, compact }) => `P${panelNumber} ${String(compact || '').trim()}`)
    .filter((part) => !/\s$/.test(part) && part.length > 3);

  while (parts.length > 0) {
    const mapping = `CINE: ${parts.join('; ')}`;
    const guarded = `${mapping}; script/anatomy/text win`;
    if (guarded.length <= maxLength) return guarded;
    if (mapping.length <= maxLength) return mapping;
    parts.pop();
  }

  return '';
};

export const replaceCinematicSlotWithinBudget = (baseline, slot, replacement) => {
  const source = String(baseline || '');
  const existingSlot = String(slot || '');
  const candidate = String(replacement || '');
  if (!existingSlot || !candidate || !source.includes(existingSlot) || candidate.length > existingSlot.length) {
    return source;
  }

  const replaced = source.replace(existingSlot, candidate);
  return replaced.length <= source.length ? replaced : source;
};

export const buildSingleImageCinematicRouter = (maxLength) => (
  Number.isInteger(maxLength) && maxLength > 0 && SINGLE_IMAGE_CINEMATIC_ROUTER.length <= maxLength
    ? SINGLE_IMAGE_CINEMATIC_ROUTER
    : ''
);
