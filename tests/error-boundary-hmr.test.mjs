import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import React from 'react';
import { buildSync, transformSync } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const boundaryPath = fileURLToPath(new URL('../src/components/ErrorBoundary.jsx', import.meta.url));
const bundle = buildSync({ absWorkingDir: root, entryPoints: [boundaryPath], bundle: true,
  write: false, metafile: true, format: 'cjs', platform: 'browser', external: ['react'], logLevel: 'silent' });
const boundaryCode = bundle.outputFiles[0].text;
const dependencies = Object.keys(bundle.metafile.inputs).map(path => path.replaceAll('\\', '/'));
const require = createRequire(import.meta.url);
const pluginEntry = require.resolve('@vitejs/plugin-react');
const runtimePath = new URL('./refresh-runtime.js', pathToFileURL(pluginEntry));
// Execute the installed Vite React Refresh implementation in isolation. Only
// expose its existing internal flush for the test; neither disk nor live runtime changes.
const runtimeCode = transformSync(readFileSync(runtimePath, 'utf8') + '\nexport { performReactRefresh };', { format: 'cjs' }).code;

function loadBoundary() {
  const module = { exports: {} };
  vm.runInNewContext(boundaryCode, { module, exports: module.exports,
    require: name => { assert.equal(name, 'react'); return React; } });
  return module.exports.default;
}
function loadRefresh() {
  const module = { exports: {} };
  const context = vm.createContext({ module, exports: module.exports, window: {}, setTimeout, clearTimeout });
  vm.runInContext(runtimeCode, context);
  return { ...module.exports, createFunctionComponent: () => vm.runInContext('(function App() { return null; })', context) };
}

test('drawing constants updates do not remount the root class boundary and its input state', () => {
  const refresh = loadRefresh();
  const Before = loadBoundary();
  refresh.registerExportsForReactRefresh(boundaryPath, { default: Before });
  const importsDrawingConstants = dependencies.some(path => path.endsWith('src/lib/constants.js'));
  // Vite propagates a changed dependency to its accepting component module.
  // Re-evaluating this actual class is what discards all descendant hook state.
  const After = importsDrawingConstants ? loadBoundary() : Before;
  refresh.registerExportsForReactRefresh(boundaryPath, { default: After });
  // Refresh's component heuristic compares Object prototypes, so use its own
  // realm just as the application and browser runtime do in production.
  const AppBefore = refresh.createFunctionComponent();
  const AppAfter = refresh.createFunctionComponent();
  refresh.registerExportsForReactRefresh('stable-hook-signature-App', { default: AppBefore });
  refresh.registerExportsForReactRefresh('stable-hook-signature-App', { default: AppAfter });
  const update = refresh.performReactRefresh();
  assert.equal(update.staleFamilies.size, 0,
    `drawing constants reach the root ErrorBoundary: ${dependencies.join(', ')}`);
  assert.equal(update.updatedFamilies.size, 1, 'ordinary function refresh remains enabled');
  assert.equal(importsDrawingConstants, false, 'the version label must not depend on mutable drawing recipes');
});

test('the actual error boundary still catches errors, retains children, and shows the release version', () => {
  const Boundary = loadBoundary();
  assert.ok(Boundary.prototype.isReactComponent, 'keep the existing class-based error protection');
  const child = React.createElement('div', null, 'retained child');
  const instance = new Boundary({ children: child });
  assert.equal(instance.render(), child);
  const failure = new Error('diagnostic failure');
  assert.equal(Boundary.getDerivedStateFromError(failure).hasError, true);
  assert.equal(Boundary.getDerivedStateFromError(failure).error, failure);
  instance.state = { hasError: true, error: failure, errorInfo: null };
  const rendered = JSON.stringify(instance.render());
  const version = 'v' + JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version;
  assert.ok(rendered.includes(version));
  assert.ok(rendered.includes('diagnostic failure'));
  const constants = readFileSync(new URL('../src/lib/constants.js', import.meta.url), 'utf8');
  assert.ok(constants.includes(`export const SYSTEM_VERSION = "${version}";`), 'package version keeps the existing v-prefix semantics');
});

test('an actual class replacement remains a remount in Vite React Refresh', () => {
  const refresh = loadRefresh();
  refresh.registerExportsForReactRefresh(boundaryPath, { default: loadBoundary() });
  refresh.registerExportsForReactRefresh(boundaryPath, { default: loadBoundary() });
  const update = refresh.performReactRefresh();
  assert.equal(update.staleFamilies.size, 1);
  assert.equal(update.updatedFamilies.size, 0);
});
