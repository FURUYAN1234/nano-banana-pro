import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';

let server;
let getPolicyAnalysisPrompt;
let getPolicyFallbackPrompt;

before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  ({ getPolicyAnalysisPrompt, getPolicyFallbackPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
});

after(async () => server?.close());

test('policy repair asks for the smallest compliant change without rewriting the story', () => {
  const prompt = getPolicyAnalysisPrompt('provider rejection', 'APPROVED FOUR-PANEL PROMPT');

  assert.match(prompt, /最小限の変更/);
  assert.match(prompt, /台詞.*話者.*登場人物.*出来事.*場所.*Camera.*4コマ構造/s);
  assert.match(prompt, /安全基準を回避.*偽装.*分割.*難読化/s);
  assert.doesNotMatch(prompt, /最低3個/);
  assert.doesNotMatch(prompt, /学校設定 → オフィス/);
});

test('fallback policy regeneration preserves the approved contract and avoids fixed setting substitution', () => {
  const prompt = getPolicyFallbackPrompt('provider rejection', 'APPROVED FOUR-PANEL PROMPT');

  assert.match(prompt, /同じ4コマの物語/);
  assert.match(prompt, /台詞全文.*話者順.*登場人物.*場所.*Camera.*枠構成/s);
  assert.match(prompt, /ポリシー回避.*隠語.*綴り崩し.*文字分割/s);
  assert.doesNotMatch(prompt, /モダンなIT企業のオフィス/);
  assert.doesNotMatch(prompt, /tailored slacks/);
});

test('both policy prompts use bounded failure feedback as diagnostic data while preserving safety and content', () => {
  for (const build of [getPolicyAnalysisPrompt, getPolicyFallbackPrompt]) {
    const feedback = '前案は無変更。設定契約を維持した別案が必要。';
    const plain = build('generic refusal', 'APPROVED PROMPT');
    const informed = build('generic refusal', 'APPROVED PROMPT', feedback);
    assert.ok(informed.includes(JSON.stringify(feedback)));
    assert.match(informed, /内部検査データ/);
    assert.match(informed, /回数.*無関係.*変更/);
    assert.ok(!plain.includes('内部検査データ'));
    const long = build('generic refusal', 'APPROVED PROMPT', feedback.repeat(1000));
    assert.ok(long.length - plain.length < 2400, 'feedback cannot duplicate an unbounded history');
    const latest = build('generic refusal', 'APPROVED PROMPT', `${'Old diagnostic. '.repeat(1000)}LATEST FAILURE: preserve render settings.`);
    assert.ok(latest.includes('LATEST FAILURE: preserve render settings.'), 'retain the latest failure when earlier feedback is long');
    assert.equal(informed.split('APPROVED PROMPT').length - 1, 1);
  }
});
