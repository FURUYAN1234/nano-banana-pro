# STEP2・画像品質・QA出力予算のバグ修正 Implementation Plan

> **Execution:** 同じチャットをユーザーが GPT-6 Astra／高へ切り替えた後、`executing-plans` に沿って逐次実装する。新しいチャット・CLI・モデル変更を自動起動しない。今回の Astra／ultra の作業は原因調査とこの計画まで。実装開始前で引き継ぐ。

**Goal:** 必要な品質検査を維持し、根拠のない動作削除とQA出力切断による無駄を直す。実シナリオ・実プロンプト・実画像で確認後、承認済みの公開・告知・バックアップまで完了させる。

**Architecture:** 既存の `callAI` options に主画像検査の用途だけを渡し、既存OpenAI送信境界で適切な出力枠を選ぶ。不完全な主検査は未確認として停止する。画像プロンプトから誤った断定を除き、既存の人物別の手・小道具制約を再利用する。新しい分類器・依存関係・分割API・自動再試行は追加しない。

**Tech Stack:** React/Vite、JavaScript ES modules、Node `--test`、既存OpenAI/Gemini経路、Codex in-app browser。

## 現在の実行状態 — 2026-10-03

実装・実API生成・ユーザーの劇画/縮尺確認は完了。v6.8.1の軽微差注意事項/重大人体破綻保護ルールは関連150テスト通過。READMEに実v6.8.1画面と検証済み作例を追加し、全機能32ページ・Gemini12ページ・OpenAI20ページのPDFを更新、全64ページのレンダリング/内容/視認性を確認。README本文は現行機能として整理し、旧バージョン記述はChangeLogへ限定。

正式リリース v6.8.1 は完了。全1,133テスト、lint、build成功。リモートREADMEのメディア追加を保持して統合し、候補3b4d369を公開。正式receipt: `backups/release_receipts/nano-banana-pro-v6.8.1-2026-10-03_190242.json`、全10段階verified、2026-10-03 19:07完了。GitHub Release/配布asset/Pages/Cドライブ公開コピーを確認。完了済みリリースを再実行しない。

note本文・タイトル・現行PDF・履歴の更新と公開読戻し、Facebook同文・改行・友達（一部除外）の固有URL読戻しは完了。非公開証跡: `output/step2-cost-api-20261003/social-v681-receipt.json`。noteは56 figure、画像/動画/音声は保持、OpenAI添付PDFは最新版715KBへ差し替え、配布先カードは保存資料区画に保持。X直接投稿はユーザー除外、最終回答へMarkdownを表示。共通三媒体ゲートはX URLなしのため意図どおり不通過であり、三媒体投稿完了とは報告しない。アプリの接続済みlocalhostタブを保持。

完了: 最後の公式フルバックアップ `antigravity_full_backup_2026-10-03_193253.zip`（390.9MB）を保存。公式verify_full_backup.ps1がFULL_BACKUP_VERIFIED apps=7を返し、ZIP可読性・local/Drive SHA一致・7アプリ公開コピー・lock解放を確認。SHA256: D3D23C7C17E48E24FDCB8E416C15AB9A0D87611729270152844F9F70822ED5D8。対応manifestはroot backups内。バックアップ台帳のprivate GitHub同期も完了。リリース・バックアップの実行中セッションなし。X文面を最終回答へ表示して納品する。

### 最新の証拠と次の操作

