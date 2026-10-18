import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

test('current README documents all five added endings and the actual provider and inspection controls', async () => {
  const current = (await readFile(new URL('../README.md', import.meta.url), 'utf8')).split(/^## .*ChangeLog/m)[0];
  for (const label of ['怒り・抗議', '逆転・反撃', '激怒・逆ギレ', '自業自得・ブーメラン', '立場逆転']) {
    assert.ok(current.includes(label), `Missing current ending description: ${label}`);
  }
  assert.match(current, /5[～〜]8コマ生成はOpenAIのみ/);
  assert.match(current, /Geminiはカラー・白黒とも4コマ/);
  assert.match(current, /APIで新しく生成した画像は自動検査されます/);
  assert.match(current, /手動の「AIで画像を再検査」ボタンはありません/);
});

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
