import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('README retains the suite video, voice-comic handoff, and related-system links', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');

  assert.match(readme, /https:\/\/youtu\.be\/pqYVxUUg0Cs\?si=27g1I3tO2EuZkOuxJ/);
  assert.match(readme, /AI Voice Comic Maker integration/);
  assert.match(readme, /YouTube Shorts/);
  assert.match(readme, /github\.com\/FURUYAN1234\/viral-radar/);
  assert.match(readme, /github\.com\/FURUYAN1234\/story-maker/);
  assert.match(readme, /github\.com\/FURUYAN1234\/character-sheet-maker/);
  assert.match(readme, /github\.com\/FURUYAN1234\/comic-translation/);
  assert.match(readme, /github\.com\/FURUYAN1234\/panoforge/);
  assert.match(readme, /github\.com\/FURUYAN1234\/ai-voice-comic-maker/);
});

test('README keeps the OpenAI scenario route synchronized with the selectable model catalog', async () => {
  const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
  const config = JSON.parse(await readFile(new URL('../src/config/openai-scenario-models.json', import.meta.url), 'utf8'));
  const documentedRoute = config.models.map(({ id }) => `\`${id}\``).join(' → ');

  assert.match(readme, new RegExp(`\\| OpenAI \\| ${documentedRoute.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')} \\|`));
});
