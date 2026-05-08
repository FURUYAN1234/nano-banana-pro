## 🚀 v3.11-alpha: Anti-Character-Sheet Reinforcement

### 🐛 Bugfix / バグ修正

*   **[Bugfix]** ChatGPTモードで画像生成時、添付されたキャラクターシートを「4コマ漫画のシーン」ではなく「キャラクターシートそのもの」として再現してしまう重大なバグに対処しました。プロンプトの**冒頭**（ChatGPTが最も強く読み取る位置）にアンチ・キャラシート再現指示を挿入し、末尾のルールも大幅に強化しました。 / Fixed a critical issue where ChatGPT's image model reproduced the attached character reference sheet instead of generating a new 4-panel manga scene. Added a strong anti-reproduction directive at the **beginning** of the prompt (where the model pays most attention) and reinforced the footer rules.
