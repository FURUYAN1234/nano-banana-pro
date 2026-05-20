# fix_extensions.ps1
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=== Antigravity Extension Path and JSON Fixer ==="

# 1. Stop Antigravity processes
Write-Host "Stopping Antigravity processes..."
$proc = Get-Process -Name Antigravity -ErrorAction SilentlyContinue
if ($proc) {
    Stop-Process -Name Antigravity -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Define Paths
$vscodeDir = "C:\Users\sx717\.vscode\extensions"
$antigravityDir = "C:\Users\sx717\.antigravity\extensions"

$vscodeJson = Join-Path $vscodeDir "extensions.json"
$antigravityJson = Join-Path $antigravityDir "extensions.json"

# Helper function to fix extensions.json content and paths
function Fix-ExtensionsJson {
    param (
        [string]$Path,
        [string]$TargetDirName # "vscode" or "antigravity"
    )
    if (-not (Test-Path $Path)) {
        Write-Host "File not found: $Path"
        return
    }
    
    Write-Host "Fixing $Path..."
    # Backup
    Copy-Item $Path "$Path.bak_fix" -Force
    
    $raw = Get-Content $Path -Raw -Encoding UTF8
    $json = $raw | ConvertFrom-Json
    
    # Extract value if it is wrapped in {"value": ..., "Count": ...}
    if ($json -is [PSCustomObject] -and $json.value -ne $null) {
        Write-Host "Extracted array from wrapped JSON object."
        $array = $json.value
    } else {
        $array = $json
    }
    
    # Ensure it is an array
    if ($array -eq $null) {
        Write-Host "Error: No extension data found in $Path"
        return
    }
    
    # Process paths
    foreach ($item in $array) {
        if ($item.location -ne $null) {
            $loc = $item.location
            
            # Target path replacement
            if ($TargetDirName -eq "vscode") {
                if ($loc.path -ne $null) {
                    $loc.path = $loc.path -replace "/.antigravity/extensions/", "/.vscode/extensions/"
                }
                if ($loc.fsPath -ne $null) {
                    $loc.fsPath = $loc.fsPath -replace "\\\\.antigravity\\\\extensions\\\\", "\\\\.vscode\\\\extensions\\\\"
                }
                if ($loc.external -ne $null) {
                    $loc.external = $loc.external -replace "/.antigravity/extensions/", "/.vscode/extensions/"
                }
            } else {
                if ($loc.path -ne $null) {
                    $loc.path = $loc.path -replace "/.vscode/extensions/", "/.antigravity/extensions/"
                }
                if ($loc.fsPath -ne $null) {
                    $loc.fsPath = $loc.fsPath -replace "\\\\.vscode\\\\extensions\\\\", "\\\\.antigravity\\\\extensions\\\\"
                }
                if ($loc.external -ne $null) {
                    $loc.external = $loc.external -replace "/.vscode/extensions/", "/.antigravity/extensions/"
                }
            }
        }
    }
    
    # Serialize back as array
    $newRaw = $array | ConvertTo-Json -Depth 100
    [System.IO.File]::WriteAllText($Path, $newRaw, [System.Text.Encoding]::UTF8)
    Write-Host "Successfully fixed and saved $Path"
}

# Fix VS Code extensions.json
Fix-ExtensionsJson -Path $vscodeJson -TargetDirName "vscode"

# Fix Antigravity extensions.json
Fix-ExtensionsJson -Path $antigravityJson -TargetDirName "antigravity"

# Copy directories to ensure sync (both have 46 extensions)
Write-Host "Syncing extension folders..."
robocopy $antigravityDir $vscodeDir /E /XD "anthropic.claude-code-*" /NFL /NDL /NJH /NJS /nc /ns /np /R:1 /W:1 | Out-Null
robocopy $vscodeDir $antigravityDir /E /XD "anthropic.claude-code-*" /NFL /NDL /NJH /NJS /nc /ns /np /R:1 /W:1 | Out-Null

# 2. Clear App Data Cache
Write-Host "Clearing Antigravity AppData Cache..."
$cacheDirs = @(
    "$env:APPDATA\Antigravity\Cache",
    "$env:APPDATA\Antigravity\CachedData",
    "$env:APPDATA\Antigravity\CachedExtensions",
    "$env:APPDATA\Antigravity\Local Storage"
)

foreach ($dir in $cacheDirs) {
    if (Test-Path $dir) {
        Write-Host "Deleting cache directory: $dir"
        Remove-Item -Recurse -Force $dir -ErrorAction SilentlyContinue
    }
}

Write-Host "=== Fix Complete ==="
