# Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System

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

### 🌟 Manifesto: The Ultimate Goal / マニフェスト：この技術が向かう先

Our goal is not simply to "automate" manga creation, but to redefine the roles of human creators. By entrusting the grueling, repetitive, and labor-intensive tasks (such as drafting layouts, background rendering, and panel framing) entirely to AI, humans can focus solely on the most joyful part of creation: the core ideas, the direction, and the "funniness." 

Ultimately, this project envisions a future where manga artists and animators are liberated from harsh working conditions, can lead human-like lives, and enjoy their leisure time while continuing to tell amazing stories.

私たちの目標は、単にマンガ制作を「自動化」することではありません。背景の描き込み、コマ割り、レイアウトといった過酷で単調な労働をAIに完全委譲することで、人間は「面白いプロットを考える」「世界観をディレクションする」という最もクリエイティブで楽しい工程にのみ集中できるようになります。

この技術の知見が今後のテクノロジーの進化に反映され、最終的に **「漫画家やアニメーターが、過酷な労働条件から解放され、人間らしい生活を送れるようになり、余暇を楽しめる世界」** が来ることを本プロジェクトの究極の目標としています。

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
> URLの直接入力はセキュリティによりブロックされることが多いため、記事のテキストを直接コピーすることを推奨します。

### ⚡ Full Auto Mode / フルオート生成モード

With a single click, the system autonomously executes the entire pipeline (from scenario generation to prompt compilation and image rendering) without requiring manual advancement through each step.
キャラクターを設定した状態から、シナリオ生成・プロンプト構築・画像生成の全ステップを人間の介入なしに一気通貫で自律実行するモードです。

### 🔁 Endless Mode / 無限ループモード

An experimental feature that, upon completing a generation, automatically selects a new topic and continuously produces new manga while preserving the initial character settings.
フルオート生成完了後、キャラクター設定を維持したまま、自動的に新しいニュースやランダムなお題を取得し、次々と新しいシナリオと漫画を延々と生成し続けるモードです（完全な放置運用が可能）。

### 🎬 Scenario Enhancement / シナリオ演出強化

Users can amplify the AI's script direction with specific enhancement toggles (e.g., Extreme Expressions, Dynamic Body Language, Intense Lighting/VFX, Detailed Backgrounds, Extreme Camera Work, and Gag/Dialogue impact).
シナリオの演出力を任意に引き上げる強化トグルを搭載。表情、ボディランゲージ、照明・エフェクト、背景描き込み、極限のカメラワーク、セリフやギャグのキレなど、特定要素を「限界突破（ウェイト3.0相当）」レベルに増幅可能です。

### 🤖 ChatGPT 専用プロンプトモード (外部生成モード) / ChatGPT Prompt Optimization

A dedicated formatting protocol to optimize prompts for ChatGPT's image generation (currently `gpt-image-2`). Because ChatGPT tends to drop long instructions, this mode generates an "ultra-compressed prompt." It enforces A4 portrait orientation, vertical Japanese text, and includes an Anti-Noise Protocol. 
ChatGPT（`gpt-image-2`ベース）での画像生成に最適化された専用の「超圧縮プロンプト」を出力するモードです。長文指示を忘れやすいChatGPTの特性に対応し、冗長な制約をカットしつつ、A4縦長のキャンバス指定や縦書きテキスト、GPT-image-2特有のノイズ対策を自動付与します。
**※重要（最強のハイブリッド運用）**: このモードはAPI単体ではなく、**「生成されたプロンプトとキャラクター設定シート画像を一緒に、ブラウザ版ChatGPTの新規スレッドへ手動でコピー＆ペーストする」**ことで真価を発揮します。
また、本システムの強力な作画ノウハウ（クリーン・セルルック・プロトコルや空間分離プロトコル）を、**1枚絵の生成用途としてWeb版ChatGPTに持ち出せる「1枚絵用プロトコル コピーボタン（β）」**を上部ヘッダーに搭載しています。手動で高画質なイラストを生成したい場合に活用してください。

> **🧪 OpenAI API Direct Execution (Experimental) / OpenAI API直接実行（テスト機能）**
> OpenAI APIキーを入力することで、アプリ内から直接画像生成API（`gpt-image-2`）を呼び出せるテスト機能を実装しています（キーはRAM上にのみ保持され、ブラウザリロードで揮発するセキュア設計）。
> しかし現在、OpenAIの画像APIには「4000文字の文字数制限」の壁があり、本システムが生成する長大なプロンプトを直接投げるとエラーになります。また、API経由の直接生成にはポリシー上の制限強化も確認されています。
> 現状ではAPI単体で「文章AIが長文を読み解き、画像AIへ要約して渡す」というブラウザ版特有の処理能力を完全再現できないため、実運用においては引き続き**「ブラウザ版ChatGPTへの手動コピペ運用」**が唯一にして最強のソリューションとなります。（将来的な制限解除を見据えた布石として搭載されています）

### 🎨 Context-Aware Auto-Selection / 文脈認識型おまかせ自動選定

Both the **Location** (場所) and **Outfit** (服装) fields support an "AI Auto-Select" mode. When either field is left blank, the system does not simply fall back to the character sheet's default — instead, it instructs the AI to **analyze the scenario context** and autonomously determine the most appropriate setting.
「場所」と「服装」の両フィールドは「AIおまかせ」モードに対応しています。いずれかのフィールドが空欄の場合、キャラクターシートのデフォルト値をそのまま使うのではなく、 **AIがシナリオの文脈を分析して、最も適切な場所・服装を自律的に判断・選定** します。

* **Location**: AI determines the most fitting background environment based on the scenario's plot, mood, and action (e.g., a beach scene → seaside resort, a political debate → parliament building).
  シナリオのプロット・雰囲気・アクションに基づき、AIが最適な背景環境を決定します（例：海のシーン→海辺のリゾート、政治討論→国会議事堂）。
* **Outfit**: AI evaluates whether the character sheet's default clothing is contextually appropriate. If the scenario calls for a specific attire (swimwear for a pool episode, formal suits for a business meeting), the AI overrides the default with a **concrete clothing description** rather than vague defaults.
  AIがキャラクターシートのデフォルト衣装がシナリオの文脈に適しているかを評価します。特定の衣装が求められるシーン（プール回なら水着、ビジネス会議ならスーツ）では、曖昧なデフォルトではなく **具体的な服装名** でオーバーライドします。
* **UI Distinction / UI上の区別**: In the Generation Preview, user-specified values appear in **white text**, while AI-selected values appear in **blue text with an ✨ icon**, making it immediately clear which settings were chosen by the human and which by the AI.
  生成プレビューでは、ユーザー指定値は **白文字** 、AI選定値は **青文字＋✨アイコン** で表示され、人間とAIどちらが選んだ設定かが一目で識別できます。

---

## 🔍 Deep Analysis (技術詳解)

### 🏗️ Unique Architecture Highlights / 固有アーキテクチャの要点

This system is not a simple "prompt-and-generate" tool. It is a **multi-stage compiler** that transforms raw news into finished manga through a series of autonomous processing layers.
本システムは単純な「プロンプト→生成」ツールではありません。生のニュースから完成漫画までを自律的な処理レイヤーの連鎖で変換する **マルチステージ・コンパイラ** です。

* **Fully Autonomous "Storyboard-to-Screen" Pipeline**: The entire workflow — from news retrieval → scenario generation → cast analysis → prompt compilation → image generation — runs end-to-end with only an API key. Zero human intervention produces a finished manga.
  ニュース取得→シナリオ生成→キャスト解析→プロンプト構築→画像生成の全5ステップを、APIキー入力のみで一気通貫。人間の介入ゼロで完成漫画を出力します。

