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

## Platform-Specific Guardrails (HF Spaces制約)
このプロジェクトは Hugging Face (HF) Spaces にもデプロイするため、HF特有の制約を絶対に守ること。

- ❌ `vite.config.js` の `base: './'` を勝手に変更しない。（HF環境においてJS/CSSの相対参照が壊れるため）
- ❌ HF フォルダの `README.md` を上書き・削除しない。（Spaces コンテナの起動設定が含まれている）
- ❌ HF フォルダの `.git` や `.gitattributes` を削除しない。

## Protected Settings
勝手に変更してはいけないデプロイ関連の設定ファイル。
- `vite.config.js` (baseプロパティ関連)
- `scripts/deploy_hf.ps1` (デプロイロジック)

## Release Flow
全体を自動化する場合は、専用のワークフロー（例: `/deploy` コマンド等）を呼び出すこと。
手動で行う場合の基本的な流れ：
1. `npm run lint` / `npm run build` 確認
2. `node scripts/update_version.js` でバージョン更新
3. git コミット・タグ作成・Push
4. GitHub Release 作成
5. `npm run deploy` (GitHub Pages)
6. `npm run deploy:hf` (HF Spaces)

## Not Applicable
- Vercel / Netlify / Cloudflare Pages / Firebase Hosting