- 主画像QAだけ出力枠を拡張し、固定4,500token目標と必須証拠の矛盾を除去。壊れた主回答の後続有料検査を止め、STEP2の無変更・範囲外修正の再監査も止める。人物を混同した手の削除指示を撤去し、画風は判読可能な人物ごとに検査する。モデル・推論強度・検査項目は削減しない。
- 既存画像の実QA: 主57.367秒、9,435出力tokens、finish=stop、全体83秒。旧8,192上限を超えて完了したが、証拠不足23件で合格ではない。
- 通常経路の実証: STEP2 209.626秒（生成・監査・修正の3呼出し）。修正案が台詞と話者順を変えたため採用せず、再監査0回で元候補を警告付き保持。STEP3 6.165秒。本文21,890文字、参照説明込みのUI表示22,872文字。STEP4 301秒、Sunburst/max、2240×3168、初回画像1枚、自動修正OFF。主QAは11,128出力tokensでfinish=stop。補助は読順転記とカメラ監査。切断は解消したが総合判定は未確認15件。
- 原寸目視: 通常・水彩・ちび化、9台詞と主要な反応は確認。2コマ目の劇画の顔表現不足と明示したミクの全身の足切れは未達。手渡し・衣装・全カメラを合格と断定しない。別題材との秒数比較から速度改善率を主張しない。
- 実API後に発見した共通原因: 人物一覧の読み取りが末尾のセミコロンだけを認識し、実際のピリオド形式では5人全員を落としていた。両providerの通常/圧縮プロンプトを使う回帰で再現し、両形式とGeminiの既存ANTI-CLONE形式を修正。Action見出しの既存表記差も共通読み取りへ反映。偽の人物一覧を拾わない負例を追加。これは新画像の実APIより後の修正なので、その実効はまだAPI未検証。
- 最新指示: システム改善の追加検査をユーザーが承認。前景の二人が不自然に小さい問題も追加。共通の「脇役を小さく」指定を通常/短縮/Web最終短縮の3経路で改め、遠近・遮蔽・地面と整合する縮尺を要求。遠方・明示サイズ差・ちびは保持。QAも縮尺と前後関係の矛盾を既存object_geometryで確認する。関連139テスト、QA単独81テスト、lint/build成功。全1,132テスト、最終lint/build成功（scale-final-all-verified.log / scale-final-build-verified.log）。
- 同一画像QAは3回実施し、画像再生成0。第1回71秒（主68.322秒/11,506tokens）：不正compact表、後続API0で停止。第2回109秒（主63.646秒/8,330tokens）：主＋手4＋読順＋カメラの7呼出し、未確認21件。縮尺/劇画の検出成功とは言えない。第3回は圧縮表の要求を通常JSONに戻し103秒（主9,771tokens）：表の解釈は完了したが全コマの画風など必須証拠不足が残り、QAはP3吹き出し尾も指摘。検査の信頼性・費用対効果の総合合格ではない。同条件でのQA再実行は増やさない。
- 検査回答の不正表には、セル内容を出さず列/行幅の構造診断を追加。古い表形式は互換パーサーで受け付けるが、新規QAには追加の位置依存形式を要求しない。証拠: cast-recheck-dom.txt / scale-recheck-dom.txt / objects-recheck-dom.txt。
- 描画の修正を実証するため同一台本の通常STEP3を実行し2.374秒で終了、明確な矛盾なし。本文21,872文字に新縮尺条件あり、旧縮小条件なし。scale-generation-prompt.txt / scale-step3-dom.txt / scale-ready-ui.pngに保存。
- 追加画像生成の承認ブロックは解除済み: ユーザーが「バグを直して画像を再生成して検証しろ」と明示。最終短縮版から通常STEP3を再実行し4.647秒（主4.452秒/413tokens/finish=stop）。本文21,744文字、新縮尺条件あり・旧縮小条件なし。最終payload本文はscale-final-generation-prompt.txt。以前の拒否を理由に再確認を繰り返さない。
- 明示指示後の新規生成1回を完了: Sunburst/max、2240×3168、参照2枚、修復元0、自動画像修正OFF。途中画像と最終画像の実受信を確認。STEP4は190秒。主QA59.030秒/10,878tokens/finish=stop、読順16.442秒/1,367tokens、カメラ3.048秒/147tokens。今回は主QAの人物別記録を受領でき、手の補足4回は発生せず（QAは計3呼出し）。同一画像・一変数の比較ではないので効率改善率や必然的因果を主張しない。
- 実画像の改善: P2のアカリ/ヒカリは中央奥にいて、前景のリン/サエコとの遮蔽と縮尺が整合。P2のサエコ/ミクの顔・手の墨線と陰影は前画像より強く、リンにも描き分けがある。P1通常/P3水彩/P4ちび、9台詞と主な演技を確認。ユーザーも「今度はちゃんと劇画になった」「小人化も防げている」と確認。この改善画像を保持し、追加の確信目的の生成はしない。
- 限界: ミクの全身指定に対して足先は依然画角外。手の細部、物体面の文字、肩越し/レンズ等に自動QAの未確認が残る（初回判定は未確認25件、明確な欠陥指摘なし）。不確かな違いや足切れだけを追加有料修正理由にしない。人物縮尺/劇画の改善実証と、全機能・全画像品質の合格を区別する。現在の実装/API検証は実施済み、条件付き公開・note/FB・X Markdown・フルバックアップはまだ行っていない。
- 新しい原寸PNG: output/step2-cost-api-20261003/scale-fixed-first.png、SHA256 4F2480D3DCDDDB3EA7F9658EFB42239DF4A7E3A4A5862CC186A695C1CC87D6D8。前画像の51A956DF...とは別データ。完了DOMはscale-final-step4-dom.txt、実画面はscale-fixed-result-ui.png。生成/API/テストの実行中セッションなし。既存IAB1タブの新画像・入力済み資格情報を保持しmarkHandoff済み。
- 証拠は ignored `output/step2-cost-api-20261003/` の `implementation-scenario.txt`、`implementation-prompt.txt`、`implementation-step2-dom.txt`、`implementation-step3-dom.txt`、`implementation-step4-dom.txt`、`implementation-first.png`、`implementation-result-ui.png`、`implementation-final-all.log`、`implementation-build-cast-final.log`。PNG SHA256: `51a956df7f82f07ffb66eba7865a875144132fa316b6100647550676a6593c86`。promptファイルは本文であり参照説明込み全文の保存ではない。
- IABは1タブの既存ページを保持。直近のcontrollerはbrowser2/tab3/providerTabId1、URL `http://127.0.0.1:5173/`。IDは再接続で変わり得るため新鮮な一覧で照合する。キー値は読まず、再入力・新タブ・再読込はしていない。生成・QAは終了。全1,132テストとlint/buildは終了・成功。

