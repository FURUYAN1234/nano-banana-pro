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
[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false)
# An AI client may inherit PowerShell 7's module path while launching Windows
# PowerShell 5.1. Load this host's built-in modules, without changing user paths.
foreach($module in @('Microsoft.PowerShell.Utility','Microsoft.PowerShell.Management')){Import-Module (Join-Path $PSHOME ('Modules/'+$module+'/'+$module+'.psd1')) -ErrorAction Stop}
$script:Repository='FURUYAN1234/nano-banana-pro'
$script:AssetName='SuperFURU-Manga-MCP.zip'
$script:LauncherRevision=3
function Write-MangaStatus([string]$Message){
 # Keep stdout exclusively for the MCP stdio protocol and function results.
 [Console]::Error.WriteLine(('[{0:HH:mm:ss}] {1}' -f (Get-Date),$Message))
}
function Write-MangaFileProgress([string]$Activity,[int]$Done,[int]$Total){
 $percent=if($Total -gt 0){[int][Math]::Floor(100.0*$Done/$Total)}else{100}
 Write-MangaStatus ('{0}: {1}/{2} ({3}%)' -f $Activity,$Done,$Total,$percent)
}
function Get-MangaReparseTag([string]$Path){
 if(-not ('MangaReparseMetadata' -as [type])){
  Add-Type -TypeDefinition @'
using System;
using System.ComponentModel;
using System.Runtime.InteropServices;
using Microsoft.Win32.SafeHandles;
public static class MangaReparseMetadata {
 [StructLayout(LayoutKind.Sequential)] struct TagInfo { public uint Attributes; public uint Tag; }
 [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
 static extern SafeFileHandle CreateFileW(string path,uint access,uint share,IntPtr security,uint disposition,uint flags,IntPtr template);
 [DllImport("kernel32.dll", SetLastError=true)]
 static extern bool GetFileInformationByHandleEx(SafeFileHandle handle,int kind,out TagInfo info,uint size);
 public static uint ReadTag(string path) {
  using(var handle=CreateFileW(path,0,7,IntPtr.Zero,3,0x02200000,IntPtr.Zero)) {
   if(handle.IsInvalid) throw new Win32Exception(Marshal.GetLastWin32Error());
   TagInfo info;
   if(!GetFileInformationByHandleEx(handle,9,out info,8)) throw new Win32Exception(Marshal.GetLastWin32Error());
   return info.Tag;
  }
 }
}
'@
 }
 return [MangaReparseMetadata]::ReadTag($Path)
}
function Test-MangaCloudTag([uint32]$Tag){
 # Microsoft CLOUD and CLOUD_1..F tags are not name-surrogate links.
 return (($Tag -band [uint32]4294905855) -eq [uint32]2415919130)
}
function Assert-PlainPath([string]$Path,[switch]$AllowCloudDirectories,[switch]$AllowCloudShortcutLeaf){
 $leaf=[IO.Path]::GetFullPath($Path);$cursor=$leaf
 while($cursor){
  $item=Get-Item -LiteralPath $cursor -Force -ErrorAction SilentlyContinue
  if($item -and ($item.Attributes -band [IO.FileAttributes]::ReparsePoint)){
   $cloudCandidate=($AllowCloudDirectories -and $item.PSIsContainer) -or ($AllowCloudShortcutLeaf -and -not $item.PSIsContainer -and $cursor -eq $leaf -and [IO.Path]::GetExtension($cursor) -eq '.lnk')
   if(-not $cloudCandidate -or -not(Test-MangaCloudTag (Get-MangaReparseTag $cursor))){throw "Linked or unsupported reparse paths are not allowed: $cursor"}
  }
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
function Read-VerifiedInstall([string]$Directory,[switch]$MetadataOnly){
 Assert-PlainPath $Directory
 $receipt=Join-Path $Directory 'verified-install.json'
 if(-not(Test-Path -LiteralPath $receipt -PathType Leaf)){return $null}
 Assert-PlainPath $receipt
 $r=Get-Content -LiteralPath $receipt -Raw|ConvertFrom-Json
 if($r.repository -ne $script:Repository -or $r.tag -notmatch '^v\d+\.\d+\.\d+$'){throw 'Invalid verified installation receipt.'}
 foreach($required in @('package.json','mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','dist/index.html')){
  if($r.files.PSObject.Properties.Name -notcontains $required){throw 'Verified installation receipt is missing required file hashes.'}
  $file=Join-Path $Directory $required;Assert-Contained $Directory $file;Assert-PlainPath $file
  if(-not(Test-Path -LiteralPath $file -PathType Leaf)){throw 'Installed release is incomplete.'}
 }
 $pkg=Get-Content -LiteralPath (Join-Path $Directory 'package.json') -Raw|ConvertFrom-Json
 if(('v'+$pkg.version) -ne $r.tag){throw 'Installed package version differs from the release tag.'}
 # Startup checks the installed version and entry files. Archive integrity is
 # checked on download; full file hashing is an explicit diagnostic only.
 if($MetadataOnly){return $r}
 $properties=@($r.files.PSObject.Properties);$verified=0;$nextReport=[DateTime]::UtcNow.AddSeconds(3)
 Write-MangaFileProgress ('ファイルを検証中 / Verifying '+$r.tag) 0 $properties.Count
 foreach($property in $properties){
  $file=Join-Path $Directory $property.Name;Assert-Contained $Directory $file;Assert-PlainPath $file
  if(-not(Test-Path -LiteralPath $file -PathType Leaf) -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $property.Value){throw 'Verified installed files changed.'}
  $verified++
  if($verified -eq $properties.Count -or [DateTime]::UtcNow -ge $nextReport){Write-MangaFileProgress ('ファイルを検証中 / Verifying '+$r.tag) $verified $properties.Count;$nextReport=[DateTime]::UtcNow.AddSeconds(3)}
 }
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
 Write-MangaStatus '実行環境を確認中 / Checking Node.js'
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
 Write-MangaStatus '必要な実行環境を公式サイトで確認中 / Checking the official Node.js runtime'
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
 Write-MangaStatus '実行環境をダウンロード中 / Downloading Node.js'
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
 Write-MangaStatus '最新版を確認中 / Checking for updates'
 $release=Invoke-RestMethod ('https://api.github.com/repos/'+$script:Repository+'/releases/latest') -Headers @{'User-Agent'='SuperFURU-Manga-Launcher';Accept='application/vnd.github+json'}
 if($release.draft -or $release.prerelease -or $release.tag_name -notmatch '^v\d+\.\d+\.\d+$'){throw 'Latest release is not a stable version.'}
 $asset=$release.assets|Where-Object {$_.name -eq $script:AssetName}|Select-Object -First 1
 if(-not $asset -or $asset.digest -notmatch '^sha256:[a-fA-F0-9]{64}$'){throw 'The official latest release does not yet provide a verifiable MCP package.'}
 $expectedUrl='https://github.com/'+$script:Repository+'/releases/download/'+$release.tag_name+'/'+$script:AssetName
 if($asset.browser_download_url -ne $expectedUrl){throw 'Release asset URL does not match the official repository/tag.'}
 $destination=Join-Path $versions $release.tag_name
 if(Test-Path -LiteralPath $destination){if(-not(Read-VerifiedInstall $destination -MetadataOnly)){throw 'Existing installation has no verification receipt.'};Write-MangaStatus ('最新版が導入済みです / Already installed: '+$release.tag_name);return $destination}
 $archive=Join-Path $Root ([Guid]::NewGuid().ToString()+'.zip')
 Write-MangaStatus ('アプリをダウンロード中 / Downloading '+$release.tag_name)
 Invoke-WebRequest $expectedUrl -OutFile $archive -UseBasicParsing
 if((Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant() -ne $asset.digest.Substring(7).ToLowerInvariant()){throw 'Release archive SHA-256 mismatch.'}
 Write-MangaStatus 'ダウンロードの検証完了。展開中 / Download verified; extracting'
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
  Write-MangaStatus '必要な部品をインストール中 / Installing dependencies'
  & $Node $npm ci --ignore-scripts|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'Root clean dependency install failed.'}
  Push-Location (Join-Path $stage 'mcp');try{& $Node $npm ci --ignore-scripts|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'MCP clean dependency install failed.'}}finally{Pop-Location}
  Write-MangaStatus 'アプリの準備状態を確認中 / Checking the application build'
  $verify="import {readRuntimeBuild} from './mcp/src/runtime-build.mjs'; const result=await readRuntimeBuild(process.cwd(),process.cwd()+'/dist'); if(!result.current)process.exitCode=2;"
  & $Node --input-type=module -e $verify
  if($LASTEXITCODE -ne 0){& $Node $npm run mcp:build|ForEach-Object{[Console]::Error.WriteLine($_)};if($LASTEXITCODE -ne 0){throw 'The verified source could not build a current runtime.'}}
  & $Node --input-type=module -e $verify;if($LASTEXITCODE -ne 0){throw 'Runtime fingerprint verification failed after initialization.'}
 }finally{Pop-Location}
 $files=[ordered]@{}
 Write-MangaStatus 'インストール情報を保存中 / Recording the installed version'
 foreach($name in $required){$files[$name]=(Get-FileHash -LiteralPath (Join-Path $stage $name) -Algorithm SHA256).Hash.ToLowerInvariant()}
 $manifest=Join-Path $stage 'SHA256SUMS.json'
 if(Test-Path -LiteralPath $manifest -PathType Leaf){$files['SHA256SUMS.json']=(Get-FileHash -LiteralPath $manifest -Algorithm SHA256).Hash.ToLowerInvariant()}
 @{repository=$script:Repository;tag=$release.tag_name;archiveSha256=$asset.digest.Substring(7);files=$files}|ConvertTo-Json -Depth 8|Set-Content -LiteralPath (Join-Path $stage 'verified-install.json') -Encoding utf8
 Move-Item -LiteralPath $stage -Destination $destination
 Remove-Item -LiteralPath $archive
 return $destination
}
function Get-MangaDesktopDirectory { [Environment]::GetFolderPath('Desktop') }
function Sync-MangaClientSkill([string]$VersionDirectory,[string]$Root,[string]$Node){
 $updater=Join-Path $VersionDirectory 'mcp/src/client-skill-update.mjs'
 if(-not(Test-Path -LiteralPath $updater -PathType Leaf)){return}
 try{
  Assert-PlainPath $updater
  $receipt=Read-VerifiedInstall $VersionDirectory -MetadataOnly
  if(-not $receipt){throw 'The skill source has no verified release receipt.'}
  $manifest=Join-Path $VersionDirectory 'SHA256SUMS.json';Assert-PlainPath $manifest
  if($receipt.files.PSObject.Properties.Name -contains 'SHA256SUMS.json' -and (Get-FileHash -LiteralPath $manifest).Hash -ne $receipt.files.'SHA256SUMS.json'){throw 'The verified package manifest changed.'}
  $expected=(Get-Content -LiteralPath $manifest -Raw -Encoding UTF8|ConvertFrom-Json).files.'mcp/src/client-skill-update.mjs'
  if($expected -notmatch '^[a-f0-9]{64}$' -or (Get-FileHash -LiteralPath $updater).Hash -ne $expected){throw 'The packaged skill updater changed.'}
  if(-not $Node){$Node=Get-NodeExecutable $Root}
  & $Node $updater
  if($LASTEXITCODE -ne 0){throw 'See the client skill update message above.'}
 }catch{Write-MangaStatus ('スキルの更新に失敗しました / Client skill update failed: '+$_.Exception.Message)}
}
function Set-OwnedShortcut([string]$Launcher){
 try{
  $desktop=Get-MangaDesktopDirectory
  if(-not $desktop -or -not(Test-Path -LiteralPath $desktop -PathType Container)){[Console]::Error.WriteLine('Desktop is unavailable; no shortcut was created. The app can still start.');return}
  $file=Join-Path $desktop 'Super FURU Manga MCP.lnk';Assert-PlainPath $file -AllowCloudDirectories -AllowCloudShortcutLeaf
  $shell=New-Object -ComObject WScript.Shell;$link=$shell.CreateShortcut($file)
  if(Test-Path -LiteralPath $file){if($link.Description -ne 'SuperFURU Manga managed launcher'){[Console]::Error.WriteLine('An unrelated Desktop shortcut already exists; it was preserved.');return}}
  $link.TargetPath=$Launcher;$link.WorkingDirectory=Split-Path $Launcher;$link.Description='SuperFURU Manga managed launcher';$link.Save()
 }catch{[Console]::Error.WriteLine('Desktop shortcut was not created; existing files were preserved. The app can still start. '+$_.Exception.Message)}
}
function Find-VerifiedMangaInstall([string]$Root){
 $versions=Join-Path $Root 'versions'
 Assert-PlainPath $versions
 if(-not(Test-Path -LiteralPath $versions -PathType Container)){return $null}
 $candidates=Get-ChildItem -LiteralPath $versions -Directory |
  Where-Object {$_.Name -match '^v\d+\.\d+\.\d+$'} |
  Sort-Object {[version]$_.Name.Substring(1)} -Descending
 foreach($candidate in $candidates){
  try{
   if(Read-VerifiedInstall $candidate.FullName -MetadataOnly){return $candidate.FullName}
  }catch{
   # Ignore incomplete or invalid installations and check the next local version.
  }
 }
 return $null
}
function Start-MangaLauncher {
 Write-MangaStatus 'AI四コマの起動準備中 / Preparing Super FURU Manga'
 $root=Get-CanonicalPath $InstallRoot;Assert-PlainPath $root;New-Item -ItemType Directory -Path $root -Force|Out-Null
 if(-not(Test-Path -LiteralPath $root -PathType Container)){throw 'The installation path must be a directory.'}
 if(-not $Workspace){$script:Workspace=Join-Path $root 'workspace'}
 $ws=Get-CanonicalPath $Workspace;Assert-PlainPath $ws;New-Item -ItemType Directory -Path $ws -Force|Out-Null
 # A live service always wins over updates, even when it is idle.
 Write-MangaStatus '起動済みのアプリを確認中 / Checking for a running app'
 $live=Read-LiveService $ws
 if($live -and ($Update -or $StopOnly)){
  $health=Invoke-RestMethod -Uri ($live.origin+'/health') -Headers @{Authorization=('Bearer '+$live.token)} -TimeoutSec 3
  if($health.connected -or $health.activeJobs -gt 0){throw 'Disconnect MCP and wait for active jobs before explicitly stopping/updating the service.'}
  $null=Invoke-RestMethod -Uri ($live.origin+'/service/stop') -Method Post -Headers @{Authorization=('Bearer '+$live.token)} -TimeoutSec 5
  for($i=0;$i -lt 40 -and (Read-LiveService $ws);$i++){Start-Sleep -Milliseconds 100}
  if(Read-LiveService $ws){throw 'The service has not confirmed shutdown; no update was started.'}
  $live=$null
 }
 if($StopOnly){Write-MangaStatus '停止を確認しました / Service stopped';return}
 if($live){
  Write-MangaStatus '起動済みのアプリを利用します / Reusing the running app'
  Sync-MangaClientSkill (Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion)) $root ''
  if($Stdio){$node=Get-NodeExecutable $root;$version=Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion);$null=Read-VerifiedInstall $version -MetadataOnly;& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
  if(-not $NoOpen){Write-MangaStatus 'ブラウザーを開いています / Opening the browser';Start-Process ($live.origin+'/nano-banana-pro/')};Write-MangaStatus '起動完了 / Ready';return
 }
 $mutexName='Local\SuperFURU-Manga-Install-'+([BitConverter]::ToString([Security.Cryptography.SHA256]::Create().ComputeHash([Text.Encoding]::UTF8.GetBytes($root.ToLowerInvariant()))).Replace('-',''))
 $mutex=New-Object Threading.Mutex($false,$mutexName);$held=$false
 try{
  Write-MangaStatus '起動・更新の準備中。別の起動処理があれば待ちます / Preparing startup; waiting for another launcher if necessary'
  try{$held=$mutex.WaitOne(30000)}catch [Threading.AbandonedMutexException]{$held=$true}
  if(-not $held){throw 'Another launcher is preparing this installation.'}
  # A concurrent launcher may have started the service while this caller waited.
  # Recheck under the installer lock before querying/downloading a newer release.
  $live=Read-LiveService $ws
  if($live){
   Write-MangaStatus '起動済みのアプリを利用します / Reusing the running app'
   Sync-MangaClientSkill (Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion)) $root ''
   if($Stdio){$node=Get-NodeExecutable $root;$version=Join-Path (Join-Path $root 'versions') ('v'+$live.appVersion);$null=Read-VerifiedInstall $version -MetadataOnly;& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
   if(-not $NoOpen){Write-MangaStatus 'ブラウザーを開いています / Opening the browser';Start-Process ($live.origin+'/nano-banana-pro/')};Write-MangaStatus '起動完了 / Ready';return
  }
  if($Stdio -and -not ($Update -or $InstallOnly)){
   Write-MangaStatus '導入済みのアプリを確認中 / Checking the installed app'
   $version=Find-VerifiedMangaInstall $root
   if(-not $version){throw 'Install the official app with Launch-Manga.cmd before using its MCP server.'}
   $node=Get-NodeExecutable $root
  }else{
   $node=Get-NodeExecutable $root
   try{$version=Install-OfficialRelease $root $node}catch{
    Write-MangaStatus '最新版を準備できませんでした。導入済みの版を確認します / Checking an installed version after update failure'
    $failure=$_
    $version=Find-VerifiedMangaInstall $root
    if(-not $version){throw $failure}
    [Console]::Error.WriteLine('Latest release could not be obtained; using a previously installed release.')
   }
  }
  $launcherRoot=Join-Path $root 'launcher';New-Item -ItemType Directory -Path $launcherRoot -Force|Out-Null
  $verifiedSkill=Join-Path $version 'mcp/skills/manga-book-production'
  Sync-MangaLauncher $verifiedSkill $launcherRoot
  Sync-MangaClientSkill $version $root $node
  if(-not $NoShortcut){Set-OwnedShortcut (Join-Path $launcherRoot 'Launch-Manga.cmd')}
  if($InstallOnly){Write-MangaStatus 'インストール完了 / Installation complete';return}
  $live=Read-LiveService $ws
  if(-not $live){
   Write-MangaStatus 'アプリを起動中 / Starting the local app'
   $arguments=@(('"'+(Join-Path $version 'mcp/src/service.mjs')+'"'),'--workspace',('"'+$ws+'"'),'--port',[string]$Port,'--client-skill-checked')
   Start-Process -FilePath $node -ArgumentList $arguments -WindowStyle Hidden -RedirectStandardOutput (Join-Path $root 'service.stdout.log') -RedirectStandardError (Join-Path $root 'service.stderr.log')|Out-Null
   for($i=0;$i -lt 40 -and -not $live;$i++){Start-Sleep -Milliseconds 250;$live=Read-LiveService $ws;if(-not $live -and $i%8 -eq 7){Write-MangaStatus 'アプリの応答を待っています / Waiting for the app to respond'}}
   if(-not $live){throw 'The local service did not become healthy. Inspect service.stderr.log; no generation was submitted.'}
  }
 }finally{if($held){$mutex.ReleaseMutex()};$mutex.Dispose()}
 if($Stdio){& $node (Join-Path $version 'mcp/src/http-stdio-adapter.mjs') --workspace $ws;return}
 if(-not $NoOpen){Write-MangaStatus 'ブラウザーを開いています / Opening the browser';Start-Process ($live.origin+'/nano-banana-pro/')}
 Write-MangaStatus '起動完了 / Ready'
}
function Sync-MangaLauncher([string]$VerifiedSkill,[string]$LauncherRoot){
 $sourceBootstrap=Join-Path $VerifiedSkill 'bootstrap.ps1';$targetBootstrap=Join-Path $LauncherRoot 'bootstrap.ps1'
 Assert-PlainPath $sourceBootstrap;Assert-PlainPath $targetBootstrap
 $incoming=0;$existing=0
 $pattern='(?m)^\$script:LauncherRevision=(\d+)\s*$'
 if((Get-Content -LiteralPath $sourceBootstrap -Raw -Encoding UTF8) -match $pattern){$incoming=[int]$Matches[1]}
 if((Test-Path -LiteralPath $targetBootstrap) -and (Get-Content -LiteralPath $targetBootstrap -Raw -Encoding UTF8) -match $pattern){$existing=[int]$Matches[1]}
 # A locally repaired launcher must not be downgraded by an older verified app.
 if($existing -gt $incoming){Write-MangaStatus '新しい起動ランチャーを保持します / Keeping the newer launcher';return}
 foreach($name in @('bootstrap.ps1','Launch-Manga.cmd')){$source=Join-Path $VerifiedSkill $name;$target=Join-Path $LauncherRoot $name;Assert-PlainPath $source;Assert-PlainPath $target;if((Get-CanonicalPath $source) -ne (Get-CanonicalPath $target)){Copy-Item -LiteralPath $source -Destination $target -Force}}
}
if(-not $LibraryOnly){
 try{Start-MangaLauncher}catch{
  Write-MangaStatus ('起動できませんでした / Startup failed: '+$_.Exception.Message)
  if(-not $Stdio -and -not $NoOpen -and -not $InstallOnly -and -not $StopOnly -and -not [Console]::IsInputRedirected){
   [Console]::Error.WriteLine('この内容を確認してください。Enterキーで閉じます / Press Enter to close.')
   $null=[Console]::ReadLine()
  }
  exit 1
 }
}
