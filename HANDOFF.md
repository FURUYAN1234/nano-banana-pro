# HANDOFF.md (v3.70-alpha)

## Current Status
- v3.70-alpha デプロイ準備中。
- v3.69-alphaでOpenAI (gpt-image-2) 生成時のタイムアウトを4分から5分へ延長し、UI上の待機表示を「2〜5分」へ修正。
- v3.70-alphaでローカルRAG（`knowledge.js`）へITカテゴリ（ソフトウェア開発、SIer、インフラ、AI、セキュリティ等）を追加。

## Done
- src/lib/knowledge.js: ITカテゴリを追加 (v3.70-alpha)
- package.json, index.html, src/App.jsx: バージョンをv3.70-alphaへ一斉更新。
- README.md: ChangeLogを更新。
- HANDOFF.md: バージョンを更新。

## Remaining / Next Steps
- `npm run deploy` でのGitHub Pagesへのデプロイ。
- デプロイの完了とローカル確認。
- `backup_full.ps1` スクリプトの実行によるシステム全体のバックアップ。

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
