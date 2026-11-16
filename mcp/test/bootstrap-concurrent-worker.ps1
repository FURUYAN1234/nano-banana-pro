param($Bootstrap,$Root)
. $Bootstrap -LibraryOnly
$script:InstallRoot=$Root;$script:Workspace=Join-Path $Root 'workspace';$script:NoOpen=$true;$script:NoShortcut=$true
function Get-NodeExecutable {return 'fixture-node'}
function Read-LiveService {param($Root);if(Test-Path -LiteralPath (Join-Path $Root 'fixture-live')){return [pscustomobject]@{origin='http://127.0.0.1:1';appVersion='8.0.0'}};return $null}
function Install-OfficialRelease {param($Root,$Node);Add-Content -LiteralPath (Join-Path $Root 'installs.txt') -Value 'install';Start-Sleep -Milliseconds 700;$v=Join-Path $Root 'versions/v8.0.0';New-Item -ItemType Directory -Path (Join-Path $v 'mcp/skills/manga-book-production') -Force|Out-Null;foreach($name in @('bootstrap.ps1','Launch-Manga.cmd')){Copy-Item -LiteralPath (Join-Path (Split-Path $Bootstrap) $name) -Destination (Join-Path $v ('mcp/skills/manga-book-production/'+$name))};return $v}
function Start-Process {param($FilePath,$ArgumentList,$WindowStyle,$RedirectStandardOutput,$RedirectStandardError);New-Item -ItemType File -Path (Join-Path $script:Workspace 'fixture-live') -Force|Out-Null;Add-Content -LiteralPath (Join-Path $script:InstallRoot 'starts.txt') -Value 'start'}
Start-MangaLauncher
