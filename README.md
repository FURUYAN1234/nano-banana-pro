# Super FURU AI 4-koma System / Super FURU AI 4コマシステム

> Latest release: **v6.2.1** / 最新リリース: **v6.2.1**

An experimental web application in which AI handles topic research, story structure, direction, prompt construction, image generation, and quality review for a four-panel manga. / AIが話題調査、構成、演出、プロンプト構築、画像生成、品質確認まで担当する4コマ漫画制作Webアプリです。

[Open the application](https://furuyan1234.github.io/nano-banana-pro/) / [アプリを開く](https://furuyan1234.github.io/nano-banana-pro/)

[Read the detailed note article](https://note.com/happy_duck780/n/ndf063558c1f5) / [詳しいnote記事を読む](https://note.com/happy_duck780/n/ndf063558c1f5)

## What this project does / このプロジェクトでできること

The application provides one continuous four-step workflow. / アプリは次の4ステップを一続きで実行します。

1. **Character analysis / キャラクター解析:** Read a character sheet or reference image and extract identity traits. / キャラクターシートや参照画像から人物の識別要素を抽出します。
2. **Scenario / シナリオ:** Generate a four-panel story and optionally strengthen its direction. / 4コマのシナリオを生成し、必要に応じて演出を強化します。
3. **Prompt / プロンプト:** Build an editable image prompt and run an automatic AI consistency review before display. / 編集可能な画像プロンプトを構築し、表示前にAI整合性チェックを自動実行します。
4. **Image / 画像:** Generate through Google Gemini or OpenAI, inspect the result, and offer bounded repair when enabled. / Google GeminiまたはOpenAIで画像を生成し、結果を検査し、設定時は回数を制限した修正候補を作ります。

STEP3 shows `⏳ AI応答を待機中... (○秒経過)` while the connected text API reviews the prompt, then stops the counter when processing ends. / STEP3は接続中の文章APIがプロンプトを精査している間、`⏳ AI応答を待機中... (○秒経過)`を表示し、処理完了時にカウントを停止します。

STEP2's local scenario update discourages interchangeable “keep extending the same prop” plots: select objects and consequences from the topic's actual activities, while preserving explicit props, facts, bold cameras and acting. Direction enhancement does not replace an existing plot or invent expandable props. Generate anew from STEP2 to change the premise; STEP3 preserves already scripted scrolls or accordion paper. One fresh scenario rendered through the real API in color and monochrome showed no scroll/accordion mechanism while retaining strong perspective; this is not a recurrence-rate study or a guarantee against repetition. / STEP2のローカル修正では、題材が違っても同じ物を延ばし続ける展開への偏りを抑える指示を追加しています。題材固有の行為と結果から小道具を選び、明示指定・事実・大胆なカメラと演技は保持します。演出強化で既存の筋を置き換えたり、伸縮・継ぎ足しの仕掛けを新設したりしません。構想を変える場合はSTEP2から再生成してください。STEP3だけでは台本中の巻物や蛇腹を消しません。新規1台本を実APIでカラー・白黒に生成し、強い遠近を残したまま巻物状の仕掛けがないことを確認しました。ただし、題材ごとの再発率は未計測で、反復の解消を保証しません。

### Clothing selection / 衣装選定

Local wardrobe fix: STEP2 excludes labelled reference-clothing fields from scenario creation and enhancement while retaining identity, personality and relationships. Automatic outfits follow the subject and setting; user-entered outfits take priority. School attire without source/user grounding triggers the existing bounded retry and warning mechanism. Both color and monochrome prompt paths exclude reference-clothing fields when an Outfit override exists. To change a previously selected uniform, regenerate from STEP2 or edit its Outfit and matching action descriptions; STEP3 alone preserves the saved outfit. / ローカルの衣装修正では、STEP2の生成・演出強化へ渡すキャラ情報から参考衣装欄を除外し、外見・性格・人物間の関係性は維持します。自動衣装は題材と場面から選び、手入力を最優先します。原文・指定に根拠のない学校制服は既存の上限付き再試行・警告の対象です。カラー・白黒ともOutfit指定時は参考衣装欄をプロンプトへ戻しません。既に制服が選ばれた台本はSTEP2から再生成するか、Outfitと対応するト書きを編集してください。STEP3だけでは保存済み衣装は変わりません。

### Documentary endings / ドキュメンタリーの結末

STEP2 offers two source-faithful documentary choices. **Serious Documentary** keeps the character-sheet art style in every panel and turns only the ending into a serious manga conclusion. **Gag Documentary** keeps the source facts while turning only the ending into a gag-manga beat. / STEP2には原文忠実のドキュメンタリー選択肢が2つあります。**シリアス・ドキュメンタリー** は全コマでキャラクターシートと同じ絵柄を維持し、オチだけをシリアス漫画として締めます。**ギャグ・ドキュメンタリー** は原文の事実を守り、オチだけをギャグ漫画化します。

Changing the ending mode clears the prior scenario, final prompt and current image, then requires STEP2 and STEP3 to be rebuilt. While Serious Documentary is selected, STEP3, Web copy and API generation reject a stale or manually edited prompt that lacks the all-panel reference-style lock or restores gag/chibi/proportion-switch directives. / 結末モードを変更すると、以前のシナリオ・最終プロンプト・現在画像を消去し、STEP2とSTEP3の再生成を求めます。シリアス・ドキュメンタリー選択中は、全コマ参照絵柄固定がない古い指示文や、ギャグ・ちび化・頭身変更指示を戻した編集済み指示文を、STEP3・Webコピー・API生成の各直前で拒否します。

Documentary source facts are extracted from arbitrary input and assigned to the story as an internal fact ledger. The ledger is excluded from speech bubbles and visible labels, rejects unsupported timeline substitutions, and is validated before prompt assembly. / ドキュメンタリーでは任意の入力本文から事実を抽出し、内部用の事実台帳として各コマへ割り当てます。台帳そのものは吹き出しや画像内ラベルへ出さず、原文にない時期への置換を拒否し、プロンプト構築前に原文忠実性を検査します。

The STEP2 ending selector uses a compact 28px-high light selection face, a fixed chevron and a visible `▼ Selection menu` cue, with a 12px gap before the STEP2 execution button. STEP4 uses 11px labels and 26px-high selects for API image quality and size. / STEP2の結末選択欄は、高さ28pxのコンパクトな明るい選択面・常時表示の矢印・`▼ 選択メニュー`表示を備え、STEP2実行ボタンとの間に12pxの余白を確保します。STEP4のAPI画像品質・サイズは見出し11px、選択欄高さ26pxです。

### STEP3 output mode / STEP3の出力モード

Choose **Color** (default) or **Monochrome**, then press STEP3 to rebuild the same scenario. Changing the selection clears the previous prompt and current image preview without starting generation; generation history stays available. The selection survives STEP1/STEP2 resets in the current session; the full settings reset returns it to Color. / 初期値は **カラー** です。**白黒** に切り替えてSTEP3を押すと、同じシナリオから指示文を再構築します。選択変更時は古い指示文と現在の画像プレビューをクリアしますが、自動生成はせず、画像生成履歴も残します。起動中はSTEP1・STEP2からのやり直しでも選択を保持し、全設定リセットでカラーに戻ります。

Both API generation and Web copy carry the same monochrome medium contract: pure white lit skin, black ink and solid fills, regular black-on-white halftone/hatching, expressive pressure-varied G-pen lines and dynamic staging. Source colors in arbitrary character sheets and cast metadata are treated only as identity labels, removed from downstream reproduction commands, and mapped consistently to ink tones. A final whole-page chroma audit rejects tint even in hair ends, eyes, reflections, effects, or edge pixels. Simplify crowded nonessential background detail while retaining location and story evidence; required dialogue stays verbatim. / API生成・Web貼付の共通指示で、肌の明部は純白、線とベタは純黒、中間調は白黒の網点・ハッチングを指定します。任意のキャラクターシートや人物設定に含まれる色は同一性判定用の情報としてだけ扱い、後段の色再現命令から除外して固定トーンへ変換します。毛先・瞳・反射・効果・輪郭の縁まで含む最終色相監査で、わずかな色残りも不合格にします。Gペン風の強弱ある描線とダイナミックな構図を活かし、混み合う背景の不要な細部は整理しつつ、場所や話に必要な情報とセリフは残します。

The reference, script-priority and ink-only checks survive Web prompt compaction: reference color boundaries and accents become fixed black/white/screen regions. Monochrome also preserves camera perspective, full-body acting and dramatic lighting through directional black shadows, white rim highlights and contrasting screen masses. Background simplification retains perspective and contact shadows; color-independent style proportions remain active, except when Serious Documentary locks reference proportions. After this update, rebuild with STEP3 and copy the newly displayed prompt. / Web用の長文短縮後も、参照の解釈・シナリオとの優先順位・各コマの白黒指示を保持します。白黒でもカメラの遠近感と全身演技を保ち、強い照明は方向のあるベタ影・白い輪郭光・網点の明暗差へ変換します。背景整理でも遠近と接地影を残し、細密コマと抽象コマに強弱を付けます。色に依存しない画風別の頭身指定も保持しますが、シリアス・ドキュメンタリーでは参照の頭身を優先します。更新後はSTEP3で再構築して新しい指示文をコピーしてください。実画像の迫力がカラーと同等になることを保証するものではありません。

This is a generation instruction, not a pixel-conversion or print-preflight tool. There is no finishing-image import. Exact two-value pixels, resolution and publisher submission requirements must be checked on the actual output; prompt wording alone does not guarantee them. / 画像の後処理や入稿検査ではなく、生成時の指示です。「仕上げ用画像読込」はありません。実画像の厳密な二値、解像度、投稿先の原稿規定への適合は別途確認が必要で、プロンプトだけでの保証はできません。

The four primary actions for STEP1 through STEP4 use the same full-width light-blue treatment so the required path is easy to identify; secondary settings, copy, download, and reset controls keep their separate styles. / STEP1～STEP4の主操作を同じ横幅・薄い青色に統一し、最低限押す操作を見つけやすくしました。設定・コピー・ダウンロード・やり直し等の補助操作はそれぞれの表示を維持します。

## Quick start / すぐに使う

1. Open the [published application](https://furuyan1234.github.io/nano-banana-pro/). / [公開アプリ](https://furuyan1234.github.io/nano-banana-pro/)を開きます。
2. Choose Gemini API or OpenAI API and enter that provider's API key in the application. / Gemini APIまたはOpenAI APIを選び、対応するAPIキーをアプリへ入力します。
3. Select character-sheet images with the STEP1 button or drop them into its drop zone; multiple images can be added together or later. Optional 360-degree background images and style-setting JSON files can be loaded there too. / STEP1ボタンでキャラクター設定画像（キャラシート）を選ぶか、ドロップ領域へ読み込みます。複数枚は同時または後から追加でき、任意で360°背景画像や作風設定JSONも読み込めます。
4. Review the editable scenario and prompt, then run STEP4. / 編集可能なシナリオとプロンプトを確認し、STEP4を実行します。
5. Inspect the actual image, especially dialogue, hands, props, character identity, and panel order. / 実画像の台詞、手、小物、人物の同一性、コマ順を確認します。

The app can also produce a prompt for manual use on the Gemini or ChatGPT website; a ChatGPT subscription does not include OpenAI API usage, and API billing is separate. / GeminiまたはChatGPTのWeb画面へ手動で貼り付けるプロンプトも作成できます。ChatGPTのサブスクリプションにOpenAI API利用料は含まれず、API課金は別です。

## API routes and settings / API経路と設定

| Route / 経路 | Main use / 主な用途 | Notes / 注意 |
|---|---|---|
| Google Gemini API / Google Gemini API | Text analysis and Gemini image generation. / 文章解析とGemini画像生成。 | Availability and model names depend on the connected account. / 利用可否とモデル名は接続アカウントに依存します。 |
| OpenAI API / OpenAI API | Text analysis and GPT Image generation. / 文章解析とGPT Image生成。 | The current selector supports GPT Image 2.5 Sunburst and available fallbacks. / 現在の選択欄はGPT Image 2.5 Sunburstと利用可能な代替モデルに対応します。 |
| Web copy / Web貼り付け | Manual use in Gemini or ChatGPT. / GeminiまたはChatGPTでの手動利用。 | The finished Web image does not return automatically for app-side post-generation QA. / Webで完成した画像はアプリ側の生成後検査へ自動では戻りません。 |

The default OpenAI image setting is Sunburst / xhigh at 1024×1536 when the model is available. Larger sizes and higher quality increase cost and latency and do not guarantee correct dialogue, hands, or composition. / OpenAI画像の既定値は利用可能な場合Sunburst / xhigh・1024×1536です。大きなサイズや高品質設定は料金と待ち時間が増え、台詞・手・構図の正確さを保証しません。

For OpenAI text, only STEP2 scenario creation and its optional enhancement start with GPT-6 Astra, then use GPT-5.6 Sol and the established GPT-4.1 chain if needed. Character analysis, prompt review and image generation keep their existing routes. Model availability and a successful API response do not by themselves guarantee story quality; review the generated scenario before STEP3. / OpenAI文章処理では、STEP2のシナリオ作成と任意のシナリオ強化だけをGPT-6 Astraから開始し、必要時はGPT-5.6 Sol、既存のGPT-4.1系チェーンへ順に切り替えます。キャラクター解析、プロンプト確認、画像生成の経路は従来どおりです。モデルが利用可能でAPI応答が成功しても物語の質までは保証しないため、STEP3の前に生成シナリオを確認してください。

Automatic repair is enabled by default. It makes one ordinary repair and only when grounded incidental-print defects persist may make one additional fallback, for at most two extra paid image requests. / 自動修正は既定ONです。通常修正を1回行い、根拠のある装飾印字の問題が残る場合だけ追加候補を1回作るため、追加の有料画像生成は最大2回です。

## Prompt and image safeguards / プロンプトと画像の確認

The prompt preserves explicit cast, dialogue, props, action, camera direction, and quiet beats while allowing variation in camera height, tilt, depth, and body acting. / 明示した登場人物、台詞、小物、動作、カメラ方向、静かな間を保持しながら、カメラの高低・傾き・奥行き・身体演技に変化を付けます。

Explicit abstract beats may omit scenery to contrast with detailed setting shots, while preserving story props and contacts. Deformation follows the selected panel style and never overrides a locked reference style or normal proportions. Necessary reactions remain readable even in supporting characters; individual gaze, weight and hand roles vary while scripted synchronized actions remain intact. These exceptions also survive prompt compaction. / 意図的な抽象コマでは背景を大胆に省略し、描き込むコマとの落差を作れます。必要な小道具と接触は保持します。デフォルメは選択されたコマの画風に従い、参照画風固定や通常頭身の指定を上書きしません。脇役でも必要な反応は読めるようにし、視線・重心・手の役割を描き分けます。指定された一斉動作は保ち、短縮後の指示にもこれらの条件を残します。
Overhead framing remains visible through body and prop projection even when scenery is omitted. Scripted gaze targets take priority; ordinary conversational eye contact remains the fallback. / 背景を省略しても人物・小物の見下ろし形状で俯瞰を保ちます。明示された視線先を優先し、指定がない会話では通常の相互視線を補います。

Four-panel direction asks for one focal target per panel and story-motivated contrast in subject scale, negative space, background detail and effects. Quiet beats retain setting shapes and depth at lower contrast; distant backgrounds may defocus while focal faces, hands and story props stay sharp. Monochrome expresses defocus in black-on-white halftone, not by erasing the setting. Required supporting cast can be smaller and lower contrast. Bubble size and height follow dialogue and reading order. Explicit hand actions and gaze take priority over stock poses, and unspecified surfaces stay unlettered. These instructions survive long-prompt compaction while preserving the equal four-panel layout, dialogue and speaker ownership. They do not guarantee visual pacing, camera adherence, exact actions or lettering; inspect each generated image. / 4コマでは各コマの注視対象を決め、人物の大きさや背景の密度に強弱を付けるよう指示します。静かなコマでも場所の形と奥行きを残し、遠景は被写界深度に応じてぼかせます。焦点の合う人物・手元・重要な小道具は明瞭にし、白黒は網点によるぼけ表現を使います。背景の白抜きを静かな演出の既定にはしません。吹き出しは台詞量と読み順に合わせ、指定の手動作・視線を定型ポーズより優先し、未指定の看板・本・服などには文字を追加しないよう指示します。長文の短縮時もこれらの条件と4コマ等分枠、台詞、話者の対応を保持します。ただし、実画像での読みやすさ・画角・動作・文字の正確さを保証するものではなく、生成ごとの確認が必要です。

Facial acting is described through eyebrows, eyelids, gaze, and mouth shape, with intensity chosen for the scene. This is prompt guidance and does not guarantee the model's rendered facial expression. / 顔演技・表情設計は眉、まぶた、視線、口の形を場面に応じて指定します。これはプロンプト上の指示であり、モデルが描く表情を保証しません。

Character sheets define identity rather than a reusable page layout. STEP4 asks the model to keep appearance while avoiding the reference sheet's labels, poses, boxes, and text. / キャラクターシートは人物の同一性資料として扱い、レイアウトの見本にはしません。STEP4は外見を保持しつつ、参照シートのラベル、ポーズ、枠、文字を持ち込まないよう指示します。

Functional surfaces such as phones, documents, books, and monitors are oriented toward the person using or reading them. Printed glyphs rotate and project with the physical surface instead of being forced upright to the viewer. / スマホ、書類、本、モニター等の機能面は使用者・読み手へ向けます。印字は読者へ無理に正立させず、実物の面と一緒に回転・透視投影するよう指定します。

Image QA checks panel structure, character identity, body and hand integrity, prop ownership, dialogue-only bubbles, text leakage, and observable surface orientation. Missing evidence is reported as unverified and does not by itself trigger a paid repair. / 画像QAはコマ構造、人物同一性、身体・手、小物の持ち主、吹き出しが台詞だけか、余分な文字、確認可能な面の向きを検査します。根拠不足は未確認として扱い、それだけを理由に有料修正を実行しません。

## MiniMax H3 and ComfyUI / MiniMax H3・ComfyUI動画化

The expanded `FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）` section offers a manual standard-template route and a dedicated Fused4step + SLA distribution. / `FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）`を開くと、手動の標準テンプレート経路と専用Fused4step・SLA配布経路を選べます。

### Use the ComfyUI standard template yourself / ComfyUI標準テンプレートを自分で使う場合

Copy the generic MiniMax H3 authoring prompt and configure ComfyUI's standard Reference-to-Video workflow yourself. It derives panel cast, identities, speakers, dialogue windows, acting, camera, and sound from each attached manga rather than embedding a sample cast. / 汎用MiniMax H3作成プロンプトをコピーし、ComfyUI標準のReference-to-Videoワークフローを自分で設定します。特定の見本キャストを埋め込まず、添付漫画ごとに各コマの人物、同一性、話者、台詞窓、演技、カメラ、音を導出します。

Connect the four-panel image only to `ref_image_0` and leave `ref_image_1`以降 disconnected. Start `Resolution Selector (Size)` at 16:9 and 0.4 megapixels, and set the `基本スケジューラー` to `normal`, with `字幕なし` as the default. / 4コマ画像は`ref_image_0`だけへ接続し、`ref_image_1`以降は未接続にします。`Resolution Selector (Size)`は16:9・0.4メガピクセル、`基本スケジューラー`は`normal`、既定は`字幕なし`です。

The generic prompt transfers the packaged workflow's four-panel order, per-panel cast lock, one-speaker-per-dialogue-window rule, silent speech buffers, readable acting/camera staging, and low-volume H3 BGM. A prompt alone cannot automate image preprocessing, API dialogue extraction and reading review, per-line variable-duration generation, candidate comparison, audio/video audits, or waveform-tail repair. With the standard graph, set the image, dialogue, fixed total duration, and output frames manually. / 汎用プロンプトには、配布版の四コマ順序、各コマ人物固定、一人一台詞窓、発声前後の無音余白、読み取りやすい演技・カメラ、低音量H3 BGMのノウハウを取り込みます。ただしプロンプトだけでは、画像前処理、APIによる台詞抽出・読み確認、行ごとの自動可変尺、候補比較、音声・映像監査、終端波形修復は自動化できません。標準グラフでは画像、台詞、固定の合計秒数、生成フレーム数を手動で合わせます。

### Use the Fused4step + SLA distribution / Fused4step・SLA 配布ワークフローを使う場合

The app has separate buttons for the workflow JSON and the three-custom-node ZIP; `2つは別の操作` and each button downloads a different file. / アプリにはワークフローJSONとカスタムノード3点ZIPの別ボタンがあり、`2つは別の操作`として異なるファイルをダウンロードします。

- [Download workflow JSON](https://furuyan1234.github.io/nano-banana-pro/workflows/FourPanel_NonLM_4step_20260913115712_v5.9.9.json) / [ワークフローJSONをダウンロード](https://furuyan1234.github.io/nano-banana-pro/workflows/FourPanel_NonLM_4step_20260913115712_v5.9.9.json)
- [Download custom-node ZIP](https://github.com/FURUYAN1234/nano-banana-pro/releases/download/v6.1.4/ComfyUI_H3_FourPanel_NonLM_20260913115712_v5.9.9.zip) / [カスタムノードZIPをダウンロード](https://github.com/FURUYAN1234/nano-banana-pro/releases/download/v6.1.4/ComfyUI_H3_FourPanel_NonLM_20260913115712_v5.9.9.zip)

The current source tree intentionally contains no distribution ZIP. The custom-node ZIP is a named asset of the matching GitHub Release. / 現在のソースツリーには配布ZIPを意図的に登録せず、カスタムノードZIPは同じ版のGitHub Release専用アセットとして公開します。

Install all `3フォルダ` from the ZIP under `ComfyUI/custom_nodes/`, install PlagueKind-Nodes, H3-AudioRefine, and a compatible Triton separately, then place the JSON under `ComfyUI/user/default/workflows/` and restart ComfyUI. / ZIP内の`3フォルダ`をすべて`ComfyUI/custom_nodes/`へ配置し、PlagueKind-Nodes、H3-AudioRefine、対応Tritonを別途導入してから、JSONを`ComfyUI/user/default/workflows/`以下へ置いてComfyUIを再起動します。

Four required model weights are not bundled. Use `models.json` and the workflow's `不足モデル` display to open the `ダウンロード` sources under each model's own terms. / 必須モデル4点は同梱しません。`models.json`およびワークフローの`不足モデル`表示から各モデルの`ダウンロード`元を開き、個別条件を確認して取得します。

The current graph uses Fused 4ステップ, 音声補正2ステップ at denoise 0.5, and SLA Attention at 0.90. / 現行グラフはFused 4ステップ、音声補正2ステップ・denoise 0.5、SLA Attention 0.90を使用します。

H3 SLA Attention requires separately installed [ComfyUI-PlagueKind-Nodes](https://github.com/PlagueKind/ComfyUI-PlagueKind-Nodes) and a compatible Triton environment; audio refinement requires separately installed [ComfyUI-H3-AudioRefine](https://github.com/Adudeguyman/ComfyUI-H3-AudioRefine). / H3 SLA Attentionには別途導入する[ComfyUI-PlagueKind-Nodes](https://github.com/PlagueKind/ComfyUI-PlagueKind-Nodes)と対応Triton環境が必要で、音声補正には別途導入する[ComfyUI-H3-AudioRefine](https://github.com/Adudeguyman/ComfyUI-H3-AudioRefine)を使用します。

Dialogue starts at five seconds and only lines that need more time extend up to 15 seconds; no-dialogue input uses 30 seconds. / 台詞は基本5秒とし、必要な台詞だけ最大15秒まで延長し、台詞なしの場合は30秒です。

The workflow performs 区間 generation and 検査, comparing 初回込み最大5候補. It proceeds immediately on an earlier pass and retains the best inspected candidate if all fail; 採用済みでも全検査合格とは限りません. / ワークフローは区間ごとに生成・検査し、初回込み最大5候補を比較します。途中で合格すれば直ちに次へ進み、全候補が不合格なら検査上の最良候補を保持します。採用済みでも全検査合格とは限りません。

The supplied v5.9.9 candidate completed a 28-second, 864x480, 24 fps GPU/API run, and the repeated-utterance and final-cutoff sections were replayed and accepted. A fresh GPU run from the extracted ZIP and execution on another PC remain unverified. / 添付v5.9.9候補は28秒・864x480・24fpsのGPU/API生成を完走し、重複発声の除去区間と末尾発声完了が再生確認されています。展開ZIPからの新規GPU生成と別PC実行は未検証です。

## Package licenses and privacy / 配布ライセンスと個人情報

| Included folder / 同梱フォルダー | License / ライセンス |
|---|---|
| `ComfyUI-NanoBanana-H3` | MIT |
| `ComfyUI-MiniMax-H3-Long-Video` | GPL-3.0-only |
| `ComfyUI-Spectrum-MiniMax-H3` | GPL-3.0-or-later |

The ZIP contains source code and setup documents only. It contains no API keys, authentication files, user paths, model weights, input images, generated video, or personal pronunciation dictionary. / ZIPはソースコードと導入文書だけを収録し、APIキー、認証ファイル、利用者パス、モデル本体、入力画像、生成動画、個人用発音辞書を含みません。

API calls send the selected text or image data to the chosen provider and may incur charges. Keys are handled according to the active application or ComfyUI process and must never be embedded in a workflow or distribution archive. / API呼び出しは選択した文章・画像を指定プロバイダーへ送信し、料金が発生する場合があります。キーは実行中のアプリまたはComfyUIプロセスで扱い、ワークフローや配布ZIPへ埋め込まないでください。

## Development / 開発

```bash
npm install
npm run dev
npm run lint
npm run build
node --test
```

The production application is published from the `main` branch through the repository's release process. / 本番アプリはリポジトリのリリース手順を通して`main`ブランチから公開します。

## FAQ / よくある質問

**Does this guarantee perfect Japanese text? / 日本語を完全に正しく描けますか？**  No. The prompt and QA reduce known failure modes, but generated glyphs remain model output and require visual confirmation. / いいえ。プロンプトとQAで既知の失敗を減らしますが、生成文字はモデル出力のため目視確認が必要です。

**Why are there two ComfyUI download buttons? / ComfyUIのダウンロードボタンが2つあるのはなぜですか？**  The JSON defines the workflow, while the ZIP supplies three custom-node folders and documentation; three additional runtime dependencies are installed separately. / JSONはワークフロー定義、ZIPはカスタムノード3フォルダーと導入文書です。さらに実行依存3項目を別途導入します。

**Where are older packages? / 旧版はどこですか？**  Older source tags remain for audit history, but their bundled distributions are withdrawn. New installations must use the current v5.9.9 workflow button and matching FourPanel Release asset. / 旧タグは監査用履歴として残しますが、旧同梱配布物は取り下げ扱いです。新規導入は現在のv5.9.9ワークフローボタンと同版FourPanel Releaseアセットを使用してください。

**Is this the T2V/I2V/Ref2V repository? / T2V・I2V・Ref2Vのリポジトリですか？**  No. Those workflows are maintained separately in [comfyui-h3-workflows](https://github.com/FURUYAN1234/comfyui-h3-workflows). / いいえ。それらは別の[comfyui-h3-workflows](https://github.com/FURUYAN1234/comfyui-h3-workflows)で管理します。

## 📋 ChangeLog

### v6.2.1 (2026-09-15)
- **[Fix & UX]** キャラシートの参考衣装をSTEP2の新規シナリオ・演出強化とOutfit指定時の画像キャスト情報から分離し、外見・性格・関係性を保持したまま題材と場面に基づいて自動選定。根拠のない学校制服や後付けの学生役を再試行対象にし、明示した衣装・学校行事・職業制服は保持 / Isolated reference clothing from STEP2 scenario/enhancement and overridden image-cast context while retaining identity, personality and relationships; automatic wardrobe now follows the subject and setting, retries unsupported school attire or invented student roles, and preserves explicit outfits, school contexts and professional uniforms

### v6.2.0 (2026-09-15)
- **[Fix & UX]** 題材と因果に沿って小道具を選び、同じ物の連続拡張を避けつつ、明示された小道具・カメラ・演技を保持 / Selected props from topic-specific causality, avoiding repeated extensions while preserving explicit props, camera work and acting

### v6.1.9 (2026-09-15)
- **[Fix & UX]** 白黒でも光・遠近・全身演技を保持し、色非依存の頭身指定をカラーと共通化 / Retained dramatic monochrome lighting, depth and full-body acting, with shared color-independent proportions

### v6.1.8 (2026-09-15)
- **[Fix & UX]** GPT-6 AstraをSTEP2のシナリオ作成・強化だけの先行経路にし、失敗時はGPT-5.6 Solと既存GPT-4.1系へ段階フォールバック。二面小道具の裏面操作をQAで誤検知せず、圧縮後も最終コマの能動的な配置と顔演技を保持 / Routed only STEP2 scenario creation and enhancement through GPT-6 Astra with GPT-5.6 Sol and established GPT-4.1 fallbacks, added context-aware two-sided-prop QA, and retained active final-panel staging and facial acting under prompt compaction.

### v6.1.7 (2026-09-15)
- **[Fix & UX]** 背景を省略する抽象コマでも俯瞰の身体・小道具投影を残し、明示された個別視線を会話用の補助指示より優先。指定がない通常会話では相互視線を維持 / Preserved overhead body and prop projection in abstract beats and prioritized explicit individual gaze over conversational fallback rules; ordinary unspecified conversations retain mutual eye contact

### v6.1.6 (2026-09-15)
- **[Fix & UX]** 4コマで背景の奥行きと被写界深度を保ち、明示カメラと肩越し人物配置を修正 / Preserved four-panel setting depth and depth of field, and corrected explicit cameras and shoulder-over placement

### v6.1.5 (2026-09-13)

- Added generic stale-mode invalidation and final-prompt consistency guards for Serious Documentary. / シリアス・ドキュメンタリーへ、汎用の旧モード無効化と最終プロンプト整合検査を追加しました。
- Made the STEP2 ending selector visually distinct but compact with a 28px-high light face, explicit menu cue and fixed chevron, and added a measured 12px gap before the STEP2 execution button. / STEP2の結末選択欄を高さ28pxのコンパクトな明るい面、明示的なメニュー表示、固定矢印で識別しやすくし、STEP2実行ボタンとの間へ実測可能な12pxの余白を追加しました。
- Made the seventh scenario-enhancement category follow the ending mode: Serious Documentary shows and sends Serious Direction while every other ending keeps Gag Direction. Serious enhancement preserves the existing art style and normal proportions and rejects newly introduced CHIBI/COMEDY emotion tags. / 7番目のシナリオ強化カテゴリを結末モード連動にし、シリアス・ドキュメンタリーでは「シリアス演出」、それ以外では「ギャグ演出」を表示・送信します。シリアス強化は既存絵柄と通常頭身を維持し、新規CHIBI／COMEDY感情タグを拒否します。
- Normalized the explanatory copy in the STEP4 API quality/size and Web image-correction/upscale sections to the same 10–11px scale used by the video and safety guides. The API quality/size labels are 11px and their selects are compact 26px-high controls with 11px text; generation settings are unchanged. / STEP4のAPI品質・サイズとWeb画像比率修正・アップスケールの説明文を、動画化・安全ポリシーと同じ10〜11px基準へ統一しました。API品質・サイズの見出しは11px、選択欄は高さ26px・文字11pxへ縮小し、生成設定自体は変更していません。
- A fresh OpenAI GPT Image 2.5 Sunburst / xhigh run with both character sheets kept normal proportions and one reference-sheet art style across all four panels, including the final panel. All 431 tests, strict lint, production build and browser error checks passed. / キャラクターシート2枚を使ったOpenAI GPT Image 2.5 Sunburst / xhigh実生成では、最終コマを含む全4コマで通常頭身と同一の参照絵柄を維持しました。全431テスト、厳格lint、本番ビルド、ブラウザエラー検査に合格しています。

### v6.1.4 (2026-09-13)

- Split the former documentary ending into Serious Documentary and Gag Documentary. Both preserve arbitrary source facts; Serious Documentary also keeps the attached character-sheet art style across all four panels and changes only the ending into a serious conclusion. / 従来のドキュメンタリーをシリアス・ドキュメンタリーとギャグ・ドキュメンタリーへ分割しました。どちらも任意の原文事実を保持し、シリアス版は全4コマで添付キャラクターシートの絵柄を維持して、結末だけをシリアスにします。
- Added a generic internal source-fact ledger, source-anchor validation and timeline normalization. These rules contain no sample character names or fixed story facts, and internal fact labels are never printed in the image. / 汎用の内部事実台帳、原文アンカー検査、時系列正規化を追加しました。見本の人物名や固定の物語事実は含めず、内部用の事実ラベルは画像へ表示しません。
- Replaced the FourPanel download targets with the supplied v5.9.9 workflow JSON and three-custom-node distribution ZIP. Added a generic standard MiniMax H3 clipboard prompt and documented which automated variable-duration, candidate comparison and audit features still require the packaged workflow. / FourPanelのダウンロード先を添付v5.9.9ワークフローJSONとカスタムノード3点ZIPへ更新しました。標準MiniMax H3用の汎用コピープロンプトを追加し、自動可変尺、候補比較、監査など配布ワークフローでのみ自動化される機能も明記しました。
- A live OpenAI API run with two character sheets produced a 1024×1536 serious documentary page. All 419 tests, strict lint, production build and whitespace checks passed. / キャラクターシート2枚を添付したOpenAI API実生成で、1024×1536のシリアス・ドキュメンタリー4コマを確認しました。全419テスト、厳格lint、production build、空白差分検査に合格しています。

### v6.1.3 (2026-09-13)

- Added a fixed 12px visual gap between the STEP3 settings-file save button and the STEP4 API generation button. Button height, width, wording, color and behavior are unchanged. / STEP3の設定ファイル保存ボタンとSTEP4のAPI生成ボタンの間へ、表示環境に依存しない12pxの余白を追加しました。ボタンの高さ・幅・文言・色・処理は変更していません。
- The Color/Monochrome prompt behavior and separately distributed FourPanel v6.0.9 workflow JSON/custom-node ZIP remain unchanged from v6.1.2. / カラー／白黒のプロンプト動作と、別配布のFourPanel v6.0.9ワークフローJSON・カスタムノードZIPはv6.1.2から変更していません。

### v6.1.2 (2026-09-13)

- Added a persistent Color/Monochrome selector to STEP3. Monochrome rebuilds the same scenario with shared API/Web instructions for white paper, black ink, black-on-white tones, strong G-pen lines, dynamic staging, and simplified nonessential background detail. / STEP3に保持式のカラー／白黒切替を追加しました。白黒では同じシナリオから、白い紙面、黒インク、白地の網点、強いGペン線、動きのある構図、不要な背景細部の整理をAPI／Web共通で指示します。
- Source colors from arbitrary character sheets are treated as identity metadata and converted to stable ink or tone regions. Actual API and Web-paste runs with two character sheets removed visible pink and other source hues, but the returned PNGs were not mathematically exact two-value images. / 任意のキャラクターシートの色は同一性情報として扱い、固定した黒・白・網点領域へ変換します。キャラシート2枚を使ったAPIとWeb貼付の実生成では目視できるピンク等の色残りは消えましたが、PNGの画素値は厳密な二値ではありませんでした。
- Tightened STEP3/STEP4 wording: the prompt heading is now `最終プロンプト`, the edit guidance sits below the status log, the API-only implementation note is removed, and the generation button reads `APIで画像をアプリ内で生成する（STEP4）`. / STEP3・STEP4の表示を整理し、見出しを`最終プロンプト`、編集案内を状況確認窓の下へ配置し、API専用の実装説明を削除、生成ボタンを`APIで画像をアプリ内で生成する（STEP4）`へ変更しました。

### v6.1.1 (2026-09-12)
- **[Fix & UX]** STEP1の選択ボタンをSTEP2〜4と同じ横幅へ統一し、画像選択・追加ドロップ・任意の360°背景／作風JSONを説明する案内文へ更新。STEP3内の「プロンプトをコピーする（web貼り付け時）」ボタンを白から薄い黄色へ変更 / Matched the STEP1 selector width to STEP2–4, clarified image selection and optional companion inputs, and changed the STEP3 web-prompt copy button from white to pale yellow

### v6.1.0 (2026-09-12)

- Corrected the light-blue STEP guide so the STEP1 upload area stays dark and only its compact selection control is blue. STEP2 and STEP3 keep their original neutral raised edge, while STEP4 remains unchanged. / STEP案内の薄青表示を修正し、STEP1は広い読込領域を黒へ戻して小さな選択操作だけを薄青にしました。STEP2・3は従来の薄いグレーの立体枠へ戻し、STEP4は変更していません。
- The FourPanel workflow and custom-node downloads remain the separately verified v6.0.9 JSON and ZIP; this patch changes only the app guidance display. / FourPanelのワークフローとカスタムノードは、検証済みのv6.0.9 JSONとZIPを別々に配布するままです。今回の修正はアプリの案内表示だけです。

### v6.0.9 (2026-09-12)

- Changed only the four required STEP1–STEP4 actions to a shared light-blue style, making the minimum path clear while leaving secondary controls visually separate. / 必須のSTEP1～STEP4主操作だけを薄い青色へ統一し、補助操作と見分けやすくしました。
- Repackaged the unchanged reviewed FourPanel workflow and five-custom-node bundle as v6.0.9 so the app, workflow button, ZIP button, repository documentation, and note guidance all use one current version. / 検証済みのFourPanel生成内容は変えず、アプリ・ワークフロー・ZIP・Git文書・note案内の現行版をv6.0.9へ統一しました。

### v6.0.8 (2026-09-12)

- Moved the FourPanel custom-node ZIP from Git-tracked static files to a version-matched GitHub Release asset while retaining separate app buttons for JSON and ZIP. / FourPanelカスタムノードZIPをGit追跡の静的ファイルから同版GitHub Releaseアセットへ移し、アプリのJSON・ZIP別ボタンを維持しました。
- Removed obsolete workflow and ZIP downloads from the current Pages and Hugging Face trees. / 現在のPages・Hugging Faceツリーから旧ワークフローと旧ZIPを除去しました。
- Added the Apache-2.0 text and LightX2V origin notice required by the bundled PlagueKind-derived files. / 同梱PlagueKind由来ファイルに必要なApache-2.0本文とLightX2V出典表示を追加しました。
- Rewrote both the repository README and bundled README in inline `English / 日本語` format. / Git READMEと同梱READMEを一文内の`English / 日本語`形式へ統一しました。

### v6.0.7 (2026-09-12)

- Added adaptive dialogue timing, structured combined audio/visual repair, and up to five inspected candidates per segment. / 台詞の必要時間延長、音声・映像同時不合格時の構造化修正、区間ごとの最大5候補比較を追加しました。

### v6.0.6 (2026-09-12)

- Displayed the selected API model, quality, and size in the white settings control while keeping the black STEP4 button concise. / 白い設定欄に選択中のAPIモデル・品質・サイズを表示し、黒いSTEP4ボタンを簡潔にしました。

### v6.0.5 (2026-09-12)

- Added elapsed-time display while the pre-output STEP3 AI review is running. / STEP3の出力前AI精査中に経過秒数を表示しました。

### v6.0.1 (2026-09-11)

- Added GPT Image 2.5 Sunburst quality and size controls with bounded QA behavior. / GPT Image 2.5 Sunburstの品質・サイズ設定と回数を制限したQA動作を追加しました。

## License / ライセンス

The web application source is licensed under the repository [LICENSE](LICENSE). Bundled ComfyUI packages retain the separate licenses listed above. / Webアプリのソースはリポジトリの[LICENSE](LICENSE)に従い、同梱ComfyUIパッケージには上記の個別ライセンスが適用されます。
