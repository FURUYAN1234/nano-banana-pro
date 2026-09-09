# OpenAI参照画像生成・元画像修復・Web利用案内 Implementation Plan

> **Execution:** Task 0–6の実装後、ユーザーが実API検証・H3配布の監査修正・デプロイ・note更新を承認。キャラシート2枚付きの実画像生成とQAが完了。2026-09-10の最新指示で公開工程を続行する。フルバックアップは除外。

**Goal:** Nano Banana ProのOpenAI画像生成へキャラシートを直接添付し、自動修復では元の完成画像を編集し、Web貼り付けを「サブスクの利用枠でAPI画像生成料金を節約する選択肢」として正確に説明する。

**Architecture:** STEP1が保持する画像を、API送信直前に用途付きの参照画像リストへ変換する。画像ありはImages APIの`/images/edits`、画像なしは既存の`/images/generations`を使用し、現在のモデル選択・手動プロンプト・元画像優先の品質判定を維持する。Geminiの画像送信処理とWeb用コピー本文を混同しない。

**Tech Stack:** 既存のReact 19、Vite 7、JavaScript ES modules、ブラウザ標準fetch/ReadableStream、node:test、ESLint。新しい依存パッケージ、バックエンド、SDKは追加しない。

**文書状態:** `RELEASE_PREPARATION`。2026-09-10更新。第11節は実装完了時点の履歴、第12節が現在の実行記録。

**パスの読み替え:** 実装場所は `C:/Users/sx717/.codex/worktrees/nano-banana-pro-openai-reference-editing`、branch `codex/openai-reference-editing`。本文の実装・検証コマンドの旧アプリルートはこのworktreeへ読み替える（調査時点の履歴と本書保存先は除く）。元のmainには未統合。続きのAPI検証も同じworktreeを使用する。

**調査基準:** `C:/Users/sx717/Antigravity/nano-banana-pro`、package version `5.9.5`、HEAD `018db15598d0d67acab02dc74d81c6ae1c5fc8e4`。文書作成前のアプリGit作業ツリーはclean。root `PLAN.md`には既存の未コミット変更があるため、内容を破棄しない。

## Global Constraints

- 当初の仕様書のみの依頼は完了済み。最新指示による今回の納品範囲はTask 0–6のローカル実装・検証。実APIの認証確認・生成・品質QAを含むTask 7は実行しない。
- 最新の実装担当指定はAstra・高。許可範囲だけを実装し、モデル設定をこちらで変更しない。
- 今回も将来のローカル実装も、commit・push・tag・deploy・release・upload・backupを自動的には含まない。独立した明示指示が必要。
- `C:/Users/sx717/Antigravity/AGENTS.md` → `PLAN.md` → アプリの`AGENTS.md` → `HANDOFF.md` → `docs/project_standards.md`の順で確認する。古いHANDOFFの「未完了」を新規操作の許可にしない。
- 四コマ数、読み順、台詞、話者、人物同一性、衣装指定、視線、手と小道具、カメラ、タイトルと吹き出しの書体を保つ。生成プロンプトの短縮・全面再設計はしない。
- 既存の5つのAPI品質選択肢、初期値Sunburst/xhigh、手動2.0選択、リロード時のリセットを維持。自動モデル切替を追加しない。
- 元画像を先に保存し、具体的な品質NGに対して最大1回だけ修復する。未確認QA・同点・比較失敗・修復失敗では元画像を保つ。
- APIキーは既存`api-session.js`のメモリ管理を再利用。キー値を読み出して調査・表示・ログ化・保存しない。API実行に必要な既存の内部取得とAuthorization送信以外へ広げない。
- 画像本文、data URL、APIリクエスト本文、Authorizationをログや進捗履歴へ出さない。参照画像の役割と枚数だけを記録する。
- 新しいImages edits経路で失敗した時、画像を外す、モデルを変更する、別APIへ転送する、同じPOSTを無断再送する処理は禁止。
- Web貼り付け・Gemini専用修正・MiniMax H3の既存ボタン位置、リンク先、配布物、コピー動作を保つ。説明変更のために生成ロジック以外のUIを再構成しない。
- スケッチエディタ、キャラシート生成機能、OCR/後段組版、コマ単位マスク編集、透過素材、モデル自動比較、動画機能は今回の実装対象外。
- 文書内コードは設計時の例。実装済みコードの正本は上記worktree。追加の異常系強化と既存試験の契約更新は第11節を参照。

---

## 1. 受け入れ条件と今回の停止位置

| ID | 実装時に満たす条件 | 担当Task |
| --- | --- | --- |
| R01 | OpenAI初回生成にアップロード済みキャラシートの実データを送る | 1–3 |
| R02 | 画像の送信順と用途を明示し、キャラシートを四コマのレイアウトとして模倣させない | 1、3 |
| R03 | 有効な360°背景は背景参照として区別して添付する | 1、3 |
| R04 | 参照画像がない場合は既存の文章生成経路を保つ | 2、3 |
| R05 | OpenAI修復の画像1は元の完成画像。その後に初回と同じキャラ・背景参照を置く | 1、3、4 |
| R06 | 修復指示を変更・維持・確認に整理し、許可された修正に必要な物理的変化だけ認める | 4 |
| R07 | 最大1回の修復、元画像保存、QA、直接比較、元画像復帰を保つ | 3、4 |
| R08 | editsの完了イベントを受信し、途中画像を完成画像として採用しない | 2 |
| R09 | editsのタイムアウトはレスポンス本文の読み終わりまで有効。失敗後の自動再POSTはゼロ | 2 |
| R10 | 画像数・形式・入力長・プロンプト長を送信前検証し、黙って画像を間引かない | 1、2 |
| R11 | STEP4の「APIは画像添付不可」「おまかせ生成」を新しい実装に合う説明へ変更 | 5 |
| R12 | Web貼り付けをサブスク利用枠とAPI画像生成料金の節約の観点で案内 | 5 |
| R13 | サブスクとAPIは別会計、Web利用上限あり、前段API料金は別途発生し得ることを明記 | 5 |
| R14 | コピー・Webリンク操作だけで画像生成APIや品質QAを呼ばない | 5、6 |
| R15 | Geminiの生成経路・参照画像処理・手動修正ボタンに回帰を起こさない | 3–6 |
| R16 | 手動編集したプロンプト本文は一字も置換しない。API専用参照説明の追記を案内する | 1、3、5 |
| R17 | READMEのJP/EN本文・STEP4データフロー・Web案内・送信先を同じ仕様へ同期 | 5 |
| R18 | 人名・場面・失敗例のproductionハードコードを追加しない | 全Task |
| R19 | ローカル試験と実API証拠を分け、未実行の画質改善を成功と報告しない | 6、7 |
| R20 | 最新指示どおりローカル実装・検証まで。実API検証・version変更・公開を行わない | 全Task |

最新の納品条件はR01–R18のローカル実装・検証とR19–R20の証拠・停止境界の遵守。実APIの受理や画質改善は未検証であり、ローカル試験の成功から断定しない。

後日「この仕様で実装して」と指示された場合の標準到達点はTask 6のローカル実装・検証まで。Task 7の実API検証はその時のユーザー指示・費用承認範囲に従う。未実行なら「ローカル実装確認済み／実画像への効果未確認」と区別する。

## 2. 実装前の調査時点で確認した事実（履歴）

行番号は上記HEADに対する目安。実装開始時は関数名・文言で位置を再検索する。

| 対象ファイル（絶対パス） | 現行状態 |
| --- | --- |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/openai.js` | `buildOpenAIImageRequestBody`はmodel/prompt/quality等だけを作る。129行付近のPOST先は`/v1/images/generations`。画像添付引数はない |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/hooks/useMangaWorkflow.js` | 108行付近に`images`、177行付近に`bg360Image`。通常画像と360°画像はアップロード処理で分離される |
| 同上 `regenerateImage` | 1192行付近はOpenAIへprompt/qualityのみを渡す。1214行付近のQAでは候補画像と`images`を渡す。1263行付近の修復は元画像を渡さず再生成する |
| 同上 Gemini分岐 | `generationOptions.referenceImages`が明示されればそれを使い、なければ有効な4枚の背景cropを使う。ここをOpenAIの参照計画で上書きしない |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/image-quality-failsafe.js` | 元画像→QA→最大1修復→QA→直接比較。修復が明確に優れなければ元画像を維持。共通関数なのでGemini既定動作を保つ必要がある |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/image-quality-qa.js` | QAと比較のキャラ参照はすでに実画像。新しいAPI入力配列をそのままQAに再利用してはいけない |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step4Panel.jsx` | 614行付近に「画像を直接添付できない」「おまかせ生成」。625行付近に「完璧な4コマ」「劇的に向上」。新仕様と食い違う |
| `C:/Users/sx717/Antigravity/nano-banana-pro/README.md` | STEP4行にキャラ・背景画像を添付しない説明。OpenAI節に旧モデルのみを現行経路として記述。Web案内に費用の説明が不足 |
| `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/openai-image-settings.js` | 2.0/high、Flare high/xhigh、Sunburst high/xhigh。初期値Sunburst/xhigh。ここは変更しない |

### 2.1 この実装で扱う既存の注意点

- `readOpenAIImageStream`は現在`image_generation.*`のみを認識する。新しいeditsには`image_edit.*`を追加する必要がある。
- 現行ストリームは通信断時に途中画像を返す分岐がある。新しいedits経路ではその分岐を禁止し、最終完了イベントを必須とする。画像なし旧generation経路の挙動変更はこの仕様に混ぜない。
- 現行`generateImageWithOpenAI`はfetchが返った段階でタイマーを解除する。新edits関数は本文読み取り・最終画像取得までタイマーを保持する。
- 画像なし旧generation経路には通信失敗時の非ストリーム再試行がある。この既存挙動は保持し、新editsには引き継がない。試験記録では論理候補数と実POST回数を別に数える。
- 背景cropのOpenAI添付は今回採用しない。現行ChatGPT用プロンプトの背景説明がパノラマ1枚を前提にしているため、OpenAIは有効なパノラマ1枚を使う。Geminiのcrop4枚は従来どおり。

## 3. 昨日の記事から採用する原則と公式確認

2026-09-09のCodexタスク「nano banana pro更新への活用性を評価」（ID `01a085b8-79e8-7e60-b3d7-a8f94c48ffca`）に5本の資料がある。記事の数値・成功例を実証済みの保証にしない。

| 昨日の資料 | 今回の採用部分 | 今回は採用しない部分 |
| --- | --- | --- |
| 公式のプロンプト設計と機能大全 | 参照画像の役割、具体的な保持条件、変更に伴う光・影の扱い | 四コマの長い契約を1–3文へ短縮する解釈 |
| 9つの変更点と3つの応用法 | 変更／維持／確認を修復指示へ取り込む | 無制限の段階生成、勝手なFlare→Sunburst切替 |
| AI動画のキャラクターを崩さず作るガイド | 既存キャラシートを各生成の基準画像として使う | 新規シート生成UI、動画機能追加 |
| 実用的な検証事例15選 | 顔だけでなく視線・手・小物・背景の変化を見比べる | 「粒状ノイズ解消」「完全一貫性」の断定 |
| プロンプト100個の教科書 | 画像で形・位置、文章で役割と描画条件を伝える | Sketch/CanvasをAPIの内蔵機能として紹介すること |

記事の保存元は、順に次のファイルと上記タスク内のユーザー本文。実装に必要な要点は本書に含めてあるため、毎回全記事を再読する必要はない。

- `C:/Users/sx717/.codex/attachments/eb433987-3abf-4faf-a5eb-04013619f2ef/pasted-text.txt`
- `C:/Users/sx717/.codex/attachments/53bb00b1-03fd-488e-9e91-c9d01e96281b/pasted-text.txt`
- `C:/Users/sx717/.codex/attachments/071c9e3e-df0a-452a-99b2-f32b05b4e51e/pasted-text.txt`
- 検証事例15選は上記Codexタスクのユーザー本文。
- `C:/Users/sx717/.codex/attachments/3455d5a5-3a6c-4c1e-93fa-26ff7527b5fb/pasted-text.txt`

### 3.1 公式確認済みの契約（2026-09-10）

- [Images edits API](https://developers.openai.com/api/reference/resources/images/methods/edit)：GPT Image 2.5 Flare/Sunburstと2.0の編集モデル指定、複数の画像入力、Base64 data URLのJSON入力、編集ストリームを確認。参照上限は16画像。JSONの`images[].image_url`の長さ上限は20,971,520文字。新APIの送信形はTask 2に固定する。
- [画像参照からの新規生成](https://developers.openai.com/api/docs/guides/image-generation#edit-images)：editsは元画像編集だけでなく、画像を参考に新しい画像を生成する用途も持つ。
- [画像プロンプト設計](https://learn.chatgpt.com/docs/image-generation#use-multiple-reference-images)：画像の順番と役割を明示し、部分修正では変更・維持を具体的に示す方針を確認。
- [ChatGPT Plusの説明](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)：Web側の画像生成機能、API利用の別課金、利用上限があることを確認。本文ではプラン料金の数字や上限回数を固定しない。
- [API料金](https://developers.openai.com/api/docs/pricing)：API画像の入出力はAPI課金の対象。参照追加が無償であると説明しない。

公式Web UIの機能とAPIの機能は同一ではない。API仕様に変更が見つかった場合はTask 2のrequest-shapeテストを先に更新する。プロンプトの意味や費用上限を変える代替実装を黙って選ばない。

## 4. 実装後のデータフロー

```text
STEP1 images（キャラシート） ─┐
有効な360°パノラマ1枚 ──────┼→ 用途付き参照計画（メモリ内だけ）
現在の編集済みprompt ───────┘                 │
                                  画像あり: /images/edits
                                  画像なし: 既存/generations
                                              │
                                      完成画像を保存・表示
                                              │
                      候補 + 元キャラシート → 既存QA
                              │合格/未確認/修復OFF → 元画像
                              │具体的NG + 修復ON
                              ▼
              元完成画像を画像1 + 同じ参照画像 + 限定修復prompt
                              │
                         /images/edits 1回
                              │
                        修復QA → 直接比較
                              │
                   明確に改善: 修復採用 / それ以外: 元画像

