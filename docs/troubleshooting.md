# 参照キャラクター本人へ意図しないモザイクが付く

- 原因: 参照シートは人物の同一性資料であるのに、共通モザイク指示と参照添付の契約がモザイク対象の証拠と明示的に区別していなかった。参照の存在・説明文・画風・外見の類似だけで版権人物と判断される余地があった。実際の個別画像の判定原因はモデルの内部説明なしに断定しない。
- 対策: `render-options.js` の共通 `MOSAIC TARGET SCOPE` をシナリオ、描画、OpenAI/Gemini参照添付、QA・比較・修復へ適用。自動遮蔽は台本のActionで実際に描く既存作品の人物に限定し、原文に明示した本人への意図的モザイクは対象・領域を維持する。モザイクOFFを参照画像からONに戻さない。
- 回帰: `tests/render-options.test.mjs` は誤対象化の禁止、意図的モザイクの許可、両プロバイダーの参照契約、QA・修復、契約削除時の拒否を確認する。テストは指示・役割の到達証拠であり、生成画像の遵守証拠ではない。公開前は実API画像で、非対象の参照キャラが無遮蔽、対象の印刷人物が遮蔽されていることを独立に目視する。

# STEP2 scenario generation / シナリオ生成

## 空応答・途中の本文からモデル切替や品質リトライが続く

- 原因となる実装: GPT-6/GPT-5.6の導入時、旧モデルの `max_tokens: 8192` を推論モデルの `max_completion_tokens: 8192` に置き換えただけで、推論の消費分を確保していなかった。ニュース検索も `max_output_tokens: 8192` 固定だった。推論と本文が同じ出力枠を使うため、本文が出る前に上限へ達する場合がある。
- 応答判定も `message.content` の有無だけで、Chatの `finish_reason: length`、Responsesの `status: incomplete` / `incomplete_details.reason` を見ていなかった。空なら全モデルへの切替、部分本文があれば成功扱いとなり、未完成のシナリオが品質検査へ流れていた。過去の空応答の個別原因は、当時捨てていた終了理由なしに断定しない。
- 修正: 推論モデルは32,768、旧モデルは8,192の上限に分離。推論設定・選択モデル・入力内容・品質ゲートは維持する。ChatとResponses共通で終了状態を検査し、上限終了は `OUTPUT_TOKEN_LIMIT` としてモデル切替を止め、未完成本文を採用しない。拒否、未完了、完了した空応答は別分類にする。
- 確認: `[RESPONSE]` に `finish`、検索時の `reason`、`output_tokens`、`reasoning_tokens`、`limit` が出る。使用量がない場合は0ではなく `unknown`。キー、リクエスト本文、非公開の推論内容は記録しない。回帰: `tests/openai-text-completion.test.mjs` と `tests/text-api-errors.test.mjs`。
- 公式仕様: https://developers.openai.com/api/docs/guides/reasoning#allocating-space-for-reasoning

# STEP3 prompt generation / 指示文構築

## 「混雑」と表示される／待っても構築中が解除されない

- 未分類エラーを通信障害へ一括変換していたため、文字数・台詞構文・内部例外でも待機案内が出ていた。現在は入力検証、認証、権限、モデル、利用枠・残高、レート制限、時間切れ、ネットワーク、HTTPサーバー障害、空応答、応答形式、内部・未分類を区別し、API失敗のprovider/model/HTTP/codeを保持する。未知のエラーを混雑と断定しない。
- AI精査は実際のモデル試行と1モデルごとの待機上限を表示する。失敗・不正なJSONは精査未完了として元の指示文を保持する。Geminiの全モデル失敗後に別のモデル一覧APIの結果で原因を置き換えない。認証失敗・明確な利用枠不足・拒否・キャンセルは後続モデルで繰り返さない。
- シナリオ強化／復元がSTEP3を無効化しても構築中フラグを解除しない経路があった。共通の無効化処理で旧通信を中断してロックを解除し、旧処理の完了で新処理を上書きしない。回帰: `tests/prompt-wait-counter.test.mjs`、`tests/text-api-errors.test.mjs`、`tests/comedy-review.test.mjs`、`tests/safety-filters-error-guide.test.mjs`。利用者が以前遭遇した個別の原因は当時のログなしでは確定できない。

# STEP4 image generation / 画像生成

## 題材の説明が全コマの演技指定になる／演出が平板になる

