## What's Changed / 変更内容

### 🔧 Bug Fixes / バグ修正

**Character Identity Preservation / キャラクター一貫性の強化**
- 🔒 BLANK (白目) style now preserves glasses on glasses-wearing characters / BLANK（白目）スタイルで眼鏡キャラの眼鏡が消えなくなりました
- 🔒 CHIBI_GAG style now preserves glasses in super-deformed form / ちびデフォルメでも眼鏡が保持されるようになりました
- 💇 Hairstyle extraction now prioritizes distinctive styles (twintails, hime cut) over generic (long hair) / 髪型抽出がツインテール等の特徴的スタイルを優先するようになりました
- ✨ GLITTER style no longer causes hair length changes (removed "flowing hair in wind") / GLITTERスタイルでボブカットキャラの髪が伸びなくなりました

**Prompt Engine Fixes / プロンプトエンジン修正**
- 🗣️ Fixed narration text (ト書き) being misidentified as speaker names / ト書きが話者名として誤検出される問題を修正
- 📍 Placement rule now validates character names strictly (prevents sentence fragments as speakers) / 配置ルールのキャラ名バリデーション強化
- 🎯 IMPACT style now adapts for multi-character panels (no more single-face close-ups in 2-char panels) / IMPACTスタイルが複数キャラパネルに自動対応
- 🎭 Solo shot detection improved: panels with 2+ speech bubbles no longer incorrectly marked as solo / 吹き出し2つ以上のパネルが誤ってソロショット判定されなくなりました

### Full Changelog / 完全な変更履歴
https://github.com/FURUYAN1234/nano-banana-pro/compare/v2.30.0-alpha...v2.31.0-alpha
