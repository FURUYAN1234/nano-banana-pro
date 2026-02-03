@echo off
setlocal
echo [Nano Banana Pro] Auto-Deployment System (Yolo Mode Lite)
echo ========================================================
echo.

:: 1. Ask for Commit Message
set /p CommitMsg="Enter Commit Message: "
if "%CommitMsg%"=="" set CommitMsg="Update: Auto-deployment"

echo.
echo [1/5] Git Add...
git add .
if %errorlevel% neq 0 exit /b %errorlevel%

echo.
echo [2/5] Git Commit...
git commit -m "%CommitMsg%"
:: Allow empty commits to proceed if just triggering build
if %errorlevel% neq 0 echo Warning: No changes to commit or error.

echo.
echo [3/5] Git Push to Main...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed. Pulling latest changes might be required.
    exit /b %errorlevel%
)

echo.
echo [4/5] Building & Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed.
    exit /b %errorlevel%
)

echo.
echo [5/5] Verify Remote Hash (gh-pages)...
git log -n 1 origin/gh-pages

echo.
echo ========================================================
echo SUCCESS: Deployment Pipeline Triggered.
echo Please wait 1-2 minutes for GitHub Pages to update.
echo ========================================================
pause
endlocal
