# Super FURU AI 4-koma System — MCP

An MCP-compatible AI client can use the application's production functions and carry references and story context across pages. The application remains the shared scenario and image-generation engine. The [architecture guide](ARCHITECTURE.md) explains how the application and production skill can be developed separately. / MCP対応のAIクライアントから、漫画アプリの制作機能を呼び出します。複数ページ作品では、人物や小道具の資料、物語の流れ、ページごとの設定を引き継ぎます。描画・シナリオ生成はアプリの共通処理を使います。 アプリと制作スキルを別々に開発する構成は[設計ガイド](ARCHITECTURE.md)を参照してください。

The bundled [scenario skill](skills/manga-book-production/SKILL.md) contains portable story-design, length, review and original-exercise references. It can draft and revise scenarios without Story Maker or a live MCP connection. For approved image production, it follows the separate [MCP handoff guide](skills/manga-book-production/references/mcp-production.md); drawing style is not redefined by the skill. Explicit page counts take priority; length-only requests use 32/64/192-page working defaults, and unspecified length is asked before planning. / 同梱の[シナリオ専門スキル](skills/manga-book-production/SKILL.md)は、構築・尺・検査・オリジナル演習を内蔵し、Story Makerや稼働中のMCPなしでも脚本を作成・改稿できます。画像制作が了承された場合は別の[MCP受け渡し手順](skills/manga-book-production/references/mcp-production.md)を使い、スキルから画風を再定義しません。具体的なページ数を優先し、区分だけなら32/64/192Pの作業用初期値、尺がなければ構成前に確認します。
> This guide covers the released local MCP functions. Check `manga_capabilities` for the connected version; `planned` means unavailable. / 正式公開済みのローカルMCP機能の導入ガイドです。接続した版の対応機能は `manga_capabilities` で確認し、`planned` は未対応として扱います。

## Requirements / 必要なもの

- Windows for the bundled launcher; Linux is supported through the manual setup below. / 同梱ランチャーはWindows用です。Linuxは下記の手動導入を使います。
- Internet access for first installation and API generation. The Windows launcher obtains the official portable Node.js LTS runtime when no compatible Node.js is installed. / 初回導入とAPI生成にはインターネット接続が必要です。Windowsランチャーは対応するNode.jsがなければ、公式のポータブルLTS版を取得します。
- An AI client that can launch a local stdio MCP server. / ローカルのstdio MCPサーバーを起動できるAIクライアント。
- An API account and connection for the selected provider; provider charges apply. / 利用するOpenAIまたはGemini APIのアカウントと接続。文章・画像の生成料金は各APIに従います。

Opening the hosted web app does not start a local MCP server. The configuration below requires local stdio support. / 公開Webページを開くだけでは、手元のパソコンでMCPサーバーは起動しません。ローカルstdioを使えないクライアントへ、この設定例をそのまま登録することもできません。

## Windows launcher / Windowsの導入と更新

You can give Codex the downloaded ZIP (attachment or local path) and ask: “Extract this ZIP, install manga-book-production as a complete skill, and configure the MCP connection.” Codex needs local-file and MCP-setting support; follow any actual installation confirmation. The ZIP alone is not automatically enabled. / ダウンロードしたZIPを添付するか保存場所を伝え、Codexに「このZIPを展開して、manga-book-productionをスキルとして導入し、MCP接続を設定して」と依頼できます。ファイルとMCP設定を扱える環境が必要で、導入の確認が出たら内容を確認します。ZIPだけで自動的に有効にはなりません。