Web貼り付け: 現在のpromptをコピー → ユーザーがWebへ画像と添付
              この操作から画像API・QA・自動修復は呼ばない
```

### 4.1 参照計画の決定表

| 入力状態 | OpenAIに送る画像・順序 | 処理 |
| --- | --- | --- |
| キャラ2枚、背景OFF | キャラ1、キャラ2 | editsで新規マンガ |
| キャラ2枚、背景ON、有効なパノラマあり | キャラ1、キャラ2、背景 | editsで新規マンガ |
| 背景OFFだがstateに古い背景あり | キャラだけ | 無効化した背景は送らない |
| 背景ON、パノラマなし | キャラだけ | 存在しない背景を添付済みと表示しない |
| キャラなし、背景なし | 画像なし | 既存generations |
| キャラなし、有効背景あり | 背景1枚 | 背景参照としてedits |
| 上記画像を修復 | 元完成画像、キャラ1…、有効背景 | editsで限定修復 |
| 初回参照が16枚 | 16枚で初回は実行可 | 修復に元画像を追加して17枚になる場合は修復POSTを行わず元画像を維持・理由を表示 |
| 初回参照が17枚以上 | 送信なし | 枚数上限エラー。先頭16枚への切捨ては禁止 |
| 同じキャラ画像を複数追加 | 同一用途の完全一致だけ重複除去 | 初出の順番を保つ |
| 同一画像がキャラと背景の両用途にある | 送信なし | 用途の重複エラー。勝手に用途を選ばない |
| 不正形式、空Base64、対応外MIME、上限超過 | 送信なし | 該当画像の順番だけを示すエラー |

### 4.2 プロンプトの優先順位

1. ユーザーが現在編集している本文を正本とする。API送信時に元シナリオから再組立てしない。
2. 修復ではその本文＋既存の限定修復契約を使う。
3. 実際に添付する画像の番号・用途だけをAPI送信直前に末尾へ追記する。
4. キャラ参照は顔、髪、目、体格、衣装等の同一性のために使う。シートのコマ割り、説明文、背景、固定ポーズは漫画へ持ち込まない。
5. 本文の明示的衣装変更、行動、視線、カメラ、画風指定は参照写真の偶発的なポーズ・構図より優先する。明示されていない衣装変更はしない。
6. 背景参照は環境・光・色の参考。出力比率、人物、台詞、コマ数を背景画像から変更しない。
7. 修復の「元画像を維持」は、検出された誤りを維持する指示ではない。問題部分とその修正に不可欠な接触・局所影だけを変更可能にする。

## 5. ファイル別の責務

以下のprefixをこの節・Task内の相対表記に適用する：`C:/Users/sx717/Antigravity/nano-banana-pro/`。実行コマンドは必ずこのディレクトリを作業ディレクトリにする。

| 操作 | ファイル | 責務 |
| --- | --- | --- |
| 新規 | `src/lib/openai-image-references.js` | 画像正規化、用途・順序、参照補足、最大16枚の検証。ネットワーク・React・キーを持たない |
| 更新 | `src/lib/openai.js` | 画像ありrequest組立て、新edits送信、編集SSEの完了確認、10分の通信期限 |
| 更新 | `src/hooks/useMangaWorkflow.js` | 初回と修復の画像を結線。既存Gemini分岐・QA・履歴を維持 |
| 更新 | `src/lib/image-quality-failsafe.js` | source-image修復文の選択肢だけ追加。判定順・再試行回数を変更しない |
| 更新 | `src/components/Step4Panel.jsx` | 新仕様、課金とWeb貼り付けの説明。既存位置・コピーとリンクを維持 |
| 更新 | `README.md` | JP/EN本文・STEP4入出力・費用境界・プライバシーを同期 |
| 新規 | `tests/openai-image-references.test.mjs` | 正規化・順序・役割・上限・本文保持 |
| 新規 | `tests/openai-image-edit-request.test.mjs` | 実関数へのfetch stubでURL・body・送信回数・異常応答を検証 |
| 更新 | `tests/openai-image-stream.test.mjs` | editsイベント、完了必須、チャンク分割、通信断 |
| 更新 | `tests/image-quality-failsafe.test.mjs` | source-image修復文、元画像維持、最大1修復 |
| 更新 | `tests/workflow-image-quality-qa.test.mjs` | 新結線と既存QAの参照位置を検証 |
| 新規 | `tests/openai-web-guidance.test.mjs` | UIの費用説明・誤案内除去の軽い静的確認 |
| 条件付き更新 | `tests/prompt-manual-edit-ui.test.mjs` | 元の本文保持案内に加え、API専用補足の説明を確認 |

`src/lib/prompts.js`、`prompt-assembler.js`、`shared-image-quality.js`、`openai-image-settings.js`、`imagen.js`、H3関連ファイル、`package.json`、lockfile、version定数、公開物は原則変更しない。根拠なく対象を増やさない。

## Task 0: 実装開始時の引き継ぎ確認

**Files:** 読み取りはroot/appの指示ファイル、本書、対象ソース。アプリへの書込みはまだしない。

**Interfaces:** Consumes＝後日のユーザー実装指示。Produces＝作業ツリー・基準revision・実行境界の確認。

- [x] **Step 0.1: 指示とGit状態を読む**

```powershell
Set-Location -LiteralPath 'C:\Users\sx717\Antigravity\nano-banana-pro'
git status --short
git rev-parse HEAD
git diff -- src/lib/openai.js src/hooks/useMangaWorkflow.js src/components/Step4Panel.jsx
```

期待：現行HEADが本書と違えば差分を確認して適用位置を調整する。既存の変更はユーザーのものとして保つ。cleanにするためのreset/checkout/削除は行わない。

- [x] **Step 0.2: 調査済み契約のdriftだけを確認する**

第3.1節のAPI referenceでJSON画像入力とモデル対応が継続しているか読む。既存のAstraモデル設定やAPIキーを調べ直す必要はない。本書の機能境界を変える情報がなければTask 1へ進む。

- [x] **Step 0.3: 進捗の正本を本書にする**

root PLANのポインタ先は本書。HANDOFFに同じチェックリストを複製しない。実装開始時は`IMPLEMENTING`、Task 6完了後は`LOCAL_IMPLEMENTATION_VERIFIED_API_NOT_RUN`へ更新する。

## Task 1: 純粋な参照画像計画を作る

**Files:** Create `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/openai-image-references.js`、Create `C:/Users/sx717/Antigravity/nano-banana-pro/tests/openai-image-references.test.mjs`。

**Interfaces:**

```js
normalizeOpenAIImageDataUrl(value, label = '参照画像') => string
buildOpenAIReferencePlan({
  characterImages = [], backgroundImage = null, backgroundEnabled = false,
  originalCandidate = null, // {base64Img, mimeType}。修復の時だけ指定
}) => {
  imageInputs: Array<{image_url: string}>,
  rolePrompt: string,
  counts: {character: number, background: number, original: number},
}
appendOpenAIReferencePrompt(prompt, plan) => string
```

- [x] **Step 1.1: 以下のテストを作り、REDを確認する**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildOpenAIReferencePlan,
  appendOpenAIReferencePrompt,
  normalizeOpenAIImageDataUrl,
} from '../src/lib/openai-image-references.js';

// 非productionのrequest-shape用データ。生成画質の証拠には使用しない。
const image = text => `data:image/png;base64,${Buffer.from(text).toString('base64')}`;

test('character sheets precede the active panorama and have separate roles', () => {
  const a = image('sheet-a');
  const b = image('sheet-b');
  const bg = image('panorama');
  const plan = buildOpenAIReferencePlan({
    characterImages: [a, b], backgroundImage: bg, backgroundEnabled: true,
  });
  assert.deepEqual(plan.imageInputs, [a, b, bg].map(image_url => ({image_url})));
  assert.deepEqual(plan.counts, {character: 2, background: 1, original: 0});
  assert.match(plan.rolePrompt, /Image 1: CHARACTER REFERENCE/);
  assert.match(plan.rolePrompt, /Image 3: BACKGROUND REFERENCE/);
});

test('repair prepends the actual original before the unchanged reference order', () => {
  const a = image('sheet-a');
  const plan = buildOpenAIReferencePlan({
    characterImages: [a],
    originalCandidate: {base64Img: Buffer.from('original').toString('base64'), mimeType: 'image/png'},
  });
  assert.equal(plan.imageInputs[0].image_url, image('original'));
  assert.equal(plan.imageInputs[1].image_url, a);
  assert.match(plan.rolePrompt, /Image 1: SOURCE IMAGE TO EDIT/);
});

test('disabled background never leaks into a request', () => {
  const plan = buildOpenAIReferencePlan({backgroundImage: image('old-bg'), backgroundEnabled: false});
  assert.equal(plan.imageInputs.length, 0);
});

test('manual prompt is retained exactly as the prefix, and empty plan changes nothing', () => {
  const text = '  手動台詞「そのまま。」\r\nCamera: overhead\n';
  const empty = buildOpenAIReferencePlan({});
  assert.equal(appendOpenAIReferencePrompt(text, empty), text);
  const plan = buildOpenAIReferencePlan({characterImages: [image('a')]});
  assert.equal(appendOpenAIReferencePrompt(text, plan).slice(0, text.length), text);
});

test('duplicate identical character inputs are removed without reordering', () => {
  const a = image('a');
  const b = image('b');
  const plan = buildOpenAIReferencePlan({characterImages: [a, a, b]});
  assert.deepEqual(plan.imageInputs, [a, b].map(image_url => ({image_url})));
});

test('over-limit initial and repair requests fail without silent truncation', () => {
  const sheets = Array.from({length: 16}, (_, i) => image(`sheet-${i}`));
  assert.equal(buildOpenAIReferencePlan({characterImages: sheets}).imageInputs.length, 16);
  assert.throws(() => buildOpenAIReferencePlan({characterImages: [...sheets, image('17')]}), /16枚/);
  assert.throws(() => buildOpenAIReferencePlan({
    characterImages: sheets,
    originalCandidate: {base64Img: 'eA==', mimeType: 'image/png'},
  }), /16枚/);
});

test('conflicting roles and unsupported inputs fail explicitly', () => {
  const a = image('same');
  assert.throws(() => buildOpenAIReferencePlan({characterImages: [a], backgroundImage: a, backgroundEnabled: true}), /用途/);
  for (const value of ['', 'https://example.com/a.png', 'data:image/svg+xml;base64,YQ==', 'data:image/png;base64,%%%']) {
    assert.throws(() => normalizeOpenAIImageDataUrl(value), /画像/);
  }
  assert.throws(() => buildOpenAIReferencePlan({characterImages: 'not-an-array'}), /配列/);
});
```

