# v2.77.0-alpha — Enhanced GPT-image-2 Anti-Noise Protocol / GPT-image-2ノイズ対策プロトコル大幅強化

## What's New / 変更点

### ✨ Feature / 新機能

- **Enhanced GPT-image-2 Anti-Noise Protocol**: Integrated comprehensive noise countermeasures based on community research to significantly improve image quality when using ChatGPT Images 2.0 mode.
  - **Positive Safe Rendering Block**: Injected safe rendering keywords (`smooth cel shading`, `clean color surfaces`, `low texture density`, etc.) to actively guide the model toward clean output.
  - **Banned Prompt Word Combinations**: Explicitly blocked dangerous combinations (`ultra-detailed + film grain`, `realistic texture + micro details`, etc.) known to trigger noise artifacts.
  - **Light Effect Substitution Table**: Replaced noise-inducing light effects (`sparkling particles` → `soft glow`, `glowing dust` → `clean bloom`, `Tyndall effect` → `smooth light diffusion`, etc.) in the Lighting Enhancement prompt.
  - **Technical Quality Definitions Cleanup**: Replaced `highly detailed` → `clean anime illustration`, `sub-surface scattering` → `soft diffused backlighting with gentle rim light`, added `low texture density` and `smooth cel shading`.

- **GPT-image-2ノイズ対策プロトコル大幅強化**: コミュニティの研究成果に基づく包括的なノイズ対策を統合し、ChatGPT Images 2.0モード使用時の画質を大幅に向上。
  - **ポジティブ安全レンダリングブロック**: 安全なレンダリングキーワード（`smooth cel shading`, `clean color surfaces`, `low texture density`等）を能動的に注入し、クリーンな出力を誘導。
  - **禁止ワード組み合わせリスト**: ノイズを誘発する危険な組み合わせ（`ultra-detailed + film grain`, `realistic texture + micro details`等）を明示的にブロック。
  - **光の演出置き換え表**: ノイズの原因となる光演出表現を安全な代替に自動変換（`sparkling particles` → `soft glow`, `glowing dust` → `clean bloom`, `Tyndall effect` → `smooth light diffusion`等）。
  - **Technical Quality定義のクリーンアップ**: `highly detailed` → `clean anime illustration`、`sub-surface scattering` → `soft diffused backlighting with gentle rim light`に置換し、`low texture density`と`smooth cel shading`を追加。