1. Download the [application ZIP](https://github.com/FURUYAN1234/nano-banana-pro/releases/latest/download/SuperFURU-Manga-MCP.zip) and extract the whole archive. / アプリZIPをダウンロードし、全体をまとめて展開します。
2. Double-click `start_app.bat` at the extracted app folder root once. Afterwards use the single Desktop shortcut for update checks, service startup and opening the app; no separate MCP launch is needed. / 展開したアプリフォルダー直下の `start_app.bat` を一度実行します。以後はデスクトップのショートカット1つで更新確認・サービス起動・アプリ表示まで進み、MCPを別に起動する必要はありません。
3. The launcher checks the official release and its checksum, installs a verified version, then starts the local app and MCP service. / 公式リリースとチェックサムを確認し、検証済みの版を導入してローカルのアプリとMCPサービスを起動します。
4. Check the skill destination printed by the launcher, then register the MCP connection below. Reload the client settings and confirm its manga tools. Connect the API in the app and enable **Allow AI control**; review and approve the outline/detail before generation and PNG/JSON saving. / バッチが表示したスキル配置先を確認し、下記のMCP接続を登録します。設定の再読込後に漫画ツールを確認し、アプリでAPI接続と「AI操作を許可」を有効にします。あらすじ・詳細案を確認して承認してから生成・PNG／JSON保存へ進みます。

**Client skill updates / AIクライアントのスキル更新**

The Windows launcher verifies the release's skill files against its package checksums. It updates existing `manga-book-production` installations in the current user's Codex, shared `.agents/skills`, and Claude skill directories. For a first installation it uses the first detected client location in that order. Set `FURU_MANGA_SKILL_ROOT` to an absolute skills directory to choose a different client or location. `CODEX_HOME` is respected. If no client is detected, only the app runs. Reload skill discovery in the client or open a new session to use the updated instructions.

Windowsの起動バッチは、公式パッケージの照合後、利用中のアプリと同じ版のスキルを導入します。起動中のアプリを再利用するとき、またはオフラインで導入済み版に戻るときも、その版を参照します。検出先はCodex、共有の `.agents/skills`、Claudeです。複数の場所にすでに導入されていれば各コピーを更新し、初回はこの順で最初に見つかったクライアントを使います。別のAIや保存場所を使う場合は、環境変数 `FURU_MANGA_SKILL_ROOT` にスキル一覧の親ディレクトリ（例 `D:\MyAI\skills`）の絶対パスを設定します。クライアント側のスキル再読込または新規セッションで更新後の指示が反映されます。

On upgrade, the launcher keeps the entire previous client copy, including edits, in `.super-furu-skill-history` beside the skills directory. Personal files outside the managed file list are also copied into the new edition. The console shows the backup path. Recover personal changes by comparing the corresponding files or copying them back from that directory. The same release retains edits on subsequent launches. / 更新時は個人の追記を含む旧フォルダー一式をスキル一覧の隣の `.super-furu-skill-history` に退避し、追加の個人ファイルは新版にも引き継ぎます。公式ファイルに加えた独自追記は、表示された旧版と新版を比較して必要なものを戻せます。同じリリースを再起動しても個人の編集は維持されます。

If you downloaded only the [skill ZIP](https://github.com/FURUYAN1234/nano-banana-pro/releases/latest/download/SuperFURU-Manga-Skill.zip), run `Launch-Manga.cmd` beside `SKILL.md` in the extracted folder. This is an alternative entry to the same launcher, not an additional startup step. / スキルZIPだけを取得した場合は、展開先で `SKILL.md` と同じフォルダーの `Launch-Manga.cmd` を使います。同じ処理への別入口なので、追加で両方を押す必要はありません。

A running MCP service does not itself enable AI control or lock manual controls. / MCPサービスが動いているだけでAI操作が有効になったり、手動入力がロックされたりすることはありません。

Ordinary single-page use is manual: neither the production skill nor MCP control permission is required, even when the launcher starts the service. Developers can use `npm ci` and `npm run dev` from source. / ランチャーがサービスを起動しても、通常の1ページ制作は手動で使え、制作スキルもMCPの操作許可も不要です。開発時はソースから `npm ci` と `npm run dev` を使えます。

The default installation is `%LOCALAPPDATA%/SuperFURU-Manga`, with separate `versions`, `launcher` and private `workspace` folders. A managed Desktop shortcut starts the same launcher; an unrelated shortcut is preserved. / 標準の導入先は `%LOCALAPPDATA%/SuperFURU-Manga` です。版ごとのアプリ、共通ランチャー、非公開の作品保存先を分けます。デスクトップにも同じ起動処理へのショートカットを作り、無関係な同名ショートカットは置き換えません。

OneDrive-managed Desktop folders are supported for the managed shortcut. If shortcut creation fails, the launcher warns and continues app startup; installer path and link protections are unchanged. / OneDrive管理のデスクトップでも共通ショートカットを扱います。作成できない場合は警告して本体起動を続け、インストール先のパス・リンク保護は維持します。

| Command / 操作 | Behavior / 動作 |
|---|---|
| `Launch-Manga.cmd` | Check the latest release when starting a new service; reuse a running service. / 新規起動時に最新版を確認し、稼働中のサービスがあればそのまま使います。 |
| `Launch-Manga.cmd -Update` | Update and restart only after MCP is disconnected and all jobs have settled. / MCP切断後、実行中の処理がない場合に更新して再起動します。 |
| `Launch-Manga.cmd -StopOnly` | Stop the owned local service after disconnection and job completion. / 切断・処理完了後に、このアプリのローカルサービスを終了します。 |
| `Launch-Manga.cmd -Stdio -NoOpen` | Reuse the running service or start a verified local installation automatically without checking for updates or opening a browser tab. / 稼働中のサービスを再利用し、停止中は検証済みの導入版を自動起動します。更新確認とブラウザー表示は行いません。 |

The launcher shows update checks, downloads, extraction and startup as they happen. A current installed release starts after checking its version and required entry files, without hashing all dependencies again. ZIP checksums and safe extraction are checked when downloading a release. Messages use stderr so MCP's stdout remains available for its protocol. / 更新確認・ダウンロード・展開・起動の段階をその都度表示します。同じ版が導入済みなら、版と必要な起動ファイルを確認して起動し、依存部品を含む全ファイルの再検証は行いません。ZIPのチェックサムと安全な展開は取得時に確認します。メッセージはstderrに出し、MCPの通信に混ぜません。

Active production is never replaced by an update. If the latest release is unavailable, a previously installed release is used when its installation record and required entry files are present. Without one, startup reports the failure. An interactive failure keeps its message visible until Enter; noninteractive and MCP launches return a failure without waiting for input. / 制作中の接続や処理を更新で中断しません。最新版を取得できない場合は、導入記録と必要な起動ファイルがある既存版を使い、なければエラーを表示します。通常起動の失敗はEnterキーを押すまで理由を表示し、非対話実行・MCP接続では入力待ちにせず失敗を返します。

For Codex, check that the launcher lists `manga-book-production` in the configured skill directory. After the first launcher run, use Codex's MCP settings, or the following command when the Codex CLI is available. This adds the local server entry; it does not enter a provider key or overwrite other entries. / Codexでは、バッチの表示でスキル配置先の `manga-book-production` を確認します。バッチでの初回起動後、CodexのMCP設定から接続を登録します。Codex CLIが利用できる場合は次のコマンドも使えます。ローカルサーバーの登録だけを追加し、APIキーの入力や他の登録の上書きは行いません。

```powershell
codex mcp add super-furu-manga -- powershell.exe -NoProfile -File "$env:LOCALAPPDATA\SuperFURU-Manga\launcher\bootstrap.ps1" -Stdio -NoOpen
```

If an entry with this name already exists, inspect and reuse it instead of registering it again. Confirm that the tools are available after Codex reloads its MCP settings, then ask it to use `manga-book-production`. / 同名の登録がある場合は再登録せず、設定を確認して再利用します。CodexにMCP設定が反映され、ツールが利用可能になったことを確認してから、`manga-book-production`を使って漫画を作るよう依頼してください。

For other clients that use `mcpServers` JSON, the following is an example entry after the first launch. Replace the example path with the actual installed `launcher/bootstrap.ps1`. Clients do not necessarily expand `%LOCALAPPDATA%` inside JSON. / 他のAIクライアントで`mcpServers`形式のJSONを使う場合は、初回起動後に次の設定例を使います。実際の`launcher/bootstrap.ps1`の絶対パスへ置き換えてください。JSON内で`%LOCALAPPDATA%`が展開されるとは限りません。

```json
{
  "mcpServers": {
    "super-furu-manga": {
      "command": "powershell.exe",
      "args": [
        "-NoProfile", "-File",
        "C:/Users/YOUR_NAME/AppData/Local/SuperFURU-Manga/launcher/bootstrap.ps1",
        "-Stdio", "-NoOpen"
      ]
    }
  }
}
```

The entry runs its bundled bootstrap with process-scoped `-ExecutionPolicy Bypass` so Windows download-zone attributes do not stop startup. It does not change system/user policy or the registry; group policy remains authoritative. If organizational policy blocks startup, use your administrator's approved procedure. / 入口は同梱bootstrapの実行プロセスだけに `-ExecutionPolicy Bypass` を指定し、Windowsのダウンロード属性による起動停止へ対応します。システム・ユーザー設定やレジストリは変えず、グループポリシーを優先します。組織の設定で起動できない場合は、管理者が認めた手順を使ってください。

## Manual source setup / ソースからの手動導入

Replace the example application directory with your extracted source directory. / 以下はWindowsの配置例です。`C:/Apps/SuperFuruManga`を、実際に展開したアプリの場所へ置き換えてください。

```powershell
Set-Location C:/Apps/SuperFuruManga
npm ci
npm run mcp:build
```

Normal `npm ci` also installs the MCP dependencies in their separate directory. If install scripts are disabled, run `npm --prefix mcp ci --ignore-scripts` separately. / 通常の `npm ci` は、MCP側の依存関係も専用のフォルダーへ導入します。インストール時のスクリプトを無効にした環境では、別途 `npm --prefix mcp ci --ignore-scripts` を実行してください。

Reinstall changed dependencies and rebuild after application updates. The MCP bridge checks that its served application matches the current source. / アプリのソースを更新した後も、依存関係を更新して `npm run mcp:build` を実行します。MCP用の起動画面は、ソースと一致しない古いビルドを拒否します。

The normal build and MCP build both stamp the runtime. On Windows, Launch-Manga.cmd opens the production workspace from a verified installation. Give source builds a separate workspace so a rebuild cannot replace an active production runtime. / 通常ビルドとMCPビルドは、いずれも実行版の照合情報を生成します。Windowsの通常の制作環境は Launch-Manga.cmd から配布版で起動します。開発用のソースビルドには別のワークスペースを指定します。

For a source checkout, use this direct-server entry instead of the managed Windows launcher. Building requires Node.js 22.12 or later, or 20.19 or later within the 20.x line, with npm. / ソースから実行する場合は、Windowsランチャーの代わりに次の直接起動設定を使えます。ビルドにはnpmとNode.js 22.12以上、または20系の20.19以上が必要です。

```json
{
  "mcpServers": {
    "super-furu-manga": {
      "command": "node",
      "args": [
        "C:/Apps/SuperFuruManga/mcp/src/server.mjs",
        "--workspace",
        "C:/Users/YOUR_NAME/MangaProjects",
        "--bridge"
      ]
    }
  }
}
```

The workspace is required private project storage. It can also be set with `MANGA_MCP_WORKSPACE`. Only one server may own a workspace at a time. / `--workspace`は非公開の作品保存先です。公開サイトの配信フォルダーやGitへ含めない場所を使ってください。指定は必須で、環境変数 `MANGA_MCP_WORKSPACE`でも設定できます。同じ保存先を複数のサーバーから同時に操作できません。

`--bridge` enables the local application connection. The default address is `127.0.0.1:45931`; use `--port` if needed. Do not put provider API keys in this configuration. / `--bridge`でローカルのアプリ接続を有効にします。既定の待受先は `127.0.0.1:45931`で、使用中なら `--port`で別の空きポートを指定します。APIキーはこのJSONや環境設定へ書きません。

On Linux, pass an existing absolute output directory with `--downloads`. Windows can also use an explicit directory; otherwise it uses the OS Downloads folder. / Linuxでは、既存の出力フォルダーの絶対パスを `--downloads` で指定します。Windowsでも明示的な保存先が必要な場合に指定できます。省略時のWindowsは、OSに登録されたダウンロード先を使います。

## Connect / 接続

1. Ask the AI to inspect capabilities and obtain the application connection. / AIへ `manga_capabilities` と `manga_connection` の実行を依頼します。
2. Open the temporary local pairing URL in the existing production tab. Keep the pairing URL private. / 返された期限付きのローカルURLを既存の制作タブで開きます。URLの接続情報は公開・転載しません。
3. If the API is disconnected, the skill brings its input screen forward and asks you to enter the key now and press Connect. Never paste keys into chat; an existing connection needs no re-entry. / API未接続なら、スキルが入力画面を前面に出し「今、このAPIキー欄に入力して『接続』を押してください」と案内します。キーはチャットへ貼り付けず、接続済みなら再入力しません。
4. Enable **Allow AI control** in the app, then confirm the connected state and supported operations. An AI with browser control can perform this step for the requested production. If it cannot operate the browser, it shows the current FURU pairing screen, asks the user to press the named control, then verifies the connection and resumes the pending job. / 右上の**「AI操作を許可」**で、この画面をAIの操作対象にします。ブラウザー操作に対応するAIは依頼された制作のためにボタンを押し、接続済みと能力表を確認します。AI側で操作できない場合は、作業中のチャットにFURUの接続画面を表示し、右上の「AI操作を許可」を本人に押してもらいます。操作後はAIが接続と待機中のジョブの再開を確認します。

The connection runs from the AI through the local MCP server to the open app. The button grants control of that screen; it is not an outbound connection to an AI service. The skill explains progress while performing supported actions. / 接続は「AI → ローカルMCPサーバー → 漫画アプリ」の向きです。ボタンは画面操作の許可であり、アプリからAIサービスへ接続する操作ではありません。スキルは実行できる操作を進めながら、進行状況も短く説明します。

After a restart, verify the application and API connection before resuming. Persisted projects do not imply persisted credentials. / アプリの再読み込みやサーバー再起動後は、接続を確認してから再開します。API接続が切れていれば、同じ入力欄で接続し直します。プロジェクトが保存されていることと、API接続が残っていることは別です。

Keep the local app open and connected during production. The server alone cannot generate pages. The app shows connection and operation state. After closing it, inspect the existing job before resuming. Ordinary production remains available on the hosted demo without MCP. / 制作中は、このローカル画面を開いたまま接続を保ちます。MCPサーバーだけでは生成処理は動きません。画面にはMCPの接続状態と実行状態を表示します。画面を閉じた場合は実行状態を確認して再開し、未確認の有料処理を自動で繰り返しません。MCPを使わない通常の制作は、公開デモサイトでも引き続き利用できます。

Scrolling and viewing results remain available while connected. Inputs, settings, generation, editing and history changes are locked. The single **Stop and return to manual** button stops local work, disconnects MCP and restores manual controls. The ordinary Emergency Stop button appears only outside MCP control. / MCP接続中もスクロールと結果の閲覧はできます。入力・設定変更・生成・編集・履歴の切り替えはロックします。操作ボタンは右上の**「停止して手動に戻る」**1つです。ローカルの処理を止め、MCPを切断してから手動操作へ戻ります。通常制作の「緊急停止」はMCP操作中には表示しません。

Skill download, setup guide and manual share the top utility row. The four production steps have a separate row. / スキル取得・導入ガイド・マニュアルはMCP状態と同じ上段に置き、STEP1～4の進捗は独立した行に表示します。

## First book / 最初の作品

Example brief: / 例えば次のように依頼できます。

> Create a short adventure comedy about two original characters chasing a windblown letter. Make four color pages including the cover and create character sheets. Hide body-page titles, include body-page numbers, and put both standard footer credits on the final page only. Show the synopsis and detailed plan before generation. / オリジナルの二人が、風で飛んだ手紙を追いかける短い冒険コメディを描いて。カラーで表紙を含めて4ページ。キャラクターシートも作って。本文のタイトルはなし、ページ番号は付けて。通常の2種類のウォーターマークは最終ページの下だけに。まずあらすじと詳細シナリオを見せて。

Production sequence: / 制作の流れは次のとおりです。

1. Choose supplied sheets or AI-created original characters and sheets. / キャラクターシートを用意するか、AIでキャラクターとシートを作るかを決めます。
2. Discuss a short synopsis, then the detailed page plan. / 短いあらすじを相談し、ページごとの詳細シナリオへ進みます。
3. Review the cast, action, dialogue, layout, cover and ending, then approve or reject the plan. / 人物、動作、台詞、コマ数、表紙、結末を確認し、その案で生成するか返答します。
4. Prepare approved shared assets and generate pages in order. / 承認した仕様から共通資料をそろえ、ページ順に生成します。
5. Save each completed page to Downloads as PNG and matching production JSON. / 完成したページから、PNGと同名の制作情報JSONをダウンロードフォルダーへ保存します。

Once the user confirms the detailed script and character sheets, ordered production reviews and saves each new page, then automatically reviews the saved pages in reading order. Each completed review identifies the image by SHA-256. Outstanding findings leave the saved images intact for correction. / 台本と設定画の確認後は、各ページを自動査読・保存し、最後に採用画像を読順で自動査読します。査読した画像はSHA-256で識別します。指摘が残っても保存済み画像を保持し、修正に使えます。

Before rendering with supplied or generated reference images, the AI applies a page with `manga_run: apply_page`, runs `recognition`, refreshes the project revision and applies the page again. This restores its approved scenario after recognition; STEP2 does not need to be regenerated. `render_book` does not implicitly recognize unparsed materials. / 提供・生成した資料画像を使う場合、AIは描画前に `manga_run` の `apply_page` → `recognition` → 最新revisionの取得 → 再度 `apply_page` を実行します。素材解析後に承認済み台本へ戻すための処理で、STEP2を作り直す必要はありません。`render_book` が未解析資料を自動で認識するわけではありません。

Total pages include the cover. Cover numbering is separate. An approval request alone is not consent; a material plan change needs review, while resuming the same approved plan does not. / 総ページ数には表紙を含めます。表紙のページ番号を出すかどうかは別に指定します。確認を求めただけでは承認になりません。内容が変わる場合は変更後の案を確認し、同じ承認済み案の再開だけなら承認を繰り返し求めません。

## Pages and references / ページと資料

| Option / 項目 | Behavior / 扱い |
|---|---|
| Panels / コマ数 | OpenAI book pages support 1–8 panels; Gemini uses its existing four-panel route and rejects unsupported counts. / OpenAIの複数ページ制作は1～8コマ。A4縦の1コマ大コマ・縦2コマ・3コマを含みます。Geminiは既存の4コマ経路を使用し、未対応のコマ数を4へ丸めません。 |
| Color / カラー／白黒 | Common settings with explicit per-page overrides. / 作品共通の設定とページごとの上書きを使います。 |
| Cover / 表紙 | A full illustration, or a large opening panel with a pop title logo. / 1枚絵、または最初のページの上半分大コマとポップな題字。 |
| Author credit / 作者名 | The skill asks for a name or no credit. Set `presentation.authorName` on the cover page; prefer clear space at bottom right. / スキルが作者名または表記なしを確認し、扉ページの`presentation.authorName`へ保存します。右下の余白を基本に、人物や題字を避けて配置します。 |
| Presentation / 表示 | Title, watermark and page numbers are independent. / タイトル、ウォーターマーク、ページ番号は独立した指定です。 |
| Ending / 最終コマ | Choose ending words such as “END”, “おしまい” or “おわり” to suit the story, preserving an explicitly selected string. Place them inside the final panel at lower-right; if occupied, use lower-center, then lower-left, with lettering matching the title’s mood. Keep faces, necessary actions, dialogue, page numbers and footer marks readable. Ending lettering may overlap the artwork. / 終幕語は漫画に合う「END」「おしまい」「おわり」等を選び、明示した文字列はそのまま保ちます。最終コマの右下を基本に、空きがなければ下中央、次に左下へ置き、タイトルの雰囲気に合う字体を使います。顔・必要な動作・台詞・ページ番号・下端の表示を隠しません。 絵への重なりも指定できます。 |
| Composition / ページ演出 | Book pages retain full bleed, connected foreground figures and panel breakouts, including pages with 1–3 panels. / 複数ページでもタチキリ、コマをまたぐ前景人物、枠からのはみ出しを使えます。1～3コマでも、物語の見せ場に合わせて選びます。 When a person crosses a frame, the border and gutter are hidden behind the visible body or clothing. / 人物が枠を越えるときは、見える身体や衣装の後ろで枠線と溝を止めます。 |
| Shared assets / 共通資料 | Reuse canonical character, prop and setting assets. / 人物シート、小道具、背景を同じ資料として引き継ぎます。 |
| Previous page / 前ページ | An auxiliary continuity reference, not a replacement cast sheet. / 連続性の補助資料です。人物シートを置き換えず、新しい人物一覧として再解析しません。 |

Describe costume or setting changes per page. Inspect actual cast continuity, dialogue and reading order. Harmless differences are distinct from defects that break the scene. / 衣装替えや場所の移動は、ページ固有の変更として伝えます。登場人物・小道具の対応、台詞、読順は実画像でも確認してください。無理のない重なりや勢いのある誇張は許容し、微小な指定差だけで有料生成を繰り返さない運用です。

New projects start with `showWatermarks: false`. Set it to `true` at project or page level to enable page credits. Set `watermarkLeft` or `watermarkRight` to a single line of up to 80 characters, or use an empty string to omit that side. Unspecified text uses the inherited setting or the built-in credit. Page-level overrides allow credits on the final page only. Page numbers and author credit have independent settings. / 新規作品の `showWatermarks` は初期状態で `false` です。表示する作品またはページで `true` にします。`watermarkLeft` と `watermarkRight` で左右を各1行・最大80文字で指定でき、空文字ならその側を表示しません。文言の指定を省くと作品共通の値または初期文言を使います。最終ページだけの表示も指定できます。ページ番号と作者名は個別に設定します。

Unnumbered pages are excluded from the sequence. Body pages after an unnumbered cover start at 1 by default. `presentation.pageNumberStart` starts or restarts numbering at that page. / ページ番号を表示しないページは数えません。番号なしの表紙に続く本文は、初期値で1・2・3と進みます。`presentation.pageNumberStart`を指定すると、そのページから指定した番号で再開します。

PNG and JSON share a basename such as `作品タイトル_001ページ_20261116_164025`; a cover uses `表紙`. The timestamp is the saving computer's local date and time, down to seconds. A pair is committed only when both files are saved. A suffix distinguishes separate attempts in the same second without overwriting earlier files. Author credits are independent of application watermarks and do not repeat on body pages. / PNGとJSONは`作品タイトル_001ページ_20261116_164025`のように同名で保存し、表紙は`表紙`とします。日時は保存したパソコンの年月日時分秒です。両ファイルを揃えて保存を確定し、同じ秒の別生成は連番で区別して以前のファイルを残します。作者名はアプリのウォーターマークと独立し、本文へ繰り返しません。

## Discover operations / 操作の調べ方

Use the capability contract and current tool schemas; tool registration alone does not establish a working generation connection. / `manga_capabilities`の `contractVersion`、対応状況、設定一覧と、クライアントの最新ツールスキーマを使います。ツールが存在することだけで生成が可能とは限りません。

| Tool / 操作 | Purpose / 用途 |
|---|---|
| `manga_capabilities`, `manga_connection` | Capabilities and connection / 対応機能と接続 |
| `manga_project_create`, `manga_project_list`, `manga_project_get`, `manga_project_update` | Projects and common settings / 作品と共通設定 |
| `manga_page_update`, `manga_snapshot` | Page settings and snapshots / ページの設定と保存状態 |
| `manga_asset_import`, `manga_asset_list`, `manga_asset_assign` | Import, inspect and assign shared reference assets / 共通の参照資料を取り込み、一覧確認・割り当て |
| `manga_plan`, `manga_request_approval` | Plans and approval records / 構成と承認記録 |
| `manga_create_manga` | Outline, detailed plan or approved rendering / あらすじ、詳細台本、承認済み作品の生成 |
| `manga_run` | Production operations advertised by the app / 接続中のアプリが対応する制作操作 |
| `manga_edit` | Typed edits to the applied page, including supported history and panel actions / 適用中のページに対する編集、対応する履歴・コマ操作 |
| `manga_job_get`, `manga_job_list`, `manga_job_cancel`, `manga_job_resume` | Job state, cancellation, recovery and resumption / 実行状況、停止、結果の回収と再開 |

Mutations use an expected revision and idempotency key. Refresh on conflicts and inspect the existing job when responses are delayed. / 変更操作では、最新の `revision` と同一要求を識別する `idempotencyKey` を使います。古い版へ上書きせず、競合時は作品を読み直します。処理の応答が遅い場合も、既存のjob IDを調べてから対応します。

## Production skill / 制作スキル

[**Download the production skill (ZIP) / 漫画シナリオ制作スキルをダウンロード（ZIP）**](https://github.com/FURUYAN1234/nano-banana-pro/releases/latest/download/SuperFURU-Manga-Skill.zip)

The application ZIP also contains the complete skill in `mcp/skills/manga-book-production`. Use the separate ZIP when you only need the skill. Manual single-page production does not require it. / アプリZIPを展開したフォルダー内の `mcp/skills/manga-book-production` にも同じ一式を含めています。スキルだけが必要なら、上の単体ZIPを使えます。手動で1ページを制作する場合は不要です。

The skill can also produce a single page through MCP. It offers this workflow first for manga requests with no chosen method, asks once, and reuses an explicit or previously accepted choice. For one page, set `totalPages: 1` and keep any requested title on that page instead of adding a cover. / スキルからMCPを使う1P漫画制作にも対応します。方法が未指定の漫画依頼ではこの方式を優先して一度確認し、明示済み・了承済みなら聞き直しません。1Pは `totalPages: 1` とし、必要なタイトルも同じページに置いて別表紙を追加しません。

Codex is the primary skill client. With another MCP-capable AI, configure its connection and say: “Read the bundled SKILL.md and follow it to create a multipage manga.” Local execution and browser control depend on that client; the AI should explain any manual step rather than claim it has performed it. / 基本はCodex用スキルです。他のMCP対応AIでは接続を設定し、「同梱のSKILL.mdを読み、この手順で複数ページ漫画を制作して」と言葉で指示できます。ローカル実行やブラウザー操作の対応はAIクライアント次第です。自動操作できない箇所は手順を案内し、実行済みとは扱いません。

After saving and showing the finished pages, the workflow asks once about social sharing if the user has not decided. Draft-only requests produce proposed posts. Publishing requires approval of the specific destination, audience, text and images. / 全ページを保存して表示した後、SNS掲載の意向が未指定なら一度だけ確認します。下書き希望なら投稿案を渡します。実際の投稿には、投稿先・公開範囲・本文・添付画像に対する承認が必要です。

The bundled skill describes the production workflow. Install the entire skill directory in your client's supported skill location; the MCP server configuration is separate. / [manga-book-production/SKILL.md](skills/manga-book-production/SKILL.md)が、資料の確認から承認・連続生成・保存までの進行を記述しています。スキル対応クライアントでは、このフォルダー一式をクライアント所定のスキル配置先へ登録してください。MCP設定は別途必要です。

The distributed manga skill uses the work’s author credit, watermark preferences, and accurate AI-production disclosure. Social links are included when the user chooses them for the post. The optional, separately maintained personal preferences file is retained by the skill updater. / 配布スキルは作品ごとの作者表記・製品ウォーターマーク・実際のAI制作工程に従います。SNSには利用者が選んだリンクを添えます。導入先で別途作った個人設定ファイルはスキル更新時に引き継がれます。

Skill-only updates also enter the deployment workflow. The app bundle and separate skill ZIP use the same reviewed source; release announcements include relevant reference images showing the change. Publication still requires valid authorization for that release. / スキルだけの更新もデプロイ対象です。アプリ同梱版と単体スキルZIPは見直し済みの同じ正本から作り、公開更新の告知には変更内容が分かる参考画像を添えます。公開は、その版への有効な許可に従います。

Clients without skill installation can use the MCP prompt and resource instead. / スキルをインストールできないクライアントにも、MCPプロンプト `manga_book_workflow` とリソース `manga://skills/book-production` で同じ進め方を渡せます。

## Saving and resuming / 保存と再開

`verification.status` is `not_generated`, `not_saved`, `verified`, `failed` or `unconfirmed`. Readback covers the latest recorded PNG/JSON pair, recorded material hashes and manifest project identity, not every historical pair or a historical whole-JSON checksum. Destination resolution alone does not prove writable access. / `verification.status` は `not_generated`・`not_saved`・`verified`・`failed`・`unconfirmed`。検査対象は最新の記録済みPNG/JSON対、資料の記録hash、全体JSONの作品対応です。過去の全ペアやJSON全体の過去hashを検査したとは扱いません。保存先が見つかっただけでは書込可能と断定しません。

The current SDK discovery exposes 21 tools. Diagnostics appear at `manga_job_get.result.diagnostics` after the requested `read_state` job completes: at most 20 recent events and 64 KiB of event data, with each event context capped at 8 KiB. Failed-job `error.failureContext` is capped at 32 KiB and retains `originalLengths`/`truncatedFields`. Existing `manga_run` revision/idempotency fields still apply. / 現行SDKの取得結果は21ツールです。診断はread_state完了後の `manga_job_get.result.diagnostics` で取得し、直近最大20イベント・イベント合計64KiB、各文脈8KiBまでです。失敗jobの `error.failureContext` は32KiBまでとし、`originalLengths`・`truncatedFields` に省略を残します。`manga_run` の既存revision・idempotency指定も必要です。

For troubleshooting, `manga_job_get` can return sanitized `error.failureContext`. Request `manga_run` with `operation:"read_state"` and `input:{includeDiagnostics:true}` for an opt-in, bounded diagnostic summary from the connected browser origin, including ordinary single-page troubleshooting. Keys and image bodies are excluded; omitted context is identified, and warnings are distinct from failed jobs. / 不具合調査では `manga_job_get` の安全化済み `error.failureContext` を確認できます。`manga_run` に `operation:"read_state"` と `input:{includeDiagnostics:true}` を指定すると、接続中ブラウザーの同じURLの診断要約を明示的に取得し、通常1ページの不具合調査にも使えます。キー・画像本体を除き、容量上限による省略と、警告・失敗を区別します。

Book-detail authoring may add natural speech while preserving exact supplied lines and explicitly silent scenes; it does not require dialogue in every panel. It carries forward a bounded summary of the preceding page’s location, outfits and final object state, while explicit current-page scene, time or costume changes take priority. An unrequested entirely silent book draft is rejected; ordinary single-page and imported-source handling are unchanged. This describes the implementation, not verified acceptance of the usual-five sample. / 複数ページの詳細台本では、指定済みの台詞と明示された無言の場面を守りつつ、自然な会話を補えます。各コマへの台詞は強制しません。前ページの場所・衣装・最後の小道具の状態を長さ制限付きで引き継ぎ、当ページに明示した場面・時刻・着替えを優先します。依頼のない全編無言の案は拒否し、通常1ページや取り込み原文の扱いは変えません。実装の説明であり、いつもの5人の実生成合格を示すものではありません。

The private workspace stores project state, assets and jobs; completed PNG/JSON files are user deliverables without credentials. / 作品保存先には構成、設定、資料、ページ、実行状態を保持します。完成ページのPNGとJSONは利用者向けの成果物です。JSONには台本・画像指示文・設定・資料の対応を残し、APIキーを含めません。

When a revised page is adopted, the work folder holds its new PNG and matching JSON. Earlier pairs move to `履歴/`. Read `manga_save_status.pageVersions`, then submit `manga_edit` with `action: "history_select"`, `value: "saved_export"` and the earlier attempt ID as `historyId` on the applied page. The app reads the saved image and its original generation data without calling the image API. / 描き直しを採用すると、作品フォルダーには新しいPNGと同名JSONが並び、旧版の対は「履歴」に移ります。適用中のページについて `manga_save_status` の `pageVersions` で旧版のIDを確認し、上記の引数で `manga_edit` を実行すると、画像と元の生成情報を再採用できます。

Before production or resuming, the AI calls `manga_save_status(projectId)` to check automatic saving and the destination. MCP saves page PNG/JSON pairs, shared materials and the whole-book manifest directly; no browser download setting or folder picker is required. The tool distinguishes unsaved, missing, hash-mismatched and unreadable files using saved-file readback. It does not claim browser download permission is granted. Do not repeatedly ask the user to select the same destination. / AIは制作・再開の前に `manga_save_status(projectId)` で自動保存と保存先を確認します。MCPはPNG・JSON、共通資料、作品全体JSONを直接保存するため、ブラウザーのダウンロード設定やフォルダー選択は不要です。保存ファイルを読み戻し、未保存・欠落・ハッシュ不一致・読取不能を区別します。ブラウザーの保存許可を確認済みとは扱わず、同じ保存先の選択を繰り返し求めません。

Windows uses the registered Downloads folder, including a relocated folder. Each book has this layout: / WindowsではOSに登録されたダウンロードフォルダーを使います。保存先を移動している場合も、固定の `C:/Users/.../Downloads` を決め打ちしません。各作品は次の構成で保存します。

```text
Downloads/
└── 作品タイトル_20261116_160000/
    ├── 作品タイトル_表紙_20261116_164025.png
    ├── 作品タイトル_表紙_20261116_164025.json
    ├── 作品タイトル_001ページ_20261116_165010.png
    ├── 作品タイトル_001ページ_20261116_165010.json
    ├── 資料/
    │   ├── 人物名_キャラクターシート.png
    │   ├── 小物名_小物.png
    │   └── 背景名_背景.png
    └── 作品全体.json
```

A page is committed after both files are written. The book folder uses the title and project start time; each pair uses its save time. Shared materials have readable names under `資料/`, with their original supported image formats preserved. Empty plans do not create delivery folders. Keep the entire book folder so relative asset links remain usable. / PNGとJSONの両方を書き終えてから、そのページの保存を確定します。作品フォルダーはタイトルと作品開始日時、各ファイルは保存日時で区別します。共通資料は元の対応画像形式を保ち、`資料/`へ内容の分かる名前でまとめます。空の構成案だけでは成果物フォルダーを作りません。JSON内の相対パスを保つため、受け渡しや保管は作品フォルダー全体で行ってください。

`作品全体.json` ties the pages, materials and production records together. It retains available generation times, model/application versions, scripts, prompts, approvals and file hashes. Material sources or permissions that have not been established are marked unconfirmed; the application does not infer ownership. Private execution journals stay in the workspace. / `作品全体.json`には、ページと資料の対応に加え、確認できた生成日時・モデルとアプリの版・台本・指示文・承認記録・ファイルのハッシュをまとめます。素材の出典や利用許諾が確認できていない場合は未確認として扱い、所有権を推測で補いません。内部の実行記録は非公開のworkspaceへ保存します。

These records help explain how a work was made; they do not guarantee a publisher's acceptance or establish rights by themselves. Check the publisher's AI policy and the rights to supplied materials for the intended use. / 制作記録は、作品をどう作ったか説明するための資料です。出版社の受理や権利を保証するものではありません。提出先のAI利用方針と、持ち込む資料の利用条件を別途確認してください。

Inspect the project and original job after interruption. Keep completed pages and resolve uncertain outcomes before repeating a paid request. / 停止や通信切断の後は、作品と同じjob IDの状態を読みます。完了したページを再生成せず、結果が不明な有料処理を自動で繰り返しません。新しく作り直す場合は、既存結果を残したうえで明示的に操作します。

Recovery distinguishes verified retained results, abandoning an unresolved attempt without a new request, and an explicit retry. Retained-result recovery requires matching successful `read_state` evidence. Retrying an unknown outcome may incur another provider charge. / `manga_job_resume`では、取得済みの結果を確認して回収する `use_retained_result`、再生成せずその実行を終了する `abandon`、明示的に再試行する `retry`を区別します。結果の回収には、同じ作品・ページ・元の実行を示す `read_state`の成功結果が必要です。結果不明の処理を再試行する `retryUnknown`は、追加のAPI料金が発生する可能性があります。

A result generated from an older plan cannot overwrite a newer edit. The original job retains that result for inspection. / 生成を待っている間に案を変更した場合、古い案の結果で最新の編集内容を上書きしません。競合した結果は元のjobへ保持されるため、内容を確認してから扱いを決めます。

The original-color sample was generated through the real MCP path: one illustrated cover and three body pages with 1, 2 and 3 panels. PNG/JSON pairs, shared materials, previous-page references and the whole-book manifest were read back with matching hashes, and the pages were visually accepted. The usual-five monochrome sample and ordinary native-browser folder saving remain unverified; private package tests do not replace those checks or an official release. / オリジナル人物のカラー作品は実MCP経路で、1枚絵表紙と1・2・3コマの本文3ページを生成しました。PNG/JSON、共通資料、前ページ参照、作品全体JSONを読み戻してhash整合を確認し、画像も目視で受け入れました。いつもの5人の白黒作品と、通常ブラウザーの直接フォルダー保存は未検証です。private配布候補の検査を、これらの実物確認や正式公開の代わりにはしません。

Shared-material exports serialize readable-name assignment so concurrent saves cannot assign one filename to different assets. Page preparation and recognition use the target project context and isolate restored history, preventing references from an earlier project from entering its snapshot or portable manifest. If saving or recognition fails, inspect the original job and `manga_save_status` before retrying; a completed API response alone does not establish a saved result. / 共通資料の保存名は同時処理でも割当を直列化し、異なる資料へ同じ名前を割り当てません。ページ適用・認識では対象作品の文脈と復元履歴を分離し、前の作品の資料がスナップショットや持ち運び用の全体JSONへ混ざるのを防ぎます。保存・認識の失敗時は再試行前に元jobと `manga_save_status` を確認し、API応答の完了だけを保存成功とは扱いません。

Book-page title, location and outfit metadata are carried into the shared STEP3 drawing instructions and review context even when the approved scenario contains only panel bodies. This preserves the approved script while preventing a missing page title or a return to cast-default clothing merely because the header metadata was absent. Actual image acceptance is still separate. / 承認済み台本がコマ本文だけの場合も、ページ別の題名・場所・衣装を共通STEP3の描画指示と検査へ引き継ぎます。承認台本を変えず、見出し情報の欠落だけで題名が無題になったり、人物設定の標準衣装へ戻ったりするのを防ぎます。実画像の受け入れ確認は別途行います。

MCP scenario generation follows the selected manual/news input mode, including the configured news categories and date. Manual text is kept literal; empty manual input or missing news categories stops before a provider call. This routing is regression-tested, not a claim of new live news-API acceptance. / MCPの台本生成は自由入力／ニュースの選択に従い、ニュース分類と日付を引き継ぎます。自由入力は原文を保ち、空入力やニュース分類未選択はAPI送信前に止めます。経路の回帰検証済みという説明であり、新たなニュース実APIの合格を示すものではありません。

Save-status checks distinguish assets required by the current manifest/latest page JSON from unreferenced historical index entries. Historical missing files remain visible under `materials.historicalIndex` and `verification.historicalIndexIssues`, without turning a valid current delivery into a failure. Missing or mismatched current references still fail. / 保存状態では、現行の作品全体JSON・最新ページJSONに必要な資料と、現在は参照しない過去indexを分けます。過去の欠損は `materials.historicalIndex` と `verification.historicalIndexIssues` に残し、正常な現行成果物を失敗扱いにしません。現行参照の欠落や不一致は引き続き不合格です。

If an earlier application is still paired but cannot be opened, confirm that the user wants to switch from that idle connection. Request `manga_connection({replaceIdle:true})`, open the resulting URL in the current chat, and select **Allow AI control**. The server checks that the earlier connection is still the one selected and refuses queued, running, or unresolved work. The earlier session is invalidated only after the new application connects. / 前の画面を開けないままMCP接続だけ残った場合は、待機中の接続を切り替える本人の指示を確認し、`manga_connection({replaceIdle:true})` のURLを作業中のチャットで開いて「AI操作を許可」を押します。旧接続が変わった場合や、待機キュー・実行中・結果不明の処理がある場合は接続を切り替えません。新しい画面の接続が成立したときだけ前のセッションが失効します。

If the short-lived pairing URL expires while waiting for API entry, obtain a fresh URL with `manga_connection` and update only the existing tab’s URL fragment, then allow AI control. Keep the connected API session; no reload or key re-entry is needed. This recovery does not authorize automatic reconnection after the user presses Stop. / API入力待ちで接続URLの期限が切れた場合は、`manga_connection` でURLを更新し、既存タブのhashだけを変更してAI操作を許可します。API接続を保ったまま復旧でき、再読込やキー再入力は不要です。利用者が停止ボタンを押した後の自動再接続は行いません。

## Material project save ownership / 衣装・資料作品の保存先

Use `manga_project_set_save_owner` with the material `projectId`, the current work's `ownerProjectId`, `expectedRevision` and `idempotencyKey`. The material project's folder is saved inside the work's existing folder under `資料`, including every historical PNG/JSON pair, portable references and its own whole-project JSON. Existing outside originals are preserved. Future saves use the same nested folder. The owning work's whole-project JSON links to the material project's manifest. / 衣装・資料を別作品で制作する場合は、この操作で現行作品を保存先に設定します。過去のPNG・同名JSON、参照画像、作品全体JSONを現行フォルダー内の「資料」へまとめ、以後の保存も同じ場所を使います。元の別フォルダーは削除しません。

Wait for both projects' active jobs to finish first. This is a save-only setting: story approval and provider generation are unchanged. Another owner, cycles, links, changed source hashes and different existing destination bytes are rejected. After a copy failure, retry the same request once the reported conflict is resolved; never overwrite the conflicting user file. This operation requires the updated MCP backend, but no browser connection or paid API call. / 両作品の生成終了後に設定します。保存専用の関連であり、台本の承認には影響しません。別作品への再所属、循環、リンク、改変済み原本、保存先の異なる内容は拒否します。コピー失敗時は原因を解消した後に同じリクエストを再試行できます。
