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
