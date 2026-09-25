import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildImageQualityQaImageParts,
  buildImageQualityQaPrompt,
  buildCriticalCameraQaPrompt,
  parseCriticalCameraQaResponse,
  hasCriticalRearCameraContract,
  formatImageQualityIssue,
  parseImageQualityQaResponse,
  buildImageQualityComparisonPrompt,
  parseImageQualityComparison,
  extractPanelCastContracts,
  applyBubbleInventory,
} from '../src/lib/image-quality-qa.js';

const EXPLICIT_REAR_PROMPT = `## Panel 2
Camera: Over The Shoulder
EXPLICIT REAR CAMERA: VISIBLE REAR DEPTH CHECK: camera is physically behind [ヒカリ]'s shoulder; show the back of [ヒカリ]'s head or shoulder foreground. Do NOT show [ヒカリ]'s face front-on.
Action (visual only): [アカリ] faces [ヒカリ].`;

test('critical camera audit is scoped only to an explicit rear-camera contract', () => {
  assert.equal(hasCriticalRearCameraContract(EXPLICIT_REAR_PROMPT), true);
  assert.equal(hasCriticalRearCameraContract('## Panel 2\nCamera: eye-level two-shot'), false);
  const prompt = buildCriticalCameraQaPrompt({ finalPrompt: EXPLICIT_REAR_PROMPT, panelCropCount: 4 });
  assert.match(prompt, /Panel 2/);
  assert.match(prompt, /physically behind \[ヒカリ\]'s shoulder/);
  assert.match(prompt, /rear_head_or_shoulder_foreground/);
  assert.match(prompt, /front_on/);
  assert.match(prompt, /second attached image is the enlarged crop for panel 1/i);
});

test('critical camera audit converts a front-on OTS subject into a concrete camera defect', () => {
  const review = parseCriticalCameraQaResponse(JSON.stringify({ checks: [{
    panel: 2,
    rear_subject: 'ヒカリ',
    rear_head_or_shoulder_foreground: 'absent',
    face_orientation: 'front_on',
    camera_side: 'in_front_of_subject',
    evidence: 'Both eyes and the full face of Hikari are visible next to Akari; no rear head or shoulder overlaps the foreground.',
  }] }), { finalPrompt: EXPLICIT_REAR_PROMPT });
  assert.equal(review.pass, false);
  assert.equal(review.issues.length, 1);
  assert.equal(review.issues[0].type, 'camera_geometry');
  assert.equal(review.issues[0].panel, 2);
  assert.match(review.issues[0].reason, /front_on/);
});

test('critical camera audit keeps ambiguous pixels unverified instead of inventing a defect', () => {
  const review = parseCriticalCameraQaResponse(JSON.stringify({ checks: [{
    panel: 2,
    rear_subject: 'ヒカリ',
    rear_head_or_shoulder_foreground: 'uncertain',
    face_orientation: 'uncertain',
    camera_side: 'uncertain',
    evidence: 'The crop is too small to distinguish the shoulder plane.',
  }] }), { finalPrompt: EXPLICIT_REAR_PROMPT });
  assert.equal(review.pass, false);
  assert.equal(review.issues[0].type, 'unverified');
});

test('direct comparison fixes image order and defaults uncertain judgments to original', () => {
  const prompt = buildImageQualityComparisonPrompt({ scenario: '台詞原文', finalPrompt: 'approved prompt' });
  assert.match(prompt, /Image 1 is the original; image 2 is the repair/);
  assert.match(prompt, /台詞原文/);
  assert.equal(parseImageQualityComparison('{"preferred":"repair","reason":"fixed hand"}').preferred, 'repair');
  for (const response of ['bad JSON', '{"preferred":"tie"}', '{"preferred":"repair","reason":""}', '{"preferred":"original","reason":"better text"}']) {
    assert.equal(parseImageQualityComparison(response).preferred, 'original');
  }
});

const SINGLE_IMAGE_PROMPT = `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE breathtaking illustration.`;

// Synthetic reviewer responses test schema/continuation, not vision accuracy.
const spatialChecks = (count = 4) => Array.from({ length: count }, (_, index) => ({
  panel: index + 1,
  bubble_speaker: { status: 'not_applicable', evidence: 'No speech bubble is visible in this panel.', bubbles: [] },
  camera_geometry: { status: 'ok', evidence: 'Head tops/table top, rear-left overlap, full figure; no lens specified.', dimensions: {
    elevation: { requested: 'overhead', observed: 'head tops and broad table top', status: 'ok' },
    azimuth: { requested: 'rear-left', observed: 'left rear shoulder overlaps partner', status: 'ok' },
    framing: { requested: 'full body', observed: 'head and both shoes inside panel', status: 'ok' },
    lens: { requested: 'unspecified', observed: 'ordinary depth, no required lens effect', status: 'not_applicable' },
    boundary: { requested: 'clean panel containment or intentional breakout', observed: 'head silhouette is continuous and the panel rule stays behind it', status: 'ok' },
  } },
  object_geometry: { status: 'ok', evidence: 'The page is in front of the hand; the rear finger contour is hidden at its edge.' },
  hand_geometry: { status: 'ok', evidence: 'The prominent open hand resolves as one thumb and four fingers.', hands: [{
    subject: 'actor open hand', location: 'panel foreground', pose: 'open toward camera', visible_digits: 5, occluded_digits: 0,
    observed_endpoint: 'hand', wrist_palm_connection: 'clear', palm_evidence: 'A palm plane is visibly joined to the wrist and five digits.',
    status: 'ok', evidence: 'One thumb and four separate finger contours are visible and connect to the palm.',
  }] },
  surface_text: {
    status: 'ok',
    evidence: 'The heading follows the visible page corners and tilt; the thin page edges are separate.',
    printed_surfaces: [{ subject: 'page', face: 'page', object_axes: 'top edge tilts right', glyph_axes: 'glyph tops tilt with page top', expected_axes: 'same tilt as page top', basis: 'explicit_contract', status: 'ok' }],
    visible_texts: [{ subject: 'page', text: 'approved heading', text_role: 'story_required', text_role_reason: 'explicit requested heading' }],
  },
  prop_orientation: { status: 'ok', evidence: 'The reader and overhead camera are on the printed side of the page; text points toward the reader.', surfaces: [{
    subject: 'page', visible_face: 'front', cues: ['printed_content'], camera_side: 'same_half_space',
    visual_evidence: 'Printing appears within the page edges.', target_evidence: 'Reader and camera are both above the page.',
  }] },
}));
const observations = { title: 'No title requested', dialogue: 'Panels 1-4 have no bubbles as requested', hands: 'No hand side requested', props: 'Paper held at its lower edge' };

test('silent scene does not require a per-bubble tail inventory', () => {
  const checks = spatialChecks(1);
  checks[0].bubble_speaker = {
    status: 'ok',
    evidence: 'No speech bubble is visible in this silent scene.',
    bubbles: [],
    left_to_right_texts: [],
  };
  const review = parseImageQualityQaResponse(JSON.stringify({
    pass: true,
    issues: [],
    observations,
    spatial_checks: checks,
  }), { mode: 'single-image' });

  assert.equal(review.pass, true);
  assert.ok(!review.issues.some(issue => issue.type === 'bubble_speaker'));
});

test('Gemini reviewer romanization of an established cast name does not trigger a repair', () => {
  const finalPrompt = `Cast:
- Character [リン (Rin)]: brown twintails
## Panel 1
Dialogue (ONLY inside bubbles): TEXT (PRINT VALUES ONLY): B1="この本の山、私の資産です。". TAIL TIP LOCK: B1=>[リン] mouth/head.
## Panel 2
Dialogue: silent
## Panel 3
Dialogue: silent
## Panel 4
Dialogue: silent`;
  const checks = spatialChecks();
  checks[0].bubble_speaker = {
    status: 'ok',
    evidence: 'The visible tail reaches Rin.',
    left_to_right_texts: ['この本の山、私の資産です。'],
    bubbles: [{
      bubble: 'B1',
      text: 'この本の山、私の資産です。',
      expected_speaker: 'Rin',
      observed_tail_target: 'Rin',
      tail_endpoint_evidence: 'The tip touches Rin\'s head silhouette.',
      endpoint_relation: 'touches_speaker',
      tail_tip: {x: 0.5, y: 0.3},
      speaker_anchor: {x: 0.51, y: 0.31, part: 'head'},
      root_relation: 'lower_speaker_facing',
      path_relation: 'clear',
      tail_path_evidence: 'The tail starts below center and crosses no face, hair, or text.',
      center_x: 0.7,
      position_evidence: 'The balloon center is in the right side negative space.',
    }],
  };
  const review = parseImageQualityQaResponse(JSON.stringify({
    pass: true,
    issues: [],
    observations,
    spatial_checks: checks,
  }), {finalPrompt});

  assert.equal(review.pass, true);
  assert.ok(!review.issues.some(issue => issue.type === 'bubble_speaker'));
});

test('reading order rejects reversed balloon bodies even when text and speaker tails pass', () => {
  const review = (positions, mode) => {
    const checks = spatialChecks(mode === 'single-image' ? 1 : 4);
    checks[0].bubble_speaker = { status: 'ok', evidence: 'Tails reach the correct speakers.', bubbles: positions.map((x, i) => ({
      bubble: `B${i + 1}`, text: `line ${i + 1}`, expected_speaker: `actor ${i}`, observed_tail_target: `actor ${i}`,
      tail_endpoint_evidence: 'Tail meets the visible head.', center_x: x, position_evidence: `Balloon body at horizontal fraction ${x}`,
    })).reverse() };
    return parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { mode });
  };
  assert.equal(review([0.8, 0.5, 0.2]).pass, true);
  for (const positions of [[0.2, 0.8], [0.8, 0.2, 0.5]]) {
    const result = review(positions);
    assert.equal(result.pass, false);
    assert.ok(result.issues.some(issue => issue.type === 'bubble_order' && issue.panel === 1));
  }
  for (const positions of [[undefined, 0.2], [0.5, 0.5], [1.2, 0.2]]) {
    const result = review(positions);
    assert.equal(result.pass, false);
    assert.ok(result.issues.some(issue => issue.type === 'unverified' && issue.subject === 'bubble_order'));
    assert.ok(!result.issues.some(issue => issue.type === 'bubble_order'));
  }
  assert.equal(review([0.2]).pass, true);
  assert.equal(review([0.2, 0.8], 'single-image').pass, true);
});