## 1. 作業境界と現在地

- 対象: `C:/Users/sx717/Antigravity/nano-banana-pro`。コマンド例の作業ディレクトリはこのアプリ。
- 最新指示: Astra ultraで実装計画を作り、Astra高へ実装直前で渡す。今回はアプリソース・テストを追加変更せず、有料API・公開も実行しない。
- 元の依頼は未完了: 無駄なSTEP2処理の修正 → 表現を広く含む実API検証 → 合格後に正式deploy/release → Xはチャット内Markdownのみ → 既存note・Facebook更新 → 最後に正式フルバックアップ。
- 対象外: 他アプリ、H3、モデルや推論強度の無断変更、全画風の一律強化、常時寄り構図、全員全身の一般化、別題材専用ルール、無制限の有料再生成、Xへの直接投稿。
- 現在はv6.8.0 / HEAD `1f5e948`。この版の正式公開・note/FB・バックアップは完了済み。今回の未公開差分と混同し、完了済み処理を再実行しない。
- 未コミット変更を保持: `src/lib/composition-variety.js`、`src/lib/scenario-payoff-quality.js`、`src/lib/image-quality-qa.js`、対応する2テスト、README、文書監査記録、HANDOFF。破棄してやり直さない。
- 計画と進捗の正本はこのファイル。HANDOFFとroot PLANは入口と現状の短い説明だけにする。

## 2. 確認済みの原因と、まだ断定できないこと

| 項目 | 根拠と判断 |
| --- | --- |
| 元のSTEP2 263.225秒 | 生成109.798秒＋監査66.565秒＋修正22.871秒＋再監査63.954秒。追加の約153秒は検査・修正。ただし尾の交差が残り、「長い分面白くなった」とは証明できない。 |
| 現在のSTEP2 250.996秒 | 別題材のため速度比較には使えない。4回のAPIで120.546/53.141/22.367/54.883秒。手渡しの距離と左右の手の連続性を修正。吹き出し限定パッチはこの実例では未使用。 |
| 主QAの切断 | `useMangaWorkflow.js` の `reviewImageCandidate` → optionsなし `callAI` → `openai-text.js` の非推論モデル共通8192。gpt-4.1が53.829秒、finish=length、output_tokens=8192、reasoning=0で終了。providerが正しく拒否し、主QA未完了。 |
| 表形式への変更 | キーの重複は減るが、8192固定は変わっていない。現在のテストは疎な記録で、実運用の5人×4コマの完了を証明していない。検査項目を落とさず補強する。 |
| 不正な主QA回答の後続 | providerの切断はrequestFailedで補助検査も停止する。一方、壊れたJSON/表をparserが単なるunverifiedとして返す場合は、後続の有料転記・カメラ検査へ進み得る。この非対称を修正する。 |
| 人物を混同する手の断定 | `hand-prop-kinematics.js:getPanelHandRoleResolution` がAction全体の「手で→左手→右手」を人物・同時性を判別せず検出。実P2ではリンの両手＋ヒカリの左右から「一人が過剰な動作」と誤認し、前の動作を描かない指示を追加。読み取り専用の関数実行でも再現済み。 |
| 劇画指示の経路 | 実画像プロンプトにGEKIGAの顔の造形・墨線、全身SHOT EXECUTION、可変コマ高が残る。指示脱落が原因とはいえない。 |
| 劇画の人物間の差を見逃す検査 | `buildImageQualityQaPrompt` は `art_style.face.subject` に `one primary visible actor` を要求し、`resolvePanelStyleEvidence` も1人分のみ読む。1人だけ劇画・他の明瞭な顔がアニメのままでも検出できない。人物名によるサエコ専用分岐はない。これは生成の偏りの原因とは別の、確認済みQAの穴。 |
| 温泉との違い | 温泉P3はタイトな主要3人・1話者・料金札と瓶。今回P2は5人全身・前景2動作・中景受け渡し・複数小道具・2吹き出し。顔面積と同時要求の競合は有力な仮説。題材固有の得手不得手や劣化の一般則を、この2枚から断定しない。 |
| コマ高の監査指示 | `buildScenarioPayoffReviewPrompt` は可変高さを認める一方で「縦A4を4分割した横長の帯」と記載。全幅1列・4コマ・内容に応じた高さ配分へ文言を統一する。 |

