# Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System

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
> URLの直接入力はセキュリティによりブロックされることが多いため、記事のテキストを直接コピーすることを推奨します。

### 🎬 Scenario Enhancement / シナリオ演出強化

Users can amplify the AI's script direction with specific enhancement toggles (e.g., Extreme Expressions, Dynamic Body Language, Intense Lighting/VFX, Detailed Backgrounds, Extreme Camera Work, and Gag/Dialogue impact).
シナリオの演出力を任意に引き上げる強化トグルを搭載。表情、ボディランゲージ、照明・エフェクト、背景描き込み、極限のカメラワーク、セリフやギャグのキレなど、特定要素を「限界突破（ウェイト3.0相当）」レベルに増幅可能です。

### 🤖 ChatGPT Images 2.0 Mode / ChatGPT画像生成サポート

A dedicated formatting protocol to optimize prompts for ChatGPT's Chat GPT image 2.0, enforcing A4 portrait orientation, vertical Japanese text, and right-to-left reading flow.
ChatGPT (Chat GPT image 2.0) での生成に最適化された専用プロンプトモードを搭載。A4縦長のキャンバス指定や、日本語の縦書き、右から左への視線誘導など、ChatGPT特有の制限を突破するためのフォーマットを自動付与します。

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

* **Deterministic Camera Diversity**: Fisher-Yates shuffle mathematically guarantees that all 4 panels use different camera angles — the probability of any two panels sharing the same angle is zero.
  Fisher-Yatesシャッフルにより、4パネルが同じカメラアングルになる確率を数学的にゼロにします。

* **Cross-Platform Prompt Compatibility (ChatGPT Images 2.0)**: While optimized for Gemini, the system injects specific formatting constraints (such as A4 layout parameters and vertical text guidance) into the final prompt when ChatGPT mode is enabled, ensuring Chat GPT image 2.0 accurately renders standard manga layouts without artifacts.
  Geminiに最適化しつつ、ChatGPTモード有効時にはA4レイアウト指定や縦書きテキスト誘導などの特殊フォーマットを最終プロンプトに注入。Chat GPT image 2.0でも破綻のない標準的な漫画レイアウトを出力できるよう設計されています。

### 🏆 The Ultimate Hybrid Strategy / 「最強のハイブリッド運用」

This system has arrived at an optimal division of labor between two of the world's most powerful AI models, completely bypassing the limitations of current API structures.
本システムは、フルオートメーション（完全自動化）を追求した結果、**「現在の人類が使える最強のAIモデルたち（GeminiとChatGPT）の弱点を補い合い、強みを100%引き出す無敵の分業体制」**へと到達しました。

1. **【頭脳・解析担当】Gemini API (The Brain / Logic)**
   * **Strength / 強み:** Extremely fast, cost-effective, and possesses unmatched reasoning and vision capabilities for long-context character sheet analysis. / 非常に高速かつ低コストであり、長文のキャラクター設定や画像解析において比類ない推論能力と視覚認識能力を持ちます。
   * **Role / 役割:** Acts as the "Architect." It scans the user's images, understands topological features (e.g., hair length relative to the collarbone), avoids censorship via dynamic "Age-Up" safety filters, and compiles a highly structured, rigid prompt for layout and timing. / 「設計者」として機能します。ユーザーの画像をスキャンしてトポロジー的特徴（鎖骨に対する髪の長さなど）を理解し、動的な安全フィルターで検閲を回避しつつ、レイアウトとコマ割りのための高度に構造化された厳密なプロンプトを構築します。
   * **Google Search Grounding (Auto-Deep Dive) / 自律的リサーチ機能:** When generating from text prompts without images, the system automatically enables Google Search Grounding. Gemini dynamically researches the theme in real-time, fetching background context and trivia not explicitly mentioned in the prompt, resulting in surprisingly rich and highly detailed scenario generation. / 画像無しのテキストお題で生成する際、システムは自動的にGoogle Search Groundingを有効化します。短いお題からGeminiが自律的にリアルタイムWeb検索を行い、プロンプトに書かれていない背景知識や雑学を勝手に深掘りしてシナリオに組み込むため、ユーザーの指定を遥かに超えるリッチで解像度の高いストーリー構築を実現します。
