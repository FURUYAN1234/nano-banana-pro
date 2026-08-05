import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readSource = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('STEP1 reset is placed between STEP2 reset and the full reset', async () => {
  const source = await readSource('../src/components/SystemHeader.jsx');

  assert.match(
    source,
    /シナリオ（STEP2）からやり直す[\s\S]*?キャラクター解析（STEP1）からやり直す[\s\S]*?最初からやり直す/,
  );
});

test('STEP1 reset clears character analysis and dependent work but preserves API configuration', async () => {
  const source = await readSource('../src/hooks/useMangaWorkflow.js');
  const step1Reset = source.match(/const step1Reset = \(\) => \{([\s\S]*?)\n  \};/);

  assert.ok(step1Reset, 'step1Reset handler must exist');

  const body = step1Reset[1];
  for (const setter of [
    'setCastList(\"\")',
    'setImages([])',
    'setAnalyzeThought(\"\")',
    'setStyleJson(null)',
  ]) {
    assert.ok(body.includes(setter), `expected ${setter}`);
  }

  assert.match(body, /partialReset\(\)/, 'STEP1 reset must also clear dependent STEP2-STEP4 work');

  assert.doesNotMatch(body, /set(ApiKeyState|ApiKey|OpenAIApiKey|ActiveEngine|SelectedEngine)\(/);
});