Run: `node --test tests/openai-image-references.test.mjs`。期待：未作成module/importでRED。画像生成APIは呼ばれない。

- [x] **Step 1.2: 次の純粋関数を実装する**

```js
export const OPENAI_IMAGE_INPUT_LIMIT = 16;
export const OPENAI_IMAGE_DATA_URL_MAX_CHARS = 20971520;

export function normalizeOpenAIImageDataUrl(value, label = '参照画像') {
  const match = typeof value === 'string'
    ? value.trim().match(/^data:(image\/(?:png|jpeg|webp));base64,([\s\S]+)$/i)
    : null;
  if (!match) throw new Error(`${label}: PNG・JPEG・WebPの画像データが必要です。`);
  const base64 = match[2].replace(/\s+/g, '');
  const dataUrl = `data:${match[1].toLowerCase()};base64,${base64}`;
  if (dataUrl.length > OPENAI_IMAGE_DATA_URL_MAX_CHARS) {
    throw new Error(`${label}: 画像データがAPIの入力上限を超えています。画像を小さくして再度読み込んでください。`);
  }
  const valid = base64.length % 4 === 0 && /^[A-Za-z0-9+/]*={0,2}$/.test(base64);
  if (!base64 || !valid) throw new Error(`${label}: 画像データの形式が不正です。`);
  return dataUrl;
}

export function buildOpenAIReferencePlan({
  characterImages = [], backgroundImage = null, backgroundEnabled = false,
  originalCandidate = null,
} = {}) {
  if (!Array.isArray(characterImages)) throw new Error('キャラクター参照画像は配列で指定してください。');
  const entries = [];
  const seen = new Map();
  const push = (role, value, label) => {
    const image_url = normalizeOpenAIImageDataUrl(value, label);
    if (seen.has(image_url)) {
      if (seen.get(image_url) !== role) throw new Error('同一画像が異なる用途で指定されています。キャラと背景の指定を確認してください。');
      return;
    }
    seen.set(image_url, role);
    entries.push({role, image_url});
  };
  if (originalCandidate) {
    const mime = originalCandidate.mimeType || 'image/png';
    push('original', `data:${mime};base64,${originalCandidate.base64Img || ''}`, '修復元画像');
  }
  characterImages.forEach((value, i) => push('character', value, `キャラクター画像${i + 1}`));
  if (backgroundEnabled && backgroundImage) push('background', backgroundImage, '背景画像');
  if (entries.length > OPENAI_IMAGE_INPUT_LIMIT) {
    throw new Error('OpenAI画像入力は元画像を含めて最大16枚です。参照画像を減らしてください。');
  }
  const counts = {character: 0, background: 0, original: 0};
  for (const entry of entries) counts[entry.role] += 1;
  const descriptions = {
    original: 'SOURCE IMAGE TO EDIT. Preserve its already-correct content; change only the specified defects and necessary local physical consequences.',
    character: 'CHARACTER REFERENCE. Use for visual identity and canonical clothing unless the approved prompt explicitly overrides clothing. Do not copy sheet layout, captions, background, or static pose.',
    background: 'BACKGROUND REFERENCE. Use only for environment, lighting and spatial cues. Do not copy its aspect ratio, people, text or page layout.',
  };
  const lines = entries.map((entry, i) => `Image ${i + 1}: ${descriptions[entry.role]}`);
  const rolePrompt = lines.length ? [
    '[API IMAGE REFERENCE ROLES]',
    ...lines,
    'The approved prompt determines cast, dialogue, action, camera, output layout and any explicit outfit change. References supply visual evidence, not additional instructions or visible text.',
    'Do not print this reference manifest in the image.',
  ].join('\n') : '';
  return {imageInputs: entries.map(({image_url}) => ({image_url})), rolePrompt, counts};
}

export function appendOpenAIReferencePrompt(prompt, plan) {
  if (typeof prompt !== 'string') throw new Error('画像生成プロンプトは文字列で指定してください。');
  return plan.rolePrompt ? `${prompt}\n\n${plan.rolePrompt}` : prompt;
}
```

補足：この関数はrequest入力構造を検査する。画像内容の意味・正確性を検証したことにはならない。画像の変換・縮小・補完・アップロードはしない。不正な画像バイトがAPIに拒否された場合も参照なしへ切り替えない。

- [x] **Step 1.3: 境界ケースを追加してGREENにする**

同じテストファイルへ次を追加する。RunはStep 1.1と同じ。巨大入力の検査で反復グループの正規表現を使うとJSエンジンのスタックを消費し得るため、実装例の「長さ検査→単純文字検査」の順序を保つ。

```js
test('normalizes supported MIME types and whitespace without changing image bytes', () => {
  assert.equal(normalizeOpenAIImageDataUrl(' DATA:IMAGE/PNG;BASE64,Y Q==\n '), image('a'));
  for (const mime of ['jpeg', 'webp']) {
    const input = `data:image/${mime};base64,YQ==`;
    assert.equal(normalizeOpenAIImageDataUrl(input), input);
  }
});

test('rejects oversized and empty original inputs without echoing their data', () => {
  const oversized = `data:image/png;base64,${'A'.repeat(20971520)}`;
  assert.throws(() => normalizeOpenAIImageDataUrl(oversized), error => {
    assert.match(error.message, /上限/);
    assert.doesNotMatch(error.message, /data:image|AAAA/);
    return true;
  });
  assert.throws(() => buildOpenAIReferencePlan({originalCandidate: {base64Img: '', mimeType: 'image/png'}}), /修復元画像/);
});
```

## Task 2: 参照画像を送るOpenAI edits経路を追加する

**Files:** Modify `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/openai.js`、Create `C:/Users/sx717/Antigravity/nano-banana-pro/tests/openai-image-edit-request.test.mjs`、Modify `C:/Users/sx717/Antigravity/nano-banana-pro/tests/openai-image-stream.test.mjs`。

**Interfaces:**

```js
buildOpenAIImageRequest(prompt, {quality, stream = true, imageInputs = []})
  => {url: string, body: object, isEdit: boolean}
generateImageWithOpenAI(prompt, status, {quality, imageInputs = []})
  => Promise<{base64Img, mimeType: 'image/png', usedModel}>
readOpenAIImageStream(response, status, {
  eventPrefix = 'image_generation', requireFinal = false,
} = {}) => Promise<string>
```

`imageInputs`はTask 1の出力。`image[]`や`input_image`等の別API表現と混ぜない。既存`buildOpenAIImageRequestBody`の引数・結果は変えず、既存テストとの互換性を保つ。

- [x] **Step 2.1: requestと送信回数のテストを先に作る**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildOpenAIImageRequest, generateImageWithOpenAI, setOpenAIApiKey} from '../src/lib/openai.js';

const ref = {image_url: 'data:image/png;base64,YQ=='};

test('edits request carries image data without changing the selected model or quality', () => {
  const request = buildOpenAIImageRequest('approved', {quality: 'sunburst-xhigh', imageInputs: [ref]});
  assert.equal(request.url, 'https://api.openai.com/v1/images/edits');
  assert.equal(request.isEdit, true);
  assert.deepEqual(request.body.images, [ref]);
  assert.equal(request.body.model, 'gpt-image-2.5-sunburst');
  assert.equal(request.body.quality, 'xhigh');
  assert.equal(request.body.prompt, 'approved');
  assert.equal(request.body.n, 1);
  assert.equal(request.body.output_format, 'png');
  assert.equal(request.body.moderation, 'low');
  assert.equal(request.body.stream, true);
  assert.equal(request.body.partial_images, 1);
  assert.equal('input_fidelity' in request.body, false);
});

test('explicit 2.0 remains 2.0 and accepts the same reference path', () => {
  const request = buildOpenAIImageRequest('approved', {quality: 'gpt-image-2-high', imageInputs: [ref]});
  assert.equal(request.body.model, 'gpt-image-2');
  assert.equal(request.body.quality, 'high');
  assert.equal(request.isEdit, true);
});

test('no references retains the existing generation body', () => {
  const request = buildOpenAIImageRequest('text only', {});
  assert.equal(request.url, 'https://api.openai.com/v1/images/generations');
  assert.equal('images' in request.body, false);
});

