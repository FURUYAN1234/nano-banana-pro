import test from 'node:test';
import assert from 'node:assert/strict';
import { isMaterialImageQualityIssue } from '../src/lib/image-quality-failsafe.js';
import { getPanelShotExecution } from '../src/lib/composition-variety.js';
import * as imageQualityQa from '../src/lib/image-quality-qa.js';

import {
  buildImageQualityQaImageParts,
  buildImageQualityQaPrompt,
  buildActorHandAuditPrompt,
  parseActorHandAuditResponse,
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

const tableQaArrays = value => {
  if (Array.isArray(value)) {
    const rows = value.map(tableQaArrays);
    if (rows.length > 1 && rows.every(row => row && !Array.isArray(row) && typeof row === 'object')) {
      const columns = Object.keys(rows[0]);
      if (rows.every(row => Object.keys(row).join('|') === columns.join('|'))) {
        return { $columns: columns, $rows: rows.map(row => columns.map(key => row[key])) };
      }
    }
    return rows;
  }
  return value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).map(([key, item]) => [key, tableQaArrays(item)])) : value;
};

test('compact QA inventory tables preserve the same complete checks and material verdicts', () => {
  const report = { pass: true, observations, spatial_checks: spatialChecks(), issues: [] };
  const table = tableQaArrays(report);
  assert.ok(JSON.stringify(table).length < JSON.stringify(report).length);
  assert.deepEqual(parseImageQualityQaResponse(JSON.stringify(table)), parseImageQualityQaResponse(JSON.stringify(report)));
  report.spatial_checks[1].object_geometry = { status: 'defect', evidence: 'Visible tray penetrates the wrist.' };
  const result = parseImageQualityQaResponse(JSON.stringify(tableQaArrays(report)));
  assert.ok(result.issues.some(issue => issue.type === 'object_geometry' && issue.panel === 2));
});

test('invalid or truncated QA table rows cannot become PASS or a paid repair', () => {
  for (const table of [
    { $columns: ['panel', 'panel'], $rows: [[1, 2]] },
    { $columns: ['panel'], $rows: [[1, 2]] },
    { $columns: ['panel', 'hand_geometry'], $rows: [[1]] },
    { $columns: ['__proto__'], $rows: [[{}]] },
    { $columns: ['panel'], $rows: [[1]], extra: true },
  ]) {
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, observations, spatial_checks: table, issues: [] }));
    assert.equal(result.pass, false);
    assert.ok(result.issues.every(issue => issue.type === 'unverified'));
  }
  const truncated = parseImageQualityQaResponse(JSON.stringify(tableQaArrays({ pass: true, observations, spatial_checks: spatialChecks(), issues: [] })), { finishReason: 'length' });
  assert.equal(truncated.pass, false);
  assert.ok(truncated.issues.every(issue => issue.type === 'unverified'));
});

test('QA requests ordinary object arrays without a second table transport grammar', () => {
  const prompt = buildImageQualityQaPrompt({ referenceImageCount: 2 });
  assert.match(prompt, /Use ordinary JSON objects and arrays/);
  assert.doesNotMatch(prompt, /Encode arrays.*\$columns/);
  assert.match(prompt, /Never omit.*inventory|every.*inventory/s);
});

test('malformed QA reports only value-safe response shape and size without accepting an incomplete review', () => {
  const response = '{"private_text":"do not echo this"';
  const result = parseImageQualityQaResponse(response, { completionTokens: 8192 });
  assert.equal(result.pass, false);
  assert.ok(result.issues.every(issue => !isMaterialImageQualityIssue(issue)));
  assert.match(result.issues[0].reason, /JSON=invalid.*output_tokens=8192/);
  assert.doesNotMatch(result.issues[0].reason, /private_text|do not echo/);
  assert.match(parseImageQualityQaResponse('{"pass":"true","issues":[]}').issues[0].reason, /pass=string; issues=array/);
  const prompt = buildImageQualityQaPrompt({ finalPrompt: '## Panel 1\nCamera: low angle' });
  assert.doesNotMatch(prompt, /under 4500 output tokens|evidence\/observed at most 60 characters/);
  assert.match(prompt, /Complete required evidence takes priority over brevity/);
  assert.match(prompt, /Keep exact visible dialogue.*all required inventories, coordinates and dimensions/);
});

test('comparison includes prompt requirements after the former 24,000-character cutoff', () => {
  const marker = 'REQUIRED_FINAL_PANEL_CONTRACT';
  const comparison = buildImageQualityComparisonPrompt({finalPrompt: `${'x'.repeat(24001)}${marker}`});
  assert.match(comparison, /REQUIRED_FINAL_PANEL_CONTRACT/);
});

test('comparison parsing does not discard malformed duplicate checks and falsely confirm an issue', () => {
  const result = parseImageQualityComparison(JSON.stringify({ preferred: 'original', reason: 'Preserve original', originalIssueChecks: [
    { issueIndex: 0, status: 'defect', evidence: 'An extra limb is visible.' },
    { issueIndex: 0, status: 'unknown', evidence: 'Identity unclear.' },
    { issueIndex: 1, status: 'ok', evidence: '' },
    { issueIndex: -1, status: 'defect', evidence: 'Invalid index.' },
  ] }));
  assert.equal(result.originalIssueChecks.filter(check => check.issueIndex === 0).length, 2);
  assert.equal(result.originalIssueChecks[1].status, 'uncertain');
  assert.equal(result.originalIssueChecks[2].status, 'uncertain');
  assert.equal(result.originalIssueChecks.length, 3);
});

test('output-limit termination is unverified even if a complete JSON prefix was returned', () => {
  const reply = JSON.stringify({ pass: true, issues: [], observations, spatial_checks: spatialChecks() });
  assert.equal(parseImageQualityQaResponse(reply, { finishReason: 'stop' }).pass, true);
  for (const finishReason of ['length', 'max_output_tokens']) {
    const result = parseImageQualityQaResponse(reply, { finishReason });
    assert.equal(result.pass, false);
    assert.match(result.issues[0].reason, /出力上限/);
    assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
  }
});

test('camera QA requests every dimension required by its parser', () => {
  const prompt = buildImageQualityQaPrompt({finalPrompt:'## Panel 1\nCamera: low angle'});
  assert.match(prompt, /exactly elevation, azimuth, framing, lens, boundary/i);
  assert.match(prompt, /visible_extent/);
  assert.match(prompt, /actor_visibility/);
  assert.match(prompt, /cropped foot alone is a factual deviation, not a material defect/i);
});

test('long-shot PASS needs measured subject scale and setting evidence, not a group-count label', () => {
  const finalPrompt = '## Panel 1\nCamera: high-angle long shot\nCAST COUNT: [A] each EXACTLY ONCE.';
  const review = () => {
    const spatial = spatialChecks();
    spatial[0].hand_geometry.actor_limb_inventory = [{ actor: 'A', visible_hands: [], evidence: 'Hands hidden by the counter.' }];
    spatial[0].camera_geometry.dimensions.elevation.projection_cues = [
      { subject: 'actor crown', surface: 'top', x: 0.65, y: 0.25 },
      { subject: 'counter surface', surface: 'top', x: 0.3, y: 0.6 },
    ];
    return { pass: true, issues: [], observations, spatial_checks: spatial };
  };
  const labelOnly = review();
  labelOnly.spatial_checks[0].camera_geometry.dimensions.framing.observed = 'full group, long shot, continuous setting';
  const ungrounded = parseImageQualityQaResponse(JSON.stringify(labelOnly), { finalPrompt });
  assert.equal(ungrounded.pass, false);
  assert.ok(ungrounded.issues.some(issue => /shot scale/i.test(issue.reason)));
  assert.equal(ungrounded.issues.some(isMaterialImageQualityIssue), false);

  const grounded = review();
  const framing = grounded.spatial_checks[0].camera_geometry.dimensions.framing;
  framing.scale_evidence = { subject: 'A', top: 0.25, bottom: 0.77, extent: 'whole', setting: 'Connected floor across lower third and a walkway between actors on the right.' };
  assert.equal(parseImageQualityQaResponse(JSON.stringify(grounded), { finalPrompt }).pass, true);
  framing.scale_evidence = { subject: 'A', top: 0.02, bottom: 1, extent: 'waist_crop', setting: 'A strip of shelves behind the heads.' };
  const cropped = parseImageQualityQaResponse(JSON.stringify(grounded), { finalPrompt });
  assert.equal(cropped.pass, false);
  assert.ok(cropped.issues.some(issue => /shot scale/i.test(issue.reason)));
  assert.equal(cropped.issues.some(isMaterialImageQualityIssue), false);
  assert.equal(cropped.spatialChecks[0].camera_geometry.dimensions.framing.status, 'uncertain');

  delete framing.scale_evidence;
  grounded.spatial_checks[0].camera_geometry.dimensions.lens = {
    requested: 'wide-angle', observed: 'Near hand at lower left is much larger than the receding torso beside the doorway.', status: 'ok',
  };
  assert.equal(parseImageQualityQaResponse(JSON.stringify(grounded), { finalPrompt: '## Panel 1\nCamera: wide-angle close-up' }).pass, true);
  assert.match(buildImageQualityQaPrompt({ finalPrompt }), /scale_evidence/);
});

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

