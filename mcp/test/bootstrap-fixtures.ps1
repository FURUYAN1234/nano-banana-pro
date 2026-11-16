param([Parameter(Mandatory=$true)][string]$TestRoot)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot '../skills/manga-book-production/bootstrap.ps1') -LibraryOnly
$root=Join-Path ([IO.Path]::GetFullPath($TestRoot)) ('bootstrap-'+[Guid]::NewGuid())
New-Item -ItemType Directory -Path $root|Out-Null
function Require-Rejection([scriptblock]$Action){$rejected=$false;try{& $Action}catch{$rejected=$true};if(-not $rejected){throw 'Expected rejection was missing.'}}
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression
$archive=Join-Path $root 'normal.zip'
$zip=[IO.Compression.ZipFile]::Open($archive,[IO.Compression.ZipArchiveMode]::Create)
try{$entry=$zip.CreateEntry('folder/data.txt');$writer=New-Object IO.StreamWriter($entry.Open());$writer.Write('Exact content');$writer.Dispose()}finally{$zip.Dispose()}
$destination=Join-Path $root 'normal'
Expand-VerifiedArchive $archive $destination
if([IO.File]::ReadAllText((Join-Path $destination 'folder/data.txt')) -ne 'Exact content'){throw 'Archive content changed.'}
Require-Rejection {Expand-VerifiedArchive $archive $destination}
$bad=Join-Path $root 'traversal.zip'
$zip=[IO.Compression.ZipFile]::Open($bad,[IO.Compression.ZipArchiveMode]::Create)
try{$null=$zip.CreateEntry('../escaped.txt')}finally{$zip.Dispose()}
Require-Rejection {Expand-VerifiedArchive $bad (Join-Path $root 'bad')}
$ads=Join-Path $root 'alternate-stream.zip'
$zip=[IO.Compression.ZipFile]::Open($ads,[IO.Compression.ZipArchiveMode]::Create)
try{$null=$zip.CreateEntry('folder/file.txt:hidden')}finally{$zip.Dispose()}
Require-Rejection {Expand-VerifiedArchive $ads (Join-Path $root 'alternate-stream')}
if(Test-Path -LiteralPath (Join-Path $root 'escaped.txt')){throw 'Archive escaped its directory.'}
$install=Join-Path $root 'install';New-Item -ItemType Directory -Path $install|Out-Null
$package=Join-Path $install 'package.json';[IO.File]::WriteAllText($package,'{"version":"8.0.0"}')
$map=@{'package.json'=(Get-FileHash -LiteralPath $package -Algorithm SHA256).Hash.ToLowerInvariant()}
foreach($name in @('mcp/src/service.mjs','mcp/src/http-stdio-adapter.mjs','dist/index.html')){$file=Join-Path $install $name;New-Item -ItemType Directory -Path (Split-Path $file) -Force|Out-Null;[IO.File]::WriteAllText($file,'fixture');$map[$name]=(Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()}
@{repository='FURUYAN1234/nano-banana-pro';tag='v8.0.0';files=$map}|ConvertTo-Json -Depth 4|Set-Content -LiteralPath (Join-Path $install 'verified-install.json') -Encoding utf8
if(-not(Read-VerifiedInstall $install)){throw 'Verified fixture was not recognized.'}
[IO.File]::AppendAllText($package,' ')
Require-Rejection {Read-VerifiedInstall $install}
Require-Rejection {Assert-Contained $root (Join-Path $root '../outside')}
$script:FixtureDesktop=Join-Path $root 'Desktop';New-Item -ItemType Directory -Path $script:FixtureDesktop|Out-Null
function Get-MangaDesktopDirectory {$script:FixtureDesktop}
$launcher=Join-Path $root 'Launch-Manga.cmd';[IO.File]::WriteAllText($launcher,'@echo off')
Set-OwnedShortcut $launcher;Set-OwnedShortcut $launcher
$shortcut=Join-Path $script:FixtureDesktop 'Super FURU Manga MCP.lnk'
if(@(Get-ChildItem -LiteralPath $script:FixtureDesktop -File).Count -ne 1){throw 'Managed shortcut duplicated.'}
$shell=New-Object -ComObject WScript.Shell;$link=$shell.CreateShortcut($shortcut)
if($link.TargetPath -ne $launcher){throw 'Shortcut target is not the stable launcher.'}
$link.Description='User-owned unrelated shortcut';$link.Save();$hash=(Get-FileHash -LiteralPath $shortcut -Algorithm SHA256).Hash
Set-OwnedShortcut (Join-Path $root 'different.cmd')
if((Get-FileHash -LiteralPath $shortcut -Algorithm SHA256).Hash -ne $hash){throw 'Unrelated shortcut was changed.'}
Write-Output 'BOOTSTRAP_FIXTURES_VERIFIED archive/duplicate/traversal/content-change/path'
