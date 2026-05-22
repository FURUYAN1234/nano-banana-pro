[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
git add -A
git commit -m "v4.0.5: Local RAG Dictionary Expansion & UI Bug Fix"
git push origin main
git tag -a v4.0.5 -m "v4.0.5: Local RAG Dictionary Expansion / 辞書超拡張"
git push origin v4.0.5
gh release create v4.0.5 --title "v4.0.5: Local RAG Dictionary Expansion / 辞書超拡張" --notes "## What's New / 更新内容`n- Local RAG の Location 辞書を 61 箇所に超絶拡張（異次元空間やミクロ世界などカオスな舞台を追加） / Massively expanded the Local RAG Location dictionary to 61 unique environments (including alternate dimensions and microscopic worlds)`n- UI下部の生成履歴ギャラリーが二重に表示されるコンポーネント重複バグを修正 / Fixed a UI bug where the generation history gallery was duplicated due to redundant components"
gh release download v4.0.5 --archive zip --output $env:TEMP\nano-banana-pro-v4.0.5.zip
Expand-Archive -Path $env:TEMP\nano-banana-pro-v4.0.5.zip -DestinationPath $env:TEMP\nano-banana-pro-v4.0.5-extract -Force
Remove-Item -Recurse -Force C:\nano-banana-pro-main -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path C:\nano-banana-pro-main -Force
$zipFolder = Get-ChildItem -Path $env:TEMP\nano-banana-pro-v4.0.5-extract -Directory | Select-Object -First 1
Move-Item -Path "$($zipFolder.FullName)\*" -Destination C:\nano-banana-pro-main -Force
Remove-Item -Force c:\Users\sx717\Antigravity\nano-banana-pro\release_step.ps1
C:\Users\sx717\Antigravity\backup_launch.bat
