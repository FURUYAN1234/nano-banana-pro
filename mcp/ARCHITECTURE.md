# Application, MCP and production skill / アプリ・MCP・制作スキルの分担

The application and the multipage production skill can evolve separately. The MCP contract connects them; the skill does not contain a copy of the application's drawing prompts or provider requests. / 1ページ漫画アプリと複数ページ制作スキルは、MCPの呼び出し仕様を介して別々に開発します。スキルへ描画プロンプトやAPI処理を複製しません。

## Ownership / 担当する処理

| Layer / 層 | Responsibility / 担当 |
|---|---|
| Application / 漫画アプリ | Reference analysis, story construction, scenario enhancement, panel composition, image prompts, generation and editing. The UI and MCP use the same implementations. / 素材解析、物語設計、シナリオ強化、コマ構成、画像指示文、生成、修正。画面操作とMCP操作で共通の実装を使います。 |
| MCP server and adapter / MCPサーバー・接続部 | Typed operations, capability negotiation, projects and jobs, revision checks, approval records, asset references and exports. / 操作仕様、対応機能の照合、作品と実行状態、版の照合、承認記録、資料の対応、出力。 |
| Production skill / 複数ページ制作スキル | Discuss the brief, select or create characters, develop and present the book plan, obtain the user's decision, sequence the pages and inspect results. / 依頼の整理、キャラクター準備、全体構成の提案と確認、本人の判断、ページ順の制作、結果の確認。 |
| User / 利用者 | Creative intent, source materials, API connection and approval of the detailed production plan. / 制作意図、資料、API接続、詳細な制作案への承認。 |

For example, improving G-pen rendering in the application benefits pages created through either interface. Changing a skill's approach to cover design or chapter pacing does not require a second image generator. / 例えばアプリのGペン描写を改善すると、画面操作とMCPの両方へ反映できます。表紙の提案や物語のテンポをスキル側で改善するために、別の描画エンジンを作る必要はありません。

## Compatibility boundary / 互換性の境界

- Read `manga_capabilities` and the live tool schemas when starting or resuming a session. `contractVersion` describes this application's contract; it is separate from the MCP protocol version and the application release number. / 開始・再開時は能力表と現在のツール仕様を読みます。`contractVersion`はアプリ独自の呼び出し仕様の版で、MCP規格の版やアプリの製品版番号とは別です。
- An operation marked `planned` is not a working feature. A connected browser must also advertise the operation before it is submitted. / `planned`は未実装です。実行には接続中のアプリもその操作に対応している必要があります。
- Keep existing parameter meanings and explicit `false` values. New optional features should have defaults that preserve existing behavior. Incompatible semantics require a new contract and a clear refusal by unsupported clients. / 引数の意味と明示的な`false`を保持します。任意項目の追加では従来の動作を初期値にし、互換性を壊す変更は仕様の版を分け、非対応時は明確に停止します。
- Use returned project, page and job IDs. Mutations carry an expected revision and an idempotency key; callers must not retry paid work with a new key merely because a response is late. / 返された作品・ページ・実行IDを使います。更新対象の版と重複防止キーを指定し、応答が遅いだけで新しいキーの有料生成を投入しません。
- Test both entry points when changing shared generation behavior. A successful protocol response proves delivery, not the quality of the resulting manga. / 共通生成処理を変更したら画面とMCPの両方を確認します。通信成功と、実画像の成立は分けて検証します。

The shared page contract can describe a one-panel page or a longer panel sequence. Book context supplies what happened before and what this page must accomplish. It must not force every page to repeat a complete standalone setup and punchline. / 共通のページ仕様で1コマから複数コマのページを扱います。複数ページでは前後の出来事と当該ページの役割を渡し、各ページに単独作品の導入とオチを繰り返させません。

Book pages use the shared `PageComposition` fields for full bleed, connected foreground figures and panel breakouts. Low panel counts do not disable these effects; select them for the scene while retaining legible dialogue, necessary action and reading order. / 複数ページでも共通の`PageComposition`によるタチキリ、コマをまたぐ前景人物、枠からのはみ出しを使います。1～3コマでも無効にせず、台詞・必要な動作・読順を保って場面に合わせて選びます。

## Assets and approval / 資料と承認

Canonical character sheets, props and setting images keep stable asset IDs and content hashes. A previous page is an auxiliary continuity reference; it does not replace character identity sheets. Generated assets that fulfill an approved specification and later manual changes are distinct events. / 人物・小道具・背景の基準資料には固定のIDと内容ハッシュを持たせます。前ページは連続性の補助資料であり、人物シートの代わりにしません。承認済み仕様からの資料生成と、その後の手動変更を区別します。

The approval record refers to the exact presented plan. Requesting approval does not grant it. A material change invalidates the previous approval; completing or resuming the same approved plan does not require repeated consent. / 承認は提示した案そのものに対応させます。確認を求めただけでは承認になりません。内容の変更は以前の承認を無効にし、同じ承認済み案の実行・再開では再確認を繰り返しません。

Provider keys stay in the application's API session. MCP project data, logs and exported production JSON must not contain them. / APIキーはアプリの接続セッションに置き、MCPの作品データ・ログ・制作情報JSONへ含めません。

## Independent development / 別々に改善する手順

1. For a drawing or scenario improvement, change the shared application implementation and verify ordinary pages plus representative MCP pages. / 描画・台本の改善はアプリの共通実装へ入れ、通常のページとMCP経由のページで確認します。
2. For a planning or interaction improvement, update the portable [production skill](skills/manga-book-production/SKILL.md) and exercise it against the current capability contract. / 作品構成や対話の改善は制作スキルを更新し、現在の呼び出し仕様で実行します。
3. For a new operation, add its schema and implementation, advertise it only when usable, and update the consumer documentation and relevant acceptance checks. / 新しい操作は仕様と実装を追加し、実際に使える段階で能力表へ反映して、説明書と必要な検証を更新します。

This separation reduces coupling; it does not remove the need for integration tests when the contract or shared behavior changes. / この分担で変更の影響を抑えられますが、呼び出し仕様や共通動作を変えた場合の接続検証は必要です。