test('critical camera requests only required panel crops and binds their original panel numbers', () => {
  const candidate = { base64Img: 'fullPage', mimeType: 'image/png' };
  const panelImages = [1, 2, 3, 4].map(panel => `data:image/png;base64,panel${panel}`);
  const finalPrompt = `${EXPLICIT_REAR_PROMPT}\n## Panel 4\nEXPLICIT REAR CAMERA: camera is physically behind [アカリ]'s shoulder; rear head/shoulder foreground.`;
  const request = imageQualityQa.buildCriticalCameraQaRequest({ candidate, panelImages, finalPrompt });
  assert.deepEqual(request.images.map(image => image.inlineData.data), ['panel2', 'panel4']);
  assert.match(request.prompt, /Image 1 = panel 2; Image 2 = panel 4/);
  assert.doesNotMatch(request.prompt, /first attached image is the complete|second attached image.*panel 1/i);
  assert.match(request.prompt, /exactly one check for every listed panel/);
  for (const incomplete of [[], panelImages.slice(1), panelImages.map((image, index) => index === 3 ? '' : image)]) {
    const fallback = imageQualityQa.buildCriticalCameraQaRequest({ candidate, panelImages: incomplete, finalPrompt });
    assert.deepEqual(fallback.images.map(image => image.inlineData.data), ['fullPage']);
    assert.match(fallback.prompt, /first attached image is the complete generated manga page/);
    assert.match(fallback.prompt, /Panel 2;/);
    assert.match(fallback.prompt, /Panel 4;/);
    assert.doesNotMatch(fallback.prompt, /enlarged crop/);
  }
  assert.deepEqual(imageQualityQa.buildCriticalCameraQaRequest({ candidate, panelImages, finalPrompt: 'ordinary shot' }), { prompt: '', images: [] });
});

test('critical camera observations must belong to the named subject and empty PASS is unverified', () => {
  const finalPrompt = `Character [ヒカリ (Hikari)]\n${EXPLICIT_REAR_PROMPT}`;
  const check = { panel: 2, rear_subject: '【 Hikari 】', rear_head_or_shoulder_foreground: 'present',
    face_orientation: 'rear', camera_side: 'behind_subject', evidence: 'Rear skull and shoulder occupy the right foreground.',
    head_geometry: { status: 'ok', evidence: 'One cranium connects to the jaw and neck.', ears: [] } };
  const parse = checks => parseCriticalCameraQaResponse(JSON.stringify({ pass: true, checks }), { finalPrompt });
  assert.equal(parse([check]).pass, true, 'canonical aliases and harmless name wrappers remain valid');
  check.rear_subject = 'アカリ';
  const differentActor = parse([check]);
  assert.equal(differentActor.pass, false);
  assert.ok(differentActor.issues.every(issue => !isMaterialImageQualityIssue(issue)));
  for (const checks of [[], [{ panel: 2, pass: true }], [{ ...check, rear_subject: 'ヒカリ', head_geometry: undefined }]]) {
    const result = parse(checks);
    assert.equal(result.pass, false);
    assert.ok(result.issues.every(issue => !isMaterialImageQualityIssue(issue)));
  }
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

test('rear-camera PASS also needs a coherent head and never accepts same-side duplicate ears', () => {
  const check = {
    panel: 2, rear_subject: 'ヒカリ', rear_head_or_shoulder_foreground: 'present',
    face_orientation: 'back_three_quarter', camera_side: 'behind_subject',
    evidence: 'Rear skull and shoulder overlap the foreground; a partial cheek is visible.',
    head_geometry: { status: 'ok', evidence: 'One cranium, connected jaw and neck; near ear beside cheek.',
      ears: [{ side: 'left', location: 'beside cheek' }] }
  };
  const parse = () => parseCriticalCameraQaResponse(JSON.stringify({ checks: [check] }), { finalPrompt: EXPLICIT_REAR_PROMPT });
  assert.equal(parse().pass, true);
  check.head_geometry.ears.push({ side: 'left', location: 'behind the first ear on the same side' });
  assert.ok(parse().issues.some(issue => issue.type === 'anatomy' && isMaterialImageQualityIssue(issue)));
  check.head_geometry.ears[1].side = 'uncertain';
  assert.equal(parse().pass, false);
  assert.equal(parse().issues.some(isMaterialImageQualityIssue), false);
  check.head_geometry.ears[1].side = 'right';
  assert.equal(parse().pass, true, 'two ears on opposite sides are not automatically a defect');
  check.head_geometry = { status: 'defect', evidence: 'The face and rear cranium have separate incompatible jaw connections.', ears: [] };
  assert.ok(parse().issues.some(issue => issue.type === 'anatomy'));
  delete check.head_geometry;
  assert.equal(parse().pass, false);
  assert.equal(parse().issues.some(isMaterialImageQualityIssue), false);
  assert.match(buildCriticalCameraQaPrompt({ finalPrompt: EXPLICIT_REAR_PROMPT }), /headwear.*not anatomical ears/i);
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

test('wardrobe drift has a reference-independent review contract with visibility and scripted-change exceptions', () => {
  const prompt = buildImageQualityQaPrompt({ finalPrompt: 'WARDROBE COMPONENT LOCK:', referenceImageCount: 0 });
  assert.match(prompt, /wardrobe_continuity/);
  assert.match(prompt, /wardrobe_evidence/);
  assert.match(prompt, /first_visibility/);
  assert.match(prompt, /scripted_change/);
  assert.match(prompt, /anatomical_left\|anatomical_right/);
  assert.match(prompt, /inner garment/);
  assert.match(prompt, /screen-left\/right/);
  const example = JSON.parse(prompt.match(/^\{"pass":true,"observations":.*$/m)[0]);
  assert.equal(typeof example.observations.wardrobe, 'string');
  const singlePrompt = buildImageQualityQaPrompt({ mode: 'single-image' });
  const singleExample = JSON.parse(singlePrompt.match(/^\{"pass":true,"observations":.*$/m)[0]);
  assert.equal(Object.hasOwn(singleExample.observations, 'wardrobe'), false);
  assert.doesNotMatch(buildImageQualityQaPrompt({ mode: 'single-image' }), /WARDROBE CONTINUITY CHECK/);
});

const wardrobeIssue = (component = 'waist fastening') => ({
  type: 'wardrobe_continuity', panel: 4, subject: 'Actor A', reason: 'The same exposed clothing region has changed.',
  wardrobe_evidence: { component, first_panel: 1, first_location: 'left torso', later_location: 'right torso',
    first_state: 'two attached pieces', later_state: 'no attached pieces', first_visibility: 'clear', later_visibility: 'clear',
    matched_features: ['short curled hair', 'oval eyewear'], scripted_change: 'none', difference_kind: 'component_state' },
});

test('visible wardrobe-component drift is repairable even without reference sheets', () => {
  for (const component of ['shoulder fastener', 'sleeve ornament']) {
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [wardrobeIssue(component)] }));
    assert.ok(result.issues.some(issue => issue.type === 'wardrobe_continuity' && issue.panel === 4 && isMaterialImageQualityIssue(issue)));
  }
});

test('visible anatomical attachment swap and inner-layer substitution are material across changed camera views', () => {
  const sideSwap = wardrobeIssue('shoulder-worn accessory');
  Object.assign(sideSwap.wardrobe_evidence, { difference_kind: 'anatomical_side',
    first_state: 'strap on wearer left shoulder', later_state: 'strap on wearer right shoulder',
    first_body_side: 'anatomical_left', later_body_side: 'anatomical_right' });
  const layerSwap = wardrobeIssue('inner garment');
  Object.assign(layerSwap.wardrobe_evidence, { difference_kind: 'layering', layer_relation: 'visible beneath the same outer coat',
    first_state: 'dark high-neck top', later_state: 'light collared shirt' });
  for (const issue of [sideSwap, layerSwap]) {
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [issue] }));
    assert.ok(result.issues.some(item => item.type === 'wardrobe_continuity' && isMaterialImageQualityIssue(item)));
  }
});

test('screen-side reversal, hidden layers, ambiguous attachment and scripted changes never authorize repair', () => {
  const patches = [
    { difference_kind: 'anatomical_side', first_body_side: 'anatomical_left', later_body_side: 'anatomical_left',
      first_state: 'strap appears screen-left', later_state: 'strap appears screen-right' },
    { difference_kind: 'anatomical_side', first_body_side: 'screen_left', later_body_side: 'screen_right' },
    { difference_kind: 'anatomical_side', first_body_side: 'anatomical_left', later_body_side: 'uncertain' },
    { difference_kind: 'layering', layer_relation: '' },
    { difference_kind: 'layering', layer_relation: 'beneath coat', later_visibility: 'occluded' },
    { difference_kind: 'anatomical_side', first_body_side: 'anatomical_left', later_body_side: 'anatomical_right', scripted_change: 'present' },
    { difference_kind: 'style_only' },
  ];
  for (const patch of patches) {
    const issue = wardrobeIssue('worn component');
    Object.assign(issue.wardrobe_evidence, patch);
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [issue] }));
    assert.equal(result.issues.some(item => item.type === 'wardrobe_continuity'), false);
    assert.ok(result.issues.some(item => item.type === 'unverified'));
  }
});

