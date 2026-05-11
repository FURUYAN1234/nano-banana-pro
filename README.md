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
Emulates physics-based lighting and SSS (Subsurface Scattering) for peak animation quality. Additionally enforces professional anime rendering standards: **mandatory eye catchlight highlights** (star-shaped or circular white reflections in pupils for "living" eyes), **anime hair shine band** (天使の輪 / angel ring — a curved gradient streak across hair), and a **line weight hierarchy** (foreground characters at 3px bold ink outlines, background objects at 1px thin lines) for clear depth separation.
物理ベースのライティング、SSS（肌の透過）をエミュレートし最高峰のアニメクオリティを追求。加えて、プロのアニメ作画基準を強制適用：**目のキャッチライト**（瞳に星形または円形の白いハイライト反射を必須化し「生きた目」を実現）、**天使の輪**（髪に白〜透明のグラデーション光沢帯を強制描画）、**線の太さヒエラルキー**（前景キャラ3px太線/背景1px細線による奥行き分離の明確化）を全パネルに適用します。

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

### v3.07-alpha (2026-05-08)
- **[HotFix]** コピペボタンのテキスト動的切り替え機能（Gemini/ChatGPTモード連動）がデプロイ時に一部欠落していた問題を修正し、完全に復元しました。 / Restored the dynamic copy button text switching functionality that was accidentally omitted during the previous deployment.

### v3.06-alpha (2026-05-08)
- **[Feature]** コピペボタンのテキストを「ChatGPT専用プロンプトモード」のチェック状態に連動して動的に切り替わるよう修正。ユーザーの利便性と互換性問題への注意喚起を強化しました。 / Updated the copy button text to dynamically switch based on the "ChatGPT Mode" toggle state, improving usability and clearly warning users about cross-platform compatibility issues.
- **[System]** バージョン自動更新スクリプト（`update_version.js`）を修正し、`vX.Y-alpha`の厳密なフォーマット（`.0` サフィックスの排除）を強制するよう改善しました。 / Fixed the version bump script (`update_version.js`) to strictly enforce the `vX.Y-alpha` semantic formatting by removing the unwanted `.0` suffix.

### v3.05-alpha (2026-05-08)
- **[BugFix]** `extractPanel`の正規表現エスケープ処理の不具合を修正し、シナリオテキストがプロンプトに漏れ出す問題（シナリオブリード）を解決しました。 / Fixed a regex escape issue in `extractPanel` that caused scenario text to bleed into the generated prompts.
- **[Feature]** ChatGPTモード有効時に警告バッジを表示するUIを追加し、プロンプトの冗長性を削減するよう最適化しました。 / Added a warning badge UI when ChatGPT mode is active and optimized prompts for better length reduction.
- **[System]** バージョン表記のルールを `vX.Y-alpha` の形式に統一し、デプロイ用スクリプトが正しくバージョンを検証できるよう修正しました。 / Standardized versioning format to `vX.Y-alpha` and updated deployment scripts to correctly validate semantic version strings.
- **[Docs]** READMEの文字化け（エンコーディング不具合）を修正し、Hugging FaceのREADME同期ルールをドキュメントに追加しました。 / Fixed README encoding corruption (mojibake) and added Hugging Face README synchronization rules to the deployment documentation.

### v3.02.0-alpha (2026-05-03)
- **[BugFix]** ChatGPTモード（GPT-image-2）で生成されるプロンプトにおいて、ページ全体に黒い外枠（border）が描画される問題を修正。`OUTER FRAME` という表現がDALL-Eに物理的な枠線描画として解釈されていたため、`image boundaries` に変更し、さらにANTI-NOISEセクションに枠線描画の明示的禁止（NO PAGE BORDERS）を追加するダブルブロック方式で対策しました。 / Fixed a bug in ChatGPT mode (GPT-image-2) where a black border was drawn around the entire page. The phrase "OUTER FRAME" was interpreted by DALL-E as a physical border drawing instruction; replaced with "image boundaries" and added explicit "NO PAGE BORDERS" rule to the ANTI-NOISE section as a double-block countermeasure.
- **[Cleanup]** 古いバックアップファイル（`temp_App_backup.jsx`）をリポジトリから削除。世界公開リポジトリの美観を維持。 / Removed stale backup file (`temp_App_backup.jsx`) from the repository for a cleaner public-facing codebase.

