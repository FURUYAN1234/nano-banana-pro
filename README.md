# Super FURU AI 4-koma System / Super FURU AI 4コマシステム

> Latest release: **v6.1.1** / 最新リリース: **v6.1.1**

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

Automatic repair is enabled by default. It makes one ordinary repair and only when grounded incidental-print defects persist may make one additional fallback, for at most two extra paid image requests. / 自動修正は既定ONです。通常修正を1回行い、根拠のある装飾印字の問題が残る場合だけ追加候補を1回作るため、追加の有料画像生成は最大2回です。

## Prompt and image safeguards / プロンプトと画像の確認

The prompt preserves explicit cast, dialogue, props, action, camera direction, and quiet beats while allowing variation in camera height, tilt, depth, and body acting. / 明示した登場人物、台詞、小物、動作、カメラ方向、静かな間を保持しながら、カメラの高低・傾き・奥行き・身体演技に変化を付けます。

Facial acting is described through eyebrows, eyelids, gaze, and mouth shape, with intensity chosen for the scene. This is prompt guidance and does not guarantee the model's rendered facial expression. / 顔演技・表情設計は眉、まぶた、視線、口の形を場面に応じて指定します。これはプロンプト上の指示であり、モデルが描く表情を保証しません。

Character sheets define identity rather than a reusable page layout. STEP4 asks the model to keep appearance while avoiding the reference sheet's labels, poses, boxes, and text. / キャラクターシートは人物の同一性資料として扱い、レイアウトの見本にはしません。STEP4は外見を保持しつつ、参照シートのラベル、ポーズ、枠、文字を持ち込まないよう指示します。

Functional surfaces such as phones, documents, books, and monitors are oriented toward the person using or reading them. Printed glyphs rotate and project with the physical surface instead of being forced upright to the viewer. / スマホ、書類、本、モニター等の機能面は使用者・読み手へ向けます。印字は読者へ無理に正立させず、実物の面と一緒に回転・透視投影するよう指定します。

Image QA checks panel structure, character identity, body and hand integrity, prop ownership, dialogue-only bubbles, text leakage, and observable surface orientation. Missing evidence is reported as unverified and does not by itself trigger a paid repair. / 画像QAはコマ構造、人物同一性、身体・手、小物の持ち主、吹き出しが台詞だけか、余分な文字、確認可能な面の向きを検査します。根拠不足は未確認として扱い、それだけを理由に有料修正を実行しません。

## MiniMax H3 and ComfyUI / MiniMax H3・ComfyUI動画化

The expanded `FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）` section offers a manual standard-template route and a dedicated Fused4step + SLA distribution. / `FURUの4コマ漫画を動画化（MiniMax H3 / ComfyUI）`を開くと、手動の標準テンプレート経路と専用Fused4step・SLA配布経路を選べます。

### Use the ComfyUI standard template yourself / ComfyUI標準テンプレートを自分で使う場合

Copy only the MiniMax H3 prompt and configure ComfyUI's standard Reference-to-Video workflow yourself. / MiniMax H3用プロンプトだけをコピーし、ComfyUI標準のReference-to-Videoワークフローを自分で設定します。

Connect the four-panel image only to `ref_image_0` and leave `ref_image_1`以降 disconnected. Start `Resolution Selector (Size)` at 16:9 and 0.4 megapixels, and set the `基本スケジューラー` to `normal`, with `字幕なし` as the default. / 4コマ画像は`ref_image_0`だけへ接続し、`ref_image_1`以降は未接続にします。`Resolution Selector (Size)`は16:9・0.4メガピクセル、`基本スケジューラー`は`normal`、既定は`字幕なし`です。

### Use the Fused4step + SLA distribution / Fused4step・SLA 配布ワークフローを使う場合

The app has separate buttons for the workflow JSON and the five-custom-node ZIP; `2つは別の操作` and each button downloads a different file. / アプリにはワークフローJSONとカスタムノード5点ZIPの別ボタンがあり、`2つは別の操作`として異なるファイルをダウンロードします。

