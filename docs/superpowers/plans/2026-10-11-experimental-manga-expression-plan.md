> 履歴資料：これは2026-10-11時点の初期計画です。現行仕様は5〜8コマ必須で、通常と共通のSTEP4・保存・履歴へ統合済みです。現在の操作・制約は[README](../../../README.md)を参照してください。

# 実験的コマ割りを実用にするプロンプト設計計画

> **Execution:** 本人の「計画に従って進めて」で再開。revision 4の局所修正と初回実API1枚は終了したが、画角・人物画風・QA原因の未達があり、全体完了ではない。進行状態と証拠の正本は `HANDOFF.md`。モデル設定は変更していない。この計画は追加の有料実行・公開・モデル変更を許可しない。

**Goal:** 同じ配置への偏りを減らし、物語・読順・カメラ・画風を保った、実際に使える一ページ漫画を現在の実験機能から生成する。

**Architecture:** 元の4つの出来事を保持し、既存のSTEP3一回で「何を見せるか・何コマ必要か・どの配置が合うか」を一緒に設計する。検証済みの計画から描画指示を一意に組み立て、現在の実験経路で効果を確かめる。本番の生成・表示・保存への合流は、実用性を確認した後の別段階とする。

**Tech Stack:** 既存React/Vite、JavaScript、Node test runner、既存画像API・テキストAPI・Web貼付経路。新しい依存関係は追加しない。

## 1. 今回の範囲と優先順位

- 対象: Nano Banana Proの実験的コマ割り。最新の苦情は「右の中段ぶち抜き＋左2コマばかり」。
- 成果物: この設計に沿った現行実験機能の改修と通常経路での検証。実画像の未達をローカルテスト成功で置き換えない。
- 第一優先: 現在の実験機能を実用にする。配置の多様性のためにカメラ、画風、台詞、結末を犠牲にしない。
- 同列の運用品質: **止めない・落ちない・リトライでは最良候補を残す。** 軽微な差や検査の不調から全体を破棄しない。利用者が指示した停止は確実に実行する。
- 次段階: 実用性を確認してから、本番ルーチンに合流させる。恒久的な二重実装は目標にしないが、統合を先に進めない。
- 対象外: 通常4コマの600秒QA待ちの修正、STEP2の物語生成変更、他アプリ、公開、commit/push、リリース、バックアップ、デフォルトON化。

## 2. 守る条件

1. 初期OFF。選択はリロードまで保持。STEP3前に切替でき、ボタン名は選択に連動する。
2. ONは元台本から独立した実験用プロンプトを作る。OFFは保存済み通常プロンプトへ戻り、双方の結果を保持する。
3. コマ数は内容に応じて4〜8。追加コマに意味がなければ4コマを選べる。6コマ・縦長・枠越えのノルマを作らない。
4. 読む順番は右から左、上から下。元の4つの出来事を順に保ち、各出来事の主コマを1つずつ置く。最後は元の結末の主コマ。
5. 主コマのCameraは原文どおり。追加コマで主コマのカメラを代用しない。元の台詞ID・話者・本文・順序を欠落や重複なく維持する。
6. 画風、衣装、人物、小道具、場所、時間、因果関係を保つ。実験モードだからといって夕焼け、怒り、新人物などを追加しない。
7. 枠から手足が出る演出は任意。出なかっただけでは失敗・有料修正の理由にしない。
8. タイトルを保持し、透かしON時は既存の左右2つのクレジットを使う。外側余白を締めてもコマ間の溝・文字・外枠を切らない。
9. Web貼付とAPIは同じ準備済み描画本文・同じ参照画像の役割を使う。分割後の連結は元の本文に一致する。
10. 検査の未確認を合格にしない。既存の実験QAの総待機上限120秒を維持し、取得済み画像を先に保持する。
11. 有料リトライは既存の許可・設定・上限に従う。「止めない」は無限実行や無断課金の意味ではない。現在の実験機能の自動画像修正OFFを、計画だけでONにしない。

