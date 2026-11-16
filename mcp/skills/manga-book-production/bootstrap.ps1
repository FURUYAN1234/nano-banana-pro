[CmdletBinding()]
param(
 [string]$InstallRoot=(Join-Path $env:LOCALAPPDATA 'SuperFURU-Manga'),
 [string]$Workspace,
 [int]$Port=45931,
 [switch]$NoOpen,
 [switch]$NoShortcut,
 [switch]$Stdio,
 [switch]$InstallOnly,
 [switch]$Update,
 [switch]$StopOnly,
 [switch]$LibraryOnly
)
Set-StrictMode -Version Latest
$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
# An AI client may inherit PowerShell 7's module path while launching Windows
# PowerShell 5.1. Load this host's built-in modules, without changing user paths.
foreach($module in @('Microsoft.PowerShell.Utility','Microsoft.PowerShell.Management')){Import-Module (Join-Path $PSHOME ('Modules/'+$module+'/'+$module+'.psd1')) -ErrorAction Stop}
$script:Repository='FURUYAN1234/nano-banana-pro'
$script:AssetName='SuperFURU-Manga-MCP.zip'
function Assert-PlainPath([string]$Path){
 $cursor=[IO.Path]::GetFullPath($Path)
 while($cursor){
  $item=Get-Item -LiteralPath $cursor -Force -ErrorAction SilentlyContinue
  if($item -and ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)){throw "Linked installer paths are not allowed: $cursor"}
  $parent=[IO.Path]::GetDirectoryName($cursor);if($parent -eq $cursor){break};$cursor=$parent
 }
}
function Get-CanonicalPath([string]$Path){[IO.Path]::GetFullPath($Path).TrimEnd('\','/')}
function Assert-Contained([string]$Root,[string]$Path){
 $r=Get-CanonicalPath $Root;$p=Get-CanonicalPath $Path
 if(-not $p.StartsWith($r+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)){throw 'Archive path escapes its version directory.'}
}
function Expand-VerifiedArchive([string]$Archive,[string]$Destination){
 Add-Type -AssemblyName System.IO.Compression.FileSystem
 Assert-PlainPath $Destination
 if(Test-Path -LiteralPath $Destination){throw 'Extraction destination must be new.'}
 $zip=[IO.Compression.ZipFile]::OpenRead($Archive)
 try{
  foreach($entry in $zip.Entries){
   if($entry.FullName -match '(^[\\/]|:|[\x00-\x1f]|(^|[\\/])\.\.([\\/]|$))' -or (($entry.ExternalAttributes -shr 16) -band 0xF000) -eq 0xA000){throw 'Unsafe archive entry.'}
   Assert-Contained $Destination (Join-Path $Destination $entry.FullName)
  }
 }finally{$zip.Dispose()}
 [IO.Compression.ZipFile]::ExtractToDirectory($Archive,$Destination)
}
function Read-VerifiedInstall([string]$Directory){
 Assert-PlainPath $Directory
 $receipt=Join-Path $Directory 'verified-install.json'
 if(-not(Test-Path -LiteralPath $receipt -PathType Leaf)){return $null}
 Assert-PlainPath $receipt
 $r=Get-Content -LiteralPath $receipt -Raw|ConvertFrom-Json
 if($r.repository -ne $script:Repository -or $r.tag -notmatch '^v\d+\.\d+\.\d+$'){throw 'Invalid verified installation receipt.'}
 foreach($required in @('package.json','mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','dist/index.html')){if($r.files.PSObject.Properties.Name -notcontains $required){throw 'Verified installation receipt is missing required file hashes.'}}
 foreach($property in $r.files.PSObject.Properties){
  $file=Join-Path $Directory $property.Name;Assert-Contained $Directory $file;Assert-PlainPath $file
  if(-not(Test-Path -LiteralPath $file -PathType Leaf) -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $property.Value){throw 'Verified installed files changed.'}
 }
 $pkg=Get-Content -LiteralPath (Join-Path $Directory 'package.json') -Raw|ConvertFrom-Json
 if(('v'+$pkg.version) -ne $r.tag){throw 'Installed package version differs from the release tag.'}
 return $r
}
function Read-LiveService([string]$Root){
 $file=Join-Path $Root 'local-service.json'
 if(-not(Test-Path -LiteralPath $file -PathType Leaf)){return $null}
 Assert-PlainPath $Root;Assert-PlainPath $file
 try{
  $r=Get-Content -LiteralPath $file -Raw|ConvertFrom-Json;$uri=[Uri]$r.origin
  if($uri.Scheme -ne 'http' -or $uri.Host -ne '127.0.0.1' -or $uri.UserInfo -or $uri.AbsolutePath -ne '/' -or $r.contractVersion -ne 1 -or (Get-CanonicalPath $r.workspace) -ne (Get-CanonicalPath $Root)){return $null}
  $health=Invoke-RestMethod -Uri ($r.origin+'/health') -Headers @{Authorization=('Bearer '+$r.token)} -TimeoutSec 3
  if($health.instanceId -ne $r.instanceId -or $health.pid -ne $r.pid -or $health.workspace -ne $r.workspace -or $health.appVersion -ne $r.appVersion){return $null}
  return $r
 }catch{return $null}
}
function Get-NodeExecutable([string]$Root){
 $cmd=Get-Command node.exe -ErrorAction SilentlyContinue
 if($cmd){$v=[version]((& $cmd.Source -p 'process.versions.node')|Select-Object -Last 1);if(($v.Major -eq 20 -and $v -ge [version]'20.19.0') -or ($v.Major -ge 22 -and $v -ge [version]'22.12.0')){return $cmd.Source}}
 $runtime=Join-Path $Root 'node';Assert-PlainPath $runtime;New-Item -ItemType Directory -Path $runtime -Force|Out-Null
 foreach($installed in (Get-ChildItem -LiteralPath $runtime -Directory|Where-Object {$_.Name -match '^node-v\d+\.\d+\.\d+-win-x64$'}|Sort-Object Name -Descending)){
  $candidate=Join-Path $installed.FullName 'node.exe';$receipt=Join-Path $installed.FullName 'portable-node-sha256.txt'
  if((Test-Path -LiteralPath $candidate -PathType Leaf) -and (Test-Path -LiteralPath $receipt -PathType Leaf)){
   Assert-PlainPath $candidate;Assert-PlainPath $receipt
   if((Get-FileHash -LiteralPath $candidate -Algorithm SHA256).Hash -eq (Get-Content -LiteralPath $receipt -Raw).Trim()){
    $candidateVersion=[version](($installed.Name -replace '^node-v','') -replace '-win-x64$','')
    if(($candidateVersion.Major -eq 20 -and $candidateVersion -ge [version]'20.19.0') -or $candidateVersion -ge [version]'22.12.0'){return $candidate}
   }
  }
 }
 $releases=Invoke-RestMethod 'https://nodejs.org/dist/index.json'
 $release=$releases|Where-Object {$_.lts -and $_.files -contains 'win-x64-zip'}|Select-Object -First 1
 if(-not $release -or $release.version -notmatch '^v\d+\.\d+\.\d+$'){throw 'No official portable Node LTS was found.'}
 $name='node-'+$release.version+'-win-x64';$dest=Join-Path $runtime $name;$exe=Join-Path $dest 'node.exe'
 $nodeReceipt=Join-Path $dest 'portable-node-sha256.txt'
 if(Test-Path -LiteralPath $exe){Assert-PlainPath $exe;Assert-PlainPath $nodeReceipt;if(-not(Test-Path -LiteralPath $nodeReceipt) -or (Get-FileHash -LiteralPath $exe -Algorithm SHA256).Hash -ne (Get-Content -LiteralPath $nodeReceipt -Raw).Trim()){throw 'Existing portable Node is not hash-verified.'};return $exe}
 $archive=Join-Path $runtime ($name+'.zip');$base='https://nodejs.org/dist/'+$release.version+'/'
 $sums=(Invoke-WebRequest ($base+'SHASUMS256.txt') -UseBasicParsing).Content
 $line=($sums -split "`n"|Where-Object {$_ -match ('^[a-fA-F0-9]{64}\s+'+[regex]::Escape($name+'.zip')+'\s*$')}|Select-Object -First 1)
 if(-not $line){throw 'Official Node checksum is missing.'}
 Invoke-WebRequest ($base+$name+'.zip') -OutFile $archive -UseBasicParsing
 if((Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash -ne ($line -split '\s+')[0]){throw 'Portable Node checksum mismatch.'}
 $stage=Join-Path $runtime ([Guid]::NewGuid().ToString()+'.pending');Expand-VerifiedArchive $archive $stage
 Move-Item -LiteralPath (Join-Path $stage $name) -Destination $dest
 Remove-Item -LiteralPath $stage
 (Get-FileHash -LiteralPath $exe -Algorithm SHA256).Hash|Set-Content -LiteralPath $nodeReceipt -Encoding ascii
 return $exe
}
function Install-OfficialRelease([string]$Root,[string]$Node){
 $versions=Join-Path $Root 'versions';Assert-PlainPath $versions;New-Item -ItemType Directory -Path $versions -Force|Out-Null
 $release=Invoke-RestMethod ('https://api.github.com/repos/'+$script:Repository+'/releases/latest') -Headers @{'User-Agent'='SuperFURU-Manga-Launcher';Accept='application/vnd.github+json'}
 if($release.draft -or $release.prerelease -or $release.tag_name -notmatch '^v\d+\.\d+\.\d+$'){throw 'Latest release is not a stable version.'}
 $asset=$release.assets|Where-Object {$_.name -eq $script:AssetName}|Select-Object -First 1
 if(-not $asset -or $asset.digest -notmatch '^sha256:[a-fA-F0-9]{64}$'){throw 'The official latest release does not yet provide a verifiable MCP package.'}
 $expectedUrl='https://github.com/'+$script:Repository+'/releases/download/'+$release.tag_name+'/'+$script:AssetName
 if($asset.browser_download_url -ne $expectedUrl){throw 'Release asset URL does not match the official repository/tag.'}
 $destination=Join-Path $versions $release.tag_name
 if(Test-Path -LiteralPath $destination){if(-not(Read-VerifiedInstall $destination)){throw 'Existing installation has no verification receipt.'};return $destination}
 $archive=Join-Path $Root ([Guid]::NewGuid().ToString()+'.zip')
 Invoke-WebRequest $expectedUrl -OutFile $archive -UseBasicParsing
 if((Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant() -ne $asset.digest.Substring(7).ToLowerInvariant()){throw 'Release archive SHA-256 mismatch.'}
 $stage=Join-Path $versions ([Guid]::NewGuid().ToString()+'.pending');Expand-VerifiedArchive $archive $stage
 $required=@('package.json','package-lock.json','dist/index.html','dist/mcp-runtime.json','mcp/package.json','mcp/package-lock.json','mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','mcp/skills/manga-book-production/SKILL.md','mcp/skills/manga-book-production/compatibility.json')
 foreach($name in $required){$file=Join-Path $stage $name;Assert-PlainPath $file;if(-not(Test-Path -LiteralPath $file -PathType Leaf)){throw "MCP archive missing required file: $name"}}
 $pkg=Get-Content -LiteralPath (Join-Path $stage 'package.json') -Raw|ConvertFrom-Json
 $stamp=Get-Content -LiteralPath (Join-Path $stage 'dist/mcp-runtime.json') -Raw|ConvertFrom-Json
 if(('v'+$pkg.version) -ne $release.tag_name -or $stamp.appVersion -ne $pkg.version -or $stamp.contractVersion -ne 1){throw 'Release package/build version or contract mismatch.'}
 $compatibility=Get-Content -LiteralPath (Join-Path $stage 'mcp/skills/manga-book-production/compatibility.json') -Raw|ConvertFrom-Json
 if($compatibility.contractVersion -ne 1 -or [version]$pkg.version -lt [version]$compatibility.minimumAppVersion){throw 'The package is not compatible with the bundled production skill.'}
 $npm=Join-Path (Split-Path $Node) 'node_modules/npm/bin/npm-cli.js'
 if(-not(Test-Path -LiteralPath $npm)){throw 'A matching npm installation is required.'}
 Push-Location $stage
 try{
  & $Node $npm ci --ignore-scripts|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'Root clean dependency install failed.'}
  Push-Location (Join-Path $stage 'mcp');try{& $Node $npm ci --ignore-scripts|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'MCP clean dependency install failed.'}}finally{Pop-Location}
  $verify="import {readRuntimeBuild} from './mcp/src/runtime-build.mjs'; const result=await readRuntimeBuild(process.cwd(),process.cwd()+'/dist'); if(!result.current)process.exitCode=2;"
  & $Node --input-type=module -e $verify
  if($LASTEXITCODE -ne 0){& $Node $npm run mcp:build|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'The verified source could not build a current runtime.'}}
  & $Node --input-type=module -e $verify;if($LASTEXITCODE -ne 0){throw 'Runtime fingerprint verification failed after initialization.'}
 }finally{Pop-Location}
 $files=[ordered]@{}
 Get-ChildItem -LiteralPath $stage -File -Recurse|ForEach-Object {$relative=$_.FullName.Substring($stage.Length+1).Replace('\','/');$files[$relative]=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}
 @{repository=$script:Repository;tag=$release.tag_name;archiveSha256=$asset.digest.Substring(7);files=$files}|ConvertTo-Json -Depth 8|Set-Content -LiteralPath (Join-Path $stage 'verified-install.json') -Encoding utf8
 Move-Item -LiteralPath $stage -Destination $destination
 Remove-Item -LiteralPath $archive
 return $destination
}
function Get-MangaDesktopDirectory { [Environment]::GetFolderPath('Desktop') }
function Set-OwnedShortcut([string]$Launcher){
 $desktop=Get-MangaDesktopDirectory;if(-not $desktop){return}
 $file=Join-Path $desktop 'Super FURU Manga MCP.lnk';Assert-PlainPath $file
 try{$shell=New-Object -ComObject WScript.Shell;$link=$shell.CreateShortcut($file)}catch{[Console]::Error.WriteLine('Desktop shortcut could not be inspected; existing files were preserved.');return}
 if(Test-Path -LiteralPath $file){if($link.Description -ne 'SuperFURU Manga managed launcher'){[Console]::Error.WriteLine('An unrelated Desktop shortcut already exists; it was preserved.');return}}
 $link.TargetPath=$Launcher;$link.WorkingDirectory=Split-Path $Launcher;$link.Description='SuperFURU Manga managed launcher';$link.Save()
}
function Start-MangaLauncher {
 $root=Get-CanonicalPath $InstallRoot;Assert-PlainPath $root;New-Item -ItemType Directory -Path $root -Force|Out-Null
 if(-not $Workspace){$script:Workspace=Join-Path $root 'workspace'}
 $ws=Get-CanonicalPath $Workspace;Assert-PlainPath $ws;New-Item -ItemType Directory -Path $ws -Force|Out-Null
 # A live service always wins over updates, even when it is idle.
 $live=Read-LiveService $ws
 if($live -and ($Update -or $StopOnly)){
  $health=Invoke-RestMethod -Uri ($live.origin+'/health') -Headers @{Authorization=('Bearer '+$live.token)} -TimeoutSec 3
  if($health.connected -or $health.activeJobs -gt 0){throw 'Disconnect MCP and wait for active jobs before explicitly stopping/updating the service.'}
  $null=Invoke-RestMethod -Uri ($live.origin+'/service/stop') -Method Post -Headers @{Authorization=('Bearer '+$live.token)} -TimeoutSec 5
  for($i=0;$i -lt 40 -and (Read-LiveService $ws);$i++){Start-Sleep -Milliseconds 100}
  if(Read-LiveService $ws){throw 'The service has not confirmed shutdown; no update was started.'}
  $live=$null
 }
 if($StopOnly){return}
 if($live){
  if($Stdio){$node=Get-NodeExecutable $root;$version=Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion);$null=Read-VerifiedInstall $version;& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
  if(-not $NoOpen){Start-Process ($live.origin+'/nano-banana-pro/')};return
 }
 $mutexName='Local\SuperFURU-Manga-Install-'+([BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($root.ToLowerInvariant()))).Replace('-',''))
 $mutex=New-Object Threading.Mutex($false,$mutexName);$held=$false
 try{
  try{$held=$mutex.WaitOne(30000)}catch [Threading.AbandonedMutexException]{$held=$true}
  if(-not $held){throw 'Another launcher is preparing this installation.'}
  # A concurrent launcher may have started the service while this caller waited.
  # Recheck under the installer lock before querying/downloading a newer release.
  $live=Read-LiveService $ws
  if($live){
   if($Stdio){$node=Get-NodeExecutable $root;$version=Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion);$null=Read-VerifiedInstall $version;& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
   if(-not $NoOpen){Start-Process ($live.origin+'/nano-banana-pro/')};return
  }
  $node=Get-NodeExecutable $root
  try{$version=Install-OfficialRelease $root $node}catch{
   $failure=$_;$version=$null;$versions=Join-Path $root 'versions'
   if(Test-Path -LiteralPath $versions){foreach($dir in (Get-ChildItem -LiteralPath $versions -Directory|Where-Object {$_.Name -match '^v\d+\.\d+\.\d+$'}|Sort-Object {[version]$_.Name.Substring(1)} -Descending)){try{if(Read-VerifiedInstall $dir.FullName){$version=$dir.FullName;break}}catch{}}}
   if(-not $version){throw $failure};[Console]::Error.WriteLine('Latest release could not be obtained; using an existing hash-verified installation.')
  }
  $launcherRoot=Join-Path $root 'launcher';New-Item -ItemType Directory -Path $launcherRoot -Force|Out-Null
  $verifiedSkill=Join-Path $version 'mcp/skills/manga-book-production'
  foreach($name in @('bootstrap.ps1','Launch-Manga.cmd')){$source=Join-Path $verifiedSkill $name;$target=Join-Path $launcherRoot $name;Assert-PlainPath $source;Assert-PlainPath $target;if((Get-CanonicalPath $source) -ne (Get-CanonicalPath $target)){Copy-Item -LiteralPath $source -Destination $target -Force}}
  [Console]::Error.WriteLine('The verified release supplies the current launcher and manga://skills/book-production workflow resource. Custom external skill files are preserved.')
  if(-not $NoShortcut){Set-OwnedShortcut (Join-Path $launcherRoot 'Launch-Manga.cmd')}
  if($InstallOnly){return}
  $live=Read-LiveService $ws
  if(-not $live){
   $arguments=@(('"'+(Join-Path $version 'mcp/src/service.mjs')+'"'),'--workspace',('"'+$ws+'"'),'--port',[string]$Port)
   Start-Process -FilePath $node -ArgumentList $arguments -WindowStyle Hidden -RedirectStandardOutput (Join-Path $root 'service.stdout.log') -RedirectStandardError (Join-Path $root 'service.stderr.log')|Out-Null
   for($i=0;$i -lt 40 -and -not $live;$i++){Start-Sleep -Milliseconds 250;$live=Read-LiveService $ws}
   if(-not $live){throw 'The local service did not become healthy. Inspect service.stderr.log; no generation was submitted.'}
  }
 }finally{if($held){$mutex.ReleaseMutex()};$mutex.Dispose()}
 if($Stdio){& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
 if(-not $NoOpen){Start-Process ($live.origin+'/nano-banana-pro/')}
}
if(-not $LibraryOnly){Start-MangaLauncher}