入力の32,000**文字**とQA回答の8,192**トークン**は別の制限。現在の `buildImageEditRequest` は短い変更指示＋固定制約で、元の長い画像プロンプトを継ぎ足していない。入力予算の既存境界を壊さない。

## 3. 再利用する証拠とブラウザー

- 主証拠: ignored `output/step2-cost-api-20261003/` の `live-topic.txt`、`live-cast.txt`、`live-scenario.txt`、`live-prompt.txt`、`step2-log.txt`、`step4-completed-dom.txt`、`live-first.png`。
- 実promptは23,130文字。STEP3は4.233秒、STEP4は167秒。初回画像2240×3168、SHA256 `1c86fa4e23c74141452a57f735717974eedec4bb951177466b34876c3372755c`。自動画像修正OFF、追加画像生成なし。
- 目視:7台詞が読め、P3水彩/肩越しとP4ちびは確認。P2足先が切れ、顔の劇画が弱い。衣装時系列も確認が必要。解剖・接触・全衣装・全カメラの総合合格ではない。
- 温泉の実入力: `output/focal-depth-api-20261003/onsen-visible-input.json`。同フォルダの `prepared-production-scenario.txt` は別のオフライン題材であり比較に使わない。添付の温泉画像は良好な顔表現の参考資料で、統制されたA/B試験ではない。
- ローカル1115/1115＋lint/build成功はQA表形式の追加前。追加後は関連142テスト＋lint成功。新しい変更の最終検証を代替しない。
- 2026-10-03の引継ぎ時: IAB browser4 / tab3 / providerTabId1、`http://127.0.0.1:5173/`、タイトルNano Banana Pro v6.8.0、1タブ。生成画像2240×3168とSTEP4終了167秒、画像生成/再検査ボタンを再確認し、markHandoff済み。ユーザーのキー入力済みの確認を保持。キー値は一切読まない。
- 続行時は現在の一覧・同じタブのURL・画面状態を照合する。ID変化を未接続と断定しない。新タブ、再入力要求、reload、Chromeへの切替を勝手に行わない。ローカルサーバーは待受中で、生成・検証・公開の実行中セッションはない。

## 4. Task A — 主画像QAの出力枠と失敗境界

**Files:** `src/lib/openai-text.js`、`src/hooks/useMangaWorkflow.js`、`src/lib/image-quality-qa.js`。テストは `tests/openai-text-completion.test.mjs`、`tests/workflow-image-quality-qa.test.mjs`、`tests/image-quality-qa.test.mjs`。`ai-provider.js` はoptionsを既に転送するため原則変更不要。

**Interfaces:** 既存 `callAI(prompt, images, system, onProgress, options)` の第5引数へ `outputProfile: 'image-quality-review'`。任意の数値上限をUIから受け取る新機能は作らない。主QA以外の用途とモデル経路を変えない。

- [ ] 最初に既存テストへ、主QA profileの送信body・開始ログ・完了diagnosticsが同じ実効上限を使う回帰を追加してREDを確認する。通常gpt-4.1=8192、STEP2推論モデル=32768が維持される正負ケースも入れる。
- [ ] 既存上限関数に以下の用途分岐を追加する。各fallbackモデルの反復開始時に実効値を一度確定し、Chat/Responses body、開始ログ、`readCompleteOpenAIText`へ同じ値を渡す。低水準request関数を直接呼ぶ既存テストでは既定値を維持する。

```js
const IMAGE_QA_OUTPUT_LIMITS = Object.freeze({
  'gpt-4.1': 32768,
  'gpt-4.1-mini': 32768,
  'gpt-4o': 16384,
});
const getTextOutputTokenLimit = (modelId, outputProfile) => {
  if (outputProfile !== undefined && outputProfile !== 'image-quality-review') {
    throw new TypeError('Unsupported output profile');
  }
  if (usesReasoningModel(modelId)) return 32768;
  return outputProfile === 'image-quality-review'
    ? IMAGE_QA_OUTPUT_LIMITS[modelId] ?? 8192
    : 8192;
};
// 主QAのcallAI第5引数だけ:
// { outputProfile: 'image-quality-review' }
```

