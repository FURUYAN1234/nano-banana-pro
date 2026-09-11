import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildImageQualityQaImageParts,
  buildImageQualityQaPrompt,
  formatImageQualityIssue,
  parseImageQualityQaResponse,
  buildImageQualityComparisonPrompt,
  parseImageQualityComparison,
} from '../src/lib/image-quality-qa.js';

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
  object_geometry: { status: 'ok', evidence: 'The page is in front of the hand; the rear finger contour is hidden at its edge.' },
  surface_text: { status: 'ok', evidence: 'The heading follows the visible page corners and tilt; the thin page edges are separate.', printed_surfaces: [{ subject: 'page', face: 'page', object_axes: 'top edge tilts right', glyph_axes: 'glyph tops tilt with page top', expected_axes: 'same tilt as page top', basis: 'explicit_contract', status: 'ok' }] },
  prop_orientation: { status: 'ok', evidence: 'The reader and overhead camera are on the printed side of the page; text points toward the reader.', surfaces: [{
    subject: 'page', visible_face: 'front', cues: ['printed_content'], camera_side: 'same_half_space',
    visual_evidence: 'Printing appears within the page edges.', target_evidence: 'Reader and camera are both above the page.',
  }] },
}));
const observations = { title: 'No title requested', dialogue: 'Panels 1-4 have no bubbles as requested', hands: 'No hand side requested', props: 'Paper held at its lower edge' };

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
  checks[3].surface_text = { status: 'defect', evidence: 'The heading spans the cover and disconnected page-block edge.' };
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
  checks[0].surface_text = { status: 'not_applicable', evidence: 'There are no printed or display surfaces in the scene.' };
  const raw = JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks });
  assert.equal(parseImageQualityQaResponse(raw, { mode: 'single-image' }).pass, true);
  assert.equal(parseImageQualityQaResponse(raw).pass, false);
});

test('QA distinguishes physical boundary and printed-plane defects from valid overlap and gag intent', () => {
  for (const mode of ['single-image', 'four-panel']) {
    const prompt = buildImageQualityQaPrompt({ mode });
    for (const criterion of [/object_geometry:/, /surface_text:/, /Horizontal and vertical writing can both be valid/, /ordinary overlap with a coherent rear contour/, /headwear and source-supported surreal events/, /Do not normalize them/, /background.*intersection|intersection.*background/s, /printed plane/, /spatial_checks/, /not_applicable only with a concrete absence reason/]) {
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
  assert.match(prompt, /anatomical.*screen-left/i);
  const result = parseImageQualityQaResponse('{"pass":false,"issues":[{"type":"title_text","reason":"missing title"}]}');
  assert.equal(result.issues[0].type, 'title_text');
});

test('quality prompt prioritizes anatomy, hand side, prop ownership, and bubble text over background', () => {
  const prompt = buildImageQualityQaPrompt({
    scenario: 'アカリ「行こう！」',
    castList: 'アカリ: 主人公',
    finalPrompt: "## Panel 3\nCamera: ヒカリの肩越し\nFUNCTIONAL SURFACE PANEL CHECK: solve geometry\nVISIBLE REAR DEPTH CHECK: camera is physically behind [ヒカリ]'s shoulder\nAction (visual only): ヒカリがスマホを読む。\nUNRELATED_RENDERING_NOISE: should be removed",
    referenceImageCount: 2,
  });

  for (const type of ['panel_layout', 'character_reference', 'anatomy', 'hand_side', 'prop_ownership', 'prop_orientation', 'camera_geometry', 'bubble_text', 'speaker_name', 'extra_text', 'unverified']) {
    assert.match(prompt, new RegExp(type));
  }
  assert.match(prompt, /first supplied image is the generated candidate/i);
  assert.match(prompt, /following 2 images are the approved character reference sheets/i);
  assert.match(prompt, /outfit, hairstyle, hair color, eye color, eyewear, or defining accessories/i);
  assert.match(prompt, /scenario or final prompt explicitly overrides/i);
  assert.match(prompt, /exactly four separate visible panels/i);
  assert.match(prompt, /fewer or more than four panels/i);
  assert.match(prompt, /merged, omitted, duplicated, or reordered/i);
  assert.match(prompt, /Do not fail the image for background detail or background continuity/);
  assert.match(prompt, /speaker name prefix/i);
  assert.match(prompt, /exactly once/i);
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

test('quality review image parts keep the candidate first and append valid character sheets', () => {
  const parts = buildImageQualityQaImageParts({
    candidate: { mimeType: 'image/png', base64Img: 'candidate-data' },
    referenceImages: [
      'data:image/jpeg;base64,reference-one',
      'not-an-image',
      'data:image/png;base64,reference-two',
    ],
  });

  assert.deepEqual(parts, [
    { inlineData: { mimeType: 'image/png', data: 'candidate-data' } },
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