test('unseen parts, identity ambiguity and scripted wardrobe changes cannot become automatic repair targets', () => {
  for (const patch of [{ first_visibility: 'occluded' }, { later_visibility: 'cropped' }, { scripted_change: 'present' },
    { scripted_change: 'uncertain' }, { matched_features: ['one cue'] }, { first_panel: 4 }, { first_state: 'no attached pieces' }]) {
    const issue = wardrobeIssue();
    Object.assign(issue.wardrobe_evidence, patch);
    const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [issue] }));
    assert.equal(result.issues.some(item => item.type === 'wardrobe_continuity'), false);
    assert.ok(result.issues.some(item => item.type === 'unverified'));
    assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
  }
});

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

const stylePrompt = ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'].map((style, index) =>
  `## Panel ${index + 1}\nCamera: eye-level\nCAST COUNT: [foreground actor] each EXACTLY ONCE;\n${style === 'NORMAL' ? '' : `PANEL STYLE LOCK: ${style};\nStyle: Draw this panel in ${style}.`}`).join('\n');
const styleReport = () => ({ pass: true, issues: [], observations, spatial_checks: spatialChecks().map((entry, index) => ({
  ...entry, hand_geometry: { ...entry.hand_geometry, actor_limb_inventory: [{ actor: 'foreground actor', visible_hands: [], evidence: 'Hands outside the frame.' }] }, art_style: {
    expected_style: ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'][index],
    observed_style: ['NORMAL', 'WATERCOLOR', 'GEKIGA', 'CHIBI_GAG'][index],
    status: 'ok', material_impact: 'none',
    linework: { status: 'ok', scope: 'actor', location: 'foreground actor outline', observed: 'Variable brush contours around jaw and hair.' },
    coloring: { status: 'ok', scope: 'actor', location: 'foreground face and clothing', observed: 'Distinct lit planes and bounded shadow fills.' },
    faces: [{ status: 'ok', visibility: 'clear', subject: 'foreground actor', location: 'left foreground',
      rendering: [null, 'transparent_washes', null, 'shortened_body'][index], rendering_scope: 'actor',
      observed: 'Carved brow/nose/jaw; facial ink models cheek planes.', construction: 'realistic_planes', ink: 'modeled_ink' }],
  },
})) });

test('optional color style QA requires every selected panel observation and leaves existing routes unchanged', () => {
  const plain = buildImageQualityQaPrompt({ finalPrompt: stylePrompt });
  assert.equal(buildImageQualityQaPrompt({ finalPrompt: stylePrompt, requirePanelStyleEvidence: false }), plain);
  const enabled = buildImageQualityQaPrompt({ finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  assert.match(enabled, /PANEL STYLE EVIDENCE/);
  assert.match(enabled, /3=GEKIGA/);
  assert.match(enabled, /clothes or background.*never prove.*face/i);
  for (const finalPrompt of [`[ MONOCHROME THREE-TONE MANUSCRIPT LOCK ]\n${stylePrompt}`, '## Panel 1\nReference-sheet style only.']) {
    assert.equal(buildImageQualityQaPrompt({ finalPrompt, requirePanelStyleEvidence: true }), buildImageQualityQaPrompt({ finalPrompt }));
  }
  const report = { pass: true, issues: [], observations, spatial_checks: spatialChecks().map(entry => {
    withHandInventory(entry, ['foreground actor']); return entry;
  }) };
  assert.equal(parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt }).pass, true);
  const missing = parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  assert.equal(missing.pass, false);
  assert.equal(missing.issues.filter(issue => issue.subject === 'art_style').length, 4);
  assert.ok(missing.issues.every(issue => issue.type === 'unverified'));
});

test('grounded panel media can pass but normal anime faces cannot satisfy GEKIGA through clothing ink', () => {
  const report = styleReport();
  const parse = () => parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  assert.equal(parse().pass, true);
  Object.assign(report.spatial_checks[2].art_style.faces[0], { construction: 'anime_template', ink: 'flat',
    observed: 'Large flat anime eyes and dot nose; ink only on clothes.' });
  report.spatial_checks[2].art_style.material_impact = 'requested_medium_missing';
  report.spatial_checks[2].art_style.status = 'defect';
  const mismatch = parse();
  assert.equal(mismatch.pass, false);
  const issue = mismatch.issues.find(issue => issue.type === 'art_style');
  assert.equal(issue.panel, 3);
  assert.equal(issue.styleEvidence.visibleRegion, 'face');
  assert.equal(issue.styleEvidence.expectedStyle, 'GEKIGA');
  assert.equal(issue.styleEvidence.materialImpact, 'requested_medium_missing');
  assert.match(issue.styleEvidence.observed, /flat anime/);
});

test('a good primary gekiga face cannot conceal a clearly anime secondary face', () => {
  for (const names of [['A', 'B'], ['B', 'A']]) {
    const report = styleReport();
    const style = report.spatial_checks[2].art_style;
    style.faces = names.map(subject => ({ ...style.faces[0], subject }));
    Object.assign(style.faces[1], { status: 'defect', construction: 'anime_template', ink: 'flat',
      location: 'right visible face', observed: 'Flat anime nose and cheek without modeled ink planes.' });
    style.status = 'defect'; style.material_impact = 'requested_medium_missing';
    const finalPrompt = stylePrompt.replace('## Panel 3\nCamera: eye-level\nCAST COUNT: [foreground actor]', `## Panel 3\nCamera: eye-level\nCAST COUNT: [${names.join('], [')}]`);
    const result = parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt, requirePanelStyleEvidence: true });
    assert.ok(result.issues.some(issue => issue.type === 'art_style' && issue.subject === names[1]));
  }
});

test('fatal QA report format failures mark the request unusable', () => {
  for (const text of ['broken JSON', '{"pass":true}', '{"pass":true,"issues":[],"spatial_checks":{"$columns":["panel"],"$rows":[[]]}}']) {
    const review = parseImageQualityQaResponse(text);
    assert.equal(review.requestFailed, true);
    assert.equal(review.pass, false);
    assert.ok(review.issues.every(issue => !isMaterialImageQualityIssue(issue)));
  }
});

test('invalid QA table diagnostics identify structural cause without echoing cell values', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], spatial_checks: {
    $columns: ['panel', 'object_geometry'], $rows: [[1, 'private-cell-do-not-echo', 'extra-cell']],
  } }));
  assert.equal(result.requestFailed, true);
  assert.match(result.issues[0].reason, /row 0 width=3; expected=2/);
  assert.doesNotMatch(result.issues[0].reason, /private-cell|extra-cell/);
});

test('scale audit distinguishes incoherent miniature actors from valid distance or scripted stylization', () => {
  const prompt = buildImageQualityQaPrompt({ referenceImageCount: 2 });
  assert.match(prompt, /actor scale against occlusion and ground-plane depth/i);
  assert.match(prompt, /valid distant actors, scripted size differences and chibi/i);
  const bad = spatialChecks();
  bad[1].object_geometry = { status: 'defect', evidence: 'Foreground adult overlaps the nearer torso but has one-quarter head scale with no supporting depth or scripted size change.' };
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, observations, spatial_checks: bad, issues: [] }));
  assert.ok(result.issues.some(issue => issue.type === 'object_geometry' && issue.panel === 2));
  const good = spatialChecks();
  good[1].object_geometry = { status: 'ok', evidence: 'Smaller distant adults stand behind the foreground body with consistent ground plane and occlusion.' };
  assert.ok(!parseImageQualityQaResponse(JSON.stringify({ pass: true, observations, spatial_checks: good, issues: [] })).issues.some(issue => issue.type === 'object_geometry'));
});

test('cast contracts accept emitted punctuation but never infer a roster from nearby prose', () => {
  for (const suffix of ['; no duplicates.', '.']) {
    assert.deepEqual(extractPanelCastContracts(`## Panel 1\nCAST COUNT: [A], [B] each EXACTLY ONCE${suffix}`),
      [{ panel: 1, names: ['A', 'B'], replicaNames: [] }]);
  }
  for (const line of ['Action (visual only): [A] each EXACTLY ONCE.', 'CAST COUNT: [A] each EXACTLY ONCEISH.',
    'CAST COUNT: [A] could appear.', 'ANTI-CLONE REMINDER: [A] is optional.']) {
    assert.deepEqual(extractPanelCastContracts(`## Panel 1\n${line}`), []);
  }
});

