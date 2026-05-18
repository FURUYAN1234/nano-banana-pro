# HANDOFF.md (v3.63-alpha)

## Current Status
- v3.63-alpha デプロイ中。起動バッチ（start_app.bat）のポート衝突修正を含む。

## Done
- vite.config.js: port: 5173, strictPort: true を追加（ポート固定）。
- start_app.bat: 前セッションで修正済み（他プロジェクトとの競合解消）。
- package.json, index.html, src/App.jsx: バージョンをv3.63-alphaへ更新。
- README.md: ChangeLogを降順に整理し、v3.63-alphaエントリを追加。
- hf-nano-banana-pro/README.md: v3.63-alphaに更新。

## Remaining / Next Steps
- GitHub Pages デプロイ検証。
- タグ打ち・GitHub Release作成。
- HF Spaces デプロイ。
- Cドライブへのバックアップ。

## Risks
- なし。

## Files Modified (v3.63-alpha)
- vite.config.js
- README.md
- index.html
- package.json
- src/App.jsx
- release_body.md
