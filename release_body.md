# v2.49 Alpha - API認証バッジ & 描画エリアロック

## 🇯🇵 日本語

### 新機能・改善
- **API認証状態バッジ**: タイトル枠内に「✅ API認証済」/「⚠ 未接続」バッジを常時表示
  - 緑色光るドット付きバッジ（認証済み時）
  - 赤色点滅バッジ（未接続時）
- **サブタイトル中央配置**: 「SOCIAL SATIRE ENGINE」とAPI認証バッジを水平中央揃えに修正
- **描画エリアロックオーバーレイ**: STEP3（プロンプト構築）未完了時、STEP4の画像生成結果エリア全体にぼかしオーバーレイを表示
  - 枠線・タイトルヘッダー・中央アイコン・「Ready to Start」テキストがボケた状態に
  - STEP3完了後に初めてクリアに表示される

---

## 🇺🇸 English

### New Features & Improvements
- **API Authentication Badge**: Persistent "✅ API Authenticated" / "⚠ Not Connected" badge displayed in title bar
  - Green glowing dot badge (authenticated)
  - Red pulsing badge (not connected)
- **Subtitle Centering**: Centered "SOCIAL SATIRE ENGINE" text and API badge horizontally
- **Drawing Area Lock Overlay**: Added blur overlay to STEP 4 image generation area when STEP 3 (prompt assembly) is not yet completed
  - Border, title header, center icon, and "Ready to Start" text appear blurred
  - Becomes clear only after STEP 3 completion
