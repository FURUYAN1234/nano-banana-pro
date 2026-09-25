import test from 'node:test';
import assert from 'node:assert/strict';
import { applyBubbleInventory, buildBubbleInventoryPrompt } from '../src/lib/image-quality-qa.js';
import { enforceBubbleComparison, buildImageQualityRepairPrompt, parseImageFailureAnalysis } from '../src/lib/image-quality-failsafe.js';

const prompt = '## Panel 3\nDialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="袋はここで開く？"; B2="ああ、ここで受け止めよう。". TAIL TIP LOCK: B1=>[ユウ]; B2=>[エムバ].';
const review = { pass: true, issues: [], observations: { dialogue: 'Correct' } };
const inventory = reversed => JSON.stringify({ panels: [{ panel: 3, balloons: [
  { text: '袋はここで開く？', center_x: reversed ? 0.4 : 0.8 },
  { text: 'ああ、ここで受け止めよう。', center_x: reversed ? 0.8 : 0.4 },
] }] });

test('rejects screenshot regression despite a general QA PASS and unordered OCR array', () => {
  const bad = applyBubbleInventory(review, inventory(true), prompt);
  assert.equal(bad.pass, false);
  assert.equal(bad.issues[0].type, 'bubble_order');
  assert.equal(bad.issues[0].panel, 3);
  assert.equal(applyBubbleInventory(review, inventory(false), prompt).pass, true);
  assert.doesNotMatch(buildBubbleInventoryPrompt(), /袋は|受け止め|B1|67%/);
});

test('missing, ambiguous or unmatched physical evidence cannot pass', () => {
  for (const input of ['bad JSON', '{"panels":[]}', '{"panels":{}}', '{"panels":[null]}', inventory(false).replace('0.8', '0.4'), inventory(false).replace('袋は', '箱は')]) {
    const result = applyBubbleInventory(review, input, prompt);
    assert.equal(result.pass, false);
    assert.equal(result.issues[0].type, 'unverified');
  }
});

test('printed text on an in-scene object is not counted as a speech balloon', () => {
  const oneLinePrompt = '## Panel 2\nDialogue (verbatim bubbles): TEXT (PRINT VALUES ONLY): B1="放送を見よう。". TAIL TIP LOCK: B1=>[話者].';
  const response = JSON.stringify({ panels: [{ panel: 2, text_regions: [
    { text: '放送を見よう。', center_x: 0.72, region_kind: 'speech_balloon', container_evidence: 'White organic balloon body with a visible tail.' },
    { text: null, region_kind: 'printed_object', container_evidence: 'Printed on a rectangular booklet page with no balloon body or tail.' },
  ] }] });

  const result = applyBubbleInventory(review, response, oneLinePrompt);
  assert.equal(result.pass, true);
  assert.equal(result.bubbleInventory[0].balloons.length, 1);
  assert.match(buildBubbleInventoryPrompt(), /printed_object/);
  assert.match(buildBubbleInventoryPrompt(), /rectangular.*paper|paper.*rectangular/is);
});

test('independent read does not clear other failures', () => {
  const result = applyBubbleInventory({ ...review, pass: false, issues: [{ type: 'anatomy', panel: 2 }] }, inventory(false), prompt);
  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'anatomy');
});

test('an exact scripted routing-like phrase is dialogue, not leaked metadata', () => {
  const text = '資料にはRIGHTMOSTと書いてある。';
  const contract = `## Panel 1\nDialogue: TEXT (PRINT VALUES ONLY): B1=${JSON.stringify(text)}. TAIL TIP LOCK: B1=>[話者].`;
  const result = applyBubbleInventory(review, JSON.stringify({ panels: [{ panel: 1, text_regions: [{
    text, center_x: 0.5, region_kind: 'speech_balloon', container_evidence: 'White body with a tail.'
  }] }] }), contract);
  assert.equal(result.pass, true);
});

test('comparison cannot overrule verified order or prefer a reverted repair', () => {
  const bad = applyBubbleInventory(review, inventory(true), prompt);
  const good = applyBubbleInventory(review, inventory(false), prompt);
  assert.equal(enforceBubbleComparison({ preferred: 'original' }, bad, good).preferred, 'repair');
  assert.equal(enforceBubbleComparison({ preferred: 'repair' }, good, bad).preferred, 'original');
  const regression = { ...good, issues: [{ type: 'anatomy', panel: 1, subject: 'hand' }] };
  assert.equal(enforceBubbleComparison({ preferred: 'original' }, bad, regression).preferred, 'original');
});

