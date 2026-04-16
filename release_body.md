## 🎯 Scenario-Driven Location & Outfit (v2.43 Architecture)

### English
- **Location & Outfit now read from scenario text** — no more STEP 2 re-generation needed to change location/outfit
- Input fields serve as convenience shortcuts for STEP 2; afterwards, edit `Location:` / `Outfit:` lines directly in the scenario
- GENERATION PREVIEW now shows real-time values parsed from scenario text
- Outfit placeholder updated with "普段着" (casual wear) example
- All existing outfit enforcement (per-panel injection + global OUTFIT OVERRIDE) fully maintained

### 日本語
- **場所・服装がシナリオテキストから直接読み取られるように変更** — 場所・服装の変更にSTEP 2の再実行が不要に
- 入力欄はSTEP 2用の初期値ショートカットとして機能。以降はシナリオ内の `Location:` / `Outfit:` 行を直接編集するだけで反映
- GENERATION PREVIEWがシナリオテキストからリアルタイムで値を取得・表示
- 服装欄のプレースホルダーに「普段着」を追加
- 既存の服装強制ロジック（各パネル注入 + グローバルOUTFIT OVERRIDE）は完全維持
