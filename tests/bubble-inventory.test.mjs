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

test('independent read does not clear other failures', () => {
  const result = applyBubbleInventory({ ...review, pass: false, issues: [{ type: 'anatomy', panel: 2 }] }, inventory(false), prompt);
  assert.equal(result.pass, false);
  assert.equal(result.issues[0].type, 'anatomy');
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