test('style coverage requires each named actor and preserves grounded hidden faces', () => {
  const names = ['A', 'B'];
  const finalPrompt = stylePrompt.replaceAll('[foreground actor]', '[A], [B]');
  const makeReport = () => {
    const report = styleReport();
    for (const entry of report.spatial_checks) {
      withHandInventory(entry, names);
      entry.art_style.faces = names.map(subject => ({ ...entry.art_style.faces[0], subject }));
    }
    return report;
  };
  const parse = report => parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt, requirePanelStyleEvidence: true });
  assert.equal(parse(makeReport()).pass, true);
  for (const mutate of [
    faces => faces.pop(),
    faces => faces.push({ ...faces[0] }),
    faces => { faces[1].subject = 'unknown actor'; },
    faces => { faces[1].observed = ''; },
    faces => { faces[1].visibility = 'uncertain'; },
  ]) {
    const report = makeReport(); mutate(report.spatial_checks[2].art_style.faces);
    const result = parse(report);
    assert.equal(result.pass, false);
    assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
  }
  for (const visibility of ['hidden', 'back_view', 'too_small']) {
    const report = makeReport();
    Object.assign(report.spatial_checks[2].art_style.faces[1], { visibility, status: 'not_visible',
      observed: 'Rear head behind the left shoulder; facial planes cannot be seen.' });
    assert.equal(parse(report).pass, true, 'one unavailable face does not force reorientation when the other visible face is verified');
    Object.assign(report.spatial_checks[2].art_style.faces[0], { visibility, status: 'not_visible' });
    assert.equal(parse(report).pass, false, 'no observable face cannot certify facial rendering');
  }
  const legacy = makeReport();
  for (const entry of legacy.spatial_checks) { entry.art_style.face = entry.art_style.faces[0]; delete entry.art_style.faces; }
  assert.equal(parse(legacy).pass, false, 'one legacy focal face cannot certify a group');
  const single = styleReport();
  for (const entry of single.spatial_checks) { entry.art_style.face = entry.art_style.faces[0]; delete entry.art_style.faces; }
  assert.equal(parseImageQualityQaResponse(JSON.stringify(single), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true }).pass, true);
});

test('dense four-panel five-person QA tables preserve every expanded record and verdict', () => {
  const names = ['A', 'B', 'C', 'D', 'E'];
  const finalPrompt = stylePrompt.replaceAll('[foreground actor]', names.map(name => `[${name}]`).join(', '));
  const report = styleReport();
  for (const entry of report.spatial_checks) {
    withHandInventory(entry, names);
    entry.art_style.faces = names.map(subject => ({ ...entry.art_style.faces[0], subject }));
    entry.cast_instances = names.map(name => ({ name, observed_count: 1, status: 'ok', instances: [
      { location: `${name} foreground`, matched_features: ['hairstyle', 'eyewear'] },
    ] }));
    entry.identity_checks = names.map(name => ({ name, status: 'ok', evidence: `${name} retains hair and eyewear.` }));
    entry.surface_text.visible_texts = [{ subject: 'card', text: '一日店長。', text_role: 'story_required', text_role_reason: 'requested sign' },
      { subject: 'board', text: '当たり！', text_role: 'story_required', text_role_reason: 'requested board' }];
    entry.bubble_speaker.bubbles = names.slice(0, 2).map((subject, index) => ({ id: `B${index + 1}`, speaker: subject,
      text: index ? 'ありがとう！' : 'どうぞ。', x: index ? 0.25 : 0.75, y: 0.2, evidence: 'Visible balloon and mouth endpoint.' }));
  }
  const parse = value => parseImageQualityQaResponse(JSON.stringify(value), { finalPrompt, requirePanelStyleEvidence: true });
  for (const defective of [false, true]) {
    if (defective) {
      const style = report.spatial_checks[2].art_style;
      Object.assign(style.faces[4], { construction: 'anime_template', ink: 'flat', status: 'defect' });
      style.status = 'defect'; style.material_impact = 'requested_medium_missing';
    }
    const regular = parse(report), compact = parse(tableQaArrays(report));
    assert.deepEqual(compact, regular);
    assert.deepEqual(compact.spatialChecks, report.spatial_checks);
    assert.equal(compact.issues.some(issue => issue.type === 'art_style'), defective);
  }
});

test('style uncertainty, hidden faces, minor differences and bare style labels cannot spend a repair', () => {
  for (const mutate of [
    style => { delete style.faces[0]; },
    style => { style.faces[0].visibility = 'hidden'; style.faces[0].status = 'not_visible'; },
    style => { style.faces[0].visibility = 'uncertain'; },
    style => { style.faces[0].construction = 'uncertain'; },
    style => { style.faces[0].observed = ''; },
    style => { style.faces[0].construction = 'anime_template'; style.material_impact = 'minor_variation'; },
    style => { style.expected_style = 'NORMAL'; },
    style => { style.observed_style = 'NORMAL'; },
    style => { style.status = 'defect'; },
  ]) {
    const report = styleReport();
    mutate(report.spatial_checks[2].art_style);
    const result = parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
    assert.equal(result.pass, false);
    assert.ok(result.issues.every(issue => issue.type === 'unverified'));
  }
  const bare = styleReport();
  bare.issues.push({ type: 'art_style', panel: 3, subject: 'face', reason: 'Wrong style.' });
  const result = parseImageQualityQaResponse(JSON.stringify(bare), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  assert.equal(result.pass, false);
  assert.ok(result.issues.every(issue => issue.type === 'unverified'));
  for (const status of ['ok', 'uncertain']) {
    const conflicting = styleReport();
    const style = conflicting.spatial_checks[2].art_style;
    style.status = status;
    style.material_impact = 'requested_medium_missing';
    Object.assign(style.faces[0], { construction: 'anime_template', ink: 'flat', status: 'defect',
      observed: 'Large flat anime eyes and dot nose; ink only on clothes.' });
    const conflict = parseImageQualityQaResponse(JSON.stringify(conflicting), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
    assert.equal(conflict.pass, false);
    assert.ok(conflict.issues.every(issue => issue.type === 'unverified'), 'contradictory or uncertain overall verdict cannot authorize repair');
  }
  assert.deepEqual(
    parseImageQualityQaResponse(JSON.stringify(bare), { finalPrompt: stylePrompt, requirePanelStyleEvidence: false }),
    parseImageQualityQaResponse(JSON.stringify(bare), { finalPrompt: stylePrompt }),
    'an unsolicited art_style label keeps legacy behavior without the OpenAI color opt-in',
  );
});

test('style comparison uses visible medium evidence beyond GEKIGA and preserves allowed face construction', () => {
  const report = styleReport();
  const parse = () => parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  Object.assign(report.spatial_checks[1].art_style.faces[0], { construction: 'anime_template', ink: 'flat' });
  assert.equal(parse().pass, true, 'watercolor need not reconstruct facial anatomy as GEKIGA');
  const watercolor = report.spatial_checks[1].art_style;
  watercolor.coloring = { status: 'defect', scope: 'actor', location: 'face and clothing', observed: 'Opaque flat cel fills; no transparent painted washes.' };
  watercolor.material_impact = 'requested_medium_missing';
  watercolor.status = 'defect';
  const result = parse();
  assert.equal(result.pass, false);
  assert.equal(result.issues.find(issue => issue.type === 'art_style').styleEvidence.visibleRegion, 'coloring');
  delete watercolor.faces[0];
  const partlyUnobserved = parse();
  assert.ok(partlyUnobserved.issues.some(issue => issue.type === 'art_style'), 'a missing face observation cannot hide a clear coloring defect');
  assert.ok(partlyUnobserved.issues.some(issue => issue.type === 'unverified'));
});
const withHandInventory = (check, actors) => {
  check.hand_geometry.actor_limb_inventory = actors.map((actor, index) => ({
    actor, visible_hands: [{ anatomical_side: 'right', x: 0.2 + index * 0.2, y: 0.65, shoulder_connection: 'clear' }],
    evidence: `${actor}'s right hand is distinct at the lower side of the panel and connected to the arm.`,
  }));
};

test('full-body framing records visible crop without making a harmless missing foot a paid repair', () => {
  const finalPrompt = '## Panel 1\nCamera: full body from above\nSHOT EXECUTION: head-to-feet inside panel with floor beyond BOTH shoes;\nCAST COUNT: [A], [B], [C] each EXACTLY ONCE;';
  const checks = spatialChecks();
  checks[0].camera_geometry.dimensions.framing = {
    requested: 'head-to-feet inside panel', observed: 'faces and torsos visible; lower legs leave the bottom edge',
    status: 'defect', visible_extent: 'partial_body', material_impact: 'none',
  };
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  assert.equal(result.pass, false);
  assert.ok(result.issues.some(issue => issue.type === 'unverified' && /framing/i.test(issue.reason)));
  assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
  const contradictory = spatialChecks();
  contradictory[0].camera_geometry.dimensions.framing = {
    requested: 'head-to-feet inside panel', observed: 'both shoes inside panel',
    status: 'ok', visible_extent: 'partial_body', material_impact: 'none',
  };
  const mismatch = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: contradictory }), { finalPrompt });
  assert.ok(mismatch.issues.some(issue => issue.type === 'unverified' && /framing/i.test(issue.reason)));
  const full = spatialChecks();
  full[0].camera_geometry.dimensions.framing.visible_extent = 'head_to_toe';
  full[0].camera_geometry.dimensions.framing.material_impact = 'none';
  full[0].camera_geometry.dimensions.framing.actor_visibility = ['A', 'B', 'C'].map((subject, index) => ({
    subject, lowest_visible_part: 'feet', edge_relation: 'inside', foot_location: { x: 0.2 + index * 0.3, y: 0.8 },
  }));
  withHandInventory(full[0], ['A', 'B', 'C']);
  assert.equal(parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: full }), { finalPrompt }).pass, true);
  const unsupported = spatialChecks();
  unsupported[0].camera_geometry.dimensions.framing.visible_extent = 'head_to_toe';
  unsupported[0].camera_geometry.dimensions.framing.material_impact = 'none';
  assert.ok(parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: unsupported }), { finalPrompt }).issues
    .some(issue => issue.type === 'unverified' && /framing/i.test(issue.reason)));
  const focusPrompt = '## Panel 1\nCamera: Aの全身を大きく、BとCを奥に置く\nSHOT EXECUTION: head-to-feet inside panel;\nCAST COUNT: [A], [B], [C] each EXACTLY ONCE;';
  const focus = spatialChecks();
  withHandInventory(focus[0], ['A', 'B', 'C']);
  focus[0].camera_geometry.dimensions.framing = {
    ...full[0].camera_geometry.dimensions.framing,
    actor_visibility: [full[0].camera_geometry.dimensions.framing.actor_visibility[0]],
  };
  assert.equal(parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: focus }), { finalPrompt: focusPrompt }).pass, true);
  const material = spatialChecks();
  material[0].camera_geometry.dimensions.framing = {
    requested: 'head-to-feet inside panel', observed: 'the scripted floor contact is outside the frame',
    status: 'defect', visible_extent: 'partial_body', material_impact: 'material',
  };
  const blocked = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: material }), { finalPrompt });
  assert.ok(blocked.issues.some(issue => issue.type === 'camera_geometry' && isMaterialImageQualityIssue(issue)));
});