- 題材の動詞だけで全コマへ絶対演技指定を複製していた。現在は具体的な登場人物または明示されたコマ・ページ・カメラの範囲を確認し、一般的な説明文は題材として保持する。回帰は `tests/manual-staging.test.mjs`。
- 再生成判定の寛容さと生成時の演出目標を分離し、共通の演出指示をSTEP2と選択式強化へ渡す。画像指示ではGペン線、主焦点の鮮明さ、背景との濃淡、実際の動勢・遠近、作中のモニタ表裏を圧縮後も保持する。両プロバイダ・カラー／白黒・1枚絵の回帰は `tests/expressive-direction.test.mjs`。指示の保持は実画像の品質証明とは別で、HANDOFFへAPI画像の目視結果を記録する。

## 小道具が隣のコマへはみ出す

- コマ境界の保護が頭・髪に偏り、未圧縮の白黒経路には境界指示自体がなかった。人物の意図的な枠越えは残し、小道具・画面表示・文字は所属コマに収める共通指示を両プロバイダ・カラー／白黒へ渡す。回帰は `tests/expressive-direction.test.mjs`。画像生成の確率的な追従は実画像で別途確認する。

## コマ間で衣装の付属品が増減する

- 主要な服や色の固定だけでは細部の再設計を防ぎきれないため、服・付属品の有無、数、形、取付位置を人物ごとに一度確定して共有する。キャラ名・特定部品を固定した例外や禁止は使わない。カラー／白黒、両provider、資料画風、長文圧縮に同じ契約を適用する。
- 台本上の着脱・損傷等は許可する。遮蔽、画面外、短縮遠近法は衣装消失の証拠にしない。長文圧縮では上位の衣装原文を保持し、各Actionへ機械注入した同一衣装文だけを重複排除する。台本の状態変化は削らない。
- API検査の `wardrobe_continuity` は、2コマの部位・状態・明瞭な可視性と同一人物の根拠を必須とし、不足や着脱の可能性は `unverified` とする。検査報告自体に衣装比較がなければ合格にしない。1枚絵へコマ間比較を要求しない。ルールの存在とテスト成功は実画像の改善を証明しないため、画像確認は別に記録する。

## 話者名混入・横書き化・2×2コマ割り

- `人物名「...` の閉じ括弧欠損は、旧抽出処理では話者名を本文へ漏らす原因になった。現在はSTEP2／STEP3と最終送信境界で拒否する。STEP2の該当行を直してからSTEP3を再構築する。正当な引用を一律削除する修正は行わない。
- ChatGPT側で横長縦1列の指定が欠けていたため、4コマでも2×2を選べる状態だった。現在は両provider共通のPAGE契約へ4本の全幅横長コマ・縦1列・2×2禁止を明記し、長文圧縮後にも保持する。以前コピーした文章には遡及適用されないため、STEP3から再構築してコピーし直す。
- 角括弧なしの `Camera:` 行が既定カメラへ置換され、台本と画像指示に相反する画角が残る経路も修正した。`[Camera: ...]` と独立した `Camera:`／`カメラワーク:` 行は両providerで同じ明示指定として読む。台詞中の `Camera:` は指定として扱わない。
- 縦書きは、正立文字・上から下・列は右から左を指定する。自動検査は台本なしの画像転記で本文・位置・書字方向を調べ、同一列／行の隣接2文字の座標と方向判定が一致しない場合は未確認にする。モデルの「横書き」というラベルだけを理由に有料修正しない。画像認識にも誤判定があり、目視確認は引き続き必要。

## Web用制作情報JSONがAPI画像生成後まで無効になる場合

- 症状: 最終プロンプトが完成しているのに、Web貼付案内直下の制作情報JSONボタンが薄い無効状態になり、API画像を生成するまで使えない。
- 原因: Web手動生成の別添JSONと、API生成PNGへ埋め込む画像来歴JSONを「制作情報」という名前だけで同一経路へ統合し、API側だけに必要な出力画像・モデル・画像ハッシュをWeb側にも要求した。
- 防止境界: Web用は `buildWebGenerationMetadata`、API画像用は `buildGeneratedImageMetadata` を正本とし、前者は出力画像やAPIモデルを受け取らず、後者は実画像を必須とする。Web用ボタンは最終プロンプトだけを有効条件にし、API用ビルダーや画像変換を呼ばない。
- 検証: Web用レコードに `record_type: web_generation_companion` と `workflow_mode: manual_web_generation` があり、`output`、`generation_id`、モデルID、フォールバック状態を推測していないことを確認する。API画像用レコードは `record_type: api_image_generation` と実出力ハッシュを保持する。両経路の混同は `tests/generated-image-metadata.test.mjs` の正負テストで失敗させる。
- 設計原則: 同じ表示名・説明文・データ項目があっても、取得できる事実と完了時点が異なるワークフローを同一ビルダーへ統合しない。文章上の注意だけでなく、異なる関数境界と禁止条件の回帰テストを残す。

