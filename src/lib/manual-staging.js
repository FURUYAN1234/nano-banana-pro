const STAGING_CUE_RE = /(?:話しかけ|語りかけ|呼びかけ|問いかけ|会話相手|聞き手|見つめ|視線|目線|向かい合|向き合|振り向|(?:を|へ|に)向(?:く|かう|ける|いて)|(?:読者|観客|視聴者|カメラ|画面)(?:正面)?(?:を|へ|に)?(?:見ない|向(?:く|かう|ける|いて))|(?:カメラ|画面)?正面.{0,8}(?:禁止|避け|向かない)|face(?:s|d|ing)?|look(?:s|ed|ing)?|gaze|eye[-\s]?line|address(?:es|ed|ing)?)/i;
const INTERPERSONAL_VIEW_CUE_RE = /(?:^|[。！？!?]\s*)[^\s、。！？!?]{1,24}(?:は|が)[^\s、。！？!?]{1,24}(?:を|へ|に)見(?:る|ない)(?:[、。！？!?]|$)/u;
const PANEL_REF_RE = /([1-4一二三四])\s*コマ目/gu;
const PANEL_NUMBER = { '1': 1, '2': 2, '3': 3, '4': 4, 一: 1, 二: 2, 三: 3, 四: 4 };
const LOCK_MARKER = '[USER STAGING LOCK - ABSOLUTE]';
const ONE_SHOT_BEAT_RE = /(?:上映(?:前|中|後)|その後|直後|最後(?:に|の)|やがて|翌日|初めて|瞬間|とき|時点)/u;

const splitDirectiveSentences = (manualTopic) => String(manualTopic || '')
  .split(/(?<=[。！？!?])\s*|\r?\n+/u)
  .map((sentence) => sentence.trim())
  .filter(Boolean);

const CAMERA_DIRECTIVE_RE = /(?:カメラ|画面|読者|観客)(?:正面|目線)?(?:を|へ|に|は)?(?:見ない|見るな|向かない|向く|向ける|禁止)|(?:カメラ|画面)正面.{0,8}(?:禁止|避け)|\b(?:look|face|gaze)\b.{0,20}\b(?:camera|viewer|audience)\b/i;
const PAGE_SCOPE_RE = /全コマ|各コマ|ページ全体|全編|\b(?:every|all) panels?\b|throughout the page/i;

const collectManualStagingDirectives = (manualTopic, scenario) => {
  const global = [];
  const byPanel = new Map();
  const speakers = [...String(scenario).matchAll(/^\s*([^\s「\[\]:：]+)\s*「/gm)].map(match => match[1]);
  const names = speakers.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const castMention = names.length ? new RegExp(`(?<![A-Za-z0-9_])(?:${names.join('|')})(?![A-Za-z0-9_])`, 'u') : null;

  splitDirectiveSentences(manualTopic).forEach((sentence) => {
    if (!STAGING_CUE_RE.test(sentence) && !INTERPERSONAL_VIEW_CUE_RE.test(sentence)) return;
    const panelNumbers = [...sentence.matchAll(PANEL_REF_RE)]
      .map((match) => PANEL_NUMBER[match[1]])
      .filter(Boolean);

    if (panelNumbers.length === 0) {
      // Topic prose is still passed to the scenario model as content. Only
      // explicit page/camera scope or a known actor can become a page-wide lock.
      // A topical verb such as "appeal" or "look" is not staging authority.
      if (!PAGE_SCOPE_RE.test(sentence) && !CAMERA_DIRECTIVE_RE.test(sentence) && !castMention?.test(sentence)) return;
      // A timed story beat belongs in the generated panel action selected by the
      // scenario model. Treating it as a page-wide camera/eye-line rule leaks a
      // reveal or ending into every panel.
      if (ONE_SHOT_BEAT_RE.test(sentence)) return;
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

  const directives = collectManualStagingDirectives(manualTopic, text);
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
