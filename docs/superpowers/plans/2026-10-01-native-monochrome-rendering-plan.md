# Native Monochrome Rendering Implementation Plan

> **Execution:** `executing-plans`の逐次実行で進める。共有ファイルとブラウザ状態を扱うため、実装所有者は一人とする。独立した読み取り調査だけを並列化できる。下記チェックボックスを実行記録とし、現在地は `HANDOFF.md` 冒頭から本書を参照する。

**Goal:** ユーザーが選んだ画像の画風差・細部・演技と直近の明瞭な描線を両立し、白地を覆う不要な網掛けをなくした白黒漫画を、通常のSTEP3からOpenAI／Geminiへ送る共通経路で実証する。

**Architecture:** 白黒の媒体、画風、肌の地色、局所陰影を別の情報として一度決定する。台本由来のCamera／Action／台詞／物語に必要な文字を保護し、圧縮はアプリが加えた説明だけを対象にする。生成結果は原画像・配置補正後・縮小表示を区別して検査し、根拠不足から有料再生成へ進めない。

**Tech Stack:** 既存のJavaScript、React、Vite、Node test runner、Canvas、既存OpenAI／Geminiクライアント。依存追加なし。

## 0. 実行境界と再開方法

- 作成日: 2026-10-01。現在の依頼は**計画作成まで**。本書の作成中にアプリ実装、テスト修正、追加API呼出しは行わない。
- ユーザーがAstra高へ戻して実装を指示したら、root `AGENTS.md` → `PLAN.md` → app `AGENTS.md` → `HANDOFF.md` 冒頭 → 本書の順に読む。モデルをこちらから変更しない。
- 対象: `C:\Users\sx717\Antigravity\nano-banana-pro`。以下のファイル表・コマンドはこのディレクトリを基準とする。
- 実装後の受け入れ順序: **OpenAIモノクロ → Gemini**。受け入れ済みOpenAIカラーの追加生成は行わない。カラーは無課金の回帰検査で保護する。
- v6.7.7のdeploy／note／X／Facebook／フルバックアップは完了済み。本作業で再開しない。commit／push／版上げ／公開も本書の実行に含まない。
- UI全体、既存マニュアルボタン、ユーザー指定のボタン配置、モザイク対象の修正、採用済みカラーの頬表現、モデル設定を変更しない。説明文に誤りがある場合だけ、後述の範囲で白黒説明を直す。
- ユーザーのシナリオやキャスト名に固有のルールを製品コードへ入れない。ミク等の名前は私的な実画像評価対象にだけ使う。テストは別名・別舞台の例でも成立させる。
- キーは画面の接続状態だけで確認する。キー値の読み取り・記録・チャットへの要求は禁止。ファイル選択ダイアログを開かない。
- 接続済みIABのブラウザ2／タブ10／`http://127.0.0.1:5173/`を保存する。タブ番号は再観測する。既存の二枚の参照・履歴・キーを失うreloadをしない。Chromeへの切替禁止。
- 現在のrun19と全コマンドは完了済み。処理中ではない。将来のAPI実行中は同じセッションを完了まで確認し、質問への回答だけでターンを終了しない。
- 自動画像修正はOFFを維持。追加試行は現行のユーザー承認範囲を確認し、一試行ごとに仮説・変更・結果を示す。計画そのものは追加課金の許可ではない。

**最初の操作:** Task 0の読み取り確認と証拠保存。次にTask 1から順番に進める。現在のdirty treeをリセットしない。

## 1. 現在地と証拠の強さ

基準HEADは `1316aee8dbe67049959e80b1fc0639dec167daf9`。v6.6.9のtagは `8f11d0655671bfc4dff23552a163910ce68847b2`。現在は多数の未commit修正があり、**HEADだけでは検証したコードを特定できない**。以後はdiffまたは対象ファイルhashも記録する。

| 証拠 | 確認済みの内容 | 未証明の内容 |
|---|---|---|
| v6.6.9のユーザー画像 | 画風差、表情、身体演技、俯瞰・アオリ・遠近等の品質目標 | 現モデル・現在のAPIで同じ条件だったこと |
| run9／run11 カラー | 強い劇画と、汎用ルール調整後の頬表現をユーザーが受け入れた | 現在の白黒の合格 |
| run14 短文診断 | 劇画・ちび化が出た。最新添付の品質参照 | 本番長文、通常STEP3、原寸の線質・網点、全Cameraの忠実性 |
| run17 本番組立文 | 顔の描線改善。全体の薄い網掛け・弱い劇画・横書きが残った | 全項目の合格 |
| run18／19 本番組立文 | P3の三つの台詞が縦書き。run19は22,659字、2参照、Sunburst/xhigh、2240×3168、修正OFF | 画風と不要トーンは未達。古いタブへSSR文を貼ったため通常STEP3連携も未証明 |
| run19ローカル検査 | focused 41/41、strict lint、build成功 | 全体983/984。`expressive-direction.test.mjs`が旧G-pen文言を白黒にも要求して失敗 |

私的証拠:

- `output/native-ink-run19.json`: SHA-256 `27BBB713FB28C9815F447EBA652EACDFF99337F119869CA59D6C2C3B96204388`。
- `output/native-ink-cast.txt`／`output/native-ink-scenario.txt`／`output/build-native-ink-proof.mjs`: 同条件の無課金組立検査に使える。cast 3,848文字、scenario 2,304文字は照合の手掛かりであり、内容hashに代わらない。
- `output/monochrome-plan-20261001/reference-quality.png`: ユーザー添付のコピー。SHA-256 `FC7730A40B15E0B49C5944B0E8565683A474CF90C0C3B8E428D173BADEE8C739`。UI入り縮小スクリーンショットであり、原画像ではない。
- `output/mono-style-priority-{green,lint,build,full}.log`: 最新検査。計画作成では再実行していない。
- 原寸PNGの保存は未確認。以前のdownload／media exportはtimeoutした。保存済みだと扱わない。run14等が履歴から消えていれば、存在しない原画像を再現できたと主張しない。