## 自由入力なのに題名・台詞へ「手入力」「最新ニュース」などが混ざる場合

自由入力では、入力した題材または取得できたURL本文だけが物語材料です。入力欄の名前、入力方式、ニュース検索用カテゴリ・日付・鮮度条件、`Custom Scenario`や`Generic Background`等の内部プレースホルダーは題名・場所・視覚証拠・台詞・小道具・SNS解説へ入れません。現行版はこれらをニュース用プロンプトから分離し、原文にない内部ラベルを生成結果から検出した場合は改善再生成します。上限後も処理を止めず、品質点の最も高い候補を保持したまま残存ラベルだけを決定処理で除去・補正し、SNS解説にも同じ除去規則を適用して再検査後にSTEP3へ渡します。題材そのものが「紙の手入力を減らす」のように該当語を明示している場合は、その語を正当な内容として保持します。

深刻な題材を自動判定して`シリアス内でおまかせ`にした後、生成文が`感動詐欺`等のギャグ名を返しても、生成文側で選択を上書きしません。既に不具合を含む保存済みシナリオは自動変換しないため、STEP2から再生成してください。

静寂型（シュール）は通常の因果回収ゲートとは別に判定します。物・設備・舞台の大破壊、因果の飛躍、支離滅裂、不条理な突然変化を、真顔・沈黙・奇妙な間で目に見える笑いへできていれば、論理的な伏線や自然な予測を後付けしません。説明や標語だけで終わるものは不合格ですが、辻褄が合わないこと自体は失敗理由にしません。人物のグロ・身体損壊等の既存安全境界は維持します。

## 案内板・画面・メニューの文字が人物の吹き出しになる場合

状況文で人物が案内板などの列挙文字を「読み」「確認し」ていても、それは作中面の文字であり発話ではありません。v6.4.9以降は、`「項目A」「項目B」の文字を読み`のような後続文脈を視覚情報として分類し、明示台詞行だけを吹き出しへ入れます。`読み上げる`、`叫ぶ`、`告げる`など明示的な発声は従来どおり発話です。保存済みシナリオはSTEP3からプロンプトを再構築してください。

## 台詞の欠落・話者対応・読み順が崩れる場合

配置表などの印字が誤って発話になる場合、引用後の単語に含まれる「返」「呼」等を発話動詞として拾う旧判定が原因の場合があります。現行のローカル修正では、引用に直接続く印字・記載・表示の文型を先に判定し、発話は引用へ結び付いた動詞だけから抽出します。既存プロンプトの文字を手作業で消すだけでは、再構築時に戻るため、修正版のSTEP3で元シナリオから再構築してください。

同じ行の話者が混ざる、同じ台詞が省略される、括弧内の本文が消える、台詞末尾の話者指定が尻尾に反映されない、話者未指定の台詞の後で尻尾番号がずれる問題も共通抽出処理で修正しています。全角・漢数字のコマ番号が1コマ目へ混在する問題は、入力検証と生成側のコマ分割を共通化して修正しました。画像に残る不一致は、最終プロンプトと実画像を別々に確認してください。

台詞の抽出順が正しくても、話者位置を優先した画像生成や、修正AIが返す逆の配置指示で読順が壊れる場合があります。共通プロンプトは複数吹き出しごとに `BUBBLE SLOTS` を作り、`x=0`をページ左、`x=100`をページ右として、B1から順に右→左の数値座標を割り当てます。さらに絵や人物より先に吹き出し本体を数値スロットへ描いて固定し、その後でヒゲだけをB番号に対応する話者へ接続します。ChatGPTの長文圧縮でもこの手順と数値スロットを残します。QAの読順照合は文字本体を保持したまま句読点・長音などのOCR揺れを無視するため、末尾記号の誤読で明白な逆順を`unverified`へ落としません。古い最終プロンプトはSTEP3で作り直す必要があります。

