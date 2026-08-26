# Super FURU AI 4-koma System

> Latest release: **v5.6.2** / 最新リリース: **v5.6.2**

> **"To what extent can humans step away from the creative process?"**
> **「人間は、どこまで制作から降りられるのか？」**
>
> An experimental web application that leads AI manga production beyond "automation" to full "unmanned" autonomy.
> AIによるマンガ制作を「自動化」ではなく、その先にある「無人化」へと導く実験的Webアプリケーション。
> 
[!['ChatGPT Image 2026年6月25日 22_19_30'](https://github.com/user-attachments/assets/d850ac7f-aa1c-40cc-a378-b8c6673c726c)](https://youtu.be/pqYVxUUg0Cs?si=27g1I3tO2EuZkOuxJ)

> [!TIP]
> **Detailed Commentary Available / 詳細な解説記事を公開中**
> For insights into the design philosophy and behavior differences between Google Gemini API models, please refer to the following note article. / 本プロジェクトの設計思想や、Google Gemini APIのモデル毎の挙動の違いについては、以下のnote記事で詳しく解説しています。
> [AIマンガ制作を「自動化」ではなく「無人化」へ / Beyond Automation: Toward "Unmanned" AI Manga Production (note / Japanese content)](https://note.com/happy_duck780/n/ndf063558c1f5)

---

## 🚀 Overview / 概要

This project aims to intentionally exclude humans from the creative process, allowing AI to act as a director and complete everything from brainstorming to composition, direction, and rendering.
本プロジェクトは、人間をクリエイティブな工程から意図的に排除し、AIがディレクターとして「ネタ出し・構成・演出・作画」のすべてを完結させることを目的としています。

The current implementation and latest release are **v5.6.2**. The product name is **Super FURU AI 4-koma System**; **Nano Banana 2** and **ChatGPT Image 2.0** identify image-generation engine families. / 現在の実装および最新公開版は **v5.6.2** です。製品名は **Super FURU AI 4-koma System** で、**Nano Banana 2** と **ChatGPT Image 2.0** は画像生成エンジン系統の名称です。

Current behavior at a glance / 現行仕様の要点:

- **Four-stage workflow / 4段階ワークフロー:** STEP1 character analysis, STEP2 scenario generation and optional enhancement, STEP3 editable prompt assembly, and STEP4 image generation form one continuous pipeline. / STEP1のキャラクター解析、STEP2のシナリオ生成と任意の演出強化、STEP3の編集可能な画像プロンプト構築、STEP4の画像生成を一つの流れとして実行します。
- **Default manga composition variety / 通常生成の構図バリエーション:** STEP2 and STEP3 specify subject-relative horizontal camera direction in addition to shot size, elevation, and tilt. Unless explicitly scripted or story-required, eye-level is not used as the default. Across four panels, the prompt limits flat front-on staging to one panel, varies shoulder/hip/face axes, and staggers two-handed actions in depth while preserving the requested action, props, cast, and dialogue. / STEP2とSTEP3では、画角・高低・傾きに加えて被写体基準の左右方向を通常生成へ自動指定し、明示指定または物語上の必要がないアイレベルを既定にしません。4コマ全体で平面的な真正面構図を最大1コマに抑え、肩・腰・顔の向きと両手動作の前後差を変化させつつ、指定された動作・小道具・登場人物・セリフは保持します。
- **Body-acting and gesture variety / 身体演技・ジェスチャーの多様化:** Character-sheet poses are treated as identity reference rather than recurring personality gestures. STEP2 asks for at least three acting families and routes repeated default forward-extension gestures—such as pointing, lens-facing hand or prop thrusts, and striking a supporting surface—through the bounded quality retry unless repetition is explicitly requested or used as a running gag. STEP3 and the single-image copy prompt preserve explicitly scripted actions while avoiding invented stock gestures and defining action phase, weight support, hand roles, and contact target. / キャラクターシートのポーズは同一性資料として扱い、性格を示す定番動作として反復しません。STEP2は最低3種類の身体演技を求め、指し示し、カメラ方向への手・小道具の突き出し、机など支持面への打撃といった前方伸展ジェスチャーが既定動作として複数コマに重なった場合、明示反復や天丼を除いて上限付き品質再試行へ回します。STEP3と一枚絵コピープロンプトは明示Actionを保持しつつ定型ジェスチャーの発明を避け、動作段階、支持・重心、手の役割、接触対象を具体化します。
- **Three-attempt scenario quality selection / シナリオ品質は全3試行から選抜:** STEP2 evaluates scenario-content hygiene, manual-input exclusions, event-specific visual evidence, lightweight location/time/weather continuity, and final-panel staging. A full pass is accepted immediately. If all three attempts miss one or more quality targets, the highest-scoring usable candidate is retained with a concrete warning and remains available to STEP3 and STEP4. / STEP2では、本文の表現衛生、自由入力の禁止条件、出来事を示す視覚証拠、軽量な場所・時刻・天候の継続、4コマ目の能動演出を検証します。合格した時点で採用し、全3試行でも品質条件が残った場合は、最後の結果ではなく最高得点の利用可能な候補を警告付きで保持してSTEP3・STEP4へ進めます。
- **Two-attempt scenario enhancement / 演出強化は初回＋自動修正1回:** The seven enhancement categories are validated against the original scenario. A first-pass success is accepted without an unnecessary retry. If correction is needed, the better usable enhancement is retained; when every generated rewrite violates a non-negotiable editing contract, the saved original scenario is restored so downstream work is not lost. / 7カテゴリの演出強化は元シナリオとの差分で検証します。初回で合格すれば追加生成は行いません。修正が必要な場合は利用可能な候補のうち良い方を保持し、すべての書換候補が構造・話者・未選択範囲などの必須契約を壊した場合は、保存済みの元シナリオを採用して後続作業を継続します。
- **Season-aware outfit selection / 日付連動の衣装選定:** In date-specified news mode, STEP2 derives a read-only Japan-default seasonal hint from the selected date. Explicit user clothing, event uniforms, profession or safety gear, location, real weather, indoor conditions, and an overseas local season take priority over that hint; manual-input mode does not infer a season from a date. Empty or ambiguous outfits and clear unexplained summer/winter conflicts are retried with the exact failed check. / 日付指定ニュースモードでは、STEP2が対象日から日本基準の季節目安を読み取り専用で提示します。ユーザー指定衣装、行事衣装、職業・安全装備、場所、実際の天候、屋内環境、海外の現地季節は目安より優先し、自由入力モードでは日付から季節を推測しません。空・曖昧な衣装や根拠のない夏冬の明白な不一致は、失敗した検証項目を示して再生成します。
- **Dialogue and visual-direction boundary / 台詞と視覚指示の境界:** Only quoted dialogue is sent to speech bubbles. When one line contains multiple explicitly attributed speakers, each quoted utterance is separated and assigned to its own speaker; surrounding directions such as speaking softly, laughing, or replying sharply remain non-printing stage metadata. Markdown headings and Action/visual directions remain drawing instructions, including combined acoustic-direction labels such as `効果音・演出`, so expression, body, staging, sound, and background notes are not rendered as extra bubble text or synthetic speakers. Age-up normalization applies to standalone person roles and does not rewrite compound words such as `青少年` inside verbatim dialogue. / 引用符内の台詞だけを吹き出しへ渡します。1行に明示話者が複数並ぶ場合も、各引用台詞を話者ごとに分離し、「小声で」「笑う」「鋭く返す」など引用外の演出説明は印字しません。Markdown見出しやAction・視覚指示に加え、`効果音・演出` のような音響・演出の複合ラベルも描画指示のまま保持し、表情・身体・演出・音響・背景の説明を余計な吹き出し文字や架空話者として描画しません。成人化変換は独立した人物属性だけに適用し、原文台詞内の `青少年` などの複合語を部分置換しません。
- **Lightweight setting continuity / 軽量な舞台継続:** Only a concrete `Location` and explicit time or weather cues stay consistent across panels. Incidental setting detail is deliberately lower priority than anatomy, hand/arm laterality, functional prop orientation, prop ownership, and exact bubble text. / 具体的な `Location` と明示的な時刻・天候だけをコマ間で整合させ、付随的な背景詳細より人物の解剖学、手・腕の左右、機能面の向き、小道具の所有、吹き出し本文を優先します。
- **Editable provider-specific final prompt / 編集可能なプロバイダー別最終プロンプト:** ChatGPT-family and Gemini-family prompts use different rendering contracts while sharing script, identity, dialogue-tail, key-prop, eye-line, hand, functional-surface orientation, rich-background, and active-final-panel safeguards. The action determines the target: reading/operating targets the actor, while submitting/presenting/showing targets the recipient. A tabletop page may correctly be face-up; its text baseline is oriented toward the intended reader. Showing a functional face requires a physically valid camera viewpoint instead of rotating it toward viewers, except when the script explicitly makes the camera/viewer the recipient. Manual edits in STEP3 are used by both copy actions and the subsequent API image request. / ChatGPT系とGemini系で描画契約を分けつつ、脚本、キャラクター同一性、吹き出し、主要小道具、視線、手、機能面の向き、背景密度、4コマ目の能動演出を共通固定します。小物の向け先は保持者ではなく動作で決め、読む・操作する場合は本人、提出・提示・見せる場合は受取人を対象にします。机上の書類は表向きでも正常で、文字の上下を読む相手へ合わせます。機能面を見せる場合は物を観客へ回さず物理的に成立する位置へカメラを置き、脚本でカメラ・読者への提示が明示された場合だけカメラを受取人とします。STEP3で直接編集した内容は、コピー操作とAPI画像生成の両方に反映されます。
- **Named over-the-shoulder cast ownership / 名前付き肩越し人物の一個体固定:** In the structured four-panel prompt, a character explicitly named as the over-the-shoulder camera subject is assigned to the foreground exactly once. That rear head/shoulder depiction is the character's sole panel instance and is removed from the background cast list, while the speaking character remains the main focus. / 構造化された4コマ用プロンプトでは、肩越しカメラの基準人物として名前が明記されたキャラクターを、前景に1回だけ配置します。その後頭部・肩の描写を当該人物の唯一の登場として背景キャストから除外し、台詞を話す人物の主役指定は維持します。
- **Manual takeover invalidates stale full-auto work / 手動操作時の旧全自動結果破棄:** Editing the scenario or stopping full-auto advances the workflow run epoch. A late STEP2 or STEP3 result from the older run is discarded and cannot overwrite the user's current scenario, prompt, or loading state. / シナリオの手動編集または全自動停止時に実行世代を更新します。旧世代のSTEP2・STEP3結果が遅れて返っても、現在のシナリオ、プロンプト、ローディング状態を上書きできません。
- **Visible post-image quality failsafe / 可視画像品質フェイルセーフ:** STEP4 saves and displays the first provider image before reviewing anatomy, hand side, prop ownership, functional prop orientation, bubble text, speaker-name leakage, and extra text. A concrete NG triggers only one visible, issue-limited repair candidate. A passing repair replaces the original; if the repair remains NG or its request fails, the saved original image is restored and downstream work continues with a warning. An unverified QA result does not spend another image call. / STEP4は最初のAPI画像を保存・表示してから、解剖学、手の左右、小物の所有、機能面の向き、吹き出し本文、話者名混入、余計な文字を検査します。具体的なNGがある場合だけ、問題箇所に限定した修正版を1回生成します。修正版が合格すれば置換し、修正版もNGまたは取得失敗なら保存済みの元画像へ戻して、警告付きで後続作業を続行します。QA判定不能時は追加の画像API呼び出しを行いません。
- **Verified provider routes / 検証済みAPI経路:** The current OpenAI route uses `gpt-4.1` as the primary text/vision model and `gpt-image-2` for 1024x1536 high-quality PNG generation. The Gemini route uses `gemini-3.5-flash` as the primary text/vision model and `gemini-3.1-flash-image` for manga image generation. / 現在のOpenAI経路はテキスト・画像認識の第一候補に`gpt-4.1`、1024x1536の高品質PNG生成に`gpt-image-2`を使用します。Gemini経路はテキスト・画像認識の第一候補に`gemini-3.5-flash`、漫画画像生成に`gemini-3.1-flash-image`を使用します。
- **API preflight without key persistence / API事前確認とキー非保存:** The startup modal verifies provider connectivity before unlocking STEP1. One verified browser-memory session owns the credential; one submit keeps the same input for up to three internal transient attempts with a 45-second per-attempt timeout, so a cold connection does not require a reload or a second paste. Neither the credential nor a bootstrap flag is persisted. / 起動時モーダルでプロバイダー接続を確認してからSTEP1を有効化します。検証済みのブラウザメモリ内セッションだけが認証情報を保持し、1回の送信内で同じ入力を保持したまま、一時失敗を1試行45秒・最大3試行まで内部再試行します。再読み込みや再貼付は不要で、認証情報も初期化フラグも永続化しません。
- **STEP4 helper boundary / STEP4補助機能の境界:** Generated images can be downloaded as received. The aspect-ratio correction and 2x upscale buttons copy instructions for external image tools; they are not in-app deterministic image processors. The MiniMax H3 helper copies a four-panel Reference-to-Video prompt-authoring instruction: send it with the generated manga to an image-capable chat, copy the returned English H3 prompt, then connect that manga only to the first ComfyUI `ref_image_0` input and paste the result into `Prompt`. / 生成画像は受信した状態で保存できます。アスペクト比補正と2倍アップスケールのボタンは外部画像ツール向けの指示文をコピーする機能であり、アプリ内で画像処理を実行する機能ではありません。MiniMax H3補助は、指示文をコピーして生成済みの4コマ漫画と同時に画像対応チャットへ送信し、返った英語のH3用プロンプトをコピーするための機能です。その後、同じ4コマ漫画だけをComfyUIの最初の参照入力 `ref_image_0` に接続して、出力文を `Prompt` に貼り付けて実行します。`ref_image_1` 以降は使いません。

### MiniMax H3 ComfyUI Reference-to-Video / 4コマ漫画の動画化補助

STEP4 has two helpers for different use cases. They are separate actions; you do not need to use both. / STEP4には用途の異なる2つの補助があります。2つは別の操作であり、両方を必ず使う手順ではありません。

**Create video from a four-panel manga / 4コマ漫画から動画を作る**

Use the generated four-panel manga as a reference image to make a video with MiniMax H3 in ComfyUI. MiniMax H3 is a Reference-to-Video model that carries the characters, composition, and scene from the reference image into the generated video. Choose either the manual standard-template route or the latest recommended workflow. / 生成した4コマ漫画を参照画像にして、ComfyUI上のMiniMax H3で動画を作れます。MiniMax H3は、参照画像のキャラクター・構図・場面を引き継ぎながら動画を生成するReference-to-Videoモデルです。下の「ComfyUI標準テンプレートを自分で使う場合」または「最新版・最強版ワークフローを使う場合」のどちらかを選びます。

**Using the ComfyUI standard template yourself / ComfyUI標準テンプレートを自分で使う場合**

When you configure and use ComfyUI's standard MiniMax H3 Reference-to-Video (R2V / Ref2VA) workflow yourself, use only “Copy MiniMax H3 · ComfyUI Prompt.” This route does not download the dedicated workflow JSON. The copied instruction derives `panel_cast[N]` and immutable identity signatures from every input panel without hard-coding cast size or appearance. Because the standard template has no downstream title compositor, the title remains a Shot 1-only instruction. / ComfyUI標準のMiniMax H3 Reference-to-Video（R2V / Ref2VA）を自分で設定して使う場合は、「MiniMax H3・ComfyUI用プロンプトをコピー」だけを使います。この操作では専用ワークフローJSONをダウンロードしません。コピー文は各入力コマから `panel_cast[N]` と識別署名を動的に導出し、人数や外見を固定しません。標準テンプレートには後段タイトル合成ノードがないため、タイトルはShot 1だけに表示します。

For this manually configured standard ComfyUI route, select `MiniMax H3 Reference-to-Video (R2V / Ref2VA)`, connect the same four-panel manga only to `ref_image_0`, and leave `ref_image_1` onward disconnected. Start `Resolution Selector (Size)` at `Aspect ratio: 16:9 (Widescreen)` and `Megapixels: 0.4`, and `Basic Scheduler` at `Scheduler: normal`. / 手動で設定するこのComfyUI標準経路では、`MiniMax H3 Reference-to-Video（R2V / Ref2VA）` を選び、同じ4コマ漫画を最初の参照入力 `ref_image_0` にだけ接続して、`ref_image_1` 以降は未接続にします。`Resolution Selector (Size)` は `アスペクト比: 16:9 (Widescreen)` と `メガピクセル: 0.4`、`基本スケジューラー` は `スケジューラー: normal` から開始します。

**Using the latest recommended workflow / 最新版・最強版ワークフローを使う場合**

This route distributes `Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json` and `ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip` as separate direct downloads. The same custom node serves the standard and latest workflow routes; there is no duplicated LoRA-only package. Defaults are 15 seconds, 16:9, 0.4 MP, Turbo v4 LoRA at strength `1.0`, Euler sampler, Beta scheduler, and 8 steps. “v4” names the LoRA version, not a 4-step setting. / この経路では `Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json` と `ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip` を別々に配布します。カスタムノードは標準版・最新版ワークフローで共通で、LoRA専用パッケージを複製しません。既定は15秒・16:9・0.4MP・Turbo v4 LoRA（強度 `1.0`）・Euler・Beta・8 stepsです。「v4」はLoRAのバージョンで、4 stepsの意味ではありません。

**FURU four-panel manga to video / FURUの4コマ漫画を動画化**

The dedicated workflow turns one completed Super FURU AI four-panel manga page into four contiguous MiniMax H3 shots. It retains panel order, panel-derived cast, speaker ownership, story action, setting, and punchline; it gives each visible character a role-appropriate movement, removes speech balloons, and adds the title and fixed end credit outside H3 after generation. / 専用ワークフローは、完成したSuper FURU AIの4コマ漫画1枚を連続する4つのMiniMax H3ショットに変換します。コマ順、各コマから導く登場人物、台詞の話者、物語上の動作、場所、オチを保ち、画面内の各人物へ役割に応じた動きを与え、吹き出しを除去します。タイトルと固定エンドクレジットは、H3生成後にワークフローが合成します。

Each required loader embeds the verified filename, download URL, SHA256, and ComfyUI target folder for the Ref2VA diffusion model, Qwen3VL text encoder, video VAE, audio VAE, and Turbo v4 LoRA. When you open the workflow, ComfyUI can show `Download` for a missing registered model instead of only reporting an unresolved filename. ComfyUI Desktop saves to its managed model folder; browser-based ComfyUI can use the browser download path, in which case move the file to the folder shown by the model card and restart ComfyUI. / 必要な各ローダーには、Ref2VA拡散モデル、Qwen3VLテキストエンコーダ、映像VAE、音声VAE、Turbo v4 LoRAの検証済みファイル名、ダウンロードURL、SHA256、ComfyUI保存先を登録しています。ワークフローを開くと、ComfyUIは不明なファイル名だけを報告するのでなく、登録済みの不足モデルとして `Download` を表示できます。ComfyUI Desktopは管理対象のモデルフォルダへ保存します。ブラウザ版でブラウザ保存になった場合は、モデルカードの表示先へ移動してComfyUIを再起動してください。

Click “Nano Bananaカスタムノードをダウンロード,” extract `ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip`, and place the generated `ComfyUI-NanoBanana-H3` folder at `ComfyUI/custom_nodes/`. If an older folder with the same name exists, fully close ComfyUI, back up the old folder, and replace it as a folder; never mix old and new custom-node files. Save `Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json` under `ComfyUI/user/default/workflows/`, then fully restart ComfyUI before opening it. / 「Nano Bananaカスタムノードをダウンロード」を押して `ComfyUI-NanoBanana-H3-Latest-2026-08-26.zip` を保存し、展開して生成された `ComfyUI-NanoBanana-H3` フォルダを `ComfyUI/custom_nodes/` へ配置します。同名の旧版がある場合はComfyUIを完全終了し、旧版をバックアップしてからフォルダ単位で差し替えます。新旧カスタムノードのファイルは混在させません。`Super-FURU-AI-4koma-H3-Hybrid-b25-Turbo-v4-LoRA-8step-v1.json` は `ComfyUI/user/default/workflows/` 以下へ保存し、開く前にComfyUIを完全に再起動してください。

The workflow requires the MiniMax H3 base model, text encoder, video and audio VAEs, and Turbo v4 LoRA. Users obtain them separately under their distributors' licenses. In node 4, `Nano Banana Image Transform (H3)`, select `Google Gemini API` or `OpenAI API`, then re-register your key on the destination PC through “🔐 APIキー未登録／登録.” One run uses the selected provider for both image transformation and H3-prompt creation: Google uses `gemini-3.1-flash-image` for image transformation and `gemini-2.5-flash` for prompt creation and image QA; OpenAI uses `gpt-image-2` and `gpt-4.1-mini` respectively. The key is absent from the workflow JSON and distribution ZIP; it is stored locally at `ComfyUI/user/nanobanana_h3_credentials.json` without encryption. If `NanoBananaH3Transform`, `DeterministicTitleWatermarkOverlay`, or `DeterministicEndCreditOverlay` cannot be loaded, the cause is often custom-node placement or an incomplete ComfyUI restart; also check duplicate extraction, load errors, and version compatibility. API keys, authentication files, model binaries, user images, and generated outputs are not distributed. / ワークフローにはMiniMax H3本体モデル、テキストエンコーダー、映像VAE、音声VAE、Turbo v4 LoRAが必要です。各配布元のライセンスに同意して利用者自身が取得してください。ノード4の `Nano Banana Image Transform (H3)` では `Google Gemini API` または `OpenAI API` を選び、「🔐 APIキー未登録／登録」から移行先PCでAPIキーを再登録します。1回の実行では、選択中のProviderが画像変換とH3プロンプト作成の両方に使われます。Googleは画像変換に `gemini-3.1-flash-image`、プロンプト作成・画像QAに `gemini-2.5-flash` を使い、OpenAIは画像変換に `gpt-image-2`、プロンプト作成・画像QAに `gpt-4.1-mini` を使います。APIキーはワークフローJSONや配布ZIPには含まれず、ローカルの `ComfyUI/user/nanobanana_h3_credentials.json` に保存され、暗号化されません。`NanoBananaH3Transform`、`DeterministicTitleWatermarkOverlay`、`DeterministicEndCreditOverlay` が読めない場合は、多くの場合カスタムノードの配置またはComfyUIの完全な再起動が未完了です。二重展開、読込エラー、バージョン互換性も確認してください。APIキー、認証ファイル、モデル本体、ユーザー画像、生成物は配布しません。

The dedicated H3 prompt extracts the exact title as `overlay_title` metadata and removes it before H3 conditioning. `DeterministicTitleWatermarkOverlay` composites it once after decoding at the upper left using black text with a white outline and no background bar; `DeterministicEndCreditOverlay` adds the fixed credit afterward. / 専用H3プロンプトはタイトルを `overlay_title` として抽出し、H3の条件入力から除外します。`DeterministicTitleWatermarkOverlay` が動画生成後に左上へ一度だけ、黒字＋白縁・背景バーなしで合成し、`DeterministicEndCreditOverlay` が固定クレジットを後段で合成します。

In every panel, non-speakers keep their mouths closed while giving individual reactions that fit their roles. Across the four shots, the camera varies push-ins and pull-backs, lateral moves, vertical moves, and orbits. For an orbit or follow move, specify the opening, middle, and final framing while keeping the speaker's mouth visible. / 各コマでは、話者以外も口を閉じたまま役割に合った個別反応を行い、カメラは寄り引き・横移動・縦移動・回り込みを4カット内で使い分けます。回り込みや追従では開始・中間・終了の画角を指定し、話者の口元を保ったまま動かします。

“Copy MiniMax H3 · ComfyUI Prompt” permits only the opening title as readable on-screen text and never asks H3 to generate ending credits or a URL. The distributed workflow composites the fixed credit afterward with `DeterministicEndCreditOverlay`. It does not add a subtitle button. The helper works on another PC or browser and uses OCR on the attached four-panel image only to obtain the title. Text outside the panels can be read for the title, but is not used as story material. Only what is inside each of the four panels is treated as video material: story, characters, dialogue, action, and setting. If OCR cannot read the title reliably, it confirms only the title rather than creating a video prompt. For a usual multi-row Japanese layout, it instructs the order from top to bottom and, within a row, right to left. The title is a fixed transparent overlay, with no requested fade or scroll. Background signs, screens, and printed items become abstract textures that cannot be read as actual text, numbers, or URLs. / 「MiniMax H3・ComfyUI用プロンプトをコピー」は、冒頭タイトルだけを実際に読める画面文字として許可し、H3側には終端クレジットやURLを生成させません。固定クレジットは配布ワークフローの `DeterministicEndCreditOverlay` が後段で合成します。字幕ボタンは追加しません。外部PC・別ブラウザでも使え、添付した4コマ画像からOCRでタイトルだけを取得します。タイトルは枠外にあってもOCR対象ですが、枠外文字を物語素材として使いません。4コマの各コマ内だけを物語・人物・台詞・動作・舞台の動画素材として扱います。OCRでタイトルを確実に読めない場合は、動画用プロンプトを作らずタイトルだけを確認します。通常の日本式複数列レイアウトでは上から下・同じ段では右から左のコマ順を明記させます。タイトルは固定の透明オーバーレイとして表示し、フェードやスクロールを要求しません。背景の看板・端末・印刷物は、実際の文字・数字・URLとして読めない抽象的な質感へ置き換えます。

### Functional-surface orientation / 機能面の向き

The prompt does not simply turn every readable surface toward the viewer. It first identifies the action and the intended recipient, then chooses a camera relationship that can physically show the required information. This keeps a counter nameplate, monitor, phone, paper, card, book, map, ticket, or printed form from being arbitrarily rotated into the camera just because it contains readable content.

プロンプトは「文字や画面がある物を常に読者側へ向ける」処理ではありません。まず行為と受け手を判定し、必要な情報を物理的に見せられるカメラ関係を選びます。これにより、窓口のネームプレート、モニター、スマホ、書類、カード、本、地図、チケット、印刷フォームなどを、内容を読ませたいだけの理由で不自然にカメラへ回転させることを抑えます。

| Situation / 状況 | Orientation rule / 向きの基準 |
|:--|:--|
| Reading or operating a phone, monitor, document, card, book, map, ticket, or form / 読む・操作する | The active reader/operator is the target. The functional face is aimed at that person. / 読む・操作する人物が受け手であり、機能面はその人物へ向けます。 |
| Submitting, presenting, or showing an item to someone / 提出・提示・見せる | The recipient is the target. A document handed to a clerk may correctly show its front to the clerk even if the viewer also sees it. / 受け手が基準です。窓口へ提出する書類は、読者にも見えていても行員側へ正面を向けていて正しい場合があります。 |
| A face-up item on a table / 卓上に置いた紙面 | A page, card, book, or form may be face-up. Its text baseline follows the intended reader rather than being forced to the camera. / 紙・カード・本・フォームは表向きで構いません。文字の基準方向はカメラではなく、読む人物に合わせます。 |
| Over-the-shoulder shot from behind the reader / 読者の背後からの肩越し | The camera is on the reader's side, so the same screen may naturally be visible to both reader and viewer. This is the correct way to show a private phone or monitor display. / カメラが読む人物と同じ側にあるため、同じ画面を人物と読者の両方が自然に見られます。個人のスマホやモニターを見せたい場合の正しい構図です。 |
| Explicitly showing the screen to the viewer/camera / 観客・カメラへ明示的に見せる | Only an explicit "show it to camera/viewer" action makes the camera the recipient. / 「カメラ・読者へ見せる」と明示されたときだけ、カメラを受け手として扱います。 |

This is prompt-level composition control, not a claim of pixel-perfect rendering. STEP4 therefore checks the generated result visibly for body and hand integrity, ownership of props, functional orientation where it is clear, dialogue-only bubbles, speaker-name leakage, and unrelated extra text; it preserves the image and reports the concrete check instead of silently regenerating it.

これはプロンプト段階の構図制御であり、画像モデルのピクセル単位の完全保証ではありません。そのためSTEP4では、生成結果を残したまま、身体・手の整合性、小物の所有者、判定可能な機能面の向き、吹き出し内が台詞のみか、話者名の混入、無関係な文字を可視レビューします。黙って再生成はしません。

<img width="926" height="755" alt="スクリーンショット 2026-08-07 164856" src="https://github.com/user-attachments/assets/ecfc15ea-4040-43ad-a5ed-fb2e9d078335" />
<img width="1055" height="1491" alt="ChatGPT Image 2026年8月7日 17_26_17" src="https://github.com/user-attachments/assets/004c188f-14dd-4598-9f24-706373599a37" />
<img width="1024" height="1536" alt="ChatGPT Image 2026年8月7日 17_26_17_EN_1786091400299" src="https://github.com/user-attachments/assets/86473cc0-e2b7-4eea-853b-17618f3e7250" />

### 🎥 Operation Tutorial / 動作手順動画

<https://www.youtube.com/watch?v=wmC8BgKliKk>
*(Click to watch / 動画を再生)*

### 📺 Introduction / 解説動画

<https://www.youtube.com/watch?v=FmSQ267vrZg>
*(Click to watch / 動画を再生)*

### 🎙️ AI Voice Comic Maker Integration / フルボイス動画化アプリとの連携

This system's output can be seamlessly integrated with **[AI Voice Comic Maker](https://github.com/FURUYAN1234/ai-voice-comic-maker)**. 
By importing the 4-koma manga generated here into the AI Voice Comic Maker, it automatically adds dynamic camera panning, BGM, and fully-voiced character dialogue (via VOICEVOX), instantly converting your static manga into highly immersive vertical short videos for TikTok or YouTube Shorts.

本システムで生成した「Super FURUフォーマット」の4コマ漫画画像は、姉妹アプリである **[AI Voice Comic Maker](https://github.com/FURUYAN1234/ai-voice-comic-maker)** とシームレスに連携可能です。
生成された画像をAI Voice Comic Makerに読み込ませるだけで、AIが画像を再解析し、ダイナミックなカメラワーク、感情に連動したBGM、そしてフルボイス（VOICEVOX）のセリフを自動付与します。これにより、静止画のマンガがワンクリックでTikTokやYouTube Shorts向けの没入感あふれる縦型ショート動画へと変換されます。

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

* **Date-aware topic research / 日付指定の話題調査**: In date-specified news mode, Gemini attempts Google Search Grounding when compatible; if Grounding is unavailable, it retries without the tool. The resulting topic is material for a comic, not an independently verified news report.
  日付指定ニュースモードでは、Geminiが利用可能な場合にGoogle Search Groundingを試行し、利用できない場合はツールなしで再試行します。得られた話題は漫画の材料であり、独立に検証済みのニュース報道ではありません。
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

Users can specify a target date and categories for a news-inspired four-panel scenario. Gemini attempts Grounding where compatible and otherwise continues without it, so generated content must not be treated as a verified news record.
対象日とカテゴリを指定して、ニュース題材の4コマシナリオを作成できます。Geminiは利用可能な場合にGroundingを試し、利用できない場合はツールなしで継続するため、生成結果を検証済みのニュース記録として扱わないでください。

* **Categories**: General, Technology, Business, Entertainment, Science, Health, Sports, Art.

#### 🧥 Date-Linked Seasonal Outfit Rules / 日付連動の季節衣装ルール

For date-specified news, STEP2 calculates a Japan-default seasonal hint from the selected target date and displays it as read-only guidance. It is an auto-selection aid, not a user setting and not a replacement for the story context. / 日付指定ニュースでは、STEP2が選択した対象日から日本基準の季節目安を算出し、読み取り専用の補助情報として表示します。これは自動選定の補助であり、ユーザー設定やストーリー文脈の置換ではありません。

Priority is: explicit user outfit; event-specific clothing; profession, safety gear, location, real weather, or indoor environment; target-date season; then ordinary automatic selection. A concrete outfit category is required. The validator requests a complete scenario rewrite only for an empty or ambiguous outfit, or a clear unexplained seasonal conflict; cold regions, snow, ice rinks, heated pools, saunas, tropical locations, and comparable evidence remain valid exceptions. Manual input uses explicit topic/environment cues and does not infer a target-date season. / 優先順位は、ユーザー指定衣装、行事固有の服装、職業・安全装備・場所・実際の天候・屋内環境、対象日の季節、通常の自動選定です。衣装は具体的なカテゴリでなければなりません。検証は空・曖昧な衣装、または根拠のない明白な季節不一致だけで完全なシナリオ再生成を求めます。寒冷地・積雪・スケートリンク・温水プール・サウナ・熱帯地域など、文脈上の根拠がある例外は有効です。自由入力では話題・環境の明示的な手掛かりだけを用い、対象日から季節を推測しません。

### ✏️ Manual Input Mode / 自由入力モード

A "Free Input" mode allows users to generate manga from any text, such as personal diaries or specific creative prompts.
自由にテキストを入力して漫画を生成できるモードです。個人的な日記や、特定の創作ネタなど、ニュース以外のトピックも扱えます。
> **Note**: Direct URL input is often blocked by security (403 errors). Copy-pasting the article text is recommended.
> URLの直接入力はセキュリティによりブロックされることが多いため、記事のテキストを直接コピーすることを推奨します。

When a URL is entered, the app attempts to fetch its text through the CodeTabs public proxy. Only successfully extracted text is used as reference material; an unreachable URL is not treated as verified external evidence. / URLを入力すると、アプリはCodeTabsの公開プロキシ経由で本文取得を試みます。取得に成功した本文だけを参照材料とし、取得できないURLを検証済みの外部事実として扱いません。

### ⚡ Full Auto Mode / フルオート生成モード

With a single click, the system autonomously executes the entire pipeline (from scenario generation to prompt compilation and image rendering) without requiring manual advancement through each step.
キャラクターとお題を設定した状態から、シナリオ生成・プロンプト構築・画像生成の全ステップを人間の介入なしに一気通貫で自律実行するモードです。

### 🔁 Endless Mode / 無限ループモード
The system continuously runs the scenario-to-image workflow until the user explicitly stops it, preserving the initial character settings between runs. It requests the next topic from the selected provider; it is not a separately verified news-crawling service.
ユーザーが停止ボタンを押すまで、初期キャラクター設定を維持したままシナリオから画像までの処理を連続実行します。次の話題は選択したプロバイダーへ要求するものであり、独立した検証済みニュースクローラーではありません。

### 🧠 Lightweight Setting Continuity / 軽量な舞台継続
Each story uses a concrete `Location` plus explicit time or weather cues when supplied. The scenario also keeps drawable event evidence available to the final prompt, but it no longer requires the former seven-field background schema, fixed anchors, or a background-only retry path. Background continuity is deliberately lower priority than correct people, hands and arms, prop ownership and functional orientation, and exact dialogue bubbles.

各作品では、具体的な `Location` と明示された時刻・天候を継続情報として使います。出来事を示す描画可能な証拠も最終プロンプトへ引き継ぎますが、旧来の7項目背景スキーマ、固定アンカー、背景だけを理由にした再試行は要求しません。背景の継続性は、人物・手・腕の正しさ、小物の所有者と機能面の向き、吹き出し本文より意図的に低い優先度です。

An incomplete or generic setting alone does not turn an otherwise usable scenario into a terminal error. STEP2 can make up to three total attempts for the complete scenario and retains the highest-scoring usable candidate with a concrete warning if no attempt satisfies every check. An explicitly unsafe location, API/transport failure, malformed response, or missing usable output remains an error because there is no safe artifact to continue with.

背景が抽象的・不完全であることだけでは、利用可能なシナリオを停止させません。STEP2は完全なシナリオとして全3試行まで行い、すべての条件を満たせなくても利用可能な最高得点候補を具体的な警告付きで保持します。一方、明示的に危険な場所、API・通信失敗、応答形式不正、利用可能な出力の欠落は、安全に継続できる成果物がないためエラーになります。

### 🧠 Generation Trace and Progress Logging / 生成トレースと進行ログ
The progress window combines client-side phase labels and elapsed waiting time with validation results, retry counts, warnings, and provider updates when available. Structured `<thought>` blocks are separated from the scenario body by the provider router and shown as an explanatory trace. This is a model-authored summary for observability, not a complete disclosure of private model reasoning or proof that both providers reason identically.

進行ログには、クライアント側の処理段階表示と待機時間に加え、検証結果、試行回数、警告、利用可能な場合はプロバイダーからの更新を表示します。応答内の構造化された `<thought>` ブロックはプロバイダールーターがシナリオ本文から分離し、説明用トレースとして表示します。これは動作を追いやすくするためのモデル生成要約であり、モデル内部の非公開推論の完全な開示や、両プロバイダーの推論過程が同一であることの証明ではありません。

### 🎬 Scenario Enhancement / シナリオ演出強化
STEP2 provides seven independently selectable categories: expressions, body acting, visual effects, background, camera work, dialogue rewrite, and gag direction. Only the selected categories may change. The validator requires a real change in every selected category while preserving the title, logline, location, outfit, punchline metadata, four-panel structure, speakers, and every unselected category. It also rejects cross-category bleed, unintended tone escalation, anatomy/body-horror escalation, explanatory dialogue expansion, and weakened punchlines.

STEP2には「表情追加・身体強化・演出強化・背景強化・カメラワーク・セリフ書換・ギャグ演出」の7カテゴリがあり、個別または一括で選択できます。変更できるのは選択カテゴリだけです。選択した各カテゴリに実質的な変更があるかを検証しつつ、タイトル、ログライン、場所、服装、オチのメタデータ、4コマ構造、話者、未選択カテゴリを保持します。他カテゴリへのはみ出し、意図しないトーンの過激化、人体変形・身体崩壊の追加、説明的なセリフ長文化、オチの弱体化は不合格になります。

Enhancement uses at most two API calls: the initial attempt and one correction that includes the concrete validation issues. A valid first result is accepted immediately. When neither attempt passes every check, the system compares only usable candidates and keeps the highest-scoring one with a warning. If every generated rewrite breaks a non-negotiable editing contract, it restores the saved original scenario. In both warning paths, the result remains available to STEP3 and STEP4, and the user can always select **Undo enhancement** to restore the pre-enhancement script.

演出強化のAPI呼び出しは最大2回です。初回生成と、具体的な検証NGを渡した自動修正1回で構成されます。初回で合格すれば、その時点で採用して不要な再試行は行いません。2回とも完全合格でない場合は、利用可能な候補だけを比較して最高得点のものを警告付きで採用します。すべての生成候補が必須の編集契約を壊した場合は、保存済みの元シナリオへ戻します。どちらの警告経路でもSTEP3・STEP4へ進め、「強化前に戻す」で元のシナリオを復元できます。

### 🎰 Punchline Director (v3.31+) / オチ・ディレクター

A UI-based control that lets users manually select the comedic direction of the 4th-panel punchline — or leave it to AI. When set to a specific type, the selection is injected as a hard constraint into the scenario prompt, **overriding AI's natural tendency** to always pick the "safest" joke.
UIからオチ（4コマ目）の方向性を手動で選択できるコントロールです。「Auto（AIおまかせ）」のほか、10種類の具体的なオチパターン（静寂型 / 爆発型 / 感動詐欺 / メタフィクション / 理不尽な制裁 / 天丼 / 夢オチ / 盛大な勘違い / 打ち切りエンド / ドキュメンタリー）から指定できます。選択されたオチはシナリオプロンプトへ明示的な制約として注入されます。旧バージョン由来の `PsychoHorror` 入力は安全な `Surreal` として正規化され、現在のUIには表示されません。

* **Auto Mode / おまかせモード**: The system selects from the current punchline set before prompt assembly to reduce repeated endings. This is the default. / プロンプト構築前に現行のオチ候補から選択し、同じ結末への偏りを抑えます。デフォルト設定です。
* **Forced Mode / 強制指定モード**: The user selects a specific punchline type such as `Dream` or `Documentary`, and that choice is passed to scenario generation as an explicit direction. / `Dream`や`Documentary`などを指定すると、その選択がシナリオ生成へ明示的な演出方針として渡されます。
* **Documentary Mode / ドキュメンタリーモード**: A special punchline mode that visualizes serious news while keeping the source context readable. It includes a built-in "3-Tier Hybrid Content Sanitizer" that rewrites high-risk or easily misunderstood wording into milder, policy-compatible phrasing and redacts only limited secondary terms when necessary, so sensitive real-world topics can be handled within each AI service's safety standards. / シリアスなニュースの文脈を保ちながら漫画化するための特殊設定です。「3層ハイブリッド・コンテンツサニタイザー」により、核兵器やテロなどの過激・誤解されやすい表現を、各AIサービスの安全基準に適合しやすい穏当な表現へ自動変換します。必要な場合のみ限定的に表記を抑え、元記事の意図を保ちながら安全に生成へ進めます。
* **Browser UI Integration / ブラウザUI連携**: The selected punchline type is embedded in the scenario output header (`Punchline: 爆発型`), so if you choose to use the manual "Browser UI Option" to save API costs, copying the scenario to ChatGPT or Gemini automatically carries the comedic intent. / 選択されたオチの種類はシナリオ出力ヘッダーに埋め込まれ、APIを使わずに手動でChatGPTやGeminiのWeb画面にコピペする際にも意図が自動的に伝わります。

### 🎭 Comedy Tone Engine (v4.0.6+) / コメディトーン・エンジン

To break the monotony of generated scripts, the system now features a comedy tone controller that dynamically influences the narrative style and execution of jokes. It randomly selects or enforces one of three distinct comedic registers:

- **HighTension (ハイテンション爆発系)** : Characters scream, overreact, and spiral out of control. Best for chaotic and high-energy setups.
- **SurrealQuiet (シュール静寂系)** : Characters maintain deadpan expressions and cold reactions in bizarre situations, relying on awkward pauses and weird silence.
- **IntellectualBlack (知性派ブラック系)** : Adds modern satire, dark humor, and sharp irony. The humor arises from subtle, underlying madness.

AIが生成するストーリーのノリが一パターンになるのを防ぐため、物語のトーンとギャグの表現スタイルを動的に操作するコメディトーン・エンジンを搭載しています。システムが以下の3つのトーンから自動的にランダム選定し、AIへ指示します。

- **HighTension (ハイテンション爆発系)** : キャラクターが叫び、オーバーリアクションをし、感情的に限界突破して暴走します。勢いとカオスで笑いを誘う設定です。
- **SurrealQuiet (シュール静寂系)** : 狂った状況下でもキャラクターはあえて無表情・真顔を貫き、淡々とした温度感の低いリアクションや奇妙な「間」でシュールな笑いを演出します。
- **IntellectualBlack (知性派ブラック系)** : 現代社会の風刺や痛烈な皮肉、ダブルミーニングを散りばめ、「よく考えると恐ろしい事実や狂気」が浮かび上がる知的な笑いを構築します。

### 🤖 ChatGPT Image 2.0 Anti-Noise Protocol / OpenAI特有ノイズ除去プロトコル

When the OpenAI Engine is selected (or when using the Browser UI Option for ChatGPT), a dedicated formatting protocol is applied for ChatGPT Image 2.0. It specifies an A4 portrait composition, Japanese text direction, reading flow, safe rendering terms, prohibited term combinations, and light-effect substitutions. These prompt-level controls reduce common layout and visual-noise failures, but the image model still determines the final pixels.
OpenAI Engine選択時（またはChatGPT向けのブラウザUI運用時）には、ChatGPT Image 2.0向けの専用プロンプトフォーマットを適用します。A4縦長構図、日本語文字の方向、視線誘導、安全な描画語、禁止語の組み合わせ、光演出の代替表現を指定します。これらはレイアウト崩れや視覚ノイズを抑えるプロンプト段階の制御であり、最終的な描画結果は画像モデルの解釈に依存します。

### 🛡️ Content Policy Adjustment System / コンテンツポリシー調整とWeb版案内

When a provider returns a safety-policy block, the app presents recovery choices rather than treating it as a successful generation.
プロバイダーが安全ポリシーによる拒否を返した場合、成功扱いにはせず、復旧方法を選べるようにします。

- **Dynamic Auto-Fix / 配慮版プロンプトの自動再生成**: 
  In normal operation, the user chooses this option after a safety-policy block. The AI Advisor then rewrites high-risk or ambiguous wording into milder, context-preserving alternatives and submits one retry. If it is rejected again, the choice is shown again.
  通常操作では、安全ポリシーによる拒否の後にユーザーがこの選択肢を選びます。AIアドバイザーが過激または誤解されやすい表現を文脈に沿った穏当な表現へ置き換え、1回再試行します。再び拒否された場合は、選択肢を再表示します。

- **One-Click "Switch to Web" / 「Web版に切り替える」連携機能**: 
  A "Switch to Web" button copies the current provider-specific prompt and displays the official ChatGPT or Gemini destination in the recovery guidance. The user opens that Web UI, attaches the references, and submits the request there.
  **「Web版に切り替える」** ボタンは、現在のプロバイダー向けプロンプトをコピーし、復旧案内に公式ChatGPTまたはGeminiの行き先を表示します。ユーザーがWeb UIを開き、参照画像を添付してそこで送信します。

- **Unified Copy Workflow / 統一されたコピペ連携フロー**: 
  The clipboard-copy and recovery-guidance workflow is shared by both Gemini and ChatGPT engines; the destination and prompt family follow the selected provider.
  GeminiとChatGPTのどちらでも、コピーと復旧案内の流れは共通です。行き先とプロンプト系統は選択中のプロバイダーに従います。

- **Intelligent Auto-Mode Adaptations / 自動化モードとの高度な連携**:
  - **Full Auto Mode / フルオートモード**: The system automatically attempts the "Auto-Fix" retry up to 3 times. If all attempts fail, it pauses and prompts the user for action.
    フルオート生成中、ポリシーエラーが発生した場合はAIが最大3回まで配慮版での再生成とリトライを実行。それでも安全基準内で生成できない場合のみ一時停止し、ユーザーの介入を待ちます。
  - **Endless Mode / 無限ループモード**: If a topic repeatedly fails policy handling, the loop can skip it and continue with the next generated topic. This is continuity behavior, not a live-news retrieval guarantee.
    無限ループモードの放置運用中、特定のニュースやお題でポリシーエラーが3回連続して解消できない場合、ループ全体のフリーズを防ぐため、そのお題を自動的にスキップして次のトピックへ自律的に移行します。

> **🔒 Security Architecture / セキュリティ設計**
> Production is a **client-side static application** hosted on GitHub Pages. Gemini and OpenAI requests are sent from the browser to their respective providers, so the API key is held in memory and is sent only with that provider request; it is not persisted by the app. In local development, Gemini requests use the Vite `/gemini-api` proxy. URL extraction in Free Input uses the CodeTabs public proxy and does not send API keys to it.
> 本番は GitHub Pages 上の **クライアントサイド静的アプリ** です。GeminiとOpenAIへのリクエストはブラウザから各プロバイダーへ送られるため、APIキーはメモリ内で保持され、そのプロバイダーへのリクエストにだけ送信されます。アプリはキーを永続保存しません。ローカル開発ではGeminiリクエストにViteの `/gemini-api` プロキシを使います。自由入力のURL本文取得にはCodeTabsの公開プロキシを使い、そこへAPIキーは送信しません。

### 🎨 Context-Aware Auto-Selection / 文脈認識型おまかせ自動選定

Both the **Location** (場所) and **Outfit** (服装) fields support an "AI Auto-Select" mode. When either field is left blank, the system does not simply fall back to the character sheet's default — instead, it instructs the AI to **analyze the scenario context** and autonomously determine the most appropriate setting.
「場所」と「服装」の両フィールドは「AIおまかせ」モードに対応しています。いずれかのフィールドが空欄の場合、キャラクターシートのデフォルト値をそのまま使うのではなく、 **AIがシナリオの文脈を分析して、最も適切な場所・服装を自律的に判断・選定** します。

* **Location**: AI determines the most fitting background environment based on the scenario's plot, mood, and action (e.g., a beach scene → seaside resort, a political debate → parliament building).
  シナリオのプロット・雰囲気・アクションに基づき、AIが最適な背景環境を決定します（例：海のシーン→海辺のリゾート、政治討論→国会議事堂）。
* **Outfit**: AI evaluates whether the character sheet's default clothing is contextually appropriate. If the scenario calls for a specific attire (swimwear for a pool episode, formal suits for a business meeting), the AI overrides the default with a **concrete clothing description** rather than vague defaults.
  AIがキャラクターシートのデフォルト衣装がシナリオの文脈に適しているかを評価します。特定の衣装が求められるシーン（プール回なら水着、ビジネス会議ならスーツ）では、曖昧なデフォルトではなく **具体的な服装名** でオーバーライドします。
* **UI Distinction / UI上の区別**: In the Generation Preview, user-specified values appear in **white text**, while AI-selected values appear in **blue text with an ✨ icon**, making it immediately clear which settings were chosen by the human and which by the AI.
  生成プレビューでは、ユーザー指定値は **白文字** 、AI選定値は **青文字＋✨アイコン** で表示され、人間とAIどちらが選んだ設定かが一目で識別できます。

### 🛡️ Exportable Metadata JSON / 書き出し可能なメタデータJSON

The "Metadata Download" button exports a sidecar JSON snapshot of the generation state for the user's own recordkeeping. It is an application-generated record, not an independently certified provenance or compliance artifact.
「監査用メタデータ保存」ボタンは、生成時点の状態をサイドカーJSONとして書き出します。これは利用者の記録用にアプリが生成するデータであり、独立機関が認証した来歴証明やコンプライアンス証跡ではありません。

* **Generation fingerprint / 生成フィンガープリント**: Uses the Web Crypto API (`crypto.subtle.digest`) to record a SHA-256 hash of the scenario, prompt, timestamp, and app version. It supports comparison of the same recorded inputs; it does not by itself prove authorship, origin, or later non-tampering.
  ブラウザのWeb Crypto APIを使用し、シナリオ・プロンプト・タイムスタンプ・アプリ版のSHA-256ハッシュを記録します。同じ入力の照合には使えますが、これだけで著作者・出所・後日の非改ざんを証明するものではありません。
* **Tool Identification (ツール名とリポジトリの明記)**: Clearly records the generating application name (`Super FURU AI 4-koma System`) and the exact GitHub repository URL to provide full transparency of the source system.
  JSON内に「生成ツール名」およびソースコードの公開先である「GitHubリポジトリURL」が自動で記録され、出所の透明性がさらに向上しました。
* **Model and content footprint / モデルと内容の記録**: Records the reported image model (for example `gemini-3.1-flash-image` or `gpt-image-2`), fallback status, and character counts for the generated scenario and prompt. The values describe that exported run; they do not establish originality or quality.
  使用された画像モデル（例: `gemini-3.1-flash-image`、`gpt-image-2`）、フォールバック状態、生成されたシナリオとプロンプトの文字数を記録します。値は書き出した実行内容を示すものであり、独自性や品質を証明するものではありません。
* **Comprehensive Records / 完全な記録**: The json includes the timestamp, extracted character sheet logic, scenario script, full prompt text, and all generation settings (Punchline type, Enhancement flags).
  JSONには上記の監査データのほか、タイムスタンプ、抽出されたキャラクター設定、シナリオ全文、プロンプト全文、およびすべての生成設定（オチのタイプや演出強化フラグ）が記録されます。

### 🌐 Zero-Click 360° Background & Style json Detection (v4.0.0+) / ゼロクリック360度パノラマ背景 & 作風json連携

By dragging and dropping a 360-degree equirectangular image or a Style JSON (generated by Story Maker) alongside character sheets, the app detects it as an optional reference. A 360° image can guide spatial context and lighting, while a Style JSON can guide art direction. These are prompt/reference controls rather than a guarantee that the renderer will reproduce every background detail.
キャラクターシートと一緒に「360度パノラマ画像」や「作風JSON（Story Makerで生成）」をドロップすると、アプリは任意の参照素材として検出を試みます。360度画像は空間文脈とライティング、作風JSONはアートディレクションを導くために使われます。いずれもプロンプト・参照段階の制御であり、最終描画が背景詳細を完全再現する保証ではありません。

* **Story Maker Integration (Style JSON) / Story Maker連携（作風JSON）**: You can directly drop a Style JSON generated by the "Story Maker" app. The system parses it, extracts core art direction (for example, "watercolor", "cyberpunk", or "retro anime"), and passes that guidance into the panel prompts. It is an optional style reference, so the image model remains responsible for the final rendering. / 姉妹アプリ「Story Maker」で生成した作風JSONをそのままドロップできます。システムがJSONを解析してコアのアートディレクション（「水彩画風」「サイバーパンク」「レトロアニメ風」など）を抽出し、コマごとのプロンプトへ反映します。任意の作風参照であり、最終描画は画像モデルが行います。

* **Interactive 360° Viewer (v3.50+) / インタラクティブ360度ビューアー**: The imported 360-degree background is displayed in a dedicated spherical viewer powered by Three.js, allowing you to freely pan and zoom the environment just like a 360° video. / 取り込まれた360度パノラマ背景は、Three.jsベースの専用球体ビューアーでプレビュー表示され、360度動画のようにマウスやタッチ操作で自由に見回すことができます。
* **Context-Aware Outfit Guidance / 文脈対応の衣装誘導**: A 360° reference can contribute setting cues to outfit guidance, such as suggesting suitable gear for the environment. Explicit character-sheet clothing, user-specified outfits, event uniforms, professional gear, and safety requirements take precedence. / 360度参照は、環境に合う装備など、衣装誘導のための舞台手掛かりとして使えます。キャラクターシートの明示衣装、ユーザー指定の衣装、イベント制服、職業装備、安全要件が優先されます。
* **Autonomous Camera AI (v3.53+) / 自律カメラワークAI**: When a valid 360° reference is supplied, a camera-analysis step can propose panel perspectives (yaw, pitch, FOV) and the crop engine can extract panel-specific reference views. Those references guide camera and environmental choices; they do not override the scripted action or guarantee a pixel-perfect rendered angle. / 有効な360度参照がある場合、カメラ解析はコマごとの方角（yaw/pitch/FOV）を提案し、クロップエンジンはコマ別の参照ビューを切り出せます。これらはカメラと環境の選択を導きますが、脚本の動作を上書きしたり、ピクセル単位の角度再現を保証したりしません。
* **Phase 3 Multimodal Background Injection (v3.54+) / マルチモーダル背景注入**: Panel-specific views can be sent to Gemini as multimodal `inlineData` references when the selected route supports them. They guide setting, camera, and lighting interpretation; renderer output still remains model-generated. / 選択した経路が対応する場合、コマ別ビューはGeminiへマルチモーダル `inlineData` 参照として送れます。舞台・カメラ・ライティングの解釈を導きますが、最終出力は引き続きモデル生成です。
* **Lighting & Shadow Synchronization / 光源と影の自動同期**: A supplied 360° reference can contribute primary-light direction and ambient color temperature to the prompt. This guides shadows and lighting consistency, but people, hands, props, readable functional faces, and dialogue remain higher-priority image-quality checks. / 360度参照がある場合は、主光源の方向と環境光の色温度をプロンプトへ反映できます。影とライティングの整合性を導きますが、人物・手・小物・読める機能面・吹き出しは、より優先度の高い画像品質チェックです。

### 📦 UI Component & Hook Modularization (v3.89+) / UIコンポーネント完全モジュール化とフック分離

To address the extreme complexity of a 5,000+ line monolith, the frontend architecture has been systematically decoupled. Individual UI elements are isolated into dedicated component files inside `src/components/`, while all state management, side-effects, and business logic are extracted into a single custom Hook `useMangaWorkflow` inside `src/hooks/useMangaWorkflow.js`. This modularization dramatically simplifies `src/App.jsx` to a clean UI shell, reduces side-effects in React's state management, and speeds up build/deploy workflows.

5,000行を超える巨大モノリスの問題を完全に解消するため、フロントエンド UI 構成要素を `src/components/` 配下の独立したコンポーネントへと完全にモジュール化し、さらにすべてのステート管理や非同期通信・ビジネスロジックを **`src/hooks/useMangaWorkflow.js`** 内のカスタムフック **`useMangaWorkflow`** として完全に外部化・分離しました。これにより、各機能の結合度が下がり、コアとなる **`src/App.jsx`** は約340行のクリーンな UI シェルへとスリム化。開発の安全性とビルド・デプロイ効率が極限まで向上しました。

---

## 🔍 Deep Analysis (技術詳解)

### 🧭 Current v5.6.2 Processing Contract / 現行v5.6.2処理仕様

| Stage | Input | Processing and validation | Output |
|:--|:--|:--|:--|
| STEP1 Character analysis / キャラクター解析 | Uploaded character-sheet images / アップロードしたキャラクターシート画像 | The selected text/vision provider extracts appearance, personality, speech, pose, and other identity cues. / 選択中のテキスト・画像認識APIが外見、性格、口調、ポーズなどの同一性情報を抽出します。 | Parsed character records used by all later stages / 後続全段階で使うキャラクター記録 |
| STEP2 Scenario generation / シナリオ生成 | Character records, automatic topic or complete free input, outfit, punchline, tone / キャラクター記録、自動取得トピックまたは自由入力全文、服装、オチ、トーン | The complete four-panel scenario is checked for structure and dialogue, content hygiene, free-input exclusions, visual evidence, lightweight location/time/weather continuity, and active final-panel staging. Up to three total attempts are made. / 4コマ構造とセリフ、表現衛生、自由入力の禁止条件、視覚証拠、軽量な場所・時刻・天候の継続、4コマ目の能動演出を検証し、全3試行まで実行します。 | First fully valid candidate, or the highest-scoring usable candidate with a warning / 最初の完全合格候補、または警告付きの利用可能な最高得点候補 |
| STEP2 Enhancement / 演出強化 | Saved scenario plus any of seven selected categories / 保存済みシナリオと選択した7カテゴリ | The initial rewrite is compared with the original. If needed, one correction is requested with exact issue codes. / 初回の書換を元シナリオと比較し、必要な場合だけ具体的なNG項目付きで1回修正します。 | Valid enhancement, best usable partial enhancement, or restored original / 合格した強化、利用可能な最良の部分合格候補、または復元した元シナリオ |
| STEP3 Prompt assembly / プロンプト構築 | Accepted scenario, identity records, provider family, manual staging and optional 360° reference data / 採用シナリオ、同一性情報、プロバイダー系統、手動演出と任意の360度参照情報 | Compiles provider-specific layout, script, dialogue-tail, identity, key-prop, evidence, lightweight setting, eye-line, anatomy, hand/prop, functional-surface orientation, camera, and finish-assist locks. The resulting text is directly editable. / レイアウト、脚本、吹き出し尻尾、同一性、小道具、証拠、軽量な舞台、視線、人体、手・小物、機能面の向き、カメラ、仕上げ補助をプロバイダー別に構築し、完成文を直接編集できます。 | The exact editable prompt used by copy and API generation / コピーとAPI生成に使う編集可能な同一プロンプト |
| STEP4 Image generation / 画像生成 | Current STEP3 prompt and character references / STEP3の現在のプロンプトとキャラクター参照 | Sends the initial image request, saves the result, and runs visible QA. A concrete NG can trigger one issue-limited repair image; unverified QA does not trigger another image call. OpenAI also retains the newest valid partial when available and retries once without streaming only after a browser-level stream `Failed to fetch`. / 最初の画像を生成・保存して可視QAを行います。具体的なNG時だけ問題限定の修正版画像を1回生成でき、QA判定不能時は追加生成しません。OpenAIは利用可能な最新途中画像も保持し、ブラウザレベルのストリーム `Failed to fetch` の場合だけ通常応答で1回再試行します。 | Passing repair image, or the saved original image with a concrete warning; downstream work continues / 合格した修正版、または具体的警告付きの保存済み元画像を採用し、後続作業を継続 |

The system distinguishes a correctable quality shortfall from a failure that leaves no usable artifact. This boundary prevents quality validation from becoming a terminal trap while keeping actual dependency failures visible.

本システムは、修正可能な品質不足と、利用可能な成果物が存在しない失敗を分けて扱います。この境界により、品質検証を行き止まりにせず、本当の依存関係エラーは隠しません。

| Condition / 状態 | Current behavior / 現行動作 |
|:--|:--|
| Scenario quality check remains NG after three attempts / シナリオ品質が全3試行後もNG | Retain the highest-scoring usable scenario, show the concrete warning, and allow STEP3/STEP4. / 利用可能な最高得点候補を保持し、具体的な警告を表示してSTEP3・STEP4を許可します。 |
| Enhancement quality remains NG after two attempts / 演出強化が全2試行後もNG | Retain the best usable enhancement; if every rewrite breaks a hard edit contract, restore the original. Continue with a warning. / 利用可能な最良候補を保持し、全候補が必須編集契約を壊した場合は元シナリオを復元します。警告付きで継続します。 |
| Explicit unsafe location or unusable scenario structure / 明示的に危険な場所、または利用不能なシナリオ構造 | Stop because a safe four-panel artifact cannot be constructed. / 安全な4コマ成果物を構築できないため停止します。 |
| Authentication, HTTP, transport, parse, or missing-image failure / 認証、HTTP、通信、解析、画像欠落 | Show the actual dependency error and stop that run, except for the one browser-stream fallback described above; do not relabel failures as a timeout or quality warning. / 上記のブラウザストリーム時の1回フォールバックを除き、実際の依存関係エラーを表示してその実行を停止し、タイムアウトや品質警告へ誤変換しません。 |
| Image received but visible QA is NG / 画像受信後の可視QAがNG | Keep the original image, generate at most one repair candidate for concrete issues, adopt it only if it passes, otherwise restore the original and continue with a warning. / 元画像を保持し、具体的な問題に限って修正版候補を最大1回生成します。合格時だけ採用し、未合格なら元画像へ戻して警告付きで継続します。 |
| Image QA is unverified / 画像QAが判定不能 | Keep the original image, show the concrete QA dependency error, make no additional image call, and continue with a warning. / 元画像を保持し、QA依存関係の具体的エラーを表示します。画像の追加生成は行わず、警告付きで継続します。 |

Scenario candidate selection is not “take the last response.” A fully valid first response is accepted immediately. Scoring is used only when the scenario retry budget ends without a complete pass, and then the best usable scenario is retained even if an earlier attempt scored higher than the last one. The image failsafe is deliberately stricter: it adopts the one repair image only on PASS; otherwise it restores the saved original.

シナリオ候補は「最後の応答を採用する」方式ではありません。初回が完全合格なら即時採用し、全試行後も未合格なら最高得点の利用可能なシナリオを保持します。画像フェイルセーフはより厳格で、修正版画像はPASS時だけ採用し、それ以外は保存済み元画像へ戻します。

### 🏗️ Unique Architecture Highlights / 固有アーキテクチャの要点

This system is not a simple "prompt-and-generate" tool. It is a **multi-stage compiler** that transforms a selected or user-supplied topic into finished manga through a series of processing layers.
本システムは単純な「プロンプト→生成」ツールではありません。選択またはユーザー入力された話題から完成漫画までを処理レイヤーの連鎖で変換する **マルチステージ・コンパイラ** です。

* **Four-stage "Storyboard-to-Screen" Pipeline**: After the provider is connected and the character sheets and topic are supplied, STEP1 character analysis → STEP2 scenario generation and optional enhancement → STEP3 prompt compilation → STEP4 image generation can run as one continuous flow. Full Auto advances those stages without requiring a click at every boundary; manual operation remains available.
  プロバイダー接続後にキャラクターシートとお題を用意すると、STEP1キャラクター解析→STEP2シナリオ生成・任意の演出強化→STEP3プロンプト構築→STEP4画像生成を一続きで実行できます。フルオートでは段階ごとのクリックを省略でき、手動操作にも切り替えられます。

* **Cross-Stage Character Identity Lock**: Character information extracted in STEP1 is carried into STEP2 and compiled into the STEP3 identity matrix and per-panel constraints used by STEP4. This reduces identity drift across the four panels without claiming that a generative image model can eliminate it completely.
  STEP1で抽出したキャラクター情報をSTEP2へ引き継ぎ、STEP3で同一性マトリクスとコマ別制約へ変換してSTEP4で使用します。生成画像モデルによる揺らぎを完全になくすと断言せず、4コマ間の同一性崩れを抑える設計です。

* **Scenario → Prompt Compiler**: An intermediate processing layer that "compiles" AI natural language scenarios into structured image prompts. Emotion tags → VFX conversion, camera names → lens distortion tag mapping, and speaker analysis → placement rule generation are all fully automated.
  AIの自然言語シナリオを構造化プロンプトに「コンパイル」する中間処理。感情タグ→VFX変換、カメラ名→レンズ歪みタグ変換、話者解析→配置ルール生成を全自動で行います。

* **Camera Diversity Mapping**: Camera candidates are shuffled and mapped to panel-specific shot and lens guidance so the four panels do not default to the same view. The final renderer can still interpret visual instructions imperfectly, so this is a prompt-level composition control rather than a pixel-level guarantee.
  カメラ候補をシャッフルし、コマごとのショットとレンズ指示へ変換することで、4コマすべてが同じ構図へ寄るのを抑えます。最終描画モデルが指示を完全に再現するとは限らないため、ピクセル単位の保証ではなくプロンプト段階の構図制御です。

* **Generic Hand / Prop Kinematics Contract**: STEP3 applies the same situation-agnostic hand and prop constraint to every scenario instead of branching on particular objects or gestures. It preserves the scripted Action, assigns subject-relative anatomical left/right sides, limits each hand to one simultaneous role/contact, keeps prop ownership separated between characters, resolves sequential actions to their final supported state, and checks palm/thumb/finger/wrist continuity. This reduces mirrored, detached, duplicated, or malformed hands but cannot guarantee perfect anatomy from a generative image model.
  STEP3では、特定の小道具名やポーズを条件分岐するのではなく、全シナリオへ同じ汎用の手・小道具運動学契約を適用します。元のAction文を変更せず、人物基準の左右、片手あたり同時に1つの役割・接触、小道具の所有者分離、連続動作の最終状態と物体の支持、掌・親指・指・手首の連続性を指定します。左右反転、切断、重複、変形した手を抑えるためのプロンプト制御であり、生成画像モデルの解剖を完全保証するものではありません。

* **Cross-Platform Prompt Compatibility (ChatGPT Image 2.0)**: When OpenAI Engine mode is enabled, the system injects formatting constraints such as A4 layout parameters and vertical-text guidance into the final prompt. These are prompt-level controls; the image model still determines the rendered result.
  OpenAIエンジンモード有効時には、A4レイアウト指定や縦書きテキスト誘導などのフォーマットを最終プロンプトに注入します。これはプロンプト段階の制御であり、最終的な描画結果は画像モデルの解釈に依存します。

### 🏆 The Dual-API Architecture / 「デュアルAPI設計」

This system uses a dual-provider architecture. At startup, the user selects **Gemini Engine** or **OpenAI Engine**. Shared workflow rules remain consistent, while provider-specific request formats, model routes, prompt families, and image-response handling are applied where the APIs differ.
本システムはデュアルプロバイダー構成です。起動時に **「Gemini Engine」** または **「OpenAI Engine」** を選択します。共通のワークフロー規則を保ちつつ、APIごとに異なるリクエスト形式、モデル経路、プロンプト系統、画像応答処理を分けています。

1. **Gemini Engine Mode (Google Ecosystem) / Geminiエンジンモード**
   * **Full Native Integration / 完全ネイティブ統合:** Uses Google's Gemini models for both the "Brain" (Scenario/Prompt generation) and the "Artist" (Nano Banana 2 image generation).
   * **Grounding behavior / Groundingの動作:** Scenario calls attempt Google Search Grounding when the request is compatible; an error falls back to the same model without the tool. Image generation remains a separate Gemini image route.
   * **Role / 役割:** シナリオ生成・プロンプト構築・画像生成をGoogle系のモデル経路で実行するモードです。シナリオ生成時は互換条件を満たす場合にSearch Groundingを試み、失敗時はツールなしで同一モデルへフォールバックします。画像生成は別のGemini画像経路です。

2. **OpenAI Engine Mode (OpenAI Ecosystem) / OpenAIエンジンモード**
   * **Pure OpenAI Pipeline / 純粋なOpenAIパイプライン:** Uses advanced text models (like GPT-4.1) as the "Brain" to parse complex character topologies and structure the 4-panel layout, and seamlessly hands off to OpenAI's image models (ChatGPT Image 2.0) for the final "Artist" rendering step.
   * **Strength / 強み:** Provides industry-leading artistic quality and nuance directly in-browser. The prompt is automatically translated into OpenAI-specific formatting (A4 portrait, vertical Japanese text, Anti-Noise Protocol) before being sent.
   * **Role / 役割:** 解析・構成はOpenAIテキスト/画像認識モデル、画像生成は `gpt-image-2` を使うモードです。専用フォーマット（縦長A4・縦書き誘導・ノイズ抑制キーワード）を適用し、生成時間は混雑状況やリクエスト内容により変動します。

3. **【上級者向け】Browser UI Option (Advanced / Optional) / ブラウザUI連携運用**
   * Users who prefer a subscription Web UI, want to attach reference images manually, or want to avoid a direct image-API call can use the Browser UI Option.
   * **How it works / 仕組み:** Click "Copy Prompt" after STEP3, then paste the exact current prompt into the official **ChatGPT or Gemini Web UI** with the character-sheet images. The provider-specific format is designed to preserve the same scenario and layout constraints, although the Web model still controls the final rendering.
   * サブスクリプション版Web UIを使いたい場合、参照画像を手動添付したい場合、画像APIの直接呼び出しを避けたい場合に利用できます。STEP3のプロンプトをコピーし、キャラクターシート画像と一緒に公式ChatGPT/Geminiへ貼り付けます。シナリオとレイアウト制約は同じ系統の形式で渡しますが、最終的な描画結果はWeb側モデルの解釈に依存します。
   * When ChatGPT Image 2.0 breaks the 4-panel layout or ignores aspect ratios, the built-in `[ABSOLUTE OVERRIDE]` repair prompt adds stricter A4 constraints; the Web model still determines the final pixels. / Web版のChatGPTが4コマレイアウトを崩した場合、組み込みの `[ABSOLUTE OVERRIDE]` 修正プロンプトでA4制約を強めます。最終的なピクセルはWeb側モデルが決定します。

### 📖 The Philosophy of the 1-Page (4-Koma) Limit / なぜ「1ページ（4コマ）制」にこだわるのか？

While many users desire the ability to generate long, multi-page comic books, Super FURU AI 4-koma System intentionally restricts generation to a single 1-page (4-panel) format. This is not a technical limitation of the code, but a strategic decision based on the current boundaries of Generative AI:
多くのユーザーは複数ページの長編漫画を全自動生成することを望みますが、Super FURU AI 4-koma System は意図的に「1ページ（4コマ）完結」のフォーマットに制限しています。これは実装上の妥協ではなく、現在の生成AIの限界を見据えた戦略的な選択です。

1. **Content Dilution & Identity Drift (内容の希薄化とキャラクター崩壊):** The fundamental rule of current AI generation is that as page count increases, both story density and visual consistency decrease inversely. Stretching a prompt across multiple pages causes the AI to lose focus, resulting in hollow plotlines, repetitive dialogue, and inevitable visual distortions (costume changes, facial drift) without LoRA fine-tuning. This is precisely why typical multi-page AI comics often feature extremely limited casts (1 to 3 characters) engaged in simple, repetitive actions like "battling"—the creators must strip away complexity just to keep the AI from breaking down. A dense, high-impact 4-panel format is the absolute "sweet spot" for maximizing both narrative punch and zero-shot visual consistency. / 現在のAI生成における絶対的な法則として、「ページ数に反比例して、キャラクターのビジュアルだけでなく、話の構成や内容そのものも薄くなってしまう」という問題があります。複数ページにまたがってプロンプトを引き伸ばすと、AIのコンテキストが散漫になり、中身のないストーリーや同じセリフの反復、そして追加学習（LoRA）なしでは避けられないビジュアルの崩壊（Identity Drift）を引き起こします。**世にある複数ページのAI漫画が「登場人物が1〜3人程度で、ひたすらバトルしているだけの展開」になりがちなのは、まさにこれが原因です。** AIの破綻を防いでページ数を稼ぐために、複雑な掛け合いや緻密なストーリー構成を犠牲にせざるを得ないのです。物語の「オチ」の鋭さと、ゼロショットでの完璧な一貫性を両立できる限界のスイートスポットこそが、この「4コマ」という高密度なフォーマットなのです。
2. **API Cost & Generation Time Optimization (APIコスト・生成時間の最適化):** Each image generation call to the AI API incurs cost and takes 2–4 minutes. A 1-page (4-panel) output provides the optimal balance between narrative density and generation efficiency, making it perfectly "snackable" for rapid creation and social media sharing. / AI APIへの画像生成リクエストにはコストと2〜4分の待ち時間が伴います。1ページ（4コマ）完結は、物語の密度と生成効率の最適なバランスを提供し、SNSでサクッとシェアでき、ユーザーがストレスなく生成を楽しめるサイズ感として機能します。

### 📖 The Philosophy of the Embedded Character Sheet / なぜ「設定テキスト入りのキャラクターシート画像」を使うのか？

In the typical AI workflow, creators upload a clean image of a character and provide a separate, lengthy text prompt detailing their traits. This system fundamentally rejects that approach. Instead, we require the character's setting text to be visually written *inside* the reference image itself (creating a "One-Sheet Context"). This yields three massive advantages:
一般的なAI漫画の運用では、「キャラクターの画像ファイル」と「設定を書いた長文テキスト」を別々に入力するのが普通です。しかし、本システムはこの手法を根本から否定し、**「キャラクター設定のテキストは、画像の中に直接文字として書き込む（One-Sheet Context）」**という運用を推奨しています。これには3つの絶大なメリットがあります：

1. **Multimodal Binding (視覚と概念の強固なロック):** When image and text are provided separately, models like ChatGPT Image 2.0 often suffer from "attention split"—they either prioritize the text and ignore the face, or prioritize the face and forget the text. By embedding the text physically into the image, the Vision AI processes them as a single, unified entity. "This visual face" mathematically equals "these written traits," drastically reducing identity drift. / 画像とテキストを別々に入れると、AIは「どちらを優先すべきか」で迷い、文字設定を忘れたり画像を無視したりします。文字を画像内に埋め込むことで、Vision AIは「この姿＝この文字情報」として完全に同一の概念としてロックし、キャラクターのブレ（Identity Drift）を劇的に低下させます。
2. **Prompt Override Prevention (プロンプト競合の回避):** If you consume text tokens to describe the character's hair, eyes, and clothes, you steal precious attention away from the complex 4-panel layout constraints and scenario instructions. By offloading character traits into the image space, 100% of the text prompt tokens can be purely dedicated to "directing the manga." / テキスト側で「金髪で青目で…」と長々とキャラ設定を書くと、肝心の「漫画のコマ割りや演出」を指示するプロンプトの枠（トークンとAttention）を圧迫してしまいます。設定情報を画像（Vision側）に逃がすことで、テキストプロンプトのリソースを100%「漫画の演出」に全振りできるのです。
3. **Frictionless Workflow (コピペ作業の排除):** For the human-in-the-loop, uploading one image is vastly superior to maintaining and pasting giant blocks of character lore alongside the layout prompts every single time. / 人間側の運用コストとして、毎回「画像」と「長文設定」の2つをコピペするのは苦痛です。文字入りのシートを1枚投げるだけで、AIが勝手に文字を読んで理解してくれる究極にスマートな運用が可能になります。

### 🎭 Comedy Structure Engineering / なぜAIに「面白くして」と言っても面白くならないのか？

Most AI-generated manga suffers from a fundamental problem: telling the AI to "make it funny" produces bland, predictable content. This is not only a model-capability issue; prompt and validation design also affect the result. Super FURU AI 4-koma System addresses this by embedding a structured comedy methodology into its scenario-generation engine.
AIに「面白くして」と指示しても、退屈で予測可能なコンテンツしか出てきません。これはAIの能力の問題ではなく、**プロンプト設計の破綻**です。本システムは、構造化されたお笑いメソッドをシナリオ生成エンジンに直接組み込むことでこの問題を解決しています。

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
const PUNCHLINE_TYPES = [ /* 10 types */ ];
const selectedPunchline = PUNCHLINE_TYPES[Math.floor(Math.random() * PUNCHLINE_TYPES.length)];
// → scenarioPrompt内で "${selectedPunchline}" として注入される
```

The 10 punchline archetypes (all character-agnostic, selectable from UI + used by Auto mode):

10種類のオチアーキタイプ（全てキャラ非依存、UIから手動選択可能＋Auto時にAIが自律選択）：

| Type / タイプ | Description / 概要 |
|:--|:--|
| 爆発型 (Explosion) | 叫び・暴走・カオスで画面が爆発する |
| 静寂型 (Surreal) | 無言や低温のリアクションでシュールに締める |
| 感動詐欺 (FakeEmotion) | 狂った状況のまま感動的なイイハナシダナーで終わる |
| メタフィクション (Metafiction) | キャラが4コマの外側やフィクション性に気づく |
| 理不尽な制裁型 (Unreasonable) | まともなキャラが突然理不尽な制裁を受けて終わる |
| 天丼 (RunningGag) | 同じボケを変奏し、4コマ目で最終形へ進める |
| 夢オチ型 (Dream) | 全てが夢だったと判明し、現実との落差で笑わせる |
| 盛大な勘違い型 (Misunderstanding) | 壮大な勘違いが判明し、全てが台無しになる |
| 打ち切りエンド型 (CanceledEnding) | 唐突に「俺たちの戦いはこれからだ」で強制終了 |
| ドキュメンタリー (Documentary) | 原文の中心事実を保ち、オチだけを漫画的に構成する |

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

The combined effect of all three mechanisms realizes a principle analogous to theater casting: **"The actors remain the same; the genre of the script changes every time, and no single actor hogs the curtain call."** The persona defines *how* a character speaks and reacts, the punchline type defines *what situation* they are placed in, and the distribution protocol ensures *who* gets the spotlight rotates fairly. When these three layers are decoupled, the same cast produces entirely different chemical reactions across generations — without ever breaking character.
3つのメカニズムの複合効果は、演劇のキャスティングに似た原則を実現します： **「役者は同じ、脚本のジャンルが毎回変わり、カーテンコールを独占する役者はいない」** 。ペルソナはキャラクターの「喋り方・反応の味」を規定し、オチタイプは「どんなシチュエーションに置かれるか」を規定し、分散プロトコルは「誰がスポットライトを浴びるか」を公平にローテーションします。この3層が分離されると、同じキャストでも生成のたびに全く異なる化学反応が生まれ——キャラクターの個性を壊すことなく、無限のバリエーションが得られます。

---

**Layer 5 — Narrative Depth & Cliché Prevention Engine (v2.99+) / 第5層 — 物語の深度とテンプレ防止エンジン:**

Even with perfect structure and punchline distribution, AI tends to write safe, passive, and cliché dialogue. To force professional-grade comedic storytelling, the system implements three strict narrative constraints:

完璧な構造とオチの分散があっても、AIは無難で受け身な「よくあるセリフ」を書きがちです。プロレベルのコメディシナリオを強制するため、本システムは3つの厳格な物語制約を実装しています：

1. **GMC Gag Structure (GMCギャグ設計)**: Transitioned from "passive situational setups" to the **Goal, Motivation, Conflict (GMC)** framework. Characters are forced to have a strong, active desire (Goal/Motivation) in Panel 1, which immediately crashes into an absurd, irrational obstacle (Conflict) in Panel 2. The collision of strong desires against impossible walls generates a much more powerful comedic payoff. / 「受け身な状況設定」を廃止し、 **GMC（Goal, Motivation, Conflict）メソッド** を導入。1コマ目でキャラクターに「強烈で能動的な欲求」を持たせ、2コマ目で「理不尽な障害」に衝突させます。強い欲求と絶対的な壁の衝突が、オチの爆発力を飛躍的に高めます。
2. **Guard C Implementation (Guard Cの導入)**: A strict negative-prompt filter targeting AI-specific linguistic clichés. It completely bans lazy explanatory dialogue, weak generic reactions (e.g., "yare yare"), and the ultimate comedy killer: boring narrative summary panels (e.g., "It was a lively day"). / AI特有の言語的テンプレを狙い撃ちにする厳格なネガティブプロンプト。状況説明のセリフ、汎用的な弱いリアクション（「やれやれ」「はぁ…」等）、そしてコメディの最大の敵である「まとめのナレーション（今日も賑やかな一日だった、等）」を完全に禁止します。
3. **Show, Don't Tell - Gag Action (物理的ギャグアクションの強制)**: Emotions must not be explained; they must be visually demonstrated. The AI is strictly forbidden from using internal monologues to state "I'm surprised" or "I'm angry." Instead, it is forced to translate emotions into comedic physical actions (e.g., "hair standing on end", "doing a spit-take"). / 感情を言葉で説明してはならず、視覚的に証明しなければなりません。「驚いた」「怒った」とモノローグで語ることを固く禁じ、代わりにマンガ的な物理アクション（「髪の毛が逆立つ」「コーヒーを噴き出す」等）へ変換することを強制します。

---

**Layer 6 — Advanced Narrative Integration (v3.00+) / 第6層 — 高度な物語メソッドの統合:**

To further elevate the 4-panel format to professional storytelling standards, the system integrates advanced narrative techniques developed across our AI Creative Suite ecosystem:

4コマ漫画をプロレベルの物語水準へと引き上げるため、AIクリエイティブスイート全体で培った高度な物語技法を統合しています：

1. **Logline Anchoring (ログライン・アンカリング)**: The AI is forced to establish a single, clear logline before generating the panels. This acts as a structural anchor, ensuring that the setup (Panel 1) and the punchline (Panel 4) remain tightly connected, preventing the story from drifting or losing its core comedic premise. / シナリオ生成前に、必ず「ログライン（1行の物語の核）」を明文化させます。これが構造的な「錨（アンカー）」として機能し、1コマ目（フリ）と4コマ目（オチ）が強固に結びつき、物語がブレたり面白さの軸が失われるのを防ぎます。
2. **Subtext-Enforced Dialogue (サブテキスト制約)**: Characters are forbidden from simply stating what is happening. The AI is trained to create a "gap" between what a character says (the facade) and what is actually occurring or what they truly feel (the reality). This irony generates natural, character-driven humor without relying on slapstick. / キャラクターが「見たまま」を説明することを禁止。言葉（建前）と実際の行動・感情（本音）の間に「ズレ（サブテキスト）」を生み出させます。このアイロニーにより、単なるドタバタではない、キャラクターの内面に基づいた自然な笑いを生み出します。
3. **Stakes & Escalation (代償とインフレーション)**: Every conflict must have real "Stakes" (what the character loses if they fail). By raising the stakes in Panel 3, the final resolution or punchline in Panel 4 becomes significantly more impactful, transforming a mild joke into a dramatic climax. / すべての対立には「代償（失敗したらどうなるか）」が設定されます。3コマ目で代償（ピンチ）を吊り上げることで、4コマ目の解決（または爆発）のインパクトが飛躍的に高まり、単なる「ちょっとした冗談」が「ドラマチックなオチ」へと変貌します。
4. **Guard S — Sensory Balance Enforcement (五感バランスの強制)**: Stage directions (ト書き) are prohibited from relying solely on visual descriptions. Each panel must include at least one non-visual sensory element — auditory (footsteps, creaking doors), tactile (cold wind, sweat), olfactory (food aromas, damp air), or interoceptive (stomach tightening, chills). Across all 4 panels, a minimum of 2 distinct sensory types must be used. This transforms static pose-collections into living, breathing scenes that the image generation AI can interpret as atmospheric compositions rather than flat character arrangements. / ト書き（状況・アクション描写）が視覚情報のみに偏ることを禁止。各コマに聴覚（足音、軋む音）、触覚（風の冷たさ、汗）、嗅覚（料理の匂い、湿った空気）、体内感覚（胃が締まる、背筋が凍る）のいずれかを最低1つ含めることを義務化。4コマ全体では最低2種類の感覚を使用。これにより画像生成AIが「空気感」を拾い、単なるポーズ集から「生きた場面」へと進化します。
5. **Guard M — Metaphor Quality Gate (比喩クリシェ排除)**: A strict negative filter that bans overused AI-default metaphors (e.g., "time stood still", "heart leaped out", "heavy as lead", "struck by lightning") from both stage directions and dialogue. Instead, the AI is forced to construct metaphors from materials native to the panel's setting (Location) — for example, ramen shop → "silence stretched like overcooked noodles"; courtroom → "words as cold as a verdict". Metaphor usage is capped at 2 per scenario to prevent dilution of visual information density. / ト書き・セリフの両方において、AI特有の使い古された定型比喩（「時間が止まった」「心臓が飛び出しそう」「鉛のように重い」「雷に打たれたような」等）を完全禁止するネガティブフィルター。代わりに、そのコマの舞台（Location）に由来する素材から比喩を構築することを強制します（例：ラーメン屋→「麺のように伸びきった沈黙」、法廷→「判決文のように冷たく響く」）。比喩は1シナリオ最大2つに制限し、情報密度の低下を防止。
6. **Knowledge Boundary Lock (キャラクター知識境界の遵守)**: Before writing each character's dialogue, the AI must verify what that character actually knows versus what they don't. Characters with "otaku" personality settings are prohibited from suddenly demonstrating political expertise; "airhead" characters cannot deliver logical analysis — unless the gap is intentionally used as a reversal gag. Cross-panel information leaks are also blocked: a character who was absent from a scene cannot react to events they didn't witness (unless hearsay is explicitly described). This prevents the common AI failure mode of homogenizing all characters into omniscient, interchangeable speakers. / 各キャラのセリフを書く前に、そのキャラが「何を知っていて、何を知らないか」の確認を義務化。「オタク」設定のキャラが政治を語ったり、「天然」キャラが論理分析したりするのは、逆転ギャグでない限り禁止。コマ間の情報漏洩も遮断：ある場面にいなかったキャラが、見ていない出来事に反応するのは禁止（伝聞の描写がない限り）。AIが全キャラを「何でも知っている同質的な話者」に均質化するハルシネーションを防止します。

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

本システムの設計思想や過去のプロトコル名、法的・哲学的な考察を含む詳細な解析レポート（日本語版）です。実装・利用条件の最新情報は、このREADMEと各プロバイダーの公式情報を優先してください。

* 📄 [詳細ドキュメントを表示する](https://docs.google.com/document/d/1Uk24cAmH2CgYwC1y8_YPW6tp2-sD4OgDRWE8FTH4nTs/edit?usp=sharing)

### 🇺🇸 [EN] Comprehensive Analysis of Autonomous AI Manga System

A detailed analysis report (English version) covering the system's design philosophy, historical protocol names, and legal/philosophical considerations. For current implementation and service terms, use this README and the providers' official information.

* 📄 [View Detailed Document](https://docs.google.com/document/d/1hOZeV13icbv6R7RLryD2iYpli9n5ujwatC9mi5IYJN8/edit?usp=sharing)

---

## 🛠 Featured Protocols: Super FURU Manga Protocol / 搭載プロトコル

1. **ABSOLUTE PHYSICAL GEOMETRY LOCK & MARGIN CONTROL**
Adds four-panel layout, aspect-ratio, perspective, and white-gutter constraints to the image prompt. These controls guide the renderer; they do not provide pixel-level control or guarantee the final layout.
4コマのレイアウト、アスペクト比、パース、白いガターの制約を画像プロンプトへ加えます。これは描画モデルへの指示であり、ピクセル単位の制御や最終レイアウトの保証ではありません。

2. **ANTIGRAVITY HYPER-DYNAMIC CAMERA PROTOCOL (v4.0)**
Camera names from the scenario stage are mapped to per-panel camera guidance, with a shuffled fallback set to vary the supplied directions. The renderer may still interpret those directions imperfectly.
シナリオ段階のカメラ名をコマ別のカメラ指示へ変換し、シャッフルしたフォールバック候補で指示に変化を付けます。最終描画モデルがその指示を完全に再現するとは限りません。

3. **IDENTITY MATRIX - Character Consistency Guidance (v2.25)**
Character-sheet clues such as hair color, hairstyle, and glasses status are incorporated into panel prompts with character and placement constraints. These instructions reduce consistency drift, but image models can still make mistakes.
キャラクターシートの髪色・髪型・メガネ有無などの手掛かりを、人物・配置の制約としてコマ別プロンプトに反映します。整合性の崩れを抑えるための指示であり、画像モデルの誤りを完全には防げません。

4. **Emotion Style Tag System - Per-Panel Art Style Switching (23 Styles)**
   The scenario AI autonomously selects the optimal style tag for each panel's emotion from a palette of **23 distinct visual styles**. Core styles include CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT / WATERCOLOR / RETRO / GLITTER / SHADOW / SPEED / FLASHBACK / UKIYOE / POP_ART / SKETCH / NEON, plus context-aware styles added in v2.95: THICK_PAINT (impasto for serious/political), PASTEL (soft for heartwarming), CEL (retro cel animation), DARK_ANIME (atmospheric for suspense), THIN_LINE (delicate for emotional), and HIGH_SATURATION (vivid for excitement). Art style, VFX, and proportions are automatically switched during image generation. Includes fallback styles for multi-character panels.
   シナリオ生成AIが各コマの感情に最適なスタイルタグを**全23種の画風パレット**から自律選択。CHIBI_GAG / GEKIGA / SHOUJO / HORROR / BLANK / IMPACT / WATERCOLOR / RETRO / GLITTER / SHADOW / SPEED / FLASHBACK / UKIYOE / POP_ART / SKETCH / NEONに加え、v2.95で文脈対応型の新画風を追加：THICK_PAINT（厚塗り／政治・シリアス向け）、PASTEL（パステル／癒し向け）、CEL（セル画風／エンタメ向け）、DARK_ANIME（ダーク調／サスペンス向け）、THIN_LINE（繊細線画／感動向け）、HIGH_SATURATION（高彩度／興奮向け）。画像生成時に絵柄・VFX・プロポーションが自動切替されます。マルチキャラパネル用のフォールバックスタイルも搭載。

5. **Anti-Camouflage & Anti-Glitter Prompt Guidance (v3.16+)**
   Adds prompt guidance to reduce character-background blending and unnecessary decorative noise. It does not guarantee that the image model will avoid every artifact.
   キャラクターと背景の溶け込み、不要な装飾ノイズを抑えるプロンプト指示を加えます。画像モデルがすべてのアーティファクトを回避する保証ではありません。

6. **Prompt Budget and Lighting Guidance**
   The provider-specific prompt keeps the required script, character, layout, background, and lighting guidance within the supported request budget. Lighting and shadow instructions guide the renderer but do not guarantee a particular visual quality.
   プロバイダー別プロンプトでは、必要な脚本・キャラクター・レイアウト・背景・照明の指示を対応するリクエスト予算内に収めます。照明と影の指示は描画を誘導するものであり、特定の画質を保証しません。

---

## 💻 Tech Stack / 技術スタック

* **Frontend**: React 19 / Vite 7 / Tailwind CSS v4
* **AI Routes**: Google Gemini API (text/scenario and Gemini native image routes) and OpenAI API (`gpt-4.1` text/vision, `gpt-image-2` image), selected in the app.
* **Logic**: Provider-specific fallback and retry handling for supported errors; available models and provider responses determine the actual route.

---

## 📝 Setup & Launch / セットアップと起動

### ☁️ Cloud / Browser (Deploy)

1. **Get a provider API key**: Select a route in the startup modal, then obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/) or an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys). Never include a key in issue reports or documentation.
   起動モーダルで経路を選び、[Google AI Studio](https://aistudio.google.com/) または [OpenAI Platform](https://platform.openai.com/api-keys) から対応するAPIキーを取得してください。APIキーをIssueや文書へ記載しないでください。

> [!WARNING]
> **API Billing Is Separate / API課金は別管理です**
> API usage, limits, and billing are governed by the selected provider's API account and current terms. A chat-product subscription does not automatically configure or include API usage; check the provider's API usage and pricing pages before generating.
> APIの利用量・上限・課金は、選択したプロバイダーのAPIアカウントおよび最新の利用条件に従います。チャット製品のサブスクリプションだけでAPI利用が自動設定・付帯されるわけではありません。生成前に各プロバイダーのAPI利用状況・料金ページを確認してください。
>
> **💡 Recommendation for Subscribers / サブスク加入者への推奨:**
> The **「Browser UI Option」** (described in the [Dual-API Architecture](#-the-dual-api-architecture--デュアルapi設計) section) copies a prompt for manual use in a provider's browser UI. Availability, model choice, usage limits, and any charges are determined by that service and plan; this app does not promise that it is free.
> **「ブラウザUI運用」**（[デュアルAPI設計](#-the-dual-api-architecture--デュアルapi設計) セクション参照）は、プロンプトをプロバイダーのブラウザUIへ手動利用するためにコピーします。利用可否・モデル選択・上限・料金はそのサービスとプランに依存し、本アプリが無料利用を保証するものではありません。

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

## ⚖️ Compliance & Legal Stance / 法的遵守について

### Japanese Copyright Law (Article 30-4)

This README is not legal advice and does not determine whether a particular input, output, or use is lawful. Review the applicable copyright law and obtain professional advice where needed.
本READMEは法的助言ではなく、特定の入力・出力・利用が適法かどうかを判断するものではありません。適用法令を確認し、必要に応じて専門家へ相談してください。

### Official API Usage

The app can call the selected official Google Gemini or OpenAI API route. Users are responsible for complying with the applicable provider terms, usage policies, and local law.
本アプリは、選択されたGoogle GeminiまたはOpenAIの公式API経路を呼び出します。利用者は、適用されるプロバイダー規約・利用ポリシー・法令を確認し、遵守する責任があります。

### Assisted Scenario-to-Image Generation

The app assembles a scenario and image prompt from the selected input, provider, and optional references. Prompt constraints guide composition, but the output is probabilistic and must be reviewed before use.
本アプリは、選択した入力・プロバイダー・任意の参照情報からシナリオと画像プロンプトを組み立てます。構図の制約は描画を誘導するもので、出力は確率的です。利用前に必ず内容を確認してください。

### No-Profit & Research Focus

The project is intended as a creative-assistance tool. This statement does not replace a repository license, provider terms, or local law.
本プロジェクトは創作支援ツールを目的としています。この説明は、リポジトリのライセンス、プロバイダー規約、または適用法令に代わるものではありません。

---

## ⚖️ License & Rights / ライセンス・権利関係

This project separates program code, original non-code creative content, brand use, generated outputs, and third-party software. FURU's original program source code is provided under the [MIT License](./LICENSE). Only the original non-code material explicitly identified in [LICENSE-CONTENT.md](./LICENSE-CONTENT.md) is released under CC BY-NC-SA 4.0. Brand use is governed by [TRADEMARKS.md](./TRADEMARKS.md), generated outputs by [OUTPUTS.md](./OUTPUTS.md), and direct dependency notices by [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

本プロジェクトでは、プログラムコード、独自の非コード創作コンテンツ、名称利用、生成物、第三者ソフトウェアを分離して扱います。FURU が権利を有するプログラム・ソースコードは [MIT License](./LICENSE) で提供します。CC BY-NC-SA 4.0 の対象は、[LICENSE-CONTENT.md](./LICENSE-CONTENT.md) で明示した独自の非コード創作物に限られます。名称利用は [TRADEMARKS.md](./TRADEMARKS.md)、生成物の扱いは [OUTPUTS.md](./OUTPUTS.md)、直接依存関係の通知は [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) を参照してください。

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

#### 1. Super FURU AI 4-koma System
A system specialized in creating 4-panel manga with AI. / AIを活用した4コマ漫画制作に特化したシステムです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndf063558c1f5)
- [Demo / デモ](https://furuyan1234.github.io/nano-banana-pro/)
- [Code / コード](https://github.com/FURUYAN1234/nano-banana-pro)

#### 2. AI Story Maker
A tool for generating creative stories and plots using AI. / AIを用いてクリエイティブなストーリーやプロットを生成するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nd3d972922868)
- [Demo / デモ](https://furuyan1234.github.io/story-maker/)
- [Code / コード](https://github.com/FURUYAN1234/story-maker)

#### 3. AI Character Sheet Maker
An assistant for designing detailed character sheets and settings. / 詳細なキャラクターシートや設定をデザインするための支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/neccbebd7d957)
- [Demo / デモ](https://furuyan1234.github.io/character-sheet-maker/)
- [Code / コード](https://github.com/FURUYAN1234/character-sheet-maker)

#### 4. AI Comic Translation Tool
A tool for translating manga into 10 languages using AI. / AIを使って漫画を10言語に翻訳するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ne462dfc55ec8)
- [Demo / デモ](https://furuyan1234.github.io/comic-translation/)
- [Code / コード](https://github.com/FURUYAN1234/comic-translation)

#### 5. 360° AI Panorama Generator
A tool that generates seamless 360-degree spatial backgrounds to provide background assets for manga and video. / シームレスな360度空間の背景を生成し、漫画や動画の背景素材として提供するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/nb53b121fef88)
- [Demo / デモ](https://furuyan1234.github.io/panoforge/)
- [Code / コード](https://github.com/FURUYAN1234/panoforge)

#### 6. AI Voice Comic Maker
A tool to automatically convert static 4-koma manga into fully voiced animated videos. / 静止画の4コマ漫画をフルボイスの動画に自動変換するツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ndc6533c1512f)
- [Code / コード](https://github.com/FURUYAN1234/ai-voice-comic-maker)

#### 7. Monogatari Buzz Maker / 物語バズメーカー
A trend-to-story planning tool that converts public Web/RSS signals into practical manga, short video, explainer video, and novel briefs. / 公開Web/RSSの話題シグナルを、漫画・ショート動画・解説動画・小説の実用企画へ変換する創作支援ツールです。
- [Explanation / 解説](https://note.com/happy_duck780/n/ncc593101d77f)
- [Demo / デモ](https://furuyan1234.github.io/viral-radar/)
- [Code / コード](https://github.com/FURUYAN1234/viral-radar)

---

> **Local API Proxy / ローカルAPIプロキシ**
> ローカル開発環境（`localhost`）では、ブラウザの`Origin`ヘッダーによりGoogle API側がAPIキーの使用を拒否する場合があります。この問題を回避するため、`vite.config.js` に `/gemini-api` パスへのリバースプロキシが設定されています。ローカル起動時、API通信はこのプロキシを経由して透過的にGoogle APIへ転送されます。本番ビルド（GitHub Pages等）では直接Google APIにアクセスするため、プロキシは使用されません。
> In local development (`localhost`), browsers may reject API key usage due to the `Origin` header. A reverse proxy is configured in `vite.config.js` at the `/gemini-api` path to transparently route API calls through the Vite dev server. This proxy is only active during local development and is not used in production builds.

---

## 📋 ChangeLog

### v5.6.2 (2026-08-26)
- **[Fix & UX]** 2026-08-26のカスタムノードZIPとHybrid b25ワークフローを別々のダウンロードボタンへ更新し、旧版差し替え、ワークフロー配置、両Providerの導入案内を同期 / Updated separate download buttons with the 2026-08-26 custom-node ZIP and Hybrid b25 workflow, plus replacement, workflow-location, and dual-provider setup guidance

### v5.6.1 (2026-08-24)
- **[Fix & UX]** MiniMax H3の配布ワークフローへ5件すべてのモデルURL・SHA256・保存先を登録し、日英併記のFURU 4コマ動画化説明と不足モデルDownload案内を追加 / Registered URLs, SHA256 values, and target folders for all five MiniMax H3 models and added bilingual FURU four-panel manga-to-video guidance with missing-model download instructions

### v5.6.0 (2026-08-23)
- **[Fix & UX]** MiniMax H3配布をTurbo v4 LoRA・8 steps版へ更新し、標準テンプレート用コピー文、共通カスタムノード、タイトル後段合成、API案内を同期 / Updated the MiniMax H3 distribution to Turbo v4 LoRA with 8 steps and synchronized the standard-template copy prompt, shared custom node, downstream title compositing, and API guidance

### v5.5.9 (2026-08-23)
- **[Fix & UX]** MiniMax H3の最初の説明と、手動・全部お任せの選択導線を追加 / Added an introductory MiniMax H3 explanation and clear manual versus all-in-one workflow choices

### v5.5.8 (2026-08-23)
- **[Fix & UX]** 更新済みの標準20ステップ版ワークフローJSONとComfyUI-NanoBanana-H3カスタムノードZIPを配布内容へ同期 / Synced the distributed standard 20-step workflow JSON and ComfyUI-NanoBanana-H3 custom-node ZIP with the updated supplied artifacts

### v5.5.7 (2026-08-23)
- **[Fix & Docs]** 配布ワークフローを26ノード・30リンクの添付標準版へ同期し、手動 `normal` と配布専用 `simple`・20ステップを分離。APIキーの対応先、ローカル非暗号化保存、カスタムノード読込の追加原因を明記 / Synced the distributed workflow to the supplied 26-node, 30-link standard version; separated manual `normal` from dedicated-distribution `simple` / 20 steps; clarified supported API-key providers, unencrypted local storage, and additional custom-node loading causes

### v5.5.6 (2026-08-21)
- **[Fix & UX]** 標準20ステップ版ワークフローJSON、必須ComfyUI-NanoBanana-H3 ZIP、導入順の直接ダウンロード案内を追加 / Added the standard 20-step workflow JSON, required ComfyUI-NanoBanana-H3 ZIP, and ordered direct-download setup guidance

### v5.5.5 (2026-08-21)
- **[Fix & UX]** 身体演技・カメラ多様化と一枚絵品質修正を追加 / Added body-acting and camera variety plus single-image quality-path repair

### v5.5.4 (2026-08-20)
- **[Fix & UX]** 公開Pages上のComfyUIワークフローJSONダウンロードを同一配布先へ修正 / Fixed the public Pages ComfyUI workflow JSON download to use the same distribution origin

### v5.5.3 (2026-08-20)
- **[Fix & UX]** ComfyUIワークフローJSONの配布と標準コピーボタンとの使い分けを追加 / Added ComfyUI workflow JSON distribution and separate guidance from the standard copy action

### v5.5.2 (2026-08-19)
- **[Fix & UX]** STEP4のMiniMax H3案内に、最初に選ぶべき `MiniMax H3 Reference-to-Video（R2V / Ref2VA）` ワークフローを独立した手順と設定項目として追加 / Added an explicit MiniMax H3 Reference-to-Video (R2V / Ref2VA) workflow-selection step and setting to the STEP4 guide

### v5.5.1 (2026-08-19)
- **[Fix & UX]** MiniMax H3の会話音声・話者口パク固定・字幕なし・BGMなしを維持しながら、全員の役割別演技、カットごとの人物反応、寄り引き・横移動・縦移動・回り込みを使い分けるカメラ軌道を復元 / Restored role-appropriate acting for every visible character and varied push-pull, lateral, vertical, and orbiting camera paths while retaining dialogue-first audio, speaker-bound lip sync, no subtitles, and no default BGM

### v5.5.0 (2026-08-18)
- **[Fix & UX]** MiniMax H3のコピー文を会話音声優先・字幕なし・BGMなし・話者口パク固定へ更新し、参照画像は `ref_image_0` のみ、`Resolution Selector (Size)`・`Float (Duration)`・`基本スケジューラー` の設定欄までSTEP4とREADMEで案内 / Updated the MiniMax H3 helper to prioritize voiced dialogue with no subtitles or default BGM, lock speaker mouth movement, and document the exact `ref_image_0`, resolution, duration, and scheduler settings in STEP4 and README

### v5.4.9 (2026-08-18)
- **[Fix & UX]** OpenAIとGeminiの旧二重状態を単一の実効エンジンへ収束させ、OpenAI信号が片方だけ残ってもSTEP1からSTEP4をOpenAIへ同期 / Consolidated legacy OpenAI and Gemini flags into one effective engine so an OpenAI signal from either state synchronizes STEP1 through STEP4 to OpenAI

### v5.4.8 (2026-08-18)
- **[Fix & UX]** STEP4のプロ向け補助操作を常時表示に復旧し、OpenAI画像生成状態を基準にSTEP4の表示・リンク・記録を統一 / Restored always-visible STEP4 pro helper actions and aligned STEP4 labels, links, and metadata with the effective OpenAI image-generation state

### v5.4.7 (2026-08-18)
- **[Fix & UX]** 同一行の複数話者台詞を話者別に分離し、引用外のト書きが吹き出しに入らないよう修正 / Split inline multi-speaker dialogue by speaker and prevent quoted-text-external stage directions from entering bubbles

### v5.4.6 (2026-08-18)
- **[Fix & UX]** MiniMax H3の単一ComfyUIコピー文で、背景人物・群衆を含む画面内の全キャラクターに、役割別で自然かつ物理的に一貫した動作を必須化 / Required role-appropriate, physically coherent motion for every visible character, including background and crowd performers, in the single MiniMax H3 ComfyUI copy prompt

### v5.4.5 (2026-08-18)
- **[Fix & UX]** MiniMax H3の単一ComfyUIコピー文へ、原文台詞を発話中だけ画面下中央へ表示する字幕、字幕用コントラスト、タイトル・終端表示との非重複領域を追加 / Added exact source-dialogue captions, caption contrast, and title-credit non-overlap rules to the single MiniMax H3 ComfyUI copy prompt

### v5.4.4 (2026-08-17)
- **[Fix & UX]** MiniMax H3の単一コピー文を、作品公開用タイトル・終端表記、吹き出し形状の完全除去、かなのみの日本語音声、各カットの明確なカメラ移動へ統合 / Unified the single MiniMax H3 copy prompt with publication title and ending credit, complete balloon-shape removal, kana-only Japanese speech, and clear camera movement in every shot

### v5.4.3 (2026-08-17)
- **[Fix & UX]** MiniMax H3作品公開用コピーを追加し、添付4コマからのタイトルOCR、枠外非素材化、冒頭タイトルと終端クレジット表示を指定 / Added a MiniMax H3 publication copy prompt with title OCR, panel-only story material, an opening title, and ending credit

### v5.4.2 (2026-08-17)
- **[Fix & UX]** MiniMax H3のコピー指示に漢字の読みガイドと条件付きアニメーション演出を追加 / Added kana reading guidance and conditional animation direction to the MiniMax H3 copied prompt

### v5.4.1 (2026-08-17)
- **[Fix & UX]** MiniMax H3のコピー指示へ秒単位のカメラ・カット設計と実際のカットまたぎ台詞規則を追加 / Added timed camera/cut planning and genuine cross-cut dialogue rules to the MiniMax H3 copy prompt

### v5.4.0 (2026-08-17)
- **[Fix & UX]** 複合音響・演出ラベルを視覚指示として処理し、引用された効果音や演出文が架空の話者・吹き出しにならないように修正 / Treat combined acoustic-direction labels as visual instructions so quoted sound cues and staging prose never become synthetic speakers or speech bubbles

### v5.3.9 (2026-08-16)
- **[Fix & UX]** MiniMax H3のコピープロンプトをBGM常時再生を必須化する契約へ差し替え / Replaced the MiniMax H3 copied prompt with a continuous mandatory BGM contract

### v5.3.8 (2026-08-16)
- **[Fix & UX]** MiniMax H3・ComfyUI用案内を4手順へ更新し、チャットへの漫画添付・送信、出力プロンプトのコピー、画角と秒数の確認を明記 / Updated the MiniMax H3 ComfyUI helper to four steps covering manga attachment, prompt copying, and framing and duration confirmation

### v5.3.7 (2026-08-15)
- **[Fix & UX]** MiniMax H3用のComfyUI動画化補助を追加し、4コマ漫画をReference Imageへ接続する手順をREADMEとSTEP4に明記 / Added a MiniMax H3 ComfyUI video-helper prompt and documented the four-panel Reference Image workflow in README and STEP4

### v5.3.6 (2026-08-14)
- **[Docs & Rights]** Added an explicit MIT license for original program source code and separated the policy for original non-code content, brand use, generated outputs, and direct third-party dependencies / 独自プログラム・ソースコードのMIT Licenseを明示し、独自非コード創作物・名称利用・生成物・直接依存関係の方針を分離
- **[Scope]** Added `LICENSE-CONTENT.md`, `TRADEMARKS.md`, `OUTPUTS.md`, and `THIRD_PARTY_NOTICES.md`; this release does not change generation logic, API-key handling, provider selection, or image-generation behavior / 上記の権利関係文書を追加。本リリースは生成ロジック、APIキー、プロバイダー選択、画像生成動作を変更しません

### v5.3.5 (2026-08-12)
- **[Fix & UX]** API初回接続、全自動の遅延上書き、肩越しキャスト重複、複合語の誤置換を汎用修正 / Fixed first-submit API connection, stale full-auto overwrites, over-the-shoulder cast duplication, and compound-term rewrites

### v5.3.4 (2026-08-11)
- **[Fix & UX]** 公開済みリリース表記とHANDOFFの状態を実際のv5.3.3公開結果へ同期 / Synchronized published-release wording and HANDOFF status with the actual v5.3.3 release

### v5.3.3 (2026-08-12)
- **[Fix & UX]** 画像品質NG時に問題限定の修正版を1回だけ生成し、修正版も未合格・判定不能・取得失敗なら保存済み元画像へ戻して後続作業を継続 / Added one issue-limited image repair attempt after concrete QA failures; restores the saved original and continues when the repair remains NG, is unverified, or cannot be retrieved

### v5.3.2 (2026-08-11)
- **[Fix & UX]** 動作の受け手に合わせた画面・書類・ネームプレートの向きと、肩越し表示を追加。人物・手・吹き出し優先の可視品質ゲートを補強 / Added action-targeted orientation for screens, documents, and nameplates, including valid over-the-shoulder views; strengthened the visible person, hand, and bubble quality gate

### v5.3.1 (2026-08-11)
- **[Fix & UX]** 初回API接続の再試行と、人物・手・小道具・吹き出しを優先する可視品質ゲートを追加。背景は軽量な継続情報へ縮小 / Added first-entry API retry plus a visible person, hand, prop, and bubble quality gate; reduced background handling to lightweight continuity (latest 15 releases) / 変更履歴（最新15件）

### v5.3.0 (2026-08-10)
- **[Fix & UX]** 特定の物やポーズに依存しない手・小道具運動学契約を追加し、Actionを変更せず左右・接触・所有者・最終支持状態・指手首の連続性を保持 / Added a situation-agnostic hand and prop kinematics contract that preserves Action while locking side, contact, ownership, final support state, and finger/wrist continuity

### v5.2.9 (2026-08-10)
- **[Fix & UX]** READMEの現行実装バージョン表記をv5.2.9へ訂正し、公開済みの構図バリエーション機能と整合 / Corrected the README current-implementation version to v5.2.9 so it matches the latest release and published manga composition variety description

### v5.2.8 (2026-08-10)
- **[Fix & UX]** 通常の4コマ生成で被写体基準の斜めカメラ・身体軸・両手の前後差を自動指定し、OpenAI画像生成中の待機表示を通常2〜10分に統一 / Added default subject-relative camera, body-axis, and two-hand depth variety for normal manga generation, and aligned the OpenAI wait overlay to the normal 2-to-10-minute expectation

> Full release history is available on [GitHub Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases). / 全履歴は [GitHub Releases](https://github.com/FURUYAN1234/nano-banana-pro/releases) で確認できます。

### v5.2.7 (2026-08-09)
- **[Fix & UX]** 対象日付の季節と行事・環境に合わせて衣装を選択し、夏冬の明白な不一致を具体的理由付きで再生成。ブラウザの画像ストリーム失敗時は通常応答で一度だけ再試行し、既存依存の高重要度脆弱性を修正 / Selects outfits from the target-date season, events, and environment; retries clear summer/winter mismatches with a concrete reason. Retries once with a normal response after browser image-stream failure and fixes high-severity dependency findings

### v5.2.6 (2026-08-08)
- **[Fix & UX]** 吹き出し抽出が身体・表情・演出などの演出指示を台詞扱いしないようにし、OpenAI画像生成の衣装維持指示を安全判定に通る肯定表現へ修正 / Prevented visual direction labels from being parsed as dialogue bubbles and rewrote OpenAI wardrobe preservation guidance as safe positive instructions.

### v5.2.5 (2026-08-08)
- **[Fix & UX]** 漫画タイトル末尾の固定『!?』連結を廃止し、内容に応じた無印・!・?・!?を保持。成人向け安全正規化とOpenAI画像リクエストを改善し、通常のSTEP2→STEP4実API生成で新規4コマを確認 / Removed the forced !? manga-title suffix and preserve no punctuation, !, ?, or !? according to the generated content. Improved adult-safe normalization and the OpenAI image request, verified through a normal STEP2-to-STEP4 real API four-panel run

### v5.2.4 (2026-08-07)
- **[Fix & UX]** Markdown見出しの表情・身体・演出・背景を台詞と配置から除外し、視覚指示はActionへ保持。通常キャラクターシートの実API四コマで余計な吹き出しが出ないことを確認 / Exclude Markdown visual-section headings from dialogue and placement parsing while preserving visual directions in Action; verified with a normal character-sheet real API four-panel generation without extra bubbles

### v5.2.3 (2026-08-07)
- **[Fix & UX]** 4コマ全体でキャラクター衣装の色・柄を固定するクロスパネル衣装ロックと、元絵の顔・髪・服色・柄を保持する縦横比修正ロックを追加 / Added a cross-panel wardrobe color lock and an aspect-ratio correction lock that preserves the source faces, hair, garment colors, and patterns

### v5.2.2 (2026-08-06)
- **[Fix & UX]** 一枚絵と4コマで共通の品質契約を適用し、背景・照明・解剖・質感の基準を同期 / Applied one shared quality contract across single-image and four-panel prompts for setting, lighting, anatomy, and clean rendering

### v5.2.1 (2026-08-05)
- **[Fix & UX]** 演出・ギャグ構造ラベルを汎用的にActionへ振り分け、説明文の吹き出し化を防止 / Routed staging-gag structural labels to visual Action and prevented direction prose from becoming speech bubbles

### v5.2.0 (2026-08-05)
- **[Fix & UX]** STEP1キャラクター解析リセットを追加し、API接続を保持したままキャラクターシート・抽出設定・解析ログとSTEP2以降を消去できるように改善 / Added a STEP1 character-analysis reset that preserves the API connection while clearing character sheets, extracted settings, analysis logs, and STEP2-plus work

### v5.1.9 (2026-08-05)
- **[Fix & UX]** 漫画台本の構造ラベルを吹き出し化せず、同一話者の重複セリフのみを抑制 / Prevented structural labels from becoming speech bubbles and deduplicated only near-identical same-speaker dialogue

### v5.1.8 (2026-08-04)
- **[Fix & UX]** STEP2のシナリオ作成・演出強化API待機上限を3分に延長し、STEP1/STEP3/画像生成の既存上限を維持 / Extended the STEP2 scenario creation and enhancement API timeout to three minutes while preserving existing STEP1, STEP3, and image-generation limits

### v5.1.7 (2026-08-04)
- **[Fix & UX]** 表現衛生NGを共通の3試行品質評価へ統合し、上限到達後も最良候補を保持してSTEP3・画像生成へ継続。試行表示を2/3・3/3へ明確化 / Integrated scenario-content hygiene into the shared three-attempt quality loop, retaining the best candidate for STEP3 and image generation while showing explicit 2/3 and 3/3 attempt progress

### v5.1.6 (2026-08-04)
- **[Fix & UX]** 開発中の更新でAPI接続を空にしない保護を追加 / Protected active API connections during development refreshes

### v5.1.5 (2026-08-04)
- **[Fix & UX]** 強化品質の再試行で最良候補を保持し、品質警告でもSTEP3・STEP4を継続 / Retained the best enhancement candidate and continued through quality warnings

### v5.1.4 (2026-08-04)
- **[Fix & UX]** 品質再試行で最良候補を保持し、自由入力の禁止カテゴリを生成後にも検証 / Retained the best quality candidate and enforced manual exclusions after generation

### v5.1.3 (2026-08-04)
- **[Fix & UX]** シナリオ生成の隠れた自動再試行を停止し、背景検証の誤検出と検証エラーの通信エラー誤表示を修正。画像受信後の自動視覚QA・自動再生成を停止。 / Disabled hidden scenario retries, fixed false background validation and validation-error messaging, and removed post-image automatic vision QA/regeneration.
