import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import { createServer } from 'vite';
import { formatGeneratedMangaTitle } from '../src/lib/manga-title.js';

let server;
let getScenarioPrompt;

before(async () => {
  server = await createServer({
    appType: 'custom',
    logLevel: 'silent',
    server: { middlewareMode: true }
  });
  ({ getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js'));
});

after(async () => {
  await server?.close();
});

test('leaves a generated title without punctuation unpunctuated', () => {
  assert.equal(formatGeneratedMangaTitle('会議室の逆転劇'), '会議室の逆転劇');
});

test('preserves punctuation that the scenario generator intentionally chose', () => {
  assert.equal(formatGeneratedMangaTitle('本当にそれでいいの？'), '本当にそれでいいの？');
  assert.equal(formatGeneratedMangaTitle('締切突破！'), '締切突破！');
});

test('tells the scenario generator not to default every title to !?', () => {
  const prompt = getScenarioPrompt({
    randomCategory: 'テクノロジー',
    targetDate: '2026-08-08',
    inputMode: 'manual',
    manualTopic: '会議で新しいアプリを紹介する',
    newsContext: '',
    searchTopicKeywords: '',
    bg360Image: null,
    bg360Analysis: null,
    bg360Enabled: false,
    customLocation: '',
    customOutfit: '',
    locationPlan: null,
    ragReactions: [],
    punchlineType: 'Auto',
    comedyTone: 'Auto',
    styleJson: null
  });

  assert.match(prompt, /タイトル末尾を必ず「！？」にするな/);
});
