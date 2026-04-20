## What's New / 変更点

### 🎬 ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL v3.2
### 🎬 カメラワーク超強化プロトコル v3.2

**EN:**
- Integrated the Antigravity Hyper-Dynamic Camera Protocol v3.2 — a comprehensive overhaul of manga panel composition to enforce extreme, non-eye-level camera angles in every panel.
- Added **OVERRIDE PROHIBITION** to prevent the AI from softening distortion for "readability" or "narrative flow."
- Added **MANDATORY LENS ENFORCEMENT** blocks to each panel requiring visible proof of distortion (angled horizon, body proportion warping, architectural line bending).
- Added **FINAL COMPLIANCE CHECK** — a mandatory pre-generation checklist ensuring all 4 panels use different, visibly distorted camera angles.
- Expanded camera angle pool to 10 highly specific angles with physical distortion parameters (fish-eye, telephoto compression, dutch angle, etc.).

**JP:**
- ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL v3.2を統合。全4パネルにおいて極端なカメラアングル（魚眼、望遠圧縮、ダッチアングル等）を強制する構成革新。
- AIが「可読性」を理由にカメラ歪みを無視するのを防ぐ **OVERRIDE PROHIBITION（無視禁止条項）** を追加。
- 各パネルに **MANDATORY LENS ENFORCEMENT（強制レンズ効果）** ブロックを追加。地平線の傾斜、身体比率の歪み、建築線の曲がりなど可視的な証拠を要求。
- 出力前に全パネルの歪みを検証する **FINAL COMPLIANCE CHECK（最終適合チェック）** を追加。
- カメラアングル配列を物理歪みパラメータ付きの具体的な10種類に拡張。

### 👥 Mandatory Background Cast / 背景キャスト強制描画

**EN:**
- Changed `SUGGESTED BACKGROUND CAST` to `MANDATORY BACKGROUND CAST (DO NOT OMIT)` — background characters are no longer optional.
- Added `INCOMPLETE` failure condition when panel has fewer characters than specified total count.
- Updated Identity Anchoring to explicitly prevent omitting background characters for rendering optimization.

**JP:**
- `SUGGESTED BACKGROUND CAST` を `MANDATORY BACKGROUND CAST (DO NOT OMIT)` に変更。背景キャラクターの描画を任意から必須に昇格。
- パネル内の人物数が指定合計より少ない場合を「INCOMPLETE（不完全）」として再描画を要求。
- アイデンティティアンカリングの §3 を更新し、レンダリング最適化を理由に背景キャラを省略することを明示的に禁止。

---
**Full Changelog**: https://github.com/FURUYAN1234/nano-banana-pro/compare/v2.52.0-alpha...v2.53.0-alpha
