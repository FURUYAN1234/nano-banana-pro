const normalizeDigits = (value) => String(value || '')
  .normalize('NFKC')
  .replace(/,(?=\d{3}(?:\D|$))/g, '');

const normalizeJapaneseClockTimes = (value) => normalizeDigits(value)
  .replace(/午後\s*(\d{1,2})\s*時/g, (_, hourText) => {
    const hour = Number(hourText);
    return `${hour >= 1 && hour < 12 ? hour + 12 : hour}時`;
  })
  .replace(/午前\s*(\d{1,2})\s*時/g, (_, hourText) => {
    const hour = Number(hourText);
    return `${hour === 12 ? 0 : hour}時`;
  })
  .replace(/\s+/g, '');

const FACTUAL_ANCHOR_RE = /\d{4}[-/]\d{1,2}[-/]\d{1,2}|\d+(?:\.\d+)?(?:時間|年間|ヶ月|か月|年|月|日|時|分|秒|人|件|個|円|歳|冊|台|回|割|%)/g;
const getRequiredJapaneseCoverage = (sourceLength, kind) => {
  if (sourceLength <= 220) return kind === 'term' ? 0.65 : 0.45;
  if (sourceLength <= 600) return kind === 'term' ? 0.4 : 0.25;
  return kind === 'term' ? 0.2 : 0.12;
};

const SOURCE_FACT_PREFIX = '[SOURCE FACT - INTERNAL, DO NOT PRINT]:';

const splitDocumentarySourceFacts = (sourceText) => {
  const normalized = normalizeDigits(sourceText).replace(/\s+/g, ' ').trim();
  if (!normalized) return [];
  return (normalized.match(/[^。！？!?]+[。！？!?]?/g) || [normalized])
    .map((fact) => fact.trim())
    .filter(Boolean);
};

export const attachDocumentarySourceFacts = (scenarioText = '', sourceText = '') => {
  const scenario = String(scenarioText || '').trim();
  if (!scenario || scenario.includes(SOURCE_FACT_PREFIX)) return scenario;

  const facts = splitDocumentarySourceFacts(sourceText);
  if (facts.length === 0) return scenario;

  const factsByPanel = [[], [], []];
  facts.forEach((fact, index) => {
    const panelIndex = Math.min(2, Math.floor(index * 3 / facts.length));
    factsByPanel[panelIndex].push(fact);
  });

  return factsByPanel.reduce((result, panelFacts, index) => {
    if (panelFacts.length === 0) return result;
    const panelHeader = new RegExp(`(\\[${index + 1}コマ目[^\\]]*\\]\\s*)`, 'i');
    if (!panelHeader.test(result)) return result;
    return result.replace(
      panelHeader,
      `$1\n${SOURCE_FACT_PREFIX} ${panelFacts.join(' ') }\n`
    );
  }, scenario);
};

const RELATIVE_EFFECTIVE_DATE_RE = /(?:今日|本日|今月|来月|今年|来年)から/g;

export const normalizeDocumentaryScenarioTimeline = (scenarioText = '', sourceText = '') => {
  const scenario = String(scenarioText || '');
  const source = normalizeDigits(sourceText);
  if (!scenario || !source || /(?:今日|本日|今月|来月|今年|来年)から/.test(source)) return scenario;

  const calendarAnchors = extractDocumentaryFactualAnchors(source)
    .filter((anchor) => /(?:年|月|日)$/.test(anchor));
  const uniqueCalendarAnchors = [...new Set(calendarAnchors)];
  if (uniqueCalendarAnchors.length !== 1) return scenario;
  return scenario.replace(RELATIVE_EFFECTIVE_DATE_RE, `${uniqueCalendarAnchors[0]}から`);
};

export const selectDocumentarySourceText = ({
  inputMode = '',
  manualTopic = '',
  extractedArticleText = ''
} = {}) => {
  if (inputMode !== 'manual') return '';
  return String(extractedArticleText || manualTopic || '').trim();
};

const normalizeForLexicalCoverage = (text) => normalizeJapaneseClockTimes(text)
  .replace(/[^0-9A-Za-zぁ-んァ-ヶー一-龯々]/g, '');

const getTrigramCoverage = (sourceText, scenarioText) => {
  const source = normalizeForLexicalCoverage(sourceText);
  const scenario = normalizeForLexicalCoverage(scenarioText);
  const japaneseChars = (source.match(/[ぁ-んァ-ヶー一-龯々]/g) || []).length;
  const enforced = source.length >= 24 && japaneseChars / Math.max(1, source.length) >= 0.5;
  if (!enforced) return { enforced: false, coverage: 1, requiredCoverage: 0 };

  const trigrams = [...new Set(Array.from(
    { length: Math.max(0, source.length - 2) },
    (_, index) => source.slice(index, index + 3)
  ))];
  const matched = trigrams.filter((trigram) => scenario.includes(trigram)).length;
  return {
    enforced: true,
    coverage: trigrams.length > 0 ? matched / trigrams.length : 1,
    requiredCoverage: getRequiredJapaneseCoverage(source.length, 'trigram')
  };
};

