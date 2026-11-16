import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';

test('Windows bootstrap safely extracts and rejects traversal and modified verified files',{skip:process.platform!=='win32'},()=>{
 const result=spawnSync('powershell.exe',['-NoProfile','-File',fileURLToPath(new URL('./bootstrap-fixtures.ps1',import.meta.url)),'-TestRoot',process.env.MANGA_MCP_TEST_ROOT||tmpdir()],{encoding:'utf8',windowsHide:true,timeout:30000});
 assert.equal(result.status,0,result.stderr||result.stdout);
 assert.match(result.stdout,/BOOTSTRAP_FIXTURES_VERIFIED/);
});

test('Windows launcher lifecycle preserves installed versions and active sessions',{skip:process.platform!=='win32'},()=>{
 const result=spawnSync('powershell.exe',['-NoProfile','-File',fileURLToPath(new URL('./bootstrap-lifecycle-fixtures.ps1',import.meta.url)),'-TestRoot',process.env.MANGA_MCP_TEST_ROOT||tmpdir()],{encoding:'utf8',windowsHide:true,timeout:120000});
 assert.equal(result.status,0,result.stderr||result.stdout);
 assert.match(result.stdout,/BOOTSTRAP_LIFECYCLE_VERIFIED/);
});