### 原因を混同しない

**確定したコード上の問題:** `panel-utils.js`の`protectNonDialogueTextHints`は引用の前後30文字で分類し、状況説明中の看板・端末の文字を落とす。現fixtureではP1の「年内に行動計画」「半導体など17戦略分野」、P3の「中国のロボット優位？」「インフラ整備を先に？」「確認中」が失われ、「端末のを振り返り」になる。圧縮前の不具合であり、画風の不具合と同じ原因とは断定しない。

**残存する指示競合:** `MONOCHROME_SCREEN_MASK`は局所陰影のscreenを許可しながら、`Never ... screen lighting/depth`と記す。単一固定トーン・常に疎なトーン・全AA縁禁止なども、ユーザーの求める「白地に不要なベールを乗せない」より広い制約となっている。褐色肌が大きいコマや柔らかな画風と衝突する余地がある。

**修正済みで再度原因扱いしないもの:** run19は`NORMAL default; panel recipe wins`を保持し、Camera原文も四コマとも残る。既知の深い圧縮での優先度欠落は修正済み。参照マニフェストに画風をアニメへ固定する命令は今回見つからなかった。

**未検証の仮説:** 長い共通規則と画風指示の分離が追従を弱める／原寸の微細なトーンが縮小で灰色に見える。文字数や順序だけを原因と断言しない。モデル自体の劣化も、この比較からは断定できない。

## 2. 合格基準 — 項目を交換条件にしない

| ID | 必須結果 | 許容する変化／誤判定を防ぐ条件 | 必要な証拠 |
|---|---|---|---|
| M1 白地 | 明るい肌・明るい壁等の未指定面を薄い網点・灰色ベールが一律に覆わない | 線のAA縁、縮小による網点の混合、指定された模様を全体ベールと呼ばない | 原寸の平坦な面のROI＋縮小表示 |
| M2 肌の地色 | 褐色肌は照明下でも地トーンを保ち、顔・首・手足で一貫 | 小さなハイライト、参照に実在する掌等の差は許可。肌全部を白くしない | 同一人物の複数部位・コマの比較 |
| M3 陰影と量感 | 光源と面の向きに沿った人体の影・落ち影をトーン／ベタ／線で表す | 広さだけで影を禁止しない。拡散光・意図的な平面的表現も許可 | 影の境界と光方向を示すROI |
| M4 描線 | 目蓋・瞳・鼻・口・指が読める。輪郭と細部の強弱、接触、奥行きを保持 | 全線を太くしない。白抜け、潰れ、輝度トレス状のぼけを避ける | 原寸と通常閲覧サイズの双方 |
| S1 劇画 | 指定コマで目・眉・鼻梁・頬・顎の構成と墨の使い方が通常絵柄から変わる | 濃くしたアニメ顔だけでは不足。背面人物の顔を見せるためにCameraを変更しない | 見える人物の顔・構成の比較 |
| S2 ちび | 指定コマで頭部拡大と胴・四肢の圧縮が、身体演技と関節を残して見える | 大きな目だけ、ズーム、横一列への置換では不足。指定頭身があれば優先 | 全身または見える範囲の身体ROI |
| S3 柔らかな画風 | 白黒でも線の省略・筆致・余白で変化を作り、顔の要点を失わない | 水彩の色のにじみを白黒でそのまま要求しない。全紙面の粒子を画風差の代用にしない | P2と通常コマの比較 |
| C1 Camera／演技 | 上下左右・前後・俯瞰・アオリ・距離・望遠圧縮・指定歪み、重心・視線・動作を保つ | 明示された静かな演技を誇張しない。隠れた顔や足を無理に出さない | 台本対照＋全ページ。P3のOTSを保持 |
| T1 文字 | 台詞本文・話者・読み順・縦書きと物語上必要な看板等を保つ | JSONの転記順だけで横書きと判定しない。装飾的文字の微差と物語情報を区別 | 独立文字転記＋文字位置／吹き出し端点 |
| I1 一貫性 | キャラ・眼鏡・髪・衣装・小道具・人数・モザイク対象を保つ | 画風変化それ自体を別人判定しない | 参照とキャストの対照 |
| P1 経路 | 通常STEP3、Web全コピー／分割コピー、最終API文で同じ意味契約を保持 | provider固有の参照マニフェスト／既存ラッパー差は別記 | 無課金比較＋通常UI実行 |

各項目の状態は `pass / fail / unverified`。`best available`、生成完了、プロンプト内の画風名、テスト通過だけでは画像の合格にしない。「全画素が厳密な二値」を新しい合格条件に追加しない。自然な黒線AAと、面全体への不要な灰色塗りは分ける。

## 3. 変更の配置とデータ契約