## 3. 現在の事実と、検証する仮説

| 区分 | 根拠と意味 |
|---|---|
| 確認済みの原因 | 旧 `experimentalLayout(count)` は5〜7コマを中段右の縦長配置へ固定していた。プロンプトにも同配置を前提とする文があった。多様性は画像モデル任せでは解消しない。 |
| 途中まで実装済み | 現行revision 3には8種の配置があり、AIの選択を受け取る。中断前の `layout-diversity-green.tap` は24/24終了。ただしこのrevisionの実画像は未生成で、実用性は未確認。今回テストを再実行していない。 |
| 表現上の観察 | 実験画像3枚はすべて旧配置。手元アップ、強いアオリ、軌跡、無言の間などは出た。劇画顔の変化と一部の全身指定は弱かった。 |
| 確認済みの指示衝突 | 水彩のレシピは重い輪郭・不透明な下塗りを禁じる一方、共通品質文はGペン輪郭とセル影を一律に要求する。指示が衝突していることはコードで確認できるが、実画像の弱さをどこまで説明するかは未検証。 |
| 仮説 | 生の4コマ台本と可変配置の二重指定、繰り返す品質文、用途に合わない枠比率が、配置・画風・全身の弱まりに影響している。改稿後の画像比較で判定する。 |
| 検査の限界 | 過去のAI検査は、存在しない枠越えや足先をあると報告した。長い根拠文やJSON形式が揃っても画素の正しさを証明しない。 |

現行ソース: `src/lib/experimental-manga.js` の配置・計画・組立・検査、`src/lib/shared-image-quality.js` の品質契約、`src/lib/constants.js` の画風定義。実画像と記録は `output/experimental-manga-20261011/experiment-1-*`〜`experiment-3-*`。過去の完了証拠をrevision 3以降の証拠へ流用しない。

## 4. 採用する設計

### 4.1 物語から「一番見せたい瞬間」を決める

AIは最初に、元の話のどの動作・発見・表情・落差を読者へ強く伝えるかを短く決める。その瞬間を大きくするだけでなく、直前の溜め、直後の反応、台詞を読む時間との関係を設計する。静かな話の見せ場は小さな表情や余白でもよく、全コマを派手にしない。

次に、原作の4つの主コマを置き、必要な場合だけ途中の動作・反応・無言の間を加える。「追加前後で読み味がどう変わるか」を説明できない追加コマは作らない。台詞を別の出来事へ移動したり、新しい結末を足したりしない。

### 4.2 コマ数・配置・カメラを同時に選ぶ

STEP3を増やさず、一回の応答内で最大3つの短い構成案を比較する。全案の長いネームは出さず、選択案だけを完全なJSONにする。異なる案は「同じ縦長を少し移動」だけでなく、横長主役、分割段、大小混在など、読むリズムや面積配分の違う案を比較する。

優先順は、(1)元の話・台詞・読順が成立、(2)Cameraと必要な身体・小道具が収まる、(3)画風と文字が読める、(4)見せ場と間が伝わる、(5)同程度に適する案なら直近と違う配置。点数を捏造して100点満点にせず、具体的な利点と不利益で説明する。

最初は現在の8種を利用する。上の大コマ、下の大コマ、大小の混在、横長列、2列、縦長の上・中・下は、同じコマ数でも異なる案になる。単純な順番ローテーション、乱数、同じ配置の全面禁止は使わない。カメラに最も適するなら繰り返しを許容し、その理由を残す。

直近履歴は名称だけでなく、コマ数・順序付き矩形・最大コマ位置の幾何情報を使う。同じ形を別名で選んでも新しい配置とは数えない。初期比較は実測矩形の小数点誤差を丸めた同一性で十分とし、複雑な多様性スコアは作らない。実画像の配置が計画と違ったときは「選択配置」と「観察配置」を分けて記録し、前者だけで多様性達成としない。

