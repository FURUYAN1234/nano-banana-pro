# HANDOFF.md (v3.64-alpha)

## Current Status
- v3.64-alpha デプロイ準備中。起動バッチ（start_app.bat）の先頭にプロセスリセット機能を追加。

## Done
- start_app.bat 等のバッチファイルに `taskkill /F /IM node.exe` を追加し、ゾンビプロセスをクリーンアップするように修正。
- package.json, index.html, src/App.jsx: バージョンをv3.64-alphaへ更新。
- README.md: ChangeLogを更新し、v3.64-alphaエントリを追加。

## Remaining / Next Steps
- GitHub Pages デプロイ（実行中）。
- タグ打ち・GitHub Release作成。
- Cドライブへのバックアップ（ZIP展開）。

## Risks
- なし。

## Files Modified (v3.64-alpha)
- package.json
- src/App.jsx
- index.html
- README.md
- start_app.bat
- HANDOFF.md