test('edit transport sends exactly one POST and never falls back after ambiguous fetch failure', async () => {
  const savedFetch = globalThis.fetch;
  let calls = 0;
  setOpenAIApiKey('test-key');
  globalThis.fetch = async () => { calls++; throw new TypeError('Failed to fetch'); };
  try {
    await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]}), /Failed to fetch/);
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('edit request reaches the real request builder and returns completed SSE data', async () => {
  const savedFetch = globalThis.fetch;
  const calls = [];
  setOpenAIApiKey('test-key');
  globalThis.fetch = async (url, options) => {
    calls.push({url, body: JSON.parse(options.body)});
    return new Response('data: {"type":"image_edit.completed","b64_json":"ZmluYWw="}\n\n', {
      headers: {'content-type': 'text/event-stream'},
    });
  };
  try {
    const result = await generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]});
    assert.equal(result.base64Img, 'ZmluYWw=');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.openai.com/v1/images/edits');
    assert.deepEqual(calls[0].body.images, [ref]);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});
```

Run: `node --test tests/openai-image-edit-request.test.mjs`。期待：新export未実装によるRED。`test-key`はテスト専用の無効な文字列で、fetch stubの外へ送信しない。

- [x] **Step 2.2: request builderを追加する**

`openai.js`にTask 1の定数・正規化関数をimportし、既存builderの後に追加する。

```js
import {OPENAI_IMAGE_INPUT_LIMIT, normalizeOpenAIImageDataUrl} from './openai-image-references.js';

export function buildOpenAIImageRequest(prompt, {quality, stream = true, imageInputs = []} = {}) {
  if (typeof prompt !== 'string' || !prompt.trim()) throw new Error('画像生成プロンプトが空です。');
  if (prompt.length > OPENAI_IMAGE_PROMPT_MAX_CHARS) throw new Error('参照説明を含む画像生成プロンプトが32,000文字を超えています。本文を確認してください。');
  if (!Array.isArray(imageInputs)) throw new Error('OpenAI参照画像は配列で指定してください。');
  if (imageInputs.length > OPENAI_IMAGE_INPUT_LIMIT) throw new Error('OpenAI画像入力は元画像を含めて最大16枚です。');
  const images = imageInputs.map((item, i) => ({
    image_url: normalizeOpenAIImageDataUrl(item?.image_url, `送信画像${i + 1}`),
  }));
  const isEdit = images.length > 0;
  return {
    url: `https://api.openai.com/v1/images/${isEdit ? 'edits' : 'generations'}`,
    body: {...buildOpenAIImageRequestBody(prompt, {quality, stream}), ...(isEdit ? {images} : {})},
    isEdit,
  };
}
```

これは2026-09-10のJSON API仕様を使う。multipart、Files API事前アップロード、Responses API経由のプロンプト再解釈は不要。既存のブラウザ→OpenAI直接送信を保つ。CORSで失敗してもproxy/別サービス/サーバーを追加しない。

- [x] **Step 2.3: SSE parserへ編集イベントと完了必須オプションを追加する**

既存の`readOpenAIImageStream`全体を以下へ置換する。イベント名のパラメータ化と、editsで完成画像を必須にする分岐を追加する。旧generationの途中画像救済は既定値で維持する。画像が完成した後でも、明示的なAPIエラーや不正JSONを成功扱いにしない。

```js
export const readOpenAIImageStream = async (
  response,
  statCallback = () => {},
  {eventPrefix = 'image_generation', requireFinal = false} = {},
) => {
  if (!response.body || typeof response.body.getReader !== 'function') {
    throw new Error('OpenAI画像ストリームを読み取れませんでした。');
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let finalImage = '';
  let latestPartialImage = '';
  let readFailed = false;

  const processEvent = rawEvent => {
    const data = rawEvent.split(/\r?\n/)
      .filter(line => line.startsWith('data:'))
      .map(line => line.slice(5).trimStart()).join('\n').trim();
    if (!data || data === '[DONE]') return;
    let event;
    try {
      event = JSON.parse(data);
    } catch {
      throw new Error('OpenAI画像ストリームの応答形式が不正です。');
    }
    if (event?.type === 'error' || event?.error) {
      const message = String(event.error?.message || event.message || 'OpenAI画像生成ストリームでエラーが発生しました。');
      throw new Error(requireFinal ? message.replace(/data:image\/[^\s"']+/g, '[image data omitted]') : message);
    }
    if (event?.type === `${eventPrefix}.partial_image`) {
      if (event.b64_json) latestPartialImage = event.b64_json;
      statCallback(`[OpenAI] 途中画像を受信しました (${Number(event.partial_image_index || 0) + 1})。最終画像を待機中...`);
    }
    if (event?.type === `${eventPrefix}.completed` && event.b64_json) {
      if (requireFinal && (typeof event.b64_json !== 'string' || !event.b64_json.trim())) {
        throw new Error('OpenAI画像編集の完成画像データが不正です。');
      }
      finalImage = event.b64_json;
    }
  };

  try {
    while (true) {
      let chunk;
      try {
        chunk = await reader.read();
      } catch (error) {
        readFailed = true;
        throw error;
      }
      buffer += decoder.decode(chunk.value || new Uint8Array(), {stream: !chunk.done});
      let boundary = buffer.match(/\r?\n\r?\n/);
      while (boundary) {
        processEvent(buffer.slice(0, boundary.index));
        buffer = buffer.slice(boundary.index + boundary[0].length);
        boundary = buffer.match(/\r?\n\r?\n/);
      }
      if (chunk.done) break;
    }
  } catch (error) {
    if (requireFinal) {
      if (readFailed && finalImage) return finalImage;
      throw error;
    }
    if (latestPartialImage) {
      statCallback('[OpenAI] 最終イベントの受信前に接続が切れたため、受信済みの途中画像を採用します。');
      return latestPartialImage;
    }
    throw error;
  }
  if (buffer.trim()) processEvent(buffer);
  if (!finalImage) throw new Error('OpenAI画像ストリームに最終画像データが含まれていませんでした。');
  return finalImage;
};
```

EOF後の`if (!finalImage) throw ...`はそのまま必要。`[DONE]`、partialのみ、未知イベントのみを成功扱いにしない。既存generationのpartial救済テストは残し、新editsテストでは逆にrejectを要求する。

- [x] **Step 2.4: 新edits専用transportを実装して既存関数から分岐させる**

`openai.js`内にprivate関数を追加する。APIキーの取得・保持ロジックは既存のまま。公開関数が組み立てたrequestと選択optionを渡す。

```js
async function generateOpenAIImageEdit(request, selectedOption, apiKey, statCallback) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), OPENAI_IMAGE_TIMEOUT_MS);
  try {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`},
      body: JSON.stringify(request.body),
      signal: controller.signal,
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const message = String(data.error?.message || response.statusText)
        .replace(/data:image\/[^\s"']+/g, '[image data omitted]');
      throw new Error(`OpenAI API Error: ${response.status} ${message}`);
    }
    const contentType = response.headers?.get?.('content-type') || '';
    let base64Img;
    if (contentType.includes('text/event-stream')) {
      base64Img = await readOpenAIImageStream(response, statCallback, {eventPrefix: 'image_edit', requireFinal: true});
    } else {
      const data = await response.json();
      base64Img = data.data?.[0]?.b64_json;
    }
    if (typeof base64Img !== 'string' || !base64Img.trim()) throw new Error('OpenAI画像編集の応答に完成画像データが含まれていませんでした。');
    statCallback('[OpenAI] 参照画像を使った画像生成が完了しました。');
    return {base64Img, mimeType: 'image/png', usedModel: selectedOption.model};
  } catch (error) {
    if (controller.signal.aborted || error?.name === 'AbortError') {
      throw new Error(`API Time out (${OPENAI_IMAGE_TIMEOUT_SECONDS}秒経過)。画像編集の完了を確認できませんでした。`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
```

`generateImageWithOpenAI`では既存のキー有無・長さチェックの後、旧generation用AbortControllerの前に次を置く。

```js
const request = buildOpenAIImageRequest(prompt, {
  quality,
  imageInputs: options.imageInputs ?? [],
});
if (request.isEdit) {
  return generateOpenAIImageEdit(request, selectedOption, apiKey, statCallback);
}
```

以降の画像なしgeneration関数本体は変更しない。新editsではPOSTは1回。JSONとして正常応答が返った場合の読み取りは再送ではない。画像入力を落として旧経路へ流すcatchは禁止。

- [x] **Step 2.5: 異常応答とstreamの検証を追加する**

| ケース | 期待 |
| --- | --- |
| `image_edit.partial_image` → `image_edit.completed` | 完成画像だけ返す |
| JSONが複数chunk、CRLF境界、複数data行に分割 | 正しく組み立てる |
| 最終イベントが末尾改行なし | buffer末尾を処理して返す |
| partial後通信断／partialのみEOF | reject。元画像修復なら元画像維持 |
| completed後通信切断 | 受信済みの完成画像を返してよい |
| API errorイベント、JSON parse失敗 | reject。partial救済しない |
| HTTP 400/401/403/429/500 | 元エラー分類を保ち、POSTは1回 |
| HTTP 200でdata空／b64_json空 | 成功ログを出さずreject |
| fetch後、bodyが未完了のまま期限 | AbortControllerが有効、timeoutで終了 |
| 上限超過・不正画像 | fetch呼出しゼロ |

時間テストは実時間で10分待たない。`node:test`のmock timersが現行Nodeで利用できれば使う。利用できない場合はテスト内で`setTimeout`を捕捉し、`fetch`で取得したsignalにabortイベントを接続して、捕捉したcallbackを手動実行する。`finally`ですべてのglobalを戻す。productionの時間定数を短縮しない。

`tests/openai-image-stream.test.mjs`へ追加する具体例。既存の`test`、`assert`、`streamResponse`、`readOpenAIImageStream`を再利用する。

```js
const editOptions = {eventPrefix: 'image_edit', requireFinal: true};
const editEvent = (suffix, b64_json) => ({type: `image_edit.${suffix}`, b64_json});
const droppingResponse = event => {
  let reads = 0;
  return {body: {getReader: () => ({read: async () => {
    if (reads++ === 0) return {done: false, value: new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`)};
    throw new TypeError('network interrupted');
  }})}};
};