test('physical text order overrides reviewer PASS and invented correct B coordinates', () => {
  const finalPrompt = '## Panel 1\nDialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="先に話す。"; B2="返事する。".\n## Panel 2\nDialogue: silent';
  const review = texts => {
    const checks = spatialChecks();
    checks[0].bubble_speaker = { status: 'ok', evidence: 'Reviewer claims correct order.', left_to_right_texts: texts,
      bubbles: ['先に話す。', '返事する。'].map((text, i) => ({
        bubble: `B${i + 1}`, text, expected_speaker: 'A', observed_tail_target: 'A', tail_endpoint_evidence: 'Tail reaches A.',
        endpoint_relation: 'touches_speaker', tail_tip: { x: 0.5, y: 0.5 }, speaker_anchor: { x: 0.51, y: 0.51, part: 'head' },
        root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'Root starts below center and the path stays in empty space.',
        center_x: i ? 0.3 : 0.7, position_evidence: 'Reviewer copied slots.',
      })) };
    return parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  };
  assert.equal(review(['返事する。', '先に話す。']).pass, true);
  const reversed = review(['先に話す。', '返事する。']);
  assert.equal(reversed.pass, false);
  assert.ok(reversed.issues.some(issue => issue.type === 'bubble_order'));
  const punctuationDrift = review(['先に話す。', '返事するー！']);
  assert.equal(punctuationDrift.pass, false);
  assert.ok(
    punctuationDrift.issues.some(issue => issue.type === 'bubble_order'),
    'benign OCR punctuation drift must not downgrade a visible reversed order to unverified'
  );
  for (const texts of [undefined, [], ['先に話す。'], ['違う。', '先に話す。']]) {
    assert.ok(review(texts).issues.some(issue => issue.type === 'unverified' && issue.subject === 'bubble_order'));
  }
});

