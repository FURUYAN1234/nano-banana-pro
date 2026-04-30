## Nano Banana Pro v2.89.0-alpha Release

### Highlights 🚀
* **Security Hardening (In-Memory Keys)**: Re-architected OpenAI API key management. All keys are now stored strictly in volatile memory (RAM) and are completely purged upon browser reload. Removed all `localStorage` persistence to guarantee maximum security.
* **Codebase Clean-up & UI Stability**: Removed all temporary backup files, debug scripts, and raw text logs from the root directory. Restored the centered sticky progress bar UI and ensured fully responsive behavior for the "Full Auto" controls.

### 日本語アップデート内容 🚀
* **セキュリティ強化（完全インメモリ化）**: OpenAI APIキーの管理手法を再設計しました。キーは揮発性メモリ（RAM）上にのみ厳格に保持され、ブラウザのリロード時に完全に消滅します。`localStorage` への永続保存を廃止し、機密情報の漏洩リスクを根絶しました。
* **コードベースの大掃除とUI安定化**: ルートディレクトリに存在していた大量のバックアップファイル、デバッグスクリプト、差分ログなどのゴミファイルを一括削除しました。また、進行状況バーを常に上部中央に固定（Sticky Top）するUIを復旧させ、フルオート機能の操作パネルをレスポンシブに最適化しました。