* **Cross-Stage Character Identity Lock**: Character information born in Step 2 (Scenario) is transformed into an Identity Matrix in Step 3 (Prompt Compilation) and injected into every panel of Step 4 (Image Generation). This cross-stage consistency guarantee is a design unique to this system.
  Step 2で生まれたキャラ情報をStep 3でIdentity Matrix化し、Step 4の全パネルに注入。ステージを跨いだ一貫性保証は他のAI漫画ツールにない設計です。

* **Scenario → Prompt Compiler**: An intermediate processing layer that "compiles" AI natural language scenarios into structured image prompts. Emotion tags → VFX conversion, camera names → lens distortion tag mapping, and speaker analysis → placement rule generation are all fully automated.
  AIの自然言語シナリオを構造化プロンプトに「コンパイル」する中間処理。感情タグ→VFX変換、カメラ名→レンズ歪みタグ変換、話者解析→配置ルール生成を全自動で行います。

* **FACS (Facial Action Coding System) Engine / FACS（顔面動作符号化システム）エンジン**: Replaces vague emotional tags with precise anatomical muscle movements (Action Units) injected directly into the prompt. This physical-level expression control drastically reduces facial distortion and maintains extreme character consistency.
  従来の抽象的な感情タグを廃止し、解剖学的な筋肉の動き（Action Units）をプロンプトに直接注入します。物理レベルでの表情制御により、顔の崩れを劇的に抑えつつ、極めて高い一貫性を実現しています。

* **Deterministic Camera Diversity**: Fisher-Yates shuffle mathematically guarantees that all 4 panels use different camera angles — the probability of any two panels sharing the same angle is zero.
  Fisher-Yatesシャッフルにより、4パネルが同じカメラアングルになる確率を数学的にゼロにします。

* **Cross-Platform Prompt Compatibility (ChatGPT Images 2.0)**: While optimized for Gemini, the system injects specific formatting constraints (such as A4 layout parameters and vertical text guidance) into the final prompt when ChatGPT mode is enabled, ensuring ChatGPT Images 2.0 accurately renders standard manga layouts without artifacts.
  Geminiに最適化しつつ、ChatGPTモード有効時にはA4レイアウト指定や縦書きテキスト誘導などの特殊フォーマットを最終プロンプトに注入。ChatGPT Images 2.0でも破綻のない標準的な漫画レイアウトを出力できるよう設計されています。

### 🏆 The Ultimate Hybrid Strategy / 「最強のハイブリッド運用」

This system has arrived at an optimal division of labor between two of the world's most powerful AI models, completely bypassing the limitations of current API structures.
本システムは、フルオートメーション（完全自動化）を追求した結果、**「現在の人類が使える最強のAIモデルたち（GeminiとChatGPT）の弱点を補い合い、強みを100%引き出す無敵の分業体制」**へと到達しました。

1. **【頭脳・解析担当】Gemini API (The Brain / Logic)**
   * **Strength / 強み:** Extremely fast, cost-effective, and possesses unmatched reasoning and vision capabilities for long-context character sheet analysis. / 非常に高速かつ低コストであり、長文のキャラクター設定や画像解析において比類ない推論能力と視覚認識能力を持ちます。
   * **Role / 役割:** Acts as the "Architect." It scans the user's images, understands topological features (e.g., hair length relative to the collarbone), avoids censorship via dynamic "Age-Up" safety filters, and compiles a highly structured, rigid prompt for layout and timing. / 「設計者」として機能します。ユーザーの画像をスキャンしてトポロジー的特徴（鎖骨に対する髪の長さなど）を理解し、動的な安全フィルターで検閲を回避しつつ、レイアウトとコマ割りのための高度に構造化された厳密なプロンプトを構築します。
   * **Google Search Grounding (Auto-Deep Dive) / 自律的リサーチ機能:** When generating from text prompts without images, the system automatically enables Google Search Grounding. Gemini dynamically researches the theme in real-time, fetching background context and trivia not explicitly mentioned in the prompt, resulting in surprisingly rich and highly detailed scenario generation. / 画像無しのテキストお題で生成する際、システムは自動的にGoogle Search Groundingを有効化します。短いお題からGeminiが自律的にリアルタイムWeb検索を行い、プロンプトに書かれていない背景知識や雑学を勝手に深掘りしてシナリオに組み込むため、ユーザーの指定を遥かに超えるリッチで解像度の高いストーリー構築を実現します。
2. **【描画担当】ChatGPT UI / ChatGPT Images 2.0(The Renderer)**
   * **Strength / 強み:** Industry-leading image generation quality and the crucial ability to **accept reference images via the browser UI** (a feature currently impossible via the standard ChatGPT Images 2.0 API). / 業界最高水準の画像生成品質と、 **ブラウザUI経由で参照画像を受け付ける** という極めて重要な能力（現在の標準ChatGPT Images 2.0 APIでは不可能な機能）を備えています。
   * **Role / 役割:** Acts as the "Artist." By having the user manually paste the Gemini-crafted prompt *alongside* the original character sheet into the ChatGPT browser interface, the system achieves near-perfect character consistency that APIs alone cannot match. / 「作画者」として機能します。ユーザーがGeminiの構築したプロンプトをキャラクター設定画と*一緒に*手動でChatGPTに貼り付けることで、API単体では到達できない完璧に近いキャラクターの一貫性を実現します。
3. **【仲介・調整担当】Human-in-the-Loop Override (The Director)**
   * **Role / 役割:** When ChatGPT Images 2.0 stubbornly breaks the 4-panel layout or ignores aspect ratios (a known quirk), the human simply copies the built-in `[ABSOLUTE OVERRIDE]` force-rebuild prompt. This linguistic brute-force approach forces the AI back into the strict A4 geometric constraints without relying on external plugins or image-cropping tools. / ChatGPT Images 2.0 が頑なに4コマレイアウトを崩したりアスペクト比を無視した場合（既知の癖）、人間は組み込みの `[ABSOLUTE OVERRIDE]` 強制再構築プロンプトをコピーして投げるだけです。この言語的な力技により、外部プラグイン等に頼ることなく、AIを厳密なA4幾何学制約へと強制的に引き戻します。

In short, by deliberately leaving the final rendering step as a "manual UI operation," Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System elegantly side-steps the restrictive walled gardens of pure API generation, making it an engineering masterpiece of Prompt-Driven Architecture.
つまり、「最後の作画フェーズだけはあえて人間の手作業（コピペ）を挟む」という設計にしたことで、各社の厳しいAPI制限を鮮やかにすり抜け、「Geminiの頭脳」と「ChatGPTの画力とUI機能」を限界まで引き出すことに成功しています。

### 📖 The Philosophy of the 1-Page (4-Koma) Limit / なぜ「1ページ（4コマ）制」にこだわるのか？

While many users desire the ability to generate long, multi-page comic books, Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System intentionally restricts generation to a single 1-page (4-panel) format. This is not a technical limitation of the code, but a strategic decision based on the current boundaries of Generative AI:
多くのユーザーは複数ページの長編漫画を全自動生成することを望みますが、Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System は意図的に「1ページ（4コマ）完結」のフォーマットに制限しています。これは実装上の妥協ではなく、現在の生成AIの限界を見据えた戦略的な選択です。