| ファイル | 責務／変更範囲 |
|---|---|
| `src/lib/panel-utils.js` | 引用の役割判定・状況文字の保存。既存のキャスト／台詞／肌解析を再利用 |
| `src/lib/manga-render-mode.js` | 白黒の媒体・トーン用途・画風の明示的な優先関係。full／compact／QAが同じ規則を参照 |
| `src/lib/prompt-assembler.js` | 一回だけ決定したコマ情報と、アプリ説明を分けて組立・予算処理 |
| `src/lib/comedy-review.js`、`src/hooks/useMangaWorkflow.js` | AI精査の前後で保護情報を検査。古い非同期結果の既存ガードを維持 |
| `src/lib/image-quality-qa.js`、`src/lib/image-quality-failsafe.js` | 白黒欠陥の領域証拠・不確実性・有料修正可否を一つの共有判定で統一 |
| `src/lib/manga-page-layout.js` | 既存縮小cropとは別に、原寸ROIを安全に切り出す狭い関数 |
| `src/lib/generated-image-metadata.js`、`src/lib/generation-history.js` | 原則再利用。実在する保存不具合が再現した場合だけ変更 |
| `src/components/Step3Panel.jsx`、`README.md`、`docs/readme-body-audit.json` | 完成した白黒動作に限る説明の同期。UI再設計なし |

### 提案インターフェース

新しい汎用フレームワークは作らない。次の小さい値オブジェクトと純粋関数を既存モジュール内へ置く。既存の公開`buildMangaPrompt(options): string`は維持する。

```js
// manga-render-mode.js — 提案。mode解決後だけで作る。
// skinBaseは既存identity解析の結果。unknownを勝手に白肌と断定しない。
// { subject: string, base: 'paper' | 'screen' | 'reference' }
resolveMonochromeRenderIntent({ style, preserveReferenceStyle, seriousTone, skinBases })
// -> { medium: 'native-monochrome', style, preserveReferenceStyle,
//      seriousTone, skinBases, screenRoles, paperRule, lineRule }
// screenRoles = ['assigned-material', 'canonical-dark-skin', 'bounded-shadow']

// prompt-assembler.js — 一回だけ作り、直列化まで同じ値を渡す。
// PanelContract = {
//   number, camera, action, dialogue, balloonLayout,
//   styleBlock, skinBlock, stagingBlock
// }
// assemblyで現行の安全処理を終えた値を保護する。
// 検査対象にraw user textをそのまま使って安全処理を取り消さない。
buildMangaPromptArtifact(options)
// -> { prompt: string, protectedBlocks: Array<{ panel: null | 1 | 2 | 3 | 4,
//      text: string }>, mode: 'color' | 'monochrome' }
buildMangaPrompt(options)
// -> buildMangaPromptArtifact(options).prompt
validateMangaPromptArtifact(candidate, artifact)
// -> { valid: boolean, panelLayoutValid: boolean, missingBlockIndexes: number[] }
```

`buildMangaPromptArtifact`は既存組立関数の結果をメタデータ付きで返す狭い変更とする。providerの通信API、保存形式、モード選択UIは増やさない。`protectedBlocks`は台本・媒体／画風／肌契約を含む確定済みブロックで、`panel:null`はページ共通、1〜4は該当コマ。別コマへのコピーで保存済みと誤判定しない。モデル出力を含めたあらゆる文の意味同一性を文字列検査で証明できるとは扱わない。

## 4. 実装タスク

### Task 0 — 現在の最良候補と比較条件を保存する

**Files:** `HANDOFF.md`、既存`output/`内の私的な検証記録。製品コードは変更しない。

- [ ] `git status --short`、`git diff --stat`で既存変更を把握し、対象ファイルhashを私的記録へ保存する。HEADだけを実験revisionにしない。
- [ ] IABの現タブ一覧、URL、生成終了状態、二枚の参照、現在の選択結果をキー値なしで再確認する。
- [ ] 保存ボタンの既存実装を先に読み、履歴内で利用可能な最良候補の元画像・送信文・制作情報を既存経路で保存する。ダウンロードを一度行っただけで成功としない。ローカルのPNGを開けること、寸法とhashを確認する。
- [ ] 保存不能なら、ネットワーク生成を増やさず、保存経路かbrowser controllerのどちらで失敗するかを読み取りで切り分ける。保存機能の製品不具合と判明した時だけ、既存metadata／historyテストに再現を加えて最小修正する。巨大base64をツール出力へ流さない。
- [ ] run14原画像が既にない場合は、添付スクリーンショットだけを品質参照と明記して残す。現存するrun19等の保存まで止めない。

```powershell
Set-Location -LiteralPath 'C:\Users\sx717\Antigravity\nano-banana-pro'
git status --short
git diff --stat
Get-FileHash -Algorithm SHA256 -LiteralPath 'output/native-ink-run19.json'
Get-FileHash -Algorithm SHA256 -LiteralPath 'output/monochrome-plan-20261001/reference-quality.png'
```

**終了条件:** 現存する比較対象の保存状況を真偽付きで記録。コード調査とローカル実装は継続可能だが、比較対象を失う恐れがある状態で新規生成しない。

### Task 1 — 状況説明の引用を落とさない独立修正

**Files:** `src/lib/panel-utils.js`の`protectNonDialogueTextHints`／`extractActionOnly`、`tests/panel-utils-dialogue.test.mjs`、`tests/dialogue-boundary.test.mjs`。

**Interface:** `extractActionOnly(panelText)`、`extractDialogueOnly(panelText, cast, options)`は現行の引数・戻り値を維持。

- [ ] 既存Viteテストsetupを使い、次の回帰例を追加して現状の失敗を確認する。

```js
test('a list of quoted exhibit labels survives action extraction', () => {
  const labels = ['年内に整備計画', '地域ごとの重点分野', '翌年度の投資枠'];
  const scene = '状況: ' + labels.map(s => `「${s}」`).join('、')
    + 'と記された展示パネルの前。乙は端末の「確認中」を振り返る。';
  const panel = scene + '\n甲「確認してみよう。」';
  const cast = '- Character [甲]: adult\n- Character [乙]: adult';
  const action = extractActionOnly(panel, cast);
  for (const label of [...labels, '確認中']) assert.ok(action.includes(label), label);
  assert.ok(!action.includes('端末のを'));
  const dialogue = extractDialogueOnly(panel, cast, { forImagePrompt: true });
  assert.ok(dialogue.includes('確認してみよう。'));
  for (const label of labels) assert.ok(!dialogue.includes(label));
});
```