test('edits require the completed event rather than a partial or DONE marker', async () => {
  assert.equal(await readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial'), editEvent('completed', 'final')), () => {}, editOptions), 'final');
  await assert.rejects(readOpenAIImageStream(streamResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(new Response('data: [DONE]\n\n'), () => {}, editOptions), /最終画像/);
  await assert.rejects(readOpenAIImageStream(streamResponse({type: 'unknown', b64_json: 'not-final'}), () => {}, editOptions), /最終画像/);
});

test('edits salvage only a completed image after a transport interruption', async () => {
  await assert.rejects(readOpenAIImageStream(droppingResponse(editEvent('partial_image', 'partial')), () => {}, editOptions), /network interrupted/);
  assert.equal(await readOpenAIImageStream(droppingResponse(editEvent('completed', 'final')), () => {}, editOptions), 'final');
});

test('explicit provider errors and malformed JSON remain errors after completion', async () => {
  const completed = `data: ${JSON.stringify(editEvent('completed', 'final'))}\n\n`;
  await assert.rejects(readOpenAIImageStream(new Response(completed + 'data: {"type":"error","message":"rejected"}\n\n'), () => {}, editOptions), /rejected/);
  await assert.rejects(readOpenAIImageStream(new Response(completed + 'data: {not-json}\n\n'), () => {}, editOptions), /応答形式/);
});

test('edits assemble CRLF, multi-data lines, split reads and an unterminated final event', async () => {
  const chunks = ['data: {"type":"image_edit.', 'completed",\r\ndata: "b64_json":"final"}'];
  const response = {body: new ReadableStream({start(controller) {
    for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
    controller.close();
  }})};
  assert.equal(await readOpenAIImageStream(response, () => {}, editOptions), 'final');
});
```

`tests/openai-image-edit-request.test.mjs`へ追加する異常系と期限の具体例。既存の`ref`、importを再利用する。globalを上書きするテストに`concurrency: true`を付けない。

```js
test('HTTP failures retain their status and never retry the edit POST', async () => {
  const savedFetch = globalThis.fetch;
  setOpenAIApiKey('test-key');
  try {
    for (const status of [400, 401, 403, 429, 500]) {
      let calls = 0;
      globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({error: {message: 'rejected'}}), {status}); };
      await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]}), new RegExp(`OpenAI API Error: ${status}`));
      assert.equal(calls, 1);
    }
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('empty edit JSON is not logged as completed and invalid inputs never reach fetch', async () => {
  const savedFetch = globalThis.fetch;
  let calls = 0;
  const statuses = [];
  setOpenAIApiKey('test-key');
  globalThis.fetch = async () => { calls++; return new Response('{"data":[]}'); };
  try {
    await assert.rejects(generateImageWithOpenAI('approved', text => statuses.push(text), {imageInputs: [ref]}), /完成画像/);
    assert.equal(calls, 1);
    assert.equal(statuses.some(text => /完了しました|成功しました/.test(text)), false);
    calls = 0;
    for (const imageInputs of [Array.from({length: 17}, () => ref), [{image_url: 'invalid'}]]) {
      await assert.rejects(generateImageWithOpenAI('approved', () => {}, {imageInputs}));
    }
    await assert.rejects(generateImageWithOpenAI('x'.repeat(32001), () => {}, {imageInputs: [ref]}));
    assert.equal(calls, 0);
  } finally {
    globalThis.fetch = savedFetch;
    setOpenAIApiKey('');
  }
});

test('edit deadline remains armed while the response body is incomplete', async () => {
  const saved = {fetch: globalThis.fetch, setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout};
  let fireDeadline;
  let delay;
  let cleared = false;
  let calls = 0;
  let notifyBody;
  const bodyStarted = new Promise(resolve => { notifyBody = resolve; });
  const timerHandle = {};
  setOpenAIApiKey('test-key');
  globalThis.setTimeout = (callback, ms) => { fireDeadline = callback; delay = ms; return timerHandle; };
  globalThis.clearTimeout = handle => { if (handle === timerHandle) cleared = true; };
  globalThis.fetch = async (_url, options) => {
    calls++;
    return {ok: true, headers: {get: () => 'application/json'}, json: () => {
      notifyBody();
      return new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')), {once: true});
      });
    }};
  };
  let pending;
  let rejection;
  try {
    pending = generateImageWithOpenAI('approved', () => {}, {imageInputs: [ref]});
    rejection = assert.rejects(pending, /Time out/);
    await bodyStarted;
    assert.equal(delay, 600000);
    assert.equal(cleared, false);
    fireDeadline();
    await rejection;
    assert.equal(calls, 1);
    assert.equal(cleared, true);
  } finally {
    if (fireDeadline) fireDeadline();
    if (pending) await pending.catch(() => {});
    if (rejection) await rejection.catch(() => {});
    globalThis.fetch = saved.fetch;
    globalThis.setTimeout = saved.setTimeout;
    globalThis.clearTimeout = saved.clearTimeout;
    setOpenAIApiKey('');
  }
});
```

Run: `node --test tests/openai-image-request.test.mjs tests/openai-image-edit-request.test.mjs tests/openai-image-stream.test.mjs tests/openai-image-settings.test.mjs`。期待：旧generationテストを含め全PASS。実API通信ゼロ。

## Task 3: 初回生成と修復に参照画像を結線する

**Files:** Modify `C:/Users/sx717/Antigravity/nano-banana-pro/src/hooks/useMangaWorkflow.js`、Modify `C:/Users/sx717/Antigravity/nano-banana-pro/tests/workflow-image-quality-qa.test.mjs`。

**Interfaces:** Consumes＝Task 1のplan/append関数、Task 2の`imageInputs`引数。Produces＝OpenAI初回・修復の実request、既存形のcandidate。

- [x] **Step 3.1: 新しい結線に対する回帰条件を既存テストへ追加する**

以下を現行のworkflow sourceに対するassertへ追加する。純粋関数・fetch stubの動的試験はTask 1/2が担当し、正規表現だけで送信証明を終えない。

```js
test('OpenAI generation binds initial references and the actual repair source', () => {
  assert.match(workflowSource, /buildOpenAIReferencePlan\(\{[\s\S]*?characterImages:\s*images/);
  assert.match(workflowSource, /backgroundImage:\s*bg360Image/);
  assert.match(workflowSource, /backgroundEnabled:\s*bg360Enabled/);
  assert.match(workflowSource, /originalCandidate:\s*repairSource/);
  assert.match(workflowSource, /appendOpenAIReferencePrompt\(prompt, referencePlan\)/);
  assert.match(workflowSource, /imageInputs:\s*referencePlan\.imageInputs/);
  assert.match(workflowSource, /repairSource:\s*isOpenAIEngine\s*\?\s*originalCandidate\s*:\s*null/);
});
```

Run: `node --test tests/workflow-image-quality-qa.test.mjs`。期待：新結線assertがRED。

- [x] **Step 3.2: 対象の生成closureだけを置き換える**

追加import：

```js
import {buildOpenAIReferencePlan, appendOpenAIReferencePrompt} from '../lib/openai-image-references.js';
```

`regenerateImage`内の`generateImageCandidate`の引数とOpenAI分岐を次へ変更する。Gemini側の`geminiReferenceImages`、`geminiImageOptions`、response正規化は残す。

```js
const generateImageCandidate = async (prompt, {repair = false, repairSource = null} = {}) => {
  let response;
  if (isOpenAIEngine) {
    const referencePlan = buildOpenAIReferencePlan({
      characterImages: images,
      backgroundImage: bg360Image,
      backgroundEnabled: bg360Enabled,
      originalCandidate: repairSource,
    });
    const apiPrompt = appendOpenAIReferencePrompt(prompt, referencePlan);
    const {character, background, original} = referencePlan.counts;
    statCallback(`[REF] OpenAI入力: キャラ${character}枚、背景${background}枚、修復元${original}枚`);
    statCallback(repair
      ? `[QUALITY QA] ${resolveOpenAIImageOption(openAIImageQuality).label} で元画像の限定修正を実行中です...`
      : `[INFO] ${resolveOpenAIImageOption(openAIImageQuality).label} の最終画像を待機中...`);
    response = await generateImageWithOpenAI(apiPrompt, statCallback, {
      quality: openAIImageQuality,
      imageInputs: referencePlan.imageInputs,
    });
  } else {
    if (geminiReferenceImages.length > 0) {
      statCallback(`[REF] Gemini画像編集用の参照画像 ${geminiReferenceImages.length}枚を添付`);
    }
    response = await generateImageWithImagen(prompt, statCallback, geminiReferenceImages, geminiImageOptions);
  }
  const normalizedImage = String(response.base64Img || '').replace(/\s+/g, '');
  if (!normalizedImage) throw new Error('Image response did not include usable image data.');
  return {base64Img: normalizedImage, mimeType: response.mimeType || 'image/png', modelId: response.usedModel};
};
```

このclosureは呼び出された`regenerateImage`のstate snapshotを参照する。修復時に最新React stateを読み直すための別のグローバル変数を作らない。初回と修復の間で参照画像の順番を変えない。

- [x] **Step 3.3: 修復callbackに実際の元画像を渡す**

```js
generateRepairCandidate: (repairPrompt) => generateImageCandidate(repairPrompt, {
  repair: true,
  repairSource: isOpenAIEngine ? originalCandidate : null,
}),
```

`originalCandidate`は直前の`await generateImageCandidate(currentPrompt)`の返り値。古い生成履歴、別の画像、`generatedImage`の非同期更新前stateを使わない。

Task 4で追加する引数も同じ`runImageQualityFailsafe`呼出しへ置く。

```js
repairSourceMode: isOpenAIEngine ? 'source-image' : 'regenerate',
```

QAは従来の`candidate + images`、比較は`original + repair + images`を維持。新しい`referencePlan.imageInputs`をQAへ渡すと修復元や背景がキャラとして数えられるので禁止。

- [x] **Step 3.4: 複数経路を検証する**

Run: `node --test tests/workflow-image-quality-qa.test.mjs tests/openai-image-references.test.mjs tests/gemini-image-edit.test.mjs tests/openai-image-settings.test.mjs`。

期待：OpenAI初回/修復、Geminiの参照経路、手動2.0の保持がPASS。明示`generationOptions.referenceImages`をOpenAIへ黙って流用しない。本書で指定していない別用途のOpenAI参照入力は追加しない。

## Task 4: 修復指示を元画像編集向けにする

**Files:** Modify `C:/Users/sx717/Antigravity/nano-banana-pro/src/lib/image-quality-failsafe.js`、Modify `C:/Users/sx717/Antigravity/nano-banana-pro/tests/image-quality-failsafe.test.mjs`。

**Interfaces:** `buildImageQualityRepairPrompt`へ`sourceMode = 'regenerate'`、`runImageQualityFailsafe`へ`repairSourceMode = 'regenerate'`を追加。既定値でGemini・既存単体呼出しの文面を維持する。

- [x] **Step 4.1: 元画像編集の契約テストを追加する**

```js
test('source-image repair states change preserve and verify without changing the approved prefix', () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: 'APPROVED SCRIPT',
    sourceMode: 'source-image',
    issues: [{type: 'prop_ownership', panel: 2, subject: '人物Aの手', reason: '小道具が別人物の手に接続している'}],
  });
  assert.ok(prompt.startsWith('APPROVED SCRIPT'));
  for (const label of ['SOURCE IMAGE TO EDIT', 'CHANGE:', 'PRESERVE:', 'VERIFY:']) assert.ok(prompt.includes(label));
  assert.match(prompt, /prop_ownership/);
  assert.match(prompt, /exactly four separate visible panels/i);
  assert.match(prompt, /necessary local contact and shadow changes/i);
});