Camera/Actionに前景・後景があるだけでは、人物ごとの左右位置を指定したことになりません。人物名に結び付いた左右指定がない場合は、前景・後景・大きさ・画角・接触動作を保ったまま話者のX方向を台詞順に右→中央→左へ置きます。`右手前にA、左奥にB`のような明示指定がある場合は、その左右を上書きせず吹き出し本体だけを読順スロットへ置きます。

発話が一つだけのコマでは、人物の左右指定があっても複数フキダシ用の「B1を右端」規則を適用しません。人物を指定位置に保ち、唯一のフキダシ本体を話者の近くの空き領域へ置き、ヒゲをその人物の口元・頭部へつなぎます。画像QAが正しい接続を申告しても、本体と話者が大きく離れていれば合格とせず、実画像でヒゲの根元・経路・先端と人物の特徴を確認します。距離だけでは誤接続と断定しないため、自動再生成ではなく未確認扱いにします。既存のプロンプトはSTEP3から再構築してください。

しっぽが話者の頭上を横断する場合は、先端の話者対応だけでなく根元と経路も確認します。現行ルールは、根元を吹き出し下半分の中央寄り・話者側に置き、頭・顔・髪・台詞文字を避ける最短の空き経路で口元または頭部へ接続します。QAも根元、経路、先端を別々に検査し、正しい話者へ届いていても途中で頭・顔・髪・文字を横切れば不合格にします。

API検査は台本・参照画像を見せない候補画像だけの文字転記を追加し、実文字の位置と台詞順を照合します。修正AIの自由文による配置指示は採用せず、読順修正の配置を台本から決定します。比較AIの好みで、確認済みの正しい台詞・読順が逆戻りする候補を採用しません。モデルによる画像認識の誤読はあり得るため、プロンプト検査・内部QA・実画像の採否は別に扱います。

冊子、紙、看板、画面、ボード、包装などの作中文字が吹き出しとして数えられる場合は、文字の内容だけでなく入れ物を確認します。独立読順QAは全可読領域を `speech_balloon`、`printed_object`、`caption`、`sound_effect`、`uncertain` に分類し、自由に浮いた漫画吹き出し本体の文字だけを左右順へ使います。矩形の紙面や画面を囲む線は吹き出し枠ではありません。印刷物は文字や中心座標が読めなくても、物体面である根拠が確認できれば台詞順を未確認にしません。入れ物自体が判別不能な場合だけ `uncertain` として止めます。

ト書きの短縮名や背景の残り人数を抽出できないと、Actionに登場する人物へABSENT/SOLOを付ける矛盾が起きます。登録名から解決できる短縮名と、残りの登録人数に一致する背景集団を人数制約へ反映します。手動編集したPunchlineの既知の結末名は古い解決済みモードより優先し、自由記述の人物特徴やサングラスも欠落させません。

## STEP2 category-news scenarios do not run with an OpenAI key / OpenAIキーでカテゴリニュースのシナリオが動かない場合

An OpenAI connection must not call Gemini. Category-news scenarios therefore use OpenAI Responses Web Search only when the active provider is OpenAI; Gemini connections continue to use Google Grounding only. Reconnect with the intended provider if the header says otherwise. / OpenAI接続時にGeminiを呼び出してはいけません。そのためカテゴリニュースのシナリオは、アクティブプロバイダーがOpenAIのときだけOpenAI Responses Web Searchを使い、Gemini接続時だけGoogle Groundingを使います。ヘッダーの接続先が意図したプロバイダーと違う場合は、目的のキーで再接続してください。

If the STEP2 log reports that every OpenAI Web Search model failed, the request remained on OpenAI and did not fall back to Gemini. Check the OpenAI API key, account balance, and Web Search availability for that account, then retry. / STEP2のログでOpenAI Web Searchの全モデル失敗と表示された場合も、Geminiへのフォールバックは行いません。OpenAI APIキー、残高、そのアカウントでのWeb Search利用可否を確認してから再試行してください。

## 職業制服の消失・白黒の明部が灰色になる場合

