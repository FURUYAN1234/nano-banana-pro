import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

test('Windows app ZIP entry forwards args and exit code without depending on cwd', { skip: process.platform !== 'win32' }, async () => {
  const work = process.env.MANGA_MCP_TEST_ROOT || tmpdir();
  await mkdir(work, { recursive: true });
  const root = await mkdtemp(join(work, 'launcher-entry-'));
  try {
    const app = join(root, '日本語 app folder');
    const launcher = join(app, 'mcp/skills/manga-book-production');
    await mkdir(launcher, { recursive: true });
    const entry = join(app, 'start_app.bat');
    await writeFile(entry, await readFile(new URL('../start_app.bat', import.meta.url)));
    const output = join(root, 'captured.json');
    await writeFile(join(launcher, 'capture.cjs'), "require('node:fs').writeFileSync(process.env.MANGA_ENTRY_CAPTURE,JSON.stringify(process.argv.slice(2)));\n");
    await writeFile(join(launcher, 'Launch-Manga.cmd'), `@echo off\r\n"${process.execPath}" "%~dp0capture.cjs" %*\r\nexit /b 37\r\n`);
    const result = spawnSync('cmd.exe', ['/d', '/s', '/c', `call "${entry}" -Update "two words" "日本語"`], {
      windowsVerbatimArguments: true, encoding: 'utf8', env: { ...process.env, MANGA_ENTRY_CAPTURE: output }, timeout: 10000,
    });
    assert.equal(result.status, 37, result.stderr + result.stdout);
    assert.deepEqual(JSON.parse(await readFile(output, 'utf8')), ['-Update', 'two words', '日本語']);
    await rm(join(launcher, 'Launch-Manga.cmd'));
    const missing = spawnSync('cmd.exe', ['/d', '/s', '/c', `call "${entry}"`], { windowsVerbatimArguments: true, encoding: 'utf8', timeout: 10000 });
    assert.equal(missing.status, 1);
    assert.match(missing.stdout, /Extract the ENTIRE application ZIP/);
    assert.match(missing.stdout, /Launch-Manga\.cmd/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('downloaded bootstrap runs under process-only policy with unchanged parent settings', { skip: process.platform !== 'win32' }, async () => {
  const base = join(process.env.LOCALAPPDATA, 'SuperFURU-Manga');
  await mkdir(base, { recursive: true });
  const root = await mkdtemp(join(base, 'entrypoint-policy-test-'));
  const childEnv = { ...process.env };
  // Do not feed PowerShell 7's inherited module search path to Windows PowerShell.
  delete childEnv.PSModulePath;
  const parentPolicy = process.env.PSExecutionPolicyPreference;
  const ps = (command, env = childEnv) => spawnSync('powershell.exe', ['-NoProfile', '-Command', command], { encoding: 'utf8', env, timeout: 10000 });
  const policies = () => {
    const result = ps('Get-ExecutionPolicy -List | ForEach-Object { "{0}={1}" -f $_.Scope,$_.ExecutionPolicy }');
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.trim();
  };
  const before = policies();
  try {
    await writeFile(join(root, 'Launch-Manga.cmd'), await readFile(new URL('../mcp/skills/manga-book-production/Launch-Manga.cmd', import.meta.url)));
    const bootstrap = join(root, 'bootstrap.ps1');
    await writeFile(bootstrap, 'param([string]$Label,[int]$ExitCode=0)\n@{label=$Label;policy=(Get-ExecutionPolicy).ToString()} | ConvertTo-Json | Set-Content -LiteralPath $env:MANGA_ENTRY_CAPTURE -Encoding UTF8\nexit $ExitCode\n');
    const output = join(root, 'result.json');
    const env = { ...childEnv, MANGA_ENTRY_CAPTURE: output, MANGA_ENTRY_BOOTSTRAP: bootstrap };
    for (const [zone, exitCode] of [[false, 0], [true, 37]]) {
      if (zone) {
        const mark = ps('Set-Content -LiteralPath $env:MANGA_ENTRY_BOOTSTRAP -Stream Zone.Identifier -Value "[ZoneTransfer]`r`nZoneId=3"', env);
        assert.equal(mark.status, 0, mark.stderr);
      }
      const result = spawnSync('cmd.exe', ['/d', '/s', '/c', `call "${join(root, 'Launch-Manga.cmd')}" -Label "two words 日本語" -ExitCode ${exitCode}`], { windowsVerbatimArguments: true, encoding: 'utf8', env, timeout: 10000 });
      assert.equal(result.status, exitCode, result.stderr + result.stdout);
      const captured = JSON.parse((await readFile(output, 'utf8')).replace(/^\uFEFF/, ''));
      assert.equal(captured.label, 'two words 日本語');
      if (zone) assert.equal(captured.policy, 'Bypass');
    }
    assert.equal(policies(), before);
    assert.equal(process.env.PSExecutionPolicyPreference, parentPolicy);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
