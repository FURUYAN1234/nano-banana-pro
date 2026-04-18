# Deploy Rules: nano-banana-pro

## Deploy Targets
- GitHub Pages
- Hugging Face Spaces

## Deploy Commands
```bash
# 1. バージョンアップ（必須）
node scripts/update_version.js

# 2. GitHub Pages へデプロイ
npm run deploy

# 3. HF Spaces へデプロイ
npm run deploy:hf
```

## 正規デプロイフロー（一気通貫） - 最重要ルール

AI がデプロイする場合、以下の手順を**一つも省略せず**に順番通り実行すること。

### Phase 1: 開発・検証
1. コード修正（新機能/バグフィックス）
2. `npm run dev` でローカルサーバー起動
3. URLを表示してユーザーに検証を依頼
4. **ユーザーの「OK」を待つ**（勝手にデプロイしない）

### Phase 2: バージョンアップ・Git
5. `node scripts/update_version.js` でバージョンインクリメント
6. 3箇所の同期を**実ファイルで確認**: package.json, src/App.jsx, index.html
7. `git add . && git commit -m "Bump version and Deploy"`
8. `git push origin main`

### Phase 3: GitHub Pages デプロイ
9. `npm run deploy`（内部で build → gh-pages push）
10. `git fetch origin gh-pages && git show origin/gh-pages:index.html | Select-String '<title>'` で**リモート検証**
11. 新バージョンが表示されるまで確認を繰り返す

### Phase 4: タグ・リリース
12. `git tag vX.Y.Z-alpha && git push origin --tags`
13. release_body.md にリリースノート作成（日英併記）
14. **タグ文章をユーザーに表示**:
    - タイトルをMarkdownコードブロックで表示（英語 / 日本語）
    - 本文をMarkdownコードブロックで表示（英語 / 日本語）
15. `gh release create vX.Y.Z-alpha --title "..." -F release_body.md`

### Phase 5: ZIP確認
16. `gh release view vX.Y.Z-alpha --json assets,zipballUrl` で最新版ZIPダウンロード可能か確認
17. Releases ページURLを提示

### Phase 6: Hugging Face Spaces デプロイ
18. `npm run deploy:hf`（内部で deploy_hf.ps1 実行）
19. HF URL (https://huggingface.co/spaces/FURUYAN/nano-banana-pro) を提示

## HF Spaces フォルダ
```
C:\Users\sx717\Antigravity\hf-nano-banana-pro
```
- Git remote: https://huggingface.co/spaces/FURUYAN/nano-banana-pro
- 以前は Downloads にあったが、安定運用のため Antigravity 配下に移動済み

## Platform-Specific Guardrails (HF Spaces制約)
このプロジェクトは Hugging Face (HF) Spaces にもデプロイするため、HF特有の制約を絶対に守ること。

- ❌ `vite.config.js` の `base: './'` を勝手に変更しない。（HF環境においてJS/CSSの相対参照が壊れるため）
- ❌ HF フォルダの `README.md` を上書き・削除しない。（Spaces コンテナの起動設定が含まれている）
- ❌ HF フォルダの `.git` や `.gitattributes` を削除しない。

## Protected Settings
勝手に変更してはいけないデプロイ関連の設定ファイル。
- `vite.config.js` (baseプロパティ関連)
- `scripts/deploy_hf.ps1` (デプロイロジック)
- HF フォルダの `README.md` (Spacesコンテナ起動設定)

## Not Applicable
- Vercel / Netlify / Cloudflare Pages / Firebase Hosting
