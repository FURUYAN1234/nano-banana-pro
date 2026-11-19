param([Parameter(Mandatory=$true)][string]$TestRoot)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot '../skills/manga-book-production/bootstrap.ps1') -LibraryOnly
$root=Join-Path ([IO.Path]::GetFullPath($TestRoot)) ('bootstrap-lifecycle-'+[Guid]::NewGuid())
New-Item -ItemType Directory -Path $root|Out-Null
$node=(Get-Command node.exe).Source
Add-Type -AssemblyName System.IO.Compression.FileSystem
$script:FixtureVersion='8.0.0';$script:Offline=$false;$script:Downloads=0;$script:Lookups=0
function New-FixtureRelease([string]$Version){
 $source=Join-Path $root ('source-'+$Version)
 foreach($dir in @('dist','mcp/src','mcp/skills/manga-book-production')){New-Item -ItemType Directory -Path (Join-Path $source $dir) -Force|Out-Null}
 $utf8=New-Object Text.UTF8Encoding($false)
 foreach($prefix in @('','mcp/')){
  [IO.File]::WriteAllText((Join-Path $source ($prefix+'package.json')),('{"name":"isolated-launcher-fixture","version":"'+$Version+'"}'),$utf8)
  [IO.File]::WriteAllText((Join-Path $source ($prefix+'package-lock.json')),('{"name":"isolated-launcher-fixture","version":"'+$Version+'","lockfileVersion":3,"requires":true,"packages":{"":{"name":"isolated-launcher-fixture","version":"'+$Version+'"}}}'),$utf8)
 }
 [IO.File]::WriteAllText((Join-Path $source 'dist/index.html'),'<html><head></head><body>fixture</body></html>',$utf8)
 [IO.File]::WriteAllText((Join-Path $source 'dist/mcp-runtime.json'),('{"appVersion":"'+$Version+'","contractVersion":1}'),$utf8)
 # This fixture tests installer orchestration; actual runtime/SDK health is tested separately.
 [IO.File]::WriteAllText((Join-Path $source 'mcp/src/runtime-build.mjs'),'export async function readRuntimeBuild(){return {current:true}}',$utf8)
 foreach($name in @('service.mjs','http-stdio-adapter.mjs')){[IO.File]::WriteAllText((Join-Path $source ('mcp/src/'+$name)),'// fixture - never launched',$utf8)}
 foreach($name in @('bootstrap.ps1','Launch-Manga.cmd','SKILL.md','compatibility.json')){Copy-Item -LiteralPath (Join-Path $PSScriptRoot ('../skills/manga-book-production/'+$name)) -Destination (Join-Path $source ('mcp/skills/manga-book-production/'+$name))}
 $archive=Join-Path $root ($Version+'.zip');[IO.Compression.ZipFile]::CreateFromDirectory($source,$archive)
 return $archive
}
$script:Archives=@{'8.0.0'=(New-FixtureRelease '8.0.0');'8.0.1'=(New-FixtureRelease '8.0.1')}
function Invoke-RestMethod {
 param([string]$Uri,$Headers,[string]$Method,[int]$TimeoutSec)
 if($script:Offline){throw 'Fixture offline'}
 $script:Lookups++
 if($Uri -notlike 'https://api.github.com/repos/*/releases/latest'){throw 'Unexpected fixture network request'}
 return [pscustomobject]@{draft=$false;prerelease=$false;tag_name=('v'+$script:FixtureVersion);assets=@([pscustomobject]@{name=$script:AssetName;digest=('sha256:'+(Get-FileHash -LiteralPath $script:Archives[$script:FixtureVersion] -Algorithm SHA256).Hash.ToLowerInvariant());browser_download_url=('https://github.com/'+$script:Repository+'/releases/download/v'+$script:FixtureVersion+'/'+$script:AssetName)})}
}
function Invoke-WebRequest {param([string]$Uri,[string]$OutFile,[switch]$UseBasicParsing);$script:Downloads++;Copy-Item -LiteralPath $script:Archives[$script:FixtureVersion] -Destination $OutFile}
$install=Join-Path $root 'installation';New-Item -ItemType Directory -Path $install|Out-Null
$first=Install-OfficialRelease $install $node
if(-not(Read-VerifiedInstall $first) -or $script:Downloads -ne 1){throw 'Empty install failed'}
$firstHash=(Get-FileHash -LiteralPath (Join-Path $first 'verified-install.json')).Hash
$same=Install-OfficialRelease $install $node
if($same -ne $first -or $script:Downloads -ne 1){throw 'Same version was reinstalled'}
$script:FixtureVersion='8.0.1';$second=Install-OfficialRelease $install $node
if($second -eq $first -or -not(Read-VerifiedInstall $second) -or (Get-FileHash -LiteralPath (Join-Path $first 'verified-install.json')).Hash -ne $firstHash){throw 'Update changed old version'}
$script:InstallRoot=$install;$script:Workspace=Join-Path $root 'workspace';$script:NoOpen=$true;$script:NoShortcut=$true;$script:InstallOnly=$true;$script:Offline=$true
Start-MangaLauncher
if(-not(Test-Path -LiteralPath (Join-Path $install 'launcher/Launch-Manga.cmd'))){throw 'Offline fallback failed'}
$script:InstallRoot=Join-Path $root 'empty-offline';$rejected=$false;try{Start-MangaLauncher}catch{$rejected=$true};if(-not $rejected){throw 'Empty offline install was accepted'}
# A healthy existing service must be reused without even querying latest release.
$script:InstallRoot=$install;$script:Offline=$false;$before=$script:Lookups
function Read-LiveService([string]$Root){[pscustomobject]@{origin='http://127.0.0.1:1';appVersion='8.0.0'}}
Start-MangaLauncher
if($script:Lookups -ne $before){throw 'Active service triggered an update'}
$worker=Join-Path $PSScriptRoot 'bootstrap-concurrent-worker.ps1'
$concurrent=Join-Path $root 'concurrent-install';New-Item -ItemType Directory -Path $concurrent|Out-Null
$bootstrap=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../skills/manga-book-production/bootstrap.ps1'))
$args=@('-NoProfile','-File',('"'+$worker+'"'),'-Bootstrap',('"'+$bootstrap+'"'),'-Root',('"'+$concurrent+'"'))
$children=@()
foreach($i in 1..2){$child=Microsoft.PowerShell.Management\Start-Process -FilePath 'powershell.exe' -ArgumentList $args -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $root ('concurrent-'+$i+'.out')) -RedirectStandardError (Join-Path $root ('concurrent-'+$i+'.err'));$null=$child.Handle;$children+=$child}
foreach($child in $children){if(-not $child.WaitForExit(15000)){throw 'Concurrent fixture timed out'};$child.Refresh();if($child.ExitCode -ne 0){throw ('Concurrent launcher failed: '+[IO.File]::ReadAllText((Join-Path $root ('concurrent-'+([array]::IndexOf($children,$child)+1)+'.err'))))}}
if(@(Get-Content -LiteralPath (Join-Path $concurrent 'installs.txt')).Count -ne 1 -or @(Get-Content -LiteralPath (Join-Path $concurrent 'starts.txt')).Count -ne 1){throw 'Concurrent launches duplicated installation or service'}
# An existing verified install must cold-start through the ordinary MCP command
# without checking GitHub. The fixtures never bind a real port.
$script:InstallOnly=$false
$script:Stdio=$true
$script:FixtureService=$null
function Read-LiveService([string]$Root){$script:FixtureService}
function Start-Process {
 param($FilePath,$ArgumentList,$WindowStyle,$RedirectStandardOutput,$RedirectStandardError)
 if($ArgumentList[0] -notlike '*v8.0.1*mcp*src*service.mjs*'){throw 'Unexpected automatic startup version'}
 $script:FixtureService=[pscustomobject]@{origin='http://127.0.0.1:1';appVersion='8.0.1'}
}
$before=$script:Lookups
$script:FixtureVersion='8.0.0'
Start-MangaLauncher
if($script:Lookups -ne $before -or -not $script:FixtureService){throw 'Automatic MCP startup queried GitHub or failed to start'}
$script:FixtureService=$null
$script:InstallRoot=Join-Path $root 'empty-stdio'
$rejected=$false
try{Start-MangaLauncher}catch{$rejected=$_.Exception.Message -like '*Install the official app*'}
if(-not $rejected -or $script:Lookups -ne $before -or $script:FixtureService){throw 'Automatic startup attempted first-time installation'}
Write-Output ('BOOTSTRAP_LIFECYCLE_VERIFIED empty-install/same-version/update/old-preserved/offline/empty-offline-rejected/active-preserved root='+$root)