左側のぶち抜きや非対称の複雑な配置は、読順を壊しやすいので最初の修正に追加しない。既存候補で解決できない具体的な原作が現れた場合に、右の上下を読んでから左へ進む領域分け等を設計し、幾何と実画像の両方で読順を確かめて追加する。自由配置のために万能レイアウトエンジンを新設しない。

### 4.3 枠に合わせてCameraを弱めず、Cameraに合わせて枠を選ぶ

- 全身指定なら、頭から必要な足先と接地までを含む画角を確保する。手前の靴だけを大きくして、残りを切って全身扱いにしない。
- 肩越し・背面・俯瞰・アオリは頭、肩、地面、消失方向の実投影で描く。集中線や斜め枠で代用しない。
- 横に広い人物関係・移動・背景は横長を候補にする。縦長が適する立ち姿は縦方向を使う。重要な台詞の密度も面積配分へ含める。
- 枠が足りなければ、まず任意の追加コマを減らすか別の配置にする。主コマのCamera、台詞、人物を削って整えない。
- 全身指定のないアップへ、足を描く条件を追加しない。自然な遮蔽・短縮・見切れは原作のCameraに応じて許容する。

### 4.4 描画指示を一度だけ、矛盾なく組み立てる

生の台本全文をそのまま描画指示へ再掲し、その後に別のページ設計を重ねる方式を整理する。ただし台本をAIに要約させて重要情報を失ってはならない。

元データはそのまま保存する。生成に使うデータは既存パーサーを利用し、タイトル、登場人物、Camera、EMOTION、台詞、話者、無言、演技・状況・場所・小道具・状態変化を元行に対応づける。画面設計とは無関係な本文・未知の内容行は消さず、出典付きの原文として保持する。ページ番号や旧ページ配置の管理情報と、作品そのものの内容を分ける。解釈できない指示を都合よく捨てない。

原作ごとの必須内容は一度だけ記載し、各描画コマはその出来事を参照する。Cameraの一致・台詞の全件保持は機械検証し、その他の行も抽出前後の対応が欠けないよう検証する。台詞を別の追加コマへ配分する場合、古いBalloonLayoutのコマ番号や座標をそのまま持ち込まず、話者・原文・順序を維持して選択枠内へ配置する。意味が保持されたかは、実画像の受入でも別に確認する。

画像モデルに渡す順番は「一枚の出力と選択配置 → 物語・人物 → コマ別Camera／画風／演技／台詞 → 選択された任意演出 → 適用可能な品質条件」。棄却案、履歴、カタログ全体、旧配置への言及は描画本文に入れない。全レイアウトに『右の縦長を先に読む』と書かず、選択配置の順番だけを書く。

### 4.5 画風は背景だけでなく人物に実行する

共通品質文を、画材に依存しない条件と、特定の画材の描き方に分ける。人物同一性、自然な接続、持ち主、文字、Cameraは共通。太いGペン、セル塗り、細密なハッチング等は対象の画風が適するときだけ適用する。

- 透明水彩: 人物・顔・服・小道具にも透明な洗い、紙白、色のにじみを使う。背景だけ水彩で人物が不透明セル塗りなら達成扱いにしない。一方、自然な画材の粒状感を画像ノイズ禁止で消さない。
- 劇画: 見えている顔の立体構造と墨の陰影を変える。服や背景の斜線だけでは代用にならない。年齢・怒り・皺を勝手に増やさない。
- ちび: 頭身と身体の演技を変えても、Camera、関節のつながり、人物の特徴を保つ。
- その他: 現在のレシピを使い、未指定の画風を実験側で決め打ちしない。白黒では既存の白黒レシピを使う。

共有ファイルに媒体条件を追加する場合は、指定なしで返す通常4コマ・1枚絵の契約を変えない。実験側が明示的に媒体情報を渡した場合だけ適用範囲を絞る。文字列置換で矛盾語を消すのではなく、既存の意味単位の定数を組み合わせる。通常経路にも挙動変更が及ぶ場合は別途その経路の実画像確認が必要で、実験画像だけで代替しない。

### 4.6 演出は目的に従って選ぶ

