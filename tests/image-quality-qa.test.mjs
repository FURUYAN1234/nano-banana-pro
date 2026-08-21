import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildImageQualityQaPrompt,
  formatImageQualityIssue,
  parseImageQualityQaResponse,
} from '../src/lib/image-quality-qa.js';

const SINGLE_IMAGE_PROMPT = `[ ANTIGRAVITY EMOTIONAL CINEMA ENGINE v2.1 ]
Create a SINGLE breathtaking illustration.`;

test('quality prompt prioritizes anatomy, hand side, prop ownership, and bubble text over background', () => {
  const prompt = buildImageQualityQaPrompt({
    scenario: 'アカリ「行こう！」',
    castList: 'アカリ: 主人公',
    finalPrompt: "## Panel 3\nCamera: ヒカリの肩越し\nFUNCTIONAL SURFACE PANEL CHECK: solve geometry\nVISIBLE REAR DEPTH CHECK: camera is physically behind [ヒカリ]'s shoulder\nAction (visual only): ヒカリがスマホを読む。\nUNRELATED_RENDERING_NOISE: should be removed",
  });

  for (const type of ['anatomy', 'hand_side', 'prop_ownership', 'prop_orientation', 'camera_geometry', 'bubble_text', 'speaker_name', 'extra_text', 'unverified']) {
    assert.match(prompt, new RegExp(type));
  }
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
  assert.doesNotMatch(prompt, /UNRELATED_RENDERING_NOISE/);
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

test('preserves functional-surface orientation failures as a stable issue type', () => {
  const result = parseImageQualityQaResponse(JSON.stringify({
    pass: false,
    issues: [
      { type: 'prop_orientation', panel: 1, subject: 'counter nameplate', reason: 'readable face points at the camera instead of the customer' },
    ],
  }));

  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'prop_orientation');
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
  });

  assert.match(prompt, /generated single illustration/i);
  assert.match(prompt, /Inspect the supplied image as one continuous scene/i);
  assert.match(prompt, /Do not expect or reward a panel grid, comic layout, speech bubbles, or dialogue/i);
  assert.doesNotMatch(prompt, /generated four-panel manga page/i);
  assert.doesNotMatch(prompt, /Inspect the supplied image panel by panel/i);
});