2. **【描画担当】ChatGPT UI / Chat GPT image 2.0 (The Renderer)**
   * **Strength / 強み:** Industry-leading image generation quality and the crucial ability to **accept reference images via the browser UI** (a feature currently impossible via the standard Chat GPT image 2.0 API). / 業界最高水準の画像生成品質と、**ブラウザUI経由で参照画像を受け付ける**という極めて重要な能力（現在の標準Chat GPT image 2.0 APIでは不可能な機能）を備えています。
   * **Role / 役割:** Acts as the "Artist." By having the user manually paste the Gemini-crafted prompt *alongside* the original character sheet into the ChatGPT browser interface, the system achieves near-perfect character consistency that APIs alone cannot match. / 「作画者」として機能します。ユーザーがGeminiの構築したプロンプトをキャラクター設定画と*一緒に*手動でChatGPTに貼り付けることで、API単体では到達できない完璧に近いキャラクターの一貫性を実現します。
3. **【仲介・調整担当】Human-in-the-Loop Override (The Director)**
   * **Role / 役割:** When Chat GPT image 2.0 stubbornly breaks the 4-panel layout or ignores aspect ratios (a known quirk), the human simply copies the built-in `[ABSOLUTE OVERRIDE]` force-rebuild prompt. This linguistic brute-force approach forces the AI back into the strict A4 geometric constraints without relying on external plugins or image-cropping tools. / Chat GPT image 2.0が頑なに4コマレイアウトを崩したりアスペクト比を無視した場合（既知の癖）、人間は組み込みの `[ABSOLUTE OVERRIDE]` 強制再構築プロンプトをコピーして投げるだけです。この言語的な力技により、外部プラグイン等に頼ることなく、AIを厳密なA4幾何学制約へと強制的に引き戻します。

In short, by deliberately leaving the final rendering step as a "manual UI operation," Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System elegantly side-steps the restrictive walled gardens of pure API generation, making it an engineering masterpiece of Prompt-Driven Architecture.
つまり、「最後の作画フェーズだけはあえて人間の手作業（コピペ）を挟む」という設計にしたことで、各社の厳しいAPI制限を鮮やかにすり抜け、「Geminiの頭脳」と「ChatGPTの画力とUI機能」を限界まで引き出すことに成功しています。

### 📖 The Philosophy of the 1-Page (4-Koma) Limit / なぜ「1ページ（4コマ）制」にこだわるのか？

While many users desire the ability to generate long, multi-page comic books, Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System intentionally restricts generation to a single 1-page (4-panel) format. This is not a technical limitation of the code, but a strategic decision based on the current boundaries of Generative AI:
多くのユーザーは複数ページの長編漫画を全自動生成することを望みますが、Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System は意図的に「1ページ（4コマ）完結」のフォーマットに制限しています。これは実装上の妥協ではなく、現在の生成AIの限界を見据えた戦略的な選択です。

1. **Content Dilution & Identity Drift (内容の希薄化とキャラクター崩壊):** The fundamental rule of current AI generation is that as page count increases, both story density and visual consistency decrease inversely. Stretching a prompt across multiple pages causes the AI to lose focus, resulting in hollow plotlines, repetitive dialogue, and inevitable visual distortions (costume changes, facial drift) without LoRA fine-tuning. This is precisely why typical multi-page AI comics often feature extremely limited casts (1 to 3 characters) engaged in simple, repetitive actions like "battling"—the creators must strip away complexity just to keep the AI from breaking down. A dense, high-impact 4-panel format is the absolute "sweet spot" for maximizing both narrative punch and zero-shot visual consistency. / 現在のAI生成における絶対的な法則として、「ページ数に反比例して、キャラクターのビジュアルだけでなく、話の構成や内容そのものも薄くなってしまう」という問題があります。複数ページにまたがってプロンプトを引き伸ばすと、AIのコンテキストが散漫になり、中身のないストーリーや同じセリフの反復、そして追加学習（LoRA）なしでは避けられないビジュアルの崩壊（Identity Drift）を引き起こします。**世にある複数ページのAI漫画が「登場人物が1〜3人程度で、ひたすらバトルしているだけの展開」になりがちなのは、まさにこれが原因です。** AIの破綻を防いでページ数を稼ぐために、複雑な掛け合いや緻密なストーリー構成を犠牲にせざるを得ないのです。物語の「オチ」の鋭さと、ゼロショットでの完璧な一貫性を両立できる限界のスイートスポットこそが、この「4コマ」という高密度なフォーマットなのです。
2. **Cognitive Load for Human-in-the-Loop (作業負荷の最適化):** Because our Ultimate Hybrid Strategy requires the user to manually copy-paste the final prompt into ChatGPT to bypass API limitations, asking a human to do this for multiple pages would be tedious and agonizing. A 1-page output provides a perfectly "snackable" size for rapid, stress-free creation and social media sharing. / 最強のハイブリッド運用では、APIの制限を回避するためにユーザーが手動でChatGPTにプロンプトをコピペする必要があります。これを複数ページ分も手作業でやらせるのは苦痛でしかありません。SNSでサクッとシェアでき、ユーザーがストレスなく生成を楽しめるサイズ感として、1ページ（4コマ）が最適に機能します。