現在の10候補を活用し、新しい一覧を増やすことを目的にしない。動作なら奥行き・大小・軌跡、驚きなら大きさと直前の静けさ、余韻なら視線・無言・コマ内余白など、場面に合う組合せを選ぶ。各コマの0〜3個は上限で、埋める目標ではない。

枠越えは一人の身体につながる一続きの形だけ。隣の顔・吹き出し・重要な小道具を隠さず、物語上の別時点を同じ空間に混ぜない。うまく描けなければ自然に枠内へ収める。斜め枠は割り当て領域内の縁の処理とし、追加コマや台詞の通路を潰す原因にしない。意図的なコマ内の余白と、無駄なページ外側の余白を区別する。

### 4.7 ページ領域を明確にする

当面は既存のページ比率を維持する。左右外側0.6%ずつ、上タイトル6.5%、漫画91.3%、下フッター2.2%は目標値であり、画像モデルが厳密に守ったという保証ではない。座標は漫画領域内を0〜1とすることを一度だけ明示し、ページ全体の割合と混ぜない。

矩形はコマの割当領域、実際の線と白い溝はその内側とする。矩形の重複や範囲外を拒否し、枠越えの隣接判定は溝を空ける前の領域で行う。各コマ内の吹き出し位置はそのコマ内の座標として扱う。水彩のにじみや任意枠越えが、タイトル・外枠・フッターへ侵入しない。

## 5. STEP3に使うプロンプト原案

以下は改稿の中核となる本文。`SOURCE`、`LAYOUT_OPTIONS`、`RECENT_GEOMETRY`、`EFFECT_OPTIONS` はアプリが生成するデータであり、特定の作品例を固定ルールとして埋め込まない。応答の長さを減らすため、候補は短い比較のみ、詳細は採用案のみ返す。

```text
You are directing one Japanese manga page from four approved story beats.
Your task is to make this particular story visually compelling and easy to read.
Return one JSON object only. Preserve the approved story; do not rewrite it.

NON-NEGOTIABLE:
- Keep the original cast, facts, props, causality, ending, and style of each beat.
- Keep exactly one anchor panel for each source beat, in source order.
- Copy each anchor Camera verbatim and execute its physical view, not a weaker substitute.
- Use every original dialogue ID exactly once, in original order and within its source beat.
- The last panel is the original final anchor. Add no epilogue or new dialogue.
- Read right-to-left, then downward, with unambiguous gutters and distinct moments.

DIRECT THE PAGE:
Identify what the reader should feel or notice most. It may be an action,
a discovery, a facial reaction, a contrast, or a deliberately quiet moment.
Choose count=4..8, layout, and allocation of the story beats together.
Extra panels must add a specific useful action detail, reaction, or pause.
If the added panel contributes nothing, leave it out.

Briefly consider up to three meaningfully different compositions from the
compatible catalog. Compare camera fit, required body/prop visibility,
dialogue space, reading clarity, and the emotional timing of the ending.
Do not score a composition higher because it has more panels or more effects.
Choose only one, then give its full panel plan.

Fit the frames to the approved Cameras. Do not turn an overhead/low-angle/
full-body/back-view/over-shoulder anchor into a frontal bust to make it fit.
If space is insufficient, choose a better layout or remove an optional insert.
Do not require full-body visibility for a shot that intentionally crops the body.

Prefer a different recent geometry only when it serves the story equally well.
Repetition is allowed when justified by this story. Do not rotate layouts blindly.
Place emphasis where the story earns it; do not always choose a middle tall panel.
Use only the selected layout's real reading sequence in the final plan.

Select zero to three compatible optional effects per panel, only for a clear purpose.
Preserve the source medium on actors as well as backgrounds. Do not invent lighting,
motion, emotions, or objects to justify an effect. Breakout is optional, continuous,
adjacent, and subordinate to text, character ownership, and reading clarity.

OUTPUT:
count, layout, reason, pageIntent, alternatives, panels.
alternatives has at most three short objects: count, layout, benefit, tradeoff.
The selected panels alone are fully expanded. Each has sourcePanel, kind,
camera, action, purpose, dialogueIds, breakout, visualEffects.
kind is anchor or insert. breakout is null or {part, into}.
Copy no explanatory schema text into values. All explanations are concise Japanese.

SOURCE: {{losslessly parsed source data}}
LAYOUT_OPTIONS: {{existing count-compatible geometry and reading sequence}}
RECENT_GEOMETRY: {{up to three recent selected layouts, separately from observed layouts}}
EFFECT_OPTIONS: {{existing effect rules and compatibility constraints}}
```

