## 🇯🇵 日本語
- **不具合修正 (Bug Fix)**: 新しいシナリオを生成した際に、前回のシナリオ強化状態（元のシナリオ、強化ログ）がリセットされず、「強化済」の表示が残ったままになったり、「強化前に戻す」を実行した際に古いシナリオが復元されてしまう問題を修正しました。シナリオ生成開始時に確実に状態をクリアするようになりました。

## 🇺🇸 English
- **Bug Fix**: Fixed an issue where the Scenario Enhancement state (original scenario, enhancement logs) was not properly reset when generating a new scenario. This caused the UI to incorrectly display the "Scenario Enhanced" status and the "Revert" button to unexpectedly restore a scenario from a previous session. States are now properly cleared at the beginning of scenario generation.