1. **Content Dilution & Identity Drift (内容の希薄化とキャラクター崩壊):** The fundamental rule of current AI generation is that as page count increases, both story density and visual consistency decrease inversely. Stretching a prompt across multiple pages causes the AI to lose focus, resulting in hollow plotlines, repetitive dialogue, and inevitable visual distortions (costume changes, facial drift) without LoRA fine-tuning. This is precisely why typical multi-page AI comics often feature extremely limited casts (1 to 3 characters) engaged in simple, repetitive actions like "battling"—the creators must strip away complexity just to keep the AI from breaking down. A dense, high-impact 4-panel format is the absolute "sweet spot" for maximizing both narrative punch and zero-shot visual consistency. / 現在のAI生成における絶対的な法則として、「ページ数に反比例して、キャラクターのビジュアルだけでなく、話の構成や内容そのものも薄くなってしまう」という問題があります。複数ページにまたがってプロンプトを引き伸ばすと、AIのコンテキストが散漫になり、中身のないストーリーや同じセリフの反復、そして追加学習（LoRA）なしでは避けられないビジュアルの崩壊（Identity Drift）を引き起こします。**世にある複数ページのAI漫画が「登場人物が1〜3人程度で、ひたすらバトルしているだけの展開」になりがちなのは、まさにこれが原因です。** AIの破綻を防いでページ数を稼ぐために、複雑な掛け合いや緻密なストーリー構成を犠牲にせざるを得ないのです。物語の「オチ」の鋭さと、ゼロショットでの完璧な一貫性を両立できる限界のスイートスポットこそが、この「4コマ」という高密度なフォーマットなのです。
2. **Cognitive Load for Human-in-the-Loop (作業負荷の最適化):** Because our Ultimate Hybrid Strategy requires the user to manually copy-paste the final prompt into ChatGPT to bypass API limitations, asking a human to do this for multiple pages would be tedious and agonizing. A 1-page output provides a perfectly "snackable" size for rapid, stress-free creation and social media sharing. / 最強のハイブリッド運用では、APIの制限を回避するためにユーザーが手動でChatGPTにプロンプトをコピペする必要があります。これを複数ページ分も手作業でやらせるのは苦痛でしかありません。SNSでサクッとシェアでき、ユーザーがストレスなく生成を楽しめるサイズ感として、1ページ（4コマ）が最適に機能します。

### 📖 The Philosophy of the Embedded Character Sheet / なぜ「設定テキスト入りのキャラクターシート画像」を使うのか？

In the typical AI workflow, creators upload a clean image of a character and provide a separate, lengthy text prompt detailing their traits. This system fundamentally rejects that approach. Instead, we require the character's setting text to be visually written *inside* the reference image itself (creating a "One-Sheet Context"). This yields three massive advantages:
一般的なAI漫画の運用では、「キャラクターの画像ファイル」と「設定を書いた長文テキスト」を別々に入力するのが普通です。しかし、本システムはこの手法を根本から否定し、**「キャラクター設定のテキストは、画像の中に直接文字として書き込む（One-Sheet Context）」**という運用を推奨しています。これには3つの絶大なメリットがあります：

1. **Multimodal Binding (視覚と概念の強固なロック):** When image and text are provided separately, models like ChatGPT Images 2.0 often suffer from "attention split"—they either prioritize the text and ignore the face, or prioritize the face and forget the text. By embedding the text physically into the image, the Vision AI processes them as a single, unified entity. "This visual face" mathematically equals "these written traits," drastically reducing identity drift. / 画像とテキストを別々に入れると、AIは「どちらを優先すべきか」で迷い、文字設定を忘れたり画像を無視したりします。文字を画像内に埋め込むことで、Vision AIは「この姿＝この文字情報」として完全に同一の概念としてロックし、キャラクターのブレ（Identity Drift）を劇的に低下させます。
2. **Prompt Override Prevention (プロンプト競合の回避):** If you consume text tokens to describe the character's hair, eyes, and clothes, you steal precious attention away from the complex 4-panel layout constraints and scenario instructions. By offloading character traits into the image space, 100% of the text prompt tokens can be purely dedicated to "directing the manga." / テキスト側で「金髪で青目で…」と長々とキャラ設定を書くと、肝心の「漫画のコマ割りや演出」を指示するプロンプトの枠（トークンとAttention）を圧迫してしまいます。設定情報を画像（Vision側）に逃がすことで、テキストプロンプトのリソースを100%「漫画の演出」に全振りできるのです。
3. **Frictionless Workflow (コピペ作業の排除):** For the human-in-the-loop, uploading one image is vastly superior to maintaining and pasting giant blocks of character lore alongside the layout prompts every single time. / 人間側の運用コストとして、毎回「画像」と「長文設定」の2つをコピペするのは苦痛です。文字入りのシートを1枚投げるだけで、AIが勝手に文字を読んで理解してくれる究極にスマートな運用が可能になります。

### 🎭 Comedy Structure Engineering / なぜAIに「面白くして」と言っても面白くならないのか？

Most AI-generated manga suffers from a fundamental problem: telling the AI to "make it funny" produces bland, predictable content. This is not a capability limitation of AI—it is a **design failure** in the prompt. Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System solves this by embedding a structured comedy methodology directly into its scenario generation engine.
AIに「面白くして」と指示しても、退屈で予測可能なコンテンツしか出てきません。これはAIの能力の問題ではなく、**プロンプト設計の破綻**です。Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System は、構造化されたお笑いメソッドをシナリオ生成エンジンに直接組み込むことでこの問題を解決しています。

**The Core Formula / 笑いの本質:**

```
L(x) = | E(x) - R(x) |

L = Laughter    E = Expectation (reader's prediction)    R = Reality (actual outcome)
Constraint: R(x) ∈ { comprehensible range } — too much deviation = confusion, not comedy
```

Laughter is the gap between expectation and reality. Without engineering *what* the reader expects (via Setup) and *how* reality deviates (via Gap techniques), the AI has no optimization target.
笑いとは「予想」と「現実」のズレです。読者が何を予想するか（フリ）と、現実がどうズレるか（ボケ技法）を設計しなければ、AIには最適化対象がありません。

**Six-Layer Architecture / 6層アーキテクチャ:**

The system constructs comedy through six distinct engineering layers:
本システムは6つの独立した設計層を通じてコメディを構築します：

**Layer 1 — Gap Generation Engine `ΔG(x)` (6 techniques, minimum 2 required per scenario):**
**第1層 — ズレ生成エンジン（6技法から最低2つ選択を義務化）：**

| Technique | Formula | Example |
|:--|:--|:--|
| Substitution / 置換 | `Context(A) → Context(B)` | International summit → Kindergarten class meeting |
| Exaggeration / 誇張 | `Scale(x) × 10³` | "Surprised" → "Soul departing body" |
| Role Reversal / 逆転 | `Role(A) ↔ Role(B)` | Cool character loses composure |
| Absurdity / 不条理 | `P(event) ≈ 0` injected boldly | Suddenly discussing curry |
| Tension-Release / 緊張と緩和 | `Tension → MAX → 0` | 3 panels serious → total collapse |
| Return to Sanity / 常識に戻る | `Chaos(all) + Normal(1)` | "Wait, this is obviously insane" |

Multiple techniques multiply (not add) comedic impact: `L_total = ΔG₁ × ΔG₂ × α`
複数技法は笑いを加算ではなく乗算で増幅します。

**Layer 2 — 4-Panel Energy Distribution `P(i)` (Comedy-to-Panel Mapping):**
**第2層 — 4コマへのエネルギー配分（笑いの構成マッピング）：**

```
P(1) ≈ 0.00  Panel 1 = Setup (フリ)     — Don't make them laugh. Build E(x).
P(2) ≈ 0.15  Panel 2 = Deviation (ボケ)  — First gap. "Wait, what?"
P(3) ≈ 0.25  Panel 3 = Escalation (溜め) — Accelerate or build extreme tension.
P(4) ≈ 0.60  Panel 4 = Punchline (オチ)  — ALL energy concentrated here. 💥
Σ P(i) = 1.00
```