test('actor-level hand count rejects a clear third hand but does not punish uncertain overlap', () => {
  const finalPrompt = '## Panel 1\nCamera: medium\nCAST COUNT: [A] each EXACTLY ONCE;';
  assert.match(buildImageQualityQaPrompt({ finalPrompt }), /actor_limb_inventory.*visible_hands/i);
  const checks = spatialChecks(1);
  const review = () => parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  assert.ok(review().issues.some(issue => issue.type === 'unverified' && /per-actor visible-hand inventory/.test(issue.reason)));
  const hand = (side, x) => ({ anatomical_side: side, x, y: 0.65, shoulder_connection: 'clear' });
  checks[0].hand_geometry.actor_limb_inventory = [{ actor: 'A', visible_hands: [hand('left', 0.3), hand('right', 0.7)], evidence: 'Two distinct hand endpoints at opposite sides of A.' }];
  assert.equal(review().issues.some(issue => /per-actor visible-hand inventory/.test(issue.reason)), false);
  checks[0].hand_geometry.actor_limb_inventory[0].visible_hands.push(hand('uncertain', 0.5));
  assert.ok(review().issues.some(issue => issue.type === 'anatomy' && issue.panel === 1));
  assert.ok(review().issues.some(isMaterialImageQualityIssue));
  checks[0].hand_geometry.actor_limb_inventory[0].visible_hands = [hand('left', 0.3), hand('uncertain', 0.5)];
  assert.ok(review().issues.some(issue => issue.type === 'unverified' && /per-actor visible-hand inventory/.test(issue.reason)));
  assert.equal(review().issues.some(issue => issue.type === 'anatomy'), false);
});

test('focused hand audit can turn omitted general-review inventory into a material defect', () => {
  const contracts = [{ panel: 4, names: ['A'] }];
  assert.match(buildActorHandAuditPrompt(contracts), /three distinct visible hands/i);
  const hand = (side, x) => ({ anatomical_side: side, x, y: 0.6, shoulder_connection: 'clear' });
  const response = hands => JSON.stringify({ panels: [{ panel: 4, cast_instances: [{ name: 'A', observed_count: 1, status: 'ok',
    instances: [{ location: 'center physical body', matched_features: ['short hair', 'light jacket'] }] }], actor_limb_inventory: [{
    actor: 'A', visible_hands: hands, evidence: 'Fist at upper left, book grip at center, palm below the book.',
  }] }] });
  const clear = parseActorHandAuditResponse(response([hand('left', 0.2), hand('right', 0.5), hand('uncertain', 0.7)]), contracts);
  assert.ok(clear.some(issue => issue.type === 'anatomy' && isMaterialImageQualityIssue(issue)));
  assert.deepEqual(parseActorHandAuditResponse(response([hand('left', 0.2), hand('right', 0.5)]), contracts), []);
  assert.ok(parseActorHandAuditResponse(response([hand('left', 0.2), { ...hand('uncertain', 0.5), shoulder_connection: 'uncertain' }]), contracts)
    .some(issue => issue.type === 'unverified'));
  assert.ok(parseActorHandAuditResponse('{}', contracts).some(issue => issue.type === 'unverified'));
});

test('a scripted hand-to-prop action needs actor-specific visual evidence before PASS', () => {
  const finalPrompt = [
    '## Panel 1\nDialogue: silent',
    '## Panel 2\nDialogue: silent',
    '## Panel 3\nDialogue: silent',
    '## Panel 4\nCAST COUNT: [リン], [アカリ] each EXACTLY ONCE; no duplicates.\nAction (visual only): アカリは掲示板のカードに触れ、リンは別のカードを留める。\nDialogue: silent',
  ].join('\n');
  const checks = spatialChecks();
  const review = () => parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  assert.match(buildImageQualityQaPrompt({ finalPrompt }), /panel 4: リン, アカリ|panel 4: アカリ, リン/);
  withHandInventory(checks[3], ['リン', 'アカリ']);
  assert.ok(review().issues.some(issue => issue.type === 'unverified' && issue.panel === 4 && issue.subject === 'action_fidelity'));

  checks[3].action_fidelity = { status: 'ok', evidence: 'The board and both actors are visible.', contacts: [
    { actor: 'アカリ', target: 'card on board', observed: 'Finger touches the card', status: 'ok', evidence: 'The finger and card edge meet at the board.' },
  ] };
  assert.ok(review().issues.some(issue => issue.type === 'unverified' && issue.panel === 4 && issue.subject === 'リン'));

  checks[3].action_fidelity.contacts.push({ actor: 'リン', target: 'second card on board', observed: 'Hands stay at chest', status: 'defect', evidence: 'Both hands are visibly away from the board and card.' });
  assert.ok(review().issues.some(issue => issue.type === 'action_fidelity' && issue.panel === 4 && issue.subject === 'リン'));
  checks[3].action_fidelity.contacts[1] = { actor: 'リン', target: 'second card on board', observed: 'Right hand pins the card', status: 'ok', evidence: 'The right wrist, hand, and card edge meet at the board.' };
  assert.equal(review().pass, true);
});

test('omitting cross-panel wardrobe inspection cannot silently pass the wardrobe contract', () => {
  const finalPrompt = 'WARDROBE COMPONENT LOCK:\n' + [1, 2, 3, 4].map(n => `## Panel ${n}\nDialogue: silent`).join('\n');
  const payload = { pass: true, issues: [], observations, spatial_checks: spatialChecks() };
  assert.equal(parseImageQualityQaResponse(JSON.stringify(payload), { finalPrompt }).pass, false);
  const checked = { ...payload, observations: { ...observations, wardrobe: 'The same visible coat construction recurs in panels 1-4.' } };
  assert.equal(parseImageQualityQaResponse(JSON.stringify(checked), { finalPrompt }).pass, true);
});

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

test('registered full names and bracket typography are one speaker, but unknown titles and other people are not', () => {
  for (const castLine of ['- Character [ルカ（夜の案内人）]: blue coat', '- [ルカ（夜の案内人）]: blue coat', 'MOSAIC PROTECTED CAST: ["ルカ（夜の案内人）"]']) {
    const finalPrompt = `${castLine}\n## Panel 1\nDialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="出発だ。". TAIL TIP LOCK: B1=>[ルカ] mouth/head.\n## Panel 2\nDialogue: silent\n## Panel 3\nDialogue: silent\n## Panel 4\nDialogue: silent`;
    const inspect = target => {
      const checks = spatialChecks();
      checks[0].bubble_speaker = { status: 'ok', evidence: 'Tail touches the blue-coated actor at right.', left_to_right_texts: ['出発だ。'], bubbles: [{
        bubble: 'B1', text: '出発だ。', expected_speaker: 'ルカ【夜の案内人】', observed_tail_target: target,
        tail_endpoint_evidence: 'The tip touches the visible head silhouette.', endpoint_relation: 'touches_speaker',
        tail_tip: { x: 0.5, y: 0.3 }, speaker_anchor: { x: 0.51, y: 0.31, part: 'head' },
        root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'The lower root crosses empty space only.',
        center_x: 0.7, position_evidence: 'Right balloon body.',
      }] };
      return parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
    };
    const same = inspect('ルカ【夜の案内人】');
    assert.ok(!same.issues.some(issue => issue.type === 'bubble_speaker' || /reviewer copied/.test(issue.reason)), castLine);
    for (const other of ['ルカ【別の称号】', '他人']) assert.ok(inspect(other).issues.some(issue => issue.type === 'bubble_speaker'));
  }
});