- [ ] 引用内部の「集中」「音」等の単語が、別の引用の役割判定に漏れないようにする。文／節の所有者と連続引用列を先に特定し、共通の「と記されたパネル」等を列全体へ適用する。既存の発話／音／表面文字判定を再利用し、単語リストへ今回の看板文字を足さない。
- [ ] 確実な台詞はDialogueに一度だけ残し、Actionから除く。確実な効果音は既存SFX扱いを維持する。未分類の引用は削除せず文脈付きActionとして保持し、勝手に吹き出しへ昇格しない。役割不明なら描画文字としての命令を新設しない。

```js
// 分類後の出力分岐の原則。引用列の分類は上記の既存パーサー内で行う。
const preserveActionQuote = (quote, role) => {
  if (role === 'speech') return '\uE000'; // 既存cleanupで処理
  if (role === 'sound') return '\uE001';
  return quote; // surface / quoted-context / uncertain: 内容を失わせない
};
```

- [ ] 前置説明／後置説明／複数引用／長いラベル／報道引用／比喩の引用／明示台詞／音／一文字表情を追加し、物語文字の保存と台詞重複ゼロを同時に検査する。
- [ ] カラー・白黒双方の組立結果で、Camera・台詞は不変、欠落していた状況文字だけが戻ることを比較する。この共有修正によるカラー差分は明示する。

Run: `node --test tests/panel-utils-dialogue.test.mjs tests/dialogue-boundary.test.mjs tests/scenario-validation-dialogue-contract.test.mjs`

**終了条件:** 元の欠落が再現するREDと修正後GREEN、台詞／SFX境界の既存回帰が通る。絵柄改善をこの修正の効果と主張しない。

### Task 2 — 白黒の意味契約を一つにする

**Files:** `src/lib/manga-render-mode.js`、既存肌解析を呼ぶ`src/lib/prompt-assembler.js`、`tests/monochrome-prompt.test.mjs`、`tests/prompt-style-exceptions.test.mjs`。

**Interface:** §3の`resolveMonochromeRenderIntent`。既存`buildIdentityMatrix`／`buildMonochromePanelInkLock`の抽出を再利用し、人物名で分岐しない。

- [ ] `screenRoles`、skin base、style priorityを値として比較するテストを先に置く。任意名の褐色人物、明るい肌の人物、肌未確定人物、参照絵柄固定、seriousモードを含める。
- [ ] 共通ルールを次の内容へ統合し、full／compact／QA／修正プロンプトに相反する旧文を残さない。互換用の既存モード識別markerは保持し、その名称を厳密な三階調・全AA禁止の根拠にしない。

```js
const SCREEN_ROLES = Object.freeze([
  'assigned-material', 'canonical-dark-skin', 'bounded-shadow',
]);
const PAPER_RULE = 'Reserve unassigned light planes as unprinted paper. '
  + 'No page-wide or face-wide texture veil. Ink contours remain intact.';
const TONE_RULE = 'Screen belongs to assigned material bases, canonical dark skin, '
  + 'or light-driven bounded form/cast shadows. Maintain each base across panels. '
  + 'Never convert the whole image luminance into dots. Screen area alone is not a defect.';
const SKIN_RULE = 'Lit light skin retains paper base; dark/tanned skin retains its '
  + 'assigned screen base in light. Preserve motivated shadows and small highlights. '
  + 'Never whiten a canonical dark base or erase facial ink to expose paper.';
```

- [ ] NORMALのG-pen描線はNORMALへ限定。GEKIGAは顔面構成と筆・ベタ・方向性のあるハッチ、CHIBIは頭身／胴／四肢と演技、柔らかい画風は省略と筆致で差を作る。既存レシピを利用し、追加の強調文を積み重ねない。
- [ ] 「網点は必ず少面積」「影が広いと失敗」「色の輝度をそのままトーン化」「全線の灰色AA禁止」「参照の頬紅を常時再現」を共通判定から除く。黒髪のベタ、縦書き、参照の同一性、白黒出力自体は維持。
- [ ] explicitな画風固定／静かな演技／指定頭身を優先し、GEKIGA／CHIBIを全モードへ強制しない。未知styleは既存のNORMAL fallbackを使うが、未知skinは参照優先として未確定を保持する。

```js
// 提案する値のテスト。既存テストのssrLoadModuleで関数を取得する。
const input = { style: 'GEKIGA', preserveReferenceStyle: false,
  seriousTone: false, skinBases: [{ subject: '乙', base: 'screen' }] };
const intent = resolveMonochromeRenderIntent(input);
assert.deepEqual(intent.screenRoles, SCREEN_ROLES);
assert.equal(intent.skinBases[0].base, 'screen');
assert.equal(intent.style, 'GEKIGA');
assert.deepEqual(input.skinBases, [{ subject: '乙', base: 'screen' }]);
```

Run: `node --test tests/monochrome-prompt.test.mjs tests/prompt-style-exceptions.test.mjs`

**終了条件:** 正当な肌ベース・広い局所陰影は許可、未指定面のveilは許可しない。同じ契約が短縮版とQAへ届く。既存の画風固定モードを退行させない。

### Task 3 — コマの確定情報を圧縮と精査から守る