test('repair binds actual text to physical positions without replacing speakers', () => {
  const result = buildImageQualityRepairPrompt({ originalPrompt: prompt, sourceMode: 'source-image', issues: [{ type: 'bubble_order', panel: 3 }] });
  assert.ok(result.includes('physical LEFT -> RIGHT balloon bodies = ["ああ、ここで受け止めよう。","袋はここで開く？"]'));
  assert.match(result, /SAME scripted speaker/);
});

test('AI repair prose cannot reverse the approved dialogue order', () => {
  const wrong = JSON.stringify({ corrections: [{ issueIndex: 0,
    observed: 'Question left, answer right', expected: 'answer right', cause: 'misunderstood order',
    previousFailure: 'first', nextStrategy: 'Put the answer at right; reveal the answer first', verification: 'answer first' }] });
  const options = { issues: [{ type: 'bubble_order', panel: 3, reason: 'observed reverse order' }], originalPrompt: prompt };
  const compiled = parseImageFailureAnalysis(wrong, options);
  assert.doesNotMatch(JSON.stringify(compiled), /answer first|answer right/);
  assert.ok(compiled[0].nextStrategy.includes('["ああ、ここで受け止めよう。","袋はここで開く？"]'));
  const second = parseImageFailureAnalysis(wrong, { ...options, history: [{ analysis: compiled }] });
  assert.notEqual(second[0].nextStrategy, compiled[0].nextStrategy);
  assert.equal(second[0].expected, compiled[0].expected);
});

const verticalPrompt = `- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim; no horizontal text.\n${prompt}`;
const glyphPair = direction => [{ glyph: '袋', x: 0.4, y: 0.2 },
  { glyph: 'は', x: direction === 'vertical' ? 0.4 : 0.6, y: direction === 'vertical' ? 0.4 : 0.2 }];
const directionInventory = (writingDirection, evidence = 'Japanese glyphs form left-to-right rows inside the white balloon.') => JSON.stringify({
  panels: [{ panel: 3, text_regions: [
    { text: '袋はここで開く？', center_x: 0.8, region_kind: 'speech_balloon', container_evidence: 'White balloon with a tail.',
      writing_direction: writingDirection, writing_direction_evidence: evidence, direction_glyphs: glyphPair(writingDirection) },
    { text: 'ああ、ここで受け止めよう。', center_x: 0.4, region_kind: 'speech_balloon', container_evidence: 'White balloon with a tail.',
      writing_direction: 'vertical', writing_direction_evidence: 'Upright Japanese glyphs descend in columns; columns progress right to left.',
      direction_glyphs: [{ glyph: 'あ', x: 0.4, y: 0.2 }, { glyph: 'あ', x: 0.4, y: 0.4 }] },
  ] }],
});

test('independent direction evidence overrides a general PASS for horizontal or mixed Japanese dialogue', () => {
  for (const direction of ['horizontal', 'mixed']) {
    const result = applyBubbleInventory(review, directionInventory(direction), verticalPrompt);
    assert.equal(result.pass, false);
    assert.ok(result.issues.some(issue => issue.type === 'bubble_text' && issue.panel === 3
      && issue.subject === 'bubble_writing_direction' && issue.reason.includes(direction)));
    assert.equal(result.bubbleInventory[0].status, 'ok', 'direction is separate from balloon order');
    assert.match(buildImageQualityRepairPrompt({ originalPrompt: verticalPrompt, issues: result.issues }), /bubble_text/);
  }
});

test('unknown, missing or ungrounded direction remains unverified rather than an invented repair target', () => {
  for (const response of [directionInventory('unknown'), directionInventory(undefined), directionInventory('horizontal', ''),
    directionInventory('vertical', ''), directionInventory('diagonal')]) {
    const result = applyBubbleInventory(review, response, verticalPrompt);
    assert.equal(result.pass, false);
    assert.ok(result.issues.some(issue => issue.type === 'unverified' && issue.subject === 'bubble_writing_direction'));
    assert.equal(result.issues.some(issue => issue.type === 'bubble_text'), false);
  }
  const legacy = applyBubbleInventory(review, inventory(false), verticalPrompt);
  assert.equal(legacy.pass, false);
  assert.ok(legacy.issues.every(issue => issue.type === 'unverified' && issue.subject === 'bubble_writing_direction'));
});

