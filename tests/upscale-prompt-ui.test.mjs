import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const step4PanelSource = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');

test('ChatGPT tips include a separate 2x upscale prompt copy action', () => {
  assert.match(step4PanelSource, /✨ ChatGPTの画像を2倍にアップスケールしたい場合/);
  assert.match(step4PanelSource, /画像2倍アップスケールプロンプトをコピー/);
  assert.match(step4PanelSource, /SELF-TRAINED 2X IMAGE UPSCALE TASK/);
  assert.match(step4PanelSource, /完了しました。2倍にアップスケールしました。/);
  assert.match(step4PanelSource, /2倍アップスケール画像をダウンロード/);
});

test('external pro tools remain visible when the active in-app engine is Gemini', () => {
  assert.doesNotMatch(
    step4PanelSource,
    /\{selectedEngine === 'openai' && \(\s*<div className="mt-3 block w-full">/
  );
});

test('STEP4 uses the effective OpenAI image mode instead of a stale text-engine label', () => {
  assert.match(
    step4PanelSource,
    /const isOpenAIImageMode = enableOpenAIApi \|\| selectedEngine === 'openai';/
  );
  assert.equal(
    step4PanelSource.match(/selectedEngine === 'openai'/g)?.length,
    1,
    'selectedEngine may appear only inside the single effective STEP4 provider predicate'
  );
});

test('ratio fix copy button hides its base label while showing copied feedback', () => {
  assert.match(
    step4PanelSource,
    /<span style={{ visibility: isFixPromptCopied \? 'hidden' : 'visible' }}>📋 画像比率修正プロンプトをコピー<\/span>/
  );
  assert.match(
    step4PanelSource,
    /isFixPromptCopied && <span style={{ position: 'absolute', left: '50%', transform: 'translateX\(-50%\)' }}>✅ コピー完了<\/span>/
  );
});

test('ratio fix preserves source-image character and wardrobe continuity while rebuilding the page geometry', () => {
  assert.match(step4PanelSource, /SOURCE FIDELITY LOCK/);
  assert.match(step4PanelSource, /Treat the attached previous manga as the exact visual source/i);
  assert.match(step4PanelSource, /same faces, hair, skin, glasses, accessories, garment items, base colors, accents, materials, and patterns/i);
  assert.match(step4PanelSource, /Do not add, remove, merge, duplicate, rename, or replace characters/i);
  assert.match(step4PanelSource, /Keep the same story beats, character-to-action ownership, dialogue text, speech-bubble speakers, key props, setting, and time of day/i);
});

test('upscale helper prompt is original and does not copy the social post title', () => {
  assert.doesNotMatch(step4PanelSource, /GPT Native Super Resolution Ver2\.1/);
  assert.doesNotMatch(step4PanelSource, /Eris Create Lab/);
});