test('collective tails require member evidence, not literal equality with a group description', () => {
  const finalPrompt = `MOSAIC PROTECTED CAST: ["甲","乙","丙"]
## Panel 1
CAST COUNT: [甲], [乙], [丙] each EXACTLY ONCE.
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="確認しよう。". TAIL TIP LOCK: B1=>[全員] mouth/head. BALLOON LAYOUT (NEVER PRINT): B1 x=0.7, [全員] members=甲・乙 頭, tail=二人へ.
## Panel 2
Dialogue: silent
## Panel 3
Dialogue: silent
## Panel 4
Dialogue: silent`;
  const target = name => ({ observed_tail_target: name, endpoint_relation: 'points_to_speaker',
    tail_endpoint_evidence: `Visible branch points to ${name}'s head.`,
    tail_tip: { x: 0.5, y: 0.3 }, speaker_anchor: { x: 0.51, y: 0.31, part: 'head' },
    root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'The lower branch crosses empty space.' });
  const inspect = targets => {
    const checks = spatialChecks();
    checks[0].hand_geometry.actor_limb_inventory = ['甲', '乙', '丙'].map(actor => ({ actor, visible_hands: [], evidence: 'Hands are cropped out.' }));
    checks[0].bubble_speaker = { status: 'ok', evidence: 'Visible group balloon.', left_to_right_texts: ['確認しよう。'], bubbles: [{
      bubble: 'B1', text: '確認しよう。', expected_speaker: '全員', observed_tail_target: 'all group heads',
      tail_endpoint_evidence: 'Tail splits toward the group.', targets,
    }] };
    return parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), { finalPrompt });
  };
  for (const targets of [undefined, [], [target('甲')], [target('甲'), target('甲')]]) {
    const review = inspect(targets);
    assert.equal(review.pass, false);
    assert.ok(review.issues.some(issue => issue.type === 'unverified' && issue.subject === 'B1'));
    assert.ok(!review.issues.some(issue => issue.type === 'bubble_speaker'), JSON.stringify(review.issues));
    assert.ok(!review.issues.some(isMaterialImageQualityIssue));
  }
  assert.equal(inspect([target('乙'), target('甲')]).pass, true);
  for (const bad of [
    { ...target('丙'), endpoint_relation: 'wrong_character' },
    { ...target('乙'), path_relation: 'crosses_face' },
    { ...target('乙'), endpoint_relation: 'empty_space' },
  ]) assert.ok(inspect([target('甲'), bad]).issues.some(issue => issue.type === 'bubble_speaker'));
  assert.match(buildImageQualityQaPrompt({ finalPrompt }), /COLLECTIVE.*targets/s);
});

test('enumerated collective bubble contracts retain complete owners and preserve single interpunct names', () => {
  const prompt = speaker => `## Panel 1
CAST COUNT: [ジョン・スミス], [はるか], [甲] each EXACTLY ONCE.
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="確認しよう。". TAIL TIP LOCK: B1=>[${speaker}] mouth/head.
## Panel 2
Dialogue: silent`;
  for (const speaker of ['ジョン・スミス・はるか', 'はるか／ジョン スミス']) {
    const bubble = imageQualityQa.extractBubbleContracts(prompt(speaker))[0].bubbles[0];
    assert.deepEqual(bubble.members, ['はるか', 'ジョンスミス']);
  }
  const individual = imageQualityQa.extractBubbleContracts(prompt('ジョン・スミス'))[0].bubbles[0];
  assert.equal(individual.speaker, 'ジョン・スミス');
  assert.equal(individual.members, undefined);
});

test('unverified style evidence retains located face discrepancy observations without authorizing repair', () => {
  const observed = 'Large flat anime eyes and a dot nose remain; hatching is only on clothes.';
  for (const mismatch of ['unknown_ink', 'missing_ink', 'uncertain_panel', 'contradictory_panel']) {
    const report = styleReport();
    const style = report.spatial_checks[2].art_style;
    Object.assign(style, { status: 'defect', material_impact: 'requested_medium_missing' });
    Object.assign(style.faces[0], { status: 'defect', construction: 'anime_template', ink: 'flat',
      location: 'upper left face', observed });
    if (mismatch === 'unknown_ink') style.faces[0].ink = 'uncertain';
    if (mismatch === 'missing_ink') delete style.faces[0].ink;
    if (mismatch === 'uncertain_panel') style.status = 'uncertain';
    if (mismatch === 'contradictory_panel') style.status = 'ok';
    const result = parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
    assert.equal(result.pass, false, mismatch);
    assert.ok(result.issues.every(issue => issue.type === 'unverified'), mismatch);
    assert.equal(result.issues.some(isMaterialImageQualityIssue), false, mismatch);
    const reason = result.issues.map(issue => issue.reason).join('\n');
    assert.ok(reason.includes(observed), mismatch);
    assert.match(reason, /foreground actor.*upper left face/);
  }
  const hidden = styleReport();
  Object.assign(hidden.spatial_checks[2].art_style.faces[0], { visibility: 'back_view', status: 'not_visible',
    construction: 'anime_template', observed: 'Rear head hides all facial features.' });
  const unavailable = parseImageQualityQaResponse(JSON.stringify(hidden), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
  assert.ok(unavailable.issues.every(issue => issue.type === 'unverified'));
  assert.doesNotMatch(unavailable.issues.map(issue => issue.reason).join('\n'), /Reported face discrepancy/);
  assert.equal(parseImageQualityQaResponse(JSON.stringify(styleReport()), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true }).pass, true);
});

test('actor media cannot pass on background-only cues, missing body or pigment evidence, or recipe echoes', () => {
  for (const [style, cue, observed] of [
    ['CHIBI_GAG', 'shortened_body', 'Left actor has an enlarged cranium above a visibly short torso and jointed short arms.'],
    ['WATERCOLOR', 'transparent_washes', 'Left cheek and blue sleeve have translucent pigment pooling at broken edges.'],
    ['UKIYOE', 'woodblock_planes', 'Left face and sleeve use carved black contours surrounding flat pigment shapes.'],
    ['POP_ART', 'ben_day_print', 'Left cheek shadows contain regular colored dots bounded by bold black contours.'],
    ['SKETCH', 'pencil_strokes', 'Left jaw and collar are built from separate scratchy graphite strokes.'],
    ['THICK_PAINT', 'opaque_brush_masses', 'Left cheek and jacket turn through overlapping opaque brush masses.'],
  ]) {
    const prompt = stylePrompt.replace('## Panel 1\nCamera: eye-level', `## Panel 1\nPANEL STYLE LOCK: ${style};\nStyle: Redraw the actor in ${style}.\nCamera: eye-level`);
    const report = styleReport();
    const art = report.spatial_checks[0].art_style;
    art.expected_style = art.observed_style = style;
    Object.assign(art.faces[0], { observed, rendering: cue, rendering_scope: 'actor' });
    art.linework.scope = art.coloring.scope = 'actor';
    const parse = () => parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: prompt, requirePanelStyleEvidence: true });
    assert.equal(parse().pass, true, style);
    for (const patch of [{ rendering: undefined }, { rendering: 'uncertain' }, { rendering_scope: 'background' },
      { observed: `Redraw the actor in ${style}.` }, { observed: style }]) {
      const saved = { ...art.faces[0] };
      Object.assign(art.faces[0], patch);
      const result = parse();
      assert.equal(result.pass, false, `${style}: ${JSON.stringify(patch)}`);
      assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
      art.faces[0] = saved;
    }
    art.linework.scope = art.coloring.scope = 'background';
    const background = parse();
    assert.equal(background.pass, false, `${style}: background alone`);
    assert.equal(background.issues.some(isMaterialImageQualityIssue), false);
  }
});

test('style observations must describe pixels rather than repeat classification enums or verdicts', () => {
  for (const panel of [0, 1, 2, 3]) {
    for (const field of ['linework', 'coloring', 'face']) {
      for (const observed of ['realistic_planes', 'modeled_ink', 'realistic_planes / modeled_ink: ok',
        'transparent_washes', 'shortened_body', 'pencil_strokes; none', 'GEKIGA, pass']) {
        const report = styleReport();
        const style = report.spatial_checks[panel].art_style;
        const region = field === 'face' ? style.faces[0] : style[field];
        region.observed = observed;
        const result = parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true });
        assert.equal(result.pass, false, `panel ${panel + 1} ${field}: ${observed}`);
        assert.ok(result.issues.some(issue => issue.type === 'unverified' && issue.subject === 'art_style'));
        assert.equal(result.issues.some(isMaterialImageQualityIssue), false);
      }
    }
  }
  const report = styleReport();
  report.spatial_checks[2].art_style.faces[0].observed = 'Small eyes sit under thick upper lids; a triangular nose-side shadow joins the hatched cheek.';
  assert.equal(parseImageQualityQaResponse(JSON.stringify(report), { finalPrompt: stylePrompt, requirePanelStyleEvidence: true }).pass, true);
});

