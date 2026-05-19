# HANDOFF.md (v3.73-alpha)

## Current Status
- v3.73-alpha デプロイ準備中。
- シナリオ入力欄のUIを更新し、外部生成ツール（Story Maker等）からの直接的なシナリオコピー＆ペーストに対応していることを明記しました。

## Done
- src/App.jsx: ダイアログ抽出ロジック（`extractDialogueOnly`）を改善し、カッコ付きト書きや段落形式のシナリオでもセリフを取りこぼさずに抽出できるよう修正。
- src/App.jsx: シナリオ入力欄のプレースホルダーとラベルを更新。
- package.json, index.html, src/App.jsx: バージョンをv3.73-alphaへ一斉更新。
- README.md: ChangeLogを更新。
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