The critical insight: **P(1) ≈ 0**. Panel 1's job is NOT to be funny—it builds the reader's expectation. A punchline without setup is a high jump without a run-up.
最重要設計: 1コマ目では笑わせない。1コマ目の仕事は「読者の予想を作ること」。フリなしのボケは、助走なしの跳び箱です。

**Layer 3 — Technique Selection (Golden Patterns):**
**第3層 — テクニック選択（黄金パターン）：**

The most powerful technique for 4-panel format is **Repetition Escalation (天丼)**: `T(n) = Base × 2^(n-1)` — Panel 1 plants a seed (×1), Panel 3 brings it back transformed (×2), Panel 4 detonates it (×4). Exponential energy accumulation through deliberate repetition.

4コマ最強テクニックは **天丼** : 1コマ目で仕込み→3コマ目で変奏再登場→4コマ目で限界突破。指数関数的にエネルギーが蓄積されます。

Additional techniques include Riding-Tsukkomi (ノリツッコミ: joining the joke then breaking it), Stacking (かぶせ: rapid-fire successive jokes), and Self-deprecation (自虐: characters weaponizing their own flaws).

**Layer 4 — Punchline Diversity Engine (v2.95+) / 第4層 — オチ多様化エンジン（マンネリ防止）:**

A critical failure mode of AI scenario generation is **Persona Gravity (ペルソナ引力)**: when the LLM is asked to "write a funny scenario using this character," it gravitates toward the character's most salient traits — resulting in the same punchline patterns appearing repeatedly across generations (e.g., a character who loves collecting always ends with a collecting joke; a character with a pointing gesture always ends with that gesture).

AIシナリオ生成における重大な失敗モードが **ペルソナ引力（Persona Gravity）** です。「このキャラを使って面白いシナリオを書け」とLLMに指示すると、AIはキャラクターの最も顕著な特性（趣味・口癖・特技）に引き寄せられ、毎回同じパターンのオチに収束してしまいます（例：コレクター癖のキャラ → オチが必ずコレクションネタ、指さし癖のキャラ → オチが必ずその仕草）。

This system neutralizes Persona Gravity through two complementary mechanisms:
本システムは2つの相補的なメカニズムでペルソナ引力を無効化します：

**Mechanism 1 — JS-Forced Punchline Randomizer (AIに選ばせない):**

The key insight: **telling the LLM to "randomly choose" a punchline type is meaningless** — the LLM's probability distribution is fixed, and it will always select the most "natural" or "safe" option from its training data. The only correct implementation is for **JavaScript to make the selection** before the prompt is constructed, then inject the chosen type as a hard constraint.

重要な洞察： **「ランダムに選んで」とLLMに指示しても意味がない** ——LLMの確率分布は固定されており、学習データで最も「自然・安全」とされる選択肢を必ず選ぶからです。唯一の正しい実装は、 **プロンプト構築前にJavaScriptが選択** し、選ばれたタイプを強制制約としてプロンプトに注入することです。

```javascript
// ボタンを押すたびにJSがランダム確定 → AIは選択の余地なし
const PUNCHLINE_TYPES = [ /* 8 types */ ];
const selectedPunchline = PUNCHLINE_TYPES[Math.floor(Math.random() * PUNCHLINE_TYPES.length)];
// → scenarioPrompt内で "${selectedPunchline}" として注入される
```

The 8 punchline archetypes (all character-agnostic):

8種類のオチアーキタイプ（全てキャラ非依存）：

| Type / タイプ | Description / 概要 |
|:--|:--|
| 爆発型 (Explosion) | 叫び・暴走・カオスで画面が爆発する |
| 静寂型 (Surreal Silence) | 全員が無言のまま固まる虚無のオチ |
| 社会的死型 (Social Death) | 取り返しのつかない状況で4コマが終わる |
| 自己完結型 (Self-Contained) | ボケたキャラだけが満足し、周囲はドン引き |
| 逆転オチ型 (Role Reversal Punchline) | ツッコミ役が最後に最もヤバいことを言う |
| 天丼爆発型 (Repetition Escalation) | 1コマ目の伏線が4コマ目で指数関数的に炸裂 |
| 第三者乱入型 (Third-Party Intrusion) | 全く無関係な人物が突然介入して終わる |
| メタ崩壊型 (Meta Collapse) | キャラが4コマの「外側」（フィクション性）に気づいて崩壊 |

**Mechanism 2 — Anti-Persona-Gravity Rule (ペルソナ固有設定のオチ禁止):**

An explicit prompt-level prohibition prevents the LLM from using a character's personal traits, hobbies, or signature behaviors as the *subject matter* of the punchline.

プロンプトレベルの明示的な禁止ルールにより、LLMがキャラクターの固有設定（趣味・口癖・特技）をオチの「ネタ」として直接使うことを防止します。

```
❌ FORBIDDEN (禁止): キャラの固有設定がオチの「ネタ」そのものになること
   → コレクター癖 → オチが「コレクション」ネタ
   → 指さし癖   → オチの「行動」が指さし

✅ ALLOWED (許可): キャラの個性が「演じ方・反応の味」として現れること
   → コレクター癖のキャラが「逆転オチ型」のシチュエーションで個性ある反応をする
   → 指さし癖のキャラが「第三者乱入型」のカオスに個性ある表情で巻き込まれる
```

**Mechanism 3 — Anti-Persona-Gravity Protocol v1.0 (キャラ別オチ分散 / v2.95+):**

Mechanism 2 prevents persona *traits* from becoming the punchline topic. But a subtler form of Persona Gravity remains: **authoritative characters** (discipline committee members, student council presidents, etc.) tend to monopolize the 4th-panel punchline role itself — not because of their hobbies, but because their "authority" persona makes the LLM instinctively assign them the climactic line.

メカニズム2はペルソナの「趣味・口癖」がオチのネタになることを防ぎます。しかし、より微細な引力が残ります： **権威キャラ** （風紀委員・生徒会長など）が、趣味の問題ではなく「権威ある立場」ゆえにLLMから4コマ目の決めゼリフを毎回割り当てられてしまう現象です。

The protocol injects an explicit distribution rule: the punchline's lead role (the character who delivers the decisive line or action in Panel 4) must be rotated across **all cast members equally**, with intentional priority given to comedic or "mob" characters who would normally be overlooked. Authority characters are not banned from punchlines — they simply lose their default priority.

このプロトコルは明示的な分散ルールを注入します：4コマ目の決めゼリフや行動の主導権を **全キャストに均等にローテーション** させ、通常は埋もれがちなボケ役やモブキャラに意図的に優先権を与えます。権威キャラのオチは禁止ではなく、デフォルトの優先権を失うだけです。

```
❌ BEFORE (修正前): 風紀委員が毎回「許さない！」で締める → ワンパターン化
✅ AFTER  (修正後): ボケ役が突拍子もない行動でオチ / モブが的確なツッコミでオチ
                    → たまに風紀委員がオチ = むしろ新鮮に感じる
```

**The Design Philosophy / 設計哲学:**

