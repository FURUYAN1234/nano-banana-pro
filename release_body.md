## 🚀 v3.10-alpha: OpenAI API Text & Rule Update

### 📝 UI / UI更新

*   **[UI]** OpenAIの画像API（ChatGPT Images 2.0）において、現在サードパーティ製アプリからの直接生成が事実上制限されている状況を受け、テスト機能の注意書きテキストを修正しました。 / Updated the disclaimer text for the OpenAI Image API test feature to clarify that direct generation from third-party apps is currently restricted by the API.

### 🛡️ Rules / ルール追加

*   **[Rules]** デプロイ前の事前監査プロトコル（Pre-flight Intelligence Audit）に、「OpenAI APIの制限解除チェック」を追加しました。将来的に制限が解除され次第、速やかに機能を再開する体制を整えました。 / Added an "OpenAI API restriction check" to the pre-deployment audit protocol to actively monitor when third-party image generation is allowed again.
