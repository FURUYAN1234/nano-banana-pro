import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';

const bootstrap=fileURLToPath(new URL('../skills/manga-book-production/bootstrap.ps1',import.meta.url));
test('launcher reports real file progress on stderr and still rejects changed files',{skip:process.platform!=='win32'},async()=>{
 const root=await mkdtemp(join(process.env.LOCALAPPDATA,'manga-progress-'));
 try{
  const script=join(root,'test.ps1');
  await writeFile(script,`
param([string]$Bootstrap,[string]$Root)
. $Bootstrap -LibraryOnly
$files=[ordered]@{}
foreach($name in @('package.json','mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','dist/index.html')){
 $file=Join-Path $Root $name;New-Item -ItemType Directory -Path (Split-Path $file) -Force|Out-Null
 $content=if($name -eq 'package.json'){'{"version":"8.0.2"}'}else{'test content'}
 [IO.File]::WriteAllText($file,$content);$files[$name]=(Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
}
@{repository='FURUYAN1234/nano-banana-pro';tag='v8.0.2';files=$files}|ConvertTo-Json -Depth 5|Set-Content -LiteralPath (Join-Path $Root 'verified-install.json') -Encoding UTF8
$null=Read-VerifiedInstall $Root
[Console]::Error.WriteLine('---CORRUPT---')
[IO.File]::AppendAllText((Join-Path $Root 'package.json'),'changed')
$rejected=$false;try{$null=Read-VerifiedInstall $Root}catch{$rejected=$true}
if(-not $rejected){throw 'Changed file accepted'}
Write-Output 'VERIFIED_AND_REJECTED'
`,'utf8');
  const result=spawnSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',script,'-Bootstrap',bootstrap,'-Root',root],{encoding:'utf8',windowsHide:true,timeout:30000});
  assert.equal(result.status,0,result.stderr);
  assert.equal(result.stdout.trim(),'VERIFIED_AND_REJECTED');
  const [normal,corrupt]=result.stderr.split('---CORRUPT---');
  assert.match(normal,/0\/4/);
  assert.match(normal,/4\/4.*100%/);
  assert.match(normal,/検証/);
  assert.doesNotMatch(corrupt,/100%/);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('noninteractive launcher failures are visible, nonzero and never wait for input',{skip:process.platform!=='win32'},async()=>{
 const root=await mkdtemp(join(process.env.LOCALAPPDATA,'manga-launch-error-'));
 try{
  const file=join(root,'not-a-directory');await writeFile(file,'occupied');
  for(const flag of ['-NoOpen','-Stdio']){
   const result=spawnSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',bootstrap,'-InstallRoot',file,flag],{encoding:'utf8',windowsHide:true,timeout:15000});
   assert.equal(result.status,1,result.stderr);
   assert.equal(result.stdout,'');
   assert.match(result.stderr,/起動準備/);
   assert.match(result.stderr,/起動できませんでした/);
  }
 }finally{await rm(root,{recursive:true,force:true});}
});

test('ordinary startup avoids all-file hashing and preserves a newer local launcher',{skip:process.platform!=='win32'},async()=>{
 const root=await mkdtemp(join(process.env.LOCALAPPDATA,'manga-fast-start-'));
 try{
  const script=join(root,'test.ps1');
  await writeFile(script,`
param([string]$Bootstrap,[string]$Root)
. $Bootstrap -LibraryOnly
$install=Join-Path $Root 'versions/v8.0.2';New-Item -ItemType Directory -Path $install -Force|Out-Null
$files=[ordered]@{}
foreach($name in @('package.json','mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','dist/index.html')){
 $file=Join-Path $install $name;New-Item -ItemType Directory -Path (Split-Path $file) -Force|Out-Null
 $content=if($name -eq 'package.json'){'{"version":"8.0.2"}'}else{'fixture'}
 [IO.File]::WriteAllText($file,$content);$files[$name]='unused-on-startup'
}
# Old receipts may enumerate thousands of dependency files. None are rehashed.
1..1000|ForEach-Object{$files['node_modules/old-'+$_]='unused-on-startup'}
@{repository='FURUYAN1234/nano-banana-pro';tag='v8.0.2';files=$files}|ConvertTo-Json -Depth 5|Set-Content -LiteralPath (Join-Path $install 'verified-install.json') -Encoding UTF8
function Get-FileHash {throw 'Full hashing must not run on normal startup'}
function Invoke-WebRequest {throw 'Same-version startup must not download'}
function Invoke-RestMethod {return [pscustomobject]@{draft=$false;prerelease=$false;tag_name='v8.0.2';assets=@([pscustomobject]@{name=$script:AssetName;digest=('sha256:'+('a'*64));browser_download_url=('https://github.com/'+$script:Repository+'/releases/download/v8.0.2/'+$script:AssetName)})}}
$actual=Install-OfficialRelease $Root 'unused-node'
if($actual -ne $install){throw 'Wrong installed version selected'}
[IO.File]::Delete((Join-Path $install 'mcp/src/service.mjs'))
$rejected=$false;try{$null=Read-VerifiedInstall $install -MetadataOnly}catch{$rejected=$true}
if(-not $rejected){throw 'Missing entry point accepted'}
$incoming=Join-Path $Root 'incoming';$target=Join-Path $Root 'launcher'
New-Item -ItemType Directory -Path $incoming,$target|Out-Null
[IO.File]::WriteAllText((Join-Path $incoming 'bootstrap.ps1'),'# old release')
[IO.File]::WriteAllText((Join-Path $incoming 'Launch-Manga.cmd'),'old')
Copy-Item -LiteralPath $Bootstrap -Destination (Join-Path $target 'bootstrap.ps1')
[IO.File]::WriteAllText((Join-Path $target 'Launch-Manga.cmd'),'current')
Sync-MangaLauncher $incoming $target
if([IO.File]::ReadAllText((Join-Path $target 'Launch-Manga.cmd')) -ne 'current'){throw 'Repaired launcher was downgraded'}
[IO.File]::WriteAllText((Join-Path $incoming 'bootstrap.ps1'),('$script:LauncherRevision='+($script:LauncherRevision+1)))
Sync-MangaLauncher $incoming $target
if([IO.File]::ReadAllText((Join-Path $target 'Launch-Manga.cmd')) -ne 'old'){throw 'Newer launcher did not update'}
Write-Output 'FAST_START_AND_LAUNCHER_UPDATE_VERIFIED'
`,'utf8');
  const result=spawnSync('powershell.exe',['-NoProfile','-ExecutionPolicy','Bypass','-File',script,'-Bootstrap',bootstrap,'-Root',root],{encoding:'utf8',windowsHide:true,timeout:30000});
  assert.equal(result.status,0,result.stderr);
  assert.equal(result.stdout.trim(),'FAST_START_AND_LAUNCHER_UPDATE_VERIFIED');
  assert.match(result.stderr,/Checking for updates/);
  assert.match(result.stderr,/Already installed/);
  assert.doesNotMatch(result.stderr,/Verifying|Downloading/);
 }finally{await rm(root,{recursive:true,force:true});}
});