The combined effect of all three mechanisms realizes a principle analogous to theater casting: **"The actors remain the same; the genre of the script changes every time, and no single actor hogs the curtain call."** The persona defines *how* a character speaks and reacts, the punchline type defines *what situation* they are placed in, and the distribution protocol ensures *who* gets the spotlight rotates fairly. When these three elements are decoupled, the same cast produces entirely different chemical reactions across generations — without ever breaking character.
3つのメカニズムの複合効果は、演劇のキャスティングに似た原則を実現します： **「役者は同じ、脚本のジャンルが毎回変わり、カーテンコールを独占する役者はいない」** 。ペルソナはキャラクターの「喋り方・反応の味」を規定し、オチタイプは「どんなシチュエーションに置かれるか」を規定し、分散プロトコルは「誰がスポットライトを浴びるか」を公平にローテーションします。この3要素が分離されると、同じキャストでも生成のたびに全く異なる化学反応が生まれ——キャラクターの個性を壊すことなく、無限のバリエーションが得られます。

---

**Layer 5 — Narrative Depth & Cliché Prevention Engine (v2.99+) / 第5層 — 物語の深度とテンプレ防止エンジン:**

Even with perfect structure and punchline distribution, AI tends to write safe, passive, and cliché dialogue. To force professional-grade comedic storytelling, the system implements three strict narrative constraints:

完璧な構造とオチの分散があっても、AIは無難で受け身な「よくあるセリフ」を書きがちです。プロレベルのコメディシナリオを強制するため、本システムは3つの厳格な物語制約を実装しています：

1. **GMC Gag Structure (GMCギャグ設計)**: Transitioned from "passive situational setups" to the **Goal, Motivation, Conflict (GMC)** framework. Characters are forced to have a strong, active desire (Goal/Motivation) in Panel 1, which immediately crashes into an absurd, irrational obstacle (Conflict) in Panel 2. The collision of strong desires against impossible walls generates a much more powerful comedic payoff. / 「受け身な状況設定」を廃止し、 **GMC（Goal, Motivation, Conflict）メソッド** を導入。1コマ目でキャラクターに「強烈で能動的な欲求」を持たせ、2コマ目で「理不尽な障害」に衝突させます。強い欲求と絶対的な壁の衝突が、オチの爆発力を飛躍的に高めます。
2. **Guard C Implementation (Guard Cの導入)**: A strict negative-prompt filter targeting AI-specific linguistic clichés. It completely bans lazy explanatory dialogue, weak generic reactions (e.g., "yare yare"), and the ultimate comedy killer: boring narrative summary panels (e.g., "It was a lively day"). / AI特有の言語的テンプレを狙い撃ちにする厳格なネガティブプロンプト。状況説明のセリフ、汎用的な弱いリアクション（「やれやれ」「はぁ…」等）、そしてコメディの最大の敵である「まとめのナレーション（今日も賑やかな一日だった、等）」を完全に禁止します。
3. **Show, Don't Tell - Gag Action (物理的ギャグアクションの強制)**: Emotions must not be explained; they must be visually demonstrated. The AI is strictly forbidden from using internal monologues to state "I'm surprised" or "I'm angry." Instead, it is forced to translate emotions into comedic physical actions (e.g., "hair standing on end", "doing a spit-take"). / 感情を言葉で説明してはならず、視覚的に証明しなければなりません。「驚いた」「怒った」とモノローグで語ることを固く禁じ、代わりにマンガ的な物理アクション（「髪の毛が逆立つ」「コーヒーを噴き出す」等）へ変換することを強制します。

---

**Layer 6 — Advanced Narrative Integration (v3.00+) / 第6層 — 高度な物語メソッドの統合:**

To further elevate the 4-panel format to professional storytelling standards, the system integrates advanced narrative techniques from the Story Maker engine:

4コマ漫画をプロレベルの物語水準へと引き上げるため、Story Makerエンジンから高度な物語技法を統合しました：

1. **Logline Anchoring (ログライン・アンカリング)**: The AI is forced to establish a single, clear logline before generating the panels. This acts as a structural anchor, ensuring that the setup (Panel 1) and the punchline (Panel 4) remain tightly connected, preventing the story from drifting or losing its core comedic premise. / シナリオ生成前に、必ず「ログライン（1行の物語の核）」を明文化させます。これが構造的な「錨（アンカー）」として機能し、1コマ目（フリ）と4コマ目（オチ）が強固に結びつき、物語がブレたり面白さの軸が失われるのを防ぎます。
2. **Subtext-Enforced Dialogue (サブテキスト制約)**: Characters are forbidden from simply stating what is happening. The AI is trained to create a "gap" between what a character says (the facade) and what is actually occurring or what they truly feel (the reality). This irony generates natural, character-driven humor without relying on slapstick. / キャラクターが「見たまま」を説明することを禁止。言葉（建前）と実際の行動・感情（本音）の間に「ズレ（サブテキスト）」を生み出させます。このアイロニーにより、単なるドタバタではない、キャラクターの内面に基づいた自然な笑いを生み出します。
3. **Stakes & Escalation (代償とインフレーション)**: Every conflict must have real "Stakes" (what the character loses if they fail). By raising the stakes in Panel 3, the final resolution or punchline in Panel 4 becomes significantly more impactful, transforming a mild joke into a dramatic climax. / すべての対立には「代償（失敗したらどうなるか）」が設定されます。3コマ目で代償（ピンチ）を吊り上げることで、4コマ目の解決（または爆発）のインパクトが飛躍的に高まり、単なる「ちょっとした冗談」が「ドラマチックなオチ」へと変貌します。

---

**Why This Methodology Alone Cannot Reproduce the System / なぜこのメソッドだけではシステムを再現できないのか:**

The Comedy Structure Engineering described above governs only the **scenario text layer** (STEP2). The full system requires four additional layers that are not covered by comedy theory alone:
上記のお笑い構造設計が制御するのは**シナリオテキスト層（STEP2）のみ**です。完全なシステムには、お笑い理論だけではカバーできない4つの追加レイヤーが必要です：

```
[STEP1] Character Analysis Engine     — Hair topology, gender lock, weighted tag generation
[STEP2] Comedy Structure Engineering  — ★ Described above
[STEP3] Scenario → Image Compiler     — EMOTION tags → VFX weights, Camera → lens distortion
[STEP4] Identity Matrix + Geometry Lock — Per-panel character verification, A4 pixel-level control
[STEP5] Zenith Protocol               — 5-model automatic fallback cascade
```

A "funny script" without the Scenario→Image Compiler produces flat, expressionless illustrations. The comedy methodology provides the *what*; the compiler provides the *how* to render it visually.
「面白い脚本」があっても、シナリオ→画像コンパイラがなければ、無表情で平坦なイラストしか出力されません。お笑いメソッドは「何が面白いか」を設計し、コンパイラが「それをどう絵にするか」を処理します。

### 🇯🇵 [JP] コード解析によるAI漫画システム詳解

本システムの設計思想、**Absolute Physical Geometry Lock**（絶対的物理ジオメトリロック）、**Weighted Immutable Prompts**（重み付き不変プロンプト）などのコア技術、および法的・哲学的な考察を含む詳細な解析レポート（日本語版）です。

