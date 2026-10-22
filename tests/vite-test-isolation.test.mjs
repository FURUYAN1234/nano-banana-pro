import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import process from 'node:process';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));

test('Node SSR tests load real modules without recursive filesystem watchers', async () => {
  assert.ok(process.env.NODE_TEST_CONTEXT, 'this check must run in a Node test worker');
  const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    assert.equal(server.config.server.watch, null, 'SSR test workers must not scan/watch the whole project');
    const loaded = await server.ssrLoadModule('/src/lib/ending-mode-policy.js');
    assert.ok(Object.keys(loaded).length > 0, 'the real SSR transform and module loading must still work');
    assert.deepEqual(server.watcher.getWatched(), {});
  } finally {
    await server.close();
  }
});

test('normal development keeps filesystem watching and existing local server settings', () => {
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  const result = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '--eval', `
    import { createServer } from 'vite';
    import configured from './vite.config.js';
    const server = await createServer({ appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
    try {
      const config = server.config;
      console.log(JSON.stringify({ watchDisabled: config.server.watch === null, port: config.server.port,
        strictPort: config.server.strictPort, proxy: config.server.proxy['/gemini-api'].target,
        configuredBase: configured.base, servedBase: config.base }));
    } finally { await server.close(); }
  `], { cwd: root, env, encoding: 'utf8' }));
  assert.deepEqual(result, {
    watchDisabled: false, port: 5173, strictPort: true,
    proxy: 'https://generativelanguage.googleapis.com', configuredBase: './', servedBase: '/',
  });
});
