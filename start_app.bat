@echo off
chcp 65001 > nul
setlocal

:: ----------------------------------------------------
::  Nano Banana Pro 自動起動スクリプト (修正版)
:: ----------------------------------------------------

:: 1. カレントディレクトリをこのファイルの場所に移動
cd /d "%~dp0"

echo ==========================================
echo   Nano Banana Pro を起動しています...
echo ==========================================

:: 2. Node.jsのインストール確認
where node >nul 2>nul
if %errorlevel% neq 0 goto :NODE_MISSING

:: 3. 初回セットアップ (node_modulesフォルダがない場合のみ実行)
if not exist "node_modules" (
    echo.
    echo [セットアップ] 初回起動のため、必要な機能をインストールします...
    echo ※これには数分かかる場合があります。画面を閉じずに待ってください。
    echo.
    call npm install
    if %errorlevel% neq 0 goto :INSTALL_ERROR
    echo.
    echo [完了] 準備が整いました！
    echo.
)

:: 4. サーバー起動 & ブラウザ自動オープン
echo [起動中] サーバーを立ち上げます...
echo 準備ができ次第、ブラウザが自動的に開きます。
echo.
echo ※終了するには、この黒い画面を閉じてください。
echo ------------------------------------------

call npm run dev -- --open
pause
exit /b

:NODE_MISSING
echo [ERROR] Node.js が見つかりません。
echo 公式サイト https://nodejs.org/ からインストールしてください。
pause
exit /b

:INSTALL_ERROR
echo [ERROR] インストールに失敗しました。
pause
exit /b
