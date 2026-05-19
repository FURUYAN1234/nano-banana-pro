# HANDOFF.md (v3.71-alpha)

## Current Status
- v3.71-alpha デプロイ準備中。
- story-maker側からの要請に基づき、プロジェクト間の直接ファイル編集（クロスプロジェクト汚染）を禁止し、NBP側からの一方的な参照による同期体制へ移行するためのルール整備と仕様ドキュメント(`docs/scenario_spec.md`)を作成しました。

## Done
- docs/project_standards.md: Cross-Project Isolationセクションを追加 (v3.71-alpha)
- docs/scenario_spec.md: 新規作成 (v3.71-alpha)
- package.json, index.html, src/App.jsx: バージョンをv3.71-alphaへ一斉更新。
- README.md: ChangeLogを更新し、古い履歴をパージ。
- HANDOFF.md: バージョンを更新。

## Remaining / Next Steps
- `npm run deploy` でのGitHub Pagesへのデプロイ。
- デプロイの完了とリモート確認 (`git show origin/gh-pages:index.html`)。
- Gitのコミット・プッシュ、タグ打ちとGitHub Releaseの作成。
- ZIP検証とローカルCドライブフォルダ（C:\nano-banana-pro-main）への展開。

## Risks
- 特になし。

## Files Modified
- package.json
- src/App.jsx
- index.html
- README.md
- src/lib/knowledge.js
- src/lib/openai.js
- HANDOFF.md
