## 🚀 Changes in v2.30.0-alpha /変更点

### 🎨 Character Consistency Logic / キャラクター同一性の強化
- **Anti-Cloning Enforcement (クローン防止プロトコルの強化)**:
  - Characters specified in solo-shots will NEVER duplicate. Explicit SINGLE CHARACTER rules are enforced to prevent AI hallucination.
  - (1人だけのコマでAIが勝手に話し相手を捏造・増殖させる問題を防ぐため、「SOLO SHOT」ルールを追加しました)
- **Gag & Emotion Text Filtering (オノマトペやギャグSFXの吹き出し化防止)**:
  - Visual actions ending in Japanese SFX (e.g., ズコー, ドッ, ガーン) are now cleaned to prevent them from being drawn as ugly text bubbles.
  - (シチュエーション文の最後に「ズコー」等のオノマトペがある際、AIがそれを文字として巨大な吹き出しに書いてしまう問題を修正しました)

### ⚙️ Engine Improvements / その他の改善
- **SKETCH Emotion Removal**: The rough sketch emotion has been fully deprecated across all generation components to maintain high visual quality.
  - (ラフスケッチ風の画風変更オプションを完全廃止し、パニック時も高クオリティな作画を維持するようにしました)