test('a direction label alone or coordinates contradicting it cannot invent a paid repair target', () => {
  for (const samples of [undefined, glyphPair('vertical'), [{glyph:'別',x:0.2,y:0.2},{glyph:'字',x:0.4,y:0.2}]]) {
    const response = JSON.parse(directionInventory('horizontal'));
    response.panels[0].text_regions[0].direction_glyphs = samples;
    const result = applyBubbleInventory(review, JSON.stringify(response), verticalPrompt);
    assert.equal(result.pass, false);
    assert.ok(result.issues.some(issue => issue.subject === 'bubble_writing_direction' && issue.type === 'unverified'));
    assert.equal(result.issues.some(issue => issue.type === 'bubble_text'), false);
  }
});

test('inventory uses panel closeups without treating them as extra manga pages', () => {
  assert.match(buildBubbleInventoryPrompt({panelCropCount:4}), /Images 2.*5.*closeups/);
  assert.match(buildBubbleInventoryPrompt({panelCropCount:4}), /direction_glyphs/);
});

test('vertical dialogue passes while horizontal surface, caption and sound-effect text stays out of the dialogue-direction check', () => {
  const data = JSON.parse(directionInventory('vertical', 'Upright glyphs descend top to bottom in right-to-left columns.'));
  for (const region_kind of ['printed_object', 'caption', 'sound_effect']) {
    data.panels[0].text_regions.push({ text: '受付はこちら', region_kind, container_evidence: 'Separate non-balloon lettering.',
      writing_direction: 'horizontal', writing_direction_evidence: 'Japanese words run left to right.' });
  }
  assert.equal(applyBubbleInventory(review, JSON.stringify(data), verticalPrompt).pass, true);
});

test('silent panels and non-Japanese or single-character dialogue do not invent a vertical direction defect', () => {
  const rule = '- Only Dialogue becomes white bubbles: vertical Japanese tategaki, verbatim.';
  const silent = `${rule}\n## Panel 1\nDialogue: silent`;
  assert.equal(applyBubbleInventory(review, JSON.stringify({ panels: [{ panel: 1, text_regions: [] }] }), silent).pass, true);
  for (const text of ['OK!', '42', 'え？']) {
    const scene = `${rule}\n## Panel 1\nDialogue: TEXT (PRINT VALUES ONLY): B1="${text}".`;
    const response = JSON.stringify({ panels: [{ panel: 1, text_regions: [{ text, center_x: 0.5,
      region_kind: 'speech_balloon', container_evidence: 'White speech balloon.', writing_direction: 'horizontal',
      writing_direction_evidence: 'One short run in a balloon.' }] }] });
    assert.equal(applyBubbleInventory(review, response, scene).pass, true);
  }
});

test('direction enforcement requires an explicit vertical-dialogue contract and recognizes compact typography rules', () => {
  assert.equal(applyBubbleInventory(review, directionInventory('horizontal'), prompt).pass, true);
  for (const rule of ['TYPE: title Gothic. BUBBLES: tategaki Mincho.', '  TYPE: title Gothic. BUBBLES: tategaki Mincho.',
    '- Render every Japanese dialogue bubble in vertical Japanese tategaki using regular manga Mincho.']) {
    assert.ok(applyBubbleInventory(review, directionInventory('horizontal'), `${rule}\n${prompt}`).issues
      .some(issue => issue.type === 'bubble_text'));
  }
});

test('inventory asks for observed writing direction and separates it from glyph rotation and surface lettering', () => {
  const request = buildBubbleInventoryPrompt();
  assert.match(request, /writing_direction/);
  assert.match(request, /writing_direction_evidence/);
  assert.match(request, /vertical\|horizontal\|mixed\|unknown/);
  assert.match(request, /rotat/i);
  assert.match(request, /tate.?chu.?yoko/i);
});