### v3.01.0-alpha (2026-05-03)
- **[BugFix]** 2周目以降のシナリオ生成時（STEP2・STEP3開始時）に、前回の「画像生成ログ（STEP4）」が残ってしまう不具合を修正し、常にクリーンな状態で進行状況を確認できるように改善しました。 / Fixed a bug where the image generation log from previous sessions remained visible; logs are now properly cleared at the start of new scenario or prompt generation steps.

### v3.00.0-alpha (2026-05-03)
- **[Major]** Story Makerエンジンから高度な物語技法（GMC+Sメソッド）を統合。「ログライン・アンカリング」による物語のブレ防止、「サブテキスト制約」による建前と本音のズレ（アイロニー）の強制、「Stakes（代償）」の吊り上げによるオチの爆発力強化を実装し、シナリオ品質が飛躍的に向上しました。 / Integrated advanced narrative techniques from the Story Maker engine (GMC+S methodology), including Logline Anchoring, Subtext-Enforced Dialogue, and Stakes Escalation to dramatically improve scenario quality and comedic impact.
- **[UI]** 生成されたシナリオのヘッダーに、AIが構築した「Logline（ログライン）」を表示する機能を追加。プロットの設計図が可視化され、構成の意図が人間にも明確に伝わるようになりました。 / Added a visible "Logline" field to the generated scenario output, allowing users to clearly understand the AI's core narrative blueprint.

### v3.21-alpha
- **[Prompt/Visuals]** Added "Flat colors, intentional negative space" and "Clear silhouettes, distinct physical separation" to the Ultra-Compressed Prompt to prevent the homogenized "AI Face/Masupi Face" look and make characters more inpaint-friendly. / プロンプトに「引き算の美学（Flat colors, intentional negative space）」と「インペイント向け分離構図（Clear silhouettes）」を追加し、マスピ顔（均質化されたAI絵）を抑制・修正を容易にしました。

### v2.99.0-alpha (2026-05-02)
- **[Feature]** GMC Gag Structure (GMCギャグ設計) を統合。ランダムな状況生成から、GMC（Goal, Motivation, Conflict）メソッドを用いたキャラ駆動の構成に変更し、強い欲求と理不尽な障害の衝突によりオチの爆発力を強化しました。 / Transitioned from random scenario generation to a structured conflict-driven approach using the Goal, Motivation, Conflict (GMC) framework.
- **[Feature]** Guard C Implementation (Guard Cの導入)。AI特有の退屈な「まとめのナレーション」や「汎用的な弱いリアクション（やれやれ等）」、状況説明のセリフを完全に禁止する厳格なフィルターを導入しました。 / Integrated strict AI-cliché filters to completely eliminate boring narrative summaries, weak reactions, and lazy explanatory dialogue.
- **[Feature]** Show, Don't Tell - Gag Action (物理的ギャグアクションの強制)。感情を言葉で説明するのではなく、マンガ的な物理アクション（髪の毛が逆立つ、コーヒーを噴き出す等）で表現させるよう指示を強化しました。 / Tightened prompts to enforce visual dynamism over abstract emotions, forcing the AI to describe comedic physical actions (e.g., hair standing on end, doing a spit-take).
- **[UI/UX]** フルオート生成時、STEP4（画像生成）開始時にブラウザの表示位置を「画面の最下部（画像生成エリア）」まで自動スクロールするよう改善。ノートPC等の狭い画面でも進捗が隠れず確実に視認可能になりました。 / Improved auto-scrolling during Full-Auto mode. The viewport now correctly scrolls to the absolute bottom (Image Generation section) when STEP 4 starts, ensuring the progress and generated images are fully visible even on smaller screens.
- **[Docs]** ドキュメントにおける日本語Markdownの太字パース不具合（カッコと文字間の隣接バグ）を修正し、今後の防衛ルールとして `project_standards.md` に明記しました。 / Fixed a Japanese Markdown bold parsing issue in the Manifesto section and added preventative guidelines to the project standards.