test('camera PASS needs separate grounded dimensions and cannot mask a failed lens or side', () => {
  const checks = spatialChecks();
  checks[0].camera_geometry = { status: 'ok', evidence: 'All camera work is correct.' };
  const missing = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(missing.pass, false);
  assert.ok(missing.issues.some(issue => issue.subject === 'camera_geometry'));
  const dimensions = Object.fromEntries(['elevation', 'azimuth', 'framing', 'lens'].map(axis => [axis, { requested: 'explicit source direction', observed: 'specific visible geometry', status: 'ok' }]));
  for (const axis of ['azimuth', 'lens']) {
    const variant = spatialChecks();
    variant[1].camera_geometry = { status: 'ok', evidence: 'Looks good overall', dimensions: { ...dimensions, [axis]: { requested: 'specific camera effect', observed: 'visible contradiction', status: 'defect' } } };
    const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: variant }));
    assert.equal(review.pass, false);
    assert.ok(review.issues.some(issue => issue.type === 'camera_geometry' && issue.panel === 2 && issue.reason.includes(axis)));
  }
});

test('four-panel PASS cannot omit camera evidence or hide a failed camera projection', () => {
  const missing = spatialChecks();
  delete missing[2].camera_geometry;
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: missing }));
  assert.equal(review.pass, false);
  assert.ok(review.issues.some(issue => issue.type === 'unverified'));
  const mismatch = spatialChecks();
  mismatch[2].camera_geometry = { status: 'defect', evidence: 'Requested floor-level upward view; observed horizontal view at the crouched face with visible table top and no upward projection.' };
  const failure = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: mismatch }));
  assert.equal(failure.pass, false);
  assert.ok(failure.issues.some(issue => issue.type === 'camera_geometry' && issue.panel === 3));
});

test('an unsupported PASS stays unverified, while complete observations are retained', () => {
  const missing = parseImageQualityQaResponse('{"pass":true,"issues":[]}');
  assert.equal(missing.pass, false);
  assert.equal(missing.issues[0].type, 'unverified');
  const complete = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: spatialChecks() }));
  assert.equal(complete.pass, true);
  assert.deepEqual(complete.observations, observations);
});

test('PASS requires all geometric checks for every distinct scene', () => {
  const emptyEvidence = spatialChecks();
  emptyEvidence[2].surface_text.evidence = ' ';
  const badStatus = spatialChecks();
  badStatus[1].object_geometry.status = 'looks good';
  const missingType = spatialChecks();
  delete missingType[0].object_geometry;
  const missingViewpoint = spatialChecks();
  delete missingViewpoint[3].prop_orientation;
  for (const checks of [undefined, [], spatialChecks(3), [...spatialChecks(3), spatialChecks()[0]], [...spatialChecks(), null], emptyEvidence, badStatus, missingType, missingViewpoint]) {
    const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
    assert.equal(review.pass, false);
    assert.ok(review.issues.some(issue => issue.type === 'unverified'));
  }
});

test('spatial defects override a contradictory PASS even when omitted from issues', () => {
  const checks = spatialChecks();
  checks[2].object_geometry = { status: 'defect', evidence: 'A sheet corner enters the hair contour without a coherent front/back boundary.' };
  checks[3].surface_text = {
    status: 'defect',
    evidence: 'The heading spans the cover and disconnected page-block edge.',
    visible_texts: [{ subject: 'book heading', text: 'approved heading', text_role: 'story_required', text_role_reason: 'explicit requested heading' }],
  };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.deepEqual(review.issues.map(({ type, panel }) => ({ type, panel })), [
    { type: 'object_geometry', panel: 3 }, { type: 'surface_text', panel: 4 },
  ]);
  assert.deepEqual(review.spatialChecks, checks);
});

test('unresolved object planes remain unverified instead of becoming a concrete repair request', () => {
  const checks = spatialChecks();
  checks[1].surface_text = { status: 'uncertain', evidence: 'The edge is too small to distinguish loose sheets from a bound object.' };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.ok(review.issues.every(issue => issue.type === 'unverified'));
});

test('single-image coverage requires one scene and accepts justified absence without inventing a grid', () => {
  const checks = spatialChecks(1);
  checks[0].surface_text = { status: 'not_applicable', evidence: 'There are no printed or display surfaces in the scene.', printed_surfaces: [], visible_texts: [] };
  const raw = JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks });
  assert.equal(parseImageQualityQaResponse(raw, { mode: 'single-image' }).pass, true);
  assert.equal(parseImageQualityQaResponse(raw).pass, false);
});

test('QA distinguishes physical boundary and printed-plane defects from valid overlap and gag intent', () => {
  for (const mode of ['single-image', 'four-panel']) {
    const prompt = buildImageQualityQaPrompt({ mode });
    for (const criterion of [/object_geometry:/, /surface_text:/, /Horizontal and vertical writing can both be valid/, /ordinary overlap with a coherent rear contour/, /headwear and source-supported surreal events/, /Do not normalize them/, /background.*intersection|intersection.*background/s, /printed plane/, /spatial_checks/, /not_applicable only with a concrete absence reason/, /actively operating a rear mechanism/i, /active_face/i]) {
      assert.match(prompt, criterion);
    }
  }
  const comparison = buildImageQualityComparisonPrompt();
  assert.match(comparison, /fixes text but embeds a prop in a body is a regression/);
});