`pageIntent` と `purpose` は短い描画上の狙いであり、新しい話を追加する権限ではない。既存の必須フィールド検証は残す。`alternatives` は説明用で、空の比較や同形の比較を成功の証拠にしない。比較情報の不備だけで有効な採用案を捨てたり、有料再要求したりしない。

## 6. 描画プロンプトの原案と組立順

```text
Create ONE complete Japanese manga page, exactly {{count}} panels.
Use ONLY the following chosen composition. Do not print planning IDs or instructions.
Page envelope: {{title/panel/footer regions, outer margin and gutter definition}}.
Title: {{exact source title}}. Footer: {{exact configured credits or blank}}.
Reading sequence and panel regions: {{selected geometry only}}.

STORY AND IDENTITY:
{{cast and reference roles; source-supported facts and actions, each recorded once}}
{{color or monochrome contract}}

PAGE DIRECTION:
{{selected pageIntent, consistent with the source}}

FOR EACH PANEL IN READING ORDER:
Panel {{n}}, region {{rect}}, source beat {{id}}, role {{anchor or insert}}.
Camera: {{exact anchor Camera or approved insert Camera}}.
Required content: {{source facts/actions referenced by this panel}}.
Drawing medium and actor treatment: {{source style recipe, scoped to this panel}}.
Visible staging: {{selected action and purpose}}.
Dialogue: {{exact text and speaker, in immutable reading order; or explicit silence}}.
Optional staging: {{only the selected compatible effects and breakout, if any}}.

RENDERING PRIORITY:
Preserve story, reading order, Camera, identity, required text, and the assigned medium.
Allocate space to the required body/prop relationships before adding optional accents.
Optional effects may be omitted when they would obscure required content.
Keep anatomy, contact and ownership coherent in the requested perspective.
Apply line weight, shading and texture in the assigned medium; a generic ink or
cel-shading instruction must not override transparent watercolor or another explicit style.
{{applicable shared quality, page-edge, render-option and protected-cast contracts}}
```

これに棄却案、直近の他作品、未選択の演出一覧、元の4コマ配置指示を再付加しない。媒体レシピは定義を共用し、同じものを長く繰り返さず各コマに適用先を示す。おおむね15,000字という既存の目安より、必須内容の保持を優先する。長ければ既存のWeb分割を使い、台詞やCameraを削って上限へ合わせない。

## 7. 止めない・落ちない・最良候補を残す

### 7.1 処理の継続と、正しさの表示を分ける

検査が失敗したら「失敗した画像」と決めつけない。画像取得直後に候補として保持し、QA失敗・期限切れは画像を消さず未確認のまま利用・保存可能にする。busy状態やボタンロックは必ず解除する。失敗した補助処理の例外をUI全体まで投げない。

有効な画像がない通信失敗では、画像を捏造したり旧画像を今回の新規生成と表示したりせず、入力・過去候補・具体的なエラーを残して再実行可能に戻す。元台本が欠けている、キーがない、台詞保存に違反する等の絶対条件では、そのAPI要求を出さない。アプリの操作可能性まで失わせる「停止」とは区別する。

STEP3の不正JSONや不適合な採用案は、原文を勝手に書き換えて通さない。既存の有効な準備案が同じ入力・設定に対応する場合はそれを保持する。原作自体が有効なら、既存の正規4コマ構成から組み立てた検証可能な代替案を提示する余地を残すが、無表示のモード変更・自動の追加APIはしない。最初の実装では現在の有効案保持と復帰を先に確実にする。

