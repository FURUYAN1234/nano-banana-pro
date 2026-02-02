@echo off
title Super FURU AI 4-Koma System [Launcher]
echo ==========================================================
echo   Super FURU AI 4-Koma System (v1.8.5 Alpha)
echo   Powered by Nano Banana Pro + Gemini 1.5/2.0
echo ==========================================================
echo.
echo Launching Development Server...
echo (Please wait for the Local URL to appear)
echo.

call npm install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed. Please check your Node.js installation.
    pause
    exit /b %errorlevel%
)

call npm run dev
pause
