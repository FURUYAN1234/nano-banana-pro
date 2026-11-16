# Third-party notices / 第三者ソフトウェア通知

This project uses third-party software. Their licenses apply to their
respective components. The following application runtime dependencies are
recorded from [package-lock.json](package-lock.json), checked on 2026-11-16:

| Component | Version | License |
| --- | ---: | --- |
| @tailwindcss/postcss | 4.1.18 | MIT |
| budoux | 0.10.3 | Apache-2.0 |
| clsx | 2.1.1 | MIT |
| framer-motion | 12.27.5 | MIT |
| lucide-react | 0.562.0 | ISC |
| react | 19.2.3 | MIT |
| react-dom | 19.2.3 | MIT |
| tailwind-merge | 3.4.0 | MIT |
| three | 0.184.0 | MIT |

The local MCP package has a separate [dependency lock](mcp/package-lock.json).
Its production dependencies include the MCP server, core, Node HTTP adapter,
client and `zod`. The client package connects the included stdio adapter to the
shared local HTTP service and is also used by the protocol tests.

| MCP component | Version | License |
| --- | ---: | --- |
| @modelcontextprotocol/server | 2.4.0 | Apache-2.0 |
| @modelcontextprotocol/core | 2.4.0 | Apache-2.0 |
| @modelcontextprotocol/node | 2.1.2 | Apache-2.0 |
| @modelcontextprotocol/client | 2.4.0 | Apache-2.0 |
| zod | 4.6.7 | MIT |

The complete dependency graph and license texts are available from the
corresponding package distributions. This notice does not grant rights in
third-party software, user uploads, or material that is not explicitly covered
by this repository's license documents.

本プロジェクトには第三者ソフトウェアが含まれ、それぞれのコンポーネントには各ライセンスが適用されます。上表は2026年11月16日にロックファイルで確認したアプリの実行時依存関係と、ローカルMCPで使う主要コンポーネントです。MCPクライアントのパッケージは、同梱のstdioアダプターから共通のローカルHTTPサービスへの接続、および検査に使います。完全な依存関係は上記ロックファイル、ライセンス本文は各パッケージ配布物で確認してください。本書は、第三者ソフトウェア、ユーザーアップロード、または本リポジトリのライセンス文書で明示されていない素材に関する権利を許諾するものではありません。