### v2.97.0-alpha (2026-05-02)
- **[Feature]** 服装（Outfit）おまかせ選定時の「クローン化（全員が全く同じ服を着る問題）」を防止。AIへのプロンプト指示を修正し、「白のビキニ」等の細かすぎる指定ではなく「水着」「私服」「ナース服」等の **大分類のカテゴリー** に留めることで、画像AIがキャラクター個別の着こなしを適用する余白を確保しました。 / Prevented the "clone effect" in the Outfit Auto-Select system where all characters would wear the exact same specific clothing. Updated the AI prompt to output broad clothing categories (e.g., "swimwear", "casual wear", "nurse uniform") instead of overly specific descriptions, leaving room for the image generation AI to apply individual styling based on each character's identity.

### v2.96.0-alpha (2026-05-02)
- **[Feature]** 服装（Outfit）の文脈認識型自動選定システムを実装。空欄の際、従来の「キャラシート準拠」デフォルト動作を廃止し、AIがシナリオの状況・場所・文脈を分析して、適切な服装（水着、スーツ、制服等）を **具体的な衣装名** で自律的に選定・適用するように改善しました。場所（Location）と同等の「AIおまかせ」挙動に統一。 / Implemented context-aware Outfit Auto-Select system. Replaced the previous "character sheet default" behavior: when left blank, AI now analyzes the scenario context (situation, location, mood) and autonomously assigns specific attire names (swimwear, suits, uniforms, etc.) instead of vague defaults. Unified with the same "AI Auto-Select" behavior as the Location field.
- **[UI]** 生成プレビュー（GENERATION PREVIEW）の場所・服装表示を統一。ユーザー手入力値は白文字、AIおまかせ選定値は青文字＋✨アイコンで視覚的に区別可能に。 / Unified the Generation Preview display for Location and Outfit fields. User-specified values shown in white, AI-selected values shown in blue with ✨ icon for clear visual distinction.
- **[Infra]** ローカル開発環境向けにViteリバースプロキシを導入。`localhost`でのブラウザOriginヘッダーによるAPIキー拒否問題を解消。 / Added Vite reverse proxy for local development to bypass browser Origin header API key rejection on `localhost`.
- **[Cleanup]** 不要な一時ファイル（バックアップ、テストスクリプト等）をリポジトリから整理・削除。 / Cleaned up unnecessary temporary files (backups, test scripts) from the repository.

### v2.95.0-alpha (2026-05-02)
- **[Feature]** Emotion Style Tag（画風パレット）を6種追加し、合計23種に拡張。`THICK_PAINT`（厚塗り）、`PASTEL`（パステル）、`CEL`（セル画風）、`DARK_ANIME`（ダーク調）、`THIN_LINE`（繊細線画）、`HIGH_SATURATION`（高彩度ビビッド）をAIが文脈から自動選択可能に。 / Expanded the Emotion Style Tag palette by 6 new styles (total 23): `THICK_PAINT`, `PASTEL`, `CEL`, `DARK_ANIME`, `THIN_LINE`, and `HIGH_SATURATION`, all automatically selected by AI based on scenario context.
- **[Feature]** Anti-Persona-Gravity Protocol v1.0 を導入。特定の権威キャラ（風紀委員等）が4コマ目のオチを毎回独占するパターンを防止し、全キャラに均等にオチの主導権を分散させるシナリオ生成ルールを追加。 / Introduced Anti-Persona-Gravity Protocol v1.0 to prevent authoritative characters (e.g., discipline committee members) from monopolizing 4th-panel punchlines, distributing punchline ownership evenly across all cast members.

### v2.94.0-alpha (2026-05-01)
- **[UI Fix]** フッターのコピーライト表記を正式なフルネーム（`NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM`）へと修正しました。 / Updated the footer copyright text to use the full official application name (`NANO BANANA 2 & CHATGPT IMAGES 2.0 POWERED SUPER AI 4-KOMA SYSTEM`).

### v2.93.0-alpha (2026-05-01)
- **[UI Fix]** フッターのコピーライト表記にて、文字が密着して視認性が下がる問題（「FURUNANO」と結合してしまう等）を解消。表示を `© 2026 FURU | NANO BANANA 2 & SUPER AI 4-KOMA SYSTEM` に変更し、ダークモード環境でも区切りが明確に視認できるようパイプ文字によるセパレータと適切なマージンを導入しました。 / Fixed a visual issue in the footer copyright text where words would merge (e.g., "FURUNANO"). Changed the layout to use a visible pipe separator and appropriate margins (`© 2026 FURU | NANO BANANA 2 & SUPER AI 4-KOMA SYSTEM`) to ensure clarity even in dark mode environments.

