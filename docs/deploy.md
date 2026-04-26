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
7. `README.md` の ChangeLog を更新する（変更内容を英日併記で追記、長すぎる場合は古いエントリを削除）
8. `git add . && git commit -m "Bump version and Deploy"`
9. `git push origin main`

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
15. `gh release create vX.Y.Z-alpha --title "..." -F release_body.md --latest`

> ⚠️ **`--prerelease` フラグは絶対に使用禁止。** このプロジェクトは全バージョンが `-alpha` であり、`--prerelease` を付けるとGitHubサイドバーの「Latest」が旧バージョンのまま更新されない。必ず `--latest` を付けること。

### Phase 5: ZIP確認
16. `gh release view vX.Y.Z-alpha --json assets,zipballUrl` で最新版ZIPダウンロード可能か確認
17. Releases ページURLを提示

### Phase 6: Hugging Face Spaces デプロイ
18. `npm run deploy:hf`（内部で deploy_hf.ps1 実行）
19. HF URL (https://huggingface.co/spaces/FURUYAN/nano-banana-pro) を提示

### Phase 7: ローカル環境更新 (`C:\nano-banana-pro-main`)
20. 一時フォルダ作成 & GitHub Release から ZIP をダウンロード
    ```powershell
    $tmp = "C:\temp_nbp_deploy"
    New-Item -ItemType Directory -Path $tmp -Force
    gh release download vX.Y.Z-alpha --archive zip -D $tmp
    ```
21. 解凍 → 古いフォルダ削除 → 深い方のフォルダをコピー
    ```powershell
    Expand-Archive -Path "$tmp\*.zip" -DestinationPath "$tmp\extracted" -Force
    Remove-Item -Recurse -Force "C:\nano-banana-pro-main" -ErrorAction SilentlyContinue
    $inner = (Get-ChildItem "$tmp\extracted" -Directory)[0].FullName
    Copy-Item -Path $inner -Destination "C:\nano-banana-pro-main" -Recurse
    ```
    > ⚠️ **2階層問題について**: Windows エクスプローラーの「すべて展開」を使うと `nano-banana-pro-main\nano-banana-pro-main\...` と同名フォルダが2階層になる。上記の `Expand-Archive` + `Get-ChildItem` なら内側のフォルダだけを自動で取得するため、この問題は発生しない。
22. 一時ファイル削除 & コピー成功確認
    ```powershell
    Remove-Item -Recurse -Force $tmp
    Test-Path "C:\nano-banana-pro-main\package.json"  # True なら成功
    ```

---

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

## Forbidden Actions (デプロイ時の禁止事項)
- ❌ `gh release create` に `--prerelease` フラグを付けない。付けるとサイドバーの Latest が更新されず古いリリースが表示され続ける。
- ❌ `gh-pages` ブランチの盲目的な削除や Force Push は禁止。
- ❌ デプロイ完了報告前にリモート検証（`git show origin/gh-pages:index.html`）をスキップしない。
- ❌ バージョン同期の3箇所（package.json, App.jsx, index.html）を実ファイルで確認せずにデプロイしない。
- ❌ **GitHub Release の作成にブラウザサブエージェントを使用しない。** 必ず `gh release create` CLI を使うこと。サブエージェントは pre-release チェックボックスを誤ってONにするリスクがある。
- ❌ **README.md をエンコーディング確認なしで編集しない。** 書き込み前に UTF-8 であることを確認し、文字化けテキストの追加を防ぐこと。

## 自動チェック項目（pre_deploy_check.js で `npm run deploy` 時に自動検証）
`npm run deploy` を実行すると、以下が自動的にチェックされる（不合格ならビルドが停止する）：

| チェック | 内容 | 不合格時の動作 |
|---|---|---|
| Git Merge State | マージ中でないこと | ❌ BLOCK |
| Git Sync | リモートと同期済みか | ⚠️ auto-rebase |
| Version Sync | package.json / App.jsx / index.html のバージョン一致 | ❌ BLOCK |
| ChangeLog | README.md に当該バージョンのエントリ存在 | ❌ BLOCK |
| Encoding | README.md に文字化けパターン（半角カタカナ）がないか | ⚠️ WARNING |
| .nojekyll | public/.nojekyll の存在 | ❌ BLOCK |

