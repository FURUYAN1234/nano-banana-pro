const normalizeEvidence = (value) => String(value || '')
  .normalize('NFKC')
  .replace(/^[\[【]|[\]】]$/g, '')
  .split(/[、,，／/|]/)
  .map((item) => item.trim().replace(/^[-・\d.\s]+/, ''))
  .filter((item) => item.length >= 2);

const extractPanels = (scenario) => (
  String(scenario || '').match(/\[\d+コマ目[^\]]*\][\s\S]*?(?=\[\d+コマ目[^\]]*\]|$)/g) || []
);

export const VISUAL_STORY_EVIDENCE_RETRY_INSTRUCTION = `VISUAL STORY EVIDENCE RETRY:
The previous scenario did not visually prove its central event.
Output VisualEvidence with 3 to 5 short, concrete, drawable nouns derived from the actual topic. Copy those exact nouns into the visual situation/action text across at least two different panels. Use at least two distinct evidence items overall. Do not replace the topic, cast, dialogue format, location, or four-panel structure.`;

export const validateVisualStoryEvidence = ({ visualEvidence = '', scenario = '' } = {}) => {
  const evidence = [...new Set(normalizeEvidence(visualEvidence))];
  const panels = extractPanels(scenario);
  const coveredPanels = panels.filter((panel) => evidence.some((item) => panel.includes(item)));
  const usedEvidence = evidence.filter((item) => panels.some((panel) => panel.includes(item)));
  const issueCodes = [];

  if (evidence.length < 3 || evidence.length > 5) issueCodes.push('visual_evidence_count');
  if (coveredPanels.length < 2) issueCodes.push('visual_evidence_panel_coverage');
  if (usedEvidence.length < 2) issueCodes.push('visual_evidence_variety');

  return {
    ok: issueCodes.length === 0,
    evidence,
    coveredPanels: coveredPanels.length,
    usedEvidence,
    issueCodes
  };
};

export const assertVisualStoryEvidence = (parsedScenario) => {
  const validation = validateVisualStoryEvidence(parsedScenario);
  if (!validation.ok) {
    const error = new Error(`visual_story_evidence_missing: ${validation.issueCodes.join(', ')}`);
    error.validation = validation;
    throw error;
  }
  return true;
};
