# Nano Banana Pro Powered Super AI 4-koma System

> "To what extent can humans step away from the creative process?" 「人間は、どこまで制作から降りられるのか？」

An experimental web application pushing AI manga production beyond simple "automation" toward total "unmanned" autonomy. AIによるマンガ制作を単なる「自動化」の域を超え、その先にある完全な**「無人化」**へと昇華させる実験的Webアプリケーション。

## 🏆 Recognition / 実績

* **Ranked #6 in Qiita Daily "Likes" Ranking (Jan 28, 2026)** - Japan's leading technical community. **Qiita デイリーいいね数ランキング 10位獲得 (2026年1月28日)** - 日本最大級のエンジニアコミュニティで高く評価されました。
* **Ranked #6 in Qiita Weekly "Likes" Ranking (Jan 28, 2026)** - Achieving high engagement within the developer community. **Qiita 週間いいねランキング 6位獲得 (2026年1月28日)** - 週間を通じた継続的な支持と評価を獲得しました。
* **Featured for "Build with Gemini"** - Implementing autonomous agent workflows using the latest LLM. **"Build with Gemini" 実装事例**として、最新LLMを活用した自律エージェントの先進的なユースケースを示しました。

---

## 🚀 Overview | 概要

This system is an advanced AI agent capable of autonomously generating high-fidelity 4-panel manga (Yon-Koma) requires minimal user input. It features extreme visual direction, strict character consistency, and robust copyright compliance mechanisms.

**Current Version:** `v1.8.5 Alpha`

## ✨ Key Features | 主な特徴

### 1. **Extreme Visual Direction (v1.8.0+)**

* **Dynamic Camera Work**: Automatically directs Worm's Eye, Bird's Eye, and Dutch Angle shots. Prohibits flat "Eye-Level" compositions.
* **Visual Impact**: Enforces exaggerated acting, anime-style effects (Impact Frames), and high-contrast lighting.

### 2. **Structured Scenario Injection (v1.8.3+)**

* **Precision Parsing**: Splits generated scenarios into 4 distinct blocks (Ki/Sho/Ten/Ketsu) to prevent narrative crosstalk between panels.
* **Plain Text Protocol**: Robust regex-based parsing to avoid JSON syntax errors.

### 3. **Character Identity Enforcement (v1.8.4+)**

* **Fidelity Lock**: Strictly enforces hair style, hair color, and accessories (glasses etc.) validation against reference designs.
* **Compliance**: Replaces copyrighted brand names (e.g., KyoAni) with high-quality descriptive technical tags.

## 📦 Installation & Usage | 使い方

### Prerequisites

- Node.js (v18+)
* Google Gemini API Key

### Quick Start

1. **Clone & Setup**:

   ```bash
   git clone https://github.com/FURUYAN1234/nano-banana-pro.git
   cd nano-banana-pro
   start_app.bat
   ```

2. **Launch**:
   * Run `start_app.bat` (Windows) or `npm run dev` (Mac/Linux).
   * Open localhost URL.
   * Enter API Key.

---
*Created by FURUYAN1234 / Powered by Antigravity*
