# HANDOFF.md (v3.60-alpha)

## Current Status
- v3.60-alpha デプロイ準備中。ChatGPTモードの画像生成時に表示される待機時間の表記ゆれ（1〜2分→2〜4分）の修正および、不要になったAPI手動トグルUI（Dead Code）を削除。

## Done
- `src/App.jsx`: 画像生成中のオーバーレイ表示テキストを「※最大2〜4分程度かかる場合があります」に統一。
- `src/App.jsx`: デュアルエンジン化により完全に不要となった `enableOpenAIApi` チェックボックスUI（`{false && (...)}` 内）を削除。
- `package.json`, `index.html`, `src/App.jsx`: バージョンをv3.60-alphaへ更新。

## Remaining / Next Steps
- デプロイの完了確認（GitHub Pages等）。
- GitHubリリース作成およびCドライブへのバックアップ（展開）の実行。

## Risks
- なし。

## Files Modified (v3.58-alpha)
- `README.md`
- `src/App.jsx`
- `index.html`
- `package.json`