### v2.92.0-alpha (2026-05-01)
- **[UI Fix]** フッターのコピーライト表記を実際の権利者名（FURU）と最新のアプリケーション名（NANO BANANA 2 & SUPER AI 4-KOMA SYSTEM）を反映する形式に修正しました。 / Updated the footer copyright notice to accurately reflect the correct rightsholder (FURU) and the latest application name (NANO BANANA 2 & SUPER AI 4-KOMA SYSTEM).

### v2.91.0-alpha (2026-05-01)
- **[UI Fix]** 「シナリオ強化」および「コンテンツポリシー」パネルのUIスタイルを統一・改善。ヘッダー部分に太字、左アクセントバー、大きなChevronアイコンを採用し、開閉可能な操作要素であることを明確化。また「クリックで開く」「クリックで閉じる」の日本語表記へ統一。 / Unified and improved the UI styling for the "Scenario Enhancement" and "Content Policy" panels. Applied bold text, a left accent bar, and a larger Chevron icon to the headers to clarify interactability, and standardized the toggle text to Japanese ("クリックで開く" / "クリックで閉じる").

### v2.90.0-alpha (2026-05-01)
- **[Fix]** Fixed a bug where the Reset Input button did not clear the character analysis results (castList). Now all data from STEP 1 onward is fully cleared on reset. / 「入力をリセット」ボタンを押した際に、キャラクター解析結果（castList）がクリアされなかったバグを修正。リセット時にSTEP1以降のデータが完全にクリアされるようになりました。
- **[Improve]** Implemented a JS-side random punchline type selector (8 types) to prevent repetitive endings. Also added Anti-Persona-Gravity rule to prevent character traits from being directly used as punchlines. / オチのマンネリ化を防ぐため、JS側でランダムにオチタイプ（8種類）を決定するシステムを実装。またキャラクターの固有設定（趣味・口癖等）がそのままオチに使われることを禁止するAnti-Persona-Gravityルールを追加。
- **[Cleanup]** Removed unused `resetAll` function from codebase. / 未使用の `resetAll` 関数をコードから削除。
### v2.89.0-alpha (2026-04-30)
- **[Security]** OpenAI APIキーの管理手法を強化。ブラウザの`localStorage`への永続保存を完全廃止し、セキュアなインメモリ（RAM）上でのみ保持する設計にリファクタリング。ブラウザリロードでキーが安全に揮発することを保証。

### v2.87.0-alpha (2026-04-30)
- **[System]** Finalized Full Auto pipeline UI/UX, explicitly ensuring accurate `isAborting` state feedback ("停止処理中...") even during asynchronous interruptions in Step 1 (character analysis), and fixed unreadable color styles during disabled/aborting states. / フルオート生成のUI/UXを完成。STEP1（キャラクター解析中）の非同期処理中に中断した際も、正確に「停止処理中...」のステータスフィードバックを表示するように修正し、無効化時のボタン色が見えなくなる問題を解消しました。

### v2.85.0-alpha (2026-04-30)
- **[UI Fix]** Fixed text overflow and layout truncation on extremely narrow browser widths by implementing `flex-wrap` and `whitespace-normal` on the header elements, making the sticky progress bar completely responsive. / ブラウザ幅を極端に狭めた際に文字が見切れる問題を修正。ヘッダーに `flex-wrap` と `whitespace-normal` を導入し、完全なレスポンシブ対応を実現しました。
- **[UI Fix]** Validated "Full Auto" button action-oriented labeling ("⚡ フルオート ON" / "⏹ フルオート中断") to provide optimal UX, and corrected the instructional text to accurately reflect the system's hard reset behavior upon interruption. / フルオートボタンのアクション指向の表記（「⚡ フルオート ON」 / 「⏹ フルオート中断」）を最適化し、中断後に再開した際の仕様（STEP2からの新シナリオ再生成）が説明文に正確に反映されるよう修正しました。

### v2.83.0-alpha (2026-04-29)
- **[System]** Complete restoration of v2.81 UI layout including centered sticky progress bar and correct full auto button logic. The broken regressions from v2.82 have been completely reverted. / v2.81のUIレイアウト（中央配置のスティッキー進捗バーや正しいフルオートボタンロジックを含む）を完全に復旧しました。v2.82で発生したレイアウト崩壊を排除しました。