- 職業制服が一般服になる場合は、保存済みの `Outfit` と最終プロンプトを照合する。旧安全変換は日本語の「制服」を一律で一般服へ置換していた。現在は学校由来と明示された衣装だけを変換し、職業制服と人物・役割別の割当を保持する。Geminiのシリアスモードでも、衣装の指定がある場合はキャラシートの衣装へ戻さない。保存済みOutfitが私服ならSTEP2再生成またはOutfit・ト書きの編集後、STEP3を再構築する。
- 白黒の背景・顔が中間灰色に沈む場合、旧「遠景を網点でぼかす」指示と、白地の予約範囲の不足が原因候補になる。現在は白地・黒ベタ・範囲を限定したトーンを指定し、肌の明部と明るい壁・天井・布地を白く残す。遠景は線密度と白い隙間で整理する。API／Web短縮／QAへ同条件を渡すが、プロンプト検査は生成画像や実ピクセルの検証を代替しない。

- An explicit `organization must be verified` response for GPT Image 2.5 is an organization-verification gate, not proof of an invalid API key. Check organization settings, complete individual verification in the official UI, and allow approval to propagate. The STEP4 selector offers manual GPT Image 2.0 selection without automatic resubmission.
- `Action:` lines can contain silent actors. Classifying them as dialogue omitted these actors from generated cast constraints. `extractCastLimitRule` now collects explicit Action lines before dialogue classification; a two-character, one-speaker regression test protects this behavior.
- STEP4 now exposes an automatic-quality-repair checkbox, enabled by default to preserve existing behavior. Disable it for a one-image-per-setting comparison: QA still runs but retains the original image and warning without a paid repair attempt. A regression test asserts zero repair calls even for concrete QA failures. Automated QA can return PASS despite missing dialogue; it does not establish exact script compliance.
- A repair passing QA no longer automatically replaces the original. Direct image comparison must explicitly prefer the repair with a concrete reason; ties, invalid comparison output, missing comparison service or errors retain the original. Both comparison inputs are ordered explicitly (original first, repair second), followed by available reference images.

# Hugging Face ZIP deployment recovery

## NO_APP_FILE with Dockerfile present / Dockerfileが存在する場合のNO_APP_FILE

On 2026-09-10, the authenticated runtime API reported `NO_APP_FILE` although the published repository had `sdk: docker`, a root `Dockerfile`, and nginx configured for port 7860. The build-log API returned HTTP 200 with an empty stream. After explicit user approval, one `HfApi.restart_space(..., factory_reboot=True)` changed the state to BUILDING and then RUNNING at the same v5.9.6 commit. The browser loaded the application. No application source, repository, hardware tier, or Space configuration was changed by this recovery. The underlying Hub cause remains unproven.

2026年9月10日、Dockerfileとポート設定が正しく公開されている状態でも、HFは `NO_APP_FILE` と判定し、ビルドログは空でした。利用者の明示承認を得たFactory restartを1回実行すると、同じv5.9.6コミットのままRUNNINGへ復旧し、ブラウザーで表示できました。アプリのソースやSpaceの設定、ハードウェア契約は変更していません。HF内部で停滞した原因までは断定していません。今後もFactory restartを通常デプロイへ自動追加せず、公開ファイル・現在の実行状態・ログを確認してから、その復旧操作の承認を得てください。

## Binary rejection / バイナリ拒否

On 2026-09-07, the Hub rejected the 421,717-byte distribution ZIP as a regular Git binary. A size below 10 MB does not make this ZIP acceptable as a regular blob. v5.9.3 tracks every existing ZIP declared by `public/.gitattributes` with Git LFS in the HF checkout only. Pages attributes remain unchanged.

2026-09-07の送信では、421,717バイトの配布ZIPも通常Gitのバイナリとして拒否されました。v5.9.3では `public/.gitattributes` に記載され、実在する全ZIPをHF側だけでGit LFS対象にします。Pages側の属性は変更しません。

Unpublished deployment commits can retain rejected blobs in history. The official deployment script first preserves those commits on a local recovery branch, then rebuilds from `origin/main`. Do not force-push or delete recovery branches. Resume releases through the workspace's `scripts/publish_app_release.ps1`; full backup is a separate operation after remote publication is verified.

拒否されたZIPが未公開コミットの履歴に残る場合があります。正式な送信スクリプトは、そのコミットを復旧用ブランチへ退避してから `origin/main` を基点に再構築します。強制pushや復旧用ブランチの削除は行いません。リリースは共通の `scripts/publish_app_release.ps1` から実行し、リモート反映を確認した後に別工程でフルバックアップします。
## コマ途中の切断・タイトル書体の置換（2026-09-21のローカル検証）

