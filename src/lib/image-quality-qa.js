const ISSUE_TYPES = new Set([
  'anatomy',
  'hand_side',
  'prop_ownership',
  'bubble_text',
  'speaker_name',
  'extra_text',
  'unverified',
]);

const stripCodeFence = (value) => String(value || '')
  .trim()
  .replace(/^```(?:json)?\s*/i, '')
  .replace(/\s*```$/i, '')
  .trim();

const extractJsonObject = (value) => {
  const match = stripCodeFence(value).match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
};

const unverifiedIssue = (reason) => ({
  type: 'unverified',
  panel: null,
  subject: 'image quality review',
  reason,
});

const normalizeIssue = (issue) => {
  const panel = Number(issue?.panel);
  return {
    type: ISSUE_TYPES.has(issue?.type) ? issue.type : 'unverified',
    panel: Number.isInteger(panel) && panel >= 1 && panel <= 4 ? panel : null,
    subject: String(issue?.subject || '').trim(),
    reason: String(issue?.reason || '').trim() || 'Visible issue was not described.',
  };
};

export const buildImageQualityQaPrompt = ({ scenario = '', castList = '' } = {}) => `
You are the visible quality gate for a generated four-panel manga page. Inspect the supplied image panel by panel and compare it with the approved scenario and cast.

Fail only for a clearly visible issue in one of these types:
- anatomy: extra, missing, duplicated, detached, merged, or wrongly attached arms/hands; impossible limb connection.
- hand_side: an explicitly scripted left/right hand or arm is reversed, or a hand visually belongs to the wrong character.
- prop_ownership: a named prop is held, worn, used, or transferred by the wrong character, or connected to an impossible hand.
- bubble_text: scripted dialogue is missing, duplicated, paraphrased, assigned to the wrong bubble, or not printed exactly once.
- speaker_name: a speaker name prefix such as "アカリ:" or "アカリ「" is visibly printed inside a bubble instead of dialogue alone.
- extra_text: a bubble or panel contains metadata, Action/Camera/EMOTION/TAILS labels, prompt fragments, annotations, translations, or other unscripted text.
- unverified: panel anatomy or text is too cropped, obscured, or illegible to verify.

Do not fail the image for background detail or background continuity. Backgrounds are lower priority than people, hands, props, and dialogue. Do not infer a defect from ordinary perspective, foreshortening, occlusion, or cropping when the anatomy is still plausible. Report only visible evidence; do not invent hidden defects.

Return JSON only:
{"pass":true,"issues":[]}
or
{"pass":false,"issues":[{"type":"anatomy","panel":2,"subject":"character name or bubble","reason":"short concrete visible evidence"}]}

Approved scenario:
${String(scenario).slice(0, 14000)}

Approved cast:
${String(castList).slice(0, 8000)}
`.trim();

export const parseImageQualityQaResponse = (responseText) => {
  const parsed = extractJsonObject(responseText);
  if (!parsed || typeof parsed.pass !== 'boolean' || !Array.isArray(parsed.issues)) {
    return { pass: false, issues: [unverifiedIssue('Could not parse the visual QA response.')] };
  }

  const issues = parsed.issues.map(normalizeIssue);
  if (parsed.pass === false && issues.length === 0) {
    issues.push(unverifiedIssue('The reviewer rejected the image without a concrete issue.'));
  }
  return {
    pass: parsed.pass === true && issues.length === 0,
    issues,
  };
};

export const formatImageQualityIssue = (issue = {}) => (
  `panel ${issue.panel ?? 'unknown'} / ${issue.type || 'unverified'} / ${issue.subject || 'unspecified'}: ${issue.reason || 'no reason'}`
);
