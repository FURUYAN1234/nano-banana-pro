## 🚀 v3.08-alpha: Pre-flight Intelligence Audit & Critical API Migration

### ⚙️ System / システム

*   **[System]** OpenAI `dall-e-3` APIの提供終了（2026年5月12日）を目前に控え、後継モデルである `gpt-image-2` への緊急マイグレーションを実施しました。これにより、ChatGPTモードでの画像生成機能の完全停止を未然に防ぎました。 / Proactively migrated from the deprecated `dall-e-3` model (shutting down May 12, 2026) to its successor `gpt-image-2` to prevent a complete outage of the ChatGPT image generation mode.
*   **[System]** Gemini APIの `gemini-3.1-flash-lite-preview` 廃止（2026年5月25日）に先立ち、正式リリース版（GA）である `gemini-3.1-flash-lite` へフォールバックロジックを更新しました。 / Updated the Gemini API fallback logic to use the generally available `gemini-3.1-flash-lite` model ahead of the preview version's deprecation on May 25, 2026.
*   **[Docs]** 今後の全てのデプロイ作業前に、APIの提供終了や仕様変更をWebから自動収集・監査する「Pre-flight Intelligence Audit (事前監査)」プロセスを、開発エージェント規約（`AGENTS.md`, `deploy.md`）に公式導入しました。 / Implemented a mandatory "Pre-flight Intelligence Audit" protocol in the agent guidelines to actively monitor and preemptively resolve API deprecations before any future deployments.