test('orientation evidence contradicting PASS becomes a real issue and requires the actual reader viewpoint', () => {
  const checks = spatialChecks();
  checks[1].prop_orientation = { status: 'defect', evidence: 'Camera is across from the person using the display, yet sees its front instead of its rear casing.', surfaces: [{
    subject: 'display', visible_face: 'front', cues: ['display_content'], camera_side: 'opposite_half_space',
    visual_evidence: 'A lit UI is visible.', target_evidence: 'The operator is beyond the upright display, opposite the camera.',
  }] };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.equal(review.issues[0].type, 'prop_orientation');
  const prompt = buildImageQualityQaPrompt();
  assert.match(prompt, /reader-upright text appears upside-down or rotated to the camera/);
  assert.match(prompt, /Text independently straightened to the canvas.*surface_text/);
  assert.match(prompt, /holder's back is insufficient if another person is the recipient/);
  assert.match(prompt, /correctly angled shared display or explicit camera presentation/);
});

test('QA retains exact title and hand instructions from the submitted prompt', () => {
  const prompt = buildImageQualityQaPrompt({ finalPrompt: 'Title: 星の皿\nUse anatomical LEFT hand for the cup.\nPanel 2: No dialogue.' });
  assert.match(prompt, /Title: 星の皿/);
  assert.match(prompt, /Use anatomical LEFT hand for the cup/);
  assert.match(prompt, /title_text/);
  assert.match(prompt, /TITLE BAND CHECK/);
  assert.match(prompt, /closed rectangular outline.*panel_layout/i);
  assert.match(prompt, /one thumb.*four fingers/i);
  assert.match(prompt, /large.*foreground.*foreshortened.*hand/i);
  assert.match(prompt, /every visible hand.*named character/i);
  assert.match(prompt, /more than two.*anatomy defect/i);
  assert.match(prompt, /anatomical.*screen-left/i);
  const result = parseImageQualityQaResponse('{"pass":false,"issues":[{"type":"title_text","reason":"missing title"}]}');
  assert.equal(result.issues[0].type, 'title_text');
});

test('panel-border head clipping cannot hide behind an overall camera PASS', () => {
  const checks = spatialChecks();
  checks[0].camera_geometry.dimensions.boundary = {
    requested: 'clean containment or a deliberate continuous breakout',
    observed: 'the top panel rule slices through the hair and the outer segment is horizontally offset',
    status: 'defect',
  };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.ok(review.issues.some(issue => issue.type === 'panel_layout' && issue.panel === 1 && issue.reason.includes('boundary')));
});

test('visual QA explicitly audits clean panel-border breakthroughs', () => {
  const prompt = buildImageQualityQaPrompt({ mode: 'four-panel', panelCropCount: 4 });
  assert.match(prompt, /PANEL EDGE CONTINUITY CHECK/i);
  assert.match(prompt, /continuous head\/hair silhouette/i);
  assert.match(prompt, /border line.*stops behind/i);
  assert.match(prompt, /slicing through face\/hair.*panel_layout defect/i);
  assert.match(prompt, /"boundary"/);
});

test('QA requires grounded digit evidence and rejects a four-digit foreground hand', () => {
  const checks = spatialChecks();
  checks[3].hand_geometry = { status: 'defect', evidence: 'The large foreground hand has only four total digits.', hands: [{
    subject: 'Hikari foreground hand', location: 'panel 4 bottom center', pose: 'open toward camera', visible_digits: 4, occluded_digits: 0,
    observed_endpoint: 'hand', wrist_palm_connection: 'clear', palm_evidence: 'A palm plane is visibly joined to the wrist.',
    status: 'defect', evidence: 'Four digit contours connect to the palm; no fifth digit is visible or plausibly occluded.',
  }] };
  const rejected = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(rejected.pass, false);
  assert.ok(rejected.issues.some(issue => issue.type === 'anatomy' && issue.panel === 4 && /four|4/i.test(issue.reason)));

  delete checks[3].hand_geometry;
  const missing = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.ok(missing.issues.some(issue => issue.type === 'unverified' && issue.panel === 4 && issue.subject === 'hand_geometry'));
});

test('QA rejects an arm endpoint rendered as footwear even when digit counts look plausible', () => {
  const checks = spatialChecks();
  checks[3].hand_geometry = { status: 'ok', evidence: 'The reviewer counted five protrusions and incorrectly accepted the endpoint.', hands: [{
    subject: 'foreground actor left arm endpoint', location: 'lower-left of panel', pose: 'resting', visible_digits: 5, occluded_digits: 0,
    observed_endpoint: 'shoe', wrist_palm_connection: 'missing', palm_evidence: 'The endpoint has a sole, toe box and shoe opening instead of a wrist and palm.',
    status: 'ok', evidence: 'The reviewer mislabeled five silhouette protrusions as fingers.',
  }] };
  const rejected = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(rejected.pass, false);
  assert.ok(rejected.issues.some(issue => issue.type === 'anatomy' && issue.panel === 4 && /shoe|footwear/i.test(issue.reason)));
  const prompt = buildImageQualityQaPrompt();
  assert.match(prompt, /observed_endpoint/);
  assert.match(prompt, /wrist_palm_connection/);
  assert.match(prompt, /shoe.*arm|arm.*shoe/i);
});

test('quality prompt prioritizes anatomy, hand side, prop ownership, and bubble text over background', () => {
  const prompt = buildImageQualityQaPrompt({
    scenario: 'アカリ「行こう！」',
    castList: 'アカリ: 主人公',
    finalPrompt: "## Panel 3\nCamera: ヒカリの肩越し\nFUNCTIONAL SURFACE PANEL CHECK: solve geometry\nVISIBLE REAR DEPTH CHECK: camera is physically behind [ヒカリ]'s shoulder\nAction (visual only): ヒカリがスマホを読む。\nUNRELATED_RENDERING_NOISE: should be removed",
    referenceImageCount: 2,
    panelCropCount: 4,
  });

  for (const type of ['panel_layout', 'character_reference', 'anatomy', 'hand_side', 'prop_ownership', 'prop_orientation', 'camera_geometry', 'bubble_text', 'bubble_speaker', 'speaker_name', 'extra_text', 'unverified']) {
    assert.match(prompt, new RegExp(type));
  }
  assert.match(prompt, /first supplied image is the generated candidate/i);
  assert.match(prompt, /next 4 images are enlarged panel crops.*panel 1 through panel 4/i);
  assert.match(prompt, /following 2 images are the approved character reference sheets/i);
  assert.match(prompt, /outfit, hairstyle, hair color, eye color, eyewear, or defining accessories/i);
  assert.match(prompt, /scenario or final prompt explicitly overrides/i);
  assert.match(prompt, /exactly four separate visible panels/i);
  assert.match(prompt, /fewer or more than four panels/i);
  assert.match(prompt, /merged, omitted, duplicated, or reordered/i);
  assert.match(prompt, /Do not fail the image for background detail or background continuity/);
  assert.match(prompt, /speaker name prefix/i);
  assert.match(prompt, /exactly once/i);
  assert.match(prompt, /tail_endpoint_evidence/i);
  assert.match(prompt, /expected_speaker/i);
  assert.match(prompt, /observed_tail_target/i);
  assert.match(prompt, /actual operator, customer, or intended reader/i);
  assert.match(prompt, /functional prop geometry/i);
  assert.match(prompt, /document, form, printed page, card, book, or map/i);
  assert.match(prompt, /direction-dependent information, control, optical, or service face/i);
  assert.match(prompt, /explicitly presents.*camera or viewer/i);
  assert.match(prompt, /Submitted final image prompt/);
  assert.match(prompt, /camera is physically behind \[ヒカリ\]'s shoulder/);
  assert.match(prompt, /If the submitted prompt puts the camera physically behind.*shoulder/i);
  assert.match(prompt, /rear\/OTS character.*front-on.*camera_geometry/i);
  assert.match(prompt, /reader and camera are on opposite sides.*visible front.*prop_orientation/i);
  assert.match(prompt, /Behind the reader means.*same side.*front MUST be visible/i);
  assert.match(prompt, /viewer IS the camera/i);
  assert.match(prompt, /back of the actual reader\/operator's head or shoulder.*correct over-the-shoulder geometry.*MUST PASS prop_orientation/i);
  assert.match(prompt, /Never report that only the reader, but not the viewer/i);
  assert.match(prompt, /Do not report prop_orientation for that correct OTS projection/i);
  assert.match(prompt, /derive the target from the scripted action, not from the holder/i);
  assert.match(prompt, /submit.*present.*show.*recipient/i);
  assert.match(prompt, /tabletop.*face-up.*text baseline.*intended reader/i);
  assert.match(prompt, /UNRELATED_RENDERING_NOISE/); // Keep the complete submitted contract, including manual edits.
});

test('four-panel QA inspects both watermark edges while single-image QA does not invent a footer', () => {
  const fourPanel = buildImageQualityQaPrompt({ mode: 'four-panel' });
  assert.match(fourPanel, /WATERMARK EDGE CHECK/);
  assert.match(fourPanel, /complete left and right footer text/);
  assert.match(fourPanel, /cropped or missing required watermark text as panel_layout/);
  assert.doesNotMatch(buildImageQualityQaPrompt({ mode: 'single-image' }), /WATERMARK EDGE CHECK/);
});

test('visible Gemini bubble-routing metadata is a definite extra-text defect', () => {
  const finalPrompt = `## Panel 1
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="この本の山、私の資産です。". TAIL TIP LOCK: B1=>[リン] mouth/head.
## Panel 2
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="現物配当で一冊！" [RIGHTMOST]; B2="持ってくの!?" [LEFTMOST]. BUBBLE SLOTS: B1 x=67%; B2 x=33%. TAIL TIP LOCK: B1=>[ミク] mouth/head; B2=>[リン] mouth/head.`;
  const review = { pass: true, issues: [], observations: {} };
  const inventory = JSON.stringify({ panels: [
    { panel: 1, text_regions: [
      { text: 'この本の山、私の資産です。', region_kind: 'speech_balloon', container_evidence: 'white balloon', center_x: 0.76 },
      { text: 'B1 x=9 RIGHT-SIDE', region_kind: 'speech_balloon', container_evidence: 'narrow white balloon', center_x: 0.94 },
    ] },
    { panel: 2, text_regions: [
      { text: '持ってくの!? B2 x=33%', region_kind: 'speech_balloon', container_evidence: 'left balloon', center_x: 0.25 },
      { text: '現物配当で一冊！ B1 x=67%', region_kind: 'speech_balloon', container_evidence: 'right balloon', center_x: 0.75 },
    ] },
  ] });
  const result = applyBubbleInventory(review, inventory, finalPrompt);
  assert.equal(result.pass, false);
  assert.ok(result.issues.some(issue => issue.type === 'extra_text' && issue.panel === 1));
  assert.ok(result.issues.some(issue => issue.type === 'extra_text' && issue.panel === 2));
});

test('single-image QA allows harmless AI-completed setting text but rejects major story mismatches', () => {
  const prompt = buildImageQualityQaPrompt({ mode: 'single-image', finalPrompt: 'Add no random text.' });
  assert.match(prompt, /READABLE TEXT INVENTORY/);
  assert.match(prompt, /chalkboards.*packaging.*book spines.*phone screens/is);
  assert.match(prompt, /visible_texts/);

  const checks = spatialChecks(1);
  checks[0].surface_text.visible_texts = [
    { subject: 'shed sign', text: '整備用具庫', text_role: 'incidental', text_role_reason: 'Generic label fitting the school maintenance setting.', story_impact: 'harmless', story_impact_reason: 'It changes no setting, identity, fact, clue, action, or joke.' },
  ];
  const harmless = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { mode: 'single-image' });
  assert.equal(harmless.pass, true);

  checks[0].surface_text.visible_texts[0] = {
    subject: 'shed sign', text: '病院隔離棟', text_role: 'incidental', text_role_reason: 'Unscripted location label.',
    story_impact: 'major_mismatch', story_impact_reason: 'It changes the school maintenance setting into a hospital isolation ward.',
  };
  const mismatch = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { mode: 'single-image' });
  assert.equal(mismatch.pass, false);
  assert.ok(mismatch.issues.some(issue => issue.type === 'extra_text' && issue.subject === 'shed sign'));

  const missing = spatialChecks(1);
  delete missing[0].surface_text.visible_texts;
  const unverified = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: missing }), { mode: 'single-image' });
  assert.ok(unverified.issues.some(issue => issue.type === 'unverified' && issue.subject === 'surface_text'));
});

