const UNPARSEABLE_ISSUE = {
  panel: null,
  subject: '',
  reason: 'Unparseable visual QA response'
};

const stripCodeFence = (value) => String(value || '')
  .trim()
  .replace(/^```(?:json)?\s*/i, '')
  .replace(/\s*```$/i, '')
  .trim();

const extractJsonObject = (value) => {
  const stripped = stripCodeFence(value);
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const normalizeIssue = (issue) => ({
  panel: Number.isInteger(Number(issue?.panel)) ? Number(issue.panel) : null,
  subject: String(issue?.subject || '').trim(),
  reason: String(issue?.reason || '').trim() || 'Unspecified visual anatomy issue'
});

export const buildImageAnatomyQaPrompt = ({ scenario = '', castList = '' } = {}) => `
You are a strict visual QA reviewer. Inspect the supplied four-panel manga image panel-by-panel.

Reject only clearly visible anatomy failures: an extra arm or hand, a missing required arm or hand, a detached limb, an arm attached to the wrong body, or an impossible hand/prop connection. Do not reject ordinary occlusion, cropping, or a hand hidden behind a correctly attached arm.

Return JSON only, without commentary or Markdown:
{"pass":true,"issues":[]}
or
{"pass":false,"issues":[{"panel":2,"subject":"character name if identifiable","reason":"short visible anatomy failure"}]}

Scenario context:
${String(scenario).slice(0, 12000)}

Cast context:
${String(castList).slice(0, 8000)}
`.trim();

export const parseImageAnatomyQaResponse = (responseText) => {
  const parsed = extractJsonObject(responseText);
  if (!parsed || typeof parsed.pass !== 'boolean' || !Array.isArray(parsed.issues)) {
    return { pass: false, issues: [UNPARSEABLE_ISSUE] };
  }

  const issues = parsed.issues.map(normalizeIssue);
  return {
    pass: parsed.pass === true && issues.length === 0,
    issues
  };
};

export const buildImageAnatomyRetryPrompt = (approvedPrompt, issues = []) => {
  const issueSummary = issues.length
    ? issues.map((issue) => `panel ${issue.panel ?? 'unknown'} ${issue.subject || 'character'}: ${issue.reason}`).join(' | ')
    : 'the prior visual QA could not verify the image';

  return `${String(approvedPrompt || '').trim()}

VISUAL QA RETRY LOCK: Regenerate the same approved manga. Correct this observed visual QA failure: ${issueSummary}. Every visible character has exactly two arms and two hands, continuously attached to that character's shoulders. Never add, duplicate, detach, merge, or hide an extra limb to satisfy an action. Preserve the approved story, cast, dialogue, composition, and all other locks.`;
};
