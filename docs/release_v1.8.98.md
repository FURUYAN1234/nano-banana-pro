# v1.8.98 Alpha

## Right-to-Left "Mirror World" Logic / 左右反転ロジック (Positioning Fix)

### 🚀 New Features / 新機能

* **Mirror World Logic / ミラーワールドロジック**:
  * Implemented a strong "Horizontal Flip" instruction to counteract the AI's Western "Left-to-Right" bias. / 欧米の左横書きバイアスを打破するため、「世界全体を左右反転して描画する」という強力な空間指示を追加しました。
  * **Right-to-Left Enforcement / 右から左への視線誘導**:
    * **RIGHT HALF**: Past / Action / First Speaker (主人公・発言者)
    * **LEFT HALF**: Future / Reaction / Listener (聞き手・リアクション)
    * This ensures the manga reads naturally in the Japanese style. / これにより、マンガの視線誘導が自然な「右から左」になります。

### 🔧 Improvements / その他の改善

* **Character Positioning Fix**: Solved the issue where speakers were appearing on the wrong side in Panels 1 & 2. / 1コマ目と2コマ目でキャラの立ち位置が逆になる不具合を修正しました。
* **Emotion Override (v1.8.97)**: Retained the logic to force panic faces for "Demon King" characters when screaming. / 魔王などの強キャラが悲鳴を上げた際に、キャラ崩壊（怯え顔）を強制するロジックも継続して搭載しています。