test('reference QA requires per-panel eyewear evidence and catches missing glasses on a small figure', () => {
  const checks = spatialChecks();
  checks.forEach(check => {
    check.identity_checks = [{
      name: 'リン', location: 'right background', matched_features: ['brown twin tails', 'work clothes'],
      reference_eyewear: 'glasses', observed_eyewear: 'glasses', status: 'ok', evidence: 'Rims, bridge and temples are visible on this face.',
    }];
  });
  checks[3].identity_checks[0] = {
    name: 'リン', location: 'rightmost small chibi figure', matched_features: ['brown twin tails', 'work clothes'],
    reference_eyewear: 'glasses', observed_eyewear: 'no_glasses', status: 'defect', evidence: 'Both eyes and nose bridge are clear but no rims, bridge or temples are drawn.',
  };
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { referenceImageCount: 2 });
  assert.equal(result.pass, false);
  assert.ok(result.issues.some(issue => issue.type === 'character_reference' && issue.panel === 4 && issue.subject === 'リン'));

  delete checks[3].identity_checks;
  const missing = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { referenceImageCount: 2 });
  assert.ok(missing.issues.some(issue => issue.type === 'unverified' && issue.panel === 4 && issue.subject === 'character_reference'));
});

test('reference QA rejects a duplicated named cast instance even when each copy matches the reference', () => {
  const checks = spatialChecks();
  checks.forEach((check, index) => {
    check.identity_checks = [{
      name: 'ヒカリ', location: 'right background', matched_features: ['blonde bob', 'round glasses'],
      reference_eyewear: 'glasses', observed_eyewear: 'glasses', status: 'ok', evidence: 'Rims, bridge and temples are visible.',
    }];
    check.cast_instances = [{
      name: 'ヒカリ', observed_count: 1, status: 'ok',
      instances: [{ location: `panel ${index + 1} right`, matched_features: ['blonde bob', 'round glasses'] }],
    }];
  });
  checks[3].cast_instances[0] = {
    name: 'ヒカリ', observed_count: 2, status: 'defect',
    instances: [
      { location: 'left of the display', matched_features: ['blonde bob', 'round glasses'] },
      { location: 'right of the display', matched_features: ['blonde bob', 'round glasses'] },
    ],
  };
  const finalPrompt = [1, 2, 3, 4]
    .map(panel => `## Panel ${panel}\nCAST COUNT: [ヒカリ] each EXACTLY ONCE; no named-character duplicates.\nDialogue: silent`)
    .join('\n');
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
    finalPrompt,
    referenceImageCount: 2,
  });
  assert.equal(result.pass, false);
  assert.ok(result.issues.some(issue => issue.type === 'cast_count' && issue.panel === 4 && issue.subject === 'ヒカリ'));
});