**Files:** `src/lib/prompt-assembler.js`、`src/lib/comedy-review.js`、`src/hooks/useMangaWorkflow.js`、`tests/prompt-budget.test.mjs`、`tests/image-prompt-budget.test.mjs`、`tests/expressive-direction.test.mjs`、`tests/workflow-run-invalidation.test.mjs`、`tests/comedy-review.test.mjs`。

**Interface:** §3のartifact／validator。`buildMangaPrompt`文字列APIとAPIクライアント署名は維持。

- [ ] Task 1適用後のカラーfixtureを取得し、今回の白黒設計変更前後で固定比較する。明示Camera、固定ending、背景なし等の決定的入力を使い、乱数でsnapshotが揺れないようにする。
- [ ] 各コマを一回だけ`PanelContract`へ解決する。Camera、Action、Dialogue、BalloonLayout、skin／styleの結果を保持し、**対応するstyleとCamera／Actionを同じコマブロック内**に置く。レシピを後段で文字列から抜き出して冒頭へ移す処理を廃止する。
- [ ] 圧縮を完成した全文への反復replaceから、アプリ説明のfull／compact選択へ移す。既存短縮関数を使う場合も、アプリ所有の説明セグメントだけへ渡す。台本・参照の同一性・文字・モザイクscope・媒体／肌契約は短縮の生贄にしない。

```js
// 分割後の組立方針。protectedは確定済み文字列、authoredだけに別表現を持つ。
const renderSegments = (segments, tier) => segments.map(segment => {
  if (segment.kind === 'protected') return segment.text;
  return segment[tier]; // full または compact。両方を契約テストする。
}).join('\n\n');
// buildMangaPromptArtifact内で現行のsoft targetへ収まる候補を選び、
// 収まらなければhard limit内の最短候補。hard limit超過は既存budget error。
// 任意文字位置sliceによる切断、hard limit引上げ、影やCameraの削除は禁止。
```

- [ ] age safety／documentary sanitizer／cinematic slot等の既存順序を確認し、必要な正規化を終えてからprotectedBlocksを確定する。保護機能が既存安全処理を迂回しないテストを残す。
- [ ] STEP3のAI精査へartifactを渡し、候補が保護ブロックを消したり改変したら、その候補を採用せず元の有効な組立文を保持する。警告と変更された項目を表示し、精査合格と偽らない。追加API精査を自動発行しない。

```js
export const validateMangaPromptArtifact = (candidate, artifact) => {
  const text = String(candidate);
  const headings = [...text.matchAll(/^## Panel (\d+)\s*$/gm)];
  const panelLayoutValid = headings.map(match => match[1]).join(',') === '1,2,3,4';
  const scopes = new Map([[null, text.slice(0, headings[0]?.index ?? text.length)]]);
  for (let i = 0; i < headings.length; i += 1) {
    scopes.set(Number(headings[i][1]),
      text.slice(headings[i].index, headings[i + 1]?.index ?? text.length));
  }
  const missingBlockIndexes = artifact.protectedBlocks.flatMap((block, i) => {
    const scope = scopes.get(block.panel) ?? '';
    return block.text && scope.split(block.text).length === 2 ? [] : [i];
  });
  return { valid: panelLayoutValid && missingBlockIndexes.length === 0,
    panelLayoutValid, missingBlockIndexes };
};
// 精査候補の既存ending／dialogue／render-options／budget検査も継続。
// valid=falseならartifact.promptを返し、warningを必ず付ける。
// 実ユーザーがeditorで変更した本文へ、この精査用rollbackを勝手に適用しない。
```

- [ ] ブロック残存だけで追加文の無矛盾までは証明できないため、精査は白黒の媒体／画風／肌方針を変更しないよう入力仕様も限定する。既存guardに新旧ルール矛盾の代表例を追加する。未知の意味矛盾は実画像ゲートで未検証として残す。
- [ ] 最終APIマニフェスト分は現行`getOpenAIPromptBodyBudget`で先に予約し、`appendOpenAIReferencePrompt`後も32,000文字上限を検査する。既存19,000文字ケース、soft target、最大予算、超過拒否をすべて通す。15,000字など新たな成功指標を作らない。
- [ ] `expressive-direction.test.mjs`の現在の失敗をモード別に直す。カラーのG-pen期待は維持。白黒は選択画風の線、焦点輪郭、独立した目鼻口／指、背景との分離、実際の身体演技、静かな場面、視線誘導が残ることを検査する。旧英文と一致しない理由だけで要求を削らない。
- [ ] stale結果拒否・キャンセル・エラー後のloading解除を維持。新artifactのstateがscenario世代をまたいで残らないよう既存epochガードに含める。

```js
// provider x mode x budgetごとに組立artifactから検査する骨格。
const artifact = buildMangaPromptArtifact(options);
assert.equal(validateMangaPromptArtifact(artifact.prompt, artifact).valid, true);
const broken = artifact.prompt.replace(artifact.protectedBlocks[0].text, '');
assert.equal(validateMangaPromptArtifact(broken, artifact).valid, false);
assert.equal(buildMangaPrompt(options), artifact.prompt); // 決定的fixtureで実行
```

同じテスト群でコマ順入替・重複・別コマ末尾への保護文コピー・通常原文・正当な説明追記を検査する。見出しや保護文に似た文字が台本の引用にある場合も含め、台本データを構造markerと誤認しない。必要なescapeは直列化時に限定し、描画する文字の値は変えない。

Run: `node --test tests/prompt-budget.test.mjs tests/image-prompt-budget.test.mjs tests/expressive-direction.test.mjs tests/monochrome-prompt.test.mjs tests/prompt-style-exceptions.test.mjs tests/workflow-run-invalidation.test.mjs tests/comedy-review.test.mjs`

