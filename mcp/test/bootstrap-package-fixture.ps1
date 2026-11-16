param([Parameter(Mandatory=$true)][string]$Archive,[Parameter(Mandatory=$true)][string]$TestRoot,[int]$FixturePort=50386)
$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot '../skills/manga-book-production/bootstrap.ps1') -LibraryOnly
if(Get-NetTCPConnection -State Listen -LocalPort $FixturePort -ErrorAction SilentlyContinue){throw 'Fixture port is already occupied'}
$script:FixtureArchive=[IO.Path]::GetFullPath($Archive)
$script:InstallRoot=Join-Path ([IO.Path]::GetFullPath($TestRoot)) ('bootstrap-package-'+[Guid]::NewGuid())
$script:Workspace=Join-Path $script:InstallRoot 'workspace';$script:Port=$FixturePort;$script:NoOpen=$true;$script:NoShortcut=$true
function Invoke-RestMethod {
 param([string]$Uri,$Headers,[string]$Method='Get',[int]$TimeoutSec=30)
 if($Uri -like 'https://api.github.com/repos/*/releases/latest'){
  return [pscustomobject]@{draft=$false;prerelease=$false;tag_name='v8.0.0';assets=@([pscustomobject]@{name=$script:AssetName;digest=('sha256:'+(Get-FileHash -LiteralPath $script:FixtureArchive -Algorithm SHA256).Hash.ToLowerInvariant());browser_download_url=('https://github.com/'+$script:Repository+'/releases/download/v8.0.0/'+$script:AssetName)})}
 }
 if($Uri -notlike ('http://127.0.0.1:'+$FixturePort+'/*')){throw 'Unexpected fixture endpoint'}
 return Microsoft.PowerShell.Utility\Invoke-RestMethod -Uri $Uri -Headers $Headers -Method $Method -TimeoutSec $TimeoutSec
}
function Invoke-WebRequest {param([string]$Uri,[string]$OutFile,[switch]$UseBasicParsing);Copy-Item -LiteralPath $script:FixtureArchive -Destination $OutFile}
$live=$null
try{
 Start-MangaLauncher
 $live=Read-LiveService $script:Workspace;if(-not $live){throw 'Installed real service is not healthy'}
 $page=Microsoft.PowerShell.Utility\Invoke-WebRequest -Uri ($live.origin+'/nano-banana-pro/') -UseBasicParsing
 if($page.StatusCode -ne 200){throw 'Installed app page failed'}
 $before=$live.instanceId;Start-MangaLauncher;$after=Read-LiveService $script:Workspace
 if($after.instanceId -ne $before){throw 'Second launch replaced the active service'}
 # Reuse the normal installed official-SDK stdio adapter; no provider/API keys.
 $node=(Get-Command node.exe).Source
 $version=Join-Path $script:InstallRoot 'versions/v8.0.0'
 $client="import {Client} from '@modelcontextprotocol/client';import {StdioClientTransport} from '@modelcontextprotocol/client/stdio';const c=new Client({name:'installed-launcher-proof',version:'1'});try{await c.connect(new StdioClientTransport({command:process.execPath,args:['./mcp/src/http-stdio-adapter.mjs','--workspace',process.argv[1]],stderr:'inherit'}));const t=await c.listTools();if(!t.tools.some(x=>x.name==='manga_project_create'))throw Error('Missing tool');console.log('INSTALLED_SDK_TOOLS_VERIFIED '+t.tools.length)}finally{await c.close()}"
 Push-Location (Join-Path $version 'mcp')
 try{& $node --input-type=module -e ($client.Replace("'./mcp/src/http-stdio-adapter.mjs'","'./src/http-stdio-adapter.mjs'")) $script:Workspace;if($LASTEXITCODE -ne 0){throw 'Installed SDK failed'}}finally{Pop-Location}
 Write-Output ('BOOTSTRAP_PACKAGE_VERIFIED real-install/app200/health/SDK-list/active-instance-preserved root='+$script:InstallRoot)
}finally{
 if($live){$null=Invoke-RestMethod -Uri ($live.origin+'/service/stop') -Headers @{Authorization=('Bearer '+$live.token)} -Method Post -TimeoutSec 5}
}