test('diegetic replica contracts separate physical actors from contained miniature representations', () => {
  const finalPrompt = [1, 2, 3, 4].map(panel => panel === 4
    ? `## Panel 4\nCAST COUNT: [PersonA] each EXACTLY ONCE; no named-character duplicates.\nDIEGETIC REPLICA LAYER: [PersonA] may appear as one tiny replica each, fully inside the explicitly scripted container/surface; never full-size or outside it.\nDialogue: silent`
    : `## Panel ${panel}\nCAST COUNT: [PersonA] each EXACTLY ONCE; no named-character duplicates.\nDialogue: silent`).join('\n');
  const contracts = extractPanelCastContracts(finalPrompt);
  assert.deepEqual(contracts[3], { panel: 4, names: ['PersonA'], replicaNames: ['PersonA'] });

  const qaPrompt = buildImageQualityQaPrompt({ finalPrompt, referenceImageCount: 1 });
  assert.match(qaPrompt, /count full-size physical actors separately from scripted diegetic replicas/i);
  assert.match(qaPrompt, /cast_replicas/);

  const checks = spatialChecks();
  checks.forEach((check, index) => {
    check.identity_checks = [{
      name: 'PersonA', location: `panel ${index + 1} center`, matched_features: ['short hair', 'round glasses'],
      reference_eyewear: 'glasses', observed_eyewear: 'glasses', status: 'ok', evidence: 'Rims, bridge and temples are visible.',
    }];
    check.cast_instances = [{
      name: 'PersonA', observed_count: 1, status: 'ok',
      instances: [{ location: `panel ${index + 1} physical actor`, matched_features: ['short hair', 'round glasses'] }],
    }];
  });
  checks[3].cast_replicas = [{
    name: 'PersonA', observed_count: 1, status: 'ok',
    instances: [{ location: 'inside the miniature display box', matched_features: ['short hair', 'round glasses'] }],
  }];

  const accepted = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
    finalPrompt,
    referenceImageCount: 1,
  });
  assert.equal(accepted.pass, true);

  delete checks[3].cast_replicas;
  const missingReplicaInventory = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
    finalPrompt,
    referenceImageCount: 1,
  });
  assert.equal(missingReplicaInventory.pass, false);
  assert.ok(missingReplicaInventory.issues.some(issue => issue.type === 'unverified' && issue.panel === 4 && issue.subject === 'cast_replicas'));
});