### 7.2 有界のリトライと最良候補選択

現在の実験経路は自動画像修正なし。リトライ対応は、レイアウト・画風の実用性を確かめた後、同じ実験モードの運用品質として段階的に加える。本番ルーチン全体の統合より先に必要な部分だけを扱う。既存 `runImageQualityFailsafe` の候補保持・比較・回数管理を再利用し、実験専用の別スコア機構を作らない。ただし4コマ前提の修正指示や検査をそのまま渡してはならない。

再試行の対象は確認できた重大な欠落、誤読順、人物・台詞の取り違え、成立を壊す接続など。任意枠越えの不出現、軽微な画風差、見えない手足、モデルの不確実な評価だけでは開始しない。既存の上限は初回を含む4候補だが、実際に使える回数は利用者の許可・設定との小さい方。最初の比較検証は原則画像1枚で、追加の有料修正はその結果を報告してから扱う。

候補を比較するときは、その時点の最良候補と新候補を同じ基準で比較する。台詞・物語・読順、Cameraと必要な画角、人物／小道具の整合、要求画風を確認する。解消した欠陥と新たな劣化を分け、迫力が落ちた候補を「検査項目が減った」だけで採用しない。比較不能・同等・検査失敗なら従来の最良候補を維持する。コマ数や装飾量を品質点にしない。

途中で候補2が最良となり、候補3と4が悪化・失敗しても、候補2を最後に採用する。全候補に問題があれば最も良い利用可能な画像と残課題を出し、全面合格とは表示しない。全候補を保存し、手動で他候補へ戻せる既存履歴の考え方を維持する。

比較対象は同じ入力・準備済みプロンプト契約・参照設定の候補群に限定する。別の話や設定変更後の画像を混ぜない。修正プロンプトには元の可変配置契約と各台詞IDを残し、補修のたびに通常4コマへ戻ったり結末を変えたりすることを検証で拒否する。

### 7.3 明示停止は別の必須機能

利用者が停止した場合は、API待ち・後続検査・次のリトライを止め、遅延応答を採用しない。停止前に採用済みの画像は保持する。停止後も操作可能に戻る。これを「止めない」の名目で無視しない。通信中停止の実証は、再開後にその変更を実際に行った場合に必要で、ボタン表示だけの確認で代替しない。

## 8. QAを長引かせず、見ていないものを合格にしない

既存の一回の論理的レビューと総待機120秒を維持する。画像生成、検査、候補比較の所要時間を分けて表示・記録する。プロバイダー内部の再試行があるなら、その全体も同じ期限と中止信号に従わせる。検査が失敗しても新しい画像生成を自動起動しない。

観察と目標を別フィールドにする。コマごとの実際の位置・枠数、頭頂／肩／地面の見え方、身体の見える範囲、顔と背景それぞれの画材、読めた文字を記録してから対応条件を評価する。隠れている・小さすぎる・判別できない場合の `unverified` を正規の結果として扱う。目標Cameraの言い換えや「水彩だから水彩」といった回答を証拠にしない。

一回のモデル呼出しに目標も渡す限り、完全に独立した画像だけの検査にはならない。『画像を先に見よ』という指示で幻覚が消えるとは主張しない。構造チェックは台詞IDや件数等の整合性を扱い、実現した画風・足先・読順は実画像の目視と分ける。必要に応じて同じ原画像を拡大して確認し、確認できないものを合格にしない。自動の複数QA呼出しや全面再生成でこの限界を埋めない。

## 9. Astra高での実装単位と受入チェック

共通ファイルを順に触るため、以下は順次実行する。既にある有効な差分やRED/GREENを破棄して作り直さない。チェックは要求全体を満たした場合のみ完了とする。部分実装・実API未達の現況は `HANDOFF.md` を参照する。

### 単位A: 配置選択と描画本文の一貫性