test('the primary QA response example contains the required per-face style observations', () => {
  const request = buildImageQualityQaPrompt({ finalPrompt: stylePrompt, requirePanelStyleEvidence:true });
  const example = JSON.parse(request.match(/^\{"pass":true[^\n]+/m)[0]);
  const style = example.spatial_checks[0].art_style;
  assert.ok(style?.linework && style.coloring && Array.isArray(style.faces));
  assert.ok(style.faces[0].construction && style.faces[0].ink && style.faces[0].visibility);
  const plain = buildImageQualityQaPrompt({ finalPrompt:stylePrompt });
  assert.equal(JSON.parse(plain.match(/^\{"pass":true[^\n]+/m)[0]).spatial_checks[0].art_style,undefined);
});

test('focused body and hand audit distinguishes a missing actor from hidden hands or unresolved occlusion', () => {
  const contracts = [{ panel: 4, names: ['A'] }];
  const inspect = record => parseActorHandAuditResponse(JSON.stringify({ panels: [{ panel: 4,
    cast_instances: record ? [record] : [],
    actor_limb_inventory: [{ actor: 'A', visible_hands: [], evidence: 'No visible hands.' }],
  }] }), contracts);
  const missing = { name: 'A', observed_count: 0, status: 'defect', evidence: 'Whole panel inspected: no matching physical body; only a drawing on the paper.', instances: [] };
  assert.ok(inspect(missing).some(issue => issue.type === 'cast_count' && isMaterialImageQualityIssue(issue)));
  for (const record of [undefined, { ...missing, status: 'uncertain' }, { ...missing, evidence: '' }]) {
    const issues = inspect(record);
    assert.ok(issues.some(issue => issue.type === 'unverified'));
    assert.ok(!issues.some(isMaterialImageQualityIssue));
  }
  assert.deepEqual(inspect({ name: 'A', observed_count: 1, status: 'ok',
    instances: [{ location: 'rear head and shoulder; face hidden', matched_features: ['twin tails', 'striped jacket'] }] }), []);
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

test('upward camera PASS needs localized surface evidence, without regenerating from uncertainty', () => {
  let finalPrompt = '## Panel 1\nCamera: 床近くから見上げるワイドショット';
  const checks = spatialChecks();
  const parse = () => parseImageQualityQaResponse(JSON.stringify({pass:true,issues:[],observations,spatial_checks:checks}), {finalPrompt});
  checks[0].camera_geometry.dimensions.elevation = {requested:'floor-level',observed:'upward view, chin/underside, shelf horizon low',status:'ok'};
  const unsupported = parse();
  assert.ok(unsupported.issues.some(i => i.panel === 1 && i.subject === 'camera_geometry' && /projection cues/.test(i.reason)));
  assert.equal(unsupported.issues.some(isMaterialImageQualityIssue), false);
  finalPrompt = '## Panel 1\nCamera: 胸より低い位置から見上げる中景';
  checks[0].camera_geometry.dimensions.elevation.status = 'ok';
  assert.ok(parse().issues.some(i => /projection cues/.test(i.reason)), 'ordinary low-angle labels need evidence too');
  checks[0].camera_geometry.dimensions.elevation.projection_cues = [
    {subject:'foreground face',surface:'underside',x:0.6,y:0.3},
    {subject:'shelf board',surface:'underside',x:0.2,y:0.5},
  ];
  assert.equal(parse().issues.some(i => /projection cues/.test(i.reason)), false);
  checks[0].camera_geometry.dimensions.elevation.projection_cues[1].surface = 'unclear';
  assert.ok(parse().issues.some(i => /projection cues/.test(i.reason)));
  const ordinary = parseImageQualityQaResponse(JSON.stringify({pass:true,issues:[],observations,spatial_checks:checks}), {finalPrompt:'## Panel 1\nCamera: 正面アイレベル'});
  assert.equal(ordinary.issues.some(i => /projection cues/.test(i.reason)), false);
  const horizontal = parseImageQualityQaResponse(JSON.stringify({pass:true,issues:[],observations,spatial_checks:checks}), {finalPrompt:'## Panel 1\nCamera: 低い位置から水平に撮る'});
  assert.equal(horizontal.issues.some(i => /projection cues/.test(i.reason)), false);
});

test('downward camera PASS needs localized top surfaces, while ambiguous views retain the image', () => {
  for (const camera of ['high-angle', '俯瞰', '肩越しにやや高く撮る']) {
    const checks = spatialChecks();
    const elevation = checks[0].camera_geometry.dimensions.elevation;
    const parse = () => parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
      finalPrompt: `## Panel 1\nCamera: ${camera}`,
    });
    const labelOnly = parse();
    assert.equal(labelOnly.pass, false, camera);
    assert.ok(labelOnly.issues.some(issue => /projection cues/.test(issue.reason)), camera);
    assert.equal(labelOnly.issues.some(isMaterialImageQualityIssue), false);
    elevation.projection_cues = [
      { subject: 'actor crown', surface: 'top', x: 0.65, y: 0.25 },
      { subject: 'table surface', surface: 'top', x: 0.3, y: 0.6 },
    ];
    assert.equal(parse().pass, true, camera);
    for (const badCue of [
      { ...elevation.projection_cues[0] },
      { subject: 'table surface', surface: 'front', x: 0.3, y: 0.6 },
      { subject: 'table surface', surface: 'top', x: 1.4, y: 0.6 },
    ]) {
      elevation.projection_cues[1] = badCue;
      assert.equal(parse().pass, false, camera);
      assert.equal(parse().issues.some(isMaterialImageQualityIssue), false);
    }
  }
});

test('explicit camera dimensions cannot pass as not applicable or copied labels', () => {
  for (const [axis, camera, observed] of [
    ['elevation', 'low-angle', 'Chin underside at upper right and shelf underside across the top.'],
    ['azimuth', 'left side view', 'Left cheek and left shoulder overlap the far upper arm at panel right.'],
    ['azimuth', 'rear view', 'Rear skull and back shoulder plane cover the partner at the lower left.'],
    ['framing', 'close-up', 'Face fills the right half and both shoulders leave the lower border.'],
    ['lens', 'wide-angle', 'Near hand fills lower left; its owner recedes to a small torso beside the doorway.'],
    ['lens', 'telephoto', 'Rear doorway is almost the height of the foreground actor, with weakly converging floor edges.'],
    ['lens', 'fisheye', 'Door posts curve outward at both edges while the central face remains centered.'],
  ]) {
    const checks = spatialChecks();
    const dimension = checks[0].camera_geometry.dimensions[axis];
    const parse = () => parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
      finalPrompt: `## Panel 1\nCamera: ${camera}`,
    });
    Object.assign(dimension, { requested: camera, observed, status: 'not_applicable' });
    if (axis === 'elevation') dimension.projection_cues = [
      { subject: 'chin', surface: 'underside', x: 0.7, y: 0.3 },
      { subject: 'shelf', surface: 'underside', x: 0.3, y: 0.1 },
    ];
    const omitted = parse();
    assert.equal(omitted.pass, false, `${axis}: ${camera}`);
    assert.equal(omitted.issues.some(isMaterialImageQualityIssue), false);
    Object.assign(dimension, { status: 'ok', observed: camera });
    const copied = parse();
    assert.equal(copied.pass, false, `${axis}: ${camera}`);
    assert.equal(copied.issues.some(isMaterialImageQualityIssue), false);
    dimension.observed = observed;
    assert.equal(parse().pass, true, `${axis}: ${camera}`);
  }
  assert.equal(parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: spatialChecks() }), {
    finalPrompt: '## Panel 1\nCamera: eye-level',
  }).pass, true, 'an unspecified lens remains not applicable');
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

test('camera review cannot pass by repeating the generated shot instruction as observation', () => {
  const checks = spatialChecks();
  checks[3].camera_geometry.dimensions.elevation = {
    requested: '高い位置から俯瞰',
    observed: 'Looking down on head/shoulder tops, shortened torsos, upper prop faces.',
    status: 'ok',
  };
  const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }));
  assert.equal(review.pass, false);
  assert.ok(review.issues.some(issue => issue.panel === 4 && issue.subject === 'camera_geometry' && issue.type === 'unverified'));
});

