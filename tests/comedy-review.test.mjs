import test from 'node:test';
import assert from 'node:assert/strict';
import { buildComedyReviewRequest, applyComedyReview, reviewComedyPrompt } from '../src/lib/comedy-review.js';
const source = 'Action: 食べた菓子が復活する。誰も驚かない。\nDialogue: また増えた。\nEYE-LINE LOCK: face viewer';
test('preserves surreal script and accepts only exact auxiliary patches', () => {
  const raw = JSON.stringify({ observations: [{ panel: 1, kind: 'keep_gag', reason: '復活はギャグとして保持' }], patches: [{ line: 2, before: 'EYE-LINE LOCK: face viewer', after: 'EYE-LINE LOCK: follow Action', confidence: 'high', reason: '補助指示を調整' }] });
  const r = applyComedyReview(source, raw);
  assert.equal(r.warning, '');
  assert.equal(r.prompt.split('\n').slice(0, 2).join('\n'), source.split('\n').slice(0, 2).join('\n'));
  assert.match(buildComedyReviewRequest({ prompt: source, scenario: source, castList: '' }), /absent reactions|KEEP the original/);
});
test('rejects script edits, stale patches, low confidence and malformed responses without losing original', () => {
  for (const patch of [
    { line: 0, before: source.split('\n')[0], after: 'Action: 普通に食べる。', confidence: 'high' },
    { line: 2, before: 'stale', after: 'EYE-LINE LOCK: target', confidence: 'high' },
    { line: 2, before: source.split('\n')[2], after: 'EYE-LINE LOCK: target', confidence: 'low' }
  ]) {
    const r = applyComedyReview(source, JSON.stringify({ observations: [], patches: [{ ...patch, reason: 'test' }] }));
    assert.equal(r.prompt, source);
    assert.ok(r.warning);
  }
  assert.equal(applyComedyReview(source, 'invalid').prompt, source);
});
test('no changes is a valid successful review', () => {
  assert.equal(applyComedyReview(source, '{"observations":[],"patches":[]}').warning, '');
});

