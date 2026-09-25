import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('STEP4 API settings explanations use the same compact scale as the video and safety guides', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/Step4Panel.jsx'),
    readSource('src/index.css'),
  ]);

  const apiHelp = source.match(/id="api-settings-content"[\s\S]*?id="image-help-content"/)?.[0] ?? '';

  assert.match(apiHelp, /<p className="step4-help-copy mt-2 text-slate-400">/);
  assert.match(apiHelp, /<p className="step4-help-copy mt-2 text-slate-300">/);
  assert.match(apiHelp, /<label className="step4-help-copy mt-3 flex items-start gap-2 text-slate-300">/);
  assert.match(css, /\.step4-help-copy\s*\{[\s\S]*?font-size:\s*11px;[\s\S]*?line-height:\s*1\.65;/);
});

test('STEP4 API quality and size controls use a compact label and select scale', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/Step4Panel.jsx'),
    readSource('src/index.css'),
  ]);

  const apiHelp = source.match(/id="api-settings-content"[\s\S]*?id="image-help-content"/)?.[0] ?? '';

  assert.match(apiHelp, /htmlFor="openai-image-quality" className="step4-setting-label/);
  assert.match(apiHelp, /id="openai-image-quality"[\s\S]*?className="step4-setting-select/);
  assert.match(apiHelp, /htmlFor="openai-image-size" className="step4-setting-label/);
  assert.match(apiHelp, /id="openai-image-size"[\s\S]*?className="step4-setting-select/);
  assert.match(apiHelp, /サイズの既定はA4漫画原稿比率の\{MANGA_MANUSCRIPT_LARGE\.label\.replace\('A4大：', ''\)\}/);
  assert.doesNotMatch(apiHelp, /サイズの既定はA4漫画原稿比率の\{MANGA_MANUSCRIPT_STANDARD\.label/);
  assert.match(css, /\.step4-setting-label\s*\{[\s\S]*?font-size:\s*11px;[\s\S]*?line-height:\s*1\.4;/);
  assert.match(css, /\.step4-setting-select\s*\{[\s\S]*?min-height:\s*26px;[\s\S]*?padding:\s*3px 8px;[\s\S]*?font-size:\s*11px;[\s\S]*?line-height:\s*1\.35;/);
});

test('STEP4 image correction and upscale explanations share the compact help scale', async () => {
  const [source, css] = await Promise.all([
    readSource('src/components/Step4Panel.jsx'),
    readSource('src/index.css'),
  ]);

  const imageHelp = source.match(/id="image-help-content"[\s\S]*?aria-controls="video-guide-content"/)?.[0] ?? '';

  assert.match(imageHelp, /<div className="step4-help-copy text-orange-200\/80 font-sans">/);
  assert.match(imageHelp, /<span className="step4-help-copy-compact inline-block mt-2 text-yellow-300/);
  assert.match(css, /\.step4-help-copy-compact\s*\{[\s\S]*?font-size:\s*10px;[\s\S]*?line-height:\s*1\.65;/);
});