test('source-image single illustration repair does not invent a comic layout', () => {
  const prompt = buildImageQualityRepairPrompt({
    originalPrompt: SINGLE_IMAGE_PROMPT,
    sourceMode: 'source-image',
    issues: [{type: 'anatomy', panel: null, subject: 'hand', reason: 'extra finger'}],
  });
  assert.match(prompt, /same single illustration/i);
  assert.doesNotMatch(prompt, /exactly four separate visible panels/i);
});
```

- [x] **Step 4.2: builderにsource-image分岐を追加する**

既存`preservationLock`と`concreteIssues`の生成は保つ。`sourceMode`が`source-image`の場合のみ、return前に以下を返す。既存regenerateのreturnは残す。

```js
if (sourceMode === 'source-image') {
  const sourceLayout = effectiveMode === 'single-image'
    ? 'Edit the same single illustration. Do not introduce panels, a comic page, a collage, additional scenes, new characters, or a new setting.'
    : 'Edit the same four-panel manga page. Preserve exactly four separate visible panels and the original page geometry. Do not merge, omit, duplicate, or reorder panels.';
  return `${String(originalPrompt)}

IMAGE QUALITY CORRECTION ATTEMPT (bounded retry 2/${IMAGE_QUALITY_MAX_ATTEMPTS}):
SOURCE IMAGE TO EDIT: the first attached image is the actual completed original, not a character sheet.
${sourceLayout}
CHANGE:
Correct only the concrete visible defects listed below, using the smallest coherent edit:
${concreteIssues || '- No concrete issue was supplied; do not introduce any change.'}
PRESERVE:
Do not change the approved dialogue, cast, story action, identities, canonical clothing, reading order, camera, crop, typography, colors, or already-correct content outside the defects.
Keep the original as the visual baseline. Never redraw the page from scratch or copy the reference-sheet layout.
Allow only necessary local contact and shadow changes caused by fixing the listed defect; do not freeze the defective geometry itself.
VERIFY:
Check the corrected defect against the approved prompt and reference sheets. Check every dialogue line, its speaker, cast identity, hand and prop ownership, camera and unchanged regions for regressions.
Do not add speaker names, metadata, translations, annotations, extra text or new characters.`;
}
```

このVERIFYはモデルへの指示であって、実装側QAの代替ではない。画像モデルが自己検査したという理由で`pass:true`を付けない。

signatureと呼出しに追加するコード：

```js
// buildImageQualityRepairPromptの分割代入へ追加
sourceMode = 'regenerate'

// runImageQualityFailsafeの分割代入へ追加
repairSourceMode = 'regenerate'

// runImageQualityFailsafe内、buildImageQualityRepairPromptの引数へ追加
sourceMode: repairSourceMode,
```

- [x] **Step 4.3: 既存の採用判定と異常系を確認する**

初回PASS＝修復ゼロ、修復OFF＝修復ゼロ、QA未確認＝修復ゼロ、修復失敗＝元画像、修復QA失敗＝元画像、修復PASSでも比較同点/未確認＝元画像、修復優位＝修復画像、の既存試験をすべて通す。

16枚参照＋元画像で上限を超えた場合はTask 1で例外になり、既存`generateRepairCandidate`のcatchが元画像を維持する。`attempts`は候補作成の試行回数で、HTTP送信回数の証拠に使わない。fetch stubではこのケースの修復POSTがゼロであることを検証する。

Run: `node --test tests/image-quality-failsafe.test.mjs tests/image-quality-qa.test.mjs tests/workflow-image-quality-qa.test.mjs`。期待：全PASS。既存のoriginal-versus-repairの比較ルールを弱めない。

## Task 5: アプリ説明とREADMEを正確に更新する

**Files:** Modify `C:/Users/sx717/Antigravity/nano-banana-pro/src/components/Step4Panel.jsx`、Modify `C:/Users/sx717/Antigravity/nano-banana-pro/README.md`、Create `C:/Users/sx717/Antigravity/nano-banana-pro/tests/openai-web-guidance.test.mjs`。

**Interfaces:** 既存`isOpenAIImageMode`で表示を分岐する。新しいprovider state、課金判定、subscription検出、UIボタンは作らない。

### 5.1 採用する日本語文面

**A. 画像生成ボタン直下：OpenAI時だけ**

```text
API生成では、プロンプトに加えて、読み込み済みのキャラクターシートと有効な360°背景画像を参照画像として送信します。参照画像がない場合は文章のみで生成します。API利用料金が発生し、ChatGPTのサブスク料金とは別会計です。
```

**B. 既存オレンジ案内枠の見出し：OpenAI時**

```text
💡 サブスクの利用枠で生成し、API画像生成料金を節約したい方へ
```

**C. 同枠の本文：OpenAI時**

```text
ChatGPTのサブスクに加入していて、API画像生成料金を節約したい場合は、上の「コピー」ボタンでプロンプトをコピーし、ChatGPT公式Web版へキャラクターシート画像と一緒に貼り付けて生成してください。360°背景を使う場合は、その画像も添付します。
Web版での生成にはChatGPT側の利用枠・上限が適用されます。この方法ではNano Bananaから画像生成APIを呼びません。ただし、アプリ内で行ったキャラ解析・シナリオ生成などのAPI料金は別途発生する場合があります。
```

**D. Gemini時のボタン直下（現行機能だけを説明）**

```text
Gemini API生成にはAPI利用料金がかかります。参照画像の利用は選択中の生成経路によって異なります。公式Web版で手動生成したい場合は、下の案内をご利用ください。
```

**E. Gemini時の既存案内枠見出し・本文**

```text
💡 Gemini公式Web版で手動生成するには
コピーしたプロンプトをGemini公式Web版へ、キャラクターシート画像と一緒に貼り付けて生成してください。360°背景を使う場合は、その画像も添付します。Web版で利用できる機能や上限は、Google側のプラン・提供状況に従います。
```

Googleサブスクの料金・APIとの対応は今回調査していないので、ChatGPTと同じプラン条件や料金をコピーしない。Geminiの修正用コピー機能・注意書きは残す。

**F. プロンプト編集欄のfooter**

既存の次の文はそのまま残す：

```text
この欄で直接編集できます。編集した内容が、プロンプトのコピーと画像生成の両方に使われます。
```

OpenAI時だけ次の1文を同じfooter内へ追記する：

```text
API生成時は、添付する参照画像の用途を示す補足を本文の後ろに追加します。入力した本文やコピー内容は書き換えません。
```

**G. 修復checkbox**

現行「API生成のみ：品質検査NG時に自動修正する（最大1回・追加課金あり／Web貼り付けには影響しません）」は意味が合っているので残す。OpenAI/Gemini双方へ「必ず元画像を編集」と共通表示しない。

### 5.2 JSXへの反映方法

- [x] **Step 5.1: ボタン下の既存paragraphを条件分岐で置換する**

```jsx
<p className="text-[10px] text-slate-500 text-center mt-2 leading-relaxed px-2">
  {isOpenAIImageMode
    ? 'API生成では、プロンプトに加えて、読み込み済みのキャラクターシートと有効な360°背景画像を参照画像として送信します。参照画像がない場合は文章のみで生成します。API利用料金が発生し、ChatGPTのサブスク料金とは別会計です。'
    : 'Gemini API生成にはAPI利用料金がかかります。参照画像の利用は選択中の生成経路によって異なります。公式Web版で手動生成したい場合は、下の案内をご利用ください。'}
</p>
```

- [x] **Step 5.2: 既存案内枠の見出しと各provider冒頭本文を置換する**

```jsx
<span className="font-bold text-orange-300">
  {isOpenAIImageMode
    ? '💡 サブスクの利用枠で生成し、API画像生成料金を節約したい方へ'
    : '💡 Gemini公式Web版で手動生成するには'}
</span>
<br />
```

OpenAI側の既存「キャラクターの見た目が崩れたり…」「劇的に向上」の2文を以下で置換する。後続の貼り付けファイル展開案内、比率修正コピー、アップスケールコピー、H3の各領域には触れない。

```jsx
ChatGPTのサブスクに加入していて、API画像生成料金を節約したい場合は、上の「コピー」ボタンでプロンプトをコピーし、
<a href="https://chatgpt.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">ChatGPT公式Web版</a>
へキャラクターシート画像と一緒に貼り付けて生成してください。360°背景を使う場合は、その画像も添付します。
<br />
Web版での生成にはChatGPT側の利用枠・上限が適用されます。この方法ではNano Bananaから画像生成APIを呼びません。ただし、アプリ内で行ったキャラ解析・シナリオ生成などのAPI料金は別途発生する場合があります。
<br />
```

Gemini側の同じ2文は以下で置換する。

```jsx
コピーしたプロンプトを
<a href="https://gemini.google.com/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Gemini公式Web版</a>
へ、キャラクターシート画像と一緒に貼り付けて生成してください。360°背景を使う場合は、その画像も添付します。Web版で利用できる機能や上限は、Google側のプラン・提供状況に従います。
```

API利用の否定をなくすための変更であり、成功保証や安全制限回避の案内にしない。ユーザーが普段使っているコピー導線を維持する。

- [x] **Step 5.3: footerへ条件付きの説明を追加する**

```jsx
{isOpenAIImageMode && (
  <span className="block mt-1">
    API生成時は、添付する参照画像の用途を示す補足を本文の後ろに追加します。入力した本文やコピー内容は書き換えません。
  </span>
)}
```

### 5.3 READMEに追加・置換するJP/EN本文

- [x] **Step 5.4: OpenAI画像経路の節とSTEP4行を同期する**

旧見出し`OpenAI Image Route (gpt-image-2)`を`OpenAI Image Generation and References / OpenAI画像生成と参照画像`へ変更し、元のノイズ抑制・台詞・レイアウトの説明は消さず、その後に以下を置く。

```markdown
OpenAI image generation uses the model and quality selected in STEP4. Uploaded character sheets and an enabled 360° panorama are attached as visual references. With references, the app uses the image-edit endpoint to create a new image; without references, it uses the text-to-image generation endpoint. The editable prompt text is preserved, with an API-only description of reference roles appended at send time. Visual identity and dialogue accuracy still require review.

OpenAI画像生成にはSTEP4で選択したモデルと品質を使います。読み込み済みのキャラクターシートと有効な360°パノラマは、用途を区別した参照画像として添付します。参照画像がある場合は画像編集APIで新しい画像を生成し、ない場合は文章からの画像生成APIを使います。編集欄の本文は維持し、送信時に参照画像の用途説明だけを追記します。人物の同一性や台詞の正確さは、生成後の確認が必要です。

When automatic repair is enabled and QA identifies a concrete problem, the OpenAI route submits the completed original image plus the same reference images for one targeted edit. The app adopts the repair only if it passes QA and a direct comparison shows a clear improvement; otherwise, it keeps the original. A repair consumes an additional image API call. An unverified review does not trigger repair.

自動修正がONで品質検査が具体的な問題を検出した場合、OpenAI経路では完成した元画像と同じ参照画像を渡して1回だけ限定修復します。修復画像は品質検査と元画像との直接比較で明確な改善を確認した場合だけ採用し、それ以外は元画像を保持します。修復には追加の画像API料金がかかります。品質検査が未確認の場合は修復しません。

At most 16 input images can be sent, including the original during repair. The app does not silently drop references. If adding the original would exceed the limit, it keeps the original and reports that repair was not sent.