const getSourceTermCoverage = (sourceText, scenarioText) => {
  const source = normalizeForLexicalCoverage(sourceText);
  const scenario = normalizeForLexicalCoverage(scenarioText);
  const sourceTermBasis = normalizeJapaneseClockTimes(sourceText)
    .replace(/[^ァ-ヶー一-龯々]/g, ' ');
  const sourceTerms = [...new Set(sourceTermBasis.match(/[ァ-ヶー一-龯々]{2,}/g) || [])];
  const requiredSourceTerms = source.length <= 220
    ? sourceTerms.filter((term) => [...term].length >= 4)
    : [];
  const missingRequiredSourceTerms = requiredSourceTerms.filter((term) => !scenario.includes(term));
  const enforced = sourceTerms.length >= 3;
  if (!enforced) {
    return {
      enforced: false,
      coverage: 1,
      requiredCoverage: 0,
      sourceTerms,
      missingTerms: [],
      requiredSourceTerms,
      missingRequiredSourceTerms
    };
  }

  const missingTerms = sourceTerms.filter((term) => !scenario.includes(term));
  return {
    enforced: true,
    coverage: (sourceTerms.length - missingTerms.length) / sourceTerms.length,
    requiredCoverage: getRequiredJapaneseCoverage(source.length, 'term'),
    sourceTerms,
    missingTerms,
    requiredSourceTerms,
    missingRequiredSourceTerms
  };
};

export const extractDocumentaryFactualAnchors = (text) => {
  const normalized = normalizeJapaneseClockTimes(text);
  return [...new Set(normalized.match(FACTUAL_ANCHOR_RE) || [])];
};

export const validateDocumentarySourceFidelity = ({ sourceText = '', scenarioText = '' } = {}) => {
  const scenario = normalizeJapaneseClockTimes(scenarioText);
  const sourceAnchors = extractDocumentaryFactualAnchors(sourceText);
  const missingAnchors = sourceAnchors.filter((anchor) => !scenario.includes(anchor));
  const lexical = getTrigramCoverage(sourceText, scenarioText);
  const sourceTerms = getSourceTermCoverage(sourceText, scenarioText);
  const lexicalOk = !lexical.enforced || lexical.coverage >= lexical.requiredCoverage;
  const sourceTermsOk = !sourceTerms.enforced || sourceTerms.coverage >= sourceTerms.requiredCoverage;
  const requiredSourceTermsOk = sourceTerms.missingRequiredSourceTerms.length === 0;

  return {
    ok: missingAnchors.length === 0 && lexicalOk && sourceTermsOk && requiredSourceTermsOk,
    sourceAnchors,
    missingAnchors,
    sourceTerms: sourceTerms.sourceTerms,
    missingSourceTerms: sourceTerms.missingTerms,
    requiredSourceTerms: sourceTerms.requiredSourceTerms,
    missingRequiredSourceTerms: sourceTerms.missingRequiredSourceTerms,
    sourceTermCoverage: sourceTerms.coverage,
    requiredSourceTermCoverage: sourceTerms.requiredCoverage,
    lexicalCoverage: lexical.coverage,
    requiredLexicalCoverage: lexical.requiredCoverage,
    scenarioText
  };
};

export const assertDocumentarySourceFidelity = (input) => {
  const validation = validateDocumentarySourceFidelity(input);
  if (validation.ok) return true;

  const anchorIssue = validation.missingAnchors.length > 0
    ? `missing anchors: ${validation.missingAnchors.join(', ')}`
    : 'all numeric anchors present';
  const lexicalIssue = validation.lexicalCoverage < validation.requiredLexicalCoverage
    ? `source wording coverage ${(validation.lexicalCoverage * 100).toFixed(1)}% is below ${(validation.requiredLexicalCoverage * 100).toFixed(0)}%`
    : 'source wording coverage passed';
  const sourceTermIssue = validation.sourceTermCoverage < validation.requiredSourceTermCoverage
    ? `missing key source terms: ${validation.missingSourceTerms.slice(0, 12).join(', ')}; key term coverage ${(validation.sourceTermCoverage * 100).toFixed(1)}% is below ${(validation.requiredSourceTermCoverage * 100).toFixed(0)}%`
    : 'key source term coverage passed';
  const requiredTermIssue = validation.missingRequiredSourceTerms.length > 0
    ? `missing required source terms: ${validation.missingRequiredSourceTerms.slice(0, 12).join(', ')}`
    : 'all required source terms present';
  const error = new Error(`documentary source facts missing: ${anchorIssue}; ${requiredTermIssue}; ${sourceTermIssue}; ${lexicalIssue}`);
  error.code = 'DOCUMENTARY_SOURCE_FIDELITY';
  error.qualityScore = 0;
  error.validation = validation;
  throw error;
};

export const DOCUMENTARY_SOURCE_FIDELITY_RETRY_INSTRUCTION = `DOCUMENTARY SOURCE FIDELITY RETRY:
Rewrite the complete four-panel scenario from the original source. Preserve every source date, effective date, clock time, duration, quantity, percentage, price, count, and before/after value. Preserve the source's key factual nouns, causes, actions, announced measures, and outcomes verbatim whenever possible instead of replacing them with broader synonyms. Equivalent clock notation is allowed (for example, 午後8時 and 20時), but omission, substitution, vague wording such as 今日から, and changed chronology are forbidden. Do not add an unsupported date, number, event, cause, participant, or outcome. The fourth panel may change only the characters' serious or gag reaction required by the selected documentary mode; it must not change source facts.`;