対象: `src/lib/experimental-manga.js`、`src/components/ExperimentalMangaPanel.jsx`、`tests/experimental-manga.test.mjs`。

入出力: 既存 `buildExperimentalPlanPrompt(source, options)` → `validateExperimentalPlan(plan, source)` → `buildExperimentalImagePrompt(plan, source, options)` の境界を維持する。既存の `count/layout/panels` を使い、必要な説明フィールドだけ追加する。

- [ ] 現行revision 3の差分と24件の既存ログを確認し、未検証部分を特定する。
- [ ] 旧型に偏る文が未選択配置にも出ることと、抽出後の内容欠落を再現する焦点テストを追加し、修正前に失敗を確認する。
- [ ] 第5・6節に沿って計画・組立を変更し、源泉データを保持して未知の内容を捨てない。
- [ ] 4〜8×対応全配置で範囲内・非重複・読順・コマ数・隣接を検証する。数値上非重複だけで読順合格にしない。
- [ ] 同じ6コマで横長主役、2列、大小混在が別の座標になること、非隣接枠越えを拒否すること、同形の名称違いを多様性と数えないことを検証する。
- [ ] 元の4主コマ／台詞の保存、無言の結末、意図的なアップ、同配置の正当な再利用が通ることを確認する。

### 単位B: 画風とCameraを弱めない品質文

対象: `src/lib/experimental-manga.js`、必要最小限の `src/lib/shared-image-quality.js`、同実験テストと共有品質の既存テスト。画風定義を再発明せず `constants.js` と `manga-render-mode.js` を利用する。

- [ ] 水彩だけの台本へ全コマ強制のGペン／セル影が混入する回帰をREDにする。混合画風では劇画の墨線指示は残る正例も作る。
- [ ] 画材に依存する指示の適用先を明示し、媒体共通の人体・所有・文字・Camera条件を残す。
- [ ] 原文Camera、重要小道具、人物の顔の画風、カラー／白黒の内容保持を両プロバイダー向け本文で確認する。
- [ ] 通常4コマ・1枚絵の既存出力が変わるか確認する。変わる場合はその理由と追加受入を分離し、実験の変更へ黙って含めない。

### 単位C: 結果保持・検査・最良候補

対象: 既存実験モジュール／UI。リトライを実装する段階だけ `src/lib/image-quality-failsafe.js`、`src/lib/image-quality-qa.js` とその既存回帰を読む。共通ワークフロー全体の統合はまだ行わない。

- [ ] 検査の例外・不正JSON・120秒期限切れ・遅延成功の各条件で、画像保持、未確認表示、ロック解除、追加画像0を検証する。
- [ ] 元台本変更・設定変更・参照変更・改訂番号変更で旧準備案を送信しないこと、元台本の破損時にAPI要求0を確認する。
- [ ] リトライを有効にする前に、4コマに限定されるQA／修正文の経路を特定し、可変ページ契約を渡せない経路を拒否する。
- [ ] 候補2が改善、候補3がカメラ劣化、候補4が生成失敗する回帰で、候補2が採用され全取得候補が残ることを確認する。
- [ ] 枠越えなし／軽微な一貫した変化／未確認だけでは修正0、明確な重大欠落は許可と上限の範囲で修正候補になることを確認する。
- [ ] 比較失敗・同点・不確実は従来候補を維持し、全候補不完全でも最良画像と残課題を返す。明示停止は通信と後続処理へ届くことを確認する。

焦点テストの実行例（再開後、変更対象に応じて選ぶ）:

```powershell
node --test tests/experimental-manga.test.mjs tests/watermark-model-attribution.test.mjs tests/step2-progressive-disclosure.test.mjs
node --test tests/image-quality-failsafe.test.mjs
npm.cmd run lint
npm.cmd run build
```

新テストは固定作品への専用条件ではなく、重大な違反を拒否するケースと、正常な別条件を許容するケースを対にする。共有経路を変更した場合は影響する既存suiteへ広げる。公開README監査の既知staleを捏造して通さない。実API前に通常画面の準備と利用者の残存入力を確認する。