画像入力は修復元画像を含めて最大16枚です。参照画像を黙って省略することはありません。元画像を追加すると上限を超える場合は、修復を送信せず元画像を保持して理由を表示します。
```

STEP4表の入力欄は「Current prompt; character-sheet images and enabled panorama for OpenAI / 現在のプロンプト、OpenAIではキャラシートと有効パノラマ」。処理欄は上のOpenAI説明と従来のGemini説明を分ける。「すべてのAPIで画像が添付されない」という一律説明を削除する。

- [x] **Step 5.5: Web費用案内を既存コピー説明の近くに追加する**

```markdown
If you subscribe to ChatGPT and want to save on image API charges, copy the prompt and generate in the official ChatGPT web app with your character sheets and optional background image attached. ChatGPT subscription usage limits apply. This manual path does not call Nano Banana's image API. API charges already incurred for character analysis, scenario generation, or other app operations remain separate; a ChatGPT subscription does not include OpenAI API usage.

ChatGPTのサブスクに加入していてAPI画像生成料金を節約したい場合は、プロンプトをコピーし、キャラクターシートと必要な背景画像をChatGPT公式Web版へ添付して生成できます。ChatGPT側の利用枠・上限が適用され、この手動操作からNano Bananaの画像生成APIは呼ばれません。キャラ解析・シナリオ生成などアプリ内で発生したAPI料金は別途必要です。ChatGPTのサブスク料金にOpenAI API利用料金は含まれません。
```

プライバシー節へ、STEP4でもキャラ・有効背景画像を選択中のOpenAIへ送ることを追記する。別サービスへの保存、OpenAI側の保持日数、学習利用の保証は追加しない。

version・ChangeLogの新バージョン見出しは作らない。公開版を更新したと書かない。H3表中の`gpt-image-2`は別の配布ワークフロー仕様なので一括置換しない。

- [x] **Step 5.6: 軽い文面検査と既存コピー試験を実行する**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const ui = readFileSync(new URL('../src/components/Step4Panel.jsx', import.meta.url), 'utf8');
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('Web guidance explains savings and the separate API bill', () => {
  assert.match(ui, /API画像生成料金を節約したい/);
  assert.match(ui, /サブスク料金とは別会計/);
  assert.match(ui, /利用枠・上限/);
  assert.match(ui, /キャラ解析・シナリオ生成などのAPI料金/);
  assert.doesNotMatch(ui, /画像を直接添付できないため/);
  assert.doesNotMatch(ui, /おまかせ生成/);
  assert.doesNotMatch(ui, /キャラクターのクオリティや再現度が劇的に向上/);
  assert.match(readme, /a ChatGPT subscription does not include OpenAI API usage/);
});
```

Run: `node --test tests/openai-web-guidance.test.mjs tests/prompt-manual-edit-ui.test.mjs tests/gemini-image-edit.test.mjs tests/minimax-h3-prompt-ui.test.mjs tests/upscale-prompt-ui.test.mjs`。

文面変更の試験は上記で十分。subscription判定・価格計算の新しいロジックや大規模なsnapshot試験を追加しない。コピーだけでAPIを呼ばない証拠はTask 6のブラウザ確認でも採る。

## Task 6: ローカル検証と無課金ブラウザ確認

**Files:** 本書だけを詳細な進捗記録とする。第5節を基本とし、既存試験2ファイルの契約更新理由を第11節に記録する。

**Interfaces:** Consumes＝Task 1–5。Produces＝ローカル実装の回帰証拠とブラウザ状態。実画像の画質改善とは区別。

- [x] **Step 6.1: 全体ゲートを1回実行する**

今回の変更はAPI送信・非同期完了・共有hook・UI・READMEにまたがるので、全Node tests、lint、buildを実施する。成功後は変更や新しい不具合がない限り繰り返さない。

```powershell
Set-Location -LiteralPath 'C:\Users\sx717\Antigravity\nano-banana-pro'
node --test tests/*.test.mjs
npm.cmd run lint -- --max-warnings 0
npm.cmd run build
git diff --check
```

PowerShell/Nodeの組合せでglobが展開されない場合は、`node --test`で同じ全suiteを検出させる。事前記録の283件を固定の期待件数にしない。今回追加後の実件数、PASS/FAIL、終了コードを記録する。

- [x] **Step 6.2: in-app browserで対象UIを確認する**

公式portは5173。既存serverを再利用できなければ、このアプリdirectoryから`npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort`を実行する。既存nodeを一括終了しない。指定portが別用途で使用中なら割当を確認し、勝手に他portや他アプリへ移らない。

確認URLは`http://127.0.0.1:5173/`。新しい画面・browserをユーザーが指定していない場合はin-app browserを使用。キー値をDOMから読み取らない。静的UI確認のためにキー入力・生成を要求しない。

| 状態・操作 | 観察と合格条件 |
| --- | --- |
| OpenAI STEP4、desktop 1280px以上 | API画像参照の説明、サブスク費用案内、修復追加課金が読める。ボタンの位置・色・選択肢は維持 |
| OpenAI STEP4、mobile 390px前後 | 横overflowなし。案内・リンク・checkboxが欠けない |
| キャラあり/なし、背景ON/OFF | 説明は条件付きで正しい。「送っている」と断定するログは実際の送信時だけ |
| Sunburst/xhigh→2.0/high→checkbox操作 | 2.0選択が保持され、勝手に戻らない。reload後のみ既定値へ戻る |
| textareaで台詞を手動修正→コピー | コピーは編集した本文そのもの。API用manifestはWebコピーに混ざらない |
| コピー操作 | OpenAI/Gemini画像API、品質QAのリクエストが発生しない |
| ChatGPT Webリンクを確認 | hrefは`https://chatgpt.com/`。ユーザーが送信するまで画像はアップロードされない |
| Geminiへ切替 | OpenAIが画像を添付する説明が残らない。Gemini用コピー・修正・リンクは元どおり |
| キーボード | textarea、品質select、修復checkbox、生成・コピー・リンクへ到達できる |
| console | 新規JS例外がない。キー値や画像本文の出力がない |

空の初期画面でSTEP4が隠れている場合は、既存のローカルUI fixtureを再利用するか、未公開の検証用入口だけで状態を与える。fixtureは非productionと明示し、実APIや生成成功の証拠にしない。キーや私有画像をテストfixtureへ埋め込まない。生成ボタンを押す必要はない。

- [x] **Step 6.3: 最終差分を確認する**

```powershell
git diff --stat
git diff --check
git status --short
rg -n '画像を直接添付できないため|おまかせ生成|劇的に向上|完璧な4コマ漫画を作りたい' src/components/Step4Panel.jsx README.md
```

期待：対象の古い説明は残らない。モデルID、APIキー保存、H3配布物、download URL、バージョンの無関係な変更がない。変更したREADMEの現行本文とsourceを対応づけて読む。過去の記事や過去release notesを一括修正しない。

## Task 7: 後日許可された場合の実API受け入れ試験

**Files:** 生成物と観察メモはアプリの`output/`等、既存の非公開検証先を使う。文書作成時は何も生成しない。

**Interfaces:** Consumes＝Task 6がPASSしたrevision、ユーザーがUIに登録した有効なAPI状態、承認された入力・画像生成回数。Produces＝送信データと実画像の証拠。公開・backupは含まない。

### 7.1 許可・回数・料金の境界

- 「仕様書作成」はAPI生成の許可ではない。今回このTaskは実行しない。
- 後日、参照付き生成を1回確認する指示だけなら、修復OFFで1回。QA失敗でも勝手に2枚目を生成しない。
- 初回＋修復の実証まで指示された場合は、初回1枚＋修復1枚を上限とする。元画像に問題がなければ自動修復は発生しないので、修復経路は未実証と報告する。NGを捏造して分岐へ入れない。
- 実修復分岐を確かめるために別の画像・指示へ変更したり、もう1回支払う必要が出たら、その部分だけ現在の指示を確認する。
- 同一入力の旧/新A/B比較で「画質向上」を示すなら、旧1枚＋新1枚という別の比較承認が必要。過去に同一入力の旧画像が保存されていればそれを使えるが、入力・revision・設定の一致を記録する。
- キャラ解析・シナリオ生成・品質QA・直接比較もAPI利用であり、画像枚数とは別。ログに架空の金額を出さない。
- 一枚絵のshared品質プロンプト自体は今回変更しない。後からそこへ範囲を拡張した場合は、アプリの四コマ＋一枚絵実API検証条件を別途適用する。

### 7.2 使う入力

ユーザーがすでに使用を認めているキャラシートを再利用する。最低2人、判別できる髪型・衣装・小物を持ち、会話・持ち物受け渡し・斜め/肩越し等の視線が分かる四コマを使う。固有のサンプルをproductionへ追加しない。記事の作例を許可なくダウンロードしてアップロードしない。

承認済み完成プロンプトを固定し、UIで選んだモデル・品質・背景ON/OFF・参照画像順・画像数を記録する。モデルを自動で変えない。

- [ ] **Step 7.1: 値を出さずAPI-readyを確認する**

アプリの選択providerと利用可能状態を確認する。接続済みならキーを再要求しない。入力が必要ならアプリを開いたままUI入力を求める。キー値、localStorage dump、Authorization、request body全体を出力しない。

- [ ] **Step 7.2: 実requestの安全な証拠を採る**

URL、選択model/quality、画像総数・用途別枚数、streamの最終event種別、HTTP終了結果だけを記録する。画像同一性の照合はメモリ内比較またはローカルSHA-256で行い、data URLを人間向けログに出さない。

初回はキャラ画像そのものが`images`へ入り、修復時は実際の初回出力が画像1にあることを確認する。コードの変数名や画面の「添付」表示だけでは送信証明としない。ネットワーク観察で機密headerが出る方法は避ける。

- [ ] **Step 7.3: 完成画像を目視比較する**

| 観点 | 初回 | 修復採用時 |
| --- | --- | --- |
| 人物 | 各人の顔、髪、目、眼鏡、衣装が参照と対応 | 元画像の良い部分が変わっていない |
| 台詞 | 全行、句読点、語尾、話者、重複/欠落を照合 | 修正無関係な台詞の変化なし |
| レイアウト | 四コマと読み順、見出し/吹き出し書体 | コマ数・形・読み順を維持 |
| 身体と小物 | 左右の手、所有者、接続、持ち方、機能面の向き | 指摘した欠陥が改善し、新たな欠陥なし |
| 視線・カメラ | 相手を見る視線、肩越し側、脚本のカメラ | カメラだけ変わる/全員がレンズを見る退行なし |
| 参照役割 | キャラシートの説明文字・ポーズ・分割をコピーしていない | 原稿を再生成して別構図にしない |
| 背景 | 背景ON時の主な環境・光の整合 | 必要な局所接触影以外の無関係な変更を確認 |

AIのQA PASSだけで全項目合格としない。本文と実画像を見比べる。参照を送れることと、毎回完全一致することを混同しない。

- [ ] **Step 7.4: 結果を区別して記録する**

記録項目：revision、入力識別子、model、quality、参照枚数、画像APIの実POST回数、最終イベント、保存先、採否、可視欠陥、未確認事項。キー・画像Base64・billing個人情報を含めない。

`satisfied`＝必要証拠を確認。`unmet`＝要求した動作が失敗。`unverified`＝試験未実施または確定できない。品質が改善しない場合でも勝手に有料再試行・全体再設計へ進まない。

## 8. 実装者が迷わないための判断表

