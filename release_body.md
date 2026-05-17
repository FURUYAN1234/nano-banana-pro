v3.57-alpha: OpenAI API Direct Generation / OpenAI API アプリ内直接生成機能の正式昇格

## What's New / 更新内容
- Promoted OpenAI API generation from experimental to official feature, updated docs to reflect in-app direct generation. / OpenAI API (ChatGPT Images 2.0) による画像生成を「テスト機能」から「正式機能」へ昇格。アプリ内で直接生成可能になった旨をドキュメントに追記。
- Improved API key saving logic to allow browser password managers to independently save and autocomplete Gemini and OpenAI keys. / APIキー保存ロジックを改善。Gemini用とOpenAI用のパスワード保存フォームを分離し、ブラウザのパスワードマネージャーが両方のキーを別々に自動記憶・復元できるよう最適化。
- Fixed a fallback warning bug where successful OpenAI generations were falsely flagged as compromised lower-tier generations. / OpenAI API（gpt-image-2）で正常に生成完了したにもかかわらず「下位モデルで妥協生成された」と誤判定されるフォールバック警告バグを修正。
- Removed invalid response_format parameter from OpenAI API requests and fixed error handling to differentiate bad requests from content policy violations. / OpenAI画像APIで無効なパラメータ（response_format）を送信していた問題を修正。また、APIレスポンスエラー時のメッセージ分岐を修正し、不正なパラメータエラー時に「コンテンツポリシー（NSFW）違反」と誤案内される問題を解消。
- Extended OpenAI API timeout from 180s to 240s and added a waiting time notice to the progress log. / OpenAI APIのタイムアウト時間を180秒から240秒に延長し、混雑時のタイムアウトを緩和。進捗ログに2〜4分かかる旨の事前案内を追加。