### 単位D: 実画像での実用性判定

- [ ] 本人がAstra高へ切り替えて再開した後に開始する。モデル選択とアプリの画像プロバイダー設定は別で、後者を勝手に変えない。
- [ ] まず新しい入力で、配置が旧型に固定されず、指定Camera・画風・台詞が保たれる一枚を通常の実験STEP3→STEP4から生成する。準備文の手編集や内部関数直呼びで成果を代用しない。
- [ ] プロバイダー、モデル、画質、解像度、参照、元台本、実送信本文、計画、処理時間、原画像、検査結果をキーなしで保存する。
- [ ] 計画と実際のコマ形状・読順を照合し、主コマの投影・画角、人物の画風、台詞、題字、両クレジット、余白を目視する。
- [ ] 第一結果を報告する。追加の有料生成／修正は現在の許可範囲を確認し、範囲外なら結果と目的を示してから依頼する。
- [ ] 多様性の判断は、異なる物語条件の実画像が揃った段階に限る。一枚の成功を、全配置や全画風の成功に拡張しない。

比較対象の設計:

| 条件 | ローカルで必ず確認 | 実画像を作る際に見る点 |
|---|---|---|
| 動作・強いアオリ／俯瞰 | 原Camera、全身指定、身体／小道具の因果保持 | 枠面積と身体が合うか、迫力を寄り絵で代用していないか |
| 静かな感情・無言の終わり | 余計な台詞・後日談なし、4コマも選択可能 | 間と表情で読めるか、不要な派手さがないか |
| 会話の多い話 | 全台詞ID・話者・順序、本文分割の無欠落 | 吹き出しが顔や演技を圧迫せず、読順が明瞭か |
| 水彩／劇画／ちびの切替 | 人物を含む各媒体、条件付き品質文 | 顔・身体まで画風が変わり、Cameraを失わないか |
| 白黒 | 既存白黒契約、色指定の混入なし | 白黒の線・面・階調で意図が伝わるか |

これは必要な比較条件の一覧であり、5回の有料生成の承認ではない。初回の新規入力で複数の条件を自然に含めてよい。欠落演出を全部載せる不自然な「試験専用漫画」にしない。画像間の差は生成のばらつきも含むため、一回比較で原因を断言しない。必要な追加比較は一つの仮説に絞る。

実用段階へ進む条件は、必須内容を守った新規実画像、異なる配置が実際に描かれた根拠、カメラ・画風・可読性に重大な劣化がない観察、失敗時の候補保持と操作復帰。未確認は明記する。バグ修正の原因・RED/GREEN・実APIを同じ記録へ紐付け、最新ソースに対してルートの `scripts/verify_bugfix_evidence.mjs` を通す。監査の整合性と実画像の正しさは別に確認する。

## 10. 本番への合流は、その後

目標は「STEP3でプロンプトを切り替え、以後は共通ルーチン」。ただし現行 `image-quality-qa.js` は4コマ、1〜4のパネル番号等を前提とする箇所があり、プロンプト文字列だけの差替えでは正しくつながらない。

将来は準備済み本文と一緒に、ページ種別・コマ数・順序付き配置・各コマの源泉／台詞／Camera／画風を持つページ契約を渡す。プロバイダー通信、参照画像、取消、候補保持・最良選択、表示、保存は共通化し、ページ内容を判定する入力だけを切り替える。通常4コマの検査を弱めず、5〜8コマを4コマとして検査しない。これは今の実験機能の実用性を確認した後に着手する。

## 11. 継続時の扱い

本人の再開指示は受領済みで、モデル切替の再確認は不要。最新の単位別進行・実画像・未達・次の一手は `HANDOFF.md` 冒頭を正本とする。今回の実装で以前の成功証拠を上書きせず、最新ソースと新規API結果を結び付ける。通常4コマQAの長時間化は別の未了課題として残し、今回直ったと報告しない。追加画像は初回結果を見て現在の許可範囲を確認してから実行する。