- 原因: 生成画像の枠検出に失敗すると、固定座標を縦比率で換算して四分割する後処理が走った。元のコマ高・タイトル領域・余白が異なるため、顔や吹き出しを切断し、隣のコマを混入させた。Canvasでのタイトル描き直しも生成時の長体デザインを置き換えた。
- 対処: この後処理を撤去し、生成画像をそのままQA・表示・保存する経路へ復帰。生成指示の等高制約も、ページ全体の配分目安と内容に応じた可変コマへ統一した。検出失敗時の推測切断は使用しない。
- 既に加工した画像の欠損はコード修正だけでは戻らない。この失敗候補は合格扱いにせず、改善版の画質は別の実画像比較が済むまで未検証とする。
- 現行の正規化はタイトル・分割しない4コマ全体・フッターの3領域だけを扱う。4コマ全体の左右幅には横枠線の端を使い、外枠より外の白余白だけを除く。タイトルが上下左右の揃った矩形罫線で囲まれた場合は、その内側だけから文字範囲を検出し、モデルが描いた文字を残して枠線を除く。出力寸法は切り出し幅ではなく元キャンバス幅から決めるため、1536×2304入力は1536×2304のまま維持する。

## 人物の横並び化・台本と異なる視線や撮影高さ（2026-09-29のローカル検証）

- 台詞の順序から人物の左右位置まで決める補助と、肩越し構図を全員の相互注視へ変換する補助が、台本の位置関係・個別の演技と競合していた。吹き出しの右→左の読順と話者への尻尾は保持し、人物の位置・接触・視線はCamera/Actionから引き継ぐ。相対的な「胸より低い位置」を床面へ強めず、床・地面を明示した撮影だけ床面の投影を補う。
- STEP2の評価には入力題材と人物の連続性を渡し、根拠のある重大な演出破綻だけ修正対象とする。意図された静止・同調は許容し、配置だけの修正で筋・台詞を変更する応答は適用しない。プロンプト圧縮では重複する人物識別・読順を共通定義へ集約し、台詞・衣装・撮影条件や32,000文字上限を緩めない。
- 回帰は`scenario-payoff-quality`、`panel-utils-dialogue`、`prompt-conversational-eye-line`、`prompt-composition-variety`、`prompt-budget`、`prompt-web-quality-contract`の各テストで確認する。実画像では人物配置が改善しても、接触の帰属やレンズ投影まで合格したとは限らない。モデルの自然文のPASSと機械可読根拠の不足を区別し、直近の画像・判定・追加修正の未検証範囲はHANDOFFに記録する。


### 演技が静寂・同じ開口へ偏る場合

- STEP2のトーンを題材と無関係な乱数で強制していた経路を撤去。静寂型・爆発型の明示選択は保持し、他は題材と明示演出へ委ねる。生成ログの採用トーンと実シナリオを照合し、旧シナリオをSTEP3だけ再構築してトーンが変わったとは扱わない。
- 顔演技は人物ごとの反応段階と身体軸へ結び付け、圧縮後も同じ共通定義を使用する。開口禁止や全員違うポーズのノルマは設けない。配置が分散しても物語上必要な相互作用が消えれば既存の演技監査で確認し、口の開閉や好みだけでは再試行しない。
- カメラの「低め／高め」も撮影高さとして解釈する。顔・身体と背景を同じ投影で描く指示を保持し、構図＋身体の強化で主役の全身を常に要求しない。回帰は `documentary-ending-modes`、`facial-acting-prompt`、`prompt-composition-variety`、`scenario-payoff-quality`、`prompt-web-quality-contract`、`prompt-budget`。実際の演出品質は参照画像と生成結果の比較が別途必要。

### 吹き出しの読順逆転と、検査側の話者取り違え

- シナリオ設計で台詞・話者・尾と右→左の読順を一組として扱う。人物の位置・視線・演技を横一列へ戻さず、Camera/Actionに沿って吹き出しの余白と尾の経路を確保する。長文圧縮でも各台詞の相対位置と話者対応を残す。
- 画像転記に断片が余分に混入しても、全文と位置が一意に対応する吹き出し間の逆転は検出する。残りの転記は未確認として併記し、同文の重複や部分一致から話者・順序を推測しない。
- 検査AIのB番号と可視台詞が合わなければ、その番号を根拠に尾を別の人物へ修正しない。自然文の不合格だけでは修正対象にせず、提出台本と照合できた台詞・位置・尾の観察を使う。回帰は `bubble-inventory`、`image-quality-qa`、`manga-reading-rhythm`、`prompt-web-quality-contract`、`prompt-budget`。コードの検査と実画像の改善確認は分ける。