test('speaker-tail endpoint mismatch overrides a contradictory PASS', () => {
  const checks = spatialChecks();
  checks[3].bubble_speaker = {
    status: 'ok',
    evidence: 'Both tails were traced.',
    bubbles: [
      { bubble: 'B1', text: 'これで決まるわけじゃないんだね？', expected_speaker: 'ミク', observed_tail_target: 'ミク', tail_endpoint_evidence: 'Tail tip touches the blonde speaker on the right.' },
      { bubble: 'B2', text: 'ああ、まずは署名の審査だ。', expected_speaker: 'リン', observed_tail_target: 'ミク', tail_endpoint_evidence: 'Tail tip touches the blonde speaker on the right, not the glasses speaker on the left.' },
    ],
  };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.ok(review.issues.some(issue => issue.type === 'bubble_speaker' && issue.panel === 4 && /B2/.test(issue.reason)));
});

test('speaker-tail verification uses the submitted speaker map and measured endpoint geometry', () => {
  const finalPrompt = `## Panel 1
Dialogue: silent
## Panel 2
Dialogue: silent
## Panel 3
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="菓子をしまいなさい。"; B2="香りで交渉する流れ？". TAIL TIP LOCK: B1=>[サエコ]; B2=>[ミク].
## Panel 4
Dialogue: silent`;
  const makeReview = bubbles => {
    const checks = spatialChecks();
    checks[2].bubble_speaker = {
      status: 'ok', evidence: 'Each tail was traced from balloon outline to its visible endpoint.',
      left_to_right_texts: ['香りで交渉する流れ？', '菓子をしまいなさい。'], bubbles,
    };
    return parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  };
  const validB2 = {
    bubble: 'B2', text: '香りで交渉する流れ？', expected_speaker: 'ミク', observed_tail_target: 'ミク',
    tail_endpoint_evidence: 'Tip touches Miku head outline.', endpoint_relation: 'touches_speaker',
    tail_tip: { x: 0.44, y: 0.38 }, speaker_anchor: { x: 0.46, y: 0.40, part: 'head' },
    root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'Root starts on the lower speaker-facing outline and the path is clear.',
    center_x: 0.3, position_evidence: 'Balloon body at left.',
  };
  const baseB1 = {
    bubble: 'B1', text: '菓子をしまいなさい。', expected_speaker: 'サエコ', observed_tail_target: 'サエコ',
    tail_endpoint_evidence: 'Tip is claimed to touch Saeko.', endpoint_relation: 'touches_speaker',
    tail_tip: { x: 0.82, y: 0.25 }, speaker_anchor: { x: 0.40, y: 0.65, part: 'head' },
    root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'Root starts on the lower speaker-facing outline and the path is clear.',
    center_x: 0.7, position_evidence: 'Balloon body at right.',
  };

  const separated = makeReview([baseB1, validB2]);
  assert.equal(separated.pass, false);
  assert.ok(separated.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1'));

  const falsifiedExpectedSpeaker = makeReview([{ ...baseB1, expected_speaker: 'ミク', observed_tail_target: 'ミク',
    tail_tip: { x: 0.44, y: 0.38 }, speaker_anchor: { x: 0.46, y: 0.40, part: 'head' } }, validB2]);
  assert.equal(falsifiedExpectedSpeaker.pass, false);
  assert.ok(falsifiedExpectedSpeaker.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1' && /サエコ/.test(issue.reason)));

  const ambiguous = makeReview([{ ...baseB1, endpoint_relation: 'ambiguous', tail_endpoint_evidence: 'The tail disappears between two heads.' }, validB2]);
  assert.equal(ambiguous.pass, false);
  assert.ok(ambiguous.issues.some(issue => issue.type === 'unverified' && issue.subject === 'B1'));

  const correct = makeReview([{ ...baseB1, tail_tip: { x: 0.39, y: 0.63 } }, validB2]);
  assert.equal(correct.pass, true);

  const crossesHead = makeReview([{ ...baseB1, tail_tip: { x: 0.39, y: 0.63 },
    path_relation: 'crosses_head', tail_path_evidence: 'The tail passes across Saeko\'s crown before reaching her mouth.' }, validB2]);
  assert.equal(crossesHead.pass, false);
  assert.ok(crossesHead.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1' && /crosses_head/.test(issue.reason)));
});

test('quality review image parts keep the candidate first, then every panel crop, then character sheets', () => {
  const parts = buildImageQualityQaImageParts({
    candidate: { mimeType: 'image/png', base64Img: 'candidate-data' },
    panelImages: [
      'data:image/png;base64,panel-one',
      'invalid-panel',
      'data:image/jpeg;base64,panel-two',
    ],
    referenceImages: [
      'data:image/jpeg;base64,reference-one',
      'not-an-image',
      'data:image/png;base64,reference-two',
    ],
  });

  assert.deepEqual(parts, [
    { inlineData: { mimeType: 'image/png', data: 'candidate-data' } },
    { inlineData: { mimeType: 'image/png', data: 'panel-one' } },
    { inlineData: { mimeType: 'image/jpeg', data: 'panel-two' } },
    { inlineData: { mimeType: 'image/jpeg', data: 'reference-one' } },
    { inlineData: { mimeType: 'image/png', data: 'reference-two' } },
  ]);
});

test('preserves character-sheet mismatches as a stable issue type', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [
      { type: 'character_reference', panel: 1, subject: 'アカリ', reason: 'sailor uniform was replaced by a vest uniform', identity_evidence: { location: 'left foreground', matched_features: ['orange bob', 'brown eyes'], reference_evidence: 'orange bob figure on reference sheet wears sailor collar', observed_feature: 'vest uniform', expected_feature: 'sailor uniform' } },
    ],
  }));

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'character_reference');
});

