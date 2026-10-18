import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('STEP tile width includes padding and borders for both native buttons and spans', () => {
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  const tileRule = css.match(/\.workflow-progress-step\s*\{([^}]+)\}/)?.[1];
  assert.ok(tileRule);
  assert.match(tileRule, /box-sizing:\s*border-box/,
    '100%-wide tiles must use the same box calculation for buttons and spans at the two-column breakpoint');
});

test('completed header steps expose safe, keyboard-operable return buttons', async t => {
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  try {
    const { default: ControlBar } = await server.ssrLoadModule('/src/components/ControlBar.jsx');
    const render = props => {
      const html = renderToStaticMarkup(React.createElement(ControlBar, {
        apiKey: 'configured-test-only', currentStep: 3, onNavigateToStep() {}, ...props,
      }));
      const progress = html.match(/<ol aria-label="制作の進捗"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
      assert.ok(progress);
      return [...progress.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)];
    };

    await t.test('only the two completed steps are buttons before STEP3', () => {
      const buttons = render({});
      assert.equal(buttons.length, 2);
      for (const [index, [ , attributes ]] of buttons.entries()) {
        assert.match(attributes, /type="button"/);
        assert.match(attributes, new RegExp(`aria-label="STEP${index + 1} .+に戻る"`));
        assert.match(attributes, /title="[^"]*クリック[^"]*"/);
        assert.doesNotMatch(attributes, /disabled/);
      }
    });

    await t.test('all four completed steps are available after image completion', () => {
      assert.equal(render({ currentStep: 5 }).length, 4);
    });

    await t.test('current and future steps are not navigation buttons', () => {
      assert.equal(render({ currentStep: 1 }).length, 0);
      assert.equal(render({ currentStep: 2 }).length, 1);
      assert.equal(render({ currentStep: 4 }).length, 3);
    });

    await t.test('API work, active reruns, stopping and full-auto work disable return buttons', () => {
      for (const props of [
        { isApiProcessing: true }, { activeStep: 3 }, { isAborting: true },
        { isFullAutoMode: true }, { apiKey: '' },
      ]) {
        const buttons = render(props);
        assert.ok(buttons.length > 0);
        assert.ok(buttons.every(([, attributes]) => /disabled/.test(attributes)));
      }
    });

    await t.test('an unwired progress display cannot offer an active action', () => {
      const buttons = render({ onNavigateToStep: undefined });
      assert.ok(buttons.every(([, attributes]) => /disabled/.test(attributes)));
    });
  } finally {
    await server.close();
  }
});