### 「全身寄り」を接写へ誤変換する場合

- Camera内の「全身寄り」「頭から足先まで」と一般的な寄り表現を同時に検出すると、接写の補助が優先されていた。明示された全身の画角を先に確定し、顔だけのアップ指定はそのまま保持する。全身指定のないコマに足先の描写を強制しない。`prompt-composition-variety`の許容・禁止ケースと、長文を含む画像プロンプトの回帰で確認する。

### 4コマのカメラが同系統へ偏る場合（2026-09-29）

- 原因: STEP2が名称の異なるショットを別構図と扱い、低い視点を複数コマへ指定できていた。STEP3は確定Cameraを保持するため、この段階で角度を変更しても元の設計と衝突する。
- 対策: STEP2の既存構成監査に、4コマ分の物理的な視点と物語上の役割の比較を追加。重大な意図しない反復は演出だけを1回修正する。台詞・話者順・メタデータは既存ガードで保持し、根拠不足・意図した反復・同じ高さだけの違反判定では修正しない。監査APIの別呼出しは増やさない。
- 投影補助: 日本語の「ダッチ」を認識し、魚眼には周辺線の湾曲を指定。通常の広角へ魚眼歪みを追加せず、傾き指定だけでアオリへ変えない。
- 検証: `node --test tests/scenario-payoff-quality.test.mjs tests/prompt-composition-variety.test.mjs tests/seasonal-outfit.test.mjs`。実画像への効果はSTEP2からの新規生成で確認する必要があり、コード検査だけで改善済みとしない。
# 吹き出しの配置設計と床近くの視点（2026-09-29）

- 症状: 台詞・尾の対応を後から指定しても、人物の左右配置と余白が未確定だと非話者への誤接続や読順逆転が残る。床近くからの見上げ指定が一般的なlow-angle分岐へ先に入り、撮影高さの補助指示が失われていた。
- 対応: STEP2で各コマの`BalloonLayout`をCamera・状況と一緒に設計し、STEP3で発話件数・話者・右から左の順・尾の経路の記入を検証する。配置は印字対象から除外し、圧縮後も保持。従来シナリオは対応を維持し、固定座標や人物の横一列配置を強制しない。床指定は一般的な見上げより具体的な分岐を優先する。
- 判定: 床から見上げる指定への合格には異なる対象の下面を画像内の座標とともに示す。根拠不足は未確認とし、それだけでは画像を再生成しない。構造検証は実画像の接続・演出の保証ではないため、画像を別途確認する。
- 実画像で判明した誤判定: 尾先と口/頭の座標差だけで誤接続を確定していた。漫画の尾は話者に触れず手前で止まる場合もあるため、距離だけなら未確認とし、明確に別人を指す・対象を識別できない尾と区別する。`points_to_speaker`も受理し、短い正常な余白と、別人への接続/顔を横切る経路の正負回帰を保持する。

### 指示文・検査応答の肥大化（2026-09-29）

- 初回指示文は15,000字のソフト目標へ既存の圧縮を最後まで適用する。途中で終了していた経路を除去し、台詞・人物・カメラ・演技・光を残す。必須情報が残る場合は目標超過を許容し、32,000字のAPI上限とは区別する。
- 修正指示は最初から修正方法と確認条件だけを送り、診断の長い本文を再添付しない。修正内容自体が4,000字を超える場合は切り捨てず元画像を保持する。過去履歴は1,000字以内とし、空なら付けない。
- QAは短い観察を要求するが、モデルが長さ指定を守る保証はない。APIの終了理由が出力上限なら、JSONが読めても未確認とし、合格や画像再生成の根拠にしない。実応答の文字数と出力トークンをログで確認する。回帰は`prompt-budget`、`image-quality-qa`、`image-quality-failsafe`。
- カメラは高さだけでなく寄り・中景・引きも既存の4コマ監査で比較する。必要な空間や人物間距離が寄り続きで読めない場合だけ、有界な演出修正へ接続する。広角レンズは引きの証拠ではなく、明示された寄りだけのページは保持する。
- 「引き」に加えて「引いた」「引いて」も撮影距離として補助する。明示された接写を広角レンズという語だけで引きに変換しない。

