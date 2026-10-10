import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { readFileSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

let server, ControlBar, AutoSaveGuide, AutoSaveSettingsButton, AutoSaveStartDialog, Step4Panel;
before(async () => {
  server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, hmr: false } });
  ({ default: ControlBar } = await server.ssrLoadModule('/src/components/ControlBar.jsx'));
  ({ default: AutoSaveGuide, AutoSaveSettingsButton, AutoSaveStartDialog } = await server.ssrLoadModule('/src/components/AutoSaveGuide.jsx'));
  ({ default: Step4Panel } = await server.ssrLoadModule('/src/components/Step4Panel.jsx'));
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
  for (const text of ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://furuyan1234.github.io', 'OFF', 'API不使用', '保存先を選んで保存', '保存完了はダウンロード一覧', 'ブラウザーの自動保存設定が済んでいれば', '保存先の「変更」', '設定 → ダウンロード']) assert.ok(html.includes(text), text);
  assert.match(html, /<ol class="save-setup-steps">/);
  assert.ok(html.includes('「その他の権限」の右端の「∨」を押して展開'));
  assert.ok(html.includes('chrome://settings/content/automaticDownloads'));
  assert.ok(html.includes('メニューが見つからない、または展開できない場合'));
  assert.ok(html.includes('Chromeのアドレス欄（Ctrl＋L）に貼り付けてEnterを押す'));
  assert.ok(!html.includes('その他のコンテンツの設定'));
});

test('required save settings stand out while the free test is white', () => {
  const settings = renderToStaticMarkup(React.createElement(AutoSaveSettingsButton));
  const guide = renderToStaticMarkup(React.createElement(AutoSaveGuide));
  assert.match(settings, /class="save-guide-button save-guide-required"/);
  assert.ok(settings.includes('自動保存の設定・動作確認'));
  assert.ok(!settings.includes('自動保存の設定・無料テスト'));
  assert.match(guide, /class="save-guide-button"[^>]*>2枚の自動保存をテスト/);
  assert.ok(guide.includes('アプリ内ブラウザーでは保存できない場合があります'));
});

test('save setup reminder is noninteractive text above the free test with spacing and reduced motion', () => {
  const html = renderToStaticMarkup(React.createElement(AutoSaveGuide));
  const reminder = html.match(/<p class="save-setup-reminder">([^<]+)<\/p>/);
  assert.equal(reminder?.[1], 'Chromeの自動保存設定を完了したら、下記テストボタンをクリックしてください。');
  assert.ok(html.indexOf(reminder[0]) < html.indexOf('>2枚の自動保存をテスト'));
  assert.doesNotMatch(reminder[0], /button|tabindex|onclick|role=/i);
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /\.auto-save-guide \.save-setup-reminder\s*\{[^}]*margin:\s*12px 0 8px;[^}]*color:\s*#fbbf24;[^}]*animation:\s*save-reminder-pulse 1\.6s/);
  assert.match(css, /@keyframes save-reminder-pulse/);
  assert.match(css, /@keyframes save-reminder-pulse\s*\{\s*0%, 100%\s*\{[^}]*opacity:\s*1;[^}]*\}\s*50%\s*\{[^}]*opacity:\s*0\.08;/);
  assert.match(css, /\.auto-save-guide \.save-setup-reminder\s*\{[^}]*font-size:\s*18px;[^}]*line-height:\s*1\.6;[^}]*font-weight:\s*800;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*\}[^}]*\.auto-save-guide \.save-setup-reminder\s*\{\s*animation: none;/);
});

