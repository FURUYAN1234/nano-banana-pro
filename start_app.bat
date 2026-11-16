@echo off
setlocal DisableDelayedExpansion
set "MANGA_LAUNCHER=%~dp0mcp\skills\manga-book-production\Launch-Manga.cmd"
if not exist "%MANGA_LAUNCHER%" goto INCOMPLETE_ARCHIVE
call "%MANGA_LAUNCHER%" %*
exit /b %errorlevel%

:INCOMPLETE_ARCHIVE
echo [ERROR] The bundled manga launcher was not found.
echo Extract the ENTIRE application ZIP first, then run start_app.bat from that folder.
echo Required: mcp\skills\manga-book-production\Launch-Manga.cmd
exit /b 1
