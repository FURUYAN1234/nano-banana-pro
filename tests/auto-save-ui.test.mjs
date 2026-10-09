import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, ControlBar, AutoSaveGuide;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: ControlBar } = await server.ssrLoadModule('/src/components/ControlBar.jsx'));
  ({ default: AutoSaveGuide } = await server.ssrLoadModule('/src/components/AutoSaveGuide.jsx'));
});
after(async () => server?.close());
const descendants = node => !node || typeof node !== 'object' ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(descendants)];

test('mode starts require the guide confirmation; cancellation never starts; stop is immediate', t => {
  let pending = null;
  t.mock.method(React, 'useState', () => [pending, value => { pending = value; }]);
  const calls = [];
  const props = { apiKey: 'fixture-not-a-key', isEndlessModeRef: { current: false }, setIsEndlessMode: value => calls.push(['endless', value]), handleFullAutoToggle: () => calls.push(['auto']), onStopApiProcessing: () => calls.push(['stop']), isApiProcessing: true };
  const tree = overrides => ControlBar({ ...props, ...overrides });
  const button = (nodes, needle) => descendants(nodes).find(n => n.type === 'button' && JSON.stringify(n.props.children).includes(needle));
  for (const [needle, mode] of [['全自動モード（フルオート） ON', 'fullAuto'], ['連続ループ生成 ON', 'endless']]) {
    calls.length = 0; pending = null;
    button(tree(), needle).props.onClick();
    assert.equal(pending, mode); assert.equal(calls.length, 0);
    descendants(tree()).find(n => n.props?.mode === mode).props.onCancel();
    assert.equal(pending, null); assert.equal(calls.length, 0);
    button(tree(), needle).props.onClick();
    descendants(tree()).find(n => n.props?.mode === mode).props.onConfirm();
    assert.deepEqual(calls, mode === 'fullAuto' ? [['auto']] : [['endless', true]]);
  }
  calls.length = 0; pending = null;
  button(tree({ isFullAutoMode: true }), '全自動モード 中断').props.onClick();
  button(tree({ isEndlessMode: true }), '連続ループ生成を解除').props.onClick();
  button(tree(), '解析・生成強制ストップ').props.onClick();
  assert.equal(pending, null);
  assert.deepEqual(calls, [['auto'], ['endless', false], ['stop']]);
});

test('shared guide includes all three origins, manual settings, free test and truthful download status', () => {
  const html = renderToStaticMarkup(React.createElement(AutoSaveGuide));
  for (const text of ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://furuyan1234.github.io', 'OFF', 'API不使用', '保存先を選んで保存', '保存完了はダウンロード一覧']) assert.ok(html.includes(text), text);
});