test('single-image copy is inside the Web disclosure after video guidance with spacing', t => {
  t.mock.method(React, 'useState', () => [null, () => {}]);
  for (const isPolicyCopied of [false, true]) {
    const nodes = descendants(Step4Panel({ selectedEngine: 'openai', enableOpenAIApi: true, isPolicyCopied, finalPrompt: 'UI fixture', genLog: [], webCopyPartLengths: [] }));
    const copy = nodes.find(n => n.type === 'button' && n.props.title?.includes('1枚絵'));
    assert.ok(copy);
    assert.ok(copy.props.className.split(' ').includes('save-guide-secondary'));
    assert.equal(typeof copy.props.onClick, 'function');
    assert.ok(!copy.props.className.includes('bg-white'));
  }
  const html = renderToStaticMarkup(React.createElement(Step4Panel, { selectedEngine: 'openai', enableOpenAIApi: true, finalPrompt: 'UI fixture', genLog: [], webCopyPartLengths: [] }));
  const disclosure = html.match(/<details class="web-prompt-disclosure">([\s\S]*?)<\/details>/)?.[1];
  assert.ok(disclosure.includes('/1枚絵エモーショナルプロンプト'));
  assert.ok(disclosure.indexOf('ChatGPT用 1枚絵') > disclosure.indexOf('aria-controls="video-guide-content"'));
  assert.match(disclosure, /style="padding-top:8px"/);
  assert.doesNotMatch(renderToStaticMarkup(React.createElement(ControlBar)), /ChatGPT用 1枚絵/);
});

test('verified save state bypasses both startup dialogs while retaining stop and API guards', t => {
  let pending = null;
  t.mock.method(React, 'useState', () => [pending, value => { pending = value; }]);
  const calls = [];
  const props = { apiKey: 'fixture-not-a-key', autoSaveVerified: true, setIsEndlessMode: value => calls.push(['endless', value]), handleFullAutoToggle: () => calls.push(['auto']) };
  const button = (tree, needle) => descendants(tree).find(n => n.type === 'button' && JSON.stringify(n.props.children).includes(needle));
  button(ControlBar(props), '全自動モード（フルオート） ON').props.onClick();
  button(ControlBar(props), '連続ループ生成 ON').props.onClick();
  assert.equal(pending, null);
  assert.deepEqual(calls, [['auto'], ['endless', true]]);
  calls.length = 0;
  button(ControlBar({ ...props, apiKey: '' }), '全自動モード（フルオート） ON').props.onClick();
  button(ControlBar({ ...props, isAborting: true }), '連続ループ生成 ON').props.onClick();
  assert.deepEqual(calls, []);
});

test('settings stay visible until explicit confirmation, then hide for the shared page state', t => {
  let open = true;
  t.mock.method(React, 'useState', () => [open, value => { open = value; }]);
  const confirmations = [];
  const props = { onVerified: () => confirmations.push(true) };
  const tree = AutoSaveSettingsButton(props);
  const dialog = descendants(tree).find(n => n.props?.mode === 'settings');
  dialog.props.onCancel();
  assert.equal(open, false); assert.deepEqual(confirmations, []);
  open = true;
  descendants(AutoSaveSettingsButton(props)).find(n => n.props?.mode === 'settings').props.onConfirm();
  assert.deepEqual(confirmations, [true]);
  assert.equal(AutoSaveSettingsButton({ ...props, autoSaveVerified: true }), null);
  const html = renderToStaticMarkup(React.createElement(AutoSaveSettingsButton));
  assert.ok(html.includes('（初回確認必須）'));
});

