const ISSUE_TYPES = new Set([
  'anatomy',
  'hand_side',
  'prop_ownership',
  'prop_orientation',
  'camera_geometry',
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

const extractFinalPromptGeometry = (finalPrompt) => String(finalPrompt || '')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => /^(?:## Panel\s+\d+|Camera:|COMPOSITION STAGING:|FUNCTIONAL SURFACE|EYE-LINE LOCK:|VISIBLE REAR DEPTH CHECK:|OTS FUNCTIONAL FACE CONSEQUENCE:|Action \(visual only\):)/i.test(line))
  .join('\n')
  .slice(0, 10000);

export const buildImageQualityQaPrompt = ({ scenario = '', castList = '', finalPrompt = '' } = {}) => `
You are the visible quality gate for a generated four-panel manga page. Inspect the supplied image panel by panel and compare it with the approved scenario and cast.

Fail only for a clearly visible issue in one of these types:
- anatomy: extra, missing, duplicated, detached, merged, or wrongly attached arms/hands; impossible limb connection.
- hand_side: an explicitly scripted left/right hand or arm is reversed, or a hand visually belongs to the wrong character.
- prop_ownership: a named prop is held, worn, used, or transferred by the wrong character, or connected to an impossible hand.
- prop_orientation: after resolving the action target, a direction-dependent information, control, optical, or service face—including a screen, monitor, phone, nameplate, sign, label, document, form, printed page, card, book, or map—visibly faces away from the actual operator, customer, or intended reader, room audience, or photographed subject. This is functional prop geometry, not background-detail grading. Seeing a front face from physically behind its actual reader/operator is correct, not a defect. Do not fail when the script explicitly presents that functional face to the camera or viewer; in that case the camera is the intended recipient.
- camera_geometry: an explicitly named rear/over-the-shoulder character is instead shown front-on, or the required rear head/shoulder foreground and camera side are visibly reversed.
- bubble_text: scripted dialogue is missing, duplicated, paraphrased, assigned to the wrong bubble, or not printed exactly once.
- speaker_name: a speaker name prefix such as "アカリ:" or "アカリ「" is visibly printed inside a bubble instead of dialogue alone.
- extra_text: a bubble or panel contains metadata, Action/Camera/EMOTION/TAILS labels, prompt fragments, annotations, translations, or other unscripted text.
- unverified: panel anatomy or text is too cropped, obscured, or illegible to verify.

Do not fail the image for background detail or background continuity. Backgrounds are lower priority than people, hands, functional prop orientation, and dialogue. A clearly wrong readable-face direction is a prop geometry defect even when the object sits on a counter or in the setting; it is not incidental background-detail grading. Do not infer a defect from ordinary perspective, foreshortening, occlusion, or cropping when the geometry is still plausible. Report only visible evidence; do not invent hidden defects.

For each panel, first identify the camera side and derive the target from the scripted action, not from the holder. Read or operate means self is the target; submit, present, or show means the recipient is the target; an explicit presentation to the camera means the camera is the target. If the submitted prompt puts the camera physically behind a named character's shoulder, that character must appear as rear/OTS foreground. If the rear/OTS character is visibly front-on, report camera_geometry.

CRITICAL OTS PROJECTION RULE: the viewer IS the camera. Behind the reader means the reader's eyes and camera/viewer are on the same side of the screen/page plane, so its front MUST be visible to both. When the image shows the back of the actual reader/operator's head or shoulder in the foreground and the screen/page front beyond their hands, that is correct over-the-shoulder geometry and MUST PASS prop_orientation. Never report that only the reader, but not the viewer, should see that front; the viewer shares the reader-side viewpoint. Do not report prop_orientation for that correct OTS projection.

A tabletop document, form, book, map, or card may correctly be face-up and visible from an overhead camera; judge whether its text baseline is upright toward the intended reader, not whether the printed surface is visible at all. For a vertical surface, if the intended reader and camera are on opposite sides but its visible front faces camera, report prop_orientation. Do not accept a camera-facing screen or sign merely because its content is legible, and do not reject a correctly targeted visible face merely because the camera can read it.

Return JSON only:
{"pass":true,"issues":[]}
or
{"pass":false,"issues":[{"type":"anatomy","panel":2,"subject":"character name or bubble","reason":"short concrete visible evidence"}]}

Approved scenario:
${String(scenario).slice(0, 14000)}

Approved cast:
${String(castList).slice(0, 8000)}

Submitted final image prompt (camera and geometry source of truth):
${extractFinalPromptGeometry(finalPrompt)}
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