**終了条件:** 両providerの白黒で画風・Camera・Action・台詞・肌割当が予算処理と精査を通過して残る。破壊された候補を採用しない。カラー差分はTask 1の意図した復元分に限る。

### Task 4 — 原寸ROIを取得し、表示の問題を分ける

**Files:** `src/lib/manga-page-layout.js`、`tests/manga-page-layout.test.mjs`、`tests/page-normalization-workflow.test.mjs`。評価用記録は`output/`。

**Interface:** `extractNativeImageRegion(dataUrl, { x, y, width, height }) -> Promise<{ dataUrl, x, y, width, height, scale: 1 }>`。座標は元画像の整数pixel。既存`extractMangaPanelCrops`を置換しない。

- [ ] 範囲外／負数／小数／面積ゼロを拒否する検査と、元と切出しの画素一致テストを先に追加する。既存テストのCanvas mockだけで画素一致を主張せず、ローカルブラウザCanvasでも無課金確認する。
- [ ] 次の処理を既存モジュールへ実装する。画像補正・輝度変更・二値化は行わない。

```js
export const extractNativeImageRegion = async (dataUrl, region) => {
  const { x, y, width, height } = region;
  if (![x, y, width, height].every(Number.isInteger)
      || x < 0 || y < 0 || width < 1 || height < 1) {
    throw new RangeError('原寸領域は正しい整数pixelで指定してください。');
  }
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  if (x + width > image.naturalWidth || y + height > image.naturalHeight) {
    throw new RangeError('原寸領域が画像の外へ出ています。');
  }
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('原寸画像を切り出せません。');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
  return { dataUrl: canvas.toDataURL('image/png'), x, y, width, height, scale: 1 };
};
```

- [ ] 元API画像、A4補正画像、ブラウザ縮小画像をsourceStage別に保存する。元がA4なら`already-a4`で無加工という現行挙動を維持する。
- [ ] 顔、肌の明部／地トーン／影、白い壁等、文字、P3の見える劇画顔、P4の身体を原寸で確認する。線や影を含まない白地内部と吹き出し内部を比べ、位置を記録する。ROIの座標は画像を見て選び、固定キャラ位置を製品に埋め込まない。

Run: `node --test tests/manga-page-layout.test.mjs tests/page-normalization-workflow.test.mjs`

**終了条件:** サイズ変更せず切り出せる。縮小表示だけに出るぼけ／灰色を、画像生成の欠陥として再生成しない。

### Task 5 — 根拠のない白黒判定から有料修正を起動させない

**Files:** `src/lib/image-quality-qa.js`、`src/lib/image-quality-failsafe.js`、`src/hooks/useMangaWorkflow.js`のQA呼出し（現在1687〜1714行付近）、`tests/image-quality-qa.test.mjs`、`tests/image-quality-evidence-selection.test.mjs`、`tests/image-quality-failsafe.test.mjs`、`tests/workflow-image-quality-qa.test.mjs`。

**Interface:** 既存issue `type: 'monochrome_rendering'`へ`monochromeEvidence`を追加。共有の純粋判定`assessMonochromeEvidence(issue, context)`をQA側に置き、既にQA側をimportしているfailsafeからも使う。逆importは増やさない。`context`は呼出側が渡す実際の画像寸法／hash／ROI／scale情報であり、モデルの自己申告を信頼しない。

`parseImageQualityQaResponse(responseText, options)`へ任意の`options.evidenceContext`を追加し、返すreviewの`evidenceContext`にはその値だけを入れる。JSON応答の同名値は捨てる。`isMaterialImageQualityIssue(issue, evidenceContext)`も任意の第2引数を受け、`getRepairableIssues(review)`やworkflowの各呼出しから信頼済みcontextを渡す。`filter(isMaterialImageQualityIssue)`形式はindexが第2引数になるため、明示callbackへ変更する。他issue種別の挙動は保つ。

```js
// workflowが実際にQAへ渡した画像から作る。モデル応答から復元しない。
const evidenceContext = { sourceViews: [{
  hash: candidateImageHash, stage: 'original',
  width: candidateWidth, height: candidateHeight,
  region: { x: 0, y: 0, width: candidateWidth, height: candidateHeight },
  scale: 1,
}] };
// ROIを提供した時だけそのviewを追加。縮小cropは実際のscaleで追加する。
// 元がA4補正済みならstage='normalized'。originalと偽らない。
```

ここでの`scale:1`はアプリが縮小していない事実だけを意味する。provider内部のVision縮小や小領域の識別精度まで保証しない。薄い網点・微細な描線の最終合否は保存PNGの100%表示でも確認する。モデルが「原寸」と書くだけでは根拠を追加したことにしない。

```js
// 代表的な証拠形。座標は元画像pixel、statusは既存QA体系へ写像する。
const monochromeEvidence = {
  sourceStage: 'original', sourceHash: 'hash-from-caller', scale: 1,
  region: { x: 100, y: 200, width: 80, height: 60 },
  expectedRole: 'paper',
  observedPattern: 'broad-screen-veil',
  observation: '明部の肌と背後の明るい壁を同じ網点が横断している。',
  materialImpact: 'material',
  status: 'defect',
};
// return = { status: 'pass' | 'fail' | 'unverified', repairable: boolean }
// valid ROI + 実際に提供したsource/scale + role + 観測 + materialImpactが必要。
```