test('current shot execution cannot substitute for observed camera evidence', () => {
  for (const [axis, camera, observed] of [
    ['elevation', 'low-angle', getPanelShotExecution('low-angle')],
    ['elevation', 'low-angle', 'chin/jaw undersides, prop undersides from below; forehead recedes, horizon below faces'],
    ['lens', 'wide-angle', getPanelShotExecution('wide-angle')],
    ['lens', 'fisheye', getPanelShotExecution('fisheye')],
  ]) {
    const checks = spatialChecks();
    checks[0].camera_geometry.dimensions[axis] = { requested: camera, observed, status: 'ok' };
    checks[0].camera_geometry.dimensions.elevation.projection_cues = [
      { subject: 'chin', surface: 'underside', x: 0.7, y: 0.3 },
      { subject: 'shelf', surface: 'underside', x: 0.3, y: 0.1 },
    ];
    const review = parseImageQualityQaResponse(JSON.stringify({ pass: true, issues: [], observations, spatial_checks: checks }), {
      finalPrompt: `## Panel 1\nCamera: ${camera}`,
    });
    assert.equal(review.pass, false, `${camera}: ${observed}`);
    assert.ok(review.issues.some(issue => issue.subject === 'camera_geometry' && issue.type === 'unverified'));
    assert.equal(review.issues.some(isMaterialImageQualityIssue), false);
  }
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
  assert.match(prompt, /change in face drawing, expression, proportions or manga style alone is not an identity failure/i);
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
    withHandInventory(check, ['PersonA']);
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
  const makeReview = (bubbles, reportedDefect = false) => {
    const checks = spatialChecks();
    checks[2].bubble_speaker = {
      status: reportedDefect ? 'defect' : 'ok', evidence: 'Each tail was traced from balloon outline to its visible endpoint.',
      left_to_right_texts: ['香りで交渉する流れ？', '菓子をしまいなさい。'], bubbles,
    };
    const issues = reportedDefect ? ['bubble_speaker', 'bubble_order'].map(type => ({ type, panel: 3, subject: 'B1', reason: 'Reviewer claims the B-number identifies a wrong speaker/order.' })) : [];
    return parseImageQualityQaResponse(JSON.stringify({ pass: !reportedDefect, issues, observations, spatial_checks: checks }), { finalPrompt });
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
  assert.ok(separated.issues.some(issue => issue.type === 'unverified' && issue.subject === 'B1'));
  assert.ok(separated.issues.every(issue => !isMaterialImageQualityIssue(issue)), 'an unsupported contact claim is not proof of a wrong speaker');
  const ordinaryGap = makeReview([{ ...baseB1,
    endpoint_relation: 'points_to_speaker', tail_endpoint_evidence: 'Tail points unambiguously toward the assigned speaker with a normal air gap.',
    tail_tip: { x: 0.4, y: 0.51 }, speaker_anchor: { x: 0.4, y: 0.65, part: 'mouth' },
  }, validB2]);
  assert.ok(ordinaryGap.issues.every(issue => !isMaterialImageQualityIssue(issue)));
  const shortPointer = makeReview([{ ...baseB1, endpoint_relation: 'points_to_speaker',
    tail_endpoint_evidence: 'The short tail points to the correct head without touching it.',
    tail_tip: { x: 0.4, y: 0.60 },
  }, validB2]);
  assert.equal(shortPointer.pass, true);

  const falsifiedExpectedSpeaker = makeReview([{ ...baseB1, expected_speaker: 'ミク', observed_tail_target: 'ミク',
    tail_tip: { x: 0.44, y: 0.38 }, speaker_anchor: { x: 0.46, y: 0.40, part: 'head' } }, validB2]);
  assert.equal(falsifiedExpectedSpeaker.pass, false);
  assert.ok(falsifiedExpectedSpeaker.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1' && /サエコ/.test(issue.reason)));

  const ambiguous = makeReview([{ ...baseB1, endpoint_relation: 'ambiguous', tail_endpoint_evidence: 'The tail disappears between two heads.' }, validB2]);
  assert.equal(ambiguous.pass, false);
  assert.ok(ambiguous.issues.some(issue => issue.type === 'unverified' && issue.subject === 'B1'));

  const correct = makeReview([{ ...baseB1, tail_tip: { x: 0.39, y: 0.63 } }, validB2]);
  assert.equal(correct.pass, true);

  // Reviewer ID errors cannot reassign a correctly drawn line to another speaker.
  for (const bubbles of [
    [{ ...baseB1, bubble: 'B2', tail_tip: { x: 0.39, y: 0.63 } }, { ...validB2, bubble: 'B1' }],
    [{ ...baseB1, text: '別の台詞', observed_tail_target: 'ミク' }, validB2],
    [{ ...baseB1, bubble: 'B9', observed_tail_target: 'ミク' }, validB2],
  ]) {
    for (const reportedDefect of [false, true]) {
      const result = makeReview(bubbles, reportedDefect);
      assert.equal(result.pass, false);
      assert.ok(result.issues.some(issue => issue.type === 'unverified'));
      assert.ok(result.issues.every(issue => !['bubble_speaker', 'bubble_order'].includes(issue.type)));
    }
  }

  const reviewerMislabelsSpeaker = makeReview([{ ...baseB1, expected_speaker: 'ミク',
    tail_tip: { x: 0.39, y: 0.63 } }, validB2]);
  assert.equal(reviewerMislabelsSpeaker.pass, false);
  assert.ok(reviewerMislabelsSpeaker.issues.some(issue => issue.type === 'unverified' && issue.subject === 'B1'));
  assert.ok(reviewerMislabelsSpeaker.issues.every(issue => issue.type !== 'bubble_speaker'));

  // The first balloon may move toward its speaker while remaining right of B2.
  const nearby = makeReview([{ ...baseB1, center_x: 0.49, tail_tip: { x: 0.39, y: 0.63 } }, validB2]);
  assert.equal(nearby.pass, true);
  const screenTarget = makeReview([{ ...baseB1, observed_tail_target: '画面内の人物',
    endpoint_relation: 'wrong_character', tail_endpoint_evidence: 'Tip ends on the screen character, away from the mapped speaker.' }, validB2]);
  assert.equal(screenTarget.pass, false);
  assert.ok(screenTarget.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1'));

  const crossesHead = makeReview([{ ...baseB1, tail_tip: { x: 0.39, y: 0.63 },
    path_relation: 'crosses_head', tail_path_evidence: 'The tail passes across Saeko\'s crown before reaching her mouth.' }, validB2]);
  assert.equal(crossesHead.pass, false);
  assert.ok(crossesHead.issues.some(issue => issue.type === 'bubble_speaker' && issue.subject === 'B1' && /crosses_head/.test(issue.reason)));
});

test('a distant sole balloon cannot pass on an uncorroborated speaker-contact claim', () => {
  const finalPrompt = `## Panel 1
Dialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="確認した。". TAIL TIP LOCK: B1=>[甲] mouth/head.
## Panel 2
Dialogue: silent
## Panel 3
Dialogue: silent
## Panel 4
Dialogue: silent`;
  const checks = spatialChecks();
  checks[0].bubble_speaker = {
    status: 'ok', evidence: 'Tail appears to touch the speaker.', left_to_right_texts: ['確認した。'],
    bubbles: [{
      bubble: 'B1', text: '確認した。', expected_speaker: '甲', observed_tail_target: '甲',
      tail_endpoint_evidence: 'Tip appears to touch the speaker head.', endpoint_relation: 'touches_speaker',
      tail_tip: { x: 0.27, y: 0.42 }, speaker_anchor: { x: 0.28, y: 0.43, part: 'head' },
      root_relation: 'lower_speaker_facing', path_relation: 'clear', tail_path_evidence: 'Tail is claimed to cross empty space.',
      center_x: 0.75, position_evidence: 'Balloon body at far right.',
    }],
  };
  const review = () => parseImageQualityQaResponse(JSON.stringify({
    pass: true, issues: [], observations, spatial_checks: checks,
  }), { finalPrompt });

  const distant = review();
  assert.equal(distant.pass, false);
  assert.ok(distant.issues.some(issue => issue.type === 'unverified' && issue.panel === 1 && issue.subject === 'B1'));
  assert.ok(distant.issues.every(issue => issue.type !== 'bubble_speaker'));

  checks[0].bubble_speaker.bubbles[0].center_x = 0.48;
  const nearby = review();
  assert.equal(nearby.pass, true);
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

test('a recognizable character with only a face-style variation is not a paid repair target', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [{ type: 'character_reference', panel: 1, subject: 'アカリ', reason: 'face is drawn in chibi style',
      identity_evidence: { location: 'left foreground', matched_features: ['orange bob', 'sailor collar'],
        reference_evidence: 'same character on reference sheet', observed_feature: 'chibi face',
        expected_feature: 'normal face', difference_kind: 'style_only' } }],
  }));
  assert.equal(result.issues[0].type, 'unverified');
  assert.equal(isMaterialImageQualityIssue(result.issues[0]), false);
});

test('a single hair variation is reported but cannot authorize paid repair', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({ pass: false, issues: [{
    type: 'character_reference', panel: 2, subject: 'actor', reason: 'the bob curls outward',
    identity_evidence: { location: 'panel left', matched_features: ['shirt', 'eyewear'],
      reference_evidence: 'reference sheet bob', observed_feature: 'outward bob', expected_feature: 'inward bob',
      difference_kind: 'identity_feature', material_features: ['hair'] },
  }] }));
  const issue = result.issues.find(entry => entry.type === 'character_reference');
  assert.ok(issue);
  assert.equal(isMaterialImageQualityIssue(issue), false);
  assert.equal(isMaterialImageQualityIssue({ ...issue, materialFeatures: ['hair', 'outfit'] }), true);
  assert.equal(isMaterialImageQualityIssue({ ...issue, materialFeatures: ['eyewear'] }), true);
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
    scenario: 'OLD FOUR PANEL SCENARIO SENTINEL',
    castList: 'OLD FOUR PANEL CAST SENTINEL',
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
  assert.doesNotMatch(prompt, /OLD FOUR PANEL SCENARIO SENTINEL|OLD FOUR PANEL CAST SENTINEL/);
  assert.match(prompt, /reference sheets.*do not require every reference character/i);
});
