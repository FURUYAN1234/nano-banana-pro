# Nano Banana 2 Powered Super AI 4-koma System

> **"To what extent can humans step away from the creative process?"**
> **「人間は、どこまで制作から降りられるのか？」**
>
> An experimental web application that leads AI manga production beyond "automation" to full "unmanned" autonomy.
> AIによるマンガ制作を「自動化」ではなく、その先にある「無人化」へと導く実験的Webアプリケーション。

> [!TIP]
> **Detailed Commentary Available / 詳細な解説記事を公開中**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 本プロジェクトの設計思想や、Google Gemini APIのモデル毎の挙動の違いについては、以下のnote記事で詳しく解説しています。
> [AIマンガ制作を「自動化」ではなく「無人化」へ / Beyond Automation: Toward "Unmanned" AI Manga Production (note / Japanese content)](https://note.com/happy_duck780/n/ndf063558c1f5)

---

## 🚀 Overview / 概要

This project aims to intentionally exclude humans from the creative process, allowing AI to act as a director and complete everything from brainstorming to composition, direction, and rendering.
本プロジェクトは、人間をクリエイティブな工程から意図的に排除し、AIがディレクターとして「ネタ出し・構成・演出・作画」のすべてを完結させることを目的としています。

![Sample Output](assets/samples/sample.png)
![Retro Sample](assets/samples/retro_sample.jpg)

### 🎥 Operation Tutorial / 動作手順動画

<https://www.youtube.com/watch?v=wmC8BgKliKk>
*(Click to watch / 動画を再生)*

### 📺 Introduction / 解説動画

<https://www.youtube.com/watch?v=FmSQ267vrZg>
*(Click to watch / 動画を再生)*

---

## 📰 Media & Community / メディア掲載・コミュニティ

* **Reddit**: [Fully Autonomous 4-Panel Manga System using Gemini](https://www.reddit.com/r/GeminiAI/comments/1qppyer/fully_autonomous_4panel_manga_system_using_gemini/)
* **Qiita**: [人間は、どこまで制作から降りられるのか？Gemini 2.0 Thinking × Imagen 3 で挑む「自律型4コママンガ生成システム」の裏側](https://qiita.com/FURUYAN1234/items/9f565a963591b72b8d9c)
  * **6th Place** in Weekly Likes Ranking (2026/1/28) / **週間いいね数ランキング 6位** (2026/1/28)
  * **10th Place** in Daily Likes Ranking (2026/1/28) / **デイリーいいね数ランキング 10位** (2026/1/28)
  * *(Ref: [Qiita Ranking](https://qiita.com/koki_develop/items/f9712f8acace22815b99))*
* **Zenn**: [人間はどこまで制作から降りられるのか？Gemini 2.0 Thinking × Imagen 3 で挑む「自律型4コママンガ生成システム」](https://zenn.dev/furuyan1234/articles/cacdf1cbe99396)

---

## 💡 Concept: Full Autonomy / コンセプト：制作からの完全離脱

Unlike conventional AI tools that assist humans, this system is based on the following philosophy:
従来のAIツールが「人間の補助」であったのに対し、本システムは以下の思想に基づいています。

* **Dynamic Trend Sync / トレンド動的同期**: Dynamically acquires the latest news to self-select topics based on current social trends.
  実行当日の最新ニュースを動的に取得。社会情勢に合わせたネタをAIが自ら選定します。
* **Unmanned Direction / 無人ディレクション**: AI self-constructs the plot and determines the 4-panel structure without human intervention.
  人間の指示を待たず、AI自身がプロットを組み立て、4コマの構成を決定。
* **Physical Identity Enforcement / 同一性の物理的強制**: Maintains high-precision character consistency across all panels through a unique protocol.
  独自のプロトコルにより、キャラクター造形を全コマで高精度に維持します。

---

## ✨ Features & Modes / 機能とモード

### 📅 Date-Specified News Search / 日付指定ニュース検索

Users can specify a target date to retrieve and visualize past news trends.
対象の日付を指定して、過去のニュースを取得・漫画化できます。

* **Categories**: General, Technology, Business, Entertainment, Science, Health, Sports, Art.

### ✏️ Manual Input Mode / 自由入力モード

A "Free Input" mode allows users to generate manga from any text, such as personal diaries or specific creative prompts.
自由にテキストを入力して漫画を生成できるモードです。個人的な日記や、特定の創作ネタなど、ニュース以外のトピックも扱えます。
> **Note**: Direct URL input is often blocked by security (403 errors). Copy-pasting the article text is recommended.
> URLの直接入力はセキュリティによりブロックされることが多いため、記事のテキストを直接コピペすることを推奨します。

---

## 🔍 Deep Analysis (技術詳解)

### 🏗️ Unique Architecture Highlights / 固有アーキテクチャの要点

This system is not a simple "prompt-and-generate" tool. It is a **multi-stage compiler** that transforms raw news into finished manga through a series of autonomous processing layers.
本システムは単純な「プロンプト→生成」ツールではありません。生のニュースから完成漫画までを自律的な処理レイヤーの連鎖で変換する **マルチステージ・コンパイラ** です。

* **Fully Autonomous "Storyboard-to-Screen" Pipeline**: The entire workflow — from news retrieval → scenario generation → cast analysis → prompt compilation → image generation — runs end-to-end with only an API key. Zero human intervention produces a finished manga.
  ニュース取得→シナリオ生成→キャスト解析→プロンプト組立→画像生成の全5ステップを、APIキー入力のみで一気通貫。人間の介入ゼロで完成漫画を出力します。

* **Cross-Stage Character Identity Lock**: Character information born in Step 2 (Scenario) is transformed into an Identity Matrix in Step 3 (Prompt Compilation) and injected into every panel of Step 4 (Image Generation). This cross-stage consistency guarantee is a design unique to this system.
  Step 2で生まれたキャラ情報をStep 3でIdentity Matrix化し、Step 4の全パネルに注入。ステージを跨いだ一貫性保証は他のAI漫画ツールにない設計です。

* **Scenario → Prompt Compiler**: An intermediate processing layer that "compiles" AI natural language scenarios into structured image prompts. Emotion tags → VFX conversion, camera names → lens distortion tag mapping, and speaker analysis → placement rule generation are all fully automated.
  AIの自然言語シナリオを構造化プロンプトに「コンパイル」する中間処理層。感情タグ→VFX変換、カメラ名→レンズ歪みタグ変換、話者解析→配置ルール生成を全自動で行います。

* **Deterministic Camera Diversity**: Fisher-Yates shuffle mathematically guarantees that all 4 panels use different camera angles — the probability of any two panels sharing the same angle is zero.
  Fisher-Yatesシャッフルにより、4パネルが同じカメラアングルになる確率を数学的にゼロにします。

### 🇯🇵 [JP] コード解析によるAI漫画システム詳解

本システムの設計思想、**Absolute Physical Geometry Lock**（絶対的物理ジオメトリロック）、**Weighted Immutable Prompts**（重み付き不変プロンプト）などのコア技術、および法的・哲学的な考察を含む詳細な解析レポート（日本語版）です。

* 📄 [詳細ドキュメントを表示する](https://docs.google.com/document/d/1Uk24cAmH2CgYwC1y8_YPW6tp2-sD4OgDRWE8FTH4nTs/edit?usp=sharing)

### 🇺🇸 [EN] Comprehensive Analysis of Autonomous AI Manga System

A detailed analysis report (English version) covering the system's design philosophy, core technologies such as **Absolute Physical Geometry Lock** and **Weighted Immutable Prompts**, and legal/philosophical considerations.

* 📄 [View Detailed Document](https://docs.google.com/document/d/1hOZeV13icbv6R7RLryD2iYpli9n5ujwatC9mi5IYJN8/edit?usp=sharing)

---

## 🛠 Featured Protocols: Super FURU Manga Protocol / 搭載プロトコル

1. **ABSOLUTE PHYSICAL GEOMETRY LOCK**
Controls 4-panel layout, aspect ratio, and perspective at the pixel level to suppress hallucinations.
レイアウト、アスペクト比、パースをピクセル単位で制御。ハルシネーション（AIの誤描画）を物理的に抑制します。

2. **Weighted Immutable Prompts**
Weights character-specific features to prevent "fusion" or blending between characters.
特徴量に重みを付与。キャラ同士が混ざり合う「フュージョン」を徹底的に防ぎます。

3. **Animation Quality (Level EX-2)**
Emulates physics-based lighting and SSS (Subsurface Scattering) for peak animation quality.
物理ベースのライティング、SSS（肌の透過）をエミュレート。最高峰のアニメクオリティを追求します。

4. **ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0)**
AI-selected camera names (bird's eye, fish-eye, dutch angle, etc.) from the scenario stage are automatically converted into specific lens distortion weight tags during image generation. Fisher-Yates shuffle mathematically guarantees all 4 panels use different camera angles.
AIがシナリオ段階で選んだカメラ名（俯瞰、フィッシュアイ、ダッチアングル等）を、画像生成時に具体的なレンズ歪みウェイトタグへ自動変換。Fisher-Yatesシャッフルにより4コマ全てが異なるカメラアングルになることを数学的に保証します。

5. **IDENTITY MATRIX — Autonomous Character Consistency (v2.25)**
Automatically analyzes hair color, hairstyle, and glasses status from character sheets and injects a "verification matrix" into every panel's prompt, forcing the AI to self-verify before drawing each panel. Includes anti-clone prevention (no duplicate character drawing), automatic background cast placement, solo shot detection, and 3-zone slotting for 3-character dialogues.
キャラクターシートから髪色・髪型・メガネ有無を自動解析し、全コマのプロンプトに「照合マトリクス」として注入。AIが各コマを描く前に自己検証を強制します。クローン防止（同一キャラの二重描画禁止）、背景キャスト自動配置、ソロショット判定、3人掛け合い時のゾーンスロッティングまで全自動です。

6. **Emotion Style Tag System — Per-Panel Art Style Switching**
The scenario AI autonomously selects the optimal style tag for each panel's emotion (CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT, etc. — 11 styles). Art style, VFX, and proportions are automatically switched during image generation. Includes fallback styles for multi-character panels.
シナリオ生成AIが各コマの感情に最適なスタイルタグ（CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT等11種）を自律選択。画像生成時に絵柄・VFX・プロポーションが自動切替されます。マルチキャラパネル用のフォールバックスタイルも搭載。

---

## 💻 Tech Stack / 技術スタック

* **Frontend**: React 19 / Vite 7 / Tailwind CSS v4
* **LLM/VFM**: Google Gemini API (3.x Flash / 2.5 Flash / 2.5 Pro) + Gemini Native Image Generation
* **Logic**: Zenith Protocol — Multi-tier model fallback (5-model text cascade, 4-model image cascade) with automatic 429/404 retry and account-level model auto-discovery.

---

## 📝 Setup & Launch / セットアップと起動

### 🌍 Cloud / Browser (Deploy)

1. **Get API Key**: Obtain a Gemini API key at [Google AI Studio](https://aistudio.google.com/).
   [Google AI Studio](https://aistudio.google.com/) で Gemini API キーを取得してください。
2. **Access**: Open the deployed web app.
   Webアプリにアクセスし、APIキーを入力してスタートします。
   > **Demo Link / デモサイト:** [https://furuyan1234.github.io/nano-banana-pro/](https://furuyan1234.github.io/nano-banana-pro/)

### 💻 Local Launch (Windows) / ローカルでの起動 (Windows)

You can launch strict local environment with a single click.
以下の手順で、ローカル環境で簡単に起動できます。

1. **Download**: Download the Source Code (ZIP) from [Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases) or click "Code" -> "Download ZIP".
   [Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases) または "Code" ボタンからZIPファイルをダウンロードします。
2. **Unzip**: Extract the ZIP file to any folder.
   ダウンロードしたZIPファイルを解凍してください。
3. **Run**: Double-click `start_app.bat`.
   フォルダ内の `start_app.bat` をダブルクリックします。
   *(Node.js required / 事前にNode.jsのインストールが必要です)*
4. **Start**: The system will automatically install dependencies and launch the browser.
   必要なライブラリが自動インストールされ、ブラウザが立ち上がります。

---

## ⚖️ Compliance & Legal Stance / 法的遵守について

### Japanese Copyright Law (Article 30-4)

This project is developed in full compliance with **Article 30-4 of the Japanese Copyright Act**, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
本プロジェクトは、日本の著作権法第30条の4（情報解析目的の外での利用）に基づき、技術検証および情報解析を目的として開発されており、法的に適正な範囲内で公開されています。

### Official API Usage

All generations are performed through the **official Google Gemini API**. This system adheres strictly to Google's "Generative AI Forbidden Use Policy" and Terms of Service.
本システムはGoogle公式のGemini APIを介して動作しており、Googleが定める「生成AI禁止事項」および利用規約を厳格に遵守しています。

### Autonomous & Deterministic Generation

Unlike simple image synthesis, this system uses an **autonomous "Unmanned" pipeline** and the **ABSOLUTE PHYSICAL GEOMETRY LOCK** protocol.

* It does not aim to replicate specific existing artworks.
* It generates original compositions based on real-time trend analysis and mathematical geometric constraints.
本システムは、特定の作品の模倣を目的としたものではありません。リアルタイムのトレンド分析と、独自の「物理幾何学ロック」プロトコルに基づき、AIが自律的に構図を決定・生成するものであり、依拠性のない独自創作を志向しています。

### No-Profit & Research Focus

The core logic (Prompts/Protocols) is released under **CC BY-NC-SA 4.0**. Any commercial misuse by third parties is strictly prohibited. This project exists solely for the advancement of AI agent technology and the democratization of creative tools.
核心的なロジックはCC BY-NC-SA 4.0（非営利）の下で公開されています。第三者による悪質な商用利用はライセンス違反となります。本プロジェクトは、AIエージェント技術の発展と、創作ツールの民主化を目的とした研究成果です。

---

## ⚖️ License & Rights / ライセンス・権利関係

This project uses a hybrid license to balance technology sharing and intellectual property protection.
技術の共有と創作の保護を両立するため、以下のハイブリッドライセンスを採用しています。

* **Source Code**: [MIT License](https://opensource.org/licenses/MIT)
  Applies to software logic and implementation code. / ソフトウェアの動作ロジックや実装コードに適用。
* **Logic & Prompts**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
  Applies to original design philosophy and prompt structure. / 設計思想およびプロンプト構造に適用。
* **Output Ownership / 生成物の帰属**:
  The CC SA (ShareAlike) requirement **does not apply** to manga works generated by this system. Rights belong to the user.
  本システムで生成されたマンガ作品に上記CCライセンスの継承義務は適用されません。権利はユーザーに帰属します。
  *Maintaining the signature "Generated by Super FURU AI 4-Koma System" is strongly recommended.*
  署名の維持を強く推奨します。

**Commercial Use and Paid Seminars / 商用利用・有料セミナーについて**
Usage of this system (including prompts and logic) in high-priced information products, paid seminars, or any "get-rich-quick" schemes is strictly prohibited under the CC BY-NC-SA 4.0 license. 本システム（プロンプトおよびロジックを含む）を、高額な情報商材、有料セミナー、または「副業・稼げる」等の謳い文句を伴うビジネスに無断で使用することは、CC BY-NC-SA 4.0ライセンスに基づき、固く禁じます。

Any commercial or educational use involving fees requires explicit prior written consent from the developer (FURU). 有料の教育目的や商用利用を検討される場合は、必ず事前に開発者（FURU）の書面による承諾を得てください。

---

## 利用規約 / Terms of Use

### 1. 目的 / Purpose

本ツールは創作支援を目的としたものであり、既存の著作物、ブランド、キャラクター、または特定の作家・作品の再現や代替を目的とした利用は想定していません。  
This tool is intended for creative assistance and is not designed to reproduce, substitute, or replicate existing copyrighted works, brands, characters, or specific creators.

---

### 2. 生成コンテンツに関する禁止事項 / Prohibited Uses

ユーザーは、本ツールを使用して以下の行為を行ってはなりません。  
Users must not engage in the following:

#### (1) 著作権・知的財産権侵害 / Intellectual Property Infringement
- 既存の漫画、アニメ、小説、映画、ゲーム等を実質的に再現・模倣する行為  
- 特定の作品、キャラクター、作家のスタイル・作風を識別可能なレベルで再現する行為  
- 構図、セリフ、デザイン、ストーリー等の無断流用  
- 商標、ロゴ、ブランド要素の無断使用  

Reproducing or closely imitating existing works, recognizable styles, or protected elements.

#### (2) 権利侵害コンテンツの利用 / Use of Infringing Content
- 第三者の著作権、商標権、肖像権、パブリシティ権等を侵害するコンテンツの生成、公開、販売、共有  
- 既存IPに類似したコンテンツの無断商用利用  

Generating, distributing, or monetizing infringing or derivative content without permission.

#### (3) 入力データの不正利用 / Misuse of Input Data
- ユーザーは、入力する画像・テキスト等について、適法な権利または使用許諾を有することを保証するものとします  
- 権利を有しない第三者コンテンツを入力として使用する行為  

Users must have legal rights to all input data.

#### (4) 不正利用の助長 / Facilitation of Misuse
- 権利侵害を目的としたプロンプト、テンプレート、ワークフローの作成・共有  
- 他者に侵害行為を促す行為  

Creating or sharing tools intended for infringement.

#### (5) 法令違反・不正行為 / Illegal Activities
- 適用される法令に違反する行為  
- 詐欺、不正行為、または有害な目的での利用  

Any illegal or harmful use.

---

### 3. 生成物の責任および権利 / Responsibility & Ownership

生成されたコンテンツの内容および利用に関するすべての責任はユーザーに帰属します。  
The user bears full responsibility for generated content.

本ツールの利用によって生成されたコンテンツについて、開発者は著作権その他の権利を主張しませんが、その適法性・利用可能性を保証するものではありません。  
The developer does not claim ownership of generated content but does not guarantee its legality or usability.

---

### 4. 免責事項 / Disclaimer

本ツールは「現状有姿（AS IS）」で提供され、明示または黙示を問わず、いかなる保証も行いません。  
This tool is provided "as is" without any warranties.

開発者は、本ツールの利用または生成コンテンツに起因するいかなる損害についても責任を負いません。  
The developer shall not be liable for any damages arising from use.

---

### 5. 権利侵害への対応 / Infringement & Takedown

権利侵害の申し立てがあった場合、開発者は独自の判断により以下の対応を行う場合があります。  
Upon receiving a valid claim, the developer may:

- 該当コンテンツの削除要請または削除  
- 利用の制限または禁止  
- リポジトリの公開停止等の措置  

Remove content, restrict usage, or take necessary actions.

---

### 6. 規約の変更 / Changes

本規約は予告なく変更される場合があります。  
These terms may be updated without notice.

---

### 7. 準拠法 / Governing Law

本規約は日本法に準拠します。  
These terms are governed by the laws of Japan.

---

## AI Manga Creative Suite / AIまんが制作エコシステム

This project is part of an integrated ecosystem designed to support AI-powered manga and story creation.
本プロジェクトは、AIを活用した漫画・ストーリー制作を支援する統合エコシステムの一部です。

### Ecosystem Components / 構成システム

#### 1. Nano Banana 2 Powered Super AI 4-koma System
A system specialized in creating 4-panel manga with AI.
AIを活用した4コマ漫画制作に特化したシステムです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndf063558c1f5)
- [Demo / デモ](https://furuyan1234.github.io/nano-banana-pro/)
- [Code / コード](https://github.com/FURUYAN1234/nano-banana-pro)

#### 2. AI Story Maker
A tool for generating creative stories and plots using AI.
AIを用いてクリエイティブなストーリーやプロットを生成するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nd3d972922868)
- [Demo / デモ](https://furuyan1234.github.io/story-maker/)
- [Code / コード](https://github.com/FURUYAN1234/story-maker)

#### 3. AI Character Sheet Maker
An assistant for designing detailed character sheets and settings.
詳細なキャラクターシートや設定をデザインするための支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/neccbebd7d957)
- [Demo / デモ](https://furuyan1234.github.io/character-sheet-maker/)
- [Code / コード](https://github.com/FURUYAN1234/character-sheet-maker)

#### 4. AI Comic Translation Tool
A tool for translating manga into 10 languages using AI. 
AIを使って漫画を10言語に翻訳するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nbdf826604ce7)
- [Demo / デモ](https://furuyan1234.github.io/comic-translation/)
- [Code / コード](https://github.com/FURUYAN1234/comic-translation)

---

Developed by **FURU**

---

## 📋 ChangeLog

### v2.63.0-alpha (2026-04-22)
- **[Fix]** Simplified DALL-E 3 ChatGPT instructions and clarified content policy rejection UI to explicitly support both Gemini and ChatGPT. / DALL-E 3 (ChatGPT) 向けのアスペクト比変更指示およびコンテンツポリシー拒否時のUI文章を整理し、GeminiとChatGPT両対応であることを明記。

### v2.62.0-alpha (2026-04-22)
- **[Fix]** Updated watermark text to specify "Generated by ChatGPT" when ChatGPT mode is enabled, and explicitly added DALL-E 3 aspect ratio commands and title placement fixes to enforce A4 size. / ChatGPTモード時にウォーターマークへ「ChatGPT生成」の旨を明記するように変更し、DALL-E 3向けのアスペクト比指定とタイトル配置修正（白フチ問題）を明記してA4サイズを強制。

### v2.61.0-alpha (2026-04-22)
- **[Fix]** Adjusted gutter width between manga panels (approx 3% of canvas height) to prevent panels from touching / 4コマのコマ間ガター（余白）をキャンバス高の約3%に広げ、コマ同士が密着するのを防止

### v2.60.0-alpha (2026-04-21)
- **[Critical Fix]** Camera angle lens distortion weights not being applied to image generation — added `cameraLensMap` dictionary / カメラアングルのレンズ歪みウェイトが画像生成に反映されないバグを修正（cameraLensMap追加）
- **[Fix]** Removed hardcoded Extreme Reaction Mandate from default prompt, restoring natural expressions / デフォルトシナリオの過剰演出（Extreme Reaction Mandate）を除去し、自然な表情に回復
- **[Fix]** Increased NO EYE CONTACT weight from 1.7 to 2.5 to suppress characters looking at the camera / カメラ目線（第四の壁破壊）抑制ウェイトを1.7→2.5に強化

### v2.59.0-alpha (2026-04-21)
- **[Major]** Deprecated legacy Imagen models (scheduled for full removal 2026/06/24). Gemini Native Image Generation is now primary / Imagen全系列を廃止予定に伴い非推奨化。Geminiネイティブ画像生成をプライマリに
- **[Major]** Rebuilt text/image model lists with Gemini 3.x generation priority / テキスト/画像モデルリストをGemini 3.x世代優先に再構築
- **[New]** Added Gemini API Model Audit Protocol to AGENTS.md / Gemini APIモデル定期監査プロトコルをAGENTS.mdに追加

### v2.52.0-alpha
- **[BugFix]** PRO TIPSの文章における「カンニングできる」という不適切な表現を「参照できる」に修正

### v2.48.0-alpha (2026-04-15)
- **[UI Fix]** APIキー未入力時のぼかし範囲を修正。出力結果エリア（プロンプト欄・コピペボタン・PRO TIPS・画像生成ログ・生成画像エリア）が`currentStep < 3`の時に正しくロックされるよう修正
- **[UI Fix]** STEP3完了前にプロンプト欄・DYNAMIC ENGINE等が丸見えになっていた構造上の不備を修正（出力結果divにロックオーバーレイを追加）
- **[UI New]** ステータスバーにAPI接続状態バッジ（`🟢 CONNECTED` / `🔴 NO API KEY`）を常時表示
- **[UI New]** APIキー入力UIをインラインバー形式に変更（フルスクリーンモーダル廃止）
- **[UI New]** コピペボタンより下（STEP4ボタン・PRO TIPS・コンテンツポリシーパネル）を`finalPrompt`未生成時にぼかすUI改善

### v2.47.0-alpha (2026-04-14)
- **[Feature]** シナリオ強化: カメラワーク強化トグル追加
- **[Feature]** シナリオ強化: セリフ・ギャグ強化トグル追加
- **[BugFix]** STEP3構築中にSTEP2が消えるバグ修正（isAssembling条件除外）