- [ ] 現状の「typeがmonochrome_renderingだけでmaterial」になるケースをREDにする。根拠なし／範囲外／偽の原寸申告／縮小の曖昧さ／打ち切りQAで`repairable:false`を検査する。
- [ ] `expectedRole`はpaper／canonical-dark-skin／assigned-material／bounded-shadow／ink。合法な褐色base、広い陰影、小さなハイライト、意図した柔らかい描線は欠陥としない。
- [ ] 自動QAの既存1536幅cropだけでは原寸確認済みにしない。元画像の明確な広い欠陥は実際に見える範囲で記録できるが、細線・薄い網点の疑いはTask 4の根拠がなければunverifiedにする。根拠が増えないままQA APIを再発行しない。
- [ ] `parseImageQualityQaResponse`で欠けた証拠をunverifiedへ変換し、failsafeでも同じ条件を再検査する。単なる`repairable:true`のモデル出力を信頼しない。
- [ ] style不足とtone不足を私的受け入れ表では分ける。画風に関する漠然とした自己採点で自動修正を追加しない。既存の独立文字転記／bubble inventoryを使って縦書きと話者を判定する。
- [ ] 新候補が劇画を強めても、台詞・肌・演技を壊した場合には旧候補を保持するテストを追加する。履歴上限10件を増やすことで証拠保存問題を回避しない。

```js
// 既存failsafeのfake generate/review/compareを使って呼出回数を検査する。
assert.equal(isMaterialImageQualityIssue({
  type: 'monochrome_rendering', panel: 2, subject: 'skin', reason: 'looks grey',
}), false);
// 曖昧なscreenのreviewを返す実行では初回generate=1、repair generate=0。
// 明確な原寸欠陥でも、autoRepair=falseならrepair generate=0。
```

Run: `node --test tests/image-quality-qa.test.mjs tests/image-quality-evidence-selection.test.mjs tests/image-quality-failsafe.test.mjs tests/workflow-image-quality-qa.test.mjs tests/bubble-inventory.test.mjs tests/generation-history-memory.test.mjs`

**終了条件:** 確かな欠陥、許容表現、未確認の三者を分ける。未確認のための追加画像生成は0回。現タスクではrepair OFFを維持。

### Task 6 — 通常STEP3とコピー経路を無課金で証明する

**Files:** 既存workflow／copy／promptテスト、必要な最小のUI検証fixture。製品の入力や品質を固定値へ置換しない。

- [ ] 現在の接続済みタブは旧STEP3 runtimeなので保存する。新しいIABタブで現行コードの起動を確認し、APIキーなしのローカルfixtureまたはrequest mockで実際のSTEP3ハンドラ、AI精査前後、state、editorを通す。SSRの戻り値だけを再貼付して通常UI検証済みとしない。
- [ ] コードrevision、colorMode、provider、ending、2参照の役割、cast／scenarioのhash、モザイク／透かし、修正OFFを確認する。カラーと白黒の取り違えは**生成ボタンを押す前**に止める。
- [ ] Web全コピーと三分割の本文を再結合して照合する。分割ごとの貼付用ラベルは既存の定義通りに除き、本文欠落／重複ゼロ、最終chunkにも残る契約を検査する。白黒の分割ボタンの存在も確認する。
- [ ] API最終文はWeb本文に既存参照マニフェスト等が付く差だけであることを確認。OpenAI／Geminiの両方で同じPanelContractを保持する。
- [ ] キーなしmockでは画像品質を合格にしない。実API前に新しい通常UIへ入力が必要なら、状態を確認した上でユーザーに**画面内のキー入力だけ**を依頼する。参照ファイルのダイアログを開かない。旧タブのキー抽出／転送をしない。

**終了条件:** UI経路、コピー、API送信直前の実データが一致。既存tab10の状態を保存したまま、古いruntime由来の未検証を解消する。

### Task 7 — 同条件のOpenAIモノクロ、次にGeminiで実画像を判定する

**Files:** `output/`の私的receipt、元PNG、原寸ROI、表示スクリーンショット、既存PNG制作情報。キー・認証header・生の参照base64は記録しない。

- [ ] Task 0–6とfocused testsが通った後、実行時のAPI承認範囲を確認する。以前の「基準を満たすまで検証」の指示を繰り返し尋ねないが、停止／境界変更があれば従う。
- [ ] OpenAI: 同一cast／scenario／二枚の元シート、Sunburst/xhigh、2240×3168、白黒、モザイク／透かしの元設定、修正OFF。画像編集連鎖でなく元の参照から一枚生成する。モデルが利用不可ならモデルを黙って替えず、その応答を記録する。
- [ ] 生成とQAの終了まで同じセッションを監視し、原PNGを保存して§2全項目を判定する。source画像と補正後が違う場合は両方を判定する。
- [ ] 改善・退行・不確実性を原寸ROI付きでユーザーに示す。画風が出ても全体veilが残れば失敗。白地が改善しても褐色肌や劇画が失われたら失敗。
- [ ] OpenAIモノクロ合格後にGeminiへ進む。まず同じ白黒契約を実証する。Geminiのモデル・解像度・品質は画面の現在設定とproviderの実対応を確認して記録し、OpenAIのxhighやSunburstをGeminiへ流用しない。
- [ ] 本計画のGemini実画像合格対象は白黒。カラーの共通経路はTask 3／6の無課金回帰で保護する。Geminiカラーの実画像が未検証なら、その状態を別項目で明記し、全色モード検証完了と呼ばない。ユーザーが実装時にGemini両色の実証を指定した場合はカラー→白黒の順で各一枚を記録する。受け入れ済みOpenAIカラーは再生成しない。

**失敗時の分岐:**