### v2.82.0-alpha (2026-04-29)
- **[System]** Emergency Revert & UI Stability Recovery. Reverted the codebase to v2.77.0-alpha to discard experimental layout regressions and ensure stable operation. Re-established the single, unified sticky header design. / 緊急ロールバックおよびUI安定性の回復。実験的なレイアウト改悪を破棄し、安定動作を保証するためv2.77.0-alphaの状態に完全に復元しました。

### v2.88.0-alpha (2026-04-30)
- **[Feature]** OpenAI API (ChatGPT Images 2.0) 直接生成のテスト機能を実装。専用のセキュアなモーダルUI（入力文字のマスク対応）を通じ、ブラウザのローカルストレージにAPIキーを保存し、アプリから直接画像生成APIを叩く基盤を構築。
- **[System]** OpenAI API通信に対する180秒の強制タイムアウト（AbortController）セーフティ機能を実装。ChatGPT Images 2.0 サーバーの応答なしによる無限フリーズを防止。
- **[System]** APIエラー（400文字数オーバー、401無効キー等）を動的に検知し、APIキーの状態（Google側かOpenAI側か）に応じて「手動生成への代替手順」を提示するインテリジェントなエラーハンドリングを追加。
- **[UI]** 画像生成ログ（ターミナル）への自動追従スクロール機能を実装。生成中のステータス変動やエラーメッセージが常に最新の最下行で確認可能に。
- **[Fix]** STEP2およびSTEP3のボタンを手動で押した際、非同期処理の競合によりシステムがクラッシュするイベント伝播バグを修正。
- **[UI]** 画面幅やデバイス環境に依存しないレスポンシブなスティッキーヘッダーの再構築および、「画像比率事後修正プロンプト」ボタンのブロック独立化による視認性向上。

### v2.86.0-alpha (2026-04-30)
- **[Feature]** フルオート「無限ループ（Endless Mode）」機能を試験実装。生成完了後にキャラクター設定を保持したまま、新しいニュース・お題で自動的に次々とシナリオを生成し続ける機能を追加。

### v2.77.0-alpha (2026-04-29)
- **[Feature]** Enhanced GPT-image-2 Anti-Noise Protocol: Integrated comprehensive noise countermeasures based on community research. Added Positive Safe Rendering Block (smooth cel shading, clean color surfaces, low texture density, etc.), Banned Prompt Word Combinations (e.g., ultra-detailed + film grain), and Light Effect Substitution Table (sparkling particles → soft glow, glowing dust → clean bloom). Also replaced noise-inducing words in Technical Quality Definitions and Lighting Enhancement prompts. / GPT-image-2向けノイズ対策プロトコルを大幅強化。コミュニティの研究成果に基づき、ポジティブ安全レンダリングブロック（smooth cel shading, clean color surfaces, low texture density等）、禁止ワード組み合わせリスト（ultra-detailed + film grain等）、光の演出置き換え表（sparkling particles → soft glow, glowing dust → clean bloom等）を追加。Technical Quality定義と照明強化プロンプトからもノイズ誘発ワードを除去。

### v2.76.0-alpha (2026-04-28)
- **[Feature]** Added Visual Gag Auto-Mapping: each gap technique (exaggeration, reversal, absurdity, etc.) now auto-recommends matching EMOTION tags and visual gag directions in the scenario. / ズレ技法→ビジュアルギャグ自動マッピングを追加。誇張→CHIBI_GAG+身体変形、緊張と緩和→GEKIGA→BLANKの絵柄急変等、各技法に推奨EMOTIONタグと視覚演出を紐付け。
- **[Feature]** Added Punchline Variety Enforcement (6 patterns): Explosion, Surreal Silence, Social Death, Self-Contained, Reversal Punchline, and Repetition Escalation. Prevents repetitive punchline patterns. / オチの多様化ルール（6系統: 爆発型/静寂型/社会的死型/自己完結型/逆転オチ型/天丼爆発型）を追加。ワンパターンなオチを防止。
- **[Feature]** Added Gag Tone Variation (3 modes): High-Tension Explosion, Surreal Silence, and Intellectual Black Comedy. / ギャグのトーンバリエーション（ハイテンション爆発系/シュール静寂系/知性派ブラック系）を追加。
- **[Feature]** Added Comedy Structure Verification Checklist to STEP2.5 enhancement prompt. AI self-validates Setup→Punchline structure, energy concentration, gap magnitude, visual gag presence, and dialogue-visual synergy before output. / STEP2.5強化プロンプトに笑い構造の検証チェックリストを追加。フリ→オチ構造・エネルギー集中度・ズレの大きさ・ビジュアルギャグ有無・セリフとビジュアルの連携を出力前に自己検証。
- **[Docs]** Added Comedy Structure Engineering section to README with mathematical formulas, 3-layer architecture explanation, and system reproducibility analysis. / READMEにComedy Structure Engineeringセクションを追加（数式モデル・3層アーキテクチャ解説・再現性分析）。