test('completed test then close confirms without an extra checkbox; incomplete tests and mode cancellation never confirm', t => {
  t.mock.method(React, 'useEffect', () => {});
  t.mock.method(React, 'useRef', () => ({ current: null }));
  let completed = false;
  t.mock.method(React, 'useState', () => [completed, next => { completed = next; }]);
  const calls = [];
  const props = { mode: 'fullAuto', onConfirm: () => calls.push('confirm'), onCancel: () => calls.push('cancel') };
  const startButton = tree => descendants(tree).find(n => n.type === 'button' && JSON.stringify(n.props.children).includes('設定済み'));
  assert.equal(startButton(AutoSaveStartDialog(props)).props.disabled, true);
  startButton(AutoSaveStartDialog(props)).props.onClick();
  assert.deepEqual(calls, []);
  assert.ok(!descendants(AutoSaveStartDialog(props)).some(n => n.type === 'input' && n.props.type === 'checkbox'));
  const guide = tree => descendants(tree).find(n => n.type === AutoSaveGuide);
  guide(AutoSaveStartDialog(props)).props.onTestComplete(true);
  assert.equal(startButton(AutoSaveStartDialog(props)).props.disabled, false);
  startButton(AutoSaveStartDialog(props)).props.onClick();
  completed = false;
  AutoSaveStartDialog({ ...props, mode: 'settings' }).props.onCancel();
  assert.deepEqual(calls, ['confirm', 'cancel']);
  guide(AutoSaveStartDialog({ ...props, mode: 'settings' })).props.onTestComplete(true);
  AutoSaveStartDialog({ ...props, mode: 'settings' }).props.onCancel();
  AutoSaveStartDialog({ ...props, mode: 'endless' }).props.onCancel();
  assert.deepEqual(calls, ['confirm', 'cancel', 'confirm', 'cancel']);
  guide(AutoSaveStartDialog(props)).props.onTestComplete(false);
  assert.equal(startButton(AutoSaveStartDialog(props)).props.disabled, true);
});

test('free test uses ordinary downloads without a folder picker; failure and early close stay unverified', async t => {
  t.mock.method(React, 'useState', () => [false, () => {}]);
  let cleanup;
  t.mock.method(React, 'useEffect', effect => { cleanup = effect(); });
  t.mock.method(React, 'useRef', () => ({ current: 0 }));
  const waits = [];
  t.mock.method(globalThis, 'setTimeout', (callback, ms) => { if (ms === 6000) waits.push(callback); else callback(); });
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  t.after(() => {
    if (previousDocument === undefined) delete globalThis.document; else globalThis.document = previousDocument;
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
  });
  let fail = false;
  const downloads = [];
  const png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl2nKsAAAAASUVORK5CYII=';
  globalThis.window = { showDirectoryPicker() { assert.fail('must not open a folder picker'); }, showOpenFilePicker() { assert.fail('must not ask for saved files'); } };
  const ctx = { fillRect() {}, fillText() {} };
  globalThis.document = { createElement: tag => tag === 'canvas'
    ? { getContext: () => fail ? null : ctx, toDataURL: () => png }
    : { click() { downloads.push(this.download); } }, body: { appendChild() {} } };
  const outcomes = [];
  const start = () => descendants(AutoSaveGuide({ onTestComplete: value => outcomes.push(value) })).find(n => n.type === 'button').props.onClick();
  const pending = start();
  assert.deepEqual(outcomes, [false]);
  waits.shift()(); await Promise.resolve();
  assert.equal(downloads.length, 1); assert.deepEqual(outcomes, [false]);
  waits.shift()(); await pending;
  assert.equal(downloads.length, 2); assert.deepEqual(outcomes, [false, true]);
  fail = true;
  const broken = start(); waits.shift()(); await broken;
  assert.deepEqual(outcomes, [false, true, false]);
  fail = false;
  const cancelled = start(); cleanup(); waits.shift()(); await cancelled;
  assert.equal(downloads.length, 2); assert.deepEqual(outcomes, [false, true, false, false]);
});

test('required-save pulse uses distinct colors and has a reduced-motion opt-out', () => {
  // The browser controller cannot emulate reduced motion; keep its CSS contract executable.
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.match(css, /\.save-guide-required\s*\{[^}]*animation:\s*save-confirm-pulse 2\.4s/);
  assert.match(css, /@keyframes save-confirm-pulse\s*\{\s*0%, 100%\s*\{[^}]*background-color: #fbbf24;[^}]*\}\s*50%\s*\{[^}]*background-color: #fb923c;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.save-guide-required\s*\{\s*animation: none;/);
});