test('preserves explicit over-the-shoulder camera failures as a stable issue type', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [
      { type: 'camera_geometry', panel: 3, subject: 'ヒカリ', reason: 'front-on face contradicts camera behind her shoulder' },
    ],
  }));

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'camera_geometry');
});

test('preserves four-panel page-layout failures as a stable issue type', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [
      { type: 'panel_layout', panel: null, subject: 'manga page', reason: 'only two visible panels were rendered' },
    ],
  }));

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'panel_layout');
  assert.equal(result.issues[0].panel, null);
});

test('preserves functional-surface orientation failures as a stable issue type', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    spatial_checks: [{ ...spatialChecks()[0], prop_orientation: { status: 'defect', evidence: 'wrong face', surfaces: [{
      subject: 'counter nameplate', visible_face: 'front', cues: ['printed_content'], camera_side: 'opposite_half_space',
      visual_evidence: 'The letters are visible on the face aimed at the camera.', target_evidence: 'The customer is behind the sign, opposite the camera across its vertical plane.',
    }] } }],
    issues: [
      { type: 'prop_orientation', panel: 1, subject: 'counter nameplate', reason: 'readable face points at the camera instead of the customer' },
    ],
  }));

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'prop_orientation');
});

test('a back recorded as back cannot become a screen-facing defect through prose alone', () => {
  const checks = spatialChecks();
  checks[1].prop_orientation = { status: 'defect', evidence: 'Screen wrongly faces the camera', surfaces: [{
    subject: 'tablet', visible_face: 'back', cues: ['rear_shell', 'camera_module'], camera_side: 'opposite_half_space',
    visual_evidence: 'Dark casing and corner camera; no display content.', target_evidence: 'Reader face beyond the tablet, opposite the camera.',
  }] };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: false, observations, spatial_checks: checks, issues: [{
    type: 'prop_orientation', panel: 2, subject: 'tablet', reason: 'Tablet screen is visible and camera-facing',
  }] }));
  assert.ok(review.issues.some(issue => issue.type === 'unverified'));
  assert.ok(review.issues.every(issue => issue.type !== 'prop_orientation'));
});

test('front verdict with only rear cues or no observed camera evidence remains unverified', () => {
  for (const change of [{ cues: ['rear_shell', 'camera_module'] }, { cues: ['camera_module'] }, { camera_side: 'unknown' }, { visual_evidence: '' }]) {
    const checks = spatialChecks();
    Object.assign(checks[0].prop_orientation.surfaces[0], change);
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, observations, spatial_checks: checks, issues: [] }));
    assert.equal(result.pass, false);
    assert.ok(result.issues.every(issue => issue.type === 'unverified'));
  }
});

test('recorded wrong face is detected even if the prose says PASS, but valid OTS is retained', () => {
  const checks = spatialChecks();
  const valid = parseImageQualityQaResponse(JSON.stringify({ pass: true, observations, spatial_checks: checks, issues: [] }));
  assert.equal(valid.pass, true);
  checks[1].prop_orientation.surfaces[0].camera_side = 'opposite_half_space';
  const invalid = parseImageQualityQaResponse(JSON.stringify({ pass: true, observations, spatial_checks: checks, issues: [] }));
  assert.equal(invalid.pass, false);
  assert.equal(invalid.issues[0].type, 'prop_orientation');
});

test('inspection distinguishes pixel cues, source conflicts and glyph rotation from mere readability', () => {
  const request = buildImageQualityQaPrompt();
  assert.match(request, /OBSERVATION BEFORE EXPECTATION/);
  assert.match(request, /SOURCE PRECEDENCE/);
  assert.match(request, /each glyph's top direction/);
  assert.match(request, /not be re-typeset/);
  assert.match(request, /lens alone does not prove front or back/);
});

test('parses exact visible failures into stable issue types', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [
      { type: 'anatomy', panel: 2, subject: 'アカリ', reason: 'three visible arms' },
      { type: 'speaker_name', panel: 3, subject: '吹き出し', reason: 'アカリ: prefix is printed' },
    ],
  }));

  assert.equal(result.pass, false);
  assert.deepEqual(result.issues.map(({ type, panel }) => ({ type, panel })), [
    { type: 'anatomy', panel: 2 },
    { type: 'speaker_name', panel: 3 },
  ]);
  assert.equal(formatImageQualityIssue(result.issues[0]), 'panel 2 / anatomy / アカリ: three visible arms');
});

test('fails closed as unverified when the reviewer response cannot be parsed', () => {
  const result = parseImageQualityQaResponse('not json');

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'unverified');
  assert.match(result.issues[0].reason, /parse/i);
});

test('single-image QA inspects one scene without imposing a four-panel layout', () => {
  const prompt = buildImageQualityQaPrompt({
    scenario: '',
    castList: '',
    finalPrompt: SINGLE_IMAGE_PROMPT,
    mode: 'single-image',
    referenceImageCount: 0,
  });

  assert.match(prompt, /generated single illustration/i);
  assert.match(prompt, /Inspect the supplied image as one continuous scene/i);
  assert.match(prompt, /Do not expect or reward a panel grid, comic layout, speech bubbles, or dialogue/i);
  assert.doesNotMatch(prompt, /generated four-panel manga page/i);
  assert.doesNotMatch(prompt, /Inspect the supplied image panel by panel/i);
  assert.doesNotMatch(prompt, /exactly four separate visible panels/i);
  assert.doesNotMatch(prompt, /panel_layout/);
  assert.doesNotMatch(prompt, /following \d+ images are the approved character reference sheets/i);
});
