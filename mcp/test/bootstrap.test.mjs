import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {mkdtemp,mkdir,writeFile,rm,symlink} from 'node:fs/promises';
import {join} from 'node:path';

test('Windows bootstrap safely extracts and rejects traversal and modified verified files',{skip:process.platform!=='win32'},()=>{
 const result=spawnSync('powershell.exe',['-NoProfile','-File',fileURLToPath(new URL('./bootstrap-fixtures.ps1',import.meta.url)),'-TestRoot',process.env.MANGA_MCP_TEST_ROOT||tmpdir()],{encoding:'utf8',windowsHide:true,timeout:30000});
 assert.equal(result.status,0,result.stderr||result.stdout);
 assert.match(result.stdout,/BOOTSTRAP_FIXTURES_VERIFIED/);
});

test('Desktop permits known cloud directories and shortcut leaves while preserving optional failures',{skip:process.platform!=='win32'},async()=>{
 const base=join(process.env.LOCALAPPDATA,'SuperFURU-Manga');await mkdir(base,{recursive:true});
 const root=await mkdtemp(join(base,'bootstrap-reparse-test-'));
 try{
  await mkdir(join(root,'target'));await writeFile(join(root,'plain.txt'),'fixture');
  let nativeSymlink=true;
  try{await symlink(join(root,'plain.txt'),join(root,'symlink.txt'),'file');}catch(error){if(error.code!=='EPERM')throw error;nativeSymlink=false;}
  if(!nativeSymlink)console.log('NATIVE_SYMLINK_UNAVAILABLE: Windows denied fixture creation (EPERM); tag rejection is still checked.');
  const script=join(root,'verify.ps1');
  await writeFile(script,`
param([string]$Bootstrap,[string]$Root)
$ErrorActionPreference='Stop'
. $Bootstrap -LibraryOnly
function Require-Rejection([scriptblock]$Action){$rejected=$false;try{& $Action}catch{$rejected=$true};if(-not $rejected){throw 'Unsafe reparse path accepted'}}
foreach($tag in @('9000001A','9000601A','9000F01A')){if(-not(Test-MangaCloudTag ([Convert]::ToUInt32($tag,16)))){throw 'Known cloud tag rejected'}}
foreach($tag in @('A0000003','A000000C','9000002A','9001001A')){if(Test-MangaCloudTag ([Convert]::ToUInt32($tag,16))){throw 'Unknown/link tag accepted'}}
$desktop=[Environment]::GetFolderPath('Desktop')
if($desktop -and (Test-Path -LiteralPath $desktop)){
 $item=Get-Item -LiteralPath $desktop -Force
 if($item.Attributes -band [IO.FileAttributes]::ReparsePoint){
  $tag=Get-MangaReparseTag $desktop;Write-Output ('ACTUAL_DESKTOP_TAG=0x'+$tag.ToString('x8'))
  if(Test-MangaCloudTag $tag){Assert-PlainPath $desktop -AllowCloudDirectories;Require-Rejection {Assert-PlainPath $desktop}}
 }
 # Inspect metadata only; do not open, alter or name existing Desktop shortcuts.
 foreach($entry in (Get-ChildItem -LiteralPath $desktop -File -Filter '*.lnk' -Force)){
  if(($entry.Attributes -band [IO.FileAttributes]::ReparsePoint) -and (Test-MangaCloudTag (Get-MangaReparseTag $entry.FullName))){
   Assert-PlainPath $entry.FullName -AllowCloudDirectories -AllowCloudShortcutLeaf
   Require-Rejection {Assert-PlainPath $entry.FullName -AllowCloudDirectories}
   Require-Rejection {Assert-PlainPath $entry.FullName -AllowCloudShortcutLeaf}
   Write-Output 'ACTUAL_CLOUD_SHORTCUT_LEAF_METADATA_VERIFIED';break
  }
 }
}
$junction=Join-Path $Root 'junction';New-Item -ItemType Junction -Path $junction -Target (Join-Path $Root 'target')|Out-Null
if((Get-MangaReparseTag $junction) -ne [Convert]::ToUInt32('A0000003',16)){throw 'Expected actual junction tag'}
$symlink=Join-Path $Root 'symlink.txt'
if(Test-Path -LiteralPath $symlink){
 if((Get-MangaReparseTag $symlink) -ne [Convert]::ToUInt32('A000000C',16)){throw 'Expected actual symlink tag'}
 Require-Rejection {Assert-PlainPath $symlink -AllowCloudDirectories}
}
Require-Rejection {Assert-PlainPath $junction -AllowCloudDirectories}
$script:FixtureDesktop=Join-Path $Root 'Desktop';New-Item -ItemType Directory -Path $script:FixtureDesktop|Out-Null
function Get-MangaDesktopDirectory {$script:FixtureDesktop}
$launcher=Join-Path $Root 'Launch.cmd';[IO.File]::WriteAllText($launcher,'@echo off')
Set-OwnedShortcut $launcher;Set-OwnedShortcut $launcher
$shortcut=Join-Path $script:FixtureDesktop 'Super FURU Manga MCP.lnk'
if(@(Get-ChildItem -LiteralPath $script:FixtureDesktop).Count -ne 1){throw 'Shortcut duplicated or absent'}
$shell=New-Object -ComObject WScript.Shell;$link=$shell.CreateShortcut($shortcut)
$link.Description='User owned';$link.Save();$hash=(Get-FileHash -LiteralPath $shortcut -Algorithm SHA256).Hash
Set-OwnedShortcut (Join-Path $Root 'other.cmd')
if((Get-FileHash -LiteralPath $shortcut -Algorithm SHA256).Hash -ne $hash){throw 'User shortcut changed'}
foreach($unavailable in @('',(Join-Path $Root 'missing'),$junction)){$script:FixtureDesktop=$unavailable;Set-OwnedShortcut $launcher}
if(Test-Path -LiteralPath (Join-Path $Root 'target/Super FURU Manga MCP.lnk')){throw 'Shortcut followed junction'}
Write-Output 'BOOTSTRAP_REPARSE_VERIFIED cloud-readonly/link-rejection/ownership/duplicate/optional-failure-continued'
`,'utf8');
  const env={...process.env};delete env.PSModulePath;
  const result=spawnSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',script,'-Bootstrap',fileURLToPath(new URL('../skills/manga-book-production/bootstrap.ps1',import.meta.url)),'-Root',root],{encoding:'utf8',env,windowsHide:true,timeout:30000});
  assert.equal(result.status,0,result.stderr||result.stdout);
  assert.match(result.stdout,/BOOTSTRAP_REPARSE_VERIFIED/);
  assert.match(result.stderr,/Desktop is unavailable/);
  assert.match(result.stderr,/Desktop shortcut was not created/);
  console.log(result.stdout.trim());
 }finally{await rm(root,{recursive:true,force:true});}
});

test('Windows launcher lifecycle preserves installed versions and active sessions',{skip:process.platform!=='win32'},()=>{
 const result=spawnSync('powershell.exe',['-NoProfile','-File',fileURLToPath(new URL('./bootstrap-lifecycle-fixtures.ps1',import.meta.url)),'-TestRoot',process.env.MANGA_MCP_TEST_ROOT||tmpdir()],{encoding:'utf8',windowsHide:true,timeout:120000});
 assert.equal(result.status,0,result.stderr||result.stdout);
 assert.match(result.stdout,/BOOTSTRAP_LIFECYCLE_VERIFIED/);
});
