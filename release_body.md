# Nano Banana Pro v2.60.0-alpha

🚀 **Dynamic Camera Recovery & Scenario Normalization Update**

## 🔧 Fixes & Optimizations
*   **Camera Lens Mapping [Critical Fix]**: Fixed an issue where Extreme Camera Angles (v2.55) were being stripped of their specific lens distortion weights (fish-eye, telephoto, dutch angle, etc.) during generation. AI-selected camera names are now explicitly mapped to heavy weighted lens tags, restoring the hyper-dynamic camera distortion.
*   **Scenario Enhancements Normalized**: Removed the hardcoded *Extreme Reaction Mandate* from the default prompt. Over-the-top character reactions (e.g. "eyeballs popping out", "veins exploding") will now only occur when manually toggled, restoring natural expression flow to standard generations.
*   **Eye Contact Prohibition (v2.0)**: Increased the Negative weight of looking directly at the camera (1.7 -> 2.5) to enforce characters looking at each other or the environment.

---

# Nano Banana Pro v2.60.0-alpha

🚀 **カメラワーク復元 ＆ シナリオ過剰演出の適正化アップデート**

## 🔧 修正・調整内容
*   **極限カメラアングルの復元 [重要]**: v2.55で追加された「指定カメラアングル」において、AIがタグを出力した際に具体的なレンズ効果（フィッシュアイ、望遠圧縮、ダッチアングル等）が無視される重大なバグを修正。AIの出力名に対応した極限ウェイトタグが重畳され、画面の物理的な歪みが完全に復元されました。
*   **シナリオの自然化（過剰演出の解除）**: デフォルト状態で常時発動していた「リアクション描写の極限化」をプロンプトから除去。眼球が飛び出すなどの過度な表現は「強化ボタン」押下時のみに限定され、標準生成時は自然な表情作りが行われるようになります。
*   **カメラ目線（第四の壁破壊）の強力な抑制**: 「カメラ（読者）を見ない」という制約のウェイトを強化（1.7 → 2.5）し、キャラクター同士が会話・視線を合わせる自然な構図を促進しました。