test('geometry clarification preserves the surreal event, camera and valid auxiliary direction', () => {
  const original = 'Action: A floating toolbox talks to its owner.\nCamera: rear view\nCOMPOSITION STAGING: toolbox behind the person';
  const after = 'COMPOSITION STAGING: toolbox behind the person; its front edge disappears behind the shoulder, separate from the hair';
  const result = applyComedyReview(original, JSON.stringify({ observations: [], patches: [{ line: 2, before: original.split('\n')[2], after, confidence: 'high', reason: 'Resolve overlap without changing the floating-object gag' }] }));
  assert.equal(result.prompt, original.split('\n').slice(0, 2).join('\n') + '\n' + after);
  const request = buildComedyReviewRequest({ prompt: original, scenario: original, castList: '' });
  assert.match(request, /OBJECT GEOMETRY LOCK/);
  assert.match(request, /not proof that a future image is correct/);
  assert.match(request, /minimal geometric clarification to an existing COMPOSITION STAGING line/);
  assert.match(request, /Keep the line's existing valid staging constraints/);
  assert.match(request, /do not invent props, bindings, writing directions, camera changes or story events/);
});

test('automatic review can specialize functional geometry without changing script or explicit camera', () => {
  const before = 'FUNCTIONAL SURFACE PANEL CHECK: solve target-to-front/back geometry before projection.';
  const script = 'Action: A clerk submits a form to a customer across the desk.\nCamera: behind the customer\n';
  const after = 'FUNCTIONAL SURFACE PANEL CHECK: reader=customer; holder=clerk; camera behind customer; customer rear shoulder foreground; form front and text face customer, same side as camera.';
  const input = script + before;
  const request = buildComedyReviewRequest({ prompt: input, scenario: script, castList: '' });
  const eligible = JSON.parse(request.split('ELIGIBLE LINES:\n')[1]);
  assert.deepEqual(eligible, [{ line: 2, text: before }]);
  const reviewed = applyComedyReview(input, JSON.stringify({ observations: [], patches: [{ line: 2, before, after,
    surface: { subject: 'form', reader: 'customer', source: { line: 0, text: script.split('\n')[0] } },
    reason: 'Reader and holder have different roles', confidence: 'high' }] }));
  assert.equal(reviewed.warning, '');
  assert.ok(reviewed.prompt.startsWith(script));
  assert.match(reviewed.prompt, /form; intended reader\/recipient=customer/);
  assert.match(reviewed.prompt, /If camera shares reader side, show front/);
  assert.match(reviewed.prompt, /opposite an upright face, show back\/edge/);
  assert.match(request, /Across a table.*upside-down/);
  assert.match(request, /actual reader's rear head\/shoulder foreground/);
  assert.match(request, /hide the front instead of rotating the object or text/);
});

test('free-form inverted projection from the live failure is ignored; other valid patches survive', () => {
  const before = 'FUNCTIONAL SURFACE PANEL CHECK: solve geometry';
  const input = 'Action: リンがタブレットを読む。\nCamera: リンの肩越し後方\n' + before + '\nEYE-LINE LOCK: face viewer';
  const bad = { line: 2, before, after: 'FUNCTIONAL SURFACE PANEL CHECK: カメラはリンの肩越し後方なので画面を見せず裏面を見せる。', confidence: 'high', reason: 'live regression' };
  const good = { line: 3, before: 'EYE-LINE LOCK: face viewer', after: 'EYE-LINE LOCK: follow Action', confidence: 'high', reason: 'preserve target' };
  const result = applyComedyReview(input, JSON.stringify({ observations: [], patches: [bad, good] }));
  assert.ok(result.warning);
  assert.equal(result.prompt.split('\n')[2], before);
  assert.equal(result.prompt.split('\n')[3], good.after);
  const structured = applyComedyReview(input, JSON.stringify({ observations: [], patches: [{ ...bad, surface: { subject: 'タブレット', reader: 'リン', source: { line: 0, text: input.split('\n')[0] } } }] }));
  assert.equal(structured.warning, '');
  assert.match(structured.prompt, /shares reader side, show front/);
  assert.doesNotMatch(structured.prompt, /なので画面を見せず/);
});

test('surface specialization requires exact same-panel Action evidence without invented actors', () => {
  const before = 'FUNCTIONAL SURFACE PANEL CHECK: solve geometry';
  const input = '## Panel 1\nAction: Clerk holds a form for Customer.\n## Panel 2\nCamera: overhead\nAction: Actor watches.\n' + before;
  for (const surface of [
    undefined,
    { subject: 'form', reader: 'Customer', source: { line: 1, text: 'Action: Clerk holds a form for Customer.' } },
    { subject: 'form', reader: 'Customer', source: { line: 4, text: 'Action: edited story' } },
    { subject: 'form', reader: 'Customer', source: { line: 4, text: 'Action: Actor watches.' } },
  ]) {
    const result = applyComedyReview(input, JSON.stringify({ observations: [], patches: [{ line: 5, before, surface, reason: 'test', confidence: 'high' }] }));
    assert.equal(result.prompt, input);
    assert.ok(result.warning);
  }
});

test('review preserves the Web-copy budget while retaining a useful shorter patch', () => {
  const before = 'FUNCTIONAL SURFACE PANEL CHECK: solve geometry';
  const base = 'Action: Reader holds a page.\n' + before + '\nEYE-LINE LOCK: face viewer\n';
  const input = base + 'x'.repeat(15000 - base.length);
  const result = applyComedyReview(input, JSON.stringify({ observations: [], patches: [
    { line: 1, before, confidence: 'high', reason: 'clarify', surface: { subject: 'page', reader: 'Reader', source: { line: 0, text: base.split('\n')[0] } } },
    { line: 2, before: 'EYE-LINE LOCK: face viewer', after: 'EYE-LINE LOCK: Action', confidence: 'high', reason: 'restore target' },
  ] }));
  assert.ok(result.prompt.length <= 15000);
  assert.equal(result.prompt.split('\n')[1], before);
  assert.equal(result.prompt.split('\n')[2], 'EYE-LINE LOCK: Action');
});

test('both provider Action annotations supply source evidence without changing their text', () => {
  for (const label of ['Action (visual only)', 'Action (Visual ONLY, non-dialogue; do NOT render quoted words as visible text unless this action explicitly says handwriting, signage, board text, label text, or screen text)']) {
    const action = label + ': Reader holds a page.';
    const before = 'FUNCTIONAL SURFACE PANEL CHECK: solve geometry';
    const input = action + '\n' + before;
    const request = buildComedyReviewRequest({ prompt: input, scenario: action, castList: '' });
    const sources = JSON.parse(request.split('NUMBERED ACTION SOURCES:\n')[1].split('\nELIGIBLE LINES:')[0]);
    assert.deepEqual(sources, [{ line: 0, text: action }]);
    const result = applyComedyReview(input, JSON.stringify({ observations: [], patches: [{ line: 1, before, confidence: 'high', reason: 'source',
      surface: { subject: 'page', reader: 'Reader', source: sources[0] },
    }] }));
    assert.equal(result.warning, '');
    assert.equal(result.prompt.split('\n')[0], action);
    assert.match(result.prompt, /intended reader\/recipient=Reader/);
  }
});

test('automatic review awaits a result and retains usable original on failure or invalid repair', async () => {
  const input = { prompt: source, scenario: source, castList: '' };
  for (const request of [async () => { throw new Error('offline'); }, async () => ({text:'invalid'}), async () => ({text:'{"observations":[],"patches":[]}'})]) {
    const result = await reviewComedyPrompt(input, request);
    assert.equal(result.prompt, source);
    assert.equal(result.original, source);
  }
  let finish;
  const pending = reviewComedyPrompt(input, () => new Promise(resolve => { finish = resolve; }));
  let settled = false;
  pending.then(() => { settled = true; });
  await Promise.resolve();
  assert.equal(settled, false);
  finish({text: JSON.stringify({ observations: [], patches: [{ line:2, before:'EYE-LINE LOCK: face viewer', after:'EYE-LINE LOCK: follow Action', confidence:'high', reason:'矛盾解消' }] })});
  const result = await pending;
  assert.match(result.prompt, /EYE-LINE LOCK: follow Action/);
  assert.equal(result.prompt.split('\n')[0], source.split('\n')[0]);
});

test('STEP3 publishes and returns the reviewed candidate with no extra review UI', async () => {
  const { readFile } = await import('node:fs/promises');
  const workflow = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
  const step = workflow.slice(workflow.indexOf('const assemblePrompt ='), workflow.indexOf('// [v3.04]'));
  assert.ok(step.indexOf('await reviewComedyPrompt') < step.indexOf('setFinalPrompt(reviewed.prompt)'));
  assert.match(step, /return reviewed.prompt/);
  assert.doesNotMatch(step, /if.*reviewed.warning.*return null/);
  const panel = await readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(panel, /WebPromptReview|ギャグを保ってAI精査/);
});