- [Download workflow JSON](https://furuyan1234.github.io/nano-banana-pro/workflows/FourPanel_NonLM_4step_20260912203033_v6.0.9.json) / [ワークフローJSONをダウンロード](https://furuyan1234.github.io/nano-banana-pro/workflows/FourPanel_NonLM_4step_20260912203033_v6.0.9.json)
- [Download custom-node ZIP](https://github.com/FURUYAN1234/nano-banana-pro/releases/download/v6.0.9/ComfyUI_H3_FourPanel_NonLM_20260912203033_v6.0.9.zip) / [カスタムノードZIPをダウンロード](https://github.com/FURUYAN1234/nano-banana-pro/releases/download/v6.0.9/ComfyUI_H3_FourPanel_NonLM_20260912203033_v6.0.9.zip)

The current source tree intentionally contains no distribution ZIP. The custom-node ZIP is a named asset of the matching GitHub Release. / 現在のソースツリーには配布ZIPを意図的に登録せず、カスタムノードZIPは同じ版のGitHub Release専用アセットとして公開します。

Install all `5フォルダ` from the ZIP under `ComfyUI/custom_nodes/`, then place the JSON under `ComfyUI/user/default/workflows/` and restart ComfyUI. / ZIP内の`5フォルダ`をすべて`ComfyUI/custom_nodes/`へ配置し、JSONを`ComfyUI/user/default/workflows/`以下へ置いてComfyUIを再起動します。

Four required model weights are not bundled. Use `models.json` and the workflow's `不足モデル` display to open the `ダウンロード` sources under each model's own terms. / 必須モデル4点は同梱しません。`models.json`およびワークフローの`不足モデル`表示から各モデルの`ダウンロード`元を開き、個別条件を確認して取得します。

The current graph uses Fused 4ステップ, 音声補正2ステップ at denoise 0.5, and SLA Attention at 0.90. / 現行グラフはFused 4ステップ、音声補正2ステップ・denoise 0.5、SLA Attention 0.90を使用します。

H3 SLA Attention uses bundled `ComfyUI-PlagueKind-Nodes` and requires a compatible Triton environment; audio refinement uses bundled [ComfyUI-H3-AudioRefine](https://github.com/Adudeguyman/ComfyUI-H3-AudioRefine). / H3 SLA Attentionは同梱`ComfyUI-PlagueKind-Nodes`と対応Triton環境を使い、音声補正には同梱[ComfyUI-H3-AudioRefine](https://github.com/Adudeguyman/ComfyUI-H3-AudioRefine)を使用します。

Dialogue starts at five seconds and only lines that need more time extend up to 15 seconds; no-dialogue input uses 30 seconds. / 台詞は基本5秒とし、必要な台詞だけ最大15秒まで延長し、台詞なしの場合は30秒です。

The workflow performs 区間 generation and 検査, comparing 初回込み最大5候補. It proceeds immediately on an earlier pass and retains the best inspected candidate if all fail; 採用済みでも全検査合格とは限りません. / ワークフローは区間ごとに生成・検査し、初回込み最大5候補を比較します。途中で合格すれば直ちに次へ進み、全候補が不合格なら検査上の最良候補を保持します。採用済みでも全検査合格とは限りません。

The functionally identical supplied candidate completed a 39-second, seven-segment GPU/API run. A fresh GPU run from the final v6.0.9 ZIP and execution on another PC remain unverified. / 機能が同じ受領候補は39秒・7区間のGPU/API生成を完走しました。最終v6.0.9 ZIPからの新規GPU生成と別PC実行は未検証です。

## Package licenses and privacy / 配布ライセンスと個人情報

| Included folder / 同梱フォルダー | License / ライセンス |
|---|---|
| `ComfyUI-NanoBanana-H3` | MIT |
| `ComfyUI-MiniMax-H3-Long-Video` | GPL-3.0-only |
| `ComfyUI-Spectrum-MiniMax-H3` | GPL-3.0-or-later |
| `ComfyUI-H3-AudioRefine` | MIT |
| `ComfyUI-PlagueKind-Nodes` | MIT, with LightX2V-derived files covered by Apache-2.0. / MIT、LightX2V由来ファイルはApache-2.0。 |

The ZIP includes the required license texts and notices, including Apache-2.0 for the LightX2V-derived portions. / ZIPにはLightX2V由来部分のApache-2.0を含む必要なライセンス本文と表示を同梱します。

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

**Why are there two ComfyUI download buttons? / ComfyUIのダウンロードボタンが2つあるのはなぜですか？**  The JSON defines the workflow, while the ZIP supplies its five required custom-node folders and documentation. / JSONはワークフロー定義、ZIPは必須カスタムノード5フォルダーと導入文書です。

**Where are older packages? / 旧版はどこですか？**  Older source tags remain for audit history, but their bundled distributions are withdrawn. New installations must use the current v6.0.9 workflow button and v6.0.9 Release asset. / 旧タグは監査用履歴として残しますが、旧同梱配布物は取り下げ扱いです。新規導入は現在のv6.0.9ワークフローボタンとv6.0.9 Releaseアセットを使用してください。

**Is this the T2V/I2V/Ref2V repository? / T2V・I2V・Ref2Vのリポジトリですか？**  No. Those workflows are maintained separately in [comfyui-h3-workflows](https://github.com/FURUYAN1234/comfyui-h3-workflows). / いいえ。それらは別の[comfyui-h3-workflows](https://github.com/FURUYAN1234/comfyui-h3-workflows)で管理します。

## 📋 ChangeLog

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