### v2.75.0-alpha (2026-04-28)
- **[Feature]** Integrated "Comedy Structure Engineering" methodology into both the base scenario generation prompt (STEP2) and the Dialogue/Gag Enhancement prompt (STEP2.5). The system now explicitly applies structured comedy techniques — including Setup (フリ), Gap/Deviation (ボケ), Punchline (ツッコミ/オチ), Repetition Escalation (天丼), Role Reversal (逆転), Absurdity (不条理), and Tension-Release (緊張と緩和) — to produce funnier, more dynamic 4-panel manga scenarios. / シナリオ生成（STEP2）とセリフ・ギャグ強化（STEP2.5）の両方に「お笑い構造メソッド」を統合。フリ→ボケ→ツッコミ→オチの構成マッピング、天丼・逆転・不条理・緊張と緩和・置換・誇張・ノリツッコミ・かぶせ等の技法を明示的に適用し、より面白くダイナミックな4コマ漫画シナリオを生成するよう改善。

### v2.74.0-alpha (2026-04-27)
- **[Fix]** Updated the "ABSOLUTE OVERRIDE" forced layout-rebuild prompt to explicitly demand the inclusion of the required watermarks on the 4th panel. / 画像比率事後修正プロンプト（ABSOLUTE OVERRIDE）使用時に、4コマ目下部の必須ウォーターマークが消失する問題を修正。再構築時にも透かしを再描画するよう明示的な指示を追加。

### v2.73.0-alpha (2026-04-27)
- **[Docs]** Added "The Ultimate Hybrid Strategy" section to README.md to explain the unique Prompt-Driven Architecture and the intentional division of labor between Gemini API and ChatGPT UI. / 意図せず到達した「最強のハイブリッド運用（Gemini API + ChatGPT UI）」に関する詳細な解説をREADMEに追記。

### v2.72.0-alpha (2026-04-27)
- **[Fix]** Reverted the VERTICAL TEXT PROTOCOL (tategaki enforcement) as it caused generation failures in ChatGPT Imsages 2.0. The STABLE LAYOUT FOUNDATION (A4 lock and rigid panel constraints) has been preserved. / ChatGPT Imsages 2.0 での生成失敗の原因となっていた「縦書き強制プロトコル（VERTICAL TEXT PROTOCOL）」を削除し、以前の安定したテキストプロトコルにロールバック。なお、レイアウトを安定させるSTABLE LAYOUT FOUNDATION（A4固定・パネル剛体化）は引き続き維持。

### v2.71.0-alpha (2026-04-27)
- **[Fix]** Enforced vertical text (tategaki) in all speech bubbles via VERTICAL TEXT PROTOCOL — prevents horizontal/vertical text mixing in ChatGPT-generated manga. Added 12-rule detailed protocol covering character stacking direction, punctuation placement, small kana positioning, long vowel mark rotation, and bubble shape constraints. Also added base-level text direction rule for all modes. / 吹き出し内の縦書き（tategaki）をVERTICAL TEXT PROTOCOLで強制 — ChatGPT生成時の横書き混在を防止。文字の積み重ね方向・句読点配置・小仮名位置・長音符回転・吹き出し形状制約など12項目の詳細プロトコルを追加。全モード共通の基本テキスト方向ルールも追加。