### 📖 The Philosophy of the Embedded Character Sheet / なぜ「設定テキスト入りのキャラクターシート画像」を使うのか？

In the typical AI workflow, creators upload a clean image of a character and provide a separate, lengthy text prompt detailing their traits. This system fundamentally rejects that approach. Instead, we require the character's setting text to be visually written *inside* the reference image itself (creating a "One-Sheet Context"). This yields three massive advantages:
一般的なAI漫画の運用では、「キャラクターの画像ファイル」と「設定を書いた長文テキスト」を別々に入力するのが普通です。しかし、本システムはこの手法を根本から否定し、**「キャラクター設定のテキストは、画像の中に直接文字として書き込む（One-Sheet Context）」**という運用を推奨しています。これには3つの絶大なメリットがあります：

1. **Multimodal Binding (視覚と概念の強固なロック):** When image and text are provided separately, models like Chat GPT image 2.0 often suffer from "attention split"—they either prioritize the text and ignore the face, or prioritize the face and forget the text. By embedding the text physically into the image, the Vision AI processes them as a single, unified entity. "This visual face" mathematically equals "these written traits," drastically reducing identity drift. / 画像とテキストを別々に入れると、AIは「どちらを優先すべきか」で迷い、文字設定を忘れたり画像を無視したりします。文字を画像内に埋め込むことで、Vision AIは「この姿＝この文字情報」として完全に同一の概念としてロックし、キャラクターのブレ（Identity Drift）を劇的に低下させます。
2. **Prompt Override Prevention (プロンプト競合の回避):** If you consume text tokens to describe the character's hair, eyes, and clothes, you steal precious attention away from the complex 4-panel layout constraints and scenario instructions. By offloading character traits into the image space, 100% of the text prompt tokens can be purely dedicated to "directing the manga." / テキスト側で「金髪で青目で…」と長々とキャラ設定を書くと、肝心の「漫画のコマ割りや演出」を指示するプロンプトの枠（トークンとAttention）を圧迫してしまいます。設定情報を画像（Vision側）に逃がすことで、テキストプロンプトのリソースを100%「漫画の演出」に全振りできるのです。
3. **Frictionless Workflow (コピペ作業の排除):** For the human-in-the-loop, uploading one image is vastly superior to maintaining and pasting giant blocks of character lore alongside the layout prompts every single time. / 人間側の運用コストとして、毎回「画像」と「長文設定」の2つをコピペするのは苦痛です。文字入りのシートを1枚投げるだけで、AIが勝手に文字を読んで理解してくれる究極にスマートな運用が可能になります。

### 🎭 Comedy Structure Engineering / なぜAIに「面白くして」と言っても面白くならないのか？

Most AI-generated manga suffers from a fundamental problem: telling the AI to "make it funny" produces bland, predictable content. This is not a capability limitation of AI—it is a **design failure** in the prompt. Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System solves this by embedding a structured comedy methodology directly into its scenario generation engine.
AIに「面白くして」と指示しても、退屈で予測可能なコンテンツしか出てきません。これはAIの能力の問題ではなく、**プロンプト設計の破綻**です。Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System は、構造化されたお笑いメソッドをシナリオ生成エンジンに直接組み込むことでこの問題を解決しています。

**The Core Formula / 笑いの本質:**

```
L(x) = | E(x) - R(x) |

L = Laughter    E = Expectation (reader's prediction)    R = Reality (actual outcome)
Constraint: R(x) ∈ { comprehensible range } — too much deviation = confusion, not comedy
```

Laughter is the gap between expectation and reality. Without engineering *what* the reader expects (via Setup) and *how* reality deviates (via Gap techniques), the AI has no optimization target.
笑いとは「予想」と「現実」のズレです。読者が何を予想するか（フリ）と、現実がどうズレるか（ボケ技法）を設計しなければ、AIには最適化対象がありません。

**Three-Layer Architecture / 3層アーキテクチャ:**