| 起きたこと | 実行すること | 実行しないこと |
| --- | --- | --- |
| editsの403 | 現在の認証/権限エラーを既存UIへ返す | 「画像添付非対応」と断定、2.0への自動切替 |
| editsの400 | 公式request schemaと画像形式を確認 | 画像を外して同じpromptを再送 |
| editsの429/5xx/通信断 | 今回の完了未確認を示す。元画像修復なら元画像維持 | 無断で複数POST、別providerへ移動 |
| partialしか届かない | 新editsでは未完了として処理 | 「完成した」表示、成功画像への保存 |
| 参照追加で32,000文字超過 | 送信前にエラー | 台詞/本文/参照を勝手に切る |
| 参照が多すぎる | 枚数上限を示す | 先頭16枚だけ採用 |
| 現行コードと本書の行番号が違う | 関数・旧文言で適用箇所を探す | 無条件の広範囲置換 |
| 既存テストが新仕様の説明と矛盾 | テストが表す旧契約を確認し対象だけ更新 | テスト全削除、失敗を黙って無視 |
| UI確認にAPIキーがない | 無課金UI確認を続行 | キーをチャットで要求、偽成功表示 |
| 旧release/backupが未完了と書かれている | 現在の指示と別件として扱う | 本作業のついでに再開 |
| 画像品質が思ったほど上がらない | 実例と不足点を報告 | 成功保証、許可のない追加生成 |

## 9. 最終報告の必須内容

実装者は次を簡潔に報告する。

1. 画像参照がAPIへ直接送られるようになったことと、変更した入口。
2. 自動修復に元画像を使用し、最大1修復と元画像優先を維持したこと。
3. Web案内をサブスク利用枠・API費用節約へ変更し、別会計と前段費用も示したこと。
4. 実行した試験の件数・結果、無課金browser確認の範囲。
5. 実APIが未実施なら、その旨。実施したなら入力と完成画像の証拠・採否。
6. commit/push/release/deploy/backupは、実際に別途許可され実施した場合以外は未実施。

今回の文書作成者の最終報告は「仕様手順書を作成し、アプリ実装前で停止した」で終える。実装者への開始依頼送信、新しいタスク作成、モデル変更は行わない。

## 10. 当初の文書自体の検収記録（実装開始前の履歴）

- [x] 現行v5.9.5のAPI・hook・QA・UI・READMEを読み、画像生成と品質検査の参照入力を区別した。
- [x] 昨日の5資料と保存済み参照方針を再確認し、今回採用する範囲を明記した。
- [x] 公式editsの画像入力・モデル・上限・streamと、ChatGPTの別課金・利用上限を確認した。
- [x] Astra・中向けに、関数signature、置換箇所、固定文面、RED/GREEN試験、実API条件を具体化した。
- [x] 保存後にR01–R20のcoverage、型名・引数の一致、参照先の既存ファイルと記事の存在を照合した。新規実装予定の1 moduleと3 testsが未作成であることも確認した。
- [x] 今回の編集は本書とroot PLANの追加ポインタだけ。アプリGitのtracked差分なし、HEAD・version不変を確認した。root PLANの既存変更を保持した。

検収証拠：R01–R20の20項目とTask 0–7の8工程を照合。Markdown fenceは78本で閉じており、行末空白とTODO/TBDはゼロ。アプリとroot PLANの`git diff --check`はエラーなし。コード例の実行、アプリ試験・build、ブラウザ生成、実API通信は行っていない。文書の検収と将来の実装検証は別である。

**履歴上の停止位置:** この時点では全Task未着手だった。その後の実装結果と現在の停止位置は第11節を参照。


## 11. ローカル実装・検証の完了記録（2026-09-10）

**状態:** Task 0–6完了、Task 7未実行。最新のユーザー指示による停止であり、APIキー不備やAPI失敗を理由とする停止ではない。モデル設定を調査・変更せず、依頼されたAstra/highでの実装という指定を記録した。

### 11.1 実装と変更範囲

- 基準HEAD: `018db15598d0d67acab02dc74d81c6ae1c5fc8e4`、version `5.9.5`のまま。実装worktreeは冒頭記載の場所。変更は未コミットで、元のmainのtrackedファイルは変更していない。
- `src/lib/openai-image-references.js`追加: 画像の役割、元画像→キャラ→背景の順序、同用途の重複排除、異用途重複の拒否、最大16枚、PNG/JPEG/WebP data URLと長さ制限、本文を維持するAPI専用追記。
- `src/lib/openai.js`: 画像ありのJSON edits送信、画像なしの従来経路、選択モデル維持、最終編集イベント必須、本文読了までのタイムアウト、edits自動再送ゼロ。完了後の通信断と明示的APIエラーを区別。providerが画像本文やキーをエラーに反射した場合も返却前に除去する。
- `src/hooks/useMangaWorkflow.js`: 初回のキャラ・有効背景参照、修復時の実際の元画像を接続。API専用追記で編集欄やコピー本文を変更しない。Geminiの既存参照処理を維持。
- `src/lib/image-quality-failsafe.js`: source-image用Change/Preserve/Verify。元画像保存、最大1回修復、厳格なQA・直接比較での採用、失敗時の元画像保持を維持。
- `src/components/Step4Panel.jsx`、`README.md`: 画像添付の説明、サブスク利用枠でのWeb貼り付け、API別課金、Web上限、前段API料金、画像送信先を同期。既存ボタン配置・コピー本文・H3リンクと配布物は不変。
- 新規試験: `tests/openai-image-references.test.mjs`、`tests/openai-image-edit-request.test.mjs`、`tests/openai-web-guidance.test.mjs`。
- 既存試験更新: `tests/openai-image-stream.test.mjs`、`tests/image-quality-failsafe.test.mjs`、`tests/workflow-image-quality-qa.test.mjs`。
- 追加で既存2試験を更新: `tests/prompt-provider-parity.test.mjs`は「APIへ全文同一」から「本文同一＋API専用の追記のみ許容」へ仕様変更を反映。`tests/full-auto-chatgpt-mode.test.mjs`は参照計画の構築が追加された分岐の検査へ更新。旧正規表現に合わせるために本体の仕様を後退させていない。
- パッケージ追加なし。既存node_modulesへのJunctionのみ使用。Appバージョン、モデル定義、認証保存、H3資産、公開手順は未変更。

### 11.2 ローカルの実測証拠

- 新規契約テストでREDを確認後に実装。エラー内の機密値反射テストもRED→修正→GREENを確認。
- 最終全Node試験: **310 tests / 310 pass / 0 fail、exit 0**（16,675 ms）。生成・修復・採用・上限超過による修復POSTゼロは、実関数とfetch stubを組み合わせた動的試験でも確認。
- `npm.cmd run lint -- --max-warnings 0`: exit 0。
- `npm.cmd run build`: exit 0、1,763 modules。既存のcaniuse-lite古さ、Geminiのstatic/dynamic import併用、500 kB超chunk警告あり。これらに対する依存更新・構成変更は本件の範囲外。
- `git diff --check`: PASS。APIのmock試験は外部へ送信せず、実キー・私有画像を使用していない。

### 11.3 無課金ブラウザ確認

- worktreeのViteを `http://127.0.0.1:5173/` で起動。実際のSTEP4コンポーネントとworkflow hookを使用する未公開scratch fixtureで表示・コピーを確認。fetch/XHR/sendBeaconを拒否するfixtureであり、実APIや画像成功の証拠ではない。
- CSS実測幅393 pxと1,296 pxで説明・料金案内を確認し、documentの横overflowなし。ブラウザ側の拡縮があるため設定上の幅ではなく実測値を記録。
- OpenAI/Geminiの条件別説明、ChatGPTリンク、品質select、修復checkboxを確認。2.0/high選択が操作で保持され、再読込後にSunburst/xhighへ戻る。
- 手動編集した本文をコピーし、実際の貼り付け結果との一致を確認。API用の参照説明はコピーに含まれない。通信要求カウンター0、JS例外カウンター0。
- fixture編集時のHMRでcreateRoot重複のconsole警告履歴が2件あった。最終の新規再読込後には新たなerrorログなし。履歴をproduction障害や完全無警告と偽って扱わない。
- scratch fixtureはGit対象外・非production。画面確認後にviewport変更を解除し、実アプリのルート画面（title: Nano Banana Pro v5.9.5）へ戻して引き継いだ。APIキー入力・値取得・接続試験・生成は行っていない。

### 11.4 停止位置と次回

**ここで停止。** 実APIリクエスト、実画像の人物同一性・台詞・修復品質、利用料金・実所要時間は未検証。commit・push・merge・version変更・deploy・release・upload・backupは行っていない。

ユーザーが実API検証を明示した場合のみ、同じworktreeでTask 7を開始する。先に現在の差分とローカル証拠の有効性を確認し、承認された入力・回数・providerの範囲を守る。元のmainや公開版を今回の実装版と取り違えない。キーが必要ならアプリUIだけで入力してもらい、チャットで要求しない。

## 12. 実API検証と公開工程（2026-09-10）

- ユーザーがin-app browserの既存UIへ直接APIキーとキャラシート2枚を入力。キー値は取得・保存せず、接続状態だけを確認した。
- STEP1の実画像解析、STEP2のシナリオ生成、STEP3を経て、手動レビューした最終プロンプト13,046文字を使用。キャストの明示不足、衣装と引用文の矛盾を入力欄で訂正した。未編集の全自動経路の成功、またはパーサー自体の修正とは扱わない。
- STEP4: `gpt-image-2.5-sunburst` / xhigh、キャラ参照2枚、背景0枚、修復元0枚、自動修正OFF、画像生成1回。画像完了ログと1024×1536のPNG、4コマ表示、`[QUALITY QA] PASS`、履歴1件を確認した。
- 全画像を目視した。4コマと指定された会話を確認したが、細部の服装・カメラ・手渡し動作までの完全一致や、従来版に対するA/B画質優位は証明していない。自動修正と背景参照はローカル契約テストのみで、今回の実API対象外。HTTP生レスポンスやリクエスト本体のネットワーク記録は取得していない。
- 受領H3 v1.1.6の系譜・全件manifest・CRC・再構築一致を確認。Windows CP932テストと通信例外への資格情報反映経路を合成キー・無通信で再現し、v1.1.7で修正。59テスト合格。供給元GPU結果を今回の実行結果へ読み替えない。
- ユーザー指定により、再発防止文書入りの初期v1.1.7 ZIPを先にYドライブへコピーし、元候補とのSHA-256一致を確認。公開前にJSON内の古いLM Studio/ZIP未作成説明を追加発見したため、説明のみ訂正して再構築する。実行グラフは保持。先渡しZIPは退避して最終訂正版を同じ配布名へ置く。
- 公開範囲: Nano Banana v5.9.6の既存API実装、H3のZIPと単独JSONの別リンク、該当README、Pages/HF、note記事本文・タイトル・履歴・H3配布先。追加のAPI生成、依存インストール、全PCバックアップ、他アプリ改変は行わない。
- 次: H3統合の最終試験、mainへの統合、正式 `publish_app_release.ps1`（FullBackupなし）、公開物実バイト照合、note公開確認。