現行Vision経路はgpt-4.1 → gpt-4o → gpt-4.1-mini。公式上限は2026-10-03に確認: [4.1](https://developers.openai.com/api/docs/models/gpt-4.1)、[4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini)、[4o](https://developers.openai.com/api/docs/models/gpt-4o)。大きい枠は使い切る命令ではない。短い証拠記述・表形式を残し、実使用量でコストを評価する。有限の枠で全入力の完了を保証したとは言わない。

- [ ] `readCompleteOpenAIText` に `outputTokenLimit` を追加し、diagnosticsの既定値再計算を置き換える。`requestOpenAIChatCompletion` と `requestOpenAIWebSearch` にも同じ値を渡す。`OUTPUT_TOKEN_LIMIT` のfallback停止、refusal・cancel・timeoutは維持する。
- [ ] `parseImageQualityQaResponse` の「切断」「compact表の復元不能」「root JSON/schemaの解釈不能」の早期returnだけに `requestFailed: true` を付ける。完全な主報告の一部手記録不足や不確かな画素は、既存unverifiedのまま補足可能にする。
- [ ] workflowでnativeChroma等の先行証拠を統合した後、主報告の `requestFailed` なら手・吹き出し追加API前にreturnする。既存failsafeはこの印で独立カメラ検査も停止する。構文エラーを画像の重大欠陥へ格上げしない。

```js
// parserの致命的な早期returnの形。既存の具体的なreasonを保つ。
return { pass: false, requestFailed: true, issues: [unverifiedIssue(reason)] };
// reviewImageCandidate内、native証拠統合後・補助API開始前:
if (review.requestFailed) return review;
```

- [ ] 実際のworkflow callbackを使う既存テスト方式で次を検証する。主QA切断/不正JSON/不正tableは主API1回、補助0回、画像生成0回、元画像保持。完全な主QA＋手記録不足なら既存補足を維持。完全な主QAなら文字転記と必要なカメラ監査を維持。
- [ ] 大きい回答がfinish=stopなら採用され、同じparse可能JSONでもfinish=lengthなら拒否される回帰を追加。length時fetch1回・fallback0回。4oへ通常の一時エラーでfallbackした場合の上限16384とログ一致も確認。
- [ ] 現在のtableテストを密な4コマ×5人fixtureで補強。手・人物inventory・identity・cast・画風・複数吹き出し・物体面・日本語台詞を含め、旧JSONとtableの正規化結果を `deepEqual` する。人物やコマの行を削って短縮しない。重大欠陥を残すケース、無害な差を修正対象にしないケースを含める。
- [ ] 欠落列、行長不一致、重複列、危険列名、余計なtableキー、深さ超過、切断を拒否する既存/追加テストを実行する。文字数短縮は補助指標で、トークン数や実API完了の代用にしない。

```powershell
node --test --test-concurrency=1 tests/openai-text-completion.test.mjs tests/openai-text-timeout.test.mjs tests/image-quality-qa.test.mjs tests/workflow-image-quality-qa.test.mjs tests/image-quality-failsafe.test.mjs
```

### Task A2 — 代表1人の顔でコマ全体の画風を合格にしない

**追加のユーザー観察:** 「正面の大きめのサエコ顔だけ劇画が強く、他のキャラは弱い」。実キャストではサエコは鋭いつり目、他の人物は大きめ/丸めの目。造形との相性と顔面積は仮説として残し、人物固有の優遇・固定した原因とは断定しない。

**Files:** `src/lib/image-quality-qa.js`、`tests/image-quality-qa.test.mjs`。Task Aと同じファイルなので逐次実施。生成レシピへ強調文を重ねず、追加の有料API段階も作らない。

**Interfaces:** `art_style.face` の代表1人を `art_style.faces` の人物別配列へ変更する。既存の顔記録のsubject/visibility/status/location/observed/construction/inkを再利用し、表形式にも対応する。`resolvePanelStyleEvidence(checks, contract, expectedActors)` へ既存 `extractPanelCastContracts(finalPrompt)` の当該人物を渡す。該当cast抽出をstyle検査より前へ移すだけで、新しい名前推測器を作らない。

```js
// art_style内の顔記録例。実装テスト用の合成証拠であり、実画像判定ではない。
faces: [
  { subject: '人物A', visibility: 'clear', status: 'ok', location: 'left face',
    observed: 'Carved nose and jaw with facial ink planes.', construction: 'realistic_planes', ink: 'modeled_ink' },
  { subject: '人物B', visibility: 'clear', status: 'defect', location: 'right face',
    observed: 'Flat anime face without modeled brow, nose or jaw planes.', construction: 'anime_template', ink: 'flat' },
]
```

- [ ] 先に回帰を追加。主要顔が劇画であっても、別の判読可能な顔が明確に通常アニメのままならPASS不可。materialな位置付き根拠と既存の `requested_medium_missing` がある場合だけ既存art_style修正対象へする。単なるラベル・全体判定と根拠の矛盾はunverifiedで、追加課金しない。
- [ ] 人物名と配列順序を入れ替えても同じ判定。台詞担当・黒髪・鋭い目・特定人物の名前を条件にしない。別人化を避けながら、顔の描き方はコマの画風に合わせる。
- [ ] 人物ごとの顔記録の欠落・重複・未定義人物は全体PASSを認めずunverified。単一 `face` の旧形式は、1人だけが検査対象と証明できる場合のみ同等扱いし、複数人の完全証拠へ昇格しない。
- [ ] 後ろ姿・遮蔽・遠景で評価不能な顔にはその場所と可視範囲を記録し、描かせ直さない。顔がよく見える人物がいる場合、他の人物が正しく根拠付きで評価対象外なら、その不可視部分だけを有料修正理由にしない。全員の顔が評価不能なら画風の顔部分はunverified。根拠なしに全員を隠れた扱いとして合格する抜け道を作らない。
- [ ] 同じ強さの影、同じ顔、正面への変更、全員アップを要求しない。横顔で判読できる造形も有効。大きい目という特徴だけで別人/失格にしない。明瞭な骨格・墨線の有無を実際の画素根拠で判定する。
- [ ] 参照画風保持・既存の対象外経路を維持。4主要画風の各コマで、必要な顔の検査を既存主QA内にまとめる。Task Aの密なtable fixtureにこの複数顔も入れ、出力削減のために顔記録を間引かない。
- [ ] 次の実画像目視では主要人物1人だけでなく、他の判読可能な顔も個別に確認する。現在の温泉画像は、この見逃しを調べる比較資料としても保持する。

## 5. Task B — 根拠のない「一人の手が足りない」断定を除去

**Files:** `src/lib/hand-prop-kinematics.js`、`src/lib/prompt-assembler.js`、`tests/prompt-hand-action-conflict.test.mjs`。共通のfull/compact制約は残す。

**Interfaces:** `buildMangaPrompt` の入出力は変更しない。不要な `getPanelHandRoleResolution` のimport・2呼び出し・関数/専用regexを除く。両providerと圧縮経路は既存 `HAND_PROP_KINEMATICS_LOCK` / `_COMPACT` を参照し続ける。

- [ ] 下記を既存テストの `buildPrompt` / `panelTwoSection` で追加しREDを確認する。特定キャラクターの例外ではなく、別人物の一般条件を試す。

```js
test('different actors do not acquire an invented completed gesture', () => {
  const action = 'ミクは両手で箱を持つ。ヒカリは左手で本を持ち、右手で扉を開ける。';
  for (const provider of ['chatgpt', 'gemini']) {
    const panel = panelTwoSection(buildPrompt(provider, action));
    assert.ok(panel.includes(action));
    assert.doesNotMatch(panel, /This Action overbooks one actor|earlier unsided gesture is completed and not visible/i);
  }
});
```

- [ ] `getPanelHandRoleResolution` に関係する3箇所だけを削除する。Action本文、明示された手、接触、小道具、主従、台詞、画風、カメラを変更しない。
- [ ] 「専用の断定文があること」を要求する既存テストは、必要な振る舞いへ修正する。真に同一人物が3役を要求される例でも、共通の人物別2本・同時1役・最終状態・第三の手禁止がfull/compactで残ることを確認する。
- [ ] 正常な両手、別人物の左右、眼鏡を直し終えてから両手で作業する明示的順序、同一人物の過剰動作を対にする。原文保持・共通制約保持・無根拠の完了断定なしを両providerで検証。日本語の人物動作パーサーを新設しない。

```powershell
node --test --test-concurrency=1 tests/prompt-hand-action-conflict.test.mjs tests/prompt-provider-parity.test.mjs tests/prompt-budget.test.mjs tests/prompt-web-quality-contract.test.mjs tests/single-image-prompt-sync.test.mjs
```

## 6. Task C — STEP2の既存修正を仕上げ、検査の矛盾だけ直す

**Files:** `src/lib/scenario-payoff-quality.js`、`tests/scenario-payoff-quality.test.mjs`。`src/lib/composition-variety.js` の現在の吹き出し整合差分をレビューして保持。広範な画風再設計はしない。

**Interfaces:** `runScenarioPayoffGate`、`applyScenarioStagingPatch`、review/repairの既存schemaを維持。

- [ ] 既存の吹き出し限定patchとno-op停止をレビューする。純粋なBALLOON指摘だけが限定編集となり、物語/演技の重大欠陥まで限定patchへ誤分類しないことを既存テストで確認する。
- [ ] 無変更修正は再監査なし、無効patchは再監査なし、最良候補を保持。Camera/BalloonLayout/状況以外の変更、行挿入、人物/台詞順の破壊、xの不正を拒否。反対側配置でも尾が交差せず読める無害な構図は許す。全てを同じ左右配置へ揃えない。
- [ ] 監査中の一文だけを下記へ統一。修正promptも可変高さと明示要求保持を引き続き参照することを確認する。全身や手渡しが読めない場合に、勝手な寄り構図・人物削除で解決しない。

```text
各コマは縦A4ページに全幅1列で上から4コマ配置し、高さは内容に応じて配分できる。等高の細い帯を前提にしない。
```

- [ ] 表現の欠落が重大な例と、既出文字の小ささ・意図的な静止/反復・シリアスな帰結など無害な例を既存回帰で維持。根拠のないUSER_REQUIREMENT_MISMATCHコードだけで追加課金へ進めない。
- [ ] 所要時間短縮を保証しない。選択モデル、推論強度、必要な監査を維持する。今回の4呼出しが常に必要とは言わず、無変更時など避けられる呼出し数をテストで証明する。

```powershell
node --test --test-concurrency=1 tests/scenario-payoff-quality.test.mjs tests/scenario-staging-lock.test.mjs tests/scenario-validation-dialogue-contract.test.mjs tests/prompt-composition-variety.test.mjs tests/general-serious-ending-modes.test.mjs tests/documentary-ending-modes.test.mjs
```

## 7. Task D — 品質を落とさない受入と実API

**Files:** 必要な回帰のみ既存testsへ追加。証拠はignored `output/step2-cost-api-20261003/` に保存。READMEの現行説明と `docs/readme-body-audit.json` は実装確定後に同期する。

| 契約 | 正常・重大・無害の区別 | 実画像で見るもの |
| --- | --- | --- |
| 物語 | フリ/予測/可視の帰結。説明だけの結末は不合格。シリアスへ笑いを強制しない | 台詞に頼り切らず起承転結と反応が読める |
| 画風 | NORMAL/GEKIGA/WATERCOLOR/CHIBI。背景斜線だけの劇画は合格にしない。隠れた顔は未確認 | 主要な可視顔の骨格/墨線、水彩、ちび化の違い |
| カメラ | 高低/前後/距離/遠近を物理的根拠で見る。名前の差だけは不足。意図的反復は許容 | 頭肩の見える面、前景遮蔽、人物占有率、明示の全身 |
| 身体・手・物 | 所有/接触/連続性/実本数。別人物を混同しない。自然な遮蔽は許容 | 手渡し、トング/トレイ等、腕と身体の接続 |
| 人物・衣装 | 顔の画風差と別人化を区別。衣装の時系列と眼鏡を保持 | 主要識別特徴、エプロン等の変化の前後 |
| 台詞・尾・文字 | 正確な日本語、話者、右→左、非交差、必要な物体文字 | 7台詞、尾の到達先、看板、題名/選択footer |
| 構成と背景 | 主動作・反応・空間が読める。背景精密さだけで主役を小さくしない | 人物と背景の分離、重要な作用と反応 |

全身の足切れだけで自動有料再生成へ進めない既存閾値は維持する。2026-10-03のユーザー追指示により、今回程度のアオリと演技が成立する足先の画角外は、受入を妨げない注意事項として許容する。全身が描けたとは記録せず、他の重大な破綻へ許容を拡大しない。画風の確実な欠落は既存の位置付き画素根拠に従う。

- [ ] Task A〜Cの新しい回帰が旧実装で失敗し、修正後に通ることを確認。既存変更を破棄してREDを再演しない。API入力文字数テスト・image-editテストも通す。
- [ ] 同じ保存済み福引シナリオを `buildMangaPrompt` の通常経路に通し、前後promptを比較。明示画風、カメラ、Action、台詞、小道具、参照制約、字数上限が保たれ、誤ったHAND ROLE RESOLUTIONだけが消えることをローカルで確認する。
- [ ] 全Node tests、lint、build、diff checkを変更確定後に1回実施。失敗や追加変更がなければ繰り返さない。`npm test` は存在しない。

```powershell
$taskTests = @(rg --files tests | Where-Object { $_ -match '\.test\.mjs$' })
node --test --test-concurrency=1 $taskTests
npm.cmd run lint
npm.cmd run build
git diff --check
```

- [ ] モデル切替後、追加の有料検証はその時点の直接指示と元の承認範囲を照合する。旧「QA2回＋手編集1回」の提案を無条件に実行しない。必要なら無償診断完了後に具体的な回数・目的・費用見込みを一度に提示する。承認済みの同じ作業への定型再確認やキー再入力待ちはしない。
- [ ] QA修正の実証は、保持中画像を既存の「品質再検査」で1回検査する。同じ画像・シナリオ・prompt、主QAと内部補助の実回数、finish、実出力、秒数を記録する。自動画像修正はOFF。これは画像を新たに生成せず検査経路だけを証明する試験。旧画像の欠陥を検出してもQAの失敗とは限らない。
- [ ] 描画経路の実証は、同じ実シナリオを通常STEP3→STEP4へ通した初回画像で行う。現在の既存STEP2証拠を再利用できる場合は無用に再生成しない。STEP2生成/監査promptを変更した部分の実証が必要なら同じ入力で通常STEP2から実行し、別題材へ逃げない。各有料段階の実行条件は直前の承認範囲と照合する。
- [ ] 生成結果を原寸/各コマで独立目視し、上の各項目をsatisfied/unmet/unverifiedで記録。AIのPASSだけで公開しない。途中の手編集や最終画像編集を、通常の初回生成が直った証拠へ置き換えない。
- [ ] 他の全選択画風・白黒・参照画風保持・シリアス・モザイク等は既存のローカル回帰も確認する。今回の4主要画風の実例から全組合せの実画像合格を宣言しない。未検証項目は明示する。
- [ ] 実行中のAPI/検証セッションがあれば完了まで同じセッションを追う。質問や苦情は中止ではない。初回が未達なら無償診断を続け、具体的な未達を保持する。静的テスト成功や中間報告をタスク完了にしない。

## 8. Task E — 合格後の承認済み納品

今回の計画作成中には開始しない。品質受入を通した次の候補版で、以下を別々の証拠として完了させる。新規リリース候補はv6.8.1を想定するが、実行時の既存tag/並行作業を確認し、衝突時に上書きしない。

- [ ] アプリ `docs/deploy.md` とroot `docs/unified_release_completion.md` を再確認し、README本文・PDF全頁・説明と実装を同期。現在の権限で必要なcommit/pushと正式preflightを行う。X告知Markdownの文面を準備し、FBと同じ確認済み情報・改行・リンクを使う。
- [ ] root `scripts/publish_app_release.ps1` の変更していない正式経路で公開。note/FB後にバックアップするため、この公開では `-RunFullBackup` を使わない。wrapper、Tee、独自monitor、別deployを足さない。失敗後のretryは正式手順と明示的なretry権限に従う。
- [ ] Pages/Release/source ZIP/Cドライブコピーの現在の版とreceiptを確認。v6.8.0の完了receiptを新しい版の証拠にしない。
- [ ] 既存note本文を必要箇所だけ更新し、全メディア/リンク/埋め込みを保って公開readback。Facebookは本人profileと「友達（一部除外）」を直前確認し、投稿本文と固有URLを読み戻す。Xは明示除外としてチャットにMarkdownで提示し、投稿しない。既存social receipt検証でこの除外を明記する。
- [ ] 最後に `backup_launch.bat` / `backup_full.ps1` の正式経路でフルバックアップ。既存手順のまま実行し、不要な可視ウィンドウ・監視wrapperを追加しない。完了後、archive可読性、manifest、local/Drive hash、7アプリ公開版整合性、lock解放を独立確認する。
- [ ] 最終回答は「実装修正」「実APIのシナリオ/prompt/画像」「公開」「X Markdown」「note/FB」「フルバックアップ」を根拠付きで区別する。未達を完了と呼ばない。

## 9. Astra高が最初に行う操作

1. ユーザーのモデル切替/続行指示を確認。root AGENTS→PLAN→app HANDOFF→本計画と `git diff` を照合する。現在の未コミット修正を保持する。
2. Task Aの主QA用途テストとworkflow失敗回数テストから実装開始。Task B/Cへ逐次進む。独立読み取り調査は既に済んでおり、広範な再調査を繰り返さない。
3. API前に1タブの現在状態を確認。キー値にアクセスしない。予定していない再生成や別ブラウザーを開始しない。

この計画の作成は、バグ修正・実API合格・公開完了を意味しない。今回の停止理由は、ユーザーが明示した「実装手前でAstra高へ引き継ぐ」という境界である。