1. Camera／台詞／看板等が送信前から欠けた → Task 1／3／6の無課金診断へ戻る。
2. 原PNGはよいが縮小だけ灰色／ぼけ → Task 4の表示問題として扱う。画像を再生成しない。
3. 原PNGにもveil、画風は成功 → tone用途の競合を調べる。画風を消して白くする修正は禁止。
4. toneは成功、画風が失敗 → 選択styleとNORMAL／参照固定の競合、レビュー後の全文を確認する。
5. 新しい証拠がなく同じ方向の試行が二回失敗 → 「さらに強い言葉」の三回目を行わず、最良候補を保存し、仮説を見直す。別アプローチは根拠・変更点・課金範囲を説明してから行う。

診断用短文と本番長文を比べる必要が再び出た場合、条件を一項目だけ変える別実験として扱う。短文で成功しても本番経路の完成とはしない。画像の輝度引上げ／threshold／二値化／カラーの強制白黒変換を自動追加しない。

**私的receiptに必要な値:** source revision＋diff hash、cast／scenario／参照／最終prompt hash、provider／実採用model／size／quality、色モード、各設定、生成・修正呼出回数、元／補正／保存PNGのhashと寸法、QA finish理由、独立台詞転記、ROI座標とsourceStage、項目別pass/fail/unverified、採用候補と理由。既存`buildGeneratedImageMetadata`の送信文・入力hash・出力hashを再利用する。

**終了条件:** OpenAIモノクロとGeminiの対象出力で§2を実画像確認。未確認項目を残したまま「究極」「完全解決」「全provider合格」と報告しない。

### Task 8 — 説明、全体回帰、引き継ぎを閉じる

**Files:** `src/components/Step3Panel.jsx`／workflowログの白黒説明、`README.md`、`docs/readme-body-audit.json`、`HANDOFF.md`、本書のチェックボックス。

- [ ] 厳密な単一密度／3色pixel等の誤解を生む説明を実装と合わせる。文案: 「白地と墨線を基本に、肌の地色・素材・影へ必要なトーンを配置します。コマごとの絵柄とカメラ・演技を保ちます。」生成の完全保証という文にしない。
- [ ] README本文の対象箇所と既存auditを同期する。公開用記事、PDF、release notes、SNSをこのローカル作業で更新・公開しない。
- [ ] 全テスト、strict lint、build、diff checkを一度実行する。失敗した場合は該当境界を直し、変更に影響するfocused testsと必要な最終ゲートを再実行する。

```powershell
Set-Location -LiteralPath 'C:\Users\sx717\Antigravity\nano-banana-pro'
$mangaTestFiles = @(rg --files tests -g '*.test.mjs')
if ($mangaTestFiles.Count -eq 0) { throw 'Test files not found' }
& node --test @mangaTestFiles
if ($LASTEXITCODE -ne 0) { throw 'Full test suite failed' }
npm.cmd run lint -- --max-warnings 0
if ($LASTEXITCODE -ne 0) { throw 'Strict lint failed' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed' }
git diff --check
if ($LASTEXITCODE -ne 0) { throw 'Diff check failed' }
```

- [ ] testsの件数は実行結果の値を記録し、旧984へ固定しない。README監査は既存スクリプトを使い、今回のローカル状態に必要な検査だけを行う。公開処理を含むpredeploy／publisherは実行しない。
- [ ] 実画像の証拠、残る制限、変更ファイル、全検査結果をHANDOFF冒頭に短く更新。本書を完了記録とし、root PLANへ詳細を重複させない。
- [ ] 自分が作った冗長な検証タブだけを閉じ、ユーザーのタブ・接続・履歴・最終表示を保持。タブ一覧を再確認する。

**最終報告の条件:** 実装／ローカル検査／OpenAI白黒／Gemini／未確認事項を分けて記載し、原画像と比較証拠へのリンクを出す。公開・バックアップをしたとは述べない。

## 5. 設計選択の理由と代替案の扱い

- 第一案は既存の組立・QA境界を直すこと。画風を変えるには必ず全体にハーフトーンが必要、という仕様や制約はない。必要な肌・影のトーンと不要な全体veilを分けて要求する。
- 単純に禁止文を増やす案は、既に繰り返して未達だった。今回は競合削減・台本保護・原寸証拠を先にする。
- v6.6.9全面復元は採用しない。必要なら`git show v6.6.9:src/lib/prompt-assembler.js`と`git show v6.6.9:src/lib/panel-utils.js`で当時の該当処理だけ比較し、後発のAPI・文字・モザイク・安全・UI修正を保持する。
- 全体二値化は描線・地トーン・影を壊し得るため採用しない。文字の厳密な組版や領域編集が別途必要になっても、現在の生成修正へ黙って加えない。
- 画素値の完全保証と意味上の画風忠実性は、プロンプトだけでは機械的に保証できない。コードで防げる情報損失・モード混在・根拠不足の有料再試行を確実に防ぎ、画像側は原寸証拠で合否を決める。

## 6. 実装者向け最終チェック

- [ ] M1–M4、S1–S3、C1、T1、I1、P1の各項目に、タスク・テスト・実画像証拠が対応している。
- [ ] 固有キャラ・特定シナリオだけを直すルールがない。
- [ ] 本物の局所陰影と褐色肌を残す正のテスト、全体veil・肌白化・情報欠落を落とす負のテストがある。
- [ ] 精査・短縮・APIラッパー・Web分割・QA・修正の全境界が同じ色モードと画風／肌契約を使う。
- [ ] 原画像未保存、QA打ち切り、縮小だけの観測を合格証拠にしていない。
- [ ] UI／カラー／公開済み成果を勝手に変えていない。
- [ ] プロンプトの変更だけで完成とせず、ユーザー指定順で実画像を確認した。

**計画作成時の状態:** 本書の実装タスクは全て未着手。run19は完了・未合格。次はユーザーがAstra高へ切り替えて実装を指示した後、Task 0から開始する。