* 📄 [詳細ドキュメントを表示する](https://docs.google.com/document/d/1Uk24cAmH2CgYwC1y8_YPW6tp2-sD4OgDRWE8FTH4nTs/edit?usp=sharing)

### 🇺🇸 [EN] Comprehensive Analysis of Autonomous AI Manga System

A detailed analysis report (English version) covering the system's design philosophy, core technologies such as **Absolute Physical Geometry Lock** and **Weighted Immutable Prompts**, and legal/philosophical considerations.

* 📄 [View Detailed Document](https://docs.google.com/document/d/1hOZeV13icbv6R7RLryD2iYpli9n5ujwatC9mi5IYJN8/edit?usp=sharing)

---

## 🛠 Featured Protocols: Super FURU Manga Protocol / 搭載プロトコル

1. **ABSOLUTE PHYSICAL GEOMETRY LOCK & MARGIN CONTROL**
Controls 4-panel layout, aspect ratio, and perspective at the pixel level, while explicitly enforcing rigid, properly-sized white margins (gutters) between panels. Unlike typical AI manga that suffer from absurdly wide white gaps or default entirely to borderless "full-bleed" (tachikiri) compositions, this system ensures a perfectly balanced, professional comic-book aesthetic.
レイアウト、アスペクト比、パースをピクセル単位で制御すると同時に、コマとコマの間の「白い余白（ガター）」の幅を適正かつ厳格に強制します。一般的なAI漫画にありがちな「異様に余白が広すぎる」「逆に枠線がなく全コマがタチキリ（フチなし）になってしまう」といったレイアウトの制御不良を排除し、プロの商業誌のような美しく整頓されたページ構成を保証します。

2. **Weighted Immutable Prompts**
Weights character-specific features to prevent "fusion" or blending between characters.
特徴量に重みを付与。キャラ同士が混ざり合う「フュージョン」を徹底的に防ぎます。

3. **Animation Quality (Level EX-2) & Visual Polish Engine**
Emulates physics-based lighting and SSS (Subsurface Scattering) for peak animation quality. Additionally enforces professional anime rendering standards: **mandatory eye catchlight highlights**, **anime hair shine band** (天使の輪 / angel ring), and a **line weight hierarchy** (foreground 3px / background 1px) for clear depth separation. To prevent the homogenized "Generic AI Face" look, it integrates the **Clean Cel-Look Protocol** (flat colors, negative space) and the **Spatial Isolation Protocol** (distinct character silhouettes), making the output highly optimized for post-generation inpainting and manual correction.
物理ベースのライティング、SSS（肌の透過）をエミュレートし最高峰のアニメクオリティを追求。加えて、プロのアニメ作画基準を強制適用：**目のキャッチライト**、**天使の輪**、**線の太さヒエラルキー**（前景キャラ3px太線/背景1px細線）を全パネルに適用します。さらに、均質化された「汎用AI顔」を抑制するため、**クリーン・セルルック・プロトコル**（フラットな塗りと意図的な余白）および**空間分離プロトコル**（キャラクターの物理的分離と明確なシルエット）を統合し、生成後のインペイント修正や加筆が極めて容易なコンポジションを出力します。

4. **ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0)**
AI-selected camera names (bird's eye, fish-eye, dutch angle, etc.) from the scenario stage are automatically converted into specific lens distortion weight tags during image generation. Fisher-Yates shuffle mathematically guarantees all 4 panels use different camera angles.
AIがシナリオ段階で選んだカメラ名（俯瞰、フィッシュアイ、ダッチアングル等）を、画像生成時に具体的なレンズ歪みウェイトタグへ自動変換。Fisher-Yatesシャッフルにより4コマ全てが異なるカメラアングルになることを数学的に保証します。

5. **Cinematic Lighting & Color Palette Unity**
Enforces professional 3-point anime lighting (key light, fill, rim/backlight), warm/cool color temperature contrast, and volumetric god rays. All 4 panels are required to share a **cohesive color palette** derived from the scene's setting and time of day, using harmonious complementary or analogous color schemes — preventing random color inconsistency across panels.
プロフェッショナルな3点照明（キーライト、フィル、リム/逆光）、暖色/寒色の色温度コントラスト、ボリューメトリック光芒を強制。さらに、全4パネルがシーンの場面設定・時間帯から導出された**統一カラーパレット**を共有することを義務化し、パネル間での色調のバラつきを防止します。

6. **IDENTITY MATRIX - Autonomous Character Consistency (v2.25)**
Automatically analyzes hair color, hairstyle, and glasses status from character sheets and injects a "verification matrix" into every panel's prompt, forcing the AI to self-verify before drawing each panel. Includes anti-clone prevention (no duplicate character drawing), automatic background cast placement, solo shot detection, and 3-zone slotting for 3-character dialogues.
キャラクターシートから髪色・髪型・メガネ有無を自動解析し、全コマのプロンプトに「照合マトリクス」として注入。AIが各コマを描く前に自己検証を強制します。クローン防止（同一キャラの二重描画禁止）、背景キャスト自動配置、ソロショット判定、3人掛け合い時の3ゾーンスロッティングまで全自動です。

7. **Emotion Style Tag System - Per-Panel Art Style Switching (23 Styles)**
   The scenario AI autonomously selects the optimal style tag for each panel's emotion from a palette of **23 distinct visual styles**. Core styles include CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT / WATERCOLOR / RETRO / GLITTER / SHADOW / SPEED / FLASHBACK / UKIYOE / POP_ART / SKETCH / NEON, plus context-aware styles added in v2.95: THICK_PAINT (impasto for serious/political), PASTEL (soft for heartwarming), CEL (retro cel animation), DARK_ANIME (atmospheric for suspense), THIN_LINE (delicate for emotional), and HIGH_SATURATION (vivid for excitement). Art style, VFX, and proportions are automatically switched during image generation. Includes fallback styles for multi-character panels.
   シナリオ生成AIが各コマの感情に最適なスタイルタグを**全23種の画風パレット**から自律選択。CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT / WATERCOLOR / RETRO / GLITTER / SHADOW / SPEED / FLASHBACK / UKIYOE / POP_ART / SKETCH / NEONに加え、v2.95で文脈対応型の新画風を追加：THICK_PAINT（厚塗り／政治・シリアス向け）、PASTEL（パステル／癒し向け）、CEL（セル画風／エンタメ向け）、DARK_ANIME（ダーク調／サスペンス向け）、THIN_LINE（繊細線画／感動向け）、HIGH_SATURATION（高彩度／興奮向け）。画像生成時に絵柄・VFX・プロポーションが自動切替されます。マルチキャラパネル用のフォールバックスタイルも搭載。

---

## 💻 Tech Stack / 技術スタック

* **Frontend**: React 19 / Vite 7 / Tailwind CSS v4
* **LLM/VFM**: Google Gemini API (3.x Flash / 2.5 Flash / 2.5 Pro) + Gemini Native Image Generation / ChatGPT Images 2.0 Supported via Prompt Enhancement
* **Logic**: Zenith Protocol - Multi-tier model fallback (5-model text cascade, 4-model image cascade) with automatic 429/404 retry and account-level model auto-discovery.

---

## 📝 Setup & Launch / セットアップと起動

### ☁️ Cloud / Browser (Deploy)

1. **Get API Key**: Obtain a Gemini API key at [Google AI Studio](https://aistudio.google.com/).
   [Google AI Studio](https://aistudio.google.com/) で Gemini API キーを取得してください。
2. **Access**: Open the deployed web app.
   Webアプリにアクセスし、APIキーを入力してスタートします。
   > **Demo Link / デモサイト** [https://furuyan1234.github.io/nano-banana-pro/](https://furuyan1234.github.io/nano-banana-pro/)

### 💻 Local Launch (Windows) / ローカルでの起動(Windows)

You can launch strict local environment with a single click.
以下の手順で、ローカル環境を簡単に起動できます。

1. **Download**: Download the Source Code (ZIP) from [Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases) or click "Code" -> "Download ZIP".
   [Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases) または "Code" ボタンからZIPファイルをダウンロードします。
2. **Unzip**: Extract the ZIP file to any folder.
   ダウンロードしたZIPファイルを解凍してください。
3. **Run**: Double-click `start_app.bat`.
   フォルダ内の `start_app.bat` をダブルクリックします。
   *(Node.js required / 事前にNode.jsのインストールが必要です)*
4. **Start**: The system will automatically install dependencies and launch the browser.
   必要なライブラリが自動インストールされ、ブラウザが立ち上がります。

> [!NOTE]
> **Local API Proxy / ローカルAPIプロキシ**
> ローカル開発環境（`localhost`）では、ブラウザの`Origin`ヘッダーによりGoogle API側がAPIキーの使用を拒否する場合があります。この問題を回避するため、`vite.config.js` に `/gemini-api` パスへのリバースプロキシが設定されています。ローカル起動時、API通信はこのプロキシを経由して透過的にGoogle APIへ転送されます。本番ビルド（GitHub Pages等）では直接Google APIにアクセスするため、プロキシは使用されません。
> In local development (`localhost`), browsers may reject API key usage due to the `Origin` header. A reverse proxy is configured in `vite.config.js` at the `/gemini-api` path to transparently route API calls through the Vite dev server. This proxy is only active during local development and is not used in production builds.

---

## ⚖️ Compliance & Legal Stance / 法的遵守について

### Japanese Copyright Law (Article 30-4)

This project is developed in full compliance with **Article 30-4 of the Japanese Copyright Act**, which allows for the exploitation of copyrighted works for information analysis and technological development of AI.
本プロジェクトは、日本の著作権法第30条の4（情報解析目的等での利用）に基づき、技術検証および情報解析を目的として開発されており、法的に適正な範囲内で公開されています。

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
  Applies to software logic and implementation code. / ソフトウェアの動作ロジックおよび実装コードに適用。
* **Logic & Prompts**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.ja)
  Applies to original design philosophy and prompt structure. / 設計思想およびプロンプト構造に適用。
* **Output Ownership / 生成物の帰属**:
  The CC SA (ShareAlike) requirement **does not apply** to manga works generated by this system. Rights belong to the user.
  本システムで生成されたマンガ作品に上記CCライセンスの継承義務は適用されません。権利はユーザーに帰属します。
  *Maintaining the signature "Generated by Super FURU AI 4-Koma System" is strongly recommended.*
  署名の維持を強く推奨します。

**Commercial Use and Paid Seminars / 商用利用・有料セミナーについて**
Usage of this system (including prompts and logic) in high-priced information products, paid seminars, or any "get-rich-quick" schemes is strictly prohibited under the CC BY-NC-SA 4.0 license.
本システム（プロンプトおよびロジックを含む）を、高額な情報商材、有料セミナー、または「副業・稼げる」等の謳い文句を伴うビジネスに無断で使用することは、CC BY-NC-SA 4.0ライセンスに基づき、固く禁じます。

Any commercial or educational use involving fees requires explicit prior written consent from the developer (FURU).
有料の教育目的や商用利用を検討される場合は、必ず事前に開発者（FURU）の書面による承諾を得てください。

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
- 第三者の著作権、商標権、肖像権、パブリシティ権等を侵害するコンテンツの生成、公開、販売、頒布
- 既存IPに類似したコンテンツの無断商用利用

Generating, distributing, or monetizing infringing or derivative content without permission.

#### (3) 入力データの不正利用 / Misuse of Input Data
- ユーザーは、入力する画像やテキスト等について、適法な権利または使用許諾を有することを保証するものとします。
- 権利を有しない第三者のコンテンツを入力として使用する行為

Users must have legal rights to all input data.

#### (4) 不正利用の助長 / Facilitation of Misuse
- 権利侵害を目的としたプロンプト、テンプレート、ワークフローの作成・共有
- 他者の侵害行為を促す行為

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

権利侵害の申し立てがあった場合、開発者の独自の判断により以下の対応を行う場合があります。
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

#### 1. Nano Banana 2 and ChatGPT Images 2.0 Powered Super AI 4-koma System
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

### v3.26-alpha (2026-05-11)
- **[Docs/System]** 立ちポーズ高品質化のリリースノートおよびドキュメントにおける特定の外部参照記載を一般論に基づく表現に修正し、情報セキュリティ基準を適用しました。 / Applied information security standards to remove specific external references from the standing pose enhancement release notes and documentation, replacing them with generalized terminology.

### v3.25-alpha (2026-05-11)
- **[Prompt/Visuals]** 最新の生成AIにおける空間表現のベストプラクティスを基に、内部生成プロンプトおよび「1枚絵用コピーボタン」の両方に、立ちポーズの高品質化指示（「コントラポストによる体重移動」「足先を揃える」等）を統合しました。これにより、足元の破綻を防ぎ、より自然で魅力的な立ち姿を生成可能になりました。 / Integrated industry best-practice standing pose techniques ("contrapposto weight-shift", "keeping toes aligned together") into both the internal generation prompt and the Single-Illustration Copy Button, preventing messy foot generation and creating more natural, attractive postures.

### v3.24-alpha (2026-05-11)
- **[Feature]** ヘッダー部分に、Web版ChatGPTで手動で1枚絵を生成する際にシステム独自の強力な作画ノウハウ（クリーン・セルルック・プロトコル等）を持ち出せる「1枚絵 ChatGPT用プロトコル コピーボタン（β）」を追加しました。 / Added a "Single-Illustration Protocol Copy Button (Beta)" to the header, allowing users to extract the system's powerful drawing know-how (Clean Cel-Look Protocol, etc.) and paste it directly into the Web version of ChatGPT for manual high-quality single image generation.
- **[System]** 今後システム側の内部プロンプトが強化・アップデートされた際に、コピペ用ボタンのプロンプトテキストも同時に同期させる保守運用ルール（Prompt Synchronization Protocol）をプロジェクト防衛ラインに追加しました。 / Added the "Prompt Synchronization Protocol" to the project guardrails to ensure that future updates to the system's internal generation prompt are simultaneously synchronized with the copy-paste button's text.

### v3.22-alpha (2026-05-11)
- **[Prompt/Quality]** Added "Dangerous Secret Self-Review Command" (Anatomy & Text Self-Correction Protocol) to the Final Output Check to force the AI to self-review finger counts and spelling mistakes before generating the final image. / 海外のプロンプトハック「自己レビュー命令（危険な秘密）」を導入し、画像出力前にAI自身に指の数やスペルミスを強制自己確認させる仕組みを最終チェックリストに追加しました。

### v3.21-alpha (2026-05-11)
- **[Prompt/Visuals]** Added "Flat colors, intentional negative space" and "Clear silhouettes, distinct physical separation" to the Ultra-Compressed Prompt to prevent the homogenized "Generic AI Face" look and make characters more inpaint-friendly. / プロンプトに「クリーン・セルルック（Flat colors, intentional negative space）」と「空間分離プロトコル（Clear silhouettes）」を追加し、汎用AI顔（均質化されたAI特有の画風）を抑制・修正を容易にしました。

### v3.20-alpha (2026-05-11)
- **[Feature]** 画像生成クオリティを底上げする5つの視覚的改善を追加。(1) アニメ目のキャッチライト（瞳の星形ハイライト反射）を必須化、(2) 天使の輪（髪のツヤベルト）をアニメ作画標準として強制、(3) 線の太さヒエラルキー（前景キャラ3px/背景1px）で奥行き分離を明確化、(4) カラーパレット統一指示により全4パネルの色調を場面設定から自動統一、(5) シネマティックライティングセクションにカラーパレット統一ルールを統合。いずれもプロンプト長への影響は+3行（約250文字）に抑制。 / Added 5 visual quality improvements: (1) mandatory eye catchlight highlights, (2) anime hair shine band (angel ring), (3) line weight hierarchy (3px foreground / 1px background), (4) color palette unity directive, (5) integrated color harmony into cinematic lighting section. Total prompt increase: only +3 lines (~250 chars).

### v3.19-alpha (2026-05-11)
- **[Bugfix]** v3.18で導入した超圧縮パイプラインにおいて、4つのRegex（正規表現）がサイレント失敗していたバグを修正。(1) 重み付きタグ `(tag: 2.5)` のコロン後スペース非対応、(2) ANTIGRAVITY CAMERA PROTOCOLのヘッダー不一致 (`Camera and Composition Rules:` vs 実際の `Camera & Comp:`)、(3) パネル内 `[LENS]:` タグ名の不一致 (`[LENS ENFORCEMENT]:` を探索)、(4) `Important constraints` と `FINAL COMPLIANCE CHECK` の削除順序依存バグ。これにより、プロンプトの実効圧縮率が約20%→100%に改善し、AIのアテンション集中度が大幅に向上しました。 / Fixed 4 silently-failing regex bugs in the ultra-compression pipeline introduced in v3.18: (1) weighted tag space handling, (2) camera protocol header mismatch, (3) [LENS] tag name mismatch, (4) deletion order dependency between Important constraints and FINAL COMPLIANCE CHECK. This improved actual compression rate from ~20% to 100%, significantly boosting AI attention density.

### v3.18-alpha (2026-05-11)
- **[Feature]** Gemini環境での再現度低下に対策するため、ChatGPT向けに最適化していた「超圧縮・MUST/NO構文」のプロンプトアーキテクチャを全モデル（Geminiネイティブ環境を含む）に普遍的に適用しました。機能と品質を一切落とさず、自然言語の贅肉を削ぎ落とすことでAIのアテンションを集中させ、指示の遵守率向上を図りました。 / Applied the "ultra-compressed, MUST/NO syntax" prompt architecture, originally optimized for ChatGPT, universally across all models (including native Gemini environments) to combat decreased reproduction fidelity. By stripping away conversational filler without sacrificing any features or quality, the AI's attention is focused on critical rules, improving overall instruction adherence.

### v3.17-alpha (2026-05-11)
- **[UI/UX]** 画像生成APIエラー（権限エラー、タイムアウト、フォールバック発生時）に表示されるエラーガイドを刷新しました。AI制限等で手動生成（ChatGPT/Gemini Web版）へ誘導する際、キャラクターの一貫性を保つため「元となるキャラクターシート画像を一緒に添付すること」を必須の指示として明記しました。 / Revamped the error guides displayed during image generation API errors (permission errors, timeouts, and fallback occurrences). When directing users to manual generation (ChatGPT/Gemini Web) due to AI limitations, explicitly added instructions to "attach the original character sheet image" to ensure character consistency.

### v3.16-alpha (2026-05-10)
- **[Feature]** ChatGPT Images 2.0での画像生成において、キャラクターが背景に埋没する問題（カモフラージュ現象）および過剰なキラキラ感（パーティクル・レンズフレア等）を解消するため、プロンプト・アーキテクチャを強化。極太の黒インクのアウトライン、2〜3pxの白発光（コンポジット効果）、そして逆光ハイライトを強制し、視認性とプロフェッショナルな漫画の美しさを確保しました。 / Strengthened the prompt architecture for ChatGPT Images 2.0 to resolve issues with characters blending into backgrounds (camouflage effect) and excessive "sparkly" artifacts (particles, lens flares, etc.). Enforced thick black ink outlines, a 2-3px white compositing glow, and radial backlighting to ensure visual clarity and professional manga aesthetics.

### v3.15-alpha (2026-05-10)
- **[Feature]** FACS (Facial Action Coding System) エンジンを実装。従来の抽象的な感情タグを廃止し、Action Units（AU）を用いた解剖学的記述をプロンプトに注入するロジックを導入しました。これにより、表情の崩壊を物理レベルで抑制し、高度なキャラクター表現が可能になりました。 / Implemented the FACS (Facial Action Coding System) engine. Replaced vague emotional tags with anatomical descriptions using Action Units (AUs) injected directly into the prompt, effectively suppressing facial distortion at the physical level and enabling highly nuanced character expressions.
- **[System]** ChatGPT (DALL-E 3) 利用時の4000文字制限を回避するため、プロンプトアーキテクチャの超圧縮最適化を実施。命令文を「単語・箇条書き・MUST/NO構文」へと極限まで削ぎ落とし、クオリティを維持・向上させつつ安全圏での生成を実現しました。 / Executed ultra-compression optimization of the prompt architecture to bypass the 4,000-character limit when using ChatGPT (DALL-E 3). Instructions were ruthlessly stripped down to "keywords, bullet points, and MUST/NO syntax," ensuring safe generation while maintaining or even improving image quality.

### v3.14-alpha (2026-05-10)
- **[Doc]** README.md内の「ChatGPT Images 2.0 Mode」および「OpenAI API Direct Execution」の記述を、最新仕様（`gpt-image-2`への移行、超圧縮プロンプトの採用、ブラウザ版ChatGPTへのハイブリッド手動コピペ運用前提）に正確に更新しました。 / Updated README.md to accurately reflect the latest ChatGPT optimization specs (migration to `gpt-image-2`, ultra-compressed prompts, and mandatory hybrid manual copy-paste workflow to the browser version).

### v3.13-alpha (2026-05-10)
- **[Feature]** キャラクター解析結果および生成シナリオの出力エリア下部に専用のコピーボタン（クリップボードコピペ機能）を実装。コピー時の状態遷移（「コピー完了」のフラッシュ表示）および、生成前の非活性化（Disabled）を完全にサポートし、手作業によるコピー＆ペーストの作業効率を劇的に向上させました。 / Implemented dedicated copy-to-clipboard buttons below the character analysis and generated scenario text areas. Supports visual feedback (green "Copied" flash) and disabled state before generation, drastically improving the efficiency of manual copy-paste workflows.
- **[BugFix]** `extractPanel`での髪色抽出において正規表現を修正し、`red hair tips` などの複合色指定から基本色が誤抽出されるバグ（シナリオブリード）を完全に解決しました。 / Fixed a regex extraction bug in `extractPanel` where compound colors like "red hair tips" caused inaccurate primary color parsing (scenario bleed), ensuring strict adherence to the exact hair descriptors.
- **[Feature]** プロンプト内の `CAMERA ENFORCEMENT`（背景描写）におけるハードコード（bookshelves, desks 等）を撤廃し、AIが生成したシナリオ側の `Location` の値を動的に注入する仕組みに刷新。場所指定が全コマへ正確に反映されるようになりました。 / Eliminated hardcoded background elements (bookshelves, desks) in the `CAMERA ENFORCEMENT` section, replacing them with dynamic injection of the scenario's `Location` variable to ensure environmental consistency across all panels.
- **[Improve]** ダッチアングル（Dutch angle）のカメラワーク指示を「視覚的に傾きがイメージできる表現（キャラクターが横に滑る、家具も傾く等）」に刷新し、描画AIが確実にダイナミックな傾きを反映できるよう画力・演出効果を底上げしました。 / Enhanced the structural description for Dutch angle camera work by adding visually descriptive cues (e.g., characters sliding, furniture tilting), guaranteeing that the rendering AI fully commits to the dynamic, slanted perspective.

### v3.12-alpha (2026-05-09)
- **[UI/UX]** UI/ログの完全日本語化を実施。思考トレース（Thinking Trace）が利用できない標準モデル使用時のメッセージを「通常処理が完了しました。」と簡潔化し、ユーザーの混乱を招く不要な注釈（「思考トレースは利用不可」や「推論ログなし」など）を排除しました。 / Localized UI logs to Japanese completely. Simplified the fallback message for standard models without Thinking Trace to "通常処理が完了しました。" (Normal processing completed), removing confusing annotations.
