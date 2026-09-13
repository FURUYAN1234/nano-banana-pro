import assert from 'node:assert/strict';
import test, { before, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const source = await readFile(new URL('../src/hooks/useMangaWorkflow.js', import.meta.url), 'utf8');
let server, Step3Panel;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: Step3Panel } = await server.ssrLoadModule('/src/components/Step3Panel.jsx'));
});
after(async () => { await server?.close(); });

test('STEP3 exposes two native radio choices, with color as default and keyboard-safe locks', () => {
  const render = props => renderToStaticMarkup(React.createElement(Step3Panel, { currentStep: 3, setColorMode() {}, ...props }));
  const normal = render({});
  assert.equal((normal.match(/type="radio"/g) || []).length, 2);
  assert.match(normal, /checked="" value="color"|value="color" checked=""/);
  assert.match(normal, /全設定リセットまで選択を保持/);
  const mono = render({ colorMode: 'monochrome' });
  assert.match(mono, /checked="" value="monochrome"|value="monochrome" checked=""/);
  assert.match(mono, /Gペン/);
  assert.match(render({ isColorModeLocked: true }), /<fieldset disabled=""/);
  assert.match(render({ currentStep: 2 }), /<fieldset disabled=""/);
});

test('color choices use the same compact single-line height as secondary buttons', async () => {
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const rule = css.match(/\.manga-color-mode-option\s*\{([\s\S]*?)\}/)?.[1] || '';
  assert.match(rule, /box-sizing:\s*border-box/);
  assert.match(rule, /height:\s*24px/);
  assert.match(rule, /padding:\s*0\s+10px/);
  assert.doesNotMatch(rule, /min-height:\s*44px/);
});

test('selected color choice is white while the inactive choice is a distinct gray', async () => {
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const defaultRule = css.match(/\.manga-color-mode-option\s*\{([\s\S]*?)\}/)?.[1] || '';
  const selectedRule = css.match(/\.manga-color-mode-option\.is-selected\s*\{([\s\S]*?)\}/)?.[1] || '';

  assert.match(defaultRule, /background:\s*#94a3b8\s*;/);
  assert.match(defaultRule, /color:\s*#0f172a\s*;/);
  assert.match(selectedRule, /background:\s*#fff\s*;/);
  assert.match(selectedRule, /color:\s*#0f172a\s*;/);
});

test('actual selection handler clears stale output without assembly, preserving scenario/history', () => {
  const handler = source.match(/const setColorMode = \(value\) => \{([\s\S]*?)\n  \};/);
  assert.ok(handler);
  const calls = [];
  const context = {
    isColorModeLocked: false, colorMode: 'color',
    normalizeMangaColorMode: v => v === 'monochrome' ? v : 'color',
    promptAssemblyRunRef: { current: 1 }, lastPolicyErrorRef: { current: 'previous error' },
    showStatus: text => calls.push(['status', text]),
  };
  // Only React state setters are substituted; execute the real event handler.
  for (const setter of new Set(handler[1].match(/\bset\w+(?=\()/g))) {
    context[setter] = value => calls.push([setter, value]);
  }
  vm.runInNewContext(`const setColorMode = (value) => {${handler[1]}\n}; setColorMode('monochrome');`, context);
  assert.ok(calls.some(([name, value]) => name === 'setColorModeState' && value === 'monochrome'));
  assert.ok(calls.some(([name, value]) => name === 'setFinalPrompt' && value === ''));
  assert.ok(calls.some(([name, value]) => name === 'setGeneratedImage' && value === null));
  assert.equal(context.promptAssemblyRunRef.current, 2);
  assert.doesNotMatch(handler[1], /assemblePrompt\(|regenerateImage\(|setScenario\(|setCastList\(|setGenerationHistory\(/);
  calls.length = 0;
  context.isColorModeLocked = true;
  vm.runInNewContext(`(value => {${handler[1]}\n})('monochrome')`, context);
  assert.equal(calls.length, 0);
  context.isColorModeLocked = false;
  context.colorMode = 'monochrome';
  vm.runInNewContext(`(value => {${handler[1]}\n})('monochrome')`, context);
  assert.equal(calls.length, 0, 'same selection must preserve the current prompt');
});

test('only the full settings reset returns mode to color; resets invalidate pending assembly', () => {
  assert.match(source, /\[colorMode, setColorModeState\] = useState\("color"\)/);
  for (const reset of ['partialReset', 'step1Reset']) {
    const body = source.match(new RegExp(`const ${reset} = \\(\\) => \\{([\\s\\S]*?)\\n  \\};`))?.[1];
    assert.ok(body);
    assert.doesNotMatch(body, /setColorModeState\(/);
  }
  const hard = source.match(/const hardReset = \(\) => \{([\s\S]*?)\n  \};/)?.[1];
  assert.match(hard, /setColorModeState\("color"\)/);
  assert.match(hard, /promptAssemblyRunRef\.current \+= 1/);
  assert.doesNotMatch(source, /\},\s*\[[^\]]*\bcolorMode\b[^\]]*\]\)/, 'selection must not trigger a rebuilding effect');
});