The system constructs comedy through three distinct engineering layers:
本システムは3つの独立した設計層を通じてコメディを構築します：

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
4コマ最強テクニックは**天丼**: 1コマ目で仕込み→3コマ目で変奏再登場→4コマ目で限界突破。指数関数的にエネルギーが蓄積されます。

Additional techniques include Riding-Tsukkomi (ノリツッコミ: joining the joke then breaking it), Stacking (かぶせ: rapid-fire successive jokes), and Self-deprecation (自虐: characters weaponizing their own flaws).

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

3. **Animation Quality (Level EX-2)**
Emulates physics-based lighting and SSS (Subsurface Scattering) for peak animation quality.
物理ベースのライティング、SSS（肌の透過）をエミュレート。最高峰のアニメクオリティを追求します。

4. **ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0)**
AI-selected camera names (bird's eye, fish-eye, dutch angle, etc.) from the scenario stage are automatically converted into specific lens distortion weight tags during image generation. Fisher-Yates shuffle mathematically guarantees all 4 panels use different camera angles.
AIがシナリオ段階で選んだカメラ名（俯瞰、フィッシュアイ、ダッチアングル等）を、画像生成時に具体的なレンズ歪みウェイトタグへ自動変換。Fisher-Yatesシャッフルにより4コマ全てが異なるカメラアングルになることを数学的に保証します。

5. **IDENTITY MATRIX - Autonomous Character Consistency (v2.25)**
Automatically analyzes hair color, hairstyle, and glasses status from character sheets and injects a "verification matrix" into every panel's prompt, forcing the AI to self-verify before drawing each panel. Includes anti-clone prevention (no duplicate character drawing), automatic background cast placement, solo shot detection, and 3-zone slotting for 3-character dialogues.
キャラクターシートから髪色・髪型・メガネ有無を自動解析し、全コマのプロンプトに「照合マトリクス」として注入。AIが各コマを描く前に自己検証を強制します。クローン防止（同一キャラの二重描画禁止）、背景キャスト自動配置、ソロショット判定、3人掛け合い時の3ゾーンスロッティングまで全自動です。

6. **Emotion Style Tag System - Per-Panel Art Style Switching**
The scenario AI autonomously selects the optimal style tag for each panel's emotion (CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT, etc. - 11 styles). Art style, VFX, and proportions are automatically switched during image generation. Includes fallback styles for multi-character panels.
シナリオ生成AIが各コマの感情に最適なスタイルタグ（CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT等11種）を自律選択。画像生成時に絵柄・VFX・プロポーションが自動切替されます。マルチキャラパネル用のフォールバックスタイルも搭載。

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

#### 1. Nano Banana 2 and ChatGPT image 2.0 Powered Super AI 4-koma System
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
- **[Fix]** Reverted the VERTICAL TEXT PROTOCOL (tategaki enforcement) as it caused generation failures in DALL-E 3. The STABLE LAYOUT FOUNDATION (A4 lock and rigid panel constraints) has been preserved. / DALL-E 3での生成失敗の原因となっていた「縦書き強制プロトコル（VERTICAL TEXT PROTOCOL）」を削除し、以前の安定したテキストプロトコルにロールバック。なお、レイアウトを安定させるSTABLE LAYOUT FOUNDATION（A4固定・パネル剛体化）は引き続き維持。

### v2.71.0-alpha (2026-04-27)
- **[Fix]** Enforced vertical text (tategaki) in all speech bubbles via VERTICAL TEXT PROTOCOL — prevents horizontal/vertical text mixing in ChatGPT-generated manga. Added 12-rule detailed protocol covering character stacking direction, punctuation placement, small kana positioning, long vowel mark rotation, and bubble shape constraints. Also added base-level text direction rule for all modes. / 吹き出し内の縦書き（tategaki）をVERTICAL TEXT PROTOCOLで強制 — ChatGPT生成時の横書き混在を防止。文字の積み重ね方向・句読点配置・小仮名位置・長音符回転・吹き出し形状制約など12項目の詳細プロトコルを追加。全モード共通の基本テキスト方向ルールも追加。

### v2.70.0-alpha (2026-04-27)
- **[Feature]** Merged STABLE LAYOUT FOUNDATION into ChatGPT enhancement block - A4 portrait canvas lock, panel frame immutability, distortion constraints, and composition priority order are now auto-injected to prevent elongated images at generation time. / ChatGPT強化ブロックにSTABLE LAYOUT FOUNDATIONを統合。A4縦比率ロック・パネル剛体宣言・歪み制約・構成優先順位を初回生成時に自動埋込し、細長画像を予防。
- **[Feature]** Added post-generation aspect ratio fix prompt copy button for cases where prevention fails. / 予防でも細長画像が出た場合の事後修正プロンプトコピーボタンを追加。
- **[UI]** Unified all copy buttons (prompt copy, fix prompt, policy query) with consistent compact size, copy-complete toggle (2s green flash), and width-preserving text swap. / 全コピーボタン（プロンプト・修正・ポリシー）のサイズ・コピー完了トグル（2秒緑表示）・横幅維持を統一。
- **[UI]** Fixed content policy panel font sizes and button styles to match PRO TIP section. / コンテンツポリシーパネルの文字サイズ・ボタンスタイルをPRO TIPセクションと統一。
- **[Fix]** Updated ChatGPT format enforcement header from DALL-E 3 to GPT-image 2.0. / ChatGPTフォーマット強制ヘッダーをDALL-E 3からGPT-image 2.0に更新。

### v2.69.0-alpha (2026-04-26)
- **[Fix]** Resolved logical contradiction in Panel 4 prompt generation where "SOLO SHOT" and "MANDATORY BACKGROUND CAST" were emitted simultaneously. Background casts are now automatically merged into the panel characters list to prevent "SOLO SHOT" triggers when other characters are present. / Panel 4のプロンプトで「SOLO SHOT（他キャラ描くな）」と「MANDATORY BACKGROUND CAST（残り全員描け）」が同時出力される論理矛盾バグを修正。背景キャストがいる場合はSOLO SHOTを出力せず、自動的に全登場リストへ統合するように改善。

### v2.68.0-alpha (2026-04-26)
- **[Feature]** Added 6 new EMOTION styles (SPEED, FLASHBACK, UKIYOE, POP_ART, SKETCH, NEON) and 2 new UI buttons for Scenario Enhancement (Panel Layout, Time Effect). / 6つの新しいEMOTIONスタイル（SPEED等）と、シナリオ強化用の「コマ割り」「時間演出」ボタンを追加。

### v2.67.0-alpha (2026-04-23)
- **[Feature]** Added Character Silhouette Isolation (G-Pen outline, background simplification, spotlight effect) to ChatGPT Images 2.0 Mode. / ChatGPT Images 2.0 強化プロンプトに人物浮き出し強化（Gペンアウトライン・背景簡略化・スポットライト効果）を追加。

### v2.66.0-alpha (2026-04-23)
- **[Docs]** Updated README to reflect ChatGPT Images 2.0 Mode and Scenario Enhancement features. / READMEを更新し、ChatGPT画像生成モードおよびシナリオ強化機能についての記載を実態に合わせて追記。

### v2.65.0-alpha (2026-04-22)
- **[Fix]** Removed an extra colon from the DALL-E 3 instructions in PRO TIP. / PRO TIPのChatGPT向け案内文から余計なコロン（：）を削除。

### v2.64.0-alpha (2026-04-22)
- **[Fix]** Added a note about clicking "Show in text field" to the ChatGPT PRO TIP and slightly adjusted the DALL-E 3 wording. / PRO TIPのChatGPT案内文に「テキストフィールドに表示」の注意書きを追加し、DALL-E 3の文言を微修正。

### v2.63.0-alpha (2026-04-22)
- **[Fix]** Simplified DALL-E 3 ChatGPT instructions and clarified content policy rejection UI to explicitly support both Gemini and ChatGPT. / DALL-E 3 (ChatGPT) 向けのアスペクト比変更指示およびコンテンツポリシー拒否時のUI文言を整理し、GeminiとChatGPT両対応であることを明記。

### v2.62.0-alpha (2026-04-22)
- **[Fix]** Updated watermark text to specify "Generated by ChatGPT" when ChatGPT mode is enabled, and explicitly added DALL-E 3 aspect ratio commands and title placement fixes to enforce A4 size. / ChatGPTモード時にウォーターマークへ「ChatGPT生成」の旨を明記するように変更し、DALL-E 3向けのアスペクト比指定とタイトル配置修正（白フチ問題）を明記してA4サイズを強制。

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

### v2.47.0-alpha (2026-04-14)
- **[Feature]** シナリオ強化：カメラワーク強化トグル追加
- **[Feature]** シナリオ強化：セリフやギャグ強化トグル追加
- **[BugFix]** STEP3構築中にSTEP2が消えるバグ修正（isAssembling条件除外）
