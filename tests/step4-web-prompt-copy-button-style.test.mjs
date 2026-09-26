import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('the STEP 3 web-prompt copy button uses a pale-yellow face instead of white', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(source, /プロンプトをコピーする（Web \/ Work用）/);
  assert.match(source, /isCopied \? 'bg-green-600' : 'web-prompt-copy-action'/);
  assert.match(css, /\.web-prompt-copy-action\s*\{\s*background-color: #fef3c7;\s*color: #451a03;/);
  assert.match(css, /\.web-prompt-copy-action:hover\s*\{\s*background-color: #fde68a;/);
});

test('split copy buttons progressively brighten without increasing their height', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  assert.match(source, /58 \+ \(index \/ \(webCopyPartLengths\.length - 1\)\) \* 30/);
  const rule = css.match(/\.web-prompt-copy-part\s*\{([^}]+)\}/)?.[1];
  assert.ok(rule, 'split-copy styling is present');
  assert.match(rule, /linear-gradient/);
  assert.match(rule, /color: #082f49/);
  assert.doesNotMatch(rule, /(?:min-height|height|padding)\s*:/);
  assert.match(css, /\.web-prompt-copy-part:focus-visible/);
});

test('full copy is separated from the numbered buttons by larger gaps and a distinct color', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);

  assert.match(source, /<div className="web-prompt-copy-layout">[\s\S]*?<div className="web-prompt-copy-parts">/);
  assert.match(source, /w-full web-prompt-copy-all \$\{isCopied \? 'is-copied' : ''\} py-2/);
  assert.match(css, /\.web-prompt-copy-layout\s*\{[^}]*row-gap: 8px;[^}]*padding-bottom: 20px;/);
  assert.match(css, /\.web-prompt-copy-parts\s*\{[^}]*row-gap: 12px;/);
  const partRule = css.match(/\.web-prompt-copy-part\s*\{([^}]+)\}/)?.[1];
  const allRule = css.match(/\.web-prompt-copy-all\s*\{([^}]+)\}/)?.[1];
  assert.ok(partRule && allRule);
  assert.match(allRule, /background-color: #fcd34d/);
  assert.match(allRule, /margin-top: 12px/);
  assert.doesNotMatch(allRule, /--copy-part-lightness|#082f49/);
});

test('successful copy visibly confirms only the pressed button, then clears after two seconds', async () => {
  const [panel, hook, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  assert.match(hook, /await navigator\.clipboard\.writeText\(textToCopy\);[\s\S]*?setCopiedPartIndex\(partIndex\);[\s\S]*?setIsCopied\(partIndex === null\);/);
  assert.match(hook, /setTimeout\(\(\) => \{\s*setCopiedPartIndex\(null\);\s*setIsCopied\(false\);\s*setIsTextSaved\(false\);\s*\}, 2000\)/);
  assert.match(panel, /copiedPartIndex === index \? 'is-copied' : ''/);
  assert.match(panel, /\$\{index \+ 1\}\/\$\{webCopyPartLengths\.length\} コピー完了/);
  assert.match(panel, /isCopied \? 'is-copied' : ''/);
  const successRule = css.match(/\.web-prompt-copy-part\.is-copied,\s*\.web-prompt-copy-all\.is-copied,\s*\.web-prompt-save-text\.is-saved\s*\{([^}]+)\}/)?.[1];
  assert.ok(successRule);
  assert.match(successRule, /box-shadow: inset 0 2px 4px rgba\(0, 0, 0, 0\.35\);/);
  assert.doesNotMatch(successRule, /background|color|transform/);
});

test('TXT save uses the same visible success feedback after starting the download', async () => {
  const [panel, hook, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  assert.match(panel, /isTextSaved \? 'is-saved' : ''/);
  assert.match(panel, /isTextSaved \? ' 保存完了！' : ' 全文プロンプトを\.txtで保存する'/);
  assert.match(hook, /anchor\.click\(\);[\s\S]*?setIsTextSaved\(true\);[\s\S]*?setTimeout\(\(\) => setIsTextSaved\(false\), 2000\)/);
  assert.match(css, /\.web-prompt-save-text\s*\{[^}]*background-color: #e2e8f0;\s*color: #0f172a;/);
  assert.match(css, /\.web-prompt-save-text\s*\{[^}]*margin-bottom: 16px;/);
  assert.doesNotMatch(css, /\.web-prompt-save-text:active/);
});

test('Web copy guidance is consolidated above the chunks, with TXT immediately after full copy', async () => {
  const [source, css] = await Promise.all([
    readFile(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/index.css', import.meta.url), 'utf8'),
  ]);
  const heading = source.indexOf('ChatGPT Webへの貼り付け手順');
  const guidance = source.indexOf('ChatGPT / Work用とAPI用は同じ指示文');
  const chunks = source.indexOf('<div className="web-prompt-copy-parts">');
  const full = source.indexOf('全文を一括コピー（${webCopyPartLengths.reduce');
  const json = source.indexOf("isMetaSaved ? '保存完了！' : '📂 Web版生成用 制作情報JSONを保存'");
  const txt = source.indexOf("isTextSaved ? ' 保存完了！' : ' 全文プロンプトを.txtで保存する'");
  assert.ok(heading >= 0 && heading < guidance && guidance < chunks && chunks < full && full < txt && txt < json);
  assert.match(css, /\.web-prompt-copy-heading\s*\{[^}]*font-size: 14px;[^}]*font-weight: 700;/);
  assert.match(source, /全文を一括コピー（\$\{webCopyPartLengths\.reduce\([\s\S]*?toLocaleString\(\)\}文字・Web一括はTXT化に注意）/);
  assert.equal(source.split('ChatGPT / Work用とAPI用は同じ指示文').length - 1, 1);
  assert.match(source, /制作情報JSONは後で制作条件を確認・引き継ぐための別ファイル/);
  assert.match(source, /finalPrompt && !isOpenAIImageMode/);
});