### v2.70.0-alpha (2026-04-27)
- **[Feature]** Merged STABLE LAYOUT FOUNDATION into ChatGPT enhancement block - A4 portrait canvas lock, panel frame immutability, distortion constraints, and composition priority order are now auto-injected to prevent elongated images at generation time. / ChatGPT強化ブロックにSTABLE LAYOUT FOUNDATIONを統合。A4縦比率ロック・パネル剛体宣言・歪み制約・構成優先順位を初回生成時に自動埋込し、細長画像を予防。
- **[Feature]** Added post-generation aspect ratio fix prompt copy button for cases where prevention fails. / 予防でも細長画像が出た場合の事後修正プロンプトコピーボタンを追加。
- **[UI]** Unified all copy buttons (prompt copy, fix prompt, policy query) with consistent compact size, copy-complete toggle (2s green flash), and width-preserving text swap. / 全コピーボタン（プロンプト・修正・ポリシー）のサイズ・コピー完了トグル（2秒緑表示）・横幅維持を統一。
- **[UI]** Fixed content policy panel font sizes and button styles to match PRO TIP section. / コンテンツポリシーパネルの文字サイズ・ボタンスタイルをPRO TIPセクションと統一。
- **[Fix]** Updated ChatGPT format enforcement header from ChatGPT Imsages 2.0 to ChatGPT Images 2.0. / ChatGPTフォーマット強制ヘッダーをChatGPT Imsages 2.0 からChatGPT Images 2.0に更新。

### v2.69.0-alpha (2026-04-26)
- **[Fix]** Resolved logical contradiction in Panel 4 prompt generation where "SOLO SHOT" and "MANDATORY BACKGROUND CAST" were emitted simultaneously. Background casts are now automatically merged into the panel characters list to prevent "SOLO SHOT" triggers when other characters are present. / Panel 4のプロンプトで「SOLO SHOT（他キャラ描くな）」と「MANDATORY BACKGROUND CAST（残り全員描け）」が同時出力される論理矛盾バグを修正。背景キャストがいる場合はSOLO SHOTを出力せず、自動的に全登場リストへ統合するように改善。

### v2.68.0-alpha (2026-04-26)
- **[Feature]** Added 6 new EMOTION styles (SPEED, FLASHBACK, UKIYOE, POP_ART, SKETCH, NEON) and 2 new UI buttons for Scenario Enhancement (Panel Layout, Time Effect). / 6つの新しいEMOTIONスタイル（SPEED等）と、シナリオ強化用の「コマ割り」「時間演出」ボタンを追加。

### v2.67.0-alpha (2026-04-23)
- **[Feature]** Added Character Silhouette Isolation (G-Pen outline, background simplification, spotlight effect) to ChatGPT Images 2.0 Mode. / ChatGPT Images 2.0 強化プロンプトに人物浮き出し強化（Gペンアウトライン・背景簡略化・スポットライト効果）を追加。

### v2.66.0-alpha (2026-04-23)
- **[Docs]** Updated README to reflect ChatGPT Images 2.00 Mode and Scenario Enhancement features. / READMEを更新し、ChatGPT画像生成モードおよびシナリオ強化機能についての記載を実態に合わせて追記。

### v2.65.0-alpha (2026-04-22)
- **[Fix]** Removed an extra colon from the ChatGPT Images 2.0 instructions in PRO TIP. / PRO TIPのChatGPT向け案内文から余計なコロン（：）を削除。

### v2.64.0-alpha (2026-04-22)
- **[Fix]** Added a note about clicking "Show in text field" to the ChatGPT PRO TIP and slightly adjusted the ChatGPT Imsages 2.0 wording. / PRO TIPのChatGPT案内文に「テキストフィールドに表示」の注意書きを追加し、ChatGPT Imsages 2.0 の文言を微修正。

### v2.63.0-alpha (2026-04-22)
- **[Fix]** Simplified ChatGPT Imsages 2.0 ChatGPT instructions and clarified content policy rejection UI to explicitly support both Gemini and ChatGPT. / ChatGPT Imsages 2.0 (ChatGPT) 向けのアスペクト比変更指示およびコンテンツポリシー拒否時のUI文言を整理し、GeminiとChatGPT両対応であることを明記。

### v2.62.0-alpha (2026-04-22)
- **[Fix]** Updated watermark text to specify "Generated by ChatGPT" when ChatGPT mode is enabled, and explicitly added ChatGPT Imsages 2.0 aspect ratio commands and title placement fixes to enforce A4 size. / ChatGPTモード時にウォーターマークへ「ChatGPT生成」の旨を明記するように変更し、ChatGPT Imsages 2.0 向けのアスペクト比指定とタイトル配置修正（白フチ問題）を明記してA4サイズを強制。

