## 🎨 Context-Aware Outfit Auto-Selection / 文脈認識型 服装おまかせ選定
Replaced the previous "character sheet default" behavior: when the Outfit field is left blank, AI now analyzes the scenario context (situation, location, mood) and autonomously assigns specific attire names (swimwear, suits, uniforms, etc.) instead of vague defaults. Unified with the same "AI Auto-Select" behavior as the Location field.
服装（Outfit）の文脈認識型自動選定システムを実装。空欄の際、従来の「キャラシート準拠」デフォルト動作を廃止し、AIがシナリオの状況・場所・文脈を分析して、適切な服装（水着、スーツ、制服等）を具体的な衣装名で自律的に選定・適用するように改善しました。場所（Location）と同等の「AIおまかせ」挙動に統一されています。

## 🖥️ UI & Infra Improvements / UIとインフラの改善
* **Generation Preview / プレビュー表示の改善**: Unified the Generation Preview display for Location and Outfit fields. User-specified values are shown in white, while AI-selected values are shown in blue with an ✨ icon for clear visual distinction. / 生成プレビューでの場所・服装表示を統一。ユーザー手入力値は白文字、AIおまかせ選定値は青文字＋✨アイコンで視覚的に区別可能になりました。
* **Local Proxy / ローカルプロキシ**: Added a Vite reverse proxy for local development to bypass browser Origin header API key rejection on `localhost`. / ローカル開発環境向けにViteリバースプロキシを導入し、`localhost`でのブラウザOriginヘッダーによるAPIキー拒否問題を解消しました。
* **Cleanup / 整理**: Cleaned up unnecessary temporary files and backup scripts from the repository. / リポジトリから不要な一時ファイルやバックアップスクリプトを整理・削除しました。
