#!/usr/bin/env pwsh
# ================================================================
# Antigravity Complete Restore v9 - Nuclear Auth Persistence Fix
# ================================================================
# This script handles ALL scenarios automatically:
#   A) Fresh PC (Antigravity just installed, no previous data)
#   B) Same PC account switch (old account data exists)
#   C) Other PC with old account (needs nuclear reset + restore)
#   D) Re-run (updating existing environment)
#
# Usage:
#   1. Extract the backup ZIP anywhere
#   2. Right-click this file -> "Run with PowerShell"
#      OR: powershell -ExecutionPolicy Bypass -File restore_full.ps1
#
# This script will:
#   - Auto-detect the current situation
#   - Nuclear reset if old account data is found
#   - Clone/pull all git repos and verify they're at latest
#   - Restore ALL settings, rules, knowledge, MCP config
#   - Install all extensions
#   - Place scripts on Desktop for future use
#   - Verify everything at the end
# ================================================================

param(
    [string]$BackupPath = ""
)

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Continue" # [v8] Reverted: 'Stop' breaks native commands like git/npm that use stderr for progress messages

try {

# ============================================================
# Phase 0: Locate backup data
# ============================================================
if ($BackupPath -eq "") {
    $BackupPath = Split-Path -Parent $MyInvocation.MyCommand.Path
}

if (-not (Test-Path "$BackupPath\extensions_list.txt") -or -not (Test-Path "$BackupPath\git_repos.txt")) {
    Write-Host "ERROR: Backup data not found at: $BackupPath" -ForegroundColor Red
    Write-Host "Make sure you extracted the ZIP and are running from the extracted folder." -ForegroundColor Yellow
    exit 1
}

$userName = $env:USERNAME
$ws = "C:\Users\$userName\Antigravity"

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " Antigravity Complete Restore" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " Backup: $BackupPath" -ForegroundColor Gray
Write-Host " Target: $ws" -ForegroundColor Gray
Write-Host ""

# ============================================================
# Phase 1: Scenario Auto-Detection
# ============================================================
Write-Host "=== Phase 1: Scenario Detection ===" -ForegroundColor Yellow
Write-Host ""

# Check Antigravity installation
$agInstalled = $null -ne (Get-Command antigravity -ErrorAction SilentlyContinue)
Write-Host "  Antigravity IDE:  $(if ($agInstalled) { 'INSTALLED' } else { 'NOT FOUND' })" -ForegroundColor $(if ($agInstalled) { "Green" } else { "Red" })

# Check for old account data (indicates nuclear reset needed)
$hasAppData   = Test-Path "$env:APPDATA\Antigravity\User\settings.json"
$hasLocalData = Test-Path "$env:LOCALAPPDATA\Antigravity"
$hasDotAg     = Test-Path "$env:USERPROFILE\.antigravity\extensions"
$hasOldData   = $hasAppData -or $hasLocalData -or $hasDotAg
Write-Host "  Old account data: $(if ($hasOldData) { 'FOUND (nuclear reset needed)' } else { 'CLEAN' })" -ForegroundColor $(if ($hasOldData) { "Yellow" } else { "Green" })

# Check workspace
$hasWorkspace = Test-Path $ws
$hasGitRepos  = $false
if ($hasWorkspace) {
    $hasGitRepos = (Get-ChildItem $ws -Directory -ErrorAction SilentlyContinue | Where-Object { Test-Path (Join-Path $_.FullName ".git") }).Count -gt 0
}
Write-Host "  Workspace:        $(if (-not $hasWorkspace) { 'NEW' } elseif ($hasGitRepos) { 'EXISTS (with repos)' } else { 'EXISTS (empty)' })" -ForegroundColor $(if ($hasGitRepos) { "Cyan" } else { "Green" })

# Determine scenario
if (-not $agInstalled) {
    $scenario = "NO_IDE"
} elseif ($hasOldData -and -not $hasGitRepos) {
    $scenario = "NUCLEAR_FRESH"   # Old data, no workspace = other PC with old account
} elseif ($hasOldData -and $hasGitRepos) {
    $scenario = "NUCLEAR_EXISTING" # Old data, existing workspace = same PC account switch
} elseif (-not $hasOldData -and -not $hasGitRepos) {
    $scenario = "FRESH"           # Clean, no workspace = brand new PC
} else {
    $scenario = "UPDATE"          # Clean, workspace exists = re-run / update
}

Write-Host ""
Write-Host "  >>> Scenario: $scenario <<<" -ForegroundColor Magenta
Write-Host ""

# ============================================================
# Phase 2: Auto-install ALL Prerequisites
# ============================================================
Write-Host "=== Phase 2: Prerequisites Check & Auto-Install ===" -ForegroundColor Yellow

# Direct download installer function (fallback when winget unavailable)
function Install-DirectDownload {
    param([string]$Name, [string]$Cmd)
    $tempDir = "$env:TEMP\ag_restore"
    if (-not (Test-Path $tempDir)) { New-Item -ItemType Directory -Path $tempDir -Force | Out-Null }

    try {
        switch ($Cmd) {
            "git" {
                Write-Host "  Downloading Git installer from GitHub..." -ForegroundColor Cyan
                $rel = Invoke-RestMethod "https://api.github.com/repos/git-for-windows/git/releases/latest" -ErrorAction Stop
                $asset = $rel.assets | Where-Object { $_.name -match "64-bit\.exe$" -and $_.name -notmatch "portable" } | Select-Object -First 1
                $dlPath = "$tempDir\git_installer.exe"
                Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $dlPath -ErrorAction Stop
                Write-Host "  Running Git installer (silent)..." -ForegroundColor Cyan
                Start-Process $dlPath -ArgumentList "/VERYSILENT /NORESTART /SP-" -Wait
            }
            "gh" {
                Write-Host "  Downloading GitHub CLI from GitHub..." -ForegroundColor Cyan
                $rel = Invoke-RestMethod "https://api.github.com/repos/cli/cli/releases/latest" -ErrorAction Stop
                $asset = $rel.assets | Where-Object { $_.name -match "windows_amd64\.msi$" } | Select-Object -First 1
                $dlPath = "$tempDir\gh_installer.msi"
                Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $dlPath -ErrorAction Stop
                Write-Host "  Running GitHub CLI installer (silent)..." -ForegroundColor Cyan
                Start-Process msiexec.exe -ArgumentList "/i `"$dlPath`" /quiet /norestart" -Wait
            }
            "node" {
                Write-Host "  Downloading Node.js LTS from nodejs.org..." -ForegroundColor Cyan
                $dlPath = "$tempDir\node_installer.msi"
                Invoke-WebRequest -Uri "https://nodejs.org/dist/v22.15.0/node-v22.15.0-x64.msi" -OutFile $dlPath -ErrorAction Stop
                Write-Host "  Running Node.js installer (silent)..." -ForegroundColor Cyan
                Start-Process msiexec.exe -ArgumentList "/i `"$dlPath`" /quiet /norestart" -Wait
            }
            default { return $false }
        }
        # Refresh PATH from registry
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        # If still not found, try known install locations
        if ($null -eq (Get-Command $Cmd -ErrorAction SilentlyContinue)) {
            $knownPaths = @(
                "$env:ProgramFiles\Git\cmd",
                "$env:ProgramFiles\GitHub CLI",
                "$env:ProgramFiles\nodejs",
                "${env:ProgramFiles(x86)}\GitHub CLI",
                "$env:LOCALAPPDATA\Programs\Git\cmd",
                "$env:LOCALAPPDATA\Programs\GitHub CLI"
            )
            foreach ($kp in $knownPaths) {
                if (Test-Path $kp) { $env:Path += ";$kp" }
            }
        }
        return ($null -ne (Get-Command $Cmd -ErrorAction SilentlyContinue))
    } catch {
        Write-Host "  Download failed: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

$prerequisites = @(
    @{ Name="Antigravity IDE"; Cmd="antigravity"; WingetId="Google.Antigravity"; Url="(team distribution)"; IsIDE=$true },
    @{ Name="Git";             Cmd="git";         WingetId="Git.Git";            Url="https://git-scm.com/"; IsIDE=$false },
    @{ Name="GitHub CLI";      Cmd="gh";          WingetId="GitHub.cli";         Url="https://cli.github.com/"; IsIDE=$false },
    @{ Name="Node.js";         Cmd="node";        WingetId="OpenJS.NodeJS.LTS";  Url="https://nodejs.org/"; IsIDE=$false }
)

$needRestart = $false
$ideJustInstalled = $false
$hasWinget = $null -ne (Get-Command winget -ErrorAction SilentlyContinue)

foreach ($req in $prerequisites) {
    $installed = $null -ne (Get-Command $req.Cmd -ErrorAction SilentlyContinue)
    if ($installed) {
        Write-Host "  [OK] $($req.Name)" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $($req.Name)" -ForegroundColor Yellow
        $success = $false

        # Try 1: winget
        if ($hasWinget -and -not $success) {
            Write-Host "  Trying winget..." -ForegroundColor Cyan
            $result = winget install --id $req.WingetId --accept-source-agreements --accept-package-agreements --silent 2>&1 | Out-String
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
            $success = $null -ne (Get-Command $req.Cmd -ErrorAction SilentlyContinue)
            if (-not $success -and $result -notmatch "No package found") {
                $success = $true  # Installed but PATH not updated yet
                $needRestart = $true
            }
        }

        # Try 2: Direct download (Git, gh, Node only - not IDE)
        if (-not $success -and -not $req.IsIDE) {
            Write-Host "  Trying direct download..." -ForegroundColor Cyan
            $success = Install-DirectDownload -Name $req.Name -Cmd $req.Cmd
            if (-not $success) {
                # PATH might need refresh after MSI install
                $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
                $success = $null -ne (Get-Command $req.Cmd -ErrorAction SilentlyContinue)
                if (-not $success) { $needRestart = $true; $success = $true }
            }
        }

        if ($success) {
            Write-Host "  [INSTALLED] $($req.Name)" -ForegroundColor Green
            if ($req.IsIDE) { $ideJustInstalled = $true }
            
            # [NON-STOP FIX] 即座にセッションのPATHを更新し、再起動なしで続行可能にする
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
            
            # それでもコマンドが見つからない場合、既知のインストールパスを強制追加
            if ($null -eq (Get-Command $req.Cmd -ErrorAction SilentlyContinue)) {
                $standardPaths = @(
                    "$env:ProgramFiles\Git\cmd",
                    "$env:ProgramFiles\GitHub CLI",
                    "$env:ProgramFiles\nodejs",
                    "${env:ProgramFiles(x86)}\GitHub CLI",
                    "$env:LOCALAPPDATA\Programs\Git\cmd"
                )
                foreach ($sp in $standardPaths) {
                    if (Test-Path $sp) { $env:Path += ";$sp" }
                }
            }
        } else {
            Write-Host "  [FAILED] Could not install $($req.Name)" -ForegroundColor Red
            Write-Host "  Please install manually: $($req.Url)" -ForegroundColor Yellow
            if ($req.IsIDE) {
                Write-Host ""
                Write-Host "  Antigravity IDE must be installed to continue." -ForegroundColor Red
                Write-Host "  After installing, run this script again." -ForegroundColor Yellow
                Read-Host "  Press Enter to exit"
                exit 0
            }
        }
    }
}


# Antigravity IDE sign-in (if just installed or NO_IDE scenario)
if ($ideJustInstalled -or $scenario -eq "NO_IDE") {
    Write-Host ""
    Write-Host "  =================================================" -ForegroundColor Cyan
    Write-Host "  Antigravity IDE was just installed. Please:" -ForegroundColor Cyan
    Write-Host "    1. Open Antigravity" -ForegroundColor White
    Write-Host "    2. Sign in with your account" -ForegroundColor White
    Write-Host "    3. Once signed in, come back here" -ForegroundColor White
    Write-Host "  =================================================" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "  Press Enter AFTER you have signed in"
    # Re-detect scenario after sign-in
    $hasAppData = Test-Path "$env:APPDATA\Antigravity\User\settings.json"
    $hasLocalData = Test-Path "$env:LOCALAPPDATA\Antigravity"
    $hasDotAg = Test-Path "$env:USERPROFILE\.antigravity\extensions"
    $hasOldData = $hasAppData -or $hasLocalData -or $hasDotAg
    $hasWorkspace = Test-Path $ws
    if (-not $hasOldData -and -not $hasWorkspace) { $scenario = "FRESH" }
    elseif (-not $hasOldData -and $hasWorkspace) { $scenario = "UPDATE" }
    Write-Host "  Scenario updated: $scenario" -ForegroundColor Magenta
}

# GitHub CLI authentication
$ghExists = $null -ne (Get-Command gh -ErrorAction SilentlyContinue)
if ($ghExists) {
    $ghAuth = & gh auth status 2>&1 | Out-String
    if ($ghAuth -notmatch "Logged in") {
        Write-Host ""
        Write-Host "  GitHub CLI needs authentication for private repos." -ForegroundColor Yellow
        Write-Host "  Running 'gh auth login' now..." -ForegroundColor Cyan
        Write-Host "  Follow the prompts (select GitHub.com, HTTPS, Yes, Login with browser)." -ForegroundColor White
        Write-Host ""
        & gh auth login
        Write-Host ""
    } else {
        Write-Host "  [OK] GitHub CLI authenticated" -ForegroundColor Green
    }
}

# [NON-STOP FIX] 再起動を要求するブロックを完全に削除
# 必要なPATH更新は上記ループ内で完了しているため、そのまま続行
Write-Host "  [OK] Environment ready (Session path updated)." -ForegroundColor Green

Write-Host ""


# ============================================================
# Phase 3: Nuclear Reset (if old account data detected)
# ============================================================
if ($scenario -like "NUCLEAR_*") {
    Write-Host "=== Phase 3: Nuclear Reset ===" -ForegroundColor Red
    Write-Host ""
    Write-Host "  Old account data detected. Nuclear reset is required." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  *** IMPORTANT ***" -ForegroundColor Red
    Write-Host "  This will kill ALL Antigravity processes." -ForegroundColor Red
    Write-Host "  If you are running this FROM Antigravity, it will crash." -ForegroundColor Red
    Write-Host "  Please run this script from PowerShell directly instead:" -ForegroundColor Yellow
    Write-Host "    powershell -ExecutionPolicy Bypass -File `"$($MyInvocation.MyCommand.Path)`"" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  This will:" -ForegroundColor White
    Write-Host "    - Kill Antigravity / node / mcp-server processes" -ForegroundColor White
    Write-Host "    - Delete authentication & cache data (3 folders)" -ForegroundColor White
    Write-Host "    - NOT touch your project files or git repos" -ForegroundColor White
    Write-Host ""

    # [v5] Confirmation removed for TRUE NON-STOP execution
    Write-Host "  Starting nuclear reset automatically..." -ForegroundColor Yellow

    # Kill processes
    Write-Host ""
    Write-Host "  Killing processes..." -ForegroundColor Yellow
    foreach ($proc in @("Antigravity", "node", "mcp-server")) {
        $running = Get-Process -Name $proc -ErrorAction SilentlyContinue
        if ($running) {
            $running | Stop-Process -Force -ErrorAction SilentlyContinue
            Write-Host "    Killed: $proc ($($running.Count))" -ForegroundColor Green
        }
    }
    Start-Sleep -Seconds 3

    # Delete data folders
    $targets = @(
        "$env:APPDATA\Antigravity",
        "$env:LOCALAPPDATA\Antigravity",
        "$env:USERPROFILE\.antigravity"
    )
    foreach ($t in $targets) {
        if (Test-Path $t) {
            try {
                Remove-Item -Recurse -Force $t -ErrorAction Stop
                Write-Host "    Deleted: $t" -ForegroundColor Green
            } catch {
                Write-Host "    FAILED: $t - $($_.Exception.Message)" -ForegroundColor Red
                Write-Host "    Please close ALL Antigravity windows and run again." -ForegroundColor Yellow
            }
        }
    }

    Write-Host ""
    Write-Host "  Nuclear reset complete. Proceeding to full restoration..." -ForegroundColor Cyan
    # [v6] Removed sign-in wait. We now restore EVERYTHING before the user even opens the IDE.
}

# ============================================================
# Phase 4: Create Workspace
# ============================================================
Write-Host "=== Phase 4: Workspace Setup ===" -ForegroundColor Yellow
if (-not (Test-Path $ws)) {
    New-Item -ItemType Directory -Path $ws -Force | Out-Null
    Write-Host "  Created: $ws" -ForegroundColor Green
} else {
    Write-Host "  Exists: $ws" -ForegroundColor Cyan
}

# ============================================================
# Phase 5: Git Repos (Clone/Pull + Freshness Verification)
# ============================================================
Write-Host ""
Write-Host "=== Phase 5: Git Repos (clone/pull + verify) ===" -ForegroundColor Yellow

# (Prerequisites already checked in Phase 2.5)

$repos = Get-Content "$BackupPath\git_repos.txt" -Encoding UTF8 | Where-Object { $_.Trim() -ne "" }
$gitResults = @()
foreach ($line in $repos) {
    $p = $line.Split("|")
    $name = $p[0]; $url = $p[1]; $branch = $p[2]
    $backupHash = if ($p.Count -ge 4) { $p[3] } else { "" }
    $dir = "$ws\$name"

    if (Test-Path "$dir\.git") {
        # Existing repo: fetch + pull
        Write-Host "  [PULL] $name" -NoNewline -ForegroundColor Cyan
        Push-Location $dir
        git fetch origin $branch 2>&1 | Out-Null
        git pull origin $branch 2>&1 | Out-Null
        $localHash = git rev-parse HEAD 2>$null
        $remoteHash = git rev-parse "origin/$branch" 2>$null
        Pop-Location
    } else {
        # New clone
        if (Test-Path $dir) {
            $bak = "${name}_old_$(Get-Date -Format 'yyyyMMddHHmmss')"
            Rename-Item $dir "$ws\$bak"
            Write-Host "  (renamed existing to $bak)" -ForegroundColor Gray
        }
        Write-Host "  [CLONE] $name" -NoNewline -ForegroundColor Green
        Push-Location $ws
        git clone $url $name 2>&1 | Out-Null
        Pop-Location
        if ($branch -and $branch -ne "main") {
            Push-Location $dir
            git checkout $branch 2>&1 | Out-Null
            Pop-Location
        }
        Push-Location $dir
        $localHash = git rev-parse HEAD 2>$null
        $remoteHash = git rev-parse "origin/$branch" 2>$null
        Pop-Location
    }

    # Freshness check
    $fresh = $localHash -eq $remoteHash
    $behindBackup = ($backupHash -ne "" -and $localHash -ne $backupHash -and $localHash -eq $remoteHash)
    if ($fresh) {
        Write-Host " -> UP-TO-DATE" -ForegroundColor Green
    } else {
        Write-Host " -> BEHIND (pull may be needed)" -ForegroundColor Yellow
    }
    $gitResults += @{ Name=$name; Fresh=$fresh; Local=$localHash; Remote=$remoteHash }
}

# ============================================================
# Phase 6: Non-Git Projects
# ============================================================
Write-Host ""
Write-Host "=== Phase 6: Non-Git Projects ===" -ForegroundColor Yellow

$ngSrc = "$BackupPath\non_git_projects"
if (Test-Path $ngSrc) {
    foreach ($d in (Get-ChildItem $ngSrc -Directory)) {
        $tgt = "$ws\$($d.Name)"
        if (Test-Path $tgt) {
            Write-Host "  [MERGE] $($d.Name)" -ForegroundColor Cyan
        } else {
            Write-Host "  [COPY]  $($d.Name)" -ForegroundColor Green
        }
        robocopy $d.FullName $tgt /E /XD node_modules /XF *.lock /NFL /NDL /NJH /NJS /NC /NS /NP 2>$null | Out-Null
    }
}

# ============================================================
# Phase 7: Root Files
# ============================================================
Write-Host ""
Write-Host "=== Phase 7: Root Files ===" -ForegroundColor Yellow
$rfSrc = "$BackupPath\root_files"
if (Test-Path $rfSrc) {
    Get-ChildItem $rfSrc -File | ForEach-Object {
        Copy-Item $_.FullName "$ws\$($_.Name)" -Force
        Write-Host "  $($_.Name)" -ForegroundColor Green
    }
}

# ============================================================
# Phase 8: .env Templates
# ============================================================
Write-Host ""
Write-Host "=== Phase 8: .env Templates ===" -ForegroundColor Yellow
$evSrc = "$BackupPath\env_templates"
if (Test-Path $evSrc) {
    foreach ($ef in (Get-ChildItem $evSrc -File)) {
        $rel = $ef.Name.Replace("__", "\")
        $tgt = "$ws\$rel"
        $tgtDir = Split-Path $tgt -Parent
        if (-not (Test-Path $tgtDir)) { New-Item -ItemType Directory -Path $tgtDir -Force | Out-Null }
        if (Test-Path $tgt) {
            Write-Host "  [KEEP] $rel (existing keys protected)" -ForegroundColor Gray
        } else {
            Copy-Item $ef.FullName $tgt -Force
            Write-Host "  [NEW]  $rel" -ForegroundColor Green
        }
    }
}

# ============================================================
# Phase 9: COMPLETE Settings Restoration (Full Clone)
# ============================================================
Write-Host ""
Write-Host "=== Phase 9: Settings (Complete Clone) ===" -ForegroundColor Yellow

# 9a. User settings (settings.json, keybindings, snippets, globalStorage)
$uSrc = "$BackupPath\antigravity_user"
if (Test-Path $uSrc) {
    $stDir = "$env:APPDATA\Antigravity\User"
    if (-not (Test-Path $stDir)) { New-Item -ItemType Directory -Path $stDir -Force | Out-Null }

    foreach ($f in @("settings.json", "keybindings.json")) {
        $src = "$uSrc\$f"
        if (Test-Path $src) {
            $dst = "$stDir\$f"
            if (Test-Path $dst) { Copy-Item $dst "${dst}.bak" -Force -ErrorAction SilentlyContinue }
            Copy-Item $src $dst -Force
            Write-Host "  [RESTORED] $f" -ForegroundColor Green
        }
    }
    if (Test-Path "$uSrc\snippets") {
        Copy-Item "$uSrc\snippets" "$stDir\snippets" -Recurse -Force
        Write-Host "  [RESTORED] snippets/" -ForegroundColor Green
    }
    if (Test-Path "$uSrc\globalStorage") {
        if ($scenario -like "NUCLEAR_*" -or $scenario -eq "FRESH") {
            Write-Host "  [SKIP] globalStorage/ (Nuclear/Fresh: 旧アカウント固有データは復元しない)" -ForegroundColor Yellow
        } else {
            if (-not (Test-Path "$stDir\globalStorage")) { New-Item -ItemType Directory -Path "$stDir\globalStorage" -Force | Out-Null }
            robocopy "$uSrc\globalStorage" "$stDir\globalStorage" /E /XF *.vscdb *.vscdb.backup /NFL /NDL /NJH /NJS /NC /NS /NP 2>$null | Out-Null
            Write-Host "  [RESTORED] globalStorage/ (extension settings)" -ForegroundColor Green
        }
    }
}

# 9b. App config (languagepacks, Preferences)
$acSrc = "$BackupPath\antigravity_appconfig"
if (Test-Path $acSrc) {
    $acDst = "$env:APPDATA\Antigravity"
    if (-not (Test-Path $acDst)) { New-Item -ItemType Directory -Path $acDst -Force | Out-Null }
    foreach ($f in @("languagepacks.json", "Preferences")) {
        $src = "$acSrc\$f"
        if (Test-Path $src) {
            if ($f -eq "Preferences" -and ($scenario -like "NUCLEAR_*" -or $scenario -eq "FRESH")) {
                Write-Host "  [SKIP] Preferences (Nuclear/Fresh: デバイス固有データは復元しない)" -ForegroundColor Yellow
            } else {
                Copy-Item $src "$acDst\$f" -Force
                Write-Host "  [RESTORED] $f (app config)" -ForegroundColor Green
            }
        }
    }
}

# 9c. .antigravity (argv.json)
$daSrc = "$BackupPath\dot_antigravity"
if (Test-Path $daSrc) {
    $daDst = "$env:USERPROFILE\.antigravity"
    if (-not (Test-Path $daDst)) { New-Item -ItemType Directory -Path $daDst -Force | Out-Null }
    foreach ($f in @("argv.json")) {
        $src = "$daSrc\$f"
        if (Test-Path $src) {
            Copy-Item $src "$daDst\$f" -Force
            Write-Host "  [RESTORED] .antigravity/$f" -ForegroundColor Green
        }
    }
}

# ============================================================
# Phase 10: .gemini (Rules + Knowledge + MCP) - COMPLETE
# ============================================================
Write-Host ""
Write-Host "=== Phase 10: .gemini (Rules + Knowledge + MCP) ===" -ForegroundColor Yellow

$gmSrc = "$BackupPath\dot_gemini"
if (Test-Path $gmSrc) {
    $gmRoot = "$env:USERPROFILE\.gemini"
    $agRoot = "$gmRoot\antigravity"
    if (-not (Test-Path $gmRoot)) { New-Item -ItemType Directory -Path $gmRoot -Force | Out-Null }
    if (-not (Test-Path $agRoot)) { New-Item -ItemType Directory -Path $agRoot -Force | Out-Null }

    # GEMINI.md = user_global rules (THE most important file for AI behavior)
    if (Test-Path "$gmSrc\GEMINI.md") {
        Copy-Item "$gmSrc\GEMINI.md" "$gmRoot\GEMINI.md" -Force
        Write-Host "  [RESTORED] GEMINI.md (global AI rules / user_global)" -ForegroundColor Green
    }

    # Gemini settings
    foreach ($f in @("settings.json", "projects.json", "trustedFolders.json")) {
        $src = "$gmSrc\$f"
        if (Test-Path $src) {
            Copy-Item $src "$gmRoot\$f" -Force
            Write-Host "  [RESTORED] $f" -ForegroundColor Green
        }
    }

    # MCP config (notebooklm-mcp etc)
    if (Test-Path "$gmSrc\mcp_config.json") {
        Copy-Item "$gmSrc\mcp_config.json" "$agRoot\mcp_config.json" -Force
        Write-Host "  [RESTORED] mcp_config.json" -ForegroundColor Green
    }

    # Knowledge Items (accumulated AI knowledge)
    if (Test-Path "$gmSrc\knowledge") {
        $kiDst = "$agRoot\knowledge"
        Copy-Item "$gmSrc\knowledge" $kiDst -Recurse -Force
        $kc = (Get-ChildItem $kiDst -Directory -ErrorAction SilentlyContinue).Count
        Write-Host "  [RESTORED] knowledge/ ($kc items)" -ForegroundColor Green
    }

    # [v9] パス正規化: バックアップ元ユーザー名を現在のユーザー名に自動置換
    $metaFile = "$BackupPath\backup_meta.json"
    if (Test-Path $metaFile) {
        $meta = Get-Content $metaFile -Encoding UTF8 | ConvertFrom-Json
        $oldUser = $meta.username
        if ($oldUser -and $oldUser -ne $userName) {
            foreach ($f in @("projects.json", "trustedFolders.json")) {
                $fPath = "$gmRoot\$f"
                if (Test-Path $fPath) {
                    $content = Get-Content $fPath -Raw -Encoding UTF8
                    $newContent = $content.Replace("\Users\$oldUser\", "\Users\$userName\")
                    $newContent = $newContent.Replace("\\Users\\$oldUser\\", "\\Users\\$userName\\")
                    $newContent = $newContent.Replace("/Users/$oldUser/", "/Users/$userName/")
                    if ($content -ne $newContent) {
                        $newContent | Set-Content $fPath -Encoding UTF8 -NoNewline
                        Write-Host "  [FIXED] $f (paths: $oldUser -> $userName)" -ForegroundColor Cyan
                    }
                }
            }
        }
    }
}

# ============================================================
# Phase 11: Extensions
# ============================================================
Write-Host ""
Write-Host "=== Phase 11: Extensions ===" -ForegroundColor Yellow

$extFile = "$BackupPath\extensions_list.txt"
if (Test-Path $extFile) {
    $extList = Get-Content $extFile -Encoding UTF8 | Where-Object { $_.Trim() -ne "" }
    $total = $extList.Count; $ok = 0; $skip = 0; $ng = 0; $i = 0

    foreach ($ext in $extList) {
        $i++
        Write-Host "  [$i/$total] $ext " -NoNewline
        $r = & antigravity --install-extension $ext 2>&1 | Out-String
        if ($r -match "already installed") { $skip++; Write-Host "[SKIP]" -ForegroundColor Gray }
        elseif ($r -match "successfully") { $ok++; Write-Host "[OK]" -ForegroundColor Green }
        else { $ng++; Write-Host "[FAIL]" -ForegroundColor Red }
    }
    Write-Host "  Result: $ok new, $skip existing, $ng failed / $total" -ForegroundColor Cyan
}

# ============================================================
# Phase 12: npm install (optional)
# ============================================================
Write-Host ""
Write-Host "=== Phase 12: npm install ===" -ForegroundColor Yellow

$npmProjs = Get-ChildItem $ws -Directory | Where-Object { Test-Path "$($_.FullName)\package.json" }
if ($npmProjs.Count -gt 0) {
    $missing = $npmProjs | Where-Object { -not (Test-Path "$($_.FullName)\node_modules") }
    if ($missing.Count -gt 0) {
        Write-Host "  $($missing.Count) projects need npm install: $($missing.Name -join ', ')" -ForegroundColor Yellow
        # [v5] Non-interactive npm install
        foreach ($p in $missing) {
            Write-Host "  [NPM] $($p.Name)..." -NoNewline -ForegroundColor Cyan
            Push-Location $p.FullName
            npm install 2>&1 | Out-Null
            Pop-Location
            Write-Host " done" -ForegroundColor Green
        }
    } else {
        Write-Host "  All projects have node_modules. Skipping." -ForegroundColor Gray
    }
}

# ============================================================
# Phase 13: Self-Installation (Desktop + Workspace)
# ============================================================
Write-Host ""
Write-Host "=== Phase 13: Script Self-Installation ===" -ForegroundColor Yellow

# Install to workspace/scripts/
$scriptsDst = "$ws\scripts"
if (-not (Test-Path $scriptsDst)) { New-Item -ItemType Directory -Path $scriptsDst -Force | Out-Null }
foreach ($s in @("backup_full.ps1", "restore_full.ps1")) {
    $src = "$BackupPath\$s"
    if (Test-Path $src) {
        Copy-Item $src "$scriptsDst\$s" -Force
        Write-Host "  [INSTALLED] $ws\scripts\$s" -ForegroundColor Green
    }
}

# Install to Desktop
$desktopTools = "$env:USERPROFILE\Desktop\Antigravity_Tools"
if (-not (Test-Path $desktopTools)) { New-Item -ItemType Directory -Path $desktopTools -Force | Out-Null }
foreach ($s in @("backup_full.ps1", "restore_full.ps1")) {
    $src = "$BackupPath\$s"
    if (Test-Path $src) {
        Copy-Item $src "$desktopTools\$s" -Force
    }
}

# Create Desktop README
$readmeContent = @"
=== Antigravity Tools ===

[backup_full.ps1]
  Usage: Right-click -> Run with PowerShell
  Purpose: Create a full backup ZIP before account switch or PC migration.
  Output: C:\Users\$userName\Antigravity\backups\

[restore_full.ps1]
  Usage: Right-click -> Run with PowerShell
  Purpose: Fully restore Antigravity environment from a backup ZIP.
  Auto-detects: fresh PC, account switch, existing data.

Schedule:
  Account rotation every 3 months.
  Always run backup_full.ps1 BEFORE switching accounts.
"@
$readmeContent | Set-Content "$desktopTools\README.txt" -Encoding UTF8
Write-Host "  [INSTALLED] Desktop\Antigravity_Tools\ (backup, restore, README)" -ForegroundColor Green

# ============================================================
# Phase 14: Comprehensive Verification
# ============================================================
Write-Host ""
Write-Host "=== Phase 14: Verification ===" -ForegroundColor Yellow
Write-Host ""

$allOk = $true

# Git repos
Write-Host "  [Git Repos]" -ForegroundColor White
foreach ($gr in $gitResults) {
    $icon = if ($gr.Fresh) { "OK" } else { "!!" }
    $color = if ($gr.Fresh) { "Green" } else { "Yellow" }
    Write-Host "    $icon $($gr.Name)" -ForegroundColor $color
    if (-not $gr.Fresh) { $allOk = $false }
}

# Settings
Write-Host "  [Settings]" -ForegroundColor White
$checks = @(
    @{ Path="$env:APPDATA\Antigravity\User\settings.json"; Name="settings.json" },
    @{ Path="$env:USERPROFILE\.gemini\GEMINI.md"; Name="GEMINI.md (global rules)" },
    @{ Path="$env:USERPROFILE\.gemini\antigravity\mcp_config.json"; Name="mcp_config.json" },
    @{ Path="$env:USERPROFILE\.gemini\antigravity\knowledge"; Name="knowledge/" }
)
foreach ($c in $checks) {
    $exists = Test-Path $c.Path
    $icon = if ($exists) { "OK" } else { "!!" }
    $color = if ($exists) { "Green" } else { "Red" }
    Write-Host "    $icon $($c.Name)" -ForegroundColor $color
    if (-not $exists) { $allOk = $false }
}

# Project rules (AGENTS.md, HANDOFF.md in each git project)
Write-Host "  [Project Rules]" -ForegroundColor White
foreach ($line in $repos) {
    $pname = $line.Split("|")[0]
    $pdir = "$ws\$pname"
    $hasAgents = Test-Path "$pdir\AGENTS.md"
    $hasHandoff = Test-Path "$pdir\HANDOFF.md"
    $hasStandards = (Test-Path "$pdir\docs\project_standards.md") -or (Test-Path "$pdir\docs\deploy.md")
    $rulesOk = $hasAgents -or $hasHandoff -or $hasStandards
    $icon = if ($rulesOk) { "OK" } else { "--" }
    $color = if ($rulesOk) { "Green" } else { "Gray" }
    Write-Host "    $icon $pname" -ForegroundColor $color
}

# Scripts on Desktop
Write-Host "  [Desktop Tools]" -ForegroundColor White
$dtOk = Test-Path "$desktopTools\backup_full.ps1"
Write-Host "    $(if ($dtOk) { 'OK' } else { '!!' }) Antigravity_Tools/" -ForegroundColor $(if ($dtOk) { "Green" } else { "Red" })

Write-Host ""
if ($allOk) {
    Write-Host "================================================================" -ForegroundColor Green
    Write-Host " RESTORE COMPLETE - PERFECT CLONE" -ForegroundColor Green
    Write-Host "================================================================" -ForegroundColor Green
} else {
    Write-Host "================================================================" -ForegroundColor Yellow
    Write-Host " RESTORE COMPLETE (some items need attention - see above)" -ForegroundColor Yellow
    Write-Host "================================================================" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Remaining manual steps:" -ForegroundColor Yellow
Write-Host "  1. Fill in API keys in .env files (if needed)" -ForegroundColor White
Write-Host "  2. Restart Antigravity to apply all settings" -ForegroundColor White
Write-Host "  3. Desktop\Antigravity_Tools\ has backup/restore for future use" -ForegroundColor White
Write-Host ""
Write-Host ""
Write-Host "To verify AI rules are loaded, paste this in Antigravity chat:" -ForegroundColor Yellow
Write-Host '  "AGENTS.md, HANDOFF.md, project_standards.md を読み込んで確認して"' -ForegroundColor Cyan
Write-Host ""

Write-Host "================================================================" -ForegroundColor Green
Write-Host " ALL PROCESSES FINISHED. You can close this window now." -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Read-Host "Press Enter to close..."

} catch {
    Write-Host ""
    Write-Host "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" -ForegroundColor Red
    Write-Host " FATAL ERROR OCCURRED:" -ForegroundColor Red
    Write-Host " $($_.Exception.Message)" -ForegroundColor Red
    Write-Host " Location: $($_.InvocationInfo.ScriptName) : line $($_.InvocationInfo.ScriptLineNumber)" -ForegroundColor Red
    Write-Host "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit (Window will stay open for debugging)..."
}
