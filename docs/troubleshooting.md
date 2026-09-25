# STEP4 image generation / 画像生成

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