### STEP4の秒数が止まって見える場合（2026-09-29）

- 待機行をログの途中で更新していたため、最新ログまでスクロールすると見えなかった。現在の処理名と開始からの実経過秒数を進捗窓の固定見出しへ表示し、画像生成・品質検査・修正・候補比較を区別する。終了時はタイマーを解除し合計秒数をログへ残す。
- 画像生成開始時だけページ最下部へ移動し、ログ更新でページを再スクロールしない。生成終了後に結果へ450msのフェードを適用し、ブラウザーの動作軽減設定ではアニメーションを無効にする。
# 引きの指定が顔中心の中景へ戻る場合（2026-09-29）

初回のCameraが「少し引く」だけで、全員の細かな表情や手元を同時に読ませると、距離の指定が実画像へ反映されない場合がある。新規シナリオでは身体が見える範囲と人物の前後関係・周囲の空間を記述する。手前の人物は大きく描けるようにし、全員を一定比率へ縮小しない。身体演技には十分なコマ高を配分し、均等な帯へ収めるために寄りへ変えない。読みやすさはその画角の輪郭・明暗・身体演技で保つ。WebコピーとAPIの共通初回プロンプトに入り、事後修正を前提にしない。

`getPanelShotExecution` の全身／引きの排他分岐も原因だった。全身の範囲と引きの距離は両立させる一方、広角レンズだけの接写は引きへ変換しない。圧縮後の両プロバイダ出力と、QAの「全員が見えるから引き」という根拠不足を回帰確認する。画像QAのラベルだけで画角を合格にせず、最大人物の可視範囲とコマ内座標・周囲の空間を確認する。

Lunaの実API検証で、既に前のコマで読ませた小道具の文字を再び大きく読むために、シナリオ監査が引きの身体演技を寄りへ戻す例を確認した。既存の実現可能性監査に`material_loss`を追加し、そのコマで必須の情報・動作・話者対応を失う場合だけ修正対象にする。補助細部だけの指摘は警告として保持し、別件の修正にも不要な寄りの指示を持ち込まない。必須情報の欠落は引き続き修正し、ユーザーの明示した再掲文字は省略しない。欠落の重要性が回答にない場合は未確認として保持する。

### アオリが正面顔と傾いた背景になる場合（2026-09-29）

「見上げる」が一般的な分岐に入り、顔・身体の下面を描く具体的な補助を受けない経路を統合した。床近く・相対的な低所のどちらも、指定の高さを保持しながら顎や小道具の下面、低い地平線、上方への収束を同じ投影で描く。水平向きの低いカメラ、弱いアオリ、明示した俯瞰は変更しない。天井が見えるだけでは合格にせず、上向き投影には複数対象の下面の位置を求める。根拠不足で追加の有料生成は行わず、実画像を独立して確認する。

同じ実画像の肩越し構図では、後頭部と顔の端のつながりが不自然に見える箇所が残った。共通の頭部指示を、頭蓋・顔の輪郭・耳・眼鏡が一つの立体に沿う表現へ補足し、圧縮後と1枚絵コピーにも保持する。自然な振り向き・横顔・遮蔽は許容する。指示の出力は回帰検査で確認し、補足後の実画像で改善したとはまだ扱わない。現在の改善した候補を保持し、この曖昧さだけでは再生成しない。


### 背面の頭部・付属品・吹き出しが別の向きになる場合（2026-09-29）

顔の可読性と背面指定の衝突を避け、見えない顔演技は画面外とし、頭の傾き・肩・重心で伝える。頭飾りは頭蓋と同じ回転に従い、裏側から正面意匠を見せない。後ろ向き話者の尾は見える頭の輪郭へ結び、BalloonLayoutに残る口元指定も共通境界で整合させる。明示された回頭・横顔や両面意匠は維持する。生成画像での目視と自動検査の警告を分けて記録する。

シナリオ強化の検査では、ト書き中の引用を台詞へ数えない共通抽出を使う。状況文に書かれた顔・後頭部などの反応変更も検査し、EMOTIONタグを変えなければ表情未変更とする誤判定を避ける。実際の話者・台詞変更は未選択なら拒否する。