### v2.61.0-alpha (2026-04-22)
- **[Fix]** Adjusted gutter width between manga panels (approx 3% of canvas height) to prevent panels from touching / 4コマのコマ間ガター（余白）をキャンバス高の約3%に広げ、コマ同士が密接するのを防止。

### v2.60.0-alpha (2026-04-21)
- **[Critical Fix]** Camera angle lens distortion weights not being applied to image generation - added `cameraLensMap` dictionary / カメラアングルのレンズ歪みウェイトが画像生成に反映されないバグを修正（cameraLensMap追加）。
- **[Fix]** Removed hardcoded Extreme Reaction Mandate from default prompt, restoring natural expressions / デフォルトシナリオの過剰演出（Extreme Reaction Mandate）を除去し、自然な表情に回復。
- **[Fix]** Increased NO EYE CONTACT weight from 1.7 to 2.5 to suppress characters looking at the camera / カメラ目線（第四の壁破壊）抑制ウェイトを1.7→2.5に強化。

### v2.59.0-alpha (2026-04-21)
- **[Major]** Deprecated legacy Imagen models (scheduled for full removal 2026/06/24). Gemini Native Image Generation is now primary / Imagen全系列を廃止予定に伴い非推奨化、Geminiネイティブ画像生成をプライマリに。
- **[Major]** Rebuilt text/image model lists with Gemini 3.x generation priority / テキスト・画像モデルリストをGemini 3.x世代優先に再構築。
- **[New]** Added Gemini API Model Audit Protocol to AGENTS.md / Gemini APIモデル定期監査プロトコルをAGENTS.mdに追加。

### v2.52.0-alpha
- **[BugFix]** PRO TIPSの文言における「カンニングできる」という不適切な表現を「参照できる」に修正。

### v2.48.0-alpha (2026-04-15)
- **[UI Fix]** APIキー未入力時のぼかし挙動を修正。出力結果エリア（プロンプト欄・コピーボタン・PRO TIPS・画像生成ログ・生成画像エリア）が`currentStep < 3`の時に正しくロックされるよう修正。
- **[UI Fix]** STEP3構築中にプロンプト欄やDYNAMIC ENGINE等が丸見えになっていた構造上の不備を修正（出力結果divにロックオーバーレイを追加）。
- **[UI New]** ステータスバーにAPI接続状態バッジ（🟢 CONNECTED / 🔴 NO API KEY）を常時表示。
- **[UI New]** APIキー入力UIをインラインバー形式に変更（フルスクリーンモーダル廃止）。
- **[UI New]** コピーボタンより下（STEP4ボタン・PRO TIPS・コンテンツポリシーパネル）を`finalPrompt`未生成時にぼかすUI改善。

### v3.11-alpha
- **[Bugfix]** ChatGPTモードでキャラシートが再現される問題に対処。プロンプト冒頭にアンチ・キャラシート再現指示を挿入し、末尾ルールも強化。

### v3.10-alpha
- **[UI/Rules]** OpenAI画像APIの直接生成制限に対応し、UIの注意書きテキストを修正。今後のデプロイ事前監査ルールに制限解除チェックを追加。

### v3.09-alpha
- **[HotFix]** OpenAI `gpt-image-2` への移行後、画像生成で `400 Unknown parameter` が発生しエラーとなる不具合を修正。不要なパラメータ(`response_format`)を削除。

### v3.08-alpha
- **[System]** OpenAI `dall-e-3` (5/12廃止) を `gpt-image-2` に、Gemini `gemini-3.1-flash-lite-preview` (5/25廃止) をGA版に緊急移行。デプロイ前のAPI事前監査プロトコルを導入。
- **[System]** コピペボタンのモード別（Gemini/ChatGPT）テキスト動的切り替え機能を完全復元(v3.07-alpha)。

### v2.47.0-alpha (2026-04-14)
- **[Feature]** シナリオ強化：カメラワーク強化トグル追加
- **[Feature]** シナリオ強化：セリフやギャグ強化トグル追加
- **[BugFix]** STEP3構築中にSTEP2が消えるバグ修正（isAssembling条件除外）
