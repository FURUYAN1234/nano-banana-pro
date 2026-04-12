## 🚀 Changes in v2.35.0-alpha /変更点

### 🛡️ Content Policy Rescue / コンテンツポリシー救済パネルの強化
- **Smart Collapsible UI (直感的な折りたたみUI)**:
  - The Rescue Panel now automatically expands only when an AI Content Policy Error is detected, maintaining a clean UI without unnecessary whitespace.
  - (画像生成が安全基準でブロックされた時だけパネルが自動展開される、完全折りたたみUIを実装。不要な余白をゼロにしました)
- **Prompt Integrity Lock (修正プロンプトの完全維持)**:
  - The AI prompt advisor is now strictly guided via Meta-Prompting to preserve the exact length, detail, and comma-separated tag format of the original prompt when replacing blocked words.
  - (AIにお任せで修正させるとプロンプト全体が短く要約されてしまう問題を修正。問題箇所のみを置換し、オリジナルの構図やディテール情報を100%維持するようにメタプロンプトを厳格化しました)

### 🎥 Camera & Expression / 構図と表現の自由度向上
- **Low Angle Unlocked (アオリ構図の制限解除)**:
  - Disabled the aggressive Level-8 camera angle safety filter. Low Angle (Worm's Eye) shots are now allowed to pass through the initial generation phase, significantly improving dynamic depth in manga panels.
  - (セーフティフィルターの『レベル8: 極端なローアングル強制置換』を無効化し、アオリ構図を解禁。ダイナミックなコマ表現を作りやすくなりました。もし弾かれた場合は救済パネルで対処する攻防分離設計です)
